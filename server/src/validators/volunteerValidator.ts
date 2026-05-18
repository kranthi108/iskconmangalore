import { body } from 'express-validator';

const VALID_SEVA_CATEGORIES = [
  'Janmashtami Celebrations',
  'Ratha Yatra',
  'Radhastami',
  'Govardhan Puja',
  'Annadana',
  'General Volunteering',
];

export const volunteerSignupValidators = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .isMobilePhone('en-IN')
    .withMessage('Invalid Indian mobile number'),
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be a valid date'),
  body('hoursAvailable')
    .notEmpty()
    .withMessage('Hours available is required')
    .isInt({ min: 1, max: 24 })
    .withMessage('Hours must be between 1 and 24'),
  body('sevaCategory')
    .trim()
    .notEmpty()
    .withMessage('Seva category is required')
    .isIn(VALID_SEVA_CATEGORIES)
    .withMessage(`Must be one of: ${VALID_SEVA_CATEGORIES.join(', ')}`),
];
