import { Link } from 'react-router'
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'
import SocialIcon from '@/components/SocialIcon'
import { EMAIL_1, EMAIL_2, FACEBOOK, INSTAGRAM, PHONE_1, PHONE_2, WHATSAPP } from '@/data/content'

const NAV: { to: string; key: TranslationKey }[] = [
  { to: '/', key: 'nav.home' },
  { to: '/about', key: 'nav.about' },
  { to: '/services', key: 'nav.services' },
  { to: '/fleet', key: 'nav.fleet' },
  { to: '/network', key: 'nav.network' },
  { to: '/contact', key: 'nav.contact' },
]

const CREDS: TranslationKey[] = [
  'cred.license',
  'cred.reg',
  'cred.tin',
  'cred.vpin',
  'cred.ungm',
  'cred.acci',
  'cred.members',
]

function ColumnHead({ label }: { label: string }) {
  return (
    <h3>
      <span className="nss-mono text-[11px] tracking-[0.24em] text-[rgb(var(--gold-rgb))] uppercase">
        {label}
      </span>
      <span className="nss-hairline mt-3 block w-10" />
    </h3>
  )
}

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-[rgba(var(--gold-rgb),0.15)] bg-[var(--bg-deep)]">
      {/* ── main columns ── */}
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="nss-logo-badge" style={{ height: 68, width: 68 }}>
                <img src="./logo.png" alt="NSS" className="object-contain" style={{ height: 52, width: 52 }} />
              </span>
              <div className="leading-tight">
                <div className="nss-display text-base text-[rgb(var(--text-rgb))]">{t('nav.brand')}</div>
                <div className="nss-mono mt-1 text-[10px] text-[rgba(var(--text-rgb),0.55)]">{t('nav.brandSub')}</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-[rgba(var(--text-rgb),0.55)]">
              {t('footer.blurb')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="inline-flex items-center gap-2.5 rounded-sm border border-[rgba(var(--gold-rgb),0.3)] px-4 py-2.5 text-[13px] font-semibold text-[rgb(var(--gold-rgb))] transition-all hover:-translate-y-0.5 hover:border-[rgba(var(--gold-rgb),0.6)]"
              >
                <SocialIcon name="whatsapp" size={15} />
                WhatsApp
                <ArrowUpRight size={13} />
              </a>
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(var(--gold-rgb),0.3)] text-[rgb(var(--gold-rgb))] transition-all hover:-translate-y-0.5 hover:border-[rgba(var(--gold-rgb),0.7)]"
              >
                <SocialIcon name="facebook" size={15} />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(var(--gold-rgb),0.3)] text-[rgb(var(--gold-rgb))] transition-all hover:-translate-y-0.5 hover:border-[rgba(var(--gold-rgb),0.7)]"
              >
                <SocialIcon name="instagram" size={15} />
              </a>
            </div>
          </div>

          {/* pages */}
          <div className="lg:col-span-2">
            <ColumnHead label={t('footer.pages')} />
            <ul className="mt-6 space-y-1">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group flex items-center gap-2 py-1.5 text-[14px] text-[rgba(var(--text-rgb),0.60)] transition-colors hover:text-[rgb(var(--gold-rgb))]"
                  >
                    <span className="h-px w-0 bg-[rgb(var(--gold-rgb))] transition-all duration-300 group-hover:w-4" />
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="lg:col-span-3">
            <ColumnHead label={t('footer.contact')} />
            <ul className="mt-6 space-y-3.5 text-[14px]">
              <li className="flex items-center gap-3">
                <Phone size={14} className="shrink-0 text-[rgb(var(--gold-rgb))]" />
                <span>
                  <a href={`tel:${PHONE_1.replace(/\s/g, '')}`} dir="ltr" className="text-[rgba(var(--text-rgb),0.65)] transition-colors hover:text-[rgb(var(--gold-rgb))]">
                    {PHONE_1}
                  </a>
                  <span className="mx-2 text-[rgba(var(--text-rgb),0.30)]">·</span>
                  <a href={`tel:${PHONE_2.replace(/\s/g, '')}`} dir="ltr" className="text-[rgba(var(--text-rgb),0.65)] transition-colors hover:text-[rgb(var(--gold-rgb))]">
                    {PHONE_2}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="shrink-0 text-[rgb(var(--gold-rgb))]" />
                <a href={`mailto:${EMAIL_1}`} className="text-[rgba(var(--text-rgb),0.65)] transition-colors hover:text-[rgb(var(--gold-rgb))]">
                  {EMAIL_1}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="shrink-0 text-[rgb(var(--gold-rgb))]" />
                <a href={`mailto:${EMAIL_2}`} className="text-[rgba(var(--text-rgb),0.65)] transition-colors hover:text-[rgb(var(--gold-rgb))]">
                  {EMAIL_2}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-1 shrink-0 text-[rgb(var(--gold-rgb))]" />
                <div className="flex flex-col">
                  <span className="text-[rgba(var(--text-rgb),0.75)] font-medium">{t('contact.hq')}</span>
                  <span className="mt-1 text-[12px] leading-snug text-[rgba(var(--text-rgb),0.55)]">
                    <strong className="text-[rgb(var(--gold-rgb))]">{t('contact.uzbekOfficeTitle')}:</strong> {t('contact.uzbekOfficeAddr')}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* credentials */}
          <div className="lg:col-span-3">
            <ColumnHead label={t('footer.creds')} />
            <ul className="mt-6 space-y-2.5">
              {CREDS.map((k) => (
                <li key={k} className="flex items-start gap-2.5">
                  <ShieldCheck size={13} className="mt-1 shrink-0 text-[rgba(var(--gold-rgb),0.7)]" />
                  <span className="nss-mono text-[12px] leading-relaxed text-[rgba(var(--text-rgb),0.55)]">
                    {t(k)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── bottom bar ── */}
      <div className="border-t border-[rgba(var(--gold-rgb),0.10)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12">
          <p className="nss-mono text-[12px] text-[rgba(var(--text-rgb),0.55)]">
            © {new Date().getFullYear()} NSS {t('nav.brandSub')} — {t('footer.rights')}
          </p>
          <p className="nss-mono text-[12px] text-[rgba(var(--gold-rgb),0.65)]">{t('shared.divisions')}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t('footer.backToTop')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(var(--gold-rgb),0.3)] text-[rgb(var(--gold-rgb))] transition-all hover:-translate-y-0.5 hover:border-[rgba(var(--gold-rgb),0.7)]"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}
