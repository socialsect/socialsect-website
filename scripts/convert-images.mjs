#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const DIR = path.resolve(process.cwd(), 'public', 'client-logos')

async function listImages() {
  const entries = await fs.readdir(DIR)
  return entries.filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
}

async function ensureConverted(file) {
  const input = path.join(DIR, file)
  const base = file.replace(/\.(png|jpg|jpeg|webp)$/i, '')
  const avifOut = path.join(DIR, `${base}.avif`)
  const webpOut = path.join(DIR, `${base}.webp`)

  try {
    const stat = await fs.stat(avifOut).catch(() => null)
    if (!stat) {
      console.log('Generating', path.basename(avifOut))
      await sharp(input).avif({ quality: 55 }).toFile(avifOut)
    } else {
      console.log('Exists', path.basename(avifOut))
    }

    const stat2 = await fs.stat(webpOut).catch(() => null)
    if (!stat2) {
      console.log('Generating', path.basename(webpOut))
      await sharp(input).webp({ quality: 75 }).toFile(webpOut)
    } else {
      console.log('Exists', path.basename(webpOut))
    }
  } catch (err) {
    console.error('Failed to convert', file, err)
  }
}

async function main() {
  try {
    const images = await listImages()
    if (images.length === 0) {
      console.log('No client logos found in', DIR)
      return
    }
    for (const file of images) {
      await ensureConverted(file)
    }
    console.log('Done')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
