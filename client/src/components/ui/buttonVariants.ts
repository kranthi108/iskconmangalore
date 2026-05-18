import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peacock-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-peacock-600 text-white shadow-md hover:bg-peacock-700 hover:shadow-lg',
        secondary: 'bg-gold-500 text-maroon shadow-md hover:bg-gold-400 hover:shadow-lg',
        outline:
          'border-2 border-peacock-600 bg-transparent text-peacock-700 hover:bg-peacock-50 hover:border-peacock-700',
        ghost: 'bg-transparent text-peacock-800 hover:bg-peacock-100/80',
        saffron: 'bg-saffron text-white shadow-md hover:brightness-110 hover:shadow-lg',
        maroon: 'bg-maroon text-gold-500 shadow-md hover:bg-maroon-light hover:shadow-lg',
      },
      size: {
        sm: 'min-h-9 px-4 text-sm',
        md: 'min-h-10 px-5 text-sm',
        lg: 'min-h-12 px-7 text-base',
        xl: 'min-h-14 px-9 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)
