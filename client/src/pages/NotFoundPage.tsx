import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import FloatingParticles from '@/components/krishna/FloatingParticles'
import { buttonVariants } from '@/components/ui/buttonVariants'
import Container from '@/components/ui/Container'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page not nestled in Bhāgavatam stack</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-peacock-950 via-maroon to-peacock-900 pb-36 pt-32 text-cream">
        <FloatingParticles />
        <div className="pointer-events-none absolute inset-0 opacity-40 blur-3xl" aria-hidden>
          <motion.div animate={{ rotate: [0, 6, -6, 0] }} transition={{ repeat: Infinity, duration: 12 }} className="mx-auto mt-[-10%] h-[560px] w-[560px] rounded-full bg-gold-400/20" />
        </div>

        <Container size="md" className="relative flex flex-col items-center gap-8 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold uppercase tracking-[0.55em] text-gold-200">
            Śrī Rādhā’s library · 404
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl sm:text-[2.8rem]" transition={{ duration: 0.55 }}>
            Lost in the spiritual realm?
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="max-w-2xl text-base text-white/85 sm:text-lg">
            Chant once more —
            <span className="font-sanskrit text-gold-200"> Hare Kṛṣṇa Hare Kṛṣṇa </span>
            — and Śrīla Prabhupāda lovingly redirects every wandering traveller toward the Mādhuras homepage.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="rounded-[40px] border border-white/25 bg-maroon-light/85 px-12 py-8 text-[7rem] font-heading text-white shadow-[0_32px_80px_-42px_rgb(236,229,229)] backdrop-blur sm:text-[8.5rem]">
            भ
          </motion.div>

          <Link to="/" className={buttonVariants({ variant: 'secondary', size: 'xl', className: 'no-underline' })}>
            Back to darśana homeground
          </Link>
        </Container>
      </section>
    </>
  )
}
