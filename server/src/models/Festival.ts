import mongoose, { type Document, Schema } from 'mongoose';

export interface FestivalScheduleEntry {
  time: string;
  event: string;
}

export interface IFestival extends Document {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: Date;
  endDate?: Date;
  schedule: FestivalScheduleEntry[];
  bannerImage: string;
  galleryImages: string[];
  livestreamUrl?: string;
  active: boolean;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleSchema = new Schema<FestivalScheduleEntry>(
  {
    time: { type: String, required: true },
    event: { type: String, required: true },
  },
  { _id: false }
);

const FestivalSchema = new Schema<IFestival>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    endDate: { type: Date },
    schedule: { type: [ScheduleSchema], default: [] },
    bannerImage: { type: String, required: true },
    galleryImages: { type: [String], default: [] },
    livestreamUrl: { type: String, trim: true },
    active: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

FestivalSchema.index({ slug: 1 });
FestivalSchema.index({ featured: 1, order: 1 });

export const Festival = mongoose.model<IFestival>('Festival', FestivalSchema);
