const sharp = require('sharp');

const svgString = `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="126" y1="42" x2="1074" y2="588" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1A1C1D" />
      <stop offset="0.48" stop-color="#21262F" />
      <stop offset="1" stop-color="#695AF2" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" rx="48" fill="url(#bg)" />
  <circle cx="932" cy="164" r="220" fill="#FFFFFF" fill-opacity="0.08" />
  <circle cx="180" cy="524" r="160" fill="#695AF2" fill-opacity="0.22" />
  <text x="120" y="140" fill="#FFFFFF" font-family="Newsreader, Georgia, serif" font-size="58" font-weight="500">You spent a decade becoming</text>
  <text x="120" y="215" fill="#FFFFFF" font-family="Newsreader, Georgia, serif" font-size="58" font-weight="500">a great doctor.</text>
  <text x="120" y="315" fill="#E7E4FF" font-family="Newsreader, Georgia, serif" font-size="58" font-weight="500">You shouldn't spend another</text>
  <text x="120" y="390" fill="#E7E4FF" font-family="Newsreader, Georgia, serif" font-size="58" font-weight="500">figuring out marketing.</text>
  <text x="120" y="520" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="600">Socialsect</text>
</svg>
`;

sharp(Buffer.from(svgString)).png().toFile('public/social-share.png').then(() => {
  console.log('✓ OG image created');
  process.exit(0);
}).catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
