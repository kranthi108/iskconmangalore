import { motion } from 'framer-motion'
import type { GalleryImage } from '@/types'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'

export interface GalleryGridProps {
  images: readonly GalleryImage[]
  onImageClick: (image: GalleryImage) => void
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <motion.div
      layout
      className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      {images.map((image) => (
        <motion.article
          key={image.id}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          tabIndex={0}
          role="button"
          onClick={() => onImageClick(image)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onImageClick(image)
            }
          }}
          className="group relative mb-4 break-inside-avoid cursor-pointer lg:mb-6"
        >
          <PlaceholderImage src={image.src} alt={image.alt} aspectRatio="wide" loading="lazy" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-maroon via-maroon/15 to-transparent opacity-20 transition-opacity duration-500 group-hover:opacity-95" />
          <div className="pointer-events-none absolute inset-x-3 bottom-3 rounded-2xl bg-peacock-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-gold-200 backdrop-blur translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:text-[11px]">
            {image.alt}
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}
