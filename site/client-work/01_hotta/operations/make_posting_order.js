/**
 * make_posting_order.js
 * リール動画90本を投稿順にコピー + posting_list.csv を生成する
 *
 * 出力①: C:\Users\eri76\Downloads\リール動画90本_投稿順\ に 001_20260619.mp4 〜 090_20260916.mp4
 * 出力②: 同フォルダ内の posting_list.csv（連番・日付・テーマ・フック・問題・解説・解決 込み）
 *
 * 使い方:
 *   node planning/make_posting_order.js
 */

const fs   = require('fs');
const path = require('path');

// ── パス設定 ─────────────────────────────────────────────
const SRC_BASE  = 'C:\\Users\\eri76\\Downloads\\リール動画９０本';
const DST_BASE  = 'C:\\Users\\eri76\\Downloads\\リール動画90本_投稿順';
const THEMES_DIR = path.join(__dirname, 'reels/v2/themes');

if (!fs.existsSync(DST_BASE)) fs.mkdirSync(DST_BASE, { recursive: true });

// ── テーマ情報 ───────────────────────────────────────────
const THEME_INFO = {
  1:  { name: '応募前離脱',       csv: 'theme_01_応募前離脱.csv' },
  2:  { name: '面接前設計ミス',   csv: 'theme_02_面接前設計ミス.csv' },
  3:  { name: '給料より信頼',     csv: 'theme_03_給料より信頼.csv' },
  4:  { name: '採用昭和あるある', csv: 'theme_04_採用昭和.csv' },
  5:  { name: '採用資産化',       csv: 'theme_05_採用資産化.csv' },
  6:  { name: '現場が見えない',   csv: 'theme_06_現場が見えない.csv' },
  7:  { name: '家族ブロック',     csv: 'theme_07_家族ブロック.csv' },
  8:  { name: '社長の時間コスト', csv: 'theme_08_社長の時間コスト.csv' },
  9:  { name: '若手の行動心理',   csv: 'theme_09_若手の行動心理.csv' },
  10: { name: 'とりあえず応募',   csv: 'theme_10_とりあえず応募.csv' },
  11: { name: '採用ページ信頼差', csv: 'theme_11_採用ページ信頼差.csv' },
  12: { name: '同業他社との差',   csv: 'theme_12_同業他社との差.csv' },
  13: { name: 'LINEデジタル窓口', csv: 'theme_13_LINEデジタル窓口.csv' },
  14: { name: '面接転換設計',     csv: 'theme_14_面接転換設計.csv' },
  15: { name: '未経験者採用',     csv: 'theme_15_未経験者採用.csv' },
};

// ── テーマCSV 読み込み（列: ファイル名,表紙テキスト,フック,問題,解説,解決,最後1,最後2）─
function readThemeCsv(csvFile) {
  const fp = path.join(THEMES_DIR, csvFile);
  if (!fs.existsSync(fp)) { console.warn(`⚠ 見つかりません: ${csvFile}`); return []; }
  const text  = fs.readFileSync(fp, 'utf8').replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  return lines.slice(1).map(l => l.split(',')); // ヘッダ除く、列は配列
}

// 全テーマデータをロード（themeData[n] = 行配列, 各行 = 列配列）
const themeData = {};
for (let n = 1; n <= 15; n++) {
  themeData[n] = readThemeCsv(THEME_INFO[n].csv);
}

// ── テーマ×リール → 元ファイルのマッピング（reorganize_reels_v2.js と同じ）──
const FILE_MAP = {};
const pad = n => String(n).padStart(2, '0');

for (let r = 1; r <= 6; r++) FILE_MAP[`1_${r}`]  = `A\\reel_A_${pad(r)}.mp4`;

FILE_MAP['2_1']='A\\reel_A_07.mp4'; FILE_MAP['2_2']='A\\reel_A_08.mp4'; FILE_MAP['2_3']='A\\reel_A_09.mp4';
FILE_MAP['2_4']='B\\reel_B_01.mp4'; FILE_MAP['2_5']='B\\reel_B_02.mp4'; FILE_MAP['2_6']='B\\reel_B_03.mp4';

for (let r = 1; r <= 6; r++) FILE_MAP[`3_${r}`]  = `B\\reel_B_${pad(r+3)}.mp4`;
for (let r = 1; r <= 6; r++) FILE_MAP[`4_${r}`]  = `C\\reel_C_${pad(r)}.mp4`;

FILE_MAP['5_1']='C\\reel_C_07.mp4'; FILE_MAP['5_2']='C\\reel_C_08.mp4'; FILE_MAP['5_3']='C\\reel_C_09.mp4';
FILE_MAP['5_4']='D\\reel_D_01.mp4'; FILE_MAP['5_5']='D\\reel_D_02.mp4'; FILE_MAP['5_6']='D\\reel_D_03.mp4';

for (let r = 1; r <= 6; r++) FILE_MAP[`6_${r}`]  = `D\\reel_D_${pad(r+3)}.mp4`;
for (let r = 1; r <= 6; r++) FILE_MAP[`7_${r}`]  = `E\\reel_E_${pad(r)}.mp4`;

