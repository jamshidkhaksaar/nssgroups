# Project: NSS Group Multi-Portal Frontend UI System

## Architecture
The NSS Group frontend is a Vite + React + TypeScript + Tailwind CSS application using custom i18n (`src/i18n/`) and responsive dark/light theme (`src/theme/`).
The Multi-Portal extension introduces three major portals under `src/pages/portals/` or `src/pages/`:
1. **Admin Portal** (`/admin`): Centralized moderation dashboard for managing partners, clients, logistics/cargo orders, tracking info updates, and document verification approvals (approve/reject workflow).
2. **Client Portal** (`/client-portal`): Client user experience featuring mocked registration (email / social login options), state transition into a mandatory verification flow ("Pending Verification" state with document upload interface), and full client dashboard upon approval (view active shipments, place orders, view invoices).
3. **Partner Portal** (`/partner-portal`): Logistics/vendor partner portal featuring service/product marketplace listing management, gamified XP/leveling display (Level badge, Business Volume metric, Trust Score indicator), and active bids/contracts.
4. **Shared Components & i18n**: Sub-components for portals (`src/components/portals/`), navigation updates in `src/components/layout/Navbar.tsx`, and translation entries across `en.ts`, `ru.ts`, `fa.ts`, `ps.ts`.

## Code Layout
```
src/
├── pages/
│   ├── AdminPortal.tsx
│   ├── ClientPortal.tsx
│   └── PartnerPortal.tsx
├── components/
│   └── portals/
│       ├── AdminDashboard.tsx
│       ├── DocumentModeration.tsx
│       ├── ClientRegistration.tsx
│       ├── ClientVerification.tsx
│       ├── ClientDashboard.tsx
│       ├── PartnerMarketplace.tsx
│       └── PartnerGamification.tsx
├── data/
│   └── portalContent.ts (or added to src/data/content.ts)
├── i18n/
│   └── translations/ (en.ts, ru.ts, fa.ts, ps.ts)
```

## Interface Contracts & State Schemas
- Client State: `'unregistered' | 'pending_verification' | 'verified'`
- Document Verification Item: `{ id: string, clientName: string, docType: string, fileUrl: string, status: 'pending' | 'approved' | 'rejected', submittedAt: string }`
- Partner Level System: `{ xp: number, level: number, levelTitle: string, businessVolumeUsd: number, trustScore: number }`
- Order / Shipment Item: `{ id: string, trackingNumber: string, client: string, partner: string, status: string, origin: string, destination: string, mode: 'ROAD' | 'RAIL' | 'AIR' | 'SEA' }`

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Exploration & Data Architecture | Explore codebase, define portal types, state models, and initial i18n keys | none | DONE |
| 2 | Admin Portal UI (`/admin`) | Moderation dashboard, partners/clients list, orders/tracking table, doc verification approve/reject | M1 | BLOCKED: Forensic audit i18n violation |
| 3 | Client Portal UI (`/client-portal`) | Mock registration (email/social), state transition to mandatory verification upload UI, full client dashboard | M1 | PLANNED |
| 4 | Partner Portal UI (`/partner-portal`)| Service/product marketplace, gamified XP/leveling widget, volume & trust score metrics | M1 | PLANNED |
| 5 | Routing, Navbar & i18n Completion | Add routes in `App.tsx`, portal nav links in `Navbar.tsx`, complete en/ru/fa/ps keys | M2, M3, M4 | PLANNED |
| 6 | Quality Verification & Audit | `tsc -b` type check, ESLint verification, RTL layout check, theme styling, forensic audit | M5 | PLANNED |
