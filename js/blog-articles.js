/**
 * 文章分享索引（blog/ 目錄）
 * - 檔名：blog/{YYYY-MM-DD}-{主題}.html
 * - 列表頁：blog/index.html；選單「文章分享」指向此頁
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
    cover: "assets/blog-2026-05-31-ai-prompt-og.jpg",
    pagePath: "/blog/2026-05-31-ai-prompt-six-levels.html"
  }
];

function isBlogSectionPath() {
  var p = (location.pathname || "").replace(/\\/g, "/").toLowerCase();
  return /\/blog(\/|$)/.test(p) || p.endsWith("/blog");
}

function blogArticleHref(article) {
  if (isBlogSectionPath()) {
    return article.slug + ".html";
  }
  return article.href;
}

function blogAssetHref(path) {
  if (!path) return "";
  if (isBlogSectionPath() && !/^(https?:|\/|\.\.\/)/.test(path)) {
    return "../" + path;
  }
  return path;
}

function renderBlogArticleList(mountId) {
  var mount = document.getElementById(mountId || "blog-article-list");
  if (!mount || typeof BLOG_ARTICLES === "undefined") return;

  mount.innerHTML = BLOG_ARTICLES.map(function (a) {
    var tags = (a.tags || [])
      .map(function (t) {
        return (
          '<span class="inline-block px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-800 text-xs font-bold">' +
          t +
          "</span>"
        );
      })
      .join(" ");
    var cover = a.cover
      ? '<div class="sm:w-44 md:w-52 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">' +
        '<img src="' +
        blogAssetHref(a.cover) +
        '" alt="" class="w-full h-28 sm:h-full sm:min-h-[7.5rem] object-cover" loading="lazy" width="1200" height="630" />' +
        "</div>"
      : "";
    return (
      '<a href="' +
      blogArticleHref(a) +
      '" class="flex flex-col sm:flex-row gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-cyan-50/40 p-5 md:p-6 no-underline hover:border-cyan-300 hover:shadow-md transition-all group">' +
      cover +
      '<div class="min-w-0 flex-1">' +
      '<div class="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">' +
      '<span class="text-cyan-700">' +
      a.category +
      "</span>" +
      "<span>·</span><span>" +
      a.date +
      "</span>" +
      "<span>·</span><span>約 " +
      a.readMins +
      " 分鐘</span>" +
      "</div>" +
      '<h4 class="mt-2 text-xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors">' +
      a.title +
      "</h4>" +
      '<p class="mt-2 text-sm text-slate-600 leading-relaxed">' +
      a.excerpt +
      "</p>" +
      '<div class="mt-3 flex flex-wrap gap-1.5">' +
      tags +
      "</div>" +
      '<p class="mt-4 text-sm font-bold text-indigo-600">閱讀全文 →</p>' +
      "</div></a>"
    );
  }).join("");
}
