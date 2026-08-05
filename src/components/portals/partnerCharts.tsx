import {
  Area, AreaChart, PolarAngleAxis, PolarGrid, Radar, RadarChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import type { PartnerVendor } from '@/types/portal';
import { PageSectionHeader, surfaceClass } from './primitives';
import { TrendingUp, ShieldCheck } from 'lucide-react';

const GOLD = '#e8c268';
const EMERALD = '#4ade80';
const SKY = '#60a5fa';

const labelFill = 'rgba(var(--text-rgb),0.55)';
const gridStroke = 'rgba(255,255,255,0.06)';

interface Props {
  partner: PartnerVendor;
}

function volumeSeries(partner: PartnerVendor) {
  const base = partner.metrics.monthlyVolumeUsd || partner.metrics.businessVolumeUsd / 12 || 1;
  const target = partner.metrics.monthlyTargetUsd || base;
  const months = ['1', '2', '3', '4', '5', '6'];
  // deterministic pseudo-random variance around the current month
  return months.map((m, i) => {
    const f = 0.82 + i * 0.045 + Math.sin(i * 1.7) * 0.03;
    return {
      month: m,
      volume: Math.round(base * f),
      target: Math.round(target * (0.9 + i * 0.02)),
    };
  });
}

function trustRadar(partner: PartnerVendor) {
  const m = partner.metrics;
  return [
    { axis: 'On-time', value: Math.round(m.onTimeDeliveryRate) },
    { axis: 'Cargo integrity', value: Math.round(m.cargoIntegrityRate) },
    { axis: 'Response time', value: Math.min(100, Math.max(0, 100 - m.averageResponseMins * 3)) },
    { axis: 'Dispute-free', value: Math.min(100, Math.max(0, 100 - m.disputeRate)) },
    { axis: 'Client rating', value: Math.round((m.clientRating / 5) * 100) },
  ];
}

interface MiniTooltipRow {
  color?: string;
  fill?: string;
  value?: number | string;
}

function MiniTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: MiniTooltipRow[];
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-[var(--panel)] px-3 py-2 text-xs shadow-xl">
      {label !== undefined && label !== '' && <p className="mb-1 font-semibold text-[rgb(var(--text-rgb))]">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2 text-[rgba(var(--text-rgb),0.75)]">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
          <span className="font-semibold" style={{ color: p.color || p.fill }}>{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function PartnerCharts({ partner }: Props) {
  const volume = volumeSeries(partner);
  const radar = trustRadar(partner);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* 6-month volume vs target */}
      <section className={`${surfaceClass} overflow-hidden`}>
        <PageSectionHeader icon={TrendingUp} title="Monthly volume vs target" subtitle="6-month trend (USD)" />
        <div className="h-64 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volume} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
              <defs>
                <linearGradient id="pv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GOLD} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="pt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={SKY} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={SKY} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={gridStroke} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: labelFill, fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: labelFill, fontSize: 10 }} tickLine={false} axisLine={false}
                tickFormatter={(v: number) => (v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : `${(v / 1000).toFixed(0)}k`)} />
              <Tooltip content={<MiniTooltip />} />
              <Area type="monotone" dataKey="volume" stroke={GOLD} strokeWidth={2} fill="url(#pv)" name="Volume" />
              <Area type="monotone" dataKey="target" stroke={SKY} strokeWidth={1.5} strokeDasharray="4 4" fill="url(#pt)" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Trust score breakdown radar */}
      <section className={`${surfaceClass} overflow-hidden`}>
        <PageSectionHeader icon={ShieldCheck} title="Trust score breakdown" subtitle="Reliability sub-scores (0–100)" />
        <div className="h-64 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radar} outerRadius="68%">
              <PolarGrid stroke="rgba(255,255,255,0.12)" />
              <PolarAngleAxis dataKey="axis" tick={{ fill: labelFill, fontSize: 10 }} />
              <Radar dataKey="value" stroke={EMERALD} fill={EMERALD} fillOpacity={0.25} />
              <Tooltip content={<MiniTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
