import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './website-development.css';
import { initCardSpotlight } from './cursorEffect';
import { 
  Globe, 
  ShoppingCart, 
  FileText, 
  Code, 
  Smartphone, 
  RefreshCw, 
  Search, 
  Settings, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  Monitor,
  Database,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Clock,
  BarChart3
} from 'lucide-react';
import ContactForm from '../../components/contact-form/ContactForm';
import RotatingText from '../../components/rotating-text/text';
import MagicBento from '../../components/magic-bento/bento';
import TargetCursor from '../../components/targetcursor/cursor';
const WebsiteDevelopment = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const webDevServices = [
    {
      icon: <Globe size={24} />,
      title: "Custom Website Development",
      description: "Every business is unique, and your website should reflect that. We create custom, responsive, SEO-friendly sites with intuitive navigation and engaging visuals.",
      features: [
        "Responsive design",
        "SEO optimization",
        "Custom functionality",
        "Brand integration"
      ]
    },
    {
      icon: <ShoppingCart size={24} />,
      title: "E-commerce Website Development",
      description: "Showcase products, streamline shopping experiences, and maximize sales with secure, optimized online stores.",
      features: [
        "Shopify/WooCommerce/Magento",
        "Secure payment gateways",
        "Optimized product pages",
        "SEO for online visibility"
      ]
    },
    {
      icon: <FileText size={24} />,
      title: "CMS Development",
      description: "CMS-based websites that allow effortless content management with intuitive dashboards.",
      features: [
        "WordPress/Drupal/Joomla",
        "User-friendly admin",
        "Content workflows",
        "Multi-user access"
      ]
    },
    {
      icon: <Code size={24} />,
      title: "Web App Development & Integration",
      description: "Interactive, scalable web apps with full-stack development and integrations.",
      features: [
        "Frontend & backend development",
        "API integrations",
        "Cloud-based solutions",
        "Custom web applications"
      ]
    },
    {
      icon: <Smartphone size={24} />,
      title: "Responsive & Mobile-Optimized Websites",
      description: "Every website adapts seamlessly to any device with fast load times and easy navigation.",
      features: [
        "Mobile-first design",
        "Fast page loads",
        "Touch optimization",
        "Cross-device testing"
      ]
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Website Redesign & Optimization",
      description: "Transform outdated or underperforming websites into modern, SEO-optimized, conversion-focused platforms.",
      features: [
        "Improve page speed",
        "Better UX/UI",
        "Search engine optimization",
        "Enhanced accessibility"
      ]
    },
    {
      icon: <Search size={24} />,
      title: "SEO-Ready Website Development",
      description: "Websites built from the ground up for discoverability and rankings.",
      features: [
        "Clean, crawlable code",
        "Optimized metadata & headings",
        "Structured data",
        "Fast, mobile-friendly design"
      ]
    },
    {
      icon: <Settings size={24} />,
      title: "Website Maintenance & Support",
      description: "Ongoing support to keep your website secure, updated, and high-performing.",
      features: [
        "Security checks & updates",
        "Performance monitoring",
        "Bug fixes & enhancements",
        "Backups & recovery"
      ]
    }
  ];

  const webDevProcess = [
    {
      step: "01",
      title: "Requirement Analysis",
      description: "Understanding your business, goals, target audience, and technical requirements."
    },
    {
      step: "02",
      title: "Planning & Strategy",
      description: "Developing a sitemap, wireframes, and a project roadmap."
    },
    {
      step: "03",
      title: "Design & Development",
      description: "Crafting visually appealing, functional, and SEO-optimized websites."
    },
    {
      step: "04",
      title: "Testing & QA",
      description: "Ensuring performance, responsiveness, and security across all devices."
    },
    {
      step: "05",
      title: "Launch & Deployment",
      description: "Deploying your website live with full functionality."
    },
    {
      step: "06",
      title: "Monitoring & Optimization",
      description: "Ongoing analytics, SEO tweaks, and feature updates for continuous growth."
    }
  ];

  const webDevMetrics = [
    { metric: "Page Load Speed", value: "<2s", description: "Average loading time" },
    { metric: "Mobile Score", value: "95+", description: "Google PageSpeed score" },
    { metric: "SEO Score", value: "100/100", description: "Technical SEO optimization" },
    { metric: "Conversion Rate", value: "+120%", description: "Average improvement" }
  ];

  const industries = [
    "Real Estate Agencies",
    "Healthcare & Clinics",
    "E-commerce & Retail",
    "Startups & SaaS Businesses",
    "Educational Institutions",
    "Local Service Providers (gyms, salons, restaurants)"
  ];

  const faqs = [
    {
      question: "How long does it take to develop a website?",
      answer: "The timeline depends on the complexity and functionality required. Simple websites can take 3–6 weeks, while complex web apps may require 2–4 months."
    },
    {
      question: "Do you build SEO-optimized websites?",
      answer: "Yes, all websites from Socialsect are built with SEO best practices to ensure maximum visibility."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Absolutely. We provide website redesign services that improve performance, UX, and conversions."
    },
    {
      question: "Do you provide e-commerce website development?",
      answer: "Yes, we specialize in e-commerce platforms including Shopify, WooCommerce, Magento, and custom solutions."
    },
    {
      question: "Will my website be mobile-friendly?",
      answer: "Yes, all websites are fully responsive and optimized for mobile and tablet devices."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Initialize card spotlight effect
  useEffect(() => {
    const cleanup = initCardSpotlight();
    return () => cleanup();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Web Development Services | Custom Business Websites – Socialsect</title>
        <meta name="description" content="Build scalable, user-friendly, and growth-focused websites with Socialsect's expert web development services. From custom websites to e-commerce solutions, we craft digital experiences that drive results." />
        <meta name="keywords" content="web development services, custom web development agency, business website development, scalable websites, responsive web design, e-commerce development, CMS development" />
        <link rel="canonical" href="https://goSocialsect.com/services-overview/website-development" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/services-overview/website-development" />
        <meta property="og:title" content="Web Development Services | Custom Business Websites – Socialsect" />
        <meta property="og:description" content="Build scalable, user-friendly, and growth-focused websites with Socialsect's expert web development services. From custom websites to e-commerce solutions, we craft digital experiences that drive results." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/services-overview/website-development" />
        <meta property="twitter:title" content="Web Development Services | Custom Business Websites – Socialsect" />
        <meta property="twitter:description" content="Build scalable, user-friendly, and growth-focused websites with Socialsect's expert web development services. From custom websites to e-commerce solutions, we craft digital experiences that drive results." />
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
                "@id": "https://goSocialsect.com/services-overview/website-development#service",
                "name": "Web Development Services",
                "description": "Build scalable, user-friendly, and growth-focused websites with Socialsect's expert web development services. From custom websites to e-commerce solutions, we craft digital experiences that drive results.",
                "provider": {
                  "@id": "https://goSocialsect.com/#organization"
                },
                "serviceType": "Web Development",
                "areaServed": "Worldwide",
                "offers": {
                  "@type": "Offer",
                  "description": "Custom web development services for businesses of all sizes",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                }
              },
              {
                "@type": "WebPage",
                "@id": "https://goSocialsect.com/services-overview/website-development#webpage",
                "url": "https://goSocialsect.com/services-overview/website-development",
                "name": "Web Development Services | Custom Business Websites – Socialsect",
                "description": "Build scalable, user-friendly, and growth-focused websites with Socialsect's expert web development services. From custom websites to e-commerce solutions, we craft digital experiences that drive results.",
                "isPartOf": {
                  "@id": "https://goSocialsect.com/#website"
                },
                "about": {
                  "@id": "https://goSocialsect.com/services-overview/website-development#service"
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
                      "name": "Web Development",
                      "item": "https://goSocialsect.com/services-overview/website-development"
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
      <section className="webdev-hero">
        <div className="webdev-hero-content">
          <h1 className="webdev-hero-title">
            Website Development Services That Transform Your Business
            <br />
            – Socialsect
          </h1>
          <p className="webdev-hero-subtitle">
            In the digital age, your website is often the first impression customers have of your business. A well-designed, fast, and user-friendly website not only attracts visitors but also converts them into loyal customers. At Socialsect, we build professional websites for businesses of all sizes to strengthen online presence, enhance user experience, and drive measurable growth.
          </p>
          
          <div className="webdev-stats-grid">
            <div className="webdev-stat-item">
              <div className="webdev-stat-number">&lt;2s</div>
              <div className="webdev-stat-label">Page Load Speed</div>
            </div>
            <div className="webdev-stat-item">
              <div className="webdev-stat-number">95+</div>
              <div className="webdev-stat-label">Mobile Score</div>
            </div>
            <div className="webdev-stat-item">
              <div className="webdev-stat-number">+120%</div>
              <div className="webdev-stat-label">Conversion Rate</div>
            </div>
          </div>

          <div className="webdev-cta-buttons">
            <a href="/lets-build" className="webdev-cta-primary cursor-target">
              Start Your Project
              <ArrowRight size={20} />
            </a>
            <a href="/case-studies" className="webdev-cta-secondary cursor-target">
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="webdev-why-choose">
        <div className="webdev-section-header">
          <h2>Why Your Business Needs Professional Website Development Services</h2>
          <p>A website is more than just a digital storefront. It is a powerful tool to:</p>
        </div>
        
        <div className="webdev-benefits-grid">
          <div className="webdev-benefit-item cursor-target">
            <Search size={24} />
            <h3>Increase Online Visibility</h3>
            <p>Ensure your business is discoverable across search engines</p>
          </div>
          <div className="webdev-benefit-item cursor-target">
            <Users size={24} />
            <h3>Enhance User Experience</h3>
            <p>Design intuitive interfaces that engage and retain visitors</p>
          </div>
          <div className="webdev-benefit-item cursor-target">
            <Target size={24} />
            <h3>Boost Conversions</h3>
            <p>Optimize user journeys to drive leads, sales, and engagement</p>
          </div>
          <div className="webdev-benefit-item cursor-target">
            <Shield size={24} />
            <h3>Establish Credibility</h3>
            <p>Build trust through professional, responsive design</p>
          </div>
          <div className="webdev-benefit-item cursor-target">
            <TrendingUp size={24} />
            <h3>Support Growth</h3>
            <p>Scalable solutions that grow with your business needs</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="webdev-services">
        <div className="webdev-section-header">
          <h2>Our Website Development Services</h2>
          <p>We provide end-to-end website development services that ensure your business not only looks great online but also performs optimally.</p>
        </div>
        
        <div className="webdev-services-grid">
          {webDevServices.map((service, index) => (
            <div key={index} className="webdev-service-card cursor-target">
              <div className="webdev-service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="webdev-service-features">
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

      {/* Process Section */}
      <section className="webdev-process">
        <div className="webdev-section-header">
          <h2>Our Website Development Process</h2>
          <p>At Socialsect, we follow a structured, data-driven approach to website development:</p>
        </div>
        
        <div className="webdev-process-steps">
          {webDevProcess.map((step, index) => (
            <div key={index} className="webdev-process-step cursor-target">
              <div className="webdev-step-number">{step.step}</div>
              <div className="webdev-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section className="webdev-results">
        <div className="webdev-section-header">
          <h2>Proven Results</h2>
          <p>Data-driven outcomes that speak for themselves</p>
        </div>
        
        <div className="webdev-metrics-grid">
          {webDevMetrics.map((metric, index) => (
            <div key={index} className="webdev-metric-card cursor-target">
              <div className="webdev-metric-value">{metric.value}</div>
              <div className="webdev-metric-label">{metric.metric}</div>
              <div className="webdev-metric-description">{metric.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries Section */}
      <section className="webdev-industries">
        <div className="webdev-section-header">
          <h2>Industries We Serve</h2>
          <p>Socialsect provides custom website development services for a variety of industries</p>
        </div>
        
        <div className="webdev-industries-grid">
          {industries.map((industry, index) => (
            <div key={index} className="webdev-industry-item cursor-target">
              <CheckCircle size={20} />
              <span>{industry}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section className="webdev-feature-showcase">
        <div className="webdev-feature-decorator decorator-1"></div>
        <div className="webdev-feature-decorator decorator-2"></div>
        
        <div className="webdev-feature-container">
          <div className="webdev-feature-header">
            <h2>Powerful Features for Your Next Project</h2>
            <p>Discover how our web development services can transform your online presence with cutting-edge technology and innovative solutions.</p>
          </div>
          
          <div className="webdev-feature-grid">
            <div className="webdev-feature-card">
              <div className="webdev-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3>Responsive Design</h3>
              <p>Perfectly optimized for all devices, ensuring a seamless experience across desktops, tablets, and smartphones.</p>
              <a href="/services" className="webdev-feature-cta">
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
            
            <div className="webdev-feature-card">
              <div className="webdev-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>Modern Tech Stack</h3>
              <p>Built with the latest technologies including React, Next.js, and modern CSS for optimal performance.</p>
              <a href="/about-us" className="webdev-feature-cta">
                Our technologies
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
            
            <div className="webdev-feature-card">
              <div className="webdev-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>Fast Performance</h3>
              <p>Lightning-fast load times and smooth interactions to keep your visitors engaged and improve SEO rankings.</p>
              <a href="/case-studies" className="webdev-feature-cta">
                Performance details
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="webdev-faq">
        <div className="webdev-section-header">
          <h2>FAQs About Website Development</h2>
          <p>Everything you need to know about our website development services</p>
        </div>
        
        <div className="webdev-faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`webdev-faq-item ${openFaq === index ? 'active' : ''}`}>
              <div 
                className="webdev-faq-header cursor-target"
                onClick={() => toggleFaq(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleFaq(index)}
              >
                <h3>{faq.question}</h3>
                <div className="webdev-faq-icon">
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              <div className="webdev-faq-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Bottom CTA */}
      <section className="webdev-bottom-cta">
        <div className="webdev-cta-content">
          <h2>Get Started with Socialsect Website Development Services</h2>
          <p>Your website is more than just a digital presence—it’s a growth engine. We combine design, development, and SEO expertise to build websites that attract, engage, and convert visitors.</p>
          <div className="webdev-cta-buttons">
            <a href="/contact" className="webdev-cta-primary cursor-target">
              Contact Socialsect
              <ArrowRight size={20} />
            </a>
            <a href="https://calendly.com/rayansh-gosocialsect/30min" target="_blank" className="webdev-cta-secondary cursor-target">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Rotating Text */}
      <div className="webdev-solution-container">
        <span className="webdev-solution-text">Your One Stop Solution for</span>
        <RotatingText
          texts={["Website Development", "E-commerce Solutions", "Custom Web Apps", "CMS Development", "Mobile Optimization", "Digital Transformation"]}
          mainClassName="webdev-rotating-text"
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
      <TargetCursor />
    </Fragment>
  );
};

export default WebsiteDevelopment;
