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
findFiles(path.join(__dirname, 'reels'));

const results = [];

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
            for (let i = 2; i <= 5; i++) {
                let text = columns[i].replace(/^"|"$/g, '').trim();
                // My naive JS length. Let's do Array.from(text).length to handle emojis/surrogates, though we shouldn't have them
                let len = Array.from(text).length;
                if (len > 45) {
                    results.push({
                        file: path.basename(file),
                        line: lineNumber,
                        col: i+1,
                        len: len,
                        text: text
                    });
                }
            }
        }
    }
    
    // Sort by file, then line, then col
    results.sort((a, b) => {
        if (a.file !== b.file) return a.file.localeCompare(b.file);
        if (a.line !== b.line) return a.line - b.line;
        return a.col - b.col;
    });
    fs.writeFileSync('violations.json', JSON.stringify(results, null, 2), 'utf8');
    console.log(`Wrote ${results.length} violations to violations.json`);
}
main();
