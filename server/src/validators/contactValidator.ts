import { body } from 'express-validator';

export const contactFormValidators = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .isMobilePhone('en-IN')
    .withMessage('Invalid Indian mobile number'),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }),
];

export const volunteerFormValidators = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .isMobilePhone('en-IN')
    .withMessage('Invalid Indian mobile number'),
  body('areaOfInterest').trim().notEmpty().withMessage('Area of interest is required').isLength({
    max: 200,
  }),
  body('availability').optional().trim().isLength({ max: 500 }),
  body('skills').optional().trim().isLength({ max: 2000 }),
  body('notes').optional().trim().isLength({ max: 2000 }),
];
