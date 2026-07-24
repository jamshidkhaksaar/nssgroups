# Comprehensive Remediation Plan: Elimination of Hardcoded UI Strings in Client Portal Components

## Executive Summary
During Iteration 2 Forensic Audit, a binary veto was issued due to hardcoded English strings in UI components bypassing `t(...)`. 
This analysis provides an exhaustive catalog of all hardcoded strings found in:
1. `src/components/portals/ClientDashboard.tsx`
2. `src/components/portals/ClientVerification.tsx`
3. `src/components/portals/ClientRegistration.tsx`
4. `src/components/portals/ClientDetailSheet.tsx`
5. `src/components/portals/ClientsList.tsx`
6. `src/components/portals/DocumentModeration.tsx` & `src/components/portals/DocumentPreviewModal.tsx` (the Document Verification subsystem)

It establishes exact translation key mappings for `en.ts`, `ru.ts`, `fa.ts`, and `ps.ts` to maintain `Record<TranslationKey, string>` strict type compliance across the entire i18n system.

---

## 1. Exhaustive Component String Audit

### 1.1 `src/components/portals/ClientDashboard.tsx`
| Line | Current Hardcoded String | Proposed Translation Key |
|--- |--- |--- |
| 62 | `Freight order placed successfully! Tracking number generated.` | `client.dash.orderPlacedToast` |
| 76 | `Verified Account ID:` | `client.dash.verifiedId` |
| 85 | `Place Freight Order` | `client.dash.placeOrder` |
| 98 | `Active Cargo Shipments (${clientOrders.length})` | `client.dash.tabShipments` |
| 107 | `Billing & Invoices (${invoices.length})` | `client.dash.tabInvoices` |
| 116 | `Rate Calculator` | `client.dash.tabCalculator` |
| 125 | `Support Desk` | `client.dash.tabSupport` |
| 134 | `Active Shipments & Live Corridor Tracking` | `client.dash.shipmentsHeader` |
| 141 | `No active shipments for this account yet.` | `client.dash.noShipments` |
| 143 | `Book Your First Cargo` | `client.dash.bookFirstCargo` |
| 160 | `Origin → Destination` | `client.dash.routeLabel` |
| 164 | `Transit Mode` | `client.dash.modeLabel` |
| 165 | `Freight` (in `${order.mode} Freight`) | `client.dash.freightSuffix` |
| 168 | `Estimated Delivery` | `client.dash.estDelivery` |
| 175 | `Live Progress Steps` | `client.dash.liveProgress` |
| 206 | `Issued Invoices & Settlement History` | `client.dash.invoicesHeader` |
| 214 | `Invoice #` | `client.dash.invNum` |
| 215 | `Issue Date` | `client.dash.issueDate` |
| 216 | `Due Date` | `client.dash.dueDate` |
| 217 | `Amount (USD)` | `client.dash.amountUsd` |
| 218 | `Status` | `client.dash.status` |
| 219 | `Download` | `client.dash.download` |
| 231 | `Downloaded invoice` (toast prefix) | `client.dash.downloadedToast` |
| 233 | `PDF` | `client.dash.pdf` |
| 249 | `Interactive Freight Rate Estimator` | `client.dash.calcHeader` |
| 255 | `Origin City` | `client.dash.originCity` |
| 259 | `Destination City` | `client.dash.destCity` |
| 263 | `Transit Mode` | `client.dash.transitMode` |
| 269 | `RAIL Freight (Bulk Wagons)` | `client.dash.railOption` |
| 270 | `ROAD Trucking Convoy` | `client.dash.roadOption` |
| 271 | `AIR Freight Charter` | `client.dash.airOption` |
| 272 | `SEA Shipping Containers` | `client.dash.seaOption` |
| 277 | `Weight Tonnage (Tons)` | `client.dash.weightTons` |
| 284 | `Estimated Freight Cost` | `client.dash.estCost` |
| 288 | `Book This Rate` | `client.dash.bookRate` |
| 300 | `Dedicated Key Account Support Desk` | `client.dash.supportHeader` |
| 305 | `Your Key Account Manager` | `client.dash.accountManager` |
| 306 | `Vice President Operations` | `client.dash.vpOps` |
| 307 | `Direct Hotline:` | `client.dash.hotline` |
| 307 | `Email:` | `client.dash.email` |
| 310 | `Submit Support Ticket / Inquiry` | `client.dash.ticketLabel` |
| 311 | `Subject of inquiry...` (placeholder) | `client.dash.ticketPlaceholder` |
| 312 | `Support inquiry submitted. We will contact you within 2 hours.` | `client.dash.inquiryToast` |
| 313 | `Send Priority Inquiry` | `client.dash.sendInquiry` |
| 325 | `Place New Freight Order` | `client.dash.orderModalTitle` |
| 357 | `Cargo Tonnage` | `client.dash.cargoTonnage` |
| 363 | `Cargo Description` | `client.dash.cargoDesc` |
| 368 | `Calculated Freight Amount` | `client.dash.calcAmount` |
| 374 | `Cancel` | `client.dash.cancel` |
| 376 | `Confirm & Book Shipment` | `client.dash.confirmBook` |

---

### 1.2 `src/components/portals/ClientVerification.tsx`
| Line | Current Hardcoded String | Proposed Translation Key |
|--- |--- |--- |
| 31 | `Commercial Business License` | `client.verif.docCommLicense` |
| 34 | `Tax Identification Certificate` | `client.verif.docTaxCert` |
| 37 | `Authorized Representative Passport Scan` | `client.verif.docPassportScan` |
| 43 | `Uploaded document successfully. Sent for moderation.` | `client.verif.uploadSuccessToast` |
| 65 | `Account Verification Rejected` | `client.verif.rejectedTitle` |
| 69 | `Verification document did not meet compliance requirements. Please resubmit updated documents.` | `client.verif.defaultRejection` |
| 83 | `Upload Official KYC Verification Documents` | `client.verif.uploadHeader` |
| 90 | `Select Document Requirement Type` | `client.verif.selectRequirement` |
| 93 | `Commercial License` / `Government Business Reg Cert` | `client.verif.commLicenseTitle` / `client.verif.commLicenseDesc` |
| 94 | `Tax ID / VAT Cert` / `Official Ministry Tax Registration` | `client.verif.taxIdTitle` / `client.verif.taxIdDesc` |
| 95 | `Representative Passport` / `Director or Manager ID Scan` | `client.verif.passportTitle` / `client.verif.passportDesc` |
| 120 | `Drag and drop file here, or click to upload` | `client.verif.dragDrop` |
| 121 | `Supports PDF, PNG, JPG scans up to 15MB file size.` | `client.verif.dropSpecs` |
| 127 | `Encrypting & Uploading Document...` | `client.verif.uploading` |
| 135 | `Upload Document File` | `client.verif.uploadFileBtn` |
| 143 | `Submitted Verification Documents` | `client.verif.submittedDocs` |
| 147 | `No documents uploaded yet for this account.` | `client.verif.noDocs` |
| 171 | `Interactive Demo Submission Trigger` | `client.verif.demoHeader` |
| 174 | `Test administrative approval workflows instantly without navigating away.` | `client.verif.demoSub` |
| 182 | `⚡ Demo: Instant Admin Approval applied!` | `client.verif.demoApproveToast` |
| 194 | `Illegible commercial license scan.` | `client.verif.demoRejectReason` |
| 195 | `⚡ Demo: Instant Admin Rejection applied!` | `client.verif.demoRejectToast` |

---

