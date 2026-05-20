import { Hono } from 'hono'
import { eq, sql } from 'drizzle-orm'
import { donationCampaigns, donations } from '../db/schema'
import { createDb } from '../db/client'
import { successResponse, errorResponse } from '../lib/response'

type Env = { Bindings: { DATABASE_URL: string } }

const app = new Hono<Env>()

app.get('/', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const activeOnly = c.req.query('active') === 'true'

  const donorCountSq = db
    .select({
      campaignId: donations.campaignId,
      count: sql<number>`count(*)`.as('count'),
    })
    .from(donations)
    .where(eq(donations.status, 'captured'))
    .groupBy(donations.campaignId)
    .as('donor_counts')

  const query = db
    .select({
      campaign: donationCampaigns,
      donorCount: sql<number>`coalesce(${donorCountSq.count}, 0)`,
    })
    .from(donationCampaigns)
    .leftJoin(donorCountSq, eq(donationCampaigns.id, donorCountSq.campaignId))

  const rows = activeOnly
    ? await query.where(eq(donationCampaigns.active, true))
    : await query

  return successResponse(c, rows.map((r) => toCampaignDTO(r.campaign, Number(r.donorCount))))
})

app.get('/slug/:slug', async (c) => {
  const db = createDb(c.env.DATABASE_URL)
  const slug = decodeURIComponent(c.req.param('slug'))

  const donorCountSq = db
    .select({
      campaignId: donations.campaignId,
      count: sql<number>`count(*)`.as('count'),
    })
    .from(donations)
    .where(eq(donations.status, 'captured'))
    .groupBy(donations.campaignId)
    .as('donor_counts')

  const rows = await db
    .select({
      campaign: donationCampaigns,
      donorCount: sql<number>`coalesce(${donorCountSq.count}, 0)`,
    })
    .from(donationCampaigns)
    .leftJoin(donorCountSq, eq(donationCampaigns.id, donorCountSq.campaignId))
    .where(eq(donationCampaigns.slug, slug))

  if (rows.length === 0) {
    return errorResponse(c, 'Campaign not found', 404)
  }

  return successResponse(c, toCampaignDTO(rows[0].campaign, Number(rows[0].donorCount)))
})

function toCampaignDTO(row: typeof donationCampaigns.$inferSelect, donorCount: number) {
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
    donorCount,
    seoMetadata: row.seoMetadata,
    themeConfig: row.themeConfig,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

export default app
