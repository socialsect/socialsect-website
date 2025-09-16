import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  ChevronDown, 
  Star, 
  Users, 
  Building2, 
  Rocket,
  Monitor,
  FileText,
  Settings,
  PieChart,
  ArrowUpRight,
  ShoppingCart,
  Globe,
  Search,
  MousePointer,
  Layers,
  Database,
  Shield,
  Clock,
  Award,
  TrendingDown,
  Activity,
  Lightbulb,
  RefreshCw
} from 'lucide-react';
import './website-growth.css';
import ContactForm from '../../components/contact-form/ContactForm';
import TargetCursor from '../../components/targetcursor/cursor';

// FAQ Accordion Component
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className={`webgr-faq-item cursor-target ${isOpen ? 'active' : ''}`} onClick={onClick}>
    <div className="webgr-faq-question-wrapper">
      <h3 className="webgr-faq-question">{question}</h3>
      <ChevronDown className="webgr-faq-arrow" />
    </div>
    {isOpen && <div className="webgr-faq-answer">{answer}</div>}
  </div>
);

// Process Step Component
const ProcessStep = ({ number, title, description, icon, features, delay = 0 }) => (
  <div className="webgr-process-step cursor-target" data-aos="fade-up" data-aos-delay={delay}>
    <div className="webgr-process-number">{number}</div>
    <div className="webgr-process-icon">
      {icon}
    </div>
    <h3 className="webgr-process-title">{title}</h3>
    <p className="webgr-process-description">{description}</p>
    <ul className="webgr-process-features">
      {features.map((feature, index) => (
        <li key={index} className="webgr-process-feature">
          <CheckCircle className="webgr-feature-icon" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

// Service Pillar Component
const ServicePillar = ({ title, description, outcome, icon, stats, delay = 0 }) => (
  <div className="webgr-service-pillar cursor-target" data-aos="fade-up" data-aos-delay={delay}>
    <div className="webgr-service-icon">
      {icon}
    </div>
    <h3 className="webgr-service-title">{title}</h3>
    <p className="webgr-service-description">{description}</p>
    <div className="webgr-service-stats">
      {stats.map((stat, index) => (
        <div key={index} className="webgr-stat">
          <span className="webgr-stat-number">{stat.value}</span>
          <span className="webgr-stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
    <div className="webgr-service-outcome">
      <strong>Outcome:</strong> {outcome}
    </div>
  </div>
);

// Problem Card Component
const ProblemCard = ({ title, description, icon, delay = 0 }) => (
  <div className="webgr-problem-card cursor-target" data-aos="fade-up" data-aos-delay={delay}>
    <div className="webgr-problem-icon">
      {icon}
    </div>
    <h3 className="webgr-problem-title">{title}</h3>
    <p className="webgr-problem-description">{description}</p>
  </div>
);

// Audience Card Component
const AudienceCard = ({ title, description, icon, benefits, delay = 0 }) => (
  <div className="webgr-audience-card cursor-target" data-aos="fade-up" data-aos-delay={delay}>
    <div className="webgr-audience-icon">
      {icon}
    </div>
    <h3 className="webgr-audience-title">{title}</h3>
    <p className="webgr-audience-description">{description}</p>
    <ul className="webgr-audience-benefits">
      {benefits.map((benefit, index) => (
        <li key={index} className="webgr-benefit">
          <CheckCircle className="webgr-benefit-icon" />
          {benefit}
        </li>
      ))}
    </ul>
  </div>
);

const WebsiteGrowthPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const processSteps = [
    {
      number: "01",
      title: "Strategize & Build",
      description: "We start with your business goals to build a technically flawless, high-converting website on a scalable platform.",
      icon: <Building2 size={32} />,
      features: [
        "Conversion-Centered Design (CCD)",
        "SEO-First Development",
        "High-Speed, Secure Hosting",
        "Clear Call-to-Action Strategy"
      ],
      delay: 100
    },
    {
      number: "02",
      title: "Analyze & Measure",
      description: "You can't improve what you don't measure. We install and monitor the right tools to track what truly matters.",
      icon: <BarChart3 size={32} />,
      features: [
        "Advanced Google Analytics/GA4 Setup",
        "Heatmaps & User Session Recordings",
        "Conversion Funnel Tracking",
        "Monthly Performance Reporting"
      ],
      delay: 200
    },
    {
      number: "03",
      title: "Test & Optimize",
      description: "This is where the magic happens. We use your data to run experiments that systematically increase performance.",
      icon: <Zap size={32} />,
      features: [
        "A/B & Multivariate Testing",
        "SEO Content Expansion & Optimization",
        "Site Speed & Core Web Vitals Enhancement",
        "User Experience (UX) Refinement"
      ],
      delay: 300
    },
    {
      number: "04",
      title: "Scale & Refine",
      description: "We identify winning strategies and scale them, then restart the cycle to find new growth opportunities.",
      icon: <Rocket size={32} />,
      features: [
        "Scalable Infrastructure Updates",
        "Automated Marketing Funnel Integration",
        "Strategic Planning for New Features",
        "Continuous Improvement Cycles"
      ],
      delay: 400
    }
  ];

  const servicePillars = [
    {
      title: "Technical Development",
      description: "Custom WordPress/Shopify development, responsive design, security hardening, API integrations.",
      outcome: "A fast, secure, and functional website built to scale.",
      icon: <Settings size={32} />,
      stats: [
        { value: "99.9%", label: "Uptime" },
        { value: "<2s", label: "Load Time" }
      ],
      delay: 100
    },
    {
      title: "On-Going SEO & Content",
      description: "Keyword strategy, technical SEO audits, blog post creation, on-page optimization.",
      outcome: "Sustainable increases in qualified organic traffic.",
      icon: <FileText size={32} />,
      stats: [
        { value: "300%", label: "Traffic Growth" },
        { value: "50+", label: "Keywords Ranked" }
      ],
      delay: 200
    },
    {
      title: "Conversion Rate Optimization (CRO)",
      description: "A/B testing plan, analytics review, funnel analysis, UX improvements.",
      outcome: "Higher conversion rates from your existing traffic.",
      icon: <Target size={32} />,
      stats: [
        { value: "40%", label: "CRO Increase" },
        { value: "25%", label: "Bounce Rate Drop" }
      ],
      delay: 300
    },
    {
      title: "Performance Monitoring",
      description: "Monthly reports on traffic, rankings, conversions, and speed.",
      outcome: "Clear visibility into your website's ROI and health.",
      icon: <Monitor size={32} />,
      stats: [
        { value: "24/7", label: "Monitoring" },
        { value: "95%", label: "Satisfaction" }
      ],
      delay: 400
    }
  ];

  const problems = [
    {
      title: "Traffic Plateaus",
      description: "Your organic growth stalls because your content and technical SEO aren't continuously improved.",
      icon: <TrendingDown size={24} />
    },
    {
      title: "Low Conversion Rates",
      description: "Visitors come but don't convert because user experience (UX) isn't tested and refined.",
      icon: <Target size={24} />
    },
    {
      title: "Stagnant Performance",
      description: "Site speed slows, hurting your rankings and user satisfaction.",
      icon: <Zap size={24} />
    },
    {
      title: "Missed Opportunities",
      description: "You have no clear system for testing new ideas or capturing leads effectively.",
      icon: <BarChart3 size={24} />
    }
  ];

  const audiences = [
    {
      title: "B2B & SaaS Companies",
      description: "Looking to generate more qualified leads and increase customer lifetime value.",
      icon: <Building2 size={32} />,
      benefits: [
        "Lead generation optimization",
        "Customer journey mapping",
        "Sales funnel automation",
        "ROI tracking & reporting"
      ]
    },
    {
      title: "E-commerce Brands",
      description: "Focused on increasing average order value and reducing cart abandonment.",
      icon: <ShoppingCart size={32} />,
      benefits: [
        "Cart abandonment recovery",
        "Product page optimization",
        "Checkout flow improvement",
        "Customer retention strategies"
      ]
    },
    {
      title: "Established Businesses",
      description: "With websites that have plateaued and need a strategic partner to unlock new growth.",
      icon: <TrendingUp size={32} />,
      benefits: [
        "Performance audit & analysis",
        "Growth strategy development",
        "Competitive advantage building",
        "Market expansion support"
      ]
    },
    {
      title: "Startups",
      description: "That want to build a scalable, data-driven foundation from day one.",
      icon: <Rocket size={32} />,
      benefits: [
        "MVP development & testing",
        "Scalable architecture design",
        "Growth metrics implementation",
        "Market validation support"
      ]
    }
  ];

  const faqs = [
    {
      question: "How is this different from regular web development?",
      answer: "Traditional web development ends at launch. Our Website Growth Systems continue evolving your site based on real data and user behavior, ensuring continuous improvement and growth."
    },
    {
      question: "What if my website is already built?",
      answer: "Perfect! We can audit your existing site and implement our growth framework to optimize performance, improve conversions, and scale your results."
    },
    {
      question: "How long does it take to see results?",
      answer: "Initial improvements typically appear within 30-60 days. Sustainable growth builds over 3-6 months as we optimize based on real data and user feedback."
    },
    {
      question: "Do you work with all types of businesses?",
      answer: "Yes! Our systems work for B2B, SaaS, e-commerce, and service businesses. We customize the approach based on your industry and growth goals."
    },
    {
      question: "What's included in the free growth audit?",
      answer: "A comprehensive 15-point analysis covering technical performance, SEO opportunities, conversion optimization, and a customized growth roadmap."
    }
  ];

  useEffect(() => {
    // Initialize AOS if available
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      });
    }
  }, []);

  return (
    <div className="webgr-page">
      <Helmet>
        <title>Website Growth Services | CRO, Performance & UX Optimization – Socialsect</title>
        <meta name="description" content="Transform your website into a growth engine with Socialsect's website growth services. CRO, performance optimization, and UX improvements that drive conversions and revenue." />
        <meta name="keywords" content="website growth services, CRO services, conversion rate optimization, website performance, UX optimization, website speed optimization, growth marketing" />
        <link rel="canonical" href="https://goSocialsect.com/services/website-growth" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/services/website-growth" />
        <meta property="og:title" content="Website Growth Services | CRO, Performance & UX Optimization – Socialsect" />
        <meta property="og:description" content="Transform your website into a growth engine with Socialsect's website growth services. CRO, performance optimization, and UX improvements that drive conversions." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/services/website-growth" />
        <meta property="twitter:title" content="Website Growth Services | CRO, Performance & UX Optimization – Socialsect" />
        <meta property="twitter:description" content="Transform your website into a growth engine with Socialsect's website growth services. CRO, performance optimization, and UX improvements that drive conversions." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
      </Helmet>
      <TargetCursor />
      
      {/* Hero Section */}
      <section className="webgr-hero">
        <div className="webgr-hero-background">
          <div className="webgr-hero-pattern"></div>
        </div>
        <div className="webgr-container">
          <div className="webgr-hero-content">
            <div className="webgr-hero-badge">
              <Award size={20} />
              <span>Website Growth Systems</span>
            </div>
            <h1 className="webgr-hero-title">
              Build a Website That 
              <span className="webgr-highlight"> Grows With Your Business</span>
            </h1>
            <p className="webgr-hero-subtitle">
              Your website shouldn't be a static brochure. It should be your hardest-working salesperson, 
              lead generator, and growth engine, all in one. We design, build, and optimize Website Growth 
              Systems—not just websites.
            </p>
            <div className="webgr-hero-stats">
              <div className="webgr-stat-item">
                <span className="webgr-stat-number">217%</span>
                <span className="webgr-stat-label">Average Revenue Increase</span>
              </div>
              <div className="webgr-stat-item">
                <span className="webgr-stat-number">300%</span>
                <span className="webgr-stat-label">Traffic Growth</span>
              </div>
              <div className="webgr-stat-item">
                <span className="webgr-stat-number">40%</span>
                <span className="webgr-stat-label">Conversion Boost</span>
              </div>
            </div>
            <div className="webgr-hero-cta">
              <a href="/lets-build" className="webgr-btn webgr-btn-primary cursor-target">
                <span>Claim Your Free Growth Audit</span>
                <ArrowRight size={20} />
              </a>
              <a href="/about-us" className="webgr-btn webgr-btn-outline cursor-target">
                <span>See How It Works</span>
                <MousePointer size={20} />
              </a>
            </div>
          </div>
          <div className="webgr-hero-visual">
            <div className="webgr-hero-card cursor-target">
              <div className="webgr-card-header">
                <div className="webgr-card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="webgr-card-title">Growth Dashboard</div>
              </div>
              <div className="webgr-card-content">
                <div className="webgr-metric">
                  <div className="webgr-metric-label">Organic Traffic</div>
                  <div className="webgr-metric-value">+127%</div>
                  <div className="webgr-metric-chart">
                    <div className="webgr-chart-bar" style={{height: '60%'}}></div>
                    <div className="webgr-chart-bar" style={{height: '80%'}}></div>
                    <div className="webgr-chart-bar" style={{height: '100%'}}></div>
                    <div className="webgr-chart-bar" style={{height: '85%'}}></div>
                  </div>
                </div>
                <div className="webgr-metric">
                  <div className="webgr-metric-label">Conversions</div>
                  <div className="webgr-metric-value">+89%</div>
                  <div className="webgr-metric-chart">
                    <div className="webgr-chart-bar" style={{height: '40%'}}></div>
                    <div className="webgr-chart-bar" style={{height: '70%'}}></div>
                    <div className="webgr-chart-bar" style={{height: '90%'}}></div>
                    <div className="webgr-chart-bar" style={{height: '100%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="webgr-problem">
        <div className="webgr-container">
          <div className="webgr-section-header">
            <h2 className="webgr-section-title">
              The Problem with <span className="webgr-highlight">"Set-and-Forget" Websites</span>
            </h2>
            <p className="webgr-section-subtitle">
              Most web development projects end at launch. You get a beautiful site, but it's built on a 
              fragile foundation that can't adapt.
            </p>
          </div>
          
          <div className="webgr-problem-grid">
            {problems.map((problem, index) => (
              <ProblemCard key={index} {...problem} delay={(index + 1) * 100} />
            ))}
          </div>
          
          <div className="webgr-problem-cta">
            <div className="webgr-problem-message">
              <Lightbulb size={24} />
              <p><strong>You don't just need a developer; you need a growth partner.</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="webgr-process" className="webgr-process">
        <div className="webgr-container">
          <div className="webgr-section-header">
            <h2 className="webgr-section-title">
              Our Process: The <span className="webgr-highlight">Growth System Framework</span>
            </h2>
            <p className="webgr-section-subtitle">
              We move beyond one-off projects to become an extension of your team. Our framework is built on a cycle of continuous improvement.
            </p>
          </div>
          
          <div className="webgr-process-grid">
            {processSteps.map((step, index) => (
              <ProcessStep key={index} {...step} />
            ))}
          </div>
          
          <div className="webgr-process-cta">
            <a href="/services" className="webgr-btn webgr-btn-primary">
              <span>See How Our Process Works in Detail</span>
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="webgr-services" className="webgr-services">
        <div className="webgr-container">
          <div className="webgr-section-header">
            <h2 className="webgr-section-title">
              What Our <span className="webgr-highlight">Website Growth Systems</span> Include
            </h2>
            <p className="webgr-section-subtitle">
              Comprehensive solutions that transform your website from a cost center to your most profitable asset
            </p>
          </div>
          
          <div className="webgr-services-grid">
            {servicePillars.map((pillar, index) => (
              <ServicePillar key={index} {...pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="webgr-case-study">
        <div className="webgr-container">
          <div className="webgr-case-study-content">
            <div className="webgr-case-study-badge">
              <Star size={20} />
              <span>Success Story</span>
            </div>
            <h2 className="webgr-case-study-title">
              How We Increased Organic Revenue by <span className="webgr-highlight-b">217%</span> for a SaaS Company
            </h2>
            <div className="webgr-case-study-stats">
              <div className="webgr-case-stat">
                <span className="webgr-case-stat-number">217%</span>
                <span className="webgr-case-stat-label">Revenue Increase</span>
              </div>
              <div className="webgr-case-stat">
                <span className="webgr-case-stat-number">300%</span>
                <span className="webgr-case-stat-label">Traffic Growth</span>
              </div>
              <div className="webgr-case-stat">
                <span className="webgr-case-stat-number">89%</span>
                <span className="webgr-case-stat-label">Conversion Boost</span>
              </div>
            </div>
            <blockquote className="webgr-case-study-quote">
              "Before working with Socialsect, our website was just an online brochure. Their Growth System 
              transformed it into our primary lead source. Their data-driven approach to both development and 
              content took the guesswork out of our marketing."
              <cite>– Mark C., CEO</cite>
            </blockquote>
            <a href="/case-studies" className="webgr-btn webgr-btn-outline">
              <span>Read the Full Case Study</span>
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="webgr-audience">
        <div className="webgr-container">
          <div className="webgr-section-header">
            <h2 className="webgr-section-title">
              Who This Is <span className="webgr-highlight">For</span>
            </h2>
            <p className="webgr-section-subtitle">
              Our Website Growth Systems are perfect for businesses ready to unlock their website's full potential
            </p>
          </div>
          
          <div className="webgr-audience-grid">
            {audiences.map((audience, index) => (
              <AudienceCard key={index} {...audience} delay={(index + 1) * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="webgr-final-cta">
        <div className="webgr-container">
          <div className="webgr-final-cta-content">
            <div className="webgr-final-cta-badge">
              <Rocket size={20} />
              <span>Ready to Grow?</span>
            </div>
            <h2 className="webgr-final-cta-title">
              Ready to Turn Your Website into a <span className="webgr-highlight">Predictable Growth Channel</span>?
            </h2>
            <p className="webgr-final-cta-subtitle">
              Stop leaving money on the table. Schedule your free, no-obligation Growth Audit today. 
              We'll analyze your site and provide a customized 15-point plan to increase traffic and conversions.
            </p>
            <div className="webgr-final-cta-buttons">
              <a href="/lets-build" className="webgr-btn webgr-btn-primary">
                <span>Get My Free Growth Audit Now</span>
                <ArrowRight size={20} />
              </a>
              <a href="/about-us" className="webgr-final-cta-link">
                <span>Or Learn More About Our Process</span>
                <RefreshCw size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="webgr-faq">
        <div className="webgr-container">
          <div className="webgr-section-header">
            <h2 className="webgr-section-title">
              Frequently Asked <span className="webgr-highlight">Questions</span>
            </h2>
            <p className="webgr-section-subtitle">
              Everything you need to know about our Website Growth Systems
            </p>
          </div>
          
          <div className="webgr-faq-container">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={activeFaq === index}
                onClick={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="webgr-contact" className="webgr-contact">
        <div className="webgr-container">
          <div className="webgr-contact-header">
            <h2 className="webgr-contact-title">
              Start Your <span className="webgr-highlight">Growth Journey</span>
            </h2>
            <p className="webgr-contact-subtitle">
              Get your free growth audit and discover how to transform your website into your most profitable asset
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default WebsiteGrowthPage;