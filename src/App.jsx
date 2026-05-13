import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/homepage/homepage'
import ServicesPage from './pages/services/ServicesPage'
import ServicesPillarStub from './pages/services/ServicesPillarStub'
import HowWeWorkPage from './pages/how-we-work/HowWeWorkPage'
import WhoWeHelpPage from './pages/who-we-help/WhoWeHelpPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-we-work" element={<HowWeWorkPage />} />
        <Route path="/who-we-help" element={<WhoWeHelpPage />} />
        <Route path="/who-we-help/:specialty" element={<WhoWeHelpPage />} />
        <Route path="/services/:pillar/*" element={<ServicesPillarStub />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App