import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useI18n } from '@/i18n/i18n';

interface DashboardShellProps {
  children: ReactNode;
  accentColor?: 'amber' | 'sky' | 'emerald';
  /** Label shown in the top bar pill */
  portalLabel: string;
}

const accentMap = {
  amber: {
    pill: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
    logoutHover: 'hover:text-amber-400',
  },
  sky: {
    pill: 'bg-sky-500/10 border-sky-500/25 text-sky-400',
    logoutHover: 'hover:text-sky-400',
  },
  emerald: {
    pill: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
    logoutHover: 'hover:text-emerald-400',
  },
};

export default function DashboardShell({
  children,
  accentColor = 'amber',
  portalLabel,
}: DashboardShellProps) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const accent = accentMap[accentColor];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[rgb(var(--text-rgb))] flex flex-col">
      {/* ── Minimal Dashboard Top Bar ── */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.12)] bg-[rgba(var(--bg-rgb),0.95)] px-4 py-3 backdrop-blur-md sm:px-6">
        {/* Left: Logo + Back */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-[rgba(var(--text-rgb),0.55)] transition-colors hover:text-[rgb(var(--gold-rgb))]"
          >
            <img src="./logo.png" alt={t('shared.logoAlt')} className="h-8 w-8 object-contain" />
            <span className="nss-display hidden text-sm tracking-wide text-[rgb(var(--text-rgb))] sm:block">
              NSS <span className="text-[rgb(var(--gold-rgb))]">GROUP</span>
            </span>
          </Link>

          <span className="hidden h-5 w-px bg-[rgba(var(--gold-rgb),0.2)] sm:block" />

          <Link
            to="/"
            className="nss-mono flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[rgba(var(--text-rgb),0.45)] transition-colors hover:text-[rgba(var(--text-rgb),0.8)]"
          >
            <ArrowLeft size={12} />
            <span className="hidden sm:inline">{t('dashboard.backToSite')}</span>
          </Link>
        </div>

        {/* Center: Portal label */}
        <div className={`hidden items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold nss-mono tracking-wider sm:flex ${accent.pill}`}>
          {portalLabel}
        </div>

        {/* Right: Logout */}
        <button
          onClick={handleLogout}
          className={`nss-mono flex items-center gap-1.5 rounded-md border border-[rgba(var(--text-rgb),0.1)] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[rgba(var(--text-rgb),0.5)] transition-colors ${accent.logoutHover} hover:border-[rgba(var(--text-rgb),0.2)]`}
        >
          <LogOut size={13} />
          <span className="hidden sm:inline">{t('dashboard.signOut')}</span>
        </button>
      </header>

      {/* ── Dashboard Content ── */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
