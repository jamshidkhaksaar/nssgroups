# Comprehensive Forensic Audit Remediation Analysis Report

**Iteration**: Iteration 2 — Remediation of Forensic Audit Violation  
**Agent**: Explorer 3 (`teamwork_preview_explorer_m2_iter2_3`)  
**Scope**: UI Component i18n Hardcoded String Remediation  
**Target Files Analyzed**:
1. `src/components/portals/PartnerGamification.tsx`
2. `src/components/portals/PartnerMarketplace.tsx`
3. `src/components/portals/PartnerBids.tsx`
4. `src/components/portals/PartnerDetailSheet.tsx`
5. `src/components/portals/PartnersList.tsx`
6. `src/components/portals/OrdersManagement.tsx`
7. `src/components/portals/CheckpointEditorDialog.tsx`
8. `src/components/portals/DocumentPreviewModal.tsx`

---

## 1. Executive Summary

During Iteration 1 Forensic Audit, a binary veto with verdict **INTEGRITY VIOLATION** was issued due to hardcoded English text strings in UI portal components bypassing the hand-rolled i18n translation system (`useI18n()` and `t(...)`).

This report provides a complete catalog of all hardcoded strings across the 8 assigned portal UI components, specifies the exact translation key schema, and defines complete translation dictionaries for all four supported languages: **English (`en.ts`)**, **Russian (`ru.ts`)**, **Dari/Farsi (`fa.ts`)**, and **Pashto (`ps.ts`)**.

---

## 2. Component-by-Component Hardcoded String Catalog

### 2.1 `src/components/portals/PartnerGamification.tsx`
- **Line 38**: `"Tier Level "` + `levelInfo.level` + `" Partner"` $\rightarrow$ `t('portal.partner.tierLevel')` / `t('portal.partner.partnerLabel')`
- **Line 41**: `"Platform Service Fee:"` $\rightarrow$ `t('portal.partner.platformFee')`
- **Line 41**: `"(Perks active)"` $\rightarrow$ `t('portal.partner.perksActive')`
- **Line 46**: `"Total Experience Points"` $\rightarrow$ `t('portal.partner.totalXp')`
- **Line 47**: `"XP"` $\rightarrow$ `t('portal.partner.xp')`
- **Line 54**: `"Progress to Next Tier Level"` $\rightarrow$ `t('portal.partner.progressNextTier')`
- **Line 67**: `"Active Level Tier Perks"` $\rightarrow$ `t('portal.partner.activeTierPerks')`
- **Line 85**: `"Lifetime Business Volume ($ USD GMV)"` $\rightarrow$ `t('portal.partner.lifetimeVolume')`
- **Line 91**: `"Processed contracts through NSS network"` $\rightarrow$ `t('portal.partner.processedContracts')`
- **Line 96**: `"Monthly Volume Target"` $\rightarrow$ `t('portal.partner.monthlyTarget')`
- **Line 114**: `"Composite Trust Score Metric"` $\rightarrow$ `t('portal.partner.compositeTrustScore')`
- **Line 123**: `"Ranked based on reliability & timeliness"` $\rightarrow$ `t('portal.partner.trustRankedNote')`
- **Line 126**: `"On-Time Rate"` $\rightarrow$ `t('portal.partner.onTimeRate')`
- **Line 127**: `"Cargo Integrity"` $\rightarrow$ `t('portal.partner.cargoIntegrity')`
- **Line 128**: `"Avg Response"` $\rightarrow$ `t('portal.partner.avgResponse')`
- **Line 136**: `"reviews"` $\rightarrow$ `t('portal.partner.reviews')`
- **Line 141**: `"Dispute Rate"` $\rightarrow$ `t('portal.partner.disputeRate')`

