# MrBill Blog Stats API（.NET 8）

取代 `bsz.saop.cc`，讓靜態 4 篇與未來新篇共用同一套喜歡數累計。

## 你現在該怎麼做（依序）

### 步驟 1：安裝 .NET 8 SDK

下載：https://dotnet.microsoft.com/download/dotnet/8.0

安裝後確認：

```powershell
dotnet --version
```

### 步驟 2：繼承四篇既有數字

在**能開啟 bsz 後台、且防毒未擋**的電腦執行（家裡電腦較可能成功）：

```powershell
cd backend\MrBill.Api
powershell -ExecutionPolicy Bypass -File .\scripts\export-bsz-counts.ps1
```

若腳本被擋，改用手動：

1. 開啟 https://bsz.saop.cc/admin
2. 抄下四篇的 `page_pv`
3. 填入 `Data/seed-counts.json` 各篇的 `likeCount`

### 步驟 3：本機啟動 API 測試

```powershell
cd backend\MrBill.Api
dotnet restore
dotnet run
```

API 位址：`http://localhost:5088/api`

測試：

```powershell
$u = "https://mrbill-dev.github.io/blog/2026-05-31-ai-prompt-six-levels.html"
Invoke-RestMethod -Uri "http://localhost:5088/api" -Method GET -Headers @{ "x-bsz-referer" = $u }
```

應回傳 `{ success: true, data: { page_pv: <繼承的數字> } }`。

### 步驟 4：設定前台 API 網址

編輯 `js/blog-stats.config.js`：

```javascript
// 本機測試
development: "http://localhost:5088/api"

// 正式（IIS 對外網址，部署後再填）
production: "https://你的API網域/api"
```

### 步驟 5：公司 IIS 資料夾（僅靜態預覽）

若你**只有資料夾放檔權限、不能設定 IIS 應用程式集區**：

- ✅ 可把整個 `MrBill-Dev` 複製進去，用瀏覽器預覽 **HTML / JS / CSS**
- ❌ **無法**在該資料夾執行 .NET API（需要 IT 安裝 ASP.NET Core Hosting Bundle 並建立應用程式）

公司資料夾用途 = **內部看版面**；喜歡數 API 請改部署到 **Azure App Service 免費層**（見下方）。

在 `js/blog-stats.config.js` 的 `internalHosts` 加入公司 IIS 主機名，並讓 `development` 指向你的 Azure API 測試網址。

### 步驟 6：部署 API 到 Azure（不需公司 IIS 權限）

在本機有 .NET SDK 的電腦執行：

```powershell
cd backend\MrBill.Api
dotnet publish -c Release -o .\publish
```

1. 到 https://portal.azure.com 建立 **App Service**，方案選 **Free F1**
2. 執行階段堆疊：**.NET 8**
3. 用 Visual Studio「發佈」或 Azure CLI 把 `publish` 上傳
4. 取得網址，例如 `https://mrbill-api.azurewebsites.net/api`
5. 填入 `js/blog-stats.config.js` 的 `production`
6. 在 Azure 應用程式設定加入 `Cors__AllowedOrigins__0` = `https://mrbill-dev.github.io`

SQLite 在 Azure 重啟後可能重置；正式環境建議改用 Azure SQL 或先接受免費層限制。

### 步驟 7：確認四篇數字正確 → push 前台

1. 公司 IIS 資料夾預覽靜態頁 + Azure API 數字正確
2. 確認 AVG 不再擋 `*.azurewebsites.net`
3. `git push` 前台（`production` 已指向 Azure API）

---

## API 格式（相容現有 blog-stats.js）

| 方法 | Header | 行為 |
|------|--------|------|
| `POST /api` | `x-bsz-referer: <文章 canonical URL>` | 計數 +1，回傳累計 |
| `GET /api` | 同上 | 只讀累計 |
| `GET /ping` | — | 健康檢查 |

回應：

```json
{ "success": true, "data": { "page_pv": 42 } }
```

---

## 資料庫

預設 **SQLite**：`App_Data/blogstats.db`（本機與小型 IIS 夠用）。

正式環境可改 `appsettings.Production.json`：

```json
{
  "Database": { "Provider": "SqlServer" },
  "ConnectionStrings": {
    "Default": "Server=.;Database=MrBillBlog;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

---

## 種子資料規則

- `Data/seed-counts.json` 只在啟動時匯入
- 新 slug：建立一筆
- 既有 slug：**只會把數字往上補到 seed 值，不會覆蓋成更小的數**
