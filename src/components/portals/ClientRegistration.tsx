import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ClientCategory } from '@/types/portal';
import { useI18n } from '@/i18n/i18n';
import { Building2, Mail, Lock, User, Phone, Globe, ShieldCheck, ArrowRight, KeyRound, CheckCircle2, Copy, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

interface ClientRegistrationProps {
  onRegisterSubmit: (clientData: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    category: ClientCategory;
    licenseNumber: string;
    tinNumber: string;
    representativeIdNumber: string;
  }) => void;
}

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  companyName: z.string().min(2, 'Enter your organization name'),
  email: z.email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  country: z.string().min(2, 'Enter your country'),
  category: z.enum(['un_agency', 'ngo', 'private', 'government']),
  licenseNumber: z.string().min(3, 'Enter commercial license number'),
  tinNumber: z.string().min(3, 'Enter tax identification number (TIN)'),
  representativeIdNumber: z.string().min(3, 'Enter authorized representative ID/Passport'),
});

type RegistrationErrors = Partial<Record<keyof typeof registrationSchema.shape, string>>;

const inputClass = [
  'bg-[rgba(var(--bg-rgb),0.5)] border border-[rgba(var(--gold-rgb),0.2)]',
  'text-sm text-[rgb(var(--text-rgb))] placeholder:text-[rgba(var(--text-rgb),0.35)]',
  'transition-colors duration-200',
  'focus:border-[rgba(var(--gold-rgb),0.6)] focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.3)] focus-visible:outline-none',
].join(' ');

const labelClass = 'nss-mono flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[rgba(var(--text-rgb),0.6)]';

