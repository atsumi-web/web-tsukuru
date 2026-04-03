const fs = require('fs');

const stylePath = 'site/client-work/07_youchien/hp/css/style.css';
let content = fs.readFileSync(stylePath, 'utf8');

console.log('--- Last 300 chars of style.css ---');
console.log(content.slice(-300));
