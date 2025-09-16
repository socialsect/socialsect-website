import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, TrendingUp, BarChart3, Target, Zap, Globe, Database, Link, FileText, Monitor, CheckCircle, ArrowRight } from 'lucide-react';
import './seo.css';
import ContactForm from '../../components/contact-form/ContactForm';
import TargetCursor from '../../components/targetcursor/cursor';

const SEO = () => {
  const seoServices = [
    {
      icon: <Search size={32} />,
      title: "On-Page SEO",
      description: "Keyword mapping, metadata, headers, internal links, and SEO content optimization",
      features: ["Keyword Research", "Meta Tags", "Header Structure", "Internal Linking"],
      color: "linear-gradient(135deg, #6a5af1, #a855f7)"
    },
    {
      icon: <Link size={32} />,
      title: "Off-Page SEO",
      description: "White-hat link building, digital PR, citations, and brand mentions",
      features: ["Link Building", "Digital PR", "Local Citations", "Brand Mentions"],
      color: "linear-gradient(135deg, #ef4444, #dc2626)"
    },
    {
      icon: <Monitor size={32} />,
      title: "Technical SEO",
      description: "CWV, crawlability, indexation, schema, sitemaps, and site architecture",
      features: ["Core Web Vitals", "Crawlability", "Schema Markup", "Site Architecture"],
      color: "linear-gradient(135deg, #8b5cf6, #6d28d9)"
    },
    {
      icon: <Target size={32} />,
      title: "Local SEO",
      description: "GBP optimization, NAP consistency, reviews, and map pack visibility",
      features: ["Google Business Profile", "NAP Consistency", "Review Management", "Map Pack"],
      color: "linear-gradient(135deg, #16a34a, #15803d)"
    },
    {
      icon: <BarChart3 size={32} />,
      title: "E-commerce SEO",
      description: "Product/category SEO, rich snippets, filters, and internal search",
      features: ["Product Optimization", "Rich Snippets", "Category SEO", "Internal Search"],
      color: "linear-gradient(135deg, #06b6d4, #0891b2)"
    },
    {
      icon: <FileText size={32} />,
      title: "Content Strategy",
      description: "Editorial calendar, search intent clusters, and conversion copy",
      features: ["Content Calendar", "Search Intent", "Conversion Copy", "Topic Clusters"],
      color: "linear-gradient(135deg, #10b981, #059669)"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Analytics & Reporting",
      description: "GA4, GSC, pixels, dashboards, and KPI-driven reviews",
      features: ["GA4 Setup", "GSC Monitoring", "Custom Dashboards", "KPI Tracking"],
      color: "linear-gradient(135deg, #f59e0b, #d97706)"
    },
    {
      icon: <Globe size={32} />,
      title: "International SEO",
      description: "Hreflang, localization, and multi-region targeting",
      features: ["Hreflang Tags", "Localization", "Multi-Region", "Language Targeting"],
      color: "linear-gradient(135deg, #9333ea, #7e22ce)"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Search size={24} />,
      title: "Proven Results",
      description: "Track record of improving rankings and driving organic traffic"
    },
    {
      icon: <Target size={24} />,
      title: "White-Hat Approach",
      description: "Ethical SEO practices that build long-term authority"
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Data-Driven",
      description: "Strategic decisions based on comprehensive analytics"
    },
    {
      icon: <Monitor size={24} />,
      title: "Technical Excellence",
      description: "Expert-level technical SEO implementation"
    }
  ];

  return (
    <>
      <Helmet>
        <title>SEO Services for Business Growth | Socialsect – Data-Driven SEO Agency</title>
        <meta name="description" content="Rank higher, attract quality leads, and boost traffic with Socialsect's SEO services. From local to enterprise SEO, we deliver measurable growth through proven strategies." />
        <meta name="keywords" content="SEO services, SEO agency, technical SEO, local SEO, enterprise SEO, search engine optimization, organic traffic, keyword research, on-page SEO, off-page SEO" />
        <link rel="canonical" href="https://goSocialsect.com/services/seo" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/services/seo" />
        <meta property="og:title" content="SEO Services for Business Growth | Socialsect – Data-Driven SEO Agency" />
        <meta property="og:description" content="Rank higher, attract quality leads, and boost traffic with Socialsect's SEO services. From local to enterprise SEO, we deliver measurable growth through proven strategies." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/services/seo" />
        <meta property="twitter:title" content="SEO Services for Business Growth | Socialsect – Data-Driven SEO Agency" />
        <meta property="twitter:description" content="Rank higher, attract quality leads, and boost traffic with Socialsect's SEO services. From local to enterprise SEO, we deliver measurable growth through proven strategies." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": "https://goSocialsect.com/services/seo#service",
                "name": "SEO Services for Business Growth",
                "description": "Rank higher, attract quality leads, and boost traffic with Socialsect's SEO services. From local to enterprise SEO, we deliver measurable growth through proven strategies.",
                "provider": {
                  "@id": "https://goSocialsect.com/#organization"
                },
                "serviceType": "Search Engine Optimization",
                "areaServed": "Worldwide",
                "offers": {
                  "@type": "Offer",
                  "description": "Comprehensive SEO services including technical SEO, local SEO, and enterprise SEO",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "SEO Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Technical SEO",
                        "description": "Website optimization for search engines including site speed, mobile-friendliness, and crawlability"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Local SEO",
                        "description": "Local search optimization to improve visibility in local search results"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Enterprise SEO",
                        "description": "Large-scale SEO strategies for enterprise-level businesses"
                      }
                    }
                  ]
                }
              },
              {
                "@type": "WebPage",
                "@id": "https://goSocialsect.com/services/seo#webpage",
                "url": "https://goSocialsect.com/services/seo",
                "name": "SEO Services for Business Growth | Socialsect – Data-Driven SEO Agency",
                "description": "Rank higher, attract quality leads, and boost traffic with Socialsect's SEO services. From local to enterprise SEO, we deliver measurable growth through proven strategies.",
                "isPartOf": {
                  "@id": "https://goSocialsect.com/#website"
                },
                "about": {
                  "@id": "https://goSocialsect.com/services/seo#service"
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://goSocialsect.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Services",
                      "item": "https://goSocialsect.com/services"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "SEO Services",
                      "item": "https://goSocialsect.com/services/seo"
                    }
                  ]
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <TargetCursor />
      {/* Hero Section */}
      <section className="seo-hero">
        <div className="seo-hero-content">
          <h1 className="seo-hero-title">
            SEO Services That <span className="highlight">Drive Growth</span>
          </h1>
          <p className="seo-hero-subtitle">
            Full-stack SEO across technical, on-page, off-page, and content to increase qualified traffic and conversions
          </p>
          
          <div className="seo-stats-grid">
            <div className="seo-stat-item cursor-target">
              <div className="seo-stat-number">+140%</div>
              <div className="seo-stat-label">Average Organic Growth</div>
            </div>
            <div className="seo-stat-item cursor-target">
              <div className="seo-stat-number">95%</div>
              <div className="seo-stat-label">Core Web Vitals Pass</div>
            </div>
            <div className="seo-stat-item cursor-target">
              <div className="seo-stat-number">500+</div>
              <div className="seo-stat-label">Keywords Ranked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="seo-services">
        <div className="seo-section-header">
          <h2>Our SEO Services</h2>
          <p>End-to-end SEO delivered via focused, senior execution</p>
        </div>
        
        <div className="seo-services-grid">
          {seoServices.map((service, index) => (
            <div key={index} className="seo-service-card cursor-target">
              <div className="seo-service-icon" style={{ background: service.color }}>
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="seo-service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <CheckCircle size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="seo-why-choose">
        <div className="seo-section-header">
          <h2>Why Choose Our SEO Services?</h2>
          <p>We combine expertise, innovation, and results to deliver exceptional value</p>
        </div>
        
        <div className="seo-why-choose-grid">
          {whyChooseUs.map((item, index) => (
            <div key={index} className="seo-why-choose-item cursor-target">
              <div className="seo-why-choose-icon">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="seo-process">
        <div className="seo-section-header">
          <h2>Our SEO Process</h2>
          <p>Data-driven approach that delivers measurable results</p>
        </div>
        
        <div className="seo-process-steps">
          <div className="seo-process-step">
            <div className="seo-step-number">1</div>
            <div className="seo-step-content">
              <h3>Research & Analysis</h3>
              <p>Comprehensive keyword research, competitor analysis, and technical audit to identify opportunities and challenges.</p>
            </div>
          </div>
          
          <div className="seo-process-step">
            <div className="seo-step-number">2</div>
            <div className="seo-step-content">
              <h3>Strategy Development</h3>
              <p>Custom SEO strategy tailored to your business goals, target audience, and competitive landscape.</p>
            </div>
          </div>
          
          <div className="seo-process-step">
            <div className="seo-step-number">3</div>
            <div className="seo-step-content">
              <h3>Implementation</h3>
              <p>On-page optimization, technical improvements, content creation, and off-page link building execution.</p>
            </div>
          </div>
          
          <div className="seo-process-step">
            <div className="seo-step-number">4</div>
            <div className="seo-step-content">
              <h3>Monitoring & Optimization</h3>
              <p>Continuous monitoring, reporting, and optimization to ensure sustained growth and ROI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <div id="contact">
        <ContactForm />
      </div>

      {/* Bottom CTA */}
      <section className="seo-bottom-cta">
        <div className="seo-cta-content">
          <h2>Ready to Dominate Search Results?</h2>
          <p>Get a comprehensive SEO strategy that drives real business growth</p>
          <div className="seo-cta-buttons">
            <a href="/lets-build" className="seo-cta-primary cursor-target">
              Get Your Free SEO Audit
              <ArrowRight size={20} />
            </a>
            <a href="/case-studies/seo" className="seo-cta-secondary cursor-target">
              View SEO Case Studies
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SEO;