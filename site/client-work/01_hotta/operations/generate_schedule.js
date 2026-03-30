/**
 * generate_schedule.js
 * 360本のリールを内容が近いものが連続しないようシャッフルして
 * 投稿スケジュールCSVを生成します。
 *
 * 使い方: node planning/generate_schedule.js
 * 出力:   planning/posting_schedule.csv
 */

const fs = require('fs');
const path = require('path');

// ── 設定 ──────────────────────────────────────────
const START_DATE = new Date('2025-04-01'); // 投稿開始日
const POSTS_PER_DAY = 1;                  // 1日の投稿数（1か2）
const REELS_BASE = path.join(__dirname, 'reels');
const OUTPUT   = path.join(__dirname, 'posting_schedule.csv');

// テーマ一覧（フォルダ名の順 + ファイル名）
const THEME_FILES = [
  { folder: '01AB', file: 'reel_A.csv', theme: 'A' },
  { folder: '01AB', file: 'reel_B.csv', theme: 'B' },
  { folder: '02CD', file: 'reel_C.csv', theme: 'C' },
  { folder: '02CD', file: 'reel_D.csv', theme: 'D' },
  { folder: '03EF', file: 'reel_E.csv', theme: 'E' },
  { folder: '03EF', file: 'reel_F.csv', theme: 'F' },
  { folder: '04GH', file: 'reel_G.csv', theme: 'G' },
  { folder: '04GH', file: 'reel_H.csv', theme: 'H' },
  { folder: '05IJ', file: 'reel_I.csv', theme: 'I' },
  { folder: '05IJ', file: 'reel_J.csv', theme: 'J' },
  { folder: '06KL', file: 'reel_K.csv', theme: 'K' },
  { folder: '06KL', file: 'reel_L.csv', theme: 'L' },
  { folder: '07MN', file: 'reel_M.csv', theme: 'M' },
  { folder: '07MN', file: 'reel_N.csv', theme: 'N' },
  { folder: '08OP', file: 'reel_O.csv', theme: 'O' },
  { folder: '08OP', file: 'reel_P.csv', theme: 'P' },
  { folder: '09QR', file: 'reel_Q.csv', theme: 'Q' },
  { folder: '09QR', file: 'reel_R.csv', theme: 'R' },
  { folder: '10ST', file: 'reel_S.csv', theme: 'S' },
  { folder: '10ST', file: 'reel_T.csv', theme: 'T' },
  { folder: '11UV', file: 'reel_U.csv', theme: 'U' },
  { folder: '11UV', file: 'reel_V.csv', theme: 'V' },
  { folder: '12WX', file: 'reel_W.csv', theme: 'W' },
  { folder: '12WX', file: 'reel_X.csv', theme: 'X' },
];

// ── CSV 簡易パーサー ──────────────────────────────
function parseCSV(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n').filter(l => l.trim());
  const headers = splitCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = splitCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => obj[h] = (values[i] || '').replace(/^"|"$/g, '').trim());
    return obj;
  });
}

function splitCSVLine(line) {
  const result = [];
  let current = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQuote = !inQuote; }
    else if (ch === ',' && !inQuote) { result.push(current); current = ''; }
    else { current += ch; }
  }
  result.push(current);
  return result;
}

// ── 全リール読み込み ──────────────────────────────
const pools = {}; // { theme: [ {fileName, hook, ...} ] }

for (const { folder, file, theme } of THEME_FILES) {
  const filePath = path.join(REELS_BASE, folder, file);
  if (!fs.existsSync(filePath)) { console.warn(`⚠ 見つかりません: ${filePath}`); continue; }
  const rows = parseCSV(filePath).filter(r => r['ファイル名']);
  pools[theme] = rows.map(r => ({
    theme,
    fileName: `${theme}_${r['ファイル名']}`,
    coverText: r['表紙テキスト'] || '',
    hook: r['フック'] || '',
  }));
}

const themeKeys = Object.keys(pools);
console.log(`✅ テーマ数: ${themeKeys.length}`);
console.log(`✅ 総リール数: ${themeKeys.reduce((s, k) => s + pools[k].length, 0)}`);

// ── 各テーマ内をランダムシャッフル ────────────────
// 同じreel番号スロット（例:reel_03）が全テーマで同時に出ないよう、
// まず各テーマの15本をランダムに並び替えてからラウンドロビンする
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
themeKeys.forEach(k => shuffle(pools[k]));

// ── ラウンドロビン方式で順番作成 ──────────────────
// 各テーマから1本ずつ取り出す → 同じテーマが24本以上連続しない
const ordered = [];
let finished = false;
const indices = {};
themeKeys.forEach(k => indices[k] = 0);

while (!finished) {
  finished = true;
  for (const k of themeKeys) {
    if (indices[k] < pools[k].length) {
      ordered.push(pools[k][indices[k]]);
      indices[k]++;
      finished = false;
    }
  }
}

console.log(`✅ シャッフル後の総数: ${ordered.length}`);

// ── 日付付きで CSV 出力 ───────────────────────────
const formatDate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}/${m}/${day}`;
};

const lines = ['投稿日,投稿時刻,テーマ,ファイル名,表紙テキスト,フック（hook）'];
let currentDate = new Date(START_DATE);
let postsToday = 0;

for (const reel of ordered) {
  if (postsToday >= POSTS_PER_DAY) {
    currentDate.setDate(currentDate.getDate() + 1);
    postsToday = 0;
  }

  // 投稿時刻（複数/日の場合に時間をずらす）
  const times = POSTS_PER_DAY === 1 ? ['19:00'] : ['12:00', '19:00'];
  const time = times[postsToday] || '19:00';

  const hook = reel.hook.replace(/,/g, '、'); // CSV内カンマをエスケープ
  lines.push(`${formatDate(currentDate)},${time},${reel.theme},${reel.fileName},"${reel.coverText}","${hook}"`);
  postsToday++;
}

fs.writeFileSync(OUTPUT, '\uFEFF' + lines.join('\n'), 'utf8'); // BOM付きでExcel対応
console.log(`\n📅 投稿スケジュール生成完了！`);
console.log(`📄 出力先: ${OUTPUT}`);
console.log(`📊 総投稿数: ${ordered.length} 本`);
console.log(`📆 投稿期間: ${formatDate(START_DATE)} 〜 ${formatDate(currentDate)}`);
