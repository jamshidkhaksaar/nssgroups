import type { TranslationKey } from '@/i18n/translations/en'

export interface PortfolioMilestone {
  year: string
  titleKey: TranslationKey
  descriptionKey: TranslationKey
}

export interface PortfolioCompany {
  number: string
  nameKey: TranslationKey
  descriptionKey: TranslationKey
}

export interface PortfolioCard {
  titleKey: TranslationKey
  descriptionKey: TranslationKey
}

export interface PortfolioRelationship {
  name: string
  periodKey: TranslationKey
  descriptionKey: TranslationKey
  logo: string
}

export const PORTFOLIO_TIMELINE: PortfolioMilestone[] = [
  {
    year: '2000',
    titleKey: 'portfolio.timeline.2000.title',
    descriptionKey: 'portfolio.timeline.2000.desc',
  },
  {
    year: '2010',
    titleKey: 'portfolio.timeline.2010.title',
    descriptionKey: 'portfolio.timeline.2010.desc',
  },
  {
    year: '2013',
    titleKey: 'portfolio.timeline.2013.title',
    descriptionKey: 'portfolio.timeline.2013.desc',
  },
  {
    year: '2015',
    titleKey: 'portfolio.timeline.2015.title',
    descriptionKey: 'portfolio.timeline.2015.desc',
  },
  {
    year: '2016–23',
    titleKey: 'portfolio.timeline.2016.title',
    descriptionKey: 'portfolio.timeline.2016.desc',
  },
  {
    year: '2024',
    titleKey: 'portfolio.timeline.2024.title',
    descriptionKey: 'portfolio.timeline.2024.desc',
  },
  {
    year: '2026',
    titleKey: 'portfolio.timeline.2026.title',
    descriptionKey: 'portfolio.timeline.2026.desc',
  },
]

export const PORTFOLIO_COMPANIES: PortfolioCompany[] = [
  {
    number: '01',
    nameKey: 'portfolio.company.1.name',
    descriptionKey: 'portfolio.company.1.desc',
  },
  {
    number: '02',
    nameKey: 'portfolio.company.2.name',
    descriptionKey: 'portfolio.company.2.desc',
  },
  {
    number: '03',
    nameKey: 'portfolio.company.3.name',
    descriptionKey: 'portfolio.company.3.desc',
  },
  {
    number: '04',
    nameKey: 'portfolio.company.4.name',
    descriptionKey: 'portfolio.company.4.desc',
  },
  {
    number: '05',
    nameKey: 'portfolio.company.5.name',
    descriptionKey: 'portfolio.company.5.desc',
  },
  {
    number: '06',
    nameKey: 'portfolio.company.6.name',
    descriptionKey: 'portfolio.company.6.desc',
  },
]

export const PORTFOLIO_CAPABILITIES: PortfolioCard[] = [
  {
    titleKey: 'portfolio.capability.1.title',
    descriptionKey: 'portfolio.capability.1.desc',
  },
  {
    titleKey: 'portfolio.capability.2.title',
    descriptionKey: 'portfolio.capability.2.desc',
  },
  {
    titleKey: 'portfolio.capability.3.title',
    descriptionKey: 'portfolio.capability.3.desc',
  },
  {
    titleKey: 'portfolio.capability.4.title',
    descriptionKey: 'portfolio.capability.4.desc',
  },
  {
    titleKey: 'portfolio.capability.5.title',
    descriptionKey: 'portfolio.capability.5.desc',
  },
]

export const PORTFOLIO_RELATIONSHIPS: PortfolioRelationship[] = [
  {
    name: 'UNICEF',
    periodKey: 'portfolio.relationship.unicef.period',
    descriptionKey: 'portfolio.relationship.unicef.desc',
    logo: './logos/unicef.org.png',
  },
  {
    name: 'World Food Programme',
    periodKey: 'portfolio.relationship.wfp.period',
    descriptionKey: 'portfolio.relationship.wfp.desc',
    logo: './logos/wfp.org.png',
  },
  {
    name: 'International Committee of the Red Cross',
    periodKey: 'portfolio.relationship.icrc.period',
    descriptionKey: 'portfolio.relationship.icrc.desc',
    logo: './logos/icrc.org.png',
  },
  {
    name: 'Food and Agriculture Organization',
    periodKey: 'portfolio.relationship.fao.period',
    descriptionKey: 'portfolio.relationship.fao.desc',
    logo: './logos/fao.org.png',
  },
  {
    name: 'ACTED',
    periodKey: 'portfolio.relationship.acted.period',
    descriptionKey: 'portfolio.relationship.acted.desc',
    logo: './logos/acted.org.png',
  },
  {
    name: 'DACAAR',
    periodKey: 'portfolio.relationship.dacaar.period',
    descriptionKey: 'portfolio.relationship.dacaar.desc',
    logo: './logos/dacaar.org.png',
  },
  {
    name: 'Afghan Wireless',
    periodKey: 'portfolio.relationship.awcc.period',
    descriptionKey: 'portfolio.relationship.awcc.desc',
    logo: './logos/afghan-wireless.com.png',
  },
  {
    name: 'Roshan',
    periodKey: 'portfolio.relationship.roshan.period',
    descriptionKey: 'portfolio.relationship.roshan.desc',
    logo: './logos/roshan.af.png',
  },
]

export const PORTFOLIO_SERVICE_MODEL: PortfolioCard[] = [
  {
    titleKey: 'portfolio.model.1.title',
    descriptionKey: 'portfolio.model.1.desc',
  },
  {
    titleKey: 'portfolio.model.2.title',
    descriptionKey: 'portfolio.model.2.desc',
  },
  {
    titleKey: 'portfolio.model.3.title',
    descriptionKey: 'portfolio.model.3.desc',
  },
  {
    titleKey: 'portfolio.model.4.title',
    descriptionKey: 'portfolio.model.4.desc',
  },
  {
    titleKey: 'portfolio.model.5.title',
    descriptionKey: 'portfolio.model.5.desc',
  },
  {
    titleKey: 'portfolio.model.6.title',
    descriptionKey: 'portfolio.model.6.desc',
  },
]

export const PORTFOLIO_RECORDS: TranslationKey[] = [
  'portfolio.record.1',
  'portfolio.record.2',
  'portfolio.record.3',
  'portfolio.record.4',
  'portfolio.record.5',
  'portfolio.record.6',
]

export const PORTFOLIO_ROADMAP: PortfolioCard[] = [
  {
    titleKey: 'portfolio.roadmap.1.title',
    descriptionKey: 'portfolio.roadmap.1.desc',
  },
  {
    titleKey: 'portfolio.roadmap.2.title',
    descriptionKey: 'portfolio.roadmap.2.desc',
  },
  {
    titleKey: 'portfolio.roadmap.3.title',
    descriptionKey: 'portfolio.roadmap.3.desc',
  },
  {
    titleKey: 'portfolio.roadmap.4.title',
    descriptionKey: 'portfolio.roadmap.4.desc',
  },
]

export const PORTFOLIO_GOVERNANCE: TranslationKey[] = [
  'portfolio.governance.1',
  'portfolio.governance.2',
  'portfolio.governance.3',
  'portfolio.governance.4',
]
