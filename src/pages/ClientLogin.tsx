import { useNavigate, Link } from 'react-router';
import { useI18n } from '@/i18n/i18n';
import AuthLayout from '@/components/layout/AuthLayout';
import Reveal from '@/components/Reveal';
import { login } from '@/lib/auth';
import { usePortalStore } from '@/data/portalData';
import { Building2, LogIn, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function ClientLogin() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const store = usePortalStore();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const signInAsClient = (email: string, clientId?: string) => {
    const client = clientId ? store.clients.find((c) => c.id === clientId) : undefined;
    login('client', {
      name: client?.fullName ?? 'Portal Client',
      email,
      clientId: client?.id ?? store.clients[0]?.id,
    });
    navigate('/client-portal');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    setLoading(true);
    setTimeout(() => {
      signInAsClient(email);
    }, 1000);
  };

  return (
    <AuthLayout
      accentColor="blue"
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

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">
                {t('auth.email')} *
              </label>
              <input
                type="email"
                name="email"
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
                  aria-label={showPass ? t('auth.hidePassword') : t('auth.showPassword')}
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
