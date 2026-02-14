if (Get-Command magick -ErrorAction SilentlyContinue) {
    Write-Host "Optimizing Missing Hotta Image..."
    
    # Correct filename from list_dir: trust_final_work_road_1770166977138.webp
    $img = "trust_final_work_road_1770166977138.webp"
    $inputPath = "templates/type-c/$img"
    $outputPath = "templates/type-c/optimized_$img"
    
    if (Test-Path $inputPath) {
        magick "$inputPath" -resize 800x -quality 75 "$outputPath"
        Write-Host "Optimized: $img -> optimized_$img"
    }
    else {
        Write-Warning "File still not found: $inputPath"
    }
}
