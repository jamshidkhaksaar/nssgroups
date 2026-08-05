import { LANGS, type Lang } from '@/i18n/i18n'

/** Canonical production origin. Used for absolute URLs in canonical/OG/hreflang tags. */
export const SITE_URL = 'https://nssgroupint.com'

export const SITE_NAME = 'NSS International Group of Companies'

/**
 * Default social-share image. A dedicated 1200×630 asset would be ideal;
 * the marketplace hero is a reasonable stand-in until one is produced.
 */
export const DEFAULT_OG_IMAGE = '/hero/nss-marketplace-hero.webp'

/**
 * Join a relative path with SITE_URL. Absolute URLs pass through unchanged.
 * Strips leading "./" or "/" so both `./marketplace/x.webp` (catalog image paths,
 * resolved at runtime via <base href="/">) and `/about` normalize correctly.
 */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path
  const clean = `/${path.replace(/^(\.?\/)+/, '')}`
  return clean === '/' ? `${SITE_URL}/` : `${SITE_URL}${clean}`
}

/** Language codes eligible for hreflang alternates (all supported UI languages). */
export const HREFLANG_CODES: Lang[] = LANGS.map((l) => l.code)
