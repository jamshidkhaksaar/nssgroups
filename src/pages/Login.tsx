import { Link, useNavigate } from 'react-router'
import { useI18n } from '@/i18n/i18n'
import AuthLayout from '@/components/layout/AuthLayout'
import Reveal from '@/components/Reveal'
import { login } from '@/lib/auth'
import { LogIn } from 'lucide-react'

export default function Login() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    // Frontend-only demo: create a session and route to the admin portal.
    login('admin', { name: 'Samir Alemyar', email })
    navigate('/admin')
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <Reveal>
          <div className="mb-10">
            <h2 className="nss-display text-3xl font-bold tracking-tight text-[rgb(var(--text-rgb))] md:text-4xl">
              {t('auth.login.title')}
            </h2>
            <p className="mt-3 text-sm text-[rgba(var(--text-rgb),0.6)]">
              {t('auth.login.sub')}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">
                {t('auth.email')} *
              </label>
              <input 
                type="email" 
                name="email"
                required 
                className="h-12 w-full rounded-sm border border-[rgba(var(--gold-rgb),0.2)] bg-[var(--panel)] px-4 text-sm text-[rgb(var(--text-rgb))] outline-none transition-colors focus:border-[rgb(var(--gold-rgb))] focus:ring-1 focus:ring-[rgba(var(--gold-rgb),0.5)]" 
                placeholder="name@company.com"
              />
            </div>
            
            <div>
              <label className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">
                {t('auth.password')} *
              </label>
              <input 
                type="password" 
                required 
                className="h-12 w-full rounded-sm border border-[rgba(var(--gold-rgb),0.2)] bg-[var(--panel)] px-4 text-sm text-[rgb(var(--text-rgb))] outline-none transition-colors focus:border-[rgb(var(--gold-rgb))] focus:ring-1 focus:ring-[rgba(var(--gold-rgb),0.5)]" 
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              className="nss-btn-primary flex w-full items-center justify-center gap-2 rounded-sm py-4 text-sm font-bold uppercase tracking-wider"
            >
              {t('auth.submitLogin')}
              <LogIn size={16} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[rgba(var(--text-rgb),0.6)]">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="font-semibold text-[rgb(var(--gold-rgb))] hover:underline">
              {t('auth.registerLink')}
            </Link>
          </p>
        </Reveal>
      </div>
    </AuthLayout>
  )
}
