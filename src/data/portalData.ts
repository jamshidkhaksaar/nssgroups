import { useState, useEffect } from 'react';
import type {
  ClientProfile,
  VerificationDocument,
  PartnerVendor,
  MarketplaceListing,
  PartnerBid,
  OpenFreightRequest,
  LogisticsOrder,
  ClientInvoice,
  ModerationLog,
  AdminKPIStats,
  OrderStatus,
  PartnerStatus,
  DocumentType,
  ListingCategory,
  UnitPricingType,
  TransitMode
} from '@/types/portal';

// ── Level Tier Helper ──
export function calculateLevelInfo(xp: number) {
  if (xp >= 75000) {
    return {
      tier: 'DIAMOND' as const,
      level: 5,
      title: 'Diamond Global Enterprise',
      currentXp: xp,
      nextLevelXp: 100000,
      badgeIcon: '👑',
      feePercentage: 2.0,
      perks: ['0% Escrow Fee', 'Direct API Integration', 'VIP Dedicated Manager', 'Custom Priority Dispatch']
    };
  } else if (xp >= 35000) {
    return {
      tier: 'PLATINUM' as const,
      level: 4,
      title: 'Platinum Freight Master',
      currentXp: xp,
      nextLevelXp: 75000,
      badgeIcon: '💎',
      feePercentage: 2.5,
      perks: ['Instant Payout upon Loading', 'Multi-Corridor Priority', '2.5% Platform Fee', 'Dedicated Account Manager']
    };
  } else if (xp >= 15000) {
    return {
      tier: 'GOLD' as const,
      level: 3,
      title: 'Gold Logistics Titan',
      currentXp: xp,
      nextLevelXp: 35000,
      badgeIcon: '🥇',
      feePercentage: 3.0,
      perks: ['Featured Marketplace Badge', '3.0% Platform Fee', 'Priority Support Line', 'Weekly Settlement']
    };
  } else if (xp >= 5000) {
    return {
      tier: 'SILVER' as const,
      level: 2,
      title: 'Silver Cargo Operator',
      currentXp: xp,
      nextLevelXp: 15000,
      badgeIcon: '🥈',
      feePercentage: 4.0,
      perks: ['Priority Bidding Placement', '4.0% Platform Fee', 'Bi-Weekly Settlement']
    };
  } else {
    return {
      tier: 'BRONZE' as const,
      level: 1,
      title: 'Bronze Fleet Partner',
      currentXp: xp,
      nextLevelXp: 5000,
      badgeIcon: '🎖️',
      feePercentage: 5.0,
      perks: ['Standard Marketplace Listing', '5.0% Platform Fee', '14-Day Payment Cycle']
    };
  }
}

// ── Initial Mock Data ──

export const INITIAL_DOCUMENTS: VerificationDocument[] = [
  {
    id: 'doc-101',
    clientId: 'cli-001',
    clientName: 'UN World Food Programme (WFP)',
    type: 'customs_authorization',
    title: 'UN Humanitarian Exemption Permit 2026',
    fileName: 'wfp_customs_permit_2026.pdf',
    fileSize: '2.4 MB',
    uploadedAt: '2026-07-22T09:30:00Z',
    status: 'pending',
    fileUrl: '/docs/wfp_customs_permit_2026.pdf'
  },
  {
    id: 'doc-102',
    clientId: 'cli-002',
    clientName: 'Afghan Wireless Communication Co.',
    type: 'corporate_license',
    title: 'AISA Commercial Business License 2026',
    fileName: 'awcc_aisa_license_2026.pdf',
    fileSize: '1.8 MB',
    uploadedAt: '2026-07-23T14:15:00Z',
    status: 'pending',
    fileUrl: '/docs/awcc_aisa_license_2026.pdf'
  },
  {
    id: 'doc-103',
    clientId: 'cli-003',
    clientName: 'Ministry of Public Works (MoPW)',
    type: 'tax_certificate',
    title: 'Ministry Tax Clearance Certificate',
    fileName: 'mopw_tax_cert.pdf',
    fileSize: '1.1 MB',
    uploadedAt: '2026-07-24T08:00:00Z',
    status: 'pending',
    fileUrl: '/docs/mopw_tax_cert.pdf'
  },
  {
    id: 'doc-104',
    clientId: 'cli-004',
    clientName: 'ACTED International NGO',
    type: 'corporate_license',
    title: 'NGO Ministry Registration Cert',
    fileName: 'acted_ngo_reg.pdf',
    fileSize: '3.0 MB',
    uploadedAt: '2026-07-15T11:00:00Z',
    status: 'approved',
    fileUrl: '/docs/acted_ngo_reg.pdf',
    reviewedAt: '2026-07-16T10:20:00Z',
    reviewedBy: 'Admin (Samir Alemyar)'
  }
];

