$file = 'c:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru\site\client-work\01_hotta\docs\lp_structure.html'
$lines = Get-Content -Path $file -Encoding UTF8
# 0-indexed: lines 703-853 (1-indexed) = index 702-852
$new = $lines[0..701] + $lines[853..($lines.Length-1)]
$new | Set-Content -Path $file -Encoding UTF8
Write-Host "Done. Total lines: $($new.Length)"
