import {
  Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import type { LogisticsOrder, PartnerVendor, OrderStatus } from '@/types/portal';
import { PageSectionHeader, surfaceClass } from './primitives';
import { Activity, PieChart as PieIcon, BarChart as BarIcon } from 'lucide-react';

/* Brand-aligned palette (matches NSS theme) */
const GOLD = '#e8c268';
const CYCLE = ['#e8c268', '#7c8cf8', '#4ade80', '#f472b6', '#fbbf24', '#60a5fa', '#fb7185', '#c084fc'];
const STATUS_COLORS: Record<string, string> = {
  order_placed: '#60a5fa',
  in_transit: '#e8c268',
  customs_clearance: '#fbbf24',
  delivered: '#4ade80',
  delayed: '#fb7185',
  cancelled: '#94a3b8',
};

const labelFill = 'rgba(var(--text-rgb),0.55)';
const gridStroke = 'rgba(255,255,255,0.06)';

interface Props {
  orders: LogisticsOrder[];
  partners: PartnerVendor[];
}

/* ── Derive last-30-days shipment series from order dates ── */
function shipmentsSeries(orders: LogisticsOrder[]) {
  const days: { day: string; count: number }[] = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push({
      day: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      count: 0,
    });
  }
  const keyIdx = new Map(days.map((d, i) => [d.day, i]));
  orders.forEach((o) => {
    const key = new Date(o.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const idx = keyIdx.get(key);
    if (idx !== undefined) days[idx].count += 1;
  });
  return days;
}

function statusDistribution(orders: LogisticsOrder[]) {
  const counts: Record<string, number> = {};
  orders.forEach((o) => {
    counts[o.status] = (counts[o.status] || 0) + 1;
  });
  return (Object.keys(counts) as OrderStatus[]).map((status) => ({
    name: status.replace('_', ' '),
    value: counts[status],
    color: STATUS_COLORS[status] || GOLD,
  }));
}

function partnerVolume(partners: PartnerVendor[]) {
  return [...partners]
    .sort((a, b) => b.metrics.businessVolumeUsd - a.metrics.businessVolumeUsd)
    .slice(0, 6)
    .map((p) => ({
      name: p.companyName.length > 18 ? `${p.companyName.slice(0, 18)}…` : p.companyName,
      volume: p.metrics.businessVolumeUsd,
    }));
}

interface TooltipRow {
  color?: string;
  fill?: string;
  value?: number | string;
}

function ChartTooltip({ active, payload, label, valueLabel = '' }: {
  active?: boolean;
  payload?: TooltipRow[];
  label?: string | number;
  valueLabel?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-[var(--panel)] px-3 py-2 text-xs shadow-xl">
      {label !== undefined && label !== '' && <p className="mb-1 font-semibold text-[rgb(var(--text-rgb))]">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2 text-[rgba(var(--text-rgb),0.75)]">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
          <span className="font-semibold" style={{ color: p.color || p.fill }}>
            {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
          </span>
          <span>{valueLabel}</span>
        </p>
      ))}
    </div>
  );
}

export default function AdminCharts({ orders, partners }: Props) {
  const series = shipmentsSeries(orders);
  const statuses = statusDistribution(orders);
  const volume = partnerVolume(partners);

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {/* Shipments over time */}
      <section className={`lg:col-span-2 ${surfaceClass} overflow-hidden`}>
        <PageSectionHeader icon={Activity} title="Shipments — last 30 days" subtitle="New freight orders by day" />
        <div className="h-56 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
              <defs>
                <linearGradient id="shipments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GOLD} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={gridStroke} vertical={false} />
              <XAxis dataKey="day" tick={{ fill: labelFill, fontSize: 10 }} tickLine={false} axisLine={false} minTickGap={24} />
              <YAxis allowDecimals={false} tick={{ fill: labelFill, fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip valueLabel="orders" />} cursor={{ stroke: 'rgba(255,255,255,0.15)' }} />
              <Area type="monotone" dataKey="count" stroke={GOLD} strokeWidth={2} fill="url(#shipments)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Orders by status donut */}
      <section className={`${surfaceClass} overflow-hidden`}>
        <PageSectionHeader icon={PieIcon} title="Orders by status" />
        <div className="relative h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statuses} dataKey="value" nameKey="name" innerRadius={56} outerRadius={80} paddingAngle={2} stroke="none">
                {statuses.map((s, i) => (
                  <Cell key={i} fill={s.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="nss-mono text-2xl font-bold text-[rgb(var(--text-rgb))]">{orders.length}</span>
            <span className="text-[10px] uppercase tracking-wider text-[rgba(var(--text-rgb),0.5)]">total</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-[var(--card-border)] px-4 py-3">
          {statuses.slice(0, 5).map((s) => (
            <span key={s.name} className="flex items-center gap-1.5 text-[10px] capitalize text-[rgba(var(--text-rgb),0.6)]">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      </section>

      {/* Volume by partner */}
      <section className={`lg:col-span-3 ${surfaceClass} overflow-hidden`}>
        <PageSectionHeader icon={BarIcon} title="Business volume by partner" subtitle="Top partners by cumulative volume (USD)" />
        <div className="h-60 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volume} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid stroke={gridStroke} horizontal={false} />
              <XAxis type="number" tick={{ fill: labelFill, fontSize: 10 }} tickLine={false} axisLine={false}
                tickFormatter={(v: number) => (v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : `${(v / 1000).toFixed(0)}k`)} />
              <YAxis type="category" dataKey="name" width={150} tick={{ fill: 'rgba(var(--text-rgb),0.7)', fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip valueLabel="USD" />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="volume" radius={[0, 4, 4, 0]}>
                {volume.map((_, i) => (
                  <Cell key={i} fill={CYCLE[i % CYCLE.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
