import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronDown, Flower2, HandPlatter, Heart, Mountain, Sparkles, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { submitVolunteer } from '@/services/contactService'
import { ApiHttpError } from '@/services/api'
import { cn } from '@/utils/cn'

interface SevaOption {
  label: string
  icon: LucideIcon
  color: string
}

const SEVA_CATEGORIES: SevaOption[] = [
  { label: 'Janmashtami Celebrations', icon: Sparkles, color: 'text-saffron' },
  { label: 'Ratha Yatra', icon: Heart, color: 'text-maroon' },
  { label: 'Radhastami', icon: Flower2, color: 'text-pink-500' },
  { label: 'Govardhan Puja', icon: Mountain, color: 'text-emerald-600' },
  { label: 'Annadana', icon: HandPlatter, color: 'text-gold-600' },
  { label: 'General Volunteering', icon: Heart, color: 'text-peacock-600' },
]

const volunteerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .length(10, 'Phone must be exactly 10 digits')
    .regex(/^\d{10}$/, 'Phone must contain only digits'),
  date: z.string().min(1, 'Please select a date'),
  hoursAvailable: z
    .number()
    .int('Must be a whole number')
    .min(1, 'At least 1 hour')
    .max(24, 'Maximum 24 hours'),
  sevaCategory: z.string().min(1, 'Please select a seva category'),
})

function SevaDropdown({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (val: string) => void
  error?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selected = SEVA_CATEGORIES.find((c) => c.label === value)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="w-full" ref={containerRef}>
      <label className="mb-1.5 block font-heading text-sm font-semibold text-maroon">
        Seva Category <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'flex w-full items-center justify-between rounded-xl border bg-white/90 px-4 py-2.5 text-left text-sm shadow-sm transition-all',
            'focus:outline-none focus:ring-2',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
              : 'border-peacock-200/80 focus:border-peacock-500 focus:ring-peacock-500/35',
            isOpen && !error && 'border-peacock-500 ring-2 ring-peacock-500/35',
          )}
        >
          {selected ? (
            <span className="flex items-center gap-2.5">
              <selected.icon className={cn('h-4.5 w-4.5', selected.color)} aria-hidden />
              <span className="text-peacock-950">{selected.label}</span>
            </span>
          ) : (
            <span className="text-peacock-400/80">Select a seva...</span>
          )}
          <ChevronDown
            className={cn('h-4 w-4 text-peacock-500 transition-transform', isOpen && 'rotate-180')}
            aria-hidden
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-peacock-200/80 bg-white shadow-xl"
            >
              {SEVA_CATEGORIES.map((cat) => {
                const active = value === cat.label
                return (
                  <li key={cat.label}>
                    <button
                      type="button"
                      className={cn(
                        'flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors',
                        active
                          ? 'bg-maroon/10 font-semibold text-maroon'
                          : 'text-peacock-900 hover:bg-peacock-50',
                      )}
                      onClick={() => {
                        onChange(cat.label)
                        setIsOpen(false)
                      }}
                    >
                      <span
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                          active ? 'bg-maroon/15' : 'bg-peacock-50',
                        )}
                      >
                        <cat.icon className={cn('h-4 w-4', cat.color)} aria-hidden />
                      </span>
                      <span>{cat.label}</span>
                    </button>
                  </li>
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

type VolunteerFormValues = z.infer<typeof volunteerSchema>

export interface VolunteerModalProps {
  open: boolean
  onClose: () => void
}

export default function VolunteerModal({ open, onClose }: VolunteerModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: '',
      phone: '',
      date: '',
      hoursAvailable: 0,
      sevaCategory: '',
    },
  })

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      reset()
      setSuccess(false)
      setError(null)
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

  async function onSubmit(values: VolunteerFormValues) {
    setSubmitting(true)
    setError(null)
    try {
      await submitVolunteer({
        name: values.name.trim(),
        phone: values.phone.trim(),
        date: values.date,
        hoursAvailable: values.hoursAvailable,
        sevaCategory: values.sevaCategory,
      })
      setSuccess(true)
    } catch (err) {
      setError(
        err instanceof ApiHttpError
          ? err.message
          : 'Something went wrong — please try again after some time.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const todayStr = new Date().toISOString().split('T')[0]

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
          aria-label="Volunteer Sign Up"
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

            <div className="rounded-t-2xl bg-gradient-to-r from-maroon via-maroon-light to-maroon px-6 py-5 text-center text-cream">
              <p className="font-heading text-2xl font-bold">Volunteer Seva Sign Up</p>
              <p className="mt-1 text-sm text-gold-200">
                Offer your time in the service of Sri Krishna
              </p>
            </div>

            {success ? (
              <div className="px-6 pb-8 pt-10 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
                <h3 className="mt-4 font-heading text-2xl font-semibold text-peacock-950">
                  Hare Krishna!
                </h3>
                <p className="mt-2 text-peacock-800">
                  Your volunteer registration has been received. Our seva coordinator will reach out to you soon.
                </p>
                <Button
                  type="button"
                  variant="maroon"
                  size="lg"
                  className="mt-6 w-full"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 pt-5">
                {error && (
                  <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">
                    {error}
                  </p>
                )}

                <div className="space-y-4">
                  <Input
                    label="Volunteer Name"
                    placeholder="Enter your full name"
                    {...register('name')}
                    error={errors.name?.message}
                    required
                  />

                  <Input
                    label="Phone"
                    inputMode="numeric"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    autoComplete="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                    required
                  />

                  <Input
                    label="Available Date"
                    type="date"
                    min={todayStr}
                    {...register('date')}
                    error={errors.date?.message}
                    required
                  />

                  <Input
                    label="Hours Available"
                    type="number"
                    inputMode="numeric"
                    placeholder="e.g. 4"
                    min={1}
                    max={24}
                    {...register('hoursAvailable', { valueAsNumber: true })}
                    error={errors.hoursAvailable?.message}
                    required
                  />

                  <Controller
                    name="sevaCategory"
                    control={control}
                    render={({ field }) => (
                      <SevaDropdown
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.sevaCategory?.message}
                      />
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="maroon"
                  className="mt-6 w-full justify-center"
                  disabled={submitting}
                  isLoading={submitting}
                >
                  Submit Volunteer Application
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
