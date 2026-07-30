import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Camera,
  Car,
  ChevronDown,
  Clock as ClockIcon,
  FlameKindling,
  Flower2,
  HeartHandshake,
  MoonStar,
  Sparkles,
  Sunrise,
  Sunset,
  User,
  UtensilsCrossed,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import FloatingParticles from '@/components/krishna/FloatingParticles'
import KrishnaQuoteCard from '@/components/krishna/KrishnaQuoteCard'
import LotusDevider from '@/components/krishna/LotusDevider'
import MantraMarquee from '@/components/krishna/MantraMarquee'
import DonationCard from '@/components/donations/DonationCard'
import FestivalCard from '@/components/festivals/FestivalCard'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'
import PlaceholderVideo from '@/components/placeholders/PlaceholderVideo'
import { buttonVariants } from '@/components/ui/buttonVariants'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { FEATURED_CAMPAIGNS, FEATURED_FESTIVALS, DARSHAN_TIMINGS } from '@/constants/data'
import { useCampaigns } from '@/hooks/useCampaigns'
import { useFestivals } from '@/hooks/useFestivals'
import { GALLERY_IMAGES, LIVESTREAM_PREVIEW } from '@/constants/placeholders'
import krishnaBalaramBg from '@/assets/krishna_balaram.JPG'
import templeExterior from '@/assets/side_view.png'
import quoteBg from '@/assets/bg.webp'
import { cn } from '@/utils/cn'

const timingIconLookup: Record<string, LucideIcon> = {
  Sunrise,
  Flower2,
  UtensilsCrossed,
  FlameKindling,
  Sunset,
  MoonStar,
}

function resolveTimingIcon(iconName: string): LucideIcon {
  return timingIconLookup[iconName] ?? ClockIcon
}

