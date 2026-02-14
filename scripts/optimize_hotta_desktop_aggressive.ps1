if (Get-Command magick -ErrorAction SilentlyContinue) {
    Write-Host "Aggressively Optimizing Hotta Desktop - V2 (Q50)..."
    
    $baseDir = "works/hotta/images"
    
    # Filter for standard .webp images (excluding _mobile) that are large
    $images = Get-ChildItem -Path $baseDir -Recurse -Filter "*.webp" | Where-Object { $_.Name -notlike "*_mobile.webp" }
    
    foreach ($img in $images) {
        $inputPath = $img.FullName
        $currentSize = $img.Length
        
        # Only process if > 25KB (Desktop images picked by mobile need to be light)
        if ($currentSize -gt 25000) {
            # Resize slightly smaller (800px max) and compress hard (Q50)
            # This targets the "Potential Savings" warning directly.
            magick "$inputPath" -resize "800x>" -strip -quality 50 "$inputPath"
            
            $newSize = (Get-Item $inputPath).Length
            $saving = ($currentSize - $newSize) / 1024
            
            Write-Host "Processed $($img.Name): $([math]::Round($currentSize/1024))KB -> $([math]::Round($newSize/1024))KB (Saved $([math]::Round($saving))KB)"
        }
    }
}
else {
    Write-Error "ImageMagick not found."
}
