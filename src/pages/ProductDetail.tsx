import { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight, FileCheck2, MapPin, PackageCheck, Scale, Tags } from 'lucide-react'
import { Link, useParams } from 'react-router'
import Reveal from '@/components/Reveal'
import Seo from '@/components/Seo'
import ProductCard from '@/components/marketplace/ProductCard'
import { absoluteUrl, SITE_URL } from '@/lib/seo'
import { useI18n } from '@/i18n/i18n'
import {
  CATEGORY_KEYS,
  ORIGIN_KEYS,
  PRODUCT_CATALOG,
  findCatalogProduct,
  formatCatalogMoq,
  formatCatalogUnit,
  getCategoryProductImage,
  localizedProductName,
  localizedSpecification,
} from '@/data/productCatalog'
import { trackEvent } from '@/analytics/analytics'

export default function ProductDetail() {
  const { sku } = useParams()
  const { t, lang } = useI18n()
  const product = findCatalogProduct(sku)

  useEffect(() => {
    if (product) trackEvent('product_detail_view', { sku: product.sku, origin: product.originCountry, category: product.categoryId })
  }, [product])

  if (!product) {
    return (
      <main className="bg-[var(--bg)]">
        <Seo
          title={`${t('marketplace.notFoundTitle')} — NSS International Group`}
          description={t('marketplace.notFoundDescription')}
          path="/marketplace"
        />
        <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 pb-20 pt-40 text-center md:px-12">
          <p className="nss-section-tag">{t('marketplace.productTag')}</p>
          <h1 className="nss-h2 mt-5 text-4xl md:text-6xl">{t('marketplace.notFoundTitle')}</h1>
          <p className="mt-5 text-sm text-[rgba(var(--text-rgb),0.58)]">{t('marketplace.notFoundDescription')}</p>
          <Link to="/marketplace" className="nss-btn-primary mt-8 inline-flex min-h-11 items-center gap-2 rounded-sm px-6 py-3 text-xs font-bold">
            <ArrowLeft aria-hidden="true" size={16} className="rtl:rotate-180" />
            {t('marketplace.backToCatalog')}
          </Link>
        </section>
      </main>
    )
  }

  const name = localizedProductName(product, lang)
  const productPath = `/marketplace/product/${product.sku}`
  const productImage = absoluteUrl(getCategoryProductImage(product))
  const related = PRODUCT_CATALOG.filter(
    (candidate) => candidate.sku !== product.sku && candidate.categoryId === product.categoryId,
  ).slice(0, 3)

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    sku: product.sku,
    image: productImage,
    description: localizedSpecification(product, lang),
    category: t(CATEGORY_KEYS[product.categoryId]),
    countryOfOrigin: t(ORIGIN_KEYS[product.originCountry]),
    brand: { '@type': 'Brand', name: 'NSS International Group' },
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: t('nav.marketplace'), item: `${SITE_URL}/marketplace` },
      { '@type': 'ListItem', position: 3, name, item: absoluteUrl(productPath) },
    ],
  }

  return (
    <main className="bg-[var(--bg)]">
      <Seo
        title={`${name} — NSS International Group`}
        description={localizedSpecification(product, lang)}
        path={productPath}
        image={getCategoryProductImage(product)}
        type="product"
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
      <section className="border-b border-[rgba(var(--gold-rgb),0.12)] bg-gradient-to-b from-[var(--panel-2)] to-[var(--bg)]">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-36 md:px-12 md:pb-16 md:pt-44">
          <Reveal>
            <Link
              to="/marketplace"
              className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-[rgb(var(--gold-rgb))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))]"
            >
              <ArrowLeft aria-hidden="true" size={15} className="rtl:rotate-180" />
              {t('marketplace.backToCatalog')}
            </Link>
            <p className="nss-section-tag mt-8">{t('marketplace.productTag')}</p>
            <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="nss-h2 max-w-4xl text-4xl md:text-6xl">{name}</h1>
                <p dir="ltr" className="nss-mono mt-4 text-xs tracking-[0.16em] text-[rgba(var(--text-rgb),0.5)]">{product.sku}</p>
              </div>
              <span className="w-fit border border-[rgba(var(--gold-rgb),0.4)] px-4 py-2 text-xs font-bold text-[rgb(var(--gold-rgb))]">
                {t('marketplace.rfqOnly')}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
          <Reveal>
            <figure className="overflow-hidden border border-[rgba(var(--gold-rgb),0.18)] bg-[var(--panel-2)]">
              <div className="relative aspect-[16/10]">
                <img
                  src={getCategoryProductImage(product)}
                  alt={`${name} — ${t('marketplace.representativeImage')}`}
                  className="h-full w-full object-cover"
                />
                <span className="nss-mono absolute start-4 top-4 border border-[rgba(var(--gold-rgb),0.4)] bg-[rgba(var(--bg-rgb),0.9)] px-3 py-1.5 text-[9px] tracking-[0.12em] text-[rgb(var(--gold-rgb))] uppercase">
                  {t('marketplace.representativeImage')}
                </span>
              </div>
            </figure>
          </Reveal>

          <Reveal delay={100}>
            <div className="nss-card p-6 md:p-8">
              <dl className="divide-y divide-[rgba(var(--gold-rgb),0.12)]">
                <div className="grid grid-cols-[1.1rem_1fr] gap-x-3 py-4 first:pt-0">
                  <MapPin aria-hidden="true" size={16} className="mt-0.5 text-[rgb(var(--gold-rgb))]" />
                  <div><dt className="text-xs text-[rgba(var(--text-rgb),0.48)]">{t('marketplace.origin')}</dt><dd className="mt-1 font-semibold">{t(ORIGIN_KEYS[product.originCountry])}</dd></div>
                </div>
                <div className="grid grid-cols-[1.1rem_1fr] gap-x-3 py-4">
                  <Tags aria-hidden="true" size={16} className="mt-0.5 text-[rgb(var(--gold-rgb))]" />
                  <div><dt className="text-xs text-[rgba(var(--text-rgb),0.48)]">{t('marketplace.categoryLabel')}</dt><dd className="mt-1 font-semibold">{t(CATEGORY_KEYS[product.categoryId])}</dd></div>
                </div>
                <div className="grid grid-cols-[1.1rem_1fr] gap-x-3 py-4">
                  <PackageCheck aria-hidden="true" size={16} className="mt-0.5 text-[rgb(var(--gold-rgb))]" />
                  <div><dt className="text-xs text-[rgba(var(--text-rgb),0.48)]">{t('marketplace.moq')}</dt><dd className="mt-1 font-semibold">{formatCatalogMoq(product.moq, t)}</dd></div>
                </div>
                <div className="grid grid-cols-[1.1rem_1fr] gap-x-3 py-4">
                  <Scale aria-hidden="true" size={16} className="mt-0.5 text-[rgb(var(--gold-rgb))]" />
                  <div><dt className="text-xs text-[rgba(var(--text-rgb),0.48)]">{t('marketplace.unit')}</dt><dd className="mt-1 font-semibold">{formatCatalogUnit(product.unit, t)}</dd></div>
                </div>
                <div className="grid grid-cols-[1.1rem_1fr] gap-x-3 py-4">
                  <FileCheck2 aria-hidden="true" size={16} className="mt-0.5 text-[rgb(var(--gold-rgb))]" />
                  <div><dt className="text-xs text-[rgba(var(--text-rgb),0.48)]">{t('marketplace.specification')}</dt><dd className="mt-1 leading-6">{localizedSpecification(product, lang)}</dd></div>
                </div>
              </dl>
              <Link
                to={`/contact#intent=procurement&sku=${encodeURIComponent(product.sku)}`}
                onClick={() => trackEvent('request_quote_click', { sku: product.sku, origin: product.originCountry, category: product.categoryId })}
                className="nss-btn-primary mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-bold"
              >
                {t('marketplace.requestQuote')}
                <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <aside className="mt-10 border-s-2 border-[rgb(var(--gold-rgb))] bg-[rgba(var(--gold-rgb),0.055)] px-6 py-5">
            <h2 className="nss-display text-lg">{t('marketplace.detailDisclaimerTitle')}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-[rgba(var(--text-rgb),0.58)]">{t('marketplace.detailDisclaimer')}</p>
          </aside>
        </Reveal>

        {related.length > 0 && (
          <section aria-labelledby="related-products-title" className="mt-20">
            <h2 id="related-products-title" className="nss-h2 text-3xl md:text-4xl">{t('marketplace.relatedTitle')}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {related.map((candidate, index) => <ProductCard key={candidate.sku} product={candidate} index={index} />)}
            </div>
          </section>
        )}
      </section>
    </main>
  )
}
