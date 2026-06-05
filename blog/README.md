# 文章分享（blog）維護說明

靜態站文章系統：**資料集中一份、版型共用 component、每篇只維護正文 HTML**。

---

## 一、我要做什麼？改哪個檔案？

| 你想改… | 改這裡 | 不要改 |
|--------|--------|--------|
| 新增／下架一篇文章 | `js/blog-articles.js` + 新建 `blog/{slug}.html` | 不要在每篇重複寫標題、封面 URL |
| 文章標題、副標、摘要、封面圖、分類、標籤、閱讀分鐘 | `js/blog-articles.js` → `BLOG_ARTICLES` | 單篇 HTML 的 `<title>`、Hero 文字（會由 JS 覆寫） |
| 某篇文章正文（段落、圖、Level 區塊） | `blog/{slug}.html` 的 `<article>…</article>` 內 | Hero、右欄、導覽列 |
| 全站文章 Hero（主視覺）結構 | `components/blog-article-hero.html` | 各篇 `blog/*.html` |
| 全站文章右欄外框 | `components/blog-article-rail.html` | 各篇 `blog/*.html` |
| 右欄「延伸」依分類的連結 | `js/blog-articles.js` → `BLOG_CATEGORY_LINKS` | — |
| 右欄固定站內連結（文章列表、互動練習） | `js/blog-articles.js` → `BLOG_SITE_LINKS` | — |
| 手動指定「相關文章」 | `BLOG_ARTICLES[].relatedSlugs` | — |
| 文章列表頁標題、專區副標 | `js/blog-articles.js` → `BLOG_INDEX` | `blog/index.html` 內文 |
| 列表頁 Hero 背景圖（固定圖） | `BLOG_INDEX.heroCover`（設路徑）；`null` = 用最新一篇的 `cover` | — |
| 全站文章版型（字級、間距、雙欄、過場句） | `css/blog-layout.css` | 單篇 inline style（除非該篇特例） |
| 學習地圖「深度閱讀」區塊顯示哪些文 | `ai-learning-map.html` 的 `initBlogArticleList` 參數（`category`） | 不必在學習地圖重複寫卡片 HTML |
| 頂部／底部導覽 | `components/header.html`、`components/footer.html` | — |

---

## 二、新增第二篇（標準流程）

### 步驟 1：登記資料（必做）

編輯 **`js/blog-articles.js`**，在 `BLOG_ARTICLES` 陣列加一筆：

```javascript
{
  slug: "2026-06-15-my-topic",           // 檔名不含 .html，建議 YYYY-MM-DD-主題
  title: "文章標題",                      // Hero、列表、瀏覽器分頁
  subtitle: "Hero 副標（可較口語）",
  excerpt: "列表摘要 + SEO description",
  category: "AI學習地圖",                 // 需與 BLOG_CATEGORY_LINKS 的 key 一致才會對到延伸連結
  author: "Mr.Bill",
  date: "2026-06-15",
  readMins: 6,                           // 預估閱讀分鐘（依字數粗估）
  tags: ["標籤一", "標籤二"],
  cover: "assets/blog-2026-06-15-og.jpg", // 相對於網站根目錄
  relatedSlugs: []                       // 選填：["另一篇-slug"] 手動指定相關文章
}
```

封面圖請放在 **`assets/`**，檔名與 `cover` 一致。

### 步驟 2：建立文章頁（只寫內文）

1. 複製 **`blog/article.template.html`**
2. 另存為 **`blog/2026-06-15-my-topic.html`**（檔名 = `slug` + `.html`）
3. **只編輯** `<article class="blog-main blog-prose …">` 裡的區塊

`<head>` 的 title／meta 可留空，載入時會由 `blog-articles.js` 依 `slug` 自動填入。

### 步驟 3：確認連動

- 打開 `blog/index.html` → 列表應出現新卡
- 打開新文章 URL → Hero、右欄、meta 應正確
- 若 `category` 為 `AI學習地圖` → `ai-learning-map.html` 深度閱讀區會顯示（目前有設 `category` 篩選）

---

## 三、架構圖（誰載入誰）

