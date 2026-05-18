import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { donationCampaigns } from '../db/schema'
import { createDb } from '../db/client'
import { successResponse, errorResponse } from '../lib/response'

type Env = { Bindings: { DATABASE_URL: string } }

const app = new Hono<Env>()

function toCampaignDTO(row: typeof donationCampaigns.$inferSelect) {
  return {
    _id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    category: row.category,
    description: row.description,
    spiritualImportance: row.spiritualImportance,
    sloka: row.sloka,
    bannerImage: row.bannerImage,
    galleryImages: row.galleryImages,
    suggestedAmounts: row.suggestedAmounts,
    festivalDate: row.festivalDate?.toISOString(),
    startDate: row.startDate?.toISOString(),
    endDate: row.endDate?.toISOString(),
    active: row.active,
    donorCount: row.donorCount,
    seoMetadata: row.seoMetadata,
    themeConfig: row.themeConfig,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

app.get('/', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const activeOnly = c.req.query('active') === 'true'

  const rows = activeOnly
    ? await db.select().from(donationCampaigns).where(eq(donationCampaigns.active, true))
    : await db.select().from(donationCampaigns)

  return successResponse(c, rows.map(toCampaignDTO))
})

app.get('/slug/:slug', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const slug = decodeURIComponent(c.req.param('slug'))

  const rows = await db.select().from(donationCampaigns).where(eq(donationCampaigns.slug, slug))

  if (rows.length === 0) {
    return errorResponse(c, 'Campaign not found', 404)
  }

  return successResponse(c, toCampaignDTO(rows[0]))
})

export default app
