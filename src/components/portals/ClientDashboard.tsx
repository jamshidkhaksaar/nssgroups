import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { StatusBadge } from './StatusBadge';
import { InvoiceDetailSheet } from './InvoiceDetailSheet';
import { KpiCard } from './primitives';
import type { ClientProfile, LogisticsOrder, ClientInvoice, TransitMode } from '@/types/portal';
import { Truck, Plus, FileText, Calculator, Download, Headphones, CheckCircle2, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface ClientDashboardProps {
  client: ClientProfile;
  orders: LogisticsOrder[];
  invoices: ClientInvoice[];
  onPlaceOrder: (orderData: {
    clientId: string;
    clientName: string;
    origin: string;
    destination: string;
    mode: TransitMode;
    cargoDescription: string;
    weightTons: number;
    amountUsd: number;
  }) => void;
}

const inputClass = [
  'bg-[rgba(var(--bg-rgb),0.5)] border border-[rgba(var(--gold-rgb),0.2)]',
  'text-sm text-[rgb(var(--text-rgb))] placeholder:text-[rgba(var(--text-rgb),0.35)]',
  'transition-colors duration-200',
  'focus:border-[rgba(var(--gold-rgb),0.6)] focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.3)] focus-visible:outline-none',
].join(' ');

const selectContentClass = 'border border-[var(--card-border)] bg-[var(--panel)] text-[rgb(var(--text-rgb))]';

const labelClass = 'nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]';

const primaryBtnClass = [
  'nss-btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.6)] active:scale-[0.98]',
].join(' ');

const ghostBtnClass = [
  'inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(var(--gold-rgb),0.35)]',
  'px-4 py-2 text-sm font-semibold text-[rgb(var(--gold-rgb))]',
  'transition-all duration-200 hover:border-[rgba(var(--gold-rgb),0.8)] hover:bg-[rgba(var(--gold-rgb),0.08)]',
  'hover:-translate-y-px active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.5)]',
].join(' ');

const subTabBaseClass = [
  'group relative flex flex-none items-center gap-2 rounded-none bg-transparent px-3 pb-3 pt-1 sm:px-4',
  'nss-mono text-[11px] sm:text-xs uppercase tracking-[0.14em]',
  'transition-colors duration-200',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.45)]',
  'after:absolute after:bottom-[-1px] after:start-0 after:h-[2px] after:w-full after:scale-x-0',
  'after:bg-[rgb(var(--gold-rgb))] after:transition-transform after:duration-300',
].join(' ');

