import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { FileText, Phone } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import { useTheme } from '@/theme/theme'
import { PHONE_1 } from '@/data/content'
import Reveal from '@/components/Reveal'
import { HeroEngine } from '@/hero/engine'

export default function CtaBand() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<HeroEngine | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const engine = new HeroEngine(canvas)
    engineRef.current = engine
    engine.setTheme(theme)
    return () => engine.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    engineRef.current?.setTheme(theme)
  }, [theme])

  return (
    <section className="relative overflow-hidden border-t border-[rgba(var(--gold-rgb),0.20)] bg-[var(--bg)] min-h-[440px] md:min-h-[500px] flex items-center justify-center">
      {/* Hero Canvas Animation Background */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />


      {/* Content Container — left side only */}
      <div className="relative z-20 w-full px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <div className="max-w-xl">
            <p className="nss-section-tag">{t('shared.divisions')}</p>
            <h2 className="nss-h2 mt-5 text-4xl sm:text-5xl md:text-6xl">
              {t('cta.heading')}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[rgba(var(--text-rgb),0.75)] md:text-base">
              {t('cta.sub')}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {/* Primary — Bright Gold 3D */}
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl border-t border-[rgba(255,255,255,0.4)] bg-gradient-to-b from-[#f0d489] via-[#e8c268] to-[#c9a24b] px-7 py-3.5 text-[14px] font-extrabold text-[#110a20] shadow-[0_6px_0_#a68022,0_12px_24px_rgba(232,194,104,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_0_#a68022,0_16px_32px_rgba(232,194,104,0.4)] active:translate-y-[4px] active:shadow-[0_2px_0_#a68022,0_4px_8px_rgba(232,194,104,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
              >
                <FileText size={18} className="transition-transform group-hover:scale-110" />
                <span className="tracking-wide">{t('cta.button')}</span>
              </Link>

              {/* Secondary — Deep Gold 3D */}
              <a
                href={`tel:${PHONE_1.replace(/\s/g, '')}`}
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl border-t border-[rgba(255,255,255,0.3)] bg-gradient-to-b from-[#dcb456] via-[#c9a24b] to-[#a68022] px-7 py-3.5 text-[14px] font-extrabold text-[#110a20] shadow-[0_6px_0_#755a15,0_12px_24px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_0_#755a15,0_16px_32px_rgba(0,0,0,0.5)] active:translate-y-[4px] active:shadow-[0_2px_0_#755a15,0_4px_8px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
              >
                <Phone size={18} className="transition-transform group-hover:scale-110" />
                <span className="tracking-wide">{t('cta.call')}</span>
                <span className="opacity-60">—</span>
                <span dir="ltr" className="nss-mono tracking-widest">{PHONE_1}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
