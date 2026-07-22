import { useI18n } from '@/i18n/i18n'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import AfghanistanMap from '@/components/AfghanistanMap'
import { CORRIDORS, COUNTRIES, OFFICES } from '@/data/content'

export default function Network() {
  const { t } = useI18n()
  return (
    <main className="bg-[var(--bg)]">
      <PageHeader tagKey="network.tag" headingKey="network.heading" subKey="network.sub" />

      {/* ── operations map ── */}
      <section className="mx-auto max-w-7xl px-6 pt-16 md:px-12 md:pt-24">
        <AfghanistanMap />
      </section>

      {/* ── coverage chips ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <p className="nss-section-tag">{t('network.countriesTag')}</p>
        </Reveal>
        <Reveal delay={100} className="mt-8 flex flex-wrap gap-3">
          {COUNTRIES.map((c) => {
            const endpoint = c === 'Afghanistan' || c === 'Europe'
            return (
              <span
                key={c}
                className={`nss-mono px-4 py-2 text-[12px] tracking-[0.14em] uppercase ${
                  endpoint
                    ? 'bg-[#e8c268] font-medium text-[#1d1233]'
                    : 'border border-[rgba(var(--gold-rgb),0.25)] text-[rgba(var(--text-rgb),0.65)]'
                }`}
              >
                {c}
              </span>
            )
          })}
        </Reveal>
      </section>

      {/* ── border offices ── */}
      <section className="border-y border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <p className="nss-section-tag">{t('network.officesTag')}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {OFFICES.map((o, i) => (
              <Reveal key={o.name} delay={i * 70}>
                <div className="nss-card h-full p-5">
                  <p className="nss-display text-base">{o.name}</p>
                  <p className="nss-mono mt-2 text-[10px] tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)] uppercase">
                    ↔ {o.border}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── corridors ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <p className="nss-section-tag">{t('network.corridorsTag')}</p>
        </Reveal>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            {CORRIDORS.map((c, i) => (
              <Reveal key={c.nameKey} delay={i * 70}>
                <div className="nss-card p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="nss-display text-base">{t(c.nameKey)}</h3>
                    <span className="nss-index shrink-0">0{i + 1}</span>
                  </div>
                  <div className="nss-route-line my-4" />
                  <p className="text-sm leading-relaxed text-[rgba(var(--text-rgb),0.55)]">{t(c.descKey)}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <img
              src="./posters/3.jpg"
              alt={t('network.corridorsTag')}
              loading="lazy"
              className="nss-poster aspect-square w-full object-cover"
            />
          </Reveal>
        </div>
      </section>
    </main>
  )
}
