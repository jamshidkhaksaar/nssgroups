import { Link } from 'react-router'
import { useI18n } from '@/i18n/i18n'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import { CORE_SERVICES, VEHICLE_RATES } from '@/data/content'

export default function Services() {
  const { t } = useI18n()
  return (
    <main className="bg-[var(--bg)]">
      <PageHeader tagKey="services.tag" headingKey="services.heading" subKey="services.sub" />

      {/* ── core services ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <p className="nss-section-tag">{t('services.coreTag')}</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CORE_SERVICES.map((s, i) => (
            <Reveal key={s.nameKey} delay={(i % 3) * 90}>
              <div className="nss-card flex h-full flex-col p-7">
                <span className="nss-index">0{i + 1}</span>
                <h3 className="nss-display mt-5 text-xl leading-snug">{t(s.nameKey)}</h3>
                <div className="nss-hairline my-4 w-12" />
                <p className="text-sm leading-relaxed text-[rgba(var(--text-rgb),0.55)]">{t(s.descKey)}</p>
                <Link
                  to="/contact"
                  className="nss-mono mt-auto pt-6 text-[12px] tracking-[0.18em] text-[rgba(var(--gold-rgb),0.70)] uppercase transition-colors hover:text-[rgb(var(--gold-rgb))]"
                >
                  {t('services.quoteFor')} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── trading lines ── */}
      <section className="border-t border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <p className="nss-section-tag">{t('services.tradingTag')}</p>
            <h2 className="nss-h2 mt-4 text-3xl md:text-5xl">{t('services.tradingHeading')}</h2>
          </Reveal>

          {/* vehicle import */}
          <Reveal className="mt-14">
            <div className="grid items-start gap-10 lg:grid-cols-2">
              <div>
                <h3 className="nss-display text-2xl md:text-3xl">{t('services.vi.title')}</h3>
                <p className="nss-mono mt-3 inline-block border border-[rgba(var(--gold-rgb),0.40)] px-3 py-1.5 text-[12px] tracking-[0.2em] text-[rgb(var(--gold-rgb))]">
                  {t('services.vi.delivery')}
                </p>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-[rgba(var(--text-rgb),0.60)]">
                  {t('services.vi.desc')}
                </p>
                <div className="nss-card mt-7 overflow-hidden">
                  {VEHICLE_RATES.map((r) => (
                    <div
                      key={r.model}
                      className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.10)] px-6 py-3.5 last:border-b-0"
                    >
                      <span className="text-sm text-[rgba(var(--text-rgb),0.80)]">{r.model}</span>
                      <span className="nss-mono text-sm font-medium text-[rgb(var(--gold-rgb))]">
                        ${r.price.toLocaleString('en-US')}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="nss-mono mt-4 text-[12px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.50)] uppercase">
                  {t('services.vi.note')}
                </p>
                <Link
                  to="/contact"
                  className="nss-btn-primary mt-7 inline-block rounded-sm px-7 py-3.5 text-sm font-bold"
                >
                  {t('services.quoteFor')}
                </Link>
              </div>
              <img
                src="./posters/7.jpg"
                alt={t('services.vi.title')}
                loading="lazy"
                className="nss-poster aspect-square w-full object-cover"
              />
            </div>
          </Reveal>

          {/* LPG */}
          <Reveal className="mt-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <img
                src="./posters/6.jpg"
                alt={t('services.lpg.title')}
                loading="lazy"
                className="nss-poster aspect-square w-full object-cover lg:order-1 order-2"
              />
              <div className="lg:order-2 order-1">
                <h3 className="nss-display text-2xl md:text-3xl">{t('services.lpg.title')}</h3>
                <div className="nss-hairline my-5 w-16" />
                <p className="max-w-lg text-sm leading-relaxed text-[rgba(var(--text-rgb),0.60)]">
                  {t('services.lpg.desc')}
                </p>
                <Link
                  to="/contact"
                  className="nss-btn-ghost mt-7 inline-block rounded-sm px-7 py-3.5 text-sm"
                >
                  {t('services.quoteFor')}
                </Link>
              </div>
            </div>
          </Reveal>

          {/* PVC */}
          <Reveal className="mt-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h3 className="nss-display text-2xl md:text-3xl">{t('services.pvc.title')}</h3>
                <div className="nss-hairline my-5 w-16" />
                <p className="max-w-lg text-sm leading-relaxed text-[rgba(var(--text-rgb),0.60)]">
                  {t('services.pvc.desc')}
                </p>
                <Link
                  to="/contact"
                  className="nss-btn-ghost mt-7 inline-block rounded-sm px-7 py-3.5 text-sm"
                >
                  {t('services.quoteFor')}
                </Link>
              </div>
              <img
                src="./posters/1.jpg"
                alt={t('services.pvc.title')}
                loading="lazy"
                className="nss-poster aspect-square w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
