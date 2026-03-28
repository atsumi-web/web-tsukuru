/**
 * DR.PEDAL CORPORATE SITE - SHARED NAVIGATION & UTILITIES
 * Description: ヘッダー、フッターの共通パーツを動的に挿入。
 *              スクロール検知やスクロールアニメーション(reveal)のロジックを管理。
 */

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  initInteractions();
});

// BASE_URL for resolving absolute paths during local dev or production
// Since it's inside `04_drpedal/hp/`, we assume root relative paths if deployed statically.
// Using relative traversal based on current location to ensure local viewing works.
const getBaseUrl = () => {
  const depth = document.location.pathname.split('/').length - document.location.pathname.indexOf('hp/') - 2;
  // This calculates relative up directories, but for simplicity we rely on standard absolute paths if deployed, 
  // or simple relative paths from the current file URL.
  // We will pass the relative prefix (e.g., './' or '../') to the render tools.
  return '.';
};

// ヘッダー要素の注入
function renderHeader() {
  const headerContainer = document.getElementById('shared-header');
  if (!headerContainer) return;

  // URLに合わせてパスを決定（トップページなら './'、下層なら '../'）
  const isSubPage = document.location.pathname.includes('/service/') || document.location.pathname.includes('/about.html') || document.location.pathname.includes('/recruit.html');
  const rp = headerContainer.getAttribute('data-root-path') || './';

  // ページ個別のテーマ（透過・ダークなど）
  const headerTheme = headerContainer.getAttribute('data-theme') || 'theme-white'; 

  const html = `
    <header class="l-header ${headerTheme}" id="js-header">
      <a href="${rp}index.html" class="l-header-logo">
        <img src="${rp}images/logo-mark.webp" alt="Dr.Pedal Logo" class="logo-img">
        <span class="logo-text">DR<span style="color:var(--gold);">.</span>PEDAL</span>
      </a>
      
      <nav class="l-nav">
        <a href="${rp}about.html" class="l-nav-item">About</a>
        <a href="${rp}company.html" class="l-nav-item">Company</a>
        <a href="${rp}service/index.html" class="l-nav-item">Services</a>
        <a href="${rp}index.html#news" class="l-nav-item">News</a>
        <a href="${rp}contact.html" class="l-nav-item">Contact</a>
        <a href="${rp}recruit.html" class="l-header-cta">採用情報</a>
      </nav>

      <!-- Mobile Trigger -->
      <button class="menu-trigger" id="js-menu-trigger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>

      <!-- Mobile Menu -->
      <div class="mobile-menu" id="js-mobile-menu">
        <ul>
          <li><a href="${rp}about.html">About</a></li>
          <li><a href="${rp}company.html">Company</a></li>
          <li><a href="${rp}service/index.html">Services</a></li>
          <li><a href="${rp}index.html#news">News</a></li>
          <li><a href="${rp}contact.html">Contact</a></li>
          <li><a href="${rp}recruit.html" class="l-header-cta">採用情報</a></li>
        </ul>
      </div>
    </header>
  `;
  headerContainer.innerHTML = html;
}

// フッター要素の注入
function renderFooter() {
  const footerContainer = document.getElementById('shared-footer');
  if (!footerContainer) return;

  const rp = footerContainer.getAttribute('data-root-path') || './';

  const html = `
    <footer class="l-footer">
      <div class="container">
        <div class="l-footer-inner">
          
          <!-- Column 1: Company -->
          <div class="f-col">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:24px;">
              <img src="${rp}images/logo-mark.webp" alt="Dr.Pedal Logo" class="f-logo-img">
              <p class="f-company-name" style="margin-bottom:0;">株式会社ドクターペダル</p>
            </div>
            <p class="f-address">
              東京本社 東京都品川区東五反田2-8-5<br><br>
              目黒オフィス 東京都目黒区下目黒3-10-36<br><br>
              沖縄オフィス 沖縄県那覇市三原3-18-22
            </p>
          </div>

          <!-- Column 2: Service -->
          <div class="f-col">
            <h4 class="f-title">Service</h4>
            <ul class="f-list">
              <li><a href="${rp}service/b2b-rental.html">自治体および法人向けレンタサイクル総合支援</a></li>
              <li><a href="${rp}service/b2b-repair.html">自治体および法人向けモビリティ修理支援</a></li>
              <li><a href="${rp}service/maintenance.html">モビリティ運用・保守支援</a></li>
              <li><a href="${rp}service/b2c-repair.html">個人向け修理支援</a></li>
              <li><a href="${rp}service/tourism.html">レンタサイクルサービス</a></li>
              <li><a href="${rp}service/b2b-repair.html">モビリティ販売支援</a></li>
            </ul>
          </div>

          <!-- Column 3: Navigation -->
          <div class="f-col">
            <h4 class="f-title">Navigation</h4>
            <ul class="f-list">
              <li><a href="${rp}about.html">About</a></li>
              <li><a href="${rp}index.html#news">News</a></li>
              <li><a href="${rp}recruit.html">Recruit</a></li>
              <li><a href="${rp}contact.html">Contact</a></li>
            </ul>
          </div>

          <!-- Column 4: SNS -->
          <div class="f-col">
            <div class="f-sns">
              <!-- FontAwesome requires loading externally, assuming it's loaded in HTML -->
              <a href="https://lin.ee/YHLOdUr" target="_blank" class="f-sns-link" aria-label="LINE"><i class="fa-brands fa-line"></i></a>
              <a href="https://www.instagram.com/drpedal07" target="_blank" class="f-sns-link" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://youtu.be/K2n7ZXvx6_w" target="_blank" class="f-sns-link" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
            </div>
          </div>
        </div>
        
        <p class="f-bottom">Dr.Pedal Inc. All Rights Reserved.</p>
      </div>

      <!-- Page Top -->
      <button class="btn-pagetop" id="js-pagetop" aria-label="Page Top">
        <i class="fa-solid fa-chevron-up"></i>
      </button>
    </footer>
  `;
  footerContainer.innerHTML = html;

  // Add FontAwesome via JS if not present
  if (!document.querySelector('link[href*="fontawesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }
}

// インタラクション初期化（ヘッダースクロール、モバイルメニューなど）
function initInteractions() {
  const header = document.getElementById('js-header');
  const pagetop = document.getElementById('js-pagetop');
  const trigger = document.getElementById('js-menu-trigger');
  const mobileMenu = document.getElementById('js-mobile-menu');

  // Scroll events
  window.addEventListener('scroll', () => {
    // Header effect
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    // Pagetop effect
    if (pagetop) {
      if (window.scrollY > 300) {
        pagetop.classList.add('is-visible');
      } else {
        pagetop.classList.remove('is-visible');
      }
    }
  });

  // Mobile Menu Toggle
  if (trigger && mobileMenu) {
    trigger.addEventListener('click', () => {
      trigger.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-active');
      document.body.style.overflow = trigger.classList.contains('is-active') ? 'hidden' : '';
    });
  }

  // Pagetop scroll
  if (pagetop) {
    pagetop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll Reveals (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px"
    });

    revealElements.forEach(el => {
      observer.observe(el);
    });
  }
}
