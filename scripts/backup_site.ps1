$rootDir = "C:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru"
$siteDir = "$rootDir\site"
$backupDir = "$rootDir\_archive\daily_backups"

# Backup target
$timestamp = Get-Date -Format "yyyyMMdd_HHmm"
$zipFile = "$backupDir\site_backup_$timestamp.zip"

Write-Host "[*] Creating backup zip... please wait." -ForegroundColor Cyan

# Compress
Compress-Archive -Path "$siteDir" -DestinationPath "$zipFile" -Force

Write-Host "[OK] Backup complete!" -ForegroundColor Green
Write-Host "Saved to: $zipFile"
Write-Host "[!] You can delete old .zip files occasionally to save space." -ForegroundColor Yellow
Write-Host ""
Start-Sleep -Seconds 5
