if (Get-Command magick -ErrorAction SilentlyContinue) {
    Write-Host "Optimizing Works Images..."
    
    # 1. Yamato PC (Resize to ~800px width, convert to WebP Q75)
    magick "images/works/yamato_v3_pc.png" -resize 800x -quality 75 "images/works/yamato_v3_pc.webp"
    Write-Host "Created yamato_v3_pc.webp"

    # 2. Yamato SP (Resize to ~400px width, convert to WebP Q75)
    magick "images/works/yamato_v3_sp.png" -resize 400x -quality 75 "images/works/yamato_v3_sp.webp"
    Write-Host "Created yamato_v3_sp.webp"
}
else {
    Write-Error "ImageMagick not found."
}
