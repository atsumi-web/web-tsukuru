document.addEventListener('DOMContentLoaded', () => {
    // 1. OGPとFavicon、SEO(noindex)の動的注入
    const head = document.head;
    // data-root-pathを取得（指定がなければカレントディレクトリ './' とする）
    const scriptTag = document.currentScript || document.querySelector('script[src*="shared-nav.js"]');
    const rootPath = scriptTag ? (scriptTag.getAttribute('data-root-path') || './') : './';

    const metaData = `
        <!-- Dynamic Meta & OGP -->
        <link rel="icon" type="image/x-icon" href="${rootPath}images/favicon.ico">
        <meta property="og:title" content="株式会社蒼翔 (SOSHOU) | コーポレート＆採用サイト">
        <meta property="og:description" content="空を創る。街を守る。次世代の鳶職・足場工事プロフェッショナル集団。完全週休二日制、フルハーネス支給。">
        <meta property="og:image" content="https://web-tsukuru.jp/client-work/05_soshou/hp/images/hero_fv.webp">
        <!-- TEST ENVIRONMENT - DO NOT INDEX -->
        <meta name="robots" content="noindex,nofollow">
    `;
    head.insertAdjacentHTML('beforeend', metaData);

    // 2. 共通ヘッダーの生成
    const headerHTML = `
        <header class="global-header" style="position:fixed; top:0; left:0; width:100%; height:80px; background:rgba(11, 25, 44, 0.95); backdrop-filter:blur(8px); padding:0 4%; z-index:1000; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1);">
            <div class="logo">
                <a href="${rootPath}index.html" style="color:#ffffff; font-size:1.8rem; font-weight:700; font-family:var(--font-en); letter-spacing:0.05em;">
                    SOSHOU <span style="font-size:0.8rem; font-family:var(--font-main); color:var(--accent-color); margin-left:8px; display:inline-block; vertical-align:middle;">株式会社 蒼翔</span>
                </a>
            </div>
            <nav class="gnav" style="display:none;"> <!-- Desktop Only class will apply via CSS if needed, inline for simplicity -->
                <ul style="display:flex; list-style:none; gap:32px; color:#ffffff; font-weight:500; font-family:var(--font-en); letter-spacing:0.1em; align-items:center;">
                    <li><a href="${rootPath}about.html" style="position:relative; padding-bottom:4px;">ABOUT</a></li>
                    <li><a href="${rootPath}service/scaffold.html" style="position:relative; padding-bottom:4px;">SERVICE</a></li>
                    <li><a href="${rootPath}recruit.html" style="position:relative; padding-bottom:4px;">RECRUIT</a></li>
                    <li><a href="${rootPath}contact.html" style="background:var(--accent-color); color:var(--primary-color); padding:12px 28px; border-radius:4px; font-weight:700; transition:var(--transition);">ENTRY</a></li>
                </ul>
            </nav>
            <button id="menu-btn" class="sp-only" aria-label="Menu" style="background:none; border:none; color:#fff; font-size:1.8rem; cursor:pointer;"><i class="fa-solid fa-bars"></i></button>
        </header>
        
        <!-- Mobile Menu Overlay -->
        <div id="mobile-menu" class="mobile-menu sp-only">
            <ul>
                <li><a href="${rootPath}about.html">ABOUT</a></li>
                <li><a href="${rootPath}service/scaffold.html">SERVICE</a></li>
                <li><a href="${rootPath}recruit.html">RECRUIT</a></li>
                <li><a href="${rootPath}contact.html" style="color:var(--accent-color);">ENTRY</a></li>
            </ul>
        </div>
    `;
    
    // 3. 共通フッターの生成
    const footerHTML = `
        <footer class="global-footer" style="background:var(--primary-color); color:#ffffff; padding:60px 4% 30px; margin-top:80px; text-align:center;">
            <div style="font-size:2.5rem; font-weight:700; font-family:var(--font-en); letter-spacing:0.1em; color:var(--accent-color); margin-bottom:16px;">SOSHOU</div>
            <p style="font-size:0.95rem; margin-bottom:30px;">株式会社 蒼翔<br>埼玉県さいたま市</p>
            <ul style="display:flex; justify-content:center; gap:24px; list-style:none; margin-bottom:40px; font-size:0.9rem; color:#aaaaaa;">
                <li><a href="${rootPath}about.html">会社概要</a></li>
                <li><a href="${rootPath}service/scaffold.html">事業内容</a></li>
                <li><a href="${rootPath}recruit.html">採用情報</a></li>
                <li><a href="${rootPath}contact.html">お問い合わせ</a></li>
            </ul>
            <div style="font-size:0.8rem; color:#666666; border-top:1px solid rgba(255,255,255,0.1); padding-top:20px;">
                &copy; ${new Date().getFullYear()} SOSHOU CORPORATION. All Rights Reserved.
            </div>
        </footer>
        
        <!-- Back to Top Button -->
        <button id="back-to-top" class="back-to-top" aria-label="Back to Top"><i class="fa-solid fa-angle-up"></i></button>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // デスクトップ用ナビゲーション表示用簡易CSSを動的注入
    const style = document.createElement('style');
    style.innerHTML = `
        @media (min-width: 768px) {
            .gnav { display: block !important; }
        }
    `;
    head.appendChild(style);

    // 4. UI Events Logic (Mobile Menu & Back to Top)
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            menuBtn.innerHTML = mobileMenu.classList.contains('is-active') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });
        
        // メニュー内リンクタップで閉じる
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    const backToTop = document.getElementById('back-to-top');
    if(backToTop) {
        // スクロール検知でボタンの表示・非表示を切り替え
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('is-visible');
            } else {
                backToTop.classList.remove('is-visible');
            }
        });
        
        // スムーススクロールでトップへ
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
