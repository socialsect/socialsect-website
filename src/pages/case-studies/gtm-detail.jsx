import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Users, Target, TrendingUp, BarChart3 } from 'lucide-react';
import './gtm-detail.css';

const GTMDetail = () => {
  const caseStudies = [
    {
      id: 'project-a',
      title: 'Project A (EdTech-LMS Style Client)',
      sector: 'Education / LMS / Teacher-Student Tools',
      services: 'GTM Strategy, Product Positioning, Channel Setup',
      strategy: {
        targetAudience: 'K-12 Teachers + School Administrators in English-speaking markets. Secondary: students & parents.',
        valueProposition: 'Combines assignment & quiz distribution, class communication, and progress tracking into one platform — simple for non-tech teachers; secure & trustworthy.',
        messagingPillars: 'Save time • Engage students • Data-backed insights • Safe classroom collaboration',
        channels: '• Referrals via school networks\n• Content marketing (blogs/tutorials for educators)\n• SEO for queries like "how to assign quizzes online" / "best class communication tool"\n• Paid ads targeting teacher groups & administrators',
        launchPhases: '1. Pilot with select schools + case studies ▪ 2. Use pilots for social proof, expand via organic & paid ▪ 3. Partner with curriculum providers / NGOs to scale',
        retentionUpsell: 'Strong onboarding + teacher training; build community forums; upsell from free/basic → premium tiers (analytics, more storage, advanced features)',
        metrics: 'Teacher sign-ups; number of quizzes/assignments created; engagement (login, participation); churn rate at school level; conversion rate (free → paid)'
      }
    },
    {
      id: 'project-b',
      title: 'Project B (Tutoring / Tutor Management SaaS)',
      sector: 'Tutoring / Tutor Management System',
      services: 'GTM Consulting, Paid Ads, SEO, Funnel Optimization',
      strategy: {
        targetAudience: 'Tutors, tutoring centers, and parents looking for tutors — structured schedules & on-demand sessions.',
        valueProposition: 'Simplifies scheduling, payments, and tutor-matching; reduces friction for both tutors & students; secure & scalable.',
        messagingPillars: 'Ease of use • Save management time • Trust & safety • Scalable growth',
        channels: '• Paid social (case-studies / success stories)\n• Google Ads around tutor / center search terms\n• SEO content ("how to manage tutoring students", "tutor platform tips")\n• Partnerships / affiliate marketing with tutoring influencers & communities',
        launchPhases: '1. MVP & early adopters (tutoring centers)\n2. Collect feedback, improve UX & onboarding\n3. Scale via paid + content + partnerships',
        retentionUpsell: 'Premium features (analytics, promotions, better matching), active support, create community of top tutors, possibly add marketplace features for reputation / trust',
        metrics: 'Number of tutors onboarded; active student count; booking volume; tutor/student churn; cost per acquisition (CPA)'
      }
    },
    {
      id: 'project-c',
      title: 'Project C (Peer Learning / Community Education Platform)',
      sector: 'Peer Learning / Community Education',
      services: 'GTM Strategy, UX Review, Content Strategy',
      strategy: {
        targetAudience: 'Learners wanting peer-feedback, group learning, hobbyists and semi-pros who value collaboration.',
        valueProposition: 'More than just content — structured peer engagement, group projects, community accountability.',
        messagingPillars: 'Learn with others • Accountability • Hands-on projects • Inclusive of skill levels',
        channels: '• Community platforms (Slack, Discord, Reddit) for early adopters\n• SEO content around group-learning, shared projects\n• Influencer / creator partnerships showcasing community outcomes\n• Workshop / bootcamp promos',
        launchPhases: '1. Invite-only beta to build culture & feedback loop\n2. Showcase success stories, optimize onboarding\n3. Open membership + upsell mentorship / certificates / premium features',
        retentionUpsell: 'Regular challenges/events, mentorship, content leaders, badges or certificates, social proof & peer recognition',
        metrics: 'Active user sessions; repeat engagement; user generated content; membership retention; premium conversions'
      }
    },
    
  ];

  const formatTextWithBullets = (text) => {
    return text.split('\n').map((line, index) => (
      <div key={index} className="gtm-bullet-point">
        {line.startsWith('•') ? line : `• ${line}`}
      </div>
    ));
  };

  return (
    <Fragment>
      <Helmet>
        <title>GTM Strategy Case Studies | Go-To-Market Success Stories – Socialsect</title>
        <meta name="description" content="Explore our comprehensive GTM strategy case studies across EdTech, SaaS, and community platforms. See how we drive successful product launches and market adoption." />
        <meta name="keywords" content="GTM strategy case studies, go-to-market strategy, product launch, market positioning, channel strategy, SaaS GTM" />
        <link rel="canonical" href="https://goSocialsect.com/case-studies/gtm" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://goSocialsect.com/case-studies/gtm" />
        <meta property="og:title" content="GTM Strategy Case Studies | Go-To-Market Success Stories – Socialsect" />
        <meta property="og:description" content="Explore our comprehensive GTM strategy case studies across EdTech, SaaS, and community platforms." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/case-studies/gtm" />
        <meta property="twitter:title" content="GTM Strategy Case Studies | Go-To-Market Success Stories – Socialsect" />
        <meta property="twitter:description" content="Explore our comprehensive GTM strategy case studies across EdTech, SaaS, and community platforms." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="gtm-detail-container">
        {/* Header Section */}
        <header className="gtm-header">
          <div className="gtm-header-content">
            <Link to="/case-studies" className="gtm-back-button cursor-target-button">
              <ArrowLeft size={20} />
              Back to Case Studies
            </Link>
            
            <div className="gtm-hero">
              <div className="gtm-hero-badge">
                <Target size={16} />
                GTM Strategy Case Studies
              </div>
              <h1 className="gtm-hero-title">
                Go-To-Market Strategy Summaries
              </h1>
              <p className="gtm-hero-subtitle">
                All names redacted under NDA — clients anonymized.
              </p>
              <p className="gtm-hero-description">
                Comprehensive GTM strategies across EdTech, SaaS, and community platforms. 
                See how we plan, execute, and measure successful product launches.
              </p>
            </div>
          </div>
        </header>

        {/* Case Studies Section */}
        <main className="gtm-main">
          <div className="gtm-content">
            {caseStudies.map((project, index) => (
              <section key={project.id} className="gtm-case-study cursor-target-large">
                <div className="gtm-case-header">
                  <div className="gtm-case-number">Project {String.fromCharCode(65 + index)}</div>
                  <h2 className="gtm-case-title">{project.title}</h2>
                  <div className="gtm-case-meta">
                    <div className="gtm-meta-item">
                      <span className="gtm-meta-label">Sector:</span>
                      <span className="gtm-meta-value">{project.sector}</span>
                    </div>
                    <div className="gtm-meta-item">
                      <span className="gtm-meta-label">Services:</span>
                      <span className="gtm-meta-value">{project.services}</span>
                    </div>
                  </div>
                </div>

                <div className="gtm-strategy-table">
                  <div className="gtm-table-header">
                    <h3>Strategy Summary</h3>
                  </div>
                  
                  <div className="gtm-table-content">
                    <div className="gtm-table-row cursor-target">
                      <div className="gtm-table-cell gtm-table-label">
                        <Users size={18} />
                        Target Audience
                      </div>
                      <div className="gtm-table-cell gtm-table-value">
                        {project.strategy.targetAudience}
                      </div>
                    </div>

                    <div className="gtm-table-row cursor-target">
                      <div className="gtm-table-cell gtm-table-label">
                        <Target size={18} />
                        Value Proposition
                      </div>
                      <div className="gtm-table-cell gtm-table-value">
                        {project.strategy.valueProposition}
                      </div>
                    </div>

                    <div className="gtm-table-row cursor-target">
                      <div className="gtm-table-cell gtm-table-label">
                        <TrendingUp size={18} />
                        Key Messaging Pillars
                      </div>
                      <div className="gtm-table-cell gtm-table-value">
                        {project.strategy.messagingPillars}
                      </div>
                    </div>

                    <div className="gtm-table-row cursor-target">
                      <div className="gtm-table-cell gtm-table-label">
                        <BarChart3 size={18} />
                        Channels
                      </div>
                      <div className="gtm-table-cell gtm-table-value">
                        {formatTextWithBullets(project.strategy.channels)}
                      </div>
                    </div>

                    <div className="gtm-table-row cursor-target">
                      <div className="gtm-table-cell gtm-table-label">
                        <TrendingUp size={18} />
                        Launch Phases
                      </div>
                      <div className="gtm-table-cell gtm-table-value">
                        {project.strategy.launchPhases}
                      </div>
                    </div>

                    <div className="gtm-table-row cursor-target">
                      <div className="gtm-table-cell gtm-table-label">
                        <Users size={18} />
                        Retention & Upsell
                      </div>
                      <div className="gtm-table-cell gtm-table-value">
                        {project.strategy.retentionUpsell}
                      </div>
                    </div>

                    <div className="gtm-table-row cursor-target">
                      <div className="gtm-table-cell gtm-table-label">
                        <BarChart3 size={18} />
                        Metrics to Track
                      </div>
                      <div className="gtm-table-cell gtm-table-value">
                        {project.strategy.metrics}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </main>

        {/* CTA Section */}
        <section className="gtm-cta">
          <div className="gtm-cta-content">
            <h2>Ready to Build Your GTM Strategy?</h2>
            <p>Let's discuss how we can help you launch your product successfully with a data-driven go-to-market approach.</p>
            <div className="gtm-cta-buttons">
              <Link to="/lets-build" className="gtm-cta-primary cursor-target-button">
                Start Your Project
              </Link>
              <Link to="/contact" className="gtm-cta-secondary cursor-target-button">
                Schedule Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default GTMDetail;
