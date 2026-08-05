import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { StatusBadge } from './StatusBadge';
import type { PartnerVendor, PartnerBid, OpenFreightRequest } from '@/types/portal';
import { Gavel, Clock, Send, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface PartnerBidsProps {
  partner: PartnerVendor;
  bids: PartnerBid[];
  freightRequests: OpenFreightRequest[];
  onSubmitBid: (bid: {
    requestId: string;
    partnerId: string;
    partnerName: string;
    clientName: string;
    route: string;
    cargoDescription: string;
    proposedPriceUsd: number;
    estimatedTransitDays: number;
  }) => void;
}

const inputClass = [
  'bg-[rgba(var(--bg-rgb),0.5)] border-[rgba(var(--gold-rgb),0.2)] text-[rgb(var(--text-rgb))]',
  'transition-colors duration-200 focus:border-[rgba(var(--gold-rgb),0.6)]',
  'focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.35)]',
].join(' ');

const labelClass = 'nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]';

const ghostBtnClass = [
  'inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(var(--gold-rgb),0.35)]',
  'px-4 py-2 text-sm font-semibold text-[rgb(var(--gold-rgb))]',
  'transition-all duration-200 hover:border-[rgba(var(--gold-rgb),0.8)] hover:bg-[rgba(var(--gold-rgb),0.08)]',
  'hover:-translate-y-px active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.5)]',
].join(' ');

const primaryBtnClass = [
  'nss-btn-primary inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm',
  'transition-all duration-200 active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.6)]',
].join(' ');

const emeraldText = 'text-emerald-400 [html[data-theme=light]_&]:text-emerald-700';

export const PartnerBids: React.FC<PartnerBidsProps> = ({
  partner,
  bids,
  freightRequests,
  onSubmitBid
}) => {
  const { t } = useI18n();
  const [selectedRequest, setSelectedRequest] = useState<OpenFreightRequest | null>(null);
  const [proposedPriceUsd, setProposedPriceUsd] = useState<number>(135000);
  const [estimatedTransitDays, setEstimatedTransitDays] = useState<number>(4);

  const partnerBids = bids.filter((b) => b.partnerId === partner.id || b.partnerName === partner.companyName);

  const handleOpenBidModal = (req: OpenFreightRequest) => {
    setSelectedRequest(req);
    setProposedPriceUsd(Math.round(req.targetBudgetUsd * 0.95));
  };

  const handleConfirmSubmitBid = () => {
    if (!selectedRequest) return;
    onSubmitBid({
      requestId: selectedRequest.id,
      partnerId: partner.id,
      partnerName: partner.companyName,
      clientName: selectedRequest.clientName,
      route: `${selectedRequest.origin} → ${selectedRequest.destination}`,
      cargoDescription: selectedRequest.cargoDescription,
      proposedPriceUsd,
      estimatedTransitDays
    });
    toast.success(t('portal.partnerBids.bidSubmittedToast'));
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-6">
      {/* Open Freight Cargo Requests Board */}
      <section className="nss-fade overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--panel)]">
        <header className="border-b border-[rgba(var(--gold-rgb),0.12)] px-5 py-4">
          <h3 className="nss-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[rgba(var(--text-rgb),0.75)]">
            <Gavel className="h-4 w-4 text-[rgb(var(--gold-rgb))]" />
            {t('portal.partnerBids.title')}
          </h3>
          <p className="mt-1 text-xs text-[rgba(var(--text-rgb),0.55)]">{t('portal.partnerBids.sub')}</p>
        </header>

        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {freightRequests.map((req, i) => (
              <div
                key={req.id}
                className="nss-card nss-fade flex flex-col justify-between space-y-3 rounded-xl p-4"
                style={{ animationDelay: `${80 + i * 70}ms` }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="nss-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[rgb(var(--gold-rgb))]">
                      {req.mode} {t('portal.partnerBids.freightSuffix')}
                    </span>
                    <span className="nss-mono flex items-center gap-1 text-[11px] text-[rgba(var(--text-rgb),0.5)]">
                      <Clock className="h-3 w-3 text-[rgb(var(--gold-rgb))]" /> {req.bidsCount} {t('portal.partnerBids.bidsSubmittedCount')}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[rgb(var(--text-rgb))]">{req.clientName}</h4>
                  <p className="text-xs font-medium text-[rgba(var(--text-rgb),0.75)]">
                    {req.cargoDescription} ({req.weightTons} {t('portal.partnerBids.tonsSuffix')})
                  </p>
                  <div className="nss-mono text-xs text-[rgba(var(--text-rgb),0.5)]">
                    <div>{t('portal.partnerBids.originLabel')} <span className="text-[rgb(var(--text-rgb))]">{req.origin}</span></div>
                    <div>{t('portal.partnerBids.destLabel')} <span className="text-[rgb(var(--text-rgb))]">{req.destination}</span></div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[rgba(var(--gold-rgb),0.12)] pt-3">
                  <div>
                    <span className="nss-mono block text-[9px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.45)]">
                      {t('portal.partnerBids.targetBudgetLabel')}
                    </span>
                    <span className={`nss-mono text-sm font-bold ${emeraldText}`}>${req.targetBudgetUsd.toLocaleString()}</span>
                  </div>
                  <button
                    className={`${primaryBtnClass} px-3 py-1.5 text-xs`}
                    onClick={() => handleOpenBidModal(req)}
                  >
                    {t('portal.partnerBids.submitBidBtn')} <ArrowRight className="ms-1 h-3.5 w-3.5 rtl:-scale-x-100" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submitted Active Bids Table */}
      <section
        className="nss-fade overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--panel)]"
        style={{ animationDelay: '160ms' }}
      >
        <header className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.12)] px-5 py-4">
          <h3 className="nss-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[rgba(var(--text-rgb),0.75)]">
            <Send className="h-4 w-4 text-[rgb(var(--gold-rgb))]" />
            {t('portal.partnerBids.submittedBidsTitle')}
          </h3>
          {partnerBids.length > 0 && (
            <span className="nss-mono rounded-sm border border-[rgba(var(--gold-rgb),0.3)] px-1.5 py-0.5 text-[10px] text-[rgb(var(--gold-rgb))]">
              {partnerBids.length}
            </span>
          )}
        </header>

        <div className="p-5">
          <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
            <Table>
              <TableHeader className="bg-[rgba(var(--bg-rgb),0.5)]">
                <TableRow className="border-[rgba(var(--gold-rgb),0.12)] hover:bg-transparent">
                  <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.partnerBids.thClient')}</TableHead>
                  <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.partnerBids.thRouteCargo')}</TableHead>
                  <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.partnerBids.thProposedRate')}</TableHead>
                  <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.partnerBids.thEstDays')}</TableHead>
                  <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.partnerBids.thStatus')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnerBids.length === 0 ? (
                  <TableRow className="border-[rgba(var(--gold-rgb),0.08)] hover:bg-transparent">
                    <TableCell colSpan={5} className="py-6 text-center text-sm text-[rgba(var(--text-rgb),0.5)]">
                      {t('portal.partnerBids.noBidsYet')}
                    </TableCell>
                  </TableRow>
                ) : (
                  partnerBids.map((bid) => (
                    <TableRow key={bid.id} className="border-[rgba(var(--gold-rgb),0.08)] transition-colors duration-200 hover:bg-[rgba(var(--gold-rgb),0.04)]">
                      <TableCell className="text-sm font-semibold text-[rgb(var(--gold-rgb))]">{bid.clientName}</TableCell>
                      <TableCell className="text-xs">
                        <div className="font-medium text-[rgb(var(--text-rgb))]">{bid.route}</div>
                        <div className="text-[rgba(var(--text-rgb),0.5)]">{bid.cargoDescription}</div>
                      </TableCell>
                      <TableCell className={`nss-mono text-sm font-bold ${emeraldText}`}>${bid.proposedPriceUsd.toLocaleString()} USD</TableCell>
                      <TableCell className="nss-mono text-xs text-[rgba(var(--text-rgb),0.75)]">{bid.estimatedTransitDays} {t('portal.partnerBids.daysSuffix')}</TableCell>
                      <TableCell><StatusBadge status={bid.status} /></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* BID SUBMISSION MODAL */}
      <Dialog open={Boolean(selectedRequest)} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-md border-[var(--card-border)] bg-[var(--panel)] text-[rgb(var(--text-rgb))]">
          <DialogHeader>
            <DialogTitle className="nss-display flex items-center gap-2 text-lg text-[rgb(var(--text-rgb))]">
              <Gavel className="h-5 w-5 text-[rgb(var(--gold-rgb))]" /> {t('portal.partnerBids.modalTitle')} {selectedRequest?.clientName}
            </DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-2 text-sm">
              <div className="space-y-1 rounded-lg border border-[rgba(var(--gold-rgb),0.2)] bg-[rgba(var(--bg-rgb),0.5)] p-3 text-xs">
                <span className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.5)]">
                  {t('portal.partnerBids.cargoReqsTitle')}
                </span>
                <p className="font-semibold text-[rgb(var(--text-rgb))]">
                  {selectedRequest.cargoDescription} ({selectedRequest.weightTons} {t('portal.partnerBids.tonsSuffix')})
                </p>
                <p className="text-[rgba(var(--text-rgb),0.55)]">{selectedRequest.origin} → {selectedRequest.destination}</p>
                <p className="nss-mono pt-1 font-bold text-[rgb(var(--gold-rgb))]">
                  {t('portal.partnerBids.clientBudgetLabel')} ${selectedRequest.targetBudgetUsd.toLocaleString()}
                </p>
              </div>

              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.partnerBids.proposedRateLabel')}</Label>
                <Input
                  type="number"
                  value={proposedPriceUsd}
                  onChange={(e) => setProposedPriceUsd(Number(e.target.value))}
                  className={`nss-mono text-base font-bold ${inputClass}`}
                />
              </div>

              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.partnerBids.estTransitDaysLabel')}</Label>
                <Input
                  type="number"
                  value={estimatedTransitDays}
                  onChange={(e) => setEstimatedTransitDays(Number(e.target.value))}
                  className={`nss-mono ${inputClass}`}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <button className={ghostBtnClass} onClick={() => setSelectedRequest(null)}>
              {t('portal.partnerBids.cancelBtn')}
            </button>
            <button className={primaryBtnClass} onClick={handleConfirmSubmitBid}>
              {t('portal.partnerBids.submitProposalBtn')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
