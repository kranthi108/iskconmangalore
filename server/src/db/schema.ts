import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  real,
  date,
} from 'drizzle-orm/pg-core'

export const feedbacks = pgTable('feedbacks', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  subject: varchar('subject', { length: 200 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const volunteers = pgTable('volunteers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  hoursAvailable: integer('hours_available').notNull(),
  sevaCategory: varchar('seva_category', { length: 100 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const donationCampaigns = pgTable('donation_campaigns', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 500 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  description: text('description').notNull(),
  spiritualImportance: text('spiritual_importance').notNull(),
  sloka: jsonb('sloka').notNull().$type<{ text: string; translation: string; reference: string }>(),
  bannerImage: text('banner_image').notNull(),
  galleryImages: jsonb('gallery_images').notNull().$type<string[]>().default([]),
  suggestedAmounts: jsonb('suggested_amounts').notNull().$type<number[]>().default([]),
  festivalDate: timestamp('festival_date', { withTimezone: true }),
  startDate: timestamp('start_date', { withTimezone: true }),
  endDate: timestamp('end_date', { withTimezone: true }),
  active: boolean('active').notNull().default(true),
  donorCount: integer('donor_count').notNull().default(0),
  seoMetadata: jsonb('seo_metadata').notNull().$type<{ title: string; description: string; keywords: string[] }>(),
  themeConfig: jsonb('theme_config').notNull().$type<{ primaryColor: string; secondaryColor: string }>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const donations = pgTable('donations', {
  id: serial('id').primaryKey(),
  campaignId: integer('campaign_id').notNull().references(() => donationCampaigns.id),
  sevaName: varchar('seva_name', { length: 255 }).notNull(),
  donorName: varchar('donor_name', { length: 200 }).notNull(),
  donorEmail: varchar('donor_email', { length: 255 }),
  donorPhone: varchar('donor_phone', { length: 20 }).notNull(),
  donorPan: varchar('donor_pan', { length: 10 }),
  donorAddress: jsonb('donor_address').$type<{
    house?: string
    street?: string
    city?: string
    state?: string
    pincode?: string
  }>(),
  amount: real('amount').notNull(),
  currency: varchar('currency', { length: 10 }).notNull().default('INR'),
  paymentMethod: varchar('payment_method', { length: 50 }),
  razorpayOrderId: varchar('razorpay_order_id', { length: 255 }),
  razorpayPaymentId: varchar('razorpay_payment_id', { length: 255 }),
  razorpaySignature: text('razorpay_signature'),
  status: varchar('status', { length: 20 }).notNull().default('created'),
  receiptNumber: varchar('receipt_number', { length: 50 }).unique(),
  isAnonymous: boolean('is_anonymous').notNull().default(false),
  dedication: text('dedication'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const festivals = pgTable('festivals', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 500 }).notNull(),
  description: text('description').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }),
  schedule: jsonb('schedule').notNull().$type<Array<{ time: string; event: string }>>().default([]),
  bannerImage: text('banner_image').notNull(),
  galleryImages: jsonb('gallery_images').notNull().$type<string[]>().default([]),
  livestreamUrl: text('livestream_url'),
  active: boolean('active').notNull().default(true),
  featured: boolean('featured').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const harinamEntries = pgTable('harinam_entries', {
  id: serial('id').primaryKey(),
  devoteName: varchar('devote_name', { length: 200 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  city: varchar('city', { length: 150 }).notNull(),
  rounds: integer('rounds').notNull(),
  chantedOn: date('chanted_on').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const marathonJapaEntries = pgTable('marathon_japa_entries', {
  id: serial('id').primaryKey(),
  devoteName: varchar('devote_name', { length: 200 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  city: varchar('city', { length: 150 }).notNull(),
  rounds: integer('rounds').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})
