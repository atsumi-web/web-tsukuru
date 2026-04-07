const fs = require('fs');
const filepath = 'site/client-work/09_kibou_no_hoshi/index.html';
const outpath = 'site/client-work/09_kibou_no_hoshi/demo.html';

let html = fs.readFileSync(filepath, 'utf-8');

// Sanitize Name
html = html.replace(/希望の星/g, 'ビルドクリーン');

// Sanitize Addresses
html = html.replace(/東京都[\w]+区[\w\-]+/g, '東京都港区青南1-2-3');
html = html.replace(/03-\d{4}-\d{4}/g, '03-0000-0000');
html = html.replace(/渋谷区恵比寿2-28-10/g, '港区青南1-2-3');
html = html.replace(/代表取締役[\s\u3000]*[^\s<]+/g, '代表取締役 山田 太郎');

// Write out
fs.writeFileSync(outpath, html, 'utf-8');
console.log("Sanitized successfully to demo.html");
