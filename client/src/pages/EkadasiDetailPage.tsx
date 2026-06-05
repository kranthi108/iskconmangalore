import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CalendarDays, Leaf } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import HeroBanner from '@/components/layout/HeroBanner'
import Container from '@/components/ui/Container'
import { EKADASI_LIST, getEkadasiBySlug } from '@/constants/ekadasi'

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } as const }

export default function EkadasiDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const ekadasi = useMemo(() => slug ? getEkadasiBySlug(slug) : undefined, [slug])

  const { prev, next } = useMemo(() => {
    if (!ekadasi) return { prev: undefined, next: undefined }
    const idx = EKADASI_LIST.findIndex((e) => e.slug === ekadasi.slug)
    return {
      prev: idx > 0 ? EKADASI_LIST[idx - 1] : undefined,
      next: idx < EKADASI_LIST.length - 1 ? EKADASI_LIST[idx + 1] : undefined,
    }
  }, [ekadasi])

  if (!ekadasi) return <Navigate to="/resources/ekadasi" replace />

  return (
    <>
      <Helmet>
        <title>{ekadasi.name} · ISKCON Mangalore</title>
        <meta name="description" content={ekadasi.description} />
      </Helmet>

      <HeroBanner
        title={ekadasi.name}
        subtitle={`${ekadasi.paksha} Paksha · ${formatDate(ekadasi.date)}`}
        backgroundImage={ekadasi.banner}
        height="medium"
      />

      <section className="bg-gradient-to-b from-cream to-white py-16 md:py-20">
        <Container size="lg">
          <Link
            to="/resources/ekadasi"
            className="inline-flex items-center gap-2 text-sm font-medium text-peacock-600 transition-colors hover:text-maroon"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Ekadasi Calendar
          </Link>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <motion.div {...fade} className="rounded-2xl border border-peacock-100 bg-white p-6 text-center shadow-md">
              <CalendarDays className="mx-auto h-8 w-8 text-maroon" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-peacock-600">Date</p>
              <p className="mt-1 font-heading text-lg font-semibold text-peacock-900">{formatDate(ekadasi.date)}</p>
            </motion.div>

            <motion.div {...fade} className="rounded-2xl border border-peacock-100 bg-white p-6 text-center shadow-md">
              <Leaf className="mx-auto h-8 w-8 text-maroon" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-peacock-600">Paksha</p>
              <p className="mt-1 font-heading text-lg font-semibold text-peacock-900">{ekadasi.paksha} Paksha</p>
            </motion.div>
          </div>

          <motion.div {...fade} className="mt-10 rounded-2xl border border-gold-200/50 bg-gradient-to-br from-gold-50 to-cream p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-semibold text-maroon">Spiritual Significance</h2>
            <p className="mt-4 text-base leading-relaxed text-peacock-900/85">{ekadasi.significance}</p>
          </motion.div>

          {ekadasi.pastime && (
            <motion.div {...fade} className="mt-8 rounded-2xl border border-peacock-200/50 bg-gradient-to-br from-peacock-50/40 to-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-semibold text-maroon">Pastime</h2>
              <p className="mt-4 text-base leading-relaxed text-peacock-900/85">{ekadasi.pastime}</p>
            </motion.div>
          )}

          <motion.div {...fade} className="mt-8 rounded-2xl border border-peacock-100 bg-white p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-semibold text-maroon">Fasting Guidelines</h2>
            <div className="mt-4 space-y-4">
              <p className="text-base leading-relaxed text-peacock-900/85">
                On {ekadasi.name}, devotees should completely abstain from grains, beans, and grain-derived products from sunrise to the next day's Sunrise.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-green-50 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-green-800">Allowed</h3>
                  <ul className="mt-2 space-y-1 text-sm text-green-700">
                    <li>Fruits, nuts, and dry fruits</li>
                    <li>Milk and milk products</li>
                    <li>Potatoes, sweet potatoes, tapioca</li>
                    <li>Singhara (water chestnut) flour</li>
                    <li>Sabudana (sago / tapioca pearls)</li>
                    <li>Rock salt (sendha namak)</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-red-50 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-red-800">Not Allowed</h3>
                  <ul className="mt-2 space-y-1 text-sm text-red-700">
                    <li>Rice, wheat, and all grains</li>
                    <li>Dal, lentils, and all beans</li>
                    <li>Corn, millet, oats, barley</li>
                    <li>Table salt (use rock salt)</li>
                    <li>Spices like hing (asafoetida)</li>
                    <li>Mustard, sesame, fenugreek seeds</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Prev / Next navigation */}
          <div className="mt-10 flex items-center justify-between gap-4">
            {prev ? (
              <Link
                to={`/resources/ekadasi/${prev.slug}`}
                className="inline-flex items-center gap-2 rounded-xl border border-peacock-200 bg-white px-5 py-3 text-sm font-medium text-peacock-700 shadow-sm transition-colors hover:bg-peacock-50"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{prev.name}</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link
                to={`/resources/ekadasi/${next.slug}`}
                className="inline-flex items-center gap-2 rounded-xl border border-peacock-200 bg-white px-5 py-3 text-sm font-medium text-peacock-700 shadow-sm transition-colors hover:bg-peacock-50"
              >
                <span className="hidden sm:inline">{next.name}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : <span />}
          </div>
        </Container>
      </section>
    </>
  )
}
