import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu, Moon, Phone, Sun, X, Volume2, VolumeX } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import { useTheme } from '@/theme/theme'
import { useMusic } from '@/audio/useMusic'
import type { TranslationKey } from '@/i18n/translations/en'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { EMAIL_1, PHONE_1 } from '@/data/content'

interface NavItem {
  to: string
  key: TranslationKey
}

const PRIMARY_LINKS: NavItem[] = [
  { to: '/', key: 'nav.home' },
  { to: '/trading', key: 'nav.marketplace' },
  { to: '/services', key: 'nav.services' },
  { to: '/client-portal', key: 'nav.clientPortal' },
  { to: '/partner-portal', key: 'nav.partnerPortal' },
  { to: '/admin', key: 'nav.adminPortal' },
  { to: '/about', key: 'nav.company' },
  { to: '/contact', key: 'nav.contact' },
]

const ALL_MOBILE_LINKS: NavItem[] = [
  { to: '/', key: 'nav.home' },
  { to: '/client-portal', key: 'nav.clientPortal' },
  { to: '/partner-portal', key: 'nav.partnerPortal' },
  { to: '/admin', key: 'nav.adminPortal' },
  { to: '/trading', key: 'nav.marketplace' },
  { to: '/services', key: 'nav.services' },
  { to: '/booking', key: 'nav.booking' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/about', key: 'nav.about' },
  { to: '/fleet', key: 'nav.fleet' },
  { to: '/network', key: 'nav.network' },
  { to: '/tracking', key: 'nav.tracking' },
  { to: '/contact', key: 'nav.contact' },
]

export default function Navbar() {
  const { t } = useI18n()
  const { theme, toggle } = useTheme()
  const { isPlaying, toggleMusic } = useMusic()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const el = document.documentElement
      const p = el.scrollTop / (el.scrollHeight - el.clientHeight || 1)
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // ESC key handler to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* scroll progress bar */}
      <div dir="ltr" className="h-[2px] w-full bg-[rgba(var(--text-rgb),0.05)]">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-gradient-to-r from-[#c9a24b] to-[#e8c268]"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* main navbar bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled || open
            ? 'border-b border-[rgba(var(--gold-rgb),0.15)] bg-[rgba(var(--bg-rgb),0.95)] backdrop-blur-md shadow-lg shadow-black/10'
            : 'border-b border-[rgba(var(--gold-rgb),0.10)] bg-[rgba(var(--bg-rgb),0.85)] backdrop-blur-sm'
        }`}
      >
        <div
          className={`flex w-full items-center justify-between px-4 transition-all duration-300 md:px-6 xl:px-8 ${
            scrolled ? 'py-2' : 'py-2.5'
          }`}
        >
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center gap-8 xl:gap-16">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex shrink-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] rounded-sm"
            >
              <span
                className={`flex items-center justify-center transition-all duration-300 ${
                  scrolled ? 'h-[60px] w-[60px]' : 'h-[80px] w-[80px]'
                }`}
              >
                <img
                  src="./logo.png"
                  alt="NSS"
                  className={`object-contain transition-all duration-300 ${
                    scrolled ? 'h-[52px] w-[52px]' : 'h-[68px] w-[68px]'
                  }`}
                />
              </span>
              <span className="leading-tight flex flex-col justify-center">
                <span className="nss-display block text-base tracking-wide text-[rgb(var(--text-rgb))] group-hover:text-[rgb(var(--gold-rgb))] transition-colors">
                  NSS <span className="text-[rgb(var(--gold-rgb))]">GROUP</span>
                </span>
                <span className="nss-mono block text-[9px] tracking-[0.22em] text-[rgba(var(--text-rgb),0.45)] uppercase">
                  OF COMPANIES
                </span>
                <span className="nss-mono block text-[9px] font-bold tracking-[0.22em] text-[rgb(var(--gold-rgb))] uppercase mt-0.5">
                  NEW SAMIM SAMIR
                </span>
              </span>
            </Link>

            {/* Desktop Navigation — elegant links with animated underline */}
            <nav className="hidden items-center gap-2 lg:flex">
            {PRIMARY_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `group relative nss-mono px-3 py-2 text-[12.5px] uppercase tracking-[0.12em] rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] ${
                    isActive
                      ? 'text-[rgb(var(--gold-rgb))] font-semibold'
                      : 'text-[rgba(var(--text-rgb),0.75)] hover:text-[rgb(var(--gold-rgb))]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {t(item.key)}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-[rgb(var(--gold-rgb))] transition-all duration-300 ease-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            {/* Dark Mode toggle — compact icon only */}
            <button
              id="navbar-theme-toggle"
              onClick={toggle}
              aria-label={t('theme.toggle')}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(var(--gold-rgb),0.25)] bg-[rgba(var(--gold-rgb),0.06)] text-[rgba(var(--text-rgb),0.75)] transition-all hover:border-[rgba(var(--gold-rgb),0.50)] hover:text-[rgb(var(--gold-rgb))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
            >
              <span key={theme} className="nss-swap block">
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              </span>
            </button>

            {/* Music toggle — compact icon only */}
            <button
              onClick={toggleMusic}
              aria-label="Toggle Background Music"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(var(--gold-rgb),0.25)] bg-[rgba(var(--gold-rgb),0.06)] text-[rgba(var(--text-rgb),0.75)] transition-all hover:border-[rgba(var(--gold-rgb),0.50)] hover:text-[rgb(var(--gold-rgb))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
            >
              <span key={isPlaying ? 'playing' : 'paused'} className="nss-swap block">
                {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </span>
            </button>

            {/* Language Switcher — flag + code compact pill */}
            <LanguageSwitcher />

            {/* Login — text link */}
            <Link
              to="/login"
              className="nss-mono px-3 py-2 text-[12px] uppercase tracking-[0.12em] text-[rgba(var(--text-rgb),0.75)] transition-colors hover:text-[rgb(var(--text-rgb))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] rounded-sm"
            >
              {t('nav.login')}
            </Link>

            {/* Register — gold outlined button */}
            <Link
              to="/register"
              className="nss-mono rounded-md border border-[rgb(var(--gold-rgb))] px-4 py-2 text-[12px] uppercase tracking-[0.12em] font-semibold text-[rgb(var(--gold-rgb))] transition-all hover:bg-[rgba(var(--gold-rgb),0.12)] hover:shadow-md hover:shadow-[rgba(var(--gold-rgb),0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
            >
              {t('nav.register')}
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={toggle}
              aria-label={t('theme.toggle')}
              className="p-1.5 text-[rgba(var(--text-rgb),0.70)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] rounded-sm"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={toggleMusic}
              aria-label="Toggle Background Music"
              className="p-1.5 text-[rgba(var(--text-rgb),0.70)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] rounded-sm"
            >
              {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              id="navbar-mobile-menu-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t('nav.close') : t('nav.menu')}
              aria-expanded={open}
              className="p-1.5 text-[rgb(var(--text-rgb))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] rounded-sm"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Full Menu Overlay */}
        {open && (
          <div className="fixed inset-x-0 top-[100%] z-40 max-h-[calc(100vh-100%)] overflow-y-auto border-t border-[rgba(var(--gold-rgb),0.15)] bg-[rgba(var(--bg-rgb),0.97)] px-6 pb-10 pt-6 backdrop-blur-xl shadow-2xl lg:hidden">
            <div className="mx-auto max-w-md flex flex-col gap-1">
              {ALL_MOBILE_LINKS.map((l, i) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-lg px-3 py-3 transition-colors ${
                      isActive
                        ? 'bg-[rgba(var(--gold-rgb),0.12)] text-[rgb(var(--gold-rgb))]'
                        : 'text-[rgba(var(--text-rgb),0.85)] hover:bg-[rgba(var(--gold-rgb),0.06)] hover:text-[rgb(var(--text-rgb))]'
                    }`
                  }
                >
                  <div className="flex items-baseline gap-3">
                    <span className="nss-index text-xs opacity-50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="nss-display text-xl tracking-wide">{t(l.key)}</span>
                  </div>
                  <span className="nss-mono text-[10px] uppercase opacity-30 group-hover:opacity-90 transition-opacity">
                    →
                  </span>
                </NavLink>
              ))}

              <div className="mt-4 border-t border-[rgba(var(--gold-rgb),0.12)] pt-5 flex flex-col gap-3">
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="nss-btn-primary block w-full rounded-md py-3 text-center text-sm font-bold tracking-wide"
                >
                  {t('nav.register')}
                </Link>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="nss-mono block w-full rounded-md border border-[rgba(var(--gold-rgb),0.30)] py-3 text-center text-sm text-[rgba(var(--text-rgb),0.80)] hover:text-[rgb(var(--gold-rgb))] transition-colors"
                >
                  {t('nav.login')}
                </Link>

                <div className="mt-2 flex flex-col gap-2 rounded-lg bg-[rgba(var(--text-rgb),0.03)] p-4 border border-[rgba(var(--gold-rgb),0.10)]">
                  <a
                    href={`tel:${PHONE_1.replace(/\s/g, '')}`}
                    dir="ltr"
                    className="nss-mono flex items-center gap-2 text-[12px] text-[rgba(var(--text-rgb),0.70)] hover:text-[rgb(var(--gold-rgb))] transition-colors"
                  >
                    <Phone size={12} />
                    <span>{PHONE_1}</span>
                  </a>
                  <a
                    href={`mailto:${EMAIL_1}`}
                    className="nss-mono text-[12px] text-[rgba(var(--text-rgb),0.70)] hover:text-[rgb(var(--gold-rgb))] transition-colors"
                  >
                    {EMAIL_1}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
