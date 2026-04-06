const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'site/templates/democycle');

const replacements = [
  // 新しい架空社名
  { search: /株式会社デモサイクル/g, replace: '株式会社アーバンモビリティ' },
  { search: /デモサイクル/g, replace: 'アーバンモビリティ' },
  { search: /Demo Cycle Inc\./g, replace: 'Urban Mobility Inc.' },
  { search: /Demo Cycle/g, replace: 'Urban Mobility' },
  { search: /Dr\.Pedal/g, replace: 'Urban Mobility' },
  
  // 固有名詞の抽象化 (文章)
  { search: /ドコモバイクシェア・Limeなど大手企業/g, replace: '国内・外資の大手シェアモビリティ事業者' },
  // 固有名詞の抽象化 (ロゴ・実績リストなど)
  { search: /docomo bike share/gi, replace: '国内最大手モビリティA社' },
  { search: /ドコモバイクシェア/g, replace: '国内最大手モビリティA社' },
  { search: /Lime/gi, replace: '外資系モビリティB社' },
  { search: /茨城県/g, replace: '関東圏の自治体様' },
  { search: /三菱地所/g, replace: '大手不動産ディベロッパー' },
  { search: /TripAdvisor/gi, replace: '世界的大手旅行プラットフォーム' },
  { search: /Klook/gi, replace: 'グローバル体験予約サービス' }
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      for (const r of replacements) {
        content = content.replace(r.search, r.replace);
      }
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated scrubbed proper nouns: ${fullPath}`);
      }
    }
  }
}

try {
  processDir(targetDir);
  console.log('Scrub complete.');
} catch (error) {
  console.error('Error processing directory:', error);
}
