import React, { lazy, Suspense, useEffect, useState } from 'react'
// import AutoplayVideoModal from './components/AutoplayVideoModal'
import PodcastBanner from './components/PodcastBanner'
import GrowthAuditorLauncher from './components/growth-auditor/GrowthAuditorLauncher'
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
const ProductsPage = lazy(() => import('./pages/products/ProductsPage'))
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
const AvivaPage = lazy(() => import('./pages/aviva/AvivaPage'))
const RegionLandingPage = lazy(() => import('./pages/dermatologists/RegionLandingPage'))
const SanityArticlesTestPage = lazy(() => import('./pages/debug/SanityArticlesTestPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/privacy/PrivacyPolicyPage'))
const VisibilityPage = lazy(() => import('./pages/visibility/index'))

const routeFallback = (
  <div className="route-loading" role="status" aria-live="polite">
    Loading page...
  </div>
)

function App() {
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('videoModalDismissed')
      if (dismissed === '1') return undefined
    } catch (err) {
      // ignore localStorage errors
    }

    const timer = setTimeout(() => setVideoOpen(true), 10000)
    return () => clearTimeout(timer)
  }, [])
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
          <Route path="/products" element={<ProductsPage />} />
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
          <Route path="/seo-services-for-dermatologists/:pageSlug" element={<RegionLandingPage />} />
          <Route path="/client-portal" element={<ClientPortalPage />} />
          <Route path="/aviva" element={<AvivaPage />} />
          <Route path="/debug/sanity-articles" element={<SanityArticlesTestPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/where-your-implant-practice-is-going-wrong" element={<VisibilityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <PodcastBanner />
      <GrowthAuditorLauncher />
      <Footer />
    </BrowserRouter>
  )
}

export default App