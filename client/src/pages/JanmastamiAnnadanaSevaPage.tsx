import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import DonateModal from '@/components/donations/DonateModal'
import banner from '@/assets/banners/janmastamiannadanaseva.png'
import quoteBg from '@/assets/prasadamdistibution.JPG'
import type { DonateModalFormValues } from '@/components/donations/DonateModal'
import BlessingsSuccessScreen from '@/components/donations/BlessingsSuccessScreen'
import type { DonorInfo } from '@/components/donations/BlessingsSuccessScreen'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { useRazorpay } from '@/hooks/useRazorpay'
import { createOrder, verifyPayment } from '@/services/donationService'
import { ApiHttpError } from '@/services/api'
import { HeartHandshake } from "lucide-react"
import { Building2 } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { trackLandingPageView, trackInitiateCheckout, trackPurchase, trackPaymentFailed } from '@/utils/metaPixel'

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
  const [quantity, setQuantity] = useState(1)
  const donateAmount = 1000 * quantity
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [blessings, setBlessings] = useState<{
    receiptNumber: string
    amount: number
    donorInfo: DonorInfo
  } | null>(null)

  // Track landing page view on mount
  useEffect(() => {
    trackLandingPageView('Janmastami Annadana Seva')
  }, [])

  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const handleOpenDonateModal = useCallback(() => {
    setModalOpen(true)
    // Track InitiateCheckout event
    trackInitiateCheckout(donateAmount, 'Janmastami Annadana Seva', 'annadana')
  }, [donateAmount, quantity])


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
              description: 'Special SKJ Annadana Seva',
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

                    // Track Purchase event on successful payment
                    trackPurchase(amount, 'Janmastami Annadana Seva', donation.receiptNumber, 'annadana')

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
                    // Track payment failure
                    trackPaymentFailed(amount, 'Janmastami Annadana Seva', error instanceof Error ? error.message : 'Unknown error')
                    rejectPromise(error instanceof Error ? error : new Error('verify failed'))
                  }
                })()
              },
              onFailure(reason: unknown) {
                // Track payment failure
                trackPaymentFailed(amount, 'Janmastami Annadana Seva', reason instanceof Error ? reason.message : 'Payment dismissed')
                rejectPromise(reason instanceof Error ? reason : new Error('payment dismissed'))
              },
            })
            .catch((error: unknown) => {
              // Track payment failure
              trackPaymentFailed(amount, 'Janmastami Annadana Seva', error instanceof Error ? error.message : 'Checkout bootstrap failed')
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
        // Track payment failure
        trackPaymentFailed(donateAmount, 'Janmastami Annadana Seva', message)
        alert(message)
      } finally {
        setIsSubmitting(false)
      }
    },
    [donateAmount, razorpay, quantity],
  )

  return (
    <>
      <Helmet>
        <title>Janmastami Annadana Seva · ISKCON Mangalore</title>
        <meta
          name="description"
          content="Support the sacred Annadana Seva this Janmastami. Selected devotees get a chance to visit Vrindavan for free. Donate now and receive blessings."
        />
        <style>{`
          .seva-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: nowrap;
          }
          @media (max-width: 640px) {
            .seva-row {
              gap: 0.25rem;
            }
          }
          .qty-btn {
            flex: 0 0 auto;
            height: 3rem;
            width: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            background: #FFF8E7;
            color: #6D071A;
            font-size: 1.5rem;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
            border: 2px solid #6D071A;
            cursor: pointer;
          }
          .qty-btn:hover:not(:disabled) {
            background: #FFE4B5;
            transform: translateY(-1px);
          }
          .qty-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          @media (max-width: 640px) {
            .qty-btn {
              height: 2.75rem;
              width: 2.75rem;
              font-size: 1.25rem;
            }
          }
          .seva-display-btn {
            flex: 1;
            min-width: 120px;
            max-width: 300px;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            border-radius: 0.5rem;
            background: #FFF8E7;
            padding: 0 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: 2px solid #6D071A;
            cursor: not-allowed;
            opacity: 0.85;
            white-space: nowrap;
          }
          @media (max-width: 640px) {
            .seva-display-btn {
              min-width: 100px;
              padding: 0 0.75rem;
              gap: 0.25rem;
            }
            .seva-display-amount {
              font-size: 1rem;
            }
            .seva-display-quantity {
              font-size: 1rem;
            }
          }
          .seva-display-amount {
            font-size: 1.25rem;
            font-weight: bold;
            color: #6D071A;
          }
          .seva-display-quantity {
            font-size: 1.25rem;
            font-weight: bold;
            color: #6D071A;
          }
        `}</style>
      </Helmet>

      {/* Background Banner - Custom for proper mobile fit */}
      <section className="relative w-full bg-white">
        <div className="relative w-full">
          <img
            src={banner}
            alt="Janmastami Annadana Seva Banner"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Special Offer Highlight */}
      <section className="bg-gradient-to-r from-maroon via-peacock-900 to-maroon py-16 text-white">
        <Container size="lg" className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border-2 border-gold-400/35"
          >
            <img
              src={quoteBg}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-peacock-900/80 via-maroon/75 to-peacock-800/80" />
            <div className="relative z-[1] p-8">
              <div className="mb-6 flex justify-center">

              </div>
              <h2 className="font-heading text-3xl font-bold text-gold-200 sm:text-4xl">
                Special Annadana Seva Opportunity
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Selected donors from this Annadana Seva will receive a <span className="font-bold text-gold-200">FREE trip to Vrindavan</span> —
                the sacred land where Lord Krishna performed His pastimes
              </p>
              <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="mt-12"
                        >
                          {/* Quantity Selector */}
                          <div className="seva-row mb-6">
                            <button
                              onClick={handleDecreaseQuantity}
                              disabled={quantity === 1}
                              className="qty-btn"
                            >
                              −
                            </button>
                            <button
                              disabled
                              className="seva-display-btn"
                            >
                              <span className="seva-display-amount">₹1,000</span>
                              <span className="seva-display-quantity">× {quantity}</span>
                            </button>
                            <button
                              onClick={handleIncreaseQuantity}
                              className="qty-btn"
                            >
                              +
                            </button>
                          </div>
                          <Button
                            variant="secondary"
                            size="xl"
                            onClick={handleOpenDonateModal}
                            className="bg-gradient-to-r from-gold-400 via-saffron to-gold-400 hover:from-gold-400/90 hover:to-gold-400/90 text-maroon font-bold"
                          >
                            <Gift className="mr-2 h-6 w-6" />
                            Donate ₹{donateAmount}
                          </Button>
                        </motion.div>
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
                ವಿಶೇಷ ಆಶೀರ್ವಾದದ ರೂಪದಲ್ಲಿ, ಆಯ್ಕೆಯಾದ ದಾನಿಗಳಿಗೆ ವೃಂದಾವನ ತೀರ್ಥಯಾತ್ರೆಗೆ ಹೋಗಲು ಅವಕಾಶ ಸಿಗಲಿದೆ. — ಆ ಪವಿತ್ರ ಭೂಮಿಯಲ್ಲಿ ಭಗವಾನ್ ಕೃಷ್ಣರು ತಮ್ಮ ಬಾಲ್ಯದ ಲೀಲೆಗಳನ್ನು ಆಡಿದರು.
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
                ఈ జన్మాష్టమి సందర్భంగా పవిత్రమైన అన్నదాన సేవలో భాగస్వాములు కండి. కేవలం ₹1000 విరాళం అందించి, శ్రీకృష్ణ భగవానుని అవతార మహోత్సవ సందర్భంగా వేలాది మంది భక్తులకు ప్రసాదం పంపిణీ చేసే ఈ దివ్య సేవలో పాలుపంచుకోండి.

                మీ భక్తిపూర్వక సహకారానికి ప్రత్యేక ఆశీర్వాదంగా, ఎంపిక చేయబడిన దాతలకు వృందావన యాత్రను పూర్తిగా ఉచితంగా (ప్రయాణం, వసతి మరియు ఇతర ఖర్చులతో సహా) అందజేయబడుతుంది. శ్రీకృష్ణుడు తన బాల్య లీలలను ఆవిష్కరించిన ఆ పవిత్ర ధామాన్ని దర్శించే ఈ అరుదైన అవకాశం మీకు లభించవచ్చు.

                ఇది భగవంతుని సేవ చేసే సువర్ణావకాశం మాత్రమే కాదు, ప్రపంచంలోనే అత్యంత పవిత్రమైన ధామమైన శ్రీ వృందావన ధామంను దర్శించి శ్రీకృష్ణుని అపార కృపను పొందే దివ్య అవకాశం కూడా.

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
            subtitle="Your donation feeds devotees and opens the door to Vrindavan"
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
            {/* Quantity Selector */}
            <div className="seva-row mb-6">
              <button
                onClick={handleDecreaseQuantity}
                disabled={quantity === 1}
                className="qty-btn"
              >
                −
              </button>
              <button
                disabled
                className="seva-display-btn"
              >
                <span className="seva-display-amount">₹1,000</span>
                <span className="seva-display-quantity">× {quantity}</span>
              </button>
              <button
                onClick={handleIncreaseQuantity}
                className="qty-btn"
              >
                +
              </button>
            </div>
            <Button
              variant="secondary"
              size="xl"
              onClick={handleOpenDonateModal}
              className="bg-gradient-to-r from-gold-400 via-saffron to-gold-400 hover:from-gold-400/90 hover:to-gold-400/90 text-maroon font-bold"
            >
              <Gift className="mr-2 h-6 w-6" />
              Donate Now
            </Button>
          </motion.div>
          <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
                    >
                      <Button
                        variant="secondary"
                        size="xl"
                        onClick={() => navigate('/donate')}
                        className="bg-gradient-to-r from-gold-400 via-saffron to-gold-400 hover:from-gold-400/90 hover:to-gold-400/90 text-maroon font-bold"
                      >
                        <HeartHandshake className="mr-2 h-6 w-6" />
                        Explore other Seva Opportunities
                      </Button>
                      <Button
                                              variant="secondary"
                                              size="xl"
                                              onClick={() => window.location.href = "https://projects.iskconmangalore.org"}
                                              className="bg-gradient-to-r from-gold-400 via-saffron to-gold-400 hover:from-gold-400/90 hover:to-gold-400/90 text-maroon font-bold"
                                            >
                                              <Building2 className="mr-2 h-6 w-6" />
                                              Know more about our projects
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
