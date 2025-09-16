import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, RefreshCw } from 'lucide-react';
import './404.css';

const NotFound = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Socialsect</title>
        <meta name="description" content="The page you're looking for doesn't exist. Let's get you back on track with Socialsect." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="not-found-container">
        <div className="not-found-content">
          {/* Animated 404 Number */}
          <motion.div 
            className="error-number"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            404
          </motion.div>

          {/* Error Message */}
          <motion.div 
            className="error-message"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1>Oops! Page Not Found</h1>
            <p>
              The page you're looking for seems to have vanished into the digital void. 
              Don't worry, even the best websites have missing pages sometimes.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="action-buttons"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/" className="btn btn-primary cursor-target">
              <Home size={20} />
              Go Home
            </Link>
            
            <button 
              className="btn btn-secondary cursor-target"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
            
            <button 
              className="btn btn-outline cursor-target"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={20} />
              Refresh
            </button>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div 
            className="search-suggestion"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <form onSubmit={handleSearch}>
              <div className="search-box">
                <Search size={20} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search for what you're looking for..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </motion.div>

          {/* Popular Links */}
          <motion.div 
            className="popular-links"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h3>Popular Pages</h3>
            <div className="links-grid">
              <Link to="/services" className="popular-link cursor-target">
                <span>Services</span>
              </Link>
              <Link to="/about-us" className="popular-link cursor-target">
                <span>About Us</span>
              </Link>
              <Link to="/contact" className="popular-link cursor-target">
                <span>Contact</span>
              </Link>
              <Link to="/lets-build" className="popular-link cursor-target">
                <span>Let's Build</span>
              </Link>
              <Link to="/blog" className="popular-link cursor-target">
                <span>Blog</span>
              </Link>
              <Link to="/case-studies" className="popular-link cursor-target">
                <span>Case Studies</span>
              </Link>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="floating-elements">
            <motion.div 
              className="floating-icon icon-1"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🔍
            </motion.div>
            <motion.div 
              className="floating-icon icon-2"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              💡
            </motion.div>
            <motion.div 
              className="floating-icon icon-3"
              animate={{ 
                y: [0, -25, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              🚀
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
