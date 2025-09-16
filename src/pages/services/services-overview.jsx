import React from 'react';
import { Helmet } from 'react-helmet-async';
import './services-overview.css';
import { 
  Search, 
  TrendingUp, 
  Globe, 
  Zap, 
  ArrowRight, 
  CheckCircle,
  Monitor,
  Smartphone,
  Target,
  Users,
  BarChart3,
  FileText,
  Code
} from 'lucide-react';
import ContactForm from '../../components/contact-form/ContactForm';
import RotatingText from '../../components/rotating-text/text';
import MagicBento from '../../components/magic-bento/bento';

const ServicesOverview = () => {
  const services = [
    {
      icon: <Search size={32} />,
      title: "SEO Services",
      description: "Comprehensive search engine optimization that drives organic traffic and sustainable growth",
      features: ["Technical SEO", "On-Page Optimization", "Content Strategy", "Local SEO"],
      path: "/services/seo",
      color: "linear-gradient(135deg, #6a5af1, #a855f7)"
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Performance Marketing",
      description: "Results-driven campaigns across PPC, social, programmatic, affiliates, email & CRO",
      features: ["PPC & Social Ads", "Programmatic & Display", "Affiliate & Email", "Analytics & Reporting"],
      path: "/services/performance-marketing",
      color: "linear-gradient(135deg, #ef4444, #dc2626)"
    },
    {
      icon: <FileText size={32} />,
      title: "Content Strategy",
      description: "Research-backed content planning and creation that engages and converts",
      features: ["SEO Content", "Editorial Calendar", "Website Copy", "Blogs & Social"],
      path: "/services/content-strategy",
      color: "linear-gradient(135deg, #8b5cf6, #6d28d9)"
    },
    {
      icon: <Code size={32} />,
      title: "App Development",
      description: "Powerful, scalable mobile and web apps that enhance engagement and efficiency",
      features: ["iOS & Android", "Cross-Platform", "Web Apps (PWA)", "Maintenance & Support"],
      path: "/services/app-development",
      color: "linear-gradient(135deg, #16a34a, #15803d)"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Meta Ads",
      description: "Strategic paid advertising campaigns that generate qualified leads and drive conversions",
      features: ["Lead Generation", "Brand Awareness", "Conversion Optimization", "Remarketing"],
      path: "/services/meta-ads",
      color: "linear-gradient(135deg, #06b6d4, #0891b2)"
    },
    {
      icon: <Globe size={32} />,
      title: "Website Development",
      description: "Custom websites and web applications that transform your business online presence",
      features: ["Custom Development", "E-commerce Solutions", "CMS Development", "Mobile Optimization"],
      path: "/services-overview/website-development",
      color: "linear-gradient(135deg, #10b981, #059669)"
    },
    {
      icon: <Zap size={32} />,
      title: "Website Growth Systems",
      description: "Data-driven strategies to optimize your website performance and user experience",
      features: ["Performance Optimization", "User Experience", "Conversion Rate Optimization", "Analytics"],
      path: "/services/website-growth",
      color: "linear-gradient(135deg, #f59e0b, #d97706)"
    },
    {
      icon: <Target size={32} />,
      title: "GTM Strategy",
      description: "Research, positioning, pricing, channels, launch, sales enablement, analytics",
      features: ["Market Research", "Positioning", "Pricing", "Launch Campaigns"],
      path: "/services/gtm",
      color: "linear-gradient(135deg, #9333ea, #7e22ce)"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Monitor size={24} />,
      title: "Expert Team",
      description: "Experienced professionals with proven track records"
    },
    {
      icon: <Target size={24} />,
      title: "Results-Driven",
      description: "Focus on measurable outcomes and ROI"
    },
    {
      icon: <Users size={24} />,
      title: "Client-Centric",
      description: "Tailored solutions for your specific business needs"
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Data-First Approach",
      description: "Strategic decisions based on analytics and insights"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Digital Marketing Services | Web Development, SEO & Growth Marketing – Socialsect</title>
        <meta name="description" content="Comprehensive digital marketing services including web development, SEO, app development, performance marketing, content strategy, and GTM. Your one-stop solution for online success." />
        <meta name="keywords" content="digital marketing services, web development, SEO services, app development, performance marketing, content strategy, go-to-market strategy, digital growth, online marketing" />
        <link rel="canonical" href="https://goSocialsect.com/services" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/services" />
        <meta property="og:title" content="Digital Marketing Services | Web Development, SEO & Growth Marketing – Socialsect" />
        <meta property="og:description" content="Comprehensive digital marketing services including web development, SEO, app development, performance marketing, content strategy, and GTM." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/services" />
        <meta property="twitter:title" content="Digital Marketing Services | Web Development, SEO & Growth Marketing – Socialsect" />
        <meta property="twitter:description" content="Comprehensive digital marketing services including web development, SEO, app development, performance marketing, content strategy, and GTM." />
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
                "@id": "https://goSocialsect.com/services#service",
                "name": "Digital Marketing Services",
                "description": "Comprehensive digital marketing services including web development, SEO, app development, performance marketing, content strategy, and GTM. Your one-stop solution for online success.",
                "provider": {
                  "@id": "https://goSocialsect.com/#organization"
                },
                "serviceType": "Digital Marketing",
                "areaServed": "Worldwide",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Digital Marketing Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Web Development Services",
                        "description": "Custom web development services for businesses of all sizes"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "SEO Services",
                        "description": "Search engine optimization to improve rankings and organic traffic"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "App Development Services",
                        "description": "Mobile and web app development for iOS, Android, and hybrid platforms"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Performance Marketing Services",
                        "description": "ROI-driven digital advertising across Meta, Google, and LinkedIn"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Content Strategy Services",
                        "description": "Content marketing and strategy to boost brand authority and engagement"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Go-to-Market Strategy Services",
                        "description": "GTM strategy and market research for business launches"
                      }
                    }
                  ]
                }
              },
              {
                "@type": "WebPage",
                "@id": "https://goSocialsect.com/services#webpage",
                "url": "https://goSocialsect.com/services",
                "name": "Digital Marketing Services | Web Development, SEO & Growth Marketing – Socialsect",
                "description": "Comprehensive digital marketing services including web development, SEO, app development, performance marketing, content strategy, and GTM.",
                "isPartOf": {
                  "@id": "https://goSocialsect.com/#website"
                },
                "about": {
                  "@id": "https://goSocialsect.com/services#service"
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
                    }
                  ]
                }
              }
            ]
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <h1 className="services-hero-title">
            Our <span className="highlight">Services</span>
          </h1>
          <p className="services-hero-subtitle">
            Comprehensive digital solutions designed to drive your business growth and success
          </p>
          
          <div className="services-stats-grid">
            <div className="services-stat-item cursor-target">
              <div className="services-stat-number">500+</div>
              <div className="services-stat-label">Happy Clients</div>
            </div>
            <div className="services-stat-item cursor-target">
              <div className="services-stat-number">1000+</div>
              <div className="services-stat-label">Projects Completed</div>
            </div>
            <div className="services-stat-item cursor-target">
              <div className="services-stat-number">98%</div>
              <div className="services-stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-overview">
        <div className="services-section-header">
          <h2>What We Offer</h2>
          <p>End-to-end digital solutions that transform your business</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card cursor-target">
              <div className="service-icon" style={{ background: service.color }}>
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <CheckCircle size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={service.path} className="service-cta cursor-target">
                Learn More
                <ArrowRight size={18} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="services-why-choose">
        <div className="services-section-header">
          <h2>Why Choose Socialsect?</h2>
          <p>We combine expertise, innovation, and results to deliver exceptional value</p>
        </div>
        
        <div className="why-choose-grid">
          {whyChooseUs.map((item, index) => (
            <div key={index} className="why-choose-item cursor-target">
              <div className="why-choose-icon">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Bento Section */}
      <section className="services-bento-section">
        <div className="services-bento-container">
          <div className="services-bento-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>
              Let's discuss how our services can help you achieve your digital goals and drive real business growth.
            </p>
            <div className="services-bento-features">
              <div className="services-bento-feature">
                <CheckCircle size={20} />
                <span>Free Consultation</span>
              </div>
              <div className="services-bento-feature">
                <CheckCircle size={20} />
                <span>Custom Strategy</span>
              </div>
              <div className="services-bento-feature">
                <CheckCircle size={20} />
                <span>Ongoing Support</span>
              </div>
              <div className="services-bento-feature">
                <CheckCircle size={20} />
                <span>Measurable Results</span>
              </div>
            </div>
            <a href="/lets-build" className="services-bento-cta cursor-target">
              Get Started Today
            </a>
          </div>
          <div className="services-bento-visual cursor-target">
            <MagicBento 
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={15}
              glowColor="132, 0, 255"
            />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <div id="contact">
        <ContactForm />
      </div>

      {/* Bottom CTA */}
      <section className="services-bottom-cta">
        <div className="services-cta-content">
          <h2>Let's Build Something Amazing Together</h2>
          <p>Your success is our mission. Contact us today to start your digital transformation journey.</p>
          <div className="services-cta-buttons">
            <a href="/lets-build" className="services-cta-primary cursor-target">
              Start Your Project
              <ArrowRight size={20} />
            </a>
            <a href="/about-us" className="services-cta-secondary cursor-target">
              Learn More About Us
            </a>
          </div>
        </div>
      </section>

      {/* Rotating Text */}
      <div className="services-solution-container">
        <span className="services-solution-text">Your One Stop Solution for</span>
        <RotatingText
          texts={["Digital Growth", "Online Success", "Business Transformation", "Digital Marketing", "Web Development", "SEO Excellence"]}
          mainClassName="services-rotating-text"
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
    </>
  );
};

export default ServicesOverview;
