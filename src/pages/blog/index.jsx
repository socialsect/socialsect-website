import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Calendar, Clock, User, Tag, Filter } from 'lucide-react';
import './index.css';

const BlogIndex = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, selectedCategory]);

  const loadArticles = async () => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate loading the articles
      const articleData = [
        {
          id: "article-1",
          title: "The Future of Digital Marketing: AI-Powered Strategies",
          description: "Explore how artificial intelligence is revolutionizing digital marketing and what it means for businesses in 2024.",
          author: "Socialsect Team",
          date: "2024-12-15",
          category: "Digital Marketing",
          tags: ["AI", "Digital Marketing", "Strategy", "Technology"],
          featured: true,
          readTime: "8 min read",
          image: "/articles/article-1/image.jpg",
          slug: "future-digital-marketing-ai-powered-strategies"
        },
        {
          id: "article-2",
          title: "Building High-Converting Landing Pages: A Complete Guide",
          description: "Learn the essential elements and strategies for creating landing pages that convert visitors into customers.",
          author: "Socialsect Team",
          date: "2024-12-10",
          category: "Web Development",
          tags: ["Landing Pages", "Conversion", "UX", "Web Design"],
          featured: true,
          readTime: "6 min read",
          image: "/articles/article-2/image.jpg",
          slug: "building-high-converting-landing-pages-complete-guide"
        },
        {
          id: "article-3",
          title: "Mobile App Development Trends: What's Next in 2024",
          description: "Discover the latest trends and technologies shaping mobile app development in 2024 and beyond.",
          author: "Socialsect Team",
          date: "2024-12-05",
          category: "App Development",
          tags: ["Mobile Apps", "Technology", "Trends", "Development"],
          featured: false,
          readTime: "7 min read",
          image: "/articles/article-3/image.jpg",
          slug: "mobile-app-development-trends-2024"
        }
      ];
      
      setArticles(articleData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading articles:', error);
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = articles;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    setFilteredArticles(filtered);
  };

  const categories = ['All', ...new Set(articles.map(article => article.category))];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="loading-spinner"></div>
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="blog-listing-container">
      <Helmet>
        <title>Digital Marketing Blog | SEO, Web Development & Growth Insights – Socialsect</title>
        <meta name="description" content="Read the latest insights on digital marketing, SEO, web development, and growth strategies. Expert tips and case studies from Socialsect's digital marketing blog." />
        <meta name="keywords" content="digital marketing blog, SEO blog, web development blog, growth marketing insights, digital strategy blog, marketing tips, SEO tips" />
        <link rel="canonical" href="https://goSocialsect.com/blog" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/blog" />
        <meta property="og:title" content="Digital Marketing Blog | SEO, Web Development & Growth Insights – Socialsect" />
        <meta property="og:description" content="Read the latest insights on digital marketing, SEO, web development, and growth strategies. Expert tips and case studies from Socialsect's digital marketing blog." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/blog" />
        <meta property="twitter:title" content="Digital Marketing Blog | SEO, Web Development & Growth Insights – Socialsect" />
        <meta property="twitter:description" content="Read the latest insights on digital marketing, SEO, web development, and growth strategies. Expert tips and case studies from Socialsect's digital marketing blog." />
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
                "@type": "Blog",
                "@id": "https://goSocialsect.com/blog#blog",
                "name": "Socialsect Digital Marketing Blog",
                "description": "Read the latest insights on digital marketing, SEO, web development, and growth strategies. Expert tips and case studies from Socialsect's digital marketing blog.",
                "url": "https://goSocialsect.com/blog",
                "publisher": {
                  "@id": "https://goSocialsect.com/#organization"
                },
                "inLanguage": "en-US",
                "blogPost": [
                  {
                    "@type": "BlogPosting",
                    "headline": "The Future of Digital Marketing: AI-Powered Strategies",
                    "description": "Explore how artificial intelligence is revolutionizing digital marketing and what it means for businesses in 2024.",
                    "url": "https://goSocialsect.com/blog/the-future-of-digital-marketing-ai-powered-strategies",
                    "datePublished": "2024-12-15",
                    "author": {
                      "@type": "Organization",
                      "name": "Socialsect Team"
                    },
                    "publisher": {
                      "@id": "https://goSocialsect.com/#organization"
                    }
                  },
                  {
                    "@type": "BlogPosting",
                    "headline": "Building High-Converting Landing Pages: A Complete Guide",
                    "description": "Learn the essential elements and strategies for creating landing pages that convert visitors into customers.",
                    "url": "https://goSocialsect.com/blog/building-high-converting-landing-pages-complete-guide",
                    "datePublished": "2024-12-10",
                    "author": {
                      "@type": "Organization",
                      "name": "Socialsect Team"
                    },
                    "publisher": {
                      "@id": "https://goSocialsect.com/#organization"
                    }
                  },
                  {
                    "@type": "BlogPosting",
                    "headline": "Mobile App Development Trends: What's Next in 2024",
                    "description": "Discover the latest trends and technologies shaping mobile app development in 2024 and beyond.",
                    "url": "https://goSocialsect.com/blog/mobile-app-development-trends-whats-next-2024",
                    "datePublished": "2024-12-05",
                    "author": {
                      "@type": "Organization",
                      "name": "Socialsect Team"
                    },
                    "publisher": {
                      "@id": "https://goSocialsect.com/#organization"
                    }
                  }
                ]
              },
              {
                "@type": "WebPage",
                "@id": "https://goSocialsect.com/blog#webpage",
                "url": "https://goSocialsect.com/blog",
                "name": "Digital Marketing Blog | SEO, Web Development & Growth Insights – Socialsect",
                "description": "Read the latest insights on digital marketing, SEO, web development, and growth strategies. Expert tips and case studies from Socialsect's digital marketing blog.",
                "isPartOf": {
                  "@id": "https://goSocialsect.com/#website"
                },
                "about": {
                  "@id": "https://goSocialsect.com/blog#blog"
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
                      "name": "Blog",
                      "item": "https://goSocialsect.com/blog"
                    }
                  ]
                }
              }
            ]
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="blog-hero-section">
        <div className="blog-hero-wrapper">
          <div className="blog-hero-content">
            <h1 className="blog-hero-title">Insights & Expertise</h1>
            <p className="blog-hero-subtitle">
              Stay ahead with the latest trends, strategies, and insights from our team of experts
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="blog-filters-section">
        <div className="blog-filters-wrapper">
          <div className="blog-search-container">
            <Search className="blog-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="blog-search-input"
            />
          </div>
          
          <div className="blog-category-container">
            <Filter className="blog-filter-icon" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="blog-category-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {selectedCategory === 'All' && searchTerm === '' && (
        <section className="blog-featured-section">
          <div className="blog-featured-wrapper">
            <h2 className="blog-section-title">Featured Articles</h2>
            <div className="blog-featured-grid">
              {articles.filter(article => article.featured).map(article => (
                <Link key={article.id} to={`/blog/${article.slug}`} className="blog-featured-card cursor-target">
                  <div className="blog-featured-image">
                    <img src={article.image} alt={article.title} />
                    <div className="blog-featured-badge">Featured</div>
                  </div>
                  <div className="blog-featured-content">
                    <div className="blog-article-meta">
                      <span className="blog-article-category">{article.category}</span>
                      <span className="blog-article-date">{formatDate(article.date)}</span>
                    </div>
                    <h3 className="blog-featured-title">{article.title}</h3>
                    <p className="blog-featured-description">{article.description}</p>
                    <div className="blog-article-footer">
                      <div className="blog-article-author">
                        <User size={16} />
                        <span>{article.author}</span>
                      </div>
                      <div className="blog-article-read-time">
                        <Clock size={16} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* All Articles */}
      <section className="blog-articles-section">
        <div className="blog-articles-wrapper">
          <h2 className="blog-section-title">
            {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
            {searchTerm && ` - "${searchTerm}"`}
          </h2>
          
          {filteredArticles.length === 0 ? (
            <div className="blog-no-articles">
              <p>No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="blog-articles-grid">
              {filteredArticles.map(article => (
                <Link key={article.id} to={`/blog/${article.slug}`} className="blog-article-card cursor-target">
                  <div className="blog-article-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <div className="blog-article-content">
                    <div className="blog-article-meta">
                      <span className="blog-article-category">{article.category}</span>
                      <span className="blog-article-date">{formatDate(article.date)}</span>
                    </div>
                    <h3 className="blog-article-title">{article.title}</h3>
                    <p className="blog-article-description">{article.description}</p>
                    <div className="blog-article-tags">
                      {article.tags.map(tag => (
                        <span key={tag} className="blog-tag">
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="blog-article-footer">
                      <div className="blog-article-author">
                        <User size={16} />
                        <span>{article.author}</span>
                      </div>
                      <div className="blog-article-read-time">
                        <Clock size={16} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="blog-newsletter-section">
        <div className="blog-newsletter-wrapper">
          <div className="blog-newsletter-content">
            <h2>Stay Updated</h2>
            <p>Get the latest insights delivered to your inbox</p>
            <div className="blog-newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <a href="/lets-build" className="blog-newsletter-button cursor-target">Subscribe</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogIndex;
