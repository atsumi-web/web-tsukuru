$filePath = "c:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru\site\client-work\01_hotta\lp\main\index.html"

$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$s1 = "    <!-- 8."
$s2 = "    <!-- 9."
$s3 = "    <!-- 10."
$s4 = "    <!-- 11."
$s5 = "    <!-- 12."

$i1 = $content.IndexOf($s1)
$i2 = $content.IndexOf($s2)
$i3 = $content.IndexOf($s3)
$i4 = $content.IndexOf($s4)
$i5 = $content.IndexOf($s5)

$blockInit = $content.Substring($i1, $i2 - $i1)
$blockTrust = $content.Substring($i2, $i3 - $i2)
$blockBenef = $content.Substring($i3, $i4 - $i3)
$blockCulture = $content.Substring($i4, $i5 - $i4)

$original = $content.Substring($i1, $i5 - $i1)
$reordered = $blockTrust + $blockBenef + $blockInit + $blockCulture

$newContent = $content.Replace($original, $reordered)

[System.IO.File]::WriteAllText($filePath, $newContent, [System.Text.Encoding]::UTF8)

Write-Host "Done: TRUST -> BENEFITS -> INITIATIVE -> THE CULTURE"
