import { Routes, Route } from 'react-router'
import Layout from '@/components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Fleet from './pages/Fleet'
import Network from './pages/Network'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/network" element={<Network />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
