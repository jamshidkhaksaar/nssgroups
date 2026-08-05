import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Toaster } from 'sonner'
import Navbar from './Navbar'
import Footer from './Footer'
import CtaBand from '@/sections/home/CtaBand'
import Seo from '@/components/Seo'
import { useI18n } from '@/i18n/i18n'
import { ROUTE_SEO, BRAND } from '@/lib/routeSeo'

export default function Layout() {
  const { pathname } = useLocation()
  const { t } = useI18n()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  // Static-route SEO is driven centrally here; /marketplace and product pages
  // render their own <Seo> with content-derived titles.
  const entry = ROUTE_SEO[pathname]

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[rgb(var(--text-rgb))]">
      {pathname === '/' && (
        <Seo
          title={`${BRAND} — ${t('hero.h1a')} ${t('hero.h1b')}`}
          description={t('hero.sub')}
          path="/"
        />
      )}
      {entry && (
        <Seo
          title={`${t(entry.titleKey)} — ${BRAND}`}
          description={t(entry.descKey)}
          path={pathname}
        />
      )}
      <Navbar />
      <Outlet />
      {pathname !== '/contact' && <CtaBand />}
      <Footer />
      <Toaster theme="dark" position="bottom-center" />
    </div>
  )
}
