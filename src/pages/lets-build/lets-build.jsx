import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import ReactLenis from 'lenis/react';
import { Github, Facebook, Linkedin, Instagram, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import { Skiper49 } from '../../components/carousel/Carousel';
import './lets-build.css'
;
import TrueFocus from '../../components/truefocus/focus';

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  return (
    <motion.span
      className={`inline-block text-orange-500 ${isSpace ? 'w-4' : ''}`}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  );
};


const Bracket = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};

const LetsBuildPage = () => {
  const targetRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const text = "see more from socialsect";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const handleCTAClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSubmitStatus(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      formType: 'cta'
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        e.target.reset();
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
        console.error('Error:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Let's Build | Custom Digital Solutions – Socialsect",
    "description": "Ready to build something amazing? Let's create custom digital solutions together. From web development to mobile apps, we bring your ideas to life with cutting-edge technology and innovative design.",
    "url": "https://goSocialsect.com/lets-build",
    "mainEntity": {
      "@type": "Service",
      "name": "Custom Digital Solutions",
      "description": "Comprehensive digital development services including web development, mobile apps, and custom software solutions.",
      "provider": {
        "@type": "Organization",
        "name": "Socialsect",
        "url": "https://goSocialsect.com"
      }
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
          "name": "Let's Build",
          "item": "https://goSocialsect.com/lets-build"
        }
      ]
    }
  };

  return (
    <div className="lets-build-page">
      <Helmet>
        <title>Let's Build | Custom Digital Solutions – Socialsect</title>
        <meta name="description" content="Ready to build something amazing? Let's create custom digital solutions together. From web development to mobile apps, we bring your ideas to life with cutting-edge technology and innovative design." />
        <meta name="keywords" content="let's build, custom development, digital solutions, web development, mobile apps, software development, technology consulting, project collaboration" />
        <link rel="canonical" href="https://goSocialsect.com/lets-build" />
        <meta property="og:title" content="Let's Build | Custom Digital Solutions – Socialsect" />
        <meta property="og:description" content="Ready to build something amazing? Let's create custom digital solutions together. From web development to mobile apps, we bring your ideas to life with cutting-edge technology and innovative design." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/lets-build" />
        <meta property="og:image" content="https://goSocialsect.com/images/og-lets-build.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Let's Build | Custom Digital Solutions – Socialsect" />
        <meta name="twitter:description" content="Ready to build something amazing? Let's create custom digital solutions together. From web development to mobile apps, we bring your ideas to life with cutting-edge technology and innovative design." />
        <meta name="twitter:image" content="https://goSocialsect.com/images/og-lets-build.jpg" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div>
        <main className="w-full bg-white" style={{ position: 'relative', zIndex: 1 }}>
          {/* Hero section with minimalistic heading */}
          <section id="hero-section">
            <div id="hero-indicator">
              <span>Scroll to see more</span>
          </div>

<TrueFocus 
sentence="Ready to Build?"
manualMode={false }
blurAmount={5}
borderColor="black"
animationDuration={2}
pauseBetweenAnimations={1}
textColor="black"
/>
          </section>

          {/* First section - Text animation */}
          <section
            ref={targetRef}
            id="heading-section"
            aria-label="Main heading animation"
          >
            <div
              id="heading-text"
              style={{
                perspective: "500px",
              }}
            >
              {characters.map((char, index) => (
                <CharacterV1
                  key={`char-v1-${index}`}
                  char={char}
                  index={index}
                  centerIndex={centerIndex}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </section>

          {/* Carousel section */}
          <motion.section 
            id="carousel-section"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Skiper49 />
          </motion.section>

          {/* Testimonial Video Section */}
          <motion.section 
            id="testimonial-section"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              id="testimonial-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2 
                id="testimonial-heading"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                What Our Clients Say
              </motion.h2>
              <motion.p 
                id="testimonial-subtitle"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Hear from our satisfied clients about their experience working with us
              </motion.p>
              <motion.div 
                id="video-container"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <video
                  id="testimonial-video"
                  controls
                  preload="metadata"
                  poster="/thumbnail.png"
                >
                  <source src="/testimonial.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            id="cta-section"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              id="cta-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2 
                id="cta-heading"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Let's Build Something Amazing Together
              </motion.h2>
              <motion.p 
                id="cta-description"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Ready to bring your ideas to life? Get in touch with us and let's create something extraordinary.
              </motion.p>
              <motion.button 
                id="cta-button"
                className="cursor-target-button"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCTAClick}
              >
                Start Your Project
              </motion.button>
              <motion.div 
                id="social-icons"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.a 
                  href="https://github.com/socialsect" 
                  className="social-link cursor-target"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </motion.a>
                <motion.a 
                  href="https://m.facebook.com/thesocialsectofficial/" 
                  className="social-link cursor-target"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/company/socialsect/" 
                  className="social-link cursor-target"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com/gosocialsect?igsh=MXVsaTI4bHI0enAxdA==" 
                  className="social-link cursor-target"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </motion.a>
                <motion.a 
                  href="https://x.com/rayexplains?s=11" 
                  className="social-link cursor-target"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="X"
                >
                  <FaXTwitter size={24} />
                </motion.a>
                <motion.a 
                  href="mailto:rayanshofficial@gmail.com" 
                  className="social-link cursor-target"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Email"
                >
                  <Mail size={24} />
                </motion.a>
                <motion.a 
                  href="tel:+16317926023" 
                  className="social-link cursor-target"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Phone"
                >
                  <Phone size={24} />
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.section>
        </main>

        {/* CTA Modal */}
        {isModalOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
          >
            <motion.div 
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close cursor-target-button" onClick={handleModalClose}>
                <X size={24} />
              </button>
              
              <h2 className="modal-title">Start Your Project</h2>
              <p className="modal-subtitle">
                Tell us about your project and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleFormSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="modal-name">Your Name</label>
                  <input 
                    type="text" 
                    id="modal-name" 
                    name="name" 
                    placeholder="Enter your name" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="modal-email">Email Address</label>
                  <input 
                    type="email" 
                    id="modal-email" 
                    name="email" 
                    placeholder="Enter your email" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="modal-message">Project Details</label>
                  <textarea 
                    id="modal-message" 
                    name="message" 
                    rows="4" 
                    placeholder="Tell us about your project, goals, and timeline..." 
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="modal-submit cursor-target-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="modal-status success">
                    <CheckCircle size={20} />
                    <span>Thank you! We'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="modal-status error">
                    <AlertCircle size={20} />
                    <span>Sorry, there was an error. Please try again.</span>
                  </div>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LetsBuildPage;