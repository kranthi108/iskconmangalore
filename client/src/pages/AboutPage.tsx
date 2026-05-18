import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import KrishnaQuoteCard from '@/components/krishna/KrishnaQuoteCard'
import HeroBanner from '@/components/layout/HeroBanner'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { FEATURED_CAMPAIGNS, FEATURED_FESTIVALS } from '@/constants/data'
import { HERO_BANNER, TEMPLE_INTERIOR } from '@/constants/placeholders'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'

function CounterStat({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) {
      return
    }

    let frame = 0
    const duration = 1500
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)

      if (progress < 1) {
        setDisplay(Math.floor(progress * value))
        frame = window.requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <div ref={ref} className="rounded-3xl border border-white/35 bg-maroon-light/85 p-6 text-center shadow-lg">
      <p className="text-4xl font-semibold text-cream">{display.toLocaleString('en-IN')}{suffix}</p>
      <p className="mt-2 text-sm uppercase tracking-[0.35em] text-gold-200">{label}</p>
    </div>
  )
}

export default function AboutPage() {
  const festivalFootprint = FEATURED_FESTIVALS.length + 128
  const sevaFamilies = FEATURED_CAMPAIGNS.reduce((sum, campaign) => sum + campaign.donorCount, 0)

  return (
    <>
      <Helmet>
        <title>About · ISKCON Mangalore</title>
        <meta name="description" content="Learn how Śrīla Prabhupāda’s Mādhva mission perfumes Maṅgalore — sankīrtana fortress, Śāstra fidelity, fearless compassion." />
      </Helmet>
      <HeroBanner title="About ISKCON Mangalore" subtitle="Pearl on the southwestern seaboard consecrated entirely to Śrī Śrī Krishna Balaram's pleasure." backgroundImage={HERO_BANNER} height="large" />

      <section className="bg-white py-20">
        <Container size="md">
          <SectionHeading alignment="center" title="Our mission resonance" subtitle="Bhakti fortified by Śāstra compassionately delivered · every visitor invited to taste prasādī confidence." decorative />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed text-peacock-900/86">
          ISKCON Sri Krishna Balaram Mandir echoes Śrīla Prabhupāda’s fearless directive that anyone — regardless of background — deserves access to Śrīmad Bhāgavatam discourse, ecstatic kīrtan, wholesome prasādam, and the shelter of devotional community nurtured under brāhmaṇa mentorship.</motion.p>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-maroon via-peacock-900 to-maroon py-20 text-white">
        <Container size="xl" className="grid gap-14 lg:grid-cols-[0.94fr_minmax(0,1fr)] lg:items-center">
          <PlaceholderImage src={TEMPLE_INTERIOR} alt="" aspectRatio="video" loading="lazy" />
          <div>
            <h3 className="font-heading text-3xl md:text-[2rem] text-cream">Temple history sculpted from prayer</h3>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-6 text-white/85">
              From tentative weekly programs under humble roofs to towering brass domes shimmering above NH-75, each chapter was handwritten by devotees who traded sleep for fundraisers, sculpted pathways for barefoot parikrama, and never forgot Śrīla Prabhupāda’s suitcase of Bhāgavatam volumes stepping onto Indian shores again.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-4 text-white/82">
              We remember early harināma pioneers walking misty docks, childrens’ Śloka contests hosted on balconies, goshāla calves named after Śrīvāsa Ṭhākura moods — culminating in Śrī Krishna Balaram's triumphant inauguration attended by devotees from five continents chanting as one tidal wave.</motion.p>
          </div>
        </Container>
      </section>

      <section className="border-y border-maroon/15 bg-peacock-950 py-20 text-white">
        <Container size="md">
          <KrishnaQuoteCard
            quote="Always think of Me, become My devotee, worship Me and offer your homage unto Me. Thus you will come to Me without fail. I promise you this because you are My very dear friend."
            source="Bhagavad-gītā 18.65"
          />
        </Container>
      </section>

      <section className="bg-cream py-20">
        <Container size="lg">
          <SectionHeading decorative title="Core values guarding our Bhāgavata orchard" subtitle="No shortcuts · No diluted philosophy · Śrīvāsa Ṭhākura bravery in sankīrtana." />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {['Śuddha guru-paramparā fidelity', 'Fearlessly compassionate preaching', 'Nourishing congregations through pristine prasādam', 'Sustainable goshāla & annadānam culture'].map((value, idx) => (
              <motion.div key={value} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <Card glow className="border border-maroon/15 bg-white/90">
                  <h4 className="font-heading text-2xl text-maroon">{value}</h4>
                  <p className="mt-4 text-peacock-900/82">
                  Each seva circle signs up to amplify Śyāmasundaras glories precisely as Śāstra unfolds — guarding newcomers from watered-down fluff while cultivating mature discussions under seasoned teachers.</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white to-peacock-50 pb-28 pt-20">
        <Container size="md">
          <SectionHeading alignment="center" title="Servant Leadership — placeholder collage" subtitle="Formal portraits unveiling soon honoring regional council, spiritual mentors, treasurer stewards." />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((pillar) => (
              <motion.div key={pillar} whileHover={{ y: -4 }} className="rounded-3xl border border-peacock-200/80 bg-white p-6 text-center shadow-md">
                <div className="mx-auto mb-6 h-48 w-full rounded-[28px] bg-gradient-to-br from-peacock-100 via-maroon/10 to-gold-100 animate-pulse" />
                <h4 className="font-heading text-xl text-maroon">Spiritual Mentor {pillar}</h4>
                <p className="mt-4 text-sm text-peacock-900/76">Portrait photography & mood statements arrive post upcoming Vyāsa-Pūjā compilation.</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-maroon pb-28 pt-20 text-white">
        <motion.div aria-hidden className="pointer-events-none absolute inset-[12%] bg-[radial-gradient(circle,_rgba(255,255,255,0.12),_transparent_55%)]" />
        <Container size="lg" className="relative grid gap-8 md:grid-cols-3">
          <CounterStat label="Annual festival waves hosted" value={festivalFootprint} />
          <CounterStat label="Families fuelling seva ledgers" value={sevaFamilies} suffix=" +" />
          <CounterStat label="Daily prasādī plates envisaged this year" value={84000} suffix=" +" />
        </Container>
      </section>
    </>
  )
}