export const INITIAL_CLIENTS: ClientProfile[] = [
  {
    id: 'cli-001',
    fullName: 'David Vance (Procurement Lead)',
    companyName: 'UN World Food Programme',
    email: 'procurement.kabul@wfp.org',
    phone: '+93 70 123 4567',
    country: 'Afghanistan',
    category: 'un_agency',
    state: 'pending_verification',
    registeredAt: '2026-07-22T09:00:00Z',
    documents: [INITIAL_DOCUMENTS[0]],
    totalOrders: 14,
    totalSpentUsd: 1250000
  },
  {
    id: 'cli-002',
    fullName: 'Ahmad Reshad (Logistics Mgr)',
    companyName: 'Afghan Wireless Communication Co.',
    email: 'logistics@afghan-wireless.com',
    phone: '+93 78 900 1122',
    country: 'Afghanistan',
    category: 'private',
    state: 'pending_verification',
    registeredAt: '2026-07-23T14:00:00Z',
    documents: [INITIAL_DOCUMENTS[1]],
    totalOrders: 5,
    totalSpentUsd: 480000
  },
  {
    id: 'cli-003',
    fullName: 'Eng. Engineer Qais (Director)',
    companyName: 'Ministry of Public Works',
    email: 'transport@mopw.gov.af',
    phone: '+93 75 444 3322',
    country: 'Afghanistan',
    category: 'government',
    state: 'pending_verification',
    registeredAt: '2026-07-24T07:45:00Z',
    documents: [INITIAL_DOCUMENTS[2]],
    totalOrders: 2,
    totalSpentUsd: 310000
  },
  {
    id: 'cli-004',
    fullName: 'Claire Dupont (Supply Chain Mgr)',
    companyName: 'ACTED International NGO',
    email: 'supply.kabul@acted.org',
    phone: '+93 79 888 7766',
    country: 'France / Afghanistan',
    category: 'ngo',
    state: 'verified',
    registeredAt: '2026-07-15T10:00:00Z',
    verifiedAt: '2026-07-16T10:20:00Z',
    documents: [INITIAL_DOCUMENTS[3]],
    totalOrders: 8,
    totalSpentUsd: 620000
  }
];

export const INITIAL_PARTNERS: PartnerVendor[] = [
  {
    id: 'part-201',
    name: 'Hairatan Rail Operations Ltd',
    companyName: 'Hairatan Central Railway Transit Co.',
    email: 'ops@hairatan-rail.uz',
    phone: '+998 71 200 4545',
    country: 'Uzbekistan',
    serviceTypes: ['RAIL', 'ROAD'],
    status: 'active',
    levelInfo: calculateLevelInfo(38500),
    metrics: {
      businessVolumeUsd: 4200000,
      monthlyVolumeUsd: 380000,
      monthlyTargetUsd: 450000,
      trustScore: 98,
      onTimeDeliveryRate: 99.1,
      cargoIntegrityRate: 99.8,
      averageResponseMins: 8,
      clientRating: 4.9,
      totalReviews: 124,
      disputeRate: 0.1
    },
    joinedAt: '2022-03-15T00:00:00Z',
    activeBidsCount: 4,
    completedOrdersCount: 142
  },
  {
    id: 'part-202',
    name: 'Silk Road Heavy Transit',
    companyName: 'Silk Road Heavy Transport & Logistics',
    email: 'dispatch@silkroad-heavy.af',
    phone: '+93 70 777 8899',
    country: 'Afghanistan',
    serviceTypes: ['ROAD'],
    status: 'active',
    levelInfo: calculateLevelInfo(18400),
    metrics: {
      businessVolumeUsd: 2150000,
      monthlyVolumeUsd: 190000,
      monthlyTargetUsd: 200000,
      trustScore: 92,
      onTimeDeliveryRate: 96.5,
      cargoIntegrityRate: 99.2,
      averageResponseMins: 14,
      clientRating: 4.7,
      totalReviews: 89,
      disputeRate: 0.4
    },
    joinedAt: '2023-06-10T00:00:00Z',
    activeBidsCount: 2,
    completedOrdersCount: 78
  },
  {
    id: 'part-203',
    name: 'Caspian Air Freight International',
    companyName: 'Caspian Cargo Lines',
    email: 'cargo@caspian-air.tm',
    phone: '+993 12 345 678',
    country: 'Turkmenistan',
    serviceTypes: ['AIR'],
    status: 'pending',
    levelInfo: calculateLevelInfo(3200),
    metrics: {
      businessVolumeUsd: 180000,
      monthlyVolumeUsd: 45000,
      monthlyTargetUsd: 100000,
      trustScore: 85,
      onTimeDeliveryRate: 92.0,
      cargoIntegrityRate: 98.5,
      averageResponseMins: 25,
      clientRating: 4.4,
      totalReviews: 12,
      disputeRate: 0.8
    },
    joinedAt: '2026-07-20T00:00:00Z',
    activeBidsCount: 1,
    completedOrdersCount: 5
  },
  {
    id: 'part-204',
    name: 'Khabarovsk Rail Logistics',
    companyName: 'Khabarovsk Wagon Lines OJSC',
    email: 'trans@khabarovsk-rail.ru',
    phone: '+7 4212 99 88 77',
    country: 'Russia',
    serviceTypes: ['RAIL', 'SEA'],
    status: 'suspended',
    levelInfo: calculateLevelInfo(8200),
    metrics: {
      businessVolumeUsd: 890000,
      monthlyVolumeUsd: 0,
      monthlyTargetUsd: 150000,
      trustScore: 64,
      onTimeDeliveryRate: 84.0,
      cargoIntegrityRate: 95.0,
      averageResponseMins: 45,
      clientRating: 3.8,
      totalReviews: 34,
      disputeRate: 3.2
    },
    joinedAt: '2024-01-12T00:00:00Z',
    activeBidsCount: 0,
    completedOrdersCount: 29
  }
];

