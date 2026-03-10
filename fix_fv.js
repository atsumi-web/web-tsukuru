const fs = require('fs');
const path = 'site/client-work/01_hotta/fv_strategy.html';
let c = fs.readFileSync(path, 'utf8');
// The actual title still in the file
const old = '\u2463 \u306a\u305c\u300c1\u5e74\u76ee\u304b\u3089\u6708\u7d2523\u4e07\u5186\uff5e\u300d\u306b\u3057\u305f\u304b';
const newTitle = '\u2463 1\u5e74\u76ee\u304b\u3089\u6708\u7d2523\u4e07\u5186\uff5e\u8868\u8a18\u306b\u3064\u3044\u3066';
if (c.includes(old)) {
  c = c.replace(old, newTitle);
  fs.writeFileSync(path, c, 'utf8');
  console.log('OK');
} else {
  console.log('NG');
}
