# Organize unused images into keep folders
# This script moves images not referenced in index.html to keep/ subfolders

$indexHtml = "c:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru\works\hotta\index.html"
$imagesRoot = "c:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru\works\hotta\images"

Write-Host "Reading HTML file..." -ForegroundColor Green
$html = Get-Content $indexHtml -Raw

# Extract all image filenames from HTML
$usedImages = @()
$pattern = 'src="images/([^"]+)"'
$matches = [regex]::Matches($html, $pattern)
foreach ($match in $matches) {
    $usedImages += $match.Groups[1].Value
}

Write-Host "Found $($usedImages.Count) image references in HTML" -ForegroundColor Cyan
Write-Host ""

# Process each subfolder
$folders = @("ourteam", "bbq", "benefits", "official")

foreach ($folder in $folders) {
    $folderPath = Join-Path $imagesRoot $folder
    
    if (-not (Test-Path $folderPath)) {
        Write-Host "$folder folder not found, skipping..." -ForegroundColor Yellow
        continue
    }
    
    Write-Host "Processing $folder..." -ForegroundColor Green
    
    $allFiles = Get-ChildItem -Path $folderPath -File
    $unusedFiles = @()
    
    foreach ($file in $allFiles) {
        $relativePath = "$folder/$($file.Name)"
        if ($usedImages -notcontains $relativePath) {
            $unusedFiles += $file
        }
    }
    
    if ($unusedFiles.Count -gt 0) {
        # Create keep folder
        $keepPath = Join-Path $folderPath "keep"
        if (-not (Test-Path $keepPath)) {
            New-Item -Path $keepPath -ItemType Directory | Out-Null
            Write-Host "  Created keep/ folder" -ForegroundColor Cyan
        }
        
        # Move unused files
        foreach ($file in $unusedFiles) {
            Move-Item -Path $file.FullName -Destination $keepPath -Force
            Write-Host "  Moved: $($file.Name)" -ForegroundColor Gray
        }
        
        Write-Host "  Total moved: $($unusedFiles.Count) files" -ForegroundColor Cyan
    }
    else {
        Write-Host "  No unused files found" -ForegroundColor Green
    }
    
    Write-Host ""
}

Write-Host "Completed!" -ForegroundColor Green
