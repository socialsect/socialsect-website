import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import '../services/website-development.css';
import { CheckCircle, ArrowRight, Download, X, Smartphone, Globe, Gamepad2, Sparkles, ShoppingBag, Code, Database, Zap, Shield, Users, Monitor, Wrench, Bolt } from 'lucide-react';
import SpotlightCard from '../../components/spotlight-card/card';

const sampleData = {
  seo: [
    { title: 'Ferz Consulting', img: '/ferz.png', metrics: ['92+ SEO Score', 'Load time < 2.5s', 'Improved indexing + sitemap'], summary: 'SEO + Website Development - Technical SEO hygiene and performance optimization.' },
    { title: 'Interface Clinic (UK)', img: '/loop/WhatsApp Image 2025-08-30 at 8.29.26 AM.jpeg', metrics: ['Top 10 healthcare keywords', 'Increased patient inquiries', 'Optimized H1/H2 hierarchy'], summary: 'Local SEO + Web Build - Healthcare-focused local search optimization.' },
    { title: 'Tyson Dirksen (Real Estate)', img: '/loop/WhatsApp Image 2025-08-30 at 8.32.29 AM.jpeg', metrics: ['10+ services ranking', 'Improved keyword positioning', 'Higher credibility via markup'], summary: 'On-Page SEO + Technical Fixes - Structured content for consulting vertical.' },
    { title: 'The Besson Group (Real Estate)', img: '/loop/besson.png', metrics: ['IDX-integrated optimization', 'Mobile SEO improvements', 'Local search visibility boost'], summary: 'SEO-Ready Web Development - Property-focused search optimization.' },
    { title: 'Miami Shoulder Institute (Orthopaedics)', img: '/loop/WhatsApp Image 2025-08-30 at 8.29.11 AM.jpeg', metrics: ['High-intent keyword optimization', 'Miami/Doral visibility boost', 'Structured schema + medical content'], summary: 'Local SEO + Technical SEO - Medical practice search dominance.' }
  ],
  'performance-marketing': [
    { title: 'NY Metro Vein', img: '/loop/WhatsApp Image 2025-08-30 at 8.28.37 AM.jpeg', metrics: ['CPL under $5', '700+ booked consults', '$100K+ estimated revenue'], summary: 'Meta Ads Funnel - Consistent patient acquisition with full-funnel integration.' },
    { title: 'Hickey Lipstick', img: '/loop/HICKEY-Lipstick-Logo_2-2.svg', metrics: ['CTR 7.04%', 'CPC $0.02', 'Traffic +1,400% in 7 days'], summary: 'Google + Meta Ads - Above industry average performance with massive traffic growth.' },
    { title: 'Miami Shoulder Institute', img: '/loop/WhatsApp Image 2025-08-30 at 8.29.11 AM.jpeg', metrics: ['Consistent patient acquisition', 'Full-funnel integration', 'Improving CPL over time'], summary: 'Meta Ads + SEO + Web Funnel - Complete digital marketing ecosystem.' },
    { title: 'Kings of Lending', img: '/loop/WhatsApp Image 2025-08-30 at 8.33.34 AM.jpeg', metrics: ['Systemized lead gen', 'Automations + suppression', 'Proven CPL control'], summary: 'Meta Ads - Mortgage lead generation with advanced automation and optimization.' },
    { title: 'Strutish / Undressed Boutique', img: '/strut.png', metrics: ['Conversion-focused campaigns', 'CPA reduction month over month', 'Creative testing scaled ROAS'], summary: 'Fashion D2C Meta Ads - Creative testing and optimization driving consistent growth.' }
  ],
  'website-development': [
    { title: 'The Besson Group (Real Estate)', img: '/loop/besson.png', metrics: ['Mobile-first IDX-ready design', 'Load time 2.2s', 'SEO score 93+'], summary: 'Custom Real Estate Platform - Professional property showcase with integrated search.' },
    { title: 'Mr. Potato Vegas (Food & Beverage)', img: '/loop/WhatsApp Image 2025-08-30 at 8.34.09 AM.jpeg', metrics: ['Conversion-focused landing flows', 'Load time 2.3s', 'Fully responsive UI'], summary: 'Playful Brand Experience - Engaging design that drives conversions and engagement.' },
    { title: 'Ferz Consulting (Business Consulting)', img: '/ferz.png', metrics: ['SEO-aligned React rebuild', 'Load time <2.5s', 'SEO score 92+'], summary: 'Professional B2B Presence - Technical optimization with business credibility focus.Using modern framework with content migration' },
    { title: 'Miami Shoulder Institute (Orthopaedics)', img: '/loop/WhatsApp Image 2025-08-30 at 8.29.11 AM.jpeg', metrics: ['SEO-ready WordPress build', 'Integrated appointment funnel', 'Optimized patient experience'], summary: 'Medical Practice Website - Healthcare-focused design with seamless patient journey.' },
    { title: 'Tyson Dirksen (Real Estate Consultant)', img: '/loop/WhatsApp Image 2025-08-30 at 8.32.29 AM.jpeg', metrics: ['Minimalist high-credibility layout', 'Technical SEO cleanup', 'Improved visitor-to-inquiry ratio'], summary: 'Consulting Portfolio Website - Clean design that builds trust and drives inquiries.' }
  ],
  'app-development': [
    { title: 'Runner Golf (Sports Tech)', img: '/runner.png', metrics: ['AI-powered posture tracking', 'Real-time stance improvement', 'React-based architecture'], summary: 'Custom Web App Development - AI-powered golf posture & ball-tracking with global scalability.' },
    { title: 'Med Health (Healthcare Quiz App)', img: '/loop/WhatsApp Image 2025-08-30 at 8.30.22 AM.jpeg', metrics: ['2D avatar customization', 'Emotional reactions system', 'Health awareness education'], summary: 'Gamified Medical Quiz Application - Android platform with engaging user experience.' },
    { title: 'Fanwelt (Fantasy Gaming App)', img: '/loop/WhatsApp Image 2025-08-30 at 8.31.32 AM.jpeg', metrics: ['Mobile + Tablet platforms', 'Real-time player selection', 'Live score-based interaction'], summary: 'Fantasy Sports Gaming Application - Engaging 2D UI with live predictions.' },
    { title: 'Kundli Pro (Astrology AI App)', img: '/loop/WhatsApp Image 2025-08-30 at 8.33.34 AM.jpeg', metrics: ['Android + iOS platforms', 'Personalized astrological insights', 'AI chat guidance'], summary: 'Astrology + AI Chat Experience - Innovative interactive guidance system.' },
    { title: 'Essmey (Luxury Perfume Brand)', img: '/loop/WhatsApp Image 2025-08-30 at 8.33.47 AM.jpeg', metrics: ['CMS + Inventory Management', 'User profiles & discussions', 'Conversion-focused checkout'], summary: 'E-commerce Web App - Custom features for luxury brand experience.' }
  ],
  'content-strategy': [
    { title: 'Topical Authority', img: '/loop/WhatsApp Image 2025-08-30 at 8.33.34 AM.jpeg', metrics: ['+180% organic', '30 featured snippets', '+3x newsletter'], summary: 'Clusters + internal links.' },
    { title: 'Product-led Content', img: '/loop/WhatsApp Image 2025-08-30 at 8.33.47 AM.jpeg', metrics: ['+65% signups', '+40% SQLs', 'Demo-to-close +12%'], summary: 'Use-case content + SEO.' }
  ],
  gtm: [
    { title: 'Multi-region Launch', img: '/loop/WhatsApp Image 2025-08-30 at 8.30.37 AM.jpeg', metrics: ['TTV -30%', '+3.4x pipeline', 'CAC -22%'], summary: 'Positioning + pricing + channels.' },
    { title: 'New Product Launch', img: '/loop/WhatsApp Image 2025-08-30 at 8.31.51 AM.png', metrics: ['+12k signups', 'ROAS 4.1x', 'NPS 62'], summary: 'Playbooks + enablement.' },
    { title: 'GTM Strategy Summaries', img: '/loop/WhatsApp Image 2025-08-30 at 8.32.29 AM.jpeg', metrics: ['5 Projects', 'EdTech + SaaS', 'Comprehensive Strategies'], summary: 'Detailed GTM case studies across multiple sectors.', isDetailPage: true, detailPath: '/case-studies/gtm' }
  ],
  'website-growth': [
    { title: 'CRO Uplift', img: '/loop/WhatsApp Image 2025-08-30 at 8.34.09 AM.jpeg', metrics: ['+28% CVR', '+19% AOV', '-0.6s LCP'], summary: 'A/B tests + UX + speed.' },
    { title: 'Analytics Overhaul', img: '/loop/WhatsApp Image 2025-08-30 at 8.28.37 AM.jpeg', metrics: ['Attribution clarity', '+2.3x insights speed', 'Exec dashboards'], summary: 'GA4 + server events.' }
  ]
};

