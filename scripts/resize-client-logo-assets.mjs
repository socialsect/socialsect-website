#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DIR = path.resolve(process.cwd(), 'public', 'client-logos');

const TARGETS = [
  { file: 'III.png', width: 310, height: 104 },
  { file: 'interface1.png', width: 160, height: 112 },
  { file: 'msi.png', width: 186, height: 112 },
  { file: 'nymv.png', width: 374, height: 112 },
];

async function resizeLogo({ file, width, height }) {
  const input = path.join(DIR, file);
  const tempOutput = path.join(DIR, `${file}.tmp`);

  await sharp(input)
    .resize({
      width,
      height,
      fit: 'contain',
      withoutEnlargement: true,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png({ compressionLevel: 9, effort: 6 })
    .toFile(tempOutput);

  await fs.rename(tempOutput, input);
  console.log(`Resized ${file} -> ${width}x${height}`);
}

async function main() {
  for (const target of TARGETS) {
    await resizeLogo(target);
  }

  console.log('Done');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});