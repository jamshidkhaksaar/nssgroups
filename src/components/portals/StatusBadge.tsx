import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n/i18n';
import type { TranslationKey } from '@/i18n/translations/en';
import type { DocumentStatus, ClientState, PartnerStatus, OrderStatus } from '@/types/portal';

interface StatusBadgeProps {
  status: DocumentStatus | ClientState | PartnerStatus | OrderStatus | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const { t } = useI18n();
  const labelKey = `portal.status.${status}` as TranslationKey;
  const labelText = t(labelKey) || status.replace('_', ' ').toUpperCase();

  switch (status) {
    // Document & Client Verification Statuses
    case 'approved':
    case 'verified':
    case 'active':
    case 'delivered':
      return <Badge className={`bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25 ${className}`}>{labelText}</Badge>;

    case 'pending':
    case 'pending_verification':
    case 'under_review':
    case 'in_transit':
    case 'order_placed':
    case 'customs_clearance':
      return <Badge className={`bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/25 ${className}`}>{labelText}</Badge>;

    case 'rejected':
    case 'suspended':
    case 'delayed':
    case 'cancelled':
      return <Badge className={`bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/25 ${className}`}>{labelText}</Badge>;

    case 'unregistered':
    case 'draft':
    case 'paused':
    default:
      return <Badge variant="outline" className={`text-slate-500 dark:text-slate-400 border-slate-400/30 ${className}`}>{labelText}</Badge>;
  }
};
