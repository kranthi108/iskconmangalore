import { Hono } from 'hono'
import { sql, desc, ilike } from 'drizzle-orm'
import { marathonJapaEntries } from '../db/schema'
import { createDb } from '../db/client'
import { successResponse, errorResponse } from '../lib/response'
import { z } from 'zod'

type Env = { Bindings: { DATABASE_URL: string } }

const app = new Hono<Env>()

function todayIST() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
}

function endOfDayIST() {
  const today = todayIST()
  return `${today}T23:59:59+05:30`
}

const submitSchema = z.object({
  devoteName: z.string().min(2, 'Name must be at least 2 characters').max(200),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(20),
  city: z.string().min(2, 'City must be at least 2 characters').max(150),
  rounds: z.number().int().min(1, 'At least 1 round').max(192, 'Maximum 192 rounds'),
})

app.get('/stats', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const today = todayIST()

  const [totals] = await db
    .select({
      totalRounds: sql<number>`coalesce(sum(${marathonJapaEntries.rounds}), 0)`,
      totalDevotees: sql<number>`count(distinct ${marathonJapaEntries.phone})`,
    })
    .from(marathonJapaEntries)
    .where(sql`${marathonJapaEntries.createdAt}::date = ${today}`)

  return successResponse(c, {
    totalRounds: Number(totals.totalRounds),
    totalDevotees: Number(totals.totalDevotees),
    deadline: endOfDayIST(),
  })
})

app.get('/leaderboard', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const page = Number(c.req.query('page') ?? '1')
  const limit = Math.min(Number(c.req.query('limit') ?? '15'), 50)
  const offset = (page - 1) * limit
  const today = todayIST()

  const rows = await db
    .select({
      devoteName: marathonJapaEntries.devoteName,
      phone: marathonJapaEntries.phone,
      city: marathonJapaEntries.city,
      totalRounds: sql<number>`sum(${marathonJapaEntries.rounds})`,
    })
    .from(marathonJapaEntries)
    .where(sql`${marathonJapaEntries.createdAt}::date = ${today}`)
    .groupBy(marathonJapaEntries.phone, marathonJapaEntries.devoteName, marathonJapaEntries.city)
    .orderBy(desc(sql`sum(${marathonJapaEntries.rounds})`))
    .limit(limit)
    .offset(offset)

  const [countResult] = await db
    .select({ count: sql<number>`count(distinct ${marathonJapaEntries.phone})` })
    .from(marathonJapaEntries)
    .where(sql`${marathonJapaEntries.createdAt}::date = ${today}`)

  const total = Number(countResult.count)

  return successResponse(c, {
    leaderboard: rows.map((r) => ({
      devoteName: r.devoteName,
      city: r.city,
      totalRounds: Number(r.totalRounds),
    })),
    pagination: { page, limit, total, hasMore: offset + limit < total },
  })
})

app.get('/names', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const q = c.req.query('q') ?? ''

  if (q.length < 2) return successResponse(c, [])

  const rows = await db
    .selectDistinct({
      devoteName: marathonJapaEntries.devoteName,
      phone: marathonJapaEntries.phone,
      city: marathonJapaEntries.city,
    })
    .from(marathonJapaEntries)
    .where(ilike(marathonJapaEntries.devoteName, `%${q}%`))
    .limit(10)

  return successResponse(c, rows)
})

app.post('/submit', async (c) => {
  const db = createDb(c.env.DATABASE_URL)

  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return errorResponse(c, 'Invalid JSON', 400)
  }

  const parsed = submitSchema.safeParse(body)
  if (!parsed.success) {
    return errorResponse(c, parsed.error.errors[0].message, 400)
  }

  const { devoteName, phone, city, rounds } = parsed.data

  const [entry] = await db
    .insert(marathonJapaEntries)
    .values({
      devoteName: devoteName.trim(),
      phone: phone.trim(),
      city: city.trim(),
      rounds,
    })
    .returning({ id: marathonJapaEntries.id })

  return successResponse(c, { id: entry.id }, 'Hare Krishna! Your marathon japa rounds have been recorded.', 201)
})

export default app
