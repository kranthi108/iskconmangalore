import mongoose, { type Document, Schema, Types } from 'mongoose';

export type DonationStatus =
  | 'created'
  | 'authorized'
  | 'captured'
  | 'failed'
  | 'refunded';

export interface IDonation extends Document {
  campaignId: Types.ObjectId;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPAN?: string;
  amount: number;
  currency: string;
  paymentMethod?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: DonationStatus;
  receiptNumber?: string;
  isAnonymous: boolean;
  dedication?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: 'DonationCampaign',
      required: true,
    },
    donorName: { type: String, required: true, trim: true },
    donorEmail: { type: String, required: true, trim: true, lowercase: true },
    donorPhone: { type: String, required: true, trim: true },
    donorPAN: { type: String, trim: true, uppercase: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: 'INR', uppercase: true },
    paymentMethod: { type: String, trim: true },
    razorpayOrderId: { type: String, trim: true },
    razorpayPaymentId: { type: String, trim: true },
    razorpaySignature: { type: String, trim: true },
    status: {
      type: String,
      required: true,
      enum: ['created', 'authorized', 'captured', 'failed', 'refunded'],
      default: 'created',
    },
    receiptNumber: { type: String, trim: true, unique: true, sparse: true },
    isAnonymous: { type: Boolean, default: false },
    dedication: { type: String, trim: true },
  },
  { timestamps: true }
);

DonationSchema.index({ campaignId: 1, createdAt: -1 });
DonationSchema.index({ razorpayOrderId: 1 });

export const Donation = mongoose.model<IDonation>('Donation', DonationSchema);
