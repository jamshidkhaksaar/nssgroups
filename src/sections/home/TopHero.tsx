import { Link } from 'react-router'
import { ShoppingCart, FileText } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'

export default function TopHero() {
  const { t, dir } = useI18n()

  return (
    <section className="relative min-h-[520px] overflow-hidden bg-[var(--bg-deep)] pb-0 pt-20 text-[rgb(var(--text-rgb))] md:min-h-[580px] lg:min-h-[620px] lg:pt-24">

      {/* ── Full-bleed video background ── */}
      {/* Positioned so the visual focus sits on the right half of the frame */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{
            objectPosition: '65% center',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mixBlendMode: 'var(--hero-blend)' as any,
            opacity: 'var(--hero-opacity)'
          }}
        >
          <source src="./posters/Timeline 1.mp4" type="video/mp4" />
        </video>

        {/* Left/Right scrim — adapts to theme to ensure text readability */}
        <div className={`absolute inset-0 ${dir === 'rtl' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[rgba(var(--bg-rgb),0.85)] from-15% via-[rgba(var(--bg-rgb),0.50)] via-50% to-transparent to-90%`} />

        {/* Subtle ambient glow on the text side — adapts to theme gold */}
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_45%_65%_at_8%_50%,rgba(var(--gold-rgb),0.10)_0%,transparent_70%)] ${dir === 'rtl' ? 'scale-x-[-1]' : ''}`} />
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 w-full px-4 md:px-6">
        {/* Only the LEFT half is used for text — right half shows the video */}
        <div className="grid min-h-[460px] grid-cols-1 items-center lg:grid-cols-[1fr_1fr] lg:min-h-[540px]">

          {/* Left: Text Content */}
          <div className="flex flex-col justify-center pb-12 pt-6 lg:pb-20 lg:pt-8">

            {/* Main Headline */}
            <h1
              className="nss-display text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.1] tracking-tight text-[rgb(var(--hero-text-rgb))]"
            >
              {t('topHero.h1a')}
              <br />
              {t('topHero.h1b')}
            </h1>

            {/* Supporting description */}
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[rgba(var(--text-rgb),0.78)] md:text-[15px]">
              {t('topHero.sub')}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary — Bright Gold 3D */}
              <Link
                to="/trading"
                id="hero-explore-marketplace"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl border-t border-[rgba(255,255,255,0.4)] bg-gradient-to-b from-[#f0d489] via-[#e8c268] to-[#c9a24b] px-7 py-3.5 text-[14px] font-extrabold text-[#110a20] shadow-[0_6px_0_#a68022,0_12px_24px_rgba(232,194,104,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_0_#a68022,0_16px_32px_rgba(232,194,104,0.4)] active:translate-y-[4px] active:shadow-[0_2px_0_#a68022,0_4px_8px_rgba(232,194,104,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
              >
                <ShoppingCart size={18} className="transition-transform group-hover:scale-110" />
                <span className="tracking-wide">{t('topHero.ctaPrimary')}</span>
              </Link>

              {/* Secondary — Deep Gold 3D */}
              <Link
                to="/booking"
                id="hero-request-procurement"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl border-t border-[rgba(255,255,255,0.3)] bg-gradient-to-b from-[#dcb456] via-[#c9a24b] to-[#a68022] px-7 py-3.5 text-[14px] font-extrabold text-[#110a20] shadow-[0_6px_0_#755a15,0_12px_24px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_0_#755a15,0_16px_32px_rgba(0,0,0,0.5)] active:translate-y-[4px] active:shadow-[0_2px_0_#755a15,0_4px_8px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
              >
                <FileText size={18} className="transition-transform group-hover:scale-110" />
                <span className="tracking-wide">{t('topHero.ctaSecondary')}</span>
              </Link>
            </div>
          </div>

          {/* Right: empty — video fills behind */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
