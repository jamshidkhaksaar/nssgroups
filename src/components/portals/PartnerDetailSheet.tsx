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
      <SheetContent className="w-full sm:max-w-lg bg-[var(--bg)] border-slate-700/50 text-[rgb(var(--text-rgb))] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between gap-2">
            <SheetTitle className="text-xl font-bold text-amber-400">{partner.companyName}</SheetTitle>
            <StatusBadge status={partner.status} />
          </div>
          <SheetDescription className="text-slate-400 text-xs">
            {partner.name} • {partner.country} • {t('portal.partnerDetail.joinedLabel')} {new Date(partner.joinedAt).toLocaleDateString()}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Level Badge Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-900 border border-amber-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{partner.levelInfo.badgeIcon}</div>
                <div>
                  <h4 className="font-bold text-amber-300 text-base">{partner.levelInfo.title}</h4>
                  <span className="text-xs text-slate-400">{t('portal.partnerDetail.tierLevel')} {partner.levelInfo.level} • {partner.levelInfo.feePercentage}% {t('portal.partnerDetail.platformFee')}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">{t('portal.partnerDetail.currentXpLabel')}</span>
                <span className="text-amber-400 font-bold">{partner.levelInfo.currentXp} / {partner.levelInfo.nextLevelXp} XP</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500"
                  style={{ width: `${Math.min(100, (partner.levelInfo.currentXp / partner.levelInfo.nextLevelXp) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Core Performance Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {t('portal.partnerDetail.businessVolume')}</span>
              <span className="text-lg font-bold text-slate-100 font-mono">${partner.metrics.businessVolumeUsd.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-amber-400" /> {t('portal.partnerDetail.trustScore')}</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">{partner.metrics.trustScore}/100</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">{t('portal.partnerDetail.onTimeRate')}</span>
              <span className="text-sm font-semibold text-slate-200 font-mono">{partner.metrics.onTimeDeliveryRate}%</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">{t('portal.partnerDetail.completedOrders')}</span>
              <span className="text-sm font-semibold text-slate-200 font-mono">{partner.completedOrdersCount}</span>
            </div>
          </div>

          {/* Operational Status Actions */}
          <div className="space-y-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t('portal.partnerDetail.statusControlTitle')}</h4>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={partner.status === 'active' ? 'default' : 'outline'}
                className={partner.status === 'active' ? 'bg-emerald-600 hover:bg-emerald-500' : 'border-slate-700 text-slate-300'}
                onClick={() => onUpdateStatus(partner.id, 'active')}
              >
                <CheckCircle className="w-4 h-4 me-1" /> {t('portal.status.active')}
              </Button>
              <Button
                size="sm"
                variant={partner.status === 'pending' ? 'default' : 'outline'}
                className={partner.status === 'pending' ? 'bg-amber-600 hover:bg-amber-500' : 'border-slate-700 text-slate-300'}
                onClick={() => onUpdateStatus(partner.id, 'pending')}
              >
                {t('portal.status.pending')}
              </Button>
              <Button
                size="sm"
                variant={partner.status === 'suspended' ? 'destructive' : 'outline'}
                className={partner.status === 'suspended' ? '' : 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10'}
                onClick={() => onUpdateStatus(partner.id, 'suspended')}
              >
                <Ban className="w-4 h-4 me-1" /> {t('portal.partnerDetail.suspendBtn')}
              </Button>
            </div>
          </div>

          {/* Gamification Override Tools */}
          <div className="space-y-4 p-4 rounded-xl border border-slate-800 bg-slate-900/40">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" /> {t('portal.partnerDetail.gamificationOverrideTitle')}
            </h4>
            
            <div className="space-y-2">
              <label className="text-xs text-slate-400">{t('portal.partnerDetail.awardXpLabel')}</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={xpAdjustment}
                  onChange={(e) => setXpAdjustment(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-slate-200 text-sm"
                />
                <Button size="sm" className="bg-amber-600 hover:bg-amber-500" onClick={() => handleApplyXp(true)}>
                  {t('portal.partnerDetail.addXpBtn')}
                </Button>
                <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-400" onClick={() => handleApplyXp(false)}>
                  {t('portal.partnerDetail.deductXpBtn')}
                </Button>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs text-slate-400">{t('portal.partnerDetail.adjustTrustLabel')}</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder={partner.metrics.trustScore.toString()}
                  value={trustScoreInput}
                  onChange={(e) => setTrustScoreInput(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-slate-200 text-sm"
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
