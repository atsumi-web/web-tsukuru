/**
 * Shared Navigation & SEO Injector
 * Corporate Site Architecture - Antigravity Standard
 */
(function() {
  const rootPath = document.currentScript.getAttribute('data-root-path') || './';
  
  // 1. Inject SEO Metadata (noindex protection for test env)
  const head = document.head;
  const metaNoIndex = document.createElement('meta');
  metaNoIndex.name = 'robots';
  metaNoIndex.content = 'noindex,nofollow';
  head.appendChild(metaNoIndex);

  // Favicon
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.href = rootPath + 'images/favicon.ico'; // Placeholder path
  head.appendChild(favicon);

  // 2. Define Components HTML
  const headerHTML = `
<!-- HEADER -->
<header class="hd" id="hd">
  <a href="#" class="logo">
    <div class="logo-ic">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6 L40 26 L8 26 Z" />
        <circle cx="16" cy="38" r="8" />
        <rect x="28" y="30" width="16" height="16" rx="2" />
      </svg>
    </div>
    <div class="logo-text">midorigaoka</div>
  </a>
  <div class="hd-menu" aria-label="メニュー">
    <span></span><span></span><span></span>
  </div>
</header>`;

  const footerHTML = `
<!-- FOOTER -->
<footer>
  <div class="ft-top">
    <div>
      <p class="ft-logo">みどりが丘幼稚園</p>
      <p class="ft-logo-en">MIDORIGAOKA KINDERGARTEN</p>
      <p class="ft-addr">〒000-0000<br>○○県○○市みどりが丘1-2-3<br>TEL: 00-0000-0000<br>受付 平日 8:30〜17:30</p>
    </div>
    <nav class="ft-nav">
      <h4>Navigation</h4>
      <ul>
        <li><a href="#">園について</a></li>
        <li><a href="#">保育の特徴</a></li>
        <li><a href="#">一日の流れ</a></li>
        <li><a href="#">お知らせ</a></li>
        <li><a href="#">採用情報</a></li>
        <li><a href="#">入園のご相談</a></li>
      </ul>
    </nav>
    <nav class="ft-nav">
      <h4>Information</h4>
      <ul>
        <li><a href="#">プライバシーポリシー</a></li>
        <li><a href="#">アクセス</a></li>
        <li><a href="#">よくある質問</a></li>
        <li><a href="#">施設案内</a></li>
      </ul>
    </nav>
  </div>
  <div class="ft-btm">
    <span>©2026 MIDORIGAOKA KINDERGARTEN. ALL RIGHTS RESERVED.</span>
    <span class="ft-cr">Design &amp; Code: <a href="https://web-tsukuru.jp/portfolio_cw">Webとしくみをつくる（渥美絵里）</a></span>
  </div>
</footer>`;

  const ctaHTML = `
<!-- FLOATING CTA -->
<a href="#admission" class="float-cta">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  入園のご相談
</a>`;

  // 3. Inject Components into DOM when parsing allows
  const injectComponents = () => {
    // Insert Header at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    // Insert Footer at the end of body (before scripts usually, or just end of body)
    // For scrollytelling parallax to not cover footer, typically we place footer after main content.
    // Our existing foot is inside body. We append it to body.
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    // Insert CTA
    document.body.insertAdjacentHTML('beforeend', ctaHTML);

    // Re-bind Header Scroll Event since we recreated DOM
    const hd = document.getElementById('hd');
    if (hd) {
      window.addEventListener('scroll', () => hd.classList.toggle('sc', scrollY > 60), {passive:true});
    }

    // Re-bind Mobile Menu Logic if any (currently CSS based hover, but good placeholder)
  };

  // Run injection
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
  } else {
    injectComponents();
  }

})();
