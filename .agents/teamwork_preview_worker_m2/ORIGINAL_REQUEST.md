## 2026-07-24T18:02:22Z
You are the Lead Implementer (Worker) for the NSS Group Multi-Portal UI System.
Working directory: d:\Projects\NSS\app\.agents\teamwork_preview_worker_m2

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your objective:
Implement the complete, production-grade frontend UI for Admin Portal (`/admin`), Client Portal (`/client-portal`), and Partner Portal (`/partner-portal`) following the architecture specified by the Explorers in:
- `d:\Projects\NSS\app\.agents\teamwork_preview_explorer_m1_1\analysis.md`
- `d:\Projects\NSS\app\.agents\teamwork_preview_explorer_m1_2\analysis.md`
- `d:\Projects\NSS\app\.agents\teamwork_preview_explorer_m1_3\analysis.md`

Step-by-step tasks:
1. Create `src/types/portal.ts`:
   Define strict TypeScript interfaces for `ClientProfile`, `VerificationDocument`, `PartnerVendor`, `PartnerLevelInfo`, `PartnerMetrics`, `MarketplaceListing`, `PartnerBid`, `LogisticsOrder`, `TrackingCheckpoint`, `AdminKPIStats`.

2. Create `src/data/portalData.ts`:
   Provide rich, realistic initial mock data for partners, clients, orders, tracking checkpoints, pending verification documents, marketplace services, and partner XP metrics. Include state mutation helper functions or react hook state store.

3. Implement Admin Portal UI in `src/pages/AdminPortal.tsx` & `src/components/portals/`:
   - Centralized moderation dashboard with KPI stat cards (Clients, Partners, Orders, Pending Docs).
   - Partner & Client moderation tables with filtering and detail drawers/modals.
   - Logistics Orders & Tracking Info management table with live status update and checkpoint creation dialog.
   - Document Verification Approval/Rejection panel with document preview modal, status badges, and approve/reject actions (which transition client accounts to verified/rejected state).

4. Implement Client Portal UI in `src/pages/ClientPortal.tsx` & `src/components/portals/`:
   - State machine managing client workflow: `unregistered` -> `pending_verification` -> `verified`.
   - Mock Registration View: Email/password form + social auth buttons (Google, LinkedIn, SSO) that transition user state to `pending_verification`.
   - Mandatory Verification Flow View: Warning banner ("Account Pending Verification"), KYC document dropzone uploader UI (Commercial License, Tax ID, Rep Passport/ID), submission status progress, and simulated instant admin submission.
   - Full Verified Client Dashboard View: Active cargo tracking list with progress steps, interactive Freight Quote Calculator & Order Wizard, Invoice History with download simulation, and Support Desk.

5. Implement Partner Portal UI in `src/pages/PartnerPortal.tsx` & `src/components/portals/`:
   - Gamified XP & Leveling Display: Level badge (Bronze, Silver, Gold, Platinum, Diamond), interactive XP progress bar, Business Volume tracker ($ USD GMV with target progress), composite Trust Score metric (0-100 gauge with breakdown on punctuality, cargo integrity, and response rate).
   - Service & Product Marketplace Manager: Listing creation form, service grid/table across freight/warehousing/customs/equipment categories, toggle active/paused status.
   - Marketplace Bidding & Request Board: Open freight requests board where partners can submit bids.

6. Add full i18n key support in `src/i18n/translations/`:
   - Update `en.ts` with all portal keys as `as const`.
   - Update `ru.ts`, `fa.ts`, `ps.ts` to include every translation key defined in `en.ts` (`Record<TranslationKey, string>` MUST be complete). Ensure FA and PS have high quality Dari and Pashto translations.

7. Update Routing & Navigation:
   - `src/App.tsx`: Add routes `/admin`, `/client-portal`, `/partner-portal` mapping to `AdminPortal`, `ClientPortal`, `PartnerPortal`.
   - `src/components/layout/Navbar.tsx`: Add "Portals" dropdown menu or direct navigation links for Admin, Client Portal, and Partner Portal.

8. Build & Verification:
   - Run `npm run build` (`tsc -b`) to verify ZERO TypeScript compilation errors.
   - Run `npm run lint` to verify ESLint compliance.
   - Verify dark/light mode responsiveness using NSS theme CSS variables (`bg-[var(--bg)]`, `text-[rgb(var(--text-rgb))]`).

9. Report Results:
   - Write implementation report to `d:\Projects\NSS\app\.agents\teamwork_preview_worker_m2\handoff.md` and `changes.md`. Include build command results and output.
   - Send completion message to parent orchestrator.