### 1.3 `src/components/portals/ClientRegistration.tsx`
| Line | Current Hardcoded String | Proposed Translation Key |
|--- |--- |--- |
| 92 | `Or register with email` | `client.reg.orEmail` |
| 101 | `Full Name` | `client.reg.fullName` |
| 105 | `e.g. David Vance` (placeholder) | `client.reg.fullNamePlaceholder` |
| 114 | `Company / Organization Name` | `client.reg.companyNameLabel` |
| 118 | `e.g. UN World Food Programme` (placeholder) | `client.reg.companyPlaceholder` |
| 132 | `procurement@organization.org` (placeholder) | `client.reg.emailPlaceholder` |
| 154 | `Phone Number` | `client.reg.phoneLabel` |
| 158 | `+93 70 123 4567` (placeholder) | `client.reg.phonePlaceholder` |
| 168 | `Country of Operation` | `client.reg.countryLabel` |
| 172 | `e.g. Afghanistan` (placeholder) | `client.reg.countryPlaceholder` |
| 181 | `Organization Category` | `client.reg.categoryLabel` |
| 185 | `Select Category` (placeholder) | `client.reg.selectCategoryPlaceholder` |
| 188 | `UN & International Agency` | `client.reg.catUnAgency` |
| 189 | `Registered Non-Governmental Org (NGO)` | `client.reg.catNgo` |
| 190 | `Commercial / Private Enterprise` | `client.reg.catPrivate` |
| 191 | `Government Ministry / Agency` | `client.reg.catGovernment` |

---

### 1.4 `src/components/portals/ClientDetailSheet.tsx`
| Line | Current Hardcoded String | Proposed Translation Key |
|--- |--- |--- |
| 35 | `Registered` | `client.detail.registered` |
| 42 | `Representative Information` | `client.detail.repInfo` |
| 64 | `Total Freight Orders` | `client.detail.totalOrders` |
| 68 | `Total Spent (USD)` | `client.detail.totalSpent` |
| 76 | `Submitted Verification Documents` | `client.detail.submittedDocs` |
| 79 | `No KYC documents uploaded yet.` | `client.detail.noDocs` |
| 98 | `Account Moderation Actions` | `client.detail.moderationActions` |
| 106 | `Client manually verified.` | `client.detail.approveToast` |
| 110 | `Approve & Verify Account` | `client.detail.approveBtn` |
| 117 | `Identity verification failed administrative checks.` | `client.detail.rejectReason` |
| 118 | `Client verification rejected.` | `client.detail.rejectToast` |
| 122 | `Reject Verification` | `client.detail.rejectBtn` |

---

### 1.5 `src/components/portals/ClientsList.tsx`
| Line | Current Hardcoded String | Proposed Translation Key |
|--- |--- |--- |
| 42 | `Corporate Clients Directory` | `client.list.title` |
| 44 | `Manage UN agencies, international NGOs, government ministries, and commercial importers.` | `client.list.sub` |
| 56 | State filters (`all`, `pending_verification`, `verified`, `rejected`) | `client.list.filterAll`, `client.list.filterPending`, `client.list.filterVerified`, `client.list.filterRejected` |
| 66 | `Search by company name, contact person, or email...` (placeholder) | `client.list.searchPlaceholder` |
| 77 | `Company Name` | `client.list.colCompany` |
| 78 | `Category & Country` | `client.list.colCategory` |
| 79 | `Total Spent` | `client.list.colTotalSpent` |
| 80 | `Verification State` | `client.list.colState` |
| 81 | `Action` | `client.list.colAction` |
| 88 | `No client accounts matching current search.` | `client.list.empty` |
| 116 | `View Details` | `client.list.viewDetails` |

---

### 1.6 `src/components/portals/DocumentModeration.tsx` & `DocumentPreviewModal.tsx`
| File | Line | Current Hardcoded String | Proposed Translation Key |
|--- |--- |--- |--- |
| `DocumentModeration` | 37 | `Quick approved from moderation queue` | `doc.mod.quickApproveNotes` |
| `DocumentModeration` | 38 | `Document approved successfully.` | `doc.mod.approveToast` |
| `DocumentModeration` | 42 | `Document failed administrative verification checks.` | `doc.mod.quickRejectReason` |
| `DocumentModeration` | 43 | `Document rejected.` | `doc.mod.rejectToast` |
| `DocumentModeration` | 53 | `Document Verification Moderation Queue` | `doc.mod.title` |
| `DocumentModeration` | 55 | `Review, approve, or reject Know Your Customer (KYC)...` | `doc.mod.sub` |
| `DocumentModeration` | 69 | Status filters (`all`, `pending`, `approved`, `rejected`) | `doc.mod.filterAll`, `doc.mod.filterPending`, `doc.mod.filterApproved`, `doc.mod.filterRejected` |
| `DocumentModeration` | 81 | `Search by client name, document title, or type...` | `doc.mod.searchPlaceholder` |
| `DocumentModeration` | 93-97 | Table column headers | `doc.mod.colClient`, `doc.mod.colTitleType`, `doc.mod.colSubmittedDate`, `doc.mod.colStatus`, `doc.mod.colActions` |
| `DocumentModeration` | 104 | `No document verifications matching current filters.` | `doc.mod.empty` |
| `DocumentModeration` | 133, 144, 153 | Buttons: `Review`, `Approve`, `Reject` | `doc.mod.btnReview`, `doc.mod.btnApprove`, `doc.mod.btnReject` |
| `DocumentPreviewModal` | 19-23 | Standard Rejection Reasons Array | `doc.preview.reasonBlurry`, `doc.preview.reasonExpired`, `doc.preview.reasonTinMismatch`, `doc.preview.reasonMissingSeal`, `doc.preview.reasonInvalidType` |
| `DocumentPreviewModal` | 45 | `Verification document did not meet compliance requirements.` | `doc.preview.defaultRejection` |
| `DocumentPreviewModal` | 68-80 | Grid labels (`Client Organization`, `Document Type`, `File Details`, `Submitted At`) | `doc.preview.clientOrg`, `doc.preview.docType`, `doc.preview.fileDetails`, `doc.preview.submittedAt` |
| `DocumentPreviewModal` | 92 | `Official Document PDF Scan • High Resolution Verification Copy` | `doc.preview.previewDesc` |
| `DocumentPreviewModal` | 101 | `Open Document in New Tab` | `doc.preview.openNewTab` |
| `DocumentPreviewModal` | 109 | `Specify Rejection Reason` | `doc.preview.specifyReason` |
| `DocumentPreviewModal` | 113 | `Select standard rejection reason...` | `doc.preview.selectReasonPlaceholder` |
| `DocumentPreviewModal` | 123 | `Additional notes for client regarding required corrections...` | `doc.preview.notesPlaceholder` |
| `DocumentPreviewModal` | 130, 133 | `Cancel`, `Confirm Rejection` | `doc.preview.btnCancel`, `doc.preview.btnConfirmReject` |
| `DocumentPreviewModal` | 139, 141 | `Admin Notes (Optional)`, `Internal verification notes...` | `doc.preview.adminNotesLabel`, `doc.preview.adminNotesPlaceholder` |
| `DocumentPreviewModal` | 154, 158 | `Reject Document`, `Approve Document` | `doc.preview.btnRejectDoc`, `doc.preview.btnApproveDoc` |

---

## 2. Complete Dictionary Key Additions

