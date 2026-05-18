import type { NextFunction, Request, Response } from 'express';
import { Contact } from '../models/Contact.js';
import { successResponse } from '../utils/apiResponse.js';

export async function submitContactForm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, email, phone, subject, message } = req.body as {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    };

    const entry = await Contact.create({ name, email, phone, subject, message });
    successResponse(
      res,
      { id: entry.id, createdAt: entry.createdAt },
      'Your message has been received',
      201
    );
  } catch (err) {
    next(err);
  }
}

export async function submitVolunteerForm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, email, phone, areaOfInterest, availability, skills, notes } =
      req.body as {
        name: string;
        email: string;
        phone: string;
        areaOfInterest: string;
        availability?: string;
        skills?: string;
        notes?: string;
      };

    const parts = [
      `Area of interest: ${areaOfInterest}`,
      availability ? `Availability: ${availability}` : null,
      skills ? `Skills: ${skills}` : null,
      notes ? `Notes: ${notes}` : null,
    ].filter(Boolean);

    const entry = await Contact.create({
      name,
      email,
      phone,
      subject: `Volunteer application — ${areaOfInterest}`,
      message: parts.join('\n\n'),
    });

    successResponse(
      res,
      { id: entry.id, createdAt: entry.createdAt },
      'Thank you for offering your service',
      201
    );
  } catch (err) {
    next(err);
  }
}
