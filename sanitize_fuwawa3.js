const fs = require('fs');
const filepath = 'site/kensetsu/templates/type-l/index.html';
let html = fs.readFileSync(filepath, 'utf-8');
html = html.replace(/新井輝一/g, '高橋誠');
fs.writeFileSync(filepath, html, 'utf-8');
console.log("Updated Arai name to Takahashi!");
