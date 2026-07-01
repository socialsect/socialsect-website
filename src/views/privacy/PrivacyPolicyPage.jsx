'use client'
import { useEffect } from 'react'
import './PrivacyPolicyPage.css'

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | Socialsect'
  }, [])

  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: June 2026</p>

        <section>
          <h2>Introduction</h2>
          <p>
            Socialsect ("we", "us", "our", or "Company") operates the website and related services (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>
          <p>
            We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section>
          <h2>Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>

          <h3>Types of Data Collected:</h3>
          <ul>
            <li>
              <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Practice or business information</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </li>
            <li>
              <strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </li>
          </ul>
        </section>

        <section>
          <h2>Use of Data</h2>
          <p>Socialsect uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To send you promotional communications and marketing materials</li>
            <li>To respond to your inquiries and requests</li>
          </ul>
        </section>

        <section>
          <h2>Security of Data</h2>
          <p>
            The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2>Service Providers</h2>
          <p>
            We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
          </p>
          <p>
            These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
        </section>

        <section>
          <h2>Links to Other Sites</h2>
          <p>
            Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
          </p>
          <p>
            We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            Our Service is not intended for use by children under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from children. If you become aware that a child has provided us with Personal Data, please contact us immediately.
          </p>
        </section>

        <section>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>By email: <a href="mailto:sales@gosocialsect.com">sales@gosocialsect.com</a></li>
            <li>By phone: <a href="tel:+16317926023">+1 (631) 792 6023</a></li>
            <li>By mail: Lewes, DEL</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
