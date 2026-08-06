import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

// Source photos live locally (gitignored); only the optimized webps ship.
const SOURCE_DIR = path.resolve('NSS Group')
const OUTPUT_DIR = path.resolve('public/marketplace/products')

// NSS Group folder name → catalog categoryId (note the "Supermaket" typo).
const CATEGORY_FOLDER_MAP = {
  'Agricultural Products': 'agricultural-products',
  'Construction Materials': 'construction-materials',
  'Dried Fruit & Nuts': 'dried-fruit',
  'Food Staples': 'food-staples',
  'Fresh Produce': 'fresh-produce',
  'Industrial Materials': 'industrial-materials',
  'Packaging': 'packaging',
  'Spices & Herbs': 'spices-herbs',
  'Supermaket Goods': 'supermarket-goods',
  'Textiles & Handicrafts': 'textiles-handicrafts',
}

const MAX_EDGE = 1600
const WEBP_QUALITY = 85

/**
 * Slugify a product/photo name into a safe filename token.
 * "Green Cumin..png" → "green-cumin", "Urea 46%" → "urea-46",
 * "Women's T-Shirt" → "womens-t-shirt", "Tomato Paste 28-30 Brix" → "tomato-paste-28-30-brix".
 */
export function slugify(input) {
  return input
    .toLowerCase()
    .replace(/\.\.+/g, ' ') // "Green Cumin.." → "green cumin "
    .replace(/\./g, ' ') // leftover single dots
    .replace(/['’&%(),]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function getFiles(dir) {
  const subdirs = await fs.promises.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    subdirs.map((subdir) => {
      const res = path.resolve(dir, subdir.name)
      return subdir.isDirectory() ? getFiles(res) : res
    })
  )
  return files.flat()
}

async function convert() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source folder not found: ${SOURCE_DIR}`)
    process.exit(1)
  }
  await fs.promises.mkdir(OUTPUT_DIR, { recursive: true })

  const allFiles = await getFiles(SOURCE_DIR)
  const imageFiles = allFiles.filter((f) => /\.(png|jpg|jpeg)$/i.test(f))

  // Resolve per-category duplicate names: "Name..png" loses to "Name.png".
  const byCategory = new Map()
  for (const file of imageFiles) {
    const rel = path.relative(SOURCE_DIR, file)
    const [folder, filename] = rel.split(path.sep)
    const categoryId = CATEGORY_FOLDER_MAP[folder]
    if (!categoryId) {
      console.warn(`⚠ Skipping unknown folder: ${folder}`)
      continue
    }
    if (!byCategory.has(categoryId)) byCategory.set(categoryId, new Map())
    byCategory.get(categoryId).set(filename.toLowerCase(), { file, filename })
  }

  let totalOriginal = 0
  let totalConverted = 0
  let converted = 0
  let skipped = 0
  const categorySamples = new Map()

  for (const [categoryId, files] of byCategory) {
    // De-dup: prefer the single-dot variant of any name ("Green Cumin..png"
    // loses to "Green Cumin.png").
    const keep = []
    const seen = new Set()
    for (const [key, entry] of files) {
      const base = key.replace(/\.(png|jpg|jpeg)$/i, '')
      // "Name..png" strips to "Name." — a trailing dot marks the duplicate.
      if (base.endsWith('.')) {
        skipped++
        continue
      }
      if (seen.has(base)) {
        skipped++
        continue
      }
      seen.add(base)
      keep.push(entry)
    }

    const outDir = path.join(OUTPUT_DIR, categoryId)
    await fs.promises.mkdir(outDir, { recursive: true })

    for (const { file, filename } of keep) {
      const base = filename.replace(/\.(png|jpg|jpeg)$/i, '')
      const slug = slugify(base)
      if (!slug) {
        skipped++
        console.warn(`⚠ Skipped ${filename}: slugified to empty`)
        continue
      }
      const outFile = path.join(outDir, `${slug}.webp`)

      try {
        const input = await fs.promises.readFile(file)
        const origSize = input.length
        const metadata = await sharp(input).metadata()

        let pipeline = sharp(input)
        if (metadata.width > MAX_EDGE || metadata.height > MAX_EDGE) {
          pipeline = pipeline.resize({
            width: metadata.width > metadata.height ? MAX_EDGE : undefined,
            height: metadata.height >= metadata.width ? MAX_EDGE : undefined,
            fit: 'inside',
            withoutEnlargement: true,
          })
        }

        const out = await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer()
        await fs.promises.writeFile(outFile, out)

        totalOriginal += origSize
        totalConverted += out.length
        converted++
        const pct = ((1 - out.length / origSize) * 100).toFixed(1)
        console.log(`✓ ${categoryId}/${slug}.webp: ${(origSize / 1024).toFixed(0)} KB → ${(out.length / 1024).toFixed(0)} KB (-${pct}%)`)

        if (!categorySamples.has(categoryId)) {
          categorySamples.set(categoryId, `${slug}.webp`)
        }
      } catch (err) {
        skipped++
        console.error(`✗ Error converting ${filename}:`, err.message)
      }
    }
  }

  console.log('\n===================================');
  console.log(`Converted ${converted} images, skipped ${skipped}`);
  console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP total:     ${(totalConverted / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${((1 - totalConverted / totalOriginal) * 100).toFixed(1)}%`);
  console.log('===================================\n');
  console.log('Category sample images (for home cards):');
  for (const [cat, slug] of categorySamples) console.log(`  ${cat}: ${slug}`)
}

// Only run the conversion when executed directly (not when imported by
// import-product-catalog.mjs for the slugify helper).
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) {
  convert()
}
