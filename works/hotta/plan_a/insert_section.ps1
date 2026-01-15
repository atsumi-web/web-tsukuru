# PowerShell script to safely insert trust data section

$trustFile = "trust_data_section.html"
$indexFile = "index.html"

# Read trust section
$trustContent = Get-Content $trustFile -Raw -Encoding UTF8

# Read index file as array of lines
$indexLines = Get-Content $indexFile -Encoding UTF8

# Find the insertion point (after line with "</section>" following diagnosis section)
$insertIndex = -1
for ($i = 0; $i -lt $indexLines.Count; $i++) {
    if ($indexLines[$i] -match "^\s*</section>\s*$" -and $i -gt 135 -and $i -lt 145) {
        $insertIndex = $i + 1
        break
    }
}

if ($insertIndex -eq -1) {
    Write-Error "Could not find insertion point"
    exit 1
}

# Insert the trust section
$newLines = $indexLines[0..($insertIndex-1)] + "" + $trustContent + "" + $indexLines[$insertIndex..($indexLines.Count-1)]

# Write back
$newLines | Set-Content $indexFile -Encoding UTF8

Write-Host "Successfully inserted trust data section at line $insertIndex"
