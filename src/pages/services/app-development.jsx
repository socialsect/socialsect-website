import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Globe, ShoppingCart, FileText, Code as CodeIcon, Tablet,Briefcase,
  Smartphone, RefreshCw, Search, Settings, Users, 
  ArrowRight, CheckCircle, ChevronDown, ChevronUp,
  Monitor, Database, Zap, Target, TrendingUp, Shield, Clock, BarChart3
} from 'lucide-react';
import './app-development.css';
import { initCardSpotlight } from './cursorEffect';
import ContactForm from '../../components/contact-form/ContactForm';
import RotatingText from '../../components/rotating-text/text';
import MagicBento from '../../components/magic-bento/bento';

const AppDevelopment = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const appServices = [
    {
      title: "iOS App Development",
      icon: <Smartphone size={32} />,
      description: "High-performance native apps for iPhones and iPads using Swift and Objective-C.",
      features: [
        "Native app development for iOS",
        "UI/UX design optimized for Apple devices",
        "App Store submission and maintenance",
        "Performance monitoring and updates"
      ]
    },
    {
      title: "Android App Development",
      icon: <Smartphone size={32} style={{ transform: 'rotate(90deg)' }} />,
      description: "Feature-rich Android apps built with Kotlin and Java for optimal performance.",
      features: [
        "Kotlin and Java-based development",
        "Custom UI/UX design for Android",
        "Play Store publishing and optimization",
        "Post-launch support and updates"
      ]
    },
    {
      title: "Cross-Platform App Development",
      icon: <Tablet size={32} />,
      description: "Single codebase solutions with React Native, Flutter, and Xamarin.",
      features: [
        "Single codebase for multiple platforms",
        "Faster development cycles",
        "Consistent user experience",
        "Cost-effective maintenance"
      ]
    },
    {
      title: "Web App Development",
      icon: <Globe size={32} />,
      description: "Scalable web applications built with modern technologies.",
      features: [
        "Progressive Web Apps (PWA)",
        "Enterprise-grade solutions",
        "API integration",
        "SEO-friendly development"
      ]
    },
    {
      title: "E-commerce App Development",
      icon: <ShoppingCart size={32} />,
      description: "Custom shopping experiences that drive sales and engagement.",
      features: [
        "Mobile shopping apps",
        "Product catalog management",
        "Secure payment integration",
        "Personalized UX"
      ]
    },
    {
      title: "Enterprise App Solutions",
      icon: <Briefcase size={32} />,
      description: "Custom apps to optimize your business operations.",
      features: [
        "Workflow automation",
        "Internal communication tools",
        "CRM/ERP integration",
        "Data-driven optimization"
      ]
    },
    {
      title: "UI/UX Design & App Prototyping",
      icon: <Monitor size={32} />,
      description: "User-centric design and interactive prototypes to validate and refine experiences.",
      features: [
        "Wireframing & prototyping",
        "UI and UX design",
        "Usability testing & refinement"
      ]
    },
    {
      title: "App Maintenance & Support",
      icon: <Settings size={32} />,
      description: "Keep your app secure, updated, and fully functional post-launch.",
      features: [
        "Performance monitoring",
        "Bug fixes & enhancements",
        "Security patches & updates",
        "Analytics tracking"
      ]
    }
  ];

  const developmentProcess = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements and create a detailed project roadmap."
    },
    {
      step: "02",
      title: "UI/UX Design",
      description: "Our designers create intuitive interfaces and interactive prototypes."
    },
    {
      step: "03",
      title: "Development",
      description: "Our developers bring your app to life using the latest technologies."
    },
    {
      step: "04",
      title: "Testing & QA",
      description: "Rigorous testing ensures your app is bug-free and performs flawlessly."
    },
    {
      step: "05",
      title: "Deployment",
      description: "We handle app store submissions and ensure a smooth launch."
    },
    {
      step: "06",
      title: "Support & Updates",
      description: "Ongoing maintenance and updates to keep your app running smoothly."
    }
  ];

  const metrics = [
    { value: "95%", label: "Client Satisfaction", description: "Average client satisfaction rate" },
    { value: "4.9/5", label: "App Store Rating", description: "Average app store rating" },
    { value: "<2s", label: "Load Time", description: "Average app loading time" },
    { value: "100+", label: "Apps Delivered", description: "Successful app launches" }
  ];

  const industries = [
    "E-commerce & Retail",
    "Healthcare & Telemedicine",
    "Real Estate & Property Management",
    "Education & E-learning",
    "Finance & FinTech",
    "Travel & Hospitality",
    "Startups & SaaS Platforms"
  ];

  const faqs = [
    {
      question: "How long does it take to develop an app?",
      answer: "The timeline depends on the complexity and platform. Simple apps can take 6-8 weeks, while complex enterprise or cross-platform apps may take 3-6 months."
    },
    {
      question: "Do you build apps for both iOS and Android?",
      answer: "Yes, we develop native iOS, Android, and cross-platform apps to maximize audience reach."
    },
    {
      question: "Can you help with app store submission?",
      answer: "Absolutely. We handle App Store and Google Play submission, ensuring compliance with guidelines."
    },
    {
      question: "Do you provide app maintenance services?",
      answer: "Yes, we offer ongoing maintenance, updates, and performance monitoring to ensure your app continues to perform optimally."
    },
    {
      question: "Will my app be optimized for performance?",
      answer: "Yes, our apps are optimized for fast loading, smooth performance, and excellent user experience across all devices."
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
        <title>App Development Services | iOS & Android Mobile Apps – Socialsect</title>
        <meta name="description" content="Bring your ideas to life with Socialsect's mobile app development services. We create custom iOS, Android, and hybrid apps designed for performance, scalability, and user engagement." />
        <meta name="keywords" content="app development company, mobile app development services, iOS app development, Android app development, React Native, Flutter, cross-platform apps, custom mobile apps" />
        <link rel="canonical" href="https://goSocialsect.com/services/app-development" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/services/app-development" />
        <meta property="og:title" content="App Development Services | iOS & Android Mobile Apps – Socialsect" />
        <meta property="og:description" content="Bring your ideas to life with Socialsect's mobile app development services. We create custom iOS, Android, and hybrid apps designed for performance, scalability, and user engagement." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/services/app-development" />
        <meta property="twitter:title" content="App Development Services | iOS & Android Mobile Apps – Socialsect" />
        <meta property="twitter:description" content="Bring your ideas to life with Socialsect's mobile app development services. We create custom iOS, Android, and hybrid apps designed for performance, scalability, and user engagement." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "App Development Services",
            "description": "Custom mobile app development services for iOS, Android, and hybrid platforms. We create scalable, user-friendly apps that drive business growth.",
            "provider": {
              "@type": "Organization",
              "name": "Socialsect",
              "url": "https://goSocialsect.com"
            },
            "serviceType": "App Development",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "App Development Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "iOS App Development",
                    "description": "Native iOS app development using Swift and Objective-C"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Android App Development",
                    "description": "Native Android app development using Kotlin and Java"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Cross-Platform Development",
                    "description": "Hybrid app development using React Native and Flutter"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <section className="app-hero">
        <div className="app-hero-content">
          <h1 className="app-hero-title">
            App Development Services That Drive Innovation
            <br />
            <span className="highlight">– Socialsect</span>
          </h1>
          <p className="app-hero-subtitle">
            In today’s digital-first world, mobile and web applications are at the heart of business growth. At Socialsect, our app development services create powerful, scalable, and user-friendly applications that enhance engagement, improve operational efficiency, and drive revenue. Whether consumer-facing mobile apps, complex enterprise solutions, or web apps, we deliver tailored solutions aligned with your goals.
          </p>
          
          <div className="app-stats-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="app-stat-item">
                <div className="app-stat-number">{metric.value}</div>
                <div className="app-stat-label">{metric.label}</div>
                <p className="app-stat-description">{metric.description}</p>
              </div>
            ))}
          </div>

          <div className="app-cta-buttons">
            <a href="/lets-build" className="app-cta-primary cursor-target">
              Start Your Project
              <ArrowRight size={20} />
            </a>
            <a href="/case-studies" className="app-cta-secondary cursor-target">
              View Portfolio
            </a>
          </div>
        </div>
        
        <div className="app-hero-decorator"></div>
      </section>

      {/* Why Choose Section */}
      <section className="app-why-choose">
        <div className="app-section-header">
          <h2>Why Your Business Needs Professional App Development</h2>
          <p>Applications are essential tools for connecting with customers, streamlining operations, and standing out. Professional services offer:</p>
        </div>
        
        <div className="app-benefits-grid">
          {[
            {
              icon: <Users size={24} />,
              title: "Enhanced User Engagement",
              description: "Deliver seamless experiences that retain and engage users"
            },
            {
              icon: <TrendingUp size={24} />,
              title: "Increased Revenue Opportunities",
              description: "Apps drive sales, subscriptions, and customer loyalty"
            },
            {
              icon: <Zap size={24} />,
              title: "Improved Operational Efficiency",
              description: "Streamline internal processes with custom enterprise apps"
            },
            {
              icon: <Shield size={24} />,
              title: "Brand Visibility & Credibility",
              description: "A polished app reflects professionalism and trust"
            }
          ].map((benefit, index) => (
            <div key={index} className="app-benefit-item cursor-target">
              <div className="app-benefit-icon">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="app-services">
        <div className="app-section-header">
          <h2>Our App Development Services</h2>
          <p>Comprehensive app development solutions across platforms, industries, and use cases.</p>
        </div>
        
        <div className="app-services-grid">
          {appServices.map((service, index) => (
            <div key={index} className="app-service-card cursor-target">
              <div className="app-service-icon">
                {service.icon}
              </div>
              <h3 className="app-service-title">{service.title}</h3>
              <p className="app-service-description">{service.description}</p>
              <ul className="app-features-list">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="app-feature-item">
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
      <section className="app-process">
        <div className="app-section-header">
          <h2>Our App Development Process</h2>
          <p>Socialsect follows a structured, results-driven approach to app development:</p>
        </div>
        
        <div className="app-process-steps">
          {developmentProcess.map((step, index) => (
            <div key={index} className="app-process-step cursor-target">
              <div className="app-step-number">{step.step}</div>
              <div className="app-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries Section */}
      <section className="app-industries">
        <div className="app-section-header">
          <h2>Industries We Serve</h2>
          <p>Custom app solutions for businesses across all sectors</p>
        </div>
        
        <div className="app-industries-grid">
          {industries.map((industry, index) => (
            <div key={index} className="app-industry-item cursor-target">
              <CheckCircle size={20} />
              <span>{industry}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section className="app-feature-showcase">
        <div className="app-feature-decorator decorator-1"></div>
        <div className="app-feature-decorator decorator-2"></div>
        
        <div className="app-feature-container">
          <div className="app-feature-header">
            <h2>Why Choose Socialsect for App Development?</h2>
            <p>We combine technical expertise with creative solutions to deliver exceptional mobile experiences</p>
          </div>
          
          <div className="app-feature-grid">
            {[
              {
                icon: <CodeIcon size={24} />,
                title: "Experienced Developers",
                description: "Skilled in iOS, Android, cross-platform, and web app development using the latest technologies."
              },
              {
                icon: <Settings size={24} />,
                title: "User-Centric Design",
                description: "Focus on creating intuitive, engaging interfaces that users love and remember."
              },
              {
                icon: <Zap size={24} />,
                title: "Performance Focused",
                description: "Optimized for speed, security, and seamless performance across all devices."
              }
            ].map((feature, index) => (
              <div key={index} className="app-feature-card cursor-target">
                <div className="app-feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="app-faq">
        <div className="app-section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about our app development services</p>
        </div>
        
        <div className="app-faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`app-faq-item ${openFaq === index ? 'active' : ''}`}>
              <div 
                className="app-faq-header cursor-target"
                onClick={() => toggleFaq(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleFaq(index)}
              >
                <h3>{faq.question}</h3>
                <div className="app-faq-icon">
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              <div className="app-faq-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Bottom CTA */}
      <section className="app-bottom-cta">
        <div className="app-cta-content">
          <h2>Ready to Build Your Next App?</h2>
          <p>Let's turn your app idea into reality and drive real business growth</p>
          <div className="app-cta-buttons">
            <a href="/lets-build" className="app-cta-primary cursor-target">
              Start Your Project
              <ArrowRight size={20} />
            </a>
            <a href="https://calendly.com/rayansh-gosocialsect/30min" target="_blank" className="app-cta-secondary cursor-target">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Rotating Text */}
      <div className="app-solution-container">
        <span className="app-solution-text">Your One Stop Solution for</span>
        <RotatingText
          texts={["iOS App Development", "Android App Development", "Cross-Platform Apps", "Web Applications", "E-commerce Apps", "Enterprise Solutions"]}
          mainClassName="app-rotating-text"
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

export default AppDevelopment;
