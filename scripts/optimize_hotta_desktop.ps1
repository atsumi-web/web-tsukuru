if (Get-Command magick -ErrorAction SilentlyContinue) {
    Write-Host "Optimizing Hotta Desktop (High-DPI Mobile) Images..."
    
    # Target directory
    $baseDir = "works/hotta/images"
    
    # Find all webp images that are NOT _mobile.webp
    # and are likely the "800w" sources.
    $images = Get-ChildItem -Path $baseDir -Recurse -Filter "*.webp" | Where-Object { $_.Name -notlike "*_mobile.webp" }
    
    foreach ($img in $images) {
        $inputPath = $img.FullName
        $currentSize = $img.Length
        
        # If the image is large (>30KB), compress it.
        # We resize to max 1000px (good for Retina mobile slots and desktop grid)
        # Quality 70 (Aggressive but decent)
        if ($currentSize -gt 30000) {
            magick "$inputPath" -resize "1000x>" -strip -quality 70 "$inputPath"
            
            $newSize = (Get-Item $inputPath).Length
            $saving = ($currentSize - $newSize) / 1024
            
            Write-Host "Processed $($img.Name): $([math]::Round($currentSize/1024))KB -> $([math]::Round($newSize/1024))KB (Saved $([math]::Round($saving))KB)"
        }
    }
}
else {
    Write-Error "ImageMagick not found."
}
