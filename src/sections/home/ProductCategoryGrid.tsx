import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'

interface CategoryItem {
  titleKey: TranslationKey
  poster: string
  to: string
}

const CATEGORIES: CategoryItem[] = [
  { titleKey: 'categories.c1.title', poster: './card_images/extra/Construction Material.png',  to: '/trading' },
  { titleKey: 'categories.c2.title', poster: './card_images/row1/industrial low materials.png', to: '/trading' },
  { titleKey: 'categories.c3.title', poster: './card_images/row1/Machinery.png', to: '/trading' },
  { titleKey: 'categories.c4.title', poster: './card_images/row1/Food Products.png', to: '/trading' },
  { titleKey: 'categories.c5.title', poster: './card_images/row1/Textile and clothing.png', to: '/trading' },
  { titleKey: 'categories.c6.title', poster: './card_images/row1/cleaning and hygen.png', to: '/trading' },
  { titleKey: 'categories.c7.title', poster: './card_images/row1/home applinces.png', to: '/trading' },
  { titleKey: 'categories.c8.title', poster: './card_images/row1/beauty and perfums.png', to: '/trading' },
  { titleKey: 'categories.c9.title', poster: './card_images/row1/baby and children.png', to: '/trading' },
  { titleKey: 'categories.c10.title',poster: './card_images/row1/packaging and printing.png', to: '/trading' },
]

export default function ProductCategoryGrid() {
  const { t, dir } = useI18n()

  return (
    <section className="bg-[var(--bg)] py-8 border-t border-[rgba(var(--gold-rgb),0.1)]">
      <div className="w-full px-4 md:px-6">
        {/* Section label */}
        <div className="mb-6 flex items-center gap-3">
          <span className="block h-5 w-[3px] rounded-full bg-[rgb(var(--gold-rgb))]" />
          <h2 className="nss-display text-[15px] font-bold text-[rgb(var(--text-rgb))]">
            {t('categories.heading')}
          </h2>
        </div>

        {/* 3D perspective container — cards centered */}
        <div
          className="nss-scroll-gold nss-scroll-snap flex items-center justify-start gap-4 overflow-x-auto pb-3 pt-1"
          style={{ perspective: '1000px' }}
        >
          {CATEGORIES.map((c) => (
            <Link
              key={c.titleKey}
              to={c.to}
              id={`category-card-${c.titleKey.replace(/\./g, '-')}`}
              className="group relative flex shrink-0 flex-col justify-end overflow-hidden rounded-2xl bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
              style={{
                width: 190,
                height: 220,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease',
                boxShadow: '0 8px 32px var(--shadow), 0 2px 8px var(--shadow)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'rotateY(-8deg) rotateX(4deg) translateY(-10px) scale(1.04)'
                el.style.boxShadow = '8px 20px 48px var(--shadow), 0 2px 8px var(--shadow), 0 0 24px rgba(var(--gold-rgb),0.18)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0) scale(1)'
                el.style.boxShadow = '0 8px 32px var(--shadow), 0 2px 8px var(--shadow)'
              }}
            >
              {/* Background product photo — no gradient */}
              <div className="absolute inset-0 z-0">
                <img
                  src={c.poster}
                  alt={t(c.titleKey)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Bottom label — subtle frosted band */}
              <div className="relative z-10 bg-[var(--card-label)] px-3 py-2.5 backdrop-blur-sm border-t border-[rgba(var(--gold-rgb),0.1)]">
                <span className="nss-display block text-[12.5px] font-semibold leading-tight text-[rgb(var(--text-rgb))] transition-colors group-hover:text-[rgb(var(--gold-rgb))]">
                  {t(c.titleKey)}
                </span>
              </div>
            </Link>
          ))}

          {/* View All — gold card */}
          <Link
            to="/trading"
            id="category-view-all"
            className="group flex shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-[rgba(var(--gold-rgb),0.40)] bg-[var(--panel)] p-4 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
            style={{
              width: 190,
              height: 220,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease, border-color 0.25s ease',
              boxShadow: '0 8px 32px var(--shadow)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.transform = 'rotateY(-8deg) rotateX(4deg) translateY(-10px) scale(1.04)'
              el.style.boxShadow = '8px 20px 48px var(--shadow), 0 0 28px rgba(var(--gold-rgb),0.25)'
              el.style.borderColor = 'rgba(var(--gold-rgb),0.80)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0) scale(1)'
              el.style.boxShadow = '0 8px 32px var(--shadow)'
              el.style.borderColor = 'rgba(var(--gold-rgb),0.40)'
            }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgb(var(--gold-rgb))] bg-[rgba(var(--gold-rgb),0.18)] text-[rgb(var(--gold-rgb))] transition-transform group-hover:scale-110">
              <ArrowRight
                size={22}
                strokeWidth={2}
                className={dir === 'rtl' ? 'rotate-180' : ''}
              />
            </div>
            <span className="nss-display text-[14px] font-bold leading-tight text-[rgb(var(--text-rgb))] group-hover:text-[rgb(var(--gold-rgb))]">
              {t('categories.viewAll')}
            </span>
            <span className="nss-mono text-[10px] uppercase tracking-wider text-[rgba(var(--text-rgb),0.50)]">
              10+ Categories
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
