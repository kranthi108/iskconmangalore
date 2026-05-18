import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/utils/cn'

export interface SectionHeadingProps {
  title: string
  subtitle?: string
  alignment?: 'left' | 'center' | 'right'
  decorative?: boolean
  className?: string
}

export default function SectionHeading({
  title,
  subtitle,
  alignment = 'center',
  decorative = false,
  className,
}: SectionHeadingProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.25, rootMargin: '0px 0px -10% 0px' })

  const alignClass =
    alignment === 'left' ? 'text-left' : alignment === 'right' ? 'text-right' : 'text-center'

  const flexAlign: Record<typeof alignment, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  return (
    <div ref={ref} className={cn('mb-10 md:mb-14', alignClass, className)}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn('font-heading text-3xl font-semibold text-maroon sm:text-4xl md:text-5xl')}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'mt-3 max-w-2xl text-base text-peacock-900/80 sm:text-lg',
            alignment === 'center' && 'mx-auto',
            alignment === 'right' && 'ml-auto',
          )}
        >
          {subtitle}
        </motion.p>
      ) : null}
      {decorative ? (
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.6 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className={cn('mt-6 flex items-center gap-3', flexAlign[alignment])}
          aria-hidden
        >
          <DecorativeDivider side="left" hidden={alignment === 'right'} />
          <LotusFeatherMark />
          <DecorativeDivider side="right" hidden={alignment === 'left'} />
        </motion.div>
      ) : null}
    </div>
  )
}

function LotusFeatherMark() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400/90 to-saffron/90 text-maroon shadow-md">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M12 2C9 6 6 9 4 12c2 2 4 3 8 4 4-1 6-2 8-4-2-3-5-6-8-10zm0 14c-2.5-.6-4.3-1.4-5.5-2.3C8 12.5 10 10 12 7.2 14 10 16 12.5 17.5 13.7 15.7 15.4 14.5 16z" />
      </svg>
    </span>
  )
}

function DecorativeDivider({ side, hidden }: { side: 'left' | 'right'; hidden?: boolean }) {
  if (hidden) {
    return <span className="hidden sm:block sm:w-8" />
  }
  return (
    <span
      className={cn(
        'hidden h-px w-12 bg-gradient-to-r sm:block sm:w-20 md:w-28',
        side === 'left' ? 'from-transparent to-gold-500' : 'from-gold-500 to-transparent',
      )}
    />
  )
}
