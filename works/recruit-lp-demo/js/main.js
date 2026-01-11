document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------
    // 1. スクロールアニメーション (Scroll Reveal)
    // ---------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 15%見えたら発火
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 一度出たら監視終了
            }
        });
    }, observerOptions);

    // 監視対象の要素
    const hiddenElements = document.querySelectorAll('.section-title, .section p, .hero-content, .message-box, .schedule-timeline, .faq-item, .company-info, .requirement-list');
    
    // 初期状態で隠すクラスを付与
    hiddenElements.forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });


    // ---------------------------------------------------
    // 2. ヘッダーの追従 & デザイン変化 (Sticky Header)
    // ---------------------------------------------------
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // ---------------------------------------------------
    // 3. スムーススクロール (Smooth Scroll)
    // ---------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // ヘッダーの高さ分ずらす
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

// Interview Accordion Toggle
function toggleInterview(card) {
    // 他のカードを閉じる（オプション：一つだけ開く仕様にする場合）
    const allCards = document.querySelectorAll('.interview-card');
    allCards.forEach(c => {
        if (c !== card) {
            c.classList.remove('active');
        }
    });

    // クリックされたカードの開閉
    card.classList.toggle('active');
}
