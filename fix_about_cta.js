const fs = require('fs');

let html = fs.readFileSync('site/client-work/07_youchien/hp/about.html', 'utf8');
const lines = html.split('\n');

const startIndex = lines.findIndex(l => l.includes('<!-- BLOCK 8: Bottom CTA (Organic Blob Frame) -->'));
const endIndex = lines.findIndex(l => l.includes('<!-- Video Modal -->'));

const replaceHtml = `
<!-- SPLIT SCREEN CTA -->
<section class="mz-next-split">
  <a href="daily.html" class="mz-ns-link fu">
    <div class="mz-ns-bg"><img src="images/kindy_daily_hero.png" alt="園の1日"></div>
    <div class="mz-ns-tx">
      <span class="mz-ns-en">A Day in the Life</span>
      <h3 class="mz-ns-ja">園の1日を見る</h3>
    </div>
  </a>
  <a href="admissions.html" class="mz-ns-link fu" data-d="1">
    <div class="mz-ns-bg"><img src="images/kindy_adm_sticky.png" alt="入園のご案内"></div>
    <div class="mz-ns-tx">
      <span class="mz-ns-en">Admissions</span>
      <h3 class="mz-ns-ja">入園のご案内</h3>
    </div>
  </a>
</section>

<script>
// SCROLLY HERO
const scrolly  = document.getElementById('scrolly');
const sVert    = document.getElementById('sVert');
const phHeroImg = document.getElementById('phHeroImg');

function updateScrolly() {
  if (!scrolly || !sVert) return;
  const top  = scrolly.getBoundingClientRect().top;
  const totH = scrolly.offsetHeight - window.innerHeight;
  const prog = Math.max(0, Math.min(1, -top / totH));

  // Parallax
  if (phHeroImg) {
    const scale = 1 + (prog * 0.15); // Slight zoom
    phHeroImg.style.transform = \`scale(\${scale})\`;
  }

  // Fade title out early
  const vertUp = Math.min(1, prog / 0.5);
  sVert.style.transform = \`translateY(-\${vertUp * 30}vh)\`;
  sVert.style.opacity = 1 - vertUp;
}
window.addEventListener('scroll', updateScrolly, {passive:true});
updateScrolly();

// Scroll reveal
const obs = new IntersectionObserver(es => {
  es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('vis'); obs.unobserve(e.target); }});
}, {threshold:.1});
document.querySelectorAll('.fu').forEach(el => obs.observe(el));
</script>
`;

if (startIndex !== -1 && endIndex !== -1) {
  // We want to replace from startIndex all the way to `</body>` minus 1 line.
  // Wait, let's just find the exact slice. The `endIndex` is `<!-- Video Modal -->`.
  // Wait, in about.html the script was already there?
  // No, in my previous edit, I ACCIDENTALLY OVERWROTE the parallax script with the CTA block from index.html!
  // Let me completely replace everything from `<!-- BLOCK 8: Bottom CTA` to the end of the `html` string!
  
  html = html.slice(0, html.indexOf('<!-- BLOCK 8: Bottom CTA'));
  html += replaceHtml;
  html += '</body>\n</html>\n';
  fs.writeFileSync('site/client-work/07_youchien/hp/about.html', html);
  console.log('Fixed about.html CTA');
}
