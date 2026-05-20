import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import HeroBanner from '@/components/layout/HeroBanner'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { HERO_BANNER } from '@/constants/placeholders'

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } as const }

export default function OurAcharyaPage() {
  return (
    <>
      <Helmet>
        <title>Our Ācārya — Srila Prabhupada · ISKCON Mangalore</title>
        <meta name="description" content="The life, teachings, and legacy of His Divine Grace A. C. Bhaktivedanta Swami Prabhupada — Founder-Ācārya of the International Society for Krishna Consciousness." />
      </Helmet>

      <HeroBanner
        title="His Divine Grace A. C. Bhaktivedanta Swami Prabhupāda"
        subtitle="Founder-Ācārya of the International Society for Krishna Consciousness"
        backgroundImage={HERO_BANNER}
        height="medium"
      />

      <section className="bg-gradient-to-b from-white via-cream to-white py-20">
        <Container size="lg">
          <SectionHeading
            decorative
            title="The Prophecy Fulfilled"
            subtitle="A scholar, a philosopher, a cultural ambassador, a prolific author, a religious leader, a spiritual teacher, a social critic, and a holy man — in truth, he was all these things and more."
          />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              Over five hundred years ago, Lord Sri Krishna appeared as Sri Chaitanya Mahaprabhu in Navadvipa, a village in West Bengal. The purpose of His appearance was to inaugurate the Sankirtana Movement, the Yuga Dharma for this age of Kali. He declared that the chanting of His holy names would spread beyond the shores of India to every town and village in the world. He predicted that His commander-in-chief would appear to accomplish this mission.
            </motion.p>
            <motion.p {...fade} className="text-lg font-semibold italic text-maroon">
              Yes… Srila Prabhupada appeared to fulfill this prophecy.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              On September 01, 1896, the day after Janmashtami, in a little house in the Tollygunge suburb of Calcutta, a male child was born. His father, Gour Mohan De, and his mother Rajani, named him Abhay Charan — one who is fearless, having taken shelter at the lotus feet of Lord Krishna.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              An astrologer prepared the horoscope for the baby and revealed: <em>"When this child reaches the age of seventy, he will cross the ocean, become a great teacher of religion and establish 108 Krishna temples."</em> And this is exactly what happened.
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20">
        <Container size="lg">
          <SectionHeading decorative title="A Brief Biography" />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              His Divine Grace A. C. Bhaktivedanta Swami Prabhupada was born in 1896 in Calcutta, India. He first met his spiritual master, Srila Bhaktisiddhanta Sarasvati Gosvami, in Calcutta in 1922. Bhaktisiddhanta Sarasvati, a prominent devotional scholar and the founder of sixty-four branches of Gaudiya Mathas (Vedic Institutes), liked this educated young man and convinced him to dedicate his life to teaching Vedic knowledge in the Western world. Srila Prabhupada became his student and eleven years later (1933) at Allahabad, he became his formally initiated disciple.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              At their first meeting, in 1922, Srila Bhaktisiddhanta Sarasvati Thakura requested Srila Prabhupada to propagate Vedic knowledge in the English language. In the years that followed, Srila Prabhupada wrote a commentary on the Bhagavad-gita and in 1944, without any assistance, started an English fortnightly magazine — <em>Back to Godhead</em>.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              Recognizing Srila Prabhupada's philosophical learning and devotion, the Gaudiya Vaisnava Society honored him in 1947 with the title "Bhaktivedanta". In 1950, at the age of fifty-four, Srila Prabhupada retired from married life and four years later he adopted the Vanaprastha (retired) order to devote more time to his studies and writing. He travelled to the holy city of Vrindavana, where he lived in very humble circumstances in the historic medieval temple of Radha-Damodara. There he engaged himself for several years in deep study and writing. He accepted the renounced order of life (sannyasa) in 1959.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              At Radha-Damodara, Srila Prabhupada began work on his life's masterpiece: a multivolume translation and commentary on the 18,000-verse Srimad-Bhagavatam (Bhagavata Purana). He also wrote <em>Easy Journey to Other Planets</em>.
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-b from-white to-cream py-20">
        <Container size="lg">
          <SectionHeading decorative title="Founding the Hare Krishna Movement" />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              Srila Prabhupada set out to America in 1965 and established the International Society for Krishna Consciousness at the age of sixty-nine. When he first arrived in New York City, he was practically penniless. It was after almost a year of great difficulty that he established ISKCON in July of 1966. Under his careful guidance, the Society grew within a decade into a worldwide confederation of nearly one hundred ashrams, schools, temples, institutes and farm communities.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              Srila Prabhupada brought the Hare Krishna Movement to the public eye by chanting in the parks, distributing the <em>Back to Godhead</em> Magazine, conducting love feasts, and delivering lectures from the Bhagavad-gita and Srimad Bhagavatam in a rented store-front. Thus, he attracted many youngsters, who gradually became his disciples.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              He travelled around the world fourteen times, established more than 108 temples of Krishna, initiated more than 10,000 disciples into Krishna consciousness, and envisioned God-centered self-sufficient farm communities based on the principles of Simple Living, High Thinking. In 1972, he started a gurukul in Dallas, Texas — an educational institution set up according to the traditional Vedic model. He instructed his disciples that no one should go hungry within a 10-mile radius of an ISKCON temple.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              In 1968, Srila Prabhupada created New Vrindavana, an experimental Vedic community in the hills of West Virginia. Inspired by its success as a thriving farm community of more than one thousand acres, his students founded several similar communities in the United States and abroad.
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-maroon via-peacock-900 to-maroon py-20 text-cream">
        <Container size="lg">
          <SectionHeading
            decorative
            alignment="center"
            title="Srila Prabhupada and His Books"
            className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/85"
          />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-white/85">
              Of all his contributions, Srila Prabhupada considered his books to be of utmost importance. These books present the timeless wisdom of Vedic scriptures in modern English with startling clarity and a convincing, simple eloquence that proves the relevance of the science of self-realization to our modern world and our own lives. Highly respected by the academic community for their authoritativeness, depth and clarity, they are used as standard textbooks in numerous colleges. His writings have been translated into over fifty languages.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-white/85">
              The Bhaktivedanta Book Trust, established in 1972 exclusively to publish the works of His Divine Grace, has become the world's largest publisher of books in the field of Indian religion and philosophy. In the last ten years of his life, in spite of his old age, Srila Prabhupada circled the globe twelve times on lecture tours that took him to six continents — and yet continued to write prolifically. He left us a veritable library of Vedic philosophy, religion, literature and culture.
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20">
        <Container size="lg">
          <SectionHeading decorative title="Teachings of Srila Prabhupada" />

          <div className="mt-12 space-y-6">
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              Srila Prabhupada is the spiritual ambassador who visited our planet to give us the message of Godhead and invite us to come back home — back to Godhead. According to Srila Prabhupada, Krishna Consciousness is not an arm-chair philosophy or a part-time religion; it is a way of life.
            </motion.p>
            <motion.p {...fade} className="text-base leading-relaxed text-peacock-900/85">
              From 1966 till he breathed his last in 1977, Srila Prabhupada travelled the world extensively, meeting world leaders, perpetually giving lectures and interviews, and providing spirit to understand Vedic philosophy. At various times people have called him a scholar, a philosopher, a cultural ambassador, a prolific author, a religious leader, a spiritual teacher, a social critic, and a holy man. In truth, he was all these things and more.
            </motion.p>
            <motion.p {...fade} className="mt-8 text-center font-heading text-xl italic text-maroon">
              "He presented the philosophy of Krishna Consciousness very extensively in his books and we request you to make it a habit to read Srila Prabhupada's books and be benefited by them."
            </motion.p>
          </div>
        </Container>
      </section>
    </>
  )
}
