import { Router } from 'express';
import type { Response, NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';
import { submitContactForm, submitVolunteerForm } from '../controllers/contactController.js';
import { contactFormValidators, volunteerFormValidators } from '../validators/contactValidator.js';
import { errorResponse } from '../utils/apiResponse.js';

const router = Router();

function runValidation(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorResponse(res, 'Validation failed', 400, errors.array());
    return;
  }
  next();
}

router.post('/contact', contactFormValidators, runValidation, submitContactForm);
router.post('/volunteer', volunteerFormValidators, runValidation, submitVolunteerForm);

export default router;
