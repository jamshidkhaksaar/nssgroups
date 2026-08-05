import fs from 'node:fs/promises'
import path from 'node:path'
import readXlsxFile from 'read-excel-file/node'

const workbookPath = path.resolve('data/imports/NSS_Global_Marketplace_300_Product_Catalog.xlsx')
const translationsPath = path.resolve('data/catalog-translations.json')
const outputPath = path.resolve('src/data/productCatalog.generated.ts')
const isCheckOnly = process.argv.includes('--check')
const languages = ['en', 'fa', 'ps', 'ru', 'uz', 'ar', 'zh']

const categoryImages = {
  'food-staples': '/card_images/row1/Food Products.png',
  'fresh-produce': '/card_images/row1/Food Products.png',
  'dried-fruit': '/card_images/row1/Food Products.png',
  'spices-herbs': '/card_images/row1/Food Products.png',
  'textiles-handicrafts': '/card_images/row1/Textile and clothing.png',
  'industrial-materials': '/card_images/row1/industrial low materials.png',
  'construction-materials': '/card_images/extra/Construction Material.png',
  'agricultural-products': '/card_images/row1/Food Products.png',
  'supermarket-goods': '/card_images/extra/Textiles & Consumer Goods.png',
  packaging: '/card_images/row1/packaging and printing.png',
}

function value(row, headers, key) {
  return String(row[headers.indexOf(key)] ?? '').trim()
}

function categoryFor(sourceCategory, productName) {
  const directMap = {
    خشکبار: 'dried-fruit',
    'ادویه و گیاهان': 'spices-herbs',
    'محصولات زراعتی': 'agricultural-products',
    'مواد خوراکه': 'food-staples',
    'پوشاک و صنایع دستی': 'textiles-handicrafts',
    'مواد خام فابریکه': 'industrial-materials',
    'مواد ساختمانی': 'construction-materials',
    سوپرمارکیت: 'supermarket-goods',
    ادویه: 'spices-herbs',
    'پنبه و نساجی': 'textiles-handicrafts',
    بسته‌بندی: 'packaging',
  }

  if (sourceCategory === 'میوه و سبزی') {
    return /(raisin|dried|walnut|almond|peanut)/i.test(productName)
      ? 'dried-fruit'
      : 'fresh-produce'
  }

  const category = directMap[sourceCategory]
  if (!category) throw new Error(`Unmapped category "${sourceCategory}": ${productName}`)
  return category
}

async function main() {
  const sheets = await readXlsxFile(workbookPath)
  const translationSeed = JSON.parse(await fs.readFile(translationsPath, 'utf8'))
  const products = []
  const seen = new Set()
  const countryCounts = { AF: 0, UZ: 0 }

  for (const sheetName of ['Uzbekistan_150', 'Afghanistan_150']) {
    const sheet = sheets.find((entry) => entry.sheet === sheetName)
    if (!sheet) throw new Error(`Missing worksheet: ${sheetName}`)

    const [headerRow, ...rows] = sheet.data
    const headers = headerRow.map((cell) => String(cell ?? '').trim())

    for (const row of rows) {
      const sku = value(row, headers, 'SKU')
      if (!sku) continue
      if (seen.has(sku)) throw new Error(`Duplicate SKU: ${sku}`)
      seen.add(sku)

      const originCountry = sku.startsWith('AF-') ? 'AF' : sku.startsWith('UZ-') ? 'UZ' : null
      if (!originCountry) throw new Error(`Invalid SKU country prefix: ${sku}`)
      countryCounts[originCountry] += 1

      const nameEn = value(row, headers, 'Product_EN')
      const nameFa = value(row, headers, 'Product_FA')
      const sourceCategory = value(row, headers, 'Category')
      const specificationEn = value(row, headers, 'Grade_Spec')
      const unit = value(row, headers, 'Unit')
      const moq = value(row, headers, 'MOQ')
      const localizedSeed = translationSeed[sku]

      if (!nameEn || !nameFa || !sourceCategory || !specificationEn || !unit || !moq) {
        throw new Error(`Missing required public field for ${sku}`)
      }

      for (const language of languages.filter((language) => language !== 'en')) {
        if (!localizedSeed?.[language]?.name || !localizedSeed?.[language]?.specification) {
          throw new Error(`Missing ${language} translation for ${sku}`)
        }
      }

      const categoryId = categoryFor(sourceCategory, nameEn)
      products.push({
        sku,
        originCountry,
        categoryId,
        name: {
          en: nameEn,
          fa: nameFa,
          ps: localizedSeed.ps.name,
          ru: localizedSeed.ru.name,
          uz: localizedSeed.uz.name,
          ar: localizedSeed.ar.name,
          zh: localizedSeed.zh.name,
        },
        specification: {
          en: specificationEn,
          fa: localizedSeed.fa.specification,
          ps: localizedSeed.ps.specification,
          ru: localizedSeed.ru.specification,
          uz: localizedSeed.uz.specification,
          ar: localizedSeed.ar.specification,
          zh: localizedSeed.zh.specification,
        },
        unit,
        moq,
        representativeImage: categoryImages[categoryId],
        priceStatus: 'RFQ_ONLY',
      })
    }
  }

  if (products.length !== 300) throw new Error(`Expected 300 products, found ${products.length}`)
  if (countryCounts.AF !== 150 || countryCounts.UZ !== 150) {
    throw new Error(`Expected 150 products per country, found AF=${countryCounts.AF}, UZ=${countryCounts.UZ}`)
  }

  const serialized = JSON.stringify(products, null, 2)
  const prohibitedFields = [
    'Indicative_Low_USD',
    'Indicative_High_USD',
    'Midpoint_USD',
    'Source_URL',
    'Image_Search_Keyword',
    'Notes',
  ]
  for (const field of prohibitedFields) {
    if (serialized.includes(field)) throw new Error(`Public catalog contains prohibited field: ${field}`)
  }

  const output = `import type { CatalogProduct } from './productCatalogTypes'\n\nexport const PRODUCT_CATALOG = ${serialized} satisfies CatalogProduct[]\n`

  if (isCheckOnly) {
    const existing = await fs.readFile(outputPath, 'utf8')
    if (existing !== output) throw new Error('Generated catalog is stale. Run npm run catalog:import.')
  } else {
    await fs.writeFile(outputPath, output, 'utf8')
  }

  console.log(`Validated ${products.length} RFQ-only products (AF=${countryCounts.AF}, UZ=${countryCounts.UZ})`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
