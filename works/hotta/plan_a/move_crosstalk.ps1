# PowerShell script to move Cross Talk section after Works section

$indexFile = "index.html"

# Read file
$lines = Get-Content $indexFile -Encoding UTF8

# Define section boundaries (0-indexed in code, but 1-indexed display)
$crossTalkStart = 390  # Line 391 in display (<!-- Cross Talk Section (NEW) -->)
$crossTalkEnd = 431    # Line 432 in display (</section> of Cross Talk)
$worksEnd = 508        # Line 509 in display (</section> of Works)

# Extract Cross Talk section
$crossTalkSection = $lines[$crossTalkStart..$crossTalkEnd]

# Remove Cross Talk from original position
$newLines = $lines[0..($crossTalkStart - 1)] + $lines[($crossTalkEnd + 1)..($lines.Count - 1)]

# Recalculate Works end position after removal
$adjustedWorksEnd = $worksEnd - ($crossTalkEnd - $crossTalkStart + 1)

# Insert Cross Talk after Works
$finalLines = $newLines[0..$adjustedWorksEnd] + "" + $crossTalkSection + "" + $newLines[($adjustedWorksEnd + 1)..($newLines.Count - 1)]

# Write back
$finalLines | Set-Content $indexFile -Encoding UTF8

Write-Host "Successfully moved Cross Talk section after Works section"
