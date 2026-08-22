import { Hono } from 'hono'
import { sql, desc, ilike } from 'drizzle-orm'
import { harinamEntries } from '../db/schema'
import { createDb } from '../db/client'
import { successResponse, errorResponse } from '../lib/response'
import { z } from 'zod'

type Env = { Bindings: { DATABASE_URL: string } }

const app = new Hono<Env>()

const YAGNA_DEADLINE = '2026-09-04T23:59:59+05:30'

const submitSchema = z.object({
  devoteName: z.string().min(2, 'Name must be at least 2 characters').max(200),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(20),
  city: z.string().min(2, 'City must be at least 2 characters').max(150),
  rounds: z.number().int().min(1, 'At least 1 round').max(192, 'Maximum 192 rounds'),
  chantedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
})

app.get('/stats', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const today = new Date().toISOString().slice(0, 10)

  const [totals] = await db
    .select({
      totalRounds: sql<number>`coalesce(sum(${harinamEntries.rounds}), 0)`,
      totalDevotees: sql<number>`count(distinct ${harinamEntries.phone})`,
    })
    .from(harinamEntries)

  const [todayStats] = await db
    .select({
      todayRounds: sql<number>`coalesce(sum(${harinamEntries.rounds}), 0)`,
      todayDevotees: sql<number>`count(distinct ${harinamEntries.phone})`,
    })
    .from(harinamEntries)
    .where(sql`${harinamEntries.chantedOn} = ${today}`)

  return successResponse(c, {
    totalRounds: Number(totals.totalRounds),
    totalDevotees: Number(totals.totalDevotees),
    todayRounds: Number(todayStats.todayRounds),
    todayDevotees: Number(todayStats.todayDevotees),
    deadline: YAGNA_DEADLINE,
  })
})

app.get('/leaderboard', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const page = Number(c.req.query('page') ?? '1')
  const limit = Math.min(Number(c.req.query('limit') ?? '15'), 1500)
  const offset = (page - 1) * limit
  const today = new Date().toISOString().slice(0, 10)

  const rows = await db
    .select({
      devoteName: harinamEntries.devoteName,
      phone: harinamEntries.phone,
      city: harinamEntries.city,
      totalRounds: sql<number>`sum(${harinamEntries.rounds})`,
      todayRounds: sql<number>`coalesce(sum(case when ${harinamEntries.chantedOn} = ${today} then ${harinamEntries.rounds} else 0 end), 0)`,
      lastChanted: sql<string>`max(${harinamEntries.chantedOn})`,
    })
    .from(harinamEntries)
    .groupBy(harinamEntries.phone, harinamEntries.devoteName, harinamEntries.city)
    .orderBy(desc(sql`sum(${harinamEntries.rounds})`))
    .limit(limit)
    .offset(offset)

  const [countResult] = await db
    .select({ count: sql<number>`count(distinct ${harinamEntries.phone})` })
    .from(harinamEntries)

  const total = Number(countResult.count)

  return successResponse(c, {
    leaderboard: rows.map((r) => ({
      devoteName: r.devoteName,
      phoneLast4: r.phone.slice(-4),
      city: r.city,
      totalRounds: Number(r.totalRounds),
      todayRounds: Number(r.todayRounds),
      lastChanted: r.lastChanted,
    })),
    pagination: { page, limit, total, hasMore: offset + limit < total },
  })
})

app.get('/activity', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const name = c.req.query('name') ?? ''
  const phoneLast4 = c.req.query('phoneLast4') ?? ''

  if (!name || !phoneLast4) return errorResponse(c, 'name and phoneLast4 are required', 400)

  const rows = await db
    .select({
      id: harinamEntries.id,
      rounds: harinamEntries.rounds,
      chantedOn: harinamEntries.chantedOn,
      createdAt: harinamEntries.createdAt,
    })
    .from(harinamEntries)
    .where(
      sql`${harinamEntries.devoteName} = ${name} and right(${harinamEntries.phone}, 4) = ${phoneLast4}`,
    )
    .orderBy(desc(harinamEntries.chantedOn), desc(harinamEntries.createdAt))

  return successResponse(c, rows)
})

app.get('/names', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const q = c.req.query('q') ?? ''

  if (q.length < 2) return successResponse(c, [])

  const rows = await db
    .selectDistinct({
      devoteName: harinamEntries.devoteName,
      phone: harinamEntries.phone,
      city: harinamEntries.city,
    })
    .from(harinamEntries)
    .where(ilike(harinamEntries.devoteName, `%${q}%`))
    .limit(10)

  return successResponse(c, rows)
})

app.post('/submit', async (c) => {
  const db = createDb(c.env.DATABASE_URL)

  if (new Date() > new Date(YAGNA_DEADLINE)) {
    return errorResponse(c, 'The Harinam Japa Yagna has concluded. Thank you for your devotion!', 400)
  }

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

  const { devoteName, phone, city, rounds, chantedOn } = parsed.data

  const [entry] = await db
    .insert(harinamEntries)
    .values({
      devoteName: devoteName.trim(),
      phone: phone.trim(),
      city: city.trim(),
      rounds,
      chantedOn,
    })
    .returning({ id: harinamEntries.id })

  return successResponse(c, { id: entry.id }, 'Hare Krishna! Your japa rounds have been recorded.', 201)
})

export default app
