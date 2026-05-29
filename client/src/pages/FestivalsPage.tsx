import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import CountdownTimer from '@/components/krishna/CountdownTimer'
import FestivalCard from '@/components/festivals/FestivalCard'
import HeroBanner from '@/components/layout/HeroBanner'
import { buttonVariants } from '@/components/ui/buttonVariants'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { FEATURED_FESTIVALS } from '@/constants/data'
import { useFestivals } from '@/hooks/useFestivals'
import { cn } from '@/utils/cn'

export default function FestivalsPage() {
  const festivalsQuery = useFestivals(false)

  const festivalList = useMemo(() => {
    if (festivalsQuery.data && festivalsQuery.data.length > 0) {
      return festivalsQuery.data.map((f) => ({
        slug: f.slug,
        title: f.title,
        subtitle: f.subtitle,
        description: f.description,
        date: f.date,
        endDate: f.endDate,
        bannerImage: f.bannerImage,
        schedule: f.schedule,
        featured: f.featured,
        order: f.order,
      }))
    }
    return [...FEATURED_FESTIVALS]
  }, [festivalsQuery.data])

  const upcomingFestivals = useMemo(() => {
    const now = Date.now()
    return festivalList
      .filter((f) => new Date(f.date).getTime() > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [festivalList])

  const headline = upcomingFestivals[0] ?? festivalList[0]

  return (
    <>
      <Helmet>
        <title>Sacred Festivals · ISKCON Mangalore</title>
        <meta name="description" content="Krishna Balaram's calendar in Maṅgalore — Janmāṣṭamī bliss, Gauṛa Pūrṇimā tides, Kartik deepotsavas, and fearless harināma arcs." />
      </Helmet>
      <HeroBanner title="Sacred Festivals" subtitle="Each high day is Śrīla Prabhupāda's invitation to flood the shoreline with Hari's nectar." backgroundImage={headline?.bannerImage} height="large" />
      {headline && upcomingFestivals.length > 0 && (
        <section className="bg-gradient-to-b from-white to-peacock-50 py-14">
          <Container size="lg">
            <div className="grid gap-12 lg:grid-cols-[0.92fr_minmax(0,0.82fr)] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-maroon">{headline.title}</p>
                <h2 className="mt-3 font-heading text-3xl text-peacock-950">{headline.subtitle}</h2>
                <p className="mt-4 text-peacock-900/85">{headline.description}</p>
                <Link to={`/festivals/${headline.slug}`} className={cn(buttonVariants({ variant: 'maroon', size: 'md' }), 'mt-6 inline-flex no-underline')}>
                  Open detailed schedule →
                </Link>
              </div>
              <CountdownTimer targetDate={headline.date} title="Mercy-wave countdown" compact />
            </div>
          </Container>
        </section>
      )}
      <section className="bg-cream py-20 md:py-24">
        <Container size="xl">
          <SectionHeading title="The festival canopy" subtitle="Twelve mystical moons distilled into luminous weekends on the Arabian coast." decorative />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {upcomingFestivals.map((festival) => (
              <motion.div key={festival.slug} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <FestivalCard festival={festival} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
