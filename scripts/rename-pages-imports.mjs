import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist') continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(fullPath)
    else if (/\.(jsx?|mjs|css)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf8')
      const updated = content
        .replace(/@\/pages\//g, '@/views/')
        .replace(/from '\.\.\/pages\//g, "from '../views/")
        .replace(/from '\.\.\/\.\.\/pages\//g, "from '../../views/")
        .replace(/from '\.\.\/\.\.\/\.\.\/pages\//g, "from '../../../views/")
        .replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/pages\//g, "from '../../../../views/")
        .replace(/import '\.\.\/pages\//g, "import '../views/")
        .replace(/import '\.\.\/\.\.\/pages\//g, "import '../../views/")
      if (updated !== content) {
        fs.writeFileSync(fullPath, updated)
        console.log('updated', fullPath)
      }
    }
  }
}

walk(root)
