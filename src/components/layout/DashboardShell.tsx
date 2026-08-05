import { useEffect, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ArrowLeft, LogOut, Search, Bell, PanelLeftClose, PanelLeftOpen,
  Sun, Moon, ChevronDown, Settings, RotateCcw, Home, LayoutDashboard,
} from 'lucide-react';
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
} from '@/components/ui/command';
import { useI18n } from '@/i18n/i18n';
import { useTheme } from '@/theme/theme';
import { resetPortalData } from '@/data/portalData';

export interface ShellNavItem {
  id: string;
  label: string;
  icon: typeof Search;
  badge?: number;
}

export interface ShellNotification {
  id: string;
  title: string;
  description?: string;
  tone?: 'amber' | 'rose' | 'emerald' | 'gold';
}

interface DashboardShellProps {
  children: ReactNode;
  accentColor?: 'amber' | 'sky' | 'emerald';
  portalLabel: string;
  navItems?: ShellNavItem[];
  activeNavId?: string;
  onNavChange?: (id: string) => void;
  sidebarFooter?: ReactNode;
  portalIcon?: ReactNode;
  notificationsCount?: number;
  /** Actionable alert-center items (delayed orders, pending KYC, etc.) */
  notifications?: ShellNotification[];
  userName?: string;
  userRole?: string;
}

