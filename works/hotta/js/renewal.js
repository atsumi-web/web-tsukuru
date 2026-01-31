/**
 * renewal.js
 *
 * 統合されたJavaScriptファイル
 * - モバイルメニューのトグル制御
 * - スムーズスクロール
 * - フローティングCTAの表示制御
 * - トップへ戻るボタンの制御
 */

document.addEventListener("DOMContentLoaded", function () {
  /* ============================================
     1. Mobile Menu Toggle
     ============================================ */
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".header-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      nav.classList.toggle("active");
      document.body.classList.toggle("menu-open"); // メニュー展開時にbodyへクラス付与
    });

    // リンククリック時に閉じる
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
        document.body.classList.remove("menu-open"); // メニューを閉じたらクラス削除
      });
    });
  }

  /* ============================================
     2. Smooth Scroll
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return; // 空リンクは無視

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 90, // ヘッダー分少し余白
          behavior: "smooth",
        });
      }
    });
  });

  /* ============================================
     3. Floating CTA Visibility
     ============================================ */
  const floatingCta = document.querySelector(".floating-line-cta");
  if (floatingCta) {
    window.addEventListener(
      "scroll",
      () => {
        // 600px以上スクロールしたら表示
        if (window.scrollY > 600) {
          floatingCta.classList.add("visible");
        } else {
          floatingCta.classList.remove("visible");
        }
      },
      { passive: true },
    );
  }

  /* ============================================
     4. Scroll to Top Button
     ============================================ */
  const scrollTopBtn = document.querySelector(".scroll-top");

  if (scrollTopBtn) {
    // 表示/非表示の切り替え
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 300) {
          scrollTopBtn.classList.add("visible");
        } else {
          scrollTopBtn.classList.remove("visible");
        }
      },
      { passive: true },
    );

    // クリック時の動作
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // LINEボタンとの重なり防止制御
    if (floatingCta) {
      const checkCtaVisibility = () => {
        if (floatingCta.classList.contains("visible")) {
          scrollTopBtn.classList.add("adjust-for-cta");
        } else {
          scrollTopBtn.classList.remove("adjust-for-cta");
        }
      };

      // スクロール時に都度チェック
      window.addEventListener("scroll", checkCtaVisibility, {
        passive: true,
      });
    }
  }
});
