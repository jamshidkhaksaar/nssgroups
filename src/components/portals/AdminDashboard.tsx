import React from 'react';
import { useI18n } from '@/i18n/i18n';
import { Button } from '@/components/ui/button';
import type { AdminKPIStats, VerificationDocument, ModerationLog, LogisticsOrder, PartnerVendor } from '@/types/portal';
import { FileCheck, Users, Building2, Truck, Activity, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { KpiCard } from './primitives';
import AdminCharts from './adminCharts';

interface AdminDashboardProps {
  stats: AdminKPIStats;
  pendingDocuments: VerificationDocument[];
  logs: ModerationLog[];
  orders: LogisticsOrder[];
  partners: PartnerVendor[];
  onNavigateTab: (tab: string) => void;
}

const surfaceClass = 'rounded-xl border border-[var(--card-border)] bg-[var(--panel)]';
const valueClass = 'nss-mono text-[26px] font-bold leading-none text-[rgb(var(--text-rgb))]';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  pendingDocuments,
  logs,
  orders,
  partners,
  onNavigateTab
}) => {
  const { t } = useI18n();

  const kpis = [
    {
      label: t('portal.admin.dash.kpiPendingVerif'),
      value: stats.pendingDocumentsCount,
      sub: t('portal.admin.dash.kpiKycQueue'),
      trend: 12,
      spark: [4, 6, 5, 8, 7, 9, stats.pendingDocumentsCount],
      sparkColor: '#fbbf24',
      icon: FileCheck,
      iconClass: 'bg-amber-500/10 border-amber-500/25 text-amber-500',
      valueClassName: 'nss-mono text-[26px] font-bold leading-none text-amber-500',
    },
    {
      label: t('portal.admin.dash.kpiActiveClients'),
      value: stats.totalClientsCount,
      sub: `${stats.pendingClientsCount} ${t('portal.admin.dash.kpiPendingApproval')}`,
      trend: 4,
      spark: [8, 9, 9, 10, 11, 12, stats.totalClientsCount],
      sparkColor: '#60a5fa',
      icon: Building2,
      iconClass: 'bg-sky-500/10 border-sky-500/25 text-sky-500',
      valueClassName: valueClass,
    },
    {
      label: t('portal.admin.dash.kpiActivePartners'),
      value: stats.activePartnersCount,
      sub: t('portal.admin.dash.kpiSubcontracted'),
      trend: 0,
      spark: [5, 5, 6, 6, 6, 7, stats.activePartnersCount],
      sparkColor: '#4ade80',
      icon: Users,
      iconClass: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-500',
      valueClassName: 'nss-mono text-[26px] font-bold leading-none text-emerald-500',
    },
    {
      label: t('portal.admin.dash.kpiActiveShipments'),
      value: stats.activeOrdersCount,
      sub: `${stats.delayedOrdersCount} ${t('portal.admin.dash.kpiConvoyDelayed')}`,
      spark: [10, 12, 11, 14, 15, 14, stats.activeOrdersCount],
      sparkColor: '#e8c268',
      icon: Truck,
      iconClass: 'bg-[rgba(var(--gold-rgb),0.1)] border-[rgba(var(--gold-rgb),0.25)] text-[rgb(var(--gold-rgb))]',
      valueClassName: valueClass,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Pending action alert strip */}
      {stats.pendingDocumentsCount > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 nss-mono text-sm font-bold text-amber-500">
              {stats.pendingDocumentsCount}
            </span>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-500">
                <AlertTriangle className="h-4 w-4" />
                {t('portal.admin.dash.pendingBannerTitle')}
              </h3>
              <p className="mt-0.5 text-xs text-[rgba(var(--text-rgb),0.6)]">{t('portal.admin.dash.pendingBannerSub')}</p>
            </div>
          </div>
          <Button
            size="sm"
            className="shrink-0 bg-[rgb(var(--gold-rgb))] font-semibold text-[#1d1233] hover:bg-[rgba(var(--gold-rgb),0.88)]"
            onClick={() => onNavigateTab('documents')}
          >
            {t('portal.admin.dash.reviewQueueBtn')} <ArrowRight className="ms-1 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* KPI grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <KpiCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              sub={kpi.sub}
              icon={Icon}
              iconClass={kpi.iconClass}
              valueClassName={kpi.valueClassName}
              trend={kpi.trend}
              spark={kpi.spark}
              sparkColor={kpi.sparkColor}
            />
          );
        })}
      </div>

      {/* Analytics charts */}
      <AdminCharts orders={orders} partners={partners} />

      {/* Moderation stream & audit log */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Pending documents */}
        <section className={surfaceClass}>
          <header className="flex items-center justify-between border-b border-[var(--card-border)] px-5 py-3.5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text-rgb))]">
              <FileCheck className="h-4 w-4 text-[rgb(var(--gold-rgb))]" />
              {t('portal.admin.dash.pendingStreamTitle')}
            </h3>
            {pendingDocuments.length > 0 && (
              <span className="nss-mono rounded-full bg-[rgba(var(--gold-rgb),0.12)] px-2 py-0.5 text-[10px] font-bold text-[rgb(var(--gold-rgb))]">
                {pendingDocuments.length}
              </span>
            )}
          </header>
          <div className="space-y-2 p-4">
            {pendingDocuments.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-xs text-[rgba(var(--text-rgb),0.5)]">
                <ShieldCheck className="h-8 w-8 text-emerald-500/80" />
                {t('portal.admin.dash.queueClean')}
              </div>
            ) : (
              pendingDocuments.slice(0, 4).map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg border border-[var(--card-border)] bg-[rgba(var(--text-rgb),0.03)] px-3.5 py-3"
                >
                  <div className="min-w-0">
                    <h5 className="truncate text-xs font-semibold text-[rgb(var(--text-rgb))]">{doc.clientName}</h5>
                    <p className="mt-0.5 truncate text-[11px] text-[rgba(var(--text-rgb),0.5)]">
                      {doc.title} ({doc.type.replace('_', ' ')})
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 shrink-0 text-xs text-[rgb(var(--gold-rgb))] hover:bg-[rgba(var(--gold-rgb),0.1)] hover:text-[rgb(var(--gold-rgb))]"
                    onClick={() => onNavigateTab('documents')}
                  >
                    {t('portal.admin.dash.reviewBtn')}
                  </Button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Audit log feed */}
        <section className={surfaceClass}>
          <header className="flex items-center justify-between border-b border-[var(--card-border)] px-5 py-3.5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text-rgb))]">
              <Activity className="h-4 w-4 text-[rgb(var(--gold-rgb))]" />
              {t('portal.admin.dash.auditLogTitle')}
            </h3>
          </header>
          <div className="space-y-2 p-4">
            {logs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="space-y-1 rounded-lg border border-[var(--card-border)] bg-[rgba(var(--text-rgb),0.03)] px-3.5 py-3 text-xs"
              >
                <div className="flex items-center justify-between text-[rgba(var(--text-rgb),0.5)]">
                  <span className="font-semibold text-[rgb(var(--text-rgb))]">{log.adminName}</span>
                  <span className="nss-mono text-[10px]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-[rgba(var(--text-rgb),0.7)]">{log.details}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
