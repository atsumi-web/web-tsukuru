# Antigravity開発環境メモ

## 環境情報

- OS: Windows 11
- シェル: PowerShell
- 文字エンコーディング: UTF-8 (chcp 65001設定済み)
- プロジェクトパス: C:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru

## PowerShellコマンドルール

### ❌ 使用禁止コマンド → ✅ 使用すべきコマンド

| 使えないコマンド | 代わりに使うコマンド                               | 用途           |
| ---------------- | -------------------------------------------------- | -------------- |
| `grep`           | `Select-String -Path "パス" -Pattern "検索文字列"` | ファイル内検索 |
| `ls -la`         | `Get-ChildItem -Recurse`                           | ファイル一覧   |
| `find`           | `Get-ChildItem -Recurse -Filter "*.css"`           | ファイル検索   |

### コマンド例

```powershell
# ファイル内でクラス名を検索
Select-String -Path "css\*.css" -Pattern "bubble-construction"

# CSSファイル一覧を表示
Get-ChildItem -Path css -Filter "*.css"

# 特定の文字列を含むファイルを探す
Get-ChildItem -Recurse -Include "*.html","*.css" | Select-String -Pattern "hero"
```

## プロジェクト構成

### CSS構造（モジュール分割）

```
css/
├── style.css (親ファイル - すべてをインポート)
├── base.css (変数、リセット、タイポグラフィ)
├── components.css (ボタン、カードなど)
├── header.css
├── hero.css
├── sections.css
├── footer.css
├── animations.css
├── brand.css (ブランドLP専用)
└── works.css (実績ページ専用)
```

### デザイントークン（base.css内）

- **カラー**: ネイビー (#0f172a), ゴールド (#ae8b47), イエロー (#FFD700)
- **フォント**: Noto Sans JP (ゴシック), Shippori Mincho (明朝)

### レスポンシブ対応

- ブレイクポイント: 768px
- `br-sp` / `br-pc` クラスで改行を制御
- `text-sp` / `text-pc` クラスでテキスト表示を制御

## 重要な注意事項

### 文字化け防止ルール（最優先）

1. **すべてのファイルをUTF-8 (BOMなし)で保存**
2. HTMLに `<meta charset="UTF-8">` を必ず記述
3. CSS前頭に `@charset "UTF-8";` を記述
4. `.editorconfig` で `charset = utf-8` を設定済み

### コーディングルール

- CSS変更時は必ず親ファイル（style.css）経由でインポート
- 新しいセクション追加時は専用CSSファイルを作成
- Git管理: 作業の区切りごとにコミット

## トラブルシューティング

### 文字化けが発生したら

1. ファイルのエンコーディングを確認（VS Code右下）
2. UTF-8で保存し直す
3. ブラウザでハードリロード（Ctrl + Shift + R）

### PowerShellでエラーが出たら

```powershell
# 文字エンコーディングをUTF-8に変更
chcp 65001
```

## プロジェクト目標

- **ピクセルパーフェクト**: 細部まで美しいデザイン
- **維持費0円の資産構築**: 静的サイトで運用コスト削減
- **地域密着**: 群馬県高崎市のブランド力を活かす
