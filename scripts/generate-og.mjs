import sharp from 'sharp';

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
  <text x="120" y="100" fill="#FFFFFF" font-family="Newsreader, Georgia, serif" font-size="28" font-weight="400">Socialsect</text>
  <line x1="120" y1="120" x2="200" y2="120" stroke="#695AF2" stroke-width="2" />
  <text x="120" y="240" fill="#FFFFFF" font-family="Newsreader, Georgia, serif" font-size="58" font-weight="500">You spent a decade becoming</text>
  <text x="120" y="315" fill="#FFFFFF" font-family="Newsreader, Georgia, serif" font-size="58" font-weight="500">a great doctor.</text>
  <text x="120" y="415" fill="#E7E4FF" font-family="Newsreader, Georgia, serif" font-size="58" font-weight="500">You shouldn't spend another</text>
  <text x="120" y="490" fill="#E7E4FF" font-family="Newsreader, Georgia, serif" font-size="58" font-weight="500">figuring out marketing.</text>
</svg>
`;

try {
  await sharp(Buffer.from(svgString)).png().toFile('public/social-share.png');
  console.log('✓ OG image created successfully');
} catch (e) {
  console.error('Error:', e.message);
  process.exit(1);
}
