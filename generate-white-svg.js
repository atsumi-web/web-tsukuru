const fs = require('fs');
let svg = fs.readFileSync('site/client-work/07_youchien/hp/images/organic-remix.svg', 'utf8');
svg = svg.replace(/fill=\"#[A-Fa-f0-9]{3,6}\"/gi, 'fill=\"#ffffff\"');
svg = svg.replace(/stroke=\"#[A-Fa-f0-9]{3,6}\"/gi, 'stroke=\"#ffffff\"');
fs.writeFileSync('site/client-work/07_youchien/hp/images/organic-remix-white.svg', svg);
console.log('Done');
