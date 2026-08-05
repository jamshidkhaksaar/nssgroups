import type { Lang } from '@/i18n/i18n'

export type CatalogOrigin = 'AF' | 'UZ'

export type CatalogCategoryId =
  | 'food-staples'
  | 'fresh-produce'
  | 'dried-fruit'
  | 'spices-herbs'
  | 'textiles-handicrafts'
  | 'industrial-materials'
  | 'construction-materials'
  | 'agricultural-products'
  | 'supermarket-goods'
  | 'packaging'

export interface CatalogProduct {
  sku: string
  originCountry: CatalogOrigin
  categoryId: CatalogCategoryId
  name: Record<Lang, string>
  specification: Record<Lang, string>
  unit: string
  moq: string
  representativeImage: string
  priceStatus: 'RFQ_ONLY'
}
