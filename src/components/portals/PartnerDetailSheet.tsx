import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from './StatusBadge';
import type { PartnerVendor, PartnerStatus } from '@/types/portal';
import { Award, DollarSign, Activity, CheckCircle, Ban } from 'lucide-react';
import { toast } from 'sonner';

interface PartnerDetailSheetProps {
  partner: PartnerVendor | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (partnerId: string, status: PartnerStatus) => void;
  onUpdateGamification: (partnerId: string, xpDelta: number, trustScore?: number) => void;
}

export const PartnerDetailSheet: React.FC<PartnerDetailSheetProps> = ({
  partner,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateGamification
}) => {
  const { t } = useI18n();
  const [xpAdjustment, setXpAdjustment] = useState<string>('500');
  const [trustScoreInput, setTrustScoreInput] = useState<string>('');

  if (!partner) return null;

  const handleApplyXp = (positive: boolean) => {
    const delta = parseInt(xpAdjustment, 10) || 0;
    const finalDelta = positive ? delta : -delta;
    onUpdateGamification(partner.id, finalDelta);
    toast.success(`${t('portal.partnerDetail.xpToast')} ${finalDelta > 0 ? '+' : ''}${finalDelta}.`);
  };

  const handleUpdateTrust = () => {
    const score = parseInt(trustScoreInput, 10);
    if (!isNaN(score) && score >= 0 && score <= 100) {
      onUpdateGamification(partner.id, 0, score);
      toast.success(`${t('portal.partnerDetail.trustToast')} ${score}/100.`);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg border-[var(--card-border)] bg-[var(--panel)] text-[rgb(var(--text-rgb))] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between gap-2">
            <SheetTitle className="text-xl font-bold text-[rgb(var(--text-rgb))]">{partner.companyName}</SheetTitle>
            <StatusBadge status={partner.status} />
          </div>
          <SheetDescription className="text-xs text-[rgba(var(--text-rgb),0.6)]">
            {partner.name} • {partner.country} • {t('portal.partnerDetail.joinedLabel')} {new Date(partner.joinedAt).toLocaleDateString()}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Level Badge Card */}
          <div className="p-4 rounded-xl bg-[rgba(var(--gold-rgb),0.12)] border border-[rgba(var(--gold-rgb),0.3)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{partner.levelInfo.badgeIcon}</div>
                <div>
                  <h4 className="font-bold text-[rgb(var(--gold-rgb))] text-base">{partner.levelInfo.title}</h4>
                  <span className="text-xs text-[rgba(var(--text-rgb),0.6)]">{t('portal.partnerDetail.tierLevel')} {partner.levelInfo.level} • {partner.levelInfo.feePercentage}% {t('portal.partnerDetail.platformFee')}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs nss-mono">
                <span className="text-[rgba(var(--text-rgb),0.6)]">{t('portal.partnerDetail.currentXpLabel')}</span>
                <span className="text-[rgb(var(--gold-rgb))] font-bold">{partner.levelInfo.currentXp} / {partner.levelInfo.nextLevelXp} XP</span>
              </div>
              <div className="h-2 rounded-full bg-[rgba(var(--text-rgb),0.08)] overflow-hidden">
                <div
                  className="h-full bg-[rgb(var(--gold-rgb))] transition-all duration-500"
                  style={{ width: `${Math.min(100, (partner.levelInfo.currentXp / partner.levelInfo.nextLevelXp) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Core Performance Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[rgba(var(--text-rgb),0.03)] border border-[var(--card-border)]">
              <span className="text-xs text-[rgba(var(--text-rgb),0.6)] block flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {t('portal.partnerDetail.businessVolume')}</span>
              <span className="text-lg font-bold text-[rgb(var(--text-rgb))] nss-mono">${partner.metrics.businessVolumeUsd.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-lg bg-[rgba(var(--text-rgb),0.03)] border border-[var(--card-border)]">
              <span className="text-xs text-[rgba(var(--text-rgb),0.6)] block flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-[rgb(var(--gold-rgb))]" /> {t('portal.partnerDetail.trustScore')}</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 nss-mono">{partner.metrics.trustScore}/100</span>
            </div>
            <div className="p-3 rounded-lg bg-[rgba(var(--text-rgb),0.03)] border border-[var(--card-border)]">
              <span className="text-xs text-[rgba(var(--text-rgb),0.6)] block">{t('portal.partnerDetail.onTimeRate')}</span>
              <span className="text-sm font-semibold text-[rgb(var(--text-rgb))] nss-mono">{partner.metrics.onTimeDeliveryRate}%</span>
            </div>
            <div className="p-3 rounded-lg bg-[rgba(var(--text-rgb),0.03)] border border-[var(--card-border)]">
              <span className="text-xs text-[rgba(var(--text-rgb),0.6)] block">{t('portal.partnerDetail.completedOrders')}</span>
              <span className="text-sm font-semibold text-[rgb(var(--text-rgb))] nss-mono">{partner.completedOrdersCount}</span>
            </div>
          </div>

          {/* Operational Status Actions */}
          <div className="space-y-3 p-4 rounded-xl border border-[var(--card-border)] bg-[rgba(var(--text-rgb),0.03)]">
            <h4 className="text-xs font-bold text-[rgba(var(--text-rgb),0.6)] uppercase tracking-wider">{t('portal.partnerDetail.statusControlTitle')}</h4>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={partner.status === 'active' ? 'default' : 'outline'}
                className={partner.status === 'active' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25' : 'border-[var(--card-border)] bg-transparent text-[rgba(var(--text-rgb),0.6)] hover:bg-[rgba(var(--text-rgb),0.05)]'}
                onClick={() => onUpdateStatus(partner.id, 'active')}
              >
                <CheckCircle className="w-4 h-4 me-1" /> {t('portal.status.active')}
              </Button>
              <Button
                size="sm"
                variant={partner.status === 'pending' ? 'default' : 'outline'}
                className={partner.status === 'pending' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25' : 'border-[var(--card-border)] bg-transparent text-[rgba(var(--text-rgb),0.6)] hover:bg-[rgba(var(--text-rgb),0.05)]'}
                onClick={() => onUpdateStatus(partner.id, 'pending')}
              >
                {t('portal.status.pending')}
              </Button>
              <Button
                size="sm"
                variant={partner.status === 'suspended' ? 'destructive' : 'outline'}
                className={partner.status === 'suspended' ? '' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/25'}
                onClick={() => onUpdateStatus(partner.id, 'suspended')}
              >
                <Ban className="w-4 h-4 me-1" /> {t('portal.partnerDetail.suspendBtn')}
              </Button>
            </div>
          </div>

          {/* Gamification Override Tools */}
          <div className="space-y-4 p-4 rounded-xl border border-[var(--card-border)] bg-[rgba(var(--text-rgb),0.03)]">
            <h4 className="text-xs font-bold text-[rgb(var(--gold-rgb))] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" /> {t('portal.partnerDetail.gamificationOverrideTitle')}
            </h4>

            <div className="space-y-2">
              <label className="text-xs text-[rgba(var(--text-rgb),0.6)]">{t('portal.partnerDetail.awardXpLabel')}</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={xpAdjustment}
                  onChange={(e) => setXpAdjustment(e.target.value)}
                  className="bg-[rgba(var(--text-rgb),0.03)] border-[var(--card-border)] text-[rgb(var(--text-rgb))] text-sm"
                />
                <Button size="sm" className="bg-[rgb(var(--gold-rgb))] text-[#1d1233] hover:bg-[rgba(var(--gold-rgb),0.88)]" onClick={() => handleApplyXp(true)}>
                  {t('portal.partnerDetail.addXpBtn')}
                </Button>
                <Button size="sm" variant="outline" className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/25" onClick={() => handleApplyXp(false)}>
                  {t('portal.partnerDetail.deductXpBtn')}
                </Button>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[var(--card-border)]">
              <label className="text-xs text-[rgba(var(--text-rgb),0.6)]">{t('portal.partnerDetail.adjustTrustLabel')}</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder={partner.metrics.trustScore.toString()}
                  value={trustScoreInput}
                  onChange={(e) => setTrustScoreInput(e.target.value)}
                  className="bg-[rgba(var(--text-rgb),0.03)] border-[var(--card-border)] text-[rgb(var(--text-rgb))] text-sm"
                />
                <Button size="sm" variant="secondary" onClick={handleUpdateTrust}>
                  {t('portal.partnerDetail.setScoreBtn')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
