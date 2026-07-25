import { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { usePortalStore } from '@/data/portalData';
import { AdminDashboard } from '@/components/portals/AdminDashboard';
import { DocumentModeration } from '@/components/portals/DocumentModeration';
import { ClientsList } from '@/components/portals/ClientsList';
import { PartnersList } from '@/components/portals/PartnersList';
import { OrdersManagement } from '@/components/portals/OrdersManagement';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ShieldCheck, LayoutDashboard, FileCheck, Users, Building2, Truck } from 'lucide-react';
import DashboardShell from '@/components/layout/DashboardShell';

const tabTriggerClass = [
  'group relative flex-none rounded-none border-0 bg-transparent px-3 pb-3 pt-1 sm:px-4',
  'nss-mono text-[11px] sm:text-xs uppercase tracking-[0.14em]',
  'text-[rgba(var(--text-rgb),0.5)] shadow-none transition-colors duration-200',
  'hover:text-[rgba(var(--text-rgb),0.85)]',
  'focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.45)] focus-visible:outline-none',
  'data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[rgb(var(--gold-rgb))]',
  "after:absolute after:bottom-[-1px] after:start-0 after:h-[2px] after:w-full after:scale-x-0",
  'after:bg-[rgb(var(--gold-rgb))] after:transition-transform after:duration-300',
  'data-[state=active]:after:scale-x-100',
].join(' ');

export default function AdminPortal() {
  const { t } = useI18n();
  const store = usePortalStore();
  const [activeTab, setActiveTab] = useState<string>('overview');

  const pendingDocsCount = store.documents.filter((d) => d.status === 'pending').length;

  return (
    <DashboardShell accentColor="amber" portalLabel="Admin Control Room">
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
              <ShieldCheck className="h-4 w-4" />
              <span>{t('portal.admin.headerTag')}</span>
            </div>
            <h1 className="nss-display text-3xl sm:text-5xl text-[rgb(var(--text-rgb))]">
              {t('admin.title')}
            </h1>
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[rgba(var(--text-rgb),0.62)]">
              {t('admin.sub')}
            </p>
          </div>

          {/* header stats */}
          <div className="flex shrink-0 items-stretch">
            <div className="pe-6">
              <span className="nss-mono block text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.5)]">
                {t('portal.admin.pendingKyc')}
              </span>
              <span className="nss-mono mt-1 block text-3xl font-bold text-[rgb(var(--gold-rgb))]">
                {pendingDocsCount}
              </span>
            </div>
            <div className="border-s border-[rgba(var(--gold-rgb),0.18)] ps-6">
              <span className="nss-mono block text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.5)]">
                {t('portal.admin.activePartners')}
              </span>
              <span className="nss-mono mt-1 block text-3xl font-bold text-[rgb(var(--text-rgb))]">
                {store.stats.activePartnersCount}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="h-auto w-full justify-start gap-0 overflow-x-auto rounded-none border-b border-[var(--card-border)] bg-transparent p-0">
          <TabsTrigger value="overview" className={tabTriggerClass}>
            <LayoutDashboard className="h-3.5 w-3.5" />
            {t('admin.tab.dashboard')}
          </TabsTrigger>

          <TabsTrigger value="documents" className={tabTriggerClass}>
            <FileCheck className="h-3.5 w-3.5" />
            {t('admin.tab.documents')}
            {pendingDocsCount > 0 && (
              <span className="ms-1 inline-flex h-4 min-w-4 items-center justify-center rounded-sm bg-[rgb(var(--gold-rgb))] px-1 text-[10px] font-bold text-[#1d1233]">
                {pendingDocsCount}
              </span>
            )}
          </TabsTrigger>

          <TabsTrigger value="clients" className={tabTriggerClass}>
            <Building2 className="h-3.5 w-3.5" />
            {t('admin.tab.clients')}
          </TabsTrigger>

          <TabsTrigger value="partners" className={tabTriggerClass}>
            <Users className="h-3.5 w-3.5" />
            {t('admin.tab.partners')}
          </TabsTrigger>

          <TabsTrigger value="orders" className={tabTriggerClass}>
            <Truck className="h-3.5 w-3.5" />
            {t('admin.tab.orders')}
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="overview" className="mt-0">
          <AdminDashboard
            stats={store.stats}
            pendingDocuments={store.documents.filter((d) => d.status === 'pending')}
            logs={store.logs}
            onNavigateTab={setActiveTab}
          />
        </TabsContent>

        <TabsContent value="documents" className="mt-0">
          <DocumentModeration
            documents={store.documents}
            onApprove={store.approveDocument}
            onReject={store.rejectDocument}
          />
        </TabsContent>

        <TabsContent value="clients" className="mt-0">
          <ClientsList
            clients={store.clients}
            onSimulateApprove={store.simulateAdminApproveClient}
            onSimulateReject={store.simulateAdminRejectClient}
          />
        </TabsContent>

        <TabsContent value="partners" className="mt-0">
          <PartnersList
            partners={store.partners}
            onUpdateStatus={store.updatePartnerStatus}
            onUpdateGamification={store.updatePartnerGamification}
          />
        </TabsContent>

        <TabsContent value="orders" className="mt-0">
          <OrdersManagement
            orders={store.orders}
            onUpdateStatus={store.updateOrderStatus}
            onAddCheckpoint={store.addOrderCheckpoint}
          />
        </TabsContent>
      </Tabs>
    </div>
    </DashboardShell>
  );
}
