import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import Seo from '@/components/Seo'
import ProductCard from '@/components/marketplace/ProductCard'
import TradeCorridor from '@/components/marketplace/TradeCorridor'
import { useI18n } from '@/i18n/i18n'
import {
  CATALOG_CATEGORIES,
  CATEGORY_KEYS,
  ORIGIN_KEYS,
  PRODUCT_CATALOG,
  type CatalogCategoryId,
  type CatalogOrigin,
} from '@/data/productCatalog'
import { trackEvent } from '@/analytics/analytics'

type OriginFilter = CatalogOrigin | 'ALL'
type CategoryFilter = CatalogCategoryId | 'ALL'

const PAGE_SIZE = 24

export default function Trading() {
  const { t, lang } = useI18n()
  const catalogRef = useRef<HTMLElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [origin, setOrigin] = useState<OriginFilter>('ALL')
  const [category, setCategory] = useState<CategoryFilter>('ALL')
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    if (window.location.hash !== '#catalog-search') return

    const timeout = window.setTimeout(() => {
      searchInputRef.current?.scrollIntoView({ behavior: 'instant', block: 'center' })
      searchInputRef.current?.focus({ preventScroll: true })
    }, 500)

    return () => window.clearTimeout(timeout)
  }, [])

  const products = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(lang)
    return PRODUCT_CATALOG.filter((product) => {
      if (origin !== 'ALL' && product.originCountry !== origin) return false
      if (category !== 'ALL' && product.categoryId !== category) return false
      if (!normalized) return true

      const searchable = [
        product.sku,
        ...Object.values(product.name),
        ...Object.values(product.specification),
        t(CATEGORY_KEYS[product.categoryId]),
        t(ORIGIN_KEYS[product.originCountry]),
      ]
        .join(' ')
        .toLocaleLowerCase(lang)

      return searchable.includes(normalized)
    })
  }, [category, lang, origin, query, t])

  const visibleProducts = products.slice(0, visibleCount)
  const hasFilters = origin !== 'ALL' || category !== 'ALL' || query.trim().length > 0

  const selectCountry = (country: CatalogOrigin) => {
    setOrigin(country)
    setCategory('ALL')
    setQuery('')
    setVisibleCount(PAGE_SIZE)
    window.requestAnimationFrame(() => {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const clearFilters = () => {
    setOrigin('ALL')
    setCategory('ALL')
    setQuery('')
    setVisibleCount(PAGE_SIZE)
  }

  const countryFilters: { value: OriginFilter; label: string; count: number }[] = [
    { value: 'ALL', label: t('marketplace.country.all'), count: 300 },
    { value: 'AF', label: t('marketplace.country.af'), count: 150 },
    { value: 'UZ', label: t('marketplace.country.uz'), count: 150 },
  ]

  return (
    <main className="bg-[var(--bg)]">
      <Seo
        title={`${t('nav.marketplace')} — NSS International Group`}
        description={t('marketplace.page.description')}
        path="/marketplace"
      />
      <PageHeader
        tagKey="marketplace.page.tag"
        headingKey="marketplace.page.title"
        subKey="marketplace.page.description"
      />
      <TradeCorridor onCountrySelect={selectCountry} />

      <section ref={catalogRef} aria-labelledby="marketplace-catalog-title" className="scroll-mt-24">
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
          <Reveal>
            <p className="nss-section-tag">{t('marketplace.catalog.tag')}</p>
            <div className="mt-4 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 id="marketplace-catalog-title" className="nss-h2 max-w-3xl text-3xl md:text-5xl">
                  {t('marketplace.catalog.title')}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[rgba(var(--text-rgb),0.58)]">
                  {t('marketplace.catalog.description')}
                </p>
              </div>
              <label id="catalog-search" className="relative block w-full max-w-md scroll-mt-28">
                <span className="sr-only">{t('marketplace.searchLabel')}</span>
                <Search
                  aria-hidden="true"
                  size={24}
                  className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[rgb(var(--gold-rgb))]"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setVisibleCount(PAGE_SIZE)
                    trackEvent('marketplace_search', { has_query: event.target.value.trim().length > 0, query_length: event.target.value.trim().length })
                  }}
                  className="h-14 w-full border border-[rgba(var(--gold-rgb),0.34)] bg-[rgba(var(--text-rgb),0.05)] ps-14 pe-4 text-[15px] text-[rgb(var(--text-rgb))] outline-none transition-colors placeholder:text-[rgba(var(--text-rgb),0.42)] focus:border-[rgba(var(--gold-rgb),0.75)] focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.24)]"
                  placeholder={t('marketplace.searchPlaceholder')}
                />
              </label>
            </div>
          </Reveal>

          <div className="mt-10 border-y border-[rgba(var(--gold-rgb),0.14)] py-7">
            <fieldset>
              <legend className="nss-mono flex items-center gap-2 text-[10px] tracking-[0.15em] text-[rgba(var(--text-rgb),0.48)] uppercase">
                <SlidersHorizontal aria-hidden="true" size={13} />
                {t('marketplace.countryLabel')}
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {countryFilters.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={origin === filter.value}
                    onClick={() => {
                      setOrigin(filter.value)
                      setVisibleCount(PAGE_SIZE)
                      trackEvent('marketplace_filter', { filter_type: 'origin', filter_value: filter.value })
                    }}
                    className={`min-h-10 border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))] ${
                      origin === filter.value
                        ? 'border-[rgb(var(--gold-rgb))] bg-[rgb(var(--gold-rgb))] text-[#1d1233]'
                        : 'border-[rgba(var(--gold-rgb),0.24)] text-[rgba(var(--text-rgb),0.7)] hover:border-[rgba(var(--gold-rgb),0.7)]'
                    }`}
                  >
                    {filter.label} <span className="ms-1 opacity-70">({filter.count})</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="nss-mono text-[10px] tracking-[0.15em] text-[rgba(var(--text-rgb),0.48)] uppercase">
                {t('marketplace.categoryLabel')}
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={category === 'ALL'}
                  onClick={() => {
                    setCategory('ALL')
                    setVisibleCount(PAGE_SIZE)
                    trackEvent('marketplace_filter', { filter_type: 'category', filter_value: 'ALL' })
                  }}
                  className={`min-h-9 border px-3 py-1.5 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))] ${
                    category === 'ALL'
                      ? 'border-[rgba(var(--gold-rgb),0.8)] text-[rgb(var(--gold-rgb))]'
                      : 'border-[rgba(var(--gold-rgb),0.18)] text-[rgba(var(--text-rgb),0.58)] hover:border-[rgba(var(--gold-rgb),0.55)]'
                  }`}
                >
                  {t('marketplace.category.all')}
                </button>
                {CATALOG_CATEGORIES.map((categoryId) => (
                  <button
                    key={categoryId}
                    type="button"
                    aria-pressed={category === categoryId}
                    onClick={() => {
                      setCategory(categoryId)
                      setVisibleCount(PAGE_SIZE)
                      trackEvent('marketplace_filter', { filter_type: 'category', filter_value: categoryId })
                    }}
                    className={`min-h-9 border px-3 py-1.5 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))] ${
                      category === categoryId
                        ? 'border-[rgba(var(--gold-rgb),0.8)] text-[rgb(var(--gold-rgb))]'
                        : 'border-[rgba(var(--gold-rgb),0.18)] text-[rgba(var(--text-rgb),0.58)] hover:border-[rgba(var(--gold-rgb),0.55)]'
                    }`}
                  >
                    {t(CATEGORY_KEYS[categoryId])}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p aria-live="polite" className="text-sm text-[rgba(var(--text-rgb),0.62)]">
              <strong className="text-[rgb(var(--text-rgb))]">{products.length}</strong> {t('marketplace.results')}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-[rgb(var(--gold-rgb))] underline decoration-[rgba(var(--gold-rgb),0.4)] underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))]"
              >
                <X aria-hidden="true" size={14} />
                {t('marketplace.clearFilters')}
              </button>
            )}
          </div>

          {visibleProducts.length > 0 ? (
            <>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {visibleProducts.map((product, index) => (
                  <ProductCard key={product.sku} product={product} index={index} />
                ))}
              </div>
              <p className="mt-8 text-center text-xs text-[rgba(var(--text-rgb),0.5)]">
                {t('marketplace.showing')} {visibleProducts.length} / {products.length}
              </p>
              {visibleCount < products.length && (
                <div className="mt-5 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    className="min-h-11 border border-[rgba(var(--gold-rgb),0.4)] px-6 py-3 text-xs font-bold text-[rgb(var(--gold-rgb))] transition-colors hover:bg-[rgba(var(--gold-rgb),0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))]"
                  >
                    {t('marketplace.loadMore')}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div role="status" className="mt-10 border border-[rgba(var(--gold-rgb),0.18)] px-6 py-16 text-center">
              <h3 className="nss-display text-2xl">{t('marketplace.noResultsTitle')}</h3>
              <p className="mt-3 text-sm text-[rgba(var(--text-rgb),0.55)]">{t('marketplace.noResultsDescription')}</p>
              <button type="button" onClick={clearFilters} className="nss-btn-primary mt-7 min-h-11 rounded-sm px-6 py-3 text-xs font-bold">
                {t('marketplace.clearFilters')}
              </button>
            </div>
          )}

          <p className="mt-12 border-s-2 border-[rgb(var(--gold-rgb))] ps-4 text-xs leading-6 text-[rgba(var(--text-rgb),0.5)]">
            {t('marketplace.notice')}
          </p>
        </div>
      </section>
    </main>
  )
}
