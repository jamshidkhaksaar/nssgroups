export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-LMJDP2N0PN'
export const ANALYTICS_CONSENT_KEY = 'nss-analytics-consent'

export type AnalyticsConsent = 'accepted' | 'declined'
type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    __nssAnalyticsLoaded?: boolean
  }
}

let scriptPromise: Promise<void> | null = null

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY)
  return value === 'accepted' || value === 'declined' ? value : null
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent)
  window.dispatchEvent(new CustomEvent('nss-analytics-consent', { detail: consent }))
}

export function loadAnalytics(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.__nssAnalyticsLoaded) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  window.dataLayer = window.dataLayer || []
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args)
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    send_page_view: false,
  })

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-nss-ga="${GA_MEASUREMENT_ID}"]`)
    if (existing) {
      window.__nssAnalyticsLoaded = true
      resolve()
      return
    }
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`
    script.dataset.nssGa = GA_MEASUREMENT_ID
    script.onload = () => {
      window.__nssAnalyticsLoaded = true
      resolve()
    }
    script.onerror = () => reject(new Error('Google Analytics could not be loaded'))
    document.head.appendChild(script)
  })
  return scriptPromise
}

export function trackEvent(name: string, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined' || getAnalyticsConsent() !== 'accepted' || !window.gtag) return
  window.gtag('event', name, parameters)
}

export function trackPageView(path: string, title: string) {
  trackEvent('page_view', { page_path: path, page_title: title })
}
