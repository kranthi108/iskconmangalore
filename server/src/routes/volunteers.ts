import { Hono } from 'hono'
import { volunteers } from '../db/schema'
import { createDb } from '../db/client'
import { successResponse, errorResponse } from '../lib/response'
import { volunteerSchema } from '../lib/validation'

type Env = { Bindings: { DATABASE_URL: string } }

const app = new Hono<Env>()

app.post('/', async (c) => {
  const body = await c.req.json()
  const parsed = volunteerSchema.safeParse(body)

  if (!parsed.success) {
    const messages = parsed.error.errors.map((e) => e.message)
    return errorResponse(c, messages.join(', '), 422)
  }

  const db = createDb(c.env.DATABASE_URL)
  const [row] = await db
    .insert(volunteers)
    .values({
      name: parsed.data.name,
      phone: parsed.data.phone,
      date: new Date(parsed.data.date),
      hoursAvailable: parsed.data.hoursAvailable,
      sevaCategory: parsed.data.sevaCategory,
    })
    .returning({ id: volunteers.id, createdAt: volunteers.createdAt })

  return successResponse(
    c,
    { id: row.id, createdAt: row.createdAt.toISOString() },
    'Thank you for volunteering! We will contact you soon.',
    201,
  )
})

export default app
