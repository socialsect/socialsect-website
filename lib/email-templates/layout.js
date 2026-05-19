import { escapeHtml } from '../email.js'

const ICONS = {
  calendar: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#695AF2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  file: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#695AF2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  mail: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#695AF2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  check: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#695AF2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
}

/**
 * Branded HTML shell  mirrors site typography & colours (email-safe inline styles).
 */
export function buildBrandedEmail({ icon = 'check', eyebrow, headline, greeting, paragraphs, signOff }) {
  const iconSvg = ICONS[icon] || ICONS.check
  const bodyCopy = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.65;color:#474555">${p}</p>`,
    )
    .join('')

  const preheader = escapeHtml(eyebrow)

  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>',
    '<body style="margin:0;padding:0;background:#F5F5F7">',
    `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>`,
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F5F5F7;padding:40px 16px">',
    '<tr><td align="center">',
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#FFFFFF;border:1px solid #E2E2E2;border-radius:4px">',
    '<tr><td style="padding:32px 32px 24px;border-bottom:1px solid #E2E2E2">',
    `<p style="margin:0 0 8px;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#474555">${escapeHtml(eyebrow)}</p>`,
    `<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;line-height:1.25;letter-spacing:-0.02em;color:#1A1C1D">${escapeHtml(headline)}</p>`,
    '</td></tr>',
    '<tr><td style="padding:28px 32px 32px">',
    `<table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom:20px"><tr><td style="padding-right:12px;vertical-align:top">${iconSvg}</td><td style="vertical-align:middle"><p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1A1C1D">${escapeHtml(greeting)}</p></td></tr></table>`,
    bodyCopy,
    `<p style="margin:24px 0 0;font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.6;color:#1A1C1D">${escapeHtml(signOff)}<br><span style="color:#695AF2">Socialsect</span></p>`,
    '</td></tr>',
    '<tr><td style="padding:16px 32px 24px;background:#F9F9FB;border-top:1px solid #E2E2E2">',
    '<p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:12px;line-height:1.5;color:#474555">Private medical practice growth · gosocialsect.com</p>',
    '</td></tr>',
    '</table>',
    '</td></tr>',
    '</table>',
    '</body>',
    '</html>',
  ].join('')
}
