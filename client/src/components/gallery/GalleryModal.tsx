import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'
import type { GalleryImage } from '@/types'

export interface GalleryModalProps {
  image: GalleryImage | null
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
}

export default function GalleryModal({ image, isOpen, onClose, onNext, onPrev }: GalleryModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
      if (event.key === 'ArrowRight' && onNext) {
        event.preventDefault()
        onNext()
      }
      if (event.key === 'ArrowLeft' && onPrev) {
        event.preventDefault()
        onPrev()
      }
    }
    window.addEventListener('keydown', listener)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', listener)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose, onNext, onPrev])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && image ? (
        <motion.div
          className="fixed inset-0 z-[140]"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-peacock-950/85 backdrop-blur-lg"
            aria-label="Close gallery"
            onClick={onClose}
          />
          <div className="relative z-[1] flex size-full items-center justify-center px-6 py-10">
            {onPrev ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  onPrev()
                }}
                className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/30 bg-maroon p-4 text-white shadow-lg transition-colors hover:bg-maroon-light sm:inline-flex z-[2]"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-7 w-7" aria-hidden />
              </button>
            ) : null}
            {onNext ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  onNext()
                }}
                className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/30 bg-maroon p-4 text-white shadow-lg transition-colors hover:bg-maroon-light sm:inline-flex z-[2]"
                aria-label="Next image"
              >
                <ChevronRight className="h-7 w-7" aria-hidden />
              </button>
            ) : null}
            <motion.div
              key={image.id}
              initial={{ scale: 0.92, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="relative w-full max-w-5xl"
            >
              <button
                type="button"
                className="absolute -right-2 -top-12 rounded-full bg-white p-3 text-maroon shadow-lg transition hover:bg-gold-200"
                aria-label="Close"
                onClick={onClose}
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
              <div className="overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
                <PlaceholderImage src={image.src} alt={image.alt} aspectRatio="banner" loading="eager" />
              </div>
              <div className="mt-6 text-center text-sm font-semibold uppercase tracking-[0.32em] text-gold-200">
                <p>{image.category}</p>
                <p className="mt-2 font-heading normal-case tracking-normal text-xl text-white">{image.alt}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
