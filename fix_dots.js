const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'planning', 'reels');
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && /^\d{2}[A-Z]{2}$/.test(dirent.name))
  .map(dirent => dirent.name);

const fixes = [
  { match: /ていま…/g, replace: 'ていませんか' },
  { match: /ていな…/g, replace: 'ていませんか' },
  { match: /焦ってい…/g, replace: '焦っていませんか' },
  { match: /不思議に思…/g, replace: '不思議に思っていませんか' },
  { match: /絶望い…/g, replace: '絶望していませんか' },
  { match: /絶望し…/g, replace: '絶望していませんか' },
  { match: /絶望…/g, replace: '絶望していませんか' },
  { match: /逃げてし…/g, replace: '逃げてしまっていませんか' },
  { match: /死んでしま…/g, replace: '死んでしまっていませんか' },
  { match: /死んでい…/g, replace: '死んでいませんか' },
  { match: /陥ってい…/g, replace: '陥っていませんか' },
  { match: /放置し…/g, replace: '放置していませんか' },
  { match: /放置…/g, replace: '放置していませんか' },
  { match: /戻るこ…/g, replace: '戻ることはありません' },
  { match: /戻ってき…/g, replace: '戻ってきません' },
  { match: /採用専用基…/g, replace: '採用専用基盤を持ちましょう' },
  { match: /専用基…/g, replace: '専用基盤を持ちましょう' },
  { match: /専用ペー…/g, replace: '専用ページを作りましょう' },
  { match: /専用ペ…/g, replace: '専用ページを作りましょう' },
  { match: /機会損…/g, replace: '機会損失になります' },
  { match: /不毛に会…/g, replace: '不毛に会社を蝕みます' },
  { match: /殺し合う不…/g, replace: '殺し合う不毛な戦いです' },
  { match: /残酷な戦…/g, replace: '残酷な戦いです' },
  { match: /残酷…/g, replace: '残酷な現実です' },
  { match: /無間地獄を…/g, replace: '無間地獄を抜け出しましょう' },
  { match: /無間地獄に…/g, replace: '無間地獄に陥ります' },
  { match: /ミスマッ…/g, replace: 'ミスマッチを防ぎましょう' },
  { match: /不安…/g, replace: '不安を払拭しましょう' },
  { match: /ごまかしま…/g, replace: 'ごまかしてはいけません' },
  { match: /ごまかいま…/g, replace: 'ごまかしてはいけません' },
  { match: /ごまかして…/g, replace: 'ごまかしてはいけません' },
  { match: /隠蔽してごま…/g, replace: '隠蔽してごまかしていませんか' },
  { match: /弾き返してしま…/g, replace: '弾き返してしまっていませんか' },
  { match: /遮断して弾き…/g, replace: '遮断して弾き返していませんか' },
  { match: /見限…/g, replace: '見限ってしまいます' },
  { match: /無力ではありませ…/g, replace: '無力ではありませんか' },
  { match: /無力な状態を放置…/g, replace: '無力な状態を放置していませんか' },
  { match: /終わっ…/g, replace: '終わっているも同然です' },
  { match: /終わってしま…/g, replace: '終わってしまいます' },
  { match: /離…/g, replace: '離脱されます' },
  { match: /素通…/g, replace: '素通りされます' },
  { match: /予算…/g, replace: '予算を投じましょう' },
  { match: /投資…/g, replace: '投資しましょう' },
  { match: /探…/g, replace: '探るからです' },
  { match: /原因…/g, replace: '原因です' },
  { match: /繰り返いま…/g, replace: '繰り返していませんか' },
  { match: /繰り返さ…/g, replace: '繰り返されていませんか' },
  { match: /繰り返…/g, replace: '繰り返すことになります' },
  { match: /ヤバい場所に…/g, replace: 'ヤバい場所に見えます' },
  { match: /態を…/g, replace: '態を招きます' },
  { match: /態に陥ってい…/g, replace: '状態に陥っていませんか' },
  { match: /態に…/g, replace: '状態になっています' },
  { match: /態…/g, replace: '状態です' },
  { match: /限界…/g, replace: '限界です' },
  { match: /無駄…/g, replace: '無駄になります' },
  { match: /無常のシ…/g, replace: '無常のシステムです' },
  { match: /シ…/g, replace: 'システムです' },
  { match: /窓口を…/g, replace: '窓口を作りましょう' },
  { match: /導線が…/g, replace: '導線が必要です' },
  { match: /ハード…/g, replace: 'ハードルが高いからです' },
  { match: /マイ…/g, replace: 'マイナスです' },
  { match: /ブラックボックスになっ…/g, replace: 'ブラックボックスになっていませんか' },
  { match: /ブラック…/g, replace: 'ブラックボックスです' },
  { match: /危険な無…/g, replace: '危険な無間地獄です' },
  { match: /強烈…/g, replace: '強烈なマイナスです' },
  { match: /強烈に…/g, replace: '強烈に痛手です' },
  { match: /強烈な…/g, replace: '強烈な問題です' },
  { match: /最悪の…/g, replace: '最悪の事態です' },
  { match: /最優先で…/g, replace: '最優先で作るべきです' },
  { match: /最優先…/g, replace: '最優先です' },
  { match: /優先…/g, replace: '優先すべきです' },
  { match: /圧倒的…/g, replace: '圧倒的な差になります' },
  { match: /圧倒的に…/g, replace: '圧倒的に不利です' },
  { match: /圧倒的情報量…/g, replace: '圧倒的情報量が必要です' },
  { match: /情報量が…/g, replace: '情報量が圧倒的に足りていません' },
  { match: /不足してい…/g, replace: '不足していませんか' },
  { match: /不足して…/g, replace: '不足していませんか' },
  { match: /足りていな…/g, replace: '足りていません' },
  { match: /足りて…/g, replace: '足りていません' },
  { match: /足りてい…/g, replace: '足りていません' },
  { match: /溜…/g, replace: '溜まっていませんか' },
  { match: /蓄積されず無力…/g, replace: '蓄積されず無力化していませんか' },
  { match: /蓄積されず搾取され…/g, replace: '蓄積されず搾取され続けます' },
  { match: /搾取され…/g, replace: '搾取され続ける運命です' },
  { match: /蓄積され…/g, replace: '蓄積されていませんか' },
  { match: /蓄積しコント…/g, replace: '蓄積しコントロールする基盤が必要です' },
  { match: /コントロール…/g, replace: 'コントロールしましょう' },
  { match: /コントロールす…/g, replace: 'コントロールする基盤が必要です' },
  { match: /コントロールするこ…/g, replace: 'コントロールすることができます' },
  { match: /コントロールする権利…/g, replace: 'コントロールする権利を失います' },
  { match: /自衛してひた隠しにしてしまって…/g, replace: '自衛してひた隠しにしてしまっていませんか' },
  { match: /ひた隠しにして…/g, replace: 'ひた隠しにしていませんか' },
  { match: /隠してい…/g, replace: '隠していませんか' },
  { match: /隠して…/g, replace: '隠していませんか' },
  { match: /隠し…/g, replace: '隠していませんか' },
  { match: /逃し…/g, replace: '逃しています' },
  { match: /逃して…/g, replace: '逃していませんか' },
  { match: /逃してい…/g, replace: '逃していませんか' },
  { match: /逃していま…/g, replace: '逃していませんか' },
  { match: /見逃し…/g, replace: '見逃していませんか' },
  { match: /見逃して…/g, replace: '見逃していませんか' },
  { match: /見逃してい…/g, replace: '見逃していませんか' },
  { match: /見逃していま…/g, replace: '見逃していませんか' },
  { match: /失い…/g, replace: '失います' },
  { match: /失って…/g, replace: '失っていませんか' },
  { match: /失ってい…/g, replace: '失っていませんか' },
  { match: /失っていま…/g, replace: '失っていませんか' },
  { match: /削ぎ落として…/g, replace: '削ぎ落としていませんか' },
  { match: /削ぎ落としてい…/g, replace: '削ぎ落としていませんか' },
  { match: /削いでい…/g, replace: '削いでいませんか' },
  { match: /打ち出してい…/g, replace: '打ち出していませんか' },
  { match: /打ち出せ…/g, replace: '打ち出せていません' },
  { match: /打ち出せていな…/g, replace: '打ち出せていません' },
  { match: /打ち出せてい…/g, replace: '打ち出せていません' },
  { match: /打ち出せていな…/g, replace: '打ち出せていません' },
  { match: /打ち出せていま…/g, replace: '打ち出せていません' },
  { match: /出し…/g, replace: '出していませんか' },
  { match: /出してい…/g, replace: '出していませんか' },
  { match: /出していま…/g, replace: '出していませんか' },
  { match: /出せてい…/g, replace: '出せていません' },
  { match: /出せていな…/g, replace: '出せていません' },
  { match: /終わっ…/g, replace: '終わってしまいます' },
  { match: /終わって…/g, replace: '終わっていませんか' },
  { match: /終わってい…/g, replace: '終わっていませんか' },
  { match: /終わっていま…/g, replace: '終わっていませんか' },
  { match: /終わる…/g, replace: '終わるからです' },
  { match: /終わるの…/g, replace: '終わるからです' },
  { match: /終わるので…/g, replace: '終わるからです' },
  { match: /集め…/g, replace: '集めてみませんか' },
  { match: /集めて…/g, replace: '集めてみませんか' },
  { match: /埋没し死ん…/g, replace: '埋没し死んでいませんか' },
  { match: /避け…/g, replace: '避けましょう' },
  { match: /避けて…/g, replace: '避けてはいけません' },
  { match: /避けてい…/g, replace: '避けていませんか' },
  { match: /避けていま…/g, replace: '避けていませんか' },
  { match: /比べられ…/g, replace: '比べられるからです' },
  { match: /動か…/g, replace: '動かします' },
  { match: /伝わっていな…/g, replace: '伝わっていませんか' },
  { match: /伝わらず死んで…/g, replace: '伝わらず死んでいませんか' },
  { match: /死に絶え誰の心にも一ミリも響き…/g, replace: '死に絶え誰の心にも響きません' },
  { match: /空気の…/g, replace: '空気のような存在になります' },
  { match: /終焉を迎…/g, replace: '終焉を迎えます' },
  { match: /危険な無…/g, replace: '危険な無間地獄です' },
  { match: /運命…/g, replace: '運命です' },
  { match: /運…/g, replace: '運命です' },
  // Catch all remaining dots
  { match: /…/g, replace: '' }
];

let totalChanged = 0;

for (const d of dirs) {
  const dirPath = path.join(baseDir, d);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.csv'));
  for (const f of files) {
    const filePath = path.join(dirPath, f);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let isModified = false;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('…')) {
            let newLine = lines[i];
            for (const fix of fixes) {
                if(newLine.includes('…')) {
                   newLine = newLine.replace(fix.match, fix.replace);
                }
            }
            // fallback: remove any remaining dots
            newLine = newLine.replace(/…/g, '');
            
            if (newLine !== lines[i]) {
                lines[i] = newLine;
                isModified = true;
            }
        }
    }

    if (isModified) {
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        console.log(`Removed dots in ${f}`);
        totalChanged++;
    }
  }
}

console.log(`Total files updated: ${totalChanged}`);
