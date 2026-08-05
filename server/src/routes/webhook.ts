import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { donations } from '../db/schema'
import { createDb } from '../db/client'
import { verifyWebhookSignature } from '../services/razorpay'
import { generateReceiptPDF, amountInWords } from '../services/generateReceipt'
import { sendWhatsAppReceipt } from '../services/aisensy'

type Env = {
  Bindings: {
    DATABASE_URL: string
    RAZORPAY_WEBHOOK_SECRET: string
    ASENSY_API_KEY: string
    ASENSY_CAMPAIGN_ID: string
  }
}

const app = new Hono<Env>()

app.post('/webhook/razorpay', async (c) => {
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
          const [updated] = await db
            .update(donations)
            .set({
              razorpayPaymentId: p.id,
              paymentMethod: p.method || null,
              status: 'captured',
              updatedAt: new Date(),
            })
            .where(eq(donations.razorpayOrderId, p.order_id))
            .returning()

          // Generate and send WhatsApp receipt after successful payment
          try {
            const donorAddress = updated.donorAddress
              ? `${updated.donorAddress.house || ''} ${updated.donorAddress.street || ''} ${updated.donorAddress.city || ''} ${updated.donorAddress.state || ''} ${updated.donorAddress.pincode || ''}`.trim()
              : ''

            const receiptData = {
              receiptNumber: updated.receiptNumber || '',
              date: updated.createdAt.toISOString().split('T')[0],
              donorName: updated.donorName,
              donorAddress,
              donorPhone: updated.donorPhone,
              donorEmail: updated.donorEmail || '',
              donorPan: updated.donorPan || '',
              amount: updated.amount,
              amountInWords: amountInWords(updated.amount),
              paymentType: 'Online Payment',
              sevaType: updated.sevaName,
            }

            const pdfBuffer = await generateReceiptPDF(receiptData)
            const fileName = `ISKCON-Receipt-${updated.receiptNumber}.pdf`

            await sendWhatsAppReceipt(
              {
                phoneNumber: updated.donorPhone,
                campaignId: c.env.ASENSY_CAMPAIGN_ID,
                pdfBuffer,
                fileName,
                recipientName: updated.donorName,
                receiptNumber: updated.receiptNumber || '',
                amount: updated.amount,
              },
              c.env.ASENSY_API_KEY,
            )
          } catch (error) {
            console.error('Failed to send WhatsApp receipt:', error)
            // Continue with webhook response even if WhatsApp fails
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
