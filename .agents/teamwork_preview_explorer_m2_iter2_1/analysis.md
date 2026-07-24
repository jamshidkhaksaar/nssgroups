# Forensic Audit Violation Remediation Plan & Analysis Report

**Iteration**: 2 (Remediation of Forensic Audit Violation)  
**Agent**: Explorer 1 (`teamwork_preview_explorer_m2_iter2_1`)  
**Target Scope**: `src/pages/AdminPortal.tsx`, `src/pages/ClientPortal.tsx`, `src/pages/PartnerPortal.tsx`, and all 16 components in `src/components/portals/`.

---

## 1. Executive Summary & Root Cause Analysis

### Forensic Audit Verdict
The Forensic Auditor issued a binary veto with verdict: **INTEGRITY VIOLATION**.  
**Root Cause**: Multiple UI components in `src/pages/` and `src/components/portals/` contain hardcoded English text strings bypassing `t(...)` translations, violating project rules specified in `AGENTS.md` ("every user-visible string must be a translation key, never hardcoded").

### Scope of Audit Findings
1. **Portal Pages (3 files)**: `AdminPortal.tsx`, `ClientPortal.tsx`, `PartnerPortal.tsx`.
2. **Portal Components (16 files)**:
   - `AdminDashboard.tsx`
   - `CheckpointEditorDialog.tsx`
   - `ClientDashboard.tsx`
   - `ClientDetailSheet.tsx`
   - `ClientRegistration.tsx`
   - `ClientVerification.tsx`
   - `ClientsList.tsx`
   - `DocumentModeration.tsx`
   - `DocumentPreviewModal.tsx`
   - `OrdersManagement.tsx`
   - `PartnerBids.tsx`
   - `PartnerDetailSheet.tsx`
   - `PartnerGamification.tsx`
   - `PartnerMarketplace.tsx`
   - `PartnersList.tsx`
   - `StatusBadge.tsx`

Total hardcoded strings identified across all 19 files: **155 distinct UI text elements & labels**.

---

## 2. Key Naming Scheme Taxonomy

To ensure consistency, readability, and scalable translation maintenance, all newly extracted strings will follow a hierarchical `portal.*` key structure:

```
portal.
├── admin.
│   ├── headerTag, pendingKyc, activePartners
│   ├── dashboard (banner, kpis, gmv, pendingStream, auditLog)
├── client.
│   ├── headerTag, switchAccount
│   ├── dashboard (tabs, shipments, invoices, rateCalc, support, wizard)
│   ├── detail (repInfo, metrics, submittedDocs, moderation)
│   ├── reg (title, sub, formLabels, placeholders, categories)
│   └── verif (warning, upload, docTypes, dragDrop, demoTrigger)
├── partner.
│   ├── headerTag, switchOrg
│   ├── gamification (tier, perks, lifetimeVolume, trustMetric)
│   ├── marketplace (manager, search, categories, table, dialog)
│   ├── bids (biddingBoard, yourBids, bidModal)
│   └── detail (tierInfo, performance, statusControl, overrideTools)
├── checkpoint. (dialogTitle, locationLabel, headline, notes, statusOptions)
├── docMod. (title, sub, search, tableHeaders, statusFilters, quickActions)
├── docPreview. (metadata, previewNotice, rejectionReasons, formLabels, actionBtns)
├── clientsList. (title, sub, search, tableHeaders, statusFilters)
├── partnersList. (title, sub, search, tableHeaders, statusFilters)
├── ordersMgmt. (title, sub, search, tableHeaders, statusFilters)
└── status. (approved, verified, in_transit, customs_clearance, delayed, delivered, rejected, etc.)
```

---

## 3. Comprehensive Hardcoded String Catalog Across All 19 Files

### 3.1 Portal Pages

#### File 1: `src/pages/AdminPortal.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 30 | `"NSS Central Administration Control Room"` | `portal.admin.headerTag` |
| 42 | `"Pending KYC"` | `portal.admin.pendingKyc` |
| 46 | `"Active Partners"` | `portal.admin.activePartners` |

#### File 2: `src/pages/ClientPortal.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 42 | `"NSS Corporate Shipper & Client Workspace"` | `portal.client.headerTag` |
| 56 | `"Switch Demo Client Account:"` | `portal.client.switchAccount` |

#### File 3: `src/pages/PartnerPortal.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 31 | `"NSS Subcontractor & Partner Portal"` | `portal.partner.headerTag` |
| 44 | `"Switch Partner Organization:"` | `portal.partner.switchOrg` |

---

### 3.2 Portal Components (16 Files)