### 2.1 Master Keys for `src/i18n/translations/en.ts`
```typescript
  // ── client portal additions ──
  'client.dash.verifiedId': 'Verified Account ID:',
  'client.dash.placeOrder': 'Place Freight Order',
  'client.dash.tabShipments': 'Active Cargo Shipments',
  'client.dash.tabInvoices': 'Billing & Invoices',
  'client.dash.tabCalculator': 'Rate Calculator',
  'client.dash.tabSupport': 'Support Desk',
  'client.dash.shipmentsHeader': 'Active Shipments & Live Corridor Tracking',
  'client.dash.noShipments': 'No active shipments for this account yet.',
  'client.dash.bookFirstCargo': 'Book Your First Cargo',
  'client.dash.routeLabel': 'Origin → Destination',
  'client.dash.modeLabel': 'Transit Mode',
  'client.dash.freightSuffix': 'Freight',
  'client.dash.estDelivery': 'Estimated Delivery',
  'client.dash.liveProgress': 'Live Progress Steps',
  'client.dash.invoicesHeader': 'Issued Invoices & Settlement History',
  'client.dash.invNum': 'Invoice #',
  'client.dash.issueDate': 'Issue Date',
  'client.dash.dueDate': 'Due Date',
  'client.dash.amountUsd': 'Amount (USD)',
  'client.dash.status': 'Status',
  'client.dash.download': 'Download',
  'client.dash.downloadedToast': 'Downloaded invoice',
  'client.dash.pdf': 'PDF',
  'client.dash.calcHeader': 'Interactive Freight Rate Estimator',
  'client.dash.originCity': 'Origin City',
  'client.dash.destCity': 'Destination City',
  'client.dash.transitMode': 'Transit Mode',
  'client.dash.weightTons': 'Weight Tonnage (Tons)',
  'client.dash.railOption': 'RAIL Freight (Bulk Wagons)',
  'client.dash.roadOption': 'ROAD Trucking Convoy',
  'client.dash.airOption': 'AIR Freight Charter',
  'client.dash.seaOption': 'SEA Shipping Containers',
  'client.dash.estCost': 'Estimated Freight Cost',
  'client.dash.bookRate': 'Book This Rate',
  'client.dash.supportHeader': 'Dedicated Key Account Support Desk',
  'client.dash.accountManager': 'Your Key Account Manager',
  'client.dash.vpOps': 'Vice President Operations',
  'client.dash.hotline': 'Direct Hotline:',
  'client.dash.email': 'Email:',
  'client.dash.ticketLabel': 'Submit Support Ticket / Inquiry',
  'client.dash.ticketPlaceholder': 'Subject of inquiry...',
  'client.dash.sendInquiry': 'Send Priority Inquiry',
  'client.dash.inquiryToast': 'Support inquiry submitted. We will contact you within 2 hours.',
  'client.dash.orderModalTitle': 'Place New Freight Order',
  'client.dash.cargoTonnage': 'Cargo Tonnage',
  'client.dash.cargoDesc': 'Cargo Description',
  'client.dash.calcAmount': 'Calculated Freight Amount',
  'client.dash.cancel': 'Cancel',
  'client.dash.confirmBook': 'Confirm & Book Shipment',
  'client.dash.orderPlacedToast': 'Freight order placed successfully! Tracking number generated.',

  'client.verif.rejectedTitle': 'Account Verification Rejected',
  'client.verif.defaultRejection': 'Verification document did not meet compliance requirements. Please resubmit updated documents.',
  'client.verif.uploadHeader': 'Upload Official KYC Verification Documents',
  'client.verif.selectRequirement': 'Select Document Requirement Type',
  'client.verif.commLicenseTitle': 'Commercial License',
  'client.verif.commLicenseDesc': 'Government Business Reg Cert',
  'client.verif.taxIdTitle': 'Tax ID / VAT Cert',
  'client.verif.taxIdDesc': 'Official Ministry Tax Registration',
  'client.verif.passportTitle': 'Representative Passport',
  'client.verif.passportDesc': 'Director or Manager ID Scan',
  'client.verif.dragDrop': 'Drag and drop file here, or click to upload',
  'client.verif.dropSpecs': 'Supports PDF, PNG, JPG scans up to 15MB file size.',
  'client.verif.uploading': 'Encrypting & Uploading Document...',
  'client.verif.uploadFileBtn': 'Upload Document File',
  'client.verif.submittedDocs': 'Submitted Verification Documents',
  'client.verif.noDocs': 'No documents uploaded yet for this account.',
  'client.verif.docCommLicense': 'Commercial Business License',
  'client.verif.docTaxCert': 'Tax Identification Certificate',
  'client.verif.docPassportScan': 'Authorized Representative Passport Scan',
  'client.verif.uploadSuccessToast': 'Uploaded document successfully. Sent for moderation.',
  'client.verif.demoHeader': 'Interactive Demo Submission Trigger',
  'client.verif.demoSub': 'Test administrative approval workflows instantly without navigating away.',
  'client.verif.demoApproveToast': '⚡ Demo: Instant Admin Approval applied!',
  'client.verif.demoRejectReason': 'Illegible commercial license scan.',
  'client.verif.demoRejectToast': '⚡ Demo: Instant Admin Rejection applied!',

  'client.reg.orEmail': 'Or register with email',
  'client.reg.fullName': 'Full Name',
  'client.reg.fullNamePlaceholder': 'e.g. David Vance',
  'client.reg.companyNameLabel': 'Company / Organization Name',
  'client.reg.companyPlaceholder': 'e.g. UN World Food Programme',
  'client.reg.emailPlaceholder': 'procurement@organization.org',
  'client.reg.phoneLabel': 'Phone Number',
  'client.reg.phonePlaceholder': '+93 70 123 4567',
  'client.reg.countryLabel': 'Country of Operation',
  'client.reg.countryPlaceholder': 'e.g. Afghanistan',
  'client.reg.categoryLabel': 'Organization Category',
  'client.reg.selectCategoryPlaceholder': 'Select Category',
  'client.reg.catUnAgency': 'UN & International Agency',
  'client.reg.catNgo': 'Registered Non-Governmental Org (NGO)',
  'client.reg.catPrivate': 'Commercial / Private Enterprise',
  'client.reg.catGovernment': 'Government Ministry / Agency',

  'client.detail.registered': 'Registered',
  'client.detail.repInfo': 'Representative Information',
  'client.detail.totalOrders': 'Total Freight Orders',
  'client.detail.totalSpent': 'Total Spent (USD)',
  'client.detail.submittedDocs': 'Submitted Verification Documents',
  'client.detail.noDocs': 'No KYC documents uploaded yet.',
  'client.detail.moderationActions': 'Account Moderation Actions',
  'client.detail.approveBtn': 'Approve & Verify Account',
  'client.detail.approveToast': 'Client manually verified.',
  'client.detail.rejectReason': 'Identity verification failed administrative checks.',
  'client.detail.rejectBtn': 'Reject Verification',
  'client.detail.rejectToast': 'Client verification rejected.',

  'client.list.title': 'Corporate Clients Directory',
  'client.list.sub': 'Manage UN agencies, international NGOs, government ministries, and commercial importers.',
  'client.list.filterAll': 'All',
  'client.list.filterPending': 'Pending Verification',
  'client.list.filterVerified': 'Verified',
  'client.list.filterRejected': 'Rejected',
  'client.list.searchPlaceholder': 'Search by company name, contact person, or email...',
  'client.list.colCompany': 'Company Name',
  'client.list.colCategory': 'Category & Country',
  'client.list.colTotalSpent': 'Total Spent',
  'client.list.colState': 'Verification State',
  'client.list.colAction': 'Action',
  'client.list.empty': 'No client accounts matching current search.',
  'client.list.viewDetails': 'View Details',

  'doc.mod.quickApproveNotes': 'Quick approved from moderation queue',
  'doc.mod.approveToast': 'Document approved successfully.',
  'doc.mod.quickRejectReason': 'Document failed administrative verification checks.',
  'doc.mod.rejectToast': 'Document rejected.',
  'doc.mod.title': 'Document Verification Moderation Queue',
  'doc.mod.sub': 'Review, approve, or reject Know Your Customer (KYC) identity documents submitted by corporate shippers.',
  'doc.mod.filterAll': 'All',
  'doc.mod.filterPending': 'Pending',
  'doc.mod.filterApproved': 'Approved',
  'doc.mod.filterRejected': 'Rejected',
  'doc.mod.searchPlaceholder': 'Search by client name, document title, or type...',
  'doc.mod.colClient': 'Client / Company',
  'doc.mod.colTitleType': 'Document Title & Type',
  'doc.mod.colSubmittedDate': 'Submitted Date',
  'doc.mod.colStatus': 'Status',
  'doc.mod.colActions': 'Actions',
  'doc.mod.empty': 'No document verifications matching current filters.',
  'doc.mod.btnReview': 'Review',
  'doc.mod.btnApprove': 'Approve',
  'doc.mod.btnReject': 'Reject',

  'doc.preview.reasonBlurry': 'Document image / scan is illegible or blurry',
  'doc.preview.reasonExpired': 'Commercial license has expired',
  'doc.preview.reasonTinMismatch': 'Tax Identification Number (TIN) mismatch',
  'doc.preview.reasonMissingSeal': 'Missing official government seal or authorized signature',
  'doc.preview.reasonInvalidType': 'Invalid document type uploaded',
  'doc.preview.defaultRejection': 'Verification document did not meet compliance requirements.',
  'doc.preview.clientOrg': 'Client Organization',
  'doc.preview.docType': 'Document Type',
  'doc.preview.fileDetails': 'File Details',
  'doc.preview.submittedAt': 'Submitted At',
  'doc.preview.previewDesc': 'Official Document PDF Scan • High Resolution Verification Copy',
  'doc.preview.openNewTab': 'Open Document in New Tab',
  'doc.preview.specifyReason': 'Specify Rejection Reason',
  'doc.preview.selectReasonPlaceholder': 'Select standard rejection reason...',
  'doc.preview.notesPlaceholder': 'Additional notes for client regarding required corrections...',
  'doc.preview.btnCancel': 'Cancel',
  'doc.preview.btnConfirmReject': 'Confirm Rejection',
  'doc.preview.adminNotesLabel': 'Admin Notes (Optional)',
  'doc.preview.adminNotesPlaceholder': 'Internal verification notes or clearance reference number...',
  'doc.preview.btnRejectDoc': 'Reject Document',
  'doc.preview.btnApproveDoc': 'Approve Document',
```

