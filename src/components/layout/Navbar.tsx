import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { Menu, Moon, Phone, Sun, X, Volume2, VolumeX, LogIn, ChevronDown, ShieldCheck, Building2, Handshake, SkipForward, Music, Truck, Globe, PackageCheck, Radar, FolderKanban } from 'lucide-react'
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
  { to: '/projects', key: 'nav.projects' },
  { to: '/fleet', key: 'nav.fleet' },
  { to: '/network', key: 'nav.network' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
]

const OPERATIONS_SUBMENU = [
  {
    to: '/booking',
    labelKey: 'nav.booking' as TranslationKey,
    icon: PackageCheck,
    desc: 'Book freight & logistics transport',
  },
  {
    to: '/tracking',
    labelKey: 'nav.tracking' as TranslationKey,
    icon: Radar,
    desc: 'Real-time cargo shipment tracking',
  },
  {
    to: '/projects',
    labelKey: 'nav.projects' as TranslationKey,
    icon: FolderKanban,
    desc: 'Project activity & field video reports',
  },
  {
    to: '/fleet',
    labelKey: 'nav.fleet' as TranslationKey,
    icon: Truck,
    desc: 'Transport fleet & heavy machinery',
  },
  {
    to: '/network',
    labelKey: 'nav.network' as TranslationKey,
    icon: Globe,
    desc: 'Trade corridors & regional hubs',
  },
]

