import type { NextFunction, Request, Response } from 'express';
import {
  DonationCampaign,
  type DonationCampaignCategory,
} from '../models/DonationCampaign.js';
import { HttpError } from '../middleware/errorHandler.js';
import { successResponse } from '../utils/apiResponse.js';

const categories: DonationCampaignCategory[] = [
  'festival',
  'seva',
  'special',
  'monthly',
];

function parseActiveFilter(value: unknown): boolean | undefined {
  if (value === undefined || value === '') return undefined;
  if (value === 'true' || value === true) return true;
  if (value === 'false' || value === false) return false;
  return undefined;
}

export async function getAllCampaigns(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const filter: Record<string, unknown> = {};
    const category = req.query.category as string | undefined;
    if (category && categories.includes(category as DonationCampaignCategory)) {
      filter.category = category;
    }
    const active = parseActiveFilter(req.query.active);
    if (active !== undefined) {
      filter.active = active;
    }
    const campaigns = await DonationCampaign.find(filter).sort({ createdAt: -1 }).lean();
    successResponse(res, campaigns);
  } catch (err) {
    next(err);
  }
}

export async function getCampaignBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const campaign = await DonationCampaign.findOne({ slug: req.params.slug }).lean();
    if (!campaign) {
      throw new HttpError(404, 'Campaign not found');
    }
    successResponse(res, campaign);
  } catch (err) {
    next(err);
  }
}

interface CreateCampaignBody {
  slug: string;
  title: string;
  subtitle: string;
  category: DonationCampaignCategory;
  description: string;
  spiritualImportance: string;
  sloka: { text: string; translation: string; reference: string };
  bannerImage: string;
  galleryImages?: string[];
  suggestedAmounts?: number[];
  festivalDate?: string;
  startDate?: string;
  endDate?: string;
  active?: boolean;
  donorCount?: number;
  seoMetadata: { title: string; description: string; keywords?: string[] };
  themeConfig: { primaryColor: string; secondaryColor: string };
}

export async function createCampaign(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const body = req.body as CreateCampaignBody;
    if (!body.slug || !body.title) {
      throw new HttpError(400, 'slug and title are required');
    }
    if (!categories.includes(body.category)) {
      throw new HttpError(400, 'Invalid category');
    }
    const doc = await DonationCampaign.create({
      slug: body.slug,
      title: body.title,
      subtitle: body.subtitle,
      category: body.category,
      description: body.description,
      spiritualImportance: body.spiritualImportance,
      sloka: body.sloka,
      bannerImage: body.bannerImage,
      galleryImages: body.galleryImages ?? [],
      suggestedAmounts: body.suggestedAmounts ?? [],
      festivalDate: body.festivalDate ? new Date(body.festivalDate) : undefined,
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      endDate: body.endDate ? new Date(body.endDate) : undefined,
      active: body.active ?? true,
      donorCount: body.donorCount ?? 0,
      seoMetadata: {
        title: body.seoMetadata.title,
        description: body.seoMetadata.description,
        keywords: body.seoMetadata.keywords ?? [],
      },
      themeConfig: body.themeConfig,
    });
    successResponse(res, doc.toObject(), 'Campaign created', 201);
  } catch (err) {
    next(err);
  }
}

export async function updateCampaign(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const updates = { ...req.body } as Record<string, unknown>;
    if (updates.category && !categories.includes(updates.category as DonationCampaignCategory)) {
      throw new HttpError(400, 'Invalid category');
    }
    const dateFields = ['festivalDate', 'startDate', 'endDate'] as const;
    for (const field of dateFields) {
      if (typeof updates[field] === 'string') {
        updates[field] = new Date(updates[field] as string);
      }
    }
    const campaign = await DonationCampaign.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();
    if (!campaign) {
      throw new HttpError(404, 'Campaign not found');
    }
    successResponse(res, campaign, 'Campaign updated');
  } catch (err) {
    next(err);
  }
}
