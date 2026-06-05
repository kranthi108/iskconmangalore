import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, ChevronRight, Clock } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import HeroBanner from '@/components/layout/HeroBanner'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { EKADASI_LIST, getUpcomingEkadasi } from '@/constants/ekadasi'
import ekadasiDefaultBanner from '@/assets/ekadasi/ekadasi.png'
import { cn } from '@/utils/cn'

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function daysUntil(iso: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(iso + 'T00:00:00')
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000)
}

export default function EkadasiPage() {
  const upcoming = useMemo(() => getUpcomingEkadasi(), [])
  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!upcoming || !scrollRef.current) return
    const container = scrollRef.current
    const el = container.querySelector<HTMLElement>(`[data-slug="${upcoming.slug}"]`)
    if (el) container.scrollTop = el.offsetTop - container.offsetTop
  }, [upcoming])

  return (
    <>
      <Helmet>
        <title>Ekadasi Calendar 2026 · ISKCON Mangalore</title>
        <meta name="description" content="ISKCON Ekadasi calendar 2026 — complete list of all 26 Ekadasi fasting dates, parana timings, and spiritual significance." />
      </Helmet>

      <HeroBanner
        title="Ekādaśī"
        subtitle="The sacred eleventh day of each lunar fortnight — dedicated to fasting, prayer, and the worship of Lord Vishnu"
        backgroundImage={upcoming?.banner ?? ekadasiDefaultBanner}
        height="medium"
      />

      <section className="bg-gradient-to-b from-cream to-white py-16 md:py-20">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            {/* Main: Upcoming Ekadasi */}
            <div>
              <SectionHeading decorative title="Upcoming Ekadasi" />

              {upcoming ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 overflow-hidden rounded-2xl border border-gold-300/50 bg-gradient-to-br from-gold-50 via-cream to-white shadow-lg"
                >
                  <div className="bg-gradient-to-r from-maroon to-peacock-900 px-6 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-200">{upcoming.paksha} Paksha</p>
                    <h2 className="mt-1 font-heading text-2xl font-bold text-cream md:text-3xl">{upcoming.name}</h2>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-peacock-700">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" /> {formatDate(upcoming.date)}
                      </span>

                    </div>

                    {daysUntil(upcoming.date) >= 0 && (
                      <div className="mt-4 inline-block rounded-full bg-peacock-100 px-4 py-1.5 text-sm font-semibold text-peacock-800">
                        {daysUntil(upcoming.date) === 0
                          ? 'Today!'
                          : daysUntil(upcoming.date) === 1
                            ? 'Tomorrow'
                            : `${daysUntil(upcoming.date)} days away`}
                      </div>
                    )}

                    <p className="mt-5 text-base leading-relaxed text-peacock-900/85">{upcoming.description}</p>

                    <Link
                      to={`/resources/ekadasi/${upcoming.slug}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-maroon px-5 py-2.5 text-sm font-semibold text-cream shadow-md transition-colors hover:bg-maroon-light"
                    >
                      Learn More <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <p className="mt-8 text-peacock-600">All Ekadasis for this year have passed. The calendar will be updated soon.</p>
              )}

              <div className="mt-12">
                <SectionHeading decorative title="About Ekadasi" />
                <div className="mt-8 space-y-5">
                  <p className="text-base leading-relaxed text-peacock-900/85">
                    Ekadasi is the eleventh day of each lunar fortnight (both Krishna and Shukla Paksha). On this sacred day, devotees fast from grains and beans and dedicate themselves to hearing, chanting, and remembering Lord Vishnu. The Padma Purana states that Ekadasi is the mother of devotion and the most auspicious day for spiritual advancement.
                  </p>
                  <p className="text-base leading-relaxed text-peacock-900/85">
                    ISKCON follows the Vaishnava calendar, which applies stricter tithi purity rules than the Smarta tradition. Consequently, ISKCON Ekadasi dates may occasionally differ by one day from regional panchangs. Devotees should follow the dates prescribed by their temple or spiritual master.
                  </p>
                  <p className="text-base leading-relaxed text-peacock-900/85">
                    Fasting on Ekadasi means abstaining from all grains (rice, wheat, dal, etc.) and beans. Devotees may consume fruits, nuts, milk, root vegetables like potatoes, and specific flours like singhara (water chestnut) or kuttu (buckwheat). The fast is broken the next day during the Parana window.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar: Full year list */}
            <aside>
              <h3 className="font-heading text-lg font-semibold text-maroon">2026 Ekadasi Calendar</h3>
              <p className="mt-1 text-xs text-peacock-600">26 Ekadasis including 2 Adhik Maas</p>

              <div ref={scrollRef} className="mt-4 max-h-[480px] space-y-1.5 overflow-y-auto pr-1">
                {EKADASI_LIST.map((e) => {
                  const isPast = e.date < today
                  const isNext = upcoming?.slug === e.slug

                  return (
                    <Link
                      key={e.slug}
                      data-slug={e.slug}
                      to={`/resources/ekadasi/${e.slug}`}
                      className={cn(
                        'flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors',
                        isNext
                          ? 'border-gold-400 bg-gold-50 font-semibold text-maroon shadow-sm'
                          : isPast
                            ? 'border-transparent bg-peacock-50/40 text-peacock-500'
                            : 'border-peacock-100 bg-white text-peacock-800 hover:border-peacock-200 hover:bg-peacock-50/60',
                      )}
                    >
                      <div className="min-w-0">
                        <p className={cn('truncate', isPast && !isNext && 'line-through decoration-peacock-500 decoration-2')}>
                          {e.name}
                        </p>
                        <p className={cn('mt-0.5 text-xs', isPast && !isNext ? 'text-peacock-500' : 'text-peacock-600')}>
                          {formatDate(e.date)}
                        </p>
                      </div>
                      <ChevronRight className={cn('h-4 w-4 shrink-0', isPast && !isNext ? 'text-peacock-300' : 'text-peacock-500')} />
                    </Link>
                  )
                })}
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
