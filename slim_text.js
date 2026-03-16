const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'planning', 'reels');
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && /^\d{2}[A-Z]{2}$/.test(dirent.name))
  .map(dirent => dirent.name);

// Priority replacements (applied one by one until text.length <= 54)
const fluff = [
  /圧倒的(な|に)/g,
  /強烈(な|に)?/g,
  /本気の本気の/g,
  /本気(な|に|の)/g,
  /狂気(的(な|に))?/g,
  /残酷(な|に|すぎる)?/g,
  /完全無欠の/g,
  /完全(な|に)(なる)?/g,
  /絶対的(な|に)/g,
  /確実(な|に)/g,
  /確固たる/g,
  /唯一無二の/g,
  /極端に/g,
  /過剰に/g,
  /凄まじい/g,
  /恐ろしい/g,
  /無情(な|に)/g,
  /無意味(な|に)な?/g,
  /不毛(な|に)?/g,
  /一ミリも/g,
  /1ミリも/g,
  /一滴も/g,
  /一円単位で/g,
  /1円単位で/g,
  /実に/g,
  /まさに/g,
  /本当に/g,
  /最終的に/g,
  /結局は/g,
  /結局/g,
  /無意識に/g,
  /無防備に/g,
  /盲目的に/g,
  /自動的に/g,
  /一方的に/g,
  /今今日で/g,
  /今すぐ/g,
  /一生涯/g,
  /一生/g,
  /永続的に/g,
  /永遠の/g,
  /24時間いつでも/g,
  /24時間365日/g,
  /24時間/g,
  /何百倍も/g,
  /100倍/g,
  /思考停止のまま/g,
  /思考停止の/g,
  /脳死状態で/g,
  /底の抜けた/g,
  /穴の空いた/g,
  /最悪の事態です/g,
  /最悪の/g,
  /致命的な/g,
  /ブラックボックスになっていませんか/g,
  /ブラックボックスに/g,
  /無間地獄を/g,
  /無間地獄に/g,
  /ありきたりな/g,
  /ありふれた/g,
  /よくある/g,
  /無難な/g,
  /聞き飽きた/g,
  /得体の知れない/g,
  /薄っぺらい/g,
  /最優先で/g,
  /独自の/g // Only drop if still over 55
];

let totalTrimmed = 0;
let details = [];

dirs.forEach(d => {
  const dirPath = path.join(baseDir, d);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.csv') && !f.includes('cover'));
  files.forEach(f => {
    const filePath = path.join(dirPath, f);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let isModified = false;
    
    for(let i=1; i<lines.length; i++) {
        if(!lines[i].trim()) continue;
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
        
        // Cols 2..5 (index 2 to 5)
        let rowModified = false;
        for(let c=2; c<=5; c++) {
            if(cells[c]) {
                let text = cells[c];
                const hasQuotes = text.startsWith('"') && text.endsWith('"');
                if (hasQuotes) text = text.slice(1, -1);
                
                let originalText = text;
                
                // If over 55 chars, apply fluff stripping
                if(text.length > 55) {
                    for(const pattern of fluff) {
                        if(text.length <= 53) break;
                        text = text.replace(pattern, '');
                    }
                }
                
                // If STILL over 55 chars, apply some aggressive replacements
                if(text.length > 55) {
                    text = text.replace(/という/g, '');
                    text = text.replace(/ことごとく/g, '');
                    text = text.replace(/跡形もなく/g, '');
                    text = text.replace(/根底から/g, '');
                    text = text.replace(/粉々に/g, '');
                    text = text.replace(/ことになります/g, 'になります');
                    text = text.replace(/のでしょうか/g, 'か');
                }

                if (text !== originalText) {
                    cells[c] = hasQuotes ? `"${text}"` : `"${text}"`;
                    rowModified = true;
                    totalTrimmed++;
                    details.push(`[${f}:L${i+1}] ${originalText.length}字 -> ${text.length}字: ${text}`);
                }
            }
        }
        
        if (rowModified) {
            lines[i] = cells.join(',');
            isModified = true;
        }
    }

    if (isModified) {
         fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    }
  });
});

fs.writeFileSync(path.join(__dirname, 'trim_log.txt'), `Trimmed: ${totalTrimmed}\n\n` + details.join('\n'));
console.log(`Trimmed ${totalTrimmed} cells.`);