---

### 2.2 Russian Dictionary Additions (`src/i18n/translations/ru.ts`)
```typescript
  // ── client portal additions ──
  'client.dash.verifiedId': 'Подтвержденный ID аккаунта:',
  'client.dash.placeOrder': 'Оформить заказ на перевозку',
  'client.dash.tabShipments': 'Активные перевозки грузов',
  'client.dash.tabInvoices': 'Счета и оплата',
  'client.dash.tabCalculator': 'Калькулятор тарифов',
  'client.dash.tabSupport': 'Служба поддержки',
  'client.dash.shipmentsHeader': 'Активные отправления и отслеживание коридоров',
  'client.dash.noShipments': 'Для этого аккаунта пока нет активных перевозок.',
  'client.dash.bookFirstCargo': 'Забронировать первую перевозку',
  'client.dash.routeLabel': 'Пункт отправления → Пункт назначения',
  'client.dash.modeLabel': 'Вид транспорта',
  'client.dash.freightSuffix': 'Перевозка',
  'client.dash.estDelivery': 'Ориентировочная доставка',
  'client.dash.liveProgress': 'Этапы прогресса в реальном времени',
  'client.dash.invoicesHeader': 'Выставленные счета и история расчетов',
  'client.dash.invNum': '№ Счета',
  'client.dash.issueDate': 'Дата выдачи',
  'client.dash.dueDate': 'Срок оплаты',
  'client.dash.amountUsd': 'Сумма (USD)',
  'client.dash.status': 'Статус',
  'client.dash.download': 'Скачать',
  'client.dash.downloadedToast': 'Счет успешно скачан',
  'client.dash.pdf': 'PDF',
  'client.dash.calcHeader': 'Интерактивный калькулятор стоимости фрахта',
  'client.dash.originCity': 'Город отправления',
  'client.dash.destCity': 'Город назначения',
  'client.dash.transitMode': 'Вид транспорта',
  'client.dash.weightTons': 'Вес (в тоннах)',
  'client.dash.railOption': 'Ж/Д перевозка (вагоны)',
  'client.dash.roadOption': 'Автоперевозка (грузовой автопоезд)',
  'client.dash.airOption': 'Авиаперевозка (чартер)',
  'client.dash.seaOption': 'Морская перевозка (контейнеры)',
  'client.dash.estCost': 'Ориентировочная стоимость фрахта',
  'client.dash.bookRate': 'Забронировать по этому тарифу',
  'client.dash.supportHeader': 'Служба поддержки персональных клиентов',
  'client.dash.accountManager': 'Ваш персональный менеджер',
  'client.dash.vpOps': 'Вице-президент по операциям',
  'client.dash.hotline': 'Прямая линия:',
  'client.dash.email': 'Эл. почта:',
  'client.dash.ticketLabel': 'Отправить запрос в службу поддержки',
  'client.dash.ticketPlaceholder': 'Тема обращения...',
  'client.dash.sendInquiry': 'Отправить приоритетный запрос',
  'client.dash.inquiryToast': 'Запрос отправлен. Мы свяжемся с вами в течение 2 часов.',
  'client.dash.orderModalTitle': 'Оформить новый заказ на перевозку',
  'client.dash.cargoTonnage': 'Тоннаж груза',
  'client.dash.cargoDesc': 'Описание груза',
  'client.dash.calcAmount': 'Рассчитанная стоимость фрахта',
  'client.dash.cancel': 'Отмена',
  'client.dash.confirmBook': 'Подтвердить и забронировать',
  'client.dash.orderPlacedToast': 'Заказ на перевозку успешно оформлен! Номер отслеживания сгенерирован.',

  'client.verif.rejectedTitle': 'Верификация аккаунта отклонена',
  'client.verif.defaultRejection': 'Документ верификации не соответствует требованиям. Пожалуйста, отправьте обновленные документы.',
  'client.verif.uploadHeader': 'Загрузите официальные документы KYC для верификации',
  'client.verif.selectRequirement': 'Выберите тип требуемого документа',
  'client.verif.commLicenseTitle': 'Коммерческая лицензия',
  'client.verif.commLicenseDesc': 'Свидетельство о гос. регистрации',
  'client.verif.taxIdTitle': 'Налоговый номер / Справка НДС',
  'client.verif.taxIdDesc': 'Официальная регистрация в налоговой',
  'client.verif.passportTitle': 'Паспорт представителя',
  'client.verif.passportDesc': 'Скан удостоверения директора',
  'client.verif.dragDrop': 'Перетащите файл сюда или нажмите для загрузки',
  'client.verif.dropSpecs': 'Поддерживаются сканы PDF, PNG, JPG размером до 15 МБ.',
  'client.verif.uploading': 'Шифрование и загрузка документа...',
  'client.verif.uploadFileBtn': 'Загрузить файл документа',
  'client.verif.submittedDocs': 'Отправленные документы на верификацию',
  'client.verif.noDocs': 'Для этого аккаунта еще не загружены документы.',
  'client.verif.docCommLicense': 'Коммерческая бизнес-лицензия',
  'client.verif.docTaxCert': 'Свидетельство о налоговом учете',
  'client.verif.docPassportScan': 'Скан паспорта уполномоченного представителя',
  'client.verif.uploadSuccessToast': 'Документ успешно загружен и отправлен на модерацию.',
  'client.verif.demoHeader': 'Интерактивный демо-триггер проверки',
  'client.verif.demoSub': 'Тестируйте процессы административного одобрения мгновенно.',
  'client.verif.demoApproveToast': '⚡ Демо: Мгновенное одобрение администратора применено!',
  'client.verif.demoRejectReason': 'Нечитаемый скан коммерческой лицензии.',
  'client.verif.demoRejectToast': '⚡ Демо: Мгновенный отказ администратора применен!',

  'client.reg.orEmail': 'Или зарегистрируйтесь через email',
  'client.reg.fullName': 'Полное имя',
  'client.reg.fullNamePlaceholder': 'например, Иван Иванов',
  'client.reg.companyNameLabel': 'Название компании / организации',
  'client.reg.companyPlaceholder': 'например, Всемирная продовольственная программа',
  'client.reg.emailPlaceholder': 'procurement@organization.org',
  'client.reg.phoneLabel': 'Номер телефона',
  'client.reg.phonePlaceholder': '+93 70 123 4567',
  'client.reg.countryLabel': 'Страна деятельности',
  'client.reg.countryPlaceholder': 'например, Афганистан',
  'client.reg.categoryLabel': 'Категория организации',
  'client.reg.selectCategoryPlaceholder': 'Выберите категорию',
  'client.reg.catUnAgency': 'Агентство ООН / Международная организация',
  'client.reg.catNgo': 'Зарегистрированная НПО',
  'client.reg.catPrivate': 'Коммерческое / частное предприятие',
  'client.reg.catGovernment': 'Государственное министерство / ведомство',

  'client.detail.registered': 'Зарегистрирован',
  'client.detail.repInfo': 'Информация о представителе',
  'client.detail.totalOrders': 'Всего заказов на перевозку',
  'client.detail.totalSpent': 'Общая сумма расходов (USD)',
  'client.detail.submittedDocs': 'Предоставленные документы',
  'client.detail.noDocs': 'Документы KYC еще не загружены.',
  'client.detail.moderationActions': 'Действия по модерации аккаунта',
  'client.detail.approveBtn': 'Одобрить и подтвердить аккаунт',
  'client.detail.approveToast': 'Клиент успешно верифицирован вручную.',
  'client.detail.rejectReason': 'Проверка личности не прошла административный контроль.',
  'client.detail.rejectBtn': 'Отклонить верификацию',
  'client.detail.rejectToast': 'Верификация клиента отклонена.',

  'client.list.title': 'Каталог корпоративных клиентов',
  'client.list.sub': 'Управление агентствами ООН, НПО, министерствами и импортерами.',
  'client.list.filterAll': 'Все',
  'client.list.filterPending': 'Ожидает проверки',
  'client.list.filterVerified': 'Подтвержденные',
  'client.list.filterRejected': 'Отклоненные',
  'client.list.searchPlaceholder': 'Поиск по названию компании, контактному лицу или email...',
  'client.list.colCompany': 'Название компании',
  'client.list.colCategory': 'Категория и страна',
  'client.list.colTotalSpent': 'Общие расходы',
  'client.list.colState': 'Статус верификации',
  'client.list.colAction': 'Действие',
  'client.list.empty': 'Аккаунты клиентов, соответствующие запросу, не найдены.',
  'client.list.viewDetails': 'Подробнее',

  'doc.mod.quickApproveNotes': 'Быстрое одобрение из очереди модерации',
  'doc.mod.approveToast': 'Документ успешно одобрен.',
  'doc.mod.quickRejectReason': 'Документ не прошел административную проверку.',
  'doc.mod.rejectToast': 'Документ отклонен.',
  'doc.mod.title': 'Очередь модерации проверки документов',
  'doc.mod.sub': 'Проверка, одобрение или отклонение документов KYC, предоставленных клиентами.',
  'doc.mod.filterAll': 'Все',
  'doc.mod.filterPending': 'На рассмотрении',
  'doc.mod.filterApproved': 'Одобрено',
  'doc.mod.filterRejected': 'Отклонено',
  'doc.mod.searchPlaceholder': 'Поиск по имени клиента, названию документа или типу...',
  'doc.mod.colClient': 'Клиент / Компания',
  'doc.mod.colTitleType': 'Название и тип документа',
  'doc.mod.colSubmittedDate': 'Дата отправки',
  'doc.mod.colStatus': 'Статус',
  'doc.mod.colActions': 'Действия',
  'doc.mod.empty': 'Нет документов, соответствующих текущим фильтрам.',
  'doc.mod.btnReview': 'Просмотреть',
  'doc.mod.btnApprove': 'Одобрить',
  'doc.mod.btnReject': 'Отклонить',

  'doc.preview.reasonBlurry': 'Скан или изображение документа нечитаемо или размыто',
  'doc.preview.reasonExpired': 'Срок действия коммерческой лицензии истек',
  'doc.preview.reasonTinMismatch': 'Несоответствие ИНН (налогового номера)',
  'doc.preview.reasonMissingSeal': 'Отсутствует официальная печать или подпись',
  'doc.preview.reasonInvalidType': 'Загружен неверный тип документа',
  'doc.preview.defaultRejection': 'Документ верификации не соответствует требованиям.',
  'doc.preview.clientOrg': 'Организация клиента',
  'doc.preview.docType': 'Тип документа',
  'doc.preview.fileDetails': 'Детали файла',
  'doc.preview.submittedAt': 'Дата отправки',
  'doc.preview.previewDesc': 'Официальный скан документа PDF • Копия высокого разрешения',
  'doc.preview.openNewTab': 'Открыть документ в новой вкладке',
  'doc.preview.specifyReason': 'Укажите причину отказа',
  'doc.preview.selectReasonPlaceholder': 'Выберите стандартную причину отказа...',
  'doc.preview.notesPlaceholder': 'Дополнительные примечания для клиента относительно исправлений...',
  'doc.preview.btnCancel': 'Отмена',
  'doc.preview.btnConfirmReject': 'Подтвердить отказ',
  'doc.preview.adminNotesLabel': 'Примечания администратора (опционально)',
  'doc.preview.adminNotesPlaceholder': 'Внутренние примечания по верификации или номер разрешения...',
  'doc.preview.btnRejectDoc': 'Отклонить документ',
  'doc.preview.btnApproveDoc': 'Одобрить документ',
```

