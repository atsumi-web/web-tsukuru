$dir = "C:\Users\eri76\.gemini\antigravity\brain\284abe49-ba93-4204-9783-4725dad3bc3f"
$dest = "C:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru\site\client-work\05_soshou\hp\images"

$files = Get-ChildItem -Path $dir -Filter media__*.jpg | Sort-Object LastWriteTime -Descending | Select-Object -First 8 -ExpandProperty FullName
$names = @("scene_gear.webp", "scene_team.webp", "interview_veteran_2.webp", "interview_veteran_1.webp", "interview_leader_2.webp", "interview_leader_1.webp", "interview_rookie_2.webp", "interview_rookie_1.webp")

for($i=0; $i -lt 8; $i++) {
    $f = $files[$i]
    $n = $names[$i]
    Write-Host "Converting $f to $n"
    magick $f -resize 1200x -quality 85 "$dest\$n"
}
