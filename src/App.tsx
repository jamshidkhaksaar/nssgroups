import { Routes, Route } from 'react-router'
import Layout from '@/components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Fleet from './pages/Fleet'
import Network from './pages/Network'
import Contact from './pages/Contact'
import Trading from './pages/Trading'
import Booking from './pages/Booking'
import Projects from './pages/Projects'
import Tracking from './pages/Tracking'
import Portal from './pages/Portal'
import AdminPortal from './pages/AdminPortal'
import ClientPortal from './pages/ClientPortal'
import PartnerPortal from './pages/PartnerPortal'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLogin from './pages/AdminLogin'
import ClientLogin from './pages/ClientLogin'
import PartnerLogin from './pages/PartnerLogin'

export default function App() {
  return (
    <Routes>
      {/* Public marketing pages — inside Layout (navbar + footer) */}
      <Route element={<Layout />}>
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
      </Route>
      {/* Dedicated portal dashboards — NO navbar/footer */}
      <Route path="/admin" element={<AdminPortal />} />
      <Route path="/client-portal" element={<ClientPortal />} />
      <Route path="/partner-portal" element={<PartnerPortal />} />
      {/* Auth login pages — NO navbar/footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/client" element={<ClientLogin />} />
      <Route path="/login/partner" element={<PartnerLogin />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

