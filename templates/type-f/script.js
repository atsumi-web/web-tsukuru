// ======================================
// JavaScript - 整体院LP
// ======================================

document.addEventListener("DOMContentLoaded", function () {
  // ===== モバイルメニュー =====
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      nav.classList.toggle("active");
    });

    // ナビゲーションリンククリック時にメニューを閉じる
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
      });
    });
  }

  // ===== スムーススクロール =====
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // ハッシュリンクの場合のみスムーススクロール
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // ===== スクロールアニメーション =====
  const fadeElements = document.querySelectorAll(".fade-in");

  const checkFade = () => {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // 要素が画面の80%の位置に来たら表示
      if (elementTop < windowHeight * 0.8) {
        element.classList.add("visible");
      }
    });
  };

  // 初回チェック
  checkFade();

  // スクロール時にチェック
  window.addEventListener("scroll", checkFade);

  // ===== ヘッダーのスクロール処理 =====
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // 少しスクロールしたらヘッダーに影を追加
    if (currentScroll > 50) {
      header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.08)";
    }

    lastScroll = currentScroll;
  });

  // ===== フォームバリデーション =====
  const reservationForm = document.querySelector(".reservation-form form");

  if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = this.querySelector('input[name="name"]');
      const phoneInput = this.querySelector('input[name="phone"]');
      const emailInput = this.querySelector('input[name="email"]');

      let isValid = true;

      // 名前のバリデーション
      if (!nameInput.value.trim()) {
        alert("お名前を入力してください。");
        nameInput.focus();
        isValid = false;
        return;
      }

      // 電話番号のバリデーション
      if (!phoneInput.value.trim()) {
        alert("電話番号を入力してください。");
        phoneInput.focus();
        isValid = false;
        return;
      }

      // メールアドレスのバリデーション
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() && !emailPattern.test(emailInput.value)) {
        alert("正しいメールアドレスを入力してください。");
        emailInput.focus();
        isValid = false;
        return;
      }

      if (isValid) {
        alert(
          "お問い合わせありがとうございます。\n確認後、ご連絡させていただきます。",
        );
        this.reset();
      }
    });
  }

  // ===== 電話番号リンク（モバイル対応） =====
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach((link) => {
    // デスクトップでは電話リンクを無効化
    if (window.innerWidth > 768) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const phoneNumber = this.getAttribute("href").replace("tel:", "");
        alert(`お電話でのご予約: ${phoneNumber}`);
      });
    }
  });
});
