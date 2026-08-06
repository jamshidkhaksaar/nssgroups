import { lazy, Suspense } from 'react'
import { Navigate, Routes, Route } from 'react-router'
import Layout from '@/components/layout/Layout'
import RequirePortal from '@/components/layout/RequirePortal'
import { Spinner } from '@/components/ui/spinner'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Fleet from './pages/Fleet'
import Network from './pages/Network'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import Tracking from './pages/Tracking'
import Portal from './pages/Portal'
import CompanyPortfolio from './pages/CompanyPortfolio'

// Heavy / rarely-first-hit routes are code-split so they don't weigh down the
// initial marketing-site bundle. Portal dashboards pull in charts, forms, etc.
const Trading = lazy(() => import('./pages/Trading'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Projects = lazy(() => import('./pages/Projects'))
const AdminPortal = lazy(() => import('./pages/AdminPortal'))
const ClientPortal = lazy(() => import('./pages/ClientPortal'))
const PartnerPortal = lazy(() => import('./pages/PartnerPortal'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const ClientLogin = lazy(() => import('./pages/ClientLogin'))
const PartnerLogin = lazy(() => import('./pages/PartnerLogin'))

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <Spinner className="size-8 text-[rgb(var(--gold-rgb))]" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Public marketing pages — inside Layout (navbar + footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/company-portfolio" element={<CompanyPortfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/network" element={<Network />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/trading" element={<Navigate to="/marketplace" replace />} />
          <Route path="/marketplace" element={<Trading />} />
          <Route path="/marketplace/product/:sku" element={<ProductDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/portal" element={<Portal />} />
        </Route>
        {/* Dedicated portal dashboards — NO navbar/footer, role-guarded */}
        <Route path="/admin" element={<RequirePortal role="admin"><AdminPortal /></RequirePortal>} />
        <Route path="/client-portal" element={<RequirePortal role="client"><ClientPortal /></RequirePortal>} />
        <Route path="/partner-portal" element={<RequirePortal role="partner"><PartnerPortal /></RequirePortal>} />
        {/* Auth login pages — NO navbar/footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/client" element={<ClientLogin />} />
        <Route path="/login/partner" element={<PartnerLogin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  )
}
