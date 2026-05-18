export interface DonationCampaign {
  _id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'festival' | 'seva' | 'special' | 'monthly';
  description: string;
  spiritualImportance: string;
  sloka: {
    text: string;
    translation: string;
    reference: string;
  };
  bannerImage: string;
  galleryImages: string[];
  suggestedAmounts: number[];
  festivalDate?: string;
  startDate: string;
  endDate: string;
  active: boolean;
  donorCount: number;
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  themeConfig: {
    primaryColor: string;
    secondaryColor: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  _id: string;
  campaignId: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPAN?: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: 'created' | 'authorized' | 'captured' | 'failed' | 'refunded';
  receiptNumber: string;
  isAnonymous: boolean;
  dedication?: string;
  createdAt: string;
}

export interface Festival {
  _id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  endDate?: string;
  schedule: Array<{ time: string; event: string }>;
  bannerImage: string;
  galleryImages: string[];
  livestreamUrl?: string;
  active: boolean;
  featured: boolean;
  order: number;
}

export interface DarshanTiming {
  name: string;
  time: string;
  description: string;
  icon: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface DonationFormData {
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPAN?: string;
  amount: number;
  isAnonymous: boolean;
  dedication?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
