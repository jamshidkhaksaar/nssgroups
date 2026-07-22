import { useState, type FormEvent } from 'react'
import { CheckCircle2, Clock3, MapPin, Search, ShieldAlert } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'

const MILESTONES = [
  { location: 'Hairatan, Afghanistan', time: '14 Jun · 09:40', state: 'complete' },
  { location: 'Mazar-e-Sharif, Afghanistan', time: '15 Jun · 06:15', state: 'complete' },
  { location: 'Kabul, Afghanistan', time: 'Estimated 16 Jun', state: 'next' },
]

export default function Tracking() {
  const { t } = useI18n()
  const [code, setCode] = useState('NSS-7K4M-2026')
  const [found, setFound] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setFound(code.trim().length > 4) }

  return <main className="bg-[var(--bg)]">
    <PageHeader tagKey="tracking.tag" headingKey="tracking.heading" subKey="tracking.sub" />
    <section className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
      <Reveal><form onSubmit={submit} className="border border-[rgba(var(--gold-rgb),0.2)] bg-[var(--panel)] p-6 md:p-10"><label className="nss-mono mb-3 block text-[11px] tracking-[0.16em] text-[rgba(var(--text-rgb),0.58)] uppercase">{t('tracking.code')}</label><div className="flex flex-col gap-3 sm:flex-row"><input value={code} onChange={(event) => setCode(event.target.value)} className="h-13 min-w-0 flex-1 border border-[rgba(var(--gold-rgb),0.24)] bg-[var(--bg)] px-4 text-sm tracking-[0.08em] text-[rgb(var(--text-rgb))] outline-none focus:border-[rgb(var(--gold-rgb))]" /><button className="nss-btn-primary inline-flex h-13 items-center justify-center gap-2 rounded-sm px-7 text-sm font-bold"><Search size={16} />{t('tracking.lookup')}</button></div><p className="mt-4 text-sm leading-relaxed text-[rgba(var(--text-rgb),0.52)]">{t('tracking.publicNote')}</p></form></Reveal>
      {found && <Reveal className="mt-8"><article className="nss-card overflow-hidden"><div className="flex flex-col gap-4 border-b border-[rgba(var(--gold-rgb),0.14)] p-6 md:flex-row md:items-center md:justify-between"><div><p className="nss-mono text-[11px] tracking-[0.14em] text-[rgb(var(--gold-rgb))] uppercase">{code}</p><h2 className="nss-display mt-2 text-2xl">{t('tracking.inTransit')}</h2></div><div className="flex items-center gap-2 text-sm text-[rgba(var(--text-rgb),0.58)]"><Clock3 size={15} className="text-[rgb(var(--gold-rgb))]" />{t('tracking.updated')}</div></div><div className="grid lg:grid-cols-[1fr_0.85fr]"><div className="relative min-h-64 overflow-hidden border-b border-[rgba(var(--gold-rgb),0.14)] bg-[radial-gradient(circle_at_65%_35%,rgba(232,194,104,0.18),transparent_0),linear-gradient(135deg,#211636,#0e0a1e)] p-8 lg:border-b-0 lg:border-e"><div className="absolute inset-7 border border-[rgba(var(--gold-rgb),0.18)]" /><div className="absolute start-[24%] top-[58%] h-3 w-3 rounded-full bg-[rgb(var(--gold-rgb))] shadow-[0_0_0_7px_rgba(232,194,104,0.12)]" /><div className="absolute end-[25%] top-[28%] h-3 w-3 rounded-full bg-[rgb(var(--gold-rgb))] shadow-[0_0_0_7px_rgba(232,194,104,0.12)]" /><div className="absolute start-[27%] top-[55%] h-px w-[48%] origin-left -rotate-[29deg] bg-[rgb(var(--gold-rgb))]" /><div className="absolute bottom-8 start-8 flex items-center gap-2 text-[12px] text-[rgba(var(--text-rgb),0.62)]"><MapPin size={14} className="text-[rgb(var(--gold-rgb))]" />{t('tracking.mapNote')}</div></div><ol className="p-6">{MILESTONES.map((milestone, index) => <li key={milestone.location} className="relative flex gap-4 pb-7 last:pb-0"><span className="relative z-10 mt-0.5"><CheckCircle2 size={18} className={milestone.state === 'complete' ? 'text-[rgb(var(--gold-rgb))]' : 'text-[rgba(var(--gold-rgb),0.35)]'} /></span>{index < MILESTONES.length - 1 && <span className="absolute start-[8px] top-6 h-[calc(100%-12px)] w-px bg-[rgba(var(--gold-rgb),0.18)]" />}<div><p className="text-sm font-semibold text-[rgba(var(--text-rgb),0.84)]">{milestone.location}</p><p className="mt-1 text-[12px] text-[rgba(var(--text-rgb),0.48)]">{milestone.time}</p></div></li>)}</ol></div><div className="flex gap-3 border-t border-[rgba(var(--gold-rgb),0.14)] bg-[rgba(var(--gold-rgb),0.05)] px-6 py-4 text-[12px] leading-relaxed text-[rgba(var(--text-rgb),0.6)]"><ShieldAlert size={16} className="shrink-0 text-[rgb(var(--gold-rgb))]" />{t('tracking.secureNote')}</div></article></Reveal>}
    </section>
  </main>
}
