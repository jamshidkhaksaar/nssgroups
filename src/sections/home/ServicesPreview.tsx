import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import type { ComponentType } from 'react'
import { useI18n } from '@/i18n/i18n'
import { CORE_SERVICES } from '@/data/content'
import Reveal from '@/components/Reveal'

/* ── brand line-art service icons (24×24, stroke = currentColor) ── */

const ic = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

function FreightIcon() {
  return (
    <svg viewBox="0 0 24 24" {...ic} className="h-full w-full">
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="3.5" ry="8.5" />
      <path d="M3.5 12 H20.5" />
      <path d="M5 6.5 C8 8.5 16 8.5 19 6.5" />
      <path d="M5 17.5 C8 15.5 16 15.5 19 17.5" />
    </svg>
  )
}

function RailIcon() {
  return (
    <svg viewBox="0 0 24 24" {...ic} className="h-full w-full">
      <rect x="3" y="6" width="18" height="9" rx="1.5" />
      <path d="M8 6 V15" />
      <path d="M13 6 V15" />
      <circle cx="8" cy="18" r="1.8" />
      <circle cx="16" cy="18" r="1.8" />
      <path d="M2.5 21.5 H21.5" />
    </svg>
  )
}

function FuelIcon() {
  return (
    <svg viewBox="0 0 24 24" {...ic} className="h-full w-full">
      <path d="M12 3 C12 3 6 10 6 14 a6 6 0 0 0 12 0 C18 10 12 3 12 3 Z" />
      <path d="M9.5 14 a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  )
}

function HumanitarianIcon() {
  return (
    <svg viewBox="0 0 24 24" {...ic} className="h-full w-full">
      <path d="M12 21 s-7.5 -4.5 -7.5 -9.5 a4.2 4.2 0 0 1 7.5 -2.6 a4.2 4.2 0 0 1 7.5 2.6 C19.5 16.5 12 21 12 21 Z" />
      <path d="M12 2.5 V6" />
      <path d="M10.2 4.2 H13.8" />
    </svg>
  )
}

function HeavyIcon() {
  return (
    <svg viewBox="0 0 24 24" {...ic} className="h-full w-full">
      <path d="M3 17 L9 8 L15 11" />
      <path d="M15 11 l2.5 4.5 c0.5 1 -0.5 2 -1.5 1.5 L13 15.5" />
      <rect x="3" y="17" width="9" height="4" rx="1.5" />
      <path d="M17 21 H21" />
    </svg>
  )
}

function UrbanIcon() {
  return (
    <svg viewBox="0 0 24 24" {...ic} className="h-full w-full">
      <rect x="2" y="8" width="11" height="7" rx="1" />
      <path d="M13 10 h4 l3 3 v2 h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
      <path d="M1 5 H6" />
      <path d="M2.5 2.5 H7" />
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" {...ic} className="h-full w-full">
      <circle cx="7.5" cy="7.5" r="4" />
      <path d="M10.5 10.5 L20 20" />
      <path d="M16.5 16.5 L19 14" />
      <path d="M19 19 L21 17" />
    </svg>
  )
}

const ICONS: ComponentType[] = [
  FreightIcon,
  RailIcon,
  FuelIcon,
  HumanitarianIcon,
  HeavyIcon,
  UrbanIcon,
  KeyIcon,
]

/* ── section ──────────────────────────────────────────────── */

export default function ServicesPreview() {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="nss-section-tag">{t('svcPrev.tag')}</p>
          <h2 className="nss-h2 mt-4 max-w-2xl text-4xl md:text-5xl">{t('svcPrev.heading')}</h2>
        </div>
        <Link
          to="/services"
          className="nss-btn-ghost rounded-sm px-6 py-3 text-[13px] font-semibold"
        >
          {t('svcPrev.link')} →
        </Link>
      </Reveal>

      {/* editorial service rows */}
      <div className="mt-14">
        {CORE_SERVICES.map((s, i) => {
          const Icon = ICONS[i]
          return (
            <Reveal key={s.nameKey} delay={i * 60}>
              <Link
                to="/services"
                className="group relative flex items-center gap-5 border-t border-[rgba(var(--gold-rgb),0.12)] px-2 py-6 transition-colors duration-300 last:border-b hover:bg-[rgba(var(--gold-rgb),0.05)] md:gap-8 md:px-4"
              >
                {/* gold accent bar */}
                <span className="absolute inset-y-0 start-0 w-[3px] origin-top scale-y-0 bg-[rgb(var(--gold-rgb))] transition-transform duration-400 group-hover:scale-y-100" />

                <span className="nss-display w-10 shrink-0 text-3xl text-[rgba(var(--gold-rgb),0.25)] transition-colors duration-300 group-hover:text-[rgba(var(--gold-rgb),0.7)] md:text-4xl">
                  0{i + 1}
                </span>

                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-[rgba(var(--gold-rgb),0.25)] p-2.5 text-[rgba(var(--gold-rgb),0.75)] transition-all duration-300 group-hover:border-[rgba(var(--gold-rgb),0.55)] group-hover:text-[rgb(var(--gold-rgb))] sm:flex">
                  <Icon />
                </span>

                <div className="grid flex-1 items-center gap-2 md:grid-cols-2 md:gap-8">
                  <h3 className="nss-display text-lg leading-snug text-[rgb(var(--text-rgb))] transition-colors duration-300 group-hover:text-[rgb(var(--gold-rgb))] md:text-2xl">
                    {t(s.nameKey)}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-[rgba(var(--text-rgb),0.55)] md:justify-self-end">
                    {t(s.descKey)}
                  </p>
                </div>

                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-[rgb(var(--gold-rgb))] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>
            </Reveal>
          )
        })}
      </div>

      {/* trading lines feature panel */}
      <Reveal className="mt-12">
        <Link
          to="/services"
          className="group flex flex-col justify-between gap-6 bg-gradient-to-br from-[#e8c268] to-[#c9a24b] p-7 transition-transform duration-500 hover:-translate-y-1 md:flex-row md:items-center md:p-10"
        >
          <div>
            <p className="nss-mono text-[11px] tracking-[0.2em] text-[#1d1233]/70">
              {t('services.tradingTag')}
            </p>
            <h3 className="nss-display mt-3 text-2xl text-[#1d1233] md:text-3xl">
              {t('services.tradingHeading')}
            </h3>
            <p className="nss-mono mt-3 text-[12px] tracking-[0.14em] text-[#1d1233]/70 uppercase">
              {t('services.vi.title')} · {t('services.lpg.title')} · {t('services.pvc.title')}
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#1d1233]/30 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#1d1233]">
            <ArrowUpRight size={22} className="text-[#1d1233]" />
          </span>
        </Link>
      </Reveal>
    </section>
  )
}
