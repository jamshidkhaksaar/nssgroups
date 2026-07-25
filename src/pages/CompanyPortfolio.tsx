import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  Handshake,
  Landmark,
  MapPinned,
  PackageSearch,
  Route,
  Scale,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { Link } from 'react-router'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/portfolio/SectionHeading'
import {
  PORTFOLIO_CAPABILITIES,
  PORTFOLIO_COMPANIES,
  PORTFOLIO_GOVERNANCE,
  PORTFOLIO_RECORDS,
  PORTFOLIO_RELATIONSHIPS,
  PORTFOLIO_ROADMAP,
  PORTFOLIO_SERVICE_MODEL,
  PORTFOLIO_TIMELINE,
} from '@/data/companyPortfolio'
import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'

const PAGE_NAV: { href: string; key: TranslationKey }[] = [
  { href: '#overview', key: 'portfolio.nav.overview' },
  { href: '#history', key: 'portfolio.nav.history' },
  { href: '#group', key: 'portfolio.nav.group' },
  { href: '#capabilities', key: 'portfolio.nav.capabilities' },
  { href: '#record', key: 'portfolio.nav.record' },
  { href: '#roadmap', key: 'portfolio.nav.roadmap' },
]

const HERO_FACTS: { value: string; key: TranslationKey }[] = [
  { value: '2000', key: 'portfolio.fact.heritage' },
  { value: '6', key: 'portfolio.fact.entities' },
  { value: '8', key: 'portfolio.fact.relationships' },
  { value: '7', key: 'portfolio.fact.languages' },
]

const CAPABILITY_ICONS: ComponentType<{ size?: number; className?: string }>[] = [
  Route,
  PackageSearch,
  ClipboardCheck,
  Boxes,
  Building2,
]

const MODEL_ICONS: ComponentType<{ size?: number; className?: string }>[] = [
  PackageSearch,
  ClipboardCheck,
  Handshake,
  BadgeCheck,
  Waypoints,
  FileCheck2,
]

const ROADMAP_ICONS: ComponentType<{ size?: number; className?: string }>[] = [
  Globe2,
  ClipboardCheck,
  MapPinned,
  ShieldCheck,
]

const REGIONAL_CARDS: { titleKey: TranslationKey; descriptionKey: TranslationKey }[] = [
  {
    titleKey: 'portfolio.regional.1.title',
    descriptionKey: 'portfolio.regional.1.desc',
  },
  {
    titleKey: 'portfolio.regional.2.title',
    descriptionKey: 'portfolio.regional.2.desc',
  },
  {
    titleKey: 'portfolio.regional.3.title',
    descriptionKey: 'portfolio.regional.3.desc',
  },
]

