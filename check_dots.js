const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'planning', 'reels');
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && /^\d{2}[A-Z]{2}$/.test(dirent.name))
  .map(dirent => dirent.name);

let out = [];
for (const d of dirs) {
  const dirPath = path.join(baseDir, d);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.csv'));
  for (const f of files) {
    const filePath = path.join(dirPath, f);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((l, i) => {
      if(l.includes('…')) {
        let match = l.match(/([^,]*…[^,]*)/g);
        if(match) out.push(`[${d}/${f}:${i+1}] ${match.join(' | ')}`);
      }
    });
  }
}
fs.writeFileSync(path.join(__dirname, 'dots.log'), out.join('\n'));
