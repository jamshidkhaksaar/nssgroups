import type { TranslationKey } from '@/i18n/translations/en'

/**
 * SEO metadata for the static public routes, composed from translation keys that
 * already exist in all 7 dictionaries — so titles/descriptions are localized for
 * free with no new translation strings to maintain.
 *
 * Dynamic routes (/marketplace, /marketplace/product/:sku) are intentionally
 * absent: those pages render their own <Seo> with content-derived titles.
 */
export interface RouteSeoEntry {
  titleKey: TranslationKey
  descKey: TranslationKey
}

export const BRAND = 'NSS International Group'

export const ROUTE_SEO: Record<string, RouteSeoEntry> = {
  '/about': { titleKey: 'nav.about', descKey: 'about.sub' },
  '/company-portfolio': { titleKey: 'nav.company', descKey: 'portfolio.lead' },
  '/services': { titleKey: 'nav.services', descKey: 'services.sub' },
  '/fleet': { titleKey: 'nav.fleet', descKey: 'fleet.sub' },
  '/network': { titleKey: 'nav.network', descKey: 'network.sub' },
  '/contact': { titleKey: 'nav.contact', descKey: 'contact.sub' },
  '/booking': { titleKey: 'nav.booking', descKey: 'booking.sub' },
  '/projects': { titleKey: 'nav.projects', descKey: 'projects.sub' },
  '/tracking': { titleKey: 'nav.tracking', descKey: 'tracking.sub' },
  '/portal': { titleKey: 'nav.portal', descKey: 'portal.sub' },
}