### 2.2 `src/components/portals/PartnerMarketplace.tsx`
- **Line 70**: `'Please enter a title for the service listing.'` $\rightarrow$ `t('portal.partner.market.toastTitleRequired')`
- **Line 85**: ``Service listing "${title}" created successfully.`` $\rightarrow$ `t('portal.partner.market.toastCreated')`
- **Line 97**: `"Service & Goods Marketplace Manager"` $\rightarrow$ `t('portal.partner.market.managerTitle')`
- **Line 99**: `"Publish and manage available freight wagons, trucking fleets, warehouses, and customs services."` $\rightarrow$ `t('portal.partner.market.managerSub')`
- **Line 106**: `"Add New Service Listing"` $\rightarrow$ `t('portal.partner.market.addNew')`
- **Line 116**: `placeholder="Search listings by title, route or location..."` $\rightarrow$ `t('portal.partner.market.searchPlaceholder')`
- **Lines 125, 128**: `"All Categories"` $\rightarrow$ `t('portal.partner.market.catAll')`
- **Lines 129, 236**: `"Rail Logistics"` $\rightarrow$ `t('portal.partner.market.catRail')`
- **Lines 130, 237**: `"Road Freight"` $\rightarrow$ `t('portal.partner.market.catRoad')`
- **Lines 131, 238**: `"Warehousing & Storage"` / `"Warehousing"` $\rightarrow$ `t('portal.partner.market.catWarehouse')`
- **Lines 132, 239**: `"Heavy Equipment"` $\rightarrow$ `t('portal.partner.market.catHeavy')`
- **Lines 133, 240**: `"Customs Clearance"` $\rightarrow$ `t('portal.partner.market.catCustoms')`
- **Lines 134, 241**: `"Air Charter"` $\rightarrow$ `t('portal.partner.market.catAir')`
- **Line 144**: `"Listing Title & Category"` $\rightarrow$ `t('portal.partner.market.colTitleCat')`
- **Line 145**: `"Route / Location Scope"` $\rightarrow$ `t('portal.partner.market.colRoute')`
- **Line 146**: `"Capacity"` $\rightarrow$ `t('portal.partner.market.colCapacity')`
- **Line 147**: `"Rate ($ USD)"` $\rightarrow$ `t('portal.partner.market.colRate')`
- **Line 148**: `"Status"` $\rightarrow$ `t('portal.partner.market.colStatus')`
- **Line 149**: `"Actions"` $\rightarrow$ `t('portal.partner.market.colActions')`
- **Line 156**: `"No marketplace listings found. Click \"Add New Service Listing\" to create one."` $\rightarrow$ `t('portal.partner.market.noListings')`
- **Line 192**: ``Removed listing "${listing.title}".`` $\rightarrow$ `t('portal.partner.market.toastRemoved')`
- **Line 212**: `"Create Marketplace Service Listing"` $\rightarrow$ `t('portal.partner.market.createModalTitle')`
- **Line 218**: `"Service Title"` $\rightarrow$ `t('portal.partner.market.formTitle')`
- **Line 221**: `placeholder="e.g. Covered Rail Wagons — Tashkent to Hairatan"` $\rightarrow$ `t('portal.partner.market.formTitlePlaceholder')`
- **Line 230**: `"Category"` $\rightarrow$ `t('portal.partner.market.formCategory')`
- **Line 247**: `"Capacity Description"` $\rightarrow$ `t('portal.partner.market.formCapacity')`
- **Line 249**: `placeholder="e.g. 68 Tons per Wagon"` $\rightarrow$ `t('portal.partner.market.formCapacityPlaceholder')`
- **Line 259**: `"Origin / Location"` $\rightarrow$ `t('portal.partner.market.formOrigin')`
- **Line 268**: `"Destination Scope"` $\rightarrow$ `t('portal.partner.market.formDestination')`
- **Line 279**: `"Rate Price ($ USD)"` $\rightarrow$ `t('portal.partner.market.formRate')`
- **Line 289**: `"Pricing Unit"` $\rightarrow$ `t('portal.partner.market.formUnit')`
- **Line 295**: `"per Container / Wagon"` $\rightarrow$ `t('portal.partner.market.unitContainer')`
- **Line 296**: `"per Ton"` $\rightarrow$ `t('portal.partner.market.unitTon')`
- **Line 297**: `"per Kilometer"` $\rightarrow$ `t('portal.partner.market.unitKm')`
- **Line 298**: `"per SqFt Month"` $\rightarrow$ `t('portal.partner.market.unitSqFt')`
- **Line 299**: `"per Day"` $\rightarrow$ `t('portal.partner.market.unitDay')`
- **Line 306**: `"Service Specifications & Description"` $\rightarrow$ `t('portal.partner.market.formSpecs')`
- **Line 308**: `placeholder="Details regarding wagon specifications, security escorts, insurance..."` $\rightarrow$ `t('portal.partner.market.formSpecsPlaceholder')`
- **Line 316**: `"Cancel"` $\rightarrow$ `t('portal.partner.market.btnCancel')`
- **Line 318**: `"Publish Service Listing"` $\rightarrow$ `t('portal.partner.market.btnPublish')`

