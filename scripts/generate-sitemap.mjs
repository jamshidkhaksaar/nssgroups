// Generates public/sitemap.xml from the static public routes plus every product
// SKU in the generated catalog. Run standalone via `npm run sitemap` or as part
// of `npm run build` (wired in package.json before the Vite build).
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SITE_URL = 'https://nssgroupint.com'

// Static public marketing routes (must mirror the <Route> list in src/App.tsx).
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/company-portfolio', priority: '0.6', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/fleet', priority: '0.6', changefreq: 'monthly' },
  { path: '/network', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/marketplace', priority: '0.9', changefreq: 'weekly' },
  { path: '/booking', priority: '0.7', changefreq: 'monthly' },
  { path: '/projects', priority: '0.6', changefreq: 'monthly' },
  { path: '/tracking', priority: '0.4', changefreq: 'yearly' },
]

function extractSkus() {
  const src = readFileSync(resolve(ROOT, 'src/data/productCatalog.generated.ts'), 'utf8')
  const skus = [...src.matchAll(/"sku":\s*"([^"]+)"/g)].map((m) => m[1])
  return [...new Set(skus)]
}

function urlEntry(path, priority, changefreq, lastmod) {
  return [
    '  <url>',
    `    <loc>${SITE_URL}${path}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

const lastmod = new Date().toISOString().slice(0, 10)
const skus = extractSkus()

const entries = [
  ...STATIC_ROUTES.map((r) => urlEntry(r.path, r.priority, r.changefreq, lastmod)),
  ...skus.map((sku) =>
    urlEntry(`/marketplace/product/${encodeURIComponent(sku)}`, '0.5', 'monthly', lastmod),
  ),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`

writeFileSync(resolve(ROOT, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml written: ${STATIC_ROUTES.length} static routes + ${skus.length} products`)
