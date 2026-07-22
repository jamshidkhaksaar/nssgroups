import { LANGS, useI18n } from '@/i18n/i18n'

/** Compact switcher with a mobile selector for all seven launch locales. */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n()
  return (
    <div className={className}>
      <div className="hidden items-center gap-1 xl:flex" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`nss-mono px-2 py-1 text-[12px] tracking-widest transition-colors ${
            lang === l.code
              ? 'bg-[#e8c268] text-[#1d1233]'
              : 'text-[rgba(var(--text-rgb),0.55)] hover:text-[rgb(var(--gold-rgb))]'
          }`}
        >
          {l.label}
        </button>
      ))}
      </div>
      <select
        value={lang}
        onChange={(event) => setLang(event.target.value as typeof lang)}
        aria-label="Language"
        className="nss-mono h-8 max-w-20 border border-[rgba(var(--gold-rgb),0.3)] bg-[var(--bg)] px-2 text-[11px] tracking-wider text-[rgb(var(--text-rgb))] xl:hidden"
      >
        {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
    </div>
  )
}
