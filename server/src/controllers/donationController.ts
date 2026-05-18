import type { NextFunction, Request, Response } from 'express';
import crypto from 'node:crypto';
import mongoose from 'mongoose';
import { Donation } from '../models/Donation.js';
import { DonationCampaign } from '../models/DonationCampaign.js';
import { HttpError } from '../middleware/errorHandler.js';
import { createRazorpayOrder, verifyPaymentSignature } from '../services/razorpayService.js';
import { env } from '../config/env.js';
import {
  buildPaginationMeta,
  paginatedResponse,
  successResponse,
} from '../utils/apiResponse.js';
import { generateReceiptNumber } from '../utils/generateReceipt.js';

function toPaise(rupees: number): number {
  return Math.round(Number(rupees.toFixed(2)) * 100);
}

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {
      campaignId,
      amount,
      donorName,
      donorEmail,
      donorPhone,
      donorPAN,
      donorAddress,
      isAnonymous,
      dedication,
    } = req.body as {
      campaignId: string;
      amount: number;
      donorName: string;
      donorEmail: string;
      donorPhone: string;
      donorPAN?: string;
      donorAddress?: { house?: string; street?: string; city?: string; state?: string; pincode?: string };
      isAnonymous?: boolean;
      dedication?: string;
    };

    const campaign = await DonationCampaign.findById(campaignId).lean();
    if (!campaign || !campaign.active) {
      throw new HttpError(404, 'Campaign not found or inactive');
    }

    const sevaName = campaign.title;

    const amountPaise = toPaise(Number(amount));
    if (amountPaise < 100) {
      throw new HttpError(400, 'Minimum donation is ₹1');
    }

    const receipt = `rcp_${crypto.randomUUID().replace(/-/g, '').slice(0, 32)}`;

    const order = await createRazorpayOrder(amountPaise, 'INR', receipt, {
      campaignId: String(campaign._id),
      sevaName,
    });

    const donation = await Donation.create({
      campaignId: new mongoose.Types.ObjectId(campaignId),
      sevaName,
      donorName,
      donorEmail,
      donorPhone,
      donorPAN,
      donorAddress,
      amount: Number(amount),
      currency: 'INR',
      razorpayOrderId: order.id,
      status: 'created',
      isAnonymous: Boolean(isAnonymous),
      dedication,
    });

    successResponse(
      res,
      {
        keyId: env.razorpayKeyId,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        donationId: donation.id,
      },
      'Order created',
      201
    );
  } catch (err) {
    next(err);
  }
}

export async function verifyPayment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body as {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    };

    const donation = await Donation.findOne({ razorpayOrderId: razorpay_order_id });
    if (!donation) {
      throw new HttpError(404, 'Donation record not found for this order');
    }

    if (donation.status === 'captured') {
      successResponse(res, {
        donationId: donation.id,
        receiptNumber: donation.receiptNumber,
        status: donation.status,
      });
      return;
    }

    const valid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    if (!valid) {
      donation.status = 'failed';
      donation.razorpayPaymentId = razorpay_payment_id;
      donation.razorpaySignature = razorpay_signature;
      await donation.save();
      throw new HttpError(400, 'Payment verification failed');
    }

    const receiptNumber = await generateReceiptNumber();
    donation.razorpayPaymentId = razorpay_payment_id;
    donation.razorpaySignature = razorpay_signature;
    donation.status = 'captured';
    donation.receiptNumber = receiptNumber;
    donation.paymentMethod = 'razorpay';
    await donation.save();

    await DonationCampaign.findByIdAndUpdate(donation.campaignId, {
      $inc: { donorCount: 1 },
    });

    successResponse(res, {
      donationId: donation.id,
      receiptNumber,
      status: donation.status,
      campaignId: donation.campaignId,
    });
  } catch (err) {
    next(err);
  }
}

export async function getDonationReceipt(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const donation = await Donation.findById(String(req.params.id))
      .populate('campaignId', 'title slug')
      .lean();
    if (!donation || donation.status !== 'captured') {
      throw new HttpError(404, 'Receipt not found');
    }

    successResponse(res, {
      receiptNumber: donation.receiptNumber,
      issuedAt: donation.updatedAt ?? donation.createdAt,
      donorName: donation.isAnonymous ? 'Anonymous' : donation.donorName,
      amount: donation.amount,
      currency: donation.currency,
      dedication: donation.dedication,
      campaign: donation.campaignId,
      paymentId: donation.razorpayPaymentId,
    });
  } catch (err) {
    next(err);
  }
}

export async function getCampaignDonations(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const campaignId = String(req.params.campaignId);
    const page = Math.max(Number.parseInt(String(req.query.page ?? '1'), 10), 1);
    const limit = Math.min(
      Math.max(Number.parseInt(String(req.query.limit ?? '20'), 10), 1),
      100
    );

    const campaign = await DonationCampaign.exists({ _id: campaignId });
    if (!campaign) {
      throw new HttpError(404, 'Campaign not found');
    }

    const filter = {
      campaignId: new mongoose.Types.ObjectId(campaignId),
      status: 'captured' as const,
    };

    const [total, donations] = await Promise.all([
      Donation.countDocuments(filter),
      Donation.find(filter)
        .sort({ createdAt: -1 })
        .select('-razorpaySignature')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    ]);

    const sanitized = donations.map((d) => ({
      ...d,
      donorName: d.isAnonymous ? 'Anonymous' : d.donorName,
      donorEmail: d.isAnonymous ? undefined : d.donorEmail,
      donorPhone: d.isAnonymous ? undefined : d.donorPhone,
    }));

    paginatedResponse(
      res,
      sanitized,
      buildPaginationMeta(page, limit, total),
      undefined,
      200
    );
  } catch (err) {
    next(err);
  }
}
