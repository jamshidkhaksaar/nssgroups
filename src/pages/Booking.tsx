import { useState } from 'react'
import { Plane, Ship, TrainFront, Truck } from 'lucide-react'
import { toast } from 'sonner'
import { useI18n } from '@/i18n/i18n'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import { createPlatformRequest } from '@/lib/request-store'

type BookingMode = 'truck' | 'wagon' | 'cargo' | 'sea'

const MODES: { id: BookingMode; icon: typeof Truck; key: 'booking.tab.truck' | 'booking.tab.wagon' | 'booking.tab.cargo' | 'booking.mode' }[] = [
  { id: 'truck', icon: Truck, key: 'booking.tab.truck' },
  { id: 'wagon', icon: TrainFront, key: 'booking.tab.wagon' },
  { id: 'cargo', icon: Plane, key: 'booking.tab.cargo' },
  { id: 'sea', icon: Ship, key: 'booking.mode' },
]

export default function Booking() {
  const { t } = useI18n()
  const [mode, setMode] = useState<BookingMode>('truck')
  const [sent, setSent] = useState(false)

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const record = createPlatformRequest(mode)
    setSent(true)
    toast.success(`${t('booking.sent')} ${record.reference}`)
  }

  return (
    <main className="bg-[var(--bg)]">
      <PageHeader tagKey="booking.tag" headingKey="booking.heading" subKey="booking.sub" />
      <section className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <div className="grid grid-cols-2 border border-[rgba(var(--gold-rgb),0.18)] md:grid-cols-4">
            {MODES.map((item) => (
              <button key={item.id} type="button" onClick={() => { setMode(item.id); setSent(false) }} className={`flex min-h-24 flex-col items-center justify-center gap-3 border-e border-[rgba(var(--gold-rgb),0.12)] px-3 text-center transition-colors last:border-e-0 ${mode === item.id ? 'bg-[rgb(var(--gold-rgb))] text-[#1d1233]' : 'bg-[var(--panel)] text-[rgba(var(--text-rgb),0.7)] hover:bg-[rgba(var(--gold-rgb),0.09)]'}`}>
                <item.icon size={19} />
                <span className="nss-mono text-[10px] tracking-[0.11em] uppercase">{item.id === 'sea' ? 'SEA CONTAINER' : t(item.key)}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <form onSubmit={submit} className="nss-card p-7 md:p-10">
            <div className="flex flex-col gap-2 border-b border-[rgba(var(--gold-rgb),0.14)] pb-7 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="nss-section-tag">{t('booking.tag')}</p>
                <h2 className="nss-display mt-3 text-2xl">{mode === 'sea' ? 'Sea container request' : t(MODES.find((item) => item.id === mode)?.key ?? 'booking.tab.truck')}</h2>
              </div>
              <p className="nss-mono text-[11px] tracking-[0.12em] text-[rgba(var(--gold-rgb),0.74)] uppercase">{t('contact.available')}</p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label={t('booking.goodsType')} required />
              <Field label={mode === 'cargo' ? t('booking.kg') : t('booking.weight')} required type="number" />
              <Field label={mode === 'wagon' ? t('booking.fromStation') : t('booking.routeFrom')} required />
              <Field label={mode === 'wagon' ? t('booking.toStation') : t('booking.routeTo')} required />
              {mode === 'truck' && <SelectField label={t('booking.truckType')} options={[t('booking.truckType.tanker'), t('booking.truckType.tented'), t('booking.truckType.flatbed'), t('booking.truckType.refrigerated')]} />}
              {mode === 'truck' && <Field label={t('booking.truckCount')} required type="number" />}
              {mode === 'wagon' && <Field label={t('booking.wagonType')} required />}
              {mode === 'wagon' && <Field label={t('booking.wagonCount')} required type="number" />}
              {mode === 'cargo' && <Field label={t('booking.quantity')} required />}
              {mode === 'sea' && <SelectField label="Container type" options={['20FT', '40FT', 'Reefer', 'Open Top', 'Flat Rack']} />}
              {mode === 'sea' && <Field label={t('booking.quantity')} required type="number" />}
              <Field label={t('booking.name')} required />
              <Field label={t('booking.phone')} required type="tel" />
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button type="submit" className="nss-btn-primary rounded-sm px-7 py-3.5 text-sm font-bold">{t('booking.submit')}</button>
              {sent && <p role="status" className="text-sm text-[rgb(var(--gold-rgb))]">{t('booking.sent')}</p>}
            </div>
          </form>
        </Reveal>
      </section>
    </main>
  )
}

function Field({ label, type = 'text', required = false }: { label: string; type?: string; required?: boolean }) {
  return <label className="block"><span className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">{label}{required ? ' *' : ''}</span><input required={required} type={type} className="h-11 w-full border border-[rgba(var(--gold-rgb),0.2)] bg-[rgba(var(--text-rgb),0.04)] px-3 text-sm text-[rgb(var(--text-rgb))] outline-none focus:border-[rgb(var(--gold-rgb))]" /></label>
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return <label className="block"><span className="nss-mono mb-2 block text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.58)] uppercase">{label}</span><select className="h-11 w-full border border-[rgba(var(--gold-rgb),0.2)] bg-[var(--bg)] px-3 text-sm text-[rgb(var(--text-rgb))] outline-none focus:border-[rgb(var(--gold-rgb))]">{options.map((option) => <option key={option}>{option}</option>)}</select></label>
}