#### File 4: `src/components/portals/AdminDashboard.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 31 | `"Pending KYC Verification Documents Require Review"` | `portal.admin.dash.pendingBannerTitle` |
| 33 | `"Corporate shipper accounts are waiting for administrative document approval to unlock full portal features."` | `portal.admin.dash.pendingBannerSub` |
| 41 | `"Review Documents Queue"` | `portal.admin.dash.reviewQueueBtn` |
| 51 | `"Pending Verification"` | `portal.admin.dash.kpiPendingVerif` |
| 53 | `"KYC documents in queue"` | `portal.admin.dash.kpiKycQueue` |
| 64 | `"Active Clients"` | `portal.admin.dash.kpiActiveClients` |
| 66 | `" pending approval"` | `portal.admin.dash.kpiPendingApproval` |
| 77 | `"Active Partners"` | `portal.admin.dash.kpiActivePartners` |
| 79 | `"Subcontracted fleets & rail"` | `portal.admin.dash.kpiSubcontracted` |
| 90 | `"Active Shipments"` | `portal.admin.dash.kpiActiveShipments` |
| 92 | `" convoy delayed"` | `portal.admin.dash.kpiConvoyDelayed` |
| 109 | `"Total Platform Logistics GMV Volume"` | `portal.admin.dash.gmvVolumeTitle` |
| 115 | `"Partners Directory"` | `portal.admin.dash.partnersDirBtn` |
| 118 | `"Manage Orders"` | `portal.admin.dash.manageOrdersBtn` |
| 130 | `"Pending Verification Stream"` | `portal.admin.dash.pendingStreamTitle` |
| 137 | `"All client documents are verified! Queue is clean."` | `portal.admin.dash.queueClean` |
| 147 | `"Review"` | `portal.admin.dash.reviewBtn` |
| 159 | `"Admin Audit Log Stream"` | `portal.admin.dash.auditLogTitle` |

#### File 5: `src/components/portals/CheckpointEditorDialog.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 35 | `'Please enter a location name for the checkpoint.'` | `portal.checkpoint.errLocation` |
| 41 | `'Checkpoint updated by NSS admin.'` | `portal.checkpoint.defaultNotes` |
| 46 | `'Checkpoint added to '` | `portal.checkpoint.successToast` |
| 56 | `"Add Tracking Checkpoint"` | `portal.checkpoint.dialogTitle` |
| 59 | `"Shipment: "` | `portal.checkpoint.shipmentLabel` |
| 66 | `"Update Overall Shipment Status"` | `portal.checkpoint.updateStatusLabel` |
| 69 | `"Select shipment status..."` | `portal.checkpoint.statusPlaceholder` |
| 72 | `"In Transit"` | `portal.status.in_transit` |
| 73 | `"Customs Clearance"` | `portal.status.customs_clearance` |
| 74 | `"Delayed"` | `portal.status.delayed` |
| 75 | `"Delivered"` | `portal.status.delivered` |
| 76 | `"Order Placed"` | `portal.status.order_placed` |
| 83 | `"Checkpoint Location"` | `portal.checkpoint.locationLabel` |
| 85 | `"e.g. Hairatan Customs Terminal, Border Crossing"` | `portal.checkpoint.locationPlaceholder` |
| 94 | `"Status Headline / Milestones"` | `portal.checkpoint.headlineLabel` |
| 96 | `"e.g. Cleared Customs & Departed Depot"` | `portal.checkpoint.headlinePlaceholder` |
| 105 | `"Operational Notes"` | `portal.checkpoint.notesLabel` |
| 107 | `"Convoy details, seal verification, driver contacts, weather notes..."` | `portal.checkpoint.notesPlaceholder` |
| 117 | `"Recent Checkpoint History"` | `portal.checkpoint.historyTitle` |
| 135 | `"Cancel"` | `portal.checkpoint.cancelBtn` |
| 139 | `"Post Checkpoint"` | `portal.checkpoint.postBtn` |

