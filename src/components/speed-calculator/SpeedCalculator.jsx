'use client'

import React, { useState, useEffect } from 'react';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateWebsiteUrl(url) {
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
}

export default function SpeedCalculator({
  formName = 'visibility_snapshot',
  contentName = 'Visibility Snapshot',
  niche = 'implant-dentistry',
  submitLabel = 'Generate My Visibility Snapshot →',
  loadingTitle = 'Analyzing your local visibility…',
  loadingMessage = "This typically takes 8-12 seconds. Please don't close this window.",
  reportTitle = 'Your Visibility Snapshot',
  formDescription = "Enter your practice website and email. We'll analyze your visibility, review gap, competitor position, and missed patient opportunity.",
  websitePlaceholder = 'Practice website URL',
  emailPlaceholder = 'Practice email address',
  metricLabels = {
    visibility: 'Visibility Score',
    performance: 'Performance Score',
    mobile: 'Mobile Experience',
    booking: 'Booking Experience',
  },
  opportunityNote = null,
  resetButtonLabel = 'Analyze Another Practice',
  nextSteps = null,
  onSuccess,
}) {
  const [formState, setFormState] = useState('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ website: '', email: '' });
  const [errors, setErrors] = useState({});
  const [snapshotData, setSnapshotData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setFormData((prev) => ({ ...prev, email: emailParam }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const resetForm = () => {
    setFormState('form');
    setSnapshotData(null);
    setFormData({ website: '', email: '' });
    setErrors({});
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
      window.gtag('event', 'form_started', { form_name: formName });
    }

    setLoading(true);
    setFormState('loading');

    try {
      const normalizedUrl = formData.website.startsWith('http')
        ? formData.website
        : `https://${formData.website}`;
      const params = new URLSearchParams(window.location.search);

      const response = await fetch('/api/visibility-snapshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website: normalizedUrl,
          email: formData.email,
          niche,
          source: params.get('source') || 'direct',
          campaign: params.get('campaign') || 'organic',
        }),
      });

      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        setFormState('error');
        setLoading(false);
        return;
      }

      if (response.ok && data.snapshot) {
        setSnapshotData(data.snapshot);

        if (window.gtag) {
          window.gtag('event', 'snapshot_requested', {
            form_name: formName,
            website: formData.website,
            data_source: data.data?.dataSource,
          });
          window.gtag('event', 'lead_submitted', {
            form_name: formName,
            email: formData.email,
          });
        }

        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: contentName,
            content_type: 'form_submission',
          });
        }

        onSuccess?.({ snapshot: data.snapshot, formData, dataSource: data.data?.dataSource });
        setFormState('success');
        setLoading(false);
      } else {
        setFormState('error');
        setLoading(false);
      }
    } catch {
      setFormState('error');
      setLoading(false);
    }
  };

  return (
    <div className="audit-box">
      {formState === 'form' && (
        <>
          <h3>Generate your free snapshot</h3>
          <p>{formDescription}</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <input
                type="text"
                name="website"
                placeholder={websitePlaceholder}
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
                placeholder={emailPlaceholder}
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <button type="submit" className="cta-btn">
              {submitLabel}
            </button>
          </form>
        </>
      )}

      {formState === 'loading' && (
        <div className="loading-state">
          <div className="spinner" />
          <h3>{loadingTitle}</h3>
          <p>{loadingMessage}</p>
        </div>
      )}

      {formState === 'success' && snapshotData && (
        <div className="success-state">
          <div className="snapshot-report">
            <div className="report-header">
              <h3>{reportTitle}</h3>
              <p className="report-subheader">Analysis for {formData.website}</p>
              {snapshotData.dataSource && snapshotData.dataSource !== 'REAL_PAGESPEED_API' && (
                <p className="report-data-source">
                  Performance data source: {snapshotData.dataSource.replace(/_/g, ' ').toLowerCase()}
                </p>
              )}
            </div>

            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-label">{metricLabels.visibility}</div>
                <div className="metric-value">{snapshotData.visibilityScore}</div>
                <div className="metric-status" data-status={snapshotData.visibilityStatus}>
                  {snapshotData.visibilityStatus === 'good'
                    ? '✓ Strong'
                    : snapshotData.visibilityStatus === 'fair'
                      ? '⚠ Needs Work'
                      : '✗ Weak'}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-label">{metricLabels.performance}</div>
                <div className="metric-value">{snapshotData.performanceScore}</div>
                <div className="metric-status" data-status={snapshotData.performanceStatus}>
                  {snapshotData.performanceStatus === 'good'
                    ? '✓ Good'
                    : snapshotData.performanceStatus === 'fair'
                      ? '⚠ Fair'
                      : '✗ Poor'}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-label">{metricLabels.mobile}</div>
                <div className="metric-value">{snapshotData.mobileScore}</div>
                <div className="metric-status" data-status={snapshotData.mobileStatus}>
                  {snapshotData.mobileStatus === 'good'
                    ? '✓ Optimized'
                    : snapshotData.mobileStatus === 'fair'
                      ? '⚠ Partial'
                      : '✗ Issues'}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-label">{metricLabels.booking}</div>
                <div className="metric-value">{snapshotData.bookingScore}</div>
                <div className="metric-status" data-status={snapshotData.bookingStatus}>
                  {snapshotData.bookingStatus === 'good'
                    ? '✓ Smooth'
                    : snapshotData.bookingStatus === 'fair'
                      ? '⚠ Friction'
                      : '✗ Blocked'}
                </div>
              </div>
            </div>

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
                {opportunityNote ||
                  `Based on ${snapshotData.localMarketSize} nearby practices and average implant case value of $12,000-$15,000`}
              </p>
            </div>

            <div className="next-steps-section">
              <h4>What Happens Next</h4>
              <ol className="steps-list">
                {nextSteps ? (
                  nextSteps.map((step) => (
                    <li key={step}>
                      {step.includes('{email}') ? (
                        <>
                          We&apos;ll email this snapshot to <strong>{formData.email}</strong>
                        </>
                      ) : (
                        step
                      )}
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      We&apos;ll email this snapshot to <strong>{formData.email}</strong>
                    </li>
                    <li>If a significant gap exists, our team will send a brief strategic breakdown</li>
                    <li>You&apos;ll have a clear roadmap to close your visibility gaps</li>
                  </>
                )}
              </ol>
            </div>

            <button type="button" onClick={resetForm} className="new-audit-btn">
              {resetButtonLabel}
            </button>
          </div>
        </div>
      )}

      {formState === 'error' && (
        <div className="error-state">
          <h3>Something went wrong</h3>
          <p>We couldn&apos;t process your request. Please try again.</p>
          <button type="button" onClick={() => { setFormState('form'); setErrors({}); }} className="retry-btn">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
