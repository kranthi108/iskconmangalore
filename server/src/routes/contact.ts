import { Hono } from 'hono'
import { contacts } from '../db/schema'
import { createDb } from '../db/client'
import { successResponse, errorResponse } from '../lib/response'
import { contactSchema } from '../lib/validation'

type Env = { Bindings: { DATABASE_URL: string } }

const app = new Hono<Env>()

app.post('/', async (c) => {
  const body = await c.req.json()
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    const messages = parsed.error.errors.map((e) => e.message)
    return errorResponse(c, messages.join(', '), 422)
  }

  const db = createDb(c.env.DATABASE_URL)
  const [row] = await db
    .insert(contacts)
    .values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      subject: parsed.data.subject,
      message: parsed.data.message,
    })
    .returning({ id: contacts.id, createdAt: contacts.createdAt })

  return successResponse(
    c,
    { id: row.id, createdAt: row.createdAt.toISOString() },
    'Thank you for reaching out! We will get back to you soon.',
    201,
  )
})

export default app
