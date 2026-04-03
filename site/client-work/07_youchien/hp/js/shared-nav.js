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
<!-- HEADER BASE (GREEN LOGO) -->
<header class="hd hd-base" id="hd-base">
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
  <div class="hd-menu hd-menu-base" aria-label="メニュー">
    <span></span><span></span><span></span>
  </div>
</header>

<!-- HEADER LAYER (WHITE LOGO DYNAMIC CLIP) -->
<div id="hd-white-layer" style="position: fixed; inset: 0; pointer-events: none; z-index: 1000; clip-path: inset(100% 0 0 0);">
  <header class="hd" style="background: transparent;">
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
  </header>
</div>`;

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
        <li><a href="about.html">教育理念</a></li>
        <li><a href="daily.html">園の1日</a></li>
        <li><a href="admissions.html">入園のご案内</a></li>
        <li><a href="news.html">お知らせ</a></li>
        <li><a href="#">採用情報</a></li>
        <li><a href="contact.html">入園のご相談</a></li>
      </ul>
    </nav>
    <nav class="ft-nav">
      <h4>Information</h4>
      <ul>
        <li><a href="#">プライバシーポリシー</a></li>
        <li><a href="facilities.html">アクセス</a></li>
        <li><a href="admissions.html">よくある質問</a></li>
        <li><a href="facilities.html">施設案内</a></li>
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
<a href="admissions.html" class="float-cta">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  入園のご案内
</a>`;

  const menuOverlayHTML = `
<!-- MENU OVERLAY -->
<div class="menu-overlay" id="menuOverlay">
  <div class="menu-backdrop" id="menuBackdrop"></div>
  <div class="menu-panel">
    <div class="menu-border"></div>
    <div class="menu-close-btn" id="menuCloseBtn">
      <div class="mcb-lines"></div>
      <span>CLOSE</span>
    </div>
    
    <div class="menu-cols">
      <!-- CONTENTS Column -->
      <div class="menu-col menu-col-left">
        <h3 class="mc-ttl">CONTENTS</h3>
        <ul class="mc-list" style="margin-left: 0;">
          <li><a href="about.html">教育理念</a></li>
          <li><a href="daily.html">園の1日</a></li>
          <li><a href="facilities.html">施設と環境</a></li>
          <li><a href="news.html">お知らせ</a></li>
          <li><a href="admissions.html">入園のご案内</a></li>
          <li style="margin-top:24px; padding-top:16px; border-top:1px solid rgba(255,255,255,0.08);"><a href="recruit.html">採用について</a></li>
          <li><a href="contact.html">お問い合わせ</a></li>
        </ul>
      </div>
      
      <!-- SPECIAL Column -->
      <div class="menu-col menu-col-right">
        <h3 class="mc-ttl">SPECIAL</h3>
        <div class="mc-cards">
          <a href="daily.html" class="mc-card">
            <div class="mc-img"><img src="${rootPath}images/kindy_daily_hero.png" alt="" onerror="this.src='${rootPath}images/Whisk_20ac29d5b0e0fdb91b7418daa9ea11d7dr.jpeg'"></div>
            <div class="mc-info">
              <h4 class="serif-title">A Piece of Nature.</h4>
              <p>園の１日を見る</p>
            </div>
            <div class="mc-dot"></div>
          </a>
          <a href="recruit.html" class="mc-card arch">
            <div class="mc-img"><img src="${rootPath}images/kindy_magazine_hero.png" alt="" onerror="this.src='${rootPath}images/Whisk_c6b2f51fd8054c9b34f428aa04eeeddfdr.jpeg'"></div>
            <div class="mc-info">
              <h4>はぐくみ</h4>
              <p>想いを紡ぐしごと。</p>
            </div>
            <div class="mc-dot"></div>
          </a>
        </div>
        <a href="contact.html" class="mc-btn"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>お問い合わせ<span class="mc-btn-dot"></span></a>
      </div>
    </div>
  </div>
</div>`;

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
    // Insert Menu Overlay
    document.body.insertAdjacentHTML('beforeend', menuOverlayHTML);

    // -- Left Vertical Nav Indicator (Kiyasuku Style) --
    let pageName = document.title.split('|')[0].trim();
    if(pageName === 'みどりが丘幼稚園' || pageName === 'ホーム') pageName = 'トップページ';
    const leftNavHTML = `<div class="left-vert-nav"><span>${pageName}</span></div>`;
    document.body.insertAdjacentHTML('beforeend', leftNavHTML);

    // Re-bind Header Scroll Event since we recreated DOM
    const hd = document.getElementById('hd');
    if (hd) {
      window.addEventListener('scroll', () => hd.classList.toggle('sc', scrollY > 60), {passive:true});
    }

    // Initialize Menu Logic
    const hdMenuBtn = document.querySelector('.hd-menu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    const menuBackdrop = document.getElementById('menuBackdrop');

    if (hdMenuBtn && menuOverlay && menuCloseBtn && menuBackdrop) {
      const openMenu = () => menuOverlay.classList.add('show');
      const closeMenu = () => menuOverlay.classList.remove('show');
      
      hdMenuBtn.addEventListener('click', openMenu);
      menuCloseBtn.addEventListener('click', closeMenu);
      menuBackdrop.addEventListener('click', closeMenu);
    }
    
    // Dynamic Logo Masking Logic (Green/White Split)
    // Dark sections that require a white logo:
    const darkSections = document.querySelectorAll('.scrolly, .cta-sec, footer');
    const whiteLayer = document.getElementById('hd-white-layer');

    if (whiteLayer && darkSections.length > 0) {
      const updateLogoClip = () => {
        let activeDarkRect = null;
        const windowHeight = window.innerHeight;
        
        for(let sec of darkSections) {
          const rect = sec.getBoundingClientRect();
          // Check if dark section overlaps top screen area (0 ~ 150px)
          if(rect.top < 150 && rect.bottom > 0) {
            activeDarkRect = rect;
            break;
          }
        }
        
        if(activeDarkRect) {
          let clipTop = Math.max(0, activeDarkRect.top);
          let clipBottom = Math.max(0, windowHeight - activeDarkRect.bottom);
          whiteLayer.style.clipPath = `inset(${clipTop}px 0 ${clipBottom}px 0)`;
        } else {
          whiteLayer.style.clipPath = `inset(100% 0 0 0)`; // Hide completely
        }
      };

      window.addEventListener('scroll', updateLogoClip, {passive: true});
      window.addEventListener('resize', updateLogoClip);
      updateLogoClip();
    }
  };

  // Run injection
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
  } else {
    injectComponents();
  }

  // 4. Global Animation Observer (.fu -> .vis fade up)
  const initAnimationObserver = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('vis');
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });

    document.querySelectorAll('.fu').forEach(el => observer.observe(el));
  };
  
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimationObserver);
  } else {
    initAnimationObserver();
  }

})();
