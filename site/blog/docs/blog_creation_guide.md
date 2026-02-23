# ブログ記事作成ガイド

## Blog Article Creation Guide

> **場所**: `site/blog/docs/blog_creation_guide.md`  
> **制定**: 2026年2月  
> **管理**: Webとしくみをつくる Agency Ops

---

## 記事作成の基本フロー

```
① テーマ決定
  ↓
② Antigravityに記事HTML作成を依頼
  ↓
③ HTMLを確認・修正
  ↓
④ Antigravityにアイキャッチ画像プロンプトを依頼
  ↓
⑤ Google ImageFXで画像生成 → site/blog/images/ に保存
  ↓
⑥ blog_article_list.html に記事カードを追加
  ↓
⑦ git commit & push
```

---

## ファイル命名規則

| 項目             | 形式                                     | 例                            |
| :--------------- | :--------------------------------------- | :---------------------------- |
| HTMLファイル     | `YYYYMMDD_[テーマ].html`                 | `20260223_lp_cost.html`       |
| アイキャッチ画像 | `blog_article[番号]_[テーマ].webp`       | `blog_article12_lp_cost.webp` |
| 記事番号         | 通し番号（blog_article_list.htmlの順番） | No.12, No.13...               |

---

## Antigravityへの記事作成依頼テンプレート

```
まず以下を読んでください：
site/blog/docs/blog_creation_guide.md
site/blog/posts/template.html

その上で、以下の条件でブログ記事HTMLを作成してください。

記事タイトル：【タイトル】
ファイル名：【YYYYMMDD_テーマ.html】
記事番号：No.【XX】
カテゴリ：【採用LP / Webサイト / SEO / etc.】
アイキャッチ画像ファイル名：blog_article【XX】_【テーマ】.webp
公開日：【YYYY.MM.DD】

記事の方向性：
【どんな悩みを持つ読者に向けて、何を伝える記事か。1〜3文で説明】

SEOキーワード（想定）：
【メインキーワード】, 【サブキーワード】
```

---

## 記事HTML 作成ルール

### 必須チェック項目

| 項目                 | 確認ポイント                                                 |
| :------------------- | :----------------------------------------------------------- |
| **タイトルタグ**     | `【記事タイトル】｜Webとしくみをつくる` の形式               |
| **description**      | 120文字程度・記事の要約                                      |
| **OGP画像URL**       | `https://web-tsukuru.jp/blog/images/【画像ファイル名】.webp` |
| **アイキャッチ画像** | `../images/【ファイル名】.webp` でパスが通っているか         |
| **H1**               | 記事タイトルと一致しているか                                 |
| **日付**             | `datetime="YYYY-MM-DD"` の形式で記述                         |
| **CTAボックス**      | 記事末尾に必ず設置（LINE無料相談）                           |
| **著者名**           | 渥美 絵里                                                    |

### 文章スタイルガイド

- **読者**: 建設業・工務店の採用担当者・経営者（30〜50代男性が多い）
- **トーン**: 親しみやすく、専門知識があり、信頼できるパートナー感
- **長さ**: 本文1,500〜2,500文字程度
- **構成**: 導入（課題提示）→ 解説 → まとめ → CTA

---

## アイキャッチ画像 依頼テンプレート

```
まず以下を読んでください：
site/blog/docs/eyecatch_style_guide.md

その上で、site/blog/posts/【ファイル名】.html 用のアイキャッチ画像の
生成プロンプト（英語）を作って。
保存先ファイル名は blog_article【番号】_【テーマ】.webp とする。
記事のテーマ：【一言で内容を説明】
```

> 生成ツール: **Google ImageFX**（https://labs.google/fx/）  
> アスペクト比: Landscape 16:9

---

## blog_article_list.html への追加

記事カードのHTMLパターン：

```html
<div class="blog-card">
  <a href="posts/【ファイル名】.html">
    <img
      src="images/blog_article【番号】_【テーマ】.webp"
      alt="【記事タイトル】"
      class="blog-card-img"
    />
    <div class="blog-card-body">
      <span class="blog-card-category">【カテゴリ】</span>
      <h2 class="blog-card-title">【記事タイトル】</h2>
      <p class="blog-card-date">【YYYY.MM.DD】</p>
    </div>
  </a>
</div>
```

---

## 関連ドキュメント

| ドキュメント                                         | 内容                             |
| :--------------------------------------------------- | :------------------------------- |
| [eyecatch_style_guide.md](./eyecatch_style_guide.md) | アイキャッチ画像スタイル・NG事例 |
| [blog_seo_strategy.md](./blog_seo_strategy.md)       | SEO戦略・キーワード方針          |
| [blog_article_list.html](./blog_article_list.html)   | 記事一覧・管理画面               |
| [template.html](../posts/template.html)              | 記事HTMLテンプレート             |

---

**制定**: 2026年2月  
**管理者**: Webとしくみをつくる Agency Ops
