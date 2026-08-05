import { BarChart3, X } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import { useAnalytics } from '@/analytics/useAnalytics'

interface Props {
  forceOpen: boolean
  onClose: () => void
}

export default function AnalyticsConsentBanner({ forceOpen, onClose }: Props) {
  const { t } = useI18n()
  const { consent, accept, decline } = useAnalytics()
  const visible = forceOpen || consent === null
  if (!visible) return null

  return (
    <aside role="dialog" aria-live="polite" aria-labelledby="analytics-consent-title" className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl border border-[rgba(var(--gold-rgb),0.32)] bg-[rgba(var(--bg-rgb),0.97)] p-5 shadow-2xl backdrop-blur-xl md:inset-x-auto md:end-8 md:bottom-8">
      <div className="flex items-start gap-4">
        <BarChart3 aria-hidden="true" className="mt-1 shrink-0 text-[rgb(var(--gold-rgb))]" size={20} />
        <div className="min-w-0 flex-1">
          <h2 id="analytics-consent-title" className="nss-display text-lg">{forceOpen ? t('analytics.settingsTitle') : t('analytics.consentTitle')}</h2>
          <p className="mt-2 text-sm leading-6 text-[rgba(var(--text-rgb),0.64)]">{forceOpen ? t('analytics.settingsDescription') : t('analytics.consentDescription')}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={accept} className="nss-btn-primary min-h-10 rounded-sm px-4 py-2 text-xs font-bold">{t('analytics.accept')}</button>
            <button type="button" onClick={decline} className="min-h-10 border border-[rgba(var(--gold-rgb),0.3)] px-4 py-2 text-xs font-semibold text-[rgb(var(--gold-rgb))]">{t('analytics.decline')}</button>
          </div>
        </div>
        {forceOpen && <button type="button" onClick={onClose} aria-label={t('analytics.decline')} className="rounded-full p-1 text-[rgba(var(--text-rgb),0.6)] hover:text-[rgb(var(--gold-rgb))]"><X size={16} /></button>}
      </div>
    </aside>
  )
}
