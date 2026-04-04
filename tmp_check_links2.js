const fs = require('fs');
const files = ['index.html', 'about.html', 'daily.html', 'facilities.html', 'admissions.html', 'contact.html', 'news.html', 'recruit.html'];
files.forEach(f => {
  const path = 'site/client-work/07_youchien/hp/' + f;
  if(fs.existsSync(path)) {
    const html = fs.readFileSync(path, 'utf8');
    const links = [...html.matchAll(/<a[^>]+href=\"([^\"]+)\"[^>]*>/g)];
    if(links.length) {
      console.log('--- ' + f + ' ---');
      links.forEach(l => {
        if(l[1] === '#' || l[1] === 'javascript:void(0);') {
          console.log('UNLINKED: ' + l[0].substring(0, 60));
        }
      });
    }
  }
});
