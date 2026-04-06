const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'site/templates/democycle');
// Strings to check for traces of the old information
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

function processDir(dir) {
  let issuesFound = false;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (processDir(fullPath)) issuesFound = true;
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        checkStrings.forEach(str => {
          if (line.toLowerCase().includes(str.toLowerCase())) {
            console.log(`FOUND "${str}" in ${fullPath.replace(__dirname, '')} [Line ${index + 1}]:`);
            console.log(`  > ${line.trim()}`);
            issuesFound = true;
          }
        });
      });
    }
  }
  return issuesFound;
}

const found = processDir(targetDir);
if (!found) {
  console.log('CLEAN! No traces found.');
}
