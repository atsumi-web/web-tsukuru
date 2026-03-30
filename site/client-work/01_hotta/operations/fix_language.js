// fix_language.js
// UTF-8で読み書きし、文字化けを防ぐ
// 特定ファイルの特定テキストを正確に置換する

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'reels');

// 修正定義リスト: { file, from, to }
const fixes = [
  // ======== reel_A (01AB/reel_A.csv) ========
  {
    file: path.join(BASE, '01AB', 'reel_A.csv'),
    from: '一度紹介会社麻薬に頼っると',
    to:   '一度、紹介会社という麻薬に頼ると',
  },

  // ======== reel_D (02CD/reel_D.csv) ========
  {
    file: path.join(BASE, '02CD', 'reel_D.csv'),
    from: '\"の流入ルートを可視化し',
    to:   '\"全ての流入ルートを可視化し',
  },

  // ======== reel_O (08OP/reel_O.csv) ========
  {
    file: path.join(BASE, '08OP', 'reel_O.csv'),
    from: '泥臭さなマイナス面',
    to:   '泥臭いマイナス面',
  },

  // ======== reel_P (08OP/reel_P.csv) ========
  {
    file: path.join(BASE, '08OP', 'reel_P.csv'),
    from: '他社サーバーに実績が蓄積される以上、の意志で自由に改善し操れない為です',
    to:   '他社サーバーに実績が蓄積される以上、自社の意志で自由に改善し操れない為です',
  },
  {
    file: path.join(BASE, '08OP', 'reel_P.csv'),
    from: '\"面も一番最初から正直に開示する採用ページで、事前の覚悟を決めさせよう\"',
    to:   '\"キツい面も最初から正直に開示する採用ページで、事前の覚悟を決めさせよう\"',
  },
  {
    file: path.join(BASE, '08OP', 'reel_P.csv'),
    from: 'フリー素材とした嘘の冷たい説明で',
    to:   'フリー素材と嘘の冷たい説明で',
  },
  {
    file: path.join(BASE, '08OP', 'reel_P.csv'),
    from: '自営の採用における究極の理想形',
    to:   '自社の採用における究極の理想形',
  },

  // ======== reel_T (10ST/reel_T.csv) ========
  {
    file: path.join(BASE, '10ST', 'reel_T.csv'),
    from: '他社プラットフォームにデータが蓄積される以上、の意志で採用手法を改善できない為です',
    to:   '他社プラットフォームにデータが蓄積される以上、自社の意志で採用手法を改善できない為です',
  },
  {
    file: path.join(BASE, '10ST', 'reel_T.csv'),
    from: '\"過酷で面も嘘偽りなく正直に開示するページで、事前の覚悟を決めさせミスマッチを防ごう\"',
    to:   '\"過酷なキツい面も嘘偽りなく正直に開示するページで、事前の覚悟を決めさせミスマッチを防ごう\"',
  },
  {
    file: path.join(BASE, '10ST', 'reel_T.csv'),
    from: '堂々い届ける不器用でもページにしよう',
    to:   '堂々と届ける不器用でもページにしよう',
  },
  {
    file: path.join(BASE, '10ST', 'reel_T.csv'),
    from: '自白だけのノウハウの蓄積は一生育たない為です',
    to:   '自社だけのノウハウの蓄積は一生育たない為です',
  },
  {
    file: path.join(BASE, '10ST', 'reel_T.csv'),
    from: '\"の一日のドタバタした流れから生の声までを120%見せる',
    to:   '\"現場の一日のドタバタした流れから生の声までを120%見せる',
  },

  // ======== reel_V (11UV/reel_V.csv) ========
  {
    file: path.join(BASE, '11UV', 'reel_V.csv'),
    from: '他社プラットフォームにデータが蓄積される以上、の意志で採用改善できない為です',
    to:   '他社プラットフォームにデータが蓄積される以上、自社の意志で採用改善できない為です',
  },
  {
    file: path.join(BASE, '11UV', 'reel_V.csv'),
    // reel_22 解決: "不器用で基盤を作ろう" → "不器用な言葉だけで戦う基盤を作ろう"
    from: '\"薄い言葉ではなく、覚悟ある人材の心に深く刺さる不器用で基盤を作ろう\"',
    to:   '\"薄い言葉ではなく、覚悟ある人材の心に深く刺さる不器用な言葉だけで戦う基盤を作ろう\"',
  },

  // ======== reel_R (09QR/reel_R.csv) ========
  {
    file: path.join(BASE, '09QR', 'reel_R.csv'),
    // reel_22 解決: "不器用で基盤を作ろう"
    from: '\"薄い言葉ではなく、覚悟ある人材の心に深く刺さる不器用で基盤を作ろう\"',
    to:   '\"薄い言葉ではなく、覚悟ある人材の心に深く刺さる不器用な言葉だけで戦う基盤を作ろう\"',
  },

  // ======== reel_W (12WX/reel_W.csv) ========
  {
    file: path.join(BASE, '12WX', 'reel_W.csv'),
    // reel_06 解説: 文末脱落
    from: '若手にとって知らない会社への直電話は、ページを閉じるよりも精神的に無理な高い恐怖の壁',
    to:   '若手にとって知らない会社への直電話は、精神的に無理な高い恐怖の壁になる為です',
  },
  {
    file: path.join(BASE, '12WX', 'reel_W.csv'),
    // reel_07 解説: 文末脱落
    from: '媒体は初めから条件の比較であり、中小に不利になるよう冷酷に設計された舞台',
    to:   '媒体は初めから条件の比較であり、中小に不利になるよう冷酷に設計された舞台為です',
  },
  {
    file: path.join(BASE, '12WX', 'reel_W.csv'),
    // reel_12 解説: 文末脱落
    from: '求職者が最後に入社を決断するのは、表面的な条件ではなく経営者の嘘のない熱量と覚悟',
    to:   '求職者が最後に入社を決断するのは、表面的な条件ではなく経営者の嘘のない熱量と覚悟為です',
  },

  // ======== reel_X (12WX/reel_X.csv) ========
  {
    file: path.join(BASE, '12WX', 'reel_X.csv'),
    from: '求人媒体他人の土俵で戦い続ける限り',
    to:   '求人媒体という他人の土俵で戦い続ける限り',
  },
  {
    file: path.join(BASE, '12WX', 'reel_X.csv'),
    from: '自営採用の究極の理想形',
    to:   '自社採用の究極の理想形',
  },
];

let totalFixed = 0;
let totalErrors = 0;

for (const fix of fixes) {
  if (!fs.existsSync(fix.file)) {
    console.error(`[ERROR] File not found: ${fix.file}`);
    totalErrors++;
    continue;
  }

  // UTF-8で読み込み(BOMなし)
  let content = fs.readFileSync(fix.file, 'utf8');

  if (!content.includes(fix.from)) {
    console.warn(`[WARN ] Not found in ${path.basename(fix.file)}: "${fix.from}"`);
    continue;
  }

  const updated = content.split(fix.from).join(fix.to);
  // UTF-8で書き込み(BOMなし)
  fs.writeFileSync(fix.file, updated, 'utf8');
  console.log(`[OK   ] Fixed in ${path.basename(fix.file)}: "${fix.from}" → "${fix.to}"`);
  totalFixed++;
}

console.log(`\nDone. ${totalFixed} fix(es) applied, ${totalErrors} error(s).`);
