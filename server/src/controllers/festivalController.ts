import type { NextFunction, Request, Response } from 'express';
import { Festival } from '../models/Festival.js';
import { HttpError } from '../middleware/errorHandler.js';
import { successResponse } from '../utils/apiResponse.js';

export async function getAllFestivals(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const activeOnly = req.query.active !== 'false';
    const filter = activeOnly ? { active: true } : {};
    const festivals = await Festival.find(filter).sort({ order: 1, date: 1 }).lean();
    successResponse(res, festivals);
  } catch (err) {
    next(err);
  }
}

export async function getFestivalBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const festival = await Festival.findOne({ slug: req.params.slug }).lean();
    if (!festival) {
      throw new HttpError(404, 'Festival not found');
    }
    successResponse(res, festival);
  } catch (err) {
    next(err);
  }
}

export async function getFeaturedFestivals(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const festivals = await Festival.find({ active: true, featured: true })
      .sort({ order: 1, date: 1 })
      .lean();
    successResponse(res, festivals);
  } catch (err) {
    next(err);
  }
}
