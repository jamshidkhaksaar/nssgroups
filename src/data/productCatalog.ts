import type { TranslationKey } from '@/i18n/translations/en'
import type { Lang } from '@/i18n/i18n'
import { PRODUCT_CATALOG } from './productCatalog.generated'
import type { CatalogCategoryId, CatalogOrigin, CatalogProduct } from './productCatalogTypes'

export { PRODUCT_CATALOG }
export type { CatalogCategoryId, CatalogOrigin, CatalogProduct }

export const CATALOG_CATEGORIES: CatalogCategoryId[] = [
  'food-staples',
  'fresh-produce',
  'dried-fruit',
  'spices-herbs',
  'textiles-handicrafts',
  'industrial-materials',
  'construction-materials',
  'agricultural-products',
  'supermarket-goods',
  'packaging',
]

export const CATEGORY_KEYS: Record<CatalogCategoryId, TranslationKey> = {
  'food-staples': 'marketplace.category.food-staples',
  'fresh-produce': 'marketplace.category.fresh-produce',
  'dried-fruit': 'marketplace.category.dried-fruit',
  'spices-herbs': 'marketplace.category.spices-herbs',
  'textiles-handicrafts': 'marketplace.category.textiles-handicrafts',
  'industrial-materials': 'marketplace.category.industrial-materials',
  'construction-materials': 'marketplace.category.construction-materials',
  'agricultural-products': 'marketplace.category.agricultural-products',
  'supermarket-goods': 'marketplace.category.supermarket-goods',
  packaging: 'marketplace.category.packaging',
}

export const ORIGIN_KEYS: Record<CatalogOrigin, TranslationKey> = {
  AF: 'marketplace.afghanistan',
  UZ: 'marketplace.uzbekistan',
}

export const CATEGORY_IMAGES: Record<CatalogCategoryId, string> = {
  'food-staples': './card_images/categories/food-staples.jpg',
  'fresh-produce': './card_images/categories/fresh-produce.jpg',
  'dried-fruit': './card_images/categories/dried-fruit.jpg',
  'spices-herbs': './card_images/categories/spices-herbs.png',
  'textiles-handicrafts': './card_images/categories/textiles-handicrafts.png',
  'industrial-materials': './card_images/categories/industrial-materials.jpg',
  'construction-materials': './card_images/categories/construction-materials.jpg',
  'agricultural-products': './card_images/categories/agricultural-products.png',
  'supermarket-goods': './card_images/categories/supermarket-goods.png',
  packaging: './card_images/categories/packaging.png',
}

export function getCategoryProductImage(product: CatalogProduct): string {
  return CATEGORY_IMAGES[product.categoryId] || product.representativeImage || './card_images/categories/food-staples.jpg'
}

const UNIT_KEYS: Record<string, TranslationKey> = {
  MT: 'marketplace.unit.MT',
  KG: 'marketplace.unit.KG',
  Carton: 'marketplace.unit.Carton',
  cartons: 'marketplace.unit.Carton',
  Gram: 'marketplace.unit.Gram',
  g: 'marketplace.unit.Gram',
  M2: 'marketplace.unit.M2',
  m2: 'marketplace.unit.M2',
  M3: 'marketplace.unit.M3',
  m3: 'marketplace.unit.M3',
  Meter: 'marketplace.unit.Meter',
  m: 'marketplace.unit.Meter',
  Pack: 'marketplace.unit.Pack',
  packs: 'marketplace.unit.Pack',
  Pair: 'marketplace.unit.Pair',
  pairs: 'marketplace.unit.Pair',
  Piece: 'marketplace.unit.Piece',
  pcs: 'marketplace.unit.Piece',
  Roll: 'marketplace.unit.Roll',
  rolls: 'marketplace.unit.Roll',
  Set: 'marketplace.unit.Set',
  sets: 'marketplace.unit.Set',
  String: 'marketplace.unit.String',
  strings: 'marketplace.unit.String',
  '1000 pcs': 'marketplace.unit.1000pcs',
}

export function findCatalogProduct(sku: string | undefined): CatalogProduct | undefined {
  if (!sku) return undefined
  return PRODUCT_CATALOG.find((product) => product.sku.toLocaleUpperCase() === sku.toLocaleUpperCase())
}

export function localizedProductName(product: CatalogProduct, lang: Lang): string {
  return product.name[lang] || product.name.en
}

export function localizedSpecification(product: CatalogProduct, lang: Lang): string {
  return product.specification[lang] || product.specification.en
}

export function formatCatalogUnit(
  unit: string,
  t: (key: TranslationKey) => string,
): string {
  const key = UNIT_KEYS[unit]
  return key ? t(key) : unit
}

export function formatCatalogMoq(
  moq: string,
  t: (key: TranslationKey) => string,
): string {
  const match = moq.match(/^([\d,.]+)\s+(.+)$/)
  if (!match) return moq
  const [, quantity, unit] = match
  return `${quantity} ${formatCatalogUnit(unit, t)}`
}
