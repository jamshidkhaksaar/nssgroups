# Comprehensive Architectural Design: Client Portal & Partner Portal
**Milestone 1 — Exploration & Data Architecture (Explorer 3)**
**Target Working Directory**: `d:\Projects\NSS\app\.agents\teamwork_preview_explorer_m1_3\`

---

## 1. Executive Summary & Scope

The **NSS Groups of Companies** web application is expanding from a marketing frontend into a multi-portal ecosystem. This document defines the end-to-end architecture, state machines, component hierarchies, data models, and multi-lingual (i18n) translation dictionaries for two core user-facing portals:

1. **Client Portal (`/client-portal`)**: Targeted at corporate shippers, UN/NGO procurement officers, and private importers. It implements a strict 3-phase lifecycle (`unregistered` → `pending_verification` → `verified`) featuring mock authentication (Email, Google, LinkedIn, SSO), a mandatory document upload verification interface (Corporate License, Tax ID, Representative ID), and a rich Verified Client Dashboard for freight order placement, real-time shipment tracking, and invoice management.
2. **Partner Portal (`/partner-portal`)**: Targeted at sub-contracted fleet owners, rail operators, warehouse providers, and equipment suppliers across Central Asia. It combines a Service & Product Marketplace for listing management with a gamified XP & Leveling Engine (Tier Badges, Business Volume metric, Trust Score indicator) and contract bidding dashboard.

Both designs strictly adhere to existing project standards: React 19, TypeScript ~5.9 strict typing, Tailwind CSS v3.4, shadcn/ui components, and 4-language i18n support (EN, RU, FA, PS) with full RTL directionality.

---

## 2. Client Portal Architecture (`/client-portal`)

### 2.1 State Machine Specification (`ClientState`)

The Client Portal is governed by a explicit state machine that restricts unverified users from accessing corporate freight ordering and billing features until mandatory KYC (Know Your Customer) documents are uploaded and approved.

```
                  ┌──────────────────────────────┐
                  │         UNREGISTERED         │
                  └──────────────┬───────────────┘
                                 │
                                 │ submitRegistration()
                                 ▼
                  ┌──────────────────────────────┐
                  │     PENDING_VERIFICATION     │ <─────┐
                  └──────────────┬───────────────┘       │
                                 │                       │
                                 │ uploadDocuments()     │ resubmitDocuments()
                                 ▼                       │
                  ┌──────────────────────────────┐       │
                  │         UNDER_REVIEW         │       │
                  └───────┬──────────────┬───────┘       │
                          │              │               │
            adminApprove()│              │adminReject()  │
                          ▼              ▼               │
       ┌────────────────────┐   ┌────────────────────┐   │
       │      VERIFIED      │   │      REJECTED      │───┘
       └────────────────────┘   └────────────────────┘
```

#### State Definitions & Transition Rules

| State | Allowed Components & Views | Key Actions & Restrictions |
|---|---|---|
| `unregistered` | `ClientRegistration` (Form + Social Auth) | User cannot view dashboard. Submit form to transition to `pending_verification`. |
| `pending_verification` | `ClientVerification` (Step 1: Upload Prompt) | User must upload required verification documents (Corporate License, Tax ID, ID). |
| `under_review` | `ClientVerification` (Step 2: Status Banner) | Documents uploaded; read-only verification status view. Displays review countdown (24-48 hrs) and demo simulation toggle. |
| `rejected` | `ClientVerification` (Step 3: Rejection Notice) | Displays rejection reasons from admin. Provides upload dropzone to resubmit corrected documents. |
| `verified` | `ClientDashboard` (Full Workspace) | Full access unlocked: Active Shipments, Place Order Modal, Invoice History, Live Route Tracking. |

#### Client State Machine Code Contract (TypeScript)

```typescript
export type ClientState = 'unregistered' | 'pending_verification' | 'under_review' | 'rejected' | 'verified';

