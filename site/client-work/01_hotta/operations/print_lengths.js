const fs = require('fs');
const path = require('path');
const readline = require('readline');

const targetFiles = [];
function findFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findFiles(fullPath);
        } else if (file.match(/^reel_[A-X]\.csv$/i) || file.match(/^reel_\d{2}\.csv$/i)) {
            targetFiles.push(fullPath);
        }
    }
}
const START_DIR = path.join(__dirname, 'reels');
findFiles(START_DIR);
let out = '';
async function main() {
    for (const file of targetFiles) {
        let lineNumber = 0;
        const fileStream = fs.createReadStream(file, 'utf-8');
        const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
        for await (const line of rl) {
            lineNumber++;
            if (lineNumber === 1 || !line.trim()) continue;
            const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (columns.length < 8) continue; 
            for (let i = 2; i <= 5; i++) { // cols: hook(2), problem(3), explain(4), solution(5)
                let text = columns[i].replace(/^"|"$/g, '').trim();
                // We check against length > 45
                if (text.length > 45) {
                    out += `OVER: ${path.basename(file)} Line ${lineNumber} Col ${i+1} Len: ${text.length}\n`;
                }
            }
        }
    }
    if (out === '') out = 'ALL GOOD\n';
    console.log(out);
    fs.writeFileSync('lengths.txt', out, 'utf8');
}
main();
