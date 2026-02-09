# Wireframe Components Library

> **目的:** 採用LP制作用のワイヤーフレーム・コンポーネント集  
> **更新日:** 2026-02-09

---

## 📁 構造

```
wireframe_components/
├── hero/           ← ヒーローセクション（3パターン）
├── about/          ← 会社概要セクション（今後追加予定）
├── features/       ← 特徴・強みセクション（今後追加予定）
├── cta/            ← CTAセクション（今後追加予定）
├── testimonials/   ← 社員インタビュー（今後追加予定）
├── faq/            ← FAQセクション（今後追加予定）
├── footer/         ← フッター（今後追加予定）
└── README.md       ← このファイル
```

---

## 🎯 現在利用可能なコンポーネント

### Hero（ヒーローセクション）

#### pattern06.html - 中央揃えヒーロー

- **用途:** 保守的な建設会社、信頼感重視
- **特徴:** 中央揃え、装飾的な円形エレメント、スクロールインジケーター

#### pattern08.html - 非対称レイアウト

- **用途:** モダン志向の建設会社、若手採用強化
- **特徴:** 非対称グリッド、3つの画像エリア、デュアルCTA

#### pattern09.html - スライダー＋ロゴバー

- **用途:** 実績豊富な企業、大手建設会社
- **特徴:** ヒーロースライダー、クライアントロゴバー、左右ナビゲーション

---

## 🚀 使い方

### 基本的な流れ

1. **プレビュー確認**

   ```
   wireframe_components/hero/ フォルダを開く
   pattern06.html をブラウザで開いて確認
   ```

2. **新規案件で使用**

   ```
   1. web-tsukuru プロジェクトフォルダを複製
   2. 新規案件フォルダ名にリネーム（例：tanaka-construction）
   3. hero/ から適切なパターンを選択
   4. index.html のヒーローセクションに貼り付け
   5. テキスト・画像をカスタマイズ
   ```

3. **カスタマイズ**
   - タイトル・テキストを変更
   - Put!プロンプトで画像生成（Antigravity経由）
   - 企業カラーに調整

---

## 🔧 今後の拡張予定

### 優先度高（次に追加するべき）

- [ ] **CTA セクション** - 固定ボタン、フローティングCTA、複数CTAパターン
- [ ] **Footer セクション** - シンプル版、詳細版、ソーシャルリンク付き

### 優先度中

- [ ] **About / Features セクション** - 会社概要、強み・特徴の見せ方バリエーション
- [ ] **Testimonials セクション** - 社員インタビュー、カード型、リスト型

### 優先度低（必要に応じて）

- [ ] **FAQ セクション** - アコーディオン型、タブ型
- [ ] **Contact Form セクション** - シンプルフォーム、多項目フォーム

---

## 📖 参考リソース

### Put! デザインシステム

- **プロンプト集:** `C:\Users\eri76\.gemini\antigravity\knowledge\recruitment_lp_design_system\artifacts\resources\put_prompts_registry.md`
- **ワイヤーフレーム全パターン:** `C:\Users\eri76\.gemini\antigravity\knowledge\recruitment_lp_design_system\artifacts\resources\put_wireframe_patterns.md`
- **使い方ガイド:** `C:\Users\eri76\.gemini\antigravity\knowledge\recruitment_lp_design_system\artifacts\resources\put_design_system_guide_ja.md`

### LP制作ワークフロー

- **統合ワークフロー:** `C:\Users\eri76\.gemini\antigravity\knowledge\recruitment_lp_design_system\artifacts\resources\lp_production_workflow_integrated.md`

---

## ⚡ クイックリファレンス

**保守的クライアント → pattern06**  
**モダン志向クライアント → pattern08**  
**実績アピール重視 → pattern09**

---

## 🆕 新セクション追加時の手順

1. 該当セクション用フォルダを作成（例：`cta/`）
2. パターンファイルを作成（例：`cta/pattern01.html`）
3. このREADMEを更新（利用可能なコンポーネントに追記）
4. 必要に応じてセクション専用READMEを作成

---

**質問・追加リクエストはAntigravityに相談してください！**
