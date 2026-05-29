import { ExternalLink } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import LotusDevider from '@/components/krishna/LotusDevider'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Input from '@/components/ui/Input'
import { NAV_LINKS, SOCIAL_LINKS, TEMPLE_INFO } from '@/constants/data'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim()) {
      return
    }
    setStatus('sent')
    setEmail('')
    window.setTimeout(() => setStatus('idle'), 2400)
  }

  const year = new Date().getFullYear()

  return (
    <footer className="bg-peacock-900 text-cream">
      <div className="pb-6 pt-10">
        <LotusDevider className="text-gold-500" />
      </div>

      <Container className="space-y-14 pb-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_repeat(3,minmax(0,1fr))]">
          <section className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold text-gold-400">{TEMPLE_INFO.name}</h2>
            <div className="space-y-3 text-base text-white/82">
              <p className="inline-flex gap-3">
                <svg className="mt-1 h-5 w-5 shrink-0 text-gold-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                  <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{TEMPLE_INFO.address}</span>
              </p>
              <p className="inline-flex gap-3">
                <svg className="mt-1 h-5 w-5 shrink-0 text-gold-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                  <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.72 19.72 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.72 19.72 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.962.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.27a2 2 0 0 1 2.11-.45c.907.337 1.848.573 2.81.7A2 2 0 0 1 22 16.9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a className="text-gold-200 underline-offset-2 hover:text-gold-400 hover:underline" href={`tel:${TEMPLE_INFO.phone.replace(/\s+/g, '')}`}>
                  {TEMPLE_INFO.phone}
                </a>
              </p>
              <p className="inline-flex gap-3">
                <svg className="mt-1 h-5 w-5 shrink-0 text-gold-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2" strokeWidth="2" />
                  <path d="m22 7-10 7L2 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a className="text-gold-200 underline-offset-2 hover:text-gold-400 hover:underline" href={`mailto:${TEMPLE_INFO.email}`}>
                  {TEMPLE_INFO.email}
                </a>
              </p>
            </div>
          </section>

          <section>
            <h3 className="font-heading text-lg font-semibold text-gold-300">Sacred corridors</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link className="text-sm font-semibold text-white/80 transition hover:text-gold-400" to={href || "/"}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-heading text-lg font-semibold text-gold-300">Follow Śrīla Prabhupāda’s footsteps</h3>
            <ul className="mt-5 space-y-3">
              {SOCIAL_LINKS.map(({ ariaLabel, href, label }) => (
                <li key={label}>
                  <a
                    aria-label={ariaLabel}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 text-sm font-semibold text-white/85 transition hover:text-gold-300"
                  >
                    <span className="inline-flex rounded-full bg-white/10 p-2 text-gold-300">
                      <ExternalLink className="h-5 w-5" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section id="newsletter">
            <h3 className="font-heading text-lg font-semibold text-gold-300">Stay in the kīrtana loop</h3>
            <p className="mt-3 text-sm text-white/82">
              Festival alerts, Śrīmad Bhāgavatam timings, feast sponsorship updates, retreat news.
            </p>
            <form onSubmit={handleSubscribe} className="mt-5 space-y-3">
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-label="Email address"
                placeholder="you@satsanga.org"
                className="border-white/35 bg-maroon-dark/45 text-white placeholder:text-white/60 focus:border-gold-400 focus:ring-gold-400/35"
              />
              <Button type="submit" variant="secondary" size="lg" className="w-full">
                {status === 'sent' ? 'Haribol · Check your inbox' : 'Subscribe with blessings'}
              </Button>
            </form>
          </section>
        </div>

        <div className="space-y-6 text-center text-sm uppercase tracking-[0.45em] text-gold-200">
          Hare Krishna Hare Krishna Krishna Krishna Hare Hare
          <br />
          Hare Rama Hare Rama Rama Rama Hare Hare
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/25 pt-6 text-xs font-semibold text-white/70">
          <p>© {year} · ISKCON Mangalore seva trust</p>
          <p>Goloka-bound consciousness begins today · All glories to Śrī Guru and Śrī Gaurāṅga</p>
        </div>
      </Container>
    </footer>
  )
}
