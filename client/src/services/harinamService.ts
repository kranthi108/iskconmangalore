import { api, readApiData } from '@/services/api'

export interface HarinamStats {
  totalRounds: number
  totalDevotees: number
  todayRounds: number
  todayDevotees: number
  deadline: string
}

export interface LeaderboardEntry {
  devoteName: string
  city: string
  totalRounds: number
  todayRounds: number
  lastChanted: string
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[]
  pagination: { page: number; limit: number; total: number; hasMore: boolean }
}

export interface DevoteSuggestion {
  devoteName: string
  phone: string
  city: string
}

export interface HarinamSubmitInput {
  devoteName: string
  phone: string
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

export async function submitHarinam(data: HarinamSubmitInput): Promise<{ id: number }> {
  return readApiData(api.post('/harinam/submit', data))
}
