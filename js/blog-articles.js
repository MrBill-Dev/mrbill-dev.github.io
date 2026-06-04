/**
 * 教學文章索引（blog/ 目錄）
 * - 檔名：blog/{YYYY-MM-DD}-{主題}.html（例：2026-05-31-ai-prompt-six-levels.html），title 用中文
 * - cover：顯圖路徑 assets/xxx.jpg（1200×630），需同步寫入文章 og:image 絕對網址
 * - 列表只維護此陣列；新增文章複製 blog/article.template.html
 */
const BLOG_ARTICLES = [
  {
    slug: "2026-05-31-ai-prompt-six-levels",
    href: "blog/2026-05-31-ai-prompt-six-levels.html",
    title: "99% 的人都在錯用 AI Prompt",
    excerpt: "從一句話輸入到企業級 AI 系統設計，用 6 個層級建立輸出行為控制思維。",
    category: "AI學習地圖",
    author: "Mr.Bill",
    date: "2026-05-31",
    readMins: 12,
    tags: ["Prompt", "AI 思維", "工作流"],
    cover: "assets/blog-2026-05-31-ai-prompt-og.jpg"
  }
];
