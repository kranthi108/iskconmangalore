import type { Context } from 'hono'

export function successResponse<T>(c: Context, data: T, message?: string, status: 200 | 201 = 200) {
  return c.json({ success: true as const, data, message }, status)
}

export function errorResponse(c: Context, message: string, status: 400 | 404 | 409 | 422 | 500 = 400) {
  return c.json({ success: false as const, message }, status)
}
