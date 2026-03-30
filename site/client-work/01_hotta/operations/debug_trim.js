const fs = require('fs');
const path = require('path');

const START_DIR = path.join(__dirname, 'reels');

function processFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processFiles(fullPath);
        } else if (file.match(/^reel_[A-X]\.csv$/i) || file.match(/^reel_\d{2}\.csv$/i)) {
            console.log("Checking file:", fullPath);
            const lines = fs.readFileSync(fullPath, 'utf8').replace(/\r/g, '').split('\n');
            let violations = 0;
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                const columns = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                if (columns.length < 8) continue; 
                for (let j = 2; j <= 5; j++) {
                    let cellText = columns[j];
                    let textLen = cellText.replace(/^"|"$/g, '').trim().length;
                    if (textLen > 45) {
                        violations++;
                    }
                }
            }
            console.log("  Violations found:", violations);
        }
    }
}

console.log("Starting quick check...");
processFiles(START_DIR);
