import { api, readApiData } from '@/services/api'

export interface MarathonStats {
  totalRounds: number
  totalDevotees: number
  deadline: string
}

export interface MarathonLeaderboardEntry {
  devoteName: string
  city: string
  totalRounds: number
}

export interface MarathonLeaderboardResponse {
  leaderboard: MarathonLeaderboardEntry[]
  pagination: { page: number; limit: number; total: number; hasMore: boolean }
}

export interface MarathonDevoteSuggestion {
  devoteName: string
  phone: string
  city: string
}

export interface MarathonSubmitInput {
  devoteName: string
  phone: string
  city: string
  rounds: number
}

export async function getMarathonStats(): Promise<MarathonStats> {
  return readApiData(api.get('/marathon-japa/stats'))
}

export async function getMarathonLeaderboard(page = 1, limit = 15): Promise<MarathonLeaderboardResponse> {
  return readApiData(api.get(`/marathon-japa/leaderboard?page=${page}&limit=${limit}`))
}

export async function searchMarathonNames(q: string): Promise<MarathonDevoteSuggestion[]> {
  return readApiData(api.get(`/marathon-japa/names?q=${encodeURIComponent(q)}`))
}

export async function submitMarathonJapa(data: MarathonSubmitInput): Promise<{ id: number }> {
  return readApiData(api.post('/marathon-japa/submit', data))
}
