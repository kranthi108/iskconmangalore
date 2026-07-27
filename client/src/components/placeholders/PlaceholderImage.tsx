import { useMemo, useState } from 'react'
import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils/cn'

export interface PlaceholderImageProps {
  src: string
  alt: string
  aspectRatio?: 'video' | 'square' | 'portrait' | 'banner' | 'wide' | 'none'
  className?: string
  fallbackText?: string
  showOverlay?: boolean
  loading?: 'lazy' | 'eager'
}

const aspectClass: Record<NonNullable<PlaceholderImageProps['aspectRatio']>, string> = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  banner: 'aspect-[21/9]',
  wide: 'aspect-[2/1]',
  none: 'h-full min-h-[inherit]',
}

export default function PlaceholderImage({
  src,
  alt,
  aspectRatio = 'video',
  className,
  fallbackText,
  showOverlay = false,
  loading = 'lazy',
}: PlaceholderImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const label = fallbackText ?? alt

  const fallbackGradient = useMemo(
    () => (
      <div
        className={cn(
          'flex size-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-peacock-800 via-maroon to-saffron p-6 text-center shadow-inner',
        )}
      >
        <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/25 text-gold-200 ring-2 ring-gold-400/50">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden>
            <path d="M12 3c-1.8 3.2-3.5 6-6 9 1.9 2.2 3.9 3.8 7.5 4.5 3.9-.8 6-2.7 8-5-2.5-2.9-5-5.5-9.5-8.5zM8.5 15c2-3 5-7 10-11-3 4-7 10-12 17 1.5-.5 5-5 11-21-4 9-10 21-21 43 6-17 17-43 56-129-18 52-56 157-134 379z" />
          </svg>
        </span>
        <p className="font-heading text-base font-semibold text-cream sm:text-lg">{label}</p>
        <p className="mt-2 text-xs text-white/75">Blessings of Sri Sri Krishna Balarama</p>
      </div>
    ),
    [label],
  )

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-2xl bg-peacock-100/60 shadow-md ring-1 ring-peacock-900/10',
        aspectClass[aspectRatio],
        className,
      )}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true)
            setIsLoaded(false)
          }}
         className={cn(
           'absolute inset-0 size-full rounded-2xl object-contain md:object-cover transition-opacity duration-500',
           isLoaded ? 'opacity-100' : 'opacity-0',
         )}
        />
      ) : null}

      {!isLoaded && !hasError ? (
        <Skeleton variant="image" className="absolute inset-0 size-full rounded-2xl border-0" />
      ) : null}

      {hasError ? <div className="absolute inset-0">{fallbackGradient}</div> : null}

      {showOverlay && !hasError && isLoaded ? (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-peacock-950/55 via-peacock-900/15 to-transparent"
          aria-hidden
        />
      ) : null}
    </div>
  )
}