// Helper functions for app development case studies
const getAppIcon = (title) => {
  if (title.includes('Runner Golf')) return <Gamepad2 size={32} />;
  if (title.includes('Med Health')) return <Shield size={32} />;
  if (title.includes('Fanwelt')) return <Globe size={32} />;
  if (title.includes('Kundli Pro')) return <Sparkles size={32} />;
  if (title.includes('Essmey')) return <ShoppingBag size={32} />;
  return <Smartphone size={32} />;
};

const getAppCategory = (title) => {
  if (title.includes('Runner Golf')) return 'Sports Tech';
  if (title.includes('Med Health')) return 'Healthcare';
  if (title.includes('Fanwelt')) return 'Gaming';
  if (title.includes('Kundli Pro')) return 'AI/Astrology';
  if (title.includes('Essmey')) return 'E-commerce';
  return 'Mobile App';
};

const getTechStack = (title) => {
  if (title.includes('Runner Golf')) return ['React', 'AI/ML', 'Computer Vision', 'WebRTC'];
  if (title.includes('Med Health')) return ['Android', 'Kotlin', 'Firebase', '2D Graphics'];
  if (title.includes('Fanwelt')) return ['React Native', 'iOS', 'Android', 'Real-time APIs'];
  if (title.includes('Kundli Pro')) return ['iOS', 'Android', 'AI Chat', 'Astrology APIs'];
  if (title.includes('Essmey')) return ['React', 'Node.js', 'CMS', 'E-commerce'];
  return ['React', 'Node.js', 'Database'];
};

