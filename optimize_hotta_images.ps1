if (Get-Command magick -ErrorAction SilentlyContinue) {
    Write-Host "Optimizing Hotta (Type-C) Images..."
    
    # Define images to optimize (Heavy 1MB+ targets)
    $images = @(
        "trust_final_hero_1770166933003.webp",
        "trust_work_road_1770166977138.webp",
        "trust_final_work_river_1770166963202.webp",
        "trust_real_hero_1770166512251.webp",
        "trust_smart_hero_1770166707732.webp"
    )

    foreach ($img in $images) {
        $inputPath = "templates/type-c/$img"
        $outputPath = "templates/type-c/optimized_$img"
        
        if (Test-Path $inputPath) {
            # Aggressive Resize (Max Width 1200px for Desktop, Q75)
            # This is a safe baseline. For mobile specific, we'd go smaller, but this cleans the big files.
            magick "$inputPath" -resize 1200x -quality 75 "$outputPath"
            Write-Host "Optimized: $img -> optimized_$img"
        }
        else {
            Write-Warning "File not found: $inputPath"
        }
    }
}
else {
    Write-Error "ImageMagick not found."
}
