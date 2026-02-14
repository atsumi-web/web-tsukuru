# Fix Encoding PowerShell Script

$ErrorActionPreference = "Stop"

# Define the mojibake patterns and their replacements
$mojibake1 = "驕狗畑蜿ｸ莉､螳､縺ｸ"
$mojibake2 = "繝壹・繧ｸ繝医ャ繝励∈"
$correct1 = "制作コックピットへ"
$correct2 = "ページトップへ"

$files = @(
    "manuals\daily\night.html",
    "manuals\daily\morning.html",
    "manuals\daily\afternoon.html",
    "manuals\internal\ULTIMATE_CLONING_BIBLE.html",
    "manuals\internal\trouble_recovery.html",
    "manuals\internal\recruitment_strategy_guide.html",
    "manuals\internal\monetization_bible_90days.html",
    "manuals\internal\mobile_optimization_guide.html",
    "manuals\internal\15_recruit_content_guide.html",
    "manuals\internal\14_quality_check_sheet.html",
    "manuals\internal\13_lp_hearing_sheet.html",
    "manuals\internal\12_production_guidelines.html",
    "manuals\internal\10_ai_efficiency_guide.html",
    "manuals\internal\09_coding_rules.html",
    "manuals\internal\05_assets.html",
    "manuals\internal\04_github.html",
    "manuals\internal\00_hotta_blueprint.html"
)

foreach ($file in $files) {
    Write-Host "Processing: $file"
    $content = Get-Content -Path $file -Raw -Encoding UTF8
    $modified = $false
    
    if ($content -match [regex]::Escape($mojibake1)) {
        $content = $content -replace [regex]::Escape($mojibake1), $correct1
        $modified = $true
    }
    
    if ($content -match [regex]::Escape($mojibake2)) {
        $content = $content -replace [regex]::Escape($mojibake2), $correct2
        $modified = $true
    }
    
    if ($modified) {
        Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  ✅ Fixed: $file" -ForegroundColor Green
    } else {
        Write-Host "  ℹ No changes needed" -ForegroundColor Gray
    }
}

Write-Host "`n✅ All files processed!" -ForegroundColor Green
