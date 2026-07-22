import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'
import Reveal from '@/components/Reveal'

interface PageHeaderProps {
  tagKey: TranslationKey
  headingKey: TranslationKey
  subKey?: TranslationKey
}

/** Standard subpage hero block — sits below the fixed navbar. */
export default function PageHeader({ tagKey, headingKey, subKey }: PageHeaderProps) {
  const { t } = useI18n()
  return (
    <section className="border-b border-[rgba(var(--gold-rgb),0.12)] bg-gradient-to-b from-[var(--panel-2)] to-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-12 md:pb-20 md:pt-44">
        <Reveal>
          <p className="nss-section-tag">{t(tagKey)}</p>
          <h1 className="nss-h2 mt-4 max-w-4xl text-4xl md:text-6xl">{t(headingKey)}</h1>
          {subKey && (
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[rgba(var(--text-rgb),0.60)] md:text-base">
              {t(subKey)}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
