# Type-G 建設業者採用LP

地域密着型中堅建設会社向けの採用特化ランディングページテンプレート。

## プロジェクト概要

**クライアント設定**(架空):

- **企業名**: 中部建設株式会社
- **所在地**: 愛知県名古屋市
- **規模**: 従業員60名、年商15億円
- **強み**: 公共工事(学校・病院)が得意な地域密着型ゼネコン

**ターゲット**:

- 高卒新卒 + 20代の異業種転職者
- 保護者(安心感の提供が重要)

**ビジネスゴール**: LINE経由の気軽な相談を月10件獲得

## デザインアーキタイプ

**Construction Professional**

- **カラーパレット**: Navy Deep (#001a3d) × Gold (#c5a059)
- **トーン**: Premium + 権威性を保ちつつ、若干明るく親しみやすく

## セクション構成

Type-Gは全**9セクション**で構成されています:

1. **Header**: ロゴ、ナビゲーション、ハンバーガーメニュー
2. **Hero**: 背景動画スタイル、大型キャッチコピー、LINE CTA
3. **Message**: 代表挨拶(50代男性、温かみ)
4. **Works**: 実績ギャラリー **12枚**(病院、学校、公共施設、インフラ)
5. **Voice**: 社員インタビュー **Q&A形式** 3名
6. **Guardian Message**: **保護者向け専用セクション**(安全管理の見える化)
7. **Environment**: 福利厚生(年間休日110日、残業月平均15時間)
8. **Company**: 会社概要(テーブル形式)
9. **Recruit**: 募集要項
10. **Footer**: 肥大型、サイトマップ + LINE/電話
11. **Sticky LINE CTA**: フローティングボタン(pulse animation)

## Type-Dからの主要な差別化ポイント

1. **Hero**: 背景動画スタイル(type-dはマーキー)、より明るく躍動感のある現場
2. **Voice**: **Q&A形式**に変更(「未経験でも大丈夫?」など不安解消)
3. **Guardian Message**: **新規追加セクション**(保護者の安心獲得)
4. **Works**: **12枚グリッド**(3x4 PC / 2x6 Mobile)で完全対称

## ファイル構造

```
templates/type-g/
├── index.html              # メインHTML
├── style.css               # CSSエントリーポイント
├── script.js               # JavaScript
├── css/
│   ├── variables.css       # デザイントークン(カラー、フォント、スペーシング)
│   ├── base.css            # リセット、グリッド、ユーティリティ
│   ├── components.css      # ボタン、カード、Q&Aカード、テーブル
│   ├── header.css          # ヘッダー、ナビゲーション、ハンバーガーメニュー
│   ├── hero.css            # Hero背景動画スタイル
│   ├── sections.css        # Message, Works, Voice, Environment, Company, Recruit
│   ├── guardian.css        # 保護者向けセクション専用
│   └── footer.css          # フッター、スクロールトップボタン
└── images/
    ├── hero/
    │   └── hero_poster.jpg
    ├── company/
    │   ├── president_portrait.png
    │   └── hq_building.png
    ├── voice/
    │   ├── employee_01_tanaka.png
    │   ├── employee_02_suzuki.png
    │   └── employee_03_yamada.png
    ├── works/
    │   ├── work_hospital_01.jpg ~ 03.jpg
    │   ├── work_school_01.jpg ~ 04.jpg
    │   ├── work_public_01.jpg ~ 03.jpg
    │   └── work_infrastructure_01.jpg ~ 02.jpg
    ├── guardian/
    │   └── safety_meeting.png
    └── environment/
        └── office_interior.png
```

## 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: モジュラー設計、CSS Variables、Flexbox/Grid
- **JavaScript (Vanilla)**: ハンバーガーメニュー、Sticky CTA、IntersectionObserver
- **Google Fonts**: Noto Sans JP

## 主要機能

### インタラクティブ機能

- ハンバーガーメニュー(モバイル、1100px以下)
- Sticky LINE CTA(600px以上スクロールで表示、pulse animation)
- Scroll Reveal Animation(IntersectionObserver)
- スムーススクロール(アンカーリンク)
- Scroll to Top Button

### レスポンシブ設計

- **Mobile**: ~768px
- **Tablet**: 768px~1100px
- **PC**: 1100px+
- Hero動画のモバイル最適化(オーバーレイスタイル)

## 使い方

### ローカル環境で確認

1. `index.html`をブラウザで開く
2. レスポンシブ確認: DevToolsでビューポートを変更

### カスタマイズ

#### カラーパレット変更

`css/variables.css`の`:root`セレクタで色を変更:

```css
:root {
  --navy-deep: #001a3d; /* プライマリー */
  --gold-accent: #c5a059; /* アクセント */
  --line-green: #06c755; /* LINE CTA */
}
```

#### コンテンツ変更

`index.html`の各セクション内のテキスト・画像パスを編集。

#### 画像置き換え

`images/`配下の各画像を同名ファイルで置き換え。

## ビジュアルアセット

全て**AI生成**による制作:

- **ポートレート**: 4枚(代表者、社員3名)
- **施工実績**: 12枚(病院3、学校4、公共施設3、インフラ2)
- **Guardian/Environment**: 4枚(安全朝礼、オフィス内観、本社ビル、Hero Poster)

## ブラウザサポート

- Chrome / Edge(最新版)
- Firefox(最新版)
- Safari(最新版)
- モバイルブラウザ対応

## ライセンス

このテンプレートは、実務案件レベルの完成度を目指した制作物です。

---

**制作**: Type-G Construction Recruitment LP Template  
**バージョン**: 1.0.0  
**制作日**: 2027年
