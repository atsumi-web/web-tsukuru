// fix_row_prefix.js
// reel_G.csv と reel_H.csv の行番号プレフィックス（例: 6,"reel_06" → "reel_06"）を除去する
// UTF-8 で読み書きし文字化けを防ぐ

const fs = require('fs');
const path = require('path');

const targets = [
  path.join(__dirname, 'reels', '04GH', 'reel_G.csv'),
  path.join(__dirname, 'reels', '04GH', 'reel_H.csv'),
];

for (const filePath of targets) {
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] File not found: ${filePath}`);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let fixedCount = 0;

  const fixedLines = lines.map((line, idx) => {
    // 行番号プレフィックスのパターン: 数字,\"reel_XX\" → \"reel_XX\"
    // 例: 6,"reel_06"  →  "reel_06"
    const match = line.match(/^\d+,("reel_\d+",.*)/);
    if (match) {
      fixedCount++;
      return match[1];
    }
    return line;
  });

  const fixed = fixedLines.join('\n');
  fs.writeFileSync(filePath, fixed, 'utf8');
  console.log(`[OK] ${path.basename(filePath)}: ${fixedCount} row(s) fixed.`);
}

console.log('\nDone.');