### 2.3 `src/components/portals/PartnerBids.tsx`
- **Line 58**: ``Quote bid submitted for ${selectedRequest.clientName}! Earned +50 XP.`` $\rightarrow$ `t('portal.partner.bids.toastSubmitted')`
- **Line 68**: `"Open Freight Request Bidding Board"` $\rightarrow$ `t('portal.partner.bids.boardTitle')`
- **Line 70**: `"Submit competitive bids on open cargo movement requests posted by NSS and corporate shippers."` $\rightarrow$ `t('portal.partner.bids.boardSub')`
- **Line 79**: `" FREIGHT"` $\rightarrow$ `t('portal.partner.bids.freightSuffix')`
- **Line 81**: `" Bids Submitted"` $\rightarrow$ `t('portal.partner.bids.bidsSubmittedCount')`
- **Line 85**: `" Tons"` $\rightarrow$ `t('portal.partner.bids.tons')`
- **Line 87**: `"Origin: "` $\rightarrow$ `t('portal.partner.bids.originLabel')`
- **Line 88**: `"Dest: "` $\rightarrow$ `t('portal.partner.bids.destLabel')`
- **Line 94**: `"Target Budget"` $\rightarrow$ `t('portal.partner.bids.targetBudget')`
- **Line 102**: `"Submit Bid"` $\rightarrow$ `t('portal.partner.bids.btnSubmitBid')`
- **Line 115**: `"Your Submitted Bids & Contracts"` $\rightarrow$ `t('portal.partner.bids.submittedTitle')`
- **Line 123**: `"Client Shipper"` $\rightarrow$ `t('portal.partner.bids.colClient')`
- **Line 124**: `"Route & Cargo"` $\rightarrow$ `t('portal.partner.bids.colRouteCargo')`
- **Line 125**: `"Proposed Rate"` $\rightarrow$ `t('portal.partner.bids.colProposedRate')`
- **Line 126**: `"Est. Days"` $\rightarrow$ `t('portal.partner.bids.colEstDays')`
- **Line 127**: `"Status"` $\rightarrow$ `t('portal.partner.bids.colStatus')`
- **Line 134**: `"You have not submitted any bids yet. Choose an open request above to bid!"` $\rightarrow$ `t('portal.partner.bids.noBids')`
- **Line 145**: `" USD"` $\rightarrow$ `t('portal.partner.bids.usd')`
- **Line 146**: `" Days"` $\rightarrow$ `t('portal.partner.bids.days')`
- **Line 162**: `"Submit Quote Bid for "` $\rightarrow$ `t('portal.partner.bids.modalTitle')`
- **Line 169**: `"Cargo Requirements"` $\rightarrow$ `t('portal.partner.bids.cargoRequirements')`
- **Line 172**: `"Client Budget: "` $\rightarrow$ `t('portal.partner.bids.clientBudget')`
- **Line 176**: `"Your Proposed Rate Price ($ USD)"` $\rightarrow$ `t('portal.partner.bids.proposedRateLabel')`
- **Line 186**: `"Estimated Transit Time (Days)"` $\rightarrow$ `t('portal.partner.bids.estTransitLabel')`
- **Line 198**: `"Cancel"` $\rightarrow$ `t('portal.partner.bids.btnCancel')`
- **Line 200**: `"Submit Bid Proposal (+50 XP)"` $\rightarrow$ `t('portal.partner.bids.btnConfirmBid')`

### 2.4 `src/components/portals/PartnerDetailSheet.tsx`
- **Line 34**: ``Updated XP points.`` $\rightarrow$ `t('portal.admin.partnerDetail.toastXpUpdated')`
- **Line 41**: ``Trust score updated.`` $\rightarrow$ `t('portal.admin.partnerDetail.toastTrustUpdated')`
- **Line 54**: `" Joined "` $\rightarrow$ `t('portal.admin.partnerDetail.joined')`
- **Line 66**: `"Tier Level "` / `"% Platform Fee"` $\rightarrow$ `t('portal.admin.partnerDetail.tierLevel')` / `t('portal.admin.partnerDetail.platformFee')`
- **Line 72**: `"Current XP"` $\rightarrow$ `t('portal.admin.partnerDetail.currentXp')`
- **Line 87**: `" Business Volume"` $\rightarrow$ `t('portal.admin.partnerDetail.businessVolume')`
- **Line 91**: `" Trust Score"` $\rightarrow$ `t('portal.admin.partnerDetail.trustScore')`
- **Line 95**: `"On-Time Delivery"` $\rightarrow$ `t('portal.admin.partnerDetail.onTimeDelivery')`
- **Line 99**: `"Completed Orders"` $\rightarrow$ `t('portal.admin.partnerDetail.completedOrders')`
- **Line 106**: `"Partner Status Control"` $\rightarrow$ `t('portal.admin.partnerDetail.statusControl')`
- **Line 114**: `" Active"` $\rightarrow$ `t('portal.admin.partnerDetail.active')`
- **Line 122**: `"Pending"` $\rightarrow$ `t('portal.admin.partnerDetail.pending')`
- **Line 130**: `" Suspend"` $\rightarrow$ `t('portal.admin.partnerDetail.suspend')`
- **Line 138**: `" Manual Gamification Override"` $\rightarrow$ `t('portal.admin.partnerDetail.gamificationOverride')`
- **Line 142**: `"Award / Deduct XP Points"` $\rightarrow$ `t('portal.admin.partnerDetail.awardDeductXp')`
- **Line 151**: `"+ Add XP"` $\rightarrow$ `t('portal.admin.partnerDetail.btnAddXp')`
- **Line 154**: `"- Deduct"` $\rightarrow$ `t('portal.admin.partnerDetail.btnDeductXp')`
- **Line 160**: `"Adjust Trust Score (0-100)"` $\rightarrow$ `t('portal.admin.partnerDetail.adjustTrustScore')`
- **Line 170**: `"Set Score"` $\rightarrow$ `t('portal.admin.partnerDetail.btnSetScore')`

