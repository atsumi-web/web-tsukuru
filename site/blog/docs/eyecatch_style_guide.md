# Blog Eyecatch Style Guide

## ブログ アイキャッチ画像 スタイルガイド

> **場所**: `site/blog/docs/eyecatch_style_guide.md`  
> **制定**: 2026年2月  
> **管理**: Webとしくみをつくる Agency Ops

---

## コア哲学: 信頼のためのリアリズムと一貫性

B2BおよびリクルートIG分野（特に建設業界）では、「Generic AIっぽい画像」（過剰彩度・プラスチックのような肌・完璧すぎる照明）は信頼を損なう。  
ブランド「Webとしくみをつくる」に沿い、すべてのビジュアルアセットは**「信頼のビジュアル階層」**に従う。

---

## ビジュアル階層（優先度順）

|   レベル    | 種類                                        | 内容                                                                                  | 効果                                                 |
| :---------: | :------------------------------------------ | :------------------------------------------------------------------------------------ | :--------------------------------------------------- |
| **Level 1** | 本物の写真（高信頼）                        | 渥美さんの写真、実際の工事現場、作業のスクリーンショット                              | 最高レベルの人間的つながりと職業的証明               |
| **Level 2** | ターゲット特化イラスト（温かみ＆一貫性）    | 手描き/フラットデザイン、ウォームカラーパレット（ネイビー・ベージュ・ソフトオレンジ） | 統一されたブランド感、AIの「不気味の谷」を回避       |
| **Level 3** | \"No-AI Look\"リアルAI写真（橋渡し/実験的） | 「ドキュメンタリー写真」プロンプト使用のAI生成画像                                    | プロフェッショナルだが「人工的」と見られるリスクあり |

---

## イラストビジュアル基準（「温かみと明快さ」ルール）

1. **フラットデザイン/縁取りなし（no outlines）**: シェイプのみで構成し、アウトラインを使わない。塗り面だけでキャラクターや要素を表現する
2. **ウォームカラーパレット**: ネイビー・ゴールド・ソフトトーンを一貫して使用しブランド認知を高める
3. **親しみやすい被写体**: フレンドリーかつプロフェッショナルな印象のキャラクター（エージェンシーの「パートナー」ポジションを反映）
4. **人物×シーン構成**: 抽象的なアイコンではなく「人物が状況に置かれたシーン」で表現する（例：「悩む社長と請求書」「歓迎される新入社員」）

---

## 背景色ガイドライン

| 背景色         | 使用場面                             | 印象             |
| :------------- | :----------------------------------- | :--------------- |
| **白（基本）** | ほとんどの記事                       | クリーン・信頼感 |
| **クリーム**   | ブランディング・プレミアム感の記事   | 温かみ・高級感   |
| **薄ピンク**   | 成功事例・ポジティブな結果の記事     | 親しみやすさ     |
| **ネイビー**   | 警告・問題提起系の記事（慎重に使用） | 緊張感・強調     |

> ⚠️ 「warm white」「cream」はAIがピンクに解釈しやすい。白は `clean white background`、クリームは `soft cream background` と明示する。

---

## NG事例（プロンプトに書いてはいけないこと）

| NG表現                                       | 問題                                       | 代替方法                                                   |
| :------------------------------------------- | :----------------------------------------- | :--------------------------------------------------------- |
| `Japanese` と人物に付ける                    | 中国語・漢字が画像内に出やすい             | 国籍指定なし。服装・小道具で業界感を表現する               |
| スマホ・PC画面の内容を詳しく書く             | 画面内にテキストや漢字が出る               | `glowing gold icon floats beside` など抽象的な表現に留める |
| `warm white background` / `cream background` | AIがピンクに解釈する                       | `clean white background` / `soft cream background` と明示  |
| デスクシーンで `wearing a hard hat`          | 現実的でない不自然なシーン                 | デスクなら作業服・設計図・工事書類で業界感を出す           |
| 解像度を `1200x630px` とプロンプトに書く     | 数字が画像内に文字として出力される         | 解像度はImageFXのUI側で設定（Landscape 16:9）              |
| `young` だけで年齢を指定する                 | 子供っぽいキャラクターになりやすい         | `a young man in his 20s` など具体的に指定                  |
| `hard hat`（色指定なし）                     | 黄色いヘルメットになり外国の現場っぽくなる | `white hard hat` と明示（日本の建設現場は白が一般的）      |

---

## プロンプト構成テンプレート（英語）

```
Flat illustration, no outlines, filled color shapes only, simple minimal forms, realistic adult proportions.
[人物の描写（属性・表情・動作）].
[シーンの描写（何が起きているか・小道具・周辺要素）].
Warm color palette: navy blue, gold accents, soft tones.
[背景色指定（clean white / soft cream / soft pale pink など）].
No text, no numbers, no letters, no Chinese characters, no writing of any kind in the image.
```

**良いプロンプトの例：**

```
Flat illustration, no outlines, filled color shapes only, simple minimal forms, realistic adult proportions.
A worried construction company owner staring at an old, dusty computer monitor showing an outdated website. A gold warning triangle icon floats above the scene.
Warm color palette: navy blue, gold accents, soft tones.
Clean white background. No text, no letters, no Chinese characters, no writing of any kind in the image.
```

