import { useState } from 'react'
import { ArrowUpRight, PlayCircle } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import type { TranslationKey } from '@/i18n/translations/en'
import PageHeader from '@/components/PageHeader'
import AnimatedNumber from '@/components/AnimatedNumber'
import Reveal from '@/components/Reveal'

type ProjectCategory = 'all' | 'cargo' | 'trading' | 'vehicle' | 'energy'

const FILTERS: { id: ProjectCategory; key: TranslationKey }[] = [
  { id: 'all', key: 'projects.cat.all' }, { id: 'cargo', key: 'projects.cat.cargo' }, { id: 'trading', key: 'projects.cat.trading' }, { id: 'vehicle', key: 'projects.cat.vehicle' }, { id: 'energy', key: 'projects.cat.energy' },
]

const PROJECTS: { title: string; category: ProjectCategory; poster: string }[] = [
  { title: 'Cement corridor delivery', category: 'cargo', poster: './posters/4.jpg' },
  { title: 'PVC resin wholesale supply', category: 'trading', poster: './posters/1.jpg' },
  { title: 'Vehicle import operations', category: 'vehicle', poster: './posters/7.jpg' },
  { title: 'LPG corridor transport', category: 'energy', poster: './posters/6.jpg' },
  { title: 'Food and flour delivery', category: 'cargo', poster: './posters/3.jpg' },
  { title: 'Heavy equipment dispatch', category: 'cargo', poster: './posters/12.jpg' },
]

export default function Projects() {
  const { t } = useI18n()
  const [active, setActive] = useState<ProjectCategory>('all')
  const visible = PROJECTS.filter((project) => active === 'all' || active === project.category)
  return <main className="bg-[var(--bg)]">
    <PageHeader tagKey="projects.tag" headingKey="projects.heading" subKey="projects.sub" />
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
      <Reveal className="flex flex-col gap-6 border-b border-[rgba(var(--gold-rgb),0.15)] pb-10 md:flex-row md:items-end md:justify-between">
        <div><AnimatedNumber value={180} suffix={t('projects.statSuffix')} className="nss-display text-6xl text-[rgb(var(--gold-rgb))] md:text-7xl" /><p className="nss-mono mt-2 max-w-xs text-[11px] tracking-[0.14em] text-[rgba(var(--text-rgb),0.52)] uppercase">{t('projects.stat')}</p></div>
        <div className="flex flex-wrap gap-2">{FILTERS.map((filter) => <button key={filter.id} type="button" onClick={() => setActive(filter.id)} className={`nss-mono border px-3 py-2 text-[10px] tracking-[0.12em] uppercase ${active === filter.id ? 'border-[rgb(var(--gold-rgb))] bg-[rgb(var(--gold-rgb))] text-[#1d1233]' : 'border-[rgba(var(--gold-rgb),0.22)] text-[rgba(var(--text-rgb),0.62)]'}`}>{t(filter.key)}</button>)}</div>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visible.map((project, index) => <Reveal key={project.title} delay={(index % 3) * 80}><article className="group relative aspect-[4/3] overflow-hidden border border-[rgba(var(--gold-rgb),0.16)] bg-[var(--panel)]"><img src={project.poster} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,10,30,0.88),transparent_65%)]" /><div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4"><div><p className="nss-mono text-[10px] tracking-[0.16em] text-[rgb(var(--gold-rgb))] uppercase">{t(FILTERS.find((filter) => filter.id === project.category)?.key ?? 'projects.cat.all')}</p><h2 className="nss-display mt-2 text-xl">{project.title}</h2></div><PlayCircle className="shrink-0 text-[rgb(var(--gold-rgb))]" size={25} /></div></article></Reveal>)}</div>
      <Reveal className="mt-10 flex items-center gap-3 text-sm text-[rgba(var(--text-rgb),0.58)]"><ArrowUpRight size={17} className="text-[rgb(var(--gold-rgb))]" /><span>{t('projects.mediaNote')}</span></Reveal>
    </section>
  </main>
}
