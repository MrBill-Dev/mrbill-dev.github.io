# MrBill Cloudflare Worker（喜歡數 API）

> **程式由我寫；你只要照下面步驟操作。**  
> 完成後，公司預覽與 GitHub 正式站共用同一套喜歡數。

## 你只要做的事（一次設定）

### 1. 註冊 Cloudflare（免費，通常不用信用卡）

https://dash.cloudflare.com/sign-up

### 2. 安裝 Node.js（若還沒有）

https://nodejs.org/  →  選 LTS 版

### 3. 在本機終端機執行（複製貼上）

```powershell
cd backend\mrbill-worker
npm install
```

### 3b. 登入 Cloudflare（公司網路建議用 API Token）

`wrangler login` 在公司常失敗（localhost 回呼被擋、憑證錯誤）。改這樣做：

1. 瀏覽器開：https://dash.cloudflare.com/profile/api-tokens
2. **建立權杖** → 範本選 **Edit Cloudflare Workers**
3. 建立後**複製權杖**（只顯示一次）
4. 終端機（PowerShell）：

```powershell
$env:CLOUDFLARE_API_TOKEN = "貼上你的權杖"
npx wrangler whoami
```

若仍出現 `unable to verify certificate`，在公司可暫時：

```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
npx wrangler whoami
```

（回家後可關掉這行；或改在家裡網路執行 deploy，最乾淨。）

### 4. 建立資料庫

```powershell
npx wrangler d1 create mrbill-stats
```

畫面會顯示 `database_id`，複製它，貼進 `wrangler.toml` 的：

```
database_id = "這裡"
```

### 5. 繼承四篇 bsz 數字

在**能開 bsz 的電腦**（家裡較可能成功）：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\export-bsz-counts.ps1
```

若被擋，手動改 `seed.sql` 裡四個數字。

### 6. 建立資料表 + 匯入種子 + 上線

```powershell
npx wrangler d1 execute mrbill-stats --remote --file=./schema.sql
npx wrangler d1 execute mrbill-stats --remote --file=./seed.sql
npx wrangler deploy
```

成功後會顯示網址，例如：

```
https://mrbill-stats.你的帳號.workers.dev
```

### 7. 把網址告訴我，或自己改一行

編輯 `js/blog-stats.config.js`：

```javascript
production: "https://mrbill-stats.你的帳號.workers.dev/api"
```

### 8. 公司測試 → push GitHub

1. 整包複製到公司 `mrbill-dev` 資料夾
2. 開 blog 文章看喜歡數
3. OK 後 `git push`

---

## 之後日常（改文章）

| 你做 | 我做（請 Cursor 幫忙） |
|------|------------------------|
| 複製檔案到公司測試 | 改 HTML / JS / CSS |
| git push 正式站 | 改 Worker、加文章上下架功能 |
| 執行 wrangler deploy（若我改了後端） | 寫 deploy 指令給你 |

---

## 常見問題

**Q：公司預覽與 GitHub 數字一樣嗎？**  
A：一樣。都以 `mrbill-dev.github.io/blog/xxx.html` 當 key。

**Q：backend 要推 GitHub 嗎？**  
A：可以推，沒有密碼。`wrangler.toml` 裡的 database_id 公開也沒關係。

**Q：以後文章自動上架？**  
A：同一套 Worker + D1 可擴充，靜態 4 篇維持不動。
