import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Globe2, Route } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { useI18n } from '@/i18n/i18n'
import type { CatalogOrigin } from '@/data/productCatalog'

interface TradeCorridorProps {
  onCountrySelect: (origin: CatalogOrigin) => void
}

interface CountryCardProps {
  code: CatalogOrigin
  country: string
  action: string
  onSelect: () => void
  textDirection: 'ltr' | 'rtl'
}

function CountryCard({ code, country, action, onSelect, textDirection }: CountryCardProps) {
  const { t } = useI18n()

  return (
    <article
      dir={textDirection}
      className="flex min-h-64 flex-col justify-between border border-[rgba(var(--gold-rgb),0.24)] bg-[rgba(var(--text-rgb),0.035)] p-6 md:p-8"
    >
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="nss-mono text-[11px] tracking-[0.2em] text-[rgb(var(--gold-rgb))]">{code}</span>
          <Globe2 aria-hidden="true" size={20} className="text-[rgba(var(--gold-rgb),0.72)]" />
        </div>
        <h3 className="nss-display mt-8 text-3xl leading-tight">{country}</h3>
        <p className="nss-mono mt-3 text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.55)] uppercase">
          150 {t('marketplace.products')}
        </p>
      </div>
      <button
        type="button"
        onClick={onSelect}
        className="mt-8 inline-flex min-h-11 items-center justify-between gap-4 border-t border-[rgba(var(--gold-rgb),0.18)] pt-5 text-start text-sm font-semibold text-[rgb(var(--gold-rgb))] transition-colors hover:text-[rgb(var(--text-rgb))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))]"
      >
        {action}
        <ArrowRight aria-hidden="true" size={17} className="rtl:rotate-180" />
      </button>
    </article>
  )
}

export default function TradeCorridor({ onCountrySelect }: TradeCorridorProps) {
  const { t, dir } = useI18n()

  return (
    <section aria-labelledby="trade-corridor-title" className="border-b border-[rgba(var(--gold-rgb),0.12)]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <Reveal>
          <p className="nss-section-tag">{t('marketplace.corridor.tag')}</p>
          <h2 id="trade-corridor-title" className="nss-h2 mt-4 max-w-4xl text-3xl md:text-5xl">
            {t('marketplace.corridor.title')}
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[rgba(var(--text-rgb),0.62)]">
            {t('marketplace.corridor.description')}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div dir="ltr" className="mt-12 hidden grid-cols-[minmax(0,1fr)_minmax(20rem,1.25fr)_minmax(0,1fr)] items-stretch gap-5 lg:grid">
            <CountryCard
              code="AF"
              country={t('marketplace.afghanistan')}
              action={t('marketplace.afCta')}
              onSelect={() => onCountrySelect('AF')}
              textDirection={dir}
            />
            <div className="flex flex-col justify-center border-y border-[rgba(var(--gold-rgb),0.18)] px-4 py-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(var(--gold-rgb),0.45)] bg-[rgba(var(--gold-rgb),0.08)]">
                <Route aria-hidden="true" size={30} className="text-[rgb(var(--gold-rgb))]" />
              </div>
              <p dir={dir} className="nss-display mt-4 text-center text-lg">{t('marketplace.nssHub')}</p>
              <div className="mt-8 space-y-5">
                <div>
                  <div className="flex items-center gap-3 text-[rgb(var(--gold-rgb))]">
                    <span className="h-px flex-1 bg-current" />
                    <ArrowRight aria-hidden="true" size={22} />
                  </div>
                  <p dir={dir} className="nss-mono mt-2 text-center text-[10px] tracking-[0.12em] text-[rgba(var(--text-rgb),0.58)] uppercase">
                    {t('marketplace.afToUz')}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 text-[rgba(var(--gold-rgb),0.72)]">
                    <ArrowLeft aria-hidden="true" size={22} />
                    <span className="h-px flex-1 bg-current" />
                  </div>
                  <p dir={dir} className="nss-mono mt-2 text-center text-[10px] tracking-[0.12em] text-[rgba(var(--text-rgb),0.58)] uppercase">
                    {t('marketplace.uzToAf')}
                  </p>
                </div>
              </div>
            </div>
            <CountryCard
              code="UZ"
              country={t('marketplace.uzbekistan')}
              action={t('marketplace.uzCta')}
              onSelect={() => onCountrySelect('UZ')}
              textDirection={dir}
            />
          </div>

          <div className="mt-10 space-y-4 lg:hidden">
            <CountryCard
              code="AF"
              country={t('marketplace.afghanistan')}
              action={t('marketplace.afCta')}
              onSelect={() => onCountrySelect('AF')}
              textDirection={dir}
            />
            <div className="border-x border-[rgba(var(--gold-rgb),0.18)] px-5 py-7 text-center">
              <Route aria-hidden="true" size={26} className="mx-auto text-[rgb(var(--gold-rgb))]" />
              <p className="nss-display mt-3">{t('marketplace.nssHub')}</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <ArrowDown aria-hidden="true" className="text-[rgb(var(--gold-rgb))]" />
                  <span className="text-[11px] leading-5 text-[rgba(var(--text-rgb),0.58)]">{t('marketplace.afToUz')}</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ArrowUp aria-hidden="true" className="text-[rgba(var(--gold-rgb),0.72)]" />
                  <span className="text-[11px] leading-5 text-[rgba(var(--text-rgb),0.58)]">{t('marketplace.uzToAf')}</span>
                </div>
              </div>
            </div>
            <CountryCard
              code="UZ"
              country={t('marketplace.uzbekistan')}
              action={t('marketplace.uzCta')}
              onSelect={() => onCountrySelect('UZ')}
              textDirection={dir}
            />
          </div>
        </Reveal>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-[rgba(var(--text-rgb),0.5)]">
          {t('marketplace.internationalNote')}
        </p>
      </div>
    </section>
  )
}
