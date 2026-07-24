import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { StatusBadge } from './StatusBadge';
import type { ClientProfile, LogisticsOrder, ClientInvoice, TransitMode } from '@/types/portal';
import { Truck, Plus, FileText, Calculator, Download, Headphones } from 'lucide-react';
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

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  client,
  orders,
  invoices,
  onPlaceOrder
}) => {
  const { t } = useI18n();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'shipments' | 'invoices' | 'calculator' | 'support'>('shipments');

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
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white font-sora">{client.companyName}</h2>
            <StatusBadge status={client.state} />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t('portal.client.dash.verifiedIdLabel')} <span className="font-mono text-slate-300">{client.id}</span> • {client.fullName} ({client.email})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 shadow-lg shadow-amber-500/20"
            onClick={() => setIsOrderModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> {t('portal.client.dash.placeOrderBtn')}
          </Button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('shipments')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'shipments' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Truck className="w-4 h-4" /> {t('portal.client.dash.activeShipmentsTab')} ({clientOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'invoices' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" /> {t('portal.client.dash.billingInvoicesTab')} ({invoices.length})
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'calculator' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" /> {t('portal.client.dash.rateCalculatorTab')}
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'support' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Headphones className="w-4 h-4" /> {t('portal.client.dash.supportDeskTab')}
        </button>
      </div>

      {/* TAB CONTENT: SHIPMENTS */}
      {activeTab === 'shipments' && (
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-500" /> {t('portal.client.dash.shipmentsTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {clientOrders.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm space-y-2">
                <Truck className="w-10 h-10 mx-auto text-slate-600" />
                <p>{t('portal.client.dash.noShipments')}</p>
                <Button size="sm" className="bg-amber-500 text-slate-950 font-bold mt-2" onClick={() => setIsOrderModalOpen(true)}>
                  {t('portal.client.dash.bookFirstCargo')}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {clientOrders.map((order) => (
                  <div key={order.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <span className="text-xs text-amber-400 font-mono font-bold block">{order.trackingNumber}</span>
                        <h4 className="font-semibold text-slate-200 text-sm">{order.cargoDescription} ({order.weightTons} {t('portal.client.dash.tonsSuffix')})</h4>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block">{t('portal.client.dash.originDestLabel')}</span>
                        <span className="font-medium text-slate-200">{order.origin} → {order.destination}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">{t('portal.client.dash.transitModeLabel')}</span>
                        <span className="font-semibold text-amber-400">{order.mode} {t('portal.client.dash.freightSuffix')}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">{t('portal.client.dash.estDeliveryLabel')}</span>
                        <span className="font-mono text-slate-300">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Checkpoints Timeline */}
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">{t('portal.client.dash.liveProgressTitle')}</span>
                      <div className="space-y-2">
                        {order.checkpoints.map((chk, i) => (
                          <div key={chk.id} className="flex items-start gap-2.5 text-xs">
                            <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-slate-200 font-medium">
                                <span>{chk.location}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{new Date(chk.timestamp).toLocaleString()}</span>
                              </div>
                              <p className="text-amber-400/90 text-[11px]">{chk.status} — <span className="text-slate-400">{chk.notes}</span></p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* TAB CONTENT: INVOICES */}
      {activeTab === 'invoices' && (
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" /> {t('portal.client.dash.invoicesTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-slate-800 overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-950">
                  <TableRow className="border-slate-800 text-slate-400">
                    <TableHead className="font-semibold text-slate-300">{t('portal.client.dash.thInvoiceNum')}</TableHead>
                    <TableHead className="font-semibold text-slate-300">{t('portal.client.dash.thIssueDate')}</TableHead>
                    <TableHead className="font-semibold text-slate-300">{t('portal.client.dash.thDueDate')}</TableHead>
                    <TableHead className="font-semibold text-slate-300">{t('portal.client.dash.thAmount')}</TableHead>
                    <TableHead className="font-semibold text-slate-300">{t('portal.client.dash.thStatus')}</TableHead>
                    <TableHead className="text-end font-semibold text-slate-300">{t('portal.client.dash.thDownload')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id} className="border-slate-800 hover:bg-slate-800/30">
                      <TableCell className="font-mono font-semibold text-amber-400 text-sm">{inv.invoiceNumber}</TableCell>
                      <TableCell className="text-xs text-slate-300">{inv.issueDate}</TableCell>
                      <TableCell className="text-xs text-slate-300">{inv.dueDate}</TableCell>
                      <TableCell className="font-mono font-bold text-slate-200">${inv.amountUsd.toLocaleString()}</TableCell>
                      <TableCell><StatusBadge status={inv.status} /></TableCell>
                      <TableCell className="text-end">
                        <Button size="sm" variant="ghost" className="h-8 text-xs text-amber-400 hover:bg-amber-500/10" onClick={() => toast.info(`${t('portal.client.dash.downloadToast')} ${inv.invoiceNumber}.pdf`)}>
                          <Download className="w-3.5 h-3.5 me-1" /> {t('portal.client.dash.pdfBtn')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB CONTENT: CALCULATOR */}
      {activeTab === 'calculator' && (
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-500" /> {t('portal.client.dash.calcTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-slate-300">{t('portal.client.dash.calcOriginLabel')}</Label>
                <Input value={origin} onChange={(e) => setOrigin(e.target.value)} className="bg-slate-950 border-slate-800 text-slate-200" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-slate-300">{t('portal.client.dash.calcDestLabel')}</Label>
                <Input value={destination} onChange={(e) => setDestination(e.target.value)} className="bg-slate-950 border-slate-800 text-slate-200" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-slate-300">{t('portal.client.dash.calcModeLabel')}</Label>
                <Select value={mode} onValueChange={(val) => setMode(val as TransitMode)}>
                  <SelectTrigger className="bg-slate-950 border-slate-800 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                    <SelectItem value="RAIL">{t('portal.client.dash.modeRail')}</SelectItem>
                    <SelectItem value="ROAD">{t('portal.client.dash.modeRoad')}</SelectItem>
                    <SelectItem value="AIR">{t('portal.client.dash.modeAir')}</SelectItem>
                    <SelectItem value="SEA">{t('portal.client.dash.modeSea')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-slate-300">{t('portal.client.dash.calcWeightLabel')}</Label>
                <Input type="number" value={weightTons} onChange={(e) => setWeightTons(Number(e.target.value))} className="bg-slate-950 border-slate-800 text-slate-200" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">{t('portal.client.dash.estFreightCost')}</span>
                <span className="text-2xl font-black text-amber-400 font-mono">${calculatedCost.toLocaleString()} USD</span>
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold" onClick={() => setIsOrderModalOpen(true)}>
                {t('portal.client.dash.bookRateBtn')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB CONTENT: SUPPORT */}
      {activeTab === 'support' && (
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Headphones className="w-5 h-5 text-amber-500" /> {t('portal.client.dash.supportTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider mb-1">{t('portal.client.dash.accountMgrTitle')}</h4>
              <p className="text-slate-200 font-semibold">{t('portal.client.dash.accountMgrName')}</p>
              <p className="text-xs text-slate-400">{t('portal.client.dash.accountMgrContact')}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-slate-300">{t('portal.client.dash.supportInquiryLabel')}</Label>
              <Input placeholder={t('portal.client.dash.supportInquiryPlaceholder')} className="bg-slate-950 border-slate-800 text-slate-200" />
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold" onClick={() => toast.success(t('portal.client.dash.supportToast'))}>
                {t('portal.client.dash.sendInquiryBtn')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* NEW ORDER WIZARD MODAL */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-lg bg-[var(--bg)] border-slate-700/50 text-[rgb(var(--text-rgb))]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-amber-400 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-500" /> {t('portal.client.dash.wizardTitle')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-slate-400">{t('portal.client.dash.wizardOriginLabel')}</Label>
                <Input value={origin} onChange={(e) => setOrigin(e.target.value)} className="bg-slate-900 border-slate-700 text-slate-200" />
              </div>
              <div>
                <Label className="text-xs text-slate-400">{t('portal.client.dash.wizardDestLabel')}</Label>
                <Input value={destination} onChange={(e) => setDestination(e.target.value)} className="bg-slate-900 border-slate-700 text-slate-200" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-slate-400">{t('portal.client.dash.wizardModeLabel')}</Label>
                <Select value={mode} onValueChange={(val) => setMode(val as TransitMode)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                    <SelectItem value="RAIL">RAIL</SelectItem>
                    <SelectItem value="ROAD">ROAD</SelectItem>
                    <SelectItem value="AIR">AIR</SelectItem>
                    <SelectItem value="SEA">SEA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-slate-400">{t('portal.client.dash.wizardTonnageLabel')}</Label>
                <Input type="number" value={weightTons} onChange={(e) => setWeightTons(Number(e.target.value))} className="bg-slate-900 border-slate-700 text-slate-200" />
              </div>
            </div>

            <div>
              <Label className="text-xs text-slate-400">{t('portal.client.dash.wizardDescLabel')}</Label>
              <Input value={cargoDesc} onChange={(e) => setCargoDesc(e.target.value)} className="bg-slate-900 border-slate-700 text-slate-200" />
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-amber-500/30 flex justify-between items-center font-mono">
              <span className="text-xs text-slate-400">{t('portal.client.dash.wizardCalculatedAmount')}</span>
              <span className="text-lg font-bold text-amber-400">${calculatedCost.toLocaleString()} USD</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsOrderModalOpen(false)}>{t('portal.client.dash.wizardCancelBtn')}</Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold" onClick={handleConfirmOrder}>
              {t('portal.client.dash.wizardConfirmBtn')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
