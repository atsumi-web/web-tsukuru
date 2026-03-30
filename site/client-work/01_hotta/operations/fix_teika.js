/**
 * fix_teika.js
 * reel_A〜X.csv の全セルで「ていか」で終わる文を
 * 「ていませんか」に一括修正します。
 *
 * 修正対象: 「〜ていか」「〜でいか」「〜にいか」など
 * 修正後:   「〜ていませんか」「〜でいませんか」など
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

let totalFixed = 0, totalFiles = 0;
for (const { folder, files } of THEME_FILES) {
  for (const file of files) {
    const fp = path.join(REELS_BASE, folder, file);
    if (!fs.existsSync(fp)) { console.warn(`⚠ 見つかりません: ${fp}`); continue; }
    const original = fs.readFileSync(fp, 'utf8');
    // 「ていか"」→「ていませんか"」（セルの末尾パターン）
    const fixed = original.replace(/ていか"/g, 'ていませんか"')
                           .replace(/でいか"/g, 'でいませんか"')
                           .replace(/にいか"/g, 'にいませんか"')
                           .replace(/いいか"/g, 'いませんか"');
    const count = (original.match(/ていか"|でいか"|にいか"|いいか"/g) || []).length;
    if (fixed !== original) {
      fs.writeFileSync(fp, fixed, 'utf8');
      console.log(`✅ ${folder}/${file}: ${count}箇所修正`);
      totalFixed += count;
      totalFiles++;
    }
  }
}
console.log(`\n完了: ${totalFiles}ファイル、合計 ${totalFixed}箇所を修正`);
