import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Gauge, Landmark, ReceiptText, ShieldCheck } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import CountdownTimer from '@/components/krishna/CountdownTimer'
import SlokaSection from '@/components/krishna/SlokaSection'
import DonationAmountSelector from '@/components/donations/DonationAmountSelector'
import DonationCard from '@/components/donations/DonationCard'
import DonateModal from '@/components/donations/DonateModal'
import type { DonateModalFormValues } from '@/components/donations/DonateModal'
import BlessingsSuccessScreen from '@/components/donations/BlessingsSuccessScreen'
import type { DonorInfo } from '@/components/donations/BlessingsSuccessScreen'
import GalleryCarousel from '@/components/gallery/GalleryCarousel'
import HeroBanner from '@/components/layout/HeroBanner'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { FEATURED_CAMPAIGNS, type FeaturedCampaignCard } from '@/constants/data'
import { SEVA_THUMBNAILS } from '@/constants/placeholders'
import { useCampaigns, useCampaignBySlug } from '@/hooks/useCampaigns'
import { useRazorpay } from '@/hooks/useRazorpay'
import { createOrder, verifyPayment } from '@/services/donationService'
import { ApiHttpError } from '@/services/api'
import type { DonationCampaign } from '@/types'
import { useDonationStore } from '@/store/donationStore'
import { cn } from '@/utils/cn'

type CategoryFilter = 'all' | DonationCampaign['category']

