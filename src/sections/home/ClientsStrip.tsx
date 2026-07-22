import { useI18n } from '@/i18n/i18n'
import { CLIENTS } from '@/data/content'
import Reveal from '@/components/Reveal'

export default function ClientsStrip() {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="nss-section-tag">{t('clients.tag')}</p>
          <h2 className="nss-h2 mt-4 max-w-3xl text-4xl md:text-5xl">{t('clients.heading')}</h2>
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <div className="grid gap-px overflow-hidden rounded-sm border border-[rgba(var(--gold-rgb),0.16)] bg-[rgba(var(--gold-rgb),0.16)] md:grid-cols-2 lg:grid-cols-4">
          {CLIENTS.map((g) => (
            <div key={g.titleKey} className="bg-[var(--panel)] p-7">
              <h3 className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--gold-rgb))]" />
                <span className="nss-mono text-[11px] tracking-[0.24em] text-[rgb(var(--gold-rgb))] uppercase">
                  {t(g.titleKey)}
                </span>
              </h3>
              <ul className="mt-5">
                {g.names.map((n) => (
                  <li
                    key={n}
                    className="group flex items-baseline justify-between border-t border-[rgba(var(--gold-rgb),0.10)] py-2.5 first:border-t-0"
                  >
                    <span className="text-[15px] font-medium text-[rgba(var(--text-rgb),0.62)] transition-colors duration-300 group-hover:text-[rgb(var(--gold-rgb))]">
                      {n}
                    </span>
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[rgba(var(--gold-rgb),0.35)] transition-colors duration-300 group-hover:bg-[rgb(var(--gold-rgb))]" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
