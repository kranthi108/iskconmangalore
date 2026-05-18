import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface KrishnaQuoteCardProps {
  quote: string
  source: string
  className?: string
}

export default function KrishnaQuoteCard({ quote, source, className }: KrishnaQuoteCardProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-gold-400/35 bg-gradient-to-br from-peacock-900 via-maroon to-peacock-800 p-8 text-cream shadow-[0_30px_80px_-24px_rgba(23,37,84,0.85)] sm:p-10 md:p-12',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-saffron/10 blur-3xl"
        aria-hidden
      />
      <Sparkles className="relative z-[1] mb-4 h-8 w-8 text-gold-400" aria-hidden />
      <blockquote className="relative z-[1] font-heading text-xl font-medium leading-relaxed sm:text-2xl md:text-3xl">
        “{quote}”
      </blockquote>
      <figcaption className="relative z-[1] mt-6 border-t border-white/15 pt-6 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
        {source}
      </figcaption>
    </motion.figure>
  )
}
