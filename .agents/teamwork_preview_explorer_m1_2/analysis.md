# Admin Portal (`/admin`) UI Component Hierarchy, Data Models & State Architecture

**Author**: Explorer 2 (Milestone 1 — Exploration & Data Architecture)  
**Target Path**: `d:\Projects\NSS\app\.agents\teamwork_preview_explorer_m1_2\analysis.md`  
**Date**: 2026-07-24  

---

## 1. Executive Overview & Scope

The **Admin Portal** (`/admin`) serves as the central control room for NSS Group operations. It enables platform moderators and system administrators to manage partner vendors, client user verification, multimodal cargo orders, real-time shipment tracking, and compliance document verification workflows.

### Key Capabilities Required:
1. **Moderation Dashboard**: High-level KPI metrics, real-time moderation alert queues, system activity feed, and pending task indicators.
2. **Partner Vendor Management**: List, search, filter, adjust gamification metrics (Level/XP, Trust Score, Business Volume), and manage operational status (`active`, `pending`, `suspended`).
3. **Client Account Management**: Client directory with status filtering (`unregistered`, `pending_verification`, `verified`, `rejected`), category tags (UN/NGO, Private, Government), and detail drawer for client profiles.
4. **Orders & Tracking Info Management**: Multimodal shipment table (`ROAD`, `RAIL`, `AIR`, `SEA`), origin/destination filters, real-time tracking status editor, and timeline checkpoint manager dialog.
5. **Document Verification UI (Approval/Rejection)**: Specialized moderation queue for reviewing submitted identity/legal compliance documents (e.g. Business License, Tax ID, Passport/NID, Customs Auth) with document preview, one-click approval, and structured rejection reasons.

---

## 2. UI Component Hierarchy & Architecture

The Admin Portal is structured around a tabbed single-page application dashboard using shadcn/ui components (`Table`, `Tabs`, `Card`, `Dialog`, `Sheet`, `Badge`, `Select`, `Input`, `Button`, `DropdownMenu`, `Sonner` toasts).

```
src/
├── pages/
│   └── AdminPortal.tsx                    # Main Route Component (/admin)
└── components/
    └── portals/
        ├── AdminHeader.tsx                # Portal Header with quick stats, tabs, search & dark/light theme indicator
        ├── AdminDashboard.tsx             # Overview moderation dashboard & KPI cards
        ├── admin/
        │   ├── ModerationAlerts.tsx       # Pending approvals alert bar & quick action stream
        │   ├── PartnersList.tsx           # Partner vendors table with tier badges & edit drawer
        │   ├── PartnerDetailSheet.tsx     # Partner details, level adjustment, status modal
        │   ├── ClientsList.tsx            # Client directory with verification status badges
        │   ├── ClientDetailSheet.tsx      # Client profile view & order history
        │   ├── OrdersManagement.tsx       # Multimodal cargo orders & tracking management table
        │   ├── CheckpointEditorDialog.tsx # Tracking checkpoint & location update dialog
        │   ├── DocumentVerification.tsx   # Document review queue (grid/list mode)
        │   └── DocumentPreviewModal.tsx   # Document viewer with pass/reject decision tools
        └── shared/
            └── StatusBadge.tsx            # Standardized status badge component across portals
```

### Component Breakdown & Responsibilities

