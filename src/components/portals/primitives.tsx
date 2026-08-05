import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

/**
 * Shared enterprise primitives for the NSS portals.
 * Keeps Admin / Client / Partner dashboards visually consistent.
 */

export const surfaceClass = 'rounded-xl border border-[var(--card-border)] bg-[var(--panel)]';
export const labelClass = 'nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.45)]';

/* ── Trend delta chip ─────────────────────────────────────── */
type Trend = number | null | undefined;

export function StatDelta({ value, className = '' }: { value: Trend; className?: string }) {
  if (value === null || value === undefined || value === 0) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${className}`}>
        <Minus className="h-3 w-3" /> 0%
      </span>
    );
  }
  const up = value > 0;
  const cls = up
    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    : 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400';
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${cls} ${className}`}>
      <Icon className="h-3 w-3" />
      {up ? '+' : ''}{value}%
    </span>
  );
}

/* ── KPI card ────────────────────────────────────────────── */
interface KpiCardProps {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  icon?: LucideIcon;
  iconClass?: string;
  valueClassName?: string;
  trend?: Trend;
  /** Optional inline sparkline series (numbers) */
  spark?: number[];
  sparkColor?: string;
}

export function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  iconClass = 'bg-[rgba(var(--gold-rgb),0.1)] border-[rgba(var(--gold-rgb),0.25)] text-[rgb(var(--gold-rgb))]',
  valueClassName = 'nss-mono text-[26px] font-bold leading-none text-[rgb(var(--text-rgb))]',
  trend,
  spark,
  sparkColor = 'var(--gold)',
}: KpiCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--panel)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {trend !== undefined && <StatDelta value={trend} />}
        </div>
        {Icon && (
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${iconClass}`}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <p className={`mt-2 ${labelClass}`}>{label}</p>
      <div className="mt-1 flex items-end justify-between gap-2">
        <div>
          <div className={valueClassName}>{value}</div>
          {sub && <p className="mt-1 text-[11px] text-[rgba(var(--text-rgb),0.5)]">{sub}</p>}
        </div>
        {spark && spark.length > 0 && (
          <div className="pointer-events-none h-9 w-20 shrink-0">
            <Sparkline data={spark} color={sparkColor} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────── */
interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      {Icon && <Icon className="h-8 w-8 text-[rgba(var(--text-rgb),0.35)]" />}
      <p className="text-sm font-medium text-[rgb(var(--text-rgb))]">{title}</p>
      {description && <p className="max-w-xs text-xs text-[rgba(var(--text-rgb),0.5)]">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/* ── Page section header ─────────────────────────────────── */
interface PageSectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  iconClass?: string;
  subtitle?: string;
  trailing?: ReactNode;
}

export function PageSectionHeader({ icon: Icon, title, iconClass = 'text-[rgb(var(--gold-rgb))]', subtitle, trailing }: PageSectionHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--card-border)] px-5 py-3.5">
      <div className="flex min-w-0 items-center gap-2.5">
        {Icon && <Icon className={`h-4 w-4 shrink-0 ${iconClass}`} />}
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text-rgb))]">{title}</h3>
          {subtitle && <p className="truncate text-[11px] text-[rgba(var(--text-rgb),0.5)]">{subtitle}</p>}
        </div>
      </div>
      {trailing && <div className="flex items-center gap-2">{trailing}</div>}
    </header>
  );
}

/* ── Themed progress bar ─────────────────────────────────── */
export function ProgressBar({ value, max = 100, className = '' }: { value: number; max?: number; className?: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`h-1.5 overflow-hidden rounded-full bg-[rgba(var(--gold-rgb),0.12)] ${className}`}>
      <div className="h-full rounded-full bg-[rgb(var(--gold-rgb))] transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ── Tiny inline sparkline (recharts) ────────────────────── */
export function Sparkline({ data, color = 'var(--gold)' }: { data: number[]; color?: string }) {
  const points = data.map((v, i) => ({ i, v }));
  const gid = `spark-${color.replace(/\W/g, '')}`;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={points} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#${gid})`} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
