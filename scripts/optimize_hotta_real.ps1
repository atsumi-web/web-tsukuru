if (Get-Command magick -ErrorAction SilentlyContinue) {
    Write-Host "Aggressively Optimizing Hotta (Real) Mobile Images..."
    
    # Target directory
    $baseDir = "works/hotta/images"
    
    # Find all mobile webp images
    $images = Get-ChildItem -Path $baseDir -Recurse -Filter "*_mobile.webp"
    
    foreach ($img in $images) {
        $inputPath = $img.FullName
        # Re-compress to Q60 and clean metadata (strip)
        # Ensure max width is appropriate for mobile (400-600px)
        # We overwrite the file because these are already "optimized" copies that are apparently not optimized enough.
        
        $currentSize = $img.Length
        
        # Resize to 600px width limit (safe for 2-col retina or full width mobile)
        # Quality 60 is usually acceptable for mobile density.
        magick "$inputPath" -resize "600x>" -strip -quality 60 "$inputPath"
        
        $newSize = (Get-Item $inputPath).Length
        $saving = ($currentSize - $newSize) / 1024
        
        Write-Host "Processed $($img.Name): $([math]::Round($currentSize/1024))KB -> $([math]::Round($newSize/1024))KB (Saved $([math]::Round($saving))KB)"
    }
    
    # Also check Hero specific
    $heroMobile = "$baseDir/hero/hero-background_mobile.webp"
    if (Test-Path $heroMobile) {
        magick "$heroMobile" -resize "800x>" -strip -quality 60 "$heroMobile"
        Write-Host "Processed Hero Mobile"
    }

}
else {
    Write-Error "ImageMagick not found."
}
