import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Heart, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { NAV_LINKS, type NavChild } from '@/constants/data'
import logo from '@/assets/logo.webp'
import { useUiStore } from '@/store/uiStore'
import { cn } from '@/utils/cn'

function DesktopSubMenu({ item, onClose }: { item: NavChild & { children: readonly { label: string; href: string }[] }; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  function enter() { clearTimeout(timeout.current); setOpen(true) }
  function leave() { timeout.current = setTimeout(() => setOpen(false), 150) }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-peacock-900 transition-colors hover:bg-peacock-50/60 hover:text-maroon-light"
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.12 }}
            className="absolute left-full top-0 z-50 min-w-[200px] rounded-xl border border-peacock-100 bg-white py-2 shadow-xl"
          >
            {item.children.map((sub) => (
              <NavLink
                key={sub.href}
                to={sub.href}
                onClick={() => { setOpen(false); onClose() }}
                className={({ isActive }) =>
                  cn(
                    'block px-4 py-2.5 text-sm font-medium transition-colors',
                    isActive ? 'bg-peacock-50 text-maroon' : 'text-peacock-900 hover:bg-peacock-50/60 hover:text-maroon-light',
                  )
                }
              >
                {sub.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DesktopDropdown({ label, children }: { label: string; children: readonly NavChild[] }) {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const location = useLocation()

  function allHrefs(items: readonly NavChild[]): string[] {
    return items.flatMap((c) => c.href ? [c.href] : c.children ? allHrefs(c.children) : [])
  }
  const isChildActive = allHrefs(children).some((h) => location.pathname === h)

  function enter() { clearTimeout(timeout.current); setOpen(true) }
  function leave() { timeout.current = setTimeout(() => setOpen(false), 150) }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        className="relative px-3 py-2 text-sm font-semibold"
        onClick={() => setOpen((v) => !v)}
        tabIndex={0}
      >
        <span className={cn('transition-colors', isChildActive ? 'text-maroon-light' : 'text-peacock-900 hover:text-maroon-light')}>
          <span className="relative pb-2">
            {label}
            {isChildActive && (
              <motion.span
                layoutId="desktop-nav-indicator"
                className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 shadow-sm"
              />
            )}
          </span>
          <ChevronDown className={cn('ml-0.5 inline h-3 w-3 align-middle transition-transform', open && 'rotate-180')} />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 min-w-[200px] rounded-xl border border-peacock-100 bg-white py-2 shadow-xl"
          >
            {children.map((child) => {
              if (child.children) {
                return <DesktopSubMenu key={child.label} item={child} onClose={() => setOpen(false)} />
              }
              return (
                <NavLink
                  key={child.href}
                  to={child.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block px-4 py-2.5 text-sm font-medium transition-colors',
                      isActive ? 'bg-peacock-50 text-maroon' : 'text-peacock-900 hover:bg-peacock-50/60 hover:text-maroon-light',
                    )
                  }
                >
                  {child.label}
                </NavLink>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const { isMobileMenuOpen, toggleMobileMenu } = useUiStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

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
            <img src={logo} alt="Srila Prabhupada's ISKCON Mangalore" className="h-14 w-auto object-contain scale-150 origin-left mr-8" />
            <span className="hidden border-l border-maroon/25 pl-2.5 font-heading text-[13px] font-semibold leading-tight tracking-wide text-maroon sm:block">
              Sri Krishna<br />Balaram Mandir
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:gap-2 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((item) => {
              if (item.children) {
                return <DesktopDropdown key={item.label} label={item.label} children={item.children} />
              }
              const isExternal = item.href.startsWith('http')
              if (isExternal) {
                return (
                  <a key={item.href} href={item.href} className="relative px-3 py-2 text-sm font-semibold text-peacock-900 transition-colors hover:text-maroon-light">
                    {item.label}
                  </a>
                )
              }
              return (
                <NavLink key={item.href} to={item.href} end={item.href === '/'} className="relative px-3 py-2 text-sm font-semibold">
                  {({ isActive }) => (
                    <span
                      className={cn(
                        'relative pb-2 text-peacock-900 transition-colors',
                        isActive ? 'text-maroon-light' : 'hover:text-maroon-light',
                      )}
                    >
                      {item.label}
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
              {NAV_LINKS.map((item) => {
                if (item.children) {
                  const isExpanded = mobileExpanded === item.label
                  return (
                    <div key={item.label}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-2xl border border-maroon/10 bg-white/90 px-4 py-3 text-left font-semibold text-maroon shadow-sm hover:border-maroon/40 hover:text-maroon-light"
                        onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown className={cn('h-5 w-5 text-peacock-700 transition-transform', isExpanded && 'rotate-180')} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-1 ml-4 flex flex-col gap-1">
                              {item.children.map((child) => {
                                if (child.children) {
                                  const isSubExpanded = mobileExpanded === `${item.label}/${child.label}`
                                  return (
                                    <div key={child.label}>
                                      <button
                                        type="button"
                                        className="flex w-full items-center justify-between rounded-xl border border-maroon/5 bg-white/70 px-4 py-2.5 text-left text-sm font-medium text-peacock-900 hover:bg-peacock-50 hover:text-maroon"
                                        onClick={() => setMobileExpanded(isSubExpanded ? item.label : `${item.label}/${child.label}`)}
                                      >
                                        {child.label}
                                        <ChevronDown className={cn('h-4 w-4 text-peacock-500 transition-transform', isSubExpanded && 'rotate-180')} aria-hidden />
                                      </button>
                                      <AnimatePresence>
                                        {isSubExpanded && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                          >
                                            <div className="mt-1 ml-4 flex flex-col gap-1">
                                              {child.children.map((sub) => (
                                                <button
                                                  key={sub.href}
                                                  type="button"
                                                  className="flex items-center justify-between rounded-xl border border-maroon/5 bg-white/60 px-4 py-2.5 text-left text-sm font-medium text-peacock-900 hover:bg-peacock-50 hover:text-maroon"
                                                  onClick={() => handleNavigate(sub.href)}
                                                >
                                                  {sub.label}
                                                  <ChevronRight className="h-4 w-4 text-peacock-500" aria-hidden />
                                                </button>
                                              ))}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  )
                                }
                                return (
                                  <button
                                    key={child.href}
                                    type="button"
                                    className="flex items-center justify-between rounded-xl border border-maroon/5 bg-white/70 px-4 py-2.5 text-left text-sm font-medium text-peacock-900 hover:bg-peacock-50 hover:text-maroon"
                                    onClick={() => handleNavigate(child.href)}
                                  >
                                    {child.label}
                                    <ChevronRight className="h-4 w-4 text-peacock-500" aria-hidden />
                                  </button>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }
                const isExternal = item.href.startsWith('http')
                if (isExternal) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl border border-maroon/10 bg-white/90 px-4 py-3 text-left font-semibold text-maroon shadow-sm hover:border-maroon/40 hover:text-maroon-light"
                      onClick={() => toggleMobileMenu(false)}
                    >
                      {item.label}
                      <ChevronRight className="h-5 w-5 text-peacock-700" aria-hidden />
                    </a>
                  )
                }
                return (
                  <button
                    key={item.href}
                    type="button"
                    className="flex items-center justify-between rounded-2xl border border-maroon/10 bg-white/90 px-4 py-3 text-left font-semibold text-maroon shadow-sm hover:border-maroon/40 hover:text-maroon-light"
                    onClick={() => handleNavigate(item.href)}
                  >
                    {item.label}
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
