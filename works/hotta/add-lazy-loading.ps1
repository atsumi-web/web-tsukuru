## 画像にloading="lazy"を一括追加するスクリプト
## ファーストビュー画像（ヘッダーロゴ、ヒーローモバイル画像）以外に追加

$file = "index.html"
$content = Get-Content $file -Raw -Encoding UTF8

# ファーストビュー画像以外のimgタグにloading="lazy"を追加
# 除外: header-logo-img, hero-image-mobile
$content = $content -replace '(<img\s+(?![^>]*class="(?:header-logo-img|hero-image-mobile)")(?![^>]*loading=)[^>]*)(>)', '$1 loading="lazy"$2'

# 保存
$content | Set-Content $file -Encoding UTF8 -NoNewline

Write-Host "✅ lazy loading属性を追加しました"
Write-Host ""

# 追加された数を確認
$lazyCount = (Select-String -Path $file -Pattern 'loading="lazy"' -AllMatches).Matches.Count
Write-Host "loading='lazy' 総数: $lazyCount"
