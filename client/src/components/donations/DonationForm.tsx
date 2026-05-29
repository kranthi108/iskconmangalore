import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import BlessingsSuccessScreen from '@/components/donations/BlessingsSuccessScreen'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FEATURED_CAMPAIGNS } from '@/constants/data'
import { useCampaignBySlug } from '@/hooks/useCampaigns'
import { useRazorpay } from '@/hooks/useRazorpay'
import { ApiHttpError } from '@/services/api'
import { createOrder, verifyPayment } from '@/services/donationService'
import type { Donation } from '@/types'
import type { DonorInfo } from '@/components/donations/BlessingsSuccessScreen'
import { cn } from '@/utils/cn'

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/

const donorSchema = z
  .object({
    donorName: z.string().min(2, 'Name must be at least 2 characters'),
    donorEmail: z.string().email('Enter a valid email'),
    donorPhone: z
      .string()
      .length(10, 'Phone must be exactly 10 digits')
      .regex(/^\d{10}$/, 'Phone must contain only digits'),
    donorPAN: z.string().optional(),
    isAnonymous: z.boolean(),
    dedication: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.donorPAN?.trim()) {
      return
    }
    const pan = data.donorPAN.trim().toUpperCase()
    if (!panRegex.test(pan)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['donorPAN'], message: 'Enter PAN using AAAAA9999A.' })
    }
  })

export type DonationFormShape = z.infer<typeof donorSchema>

export interface DonationFormProps {
  campaignSlug: string
  selectedAmount: number | null
  onDonationVerified?: (donation: Donation) => void
  className?: string
}

type RazorpayHandlerResponseSimple = {
  razorpay_order_id?: string
  razorpay_payment_id?: string
  razorpay_signature?: string
}

