import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'
import Container from '@/components/ui/Container'
import { HERO_BANNER } from '@/constants/placeholders'
import { cn } from '@/utils/cn'

export interface HeroBannerProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  height?: 'full' | 'large' | 'medium' | 'small' | 'sm' | 'md' | 'lg' | 'screen'
  overlay?: boolean
  centered?: boolean
  topRight?: ReactNode
  children?: ReactNode
}

const heightClass: Record<NonNullable<HeroBannerProps['height']>, string> = {
  small: 'min-h-[320px]',
  sm: 'min-h-[260px]',
  medium: 'min-h-[clamp(320px,60vh,520px)]',
  md: 'min-h-[360px]',
  large: 'min-h-[clamp(400px,70vh,720px)]',
  lg: 'min-h-[460px]',
  full: 'min-h-[100svh]',
  screen: 'min-h-[70vh]',
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ]
  for (const re of patterns) {
    const m = url.match(re)
    if (m) return m[1]
  }
  return null
}

function isYouTubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be/.test(url)
}

export default function HeroBanner({
  title,
  subtitle,
  backgroundImage = HERO_BANNER,
  height = 'medium',
  overlay = true,
  centered = false,
  topRight,
  children,
}: HeroBannerProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const parallaxPixels = useTransform(scrollYProgress, [0, 1], [0, -48])
  const smoothedPixels = useSpring(parallaxPixels, { stiffness: 120, damping: 22 })

  const ytId = backgroundImage ? (isYouTubeUrl(backgroundImage) ? extractYouTubeId(backgroundImage) : null) : null

  return (
    <section ref={sectionRef} className={cn('relative isolate overflow-hidden', heightClass[height])}>
      <motion.div style={{ y: smoothedPixels }} className="absolute inset-0 will-change-transform">
        {ytId ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`}
              title={`${title} background video`}
              allow="autoplay; encrypted-media"
              className="absolute left-1/2 top-1/2 aspect-video h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.2] border-0"
              tabIndex={-1}
            />
          </div>
        ) : (
          <PlaceholderImage
            src={backgroundImage}
            alt={`${title} hero backdrop`}
            aspectRatio="none"
            className="size-full min-h-full rounded-none ring-0"
            loading="eager"
            showOverlay={false}
          />
        )}
      </motion.div>

      {overlay ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-maroon/60 to-peacock-950/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.18),transparent_45%)]" />
        </>
      ) : null}

      {topRight ? (
        <div className="absolute right-4 top-4 z-[2] sm:right-6 sm:top-6 lg:right-10 lg:top-8">
          {topRight}
        </div>
      ) : null}

      <Container className={cn("relative z-[1] flex min-h-full flex-col justify-center py-14 sm:py-16 lg:py-24", centered && "items-center text-center")}>
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={cn("max-w-3xl space-y-4", centered && "flex flex-col items-center")}
        >
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl font-semibold leading-tight text-cream shadow-sm sm:text-5xl lg:text-[3.65rem]"
          >
            {title}
          </motion.h1>
          {subtitle ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="max-w-2xl text-lg text-white/92 sm:text-xl"
            >
              {subtitle}
            </motion.p>
          ) : null}
          {children ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.45 }}
              className="flex flex-wrap justify-center gap-3 pt-4"
            >
              {children}
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  )
}
