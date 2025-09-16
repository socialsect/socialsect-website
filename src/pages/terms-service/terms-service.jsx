import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import './terms-service.css';

const TermsService = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Terms of Service | Socialsect - Digital Growth Agency</title>
        <meta name="description" content="Read Socialsect's terms of service for our digital marketing and web development services. Understand the rules and guidelines for using our platform." />
        <meta name="keywords" content="terms of service, service agreement, platform terms, Socialsect terms, digital services terms" />
        <link rel="canonical" href="https://goSocialsect.com/terms-service" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/terms-service" />
        <meta property="og:title" content="Terms of Service | Socialsect - Digital Growth Agency" />
        <meta property="og:description" content="Read Socialsect's terms of service for our digital marketing and web development services. Understand the rules and guidelines for using our platform." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/terms-service" />
        <meta property="twitter:title" content="Terms of Service | Socialsect - Digital Growth Agency" />
        <meta property="twitter:description" content="Read Socialsect's terms of service for our digital marketing and web development services. Understand the rules and guidelines for using our platform." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
      </Helmet>

      <div className="terms-service-page">
        <div className="terms-service-container">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: December 19, 2024</p>
          
          <section>
            <h2>1. Service Agreement</h2>
            <p>These terms govern your use of Socialsect's digital marketing and web development services. By using our services, you agree to these terms.</p>
          </section>

          <section>
            <h2>2. Service Availability</h2>
            <p>We strive to maintain high service availability but cannot guarantee uninterrupted service. We reserve the right to modify or suspend services for maintenance or updates.</p>
          </section>

          <section>
            <h2>3. User Conduct</h2>
            <p>Users must not:</p>
            <ul>
              <li>Use our services for illegal activities</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with other users' experience</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2>4. Content and Data</h2>
            <p>You retain ownership of your content. By using our services, you grant us necessary licenses to provide our services effectively.</p>
          </section>

          <section>
            <h2>5. Service Modifications</h2>
            <p>We may modify, suspend, or discontinue any part of our services at any time. We will provide reasonable notice of significant changes.</p>
          </section>

          <section>
            <h2>6. Disclaimers</h2>
            <p>Our services are provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose.</p>
          </section>

          <section>
            <h2>7. Indemnification</h2>
            <p>You agree to indemnify and hold harmless Socialsect from any claims arising from your use of our services or violation of these terms.</p>
          </section>

          <section>
            <h2>8. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2>9. Contact Us</h2>
            <p>For questions about these terms of service, contact us at:</p>
            <p>Email: support@goSocialsect.com<br />
            Address: Socialsect, Digital Growth Agency</p>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default TermsService;
