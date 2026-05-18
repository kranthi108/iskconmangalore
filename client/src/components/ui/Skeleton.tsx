import { motion } from 'framer-motion'
import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const variantClass: Record<'text' | 'image' | 'card' | 'circle', string> = {
  text: 'h-4 w-full rounded-md',
  image: 'aspect-video w-full rounded-xl',
  card: 'h-44 w-full rounded-2xl',
  circle: 'h-12 w-12 rounded-full',
}

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'image' | 'card' | 'circle'
}

export default function Skeleton({ className, variant = 'text', ...props }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading"
      className={cn('relative isolate overflow-hidden bg-peacock-100/80', variantClass[variant], className)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/75 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
      />
      <span className="absolute inset-0 animate-pulse bg-peacock-200/25" aria-hidden />
    </div>
  )
}
