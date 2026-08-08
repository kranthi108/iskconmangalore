// Meta Pixel event tracking utility

declare global {
  interface Window {
    fbq?: (command: string, eventName: string, parameters?: Record<string, unknown>) => void
  }
}

export interface MetaPixelEventParameters {
  content_name?: string
  content_category?: string
  content_ids?: string[]
  value?: number
  currency?: string
  num_items?: number
  [key: string]: unknown
}

/**
 * Track a Meta Pixel event
 * @param eventName - The name of the event (e.g., 'Purchase', 'PageView', 'InitiateCheckout')
 * @param parameters - Optional event parameters
 */
export function trackMetaPixelEvent(eventName: string, parameters?: MetaPixelEventParameters): void {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', eventName, parameters)
    } catch (error) {
      console.error('[Meta Pixel] Failed to track event:', error)
    }
  }
}

/**
 * Track a custom Meta Pixel event
 * @param eventName - The name of the custom event
 * @param parameters - Optional event parameters
 */
export function trackCustomMetaPixelEvent(eventName: string, parameters?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('trackCustom', eventName, parameters)
    } catch (error) {
      console.error('[Meta Pixel] Failed to track custom event:', error)
    }
  }
}

/**
 * Track PageView event
 */
export function trackPageView(): void {
  trackMetaPixelEvent('PageView')
}

/**
 * Track ViewContent event (when a user views a specific campaign)
 * @param campaignName - Name of the campaign
 * @param campaignCategory - Category of the campaign
 */
export function trackViewContent(campaignName: string, campaignCategory?: string): void {
  trackMetaPixelEvent('ViewContent', {
    content_name: campaignName,
    content_category: campaignCategory,
  })
}

/**
 * Track InitiateCheckout event (when user starts payment flow)
 * @param amount - Donation amount
 * @param campaignName - Name of the campaign
 * @param campaignCategory - Category of the campaign
 */
export function trackInitiateCheckout(amount: number, campaignName: string, campaignCategory?: string): void {
  trackMetaPixelEvent('InitiateCheckout', {
    content_name: campaignName,
    content_category: campaignCategory,
    value: amount,
    currency: 'INR',
    num_items: 1,
  })
}

/**
 * Track AddPaymentInfo event (when user fills payment information)
 * @param amount - Donation amount
 * @param campaignName - Name of the campaign
 */
export function trackAddPaymentInfo(amount: number, campaignName: string): void {
  trackMetaPixelEvent('AddPaymentInfo', {
    content_name: campaignName,
    value: amount,
    currency: 'INR',
  })
}

/**
 * Track Purchase event (when payment is successful)
 * @param amount - Donation amount
 * @param campaignName - Name of the campaign
 * @param receiptNumber - Receipt number for the donation
 * @param campaignCategory - Category of the campaign
 */
export function trackPurchase(
  amount: number,
  campaignName: string,
  receiptNumber: string,
  campaignCategory?: string,
): void {
  trackMetaPixelEvent('Purchase', {
    content_name: campaignName,
    content_category: campaignCategory,
    content_ids: [receiptNumber],
    value: amount,
    currency: 'INR',
    num_items: 1,
  })
}

/**
 * Track custom failed payment event
 * @param amount - Donation amount
 * @param campaignName - Name of the campaign
 * @param reason - Reason for failure
 */
export function trackPaymentFailed(amount: number, campaignName: string, reason: string): void {
  trackCustomMetaPixelEvent('PaymentFailed', {
    content_name: campaignName,
    value: amount,
    currency: 'INR',
    failure_reason: reason,
  })
}

/**
 * Track landing page view event
 * @param pageName - Name of the landing page
 */
export function trackLandingPageView(pageName: string): void {
  trackCustomMetaPixelEvent('LandingPageView', {
    page_name: pageName,
  })
}
