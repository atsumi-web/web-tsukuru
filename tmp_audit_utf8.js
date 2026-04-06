const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'site/templates/democycle');
const checkStrings = [
  'drpedal',
  'dr-pedal',
  'ドクターペダル',
  '早川',
  'Hayakawa',
  'docomo',
  'ドコモ',
  'Lime',
  '三菱',
  'TripAdvisor',
  'Klook',
  '茨城',
  '土浦',
  '五反田',
  '品川',
  '03-4405-3213',
  '050-1725-6179',
  'KNビル'
];

let output = '';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        checkStrings.forEach(str => {
          if (line.toLowerCase().includes(str.toLowerCase())) {
            output += `FOUND "${str}" in ${fullPath.replace(__dirname, '')} [Line ${index + 1}]:\n  > ${line.trim()}\n`;
          }
        });
      });
    }
  }
}

processDir(targetDir);
if (!output) {
  output = 'CLEAN! No traces found.';
}
fs.writeFileSync(path.join(__dirname, 'audit_utf8.txt'), output, 'utf8');
