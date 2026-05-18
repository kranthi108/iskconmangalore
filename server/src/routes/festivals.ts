import { Hono } from 'hono'
import { eq, desc } from 'drizzle-orm'
import { festivals } from '../db/schema'
import { createDb } from '../db/client'
import { successResponse, errorResponse } from '../lib/response'

type Env = { Bindings: { DATABASE_URL: string } }

const app = new Hono<Env>()

function toFestivalDTO(row: typeof festivals.$inferSelect) {
  return {
    _id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    date: row.date.toISOString(),
    endDate: row.endDate?.toISOString(),
    schedule: row.schedule,
    bannerImage: row.bannerImage,
    galleryImages: row.galleryImages,
    livestreamUrl: row.livestreamUrl,
    active: row.active,
    featured: row.featured,
    order: row.sortOrder,
  }
}

app.get('/', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const activeOnly = c.req.query('active') === 'true'

  const rows = activeOnly
    ? await db.select().from(festivals).where(eq(festivals.active, true)).orderBy(festivals.sortOrder)
    : await db.select().from(festivals).orderBy(festivals.sortOrder)

  return successResponse(c, rows.map(toFestivalDTO))
})

app.get('/featured', async (c) => {
  const db = createDb(c.env.DATABASE_URL)

  const rows = await db
    .select()
    .from(festivals)
    .where(eq(festivals.featured, true))
    .orderBy(festivals.sortOrder)

  return successResponse(c, rows.map(toFestivalDTO))
})

app.get('/slug/:slug', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const slug = decodeURIComponent(c.req.param('slug'))

  const rows = await db.select().from(festivals).where(eq(festivals.slug, slug))

  if (rows.length === 0) {
    return errorResponse(c, 'Festival not found', 404)
  }

  return successResponse(c, toFestivalDTO(rows[0]))
})

export default app
