const fs = require('fs');

const ruleHtml = `
            <div class="rule-box bad" style="border-left-color: #fca5a5;">
                <center><strong>【事例】縦書き時の「カギカッコ（「）」の上が空く・行の頭が揃わない</strong></center>
                <ul>
                    <li><strong>症状：</strong> 縦書きで「こどもらしく」等と書いた際、「」の上に不自然な空白ができ、隣の行と頭の位置が揃って見えない（上にズレて見える）。</li>
                    <li><strong>原因：</strong> 日本語フォントは開きカッコ（「、（など）のグリフデータ自体に、元々半角分の余白（アキ）が含まれているため。物理的には揃っていても視覚的に落ちて見える。</li>
                    <li><strong>解決策：</strong> <code>text-indent: -0.5em;</code> （ぶら下がり・天ツキ）を指定することで強制的に上に引っ張り上げて揃えるか、<code>font-feature-settings: 'palt';</code> を活用する。</li>
                </ul>
            </div>
`;

let html = fs.readFileSync('site/manuals/internal/09_coding_rules.html', 'utf8');
const searchStr = '<h3 style="margin-top: 60px; font-size: 1.8rem; color: var(--th); border-bottom: 2px solid var(--th); padding-bottom: 12px;">困った時の事例集</h3>';
if(html.includes(searchStr)) {
  html = html.replace(searchStr, searchStr + '\n' + ruleHtml);
  fs.writeFileSync('site/manuals/internal/09_coding_rules.html', html);
  console.log('HTML updated');
} else {
  console.log('Search string not found in HTML.');
}

const ruleMd = `
### 【事例】縦書き時の「カギカッコ（「）」の上が空く・行の頭が揃わない
- **症状**: 縦書きで「こどもらしく」等と書いた際、「」の上に不自然な空白ができ、隣の行と頭の位置が揃って見えない。
- **原因**: 日本語フォントは開きカッコ（「、（など）のグリフデータ自体に、元々半角分の余白（アキ）が含まれているため。
- **解決策**: \`text-indent: -0.5em;\` （ぶら下がり・天ツキ）を指定することで強制的に上に引っ張り上げて揃えるか、\`font-feature-settings: 'palt';\` を活用する。
`;

const kiPath = 'C:/Users/eri76/.gemini/antigravity/knowledge/antigravity_development_framework/artifacts/coding_standard.md';
let md = fs.readFileSync(kiPath, 'utf8');
if (md.includes('困った時の事例集')) {
    md = md.replace('## 困った時の事例集', '## 困った時の事例集\n' + ruleMd);
} else {
    md += '\n\n## 困った時の事例集\n' + ruleMd;
}
fs.writeFileSync(kiPath, md);
console.log('MD updated');