#### File 6: `src/components/portals/ClientDashboard.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 62 | `'Freight order placed successfully! Tracking number generated.'` | `portal.client.dash.orderPlacedSuccess` |
| 76 | `"Verified Account ID: "` | `portal.client.dash.verifiedIdLabel` |
| 85 | `"Place Freight Order"` | `portal.client.dash.placeOrderBtn` |
| 98 | `"Active Cargo Shipments"` | `portal.client.dash.activeShipmentsTab` |
| 107 | `"Billing & Invoices"` | `portal.client.dash.billingInvoicesTab` |
| 116 | `"Rate Calculator"` | `portal.client.dash.rateCalculatorTab` |
| 125 | `"Support Desk"` | `portal.client.dash.supportDeskTab` |
| 134 | `"Active Shipments & Live Corridor Tracking"` | `portal.client.dash.shipmentsTitle` |
| 141 | `"No active shipments for this account yet."` | `portal.client.dash.noShipments` |
| 143 | `"Book Your First Cargo"` | `portal.client.dash.bookFirstCargo` |
| 153 | `" Tons"` | `portal.client.dash.tonsSuffix` |
| 160 | `"Origin → Destination"` | `portal.client.dash.originDestLabel` |
| 164 | `"Transit Mode"` | `portal.client.dash.transitModeLabel` |
| 165 | `" Freight"` | `portal.client.dash.freightSuffix` |
| 168 | `"Estimated Delivery"` | `portal.client.dash.estDeliveryLabel` |
| 175 | `"Live Progress Steps"` | `portal.client.dash.liveProgressTitle` |
| 206 | `"Issued Invoices & Settlement History"` | `portal.client.dash.invoicesTitle` |
| 214 | `"Invoice #"` | `portal.client.dash.thInvoiceNum` |
| 215 | `"Issue Date"` | `portal.client.dash.thIssueDate` |
| 216 | `"Due Date"` | `portal.client.dash.thDueDate` |
| 217 | `"Amount (USD)"` | `portal.client.dash.thAmount` |
| 218 | `"Status"` | `portal.client.dash.thStatus` |
| 219 | `"Download"` | `portal.client.dash.thDownload` |
| 231 | `'Downloaded invoice '` | `portal.client.dash.downloadToast` |
| 232 | `"PDF"` | `portal.client.dash.pdfBtn` |
| 249 | `"Interactive Freight Rate Estimator"` | `portal.client.dash.calcTitle` |
| 255 | `"Origin City"` | `portal.client.dash.calcOriginLabel` |
| 259 | `"Destination City"` | `portal.client.dash.calcDestLabel` |
| 263 | `"Transit Mode"` | `portal.client.dash.calcModeLabel` |
| 269 | `"RAIL Freight (Bulk Wagons)"` | `portal.client.dash.modeRail` |
| 270 | `"ROAD Trucking Convoy"` | `portal.client.dash.modeRoad` |
| 271 | `"AIR Freight Charter"` | `portal.client.dash.modeAir` |
| 272 | `"SEA Shipping Containers"` | `portal.client.dash.modeSea` |
| 277 | `"Weight Tonnage (Tons)"` | `portal.client.dash.calcWeightLabel` |
| 284 | `"Estimated Freight Cost"` | `portal.client.dash.estFreightCost` |
| 288 | `"Book This Rate"` | `portal.client.dash.bookRateBtn` |
| 300 | `"Dedicated Key Account Support Desk"` | `portal.client.dash.supportTitle` |
| 305 | `"Your Key Account Manager"` | `portal.client.dash.accountMgrTitle` |
| 306 | `"Samir Alemyar — Vice President Operations"` | `portal.client.dash.accountMgrName` |
| 307 | `"Direct Hotline: +93 70 000 8899 • Email: info@nss.af"` | `portal.client.dash.accountMgrContact` |
| 310 | `"Submit Support Ticket / Inquiry"` | `portal.client.dash.supportInquiryLabel` |
| 311 | `"Subject of inquiry..."` | `portal.client.dash.supportInquiryPlaceholder` |
| 312 | `'Support inquiry submitted. We will contact you within 2 hours.'` | `portal.client.dash.supportToast` |
| 313 | `"Send Priority Inquiry"` | `portal.client.dash.sendInquiryBtn` |
| 325 | `"Place New Freight Order"` | `portal.client.dash.wizardTitle` |
| 332 | `"Origin City"` | `portal.client.dash.wizardOriginLabel` |
| 336 | `"Destination City"` | `portal.client.dash.wizardDestLabel` |
| 343 | `"Mode"` | `portal.client.dash.wizardModeLabel` |
| 357 | `"Cargo Tonnage"` | `portal.client.dash.wizardTonnageLabel` |
| 363 | `"Cargo Description"` | `portal.client.dash.wizardDescLabel` |
| 368 | `"Calculated Freight Amount"` | `portal.client.dash.wizardCalculatedAmount` |
| 374 | `"Cancel"` | `portal.client.dash.wizardCancelBtn` |
| 376 | `"Confirm & Book Shipment"` | `portal.client.dash.wizardConfirmBtn` |

