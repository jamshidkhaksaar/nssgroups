import { Link } from 'react-router'
import { useI18n } from '@/i18n/i18n'
import { PHONE_1 } from '@/data/content'
import Reveal from '@/components/Reveal'

export default function CtaBand() {
  const { t } = useI18n()
  return (
    <section className="relative overflow-hidden border-t border-[rgba(var(--gold-rgb),0.15)] bg-gradient-to-b from-[var(--bg)] to-[var(--panel-2)]">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center md:px-12 md:py-32">
        <Reveal>
          <p className="nss-section-tag">{t('shared.divisions')}</p>
          <h2 className="nss-h2 mx-auto mt-5 max-w-2xl text-4xl md:text-6xl">
            {t('cta.heading')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[rgba(var(--text-rgb),0.60)] md:text-base">
            {t('cta.sub')}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Link
              to="/contact"
              className="nss-btn-primary rounded-sm px-8 py-4 text-sm font-bold"
            >
              {t('cta.button')}
            </Link>
            <a
              href={`tel:${PHONE_1.replace(/\s/g, '')}`}
              className="nss-mono text-[14px] font-medium tracking-[0.14em] text-[rgb(var(--gold-rgb))] transition-opacity hover:opacity-75"
            >
              {t('cta.call')} — <span dir="ltr">{PHONE_1}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
