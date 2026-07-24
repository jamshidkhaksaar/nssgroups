# Milestone 1 Exploration & Data Architecture Analysis Report

**Explorer**: Explorer 1  
**Target Project**: NSS Group Multi-Portal Frontend UI System (`d:\Projects\NSS\app`)  
**Date**: 2026-07-24  

---

## 1. System & Architecture Overview

The NSS Group application is a Vite + React 19 + TypeScript + Tailwind CSS application structured around custom i18n (`src/i18n/`) and responsive dark/light theme switching (`src/theme/`).

### Routing Architecture (`src/App.tsx`)
- Routes are declared using `react-router` 7 `<Routes>` and `<Route>`.
- Shared layout wrapping: A top-level `<Route element={<Layout />}>` wraps all standard pages (Home, About, Services, Fleet, Network, Contact, Trading, Booking, Projects, Tracking, Portal), ensuring persistent `Navbar` and `Footer` rendering across page transitions.
- Auth routes (`/login`, `/register`) are currently declared outside `<Layout />` for full-screen authentication views.

### Navigation Layout (`src/components/layout/Navbar.tsx`)
- Desktop Navigation utilizes `PRIMARY_LINKS` (array of `{ to: string, key: TranslationKey }`).
- Mobile Drawer utilizes `ALL_MOBILE_LINKS` (array of `{ to: string, key: TranslationKey }`).
- Header Actions include Theme toggle, Background Music toggle, `LanguageSwitcher` pill, and Login/Register CTA buttons.

### i18n Dictionary Architecture (`src/i18n/`)
- `src/i18n/translations/en.ts` exports `en` (`as const`), defining `TranslationKey = keyof typeof en`.
- All language translation dictionaries (`ru.ts`, `fa.ts`, `ps.ts`, `uz.ts`, `ar.ts`, `zh.ts`) are typed strictly as `Record<TranslationKey, string>`.
- **Constraint**: Adding any key to `en.ts` requires matching key entries in all other translation files for `tsc -b` type check to pass cleanly.

---

## 2. Portal Route & Integration Specifications

### Target Routes
| Route | Page Component Path | Description | Layout Wrapping |
|---|---|---|---|
| `/admin` | `src/pages/AdminPortal.tsx` | Moderation dashboard for document verification, partner/client oversight, and shipment updates | `<Layout />` |
| `/client-portal` | `src/pages/ClientPortal.tsx` | Client journey: Mock registration, verification upload, and client workspace | `<Layout />` |
| `/partner-portal` | `src/pages/PartnerPortal.tsx` | Vendor partner dashboard: Marketplace listing management & gamified level/metrics | `<Layout />` |

### Proposed `App.tsx` Integration
```tsx
import { Routes, Route } from 'react-router'
import Layout from '@/components/layout/Layout'
// Existing imports...
import AdminPortal from './pages/AdminPortal'
import ClientPortal from './pages/ClientPortal'
import PartnerPortal from './pages/PartnerPortal'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/network" element={<Network />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trading" element={<Trading />} />
        <Route path="/marketplace" element={<Trading />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/portal" element={<Portal />} />
        
        {/* Multi-Portal Routes */}
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/client-portal" element={<ClientPortal />} />
        <Route path="/partner-portal" element={<PartnerPortal />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
```

### Proposed `Navbar.tsx` Integration Plan
1. **Primary Links Update**:
   Update `PRIMARY_LINKS` or add a dedicated Portals menu:
   ```ts
   const PRIMARY_LINKS: NavItem[] = [
     { to: '/', key: 'nav.home' },
     { to: '/trading', key: 'nav.marketplace' },
     { to: '/services', key: 'nav.services' },
     { to: '/booking', key: 'nav.booking' },
     { to: '/client-portal', key: 'nav.clientPortal' },
     { to: '/partner-portal', key: 'nav.partnerPortal' },
     { to: '/admin', key: 'nav.adminPortal' },
     { to: '/about', key: 'nav.company' },
     { to: '/contact', key: 'nav.contact' },
   ]
   ```