export default function CompanyPortfolio() {
  const { t } = useI18n()

  return (
    <main className="overflow-hidden bg-[var(--bg)]">
      <section className="relative isolate border-b border-[rgba(var(--gold-rgb),0.14)]">
        <img
          src="./projects/2.jpg"
          alt={t('portfolio.image.operationsAlt')}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,10,30,0.97)_0%,rgba(14,10,30,0.90)_52%,rgba(14,10,30,0.55)_100%)] rtl:bg-[linear-gradient(270deg,rgba(14,10,30,0.97)_0%,rgba(14,10,30,0.90)_52%,rgba(14,10,30,0.55)_100%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-12 md:pb-20 md:pt-44">
          <Reveal>
            <div className="max-w-4xl">
              <p className="nss-section-tag text-[#e8c268]">{t('portfolio.tag')}</p>
              <h1 className="nss-display mt-5 text-4xl leading-[1.04] text-[#f7f1e3] sm:text-5xl md:text-7xl">
                {t('portfolio.heading')}
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-8 text-[rgba(247,241,227,0.74)] md:text-lg">
                {t('portfolio.lead')}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#e8c268] px-6 text-sm font-semibold text-[#1d1233] transition hover:bg-[#f0d58c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7f1e3]"
                >
                  {t('portfolio.cta.contact')}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <a
                  href="#overview"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-[rgba(247,241,227,0.32)] bg-[rgba(14,10,30,0.44)] px-6 text-sm font-semibold text-[#f7f1e3] transition hover:border-[#e8c268] hover:text-[#e8c268] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
                >
                  {t('portfolio.cta.explore')}
                  <ChevronDown size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-[rgba(232,194,104,0.22)] bg-[rgba(232,194,104,0.22)] sm:grid-cols-2 lg:grid-cols-4">
            {HERO_FACTS.map((fact, index) => (
              <Reveal key={fact.key} delay={index * 70}>
                <div className="h-full bg-[rgba(14,10,30,0.84)] px-5 py-5 backdrop-blur-sm">
                  <p className="nss-display text-3xl text-[#e8c268]">{fact.value}</p>
                  <p className="mt-1 text-xs leading-5 text-[rgba(247,241,227,0.62)]">
                    {t(fact.key)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-xs leading-5 text-[rgba(247,241,227,0.54)]">
            {t('portfolio.statusNote')}
          </p>
        </div>
      </section>

      <nav
        aria-label={t('portfolio.nav.label')}
        className="sticky top-[74px] z-30 border-b border-[rgba(var(--gold-rgb),0.14)] bg-[rgba(var(--bg-rgb),0.94)] backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 md:px-12">
          {PAGE_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-sm px-4 py-2.5 text-xs font-semibold text-[rgba(var(--text-rgb),0.64)] transition hover:bg-[rgba(var(--gold-rgb),0.08)] hover:text-[rgb(var(--gold-rgb))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))]"
            >
              {t(item.key)}
            </a>
          ))}
        </div>
      </nav>

      <section id="overview" className="scroll-mt-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionHeading
              tagKey="portfolio.overview.tag"
              titleKey="portfolio.overview.title"
            />
            <p className="mt-7 text-base leading-8 text-[rgba(var(--text-rgb),0.72)]">
              {t('portfolio.overview.body1')}
            </p>
            <p className="mt-4 text-base leading-8 text-[rgba(var(--text-rgb),0.62)]">
              {t('portfolio.overview.body2')}
            </p>
            <div className="mt-8 border-s-2 border-[rgb(var(--gold-rgb))] ps-5">
              <p className="nss-display text-xl leading-relaxed text-[rgb(var(--text-rgb))] md:text-2xl">
                {t('portfolio.overview.principle')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure className="relative">
              <img
                src="./projects/15.jpg"
                alt={t('portfolio.image.warehouseAlt')}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-sm object-cover"
              />
              <figcaption className="border-x border-b border-[rgba(var(--gold-rgb),0.18)] bg-[var(--panel)] px-5 py-4 text-xs leading-5 text-[rgba(var(--text-rgb),0.58)]">
                {t('portfolio.image.caption')}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section
        id="history"
        className="scroll-mt-32 border-y border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <SectionHeading
            tagKey="portfolio.timeline.tag"
            titleKey="portfolio.timeline.title"
            leadKey="portfolio.timeline.lead"
          />
          <ol className="relative mt-14 grid gap-5 lg:grid-cols-2">
            {PORTFOLIO_TIMELINE.map((milestone, index) => (
              <Reveal key={milestone.year} delay={(index % 4) * 70}>
                <li className="nss-card h-full p-6 md:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <span className="nss-display text-3xl text-[rgb(var(--gold-rgb))]">
                      {milestone.year}
                    </span>
                    <span className="nss-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="nss-display mt-7 text-xl md:text-2xl">
                    {t(milestone.titleKey)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[rgba(var(--text-rgb),0.62)]">
                    {t(milestone.descriptionKey)}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="group" className="scroll-mt-32">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <SectionHeading
            tagKey="portfolio.companies.tag"
            titleKey="portfolio.companies.title"
            leadKey="portfolio.companies.lead"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_COMPANIES.map((company, index) => (
              <Reveal key={company.number} delay={(index % 3) * 80}>
                <article className="nss-card h-full p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="nss-index">{company.number}</span>
                    <Building2 size={18} className="text-[rgb(var(--gold-rgb))]" aria-hidden="true" />
                  </div>
                  <h3 className="nss-display mt-7 text-xl leading-snug">
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

      <section
        id="capabilities"
        className="scroll-mt-32 border-y border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <SectionHeading
            tagKey="portfolio.capabilities.tag"
            titleKey="portfolio.capabilities.title"
            leadKey="portfolio.capabilities.lead"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {PORTFOLIO_CAPABILITIES.map((capability, index) => {
              const Icon = CAPABILITY_ICONS[index]
              return (
                <Reveal key={capability.titleKey} delay={(index % 5) * 60}>
                  <article className="nss-card h-full p-6">
                    {Icon && (
                      <Icon
                        size={22}
                        className="text-[rgb(var(--gold-rgb))]"
                        aria-hidden="true"
                      />
                    )}
                    <h3 className="nss-display mt-6 text-lg leading-snug">
                      {t(capability.titleKey)}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[rgba(var(--text-rgb),0.60)]">
                      {t(capability.descriptionKey)}
                    </p>
                  </article>
                </Reveal>
              )
            })}
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <SectionHeading
                tagKey="portfolio.regional.tag"
                titleKey="portfolio.regional.title"
                leadKey="portfolio.regional.lead"
              />
            </Reveal>
            <div className="grid gap-4">
              {REGIONAL_CARDS.map((card, index) => (
                <Reveal key={card.titleKey} delay={index * 80}>
                  <article className="flex gap-5 border-s border-[rgba(var(--gold-rgb),0.38)] bg-[rgba(var(--gold-rgb),0.04)] p-5">
                    <MapPinned
                      size={20}
                      className="mt-1 shrink-0 text-[rgb(var(--gold-rgb))]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="nss-display text-lg">{t(card.titleKey)}</h3>
                      <p className="mt-2 text-sm leading-6 text-[rgba(var(--text-rgb),0.60)]">
                        {t(card.descriptionKey)}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <SectionHeading
          tagKey="portfolio.model.tag"
          titleKey="portfolio.model.title"
          leadKey="portfolio.model.lead"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-[rgba(var(--gold-rgb),0.18)] bg-[rgba(var(--gold-rgb),0.18)] md:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_SERVICE_MODEL.map((step, index) => {
            const Icon = MODEL_ICONS[index]
            return (
              <Reveal key={step.titleKey} delay={(index % 3) * 70}>
                <article className="h-full bg-[var(--bg)] p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    {Icon && (
                      <Icon
                        size={20}
                        className="text-[rgb(var(--gold-rgb))]"
                        aria-hidden="true"
                      />
                    )}
                    <span className="nss-index">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="nss-display mt-7 text-xl">{t(step.titleKey)}</h3>
                  <p className="mt-3 text-sm leading-7 text-[rgba(var(--text-rgb),0.60)]">
                    {t(step.descriptionKey)}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
        <div className="mt-6 flex items-start gap-3 border border-[rgba(var(--gold-rgb),0.24)] bg-[rgba(var(--gold-rgb),0.07)] p-5">
          <Scale
            size={19}
            className="mt-0.5 shrink-0 text-[rgb(var(--gold-rgb))]"
            aria-hidden="true"
          />
          <p className="text-sm leading-6 text-[rgba(var(--text-rgb),0.70)]">
            {t('portfolio.model.note')}
          </p>
        </div>
      </section>

      <section
        id="record"
        className="scroll-mt-32 border-y border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <SectionHeading
            tagKey="portfolio.relationships.tag"
            titleKey="portfolio.relationships.title"
            leadKey="portfolio.relationships.lead"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PORTFOLIO_RELATIONSHIPS.map((relationship, index) => (
              <Reveal key={relationship.name} delay={(index % 4) * 60}>
                <article className="nss-card h-full p-5">
                  <div className="flex h-20 items-center justify-center rounded-sm bg-white p-4">
                    <img
                      src={relationship.logo}
                      alt={`${relationship.name} ${t('portfolio.logoAltSuffix')}`}
                      loading="lazy"
                      className="max-h-12 max-w-[150px] object-contain"
                    />
                  </div>
                  <p className="nss-mono mt-5 text-[10px] tracking-[0.14em] text-[rgb(var(--gold-rgb))] uppercase">
                    {t(relationship.periodKey)}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold leading-6">{relationship.name}</h3>
                  <p className="mt-2 text-xs leading-6 text-[rgba(var(--text-rgb),0.58)]">
                    {t(relationship.descriptionKey)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 max-w-5xl text-xs leading-6 text-[rgba(var(--text-rgb),0.54)]">
            {t('portfolio.relationships.disclaimer')}
          </p>

          <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeading
                tagKey="portfolio.records.tag"
                titleKey="portfolio.records.title"
                leadKey="portfolio.records.lead"
              />
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {PORTFOLIO_RECORDS.map((record, index) => (
                <Reveal key={record} delay={(index % 2) * 70}>
                  <div className="flex h-full gap-3 border border-[rgba(var(--gold-rgb),0.16)] bg-[var(--bg)] p-5">
                    <FileCheck2
                      size={18}
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
        </div>
      </section>

      <section id="roadmap" className="scroll-mt-32">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <SectionHeading
            tagKey="portfolio.roadmap.tag"
            titleKey="portfolio.roadmap.title"
            leadKey="portfolio.roadmap.lead"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {PORTFOLIO_ROADMAP.map((item, index) => {
              const Icon = ROADMAP_ICONS[index]
              return (
                <Reveal key={item.titleKey} delay={(index % 2) * 80}>
                  <article className="nss-card h-full p-7">
                    <div className="flex items-center gap-4">
                      {Icon && (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[rgba(var(--gold-rgb),0.26)] bg-[rgba(var(--gold-rgb),0.08)]">
                          <Icon
                            size={19}
                            className="text-[rgb(var(--gold-rgb))]"
                            aria-hidden="true"
                          />
                        </span>
                      )}
                      <h3 className="nss-display text-xl">{t(item.titleKey)}</h3>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-[rgba(var(--text-rgb),0.62)]">
                      {t(item.descriptionKey)}
                    </p>
                  </article>
                </Reveal>
              )
            })}
          </div>
          <div className="mt-6 flex gap-3 border-s-2 border-[rgb(var(--gold-rgb))] bg-[rgba(var(--gold-rgb),0.05)] p-5">
            <Sparkles
              size={19}
              className="mt-0.5 shrink-0 text-[rgb(var(--gold-rgb))]"
              aria-hidden="true"
            />
            <p className="text-sm leading-6 text-[rgba(var(--text-rgb),0.68)]">
              {t('portfolio.roadmap.note')}
            </p>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeading
                tagKey="portfolio.governance.tag"
                titleKey="portfolio.governance.title"
                leadKey="portfolio.governance.lead"
              />
            </Reveal>
            <div className="grid gap-3">
              {PORTFOLIO_GOVERNANCE.map((item, index) => (
                <Reveal key={item} delay={index * 60}>
                  <div className="flex gap-4 border-b border-[rgba(var(--gold-rgb),0.14)] pb-4">
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-[rgb(var(--gold-rgb))]"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-6 text-[rgba(var(--text-rgb),0.68)]">
                      {t(item)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <SectionHeading
            tagKey="portfolio.values.tag"
            titleKey="portfolio.values.title"
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ['about.val1Title', 'about.val1'],
              ['about.val2Title', 'about.val2'],
              ['about.val3Title', 'about.val3'],
            ].map(([titleKey, textKey], index) => (
              <Reveal key={titleKey} delay={index * 80}>
                <article className="nss-card h-full p-7 text-center">
                  <Landmark
                    size={21}
                    className="mx-auto text-[rgb(var(--gold-rgb))]"
                    aria-hidden="true"
                  />
                  <h3 className="nss-display mt-5 text-xl">
                    {t(titleKey as TranslationKey)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[rgba(var(--text-rgb),0.62)]">
                    {t(textKey as TranslationKey)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(var(--gold-rgb),0.14),transparent_48%)]" />
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <div className="max-w-4xl">
              <p className="nss-section-tag">{t('portfolio.cta.tag')}</p>
              <h2 className="nss-h2 mt-4 text-3xl md:text-5xl">{t('portfolio.cta.title')}</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[rgba(var(--text-rgb),0.64)]">
                {t('portfolio.cta.lead')}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[rgb(var(--gold-rgb))] px-6 text-sm font-semibold text-[#1d1233] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))]"
                >
                  {t('portfolio.cta.contact')}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  to="/marketplace"
                  className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[rgba(var(--gold-rgb),0.32)] px-6 text-sm font-semibold text-[rgb(var(--text-rgb))] transition hover:border-[rgb(var(--gold-rgb))] hover:text-[rgb(var(--gold-rgb))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))]"
                >
                  {t('portfolio.cta.marketplace')}
                </Link>
                <Link
                  to="/booking"
                  className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[rgba(var(--gold-rgb),0.32)] px-6 text-sm font-semibold text-[rgb(var(--text-rgb))] transition hover:border-[rgb(var(--gold-rgb))] hover:text-[rgb(var(--gold-rgb))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))]"
                >
                  {t('portfolio.cta.transport')}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
