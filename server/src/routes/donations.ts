import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { donations, donationCampaigns } from '../db/schema'
import { createDb } from '../db/client'
import { successResponse, errorResponse } from '../lib/response'
import { createOrderSchema, verifyPaymentSchema } from '../lib/validation'
import { createRazorpayOrder, verifyRazorpaySignature } from '../services/razorpay'
import { generateReceiptNumber } from '../lib/receipt'
import { generateReceiptPDF, amountInWords } from '../services/generateReceipt'
import { sendWhatsAppReceipt } from '../services/aisensy'

function toIST(date: Date = new Date()): Date {
  const istOffset = 5.5 * 60 * 60 * 1000 // IST is UTC+5:30
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60 * 1000
  return new Date(utcTime + istOffset)
}

type Env = {
  Bindings: {
    DATABASE_URL: string
    RAZORPAY_KEY_ID: string
    RAZORPAY_KEY_SECRET: string
    ASENSY_API_KEY: string
    ASENSY_CAMPAIGN_NAME: string
    RECEIPTS_BUCKET: R2Bucket
    R2_PUBLIC_URL: string
  }
}

const app = new Hono<Env>()

function toDonationDTO(row: typeof donations.$inferSelect) {
  return {
    _id: row.id,
    campaignId: row.campaignId,
    donorName: row.donorName,
    donorEmail: row.donorEmail ?? '',
    donorPhone: row.donorPhone,
    donorPAN: row.donorPan,
    amount: row.amount,
    currency: row.currency,
    razorpayOrderId: row.razorpayOrderId ?? '',
    razorpayPaymentId: row.razorpayPaymentId,
    status: row.status,
    receiptNumber: row.receiptNumber ?? '',
    isAnonymous: row.isAnonymous,
    dedication: row.dedication,
    createdAt: row.createdAt.toISOString(),
  }
}

app.post('/order', async (c) => {
  const body = await c.req.json()
  const parsed = createOrderSchema.safeParse(body)

  if (!parsed.success) {
    const messages = parsed.error.errors.map((e) => e.message)
    return errorResponse(c, messages.join(', '), 422)
  }

  const db = createDb(c.env.DATABASE_URL)
  const { campaignId, amount, donorName, donorEmail, donorPhone, donorPAN, donorAddress, isAnonymous, dedication } =
    parsed.data

  const campaigns = await db.select().from(donationCampaigns).where(eq(donationCampaigns.id, campaignId))
  if (campaigns.length === 0) {
    return errorResponse(c, 'Campaign not found', 404)
  }
  const campaign = campaigns[0]

  if (!campaign.active) {
    return errorResponse(c, 'This campaign is no longer accepting donations')
  }

  const receiptNumber = await generateReceiptNumber(db)
  let sevaName = campaign.title
  // Override sevaName for Janmashtami Annadana Seva
  if (campaign.slug === 'janmashtami-annadana-seva' || campaign.category === 'Janmashtami') {
    sevaName = 'Special SKJ Annadana Seva'
  }
  const amountPaise = Math.round(amount * 100)

  const order = await createRazorpayOrder(
    amountPaise,
    'INR',
    receiptNumber,
    { campaignId: String(campaign.id), sevaName },
    c.env.RAZORPAY_KEY_ID,
    c.env.RAZORPAY_KEY_SECRET,
  )

  const addressIsEmpty = !donorAddress || Object.values(donorAddress).every((v) => !v)

  await db.insert(donations).values({
    campaignId: campaign.id,
    sevaName,
    donorName,
    donorEmail: donorEmail || null,
    donorPhone,
    donorPan: donorPAN || null,
    donorAddress: addressIsEmpty ? null : donorAddress,
    amount,
    currency: 'INR',
    razorpayOrderId: order.id,
    status: 'created',
    receiptNumber,
    isAnonymous: isAnonymous ?? false,
    dedication: dedication || null,
    createdAt: toIST(),
    updatedAt: toIST(),
  })

  return successResponse(c, {
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    receipt: receiptNumber,
  })
})

app.post('/verify', async (c) => {
  const body = await c.req.json()
  const parsed = verifyPaymentSchema.safeParse(body)

  if (!parsed.success) {
    const messages = parsed.error.errors.map((e) => e.message)
    return errorResponse(c, messages.join(', '), 422)
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data

  const isValid = await verifyRazorpaySignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    c.env.RAZORPAY_KEY_SECRET,
  )

  if (!isValid) {
    return errorResponse(c, 'Invalid payment signature')
  }

  const db = createDb(c.env.DATABASE_URL)

  const rows = await db
    .select()
    .from(donations)
    .where(eq(donations.razorpayOrderId, razorpay_order_id))

  if (rows.length === 0) {
    return errorResponse(c, 'Donation not found', 404)
  }

  const [updated] = await db
    .update(donations)
    .set({
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: 'captured',
      updatedAt: toIST(),
    })
    .where(eq(donations.razorpayOrderId, razorpay_order_id))
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

    const objectKey = `receipts/${crypto.randomUUID()}.pdf`

    await c.env.RECEIPTS_BUCKET.put(objectKey, pdfBuffer, {
      httpMetadata: {
        contentType: "application/pdf",
      },
    })

    const pdfUrl = `${c.env.R2_PUBLIC_URL}/${objectKey}`

    await sendWhatsAppReceipt(
      {
        phoneNumber: updated.donorPhone,
        campaignName: c.env.ASENSY_CAMPAIGN_NAME,
        pdfUrl,
        fileName,
        recipientName: updated.donorName,
      },
      c.env.ASENSY_API_KEY,
    )
  } catch (error) {
    console.error('Failed to send WhatsApp receipt:', error)
    // Continue with response even if WhatsApp fails
  }

  return successResponse(c, toDonationDTO(updated))
})

app.get('/:id/receipt', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const id = Number(c.req.param('id'))

  if (!Number.isInteger(id) || id < 1) {
    return errorResponse(c, 'Invalid donation ID', 400)
  }

  const rows = await db.select().from(donations).where(eq(donations.id, id))

  if (rows.length === 0) {
    return errorResponse(c, 'Donation not found', 404)
  }

  return successResponse(c, toDonationDTO(rows[0]))
})

export default app
