# web-tsukuru プロジェクト

Webとしくみをつくる (web-tsukuru.jp) のメインリポジトリ

## 📁 フォルダ構成

### 🌐 公開フォルダ

**`site/`** - web-tsukuru.jpに公開されるファイル

- `index.html` - トップページ
- `service.html` - サービス・料金ページ
- `blog/` - ブログ
- `templates/` - LP テンプレート
- `works/` - クライアントLP(公開用)
- `images/` - 画像
- `css/`, `js/` - スタイルシート、JavaScript
- `links/` - インスタグラムプロフィール用リンクページ

### 🔒 非公開フォルダ(ローカルのみ)

**`manuals/`** - 社内マニュアル

- `admin/` - えりさん専用資料
- `internal/` - 社内用資料
- `daily/` - 日次作業記録
- `client/` - クライアント向けマニュアル(公開版はsite/manuals/client/にコピー)

**`client-work/`** - クライアントLP制作中の作業フォルダ

- Gitには含まれない(.gitignoreで除外)
- 完成後は必要に応じてsite/works/に移動

**`scripts/`** - 作業用スクリプト

**`planning/`** - 企画・計画資料

**`_archive/`** - 古いファイル・削除候補

## 🚀 デプロイ設定

- **Cloudflare Pages**: `site/` フォルダのみデプロイ
- **Git管理**: `client-work/` は除外

## ⚠️ 重要事項

- **削除してはいけないもの**: `site/`フォルダ内の全て
- **削除してもOK**: `_archive/`内のファイル
- **慎重に扱うもの**: `manuals/`, `scripts/`, `planning/`
