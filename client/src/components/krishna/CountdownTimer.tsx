import { motion } from 'framer-motion'
import { useCountdown } from '@/hooks/useCountdown'
import { cn } from '@/utils/cn'

export type CountdownVariant = 'dark' | 'light'

export interface CountdownTimerProps {
  targetDate: string | Date | number | undefined
  title?: string
  className?: string
  variant?: CountdownVariant
}

function Unit({ label, value, variant }: { label: string; value: number; variant: CountdownVariant }) {
  const isDark = variant === 'dark'
  return (
    <div
      className={cn(
        'flex min-w-[4.25rem] flex-col items-center rounded-2xl border px-3 py-3 text-center sm:min-w-[5rem] sm:px-4 sm:py-4',
        isDark
          ? 'border-white/20 bg-white/10 shadow-inner backdrop-blur-md'
          : 'border-maroon/30 bg-white shadow-md',
      )}
    >
      <span
        className={cn(
          'font-heading text-2xl font-bold sm:text-3xl md:text-4xl',
          isDark ? 'text-cream' : 'text-maroon',
        )}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        className={cn(
          'mt-1 text-[0.65rem] font-bold uppercase tracking-widest sm:text-xs',
          isDark ? 'text-gold-200/90' : 'text-peacock-600',
        )}
      >
        {label}
      </span>
    </div>
  )
}

export default function CountdownTimer({ targetDate, title, className, variant = 'dark' }: CountdownTimerProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate, { freezeAtZero: true })
  const isDark = variant === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'rounded-3xl border p-6 shadow-2xl sm:p-8',
        isDark
          ? 'border-gold-400/30 bg-gradient-to-br from-peacock-900/95 via-maroon/95 to-peacock-900/95 text-cream'
          : 'border-maroon/25 bg-gradient-to-br from-saffron/10 via-white to-gold-100 text-peacock-950',
        className,
      )}
    >
      {title ? (
        <h3
          className={cn(
            'mb-6 text-center font-heading text-xl font-semibold sm:text-2xl',
            isDark ? 'text-gold-200' : 'text-maroon',
          )}
        >
          {title}
        </h3>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5">
        <Unit label="Days" value={days} variant={variant} />
        <Unit label="Hours" value={hours} variant={variant} />
        <Unit label="Minutes" value={minutes} variant={variant} />
        <Unit label="Seconds" value={seconds} variant={variant} />
      </div>
    </motion.div>
  )
}
