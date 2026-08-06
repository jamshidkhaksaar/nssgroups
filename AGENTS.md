# AGENTS.md

## Project overview

**NSS Groups of Companies** — a multi-page marketing website for an Afghan
transport, logistics and construction group ("Your Cargo, Our Responsibility").
It is a frontend-only application built from the Vite + React + TypeScript
template with the full shadcn/ui component set pre-installed. There is **no
backend**: the contact form opens a prefilled `mailto:`; all content lives in
i18n translation files (`src/i18n/translations/`) and `src/data/content.ts`.

The site has ~20 routes (`src/App.tsx`): marketing pages wrapped in a shared
`Layout` (fixed `Navbar` + `Footer`, `src/components/layout/`) — `/`, `/about`,
`/services`, `/fleet`, `/network`, `/contact`, `/booking`, `/tracking`,
`/projects`, `/company-portfolio`, `/marketplace`, `/marketplace/product/:sku`,
`/portal` — plus guarded portal dashboards (`/admin`, `/client-portal`,
`/partner-portal`) and auth pages (`/login`, `/login/admin`, `/login/client`,
`/login/partner`, `/register`). It is fully translated into **English, Russian,
Dari (Farsi), Pashto, Uzbek, Arabic and Chinese** via a hand-rolled i18n
system (no library): `src/i18n/I18nContext.tsx` (provider, sets `<html lang>`
and `dir` — FA/PS/AR are RTL) and `src/i18n/i18n.ts` (`useI18n()`, `LANGS`,
dictionaries). `src/i18n/translations/en.ts` is the master key list; every
user-visible string must be a translation key, never hardcoded. New/translated
keys go into `src/i18n/translations/{en,ru,fa,ps,uz,ar,zh}.ts` base
dictionaries (or the shared `translationCompletion.ts` objects, which spread
last and win).

The centerpiece is a cinematic, fully custom canvas-based hero section
(`src/hero/`): a pure-Canvas-2D animation engine that loops through four
freight "chapters" (ROAD → RAIL → AIR → SEA) with parallax, delta-time
animation, procedural grain, and chapter crossfades. Home sections
(`src/sections/home/`): trust bar, group divisions, animated impact stats,
services preview, corridor teaser, clients strip, CTA band.

## Technology stack

- **Runtime/tooling**: Node.js 20, npm (lockfile: `package-lock.json`)
- **Build**: Vite 7 (`vite.config.ts`), TypeScript ~5.9 (`tsc -b` project
  references: `tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`)
- **UI**: React 19, react-router 7 (`BrowserRouter` in `src/main.tsx`)
- **Styling**: Tailwind CSS v3.4 (+ PostCSS/autoprefixer, `tailwindcss-animate`),
  shadcn/ui ("new-york" style, slate base color, CSS variables) configured via
  `components.json`. Dark mode is class-based (`darkMode: ["class"]`).
- **Component libs**: Radix UI primitives, lucide-react icons,
  class-variance-authority + clsx + tailwind-merge (`cn()` in `src/lib/utils.ts`),
  react-hook-form + zod, recharts, sonner, embla-carousel, vaul, cmdk, etc.
- **Vite plugins**: `@vitejs/plugin-react` and `kimi-plugin-inspect-react`
  (dev-time element inspection).
- Fonts: **Sora** (display), **Manrope** (body), **JetBrains Mono**
  (data labels), **Vazirmatn** (Dari), **Noto Naskh Arabic** (Pashto),
  Noto Sans Arabic (RTL fallback) — Google Fonts in `index.html`.

## Build and dev commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite dev server on **port 3000** |
| `npm run build` | Type-check (`tsc -b`) then production build to `dist/` |
| `npm run lint` | Run ESLint over the repo |
| `npm run preview` | Serve the production build locally |

There is **no test framework installed** (no Vitest/Jest/Playwright). "Testing"
currently means: `npm run lint`, `npm run build` (strict `tsc` is the main
safety net), and manual verification in the browser. Do not add test
dependencies unless explicitly asked.

## Project structure

