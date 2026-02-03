# Phase B: 一括画像リサイズスクリプト（改良版）
# 100KB以上の全ての画像を自動的にリサイズ

Write-Host "================================================"
Write-Host "Phase B: Image Optimization Script"
Write-Host "================================================"
Write-Host ""

# 100KB以上の画像を検索
Write-Host "Searching for large images (>100KB)..."
$largeImages = Get-ChildItem -Path images -Recurse -Include *.webp, *.jpg, *.png, *.jpeg | Where-Object { $_.Length -gt 100KB }

Write-Host "Found $($largeImages.Count) images over 100KB"
Write-Host ""

$totalSaved = 0
$processedCount = 0

foreach ($img in $largeImages) {
    $originalSize = $img.Length
    $originalSizeKB = [math]::Round($originalSize / 1KB, 0)
    
    Write-Host "Processing: $($img.Name) (${originalSizeKB}KB)"
    
    # 出力ファイル名（元のファイルは保持）
    $dir = $img.DirectoryName
    $basename = [System.IO.Path]::GetFileNameWithoutExtension($img.Name)
    $outputPath = Join-Path $dir "${basename}_optimized.webp"
    
    # 既に最適化済みの場合はスキップ
    if (Test-Path $outputPath) {
        Write-Host "  -> Already optimized, skipping" -ForegroundColor Yellow
        continue
    }
    
    # サイズに応じて最大幅を決定
    if ($originalSize -gt 1MB) {
        $maxWidth = 1200  # 1MB以上は1200px
    }
    elseif ($originalSize -gt 500KB) {
        $maxWidth = 1000  # 500KB-1MBは1000px
    }
    else {
        $maxWidth = 800   # 100KB-500KBは800px
    }
    
    try {
        # ImageMagickでリサイズ＋WebP変換
        magick $img.FullName -resize "${maxWidth}x>" -quality 85 $outputPath
        
        if (Test-Path $outputPath) {
            $newSize = (Get-Item $outputPath).Length
            $newSizeKB = [math]::Round($newSize / 1KB, 0)
            $saved = $originalSize - $newSize
            $savedKB = [math]::Round($saved / 1KB, 0)
            $totalSaved += $saved
            $processedCount++
            
            Write-Host "  -> Optimized: ${newSizeKB}KB (saved ${savedKB}KB)" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "  -> Error: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================================"
Write-Host "Summary"
Write-Host "================================================"
Write-Host "Processed: $processedCount images"
$totalSavedMB = [math]::Round($totalSaved / 1MB, 2)
Write-Host "Total saved: ${totalSavedMB}MB"
Write-Host ""
Write-Host "Next step: Replace original images with optimized versions in index.html"
