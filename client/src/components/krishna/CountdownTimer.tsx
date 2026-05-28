import { motion } from 'framer-motion'
import { useCountdown } from '@/hooks/useCountdown'
import { cn } from '@/utils/cn'

export type CountdownVariant = 'dark' | 'light'

export interface CountdownTimerProps {
  targetDate: string | Date | number | undefined
  title?: string
  className?: string
  variant?: CountdownVariant
  compact?: boolean
}

function Unit({
  label,
  value,
  variant,
  compact,
}: {
  label: string
  value: number
  variant: CountdownVariant
  compact?: boolean
}) {
  const isDark = variant === 'dark'
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center rounded-xl border text-center',
        compact ? 'px-1.5 py-1.5' : 'min-w-[4.25rem] rounded-2xl px-3 py-3 sm:min-w-[5rem] sm:px-4 sm:py-4',
        isDark
          ? 'border-white/20 bg-white/10 shadow-inner backdrop-blur-md'
          : 'border-maroon/30 bg-white shadow-md',
      )}
    >
      <span
        className={cn(
          'font-heading font-bold',
          compact ? 'text-lg leading-tight' : 'text-2xl sm:text-3xl md:text-4xl',
          isDark ? 'text-cream' : 'text-maroon',
        )}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        className={cn(
          'font-bold uppercase tracking-widest',
          compact ? 'mt-0.5 text-[0.5rem]' : 'mt-1 text-[0.65rem] sm:text-xs',
          isDark ? 'text-gold-200/90' : 'text-peacock-600',
        )}
      >
        {label}
      </span>
    </div>
  )
}

export default function CountdownTimer({
  targetDate,
  title,
  className,
  variant = 'dark',
  compact = false,
}: CountdownTimerProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate, { freezeAtZero: true })
  const isDark = variant === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'rounded-3xl border shadow-2xl',
        compact ? 'p-3' : 'p-6 sm:p-8',
        isDark
          ? 'border-gold-400/30 bg-gradient-to-br from-peacock-900/95 via-maroon/95 to-peacock-900/95 text-cream'
          : 'border-maroon/25 bg-gradient-to-br from-saffron/10 via-white to-gold-100 text-peacock-950',
        className,
      )}
    >
      {title ? (
        <h3
          className={cn(
            'text-center font-heading font-semibold',
            compact ? 'mb-2 text-sm' : 'mb-6 text-xl sm:text-2xl',
            isDark ? 'text-gold-200' : 'text-maroon',
          )}
        >
          {title}
        </h3>
      ) : null}
      <div
        className={cn(
          'flex items-center justify-center',
          compact ? 'gap-1.5' : 'flex-wrap gap-3 sm:gap-4 md:gap-5',
        )}
      >
        <Unit label="Days" value={days} variant={variant} compact={compact} />
        <Unit label="Hours" value={hours} variant={variant} compact={compact} />
        <Unit label="Minutes" value={minutes} variant={variant} compact={compact} />
        <Unit label="Seconds" value={seconds} variant={variant} compact={compact} />
      </div>
    </motion.div>
  )
}
