import mongoose, { type Document, Schema } from 'mongoose';

export type SevaBookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

export interface ISevaBooking extends Document {
  sevaType: string;
  devoteName: string;
  devoteEmail: string;
  devotePhone: string;
  date: Date;
  amount: number;
  status: SevaBookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const SevaBookingSchema = new Schema<ISevaBooking>(
  {
    sevaType: { type: String, required: true, trim: true },
    devoteName: { type: String, required: true, trim: true },
    devoteEmail: { type: String, required: true, trim: true, lowercase: true },
    devotePhone: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

SevaBookingSchema.index({ date: 1, status: 1 });

export const SevaBooking = mongoose.model<ISevaBooking>(
  'SevaBooking',
  SevaBookingSchema
);
