import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import FloatingParticles from '@/components/krishna/FloatingParticles'
import PlaceholderVideo from '@/components/placeholders/PlaceholderVideo'
import HeroBanner from '@/components/layout/HeroBanner'
import { buttonVariants } from '@/components/ui/buttonVariants'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { DARSHAN_TIMINGS, TEMPLE_INFO } from '@/constants/data'
import { LIVESTREAM_PREVIEW, HERO_BANNER } from '@/constants/placeholders'
import { cn } from '@/utils/cn'

export default function LiveDarshanPage() {
  return (
    <>
      <Helmet>
        <title>Live Darśana · ISKCON Mangalore</title>
        <meta name="description" content="Stream Śyāmasundara’s celestial hall — timings, etiquette, and Śrīla Prabhupāda’s moods." />
      </Helmet>
      <HeroBanner title="Live Darshan" subtitle="Bless your altar with Krishna Balaram's maṅgala moods — streamed with crystal clarity when broadcast crews are chanting." backgroundImage={HERO_BANNER} height="medium" />

      <section className="relative overflow-hidden bg-peacock-900 py-20 text-white">
        <FloatingParticles />
        <Container size="xl" className="relative z-[1] grid gap-14 lg:grid-cols-[1.05fr_minmax(0,0.82fr)]">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <PlaceholderVideo posterSrc={LIVESTREAM_PREVIEW} />
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.youtube.com/@iskconmangalore"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'inline-flex items-center gap-2 no-underline')}
              >
                Watch on YouTube
                <ExternalLink className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </motion.div>

          <div className="space-y-6">
            <Card className="border border-white/30 bg-maroon/30 text-cream">
              <h3 className="font-heading text-2xl">Current Bhoga status</h3>
              <p className="mt-3 text-white/82">
              Darśanas flow according to Śrīla Prabhupāda’s deity worship manual — Śrī Krishna Balaram are gorgeously adorned for late afternoon greetings right now.</p>
              <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 4 }}>
                <span className="mt-6 inline-flex items-center rounded-full bg-gold-400/90 px-4 py-2 text-maroon">
                  Śrī Krishna Balaram's curtains open during scheduled darśanas
                </span>
              </motion.div>
            </Card>

            <Card hover className="border border-peacock-200/60 bg-peacock-800/65 text-white">
              <SectionHeading alignment="left" title="Today's darśāna clock" subtitle="Align your japa, commute, office breaks — Hari welcomes every sincere glance." decorative className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/82" />

              <ul className="mt-10 space-y-4">
                {DARSHAN_TIMINGS.slice(2, 6).map((timing) => (
                  <li key={timing.time} className="flex justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm">
                    <span className="font-semibold text-gold-200">{timing.time}</span>
                    <span className="text-white/80">{timing.name}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="rounded-3xl border border-white/30 bg-maroon-light/65 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.35em] text-gold-200">Need help tuning in?</p>
              <p className="mt-4 text-white/82">
              Call reception at <strong>{TEMPLE_INFO.phone}</strong> — sevaka volunteers happily guide seniors through casting to their television altars.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
