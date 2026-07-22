import { LANGS, useI18n } from '@/i18n/i18n'
import { ChevronDown } from 'lucide-react'

/** One compact selector keeps the full seven-language set out of the navbar flow. */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n()
  return (
    <div className={`relative ${className}`}>
      <select
        value={lang}
        onChange={(event) => setLang(event.target.value as typeof lang)}
        aria-label="Language"
        className="nss-mono h-8 w-[5.25rem] appearance-none border border-[rgba(var(--gold-rgb),0.3)] bg-[var(--bg)] ps-2 pe-6 text-[11px] tracking-wider text-[rgb(var(--text-rgb))] transition-colors hover:border-[rgba(var(--gold-rgb),0.65)] focus:outline-none focus:ring-1 focus:ring-[#e8c268]"
      >
        {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
      <ChevronDown
        aria-hidden="true"
        size={13}
        className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 text-[rgba(var(--text-rgb),0.6)]"
      />
    </div>
  )
}
