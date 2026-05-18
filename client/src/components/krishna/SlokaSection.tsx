import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export interface SlokaSectionProps {
  text: string
  translation: string
  reference: string
  className?: string
}

export default function SlokaSection({ text, translation, reference, className }: SlokaSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'rounded-3xl border border-peacock-200/80 bg-white/80 p-8 shadow-lg backdrop-blur-md sm:p-10',
        className,
      )}
    >
      <p className="font-sanskrit text-center text-2xl leading-relaxed text-peacock-900 sm:text-3xl">{text}</p>
      <p className="mt-6 text-center text-base text-peacock-900/85 sm:text-lg">{translation}</p>
      <p className="mt-4 text-center text-sm font-semibold uppercase tracking-widest text-maroon">{reference}</p>
    </motion.section>
  )
}
