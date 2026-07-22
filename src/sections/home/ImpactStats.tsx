import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'
import AnimatedNumber from '@/components/AnimatedNumber'
import FleetGrowthChart from '@/components/FleetGrowthChart'
import Reveal from '@/components/Reveal'

interface Stat {
  value: number
  suffix: string
  labelKey: TranslationKey
}

const STATS: Stat[] = [
  { value: 18, suffix: '+', labelKey: 'stats.years' },
  { value: 4900, suffix: '+', labelKey: 'stats.units' },
  { value: 11, suffix: '', labelKey: 'stats.countries' },
  { value: 34, suffix: '', labelKey: 'stats.provinces' },
]

export default function ImpactStats() {
  const { t } = useI18n()
  return (
    <section className="border-y border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* left — heading + counters */}
          <div>
            <Reveal>
              <p className="nss-section-tag">{t('stats.tag')}</p>
              <h2 className="nss-h2 mt-4 text-3xl md:text-5xl">{t('stats.heading')}</h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12">
              {STATS.map((s, i) => (
                <Reveal key={s.labelKey} delay={i * 100}>
                  <div>
                    <AnimatedNumber
                      value={s.value}
                      suffix={s.suffix}
                      className="nss-display block text-5xl text-[rgb(var(--gold-rgb))] md:text-6xl"
                    />
                    <div className="nss-hairline mt-4 w-16" />
                    <p className="nss-mono mt-3 text-[12px] tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)] uppercase">
                      {t(s.labelKey)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* right — animated growth chart */}
          <FleetGrowthChart />
        </div>
      </div>
    </section>
  )
}
