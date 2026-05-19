import { buildBrandedEmail } from './layout.js'
import { escapeHtml } from '../email.js'

export function bookACallConfirmationEmail({ name, practiceName }) {
  const firstName = name.split(/\s+/)[0] || name
  return buildBrandedEmail({
    icon: 'calendar',
    eyebrow: 'Submission received',
    headline: 'We\u2019ve got your details.',
    greeting: `Hi ${firstName},`,
    paragraphs: [
      `Thank you for telling us about <strong>${escapeHtml(practiceName)}</strong>. This isn\u2019t a sales funnel \u2014 it\u2019s the start of a real conversation.`,
      'A member of our team will review your submission personally and reply within <strong>24 hours</strong>. If we\u2019re a fit, we\u2019ll suggest a <strong>45-minute introductory call</strong>: no pitch, no packages, just an honest look at your practice.',
      'If we don\u2019t think we\u2019re the right partner for you, we\u2019ll say so plainly \u2014 and point you somewhere better if we can.',
      'Your information stays with us. No mailing lists. No automated follow-up sequence.',
    ],
    signOff: 'Speak soon,',
  })
}

export function resourceDownloadConfirmationEmail({ name, resourceTitle }) {
  const firstName = name.split(/\s+/)[0] || name
  return buildBrandedEmail({
    icon: 'file',
    eyebrow: 'Request received',
    headline: 'We\u2019re preparing your resource.',
    greeting: `Hi ${firstName},`,
    paragraphs: [
      `Thanks for requesting <strong>${escapeHtml(resourceTitle)}</strong>.`,
      'Someone on our team will follow up shortly with the resource and anything else that\u2019s relevant to your specialty. No spam. No drip campaign \u2014 just the material you asked for.',
      'If you\u2019d rather talk through how this applies to your practice, you can book a free 45-minute audit anytime on our site.',
    ],
    signOff: 'Thank you,',
  })
}

export function newsletterConfirmationEmail({ source }) {
  const context =
    source === 'blog-hero' || source === 'blog-sidebar'
      ? 'new articles on the blog'
      : 'new articles and resources from Insights'

  return buildBrandedEmail({
    icon: 'mail',
    eyebrow: 'You\u2019re on the list',
    headline: 'We\u2019ll write when we have something worth reading.',
    greeting: 'Hello,',
    paragraphs: [
      `You\u2019re confirmed for ${context}.`,
      'We publish when we have something genuinely useful for private medical practices \u2014 typically <strong>2 to 4 times a month</strong>, not on a content calendar. No filler. No daily blasts.',
      'Unsubscribe any time. We don\u2019t share your address or sell your data.',
    ],
    signOff: 'To better practices,',
  })
}
