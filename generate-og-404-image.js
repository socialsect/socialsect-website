import sharp from 'sharp'

const svgString = `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#161A1F" />
      <stop offset="0.4" stop-color="#222A35" />
      <stop offset="1" stop-color="#4E3ED6" />
    </linearGradient>
    <linearGradient id="text" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFFFFF" />
      <stop offset="1" stop-color="#B5B0FF" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" rx="48" fill="url(#bg)" />
  <circle cx="960" cy="130" r="160" fill="#FFFFFF" fill-opacity="0.08" />
  <circle cx="190" cy="520" r="170" fill="#695AF2" fill-opacity="0.16" />
  <text x="120" y="180" fill="url(#text)" font-family="Newsreader, Georgia, serif" font-size="120" font-weight="700">404</text>
  <text x="120" y="280" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="700">Page not found</text>
  <text x="120" y="360" fill="#E7E4FF" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="500">This link doesn’t exist on Socialsect.</text>
  <text x="120" y="520" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600">Socialsect</text>
</svg>
`

sharp(Buffer.from(svgString)).png().toFile('public/social-share-404.png')
  .then(() => {
    console.log('✓ 404 OG image created at public/social-share-404.png')
  })
  .catch((error) => {
    console.error('Error generating 404 OG image:', error)
    process.exit(1)
  })
