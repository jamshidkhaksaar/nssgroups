import React from 'react';
import { useI18n } from '@/i18n/i18n';
import type { PartnerVendor } from '@/types/portal';
import { Award, DollarSign, Activity, ShieldCheck, Star, CheckCircle } from 'lucide-react';
import PartnerCharts from './partnerCharts';

interface PartnerGamificationProps {
  partner: PartnerVendor;
}

/* theme-aware semantic chips (same dual dark:/light pattern as StatusBadge) */
const chipEmerald =
  'border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
const chipAmber =
  'border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400';
const chipRose =
  'border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400';
const emeraldText = 'text-emerald-600 dark:text-emerald-400';
const amberText = 'text-amber-600 dark:text-amber-400';

export const PartnerGamification: React.FC<PartnerGamificationProps> = ({ partner }) => {
  const { t } = useI18n();
  const { levelInfo, metrics } = partner;

  const xpProgressPercent = Math.min(100, Math.round((levelInfo.currentXp / levelInfo.nextLevelXp) * 100));
  const volumeProgressPercent = Math.min(100, Math.round((metrics.monthlyVolumeUsd / metrics.monthlyTargetUsd) * 100));

  // Determine trust score color class
  const trustScoreColor =
    metrics.trustScore >= 90
      ? chipEmerald
      : metrics.trustScore >= 75
      ? chipAmber
      : chipRose;

  return (
    <div className="space-y-6">
      {/* Top Banner Tier Card */}
      <section className="nss-fade relative overflow-hidden rounded-2xl border border-[rgba(var(--gold-rgb),0.3)] bg-[linear-gradient(150deg,var(--panel),var(--bg-deep))] px-6 py-7 sm:px-8">
        {/* gold hairline + ambient glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(var(--gold-rgb),0.7),transparent)]" />
        <div className="pointer-events-none absolute -top-20 -end-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(var(--gold-rgb),0.16),transparent_65%)]" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[rgba(var(--gold-rgb),0.4)] bg-[rgba(var(--gold-rgb),0.12)] text-4xl shadow-[inset_0_1px_0_rgba(var(--gold-rgb),0.25)]">
                {levelInfo.badgeIcon}
              </div>
              <div>
                <div className="nss-mono inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--gold-rgb))]">
                  <Award className="h-3.5 w-3.5" /> {t('portal.partnerGam.tierLevel')} {levelInfo.level} {t('portal.partnerGam.partnerSuffix')}
                </div>
                <h2 className="nss-display mt-1 text-2xl sm:text-3xl text-[rgb(var(--text-rgb))]">{levelInfo.title}</h2>
                <p className="mt-1 text-xs text-[rgba(var(--text-rgb),0.55)]">
                  {t('portal.partnerGam.feeLabel')}{' '}
                  <span className="nss-mono font-bold text-[rgb(var(--gold-rgb))]">{levelInfo.feePercentage}%</span>{' '}
                  ({t('portal.partnerGam.perksActive')})
                </p>
              </div>
            </div>

            <div className="sm:text-end">
              <span className="nss-mono block text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.5)]">
                {t('portal.partnerGam.totalXpLabel')}
              </span>
              <span className="nss-mono mt-1 block text-4xl font-bold text-[rgb(var(--gold-rgb))]">
                {levelInfo.currentXp.toLocaleString()}
                <span className="ms-2 text-sm font-medium text-[rgba(var(--text-rgb),0.5)]">XP</span>
              </span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2 border-t border-[rgba(var(--gold-rgb),0.12)] pt-5">
            <div className="nss-mono flex items-center justify-between text-[11px] uppercase tracking-[0.14em]">
              <span className="text-[rgba(var(--text-rgb),0.55)]">{t('portal.partnerGam.progressNextTier')}</span>
              <span className="font-bold text-[rgb(var(--gold-rgb))]">
                {levelInfo.currentXp} / {levelInfo.nextLevelXp} XP ({xpProgressPercent}%)
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full border border-[rgba(var(--gold-rgb),0.2)] bg-[rgba(var(--gold-rgb),0.15)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--gold),rgb(var(--gold-hi-rgb,232,194,104)))] transition-all duration-500"
                style={{ width: `${xpProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Perks Row */}
          <div>
            <span className="nss-mono mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[rgba(var(--text-rgb),0.5)]">
              {t('portal.partnerGam.activePerksTitle')}
            </span>
            <div className="flex flex-wrap gap-2">
              {levelInfo.perks.map((perk, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(var(--gold-rgb),0.25)] bg-[rgba(var(--gold-rgb),0.08)] px-2.5 py-1 text-xs text-[rgb(var(--gold-rgb))]"
                >
                  <CheckCircle className="h-3 w-3" /> {perk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Analytics: volume trend + trust radar */}
      <PartnerCharts partner={partner} />

      {/* Metrics Row: Business Volume & Trust Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Volume Card */}
        <section
          className="nss-fade overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--panel)]"
          style={{ animationDelay: '80ms' }}
        >
          <header className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.12)] px-5 py-4">
            <h3 className="nss-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[rgba(var(--text-rgb),0.75)]">
              <DollarSign className={`h-4 w-4 ${emeraldText}`} />
              {t('portal.partnerGam.volumeTitle')}
            </h3>
          </header>

          <div className="space-y-4 p-5">
            <div>
              <span className={`nss-mono block text-3xl font-bold ${emeraldText}`}>
                ${metrics.businessVolumeUsd.toLocaleString()}
              </span>
              <span className="mt-1 block text-xs text-[rgba(var(--text-rgb),0.55)]">
                {t('portal.partnerGam.processedContractsSub')}
              </span>
            </div>

            <div className="space-y-2 border-t border-[rgba(var(--gold-rgb),0.1)] pt-4">
              <div className="nss-mono flex items-center justify-between text-[11px]">
                <span className="uppercase tracking-[0.14em] text-[rgba(var(--text-rgb),0.55)]">
                  {t('portal.partnerGam.monthlyVolumeTarget')}
                </span>
                <span className="font-bold text-[rgb(var(--text-rgb))]">
                  ${metrics.monthlyVolumeUsd.toLocaleString()} / ${metrics.monthlyTargetUsd.toLocaleString()}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full border border-emerald-500/20 bg-emerald-500/10">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${volumeProgressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Composite Trust Score Meter Card */}
        <section
          className="nss-fade overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--panel)]"
          style={{ animationDelay: '160ms' }}
        >
          <header className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.12)] px-5 py-4">
            <h3 className="nss-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[rgba(var(--text-rgb),0.75)]">
              <Activity className={`h-4 w-4 ${amberText}`} />
              {t('portal.partnerGam.trustScoreTitle')}
            </h3>
          </header>

          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className={`nss-mono inline-block rounded-xl border p-3 text-4xl font-bold ${trustScoreColor}`}>
                  {metrics.trustScore}
                  <span className="text-base font-medium opacity-70">/100</span>
                </div>
                <span className="mt-2 block text-xs text-[rgba(var(--text-rgb),0.55)]">
                  {t('portal.partnerGam.rankedReliabilitySub')}
                </span>
              </div>

              <div className="nss-mono space-y-1 text-end text-xs">
                <div className="text-[rgba(var(--text-rgb),0.75)]">
                  <span className={`font-bold ${amberText}`}>{metrics.onTimeDeliveryRate}%</span>{' '}
                  {t('portal.partnerGam.onTimeRateLabel')}
                </div>
                <div className="text-[rgba(var(--text-rgb),0.75)]">
                  <span className={`font-bold ${emeraldText}`}>{metrics.cargoIntegrityRate}%</span>{' '}
                  {t('portal.partnerGam.cargoIntegrityLabel')}
                </div>
                <div className="text-[rgba(var(--text-rgb),0.75)]">
                  <span className={`font-bold ${amberText}`}>{metrics.averageResponseMins}m</span>{' '}
                  {t('portal.partnerGam.avgResponseLabel')}
                </div>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="grid grid-cols-2 gap-2 border-t border-[rgba(var(--gold-rgb),0.1)] pt-4 text-xs">
              <div className="flex items-center gap-1.5 rounded-lg border border-[var(--card-border)] bg-[rgba(var(--bg-rgb),0.5)] p-2">
                <Star className={`h-3.5 w-3.5 ${amberText}`} />
                <span className="nss-mono font-bold text-[rgb(var(--text-rgb))]">{metrics.clientRating} / 5.0</span>
                <span className="text-[rgba(var(--text-rgb),0.5)]">
                  ({metrics.totalReviews} {t('portal.partnerGam.reviewsSuffix')})
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-[var(--card-border)] bg-[rgba(var(--bg-rgb),0.5)] p-2">
                <ShieldCheck className={`h-3.5 w-3.5 ${emeraldText}`} />
                <span className="nss-mono font-bold text-[rgb(var(--text-rgb))]">{metrics.disputeRate}%</span>
                <span className="text-[rgba(var(--text-rgb),0.5)]">{t('portal.partnerGam.disputeRateLabel')}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
