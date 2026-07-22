import { useState } from 'react'
import { useI18n } from '@/i18n/i18n'
import { useReveal } from '@/hooks/useReveal'
import {
  AFG_PATH,
  CORRIDOR_ENDS,
  MAP_POINTS,
  MAP_VIEWBOX,
  NEIGHBORS,
  type MapPoint,
} from '@/data/afghanistanMap'

interface OfficeMark {
  id: string
  name: string
  dx: number
  dy: number
  anchor: 'start' | 'middle' | 'end'
}

const OFFICES: OfficeMark[] = [
  { id: 'hairatan', name: 'HAIRATAN', dx: 0, dy: -18, anchor: 'middle' },
  { id: 'sherkhan', name: 'SHERKHAN', dx: 12, dy: -12, anchor: 'start' },
  { id: 'aqina', name: 'AQINA', dx: 0, dy: -18, anchor: 'middle' },
  { id: 'torghundi', name: 'TORGHUNDI', dx: -12, dy: 30, anchor: 'end' },
  { id: 'islamQala', name: 'ISLAM QALA', dx: -12, dy: 6, anchor: 'end' },
]

const f = (n: number) => Math.round(n * 10) / 10

/** gentle arc between two points, alternating bend side per index */
function curve(a: MapPoint, b: MapPoint, i: number): string {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  const k = len * 0.16 * (i % 2 === 0 ? 1 : -1)
  return `M${a.x},${a.y} Q${f(mx - (dy / len) * k)},${f(my + (dx / len) * k)} ${b.x},${b.y}`
}

const MONO = "'JetBrains Mono', ui-monospace, monospace"