export interface ClientStateContext {
  currentState: ClientState;
  user: ClientProfile | null;
  documents: VerificationDocument[];
  rejectionReason?: string;
  dispatch: (action: ClientStateAction) => void;
}

export type ClientStateAction =
  | { type: 'REGISTER_SUBMIT'; payload: Omit<ClientProfile, 'id' | 'state' | 'registeredAt'> }
  | { type: 'DOCUMENTS_UPLOADED'; payload: VerificationDocument[] }
  | { type: 'SIMULATE_ADMIN_APPROVE' }
  | { type: 'SIMULATE_ADMIN_REJECT'; payload: { reason: string } }
  | { type: 'LOGOUT' };
```

---

### 2.2 Component Hierarchy & UX Flow

```
src/pages/ClientPortal.tsx
└── ClientPortalContainer (manages ClientStateContext)
    ├── [State == 'unregistered']
    │   └── ClientRegistration.tsx
    │       ├── SocialAuthButtons (Google, LinkedIn, Enterprise SSO)
    │       └── EmailRegistrationForm (React Hook Form + Zod)
    │
    ├── [State == 'pending_verification' | 'under_review' | 'rejected']
    │   └── ClientVerification.tsx
    │       ├── VerificationStepIndicator (1: Register -> 2: Upload -> 3: Review)
    │       ├── DocumentUploadZone (Corporate License, Tax ID, Rep ID)
    │       ├── SubmittedDocumentList (Status badge: Pending/Approved/Rejected)
    │       └── DevDemoBar ("⚡ Demo: Simulate Admin Approval / Rejection")
    │
    └── [State == 'verified']
        └── ClientDashboard.tsx
            ├── HeaderBanner (Client Tier Badge, Account ID, Quick CTA)
            ├── MetricCardsRow (Active Shipments, Tonnage Delivered, Pending Invoices, Delivery Rate)
            ├── NavigationTabs (Active Shipments | Place Order | Invoices & Billing)
            ├── ActiveShipmentsTable (Tracking ID, Route, Mode, Status, Live Map Modal trigger)
            ├── NewOrderModal / BookingForm (Origin, Dest, Cargo Type, Weight, Quote Calculator)
            └── InvoiceHistoryTable (Invoice #, Order ID, Date, Amount, Download PDF)
```

---

### 2.3 Registration UI Specification (`ClientRegistration.tsx`)

- **Tabbed Login / Sign-Up**: Allows quick switching between Sign In and Sign Up.
- **Social Media & Enterprise Options**:
  - **Google Workspace** ("Continue with Google")
  - **LinkedIn Corporation** ("Sign in with LinkedIn")
  - **Single Sign-On (SSO)** ("Enterprise SAML / Okta")
- **Form Fields**:
  - Full Name, Company / Organization Name, Work Email (`@company.com`), Phone Number with Country Code, Country of Operation (Dropdown referencing `COUNTRIES` from `src/data/content.ts`), Transport Needs checkboxes (Rail Freight, Road Transit, Logistics Trading, Heavy Equipment).
- **Validation**: Strict Zod schema validating work email domains, password strength, and terms agreement.

---

### 2.4 Mandatory Verification Flow (`ClientVerification.tsx`)

Upon registering, the client is automatically placed into `pending_verification`.

#### Mandatory Document Upload Requirements:
1. **Corporate License / Commercial Registration**: Valid business registration certificate issued by government authority.
2. **Tax Identification Number (TIN) / VAT Certificate**: Official tax documentation.
3. **Authorized Representative ID / Passport**: High-resolution scan of authorized manager/director ID.

#### Key Features:
- **Interactive Drag-and-Drop Zone**: Built with file type validation (`.pdf`, `.png`, `.jpg` up to 15MB).
- **Upload Progress & File Preview**: Displays filename, file size, upload timestamp, and thumbnail preview.
- **Verification Progress Banner**: Shows estimated review time (24-48 hours) with real-time status pill (`pending` amber, `approved` green, `rejected` red).
- **Interactive Demo Controls**: To assist testing without requiring Admin intervention, a dev bar permits instant state toggling between `under_review`, `verified`, and `rejected`.

---

### 2.5 Verified Client Dashboard (`ClientDashboard.tsx`)

Once state shifts to `verified`, the user is greeted with a high-density logistics dashboard:

#### Key Components:
1. **Summary Metrics Banner**:
   - Active Shipments: e.g., `4 In Transit`
   - Delivered Volume: e.g., `12,450 Tons`
   - Outstanding Balance: e.g., `$42,800 USD`
   - On-Time Fulfillment Score: `99.2%`
2. **Active Shipments Table**:
   - Columns: Shipment ID, Origin → Destination, Transit Mode (ROAD / RAIL / AIR / SEA icon), Current Checkpoint, Status Badge, Action ("Track Live").
3. **Freight Booking Wizard (Modal)**:
   - Form for specifying cargo parameters (Origin City, Destination City, Mode, Commodity Type, Container / Tonnage count, Cargo Value, Insurance option).
   - Real-time estimated rate calculator outputting estimated cost based on `VEHICLE_RATES` and distance.
4. **Invoice & Payment History**:
   - Filterable list of issued invoices with download PDF triggers, payment status indicators (`paid`, `pending`, `overdue`), and payment link triggers.

---

## 3. Partner Portal Architecture (`/partner-portal`)

### 3.1 Overview & Core Objectives

The **Partner Portal** empowers logistics subcontractors, wagon owners, trucking fleets, and warehouse providers to list their assets, manage service offerings, bid on open cargo requests, and track their gamified performance tier within the NSS ecosystem.

---

### 3.2 Marketplace Listing Management (`PartnerMarketplace.tsx`)

Partners manage their service capacity through a responsive CRUD interface.

#### Supported Listing Categories:
- **`ROAD_FREIGHT`**: Long-haul truck fleets, flatbeds, refrigerated trailers, low-bed heavy haulers.
- **`RAIL_LOGISTICS`**: Covered wagons, tank wagons, open-top railcars, container flatcars.
- **`WAREHOUSING`**: Cold storage facilities, bonded border warehouses (Hairatan, Aqina, Islam Qala), open yards.
- **`HEAVY_EQUIPMENT`**: Mobile cranes (25-100 ton), excavators, wheel loaders, bulldozers.
- **`CUSTOMS_CLEARANCE`**: Border clearance services at Hairatan, Torghundi, Sherkhan Bandar.
- **`AIR_CHARTER`**: Cargo aircraft charters (IL-76, An-12) for emergency relief & humanitarian logistics.

#### UI Functionality:
- **Listing Grid & Table View**: Card layout displaying listing image, title, route/location, capacity, pricing rate, rating, active status.
- **Status Toggle Switch**: Instantly toggle listing state between `active` (visible to NSS clients) and `paused` (temporarily unavailable).
- **Listing Form Modal (`ListingFormModal.tsx`)**:
  - Fields: Service Title, Category dropdown, Origin / Location, Destination (or "Regional Scope"), Capacity Description, Unit Pricing ($ USD per km/ton/month/day), Description, Specifications.
- **Filtering & Search Bar**: Filter by category, active status, search keyword.

---

### 3.3 Gamified XP & Tier System (`PartnerGamification.tsx`)

To incentivize high reliability, fast response times, and large volume contributions, partners earn Experience Points (XP) and unlock escalating tier perks.

#### Tier Breakdown & Level Thresholds

```
 🏆 DIAMOND GLOBAL ENTERPRISE (75,000+ XP) ──► 2.0% Fee, Custom API, VIP Manager
 🥇 PLATINUM FREIGHT MASTER (35,000 - 74,999 XP) ──► 2.5% Fee, Instant Payouts
 🥈 GOLD LOGISTICS TITAN (15,000 - 34,999 XP) ──► 3.0% Fee, Featured Listing
 🥉 SILVER CARGO OPERATOR (5,000 - 14,999 XP) ──► 4.0% Fee, Priority Bidding
 🎖️ BRONZE FLEET PARTNER (0 - 4,999 XP) ──► 5.0% Platform Fee
```

#### XP Earning Mechanics:
- **Completed Freight Order**: 100 XP per $1,000 USD order value.
- **On-Time Delivery Bonus**: +50 XP per shipment delivered on or ahead of ETA.
- **5-Star Client Rating**: +25 XP per positive client review.
- **Fast Response Time (< 15 mins)**: +15 XP per quote submitted.
- **Zero Dispute Month**: +500 XP monthly bonus for dispute-free performance.

#### Level Perks & Benefits Matrix:

| Tier Level | XP Range | Badge Icon | Fee % | Key Privileges |
|---|---|---|---|---|
| **Bronze** | 0 - 4,999 | 🎖️ Shield | 5.0% | Basic Marketplace listing, standard payment cycle (14 days) |
| **Silver** | 5,000 - 14,999 | 🥈 Silver Emblem | 4.0% | Priority bid placement in client search results |
| **Gold** | 15,000 - 34,999 | 🥇 Gold Crest | 3.0% | Featured listing badge, Dedicated Account Manager |
| **Platinum** | 35,000 - 74,999 | 💎 Platinum Crown | 2.5% | Instant payout upon cargo loading, multi-corridor priority |
| **Diamond** | 75,000+ | 👑 Diamond Star | 2.0% | Direct API integration, Advisory Board invitation, 0% escrow fee |

---

### 3.4 Business Volume Metric Display

Displays the partner's total monetary volume processed through the NSS platform.

- **Lifetime Business Volume ($ USD)**: Large numerical counter (e.g., `$1,485,000 USD`).
- **Monthly Volume Progress Bar**: Visual bar comparing current month GMV against target (e.g., `$185,000 / $200,000 USD`).
- **Tier Multiplier Indicator**: Shows how current volume accelerates XP acquisition.

---

### 3.5 Trust Score Indicator

A composite reliability metric scaled from 0 to 100, color-coded for instant evaluation:
- **Green (90–100)**: Exceptional partner reliability.
- **Yellow (75–89)**: Acceptable performance; minor improvements required.
- **Red (<75)**: Risk warning; subject to moderation review.

#### Trust Score Calculation Components:
- **On-Time Delivery Rate (40% weight)**: e.g. 98.4% → 39.36 pts
- **Cargo Integrity Rate (30% weight)**: e.g. 99.9% → 29.97 pts
- **Client Satisfaction Stars (20% weight)**: e.g. 4.9 / 5.0 → 19.60 pts
- **Response & Quote Speed (10% weight)**: e.g. < 15 mins → 10.00 pts
- **Dispute Penalty**: -5 pts per open dispute.

---

### 3.6 Active Bids & Contract Bidding (`PartnerBids.tsx`)

Allows partners to view open cargo movement requests posted by NSS or corporate clients and submit competitive bids.

- **Open Cargo Requests Feed**: Origin, Destination, Commodity, Volume/Weight, Target Budget, Expiry Timer.
- **Bid Submission Modal**: Proposed price ($ USD), transit timeframe (days), fleet allocation notes, terms.
- **Active Contracts Tracker**: Table of ongoing contracts, milestone progress, released payments, escrow balance.

---

## 4. Complete Data Models & TypeScript Interfaces

Below is the definitive TypeScript specification to be placed in `src/types/portal.ts`:

```typescript
/**
 * NSS Multi-Portal Shared Data Architecture & Schema Definitions
 */

// ── Client Portal Models ──

export type ClientState = 'unregistered' | 'pending_verification' | 'under_review' | 'rejected' | 'verified';

export interface ClientProfile {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  accountType: 'corporate' | 'ngo' | 'individual';
  state: ClientState;
  registeredAt: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

export type DocumentType = 'corporate_license' | 'tax_certificate' | 'representative_id';
export type DocumentStatus = 'pending' | 'approved' | 'rejected';

export interface VerificationDocument {
  id: string;
  type: DocumentType;
  title: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: DocumentStatus;
  rejectionNotes?: string;
  fileUrl: string;
}

export interface FreightOrder {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  mode: 'ROAD' | 'RAIL' | 'AIR' | 'SEA';
  cargoType: string;
  weightTons: number;
  corridor: string;
  status: 'pending_quote' | 'confirmed' | 'in_transit' | 'customs_clearance' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery: string;
  amountUsd: number;
  currentCheckpoint?: string;
}

export interface ClientInvoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  issueDate: string;
  dueDate: string;
  amountUsd: number;
  status: 'paid' | 'pending' | 'overdue';
  downloadUrl: string;
}

// ── Partner Portal Models ──

export type PartnerLevelTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';

export interface PartnerLevelInfo {
  tier: PartnerLevelTier;
  title: string;
  currentXp: number;
  nextLevelXp: number;
  badgeIcon: string;
  feePercentage: number;
  perks: string[];
}

export interface PartnerMetrics {
  businessVolumeUsd: number;
  monthlyVolumeUsd: number;
  monthlyTargetUsd: number;
  trustScore: number; // 0 to 100
  onTimeDeliveryRate: number; // e.g. 98.4
  cargoIntegrityRate: number; // e.g. 99.9
  averageResponseMins: number; // e.g. 12
  clientRating: number; // 0 to 5.0
  totalReviews: number;
  disputeRate: number; // percentage
}

export type ListingCategory = 
  | 'ROAD_FREIGHT' 
  | 'RAIL_LOGISTICS' 
  | 'WAREHOUSING' 
  | 'HEAVY_EQUIPMENT' 
  | 'CUSTOMS_CLEARANCE' 
  | 'AIR_CHARTER';

export type UnitPricingType = 'per_km' | 'per_ton' | 'per_sqft_month' | 'per_container' | 'per_day';

export interface MarketplaceListing {
  id: string;
  partnerId: string;
  title: string;
  category: ListingCategory;
  origin: string;
  destination: string;
  capacity: string;
  ratePerUnit: number;
  unitType: UnitPricingType;
  status: 'active' | 'paused' | 'draft';
  rating: number;
  completedOrders: number;
  createdAt: string;
  description?: string;
}

export interface PartnerBid {
  id: string;
  requestId: string;
  clientName: string;
  route: string;
  cargoDescription: string;
  proposedPriceUsd: number;
  estimatedTransitDays: number;
  status: 'submitted' | 'accepted' | 'declined' | 'under_review';
  submittedAt: string;
}
```

---

## 5. i18n Translation Key Specification

To ensure total internationalization across English (`en.ts`), Russian (`ru.ts`), Dari (`fa.ts`), and Pashto (`ps.ts`), the following key dictionary must be added to all four translation files.

```typescript
// Additions to src/i18n/translations/en.ts (and complete matches in ru.ts, fa.ts, ps.ts)

export const clientAndPartnerPortalTranslations = {
  // Client Portal - Navigation & Header
  'clientPortal.title': 'Client Freight Portal',
  'clientPortal.subtitle': 'Manage corporate shipments, book cargo, track corridors, and process invoices.',
  'clientPortal.status.unregistered': 'Account Registration Required',
  'clientPortal.status.pendingVerification': 'Pending Document Verification',
  'clientPortal.status.verified': 'Verified Corporate Shipper',
  'clientPortal.status.rejected': 'Verification Documents Rejected',

  // Client Portal - Auth & Registration
  'clientPortal.auth.signInTab': 'Sign In',
  'clientPortal.auth.signUpTab': 'Create Account',
  'clientPortal.auth.socialOr': 'or register with corporate credentials',
  'clientPortal.auth.googleBtn': 'Continue with Google',
  'clientPortal.auth.linkedinBtn': 'Sign in with LinkedIn',
  'clientPortal.auth.ssoBtn': 'Enterprise SSO (SAML/Okta)',
  'clientPortal.auth.fullName': 'Full Name',
  'clientPortal.auth.companyName': 'Company / NGO Name',
  'clientPortal.auth.email': 'Work Email Address',
  'clientPortal.auth.phone': 'Phone Number',
  'clientPortal.auth.country': 'Country of Operation',
  'clientPortal.auth.submitBtn': 'Create Account & Proceed to Verification',

  // Client Portal - Verification
  'clientPortal.verify.title': 'Corporate Identity Verification Required',
  'clientPortal.verify.subtitle': 'Please upload official business documentation to activate full freight booking features.',
  'clientPortal.verify.doc1.title': 'Commercial License / Business Registration',
  'clientPortal.verify.doc1.desc': 'Official certificate issued by government commerce authority.',
  'clientPortal.verify.doc2.title': 'Tax Identification / VAT Certificate',
  'clientPortal.verify.doc2.desc': 'Valid tax identification document or registration tax number.',
  'clientPortal.verify.doc3.title': 'Authorized Representative Passport / ID',
  'clientPortal.verify.doc3.desc': 'Color scan of authorized manager or director government ID.',
  'clientPortal.verify.dropzoneText': 'Drag and drop file here, or click to browse (PDF, PNG, JPG up to 15MB)',
  'clientPortal.verify.statusUnderReview': 'Under Admin Review (Est. 24-48 Hours)',
  'clientPortal.verify.resubmitBtn': 'Resubmit Corrected Documents',
  'clientPortal.verify.demoApprove': '⚡ Demo Action: Simulate Admin Verification Approval',
  'clientPortal.verify.demoReject': '⚡ Demo Action: Simulate Admin Verification Rejection',

  // Client Portal - Dashboard
  'clientPortal.dashboard.activeShipments': 'Active Shipments',
  'clientPortal.dashboard.tonnageDelivered': 'Total Tonnage Delivered',
  'clientPortal.dashboard.pendingInvoices': 'Pending Invoices',
  'clientPortal.dashboard.fulfillmentScore': 'On-Time Fulfillment Rate',
  'clientPortal.dashboard.tabShipments': 'Shipments Overview',
  'clientPortal.dashboard.tabNewOrder': 'Book New Cargo',
  'clientPortal.dashboard.tabInvoices': 'Invoices & Billing',
  'clientPortal.dashboard.newOrderBtn': '+ Place New Freight Order',
  'clientPortal.dashboard.trackBtn': 'Track Cargo',

  // Partner Portal - Header & Level Badges
  'partnerPortal.title': 'Logistics Subcontractor & Partner Portal',
  'partnerPortal.subtitle': 'Manage service listings, earn XP levels, monitor Trust Score, and bid on cargo contracts.',
  'partnerPortal.level.bronze': 'Bronze Fleet Partner',
  'partnerPortal.level.silver': 'Silver Cargo Operator',
  'partnerPortal.level.gold': 'Gold Logistics Titan',
  'partnerPortal.level.platinum': 'Platinum Freight Master',
  'partnerPortal.level.diamond': 'Diamond Global Enterprise',
  'partnerPortal.xpProgress': 'XP Progress to Next Tier',
  'partnerPortal.platformFee': 'Platform Service Fee',

  // Partner Portal - Metrics & Trust Score
  'partnerPortal.metrics.businessVolume': 'Lifetime Business Volume',
  'partnerPortal.metrics.monthlyTarget': 'Monthly Target Progress',
  'partnerPortal.metrics.trustScore': 'Partner Trust Score',
  'partnerPortal.metrics.onTimeRate': 'On-Time Delivery Rate',
  'partnerPortal.metrics.cargoIntegrity': 'Cargo Integrity Score',
  'partnerPortal.metrics.responseTime': 'Avg. Quote Response',
  'partnerPortal.metrics.clientRating': 'Client Rating',

  // Partner Portal - Marketplace
  'partnerPortal.market.title': 'Service & Capacity Marketplace Listings',
  'partnerPortal.market.addBtn': '+ Create New Service Listing',
  'partnerPortal.market.colCategory': 'Category',
  'partnerPortal.market.colRoute': 'Route / Scope',
  'partnerPortal.market.colCapacity': 'Capacity / Units',
  'partnerPortal.market.colRate': 'Rate Pricing',
  'partnerPortal.market.colStatus': 'Listing Status',
  'partnerPortal.market.statusActive': 'Active (Visible)',
  'partnerPortal.market.statusPaused': 'Paused (Hidden)',
  'partnerPortal.market.editListing': 'Edit Service Details',
  'partnerPortal.market.deleteListing': 'Remove Listing',

  // Partner Portal - Bids & Contracts
  'partnerPortal.bids.title': 'Open Freight Cargo Bids',
  'partnerPortal.bids.submitBidBtn': 'Submit Quote Bid',
  'partnerPortal.bids.proposedPrice': 'Proposed Rate ($ USD)',
  'partnerPortal.bids.transitDays': 'Estimated Transit Days',
};
```

---

## 6. UI Component Mapping & Visual Layout Specs

The Client & Partner Portals leverage existing pre-installed `shadcn/ui` components located in `src/components/ui/`:

| Feature / Widget | Primary UI Component | Secondary UI Components | Styling / Animation |
|---|---|---|---|
| **Registration Form** | `Card`, `Form`, `Input` | `Button`, `Label`, `Tabs` | Dark `#0e0a1e` backdrop, gold `#e8c268` highlights |
| **Verification Dropzone** | `Card`, `Progress` | `Badge`, `Button`, `Dialog` | Dashed gold border `border-amber-500/40`, drag-over hover glow |
| **Verified Dashboard** | `Tabs`, `Table` | `Badge`, `Button`, `Avatar` | Glassmorphic panel `rgba(var(--bg-rgb), 0.85)` |
| **Gamification Widget** | `Card`, `Progress` | `Badge`, `HoverCard`, `Popover` | Tier radial glow (Gold `#e8c268`, Diamond `#38bdf8`) |
| **Marketplace Listings** | `Table`, `Card` | `Switch`, `Badge`, `Dialog` | Quick status toggle, line item action buttons |
| **Trust Score Meter** | `Progress`, `Popover` | `Badge` | Circular meter with green (90-100), amber (75-89), red (<75) |

---

## 7. Next Steps for Implementation (Milestone 3 & 4)

1. **Milestone 3 (Client Portal UI)**:
   - Create `src/components/portals/ClientRegistration.tsx`
   - Create `src/components/portals/ClientVerification.tsx`
   - Create `src/components/portals/ClientDashboard.tsx`
   - Create `src/pages/ClientPortal.tsx`
2. **Milestone 4 (Partner Portal UI)**:
   - Create `src/components/portals/PartnerMarketplace.tsx`
   - Create `src/components/portals/PartnerGamification.tsx`
   - Create `src/components/portals/PartnerBids.tsx`
   - Create `src/pages/PartnerPortal.tsx`
3. **Milestone 5 (Routing & i18n)**:
   - Export shared types in `src/types/portal.ts`
   - Update `src/data/content.ts` with mock marketplace listings & client state presets
   - Update `src/i18n/translations/` (`en.ts`, `ru.ts`, `fa.ts`, `ps.ts`)
   - Add routes in `src/App.tsx` (`/client-portal`, `/partner-portal`)