export const ClientRegistration: React.FC<ClientRegistrationProps> = ({ onRegisterSubmit }) => {
  const { t } = useI18n();

  // Form State
  const [fullName, setFullName] = useState<string>('David Vance');
  const [companyName, setCompanyName] = useState<string>('UN World Food Programme (WFP)');
  const [email, setEmail] = useState<string>('procurement.kabul@wfp.org');
  const [phone, setPhone] = useState<string>('+93 70 123 4567');
  const [country, setCountry] = useState<string>('Afghanistan');
  const [category, setCategory] = useState<ClientCategory>('un_agency');
  const [licenseNumber, setLicenseNumber] = useState<string>('AFG-LIC-2026-8809');
  const [tinNumber, setTinNumber] = useState<string>('TIN-90887123-AF');
  const [representativeIdNumber, setRepresentativeIdNumber] = useState<string>('ID-AFG-882109');
  const [errors, setErrors] = useState<RegistrationErrors>({});

  // Activation OTP Step State
  const [isActivationPending, setIsActivationPending] = useState<boolean>(false);
  const [activationCodeSent, setActivationCodeSent] = useState<string>('');
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [tempClientData, setTempClientData] = useState<{
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    category: ClientCategory;
    licenseNumber: string;
    tinNumber: string;
    representativeIdNumber: string;
  } | null>(null);

  const errCls = 'mt-1 text-[11px] font-medium text-rose-500';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = registrationSchema.safeParse({
      fullName,
      companyName,
      email,
      phone,
      country,
      category,
      licenseNumber,
      tinNumber,
      representativeIdNumber,
    });
    if (!parsed.success) {
      const fe: RegistrationErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === 'string') fe[key as keyof RegistrationErrors] = issue.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});

    // Generate 6-digit Activation Code sent from noreply@nssgroupint.com
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setActivationCodeSent(generatedCode);
    setTempClientData(parsed.data);
    setIsActivationPending(true);

    toast.info(`Account Activation Code sent to ${parsed.data.email} from noreply@nssgroupint.com`, {
      duration: 6000,
    });
  };

  const handleVerifyActivation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredCode || enteredCode.length < 6) {
      toast.error('Please enter the 6-digit activation code sent to your email');
      return;
    }
    if (enteredCode === activationCodeSent || enteredCode === '123456') {
      toast.success('Account Activated! Proceeding to Mandatory Verification');
      if (tempClientData) {
        onRegisterSubmit(tempClientData);
      }
    } else {
      toast.error('Invalid activation code. Please check your email or use 123456');
    }
  };

  const handleResendCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setActivationCodeSent(newCode);
    toast.success(`New activation code resent from noreply@nssgroupint.com`);
  };

  return (
    <div className="nss-fade max-w-2xl mx-auto space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[linear-gradient(150deg,var(--panel),var(--bg-deep))]">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(var(--gold-rgb),0.6),transparent)]" />
        <div className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(var(--gold-rgb),0.1),transparent_65%)]" />

        {/* Header */}
        <div className="relative z-10 px-6 pt-8 text-center sm:px-10">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(var(--gold-rgb),0.35)] bg-[rgba(var(--gold-rgb),0.1)] text-[rgb(var(--gold-rgb))]">
            <Building2 className="h-6 w-6" />
          </div>
          <h2 className="nss-display text-xl sm:text-2xl text-[rgb(var(--text-rgb))]">
            {isActivationPending ? 'Account Activation Verification' : t('client.reg.title')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-[rgba(var(--text-rgb),0.6)]">
            {isActivationPending
              ? `We sent a 6-digit activation code from noreply@nssgroupint.com to ${email}.`
              : t('client.reg.sub')}
          </p>
        </div>

        <div className="relative z-10 space-y-6 px-6 pb-8 pt-6 sm:px-10">
          {/* STEP 2: ACTIVATION OTP CODE VERIFICATION */}
          {isActivationPending ? (
            <form onSubmit={handleVerifyActivation} className="space-y-5">
              {/* Email Banner Notice */}
              <div className="rounded-xl border border-[rgba(var(--gold-rgb),0.3)] bg-[rgba(var(--gold-rgb),0.06)] p-4 text-xs space-y-2 text-[rgb(var(--text-rgb))]">
                <div className="flex items-center justify-between font-mono text-[11px] text-[rgb(var(--gold-rgb))]">
                  <span className="flex items-center gap-1.5 font-bold"><Mail className="h-4 w-4" /> From: noreply@nssgroupint.com</span>
                  <span className="rounded bg-[rgba(var(--gold-rgb),0.15)] px-2 py-0.5">SECURITY OTP</span>
                </div>
                <p>
                  To complete your account registration, enter the 6-digit activation code sent to <strong className="text-[rgb(var(--gold-rgb))]">{email}</strong>. Admin has also been notified at <strong className="text-[rgb(var(--gold-rgb))]">info@nssgroupint.com</strong>.
                </p>

                {/* Code Demo Helper Badge */}
                <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-[rgba(var(--gold-rgb),0.4)] bg-[var(--panel)] p-3">
                  <div>
                    <span className="nss-mono text-[10px] uppercase tracking-wider text-[rgba(var(--text-rgb),0.5)] block">Generated Activation Code</span>
                    <span className="nss-mono text-lg font-bold tracking-widest text-[rgb(var(--gold-rgb))]">{activationCodeSent}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEnteredCode(activationCodeSent);
                      navigator.clipboard?.writeText(activationCodeSent);
                      toast.success('Activation code copied & filled!');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(var(--gold-rgb),0.3)] px-2.5 py-1.5 text-xs font-semibold text-[rgb(var(--gold-rgb))] hover:bg-[rgba(var(--gold-rgb),0.1)] active:scale-95 transition-all"
                  >
                    <Copy className="h-3.5 w-3.5" /> Auto Fill Code
                  </button>
                </div>
              </div>

              {/* OTP Input */}
              <div className="space-y-2">
                <Label className={labelClass}>
                  <KeyRound className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> 6-Digit Activation Code *
                </Label>
                <Input
                  required
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 582910"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value.replace(/\D/g, ''))}
                  className={`${inputClass} text-center nss-mono text-xl font-bold tracking-[0.3em]`}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsActivationPending(false)}
                  className="w-1/3 rounded-lg border border-[rgba(var(--gold-rgb),0.2)] bg-transparent py-3 text-xs font-semibold text-[rgba(var(--text-rgb),0.7)] hover:bg-[rgba(var(--gold-rgb),0.06)]"
                >
                  Edit Data
                </button>
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="w-1/3 rounded-lg border border-[rgba(var(--gold-rgb),0.3)] bg-transparent py-3 text-xs font-semibold text-[rgb(var(--gold-rgb))] hover:bg-[rgba(var(--gold-rgb),0.08)]"
                >
                  Resend Email
                </button>
                <button
                  type="submit"
                  className="nss-btn-primary w-1/3 inline-flex items-center justify-center gap-1.5 rounded-lg py-3 text-xs font-bold uppercase tracking-wider"
                >
                  Activate <CheckCircle2 className="h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            /* STEP 1: INITIAL REGISTRATION FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className={labelClass}>
                    <User className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.reg.fullNameLabel')} *
                  </Label>
                  <Input
                    required
                    placeholder={t('portal.client.reg.fullNamePlaceholder')}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputClass}
                  />
                  {errors.fullName && <p className={errCls}>{errors.fullName}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className={labelClass}>
                    <Building2 className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.reg.companyNameLabel')} *
                  </Label>
                  <Input
                    required
                    placeholder={t('portal.client.reg.companyNamePlaceholder')}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={inputClass}
                  />
                  {errors.companyName && <p className={errCls}>{errors.companyName}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className={labelClass}>
                    <Mail className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('client.reg.email')} (Receives Activation Code) *
                  </Label>
                  <Input
                    required
                    type="email"
                    placeholder={t('portal.client.reg.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                  {errors.email && <p className={errCls}>{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className={labelClass}>
                    <Lock className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('client.reg.password')} *
                  </Label>
                  <Input
                    required
                    type="password"
                    value="••••••••••••"
                    readOnly
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className={labelClass}>
                    <Phone className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.reg.phoneLabel')} *
                  </Label>
                  <Input
                    required
                    placeholder={t('portal.client.reg.phonePlaceholder')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    dir="ltr"
                  />
                  {errors.phone && <p className={errCls}>{errors.phone}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className={labelClass}>
                    <Globe className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.reg.countryLabel')} *
                  </Label>
                  <Input
                    required
                    placeholder={t('portal.client.reg.countryPlaceholder')}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={inputClass}
                  />
                  {errors.country && <p className={errCls}>{errors.country}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className={labelClass}>
                    <Globe className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.reg.categoryLabel')} *
                  </Label>
                  <Select value={category} onValueChange={(val) => setCategory(val as ClientCategory)}>
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder={t('portal.client.reg.selectCategoryPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="border border-[var(--card-border)] bg-[var(--panel)] text-[rgb(var(--text-rgb))]">
                      <SelectItem value="un_agency">{t('portal.client.reg.categoryUn')}</SelectItem>
                      <SelectItem value="ngo">{t('portal.client.reg.categoryNgo')}</SelectItem>
                      <SelectItem value="private">{t('portal.client.reg.categoryPrivate')}</SelectItem>
                      <SelectItem value="government">{t('portal.client.reg.categoryGov')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className={labelClass}>
                    <ShieldCheck className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> Commercial License Number *
                  </Label>
                  <Input
                    required
                    placeholder="e.g. AFG-LIC-2026-8809"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className={inputClass}
                  />
                  {errors.licenseNumber && <p className={errCls}>{errors.licenseNumber}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className={labelClass}>
                    <ShieldCheck className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> Tax Identification Number (TIN) *
                  </Label>
                  <Input
                    required
                    placeholder="e.g. TIN-90887123-AF"
                    value={tinNumber}
                    onChange={(e) => setTinNumber(e.target.value)}
                    className={inputClass}
                  />
                  {errors.tinNumber && <p className={errCls}>{errors.tinNumber}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className={labelClass}>
                    <User className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> Representative ID / Passport No. *
                  </Label>
                  <Input
                    required
                    placeholder="e.g. ID-AFG-882109"
                    value={representativeIdNumber}
                    onChange={(e) => setRepresentativeIdNumber(e.target.value)}
                    className={inputClass}
                  />
                  {errors.representativeIdNumber && <p className={errCls}>{errors.representativeIdNumber}</p>}
                </div>
              </div>

              {/* Security info note */}
              <div className="rounded-lg border border-[rgba(var(--gold-rgb),0.2)] bg-[rgba(var(--bg-rgb),0.3)] p-3 text-[11px] text-[rgba(var(--text-rgb),0.65)] flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[rgb(var(--gold-rgb))] shrink-0 mt-0.5" />
                <span>
                  Upon submission, an activation code will be dispatched from <strong>noreply@nssgroupint.com</strong> to your business email. NSS Admin (<strong>info@nssgroupint.com</strong>) will also be notified of your application.
                </span>
              </div>

              <button
                type="submit"
                className="nss-btn-primary mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.6)] active:scale-[0.98]"
              >
                Send Account Activation Code <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

