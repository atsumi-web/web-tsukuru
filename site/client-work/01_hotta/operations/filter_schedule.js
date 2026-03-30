/**
 * filter_schedule.js
 * topic_groups.csv の各グループから最大 MAX_PER_GROUP 本を均等に選抜し、
 * グループがランダム順に混ざった新しい投稿スケジュールを生成します。
 *
 * 使い方: node planning/filter_schedule.js
 * 出力:   planning/posting_schedule_filtered.csv
 */

const fs   = require('fs');
const path = require('path');

const MAX_PER_GROUP = 8;
const START_DATE    = new Date('2026-03-20');
const GROUPS_CSV    = path.join(__dirname, 'topic_groups.csv');
const OUTPUT        = path.join(__dirname, 'posting_schedule_filtered.csv');

// ── CSV読み込み ───────────────────────────────────
const raw = fs.readFileSync(GROUPS_CSV, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/).filter(l => l.trim());

// グループ別にまとめる
const groups = {}; // { groupName: [row, ...] }
lines.slice(1).forEach(line => {
  // カンマ区切り（クォート考慮）
  const cols = parseLine(line);
  const group    = cols[0];
  const fileName = cols[4];
  const cover    = cols[5];
  const hook     = cols[6];
  if (!group || !fileName) return;
  if (!groups[group]) groups[group] = [];
  groups[group].push({ group, fileName, cover, hook });
});

function parseLine(line) {
  const result = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { inQ = !inQ; }
    else if (c === ',' && !inQ) { result.push(cur.trim()); cur = ''; }
    else { cur += c; }
  }
  result.push(cur.trim());
  return result;
}

// ── シード付き乱数（毎回同じ結果を保証） ─────────
// シードを変えれば別の91本に変わる
const SEED = 20260320;
let _seed = SEED;
function rand() {
  _seed ^= _seed << 13;
  _seed ^= _seed >> 17;
  _seed ^= _seed << 5;
  return ((_seed >>> 0) / 0xFFFFFFFF);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const selected = [];
Object.entries(groups).forEach(([name, items]) => {
  const picks = shuffle([...items]).slice(0, MAX_PER_GROUP);
  console.log(`  ${String(picks.length).padStart(2)}本選抜: ${name}（全${items.length}本）`);
  selected.push(...picks);
});

console.log(`\n✅ 選抜合計: ${selected.length}本`);

// ── グループが連続しないようラウンドロビン ────────
const queues = {};
selected.forEach(r => {
  if (!queues[r.group]) queues[r.group] = [];
  queues[r.group].push(r);
});
Object.values(queues).forEach(q => shuffle(q));

const ordered = [];
let done = false;
const idxMap = {};
Object.keys(queues).forEach(k => idxMap[k] = 0);

while (!done) {
  done = true;
  for (const k of Object.keys(queues)) {
    if (idxMap[k] < queues[k].length) {
      ordered.push(queues[k][idxMap[k]]);
      idxMap[k]++;
      done = false;
    }
  }
}

// ── テンプレートペアが連続しないよう後処理シャッフル ──
// A&B → 1, C&D → 2, ..., W&X → 12
const THEME_PAIR = { A:1,B:1, C:2,D:2, E:3,F:3, G:4,H:4,
                     I:5,J:5, K:6,L:6, M:7,N:7, O:8,P:8,
                     Q:9,R:9, S:10,T:10, U:11,V:11, W:12,X:12 };

function getPair(fileName) {
  const theme = (fileName || '').charAt(0).toUpperCase();
  return THEME_PAIR[theme] || 0;
}

// 最大100回試行して隣接ペアの重複を解消
function deconflictPairs(arr, maxTries = 100) {
  for (let t = 0; t < maxTries; t++) {
    let conflict = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (getPair(arr[i].fileName) === getPair(arr[i+1].fileName)) {
        // 右側を後方のランダム位置と交換
        let j = i + 2 + Math.floor(Math.random() * (arr.length - i - 2));
        if (j >= arr.length) j = arr.length - 1;
        [arr[i+1], arr[j]] = [arr[j], arr[i+1]];
        conflict = true;
      }
    }
    if (!conflict) { console.log(`✅ テンプレート重複解消: ${t+1}回で完了`); return arr; }
  }
  console.warn(`⚠ ${maxTries}回試行後も一部重複が残っています`);
  return arr;
}

deconflictPairs(ordered);

// ── 日付付きCSV出力 ───────────────────────────────
const fmt = d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}/${m}/${day}`;
};

const outLines = ['\uFEFF投稿日,投稿時刻,グループ,ファイル名,表紙テキスト,フック（hook）'];
let cur = new Date(START_DATE);
ordered.forEach(r => {
  const hook = (r.hook || '').replace(/,/g, '、');
  outLines.push(`${fmt(cur)},19:00,"${r.group}",${r.fileName},"${r.cover}","${hook}"`);
  cur.setDate(cur.getDate() + 1);
});

fs.writeFileSync(OUTPUT, outLines.join('\n'), 'utf8');
console.log(`\n📅 絞り込みスケジュール生成完了！`);
console.log(`📄 出力先: ${OUTPUT}`);
console.log(`📊 総投稿数: ${ordered.length}本`);
console.log(`📆 期間: ${fmt(START_DATE)} 〜 ${fmt(cur)}`);
