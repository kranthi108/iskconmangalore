import axios, { type AxiosError, type AxiosResponse, isAxiosError } from 'axios'
import type { ApiResponse } from '@/types'

function resolveBaseURL(): string {
  const raw = import.meta.env.VITE_API_URL
  if (typeof raw === 'string' && raw.trim().length > 0) {
    return raw.replace(/\/+$/, '')
  }
  return '/api'
}

export class ApiHttpError extends Error {
  readonly status?: number
  readonly code?: string
  readonly details?: unknown

  constructor(message: string, init?: { status?: number; code?: string; details?: unknown; cause?: unknown }) {
    super(message, { cause: init?.cause })
    this.name = 'ApiHttpError'
    this.status = init?.status
    this.code = init?.code
    this.details = init?.details
  }
}

function extractMessage(error: AxiosError<unknown>): string {
  const data = error.response?.data
  if (data && typeof data === 'object' && 'message' in data) {
    const msg = (data as { message?: unknown }).message
    if (typeof msg === 'string' && msg.trim().length > 0) return msg
    if (Array.isArray(msg) && msg.every((m) => typeof m === 'string')) {
      return msg.join(', ')
    }
  }
  if (error.response?.statusText) {
    return `${error.response.status} ${error.response.statusText}`
  }
  return error.message || 'Unexpected network error'
}

export const api = axios.create({
  baseURL: resolveBaseURL(),
  headers: {
    Accept: 'application/json',
  },
  timeout: 30_000,
})

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    if (isAxiosError(error)) {
      throw new ApiHttpError(extractMessage(error), {
        status: error.response?.status,
        code: error.code,
        details: error.response?.data,
        cause: error,
      })
    }
    throw error
  },
)

export function assertApiEnvelope<T>(
  envelope: ApiResponse<T>,
  fallbackMessage = 'Unexpected API response envelope',
): T {
  if (!envelope || typeof envelope !== 'object' || envelope.success !== true || !('data' in envelope)) {
    const message = envelope && typeof envelope === 'object' && 'message' in envelope ? String(envelope.message) : fallbackMessage
    throw new ApiHttpError(message || fallbackMessage)
  }

  return envelope.data
}

export async function readApiData<T>(
  resolver: Promise<AxiosResponse<ApiResponse<T>>>,
): Promise<T> {
  const response = await resolver
  return assertApiEnvelope(response.data)
}