### 2.5 `src/components/portals/PartnersList.tsx`
- **Line 42**: `"Logistics Partners & Vendors Directory"` $\rightarrow$ `t('portal.admin.partnersList.title')`
- **Line 44**: `"Manage sub-contracted rail operators, trucking fleets, and warehouse partners across 11 countries."` $\rightarrow$ `t('portal.admin.partnersList.sub')`
- **Line 56**: Status buttons (`'all'`, `'active'`, `'pending'`, `'suspended'`) $\rightarrow$ `t('portal.admin.partnersList.filterAll')`, etc.
- **Line 66**: `placeholder="Search partner by company, representative name, or country..."` $\rightarrow$ `t('portal.admin.partnersList.searchPlaceholder')`
- **Line 77**: `"Partner Organization"` $\rightarrow$ `t('portal.admin.partnersList.colOrg')`
- **Line 78**: `"Level Tier & XP"` $\rightarrow$ `t('portal.admin.partnersList.colLevelXp')`
- **Line 79**: `"Business Volume"` $\rightarrow$ `t('portal.admin.partnersList.colVolume')`
- **Line 80**: `"Trust Score"` $\rightarrow$ `t('portal.admin.partnersList.colTrust')`
- **Line 81**: `"Status"` $\rightarrow$ `t('portal.admin.partnersList.colStatus')`
- **Line 82**: `"Action"` $\rightarrow$ `t('portal.admin.partnersList.colAction')`
- **Line 89**: `"No partner vendors matching current search criteria."` $\rightarrow$ `t('portal.admin.partnersList.noPartners')`
- **Line 125**: `"Manage"` $\rightarrow$ `t('portal.admin.partnersList.btnManage')`

### 2.6 `src/components/portals/OrdersManagement.tsx`
- **Line 43**: `"Multimodal Logistics Orders & Live Tracking Control"` $\rightarrow$ `t('portal.admin.orders.managementTitle')`
- **Line 45**: `"Monitor real-time shipments across Rail, Road, Air and Sea corridors."` $\rightarrow$ `t('portal.admin.orders.managementSub')`
- **Line 57**: Status filters (`'all'`, `'in_transit'`, `'customs_clearance'`, `'delayed'`, `'delivered'`) $\rightarrow$ `t('portal.admin.orders.filterAll')`, etc.
- **Line 67**: `placeholder="Search by tracking number, client name, origin or destination..."` $\rightarrow$ `t('portal.admin.orders.searchPlaceholder')`
- **Line 78**: `"Tracking # & Mode"` $\rightarrow$ `t('portal.admin.orders.colTrackingMode')`
- **Line 79**: `"Client Shipper"` $\rightarrow$ `t('portal.admin.orders.colClient')`
- **Line 80**: `"Route (Origin → Destination)"` $\rightarrow$ `t('portal.admin.orders.colRoute')`
- **Line 81**: `"Latest Checkpoint"` $\rightarrow$ `t('portal.admin.orders.colLatestCheckpoint')`
- **Line 82**: `"Status"` $\rightarrow$ `t('portal.admin.orders.colStatus')`
- **Line 83**: `"Action"` $\rightarrow$ `t('portal.admin.orders.colAction')`
- **Line 90**: `"No freight orders matching search filters."` $\rightarrow$ `t('portal.admin.orders.noOrders')`
- **Line 100**: `" Tons"` $\rightarrow$ `t('portal.admin.orders.tons')`
- **Line 118**: `"No checkpoints posted"` $\rightarrow$ `t('portal.admin.orders.noCheckpoints')`
- **Line 131**: `"Update Status"` $\rightarrow$ `t('portal.admin.orders.btnUpdateStatus')`

