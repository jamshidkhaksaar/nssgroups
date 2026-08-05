import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { useI18n } from '@/i18n/i18n'
import AnalyticsConsentBanner from '@/components/AnalyticsConsentBanner'
import { AnalyticsContext } from './useAnalytics'
import { getAnalyticsConsent, loadAnalytics, setAnalyticsConsent, trackPageView } from './analytics'

export default function AnalyticsProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  useI18n()
  const [consent, setConsent] = useState(getAnalyticsConsent)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const accept = useCallback(() => {
    setAnalyticsConsent('accepted')
    setConsent('accepted')
    void loadAnalytics()
    setSettingsOpen(false)
  }, [])
  const decline = useCallback(() => {
    setAnalyticsConsent('declined')
    setConsent('declined')
    setSettingsOpen(false)
  }, [])
  const openSettings = useCallback(() => setSettingsOpen(true), [])

  useEffect(() => {
    const handleConsent = (event: Event) => {
      const value = (event as CustomEvent).detail
      if (value === 'accepted' || value === 'declined') setConsent(value)
    }
    window.addEventListener('nss-analytics-consent', handleConsent)
    if (consent === 'accepted') void loadAnalytics()
    return () => window.removeEventListener('nss-analytics-consent', handleConsent)
  }, [consent])

  useEffect(() => {
    if (consent !== 'accepted') return
    void loadAnalytics().then(() => trackPageView(`${location.pathname}${location.search}`, document.title))
  }, [consent, location.pathname, location.search])

  const value = useMemo(() => ({ consent, accept, decline, openSettings }), [accept, consent, decline, openSettings])

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
      <AnalyticsConsentBanner forceOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </AnalyticsContext.Provider>
  )
}
