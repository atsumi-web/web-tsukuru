const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'site/cw_portfolio/lp/08_bicycle');

const replacements = [
  { search: /ドクターペダル/g, replace: 'デモサイクル' },
  { search: /Doctor Pedal/g, replace: 'Demo Cycle' },
  { search: /DoctorPedal/g, replace: 'DemoCycle' },
  // skip replacing 'drpedal' because it might break image class names or file names?
  // Wait, let's keep drpedal class names intact unless it's text. But there's "info@dr-pedal.com".
  { search: /info@dr-pedal\.com/g, replace: 'info@demo-cycle.com' },
  { search: /早川 光/g, replace: '山田 太郎' },
  { search: /早川/g, replace: '山田' },
  { search: /Hayakawa/gi, replace: 'Yamada' },
  { search: /品川区東五反田2-8-5/g, replace: '港区ダミー町1-1-1' },
  { search: /東五反田2-8-5/g, replace: 'ダミー町1-1-1' },
  { search: /KNビル5F/g, replace: 'デモビル5F' },
  { search: /下目黒3丁目10-36/g, replace: 'ダミー町2-2-2' },
  { search: /下目黒3-10-36/g, replace: 'ダミー町2-2-2' },
  { search: /四谷1-26-9/g, replace: 'ダミー町3-3-3' },
  { search: /050-1725-6179/g, replace: '050-0000-0000' }
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      for (const r of replacements) {
        content = content.replace(r.search, r.replace);
      }
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

try {
  processDir(targetDir);
  console.log('Replacement complete.');
} catch (error) {
  console.error('Error processing directory:', error);
}
