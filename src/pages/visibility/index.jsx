import React, { useState, useEffect } from 'react';
import './visibility.css';

export default function VisibilityPage() {
  const [formState, setFormState] = useState('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    website: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [snapshotData, setSnapshotData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    const sourceParam = params.get('source');
    const campaignParam = params.get('campaign');

    if (emailParam) {
      setFormData(prev => ({ ...prev, email: emailParam }));
    }

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: '/visibility',
        page_title: 'Implant Practice Visibility Snapshot',
        source: sourceParam || 'direct',
        campaign: campaignParam || 'organic',
      });
    }

    if (window.lintrk) {
      window.lintrk('track', { conversion_id: 13582007 });
    }
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateWebsiteUrl = (url) => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.website.trim()) {
      newErrors.website = 'Website URL is required';
    } else if (!validateWebsiteUrl(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (window.gtag) {
      window.gtag('event', 'form_started', {
        form_name: 'visibility_snapshot',
      });
    }

    setLoading(true);
    setFormState('loading');

    try {
      const normalizedUrl = formData.website.startsWith('http') ? formData.website : `https://${formData.website}`;
      
      // Call PageSpeed API to get real data
      const response = await fetch('/api/visibility-snapshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website: normalizedUrl,
          email: formData.email,
          source: new URLSearchParams(window.location.search).get('source') || 'direct',
          campaign: new URLSearchParams(window.location.search).get('campaign') || 'organic',
        }),
      });

      const responseText = await response.text();
      // console.log('Raw Response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError, 'Response:', responseText);
        setFormState('error');
        setLoading(false);
        return;
      }

      console.log('API Response:', data);

      if (response.ok && data.snapshot) {
        setSnapshotData(data.snapshot);

        if (window.gtag) {
          window.gtag('event', 'snapshot_requested', {
            form_name: 'visibility_snapshot',
            website: formData.website,
          });
        }

        if (window.gtag) {
          window.gtag('event', 'lead_submitted', {
            form_name: 'visibility_snapshot',
            email: formData.email,
          });
        }

        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Visibility Snapshot',
            content_type: 'form_submission',
          });
        }

        setFormState('success');
        setLoading(false);
      } else {
        setFormState('error');
        setLoading(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState('error');
      setLoading(false);
    }
  };

  return (
    <div className="visibility-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="eyebrow">
            <span></span>
            Implant Practice Visibility Snapshot
          </div>

          <h1>
            How visible is your <em>implant practice</em> in your local market?
          </h1>

          <p className="sub">
            See how your practice compares against other implant providers nearby and uncover visibility gaps that may be costing you consultations.
          </p>

          {/* Form Box */}
          <div className="audit-box">
            {formState === 'form' && (
              <>
                <h3>Generate your free snapshot</h3>
                <p>
                  Enter your practice website and email. We'll analyze your visibility, review gap, competitor position, and missed patient opportunity.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <input
                      type="text"
                      name="website"
                      placeholder="Practice website URL"
                      value={formData.website}
                      onChange={handleInputChange}
                      className={errors.website ? 'error' : ''}
                      required
                    />
                    {errors.website && <span className="error-text">{errors.website}</span>}
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Practice email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      required
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <button type="submit" className="cta-btn">
                    Generate My Visibility Snapshot →
                  </button>
                </form>
              </>
            )}

            {formState === 'loading' && (
              <div className="loading-state">
                <div className="spinner"></div>
                <h3>Analyzing your local visibility…</h3>
                <p>This typically takes 8-12 seconds. Please don't close this window.</p>
              </div>
            )}

            {formState === 'success' && snapshotData && (
              <div className="success-state">
                <div className="snapshot-report">
                  <div className="report-header">
                    <h3>Your Visibility Snapshot</h3>
                    <p className="report-subheader">Analysis for {formData.website}</p>
                  </div>

                  {/* Core Metrics */}
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <div className="metric-label">Visibility Score</div>
                      <div className="metric-value">{snapshotData.visibilityScore}</div>
                      <div className="metric-status" data-status={snapshotData.visibilityStatus}>
                        {snapshotData.visibilityStatus === 'good' ? '✓ Strong' : snapshotData.visibilityStatus === 'fair' ? '⚠ Needs Work' : '✗ Weak'}
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-label">Performance Score</div>
                      <div className="metric-value">{snapshotData.performanceScore}</div>
                      <div className="metric-status" data-status={snapshotData.performanceStatus}>
                        {snapshotData.performanceStatus === 'good' ? '✓ Good' : snapshotData.performanceStatus === 'fair' ? '⚠ Fair' : '✗ Poor'}
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-label">Mobile Experience</div>
                      <div className="metric-value">{snapshotData.mobileScore}</div>
                      <div className="metric-status" data-status={snapshotData.mobileStatus}>
                        {snapshotData.mobileStatus === 'good' ? '✓ Optimized' : snapshotData.mobileStatus === 'fair' ? '⚠ Partial' : '✗ Issues'}
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-label">Booking Experience</div>
                      <div className="metric-value">{snapshotData.bookingScore}</div>
                      <div className="metric-status" data-status={snapshotData.bookingStatus}>
                        {snapshotData.bookingStatus === 'good' ? '✓ Smooth' : snapshotData.bookingStatus === 'fair' ? '⚠ Friction' : '✗ Blocked'}
                      </div>
                    </div>
                  </div>

                  {/* Key Findings */}
                  <div className="findings-section">
                    <h4>Key Findings</h4>
                    <div className="findings-list">
                      {snapshotData.findings.map((finding, idx) => (
                        <div key={idx} className="finding-item">
                          <span className={`finding-icon ${finding.type}`}>
                            {finding.type === 'opportunity' ? '→' : finding.type === 'strength' ? '✓' : '!'}
                          </span>
                          <div>
                            <div className="finding-title">{finding.title}</div>
                            <div className="finding-detail">{finding.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Missed Opportunity */}
                  <div className="opportunity-section">
                    <h4>Estimated Missed Opportunity</h4>
                    <div className="opportunity-content">
                      <div className="opportunity-stat">
                        <div className="opp-number">{snapshotData.missedConsults}</div>
                        <div className="opp-label">Potential consults/month</div>
                      </div>
                      <div className="opportunity-stat">
                        <div className="opp-number">${snapshotData.estimatedValue}</div>
                        <div className="opp-label">Monthly revenue impact</div>
                      </div>
                    </div>
                    <p className="opportunity-note">
                      Based on {snapshotData.localMarketSize} nearby practices and average implant case value of $12,000-$15,000
                    </p>
                  </div>

                  {/* Next Steps */}
                  <div className="next-steps-section">
                    <h4>What Happens Next</h4>
                    <ol className="steps-list">
                      <li>We'll email this snapshot to <strong>{formData.email}</strong></li>
                      <li>If a significant gap exists, our team will send a brief strategic breakdown</li>
                      <li>You'll have a clear roadmap to close your visibility gaps</li>
                    </ol>
                  </div>

                  <button 
                    onClick={() => {
                      setFormState('form');
                      setSnapshotData(null);
                      setFormData({ website: '', email: '' });
                    }}
                    className="new-audit-btn"
                  >
                    Analyze Another Practice
                  </button>
                </div>
              </div>
            )}

            {formState === 'error' && (
              <div className="error-state">
                <h3>Something went wrong</h3>
                <p>We couldn't process your request. Please try again.</p>
                <button 
                  onClick={() => {
                    setFormState('form');
                    setErrors({});
                  }}
                  className="retry-btn"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Card */}
        <div className="floating-card">
          <div className="quote">"</div>
          <p>
            Most implant practices don't have a lead problem. They have a visibility and conversion gap.
          </p>
          <div className="line"></div>
          <div className="doctor">Socialsect</div>
          <div className="clinic">Marketing for private medical practices</div>
        </div>
      </section>

      {/* Trust/Metrics Section */}
      <section className="trust-section">
        <div>
          <strong>10,000+</strong>
          <span>Consultations booked</span>
        </div>
        <div>
          <strong>$10M+</strong>
          <span>Pipeline generated</span>
        </div>
        <div>
          <strong>4.2x</strong>
          <span>Average client ROI</span>
        </div>
        <div>
          <strong>60s</strong>
          <span>Snapshot generation</span>
        </div>
      </section>

      {/* What Your Snapshot Shows */}
      <section className="snapshot-features">
        <h2>What your snapshot shows</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">01</div>
            <h3>Visibility Score</h3>
            <p>See how easy your practice is to find compared with nearby implant providers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">02</div>
            <h3>Review Gap</h3>
            <p>Compare your review count and rating against competitors patients may see first.</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">03</div>
            <h3>Competitor Position</h3>
            <p>Understand which practices are likely winning attention in your local market.</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">04</div>
            <h3>Missed Consult Opportunity</h3>
            <p>Estimate where better visibility and booking flow could create more patient inquiries.</p>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="why-matters">
        <h2>Why this matters for implant practices</h2>
        <div className="matters-content">
          <p>
            Implant patients rarely choose the first practice they see. They compare reviews, websites, trust signals, financing, before-and-after proof, and how easy it is to book. Small gaps in visibility and conversion can quietly cost high-value consultations every month.
          </p>
          <div className="matters-list">
            <div className="matter-item">
              <span className="check">✓</span>
              <p><strong>Visibility</strong> determines if patients even find you in local search</p>
            </div>
            <div className="matter-item">
              <span className="check">✓</span>
              <p><strong>Trust signals</strong> (reviews, credentials, before/afters) influence comparison</p>
            </div>
            <div className="matter-item">
              <span className="check">✓</span>
              <p><strong>Booking friction</strong> determines who moves from browsers to bookers</p>
            </div>
            <div className="matter-item">
              <span className="check">✓</span>
              <p><strong>One missed consult</strong> can cost $8,000—$15,000 in case value</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Find out where your practice stands</h2>
          <p>Generate your free Implant Practice Visibility Snapshot</p>
          <a href="#" className="large-cta-btn">Generate My Snapshot</a>
        </div>
      </section>
    </div>
  );
}
