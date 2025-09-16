import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Facebook, ArrowRight, Github, CheckCircle, AlertCircle } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import './contact-form.css';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      formType: 'contact'
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
        e.target.reset(); // Clear the form
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

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2 className="contact-title">Ready to grow your business?</h2>
          <p className="contact-description">
            Let's build something amazing together. Whether you have a project in mind or just want to chat about digital possibilities, we're here to help you succeed.
          </p>
          
          <div className="contact-methods">
      
          
            
           
         
          </div>
          
          <div className="social-links">
            <p className="social-text">Follow us on</p>
            <div className="social-icons">
              <a href="https://www.instagram.com/gosocialsect?igsh=MXVsaTI4bHI0enAxdA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="cursor-target">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/socialsect/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="cursor-target">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/socialsect" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="cursor-target">
                <Github size={18} />
              </a>
              <a href="https://m.facebook.com/thesocialsectofficial/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="cursor-target">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/rayexplains?s=11" target="_blank" rel="noopener noreferrer" aria-label="X" className="cursor-target">
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name"  id='seo-contact-form'>Your Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Enter your name" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">What can we help you with?</label>
            <select 
              id="subject" 
              name="subject" 
              required
              className="form-select"
            >
              <option value="">Select an option</option>
              <option value="web-development">Web Development</option>
              <option value="seo">SEO Services</option>
            <option value="meta-ads">Meta Ads</option>
            <option value="website-growth">Website Growth Systems</option>
              <option value="app-development">App Development</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="other">Something else</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Tell us more</label>
            <textarea 
              id="message" 
              name="message" 
              rows="4" 
              placeholder="Share details about your project or inquiry..." 
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn cursor-target-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Get Started'}
            <ArrowRight size={16} className="btn-icon" />
          </button>

          {submitStatus === 'success' && (
            <div className="status-message success">
              <CheckCircle size={20} />
              <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="status-message error">
              <AlertCircle size={20} />
              <span>Sorry, there was an error sending your message. Please try again or contact us directly.</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
