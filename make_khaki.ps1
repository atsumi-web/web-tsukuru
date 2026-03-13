# Combine the 4 files
$file1 = Get-Content -Path "planning\reels\google_flow_prompts_safe20_silver.md" -Raw -Encoding UTF8
$file2 = Get-Content -Path "planning\reels\google_flow_prompts_active_work.md" -Raw -Encoding UTF8
$file4 = Get-Content -Path "planning\reels\google_flow_prompts_back_shots.md" -Raw -Encoding UTF8

# For female5, we only want the first part (before "## 🔵")
$file3_raw = Get-Content -Path "planning\reels\google_flow_prompts_female5.md" -Raw -Encoding UTF8
$parts = $file3_raw -split "## 🔵"
$file3 = $parts[0]

# Combine all text
$combined = @"
# 【完全版】カーキ（オリーブ）作業着：LP用AI動画プロンプト全40種類（バグ回避・最適化済み）

えりさんご指定の「カーキ・オリーブ（Olive Green）」カラーバージョンです！
これまで一緒に磨き上げた「木くずブロック魔法」と「中小工務店スケール」、「AIバグ回避アクション」を全搭載した、最強の40プロンプトフルセットになります。
アースカラーのカーキ作業着は、木造現場との相性が抜群で、今風の親しみやすい若手社長やおしゃれな大工さんの雰囲気を出すのに最適です🌲

---

"@ + "`n`n"

$combined += $file1 + "`n`n---`n`n" + $file2 + "`n`n---`n`n" + $file3 + "`n`n---`n`n" + $file4

# Replace strings to Khaki/Olive
$combined = $combined -replace "silver gray", "olive green"
$combined = $combined -replace "light gray", "olive green"
$combined = $combined -replace "シルバーグレー", "カーキ（オリーブ）"
$combined = $combined -replace "ライトグレー", "カーキ（オリーブ）"
$combined = $combined -replace "silver", "olive green"

Set-Content -Path "planning\reels\google_flow_prompts_MASTER_KHAKI.md" -Value $combined -Encoding UTF8
Write-Host "File created successfully."
