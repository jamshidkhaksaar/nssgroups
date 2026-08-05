// Postbuild SEO prerenderer for the static Vite deployment.
// The React app remains the interactive layer, while these documents give
// crawlers and link previews meaningful headings, links, metadata and schema
// before JavaScript executes.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')
const SITE_URL = 'https://nssgroupint.com'
const BRAND = 'NSS International Group'
const OG_IMAGE = `${SITE_URL}/hero/nss-marketplace-hero.webp`

if (!existsSync(resolve(DIST, 'index.html'))) {
  console.warn('inject-route-meta: dist/index.html not found — skipping (build first).')
  process.exit(0)
}

const enSrc = readFileSync(resolve(ROOT, 'src/i18n/translations/en.ts'), 'utf8')
const catalogSrc = readFileSync(resolve(ROOT, 'src/data/productCatalog.generated.ts'), 'utf8')

function t(key) {
  const re = new RegExp(`'${key.replace(/\./g, '\\.')}'\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's')
  const match = enSrc.match(re)
  return match ? match[1].replace(/\\'/g, "'").replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim() : key
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

function loadCatalog() {
  const match = catalogSrc.match(/export const PRODUCT_CATALOG = (\[[\s\S]*?\]) satisfies CatalogProduct\[\]/)
  if (!match) throw new Error('inject-route-meta: unable to read generated catalog')
  return JSON.parse(match[1])
}

const catalog = loadCatalog()
const categoryNames = {
  'food-staples': t('marketplace.category.food-staples'),
  'fresh-produce': t('marketplace.category.fresh-produce'),
  'dried-fruit': t('marketplace.category.dried-fruit'),
  'spices-herbs': t('marketplace.category.spices-herbs'),
  'textiles-handicrafts': t('marketplace.category.textiles-handicrafts'),
  'industrial-materials': t('marketplace.category.industrial-materials'),
  'construction-materials': t('marketplace.category.construction-materials'),
  'agricultural-products': t('marketplace.category.agricultural-products'),
  'supermarket-goods': t('marketplace.category.supermarket-goods'),
  packaging: t('marketplace.category.packaging'),
}

const originNames = { AF: t('marketplace.afghanistan'), UZ: t('marketplace.uzbekistan') }

const PUBLIC_ROUTES = [
  { path: '/', title: 'Global freight, sourcing and logistics', description: 'NSS International Group coordinates responsible sourcing, multimodal transport and construction services across Central Asia and international corridors.', h1: 'Your cargo, our responsibility.', links: ['/marketplace', '/services', '/about', '/contact'] },
  { path: '/about', title: t('nav.about'), description: t('about.sub'), h1: t('nav.about'), links: ['/company-portfolio', '/projects', '/contact'] },
  { path: '/company-portfolio', title: t('nav.company'), description: t('portfolio.lead'), h1: t('nav.company'), links: ['/about', '/services', '/contact'] },
  { path: '/services', title: t('nav.services'), description: t('services.sub'), h1: t('nav.services'), links: ['/booking', '/tracking', '/contact'] },
  { path: '/fleet', title: t('nav.fleet'), description: t('fleet.sub'), h1: t('nav.fleet'), links: ['/services', '/contact'] },
  { path: '/network', title: t('nav.network'), description: t('network.sub'), h1: t('nav.network'), links: ['/about', '/services', '/contact'] },
  { path: '/contact', title: t('nav.contact'), description: t('contact.sub'), h1: t('nav.contact'), links: ['/services', '/booking', '/marketplace'] },
  { path: '/marketplace', title: t('nav.marketplace'), description: t('marketplace.page.description'), h1: t('marketplace.page.title'), links: ['/contact', '/services', '/tracking'] },
  { path: '/booking', title: t('nav.booking'), description: t('booking.sub'), h1: t('nav.booking'), links: ['/services', '/contact', '/tracking'] },
  { path: '/projects', title: t('nav.projects'), description: t('projects.sub'), h1: t('nav.projects'), links: ['/about', '/company-portfolio', '/contact'] },
  { path: '/tracking', title: t('nav.tracking'), description: t('tracking.sub'), h1: t('nav.tracking'), links: ['/services', '/contact', '/booking'] },
]

const PRIVATE_ROUTES = ['/portal', '/admin', '/client-portal', '/partner-portal', '/login', '/login/admin', '/login/client', '/login/partner', '/register']
const template = readFileSync(resolve(DIST, 'index.html'), 'utf8')

function replaceHead(html, { title, description, canonical, noindex = false }) {
  const titleValue = escapeHtml(title.length > 60 ? `${title.slice(0, 57).replace(/\s+\S*$/, '')}…` : title)
  const descriptionValue = escapeHtml(description.slice(0, 158))
  let result = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${titleValue}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[\s\S]*?("\s*\/?\s*>)/, `$1${descriptionValue}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[\s\S]*?("\s*\/?\s*>)/, `$1${titleValue}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[\s\S]*?("\s*\/?\s*>)/, `$1${descriptionValue}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[\s\S]*?("\s*\/?\s*>)/, `$1${titleValue}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[\s\S]*?("\s*\/?\s*>)/, `$1${descriptionValue}$2`)
  result = result.replace(/\s*<meta name="robots"[^>]*>/i, '')
  if (noindex) result = result.replace('</head>', '    <meta name="robots" content="noindex,follow" />\n  </head>')
  return result
}

function addBody(html, body) {
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

function navLinks(links) {
  return `<nav aria-label="Primary"><a href="/">Home</a>${links.map((path) => `<a href="${path}">${escapeHtml(path === '/marketplace' ? t('nav.marketplace') : path.slice(1).replace(/-/g, ' '))}</a>`).join('')}</nav>`
}

function staticBody(route) {
  const links = navLinks(route.links)
  const globalLinks = navLinks(PUBLIC_ROUTES.filter((candidate) => candidate.path !== route.path).map((candidate) => candidate.path))
  const catalogLinks = route.path === '/marketplace'
    ? `<section><h2>Browse the catalogue</h2><p>Explore the Afghanistan and Uzbekistan product catalogue by SKU. Every listing is RFQ-only and subject to supplier confirmation.</p><div>${catalog.map((product) => `<a href="/marketplace/product/${encodeURIComponent(product.sku)}">${escapeHtml(product.sku)} — ${escapeHtml(product.name.en)}</a>`).join('')}</div></section>`
    : ''
  const operatingModel = '<section><h2>How NSS coordinates work</h2><p>NSS International Group connects customers, suppliers and transport partners through a governed request process. We clarify the commercial requirement, review origin and destination constraints, coordinate documentation, and seek suitable offers from the relevant business or logistics partners. The final scope depends on the confirmed request, corridor, equipment, dates, compliance requirements and agreed commercial role.</p><p>Public information on this site is designed to start a professional conversation. A service page, project reference or marketplace listing does not publish a binding price, guarantee stock, reserve capacity or replace a written quotation and contract. Customers can use the enquiry, booking and tracking pathways to share requirements, request clarification and follow an approved shipment. NSS may ask for additional specifications or documents before confirming what can be supported.</p><p>Our teams work across Afghanistan, Uzbekistan, Central Asia and international destinations with a focus on transparent assumptions, responsible coordination and practical source-to-destination planning.</p></section>'
  const contactGuidance = route.path === '/contact'
    ? '<section><h2>Prepare an enquiry</h2><p>Share the product or cargo description, origin, destination, quantity, unit, preferred dates, specifications and any available documents. NSS reviews each request, confirms the practical requirements, sources suitable supplier or carrier offers, and returns a written quotation for your review. A contact form submission is an enquiry only: it does not reserve capacity, create a binding order, publish a price or guarantee availability.</p><p>For transport requests, include the mode, equipment, loading window, cargo dimensions or weight, customs points and delivery location. For marketplace products, the SKU helps our team identify the correct catalogue record while supplier confirmation and compliance checks are completed.</p></section>'
    : ''
  return `<main data-seo-prerender="true"><p>NSS International Group</p><h1>${escapeHtml(route.h1)}</h1><p>${escapeHtml(route.description)}</p>${operatingModel}${contactGuidance}${catalogLinks}${links}${globalLinks}<footer><a href="/contact">Contact NSS</a></footer></main>`
}

function productBody(product) {
  const name = product.name.en
  const category = categoryNames[product.categoryId] || product.categoryId
  const origin = originNames[product.originCountry] || product.originCountry
  const canonical = `${SITE_URL}/marketplace/product/${encodeURIComponent(product.sku)}`
  const image = `${SITE_URL}${product.representativeImage.startsWith('/') ? product.representativeImage : `/${product.representativeImage.replace(/^\.\//, '')}`}`
  const related = catalog.filter((candidate) => candidate.sku !== product.sku && candidate.categoryId === product.categoryId).slice(0, 3)
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Product', name, sku: product.sku, image, description: product.specification.en, category, countryOfOrigin: origin, brand: { '@type': 'Brand', name: BRAND } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE_URL}/marketplace` }, { '@type': 'ListItem', position: 3, name, item: canonical }] },
  ]
  const relatedLinks = related.map((candidate) => `<a href="/marketplace/product/${encodeURIComponent(candidate.sku)}">${escapeHtml(candidate.name.en)}</a>`).join('')
  return `<main data-seo-prerender="true"><p>RFQ marketplace product</p><h1>${escapeHtml(name)}</h1><p>SKU ${escapeHtml(product.sku)} · ${escapeHtml(origin)} · ${escapeHtml(category)}</p><p>${escapeHtml(product.specification.en)}</p><dl><dt>Minimum order</dt><dd>${escapeHtml(product.moq)}</dd><dt>Quoted unit</dt><dd>${escapeHtml(product.unit)}</dd><dt>Availability</dt><dd>Supplier quote required</dd></dl><p>NSS coordinates supplier confirmation, compliance review and transport planning. This listing is a request-for-quotation reference and does not publish a price, stock guarantee or binding order.</p><section><h2>How sourcing works</h2><p>Use the SKU when requesting a quotation so NSS can match the enquiry to the correct origin, category and specification. Our team reviews the requested quantity and unit, checks whether the product and destination can be supported, and confirms relevant packaging, documentation, lead-time and delivery requirements with approved commercial partners. Product images are representative category visuals; they are not a promise of a particular brand, factory, batch or current stock position.</p><p>After clarification, NSS may request supplier offers and prepare a versioned quotation with assumptions, exclusions, currency and validity dates. A quotation is not an accepted order until the customer reviews it, capacity is confirmed and the appropriate commercial role and contract terms are agreed. Duties, taxes, insurance, banking, customs and transport charges are assessed according to the final request and corridor.</p></section><p><a href="/contact#intent=procurement&amp;sku=${encodeURIComponent(product.sku)}">Request a quote</a> <a href="/marketplace">Browse the marketplace</a></p><section><h2>Related products</h2>${relatedLinks}</section><nav aria-label="Product navigation"><a href="/services">Transport services</a><a href="/tracking">Shipment tracking</a><a href="/contact">Contact NSS</a></nav><script type="application/ld+json">${escapeJson(schema)}</script></main>`
}

let count = 0
for (const route of PUBLIC_ROUTES) {
  const canonical = `${SITE_URL}${route.path === '/' ? '/' : route.path}`
  const html = addBody(replaceHead(template, { title: `${route.title} — ${BRAND}`, description: route.description, canonical }), staticBody(route))
  const outDir = resolve(DIST, route.path === '/' ? '' : route.path.slice(1))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), html)
  count++
}

for (const path of PRIVATE_ROUTES) {
  const canonical = `${SITE_URL}${path}`
  const route = { h1: 'NSS secure portal', description: 'Secure NSS account access.', links: ['/contact'] }
  const html = addBody(replaceHead(template, { title: `NSS secure portal — ${BRAND}`, description: route.description, canonical, noindex: true }), staticBody(route))
  const outDir = resolve(DIST, path.slice(1))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), html)
  count++
}

for (const product of catalog) {
  const canonical = `${SITE_URL}/marketplace/product/${encodeURIComponent(product.sku)}`
  const title = `${product.name.en} | ${product.sku} — NSS`
  const description = `${product.name.en} from ${originNames[product.originCountry] || product.originCountry}. ${product.specification.en} RFQ-only sourcing through NSS. Request supplier confirmation and a written quotation.`
  const html = addBody(replaceHead(template, { title, description, canonical }), productBody(product))
  const outDir = resolve(DIST, 'marketplace', 'product', product.sku)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), html)
}

console.log(`inject-route-meta: wrote ${count} route documents and ${catalog.length} product documents.`)
