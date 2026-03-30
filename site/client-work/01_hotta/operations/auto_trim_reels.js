const fs = require('fs');
const path = require('path');

const START_DIR = path.join(__dirname, 'reels');

const FLUFF_WORDS = [
    // 最優先で削る過剰な装飾語
    "圧倒的な", "圧倒的に", "強烈な", "強烈に", "猛烈な", "猛烈に", "異常なほど", "異常な", "極限まで", "極限の", "極めて", "非常に", "凄まじい", "凄惨な", "残酷すぎる", "惨惨な", "残酷な",
    "絶対にすら", "絶対に", "完全なる", "完全に全て", "完全に", "確実な", "確実に", "一切", "全く", "少しも", "容赦なく", "容赦無く", "無慈悲な", "無慈悲に", "無残に",
    "100%", "120%", "全てを", "全て", "すべて", "全部", "全員が", "一人残らず", "残らず",
    "無駄な", "無駄に", "余計な", "無意味な", "完全無意味な", "不毛な",
    "今すぐ", "今日で", "直ちに", "即座に", "あっさりと", "一瞬で", "即", "即日", "速やかに", "真っ先に", "最優先で", "いち早く", "二度と",
    "まずは", "結局", "実は", "あくまで", "なんとなく", "ただただ", "ただ", "ただの", "無駄な",
    "という強烈な", "という凄まじい", "という事実", "という現実",
    "これでもかと", "これ以上", "無制限に",
    "永遠に", "永久に", "一生涯", "一生", "半永久的に",
    "激しい", "激しく", "絶対的な",
    // 括弧
    "「", "」",
    // 少しの短縮
    "だからです", "ためです"
];

function trimCell(text) {
    let current = text;
    // セル内の最初と最後のダブルクォーテーションを一時的に外す
    let hasQuotes = false;
    if (current.startsWith('"') && current.endsWith('"')) {
        hasQuotes = true;
        current = current.substring(1, current.length - 1);
    }

    for (const word of FLUFF_WORDS) {
        if (current.length <= 45) break; 
        const regex = new RegExp(word, "g");
        current = current.replace(regex, "");
    }
    
    // それでもオーバーする場合の細かい置換
    if (current.length > 45) {
        current = current.replace(/していませんか/g, "してませんか");
        current = current.replace(/落ち陥っていませんか/g, "陥ってませんか");
        current = current.replace(/陥っていませんか/g, "陥ってませんか");
        current = current.replace(/しまっていませんか/g, "してませんか");
        current = current.replace(/からです$/, "ためです");
        current = current.replace(/であるからです$/, "なためです");
    }

    // カンマが連続する等の文法破綻の簡易ケア
    current = current.replace(/、、/g, "、");
    current = current.replace(/^、/, "");

    if (hasQuotes) {
        current = `"${current}"`;
    }
    return current;
}

function processFiles(dir) {
    const files = fs.readdirSync(dir);
    let fixedCount = 0;
    let remainingViolations = 0;

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processFiles(fullPath);
        } else if (file.match(/^reel_[A-X]\.csv$/i) || file.match(/^reel_\d{2}\.csv$/i)) {
            const lines = fs.readFileSync(fullPath, 'utf8').split('\n');
            let modified = false;

            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;

                const columns = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                if (columns.length < 8) continue; // 不正な行

                for (let j = 2; j <= 5; j++) {
                    let cellText = columns[j];
                    let textLen = cellText.replace(/^"|"$/g, '').trim().length;

                    if (textLen > 45) {
                        let shortened = trimCell(cellText);
                        let newLen = shortened.replace(/^"|"$/g, '').trim().length;
                        
                        columns[j] = shortened;
                        modified = true;
                        fixedCount++;

                        if (newLen > 45) {
                            remainingViolations++;
                            console.log(`STILL OVER 45 [${newLen}]: ${shortened}`);
                        }
                    }
                }
                lines[i] = columns.join(',');
            }

            if (modified) {
                // BOM付きで書き直す
                const content = lines.join('\n');
                const BOM = '\uFEFF';
                fs.writeFileSync(fullPath, BOM + content, 'utf8');
            }
        }
    }
    return { fixedCount, remainingViolations };
}

console.log("Starting auto-trim...");
const stats = processFiles(START_DIR);
console.log(`Trimmed cells: ${stats.fixedCount}`);
console.log(`Remaining violations: ${stats.remainingViolations}`);
