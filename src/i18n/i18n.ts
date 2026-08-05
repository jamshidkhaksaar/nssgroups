import { createContext, useContext } from 'react'
import { en, type TranslationKey } from './translations/en'
import { ru } from './translations/ru'
import { fa } from './translations/fa'
import { ps } from './translations/ps'
import { uz } from './translations/uz'
import { ar } from './translations/ar'
import { zh } from './translations/zh'

export type Lang = 'en' | 'ru' | 'fa' | 'ps' | 'uz' | 'ar' | 'zh'

export const LANGS: { code: Lang; label: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'ru', label: 'RU', dir: 'ltr' },
  { code: 'fa', label: 'دری', dir: 'rtl' },
  { code: 'ps', label: 'پښتو', dir: 'rtl' },
  { code: 'uz', label: 'O‘Z', dir: 'ltr' },
  { code: 'ar', label: 'ع', dir: 'rtl' },
  { code: 'zh', label: '中文', dir: 'ltr' },
]

export const dictionaries: Record<Lang, Record<TranslationKey, string>> = { en, ru, fa, ps, uz, ar, zh }

export const STORAGE_KEY = 'nss-lang'

export interface I18nValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  setLang: (lang: Lang) => void
  t: (key: TranslationKey) => string
}

export const I18nContext = createContext<I18nValue | null>(null)

const LANG_CODES = LANGS.map((l) => l.code)

function isLang(value: string | null): value is Lang {
  return value != null && (LANG_CODES as string[]).includes(value)
}

export function detectInitialLang(): Lang {
  // A ?lang= query param wins so hreflang alternates (…?lang=xx) and shared
  // links open in the intended language; the choice is then persisted below.
  const param = new URLSearchParams(window.location.search).get('lang')
  if (isLang(param)) return param
  const stored = localStorage.getItem(STORAGE_KEY)
  if (isLang(stored)) return stored
  return 'en'
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
