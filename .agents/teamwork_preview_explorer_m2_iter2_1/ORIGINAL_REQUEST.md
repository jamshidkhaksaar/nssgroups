## 2026-07-24T18:12:27Z
You are Explorer 1 for Iteration 2 (Remediation of Forensic Audit Violation).
Working directory: d:\Projects\NSS\app\.agents\teamwork_preview_explorer_m2_iter2_1

CRITICAL: FORENSIC AUDIT INTEGRITY VIOLATION DETECTED.
The Forensic Auditor issued a binary veto with verdict: INTEGRITY VIOLATION due to hardcoded English strings in UI components bypassing `t(...)`.

FULL FORENSIC AUDIT EVIDENCE REPORT:
---
`src/pages/AdminPortal.tsx`:
- Line 30: `<span>NSS Central Administration Control Room</span>`
- Line 42: `<span>Pending KYC</span>`
- Line 46: `<span>Active Partners</span>`

`src/pages/ClientPortal.tsx`:
- Line 42: `<span>NSS Corporate Shipper & Client Workspace</span>`
- Line 56: `<span>Switch Demo Client Account:</span>`

`src/pages/PartnerPortal.tsx`:
- Line 30: `<span>NSS Subcontractor & Partner Portal</span>`
- Line 44: `<span>Switch Partner Organization:</span>`

`src/components/portals/AdminDashboard.tsx`:
- Lines 30-31, 33, 41, 51, 53, 64, 66, 77, 79, 90, 92, 109, 115, 118, 130, 137, 146, 159 (Pending KYC Verification Documents Require Review, Review Documents Queue, Active Clients, Admin Audit Log Stream, etc.)

`src/components/portals/ClientDashboard.tsx`:
- Lines 76, 85, 98, 107, 116, 125, 134, 141, 143, 175, 206, 249, 255, 259, 263, 276, 284, 288, 300, 305, 310, 313, 325, 332-378 (Place Freight Order, Active Cargo Shipments, Billing & Invoices, Rate Calculator, Weight Tonnage, etc.)

`src/components/portals/ClientDetailSheet.tsx`, `ClientVerification.tsx`, `ClientsList.tsx`, `DocumentModeration.tsx`, `DocumentPreviewModal.tsx`, `OrdersManagement.tsx`, `PartnerBids.tsx`, `PartnerGamification.tsx`, `PartnerMarketplace.tsx`, `PartnersList.tsx`, `CheckpointEditorDialog.tsx`, `PartnerDetailSheet.tsx` (all contains hardcoded strings).
---

Your task:
Analyze `src/pages/AdminPortal.tsx`, `src/pages/ClientPortal.tsx`, `src/pages/PartnerPortal.tsx`, and all 16 components in `src/components/portals/`. Catalog every single hardcoded string that must be extracted into `src/i18n/translations/` (`en.ts`, `ru.ts`, `fa.ts`, `ps.ts`). Formulate a systematic key naming scheme (e.g. `portal.admin.*`, `portal.client.*`, `portal.partner.*`).
Document your remediation plan in `d:\Projects\NSS\app\.agents\teamwork_preview_explorer_m2_iter2_1\analysis.md` and `handoff.md`. Send your report back to parent orchestrator.
