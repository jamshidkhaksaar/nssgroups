# NSS International Group of Companies — Website

Multi-page marketing site + demo client portal for an Afghan transport,
logistics and construction group ("Your Cargo, Our Responsibility").
Frontend-only, built on the Vite + React + TypeScript template with
shadcn/ui.

## Tech stack

- **React 19** + **react-router 7** (`BrowserRouter`)
- **Vite 7** + TypeScript (strict, `tsc -b` project references)
- **Tailwind CSS v3.4** + shadcn/ui ("new-york" style, dark/light via CSS vars)
- **i18n** — hand-rolled, 7 languages: English, Russian, Dari (fa), Pashto (ps),
  Uzbek, Arabic, Chinese. FA/PS/AR are RTL.
- **Canvas hero** — pure Canvas 2D cinematic animation engine in `src/hero/`
- **Portal demo** — Admin / Client / Partner dashboards backed by a
  localStorage store (`src/data/portalData.ts`), guarded by a mock
  client-side session (`src/lib/auth.ts`)

## Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite dev server on **port 3000** |
| `npm run build` | Type-check (`tsc -b`) then production build to `dist/` |
| `npm run lint` | Run ESLint over the repo |
| `npm run preview` | Serve the production build locally |

There is no test framework; "testing" is `npm run lint` + `npm run build`
(strict `tsc`) + manual browser verification.

## Project structure

```
src/
  main.tsx            React root: BrowserRouter + I18nProvider + ThemeProvider
  App.tsx             Route table (marketing pages, portals, auth pages)
  pages/              Home, About, Services, Fleet, Network, Contact,
                      Booking, Tracking, Projects, Marketplace, Portals, auth
  sections/home/      Home page sections
  hero/               Cinematic Canvas hero (Hero.tsx, engine.ts, hero.css)
  components/
    layout/           Navbar, Footer, Layout, AuthLayout, DashboardShell,
                      RequirePortal (route guard)
    portals/          Admin/Client/Partner dashboard components
    ui/               shadcn/ui components (vendored)
  i18n/               Context, hook, LANGS, translation dictionaries
  data/               content.ts, portalData.ts (localStorage store)
  lib/                utils, auth (mock session), seo, request-store
  theme/              ThemeProvider + useTheme (dark/light)
```

## Portals & auth (demo)

- `/admin`, `/client-portal`, `/partner-portal` are guarded by
  `RequirePortal` — visiting without a session redirects to `/login/{role}`.
- Logging in creates a localStorage session (`nss-auth-session`); the three
  logins are demo-only (any credentials work after a 1s delay).
- Portal data persists in `localStorage` under `nss-portal-db-v1` and can be
  reset from the dashboard user menu.

## Deploy (cPanel / static host)

1. `npm run build` — type-checks, generates `sitemap.xml`, prerenders
   per-route `index.html` files, and emits to `dist/`.
2. Upload the contents of `dist/` to the host's public web root (or zip it
   and upload via File Manager).
3. `public/.htaccess` handles SPA rewrites, HTTPS/www redirects, caching and
   compression — it ships into `dist/` automatically.
4. `base: './'` keeps all asset paths relative, so the build works from any
   subdirectory.

> Note: `public/MOU/` and `public/projects/Topvideos/` are local-only (gitignored).
> If they exist in your checkout they are copied into `dist/` by Vite — remove
> them before uploading if you don't want them shipped.
