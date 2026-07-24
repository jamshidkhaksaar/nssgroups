# Forensic Audit Report — Milestone 2 Multi-Portal Implementation

**Target**: Multi-Portal Implementation (`AdminPortal.tsx`, `ClientPortal.tsx`, `PartnerPortal.tsx`, `src/components/portals/*`, `src/data/portalData.ts`, `src/types/portal.ts`, `src/App.tsx`, `src/components/layout/Navbar.tsx`)  
**Auditor**: Forensic Auditor  
**Date**: 2026-07-24  
**Verdict**: 🔴 **INTEGRITY VIOLATION**

---

## Executive Summary

A forensic audit was conducted on Milestone 2 multi-portal implementation. While the state architecture (`src/data/portalData.ts`), dynamic state transitions, document uploads, moderation approvals, XP calculations, tracking updates, and build/lint commands passed all functional and build checks cleanly, a severe **i18n compliance violation** was discovered across the entire portal codebase.

Per project conventions (AGENTS.md) and Check 2 requirements (*"Ensure all user-visible text uses `t(...)` keys and no hardcoded text bypasses translation files"*), all user-facing UI text must consume `t(...)` keys from translation dictionaries. In the current implementation, almost all UI elements (headers, card labels, form inputs, placeholders, table columns, action buttons, dialogs, sub-tabs, empty states, and toast notifications) in `AdminPortal.tsx`, `ClientPortal.tsx`, `PartnerPortal.tsx`, and all 16 portal components under `src/components/portals/` contain hardcoded English string literals, bypassing the i18n system.

---

## Phase Results Matrix

| Check # | Inspection Focus | Result | Details |
|---|---|---|---|
| **Check 1** | Genuine Implementation & State Handling | 🟢 **PASS** | State transitions, document uploads, moderation approvals, XP level tier calculations, and tracking updates are dynamically processed in reactive memory state (`usePortalStore`). No hardcoded mock shortcuts or fake returns. |
| **Check 2** | i18n Compliance & Translation System | 🔴 **FAIL** | Extensive hardcoded English text strings bypass `t(...)` across portal pages and all 16 portal components under `src/components/portals/`. |
| **Check 3** | Build & Lint Integrity | 🟢 **PASS** | `npm run build` (`tsc -b && vite build`) and `npm run lint` (`eslint .`) executed directly with zero errors. |
| **Check 4** | Code Layout & AGENTS.md Rules | 🟢 **PASS** | Strict TypeScript compliance, `@/` path aliases, CSS variable theming, and clean file placement. |

---

## Detailed Audit Findings

### 1. Genuine Implementation Check (PASS)
- **State Store Architecture**: `src/data/portalData.ts` implements a custom reactive store (`usePortalStore`) using a listener pattern and local state sync (`notify()`).
- **Dynamic Operations Verified**:
  - `registerClient`: Dynamically appends new `ClientProfile` records with auto-generated ID and `pending_verification` state.
  - `uploadDocument`: Dynamically generates `VerificationDocument` objects and links them to the active client.
  - `approveDocument` & `rejectDocument`: Dynamically updates document status, computes client verification state changes, updates timestamps, and appends entry to `globalLogs`.
  - `calculateLevelInfo` & Gamification: Dynamically calculates XP thresholds (`BRONZE`, `SILVER`, `GOLD`, `PLATINUM`, `DIAMOND`), fee percentages, and badge icons based on XP. Bidding awards +50 XP and updates level tiers.
  - `addOrderCheckpoint` & `updateOrderStatus`: Appends checkpoint objects, updates order status, updates timestamps, and logs moderation audit actions.

### 2. i18n Compliance & Translation System Check (FAIL — INTEGRITY VIOLATION)
While `src/i18n/translations/en.ts` contains translation keys for high-level page titles, the components render hardcoded text instead of invoking `t(...)`.

**Exact Evidence of i18n Bypasses**:

1. **`src/pages/AdminPortal.tsx`**:
   - Line 30: `<span>NSS Central Administration Control Room</span>` (hardcoded string)
   - Line 42: `<span ...>Pending KYC</span>` (hardcoded string)
   - Line 46: `<span ...>Active Partners</span>` (hardcoded string)

2. **`src/pages/ClientPortal.tsx`**:
   - Line 42: `<span>NSS Corporate Shipper & Client Workspace</span>` (hardcoded string)
   - Line 56: `<span ...>Switch Demo Client Account:</span>` (hardcoded string)

3. **`src/pages/PartnerPortal.tsx`**:
   - Line 30: `<span>NSS Subcontractor & Partner Portal</span>` (hardcoded string)
   - Line 44: `<span ...>Switch Partner Organization:</span>` (hardcoded string)

4. **`src/components/portals/AdminDashboard.tsx`**:
   - Line 30-31: `Pending KYC Verification Documents Require Review`
   - Line 33: `Corporate shipper accounts are waiting for administrative document approval to unlock full portal features.`
   - Line 41: `Review Documents Queue`
   - Line 51: `Pending Verification`
   - Line 53: `KYC documents in queue`
   - Line 64: `Active Clients`
   - Line 66: `pending approval`
   - Line 77: `Active Partners`
   - Line 79: `Subcontracted fleets & rail`
   - Line 90: `Active Shipments`
   - Line 92: `convoy delayed`
   - Line 109: `Total Platform Logistics GMV Volume`
   - Line 115: `Partners Directory`
   - Line 118: `Manage Orders`
   - Line 130: `Pending Verification Stream`
   - Line 137: `All client documents are verified! Queue is clean.`
   - Line 146: `Review`
   - Line 159: `Admin Audit Log Stream`

