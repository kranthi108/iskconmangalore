import type { DonationCampaign } from '@/types'
import { api, readApiData } from '@/services/api'

export async function getCampaigns(activeOnly = false): Promise<DonationCampaign[]> {
  const query = activeOnly ? '?active=true' : ''
  return readApiData(api.get(`/campaigns${query}`))
}

export async function getCampaignBySlug(slug: string): Promise<DonationCampaign> {
  return readApiData(api.get(`/campaigns/slug/${encodeURIComponent(slug)}`))
}
