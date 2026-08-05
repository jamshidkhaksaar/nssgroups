import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { StatusBadge } from './StatusBadge';
import { KpiCard } from './primitives';
import type { LogisticsOrder } from '@/types/portal';
import { Package, MapPin, Clock, DollarSign, Truck, Navigation } from 'lucide-react';

interface OrderDetailSheetProps {
  order: LogisticsOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailSheet: React.FC<OrderDetailSheetProps> = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  const timeline = [...order.checkpoints].sort((a, b) => +new Date(a.timestamp) - +new Date(b.timestamp));

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg border-[var(--card-border)] bg-[var(--panel)] text-[rgb(var(--text-rgb))] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between gap-2">
            <SheetTitle className="nss-mono font-bold text-[rgb(var(--gold-rgb))]">{order.trackingNumber}</SheetTitle>
            <StatusBadge status={order.status} />
          </div>
          <SheetDescription className="text-xs text-[rgba(var(--text-rgb),0.6)]">
            {order.clientName} • {order.mode} • {order.origin} → {order.destination}
          </SheetDescription>
        </SheetHeader>

        {/* Route summary */}
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[rgba(var(--bg-rgb),0.4)] px-4 py-3 text-sm">
          <MapPin className="h-4 w-4 shrink-0 text-[rgb(var(--gold-rgb))]" />
          <span className="font-medium text-[rgb(var(--text-rgb))]">{order.origin}</span>
          <span className="flex-1 border-t border-dashed border-[rgba(var(--gold-rgb),0.4)]" />
          <Navigation className="h-4 w-4 shrink-0 text-[rgb(var(--gold-rgb))]" />
          <span className="font-medium text-[rgb(var(--text-rgb))]">{order.destination}</span>
        </div>

        {/* Cargo meta */}
        <div className="mt-4 gap-3 grid grid-cols-2">
          <KpiCard label="Cargo" value={order.cargoDescription} icon={Package} valueClassName="nss-mono text-[16px] font-bold leading-tight text-[rgb(var(--text-rgb))]" />
          <KpiCard label="Weight" value={`${order.weightTons} t`} icon={Clock} valueClassName="nss-mono text-[16px] font-bold leading-tight text-[rgb(var(--text-rgb))]" />
          <KpiCard label="Mode" value={order.mode} icon={Truck} valueClassName="nss-mono text-[16px] font-bold leading-tight text-[rgb(var(--gold-rgb))]" />
          <KpiCard label="Amount" value={`$${order.amountUsd.toLocaleString()}`} icon={DollarSign} valueClassName="nss-mono text-[16px] font-bold leading-tight text-[rgb(var(--gold-rgb))]" />
        </div>

        {/* Checkpoint timeline */}
        <div className="mt-5">
          <h4 className="nss-mono mb-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">
            <MapPin className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> Checkpoint timeline ({timeline.length})
          </h4>
          <div className="space-y-0">
            {timeline.length === 0 ? (
              <p className="text-xs italic text-[rgba(var(--text-rgb),0.45)]">No checkpoints yet</p>
            ) : (
              timeline.map((chk, i) => {
                const isLast = i === timeline.length - 1;
                return (
                  <div key={chk.id} className="relative flex gap-3 pb-4">
                    {!isLast && <span className="absolute start-[5px] top-4 h-full w-px bg-[rgba(var(--gold-rgb),0.2)]" />}
                    <span className={`relative z-10 mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${isLast ? 'bg-[rgb(var(--gold-rgb))]' : 'bg-[rgb(var(--gold-rgb))] opacity-60'}`} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[rgb(var(--text-rgb))]">{chk.location}</span>
                        <span className="nss-mono text-[10px] text-[rgba(var(--text-rgb),0.45)]">
                          {new Date(chk.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] text-[rgb(var(--gold-rgb))]">{chk.status}</p>
                      {chk.notes && <p className="mt-0.5 text-[11px] text-[rgba(var(--text-rgb),0.55)]">{chk.notes}</p>}
                      {chk.updatedBy && <p className="text-[10px] text-[rgba(var(--text-rgb),0.35)]">by {chk.updatedBy}</p>}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
