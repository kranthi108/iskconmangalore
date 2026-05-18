import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Gauge, Landmark, ReceiptText, ShieldCheck } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CountdownTimer from '@/components/krishna/CountdownTimer'
import SlokaSection from '@/components/krishna/SlokaSection'
import DonationAmountSelector from '@/components/donations/DonationAmountSelector'
import DonationCard from '@/components/donations/DonationCard'
import DonationForm from '@/components/donations/DonationForm'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'
import HeroBanner from '@/components/layout/HeroBanner'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { FEATURED_CAMPAIGNS, type FeaturedCampaignCard } from '@/constants/data'
import { SEVA_THUMBNAILS } from '@/constants/placeholders'
import { useCampaigns, useCampaignBySlug } from '@/hooks/useCampaigns'
import type { DonationCampaign } from '@/types'
import { useDonationStore } from '@/store/donationStore'
import { cn } from '@/utils/cn'

type CategoryFilter = 'all' | DonationCampaign['category']

const DEFAULT_SLOKA = {
  text: 'यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः',
  translation:
    'Work done as sacrifice for Viṣṇu frees the performer — lest other work binds the performer to worldly reaction.',
  reference: 'Bhagavad-gītā 3.9',
} as const

const FAQ_ITEMS = [
  {
    question: 'Will my offering reach the altar accounting desk transparently?',
    answer:
      'Yes — devotional accountants reconcile every seva rupee, publish highlight letters, and host open-house reviews after major festivals.',
  },
  {
    question: 'May I dedicate this gift?',
    answer:
      'Speak your sankalpa in the dedication box; our priests include prayerful remembrance during sanctioned offering periods.',
  },
  {
    question: 'Will I receive an official acknowledgement?',
    answer:
      'Successful digital offerings generate instant email receipts alongside the receipt number shown on the blessings screen.',
  },
  {
    question: 'What if the payment sheet closes mid-way?',
    answer:
      'Uncaptured authorizations release automatically per banking rules — simply reopen the donation flow when your heart steadies again.',
  },
  {
    question: 'Can families abroad participate?',
    answer:
      'Email contact@iskconmangalore.org with your country and timezone so our office can guide compliant transfer rails.',
  },
] as const

const TESTIMONIALS = [
  {
    quote: 'After sponsoring annadan during Kartik my children spontaneously began leading evening ārati at home.',
    devotee: 'Śrīmatī Vidya Rao',
    place: 'Kankanady Congregation',
  },
  {
    quote: 'The receipt arrived before Sandhya ārati — transparent, warm, unmistakably Vaiṣṇava.',
    devotee: 'Śyāmadāsa Prabhu',
    place: 'Youth Outreach Cell',
  },
  {
    quote: 'Watching the goshāla calves thrive each month reminds our family why recurring seva matters.',
    devotee: 'Bhaktin Meera Hegde',
    place: 'Coastal Culinary Seva Circle',
  },
] as const

type StorySource = DonationCampaign | (FeaturedCampaignCard & { spiritualImportance: string; sloka: DonationCampaign['sloka']; festivalDate?: string; galleryImages: string[] })

function buildStory(card: FeaturedCampaignCard): StorySource {
  const festivalDate =
    card.slug === 'janmashtami'
      ? '2026-08-25T21:30:00+05:30'
      : card.slug === 'kartik-maas'
      ? '2026-11-15T18:00:00+05:30'
      : undefined

  return {
    ...card,
    spiritualImportance: card.description,
    sloka: DEFAULT_SLOKA,
    festivalDate,
    galleryImages: [card.bannerImage, SEVA_THUMBNAILS.goshala, SEVA_THUMBNAILS.gitaDistribution],
  }
}

