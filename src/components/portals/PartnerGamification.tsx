import React from 'react';
import { useI18n } from '@/i18n/i18n';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { PartnerVendor } from '@/types/portal';
import { Award, DollarSign, Activity, ShieldCheck, Star, CheckCircle } from 'lucide-react';

interface PartnerGamificationProps {
  partner: PartnerVendor;
}

export const PartnerGamification: React.FC<PartnerGamificationProps> = ({ partner }) => {
  const { t } = useI18n();
  const { levelInfo, metrics } = partner;

  const xpProgressPercent = Math.min(100, Math.round((levelInfo.currentXp / levelInfo.nextLevelXp) * 100));
  const volumeProgressPercent = Math.min(100, Math.round((metrics.monthlyVolumeUsd / metrics.monthlyTargetUsd) * 100));

  // Determine trust score color class
  const trustScoreColor =
    metrics.trustScore >= 90
      ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
      : metrics.trustScore >= 75
      ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
      : 'text-rose-400 border-rose-500/30 bg-rose-500/10';

  return (
    <div className="space-y-6">
      {/* Top Banner Tier Card */}
      <Card className="bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-slate-900 border border-amber-500/30 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 end-0 -mt-12 -me-12 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        <CardContent className="p-6 relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-4xl shadow-inner shrink-0">
                {levelInfo.badgeIcon}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" /> {t('portal.partnerGam.tierLevel')} {levelInfo.level} {t('portal.partnerGam.partnerSuffix')}
                </div>
                <h2 className="text-2xl font-bold text-slate-100 font-sora">{levelInfo.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{t('portal.partnerGam.feeLabel')} <span className="text-amber-400 font-bold">{levelInfo.feePercentage}%</span> ({t('portal.partnerGam.perksActive')})</p>
              </div>
            </div>

            <div className="text-end">
              <span className="text-xs text-slate-400 block font-medium">{t('portal.partnerGam.totalXpLabel')}</span>
              <span className="text-3xl font-black text-amber-400 font-mono">{levelInfo.currentXp.toLocaleString()} XP</span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">{t('portal.partnerGam.progressNextTier')}</span>
              <span className="text-amber-300 font-bold">{levelInfo.currentXp} / {levelInfo.nextLevelXp} XP ({xpProgressPercent}%)</span>
            </div>
            <div className="h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 transition-all duration-500"
                style={{ width: `${xpProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Perks Row */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">{t('portal.partnerGam.activePerksTitle')}</span>
            <div className="flex flex-wrap gap-2">
              {levelInfo.perks.map((perk, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                  <CheckCircle className="w-3 h-3 text-amber-400" /> {perk}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Row: Business Volume & Trust Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Volume Card */}
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" /> {t('portal.partnerGam.volumeTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-3xl font-black text-emerald-400 font-mono">${metrics.businessVolumeUsd.toLocaleString()}</span>
              <span className="text-xs text-slate-400 block mt-1">{t('portal.partnerGam.processedContractsSub')}</span>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">{t('portal.partnerGam.monthlyVolumeTarget')}</span>
                <span className="text-slate-200 font-bold">${metrics.monthlyVolumeUsd.toLocaleString()} / ${metrics.monthlyTargetUsd.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${volumeProgressPercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Composite Trust Score Meter Card */}
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-500" /> {t('portal.partnerGam.trustScoreTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-4xl font-black font-mono p-3 rounded-xl border ${trustScoreColor} inline-block`}>
                  {metrics.trustScore}/100
                </div>
                <span className="text-xs text-slate-400 block mt-2">{t('portal.partnerGam.rankedReliabilitySub')}</span>
              </div>

              <div className="text-end space-y-1 text-xs font-mono">
                <div className="text-slate-300"><span className="text-amber-400 font-bold">{metrics.onTimeDeliveryRate}%</span> {t('portal.partnerGam.onTimeRateLabel')}</div>
                <div className="text-slate-300"><span className="text-emerald-400 font-bold">{metrics.cargoIntegrityRate}%</span> {t('portal.partnerGam.cargoIntegrityLabel')}</div>
                <div className="text-slate-300"><span className="text-amber-400 font-bold">{metrics.averageResponseMins}m</span> {t('portal.partnerGam.avgResponseLabel')}</div>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
              <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-300 font-bold">{metrics.clientRating} / 5.0</span> ({metrics.totalReviews} {t('portal.partnerGam.reviewsSuffix')})
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-300 font-bold">{metrics.disputeRate}%</span> {t('portal.partnerGam.disputeRateLabel')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