2. **Mobile Links Update**:
   Add portal items to `ALL_MOBILE_LINKS` for mobile accessibility:
   ```ts
   { to: '/client-portal', key: 'nav.clientPortal' },
   { to: '/partner-portal', key: 'nav.partnerPortal' },
   { to: '/admin', key: 'nav.adminPortal' },
   ```

---

## 3. Recommended File Structure for Portals

```
src/
├── pages/
│   ├── AdminPortal.tsx            # Route /admin
│   ├── ClientPortal.tsx           # Route /client-portal
│   └── PartnerPortal.tsx          # Route /partner-portal
├── components/
│   └── portals/
│       ├── AdminDashboard.tsx      # Metrics summary for admin
│       ├── DocumentModeration.tsx  # Document approval/rejection table & preview
│       ├── ClientRegistration.tsx  # Registration form (email & social)
│       ├── ClientVerification.tsx  # Upload interface for pending verification state
│       ├── ClientDashboard.tsx     # Full client dashboard view
│       ├── PartnerMarketplace.tsx  # Marketplace listing management
│       └── PartnerGamification.tsx # Level badge, XP, Volume, Trust Score
├── data/
│   └── portalContent.ts           # Shared mock datasets for portals
```

---

## 4. State & Interface Schemas (`src/data/portalContent.ts`)

```ts
export type ClientState = 'unregistered' | 'pending_verification' | 'verified';

export interface DocumentVerificationItem {
  id: string;
  clientName: string;
  docType: 'business_license' | 'passport' | 'tax_certificate' | 'power_of_attorney';
  fileUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  notes?: string;
}

export interface PartnerGamification {
  xp: number;
  level: number;
  levelTitle: string;
  businessVolumeUsd: number;
  trustScore: number;
  nextLevelXp: number;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  category: string;
  priceUsd: number;
  unit: string;
  partnerName: string;
  status: 'active' | 'draft' | 'archived';
}

export interface OrderItem {
  id: string;
  trackingNumber: string;
  clientName: string;
  partnerName: string;
  status: 'pending' | 'in_transit' | 'customs_hold' | 'delivered';
  origin: string;
  destination: string;
  mode: 'ROAD' | 'RAIL' | 'AIR' | 'SEA';
  updatedAt: string;
}
```

---

## 5. Formulated i18n Translation Keys

### 5.1 English Master Keys (`src/i18n/translations/en.ts`)

