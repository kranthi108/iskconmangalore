import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { donations, donationCampaigns } from '../db/schema'
import { createDb } from '../db/client'
import { verifyWebhookSignature } from '../services/razorpay'

type Env = {
  Bindings: {
    DATABASE_URL: string
    RAZORPAY_WEBHOOK_SECRET: string
  }
}

const app = new Hono<Env>()

app.post('/razorpay', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const webhookSecret = c.env.RAZORPAY_WEBHOOK_SECRET || ''

  try {
    const signature = c.req.header('x-razorpay-signature')
    const body = await c.req.text()

    if (webhookSecret) {
      if (!signature) {
        console.error('[Webhook] Missing x-razorpay-signature header')
        return c.json({ error: 'Missing signature' }, 400)
      }

      const isValid = await verifyWebhookSignature(body, signature, webhookSecret)
      if (!isValid) {
        console.error('[Webhook] Signature validation failed')
        return c.json({ error: 'Invalid signature' }, 400)
      }
    }

    const event = JSON.parse(body)
    if (!event.event || !event.payload) {
      return c.json({ error: 'Invalid event structure' }, 400)
    }

    console.log(`[Webhook] ${event.event}`)

    switch (event.event) {
      case 'payment.captured': {
        const p = event.payload.payment.entity
        if (p.order_id) {
          await db
            .update(donations)
            .set({
              razorpayPaymentId: p.id,
              paymentMethod: p.method || null,
              status: 'captured',
              updatedAt: new Date(),
            })
            .where(eq(donations.razorpayOrderId, p.order_id))

          // Increment donor count on the campaign
          const rows = await db
            .select({ campaignId: donations.campaignId })
            .from(donations)
            .where(eq(donations.razorpayOrderId, p.order_id))

          if (rows.length > 0) {
            const campaign = await db
              .select({ donorCount: donationCampaigns.donorCount })
              .from(donationCampaigns)
              .where(eq(donationCampaigns.id, rows[0].campaignId))

            if (campaign.length > 0) {
              await db
                .update(donationCampaigns)
                .set({ donorCount: campaign[0].donorCount + 1, updatedAt: new Date() })
                .where(eq(donationCampaigns.id, rows[0].campaignId))
            }
          }
        }
        break
      }

      case 'payment.authorized': {
        const p = event.payload.payment.entity
        if (p.order_id) {
          await db
            .update(donations)
            .set({
              razorpayPaymentId: p.id,
              status: 'authorized',
              updatedAt: new Date(),
            })
            .where(eq(donations.razorpayOrderId, p.order_id))
        }
        break
      }

      case 'payment.failed': {
        const p = event.payload.payment.entity
        if (p.order_id) {
          await db
            .update(donations)
            .set({
              razorpayPaymentId: p.id,
              status: 'failed',
              updatedAt: new Date(),
            })
            .where(eq(donations.razorpayOrderId, p.order_id))
        }
        break
      }

      case 'refund.created': {
        const refund = event.payload.refund.entity
        const paymentId = refund.payment_id
        if (paymentId) {
          await db
            .update(donations)
            .set({
              status: 'refunded',
              updatedAt: new Date(),
            })
            .where(eq(donations.razorpayPaymentId, paymentId))
        }
        break
      }

      default:
        console.log(`[Webhook] Unhandled event: ${event.event}`)
    }

    return c.json({ status: 'ok' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[Webhook] Processing failed:', message)
    return c.json({ error: 'Webhook processing failed', message }, 500)
  }
})

export default app
