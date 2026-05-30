import { lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SeoManager from './components/SeoManager'
import HomePage from './pages/homepage/homepage'
const ServicesPage = lazy(() => import('./pages/services/ServicesPage'))
const ServicesPillarStub = lazy(() => import('./pages/services/ServicesPillarStub'))
const ServiceDetailRoute = lazy(() => import('./pages/services/ServiceDetailRoute'))
const HowWeWorkPage = lazy(() => import('./pages/how-we-work/HowWeWorkPage'))
const WhoWeHelpPage = lazy(() => import('./pages/who-we-help/WhoWeHelpPage'))
const SpecialtyPageRoute = lazy(() => import('./pages/who-we-help/SpecialtyPageRoute'))
const ResultsPage = lazy(() => import('./pages/results/ResultsPage'))
const AboutPage = lazy(() => import('./pages/about/AboutPage'))
const BookACallPage = lazy(() => import('./pages/book-a-call/BookACallPage'))
const NotFoundPage = lazy(() => import('./pages/not-found/NotFoundPage'))
const InsightsPage = lazy(() => import('./pages/insights/InsightsPage'))
const TestimonialsPage = lazy(() => import('./pages/insights/TestimonialsPage'))
const BlogPage = lazy(() => import('./pages/insights/BlogPage'))
const BlogArticlePage = lazy(() => import('./pages/insights/BlogArticlePage'))
const ResourcesPage = lazy(() => import('./pages/insights/ResourcesPage'))
const ClientPortalPage = lazy(() => import('./pages/client-portal/ClientPortalPage'))
const SanityArticlesTestPage = lazy(() => import('./pages/debug/SanityArticlesTestPage'))

const routeFallback = (
  <div className="route-loading" role="status" aria-live="polite">
    Loading page...
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <SeoManager />
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={routeFallback}>
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
          <Route path="/insights/blog/:slug" element={<BlogArticlePage />} />
          <Route path="/insights/resources" element={<ResourcesPage />} />
          <Route path="/book-a-call" element={<BookACallPage />} />
          <Route path="/client-portal" element={<ClientPortalPage />} />
          <Route path="/debug/sanity-articles" element={<SanityArticlesTestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App