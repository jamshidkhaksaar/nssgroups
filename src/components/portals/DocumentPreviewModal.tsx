import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from './StatusBadge';
import type { VerificationDocument } from '@/types/portal';
import { FileText, CheckCircle2, XCircle, ExternalLink, ShieldCheck } from 'lucide-react';

interface DocumentPreviewModalProps {
  document: VerificationDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (docId: string, notes?: string) => void;
  onReject: (docId: string, reason: string) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  isOpen,
  onClose,
  onApprove,
  onReject
}) => {
  const { t } = useI18n();
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [isRejecting, setIsRejecting] = useState<boolean>(false);

  const rejectionReasonsList = [
    t('portal.docPreview.reasonIllegible'),
    t('portal.docPreview.reasonExpired'),
    t('portal.docPreview.reasonTinMismatch'),
    t('portal.docPreview.reasonMissingSeal'),
    t('portal.docPreview.reasonInvalidType')
  ];

  if (!document) return null;

  const handleConfirmApprove = () => {
    onApprove(document.id, customNotes);
    onClose();
  };

  const handleConfirmReject = () => {
    const reasonToSubmit = customNotes || selectedReason || t('portal.docPreview.defaultRejectReason');
    onReject(document.id, reasonToSubmit);
    setIsRejecting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[var(--bg)] border-slate-700/50 text-[rgb(var(--text-rgb))]">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4 me-6">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              {document.title}
            </DialogTitle>
            <StatusBadge status={document.status} />
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-slate-900/40 border border-slate-800 text-sm">
            <div>
              <span className="text-xs text-slate-400 block">{t('portal.docPreview.clientOrgLabel')}</span>
              <span className="font-semibold text-amber-400">{document.clientName}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">{t('portal.docPreview.docTypeLabel')}</span>
              <span className="font-mono text-slate-200">{document.type.replace('_', ' ').toUpperCase()}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">{t('portal.docPreview.fileDetailsLabel')}</span>
              <span className="text-slate-300">{document.fileName} ({document.fileSize})</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">{t('portal.docPreview.submittedAtLabel')}</span>
              <span className="text-slate-300">{new Date(document.uploadedAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Document Preview Box */}
          <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/60 text-center flex flex-col items-center justify-center min-h-[180px] gap-3">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{document.fileName}</h4>
              <p className="text-xs text-slate-400 mt-1">{t('portal.docPreview.pdfSub')}</p>
            </div>
            <a
              href={document.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded border border-amber-500/30 transition-colors mt-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t('portal.docPreview.openTabBtn')}
            </a>
          </div>

          {/* Rejection Form view when rejecting */}
          {isRejecting ? (
            <div className="space-y-3 p-4 rounded-lg border border-rose-500/30 bg-rose-950/20">
              <h4 className="text-sm font-semibold text-rose-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> {t('portal.docPreview.specifyReasonTitle')}
              </h4>
              <Select value={selectedReason} onValueChange={(val) => { setSelectedReason(val); setCustomNotes(val); }}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200">
                  <SelectValue placeholder={t('portal.docPreview.reasonPlaceholder')} />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                  {rejectionReasonsList.map((r, i) => (
                    <SelectItem key={i} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea
                placeholder={t('portal.docPreview.addNotesPlaceholder')}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-200 text-sm h-20"
              />
              <div className="flex justify-end gap-2 pt-1">
                <Button variant="ghost" size="sm" onClick={() => setIsRejecting(false)}>
                  {t('portal.docPreview.cancelBtn')}
                </Button>
                <Button variant="destructive" size="sm" onClick={handleConfirmReject}>
                  {t('portal.docPreview.confirmRejectBtn')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-medium">{t('portal.docPreview.adminNotesLabel')}</label>
              <Textarea
                placeholder={t('portal.docPreview.adminNotesPlaceholder')}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="bg-slate-900 border-slate-800 text-slate-200 text-sm h-16"
              />
            </div>
          )}
        </div>

        {!isRejecting && (
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="border-rose-500/40 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300" onClick={() => setIsRejecting(true)}>
              <XCircle className="w-4 h-4 me-1.5" />
              {t('portal.docPreview.rejectDocBtn')}
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white" onClick={handleConfirmApprove}>
              <CheckCircle2 className="w-4 h-4 me-1.5" />
              {t('portal.docPreview.approveDocBtn')}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
