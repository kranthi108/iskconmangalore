import { useCallback, useEffect, useRef, useState } from 'react'
import type { RazorpayOrder } from '@/types'

const RAZORPAY_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'

declare global {
  interface Window {
    Razorpay?: RazorpayCheckoutConstructor
  }
}

type RazorpayHandlerResponse = {
  razorpay_order_id?: string
  razorpay_payment_id?: string
  razorpay_signature?: string
  [key: string]: unknown
}

type RazorpayModalDismiss = {
  reason?: 'timeout' | 'backbutton' | string
  [key: string]: unknown
}

type RazorpayHandlers = {
  handler?: (response: RazorpayHandlerResponse) => void
  modal?: {
    ondismiss?: (details: RazorpayModalDismiss) => void
    confirm_close?: boolean
    escape?: boolean
    handleback?: boolean
    animation?: boolean
  }
}

type RazorpayPrefill = {
  name?: string
  email?: string
  contact?: string
}

type RazorpayTheme = {
  hide_topbar?: boolean
  color?: string
  backdrop_color?: string
}

type RazorpayNotes = Record<string, string>

type RazorpayCheckoutOptions = {
  key?: string
  amount: number
  currency: string
  order_id: string
  name?: string
  description?: string
  image?: string
  callback_url?: string
  redirect?: boolean
  prefill?: RazorpayPrefill
  readonly?: {
    contact?: boolean
    email?: boolean
    name?: boolean
  }
  notes?: RazorpayNotes
  manager?: string
  theme?: RazorpayTheme
  recurring?: string | number | boolean
  sms_hash?: string
  send_sms_hash?: boolean
  allow_rotation?: boolean
  retry?: boolean | { enabled?: boolean; max_count?: number }
  config?: { display?: Record<string, unknown> }
} & RazorpayHandlers

interface RazorpayCheckoutInstance {
  open(): void
  close(): void
}

interface RazorpayCheckoutConstructor {
  new (options: RazorpayCheckoutOptions): RazorpayCheckoutInstance
}

class RazorpayBootstrapError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RazorpayBootstrapError'
  }
}

let razorpayLoader: Promise<void> | null = null

function loadRazorpayOnce(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new RazorpayBootstrapError('Razorpay checkout can only load in a browser context'))
  }

  if (window.Razorpay) {
    return Promise.resolve()
  }

  razorpayLoader ??= new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RAZORPAY_SCRIPT_SRC}"]`)

    const finalize = () => {
      if (!window.Razorpay) {
        reject(new RazorpayBootstrapError('Razorpay failed to initialize after script load'))
        razorpayLoader = null
        return
      }

      resolve()
    }

    if (existing) {
      if (existing.dataset.loaded === 'true') {
        try {
          finalize()
        } catch (error: unknown) {
          reject(error)
        }
        return
      }

      existing.addEventListener('load', () => {
        existing.dataset.loaded = 'true'
        try {
          finalize()
        } catch (error: unknown) {
          reject(error)
        }
      })
      existing.addEventListener(
        'error',
        () => {
          razorpayLoader = null
          reject(new RazorpayBootstrapError('Failed to fetch Razorpay checkout script'))
        },
        { once: true },
      )

      return
    }

    const script = document.createElement('script')
    script.src = RAZORPAY_SCRIPT_SRC
    script.async = true
    script.onload = () => {
      script.dataset.loaded = 'true'
      try {
        finalize()
      } catch (error: unknown) {
        reject(error)
      }
    }
    script.onerror = () => {
      razorpayLoader = null
      reject(new RazorpayBootstrapError('Failed to fetch Razorpay checkout script'))
    }

    document.body.appendChild(script)
  })

  return razorpayLoader
}

export interface RazorpayCheckoutContext {
  donorName: string
  donorEmail?: string
  donorPhone?: string
  merchantName?: string
  description?: string
  imageUrl?: string
  themeColor?: string
  onSuccess?: (response: RazorpayHandlerResponse) => void
  onFailure?: (reason: unknown) => void
  modalHandlers?: RazorpayHandlers['modal']
}

export interface UseRazorpayResult {
  isReady: boolean
  loadError: Error | null
  openPayment: (order: RazorpayOrder, context: RazorpayCheckoutContext) => Promise<void>
  reload: () => Promise<void>
}

export function useRazorpay(): UseRazorpayResult {
  const [isReady, setIsReady] = useState<boolean>(() => typeof window !== 'undefined' && Boolean(window.Razorpay))
  const [loadError, setLoadError] = useState<Error | null>(null)
  const activeInstanceRef = useRef<RazorpayCheckoutInstance | null>(null)

  useEffect(() => {
    let cancelled = false

    loadRazorpayOnce()
      .then(() => {
        if (!cancelled) {
          setIsReady(true)
          setLoadError(null)
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setIsReady(false)
          setLoadError(error instanceof Error ? error : new Error(String(error)))
        }
      })

    return () => {
      cancelled = true
      activeInstanceRef.current?.close()
      activeInstanceRef.current = null
    }
  }, [])

  const reload = useCallback(async () => {
    setLoadError(null)
    await loadRazorpayOnce()
    setIsReady(true)
  }, [])

  const openPayment = useCallback(async (order: RazorpayOrder, context: RazorpayCheckoutContext) => {
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID?.trim()
    if (!key) {
      throw new RazorpayBootstrapError('Missing VITE_RAZORPAY_KEY_ID environment variable')
    }

    await loadRazorpayOnce()

    if (!window.Razorpay) {
      throw new RazorpayBootstrapError('Razorpay constructor unavailable on window object')
    }

    const checkoutOptions: RazorpayCheckoutOptions = {
      key,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: context.merchantName ?? 'ISKCON Sri Krishna Balaram Mandir',
      description: context.description ?? 'Online donation',
      image: context.imageUrl,
      prefill: {
        name: context.donorName,
        email: context.donorEmail,
        contact: context.donorPhone,
      },
      readonly: {
        contact: false,
        email: false,
        name: false,
      },
      theme: context.themeColor ? { color: context.themeColor } : undefined,
      modal: context.modalHandlers,
      handler(response) {
        try {
          context.onSuccess?.(response)
        } catch (handlerError) {
          context.onFailure?.(handlerError)
        }
      },
    }

    activeInstanceRef.current?.close()

    const razorpayInstance = new window.Razorpay(checkoutOptions)

    activeInstanceRef.current = razorpayInstance
    razorpayInstance.open()
  }, [])

  return {
    isReady,
    loadError,
    openPayment,
    reload,
  }
}
