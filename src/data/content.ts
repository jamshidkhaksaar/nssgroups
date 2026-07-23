import type { TranslationKey } from '@/i18n/translations/en'

/** Structured site data — numbers live here, labels live in i18n keys. */

export interface FleetItem {
  nameKey: TranslationKey
  useKey: TranslationKey
  count: number
  unit: 'wagons' | 'units'
}

export const FLEET: FleetItem[] = [
  { nameKey: 'fleet.f1.name', useKey: 'fleet.f1.use', count: 1500, unit: 'wagons' },
  { nameKey: 'fleet.f2.name', useKey: 'fleet.f2.use', count: 1000, unit: 'wagons' },
  { nameKey: 'fleet.f3.name', useKey: 'fleet.f3.use', count: 700, unit: 'wagons' },
  { nameKey: 'fleet.f4.name', useKey: 'fleet.f4.use', count: 650, unit: 'wagons' },
  { nameKey: 'fleet.f5.name', useKey: 'fleet.f5.use', count: 500, unit: 'wagons' },
  { nameKey: 'fleet.f6.name', useKey: 'fleet.f6.use', count: 250, unit: 'units' },
  { nameKey: 'fleet.f7.name', useKey: 'fleet.f7.use', count: 90, unit: 'units' },
  { nameKey: 'fleet.f8.name', useKey: 'fleet.f8.use', count: 250, unit: 'units' },
]

export const FLEET_TOTAL = 4940

export interface RateRow {
  model: string
  price: number
}

export const VEHICLE_RATES: RateRow[] = [
  { model: 'Toyota Corolla', price: 800 },
  { model: 'Toyota Prius', price: 780 },
  { model: 'Toyota Fortuner', price: 900 },
  { model: 'Toyota Land Cruiser', price: 950 },
  { model: 'Lexus 570', price: 940 },
  { model: 'Toyota Hilux', price: 940 },
]

export const COUNTRIES = [
  'Afghanistan',
  'Uzbekistan',
  'Turkmenistan',
  'Kazakhstan',
  'Tajikistan',
  'Russia',
  'Belarus',
  'Turkey',
  'Iran',
  'Pakistan',
  'Europe',
] as const

export interface Office {
  name: string
  border: string
}

export const OFFICES: Office[] = [
  { name: 'Hairatan', border: 'Uzbekistan' },
  { name: 'Aqina', border: 'Turkmenistan' },
  { name: 'Torghundi', border: 'Turkmenistan' },
  { name: 'Islam Qala', border: 'Iran' },
  { name: 'Sherkhan', border: 'Tajikistan' },
  { name: 'Roznak', border: 'Turkey' },
]

export interface ClientGroup {
  titleKey: TranslationKey
  names: { name: string; domain?: string }[]
}

export const CLIENTS: ClientGroup[] = [
  {
    titleKey: 'clients.un',
    names: [
      { name: 'WFP', domain: 'wfp.org' },
      { name: 'UNICEF', domain: 'unicef.org' },
      { name: 'WHO', domain: 'who.int' },
      { name: 'UNDP', domain: 'undp.org' },
      { name: 'FAO', domain: 'fao.org' },
      { name: 'IOM', domain: 'iom.int' },
      { name: 'UNHCR', domain: 'unhcr.org' },
      { name: 'ICRC', domain: 'icrc.org' },
      { name: 'ISAF', domain: 'nato.int' },
    ],
  },
  {
    titleKey: 'clients.ngo',
    names: [
      { name: 'ACTED', domain: 'acted.org' },
      { name: 'Save the Children', domain: 'savethechildren.net' },
      { name: 'DACAAR', domain: 'dacaar.org' },
      { name: 'CARE International', domain: 'care.org' },
      { name: 'DRC', domain: 'drc.ngo' },
    ],
  },
  { 
    titleKey: 'clients.private', 
    names: [
      { name: 'Afghan Wireless (AWCC)', domain: 'afghan-wireless.com' },
      { name: 'Roshan', domain: 'roshan.af' },
      { name: 'Etisalat', domain: 'etisalat.ae' }
    ] 
  },
  {
    titleKey: 'clients.gov',
    names: [
      { name: 'Ministry of Education', domain: 'moe.gov.af' },
      { name: 'Ministry of Agriculture', domain: 'mail.gov.af' },
      { name: 'Ministry of Public Works', domain: 'mopw.gov.af' },
      { name: 'Disaster Management Authority', domain: 'andma.gov.af' },
    ],
  },
]

export interface Corridor {
  nameKey: TranslationKey
  descKey: TranslationKey
}

export const CORRIDORS: Corridor[] = [
  { nameKey: 'network.c1.name', descKey: 'network.c1.desc' },
  { nameKey: 'network.c2.name', descKey: 'network.c2.desc' },
  { nameKey: 'network.c3.name', descKey: 'network.c3.desc' },
  { nameKey: 'network.c4.name', descKey: 'network.c4.desc' },
  { nameKey: 'network.c5.name', descKey: 'network.c5.desc' },
  { nameKey: 'network.c6.name', descKey: 'network.c6.desc' },
]

export interface CoreService {
  nameKey: TranslationKey
  descKey: TranslationKey
  poster: string
}

export const CORE_SERVICES: CoreService[] = [
  { nameKey: 'services.s1.name', descKey: 'services.s1.desc', poster: './services/s1.jpg' },
  { nameKey: 'services.s2.name', descKey: 'services.s2.desc', poster: './services/s2.jpg' },
  { nameKey: 'services.s3.name', descKey: 'services.s3.desc', poster: './services/s3.jpg' },
  { nameKey: 'services.s4.name', descKey: 'services.s4.desc', poster: './services/s4.jpg' },
  { nameKey: 'services.s5.name', descKey: 'services.s5.desc', poster: './services/s5.jpg' },
  { nameKey: 'services.s6.name', descKey: 'services.s6.desc', poster: './services/s6.jpg' },
  { nameKey: 'services.s7.name', descKey: 'services.s7.desc', poster: './services/s7.jpg' },
]

export const PHONE_1 = '+93 78 452 5666'
export const PHONE_2 = '+93 706 420 050'
export const EMAIL_1 = 'nawisamimsamir@gmail.com'
export const EMAIL_2 = 'alemyar@nssitransit.com'
export const WHATSAPP = 'https://wa.me/93784525666'
export const FACEBOOK = 'https://www.facebook.com/nssitransit'
export const INSTAGRAM = 'https://www.instagram.com/nssitransit'
