const fs = require('fs');
const pages = ['index.html', 'about.html', 'daily.html', 'facilities.html', 'admissions.html', 'contact.html', 'news.html'];
const base = 'site/client-work/07_youchien/hp/';
const allImgs = new Set();
pages.forEach(p => {
  if(fs.existsSync(base + p)) {
    const html = fs.readFileSync(base + p, 'utf8');
    const matches = html.matchAll(/src="images\/([^"]+\.(?:png|jpg|jpeg|webp))"/g);
    for(const m of matches) allImgs.add(m[1]);
  }
});
console.log([...allImgs].sort().join('\n'));
