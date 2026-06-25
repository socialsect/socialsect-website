import { getPageSpeedApiKey } from '../env.js';

const PAGESPEED_API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

/**
 * Fetch real PageSpeed Insights data for a website.
 * Uses mock data only when no API key is configured (local dev without .env).
 */
export async function getPageSpeedData(website) {
  const timestamp = new Date().toISOString();
  const apiKey = getPageSpeedApiKey();

  console.log(`[${timestamp}] ========== PAGESPEED API START ==========`);
  console.log(`[${timestamp}] Target URL: ${website}`);
  console.log(`[${timestamp}] API Key Available: ${!!apiKey}`);

  if (!apiKey) {
    console.warn(`[${timestamp}] ⚠️  NO API KEY - Using mock data for local development`);
    console.log(`[${timestamp}] ========== PAGESPEED API END (MOCK) ==========`);
    return getMockPageSpeedData('NO_API_KEY');
  }

  try {
    console.log(`[${timestamp}] 🔄 Fetching from Google PageSpeed API...`);
    const url =
      `${PAGESPEED_API}?url=${encodeURIComponent(website)}` +
      `&key=${apiKey}&strategy=mobile&category=performance`;

    const startTime = Date.now();
    const response = await fetch(url);
    const duration = Date.now() - startTime;

    console.log(`[${timestamp}] Response Status: ${response.status} (took ${duration}ms)`);

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      console.warn(`[${timestamp}] ❌ PageSpeed API returned ${response.status}: ${errorBody.slice(0, 300)}`);
      throw new Error(`PageSpeed API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.lighthouseResult?.categories?.performance) {
      console.warn(`[${timestamp}] ❌ Invalid PageSpeed response structure`);
      console.log(`[${timestamp}] Response keys:`, Object.keys(data));
      throw new Error('Invalid PageSpeed response structure');
    }

    const parsed = parsePageSpeedResponse(data);
    console.log(`[${timestamp}] ✓ Successfully parsed PageSpeed data:`, parsed);
    console.log(`[${timestamp}] ========== PAGESPEED API END (SUCCESS) ==========`);
    return parsed;
  } catch (error) {
    console.error(`[${timestamp}] 💥 PageSpeed fetch failed:`, error.message);
    console.log(`[${timestamp}] ========== PAGESPEED API END (ERROR) ==========`);
    throw error;
  }
}

function parsePageSpeedResponse(data) {
  const categories = data.lighthouseResult?.categories || {};
  const audits = data.lighthouseResult?.audits || {};
  const metrics = audits.metrics?.details?.items?.[0] || {};

  const performanceScore = Math.round((categories.performance?.score || 0) * 100);
  const mobileScore = performanceScore;

  const fcpMs =
    audits['first-contentful-paint']?.numericValue ??
    metrics.first_contentful_paint_ms ??
    metrics.first_contentful_paint;
  const lcpMs =
    audits['largest-contentful-paint']?.numericValue ??
    metrics.largest_contentful_paint_ms ??
    metrics.largest_contentful_paint;
  const cls =
    audits['cumulative-layout-shift']?.numericValue ??
    metrics.cumulative_layout_shift ??
    0;
  const speedIndexMs =
    audits['speed-index']?.numericValue ?? metrics.speed_index ?? metrics.speed_index_ms;
  const ttiMs =
    audits.interactive?.numericValue ?? metrics.interactive ?? metrics.time_to_interactive;

  return {
    performanceScore,
    mobileScore,
    fcp: fcpMs ? fcpMs / 1000 : 3.5,
    lcp: lcpMs ? lcpMs / 1000 : 4.0,
    cls: cls || 0.1,
    speedIndex: speedIndexMs ? speedIndexMs / 1000 : 4.0,
    timeToInteractive: ttiMs ? ttiMs / 1000 : 5.0,
    source: 'REAL_PAGESPEED_API',
  };
}

function getMockPageSpeedData(reason = 'MOCK_DATA') {
  const timestamp = new Date().toISOString();
  const performanceBase = Math.floor(Math.random() * 60) + 30;
  const mobileBase = Math.floor(Math.random() * 65) + 25;

  const mockData = {
    performanceScore: performanceBase,
    mobileScore: mobileBase,
    fcp: parseFloat((Math.random() * 3 + 1.5).toFixed(2)),
    lcp: parseFloat((Math.random() * 3 + 2).toFixed(2)),
    cls: parseFloat((Math.random() * 0.2 + 0.05).toFixed(3)),
    speedIndex: parseFloat((Math.random() * 4 + 2).toFixed(1)),
    timeToInteractive: parseFloat((Math.random() * 5 + 2.5).toFixed(1)),
    source: reason,
  };

  console.warn(`[${timestamp}] ⚠️  Using mock PageSpeed data (${reason}):`, mockData);
  return mockData;
}
