const fs = require('fs');
const path = require('path');
const readline = require('readline');

const resolutionsPath = path.join(__dirname, 'resolutions.json');
if (!fs.existsSync(resolutionsPath)) {
    console.error("resolutions.json not found!");
    process.exit(1);
}

const resolutions = JSON.parse(fs.readFileSync(resolutionsPath, 'utf8'));
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

async function main() {
    let changedAny = false;
    for (const file of targetFiles) {
        let lineNumber = 0;
        let fileChanged = false;
        
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        
        for (let j=0; j<lines.length; j++) {
            let line = lines[j];
            if (!line.trim() || j===0) continue; // header or empty
            
            const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (columns.length < 8) continue; 
            
            let lineChanged = false;
            for (let i = 2; i <= 5; i++) {
                let text = columns[i].replace(/^"|"$/g, '').trim();
                if (resolutions[text]) {
                    columns[i] = `"${resolutions[text]}"`;
                    lineChanged = true;
                    console.log(`Fixed in ${path.basename(file)}:\n- ${text}\n+ ${resolutions[text]}\n`);
                }
            }
            if (lineChanged) {
                lines[j] = columns.join(',');
                fileChanged = true;
            }
        }
        
        if (fileChanged) {
            fs.writeFileSync(file, lines.join('\n'), 'utf8');
            changedAny = true;
        }
    }
    console.log("Resolution application complete.");
}
main();