const subTabClass = (active: boolean) =>
  `${subTabBaseClass} ${
    active
      ? 'text-[rgb(var(--gold-rgb))] after:scale-x-100'
      : 'text-[rgba(var(--text-rgb),0.5)] hover:text-[rgba(var(--text-rgb),0.85)]'
  }`;

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  client,
  orders,
  invoices,
  onPlaceOrder
}) => {
  const { t } = useI18n();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'shipments' | 'invoices' | 'calculator' | 'support'>('shipments');
  const [detailInvoice, setDetailInvoice] = useState<ClientInvoice | null>(null);

  // Order Wizard state
  const [origin, setOrigin] = useState<string>('Tashkent, Uzbekistan');
  const [destination, setDestination] = useState<string>('Hairatan Border Hub, Afghanistan');
  const [mode, setMode] = useState<TransitMode>('RAIL');
  const [cargoDesc, setCargoDesc] = useState<string>('Commodity Wheat / Food Supplies');
  const [weightTons, setWeightTons] = useState<number>(250);

  // Rate Calculation formula
  const calculatedCost = Math.round(weightTons * (mode === 'RAIL' ? 180 : mode === 'AIR' ? 850 : mode === 'SEA' ? 220 : 250));

  const clientOrders = orders.filter((o) => o.clientId === client.id || o.clientName.toLowerCase().includes(client.companyName.toLowerCase()));

  const handleConfirmOrder = () => {
    onPlaceOrder({
      clientId: client.id,
      clientName: client.companyName,
      origin,
      destination,
      mode,
      cargoDescription: cargoDesc,
      weightTons,
      amountUsd: calculatedCost
    });
    toast.success(t('portal.client.dash.orderPlacedSuccess'));
    setIsOrderModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Client Overview Banner */}
      <section className="nss-fade relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[linear-gradient(150deg,var(--panel),var(--bg-deep))] px-6 py-6 sm:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(var(--gold-rgb),0.6),transparent)]" />
        <div className="pointer-events-none absolute -top-20 -end-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(var(--gold-rgb),0.12),transparent_65%)]" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="nss-display text-2xl sm:text-3xl text-[rgb(var(--text-rgb))]">{client.companyName}</h2>
              <StatusBadge status={client.state} />
            </div>
            <p className="mt-2 text-xs text-[rgba(var(--text-rgb),0.55)]">
              {t('portal.client.dash.verifiedIdLabel')} <span className="nss-mono text-[rgba(var(--text-rgb),0.8)]">{client.id}</span> • {client.fullName} ({client.email})
            </p>
          </div>

          <button
            className={`${primaryBtnClass} shrink-0`}
            onClick={() => setIsOrderModalOpen(true)}
          >
            <Plus className="h-4 w-4" /> {t('portal.client.dash.placeOrderBtn')}
          </button>
        </div>
      </section>

      {/* Account KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label={t('portal.client.dash.activeShipmentsTab')}
          value={clientOrders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length}
          sub={`${clientOrders.length} total`}
          icon={Truck}
          iconClass="bg-sky-500/10 border-sky-500/25 text-sky-500"
          valueClassName="nss-mono text-[26px] font-bold leading-none text-[rgb(var(--text-rgb))]"
        />
        <KpiCard
          label={t('portal.status.delivered')}
          value={clientOrders.filter((o) => o.status === 'delivered').length}
          sub="completed"
          icon={CheckCircle2}
          iconClass="bg-emerald-500/10 border-emerald-500/25 text-emerald-500"
          valueClassName="nss-mono text-[26px] font-bold leading-none text-[rgb(var(--text-rgb))]"
        />
        <KpiCard
          label="Total spend"
          value={`${client.totalSpentUsd.toLocaleString()}`}
          sub={`${client.totalOrders} orders`}
          icon={DollarSign}
          iconClass="bg-[rgba(var(--gold-rgb),0.1)] border-[rgba(var(--gold-rgb),0.25)] text-[rgb(var(--gold-rgb))]"
          valueClassName="nss-mono text-[22px] font-bold leading-none text-[rgb(var(--gold-rgb))]"
        />
        <KpiCard
          label="Invoices open"
          value={invoices.filter((i) => i.status !== 'paid').length}
          sub={`${invoices.filter((i) => i.status === 'paid').length} paid`}
          icon={FileText}
          iconClass="bg-amber-500/10 border-amber-500/25 text-amber-500"
          valueClassName="nss-mono text-[26px] font-bold leading-none text-[rgb(var(--text-rgb))]"
        />
      </div>

      {/* Navigation Sub-Tabs */}
      <div
        className="nss-fade flex items-center gap-0 overflow-x-auto border-b border-[var(--card-border)]"
        style={{ animationDelay: '80ms' }}
      >
        <button onClick={() => setActiveTab('shipments')} className={subTabClass(activeTab === 'shipments')}>
          <Truck className="h-3.5 w-3.5" /> {t('portal.client.dash.activeShipmentsTab')} ({clientOrders.length})
        </button>

        <button onClick={() => setActiveTab('invoices')} className={subTabClass(activeTab === 'invoices')}>
          <FileText className="h-3.5 w-3.5" /> {t('portal.client.dash.billingInvoicesTab')} ({invoices.length})
        </button>

        <button onClick={() => setActiveTab('calculator')} className={subTabClass(activeTab === 'calculator')}>
          <Calculator className="h-3.5 w-3.5" /> {t('portal.client.dash.rateCalculatorTab')}
        </button>

        <button onClick={() => setActiveTab('support')} className={subTabClass(activeTab === 'support')}>
          <Headphones className="h-3.5 w-3.5" /> {t('portal.client.dash.supportDeskTab')}
        </button>
      </div>

      {/* TAB CONTENT: SHIPMENTS */}
      {activeTab === 'shipments' && (
        <section
          className="nss-fade overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--panel)]"
          style={{ animationDelay: '160ms' }}
        >
          <header className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.12)] px-5 py-4">
            <h3 className="nss-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[rgba(var(--text-rgb),0.75)]">
              <Truck className="h-4 w-4 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.dash.shipmentsTitle')}
            </h3>
            {clientOrders.length > 0 && (
              <span className="nss-mono rounded-sm border border-[rgba(var(--gold-rgb),0.3)] px-1.5 py-0.5 text-[10px] text-[rgb(var(--gold-rgb))]">
                {clientOrders.length}
              </span>
            )}
          </header>

          {clientOrders.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[rgba(var(--gold-rgb),0.3)] bg-[rgba(var(--gold-rgb),0.08)] text-[rgb(var(--gold-rgb))]">
                <Truck className="h-6 w-6" />
              </div>
              <p className="max-w-xs text-xs leading-relaxed text-[rgba(var(--text-rgb),0.55)]">
                {t('portal.client.dash.noShipments')}
              </p>
              <button className={ghostBtnClass} onClick={() => setIsOrderModalOpen(true)}>
                {t('portal.client.dash.bookFirstCargo')}
              </button>
            </div>
          ) : (
            <div className="space-y-4 p-5">
              {clientOrders.map((order) => (
                <div
                  key={order.id}
                  className="space-y-3 rounded-xl border border-[var(--card-border)] bg-[rgba(var(--bg-rgb),0.4)] p-4 transition-colors duration-200 hover:border-[rgba(var(--gold-rgb),0.4)]"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[rgba(var(--gold-rgb),0.1)] pb-3">
                    <div>
                      <span className="nss-mono block text-xs font-bold text-[rgb(var(--gold-rgb))]">{order.trackingNumber}</span>
                      <h4 className="mt-0.5 text-sm font-semibold text-[rgb(var(--text-rgb))]">{order.cargoDescription} ({order.weightTons} {t('portal.client.dash.tonsSuffix')})</h4>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className={`${labelClass} block`}>{t('portal.client.dash.originDestLabel')}</span>
                      <span className="mt-0.5 block font-medium text-[rgba(var(--text-rgb),0.85)]">{order.origin} → {order.destination}</span>
                    </div>
                    <div>
                      <span className={`${labelClass} block`}>{t('portal.client.dash.transitModeLabel')}</span>
                      <span className="nss-mono mt-0.5 block font-semibold text-[rgb(var(--gold-rgb))]">{order.mode} {t('portal.client.dash.freightSuffix')}</span>
                    </div>
                    <div>
                      <span className={`${labelClass} block`}>{t('portal.client.dash.estDeliveryLabel')}</span>
                      <span className="nss-mono mt-0.5 block text-[rgba(var(--text-rgb),0.8)]">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Checkpoints Timeline */}
                  <div className="pt-2">
                    <span className="nss-mono mb-2 block text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.45)]">
                      {t('portal.client.dash.liveProgressTitle')}
                    </span>
                    <div className="space-y-2">
                      {order.checkpoints.map((chk, i) => (
                        <div key={chk.id} className="flex items-start gap-2.5 text-xs">
                          <div className="nss-mono mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[rgba(var(--gold-rgb),0.4)] bg-[rgba(var(--gold-rgb),0.12)] text-[10px] font-bold text-[rgb(var(--gold-rgb))]">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2 font-medium text-[rgba(var(--text-rgb),0.85)]">
                              <span>{chk.location}</span>
                              <span className="nss-mono shrink-0 text-[10px] text-[rgba(var(--text-rgb),0.4)]">{new Date(chk.timestamp).toLocaleString()}</span>
                            </div>
                            <p className="text-[11px] text-[rgb(var(--gold-rgb))]">{chk.status} — <span className="text-[rgba(var(--text-rgb),0.5)]">{chk.notes}</span></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* TAB CONTENT: INVOICES */}
      {activeTab === 'invoices' && (
        <section
          className="nss-fade overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--panel)]"
          style={{ animationDelay: '160ms' }}
        >
          <header className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.12)] px-5 py-4">
            <h3 className="nss-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[rgba(var(--text-rgb),0.75)]">
              <FileText className="h-4 w-4 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.dash.invoicesTitle')}
            </h3>
            {invoices.length > 0 && (
              <span className="nss-mono rounded-sm border border-[rgba(var(--gold-rgb),0.3)] px-1.5 py-0.5 text-[10px] text-[rgb(var(--gold-rgb))]">
                {invoices.length}
              </span>
            )}
          </header>

          <div className="p-5">
            <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
              <Table>
                <TableHeader className="bg-[rgba(var(--bg-rgb),0.6)]">
                  <TableRow className="border-[rgba(var(--gold-rgb),0.12)] hover:bg-transparent">
                    <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.client.dash.thInvoiceNum')}</TableHead>
                    <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.client.dash.thIssueDate')}</TableHead>
                    <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.client.dash.thDueDate')}</TableHead>
                    <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.client.dash.thAmount')}</TableHead>
                    <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.client.dash.thStatus')}</TableHead>
                    <TableHead className="nss-mono text-end text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.client.dash.thDownload')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id} className="border-[rgba(var(--gold-rgb),0.08)] transition-colors duration-200 hover:bg-[rgba(var(--gold-rgb),0.04)]">
                      <TableCell className="nss-mono text-sm font-semibold text-[rgb(var(--gold-rgb))]">{inv.invoiceNumber}</TableCell>
                      <TableCell className="nss-mono text-xs text-[rgba(var(--text-rgb),0.7)]">{inv.issueDate}</TableCell>
                      <TableCell className="nss-mono text-xs text-[rgba(var(--text-rgb),0.7)]">{inv.dueDate}</TableCell>
                      <TableCell className="nss-mono font-bold text-[rgb(var(--text-rgb))]">${inv.amountUsd.toLocaleString()}</TableCell>
                      <TableCell><StatusBadge status={inv.status} /></TableCell>
                      <TableCell className="text-end">
                        <button
                          className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs font-semibold text-[rgb(var(--gold-rgb))] transition-colors duration-200 hover:bg-[rgba(var(--gold-rgb),0.08)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.5)]"
                          onClick={() => setDetailInvoice(inv)}
                        >
                          <Download className="h-3.5 w-3.5" /> {t('portal.client.dash.pdfBtn')}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: CALCULATOR */}
      {activeTab === 'calculator' && (
        <section
          className="nss-fade mx-auto max-w-2xl overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--panel)]"
          style={{ animationDelay: '160ms' }}
        >
          <header className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.12)] px-5 py-4">
            <h3 className="nss-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[rgba(var(--text-rgb),0.75)]">
              <Calculator className="h-4 w-4 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.dash.calcTitle')}
            </h3>
          </header>

          <div className="space-y-4 p-5 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.client.dash.calcOriginLabel')}</Label>
                <Input value={origin} onChange={(e) => setOrigin(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.client.dash.calcDestLabel')}</Label>
                <Input value={destination} onChange={(e) => setDestination(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.client.dash.calcModeLabel')}</Label>
                <Select value={mode} onValueChange={(val) => setMode(val as TransitMode)}>
                  <SelectTrigger className={inputClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="RAIL">{t('portal.client.dash.modeRail')}</SelectItem>
                    <SelectItem value="ROAD">{t('portal.client.dash.modeRoad')}</SelectItem>
                    <SelectItem value="AIR">{t('portal.client.dash.modeAir')}</SelectItem>
                    <SelectItem value="SEA">{t('portal.client.dash.modeSea')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.client.dash.calcWeightLabel')}</Label>
                <Input type="number" value={weightTons} onChange={(e) => setWeightTons(Number(e.target.value))} className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-[rgba(var(--gold-rgb),0.3)] bg-[linear-gradient(105deg,rgba(var(--gold-rgb),0.1),rgba(var(--gold-rgb),0.02)_60%,transparent)] p-4">
              <div>
                <span className={`${labelClass} block`}>{t('portal.client.dash.estFreightCost')}</span>
                <span className="nss-mono mt-1 block text-2xl font-bold text-[rgb(var(--gold-rgb))]">${calculatedCost.toLocaleString()} USD</span>
              </div>
              <button className={`${primaryBtnClass} shrink-0`} onClick={() => setIsOrderModalOpen(true)}>
                {t('portal.client.dash.bookRateBtn')}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: SUPPORT */}
      {activeTab === 'support' && (
        <section
          className="nss-fade mx-auto max-w-2xl overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--panel)]"
          style={{ animationDelay: '160ms' }}
        >
          <header className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.12)] px-5 py-4">
            <h3 className="nss-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[rgba(var(--text-rgb),0.75)]">
              <Headphones className="h-4 w-4 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.dash.supportTitle')}
            </h3>
          </header>

          <div className="space-y-4 p-5 text-sm">
            <div className="rounded-xl border border-[var(--card-border)] bg-[rgba(var(--bg-rgb),0.4)] p-4">
              <h4 className="nss-mono mb-1 text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--gold-rgb))]">{t('portal.client.dash.accountMgrTitle')}</h4>
              <p className="font-semibold text-[rgb(var(--text-rgb))]">{t('portal.client.dash.accountMgrName')}</p>
              <p className="mt-0.5 text-xs text-[rgba(var(--text-rgb),0.55)]">{t('portal.client.dash.accountMgrContact')}</p>
            </div>
            <div className="space-y-2">
              <Label className={labelClass}>{t('portal.client.dash.supportInquiryLabel')}</Label>
              <Input placeholder={t('portal.client.dash.supportInquiryPlaceholder')} className={inputClass} />
              <button className={`${primaryBtnClass} w-full`} onClick={() => toast.success(t('portal.client.dash.supportToast'))}>
                {t('portal.client.dash.sendInquiryBtn')}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* NEW ORDER WIZARD MODAL */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-lg border border-[var(--card-border)] bg-[var(--panel)] text-[rgb(var(--text-rgb))]">
          <DialogHeader>
            <DialogTitle className="nss-display flex items-center gap-2 text-lg text-[rgb(var(--text-rgb))]">
              <Truck className="h-5 w-5 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.dash.wizardTitle')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.client.dash.wizardOriginLabel')}</Label>
                <Input value={origin} onChange={(e) => setOrigin(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.client.dash.wizardDestLabel')}</Label>
                <Input value={destination} onChange={(e) => setDestination(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.client.dash.wizardModeLabel')}</Label>
                <Select value={mode} onValueChange={(val) => setMode(val as TransitMode)}>
                  <SelectTrigger className={inputClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="RAIL">RAIL</SelectItem>
                    <SelectItem value="ROAD">ROAD</SelectItem>
                    <SelectItem value="AIR">AIR</SelectItem>
                    <SelectItem value="SEA">SEA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.client.dash.wizardTonnageLabel')}</Label>
                <Input type="number" value={weightTons} onChange={(e) => setWeightTons(Number(e.target.value))} className={inputClass} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className={labelClass}>{t('portal.client.dash.wizardDescLabel')}</Label>
              <Input value={cargoDesc} onChange={(e) => setCargoDesc(e.target.value)} className={inputClass} />
            </div>

            <div className="flex items-center justify-between gap-3 rounded-lg border border-[rgba(var(--gold-rgb),0.3)] bg-[linear-gradient(105deg,rgba(var(--gold-rgb),0.1),rgba(var(--gold-rgb),0.02)_60%,transparent)] p-3">
              <span className={labelClass}>{t('portal.client.dash.wizardCalculatedAmount')}</span>
              <span className="nss-mono text-lg font-bold text-[rgb(var(--gold-rgb))]">${calculatedCost.toLocaleString()} USD</span>
            </div>
          </div>

          <DialogFooter>
            <button className={ghostBtnClass} onClick={() => setIsOrderModalOpen(false)}>
              {t('portal.client.dash.wizardCancelBtn')}
            </button>
            <button className={primaryBtnClass} onClick={handleConfirmOrder}>
              {t('portal.client.dash.wizardConfirmBtn')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice detail side-sheet */}
      <InvoiceDetailSheet
        invoice={detailInvoice}
        order={detailInvoice ? orders.find((o) => o.id === detailInvoice.orderId) ?? null : null}
        isOpen={!!detailInvoice}
        onClose={() => setDetailInvoice(null)}
      />
    </div>
  );
};
