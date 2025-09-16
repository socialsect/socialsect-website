/**
 * =============================================================================
 * ROUTING CONFIGURATION
 * =============================================================================
 * 
 * This file defines all the routes for the Socialsect website application.
 * It uses React Router DOM for client-side routing and includes all pages
 * with their respective components and configurations.
 * 
 * @author Socialsect Team
 * @version 1.0.0
 * @since 2024
 */

// =============================================================================
// IMPORTS
// =============================================================================

import { Routes, Route } from "react-router-dom";

// =============================================================================
// PAGE COMPONENTS
// =============================================================================

// Core Pages
import Home from "../pages/home-page/home";
import About from "../pages/About-us/about-us";
import ContactPage from "../pages/contact";
import NotFound from "../pages/404/404";

// Service Pages
import ServicesOverview from "../pages/services/services-overview";
import SEOServices from "../pages/services/seo";
import MetaAdsPage from "../pages/services/meta";
import WebsiteGrowthPage from "../pages/services/website-growth";
import WebsiteDevelopment from "../pages/services/website-development";
import PerformanceMarketing from "../pages/services/performance-marketing";
import ContentStrategy from "../pages/services/content-strategy";
import GTMPage from "../pages/services/gtm";
import AppDevelopment from "../pages/services/app-development";

// Case Studies Pages
import CaseStudiesIndex from "../pages/case-studies/index";
import ServiceCase from "../pages/case-studies/service-case";
import GTMDetail from "../pages/case-studies/gtm-detail";

// Blog Pages
import BlogIndex from "../pages/blog/index";
import BlogArticle from "../pages/blog/article";

// Utility Pages
import LetsBuildPage from "../pages/lets-build/lets-build";
import SearchPage from "../pages/search/search";
import PrivacyPolicy from "../pages/privacy-policy/privacy-policy";
import TermsConditions from "../pages/terms-conditions/terms-conditions";
import TermsService from "../pages/terms-service/terms-service";

// =============================================================================
// ROUTE CONFIGURATION
// =============================================================================

/**
 * MainRoutes Component
 * 
 * Defines all application routes with their corresponding components.
 * Routes are organized by category for better maintainability.
 * 
 * @returns {JSX.Element} Complete routing structure
 */
const MainRoutes = () => (
  <Routes>
    {/* ========================================================================
        CORE PAGES
        ======================================================================== */}
    
    {/* Homepage - Main landing page */}
    <Route path="/" element={<Home />} />
    
    {/* About Us - Team and company information */}
    <Route path="/about-us" element={<About />} />
    
    {/* Contact - Contact form and information */}
    <Route path="/contact" element={<ContactPage />} />
    
    {/* ========================================================================
        SERVICE PAGES
        ======================================================================== */}
    
    {/* Services Overview - All services listing */}
    <Route path="/services" element={<ServicesOverview />} />
    
    {/* Individual Service Pages */}
    <Route path="/services/seo" element={<SEOServices />} />
    <Route path="/services/meta-ads" element={<MetaAdsPage />} />
    <Route path="/services/website-growth" element={<WebsiteGrowthPage />} />
    <Route path="/services/performance-marketing" element={<PerformanceMarketing />} />
    <Route path="/services/content-strategy" element={<ContentStrategy />} />
    <Route path="/services/gtm" element={<GTMPage />} />
    <Route path="/services-overview/website-development" element={<WebsiteDevelopment />} />
    <Route path="/services/app-development" element={<AppDevelopment />} />
    
    {/* ========================================================================
        CASE STUDIES PAGES
        ======================================================================== */}
    
    {/* Case Studies Overview */}
    <Route path="/case-studies" element={<CaseStudiesIndex />} />
    
    {/* Individual Case Study Pages - Dynamic based on serviceKey */}
    <Route path="/case-studies/seo" element={<ServiceCase serviceKey="seo" />} />
    <Route path="/case-studies/performance-marketing" element={<ServiceCase serviceKey="performance-marketing" />} />
    <Route path="/case-studies/website-development" element={<ServiceCase serviceKey="website-development" />} />
    <Route path="/case-studies/app-development" element={<ServiceCase serviceKey="app-development" />} />
    <Route path="/case-studies/content-strategy" element={<ServiceCase serviceKey="content-strategy" />} />
    <Route path="/case-studies/gtm" element={<GTMDetail />} />
    <Route path="/case-studies/website-growth" element={<ServiceCase serviceKey="website-growth" />} />
    
    {/* ========================================================================
        BLOG PAGES
        ======================================================================== */}
    
    {/* Blog Overview */}
    <Route path="/blog" element={<BlogIndex />} />
    
    {/* Individual Blog Articles - Dynamic based on slug */}
    <Route path="/blog/:slug" element={<BlogArticle />} />
    
    {/* ========================================================================
        UTILITY PAGES
        ======================================================================== */}
    
    {/* Let's Build - Project initiation page */}
    <Route path="/lets-build" element={<LetsBuildPage />} />
    
    {/* Search - Site search functionality */}
    <Route path="/search" element={<SearchPage />} />
    
    {/* Legal Pages */}
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-conditions" element={<TermsConditions />} />
    <Route path="/terms-service" element={<TermsService />} />
    
    {/* ========================================================================
        ERROR HANDLING
        ======================================================================== */}
    
    {/* 404 - Catch-all for undefined routes */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default MainRoutes;