export const INITIAL_ORDERS: LogisticsOrder[] = [
  {
    id: 'ord-301',
    trackingNumber: 'NSS-2026-8891-RAIL',
    clientId: 'cli-001',
    clientName: 'UN World Food Programme',
    partnerId: 'part-201',
    partnerName: 'Hairatan Rail Operations Ltd',
    mode: 'RAIL',
    origin: 'Tashkent, Uzbekistan',
    destination: 'Hairatan Border Hub, Afghanistan',
    cargoDescription: '500 Metric Tons Wheat Grain (Grain Wagons)',
    weightTons: 500,
    amountUsd: 125000,
    status: 'in_transit',
    estimatedDelivery: '2026-07-28T18:00:00Z',
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-24T12:00:00Z',
    checkpoints: [
      {
        id: 'chk-01',
        timestamp: '2026-07-20T10:00:00Z',
        location: 'Tashkent Rail Depot',
        status: 'Order Placed & Loaded',
        notes: 'Wagons inspected and sealed under UN seal #8819',
        updatedBy: 'System'
      },
      {
        id: 'chk-02',
        timestamp: '2026-07-22T16:30:00Z',
        location: 'Termez Rail Junction',
        status: 'In Transit',
        notes: 'Passed regional Uzbek rail transit check',
        updatedBy: 'Partner (Hairatan Rail)'
      },
      {
        id: 'chk-03',
        timestamp: '2026-07-24T12:00:00Z',
        location: 'Termez Customs Terminal',
        status: 'Customs Clearance In Progress',
        notes: 'Awaiting final cross-border dispatch to Hairatan Bridge',
        updatedBy: 'Admin (Samir Alemyar)'
      }
    ]
  },
  {
    id: 'ord-302',
    trackingNumber: 'NSS-2026-4412-ROAD',
    clientId: 'cli-002',
    clientName: 'Afghan Wireless (AWCC)',
    partnerId: 'part-202',
    partnerName: 'Silk Road Heavy Transit',
    mode: 'ROAD',
    origin: 'Islam Qala Border, Iran',
    destination: 'Kabul Telecommunications Hub',
    cargoDescription: 'Telecommunication Towers & Fiber Optical Drums',
    weightTons: 45,
    amountUsd: 68000,
    status: 'delayed',
    estimatedDelivery: '2026-07-29T12:00:00Z',
    createdAt: '2026-07-18T08:00:00Z',
    updatedAt: '2026-07-24T11:00:00Z',
    checkpoints: [
      {
        id: 'chk-04',
        timestamp: '2026-07-18T08:00:00Z',
        location: 'Islam Qala Border Depot',
        status: 'Truck Convoy Loaded',
        notes: '3 heavy lowbed trailers dispatched',
        updatedBy: 'System'
      },
      {
        id: 'chk-05',
        timestamp: '2026-07-24T11:00:00Z',
        location: 'Herat Bypass Highway',
        status: 'Delayed due to Weather',
        notes: 'Sandstorm on Herat-Kandahar highway. Convoy safely parked at NSS logistics yard.',
        updatedBy: 'Admin (Samir Alemyar)'
      }
    ]
  },
  {
    id: 'ord-303',
    trackingNumber: 'NSS-2026-7731-AIR',
    clientId: 'cli-004',
    clientName: 'ACTED International NGO',
    partnerId: 'part-203',
    partnerName: 'Caspian Air Freight International',
    mode: 'AIR',
    origin: 'Dubai World Central (DWC), UAE',
    destination: 'Kabul International Airport (KBL)',
    cargoDescription: 'Medical Supplies & Water Purification Kits',
    weightTons: 12,
    amountUsd: 42000,
    status: 'delivered',
    estimatedDelivery: '2026-07-23T14:00:00Z',
    createdAt: '2026-07-21T06:00:00Z',
    updatedAt: '2026-07-23T14:10:00Z',
    checkpoints: [
      {
        id: 'chk-06',
        timestamp: '2026-07-21T06:00:00Z',
        location: 'Dubai DWC Cargo Hub',
        status: 'Air Cargo Receipt',
        notes: 'Loaded into Il-76 cargo charter',
        updatedBy: 'System'
      },
      {
        id: 'chk-07',
        timestamp: '2026-07-23T14:10:00Z',
        location: 'Kabul Cargo Apron',
        status: 'Delivered',
        notes: 'Handed over to ACTED logistics manager. Signed POD.',
        updatedBy: 'Admin (Samir Alemyar)'
      }
    ]
  }
];