5. **`src/components/portals/ClientDashboard.tsx`**:
   - Line 76: `Verified Account ID:`
   - Line 85: `Place Freight Order`
   - Line 98: `Active Cargo Shipments`
   - Line 107: `Billing & Invoices`
   - Line 116: `Rate Calculator`
   - Line 125: `Support Desk`
   - Line 134: `Active Shipments & Live Corridor Tracking`
   - Line 141: `No active shipments for this account yet.`
   - Line 143: `Book Your First Cargo`
   - Line 175: `Live Progress Steps`
   - Line 206: `Issued Invoices & Settlement History`
   - Line 249: `Interactive Freight Rate Estimator`
   - Line 255: `Origin City`
   - Line 259: `Destination City`
   - Line 263: `Transit Mode`
   - Line 276: `Weight Tonnage (Tons)`
   - Line 284: `Estimated Freight Cost`
   - Line 288: `Book This Rate`
   - Line 300: `Dedicated Key Account Support Desk`
   - Line 305: `Your Key Account Manager`
   - Line 310: `Submit Support Ticket / Inquiry`
   - Line 313: `Send Priority Inquiry`
   - Line 325: `Place New Freight Order`
   - Lines 332-378: Form labels, modal titles, and confirm buttons hardcoded in English.

6. **`src/components/portals/ClientDetailSheet.tsx`**:
   - Lines 42, 64, 68, 76, 79, 98, 110, 123 (Representative Information, Total Freight Orders, Account Moderation Actions, etc.)

7. **`src/components/portals/ClientVerification.tsx`**:
   - Lines 65, 69, 83, 90, 93-95, 120, 121, 171, 174 (Account Verification Rejected, Select Document Requirement Type, Drag and drop file, etc.)

8. **`src/components/portals/ClientsList.tsx`**:
   - Lines 42, 44, 66, 77-81, 88, 116 (Corporate Clients Directory, table headers, empty state text, action buttons)

9. **`src/components/portals/DocumentModeration.tsx`**:
   - Lines 53, 55, 81, 93-97, 104, 133, 144, 153 (Document Verification Moderation Queue, table headers, action buttons)

10. **`src/components/portals/DocumentPreviewModal.tsx`**:
    - Lines 68, 72, 76, 80, 92, 101, 109, 139, 154, 158 (Document metadata labels, open document button, rejection form headers)

11. **`src/components/portals/OrdersManagement.tsx`**:
    - Lines 43, 45, 67, 78-83, 90, 131 (Multimodal Logistics Orders title, table headers, update status button)

12. **`src/components/portals/PartnerBids.tsx`**:
    - Lines 68, 70, 115, 133, 162, 169, 176, 186, 200 (Bidding board titles, table headers, modal labels)

13. **`src/components/portals/PartnerGamification.tsx`**:
    - Lines 38, 41, 46, 54, 67, 85, 91, 96, 113, 122 (Tier level headers, XP progress labels, trust score title)

14. **`src/components/portals/PartnerMarketplace.tsx`**:
    - Lines 97, 99, 106, 116, 144-149, 156, 212, 218, 248, 287, 306, 318 (Marketplace manager titles, create modal labels, pricing unit labels)

15. **`src/components/portals/PartnersList.tsx`**:
    - Lines 42, 44, 66, 77-82, 89, 125 (Logistics Partners Directory title, table headers, manage button)

16. **`src/components/portals/CheckpointEditorDialog.tsx`**:
    - Lines 56, 66, 83, 94, 105, 117, 135, 138 (Add tracking checkpoint modal labels, post checkpoint button)

17. **`src/components/portals/PartnerDetailSheet.tsx`**:
    - Lines 106, 138, 142, 160 (Partner Status Control, manual gamification override labels)

---

### 3. Build & Lint Verification (PASS)

Both mandatory commands were executed directly on the repository:

- **Build Execution**: `npm run build` (`tsc -b && vite build`)
  - Result: SUCCESS (0 errors)
  - Asset Output: `dist/index.html` (1.41 kB), `dist/assets/index-Cihx56HD.css` (135.98 kB), `dist/assets/index-OPf7Kn7q.js` (1,236.74 kB). Built in 7.38s.

- **Lint Execution**: `npm run lint` (`eslint .`)
  - Result: SUCCESS (0 errors)

---

## Final Forensic Verdict

**VERDICT: INTEGRITY VIOLATION**

Reason for rejection: Check 2 failed due to extensive hardcoded English text bypassing the i18n translation system across all portal pages and subcomponents. To achieve a CLEAN verdict, all user-visible strings must be extracted into translation files (`src/i18n/translations/en.ts`, `ru.ts`, `fa.ts`, `ps.ts`) and wrapped in `t(...)` calls.
