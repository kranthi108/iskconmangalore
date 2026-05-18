import type { NextFunction, Request, Response } from 'express';
import { Volunteer } from '../models/Volunteer.js';
import { successResponse } from '../utils/apiResponse.js';

export async function submitVolunteerSignup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, phone, date, hoursAvailable, sevaCategory } = req.body as {
      name: string;
      phone: string;
      date: string;
      hoursAvailable: number;
      sevaCategory: string;
    };

    const entry = await Volunteer.create({
      name,
      phone,
      date: new Date(date),
      hoursAvailable,
      sevaCategory,
    });

    successResponse(
      res,
      { id: entry.id, createdAt: entry.createdAt },
      'Thank you for volunteering — Hare Krishna!',
      201
    );
  } catch (err) {
    next(err);
  }
}
