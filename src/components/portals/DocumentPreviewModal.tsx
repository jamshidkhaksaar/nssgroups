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
      <DialogContent className="max-w-2xl border-[var(--card-border)] bg-[var(--panel)] text-[rgb(var(--text-rgb))]">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4 me-6">
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-[rgb(var(--text-rgb))]">
              <FileText className="w-5 h-5 text-[rgb(var(--gold-rgb))]" />
              {document.title}
            </DialogTitle>
            <StatusBadge status={document.status} />
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-[rgba(var(--text-rgb),0.03)] border border-[var(--card-border)] text-sm">
            <div>
              <span className="text-xs text-[rgba(var(--text-rgb),0.45)] block">{t('portal.docPreview.clientOrgLabel')}</span>
              <span className="font-semibold text-[rgb(var(--gold-rgb))]">{document.clientName}</span>
            </div>
            <div>
              <span className="text-xs text-[rgba(var(--text-rgb),0.45)] block">{t('portal.docPreview.docTypeLabel')}</span>
              <span className="nss-mono text-[rgb(var(--text-rgb))]">{document.type.replace('_', ' ').toUpperCase()}</span>
            </div>
            <div>
              <span className="text-xs text-[rgba(var(--text-rgb),0.45)] block">{t('portal.docPreview.fileDetailsLabel')}</span>
              <span className="text-[rgba(var(--text-rgb),0.6)]">{document.fileName} ({document.fileSize})</span>
            </div>
            <div>
              <span className="text-xs text-[rgba(var(--text-rgb),0.45)] block">{t('portal.docPreview.submittedAtLabel')}</span>
              <span className="text-[rgba(var(--text-rgb),0.6)]">{new Date(document.uploadedAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Document Preview Box */}
          <div className="border border-[var(--card-border)] rounded-lg p-6 bg-[rgba(var(--text-rgb),0.03)] text-center flex flex-col items-center justify-center min-h-[180px] gap-3">
            <div className="w-16 h-16 rounded-full bg-[rgba(var(--gold-rgb),0.12)] border border-[rgba(var(--gold-rgb),0.3)] flex items-center justify-center text-[rgb(var(--gold-rgb))]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-medium text-[rgb(var(--text-rgb))]">{document.fileName}</h4>
              <p className="text-xs text-[rgba(var(--text-rgb),0.45)] mt-1">{t('portal.docPreview.pdfSub')}</p>
            </div>
            <a
              href={document.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[rgb(var(--gold-rgb))] bg-[rgba(var(--gold-rgb),0.12)] hover:bg-[rgba(var(--gold-rgb),0.2)] px-3 py-1.5 rounded border border-[rgba(var(--gold-rgb),0.3)] transition-colors mt-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t('portal.docPreview.openTabBtn')}
            </a>
          </div>

          {/* Rejection Form view when rejecting */}
          {isRejecting ? (
            <div className="space-y-3 p-4 rounded-lg border border-rose-500/30 bg-rose-500/10">
              <h4 className="text-sm font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> {t('portal.docPreview.specifyReasonTitle')}
              </h4>
              <Select value={selectedReason} onValueChange={(val) => { setSelectedReason(val); setCustomNotes(val); }}>
                <SelectTrigger className="bg-[rgba(var(--text-rgb),0.03)] border-[var(--card-border)] text-[rgb(var(--text-rgb))]">
                  <SelectValue placeholder={t('portal.docPreview.reasonPlaceholder')} />
                </SelectTrigger>
                <SelectContent className="bg-[var(--panel)] border-[var(--card-border)] text-[rgb(var(--text-rgb))]">
                  {rejectionReasonsList.map((r, i) => (
                    <SelectItem key={i} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea
                placeholder={t('portal.docPreview.addNotesPlaceholder')}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="bg-[rgba(var(--text-rgb),0.03)] border-[var(--card-border)] text-[rgb(var(--text-rgb))] text-sm h-20"
              />
              <div className="flex justify-end gap-2 pt-1">
                <Button variant="ghost" size="sm" className="text-[rgba(var(--text-rgb),0.6)] hover:bg-[rgba(var(--text-rgb),0.05)] hover:text-[rgb(var(--text-rgb))]" onClick={() => setIsRejecting(false)}>
                  {t('portal.docPreview.cancelBtn')}
                </Button>
                <Button variant="destructive" size="sm" onClick={handleConfirmReject}>
                  {t('portal.docPreview.confirmRejectBtn')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs text-[rgba(var(--text-rgb),0.6)] font-medium">{t('portal.docPreview.adminNotesLabel')}</label>
              <Textarea
                placeholder={t('portal.docPreview.adminNotesPlaceholder')}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="bg-[rgba(var(--text-rgb),0.03)] border-[var(--card-border)] text-[rgb(var(--text-rgb))] text-sm h-16"
              />
            </div>
          )}
        </div>

        {!isRejecting && (
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/25 hover:text-rose-600 dark:hover:text-rose-400" onClick={() => setIsRejecting(true)}>
              <XCircle className="w-4 h-4 me-1.5" />
              {t('portal.docPreview.rejectDocBtn')}
            </Button>
            <Button className="bg-[rgb(var(--gold-rgb))] text-[#1d1233] hover:bg-[rgba(var(--gold-rgb),0.88)]" onClick={handleConfirmApprove}>
              <CheckCircle2 className="w-4 h-4 me-1.5" />
              {t('portal.docPreview.approveDocBtn')}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
