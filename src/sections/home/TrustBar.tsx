import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'

const ITEMS: TranslationKey[] = ['trust.1', 'trust.2', 'trust.3', 'trust.4']

export default function TrustBar() {
  const { t } = useI18n()
  return (
    <section className="border-y border-[rgba(var(--gold-rgb),0.12)] bg-[var(--bg-deep)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 md:px-12">
        {ITEMS.map((k, i) => (
          <span key={k} className="flex items-center gap-10">
            <span className="nss-mono text-[12px] tracking-[0.18em] text-[rgba(var(--text-rgb),0.78)]">
              {t(k)}
            </span>
            {i < ITEMS.length - 1 && (
              <span className="hidden h-1 w-1 rounded-full bg-[rgba(var(--gold-rgb),0.50)] md:inline-block" />
            )}
          </span>
        ))}
      </div>
    </section>
  )
}
