import { Link } from 'react-router'
import { Truck, Train, Plane, Ship, ShieldCheck, MapPin, Warehouse, Calculator } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'

interface ServiceCard {
  nameKey: TranslationKey
  icon: typeof Truck
  to: string
  poster: string
}

const SERVICES: ServiceCard[] = [
  { nameKey: 'servicesSection.truck',       icon: Truck,       to: '/booking',  poster: './card_images/row2/Truck Booking.png'  },
  { nameKey: 'servicesSection.railway',     icon: Train,       to: '/booking',  poster: './card_images/row2/Railway Booking.png'  },
  { nameKey: 'servicesSection.air',         icon: Plane,       to: '/booking',  poster: './card_images/row2/Air Cargo Booking.png'  },
  { nameKey: 'servicesSection.sea',         icon: Ship,        to: '/booking',  poster: './card_images/row2/Sea Freight Booking.png'  },
  { nameKey: 'servicesSection.customs',     icon: ShieldCheck, to: '/services', poster: './card_images/row2/Customs Clearance.png'  },
  { nameKey: 'servicesSection.tracking',    icon: MapPin,      to: '/tracking', poster: './card_images/row2/Shipment Tracking.png'  },
  { nameKey: 'servicesSection.warehousing', icon: Warehouse,   to: '/services', poster: './card_images/row2/Warehousing.png'  },
  { nameKey: 'servicesSection.calculator',  icon: Calculator,  to: '/booking',  poster: './card_images/row2/Freight Calculator.png' },
]

export default function LogisticsServiceGrid() {
  const { t } = useI18n()

  return (
    <section className="bg-[var(--bg)] py-8 border-t border-[rgba(var(--gold-rgb),0.1)]">
      <div className="w-full px-4 md:px-6">
        {/* Section label */}
        <div className="mb-6 flex items-center gap-3">
          <span className="block h-5 w-[3px] rounded-full bg-[rgb(var(--gold-rgb))]" />
          <h2 className="nss-display text-[15px] font-bold text-[rgb(var(--text-rgb))]">
            {t('servicesSection.heading')}
          </h2>
        </div>

        {/* 3D perspective container — cards centered */}
        <div
          className="flex items-center justify-start xl:justify-center gap-4 overflow-x-auto pb-4 scrollbar-none"
          style={{ perspective: '1000px' }}
        >
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <Link
                key={s.nameKey}
                to={s.to}
                id={`service-card-${s.nameKey.replace(/\./g, '-')}`}
                className="group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(var(--gold-rgb),0.22)] bg-gradient-to-b from-[rgba(var(--gold-rgb),0.15)] to-[rgba(var(--gold-rgb),0.02)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
                style={{
                  width: 210,
                  height: 250,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease, border-color 0.25s ease',
                  boxShadow: '0 8px 32px var(--shadow)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'rotateY(-8deg) rotateX(4deg) translateY(-8px) scale(1.02)'
                  el.style.boxShadow = '6px 15px 40px var(--shadow), 0 0 25px rgba(var(--gold-rgb),0.2)'
                  el.style.borderColor = 'rgba(var(--gold-rgb),0.80)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0) scale(1)'
                  el.style.boxShadow = '0 8px 32px var(--shadow)'
                  el.style.borderColor = 'rgba(var(--gold-rgb),0.3)'
                }}
              >
                {/* Full-bleed poster image — no gradient */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={s.poster}
                    alt={t(s.nameKey)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Top: icon badge */}
                <div className="relative z-10 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(var(--gold-rgb),0.50)] bg-[var(--card-label)] text-[rgb(var(--gold-rgb))] backdrop-blur-sm transition-transform group-hover:scale-110">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                </div>

                {/* Bottom: frosted label band */}
                <div className="relative z-10 bg-[var(--card-label)] px-3 py-3 backdrop-blur-sm border-t border-[rgba(var(--gold-rgb),0.1)]">
                  <h3 className="nss-display block text-[13px] font-bold leading-tight text-[rgb(var(--text-rgb))] transition-colors group-hover:text-[rgb(var(--gold-rgb))]">
                    {t(s.nameKey)}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
