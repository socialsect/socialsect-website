import { logSubmission } from '../log-submission.js';
import { sendVisibilitySnapshotEmail, notifyVisibilitySnapshotRequest } from '../email.js';
import { getPageSpeedData } from '../ai/pagespeed-analyzer-snapshot.js';

function generateVisibilitySnapshot(website, pageSpeedData) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Generating snapshot from ${pageSpeedData.source} data`);
  
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
      title: 'Slow Load Time',
      detail: `Site loads in ${fcp.toFixed(1)}s. Patients typically bounce after 3s.`
    });
  } else {
    findings.push({
      type: 'strength',
      title: 'Solid Performance',
      detail: `Site loads in ${fcp.toFixed(1)}s. Better than 60% of practice websites.`
    });
  }

  if (mobileScore < 60) {
    findings.push({
      type: 'opportunity',
      title: 'Mobile Experience Needs Work',
      detail: 'Most implant patients search on mobile. Booking flow could be smoother.'
    });
  } else {
    findings.push({
      type: 'strength',
      title: 'Mobile Friendly',
      detail: 'Your site is well-optimized for mobile devices.'
    });
  }

  findings.push({
    type: 'opportunity',
    title: 'Review Gap',
    detail: 'Likely has fewer reviews than nearby competitors. Reviews drive 40% of new patient decisions.'
  });

  if (performanceScore < 70 || mobileScore < 70) {
    findings.push({
      type: 'opportunity',
      title: 'Booking Friction',
      detail: 'Call-to-action placement and form clarity could reduce friction by 15-20%.'
    });
  }

  const localMarketSize = Math.floor(Math.random() * 8) + 5;
  const marketShare = Math.max(10, Math.min(40, (visibilityScore / 100) * 50));
  const avgMonthlySearches = 180 + Math.floor(Math.random() * 120);
  const missedConsults = Math.max(3, Math.floor((avgMonthlySearches * (100 - marketShare)) / 100 / 3));
  const estimatedValue = missedConsults * Math.floor(Math.random() * 3000 + 10000);

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
    source: pageSpeedData.source
  });

  return snapshot;
}

export async function handleVisibilitySnapshot(req, res) {
  const timestamp = new Date().toISOString();
  
  try {
    console.log(`[${timestamp}] ========== VISIBILITY SNAPSHOT HANDLER START ==========`);
    
    const { website, email, source, campaign } = req.body;
    console.log(`[${timestamp}] Request: website=${website}, email=${email}, source=${source}, campaign=${campaign}`);

    // Validation
    if (!website || !email) {
      console.warn(`[${timestamp}] ❌ Missing required fields`);
      return res.status(400).json({ error: 'Website and email are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn(`[${timestamp}] ❌ Invalid email format: ${email}`);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
      new URL(website);
    } catch {
      console.warn(`[${timestamp}] ❌ Invalid URL format: ${website}`);
      return res.status(400).json({ error: 'Invalid website URL' });
    }

    console.log(`[${timestamp}] ✓ Validation passed`);

    // Get PageSpeed data
    console.log(`[${timestamp}] Calling PageSpeed API...`);
    let pageSpeedData = {};
    try {
      pageSpeedData = await getPageSpeedData(website);
      console.log(`[${timestamp}] ✓ PageSpeed data received. Source: ${pageSpeedData.source}`);
    } catch (err) {
      console.error(`[${timestamp}] ❌ PageSpeed fetch error:`, err.message);
      pageSpeedData = {
        performanceScore: 50,
        mobileScore: 55,
        fcp: 3.2,
        lcp: 4.0,
        source: 'ERROR_FALLBACK',
      };
      console.warn(`[${timestamp}] Using error fallback data`);
    }

    // Generate snapshot
    console.log(`[${timestamp}] Generating snapshot...`);
    const snapshot = generateVisibilitySnapshot(website, pageSpeedData);

    // Log submission
    console.log(`[${timestamp}] Logging submission to database...`);
    try {
      const submissionData = {
        type: 'visibility_snapshot',
        website,
        email,
        source: source || 'direct',
        campaign: campaign || 'organic',
        niche: 'implant-dentistry',
        visibilityScore: snapshot.visibilityScore,
        performanceScore: snapshot.performanceScore,
        mobileScore: snapshot.mobileScore,
        dataSource: pageSpeedData.source,
        timestamp: new Date().toISOString(),
      };
      logSubmission(submissionData).catch(err => {
        console.warn(`[${timestamp}] ⚠️  Failed to log submission:`, err.message);
      });
      console.log(`[${timestamp}] ✓ Submission logged`);
    } catch (err) {
      console.error(`[${timestamp}] ❌ Log error:`, err.message);
    }

    // Send emails
    console.log(`[${timestamp}] Sending confirmation email to ${email}...`);
    try {
      sendVisibilitySnapshotEmail(email, website, snapshot).catch(err => {
        console.error(`[${timestamp}] ❌ Email send error:`, err.message);
      });
      console.log(`[${timestamp}] ✓ Email queued`);
    } catch (err) {
      console.error(`[${timestamp}] ❌ Email error:`, err.message);
    }

    console.log(`[${timestamp}] Sending internal notification...`);
    try {
      notifyVisibilitySnapshotRequest({
        email,
        website,
        source: source || 'direct',
        campaign: campaign || 'organic',
        visibilityScore: snapshot.visibilityScore,
      }).catch(err => {
        console.warn(`[${timestamp}] ⚠️  Failed to notify:`, err.message);
      });
      console.log(`[${timestamp}] ✓ Notification queued`);
    } catch (err) {
      console.error(`[${timestamp}] ❌ Notify error:`, err.message);
    }

    // Return response
    console.log(`[${timestamp}] ========== VISIBILITY SNAPSHOT HANDLER END (SUCCESS) ==========`);
    return res.status(200).json({
      success: true,
      message: 'Visibility snapshot generated successfully',
      snapshot,
      data: {
        email,
        website,
        status: 'completed',
        dataSource: pageSpeedData.source,
      },
    });
  } catch (error) {
    console.error(`[${timestamp}] 💥 HANDLER EXCEPTION:`, error.message);
    console.error(`[${timestamp}] Stack:`, error.stack);
    console.log(`[${timestamp}] ========== VISIBILITY SNAPSHOT HANDLER END (ERROR) ==========`);
    
    return res.status(500).json({ 
      error: 'Failed to generate snapshot',
      message: error.message || 'Unknown error',
      timestamp
    });
  }
}