const ServiceCase = ({ serviceKey }) => {
  const items = sampleData[serviceKey] || [];
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDownloadClick = (caseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setShowDownloadPopup(true);
    setIsSubmitted(false);
  };

  const handleClosePopup = () => {
    setShowDownloadPopup(false);
    setSelectedCaseStudy(null);
    setFormData({ name: '', email: '', company: '' });
    setIsSubmitted(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual API call)
    const submissionData = {
      ...formData,
      caseStudy: selectedCaseStudy.title,
      serviceType: serviceKey,
      pageUrl: window.location.href,
      timestamp: new Date().toISOString()
    };
    
    console.log('Case study download request:', submissionData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getServiceTitle = (key) => {
    const titles = {
      'seo': 'SEO Case Studies',
      'performance-marketing': 'Performance Marketing Case Studies',
      'website-development': 'Website Development Case Studies',
      'app-development': 'App Development Case Studies',
      'content-strategy': 'Content Strategy Case Studies',
      'gtm': 'Go-to-Market (GTM) Case Studies',
      'website-growth': 'Website Growth Case Studies'
    };
    return titles[key] || `${key.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())} Case Studies`;
  };

  const getServiceDescription = (key) => {
    const descriptions = {
      'seo': 'Explore our SEO case studies showcasing organic growth, visibility, and search dominance. See how we engineered SEO systems that compound traffic into business outcomes.',
      'performance-marketing': 'Discover our performance marketing case studies with ROI-focused ad campaigns across Meta, Google, and LinkedIn. See how we turned ad spend into scalable acquisition.',
      'website-development': 'Browse our website development case studies featuring high-performing sites engineered for speed, trust, and conversion across various industries.',
      'app-development': 'See our app development case studies from AI-powered sports tech to SaaS platforms. Learn how we transform product ideas into live, performing systems.',
      'content-strategy': 'Explore our content strategy case studies where words drive engagement, authority, and measurable business growth.',
      'gtm': 'Discover our go-to-market case studies showing launches that maximize adoption with clarity, compliance, and measurable results.',
      'website-growth': 'See our website growth case studies featuring CRO, performance, and UX improvements that turned static sites into compounding growth engines.'
    };
    return descriptions[key] || `Explore our ${key.replace('-', ' ')} case studies showcasing real results and proven strategies.`;
  };

  const getServiceKeywords = (key) => {
    const keywords = {
      'seo': 'SEO case studies, organic growth, search visibility, technical SEO, local SEO, keyword ranking',
      'performance-marketing': 'performance marketing case studies, PPC case studies, paid ads, ROAS, conversion optimization, Meta ads',
      'website-development': 'website development case studies, web design case studies, custom websites, responsive design, web performance',
      'app-development': 'app development case studies, mobile app case studies, web app case studies, iOS Android development',
      'content-strategy': 'content strategy case studies, content marketing case studies, content creation, brand storytelling',
      'gtm': 'go-to-market case studies, GTM strategy case studies, market launch, product launch, market entry',
      'website-growth': 'website growth case studies, CRO case studies, conversion optimization, UX improvement, performance optimization'
    };
    return keywords[key] || `${key.replace('-', ' ')} case studies, digital marketing success stories, business growth`;
  };

  return (
    <Fragment>
      <Helmet>
        <title>{getServiceTitle(serviceKey)} | Case Studies – Socialsect</title>
        <meta name="description" content={getServiceDescription(serviceKey)} />
        <meta name="keywords" content={getServiceKeywords(serviceKey)} />
        <link rel="canonical" href={`https://goSocialsect.com/case-studies/${serviceKey}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://goSocialsect.com/case-studies/${serviceKey}`} />
        <meta property="og:title" content={getServiceTitle(serviceKey)} />
        <meta property="og:description" content={getServiceDescription(serviceKey)} />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://goSocialsect.com/case-studies/${serviceKey}`} />
        <meta property="twitter:title" content={getServiceTitle(serviceKey)} />
        <meta property="twitter:description" content={getServiceDescription(serviceKey)} />
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
                "@type": "CollectionPage",
                "@id": `https://goSocialsect.com/case-studies/${serviceKey}#webpage`,
                "url": `https://goSocialsect.com/case-studies/${serviceKey}`,
                "name": `${getServiceTitle(serviceKey)} | Case Studies – Socialsect`,
                "description": getServiceDescription(serviceKey),
                "isPartOf": {
                  "@id": "https://goSocialsect.com/#website"
                },
                "mainEntity": {
                  "@type": "ItemList",
                  "name": `${getServiceTitle(serviceKey)}`,
                  "description": getServiceDescription(serviceKey),
                  "numberOfItems": sampleData[serviceKey] ? sampleData[serviceKey].length : 0,
                  "itemListElement": sampleData[serviceKey] ? sampleData[serviceKey].map((caseStudy, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": caseStudy.title,
                    "description": caseStudy.summary,
                    "url": `https://goSocialsect.com/case-studies/${serviceKey}#${caseStudy.title.toLowerCase().replace(/\s+/g, '-')}`
                  })) : []
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
                      "name": "Case Studies",
                      "item": "https://goSocialsect.com/case-studies"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": getServiceTitle(serviceKey),
                      "item": `https://goSocialsect.com/case-studies/${serviceKey}`
                    }
                  ]
                }
              },
              {
                "@type": "Service",
                "name": getServiceTitle(serviceKey).replace(' Case Studies', ''),
                "description": getServiceDescription(serviceKey),
                "provider": {
                  "@id": "https://goSocialsect.com/#organization"
                },
                "serviceType": serviceKey.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
                "areaServed": "Worldwide"
              }
            ]
          })}
        </script>
      </Helmet>
      <section className="webdev-hero">
        <div className="webdev-hero-content">
          <h1 className="webdev-hero-title">{serviceKey === 'seo' ? 'SEO Case Studies' : serviceKey === 'performance-marketing' ? 'Performance Marketing Case Studies' : serviceKey === 'website-development' ? 'Website Development Case Studies' : serviceKey === 'app-development' ? 'App Development Case Studies' : serviceKey === 'content-strategy' ? 'Content Strategy Case Studies' : serviceKey === 'gtm' ? 'Go-to-Market (GTM) Case Studies' : serviceKey === 'website-growth' ? 'Website Growth Case Studies' : serviceKey.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) + ' Case Studies'}</h1>
          <p className="webdev-hero-subtitle">{serviceKey === 'seo' ? 'Proof of organic growth, visibility, and search dominance. Explore how we engineered SEO systems that compound traffic into business outcomes.' : serviceKey === 'performance-marketing' ? 'ROI-focused ad campaigns across Meta, Google, and LinkedIn. See how we turned ad spend into scalable acquisition with transparent KPIs.' : serviceKey === 'website-development' ? 'High-performing websites engineered for speed, trust, and conversion. Browse our builds across consulting, real estate, e-commerce, and creative industries.' : serviceKey === 'app-development' ? 'Mobile and web apps built to scale. From AI-powered sports tech to SaaS platforms, see how we transform product ideas into live, performing systems.' : serviceKey === 'content-strategy' ? 'Content that converts. Explore campaigns where words drive engagement, authority, and measurable business growth.' : serviceKey === 'gtm' ? 'Launches that maximize adoption. See how we positioned, executed, and scaled market entries with clarity, compliance, and measurable results.' : serviceKey === 'website-growth' ? 'CRO, performance, and UX improvements that turned static sites into compounding growth engines. Proof of speed, clarity, and conversion at work.' : 'A selection of outcomes with brief context, metrics and visuals.'}</p>
        </div>
      </section>
      <section className="webdev-services">
        <div className="webdev-section-header">
          <h2>Highlights</h2>
          <p>Sample data for demonstration</p>
        </div>
        <div className="webdev-services-grid" style={{display:'flex', flexDirection:'column', gap:'2rem'}}>
          {serviceKey === 'app-development' ? (
            // Special layout for app development case studies
            items.map((cs, idx) => (
              <SpotlightCard key={idx} className="webdev-service-card app-dev-card" style={{padding:0, background:'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', border:'1px solid #333'}}>
                <div className="app-dev-card-content">
                  <div className="app-dev-header">
                    <div className="app-dev-icon">
                      {getAppIcon(cs.title)}
                    </div>
                    <div className="app-dev-title-section">
                      <h3 className="app-dev-title">{cs.title}</h3>
                      <div className="app-dev-category">{getAppCategory(cs.title)}</div>
                    </div>
                  </div>
                  
                  <div className="app-dev-body">
                    <p className="app-dev-summary">{cs.summary}</p>
                    
                    <div className="app-dev-metrics">
                      <h4>
                        <Bolt size={18} className="section-icon" />
                        Key Features & Technologies
                      </h4>
                      <div className="metrics-grid">
                        {cs.metrics.map((metric, i) => (
                          <div key={i} className="metric-item">
                            <CheckCircle size={16} className="metric-icon" />
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="app-dev-tech-stack">
                      <h4>
                        <Wrench size={18} className="section-icon" />
                        Tech Stack
                      </h4>
                      <div className="tech-tags">
                        {getTechStack(cs.title).map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="app-dev-footer">
                    {cs.isDetailPage ? (
                      <Link 
                        to={cs.detailPath}
                        className="app-dev-cta" 
                      >
                        View Details <ArrowRight size={16} />
                      </Link>
                    ) : (
                      <button 
                        className="app-dev-cta" 
                        onClick={() => handleDownloadClick(cs)}
                      >
                        Download Case Study <Download size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            ))
          ) : (
            // Original layout for other services
            items.map((cs, idx) => (
            <SpotlightCard key={idx} className="webdev-service-card" style={{padding:0}}>
              <div
                style={{
                  display:'flex',
                  gap:'2rem',
                  alignItems:'stretch',
                  flexDirection: idx % 2 === 1 ? 'row-reverse' : 'row',
                }}
              >
                <div style={{flex:'1 1 45%', minWidth:0, overflow:'hidden'}}>
                  <img src={cs.img} alt={cs.title} style={{width:'100%', height:280, objectFit:'cover'}} />
                </div>
                <div style={{flex:'1 1 55%', padding:'2rem'}}>
                  <h3 style={{marginTop:0}}>{cs.title}</h3>
                  <p style={{marginBottom:'1rem'}}>{cs.summary}</p>
                  <ul className="webdev-service-features" style={{marginBottom:'1rem'}}>
                    {cs.metrics.map((m, i) => (
                      <li key={i}><CheckCircle size={16} />{m}</li>
                    ))}
                  </ul>
                  {cs.isDetailPage ? (
                    <Link 
                      to={cs.detailPath}
                      className="webdev-feature-cta" 
                      style={{background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'0.5rem', textDecoration:'none', color:'inherit'}}
                    >
                      View Details <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <button 
                      className="webdev-feature-cta" 
                      onClick={() => handleDownloadClick(cs)}
                      style={{background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'0.5rem'}}
                    >
                      Download <Download size={16} />
                    </button>
                  )}
                </div>
              </div>
            </SpotlightCard>
            ))
          )}
        </div>
      </section>

      {/* Download Popup Modal */}
      {showDownloadPopup && (
        <div className="download-popup-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="download-popup" style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '0',
            maxWidth: '480px',
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(106, 90, 241, 0.1)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #6a5af1, #a855f7)',
              padding: '2rem 2rem 1.5rem 2rem',
              borderRadius: '20px 20px 0 0',
              position: 'relative'
            }}>
              <button 
                onClick={handleClosePopup}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                <X size={18} />
              </button>
              
              <div style={{textAlign: 'center', color: 'white'}}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <Download size={28} />
                </div>
                <h2 style={{margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: '700'}}>
                  Download Case Study
                </h2>
                <p style={{margin: '0', opacity: '0.9', fontSize: '0.95rem'}}>
                  Get detailed insights from <strong>{selectedCaseStudy?.title}</strong>
                </p>
              </div>
            </div>

            {/* Content */}
            <div style={{padding: '2rem', flex: '1', overflowY: 'auto'}}>
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit}>
                  <div style={{marginBottom: '1.5rem'}}>
                    <label style={{
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#6a5af1'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <div style={{marginBottom: '1.5rem'}}>
                    <label style={{
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#6a5af1'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <div style={{marginBottom: '2rem'}}>
                    <label style={{
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name (optional)"
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#6a5af1'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '1rem 1.5rem',
                      background: isSubmitting 
                        ? 'linear-gradient(135deg, #9ca3af, #6b7280)' 
                        : 'linear-gradient(135deg, #6a5af1, #a855f7)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease',
                      boxShadow: isSubmitting 
                        ? '0 4px 12px rgba(0, 0, 0, 0.1)' 
                        : '0 4px 12px rgba(106, 90, 241, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 6px 16px rgba(106, 90, 241, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(106, 90, 241, 0.3)';
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                        Processing...
                      </>
                    ) : (
                      <>
                        Download Case Study
                        <Download size={16} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div style={{textAlign: 'center', padding: '1rem 0'}}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto',
                    fontSize: '2rem'
                  }}>
                    ✅
                  </div>
                  <h2 style={{margin: '0 0 1rem 0', color: '#1f2937', fontSize: '1.5rem', fontWeight: '700'}}>
                    Thank You!
                  </h2>
                  <p style={{margin: '0 0 1rem 0', color: '#6b7280', lineHeight: '1.6'}}>
                    The case study for <strong style={{color: '#374151'}}>{selectedCaseStudy?.title}</strong> will be sent to your email shortly.
                  </p>
                  <p style={{margin: '0', color: '#9ca3af', fontSize: '0.9rem'}}>
                    Check your inbox (and spam folder) for the download link.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Fragment>
  );
};

export default ServiceCase;
