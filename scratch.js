const allContent = [
  "Paragraph 1",
  "### Heading",
  "Paragraph 2",
  "- Bullet 1",
  "- Bullet 2",
  "- Bullet 3",
  "Paragraph 3"
];

const processed = [];
let currentList = null;

allContent.forEach(item => {
  if (item.startsWith('- ')) {
    if (!currentList) {
      currentList = [];
      processed.push({ type: 'list', items: currentList });
    }
    currentList.push(item.substring(2));
  } else {
    currentList = null;
    if (item.startsWith('### ')) {
      processed.push({ type: 'h3', text: item.substring(4) });
    } else {
      processed.push({ type: 'p', text: item });
    }
  }
});
console.log(processed);