#### File 7: `src/components/portals/ClientDetailSheet.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 35 | `"Registered "` | `portal.client.detail.registeredLabel` |
| 42 | `"Representative Information"` | `portal.client.detail.repInfoTitle` |
| 64 | `"Total Freight Orders"` | `portal.client.detail.totalOrdersLabel` |
| 68 | `"Total Spent (USD)"` | `portal.client.detail.totalSpentLabel` |
| 76 | `"Submitted Verification Documents"` | `portal.client.detail.submittedDocsTitle` |
| 79 | `"No KYC documents uploaded yet."` | `portal.client.detail.noDocs` |
| 98 | `"Account Moderation Actions"` | `portal.client.detail.moderationActionsTitle` |
| 106 | `'manually verified.'` | `portal.client.detail.verifiedToast` |
| 110 | `"Approve & Verify Account"` | `portal.client.detail.approveBtn` |
| 117 | `'Identity verification failed administrative checks.'` | `portal.client.detail.defaultRejectReason` |
| 118 | `'verification rejected.'` | `portal.client.detail.rejectedToast` |
| 122 | `"Reject Verification"` | `portal.client.detail.rejectBtn` |

#### File 8: `src/components/portals/ClientRegistration.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 92 | `"Or register with email"` | `portal.client.reg.orRegisterWithEmail` |
| 101 | `"Full Name"` | `portal.client.reg.fullNameLabel` |
| 105 | `"e.g. David Vance"` | `portal.client.reg.fullNamePlaceholder` |
| 114 | `"Company / Organization Name"` | `portal.client.reg.companyNameLabel` |
| 118 | `"e.g. UN World Food Programme"` | `portal.client.reg.companyNamePlaceholder` |
| 132 | `"procurement@organization.org"` | `portal.client.reg.emailPlaceholder` |
| 154 | `"Phone Number"` | `portal.client.reg.phoneLabel` |
| 158 | `"+93 70 123 4567"` | `portal.client.reg.phonePlaceholder` |
| 168 | `"Country of Operation"` | `portal.client.reg.countryLabel` |
| 172 | `"e.g. Afghanistan"` | `portal.client.reg.countryPlaceholder` |
| 181 | `"Organization Category"` | `portal.client.reg.categoryLabel` |
| 185 | `"Select Category"` | `portal.client.reg.selectCategoryPlaceholder` |
| 188 | `"UN & International Agency"` | `portal.client.reg.categoryUn` |
| 189 | `"Registered Non-Governmental Org (NGO)"` | `portal.client.reg.categoryNgo` |
| 190 | `"Commercial / Private Enterprise"` | `portal.client.reg.categoryPrivate` |
| 191 | `"Government Ministry / Agency"` | `portal.client.reg.categoryGov` |

#### File 9: `src/components/portals/ClientVerification.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 31 | `'Commercial Business License'` | `portal.client.verif.docTitleLicense` |
| 34 | `'Tax Identification Certificate'` | `portal.client.verif.docTitleTax` |
| 37 | `'Authorized Representative Passport Scan'` | `portal.client.verif.docTitlePassport` |
| 43 | `'successfully. Sent for moderation.'` | `portal.client.verif.uploadSuccessToast` |
| 65 | `"Account Verification Rejected"` | `portal.client.verif.rejectedTitle` |
| 69 | `'Verification document did not meet compliance requirements. Please resubmit updated documents.'` | `portal.client.verif.defaultRejectionReason` |
| 83 | `"Upload Official KYC Verification Documents"` | `portal.client.verif.uploadCardTitle` |
| 90 | `"Select Document Requirement Type"` | `portal.client.verif.selectTypeLabel` |
| 93 | `"Commercial License"` | `portal.client.verif.typeLicenseTitle` |
| 93 | `"Government Business Reg Cert"` | `portal.client.verif.typeLicenseDesc` |
| 94 | `"Tax ID / VAT Cert"` | `portal.client.verif.typeTaxTitle` |
| 94 | `"Official Ministry Tax Registration"` | `portal.client.verif.typeTaxDesc` |
| 95 | `"Representative Passport"` | `portal.client.verif.typePassportTitle` |
| 95 | `"Director or Manager ID Scan"` | `portal.client.verif.typePassportDesc` |
| 120 | `"Drag and drop file here, or click to upload"` | `portal.client.verif.dragDropTitle` |
| 121 | `"Supports PDF, PNG, JPG scans up to 15MB file size."` | `portal.client.verif.dragDropSub` |
| 127 | `"Encrypting & Uploading Document..."` | `portal.client.verif.uploadingStatus` |
| 135 | `"Upload File"` | `portal.client.verif.uploadBtn` |
| 143 | `"Submitted Verification Documents"` | `portal.client.verif.submittedDocsTitle` |
| 147 | `"No documents uploaded yet for this account."` | `portal.client.verif.noDocsYet` |
| 171 | `"Interactive Demo Submission Trigger"` | `portal.client.verif.demoTriggerTitle` |
| 174 | `"Test administrative approval workflows instantly without navigating away."` | `portal.client.verif.demoTriggerSub` |
| 182 | `'⚡ Demo: Instant Admin Approval applied!'` | `portal.client.verif.demoApproveToast` |
| 193 | `'Illegible commercial license scan.'` | `portal.client.verif.demoRejectReason` |
| 194 | `'⚡ Demo: Instant Admin Rejection applied!'` | `portal.client.verif.demoRejectToast` |