```ts
// ── nav additions ──
'nav.adminPortal': 'Admin Portal',
'nav.clientPortal': 'Client Portal',
'nav.partnerPortal': 'Partner Portal',
'nav.portals': 'Portals',

// ── admin portal ──
'admin.title': 'Admin Moderation Portal',
'admin.sub': 'Centralized moderation dashboard for managing partners, clients, logistics orders, and document verification approvals.',
'admin.tab.dashboard': 'Overview',
'admin.tab.documents': 'Document Moderation',
'admin.tab.clients': 'Clients Management',
'admin.tab.partners': 'Partners Management',
'admin.tab.orders': 'Logistics & Orders',
'admin.stats.pendingDocs': 'Pending Verification Documents',
'admin.stats.activeClients': 'Active Registered Clients',
'admin.stats.verifiedPartners': 'Verified Partner Organizations',
'admin.stats.totalVolume': 'Total System Logistics Volume',
'admin.doc.client': 'Client Name',
'admin.doc.type': 'Document Type',
'admin.doc.date': 'Submitted Date',
'admin.doc.status': 'Status',
'admin.doc.action': 'Actions',
'admin.doc.approve': 'Approve',
'admin.doc.reject': 'Reject',
'admin.doc.view': 'View Document',
'admin.doc.approvedSuccess': 'Document approved successfully.',
'admin.doc.rejectedSuccess': 'Document rejected.',
'admin.doc.filterAll': 'All Statuses',
'admin.doc.filterPending': 'Pending',
'admin.doc.filterApproved': 'Approved',
'admin.doc.filterRejected': 'Rejected',
'admin.orders.trackingNo': 'Tracking #',
'admin.orders.mode': 'Transit Mode',
'admin.orders.origin': 'Origin',
'admin.orders.destination': 'Destination',
'admin.orders.updateStatus': 'Update Status',

// ── client portal ──
'client.title': 'Client Portal',
'client.sub': 'Register, verify your identity, track active shipments, place cargo orders, and view invoices.',
'client.status.unregistered': 'Unregistered',
'client.status.pending': 'Pending Verification',
'client.status.verified': 'Verified Client',
'client.reg.title': 'Client Account Registration',
'client.reg.sub': 'Create a client account using your email or social credentials to get started.',
'client.reg.email': 'Business Email',
'client.reg.password': 'Password',
'client.reg.company': 'Company Name',
'client.reg.social': 'Or register with',
'client.reg.google': 'Continue with Google',
'client.reg.submit': 'Create Client Account',
'client.verif.title': 'Identity & Business Verification',
'client.verif.sub': 'Please upload your business registration license or official passport to complete client verification.',
'client.verif.docType': 'Document Type',
'client.verif.upload': 'Upload Document File',
'client.verif.submit': 'Submit for Verification',
'client.verif.pendingNotice': 'Your document is currently under review by our administration team. Full portal features will unlock upon approval.',
'client.dash.title': 'Client Workspace',
'client.dash.activeShipments': 'Active Cargo Shipments',
'client.dash.newOrder': 'Place New Order',
'client.dash.invoices': 'Billing & Invoices',
'client.dash.docStatus': 'Verification Status',

// ── partner portal ──
'partner.title': 'Vendor & Partner Portal',
'partner.sub': 'Manage marketplace listings, view gamified partner metrics, and bid on active transport contracts.',
'partner.tab.marketplace': 'Marketplace Listings',
'partner.tab.gamification': 'Partner Level & Metrics',
'partner.tab.bids': 'Active Bids & Contracts',
'partner.market.title': 'Service & Goods Listings',
'partner.market.add': 'Add New Listing',
'partner.market.name': 'Listing Title',
'partner.market.category': 'Category',
'partner.market.price': 'Price / Rate ($)',
'partner.market.status': 'Listing Status',
'partner.gami.title': 'Partner Gamification & Performance',
'partner.gami.level': 'Partner Level',
'partner.gami.xp': 'XP (Experience Points)',
'partner.gami.volume': 'Business Volume (USD)',
'partner.gami.trustScore': 'Trust Score',
'partner.gami.nextLevel': 'XP to Next Level',
'partner.gami.badge': 'Gold Tier Partner',
```

### 5.2 Russian Translations (`src/i18n/translations/ru.ts`)

