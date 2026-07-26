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
  const name = (product.name.en || '').toLowerCase()

  // Specific Product Image Mappings for distinct realistic visuals
  if (name.includes('flour')) return './card_images/products/flour.jpg'
  if (name.includes('wheat') || name.includes('grain')) return './card_images/products/wheat.jpg'
  if (name.includes('sunflower oil') || name.includes('oil')) return './card_images/products/sunflower-oil.jpg'
  if (name.includes('rice') || name.includes('basmati')) return './card_images/products/rice.jpg'
  if (name.includes('chickpea') || name.includes('lentil') || name.includes('bean') || name.includes('pea')) return './card_images/products/legumes.jpg'
  if (name.includes('grape') || name.includes('pomegranate') || name.includes('melon') || name.includes('apple') || name.includes('fruit')) return './card_images/products/grapes.jpg'
  
  if (name.includes('lpg') || name.includes('gas') || name.includes('petroleum')) return './card_images/extra/LPG Supply.png'
  if (name.includes('pvc') || name.includes('resin') || name.includes('polymer')) return './card_images/extra/PVC Resin SG5.png'
  if (name.includes('cement') || name.includes('portland')) return './card_images/extra/Portland Cement.png'
  if (name.includes('rebar') || name.includes('pipe') || name.includes('steel') || name.includes('construction') || name.includes('building')) return './card_images/extra/Construction Material.png'
  if (name.includes('machinery') || name.includes('equipment') || name.includes('engine') || name.includes('motor')) return './card_images/extra/Industrial Equipment.png'
  if (name.includes('cotton') || name.includes('fabric') || name.includes('carpet') || name.includes('textile') || name.includes('yarn')) return './card_images/extra/Textiles & Consumer Goods.png'
  if (name.includes('saffron') || name.includes('spice') || name.includes('herb') || name.includes('seed')) return './card_images/categories/spices-herbs.png'
  if (name.includes('almond') || name.includes('walnut') || name.includes('raisin') || name.includes('pistachio') || name.includes('fig')) return './card_images/categories/dried-fruit.jpg'
  if (name.includes('soap') || name.includes('clean') || name.includes('detergent') || name.includes('hygiene')) return './card_images/row1/cleaning and hygen.png'
  if (name.includes('package') || name.includes('sack') || name.includes('box') || name.includes('carton') || name.includes('print')) return './card_images/row1/packaging and printing.png'

  // Fallback to unified category image
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
