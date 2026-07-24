import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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
      <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Gavel className="w-5 h-5 text-amber-500" /> {t('portal.partnerBids.title')}
          </CardTitle>
          <p className="text-xs text-slate-400">{t('portal.partnerBids.sub')}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {freightRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">{req.mode} {t('portal.partnerBids.freightSuffix')}</span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-amber-400" /> {req.bidsCount} {t('portal.partnerBids.bidsSubmittedCount')}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-200 text-sm">{req.clientName}</h4>
                  <p className="text-xs text-slate-300 font-medium">{req.cargoDescription} ({req.weightTons} {t('portal.partnerBids.tonsSuffix')})</p>
                  <div className="text-xs text-slate-400 font-mono">
                    <div>{t('portal.partnerBids.originLabel')} <span className="text-slate-200">{req.origin}</span></div>
                    <div>{t('portal.partnerBids.destLabel')} <span className="text-slate-200">{req.destination}</span></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t('portal.partnerBids.targetBudgetLabel')}</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">${req.targetBudgetUsd.toLocaleString()}</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
                    onClick={() => handleOpenBidModal(req)}
                  >
                    {t('portal.partnerBids.submitBidBtn')} <ArrowRight className="w-3.5 h-3.5 ms-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submitted Active Bids Table */}
      <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Send className="w-4 h-4 text-amber-400" /> {t('portal.partnerBids.submittedBidsTitle')} ({partnerBids.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-slate-800 overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950">
                <TableRow className="border-slate-800 text-slate-400">
                  <TableHead className="font-semibold text-slate-300">{t('portal.partnerBids.thClient')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.partnerBids.thRouteCargo')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.partnerBids.thProposedRate')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.partnerBids.thEstDays')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.partnerBids.thStatus')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnerBids.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-slate-400 text-sm">
                      {t('portal.partnerBids.noBidsYet')}
                    </TableCell>
                  </TableRow>
                ) : (
                  partnerBids.map((bid) => (
                    <TableRow key={bid.id} className="border-slate-800 hover:bg-slate-800/30">
                      <TableCell className="font-semibold text-amber-400 text-sm">{bid.clientName}</TableCell>
                      <TableCell className="text-xs text-slate-300">
                        <div className="font-medium text-slate-200">{bid.route}</div>
                        <div className="text-slate-400">{bid.cargoDescription}</div>
                      </TableCell>
                      <TableCell className="font-mono text-sm font-bold text-emerald-400">${bid.proposedPriceUsd.toLocaleString()} USD</TableCell>
                      <TableCell className="font-mono text-xs text-slate-300">{bid.estimatedTransitDays} {t('portal.partnerBids.daysSuffix')}</TableCell>
                      <TableCell><StatusBadge status={bid.status} /></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* BID SUBMISSION MODAL */}
      <Dialog open={Boolean(selectedRequest)} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-md bg-[var(--bg)] border-slate-700/50 text-[rgb(var(--text-rgb))]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-amber-400 flex items-center gap-2">
              <Gavel className="w-5 h-5 text-amber-500" /> {t('portal.partnerBids.modalTitle')} {selectedRequest?.clientName}
            </DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-2 text-sm">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <span className="text-slate-400 font-medium">{t('portal.partnerBids.cargoReqsTitle')}</span>
                <p className="text-slate-200 font-semibold">{selectedRequest.cargoDescription} ({selectedRequest.weightTons} {t('portal.partnerBids.tonsSuffix')})</p>
                <p className="text-slate-400">{selectedRequest.origin} → {selectedRequest.destination}</p>
                <p className="text-amber-400 font-mono font-bold pt-1">{t('portal.partnerBids.clientBudgetLabel')} ${selectedRequest.targetBudgetUsd.toLocaleString()}</p>
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-slate-300 font-medium">{t('portal.partnerBids.proposedRateLabel')}</Label>
                <Input
                  type="number"
                  value={proposedPriceUsd}
                  onChange={(e) => setProposedPriceUsd(Number(e.target.value))}
                  className="bg-slate-900 border-slate-700 text-slate-200 font-mono font-bold text-base"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-slate-300 font-medium">{t('portal.partnerBids.estTransitDaysLabel')}</Label>
                <Input
                  type="number"
                  value={estimatedTransitDays}
                  onChange={(e) => setEstimatedTransitDays(Number(e.target.value))}
                  className="bg-slate-900 border-slate-700 text-slate-200 font-mono"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="ghost" onClick={() => setSelectedRequest(null)}>{t('portal.partnerBids.cancelBtn')}</Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold" onClick={handleConfirmSubmitBid}>
              {t('portal.partnerBids.submitProposalBtn')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
