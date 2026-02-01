# Organize root images folder
# This script moves images not referenced in index.html to a keep/ folder in the root images directory

$indexHtml = "c:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru\works\hotta\index.html"
$imagesRoot = "c:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru\works\hotta\images"

Write-Host "Reading HTML file..." -ForegroundColor Green
$html = Get-Content $indexHtml -Raw

# Extract all image filenames from HTML (including subdirectory references)
$usedImages = @()
$pattern = 'src="images/([^"]+)"'
$matches = [regex]::Matches($html, $pattern)
foreach ($match in $matches) {
    $imagePath = $match.Groups[1].Value
    # Extract just the filename if it includes a subdirectory
    if ($imagePath -notmatch '/') {
        $usedImages += $imagePath
    }
}

Write-Host "Found $($usedImages.Count) root-level image references in HTML" -ForegroundColor Cyan
Write-Host ""

# Get all files in root images directory (exclude subdirectories)
$allFiles = Get-ChildItem -Path $imagesRoot -File
Write-Host "Total files in images/ root: $($allFiles.Count)" -ForegroundColor Cyan

$unusedFiles = @()
foreach ($file in $allFiles) {
    if ($usedImages -notcontains $file.Name) {
        $unusedFiles += $file
    }
}

Write-Host "Unused files: $($unusedFiles.Count)" -ForegroundColor Yellow
Write-Host ""

if ($unusedFiles.Count -gt 0) {
    # Create keep folder
    $keepPath = Join-Path $imagesRoot "keep"
    if (-not (Test-Path $keepPath)) {
        New-Item -Path $keepPath -ItemType Directory | Out-Null
        Write-Host "Created keep/ folder in images/ root" -ForegroundColor Cyan
    }
    
    # Move unused files
    foreach ($file in $unusedFiles) {
        Move-Item -Path $file.FullName -Destination $keepPath -Force
        Write-Host "  Moved: $($file.Name)" -ForegroundColor Gray
    }
    
    Write-Host ""
    Write-Host "Total moved: $($unusedFiles.Count) files" -ForegroundColor Green
}
else {
    Write-Host "No unused files found in images/ root" -ForegroundColor Green
}

Write-Host ""
Write-Host "Completed!" -ForegroundColor Green