```ts
// ── nav additions ──
'nav.adminPortal': 'Панель администратора',
'nav.clientPortal': 'Кабинет клиента',
'nav.partnerPortal': 'Портал партнера',
'nav.portals': 'Порталы',

// ── admin portal ──
'admin.title': 'Портал модерации администратора',
'admin.sub': 'Централизованная панель модерации для управления партнерами, клиентами, логистическими заказами и верификацией документов.',
'admin.tab.dashboard': 'Обзор',
'admin.tab.documents': 'Модерация документов',
'admin.tab.clients': 'Управление клиентами',
'admin.tab.partners': 'Управление партнерами',
'admin.tab.orders': 'Логистика и заказы',
'admin.stats.pendingDocs': 'Документы на проверке',
'admin.stats.activeClients': 'Активные зарегистрированные клиенты',
'admin.stats.verifiedPartners': 'Верифицированные партнеры',
'admin.stats.totalVolume': 'Общий объем логистики системы',
'admin.doc.client': 'Имя / Компания клиента',
'admin.doc.type': 'Тип документа',
'admin.doc.date': 'Дата подачи',
'admin.doc.status': 'Статус',
'admin.doc.action': 'Действия',
'admin.doc.approve': 'Одобрить',
'admin.doc.reject': 'Отклонить',
'admin.doc.view': 'Просмотреть документ',
'admin.doc.approvedSuccess': 'Документ успешно одобрен.',
'admin.doc.rejectedSuccess': 'Документ отклонен.',
'admin.doc.filterAll': 'Все статусы',
'admin.doc.filterPending': 'Ожидает проверки',
'admin.doc.filterApproved': 'Одобрено',
'admin.doc.filterRejected': 'Отклонено',
'admin.orders.trackingNo': 'Трек-номер',
'admin.orders.mode': 'Вид транспорта',
'admin.orders.origin': 'Пункт отправления',
'admin.orders.destination': 'Пункт назначения',
'admin.orders.updateStatus': 'Обновить статус',

// ── client portal ──
'client.title': 'Портал клиента',
'client.sub': 'Регистрируйтесь, проходите верификацию, отслеживайте грузы, оформляйте заказы и просматривайте счета.',
'client.status.unregistered': 'Не зарегистрирован',
'client.status.pending': 'На верификации',
'client.status.verified': 'Верифицированный клиент',
'client.reg.title': 'Регистрация аккаунта клиента',
'client.reg.sub': 'Создайте аккаунт клиента, используя email или социальные сети.',
'client.reg.email': 'Рабочий Email',
'client.reg.password': 'Пароль',
'client.reg.company': 'Название компании',
'client.reg.social': 'Или войти через',
'client.reg.google': 'Продолжить с Google',
'client.reg.submit': 'Создать аккаунт',
'client.verif.title': 'Верификация личности и бизнеса',
'client.verif.sub': 'Пожалуйста, загрузите лицензию компании или паспорт для завершения проверки.',
'client.verif.docType': 'Тип документа',
'client.verif.upload': 'Загрузить файл документа',
'client.verif.submit': 'Отправить на проверку',
'client.verif.pendingNotice': 'Ваш документ находится на проверке у администратора. Полный доступ откроется после одобрения.',
'client.dash.title': 'Рабочее пространство клиента',
'client.dash.activeShipments': 'Активные грузоперевозки',
'client.dash.newOrder': 'Оформить новый заказ',
'client.dash.invoices': 'Счета и оплата',
'client.dash.docStatus': 'Статус проверки',

// ── partner portal ──
'partner.title': 'Портал поставщиков и партнеров',
'partner.sub': 'Управляйте предложениями на маркетплейсе, отслеживайте рейтинги и участвуйте в тендерах.',
'partner.tab.marketplace': 'Объявления маркетплейса',
'partner.tab.gamification': 'Уровень и показатели',
'partner.tab.bids': 'Активные заявки и контракты',
'partner.market.title': 'Каталог услуг и товаров',
'partner.market.add': 'Добавить объявление',
'partner.market.name': 'Название услуги / товара',
'partner.market.category': 'Категория',
'partner.market.price': 'Цена / Ставка ($)',
'partner.market.status': 'Статус',
'partner.gami.title': 'Геймификация и показатели партнера',
'partner.gami.level': 'Уровень партнера',
'partner.gami.xp': 'Очки опыта (XP)',
'partner.gami.volume': 'Объем бизнеса (USD)',
'partner.gami.trustScore': 'Индекс доверия',
'partner.gami.nextLevel': 'Очков до следующего уровня',
'partner.gami.badge': 'Золотой партнер',
```

### 5.3 Dari (Farsi) Translations (`src/i18n/translations/fa.ts`)

