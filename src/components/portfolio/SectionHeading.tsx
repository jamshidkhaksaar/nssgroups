import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'

interface SectionHeadingProps {
  tagKey: TranslationKey
  titleKey: TranslationKey
  leadKey?: TranslationKey
  align?: 'start' | 'center'
}

export default function SectionHeading({
  tagKey,
  titleKey,
  leadKey,
  align = 'start',
}: SectionHeadingProps) {
  const { t } = useI18n()
  const isCentered = align === 'center'

  return (
    <div className={isCentered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="nss-section-tag">{t(tagKey)}</p>
      <h2 className="nss-h2 mt-4 text-3xl md:text-5xl">{t(titleKey)}</h2>
      {leadKey && (
        <p
          className={`mt-5 text-[15px] leading-7 text-[rgba(var(--text-rgb),0.64)] md:text-base ${
            isCentered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {t(leadKey)}
        </p>
      )}
    </div>
  )
}
