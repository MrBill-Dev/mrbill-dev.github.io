# 依你的兩個網址部署（逐步）

| 環境 | 網址 | 用途 |
|------|------|------|
| 公司預覽 | https://plan.get.com.tw/get/webmaster/billhuang/mrbill-dev/ | 放檔案、內部測試 |
| 正式站 | https://mrbill-dev.github.io/ | 讀者公開瀏覽 |

API 不放公司 IIS（你只有放檔權限），改放 **Azure App Service 免費層**。

---

## 第 1 步：在家裡電腦安裝 .NET 8 SDK

https://dotnet.microsoft.com/download/dotnet/8.0

## 第 2 步：繼承四篇 bsz 數字

在**能開 bsz** 的電腦（公司可能被 AVG 擋）：

```powershell
cd backend\MrBill.Api
powershell -ExecutionPolicy Bypass -File .\scripts\export-bsz-counts.ps1
```

或手動編輯 `Data/seed-counts.json` 填入四篇 `likeCount`。

## 第 3 步：本機確認 API

```powershell
cd backend\MrBill.Api
dotnet restore
dotnet run
```

```powershell
$u = "https://mrbill-dev.github.io/blog/2026-05-31-ai-prompt-six-levels.html"
Invoke-RestMethod -Uri "http://localhost:5088/api" -Method GET -Headers @{ "x-bsz-referer" = $u }
```

## 第 4 步：部署到 Azure

1. https://portal.azure.com → 建立 **Web App**
2. 方案：**Free F1**，執行階段 **.NET 8**
3. 本機發佈：

```powershell
dotnet publish -c Release -o .\publish
```

4. 用 Visual Studio「發佈到 Azure」或 ZIP 部署 `publish` 資料夾
5. 記下網址，例如 `https://mrbill-api.azurewebsites.net`

6. 編輯 `js/blog-stats.config.js`：

```javascript
production: "https://mrbill-api.azurewebsites.net/api"
```

## 第 5 步：公司資料夾預覽

1. 把整個 `MrBill-Dev` 複製到公司路徑（覆蓋或同步）
2. 開啟：

   https://plan.get.com.tw/get/webmaster/billhuang/mrbill-dev/blog/2026-05-31-ai-prompt-six-levels.html

3. 確認「已有 X 位讀者喜歡」數字與 bsz 一致
4. 公司預覽與 GitHub 會顯示**同一數字**（canonical 固定為 `mrbill-dev.github.io`）

## 第 6 步：push 正式站

確認公司預覽 OK 後：

1. `blog-stats.config.js` 的 `production` 已填 Azure 網址
2. `git push` → GitHub Pages 更新
3. 開 https://mrbill-dev.github.io/blog/ 再驗一次

---

## 常見問題

**Q：公司預覽會不會變成另一套數字？**  
A：不會。`blog-stats.js` 用 `https://mrbill-dev.github.io/blog/{slug}.html` 當 key。

**Q：公司能跑 .NET 嗎？**  
A：不能（只有放檔權限）。API 只在 Azure。

**Q：還沒部署 Azure 前能測公司頁嗎？**  
A：喜歡數會失敗並自動隱藏；版面仍可預覽。
