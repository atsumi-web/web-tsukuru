// 1日の業務フローセクションのタブ切り替えJavaScript

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".schedule-tab");
  const contents = document.querySelectorAll(".schedule-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetSchedule = this.getAttribute("data-schedule");

      // すべてのタブとコンテンツから active クラスを削除
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      // クリックされたタブとそれに対応するコンテンツに active クラスを追加
      this.classList.add("active");
      document
        .querySelector(`[data-content="${targetSchedule}"]`)
        .classList.add("active");
    });
  });
});
