import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import './privacy-policy.css';

const PrivacyPolicy = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Privacy Policy | Socialsect - Digital Growth Agency</title>
        <meta name="description" content="Learn how Socialsect collects, uses, and protects your personal information. Our privacy policy explains our data practices and your rights." />
        <meta name="keywords" content="privacy policy, data protection, GDPR compliance, personal information, Socialsect privacy" />
        <link rel="canonical" href="https://goSocialsect.com/privacy-policy" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Socialsect - Digital Growth Agency" />
        <meta property="og:description" content="Learn how Socialsect collects, uses, and protects your personal information. Our privacy policy explains our data practices and your rights." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/privacy-policy" />
        <meta property="twitter:title" content="Privacy Policy | Socialsect - Digital Growth Agency" />
        <meta property="twitter:description" content="Learn how Socialsect collects, uses, and protects your personal information. Our privacy policy explains our data practices and your rights." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
      </Helmet>

      <div className="privacy-policy-page">
        <div className="privacy-policy-container">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: December 19, 2024</p>
          
          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
            <ul>
              <li>Contact information (name, email address, phone number)</li>
              <li>Business information (company name, industry, project details)</li>
              <li>Communication preferences</li>
              <li>Website usage data and analytics</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section>
            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2>6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>Email: privacy@goSocialsect.com<br />
            Address: Socialsect, Digital Growth Agency</p>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default PrivacyPolicy;