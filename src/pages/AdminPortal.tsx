import { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { usePortalStore } from '@/data/portalData';
import { AdminDashboard } from '@/components/portals/AdminDashboard';
import { DocumentModeration } from '@/components/portals/DocumentModeration';
import { ClientsList } from '@/components/portals/ClientsList';
import { PartnersList } from '@/components/portals/PartnersList';
import { OrdersManagement } from '@/components/portals/OrdersManagement';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, LayoutDashboard, FileCheck, Users, Building2, Truck } from 'lucide-react';

export default function AdminPortal() {
  const { t } = useI18n();
  const store = usePortalStore();
  const [activeTab, setActiveTab] = useState<string>('overview');

  const pendingDocsCount = store.documents.filter((d) => d.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[rgb(var(--text-rgb))] pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 end-0 -mt-8 -me-8 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('portal.admin.headerTag')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sora">
              {t('admin.title')}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              {t('admin.sub')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">{t('portal.admin.pendingKyc')}</span>
              <span className="text-xl font-bold text-amber-400 font-mono">{pendingDocsCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">{t('portal.admin.activePartners')}</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">{store.stats.activePartnersCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="border-b border-slate-800 pb-1">
          <TabsList className="bg-slate-900/80 border border-slate-800 p-1 rounded-xl h-auto flex flex-wrap gap-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 text-slate-300 font-medium px-4 py-2 text-xs sm:text-sm rounded-lg flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              {t('admin.tab.dashboard')}
            </TabsTrigger>

            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 text-slate-300 font-medium px-4 py-2 text-xs sm:text-sm rounded-lg flex items-center gap-2 relative"
            >
              <FileCheck className="w-4 h-4" />
              {t('admin.tab.documents')}
              {pendingDocsCount > 0 && (
                <Badge className="ms-1 px-1.5 py-0.2 text-[10px] bg-amber-400 text-slate-950 font-bold border-none">
                  {pendingDocsCount}
                </Badge>
              )}
            </TabsTrigger>

            <TabsTrigger
              value="clients"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 text-slate-300 font-medium px-4 py-2 text-xs sm:text-sm rounded-lg flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              {t('admin.tab.clients')}
            </TabsTrigger>

            <TabsTrigger
              value="partners"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 text-slate-300 font-medium px-4 py-2 text-xs sm:text-sm rounded-lg flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              {t('admin.tab.partners')}
            </TabsTrigger>

            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 text-slate-300 font-medium px-4 py-2 text-xs sm:text-sm rounded-lg flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              {t('admin.tab.orders')}
            </TabsTrigger>
          </TabsList>
        </div>

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
  );
}
