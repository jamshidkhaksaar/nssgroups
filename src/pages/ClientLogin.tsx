import { useNavigate, Link } from 'react-router';
import { useI18n } from '@/i18n/i18n';
import AuthLayout from '@/components/layout/AuthLayout';
import Reveal from '@/components/Reveal';
import { login } from '@/lib/auth';
import { usePortalStore } from '@/data/portalData';
import { Building2, LogIn, Eye, EyeOff, Mail, KeyRound, CheckCircle2, Copy, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ClientLogin() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const store = usePortalStore();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetEmail, setTargetEmail] = useState('');

  // 2FA OTP Login Step
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpCodeSent, setOtpCodeSent] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');

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
    setTargetEmail(email);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Generate 6-digit login OTP code sent from noreply@nssgroupint.com
      const { otp } = store.generateLoginOtp(email);
      setOtpCodeSent(otp);
      setIsOtpStep(true);

      toast.info(`Security Login Code sent to ${email} from noreply@nssgroupint.com`, {
        duration: 6000,
      });
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredOtp || enteredOtp.length < 6) {
      toast.error('Please enter the 6-digit login code sent to your email');
      return;
    }
    const isValid = store.verifyLoginOtp(targetEmail, enteredOtp);
    if (isValid || enteredOtp === otpCodeSent || enteredOtp === '123456') {
      toast.success('2FA Authentication Successful! Access Granted.');
      signInAsClient(targetEmail);
    } else {
      toast.error('Invalid login code. Check your email or use 123456');
    }
  };

  const handleResendOtp = () => {
    const { otp } = store.generateLoginOtp(targetEmail);
    setOtpCodeSent(otp);
    toast.success(`New 2FA login code sent from noreply@nssgroupint.com`);
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
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-6">
              <ShieldCheck size={14} />
              <span className="nss-mono tracking-wider">{isOtpStep ? '2FA SECURITY OTP' : t('auth.client.badge')}</span>
            </div>
            <h2 className="nss-display text-3xl font-bold tracking-tight text-[rgb(var(--text-rgb))] md:text-4xl">
              {isOtpStep ? 'Login Verification' : t('auth.client.title')}
            </h2>
            <p className="mt-3 text-sm text-[rgba(var(--text-rgb),0.6)]">
              {isOtpStep
                ? `Enter the 6-digit login code sent from noreply@nssgroupint.com to ${targetEmail}`
                : t('auth.client.sub')}
            </p>
          </div>

          {/* STEP 2: 2FA LOGIN CODE FORM */}
          {isOtpStep ? (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* Security Banner Notice */}
              <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-4 text-xs space-y-2 text-[rgb(var(--text-rgb))]">
                <div className="flex items-center justify-between font-mono text-[11px] text-sky-400">
                  <span className="flex items-center gap-1.5 font-bold"><Mail className="h-4 w-4" /> From: noreply@nssgroupint.com</span>
                  <span className="rounded bg-sky-500/20 px-2 py-0.5">SECURITY VERIFICATION</span>
                </div>
                <p>
                  A mandatory 2FA login code has been generated for client account <strong className="text-sky-400">{targetEmail}</strong>.
                </p>

                {/* OTP Demo Helper Badge */}
                <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-sky-500/30 bg-[var(--panel)] p-3">
                  <div>
                    <span className="nss-mono text-[10px] uppercase tracking-wider text-[rgba(var(--text-rgb),0.5)] block">Your Login Security Code</span>
                    <span className="nss-mono text-lg font-bold tracking-widest text-sky-400">{otpCodeSent}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEnteredOtp(otpCodeSent);
                      navigator.clipboard?.writeText(otpCodeSent);
                      toast.success('Login code copied & filled!');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-md border border-sky-500/30 px-2.5 py-1.5 text-xs font-semibold text-sky-400 hover:bg-sky-500/10 active:scale-95 transition-all"
                  >
                    <Copy className="h-3.5 w-3.5" /> Auto Fill Code
                  </button>
                </div>
              </div>

              {/* OTP Input */}
              <div>
                <label className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase flex items-center gap-1.5">
                  <KeyRound size={14} className="text-sky-400" /> Enter 6-Digit Code *
                </label>
                <input
                  required
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                  className="h-14 w-full rounded-sm border border-[rgba(var(--text-rgb),0.15)] bg-[var(--panel)] px-4 text-center nss-mono text-xl font-bold tracking-[0.3em] text-[rgb(var(--text-rgb))] outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30"
                  placeholder="e.g. 392810"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOtpStep(false)}
                  className="w-1/2 rounded-sm border border-[rgba(var(--text-rgb),0.2)] bg-transparent py-3.5 text-xs font-semibold text-[rgba(var(--text-rgb),0.7)] hover:bg-[rgba(var(--text-rgb),0.05)]"
                >
                  Back to Sign In
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="w-1/2 rounded-sm border border-sky-500/30 bg-transparent py-3.5 text-xs font-semibold text-sky-400 hover:bg-sky-500/10"
                >
                  Resend Code
                </button>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-sky-600 hover:bg-sky-500 text-white py-4 text-sm font-bold uppercase tracking-wider transition-colors active:scale-98"
              >
                Verify Code & Sign In <CheckCircle2 size={16} />
              </button>
            </form>
          ) : (
            /* STEP 1: EMAIL & PASSWORD FORM */
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
                    Send Login Verification Code
                    <LogIn size={16} />
                  </>
                )}
              </button>
            </form>
          )}

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

