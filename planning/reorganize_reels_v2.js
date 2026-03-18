/**
 * reorganize_reels_v2.js
 * 15テーマCSV（各6本）→ テンプレートA〜J（各9本）に再配置して
 * Canva一括作成用のCSVを生成します。
 *
 * 使い方: node planning/reorganize_reels_v2.js
 * 出力先: planning/reels/v2/canva/
 */
const fs   = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'reels/v2/themes');
const OUT  = path.join(__dirname, 'reels/v2/canva');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// テーマCSVを読み込んでデータ行の配列を返す（ヘッダ除く）
function readTheme(filename) {
  const fp = path.join(BASE, filename);
  if (!fs.existsSync(fp)) { console.warn(`⚠ 見つかりません: ${filename}`); return []; }
  const lines = fs.readFileSync(fp, 'utf8').replace(/^\uFEFF/, '')
    .split(/\r\n|\n/).filter(l => l.trim());
  return lines.slice(1); // ヘッダを除く
}

const HEADER = 'ファイル名,表紙テキスト,フック,問題,解説,解決,最後1,最後2';

// 全テーマを読み込み
const t = {};
for (let i = 1; i <= 15; i++) {
  const num = String(i).padStart(2, '0');
  const files = {
    1:'theme_01_応募前離脱.csv', 2:'theme_02_面接前設計ミス.csv', 3:'theme_03_給料より信頼.csv',
    4:'theme_04_採用昭和.csv', 5:'theme_05_採用資産化.csv', 6:'theme_06_現場が見えない.csv',
    7:'theme_07_家族ブロック.csv', 8:'theme_08_社長の時間コスト.csv', 9:'theme_09_若手の行動心理.csv',
    10:'theme_10_とりあえず応募.csv', 11:'theme_11_採用ページ信頼差.csv', 12:'theme_12_同業他社との差.csv',
    13:'theme_13_LINEデジタル窓口.csv', 14:'theme_14_面接転換設計.csv', 15:'theme_15_未経験者採用.csv'
  };
  t[i] = readTheme(files[i]);
}

// A〜J の9本ずつの構成定義
//   [テーマ番号, 開始インデックス, 本数]
const TEMPLATES = {
  A: [[1,0,6],[2,0,3]],
  B: [[2,3,3],[3,0,6]],
  C: [[4,0,6],[5,0,3]],
  D: [[5,3,3],[6,0,6]],
  E: [[7,0,6],[8,0,3]],
  F: [[8,3,3],[9,0,6]],
  G: [[10,0,6],[11,0,3]],
  H: [[11,3,3],[12,0,6]],
  I: [[13,0,6],[14,0,3]],
  J: [[14,3,3],[15,0,6]],
};

for (const [tmpl, slices] of Object.entries(TEMPLATES)) {
  const rows = [];
  let rowNum = 1;
  for (const [themeIdx, start, count] of slices) {
    const data = t[themeIdx];
    for (let i = start; i < start + count; i++) {
      if (!data[i]) { console.warn(`⚠ theme${themeIdx}[${i}] が存在しません`); continue; }
      // ファイル名列を「reel_A_01」形式に書き換え
      const cols = data[i].split(',');
      cols[0] = `reel_${tmpl}_${String(rowNum).padStart(2,'0')}`;
      rows.push(cols.join(','));
      rowNum++;
    }
  }
  const outPath = path.join(OUT, `reel_${tmpl}.csv`);
  fs.writeFileSync(outPath, HEADER + '\n' + rows.join('\n'), 'utf8');
  console.log(`✅ reel_${tmpl}.csv: ${rows.length}本`);
}

console.log('\n📁 出力先:', OUT);
console.log('✨ 合計 10ファイル（各9本）= 90本 完成！');
