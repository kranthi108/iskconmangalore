import crypto from 'node:crypto';
import { env } from '../config/env.js';
import { getRazorpay } from '../config/razorpay.js';

export interface CreatedRazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export async function createRazorpayOrder(
  amountPaise: number,
  currency: string,
  receipt: string,
  notes?: Record<string, string>
): Promise<CreatedRazorpayOrder> {
  const rz = getRazorpay();
  const order = (await rz.orders.create({
    amount: amountPaise,
    currency,
    receipt,
    notes,
  })) as {
    id: string;
    amount?: number;
    currency?: string;
  };

  return {
    id: order.id,
    amount: order.amount ?? amountPaise,
    currency: order.currency ?? currency,
    receipt,
  };
}

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const payload = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac('sha256', env.razorpayKeySecret)
    .update(payload)
    .digest('hex');

  if (signature.length !== expected.length) return false;

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'utf8'),
      Buffer.from(signature, 'utf8')
    );
  } catch {
    return false;
  }
}
