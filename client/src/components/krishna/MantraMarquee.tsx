import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export type MantraSpeedPreset = 'slow' | 'normal' | 'fast'

export interface MantraMarqueeProps {
  speed?: MantraSpeedPreset | number
  className?: string
}

const MANTRA =
  'Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare'

const PRESET_DURATION: Record<MantraSpeedPreset, number> = {
  slow: 55,
  normal: 38,
  fast: 24,
}

export default function MantraMarquee({ speed = 'normal', className }: MantraMarqueeProps) {
  const duration =
    typeof speed === 'number' ? Math.max(18, speed) : PRESET_DURATION[speed]

  return (
    <div
      className={cn(
        'relative overflow-hidden border-y border-gold-500/25 bg-peacock-900 py-2.5 text-gold-500 shadow-inner',
        className,
      )}
      role="presentation"
      aria-hidden
    >
      <motion.div
        className="flex w-max gap-16 whitespace-nowrap font-heading text-sm font-semibold tracking-[0.18em] sm:text-base"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration }}
      >
        <span>{MANTRA}</span>
        <span>{MANTRA}</span>
      </motion.div>
    </div>
  )
}
