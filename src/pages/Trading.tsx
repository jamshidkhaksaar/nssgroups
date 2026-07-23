import { Link } from 'react-router'
import { ArrowUpRight, Building2, Factory, PackageCheck, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { TranslationKey } from '@/i18n/translations/en'
import { useI18n } from '@/i18n/i18n'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'

type CatalogCategory = {
  key: TranslationKey
  poster: string
}

type CatalogProduct = {
  category: TranslationKey
  name: string
  origin: string
  factory: string
  moq: string
  leadTime: string
  packing: string
  poster: string
}

const CATEGORIES: CatalogCategory[] = [
  { key: 'categories.c1.title', poster: './card_images/extra/Construction Material.png' },
  { key: 'categories.c2.title', poster: './card_images/row1/industrial low materials.png' },
  { key: 'categories.c3.title', poster: './card_images/row1/Machinery.png' },
  { key: 'categories.c4.title', poster: './card_images/row1/Food Products.png' },
  { key: 'categories.c5.title', poster: './card_images/row1/Textile and clothing.png' },
  { key: 'categories.c6.title', poster: './card_images/row1/cleaning and hygen.png' },
  { key: 'categories.c7.title', poster: './card_images/row1/home applinces.png' },
  { key: 'categories.c8.title', poster: './card_images/row1/beauty and perfums.png' },
  { key: 'categories.c9.title', poster: './card_images/row1/baby and children.png' },
  { key: 'categories.c10.title', poster: './card_images/row1/packaging and printing.png' },
  // Original Categories
  { key: 'trading.cat.food', poster: './card_images/extra/Industrial Wheat Flour.png' },
  { key: 'trading.cat.fuel', poster: './card_images/extra/LPG Supply.png' },
  { key: 'trading.cat.construction', poster: './card_images/extra/Construction Material.png' },
  { key: 'trading.cat.plastics', poster: './card_images/extra/PVC Resin SG5.png' },
  { key: 'trading.cat.consumer', poster: './card_images/extra/Textiles & Consumer Goods.png' },
  { key: 'trading.cat.machinery', poster: './card_images/extra/Industrial Equipment.png' },
]

const PRODUCTS: CatalogProduct[] = [
  { category: 'categories.c2.title', name: 'Industrial Raw Materials', origin: 'Global', factory: 'Direct Sourcing', moq: 'By specification', leadTime: '15-30 days', packing: 'Bulk / Containers', poster: './card_images/row1/industrial low materials.png' },
  { category: 'categories.c3.title', name: 'Machinery & Equipment', origin: 'Global', factory: 'Verified Manufacturers', moq: '1 unit', leadTime: '30-45 days', packing: 'Export crates', poster: './card_images/row1/Machinery.png' },
  { category: 'categories.c4.title', name: 'Food Products', origin: 'Global', factory: 'Certified Producers', moq: '1 container', leadTime: '10-25 days', packing: 'Retail / Bulk', poster: './card_images/row1/Food Products.png' },
  { category: 'categories.c5.title', name: 'Textiles & Clothing', origin: 'Global', factory: 'Textile Mills', moq: 'By specification', leadTime: '15-30 days', packing: 'Export cartons', poster: './card_images/row1/Textile and clothing.png' },
  { category: 'categories.c6.title', name: 'Cleaning & Hygiene', origin: 'Global', factory: 'Chemical Plants', moq: '1 container', leadTime: '10-20 days', packing: 'Bottles / Drums', poster: './card_images/row1/cleaning and hygen.png' },
  { category: 'categories.c7.title', name: 'Home & Appliances', origin: 'Global', factory: 'Appliance Brands', moq: '1 container', leadTime: '20-40 days', packing: 'Retail packaging', poster: './card_images/row1/home applinces.png' },
  { category: 'categories.c8.title', name: 'Beauty & Perfumes', origin: 'Global', factory: 'Cosmetic Labs', moq: 'By specification', leadTime: '15-25 days', packing: 'Retail packaging', poster: './card_images/row1/beauty and perfums.png' },
  { category: 'categories.c9.title', name: 'Baby & Children', origin: 'Global', factory: 'Certified Producers', moq: '1 container', leadTime: '15-30 days', packing: 'Retail packaging', poster: './card_images/row1/baby and children.png' },
  { category: 'categories.c10.title', name: 'Packaging & Printing', origin: 'Global', factory: 'Printing Facilities', moq: 'By specification', leadTime: '10-20 days', packing: 'Palletized', poster: './card_images/row1/packaging and printing.png' },
  // Original Products
  { category: 'categories.c1.title', name: 'Portland Cement', origin: 'Uzbekistan', factory: 'Verified manufacturer', moq: '1 truckload', leadTime: '7–14 days', packing: '50 kg bags', poster: './card_images/extra/Portland Cement.png' },
  { category: 'trading.cat.plastics', name: 'PVC Resin SG5', origin: 'China', factory: 'Xinjiang Yihua Chemical', moq: '50 t', leadTime: '10–18 days', packing: '25 kg bags', poster: './card_images/extra/PVC Resin SG5.png' },
  { category: 'trading.cat.food', name: 'Industrial Wheat Flour', origin: 'Kazakhstan', factory: 'Regional milling partner', moq: '22 t', leadTime: '8–16 days', packing: '25 / 50 kg bags', poster: './card_images/extra/Industrial Wheat Flour.png' },
  { category: 'trading.cat.fuel', name: 'LPG Supply', origin: 'Turkmenistan', factory: 'Licensed energy supplier', moq: '1 tanker', leadTime: 'Route dependent', packing: 'Bulk tanker', poster: './card_images/extra/LPG Supply.png' },
  { category: 'trading.cat.consumer', name: 'Textiles & Consumer Goods', origin: 'Turkey', factory: 'Supplier network', moq: 'By specification', leadTime: '15–30 days', packing: 'Export cartons', poster: './card_images/extra/Textiles & Consumer Goods.png' },
  { category: 'trading.cat.machinery', name: 'Industrial Equipment', origin: 'China', factory: 'Factory-direct sourcing', moq: 'By specification', leadTime: '20–45 days', packing: 'Export crate', poster: './card_images/extra/Industrial Equipment.png' },
]

export default function Trading() {
  const { t } = useI18n()
  const [active, setActive] = useState<TranslationKey | 'all'>('all')
  const [query, setQuery] = useState('')

  const products = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase()
    return PRODUCTS.filter((product) => {
      const matchesCategory = active === 'all' || product.category === active
      const matchesQuery = !normalized || [product.name, product.origin, product.factory].join(' ').toLocaleLowerCase().includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [active, query])

  return (
    <main className="bg-[var(--bg)]">
      <PageHeader tagKey="trading.tag" headingKey="trading.heading" subKey="trading.sub" />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <p className="nss-section-tag">{t('trading.catalogTag')}</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="nss-h2 text-3xl md:text-5xl">{t('trading.catalogHeading')}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgba(var(--text-rgb),0.58)]">{t('trading.catalogSub')}</p>
            </div>
            <label className="relative block w-full max-w-sm">
              <span className="sr-only">{t('trading.catalogHeading')}</span>
              <Search size={16} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[rgb(var(--gold-rgb))]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-12 w-full border border-[rgba(var(--gold-rgb),0.22)] bg-[rgba(var(--text-rgb),0.04)] ps-11 pe-4 text-sm text-[rgb(var(--text-rgb))] outline-none transition-colors placeholder:text-[rgba(var(--text-rgb),0.45)] focus:border-[rgba(var(--gold-rgb),0.7)]"
                placeholder={t('trading.catalogSub')}
              />
            </label>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive('all')}
            className={`nss-mono border px-4 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors ${active === 'all' ? 'border-[rgb(var(--gold-rgb))] bg-[rgb(var(--gold-rgb))] text-[#1d1233]' : 'border-[rgba(var(--gold-rgb),0.25)] text-[rgba(var(--text-rgb),0.65)] hover:border-[rgba(var(--gold-rgb),0.7)]'}`}
          >
            {t('projects.cat.all')}
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActive(category.key)}
              className={`nss-mono border px-4 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors ${active === category.key ? 'border-[rgb(var(--gold-rgb))] bg-[rgb(var(--gold-rgb))] text-[#1d1233]' : 'border-[rgba(var(--gold-rgb),0.25)] text-[rgba(var(--text-rgb),0.65)] hover:border-[rgba(var(--gold-rgb),0.7)]'}`}
            >
              {t(category.key)}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.name} delay={(index % 3) * 70}>
              <article className="nss-card group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel-2)]">
                  <img src={product.poster} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgba(var(--bg-rgb),0.88)] to-transparent" />
                  <p className="nss-mono absolute bottom-4 start-5 text-[10px] tracking-[0.18em] text-[rgb(var(--gold-rgb))] uppercase">{t(product.category)}</p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="nss-display text-xl leading-snug">{product.name}</h3>
                  <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[rgba(var(--gold-rgb),0.12)] py-4 text-[12px] text-[rgba(var(--text-rgb),0.58)]">
                    <span className="flex items-center gap-2"><Building2 size={13} className="text-[rgb(var(--gold-rgb))]" />{product.origin}</span>
                    <span className="flex items-center gap-2"><Factory size={13} className="text-[rgb(var(--gold-rgb))]" />{product.factory}</span>
                    <span>{product.moq}</span><span>{product.leadTime}</span>
                  </div>
                  <p className="mt-4 text-[12px] text-[rgba(var(--text-rgb),0.48)]">{product.packing}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/contact" className="nss-btn-primary inline-flex items-center gap-2 rounded-sm px-4 py-2.5 text-xs font-bold">{t('trading.buy')} <ArrowUpRight size={14} /></Link>
                    <Link to="/booking" className="inline-flex items-center gap-2 border border-[rgba(var(--gold-rgb),0.32)] px-4 py-2.5 text-xs font-semibold text-[rgb(var(--gold-rgb))] transition-colors hover:border-[rgb(var(--gold-rgb))]">{t('booking.submit')} <PackageCheck size={14} /></Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="nss-mono mt-8 text-[11px] leading-relaxed tracking-[0.12em] text-[rgba(var(--text-rgb),0.45)] uppercase">{t('trading.note')}</p>
      </section>
    </main>
  )
}
