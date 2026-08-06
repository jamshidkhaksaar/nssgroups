import { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { usePortalStore } from '@/data/portalData';
import { getSession } from '@/lib/auth';
import { ClientRegistration } from '@/components/portals/ClientRegistration';
import { ClientVerification } from '@/components/portals/ClientVerification';
import { ClientDashboard } from '@/components/portals/ClientDashboard';
import { StatusBadge } from '@/components/portals/StatusBadge';
import type { ClientCategory } from '@/types/portal';
import { Building2 } from 'lucide-react';
import DashboardShell from '@/components/layout/DashboardShell';

export default function ClientPortal() {
  const { t } = useI18n();
  const store = usePortalStore();

  // Selected client account for portal state (defaults to the logged-in
  // client, falling back to WFP if present, or the first client).
  const [activeClientId, setActiveClientId] = useState<string>(
    getSession()?.clientId || store.clients[0]?.id || 'cli-001'
  );

  const currentClient = store.clients.find((c) => c.id === activeClientId) || store.clients[0];

  const handleRegisterSubmit = (clientData: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    category: ClientCategory;
  }) => {
    const { client } = store.registerClient(clientData);
    setActiveClientId(client.id);
  };

  return (
    <DashboardShell
      accentColor="amber"
      portalLabel="Client Portal"
      portalIcon={<Building2 className="h-3.5 w-3.5" />}
      userName={getSession()?.name ?? currentClient?.fullName ?? 'Portal Client'}
      userRole={t('auth.client.badge')}
      sidebarFooter={
        currentClient && (
          <div className="rounded-xl border border-[rgba(var(--gold-rgb),0.10)] bg-[rgba(var(--bg-rgb),0.4)] p-4">
            <div className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.45)]">
              {t('portal.client.switchAccount')}
            </div>
            <select
              value={currentClient.id}
              onChange={(e) => setActiveClientId(e.target.value)}
              className="nss-mono mt-1.5 w-full cursor-pointer rounded-lg border border-[rgba(var(--gold-rgb),0.25)] bg-[rgba(var(--bg-rgb),0.5)] px-2.5 py-1.5 text-xs font-bold text-[rgb(var(--gold-rgb))] transition-colors duration-200 hover:border-[rgba(var(--gold-rgb),0.5)] focus:border-[rgba(var(--gold-rgb),0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.5)]"
            >
              {store.clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.companyName} ({c.state.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        )
      }
    >
    <div className="bg-[var(--bg)] text-[rgb(var(--text-rgb))] pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pt-10">
      {/* Header Banner */}
      <section className="nss-fade relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[linear-gradient(150deg,var(--panel),var(--bg-deep))] px-6 py-8 sm:px-10 sm:py-10">
        {/* gold hairline + ambient glows */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(var(--gold-rgb),0.6),transparent)]" />
        <div className="pointer-events-none absolute -top-24 -end-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(var(--gold-rgb),0.14),transparent_65%)]" />
        <div className="pointer-events-none absolute -bottom-32 -start-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(var(--gold-rgb),0.07),transparent_65%)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-3">
            <div className="nss-section-tag flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>{t('portal.client.headerTag')}</span>
            </div>
            <h1 className="nss-display text-3xl sm:text-5xl text-[rgb(var(--text-rgb))]">
              {t('client.title')}
            </h1>
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[rgba(var(--text-rgb),0.62)]">
              {t('client.sub')}
            </p>
          </div>

          {/* Client State Picker / Indicator */}
          {currentClient && (
            <div className="flex shrink-0 flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-[var(--card-border)] bg-[var(--panel)] px-5 py-4">
              <div>
                <span className="nss-mono block text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.5)]">
                  {t('portal.client.switchAccount')}
                </span>
                <select
                  value={currentClient.id}
                  onChange={(e) => setActiveClientId(e.target.value)}
                  className="nss-mono mt-1.5 block cursor-pointer rounded-lg border border-[rgba(var(--gold-rgb),0.25)] bg-[rgba(var(--bg-rgb),0.5)] px-2.5 py-1.5 text-xs font-bold text-[rgb(var(--gold-rgb))] transition-colors duration-200 hover:border-[rgba(var(--gold-rgb),0.5)] focus:border-[rgba(var(--gold-rgb),0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.5)]"
                >
                  {store.clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.companyName} ({c.state.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center sm:border-s sm:border-[rgba(var(--gold-rgb),0.18)] sm:ps-4">
                <StatusBadge status={currentClient.state} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enrollment progress stepper */}
      <div className="mx-auto max-w-xl">
        {(() => {
          const state = currentClient?.state ?? 'unregistered';
          const step = state === 'unregistered' ? 0 : state === 'verified' ? 2 : 1;
          const STEPS = [
            { label: t('portal.client.enrollStepRegister'), done: step > 0 },
            { label: t('portal.client.enrollStepVerify'), done: step > 1 },
            { label: t('portal.client.enrollStepDashboard'), done: step > 2 },
          ];
          return (
            <div className="flex items-center justify-between px-2">
              {STEPS.map((s, i) => (
                <div key={s.label} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold ${
                      s.done
                        ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : step === i
                        ? 'border-[rgba(var(--gold-rgb),0.6)] bg-[rgba(var(--gold-rgb),0.12)] text-[rgb(var(--gold-rgb))]'
                        : 'border-[var(--card-border)] text-[rgba(var(--text-rgb),0.35)]'
                    }`}>
                      {s.done ? '✓' : i + 1}
                    </span>
                    <span className={`nss-mono text-[9px] uppercase tracking-[0.14em] ${step === i ? 'text-[rgb(var(--gold-rgb))]' : s.done ? 'text-[rgba(var(--text-rgb),0.7)]' : 'text-[rgba(var(--text-rgb),0.35)]'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && <div className={`mx-2 h-px flex-1 ${step > i ? 'bg-emerald-500/40' : 'bg-[var(--card-border)]'}`} />}
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* State Machine Rendering View */}
      {!currentClient || currentClient.state === 'unregistered' ? (
        <ClientRegistration onRegisterSubmit={handleRegisterSubmit} />
      ) : currentClient.state === 'pending_verification' || currentClient.state === 'under_review' || currentClient.state === 'rejected' ? (
        <ClientVerification
          client={currentClient}
          onUploadDocument={store.uploadDocument}
          onSimulateApprove={store.simulateAdminApproveClient}
          onSimulateReject={store.simulateAdminRejectClient}
        />
      ) : (
        <ClientDashboard
          client={currentClient}
          orders={store.orders}
          invoices={store.invoices}
          onPlaceOrder={store.placeClientOrder}
        />
      )}
    </div>
    </DashboardShell>
  );
}