---

## 技術ワークフロー

### 1. プロンプト生成（Antigravity の役割）

- Antigravityは**画像生成は行わない**。記事内容に合った**画像生成プロンプトを英語で用意する**
- 生成ツール: **Google ImageFX**（https://labs.google/fx/）
- プロンプトはこのスタイルガイドのビジュアル基準に忠実に作成する
- **ビジュアルの差別化**: 投稿ごとに必ずユニークなビジュアルテーマを設定する（同じ構図・同じ小道具を使い回さない）

### 2. 後処理・最適化（標準プロトコル）

| 項目             | 基準                                                                              |
| :--------------- | :-------------------------------------------------------------------------------- |
| **フォーマット** | PNG（AI生成）→ **WebP**（本番）                                                   |
| **推奨解像度**   | **1200×630px**（アスペクト比 1.91:1）※OGP/SNSプレビュー対応                       |
| **柔軟性**       | サイズ厳密指定ではない。品質とリアリズムを優先                                    |
| **CSS対応**      | `.blog-card-img` に `aspect-ratio: 16/9` + `object-fit: cover` でグリッド崩れ防止 |
| **圧縮率**       | WebP 75〜85%品質 / 目安 50〜80KB                                                  |

> ⚠️ プロンプト内に `1200x630px` など数値を含めると画像に文字として出力される場合がある。解像度・アスペクト比はImageFXのUIサイドパネルで設定すること（推奨: Landscape 16:9）。

### 3. ファイル命名規則

| バッチ                             | 命名形式                           | 例                                   |
| :--------------------------------- | :--------------------------------- | :----------------------------------- |
| **2026年2月第1バッチ (No.01〜11)** | `blog_illust_[テーマ].png/webp`    | `blog_illust_team_1769998623467.png` |
| **2026年2月第2バッチ (No.12〜21)** | `blog_article[番号]_[テーマ].webp` | `blog_article12_lp_cost.webp`        |

### 4. ローカライゼーション（Alt テキスト）

SEOのため、シーンを正確に説明するAltテキストを設定する

**例**: `求人広告の請求書を見て悩む建設会社の社長`

---

## 生成済みアセット一覧

### 第1バッチ（2026年2月）

| 対象記事             | 画像ID                     | スタイル | ビジュアル説明                 | パス                                                |
| :------------------- | :------------------------- | :------- | :----------------------------- | :-------------------------------------------------- |
| 01（広告費）         | `blog_illust_ad_budget`    | イラスト | 請求書を前に悩む社長           | `images/blog_illust_ad_budget_1769998607992.png`    |
| 02（3要素）          | `blog_illust_web_design`   | イラスト | ラップトップとワイヤーフレーム | `images/blog_illust_web_design_1769998636709.png`   |
| 03（定着率）         | `blog_illust_team`         | イラスト | 現場で談笑する作業員           | `images/blog_illust_team_1769998623467.png`         |
| 04（WebP技術）       | `blog_illust_optimization` | イラスト | Before/After最適化画面         | `images/blog_illust_optimization_1769998652761.png` |
| 05（専門化）         | `blog_illust_designer`     | イラスト | 作業に集中する女性デザイナー   | `images/blog_illust_designer_1769998669815.png`     |
| 08（モバイル最適化） | `blog_mobile_optimization` | イラスト | 最適化UIのスマートフォン       | `images/blog_mobile_optimization.webp`              |

### 第2バッチ（2026年2月）プロンプト準備済み

| 対象記事               | 保存ファイル名                      | 背景色   |
| :--------------------- | :---------------------------------- | :------- |
| 12（LP費用）           | `blog_article12_lp_cost.webp`       | 白       |
| 13（HP必要性）         | `blog_article13_hp_needed.webp`     | 白       |
| 14（求人票限界）       | `blog_article14_job_ad_limit.webp`  | 白       |
| 15（致命的ミス）       | `blog_article15_fatal_mistake.webp` | 白       |
| 16（事例）             | `blog_article16_case_study.webp`    | 薄ピンク |
| 17（求人ライティング） | `blog_article17_job_writing.webp`   | 白       |
| 18（LINE活用）         | `blog_article18_line_tips.webp`     | 白       |
| 19（ブランディング）   | `blog_article19_branding.webp`      | クリーム |
| 20（サイトvsLP）       | `blog_article20_site_vs_lp.webp`    | 白       |
| 21（定着率）           | `blog_article21_retention.webp`     | 白       |

> プロンプト詳細: `site/blog/docs/eyecatch_prompts.md` を参照

---

## Antigravityへのプロンプト依頼テンプレート

```
まず以下を読んでください：
site/blog/docs/eyecatch_style_guide.md

その上で、site/blog/posts/[ファイル名].html 用のアイキャッチ画像の
生成プロンプト（英語）を作って。
保存先ファイル名は blog_article[番号]_[テーマ].webp とする。
記事のテーマ：[一言で内容を説明]（例：採用LP費用・LINE活用・入社定着率）
```

> プロンプトはGoogle ImageFX（https://labs.google/fx/）にコピペして使用。アスペクト比はUI側でLandscape 16:9を選択する。

---

**制定**: 2026年2月  
**管理者**: Webとしくみをつくる Agency Ops
