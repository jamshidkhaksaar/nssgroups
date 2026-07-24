import { useNavigate } from 'react-router';
import { useI18n } from '@/i18n/i18n';
import AuthLayout from '@/components/layout/AuthLayout';
import Reveal from '@/components/Reveal';
import { ShieldCheck, LogIn, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function AdminLogin() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth delay then navigate to admin portal
    setTimeout(() => {
      setLoading(false);
      navigate('/admin');
    }, 1000);
  };

  return (
    <AuthLayout
      accentColor="amber"
      badge={t('auth.admin.badge')}
      sideHeadline={t('auth.admin.sideHeadline')}
      sideSub={t('auth.admin.sideSub')}
      sideIcon={<ShieldCheck size={48} className="text-amber-400 mb-6 opacity-80" />}
    >
      <div className="w-full max-w-md mx-auto">
        <Reveal>
          <div className="mb-10">
            {/* Icon badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-6">
              <ShieldCheck size={14} />
              <span className="nss-mono tracking-wider">{t('auth.admin.badge')}</span>
            </div>
            <h2 className="nss-display text-3xl font-bold tracking-tight text-[rgb(var(--text-rgb))] md:text-4xl">
              {t('auth.admin.title')}
            </h2>
            <p className="mt-3 text-sm text-[rgba(var(--text-rgb),0.6)]">
              {t('auth.admin.sub')}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">
                {t('auth.email')} *
              </label>
              <input
                type="email"
                required
                className="h-12 w-full rounded-sm border border-[rgba(var(--gold-rgb),0.2)] bg-[var(--panel)] px-4 text-sm text-[rgb(var(--text-rgb))] outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30"
                placeholder="admin@nss.af"
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
                  className="h-12 w-full rounded-sm border border-[rgba(var(--gold-rgb),0.2)] bg-[var(--panel)] px-4 pe-12 text-sm text-[rgb(var(--text-rgb))] outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30"
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

            {/* Security notice */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/15">
              <Lock size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[rgba(var(--text-rgb),0.55)] leading-relaxed">
                This is a restricted area. Unauthorized access attempts are logged and reported.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 text-sm font-bold uppercase tracking-wider transition-colors disabled:opacity-60"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
              ) : (
                <>
                  {t('auth.admin.submitBtn')}
                  <LogIn size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-[rgba(var(--text-rgb),0.4)]">
            For access issues contact your NSS IT administrator.
          </p>
        </Reveal>
      </div>
    </AuthLayout>
  );
}
