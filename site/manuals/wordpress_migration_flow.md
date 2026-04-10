# 🚀 静的HTMLからWordPressへの完全移行＆仮公開マニュアル

本資料は、静的なHTMLサイトをオリジナルのWordPressテーマに変換し、クライアント確認用のデモ環境へデプロイするまでの、**「Webとしくみをつくる」最速・最強の構築フロー**をまとめたものです。

---

## 🎯 STEP1：テーマ構造の解体とPHP化
最初に、完成した静的HTMLをWordPress専用のPHPファイル群に解体します。

### 📁 必須ファイル構成
作成するテーマフォルダ（例: `youchien-theme`）内には以下を必ず用意します。
1. **`style.css`**：テーマ情報（Theme Nameなど）を記載する「宣誓書」。
2. **`functions.php`**：タイトルタグの自動出力やアイキャッチ画像を有効化する「設定書」。
3. **`index.php`**：万が一専用ページが無い場合に表示される「予備の画面」。
4. **`header.php`**：トップページ上部（ナビゲーションまで）を切り出したもの。
5. **`footer.php`**：トップページ下部（フッター以降）を切り出したもの。
6. **`front-page.php`**：トップページのメインコンテンツ。

### 🔗 パスの書き換えルールの徹底
WordPressは階層が複雑なため、画像やCSSのパスはすべて「絶対パス」に書き換えます。
*   `<link rel="stylesheet" href="./css/style.css">`
    ↓
*   `<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/style.css">`

---

## ⚙️ STEP2：お知らせ機能の動的化（WP_Query）
microCMSなどの外部JavaScript連携を捨て、WordPress本体の投稿機能と連動させます。

**重要なプログラミングの型**
```php
<?php
$args = array( 'post_type' => 'post', 'posts_per_page' => 5 );
$news_query = new WP_Query($args);
if ( $news_query->have_posts() ) :
  while ( $news_query->have_posts() ) : $news_query->the_post();
?>
    <!-- ここに1件ずつのデザイン（タイトル、日付、リンクなど）を書く -->
    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
<?php
  endwhile;
  wp_reset_postdata();
else :
?>
    <p>お知らせがありません。</p>
<?php endif; ?>
```

---

## 💻 STEP3：作業環境（LocalWP）の絶対ルール

ここがHTML制作者が最もつまずく「パラダイムシフト」です。

*   **ルール1：もう「Go Live」は使わない**
    HTMLと違い、`.php` は簡易サーバー（Live Server）ではブラウザに表示されません。必ず緑色の **「Local」アプリのエンジン（Start site）を起動** させ、ブラウザのリロードで確認します。
*   **ルール2：作業するフォルダの場所が変わる**
    テーマファイルは、今まで作業していたフォルダではなく、`C:\Users\eri76\Local Sites\[サイト名]\app\public\wp-content\themes\[テーマ名]` の中に作られます。
    今後の作業は、Antigravity（VSCode）から、この「テーマフォルダ全体」を開き直して（ファイル ＞ フォルダーを開く）行います。
    （※HTMLファイルを探しても一生見つかりません。全てはPHPファイルの中に存在します）

---

## ☁️ STEP4：即日デモ公開（InstaWPの活用）

ローカル環境（Local）のURLは自分のパソコン以外からは見られません。クライアントへ検証用URLを提出する際は、無料のデモクラウドを使用します。

1. **データのエクスポート**
    ローカル環境のWordPressに「All-in-One WP Migration」プラグインを入れ、『エクスポート ＞ ファイル』で `.wpress` データを丸ごとダウンロードする（今回は71MB）。
2. **InstaWP（クラウド）の立ち上げ**
    `https://instawp.com/` で新規テストサイトを1秒で構築（※無料枠は48時間で消滅）。
3. **データのインポート**
    InstaWPの管理画面にログインし、同じく「All-in-One WP Migration」を入れて先ほどの `.wpress` ファイルをインポートするだけ！これでネット上に完全公開されます。

---

## 💡 トラブルシューティング（困った時の事例集）

*   **Q. 投稿したお知らせがトップに表示されない！**
    *   **A.** 「下書き（Draft）」のままになっていませんか？必ず「青いPublish（公開）ボタン」を押してください。
    *   **A.** ネット上（InstaWP）の場合、強制キャッシュ機能が邪魔をしている可能性があります。画面上部の黒い帯にある「Purge Cache（キャッシュクリア）」を押してからリロードしてください。
*   **Q. 記事をクリックしたら、変な簡素な画面（`index.php`）になってしまった！**
    *   **A.** お知らせの詳細ページ用ファイル（`single.php`）をまだ作っていないため、予備の `index.php` が表示されてしまっています。左上の家のアイコンを押してトップページ（`front-page.php`）に戻りましょう。
    *   （※デモ提出時は、勘違いを防ぐために `<a href="#!">` などでリンク自体を一時的に無効化しておくのがプロの配慮です）
