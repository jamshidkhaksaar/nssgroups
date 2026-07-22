import { LANGS, useI18n } from '@/i18n/i18n'

/** Compact mono language switcher: EN · RU · دری · پښتو */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n()
  return (
    <div className={`flex items-center gap-1 ${className}`} role="group" aria-label="Language">
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
  )
}
