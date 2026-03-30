/**
 * fix_csv_filenames.js
 * reel_A〜X.csv の「ファイル名」列に混入した行番号プレフィックス
 * （例: "10: reel_10" → "reel_10"）を修正します。
 */
const fs   = require('fs');
const path = require('path');

const REELS_BASE = path.join(__dirname, 'reels');

const THEME_FILES = [
  { folder: '01AB', files: ['reel_A.csv','reel_B.csv'] },
  { folder: '02CD', files: ['reel_C.csv','reel_D.csv'] },
  { folder: '03EF', files: ['reel_E.csv','reel_F.csv'] },
  { folder: '04GH', files: ['reel_G.csv','reel_H.csv'] },
  { folder: '05IJ', files: ['reel_I.csv','reel_J.csv'] },
  { folder: '06KL', files: ['reel_K.csv','reel_L.csv'] },
  { folder: '07MN', files: ['reel_M.csv','reel_N.csv'] },
  { folder: '08OP', files: ['reel_O.csv','reel_P.csv'] },
  { folder: '09QR', files: ['reel_Q.csv','reel_R.csv'] },
  { folder: '10ST', files: ['reel_S.csv','reel_T.csv'] },
  { folder: '11UV', files: ['reel_U.csv','reel_V.csv'] },
  { folder: '12WX', files: ['reel_W.csv','reel_X.csv'] },
];

let totalFixed = 0;
for (const { folder, files } of THEME_FILES) {
  for (const file of files) {
    const filePath = path.join(REELS_BASE, folder, file);
    if (!fs.existsSync(filePath)) { console.warn(`⚠ 見つかりません: ${filePath}`); continue; }
    const original = fs.readFileSync(filePath, 'utf8');
    // "10: reel_10" → "reel_10" の形式を修正
    // 行頭の "10: " のような行番号プレフィックスを除去
    const fixed = original.replace(/^\d+: /gm, '');
    if (fixed !== original) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`✅ 修正: ${folder}/${file}`);
      totalFixed++;
    }
  }
}
console.log(`\n完了: ${totalFixed}ファイル修正`);
