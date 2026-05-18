import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'
import { cn } from '@/utils/cn'

export interface PlaceholderVideoProps {
  src?: string
  className?: string
  posterSrc?: string
}

export default function PlaceholderVideo({ src, className, posterSrc }: PlaceholderVideoProps) {
  if (src) {
    return (
      <div className={cn('relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-peacock-900/15', className)}>
        <video
          src={src}
          poster={posterSrc}
          className="aspect-video w-full bg-peacock-950 object-cover"
          controls
          playsInline
          preload="metadata"
        />
      </div>
    )
  }

  const poster =
    posterSrc ??
    'https://placehold.co/1280x720/6D071A/D4AF37?text=' +
      encodeURIComponent('ISKCON Mangalore Live Darshan')

  return (
    <div className={cn('relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-maroon/20', className)}>
      <PlaceholderImage src={poster} alt="Live darshan preview" aspectRatio="video" showOverlay />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <motion.span
          animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="inline-flex rounded-full bg-maroon/85 p-4 text-gold-400 shadow-2xl ring-2 ring-gold-500/35 backdrop-blur"
        >
          <Play className="h-10 w-10 fill-current" aria-hidden />
        </motion.span>
        <div className="rounded-full bg-peacock-950/55 px-4 py-2 text-sm font-semibold text-cream ring-1 ring-white/20 backdrop-blur-md">
          Coming Soon · Live Darshan
        </div>
      </div>
    </div>
  )
}
