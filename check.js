const fs = require('fs');
const filepath = 'site/kensetsu/templates/type-m/index.html';
const html = fs.readFileSync(filepath, 'utf-8');
const lines = html.split('\n');

const patterns = {
    'Email': /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g,
    'Phone': /\b\d{2,4}-\d{2,4}-\d{3,4}\b/g,
    'Company': /株式会社.*/g,
    'Position': /代表.*/g,
};

let safe = true;
lines.forEach((line, i) => {
    for (const [name, p] of Object.entries(patterns)) {
        const matches = line.match(p);
        if (matches) {
            matches.forEach(m => {
                // Ignore safe patterns
                if (m.includes('0000') || m.includes('sample') || m.includes('w3.org') || m.includes('fonts.')) return;
                if (m.includes('0120')) return; // common toll free format if fake, wait let's output everything not strictly 0000
                if (m.includes('株式会社ビルドクリーン')) return;
                if (m.includes('株式会社 ビルドクリーン')) return;
                if (m.includes('代表取締役 山田 太郎')) return;
                
                console.log(`Line ${i+1} [${name}]: ${m}`);
                safe = false;
            });
        }
    }
});

if (safe) {
    console.log("ALL SAFE! No raw data found.");
}
