# 從 bsz.saop.cc 匯出四篇數字，產生 seed.sql
# 在 backend/mrbill-worker 目錄執行：
#   powershell -ExecutionPolicy Bypass -File .\scripts\export-bsz-counts.ps1

$ErrorActionPreference = "Stop"
$origin = "https://mrbill-dev.github.io"
$slugs = @(
    "taipei-newtaipei-rainy-day-family",
    "2026-06-06-ai-workflow-lesson-04-06",
    "2026-06-05-ai-workflow-lesson-01-02",
    "2026-05-31-ai-prompt-six-levels"
)

$lines = @(
    "-- 由 export-bsz-counts.ps1 自動產生",
    "INSERT INTO blog_stats (page_url, slug, like_count) VALUES"
)

$values = @()
foreach ($slug in $slugs) {
    $pageUrl = "$origin/blog/$slug.html"
    Write-Host "讀取 $slug ..."
    $resp = Invoke-RestMethod -Uri "https://bsz.saop.cc/api" -Method GET -Headers @{
        "x-bsz-referer" = $pageUrl
        "Accept"        = "application/json"
    }
    $count = [int]$resp.data.page_pv
    Write-Host "  -> $count"
    $values += "  ('$pageUrl', '$slug', $count)"
}

$lines += ($values -join ",`n")
$lines += "ON CONFLICT(page_url) DO UPDATE SET"
$lines += "  like_count = MAX(like_count, excluded.like_count);"
$lines += ""

$outPath = Join-Path $PSScriptRoot "..\seed.sql"
[System.IO.File]::WriteAllText($outPath, ($lines -join "`n"), [System.Text.UTF8Encoding]::new($false))
Write-Host ""
Write-Host "已寫入 $outPath"
Write-Host "下一步請執行 README 裡的 db 匯入與 deploy 指令。"
