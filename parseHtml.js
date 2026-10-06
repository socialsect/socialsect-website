import fs from 'fs';
import { JSDOM } from 'jsdom';

const htmlContent = fs.readFileSync('/Users/apple/.gemini/antigravity-ide/brain/dd7b678f-8b53-4abe-837e-7b63a7bd8f02/.system_generated/steps/242/content.md', 'utf8');
const html = htmlContent.split('---')[1] || htmlContent; // Get the actual html part
const dom = new JSDOM(html);
const doc = dom.window.document;

function parseHtml() {
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
    faqs: [],
    ctaHeadline: "",
    ctaCopy: "",
    ctaLabel: "Book a Consultation",
    ctaLink: "BOOK_A_CALL_FORM"
  };

  // Dynamically find bold classes from style tag
  const styles = doc.querySelector('style').textContent;
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
        if (isBold) {
          text += `**${node.textContent.replace(/\u00a0/g, ' ')}**`;
        } else {
          text += node.textContent.replace(/\u00a0/g, ' ');
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
        if (currentFaq) data.faqs.push(currentFaq);
        currentFaq = { question: text.replace(/\*\*/g, ''), answer: [] };
      } else if (currentSection) {
        currentSection.content.push(text.replace(/\*\*/g, ''));
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
        if (currentSection.content.length > 0 && currentSection.bullets.length === 0 && Array.from(el.querySelectorAll('li')).length > 4) {
             currentSection.bullets = items;
        } else {
            currentSection.content.push(items.map(item => `- ${item}`).join('\n'));
        }
      }
      continue;
    }
  }
  
  if (currentFaq) {
    data.faqs.push(currentFaq);
  }

  // Find CTA Section (assuming it's the last section)
  const ctaSection = data.sections[data.sections.length - 1];
  if (ctaSection) {
    data.ctaHeadline = ctaSection.title;
    data.ctaCopy = ctaSection.content.join(' ');
    data.sections.pop();
  }

  fs.writeFileSync('parsedData2.json', JSON.stringify(data, null, 2));
  console.log("Success! Data parsed to parsedData2.json");
}

parseHtml();
