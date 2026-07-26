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
  nameKey: TranslationKey
  originKey: TranslationKey
  factoryKey: TranslationKey
  moqKey: TranslationKey
  leadTimeKey: TranslationKey
  packingKey: TranslationKey
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
  { category: 'categories.c2.title', nameKey: 'categories.c2.title', originKey: 'catalog.origin.global', factoryKey: 'catalog.factory.directSourcing', moqKey: 'catalog.moq.bySpecification', leadTimeKey: 'catalog.lead.days15to30', packingKey: 'catalog.packing.bulkContainers', poster: './card_images/row1/industrial low materials.png' },
  { category: 'categories.c3.title', nameKey: 'categories.c3.title', originKey: 'catalog.origin.global', factoryKey: 'catalog.factory.verifiedManufacturers', moqKey: 'catalog.moq.oneUnit', leadTimeKey: 'catalog.lead.days30to45', packingKey: 'catalog.packing.exportCrates', poster: './card_images/row1/Machinery.png' },
  { category: 'categories.c4.title', nameKey: 'categories.c4.title', originKey: 'catalog.origin.global', factoryKey: 'catalog.factory.certifiedProducers', moqKey: 'catalog.moq.oneContainer', leadTimeKey: 'catalog.lead.days10to25', packingKey: 'catalog.packing.retailBulk', poster: './card_images/row1/Food Products.png' },
  { category: 'categories.c5.title', nameKey: 'categories.c5.title', originKey: 'catalog.origin.global', factoryKey: 'catalog.factory.textileMills', moqKey: 'catalog.moq.bySpecification', leadTimeKey: 'catalog.lead.days15to30', packingKey: 'catalog.packing.exportCartons', poster: './card_images/row1/Textile and clothing.png' },
  { category: 'categories.c6.title', nameKey: 'categories.c6.title', originKey: 'catalog.origin.global', factoryKey: 'catalog.factory.chemicalPlants', moqKey: 'catalog.moq.oneContainer', leadTimeKey: 'catalog.lead.days10to20', packingKey: 'catalog.packing.bottlesDrums', poster: './card_images/row1/cleaning and hygen.png' },
  { category: 'categories.c7.title', nameKey: 'categories.c7.title', originKey: 'catalog.origin.global', factoryKey: 'catalog.factory.applianceBrands', moqKey: 'catalog.moq.oneContainer', leadTimeKey: 'catalog.lead.days20to40', packingKey: 'catalog.packing.retailPackaging', poster: './card_images/row1/home applinces.png' },
  { category: 'categories.c8.title', nameKey: 'categories.c8.title', originKey: 'catalog.origin.global', factoryKey: 'catalog.factory.cosmeticLabs', moqKey: 'catalog.moq.bySpecification', leadTimeKey: 'catalog.lead.days15to25', packingKey: 'catalog.packing.retailPackaging', poster: './card_images/row1/beauty and perfums.png' },
  { category: 'categories.c9.title', nameKey: 'categories.c9.title', originKey: 'catalog.origin.global', factoryKey: 'catalog.factory.certifiedProducers', moqKey: 'catalog.moq.oneContainer', leadTimeKey: 'catalog.lead.days15to30', packingKey: 'catalog.packing.retailPackaging', poster: './card_images/row1/baby and children.png' },
  { category: 'categories.c10.title', nameKey: 'categories.c10.title', originKey: 'catalog.origin.global', factoryKey: 'catalog.factory.printingFacilities', moqKey: 'catalog.moq.bySpecification', leadTimeKey: 'catalog.lead.days10to20', packingKey: 'catalog.packing.palletized', poster: './card_images/row1/packaging and printing.png' },
  // Original Products
  { category: 'categories.c1.title', nameKey: 'catalog.product.portlandCement', originKey: 'catalog.origin.uzbekistan', factoryKey: 'catalog.factory.verifiedManufacturer', moqKey: 'catalog.moq.oneTruckload', leadTimeKey: 'catalog.lead.days7to14', packingKey: 'catalog.packing.bags50kg', poster: './card_images/extra/Portland Cement.png' },
  { category: 'trading.cat.plastics', nameKey: 'catalog.product.pvcResin', originKey: 'catalog.origin.china', factoryKey: 'catalog.factory.xinjiang', moqKey: 'catalog.moq.fiftyTonnes', leadTimeKey: 'catalog.lead.days10to18', packingKey: 'catalog.packing.bags25kg', poster: './card_images/extra/PVC Resin SG5.png' },
  { category: 'trading.cat.food', nameKey: 'catalog.product.wheatFlour', originKey: 'catalog.origin.kazakhstan', factoryKey: 'catalog.factory.regionalMilling', moqKey: 'catalog.moq.twentyTwoTonnes', leadTimeKey: 'catalog.lead.days8to16', packingKey: 'catalog.packing.bags25or50kg', poster: './card_images/extra/Industrial Wheat Flour.png' },
  { category: 'trading.cat.fuel', nameKey: 'catalog.product.lpgSupply', originKey: 'catalog.origin.turkmenistan', factoryKey: 'catalog.factory.licensedEnergy', moqKey: 'catalog.moq.oneTanker', leadTimeKey: 'catalog.lead.routeDependent', packingKey: 'catalog.packing.bulkTanker', poster: './card_images/extra/LPG Supply.png' },
  { category: 'trading.cat.consumer', nameKey: 'catalog.product.textiles', originKey: 'catalog.origin.turkey', factoryKey: 'catalog.factory.supplierNetwork', moqKey: 'catalog.moq.bySpecification', leadTimeKey: 'catalog.lead.days15to30', packingKey: 'catalog.packing.exportCartons', poster: './card_images/extra/Textiles & Consumer Goods.png' },
  { category: 'trading.cat.machinery', nameKey: 'catalog.product.industrialEquipment', originKey: 'catalog.origin.china', factoryKey: 'catalog.factory.factoryDirect', moqKey: 'catalog.moq.bySpecification', leadTimeKey: 'catalog.lead.days20to45', packingKey: 'catalog.packing.exportCrate', poster: './card_images/extra/Industrial Equipment.png' },
]

