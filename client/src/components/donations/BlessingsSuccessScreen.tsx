import { AnimatePresence, motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { formatCurrency } from '@/utils/formatCurrency'
import { cn } from '@/utils/cn'

export interface BlessingsSuccessScreenProps {
  amount: number
  campaignTitle: string
  receiptNumber?: string
  onClose: () => void
}

export default function BlessingsSuccessScreen({
  amount,
  campaignTitle,
  receiptNumber,
  onClose,
}: BlessingsSuccessScreenProps) {
  const confetti = useMemo(() => Array.from({ length: 48 }, (_, i) => ({ id: i })), [])

  function downloadReceipt() {
    const lines = [
      'ISKCON Sri Krishna Balaram Mandir · Mangalore Blessings Receipt',
      `Campaign : ${campaignTitle}`,
      `Blessed amount : ${formatCurrency(amount)}`,
      receiptNumber ? `Receipt number : ${receiptNumber}` : 'Receipt number : pending confirmation',
      '',
      'Hare Krishna Hare Krishna Krishna Krishna Hare Hare',
      'Hare Rama Hare Rama Rama Rama Hare Hare',
      '',
      'All glories to Śrīla Prabhupāda!',
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `iskcon-mangalore-receipt-${Date.now()}.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn('fixed inset-0 z-[130] overflow-hidden bg-gradient-to-br from-peacock-900 via-maroon to-maroon-light')}
        aria-modal="true"
        role="dialog"
        aria-labelledby="blessings-heading"
      >
        {confetti.map((piece) => (
          <motion.span
            key={piece.id}
            className="pointer-events-none absolute size-2 rounded-full shadow-sm"
            style={{
              left: `${(piece.id * 37) % 100}%`,
              top: '-10%',
              background:
                piece.id % 3 === 0 ? '#D4AF37' : piece.id % 3 === 1 ? '#FF9933' : '#FFF8E7',
              opacity: 0.75,
            }}
            animate={{ y: ['0vh', '120vh'], rotate: [0, 320] }}
            transition={{
              repeat: Infinity,
              duration: 8 + (piece.id % 7),
              delay: piece.id * 0.05,
              ease: 'linear',
            }}
          />
        ))}
        <div className="relative z-[1] flex size-full flex-col overflow-y-auto px-4 py-10 sm:justify-center sm:px-6 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="mx-auto w-full max-w-xl rounded-[2rem] border border-white/30 bg-cream/96 p-8 text-center shadow-[0_52px_122px_-42px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <motion.div
              aria-hidden
              animate={{ rotate: [0, -4, 6, 0], scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 via-saffron to-maroon text-maroon shadow-xl ring-4 ring-gold-200/60"
            >
              <svg viewBox="0 0 72 72" className="h-16 w-16 text-cream">
                <path
                  fill="currentColor"
                  d="M36 12c6 10 16 30 18 36-10-12-24-30-46-60 24 36 48 78 66 120-18-48-48-108-120-240 78 168 168 336 168 336"
                />
              </svg>
            </motion.div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-maroon-light">Hare Krishna</p>
            <h1 id="blessings-heading" className="mt-4 font-heading text-3xl font-semibold text-maroon sm:text-4xl">
              Hare Krishna! Your seva has been received.
            </h1>
            <p className="mt-4 text-base text-peacock-950/85">
              Your offering toward <span className="font-semibold text-maroon">{campaignTitle}</span> will expand
              deity sevā, kīrtana, and sanctified prasādam for the community.
            </p>
            <div className="mt-8 space-y-3 rounded-3xl border border-peacock-900/10 bg-white/90 p-6 text-left shadow-inner">
              <div className="flex items-center justify-between text-sm font-semibold text-peacock-900">
                <span>Blessed amount</span>
                <span className="text-lg font-bold text-maroon">{formatCurrency(amount)}</span>
              </div>
              {receiptNumber ? (
                <div className="border-t border-dashed border-peacock-900/15 pt-3 text-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-peacock-800/65">Receipt number</p>
                  <p className="mt-1 font-mono text-lg text-peacock-900">{receiptNumber}</p>
                </div>
              ) : (
                <p className="text-xs text-maroon-light">We are preparing your downloadable receipt—please check your email shortly.</p>
              )}
            </div>
            <div className="mt-8 rounded-3xl bg-gradient-to-br from-peacock-900 to-maroon px-6 py-5 text-left text-cream shadow-lg">
              <p className="font-heading text-xl leading-relaxed italic text-gold-200">
                “Work done as a sacrifice for Viṣṇu has to be performed; otherwise work causes bondage in this material world. Therefore, O son of Kuntī, perform your prescribed duties for His satisfaction, and in that way you will always remain free from bondage.”
              </p>
              <p className="mt-2 text-right text-sm font-semibold text-gold-500/90">— Bhagavad-gītā 3.9 (paraphrase)</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full border-maroon/30"
                leftIcon={<Download className="h-5 w-5" aria-hidden />}
                onClick={downloadReceipt}
              >
                Download receipt
              </Button>
              <Link
                to="/"
                onClick={onClose}
                className={cn(
                  buttonVariants({ variant: 'maroon', size: 'lg' }),
                  'w-full justify-center text-center no-underline',
                )}
              >
                Back to Home
              </Link>
            </div>
            <p className="mt-4 text-xs text-peacock-900/60">
              Need to stay on this page?{' '}
              <button type="button" className="font-semibold text-peacock-700 underline-offset-2 hover:underline" onClick={onClose}>
                Dismiss overlay
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
