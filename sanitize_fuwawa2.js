const fs = require('fs');

const filepath = 'site/kensetsu/templates/type-l/index.html';
let html = fs.readFileSync(filepath, 'utf-8');

html = html.replace(/kawashima_profile\.jpg/g, 'counselor_dummy.png');
html = html.replace(/子供自信協会/g, 'キッズエール協会');

fs.writeFileSync(filepath, html, 'utf-8');
console.log("Updated profile image and association name!");
