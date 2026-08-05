import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from './StatusBadge';
import type { ClientProfile, DocumentType } from '@/types/portal';
import { useI18n } from '@/i18n/i18n';
import { ShieldAlert, UploadCloud, FileText, CheckCircle2, Zap, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ClientVerificationProps {
  client: ClientProfile;
  onUploadDocument: (clientId: string, type: DocumentType, title: string, fileName: string, fileSize: string, fileUrl: string) => void;
  onSimulateApprove: (clientId: string) => void;
  onSimulateReject: (clientId: string, reason: string) => void;
}

/* theme-aware semantic chips (dual dark/light via data-theme arbitrary variant) */
const chipRose =
  'border-rose-500/30 bg-rose-500/10 text-rose-400 [html[data-theme=light]_&]:border-rose-600/30 [html[data-theme=light]_&]:text-rose-700';
const chipEmerald =
  'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 [html[data-theme=light]_&]:border-emerald-600/30 [html[data-theme=light]_&]:text-emerald-700';

const actionBtnBase =
  'inline-flex w-1/2 items-center justify-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.5)]';

export const ClientVerification: React.FC<ClientVerificationProps> = ({
  client,
  onUploadDocument,
  onSimulateApprove,
  onSimulateReject
}) => {
  const { t } = useI18n();
  const [selectedType, setSelectedType] = useState<DocumentType>('corporate_license');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleSimulatedFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      let title = t('portal.client.verif.docTitleLicense');
      let fileName = `${client.companyName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_license.pdf`;
      if (selectedType === 'tax_certificate') {
        title = t('portal.client.verif.docTitleTax');
        fileName = `${client.companyName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_tin.pdf`;
      } else if (selectedType === 'representative_id') {
        title = t('portal.client.verif.docTitlePassport');
        fileName = 'representative_passport_scan.pdf';
      }

      onUploadDocument(client.id, selectedType, title, fileName, '2.4 MB', `/docs/${fileName}`);
      setIsUploading(false);
      toast.success(t('portal.client.verif.uploadSuccessToast'));
    }, 1200);
  };

  const isRejected = client.state === 'rejected';

  return (
    <div className="nss-fade max-w-3xl mx-auto space-y-6">
      {/* Warning Banner */}
      <div className={`relative overflow-hidden rounded-xl border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isRejected
          ? chipRose
          : 'border-[rgba(var(--gold-rgb),0.35)] bg-[linear-gradient(105deg,rgba(var(--gold-rgb),0.12),rgba(var(--gold-rgb),0.03)_55%,transparent)]'
      }`}>
        {!isRejected && (
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(var(--gold-rgb),0.7),transparent)]" />
        )}
        <div className="flex items-center gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${
            isRejected
              ? chipRose
              : 'border-[rgba(var(--gold-rgb),0.4)] bg-[rgba(var(--gold-rgb),0.12)] text-[rgb(var(--gold-rgb))]'
          }`}>
            {isRejected ? <XCircle className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
          </div>
          <div>
            <h3 className={`flex items-center gap-2 text-sm sm:text-base font-bold ${
              isRejected ? '' : 'text-[rgb(var(--text-rgb))]'
            }`}>
              {isRejected ? t('portal.client.verif.rejectedTitle') : t('client.verif.title')}
            </h3>
            <p className={`mt-0.5 text-xs ${isRejected ? 'opacity-80' : 'text-[rgba(var(--text-rgb),0.6)]'}`}>
              {isRejected
                ? (client.rejectionReason || t('portal.client.verif.defaultRejectionReason'))
                : t('client.verif.sub')}
            </p>
          </div>
        </div>

        <StatusBadge status={client.state} className="shrink-0" />
      </div>

      {/* Upload Panel */}
      <section className="overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--panel)]">
        <header className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.12)] px-5 py-4">
          <h3 className="nss-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[rgba(var(--text-rgb),0.75)]">
            <UploadCloud className="h-4 w-4 text-[rgb(var(--gold-rgb))]" />
            {t('portal.client.verif.uploadCardTitle')}
          </h3>
        </header>

        <div className="space-y-6 p-5">
          {/* Document Type Selector */}
          <div className="space-y-2">
            <label className="nss-mono block text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">
              {t('portal.client.verif.selectTypeLabel')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { type: 'corporate_license' as const, title: t('portal.client.verif.typeLicenseTitle'), desc: t('portal.client.verif.typeLicenseDesc') },
                { type: 'tax_certificate' as const, title: t('portal.client.verif.typeTaxTitle'), desc: t('portal.client.verif.typeTaxDesc') },
                { type: 'representative_id' as const, title: t('portal.client.verif.typePassportTitle'), desc: t('portal.client.verif.typePassportDesc') }
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setSelectedType(item.type)}
                  className={`rounded-xl border p-3 text-start transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.5)] ${
                    selectedType === item.type
                      ? 'border-[rgba(var(--gold-rgb),0.7)] bg-[rgba(var(--gold-rgb),0.1)]'
                      : 'border-[var(--card-border)] bg-[rgba(var(--bg-rgb),0.4)] hover:border-[rgba(var(--gold-rgb),0.4)] hover:bg-[rgba(var(--gold-rgb),0.04)]'
                  }`}
                >
                  <div className="text-xs font-bold text-[rgb(var(--text-rgb))]">{item.title}</div>
                  <div className="mt-0.5 text-[11px] text-[rgba(var(--text-rgb),0.5)]">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dropzone Box */}
          <div className="flex flex-col items-center justify-center space-y-3 rounded-2xl border-2 border-dashed border-[rgba(var(--gold-rgb),0.3)] bg-[rgba(var(--bg-rgb),0.4)] p-8 text-center transition-colors duration-200 hover:border-[rgba(var(--gold-rgb),0.6)] hover:bg-[rgba(var(--gold-rgb),0.04)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(var(--gold-rgb),0.3)] bg-[rgba(var(--gold-rgb),0.1)] text-[rgb(var(--gold-rgb))]">
              <UploadCloud className="h-7 w-7" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[rgb(var(--text-rgb))]">{t('portal.client.verif.dragDropTitle')}</h4>
              <p className="mt-1 text-xs text-[rgba(var(--text-rgb),0.55)]">{t('portal.client.verif.dragDropSub')}</p>
            </div>

            {isUploading ? (
              <div className="w-full max-w-xs space-y-2 pt-2">
                <Progress value={65} className="h-1.5 bg-[rgba(var(--gold-rgb),0.15)]" />
                <span className="nss-mono block text-xs text-[rgb(var(--gold-rgb))] animate-pulse">{t('portal.client.verif.uploadingStatus')}</span>
              </div>
            ) : (
              <button
                type="button"
                className="nss-btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.6)] active:scale-[0.98]"
                onClick={handleSimulatedFileUpload}
              >
                {t('portal.client.verif.uploadBtn')}
              </button>
            )}
          </div>

          {/* Submitted Documents List */}
          <div className="space-y-3 pt-2">
            <h4 className="nss-mono flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.55)]">
              <FileText className="h-4 w-4 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.verif.submittedDocsTitle')} ({client.documents.length})
            </h4>

            {client.documents.length === 0 ? (
              <p className="text-xs italic text-[rgba(var(--text-rgb),0.45)]">{t('portal.client.verif.noDocsYet')}</p>
            ) : (
              <div className="space-y-2">
                {client.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[var(--card-border)] bg-[rgba(var(--bg-rgb),0.4)] p-3 transition-colors duration-200 hover:border-[rgba(var(--gold-rgb),0.35)]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[rgba(var(--gold-rgb),0.25)] bg-[rgba(var(--gold-rgb),0.08)] text-[rgb(var(--gold-rgb))]">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-xs font-medium text-[rgb(var(--text-rgb))]">{doc.title}</div>
                        <div className="nss-mono truncate text-[11px] text-[rgba(var(--text-rgb),0.5)]">{doc.fileName} ({doc.fileSize})</div>
                      </div>
                    </div>
                    <StatusBadge status={doc.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Demo Instant Trigger Panel */}
          <div className="space-y-2 rounded-xl border border-[rgba(var(--gold-rgb),0.3)] bg-[linear-gradient(105deg,rgba(var(--gold-rgb),0.08),transparent_60%)] p-4">
            <div className="nss-mono flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--gold-rgb))]">
              <Zap className="h-4 w-4" /> {t('portal.client.verif.demoTriggerTitle')}
            </div>
            <p className="text-xs text-[rgba(var(--text-rgb),0.6)]">
              {t('portal.client.verif.demoTriggerSub')}
            </p>
            <div className="flex gap-2 pt-1">
              <button
                className={`${actionBtnBase} ${chipEmerald} hover:bg-emerald-500/20`}
                onClick={() => {
                  onSimulateApprove(client.id);
                  toast.success(t('portal.client.verif.demoApproveToast'));
                }}
              >
                <CheckCircle2 className="h-3.5 w-3.5" /> {t('client.verif.demoApprove')}
              </button>

              <button
                className={`${actionBtnBase} ${chipRose} hover:bg-rose-500/20`}
                onClick={() => {
                  onSimulateReject(client.id, t('portal.client.verif.demoRejectReason'));
                  toast.error(t('portal.client.verif.demoRejectToast'));
                }}
              >
                <XCircle className="h-3.5 w-3.5" /> {t('client.verif.demoReject')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