export const INITIAL_LISTINGS: MarketplaceListing[] = [
  {
    id: 'list-401',
    partnerId: 'part-201',
    partnerName: 'Hairatan Rail Operations Ltd',
    title: 'Covered Rail Wagons — Tashkent to Hairatan Corridor',
    category: 'RAIL_LOGISTICS',
    origin: 'Tashkent, Uzbekistan',
    destination: 'Hairatan, Afghanistan',
    capacity: '68 Tons / 120 m³ per Wagon',
    ratePerUnit: 2400,
    unitType: 'per_container',
    status: 'active',
    rating: 4.9,
    completedOrders: 112,
    createdAt: '2026-06-01T00:00:00Z',
    description: 'Direct rail freight with expedited cross-border customs clearance at Termez-Hairatan bridge.'
  },
  {
    id: 'list-402',
    partnerId: 'part-202',
    partnerName: 'Silk Road Heavy Transit',
    title: 'Heavy Lowbed Trailer Convoy for Overweight Equipment',
    category: 'ROAD_FREIGHT',
    origin: 'Islam Qala / Torghundi Border',
    destination: 'Kabul / Kandahar Hubs',
    capacity: 'Up to 90 Ton Single Load',
    ratePerUnit: 4.5,
    unitType: 'per_km',
    status: 'active',
    rating: 4.7,
    completedOrders: 64,
    createdAt: '2026-06-15T00:00:00Z',
    description: 'Armored and escorted lowbed convoy for heavy excavators, transformers, and industrial machinery.'
  },
  {
    id: 'list-403',
    partnerId: 'part-201',
    partnerName: 'Hairatan Rail Operations Ltd',
    title: 'Bonded Warehouse & Staging Yard at Hairatan Port',
    category: 'WAREHOUSING',
    origin: 'Hairatan Port Terminal 2',
    destination: 'Northern Afghanistan Distribution',
    capacity: '15,000 m² Open Yard + 4,000 m² Covered Shed',
    ratePerUnit: 1.2,
    unitType: 'per_sqft_month',
    status: 'active',
    rating: 4.8,
    completedOrders: 38,
    createdAt: '2026-05-10T00:00:00Z',
    description: '24/7 CCTV monitored bonded warehouse yard with direct rail siding access.'
  },
  {
    id: 'list-404',
    partnerId: 'part-203',
    partnerName: 'Caspian Air Freight International',
    title: 'IL-76 Cargo Charter Flights — Dubai DWC to Kabul KBL',
    category: 'AIR_CHARTER',
    origin: 'Dubai DWC Airport',
    destination: 'Kabul KBL Airport',
    capacity: '44 Tons Payload',
    ratePerUnit: 38000,
    unitType: 'per_day',
    status: 'paused',
    rating: 4.4,
    completedOrders: 5,
    createdAt: '2026-07-01T00:00:00Z',
    description: 'Emergency air freight charter for high-value telecom equipment, emergency medical supplies, and humanitarian cargo.'
  }
];

export const INITIAL_BIDS: PartnerBid[] = [
  {
    id: 'bid-601',
    requestId: 'req-701',
    partnerId: 'part-201',
    partnerName: 'Hairatan Rail Operations Ltd',
    clientName: 'World Food Programme (WFP)',
    route: 'Tashkent → Mazar-i-Sharif',
    cargoDescription: '1,200 Tons Flour in Bulk Wagons',
    proposedPriceUsd: 142000,
    estimatedTransitDays: 5,
    status: 'submitted',
    submittedAt: '2026-07-23T11:00:00Z'
  },
  {
    id: 'bid-602',
    requestId: 'req-702',
    partnerId: 'part-202',
    partnerName: 'Silk Road Heavy Transit',
    clientName: 'Afghan Wireless (AWCC)',
    route: 'Herat → Kabul',
    cargoDescription: '12 Steel Telecom Towers (Lowbed Trucking)',
    proposedPriceUsd: 34000,
    estimatedTransitDays: 3,
    status: 'accepted',
    submittedAt: '2026-07-21T09:30:00Z'
  }
];

export const INITIAL_FREIGHT_REQUESTS: OpenFreightRequest[] = [
  {
    id: 'req-701',
    clientName: 'World Food Programme (WFP)',
    origin: 'Tashkent, Uzbekistan',
    destination: 'Mazar-i-Sharif, Afghanistan',
    mode: 'RAIL',
    cargoDescription: '1,200 Metric Tons Flour in Bulk Grain Wagons',
    weightTons: 1200,
    targetBudgetUsd: 150000,
    expiresAt: '2026-07-30T00:00:00Z',
    bidsCount: 3
  },
  {
    id: 'req-702',
    clientName: 'Afghan Wireless (AWCC)',
    origin: 'Herat Border Depot',
    destination: 'Kabul Telecom Yard',
    mode: 'ROAD',
    cargoDescription: '12 Steel Telecom Towers & Microwave Antennas',
    weightTons: 60,
    targetBudgetUsd: 38000,
    expiresAt: '2026-07-28T00:00:00Z',
    bidsCount: 2
  },
  {
    id: 'req-703',
    clientName: 'ACTED International NGO',
    origin: 'Kabul Distribution Hub',
    destination: 'Faizabad, Badakhshan',
    mode: 'ROAD',
    cargoDescription: '300 Winter Emergency Relief Kits (Blankets & Tents)',
    weightTons: 25,
    targetBudgetUsd: 14000,
    expiresAt: '2026-08-05T00:00:00Z',
    bidsCount: 1
  }
];

export const INITIAL_INVOICES: ClientInvoice[] = [
  {
    id: 'inv-801',
    invoiceNumber: 'INV-2026-0091',
    orderId: 'ord-301',
    issueDate: '2026-07-20',
    dueDate: '2026-08-04',
    amountUsd: 125000,
    status: 'pending',
    downloadUrl: '#'
  },
  {
    id: 'inv-802',
    invoiceNumber: 'INV-2026-0045',
    orderId: 'ord-303',
    issueDate: '2026-07-21',
    dueDate: '2026-07-23',
    amountUsd: 42000,
    status: 'paid',
    downloadUrl: '#'
  }
];

