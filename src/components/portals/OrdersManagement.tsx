import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from './StatusBadge';
import { CheckpointEditorDialog } from './CheckpointEditorDialog';
import { OrderDetailSheet } from './OrderDetailSheet';
import type { LogisticsOrder, OrderStatus } from '@/types/portal';
import { Truck, Search, MapPin, Navigation, Eye } from 'lucide-react';

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
  const [detailOrder, setDetailOrder] = useState<LogisticsOrder | null>(null);

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
      <Card className="border-[var(--card-border)] bg-[var(--panel)]">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold text-[rgb(var(--text-rgb))] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[rgb(var(--gold-rgb))]" />
              {t('portal.ordersMgmt.title')}
            </CardTitle>
            <p className="text-xs text-[rgba(var(--text-rgb),0.6)] mt-1">{t('portal.ordersMgmt.sub')}</p>
          </div>

          <div className="flex flex-wrap items-center bg-[rgba(var(--text-rgb),0.03)] p-1 rounded-lg border border-[var(--card-border)] text-xs">
            {(['all', 'in_transit', 'customs_clearance', 'delayed', 'delivered'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded capitalize font-medium transition-colors ${
                  filterStatus === status ? 'bg-[rgb(var(--gold-rgb))] text-[#1d1233] font-bold' : 'text-[rgba(var(--text-rgb),0.6)] hover:text-[rgb(var(--text-rgb))]'
                }`}
              >
                {filterLabels[status]}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute start-3 top-3 text-[rgba(var(--text-rgb),0.45)]" />
            <Input
              placeholder={t('portal.ordersMgmt.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 bg-[rgba(var(--text-rgb),0.03)] border-[var(--card-border)] text-[rgb(var(--text-rgb))] placeholder:text-[rgba(var(--text-rgb),0.45)] text-sm"
            />
          </div>

          <div className="rounded-lg border border-[var(--card-border)] overflow-x-auto">
            <Table>
              <TableHeader className="bg-[rgba(var(--text-rgb),0.03)]">
                <TableRow className="border-[var(--card-border)] hover:bg-transparent">
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.ordersMgmt.thTrackingMode')}</TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.ordersMgmt.thClientShipper')}</TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.ordersMgmt.thRoute')}</TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.ordersMgmt.thLatestCheckpoint')}</TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.ordersMgmt.thStatus')}</TableHead>
                  <TableHead className="text-end font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.ordersMgmt.thAction')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-[rgba(var(--text-rgb),0.45)] text-sm">
                      {t('portal.ordersMgmt.noOrders')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => {
                    const latestCheckpoint = order.checkpoints[order.checkpoints.length - 1];
                    return (
                      <TableRow key={order.id} className="border-[var(--card-border)] hover:bg-[rgba(var(--text-rgb),0.03)] transition-colors">
                        <TableCell>
                          <div className="nss-mono font-semibold text-[rgb(var(--gold-rgb))] text-sm">{order.trackingNumber}</div>
                          <span className="text-[11px] text-[rgba(var(--text-rgb),0.45)] font-semibold">{order.mode} • {order.weightTons} {t('portal.ordersMgmt.tonsSuffix')}</span>
                        </TableCell>
                        <TableCell className="text-[rgb(var(--text-rgb))] text-sm font-medium">
                          {order.clientName}
                        </TableCell>
                        <TableCell className="text-xs text-[rgba(var(--text-rgb),0.6)]">
                          <div className="font-medium text-[rgb(var(--text-rgb))]">{order.origin}</div>
                          <div className="text-[rgba(var(--text-rgb),0.45)]">→ {order.destination}</div>
                        </TableCell>
                        <TableCell>
                          {latestCheckpoint ? (
                            <div>
                              <div className="text-xs font-semibold text-[rgb(var(--text-rgb))] flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[rgb(var(--gold-rgb))]" /> {latestCheckpoint.location}
                              </div>
                              <div className="text-[11px] text-[rgba(var(--text-rgb),0.45)]">{latestCheckpoint.status}</div>
                            </div>
                          ) : (
                            <span className="text-xs text-[rgba(var(--text-rgb),0.45)] italic">{t('portal.ordersMgmt.noCheckpoints')}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="text-end">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 text-xs text-[rgb(var(--text-rgb))] hover:text-[rgb(var(--text-rgb))] hover:bg-[rgba(var(--text-rgb),0.05)]"
                              onClick={() => setDetailOrder(order)}
                            >
                              <Eye className="w-3.5 h-3.5 me-1 text-[rgba(var(--text-rgb),0.45)]" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              className="h-8 text-xs bg-[rgba(var(--gold-rgb),0.1)] hover:bg-[rgba(var(--gold-rgb),0.18)] text-[rgb(var(--gold-rgb))] border border-[rgba(var(--gold-rgb),0.3)]"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Navigation className="w-3.5 h-3.5 me-1" />
                              {t('portal.ordersMgmt.updateStatusBtn')}
                            </Button>
                          </div>
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

      <OrderDetailSheet
        order={detailOrder}
        isOpen={Boolean(detailOrder)}
        onClose={() => setDetailOrder(null)}
      />
    </div>
  );
};
