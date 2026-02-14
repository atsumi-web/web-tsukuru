if (Get-Command magick -ErrorAction SilentlyContinue) {
    Write-Host "Optimizing Hotta WhatWeDo Images..."
    
    $baseDir = "works/hotta/images/whatwedo"
    
    # Target files
    $images = Get-ChildItem -Path $baseDir -Recurse -Filter "*.webp"
    
    foreach ($img in $images) {
        $inputPath = $img.FullName
        $currentSize = $img.Length
        
        # Aggressive settings (Q50) for these as they are illustrative
        magick "$inputPath" -resize "800x>" -strip -quality 50 "$inputPath"
            
        $newSize = (Get-Item $inputPath).Length
        $saving = ($currentSize - $newSize) / 1024
            
        Write-Host "Processed $($img.Name): $([math]::Round($currentSize/1024))KB -> $([math]::Round($newSize/1024))KB (Saved $([math]::Round($saving))KB)"
    }
}
else {
    Write-Error "ImageMagick not found."
}
