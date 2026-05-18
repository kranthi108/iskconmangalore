import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { formatCurrency } from '@/utils/formatCurrency'
import { cn } from '@/utils/cn'

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/

const donorSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email').or(z.literal('')),
    phone: z
      .string()
      .length(10, 'Phone must be exactly 10 digits')
      .regex(/^\d{10}$/, 'Phone must contain only digits'),
    house: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
    pan: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.pan?.trim()) return
    if (!panRegex.test(data.pan.trim().toUpperCase())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['pan'], message: 'Enter PAN as AAAAA9999A' })
    }
  })

export type DonateModalFormValues = z.infer<typeof donorSchema>

export interface DonateModalProps {
  open: boolean
  onClose: () => void
  amount: number
  sevaName: string
  sevaType?: string
  onSubmit: (values: DonateModalFormValues) => void | Promise<void>
  isSubmitting?: boolean
}

export default function DonateModal({
  open,
  onClose,
  amount,
  sevaName,
  sevaType = 'One-time',
  onSubmit,
  isSubmitting = false,
}: DonateModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DonateModalFormValues>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      house: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      pan: '',
    },
  })

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      reset()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, reset])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-8 backdrop-blur-sm sm:items-center sm:py-10"
          onClick={(e) => {
            if (e.target === backdropRef.current) onClose()
          }}
          aria-modal="true"
          role="dialog"
          aria-label={`Donate for ${sevaName}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -right-2 -top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-peacock-700 shadow-lg transition hover:bg-gray-100 sm:-right-3 sm:-top-3"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="rounded-t-2xl bg-gradient-to-r from-gold-100 via-saffron/20 to-gold-100 px-6 py-5 text-center">
              <p className="font-heading text-3xl font-bold text-saffron">
                {formatCurrency(amount, { maximumFractionDigits: 0 })}
              </p>
              <p className="mt-1 text-sm font-semibold text-saffron/80">
                {sevaName} — {sevaType}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 pt-5">
              <h2 className="font-heading text-xl font-bold text-peacock-950">Donor Information</h2>
              <div className="mb-5 mt-1 h-px bg-gradient-to-r from-saffron via-gold-400 to-transparent" />
              <p className="mb-5 text-sm text-peacock-700">
                Please provide your details to proceed with the donation
              </p>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...register('fullName')}
                  error={errors.fullName?.message}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="email@example.com"
                    autoComplete="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                  <Input
                    label="Phone"
                    inputMode="numeric"
                    placeholder="+91 XXXXX XXXXX"
                    maxLength={10}
                    autoComplete="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                    required
                  />
                </div>

                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-peacock-600">Address</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="House / Flat No."
                      placeholder="House / Flat No."
                      {...register('house')}
                    />
                    <Input
                      label="Street Name"
                      placeholder="Street / Area"
                      {...register('street')}
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <Input label="City" placeholder="City" {...register('city')} />
                    <Input label="State" placeholder="State" {...register('state')} />
                    <Input label="Pincode" placeholder="Pincode" {...register('pincode')} />
                  </div>
                </div>

                <div>
                  <Input
                    label="PAN Number"
                    placeholder="ABCDE1234F"
                    {...register('pan', {
                      setValueAs: (v) => (typeof v === 'string' ? v.toUpperCase() : v),
                    })}
                    error={errors.pan?.message}
                  />
                  <p className="mt-1 text-xs text-peacock-500">(Optional — for 80G tax receipt)</p>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className={cn(
                  'mt-6 w-full justify-center rounded-xl bg-gradient-to-r from-saffron via-saffron to-amber-500 text-white shadow-lg',
                  'hover:from-saffron/90 hover:to-amber-500/90',
                  'disabled:opacity-50',
                )}
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Proceed to Payment
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
