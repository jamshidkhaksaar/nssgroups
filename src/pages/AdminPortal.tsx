import { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { usePortalStore } from '@/data/portalData';
import { getSession } from '@/lib/auth';
import { AdminDashboard } from '@/components/portals/AdminDashboard';
import { DocumentModeration } from '@/components/portals/DocumentModeration';
import { ClientsList } from '@/components/portals/ClientsList';
import { PartnersList } from '@/components/portals/PartnersList';
import { OrdersManagement } from '@/components/portals/OrdersManagement';
import { ShieldCheck, LayoutDashboard, FileCheck, Users, Building2, Truck } from 'lucide-react';
import DashboardShell from '@/components/layout/DashboardShell';
import type { TranslationKey } from '@/i18n/translations/en';

type AdminSection = 'overview' | 'documents' | 'clients' | 'partners' | 'orders';

interface NavItem {
  id: AdminSection;
  labelKey: TranslationKey;
  icon: typeof LayoutDashboard;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', labelKey: 'admin.tab.dashboard', icon: LayoutDashboard },
  { id: 'documents', labelKey: 'admin.tab.documents', icon: FileCheck },
  { id: 'clients', labelKey: 'admin.tab.clients', icon: Building2 },
  { id: 'partners', labelKey: 'admin.tab.partners', icon: Users },
  { id: 'orders', labelKey: 'admin.tab.orders', icon: Truck },
];

export default function AdminPortal() {
  const { t } = useI18n();
  const store = usePortalStore();
  const session = getSession();
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');

  const pendingDocsCount = store.documents.filter((d) => d.status === 'pending').length;
  const delayedOrdersCount = store.orders.filter((o) => o.status === 'delayed').length;
  const pendingClientsCount = store.clients.filter((c) => c.state === 'pending_verification' || c.state === 'under_review').length;

  const notifications = [
    ...(delayedOrdersCount > 0
      ? [{ id: 'n-delayed', title: t('portal.admin.notif.delayedTitle'), description: t('portal.admin.notif.delayedDesc'), tone: 'rose' as const }]
      : []),
    ...(pendingDocsCount > 0
      ? [{ id: 'n-kyc', title: t('portal.admin.notif.kycTitle'), description: t('portal.admin.notif.kycDesc'), tone: 'amber' as const }]
      : []),
    ...(pendingClientsCount > 0
      ? [{ id: 'n-clients', title: t('portal.admin.notif.clientsTitle'), description: t('portal.admin.notif.clientsDesc'), tone: 'gold' as const }]
      : []),
    ...(store.partners.filter((p) => p.status === 'suspended').length > 0
      ? [{ id: 'n-susp', title: t('portal.admin.notif.suspendedTitle'), description: t('portal.admin.notif.suspendedDesc'), tone: 'rose' as const }]
      : []),
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <AdminDashboard
            stats={store.stats}
            pendingDocuments={store.documents.filter((d) => d.status === 'pending')}
            logs={store.logs}
            orders={store.orders}
            partners={store.partners}
            onNavigateTab={(tab) => setActiveSection(tab as AdminSection)}
          />
        );
      case 'documents':
        return (
          <DocumentModeration
            documents={store.documents}
            onApprove={store.approveDocument}
            onReject={store.rejectDocument}
          />
        );
      case 'clients':
        return (
          <ClientsList
            clients={store.clients}
            onSimulateApprove={store.simulateAdminApproveClient}
            onSimulateReject={store.simulateAdminRejectClient}
          />
        );
      case 'partners':
        return (
          <PartnersList
            partners={store.partners}
            onUpdateStatus={store.updatePartnerStatus}
            onUpdateGamification={store.updatePartnerGamification}
          />
        );
      case 'orders':
        return (
          <OrdersManagement
            orders={store.orders}
            onUpdateStatus={store.updateOrderStatus}
            onAddCheckpoint={store.addOrderCheckpoint}
          />
        );
      default:
        return null;
    }
  };

  const sidebarFooter = (
    <div className="rounded-xl border border-[rgba(var(--gold-rgb),0.10)] bg-[rgba(var(--bg-rgb),0.4)] p-4">
      <div className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.10)] pb-3">
        <span className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.45)]">
          {t('portal.admin.pendingKyc')}
        </span>
        <span className="nss-mono text-lg font-bold text-[rgb(var(--gold-rgb))]">
          {pendingDocsCount}
        </span>
      </div>
      <div className="flex items-center justify-between pt-3">
        <span className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.45)]">
          {t('portal.admin.activePartners')}
        </span>
        <span className="nss-mono text-lg font-bold text-[rgb(var(--text-rgb))]">
          {store.stats.activePartnersCount}
        </span>
      </div>
    </div>
  );

  return (
    <DashboardShell
      accentColor="amber"
      portalLabel="Admin Control Room"
      portalIcon={<ShieldCheck className="h-3.5 w-3.5" />}
      userName={session?.name ?? 'Administrator'}
      userRole={t('auth.admin.badge')}
      navItems={NAV_ITEMS.map((item) => ({
        id: item.id,
        label: t(item.labelKey),
        icon: item.icon,
        badge: item.id === 'documents' ? pendingDocsCount : undefined,
      }))}
      activeNavId={activeSection}
      onNavChange={(id) => setActiveSection(id as AdminSection)}
      sidebarFooter={sidebarFooter}
      notificationsCount={notifications.length}
      notifications={notifications}
    >
      {/* Mobile nav pills */}
      <nav className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={[
                'flex flex-none items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'border-[rgba(var(--gold-rgb),0.5)] bg-[rgba(var(--gold-rgb),0.12)] text-[rgb(var(--gold-rgb))]'
                  : 'border-[rgba(var(--gold-rgb),0.15)] bg-[var(--panel)] text-[rgba(var(--text-rgb),0.6)]',
              ].join(' ')}
            >
              <Icon className="h-3.5 w-3.5" />
              {t(item.labelKey)}
              {item.id === 'documents' && pendingDocsCount > 0 && (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[rgb(var(--gold-rgb))] px-1 text-[9px] font-bold text-[#1d1233]">
                  {pendingDocsCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Page header */}
      <header className="space-y-1.5 pb-2">
        <h1 className="nss-display text-2xl text-[rgb(var(--text-rgb))] sm:text-3xl">
          {t('admin.title')}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[rgba(var(--text-rgb),0.6)]">
          {t('admin.sub')}
        </p>
      </header>

      {/* Section content */}
      <div className="nss-fade" key={activeSection}>
        {renderSection()}
      </div>
    </DashboardShell>
  );
}

