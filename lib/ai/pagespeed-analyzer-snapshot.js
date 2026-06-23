import { getPageSpeedApiKey } from '../env.js';

/**
 * Fetch real PageSpeed Insights data for a website
 * Always attempts real API first, falls back to mock data if it fails
 */
export async function getPageSpeedData(website) {
  const timestamp = new Date().toISOString();
  const apiKey = getPageSpeedApiKey();
  
  console.log(`[${timestamp}] ========== PAGESPEED API START ==========`);
  console.log(`[${timestamp}] Target URL: ${website}`);
  console.log(`[${timestamp}] API Key Available: ${!!apiKey}`);

  if (!apiKey) {
    console.warn(`[${timestamp}] ⚠️  NO API KEY - Using mock data as fallback`);
    console.log(`[${timestamp}] ========== PAGESPEED API END (MOCK) ==========`);
    return getMockPageSpeedData();
  }

  try {
    console.log(`[${timestamp}] 🔄 Fetching from Google PageSpeed API...`);
    const url = `https://www.googleapis.com/pagespeedonline.v5/runPagespeed?url=${encodeURIComponent(website)}&key=${apiKey}&strategy=mobile`;
    
    const startTime = Date.now();
    const response = await fetch(url, { timeout: 30000 });
    const duration = Date.now() - startTime;
    
    console.log(`[${timestamp}] Response Status: ${response.status} (took ${duration}ms)`);

    if (!response.ok) {
      console.warn(`[${timestamp}] ❌ PageSpeed API returned ${response.status}`);
      console.log(`[${timestamp}] ========== PAGESPEED API END (ERROR) ==========`);
      return getMockPageSpeedData();
    }

    const data = await response.json();
    console.log(`[${timestamp}] ✓ Response received and parsed`);

    // Validate response has proper structure
    if (!data.lighthouseResult?.categories?.performance) {
      console.warn(`[${timestamp}] ❌ Invalid PageSpeed response structure`);
      console.log(`[${timestamp}] Response keys:`, Object.keys(data));
      console.log(`[${timestamp}] ========== PAGESPEED API END (INVALID) ==========`);
      return getMockPageSpeedData();
    }

    const parsed = parsePageSpeedResponse(data);
    console.log(`[${timestamp}] ✓ Successfully parsed PageSpeed data:`, parsed);
    console.log(`[${timestamp}] ========== PAGESPEED API END (SUCCESS) ==========`);
    return parsed;
  } catch (error) {
    console.error(`[${timestamp}] 💥 Exception during PageSpeed fetch:`, error.message);
    console.error(`[${timestamp}] Error type: ${error.constructor.name}`);
    console.error(`[${timestamp}] Stack:`, error.stack);
    console.log(`[${timestamp}] ========== PAGESPEED API END (EXCEPTION) ==========`);
    return getMockPageSpeedData();
  }
}

function parsePageSpeedResponse(data) {
  const timestamp = new Date().toISOString();
  try {
    const metrics = data.lighthouseResult?.audits?.['metrics']?.details?.items?.[0] || {};
    const categories = data.lighthouseResult?.categories || {};

    const performanceScore = Math.round((categories.performance?.score || 0.5) * 100);
    const mobileScore = performanceScore;

    console.log(`[${timestamp}] Parsed metrics:`, {
      performance: performanceScore,
      mobile: mobileScore,
      fcp: metrics.first_contentful_paint,
      lcp: metrics.largest_contentful_paint,
    });

    return {
      performanceScore,
      mobileScore,
      fcp: (metrics.first_contentful_paint || 3000) / 1000,
      lcp: (metrics.largest_contentful_paint || 4000) / 1000,
      cls: metrics.cumulative_layout_shift || 0.1,
      speedIndex: (metrics.speed_index || 4000) / 1000,
      timeToInteractive: (metrics.interactive || 5000) / 1000,
      source: 'REAL_PAGESPEED_API',
    };
  } catch (error) {
    console.error(`[${timestamp}] Parse error:`, error.message);
    return getMockPageSpeedData();
  }
}

function getMockPageSpeedData() {
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
    source: 'MOCK_DATA',
  };

  console.warn(`[${timestamp}] ⚠️  Using MOCK DATA (fallback):`, mockData);
  return mockData;
}