export default function DonationForm({
  campaignSlug,
  selectedAmount,
  onDonationVerified,
  className,
}: DonationFormProps) {
  const { data: campaign, isPending: loadingCampaign, isError: campaignErrored } = useCampaignBySlug(campaignSlug)
  const razorpay = useRazorpay()
  const featured = FEATURED_CAMPAIGNS.find((card) => card.slug === campaignSlug)
  const campaignTitle = useMemo(
    () => campaign?.title ?? featured?.title ?? campaignSlug.replace(/-/g, ' '),
    [campaign?.title, campaignSlug, featured?.title],
  )

  const [submissionPhase, setSubmissionPhase] = useState<'idle' | 'opening' | 'verifying'>('idle')
  const [globalError, setGlobalError] = useState<string | null>(null)
  const nameBeforeAnonymous = useRef('')
  const [blessings, setBlessings] = useState<{ receiptNumber: string; amount: number; donorInfo: DonorInfo } | null>(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useForm<DonationFormShape>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      donorName: '',
      donorEmail: '',
      donorPhone: '',
      donorPAN: '',
      isAnonymous: false,
      dedication: '',
    },
  })

  const isAnonymous = watch('isAnonymous')

  function extractFriendlyMessage(error: unknown) {
    if (error instanceof ApiHttpError) {
      return error.message
    }
    return 'Unable to continue — please chant one extra round while we stabilize the gateway.'
  }

  async function startCheckout(values: DonationFormShape) {
    if (!campaign || !campaign._id || !selectedAmount || selectedAmount < 108) {
      setGlobalError('Kindly reconnect with Krishna treasurer or choose higher than ₹108.')
      return
    }

    await razorpay.reload()

    const donorNameResolved = values.isAnonymous ? 'Anonymous Devotee' : values.donorName.trim()
    const amount = Math.round(Number(selectedAmount))
    const panNormalized = values.donorPAN?.trim() ? values.donorPAN.trim().toUpperCase() : undefined

    const order = await createOrder({
      campaignId: campaign._id,
      amount,
      donorEmail: values.donorEmail.trim(),
      donorName: donorNameResolved,
      donorPhone: values.donorPhone.trim(),
    })

    await new Promise<void>((resolvePromise, rejectPromise) => {
      setSubmissionPhase('opening')
      void razorpay
        .openPayment(order, {
          donorName: donorNameResolved,
          donorEmail: values.donorEmail.trim(),
          donorPhone: values.donorPhone.trim(),
          description: `${campaign.title} · ISKCON Mangalore`,
          imageUrl: campaign.bannerImage,
          themeColor: campaign.themeConfig?.primaryColor ?? '#6D071A',
          onSuccess(response: RazorpayHandlerResponseSimple) {
            void (async () => {
              try {
                setSubmissionPhase('verifying')
                if (
                  typeof response.razorpay_order_id !== 'string' ||
                  typeof response.razorpay_payment_id !== 'string' ||
                  typeof response.razorpay_signature !== 'string'
                ) {
                  setGlobalError('Rādhārāṇī’s treasury could not recognize the acknowledgement codes.')
                  rejectPromise(new Error('invalid razorpay response'))
                  setSubmissionPhase('idle')
                  return
                }

                const donation = await verifyPayment({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                })

                setBlessings({
                  receiptNumber: donation.receiptNumber,
                  amount,
                  donorInfo: {
                    name: donorNameResolved,
                    email: values.donorEmail.trim() || undefined,
                    phone: values.donorPhone.trim(),
                    pan: panNormalized,
                  },
                })
                onDonationVerified?.(donation)
                resolvePromise()
              } catch (error: unknown) {
                console.error('[DonationForm] verify failed', error)
                setGlobalError(extractFriendlyMessage(error))
                rejectPromise(error instanceof Error ? error : new Error('verify failed'))
              } finally {
                setSubmissionPhase('idle')
              }
            })()
          },
          onFailure(reason: unknown) {
            console.error('[DonationForm] checkout dismissed', reason)
            setSubmissionPhase('idle')
            setGlobalError('The payment veil closed gently — Śrī Rādhā invites you when you are ready.')
            rejectPromise(reason instanceof Error ? reason : new Error('payment dismissed'))
          },
        })
        .catch((error: unknown) => {
          setSubmissionPhase('idle')
          setGlobalError(extractFriendlyMessage(error))
          rejectPromise(error instanceof Error ? error : new Error('checkout bootstrap failed'))
        })
    })
  }

  async function submit(values: DonationFormShape) {
    setGlobalError(null)
    try {
      await startCheckout(values)
    } catch {
      /* surfaced via globalError */
    }
  }

  const awaitingGateway = Boolean(campaign?._id) && !razorpay.isReady && !razorpay.loadError
  const busy = isSubmitting || submissionPhase !== 'idle' || awaitingGateway

  if (loadingCampaign) {
    return (
      <Card className={cn('border border-peacock-200/70 bg-white/70 p-6 shadow-lg backdrop-blur', className)}>
        <div className="h-28 animate-pulse rounded-2xl bg-peacock-100" />
      </Card>
    )
  }

  if (!campaign || campaignErrored) {
    return (
      <Card className={cn('border border-saffron/40 bg-saffron/10 p-6 text-maroon shadow-lg', className)} role="status">
        <p className="font-heading text-lg font-semibold">Online gateway is syncing with this campaign</p>
        <p className="mt-2 text-sm text-maroon/90">
          The carved details you are reading still reach every heart — please revisit after the noon ārati or contact the reception
          desk to complete your offering manually.
        </p>
      </Card>
    )
  }

  if (!selectedAmount || selectedAmount < 108) {
    return (
      <Card className={cn('border border-gold-400/70 bg-gold-50/90 p-6 text-maroon shadow-lg', className)} role="status">
        <p className="font-heading text-xl font-semibold">Awaiting your chosen blessing</p>
        <p className="mt-2 text-sm text-maroon/90">Select any suggested amount above ₹108 to reveal Krishna's secure form.</p>
      </Card>
    )
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className={cn('space-y-5 rounded-3xl border border-white/35 bg-white/88 p-6 shadow-xl backdrop-blur-xl md:p-8', className)}
      >
        {globalError ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">
            {globalError}
          </p>
        ) : null}
        {razorpay.loadError ? (
          <p className="text-sm font-semibold text-red-600" role="alert">
            Razorpay could not load ({razorpay.loadError.message}). Please refresh with stable Wi-Fi near the goshālā lawns.
          </p>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Full name" readOnly={isAnonymous} {...register('donorName')} error={errors.donorName?.message} />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            {...register('donorEmail')}
            error={errors.donorEmail?.message}
          />
          <Input
            label="Phone"
            inputMode="numeric"
            pattern="\d{10}"
            maxLength={10}
            autoComplete="tel"
            placeholder="XXXXXXXXXX"
            {...register('donorPhone')}
            error={errors.donorPhone?.message}
          />
          <Input
            label="PAN (optional)"
            placeholder="AAAAA9999A"
            {...register('donorPAN', {
              setValueAs: (v) => (typeof v === 'string' ? v.toUpperCase() : v),
            })}
            error={errors.donorPAN?.message}
          />
        </div>

        <Controller
          name="isAnonymous"
          control={control}
          render={({ field }) => (
            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-peacock-950">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-peacock-300 accent-maroon focus:outline-none focus-visible:ring-2 focus-visible:ring-peacock-500"
                checked={field.value}
                ref={field.ref}
                onBlur={field.onBlur}
                onChange={(event) => {
                  const checked = event.target.checked
                  field.onChange(checked)
                  const currentName = getValues('donorName')
                  if (checked) {
                    if (currentName.trim() !== 'Anonymous Devotee') {
                      nameBeforeAnonymous.current = currentName.trim()
                    }
                    setValue('donorName', 'Anonymous Devotee', { shouldValidate: true, shouldDirty: true })
                  } else {
                    const restore = nameBeforeAnonymous.current.trim() || ''
                    setValue('donorName', restore, { shouldValidate: true })
                  }
                }}
              />
              Offer seva anonymously on public honours
            </label>
          )}
        />

        <Input label="Saṅkalpa dedication (optional)" placeholder="Remembering Śrīla Prabhupāda…" {...register('dedication')} />

        <Button type="submit" variant="maroon" size="lg" className="w-full" disabled={busy} isLoading={busy}>
          Proceed to Śrī Krishna Balaram’s secure treasury
        </Button>
      </form>

      <AnimatePresence>
        {blessings ? (
          <BlessingsSuccessScreen
            amount={blessings.amount}
            receiptNumber={blessings.receiptNumber}
            campaignTitle={campaignTitle}
            donorInfo={blessings.donorInfo}
            onClose={() => setBlessings(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}
