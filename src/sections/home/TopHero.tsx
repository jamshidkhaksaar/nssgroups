import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Search, ShoppingCart, FileText, ArrowRight } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'

const WALLPAPERS = [
  {
    src: './hero/nss-products-marketplace-wallpaper.webp',
    alt: 'NSS Global Product Catalog & Commodities',
  },
  {
    src: './hero/nss-trade-corridor-wallpaper.webp',
    alt: 'NSS Uzbekistan Afghanistan Trade Corridor',
  },
] as const

export default function TopHero() {
  const { t, dir } = useI18n()
  const navigate = useNavigate()
  const [activeWallpaper, setActiveWallpaper] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const timer = window.setInterval(() => {
      setActiveWallpaper((curr) => (curr + 1) % WALLPAPERS.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(searchQuery.trim())}#catalog-search`)
    } else {
      navigate('/marketplace#catalog-search')
    }
  }

  return (
    <section className="relative min-h-[85svh] flex flex-col justify-between overflow-hidden bg-[var(--bg-deep)] pb-12 pt-24 text-[rgb(var(--text-rgb))] lg:min-h-[90svh] lg:pt-28">

      {/* ── Realistic Full-Color Wallpapers (Auto-Rotating Marketplace & Trade Corridor) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {WALLPAPERS.map((wp, index) => (
          <img
            key={wp.src}
            src={wp.src}
            alt={wp.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'low'}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover object-center filter brightness-105 contrast-105 transition-opacity duration-1000 motion-reduce:transition-none ${
              activeWallpaper === index ? 'opacity-95' : 'opacity-0'
            } ${dir === 'rtl' ? 'scale-x-[-1]' : ''}`}
          />
        ))}

        {/* Minimal Edge Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(var(--bg-rgb),0.65)_100%)]" />

        {/* Top & Bottom edge fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--bg-rgb),0.75)] via-transparent to-[rgba(var(--bg-rgb),0.85)]" />
      </div>

      {/* ── Top Section: Compact Text Block at Top ── */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
        <div className="flex flex-col items-center justify-center">
          
          {/* Compact Top Badge */}
          <p className="nss-mono mb-3 inline-flex items-center gap-2 border border-[rgba(var(--gold-rgb),0.4)] bg-[rgba(var(--bg-rgb),0.75)] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[rgb(var(--gold-rgb))] backdrop-blur-md rounded-full shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--gold-rgb))] animate-pulse" />
            {t('topHero.badge')}
          </p>

          {/* Compact Headline */}
          <h1 className="nss-display text-[clamp(1.75rem,3.6vw,2.8rem)] font-extrabold leading-[1.15] tracking-tight text-[rgb(var(--hero-text-rgb))] max-w-2xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            {t('topHero.h1a')}{' '}
            <span className="bg-gradient-to-r from-[rgb(var(--gold-rgb))] via-[#f0d489] to-[rgb(var(--gold-rgb))] bg-clip-text text-transparent">
              {t('topHero.h1b')}
            </span>
          </h1>

          {/* Compact Subtitle */}
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-[rgba(var(--text-rgb),0.92)] md:text-sm font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            {t('topHero.sub')}
          </p>
        </div>
      </div>

      {/* ── Center Section: Big Interactive Search Bar ── */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-2xl px-4 pt-6">
        <form
          onSubmit={handleSearchSubmit}
          className="group relative flex flex-col sm:flex-row items-center gap-2 rounded-2xl border-2 border-[rgba(var(--gold-rgb),0.55)] bg-[rgba(var(--bg-rgb),0.85)] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all hover:border-[rgb(var(--gold-rgb))] focus-within:border-[rgb(var(--gold-rgb))] focus-within:ring-4 focus-within:ring-[rgba(var(--gold-rgb),0.25)]"
        >
          <div className="flex flex-1 items-center gap-3 ps-3 w-full">
            <Search className="h-6 w-6 text-[rgb(var(--gold-rgb))] shrink-0" strokeWidth={2.4} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('marketplace.searchPlaceholder') || 'Search products, LPG, PVC, machinery, cargo...'}
              className="w-full bg-transparent py-2.5 text-sm md:text-base font-medium text-[rgb(var(--text-rgb))] placeholder-[rgba(var(--text-rgb),0.5)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f0d489] via-[#e8c268] to-[#c9a24b] px-6 py-3.5 text-sm font-extrabold text-[#110a20] shadow-[0_4px_14px_rgba(232,194,104,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,194,104,0.6)] active:translate-y-0 shrink-0"
          >
            <span>{t('topHero.searchMarketplace') || 'Search Catalog'}</span>
            <ArrowRight size={16} className={`${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </button>
        </form>

        {/* Quick Tag Shortcuts */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-[rgba(var(--text-rgb),0.85)]">
          <span className="nss-mono uppercase opacity-60">Popular:</span>
          <button onClick={() => navigate('/marketplace?q=LPG#catalog-search')} className="rounded-full border border-[rgba(var(--gold-rgb),0.3)] bg-[rgba(var(--bg-rgb),0.65)] px-2.5 py-0.5 hover:border-[rgb(var(--gold-rgb))] hover:text-[rgb(var(--gold-rgb))] backdrop-blur-sm transition-colors">LPG Gas</button>
          <button onClick={() => navigate('/marketplace?q=PVC#catalog-search')} className="rounded-full border border-[rgba(var(--gold-rgb),0.3)] bg-[rgba(var(--bg-rgb),0.65)] px-2.5 py-0.5 hover:border-[rgb(var(--gold-rgb))] hover:text-[rgb(var(--gold-rgb))] backdrop-blur-sm transition-colors">PVC Pipes</button>
          <button onClick={() => navigate('/marketplace?q=Machinery#catalog-search')} className="rounded-full border border-[rgba(var(--gold-rgb),0.3)] bg-[rgba(var(--bg-rgb),0.65)] px-2.5 py-0.5 hover:border-[rgb(var(--gold-rgb))] hover:text-[rgb(var(--gold-rgb))] backdrop-blur-sm transition-colors">Machinery</button>
          <button onClick={() => navigate('/marketplace?q=Wheat#catalog-search')} className="rounded-full border border-[rgba(var(--gold-rgb),0.3)] bg-[rgba(var(--bg-rgb),0.65)] px-2.5 py-0.5 hover:border-[rgb(var(--gold-rgb))] hover:text-[rgb(var(--gold-rgb))] backdrop-blur-sm transition-colors">Agricultural Sacks</button>
        </div>
      </div>

      {/* ── Bottom Section: Secondary Action Links & Wallpaper Switcher ── */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pt-6 text-center flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <Link
            to="/marketplace"
            id="hero-explore-marketplace"
            className="group inline-flex items-center gap-2 rounded-xl border border-[rgba(var(--gold-rgb),0.35)] bg-[rgba(var(--bg-rgb),0.70)] px-5 py-2.5 text-xs md:text-sm font-bold text-[rgb(var(--gold-rgb))] backdrop-blur-md shadow-md transition-all hover:bg-[rgb(var(--gold-rgb))] hover:text-[#110a20]"
          >
            <ShoppingCart size={15} />
            <span>{t('topHero.ctaPrimary')}</span>
          </Link>

          <Link
            to="/booking"
            id="hero-request-procurement"
            className="group inline-flex items-center gap-2 rounded-xl border border-[rgba(var(--gold-rgb),0.35)] bg-[rgba(var(--bg-rgb),0.70)] px-5 py-2.5 text-xs md:text-sm font-bold text-[rgb(var(--text-rgb))] backdrop-blur-md shadow-md transition-all hover:bg-[rgba(var(--gold-rgb),0.2)] hover:text-[rgb(var(--gold-rgb))]"
          >
            <FileText size={15} />
            <span>{t('topHero.ctaSecondary')}</span>
          </Link>
        </div>

        {/* Wallpaper Switcher Dots */}
        <div className="flex items-center gap-2" role="group">
          {WALLPAPERS.map((wp, index) => (
            <button
              key={wp.src}
              type="button"
              aria-label={wp.alt}
              aria-pressed={activeWallpaper === index}
              onClick={() => setActiveWallpaper(index)}
              className={`h-2 rounded-full border border-[rgba(var(--gold-rgb),0.65)] transition-all focus-visible:outline-none ${
                activeWallpaper === index
                  ? 'w-7 bg-[#e8c268]'
                  : 'w-2 bg-[rgba(var(--bg-rgb),0.6)] hover:bg-[rgba(var(--gold-rgb),0.5)]'
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  )
}