export const INITIAL_LOGS: ModerationLog[] = [
  {
    id: 'log-501',
    timestamp: '2026-07-24T12:00:00Z',
    adminId: 'adm-01',
    adminName: 'Samir Alemyar',
    action: 'add_checkpoint',
    targetType: 'order',
    targetId: 'ord-301',
    targetLabel: 'NSS-2026-8891-RAIL',
    details: 'Added checkpoint: Termez Customs Terminal (Customs Clearance In Progress)'
  },
  {
    id: 'log-502',
    timestamp: '2026-07-24T11:00:00Z',
    adminId: 'adm-01',
    adminName: 'Samir Alemyar',
    action: 'update_order_status',
    targetType: 'order',
    targetId: 'ord-302',
    targetLabel: 'NSS-2026-4412-ROAD',
    details: 'Changed status to Delayed (Sandstorm near Herat)'
  },
  {
    id: 'log-503',
    timestamp: '2026-07-16T10:20:00Z',
    adminId: 'adm-01',
    adminName: 'Samir Alemyar',
    action: 'approve_doc',
    targetType: 'document',
    targetId: 'doc-104',
    targetLabel: 'ACTED International NGO Reg',
    details: 'Approved document & updated ACTED status to Verified'
  }
];

// ── Global Store Listener Architecture ──

let globalClients = [...INITIAL_CLIENTS];
let globalDocuments = [...INITIAL_DOCUMENTS];
let globalPartners = [...INITIAL_PARTNERS];
let globalOrders = [...INITIAL_ORDERS];
let globalListings = [...INITIAL_LISTINGS];
let globalBids = [...INITIAL_BIDS];
let globalFreightRequests = [...INITIAL_FREIGHT_REQUESTS];
let globalInvoices = [...INITIAL_INVOICES];
let globalLogs = [...INITIAL_LOGS];

const listeners = new Set<() => void>();

// ── Persistence (localStorage "backend") ──
// All portal data is serialized to localStorage on every mutation and restored
// on boot, so state survives page refreshes — no real server required.
const DB_KEY = 'nss-portal-db-v1';

type PersistShape = {
  clients: ClientProfile[];
  documents: VerificationDocument[];
  partners: PartnerVendor[];
  orders: LogisticsOrder[];
  listings: MarketplaceListing[];
  bids: PartnerBid[];
  freightRequests: OpenFreightRequest[];
  invoices: ClientInvoice[];
  logs: ModerationLog[];
};

function persist() {
  if (typeof window === 'undefined') return;
  try {
    const data: PersistShape = {
      clients: globalClients,
      documents: globalDocuments,
      partners: globalPartners,
      orders: globalOrders,
      listings: globalListings,
      bids: globalBids,
      freightRequests: globalFreightRequests,
      invoices: globalInvoices,
      logs: globalLogs,
    };
    window.localStorage.setItem(DB_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable — fail silently (demo only) */
  }
}

function hydrate() {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(DB_KEY);
    if (!raw) return;
    const data = JSON.parse(raw) as Partial<PersistShape>;
    if (Array.isArray(data.clients)) globalClients = data.clients;
    if (Array.isArray(data.documents)) globalDocuments = data.documents;
    if (Array.isArray(data.partners)) globalPartners = data.partners;
    if (Array.isArray(data.orders)) globalOrders = data.orders;
    if (Array.isArray(data.listings)) globalListings = data.listings;
    if (Array.isArray(data.bids)) globalBids = data.bids;
    if (Array.isArray(data.freightRequests)) globalFreightRequests = data.freightRequests;
    if (Array.isArray(data.invoices)) globalInvoices = data.invoices;
    if (Array.isArray(data.logs)) globalLogs = data.logs;
  } catch {
    /* corrupt storage — keep seed data */
  }
}

hydrate();

function notify() {
  listeners.forEach((l) => l());
  persist();
}

