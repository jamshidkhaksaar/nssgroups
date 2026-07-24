import { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { usePortalStore } from '@/data/portalData';
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

  // Selected client account for portal state (defaults to WFP if present, or first client)
  const [activeClientId, setActiveClientId] = useState<string>(store.clients[0]?.id || 'cli-001');

  const currentClient = store.clients.find((c) => c.id === activeClientId) || store.clients[0];

  const handleRegisterSubmit = (clientData: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    category: ClientCategory;
  }) => {
    const newClient = store.registerClient(clientData);
    setActiveClientId(newClient.id);
  };

  return (
    <DashboardShell accentColor="sky" portalLabel="Client Portal">
    <div className="bg-[var(--bg)] text-[rgb(var(--text-rgb))] pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pt-8">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/50 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 end-0 -mt-8 -me-8 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Building2 className="w-4 h-4" />
              <span>{t('portal.client.headerTag')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sora">
              {t('client.title')}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              {t('client.sub')}
            </p>
          </div>

          {/* Client State Picker / Indicator */}
          {currentClient && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">{t('portal.client.switchAccount')}</span>
                <select
                  value={currentClient.id}
                  onChange={(e) => setActiveClientId(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-amber-400 font-bold text-xs rounded px-2 py-1 mt-0.5"
                >
                  {store.clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.companyName} ({c.state.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
              <StatusBadge status={currentClient.state} />
            </div>
          )}
        </div>
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
