// fix_overpromise.js
// 「フルオープン」「不都合な真実」「赤裸々」などの過剰約束表現を修正する
// UTF-8 で読み書きして文字化けを防ぐ

const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, 'reels');

const fixes = [
  // reel_E / reel_11
  {
    file: path.join(BASE, '03EF', 'reel_E.csv'),
    from: 'ドタバタした風景や現場の泥臭さまで、会社の光と影をフルオープンで見せる基盤を作ろう',
    to:   'ドタバタした風景や現場の泥臭さまで、良い面も厳しい面も隠さず見せる基盤を作ろう',
  },
  // reel_F / reel_29
  {
    file: path.join(BASE, '03EF', 'reel_F.csv'),
    from: '職場の風景から現場の実態まで、全方位をフルオープンで見せつける安心の強力専用拠点を作ろう',
    to:   '職場の風景から現場の実態まで、包み隠さず正直に届ける安心の強力専用拠点を作ろう',
  },
  // reel_G / reel_03
  {
    file: path.join(BASE, '04GH', 'reel_G.csv'),
    from: 'バズの一過性の熱を逃さず、現場の過酷さや不都合な真実まで網羅した深い基盤を持とう',
    to:   'バズの一過性の熱を逃さず、現場の過酷さも含めた実態を網羅した深い基盤を持とう',
  },
  // reel_H / reel_16
  {
    file: path.join(BASE, '04GH', 'reel_H.csv'),
    from: '一日のキツい流れから生の声まで、不都合なリアルを含めてフルオープンで見せる基盤を作ろう',
    to:   '一日のキツい流れから生の声まで、良い面も厳しい面も正直に見せる基盤を作ろう',
  },
  // reel_J / reel_16
  {
    file: path.join(BASE, '05IJ', 'reel_J.csv'),
    from: '綺麗事を捨て、毎日の業務の裏側から不都合な真実まで素直にフルオープンな独自ページに変えよう',
    to:   '綺麗事を捨て、日々の業務の裏側から厳しい現実まで正直に届ける独自ページに変えよう',
  },
  // reel_J / reel_28
  {
    file: path.join(BASE, '05IJ', 'reel_J.csv'),
    from: 'キツさも含め、嘘偽りなく正直にフルオープンで開示する独自のページで覚悟を決めさせよう',
    to:   'キツさも含め、厳しい面も正直に届ける独自のページで覚悟を決めさせよう',
  },
  // reel_L / reel_17
  {
    file: path.join(BASE, '06KL', 'reel_L.csv'),
    from: '逃げ出さない覚悟を持たせるため、現場のキツいリアルも事前に赤裸々に伝える基盤を用意しよう',
    to:   '逃げ出さない覚悟を持たせるため、現場のキツいリアルも事前にありのまま伝える基盤を用意しよう',
  },
  // reel_L / reel_28
  {
    file: path.join(BASE, '06KL', 'reel_L.csv'),
    from: '現場のドタバタ風景からキツい実態まで、正直にフルオープンで見せつける独自の基盤を整えよう',
    to:   '現場のドタバタ風景からキツい実態まで、包み隠さず正直に見せる独自の基盤を整えよう',
  },
  // reel_V / reel_28
  {
    file: path.join(BASE, '11UV', 'reel_V.csv'),
    from: '日常のドタバタ風景から生の声までフルオープンにした、嘘のない強い情報量の基盤を作ろう',
    to:   '日常のドタバタから生の声まで隠さず届ける、嘘のない強い情報量の基盤を作ろう',
  },
];

let totalFixed = 0;
for (const fix of fixes) {
  if (!fs.existsSync(fix.file)) {
    console.error(`[ERROR] Not found: ${fix.file}`);
    continue;
  }
  let content = fs.readFileSync(fix.file, 'utf8');
  if (!content.includes(fix.from)) {
    console.warn(`[WARN ] Not found in ${path.basename(fix.file)}: "${fix.from.slice(0, 30)}..."`);
    continue;
  }
  content = content.split(fix.from).join(fix.to);
  fs.writeFileSync(fix.file, content, 'utf8');
  console.log(`[OK   ] ${path.basename(fix.file)}: "${fix.from.slice(0, 30)}..." → 修正完了`);
  totalFixed++;
}
console.log(`\n完了: ${totalFixed}箇所を修正しました。`);