#### File 10: `src/components/portals/ClientsList.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 42 | `"Corporate Clients Directory"` | `portal.clientsList.title` |
| 44 | `"Manage UN agencies, international NGOs, government ministries, and commercial importers."` | `portal.clientsList.sub` |
| 66 | `"Search by company name, contact person, or email..."` | `portal.clientsList.searchPlaceholder` |
| 77 | `"Company Name"` | `portal.clientsList.thCompany` |
| 78 | `"Category & Country"` | `portal.clientsList.thCategoryCountry` |
| 79 | `"Total Spent"` | `portal.clientsList.thTotalSpent` |
| 80 | `"Verification State"` | `portal.clientsList.thState` |
| 81 | `"Action"` | `portal.clientsList.thAction` |
| 88 | `"No client accounts matching current search."` | `portal.clientsList.noClients` |
| 116 | `"View Details"` | `portal.clientsList.viewDetailsBtn` |

#### File 11: `src/components/portals/DocumentModeration.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 37 | `'Quick approved from moderation queue'` | `portal.docMod.quickApproveNotes` |
| 38 | `'approved successfully.'` | `portal.docMod.approveSuccessToast` |
| 42 | `'Document failed administrative verification checks.'` | `portal.docMod.quickRejectReason` |
| 43 | `'rejected.'` | `portal.docMod.rejectSuccessToast` |
| 53 | `"Document Verification Moderation Queue"` | `portal.docMod.title` |
| 55 | `"Review, approve, or reject Know Your Customer (KYC) identity documents submitted by corporate shippers."` | `portal.docMod.sub` |
| 81 | `"Search by client name, document title, or type..."` | `portal.docMod.searchPlaceholder` |
| 93 | `"Client / Company"` | `portal.docMod.thClient` |
| 94 | `"Document Title & Type"` | `portal.docMod.thTitleType` |
| 95 | `"Submitted Date"` | `portal.docMod.thSubmittedDate` |
| 96 | `"Status"` | `portal.docMod.thStatus` |
| 97 | `"Actions"` | `portal.docMod.thActions` |
| 104 | `"No document verifications matching current filters."` | `portal.docMod.noDocs` |
| 133 | `"Review"` | `portal.docMod.reviewBtn` |
| 144 | `"Approve"` | `portal.docMod.approveBtn` |
| 153 | `"Reject"` | `portal.docMod.rejectBtn` |

#### File 12: `src/components/portals/DocumentPreviewModal.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 19 | `'Document image / scan is illegible or blurry'` | `portal.docPreview.reasonIllegible` |
| 20 | `'Commercial license has expired'` | `portal.docPreview.reasonExpired` |
| 21 | `'Tax Identification Number (TIN) mismatch'` | `portal.docPreview.reasonTinMismatch` |
| 22 | `'Missing official government seal or authorized signature'` | `portal.docPreview.reasonMissingSeal` |
| 23 | `'Invalid document type uploaded'` | `portal.docPreview.reasonInvalidType` |
| 45 | `'Verification document did not meet compliance requirements.'` | `portal.docPreview.defaultRejectReason` |
| 68 | `"Client Organization"` | `portal.docPreview.clientOrgLabel` |
| 72 | `"Document Type"` | `portal.docPreview.docTypeLabel` |
| 76 | `"File Details"` | `portal.docPreview.fileDetailsLabel` |
| 80 | `"Submitted At"` | `portal.docPreview.submittedAtLabel` |
| 92 | `"Official Document PDF Scan • High Resolution Verification Copy"` | `portal.docPreview.previewNotice` |
| 101 | `"Open Document in New Tab"` | `portal.docPreview.openNewTabBtn` |
| 109 | `"Specify Rejection Reason"` | `portal.docPreview.specifyReasonTitle` |
| 113 | `"Select standard rejection reason..."` | `portal.docPreview.reasonPlaceholder` |
| 123 | `"Additional notes for client regarding required corrections..."` | `portal.docPreview.customNotesPlaceholder` |
| 130 | `"Cancel"` | `portal.docPreview.cancelBtn` |
| 133 | `"Confirm Rejection"` | `portal.docPreview.confirmRejectBtn` |
| 139 | `"Admin Notes (Optional)"` | `portal.docPreview.adminNotesLabel` |
| 141 | `"Internal verification notes or clearance reference number..."` | `portal.docPreview.adminNotesPlaceholder` |
| 154 | `"Reject Document"` | `portal.docPreview.rejectDocBtn` |
| 158 | `"Approve Document"` | `portal.docPreview.approveDocBtn` |

