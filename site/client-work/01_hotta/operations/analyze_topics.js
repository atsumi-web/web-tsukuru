/**
 * analyze_topics.js
 * posting_schedule.csv の表紙テキスト・フックをキーワードでグループ分けし、
 * 各グループの本数と一覧を出力します。
 *
 * 使い方: node planning/analyze_topics.js
 * 出力:   planning/topic_groups.csv（グループ別一覧）
 */

const fs   = require('fs');
const path = require('path');

// ── トピックグループ定義 ──────────────────────────
const TOPIC_GROUPS = [
  { name: '掲載費・広告費の無駄',   keywords: ['掲載費', '広告費', '掲載料', '課金', '掛け捨て', '消耗'] },
  { name: '媒体依存からの脱却',      keywords: ['媒体', '依存', '脱却', '求人サイト', '丸投げ', '外部'] },
  { name: '受け皿なき集客',          keywords: ['受け皿', '集客', 'バズ', '再生数', 'SNS', 'フォロワー'] },
  { name: 'ミスマッチ・早期離職',    keywords: ['ミスマッチ', '早期離職', '離脱', '辞める', '離職', '退社'] },
  { name: '電話応募の壁',            keywords: ['電話', '応募', '窓口', 'スマホ', '恐怖'] },
  { name: '大手との条件競争',        keywords: ['大手', '条件', '競争', '比較', '竹槍', '消耗戦', '戦車'] },
  { name: '社長・経営者の言葉',      keywords: ['社長', '経営者', '熱量', '肉声', '本音', '言葉', 'ビジョン'] },
  { name: '現場写真・リアルな情報',  keywords: ['現場', '写真', '泥', '汗', '素顔', 'リアル', '実態', '生の'] },
  { name: '情報不足・信頼の問題',    keywords: ['情報不足', '薄い', '不透明', '警戒', 'ブラック', '情報量'] },
  { name: '採用コスト見える化',      keywords: ['採用コスト', '採用単価', '費用対効果', 'データ', 'いくら'] },
  { name: '自社採用基盤・資産化',    keywords: ['自社', '基盤', '資産', 'インフラ', 'ノウハウ', '内製'] },
  { name: '先輩の顔・人間関係',      keywords: ['先輩', '仲間', '人間関係', '職人', '顔', 'チーム'] },
  { name: '検索・指名流入',          keywords: ['検索', '指名', '名指し', '社名'] },
  { name: 'キャプション・CTA',       keywords: ['無料診断', 'リンク', 'メッセージ', 'プロフィール'] },
];

// ── CSVパース ─────────────────────────────────────
const SCHEDULE_CSV = path.join(__dirname, 'posting_schedule.csv');
const raw = fs.readFileSync(SCHEDULE_CSV, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/).filter(l => l.trim());
const headers = lines[0].split(',');
const coverIdx = headers.indexOf('表紙テキスト');
const hookIdx  = headers.indexOf('フック（hook）');
const fileIdx  = headers.indexOf('ファイル名');
const dateIdx  = headers.indexOf('投稿日');

const reels = lines.slice(1).map((l, i) => {
  const cols = l.split(',');
  return {
    n:        i + 1,
    date:     (cols[dateIdx] || '').trim(),
    fileName: (cols[fileIdx] || '').replace(/^"|"$/g, '').trim(),
    cover:    (cols[coverIdx] || '').replace(/^"|"$/g, '').trim(),
    hook:     (cols[hookIdx] || '').replace(/^"|"$/g, '').trim(),
  };
});

// ── グループ分け ──────────────────────────────────
const grouped = {};
TOPIC_GROUPS.forEach(g => grouped[g.name] = []);
grouped['その他'] = [];

reels.forEach(r => {
  const text = r.cover + r.hook;
  let matched = false;
  for (const g of TOPIC_GROUPS) {
    if (g.keywords.some(kw => text.includes(kw))) {
      grouped[g.name].push(r);
      matched = true;
      break;
    }
  }
  if (!matched) grouped['その他'].push(r);
});

// ── コンソール出力 ────────────────────────────────
console.log('\n📊 トピックグループ別 本数一覧\n');
let total = 0;
Object.entries(grouped).sort((a, b) => b[1].length - a[1].length).forEach(([name, items]) => {
  console.log(`${String(items.length).padStart(3)}本　${name}`);
  total += items.length;
});
console.log(`─────────────────`);
console.log(`${String(total).padStart(3)}本　合計`);

// ── CSV出力（グループ・本数・ファイル名・表紙テキスト） ──
const OUTPUT = path.join(__dirname, 'topic_groups.csv');
const outLines = ['\uFEFFグループ,本数,No,投稿日,ファイル名,表紙テキスト,フック'];
Object.entries(grouped).sort((a, b) => b[1].length - a[1].length).forEach(([name, items]) => {
  items.forEach(r => {
    const hook = r.hook.replace(/,/g, '、');
    outLines.push(`"${name}",${items.length},${r.n},${r.date},${r.fileName},"${r.cover}","${hook}"`);
  });
});
fs.writeFileSync(OUTPUT, outLines.join('\n'), 'utf8');
console.log(`\n📄 詳細CSV: ${OUTPUT}`);
