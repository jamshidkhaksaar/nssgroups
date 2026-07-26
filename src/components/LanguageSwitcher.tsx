import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { LANGS, useI18n } from '@/i18n/i18n'
import type { Lang } from '@/i18n/i18n'

const FLAGS: Record<Lang, string> = {
  en: '🇬🇧',
  ru: '🇷🇺',
  fa: '🇦🇫',
  ps: '🇦🇫',
  uz: '🇺🇿',
  ar: '🇸🇦',
  zh: '🇨🇳',
}

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger button — compact flag + chevron */}
      <button
        id="lang-switcher-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="nss-mono flex h-8 items-center justify-center gap-1 rounded-full border border-[rgba(var(--gold-rgb),0.25)] bg-[rgba(var(--gold-rgb),0.06)] px-2.5 text-[11px] tracking-wide text-[rgba(var(--text-rgb),0.80)] transition-all hover:border-[rgba(var(--gold-rgb),0.55)] hover:text-[rgb(var(--gold-rgb))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c268]"
      >
        <span className="text-[16px] leading-none">{FLAGS[lang]}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          aria-label={t('shared.languageSelect')}
          className="absolute end-0 top-[calc(100%+6px)] z-[60] min-w-[140px] overflow-hidden rounded-xl border border-[rgba(var(--gold-rgb),0.20)] bg-[rgba(var(--bg-rgb),0.97)] shadow-xl backdrop-blur-xl"
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={lang === l.code}
              onClick={() => { setLang(l.code); setOpen(false) }}
              className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-start transition-colors ${
                lang === l.code
                  ? 'bg-[rgba(var(--gold-rgb),0.15)] text-[rgb(var(--gold-rgb))]'
                  : 'text-[rgba(var(--text-rgb),0.80)] hover:bg-[rgba(var(--gold-rgb),0.08)] hover:text-[rgb(var(--text-rgb))]'
              }`}
            >
              <span className="text-[18px] leading-none">{FLAGS[l.code]}</span>
              <span className="nss-mono text-[12px] tracking-wide">{l.label}</span>
              {lang === l.code && (
                <span className="ms-auto h-1.5 w-1.5 rounded-full bg-[rgb(var(--gold-rgb))]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