export default function HomePage() {
  const festivalsQuery = useFestivals(false)
  const campaignsQuery = useCampaigns(false)

  const festivalList = useMemo(() => {
    if (festivalsQuery.data && festivalsQuery.data.length > 0) return festivalsQuery.data
    return FEATURED_FESTIVALS.map((f) => ({
      ...f,
      _id: 0 as number,
      galleryImages: [] as string[],
      active: true,
    }))
  }, [festivalsQuery.data])

  const campaignList = useMemo(() => {
    if (campaignsQuery.data && campaignsQuery.data.length > 0) {
      return campaignsQuery.data.map((c) => ({
        slug: c.slug,
        title: c.title,
        subtitle: c.subtitle,
        category: c.category,
        description: c.description,
        suggestedAmounts: [...c.suggestedAmounts],
        bannerImage: c.bannerImage,
        donorCount: c.donorCount,
      }))
    }
    return [...FEATURED_CAMPAIGNS]
  }, [campaignsQuery.data])

  const now = Date.now()
  const upcomingFestivals = useMemo(() =>
    festivalList
      .filter((f) => new Date(f.date).getTime() > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  [festivalList, now])

  const previewGallery = GALLERY_IMAGES.slice(0, 6)

  return (
    <>
      <Helmet>
        <title>ISKCON Mangalore | Official Sri Krishna Balaram Mandir | Temple, Darshan & Donations</title>
        <meta
          name="description"
          content="Experience Śrīla Prabhupāda’s Mādhava oasis in Mangalore — saṅkīrtana, festivals, prasādam, and lovingly guided devotional life."
        />
      </Helmet>

      <section id="hero" className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-b from-peacock-900 via-peacock-800 to-peacock-700 text-cream">
        <div className="absolute inset-0">
          <img
            src={krishnaBalaramBg}
            alt="Sri Sri Krishna Balaram — ISKCON Mangalore"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-peacock-950/80 via-peacock-900/60 to-peacock-800/50" />
        </div>
        <FloatingParticles />
        <Container className="relative z-[2] flex flex-1 flex-col justify-center py-24 sm:py-28" size="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <motion.p
              className="mb-4 font-sanskrit text-3xl text-gold-200 sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              
            </motion.p>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-cream sm:text-5xl lg:text-6xl">
              ISKCON Mangalore<br/>
              <span className="text-gold-200">Official Sri Krishna Balaram Mandir</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/85 sm:text-xl">Experience the Divine</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/festivals"
                className={cn(buttonVariants({ variant: 'outline', size: 'xl' }), 'border-white text-white hover:bg-white/15', 'no-underline')}
              >
                <Sparkles className="h-5 w-5" aria-hidden />
                Explore Festivals
              </Link>
              <Link
                to="/donate"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'xl' }),
                  'border-white text-white hover:bg-white/15',
                  'no-underline',
                )}
              >
                <HeartHandshake className="h-5 w-5 text-gold-200" aria-hidden />
                Donate Now
              </Link>
              <Link
                              to="/harinam"
                              className={cn(
                                buttonVariants({ variant: 'secondary', size: 'xl' }),
                                'min-w-[200px]',
                                    'no-underline'
                              )}
                            >

                              Participate in Japa Yajña
                            </Link>
            </div>
          </motion.div>
        </Container>
        <motion.button
          type="button"
          className="relative z-[2] cursor-pointer bg-transparent pb-12"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
          aria-label="Scroll to next section"
          onClick={() => {
            const el = document.getElementById('after-hero')
            if (el) {
              const navbarHeight = document.querySelector('header')?.offsetHeight ?? 0
              const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight
              window.scrollTo({ top, behavior: 'smooth' })
            }
          }}
        >
          <div className="flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.55em] text-gold-200/90">
            <span>Scroll</span>
            <ChevronDown className="h-6 w-6" />
          </div>
        </motion.button>
      </section>

      <div id="after-hero">
        <MantraMarquee speed="fast" />
      </div>

      <section className="bg-gradient-to-b from-peacock-950 via-maroon to-peacock-950 py-20 md:py-28">
        <Container size="xl">
          <SectionHeading
            title="Royal hours of Krishna Balaram darśana"
            subtitle="Each rhythm of the maṅgala to śayana skyline is sculpted to carry you deeper into Hari’s merciful remembrance."
            alignment="center"
            decorative
            className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/85"
          />
          <motion.div className="-mx-2 flex gap-4 overflow-x-auto pb-6 pt-2 md:-mx-0 md:flex-wrap md:justify-center md:gap-6">
            {DARSHAN_TIMINGS.map((timing, index) => {
              const TimingIcon = resolveTimingIcon(timing.icon)
              return (
                <motion.div
                  key={timing.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="min-w-[240px] max-w-[320px]"
                >
                  <Card hover className="h-full bg-white/14 text-cream ring-1 ring-gold-400/35">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-200/90">{timing.time}</p>
                        <h3 className="mt-2 font-heading text-2xl text-cream">{timing.name}</h3>
                      </div>
                      <span className="inline-flex rounded-full bg-gold-400/25 p-2 text-gold-100 shadow-inner shadow-black/35">
                        <TimingIcon className="h-5 w-5" aria-hidden />
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-white/80">{timing.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </section>

      <LotusDevider />

      <section className="bg-gradient-to-b from-gold-100/40 via-white to-peacock-50/60 py-20 md:py-28">
        <Container size="xl">
          <SectionHeading title="Upcoming Festivals" subtitle="The calendar glows — each eve resounds with Śrīla Prabhupāda’s fearless harināma." decorative />
          <div className="grid gap-6 md:grid-cols-3">
            {upcomingFestivals.map((festival) => (
              <FestivalCard key={festival.slug} festival={festival} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/festivals" className={cn(buttonVariants({ variant: 'maroon', size: 'lg' }), 'no-underline')}>
              View All Festivals
            </Link>
          </div>
        </Container>
      </section>

      <LotusDevider />

      <section className="bg-gradient-to-br from-peacock-900 via-maroon to-peacock-800 py-16 text-cream">
        <Container size="lg">
          <KrishnaQuoteCard
            quote="Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear."
            source="Bhagavad Gītā 18.66"
            backgroundImage={quoteBg}
          />
        </Container>
      </section>

      <LotusDevider />

      <section className="bg-gradient-to-br from-peacock-50 via-white to-gold-100/55 py-20 md:py-28">
        <Container size="xl">
          <SectionHeading
            title="Contribute to Krishna’s seva"
            subtitle="Flowers become garlands · Rice becomes honoring mahā-prasādam · Gitas glide into thirsty hands."
            decorative
          />
          <div className="grid gap-6 md:grid-cols-3">
            {campaignList.map((campaign) => (
              <DonationCard key={campaign.slug} campaign={campaign} />
            ))}
          </div>
        </Container>
      </section>

      <LotusDevider />

      <section className="relative overflow-hidden bg-peacock-900 py-20 text-cream">
        <FloatingParticles />
        <Container size="xl" className="relative z-[1] grid gap-10 lg:grid-cols-[1.05fr_minmax(0,0.9fr)] lg:items-center">
          <PlaceholderVideo posterSrc={LIVESTREAM_PREVIEW} />
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-200">Live Bhoga darśana</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">Join Krishna Balaram's evening ārati from anywhere</h2>
            <p className="mt-5 text-white/82">
              Sandhya ārati at <span className="font-semibold text-gold-200">6:45 PM</span> IST greets Śrī Śrī Krishna Balaram with hundreds of waving lamps while Harināma pours into the Sabha hall — carry that stream into your altar at home.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/live-darshan" className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'no-underline')}>
                Watch Live
              </Link>
              <a href="https://www.youtube.com/@ISKCONMangaloreBhagavatamClass" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-white/60 text-white hover:bg-white/10', 'no-underline')}>
                YouTube Sabha
              </a>
            </div>
          </div>
        </Container>
      </section>

      <LotusDevider />

      <section className="bg-white py-20 md:py-28">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1"
            >
              <SectionHeading alignment="left" title="ISKCON Mangalore — Shri Krishna Balaram Mandir" subtitle="A sacred place of worship, spiritual learning, and selfless service dedicated to Sri Sri Krishna Balaram under the guidance of His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada." decorative />
              <p className="mt-8 text-lg text-peacock-900/82">
              From japa enclosures to childrens’ Śrīmad Bhāgavatam picnics — this mandir lovingly guides coastal seekers into Kṛṣṇa’s protective embrace while honoring daṇḍavat brāhmaṇa culture rooted in Śrīdhāma Māyāpur.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'no-underline')}>
                  Visit Us
                </Link>
                <Link to="/about" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'no-underline')}>
                  Our Story
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2"
            >
              <PlaceholderImage src={templeExterior} alt="ISKCON Mangalore temple exterior overview" aspectRatio="video" />
            </motion.div>
          </div>
        </Container>
      </section>

      <LotusDevider />

      <section className="bg-gradient-to-b from-cream via-peacock-50/60 to-cream pb-24 pt-14">
        <Container size="lg">
          <SectionHeading alignment="center" title="Captured glories" subtitle="A thousand lamps, joyous processions, and faces shining with Hari’s names." decorative />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewGallery.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <PlaceholderImage src={photo.src} alt={photo.alt} aspectRatio={idx % 2 === 0 ? 'square' : 'video'} />
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              to="/gallery"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'inline-flex items-center gap-2', 'no-underline')}
            >
              <Camera className="h-5 w-5" aria-hidden />
              View Full Gallery
            </Link>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-maroon via-peacock-900 to-saffron py-24 text-white">
        <motion.div aria-hidden className="pointer-events-none absolute inset-y-[-30%] right-[-26%] w-[55vw] rounded-full bg-gold-400/20 blur-3xl" />
        <Container size="lg" className="relative flex flex-col items-center gap-8 text-center">
          <motion.h2
            className="max-w-3xl font-heading text-4xl font-semibold md:text-[2.85rem]"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Begin Your Spiritual Journey
          </motion.h2>
          <motion.p className="max-w-3xl text-base text-white/85 md:text-lg" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Join book distribution brigades · Learn instruments · Feast on Sunday Prasadam · Mentor youth programs along the seaboard.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className={cn(buttonVariants({ variant: 'secondary', size: 'xl' }), 'no-underline')}>
              Volunteer Seva Desk
            </Link>
            <Link
              to="/donate"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'xl', className: 'bg-white/15 ring-2 ring-white/40 hover:bg-white/25' }),
                'text-white no-underline',
              )}
            >
              Offer Today's Bhoga
            </Link>
          </div>
        </Container>
      </section>

      {/* Visitor Information & FAQ Section */}
      <section className="bg-cream py-20">
        <Container size="lg">
          <SectionHeading
            title="Visitor Information"
            subtitle="Plan your visit to ISKCON Mangalore"
            alignment="center"
            decorative
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-maroon/10">
                <ClockIcon className="h-6 w-6 text-maroon" />
              </div>
              <h3 className="font-heading text-xl font-bold text-peacock-900">Darshan Timings</h3>
              <p className="mt-3 text-sm text-peacock-900/75">
                Morning: 4:30 AM - 1:00 PM<br/>
                Evening: 4:30 PM - 8:30 PM<br/>
                <span className="font-semibold">Open daily</span>
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-maroon/10">
                <Car className="h-6 w-6 text-maroon" />
              </div>
              <h3 className="font-heading text-xl font-bold text-peacock-900">Parking</h3>
              <p className="mt-3 text-sm text-peacock-900/75">
                Ample parking space available for devotees and visitors. Well-maintained and easily accessible parking area.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-maroon/10">
                <User className="h-6 w-6 text-maroon" />
              </div>
              <h3 className="font-heading text-xl font-bold text-peacock-900">Dress Code</h3>
              <p className="mt-3 text-sm text-peacock-900/75">
                Traditional or modest attire recommended. Devotees are encouraged to wear dhoti, kurta, or saree to maintain the sanctity of the temple.
              </p>
            </motion.div>
          </div>

          <div className="mt-16">
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Learn more about ISKCON Mangalore"
              alignment="center"
            />
            <div className="mt-8 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl bg-white p-6 shadow-md"
              >
                <h3 className="font-heading text-lg font-semibold text-peacock-900">What are the darshan timings at ISKCON Mangalore?</h3>
                <p className="mt-2 text-sm text-peacock-900/75">ISKCON Mangalore temple is open from 4:30 AM to 8:30 PM daily with breaks in between. Morning darshan starts at 4:30 AM and evening darshan continues until 8:30 PM. Special aratis are performed throughout the day.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl bg-white p-6 shadow-md"
              >
                <h3 className="font-heading text-lg font-semibold text-peacock-900">Where is ISKCON Mangalore located?</h3>
                <p className="mt-2 text-sm text-peacock-900/75">ISKCON Mangalore is located at PVS Kalakunj, Mangalore, Karnataka. The temple is situated in a serene environment perfect for spiritual activities.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-xl bg-white p-6 shadow-md"
              >
                <h3 className="font-heading text-lg font-semibold text-peacock-900">How can I donate to ISKCON Mangalore?</h3>
                <p className="mt-2 text-sm text-peacock-900/75">You can donate to ISKCON Mangalore through our official website iskconmangalore.org/donate. We accept donations for various sevas including Annadana Seva, Goshala, Temple Construction, and Festival celebrations.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="rounded-xl bg-white p-6 shadow-md"
              >
                <h3 className="font-heading text-lg font-semibold text-peacock-900">What festivals are celebrated at ISKCON Mangalore?</h3>
                <p className="mt-2 text-sm text-peacock-900/75">ISKCON Mangalore celebrates all major Vaishnava festivals including Janmashtami, Rath Yatra, Narasimha Chaturdashi, Gaura Purnima, Ekadashi, and many more. Each festival is celebrated with great devotion and grandeur.</p>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
