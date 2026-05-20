import { api, readApiData } from '@/services/api'

export interface HarinamStats {
  totalRounds: number
  totalDevotees: number
}

export interface LeaderboardEntry {
  rank: number
  devoteName: string
  city: string
  totalRounds: number
  totalEntries: number
  lastChanted: string
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[]
  pagination: { page: number; limit: number; total: number; hasMore: boolean }
}

export interface DevoteSuggestion {
  devoteName: string
  city: string
}

export interface HarinamSubmitInput {
  devoteName: string
  city: string
  rounds: number
  chantedOn: string
}

export async function getHarinamStats(): Promise<HarinamStats> {
  return readApiData(api.get('/harinam/stats'))
}

export async function getLeaderboard(page = 1, limit = 15): Promise<LeaderboardResponse> {
  return readApiData(api.get(`/harinam/leaderboard?page=${page}&limit=${limit}`))
}

export async function searchDevoteNames(q: string): Promise<DevoteSuggestion[]> {
  return readApiData(api.get(`/harinam/names?q=${encodeURIComponent(q)}`))
}

export async function submitHarinam(data: HarinamSubmitInput): Promise<{ id: number; status: string }> {
  return readApiData(api.post('/harinam/submit', data))
}