#### File 13: `src/components/portals/OrdersManagement.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 43 | `"Multimodal Logistics Orders & Live Tracking Control"` | `portal.ordersMgmt.title` |
| 45 | `"Monitor real-time shipments across Rail, Road, Air and Sea corridors."` | `portal.ordersMgmt.sub` |
| 67 | `"Search by tracking number, client name, origin or destination..."` | `portal.ordersMgmt.searchPlaceholder` |
| 78 | `"Tracking # & Mode"` | `portal.ordersMgmt.thTrackingMode` |
| 79 | `"Client Shipper"` | `portal.ordersMgmt.thClient` |
| 80 | `"Route (Origin → Destination)"` | `portal.ordersMgmt.thRoute` |
| 81 | `"Latest Checkpoint"` | `portal.ordersMgmt.thLatestCheckpoint` |
| 82 | `"Status"` | `portal.ordersMgmt.thStatus` |
| 83 | `"Action"` | `portal.ordersMgmt.thAction` |
| 90 | `"No freight orders matching search filters."` | `portal.ordersMgmt.noOrders` |
| 100 | `" Tons"` | `portal.ordersMgmt.tonsSuffix` |
| 118 | `"No checkpoints posted"` | `portal.ordersMgmt.noCheckpoints` |
| 131 | `"Update Status"` | `portal.ordersMgmt.updateStatusBtn` |

#### File 14: `src/components/portals/PartnerBids.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 58 | `'Quote bid submitted for '` | `portal.partnerBids.bidSubmittedToast` |
| 68 | `"Open Freight Request Bidding Board"` | `portal.partnerBids.title` |
| 70 | `"Submit competitive bids on open cargo movement requests posted by NSS and corporate shippers."` | `portal.partnerBids.sub` |
| 79 | `" FREIGHT"` | `portal.partnerBids.freightSuffix` |
| 81 | `" Bids Submitted"` | `portal.partnerBids.bidsSubmittedSuffix` |
| 86 | `" Tons)"` | `portal.partnerBids.tonsSuffix` |
| 87 | `"Origin: "` | `portal.partnerBids.originLabel` |
| 88 | `"Dest: "` | `portal.partnerBids.destLabel` |
| 94 | `"Target Budget"` | `portal.partnerBids.targetBudgetLabel` |
| 100 | `"Submit Bid"` | `portal.partnerBids.submitBidBtn` |
| 115 | `"Your Submitted Bids & Contracts"` | `portal.partnerBids.yourBidsTitle` |
| 123 | `"Client Shipper"` | `portal.partnerBids.thClient` |
| 124 | `"Route & Cargo"` | `portal.partnerBids.thRouteCargo` |
| 125 | `"Proposed Rate"` | `portal.partnerBids.thProposedRate` |
| 126 | `"Est. Days"` | `portal.partnerBids.thEstDays` |
| 127 | `"Status"` | `portal.partnerBids.thStatus` |
| 134 | `"You have not submitted any bids yet. Choose an open request above to bid!"` | `portal.partnerBids.noBids` |
| 146 | `" Days"` | `portal.partnerBids.daysSuffix` |
| 162 | `"Submit Quote Bid for "` | `portal.partnerBids.modalTitlePrefix` |
| 169 | `"Cargo Requirements"` | `portal.partnerBids.cargoReqsTitle` |
| 172 | `"Client Budget: $"` | `portal.partnerBids.clientBudgetLabel` |
| 176 | `"Your Proposed Rate Price ($ USD)"` | `portal.partnerBids.proposedRateLabel` |
| 186 | `"Estimated Transit Time (Days)"` | `portal.partnerBids.estTransitTimeLabel` |
| 198 | `"Cancel"` | `portal.partnerBids.cancelBtn` |
| 200 | `"Submit Bid Proposal (+50 XP)"` | `portal.partnerBids.confirmBidBtn` |

