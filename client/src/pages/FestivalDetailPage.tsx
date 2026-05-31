import { useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FestivalSchedule from '@/components/festivals/FestivalSchedule'
import GalleryCarousel from '@/components/gallery/GalleryCarousel'
import PlaceholderVideo from '@/components/placeholders/PlaceholderVideo'
import HeroBanner from '@/components/layout/HeroBanner'
import { buttonVariants } from '@/components/ui/buttonVariants'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { FEATURED_CAMPAIGNS, FEATURED_FESTIVALS } from '@/constants/data'
import { LIVESTREAM_PREVIEW } from '@/constants/placeholders'
import { useFestivalBySlug } from '@/hooks/useFestivals'
import { cn } from '@/utils/cn'

export default function FestivalDetailPage() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const festivalQuery = useFestivalBySlug(slug)

  const hardcoded = FEATURED_FESTIVALS.find((item) => item.slug === slug)

  const festival = useMemo(() => {
    if (festivalQuery.data) {
      return {
        title: festivalQuery.data.title,
        subtitle: festivalQuery.data.subtitle,
        description: festivalQuery.data.description,
        date: festivalQuery.data.date,
        endDate: festivalQuery.data.endDate,
        schedule: festivalQuery.data.schedule,
        bannerImage: festivalQuery.data.bannerImage,
        galleryImages: festivalQuery.data.galleryImages,
        livestreamUrl: festivalQuery.data.livestreamUrl,
      }
    }
    if (hardcoded) {
      return {
        title: hardcoded.title,
        subtitle: hardcoded.subtitle,
        description: hardcoded.description,
        date: hardcoded.date,
        endDate: hardcoded.endDate,
        schedule: hardcoded.schedule,
        bannerImage: hardcoded.bannerImage,
        galleryImages: [] as string[],
        livestreamUrl: undefined,
      }
    }
    return undefined
  }, [festivalQuery.data, hardcoded])

  const donationSlugOverrides: Partial<Record<string, string>> = {
    'kartik-maas-mahotsava': 'kartik-maas',
  }

  const donationHref = (() => {
    const direct = FEATURED_CAMPAIGNS.find((campaign) => campaign.slug === slug)?.slug
    const mapped = slug ? donationSlugOverrides[slug] : undefined
    const resolved = mapped ?? direct
    return resolved ? `/donate/${resolved}` : '/donate'
  })()

  if (!festival) {
    return (
      <Container size="lg" className="py-24">
        <Helmet>
          <title>Festival not curated yet</title>
        </Helmet>
        <p className="font-heading text-3xl text-maroon">This festival scroll is resting in Śrīla Prabhupāda's bookcase.</p>
        <button type="button" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'mt-6 gap-2')} onClick={() => navigate('/festivals')}>
          <ArrowLeft className="h-5 w-5" aria-hidden /> Return to festivities
        </button>
      </Container>
    )
  }

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
          <SectionHeading decorative title="Schedule of ecstatic moments" subtitle="Keep your mṛdaṅga close · Hydrate between kīrtan blocks · Cherish Śrīla Prabhupāda's moods." />
          <FestivalSchedule schedule={festival.schedule} />
        </Container>
      </section>

      <GalleryCarousel
        images={festival.galleryImages}
        title={festival.title}
        slug={slug ?? 'festival'}
        heading="Captured colors"
        subtitle="Flower showers, childrens' Sanskrit recitals, incense trails."
      />

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
          <PlaceholderVideo posterSrc={festival.livestreamUrl || LIVESTREAM_PREVIEW} className="mt-12" />
          <div className="mt-10 text-center">
            <a href="https://www.youtube.com/@ISKCONMangaloreBhagavatamClass" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'inline-flex no-underline')}>
              Watch ISKCON Mangalore live
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
