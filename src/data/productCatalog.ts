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
  'food-staples': './marketplace/categories/food-staples.webp',
  'fresh-produce': './marketplace/categories/fresh-produce.webp',
  'dried-fruit': './marketplace/categories/dried-fruit.webp',
  'spices-herbs': './marketplace/categories/spices-herbs.webp',
  'textiles-handicrafts': './marketplace/categories/textiles-handicrafts.webp',
  'industrial-materials': './marketplace/categories/industrial-materials.webp',
  'construction-materials': './marketplace/categories/construction-materials.webp',
  'agricultural-products': './marketplace/categories/agricultural-products.webp',
  'supermarket-goods': './marketplace/categories/supermarket-goods.webp',
  packaging: './marketplace/categories/packaging.webp',
}

export function getCategoryProductImage(product: CatalogProduct): string {
  // Per-product photo wins when present; otherwise fall back to the category
  // artwork. Unmatched products keep the old card_images path, so the check
  // for /marketplace/products/ lets the nicer category art show instead.
  if (product.representativeImage?.includes('/marketplace/products/')) {
    return product.representativeImage
  }
  return CATEGORY_IMAGES[product.categoryId] || product.representativeImage || './marketplace/categories/food-staples.webp'
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
