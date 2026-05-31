import { motion } from 'framer-motion'
import { ArrowUpRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'
import Badge from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/buttonVariants'
import Card from '@/components/ui/Card'
import type { FeaturedCampaignCard } from '@/constants/data'
import type { DonationCampaign } from '@/types'
import { formatCurrency } from '@/utils/formatCurrency'
import { cn } from '@/utils/cn'

export type DonationCardSource = FeaturedCampaignCard | Pick<
  DonationCampaign,
  | 'slug'
  | 'title'
  | 'subtitle'
  | 'description'
  | 'category'
  | 'suggestedAmounts'
  | 'bannerImage'
  | 'donorCount'
>

const categoryVariant: Record<DonationCampaign['category'], 'peacock' | 'gold' | 'saffron' | 'maroon'> = {
  festival: 'saffron',
  projects: 'peacock',
  membership: 'gold',
  annadana: 'maroon',
}

export interface DonationCardProps {
  campaign: DonationCardSource
  className?: string
}

export default function DonationCard({ campaign, className }: DonationCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn('h-full', className)}
    >
      <Card hover glow className="flex h-full flex-col overflow-hidden p-0 ring-1 ring-gold-400/20">
        <div className="relative">
          <PlaceholderImage
            src={campaign.bannerImage}
            alt={campaign.title}
            aspectRatio="video"
            className="rounded-b-none rounded-t-2xl ring-0"
            showOverlay
          />
          <div className="absolute left-4 top-4">
            <Badge variant={categoryVariant[campaign.category]} className="backdrop-blur-md">
              {campaign.category}
            </Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 bg-gradient-to-b from-white/10 to-white/5 p-6">
          <div>
            <h3 className="font-heading text-xl font-semibold text-maroon">{campaign.title}</h3>
            <p className="mt-2 text-sm text-peacock-900/80">{campaign.subtitle}</p>
          </div>
          <p className="line-clamp-3 text-sm leading-relaxed text-peacock-950/80">{campaign.description}</p>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-white/10 px-3 py-1.5 text-sm font-semibold text-maroon backdrop-blur-sm">
            <Heart className="h-4 w-4 text-maroon" aria-hidden />
            {campaign.donorCount.toLocaleString('en-IN')} Devotees
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-2">
            {campaign.suggestedAmounts.slice(0, 3).map((amt) => (
              <span
                key={amt}
                className="rounded-full border border-gold-400/40 bg-maroon/15 px-3 py-1 text-xs font-semibold text-maroon"
              >
                {formatCurrency(amt)}
              </span>
            ))}
          </div>
          <Link
            to={`/donate/${campaign.slug}#choose-offering`}
            className={cn(
              buttonVariants({ variant: 'maroon', size: 'lg', className: 'w-full justify-between' }),
              'no-underline',
            )}
          >
            <span className="inline-flex items-center gap-2">
              <Heart className="h-5 w-5 fill-current" aria-hidden />
              Donate Now
            </span>
            <ArrowUpRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </Card>
    </motion.article>
  )
}
