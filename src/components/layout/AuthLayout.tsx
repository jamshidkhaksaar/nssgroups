import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '@/i18n/i18n';

interface AuthLayoutProps {
  children: ReactNode;
  accentColor?: 'amber' | 'blue' | 'emerald' | 'gold';
  badge?: string;
  sideHeadline?: string;
  sideSub?: string;
  sideIcon?: ReactNode;
}

const accentBgMap: Record<string, string> = {
  amber: 'from-amber-950/80 via-[rgba(14,10,30,0.9)] to-[rgba(14,10,30,0.95)]',
  blue: 'from-sky-950/80 via-[rgba(14,10,30,0.9)] to-[rgba(14,10,30,0.95)]',
  emerald: 'from-emerald-950/80 via-[rgba(14,10,30,0.9)] to-[rgba(14,10,30,0.95)]',
  gold: 'from-yellow-900/60 via-[rgba(14,10,30,0.9)] to-[rgba(14,10,30,0.95)]',
};

export default function AuthLayout({
  children,
  accentColor = 'gold',
  sideHeadline,
  sideSub,
  sideIcon,
}: AuthLayoutProps) {
  const { t } = useI18n();

  const overlayClass = accentBgMap[accentColor] ?? accentBgMap['gold'];

  // Default headline if none provided
  const headline = sideHeadline ?? t('auth.defaultHeadline');
  const sub = sideSub ?? t('auth.defaultSub');

  return (
    <div className="flex min-h-screen w-full bg-[var(--bg)] overflow-hidden">
      {/* Cinematic Image Side */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="./posters/auth_bg.jpg"
          alt={t('shared.authBackgroundAlt')}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            // Fallback to poster 1 if auth_bg.jpg doesn't exist
            (e.target as HTMLImageElement).src = './posters/1.jpg';
          }}
        />
        {/* Glassmorphism gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${overlayClass}`}
        />

        {/* Brand overlay */}
        <div className="absolute inset-0 flex flex-col p-12">
          <Link to="/" className="inline-flex w-fit items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <ArrowLeft size={18} />
            <span className="nss-mono text-xs tracking-[0.2em] uppercase">{t('nav.home')}</span>
          </Link>

          <div className="mt-auto">
            {sideIcon && <div>{sideIcon}</div>}
            <img src="./logo.png" alt={t('shared.logoAlt')} className="h-14 brightness-0 invert" />
            <h1 className="nss-display mt-8 text-4xl leading-tight text-white md:text-5xl lg:text-5xl whitespace-pre-line">
              {headline.split('\n').map((line, i) => (
                <span key={i}>
                  {i === 0 ? (
                    line
                  ) : (
                    <span className="text-[rgb(var(--gold-rgb))]">{line}</span>
                  )}
                  {i < headline.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="nss-mono mt-6 max-w-md text-sm leading-relaxed tracking-wider text-[rgba(255,255,255,0.7)] uppercase">
              {sub}
            </p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="relative flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 xl:px-24">
        {/* Mobile back button */}
        <Link
          to="/"
          className="absolute top-8 left-6 inline-flex items-center gap-2 text-[rgba(var(--text-rgb),0.6)] lg:hidden hover:text-[rgb(var(--gold-rgb))] transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="nss-mono text-xs tracking-[0.2em] uppercase">{t('nav.home')}</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
