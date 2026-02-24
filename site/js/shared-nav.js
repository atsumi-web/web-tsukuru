/*!
 * shared-nav.js — 全ページ共通ヘッダーナビゲーション
 * ページの階層深さからルートパスを自動計算し、常に正しいリンクを生成する
 */
(function () {
  "use strict";

  var nav = document.querySelector("nav.site-nav");
  if (!nav) return;

  // pathname の深さからルートパスを算出
  // 例: /index.html → depth=1 → root='./'
  //     /blog/index.html → depth=2 → root='../'
  //     /blog/posts/xxx.html → depth=3 → root='../../'
  var pathname = window.location.pathname;
  if (pathname.endsWith("/")) pathname += "index.html";
  var depth = pathname.split("/").filter(Boolean).length;
  var root = depth <= 1 ? "./" : new Array(depth).join("../");


  // アクティブページ判定
  var p = window.location.pathname;
  var isBlog = p.indexOf("/blog/") !== -1;
  var isService = p.indexOf("/service") !== -1;
  var isWorks = p.indexOf("/works") !== -1;

  function link(href, label, active, cls) {
    var classAttr = cls
      ? ' class="' + cls + '"'
      : active
        ? ' class="active"'
        : "";
    return '<a href="' + href + '"' + classAttr + ">" + label + "</a>";
  }

  nav.innerHTML = [
    link(root + "index.html#problem", "課題"),
    link(root + "index.html#solution", "解決策"),
    link(root + "index.html#flow", "流れ"),
    link(root + "index.html#works", "デザイン"),
    link(root + "service.html", "料金", isService),
    link(root + "index.html#qa", "Q&A"),
    link(root + "blog/index.html", "ブログ", isBlog),
    link(root + "works.html", "実績", isWorks),
    link(
      "https://lin.ee/nMDNiFg",
      '<i class="fa-brands fa-line"></i> 無料相談',
      false,
      "nav-btn",
    ),
  ].join("");

  // LINE リンクは別タブで開く
  var lineBtn = nav.querySelector(".nav-btn");
  if (lineBtn) lineBtn.setAttribute("target", "_blank");
})();