---

### 2.3 Dari Dictionary Additions (`src/i18n/translations/fa.ts`)
```typescript
  // ── client portal additions ──
  'client.dash.verifiedId': 'شناسه حساب تایید شده:',
  'client.dash.placeOrder': 'ثبت سفارش حمل و نقل',
  'client.dash.tabShipments': 'محموله‌های فعال باری',
  'client.dash.tabInvoices': 'صورتحساب‌ها و فاکتورها',
  'client.dash.tabCalculator': 'محاسبه‌گر تعرفه',
  'client.dash.tabSupport': 'میز پشتیبانی',
  'client.dash.shipmentsHeader': 'محموله‌های فعال و رهگیری زنده دهلیز',
  'client.dash.noShipments': 'هنوز هیچ محموله فعالی برای این حساب ثبت نشده است.',
  'client.dash.bookFirstCargo': 'رزرو اولین محموله باری',
  'client.dash.routeLabel': 'مبدا ← مقصد',
  'client.dash.modeLabel': 'حالت ترانزیت',
  'client.dash.freightSuffix': 'حمل و نقل',
  'client.dash.estDelivery': 'تاریخ تخمینی تحویل',
  'client.dash.liveProgress': 'مراحل پیشرفت زنده',
  'client.dash.invoicesHeader': 'فاکتورهای صادر شده و تاریخچه تسویه',
  'client.dash.invNum': 'شماره فاکتور',
  'client.dash.issueDate': 'تاریخ صدور',
  'client.dash.dueDate': 'تاریخ سررسید',
  'client.dash.amountUsd': 'مبلغ (دالر)',
  'client.dash.status': 'وضعیت',
  'client.dash.download': 'دانلود',
  'client.dash.downloadedToast': 'فاکتور دانلود شد',
  'client.dash.pdf': 'پی‌دی‌اف',
  'client.dash.calcHeader': 'تخمین‌گر تعاملی نرخ حمل و نقل',
  'client.dash.originCity': 'شهر مبدا',
  'client.dash.destCity': 'شهر مقصد',
  'client.dash.transitMode': 'حالت ترانزیت',
  'client.dash.weightTons': 'وزن محموله (تن)',
  'client.dash.railOption': 'حمل و نقل ریلی (واگن‌های فله)',
  'client.dash.roadOption': 'حمل و نقل جاده‌ای (کاروان لاری)',
  'client.dash.airOption': 'حمل و نقل هوایی (چارتر)',
  'client.dash.seaOption': 'حمل و نقل دریایی (کانتینر)',
  'client.dash.estCost': 'هزینه تخمینی حمل و نقل',
  'client.dash.bookRate': 'رزرو این نرخ',
  'client.dash.supportHeader': 'میز پشتیبانی اختصاصی مشتریان ویژه',
  'client.dash.accountManager': 'مدیر اختصاصی حساب شما',
  'client.dash.vpOps': 'معاون عملیات',
  'client.dash.hotline': 'خط مستقیم:',
  'client.dash.email': 'ایمیل:',
  'client.dash.ticketLabel': 'ارسال تیکت پشتیبانی / استعلام',
  'client.dash.ticketPlaceholder': 'موضوع استعلام...',
  'client.dash.sendInquiry': 'ارسال درخواست اولویت‌دار',
  'client.dash.inquiryToast': 'استعلام پشتیبانی ارسال شد. ظرف ۲ ساعت با شما تماس می‌گیریم.',
  'client.dash.orderModalTitle': 'ثبت سفارش جدید حمل و نقل',
  'client.dash.cargoTonnage': 'تنژ محموله',
  'client.dash.cargoDesc': 'توضیحات محموله',
  'client.dash.calcAmount': 'مبلغ محاسبه شده حمل و نقل',
  'client.dash.cancel': 'انصراف',
  'client.dash.confirmBook': 'تایید و رزرو محموله',
  'client.dash.orderPlacedToast': 'سفارش حمل و نقل با موفقیت ثبت شد! شماره رهگیری ایجاد گردید.',

  'client.verif.rejectedTitle': 'تایید حساب رد شد',
  'client.verif.defaultRejection': 'سند تایید با الزامات تطابق نداشت. لطفاً مدارک بروزرسانی شده را مجدداً ارسال کنید.',
  'client.verif.uploadHeader': 'بارگذاری اسناد رسمی احراز هویت (KYC)',
  'client.verif.selectRequirement': 'انتخاب نوع مدرک مورد نیاز',
  'client.verif.commLicenseTitle': 'جواز تجارتی',
  'client.verif.commLicenseDesc': 'گواهی ثبت شرکت دولتی',
  'client.verif.taxIdTitle': 'کد اقتصادی / گواهی مالیاتی',
  'client.verif.taxIdDesc': 'ثبت رسمی مالیاتی وزارت',
  'client.verif.passportTitle': 'پاسپورت نماینده',
  'client.verif.passportDesc': 'اسکن هویت مدیر یا نماینده',
  'client.verif.dragDrop': 'فایل را اینجا بکشید و رها کنید، یا برای بارگذاری کلیک کنید',
  'client.verif.dropSpecs': 'پشتیبانی از اسکن‌های PDF، PNG، JPG تا حجم ۱۵ مگابایت.',
  'client.verif.uploading': 'رمزنگاری و بارگذاری سند...',
  'client.verif.uploadFileBtn': 'بارگذاری فایل سند',
  'client.verif.submittedDocs': 'اسناد تایید ارسال شده',
  'client.verif.noDocs': 'هنوز هیچ سندی برای این حساب بارگذاری نشده است.',
  'client.verif.docCommLicense': 'جواز کسب و کار تجارتی',
  'client.verif.docTaxCert': 'گواهی شناسه مالیاتی',
  'client.verif.docPassportScan': 'اسکن پاسپورت نماینده مجاز',
  'client.verif.uploadSuccessToast': 'سند با موفقیت بارگذاری شد. جهت بررسی ارسال گردید.',
  'client.verif.demoHeader': 'ماژول تعاملی آزمایش تایید',
  'client.verif.demoSub': 'فرآیند تایید اداری را به صورت لحظه‌ای آزمایش کنید.',
  'client.verif.demoApproveToast': '⚡ دمو: تایید فوری مدیر اعمال شد!',
  'client.verif.demoRejectReason': 'اسکن ناخوانای جواز تجارتی.',
  'client.verif.demoRejectToast': '⚡ دمو: رد فوری مدیر اعمال شد!',

  'client.reg.orEmail': 'یا ثبت نام با ایمیل',
  'client.reg.fullName': 'نام و نام خانوادگی',
  'client.reg.fullNamePlaceholder': 'مثلاً: احمد رضایی',
  'client.reg.companyNameLabel': 'نام شرکت / سازمان',
  'client.reg.companyPlaceholder': 'مثلاً: برنامه جهانی غذا سازمان ملل',
  'client.reg.emailPlaceholder': 'procurement@organization.org',
  'client.reg.phoneLabel': 'شماره تماس',
  'client.reg.phonePlaceholder': '+93 70 123 4567',
  'client.reg.countryLabel': 'کشور محل فعالیت',
  'client.reg.countryPlaceholder': 'مثلاً: افغانستان',
  'client.reg.categoryLabel': 'دسته‌بندی سازمان',
  'client.reg.selectCategoryPlaceholder': 'انتخاب دسته‌بندی',
  'client.reg.catUnAgency': 'آژانس سازمان ملل و بین‌المللی',
  'client.reg.catNgo': 'موسسه غیردولتی ثبت شده (NGO)',
  'client.reg.catPrivate': 'شرکت تجارتی / بخش خصوصی',
  'client.reg.catGovernment': 'وزارت‌خانه / نهاد دولتی',

  'client.detail.registered': 'تاریخ ثبت',
  'client.detail.repInfo': 'اطلاعات نماینده',
  'client.detail.totalOrders': 'مجموع سفارشات باربری',
  'client.detail.totalSpent': 'مجموع هزینه‌ها (دالر)',
  'client.detail.submittedDocs': 'اسناد تایید ارسال شده',
  'client.detail.noDocs': 'هنوز هیچ مدرک احراز هویتی بارگذاری نشده است.',
  'client.detail.moderationActions': 'اقدامات مدیریت و بررسی حساب',
  'client.detail.approveBtn': 'تایید و فعال‌سازی حساب',
  'client.detail.approveToast': 'مشتری به صورت دستی تایید شد.',
  'client.detail.rejectReason': 'احراز هویت در بررسی‌های اداری رد شد.',
  'client.detail.rejectBtn': 'رد درخواست تایید',
  'client.detail.rejectToast': 'تایید حساب مشتری رد شد.',

  'client.list.title': 'فهرست مشتریان شرکتی',
  'client.list.sub': 'مدیریت آژانس‌های سازمان ملل، موسسات غیردولتی، وزارت‌خانه‌ها و واردکنندگان.',
  'client.list.filterAll': 'همه',
  'client.list.filterPending': 'در انتظار تایید',
  'client.list.filterVerified': 'تایید شده',
  'client.list.filterRejected': 'رد شده',
  'client.list.searchPlaceholder': 'جستجو بر اساس نام شرکت، شخص رابط یا ایمیل...',
  'client.list.colCompany': 'نام شرکت',
  'client.list.colCategory': 'دسته‌بندی و کشور',
  'client.list.colTotalSpent': 'مجموع هزینه‌ها',
  'client.list.colState': 'وضعیت تایید',
  'client.list.colAction': 'عملیات',
  'client.list.empty': 'هیچ حساب مشتری منطبق با جستجو پیدا نشد.',
  'client.list.viewDetails': 'مشاهده جزئیات',

  'doc.mod.quickApproveNotes': 'تایید سریع از صف بررسی',
  'doc.mod.approveToast': 'سند با موفقیت تایید شد.',
  'doc.mod.quickRejectReason': 'سند در بررسی‌های اداری رد شد.',
  'doc.mod.rejectToast': 'سند رد شد.',
  'doc.mod.title': 'صف بررسی و تایید اسناد',
  'doc.mod.sub': 'بررسی، تایید یا رد اسناد احراز هویت (KYC) ارسال شده توسط مشتریان.',
  'doc.mod.filterAll': 'همه',
  'doc.mod.filterPending': 'در انتظار بررسی',
  'doc.mod.filterApproved': 'تایید شده',
  'doc.mod.filterRejected': 'رد شده',
  'doc.mod.searchPlaceholder': 'جستجو بر اساس نام مشتری، عنوان سند یا نوع...',
  'doc.mod.colClient': 'مشتری / شرکت',
  'doc.mod.colTitleType': 'عنوان و نوع سند',
  'doc.mod.colSubmittedDate': 'تاریخ ارسال',
  'doc.mod.colStatus': 'وضعیت',
  'doc.mod.colActions': 'عملیات',
  'doc.mod.empty': 'هیچ سندی منطبق با فیلترهای فعلی یافت نشد.',
  'doc.mod.btnReview': 'بررسی',
  'doc.mod.btnApprove': 'تایید',
  'doc.mod.btnReject': 'رد',

  'doc.preview.reasonBlurry': 'تصویر یا اسکن سند ناخوانا یا تار است',
  'doc.preview.reasonExpired': 'تاریخ اعتبار جواز تجارتی منقضی شده است',
  'doc.preview.reasonTinMismatch': 'عدم مطابقت کد اقتصادی / شماره مالیاتی',
  'doc.preview.reasonMissingSeal': 'فقدان مهر رسمی دولتی یا امضای مجاز',
  'doc.preview.reasonInvalidType': 'نوع سند بارگذاری شده نامعتبر است',
  'doc.preview.defaultRejection': 'سند تایید با الزامات تطابق نداشت.',
  'doc.preview.clientOrg': 'سازمان مشتری',
  'doc.preview.docType': 'نوع سند',
  'doc.preview.fileDetails': 'مشخصات فایل',
  'doc.preview.submittedAt': 'زمان ارسال',
  'doc.preview.previewDesc': 'اسکن رسمی PDF سند • نسخه تایید با کیفیت بالا',
  'doc.preview.openNewTab': 'باز کردن سند در تب جدید',
  'doc.preview.specifyReason': 'تعیین دلیل رد',
  'doc.preview.selectReasonPlaceholder': 'انتخاب دلیل استاندارد رد...',
  'doc.preview.notesPlaceholder': 'توضیحات تکمیلی برای مشتری در مورد اصلاحات لازم...',
  'doc.preview.btnCancel': 'انصراف',
  'doc.preview.btnConfirmReject': 'تایید رد سند',
  'doc.preview.adminNotesLabel': 'یادداشت‌های مدیر (اختیاری)',
  'doc.preview.adminNotesPlaceholder': 'یادداشت‌های داخلی تایید یا شماره مرجع مجوز...',
  'doc.preview.btnRejectDoc': 'رد سند',
  'doc.preview.btnApproveDoc': 'تایید سند',
```