const accentMap = {
  amber: { pill: 'bg-amber-500/10 border-amber-500/25 text-amber-400' },
  sky: { pill: 'bg-sky-500/10 border-sky-500/25 text-sky-400' },
  emerald: { pill: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' },
};

export default function DashboardShell({
  children, accentColor = 'amber', portalLabel,
  navItems, activeNavId, onNavChange, sidebarFooter, portalIcon,
  notificationsCount = 0, notifications = [], userName = 'Samir Alemyar', userRole = 'Administrator',
}: DashboardShellProps) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { theme, toggle: toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const accent = accentMap[accentColor];
  const hasSidebar = Boolean(navItems?.length);

  // Cmd/Ctrl + K toggles the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const runNav = (id: string) => {
    setPaletteOpen(false);
    onNavChange?.(id);
  };

  const go = (to: string) => {
    setPaletteOpen(false);
    navigate(to);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[rgb(var(--text-rgb))]">
      <div className="flex">
        {/* Sidebar */}
        {hasSidebar && (
          <aside className={`sticky top-0 hidden h-screen shrink-0 flex-col border-e border-[rgba(var(--gold-rgb),0.10)] bg-[rgba(var(--bg-rgb),0.60)] backdrop-blur-xl transition-all duration-300 lg:flex ${sidebarOpen ? 'w-64' : 'w-16'}`}>
            <div className="flex items-center gap-3 border-b border-[rgba(var(--gold-rgb),0.10)] px-4 py-4">
              <Link to="/" className="flex items-center gap-2">
                <img src="./logo.png" alt={t('shared.logoAlt')} className="h-8 w-8 shrink-0 object-contain" />
                {sidebarOpen && (
                  <span className="nss-display whitespace-nowrap text-sm tracking-wide text-[rgb(var(--text-rgb))]">
                    NSS <span className="text-[rgb(var(--gold-rgb))]">GROUP</span>
                  </span>
                )}
              </Link>
            </div>
            {sidebarOpen && (
              <div className="px-4 pt-4">
                <div className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[10px] font-semibold nss-mono tracking-wider ${accent.pill}`}>
                  {portalIcon}
                  <span className="truncate">{portalLabel}</span>
                </div>
              </div>
            )}
            <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
              {navItems!.map((item) => {
                const isActive = activeNavId === item.id;
                const Icon = item.icon;
                return (
                  <button key={item.id} onClick={() => onNavChange?.(item.id)} title={!sidebarOpen ? item.label : undefined}
                    className={[
                      'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm font-medium transition-all duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.45)]',
                      isActive ? 'bg-[rgba(var(--gold-rgb),0.12)] text-[rgb(var(--gold-rgb))]' : 'text-[rgba(var(--text-rgb),0.6)] hover:bg-[rgba(var(--gold-rgb),0.06)] hover:text-[rgb(var(--text-rgb))]',
                      !sidebarOpen ? 'justify-center' : '',
                    ].join(' ')}>
                    <Icon className="h-4 w-4 shrink-0" />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                    {sidebarOpen && item.badge !== undefined && item.badge > 0 && (
                      <span className="ms-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[rgb(var(--gold-rgb))] px-1.5 text-[10px] font-bold text-[#1d1233]">{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </nav>
            {sidebarOpen && sidebarFooter && <div className="px-2 pb-2">{sidebarFooter}</div>}
            <button onClick={() => setSidebarOpen((v) => !v)} className="flex items-center gap-2 border-t border-[rgba(var(--gold-rgb),0.10)] px-4 py-3 text-xs text-[rgba(var(--text-rgb),0.45)] transition-colors hover:text-[rgb(var(--gold-rgb))]">
              {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
              {sidebarOpen && <span className="nss-mono uppercase tracking-wider">Collapse</span>}
            </button>
          </aside>
        )}
        {/* Main column */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-[rgba(var(--gold-rgb),0.12)] bg-[rgba(var(--bg-rgb),0.92)] px-4 py-2.5 backdrop-blur-md sm:px-6">
            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <img src="./logo.png" alt={t('shared.logoAlt')} className="h-7 w-7 object-contain" />
            </Link>
            {hasSidebar && (
              <button onClick={() => setSidebarOpen((v) => !v)} className="rounded-lg p-1.5 text-[rgba(var(--text-rgb),0.5)] transition-colors hover:bg-[rgba(var(--gold-rgb),0.08)] hover:text-[rgb(var(--gold-rgb))] lg:hidden">
                {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
              </button>
            )}
            <Link to="/" className="nss-mono hidden items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[rgba(var(--text-rgb),0.45)] transition-colors hover:text-[rgba(var(--text-rgb),0.8)] md:flex">
              <ArrowLeft size={12} />
              <span>{t('dashboard.backToSite')}</span>
            </Link>
            <button
              onClick={() => setPaletteOpen(true)}
              className="relative ms-auto hidden items-center overflow-hidden rounded-lg border border-[rgba(var(--gold-rgb),0.15)] bg-[rgba(var(--bg-rgb),0.5)] py-1.5 pe-3 ps-9 text-start text-xs text-[rgba(var(--text-rgb),0.45)] transition-all duration-200 hover:border-[rgba(var(--gold-rgb),0.4)] hover:text-[rgba(var(--text-rgb),0.7)] md:flex lg:w-56"
              title="Search (Ctrl/Cmd+K)"
            >
              <Search className="pointer-events-none absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[rgba(var(--text-rgb),0.35)]" />
              <span className="truncate">Search…</span>
              <kbd className="ms-auto hidden rounded border border-[var(--card-border)] px-1.5 py-0.5 text-[9px] text-[rgba(var(--text-rgb),0.4)] lg:inline">⌘K</kbd>
            </button>
            <button onClick={toggleTheme} className="rounded-lg p-2 text-[rgba(var(--text-rgb),0.5)] transition-colors hover:bg-[rgba(var(--gold-rgb),0.08)] hover:text-[rgb(var(--gold-rgb))]" title={theme === 'dark' ? 'Light' : 'Dark'}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="relative">
              <button onClick={() => setNotifOpen((v) => !v)} className="relative rounded-lg p-2 text-[rgba(var(--text-rgb),0.5)] transition-colors hover:bg-[rgba(var(--gold-rgb),0.08)] hover:text-[rgb(var(--gold-rgb))]">
                <Bell className="h-4 w-4" />
                {notificationsCount > 0 && <span className="absolute end-1.5 top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[rgb(var(--gold-rgb))] px-1 text-[9px] font-bold text-[#1d1233]">{notificationsCount}</span>}
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute end-0 top-full z-50 mt-1 w-80 overflow-hidden rounded-xl border border-[rgba(var(--gold-rgb),0.15)] bg-[var(--panel)] shadow-xl">
                    <div className="flex items-center justify-between border-b border-[var(--card-border)] px-4 py-2.5">
                      <span className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.45)]">Alerts</span>
                      <span className="nss-mono rounded-full bg-[rgba(var(--gold-rgb),0.12)] px-2 py-0.5 text-[10px] font-bold text-[rgb(var(--gold-rgb))]">{notifications.length}</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="px-4 py-8 text-center text-xs text-[rgba(var(--text-rgb),0.45)]">No pending alerts</p>
                      ) : (
                        notifications.map((n) => (
                          <div key={n.id} className="flex items-start gap-3 border-b border-[var(--card-border)] px-4 py-3 last:border-0">
                            <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                              n.tone === 'rose' ? 'bg-rose-500' : n.tone === 'emerald' ? 'bg-emerald-500' : n.tone === 'amber' ? 'bg-amber-500' : 'bg-[rgb(var(--gold-rgb))]'
                            }`} />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-[rgb(var(--text-rgb))]">{n.title}</p>
                              {n.description && <p className="mt-0.5 text-[11px] text-[rgba(var(--text-rgb),0.55)]">{n.description}</p>}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="relative">
              <button onClick={() => setUserMenuOpen((v) => !v)} className="flex items-center gap-2 rounded-lg border border-[rgba(var(--gold-rgb),0.15)] bg-[rgba(var(--bg-rgb),0.4)] py-1 pe-2 ps-1.5 transition-colors hover:border-[rgba(var(--gold-rgb),0.35)]">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(var(--gold-rgb),0.15)] text-xs font-bold text-[rgb(var(--gold-rgb))]">{userName.charAt(0)}</div>
                <div className="hidden text-start sm:block">
                  <div className="text-xs font-semibold leading-tight text-[rgb(var(--text-rgb))]">{userName}</div>
                  <div className="nss-mono text-[9px] uppercase tracking-wider text-[rgba(var(--text-rgb),0.45)]">{userRole}</div>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-[rgba(var(--text-rgb),0.4)]" />
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute end-0 top-full z-50 mt-1 w-52 overflow-hidden rounded-xl border border-[rgba(var(--gold-rgb),0.15)] bg-[var(--panel)] py-1 shadow-xl">
                    <div className="border-b border-[var(--card-border)] px-4 py-2.5">
                      <div className="text-sm font-semibold text-[rgb(var(--text-rgb))]">{userName}</div>
                      <div className="nss-mono text-[10px] uppercase tracking-wider text-[rgba(var(--text-rgb),0.45)]">{userRole}</div>
                    </div>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[rgba(var(--text-rgb),0.7)] transition-colors hover:bg-[rgba(var(--gold-rgb),0.06)] hover:text-[rgb(var(--gold-rgb))]" onClick={() => setUserMenuOpen(false)}>
                      <Settings className="h-4 w-4" /> Settings
                    </button>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[rgba(var(--text-rgb),0.7)] transition-colors hover:bg-[rgba(var(--gold-rgb),0.06)] hover:text-[rgb(var(--gold-rgb))]" onClick={() => { setUserMenuOpen(false); resetPortalData(); }}>
                      <RotateCcw className="h-4 w-4" /> Reset demo data
                    </button>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[rgba(var(--text-rgb),0.7)] transition-colors hover:bg-[rgba(var(--gold-rgb),0.06)] hover:text-[rgb(var(--gold-rgb))]" onClick={() => { setUserMenuOpen(false); navigate('/'); }}>
                      <LogOut className="h-4 w-4" /> {t('dashboard.signOut')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
            <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen} title="Quick navigation" description="Jump to a section or command">
              <CommandInput placeholder="Type a command or search…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem onSelect={() => go('/')}>
                    <Home className="h-4 w-4" /> Home
                    <CommandShortcut>↵</CommandShortcut>
                  </CommandItem>
                  <CommandItem onSelect={() => go('/admin')}>
                    <LayoutDashboard className="h-4 w-4" /> Admin Control Room
                  </CommandItem>
                  <CommandItem onSelect={() => go('/client-portal')}>
                    <LayoutDashboard className="h-4 w-4" /> Client Portal
                  </CommandItem>
                  <CommandItem onSelect={() => go('/partner-portal')}>
                    <LayoutDashboard className="h-4 w-4" /> Partner Portal
                  </CommandItem>
                </CommandGroup>
                {navItems && navItems.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup heading={portalLabel}>
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <CommandItem key={item.id} onSelect={() => runNav(item.id)}>
                            <Icon className="h-4 w-4" /> {item.label}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </>
                )}
                <CommandSeparator />
                <CommandGroup heading="System">
                  <CommandItem onSelect={() => { setPaletteOpen(false); resetPortalData(); }}>
                    <RotateCcw className="h-4 w-4" /> Reset demo data
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>

        </div>
      </div>
    </div>
  );
}
