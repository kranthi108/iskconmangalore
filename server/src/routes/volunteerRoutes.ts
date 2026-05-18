import { Router } from 'express';
import type { Response, NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';
import { submitVolunteerSignup } from '../controllers/volunteerController.js';
import { volunteerSignupValidators } from '../validators/volunteerValidator.js';
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

router.post('/', volunteerSignupValidators, runValidation, submitVolunteerSignup);

export default router;
