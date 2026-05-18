import mongoose, { type Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  time: string;
  venue: string;
  bannerImage: string;
  category: string;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    bannerImage: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

EventSchema.index({ date: 1, active: 1 });
EventSchema.index({ featured: 1 });

export const Event = mongoose.model<IEvent>('Event', EventSchema);
