import { Donation } from '../models/Donation.js';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function generateReceiptNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ISKCON-MNG-${year}-`;
  const regex = new RegExp(`^${escapeRegex(prefix)}\\d+$`);
  const last = await Donation.findOne({ receiptNumber: regex })
    .sort({ receiptNumber: -1 })
    .select('receiptNumber')
    .lean()
    .exec();

  let next = 1;
  if (last?.receiptNumber) {
    const segment = last.receiptNumber.slice(prefix.length);
    const seq = Number.parseInt(segment, 10);
    if (!Number.isNaN(seq)) next = seq + 1;
  }

  return `${prefix}${String(next).padStart(6, '0')}`;
}
