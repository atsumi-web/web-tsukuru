const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'site/templates/democycle');

const finalReplacements = [
  { search: /東京・茨城/g, replace: '東京・北関東' },
  { search: /\.role-box\.drpedal/g, replace: '.role-box.our-company' },
  { search: /class="role-box drpedal reveal"/g, replace: 'class="role-box our-company reveal"' },
  { search: /www\.dr-pedal\.com/g, replace: 'www.urban-mobility-demo.com' },
  { search: /drpedal99\.jp/g, replace: '#' },
  { search: /04_drpedal/g, replace: 'democycle' }
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      for (const r of finalReplacements) {
        content = content.replace(r.search, r.replace);
      }
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Final scrub clean: ${fullPath}`);
      }
    }
  }
}

try {
  processDir(targetDir);
  console.log('Final scrub complete.');
} catch (error) {
  console.error('Error processing directory:', error);
}
