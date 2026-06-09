# Push GITHUB_TOKEN to Cloudflare Worker (same token that passed test-github-sync.mjs)
# Usage:
#   $env:GITHUB_TOKEN = "github_pat_..."
#   $env:CLOUDFLARE_API_TOKEN = "cfut_..."
#   $env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
#   .\scripts\push-github-token.ps1

$ErrorActionPreference = "Stop"

$workerRoot = Split-Path -Parent $PSScriptRoot
Set-Location $workerRoot

$token = ""
if ($null -ne $env:GITHUB_TOKEN -and $env:GITHUB_TOKEN -ne "") {
    $token = $env:GITHUB_TOKEN.Trim()
}

if ($token -eq "") {
    Write-Host "ERROR: Set env GITHUB_TOKEN first (same token used in test-github-sync.mjs)." -ForegroundColor Red
    exit 1
}

if (-not $env:CLOUDFLARE_API_TOKEN) {
    Write-Warning "CLOUDFLARE_API_TOKEN not set; wrangler may fail."
}

if (-not $env:NODE_TLS_REJECT_UNAUTHORIZED) {
    $env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
}

Write-Host "1/2 Running test-github-sync.mjs ..."
node scripts/test-github-sync.mjs
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Local GitHub test failed. Worker secret was NOT updated." -ForegroundColor Red
    exit 1
}

Write-Host ("2/2 wrangler secret bulk (token length " + $token.Length + ") ...")
$secretsPath = Join-Path $env:TEMP ("mrbill-github-secrets-" + [guid]::NewGuid().ToString() + ".json")

try {
    $payload = @{ GITHUB_TOKEN = $token }
    $json = $payload | ConvertTo-Json -Compress
    $utf8 = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($secretsPath, $json, $utf8)

    npx wrangler secret bulk $secretsPath
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: wrangler secret bulk failed." -ForegroundColor Red
        exit 1
    }
}
finally {
    if (Test-Path -LiteralPath $secretsPath) {
        Remove-Item -LiteralPath $secretsPath -Force -ErrorAction SilentlyContinue
    }
}

Write-Host ""
Write-Host "OK. Refresh admin.html, then click Sync GitHub." -ForegroundColor Green
