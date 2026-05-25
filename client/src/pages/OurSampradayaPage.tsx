import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import HeroBanner from '@/components/layout/HeroBanner'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import sampradayaBanner from '@/assets/banners/sampradaya.jpg'
import prabhupadImg from '@/assets/banners/prabhupad.jpg'

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } as const }

export default function OurSampradayaPage() {
  return (
    <>
      <Helmet>
        <title>Our Sampradaya — Brahma-Madhva-Gaudiya · ISKCON Mangalore</title>
        <meta name="description" content="Learn about the Brahma-Madhva-Gaudiya Sampradaya — the bona fide disciplic succession through which Krishna consciousness is transmitted." />
      </Helmet>

      <HeroBanner
        title="Brahma-Madhva-Gaudiya Sampradaya"
        subtitle="The bona fide disciplic succession of Krishna consciousness"
        backgroundImage={sampradayaBanner}
        height="medium"
      />

      <section className="bg-gradient-to-b from-white via-cream to-white py-20">
        <Container size="lg">
          <SectionHeading
            decorative
            title="The Disciplic Succession"
            subtitle="Knowledge received from a bona fide sampradaya is eternally correct and will bring you back to Godhead."
          />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              A spiritual master must be in an authorized disciplic succession to be bona fide. It is not possible for someone to be a bona fide spiritual master in a line of spiritual authority that does not come from Krishna. Sometimes pseudo-spiritual masters create a line of philosophy. They have a "vision" or dream in which they imagine that they have become empowered by God, or that they are God, and they should start teaching others. But this is never accepted by the true followers of the Vaishnava tradition.
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20">
        <Container size="lg">
          <SectionHeading decorative title="The Four Vaishnava Sampradayas" />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                name: 'Brahma Sampradaya',
                origin: 'Lord Brahma',
                description: 'The school coming in the succession from Lord Brahma, the creator of the universe. ISKCON belongs to this sampradaya through the Madhva and Gaudiya lines.',
              },
              {
                name: 'Rudra Sampradaya',
                origin: 'Lord Shiva',
                description: 'Coming from Lord Shiva, the destroyer of the universe, this sampradaya carries the devotional teachings passed down through Vishnuswami.',
              },
              {
                name: 'Sri Sampradaya',
                origin: 'Goddess Lakshmi',
                description: 'Coming from Lakshmi, the goddess of fortune and constant associate of Lord Vishnu, the maintainer of the universe. Ramanujacharya is its most prominent acharya.',
              },
              {
                name: 'Kumara Sampradaya',
                origin: 'The Four Kumaras',
                description: 'Coming from the four Kumaras, who are incarnations of devotional knowledge. Nimbarkacharya is the principal acharya of this line.',
              },
            ].map((s) => (
              <motion.div
                key={s.name}
                {...fade}
                className="rounded-2xl border border-maroon/15 bg-white p-8 shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">From {s.origin}</p>
                <h3 className="mt-2 font-heading text-2xl text-maroon">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-peacock-900/85">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-b from-white to-cream py-20">
        <Container size="lg">
          <SectionHeading decorative title="Srila Prabhupada — The Current Link" />

          <div className="mt-12 grid items-center gap-10 md:grid-cols-[280px_1fr]">
            <motion.div {...fade}>
              <img
                src={prabhupadImg}
                alt="His Divine Grace A. C. Bhaktivedanta Swami Prabhupada"
                className="w-full rounded-2xl border-4 border-gold-200/50 object-cover shadow-xl"
              />
            </motion.div>
            <div className="space-y-5">
              <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
                His Divine Grace A. C. Bhaktivedanta Swami Prabhupada is the 32nd acharya in the Brahma-Madhva-Gaudiya Sampradaya, directly representing the disciplic succession from Lord Krishna Himself through Brahma, Narada, Vyasa, Madhvacharya, and Sri Chaitanya Mahaprabhu. He is the Founder-Acharya of the International Society for Krishna Consciousness (ISKCON).
              </motion.p>
              <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
                Srila Prabhupada single-handedly brought the teachings of this sampradaya to the Western world. At the age of sixty-nine, he journeyed to America with nothing more than a trunk of books and forty rupees. Within eleven years, he circled the globe fourteen times, established 108 temples, initiated over 10,000 disciples, and translated over 80 volumes of Vedic literature — making the ancient wisdom of the Brahma-Madhva-Gaudiya Sampradaya accessible to all humanity.
              </motion.p>
              <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
                Without Srila Prabhupada, the unbroken chain of disciplic succession would remain unknown to most of the world. He is not merely a link in the parampara — he is the compassionate ambassador who carried Vrindavan's mercy to every continent.
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-maroon via-peacock-900 to-maroon py-20 text-cream">
        <Container size="lg" className="text-center">
          <SectionHeading
            decorative
            alignment="center"
            title="Eternal Knowledge"
            className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/85"
          />

          <motion.p {...fade} className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/85">
            Knowledge received from these four sampradayas is eternally correct and will bring you back to Godhead, whereas knowledge received outside these sampradayas is temporary and will not bring you to the highest destination. The International Society for Krishna Consciousness (ISKCON) follows the Brahma-Madhva-Gaudiya Sampradaya, tracing its lineage from Lord Brahma through Madhvacharya and Sri Chaitanya Mahaprabhu to Srila Prabhupada.
          </motion.p>
        </Container>
      </section>
    </>
  )
}
