import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import './services/website-development.css';
import './contact.css';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import ContactForm from '../components/contact-form/ContactForm';
import SpotlightCard from '../components/spotlight-card/card';

const ContactPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Contact Socialsect - Get Your Digital Growth Strategy | Free Consultation</title>
        <meta name="description" content="Contact Socialsect for expert digital marketing services. Get a free consultation for web development, SEO, app development, and performance marketing. Let's discuss your goals." />
        <meta name="keywords" content="contact Socialsect, digital marketing consultation, web development consultation, SEO consultation, free consultation, digital strategy consultation" />
        <link rel="canonical" href="https://goSocialsect.com/contact" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/contact" />
        <meta property="og:title" content="Contact Socialsect - Get Your Digital Growth Strategy | Free Consultation" />
        <meta property="og:description" content="Contact Socialsect for expert digital marketing services. Get a free consultation for web development, SEO, app development, and performance marketing." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/contact" />
        <meta property="twitter:title" content="Contact Socialsect - Get Your Digital Growth Strategy | Free Consultation" />
        <meta property="twitter:description" content="Contact Socialsect for expert digital marketing services. Get a free consultation for web development, SEO, app development, and performance marketing." />
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
                "@type": "ContactPage",
                "@id": "https://goSocialsect.com/contact#webpage",
                "url": "https://goSocialsect.com/contact",
                "name": "Contact Socialsect - Get Your Digital Growth Strategy | Free Consultation",
                "description": "Contact Socialsect for expert digital marketing services. Get a free consultation for web development, SEO, app development, and performance marketing.",
                "isPartOf": {
                  "@id": "https://goSocialsect.com/#website"
                },
                "mainEntity": {
                  "@id": "https://goSocialsect.com/#organization"
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
                      "name": "Contact",
                      "item": "https://goSocialsect.com/contact"
                    }
                  ]
                }
              },
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
                "description": "Digital growth partner specializing in web development, SEO, app development, and digital strategy.",
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "contactType": "customer service",
                    "url": "https://goSocialsect.com/contact",
                    "availableLanguage": "English"
                  },
                  {
                    "@type": "ContactPoint",
                    "contactType": "sales",
                    "url": "https://goSocialsect.com/contact",
                    "availableLanguage": "English"
                  }
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "US"
                },
                "sameAs": [
                  "https://goSocialsect.com",
                  "https://goSocialsect.com/about-us",
                  "https://goSocialsect.com/services"
                ]
              }
            ]
          })}
        </script>
      </Helmet>
      {/* Hero */}
      <section className="webdev-hero">
        <div className="webdev-hero-content">
          <h1 className="webdev-hero-title">
            Contact <span className="highlight">Socialsect</span>
          </h1>
          <p className="webdev-hero-subtitle">
            Let’s talk about your goals. Our team will craft a tailored plan to design, build, and grow your digital presence.
          </p>
          <div className="webdev-cta-buttons">
            <a href="#contact" className="webdev-cta-primary cursor-target">
              Start Your Project
              <ArrowRight size={20} />
            </a>
            <a href="/services" className="webdev-cta-secondary cursor-target">Explore Services</a>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="contact-info-header">
          <h2>Contact Socialsect</h2>
          <p>Expert Partnership in Web, SEO, Apps & Growth Systems</p>
        </div>
        
        <div className="contact-description">
          <p>
            At Socialsect, we help founders and organizations achieve deterministic growth in markets where clarity and performance are non-negotiable. Whether you're scaling an existing business, launching a product, or restructuring your digital strategy, our team is ready to architect the system and deliver measurable outcomes.
          </p>
        </div>

        <div className="contact-cards-grid">
          <div className="contact-card cursor-target">
            <div className="contact-card-icon">
              <Mail size={32} />
            </div>
            <h3>Email</h3>
            <p>Get in touch with our team directly</p>
            <ul className="contact-card-list">
              <li><CheckCircle size={16} /> info@gosocialsect.com</li>
              <li><CheckCircle size={16} /> sales@gosocialsect.com</li>
            </ul>
          </div>
          
          <div className="contact-card cursor-target">
            <div className="contact-card-icon">
              <Phone size={32} />
            </div>
            <h3>Phone</h3>
            <p>Speak directly with our strategy team</p>
            <ul className="contact-card-list">
              <li><CheckCircle size={16} /> Available upon request</li>
              <li><CheckCircle size={16} /> Operating globally with remote availability</li>
            </ul>
          </div>
          
          <div className="contact-card cursor-target">
            <div className="contact-card-icon">
              <MapPin size={32} />
            </div>
            <h3>Location</h3>
            <p>Our headquarters and global presence</p>
            <ul className="contact-card-list">
              <li><CheckCircle size={16} /> 447 Broadway 2nd floor, New York, NY 10013, United States</li>
              <li><CheckCircle size={16} /> Operating globally with remote availability</li>
            </ul>
          </div>
        </div>

        <div className="contact-cta">
          <p>
            If precision, accountability, and engineered growth define your vision — let's begin the conversation.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <div id="contact">
        <ContactForm />
      </div>

      {/* CTA */}
      <section className="webdev-bottom-cta">
        <div className="webdev-cta-content">
          <h2>Ready to Build Something Remarkable?</h2>
          <p>Share your vision — we’ll bring the strategy, design, and engineering to make it real.</p>
          <div className="webdev-cta-buttons">
            <a href="mailto:info@gosocialsect.com" className="webdev-cta-primary cursor-target">
              Send a Message
              <ArrowRight size={20} />
            </a>
            <a href="/services" className="webdev-cta-secondary cursor-target">View Our Services</a>
          </div>
        </div>
      </section>

    </Fragment>
  );
};

export default ContactPage;


