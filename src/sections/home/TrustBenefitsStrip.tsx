import { Factory, ShieldCheck, PackageCheck, Truck, FileCheck, Home, Headphones } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'

interface Benefit {
  titleKey: TranslationKey
  subKey: TranslationKey
  icon: typeof Factory
}

const BENEFITS: Benefit[] = [
  { titleKey: 'benefits.1.title', subKey: 'benefits.1.sub', icon: Factory },
  { titleKey: 'benefits.2.title', subKey: 'benefits.2.sub', icon: ShieldCheck },
  { titleKey: 'benefits.3.title', subKey: 'benefits.3.sub', icon: PackageCheck },
  { titleKey: 'benefits.4.title', subKey: 'benefits.4.sub', icon: Truck },
  { titleKey: 'benefits.5.title', subKey: 'benefits.5.sub', icon: FileCheck },
  { titleKey: 'benefits.6.title', subKey: 'benefits.6.sub', icon: Home },
  { titleKey: 'benefits.7.title', subKey: 'benefits.7.sub', icon: Headphones },
]

export default function TrustBenefitsStrip() {
  const { t } = useI18n()

  return (
    <section className="bg-[var(--panel)] py-0 border-t border-[rgba(var(--gold-rgb),0.1)]">
      <div className="w-full">
        {/* Single-row scrollable strip — exactly 7 items with dividers */}
        <div className="flex w-full items-stretch overflow-x-auto scrollbar-none">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon
            return (
              <div
                key={b.titleKey}
                className={`flex flex-1 shrink-0 items-center gap-3 px-4 py-5 transition-colors hover:bg-[rgba(var(--gold-rgb),0.04)] ${
                  i < BENEFITS.length - 1
                    ? 'border-e border-[rgba(var(--gold-rgb),0.12)]'
                    : ''
                }`}
              >
                {/* Icon box */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[rgba(var(--gold-rgb),0.20)] bg-[rgba(var(--gold-rgb),0.07)] text-[rgb(var(--gold-rgb))]">
                  <Icon size={19} strokeWidth={1.75} />
                </div>
                {/* Text */}
                <div className="flex flex-col text-start">
                  <span className="nss-mono text-[12px] font-semibold leading-tight text-[rgb(var(--text-rgb))]">
                    {t(b.titleKey)}
                  </span>
                  <span className="mt-0.5 text-[11px] leading-snug text-[rgba(var(--text-rgb),0.50)]">
                    {t(b.subKey)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
