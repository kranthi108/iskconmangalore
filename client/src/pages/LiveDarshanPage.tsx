import { useMemo } from 'react'
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
import { LIVESTREAM_PREVIEW } from '@/constants/placeholders'
import krishnaBalaramBg from '@/assets/krishna_balaram.JPG'
import { cn } from '@/utils/cn'

const DARSHAN_SCHEDULE = [
  { start: '04:30', end: '07:00', name: 'Mangala Aarti', message: 'Sri Krishna Balaram are receiving the first lamps of the day. Mangala Aarti is in progress.' },
  { start: '07:00', end: '07:15', name: 'Shringar Preparation', message: 'Their Lordships are being adorned in fresh flower garlands and silk vestments for Shringar Darshan.' },
  { start: '07:15', end: '12:00', name: 'Shringar Darshan', message: 'Sri Krishna Balaram are gorgeously adorned. Shringar Darshan is open for your divine glance.' },
  { start: '12:00', end: '12:30', name: 'Raj Bhog Aarti', message: 'The grand midday offering is underway. Raj Bhog Aarti with sanctified preparations for Their Lordships.' },
  { start: '12:30', end: '16:15', name: 'Resting', message: 'Their Lordships are resting after honoring the midday bhoga. Curtains will reopen at 4:15 PM for Utthapana Aarti.' },
  { start: '16:15', end: '18:30', name: 'Utthapana Darshan', message: 'Sri Krishna Balaram have risen from afternoon rest. The altar is open for serene evening darshan.' },
  { start: '18:30', end: '20:15', name: 'Sandhya Aarti', message: 'Hundreds of lamps wave before Their Lordships. Sandhya Aarti fills the hall with harinama.' },
  { start: '20:15', end: '20:30', name: 'Shayana Aarti', message: 'The final seva of the day. Shayana Aarti bids Their Lordships a peaceful night of rest.' },
] as const

function getDarshanStatus(): { name: string; message: string; isResting: boolean } {
  const now = new Date()
  const hh = now.getHours().toString().padStart(2, '0')
  const mm = now.getMinutes().toString().padStart(2, '0')
  const currentTime = `${hh}:${mm}`

  for (const slot of DARSHAN_SCHEDULE) {
    if (currentTime >= slot.start && currentTime < slot.end) {
      return { name: slot.name, message: slot.message, isResting: slot.name === 'Resting' }
    }
  }

  return {
    name: 'Resting',
    message: 'Their Lordships are resting for the night. Curtains will reopen at 4:30 AM for Mangala Aarti. Hare Krishna!',
    isResting: true,
  }
}

export default function LiveDarshanPage() {
  const status = useMemo(() => getDarshanStatus(), [])

  return (
    <>
      <Helmet>
        <title>Live Darshana - ISKCON Mangalore</title>
        <meta name="description" content="Stream the celestial hall of Sri Krishna Balaram - timings, etiquette, and darshan schedule." />
      </Helmet>
      <HeroBanner title="Live Darshan" subtitle="Bless your altar with Krishna Balaram's mangala moods - streamed with crystal clarity when broadcast crews are chanting." backgroundImage={krishnaBalaramBg} height="medium" />

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
              <h3 className="font-heading text-2xl">{status.isResting ? 'Deities are resting' : 'Current Darshana'}</h3>
              <p className="mt-3 text-white/82">{status.message}</p>
              <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 4 }}>
                <span className={cn(
                  'mt-6 inline-flex items-center rounded-full px-4 py-2',
                  status.isResting
                    ? 'bg-maroon-light/80 text-gold-200'
                    : 'bg-gold-400/90 text-maroon',
                )}>
                  {status.isResting ? 'Curtains closed - resting hours' : `${status.name} in progress`}
                </span>
              </motion.div>
            </Card>

            <Card hover className="border border-peacock-200/60 bg-peacock-800/65 text-white">
              <SectionHeading alignment="center" title="Today's darshana clock" subtitle="Align your japa, commute, office breaks - Hari welcomes every sincere glance." decorative className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/82" />

              <ul className="mt-10 space-y-4">
                {DARSHAN_TIMINGS.map((timing) => (
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
                Call reception at <strong>{TEMPLE_INFO.phone}</strong> - sevaka volunteers happily guide seniors through casting to their television altars.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