export default function DonatePage() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug?: string }>()
  const campaignsQuery = useCampaigns(false)
  const campaignQuery = useCampaignBySlug(slug)
  const selectedAmount = useDonationStore((state) => state.selectedAmount)
  const customAmount = useDonationStore((state) => state.customAmount)
  const setAmount = useDonationStore((state) => state.setAmount)
  const setCustomAmount = useDonationStore((state) => state.setCustomAmount)
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const featuredMatch = FEATURED_CAMPAIGNS.find((campaign) => campaign.slug === slug)
  const story: StorySource | undefined = useMemo(() => {
    if (campaignQuery.data) {
      return campaignQuery.data
    }
    if (featuredMatch) {
      return buildStory(featuredMatch)
    }
    return undefined
  }, [campaignQuery.data, featuredMatch])

  const listingSource = useMemo(() => {
    if (campaignsQuery.data && campaignsQuery.data.length > 0) {
      return campaignsQuery.data.map((campaign) => ({
        slug: campaign.slug,
        title: campaign.title,
        subtitle: campaign.subtitle,
        category: campaign.category,
        description: campaign.description,
        suggestedAmounts: [...campaign.suggestedAmounts],
        bannerImage: campaign.bannerImage,
        donorCount: campaign.donorCount,
      }))
    }
    return [...FEATURED_CAMPAIGNS]
  }, [campaignsQuery.data])

  const filteredList = listingSource.filter((campaign) => (category === 'all' ? true : campaign.category === category))

  const parsedCustom = Number.parseFloat(customAmount.replace(/,/g, ''))
  const resolvedAmount =
    selectedAmount ?? (Number.isFinite(parsedCustom) && parsedCustom >= 108 ? Math.round(parsedCustom) : null)

  if (!slug) {
    const heroImage = FEATURED_CAMPAIGNS[0]?.bannerImage ?? SEVA_THUMBNAILS.annadanam
    const categories: CategoryFilter[] = ['all', 'festival', 'seva', 'special', 'monthly']

    return (
      <>
        <Helmet>
          <title>Seva & Donations · ISKCON Mangalore</title>
          <meta
            name="description"
            content="Honor Bhagavat-priya sevas — festivals, goshāla care, Anna-dāna, scripture outreach — guided by Śrīla Prabhupāda’s treasurer spirit."
          />
        </Helmet>
        <HeroBanner
          title="Seva & Donations"
          subtitle="Honor every limb of Śrīla Prabhupāda’s Mādhva mission · transparent · prayerful · community witnessed."
          backgroundImage={heroImage}
          height="large"
        />
        <section className="bg-gradient-to-b from-cream to-white py-12">
          <Container size="xl">
            <div className="flex flex-wrap gap-3">
              {categories.map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={category === value ? 'maroon' : 'outline'}
                  size="sm"
                  onClick={() => setCategory(value)}
                  className="capitalize"
                >
                  {value === 'all' ? 'All' : value}
                </Button>
              ))}
            </div>
            <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredList.map((campaign) => (
                <DonationCard key={campaign.slug} campaign={campaign} />
              ))}
            </motion.div>
          </Container>
        </section>
      </>
    )
  }

  if (!story) {
    return (
      <Container className="py-24">
        <Helmet>
          <title>Campaign resting · ISKCON Mangalore</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <p className="font-heading text-2xl text-maroon">This sankīrtana seva is resting.</p>
        <Button variant="primary" size="lg" className="mt-6 inline-flex gap-2" onClick={() => navigate('/donate')}>
          <ArrowLeft className="h-5 w-5" aria-hidden /> Back to all campaigns
        </Button>
      </Container>
    )
  }

  const countdownTarget = 'festivalDate' in story ? story.festivalDate : undefined
  const slokaStory = story.sloka ?? DEFAULT_SLOKA

  return (
    <>
      <Helmet>
        <title>{story.title} · Seva offering</title>
        <meta name="description" content={story.description} />
      </Helmet>

      <HeroBanner title={story.title} subtitle={story.subtitle} backgroundImage={story.bannerImage} height="full">
        <div className="mt-10 flex gap-4 text-xs uppercase tracking-[0.35em] text-gold-200 sm:text-sm">
          <span>{story.category}</span>
          <span aria-hidden>|</span>
          <span>{story.donorCount.toLocaleString('en-IN')} families joined</span>
        </div>
      </HeroBanner>

      <section className="bg-white py-16">
        <Container size="lg" className="space-y-6 text-peacock-900/90">
          <SectionHeading alignment="left" title="Campaign overview" subtitle="Why this seva swells Śrī Rādhā’s pleasure right now." />
          <p className="text-lg">{story.description}</p>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-maroon/5 px-4 py-2 text-sm font-semibold text-maroon">
            {story.donorCount.toLocaleString('en-IN')} Devotees have contributed
          </div>
        </Container>
      </section>

      <motion.section className="bg-gradient-to-b from-peacock-50 to-white py-16">
        <Container size="md">
          <SlokaSection text={slokaStory.text} translation={slokaStory.translation} reference={slokaStory.reference} />
        </Container>
      </motion.section>

      <section className="border-y border-gold-200/60 bg-cream py-16">
        <Container size="lg" className="grid gap-8 lg:grid-cols-[1.05fr_minmax(0,0.9fr)] lg:items-center">
          <div>
            <SectionHeading alignment="left" title="Spiritual importance" subtitle="How mercy moves from your heart to Śrī Rādhā’s altar floor." decorative />
            <p className="mt-8 text-peacock-900/85">{story.spiritualImportance}</p>
          </div>
          {countdownTarget ? (
            <CountdownTimer targetDate={countdownTarget} title="Approaching sankīrtaṇa zenith" />
          ) : (
            <div className="rounded-3xl border border-maroon/20 bg-maroon text-cream shadow-xl">
              <div className="space-y-4 p-8">
                <p className="text-xs uppercase tracking-[0.38em] text-gold-200">Seva continuum</p>
                <p className="font-heading text-2xl leading-snug">This sankalpa thrives on steadfast nītya-sevās — Krishna Balaram's pleasure renews sunrise after sunrise.</p>
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="bg-gradient-to-b from-white via-peacock-50 to-white py-20">
        <Container size="xl" className="grid gap-10 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:gap-14">
          <DonationAmountSelector
            amounts={[...story.suggestedAmounts]}
            selectedAmount={selectedAmount}
            onSelect={setAmount}
            customAmount={customAmount}
            onCustomAmountChange={setCustomAmount}
          />
          <DonationForm campaignSlug={slug} selectedAmount={resolvedAmount} />
        </Container>
      </section>

      <section className="bg-maroon py-16 text-cream">
        <Container size="xl">
          <SectionHeading
            alignment="center"
            title="Photo impressions around this seva"
            subtitle="Carved steps, shimmering brass, devotees folding hands while harināma tides rise."
            decorative
            className="text-cream [&_h2]:text-cream [&_p]:text-gold-50/85"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {('galleryImages' in story ? story.galleryImages : []).slice(0, 3).map((photo, idx) => (
              <motion.div
                key={`${slug}-${idx}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <PlaceholderImage src={photo} alt={`${story.title} impression ${idx + 1}`} aspectRatio="video" showOverlay />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-peacock-950 py-20 text-white">
        <Container size="lg">
          <SectionHeading
            alignment="center"
            title="Mercy stories"
            subtitle="Letters remembering how Śrī Rādhā reciprocates sincere hearts."
            decorative
            className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/85"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <motion.blockquote key={item.devotee} className="rounded-3xl border border-white/20 bg-white/5 p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-base italic text-white/90">“{item.quote}”</p>
                <footer className="mt-4 text-sm font-semibold text-gold-200">{item.devotee}</footer>
                <p className="text-xs uppercase tracking-[0.3em] text-white/65">{item.place}</p>
              </motion.blockquote>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16">
        <Container size="md">
          <SectionHeading alignment="center" title="Frequently Asked Questions" />
          <div className="mt-10 divide-y divide-peacock-200 rounded-3xl border border-peacock-200 bg-white shadow-inner">
            {FAQ_ITEMS.map((item, idx) => {
              const open = openFaq === idx
              return (
                <motion.div key={item.question} layout>
                  <button type="button" className="flex w-full items-start justify-between gap-4 px-6 py-4 text-left" onClick={() => setOpenFaq(open ? null : idx)} aria-expanded={open}>
                    <span className="font-heading text-lg text-maroon">{item.question}</span>
                    <span className={cn('transition', open ? 'rotate-180' : '')} aria-hidden>
                      ⌄
                    </span>
                  </button>
                  {open ? <p className="px-6 pb-4 text-peacock-900/82">{item.answer}</p> : null}
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-maroon via-peacock-950 to-maroon py-16 text-white">
        <Container size="xl">
          <div className="grid gap-10 md:grid-cols-4">
            {[
              { icon: Landmark, title: 'Registered seva trust', copy: 'Annual audits reconcile gateways, goshāla inventories, festival ledgers alike.' },
              { icon: ShieldCheck, title: '80G-aligned acknowledgements', copy: 'Where applicable receipts carry statutory references for devotees maintaining records.' },
              { icon: ReceiptText, title: 'Transparent receipts', copy: 'Your blessing screen echoes the seva desk copy — PAN details appear wherever policy demands.' },
              { icon: Gauge, title: 'Impact storytelling', copy: 'After each wave we publish glimpses showing how seva translated into altar offerings.' },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-3xl border border-white/25 bg-white/5 p-5 shadow-lg backdrop-blur">
                <Icon className="h-10 w-10 text-gold-200" aria-hidden />
                <h3 className="mt-4 font-heading text-xl text-cream">{title}</h3>
                <p className="mt-2 text-sm text-white/80">{copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white pb-24 pt-14">
        <Container size="lg" className="text-center">
          <SectionHeading alignment="center" title="Continue exploring sankīrtaṇa arcs" subtitle="Return to lovingly curated seva listings." decorative />
          <div className="mt-12">
            <Link to="/donate" className="text-maroon underline decoration-gold-500 decoration-2 underline-offset-[6px]">
              Discover additional campaigns →
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
