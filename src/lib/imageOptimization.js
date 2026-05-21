/**
 * Image optimization utility for responsive images with modern formats
 */

/**
 * Generate optimized image sources with modern formats
 * @param {string} src - Original image path (without extension)
 * @param {string} alt - Alt text for accessibility
 * @param {string} sizes - Image sizes attribute for responsive images
 * @returns {object} Object with srcSet, type, and alt properties
 */
export function getOptimizedImageSources(src, alt, sizes = '100vw') {
  // Remove extension if present
  const baseSrc = src.split('.')[0]
  
  return {
    alt,
    sizes,
    // Prefers WebP with fallback to original format
    webp: `${baseSrc}.webp 1x, ${baseSrc}@2x.webp 2x`,
    fallback: `${baseSrc}.png 1x, ${baseSrc}@2x.png 2x`,
  }
}

/**
 * Create a picture element for modern image format support
 * @param {string} src - Original image path (without extension)
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS class for styling
 * @returns {string} HTML string for picture element
 */
export function createResponsiveImage(src, alt, className = '') {
  const baseSrc = src.split('.')[0]
  
  return `
    <picture class="${className}">
      <source srcset="${baseSrc}.webp 1x, ${baseSrc}@2x.webp 2x" type="image/webp" />
      <img 
        src="${baseSrc}.png" 
        srcset="${baseSrc}@2x.png 2x" 
        alt="${alt}"
        loading="lazy"
        decoding="async"
      />
    </picture>
  `.trim()
}

/**
 * Optimize images with lazy loading and aspect ratio
 * @param {HTMLImageElement} img - Image element
 */
export function optimizeImage(img) {
  if (!img) return
  
  // Add lazy loading
  if (!img.hasAttribute('loading')) {
    img.setAttribute('loading', 'lazy')
  }
  
  // Add async decoding to prevent blocking
  if (!img.hasAttribute('decoding')) {
    img.setAttribute('decoding', 'async')
  }
  
  // Add width/height to prevent CLS if not already present
  if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
    const computedStyle = window.getComputedStyle(img)
    if (computedStyle.width && computedStyle.height) {
      img.setAttribute('width', computedStyle.width)
      img.setAttribute('height', computedStyle.height)
    }
  }
}

/**
 * Batch optimize all images on page
 */
export function optimizeAllImages() {
  document.querySelectorAll('img').forEach(optimizeImage)
}
