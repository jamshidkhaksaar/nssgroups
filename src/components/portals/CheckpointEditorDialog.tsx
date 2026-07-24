import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { LogisticsOrder, OrderStatus } from '@/types/portal';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface CheckpointEditorDialogProps {
  order: LogisticsOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onAddCheckpoint: (orderId: string, checkpoint: { location: string; status: string; notes: string }) => void;
}

export const CheckpointEditorDialog: React.FC<CheckpointEditorDialogProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
  onAddCheckpoint
}) => {
  const { t } = useI18n();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('in_transit');
  const [location, setLocation] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('Customs Inspection In Progress');
  const [notes, setNotes] = useState<string>('');

  if (!order) return null;

  const handleSubmitCheckpoint = () => {
    if (!location.trim()) {
      toast.error(t('portal.checkpoint.errLocation'));
      return;
    }
    onAddCheckpoint(order.id, {
      location,
      status: statusText,
      notes: notes || t('portal.checkpoint.defaultNotes')
    });
    if (selectedStatus !== order.status) {
      onUpdateStatus(order.id, selectedStatus);
    }
    toast.success(`${t('portal.checkpoint.successToast')} ${order.trackingNumber}.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[var(--bg)] border-slate-700/50 text-[rgb(var(--text-rgb))]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center gap-2 text-amber-400">
            <MapPin className="w-5 h-5 text-amber-500" />
            {t('portal.checkpoint.dialogTitle')}
          </DialogTitle>
          <p className="text-xs text-slate-400">
            {t('portal.checkpoint.shipmentLabel')} <span className="font-mono text-slate-200">{order.trackingNumber}</span> ({order.origin} → {order.destination})
          </p>
        </DialogHeader>

        <div className="space-y-4 py-2 text-sm">
          {/* Order Status Select */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">{t('portal.checkpoint.updateStatusLabel')}</label>
            <Select value={selectedStatus} onValueChange={(val) => setSelectedStatus(val as OrderStatus)}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200">
                <SelectValue placeholder={t('portal.checkpoint.statusPlaceholder')} />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                <SelectItem value="in_transit">{t('portal.status.in_transit')}</SelectItem>
                <SelectItem value="customs_clearance">{t('portal.status.customs_clearance')}</SelectItem>
                <SelectItem value="delayed">{t('portal.status.delayed')}</SelectItem>
                <SelectItem value="delivered">{t('portal.status.delivered')}</SelectItem>
                <SelectItem value="order_placed">{t('portal.status.order_placed')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Input */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">{t('portal.checkpoint.locationLabel')}</label>
            <Input
              placeholder={t('portal.checkpoint.locationPlaceholder')}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-slate-900 border-slate-700 text-slate-200"
            />
          </div>

          {/* Status Headline */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">{t('portal.checkpoint.headlineLabel')}</label>
            <Input
              placeholder={t('portal.checkpoint.headlinePlaceholder')}
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              className="bg-slate-900 border-slate-700 text-slate-200"
            />
          </div>

          {/* Detailed Notes */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">{t('portal.checkpoint.notesLabel')}</label>
            <Textarea
              placeholder={t('portal.checkpoint.notesPlaceholder')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-slate-900 border-slate-700 text-slate-200 text-sm h-20"
            />
          </div>

          {/* Current Checkpoint Timeline Preview */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {t('portal.checkpoint.historyTitle')} ({order.checkpoints.length})
            </span>
            <div className="space-y-1.5 max-h-28 overflow-y-auto pe-1">
              {order.checkpoints.map((chk) => (
                <div key={chk.id} className="text-xs p-2 rounded bg-slate-950 border border-slate-800">
                  <div className="flex justify-between text-slate-300 font-medium">
                    <span>{chk.location}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{new Date(chk.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="text-[11px] text-amber-400/90">{chk.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose}>
            {t('portal.checkpoint.cancelBtn')}
          </Button>
          <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold" onClick={handleSubmitCheckpoint}>
            <Navigation className="w-4 h-4 me-1.5" /> {t('portal.checkpoint.postBtn')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