```
index.html            Entry HTML (fonts, theme-color, #root)
public/logo.png       Static asset, referenced as "./logo.png"
public/posters/       Branded marketing posters (1,3,12,auth_bg.jpg) used as
                      section imagery — referenced as "./posters/N.jpg"
src/main.tsx          React root: <BrowserRouter> + <I18nProvider> + StrictMode
src/App.tsx           Route table — marketing pages under <Layout/>, guarded
                      portal dashboards, and auth login pages
src/index.css         Tailwind, shadcn vars, NSS base + shared section classes
                      (nss-section-tag, nss-h2, nss-card, nss-index,
                      nss-reveal-io, nss-poster, nss-route-line)
src/pages/            Home, About, Services, Fleet, Network, Contact, Booking,
                      Tracking, Projects, Marketplace, Portals, auth pages
src/i18n/
  I18nContext.tsx     <I18nProvider> only (react-refresh rule: no other exports)
  i18n.ts             useI18n(), LANGS (7 langs incl. uz/ar/zh), dictionaries
  translations/       en.ts (master keys, `as const`) + ru/fa/ps/uz/ar/zh — all
                      must stay Record<TranslationKey, string> complete;
                      shared extras live in translationCompletion.ts (spread last)
src/data/content.ts   Structured data (fleet counts, rate card, offices,
                      corridors, clients, contact info) — numbers here,
                      labels via i18n keys
src/data/portalData.ts localStorage-backed portal store (clients, orders,
                      invoices, partners, documents, logs)
src/components/
  layout/             Navbar, Footer, Layout (fixed nav, scroll-to-top, Toaster),
                      AuthLayout (split-screen auth shell), DashboardShell
                      (portal chrome), RequirePortal (role route guard)
  portals/            Admin/Client/Partner dashboard components
  Reveal.tsx          Scroll-reveal wrapper (useReveal + .nss-reveal-io)
  AnimatedNumber.tsx  Count-up on scroll into view
  PageHeader.tsx      Standard subpage header block
  LanguageSwitcher.tsx EN · RU · دری · پښتو · O'Z · ع · 中文 switcher
  ui/                 15 shadcn/ui components in use — generated, edit sparingly
src/hooks/            useReveal.ts (IntersectionObserver)
src/lib/              utils.ts (cn), auth.ts (mock session + route guard hook),
                      seo.ts, request-store.ts
src/hero/             Custom cinematic hero (the app's core feature)
  Hero.tsx            React wrapper: canvas + copy/chrome (i18n via useI18n)
  engine.ts           HeroEngine class — pure Canvas 2D animation (~1200 lines),
                      exports CHAPTERS (mode/corridor/coordinates per chapter)
  hero.css            Hero styles & keyframes + nss-display/nss-mono/nss-hairline
                      (globally used — hero.css is imported app-wide via Hero)
src/sections/home/    Home sections: TrustBar, GroupDivisions, ImpactStats,
                      ServicesPreview, CorridorTeaser, ClientsStrip, CtaBand
src/types/            portal.ts — portal data model types
```

## Conventions

- **Path alias**: `@/` maps to `src/` (configured in `vite.config.ts`,
  `tsconfig.json`, and `components.json`). Use it for imports.
- **TypeScript is strict**: `strict`, `noUnusedLocals`, `noUnusedParameters`,
  `verbatimModuleSyntax` (use `import type` for type-only imports),
  `erasableSyntaxOnly` (no enums or other runtime TS-only syntax),
  `noUncheckedSideEffectImports`. `npm run build` fails on any violation.
- **Styling**: prefer Tailwind utility classes. The NSS brand palette is used
  as raw hex values — deep purple background `#0e0a1e`, cream text `#f7f1e3`,
  gold accent `#e8c268` / `#c9a24b`, dark text on gold `#1d1233`.
