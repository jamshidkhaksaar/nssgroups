import { ArrowUpRight, MapPin, PackageCheck } from 'lucide-react'
import { Link } from 'react-router'
import Reveal from '@/components/Reveal'
import { useI18n } from '@/i18n/i18n'
import {
  CATEGORY_KEYS,
  ORIGIN_KEYS,
  formatCatalogMoq,
  formatCatalogUnit,
  getCategoryProductImage,
  localizedProductName,
  localizedSpecification,
  type CatalogProduct,
} from '@/data/productCatalog'
import { trackEvent } from '@/analytics/analytics'

interface ProductCardProps {
  product: CatalogProduct
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { t, lang } = useI18n()
  const name = localizedProductName(product, lang)
  const productImage = getCategoryProductImage(product)

  return (
    <Reveal delay={(index % 3) * 50}>
      <article className="nss-card group flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel-2)]">
          <img
            src={productImage}
            alt={`${name} — ${t('marketplace.representativeImage')}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(var(--bg-rgb),0.92)] to-transparent" />
          <span className="nss-mono absolute start-4 top-4 border border-[rgba(var(--gold-rgb),0.4)] bg-[rgba(var(--bg-rgb),0.88)] px-2.5 py-1 text-[9px] tracking-[0.12em] text-[rgb(var(--gold-rgb))] uppercase">
            {t('marketplace.representativeImage')}
          </span>
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <span className="nss-mono text-[10px] tracking-[0.15em] text-[rgb(var(--gold-rgb))] uppercase">
              {t(CATEGORY_KEYS[product.categoryId])}
            </span>
            <span dir="ltr" className="nss-mono text-[10px] text-[rgba(var(--text-rgb),0.7)]">{product.sku}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="nss-display text-xl leading-snug">{name}</h3>
            <span className="shrink-0 border border-[rgba(var(--gold-rgb),0.28)] px-2 py-1 text-[10px] font-bold text-[rgb(var(--gold-rgb))]">
              {product.originCountry}
            </span>
          </div>
          <p className="mt-3 line-clamp-2 min-h-10 text-xs leading-5 text-[rgba(var(--text-rgb),0.56)]">
            {localizedSpecification(product, lang)}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[rgba(var(--gold-rgb),0.12)] py-4 text-xs">
            <div>
              <dt className="flex items-center gap-1.5 text-[rgba(var(--text-rgb),0.46)]">
                <MapPin aria-hidden="true" size={12} className="text-[rgb(var(--gold-rgb))]" />
                {t('marketplace.origin')}
              </dt>
              <dd className="mt-1 font-semibold">{t(ORIGIN_KEYS[product.originCountry])}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[rgba(var(--text-rgb),0.46)]">
                <PackageCheck aria-hidden="true" size={12} className="text-[rgb(var(--gold-rgb))]" />
                {t('marketplace.moq')}
              </dt>
              <dd className="mt-1 font-semibold">{formatCatalogMoq(product.moq, t)}</dd>
            </div>
            <div className="col-span-2 border-t border-[rgba(var(--gold-rgb),0.1)] pt-3">
              <dt className="text-[rgba(var(--text-rgb),0.46)]">{t('marketplace.unit')}</dt>
              <dd className="mt-1 font-semibold">{formatCatalogUnit(product.unit, t)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-[11px] font-semibold text-[rgb(var(--gold-rgb))]">
            {t('marketplace.rfqOnly')}
          </p>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <Link
              to={`/marketplace/product/${product.sku}`}
              onClick={() => trackEvent('product_detail_click', { sku: product.sku, origin: product.originCountry, category: product.categoryId })}
              className="inline-flex min-h-10 items-center gap-2 border border-[rgba(var(--gold-rgb),0.34)] px-4 py-2 text-xs font-semibold text-[rgb(var(--gold-rgb))] transition-colors hover:border-[rgb(var(--gold-rgb))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--gold-rgb))]"
            >
              {t('marketplace.viewProduct')}
            </Link>
            <Link
              to={`/contact#intent=procurement&sku=${encodeURIComponent(product.sku)}`}
              onClick={() => trackEvent('request_quote_click', { sku: product.sku, origin: product.originCountry, category: product.categoryId })}
              className="nss-btn-primary inline-flex min-h-10 items-center gap-2 rounded-sm px-4 py-2 text-xs font-bold"
            >
              {t('marketplace.requestQuote')}
              <ArrowUpRight aria-hidden="true" size={14} />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
