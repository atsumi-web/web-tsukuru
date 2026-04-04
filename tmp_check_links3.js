const fs = require('fs');
const html = fs.readFileSync('site/client-work/07_youchien/hp/index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if(l.includes('href=\"#\"') || l.includes('href=\"javascript')) {
    console.log(i + ': ' + l.trim());
  }
});