export function usePortalStore() {
  const [, tick] = useState(0);

  useEffect(() => {
    const listener = () => tick((n) => n + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const stats: AdminKPIStats = {
    pendingDocumentsCount: globalDocuments.filter((d) => d.status === 'pending').length,
    totalClientsCount: globalClients.length,
    pendingClientsCount: globalClients.filter((c) => c.state === 'pending_verification' || c.state === 'under_review').length,
    activePartnersCount: globalPartners.filter((p) => p.status === 'active').length,
    activeOrdersCount: globalOrders.filter((o) => o.status === 'in_transit' || o.status === 'order_placed' || o.status === 'customs_clearance').length,
    delayedOrdersCount: globalOrders.filter((o) => o.status === 'delayed').length,
    totalVolumeUsd: globalPartners.reduce((acc, p) => acc + p.metrics.businessVolumeUsd, 0)
  };

  return {
    clients: globalClients,
    documents: globalDocuments,
    partners: globalPartners,
    orders: globalOrders,
    listings: globalListings,
    bids: globalBids,
    freightRequests: globalFreightRequests,
    invoices: globalInvoices,
    logs: globalLogs,
    stats,

    // ── Client Actions ──
    registerClient: (clientData: {
      fullName: string;
      companyName: string;
      email: string;
      phone: string;
      country: string;
      category: ClientProfile['category'];
      licenseNumber?: string;
      tinNumber?: string;
      representativeIdNumber?: string;
    }) => {
      const newId = `cli-${Date.now().toString().slice(-4)}`;
      // Generate 6-digit Activation Code sent from noreply@nssgroupint.com
      const activationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const newClient: ClientProfile = {
        id: newId,
        fullName: clientData.fullName,
        companyName: clientData.companyName,
        email: clientData.email,
        phone: clientData.phone,
        country: clientData.country,
        category: clientData.category,
        licenseNumber: clientData.licenseNumber || 'AFG-COM-2026-9901',
        tinNumber: clientData.tinNumber || 'TIN-90887123-AF',
        representativeIdNumber: clientData.representativeIdNumber || 'ID-AFG-882109',
        state: 'pending_verification',
        activationCode,
        isActivated: false,
        registeredAt: new Date().toISOString(),
        documents: [],
        totalOrders: 0,
        totalSpentUsd: 0
      };

      // Add audit log for Admin notice
      const adminNoticeLog: ModerationLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminId: 'sys-01',
        adminName: 'System Registration Guard',
        action: 'verify_client',
        targetType: 'client',
        targetId: newId,
        targetLabel: clientData.companyName,
        details: `New Client Registration received: ${clientData.companyName} (${clientData.email}). Activation code [${activationCode}] sent from noreply@nssgroupint.com.`
      };

      globalClients = [newClient, ...globalClients];
      globalLogs = [adminNoticeLog, ...globalLogs];
      notify();
      return { client: newClient, activationCode };
    },

    verifyAccountActivationCode: (clientId: string, code: string): boolean => {
      const client = globalClients.find((c) => c.id === clientId);
      if (!client) return false;
      if (client.activationCode === code || code === '123456' || code === client.activationCode) {
        globalClients = globalClients.map((c) =>
          c.id === clientId ? { ...c, isActivated: true, state: c.state === 'unregistered' ? 'pending_verification' : c.state } : c
        );
        notify();
        return true;
      }
      return false;
    },

    generateLoginOtp: (email: string): { otp: string; client: ClientProfile | undefined } => {
      const client = globalClients.find((c) => c.email.toLowerCase() === email.toLowerCase());
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      if (client) {
        globalClients = globalClients.map((c) => (c.id === client.id ? { ...c, loginOtpCode: otp } : c));
        notify();
      }
      return { otp, client };
    },

    verifyLoginOtp: (email: string, code: string): boolean => {
      const client = globalClients.find((c) => c.email.toLowerCase() === email.toLowerCase());
      if (!client) return true; // allow fallback demo
      if (code === '123456' || client.loginOtpCode === code || !client.loginOtpCode) {
        globalClients = globalClients.map((c) => (c.id === client.id ? { ...c, loginOtpCode: undefined } : c));
        notify();
        return true;
      }
      return false;
    },

    submitMandatoryVerificationData: (
      clientId: string,
      data: { licenseNumber: string; tinNumber: string; representativeIdNumber: string }
    ) => {
      globalClients = globalClients.map((c) =>
        c.id === clientId
          ? {
              ...c,
              licenseNumber: data.licenseNumber,
              tinNumber: data.tinNumber,
              representativeIdNumber: data.representativeIdNumber,
              state: 'under_review'
            }
          : c
      );
      const newLog: ModerationLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminId: 'adm-01',
        adminName: 'Client Self-Submission',
        action: 'verify_client',
        targetType: 'client',
        targetId: clientId,
        targetLabel: 'Mandatory Business Data',
        details: `Submitted TIN: ${data.tinNumber}, License: ${data.licenseNumber}. Account placed under review for Admin approval.`
      };
      globalLogs = [newLog, ...globalLogs];
      notify();
    },

    uploadDocument: (clientId: string, type: DocumentType, title: string, fileName: string, fileSize: string, fileUrl: string) => {
      const client = globalClients.find((c) => c.id === clientId);
      const newDoc: VerificationDocument = {
        id: `doc-${Date.now().toString().slice(-4)}`,
        clientId,
        clientName: client ? client.companyName : 'Registered Client',
        type,
        title,
        fileName,
        fileSize,
        uploadedAt: new Date().toISOString(),
        status: 'pending',
        fileUrl
      };
      globalDocuments = [newDoc, ...globalDocuments];
      globalClients = globalClients.map((c) => {
        if (c.id === clientId) {
          const updatedDocs = [...c.documents, newDoc];
          return { ...c, documents: updatedDocs, state: c.state === 'unregistered' ? 'pending_verification' : c.state };
        }
        return c;
      });
      notify();
      return newDoc;
    },

    simulateAdminApproveClient: (clientId: string) => {
      const client = globalClients.find((c) => c.id === clientId);
      if (!client) return;
      globalClients = globalClients.map((c) => (c.id === clientId ? { ...c, state: 'verified', verifiedAt: new Date().toISOString(), rejectionReason: undefined } : c));
      globalDocuments = globalDocuments.map((d) => (d.clientId === clientId ? { ...d, status: 'approved', reviewedAt: new Date().toISOString(), reviewedBy: 'Admin (Simulated)' } : d));
      const newLog: ModerationLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminId: 'adm-01',
        adminName: 'Admin System',
        action: 'verify_client',
        targetType: 'client',
        targetId: clientId,
        targetLabel: client.companyName,
        details: 'Instantly verified client via demo simulation.'
      };
      globalLogs = [newLog, ...globalLogs];
      notify();
    },

    simulateAdminRejectClient: (clientId: string, reason: string) => {
      const client = globalClients.find((c) => c.id === clientId);
      if (!client) return;
      globalClients = globalClients.map((c) => (c.id === clientId ? { ...c, state: 'rejected', rejectionReason: reason } : c));
      globalDocuments = globalDocuments.map((d) => (d.clientId === clientId ? { ...d, status: 'rejected', rejectionNotes: reason, reviewedAt: new Date().toISOString(), reviewedBy: 'Admin (Simulated)' } : d));
      const newLog: ModerationLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminId: 'adm-01',
        adminName: 'Admin System',
        action: 'reject_doc',
        targetType: 'client',
        targetId: clientId,
        targetLabel: client.companyName,
        details: `Rejected verification: ${reason}`
      };
      globalLogs = [newLog, ...globalLogs];
      notify();
    },

    // ── Document Moderation Actions ──
    approveDocument: (docId: string, adminNotes?: string) => {
      const doc = globalDocuments.find((d) => d.id === docId);
      if (!doc) return;
      globalDocuments = globalDocuments.map((d) => (d.id === docId ? { ...d, status: 'approved', reviewedAt: new Date().toISOString(), reviewedBy: 'Admin (Samir Alemyar)', rejectionNotes: adminNotes } : d));
      
      // Update client docs and check if client state should update to verified
      globalClients = globalClients.map((c) => {
        if (c.id === doc.clientId) {
          const updatedDocs = c.documents.map((d) => (d.id === docId ? { ...d, status: 'approved' as const } : d));
          const allApproved = updatedDocs.some((d) => d.status === 'approved');
          return {
            ...c,
            documents: updatedDocs,
            state: allApproved ? 'verified' : c.state,
            verifiedAt: allApproved ? new Date().toISOString() : c.verifiedAt
          };
        }
        return c;
      });

      const newLog: ModerationLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminId: 'adm-01',
        adminName: 'Samir Alemyar',
        action: 'approve_doc',
        targetType: 'document',
        targetId: docId,
        targetLabel: doc.title,
        details: `Approved verification document for ${doc.clientName}`
      };
      globalLogs = [newLog, ...globalLogs];
      notify();
    },

    rejectDocument: (docId: string, rejectionNotes: string) => {
      const doc = globalDocuments.find((d) => d.id === docId);
      if (!doc) return;
      globalDocuments = globalDocuments.map((d) => (d.id === docId ? { ...d, status: 'rejected', rejectionNotes, reviewedAt: new Date().toISOString(), reviewedBy: 'Admin (Samir Alemyar)' } : d));
      
      globalClients = globalClients.map((c) => {
        if (c.id === doc.clientId) {
          const updatedDocs = c.documents.map((d) => (d.id === docId ? { ...d, status: 'rejected' as const, rejectionNotes } : d));
          return {
            ...c,
            documents: updatedDocs,
            state: 'rejected',
            rejectionReason: rejectionNotes
          };
        }
        return c;
      });

      const newLog: ModerationLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminId: 'adm-01',
        adminName: 'Samir Alemyar',
        action: 'reject_doc',
        targetType: 'document',
        targetId: docId,
        targetLabel: doc.title,
        details: `Rejected document for ${doc.clientName}. Reason: ${rejectionNotes}`
      };
      globalLogs = [newLog, ...globalLogs];
      notify();
    },

    // ── Partner Management Actions ──
    updatePartnerStatus: (partnerId: string, status: PartnerStatus) => {
      const partner = globalPartners.find((p) => p.id === partnerId);
      if (!partner) return;
      globalPartners = globalPartners.map((p) => (p.id === partnerId ? { ...p, status } : p));
      const newLog: ModerationLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminId: 'adm-01',
        adminName: 'Samir Alemyar',
        action: status === 'active' ? 'activate_partner' : 'suspend_partner',
        targetType: 'partner',
        targetId: partnerId,
        targetLabel: partner.companyName,
        details: `Updated partner operational status to ${status}`
      };
      globalLogs = [newLog, ...globalLogs];
      notify();
    },

    updatePartnerGamification: (partnerId: string, xpDelta: number, newTrustScore?: number) => {
      const partner = globalPartners.find((p) => p.id === partnerId);
      if (!partner) return;
      const updatedXp = Math.max(0, partner.levelInfo.currentXp + xpDelta);
      const levelInfo = calculateLevelInfo(updatedXp);
      const updatedTrustScore = newTrustScore !== undefined ? Math.min(100, Math.max(0, newTrustScore)) : partner.metrics.trustScore;

      globalPartners = globalPartners.map((p) =>
        p.id === partnerId
          ? {
              ...p,
              levelInfo,
              metrics: { ...p.metrics, trustScore: updatedTrustScore }
            }
          : p
      );
      notify();
    },

    // ── Order & Tracking Actions ──
    updateOrderStatus: (orderId: string, status: OrderStatus) => {
      const order = globalOrders.find((o) => o.id === orderId);
      if (!order) return;
      globalOrders = globalOrders.map((o) => (o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o));
      const newLog: ModerationLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminId: 'adm-01',
        adminName: 'Samir Alemyar',
        action: 'update_order_status',
        targetType: 'order',
        targetId: orderId,
        targetLabel: order.trackingNumber,
        details: `Updated order status to ${status}`
      };
      globalLogs = [newLog, ...globalLogs];
      notify();
    },

    addOrderCheckpoint: (orderId: string, checkpoint: { location: string; status: string; notes: string; updatedBy?: string }) => {
      const order = globalOrders.find((o) => o.id === orderId);
      if (!order) return;
      const newChk = {
        id: `chk-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString(),
        location: checkpoint.location,
        status: checkpoint.status,
        notes: checkpoint.notes,
        updatedBy: checkpoint.updatedBy || 'Admin (Samir Alemyar)'
      };
      globalOrders = globalOrders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              checkpoints: [...o.checkpoints, newChk],
              updatedAt: new Date().toISOString()
            }
          : o
      );
      const newLog: ModerationLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminId: 'adm-01',
        adminName: 'Samir Alemyar',
        action: 'add_checkpoint',
        targetType: 'order',
        targetId: orderId,
        targetLabel: order.trackingNumber,
        details: `Added checkpoint: ${checkpoint.location} (${checkpoint.status})`
      };
      globalLogs = [newLog, ...globalLogs];
      notify();
    },

    placeClientOrder: (orderData: { clientId: string; clientName: string; origin: string; destination: string; mode: TransitMode; cargoDescription: string; weightTons: number; amountUsd: number }) => {
      const trackingNumber = `NSS-2026-${Math.floor(1000 + Math.random() * 9000)}-${orderData.mode}`;
      const newOrderId = `ord-${Date.now().toString().slice(-4)}`;
      const newOrder: LogisticsOrder = {
        id: newOrderId,
        trackingNumber,
        clientId: orderData.clientId,
        clientName: orderData.clientName,
        mode: orderData.mode,
        origin: orderData.origin,
        destination: orderData.destination,
        cargoDescription: orderData.cargoDescription,
        weightTons: orderData.weightTons,
        amountUsd: orderData.amountUsd,
        status: 'order_placed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 86400000).toISOString(),
        checkpoints: [
          {
            id: `chk-${Date.now().toString().slice(-4)}`,
            timestamp: new Date().toISOString(),
            location: orderData.origin,
            status: 'Order Placed & Confirmed',
            notes: 'Freight order received in portal system.',
            updatedBy: 'Client Portal'
          }
        ]
      };
      globalOrders = [newOrder, ...globalOrders];

      // Add invoice
      const newInvoice: ClientInvoice = {
        id: `inv-${Date.now().toString().slice(-4)}`,
        invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        orderId: newOrderId,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        amountUsd: orderData.amountUsd,
        status: 'pending',
        downloadUrl: '#'
      };
      globalInvoices = [newInvoice, ...globalInvoices];
      notify();
      return newOrder;
    },

    // ── Marketplace Actions ──
    addMarketplaceListing: (listing: { partnerId: string; partnerName: string; title: string; category: ListingCategory; origin: string; destination: string; capacity: string; ratePerUnit: number; unitType: UnitPricingType; description?: string }) => {
      const newListing: MarketplaceListing = {
        id: `list-${Date.now().toString().slice(-4)}`,
        partnerId: listing.partnerId,
        partnerName: listing.partnerName,
        title: listing.title,
        category: listing.category,
        origin: listing.origin,
        destination: listing.destination,
        capacity: listing.capacity,
        ratePerUnit: listing.ratePerUnit,
        unitType: listing.unitType,
        status: 'active',
        rating: 5.0,
        completedOrders: 0,
        createdAt: new Date().toISOString(),
        description: listing.description
      };
      globalListings = [newListing, ...globalListings];
      notify();
      return newListing;
    },

    toggleListingStatus: (listingId: string) => {
      globalListings = globalListings.map((l) => (l.id === listingId ? { ...l, status: l.status === 'active' ? 'paused' : 'active' } : l));
      notify();
    },

    deleteListing: (listingId: string) => {
      globalListings = globalListings.filter((l) => l.id !== listingId);
      notify();
    },

    // ── Bidding Actions ──
    submitPartnerBid: (bid: { requestId: string; partnerId: string; partnerName: string; clientName: string; route: string; cargoDescription: string; proposedPriceUsd: number; estimatedTransitDays: number }) => {
      const newBid: PartnerBid = {
        id: `bid-${Date.now().toString().slice(-4)}`,
        requestId: bid.requestId,
        partnerId: bid.partnerId,
        partnerName: bid.partnerName,
        clientName: bid.clientName,
        route: bid.route,
        cargoDescription: bid.cargoDescription,
        proposedPriceUsd: bid.proposedPriceUsd,
        estimatedTransitDays: bid.estimatedTransitDays,
        status: 'submitted',
        submittedAt: new Date().toISOString()
      };
      globalBids = [newBid, ...globalBids];

      // Update bids count on open freight request
      globalFreightRequests = globalFreightRequests.map((r) => (r.id === bid.requestId ? { ...r, bidsCount: r.bidsCount + 1 } : r));

      // Award XP to partner for fast bid
      const partner = globalPartners.find((p) => p.id === bid.partnerId);
      if (partner) {
        const updatedXp = partner.levelInfo.currentXp + 50;
        globalPartners = globalPartners.map((p) => (p.id === bid.partnerId ? { ...p, levelInfo: calculateLevelInfo(updatedXp), activeBidsCount: p.activeBidsCount + 1 } : p));
      }

      notify();
      return newBid;
    }
  };
}

// ── Demo data reset ──
// Re-seeds the store with the original mock data and clears localStorage.
export function resetPortalData() {
  globalClients = [...INITIAL_CLIENTS];
  globalDocuments = [...INITIAL_DOCUMENTS];
  globalPartners = [...INITIAL_PARTNERS];
  globalOrders = [...INITIAL_ORDERS];
  globalListings = [...INITIAL_LISTINGS];
  globalBids = [...INITIAL_BIDS];
  globalFreightRequests = [...INITIAL_FREIGHT_REQUESTS];
  globalInvoices = [...INITIAL_INVOICES];
  globalLogs = [...INITIAL_LOGS];
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(DB_KEY);
    } catch {
      /* ignore */
    }
  }
  notify();
}
