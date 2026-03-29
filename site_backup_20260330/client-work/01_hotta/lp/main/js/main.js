// スクロール時のヘッダー効果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        header.style.backgroundColor = '#ffffff';
    }
});

// ヒーロー画像の読み込み制御
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-bg-image');
    if (heroImage) {
        const img = new Image();
        const bgImage = heroImage.style.backgroundImage;
        const imageUrl = bgImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
        
        if (imageUrl && imageUrl !== 'none') {
            img.src = imageUrl;
            
            img.onload = function() {
                heroImage.style.opacity = '1';
                console.log('ヒーロー画像の読み込み完了');
            };
            
            img.onerror = function() {
                console.log('ヒーロー画像の読み込みに失敗しました');
                // プレースホルダーを表示
                const placeholder = document.querySelector('.hero-image-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'flex';
                }
            };
        }
    }
});

// スクロール誘導
function scrollToContent() {
    const messageSection = document.querySelector('.message');
    if (messageSection) {
        messageSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// フォーム送信（デモ用）
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得（デモ用）
            const formData = new FormData(this);
            const name = formData.get('name');
            
            // デモ用の成功メッセージ
            alert(`ありがとうございます、${name}さん！\nデモンストレーションのため、実際の送信は行われません。\n実際の実装では、ここでフォームデータをサーバーに送信します。`);
            
            // フォームをリセット（デモ用）
            contactForm.reset();
        });
    }
    
    // スムーズスクロール（アンカーリンク用）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // #だけの場合は無視
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});