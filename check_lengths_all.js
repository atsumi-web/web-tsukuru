const fs = require('fs');
const path = require('path');

const directories = ['01AB', '02CD', '03EF', '04GH', '05IJ', '06KL', '07MN', '08OP', '09QR', '10ST', '11UV', '12WX'];
const basePath = 'c:/Users/eri76/OneDrive/Desktop/VSC/web-tsukuru/planning/reels';

function analyzeLength() {
    console.log('--- Checking Reel Script Lengths (Approximate) ---');
    directories.forEach(dir => {
        const dirPath = path.join(basePath, dir);
        if (!fs.existsSync(dirPath)) return;
        
        const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.csv'));
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            let maxLength = 0;
            let over45 = 0;
            let over50 = 0;
            
            const lines = content.split('\n');
            lines.forEach((line, index) => {
                if (index === 0 || !line.trim()) return;
                // Simple regex to extract quoted values (assuming no tricky embedded quotes)
                const matches = [...line.matchAll(/"([^"]*)"/g)].map(m => m[1]);
                if (matches.length >= 6) {
                    const textsToCheck = [matches[2], matches[3], matches[4], matches[5]]; // フック, 問題, 解説, 解決
                    textsToCheck.forEach(text => {
                        if (text) {
                            if (text.length > maxLength) maxLength = text.length;
                            if (text.length > 45) over45++;
                            if (text.length > 50) over50++;
                        }
                    });
                }
            });
            console.log(`${file}: Max length = ${maxLength} chars, Over 45 = ${over45}, Over 50 = ${over50}`);
        });
    });
}

analyzeLength();
