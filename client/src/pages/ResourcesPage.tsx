import { motion } from 'framer-motion'
import { CirclePlay } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import HeroBanner from '@/components/layout/HeroBanner'
import PlaceholderImage from '@/components/placeholders/PlaceholderImage'
import { buttonVariants } from '@/components/ui/buttonVariants'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { BHAJAN_LIST, SPIRITUAL_RESOURCES } from '@/constants/data'
import { HERO_BANNER, SPIRITUAL_LECTURE } from '@/constants/placeholders'
import aboutusbanner from '@/assets/aboutus.png'
import { cn } from '@/utils/cn'

export default function ResourcesPage() {
  return (
    <>
      <Helmet>
        <title>Spiritual Resources · ISKCON Mangalore</title>
        <meta name="description" content="Śāstra companions, ecstatic bhajan companions, Śrīla Prabhupāda lecture palettes — curated lovingly for Mādhuras seekers." />
      </Helmet>
      <HeroBanner title="Spiritual Resources" subtitle="Carry Vṛndāvan’s bookshelf wherever the coastal tides take you." backgroundImage={aboutusbanner} height="medium" />

      <section className="bg-gradient-to-b from-white via-gold-50 to-white py-20">
        <Container size="xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SPIRITUAL_RESOURCES.map((resource) => (
              <motion.article key={resource.title} layout className="group" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Link to={resource.href} className="block h-full">
                  <Card glow className="flex h-full flex-col gap-4 border border-maroon/20 bg-white transition-shadow hover:shadow-xl">
                    <div className="overflow-hidden rounded-2xl">
                      <PlaceholderImage src={resource.coverImage} alt={resource.title} aspectRatio="video" className="max-h-44 transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-xl text-maroon">{resource.title}</h3>
                      <p className="line-clamp-3 text-sm text-peacock-900/80">{resource.description}</p>
                    </div>
                    <span className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-auto')}>
                      Read more
                    </span>
                  </Card>
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-maroon py-20 text-cream">
        <Container size="lg">
          <SectionHeading decorative title="Bhajan nectar playlist" subtitle="Press play softly — Śrī Rādhā listens first." alignment="center" className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/90" />

          <div className="mt-12 divide-y divide-white/15 rounded-3xl border border-white/25 bg-maroon-light/65">
            {BHAJAN_LIST.map((track, idx) => (
              <motion.div key={track.title} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between" initial={{ opacity: 0, x: idx % 2 === 0 ? -12 : 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div>
                  <p className="font-heading text-xl text-cream">{track.title}</p>
                  <p className="text-sm text-white/75">{track.artist}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-200">{track.duration}</span>
                  <button type="button" className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2 font-semibold text-maroon hover:bg-gold-400 disabled:opacity-65" aria-label={`Play demo for ${track.title}`} disabled>
                    <CirclePlay className="h-5 w-5" aria-hidden />
                    Hear sample
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-gold-200/60 bg-cream pb-28 pt-20">
        <Container size="lg">
          <SectionHeading decorative title="Lecture archive preview" subtitle="Bhāgavatam mornings · Vyāsa-Pūjā remembrances · youthful q&a lounges." />

          <div className="mt-14 grid gap-8 md:grid-cols-[1fr_0.92fr]">
            <motion.div layout className="overflow-hidden rounded-3xl shadow-2xl">
              <PlaceholderImage src={SPIRITUAL_LECTURE} alt="Lecture ambience preview" aspectRatio="video" />
            </motion.div>

            <Card className="space-y-4 border border-maroon/20 bg-white shadow-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-maroon">Śyāmadāsa Swami archive</p>
              <h3 className="font-heading text-3xl text-maroon">Śuddha bhakti is never solitary</h3>
              <p className="text-sm text-peacock-900/82">
              Full-length recordings await cataloguing alongside transcripts for study circles preparing for Sunday feasts · placeholder audio scaffolding lets you envisage Śrīla Prabhupāda’s fearless emphasis on hearing.</p>
              <audio controls preload="none" className="w-full rounded-2xl" />
              <p className="mt-4 text-xs text-peacock-800/65">
                Narration tracks wire through Śrīla Prabhupāda Media Trust — placeholders hum silence until playlists publish.
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}