#### File 15: `src/components/portals/PartnerDetailSheet.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 34 | `'Updated XP by '` | `portal.partnerDetail.xpUpdatedToast` |
| 41 | `'Trust score updated to '` | `portal.partnerDetail.trustUpdatedToast` |
| 54 | `"Joined "` | `portal.partnerDetail.joinedLabel` |
| 66 | `"Tier Level "` | `portal.partnerDetail.tierLevelPrefix` |
| 66 | `"% Platform Fee"` | `portal.partnerDetail.feeSuffix` |
| 72 | `"Current XP"` | `portal.partnerDetail.currentXpLabel` |
| 87 | `"Business Volume"` | `portal.partnerDetail.busVolumeLabel` |
| 91 | `"Trust Score"` | `portal.partnerDetail.trustScoreLabel` |
| 95 | `"On-Time Delivery"` | `portal.partnerDetail.onTimeDeliveryLabel` |
| 99 | `"Completed Orders"` | `portal.partnerDetail.completedOrdersLabel` |
| 106 | `"Partner Status Control"` | `portal.partnerDetail.statusControlTitle` |
| 114 | `"Active"` | `portal.partnerDetail.statusActive` |
| 122 | `"Pending"` | `portal.partnerDetail.statusPending` |
| 130 | `"Suspend"` | `portal.partnerDetail.statusSuspend` |
| 138 | `"Manual Gamification Override"` | `portal.partnerDetail.gamificationOverrideTitle` |
| 142 | `"Award / Deduct XP Points"` | `portal.partnerDetail.xpAdjustLabel` |
| 151 | `"+ Add XP"` | `portal.partnerDetail.addXpBtn` |
| 154 | `"- Deduct"` | `portal.partnerDetail.deductXpBtn` |
| 160 | `"Adjust Trust Score (0-100)"` | `portal.partnerDetail.trustAdjustLabel` |
| 170 | `"Set Score"` | `portal.partnerDetail.setScoreBtn` |

#### File 16: `src/components/portals/PartnerGamification.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 38 | `"Tier Level "` | `portal.partnerGam.tierLevelPrefix` |
| 38 | `" Partner"` | `portal.partnerGam.tierLevelSuffix` |
| 41 | `"Platform Service Fee: "` | `portal.partnerGam.serviceFeePrefix` |
| 41 | `" (Perks active)"` | `portal.partnerGam.perksActiveSuffix` |
| 46 | `"Total Experience Points"` | `portal.partnerGam.totalXpLabel` |
| 54 | `"Progress to Next Tier Level"` | `portal.partnerGam.progressNextTier` |
| 67 | `"Active Level Tier Perks"` | `portal.partnerGam.activePerksTitle` |
| 85 | `"Lifetime Business Volume ($ USD GMV)"` | `portal.partnerGam.lifetimeVolumeTitle` |
| 91 | `"Processed contracts through NSS network"` | `portal.partnerGam.processedContractsSub` |
| 96 | `"Monthly Volume Target"` | `portal.partnerGam.monthlyVolumeTarget` |
| 113 | `"Composite Trust Score Metric"` | `portal.partnerGam.trustScoreTitle` |
| 122 | `"Ranked based on reliability & timeliness"` | `portal.partnerGam.rankedSub` |
| 126 | `" On-Time Rate"` | `portal.partnerGam.onTimeRateLabel` |
| 127 | `" Cargo Integrity"` | `portal.partnerGam.cargoIntegrityLabel` |
| 128 | `" Avg Response"` | `portal.partnerGam.avgResponseLabel` |
| 136 | `" reviews)"` | `portal.partnerGam.reviewsSuffix` |
| 140 | `" Dispute Rate"` | `portal.partnerGam.disputeRateLabel` |

