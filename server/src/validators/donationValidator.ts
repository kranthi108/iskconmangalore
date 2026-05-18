import { body } from 'express-validator';

export const createOrderValidators = [
  body('campaignId').isMongoId().withMessage('Valid campaign ID is required'),
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least 1'),
  body('donorName')
    .trim()
    .notEmpty()
    .withMessage('Donor name is required')
    .isLength({ max: 200 }),
  body('donorEmail')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('donorPhone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .isMobilePhone('en-IN')
    .withMessage('Invalid Indian mobile number'),
  body('donorPAN').optional().trim().isLength({ min: 10, max: 10 }),
  body('isAnonymous').optional().isBoolean(),
  body('dedication').optional().trim().isLength({ max: 500 }),
];

export const verifyPaymentValidators = [
  body('razorpay_order_id').trim().notEmpty().withMessage('Order ID is required'),
  body('razorpay_payment_id')
    .trim()
    .notEmpty()
    .withMessage('Payment ID is required'),
  body('razorpay_signature')
    .trim()
    .notEmpty()
    .withMessage('Signature is required'),
];
