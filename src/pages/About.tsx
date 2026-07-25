import { ArrowUpRight, Eye, Scale, ShieldCheck, Target } from 'lucide-react'
import type { ComponentType } from 'react'
import { Link } from 'react-router'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import {
  PORTFOLIO_COMPANIES,
  PORTFOLIO_RECORDS,
  PORTFOLIO_TIMELINE,
} from '@/data/companyPortfolio'
import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'

const MVV: {
  titleKey: TranslationKey
  textKey: TranslationKey
  icon: ComponentType<{ size?: number; className?: string }>
}[] = [
  { titleKey: 'about.missionTitle', textKey: 'about.mission', icon: Target },
  { titleKey: 'about.visionTitle', textKey: 'about.vision', icon: Eye },
]

const VALUES: {
  titleKey: TranslationKey
  textKey: TranslationKey
  icon: ComponentType<{ size?: number; className?: string }>
}[] = [
  { titleKey: 'about.val1Title', textKey: 'about.val1', icon: Scale },
  { titleKey: 'about.val2Title', textKey: 'about.val2', icon: ShieldCheck },
  { titleKey: 'about.val3Title', textKey: 'about.val3', icon: Target },
]

export default function About() {
  const { t } = useI18n()

  return (
    <main className="bg-[var(--bg)]">
      <PageHeader tagKey="about.tag" headingKey="about.heading" subKey="about.sub" />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-14 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <p className="nss-section-tag">{t('about.storyTag')}</p>
              <h2 className="nss-h2 mt-4 text-3xl md:text-4xl">
                {t('about.storyHeading')}
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-7 text-[rgba(var(--text-rgb),0.62)]">
                {t('about.storySub')}
              </p>
              <Link
                to="/company-portfolio"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[rgb(var(--gold-rgb))] px-6 text-sm font-semibold text-[#1d1233] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))]"
              >
                {t('about.portfolioCta')}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <ol className="relative space-y-10 lg:col-span-3">
            <div className="absolute bottom-0 top-0 w-px bg-[rgba(var(--gold-rgb),0.24)] start-[5px]" />
            {PORTFOLIO_TIMELINE.map((milestone, index) => (
              <Reveal key={milestone.year} delay={(index % 4) * 70}>
                <li className="group relative ps-10 md:ps-14">
                  <span className="absolute start-0 top-2 h-[11px] w-[11px] rounded-full border-2 border-[rgb(var(--gold-rgb))] bg-[var(--bg)]" />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <p className="nss-display text-3xl text-[rgb(var(--gold-rgb))]">
                      {milestone.year}
                    </p>
                    <h3 className="nss-display text-xl md:text-2xl">
                      {t(milestone.titleKey)}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[rgba(var(--text-rgb),0.60)]">
                    {t(milestone.descriptionKey)}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <p className="nss-section-tag">{t('about.groupTag')}</p>
            <h2 className="nss-h2 mt-4 max-w-3xl text-3xl md:text-5xl">
              {t('about.groupHeading')}
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[rgba(var(--text-rgb),0.62)]">
              {t('about.groupSub')}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_COMPANIES.map((company, index) => (
              <Reveal key={company.number} delay={(index % 3) * 70}>
                <article className="nss-card h-full p-6">
                  <span className="nss-index">{company.number}</span>
                  <h3 className="nss-display mt-6 text-xl leading-snug">
                    {t(company.nameKey)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[rgba(var(--text-rgb),0.60)]">
                    {t(company.descriptionKey)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <p className="nss-section-tag">{t('about.mvvTag')}</p>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {MVV.map((item, index) => (
            <Reveal key={item.titleKey} delay={index * 90}>
              <article className="nss-card h-full p-8 md:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-[rgba(var(--gold-rgb),0.30)] bg-[rgba(var(--gold-rgb),0.08)] text-[rgb(var(--gold-rgb))]">
                  <item.icon size={20} aria-hidden="true" />
                </span>
                <h3 className="nss-display mt-6 text-2xl text-[rgb(var(--gold-rgb))] md:text-3xl">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-5 text-base leading-8 text-[rgba(var(--text-rgb),0.70)]">
                  {t(item.textKey)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {VALUES.map((item, index) => (
            <Reveal key={item.titleKey} delay={index * 80}>
              <article className="nss-card h-full p-6">
                <item.icon
                  size={19}
                  className="text-[rgb(var(--gold-rgb))]"
                  aria-hidden="true"
                />
                <h3 className="nss-display mt-5 text-lg">{t(item.titleKey)}</h3>
                <p className="mt-2 text-sm leading-7 text-[rgba(var(--text-rgb),0.60)]">
                  {t(item.textKey)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="nss-section-tag">{t('about.credTag')}</p>
            <h2 className="nss-h2 mt-4 text-3xl md:text-4xl">
              {t('about.credHeading')}
            </h2>
            <p className="mt-5 text-sm leading-7 text-[rgba(var(--text-rgb),0.60)]">
              {t('about.credSub')}
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {PORTFOLIO_RECORDS.map((record, index) => (
              <Reveal key={record} delay={(index % 2) * 70}>
                <div className="flex h-full gap-3 border border-[rgba(var(--gold-rgb),0.16)] bg-[var(--bg)] p-5">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-[rgb(var(--gold-rgb))]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-6 text-[rgba(var(--text-rgb),0.68)]">
                    {t(record)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <div className="relative overflow-hidden border border-[rgba(var(--gold-rgb),0.24)] bg-[var(--panel)] p-8 md:p-12">
            <div className="absolute inset-y-0 start-0 w-1 bg-[rgb(var(--gold-rgb))]" />
            <p className="nss-section-tag">{t('about.portfolioTag')}</p>
            <h2 className="nss-h2 mt-4 max-w-3xl text-3xl md:text-5xl">
              {t('about.portfolioHeading')}
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[rgba(var(--text-rgb),0.62)]">
              {t('about.portfolioSub')}
            </p>
            <Link
              to="/company-portfolio"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[rgb(var(--gold-rgb))] px-6 text-sm font-semibold text-[#1d1233] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))]"
            >
              {t('about.portfolioCta')}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
