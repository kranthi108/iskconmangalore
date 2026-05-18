import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import CountdownTimer from '@/components/krishna/CountdownTimer'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'
import Badge from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/buttonVariants'
import Card from '@/components/ui/Card'
import type { FeaturedFestivalCard } from '@/constants/data'
import type { Festival } from '@/types'
import { cn } from '@/utils/cn'

export type FestivalHighlight = FeaturedFestivalCard | Festival

export interface FestivalCardProps {
  festival: FestivalHighlight
  className?: string
}

export default function FestivalCard({ festival, className }: FestivalCardProps) {
  const start = new Date(festival.date)
  const upcoming = start.getTime() > Date.now()
  const dateLabel = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    start,
  )

  const excerpt =
    festival.description.length > 160 ? `${festival.description.slice(0, 157).trim()}…` : festival.description

  const streamUrl =
    'livestreamUrl' in festival && typeof festival.livestreamUrl === 'string' ? festival.livestreamUrl : undefined

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      <Card hover className="flex flex-col overflow-hidden p-0 ring-1 ring-gold-500/25">
        <div className="relative">
          <PlaceholderImage
            src={festival.bannerImage}
            alt={festival.title}
            aspectRatio="wide"
            className="rounded-b-none rounded-t-2xl"
            loading="lazy"
            showOverlay
          />
          <div className="absolute left-4 top-4">
            <Badge variant="gold" className="flex items-center gap-2 backdrop-blur">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {dateLabel}
            </Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <h3 className="font-heading text-2xl font-semibold text-maroon">{festival.title}</h3>
            <p className="mt-2 text-sm font-medium text-peacock-800">{festival.subtitle}</p>
          </div>
          <p className="line-clamp-3 text-sm leading-relaxed text-peacock-950/85">{excerpt}</p>
          {upcoming ? (
            <div>
              <CountdownTimer targetDate={festival.date} title="Counting down" variant="light" />
            </div>
          ) : null}
          <div className="mt-auto flex flex-wrap gap-3">
            <Link
              to={`/festivals/${festival.slug}`}
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'md' }),
                'inline-flex flex-1 items-center justify-between gap-2 no-underline sm:flex-none',
              )}
            >
              Learn more
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            {streamUrl ? (
              <a
                href={streamUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: 'outline', size: 'md' }), 'inline-flex')}
              >
                Livestream
              </a>
            ) : null}
          </div>
        </div>
      </Card>
    </motion.article>
  )
}