| Component | Responsibility & Features | Key UI Primitives Used |
|---|---|---|
| `AdminPortal.tsx` | Entry route page, manages active tab state (`overview`, `documents`, `partners`, `clients`, `orders`), wraps with portal container. | `Tabs`, `Container` |
| `AdminHeader.tsx` | Top banner with page title, search bar, active tab list, pending moderation counter badge, and refresh trigger. | `TabsList`, `TabsTrigger`, `Input`, `Badge`, `Button` |
| `AdminDashboard.tsx` | Overview moderation dashboard: KPI cards (Pending Docs, Active Partners, Verified Clients, Active Shipments), recent moderation log stream, quick approval queue. | `Card`, `CardContent`, `CardHeader`, `Progress`, `Button` |
| `PartnersList.tsx` | Interactive data table of logistics partners. Filter by status (`active`, `pending`, `suspended`), service mode, level. Sort by XP, volume, trust score. | `Table`, `TableHeader`, `TableRow`, `TableCell`, `Badge`, `Select`, `Input` |
| `PartnerDetailSheet.tsx` | Slide-over drawer displaying partner metrics, active bids/contracts, level badge override, and status update actions. | `Sheet`, `SheetContent`, `SheetHeader`, `Button`, `Badge` |
| `ClientsList.tsx` | Data table of registered clients. Filter by status (`unregistered`, `pending_verification`, `verified`, `rejected`) and category (UN, NGO, Private, Gov). | `Table`, `TableHeader`, `TableRow`, `TableCell`, `Badge`, `Input`, `Select` |
| `ClientDetailSheet.tsx` | Drawer showing client registration detail, attached documents, total spent, order history, and manually verify button. | `Sheet`, `SheetContent`, `SheetHeader`, `Tabs` |
| `OrdersManagement.tsx` | Comprehensive logistics table listing tracking #, client, assigned partner, mode (`ROAD`, `RAIL`, `AIR`, `SEA`), status, origin/destination. | `Table`, `TableHeader`, `TableRow`, `TableCell`, `Badge`, `DropdownMenu` |
| `CheckpointEditorDialog.tsx` | Dialog form to add location updates/checkpoints to an order, update estimated delivery, and set status to `in_transit`, `delayed`, `customs_clearance`, `delivered`. | `Dialog`, `DialogContent`, `DialogHeader`, `Form`, `Input`, `Select`, `Textarea` |
| `DocumentVerification.tsx` | Moderation queue for client identity/compliance documents. Displays pending documents with quick review buttons and status filters. | `Card`, `Badge`, `Button`, `Tabs`, `Select` |
| `DocumentPreviewModal.tsx` | Modal view for reviewing document image/pdf file, displaying client details, and performing Approve / Reject action with structured rejection reasons. | `Dialog`, `DialogContent`, `Textarea`, `Select`, `Button` |

---

## 3. Data Models & TypeScript Interfaces

The following TypeScript definitions govern the Admin Portal data architecture. They will be exported from `src/types/portal.ts` or `src/data/adminMockData.ts`.

```typescript
// src/types/portal.ts

/** Admin role types */
export type AdminRole = 'super_admin' | 'moderator' | 'support'

/** Document verification types */
export type DocumentType = 'business_license' | 'tax_id' | 'passport_id' | 'customs_authorization'
export type DocumentStatus = 'pending' | 'approved' | 'rejected'

export interface DocumentVerificationItem {
  id: string
  clientId: string
  clientName: string
  clientEmail: string
  clientCategory: 'un_agency' | 'ngo' | 'private' | 'government'
  docType: DocumentType
  docTitle: string
  fileUrl: string
  fileName: string
  fileSize: string
  status: DocumentStatus
  rejectionReason?: string
  adminNotes?: string
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
}

/** Client verification and account state */
export type ClientStatus = 'unregistered' | 'pending_verification' | 'verified' | 'rejected'
export type ClientCategory = 'un_agency' | 'ngo' | 'private' | 'government'

export interface ClientAccount {
  id: string
  name: string
  email: string
  companyName: string
  category: ClientCategory
  status: ClientStatus
  phone: string
  country: string
  registeredAt: string
  verifiedAt?: string
  totalOrders: number
  totalSpentUsd: number
  documents: DocumentVerificationItem[]
}

/** Partner vendor level & status */
export type TransitMode = 'ROAD' | 'RAIL' | 'AIR' | 'SEA'
export type PartnerStatus = 'active' | 'pending' | 'suspended'

export interface PartnerVendor {
  id: string
  name: string
  companyName: string
  email: string
  phone: string
  country: string
  serviceTypes: TransitMode[]
  status: PartnerStatus
  level: number
  levelTitle: string
  xp: number
  businessVolumeUsd: number
  trustScore: number // 0 to 100
  joinedAt: string
  activeBidsCount: number
  completedOrdersCount: number
}

/** Logistics order and tracking models */
export type OrderStatus =
  | 'order_placed'
  | 'in_transit'
  | 'customs_clearance'
  | 'delivered'
  | 'delayed'
  | 'cancelled'

export interface TrackingCheckpoint {
  id: string
  timestamp: string
  location: string
  status: string
  notes: string
  updatedBy: string
}

export interface LogisticsOrder {
  id: string
  trackingNumber: string
  clientId: string
  clientName: string
  partnerId?: string
  partnerName?: string
  mode: TransitMode
  origin: string
  destination: string
  cargoDescription: string
  weightTons: number
  status: OrderStatus
  checkpoints: TrackingCheckpoint[]
  estimatedDelivery: string
  createdAt: string
  updatedAt: string
}

/** Moderation audit log entry */
export interface ModerationLog {
  id: string
  timestamp: string
  adminId: string
  adminName: string
  action: 'approve_doc' | 'reject_doc' | 'verify_client' | 'suspend_partner' | 'activate_partner' | 'update_order_status' | 'add_checkpoint'
  targetType: 'document' | 'client' | 'partner' | 'order'
  targetId: string
  targetLabel: string
  details: string
}

/** Admin Summary KPI Metrics */
export interface AdminKPIStats {
  pendingDocumentsCount: number
  totalClientsCount: number
  pendingClientsCount: number
  activePartnersCount: number
  activeOrdersCount: number
  delayedOrdersCount: number
  totalVolumeUsd: number
}
```