const ALL_MOBILE_LINKS: NavItem[] = [
  { to: '/', key: 'nav.home' },
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

const PORTAL_OPTIONS = [
  {
    to: '/login/client',
    labelKey: 'nav.clientPortal' as TranslationKey,
    icon: Building2,
    accentClass: 'text-sky-400',
    badgeClass: 'bg-sky-500/10 border-sky-500/20',
    desc: 'Track shipments & place orders',
  },
  {
    to: '/login/partner',
    labelKey: 'nav.partnerPortal' as TranslationKey,
    icon: Handshake,
    accentClass: 'text-emerald-400',
    badgeClass: 'bg-emerald-500/10 border-emerald-500/20',
    desc: 'List services & earn XP rewards',
  },
  {
    to: '/login/admin',
    labelKey: 'nav.adminPortal' as TranslationKey,
    icon: ShieldCheck,
    accentClass: 'text-amber-400',
    badgeClass: 'bg-amber-500/10 border-amber-500/20',
    desc: 'NSS staff only · Restricted',
  },
]

export default function Navbar() {
  const { t } = useI18n()
  const { theme, toggle } = useTheme()
  const { isPlaying, toggleMusic, playlist, currentTrackIndex, currentTrack, nextTrack, selectTrack } = useMusic()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)
  const [opsOpen, setOpsOpen] = useState(false)

  const progressRef = useRef<HTMLDivElement>(null)
  const loginDropdownRef = useRef<HTMLDivElement>(null)
  const musicDropdownRef = useRef<HTMLDivElement>(null)
  const opsDropdownRef = useRef<HTMLDivElement>(null)

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

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(e.target as Node)) {
        setLoginOpen(false)
      }
      if (musicDropdownRef.current && !musicDropdownRef.current.contains(e.target as Node)) {
        setMusicOpen(false)
      }
      if (opsDropdownRef.current && !opsDropdownRef.current.contains(e.target as Node)) {
        setOpsOpen(false)
      }
    }
    if (loginOpen || musicOpen || opsOpen) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => document.removeEventListener('mousedown', handleClick)
  }, [loginOpen, musicOpen, opsOpen])

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (open) setOpen(false)
        if (loginOpen) setLoginOpen(false)
        if (musicOpen) setMusicOpen(false)
        if (opsOpen) setOpsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, loginOpen, musicOpen, opsOpen])

  const closeMenu = () => setOpen(false)

  const handlePortalNav = (to: string) => {
    setLoginOpen(false)
    setOpen(false)
    navigate(to)
  }

  const handleSubmenuNav = (to: string) => {
    setOpsOpen(false)
    setOpen(false)
    navigate(to)
  }

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
          <div className="flex items-center gap-6 xl:gap-10">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex shrink-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] rounded-sm"
            >
              <span
                className={`flex items-center justify-center transition-all duration-300 ${
                  scrolled ? 'h-[50px] w-[50px]' : 'h-[65px] w-[65px]'
                }`}
              >
                <img
                  src="./logo.png"
                  alt="NSS"
                  className={`object-contain transition-all duration-300 ${
                    scrolled ? 'h-[44px] w-[44px]' : 'h-[56px] w-[56px]'
                  }`}
                />
              </span>
              <span className="leading-tight flex flex-col justify-center">
                <span className="nss-display block text-base tracking-wide text-[rgb(var(--text-rgb))] group-hover:text-[rgb(var(--gold-rgb))] transition-colors">
                  NSS <span className="text-[rgb(var(--gold-rgb))]">GROUP</span>
                </span>
                <span className="nss-mono block text-[8.5px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.45)] uppercase">
                  INTERNATIONAL GROUP OF COMPANIES
                </span>
                <span className="nss-mono block text-[8.5px] font-bold tracking-[0.2em] text-[rgb(var(--gold-rgb))] uppercase mt-0.5">
                  NAWI SAMIM SAMIR
                </span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
              {PRIMARY_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `group relative nss-mono px-2.5 py-1.5 text-[11px] xl:text-[12px] uppercase tracking-[0.1em] rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] ${
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

              {/* Operations & Logistics Submenu Dropdown */}
              <div className="relative" ref={opsDropdownRef}>
                <button
                  onClick={() => setOpsOpen((v) => !v)}
                  className={`group relative flex items-center gap-1 nss-mono px-2.5 py-1.5 text-[11px] xl:text-[12px] uppercase tracking-[0.1em] rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] ${
                    opsOpen
                      ? 'text-[rgb(var(--gold-rgb))] font-semibold'
                      : 'text-[rgba(var(--text-rgb),0.75)] hover:text-[rgb(var(--gold-rgb))]'
                  }`}
                >
                  <span>{t('nav.operations')}</span>
                  <ChevronDown size={11} className={`transition-transform duration-200 ${opsOpen ? 'rotate-180 text-[rgb(var(--gold-rgb))]' : ''}`} />
                </button>

                {/* Operations Dropdown Panel */}
                {opsOpen && (
                  <div className="absolute start-0 top-[calc(100%+8px)] z-50 w-64 overflow-hidden rounded-xl border border-[rgba(var(--gold-rgb),0.18)] bg-[var(--bg-deep,var(--bg))] shadow-2xl shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="border-b border-[rgba(var(--gold-rgb),0.12)] px-4 py-2.5">
                      <p className="nss-mono text-[9.5px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.5)]">
                        Logistics & Submenus
                      </p>
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      {OPERATIONS_SUBMENU.map((item) => {
                        const Icon = item.icon
                        return (
                          <button
                            key={item.to}
                            onClick={() => handleSubmenuNav(item.to)}
                            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-start transition-colors hover:bg-[rgba(var(--gold-rgb),0.1)] active:bg-[rgba(var(--gold-rgb),0.15)]"
                          >
                            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[rgba(var(--gold-rgb),0.1)] text-[rgb(var(--gold-rgb))] group-hover:bg-[rgb(var(--gold-rgb))] group-hover:text-black transition-colors">
                              <Icon size={14} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-[rgb(var(--text-rgb))] group-hover:text-[rgb(var(--gold-rgb))] transition-colors">
                                {t(item.labelKey)}
                              </p>
                              <p className="text-[10px] text-[rgba(var(--text-rgb),0.45)] leading-tight truncate">
                                {item.desc}
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Dark Mode toggle */}
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

            {/* Music Player & Playlist Control */}
            <div className="relative" ref={musicDropdownRef}>
              <div className="flex items-center">
                <button
                  onClick={toggleMusic}
                  aria-label="Toggle Background Music"
                  title={isPlaying ? `Playing: ${currentTrack.title}` : 'Play Background Music'}
                  className={`flex h-8 items-center gap-1.5 rounded-l-full border px-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] ${
                    isPlaying
                      ? 'border-[rgb(var(--gold-rgb))] bg-[rgba(var(--gold-rgb),0.15)] text-[rgb(var(--gold-rgb))] shadow-sm shadow-[rgba(var(--gold-rgb),0.2)]'
                      : 'border-[rgba(var(--gold-rgb),0.25)] bg-[rgba(var(--gold-rgb),0.06)] text-[rgba(var(--text-rgb),0.75)] hover:border-[rgba(var(--gold-rgb),0.50)] hover:text-[rgb(var(--gold-rgb))]'
                  }`}
                >
                  <span key={isPlaying ? 'playing' : 'paused'} className="nss-swap block">
                    {isPlaying ? <Volume2 size={13} className="animate-pulse" /> : <VolumeX size={13} />}
                  </span>
                  <span className="nss-mono text-[10px] uppercase tracking-wider font-semibold max-w-[80px] truncate hidden xl:inline">
                    {isPlaying ? currentTrack.title.replace('Welcome to NSS Group', 'NSS Theme') : 'Music'}
                  </span>
                </button>

                <button
                  onClick={() => setMusicOpen((v) => !v)}
                  title="Playlist & Tracks (8 available)"
                  aria-label="Background Music Playlist"
                  className={`flex h-8 items-center justify-center rounded-r-full border-y border-r px-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] ${
                    musicOpen
                      ? 'border-[rgb(var(--gold-rgb))] bg-[rgba(var(--gold-rgb),0.2)] text-[rgb(var(--gold-rgb))]'
                      : 'border-[rgba(var(--gold-rgb),0.25)] bg-[rgba(var(--gold-rgb),0.06)] text-[rgba(var(--text-rgb),0.6)] hover:text-[rgb(var(--gold-rgb))]'
                  }`}
                >
                  <ChevronDown size={11} className={`transition-transform duration-200 ${musicOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Music Playlist Dropdown */}
              {musicOpen && (
                <div className="absolute end-0 top-[calc(100%+8px)] z-50 w-72 overflow-hidden rounded-xl border border-[rgba(var(--gold-rgb),0.18)] bg-[var(--bg-deep,var(--bg))] shadow-2xl shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.12)] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Music size={14} className="text-[rgb(var(--gold-rgb))]" />
                      <span className="nss-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--text-rgb))]">
                        Background Music ({playlist.length} Tracks)
                      </span>
                    </div>
                    <button
                      onClick={nextTrack}
                      title="Skip to Next Track"
                      className="flex h-6 w-6 items-center justify-center rounded-md bg-[rgba(var(--gold-rgb),0.1)] text-[rgb(var(--gold-rgb))] hover:bg-[rgba(var(--gold-rgb),0.2)] transition-colors"
                    >
                      <SkipForward size={12} />
                    </button>
                  </div>

                  <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
                    {playlist.map((track, idx) => {
                      const isActive = idx === currentTrackIndex
                      return (
                        <button
                          key={track.id}
                          onClick={() => selectTrack(idx)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-start transition-all ${
                            isActive
                              ? 'bg-[rgba(var(--gold-rgb),0.15)] text-[rgb(var(--gold-rgb))] font-semibold'
                              : 'text-[rgba(var(--text-rgb),0.75)] hover:bg-[rgba(var(--text-rgb),0.05)] hover:text-[rgb(var(--text-rgb))]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="nss-mono text-[10px] opacity-40">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="nss-mono text-xs truncate">{track.title}</span>
                          </div>
                          {isActive && isPlaying && (
                            <span className="flex h-2 w-2 rounded-full bg-[rgb(var(--gold-rgb))] animate-ping shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Portal Login Dropdown */}
            <div className="relative" ref={loginDropdownRef}>
              <button
                onClick={() => setLoginOpen((v) => !v)}
                className={`flex items-center gap-2 rounded-xl border px-3.5 py-1.5 nss-mono text-xs uppercase tracking-[0.14em] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268] ${
                  loginOpen
                    ? 'border-[rgb(var(--gold-rgb))] bg-[rgb(var(--gold-rgb))] text-[#1d1233] shadow-md shadow-[rgba(var(--gold-rgb),0.25)]'
                    : 'border-[rgba(var(--gold-rgb),0.35)] bg-[rgba(var(--gold-rgb),0.10)] text-[rgb(var(--gold-rgb))] hover:bg-[rgb(var(--gold-rgb))] hover:text-[#1d1233]'
                }`}
              >
                <LogIn size={14} />
                <span>{t('nav.login')}</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${loginOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Login Dropdown Panel */}
              {loginOpen && (
                <div className="absolute end-0 top-[calc(100%+8px)] z-50 w-72 overflow-hidden rounded-xl border border-[rgba(var(--gold-rgb),0.18)] bg-[var(--bg-deep,var(--bg))] shadow-2xl shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="border-b border-[rgba(var(--gold-rgb),0.12)] px-4 py-3">
                    <p className="nss-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.5)]">
                      Select your portal
                    </p>
                  </div>
                  <div className="p-2">
                    {PORTAL_OPTIONS.map((opt) => {
                      const Icon = opt.icon
                      return (
                        <button
                          key={opt.to}
                          onClick={() => handlePortalNav(opt.to)}
                          className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-start transition-colors hover:bg-[rgba(var(--text-rgb),0.05)] active:bg-[rgba(var(--text-rgb),0.08)]"
                        >
                          <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border ${opt.badgeClass}`}>
                            <Icon size={18} className={opt.accentClass} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-semibold ${opt.accentClass}`}>
                              {t(opt.labelKey)}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[rgba(var(--text-rgb),0.45)] leading-tight">
                              {opt.desc}
                            </p>
                          </div>
                          <span className="text-[rgba(var(--text-rgb),0.25)] transition-all group-hover:text-[rgba(var(--text-rgb),0.6)] group-hover:translate-x-0.5">
                            →
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
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

              {/* Mobile Portal Login Section */}
              <div className="mt-4 border-t border-[rgba(var(--gold-rgb),0.12)] pt-5">
                <p className="nss-mono mb-3 px-3 text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.4)]">
                  Portal Login
                </p>
                <div className="flex flex-col gap-2">
                  {PORTAL_OPTIONS.map((opt) => {
                    const Icon = opt.icon
                    return (
                      <button
                        key={opt.to}
                        onClick={() => handlePortalNav(opt.to)}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-start transition-colors hover:bg-[rgba(var(--text-rgb),0.05)]"
                      >
                        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border ${opt.badgeClass}`}>
                          <Icon size={18} className={opt.accentClass} />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${opt.accentClass}`}>
                            {t(opt.labelKey)}
                          </p>
                          <p className="text-[11px] text-[rgba(var(--text-rgb),0.45)]">
                            {opt.desc}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-4 border-t border-[rgba(var(--gold-rgb),0.12)] pt-5 flex flex-col gap-3">
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
