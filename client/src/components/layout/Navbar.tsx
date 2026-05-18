import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Heart, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { NAV_LINKS } from '@/constants/data'
import logo from '@/assets/logo.png'
import { useUiStore } from '@/store/uiStore'
import { cn } from '@/utils/cn'

export default function Navbar() {
  const navigate = useNavigate()
  const { isMobileMenuOpen, toggleMobileMenu } = useUiStore()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const listener = () => setIsScrolled(window.scrollY > 12)
    listener()
    window.addEventListener('scroll', listener, { passive: true })
    return () => window.removeEventListener('scroll', listener)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  function handleNavigate(href: string) {
    toggleMobileMenu(false)
    if (href.includes('#')) {
      const [pathname, fragment] = href.split('#')
      const targetPath = pathname || '/'
      navigate(targetPath)
      window.requestAnimationFrame(() => {
        const anchor = fragment ? document.getElementById(fragment) : undefined
        anchor?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }
    navigate(href)
  }

  const glass = isScrolled || isMobileMenuOpen

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-[90] w-full backdrop-blur transition-all duration-500',
          glass ? 'bg-white/85 shadow-lg shadow-peacock-950/15 ring-1 ring-peacock-900/10' : 'bg-transparent shadow-none ring-0',
        )}
      >
        <Container className="relative flex items-center justify-between gap-4 py-3 sm:py-4">
          <Link to="/" className="flex items-center gap-2.5 transition hover:opacity-90">
            <img src={logo} alt="Srila Prabhupada's ISKCON Mangalore" className="h-12 w-auto object-contain sm:h-14" />
            <span className="hidden border-l border-maroon/25 pl-2.5 font-heading text-[13px] font-semibold leading-tight tracking-wide text-maroon sm:block">
              Sri Krishna<br />Balaram Mandir
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map(({ href, label }) => {
              const isExternal = href.startsWith('http')
              if (isExternal) {
                return (
                  <a key={href} href={href} target="_blank" rel="noreferrer" className="relative px-3 py-2 text-sm font-semibold text-peacock-900 transition-colors hover:text-maroon-light">
                    {label}
                  </a>
                )
              }
              return (
                <NavLink key={href} to={href} end={href === '/'} className="relative px-3 py-2 text-sm font-semibold">
                  {({ isActive }) => (
                    <span
                      className={cn(
                        'relative pb-2 text-peacock-900 transition-colors',
                        isActive ? 'text-maroon-light' : 'hover:text-maroon-light',
                      )}
                    >
                      {label}
                      {isActive ? (
                        <motion.span
                          layoutId="desktop-nav-indicator"
                          className="absolute inset-x-2 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 shadow-sm"
                        />
                      ) : null}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/donate">
              <Button variant="secondary" size="md" className="shadow-lg" leftIcon={<Heart className="h-4 w-4 fill-current" aria-hidden />}>
                Donate
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex rounded-full bg-peacock-900/92 p-2 text-gold-300 shadow-lg ring-2 ring-white/40 backdrop-blur transition hover:bg-maroon lg:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => toggleMobileMenu()}
          >
            {isMobileMenuOpen ? <X className="size-7" aria-hidden /> : <Menu className="size-7" aria-hidden />}
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.button
            type="button"
            key="backdrop"
            className="fixed inset-0 z-[85] bg-peacock-950/70 backdrop-blur-sm lg:hidden"
            aria-label="Close overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleMobileMenu(false)}
          />
        ) : null}
        {isMobileMenuOpen ? (
          <motion.aside
            key="sheet"
            className="fixed inset-y-0 right-0 z-[95] w-[min(22rem,calc(100vw-56px))] bg-cream px-6 pb-10 pt-8 shadow-[0_54px_150px_-50px_rgba(0,0,0,0.55)] ring-2 ring-maroon/10 lg:hidden"
            initial={{ x: '105%' }}
            animate={{ x: 0 }}
            exit={{ x: '105%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 34 }}
          >
            <nav className="flex flex-col gap-3 overflow-y-auto" aria-label="Mobile primary">
              {NAV_LINKS.map(({ href, label }) => {
                const isExternal = href.startsWith('http')
                if (isExternal) {
                  return (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-maroon/10 bg-white/90 px-4 py-3 text-left font-semibold text-maroon shadow-sm hover:border-maroon/40 hover:text-maroon-light"
                      onClick={() => toggleMobileMenu(false)}
                    >
                      {label}
                      <ChevronRight className="h-5 w-5 text-peacock-700" aria-hidden />
                    </a>
                  )
                }
                return (
                  <button
                    key={href}
                    type="button"
                    className="flex items-center justify-between rounded-2xl border border-maroon/10 bg-white/90 px-4 py-3 text-left font-semibold text-maroon shadow-sm hover:border-maroon/40 hover:text-maroon-light"
                    onClick={() => handleNavigate(href)}
                  >
                    {label}
                    <ChevronRight className="h-5 w-5 text-peacock-700" aria-hidden />
                  </button>
                )
              })}
            </nav>

            <div className="mt-8 border-t border-dashed border-peacock-900/15 pt-6">
              <Button
                variant="secondary"
                size="lg"
                type="button"
                className="w-full shadow-lg"
                leftIcon={<Heart className="h-4 w-4 fill-current" aria-hidden />}
                onClick={() => {
                  toggleMobileMenu(false)
                  navigate('/donate')
                }}
              >
                Proceed to seva
              </Button>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  )
}