---

## 4. State Handling & Mutation Architecture

To enable interactive UI workflows in the frontend without requiring a backend API, state is managed via React Context / Custom Hook (`useAdminStore` or `AdminPortalContext`).

```typescript
// Concept State Interface for Admin Context / Hook
export interface AdminStoreState {
  documents: DocumentVerificationItem[]
  clients: ClientAccount[]
  partners: PartnerVendor[]
  orders: LogisticsOrder[]
  logs: ModerationLog[]
  
  // Action Handlers
  approveDocument: (docId: string, adminNotes?: string) => void
  rejectDocument: (docId: string, reason: string, adminNotes?: string) => void
  updateClientStatus: (clientId: string, status: ClientStatus) => void
  updatePartnerStatus: (partnerId: string, status: PartnerStatus) => void
  updatePartnerGamification: (partnerId: string, xpDelta: number, trustScore: number) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  addOrderCheckpoint: (orderId: string, checkpoint: Omit<TrackingCheckpoint, 'id'>) => void
}
```

### Action Workflows

1. **Document Approval Workflow**:
   - Admin views `DocumentVerification.tsx` or opens `DocumentPreviewModal.tsx`.
   - Admin clicks "Approve".
   - State mutation: Update document status to `'approved'`, set `reviewedAt` and `reviewedBy`.
   - Automatic cascade: Check if all required documents for `clientId` are approved. If so, automatically update client account status from `'pending_verification'` to `'verified'`.
   - Toast alert: `toast.success("Document approved successfully. Client status updated to Verified.")`.
   - Audit Log: Add new entry to `logs`.

2. **Document Rejection Workflow**:
   - Admin selects structured rejection reason (e.g., "Illegible Document", "Expired License", "Tax ID Mismatch", "Invalid Seal/Signature") and optional admin notes.
   - Admin clicks "Confirm Rejection".
   - State mutation: Update document status to `'rejected'`, store `rejectionReason` and `adminNotes`. Update client status to `'rejected'`.
   - Toast alert: `toast.error("Document rejected. Notification sent to client.")`.
   - Audit Log: Log rejection action.

3. **Order & Tracking Update Workflow**:
   - Admin selects an order in `OrdersManagement.tsx` and clicks "Update Tracking".
   - Opens `CheckpointEditorDialog.tsx`. Admin submits new checkpoint (e.g. Location: "Hairatan Border Customs", Status: "Customs Clearance In Progress").
   - State mutation: Append checkpoint to `order.checkpoints`, update `order.status` and `order.updatedAt`.
   - Toast alert: `toast.info("Shipment checkpoint added: Hairatan Border")`.

---

## 5. Comprehensive Mock Data Sets

Below is the concrete TypeScript mock data structure ready to be embedded into `src/data/adminMockData.ts`.

