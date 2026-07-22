import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu, Moon, Phone, Sun, X } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import { useTheme } from '@/theme/theme'
import type { TranslationKey } from '@/i18n/translations/en'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { EMAIL_1, PHONE_1 } from '@/data/content'

const LINKS: { to: string; key: TranslationKey }[] = [
  { to: '/', key: 'nav.home' },
  { to: '/about', key: 'nav.about' },
  { to: '/services', key: 'nav.services' },
  { to: '/fleet', key: 'nav.fleet' },
  { to: '/network', key: 'nav.network' },
  { to: '/contact', key: 'nav.contact' },
]

export default function Navbar() {
  const { t } = useI18n()
  const { theme, toggle } = useTheme()
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

  const closeMenu = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* scroll progress */}
      <div className="h-[2px] w-full bg-[rgba(var(--text-rgb),0.05)]">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-gradient-to-r from-[#c9a24b] to-[#e8c268]"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* utility bar — collapses on scroll */}
      <div
        className={`hidden overflow-hidden transition-all duration-500 md:block ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-2.5 md:px-12">
          <p className="nss-mono text-[11px] tracking-[0.22em] text-[rgba(var(--text-rgb),0.50)] uppercase">
            {t('footer.tagline')} · {t('hero.est')}
          </p>
          <div className="flex items-center gap-6">
            <span className="nss-mono text-[11px] tracking-[0.22em] text-[rgba(var(--gold-rgb),0.70)] uppercase">
              {t('contact.available')}
            </span>
            <a
              href={`tel:${PHONE_1.replace(/\s/g, '')}`}
              className="nss-mono flex items-center gap-1.5 text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.50)] transition-colors hover:text-[rgb(var(--gold-rgb))]"
            >
              <Phone size={10} />
              <span dir="ltr">{PHONE_1}</span>
            </a>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div
        className={`transition-colors duration-500 ${
          scrolled || open
            ? 'border-b border-[rgba(var(--gold-rgb),0.15)] bg-[rgba(var(--bg-rgb),0.85)] backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <Link to="/" className="group flex items-center gap-3">
            <span className="nss-logo-badge p-1.5" style={{ height: 52, width: 52 }}>
              <img src="./logo.png" alt="NSS" className="h-10 w-10 object-contain" />
            </span>
            <span className="leading-tight">
              <span className="nss-display block text-lg tracking-wide text-[rgb(var(--text-rgb))]">
                NSS <span className="text-[rgb(var(--gold-rgb))]">GROUPS</span>
              </span>
              <span className="nss-mono block text-[10px] tracking-[0.28em] text-[rgba(var(--text-rgb),0.50)]">
                {t('nav.brandSub')}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `nss-mono relative pb-1 text-[14px] uppercase tracking-[0.16em] transition-colors after:absolute after:bottom-0 after:start-0 after:h-px after:w-full after:origin-left after:bg-[#e8c268] after:transition-transform after:duration-300 ${
                    isActive
                      ? 'text-[rgb(var(--gold-rgb))] after:scale-x-100'
                      : 'text-[rgba(var(--text-rgb),0.60)] after:scale-x-0 hover:text-[rgb(var(--text-rgb))] hover:after:scale-x-100'
                  }`
                }
              >
                {t(l.key)}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher />
            <button
              onClick={toggle}
              aria-label={t('theme.toggle')}
              className="text-[rgba(var(--text-rgb),0.70)] transition-colors hover:text-[rgb(var(--gold-rgb))]"
            >
              <span key={theme} className="nss-swap block">
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </span>
            </button>
            <Link
              to="/contact"
              className="nss-btn-primary rounded-sm px-5 py-2.5 text-[14px] font-bold"
            >
              {t('nav.quote')}
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={toggle}
              aria-label={t('theme.toggle')}
              className="text-[rgba(var(--text-rgb),0.70)]"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t('nav.close') : t('nav.menu')}
              className="text-[rgb(var(--text-rgb))]"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        {open && (
          <nav className="border-t border-[rgba(var(--gold-rgb),0.10)] bg-[rgba(var(--bg-rgb),0.95)] px-6 pb-8 pt-4 backdrop-blur-md lg:hidden">
            <div className="flex flex-col gap-4">
              {LINKS.map((l, i) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-baseline gap-3 ${isActive ? 'text-[rgb(var(--gold-rgb))]' : 'text-[rgba(var(--text-rgb),0.80)]'}`
                  }
                >
                  <span className="nss-index">0{i + 1}</span>
                  <span className="nss-display text-2xl">{t(l.key)}</span>
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={closeMenu}
                className="nss-btn-primary mt-3 inline-block w-fit rounded-sm px-6 py-3 text-sm font-bold"
              >
                {t('nav.quote')}
              </Link>
              <div className="mt-4 border-t border-[rgba(var(--gold-rgb),0.10)] pt-4">
                <a
                  href={`tel:${PHONE_1.replace(/\s/g, '')}`}
                  dir="ltr"
                  className="nss-mono block text-[12px] text-[rgba(var(--text-rgb),0.55)]"
                >
                  {PHONE_1}
                </a>
                <a
                  href={`mailto:${EMAIL_1}`}
                  className="nss-mono mt-2 block text-[12px] text-[rgba(var(--text-rgb),0.55)]"
                >
                  {EMAIL_1}
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
