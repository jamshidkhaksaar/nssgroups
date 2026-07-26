import { Link } from 'react-router'
import { ShoppingCart, FileText } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'

export default function TopHero() {
  const { t, dir } = useI18n()

  return (
    <section className="relative min-h-[85svh] flex items-center justify-center overflow-hidden bg-[var(--bg-deep)] py-20 text-[rgb(var(--text-rgb))] lg:min-h-[90svh] lg:py-24">

      {/* ── Realistic Uzbekistan <-> Afghanistan Trade Corridor Wallpaper ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Realistic Trade Corridor Wallpaper */}
        <img
          src="./hero/nss-trade-corridor-wallpaper.jpg"
          alt="NSS Uzbekistan Afghanistan Trade Corridor"
          className={`absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-luminosity filter brightness-90 contrast-110 transition-opacity duration-700 ${dir === 'rtl' ? 'scale-x-[-1]' : ''}`}
        />

        {/* Ambient Overlay & Theme Scrim */}
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_40%,rgba(var(--bg-rgb),0.55)_0%,rgba(var(--bg-rgb),0.92)_70%,rgba(var(--bg-rgb),1)_100%)]`} />

        {/* Subtle geometric line pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--gold-rgb),0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--gold-rgb),0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        {/* Top & Bottom gradient fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-[rgba(var(--bg-rgb),0.4)]" />
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
        <div className="flex flex-col items-center justify-center">
          
          {/* Badge */}
          <p className="nss-mono mb-6 inline-flex items-center gap-2 border border-[rgba(var(--gold-rgb),0.35)] bg-[rgba(var(--gold-rgb),0.08)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[rgb(var(--gold-rgb))] backdrop-blur-md rounded-full shadow-lg shadow-black/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--gold-rgb))] animate-pulse" />
            {t('topHero.badge')}
          </p>

          {/* Main Headline */}
          <h1 className="nss-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] tracking-tight text-[rgb(var(--hero-text-rgb))] max-w-3xl drop-shadow-md">
            {t('topHero.h1a')}
            <br />
            <span className="bg-gradient-to-r from-[rgb(var(--gold-rgb))] via-[#f0d489] to-[rgb(var(--gold-rgb))] bg-clip-text text-transparent">
              {t('topHero.h1b')}
            </span>
          </h1>

          {/* Supporting description */}
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[rgba(var(--text-rgb),0.85)] md:text-lg drop-shadow-sm">
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