```typescript
import type {
  DocumentVerificationItem,
  ClientAccount,
  PartnerVendor,
  LogisticsOrder,
  ModerationLog,
  AdminKPIStats
} from '@/types/portal'

export const MOCK_ADMIN_KPIS: AdminKPIStats = {
  pendingDocumentsCount: 3,
  totalClientsCount: 24,
  pendingClientsCount: 3,
  activePartnersCount: 18,
  activeOrdersCount: 12,
  delayedOrdersCount: 1,
  totalVolumeUsd: 14850000
}

export const MOCK_DOCUMENT_VERIFICATIONS: DocumentVerificationItem[] = [
  {
    id: 'doc-101',
    clientId: 'cli-001',
    clientName: 'World Food Programme (WFP Afghanistan)',
    clientEmail: 'procurement.kabul@wfp.org',
    clientCategory: 'un_agency',
    docType: 'customs_authorization',
    docTitle: 'UN Humanitarian Relief Freight Exemption Cert',
    fileUrl: '/docs/wfp_customs_cert_2026.pdf',
    fileName: 'wfp_customs_cert_2026.pdf',
    fileSize: '2.4 MB',
    status: 'pending',
    submittedAt: '2026-07-22T09:30:00Z'
  },
  {
    id: 'doc-102',
    clientId: 'cli-002',
    clientName: 'Afghan Wireless Communication Co. (AWCC)',
    clientEmail: 'logistics@afghan-wireless.com',
    clientCategory: 'private',
    docType: 'business_license',
    docTitle: 'AISA Commercial Business License 2026',
    fileUrl: '/docs/awcc_aisa_license.pdf',
    fileName: 'awcc_aisa_license.pdf',
    fileSize: '1.8 MB',
    status: 'pending',
    submittedAt: '2026-07-23T14:15:00Z'
  },
  {
    id: 'doc-103',
    clientId: 'cli-003',
    clientName: 'Ministry of Public Works (MoPW)',
    clientEmail: 'transport@mopw.gov.af',
    clientCategory: 'government',
    docType: 'tax_id',
    docTitle: 'Government Ministry Tax Registration Certificate',
    fileUrl: '/docs/mopw_tin_cert.pdf',
    fileName: 'mopw_tin_cert.pdf',
    fileSize: '1.1 MB',
    status: 'pending',
    submittedAt: '2026-07-24T08:00:00Z'
  },
  {
    id: 'doc-104',
    clientId: 'cli-004',
    clientName: 'ACTED International NGO',
    clientEmail: 'supply.kabul@acted.org',
    clientCategory: 'ngo',
    docType: 'business_license',
    docTitle: 'NGO Registration Certificate - Ministry of Economy',
    fileUrl: '/docs/acted_ngo_reg.pdf',
    fileName: 'acted_ngo_reg.pdf',
    fileSize: '3.0 MB',
    status: 'approved',
    submittedAt: '2026-07-15T11:00:00Z',
    reviewedAt: '2026-07-16T10:20:00Z',
    reviewedBy: 'Admin (Samir Alemyar)'
  }
]

export const MOCK_CLIENT_ACCOUNTS: ClientAccount[] = [
  {
    id: 'cli-001',
    name: 'WFP Afghanistan',
    email: 'procurement.kabul@wfp.org',
    companyName: 'UN World Food Programme',
    category: 'un_agency',
    status: 'pending_verification',
    phone: '+93 70 123 4567',
    country: 'Afghanistan',
    registeredAt: '2026-07-22T09:00:00Z',
    totalOrders: 14,
    totalSpentUsd: 1250000,
    documents: [MOCK_DOCUMENT_VERIFICATIONS[0]]
  },
  {
    id: 'cli-002',
    name: 'Afghan Wireless',
    email: 'logistics@afghan-wireless.com',
    companyName: 'Afghan Wireless Communication Company',
    category: 'private',
    status: 'pending_verification',
    phone: '+93 78 900 1122',
    country: 'Afghanistan',
    registeredAt: '2026-07-23T14:00:00Z',
    totalOrders: 5,
    totalSpentUsd: 480000,
    documents: [MOCK_DOCUMENT_VERIFICATIONS[1]]
  },
  {
    id: 'cli-003',
    name: 'Ministry of Public Works',
    email: 'transport@mopw.gov.af',
    companyName: 'Ministry of Public Works - GIROA',
    category: 'government',
    status: 'pending_verification',
    phone: '+93 75 444 3322',
    country: 'Afghanistan',
    registeredAt: '2026-07-24T07:45:00Z',
    totalOrders: 2,
    totalSpentUsd: 310000,
    documents: [MOCK_DOCUMENT_VERIFICATIONS[2]]
  },
  {
    id: 'cli-004',
    name: 'ACTED International',
    email: 'supply.kabul@acted.org',
    companyName: 'ACTED NGO',
    category: 'ngo',
    status: 'verified',
    phone: '+93 79 888 7766',
    country: 'France / Afghanistan',
    registeredAt: '2026-07-15T10:00:00Z',
    verifiedAt: '2026-07-16T10:20:00Z',
    totalOrders: 8,
    totalSpentUsd: 620000,
    documents: [MOCK_DOCUMENT_VERIFICATIONS[3]]
  }
]

export const MOCK_PARTNER_VENDORS: PartnerVendor[] = [
  {
    id: 'part-201',
    name: 'Hairatan Rail Operations Ltd',
    companyName: 'Hairatan Central Railway Transit Co.',
    email: 'ops@hairatan-rail.uz',
    phone: '+998 71 200 4545',
    country: 'Uzbekistan',
    serviceTypes: ['RAIL', 'ROAD'],
    status: 'active',
    level: 4,
    levelTitle: 'Corridor Master',
    xp: 8450,
    businessVolumeUsd: 4200000,
    trustScore: 98,
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
    serviceTypes: ['ROAD', 'CONSTRUCTION'],
    status: 'active',
    level: 3,
    levelTitle: 'Fleet Specialist',
    xp: 5120,
    businessVolumeUsd: 2150000,
    trustScore: 92,
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
    level: 1,
    levelTitle: 'Verified Carrier',
    xp: 450,
    businessVolumeUsd: 180000,
    trustScore: 85,
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
    level: 2,
    levelTitle: 'Regional Transporter',
    xp: 2100,
    businessVolumeUsd: 890000,
    trustScore: 64,
    joinedAt: '2024-01-12T00:00:00Z',
    activeBidsCount: 0,
    completedOrdersCount: 29
  }
]

export const MOCK_LOGISTICS_ORDERS: LogisticsOrder[] = [
  {
    id: 'ord-301',
    trackingNumber: 'NSS-2026-8891-RAIL',
    clientId: 'cli-001',
    clientName: 'World Food Programme',
    partnerId: 'part-201',
    partnerName: 'Hairatan Rail Operations Ltd',
    mode: 'RAIL',
    origin: 'Tashkent, Uzbekistan',
    destination: 'Hairatan Border Hub, Afghanistan',
    cargoDescription: '500 Metric Tons Wheat Grain (Grain Wagons)',
    weightTons: 500,
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
    clientName: 'ACTED International',
    partnerId: 'part-203',
    partnerName: 'Caspian Air Freight International',
    mode: 'AIR',
    origin: 'Dubai World Central (DWC), UAE',
    destination: 'Kabul International Airport (KBL)',
    cargoDescription: 'Medical Supplies & Water Purification Kits',
    weightTons: 12,
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
]

export const MOCK_MODERATION_LOGS: ModerationLog[] = [
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
]
```

---

## 6. Verification Plan & Invalidation Criteria

### Verification Steps for Implementation Phase (Milestone 2):
1. **Type Safety Check**: Run `npm run build` (`tsc -b`) to verify all portal interfaces, types, and mock objects compile without type errors.
2. **ESLint Verification**: Run `npm run lint` to ensure strict compliance with flat ESLint rules and no unused variable errors.
3. **UI & Theme Spot-Check**: Verify `/admin` dashboard renders responsively across both dark (`:root`) and light (`html[data-theme='light']`) CSS variable themes.
4. **RTL Direction Check**: Switch language to Dari (Farsi) / Pashto to ensure all table columns, search inputs, dialogs, and drawer sheets render with proper logical utilities (`ms-`, `me-`, `text-start`) under `dir="rtl"`.

---

*End of analysis.md specification.*
