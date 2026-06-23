import { Resend } from 'resend'
import { getResendConfig } from './env.js'

function getClient() {
  const { apiKey } = getResendConfig()
  return new Resend(apiKey)
}

function formatResendError(error) {
  const message = error?.message || 'Failed to send email'
  const name = error?.name ? `${error.name}: ` : ''

  if (/domain|verify|not verified|403/i.test(message)) {
    return `${name}${message}  In Resend, open Domains → add gosocialsect.com → add all DNS records → wait until status is Verified. Until then, set RESEND_FROM_EMAIL=onboarding@resend.dev (test only).`
  }

  if (/only send.*your own email|testing/i.test(message)) {
    return `${name}${message}  With onboarding@resend.dev you can only send to the email address on your Resend account. Use a verified custom domain to email visitors.`
  }

  return `${name}${message}`
}

function dedupeEmails(addresses) {
  const seen = new Set()
  return addresses.filter((addr) => {
    const key = addr.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export async function sendEmail({ to, cc, subject, html, replyTo }) {
  const { from } = getResendConfig()
  const resend = getClient()

  const toList = dedupeEmails(Array.isArray(to) ? to : [to])
  const ccList = dedupeEmails(
    (cc ?? []).filter((addr) => !toList.some((t) => t.toLowerCase() === addr.toLowerCase())),
  )

  const { data, error } = await resend.emails.send({
    from,
    to: toList,
    cc: ccList.length ? ccList : undefined,
    subject,
    html,
    replyTo: replyTo || undefined,
  })

  if (error) {
    throw new Error(formatResendError(error))
  }

  if (!data?.id) {
    throw new Error('Resend did not return a message id. Check your API key and sender domain.')
  }

  return data
}

/** Internal team alert (book a call, newsletter signup, resource request). */
export async function sendNotificationEmail({ subject, html, replyTo }) {
  const { notifyTo, notifyCc } = getResendConfig()
  return sendEmail({
    to: notifyTo,
    cc: notifyCc,
    subject,
    html,
    replyTo,
  })
}

/** Branded confirmation to the person who submitted a form. */
export async function sendVisitorConfirmation({ to, subject, html }) {
  return sendEmail({ to, subject, html })
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatTableCell(value) {
  const text = Array.isArray(value) ? value.join(', ') : String(value ?? '')
  const trimmed = text.trim()
  if (/^https?:\/\//i.test(trimmed)) {
    const safe = escapeHtml(trimmed)
    return `<a href="${safe}" style="color:#695AF2;word-break:break-all">${safe}</a>`
  }
  return escapeHtml(text)
}

export function linesToHtml(rows) {
  return rows
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(([label, value]) => {
      const safe = formatTableCell(value)
      return `<tr><td style="padding:8px 16px 8px 0;color:#474555;vertical-align:top;white-space:nowrap;font-size:14px">${escapeHtml(label)}</td><td style="padding:8px 0;color:#1A1C1D;font-size:14px">${safe}</td></tr>`
    })
    .join('')
}

/** Visibility snapshot confirmation email to practice. */
export async function sendVisibilitySnapshotEmail(email, website, snapshot) {
  const practiceUrl = website.startsWith('http') ? website : `https://${website}`
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; color: #1a1c1d; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #7b5cff, #6245f5); padding: 40px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 40px 20px; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #1a1c1d; font-size: 20px; margin-bottom: 10px; }
    .highlight { background: #f5f3ff; padding: 20px; border-radius: 8px; border-left: 4px solid #7b5cff; margin: 20px 0; }
    .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
    .stat-box { background: #f9f9f9; padding: 15px; border-radius: 8px; text-align: center; }
    .stat-number { font-size: 24px; color: #7b5cff; font-weight: 700; }
    .stat-label { font-size: 12px; color: #888; text-transform: uppercase; }
    .cta { background: #7b5cff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
    .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Implant Practice Visibility Snapshot</h1>
      <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">Your analysis is being prepared</p>
    </div>
    
    <div class="content">
      <div class="section">
        <p>Hi there,</p>
        <p>Thank you for requesting your free Implant Practice Visibility Snapshot. We're analyzing your practice visibility and how you compare to nearby competitors in your market.</p>
      </div>

      <div class="highlight">
        <strong>Practice Website:</strong> <a href="${practiceUrl}" style="color: #7b5cff;">${escapeHtml(website)}</a>
      </div>

      <div class="section">
        <h2>What we're analyzing:</h2>
        <div class="stats">
          <div class="stat-box">
            <div class="stat-number">01</div>
            <div class="stat-label">Visibility Score</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">02</div>
            <div class="stat-label">Review Gap</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">03</div>
            <div class="stat-label">Competitor Position</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">04</div>
            <div class="stat-label">Missed Consults</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>What happens next:</h2>
        <ul style="padding-left: 20px;">
          <li style="margin-bottom: 10px;">We'll send your complete snapshot within 24 hours</li>
          <li style="margin-bottom: 10px;">If we identify a significant opportunity, someone from Socialsect may reach out with a brief breakdown</li>
          <li>You'll gain clarity on exactly where your practice may be losing patient consultations</li>
        </ul>
      </div>

      <div class="section" style="text-align: center;">
        <p style="color: #888;">Questions in the meantime? Reach out to our team.</p>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0;">© 2024 Socialsect. Marketing for private medical practices.</p>
      <p style="margin: 8px 0 0;">You received this email because you requested an Implant Practice Visibility Snapshot.</p>
    </div>
  </div>
</body>
</html>
  `

  return sendVisitorConfirmation({
    to: email,
    subject: 'Your Implant Practice Visibility Snapshot is Being Prepared',
    html,
  })
}

/** Internal notification for visibility snapshot request. */
export async function notifyVisibilitySnapshotRequest({ email, website, source, campaign }) {
  const practiceUrl = website.startsWith('http') ? website : `https://${website}`
  
  const rows = [
    ['Email', email],
    ['Website', practiceUrl],
    ['Source', source],
    ['Campaign', campaign],
    ['Timestamp', new Date().toISOString()],
  ]

  const html = `
<h2 style="color: #1a1c1d; margin-bottom: 20px;">New Visibility Snapshot Request</h2>
<table style="width: 100%; border-collapse: collapse;">
  ${linesToHtml(rows)}
</table>
  `

  return sendNotificationEmail({
    subject: 'New Visibility Snapshot Request',
    html,
    replyTo: email,
  })
}


/** Audit booking confirmation email. */
export async function sendAuditBookingEmail(email, { name, practice }) {
  const timestamp = new Date().toISOString();
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; color: #1a1c1d; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #7b5cff, #6245f5); padding: 40px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 40px; }
    .footer { background: #f8f7ff; padding: 20px; text-align: center; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Audit Booking Confirmed</h1>
      <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">We're looking forward to reviewing your practice</p>
    </div>
    
    <div class="content">
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you for booking your free 45-minute practice audit with Socialsect.</p>
      
      <div style="background: #f9f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #1a1c1d;">Booking Details</h3>
        <p style="margin: 8px 0;"><strong>Practice:</strong> ${escapeHtml(practice)}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      </div>

      <h3 style="color: #1a1c1d;">What to expect:</h3>
      <ul style="color: #666; line-height: 2;">
        <li>Our team will review your practice website and online visibility</li>
        <li>We'll analyze your patient booking flow and digital presence</li>
        <li>You'll receive a detailed report with actionable recommendations</li>
        <li>We'll schedule a brief call to discuss findings (if applicable)</li>
      </ul>

      <p style="color: #666; font-size: 14px;">Questions? Reply to this email or contact us at sales@gosocialsect.com</p>
    </div>

    <div class="footer">
      <p style="margin: 0;">© 2024 Socialsect. Marketing for private medical practices.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    return await sendVisitorConfirmation({
      to: email,
      subject: `Your 45-Minute Practice Audit is Confirmed - ${new Date().toLocaleDateString()}`,
      html,
    });
  } catch (error) {
    console.error(`[${timestamp}] Failed to send audit booking email:`, error.message);
    throw error;
  }
}

/** Internal notification for audit booking. */
export async function notifyAuditBooking({ name, email, phone, practice, message }) {
  const timestamp = new Date().toISOString();
  const rows = [
    ['Practice Name', practice],
    ['Contact Name', name],
    ['Email', email],
    ['Phone', phone],
    ['Message', message || 'N/A'],
    ['Timestamp', new Date().toISOString()],
  ];

  const html = `
<h2 style="color: #1a1c1d; margin-bottom: 20px;">New Audit Booking</h2>
<table style="width: 100%; border-collapse: collapse;">
  ${linesToHtml(rows)}
</table>

<p style="color: #666; margin-top: 20px; font-size: 13px;">
  <strong>Action:</strong> Schedule audit call with ${escapeHtml(name)} at ${escapeHtml(phone)}
</p>
  `;

  try {
    return await sendNotificationEmail({
      subject: `New Audit Booking: ${practice}`,
      html,
      replyTo: email,
    });
  } catch (error) {
    console.error(`[${timestamp}] Failed to send audit notification:`, error.message);
    throw error;
  }
}
