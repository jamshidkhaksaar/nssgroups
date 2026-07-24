import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ClientCategory } from '@/types/portal';
import { useI18n } from '@/i18n/i18n';
import { Building2, Mail, Lock, User, Phone, Globe, Shield, ArrowRight } from 'lucide-react';

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

export const ClientRegistration: React.FC<ClientRegistrationProps> = ({ onRegisterSubmit }) => {
  const { t } = useI18n();
  const [fullName, setFullName] = useState<string>('David Vance');
  const [companyName, setCompanyName] = useState<string>('UN World Food Programme (WFP)');
  const [email, setEmail] = useState<string>('procurement.kabul@wfp.org');
  const [phone, setPhone] = useState<string>('+93 70 123 4567');
  const [country, setCountry] = useState<string>('Afghanistan');
  const [category, setCategory] = useState<ClientCategory>('un_agency');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegisterSubmit({
      fullName,
      companyName,
      email,
      phone,
      country,
      category
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-md shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-slate-100 font-sora">
            {t('client.reg.title')}
          </CardTitle>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1">
            {t('client.reg.sub')}
          </p>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          {/* Social Auth Buttons */}
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-slate-800 bg-slate-950/70 hover:bg-slate-800 text-slate-200 text-xs gap-2 py-5"
                onClick={() => onRegisterSubmit({ fullName: 'Google User', companyName: 'Google Associated Corp', email: 'user@google-corp.com', phone: '+1 650 253 0000', country: 'United States', category: 'private' })}
              >
                <span className="font-bold text-amber-400">G</span> {t('client.reg.google')}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="border-slate-800 bg-slate-950/70 hover:bg-slate-800 text-slate-200 text-xs gap-2 py-5"
                onClick={() => onRegisterSubmit({ fullName: 'LinkedIn Executive', companyName: 'Global Shippers Inc', email: 'exec@globalshippers.com', phone: '+44 20 7946 0912', country: 'United Kingdom', category: 'private' })}
              >
                <span className="font-bold text-blue-400">in</span> {t('client.reg.linkedin')}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="border-slate-800 bg-slate-950/70 hover:bg-slate-800 text-slate-200 text-xs gap-2 py-5"
                onClick={() => onRegisterSubmit({ fullName: 'UN Logistics Officer', companyName: 'UN Humanitarian Fleet', email: 'humanitarian@un.org', phone: '+41 22 917 1234', country: 'Switzerland', category: 'un_agency' })}
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> {t('client.reg.sso')}
              </Button>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-800" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-3 text-slate-500 font-medium">{t('portal.client.reg.orRegisterWithEmail')}</span></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" /> {t('portal.client.reg.fullNameLabel')}
                </Label>
                <Input
                  required
                  placeholder={t('portal.client.reg.fullNamePlaceholder')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-slate-950/70 border-slate-800 text-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" /> {t('portal.client.reg.companyNameLabel')}
                </Label>
                <Input
                  required
                  placeholder={t('portal.client.reg.companyNamePlaceholder')}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="bg-slate-950/70 border-slate-800 text-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> {t('client.reg.email')}
                </Label>
                <Input
                  required
                  type="email"
                  placeholder={t('portal.client.reg.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-950/70 border-slate-800 text-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> {t('client.reg.password')}
                </Label>
                <Input
                  required
                  type="password"
                  value="••••••••••••"
                  readOnly
                  className="bg-slate-950/70 border-slate-800 text-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" /> {t('portal.client.reg.phoneLabel')}
                </Label>
                <Input
                  required
                  placeholder={t('portal.client.reg.phonePlaceholder')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-slate-950/70 border-slate-800 text-slate-200 text-sm"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-400" /> {t('portal.client.reg.countryLabel')}
                </Label>
                <Input
                  required
                  placeholder={t('portal.client.reg.countryPlaceholder')}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-slate-950/70 border-slate-800 text-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-400" /> {t('portal.client.reg.categoryLabel')}
                </Label>
                <Select value={category} onValueChange={(val) => setCategory(val as ClientCategory)}>
                  <SelectTrigger className="bg-slate-950/70 border-slate-800 text-slate-200 text-sm">
                    <SelectValue placeholder={t('portal.client.reg.selectCategoryPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                    <SelectItem value="un_agency">{t('portal.client.reg.categoryUn')}</SelectItem>
                    <SelectItem value="ngo">{t('portal.client.reg.categoryNgo')}</SelectItem>
                    <SelectItem value="private">{t('portal.client.reg.categoryPrivate')}</SelectItem>
                    <SelectItem value="government">{t('portal.client.reg.categoryGov')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-6 text-sm mt-4 shadow-lg shadow-amber-500/20"
            >
              {t('client.reg.submit')} <ArrowRight className="w-4 h-4 me-1.5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
