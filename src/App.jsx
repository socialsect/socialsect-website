import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/homepage/homepage'
import ServicesPage from './pages/services/ServicesPage'
import ServicesPillarStub from './pages/services/ServicesPillarStub'
import ServiceDetailRoute from './pages/services/ServiceDetailRoute'
import HowWeWorkPage from './pages/how-we-work/HowWeWorkPage'
import WhoWeHelpPage from './pages/who-we-help/WhoWeHelpPage'
import SpecialtyPageRoute from './pages/who-we-help/SpecialtyPageRoute'
import ResultsPage from './pages/results/ResultsPage'
import AboutPage from './pages/about/AboutPage'
import BookACallPage from './pages/book-a-call/BookACallPage'
import NotFoundPage from './pages/not-found/NotFoundPage'
import InsightsPage from './pages/insights/InsightsPage'
import TestimonialsPage from './pages/insights/TestimonialsPage'
import BlogPage from './pages/insights/BlogPage'
import ResourcesPage from './pages/insights/ResourcesPage'
// import Loader from "./components/loader/loader"
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      {/* <Loader /> */}
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:pillar/:service" element={<ServiceDetailRoute />} />
        <Route path="/services/:pillar" element={<ServicesPillarStub />} />
        <Route path="/how-we-work" element={<HowWeWorkPage />} />
        <Route path="/who-we-help" element={<WhoWeHelpPage />} />
        <Route path="/who-we-help/:specialty" element={<SpecialtyPageRoute />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/testimonials" element={<TestimonialsPage />} />
        <Route path="/insights/blog" element={<BlogPage />} />
        <Route path="/insights/resources" element={<ResourcesPage />} />
        <Route path="/book-a-call" element={<BookACallPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App