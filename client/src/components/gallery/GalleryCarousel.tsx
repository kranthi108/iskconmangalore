import { useEffect, useMemo, useRef, useState } from 'react'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

interface GalleryCarouselProps {
  images: string[]
  title: string
  slug: string
  heading?: string
  subtitle?: string
}

export default function GalleryCarousel({
  images,
  title,
  slug,
  heading = 'Photo impressions around this seva',
  subtitle = 'Carved steps, shimmering brass, devotees folding hands while harināma tides rise.',
}: GalleryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  const loopImages = useMemo(() => (images.length > 1 ? [...images, ...images] : images), [images])

  useEffect(() => {
    if (images.length <= 1) return
    const container = scrollRef.current
    if (!container) return

    const speed = 0.8
    let raf: number
    const halfScroll = container.scrollWidth / 2

    function step() {
      if (!container || paused) {
        raf = requestAnimationFrame(step)
        return
      }

      container.scrollLeft += speed

      if (container.scrollLeft >= halfScroll) {
        container.scrollLeft -= halfScroll
      }

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [images.length, paused])

  if (images.length === 0) return null

  return (
    <section className="bg-maroon py-16 text-cream">
      <Container size="xl">
        <SectionHeading
          alignment="center"
          title={heading}
          subtitle={subtitle}
          decorative
          className="text-cream [&_h2]:text-cream [&_p]:text-gold-50/85"
        />
      </Container>

      <div
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        className="scrollbar-hide flex gap-5 overflow-x-auto px-6 pb-4 sm:px-10"
      >
        {loopImages.map((photo, idx) => (
          <div
            key={`${slug}-${idx}`}
            className="w-[80vw] flex-none sm:w-[45vw] md:w-[32vw] lg:w-[26vw]"
          >
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
              <PlaceholderImage src={photo} alt={`${title} impression ${(idx % images.length) + 1}`} aspectRatio="video" showOverlay />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
