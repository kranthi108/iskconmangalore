import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, error, leftIcon, id, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? props.name ?? autoId

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="mb-1.5 block font-heading text-sm font-semibold text-maroon">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-peacock-600">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-xl border border-peacock-200/80 bg-white/90 px-4 py-2.5 text-sm text-peacock-950 shadow-sm transition-all',
            'placeholder:text-peacock-400/80',
            'focus:border-peacock-500 focus:outline-none focus:ring-2 focus:ring-peacock-500/35',
            leftIcon && 'pl-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
})

export default Input