```
js/blog-articles.js          ← 資料單一來源（BLOG_ARTICLES、BLOG_INDEX）
        │
        ├── blog/index.html              → initBlogIndexPage()：列表 + 列表 Hero
        ├── ai-learning-map.html         → renderBlogArticleList({ category: "…" })
        └── blog/{slug}.html             → initBlogArticlePage()
                    │
                    ├── components/blog-article-hero.html  （主視覺 HTML）
                    ├── components/blog-article-rail.html  （右欄外框）
                    ├── renderBlogArticleHero()             （填標題、圖、meta）
                    └── renderBlogArticleRail()             （填資訊、相關文、延伸）

css/blog-layout.css          ← 全站文章版型（含 .blog-prose、.blog-bridge）
```

---

## 四、欄位對照（同一個字不要改兩次）

| 畫面上看到 | 資料欄位 | 出現位置 |
|-----------|----------|----------|
| 列表標題 | `title` | `blog/index.html`、學習地圖列表 |
| 列表摘要 | `excerpt` | 同上 |
| 列表縮圖 | `cover` | 同上 |
| 列表分類／日期／閱讀時間 | `category`、`date`、`readMins` | 同上 |
| Hero 標題 | `title` | 文章頁主視覺 |
| Hero 副標 | `subtitle`（沒有則用 `excerpt`） | 文章頁主視覭 |
| Hero 分類 tag | `category` | 文章頁主視覺 |
| Hero 作者・日期・閱讀 | `author`、`date`、`readMins` | 文章頁主視覺 |
| 右欄分類、標籤、日期 | 同上 | 右欄「文章資訊」 |
| 右欄相關文章 | `relatedSlugs` 或同分類／標籤自動 | 右欄「相關文章」 |
| 右欄延伸連結 | `BLOG_CATEGORY_LINKS[category]` + `BLOG_SITE_LINKS` | 右欄「延伸」 |
| 分享用 OG／Twitter | `title`、`excerpt`、`cover` | `<head>`（JS 寫入） |

---

## 五、相關文章怎麼出現？

優先順序：

1. **`relatedSlugs`** 手動列 slug（最準）
2. 同 **`category`** 的其他篇
3. 共用 **`tags`** 加分排序
4. 仍不足時，其他文章依日期補滿（最多 4 篇）

只有一篇文章時，右欄會顯示「同系列文章陸續更新中。」

---

## 六、分類與學程頁

新增分類時請同時：

1. 在 `BLOG_ARTICLES` 使用新 `category` 字串
2. 在 `BLOG_CATEGORY_LINKS` 加對應學程連結（右欄「延伸」才會連到正確頁）
3. 若要在 `ai-learning-map.html` 顯示，確認該頁 `initBlogArticleList` 的 `category` 篩選條件

---

## 七、檔案清單

| 路徑 | 用途 |
|------|------|
| `blog/article.template.html` | 新文章複製用（含註解，指向本說明） |
| `blog/index.html` | 文章列表頁 |
| `blog/{slug}.html` | 各篇文章正文 |
| `blog/README.md` | 本維護說明 |
| `js/blog-articles.js` | 資料與渲染邏輯 |
| `css/blog-layout.css` | 文章版型樣式 |
| `components/blog-article-hero.html` | 文章 Hero 共用 HTML |
| `components/blog-article-rail.html` | 文章右欄共用 HTML |
| `js/blog-stats.js` | 瀏覽次數（與列表資料無關） |

---

## 八、常見錯誤

- **改了 `blog/*.html` 的標題，列表沒變** → 應改 `BLOG_ARTICLES`
- **新文章 404** → 檔名必須是 `blog/{slug}.html`，且 `slug` 與 JS 一致
- **右欄延伸連結不對** → 檢查 `category` 是否在 `BLOG_CATEGORY_LINKS` 有定義
- **列表 Hero 圖不對** → 改最新文章的 `cover`，或設定 `BLOG_INDEX.heroCover`
- **版型改了舊文沒變** → 確認該篇使用 `#blog-article-hero-slot`／`#blog-article-rail-slot`（請用 template，勿保留舊版整段寫死的 Hero）

---

## 九、日後擴充（尚未啟用）

- 文章很多時：`.blog-layout--with-nav` 可開左側文章選單（見 `blog-layout.css` 註解）
- 約 30 篇以上：可再評估 `content/{slug}.json` 單頁渲染（目前每篇一個 HTML 較利 SEO）

---

*最後更新：與 `article.template.html`、`blog-articles.js` 共用架構同步。*
