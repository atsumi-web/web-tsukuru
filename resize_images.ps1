
# Resize-Images.ps1
# Batch resizes images in templates to create mobile optimized versions (_sp.webp)
# Uses ImageMagick (magick)

$target_dirs = @(
    "templates/type-a",
    "templates/type-b",
    "templates/type-c",
    "images"
)

$extensions = @("*.jpg", "*.jpeg", "*.png", "*.webp")

foreach ($dir in $target_dirs) {
    if (Test-Path $dir) {
        Write-Host "Processing directory: $dir" -ForegroundColor Cyan
        
        # Find all images recursively
        $images = Get-ChildItem -Path $dir -Include $extensions -Recurse
        
        foreach ($img in $images) {
            # Skip if already a mobile version or small version
            if ($img.Name -match "_sp" -or $img.Name -match "_small") {
                continue
            }

            # Define output name
            $newName = $img.BaseName + "_sp.webp"
            $outputPath = Join-Path $img.DirectoryName $newName

            # Check if output already exists - DISABLED TO FORCE REGENERATION
            # if (Test-Path $outputPath) {
            #     Write-Host "  Skipping (exists): $newName" -ForegroundColor DarkGray
            #     continue
            # }

            # Check dimensions using magick identify
            try {
                $width = [int](magick identify -format "%w" $img.FullName)
                if ($width -gt 800) {
                    Write-Host "  Resizing: $($img.Name) ($width px) -> $newName" -ForegroundColor Green
                    # Resize to 800px width, convert to webp, quality 75 (High Compression)
                    magick $img.FullName -resize 800x -quality 75 -define webp:lossless=false $outputPath
                }
                else {
                    Write-Host "  Skipping (small): $($img.Name) ($width px)" -ForegroundColor Gray
                }
            }
            catch {
                Write-Host "  Error processing $($img.Name): $_" -ForegroundColor Red
            }
        }
    }
    else {
        Write-Host "Directory not found: $dir" -ForegroundColor Yellow
    }
}

Write-Host "Done." -ForegroundColor Cyan
