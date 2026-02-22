$filePath = "c:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru\site\client-work\01_hotta\lp\main\index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Find exact section markers
$markerEntry = '<section id="entry"'
$markerGuardians = '<section id="for-guardians"'
$markerNotes = '<section class="simple-features"'
$markerCompany = '<section id="company"'

# Find the HTML comment lines before each section
# We'll use a line-by-line approach
$lines = [System.IO.File]::ReadAllLines($filePath, [System.Text.Encoding]::UTF8)

$entryCommentIdx = -1
$guardiansCommentIdx = -1
$notesCommentIdx = -1
$companyCommentIdx = -1

for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'section id="entry"') { $entryCommentIdx = $i - 2 }  # blank line before comment
    if ($lines[$i] -match 'section id="for-guardians"') { $guardiansCommentIdx = $i - 2 }
    if ($lines[$i] -match 'class="simple-features"') { $notesCommentIdx = $i - 2 }
    if ($lines[$i] -match 'section id="company"') { $companyCommentIdx = $i - 2 }
}

# Extract blocks (from blank line before comment to blank line before next section)
$blockEntry = $lines[$entryCommentIdx..($guardiansCommentIdx - 1)]
$blockGuardians = $lines[$guardiansCommentIdx..($notesCommentIdx - 1)]
$blockNotes = $lines[$notesCommentIdx..($companyCommentIdx - 1)]

# Build new order: everything before entry, then guardians, notes, entry, company+
$before = $lines[0..($entryCommentIdx - 1)]
$after = $lines[$companyCommentIdx..($lines.Count - 1)]

$newLines = $before + $blockGuardians + $blockNotes + $blockEntry + $after

[System.IO.File]::WriteAllLines($filePath, $newLines, [System.Text.Encoding]::UTF8)
Write-Host "Done: Guardians -> NOTES -> Entry -> Company"
