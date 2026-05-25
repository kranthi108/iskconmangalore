import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import HeroBanner from '@/components/layout/HeroBanner'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { HERO_BANNER } from '@/constants/placeholders'
import { cn } from '@/utils/cn'

import gunakarImg from '@/assets/management council/gunakarramadas.png'
import sanandanaImg from '@/assets/management council/sanandanadas.png'
import radhavallabhImg from '@/assets/management council/radhavallabhdas.png'
import rohiniImg from '@/assets/management council/radhajivandas.png'

interface CouncilMember {
  name: string
  role: string
  photo: string
  bio: string
}

const COUNCIL_MEMBERS: CouncilMember[] = [
  {
    name: 'Gunakara Rama Dasa',
    role: 'President',
    photo: gunakarImg,
    bio: 'Gunakara Rama Dasa was born in Mangalore, Karnataka. He came in touch with the teachings of A C Bhaktivedanta Swami Prabhupada while pursuing his B.E. (Electrical Engineering) in BMS College of Engineering, Bangalore. Post the graduation, he worked in General Electric, a multinational conglomerate company. Later, after completing M.Tech from NIT-Calicut, joined ISKCON Bangalore in 2009. He has rendered various services ranging from youth programs, managing the temple administration, to training and development of full-time missionaries.\n\nGunakara Rama Dasa is the President of ISKCON, Mangalore and Regional President of Akshaya Patra operations in Bangalore, Ballary and Mangalore.',
  },
  {
    name: 'Sanandana Dasa',
    role: 'Secretary',
    photo: sanandanaImg,
    bio: 'Sanandana Dasa serves as the Secretary of ISKCON Sri Krishna Balaram Mandir, Mangalore. He plays a key role in coordinating the temple\'s administrative and spiritual activities, ensuring smooth operations and devotee engagement across all programs.',
  },
  {
    name: 'Radhavallabh Dasa',
    role: 'Treasurer',
    photo: radhavallabhImg,
    bio: 'Radha Vallabha Dasa was born in 1979 in Chickmagaluru, Karnataka. He completed his MBA in Davanagere from Kuvempu University. While working as Sales Officer in Madras Cements Limited, Hassan, he developed interest in the message and mission of Srila Prabhupada. He joined the movement as a full-time dedicated member of ISKCON Bangalore in 2008 and later moved to ISKCON Mangalore. Since then he has been working for the development of the temple in various departments. As the Head of the Deities related services, he has ensured that good standards of worship are maintained in the temple.\n\nRadhavallabha Dasa is the Treasurer of ISKCON Mangalore.',
  },
  {
    name: 'Rohini Suta Dasa',
    role: 'Member of Management Council',
    photo: rohiniImg,
    bio: 'Rohini Suta Dasa was born in 1986 in Motihari, Bihar. While an undergraduate student of Electrical and Electronics at National Institute of Technology Surathkal, Karnataka, he became interested in the message and mission of Srila Prabhupada. After his college, he worked for a financial company called \'FUTURES FIRST\' for 3 years in Bangalore. He became a full-time dedicated member of ISKCON Mangalore in 2012 and since then he is in the service of GOD and Mankind in various ways. He has organised seminars, workshops, and counselling programs to benefit students of colleges like NIT Calicut. He has guided many people especially youths to lead a life of happiness and fulfillment.\n\nHe is presently involved in Gifts and Books division and Youth empowerment division of ISKCON Mangalore.',
  },
]

const roleColors: Record<string, string> = {
  President: 'from-gold-400 to-gold-200',
  Secretary: 'from-peacock-400 to-peacock-200',
  Treasurer: 'from-amber-500 to-amber-300',
}

function MemberModal({ member, onClose }: { member: CouncilMember; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gold-200/30 bg-cream shadow-2xl"
      >
        <div className="bg-gradient-to-r from-maroon to-peacock-900 px-6 py-5 text-cream">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-semibold">{member.name}</h2>
              <p className="mt-0.5 text-sm text-gold-200">{member.role}</p>
            </div>
            <button type="button" onClick={onClose} className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="flex justify-center">
            <img
              src={member.photo}
              alt={member.name}
              className="h-40 w-40 rounded-full border-4 border-gold-200/50 object-cover shadow-lg"
            />
          </div>
          <div className="mt-6 space-y-4">
            {member.bio.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-peacock-800">{para}</p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ManagementCouncilPage() {
  const [selected, setSelected] = useState<CouncilMember | null>(null)

  return (
    <>
      <Helmet>
        <title>Management Council · ISKCON Mangalore</title>
        <meta name="description" content="Meet the Management Council of ISKCON Sri Krishna Balaram Mandir, Mangalore — the devotees leading the temple's spiritual and administrative activities." />
      </Helmet>

      <HeroBanner
        title="Management Council"
        subtitle="The dedicated devotees guiding ISKCON Sri Krishna Balaram Mandir's spiritual and administrative mission."
        backgroundImage={HERO_BANNER}
        height="medium"
      />

      <section className="bg-gradient-to-b from-cream to-white py-16 md:py-24">
        <Container size="lg">
          <SectionHeading
            alignment="center"
            title="Governance"
            subtitle="Under the guidance of ISKCON's Governing Body Commission, the Management Council oversees the temple's spiritual programs, community outreach, and administrative operations."
            decorative
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2">
            {COUNCIL_MEMBERS.map((member, idx) => (
              <motion.button
                key={member.name}
                type="button"
                onClick={() => setSelected(member)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-peacock-100 bg-white p-8 text-center shadow-md transition-shadow hover:shadow-xl"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className={cn(
                    'mx-auto h-28 w-28 rounded-full border-4 object-cover shadow-md transition-transform group-hover:scale-105',
                    `border-transparent bg-gradient-to-br ${roleColors[member.role] ?? 'from-peacock-200 to-peacock-100'}`,
                  )}
                  style={{ borderColor: undefined }}
                />
                <div className={cn(
                  'mx-auto -mt-1 h-1.5 w-16 rounded-full bg-gradient-to-r',
                  roleColors[member.role] ?? 'from-peacock-200 to-peacock-100',
                )} />
                <h3 className="mt-4 font-heading text-xl font-semibold text-maroon">{member.name}</h3>
                <p className="mt-1.5 text-sm font-medium uppercase tracking-wider text-peacock-600">{member.role}</p>
                <p className="mt-3 text-xs text-peacock-500">Click to view background</p>
              </motion.button>
            ))}
          </div>
        </Container>
      </section>

      <AnimatePresence>
        {selected && <MemberModal member={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
