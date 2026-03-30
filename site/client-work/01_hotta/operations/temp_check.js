const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

const dir = path.join(__dirname, 'reels');
let out = '';

function walk(d) {
    let files = fs.readdirSync(d);
    for (let f of files) {
        let p = path.join(d, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (p.endsWith('.csv')) {
            let content = fs.readFileSync(p, 'utf8');
            if (content.charCodeAt(0) === 0xFEFF) {
                content = content.slice(1);
            }
            try {
                const records = csv.parse(content, { columns: false, skip_empty_lines: true });
                for (let i = 1; i < records.length; i++) {
                    const row = records[i];
                    for (let j = 0; j < row.length; j++) {
                        if (row[j].length > 45) {
                            out += `OVER: ${path.basename(p)} Row ${i+1} Col ${j+1} (Len ${row[j].length}): ${row[j]}\n`;
                        }
                    }
                }
            } catch (e) {
                out += `ERROR parsing ${path.basename(p)}: ${e.message}\n`;
            }
        }
    }
}
walk(dir);
if (out.length === 0) out = 'ALL GOOD\n';
fs.writeFileSync('log.txt', out, 'utf8');
console.log('Done');
