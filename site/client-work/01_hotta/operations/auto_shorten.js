const fs = require('fs');
const path = require('path');

const reelsDir = path.join(__dirname, 'reels');

// Replacements to aggressively shorten Japanese text
const replacements = [
  [/完全に/g, ''],
  [/圧倒的な/g, ''],
  [/圧倒的に/g, ''],
  [/非常に/g, ''],
  [/凄まじい/g, ''],
  [/極めて/g, ''],
  [/全く/g, ''],
  [/絶対に/g, ''],
  [/絶対的/g, '絶対'],
  [/絶対的な/g, '絶対の'],
  [/してしまうからです/g, 'するからです'],
  [/してしまっていませんか/g, 'していませんか'],
  [/してませんか/g, 'しませんか'],
  [/しているからです/g, 'するからです'],
  [/ことこそが/g, 'ことが'],
  [/どうすればいいか/g, 'どうするか'],
  [/採用専用基盤/g, '採用基盤'],
  [/専用基盤/g, '基盤'],
  [/採用インフラ/g, '採用基盤'],
  [/という致命的な/g, '致命的な'],
  [/という絶望的な/g, '絶望的な'],
  [/という残酷な/g, '残酷な'],
  [/という大きな/g, '大きな'],
  [/という事実/g, '事実'],
  [/という/g, ''],
  [/のための/g, 'の'],
  [/についての/g, 'の'],
  [/皆様の/g, ''],
  [/私たち/g, ''],
  [/御社の/g, '自社の'],
  [/あなたの/g, ''],
  [/です。/g, '。'],
  [/ます。/g, '。'],
  [/でしょう。/g, '。'],
  [/ませんか/g, 'か'],
  [/でしょう/g, ''],
  [/かもしれません/g, 'かも'],
  [/本当の/g, ''],
  [/泥臭い/g, ''],
  [/熱烈な/g, ''],
  [/熱狂的な/g, ''],
  [/熱狂/g, '熱'],
  [/過酷な/g, 'キツい'],
  [/などではなく/g, 'ではなく'],
  [/である/g, 'な'],
  [/であると/g, 'と'],
  [/のような/g, 'の'],
  [/において/g, 'で'],
  [/における/g, 'の'],
  [/によって/g, 'で'],
  [/による/g, 'の'],
  [/に対して/g, 'に'],
  [/に対する/g, 'の'],
  [/ために/g, '為'],
  [/だからです/g, '為です'], // Slightly shorter
  [/からです/g, '為です'],
  [/なためです/g, '為です'],
  [/ためです/g, '為です'],
  [/という状態/g, '状態'],
  [/という状況/g, '状況'],
  [/といった/g, 'な'],
  [/てしまう/g, 'る'],
  [/てしまうこと/g, 'ること'],
  [/見えざる/g, '見えない'],
  [/無駄な/g, ''],
  [/強引に/g, ''],
  [/無謀な/g, ''],
  [/ひたすら/g, ''],
  [/最も/g, '一番'],
  [/永遠の/g, ''],
  [/休まず/g, ''],
  [/一瞬で/g, ''],
  [/激しく/g, ''],
  [/ドロドロの/g, ''],
  [/理不尽な/g, ''],
  [/手当たり次第に/g, ''],
  [/ドバドバ/g, ''],
  [/速攻/g, '即'],
  [/徹底的に/g, ''],
  [/隈なく/g, ''],
  [/ただ無残に/g, ''],
  [/無残に/g, ''],
  [/見知らぬ/g, '知らない'],
  [/多大な/g, '大きな'],
  [/想像以上に/g, ''],
  [/1ミリも/g, ''],
  [/1ミリ/g, ''],
  [/一滴も/g, ''],
  [/決定的に/g, ''],
  [/根本から/g, ''],
  [/一切/g, ''],
  [/決して/g, ''],
  [/二度と/g, ''],
  [/確実に/g, ''],
  [/即座に/g, '即'],
  [/直ちに/g, '即'],
  [/早急に/g, 'すぐ'],
  [/今すぐ/g, 'すぐ'],
  [/すぐさま/g, 'すぐ'],
  [/速やかに/g, 'すぐ']
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    let changed = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (!line.trim()) continue;

        // Simple CSV parse: split by '","' to handle internal fields
        // Assuming format is EXACTLY: "val1","val2",... 
        // with the first value possibly being "reel_01" or reel_01
        
        // Let's do a more robust string replacement.
        // We only want to shorten things that are actually long.
        // Actually, replacing globally is safe because these are filler words.
        
        let originalLine = line;
        for (const [regex, replacement] of replacements) {
            line = line.replace(regex, replacement);
        }
        
        if (line !== originalLine) {
            lines[i] = line;
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.csv')) {
            processFile(fullPath);
        }
    }
}

traverseDir(reelsDir);
console.log('Done.');
