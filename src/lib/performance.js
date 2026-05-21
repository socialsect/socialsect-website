/**
 * Performance utilities for optimizing page load
 */

/**
 * Load CSS asynchronously to avoid render-blocking
 * @param {string} href - The CSS file URL
 * @param {string} media - Optional media query (e.g., 'print')
 */
export function loadCSSAsync(href, media = 'all') {
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print'; // Load as non-blocking initially
    link.onload = () => {
      link.media = media; // Switch to active media after loading
      resolve();
    };
    link.onerror = () => {
      console.warn(`Failed to load CSS: ${href}`);
      resolve(); // Don't block page if CSS fails
    };
    document.head.appendChild(link);
  });
}

/**
 * Preload a script without executing it
 * @param {string} src - The script file URL
 */
export function preloadScript(src) {
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Defer non-critical CSS loading
 */
export function deferNonCriticalStyles() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNonCriticalCSS);
  } else {
    loadNonCriticalCSS();
  }
}

function loadNonCriticalCSS() {
  // Load utility/component-specific CSS after page interactive
  const nonCriticalCSS = [
    '/src/components/HomeHero.css',
    '/src/components/ClientLogoMarquee.css',
  ];
  
  nonCriticalCSS.forEach(href => {
    loadCSSAsync(href, 'all');
  });
}

/**
 * Enable resource hints for known routes
 */
export function enableResourcePrefetch() {
  // Prefetch resources when user is idle (using requestIdleCallback)
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Prefetch API endpoints or common routes
      if (navigator.connection?.saveData !== true) {
        const prefetchUrls = [
          '/services',
          '/how-we-work',
          '/results',
        ];
        
        prefetchUrls.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          document.head.appendChild(link);
        });
      }
    });
  }
}
