import { Link } from 'react-router'
import { ShoppingCart, FileText } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'

export default function TopHero() {
  const { t, dir } = useI18n()

  return (
    <section className="relative min-h-[85svh] flex items-center justify-center overflow-hidden bg-[var(--bg-deep)] py-20 text-[rgb(var(--text-rgb))] lg:min-h-[90svh] lg:py-24">

      {/* ── Realistic Uzbekistan <-> Afghanistan Trade Corridor Wallpaper ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Full-Color Realistic Trade Corridor Wallpaper (No heavy darkening overlay) */}
        <img
          src="./hero/nss-trade-corridor-wallpaper.jpg"
          alt="NSS Uzbekistan Afghanistan Trade Corridor"
          className={`absolute inset-0 h-full w-full object-cover object-center opacity-90 filter brightness-105 contrast-105 transition-opacity duration-700 ${dir === 'rtl' ? 'scale-x-[-1]' : ''}`}
        />

        {/* Subtle Edge Vignette Only — Center under text is clear */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(var(--bg-rgb),0.75)_100%)]" />

        {/* Top & Bottom border fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--bg-rgb),0.6)] via-transparent to-[var(--bg-deep)]" />
      </div>

      {/* ── Content layer with crisp text legibility ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[rgba(var(--gold-rgb),0.20)] bg-[rgba(var(--bg-rgb),0.45)] p-6 md:p-10 backdrop-blur-md shadow-2xl shadow-black/50">
          
          {/* Badge */}
          <p className="nss-mono mb-6 inline-flex items-center gap-2 border border-[rgba(var(--gold-rgb),0.45)] bg-[rgba(var(--bg-rgb),0.65)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[rgb(var(--gold-rgb))] backdrop-blur-lg rounded-full shadow-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--gold-rgb))] animate-pulse" />
            {t('topHero.badge')}
          </p>

          {/* Main Headline */}
          <h1 className="nss-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] tracking-tight text-[rgb(var(--hero-text-rgb))] max-w-3xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {t('topHero.h1a')}
            <br />
            <span className="bg-gradient-to-r from-[rgb(var(--gold-rgb))] via-[#f0d489] to-[rgb(var(--gold-rgb))] bg-clip-text text-transparent">
              {t('topHero.h1b')}
            </span>
          </h1>

          {/* Supporting description */}
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[rgba(var(--text-rgb),0.92)] md:text-lg font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {t('topHero.sub')}
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Primary — Bright Gold 3D */}
            <Link
              to="/marketplace"
              id="hero-explore-marketplace"
              className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl border-t border-[rgba(255,255,255,0.4)] bg-gradient-to-b from-[#f0d489] via-[#e8c268] to-[#c9a24b] px-8 py-4 text-[15px] font-extrabold text-[#110a20] shadow-[0_6px_0_#a68022,0_12px_24px_rgba(232,194,104,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_0_#a68022,0_16px_32px_rgba(232,194,104,0.4)] active:translate-y-[4px] active:shadow-[0_2px_0_#a68022,0_4px_8px_rgba(232,194,104,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
            >
              <ShoppingCart size={19} className="transition-transform group-hover:scale-110" />
              <span className="tracking-wide">{t('topHero.ctaPrimary')}</span>
            </Link>

            {/* Secondary — Deep Gold 3D */}
            <Link
              to="/booking"
              id="hero-request-procurement"
              className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl border-t border-[rgba(255,255,255,0.3)] bg-gradient-to-b from-[#dcb456] via-[#c9a24b] to-[#a68022] px-8 py-4 text-[15px] font-extrabold text-[#110a20] shadow-[0_6px_0_#755a15,0_12px_24px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_0_#755a15,0_16px_32px_rgba(0,0,0,0.5)] active:translate-y-[4px] active:shadow-[0_2px_0_#755a15,0_4px_8px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
            >
              <FileText size={19} className="transition-transform group-hover:scale-110" />
              <span className="tracking-wide">{t('topHero.ctaSecondary')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
