import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Plane, Sparkles } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import DonateModal from '@/components/donations/DonateModal'
import banner from '@/assets/banners/janmastamiannadanaseva.png'
import type { DonateModalFormValues } from '@/components/donations/DonateModal'
import BlessingsSuccessScreen from '@/components/donations/BlessingsSuccessScreen'
import type { DonorInfo } from '@/components/donations/BlessingsSuccessScreen'
import HeroBanner from '@/components/layout/HeroBanner'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { useRazorpay } from '@/hooks/useRazorpay'
import { createOrder, verifyPayment } from '@/services/donationService'
import { ApiHttpError } from '@/services/api'
// import { useEffect } from 'react'

// TODO: Replace with actual campaign ID from database when campaign is created
// This is a placeholder ID for the meta ad campaign
const CAMPAIGN_ID = 1

type RazorpayHandlerResponseSimple = {
  razorpay_order_id?: string
  razorpay_payment_id?: string
  razorpay_signature?: string
}

export default function JanmastamiAnnadanaSevaPage() {
  const razorpay = useRazorpay()
  const [modalOpen, setModalOpen] = useState(false)
  const [donateAmount] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [blessings, setBlessings] = useState<{
    receiptNumber: string
    amount: number
    donorInfo: DonorInfo
  } | null>(null)

  const handleOpenDonateModal = useCallback(() => {
    setModalOpen(true)
    // Track Meta Pixel InitiateCheckout event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Janmastami Annadana Seva',
        content_category: 'Donation',
        value: 1000,
        currency: 'INR',
      })
    }
  }, [])


  const handleModalSubmit = useCallback(
    async (values: DonateModalFormValues) => {
      setIsSubmitting(true)
      try {
        await razorpay.reload()

        const amount = Math.round(donateAmount)
        const donorName = values.fullName.trim()
        const panNormalized = values.pan?.trim() ? values.pan.trim().toUpperCase() : undefined
        const donorAddress = {
          house: values.house?.trim() || undefined,
          street: values.street?.trim() || undefined,
          city: values.city?.trim() || undefined,
          state: values.state?.trim() || undefined,
          pincode: values.pincode?.trim() || undefined,
        }

        const donorEmail = (values.email ?? '').trim()

        const order = await createOrder({
          campaignId: CAMPAIGN_ID,
          amount,
          donorEmail,
          donorName,
          donorPhone: values.phone.trim(),
          donorPAN: panNormalized,
          donorAddress,
        })

        await new Promise<void>((resolvePromise, rejectPromise) => {
          void razorpay
            .openPayment(order, {
              donorName,
              donorEmail,
              donorPhone: values.phone.trim(),
              description: 'Janmastami Annadana Seva · ISKCON Mangalore',
              imageUrl: 'https://guptvrindavandham.org/media/landingpage/General_Temple_Donation_Banner_Desktop.webp',
              themeColor: '#6D071A',
              onSuccess(response: RazorpayHandlerResponseSimple) {
                void (async () => {
                  try {
                    if (
                      typeof response.razorpay_order_id !== 'string' ||
                      typeof response.razorpay_payment_id !== 'string' ||
                      typeof response.razorpay_signature !== 'string'
                    ) {
                      rejectPromise(new Error('invalid razorpay response'))
                      return
                    }

                    const donation = await verifyPayment({
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                    })

                    // Track Meta Pixel Purchase event
                    if (typeof window !== 'undefined' && (window as any).fbq) {
                      (window as any).fbq('track', 'Purchase', {
                        content_name: 'Janmastami Annadana Seva',
                        content_category: 'Donation',
                        value: 1000,
                        currency: 'INR',
                      })
                    }

                    setModalOpen(false)
                    setBlessings({
                      receiptNumber: donation.receiptNumber,
                      amount,
                      donorInfo: {
                        name: donorName,
                        email: donorEmail || undefined,
                        phone: values.phone.trim(),
                        pan: panNormalized,
                        address: donorAddress,
                      },
                    })
                    resolvePromise()
                  } catch (error: unknown) {
                    console.error('[DonateModal] verify failed', error)
                    rejectPromise(error instanceof Error ? error : new Error('verify failed'))
                  }
                })()
              },
              onFailure(reason: unknown) {
                rejectPromise(reason instanceof Error ? reason : new Error('payment dismissed'))
              },
            })
            .catch((error: unknown) => {
              rejectPromise(error instanceof Error ? error : new Error('checkout bootstrap failed'))
            })
        })
      } catch (error) {
        const message =
          error instanceof ApiHttpError
            ? error.message
            : error instanceof Error
              ? error.message
              : 'Something went wrong. Please try again.'
        console.error('[DonateModal] error', message, error)
        alert(message)
      } finally {
        setIsSubmitting(false)
      }
    },
    [donateAmount, razorpay],
  )

  return (
    <>
      <Helmet>
        <> {/* Meta Pixel Base Code */}
          <script>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_META_PIXEL_ID');
              fbq('track', 'PageView');
            `}
          </script>
          <noscript>{`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=YOUR_META_PIXEL_ID&ev=PageView&noscript=1" />`}</noscript>
        </>
        <title>Janmastami Annadana Seva · ISKCON Mangalore</title>
        <meta
          name="description"
          content="Support the sacred Annadana Seva this Janmastami with ₹1000 donation. Selected devotees get a chance to visit Vrindavan for free. Donate now and receive blessings."
        />
      </Helmet>

      {/* Background Banner Placeholder */}
      <HeroBanner
        title=""
        subtitle=""
        backgroundImage= { banner }
        height="large"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-4"
        >

        </motion.div>
      </HeroBanner>

      {/* Special Offer Highlight */}
      <section className="bg-gradient-to-r from-maroon via-peacock-900 to-maroon py-16 text-white">
        <Container size="lg" className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border-2 border-gold-400 bg-white/10 p-8 backdrop-blur-sm"
          >
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-gold-400/20 p-4">
                <Plane className="h-12 w-12 text-gold-200" />
              </div>
            </div>
            <h2 className="font-heading text-3xl font-bold text-gold-200 sm:text-4xl">
              Special Vrindavan Yatra Opportunity
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Selected donors from this Annadana Seva will receive a <span className="font-bold text-gold-200">FREE trip to Vrindavan</span> — 
              the sacred land where Lord Krishna performed His pastimes
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-gold-400/10 px-6 py-3 text-sm font-semibold text-gold-200">
              <Sparkles className="h-5 w-5" />
              Limited Time Offer
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Poster Placeholder */}
      {/*
      <section className="bg-cream py-16">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border-2 border-dashed border-gold-300 bg-white p-8 text-center"
          >
            <PlaceholderImage
              src="https://guptvrindavandham.org/media/landingpage/General_Temple_Donation_Banner_Desktop.webp"
              alt="Janmastami Annadana Seva Campaign Poster"
              aspectRatio="video"
              className="mx-auto max-w-2xl rounded-2xl"
            />
            <p className="mt-4 text-sm font-semibold text-peacock-600">Campaign Poster</p>
          </motion.div>
        </Container>
      </section>
      */}
      {/* Content in 4 Languages */}
      <section className="bg-white py-16">
        <Container size="lg">
          <SectionHeading
            alignment="center"
            title="About the Seva"
            subtitle="Serving through Annadana — the sacred tradition of food distribution"
            decorative
          />

          <div className="mt-12 space-y-8">
            {/* English */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border-l-4 border-maroon bg-maroon/5 p-6"
            >
              <h3 className="font-heading text-xl font-bold text-maroon">English</h3>
              <p className="mt-3 text-peacock-900/85 leading-relaxed">
                This Janmastami, participate in the sacred Annadana Seva by donating ₹1000. Your contribution will help 
                distribute prasadam to thousands of devotees during the divine appearance day of Lord Krishna. As a special blessing, 
                selected donors will receive an all-expenses-paid pilgrimage to Vrindavan, the holy land where Lord Krishna enacted 
                His childhood pastimes. This is your opportunity to serve the Lord and potentially receive the divine mercy of 
                visiting the most sacred dham in the world.
              </p>
            </motion.div>

            {/* Hindi */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border-l-4 border-saffron bg-saffron/5 p-6"
            >
              <h3 className="font-heading text-xl font-bold text-saffron">हिन्दी</h3>
              <p className="mt-3 text-peacock-900/85 leading-relaxed font-sanskrit">
                इस जन्माष्टमी, भगवान श्री कृष्ण के दिव्य अवतरण दिवस पर अन्नदान सेवा में भाग लें। ₹1000 का दान करके आप हजारों भक्तों को प्रसाद वितरण में मदद करेंगे। 
                विशेष आशीर्वाद के रूप में, चयनित दाताओं को वृंदावन की तीर्थयात्रा मिलेगी — वह पवित्र भूमि जहां भगवान कृष्ण ने अपने बाल लीलाएं कीं। 
                यह आपके लिए भगवान की सेवा करने और दुनिया के सबसे पवित्र धाम की दिव्य कृपा प्राप्त करने का अवसर है।
              </p>
            </motion.div>

            {/* Kannada */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border-l-4 border-peacock-700 bg-peacock-50 p-6"
            >
              <h3 className="font-heading text-xl font-bold text-peacock-700">ಕನ್ನಡ</h3>
              <p className="mt-3 text-peacock-900/85 leading-relaxed">
                ಈ ಜನ್ಮಾಷ್ಟಮಿಯಂದು, ಭಗವಾನ್ ಶ್ರೀ ಕೃಷ್ಣರ ದಿವ್ಯ ಅವತಾರ ದಿನದಂದು ಅನ್ನದಾನ ಸೇವೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿ. ₹1000 ದಾನ ಮಾಡುವ ಮೂಲಕ ನೀವು ಸಾವಿರಾರು ಭಕ್ತರಿಗೆ ಪ್ರಸಾದ ವಿತರಣೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತೀರಿ. 
                ವಿಶೇಷ ಆಶೀರ್ವಾದದ ರೂಪದಲ್ಲಿ, ಆಯ್ಕೆಯಾದ ದಾನಿಗಳಿಗೆ ವೃಂದಾವನ ತೀರ್ಥಯಾತ್ರೆ ನೀಡಲಾಗುತ್ತದೆ — ಆ ಪವಿತ್ರ ಭೂಮಿಯಲ್ಲಿ ಭಗವಾನ್ ಕೃಷ್ಣರು ತಮ್ಮ ಬಾಲ್ಯದ ಲೀಲೆಗಳನ್ನು ಆಡಿದರು. 
                ಇದು ನಿಮಗೆ ಭಗವಂತನ ಸೇವೆ ಮಾಡಲು ಮತ್ತು ಪ್ರಪಂಚದ ಅತ್ಯಂತ ಪವಿತ್ರ ಧಾಮದ ದಿವ್ಯ ಕೃಪೆಯನ್ನು ಪಡೆಯಲು ಅವಕಾಶವಾಗಿದೆ.
              </p>
            </motion.div>

            {/* Sanskrit */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border-l-4 border-gold-500 bg-gold-50 p-6"
            >
              <h3 className="font-heading text-xl font-bold text-gold-600">తెలుగు</h3>
              <p className="mt-3 text-peacock-900/85 leading-relaxed font-sanskrit">
                ఈ జన్మాష్టమి సందర్భంగా పవిత్రమైన **అన్నదాన సేవ**లో భాగస్వాములు కండి. కేవలం **₹1000 విరాళం** అందించి, శ్రీకృష్ణ భగవానుని అవతార మహోత్సవ సందర్భంగా వేలాది మంది భక్తులకు ప్రసాదం పంపిణీ చేసే ఈ దివ్య సేవలో పాలుపంచుకోండి.

                మీ భక్తిపూర్వక సహకారానికి ప్రత్యేక ఆశీర్వాదంగా, ఎంపిక చేయబడిన దాతలకు **వృందావన యాత్ర**ను పూర్తిగా ఉచితంగా (ప్రయాణం, వసతి మరియు ఇతర ఖర్చులతో సహా) అందజేయబడుతుంది. శ్రీకృష్ణుడు తన బాల్య లీలలను ఆవిష్కరించిన ఆ పవిత్ర ధామాన్ని దర్శించే ఈ అరుదైన అవకాశం మీకు లభించవచ్చు.

                ఇది భగవంతుని సేవ చేసే సువర్ణావకాశం మాత్రమే కాదు, ప్రపంచంలోనే అత్యంత పవిత్రమైన ధామమైన **శ్రీ వృందావన ధామం**ను దర్శించి శ్రీకృష్ణుని అపార కృపను పొందే దివ్య అవకాశం కూడా.

              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Donation CTA Section */}
      <section className="bg-gradient-to-br from-maroon via-peacock-950 to-maroon py-20 text-white">
        <Container size="lg" className="text-center">
          <SectionHeading
            alignment="center"
            title="Make Your Offering"
            subtitle="Your ₹1000 donation feeds devotees and opens the door to Vrindavan"
            decorative
            className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/85"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <Button
              variant="secondary"
              size="xl"
              onClick={handleOpenDonateModal}
              className="bg-gradient-to-r from-gold-400 via-saffron to-gold-400 hover:from-gold-400/90 hover:to-gold-400/90 text-maroon font-bold"
            >
              <Gift className="mr-2 h-6 w-6" />
              Donate ₹1000 for Annadana Seva
            </Button>
          </motion.div>
          <p className="mt-6 text-sm text-white/70">
            Secure payment via Razorpay · Tax benefits available (80G)
          </p>
        </Container>
      </section>

      {/* Trust Section */}
      <section className="bg-cream py-16">
        <Container size="xl">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: '🙏',
                title: 'Transparent Seva',
                description: 'Every rupee is accounted for and used for Annadana distribution during Janmastami',
              },
              {
                icon: '📜',
                title: 'Tax Exemption',
                description: 'Receive 80G tax receipt for your donation (PAN required)',
              },
              {
                icon: '✨',
                title: 'Divine Blessings',
                description: 'Your seva reaches the altar and brings blessings from Lord Krishna Balaram',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-maroon/20 bg-white p-6 text-center shadow-lg"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-4 font-heading text-xl font-bold text-maroon">{item.title}</h3>
                <p className="mt-2 text-peacock-900/80">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Donate Modal */}
      <DonateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        amount={donateAmount}
        sevaName="Janmastami Annadana Seva"
        sevaType="Special Campaign"
        onSubmit={handleModalSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Blessings Success Screen */}
      {blessings && (
        <BlessingsSuccessScreen
          amount={blessings.amount}
          receiptNumber={blessings.receiptNumber}
          campaignTitle="Janmastami Annadana Seva"
          donorInfo={blessings.donorInfo}
          onClose={() => setBlessings(null)}
        />
      )}
    </>
  )
}
