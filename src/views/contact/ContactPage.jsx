import Link from 'next/link'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import '../privacy/PrivacyPolicyPage.css'

export default function ContactPage() {
  return (
    <main className="privacy-policy-page">
      <div className="privacy-policy-container">
        <h1>Contact Socialsect</h1>

        <section>
          <h2>Talk to the team</h2>
          <p>
            Socialsect works with private medical practices in the United States, the United Kingdom and the United
            Arab Emirates. If you own or manage a practice and want more of the right patients booking, tell us
            about it and we will tell you honestly whether we can help.
          </p>
        </section>

        <section>
          <h2>Ways to reach us</h2>
          <ul>
            <li>By email: <a href="mailto:sales@gosocialsect.com">sales@gosocialsect.com</a></li>
            <li>By phone: <a href="tel:+16124570464">+1 (612) 457-0464</a></li>
            <li>Registered office: Lewes, Delaware, USA</li>
            <li>
              Online: <Link href={BOOK_A_CALL_FORM}>request a free practice audit and intro call</Link>
            </li>
          </ul>
        </section>

        <section>
          <h2>What happens next</h2>
          <p>
            We reply to every enquiry within one business day. The first conversation is a short intro call where we
            learn about your practice, your specialty and your goals. If there is a fit, we run a practice audit that
            shows where patients are falling through the gaps across your website, search visibility, ads and
            booking process, and we then agree a plan with you. There are no fixed packages, and pricing depends on
            the scope of the work.
          </p>
        </section>

        <section>
          <h2>Press and partnerships</h2>
          <p>
            For press, partnership or careers enquiries, email us at{' '}
            <a href="mailto:sales@gosocialsect.com">sales@gosocialsect.com</a> and tell us what you have in mind.
            You can read how we handle your information in our <Link href="/privacy-policy">privacy policy</Link>.
          </p>
        </section>
      </div>
    </main>
  )
}