- **Theming**: dark ↔ light via CSS variables defined in `src/index.css`
  (`:root` = dark, `html[data-theme='light']` = light): `--bg`, `--bg-rgb`,
  `--bg-deep`, `--panel`, `--panel-2`, `--text-rgb`, `--gold-rgb`, `--gold`.
  Components consume them as `bg-[var(--bg)]`, `text-[rgb(var(--text-rgb))]`,
  `text-[rgba(var(--text-rgb),0.60)]` — **never** `bg-[var(--bg)]/85`
  (Tailwind drops opacity modifiers on `var()`; use `rgba(var(--bg-rgb),0.85)`
  instead). `src/theme/theme.ts` (`useTheme()`) + `src/theme/ThemeContext.tsx`
  (`<ThemeProvider>`) persist the choice and set `data-theme` on `<html>`;
  the navbar Sun/Moon button toggles it.
- **i18n**: every user-visible string is a key in `src/i18n/translations/en.ts`;
  add keys to **all seven** files (en/ru/fa/ps/uz/ar/zh) — tsc enforces completeness via
  `Record<TranslationKey, string>`. FA/PS are RTL: the provider sets
  `document.documentElement.dir`; use Tailwind logical utilities (`ms-`/`me-`,
  `ps-`/`pe-`, `start-`/`end-`, `text-start/end`) for direction-sensitive
  layout, and `dir="ltr"` on phone numbers/emails. `[dir='rtl']` CSS overrides
  switch body/heading fonts to Noto Sans Arabic.
- **Numbers/data**: counts, prices, offices, corridors and client lists live in
  `src/data/content.ts` as structured records referencing translation keys —
  keep them in sync with real company data (`../NSS-brief.md`).
- **Hero CSS namespace**: hero-specific classes live in `src/hero/hero.css`
  and are prefixed `nss-` (`nss-display`, `nss-mono`, `nss-reveal`,
  `nss-fade`, `nss-btn-primary`, …). Shared section classes
  (`nss-section-tag`, `nss-h2`, `nss-card`, `nss-index`, `nss-reveal-io`,
  `nss-poster`, `nss-route-line`) live in `src/index.css`. Text reveals are CSS
  keyframe animations with staggered `animationDelay` set inline; section
  reveals use the `<Reveal/>` component (IntersectionObserver).
- **Hero engine**: `HeroEngine` in `src/hero/engine.ts` is framework-free
  (no React inside); React only instantiates/destroys it and mirrors chapter
  state via the `onChapter` callback / `onTick` hook. Preserve this
  separation. Per-chapter copy comes from the exported `CHAPTERS` constant.
  The engine is theme-aware: `LOOKS` (dark) + `LOOKS_LIGHT` (sunny day) are
  blended per-frame through `setTheme('dark'|'light')` — `mixedLook()` and
  `themed()`/`mixRGBA()` interpolate every scene color, so keep both look
  tables in sync when adding scene colors.
- **shadcn/ui**: components in `src/components/ui/` are vendored shadcn output.
  Add new ones with the shadcn CLI conventions (`@/components/ui` alias,
  lucide icons); treat them as generated code.
- **ESLint**: flat config (`eslint.config.js`) with `js.configs.recommended`,
  `typescript-eslint` recommended, `react-hooks`, and `react-refresh` rules;
  `dist/` and `src/components/ui/` (vendored) are ignored. Because of
  `react-refresh/only-export-components`, files exporting components must not
  export hooks/constants too (hence `i18n.ts` vs `I18nContext.tsx`).
- **Accessibility**: the hero honors `prefers-reduced-motion` (animations
  collapse to ~0s in `hero.css`). Maintain this for new animated sections.
- **Deployment**: `vite.config.ts` sets `base: './'` (relative asset paths) so
  the `dist/` output can be served from any static host or subdirectory. No
  CI/CD pipeline is configured in the repo.

## Notes for agents

- Keep changes minimal and match existing style (2-space indent, single quotes
  in TS/TSX, no semicolon-free style — the codebase uses semicolons).
- New home sections go in `src/sections/home/` and are composed in
  `src/pages/Home.tsx`; new routes go in `src/pages/` + `src/App.tsx`.
- When changing hero animation behavior, verify in the browser (`npm run dev`)
  since there are no automated tests covering it. Also spot-check RTL by
  switching to دری/پښتو in the language switcher.
