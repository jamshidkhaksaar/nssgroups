import { useNavigate, Link } from 'react-router';
import { useI18n } from '@/i18n/i18n';
import AuthLayout from '@/components/layout/AuthLayout';
import Reveal from '@/components/Reveal';
import { Handshake, LogIn, Star, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function PartnerLogin() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/partner-portal');
    }, 1000);
  };

  return (
    <AuthLayout
      accentColor="emerald"
      badge={t('auth.partner.badge')}
      sideHeadline={t('auth.partner.sideHeadline')}
      sideSub={t('auth.partner.sideSub')}
      sideIcon={<Handshake size={48} className="text-emerald-400 mb-6 opacity-80" />}
    >
      <div className="w-full max-w-md mx-auto">
        <Reveal>
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
              <Handshake size={14} />
              <span className="nss-mono tracking-wider">{t('auth.partner.badge')}</span>
            </div>
            <h2 className="nss-display text-3xl font-bold tracking-tight text-[rgb(var(--text-rgb))] md:text-4xl">
              {t('auth.partner.title')}
            </h2>
            <p className="mt-3 text-sm text-[rgba(var(--text-rgb),0.6)]">
              {t('auth.partner.sub')}
            </p>
          </div>

          {/* XP Info Card */}
          <div className="mb-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/15">
                <Star size={18} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp size={12} />
                  {t('auth.partner.xpBadge')}
                </p>
                <p className="mt-1 text-xs text-[rgba(var(--text-rgb),0.55)] leading-relaxed">
                  {t('auth.partner.xpDesc')}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">
                {t('auth.email')} *
              </label>
              <input
                type="email"
                required
                className="h-12 w-full rounded-sm border border-[rgba(var(--text-rgb),0.12)] bg-[var(--panel)] px-4 text-sm text-[rgb(var(--text-rgb))] outline-none transition-colors focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30"
                placeholder="partner@company.com"
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
                  className="h-12 w-full rounded-sm border border-[rgba(var(--text-rgb),0.12)] bg-[var(--panel)] px-4 pe-12 text-sm text-[rgb(var(--text-rgb))] outline-none transition-colors focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30"
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
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white py-4 text-sm font-bold uppercase tracking-wider transition-colors disabled:opacity-60"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  {t('auth.partner.submitBtn')}
                  <LogIn size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[rgba(var(--text-rgb),0.6)]">
            {t('auth.partner.registerPrompt')}{' '}
            <Link to="/partner-portal" className="font-semibold text-emerald-400 hover:underline">
              {t('auth.partner.registerLink')}
            </Link>
          </p>
        </Reveal>
      </div>
    </AuthLayout>
  );
}
