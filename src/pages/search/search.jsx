import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Home, FileText, Briefcase, Users, Mail, Rocket } from 'lucide-react';
import './search.css';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Define searchable content
  const searchableContent = [
    {
      id: 'home',
      title: 'Home',
      description: 'Welcome to Socialsect - Your Digital Growth Partner',
      url: '/',
      category: 'Page',
      icon: Home
    },
    {
      id: 'about',
      title: 'About Us',
      description: 'Learn about our team, mission, and expertise in digital marketing',
      url: '/about-us',
      category: 'Page',
      icon: Users
    },
    {
      id: 'services',
      title: 'Services',
      description: 'Comprehensive digital marketing services including SEO, PPC, and more',
      url: '/services',
      category: 'Page',
      icon: Briefcase
    },
    {
      id: 'seo',
      title: 'SEO Services',
      description: 'Search Engine Optimization to improve your website visibility',
      url: '/services/seo',
      category: 'Service',
      icon: Search
    },
    {
      id: 'meta-ads',
      title: 'Meta Ads',
      description: 'Facebook and Instagram advertising campaigns',
      url: '/services/meta-ads',
      category: 'Service',
      icon: Briefcase
    },
    {
      id: 'website-growth',
      title: 'Website Growth',
      description: 'Strategies to grow your website traffic and conversions',
      url: '/services/website-growth',
      category: 'Service',
      icon: Rocket
    },
    {
      id: 'performance-marketing',
      title: 'Performance Marketing',
      description: 'Data-driven marketing campaigns for measurable results',
      url: '/services/performance-marketing',
      category: 'Service',
      icon: Briefcase
    },
    {
      id: 'website-development',
      title: 'Website Development',
      description: 'Custom website development and design services',
      url: '/services-overview/website-development',
      category: 'Service',
      icon: FileText
    },
    {
      id: 'app-development',
      title: 'App Development',
      description: 'Mobile and web application development',
      url: '/services/app-development',
      category: 'Service',
      icon: FileText
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch with our team for your digital marketing needs',
      url: '/contact',
      category: 'Page',
      icon: Mail
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Latest insights and tips on digital marketing',
      url: '/blog',
      category: 'Content',
      icon: FileText
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      description: 'Real results from our successful client campaigns',
      url: '/case-studies',
      category: 'Content',
      icon: FileText
    },
    {
      id: 'lets-build',
      title: "Let's Build",
      description: 'Start your digital transformation journey with us',
      url: '/lets-build',
      category: 'Page',
      icon: Rocket
    }
  ];

  useEffect(() => {
    if (searchTerm) {
      performSearch(searchTerm);
    }
  }, [searchTerm]);

  const performSearch = (term) => {
    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const results = searchableContent.filter(item =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.description.toLowerCase().includes(term.toLowerCase()) ||
        item.category.toLowerCase().includes(term.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
      performSearch(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
      setSearchResults([]);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Service':
        return '#6a5af1';
      case 'Page':
        return '#667eea';
      case 'Content':
        return '#764ba2';
      default:
        return '#4a5568';
    }
  };

  return (
    <>
      <Helmet>
        <title>Search Results{searchTerm ? ` for "${searchTerm}"` : ''} | Socialsect</title>
        <meta name="description" content="Search results for your query on Socialsect website" />
      </Helmet>

      <div className="search-page-container">
        <div className="search-page-content">
          {/* Search Header */}
          <motion.div 
            className="search-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Search Results</h1>
            <p>Find what you're looking for on our website</p>
          </motion.div>

          {/* Search Form */}
          <motion.form 
            className="search-form"
            onSubmit={handleSearch}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="search-input-container">
              <Search size={20} className="search-input-icon" />
              <input
                type="text"
                placeholder="Search for pages, services, or content..."
                value={searchTerm}
                onChange={handleInputChange}
                className="search-input"
                autoFocus
              />
              <button type="submit" className="search-submit-btn">
                Search
              </button>
            </div>
          </motion.form>

          {/* Search Results */}
          <motion.div 
            className="search-results"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {searchTerm && (
              <>
                {isSearching ? (
                  <div className="search-loading">
                    <div className="loading-spinner"></div>
                    <p>Searching...</p>
                  </div>
                ) : (
                  <>
                    <div className="results-header">
                      <h2>
                        {searchResults.length > 0 
                          ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} found for "${searchTerm}"`
                          : `No results found for "${searchTerm}"`
                        }
                      </h2>
                    </div>

                    {searchResults.length > 0 ? (
                      <div className="results-grid">
                        {searchResults.map((result, index) => {
                          const IconComponent = result.icon;
                          return (
                            <motion.div
                              key={result.id}
                              className="result-card"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                              <Link to={result.url} className="result-link">
                                <div className="result-icon">
                                  <IconComponent size={24} />
                                </div>
                                <div className="result-content">
                                  <h3>{result.title}</h3>
                                  <p>{result.description}</p>
                                  <span 
                                    className="result-category"
                                    style={{ color: getCategoryColor(result.category) }}
                                  >
                                    {result.category}
                                  </span>
                                </div>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="no-results">
                        <p>Try searching with different keywords or check out our popular pages:</p>
                        <div className="popular-suggestions">
                          <Link to="/services" className="suggestion-link">Services</Link>
                          <Link to="/about-us" className="suggestion-link">About Us</Link>
                          <Link to="/contact" className="suggestion-link">Contact</Link>
                          <Link to="/blog" className="suggestion-link">Blog</Link>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {!searchTerm && (
              <div className="search-placeholder">
                <h3>Start typing to search</h3>
                <p>Search for services, pages, or content on our website</p>
                <div className="search-suggestions">
                  <span className="suggestion-tag">SEO</span>
                  <span className="suggestion-tag">Marketing</span>
                  <span className="suggestion-tag">Development</span>
                  <span className="suggestion-tag">Contact</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Back Button */}
          <motion.div 
            className="search-actions"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button 
              className="btn btn-outline cursor-target"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
            <Link to="/" className="btn btn-primary cursor-target">
              <Home size={20} />
              Go Home
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
