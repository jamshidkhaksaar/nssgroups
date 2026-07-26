import { useState } from 'react'
import { toast } from 'sonner'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import { createPlatformRequest } from '@/lib/request-store'

type BookingMode = 'truck' | 'wagon' | 'cargo' | 'sea'

const TruckIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 17h4V5H2v12h3" />
    <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h2" />
    <circle cx="7.5" cy="17.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
    <path d="M14 11h4" />
    <path d="M14 14h4" />
  </svg>
)

const TrainIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 17h16" />
    <path d="M5 17v-8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8" />
    <path d="M8 17v4" />
    <path d="M16 17v4" />
    <path d="M9 11h6" />
    <circle cx="12" cy="15" r="1" />
    <path d="M10 3h4" />
    <path d="M12 3v4" />
  </svg>
)

const PlaneIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 5-4 4-3-1-1 1 4 4 1-1-1-3 4-4 5 6l1.2-.7c.4-.2.7-.6.6-1.1z" />
  </svg>
)

const ShipIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
    <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
    <path d="M12 10v4" />
    <path d="M12 2v3" />
  </svg>
)

const MODES: { id: BookingMode; icon: React.FC<{size?: number}>; key: 'booking.tab.truck' | 'booking.tab.wagon' | 'booking.tab.cargo' | 'booking.mode' }[] = [
  { id: 'truck', icon: TruckIcon, key: 'booking.tab.truck' },
  { id: 'wagon', icon: TrainIcon, key: 'booking.tab.wagon' },
  { id: 'cargo', icon: PlaneIcon, key: 'booking.tab.cargo' },
  { id: 'sea', icon: ShipIcon, key: 'booking.mode' },
]

