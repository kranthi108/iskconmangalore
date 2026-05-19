import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FestivalSchedule from '@/components/festivals/FestivalSchedule'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'
import PlaceholderVideo from '@/components/placeholders/PlaceholderVideo'
import HeroBanner from '@/components/layout/HeroBanner'
import { buttonVariants } from '@/components/ui/buttonVariants'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { FEATURED_CAMPAIGNS, FEATURED_FESTIVALS } from '@/constants/data'
import { LIVESTREAM_PREVIEW, DEITY_DARSHAN, FESTIVAL_GALLERY_PLACEHOLDER } from '@/constants/placeholders'
import { cn } from '@/utils/cn'

export default function FestivalDetailPage() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const festival = FEATURED_FESTIVALS.find((item) => item.slug === slug)

  const donationSlugOverrides: Partial<Record<string, string>> = {
    'kartik-maas-mahotsava': 'kartik-maas',
  }

  const donationHref = (() => {
    const direct = FEATURED_CAMPAIGNS.find((campaign) => campaign.slug === festival?.slug)?.slug
    const mapped = festival ? donationSlugOverrides[festival.slug] : undefined
    const resolved = mapped ?? direct
    return resolved ? `/donate/${resolved}` : '/donate'
  })()

  if (!festival) {
    return (
      <Container size="lg" className="py-24">
        <Helmet>
          <title>Festival not curated yet</title>
        </Helmet>
        <p className="font-heading text-3xl text-maroon">This festival scroll is resting in Śrīla Prabhupāda’s bookcase.</p>
        <button type="button" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'mt-6 gap-2')} onClick={() => navigate('/festivals')}>
          <ArrowLeft className="h-5 w-5" aria-hidden /> Return to festivities
        </button>
      </Container>
    )
  }

  const gallery = [festival.bannerImage, DEITY_DARSHAN, FESTIVAL_GALLERY_PLACEHOLDER, LIVESTREAM_PREVIEW]

  return (
    <>
      <Helmet>
        <title>{festival.title} · ISKCON Mangalore</title>
        <meta name="description" content={festival.description} />
      </Helmet>
      <HeroBanner title={festival.title} subtitle={festival.subtitle} backgroundImage={festival.bannerImage} height="full">
        <div className="mt-12 flex flex-wrap gap-3 text-xs uppercase tracking-[0.38em] text-gold-200">
          <span>{new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(festival.date))}</span>
          {festival.endDate ? <span>→ {new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(festival.endDate))}</span> : null}
        </div>
      </HeroBanner>
      <section className="bg-white py-16">
        <Container size="md">
          <SectionHeading alignment="center" title="Why we gather with lamps and drums" />
          <p className="mt-8 text-center text-lg text-peacock-900/87">{festival.description}</p>
        </Container>
      </section>
      <section className="bg-gradient-to-b from-peacock-50 to-white py-16">
        <Container size="lg">
          <SectionHeading decorative title="Schedule of ecstatic moments" subtitle="Keep your mṛdaṅga close · Hydrate between kīrtan blocks · Cherish Śrīla Prabhupāda’s moods." />
          <FestivalSchedule schedule={festival.schedule} />
        </Container>
      </section>
      <section className="bg-maroon py-16 text-cream">
        <Container size="xl">
          <SectionHeading alignment="center" title="Captured colors" subtitle="Flower showers, childrens’ Sanskrit recitals, incense trails." decorative className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/85" />
          <div className="grid gap-6 md:grid-cols-3">
            {gallery.slice(0, 3).map((image, idx) => (
              <motion.div key={idx} whileInView={{ opacity: [0, 1], y: [12, 0] }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
                <PlaceholderImage src={image} alt={`${festival.title} gallery ${idx + 1}`} aspectRatio="video" />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-y border-gold-200/60 bg-cream py-16">
        <Container size="xl" className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-heading text-3xl text-maroon">Fuel this ecstasy with practical seva</h3>
            <p className="mt-4 max-w-xl text-peacock-900/85">
              Garlands multiply when hearts sponsor them — earmark donations toward this festival arc and Śrī Krishna Balaram's cooks will amplify prasadam oceans.
            </p>
          </div>
          <Link to={donationHref} className={cn(buttonVariants({ variant: 'maroon', size: 'xl' }), 'inline-flex whitespace-nowrap no-underline')}>
            Offer festival sankalpa →
          </Link>
        </Container>
      </section>
      <section className="bg-peacock-900 py-20 text-white">
        <Container size="lg">
          <SectionHeading alignment="center" title="Global darśanas" subtitle="When your city cannot commute, Śrī Krishna Balaram's livestream veil still trembles." decorative className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/82" />
          <PlaceholderVideo posterSrc={LIVESTREAM_PREVIEW} className="mt-12" />
          <div className="mt-10 text-center">
            <a href="https://www.youtube.com/@iskconmangalore" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'inline-flex no-underline')}>
              Watch ISKCON Mangalore live
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