```ts
// ── nav additions ──
'nav.adminPortal': 'پورتال مدیر',
'nav.clientPortal': 'پورتال مشتری',
'nav.partnerPortal': 'پورتال همکار',
'nav.portals': 'پورتال‌ها',

// ── admin portal ──
'admin.title': 'پورتال نظارت مدیر',
'admin.sub': 'داشبورد مرکزی مدیریت برای سرپرستی شرکاء، مشتریان، سفارشات لوجیستیک و تایید اسناد.',
'admin.tab.dashboard': 'مرور عمومی',
'admin.tab.documents': 'نظارت اسناد',
'admin.tab.clients': 'مدیریت مشتریان',
'admin.tab.partners': 'مدیریت شرکاء',
'admin.tab.orders': 'لوجیستیک و سفارشات',
'admin.stats.pendingDocs': 'اسناد در انتظار تایید',
'admin.stats.activeClients': 'مشتریان فعال ثبت‌شده',
'admin.stats.verifiedPartners': 'شرکاء تاییدشده',
'admin.stats.totalVolume': 'مجموع حجم لوجیستیک سیستم',
'admin.doc.client': 'نام مشتری / شرکت',
'admin.doc.type': 'نوع سند',
'admin.doc.date': 'تاریخ ارسال',
'admin.doc.status': 'حالت',
'admin.doc.action': 'عملیات',
'admin.doc.approve': 'تایید کردن',
'admin.doc.reject': 'رد کردن',
'admin.doc.view': 'مشاهده سند',
'admin.doc.approvedSuccess': 'سند با موفقیت تایید شد.',
'admin.doc.rejectedSuccess': 'سند رد شد.',
'admin.doc.filterAll': 'همه حالت‌ها',
'admin.doc.filterPending': 'در انتظار بررسی',
'admin.doc.filterApproved': 'تاییدشده',
'admin.doc.filterRejected': 'ردشده',
'admin.orders.trackingNo': 'نمبر رهگیری',
'admin.orders.mode': 'نوع ترانسپورت',
'admin.orders.origin': 'مبداء',
'admin.orders.destination': 'مقصد',
'admin.orders.updateStatus': 'آپدیت حالت',

// ── client portal ──
'client.title': 'پورتال مشتری',
'client.sub': 'ثبت نام کنید، هویت خود را تایید نمایید، محموله‌ها را رهگیری نموده و فاکتورها را مشاهده کنید.',
'client.status.unregistered': 'ثبت‌نام‌نشده',
'client.status.pending': 'در انتظار تایید',
'client.status.verified': 'مشتری تاییدشده',
'client.reg.title': 'ثبت حساب مشتری',
'client.reg.sub': 'برای شروع، حساب مشتری خود را با ایمیل یا شبکه‌های اجتماعی بسازید.',
'client.reg.email': 'ایمیل کاری',
'client.reg.password': 'رمز عبور',
'client.reg.company': 'نام شرکت',
'client.reg.social': 'یا ثبت نام با',
'client.reg.google': 'ادامه با گوگل',
'client.reg.submit': 'ایجاد حساب مشتری',
'client.verif.title': 'تایید هویت و شرکت',
'client.verif.sub': 'لطفاً جواز شرکت یا پاسپورت خود را جهت تکمیل تایید مشتری آپلود کنید.',
'client.verif.docType': 'نوع سند',
'client.verif.upload': 'آپلود فایل سند',
'client.verif.submit': 'ارسال جهت بررسی',
'client.verif.pendingNotice': 'سند شما در حال بررسی توسط تیم اداره می‌باشد. امکانات کامل پس از تایید فعال می‌شود.',
'client.dash.title': 'میز کار مشتری',
'client.dash.activeShipments': 'محموله‌های فعال',
'client.dash.newOrder': 'ثبت سفارش جدید',
'client.dash.invoices': 'صورتحساب‌ها و بل‌ها',
'client.dash.docStatus': 'حالت تایید اسناد',

// ── partner portal ──
'partner.title': 'پورتال شرکاء و تامین‌کنندگان',
'partner.sub': 'لیست اعلانات مارکتپلیس را مدیریت کنید، امتیازات را مشاهده نموده و در داوطلبی‌ها اشتراک ورزید.',
'partner.tab.marketplace': 'اعلانات مارکتپلیس',
'partner.tab.gamification': 'سطح و معیارهای همکار',
'partner.tab.bids': 'پیشنهادات و قراردادهای فعال',
'partner.market.title': 'لیست اجناس و خدمات',
'partner.market.add': 'افزودن اعلان جدید',
'partner.market.name': 'عنوان اعلان',
'partner.market.category': 'دسته بندی',
'partner.market.price': 'قیمت / نرخ ($)',
'partner.market.status': 'حالت اعلان',
'partner.gami.title': 'سیستم امتیازدهی و کارکرد همکار',
'partner.gami.level': 'سطح همکار',
'partner.gami.xp': 'امتیاز تجربه (XP)',
'partner.gami.volume': 'حجم معاملات (دالر)',
'partner.gami.trustScore': 'شاخص اعتبار',
'partner.gami.nextLevel': 'امتیاز لازم تا سطح بعدی',
'partner.gami.badge': 'شریک درجه طلایی',
```

