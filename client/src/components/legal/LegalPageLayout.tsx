import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import HeroBanner from '@/components/layout/HeroBanner'
import Container from '@/components/ui/Container'
import { TEMPLE_INFO } from '@/constants/data'

export interface LegalSection {
  title: string
  paragraphs: string[]
  list?: readonly string[]
}

interface LegalPageLayoutProps {
  title: string
  subtitle: string
  metaDescription: string
  sections: readonly LegalSection[]
  lastUpdated?: string
}

const fade = { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } as const }

export default function LegalPageLayout({
  title,
  subtitle,
  metaDescription,
  sections,
  lastUpdated,
}: LegalPageLayoutProps) {
  return (
    <>
      <Helmet>
        <title>{title} · ISKCON Mangalore</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <HeroBanner title={title} subtitle={subtitle} height="small" />

      <section className="bg-gradient-to-b from-white via-cream to-white py-16 md:py-20">
        <Container size="md">
          <motion.div {...fade} className="rounded-3xl border border-maroon/15 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm text-peacock-800/75">
              This page applies to {TEMPLE_INFO.name} ({TEMPLE_INFO.address}). For questions, contact us at{' '}
              <a className="font-semibold text-maroon underline-offset-2 hover:underline" href={`mailto:${TEMPLE_INFO.email}`}>
                {TEMPLE_INFO.email}
              </a>{' '}
              or{' '}
              <a className="font-semibold text-maroon underline-offset-2 hover:underline" href={`tel:${TEMPLE_INFO.phone.replace(/\s+/g, '')}`}>
                {TEMPLE_INFO.phone}
              </a>
              .
            </p>
            {lastUpdated ? (
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-peacock-800/60">Last updated: {lastUpdated}</p>
            ) : null}

            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <motion.article key={section.title} {...fade} className="space-y-4">
                  <h2 className="font-heading text-2xl text-maroon">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-peacock-900/85">
                      {paragraph}
                    </p>
                  ))}
                  {section.list?.length ? (
                    <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-peacock-900/85">
                      {section.list.map((item) => (
                        <li key={item.slice(0, 48)}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </motion.article>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
