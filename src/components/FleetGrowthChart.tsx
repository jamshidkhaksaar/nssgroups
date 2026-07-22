import { useI18n } from '@/i18n/i18n'
import { useReveal } from '@/hooks/useReveal'

/* fleet growth milestones (units) — 2022 & today match verified company data */
const POINTS: { year: string; units: number }[] = [
  { year: '2007', units: 120 },
  { year: '2011', units: 800 },
  { year: '2015', units: 1900 },
  { year: '2018', units: 3100 },
  { year: '2022', units: 4600 },
  { year: '2025', units: 4940 },
]

const W = 560
const H = 300
const PAD_X = 46
const PAD_TOP = 26
const PAD_BOTTOM = 40
const MAX = 5200

const x = (i: number) => PAD_X + (i / (POINTS.length - 1)) * (W - PAD_X - 16)
const y = (units: number) => PAD_TOP + (1 - units / MAX) * (H - PAD_TOP - PAD_BOTTOM)

const linePath = POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(p.units)}`).join('')
const areaPath = `${linePath}L${x(POINTS.length - 1)},${H - PAD_BOTTOM}L${x(0)},${H - PAD_BOTTOM}Z`

/** Animated fleet-growth line chart — draws itself when scrolled into view. */
export default function FleetGrowthChart() {
  const { t } = useI18n()
  const { ref, visible } = useReveal<HTMLDivElement>()
  const last = POINTS[POINTS.length - 1]

  return (
    <div ref={ref} className="nss-card h-full p-6 md:p-8">
      <p className="nss-mono text-[11px] tracking-[0.2em] text-[rgba(var(--gold-rgb),0.8)]">
        {t('stats.chartTitle')}
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-5 h-auto w-full" role="img" aria-label={t('stats.chartTitle')}>
        <defs>
          <linearGradient id="nss-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--gold-rgb))" stopOpacity="0.28" />
            <stop offset="100%" stopColor="rgb(var(--gold-rgb))" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={PAD_X}
            x2={W - 16}
            y1={y(MAX * f)}
            y2={y(MAX * f)}
            stroke="rgba(var(--text-rgb),0.10)"
            strokeDasharray="3 6"
          />
        ))}

        {/* area fill */}
        <path
          d={areaPath}
          fill="url(#nss-area)"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 1.1s',
          }}
        />

        {/* the line — draws itself via pathLength trick */}
        <path
          d={linePath}
          fill="none"
          stroke="rgb(var(--gold-rgb))"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={visible ? 0 : 1}
          style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.65, 0, 0.35, 1) 0.2s' }}
        />

        {/* data points */}
        {POINTS.map((p, i) => (
          <g
            key={p.year}
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.4s ease ${0.3 + (i / (POINTS.length - 1)) * 1.7}s`,
            }}
          >
            <circle cx={x(i)} cy={y(p.units)} r={i === POINTS.length - 1 ? 5 : 3.5} fill="rgb(var(--gold-rgb))" />
            <text
              x={x(i)}
              y={H - PAD_BOTTOM + 22}
              textAnchor="middle"
              className="nss-map-label"
              style={{ fontSize: 13, fill: 'rgba(var(--text-rgb),0.45)' }}
            >
              {p.year}
            </text>
          </g>
        ))}

        {/* pulsing end marker + value */}
        {visible && (
          <>
            <circle cx={x(POINTS.length - 1)} cy={y(last.units)} r={5} className="nss-map-ping" />
            <text
              x={x(POINTS.length - 1) - 8}
              y={y(last.units) - 12}
              textAnchor="end"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 16,
                fontWeight: 500,
                fill: 'rgb(var(--gold-rgb))',
              }}
            >
              {last.units.toLocaleString('en-US')}+
            </text>
          </>
        )}
      </svg>

      <p className="nss-mono mt-3 text-[11px] text-[rgba(var(--text-rgb),0.45)]">
        2007 — {t('stats.chartNow')}
      </p>
    </div>
  )
}
