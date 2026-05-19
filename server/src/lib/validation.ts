import { z } from 'zod'

export const feedbackSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().email('Enter a valid email'),
  phone: z.string().trim().min(1, 'Phone is required').max(20),
  subject: z.string().trim().min(1, 'Subject is required').max(200),
  message: z.string().trim().min(1, 'Message is required'),
})

const VALID_SEVA_CATEGORIES = [
  'Janmashtami Celebrations',
  'Ratha Yatra Festival',
  'Gaura Purnima',
  'Sunday Feast Program',
  'Deity Worship (Puja)',
  'Prasadam Distribution',
  'Book Distribution (Sankirtan)',
  'Temple Cleaning & Maintenance',
  'Cultural Programs & Drama',
  'Youth Outreach & Education',
]

export const volunteerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  phone: z
    .string()
    .length(10, 'Phone must be exactly 10 digits')
    .regex(/^\d{10}$/, 'Phone must contain only digits'),
  date: z.string().min(1, 'Please select a date'),
  hoursAvailable: z.number().int('Must be a whole number').min(1, 'At least 1 hour').max(24, 'Maximum 24 hours'),
  sevaCategory: z
    .string()
    .trim()
    .min(1, 'Please select a seva category')
    .refine((v) => VALID_SEVA_CATEGORIES.includes(v), 'Invalid seva category'),
})

const donorAddressSchema = z
  .object({
    house: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
  })
  .optional()

export const createOrderSchema = z.object({
  campaignId: z.number().int().positive('Invalid campaign ID'),
  amount: z.number().positive('Amount must be greater than 0'),
  donorName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  donorEmail: z.string().email('Enter a valid email').or(z.literal('')).optional(),
  donorPhone: z
    .string()
    .length(10, 'Phone must be exactly 10 digits')
    .regex(/^\d{10}$/, 'Phone must contain only digits'),
  donorPAN: z.string().optional(),
  donorAddress: donorAddressSchema,
  isAnonymous: z.boolean().optional().default(false),
  dedication: z.string().optional(),
})

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
})
