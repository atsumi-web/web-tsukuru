const fs = require('fs');
let html = fs.readFileSync('site/client-work/07_youchien/hp/index.html', 'utf8');

// Replace standard links
html = html.replace('<a href=\"#\" class=\"ky-intro-link\">教育理念について', '<a href=\"about.html\" class=\"ky-intro-link\">教育理念について');
html = html.replace('<a href=\"#\" class=\"ky-intro-link\">園の日常を読む', '<a href=\"daily.html\" class=\"ky-intro-link\">園の日常を読む');
html = html.replace('<a href=\"#\" class=\"ky-intro-link\">見学に申し込む', '<a href=\"contact.html\" class=\"ky-intro-link\">見学に申し込む');
html = html.replace('<a href=\"#\" class=\"ky-intro-link\">地域連携について', '<a href=\"design-lab.html\" class=\"ky-intro-link\">地域連携について');
html = html.replace('<a href=\"#\" class=\"ky-intro-link\">もっと見る', '<a href=\"facilities.html\" class=\"ky-intro-link\">もっと見る');
html = html.replace('<a href=\"#\" class=\"ky-intro-link\">見学会の予約へ', '<a href=\"contact.html\" class=\"ky-intro-link\">見学会の予約へ');
html = html.replace('<a href=\"#\" class=\"ky-intro-link\">募集要項を見る', '<a href=\"admissions.html\" class=\"ky-intro-link\">募集要項を見る');

// News toggle link
html = html.replace('<a href=\"javascript:void(0);\" id=\"newsToggleBtn\" class=\"ky-intro-link\">一覧で見る', '<a href=\"news.html\" id=\"newsToggleBtn\" class=\"ky-intro-link\">一覧で見る');

// Replace all news items anchors with news.html
html = html.replace(/<li class=\"ky-news-item\">\s*\n*\s*<a href=\"#\">/g, '<li class=\"ky-news-item\">\n          <a href=\"news.html\">');

fs.writeFileSync('site/client-work/07_youchien/hp/index.html', html, 'utf8');
console.log('Fixed links in index.html');
