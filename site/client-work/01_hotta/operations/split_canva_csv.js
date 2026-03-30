/**
 * split_canva_csv.js
 * posting_schedule.csv の「表紙テキスト」列を60個ずつ横並びに並べた
 * Canva一括作成用CSVを6ファイル生成します。
 *
 * フォーマット:
 *   1行目: 表紙1, 表紙2, ..., 表紙60
 *   2行目: 広告費の罠, 掲載費の消耗, ...(60件分)
 *
 * 使い方: node planning/split_canva_csv.js
 * 出力:   planning/canva/ フォルダ
 */

const fs   = require('fs');
const path = require('path');

const SCHEDULE_CSV = path.join(__dirname, 'posting_schedule.csv');
const OUTPUT_DIR   = path.join(__dirname, 'canva');
const BATCH_SIZE   = 60;

// BOM除去して読み込み
const raw = fs.readFileSync(SCHEDULE_CSV, 'utf8').replace(/^\uFEFF/, '');
const allLines = raw.split(/\r?\n/).filter(l => l.trim());

// ヘッダー列の位置を確認
const headers = allLines[0].split(',');
const coverIdx = headers.indexOf('表紙テキスト');
const fileIdx  = headers.indexOf('ファイル名');

if (coverIdx === -1) { console.error('「表紙テキスト」列が見つかりません'); process.exit(1); }

// データ行をパース
const dataLines = allLines.slice(1);

// 出力フォルダ作成
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

// 60件ずつ横並びCSVに変換
let batchNum = 1;
for (let i = 0; i < dataLines.length; i += BATCH_SIZE) {
  const batch = dataLines.slice(i, i + BATCH_SIZE);
  const startNum = i + 1;
  const endNum   = Math.min(i + BATCH_SIZE, dataLines.length);

  // ヘッダー行: 表紙1, 表紙2, ..., 表紙60
  const headerRow = batch.map((_, j) => `表紙${j + 1}`).join(',');

  // データ行: 各行から「表紙テキスト」列の値を取り出して横に並べる
  const dataRow = batch.map(line => {
    const cols = line.split(',');
    const val = (cols[coverIdx] || '').replace(/^"|"$/g, '').trim();
    return `"${val}"`;
  }).join(',');

  const content = '\uFEFF' + headerRow + '\n' + dataRow + '\n';
  const fileName = `canva_${String(batchNum).padStart(2, '0')}.csv`;
  const filePath = path.join(OUTPUT_DIR, fileName);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${fileName}  (${startNum}〜${endNum}本目の表紙テキスト)`);
  batchNum++;
}

console.log(`\n📁 出力先: ${OUTPUT_DIR}`);
console.log(`📊 合計 ${batchNum - 1} ファイル（各 ${BATCH_SIZE} 列）`);
