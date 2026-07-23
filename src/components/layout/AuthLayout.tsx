import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t } = useI18n()
  
  
  return (
    <div className="flex min-h-screen w-full bg-[var(--bg)] overflow-hidden">
      {/* Cinematic Image Side */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="./posters/auth_bg.jpg"
          alt="Auth Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Glassmorphism gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(14,10,30,0.85)] to-[rgba(14,10,30,0.2)] backdrop-blur-[2px]" />
        
        {/* Brand overlay */}
        <div className="absolute inset-0 flex flex-col p-12">
          <Link to="/" className="inline-flex w-fit items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <ArrowLeft size={18} />
            <span className="nss-mono text-xs tracking-[0.2em] uppercase">{t('nav.home')}</span>
          </Link>
          
          <div className="mt-auto">
            <img src="./logo.png" alt="NSS Logo" className="h-14 brightness-0 invert" />
            <h1 className="nss-display mt-8 text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
              YOUR CARGO,<br />
              <span className="text-[rgb(var(--gold-rgb))]">OUR RESPONSIBILITY.</span>
            </h1>
            <p className="nss-mono mt-6 max-w-md text-sm leading-relaxed tracking-wider text-[rgba(255,255,255,0.7)] uppercase">
              Join the region's leading transit and logistics network.
            </p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="relative flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 xl:px-24">
        {/* Mobile back button */}
        <Link to="/" className="absolute top-8 left-6 inline-flex items-center gap-2 text-[rgba(var(--text-rgb),0.6)] lg:hidden hover:text-[rgb(var(--gold-rgb))] transition-colors">
          <ArrowLeft size={18} />
          <span className="nss-mono text-xs tracking-[0.2em] uppercase">{t('nav.home')}</span>
        </Link>
        {children}
      </div>
    </div>
  )
}
