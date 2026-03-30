const fs = require('fs'), path = require('path');
const raw = fs.readFileSync('planning/posting_schedule_filtered.csv','utf8').replace(/^\uFEFF/,'');
const allLines = raw.split(/\r\n|\n/).filter(l => l.trim());
const headers = allLines[0].split(',');
const coverIdx = headers.indexOf('表紙テキスト');
const dataLines = allLines.slice(1);
const OUTPUT_DIR = 'planning/canva_filtered';
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
const BATCH = 60;
let bn = 1;
for (let i = 0; i < dataLines.length; i += BATCH) {
  const batch = dataLines.slice(i, i + BATCH);
  const hRow = batch.map((_, j) => '表紙' + (j + 1)).join(',');
  const dRow = batch.map(l => {
    const c = l.split(',');
    return '"' + (c[coverIdx] || '').replace(/^"|"$/g, '').trim() + '"';
  }).join(',');
  const fn = 'canva_filtered_' + String(bn).padStart(2, '0') + '.csv';
  fs.writeFileSync(path.join(OUTPUT_DIR, fn), '\uFEFF' + hRow + '\n' + dRow + '\n', 'utf8');
  console.log(fn + ' (' + (i + 1) + '〜' + Math.min(i + BATCH, dataLines.length) + '本目)');
  bn++;
}
console.log('完了: ' + OUTPUT_DIR);
