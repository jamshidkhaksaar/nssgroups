import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  CORE_SERVICES,
  EMAIL_1,
  EMAIL_2,
  OFFICES,
  PHONE_1,
  PHONE_2,
  WHATSAPP,
} from '@/data/content'

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(6),
  service: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  message: z.string().min(5),
})

type FormValues = z.infer<typeof schema>

const fieldClass =
  'border-[rgba(var(--gold-rgb),0.20)] bg-[rgba(var(--text-rgb),0.05)] text-[rgb(var(--text-rgb))] placeholder:text-[rgba(var(--text-rgb),0.50)] focus-visible:border-[rgba(var(--gold-rgb),0.60)] focus-visible:ring-[rgba(var(--gold-rgb),0.20)]'

export default function Contact() {
  const { t } = useI18n()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = (v: FormValues) => {
    const subject = `Quote request — ${v.service} (${v.from} → ${v.to})`
    const body = [
      `Name: ${v.name}`,
      `Company: ${v.company || '—'}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone}`,
      `Service: ${v.service}`,
      `Route: ${v.from} → ${v.to}`,
      '',
      v.message,
    ].join('\n')
    toast.info(t('contact.sending'))
    const anchor = document.createElement('a')
    anchor.href = `mailto:${EMAIL_2}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    anchor.click()
    setTimeout(() => toast.success(t('contact.sent')), 600)
  }

  const labelClass = 'nss-mono mb-2 block text-[12px] tracking-[0.18em] text-[rgba(var(--text-rgb),0.60)] uppercase'
  const errClass = 'mt-1 text-[12px] text-[rgb(var(--gold-rgb))]'

  return (
    <main className="bg-[var(--bg)]">
      <PageHeader tagKey="contact.tag" headingKey="contact.heading" subKey="contact.sub" />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-14 lg:grid-cols-5">
          {/* form */}
          <Reveal className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="nss-card p-7 md:p-10">
              <h2 className="nss-display text-2xl">{t('contact.formTitle')}</h2>
              <p className="mt-2 text-[13px] text-[rgba(var(--text-rgb),0.55)]">{t('contact.required')}</p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    {t('contact.name')} *
                  </label>
                  <Input id="name" placeholder={t('contact.namePh')} className={fieldClass} {...register('name')} />
                  {errors.name && <p className={errClass}>{t('contact.name')}</p>}
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>
                    {t('contact.company')}
                  </label>
                  <Input id="company" placeholder={t('contact.companyPh')} className={fieldClass} {...register('company')} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    {t('contact.email')} *
                  </label>
                  <Input id="email" type="email" dir="ltr" placeholder={t('contact.emailPh')} className={fieldClass} {...register('email')} />
                  {errors.email && <p className={errClass}>{t('contact.email')}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    {t('contact.phone')} *
                  </label>
                  <Input id="phone" dir="ltr" placeholder={t('contact.phonePh')} className={fieldClass} {...register('phone')} />
                  {errors.phone && <p className={errClass}>{t('contact.phone')}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="service" className={labelClass}>
                    {t('contact.service')} *
                  </label>
                  <select
                    id="service"
                    className={`h-9 w-full rounded-md border px-3 text-sm ${fieldClass} bg-[var(--bg)]`}
                    {...register('service')}
                  >
                    {CORE_SERVICES.map((s) => (
                      <option key={s.nameKey} value={t(s.nameKey)}>
                        {t(s.nameKey)}
                      </option>
                    ))}
                    <option value={t('services.vi.title')}>{t('services.vi.title')}</option>
                    <option value={t('services.lpg.title')}>{t('services.lpg.title')}</option>
                    <option value={t('services.pvc.title')}>{t('services.pvc.title')}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="from" className={labelClass}>
                    {t('contact.from')} *
                  </label>
                  <Input id="from" placeholder={t('contact.fromPh')} className={fieldClass} {...register('from')} />
                  {errors.from && <p className={errClass}>{t('contact.from')}</p>}
                </div>
                <div>
                  <label htmlFor="to" className={labelClass}>
                    {t('contact.to')} *
                  </label>
                  <Input id="to" placeholder={t('contact.toPh')} className={fieldClass} {...register('to')} />
                  {errors.to && <p className={errClass}>{t('contact.to')}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelClass}>
                    {t('contact.message')} *
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder={t('contact.messagePh')}
                    className={fieldClass}
                    {...register('message')}
                  />
                  {errors.message && <p className={errClass}>{t('contact.message')}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="nss-btn-primary mt-8 rounded-sm px-8 py-3.5 text-sm font-bold"
              >
                {t('contact.submit')}
              </button>
            </form>
          </Reveal>

          {/* info sidebar */}
          <div className="lg:col-span-2">
            <Reveal delay={100}>
              <p className="nss-section-tag">{t('contact.infoTag')}</p>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-4">
                  <Phone size={16} className="mt-1 shrink-0 text-[rgb(var(--gold-rgb))]" />
                  <div>
                    <a href={`tel:${PHONE_1.replace(/\s/g, '')}`} dir="ltr" className="block text-sm hover:text-[rgb(var(--gold-rgb))]">
                      {PHONE_1}
                    </a>
                    <a href={`tel:${PHONE_2.replace(/\s/g, '')}`} dir="ltr" className="mt-1 block text-sm hover:text-[rgb(var(--gold-rgb))]">
                      {PHONE_2}
                    </a>
                    <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-1 block text-sm text-[rgba(var(--gold-rgb),0.80)] hover:text-[rgb(var(--gold-rgb))]">
                      WhatsApp →
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail size={16} className="mt-1 shrink-0 text-[rgb(var(--gold-rgb))]" />
                  <div>
                    <a href={`mailto:${EMAIL_1}`} className="block text-sm hover:text-[rgb(var(--gold-rgb))]">{EMAIL_1}</a>
                    <a href={`mailto:${EMAIL_2}`} className="mt-1 block text-sm hover:text-[rgb(var(--gold-rgb))]">{EMAIL_2}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={16} className="mt-1 shrink-0 text-[rgb(var(--gold-rgb))]" />
                  <p className="text-sm text-[rgba(var(--text-rgb),0.70)]">{t('contact.hq')}</p>
                </li>
                <li className="flex items-start gap-4">
                  <Clock size={16} className="mt-1 shrink-0 text-[rgb(var(--gold-rgb))]" />
                  <p className="text-sm text-[rgba(var(--text-rgb),0.70)]">{t('contact.available')}</p>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <p className="nss-section-tag mt-12">{t('contact.officesTag')}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {OFFICES.map((o) => (
                  <div key={o.name} className="nss-card p-4">
                    <p className="nss-display text-sm">{o.name}</p>
                    <p className="nss-mono mt-1 text-[10px] tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)] uppercase">
                      ↔ {o.border}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
