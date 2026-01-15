# PowerShell script to delete Cross Talk section

$indexFile = "index.html"

# Read file
$lines = Get-Content $indexFile -Encoding UTF8

# Define section boundaries (0-indexed)
$crossTalkStart = 468  # Line 469: <!-- Cross Talk Section (NEW) -->
$crossTalkEnd = 509    # Line 510: </section> of Cross Talk

# Remove Cross Talk section
$newLines = $lines[0..($crossTalkStart - 1)] + $lines[($crossTalkEnd + 1)..($lines.Count - 1)]

# Write back
$newLines | Set-Content $indexFile -Encoding UTF8

Write-Host "Successfully deleted Cross Talk section"
