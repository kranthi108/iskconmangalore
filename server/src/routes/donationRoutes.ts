import { Router } from 'express';
import type { Response, NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';
import {
  createOrder,
  getCampaignDonations,
  getDonationReceipt,
  verifyPayment,
} from '../controllers/donationController.js';
import {
  createOrderValidators,
  verifyPaymentValidators,
} from '../validators/donationValidator.js';
import { donationLimiter } from '../middleware/rateLimiter.js';
import { errorResponse } from '../utils/apiResponse.js';
import mongoose from 'mongoose';

const router = Router();

function runValidation(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorResponse(res, 'Validation failed', 400, errors.array());
    return;
  }
  next();
}

function validateMongoIdParam(paramName: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName];
    if (!mongoose.isValidObjectId(String(id))) {
      errorResponse(res, 'Invalid donation ID', 400);
      return;
    }
    next();
  };
}

function validateCampaignIdParam(
  req: Request,
  res: Response,
  next: NextFunction
): void {
    if (!mongoose.isValidObjectId(String(req.params.campaignId))) {
    errorResponse(res, 'Invalid campaign ID', 400);
    return;
  }
  next();
}

router.post(
  '/create-order',
  donationLimiter,
  createOrderValidators,
  runValidation,
  createOrder
);

router.post(
  '/verify-payment',
  donationLimiter,
  verifyPaymentValidators,
  runValidation,
  verifyPayment
);

router.get('/receipt/:id', validateMongoIdParam('id'), getDonationReceipt);
router.get('/campaign/:campaignId', validateCampaignIdParam, getCampaignDonations);

export default router;
