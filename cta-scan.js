const fs = require('fs');
const files = fs.readdirSync('site/client-work/07_youchien/hp').filter(f => f.endsWith('.html'));
files.forEach(f => {
  const content = fs.readFileSync('site/client-work/07_youchien/hp/' + f, 'utf8');
  let ctas = [];
  if (content.includes('ky-cta-sec')) ctas.push('ky-cta-sec (Index Style)');
  if (content.includes('ky-ph-cta')) ctas.push('ky-ph-cta (2 Cards Style)');
  if (content.includes('mz-next-split')) ctas.push('mz-next-split (Big Split Style)');
  
  console.log(f.padEnd(20) + ': ' + (ctas.length > 0 ? ctas.join(', ') : 'NONE'));
});
