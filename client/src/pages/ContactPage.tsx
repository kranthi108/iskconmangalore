import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Loader2, Mail, MapPinned, Phone } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import HeroBanner from '@/components/layout/HeroBanner'
import VolunteerModal from '@/components/volunteer/VolunteerModal'
import { buttonVariants } from '@/components/ui/buttonVariants'
import Container from '@/components/ui/Container'
import Input from '@/components/ui/Input'
import SectionHeading from '@/components/ui/SectionHeading'
import { TEMPLE_INFO } from '@/constants/data'
import { HERO_BANNER } from '@/constants/placeholders'
import { submitContact } from '@/services/contactService'
import { ApiHttpError } from '@/services/api'
import type { ContactFormData } from '@/types'
import { cn } from '@/utils/cn'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(3, 'We cherish longer names lovingly sung in mahā-mantra circles.'),
  email: z.string().email({ message: 'Share a nectar-filled email so we reply before the Sandhyā blaze.' }),
  phone: z
    .string()
    .min(10, 'We need digits to chant you back warmly.')
    .max(13, 'If international, prepend country code graciously.'),
  subject: z.string().min(3, 'Subjects help devotees triage seva routes swiftly.'),
  message: z.string().min(40, 'Unfold heart—longer sankalpas help us meditate with you.'),
})

type ContactValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [volunteerOpen, setVolunteerOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: (payload: ContactFormData) => submitContact(payload),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  async function onSubmit(values: ContactValues) {
    try {
      await mutation.mutateAsync(values)
      reset()
    } catch (error: unknown) {
      console.error(error)
    }
  }

  let statusMessage = 'We respond Tuesdays–Saturdays prior to Śrī Krishna Balaram evening offerings.'
  let statusTone = 'text-peacock-800'
  if (mutation.isSuccess) {
    statusMessage = 'Mercy-letter queued — devotees at the seva desk rejoice reading your sincerity.'
    statusTone = 'text-emerald-700'
  }
  if (mutation.isError) {
    statusMessage =
      mutation.error instanceof ApiHttpError
        ? mutation.error.message
        : 'Śāstra servers chanted loudly — revisit after Sandhyā ārati completes.'
    statusTone = 'text-red-600'
  }

  return (
    <>
      <Helmet>
        <title>Contact · ISKCON Mangalore</title>
        <meta name="description" content="Write the mandir seva desk · volunteer · schedule visits · seek spiritual guidance lovingly." />
      </Helmet>
      <HeroBanner title="Connect With Us" subtitle="Every sincere letter becomes garland incense at Śrī Krishna Balaram’s mirror." backgroundImage={HERO_BANNER} height="medium" />

      <section className="bg-gradient-to-b from-white via-cream to-peacock-50 py-20 md:py-24">
        <Container size="xl" className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)]">
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-6 rounded-[32px] border border-maroon/20 bg-white p-8 shadow-xl"
          >
            <SectionHeading alignment="left" title="Bless us with words" subtitle="Sevaka volunteers savor long letters — specificity helps our outreach map." />

            <div className="grid gap-6 md:grid-cols-2">
              <Input label="Blessed name" {...register('name')} error={errors.name?.message} />
              <Input label="Email" type="email" autoComplete="email" {...register('email')} error={errors.email?.message} />
            </div>

            <Input label="Mobile / WhatsApp capable" {...register('phone')} error={errors.phone?.message} />
            <Input label="Subject" {...register('subject')} error={errors.subject?.message} />

            <div>
              <label htmlFor="message" className="mb-1.5 block font-heading text-sm font-semibold text-maroon">
                Message / sankalpa
              </label>
              <textarea
                id="message"
                rows={6}
                className={cn(
                  'w-full rounded-xl border border-peacock-200/85 bg-white/95 px-4 py-3 text-sm text-peacock-950 shadow-sm',
                  'focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/35',
                  errors.message && 'border-red-400',
                )}
                {...register('message')}
              />
              {errors.message?.message ? <p className="mt-2 text-xs font-semibold text-red-600">{errors.message.message}</p> : null}
            </div>

            <p className={cn('text-sm', statusTone)} role="status">
              {statusMessage}
            </p>

            <button type="submit" className={cn(buttonVariants({ variant: 'maroon', size: 'lg', className: 'w-full' }))} disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
                  Whispering prayers on the wires…
                </>
              ) : (
                'Send with darśana dust'
              )}
            </button>
          </motion.form>

          <motion.aside className="space-y-8 rounded-[32px] border border-gold-200/80 bg-maroon px-8 py-10 text-cream shadow-2xl" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold-200">Visit in person</p>
              <h3 className="mt-4 font-heading text-3xl text-cream">{TEMPLE_INFO.name}</h3>
              <address className="mt-6 space-y-3 not-italic text-white/82">
                <div className="flex gap-4">
                  <MapPinned className="mt-1 h-6 w-6 text-gold-200" aria-hidden />
                  <p>{TEMPLE_INFO.address}</p>
                </div>
                <div className="flex gap-4">
                  <Phone className="mt-1 h-6 w-6 text-gold-200" aria-hidden />
                  <a className="font-semibold text-gold-200 hover:text-white" href={`tel:${TEMPLE_INFO.phone.replace(/\s+/g, '')}`}>{TEMPLE_INFO.phone}</a>
                </div>
                <div className="flex gap-4">
                  <Mail className="mt-1 h-6 w-6 text-gold-200" aria-hidden />
                  <a className="font-semibold text-gold-200 hover:text-white" href={`mailto:${TEMPLE_INFO.email}`}>{TEMPLE_INFO.email}</a>
                </div>
              </address>
            </div>

            <div className="rounded-3xl border border-white/20 bg-maroon-light/85 p-5 text-white/82">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-100">Sacred topography</p>
              <a
                href="https://www.google.com/maps/place/ISKCON+Sri+Sri+Krishna+Balaram+Mandir,+Mangaluru/@12.8773348,74.8388406,20.98z"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block overflow-hidden rounded-2xl border border-white/35"
              >
                <iframe
                  title="ISKCON Sri Sri Krishna Balaram Mandir, Mangaluru"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d623.1!2d74.8388406!3d12.8773348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a37f5f689d5%3A0xd5b76b06c2b5e8ee!2sISKCON%20Sri%20Sri%20Krishna%20Balaram%20Mandir%2C%20Mangaluru!5e0!3m2!1sen!2sin!4v1"
                  className="aspect-video w-full rounded-2xl"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </div>
          </motion.aside>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container size="lg" id="volunteer" className="grid gap-8 rounded-[34px] border border-peacock-200/85 bg-peacock-50/80 p-10 shadow-inner lg:grid-cols-[1fr_0.8fr]">
          <SectionHeading alignment="left" title="Volunteer Seva Mosaic" subtitle="Book tables · Annadānam · Harināma amplification · Śāstra study facilitation." />

          <div className="space-y-4 text-peacock-900/85">
            <p>Select your availability rhythm — coordinators pair you without overwhelming household duties.</p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.015 }}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg', className: 'inline-flex w-full md:w-max' }))}
              onClick={() => setVolunteerOpen(true)}
            >
              Sign up for volunteer seva
            </motion.button>
          </div>
        </Container>
      </section>

      <VolunteerModal open={volunteerOpen} onClose={() => setVolunteerOpen(false)} />

      <section className="relative overflow-hidden bg-maroon pb-28 pt-20 text-white">
        <motion.div aria-hidden className="pointer-events-none absolute inset-x-[-20%] bottom-[-30%] h-[60%] bg-gradient-to-t from-gold-400/15 to-transparent" />
        <Container size="md" className="relative rounded-[34px] border border-white/20 bg-maroon-light/70 p-10 text-center backdrop-blur">
          <SectionHeading decorative alignment="center" title="Sunday Love Feast etiquette" subtitle="12:45 PM onward · Children welcome · Śrīla Prabhupāda lecture · Bhajan flight · Sathvic feast." className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/88" />
          <p className="mt-8 text-base text-white/85">
            Bring questions, bring friends, bring empty stomachs — prasādam flows until every plate glows with gratitude toward Śrī Rādhā’s cooks.
          </p>
        </Container>
      </section>
    </>
  )
}
