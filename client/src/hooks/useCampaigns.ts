import { useQuery } from '@tanstack/react-query'
import { getCampaignBySlug, getCampaigns } from '@/services/campaignService'

const campaignsKey = ['donation-campaigns'] as const

export function useCampaigns(activeOnly = true) {
  return useQuery({
    queryKey: [...campaignsKey, { scope: activeOnly ? 'active' : 'all' }] as const,
    queryFn: () => getCampaigns(activeOnly),
    staleTime: 60_000,
  })
}

export function useCampaignBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: [...campaignsKey, 'slug', slug] as const,
    enabled: Boolean(slug),
    queryFn: () => getCampaignBySlug(slug as string),
    staleTime: 60_000,
  })
}