FILE_MAP['8_1']='E\\reel_E_07.mp4'; FILE_MAP['8_2']='E\\reel_E_08.mp4'; FILE_MAP['8_3']='E\\reel_E_09.mp4';
FILE_MAP['8_4']='F\\reel_F_01.mp4'; FILE_MAP['8_5']='F\\reel_F_02.mp4'; FILE_MAP['8_6']='F\\reel_F_03.mp4';

for (let r = 1; r <= 6; r++) FILE_MAP[`9_${r}`]  = `F\\reel_F_${pad(r+3)}.mp4`;
for (let r = 1; r <= 6; r++) FILE_MAP[`10_${r}`] = `G\\reel_G_${pad(r)}.mp4`;

FILE_MAP['11_1']='G\\reel_G_07.mp4'; FILE_MAP['11_2']='G\\reel_G_08.mp4'; FILE_MAP['11_3']='G\\reel_G_09.mp4';
FILE_MAP['11_4']='H\\reel_H_01.mp4'; FILE_MAP['11_5']='H\\reel_H_02.mp4'; FILE_MAP['11_6']='H\\reel_H_03.mp4';

for (let r = 1; r <= 6; r++) FILE_MAP[`12_${r}`] = `H\\reel_H_${pad(r+3)}.mp4`;
for (let r = 1; r <= 6; r++) FILE_MAP[`13_${r}`] = `I\\reel_I_${pad(r)}.mp4`;

FILE_MAP['14_1']='I\\reel_I_07.mp4'; FILE_MAP['14_2']='I\\reel_I_08.mp4'; FILE_MAP['14_3']='I\\reel_I_09.mp4';
FILE_MAP['14_4']='J\\reel_J_01.mp4'; FILE_MAP['14_5']='J\\reel_J_02.mp4'; FILE_MAP['14_6']='J\\reel_J_03.mp4';

for (let r = 1; r <= 6; r++) FILE_MAP[`15_${r}`] = `J\\reel_J_${pad(r+3)}.mp4`;

// ── 投稿日計算ヘルパー ────────────────────────────────────
function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  const y  = d.getFullYear();
  const m  = String(d.getMonth() + 1).padStart(2, '0');
  const dy = String(d.getDate()).padStart(2, '0');
  return { compact: `${y}${m}${dy}`, display: `${y}/${m}/${dy}` };
}

// ── メイン処理：コピー & CSV生成 ─────────────────────────
const START_DATE = '2026-06-19';
let postOrder    = 1;
let successCount = 0;
let errorCount   = 0;

// CSV ヘッダ（BOM付きで保存するのでExcelでも文字化けしない）
const csvLines = ['連番,ファイル名,投稿日,テーマ番号,テーマ名,元ファイル,表紙テキスト,フック,問題,解説,解決,最後1,最後2'];

for (let cycle = 1; cycle <= 6; cycle++) {
  for (let theme = 1; theme <= 15; theme++) {
    const key        = `${theme}_${cycle}`;
    const relPath    = FILE_MAP[key];
    const srcFull    = path.join(SRC_BASE, relPath);
    const date       = addDays(START_DATE, postOrder - 1);
    const dstName    = `${String(postOrder).padStart(3,'0')}_${date.compact}.mp4`;
    const dstFull    = path.join(DST_BASE, dstName);
    const themeName  = THEME_INFO[theme].name;
    const themeNum   = `t${String(theme).padStart(2,'0')}`;
    const origFile   = relPath.split('\\').pop();

    // テーマデータ（0-indexed: cycle-1番目の行）
    const row      = themeData[theme][cycle - 1] || [];
    const hyoshi   = row[1] || '';
    const hook     = row[2] || '';
    const mondai   = row[3] || '';
    const kaisetsu = row[4] || '';
    const kaiketsu = row[5] || '';
    const last1    = row[6] || '';
    const last2    = row[7] || '';

    // 動画コピー
    if (fs.existsSync(srcFull)) {
      fs.copyFileSync(srcFull, dstFull);
      console.log(`✅ ${dstName}  [${themeName}]  ${hook}`);
      successCount++;
    } else {
      console.error(`❌ 見つからない: ${srcFull}`);
      errorCount++;
    }

    // CSV行（カンマを含む値をダブルクォートで囲む）
    const q = s => `"${String(s).replace(/"/g, '""')}"`;
    csvLines.push([
      postOrder, q(dstName), q(date.display), q(themeNum), q(themeName),
      q(origFile), q(hyoshi), q(hook), q(mondai), q(kaisetsu), q(kaiketsu), q(last1), q(last2)
    ].join(','));

    postOrder++;
  }
}

// BOM付きUTF-8で保存（Excelで文字化けしない）
const csvPath = path.join(DST_BASE, 'posting_list.csv');
fs.writeFileSync(csvPath, '\uFEFF' + csvLines.join('\r\n'), 'utf8');

console.log('\n============================================');
console.log(`✨ 完了！  成功: ${successCount} 本  エラー: ${errorCount} 本`);
console.log(`📁 動画: ${DST_BASE}`);
console.log(`📋 リスト: ${csvPath}`);
console.log('============================================');
