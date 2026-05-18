import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        peacock: 'bg-peacock-100 text-peacock-800 ring-1 ring-peacock-200/80',
        gold: 'bg-gold-100 text-maroon ring-1 ring-gold-300/80',
        saffron: 'bg-saffron/20 text-maroon ring-1 ring-saffron/40',
        maroon: 'bg-maroon text-gold-200 ring-1 ring-maroon-light/60',
        outline: 'border border-peacock-600 bg-transparent text-peacock-800',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs',
      },
    },
    defaultVariants: {
      variant: 'peacock',
      size: 'md',
    },
  },
)

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children: ReactNode
}

export default function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {children}
    </span>
  )
}