const DEFAULT_SLOKA = {
  text: 'यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः',
  translation:
    'Work done as a sacrifice for Viṣṇu has to be performed; otherwise work causes bondage in this material world. Therefore, O son of Kuntī, perform your prescribed duties for His satisfaction, and in that way you will always remain free from bondage.',
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

type RazorpayHandlerResponseSimple = {
  razorpay_order_id?: string
  razorpay_payment_id?: string
  razorpay_signature?: string
}

export default function DonatePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams<{ slug?: string }>()
  const campaignsQuery = useCampaigns(false)
  const campaignQuery = useCampaignBySlug(slug)
  const razorpay = useRazorpay()
  const selectedAmount = useDonationStore((state) => state.selectedAmount)
  const customAmount = useDonationStore((state) => state.customAmount)
  const setAmount = useDonationStore((state) => state.setAmount)
  const setCustomAmount = useDonationStore((state) => state.setCustomAmount)
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [donateAmount, setDonateAmount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [blessings, setBlessings] = useState<{
    receiptNumber: string
    amount: number
    donorInfo: DonorInfo
  } | null>(null)

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          const navbarHeight = document.querySelector('header')?.offsetHeight ?? 0
          const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 16
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [location.hash])

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

  const campaign = campaignQuery.data
  const featured = FEATURED_CAMPAIGNS.find((card) => card.slug === slug)
  const campaignTitle = useMemo(
    () => campaign?.title ?? featured?.title ?? (slug ?? '').replace(/-/g, ' '),
    [campaign?.title, slug, featured?.title],
  )

  const handleOpenDonateModal = useCallback((amount: number) => {
    setDonateAmount(amount)
    setModalOpen(true)
  }, [])

  const campaignId = campaign?._id
  const campaignMeta = useMemo(() => {
    if (campaign) {
      return {
        title: campaign.title,
        bannerImage: campaign.bannerImage,
        themeColor: campaign.themeConfig?.primaryColor ?? '#6D071A',
      }
    }
    if (featuredMatch) {
      return {
        title: featuredMatch.title,
        bannerImage: featuredMatch.bannerImage,
        themeColor: '#6D071A',
      }
    }
    return null
  }, [campaign, featuredMatch])

  const handleModalSubmit = useCallback(
    async (values: DonateModalFormValues) => {
      if (!campaignId || !campaignMeta || donateAmount < 1) return

      setIsSubmitting(true)
      try {
        await razorpay.reload()

        const amount = Math.round(donateAmount)
        const donorName = values.fullName.trim()
        const panNormalized = values.pan?.trim() ? values.pan.trim().toUpperCase() : undefined
        const donorAddress = {
          house: values.house?.trim() || undefined,
          street: values.street?.trim() || undefined,
          city: values.city?.trim() || undefined,
          state: values.state?.trim() || undefined,
          pincode: values.pincode?.trim() || undefined,
        }

        const donorEmail = (values.email ?? '').trim()

        const order = await createOrder({
          campaignId,
          amount,
          donorEmail,
          donorName,
          donorPhone: values.phone.trim(),
          donorPAN: panNormalized,
          donorAddress,
        })

        await new Promise<void>((resolvePromise, rejectPromise) => {
          void razorpay
            .openPayment(order, {
              donorName,
              donorEmail,
              donorPhone: values.phone.trim(),
              description: `${campaignMeta.title} · ISKCON Mangalore`,
              imageUrl: campaignMeta.bannerImage,
              themeColor: campaignMeta.themeColor,
              onSuccess(response: RazorpayHandlerResponseSimple) {
                void (async () => {
                  try {
                    if (
                      typeof response.razorpay_order_id !== 'string' ||
                      typeof response.razorpay_payment_id !== 'string' ||
                      typeof response.razorpay_signature !== 'string'
                    ) {
                      rejectPromise(new Error('invalid razorpay response'))
                      return
                    }

                    const donation = await verifyPayment({
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                    })

                    setModalOpen(false)
                    setBlessings({
                      receiptNumber: donation.receiptNumber,
                      amount,
                      donorInfo: {
                        name: donorName,
                        email: donorEmail || undefined,
                        phone: values.phone.trim(),
                        pan: panNormalized,
                        address: donorAddress,
                      },
                    })
                    resolvePromise()
                  } catch (error: unknown) {
                    console.error('[DonateModal] verify failed', error)
                    rejectPromise(error instanceof Error ? error : new Error('verify failed'))
                  }
                })()
              },
              onFailure(reason: unknown) {
                rejectPromise(reason instanceof Error ? reason : new Error('payment dismissed'))
              },
            })
            .catch((error: unknown) => {
              rejectPromise(error instanceof Error ? error : new Error('checkout bootstrap failed'))
            })
        })
      } catch (error) {
        const message =
          error instanceof ApiHttpError
            ? error.message
            : error instanceof Error
              ? error.message
              : 'Something went wrong. Please try again.'
        console.error('[DonateModal] error', message, error)
        alert(message)
      } finally {
        setIsSubmitting(false)
      }
    },
    [campaignId, campaignMeta, donateAmount, razorpay],
  )

  if (!slug) {
    const heroImage = "https://guptvrindavandham.org/media/landingpage/General_Temple_Donation_Banner_Desktop.webp"
    const categories: CategoryFilter[] = ['all', 'festival', 'projects', 'membership', 'annadana']

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
            <SectionHeading alignment="left" title="Spiritual importance" subtitle="How mercy moves from your heart to Śrī Krishna Balaram's altar floor." decorative />
            <p className="mt-8 text-peacock-900/85">{story.spiritualImportance}</p>
          </div>
          {countdownTarget ? (
            <CountdownTimer targetDate={countdownTarget} title="Approaching sankīrtaṇa zenith" compact />
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

      <section id="choose-offering" className="bg-gradient-to-b from-white via-peacock-50 to-white py-20">
        <Container size="md">
          <DonationAmountSelector
            amounts={[...story.suggestedAmounts]}
            selectedAmount={selectedAmount}
            onSelect={setAmount}
            customAmount={customAmount}
            onCustomAmountChange={setCustomAmount}
            onDonate={handleOpenDonateModal}
          />
        </Container>
      </section>

      <DonateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        amount={donateAmount}
        sevaName={campaignTitle}
        onSubmit={handleModalSubmit}
        isSubmitting={isSubmitting}
      />

      {blessings && (
        <BlessingsSuccessScreen
          amount={blessings.amount}
          receiptNumber={blessings.receiptNumber}
          campaignTitle={campaignTitle}
          donorInfo={blessings.donorInfo}
          onClose={() => setBlessings(null)}
        />
      )}

      <GalleryCarousel
        images={'galleryImages' in story ? story.galleryImages : []}
        title={story.title}
        slug={slug ?? 'campaign'}
      />

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
