import { useQuery } from '@tanstack/react-query'
import { getFeaturedFestivals, getFestivals } from '@/services/festivalService'

const festivalsRoot = ['iskcon-festivals'] as const

export function useFestivals(includeInactive = false) {
  return useQuery({
    queryKey: [...festivalsRoot, { visibility: includeInactive ? 'all' : 'active' }] as const,
    queryFn: () => getFestivals(includeInactive),
    staleTime: 60_000,
  })
}

export function useFeaturedFestivals() {
  return useQuery({
    queryKey: [...festivalsRoot, 'featured'] as const,
    queryFn: () => getFeaturedFestivals(),
    staleTime: 60_000,
  })
}
