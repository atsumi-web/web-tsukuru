/**
 * copy_reels_in_order.js
 * posting_schedule.csv の順番に従って動画ファイルを連番でコピーします。
 *
 * 入力: C:\Users\eri76\Downloads\リール動画Ａ～Ｘ\{テーマ}\reel_XX.mp4
 * 出力: C:\Users\eri76\Downloads\リール動画_投稿順\001_A_reel_15.mp4 ...
 *
 * 使い方: node planning/copy_reels_in_order.js
 */

const fs   = require('fs');
const path = require('path');

// ── 設定 ──────────────────────────────────────────
const SCHEDULE_CSV = path.join(__dirname, 'posting_schedule.csv');
const SRC_BASE     = 'C:\\Users\\eri76\\Downloads\\リール動画Ａ～Ｘ';
const OUTPUT_DIR   = 'C:\\Users\\eri76\\Downloads\\リール動画_投稿順';

// ── CSV 読み込み ───────────────────────────────────
const lines = fs.readFileSync(SCHEDULE_CSV, 'utf8')
  .replace(/^\uFEFF/, '')   // BOM除去
  .split('\n')
  .map(l => l.trim())
  .filter(l => l);

const headers = lines[0].split(',');
const fileNameIndex = headers.indexOf('ファイル名');

if (fileNameIndex === -1) {
  console.error('「ファイル名」列が見つかりません');
  process.exit(1);
}

const entries = lines.slice(1).map(line => {
  // カンマ区切り（クォート内カンマ対応不要なのでシンプルに）
  const cols = line.split(',');
  return cols[fileNameIndex]; // 例: "A_reel_15"
});

// ── 出力フォルダ作成 ───────────────────────────────
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── コピー実行 ─────────────────────────────────────
let ok = 0, ng = 0;

entries.forEach((fileName, i) => {
  if (!fileName) return;

  // "A_reel_15" → theme="A", num="reel_15"
  const [theme, ...rest] = fileName.split('_');
  const reelNum = rest.join('_'); // "reel_15"

  const srcFile = path.join(SRC_BASE, theme, `${reelNum}.mp4`);
  const padded  = String(i + 1).padStart(3, '0');
  const dstFile = path.join(OUTPUT_DIR, `${padded}_${fileName}.mp4`);

  if (!fs.existsSync(srcFile)) {
    console.warn(`⚠ 見つかりません: ${srcFile}`);
    ng++;
    return;
  }

  fs.copyFileSync(srcFile, dstFile);
  ok++;
  if (ok % 30 === 0) console.log(`  ... ${ok}本コピー済み`);
});

console.log(`\n✅ 完了！  成功: ${ok}本  失敗: ${ng}本`);
console.log(`📁 出力先: ${OUTPUT_DIR}`);
