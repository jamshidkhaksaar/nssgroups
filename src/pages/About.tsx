import { BadgeCheck, Eye, Scale, ShieldCheck, Target } from 'lucide-react'
import type { ComponentType } from 'react'
import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'

interface Milestone {
  yearKey: TranslationKey
  titleKey: TranslationKey
  descKey: TranslationKey
}

const TIMELINE: Milestone[] = [
  { yearKey: 'about.tl1.year', titleKey: 'about.tl1.title', descKey: 'about.tl1.desc' },
  { yearKey: 'about.tl2.year', titleKey: 'about.tl2.title', descKey: 'about.tl2.desc' },
  { yearKey: 'about.tl3.year', titleKey: 'about.tl3.title', descKey: 'about.tl3.desc' },
  { yearKey: 'about.tl4.year', titleKey: 'about.tl4.title', descKey: 'about.tl4.desc' },
  { yearKey: 'about.tl5.year', titleKey: 'about.tl5.title', descKey: 'about.tl5.desc' },
  { yearKey: 'about.tl6.year', titleKey: 'about.tl6.title', descKey: 'about.tl6.desc' },
]

const CREDS: TranslationKey[] = [
  'cred.license',
  'cred.reg',
  'cred.tin',
  'cred.vpin',
  'cred.ungm',
  'cred.members',
]

const TEAM: { nameKey: TranslationKey; roleKey: TranslationKey; mono: string }[] = [
  { nameKey: 'about.tm1.name', roleKey: 'about.tm1.role', mono: 'AG' },
  { nameKey: 'about.tm2.name', roleKey: 'about.tm2.role', mono: 'AS' },
  { nameKey: 'about.tm3.name', roleKey: 'about.tm3.role', mono: 'SR' },
  { nameKey: 'about.tm4.name', roleKey: 'about.tm4.role', mono: 'RW' },
]

const MVV: { titleKey: TranslationKey; textKey: TranslationKey; icon: ComponentType<{ size?: number | string; className?: string }> }[] = [
  { titleKey: 'about.missionTitle', textKey: 'about.mission', icon: Target },
  { titleKey: 'about.visionTitle', textKey: 'about.vision', icon: Eye },
]

const VALUES: { titleKey: TranslationKey; textKey: TranslationKey; icon: ComponentType<{ size?: number | string; className?: string }> }[] = [
  { titleKey: 'about.val1Title', textKey: 'about.val1', icon: Scale },
  { titleKey: 'about.val2Title', textKey: 'about.val2', icon: ShieldCheck },
  { titleKey: 'about.val3Title', textKey: 'about.val3', icon: BadgeCheck },
]

