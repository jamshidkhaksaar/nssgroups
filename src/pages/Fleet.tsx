import { Flame, Radar, Satellite, ShieldCheck } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import AnimatedNumber from '@/components/AnimatedNumber'
import { FLEET, FLEET_TOTAL } from '@/data/content'

const SAFETY: { icon: typeof Satellite; titleKey: TranslationKey; descKey: TranslationKey }[] = [
  { icon: Satellite, titleKey: 'fleet.sf1.title', descKey: 'fleet.sf1.desc' },
  { icon: Radar, titleKey: 'fleet.sf2.title', descKey: 'fleet.sf2.desc' },
  { icon: ShieldCheck, titleKey: 'fleet.sf3.title', descKey: 'fleet.sf3.desc' },
  { icon: Flame, titleKey: 'fleet.sf4.title', descKey: 'fleet.sf4.desc' },
]

export default function Fleet() {
  const { t } = useI18n()
  return (
    <main className="bg-[var(--bg)]">
      <PageHeader tagKey="fleet.tag" headingKey="fleet.heading" subKey="fleet.sub" />

      {/* ── total + capacity grid ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <Reveal className="flex flex-wrap items-end gap-6">
          <AnimatedNumber
            value={FLEET_TOTAL}
            suffix="+"
            className="nss-display text-7xl leading-none text-[rgb(var(--gold-rgb))] md:text-8xl"
          />
          <p className="nss-mono pb-2 text-[12px] tracking-[0.2em] text-[rgba(var(--text-rgb),0.55)] uppercase">
            {t('fleet.total')}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-[rgba(var(--gold-rgb),0.12)] bg-[rgba(var(--gold-rgb),0.12)] lg:grid-cols-4">
          {FLEET.map((f, i) => (
            <Reveal key={f.nameKey} delay={(i % 4) * 80}>
              <div className="flex h-full flex-col bg-[var(--bg)] p-6">
                <AnimatedNumber
                  value={f.count}
                  className="nss-display text-4xl text-[rgb(var(--gold-rgb))] md:text-5xl"
                />
                <p className="nss-mono mt-1 text-[10px] tracking-[0.2em] text-[rgba(var(--text-rgb),0.50)] uppercase">
                  {f.unit}
                </p>
                <h3 className="nss-display mt-4 text-base leading-snug">{t(f.nameKey)}</h3>
                <div className="nss-hairline my-3 w-10" />
                <p className="text-[13px] leading-relaxed text-[rgba(var(--text-rgb),0.50)]">
                  <span className="nss-mono text-[10px] tracking-[0.16em] text-[rgba(var(--gold-rgb),0.60)] uppercase">
                    {t('fleet.use')}:
                  </span>{' '}
                  {t(f.useKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <img
            src="./posters/12.jpg"
            alt={t('fleet.tag')}
            loading="lazy"
            className="nss-poster w-full"
          />
          <p className="nss-mono mt-3 text-[12px] tracking-[0.2em] text-[rgba(var(--text-rgb),0.50)] uppercase">
            {t('fleet.tag')} — NSS GROUPS
          </p>
        </Reveal>
      </section>

      {/* ── safety ── */}
      <section className="border-t border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <p className="nss-section-tag">{t('fleet.safetyTag')}</p>
            <h2 className="nss-h2 mt-4 text-3xl md:text-4xl">{t('fleet.safetyHeading')}</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SAFETY.map((s, i) => (
              <Reveal key={s.titleKey} delay={i * 90}>
                <div className="nss-card h-full p-6">
                  <s.icon size={22} className="text-[rgb(var(--gold-rgb))]" />
                  <h3 className="nss-display mt-5 text-lg">{t(s.titleKey)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[rgba(var(--text-rgb),0.55)]">
                    {t(s.descKey)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
