# 後台 2A 上線步驟（安全）

## 安全設計摘要

| 防護 | 說明 |
|------|------|
| **ADMIN_TOKEN** | 只存在 Cloudflare Secrets，不進 Git |
| **Bearer 驗證** | 沒密碼無法新增/修改/下架 |
| **失敗次數封鎖** | 15 分鐘內錯 8 次 → 暫停該 IP |
| **slug 格式檢查** | 擋奇怪字元與路徑注入 |
| **靜態 4 篇保護** | 後台不能覆寫 legacy slug |
| **HTML 清理** | 儲存時移除 `<script>`、`onclick` 等 |
| **公開 API** | 訪客只能 GET 已上架文章 |
| **admin.html** | `noindex`，密碼只放本機 `admin.config.local.js` |

---

## 你今天要做（一次）

### 1. 設定管理密碼（至少 8 字元）

自訂一組好記的密碼（**僅英文/數字/符號，不可中文**，至少 8 字元）。

```powershell
cd backend\mrbill-worker
$env:CLOUDFLARE_API_TOKEN = "你的API權杖"
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
npx wrangler secret put ADMIN_TOKEN
```

貼上你剛產生的長密碼（畫面不會顯示）。

### 2. 建立／修正文章資料表

若出現 `no such column: status`，請跑遷移檔：

```powershell
npx wrangler d1 execute mrbill-stats --remote --file=./migrate-articles-v2.sql
```

全新安裝可改跑 `schema-articles.sql`。

### 3. 部署新版 Worker

```powershell
npx wrangler deploy
```

### 4. 本機後台設定（不推 GitHub）

複製 `js/admin/admin.config.example.js` 為：

`js/admin/admin.config.local.js`

填入：

```javascript
window.MRBILL_ADMIN = {
  apiBase: "https://mrbill-stats.billhuang19get.workers.dev",
  apiToken: "與 ADMIN_TOKEN 相同的密碼"
};
```

### 5. 開啟後台

公司或本機：

`.../admin.html`

---

## 資料庫升級（列表版型欄位）

若儲存時出現 `no such column: list_style`，請執行一次：

```powershell
cd backend\mrbill-worker
npx wrangler d1 execute mrbill-stats --remote --file=./migrate-articles-v3.sql
npx wrangler deploy
```

## 2B 已完成（列表 + 文章頁 + 預覽）

- `blog/index.html` 會合併靜態 4 篇 + `GET /api/articles` 動態上架文
- 動態內文頁：`blog/post.html?slug=你的-slug`
- 草稿預覽：`blog/post.html?slug=…&preview=1`（須先在 admin 登入）
- 後台表單上方可見「前台位置與連結」

## 2C 已完成（排程自動上架）

- Worker **Cron** 每 15 分鐘執行一次（`wrangler.toml` → `[triggers] crons`）
- 狀態為 `scheduled` 且 `published_at` 時間已到 → 自動改為 `published`
- 公開 API 讀取列表／單篇時也會順便執行一次（雙保險，不必等 cron）
- **部署後請執行** `npx wrangler deploy`（cron 才會生效）

## 2D 已完成（首頁跑馬燈／輪播）

- API：`GET /api/articles/home` → `{ marquee: [...], carousel: [...] }`
- 後台勾選 **首頁跑馬燈** → 首頁 header 下橫幅（多篇時取 `sort_order` 最高的一篇）
- 後台勾選 **首頁輪播** → 首頁 tab「精選文章輪播」區（可多篇，7 秒自動切換）
- 未勾選任何跑馬燈文章時，橫幅維持預設「雙北雨天親子」＋天氣連動
- 常駐與精選跑馬燈會左右滑動輪播；底部圓點預設隱藏，後台「首頁橫幅設定」可開啟
- 前端：`js/home-articles-feed.js` + `css/home-article-carousel.css`
- 全站橫幅設定（後台「儲存橫幅設定」）需執行一次 `migrate-site-settings.sql`（見下方）

---

## 公司網路 Wrangler 登入失敗（常見）

若出現 `UNABLE_TO_VERIFY_LEAF_SIGNATURE` 或 `Failed to fetch auth token`，代表 **瀏覽器 OAuth 登入被公司 SSL 攔截**，不是 SQL 寫錯。

**請改用 API Token（與 ADMIN-SETUP 第 1 步相同）：**

```powershell
cd backend\mrbill-worker
$env:CLOUDFLARE_API_TOKEN = "你的Cloudflare_API權杖"
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
npx wrangler d1 execute mrbill-stats --remote --file=./migrate-site-settings.sql
npx wrangler deploy
```

API 權杖在 Cloudflare 後台：**My Profile → API Tokens**（需含 D1 Edit + Workers Scripts Edit）。

**沒跑 migration 時**：首頁橫幅仍可用，圓點預設隱藏（`js/home-strip.config.js`）；僅「後台儲存橫幅設定」寫入 D1 會失敗。

### 替代：Cloudflare 網頁手動執行 SQL

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **D1** → **mrbill-stats**
2. 開 **Console**，貼上 `migrate-site-settings.sql` 內容並執行
3. 本機再跑 `npx wrangler deploy`（同樣建議設 `CLOUDFLARE_API_TOKEN` + `NODE_TLS_REJECT_UNAUTHORIZED=0`）
