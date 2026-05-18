import type { Festival } from '@/types'
import { api, readApiData } from '@/services/api'

export async function getFestivals(includeInactive = false): Promise<Festival[]> {
  const query = includeInactive ? '' : '?active=true'
  return readApiData(api.get(`/festivals${query}`))
}

export async function getFeaturedFestivals(): Promise<Festival[]> {
  return readApiData(api.get('/festivals/featured'))
}

export async function getFestivalBySlug(slug: string): Promise<Festival> {
  return readApiData(api.get(`/festivals/slug/${encodeURIComponent(slug)}`))
}