/** NSS operations map — Afghanistan with border offices and live corridors. */
export default function AfghanistanMap() {
  const { t } = useI18n()
  const { ref, visible } = useReveal<HTMLDivElement>()
  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const routes = CORRIDOR_ENDS.map((c, i) => ({ d: curve(c.a, c.b, i), key: i }))
  const kabul = MAP_POINTS.kabul
  const herat = MAP_POINTS.herat

  const marker = (p: MapPoint, name: string, dx: number, dy: number, anchor: string, big = false, delay = 0) => (
    <g key={name} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${delay}s` }}>
      <circle cx={p.x} cy={p.y} r={big ? 11 : 8} className="nss-map-ping" style={{ animationDelay: `${delay}s` }} />
      <circle cx={p.x} cy={p.y} r={big ? 6.5 : 4.5} className="nss-map-dot" />
      {big && <circle cx={p.x} cy={p.y} r={11} fill="none" stroke="rgb(var(--gold-rgb))" strokeOpacity={0.5} />}
      {/* label chip */}
      <rect
        x={anchor === 'middle' ? p.x + dx - (name.length * 7.4 + 18) / 2 : anchor === 'start' ? p.x + dx - 4 : p.x + dx - name.length * 7.4 - 14}
        y={p.y + dy - 11}
        width={name.length * 7.4 + 18}
        height={22}
        rx={4}
        fill="var(--panel)"
        stroke="rgba(var(--gold-rgb),0.4)"
      />
      <text
        x={p.x + dx + (anchor === 'middle' ? 0 : anchor === 'start' ? 5 : -5)}
        y={p.y + dy + 4}
        textAnchor={anchor as 'middle'}
        style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: '0.12em', fill: 'rgba(var(--text-rgb),0.85)' }}
      >
        {name}
      </text>
    </g>
  )

  return (
    <div ref={ref} className="nss-card relative overflow-hidden p-5 md:p-8">
      {/* corner ticks */}
      {(['top-3 left-3 border-t-2 border-s-2', 'top-3 right-3 border-t-2 border-e-2', 'bottom-3 left-3 border-b-2 border-s-2', 'bottom-3 right-3 border-b-2 border-e-2'] as const).map((c) => (
        <span key={c} className={`absolute h-5 w-5 border-[rgba(var(--gold-rgb),0.5)] ${c}`} />
      ))}

      <svg viewBox={MAP_VIEWBOX} role="img" aria-label={t('network.heading')} className="h-auto w-full">
        <defs>
          <radialGradient id="nss-afg-fill" cx="50%" cy="42%" r="75%">
            <stop offset="0%" stopColor="rgb(var(--gold-rgb))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(var(--gold-rgb))" stopOpacity="0.05" />
          </radialGradient>
          <pattern id="nss-dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="rgba(var(--text-rgb),0.07)" />
          </pattern>
        </defs>

        {/* dot-grid backdrop */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#nss-dots)" />

        {/* lat/long grid */}
        {[0.2, 0.4, 0.6, 0.8].map((g) => (
          <g key={g} stroke="rgba(var(--text-rgb),0.05)">
            <line x1={1000 * g} y1="0" x2={1000 * g} y2="922" />
            <line x1="0" y1={922 * g} x2="1000" y2={922 * g} />
          </g>
        ))}

        {/* neighbour countries */}
        {NEIGHBORS.map((n) => (
          <g key={n.id}>
            <path d={n.d} fill="rgba(var(--text-rgb),0.025)" stroke="rgba(var(--text-rgb),0.14)" strokeWidth="1" />
            <text
              x={n.lx}
              y={n.ly}
              textAnchor="middle"
              style={{ fontFamily: MONO, fontSize: 21, letterSpacing: '0.32em', fill: 'rgba(var(--text-rgb),0.22)' }}
            >
              {n.name}
            </text>
          </g>
        ))}

        {/* Afghanistan */}
        <path d={AFG_PATH} fill="url(#nss-afg-fill)" stroke="rgb(var(--gold-rgb))" strokeWidth="1.8" strokeOpacity="0.85" />

        {/* corridors — solid bed draws in, dashed flow on top, cargo pulses */}
        {routes.map((r, i) => (
          <g key={r.key}>
            <path
              d={r.d}
              fill="none"
              stroke="rgb(var(--gold-rgb))"
              strokeWidth="2.4"
              strokeOpacity="0.9"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={visible ? 0 : 1}
              style={{ transition: `stroke-dashoffset 1.1s cubic-bezier(0.65,0,0.35,1) ${0.2 + i * 0.22}s` }}
            />
            <path
              d={r.d}
              className="nss-map-route"
              style={{
                opacity: visible ? 0.75 : 0,
                transition: `opacity 0.6s ease ${1.1 + i * 0.22}s`,
              }}
            />
            {visible && !reduced && (
              <circle r="4" fill="rgb(var(--gold-rgb))" opacity="0">
                <animate attributeName="opacity" from="0" to="0.95" begin={`${1.4 + i * 0.22}s`} dur="0.5s" fill="freeze" />
                <animateMotion dur={`${3.2 + i * 0.5}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" path={r.d} />
              </circle>
            )}
          </g>
        ))}

        {/* Herat hub + border offices + Kabul HQ */}
        {marker(herat, 'HERAT', 0, 34, 'middle', false, 1.6)}
        {OFFICES.map((o, i) => marker(MAP_POINTS[o.id], o.name, o.dx, o.dy, o.anchor, false, 1.5 + i * 0.12))}
        {marker(kabul, 'KABUL HQ', 18, 6, 'start', true, 2)}
      </svg>

      {/* legend */}
      <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[rgba(var(--gold-rgb),0.12)] pt-5">
        <span className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-[rgb(var(--gold-rgb))] bg-transparent" />
          <span className="nss-mono text-xs text-[rgba(var(--text-rgb),0.60)]">{t('map.hq')}</span>
        </span>
        <span className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[rgb(var(--gold-rgb))]" />
          <span className="nss-mono text-xs text-[rgba(var(--text-rgb),0.60)]">{t('map.office')}</span>
        </span>
        <span className="flex items-center gap-2.5">
          <span className="h-px w-7 border-t-2 border-dashed border-[rgb(var(--gold-rgb))]" />
          <span className="nss-mono text-xs text-[rgba(var(--text-rgb),0.60)]">{t('map.corridor')}</span>
        </span>
        <span className="nss-mono ms-auto text-xs text-[rgba(var(--gold-rgb),0.8)]">{t('map.provinces')}</span>
      </div>
    </div>
  )
}