#### File 17: `src/components/portals/PartnerMarketplace.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 70 | `'Please enter a title for the service listing.'` | `portal.marketplace.errTitle` |
| 85 | `'Service listing created successfully.'` | `portal.marketplace.createSuccessToast` |
| 97 | `"Service & Goods Marketplace Manager"` | `portal.marketplace.title` |
| 99 | `"Publish and manage available freight wagons, trucking fleets, warehouses, and customs services."` | `portal.marketplace.sub` |
| 106 | `"Add New Service Listing"` | `portal.marketplace.addNewListingBtn` |
| 116 | `"Search listings by title, route or location..."` | `portal.marketplace.searchPlaceholder` |
| 125 | `"All Categories"` | `portal.marketplace.catAll` |
| 129 | `"Rail Logistics"` | `portal.marketplace.catRail` |
| 130 | `"Road Freight"` | `portal.marketplace.catRoad` |
| 131 | `"Warehousing & Storage"` | `portal.marketplace.catWarehousing` |
| 132 | `"Heavy Equipment"` | `portal.marketplace.catHeavy` |
| 133 | `"Customs Clearance"` | `portal.marketplace.catCustoms` |
| 134 | `"Air Charter"` | `portal.marketplace.catAir` |
| 144 | `"Listing Title & Category"` | `portal.marketplace.thTitleCat` |
| 145 | `"Route / Location Scope"` | `portal.marketplace.thRouteScope` |
| 146 | `"Capacity"` | `portal.marketplace.thCapacity` |
| 147 | `"Rate ($ USD)"` | `portal.marketplace.thRate` |
| 148 | `"Status"` | `portal.marketplace.thStatus` |
| 149 | `"Actions"` | `portal.marketplace.thActions` |
| 156 | `"No marketplace listings found. Click \"Add New Service Listing\" to create one."` | `portal.marketplace.noListings` |
| 192 | `'Removed listing'` | `portal.marketplace.removedToast` |
| 212 | `"Create Marketplace Service Listing"` | `portal.marketplace.dialogTitle` |
| 218 | `"Service Title"` | `portal.marketplace.serviceTitleLabel` |
| 221 | `"e.g. Covered Rail Wagons — Tashkent to Hairatan"` | `portal.marketplace.serviceTitlePlaceholder` |
| 230 | `"Category"` | `portal.marketplace.categoryLabel` |
| 247 | `"Capacity Description"` | `portal.marketplace.capacityLabel` |
| 250 | `"e.g. 68 Tons per Wagon"` | `portal.marketplace.capacityPlaceholder` |
| 259 | `"Origin / Location"` | `portal.marketplace.originLabel` |
| 268 | `"Destination Scope"` | `portal.marketplace.destLabel` |
| 279 | `"Rate Price ($ USD)"` | `portal.marketplace.ratePriceLabel` |
| 289 | `"Pricing Unit"` | `portal.marketplace.pricingUnitLabel` |
| 294 | `"per Container / Wagon"` | `portal.marketplace.unitPerContainer` |
| 295 | `"per Ton"` | `portal.marketplace.unitPerTon`
| 296 | `"per Kilometer"` | `portal.marketplace.unitPerKm`
| 297 | `"per SqFt Month"` | `portal.marketplace.unitPerSqftMonth`
| 298 | `"per Day"` | `portal.marketplace.unitPerDay`
| 306 | `"Service Specifications & Description"` | `portal.marketplace.specDescLabel`
| 308 | `"Details regarding wagon specifications, security escorts, insurance..."` | `portal.marketplace.specDescPlaceholder`
| 316 | `"Cancel"` | `portal.marketplace.cancelBtn` |
| 318 | `"Publish Service Listing"` | `portal.marketplace.publishBtn` |

#### File 18: `src/components/portals/PartnersList.tsx`
| Line | Verbatim String | Proposed Key |
|---|---|---|
| 43 | `"Logistics Partners & Vendors Directory"` | `portal.partnersList.title` |
| 44 | `"Manage sub-contracted rail operators, trucking fleets, and warehouse partners across 11 countries."` | `portal.partnersList.sub` |
| 66 | `"Search partner by company, representative name, or country..."` | `portal.partnersList.searchPlaceholder` |
| 77 | `"Partner Organization"` | `portal.partnersList.thOrg` |
| 78 | `"Level Tier & XP"` | `portal.partnersList.thTierXp` |
| 79 | `"Business Volume"` | `portal.partnersList.thBusinessVolume` |
| 80 | `"Trust Score"` | `portal.partnersList.thTrustScore` |
| 81 | `"Status"` | `portal.partnersList.thStatus` |
| 82 | `"Action"` | `portal.partnersList.thAction` |
| 89 | `"No partner vendors matching current search criteria."` | `portal.partnersList.noPartners` |
| 125 | `"Manage"` | `portal.partnersList.manageBtn` |

#### File 19: `src/components/portals/StatusBadge.tsx`
| Line | Verbatim String / Dynamic formatting | Proposed Key |
|---|---|---|
| 17 | `status.replace('_', ' ').toUpperCase()` | `portal.status.<status_name>` |
| 25 | `status.replace('_', ' ').toUpperCase()` | `portal.status.<status_name>` |
| 31 | `status.replace('_', ' ').toUpperCase()` | `portal.status.<status_name>` |
| 37 | `status.replace('_', ' ').toUpperCase()` | `portal.status.<status_name>` |

---

## 4. Remediation Implementation Strategy & Blueprint

1. **Translation Dictionaries Update**:
   - Add all 150+ new `portal.*` keys to `src/i18n/translations/en.ts`.
   - Complete translations for `ru.ts` (Russian), `fa.ts` (Dari), and `ps.ts` (Pashto).
   - Because `Record<TranslationKey, string>` is strictly checked by TypeScript, all 4 dictionary files MUST contain identical key sets to avoid build failure during `npm run build`.

2. **Component Refactoring**:
   - Import `useI18n` hook into components missing it (e.g. `AdminDashboard`, `ClientDashboard`, `PartnerGamification`, etc.).
   - Replace literal JSX text nodes, placeholders, toast notifications, select options, and button labels with `t(...)`.

3. **Verification**:
   - Run `npm run lint` to verify ESLint compliance.
   - Run `npm run build` to verify strict TypeScript type completeness across `en.ts`, `ru.ts`, `fa.ts`, `ps.ts`.

---