export default function Trading() {
  const { t } = useI18n()
  const [active, setActive] = useState<TranslationKey | 'all'>('all')
  const [query, setQuery] = useState('')

  const products = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase()
    return PRODUCTS.filter((product) => {
      const matchesCategory = active === 'all' || product.category === active
      const matchesQuery =
        !normalized ||
        [t(product.nameKey), t(product.originKey), t(product.factoryKey)]
          .join(' ')
          .toLocaleLowerCase()
          .includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [active, query, t])

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
            <Reveal key={product.nameKey} delay={(index % 3) * 70}>
              <article className="nss-card group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel-2)]">
                  <img src={product.poster} alt={t(product.nameKey)} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgba(var(--bg-rgb),0.88)] to-transparent" />
                  <p className="nss-mono absolute bottom-4 start-5 text-[10px] tracking-[0.18em] text-[rgb(var(--gold-rgb))] uppercase">{t(product.category)}</p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="nss-display text-xl leading-snug">{t(product.nameKey)}</h3>
                  <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[rgba(var(--gold-rgb),0.12)] py-4 text-[12px] text-[rgba(var(--text-rgb),0.58)]">
                    <span className="flex items-center gap-2"><Building2 size={13} className="text-[rgb(var(--gold-rgb))]" />{t(product.originKey)}</span>
                    <span className="flex items-center gap-2"><Factory size={13} className="text-[rgb(var(--gold-rgb))]" />{t(product.factoryKey)}</span>
                    <span>{t(product.moqKey)}</span><span>{t(product.leadTimeKey)}</span>
                  </div>
                  <p className="mt-4 text-[12px] text-[rgba(var(--text-rgb),0.48)]">{t(product.packingKey)}</p>
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
