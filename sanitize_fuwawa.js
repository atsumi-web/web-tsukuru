const fs = require('fs');

const filepath = 'site/kensetsu/templates/type-l/index.html';
if (!fs.existsSync(filepath)) {
    console.error("File not found:", filepath);
    process.exit(1);
}

let html = fs.readFileSync(filepath, 'utf-8');

// Replacements for sanitization
html = html.replace(/ふわわ/g, 'ココン');
html = html.replace(/とちぎ/g, 'とうきょう');
html = html.replace(/宇都宮市/g, '世田谷区');
html = html.replace(/宇都宮/g, '世田谷');
html = html.replace(/川嶋/g, '杉本');
html = html.replace(/桂/g, '結衣');
html = html.replace(/080-8378-9762/g, '090-0000-0000');
html = html.replace(/fuwawa\.utsunomiya@gmail\.com/g, 'info@cocon-sample.com');
html = html.replace(/西川田東町/g, '奥沢1-2-3');
html = html.replace(/埼玉県大宮市生まれ/g, '東京都生まれ');
html = html.replace(/2024/g, '2025');

fs.writeFileSync(filepath, html, 'utf-8');
console.log("Sanitized successfully");
