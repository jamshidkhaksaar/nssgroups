import { useEffect } from 'react'
import { absoluteUrl, DEFAULT_OG_IMAGE, HREFLANG_CODES, SITE_NAME } from '@/lib/seo'

interface SeoProps {
  /** Full document title (already localized; brand suffix included by caller). */
  title: string
  /** Meta description (localized). */
  description: string
  /** Root-relative canonical path, e.g. "/about" or "/marketplace/product/ABC". */
  path: string
  /** Social share image (root-relative or absolute). Defaults to the marketplace hero. */
  image?: string
  /** Open Graph type. Defaults to "website"; use "product" / "article" where apt. */
  type?: string
  /** Optional JSON-LD structured data object(s) rendered as script tags. */
  jsonLd?: object | object[]
}

/**
 * Centralized document-head management for public pages.
 *
 * We upsert tags imperatively rather than rendering them as JSX: React 19's
 * native metadata hoisting does NOT dedupe against the static fallback tags in
 * index.html, so JSX rendering produces duplicate <title>/<meta>/<link> pairs
 * (static value first) that crawlers would read instead of the page-specific
 * value. Upserting updates the existing static tags in place — the no-JS
 * fallback stays for scrapers while JS clients get exactly one correct tag.
 */
export default function Seo({ title, description, path, image, type = 'website', jsonLd }: SeoProps) {
  const canonical = absoluteUrl(path)
  const ogImage = absoluteUrl(image ?? DEFAULT_OG_IMAGE)
  const structured = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  // Stable dependency for the JSON-LD payload without re-running on identity change.
  const jsonLdKey = JSON.stringify(structured)

  useEffect(() => {
    const head = document.head

    document.title = title

    const upsert = (selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) => {
      let el = head.querySelector<HTMLElement>(selector)
      if (!el) {
        el = create()
        head.appendChild(el)
      }
      apply(el)
    }
    const meta = (attr: 'name' | 'property', key: string, content: string) =>
      upsert(`meta[${attr}="${key}"]`, () => {
        const m = document.createElement('meta')
        m.setAttribute(attr, key)
        return m
      }, (el) => el.setAttribute('content', content))

    upsert('link[rel="canonical"]', () => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'canonical')
      return l
    }, (el) => el.setAttribute('href', canonical))

    meta('name', 'description', description)
    meta('property', 'og:site_name', SITE_NAME)
    meta('property', 'og:type', type)
    meta('property', 'og:title', title)
    meta('property', 'og:description', description)
    meta('property', 'og:url', canonical)
    meta('property', 'og:image', ogImage)
    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', title)
    meta('name', 'twitter:description', description)
    meta('name', 'twitter:image', ogImage)

    // Tags that come in variable quantity are fully owned by this component:
    // clear the previous batch, then re-add for the current route.
    head.querySelectorAll('[data-seo-managed]').forEach((el) => el.remove())

    for (const code of HREFLANG_CODES) {
      const l = document.createElement('link')
      l.setAttribute('rel', 'alternate')
      l.setAttribute('hreflang', code)
      l.setAttribute('href', `${canonical}?lang=${code}`)
      l.setAttribute('data-seo-managed', '')
      head.appendChild(l)
    }
    const xDefault = document.createElement('link')
    xDefault.setAttribute('rel', 'alternate')
    xDefault.setAttribute('hreflang', 'x-default')
    xDefault.setAttribute('href', canonical)
    xDefault.setAttribute('data-seo-managed', '')
    head.appendChild(xDefault)

    for (const data of structured) {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.setAttribute('data-seo-managed', '')
      // Data is developer-controlled; escaping "<" still prevents any
      // "</script>" sequence from breaking out of the tag.
      s.textContent = JSON.stringify(data).replace(/</g, '\\u003c')
      head.appendChild(s)
    }

    return () => {
      head.querySelectorAll('[data-seo-managed]').forEach((el) => el.remove())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonical, ogImage, type, jsonLdKey])

  return null
}
