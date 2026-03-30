const fs = require('fs');
const path = require('path');
const readline = require('readline');

// カレントディレクトリ配下の全ての `reel_*.csv` を探し出す
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

// 対象ディレクトリが存在するか確認
if (!fs.existsSync(START_DIR)) {
    console.error(`Directory not found: ${START_DIR}`);
    process.exit(1);
}

// 探索実行
findFiles(START_DIR);

if (targetFiles.length === 0) {
    console.log("No reel CSV files found.");
    process.exit(0);
}

console.log(`Found ${targetFiles.length} files to check.`);
console.log("--------------------------------------------------");

async function checkFile(filePath) {
    let hasError = false;
    let lineNumber = 0;
    
    console.log(`Checking: ${filePath}`);

    const fileStream = fs.createReadStream(filePath, 'utf-8');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        lineNumber++;
        if (lineNumber === 1) continue; // ヘッダーをスキップ
        if (!line.trim()) continue; // 空行をスキップ

        // カンマ区切りの簡易パース (正規表現による高度なCSVパースは省略)
        // ダブルクォーテーションで囲まれたカンマは無視するための正規表現
        const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        
        // カラムが少ない場合はエラーか空行
        if (columns.length < 8) continue; 

        // 3列目(フック)〜6列目(解決)をチェックする (インデックス2〜5)
        for (let i = 2; i <= 5; i++) {
            let text = columns[i];
            // 先頭と末尾のダブルクォーテーションを削除
            text = text.replace(/^"|"$/g, '').trim();
            const length = text.length;

            if (length > 45) {
                console.log(`  [LINE ${lineNumber}, COL ${i+1}] Length: ${length} (OVER 45!) -> ${text}`);
                hasError = true;
            }
        }
    }
    
    if (!hasError) {
        console.log(`  -> OK`);
    }
    return hasError;
}

async function main() {
    let totalErrors = 0;
    for (const file of targetFiles) {
        const hasError = await checkFile(file);
        if (hasError) totalErrors++;
    }

    console.log("--------------------------------------------------");
    if (totalErrors === 0) {
        console.log("✅ All files passed the length check (Max 45 chars limit).");
        process.exit(0);
    } else {
        console.error(`❌ Found length violations in ${totalErrors} file(s).`);
        process.exit(1);
    }
}

main();
