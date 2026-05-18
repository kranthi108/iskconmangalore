export interface FormatCurrencyOptions {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

/**
 * Formats Rupee amounts using the Indian numbering system (lakhs / crores grouping)
 * and the ₹ symbol.
 */
export function formatCurrency(amount: number, options?: FormatCurrencyOptions): string {
  if (!Number.isFinite(amount)) {
    throw new TypeError('formatCurrency expects a finite number')
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    numberingSystem: 'latn',
    minimumFractionDigits: options?.minimumFractionDigits,
    maximumFractionDigits: options?.maximumFractionDigits,
  }).format(amount)
}

/**
 * Converts an amount expressed in paise (Razorpay default) to rupees and formats with `formatCurrency`.
 */
export function formatCurrencyFromPaise(paise: number, options?: FormatCurrencyOptions): string {
  return formatCurrency(paise / 100, options)
}

export function formatCurrencyCompact(amount: number): string {
  if (!Number.isFinite(amount)) {
    throw new TypeError('formatCurrencyCompact expects a finite number')
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    maximumFractionDigits: 1,
    numberingSystem: 'latn',
  }).format(amount)
}
