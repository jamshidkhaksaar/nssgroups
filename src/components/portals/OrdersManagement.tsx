import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from './StatusBadge';
import { CheckpointEditorDialog } from './CheckpointEditorDialog';
import type { LogisticsOrder, OrderStatus } from '@/types/portal';
import { Truck, Search, MapPin, Navigation } from 'lucide-react';

interface OrdersManagementProps {
  orders: LogisticsOrder[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onAddCheckpoint: (orderId: string, checkpoint: { location: string; status: string; notes: string }) => void;
}

export const OrdersManagement: React.FC<OrdersManagementProps> = ({
  orders,
  onUpdateStatus,
  onAddCheckpoint
}) => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<LogisticsOrder | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch =
      order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filterLabels: Record<'all' | 'in_transit' | 'customs_clearance' | 'delayed' | 'delivered', string> = {
    all: t('portal.ordersMgmt.filterAll'),
    in_transit: t('portal.status.in_transit'),
    customs_clearance: t('portal.status.customs_clearance'),
    delayed: t('portal.status.delayed'),
    delivered: t('portal.status.delivered')
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-500" />
              {t('portal.ordersMgmt.title')}
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">{t('portal.ordersMgmt.sub')}</p>
          </div>

          <div className="flex flex-wrap items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {(['all', 'in_transit', 'customs_clearance', 'delayed', 'delivered'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded capitalize font-medium transition-colors ${
                  filterStatus === status ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filterLabels[status]}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute start-3 top-3 text-slate-400" />
            <Input
              placeholder={t('portal.ordersMgmt.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 bg-slate-950/70 border-slate-800 text-slate-200 text-sm"
            />
          </div>

          <div className="rounded-lg border border-slate-800 overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/80">
                <TableRow className="border-slate-800 text-slate-400 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-300">{t('portal.ordersMgmt.thTrackingMode')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.ordersMgmt.thClientShipper')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.ordersMgmt.thRoute')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.ordersMgmt.thLatestCheckpoint')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.ordersMgmt.thStatus')}</TableHead>
                  <TableHead className="text-end font-semibold text-slate-300">{t('portal.ordersMgmt.thAction')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400 text-sm">
                      {t('portal.ordersMgmt.noOrders')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => {
                    const latestCheckpoint = order.checkpoints[order.checkpoints.length - 1];
                    return (
                      <TableRow key={order.id} className="border-slate-800/60 hover:bg-slate-800/30 transition-colors">
                        <TableCell>
                          <div className="font-mono font-semibold text-amber-400 text-sm">{order.trackingNumber}</div>
                          <span className="text-[11px] text-slate-400 font-semibold">{order.mode} • {order.weightTons} {t('portal.ordersMgmt.tonsSuffix')}</span>
                        </TableCell>
                        <TableCell className="text-slate-200 text-sm font-medium">
                          {order.clientName}
                        </TableCell>
                        <TableCell className="text-xs text-slate-300">
                          <div className="font-medium text-slate-200">{order.origin}</div>
                          <div className="text-slate-400">→ {order.destination}</div>
                        </TableCell>
                        <TableCell>
                          {latestCheckpoint ? (
                            <div>
                              <div className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-amber-400" /> {latestCheckpoint.location}
                              </div>
                              <div className="text-[11px] text-slate-400">{latestCheckpoint.status}</div>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-500 italic">{t('portal.ordersMgmt.noCheckpoints')}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="text-end">
                          <Button
                            size="sm"
                            className="h-8 text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Navigation className="w-3.5 h-3.5 me-1 text-amber-400" />
                            {t('portal.ordersMgmt.updateStatusBtn')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CheckpointEditorDialog
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={onUpdateStatus}
        onAddCheckpoint={onAddCheckpoint}
      />
    </div>
  );
};
