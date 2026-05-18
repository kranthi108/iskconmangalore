import { HelmetProvider } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import FloatingParticles from '@/components/krishna/FloatingParticles'
import MantraMarquee from '@/components/krishna/MantraMarquee'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export default function MainLayout() {
  return (
    <HelmetProvider>
      <div className="relative min-h-screen bg-cream text-peacock-950">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <FloatingParticles />
        </div>

        <div className="relative z-[1] flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <MantraMarquee />
          <Footer />
        </div>
      </div>
    </HelmetProvider>
  )
}
