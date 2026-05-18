import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export interface LotusDeviderProps {
  className?: string
}

export default function LotusDevider({ className }: LotusDeviderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.7 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn('flex items-center justify-center gap-3 py-10 md:py-14', className)}
      aria-hidden
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500 sm:w-24 md:w-32" />
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-saffron text-maroon shadow-md ring-2 ring-gold-500/40">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2c-2 3-4 6-6 9 2 2 4 3 6 3.5 2-.5 4-1.5 6-3.5-2-3-4-6-6-9zm0 13c-1.2-.3-2-.7-2.6-1.2.6-1.2 1.6-2.5 2.6-4 1 1.5 2 2.8 2.6 4-.6.5-1.4.9-2.6 1.2z" />
        </svg>
      </span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500 sm:w-24 md:w-32" />
    </motion.div>
  )
}