---

### 2.4 Pashto Dictionary Additions (`src/i18n/translations/ps.ts`)
```typescript
  // ── client portal additions ──
  'client.dash.verifiedId': 'تصدیق شوی اکاونټ پیژندپاڼه:',
  'client.dash.placeOrder': 'د بار وړلو امر درج کول',
  'client.dash.tabShipments': 'فعال باربری لیږدونې',
  'client.dash.tabInvoices': 'بلونه او فاکتورونه',
  'client.dash.tabCalculator': 'د نرخونو محاسبه کوونکی',
  'client.dash.tabSupport': 'د ملاتړ دفتر',
  'client.dash.shipmentsHeader': 'فعالې لیږدونې او د دهلیز ژوندۍ تعقیب',
  'client.dash.noShipments': 'د دې اکاونټ لپاره تر اوسه پورې هیڅ فعال بار شتون نلري.',
  'client.dash.bookFirstCargo': 'خپل لومړی بار بوک کړئ',
  'client.dash.routeLabel': 'مبدأ ← منزل',
  'client.dash.modeLabel': 'د ټرانزیټ طریقه',
  'client.dash.freightSuffix': 'باربری',
  'client.dash.estDelivery': 'د تحویل اټکل شوې نیټه',
  'client.dash.liveProgress': 'د پرمختګ ژوندي پړاوونه',
  'client.dash.invoicesHeader': 'صادر شوي فاکتورونه او د تادیاتو تاریخچه',
  'client.dash.invNum': 'د فاکتور شمیره',
  'client.dash.issueDate': 'د صدور نیټه',
  'client.dash.dueDate': 'د تادیې وروستۍ نیټه',
  'client.dash.amountUsd': 'مبلغ (ډالر)',
  'client.dash.status': 'حالت',
  'client.dash.download': 'ډاونلوډ',
  'client.dash.downloadedToast': 'فاکتور ډانلوډ شو',
  'client.dash.pdf': 'پی‌ډی‌ایف',
  'client.dash.calcHeader': 'د بار وړلو د نرخ متقابل اټکل کوونکی',
  'client.dash.originCity': 'د مبدأ ښار',
  'client.dash.destCity': 'د منزل ښار',
  'client.dash.transitMode': 'د ټرانزیټ ډول',
  'client.dash.weightTons': 'د بار وزن (ټن)',
  'client.dash.railOption': 'د ریل لارې باربری (واګونونه)',
  'client.dash.roadOption': 'د سړک له لارې باربری (لارۍ)',
  'client.dash.airOption': 'هوایی باربری (چارټر)',
  'client.dash.seaOption': 'سمندري باربری (کانټینرونه)',
  'client.dash.estCost': 'د بار وړلو اټکل شوې لګښت',
  'client.dash.bookRate': 'دا نرخ بوک کړئ',
  'client.dash.supportHeader': 'د ځانګړو پیرودونکو ځانګړې ملاتړ څانګه',
  'client.dash.accountManager': 'ستاسو د اکاونټ ځانګړی مدیر',
  'client.dash.vpOps': 'د عملیاتو مرستیال',
  'client.dash.hotline': 'مستقیمه اړیکه:',
  'client.dash.email': 'بریښنالیک:',
  'client.dash.ticketLabel': 'د ملاتړ غوښتنه / پوښتنه لیږل',
  'client.dash.ticketPlaceholder': 'د پوښتنې موضوع...',
  'client.dash.sendInquiry': 'لومړیتوب لرونکی غوښتنه لیږل',
  'client.dash.inquiryToast': 'د ملاتړ غوښتنه وسپارل شوه. موږ به په ۲ ساعتونو کې له تاسو سره اړیکه ونیسو.',
  'client.dash.orderModalTitle': 'د نوي بار وړلو امر درج کول',
  'client.dash.cargoTonnage': 'د بار وزن (ټناژ)',
  'client.dash.cargoDesc': 'د بار تفصیل',
  'client.dash.calcAmount': 'د بار وړلو محاسبه شوې رقم',
  'client.dash.cancel': 'لغوه کول',
  'client.dash.confirmBook': 'تایید او د بار بوک کول',
  'client.dash.orderPlacedToast': 'د بار وړلو امر په بريالیتوب سره درج شو! د تعقیب شمیره جوړه شوه.',

  'client.verif.rejectedTitle': 'د اکاونټ تصدیق رد شو',
  'client.verif.defaultRejection': 'د تصدیق سند د معیارونو سره سمون ونه‌لاره. مهرباني وکړئ تازه شوي اسناد بیا وسپارئ.',
  'client.verif.uploadHeader': 'د هویت تصدیق (KYC) رسمي اسناد اپلوډ کړئ',
  'client.verif.selectRequirement': 'د اړین سند ډول وټاکئ',
  'client.verif.commLicenseTitle': 'تجارتی جواز',
  'client.verif.commLicenseDesc': 'د دولتي سوداګرۍ نوملیکنې سند',
  'client.verif.taxIdTitle': 'مالیاتي پیژندپاڼه / مالیاتي سند',
  'client.verif.taxIdDesc': 'د مالیې وزارت رسمي ثبت',
  'client.verif.passportTitle': 'د استازي پاسپورت',
  'client.verif.passportDesc': 'د مدیر یا رئیس د پیژندپاڼې سکن',
  'client.verif.dragDrop': 'فایل دلته راکش کړئ، یا د اپلوډ لپاره کلیک وکړئ',
  'client.verif.dropSpecs': 'د PDF، PNG، JPG سکنونه تر ۱۵ ایم بي پورې ملاتړ کیږي.',
  'client.verif.uploading': 'د سند رمزي کول او اپلوډول...',
  'client.verif.uploadFileBtn': 'د سند فایل اپلوډ کړئ',
  'client.verif.submittedDocs': 'سپارل شوي تصدیقي اسناد',
  'client.verif.noDocs': 'د دې اکاونټ لپاره تر اوسه اسناد نه دي اپلوډ شوي.',
  'client.verif.docCommLicense': 'تجارتي سوداګریز جواز',
  'client.verif.docTaxCert': 'د مالیاتي پیژندنې سند',
  'client.verif.docPassportScan': 'د واکمن استازي د پاسپورت سکن',
  'client.verif.uploadSuccessToast': 'سند په بریا سره اپلوډ شو. د بررسۍ لپاره واستول شو.',
  'client.verif.demoHeader': 'د تصدیق متقابل ازمایښتي محرک',
  'client.verif.demoSub': 'د اداري تایید بهیر سمدلاسه و ازمویئ.',
  'client.verif.demoApproveToast': '⚡ ډیمو: د مدیر سمدستي تایید پلي شو!',
  'client.verif.demoRejectReason': 'د تجارني جواز نه لوستل کیدونکی سکن.',
  'client.verif.demoRejectToast': '⚡ ډیمو: د مدیر سمدستي رد پلي شو!',

  'client.reg.orEmail': 'یا د بریښنالیک له لارې نوملیکنه وکړئ',
  'client.reg.fullName': 'بشپړ نوم',
  'client.reg.fullNamePlaceholder': 'مثلاً: احمد نوري',
  'client.reg.companyNameLabel': 'د شرکت / سازمان نوم',
  'client.reg.companyPlaceholder': 'مثلاً: د ملګرو ملتونو د خوړو نړیوال پروګرام',
  'client.reg.emailPlaceholder': 'procurement@organization.org',
  'client.reg.phoneLabel': 'د تلیفون شمیره',
  'client.reg.phonePlaceholder': '+93 70 123 4567',
  'client.reg.countryLabel': 'د فعالیت هیواد',
  'client.reg.countryPlaceholder': 'مثلاً: افغانستان',
  'client.reg.categoryLabel': 'د سازمان کټګوري',
  'client.reg.selectCategoryPlaceholder': 'کټګوري وټاکئ',
  'client.reg.catUnAgency': 'د ملګرو ملتونو او نړیواله کټګوري',
  'client.reg.catNgo': 'ثبت شوې غیر دولتي موسسه (NGO)',
  'client.reg.catPrivate': 'تجارتی / شخصي شرکت',
  'client.reg.catGovernment': 'دولتي وزارت / اداره',

  'client.detail.registered': 'د نوملیکنې نیټه',
  'client.detail.repInfo': 'د استازي معلومات',
  'client.detail.totalOrders': 'ټول باربری امرونه',
  'client.detail.totalSpent': 'ټول لګښت (ډالر)',
  'client.detail.submittedDocs': 'سپارل شوي تصدیقي اسناد',
  'client.detail.noDocs': 'تر اوسه پورې د KYC هیڅ اسناد نه دي اپلوډ شوي.',
  'client.detail.moderationActions': 'د اکاونټ اداري موده بررسي کړنې',
  'client.detail.approveBtn': 'تایید او اکاونټ مړ تصدیق کول',
  'client.detail.approveToast': 'پیرودونکی په لاسي ډول تصدیق شو.',
  'client.detail.rejectReason': 'د هویت تصدیق په اداري بررسۍ کې رد شو.',
  'client.detail.rejectBtn': 'د تصدیق غوښتنه ردول',
  'client.detail.rejectToast': 'د پیرودونکي تصدیق رد شو.',

  'client.list.title': 'د شرکتي پیرودونکو لارښود',
  'client.list.sub': 'د ملګرو ملتونو د ادارو، غیر دولتي موسسو، وزارتونو او تجارانو اداره کول.',
  'client.list.filterAll': 'ټول',
  'client.list.filterPending': 'د تصدیق په تمه',
  'client.list.filterVerified': 'تصدیق شوی',
  'client.list.filterRejected': 'رد شوی',
  'client.list.searchPlaceholder': 'د شرکت نوم، اړیکې کس یا بریښنالیک له لارې لټون...',
  'client.list.colCompany': 'د شرکت نوم',
  'client.list.colCategory': 'کټګوري او هیواد',
  'client.list.colTotalSpent': 'ټول لګښت',
  'client.list.colState': 'د تصدیق حالت',
  'client.list.colAction': 'کړنه',
  'client.list.empty': 'د لټون سره سمون لرونکی هیڅ حساب ونه موندل شو.',
  'client.list.viewDetails': 'جزئیات کتل',

  'doc.mod.quickApproveNotes': 'د لیدنې کتنه قطار څخه سمدستي تایید',
  'doc.mod.approveToast': 'سند په بریا سره تایید شو.',
  'doc.mod.quickRejectReason': 'سند په اداري بررسۍ کې ناکام شو.',
  'doc.mod.rejectToast': 'سند رد شو.',
  'doc.mod.title': 'د اسنادو د بررسۍ او تایید قطار',
  'doc.mod.sub': 'د پیرودونکو لخوا سپارل شوي هویت اسنادو (KYC) بیاکتنه، تایید یا ردول.',
  'doc.mod.filterAll': 'ټول',
  'doc.mod.filterPending': 'د پروسس په تمه',
  'doc.mod.filterApproved': 'تایید شوی',
  'doc.mod.filterRejected': 'رد شوی',
  'doc.mod.searchPlaceholder': 'د پیرودونکي نوم، سند عنوان یا ډول له لارې لټون...',
  'doc.mod.colClient': 'پیرودونکی / شرکت',
  'doc.mod.colTitleType': 'د سند عنوان او ډول',
  'doc.mod.colSubmittedDate': 'د سپارلو نیټه',
  'doc.mod.colStatus': 'حالت',
  'doc.mod.colActions': 'کړنې',
  'doc.mod.empty': 'د اوسنیو فلټرونو سره سمون لرونکی هیڅ سند ونه موندل شو.',
  'doc.mod.btnReview': 'بیاکتنه',
  'doc.mod.btnApprove': 'تایید',
  'doc.mod.btnReject': 'رد',

  'doc.preview.reasonBlurry': 'د سند انځور یا سکن ناڅرګند یا تت دی',
  'doc.preview.reasonExpired': 'د تجارتی جواز د اعتبار موده پای ته رسیدلې',
  'doc.preview.reasonTinMismatch': 'د مالیاتي نمبر ناشونې عدم مطابقت',
  'doc.preview.reasonMissingSeal': 'د رسمي دولتي مهر یا مجاز لاسلیک نشتوالی',
  'doc.preview.reasonInvalidType': 'ناسم اپلوډ شوی سند ډول',
  'doc.preview.defaultRejection': 'د تصدیق سند معیاري شرایط پوره نه کړل.',
  'doc.preview.clientOrg': 'د پیرودونکي سازمان',
  'doc.preview.docType': 'د سند ډول',
  'doc.preview.fileDetails': 'د فایل تفصیلات',
  'doc.preview.submittedAt': 'د سپارلو وخت',
  'doc.preview.previewDesc': 'د سند رسمي پی‌ډی‌ایف سکن • د وضوح لوړ تصدیقي کاپي',
  'doc.preview.openNewTab': 'سند په نوي تب کې پرانیستل',
  'doc.preview.specifyReason': 'د ردولو علت روښانه کړئ',
  'doc.preview.selectReasonPlaceholder': 'د ردولو معیاري علت وټاکئ...',
  'doc.preview.notesPlaceholder': 'د اړینو اصلاحاتو په اړه پیرودونکي ته اضافي یادښتونه...',
  'doc.preview.btnCancel': 'لغوه',
  'doc.preview.btnConfirmReject': 'د ردیدو تایید',
  'doc.preview.adminNotesLabel': 'د مدیر یادښتونه (اختیاري)',
  'doc.preview.adminNotesPlaceholder': 'د تایید داخلي یادښتونه یا د اجازه شمیره...',
  'doc.preview.btnRejectDoc': 'سند ردول',
  'doc.preview.btnApproveDoc': 'سند تاییدول',
```

