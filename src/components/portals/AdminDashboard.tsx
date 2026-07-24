import React from 'react';
import { useI18n } from '@/i18n/i18n';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { AdminKPIStats, VerificationDocument, ModerationLog } from '@/types/portal';
import { FileCheck, Users, Building2, Truck, DollarSign, Activity, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminDashboardProps {
  stats: AdminKPIStats;
  pendingDocuments: VerificationDocument[];
  logs: ModerationLog[];
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  pendingDocuments,
  logs,
  onNavigateTab
}) => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      {/* Pending Action Banner if documents exist */}
      {stats.pendingDocumentsCount > 0 && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/60 via-amber-900/40 to-slate-900 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg">
              {stats.pendingDocumentsCount}
            </div>
            <div>
              <h3 className="font-bold text-amber-300 text-sm sm:text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> {t('portal.admin.dash.pendingBannerTitle')}
              </h3>
              <p className="text-xs text-slate-300">{t('portal.admin.dash.pendingBannerSub')}</p>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shrink-0"
            onClick={() => onNavigateTab('documents')}
          >
            {t('portal.admin.dash.reviewQueueBtn')} <ArrowRight className="w-4 h-4 me-1" />
          </Button>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{t('portal.admin.dash.kpiPendingVerif')}</span>
              <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">{stats.pendingDocumentsCount}</span>
              <span className="text-[11px] text-slate-400 mt-1 block">{t('portal.admin.dash.kpiKycQueue')}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FileCheck className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{t('portal.admin.dash.kpiActiveClients')}</span>
              <span className="text-2xl font-black text-slate-100 font-mono mt-1 block">{stats.totalClientsCount}</span>
              <span className="text-[11px] text-slate-400 mt-1 block">{stats.pendingClientsCount} {t('portal.admin.dash.kpiPendingApproval')}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Building2 className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{t('portal.admin.dash.kpiActivePartners')}</span>
              <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">{stats.activePartnersCount}</span>
              <span className="text-[11px] text-slate-400 mt-1 block">{t('portal.admin.dash.kpiSubcontracted')}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{t('portal.admin.dash.kpiActiveShipments')}</span>
              <span className="text-2xl font-black text-slate-100 font-mono mt-1 block">{stats.activeOrdersCount}</span>
              <span className="text-[11px] text-rose-400 mt-1 block font-semibold">{stats.delayedOrdersCount} {t('portal.admin.dash.kpiConvoyDelayed')}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Truck className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Volume Banner */}
      <Card className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border-slate-800">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('portal.admin.dash.gmvVolumeTitle')}</h4>
              <span className="text-3xl font-black text-amber-400 font-mono mt-0.5 block">${stats.totalVolumeUsd.toLocaleString()} USD</span>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto border-slate-700 text-slate-200" onClick={() => onNavigateTab('partners')}>
              {t('portal.admin.dash.partnersDirBtn')}
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto border-slate-700 text-slate-200" onClick={() => onNavigateTab('orders')}>
              {t('portal.admin.dash.manageOrdersBtn')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Moderation Stream & Quick Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Documents List */}
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-400" /> {t('portal.admin.dash.pendingStreamTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingDocuments.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs flex flex-col items-center gap-2">
                <ShieldCheck className="w-8 h-8 text-emerald-400/80" />
                {t('portal.admin.dash.queueClean')}
              </div>
            ) : (
              pendingDocuments.slice(0, 4).map((doc) => (
                <div key={doc.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-amber-400 text-xs">{doc.clientName}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{doc.title} ({doc.type.replace('_', ' ')})</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-amber-400 hover:bg-amber-500/10" onClick={() => onNavigateTab('documents')}>
                    {t('portal.admin.dash.reviewBtn')}
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Audit Logs Feed */}
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" /> {t('portal.admin.dash.auditLogTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {logs.slice(0, 4).map((log) => (
              <div key={log.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-slate-200">{log.adminName}</span>
                  <span className="font-mono text-[10px]">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-slate-300">{log.details}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
