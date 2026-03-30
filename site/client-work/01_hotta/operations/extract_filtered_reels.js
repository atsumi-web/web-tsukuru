/**
 * extract_filtered_reels.js
 * posting_schedule_filtered.csv に含まれる91本だけを
 * リール動画_投稿順 フォルダから抽出して連番コピーします。
 *
 * 使い方: node planning/extract_filtered_reels.js
 * 出力:   C:\Users\eri76\Downloads\リール動画_絞込
 */

const fs   = require('fs');
const path = require('path');

const FILTERED_CSV = path.join(__dirname, 'posting_schedule_filtered.csv');
const SRC_DIR      = 'C:\\Users\\eri76\\Downloads\\リール動画_投稿順';
const OUTPUT_DIR   = 'C:\\Users\\eri76\\Downloads\\リール動画_絞込';

// 絞り込みCSV読み込み
const raw = fs.readFileSync(FILTERED_CSV, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/).filter(l => l.trim());
const headers = lines[0].split(',');
const fileIdx = headers.indexOf('ファイル名');

const fileNames = lines.slice(1).map(l => {
  const cols = l.split(',');
  return (cols[fileIdx] || '').replace(/^"|"$/g, '').trim();
}).filter(Boolean);

// 出力フォルダ作成
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 既存ファイルを index 化（例: "A_reel_01" → "001_A_reel_01.mp4"）
const srcFiles = fs.readdirSync(SRC_DIR);
const srcMap = {};
srcFiles.forEach(f => {
  // ファイル名から先頭の連番と拡張子を除いたキーを作る
  const match = f.match(/^\d+_(.+)\.mp4$/i);
  if (match) srcMap[match[1]] = f;
});

let ok = 0, ng = 0;
fileNames.forEach((name, i) => {
  const srcFile = srcMap[name];
  if (!srcFile) {
    console.warn(`⚠ 見つかりません: ${name}`);
    ng++;
    return;
  }
  const padded  = String(i + 1).padStart(3, '0');
  const dstFile = path.join(OUTPUT_DIR, `${padded}_${name}.mp4`);
  fs.copyFileSync(path.join(SRC_DIR, srcFile), dstFile);
  ok++;
});

console.log(`\n✅ 完了！  成功: ${ok}本  失敗: ${ng}本`);
console.log(`📁 出力先: ${OUTPUT_DIR}`);
