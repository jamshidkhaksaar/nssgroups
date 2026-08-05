import fs from 'node:fs/promises'
import path from 'node:path'
import readXlsxFile from 'read-excel-file/node'

const workbookPath = path.resolve('data/imports/NSS_Global_Marketplace_300_Product_Catalog.xlsx')
const outputPath = path.resolve('data/catalog-translations.json')
const cachePath = path.resolve('data/catalog-translation-cache.json')
const targetLanguages = ['fa', 'ps', 'ru', 'uz', 'ar', 'zh']
const languageCodes = {
  fa: 'fa',
  ps: 'ps',
  ru: 'ru',
  uz: 'uz',
  ar: 'ar',
  zh: 'zh-CN',
}

function value(row, headers, key) {
  return String(row[headers.indexOf(key)] ?? '').trim()
}

async function loadProducts() {
  const sheets = await readXlsxFile(workbookPath)
  const products = []

  for (const sheetName of ['Uzbekistan_150', 'Afghanistan_150']) {
    const sheet = sheets.find((entry) => entry.sheet === sheetName)
    if (!sheet) throw new Error(`Missing worksheet: ${sheetName}`)

    const [headerRow, ...rows] = sheet.data
    const headers = headerRow.map((cell) => String(cell ?? '').trim())

    for (const row of rows) {
      const sku = value(row, headers, 'SKU')
      if (!sku) continue
      products.push({
        sku,
        nameEn: value(row, headers, 'Product_EN'),
        nameFa: value(row, headers, 'Product_FA'),
        specification: value(row, headers, 'Grade_Spec'),
      })
    }
  }

  if (products.length !== 300) {
    throw new Error(`Expected 300 products, found ${products.length}`)
  }

  return products
}

async function translateOne(source, language) {
  const url = new URL('https://translate.googleapis.com/translate_a/single')
  url.search = new URLSearchParams({
    client: 'gtx',
    sl: 'en',
    tl: languageCodes[language],
    dt: 't',
    q: source,
  }).toString()

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Translation request failed (${response.status})`)
  }

  const payload = await response.json()
  const translated = String(payload[0]
    .map((segment) => segment[0])
    .join(''))
    .trim()

  if (!translated) throw new Error(`Empty translation response for ${language}`)

  return translated
}

async function translateWithRetry(source, language) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await translateOne(source, language)
    } catch (error) {
      if (attempt === 3) throw error
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000))
    }
  }

  throw new Error(`Unable to translate ${language}`)
}

async function runPool(items, concurrency, worker) {
  let cursor = 0
  const runners = Array.from({ length: concurrency }, async () => {
    while (cursor < items.length) {
      const current = cursor
      cursor += 1
      await worker(items[current], current)
    }
  })
  await Promise.all(runners)
}

async function main() {
  const products = await loadProducts()
  const translations = {}
  const cache = {}

  try {
    Object.assign(translations, JSON.parse(await fs.readFile(outputPath, 'utf8')))
  } catch {
    // A first run intentionally starts with an empty translation seed.
  }

  try {
    Object.assign(cache, JSON.parse(await fs.readFile(cachePath, 'utf8')))
  } catch {
    // The cache is optional and exists only to make interrupted runs resumable.
  }

  for (const language of targetLanguages) {
    cache[language] ??= {}
    const sourceStrings = [
      ...new Set(
        products.flatMap((product) =>
          language === 'fa'
            ? [product.specification]
            : [product.nameEn, product.specification],
        ),
      ),
    ]
    const missingStrings = sourceStrings.filter((source) => !cache[language][source])
    console.log(`${language}: ${missingStrings.length} unique strings require translation`)

    let completed = 0
    await runPool(missingStrings, 8, async (source) => {
      cache[language][source] = await translateWithRetry(source, language)
      completed += 1
      if (completed % 25 === 0 || completed === missingStrings.length) {
        console.log(`${language}: translated ${completed}/${missingStrings.length}`)
      }
    })
    await fs.mkdir(path.dirname(cachePath), { recursive: true })
    await fs.writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, 'utf8')

    for (const product of products) {
      translations[product.sku] ??= {}
      translations[product.sku][language] = {
        name: language === 'fa' ? product.nameFa : cache[language][product.nameEn],
        specification: cache[language][product.specification],
      }
    }

    await fs.writeFile(outputPath, `${JSON.stringify(translations, null, 2)}\n`, 'utf8')
  }

  console.log(`Catalog translations saved to ${path.relative(process.cwd(), outputPath)}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
