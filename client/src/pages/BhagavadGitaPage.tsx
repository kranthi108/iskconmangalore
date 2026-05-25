import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import HeroBanner from '@/components/layout/HeroBanner'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import gitaBanner from '@/assets/banners/gita.jpg'

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } as const }

export default function BhagavadGitaPage() {
  return (
    <>
      <Helmet>
        <title>Bhagavad Gita As It Is · ISKCON Mangalore</title>
        <meta name="description" content="Discover the Bhagavad Gita As It Is by His Divine Grace A. C. Bhaktivedanta Swami Prabhupada — the most widely read edition of this timeless classic of Vedic wisdom." />
      </Helmet>

      <HeroBanner
        title="Bhagavad Gītā As It Is"
        subtitle="The Supreme Science of God — presented without adulteration by His Divine Grace A. C. Bhaktivedanta Swami Prabhupāda"
        backgroundImage={gitaBanner}
        height="medium"
      />

      <section className="bg-gradient-to-b from-white via-cream to-white py-20">
        <Container size="lg">
          <SectionHeading
            decorative
            title="The Song of God"
            subtitle="Spoken 5,000 years ago on the battlefield of Kurukshetra, the Bhagavad Gita remains the most essential guidebook for the soul's journey back to Godhead."
          />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              The Bhagavad Gita, literally meaning "The Song of God," is a 700-verse scripture that forms part of the Indian epic Mahabharata. It is a sacred dialogue between Lord Sri Krishna, the Supreme Personality of Godhead, and His most dear friend and devotee Arjuna, spoken on the battlefield of Kurukshetra just prior to the start of a great war. In this conversation, Lord Krishna reveals the deepest truths about the self, the universe, and the ultimate purpose of human life.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              Among all editions and commentaries on the Bhagavad Gita, the one presented by His Divine Grace A. C. Bhaktivedanta Swami Prabhupada — titled <em>Bhagavad Gita As It Is</em> — stands apart because it presents Lord Krishna's message without speculation, impersonalist interpretation, or unauthorized commentary. Srila Prabhupada presents the Gita through the lens of the <em>parampara</em>, the disciplic succession of bona fide spiritual masters descending from Lord Krishna Himself.
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20">
        <Container size="lg">
          <SectionHeading decorative title="Why 'As It Is'?" />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              Many commentators have tried to use the Bhagavad Gita to advance their own philosophical agendas — some claim Krishna is merely a metaphor, others deny His personal form, and still others misrepresent the text to promote impersonalism or voidism. Srila Prabhupada's commentary restores the Gita to its original, intended meaning: that Lord Sri Krishna is the Supreme Personality of Godhead, and the highest perfection of life is to surrender unto Him in pure devotional service (<em>bhakti-yoga</em>).
            </motion.p>
            <motion.p {...fade} className="text-lg font-semibold italic text-maroon">
              "If you want to understand the Bhagavad Gita, we must understand it from the person who spoke it — Sri Krishna. That is our mission."
              <span className="block mt-1 text-sm font-normal not-italic text-peacock-700">— Srila Prabhupada</span>
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              The Gita teaches that the soul (<em>atma</em>) is eternal, that it transmigrates through different bodies life after life, and that the goal of human life is to break free from this cycle of birth and death by re-establishing our loving relationship with Krishna. The Gita explains <em>karma-yoga</em> (action in devotion), <em>jnana-yoga</em> (knowledge of the Absolute), and <em>bhakti-yoga</em> (pure devotional service) — and ultimately concludes that <em>bhakti</em> is the supreme path.
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-maroon via-peacock-900 to-maroon py-20 text-cream">
        <Container size="lg">
          <SectionHeading
            decorative
            alignment="center"
            title="The Essence of the Gita"
            className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/85"
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2">
            {[
              { title: 'Chapter 2, Verse 20', shloka: 'na jāyate mriyate vā kadāchin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ', meaning: 'The soul is never born, nor does it ever die; nor having once existed, does it ever cease to be. The soul is unborn, eternal, ever-existing, and primeval.' },
              { title: 'Chapter 9, Verse 22', shloka: 'ananyāś cintayanto māṁ ye janāḥ paryupāsate teṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham', meaning: 'For those who worship Me with exclusive devotion, meditating on My transcendental form — to them I carry what they lack and preserve what they have.' },
              { title: 'Chapter 18, Verse 66', shloka: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ', meaning: 'Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.' },
              { title: 'Chapter 4, Verse 7', shloka: 'yadā yadā hi dharmasya glānir bhavati bhārata abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham', meaning: 'Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion — at that time I descend Myself.' },
            ].map((verse) => (
              <motion.div
                key={verse.title}
                {...fade}
                className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-300">{verse.title}</h3>
                <p className="mt-3 font-heading text-base italic text-gold-100">{verse.shloka}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{verse.meaning}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-b from-white to-cream py-20">
        <Container size="lg">
          <SectionHeading decorative title="Impact and Legacy" />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              Since its publication in 1968, <em>Bhagavad Gita As It Is</em> has been translated into over 80 languages and has sold more than 50 million copies worldwide, making it the most widely distributed edition of the Gita in history. It is used as a textbook in universities around the world, and scholars have praised it for its authoritativeness, depth, and accessibility.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              The Bhaktivedanta Book Trust (BBT), founded by Srila Prabhupada in 1972, continues to publish and distribute the Gita along with his other literary works. At ISKCON Mangalore, we regularly conduct Bhagavad Gita study sessions, discussions, and distribution drives — making this timeless wisdom accessible to seekers from all walks of life.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              We invite you to read the Bhagavad Gita As It Is, attend our study circles, and discover the answers to life's most fundamental questions: <em>Who am I? Why do I suffer? What is the purpose of life? Who is God?</em>
            </motion.p>
            <motion.p {...fade} className="mt-8 text-center font-heading text-xl italic text-maroon">
              "In all activities just depend upon Me and work always under My protection. In such devotional service, be fully conscious of Me."
              <span className="block mt-1 text-sm font-normal not-italic text-peacock-700">— Lord Sri Krishna, Bhagavad Gita 18.57</span>
            </motion.p>
          </div>
        </Container>
      </section>
    </>
  )
}
