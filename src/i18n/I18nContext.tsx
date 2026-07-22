import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { en } from './translations/en'
import {
  LANGS,
  STORAGE_KEY,
  I18nContext,
  detectInitialLang,
  dictionaries,
  type Lang,
} from './i18n'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)

  const dir = LANGS.find((l) => l.code === lang)?.dir ?? 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang, dir])

  const setLang = useCallback((next: Lang) => setLangState(next), [])

  const t = useCallback(
    (key: keyof typeof en) => dictionaries[lang][key] ?? en[key] ?? key,
    [lang],
  )

  const value = useMemo(() => ({ lang, dir, setLang, t }), [lang, dir, setLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
