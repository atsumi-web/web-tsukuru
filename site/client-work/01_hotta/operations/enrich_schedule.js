/**
 * enrich_schedule.js
 * posting_schedule_filtered.csv のファイル名を使って元の reel_X.csv から
 * フック・問題・解説・解決・最後1・最後2 を引き当て、完全版CSVを出力します。
 *
 * 使い方: node planning/enrich_schedule.js
 * 出力:   planning/posting_schedule_full.csv
 */

const fs   = require('fs');
const path = require('path');

const FILTERED_CSV = path.join(__dirname, 'posting_schedule_filtered.csv');
const REELS_BASE   = path.join(__dirname, 'reels');
const OUTPUT       = path.join(__dirname, 'posting_schedule_full.csv');

const THEME_FILES = [
  { folder: '01AB', files: ['reel_A.csv','reel_B.csv'], themes: ['A','B'] },
  { folder: '02CD', files: ['reel_C.csv','reel_D.csv'], themes: ['C','D'] },
  { folder: '03EF', files: ['reel_E.csv','reel_F.csv'], themes: ['E','F'] },
  { folder: '04GH', files: ['reel_G.csv','reel_H.csv'], themes: ['G','H'] },
  { folder: '05IJ', files: ['reel_I.csv','reel_J.csv'], themes: ['I','J'] },
  { folder: '06KL', files: ['reel_K.csv','reel_L.csv'], themes: ['K','L'] },
  { folder: '07MN', files: ['reel_M.csv','reel_N.csv'], themes: ['M','N'] },
  { folder: '08OP', files: ['reel_O.csv','reel_P.csv'], themes: ['O','P'] },
  { folder: '09QR', files: ['reel_Q.csv','reel_R.csv'], themes: ['Q','R'] },
  { folder: '10ST', files: ['reel_S.csv','reel_T.csv'], themes: ['S','T'] },
  { folder: '11UV', files: ['reel_U.csv','reel_V.csv'], themes: ['U','V'] },
  { folder: '12WX', files: ['reel_W.csv','reel_X.csv'], themes: ['W','X'] },
];

// ── reel CSVを全て読み込んでマップ作成 ──────────────
// キー: "A_reel_01" → 値: {表紙テキスト, フック, 問題, 解説, 解決, 最後1, 最後2}
const reelMap = {};

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  const headers = splitLine(lines[0]);
  return lines.slice(1).map(l => {
    const vals = splitLine(l);
    const obj = {};
    headers.forEach((h, i) => obj[h.trim()] = (vals[i] || '').replace(/^"|"$/g, '').trim());
    return obj;
  });
}

function splitLine(line) {
  const r = []; let cur = '', inQ = false;
  for (const c of line) {
    if (c === '"') inQ = !inQ;
    else if (c === ',' && !inQ) { r.push(cur); cur = ''; }
    else cur += c;
  }
  r.push(cur);
  return r;
}

for (const { folder, files, themes } of THEME_FILES) {
  files.forEach((file, ti) => {
    const theme = themes[ti];
    const fp = path.join(REELS_BASE, folder, file);
    if (!fs.existsSync(fp)) return;
    const rows = parseCSV(fs.readFileSync(fp, 'utf8'));
    rows.forEach(r => {
      if (!r['ファイル名']) return;
      const key = `${theme}_${r['ファイル名']}`;
      reelMap[key] = r;
    });
  });
}

// ── filtered CSV を読んで各行を補完 ─────────────────
const raw = fs.readFileSync(FILTERED_CSV, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/).filter(l => l.trim());
const headers = splitLine(lines[0]);
const fileIdx = headers.indexOf('ファイル名');

const outLines = [
  '\uFEFF投稿日,投稿時刻,グループ,ファイル名,表紙テキスト,フック,問題,解説,解決,最後1,最後2'
];

lines.slice(1).forEach(line => {
  const cols = splitLine(line);
  const fileName = (cols[fileIdx] || '').replace(/^"|"$/g, '').trim();
  const r = reelMap[fileName] || {};
  const esc = v => `"${(v || '').replace(/"/g, '""')}"`;
  outLines.push([
    cols[0], cols[1],               // 投稿日, 投稿時刻
    esc(cols[2]?.replace(/^"|"$/g,'')),  // グループ
    fileName,                       // ファイル名
    esc(r['表紙テキスト'] || ''),
    esc(r['フック']       || ''),
    esc(r['問題']         || ''),
    esc(r['解説']         || ''),
    esc(r['解決']         || ''),
    esc(r['最後1']        || ''),
    esc(r['最後2']        || ''),
  ].join(','));
});

fs.writeFileSync(OUTPUT, outLines.join('\n'), 'utf8');
console.log(`✅ 完了: ${outLines.length - 1}行`);
console.log(`📄 出力先: ${OUTPUT}`);
