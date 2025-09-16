import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import './terms-conditions.css';

const TermsConditions = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Terms & Conditions | Socialsect - Digital Growth Agency</title>
        <meta name="description" content="Read Socialsect's terms and conditions for using our digital marketing and web development services. Understand your rights and obligations." />
        <meta name="keywords" content="terms and conditions, service terms, legal terms, Socialsect terms, digital marketing terms" />
        <link rel="canonical" href="https://goSocialsect.com/terms-conditions" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/terms-conditions" />
        <meta property="og:title" content="Terms & Conditions | Socialsect - Digital Growth Agency" />
        <meta property="og:description" content="Read Socialsect's terms and conditions for using our digital marketing and web development services. Understand your rights and obligations." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/terms-conditions" />
        <meta property="twitter:title" content="Terms & Conditions | Socialsect - Digital Growth Agency" />
        <meta property="twitter:description" content="Read Socialsect's terms and conditions for using our digital marketing and web development services. Understand your rights and obligations." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
      </Helmet>

      <div className="terms-conditions-page">
        <div className="terms-conditions-container">
          <h1>Terms & Conditions</h1>
          <p className="last-updated">Last updated: December 19, 2024</p>
          
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Socialsect's services, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2>2. Services Description</h2>
            <p>Socialsect provides digital marketing, web development, SEO, and related services. We reserve the right to modify or discontinue any service at any time.</p>
          </section>

          <section>
            <h2>3. Client Responsibilities</h2>
            <p>Clients are responsible for:</p>
            <ul>
              <li>Providing accurate and complete information</li>
              <li>Timely payment of invoices</li>
              <li>Cooperation during project execution</li>
              <li>Providing necessary access to systems and accounts</li>
            </ul>
          </section>

          <section>
            <h2>4. Payment Terms</h2>
            <p>Payment terms are as specified in individual service agreements. Late payments may result in service suspension or termination.</p>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <p>All work created by Socialsect remains our intellectual property until full payment is received. Upon payment, clients receive appropriate usage rights.</p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <p>Socialsect's liability is limited to the amount paid for services. We are not liable for indirect, incidental, or consequential damages.</p>
          </section>

          <section>
            <h2>7. Termination</h2>
            <p>Either party may terminate services with 30 days written notice. Socialsect may terminate immediately for non-payment or breach of terms.</p>
          </section>

          <section>
            <h2>8. Governing Law</h2>
            <p>These terms are governed by the laws of the jurisdiction where Socialsect operates.</p>
          </section>

          <section>
            <h2>9. Contact Information</h2>
            <p>For questions about these terms, contact us at:</p>
            <p>Email: legal@goSocialsect.com<br />
            Address: Socialsect, Digital Growth Agency</p>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default TermsConditions;
