import { HttpError } from '../http-error.js';
import { logSubmission } from '../log-submission.js';
import { sendVisibilitySnapshotEmail, notifyVisibilitySnapshotRequest } from '../email.js';
import { getPageSpeedData } from '../ai/pagespeed-analyzer-snapshot.js';

function generateVisibilitySnapshot(website, pageSpeedData, niche = 'implant-dentistry') {
  const isVeinClinic = niche === 'vein-clinic';
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Generating snapshot from ${pageSpeedData.source} data (${niche})`);

  const performanceScore = Math.max(0, Math.min(100, pageSpeedData?.performanceScore || 45));
  const mobileScore = Math.max(0, Math.min(100, pageSpeedData?.mobileScore || 50));
  const fcp = pageSpeedData?.fcp || 3.5;

  const visibilityScore = Math.max(20, Math.min(100, 70 + (performanceScore - 50) / 2));
  const bookingScore = Math.max(20, Math.min(100, 65 + (mobileScore - 50) / 2));

  const visibilityStatus = visibilityScore >= 70 ? 'good' : visibilityScore >= 50 ? 'fair' : 'poor';
  const performanceStatus = performanceScore >= 70 ? 'good' : performanceScore >= 50 ? 'fair' : 'poor';
  const mobileStatus = mobileScore >= 70 ? 'good' : mobileScore >= 50 ? 'fair' : 'poor';
  const bookingStatus = bookingScore >= 70 ? 'good' : bookingScore >= 50 ? 'fair' : 'poor';

  const findings = [];

  if (performanceScore < 50) {
    findings.push({
      type: 'opportunity',
      title: isVeinClinic ? 'Mobile Experience' : 'Slow Load Time',
      detail: isVeinClinic
        ? 'Many patients search for vein treatment on mobile devices. Small usability issues can reduce appointment requests.'
        : `Site loads in ${fcp.toFixed(1)}s. Patients typically bounce after 3s.`,
    });
  } else {
    findings.push({
      type: 'strength',
      title: isVeinClinic ? 'Strong Local Visibility' : 'Solid Performance',
      detail: isVeinClinic
        ? 'Your clinic appears well in local search results compared to many nearby competitors.'
        : `Site loads in ${fcp.toFixed(1)}s. Better than 60% of practice websites.`,
    });
  }

  if (mobileScore < 60) {
    findings.push({
      type: 'opportunity',
      title: 'Mobile Experience Needs Work',
      detail: isVeinClinic
        ? 'Many patients search for vein treatment on mobile devices. Small usability issues can reduce appointment requests.'
        : 'Most implant patients search on mobile. Booking flow could be smoother.',
    });
  } else if (!isVeinClinic) {
    findings.push({
      type: 'strength',
      title: 'Mobile Friendly',
      detail: 'Your site is well-optimized for mobile devices.',
    });
  }

  findings.push({
    type: 'opportunity',
    title: 'Review Gap',
    detail: isVeinClinic
      ? 'Nearby clinics have significantly more Google reviews, which may influence patient decisions.'
      : 'Likely has fewer reviews than nearby competitors. Reviews drive 40% of new patient decisions.',
  });

  if (performanceScore < 70 || mobileScore < 70) {
    findings.push({
      type: 'opportunity',
      title: 'Booking Friction',
      detail: isVeinClinic
        ? 'Your phone number, consultation request process, or call-to-action could be easier to find.'
        : 'Call-to-action placement and form clarity could reduce friction by 15-20%.',
    });
  }

  const localMarketSize = Math.floor(Math.random() * 8) + 5;
  const marketShare = Math.max(10, Math.min(40, (visibilityScore / 100) * 50));
  const avgMonthlySearches = 180 + Math.floor(Math.random() * 120);
  const missedConsults = Math.max(
    3,
    Math.floor((avgMonthlySearches * (100 - marketShare)) / 100 / 3)
  );
  const caseValueMin = isVeinClinic ? 5000 : 10000;
  const caseValueMax = isVeinClinic ? 9000 : 13000;
  const estimatedValue = missedConsults * Math.floor(Math.random() * (caseValueMax - caseValueMin) + caseValueMin);

  const snapshot = {
    visibilityScore: Math.round(visibilityScore),
    visibilityStatus,
    performanceScore: Math.round(performanceScore),
    performanceStatus,
    mobileScore: Math.round(mobileScore),
    mobileStatus,
    bookingScore: Math.round(bookingScore),
    bookingStatus,
    findings,
    missedConsults,
    estimatedValue: estimatedValue.toLocaleString(),
    localMarketSize,
    dataSource: pageSpeedData.source,
  };

  console.log(`[${timestamp}] ✓ Snapshot generated:`, {
    visibility: snapshot.visibilityScore,
    performance: snapshot.performanceScore,
    mobile: snapshot.mobileScore,
    findings: snapshot.findings.length,
    source: pageSpeedData.source,
  });

  return snapshot;
}

function validatePayload(payload = {}) {
  const { website, email } = payload;

  if (!website || !email) {
    throw new HttpError('Website and email are required', 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new HttpError('Invalid email format', 400);
  }

  try {
    new URL(website);
  } catch {
    throw new HttpError('Invalid website URL', 400);
  }
}

export async function processVisibilitySnapshot(payload = {}) {
  const timestamp = new Date().toISOString();
  const { website, email, source, campaign, niche = 'implant-dentistry' } = payload;

  console.log(`[${timestamp}] ========== VISIBILITY SNAPSHOT START ==========`);
  console.log(`[${timestamp}] Request: website=${website}, email=${email}, source=${source}, campaign=${campaign}`);

  validatePayload(payload);
  console.log(`[${timestamp}] ✓ Validation passed`);

  console.log(`[${timestamp}] Calling PageSpeed API...`);
  let pageSpeedData;
  try {
    pageSpeedData = await getPageSpeedData(website);
  } catch (err) {
    throw new HttpError(`PageSpeed analysis failed: ${err.message}`, 502);
  }
  console.log(`[${timestamp}] ✓ PageSpeed data received. Source: ${pageSpeedData.source}`);

  const snapshot = generateVisibilitySnapshot(website, pageSpeedData, niche);

  try {
    await logSubmission({
      type: 'visibility_snapshot',
      website,
      email,
      source: source || 'direct',
      campaign: campaign || 'organic',
      niche,
      visibilityScore: snapshot.visibilityScore,
      performanceScore: snapshot.performanceScore,
      mobileScore: snapshot.mobileScore,
      dataSource: pageSpeedData.source,
      timestamp: new Date().toISOString(),
    });
    console.log(`[${timestamp}] ✓ Submission logged`);
  } catch (err) {
    console.warn(`[${timestamp}] ⚠️  Failed to log submission:`, err.message);
  }

  try {
    await sendVisibilitySnapshotEmail(email, website, snapshot);
    console.log(`[${timestamp}] ✓ Email sent`);
  } catch (err) {
    console.error(`[${timestamp}] ❌ Email send error:`, err.message);
  }

  try {
    await notifyVisibilitySnapshotRequest({
      email,
      website,
      source: source || 'direct',
      campaign: campaign || 'organic',
      visibilityScore: snapshot.visibilityScore,
    });
    console.log(`[${timestamp}] ✓ Notification sent`);
  } catch (err) {
    console.warn(`[${timestamp}] ⚠️  Failed to notify team:`, err.message);
  }

  console.log(`[${timestamp}] ========== VISIBILITY SNAPSHOT END (SUCCESS) ==========`);

  return {
    success: true,
    message: 'Visibility snapshot generated successfully',
    snapshot,
    data: {
      email,
      website,
      status: 'completed',
      dataSource: pageSpeedData.source,
    },
  };
}

export async function handleVisibilitySnapshot(req, res) {
  const timestamp = new Date().toISOString();

  try {
    const result = await processVisibilitySnapshot(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(`[${timestamp}] 💥 HANDLER EXCEPTION:`, error.message);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      error: error.message || 'Failed to generate snapshot',
      timestamp,
    });
  }
}
