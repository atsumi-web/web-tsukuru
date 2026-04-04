const fs = require('fs');
const html = fs.readFileSync('site/client-work/07_youchien/hp/index.html', 'utf8');

const regex = /href=\"([^\"]+)\"/g;
let match;
const links = new Set();
while ((match = regex.exec(html)) !== null) {
  links.add(match[1]);
}
console.log([...links]);