### 5.4 Pashto Translations (`src/i18n/translations/ps.ts`)

```ts
// ── nav additions ──
'nav.adminPortal': 'د اډمین پورتال',
'nav.clientPortal': 'د پیرودونکي پورتال',
'nav.partnerPortal': 'د ملګري پورتال',
'nav.portals': 'پورتالونه',

// ── admin portal ──
'admin.title': 'د اډمین مدیریت پورتال',
'admin.sub': 'د ملګرو، پیرودونکو، لوجیستیکي سپارښتنو او اسنادو تایید د څارنې مرکزي ډشبورډ.',
'admin.tab.dashboard': 'عمومي کتنه',
'admin.tab.documents': 'د اسنادو څارنه',
'admin.tab.clients': 'د پیرودونکو مدیریت',
'admin.tab.partners': 'د ملګرو مدیریت',
'admin.tab.orders': 'لوجیستیک او سپارښتنې',
'admin.stats.pendingDocs': 'د تایید په تمه اسناد',
'admin.stats.activeClients': 'فعال ثبت شوي پیرودونکي',
'admin.stats.verifiedPartners': 'تایید شوي ملګري',
'admin.stats.totalVolume': 'د سیسټم ټول لوجیستیکي حجم',
'admin.doc.client': 'د پیرودونکي / شرکت نوم',
'admin.doc.type': 'د سند ډول',
'admin.doc.date': 'د سپارلو نیټه',
'admin.doc.status': 'حالت',
'admin.doc.action': 'کړنې',
'admin.doc.approve': 'تایید کول',
'admin.doc.reject': 'رد کول',
'admin.doc.view': 'سند لیدل',
'admin.doc.approvedSuccess': 'سند په برياليتوب سره تاييد شو.',
'admin.doc.rejectedSuccess': 'سند رد شو.',
'admin.doc.filterAll': 'ټول حالتونه',
'admin.doc.filterPending': 'په تمه',
'admin.doc.filterApproved': 'تایید شوی',
'admin.doc.filterRejected': 'رد شوی',
'admin.orders.trackingNo': 'د تعقیب شمیره',
 me'admin.orders.mode': 'د ټرانسپورټ ډول',
'admin.orders.origin': 'مبداء',
'admin.orders.destination': 'مقصد',
'admin.orders.updateStatus': 'حالت نوي کول',

// ── client portal ──
'client.title': 'د پیرودونکي پورتال',
'client.sub': 'ثبت نام وکړئ، خپل هویت تایید کړئ، بارونه تعقیب کړئ او بيلونه وګورئ.',
'client.status.unregistered': 'ناراجسټر شوی',
'client.status.pending': 'د تایید په تمه',
'client.status.verified': 'تایید شوی پیرودونکی',
'client.reg.title': 'د پیرودونکي حساب ثبتول',
'client.reg.sub': 'د پیل لپاره د ایمیل یا ټولنیزو شبکو له لارې حساب جوړ کړئ.',
'client.reg.email': 'کاري ایمیل',
'client.reg.password': 'پټنوم',
'client.reg.company': 'د شرکت نوم',
'client.reg.social': 'یا ثبت نام له لارې د',
'client.reg.google': 'د ګوګل له لارې دوام ورکړئ',
'client.reg.submit': 'حساب جوړول',
'client.verif.title': 'د هویت او سوداګرۍ تایید',
'client.verif.sub': 'مهرباني وکړئ د تایید بشپړولو لپاره د شرکت جواز یا پاسپورت اپلوډ کړئ.',
'client.verif.docType': 'د سند ډول',
'client.verif.upload': 'د سند فایل اپلوډ',
'client.verif.submit': 'د تایید لپاره لېږل',
'client.verif.pendingNotice': 'ستاسو سند د اډمین لخوا تر څېړنې لاندې دی. ټولې اسانتیاوې به تر تایید وروسته خلاصې شي.',
'client.dash.title': 'د پیرودونکي کاري ساحه',
'client.dash.activeShipments': 'فعال بارونه',
'client.dash.newOrder': 'نوې سپارښتنه ثبتول',
'client.dash.invoices': 'بیلونه او تادیات',
'client.dash.docStatus': 'د تایید حالت',

// ── partner portal ──
'partner.title': 'د همکارانو او چمتو کونکو پورتال',
'partner.sub': 'د مارکټ پلیس اعلانونه اداره کړئ، امتیازات وګورئ او په داوطلبيو کې برخه واخلئ.',
'partner.tab.marketplace': 'د مارکټ پلیس اعلانونه',
'partner.tab.gamification': 'د همکار کچه او شاخصونه',
'partner.tab.bids': 'فعال وړاندیزونه او قراردادونه',
'partner.market.title': 'د توکو او خدماتو لست',
'partner.market.add': 'نوی اعلان زیاتول',
'partner.market.name': 'د اعلان نښه',
'partner.market.category': 'ډله بندی',
'partner.market.price': 'قیمت / نرخ ($)',
'partner.market.status': 'د اعلان حالت',
'partner.gami.title': 'د همکار پرمختګ او شاخصونه',
'partner.gami.level': 'د همکار کچه',
'partner.gami.xp': 'د تجربې امتیاز (XP)',
'partner.gami.volume': 'د سوداګرۍ حجم (ډالر)',
'partner.gami.trustScore': 'د اعتبار شاخص',
'partner.gami.nextLevel': 'تر بلې کچې پورې امتیاز',
'partner.gami.badge': 'طلایي کچې همکار',
```

---

## 6. Implementation Checklist & Verification Strategy

1. **Phase 1: Data Architecture & i18n (`M1`)**
   - Create `src/data/portalContent.ts` with TypeScript interfaces and mock data.
   - Insert new translation keys across `en.ts`, `ru.ts`, `fa.ts`, `ps.ts`, `uz.ts`, `ar.ts`, `zh.ts`.
   - Run `npm run build` (`tsc -b`) to verify key completeness.

2. **Phase 2: Portals Core Implementation (`M2`–`M4`)**
   - Implement `AdminPortal.tsx`, `ClientPortal.tsx`, `PartnerPortal.tsx` and sub-components in `src/components/portals/`.

3. **Phase 3: Routing & Navbar Integration (`M5`)**
   - Update `App.tsx` routes.
   - Update `Navbar.tsx` links.

4. **Phase 4: Verification & Audit (`M6`)**
   - Run `npm run lint` and `npm run build`.
