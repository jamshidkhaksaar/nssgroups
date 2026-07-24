# Handoff Report: Client Portal & Partner Portal Data Architecture & Design
**Agent**: Explorer 3 (Milestone 1 — Exploration & Data Architecture)
**Working Directory**: `d:\Projects\NSS\app\.agents\teamwork_preview_explorer_m1_3\`
**Date**: 2026-07-24

---

## 1. Observation

- **Core Guidelines & Stack**: Inspected `AGENTS.md` and `PROJECT.md`. The project is built using Vite + React 19 + TypeScript ~5.9 + Tailwind CSS v3.4 + shadcn/ui. Multi-lingual support is powered by a custom i18n context (`src/i18n/`) with 4 complete dictionaries (`en.ts`, `ru.ts`, `fa.ts`, `ps.ts`), supporting RTL text flow (`dir="rtl"`).
- **Existing Routing Structure**: Checked `src/App.tsx`. Current routes include `/`, `/about`, `/services`, `/fleet`, `/network`, `/contact`, `/trading`, `/marketplace`, `/booking`, `/projects`, `/tracking`, `/portal`, `/login`, `/register`.
- **UI Components Catalog**: Searched `src/components/ui/`. Pre-installed components suitable for portal layout building include `card.tsx`, `badge.tsx`, `button.tsx`, `form.tsx`, `input.tsx`, `dialog.tsx`, `progress.tsx`, `select.tsx`, `switch.tsx`, `table.tsx`, `tabs.tsx`, and `avatar.tsx`.
- **Existing Content Data**: Examined `src/data/content.ts` containing fleet counts, vehicle rates, client lists (UN, NGO, Private), and regional offices.

---

## 2. Logic Chain

1. **Client Portal (`/client-portal`) State Machine Requirements**:
   - Shippers and corporate clients require a trust barrier before placing high-value freight orders across sensitive Central Asian corridors.
   - Designed a 4-state lifecycle (`unregistered` → `pending_verification` → `under_review` → `verified`, with a `rejected` fallback).
   - `unregistered`: User registers via email or social auth (Google, LinkedIn, Enterprise SSO).
   - `pending_verification` / `under_review`: Mandatory document upload UI enforcing 3 document types: Corporate License, Tax Identification, Authorized Manager ID.
   - `verified`: Unlocks the Verified Client Dashboard containing active shipment status, freight order booking modal with live quote calculator, and invoice management.

2. **Partner Portal (`/partner-portal`) Marketplace & Gamification Requirements**:
   - Subcontractors and vehicle/wagon operators require asset visibility and performance recognition to incentivize quality service on NSS corridors.
   - Service Marketplace: CRUD interface with category filters (`ROAD_FREIGHT`, `RAIL_LOGISTICS`, `WAREHOUSING`, `HEAVY_EQUIPMENT`, `CUSTOMS_CLEARANCE`, `AIR_CHARTER`), rate structures (`per_km`, `per_ton`, `per_sqft_month`), and instantaneous active/paused toggles.
   - Gamified XP Engine: 5-tier system (Bronze 0-4.9k XP, Silver 5k-14.9k XP, Gold 15k-34.9k XP, Platinum 35k-74.9k XP, Diamond 75k+ XP). Tier progression reduces platform fees from 5.0% down to 2.0% and unlocks perks like instant payouts and priority bidding.
   - Metrics Suite: Business Volume metric ($ USD completed GMV with monthly target progress bar) and composite Trust Score indicator (0-100 score based on 98.4% on-time delivery, 99.9% cargo integrity, 4.9★ rating, and dispute history).

3. **Multi-lingual & System Alignment**:
   - Structured exact TypeScript data models (`ClientProfile`, `VerificationDocument`, `FreightOrder`, `PartnerLevelInfo`, `PartnerMetrics`, `MarketplaceListing`, `PartnerBid`).
   - Cataloged complete translation key set (`clientPortal.*`, `partnerPortal.*`) for all 4 supported languages.

---

## 3. Caveats

- **Exploration Scope**: As Explorer 3, all outputs are architectural designs, data models, and specifications. Code changes were NOT placed into `src/` during Milestone 1, per read-only exploration constraints.
- **Mock Demo Shortcuts**: In the implementation phase (Milestone 3), `ClientVerification.tsx` should include dev shortcut buttons (`⚡ Demo: Simulate Admin Approval / Rejection`) to facilitate local testing without requiring manual database or backend triggers.

---

## 4. Conclusion

The comprehensive architectural specifications for both the **Client Portal (`/client-portal`)** and **Partner Portal (`/partner-portal`)** have been fully designed and documented in `d:\Projects\NSS\app\.agents\teamwork_preview_explorer_m1_3\analysis.md`. The data models, state transition machines, component trees, and i18n specifications are ready for implementation in Milestones 3, 4, and 5.

---

## 5. Verification Method

To verify this handoff output independently:

1. Inspect `d:\Projects\NSS\app\.agents\teamwork_preview_explorer_m1_3\analysis.md` to confirm complete coverage of:
   - Client Portal state machine (`unregistered` → `pending_verification` → `verified`).
   - Mock registration and document upload interface specs.
   - Verified Client Dashboard metrics, shipment tracking, order placement modal, and invoice table.
   - Partner Portal service marketplace listing management specs.
   - Gamified XP tier levels (Bronze to Diamond), fee reductions, Business Volume metric, and Trust Score indicator.
   - TypeScript interface definitions and i18n translation key catalogs.
2. Confirm file layout compliance: `.agents/teamwork_preview_explorer_m1_3/` contains `ORIGINAL_REQUEST.md`, `BRIEFING.md`, `progress.md`, `analysis.md`, and `handoff.md`.
