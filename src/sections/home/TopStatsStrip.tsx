import { Globe, Award, Package, CheckCircle, Headphones } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import AnimatedNumber from '@/components/AnimatedNumber'
import Reveal from '@/components/Reveal'
import UzbekistanMap from '@/components/UzbekistanMap'
import type { TranslationKey } from '@/i18n/translations/en'

export default function TopStatsStrip() {
  const { t } = useI18n()

  const STATS = [
    { value: 10,    suffix: '+',  labelKey: 'topStats.exp',      icon: Award     },
    { value: 50000, suffix: '+',  labelKey: 'topStats.shipped',  icon: Package   },
    { value: 100,   suffix: '+',  labelKey: 'topStats.dest',     icon: Globe     },
    { value: 5000,  suffix: '+',  labelKey: 'topStats.projects', icon: CheckCircle },
    { value: 24,    suffix: '/7', labelKey: 'topStats.support',  icon: Headphones },
  ] as const

  return (
    <section className="border-t border-[rgba(var(--gold-rgb),0.10)] bg-[var(--bg-deep)] py-8">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* ── Left: 5 stats in a row ── */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-12">
            {STATS.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.labelKey} delay={i * 70}>
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[rgba(var(--gold-rgb),0.20)] bg-[rgba(var(--gold-rgb),0.07)] text-[rgb(var(--gold-rgb))]">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    {/* Value + label */}
                    <div className="flex flex-col text-start">
                      <AnimatedNumber
                        value={s.value}
                        suffix={s.suffix}
                        className="nss-display block text-2xl font-extrabold leading-none text-[rgb(var(--gold-rgb))] sm:text-3xl"
                      />
                      <span className="nss-mono mt-1 text-[10.5px] uppercase tracking-[0.12em] text-[rgba(var(--text-rgb),0.55)]">
                        {t(s.labelKey as TranslationKey)}
                      </span>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* ── Right: Regional trade text ── */}
          <Reveal delay={400}>
            <div className="flex items-center gap-6 mt-8 lg:mt-0">
              <div className="flex max-w-[280px] flex-col gap-1 border-s-2 border-[rgb(var(--gold-rgb))] ps-5">
                <span className="nss-display block text-[15px] font-bold text-[rgb(var(--text-rgb))]">
                  {t('topStats.regionalText').split('—')[0]?.trim()}
                </span>
                <span className="text-[12px] leading-relaxed text-[rgba(var(--text-rgb),0.55)]">
                  {t('topStats.regionalText').split('—')[1]?.trim()}
                </span>
              </div>
              <div className="flex h-16 w-16 shrink-0 text-[rgba(var(--gold-rgb),0.8)]">
                <UzbekistanMap className="h-full w-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
