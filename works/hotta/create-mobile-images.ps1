# Phase C-3: モバイル用小画像生成スクリプト (.NET Image使用)
# 主要画像を400px幅にリサイズしてモバイル用に最適化

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Continue"

# 対象画像リスト（ファーストビュー＆主要セクション）
$images = @(
    # メッセージセクション
    "images/company/president.webp",
    "images/company/company_exterior_optimized.webp",
    
    # 仕事説明セクション  
    "images/work/work_site_management.webp",
    
    # BBQセクション（主要画像のみ）
    "images/culture/IMG_5469_optimized.webp",
    "images/culture/IMG_5472_optimized.webp",
    "images/culture/IMG_5474_optimized.webp",
    "images/culture/IMG_5478_optimized.webp",
    "images/culture/IMG_5481_optimized.webp",
    
    # インタビューセクション
    "images/team/hotta-101_optimized.webp",
    "images/team/hotta-104_optimized.webp"
)

function Resize-Image {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$MaxWidth = 400
    )
    
    try {
        # PNG/JPGに変換して処理（.NETはWebP非対応）
        $tempInput = [System.IO.Path]::ChangeExtension($InputPath, ".jpg")
        $tempOutput = [System.IO.Path]::ChangeExtension($OutputPath, ".jpg")
        
        # WebP→JPG変換
        & magick $InputPath $tempInput 2>$null
        
        if (-not (Test-Path $tempInput)) {
            Write-Host "  ⚠️  WebP変換失敗: $InputPath" -ForegroundColor Yellow
            return $false
        }
        
        # 画像読み込み
        $img = [System.Drawing.Image]::FromFile((Get-Item $tempInput).FullName)
        
        # アスペクト比計算
        $ratio = $img.Height / $img.Width
        $newWidth = [Math]::Min($MaxWidth, $img.Width)
        $newHeight = [int]($newWidth * $ratio)
        
        # リサイズ
        $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImg)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
        
        # 保存
        $newImg.Save($tempOutput, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        
        # クリーンアップ
        $graphics.Dispose()
        $newImg.Dispose()
        $img.Dispose()
        
        # JPG→WebP変換
        & magick $tempOutput -quality 85 $OutputPath 2>$null
        
        # 一時ファイル削除
        Remove-Item $tempInput -ErrorAction SilentlyContinue
        Remove-Item $tempOutput -ErrorAction SilentlyContinue
        
        return (Test-Path $OutputPath)
    }
    catch {
        Write-Host "  ❌ エラー: $_" -ForegroundColor Red
        return $false
    }
}

$processedCount = 0
$skippedCount = 0
$totalSize = 0
$totalSizeMobile = 0

Write-Host "🚀 モバイル用小画像生成を開始します..." -ForegroundColor Cyan
Write-Host ""

foreach ($img in $images) {
    if (-not (Test-Path $img)) {
        Write-Host "⚠️  スキップ: $img (ファイルが存在しません)" -ForegroundColor Yellow
        $skippedCount++
        continue
    }
    
    # 元画像のサイズ
    $originalSize = (Get-Item $img).Length
    
    # モバイル用ファイル名
    $mobilePath = $img -replace '(_optimized)?\.webp$', '_mobile.webp'
    
    Write-Host "📱 処理中: $img" -ForegroundColor White
    
    if (Resize-Image -InputPath $img -OutputPath $mobilePath -MaxWidth 400) {
        $mobileSize = (Get-Item $mobilePath).Length
        $reduction = $originalSize - $mobileSize
        $reductionPct = [math]::Round(($reduction / $originalSize) * 100, 1)
        
        Write-Host "   ✅ 完了: $([math]::Round($originalSize/1KB, 1)) KB → $([math]::Round($mobileSize/1KB, 1)) KB (-$([math]::Round($reduction/1KB, 1)) KB, -$reductionPct%)" -ForegroundColor Green
        
        $processedCount++
        $totalSize += $originalSize
        $totalSizeMobile += $mobileSize
    }
    else {
        Write-Host "   ❌ 失敗" -ForegroundColor Red
        $skippedCount++
    }
    
    Write-Host ""
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📊 完了サマリー" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "成功: $processedCount" -ForegroundColor Green
Write-Host "スキップ: $skippedCount" -ForegroundColor Yellow
if ($processedCount -gt 0) {
    Write-Host "合計削減: -$([math]::Round(($totalSize - $totalSizeMobile)/1KB, 1)) KB" -ForegroundColor Green
    Write-Host "削減率: $([math]::Round((($totalSize - $totalSizeMobile) / $totalSize) * 100, 1))%" -ForegroundColor Green
}
Write-Host ""