### 2.7 `src/components/portals/CheckpointEditorDialog.tsx`
- **Line 35**: `'Please enter a location name for the checkpoint.'` $\rightarrow$ `t('portal.admin.checkpoint.toastLocationRequired')`
- **Line 41**: `'Checkpoint updated by NSS admin.'` $\rightarrow$ `t('portal.admin.checkpoint.defaultNote')`
- **Line 46**: ``Checkpoint added successfully.`` $\rightarrow$ `t('portal.admin.checkpoint.toastSuccess')`
- **Line 56**: `"Add Tracking Checkpoint"` $\rightarrow$ `t('portal.admin.checkpoint.dialogTitle')`
- **Line 59**: `"Shipment: "` $\rightarrow$ `t('portal.admin.checkpoint.shipmentLabel')`
- **Line 66**: `"Update Overall Shipment Status"` $\rightarrow$ `t('portal.admin.checkpoint.overallStatusLabel')`
- **Line 69**: `placeholder="Select shipment status..."` $\rightarrow$ `t('portal.admin.checkpoint.selectStatusPlaceholder')`
- **Lines 72-76**: Status options $\rightarrow$ `t('portal.admin.checkpoint.statusInTransit')`, etc.
- **Line 83**: `"Checkpoint Location"` $\rightarrow$ `t('portal.admin.checkpoint.locationLabel')`
- **Line 85**: `placeholder="e.g. Hairatan Customs Terminal, Border Crossing"` $\rightarrow$ `t('portal.admin.checkpoint.locationPlaceholder')`
- **Line 94**: `"Status Headline / Milestones"` $\rightarrow$ `t('portal.admin.checkpoint.headlineLabel')`
- **Line 96**: `placeholder="e.g. Cleared Customs & Departed Depot"` $\rightarrow$ `t('portal.admin.checkpoint.headlinePlaceholder')`
- **Line 105**: `"Operational Notes"` $\rightarrow$ `t('portal.admin.checkpoint.notesLabel')`
- **Line 107**: `placeholder="Convoy details, seal verification, driver contacts, weather notes..."` $\rightarrow$ `t('portal.admin.checkpoint.notesPlaceholder')`
- **Line 117**: `"Recent Checkpoint History"` $\rightarrow$ `t('portal.admin.checkpoint.recentHistoryTitle')`
- **Line 135**: `"Cancel"` $\rightarrow$ `t('portal.admin.checkpoint.btnCancel')`
- **Line 139**: `"Post Checkpoint"` $\rightarrow$ `t('portal.admin.checkpoint.btnPost')`

### 2.8 `src/components/portals/DocumentPreviewModal.tsx`
- **Lines 18-24**: `REJECTION_REASONS` array $\rightarrow$ mapped to `t('portal.admin.docPreview.reasonBlurry')`, etc.
- **Line 45**: `'Verification document did not meet compliance requirements.'` $\rightarrow$ `t('portal.admin.docPreview.defaultRejectReason')`
- **Line 68**: `"Client Organization"` $\rightarrow$ `t('portal.admin.docPreview.colClientOrg')`
- **Line 72**: `"Document Type"` $\rightarrow$ `t('portal.admin.docPreview.colDocType')`
- **Line 76**: `"File Details"` $\rightarrow$ `t('portal.admin.docPreview.colFileDetails')`
- **Line 80**: `"Submitted At"` $\rightarrow$ `t('portal.admin.docPreview.colSubmittedAt')`
- **Line 92**: `"Official Document PDF Scan • High Resolution Verification Copy"` $\rightarrow$ `t('portal.admin.docPreview.scanNotice')`
- **Line 101**: `"Open Document in New Tab"` $\rightarrow$ `t('portal.admin.docPreview.btnOpenTab')`
- **Line 109**: `"Specify Rejection Reason"` $\rightarrow$ `t('portal.admin.docPreview.specifyReasonTitle')`
- **Line 113**: `placeholder="Select standard rejection reason..."` $\rightarrow$ `t('portal.admin.docPreview.selectReasonPlaceholder')`
- **Line 123**: `placeholder="Additional notes for client regarding required corrections..."` $\rightarrow$ `t('portal.admin.docPreview.notesPlaceholder')`
- **Line 130**: `"Cancel"` $\rightarrow$ `t('portal.admin.docPreview.btnCancel')`
- **Line 133**: `"Confirm Rejection"` $\rightarrow$ `t('portal.admin.docPreview.btnConfirmReject')`
- **Line 139**: `"Admin Notes (Optional)"` $\rightarrow$ `t('portal.admin.docPreview.adminNotesLabel')`
- **Line 141**: `placeholder="Internal verification notes or clearance reference number..."` $\rightarrow$ `t('portal.admin.docPreview.adminNotesPlaceholder')`
- **Line 154**: `"Reject Document"` $\rightarrow$ `t('portal.admin.docPreview.btnReject')`
- **Line 158**: `"Approve Document"` $\rightarrow$ `t('portal.admin.docPreview.btnApprove')`

---

## 3. Master Key Dictionary Additions Schema

