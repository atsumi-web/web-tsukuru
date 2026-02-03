# index.htmlの画像パスを最適化版に置換するスクリプト

Write-Host "================================================"
Write-Host "Updating index.html with optimized images"
Write-Host "================================================"
Write-Host ""

# index.htmlを読み込み
$htmlPath = "index.html"
$htmlContent = Get-Content $htmlPath -Raw -Encoding UTF8

# バックアップ作成
$backupPath = "index.html.backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Copy-Item $htmlPath $backupPath
Write-Host "Backup created: $backupPath"
Write-Host ""

# 最適化された画像のリストを取得
$optimizedImages = Get-ChildItem -Path images -Recurse -Include *_optimized.webp

$replacementCount = 0

foreach ($img in $optimizedImages) {
    # 元のファイル名を推測（_optimized.webpを除去）
    $basename = $img.BaseName -replace '_optimized$', ''
    $originalDir = $img.DirectoryName.Replace((Get-Location).Path + '\', '').Replace('\', '/')
    
    # 可能な元のファイル拡張子
    $possibleExtensions = @('.webp', '.jpg', '.jpeg', '.png')
    
    foreach ($ext in $possibleExtensions) {
        $originalPath = "$originalDir/$basename$ext"
        $optimizedPath = "$originalDir/$($img.Name)"
        
        # HTMLで元のパスを検索して置換
        if ($htmlContent -match [regex]::Escape($originalPath)) {
            $htmlContent = $htmlContent -replace [regex]::Escape($originalPath), $optimizedPath
            Write-Host "Replaced: $originalPath -> $optimizedPath"
            $replacementCount++
        }
    }
}

# 更新されたHTMLを保存
$htmlContent | Out-File $htmlPath -Encoding UTF8 -NoNewline

Write-Host ""
Write-Host "================================================"
Write-Host "Summary"
Write-Host "================================================"
Write-Host "Total replacements: $replacementCount"
Write-Host "HTML updated: $htmlPath"
Write-Host "Backup: $backupPath"
