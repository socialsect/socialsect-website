import React, { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  Clock,
  Award,
  Users,
  Code,
  Heart,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import "./footer.css";

const Footer = () => {
  const footerRef = useRef(null);
  const [expandedDropdowns, setExpandedDropdowns] = useState({});

  const handleMouseMove = (e) => {
    const footer = footerRef.current;
    if (!footer) return;

    const rect = footer.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    footer.style.setProperty("--mouse-x", `${x}%`);
    footer.style.setProperty("--mouse-y", `${y}%`);
  };

  const toggleDropdown = (dropdown) => {
    setExpandedDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="footer-spotlight"
      onMouseMove={handleMouseMove}
    >
      <div className="footer-content">
        {/* Column 1 - Main Pages */}
        <div className="footer-col">
          <h3>Company</h3>
          <ul className="footer-links">
            <li><a href="/about-us" className="cursor-target">About Us</a></li>
            <li><a href="/contact" className="cursor-target">Contact</a></li>
            <li><a href="/services" className="cursor-target">Services</a></li>
            <li><a href="/lets-build" className="cursor-target">Let's Build</a></li>
            <li><a href="/case-studies" className="cursor-target">Case Studies</a></li>
            <li><a href="/blog" className="cursor-target">Blog</a></li>
          </ul>
        </div>

        {/* Column 2 - Our Services */}
        <div className="footer-col">
          <h3>Our Services</h3>
          <ul className="footer-links">
            <li><a href="/services/seo" className="cursor-target">SEO Services</a></li>
            <li><a href="/services/meta-ads" className="cursor-target">Meta Ads</a></li>
            <li><a href="/services-overview/website-development" className="cursor-target">Website Development</a></li>
            <li><a href="/services/website-growth" className="cursor-target">Website Growth</a></li>
            <li><a href="/services/performance-marketing" className="cursor-target">Performance Marketing</a></li>
            <li><a href="/services/content-strategy" className="cursor-target">Content Strategy</a></li>
            <li><a href="/services/app-development" className="cursor-target">App Development</a></li>
            <li><a href="/services/gtm" className="cursor-target">Go-to-Market</a></li>
          </ul>
        </div>

        {/* Column 3 - Case Studies */}
        <div className="footer-col">
          <h3>Case Studies</h3>
          <div className="dropdown-section">
            <button 
              className="dropdown-toggle cursor-target"
              onClick={() => toggleDropdown('seo')}
            >
              SEO Case Studies
              {expandedDropdowns.seo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expandedDropdowns.seo && (
              <ul className="dropdown-links">
                <li><a href="/case-studies/seo" className="cursor-target">SEO Case Studies</a></li>
                <li><a href="/services/seo" className="cursor-target">SEO Services</a></li>
                <li><a href="/blog" className="cursor-target">SEO Blog Posts</a></li>
              </ul>
            )}
            
            <button 
              className="dropdown-toggle cursor-target"
              onClick={() => toggleDropdown('marketing')}
            >
              Marketing Case Studies
              {expandedDropdowns.marketing ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expandedDropdowns.marketing && (
              <ul className="dropdown-links">
                <li><a href="/case-studies/performance-marketing" className="cursor-target">Performance Marketing</a></li>
                <li><a href="/case-studies/content-strategy" className="cursor-target">Content Strategy</a></li>
                <li><a href="/services/meta-ads" className="cursor-target">Meta Ads Services</a></li>
                <li><a href="/services/performance-marketing" className="cursor-target">Performance Marketing Services</a></li>
              </ul>
            )}
            
            <button 
              className="dropdown-toggle cursor-target"
              onClick={() => toggleDropdown('development')}
            >
              Development Case Studies
              {expandedDropdowns.development ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            {expandedDropdowns.development && (
              <ul className="dropdown-links">
                <li><a href="/case-studies/website-development" className="cursor-target">Website Development</a></li>
                <li><a href="/case-studies/app-development" className="cursor-target">App Development</a></li>
                <li><a href="/case-studies/website-growth" className="cursor-target">Website Growth</a></li>
                <li><a href="/services-overview/website-development" className="cursor-target">Web Dev Services</a></li>
              </ul>
            )}
          </div>
        </div>

        {/* Column 4 - Blog */}
        <div className="footer-col">
          <h3>Blog</h3>
          <ul className="footer-links">
            <li><a href="/blog" className="cursor-target">All Posts</a></li>
            <li><a href="/case-studies" className="cursor-target">Case Studies</a></li>
            <li><a href="/services" className="cursor-target">Our Services</a></li>
            <li><a href="/about-us" className="cursor-target">About Us</a></li>
            <li><a href="/contact" className="cursor-target">Contact</a></li>
            <li><a href="/lets-build" className="cursor-target">Get Started</a></li>
          </ul>
            </div>
          
        {/* Column 5 - Company Description */}
        <div className="footer-col footer-description-col">
          <h3>About Socialsect</h3>
          <div className="company-description">
            <p>
              Socialsect is a boutique digital growth studio that designs and deploys 
              end-to-end systems across web & app development, advanced SEO, paid media, 
              and go-to-market strategy. We blend deterministic marketing frameworks with 
              creative infrastructure, ensuring every campaign is measurable, scalable, 
              and revenue-focused for founders who value clarity and growth engineered with intent.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Social Links & Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="social-links">
            <a href="https://www.instagram.com/gosocialsect?igsh=MXVsaTI4bHI0enAxdA==" target="_blank" rel="noreferrer" className="cursor-target" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/socialsect/" target="_blank" rel="noreferrer" className="cursor-target" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/socialsect" target="_blank" rel="noreferrer" className="cursor-target" aria-label="GitHub">
              <Code size={20} />
            </a>
            <a href="https://m.facebook.com/thesocialsectofficial/" target="_blank" rel="noreferrer" className="cursor-target" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://x.com/rayexplains?s=11" target="_blank" rel="noreferrer" className="cursor-target" aria-label="X">
              <FaXTwitter size={20} />
            </a>
          </div>
          
          <div className="footer-info">
        <p>&copy; {currentYear} Socialsect. All rights reserved.</p>
          <div className="legal-links">
              <a href="/privacy-policy" className="cursor-target">Privacy Policy</a>
              <a href="/terms-conditions" className="cursor-target">Terms & Conditions</a>
              <a href="/terms-service" className="cursor-target">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;