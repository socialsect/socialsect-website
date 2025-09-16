"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

import "./testimonials.css";

// Simple utility function for className merging
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Testimonials = () => {
  const [videoError, setVideoError] = React.useState(false);

  const handleVideoError = () => {
    console.log('Video failed to load');
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoError(false);
  };

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "CEO, TechFlow Solutions",
      content: "Socialsect transformed our digital presence completely. Their web development and SEO strategies increased our organic traffic by 300% in just 6 months. The team's systematic approach and attention to detail is unmatched.",
      rating: 5
    },
    {
      name: "Marcus Chen",
      role: "Founder, GrowthLab Ventures",
      content: "The team's approach to performance marketing is exceptional. We saw a 250% ROI on our ad spend within the first quarter of working with them. Their data-driven strategies are exactly what we needed.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Marketing Director, InnovateTech",
      content: "Their systematic approach to digital strategy is exactly what we needed. The self-correcting systems they built have been game-changing for our growth. Highly recommend their services.",
      rating: 5
    },
    {
      name: "David Park",
      role: "CTO, CloudScale Systems",
      content: "The app development work exceeded our expectations. Clean code, scalable architecture, and delivered on time. The team's technical expertise is outstanding.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: "VP Marketing, Digital Dynamics",
      content: "Working with Socialsect has been a game-changer. Their content strategy and GTM approach helped us launch successfully in 3 new markets. Exceptional results!",
      rating: 5
    },
    {
      name: "James Foster",
      role: "Founder, NextGen Innovations",
      content: "Outstanding work on our website redesign. The conversion rate increased by 180% and our user engagement is through the roof. The team truly understands growth.",
      rating: 5
    },
    {
      name: "Maria Santos",
      role: "Head of Marketing, TechVision Corp",
      content: "Their SEO strategies are phenomenal. We went from page 3 to page 1 for our main keywords in just 4 months. The results speak for themselves.",
      rating: 5
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Hear from Our Clients</h2>
          <p className="testimonials-subtitle">
            Don't just take our word for it. See what our clients have to say about working with us.
          </p>
        </div>
        
        <div className="testimonials-content">
          <div className="testimonials-video">
            {!videoError ? (
              <video 
                className="testimonial-video-player"
                controls
                autoPlay
                loop
                playsInline
                muted
                onError={handleVideoError}
                onLoadedData={handleVideoLoad}
              >
                <source src="/testimonial.mp4" type="video/mp4" />
                <source src="./testimonial.mp4" type="video/mp4" />
                <source src="testimonial.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="video-fallback">
                <div className="video-placeholder">
                  <h3>Client Testimonial Video</h3>
                  <p>Video will be displayed here</p>
                  <button 
                    onClick={() => setVideoError(false)}
                    className="retry-button"
                  >
                    Retry Loading Video
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="testimonials-carousel">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  React.useEffect(() => {
    const interval = setInterval(nextTestimonial, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className="testimonials-simple-carousel"
    >
      <div className="testimonial-card">
        <div className="testimonial-rating">
          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
            <span key={i} className="star">★</span>
          ))}
        </div>
        <p className="testimonial-content">"{testimonials[currentIndex].content}"</p>
        <div className="testimonial-author">
          <h4 className="testimonial-name">{testimonials[currentIndex].name}</h4>
          <p className="testimonial-role">{testimonials[currentIndex].role}</p>
        </div>
      </div>
      
      <div className="testimonial-navigation">
        <button onClick={prevTestimonial} className="nav-button">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <button onClick={nextTestimonial} className="nav-button">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </motion.div>
  );
};

export default Testimonials;
