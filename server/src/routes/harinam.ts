import { Hono } from 'hono'
import { eq, sql, desc, ilike } from 'drizzle-orm'
import { harinamEntries } from '../db/schema'
import { createDb } from '../db/client'
import { successResponse, errorResponse } from '../lib/response'
import { z } from 'zod'

type Env = { Bindings: { DATABASE_URL: string } }

const app = new Hono<Env>()

const submitSchema = z.object({
  devoteName: z.string().min(2, 'Name must be at least 2 characters').max(200),
  city: z.string().min(2, 'City must be at least 2 characters').max(150),
  rounds: z.number().int().min(1, 'At least 1 round').max(192, 'Maximum 192 rounds'),
  chantedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
})

app.get('/stats', async (c) => {
  const db = createDb(c.env.DATABASE_URL)

  const result = await db
    .select({
      totalRounds: sql<number>`coalesce(sum(${harinamEntries.rounds}), 0)`,
      totalDevotees: sql<number>`count(distinct ${harinamEntries.devoteName})`,
    })
    .from(harinamEntries)
    .where(eq(harinamEntries.status, 'approved'))

  return successResponse(c, {
    totalRounds: Number(result[0].totalRounds),
    totalDevotees: Number(result[0].totalDevotees),
  })
})

app.get('/leaderboard', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const page = Number(c.req.query('page') ?? '1')
  const limit = Math.min(Number(c.req.query('limit') ?? '15'), 50)
  const offset = (page - 1) * limit

  const rows = await db
    .select({
      devoteName: harinamEntries.devoteName,
      city: harinamEntries.city,
      totalRounds: sql<number>`sum(${harinamEntries.rounds})`,
      totalEntries: sql<number>`count(*)`,
      lastChanted: sql<string>`max(${harinamEntries.chantedOn})`,
    })
    .from(harinamEntries)
    .where(eq(harinamEntries.status, 'approved'))
    .groupBy(harinamEntries.devoteName, harinamEntries.city)
    .orderBy(desc(sql`sum(${harinamEntries.rounds})`))
    .limit(limit)
    .offset(offset)

  const countResult = await db
    .select({ count: sql<number>`count(distinct ${harinamEntries.devoteName})` })
    .from(harinamEntries)
    .where(eq(harinamEntries.status, 'approved'))

  const total = Number(countResult[0].count)

  return successResponse(c, {
    leaderboard: rows.map((r, idx) => ({
      rank: offset + idx + 1,
      devoteName: r.devoteName,
      city: r.city,
      totalRounds: Number(r.totalRounds),
      totalEntries: Number(r.totalEntries),
      lastChanted: r.lastChanted,
    })),
    pagination: { page, limit, total, hasMore: offset + limit < total },
  })
})

app.get('/names', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const q = c.req.query('q') ?? ''

  if (q.length < 2) {
    return successResponse(c, [])
  }

  const rows = await db
    .selectDistinct({ devoteName: harinamEntries.devoteName, city: harinamEntries.city })
    .from(harinamEntries)
    .where(ilike(harinamEntries.devoteName, `%${q}%`))
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

  const { devoteName, city, rounds, chantedOn } = parsed.data

  const [entry] = await db
    .insert(harinamEntries)
    .values({
      devoteName: devoteName.trim(),
      city: city.trim(),
      rounds,
      chantedOn,
      status: 'submitted',
    })
    .returning({ id: harinamEntries.id, status: harinamEntries.status })

  return successResponse(c, { id: entry.id, status: entry.status }, 'Hare Krishna! Your japa entry has been submitted for approval.', 201)
})

export default app