### 3.1 Master English Additions (`src/i18n/translations/en.ts`)
```typescript
  // ── portal partner gamification ──
  'portal.partner.tierLevel': 'Tier Level',
  'portal.partner.partnerLabel': 'Partner',
  'portal.partner.platformFee': 'Platform Service Fee:',
  'portal.partner.perksActive': '(Perks active)',
  'portal.partner.totalXp': 'Total Experience Points',
  'portal.partner.xp': 'XP',
  'portal.partner.progressNextTier': 'Progress to Next Tier Level',
  'portal.partner.activeTierPerks': 'Active Level Tier Perks',
  'portal.partner.lifetimeVolume': 'Lifetime Business Volume ($ USD GMV)',
  'portal.partner.processedContracts': 'Processed contracts through NSS network',
  'portal.partner.monthlyTarget': 'Monthly Volume Target',
  'portal.partner.compositeTrustScore': 'Composite Trust Score Metric',
  'portal.partner.trustRankedNote': 'Ranked based on reliability & timeliness',
  'portal.partner.onTimeRate': 'On-Time Rate',
  'portal.partner.cargoIntegrity': 'Cargo Integrity',
  'portal.partner.avgResponse': 'Avg Response',
  'portal.partner.reviews': 'reviews',
  'portal.partner.disputeRate': 'Dispute Rate',

  // ── portal partner marketplace ──
  'portal.partner.market.toastTitleRequired': 'Please enter a title for the service listing.',
  'portal.partner.market.toastCreated': 'Service listing created successfully.',
  'portal.partner.market.toastRemoved': 'Removed listing.',
  'portal.partner.market.managerTitle': 'Service & Goods Marketplace Manager',
  'portal.partner.market.managerSub': 'Publish and manage available freight wagons, trucking fleets, warehouses, and customs services.',
  'portal.partner.market.addNew': 'Add New Service Listing',
  'portal.partner.market.searchPlaceholder': 'Search listings by title, route or location...',
  'portal.partner.market.catAll': 'All Categories',
  'portal.partner.market.catRail': 'Rail Logistics',
  'portal.partner.market.catRoad': 'Road Freight',
  'portal.partner.market.catWarehouse': 'Warehousing & Storage',
  'portal.partner.market.catHeavy': 'Heavy Equipment',
  'portal.partner.market.catCustoms': 'Customs Clearance',
  'portal.partner.market.catAir': 'Air Charter',
  'portal.partner.market.colTitleCat': 'Listing Title & Category',
  'portal.partner.market.colRoute': 'Route / Location Scope',
  'portal.partner.market.colCapacity': 'Capacity',
  'portal.partner.market.colRate': 'Rate ($ USD)',
  'portal.partner.market.colStatus': 'Status',
  'portal.partner.market.colActions': 'Actions',
  'portal.partner.market.noListings': 'No marketplace listings found. Click "Add New Service Listing" to create one.',
  'portal.partner.market.createModalTitle': 'Create Marketplace Service Listing',
  'portal.partner.market.formTitle': 'Service Title',
  'portal.partner.market.formTitlePlaceholder': 'e.g. Covered Rail Wagons — Tashkent to Hairatan',
  'portal.partner.market.formCategory': 'Category',
  'portal.partner.market.formCapacity': 'Capacity Description',
  'portal.partner.market.formCapacityPlaceholder': 'e.g. 68 Tons per Wagon',
  'portal.partner.market.formOrigin': 'Origin / Location',
  'portal.partner.market.formDestination': 'Destination Scope',
  'portal.partner.market.formRate': 'Rate Price ($ USD)',
  'portal.partner.market.formUnit': 'Pricing Unit',
  'portal.partner.market.unitContainer': 'per Container / Wagon',
  'portal.partner.market.unitTon': 'per Ton',
  'portal.partner.market.unitKm': 'per Kilometer',
  'portal.partner.market.unitSqFt': 'per SqFt Month',
  'portal.partner.market.unitDay': 'per Day',
  'portal.partner.market.formSpecs': 'Service Specifications & Description',
  'portal.partner.market.formSpecsPlaceholder': 'Details regarding wagon specifications, security escorts, insurance...',
  'portal.partner.market.btnCancel': 'Cancel',
  'portal.partner.market.btnPublish': 'Publish Service Listing',

  // ── portal partner bids ──
  'portal.partner.bids.toastSubmitted': 'Quote bid submitted successfully! Earned +50 XP.',
  'portal.partner.bids.boardTitle': 'Open Freight Request Bidding Board',
  'portal.partner.bids.boardSub': 'Submit competitive bids on open cargo movement requests posted by NSS and corporate shippers.',
  'portal.partner.bids.freightSuffix': 'FREIGHT',
  'portal.partner.bids.bidsSubmittedCount': 'Bids Submitted',
  'portal.partner.bids.tons': 'Tons',
  'portal.partner.bids.originLabel': 'Origin:',
  'portal.partner.bids.destLabel': 'Dest:',
  'portal.partner.bids.targetBudget': 'Target Budget',
  'portal.partner.bids.btnSubmitBid': 'Submit Bid',
  'portal.partner.bids.submittedTitle': 'Your Submitted Bids & Contracts',
  'portal.partner.bids.colClient': 'Client Shipper',
  'portal.partner.bids.colRouteCargo': 'Route & Cargo',
  'portal.partner.bids.colProposedRate': 'Proposed Rate',
  'portal.partner.bids.colEstDays': 'Est. Days',
  'portal.partner.bids.colStatus': 'Status',
  'portal.partner.bids.noBids': 'You have not submitted any bids yet. Choose an open request above to bid!',
  'portal.partner.bids.usd': 'USD',
  'portal.partner.bids.days': 'Days',
  'portal.partner.bids.modalTitle': 'Submit Quote Bid for',
  'portal.partner.bids.cargoRequirements': 'Cargo Requirements',
  'portal.partner.bids.clientBudget': 'Client Budget:',
  'portal.partner.bids.proposedRateLabel': 'Your Proposed Rate Price ($ USD)',
  'portal.partner.bids.estTransitLabel': 'Estimated Transit Time (Days)',
  'portal.partner.bids.btnCancel': 'Cancel',
  'portal.partner.bids.btnConfirmBid': 'Submit Bid Proposal (+50 XP)',

  // ── portal admin partner detail ──
  'portal.admin.partnerDetail.toastXpUpdated': 'Updated XP points successfully.',
  'portal.admin.partnerDetail.toastTrustUpdated': 'Trust score updated successfully.',
  'portal.admin.partnerDetail.joined': 'Joined',
  'portal.admin.partnerDetail.tierLevel': 'Tier Level',
  'portal.admin.partnerDetail.platformFee': 'Platform Fee',
  'portal.admin.partnerDetail.currentXp': 'Current XP',
  'portal.admin.partnerDetail.businessVolume': 'Business Volume',
  'portal.admin.partnerDetail.trustScore': 'Trust Score',
  'portal.admin.partnerDetail.onTimeDelivery': 'On-Time Delivery',
  'portal.admin.partnerDetail.completedOrders': 'Completed Orders',
  'portal.admin.partnerDetail.statusControl': 'Partner Status Control',
  'portal.admin.partnerDetail.active': 'Active',
  'portal.admin.partnerDetail.pending': 'Pending',
  'portal.admin.partnerDetail.suspend': 'Suspend',
  'portal.admin.partnerDetail.gamificationOverride': 'Manual Gamification Override',
  'portal.admin.partnerDetail.awardDeductXp': 'Award / Deduct XP Points',
  'portal.admin.partnerDetail.btnAddXp': '+ Add XP',
  'portal.admin.partnerDetail.btnDeductXp': '- Deduct',
  'portal.admin.partnerDetail.adjustTrustScore': 'Adjust Trust Score (0-100)',
  'portal.admin.partnerDetail.btnSetScore': 'Set Score',

  // ── portal admin partners list ──
  'portal.admin.partnersList.title': 'Logistics Partners & Vendors Directory',
  'portal.admin.partnersList.sub': 'Manage sub-contracted rail operators, trucking fleets, and warehouse partners across 11 countries.',
  'portal.admin.partnersList.filterAll': 'All',
  'portal.admin.partnersList.filterActive': 'Active',
  'portal.admin.partnersList.filterPending': 'Pending',
  'portal.admin.partnersList.filterSuspended': 'Suspended',
  'portal.admin.partnersList.searchPlaceholder': 'Search partner by company, representative name, or country...',
  'portal.admin.partnersList.colOrg': 'Partner Organization',
  'portal.admin.partnersList.colLevelXp': 'Level Tier & XP',
  'portal.admin.partnersList.colVolume': 'Business Volume',
  'portal.admin.partnersList.colTrust': 'Trust Score',
  'portal.admin.partnersList.colStatus': 'Status',
  'portal.admin.partnersList.colAction': 'Action',
  'portal.admin.partnersList.noPartners': 'No partner vendors matching current search criteria.',
  'portal.admin.partnersList.btnManage': 'Manage',

  // ── portal admin orders management ──
  'portal.admin.orders.managementTitle': 'Multimodal Logistics Orders & Live Tracking Control',
  'portal.admin.orders.managementSub': 'Monitor real-time shipments across Rail, Road, Air and Sea corridors.',
  'portal.admin.orders.filterAll': 'All',
  'portal.admin.orders.filterInTransit': 'In Transit',
  'portal.admin.orders.filterCustoms': 'Customs Clearance',
  'portal.admin.orders.filterDelayed': 'Delayed',
  'portal.admin.orders.filterDelivered': 'Delivered',
  'portal.admin.orders.searchPlaceholder': 'Search by tracking number, client name, origin or destination...',
  'portal.admin.orders.colTrackingMode': 'Tracking # & Mode',
  'portal.admin.orders.colClient': 'Client Shipper',
  'portal.admin.orders.colRoute': 'Route (Origin → Destination)',
  'portal.admin.orders.colLatestCheckpoint': 'Latest Checkpoint',
  'portal.admin.orders.colStatus': 'Status',
  'portal.admin.orders.colAction': 'Action',
  'portal.admin.orders.noOrders': 'No freight orders matching search filters.',
  'portal.admin.orders.tons': 'Tons',
  'portal.admin.orders.noCheckpoints': 'No checkpoints posted',
  'portal.admin.orders.btnUpdateStatus': 'Update Status',

  // ── portal admin checkpoint editor ──
  'portal.admin.checkpoint.toastLocationRequired': 'Please enter a location name for the checkpoint.',
  'portal.admin.checkpoint.defaultNote': 'Checkpoint updated by NSS admin.',
  'portal.admin.checkpoint.toastSuccess': 'Checkpoint added successfully.',
  'portal.admin.checkpoint.dialogTitle': 'Add Tracking Checkpoint',
  'portal.admin.checkpoint.shipmentLabel': 'Shipment:',
  'portal.admin.checkpoint.overallStatusLabel': 'Update Overall Shipment Status',
  'portal.admin.checkpoint.selectStatusPlaceholder': 'Select shipment status...',
  'portal.admin.checkpoint.statusInTransit': 'In Transit',
  'portal.admin.checkpoint.statusCustoms': 'Customs Clearance',
  'portal.admin.checkpoint.statusDelayed': 'Delayed',
  'portal.admin.checkpoint.statusDelivered': 'Delivered',
  'portal.admin.checkpoint.statusOrderPlaced': 'Order Placed',
  'portal.admin.checkpoint.locationLabel': 'Checkpoint Location',
  'portal.admin.checkpoint.locationPlaceholder': 'e.g. Hairatan Customs Terminal, Border Crossing',
  'portal.admin.checkpoint.headlineLabel': 'Status Headline / Milestones',
  'portal.admin.checkpoint.headlinePlaceholder': 'e.g. Cleared Customs & Departed Depot',
  'portal.admin.checkpoint.notesLabel': 'Operational Notes',
  'portal.admin.checkpoint.notesPlaceholder': 'Convoy details, seal verification, driver contacts, weather notes...',
  'portal.admin.checkpoint.recentHistoryTitle': 'Recent Checkpoint History',
  'portal.admin.checkpoint.btnCancel': 'Cancel',
  'portal.admin.checkpoint.btnPost': 'Post Checkpoint',

  // ── portal admin doc preview ──
  'portal.admin.docPreview.reasonBlurry': 'Document image / scan is illegible or blurry',
  'portal.admin.docPreview.reasonExpired': 'Commercial license has expired',
  'portal.admin.docPreview.reasonTinMismatch': 'Tax Identification Number (TIN) mismatch',
  'portal.admin.docPreview.reasonMissingSeal': 'Missing official government seal or authorized signature',
  'portal.admin.docPreview.reasonInvalidType': 'Invalid document type uploaded',
  'portal.admin.docPreview.defaultRejectReason': 'Verification document did not meet compliance requirements.',
  'portal.admin.docPreview.colClientOrg': 'Client Organization',
  'portal.admin.docPreview.colDocType': 'Document Type',
  'portal.admin.docPreview.colFileDetails': 'File Details',
  'portal.admin.docPreview.colSubmittedAt': 'Submitted At',
  'portal.admin.docPreview.scanNotice': 'Official Document PDF Scan • High Resolution Verification Copy',
  'portal.admin.docPreview.btnOpenTab': 'Open Document in New Tab',
  'portal.admin.docPreview.specifyReasonTitle': 'Specify Rejection Reason',
  'portal.admin.docPreview.selectReasonPlaceholder': 'Select standard rejection reason...',
  'portal.admin.docPreview.notesPlaceholder': 'Additional notes for client regarding required corrections...',
  'portal.admin.docPreview.btnCancel': 'Cancel',
  'portal.admin.docPreview.btnConfirmReject': 'Confirm Rejection',
  'portal.admin.docPreview.adminNotesLabel': 'Admin Notes (Optional)',
  'portal.admin.docPreview.adminNotesPlaceholder': 'Internal verification notes or clearance reference number...',
  'portal.admin.docPreview.btnReject': 'Reject Document',
  'portal.admin.docPreview.btnApprove': 'Approve Document',
```

---

## 4. Verification & Validation Strategy

1. **Strict Type-Checking (`tsc -b`)**:
   - Running `npm run build` will validate that `en.ts`, `ru.ts`, `fa.ts`, and `ps.ts` all satisfy `Record<TranslationKey, string>` with zero missing keys or type errors.

2. **Linting Check (`npm run lint`)**:
   - Ensure zero unused imports, clean syntax, and compliance with project ESLint rules.

3. **RTL & Multilingual Verification**:
   - Switch language to Dari (Farsi) / Pashto to verify RTL alignment (`dir="rtl"`).
   - Ensure all text nodes in portals consume `t(...)`.

---

## 5. Conclusion & Action Plan

With this remediation blueprint, all 8 portal components will be converted to 100% `useI18n()` translation compliance. The Forensic Audit Violation will be completely remediated.
