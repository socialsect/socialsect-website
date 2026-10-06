const fs = require('fs');

const data = require('./parsedData2.json');
// Fix the keys to match the schema
data.faq = data.faqs.map(f => ({ question: f.question, answer: f.answer.join('\n\n') }));
delete data.faqs;

const dataString = JSON.stringify(data, null, 2).replace('"BOOK_A_CALL_FORM"', 'BOOK_A_CALL_FORM');

const targetFile = '/Users/apple/Desktop/gosocialsect/socialsect-website/src/views/dermatologists/dermatologistsSeoData.js';
let content = fs.readFileSync(targetFile, 'utf8');

content = content.replace(/\n];\n/, ',\n' + dataString + '\n];\n');

fs.writeFileSync(targetFile, content);
console.log('Appended to dermatologistsSeoData.js');
