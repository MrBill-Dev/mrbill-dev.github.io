# 最簡版說明（給不懂後端的人）

## 你只要記住 3 個地方

| 地方 | 做什麼 | 你要做什麼 |
|------|--------|------------|
| **公司資料夾** | 內部看網頁長怎樣 | 複製檔案進去，用瀏覽器開 |
| **GitHub** | 正式給讀者看 | 確認 OK 後 `git push` |
| **Azure** | 只負責「喜歡數」 | 上傳後端一次，之後很少動 |

正文還是靜態 HTML，**只有喜歡數走 Azure**。

---

## 公司這邊怎麼測試？

1. 先把 Azure API 架好（下面第 2 節）
2. 把整個 `MrBill-Dev` 資料夾複製到公司：
   `...\billhuang\mrbill-dev\`
3. 瀏覽器開：
   `https://plan.get.com.tw/get/webmaster/billhuang/mrbill-dev/blog/`
4. 看四篇文章的「已有 X 位讀者喜歡」是否正確

**不用在公司架後端**，只放檔案、開網頁就好。

---

## 後端資料夾要不要推 GitHub？

| 內容 | 建議 |
|------|------|
| `backend/MrBill.Api/` 程式碼 | ✅ 可以推（裡面沒有密碼） |
| `App_Data/*.db` 資料庫檔 | ❌ 不要推（已在 .gitignore） |
| Azure 帳密、連線字串密碼 | ❌ 永遠不要寫進 Git |

**想簡單：** 跟前台放同一個 GitHub repo 即可，不用開第二個 repo。  
**想隔開：** 後端放本機不推也行，但換電腦會找不到程式碼。

---

## 後端要上傳到哪裡？

**只有一個地方：Microsoft Azure（免費網站託管）**

網址會像：`https://你取的名字.azurewebsites.net`

上傳方式（二選一，選你會的）：

### A. Visual Studio（最直覺）

1. 用 Visual Studio 開 `backend/MrBill.Api/MrBill.Api.csproj`
2. 右鍵專案 → **發佈** → 選 **Azure** → **Azure App Service**
3. 建立 Free F1 方案，按發佈

### B. 網頁手動上傳 ZIP

1. 本機執行：`dotnet publish -c Release -o publish`
2. 把 `publish` 資料夾壓成 zip
3. Azure Portal → 你的 Web App → **部署中心** → ZIP 部署

---

## 最簡流程（共 4 步）

```
① 家裡電腦：匯出 bsz 四篇數字 → dotnet run 確認
② Azure：發佈 API，記下網址
③ 改 js/blog-stats.config.js 的 production 那一行
④ 公司複製檔案測試 → OK → git push
```

---

## 會不會太複雜？

比「架自己伺服器」簡單很多。你實際只要會：

- 複製資料夾（公司測試）
- `git push`（正式上線）
- Visual Studio 發佈一次（Azure）

之後日常只改 HTML、push GitHub；**喜歡數不用每天管**。

若連 Azure 都不想碰，唯一更簡單的方案是：**不要累計數字，改用 GA4 看流量**（但四篇數字無法繼承）。
