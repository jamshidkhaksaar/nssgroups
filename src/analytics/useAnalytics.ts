import { createContext, useContext } from 'react'
import type { AnalyticsConsent } from './analytics'

export interface AnalyticsValue {
  consent: AnalyticsConsent | null
  accept: () => void
  decline: () => void
  openSettings: () => void
}

export const AnalyticsContext = createContext<AnalyticsValue | null>(null)

export function useAnalytics() {
  const value = useContext(AnalyticsContext)
  if (!value) throw new Error('useAnalytics must be used inside <AnalyticsProvider>')
  return value
}
