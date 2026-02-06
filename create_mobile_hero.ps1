Add-Type -AssemblyName System.Drawing

$sourcePath = "images/hero-wide-active-site.webp"
$destPath = "images/hero-unified-mobile.png" # Intermediate PNG
$finalPath = "images/hero-unified-mobile.webp"

# Since .NET System.Drawing might not support WebP natively for reading/writing depending on version,
# we might need to rely on the fact that if it can read it (if codec installed), we can resize.
# However, standard .NET framework doesn't always handle WebP.
# Alternative: If we can't resize WebP directly script-wise without external libraries, 
# I will check if 'magick' is available. If not, I'll try to find a source PNG/JPG if available.
# Wait, I see 'yamato_v3_pc.png' in the file list earlier. Maybe the source exists?
# Let's try to assume we can read it. If not, I'll fallback to just copying and letting the browser handle it? No, that defeats the purpose.

# Simpler approach: Check if 'magick' exists.
if (Get-Command magick -ErrorAction SilentlyContinue) {
    Write-Host "ImageMagick found. Resizing..."
    magick "images/hero-wide-active-site.webp" -resize 750x -quality 80 "images/hero-unified-mobile.webp"
    Write-Host "Created images/hero-unified-mobile.webp"
}
else {
    Write-Error "ImageMagick not found. Cannot resize WebP reliably without it. Checking for ffmpeg..."
    if (Get-Command ffmpeg -ErrorAction SilentlyContinue) {
        ffmpeg -i "images/hero-wide-active-site.webp" -vf scale=750:-1 "images/hero-unified-mobile.webp" -y
        Write-Host "Created images/hero-unified-mobile.webp using ffmpeg"
    }
    else {
        Write-Error "No tools found. Please upload a resized version of hero-wide-active-site.webp (width 750px) named hero-unified-mobile.webp"
    }
}
