import { Link } from 'react-router'
import { useI18n } from '@/i18n/i18n'
import { CORRIDORS } from '@/data/content'
import Reveal from '@/components/Reveal'
import AfghanistanMap from '@/components/AfghanistanMap'

export default function CorridorTeaser() {
  const { t } = useI18n()
  return (
    <section className="border-y border-[rgba(var(--gold-rgb),0.12)] bg-[var(--panel)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="nss-section-tag">{t('corr.tag')}</p>
            <h2 className="nss-h2 mt-4 text-4xl md:text-5xl">{t('corr.heading')}</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[rgba(var(--text-rgb),0.60)] md:text-base">
              {t('corr.sub')}
            </p>
            <Link
              to="/network"
              className="nss-btn-ghost mt-8 inline-block rounded-sm px-6 py-3 text-[13px] font-semibold"
            >
              {t('corr.link')} →
            </Link>
            <div className="mt-10">
              <AfghanistanMap />
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 lg:pt-24">
            {CORRIDORS.map((c, i) => (
              <Reveal key={c.nameKey} delay={i * 80}>
                <div className="nss-card p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="nss-display text-base text-[rgb(var(--text-rgb))]">{t(c.nameKey)}</h3>
                    <span className="nss-index shrink-0">0{i + 1}</span>
                  </div>
                  <div className="nss-route-line my-4" />
                  <p className="text-sm leading-relaxed text-[rgba(var(--text-rgb),0.55)]">{t(c.descKey)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
