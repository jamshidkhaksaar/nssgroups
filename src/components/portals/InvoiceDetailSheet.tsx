import React from 'react';
import { useI18n } from '@/i18n/i18n';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { StatusBadge } from './StatusBadge';
import { KpiCard } from './primitives';
import type { ClientInvoice, LogisticsOrder } from '@/types/portal';
import { Calendar, MapPin, Truck, Download, Package } from 'lucide-react';
import { toast } from 'sonner';

interface InvoiceDetailSheetProps {
  invoice: ClientInvoice | null;
  order?: LogisticsOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceDetailSheet: React.FC<InvoiceDetailSheetProps> = ({ invoice, order, isOpen, onClose }) => {
  const { t } = useI18n();
  if (!invoice) return null;

  const handleDownload = () => {
    toast.info(`${t('portal.client.dash.downloadToast')} ${invoice.invoiceNumber}.pdf`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md border-[var(--card-border)] bg-[var(--panel)] text-[rgb(var(--text-rgb))] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between gap-2">
            <SheetTitle className="nss-mono font-bold text-[rgb(var(--gold-rgb))]">{invoice.invoiceNumber}</SheetTitle>
            <StatusBadge status={invoice.status} />
          </div>
          <SheetDescription className="text-xs text-[rgba(var(--text-rgb),0.6)]">NSS Group — Freight invoice</SheetDescription>
        </SheetHeader>

        {/* Amount */}
        <div className="mt-5 rounded-2xl border border-[rgba(var(--gold-rgb),0.25)] bg-[linear-gradient(150deg,rgba(var(--gold-rgb),0.1),transparent_60%)] p-5 text-center">
          <span className="nss-mono block text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.5)]">Amount due</span>
          <span className="nss-mono mt-1 block text-4xl font-bold text-[rgb(var(--gold-rgb))]">
            ${invoice.amountUsd.toLocaleString()}
          </span>
        </div>

        {/* Key dates */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <KpiCard label="Issued" value={invoice.issueDate} icon={Calendar} valueClassName="nss-mono text-[15px] font-bold leading-tight text-[rgb(var(--text-rgb))]" />
          <KpiCard label="Due" value={invoice.dueDate} icon={Calendar} valueClassName="nss-mono text-[15px] font-bold leading-tight text-[rgb(var(--text-rgb))]" />
        </div>

        {/* Linked shipment */}
        <div className="mt-4 space-y-3 rounded-xl border border-[var(--card-border)] bg-[rgba(var(--bg-rgb),0.4)] p-4">
          <h4 className="nss-mono flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">
            <Truck className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> Associated shipment
          </h4>
          {order ? (
            <div className="space-y-1.5 text-sm">
              <p className="flex items-center gap-2 text-[rgb(var(--text-rgb))]"><Package className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {order.cargoDescription}</p>
              <p className="nss-mono flex items-center gap-2 text-xs text-[rgb(var(--gold-rgb))]">{order.trackingNumber}</p>
              <p className="flex items-center gap-2 text-xs text-[rgba(var(--text-rgb),0.7)]"><MapPin className="h-3.5 w-3.5" /> {order.origin} → {order.destination}</p>
            </div>
          ) : (
            <p className="text-xs italic text-[rgba(var(--text-rgb),0.45)]">No linked order on file</p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-2">
          <button
            onClick={handleDownload}
            className="nss-btn-primary inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.6)]"
          >
            <Download className="h-4 w-4" /> {t('portal.client.dash.pdfBtn')}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
