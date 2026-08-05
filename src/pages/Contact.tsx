import { useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle2 } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  CORE_SERVICES,
  EMAIL_1,
  EMAIL_2,
  FACEBOOK,
  INSTAGRAM,
  OFFICES,
  PHONE_1,
  PHONE_2,
  WHATSAPP,
} from '@/data/content'
import {
  ORIGIN_KEYS,
  findCatalogProduct,
  localizedProductName,
} from '@/data/productCatalog'
import { trackEvent } from '@/analytics/analytics'

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
  const { t, lang } = useI18n()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const requestParams = useMemo(() => {
    const hash = location.hash.replace(/^#\??/, '')
    return hash ? new URLSearchParams(hash) : searchParams
  }, [location.hash, searchParams])
  const requestedProduct =
    requestParams.get('intent') === 'procurement'
      ? findCatalogProduct(requestParams.get('sku') ?? undefined)
      : undefined
  const defaultValues = useMemo<Partial<FormValues>>(() => {
    if (!requestedProduct) return {}

    return {
      service: t('marketplace.procurementService'),
      from: t(ORIGIN_KEYS[requestedProduct.originCountry]),
      message: [
        t('marketplace.prefillIntro'),
        '',
        `${t('marketplace.prefillSku')}: ${requestedProduct.sku}`,
        `${t('marketplace.prefillProduct')}: ${localizedProductName(requestedProduct, lang)}`,
        `${t('marketplace.prefillOrigin')}: ${t(ORIGIN_KEYS[requestedProduct.originCountry])}`,
        '',
        t('marketplace.prefillRequest'),
      ].join('\n'),
    }
  }, [lang, requestedProduct, t])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const onSubmit = async (v: FormValues) => {
    setIsSubmitting(true)
    const subject = `${v.service} Inquiry (${v.from} → ${v.to})`

    try {
      const res = await fetch('./api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: v.name,
          company: v.company || '',
          email: v.email,
          phone: v.phone,
          subject: subject,
          message: v.message,
        }),
      })

      const data = await res.json()

      if (data.success) {
        trackEvent('contact_form_submit', { status: 'success' })
        toast.success('Your message has been sent successfully!')
        setSubmitted(true)
        reset()
      } else {
        trackEvent('contact_form_submit', { status: 'failure' })
        toast.error(data.error || 'Failed to send email. Please try again.')
      }
    } catch (err) {
      trackEvent('contact_form_submit', { status: 'failure' })
      console.error('Contact submit error:', err)
      toast.error('Could not connect to contact server. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const labelClass = 'nss-mono mb-2 block text-[12px] tracking-[0.18em] text-[rgba(var(--text-rgb),0.60)] uppercase'
  const errClass = 'mt-1 text-[12px] text-[rgb(var(--gold-rgb))]'

  return (
    <main className="bg-[var(--bg)]">
      <PageHeader tagKey="contact.tag" headingKey="contact.heading" subKey="contact.sub" />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-14 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="nss-card p-7 md:p-10">
              <h2 className="nss-display text-2xl">{t('contact.formTitle')}</h2>
              <p className="mt-2 text-[13px] text-[rgba(var(--text-rgb),0.55)]">{t('contact.required')}</p>

              {submitted ? (
                <div className="mt-8 rounded-xl border border-[rgb(var(--gold-rgb))]/30 bg-[rgba(var(--gold-rgb),0.08)] p-6 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--gold-rgb))] text-[#1d1233]">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="nss-display text-xl text-[rgb(var(--gold-rgb))] font-bold">
                    {t('contact.successTitle')}
                  </h3>
                  <p className="text-sm text-[rgba(var(--text-rgb),0.85)] max-w-md mx-auto leading-relaxed">
                    {t('contact.successPrefix')}{' '}
                    <strong className="text-[rgb(var(--gold-rgb))]">info@nssgroupint.com</strong>.{' '}
                    {t('contact.successConfirmation')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="nss-btn-primary mt-2 rounded-sm px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
                  >
                    {t('contact.submitAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6 sm:grid-cols-2">
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
                      {requestedProduct && (
                        <option value={t('marketplace.procurementService')}>
                          {t('marketplace.procurementService')}
                        </option>
                      )}
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

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="nss-btn-primary flex items-center justify-center gap-2 rounded-sm px-8 py-3.5 text-sm font-bold disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>{t('contact.submitting')}</span>
                        </>
                      ) : (
                        <span>{t('contact.submit')}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* Info Sidebar */}
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
                    <div className="mt-2.5 flex flex-wrap items-center gap-3">
                      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="text-xs text-[rgba(var(--gold-rgb),0.85)] hover:text-[rgb(var(--gold-rgb))]">
                        WhatsApp →
                      </a>
                      <span className="text-xs text-[rgba(var(--text-rgb),0.3)]">·</span>
                      <a href={FACEBOOK} target="_blank" rel="noreferrer" className="text-xs text-[rgba(var(--gold-rgb),0.85)] hover:text-[rgb(var(--gold-rgb))]">
                        Facebook →
                      </a>
                      <span className="text-xs text-[rgba(var(--text-rgb),0.3)]">·</span>
                      <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-xs text-[rgba(var(--gold-rgb),0.85)] hover:text-[rgb(var(--gold-rgb))]">
                        Instagram →
                      </a>
                    </div>
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
                  <div>
                    <p className="text-sm font-semibold text-[rgb(var(--text-rgb))]">{t('contact.hq')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={16} className="mt-1 shrink-0 text-[rgb(var(--gold-rgb))]" />
                  <div>
                    <p className="text-sm font-semibold text-[rgb(var(--gold-rgb))]">{t('contact.uzbekOfficeTitle')}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[rgba(var(--text-rgb),0.75)]">{t('contact.uzbekOfficeAddr')}</p>
                  </div>
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
