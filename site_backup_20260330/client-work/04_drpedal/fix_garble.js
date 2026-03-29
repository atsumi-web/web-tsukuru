const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

const htmlDir = 'C:\\Users\\eri76\\OneDrive\\Desktop\\VSC\\web-tsukuru\\site\\client-work\\04_drpedal\\hp';

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(fullPath));
        } else if (fullPath.endsWith('.html')) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = walkDir(htmlDir);
let fixCount = 0;

for (const file of htmlFiles) {
    const text = fs.readFileSync(file, 'utf8');
    // Check for characteristic mojibake of UTF-8 misread as CP932
    if (text.includes('繝') || text.includes('繧') || text.includes('譁')) {
        console.log(`Fixing mojibake in: ${path.basename(file)}`);
        try {
            // Convert the malformed Javascript string back to the raw CP932 bytes
            // the system mistakenly thought it was reading
            const rawBytes = iconv.encode(text, 'win1252'); // No wait, Node needs iconv-lite to encode cp932. 
            // If iconv-lite isn't installed, let's use a standard Buffer trick if we can.
        } catch (e) {
            console.error('Error', e);
        }
    }
}