export default function About() {
  const { t } = useI18n()
  return (
    <main className="bg-[var(--bg)]">
      <PageHeader tagKey="about.tag" headingKey="about.heading" subKey="about.sub" />

      {/* ── timeline: sticky intro + milestones ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-14 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <p className="nss-section-tag">{t('about.storyTag')}</p>
              <h2 className="nss-h2 mt-4 text-3xl md:text-4xl">{t('about.storyHeading')}</h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[rgba(var(--text-rgb),0.60)]">
                {t('about.storySub')}
              </p>
              <div className="nss-hairline mt-8 w-24" />
            </div>
          </Reveal>

          <div className="relative lg:col-span-3">
            <div className="absolute bottom-0 top-0 w-px bg-gradient-to-b from-[rgba(var(--gold-rgb),0.60)] via-[rgba(var(--gold-rgb),0.20)] to-transparent start-[5px] md:start-[7px]" />
            <div className="space-y-14">
              {TIMELINE.map((m, i) => (
                <Reveal key={m.yearKey} delay={i * 80}>
                  <div className="group relative ps-10 md:ps-14">
                    <span className="absolute start-0 top-3 h-[11px] w-[11px] rounded-full border-2 border-[rgb(var(--gold-rgb))] bg-[var(--bg)] transition-shadow duration-300 group-hover:shadow-[0_0_14px_rgba(var(--gold-rgb),0.7)] md:h-[15px] md:w-[15px]" />
                    <p className="nss-display text-4xl text-[rgb(var(--gold-rgb))] md:text-5xl">
                      {t(m.yearKey)}
                    </p>
                    <h3 className="nss-display mt-2 text-xl text-[rgb(var(--text-rgb))] transition-colors duration-300 group-hover:text-[rgb(var(--gold-rgb))] md:text-2xl">
                      {t(m.titleKey)}
                    </h3>
                    <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-[rgba(var(--text-rgb),0.60)]">
                      {t(m.descKey)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── mission / vision / values ── */}
      <section className="border-y border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <p className="nss-section-tag">{t('about.mvvTag')}</p>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {MVV.map((c, i) => (
              <Reveal key={c.titleKey} delay={i * 100}>
                <div className="nss-card h-full p-8 md:p-10">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-[rgba(var(--gold-rgb),0.30)] bg-[rgba(var(--gold-rgb),0.08)] text-[rgb(var(--gold-rgb))]">
                      <c.icon size={20} />
                    </span>
                    <h3 className="nss-display text-2xl text-[rgb(var(--gold-rgb))] md:text-3xl">
                      {t(c.titleKey)}
                    </h3>
                  </div>
                  <div className="nss-hairline my-6 w-16" />
                  <p className="text-[16px] leading-relaxed text-[rgba(var(--text-rgb),0.72)]">
                    {t(c.textKey)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.titleKey} delay={i * 90}>
                <div className="nss-card h-full p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-[rgba(var(--gold-rgb),0.30)] bg-[rgba(var(--gold-rgb),0.08)] text-[rgb(var(--gold-rgb))]">
                    <v.icon size={17} />
                  </span>
                  <h4 className="nss-display mt-5 text-lg">{t(v.titleKey)}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[rgba(var(--text-rgb),0.60)]">
                    {t(v.textKey)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── leadership ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <p className="nss-section-tag">{t('about.teamTag')}</p>
              <h2 className="nss-h2 mt-4 text-3xl md:text-4xl">{t('about.teamHeading')}</h2>
              <div className="mt-8 overflow-hidden">
                <img
                  src="./posters/8.jpg"
                  alt={t('about.teamHeading')}
                  loading="lazy"
                  className="nss-poster aspect-square w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-3">
            {TEAM.map((m, i) => (
              <Reveal key={m.nameKey} delay={i * 90}>
                <div className="nss-card flex h-full items-center gap-5 p-6">
                  <span
                    className="nss-display flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-[rgba(var(--gold-rgb),0.35)] text-lg text-[rgb(var(--gold-rgb))]"
                    style={{ background: 'linear-gradient(150deg, rgba(var(--gold-rgb),0.18), rgba(var(--gold-rgb),0.04))' }}
                  >
                    {m.mono}
                  </span>
                  <div>
                    <h3 className="nss-display text-lg leading-snug">{t(m.nameKey)}</h3>
                    <div className="nss-hairline my-2 w-8" />
                    <p className="nss-mono text-[11px] tracking-[0.18em] text-[rgba(var(--gold-rgb),0.75)] uppercase">
                      {t(m.roleKey)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── credentials ── */}
      <section className="border-t border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <p className="nss-section-tag">{t('about.credTag')}</p>
            <h2 className="nss-h2 mt-4 text-3xl md:text-4xl">{t('about.credHeading')}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CREDS.map((k, i) => (
              <Reveal key={k} delay={i * 70}>
                <div className="nss-card flex h-full items-start gap-3 p-5">
                  <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[rgb(var(--gold-rgb))]" />
                  <p className="nss-mono text-[13px] leading-relaxed text-[rgba(var(--text-rgb),0.70)]">
                    {t(k)}
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
