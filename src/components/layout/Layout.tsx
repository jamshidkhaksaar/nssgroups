import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Toaster } from 'sonner'
import Navbar from './Navbar'
import Footer from './Footer'
import CtaBand from '@/sections/home/CtaBand'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[rgb(var(--text-rgb))]">
      <Navbar />
      <Outlet />
      {pathname !== '/contact' && <CtaBand />}
      <Footer />
      <Toaster theme="dark" position="bottom-center" />
    </div>
  )
}
