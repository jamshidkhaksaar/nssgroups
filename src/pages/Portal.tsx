import { Bell, FileText, PackageCheck, Quote, Route, Users, X } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '@/i18n/i18n'
import Reveal from '@/components/Reveal'
import { getPlatformRequests, type PlatformRequest } from '@/lib/request-store'

const ITEMS = [
  { icon: Quote, label: 'portal.requests', value: '03' },
  { icon: PackageCheck, label: 'portal.orders', value: '01' },
  { icon: Route, label: 'portal.shipments', value: '02' },
  { icon: FileText, label: 'portal.documents', value: '08' },
] as const

export default function Portal() {
  const { t } = useI18n()
  const [requests] = useState<PlatformRequest[]>(getPlatformRequests)
  const [notifOpen, setNotifOpen] = useState(false)

  const activity = [
    ...requests.map((request) => ({ reference: request.reference, label: t('portal.requestSubmitted') })),
    { reference: 'NSS-7K4M-2026', label: t('tracking.inTransit') },
    { reference: 'RFQ-2026-014', label: t('portal.quoteReady') },
  ]

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-12">
        <Reveal className="flex flex-col gap-5 border-b border-[rgba(var(--gold-rgb),0.16)] pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="nss-section-tag">{t('portal.tag')}</p>
            <h1 className="nss-h2 mt-4 text-3xl md:text-5xl">{t('portal.heading')}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgba(var(--text-rgb),0.58)]">{t('portal.sub')}</p>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen((v) => !v)}
              aria-expanded={notifOpen}
              className="nss-btn-primary inline-flex w-fit items-center gap-2 rounded-sm px-5 py-3 text-sm font-bold"
            >
              <Bell size={15} />
              {t('portal.notifications')}
            </button>
            {notifOpen && (
              <div className="absolute end-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-[rgba(var(--gold-rgb),0.18)] bg-[var(--panel)] shadow-2xl shadow-black/40">
                <div className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.12)] px-4 py-3">
                  <span className="nss-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.5)]">
                    {t('portal.notifications')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setNotifOpen(false)}
                    aria-label={t('nav.close')}
                    className="rounded p-1 text-[rgba(var(--text-rgb),0.5)] transition-colors hover:text-[rgb(var(--text-rgb))]"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="max-h-80 divide-y divide-[rgba(var(--gold-rgb),0.08)] overflow-y-auto">
                  {activity.slice(0, 5).map((item) => (
                    <div key={item.reference} className="flex items-center justify-between gap-3 px-4 py-3">
                      <p className="nss-mono text-[11px] tracking-[0.12em] text-[rgb(var(--gold-rgb))]">{item.reference}</p>
                      <p className="text-xs text-[rgba(var(--text-rgb),0.7)]">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden border border-[rgba(var(--gold-rgb),0.16)] bg-[rgba(var(--gold-rgb),0.16)] sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, index) => (
            <Reveal key={item.label} delay={index * 70}>
              <div className="flex min-h-44 flex-col bg-[var(--panel)] p-6">
                <item.icon size={20} className="text-[rgb(var(--gold-rgb))]" />
                <p className="nss-display mt-auto text-4xl">
                  {item.label === 'portal.requests' ? String(requests.length).padStart(2, '0') : item.value}
                </p>
                <p className="nss-mono mt-2 text-[11px] tracking-[0.15em] text-[rgba(var(--text-rgb),0.56)] uppercase">
                  {t(item.label)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <section className="nss-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.13)] p-6">
                <div>
                  <p className="nss-section-tag">{t('portal.activity')}</p>
                  <h2 className="nss-display mt-2 text-xl">{t('portal.recent')}</h2>
                </div>
                <Route size={20} className="text-[rgb(var(--gold-rgb))]" />
              </div>
              <div className="divide-y divide-[rgba(var(--gold-rgb),0.11)]">
                {activity.slice(0, 3).map((item) => (
                  <div key={item.reference} className="flex items-center justify-between gap-4 p-6">
                    <div>
                      <p className="nss-mono text-[11px] tracking-[0.12em] text-[rgb(var(--gold-rgb))]">{item.reference}</p>
                      <p className="mt-1 text-sm text-[rgba(var(--text-rgb),0.7)]">{item.label}</p>
                    </div>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500/80" />
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={120}>
            <section className="nss-card flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <p className="nss-section-tag">PORTAL ACCESS DIRECTORY</p>
                <Users size={20} className="text-[rgb(var(--gold-rgb))]" />
              </div>
              <p className="text-sm leading-relaxed text-[rgba(var(--text-rgb),0.6)]">
                Select a portal workspace below or create a new client account:
              </p>
              
              <div className="space-y-2 mt-2">
                <a
                  href="/register"
                  className="flex items-center justify-between rounded-lg border border-[rgba(var(--gold-rgb),0.3)] bg-[rgba(var(--gold-rgb),0.08)] p-3 text-xs font-bold text-[rgb(var(--gold-rgb))] hover:bg-[rgba(var(--gold-rgb),0.15)] transition-all"
                >
                  <span>📝 New Client Registration</span>
                  <span>Register →</span>
                </a>
                <a
                  href="/login/client"
                  className="flex items-center justify-between rounded-lg border border-[var(--card-border)] bg-[rgba(var(--bg-rgb),0.4)] p-3 text-xs font-medium text-[rgb(var(--text-rgb))] hover:border-sky-400/40 transition-all"
                >
                  <span>🏢 Client Login & Verification</span>
                  <span>Sign In →</span>
                </a>
                <a
                  href="/login/admin"
                  className="flex items-center justify-between rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition-all"
                >
                  <span>🛡️ Executive Admin Portal</span>
                  <span>Admin Login →</span>
                </a>
              </div>
            </section>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
