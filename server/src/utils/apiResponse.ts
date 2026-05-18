import type { Response } from 'express';

export interface SuccessPayload<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ErrorPayload {
  success: false;
  message: string;
  errors?: unknown;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedPayload<T> {
  success: true;
  message?: string;
  data: T[];
  pagination: PaginationMeta;
}

export function successResponse<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200
): Response {
  const body: SuccessPayload<T> = { success: true, data };
  if (message !== undefined) body.message = message;
  return res.status(statusCode).json(body);
}

export function errorResponse(
  res: Response,
  message: string,
  statusCode = 400,
  errors?: unknown
): Response {
  const body: ErrorPayload = { success: false, message };
  if (errors !== undefined) body.errors = errors;
  return res.status(statusCode).json(body);
}

export function paginatedResponse<T>(
  res: Response,
  data: T[],
  pagination: PaginationMeta,
  message?: string,
  statusCode = 200
): Response {
  const body: PaginatedPayload<T> = { success: true, data, pagination };
  if (message !== undefined) body.message = message;
  return res.status(statusCode).json(body);
}

export function buildPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return { page, limit, total, totalPages };
}
