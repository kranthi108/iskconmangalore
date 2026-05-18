import mongoose, { type Document, Schema } from 'mongoose';

export type DonationCampaignCategory =
  | 'festival'
  | 'seva'
  | 'special'
  | 'monthly';

export interface SlokaContent {
  text: string;
  translation: string;
  reference: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
}

export interface IDonationCampaign extends Document {
  slug: string;
  title: string;
  subtitle: string;
  category: DonationCampaignCategory;
  description: string;
  spiritualImportance: string;
  sloka: SlokaContent;
  bannerImage: string;
  galleryImages: string[];
  suggestedAmounts: number[];
  festivalDate?: Date;
  startDate?: Date;
  endDate?: Date;
  active: boolean;
  donorCount: number;
  seoMetadata: SeoMetadata;
  themeConfig: ThemeConfig;
  createdAt: Date;
  updatedAt: Date;
}

const SlokaSchema = new Schema<SlokaContent>(
  {
    text: { type: String, required: true },
    translation: { type: String, required: true },
    reference: { type: String, required: true },
  },
  { _id: false }
);

const SeoSchema = new Schema<SeoMetadata>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], default: [] },
  },
  { _id: false }
);

const ThemeSchema = new Schema<ThemeConfig>(
  {
    primaryColor: { type: String, required: true },
    secondaryColor: { type: String, required: true },
  },
  { _id: false }
);

const DonationCampaignSchema = new Schema<IDonationCampaign>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['festival', 'seva', 'special', 'monthly'],
    },
    description: { type: String, required: true },
    spiritualImportance: { type: String, required: true },
    sloka: { type: SlokaSchema, required: true },
    bannerImage: { type: String, required: true },
    galleryImages: { type: [String], default: [] },
    suggestedAmounts: { type: [Number], default: [] },
    festivalDate: { type: Date },
    startDate: { type: Date },
    endDate: { type: Date },
    active: { type: Boolean, default: true },
    donorCount: { type: Number, default: 0, min: 0 },
    seoMetadata: { type: SeoSchema, required: true },
    themeConfig: { type: ThemeSchema, required: true },
  },
  { timestamps: true }
);

DonationCampaignSchema.index({ slug: 1 });
DonationCampaignSchema.index({ category: 1, active: 1 });

export const DonationCampaign = mongoose.model<IDonationCampaign>(
  'DonationCampaign',
  DonationCampaignSchema
);
