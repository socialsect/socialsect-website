import fs from 'fs';
import { JSDOM } from 'jsdom';

const files = [
  '/Users/apple/.gemini/antigravity-ide/brain/dd7b678f-8b53-4abe-837e-7b63a7bd8f02/.system_generated/steps/46/content.md',
  '/Users/apple/.gemini/antigravity-ide/brain/dd7b678f-8b53-4abe-837e-7b63a7bd8f02/.system_generated/steps/105/content.md',
  '/Users/apple/.gemini/antigravity-ide/brain/dd7b678f-8b53-4abe-837e-7b63a7bd8f02/.system_generated/steps/146/content.md',
  '/Users/apple/.gemini/antigravity-ide/brain/dd7b678f-8b53-4abe-837e-7b63a7bd8f02/.system_generated/steps/173/content.md',
  '/Users/apple/.gemini/antigravity-ide/brain/dd7b678f-8b53-4abe-837e-7b63a7bd8f02/.system_generated/steps/242/content.md'
];

function parseHtml(htmlContent) {
  const html = htmlContent.split('---')[1] || htmlContent;
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  let data = {
    slug: "",
    path: "",
    metaTitle: "",
    metaDescription: "",
    heroHeadline: "",
    heroSubcopy: [],
    heroBullets: [],
    stats: [
      { value: "3–6 mo", label: "To First Local Ranking Movement" },
      { value: "50+", label: "Healthcare Clients" },
      { value: "4.9★", label: "Client Rating" }
    ],
    sections: [],
    faq: [],
    ctaHeadline: "",
    ctaCopy: "",
    ctaLabel: "Book a Consultation",
    ctaLink: "BOOK_A_CALL_FORM"
  };

  const styles = doc.querySelector('style')?.textContent || '';
  const boldClasses = new Set();
  const regex = /\.([a-zA-Z0-9_-]+)\{[^}]*font-weight:700/g;
  let match;
  while ((match = regex.exec(styles)) !== null) {
    boldClasses.add(match[1]);
  }
  const regex2 = /\.([a-zA-Z0-9_-]+)\{[^}]*font-weight:bold/g;
  while ((match = regex2.exec(styles)) !== null) {
    boldClasses.add(match[1]);
  }

  const elements = doc.body.children;
  let currentSection = null;
  let inHero = true;
  let inFaqs = false;
  let currentFaq = null;
  
  function getFormattedText(el) {
    if (!el) return '';
    let text = '';
    el.childNodes.forEach(node => {
      if (node.nodeType === 3) {
        text += node.textContent.replace(/\u00a0/g, ' ');
      } else if (node.nodeType === 1) {
        let isBold = node.tagName === 'STRONG' || node.tagName === 'B';
        if (!isBold && node.classList) {
          node.classList.forEach(cls => {
            if (boldClasses.has(cls)) isBold = true;
          });
        }
        
        let inner = getFormattedText(node);
        if (!inner) inner = node.textContent.replace(/\u00a0/g, ' ');

        if (isBold && inner.trim()) {
          text += `**${inner}**`;
        } else {
          text += inner;
        }
      }
    });
    return text.trim();
  }

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const text = getFormattedText(el);
    const rawText = el.textContent.replace(/\u00a0/g, ' ').trim();
    if (!text) continue;

    if (rawText.startsWith('Meta Title:')) {
      data.metaTitle = rawText.replace('Meta Title:', '').trim();
      continue;
    }
    if (rawText.startsWith('Meta Description:')) {
      data.metaDescription = rawText.replace('Meta Description:', '').trim();
      continue;
    }
    if (rawText.startsWith('Slug:')) {
      const parsedPath = rawText.replace('Slug:', '').trim();
      data.path = parsedPath.endsWith('/') ? parsedPath.slice(0, -1) : parsedPath;
      data.slug = data.path.replace(/^\//, '').replace(/\//g, '-');
      continue;
    }

    if (el.tagName === 'H1') {
      data.heroHeadline = text.replace(/\*\*/g, '');
      continue;
    }

    if (el.tagName === 'H2') {
      inHero = false;
      const h2Text = text.replace(/\*\*/g, '');
      if (h2Text === 'FAQs' || h2Text === 'FAQs - Healthcare Digital Marketing') {
        inFaqs = true;
      } else if (h2Text.includes('Build a Stronger') || h2Text.includes('Why Choose')) {
         currentSection = { title: h2Text, content: [], bullets: [] };
         data.sections.push(currentSection);
      } else {
        currentSection = { title: h2Text, content: [], bullets: [] };
        data.sections.push(currentSection);
      }
      continue;
    }

    if (el.tagName === 'H3') {
      if (inFaqs) {
        if (currentFaq) data.faq.push(currentFaq);
        currentFaq = { question: text.replace(/\*\*/g, ''), answer: [] };
      } else if (currentSection) {
        currentSection.content.push(`### ${text.replace(/\*\*/g, '')}`);
      }
      continue;
    }

    if (el.tagName === 'P') {
      if (inHero) {
        data.heroSubcopy.push(text);
      } else if (inFaqs && currentFaq) {
        currentFaq.answer.push(text);
      } else if (currentSection) {
        currentSection.content.push(text);
      }
      continue;
    }

    if (el.tagName === 'UL' || el.tagName === 'OL') {
      const items = Array.from(el.querySelectorAll('li')).map(li => getFormattedText(li));
      if (inHero) {
        data.heroBullets.push(...items);
      } else if (inFaqs && currentFaq) {
        currentFaq.answer.push(items.map(item => `- ${item}`).join('\n'));
      } else if (currentSection) {
        const hasSubheadings = currentSection.content.some(c => c.startsWith('### '));
        if (!hasSubheadings && currentSection.content.length > 0 && currentSection.bullets.length === 0 && Array.from(el.querySelectorAll('li')).length > 4) {
             currentSection.bullets = items;
        } else {
             items.forEach(item => currentSection.content.push(`- ${item}`));
        }
      }
      continue;
    }
  }
  
  if (currentFaq) {
    data.faq.push(currentFaq);
  }

  // Find CTA Section (assuming it's the last section)
  const ctaSection = data.sections[data.sections.length - 1];
  if (ctaSection) {
    data.ctaHeadline = ctaSection.title;
    data.ctaCopy = ctaSection.content.join(' ');
    data.sections.pop();
  }

  data.faq = data.faq.map(f => ({ question: f.question, answer: f.answer.join('\n\n') }));
  return data;
}

