import React from 'react';
import { useI18n } from '@/i18n/i18n';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import type { ClientProfile } from '@/types/portal';
import { Building2, Mail, Phone, Globe, ShieldCheck, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ClientDetailSheetProps {
  client: ClientProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSimulateApprove: (clientId: string) => void;
  onSimulateReject: (clientId: string, reason: string) => void;
}

export const ClientDetailSheet: React.FC<ClientDetailSheetProps> = ({
  client,
  isOpen,
  onClose,
  onSimulateApprove,
  onSimulateReject
}) => {
  const { t } = useI18n();

  if (!client) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg border-[var(--card-border)] bg-[var(--panel)] text-[rgb(var(--text-rgb))] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between gap-2">
            <SheetTitle className="text-xl font-bold text-[rgb(var(--text-rgb))]">{client.companyName}</SheetTitle>
            <StatusBadge status={client.state} />
          </div>
          <SheetDescription className="text-xs text-[rgba(var(--text-rgb),0.6)]">
            {t('portal.client.detail.registeredLabel')} {new Date(client.registeredAt).toLocaleDateString()} • {client.category.toUpperCase().replace('_', ' ')}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Contact Details */}
          <div className="p-4 rounded-xl bg-[rgba(var(--text-rgb),0.03)] border border-[var(--card-border)] space-y-3 text-sm">
            <h4 className="text-xs font-bold text-[rgba(var(--text-rgb),0.45)] uppercase tracking-wider mb-2">{t('portal.client.detail.repInfoTitle')}</h4>
            <div className="flex items-center gap-2 text-[rgb(var(--text-rgb))]">
              <Building2 className="w-4 h-4 text-[rgb(var(--gold-rgb))]" />
              <span>{client.fullName}</span>
            </div>
            <div className="flex items-center gap-2 text-[rgba(var(--text-rgb),0.6)]">
              <Mail className="w-4 h-4 text-[rgb(var(--gold-rgb))]" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-2 text-[rgba(var(--text-rgb),0.6)]">
              <Phone className="w-4 h-4 text-[rgb(var(--gold-rgb))]" />
              <span dir="ltr">{client.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-[rgba(var(--text-rgb),0.6)]">
              <Globe className="w-4 h-4 text-[rgb(var(--gold-rgb))]" />
              <span>{client.country}</span>
            </div>
          </div>

          {/* Account Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[rgba(var(--text-rgb),0.03)] border border-[var(--card-border)]">
              <span className="text-xs text-[rgba(var(--text-rgb),0.6)] block">{t('portal.client.detail.totalOrdersLabel')}</span>
              <span className="text-lg font-bold text-[rgb(var(--text-rgb))] nss-mono">{client.totalOrders}</span>
            </div>
            <div className="p-3 rounded-lg bg-[rgba(var(--text-rgb),0.03)] border border-[var(--card-border)]">
              <span className="text-xs text-[rgba(var(--text-rgb),0.6)] block">{t('portal.client.detail.totalSpentLabel')}</span>
              <span className="text-lg font-bold text-[rgb(var(--gold-rgb))] nss-mono">${client.totalSpentUsd.toLocaleString()}</span>
            </div>
          </div>

          {/* Documents Attached */}
          <div className="space-y-3 p-4 rounded-xl border border-[var(--card-border)] bg-[rgba(var(--text-rgb),0.03)]">
            <h4 className="text-xs font-bold text-[rgba(var(--text-rgb),0.6)] uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.detail.submittedDocsTitle')} ({client.documents.length})
            </h4>
            {client.documents.length === 0 ? (
              <p className="text-xs text-[rgba(var(--text-rgb),0.45)] italic">{t('portal.client.detail.noDocs')}</p>
            ) : (
              <div className="space-y-2">
                {client.documents.map((doc) => (
                  <div key={doc.id} className="p-2.5 rounded bg-[rgba(var(--text-rgb),0.03)] border border-[var(--card-border)] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-medium text-[rgb(var(--text-rgb))]">{doc.title}</div>
                      <div className="text-[11px] text-[rgba(var(--text-rgb),0.45)]">{doc.fileName}</div>
                    </div>
                    <StatusBadge status={doc.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Verification Override Actions */}
          <div className="space-y-3 p-4 rounded-xl border border-[var(--card-border)] bg-[rgba(var(--text-rgb),0.03)]">
            <h4 className="text-xs font-bold text-[rgb(var(--gold-rgb))] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> {t('portal.client.detail.moderationActionsTitle')}
            </h4>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="w-full bg-[rgb(var(--gold-rgb))] text-[#1d1233] hover:bg-[rgba(var(--gold-rgb),0.88)]"
                onClick={() => {
                  onSimulateApprove(client.id);
                  toast.success(t('portal.client.detail.verifiedToast'));
                  onClose();
                }}
              >
                <CheckCircle2 className="w-4 h-4 me-1.5" /> {t('portal.client.detail.approveBtn')}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/25 hover:text-rose-600 dark:hover:text-rose-400"
                onClick={() => {
                  onSimulateReject(client.id, t('portal.client.detail.defaultRejectReason'));
                  toast.error(t('portal.client.detail.rejectedToast'));
                  onClose();
                }}
              >
                <XCircle className="w-4 h-4 me-1.5" /> {t('portal.client.detail.rejectBtn')}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