export default function Booking() {
  const { t } = useI18n()
  const [mode, setMode] = useState<BookingMode>('truck')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedRef, setSubmittedRef] = useState<string | null>(null)

  // Form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [goodsType, setGoodsType] = useState('')
  const [weight, setWeight] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [truckType, setTruckType] = useState(t('booking.truckType.tanker'))
  const [truckCount, setTruckCount] = useState('1')
  const [wagonType, setWagonType] = useState('Box Wagon')
  const [wagonCount, setWagonCount] = useState('1')
  const [containerType, setContainerType] = useState('40FT')
  const [notes, setNotes] = useState('')

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const record = createPlatformRequest(mode)
    const refCode = record.reference

    let detailsStr = ''
    if (mode === 'truck') {
      detailsStr = `Truck Type: ${truckType} | Units: ${truckCount}`
    } else if (mode === 'wagon') {
      detailsStr = `Wagon Type: ${wagonType} | Wagons: ${wagonCount}`
    } else if (mode === 'sea') {
      detailsStr = `Container: ${containerType}`
    } else {
      detailsStr = `Cargo Mode: Air & Ground`
    }

    try {
      const res = await fetch('./api/booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          mode,
          goodsType,
          weight,
          from,
          to,
          details: detailsStr,
          reference: refCode,
          notes,
        }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success(`Booking request submitted successfully! Ref: ${refCode}`)
        setSubmittedRef(refCode)
      } else {
        toast.error(data.error || 'Failed to submit booking request. Please try again.')
      }
    } catch (err) {
      console.error('Booking submit error:', err)
      toast.error('Could not connect to booking server. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-[var(--bg)]">
      <PageHeader tagKey="booking.tag" headingKey="booking.heading" subKey="booking.sub" />
      <section className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <div className="grid grid-cols-2 border border-[rgba(var(--gold-rgb),0.18)] md:grid-cols-4">
            {MODES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMode(item.id)
                  setSubmittedRef(null)
                }}
                className={`flex min-h-[140px] flex-col items-center justify-center gap-4 border-e border-[rgba(var(--gold-rgb),0.12)] px-4 text-center transition-colors last:border-e-0 ${
                  mode === item.id
                    ? 'bg-[rgb(var(--gold-rgb))] text-[#1d1233]'
                    : 'bg-[var(--panel)] text-[rgba(var(--text-rgb),0.7)] hover:bg-[rgba(var(--gold-rgb),0.09)]'
                }`}
              >
                <item.icon size={44} />
                <span className="nss-mono text-[11px] font-semibold tracking-[0.11em] uppercase">
                  {item.id === 'sea' ? 'SEA CONTAINER' : t(item.key)}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="nss-card p-7 md:p-10">
            <div className="flex flex-col gap-2 border-b border-[rgba(var(--gold-rgb),0.14)] pb-7 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="nss-section-tag">{t('booking.tag')}</p>
                <h2 className="nss-display mt-3 text-2xl">
                  {mode === 'sea'
                    ? t('booking.seaRequest')
                    : t(MODES.find((item) => item.id === mode)?.key ?? 'booking.tab.truck')}
                </h2>
              </div>
              <p className="nss-mono text-[11px] tracking-[0.12em] text-[rgba(var(--gold-rgb),0.74)] uppercase">
                {t('contact.available')}
              </p>
            </div>

            {submittedRef ? (
              <div className="mt-8 rounded-xl border border-[rgb(var(--gold-rgb))]/30 bg-[rgba(var(--gold-rgb),0.08)] p-6 text-center space-y-4 animate-in fade-in duration-300">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--gold-rgb))] text-[#1d1233]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="nss-display text-xl text-[rgb(var(--gold-rgb))] font-bold">
                  {t('booking.successTitle')}
                </h3>
                <p className="text-sm text-[rgba(var(--text-rgb),0.85)] max-w-md mx-auto leading-relaxed">
                  {t('booking.successPrefix')}{' '}
                  <strong className="text-[rgb(var(--gold-rgb))]">{submittedRef}</strong>.{' '}
                  {t('booking.successRouted')}{' '}
                  <strong className="text-[rgb(var(--gold-rgb))]">info@nssgroupint.com</strong>.{' '}
                  {t('booking.successEmail')}{' '}
                  <strong className="text-[rgb(var(--gold-rgb))]">{email}</strong>.{' '}
                  {t('booking.successRate')}
                </p>
                <button
                  onClick={() => setSubmittedRef(null)}
                  className="nss-btn-primary mt-2 rounded-sm px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
                >
                  {t('booking.submitAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t('booking.name')} value={name} onChange={setName} required />
                  <Field label={t('contact.email')} type="email" value={email} onChange={setEmail} required />
                  <Field label={t('booking.phone')} type="tel" value={phone} onChange={setPhone} required />
                  <Field label={t('contact.company')} value={company} onChange={setCompany} />

                  <Field label={t('booking.goodsType')} value={goodsType} onChange={setGoodsType} required />
                  <Field
                    label={mode === 'cargo' ? t('booking.kg') : t('booking.weight')}
                    value={weight}
                    onChange={setWeight}
                    required
                  />

                  <Field
                    label={mode === 'wagon' ? t('booking.fromStation') : t('booking.routeFrom')}
                    value={from}
                    onChange={setFrom}
                    required
                  />
                  <Field
                    label={mode === 'wagon' ? t('booking.toStation') : t('booking.routeTo')}
                    value={to}
                    onChange={setTo}
                    required
                  />

                  {mode === 'truck' && (
                    <SelectField
                      label={t('booking.truckType')}
                      value={truckType}
                      onChange={setTruckType}
                      options={[
                        t('booking.truckType.tanker'),
                        t('booking.truckType.tented'),
                        t('booking.truckType.flatbed'),
                        t('booking.truckType.refrigerated'),
                      ]}
                    />
                  )}
                  {mode === 'truck' && (
                    <Field
                      label={t('booking.truckCount')}
                      type="number"
                      value={truckCount}
                      onChange={setTruckCount}
                      required
                    />
                  )}

                  {mode === 'wagon' && (
                    <Field
                      label={t('booking.wagonType')}
                      value={wagonType}
                      onChange={setWagonType}
                      required
                    />
                  )}
                  {mode === 'wagon' && (
                    <Field
                      label={t('booking.wagonCount')}
                      type="number"
                      value={wagonCount}
                      onChange={setWagonCount}
                      required
                    />
                  )}

                  {mode === 'sea' && (
                    <SelectField
                      label={t('booking.containerType')}
                      value={containerType}
                      onChange={setContainerType}
                      options={[
                        t('booking.container.20ft'),
                        t('booking.container.40ft'),
                        t('booking.container.reefer'),
                        t('booking.container.openTop'),
                        t('booking.container.flatRack'),
                      ]}
                    />
                  )}

                  <div className="sm:col-span-2">
                    <label className="block">
                      <span className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">
                        {t('booking.notes')}
                      </span>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t('booking.notesPlaceholder')}
                        className="w-full border border-[rgba(var(--gold-rgb),0.2)] bg-[rgba(var(--text-rgb),0.04)] p-3 text-sm text-[rgb(var(--text-rgb))] outline-none focus:border-[rgb(var(--gold-rgb))]"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="nss-btn-primary flex items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-bold disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>{t('booking.submitting')}</span>
                      </>
                    ) : (
                      <span>{t('booking.submit')}</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </main>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  onChange: (val: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full border border-[rgba(var(--gold-rgb),0.2)] bg-[rgba(var(--text-rgb),0.04)] px-3 text-sm text-[rgb(var(--text-rgb))] outline-none focus:border-[rgb(var(--gold-rgb))]"
      />
    </label>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (val: string) => void
  options: string[]
}) {
  return (
    <label className="block">
      <span className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full border border-[rgba(var(--gold-rgb),0.2)] bg-[var(--bg)] px-3 text-sm text-[rgb(var(--text-rgb))] outline-none focus:border-[rgb(var(--gold-rgb))]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
