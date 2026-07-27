import { Suspense, lazy, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const HomePage = lazy(() => import('@/pages/HomePage'))
const DonatePage = lazy(() => import('@/pages/DonatePage'))
const FestivalsPage = lazy(() => import('@/pages/FestivalsPage'))
const FestivalDetailPage = lazy(() => import('@/pages/FestivalDetailPage'))
const GalleryPage = lazy(() => import('@/pages/GalleryPage'))
const LiveDarshanPage = lazy(() => import('@/pages/LiveDarshanPage'))
const ResourcesPage = lazy(() => import('@/pages/ResourcesPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const HarinamPage = lazy(() => import('@/pages/HarinamPage'))
const MarathonJapaPage = lazy(() => import('@/pages/MarathonJapaPage'))
const OurAcharyaPage = lazy(() => import('@/pages/OurAcharyaPage'))
const OurSampradayaPage = lazy(() => import('@/pages/OurSampradayaPage'))
const ManagementCouncilPage = lazy(() => import('@/pages/ManagementCouncilPage'))
const BhagavadGitaPage = lazy(() => import('@/pages/BhagavadGitaPage'))
const BhagavatamPage = lazy(() => import('@/pages/BhagavatamPage'))
const EkadasiPage = lazy(() => import('@/pages/EkadasiPage'))
const EkadasiDetailPage = lazy(() => import('@/pages/EkadasiDetailPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const PanihatiRecipePage = lazy(() => import('@/pages/blog/PanihatiRecipePage'))
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'))
const TermsAndConditionsPage = lazy(() => import('@/pages/TermsAndConditionsPage'))
const RefundPolicyPage = lazy(() => import('@/pages/RefundPolicyPage'))
const JanmastamiAnnadanaSevaPage = lazy(() => import('@/pages/JanmastamiAnnadanaSevaPage'))

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-peacock-950/5 text-maroon">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-maroon border-t-transparent" aria-hidden />
      <p className="font-heading text-xl text-maroon">Hare Krishna…</p>
    </div>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/donate/:slug" element={<DonatePage />} />
              <Route path="/festivals" element={<FestivalsPage />} />
              <Route path="/festivals/:slug" element={<FestivalDetailPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/live-darshan" element={<LiveDarshanPage />} />
              <Route path="/harinam" element={<HarinamPage />} />
              <Route path="/marathon-japa" element={<MarathonJapaPage />} />
              <Route path="/our-acharya" element={<OurAcharyaPage />} />
              <Route path="/our-sampradaya" element={<OurSampradayaPage />} />
              <Route path="/management-council" element={<ManagementCouncilPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/bhagavad-gita-as-it-is" element={<BhagavadGitaPage />} />
              <Route path="/resources/bhagavatam" element={<BhagavatamPage />} />
              <Route path="/resources/ekadasi" element={<EkadasiPage />} />
              <Route path="/resources/ekadasi/:slug" element={<EkadasiDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog/panihati-chida-dahi-recipe" element={<PanihatiRecipePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/janmastami-annadana-seva" element={<JanmastamiAnnadanaSevaPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
