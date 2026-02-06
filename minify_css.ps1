$cssParams = @{
    Path = "css/renewal.css"
}

if (Test-Path @cssParams) {
    $cssContent = Get-Content @cssParams -Raw -Encoding UTF8
    # Remove comments
    $minified = $cssContent -replace '/\*[\s\S]*?\*/', ''
    # Remove newlines and extra spaces (Basic Minification)
    $minified = $minified -replace '\s+', ' ' -replace '\s*\{\s*', '{' -replace '\s*\}\s*', '}' -replace '\s*;\s*', ';' -replace '\s*:\s*', ':'
    
    $outputPath = "css/renewal.min.css"
    Set-Content -Path $outputPath -Value $minified -Encoding UTF8
    Write-Host "Minified renewal.css -> renewal.min.css"
}
else {
    Write-Error "renewal.css not found"
}
