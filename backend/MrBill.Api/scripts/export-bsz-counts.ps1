# 從 bsz.saop.cc 匯出四篇既有喜歡數，寫入 Data/seed-counts.json
# 用法（在 backend/MrBill.Api 目錄）：
#   powershell -ExecutionPolicy Bypass -File .\scripts\export-bsz-counts.ps1

$ErrorActionPreference = "Stop"
$origin = "https://mrbill-dev.github.io"
$slugs = @(
    "taipei-newtaipei-rainy-day-family",
    "2026-06-06-ai-workflow-lesson-04-06",
    "2026-06-05-ai-workflow-lesson-01-02",
    "2026-05-31-ai-prompt-six-levels"
)

$articles = @()
foreach ($slug in $slugs) {
    $pageUrl = "$origin/blog/$slug.html"
    Write-Host "讀取 $slug ..."
    $resp = Invoke-RestMethod -Uri "https://bsz.saop.cc/api" -Method GET -Headers @{
        "x-bsz-referer" = $pageUrl
        "Accept"        = "application/json"
    }
    $count = [int]$resp.data.page_pv
    Write-Host "  -> $count"
    $articles += [ordered]@{
        slug      = $slug
        pageUrl   = $pageUrl
        likeCount = $count
    }
}

$payload = [ordered]@{
    _comment = "由 export-bsz-counts.ps1 自動產生；API 啟動時匯入，且不會把既有數字降得更低"
    articles = $articles
}

$outPath = Join-Path $PSScriptRoot "..\Data\seed-counts.json"
$json = $payload | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText($outPath, $json, [System.Text.UTF8Encoding]::new($false))
Write-Host ""
Write-Host "已寫入 $outPath"
Write-Host "下一步：dotnet run（或發佈到 IIS）讓種子資料寫入資料庫。"
