import { useNavigate, Link } from 'react-router';
import { useI18n } from '@/i18n/i18n';
import AuthLayout from '@/components/layout/AuthLayout';
import Reveal from '@/components/Reveal';
import { Building2, LogIn, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function ClientLogin() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/client-portal');
    }, 1000);
  };

  const handleSocial = () => {
    navigate('/client-portal');
  };

  return (
    <AuthLayout
      accentColor="blue"
      badge={t('auth.client.badge')}
      sideHeadline={t('auth.client.sideHeadline')}
      sideSub={t('auth.client.sideSub')}
      sideIcon={<Building2 size={48} className="text-sky-400 mb-6 opacity-80" />}
    >
      <div className="w-full max-w-md mx-auto">
        <Reveal>
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-6">
              <Building2 size={14} />
              <span className="nss-mono tracking-wider">{t('auth.client.badge')}</span>
            </div>
            <h2 className="nss-display text-3xl font-bold tracking-tight text-[rgb(var(--text-rgb))] md:text-4xl">
              {t('auth.client.title')}
            </h2>
            <p className="mt-3 text-sm text-[rgba(var(--text-rgb),0.6)]">
              {t('auth.client.sub')}
            </p>
          </div>

          {/* Social logins */}
          <div className="mb-6 space-y-3">
            <p className="nss-mono text-[10px] uppercase tracking-wider text-[rgba(var(--text-rgb),0.5)] mb-3">
              {t('auth.client.socialPrompt')}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {/* Google */}
              <button
                type="button"
                onClick={handleSocial}
                className="flex h-12 items-center justify-center gap-2 rounded-sm border border-[rgba(var(--text-rgb),0.12)] bg-[var(--panel)] transition-all hover:border-sky-400/40 hover:bg-sky-500/5 active:scale-95"
                title="Continue with Google"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-xs font-medium text-[rgba(var(--text-rgb),0.7)]">Google</span>
              </button>
              {/* Apple */}
              <button
                type="button"
                onClick={handleSocial}
                className="flex h-12 items-center justify-center gap-2 rounded-sm border border-[rgba(var(--text-rgb),0.12)] bg-[var(--panel)] transition-all hover:border-sky-400/40 hover:bg-sky-500/5 active:scale-95"
                title="Continue with Apple"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[rgb(var(--text-rgb))]">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.5.82 3.12.82.65 0 1.98-.92 3.57-.78 1.54.13 2.92.83 3.73 2.05-3.21 1.93-2.68 5.76.43 6.95-1.03 2.82-2.58 4.14-2.85 3.93zm-4.98-13.4c.48-1.49-.33-3.14-1.84-3.69-.47 1.52.49 3.16 1.84 3.69z"/>
                </svg>
                <span className="text-xs font-medium text-[rgba(var(--text-rgb),0.7)]">Apple</span>
              </button>
              {/* Facebook */}
              <button
                type="button"
                onClick={handleSocial}
                className="flex h-12 items-center justify-center gap-2 rounded-sm border border-[rgba(var(--text-rgb),0.12)] bg-[var(--panel)] transition-all hover:border-sky-400/40 hover:bg-sky-500/5 active:scale-95"
                title="Continue with Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-xs font-medium text-[rgba(var(--text-rgb),0.7)]">Facebook</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[rgba(var(--text-rgb),0.1)]" />
            <span className="nss-mono text-[10px] uppercase tracking-wider text-[rgba(var(--text-rgb),0.5)]">
              {t('auth.or')}
            </span>
            <div className="h-px flex-1 bg-[rgba(var(--text-rgb),0.1)]" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">
                {t('auth.email')} *
              </label>
              <input
                type="email"
                required
                className="h-12 w-full rounded-sm border border-[rgba(var(--text-rgb),0.12)] bg-[var(--panel)] px-4 text-sm text-[rgb(var(--text-rgb))] outline-none transition-colors focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30"
                placeholder="procurement@organization.org"
              />
            </div>

            <div>
              <label className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">
                {t('auth.password')} *
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  className="h-12 w-full rounded-sm border border-[rgba(var(--text-rgb),0.12)] bg-[var(--panel)] px-4 pe-12 text-sm text-[rgb(var(--text-rgb))] outline-none transition-colors focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute inset-y-0 end-0 px-4 flex items-center text-[rgba(var(--text-rgb),0.4)] hover:text-[rgba(var(--text-rgb),0.8)] transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-sky-600 hover:bg-sky-500 text-white py-4 text-sm font-bold uppercase tracking-wider transition-colors disabled:opacity-60"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  {t('auth.client.submitBtn')}
                  <LogIn size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[rgba(var(--text-rgb),0.6)]">
            {t('auth.client.registerPrompt')}{' '}
            <Link to="/client-portal" className="font-semibold text-sky-400 hover:underline">
              {t('auth.client.registerLink')}
            </Link>
          </p>
        </Reveal>
      </div>
    </AuthLayout>
  );
}
