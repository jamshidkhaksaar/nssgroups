import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Warning Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isRejected
          ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          : 'bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-950 border-amber-500/40 text-amber-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-lg shrink-0 ${
            isRejected ? 'bg-rose-500/20 border-rose-500/30 text-rose-400' : 'bg-amber-500/20 border-amber-500/30 text-amber-400'
          }`}>
            {isRejected ? <XCircle className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              {isRejected ? t('portal.client.verif.rejectedTitle') : t('client.verif.title')}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {isRejected
                ? (client.rejectionReason || t('portal.client.verif.defaultRejectionReason'))
                : t('client.verif.sub')}
            </p>
          </div>
        </div>

        <StatusBadge status={client.state} className="shrink-0" />
      </div>

      {/* Upload Card */}
      <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-amber-500" />
            {t('portal.client.verif.uploadCardTitle')}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Document Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">{t('portal.client.verif.selectTypeLabel')}</label>
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
                  className={`p-3 rounded-xl text-start border transition-all ${
                    selectedType === item.type
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-200">{item.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dropzone Box */}
          <div className="border-2 border-dashed border-amber-500/30 hover:border-amber-500/60 bg-slate-950/80 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-3 transition-colors">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">{t('portal.client.verif.dragDropTitle')}</h4>
              <p className="text-xs text-slate-400 mt-1">{t('portal.client.verif.dragDropSub')}</p>
            </div>

            {isUploading ? (
              <div className="w-full max-w-xs space-y-2 pt-2">
                <Progress value={65} className="h-2 bg-slate-800" />
                <span className="text-xs text-amber-400 font-mono animate-pulse">{t('portal.client.verif.uploadingStatus')}</span>
              </div>
            ) : (
              <Button
                type="button"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-6 py-2 rounded-lg"
                onClick={handleSimulatedFileUpload}
              >
                {t('portal.client.verif.uploadBtn')}
              </Button>
            )}
          </div>

          {/* Submitted Documents List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-400" /> {t('portal.client.verif.submittedDocsTitle')} ({client.documents.length})
            </h4>

            {client.documents.length === 0 ? (
              <p className="text-xs text-slate-400 italic">{t('portal.client.verif.noDocsYet')}</p>
            ) : (
              <div className="space-y-2">
                {client.documents.map((doc) => (
                  <div key={doc.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-200 text-xs">{doc.title}</div>
                        <div className="text-[11px] text-slate-400">{doc.fileName} ({doc.fileSize})</div>
                      </div>
                    </div>
                    <StatusBadge status={doc.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Demo Instant Trigger Panel */}
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-400" /> {t('portal.client.verif.demoTriggerTitle')}
            </div>
            <p className="text-xs text-slate-300">
              {t('portal.client.verif.demoTriggerSub')}
            </p>
            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold w-1/2"
                onClick={() => {
                  onSimulateApprove(client.id);
                  toast.success(t('portal.client.verif.demoApproveToast'));
                }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 me-1" /> {t('client.verif.demoApprove')}
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border-rose-500/40 text-rose-400 hover:bg-rose-500/10 text-xs font-bold w-1/2"
                onClick={() => {
                  onSimulateReject(client.id, t('portal.client.verif.demoRejectReason'));
                  toast.error(t('portal.client.verif.demoRejectToast'));
                }}
              >
                <XCircle className="w-3.5 h-3.5 me-1" /> {t('client.verif.demoReject')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
