import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './home.css';
import { Code, Search, Smartphone, Calendar, BarChart2, FileText, Tag, ArrowRight, Users, CheckCircle, Target, Zap, TrendingUp, Globe, Monitor, Award, Clock, Shield } from 'lucide-react';
import About from '../../components/about/about';
import LogoLoop from "../../components/logo-loop/loop"
import MagicBento from '../../components/magic-bento/bento'
import CircularGallery from '../../components/circular-gallery/circular';
import ContactForm from '../../components/contact-form/ContactForm';
import RotatingText from '../../components/rotating-text/text';
import Testimonials from '../../components/testimonials/testimonials';

const Home = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Socialsect - Digital Growth Partner | Web Development, SEO & Digital Strategy</title>
        <meta name="description" content="Your growth partner in web development, SEO, and digital strategy. We build systems that self-correct for founders with too much at stake. Expert web development, SEO, app development, and performance marketing services." />
        <meta name="keywords" content="digital marketing agency, web development, SEO services, app development, performance marketing, content strategy, go-to-market strategy, digital growth, business growth, online success" />
        <link rel="canonical" href="https://goSocialsect.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/" />
        <meta property="og:title" content="Socialsect - Digital Growth Partner | Web Development, SEO & Digital Strategy" />
        <meta property="og:description" content="Your growth partner in web development, SEO, and digital strategy. We build systems that self-correct for founders with too much at stake." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/" />
        <meta property="twitter:title" content="Socialsect - Digital Growth Partner | Web Development, SEO & Digital Strategy" />
        <meta property="twitter:description" content="Your growth partner in web development, SEO, and digital strategy. We build systems that self-correct for founders with too much at stake." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://goSocialsect.com/#organization",
                "name": "Socialsect",
                "url": "https://goSocialsect.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://goSocialsect.com/purplelogo.png",
                  "width": 200,
                  "height": 200
                },
                "description": "Digital growth partner specializing in web development, SEO, app development, and digital strategy. We build systems that self-correct for founders with too much at stake.",
                "foundingDate": "2020",
                "founders": [
                  {
                    "@type": "Person",
                    "name": "Rayansh Singh"
                  }
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "US"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "url": "https://goSocialsect.com/contact"
                },
                "sameAs": [
                  "https://goSocialsect.com",
                  "https://goSocialsect.com/about-us",
                  "https://goSocialsect.com/services"
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://goSocialsect.com/#website",
                "url": "https://goSocialsect.com",
                "name": "Socialsect - Digital Growth Partner",
                "description": "Your growth partner in web development, SEO, and digital strategy. We build systems that self-correct for founders with too much at stake.",
                "publisher": {
                  "@id": "https://goSocialsect.com/#organization"
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://goSocialsect.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "WebPage",
                "@id": "https://goSocialsect.com/#webpage",
                "url": "https://goSocialsect.com",
                "name": "Socialsect - Digital Growth Partner | Web Development, SEO & Digital Strategy",
                "isPartOf": {
                  "@id": "https://goSocialsect.com/#website"
                },
                "about": {
                  "@id": "https://goSocialsect.com/#organization"
                },
                "description": "Your growth partner in web development, SEO, and digital strategy. We build systems that self-correct for founders with too much at stake.",
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://goSocialsect.com"
                    }
                  ]
                }
              },
              {
                "@type": "Service",
                "name": "Web Development Services",
                "description": "Custom web development services for businesses of all sizes. We build scalable, user-friendly, and growth-focused websites.",
                "provider": {
                  "@id": "https://goSocialsect.com/#organization"
                },
                "serviceType": "Web Development",
                "areaServed": "Worldwide"
              },
              {
                "@type": "Service",
                "name": "SEO Services",
                "description": "Comprehensive SEO services including technical SEO, local SEO, and enterprise SEO to improve search rankings and organic traffic.",
                "provider": {
                  "@id": "https://goSocialsect.com/#organization"
                },
                "serviceType": "Search Engine Optimization",
                "areaServed": "Worldwide"
              },
              {
                "@type": "Service",
                "name": "App Development Services",
                "description": "Mobile and web app development services for iOS, Android, and hybrid platforms. We create custom apps designed for performance and scalability.",
                "provider": {
                  "@id": "https://goSocialsect.com/#organization"
                },
                "serviceType": "App Development",
                "areaServed": "Worldwide"
              },
              {
                "@type": "Service",
                "name": "Performance Marketing Services",
                "description": "ROI-driven digital advertising services across Meta, Google, and LinkedIn. We run data-driven campaigns that convert clicks into customers.",
                "provider": {
                  "@id": "https://goSocialsect.com/#organization"
                },
                "serviceType": "Digital Marketing",
                "areaServed": "Worldwide"
              }
            ]
          })}
        </script>
      </Helmet>
      <section className="home-hero">
      {/* <div className="home-hero-content"> */}
        <h1 className="home-hero-title">
        Your Growth Partner in <span className='home-highlight'>Web</span>, <span className='home-highlight'>SEO</span>, and <span className='home-highlight'>Digital Strategy</span>
        </h1>
        <p className="home-hero-subtitle">
        A deterministic operating system for founders with too much at stake. <br />
        We don’t “do” marketing. We build systems that self-correct.   </p>
        
        <div className="home-hero-pills">
          <div className="home-service-item">
            <Code size={20} className="home-service-icon" />
            <span>Web Development</span>
          </div>
          <div className="home-service-item">
            <Search size={20} className="home-service-icon" />
            <span>SEO</span>
          </div>
          <div className="home-service-item">
            <Smartphone size={20} className="home-service-icon" />
            <span>App Development</span>
          </div>
          <div className="home-service-item">
            <BarChart2 size={20} className="home-service-icon" />
            <span>Performance Marketing</span>
          </div>
          <div className="home-service-item">
            <FileText size={20} className="home-service-icon" />
            <span>Content Strategy</span>
          </div>
          <div className="home-service-item">
            <Tag size={20} className="home-service-icon" />
            <span>GTM</span>
          </div>
        </div>

        <div className="home-cta-buttons">
          <button className="home-cta-button cursor-target" onClick={() => window.location.href = "/about-us"}>About Us</button>
          <button className="home-cta-button cursor-target" onClick={() => window.location.href = "/lets-build"}>Get a Growth Plan</button>
        </div>
      </section>

      {/* The Problem Section - What we solve */}
      <section className="home-problem-section">
        <div className="home-problem-container">
          <div className="home-problem-content">
            <h2>The Problem We Solve</h2>
            <p>Most businesses struggle with disconnected digital efforts that don't drive real growth. You have a website, some ads, maybe some content, but they're not working together to build your business.</p>
            <div className="home-problem-stats">
              <div className="home-problem-stat">
                <span className="stat-number">73%</span>
                <span className="stat-label">of marketing efforts fail to connect to revenue</span>
              </div>
              <div className="home-problem-stat">
                <span className="stat-number">$2.3M</span>
                <span className="stat-label">average wasted ad spend per company annually</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="home-stats-section">
        <div className="home-stats-container">
          <div className="home-stats-header">
            <h2>Trusted by Industry Leaders</h2>
            <p>Our track record speaks for itself</p>
          </div>
          <div className="home-stats-grid">
            <div className="home-stat-item cursor-target">
              <div className="home-stat-icon">
                <Users size={32} />
              </div>
              <div className="home-stat-number">450+</div>
              <div className="home-stat-label">Happy Clients</div>
            </div>
            <div className="home-stat-item cursor-target">
              <div className="home-stat-icon">
                <Award size={32} />
              </div>
              <div className="home-stat-number">1000+</div>
              <div className="home-stat-label">Projects Completed</div>
            </div>
            <div className="home-stat-item cursor-target">
              <div className="home-stat-icon">
                <TrendingUp size={32} />
              </div>
              <div className="home-stat-number">100%</div>
              <div className="home-stat-label">Client Satisfaction</div>
            </div>
            <div className="home-stat-item cursor-target">
              <div className="home-stat-icon">
                <Clock size={32} />
              </div>
              <div className="home-stat-number">10+</div>
              <div className="home-stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
      <div className="full-width-wrapper">
        <About />
      </div>

      {/* The Process - How we work */}
      <section className="home-process-section">
        <div className="home-process-container">
          <div className="home-process-header">
            <h2>Our Proven Process</h2>
            <p>We don't just execute tactics—we build systems that compound over time</p>
          </div>
          
          <div className="home-process-steps">
            <div className="home-process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Discover & Define</h3>
                <p>We start by understanding your business DNA, target audience, and growth goals. No assumptions, just data.</p>
              </div>
            </div>
            
            <div className="home-process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Build & Test</h3>
                <p>We create the minimum viable system that proves your concept works, then optimize based on real results.</p>
              </div>
            </div>
            
            <div className="home-process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Scale & Optimize</h3>
                <p>Once we have proof of concept, we scale what works and continuously optimize for better performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="home-services-overview">
        <div className="home-services-container">
          <div className="home-services-header">
            <h2>Our Services</h2>
            <p>Comprehensive digital solutions designed to drive your business growth</p>
          </div>
          
          <div className="home-services-grid">
            <div className="home-service-card cursor-target">
              <div className="home-service-card-icon" style={{ background: 'linear-gradient(135deg, #6a5af1, #a855f7)' }}>
                <Search size={32} />
              </div>
              <h3>SEO Services</h3>
              <p>Comprehensive search engine optimization that drives organic traffic and sustainable growth</p>
              <ul className="home-service-features">
                <li><CheckCircle size={16} />Technical SEO</li>
                <li><CheckCircle size={16} />On-Page Optimization</li>
                <li><CheckCircle size={16} />Content Strategy</li>
                <li><CheckCircle size={16} />Local SEO</li>
              </ul>
              <a href="/services/seo" className="home-service-cta cursor-target">
                Learn More <ArrowRight size={18} />
              </a>
            </div>

            <div className="home-service-card cursor-target">
              <div className="home-service-card-icon" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                <BarChart2 size={32} />
              </div>
              <h3>Performance Marketing</h3>
              <p>Results-driven campaigns across PPC, social, programmatic, affiliates, email & CRO</p>
              <ul className="home-service-features">
                <li><CheckCircle size={16} />PPC & Social Ads</li>
                <li><CheckCircle size={16} />Programmatic & Display</li>
                <li><CheckCircle size={16} />Affiliate & Email</li>
                <li><CheckCircle size={16} />Analytics & Reporting</li>
              </ul>
              <a href="/services/performance-marketing" className="home-service-cta cursor-target">
                Learn More <ArrowRight size={18} />
              </a>
            </div>

            <div className="home-service-card cursor-target">
              <div className="home-service-card-icon" style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
                <Code size={32} />
              </div>
              <h3>App Development</h3>
              <p>Powerful, scalable mobile and web apps that enhance engagement and efficiency</p>
              <ul className="home-service-features">
                <li><CheckCircle size={16} />iOS & Android</li>
                <li><CheckCircle size={16} />Cross-Platform</li>
                <li><CheckCircle size={16} />Web Apps (PWA)</li>
                <li><CheckCircle size={16} />Maintenance & Support</li>
              </ul>
              <a href="/services/app-development" className="home-service-cta cursor-target">
                Learn More <ArrowRight size={18} />
              </a>
            </div>

            <div className="home-service-card cursor-target">
              <div className="home-service-card-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                <Globe size={32} />
              </div>
              <h3>Website Development</h3>
              <p>Custom websites and web applications that transform your business online presence</p>
              <ul className="home-service-features">
                <li><CheckCircle size={16} />Custom Development</li>
                <li><CheckCircle size={16} />E-commerce Solutions</li>
                <li><CheckCircle size={16} />CMS Development</li>
                <li><CheckCircle size={16} />Mobile Optimization</li>
              </ul>
              <a href="/services/website-development" className="home-service-cta cursor-target">
                Learn More <ArrowRight size={18} />
              </a>
            </div>

            <div className="home-service-card cursor-target">
              <div className="home-service-card-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
                <FileText size={32} />
              </div>
              <h3>Content Strategy</h3>
              <p>Research-backed content planning and creation that engages and converts</p>
              <ul className="home-service-features">
                <li><CheckCircle size={16} />SEO Content</li>
                <li><CheckCircle size={16} />Editorial Calendar</li>
                <li><CheckCircle size={16} />Website Copy</li>
                <li><CheckCircle size={16} />Blogs & Social</li>
              </ul>
              <a href="/services/content-strategy" className="home-service-cta cursor-target">
                Learn More <ArrowRight size={18} />
              </a>
            </div>

            <div className="home-service-card cursor-target">
              <div className="home-service-card-icon" style={{ background: 'linear-gradient(135deg, #9333ea, #7e22ce)' }}>
                <Target size={32} />
              </div>
              <h3>GTM Strategy</h3>
              <p>Research, positioning, pricing, channels, launch, sales enablement, analytics</p>
              <ul className="home-service-features">
                <li><CheckCircle size={16} />Market Research</li>
                <li><CheckCircle size={16} />Positioning</li>
                <li><CheckCircle size={16} />Pricing</li>
                <li><CheckCircle size={16} />Launch Campaigns</li>
              </ul>
              <a href="/services/gtm" className="home-service-cta cursor-target">
                Learn More <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="home-why-choose">
        <div className="home-why-choose-container">
          <div className="home-why-choose-header">
            <h2>Why Choose Socialsect?</h2>
            <p>We combine expertise, innovation, and results to deliver exceptional value</p>
          </div>
          
          <div className="home-why-choose-grid">
            <div className="home-why-choose-item cursor-target">
              <div className="home-why-choose-icon">
                <Monitor size={32} />
              </div>
              <h3>Expert Team</h3>
              <p>Experienced professionals with proven track records in digital marketing and web development</p>
            </div>
            
            <div className="home-why-choose-item cursor-target">
              <div className="home-why-choose-icon">
                <Target size={32} />
              </div>
              <h3>Results-Driven</h3>
              <p>Focus on measurable outcomes and ROI. Every strategy is designed to deliver tangible business results</p>
            </div>
            
            <div className="home-why-choose-item cursor-target">
              <div className="home-why-choose-icon">
                <Users size={32} />
              </div>
              <h3>Client-Centric</h3>
              <p>Tailored solutions for your specific business needs. We adapt our approach to fit your goals</p>
            </div>
            
            <div className="home-why-choose-item cursor-target">
              <div className="home-why-choose-icon">
                <BarChart2 size={32} />
              </div>
              <h3>Data-First Approach</h3>
              <p>Strategic decisions based on analytics and insights. We let data guide our optimization strategies</p>
            </div>
            
            <div className="home-why-choose-item cursor-target">
              <div className="home-why-choose-icon">
                <Zap size={32} />
              </div>
              <h3>Fast Execution</h3>
              <p>Quick turnaround times without compromising quality. We deliver results when you need them</p>
            </div>
            
            <div className="home-why-choose-item cursor-target">
              <div className="home-why-choose-icon">
                <Shield size={32} />
              </div>
              <h3>Transparent Process</h3>
              <p>Clear communication and regular updates. You'll always know what we're working on and why</p>
            </div>
          </div>
        </div>
      </section>

      <div className="home-bento-section" style={{ padding: '4rem 8%', backgroundColor: '#f8f9fa' ,fontFamily:"Satoshi"}}> 
        <div className="home-bento-container" style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '35% 65%', 
          gap: isMobile ? '1.25rem' : '2rem', 
          maxWidth: '1600px', 
          margin: '0 auto',
          alignItems: 'center'
        }}>
          <div className="home-bento-content">
            <h2 style={{ 
              fontSize: '1.6rem', 
              fontWeight: '700', 
              color: '#060010', 
              marginBottom: '0.8rem',
              lineHeight: '1.2'
            }}>         <b>    How we make outcomes match intent </b>
            </h2>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#4a4a4a', 
              marginBottom: '1rem',
              lineHeight: '1.55'
            }}>

             We start by codifying your Conceptual DNA, then ship the smallest thing that proves it. Everything after that is a loop of evidence and scaling, zero vanity work. </p>
            <div style={{ marginTop: '1.5rem' }}>
              <a className="cursor-target"  href="https://calendly.com/rayansh-gosocialsect/30min" target="_blank" style={{
                fontFamily:"Satoshi",
                backgroundColor: '#8400ff',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.6rem',
                borderRadius: '30px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(132, 0, 255, 0.2)'
                ,textDecoration:"none"
              }} >
              Start with the DNA Session
              </a>
            </div>
          </div>
          <div className="home-bento-grid" style={{ 
            borderRadius: isMobile ? '12px' : '16px', 
            overflow: 'hidden',
            boxShadow: isMobile ? '0 6px 18px rgba(0,0,0,0.08)' : '0 8px 24px rgba(0,0,0,0.08)'
          }}>
            <MagicBento 
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={isMobile ? 200 : 240}
              particleCount={isMobile ? 8 : 10}
              glowColor="132, 0, 255"
            />
          </div>
        </div>
      </div>
      <div style={{ margin: '8rem 0 2rem', textAlign: 'center' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#000',
          marginBottom: '1rem',
          background: 'linear-gradient(90deg, #6a5af1, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          Meet Our Founder - Rayansh
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Get to know the visionary behind our success story
        </p>
      </div>
      <div style={{ height: isMobile ? '400px' : '600px', position: 'relative', margin: isMobile ? '1.5rem 0 3.5rem' : '2rem 0 6rem' }}>
        <CircularGallery 
          videoUrls={[
            'https://youtube.com/shorts/5vimqTSU9lg?si=oCrzzHG7nQoYs_A4',
            'https://youtube.com/shorts/LhKsBZ47p3E?si=fFYPl8q7XVzHBur6',
            'https://youtube.com/shorts/Le2OjouYhe0?si=FzWzMwhfTuzSOhQx',
            'https://www.youtube.com/shorts/iOok2XGBGw4',
            'https://youtube.com/shorts/6p1J7lq7Ido?si=bWGGXbe9uoNJSN-f',
            'https://youtube.com/shorts/q879lZo4kXM?si=tD9p3U_1PjLMrd8s'
          ]}
          bend={isMobile ? 1.5 : 3} 
          textColor="#ffffff" 
          borderRadius={isMobile ? 0.03 : 0.05} 
          scrollEase={isMobile ? 0.04 : 0.02}
        />
      </div>
      <Testimonials />
      <ContactForm />
      <div className="home-solution-container">
        <span className="home-solution-text">Your One Stop Solution for</span>
        <RotatingText
          texts={["Growth & Marketing","Web Development","Brand Strategy","UI/UX Design","Digital Transformation","GTM","SEO"]}
          mainClassName="home-rotating-text"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </div>
    </Fragment>
  );
};

export default Home;
