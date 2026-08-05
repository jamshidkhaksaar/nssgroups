import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ClientCategory } from '@/types/portal';
import { useI18n } from '@/i18n/i18n';
import { Building2, Mail, Lock, User, Phone, Globe, Shield, ArrowRight } from 'lucide-react';
import { z } from 'zod';

interface ClientRegistrationProps {
  onRegisterSubmit: (clientData: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    category: ClientCategory;
  }) => void;
}

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  companyName: z.string().min(2, 'Enter your organization name'),
  email: z.email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  country: z.string().min(2, 'Enter your country'),
  category: z.enum(['un_agency', 'ngo', 'private', 'government']),
});

type RegistrationErrors = Partial<Record<keyof typeof registrationSchema.shape, string>>;

const inputClass = [
  'bg-[rgba(var(--bg-rgb),0.5)] border border-[rgba(var(--gold-rgb),0.2)]',
  'text-sm text-[rgb(var(--text-rgb))] placeholder:text-[rgba(var(--text-rgb),0.35)]',
  'transition-colors duration-200',
  'focus:border-[rgba(var(--gold-rgb),0.6)] focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.3)] focus-visible:outline-none',
].join(' ');

const labelClass = 'nss-mono flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[rgba(var(--text-rgb),0.6)]';

const socialBtnClass = [
  'inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--card-border)]',
  'bg-[rgba(var(--bg-rgb),0.4)] px-3 py-3 text-xs font-medium text-[rgba(var(--text-rgb),0.85)]',
  'transition-all duration-200 hover:border-[rgba(var(--gold-rgb),0.45)] hover:bg-[rgba(var(--gold-rgb),0.06)] hover:text-[rgb(var(--text-rgb))]',
  'active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.5)]',
].join(' ');

export const ClientRegistration: React.FC<ClientRegistrationProps> = ({ onRegisterSubmit }) => {
  const { t } = useI18n();
  const [fullName, setFullName] = useState<string>('David Vance');
  const [companyName, setCompanyName] = useState<string>('UN World Food Programme (WFP)');
  const [email, setEmail] = useState<string>('procurement.kabul@wfp.org');
  const [phone, setPhone] = useState<string>('+93 70 123 4567');
  const [country, setCountry] = useState<string>('Afghanistan');
  const [category, setCategory] = useState<ClientCategory>('un_agency');
  const [errors, setErrors] = useState<RegistrationErrors>({});

  const errCls = 'mt-1 text-[11px] font-medium text-rose-500';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = registrationSchema.safeParse({ fullName, companyName, email, phone, country, category });
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
    onRegisterSubmit(parsed.data);
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
            {t('client.reg.title')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-[rgba(var(--text-rgb),0.6)]">
            {t('client.reg.sub')}
          </p>
        </div>

        <div className="relative z-10 space-y-6 px-6 pb-8 pt-6 sm:px-10">
          {/* Social Auth Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                className={socialBtnClass}
                onClick={() => onRegisterSubmit({ fullName: 'Google User', companyName: 'Google Associated Corp', email: 'user@google-corp.com', phone: '+1 650 253 0000', country: 'United States', category: 'private' })}
              >
                <span className="font-bold text-[rgb(var(--gold-rgb))]">G</span> {t('client.reg.google')}
              </button>

              <button
                type="button"
                className={socialBtnClass}
                onClick={() => onRegisterSubmit({ fullName: 'LinkedIn Executive', companyName: 'Global Shippers Inc', email: 'exec@globalshippers.com', phone: '+44 20 7946 0912', country: 'United Kingdom', category: 'private' })}
              >
                <span className="font-bold text-[rgb(var(--gold-rgb))]">in</span> {t('client.reg.linkedin')}
              </button>

              <button
                type="button"
                className={socialBtnClass}
                onClick={() => onRegisterSubmit({ fullName: 'UN Logistics Officer', companyName: 'UN Humanitarian Fleet', email: 'humanitarian@un.org', phone: '+41 22 917 1234', country: 'Switzerland', category: 'un_agency' })}
              >
                <Shield className="h-3.5 w-3.5 text-emerald-400 [html[data-theme=light]_&]:text-emerald-700" /> {t('client.reg.sso')}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-[rgba(var(--gold-rgb),0.14)]" />
              <span className="nss-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.45)]">{t('portal.client.reg.orRegisterWithEmail')}</span>
              <span className="h-px flex-1 bg-[rgba(var(--gold-rgb),0.14)]" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className={labelClass}>
                  <User className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.reg.fullNameLabel')}
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
                  <Building2 className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.reg.companyNameLabel')}
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
                  <Mail className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('client.reg.email')}
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
                  <Lock className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('client.reg.password')}
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
                  <Phone className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.reg.phoneLabel')}
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
                  <Globe className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.reg.countryLabel')}
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
                  <Globe className="h-3.5 w-3.5 text-[rgb(var(--gold-rgb))]" /> {t('portal.client.reg.categoryLabel')}
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
            </div>

            <button
              type="submit"
              className="nss-btn-primary mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.6)] active:scale-[0.98]"
            >
              {t('client.reg.submit')} <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
