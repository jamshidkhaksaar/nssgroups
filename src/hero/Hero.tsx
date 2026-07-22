import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { CHAPTERS, HeroEngine } from './engine'
import { useI18n } from '@/i18n/i18n'
import { useTheme } from '@/theme/theme'
import type { TranslationKey } from '@/i18n/translations/en'
import './hero.css'

const CHIPS: TranslationKey[] = ['trust.1', 'trust.2', 'trust.3', 'trust.4']

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<HeroEngine | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [chapter, setChapter] = useState(0)
  const { t } = useI18n()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const engine = new HeroEngine(canvas, { onChapter: setChapter })
    engine.onTick = (ci, ct) => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ct})`
      }
      // keep dots in sync even when jumpTo is used
      setChapter((prev) => (prev === ci ? prev : ci))
    }
    engineRef.current = engine
    engine.setTheme(theme)
    return () => engine.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // live theme switching — the engine crossfades dark ↔ sunny
  useEffect(() => {
    engineRef.current?.setTheme(theme)
  }, [theme])

  const ch = CHAPTERS[chapter]

  return (
    <section className="nss-hero relative h-svh w-full overflow-hidden bg-[var(--bg)]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* readability scrim over the canvas (below text, above canvas) */}
      <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-r from-[rgba(var(--bg-rgb),var(--scrim-strong))] via-[rgba(var(--bg-rgb),var(--scrim-soft))] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-40 bg-gradient-to-b from-[rgba(var(--bg-rgb),var(--scrim-top))] to-transparent" />

      {/* ── corridor readout (below global nav) ── */}
      <div
        className="nss-fade absolute end-6 top-28 z-20 hidden md:end-12 md:block"
        style={{ animationDelay: '1s' }}
      >
        <div className="nss-glass px-4 py-3">
          <div className="nss-mono text-[13px] text-[rgb(var(--gold-rgb))]">
            <span className="nss-live-dot me-2 inline-block h-1.5 w-1.5 rounded-full bg-[#e8c268] align-middle" />
            <span key={chapter} className="nss-swap inline-block">{ch.corridor}</span>
          </div>
          <div className="nss-mono mt-1.5 text-[13px] text-[rgba(var(--text-rgb),0.55)]">
            <span key={`c-${chapter}`} className="nss-swap inline-block">{ch.coord}</span>
            <span className="ms-3 text-[rgba(var(--text-rgb),0.55)]">{t('hero.est')}</span>
          </div>
        </div>
      </div>

      {/* ── main copy ── */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <div className="nss-reveal-mask mb-6">
              <p
                className="nss-reveal nss-mono flex items-center gap-3 text-[13px] text-[rgb(var(--gold-rgb))] md:text-[15px]"
                style={{ animationDelay: '0.25s' }}
              >
                <span className="inline-block h-px w-10 bg-[rgba(var(--gold-rgb),0.80)]" />
                {t('hero.kicker')}
              </p>
            </div>

            <h1 className="nss-display text-[13vw] leading-[0.96] sm:text-6xl md:text-7xl lg:text-[88px]">
              <span className="nss-reveal-mask">
                <span className="nss-reveal" style={{ animationDelay: '0.4s' }}>
                  {t('hero.h1a')}
                </span>
              </span>
              <span className="nss-reveal-mask">
                <span
                  className="nss-reveal bg-gradient-to-r from-[rgb(var(--gold-hi-rgb))] via-[rgb(var(--gold-rgb))] to-[rgb(var(--gold-deep-rgb))] bg-clip-text text-transparent"
                  style={{ animationDelay: '0.55s' }}
                >
                  {t('hero.h1b')}
                </span>
              </span>
            </h1>

            <div className="nss-reveal-mask mt-7 max-w-xl">
              <p
                className="nss-reveal border-s-2 border-[rgba(var(--gold-rgb),0.40)] ps-4 text-base leading-relaxed text-[rgba(var(--text-rgb),0.80)] md:text-lg"
                style={{ animationDelay: '0.75s' }}
              >
                {t('hero.sub')}
              </p>
            </div>

            <div className="nss-fade mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: '1.05s' }}>
              <Link to="/contact" className="nss-btn-primary rounded-sm px-8 py-4 text-base">
                {t('hero.ctaPrimary')}
              </Link>
              <Link to="/network" className="nss-btn-ghost rounded-sm px-8 py-4 text-base">
                {t('hero.ctaSecondary')}
              </Link>
            </div>

            <div className="nss-fade mt-8 flex flex-wrap gap-2" style={{ animationDelay: '1.25s' }}>
              {CHIPS.map((k) => (
                <span key={k} className="nss-chip">
                  {t(k)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── scroll indicator ── */}
      <div
        className="nss-fade absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        style={{ animationDelay: '1.6s' }}
      >
        <div className="nss-mouse">
          <span className="nss-mouse-wheel" />
        </div>
      </div>

      {/* ── bottom chrome ── */}
      <footer className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 md:px-12 md:pb-8">
        <div className="flex items-end justify-between gap-6">
          <div className="nss-fade hidden md:block" style={{ animationDelay: '1.2s' }}>
            <div className="nss-mono text-[13px] text-[rgba(var(--text-rgb),0.55)]">{t('hero.stats')}</div>
            <div className="nss-hairline mt-3 w-56" />
            <div className="nss-mono mt-2 text-[13px] text-[rgba(var(--text-rgb),0.55)]">{t('hero.scroll')}</div>
          </div>

          <div className="nss-fade ms-auto flex flex-col items-end gap-3" style={{ animationDelay: '1.25s' }}>
            <div className="flex items-baseline gap-3">
              <span className="nss-mono text-[13px] text-[rgba(var(--text-rgb),0.60)]">
                0{chapter + 1} / 04
              </span>
              <span
                key={chapter}
                className="nss-swap nss-display text-lg tracking-wide text-[rgb(var(--gold-rgb))] md:text-xl"
              >
                {ch.mode}
              </span>
            </div>
            <div className="h-[2px] w-44 overflow-hidden rounded-full bg-[rgba(var(--text-rgb),0.15)] md:w-56">
              <div
                ref={progressRef}
                className="h-full w-full origin-left bg-gradient-to-r from-[#c9a24b] to-[#e8c268]"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
            <div className="flex gap-2">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.mode}
                  aria-label={c.mode}
                  onClick={() => engineRef.current?.jumpTo(i)}
                  className={`nss-dot ${i === chapter ? 'nss-dot-active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── stacked blur fade into next section (above canvas, below text) ── */}
      <div className="nss-fade-stack absolute inset-x-0 bottom-0 z-[5] h-full">
        <div className="nss-fade-a" />
        <div className="nss-fade-b" />
        <div className="nss-fade-c" />
        <div className="nss-fade-color" />
      </div>
    </section>
  )
}
