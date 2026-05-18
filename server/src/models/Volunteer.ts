import mongoose, { type Document, Schema } from 'mongoose';

export interface IVolunteer extends Document {
  name: string;
  phone: string;
  date: Date;
  hoursAvailable: number;
  sevaCategory: string;
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerSchema = new Schema<IVolunteer>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    hoursAvailable: { type: Number, required: true, min: 1, max: 24 },
    sevaCategory: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

VolunteerSchema.index({ createdAt: -1 });
VolunteerSchema.index({ sevaCategory: 1 });

export const Volunteer = mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);
