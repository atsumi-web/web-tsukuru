$cssPath = "css/renewal.css"
$outputPath = "css/critical.min.css"

if (Test-Path $cssPath) {
    # Read the full CSS
    $lines = Get-Content $cssPath -Encoding UTF8
    
    # Extract lines until "PROBLEM SECTION" starts (~line 830)
    $criticalLines = @()
    foreach ($line in $lines) {
        if ($line -match "PROBLEM SECTION") { break }
        $criticalLines += $line
    }
    
    # Minify logic (same as before)
    $cssContent = $criticalLines -join "`n"
    $minified = $cssContent -replace '/\*[\s\S]*?\*/', ''
    $minified = $minified -replace '\s+', ' ' -replace '\s*\{\s*', '{' -replace '\s*\}\s*', '}' -replace '\s*;\s*', ';' -replace '\s*:\s*', ':'
    
    Set-Content -Path $outputPath -Value $minified -Encoding UTF8
    Write-Host "Generated $outputPath (Size: $((Get-Item $outputPath).Length) bytes)"
}
else {
    Write-Error "renewal.css not found"
}
