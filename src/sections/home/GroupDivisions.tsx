import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import type { ComponentType } from 'react'
import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'
import Reveal from '@/components/Reveal'

/* ── brand line-art icons (stroke = currentColor) ─────────── */

function TransitIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      {/* pantograph */}
      <path d="M24 12 L32 4 L40 12" />
      {/* body */}
      <rect x="14" y="12" width="36" height="30" rx="4" />
      {/* window */}
      <rect x="20" y="18" width="24" height="10" rx="2" />
      {/* headlight */}
      <circle cx="32" cy="35" r="2.5" />
      {/* wheels */}
      <circle cx="22" cy="46" r="3" />
      <circle cx="42" cy="46" r="3" />
      {/* rails */}
      <path d="M8 54 H56" />
      <path d="M13 59 H51" />
    </svg>
  )
}

function LogisticsIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      {/* container */}
      <rect x="10" y="24" width="32" height="20" rx="2" />
      <path d="M16 24 V44" />
      <path d="M22 24 V44" />
      <path d="M28 24 V44" />
      <path d="M34 24 V44" />
      {/* trade loop arrow */}
      <path d="M47 42 a13 13 0 1 1 3 -13" />
      <path d="M50 22 v7 h-7" />
      {/* ground */}
      <path d="M6 52 H58" />
    </svg>
  )
}

function ConstructionIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      {/* mast */}
      <path d="M22 56 V12" />
      {/* jib + counter-jib */}
      <path d="M6 16 H56" />
      {/* apex ties */}
      <path d="M22 6 L56 16" />
      <path d="M22 6 L6 16" />
      <path d="M22 12 V6" />
      {/* counterweight */}
      <path d="M6 16 v5 h6 v-5" />
      {/* hook line + hook */}
      <path d="M44 16 V30" />
      <path d="M44 30 c-4 0 -4 6 0 6 c4 0 4 -4 1.5 -5" />
      {/* base */}
      <path d="M14 56 H30" />
    </svg>
  )
}

/* ── section ──────────────────────────────────────────────── */

interface Division {
  index: string
  nameKey: TranslationKey
  lineKey: TranslationKey
  descKey: TranslationKey
  icon: ComponentType
}

const DIVISIONS: Division[] = [
  { index: '01', nameKey: 'group.d1.name', lineKey: 'group.d1.line', descKey: 'group.d1.desc', icon: TransitIcon },
  { index: '02', nameKey: 'group.d2.name', lineKey: 'group.d2.line', descKey: 'group.d2.desc', icon: LogisticsIcon },
  { index: '03', nameKey: 'group.d3.name', lineKey: 'group.d3.line', descKey: 'group.d3.desc', icon: ConstructionIcon },
]

export default function GroupDivisions() {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <Reveal>
        <p className="nss-section-tag">{t('group.tag')}</p>
        <h2 className="nss-h2 mt-4 max-w-3xl text-4xl md:text-5xl">{t('group.heading')}</h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[rgba(var(--text-rgb),0.60)] md:text-base">
          {t('group.sub')}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {DIVISIONS.map((d, i) => (
          <Reveal key={d.index} delay={i * 120}>
            <div className="nss-card group flex h-full flex-col p-7">
              <div className="flex items-start justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-sm border border-[rgba(var(--gold-rgb),0.30)] bg-[rgba(var(--gold-rgb),0.07)] p-3 text-[rgb(var(--gold-rgb))] transition-all duration-500 group-hover:border-[rgba(var(--gold-rgb),0.6)] group-hover:bg-[rgba(var(--gold-rgb),0.14)] group-hover:shadow-[0_0_24px_rgba(var(--gold-rgb),0.25)]">
                  <d.icon />
                </span>
                <div className="flex items-center gap-3">
                  <span className="nss-index">{d.index}</span>
                  <ArrowUpRight
                    size={16}
                    className="text-[rgba(var(--gold-rgb),0.4)] transition-colors group-hover:text-[rgb(var(--gold-rgb))]"
                  />
                </div>
              </div>
              <p className="nss-mono mt-8 text-[11px] tracking-[0.22em] text-[rgba(var(--gold-rgb),0.8)]">
                {t(d.lineKey)}
              </p>
              <h3 className="nss-display mt-2 text-2xl text-[rgb(var(--text-rgb))]">{t(d.nameKey)}</h3>
              <div className="nss-hairline my-5 w-full" />
              <p className="text-sm leading-relaxed text-[rgba(var(--text-rgb),0.60)]">{t(d.descKey)}</p>
              <Link
                to="/services"
                className="nss-mono mt-auto pt-6 text-[11px] tracking-[0.18em] text-[rgba(var(--gold-rgb),0.7)] uppercase transition-colors hover:text-[rgb(var(--gold-rgb))]"
              >
                {t('group.learnMore')} →
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
