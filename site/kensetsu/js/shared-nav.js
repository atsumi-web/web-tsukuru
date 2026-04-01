/*!
 * shared-nav.js — 全ページ共通ヘッダーナビゲーション
 * /kensetsu/ を絶対ベースとして、どの階層からでも正しいリンクを生成する
 */
(function () {
  "use strict";

  var nav = document.querySelector("nav.site-nav");
  if (!nav) return;

  // /kensetsu/ を絶対ベースパスとして使用
  // 相対パス計算は階層が変わると壊れるため廃止
  var base = "/kensetsu/";

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
    link(base + "index.html#problem", "課題"),
    link(base + "index.html#solution", "解決策"),
    link(base + "index.html#flow", "流れ"),
    link(base + "design.html", "デザイン"),
    link(base + "service.html", "料金", isService),
    link(base + "index.html#qa", "Q&A"),
    link(base + "blog/index.html", "ブログ", isBlog),
    link(base + "works.html", "実績", isWorks),
    link(
      base + "saiyou-shindan.html",
      '<i class="fa-solid fa-clipboard-check"></i> 無料診断テスト',
      false,
      "nav-btn",
    ),
  ].join("");

  // nav-btn はページ内リンク（別タブ不要）
})();