---

## 3. Code Refactoring Directives for Implementers

1. **Import `useI18n`**:
   Ensure `import { useI18n } from '@/i18n/i18n';` is present in:
   - `ClientDashboard.tsx`
   - `ClientVerification.tsx`
   - `ClientRegistration.tsx`
   - `ClientDetailSheet.tsx`
   - `ClientsList.tsx`
   - `DocumentModeration.tsx`
   - `DocumentPreviewModal.tsx`

2. **Instantiate `useI18n()`**:
   Inside each functional component, destructure `{ t } = useI18n();`.

3. **Replace Hardcoded Text**:
   - Replace literal JSX strings with `{t('key')}`.
   - Replace placeholder strings with `t('key')`.
   - Replace toast message strings with `t('key')`.
   - Replace array constants (such as `REJECTION_REASONS` in `DocumentPreviewModal.tsx`) with helper mapping or dynamic translation lookup `{REJECTION_REASONS.map((reasonKey) => t(reasonKey))}`.

---

## 4. Verification Protocol
1. Run `npm run lint` to confirm zero ESLint violations.
2. Run `npm run build` to execute `tsc -b` and verify that all 4 dictionary files strictly fulfill `Record<TranslationKey, string>`.
3. Manually verify language switching between EN, RU, FA, and PS in the Client portal UI.
