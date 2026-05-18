import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  hover?: boolean
  glow?: boolean
}

export default function Card({
  className,
  children,
  hover = false,
  glow = false,
  transition,
  ...props
}: CardProps) {
  return (
    <motion.div
      initial={false}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      transition={transition ?? { type: 'spring', stiffness: 380, damping: 28 }}
      className={cn(
        'rounded-2xl border border-white/25 bg-white/10 p-6 shadow-lg backdrop-blur-xl',
        glow && 'shadow-[0_0_40px_-10px_rgba(212,175,55,0.45)]',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
