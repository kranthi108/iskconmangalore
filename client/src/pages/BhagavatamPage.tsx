import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import HeroBanner from '@/components/layout/HeroBanner'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import bhagavatamBanner from '@/assets/banners/bhagavatam.jpg'

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } as const }

export default function BhagavatamPage() {
  return (
    <>
      <Helmet>
        <title>Srimad Bhagavatam · ISKCON Mangalore</title>
        <meta name="description" content="Explore the Srimad Bhagavatam — the ripened fruit of the Vedic tree, the literary incarnation of God, and Srila Prabhupada's crowning literary achievement." />
      </Helmet>

      <HeroBanner
        title="Śrīmad Bhāgavatam"
        subtitle="The beautiful story of the Supreme Personality of Godhead — the ripened fruit of the wish-fulfilling tree of Vedic literature"
        backgroundImage={bhagavatamBanner}
        height="medium"
      />

      <section className="bg-gradient-to-b from-white via-cream to-white py-20">
        <Container size="lg">
          <SectionHeading
            decorative
            title="The Ripened Fruit of Vedic Literature"
            subtitle="Nigama-kalpa-taror galitam phalam — the Srimad Bhagavatam is the cream of all Vedic knowledge."
          />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              The Srimad Bhagavatam (Bhagavata Purana) is a monumental work of 18,000 verses in 12 cantos, compiled by Srila Vyasadeva — the literary incarnation of the Supreme Lord. It is considered the natural commentary on the Vedanta-sutra and the most complete and authoritative scripture in all of Vedic literature. While all other Puranas are compared to different parts of a wish-fulfilling tree, the Srimad Bhagavatam is described as the ripened fruit — the sweetest and most nourishing.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              The Bhagavatam was spoken by Srila Sukadeva Gosvami to Maharaja Parikshit, who had only seven days to live. In those seven days, Sukadeva Gosvami narrated the complete science of God — from the creation of the universe to the intimate pastimes of Lord Sri Krishna in Vrindavan. This is the book that satisfied Vyasadeva after he had compiled all other Vedic literature and still felt incomplete.
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20">
        <Container size="lg">
          <SectionHeading decorative title="ISKCON and the Bhagavatam" />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              His Divine Grace A. C. Bhaktivedanta Swami Prabhupada dedicated the final years of his life to translating and commenting on the Srimad Bhagavatam. He considered this his most important work — even more so than the Bhagavad Gita. He completed translations and purports for the first nine-and-a-half cantos, producing over 30 volumes, each containing the original Sanskrit verses, Roman transliterations, word-for-word meanings, translations, and elaborate purports.
            </motion.p>
            <motion.p {...fade} className="text-lg font-semibold italic text-maroon">
              "If one simply reads Srimad-Bhagavatam, one has assuredly seen Lord Krishna. It is so powerful."
              <span className="mt-1 block text-sm font-normal not-italic text-peacock-700">— Srila Prabhupada</span>
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              Srila Prabhupada established the tradition of daily Bhagavatam classes in every ISKCON temple worldwide. Each morning, devotees gather to hear and discuss a verse from the Bhagavatam, following the principle that the Bhagavatam should be heard in the association of pure devotees. This daily immersion in the Bhagavatam is considered the backbone of spiritual life in ISKCON.
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-maroon via-peacock-900 to-maroon py-20 text-cream">
        <Container size="lg">
          <SectionHeading
            decorative
            alignment="center"
            title="The Twelve Cantos"
            className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/85"
          />

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { canto: '1', title: 'Creation', desc: 'The questions by the sages and the glories of devotional service.' },
              { canto: '2', title: 'The Cosmic Manifestation', desc: 'The process of creation and the form of the Universal Lord.' },
              { canto: '3', title: 'The Status Quo', desc: 'Conversations between Vidura and Maitreya on creation and devotion.' },
              { canto: '4', title: 'The Creation of the Fourth Order', desc: 'The story of Dhruva Maharaja and Prahlada Maharaja.' },
              { canto: '5', title: 'The Creative Impetus', desc: 'The story of Rshabhadeva and the structure of the universe.' },
              { canto: '6', title: 'Prescribed Duties', desc: 'The story of Ajamila and the battle between the demigods and demons.' },
              { canto: '7', title: 'The Science of God', desc: 'Prahlada Maharaja and the appearance of Lord Nrisimhadeva.' },
              { canto: '8', title: 'Withdrawal of the Cosmic Creations', desc: 'The churning of the milk ocean and Lord Vamanadeva.' },
              { canto: '9', title: 'Liberation', desc: 'The dynasties of kings and the appearance of Lord Ramachandra.' },
              { canto: '10', title: 'The Summum Bonum', desc: 'The transcendental pastimes of Lord Sri Krishna in Vrindavan and Mathura.' },
              { canto: '11', title: 'General History', desc: 'The Uddhava Gita and the disappearance of the Yadu dynasty.' },
              { canto: '12', title: 'The Age of Deterioration', desc: 'Prophecies of Kali-yuga and the ultimate conclusion.' },
            ].map((c) => (
              <motion.div key={c.canto} {...fade} className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">Canto {c.canto}</p>
                <h3 className="mt-1 font-heading text-lg text-cream">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-b from-white to-cream py-20">
        <Container size="lg">
          <SectionHeading decorative title="Study at ISKCON Mangalore" />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              At ISKCON Sri Krishna Balaram Mandir, Mangalore, the Srimad Bhagavatam is studied daily during the morning program. Every morning between 7:30 AM and 8:30 AM, a senior devotee leads the class — reading the verse, translating word by word, and sharing Srila Prabhupada's illuminating purport followed by an interactive discussion.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              Weekly Bhagavatam study circles are also organized for congregation members and newcomers, providing a systematic and progressive journey through the cantos. These sessions are designed to help seekers understand the deep philosophical truths and personal application of the Bhagavatam in daily life.
            </motion.p>
            <motion.p {...fade} className="mt-8 text-center font-heading text-xl italic text-maroon">
              "This Bhagavata Purana is as brilliant as the sun, and it has arisen just after the departure of Lord Krishna to His own abode. Persons who have lost their vision due to the dense darkness of this Age of Kali shall get light from this Purana."
              <span className="mt-1 block text-sm font-normal not-italic text-peacock-700">— Srimad Bhagavatam 1.3.43</span>
            </motion.p>
          </div>
        </Container>
      </section>
    </>
  )
}
