const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'planning', 'reels');
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && /^\d{2}[A-Z]{2}$/.test(dirent.name))
  .map(dirent => dirent.name);

let over60 = 0;
let over50 = 0;
let total = 0;
let details = [];

dirs.forEach(d => {
  const dirPath = path.join(baseDir, d);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.csv') && !f.includes('cover'));
  files.forEach(f => {
    const filePath = path.join(dirPath, f);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // skip header
    for(let i=1; i<lines.length; i++) {
        if(!lines[i].trim()) continue;
        // Parse simple CSV (assumes no internal quotes/commas for reels 1-4)
        // Actually, let's use a regex to split by comma outside quotes if necessary,
        // but since rule was "no commas inside text", a simple split is okay for cols 1-4
        // To be safe, let's parse properly.
        const row = lines[i];
        let cells = [];
        let inQuotes = false;
        let curr = '';
        for(let j=0; j<row.length; j++) {
            if(row[j] === '"') inQuotes = !inQuotes;
            else if(row[j] === ',' && !inQuotes) {
                cells.push(curr);
                curr = '';
            } else {
                curr += row[j];
            }
        }
        cells.push(curr);
        
        // Check cols 2,3,4,5 (フック, 問題, 解説, 解決) which are indices 2,3,4,5
        for(let c=2; c<=5; c++) {
            if(cells[c]) {
                const text = cells[c];
                total++;
                if(text.length > 60) {
                    over60++;
                    details.push(`[${f}:L${i+1}] ${text.length}字: ${text}`);
                } else if(text.length >= 50) {
                    over50++;
                }
            }
        }
    }
  });
});

fs.writeFileSync(path.join(__dirname, 'length_check.log'), `Total cells: ${total}\nOver 60 chars: ${over60}\n50-60 chars: ${over50}\n\n` + details.join('\n'));
console.log(`Check complete. Over 60: ${over60}, 50-60: ${over50}`);