const allData = files.map(file => {
  const content = fs.readFileSync(file, 'utf8');
  return parseHtml(content);
});

// Write to a temporary file, import it, modify it, export it.
// Node can do dynamic import if we rename to .mjs or set type module (already type module).
// Wait, we can just replace the string in the file cleanly.
const targetFile = '/Users/apple/Desktop/gosocialsect/socialsect-website/src/views/dermatologists/dermatologistsSeoData.js';
let content = fs.readFileSync(targetFile, 'utf8');

// For each new item, find its object in the string and replace it.
// Because the object spans multiple lines and ends before the next `{ "slug":` or `];`, we can match it.
allData.forEach(d => {
  let replacement = JSON.stringify(d, null, 2).replace(/"ctaLink": "BOOK_A_CALL_FORM"/, '"ctaLink": BOOK_A_CALL_FORM');
  // Add spaces to indent
  replacement = replacement.split('\n').map((l, i) => i > 0 ? '  ' + l : l).join('\n');
  
  // Find the block from `{\n    "slug": "${d.slug}"` to the `  }` right before the next `,` or `\n]`
  const regex = new RegExp(`\\{\\s*"slug":\\s*"${d.slug}"[\\s\\S]*?\\n\\s*\\}(?=\\s*,\\s*\\{\\s*"slug"|\\s*\\];)`);
  if (regex.test(content)) {
    content = content.replace(regex, replacement);
  } else {
    // try matching the last one
    const regexLast = new RegExp(`\\{\\s*"slug":\\s*"${d.slug}"[\\s\\S]*?\\n\\s*\\}(?=\\s*\\];)`);
    if (regexLast.test(content)) {
      content = content.replace(regexLast, replacement);
    } else {
      console.log("Could not find matching object for", d.slug);
    }
  }
});

fs.writeFileSync(targetFile, content);
console.log("Updated dermatologistsSeoData.js with new bold formatting!");
