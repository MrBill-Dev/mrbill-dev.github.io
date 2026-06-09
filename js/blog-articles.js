/**
 * 文章分享索引（blog/ 目錄）— 全站文章資料的單一來源
 *
 * 列表呈現（renderBlogArticleList）：
 * - preset: "index"  → blog/index.html（≤3 篇全大卡，≥4 篇 1 精選 + 精簡列）
 * - preset: "embed"  → 站內內嵌區（精簡列 + limit，例：ai-learning-map）
 * - variant: "full" | "compact" | "featured-compact" | "auto" 可覆寫 preset
 *
 * 靜態文：BLOG_ARTICLES 加一筆 → 複製 article.template.html → npm run seo:sync
 * 動態文：後台 CMS；SEO／OG／Article／FAQ 由 applyBlogArticleHead() 統一處理
 * 未讀提示：30 天內且個人尚未開啟該文章 → 列表 NEW + 導覽數字徽章（localStorage，blog 區內不顯示）。
 */
function blogSeoOrigin() {
  return (window.MRBILL_SITE_SEO && window.MRBILL_SITE_SEO.origin) || "https://mrbill-dev.github.io";
}

function blogSeoSiteName() {
  return (window.MRBILL_SITE_SEO && window.MRBILL_SITE_SEO.siteName) || "Mr.Bill 數位實驗室";
}

/** 文章列表頁（blog/index.html）專區文案；hero 圖預設取最新文章 cover */
const BLOG_INDEX = {
  title: "文章筆記｜實務經驗、數位工作與生活觀察",
  subtitle:
    "這裡整理一些工作、學習與生活中累積的想法，包含 AI、前端、設計、攝影、工作流與實務經驗。內容不一定固定主題，但都希望能留下可參考的觀點與做法。",
  subtitleShort: "工作、學習與生活中的想法，涵蓋 AI、前端、設計與實務經驗。",
  tag: "文章筆記",
  description:
    "Mr.Bill 的文章筆記，整理 AI、前端、設計、攝影、SEO、工作流、教學與生活觀察，分享工作與學習中累積的實務經驗與可參考做法。",
  heroCover: "assets/blog-index-hero.jpg"
};

/** 靜態精選：永遠以列表大卡呈現（不受動態文章影響） */
const BLOG_LEGACY_FEATURED_SLUGS = {
  "taipei-newtaipei-rainy-day-family": true
};

const BLOG_ARTICLES = [
  {
    slug: "taipei-newtaipei-rainy-day-family",
    title: "北部下雨天好去處｜台北、新北親子室內景點推薦",
    subtitle: "室內備案、即時天氣、路線與地圖｜家長收藏版",
    excerpt:
      "整理北部下雨天好去處，精選台北、新北適合親子的室內景點、博物館、親子館、圖書館、百貨商場與雨天備案，依雨勢、年齡、交通與停留時間快速選擇。",
    label: "親子 / 生活",
    audience: "台北、新北有家長，週末或雨天臨時要帶小孩出門的人",
    category: "生活觀察",
    author: "Mr.Bill",
    date: "2026-06-08",
    readMins: 22,
    tags: ["雨天親子", "台北", "新北", "室內景點"],
    cover: "assets/blog-taipei-newtaipei-rainy-day-family-cover.png",
    relatedSlugs: [],
    featured: true,
    pinned: true,
    listStyle: "full"
  },
  {
    slug: "2026-06-06-ai-workflow-lesson-04-06",
    title: "AI 工作流實戰課｜拆・分・驗落地篇",
    subtitle: "任務拆解、人機協作、成果驗收——從模糊需求到可交付作品。",
    excerpt:
      "拆・分・驗三部曲：拆任務、分人力與 AI、用驗收標準避免「看起來完成卻不能用」。適合已讀 Context、Rules 篇的讀者。",
    label: "AI / Workflow",
    audience: "已讀過 Context、Rules 篇，想把 AI 工作流真正落地的人",
    category: "AI學習地圖",
    author: "Mr.Bill",
    date: "2026-06-06",
    readMins: 32,
    tags: ["AI 工作流", "任務拆解", "驗收"],
    cover: "assets/blog-2026-06-06-ai-workflow-lesson-04-06-og.jpg",
    relatedSlugs: [
      "2026-06-05-ai-workflow-lesson-01-02",
      "2026-05-31-ai-prompt-six-levels"
    ]
  },
  {
    slug: "2026-06-05-ai-workflow-lesson-01-02",
    title: "AI 工作流實戰課｜跨領域通用版",
    subtitle: "AI 不是拿來聊天，是拿來重整工作方式。",
    excerpt:
      "用教學、設計、行銷與開發案例學會 Context、Rules、Workflow，適合想把 AI 變成工作系統的讀者。",
    label: "AI / Workflow",
    audience: "想把 AI 用在教學、設計、行銷或開發，但不知從何整理的人",
    category: "AI學習地圖",
    author: "Mr.Bill",
    date: "2026-06-05",
    readMins: 38,
    tags: ["AI 工作流", "Context", "Rules", "Workflow"],
    cover: "assets/blog-2026-06-05-ai-workflow-og.jpg",
    relatedSlugs: [
      "2026-06-06-ai-workflow-lesson-04-06",
      "2026-05-31-ai-prompt-six-levels"
    ]
  },
  {
    slug: "2026-05-31-ai-prompt-six-levels",
    title: "99% 的人都在錯用 AI Prompt",
    subtitle: "從一句話輸入，到企業級 AI 系統設計，建立你的真正 AI 思維架構",
    excerpt: "用 6 個層級看懂 Prompt 進化：從一句話輸入到可重現的輸出行為控制，適合想建立 AI 思維架構的讀者。",
    label: "AI / Workflow",
    audience: "會用 ChatGPT 但總覺得回答不穩定，想建立 Prompt 思維架構的人",
    category: "AI學習地圖",
    author: "Mr.Bill",
    date: "2026-05-31",
    readMins: 4,
    tags: ["Prompt", "AI 思維", "工作流"],
    cover: "assets/blog-2026-05-31-ai-prompt-og.jpg",
    relatedSlugs: [
      "2026-06-06-ai-workflow-lesson-04-06",
      "2026-06-05-ai-workflow-lesson-01-02"
    ]
  }
];

/** 由 Worker API 載入的動態文章（靜態 4 篇仍以 BLOG_ARTICLES 為準） */
var BLOG_DYNAMIC_ARTICLES = [];
var BLOG_DYNAMIC_LOADED = false;
var BLOG_DYNAMIC_LOADING = null;

function blogArticlesApiBase() {
  return String(window.BLOG_ARTICLES_API || "").replace(/\/+$/, "");
}

function isStaticBlogSlug(slug) {
  return BLOG_ARTICLES.some(function (a) {
    return a.slug === slug;
  });
}

function isDynamicBlogSlug(slug) {
  if (!slug || isStaticBlogSlug(slug)) return false;
  return BLOG_DYNAMIC_ARTICLES.some(function (a) {
    return a.slug === slug;
  });
}

function normalizeDynamicArticle(row) {
  if (!row || !row.slug) return null;
  return {
    slug: row.slug,
    title: row.title || row.slug,
    subtitle: row.subtitle || "",
    excerpt: row.excerpt || "",
    label: row.label || "",
    audience: row.audience || "",
    category: row.category || "",
    author: row.author || "Mr.Bill",
    date: row.date || "",
    readMins: Number(row.readMins) || 5,
    tags: row.tags || [],
    cover: row.cover || "",
    relatedSlugs: row.relatedSlugs || [],
    status: row.status || "draft",
    featured: !!row.featured,
    homeMarquee: !!row.homeMarquee,
    homeCarousel: !!row.homeCarousel,
    listStyle: row.listStyle || "auto",
    titleFont: row.titleFont === "serif" ? "serif" : "sans",
    pinned: !!row.pinned,
    badgePopular: !!row.badgePopular,
    badgeTrending: !!row.badgeTrending,
    sortOrder: Number(row.sortOrder) || 0,
    _dynamic: true
  };
}

function registerDynamicArticleCache(row) {
  var article = normalizeDynamicArticle(row);
  if (!article) return null;
  var idx = -1;
  for (var i = 0; i < BLOG_DYNAMIC_ARTICLES.length; i++) {
    if (BLOG_DYNAMIC_ARTICLES[i].slug === article.slug) {
      idx = i;
      break;
    }
  }
  if (idx >= 0) BLOG_DYNAMIC_ARTICLES[idx] = article;
  else BLOG_DYNAMIC_ARTICLES.push(article);
  return article;
}

function fetchDynamicBlogArticles() {
  if (BLOG_DYNAMIC_LOADED) {
    return Promise.resolve(BLOG_DYNAMIC_ARTICLES);
  }
  if (BLOG_DYNAMIC_LOADING) return BLOG_DYNAMIC_LOADING;

  var base = blogArticlesApiBase();
  if (!base) {
    BLOG_DYNAMIC_LOADED = true;
    return Promise.resolve(BLOG_DYNAMIC_ARTICLES);
  }

  BLOG_DYNAMIC_LOADING = fetch(base + "/api/articles", {
    headers: { Accept: "application/json" }
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      if (json && json.success && json.data && json.data.articles) {
        json.data.articles.forEach(registerDynamicArticleCache);
      }
      BLOG_DYNAMIC_LOADED = true;
      return BLOG_DYNAMIC_ARTICLES;
    })
    .catch(function () {
      BLOG_DYNAMIC_FETCH_ERROR = true;
      BLOG_DYNAMIC_LOADED = true;
      return BLOG_DYNAMIC_ARTICLES;
    })
    .finally(function () {
      BLOG_DYNAMIC_LOADING = null;
    });

  return BLOG_DYNAMIC_LOADING;
}

function withDynamicBlogArticles(done) {
  return fetchDynamicBlogArticles().then(function () {
    if (done) done();
    return BLOG_DYNAMIC_ARTICLES;
  });
}

function getMergedBlogArticles() {
  var staticSlugs = {};
  BLOG_ARTICLES.forEach(function (a) {
    staticSlugs[a.slug] = true;
  });
  var dynamic = BLOG_DYNAMIC_ARTICLES.filter(function (a) {
    return !staticSlugs[a.slug];
  });
  return BLOG_ARTICLES.concat(dynamic);
}

function isBlogPreviewMode() {
  try {
    return new URLSearchParams(location.search || "").get("preview") === "1";
  } catch (e) {
    return false;
  }
}

function getAdminPreviewToken() {
  var sess = window.MRBILL_ADMIN_SESSION;
  return sess ? sess.getToken() : "";
}

function isArticlePublicOnSite(article) {
  if (!article) return false;
  if (article.status === "published") return true;
  if (article.status === "scheduled" && article.publishedAt) {
    var t = new Date(String(article.publishedAt).replace(" ", "T"));
    return !isNaN(t.getTime()) && t.getTime() <= Date.now();
  }
  return false;
}

function fetchAdminDraftArticles() {
  var token = getAdminPreviewToken();
  var base = blogArticlesApiBase();
  if (!token || !base) return Promise.resolve([]);
  return fetch(base + "/api/admin/articles", {
    headers: { Accept: "application/json", Authorization: "Bearer " + token }
  })
    .then(function (res) {
      return res.json().then(function (json) {
        if (!res.ok || !json.success) return [];
        return json.data.articles || [];
      });
    })
    .catch(function () {
      return [];
    });
}

function blogArticlePreviewHref(article) {
  var path =
    "post.html?slug=" + encodeURIComponent(article.slug) + "&preview=1";
  if (isBlogSectionPath()) return path;
  return "blog/" + path;
}

function getAdminPrivateArticles(articles) {
  return (articles || [])
    .map(function (row) {
      return normalizeDynamicArticle(row);
    })
    .filter(function (a) {
      return (
        a &&
        a.slug &&
        !isStaticBlogSlug(a.slug) &&
        a.status !== "archived" &&
        !isArticlePublicOnSite(a)
      );
    });
}

function renderBlogAdminStatusBadge(status) {
  var labels = { draft: "草稿預覽", scheduled: "排程預覽" };
  return (
    '<span class="blog-list-badge blog-list-badge--draft" title="僅管理員可見">' +
    escapeBlogHtml(labels[status] || "預覽") +
    "</span>"
  );
}

function renderAdminDraftStrip(articles) {
  var mount = document.getElementById("blog-admin-draft-strip");
  if (!mount) return;
  var privateOnes = getAdminPrivateArticles(articles);
  if (!privateOnes.length) {
    mount.classList.add("hidden");
    mount.innerHTML = "";
    return;
  }
  mount.classList.remove("hidden");
  mount.classList.add("blog-list-mount");

  var ctxBase = { showNewBadge: false, previewMode: true };
  var parts = [
    '<div class="rounded-2xl border border-amber-200 bg-amber-50 p-4 md:p-5 mb-6">' +
      '<p class="text-sm font-bold text-amber-900">管理員預覽區（僅你可見）</p>' +
      '<p class="blog-admin-draft-strip__note mt-2">' +
      '<a href="' +
      escapeBlogHtml(blogAssetHref("admin.html")) +
      '">回到後台</a>　·　' +
      "下方卡片與讀者列表相同版型；改「已上架」並儲存後，才會出現在下方公開列表。" +
      "</p></div>"
  ];

  var sections = partitionBlogListByStyle(privateOnes, { variant: "auto" });
  if (sections.full.length) {
    parts.push('<div class="blog-list-block blog-list-block--featured">');
    sections.full.forEach(function (a) {
      parts.push(renderBlogArticleCardFull(a, ctxBase));
    });
    parts.push("</div>");
  }
  if (sections.compact.length) {
    parts.push('<div class="blog-list-block blog-list-block--compact">');
    sections.compact.forEach(function (a) {
      parts.push(renderBlogArticleCardCompact(a, ctxBase));
    });
    parts.push("</div>");
  }

  mount.innerHTML = parts.join("");
}

function isBlogPostShellPath() {
  var p = (location.pathname || "").replace(/\\/g, "/").toLowerCase();
  return /\/blog\/post\.html$/.test(p);
}

/** 分類對應的站內學程／專區連結（右欄「延伸」區塊） */
const BLOG_CATEGORY_LINKS = {
  "AI學習地圖": { href: "../ai-learning-map.html", label: "AI 學習地圖" },
  "生活觀察": { href: "index.html", label: "生活觀察" },
  "互動練習": { href: "../ai-practice.html", label: "互動練習" },
  "設計工具": { href: "../design-toolkit.html", label: "設計工具箱" }
};

const BLOG_SITE_LINKS = [
  { href: "index.html", label: "文章筆記" },
  { href: "../ai-practice.html", label: "互動練習" }
];

/**
 * 列表呈現門檻（單一來源，各頁 preset 共用）
 *
 * 標籤策略：
 * - NEW：發布 newWithinDays 內且此裝置未讀（開啟文章頁即標記已讀）
 * - 熱門：暫不啟用；等喜歡數穩定後再開（見 popularMinLikes，需列表打 API）
 */
const BLOG_LIST_CONFIG = {
  newWithinDays: 30,
  indexFullCardMax: 3,
  indexFeaturedCount: 1,
  embedLimit: 2,
  popularMinLikes: 50
};

/** 無封面時使用的 Unsplash 免費圖（與站內其他頁相同來源） */
const BLOG_FALLBACK_COVERS = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
];

var BLOG_DYNAMIC_FETCH_ERROR = false;

function blogCoverSeedHash(str) {
  var h = 0;
  var s = String(str || "blog");
  for (var i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function blogResolveCover(article) {
  if (!article) return BLOG_FALLBACK_COVERS[0];
  var cover = String(article.cover || "").trim();
  if (cover) return cover;
  var key = article.slug || article.title || "blog";
  return BLOG_FALLBACK_COVERS[blogCoverSeedHash(key) % BLOG_FALLBACK_COVERS.length];
}

const BLOG_READ_STORAGE_KEY = "mrbill-blog-read-v1";

function readBlogReadMap() {
  try {
    var raw = localStorage.getItem(BLOG_READ_STORAGE_KEY);
    if (!raw) return {};
    var map = JSON.parse(raw);
    return map && typeof map === "object" ? map : {};
  } catch (e) {
    return {};
  }
}

function writeBlogReadMap(map) {
  try {
    localStorage.setItem(BLOG_READ_STORAGE_KEY, JSON.stringify(map));
  } catch (e) {}
}

function pruneBlogReadMap(map) {
  var valid = {};
  var known = {};
  getMergedBlogArticles().forEach(function (a) {
    known[a.slug] = true;
  });
  Object.keys(map).forEach(function (slug) {
    if (known[slug]) valid[slug] = map[slug];
  });
  return valid;
}

function hasBlogArticleBeenRead(slug) {
  if (!slug) return false;
  return Object.prototype.hasOwnProperty.call(readBlogReadMap(), slug);
}

/** 開啟文章頁時標記已讀（僅影響此瀏覽器／裝置） */
function markBlogArticleRead(slug) {
  slug = slug || getCurrentBlogSlug();
  if (!slug || !getBlogArticleBySlug(slug)) return false;
  var map = pruneBlogReadMap(readBlogReadMap());
  if (!map[slug]) {
    map[slug] = Date.now();
    writeBlogReadMap(map);
  }
  syncBlogNavNewIndicator();
  return true;
}

function isBlogArticleUnreadNew(article) {
  if (!article) return false;
  return isBlogArticleNew(article) && !hasBlogArticleBeenRead(article.slug);
}

function getUnreadNewBlogArticles() {
  return filterBlogArticles().filter(isBlogArticleUnreadNew);
}

function hasUnreadNewBlogArticles() {
  return getUnreadNewBlogArticles().length > 0;
}

/** 各頁預設；呼叫端用 preset 名稱即可，不必重複寫 variant/limit */
const BLOG_LIST_PRESETS = {
  index: { variant: "auto" },
  embed: {
    variant: "compact",
    limit: BLOG_LIST_CONFIG.embedLimit,
    viewAllLink: true
  }
};

function isBlogSectionPath() {
  var p = (location.pathname || "").replace(/\\/g, "/").toLowerCase();
  return /\/blog(\/|$)/.test(p) || p.endsWith("/blog");
}

/** blog/ = 1、blog/slug/ = 2（用於相對路徑） */
function blogPathDepth() {
  var p = (location.pathname || "").replace(/\\/g, "/").toLowerCase();
  if (!/\/blog(\/|$)/.test(p) && !p.endsWith("/blog")) return 0;
  if (/\/blog\/index\.html$/.test(p) || /\/blog\/?$/.test(p)) return 1;
  if (/\/blog\/post\.html$/i.test(p)) return 1;
  if (/\/blog\/[^/]+\/index\.html$/.test(p)) return 2;
  if (/\/blog\/[^/]+\.html$/i.test(p)) return 1;
  if (/\/blog\/([^/]+)\/?$/.test(p)) {
    var slugPart = p.match(/\/blog\/([^/]+)\/?$/);
    if (slugPart && slugPart[1] !== "index" && slugPart[1] !== "post") return 2;
  }
  return 1;
}

function blogAssetPrefix() {
  var d = blogPathDepth();
  if (d <= 0) return "";
  var out = "";
  for (var i = 0; i < d; i++) out += "../";
  return out;
}

function blogSiblingPrefix() {
  var d = blogPathDepth();
  if (d <= 1) return "";
  var out = "";
  for (var i = 1; i < d; i++) out += "../";
  return out;
}

function fixBlogNavPathsFromSubdir() {
  var header = document.getElementById("global-header");
  var footer = document.getElementById("global-footer");
  var prefix = blogAssetPrefix();
  [header, footer].forEach(function (root) {
    if (!root) return;
    root.querySelectorAll("a[href]").forEach(function (a) {
      var h = a.getAttribute("href");
      if (!h || /^https?:\/\//.test(h) || h.startsWith("#") || h.startsWith("../") || h.startsWith("/")) {
        return;
      }
      if (h.startsWith("./")) a.setAttribute("href", prefix + h.slice(2));
      else a.setAttribute("href", prefix + h);
    });
  });
}

function getCurrentBlogSlug() {
  try {
    var fromQuery = new URLSearchParams(location.search || "").get("slug");
    if (fromQuery) return decodeURIComponent(fromQuery);
  } catch (e) {}
  var p = (location.pathname || "").replace(/\\/g, "/");
  var mNested = p.match(/\/blog\/([^/]+)\/index\.html$/i);
  if (mNested) {
    var slugNested = decodeURIComponent(mNested[1]);
    if (slugNested.toLowerCase() === "index" || slugNested.toLowerCase() === "post") return null;
    return slugNested;
  }
  var mFlat = p.match(/\/blog\/([^/]+)\.html$/i);
  if (mFlat) {
    var slugFlat = decodeURIComponent(mFlat[1]);
    if (slugFlat.toLowerCase() === "index" || slugFlat.toLowerCase() === "post") return null;
    return slugFlat;
  }
  var mDir = p.match(/\/blog\/([^/]+)\/?$/i);
  if (mDir) {
    var slugDir = decodeURIComponent(mDir[1]);
    if (slugDir.toLowerCase() === "index" || slugDir.toLowerCase() === "post") return null;
    if (/\.html$/i.test(slugDir)) return null;
    return slugDir;
  }
  return null;
}

function isBlogIndexPath() {
  var p = (location.pathname || "").replace(/\\/g, "/").toLowerCase();
  if (/\/blog\/index\.html$/.test(p)) return true;
  if (/\/blog\/?$/.test(p)) return true;
  return false;
}

function getBlogArticleBySlug(slug) {
  if (!slug) return null;
  var staticArticle = BLOG_ARTICLES.find(function (a) {
    return a.slug === slug;
  });
  if (staticArticle) return staticArticle;
  return (
    BLOG_DYNAMIC_ARTICLES.find(function (a) {
      return a.slug === slug;
    }) || null
  );
}

function getLatestBlogArticle() {
  return filterBlogArticles()[0] || null;
}

function blogCoverAbsoluteUrl(coverOrArticle) {
  var cover =
    coverOrArticle && typeof coverOrArticle === "object"
      ? blogResolveCover(coverOrArticle)
      : coverOrArticle || "";
  if (typeof window.mrbillSeoAbsUrl === "function") {
    return window.mrbillSeoAbsUrl(cover);
  }
  if (!cover) return "";
  if (/^https?:\/\//.test(cover)) return cover;
  return blogSeoOrigin() + "/" + cover.replace(/^\//, "");
}

function preloadBlogArticleCover(article) {
  if (!article) return;
  var href = blogAssetHref(blogResolveCover(article));
  if (!href || document.querySelector("link[data-blog-cover-preload]")) return;
  var link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = href;
  link.setAttribute("data-blog-cover-preload", "1");
  document.head.appendChild(link);
}

function blogArticleCanonicalPath(article) {
  if (!article || !article.slug) return "/blog/";
  if (isStaticBlogSlug(article.slug)) {
    return "/blog/" + article.slug + ".html";
  }
  return "/blog/" + article.slug + "/";
}

function blogArticleCanonicalUrl(article) {
  var path = blogArticleCanonicalPath(article);
  if (typeof window.mrbillSeoAbsUrl === "function") {
    return window.mrbillSeoAbsUrl(path);
  }
  return blogSeoOrigin() + path;
}

function blogArticlesApiBase() {
  return (
    (typeof window !== "undefined" && window.BLOG_ARTICLES_API) ||
    "https://mrbill-stats.billhuang19get.workers.dev"
  );
}

function blogArticleShareUrl(article) {
  return blogArticleCanonicalUrl(article);
}

function truncateBlogSeoText(text, max) {
  max = max || 500;
  var t = String(text || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trim() + "…";
}

function extractFaqItemsFromRoot(root) {
  if (!root) return [];
  var items = [];
  root.querySelectorAll(".blog-faq details, .blog-faq__item").forEach(function (node) {
    var qEl = node.querySelector("summary, .blog-faq__q");
    var aEl = node.querySelector(".blog-faq__a") || node.querySelector("p");
    var question = qEl ? truncateBlogSeoText(qEl.textContent, 200) : "";
    var answer = aEl ? truncateBlogSeoText(aEl.textContent, 500) : "";
    if (question && answer) items.push({ question: question, answer: answer });
  });
  return items;
}

function extractFaqFromHtml(html) {
  if (!html) return [];
  var wrap = document.createElement("div");
  wrap.innerHTML = html;
  return extractFaqItemsFromRoot(wrap);
}

function extractFaqFromDom() {
  var main = document.querySelector(".blog-main.blog-prose");
  return extractFaqItemsFromRoot(main);
}

function pageHasJsonLdType(type) {
  var scripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (var i = 0; i < scripts.length; i++) {
    try {
      var data = JSON.parse(scripts[i].textContent || "{}");
      if (data["@type"] === type) return true;
      if (Array.isArray(data["@graph"])) {
        for (var j = 0; j < data["@graph"].length; j++) {
          if (data["@graph"][j] && data["@graph"][j]["@type"] === type) return true;
        }
      }
    } catch (e) {}
  }
  return false;
}

function setBlogJsonLd(data, id) {
  if (!data || typeof window.mrbillSeoSetJsonLd !== "function") return;
  window.mrbillSeoSetJsonLd(data, id);
}

function buildBlogArticleJsonLd(article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title || article.slug,
    description: article.excerpt || article.subtitle || "",
    image: blogCoverAbsoluteUrl(article),
    author: {
      "@type": "Person",
      name: article.author || "Mr.Bill"
    },
    datePublished: article.date || undefined,
    inLanguage: "zh-Hant",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogArticleCanonicalUrl(article)
    },
    publisher: {
      "@type": "Organization",
      name: blogSeoSiteName()
    }
  };
}

function buildBlogFaqJsonLd(items) {
  if (!items || !items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(function (item) {
      return {
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      };
    })
  };
}

function blogArticleOgTitle(article) {
  if (!article) return "";
  var title = String(article.title || "").trim();
  var subtitle = String(article.subtitle || "").trim();
  if (!title) return "";
  if (title.indexOf("｜") !== -1 || title.indexOf("|") !== -1) return title;
  if (subtitle) return title + "｜" + subtitle;
  return title;
}

function blogArticleShareOgTitle(article) {
  var base = blogArticleOgTitle(article);
  var site = blogSeoSiteName();
  if (!base) return site;
  var suffix = " — " + site;
  if (base.slice(-suffix.length) === suffix || base.indexOf(suffix) !== -1) return base;
  return base + suffix;
}

function applyBlogArticleKeywords(article) {
  var tags = article.tags;
  if (!tags || !tags.length || typeof window.mrbillSeoSetMeta !== "function") return;
  var existing = document.querySelector('meta[name="keywords"]');
  if (existing && existing.getAttribute("content")) return;
  window.mrbillSeoSetMeta("keywords", tags.join(", "));
}

function applyBlogArticleStructuredData(article, options) {
  options = options || {};
  if (!article) return;

  if (!pageHasJsonLdType("Article")) {
    setBlogJsonLd(buildBlogArticleJsonLd(article), "site-seo-article-jsonld");
  }

  if (!pageHasJsonLdType("FAQPage")) {
    var faqItems =
      (options.faqItems && options.faqItems.length && options.faqItems) ||
      extractFaqFromHtml(options.contentHtml) ||
      extractFaqFromDom();
    var faqLd = buildBlogFaqJsonLd(faqItems);
    if (faqLd) setBlogJsonLd(faqLd, "site-seo-faq-jsonld");
  }

  applyBlogArticleKeywords(article);
}

function applyBlogArticleHead(article, options) {
  if (!article || typeof window.applySiteSeo !== "function") return;
  options = options || {};
  preloadBlogArticleCover(article);
  window.applySiteSeo({
    title: article.title,
    description: article.excerpt,
    ogTitle: blogArticleShareOgTitle(article),
    ogDescription: article.excerpt,
    ogImage: blogResolveCover(article),
    ogImageAlt: article.title || "Mr.Bill 文章筆記",
    type: "article",
    path: blogArticleCanonicalPath(article),
    skipOrganization: true
  });
  if (isBlogPreviewMode() && typeof window.mrbillSeoSetMeta === "function") {
    window.mrbillSeoSetMeta("robots", "noindex,nofollow");
  }
  applyBlogArticleStructuredData(article, options);
}

function shouldShowBlogSeoPanel() {
  return !!getAdminPreviewToken();
}

function collectBlogArticleSeoSnapshot(article, options) {
  options = options || {};
  var cover = blogResolveCover(article);
  var faqItems =
    extractFaqFromHtml(options.contentHtml) ||
    extractFaqFromDom();
  var ogImageEl = document.querySelector('meta[property="og:image"]');
  var canonicalEl = document.querySelector('link[rel="canonical"]');
  return {
    documentTitle: document.title || "",
    description:
      (document.querySelector('meta[name="description"]') || {}).content ||
      article.excerpt ||
      "",
    canonical: (canonicalEl && canonicalEl.href) || blogArticleCanonicalUrl(article),
    shareUrl: blogArticleShareUrl(article),
    ogTitle:
      (document.querySelector('meta[property="og:title"]') || {}).content ||
      article.title ||
      "",
    ogDescription:
      (document.querySelector('meta[property="og:description"]') || {}).content ||
      article.excerpt ||
      "",
    ogTitle:
      (document.querySelector('meta[property="og:title"]') || {}).content ||
      blogArticleShareOgTitle(article) ||
      "",
    ogImage: (ogImageEl && ogImageEl.content) || blogCoverAbsoluteUrl(cover),
    ogImageSource: String(article.cover || "").trim() ? "後台封面欄位" : "依 slug 自動配圖",
    hasStaticBody: !!document.getElementById("blog-static-content"),
    hasArticleLd:
      !!document.getElementById("site-seo-article-jsonld") ||
      pageHasJsonLdType("Article"),
    hasFaqLd:
      !!document.getElementById("site-seo-faq-jsonld") || pageHasJsonLdType("FAQPage"),
    faqCount: faqItems.length,
    keywords:
      (document.querySelector('meta[name="keywords"]') || {}).content || ""
  };
}

function renderBlogSeoPreviewPanel(article, options) {
  if (!shouldShowBlogSeoPanel() || !article) return;
  var panelId = "blog-seo-preview-panel";
  var existing = document.getElementById(panelId);
  if (existing) existing.remove();

  var snap = collectBlogArticleSeoSnapshot(article, options);
  var panel = document.createElement("aside");
  panel.id = panelId;
  panel.className = "blog-seo-preview-panel";
  panel.setAttribute("aria-label", "SEO 檢查（僅管理員）");

  panel.innerHTML =
    '<details class="blog-seo-preview-panel__box" open>' +
    '<summary class="blog-seo-preview-panel__summary">SEO／分享預覽檢查 <span class="blog-seo-preview-panel__badge">僅管理員</span></summary>' +
    '<div class="blog-seo-preview-panel__body">' +
    '<p class="blog-seo-preview-panel__note">已上架文會自動同步 <code>blog/{slug}/</code>（OG、h1、完整正文寫入靜態 HTML，檢視原始碼可見）。正式分享請用下方 canonical／網址列，勿貼 <code>post.html?slug=</code>。修改正文後請再儲存一次以更新 GitHub 靜態頁。</p>' +
    '<dl class="blog-seo-preview-panel__list">' +
    "<dt>分頁 title</dt><dd>" +
    escapeBlogHtml(snap.documentTitle) +
    "</dd>" +
    "<dt>og:title</dt><dd>" +
    escapeBlogHtml(snap.ogTitle) +
    "</dd>" +
    "<dt>description</dt><dd>" +
    escapeBlogHtml(snap.description) +
    "</dd>" +
    "<dt>canonical</dt><dd><code>" +
    escapeBlogHtml(snap.canonical) +
    "</code></dd>" +
    "<dt>靜態正文</dt><dd>" +
    (snap.hasStaticBody
      ? "本頁已嵌入（爬蟲可直接讀）"
      : "本頁由 API 載入（預覽／post.html；上架後以 blog/{slug}/ 為準）") +
    "</dd>" +
    "<dt>og:image</dt><dd><code>" +
    escapeBlogHtml(snap.ogImage) +
    '</code> <span class="blog-seo-preview-panel__hint">(' +
    escapeBlogHtml(snap.ogImageSource) +
    ")</span></dd>" +
    "<dt>Article 結構化</dt><dd>" +
    (snap.hasArticleLd ? "已注入" : "未偵測") +
    "</dd>" +
    "<dt>FAQ 結構化</dt><dd>" +
    (snap.faqCount
      ? "已萃取 " + snap.faqCount + " 題" + (snap.hasFaqLd ? "（JSON-LD 已注入）" : "")
      : "正文尚無 .blog-faq 區塊") +
    "</dd>" +
    (snap.keywords
      ? "<dt>keywords</dt><dd>" + escapeBlogHtml(snap.keywords) + "</dd>"
      : "") +
    "</dl>" +
    (snap.ogImage
      ? '<img class="blog-seo-preview-panel__thumb" src="' +
        escapeBlogHtml(snap.ogImage) +
        '" alt="OG 顯圖預覽" loading="lazy" />'
      : "") +
    '<p class="blog-seo-preview-panel__tools">驗證工具（貼 canonical 或網址列）：' +
    '<a href="https://developers.facebook.com/tools/debug/?q=' +
    encodeURIComponent(snap.canonical) +
    '" target="_blank" rel="noopener noreferrer">Meta 分享偵錯</a> · ' +
    '<a href="https://search.google.com/test/rich-results?url=' +
    encodeURIComponent(snap.canonical) +
    '" target="_blank" rel="noopener noreferrer">Google 複雜結果（用 canonical）</a>' +
    "</p>" +
    "</div></details>";

  var anchor = document.getElementById("blog-preview-banner");
  if (anchor && anchor.parentNode) {
    anchor.parentNode.insertBefore(panel, anchor.nextSibling);
  } else {
    var header = document.getElementById("global-header");
    if (header && header.parentNode) {
      header.parentNode.insertBefore(panel, header);
    } else {
      document.body.insertBefore(panel, document.body.firstChild);
    }
  }
}

function applyBlogIndexHead() {
  if (typeof window.applySiteSeo !== "function") return;
  window.applySiteSeo({
    pageId: "blog-index",
    title: BLOG_INDEX.title,
    description: BLOG_INDEX.description,
    ogDescription: BLOG_INDEX.description,
    path: "/blog/"
  });
}

function blogArticleHref(article) {
  var sibling = blogSiblingPrefix();
  if (!article || !article.slug) {
    return isBlogSectionPath() ? sibling + "index.html" : "blog/index.html";
  }
  if (isStaticBlogSlug(article.slug)) {
    var staticPath = article.slug + ".html";
    return isBlogSectionPath() ? sibling + staticPath : "blog/" + staticPath;
  }
  var dynamicPath = "post.html?slug=" + encodeURIComponent(article.slug);
  return isBlogSectionPath() ? sibling + dynamicPath : "blog/" + dynamicPath;
}

function blogAssetHref(path) {
  if (!path) return "";
  var prefix = blogAssetPrefix();
  if (prefix && !/^(https?:|\/|\.\.\/)/.test(path)) {
    return prefix + path.replace(/^\//, "");
  }
  return path;
}

/** 依字數估算的一般閱讀時間（readMins），非影片長度 */
function formatReadDuration(mins) {
  if (!mins) return "";
  return "預估閱讀 " + mins + " 分鐘";
}

function renderBlogHeroReadTime(mountId, slug) {
  var el = document.getElementById(mountId || "blog-hero-read-time");
  if (!el) return;
  var article = getBlogArticleBySlug(slug || getCurrentBlogSlug());
  if (!article || !article.readMins) return;
  el.textContent = formatReadDuration(article.readMins);
  el.setAttribute("title", "依字數估算的一般閱讀時間，實際長短因人而異");
}

function applyBlogTitleFont(article) {
  if (!document.body) return;
  if (document.querySelector(".rainy-family-prose")) return;
  var mode = article && article.titleFont === "serif" ? "serif" : "sans";
  document.body.classList.remove("blog-title-font-sans", "blog-title-font-serif");
  document.body.classList.add(
    mode === "serif" ? "blog-title-font-serif" : "blog-title-font-sans"
  );
}

function renderBlogArticleHero(slug, options) {
  options = options || {};
  var article = getBlogArticleBySlug(slug || getCurrentBlogSlug());
  if (!article) return;

  if (options.staticPublished || isStaticPublishedArticlePage()) {
    applyBlogTitleFont(article);
    applyBlogArticleHead(article, options);
    if (shouldShowBlogSeoPanel()) {
      requestAnimationFrame(function () {
        renderBlogSeoPreviewPanel(article, options);
      });
    }
    return;
  }

  applyBlogTitleFont(article);

  var cover = document.getElementById("blog-hero-cover");
  if (cover) {
    cover.src = blogAssetHref(blogResolveCover(article));
    cover.alt = article.title;
  }

  var tags = document.getElementById("blog-hero-tags");
  if (tags) {
    tags.innerHTML =
      '<span class="blog-hero__tag">' +
      escapeBlogHtml(article.label || article.category) +
      "</span>";
  }

  var title = document.getElementById("blog-hero-title");
  if (title) title.textContent = article.title;

  var subtitle = document.getElementById("blog-hero-subtitle");
  if (subtitle) {
    subtitle.textContent = article.subtitle || article.excerpt || "";
  }

  var authorDate = document.getElementById("blog-hero-author-date");
  if (authorDate) {
    authorDate.textContent =
      (article.author || "Mr.Bill") + " · " + (article.date || "");
  }

  renderBlogHeroReadTime("blog-hero-read-time", article.slug);

  var crumb = document.getElementById("blog-hero-breadcrumb-title");
  if (crumb) crumb.textContent = article.title;

  applyBlogArticleHead(article, options);
  if (shouldShowBlogSeoPanel()) {
    requestAnimationFrame(function () {
      renderBlogSeoPreviewPanel(article, options);
    });
  }
}

function renderBlogIndexHero() {
  applyBlogIndexHead();

  var title = document.getElementById("blog-index-hero-title");
  if (title) title.textContent = BLOG_INDEX.title;

  var subtitleShort = document.getElementById("blog-index-hero-subtitle-short");
  if (subtitleShort) subtitleShort.textContent = BLOG_INDEX.subtitleShort || BLOG_INDEX.subtitle;

  var subtitle = document.getElementById("blog-index-hero-subtitle");
  if (subtitle) subtitle.textContent = BLOG_INDEX.subtitle;

  var subtitleMobile = document.getElementById("blog-index-hero-subtitle-mobile");
  if (subtitleMobile) subtitleMobile.textContent = BLOG_INDEX.subtitle;

  var tag = document.getElementById("blog-index-hero-tag");
  if (tag) tag.textContent = BLOG_INDEX.tag;

  var coverEl = document.getElementById("blog-index-hero-cover");
  var coverPath = BLOG_INDEX.heroCover;
  if (!coverPath) {
    var latest = getLatestBlogArticle();
    coverPath = latest ? latest.cover : "";
  }
  if (coverEl && coverPath) {
    coverEl.src = blogAssetHref(coverPath);
    coverEl.alt = BLOG_INDEX.title;
  }
}

function escapeBlogHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isStaticPublishedArticlePage() {
  return (
    document.body &&
    document.body.getAttribute("data-static-article") === "published"
  );
}

function loadBlogArticleShell(done) {
  var heroSlot = document.getElementById("blog-article-hero-slot");
  var railSlot = document.getElementById("blog-article-rail-slot");
  if (!heroSlot && !railSlot) {
    if (done) done();
    return;
  }
  var pending = 0;
  function tick() {
    pending--;
    if (pending <= 0 && done) done();
  }
  if (heroSlot && !isStaticPublishedArticlePage()) {
    pending++;
    includeComponentSlot(
      "blog-article-hero-slot",
      blogAssetHref("components/blog-article-hero.html"),
      null,
      tick
    );
  }
  if (railSlot) {
    pending++;
    includeComponentSlot(
      "blog-article-rail-slot",
      blogAssetHref("components/blog-article-rail.html"),
      null,
      tick
    );
  }
  if (pending === 0 && done) done();
}

function initBlogArticlePage(slug, options) {
  slug = slug || getCurrentBlogSlug();
  options = options || {};
  markBlogArticleRead(slug);
  loadBlogArticleShell(function () {
    renderBlogArticleHero(slug, options);
    renderBlogArticleRail("blog-article-rail", slug);
    renderBlogArticleNav(slug);
    if (typeof window.initBlogStats === "function") {
      window.initBlogStats(slug);
    }
    if (typeof window.initBlogArticleUI === "function") {
      window.initBlogArticleUI(slug);
    }
    var art = getBlogArticleBySlug(slug);
    if (art) initBlogArticleShare(art);
  });
}

function injectDynamicArticleContent(contentHtml) {
  var main = document.querySelector(".blog-main.blog-prose");
  if (!main) return;
  var loading = document.getElementById("blog-dynamic-loading");
  if (loading) loading.remove();
  var navSlot = document.getElementById("blog-article-nav-slot");
  var authorSlot = document.getElementById("blog-article-author-slot");
  Array.prototype.slice.call(main.children).forEach(function (node) {
    if (node === navSlot || node === authorSlot) return;
    if (node.getAttribute && node.getAttribute("data-dynamic-content") === "1") {
      node.remove();
    }
  });
  var temp = document.createElement("div");
  temp.innerHTML =
    contentHtml || '<p class="text-slate-500" data-dynamic-content="1">（尚無正文）</p>';
  var nodes = Array.prototype.slice.call(temp.childNodes);
  nodes.forEach(function (node) {
    if (node.nodeType === 1) node.setAttribute("data-dynamic-content", "1");
    if (navSlot) main.insertBefore(node, navSlot);
    else main.appendChild(node);
  });
}

function showDynamicPreviewBanner(article) {
  var el = document.getElementById("blog-preview-banner");
  if (!el || !article) return;
  var statusMap = {
    draft: "草稿預覽",
    scheduled: "排程預覽",
    published: "已上架預覽",
    archived: "已下架預覽"
  };
  el.textContent =
    (statusMap[article.status] || "預覽模式") +
    "：僅管理員可見，讀者看不到此狀態下的內容。";
  el.classList.remove("hidden");
}

function showDynamicArticleError(message, options) {
  options = options || {};
  var loading = document.getElementById("blog-dynamic-loading");
  if (!loading) return;
  var extra = "";
  if (options.showAdminLink) {
    if (getAdminPreviewToken()) {
      extra =
        '<p class="mt-4 text-sm text-slate-600 leading-relaxed">' +
        "已偵測登入狀態，但預覽仍失敗。請回後台重新輸入密碼，再按「預覽前台」。" +
        '　<a class="font-bold text-indigo-600 underline" href="' +
        escapeBlogHtml(blogAssetHref("admin.html")) +
        '">回到後台</a>' +
        '　·　<a class="font-bold text-slate-700 underline" href="' +
        escapeBlogHtml(blogSiblingPrefix() + "index.html") +
        '">文章列表</a>' +
        "</p>";
    } else {
      extra =
        '<p class="mt-4 text-sm text-slate-600">' +
        '<a class="font-bold text-indigo-600 underline" href="' +
        escapeBlogHtml(blogAssetHref("admin.html")) +
        '">前往後台登入</a>' +
        '　·　<a class="font-bold text-slate-700 underline" href="' +
        escapeBlogHtml(blogSiblingPrefix() + "index.html") +
        '">文章列表</a>' +
        "</p>";
    }
  }
  loading.innerHTML =
    '<div class="max-w-lg mx-auto text-center">' +
    '<p class="text-sm text-rose-600">' +
    escapeBlogHtml(message || "無法載入文章") +
    "</p>" +
    extra +
    "</div>";
  loading.className = "py-8";
}

function fetchBlogArticleForPage(slug, preview) {
  var base = blogArticlesApiBase();
  if (!base) return Promise.reject(new Error("未設定 BLOG_ARTICLES_API"));
  var path = preview
    ? "/api/admin/articles/" + encodeURIComponent(slug)
    : "/api/articles/" + encodeURIComponent(slug);
  var headers = { Accept: "application/json" };
  if (preview) {
    var token = getAdminPreviewToken();
    if (!token) {
      return Promise.reject(
        new Error("預覽草稿請先在 admin.html 登入，再從後台按「預覽前台」")
      );
    }
    headers.Authorization = "Bearer " + token;
  }
  return fetch(base + path, { headers: headers })
    .then(function (res) {
      return res.json().then(function (json) {
        if (!res.ok || !json.success) {
          var msg = (json && json.message) || "Not found";
          if (!preview && (msg === "Not found" || res.status === 404)) {
            throw new Error(
              "文章尚未上架或不存在。草稿請從後台按「預覽前台」；已上架請確認狀態為「已上架」並已儲存。"
            );
          }
          throw new Error(msg === "Unauthorized" ? "預覽權限不足，請重新登入後台" : msg);
        }
        return json.data.article;
      });
    });
}

function initBlogArticleShare(article) {
  if (isBlogPreviewMode()) return;
  if (article && article.status && article.status !== "published") return;

  var mount = document.getElementById("blog-article-author-slot");
  if (!mount || document.getElementById("blog-share-bar")) return;

  var shareUrl = blogArticleShareUrl(article);

  var bar = document.createElement("div");
  bar.id = "blog-share-bar";
  bar.className = "blog-share-bar";
  bar.setAttribute("aria-label", "分享此文章");

  bar.innerHTML =
    '<button type="button" class="blog-share-bar__btn" id="blog-share-copy-btn">複製連結分享</button>' +
    '<button type="button" class="blog-share-bar__btn blog-share-bar__btn--ghost" id="blog-share-native-btn">分享…</button>' +
    '<p class="blog-share-bar__toast hidden" id="blog-share-toast" role="status"></p>';

  mount.parentNode.insertBefore(bar, mount);

  function showToast(msg) {
    var toast = document.getElementById("blog-share-toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove("hidden");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.add("hidden");
    }, 2400);
  }

  function copyUrl() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(shareUrl).then(function () {
        showToast("已複製連結，可直接貼到 Facebook / LINE");
      });
    }
    showToast("請複製網址列：" + shareUrl);
    return Promise.resolve();
  }

  var copyBtn = document.getElementById("blog-share-copy-btn");
  if (copyBtn) copyBtn.addEventListener("click", copyUrl);

  var nativeBtn = document.getElementById("blog-share-native-btn");
  if (nativeBtn) {
    if (typeof navigator.share === "function") {
      nativeBtn.addEventListener("click", function () {
        navigator
          .share({
            title: (article && blogArticleShareOgTitle(article)) || document.title || "",
            url: shareUrl
          })
          .catch(function () {});
      });
    } else {
      nativeBtn.hidden = true;
    }
  }
}

function initStaticPublishedBlogArticlePage() {
  var slug = getCurrentBlogSlug();
  if (!slug) {
    showDynamicArticleError("無法辨識文章 slug");
    return;
  }
  var article = null;
  var dataEl = document.getElementById("blog-static-article-data");
  if (dataEl && dataEl.textContent) {
    try {
      article = JSON.parse(dataEl.textContent);
    } catch (e) {}
  }
  if (!article) article = { slug: slug, status: "published" };
  var staticRoot = document.getElementById("blog-static-content");
  if (staticRoot) {
    article = Object.assign({}, article, { contentHtml: staticRoot.innerHTML });
  }
  registerDynamicArticleCache(article);
  initBlogArticlePage(slug, {
    contentHtml: article.contentHtml,
    staticPublished: true
  });
}

function initDynamicBlogArticlePage() {
  if (document.getElementById("blog-static-content")) {
    initStaticPublishedBlogArticlePage();
    return;
  }
  var slug = getCurrentBlogSlug();
  if (!slug) {
    showDynamicArticleError("網址缺少 slug 參數，例：post.html?slug=2026-06-10-my-post");
    return;
  }
  if (isStaticBlogSlug(slug)) {
    location.replace(slug + ".html");
    return;
  }
  var preview = isBlogPreviewMode();
  fetchBlogArticleForPage(slug, preview)
    .then(function (row) {
      registerDynamicArticleCache(row);
      injectDynamicArticleContent(row.contentHtml);
      if (preview) showDynamicPreviewBanner(row);
      initBlogArticlePage(slug, { contentHtml: row.contentHtml });
      initBlogArticleShare(row);
    })
    .catch(function (err) {
      var needsAdmin =
        preview &&
        (err.message || "").indexOf("admin.html") >= 0;
      showDynamicArticleError(err.message || "載入失敗", {
        showAdminLink: needsAdmin || preview
      });
    });
}

function renderBlogIndexList(listOptions) {
  renderBlogArticleList(
    "blog-article-list",
    Object.assign({ preset: "index" }, listOptions || {})
  );
  var mount = document.getElementById("blog-article-list");
  if (mount && BLOG_DYNAMIC_FETCH_ERROR) {
    var note = document.getElementById("blog-dynamic-fetch-note");
    if (!note) {
      note = document.createElement("p");
      note.id = "blog-dynamic-fetch-note";
      note.className = "text-xs text-amber-700 text-center mt-3";
      note.textContent =
        "動態文章暫時無法載入，以下為靜態文章。請稍後重新整理。";
      mount.insertAdjacentElement("afterend", note);
    }
  }
}

function initBlogIndexPage(listOptions) {
  renderBlogIndexHero();
  var crumb = document.getElementById("blog-index-breadcrumb-title");
  if (crumb) crumb.textContent = BLOG_INDEX.title;
  renderBlogIndexList(listOptions);
  fetchAdminDraftArticles().then(renderAdminDraftStrip);
  withDynamicBlogArticles(function () {
    renderBlogIndexList(listOptions);
    syncBlogNavNewIndicator();
    fetchAdminDraftArticles().then(renderAdminDraftStrip);
  });
}

/** 站內專區內嵌文章列表（學習地圖等） */
function initBlogEmbedList(mountId, options) {
  var mountIdResolved = mountId || "blog-article-list";
  var merged = Object.assign({ preset: "embed" }, options || {});
  renderBlogArticleList(mountIdResolved, merged);
  withDynamicBlogArticles(function () {
    renderBlogArticleList(mountIdResolved, merged);
  });
}

function blogPageHref(href) {
  if (!href) return "";
  if (isBlogSectionPath() && !/^(https?:|\/|\.\.\/|#)/.test(href)) {
    return href;
  }
  if (!isBlogSectionPath() && href === "index.html") {
    return "blog/index.html";
  }
  return href;
}

function filterBlogArticles(options) {
  options = options || {};
  var list = getMergedBlogArticles().slice();

  if (options.category) {
    list = list.filter(function (a) {
      return a.category === options.category;
    });
  }

  if (options.tag) {
    list = list.filter(function (a) {
      return (a.tags || []).indexOf(options.tag) >= 0;
    });
  }

  if (options.excludeSlug) {
    list = list.filter(function (a) {
      return a.slug !== options.excludeSlug;
    });
  }

  list.sort(function (a, b) {
    if (isBlogLegacyFeatured(a) !== isBlogLegacyFeatured(b)) {
      return isBlogLegacyFeatured(a) ? -1 : 1;
    }
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    if ((b.sortOrder || 0) !== (a.sortOrder || 0)) {
      return (b.sortOrder || 0) - (a.sortOrder || 0);
    }
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    return (b.date || "").localeCompare(a.date || "");
  });

  if (options.limit && options.limit > 0) {
    list = list.slice(0, options.limit);
  }

  return list;
}

function getRelatedArticles(slug, limit) {
  limit = limit || 4;
  var current = getBlogArticleBySlug(slug);
  if (!current) return [];

  var manual = (current.relatedSlugs || [])
    .map(function (s) {
      return getBlogArticleBySlug(s);
    })
    .filter(Boolean);

  if (manual.length >= limit) {
    return manual.slice(0, limit);
  }

  var picked = manual.slice();
  var pickedSlugs = picked.map(function (a) {
    return a.slug;
  });
  pickedSlugs.push(current.slug);

  var scored = filterBlogArticles({ excludeSlug: current.slug })
    .map(function (a) {
      var score = 0;
      if (a.category === current.category) score += 10;
      (current.tags || []).forEach(function (t) {
        if ((a.tags || []).indexOf(t) >= 0) score += 3;
      });
      return { article: a, score: score };
    })
    .filter(function (row) {
      return row.score > 0 && pickedSlugs.indexOf(row.article.slug) < 0;
    })
    .sort(function (x, y) {
      if (y.score !== x.score) return y.score - x.score;
      return (y.article.date || "").localeCompare(x.article.date || "");
    });

  scored.forEach(function (row) {
    if (picked.length >= limit) return;
    picked.push(row.article);
    pickedSlugs.push(row.article.slug);
  });

  if (picked.length < limit) {
    filterBlogArticles({ excludeSlug: current.slug }).forEach(function (a) {
      if (picked.length >= limit) return;
      if (pickedSlugs.indexOf(a.slug) >= 0) return;
      picked.push(a);
      pickedSlugs.push(a.slug);
    });
  }

  return picked.slice(0, limit);
}

function normalizeBlogListOptions(options) {
  options = options || {};
  var preset = options.preset;
  var base =
    preset && BLOG_LIST_PRESETS[preset]
      ? Object.assign({}, BLOG_LIST_PRESETS[preset])
      : {};
  var merged = Object.assign({}, base, options);
  delete merged.preset;
  if (merged.showNewBadge == null) merged.showNewBadge = true;
  if (merged.featuredCount == null) {
    merged.featuredCount = BLOG_LIST_CONFIG.indexFeaturedCount;
  }
  if (merged.viewAllLink === true) {
    merged.viewAllLink = {
      href: blogPageHref("index.html"),
      label: "查看全部文章 →"
    };
  }
  return merged;
}

function getBlogListFilterOptions(options) {
  return {
    category: options.category,
    tag: options.tag,
    excludeSlug: options.excludeSlug,
    limit: options.limit
  };
}

function getBlogArticleAgeDays(article) {
  if (!article || !article.date) return Infinity;
  var pub = new Date(article.date + "T12:00:00");
  if (isNaN(pub.getTime())) return Infinity;
  return Math.floor((Date.now() - pub.getTime()) / 86400000);
}

function isBlogArticleNew(article) {
  return getBlogArticleAgeDays(article) <= BLOG_LIST_CONFIG.newWithinDays;
}

function renderBlogListBadge(article, showNewBadge) {
  if (!showNewBadge || !isBlogArticleUnreadNew(article)) return "";
  return '<span class="blog-list-badge blog-list-badge--new" title="發布 ' +
    BLOG_LIST_CONFIG.newWithinDays +
    ' 天內，你尚未閱讀">NEW</span>';
}

function isBlogLegacyFeatured(article) {
  return !!(article && BLOG_LEGACY_FEATURED_SLUGS[article.slug]);
}

function resolveArticleListStyle(article, options, listSize) {
  if (isBlogLegacyFeatured(article)) return "full";
  var style = article.listStyle || "auto";
  if (style === "full" || style === "compact") return style;
  options = options || {};
  if (options.variant === "compact" || options.limit) return "compact";
  if (article.featured) return "full";
  if ((options.variant || "auto") === "auto") {
    if (listSize <= BLOG_LIST_CONFIG.indexFullCardMax) return "full";
    return "compact";
  }
  return "full";
}

function partitionBlogListByStyle(articles, options) {
  options = options || {};
  var full = [];
  var compact = [];
  var listSize = articles.length;
  articles.forEach(function (article) {
    if (resolveArticleListStyle(article, options, listSize) === "full") {
      full.push(article);
    } else {
      compact.push(article);
    }
  });
  return { full: full, compact: compact };
}

function renderBlogArticleBadges(article, ctx) {
  ctx = ctx || {};
  var parts = [];
  if (ctx.previewMode) {
    parts.push(renderBlogAdminStatusBadge(article.status));
    return parts.join("");
  }
  if (article.pinned) {
    parts.push(
      '<span class="blog-list-badge blog-list-badge--pinned" title="置頂">置頂</span>'
    );
  }
  if (article.badgePopular) {
    parts.push(
      '<span class="blog-list-badge blog-list-badge--popular" title="熱門">熱門</span>'
    );
  }
  if (article.badgeTrending) {
    parts.push(
      '<span class="blog-list-badge blog-list-badge--trending" title="人氣">人氣</span>'
    );
  }
  parts.push(renderBlogListBadge(article, ctx.showNewBadge));
  return parts.join("");
}

function resolveBlogListSections(articles, options) {
  var variant = options.variant || "full";
  var featuredCount = options.featuredCount;

  if (variant === "auto") {
    if (articles.length <= BLOG_LIST_CONFIG.indexFullCardMax) {
      return { full: articles, compact: [] };
    }
    return {
      full: articles.slice(0, featuredCount),
      compact: articles.slice(featuredCount)
    };
  }
  if (variant === "featured-compact") {
    return {
      full: articles.slice(0, featuredCount),
      compact: articles.slice(featuredCount)
    };
  }
  if (variant === "compact") {
    return { full: [], compact: articles };
  }
  return { full: articles, compact: [] };
}

function blogArticleCardLabel(article) {
  return article.label || article.category || "";
}

function blogArticleCardHref(article, ctx) {
  ctx = ctx || {};
  if (ctx.previewMode) return blogArticlePreviewHref(article);
  return blogArticleHref(article);
}

function renderBlogArticleCardFull(article, ctx) {
  ctx = ctx || {};
  var coverSrc = blogAssetHref(blogResolveCover(article));
  var cover =
    '<div class="blog-list-card__cover shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">' +
    '<img src="' +
    escapeBlogHtml(coverSrc) +
    '" alt="' +
    escapeBlogHtml(article.title) +
    '" class="w-full h-full object-cover" loading="lazy" width="1200" height="630" />' +
    "</div>";
  var badge = renderBlogArticleBadges(article, ctx);
  var audience = article.audience
    ? '<p class="blog-list-card__audience"><span class="blog-list-card__audience-label">適合</span>' +
      escapeBlogHtml(article.audience) +
      "</p>"
    : "";
  var btnLabel = ctx.previewMode ? "預覽文章" : "閱讀文章";
  return (
    '<article class="blog-list-card blog-list-card--full' +
    (ctx.previewMode ? " blog-list-card--admin-preview" : "") +
    '">' +
    cover +
    '<div class="blog-list-card__body min-w-0 flex-1">' +
    '<div class="blog-list-card__meta">' +
    '<span class="blog-list-card__label">' +
    escapeBlogHtml(blogArticleCardLabel(article)) +
    "</span>" +
    "<span aria-hidden=\"true\">·</span><span>" +
    escapeBlogHtml(formatReadDuration(article.readMins)) +
    "</span>" +
    badge +
    "</div>" +
    '<h3 class="blog-list-card__title">' +
    escapeBlogHtml(article.title) +
    "</h3>" +
    '<p class="blog-list-card__excerpt">' +
    escapeBlogHtml(article.excerpt || article.subtitle || "") +
    "</p>" +
    audience +
    '<a href="' +
    escapeBlogHtml(blogArticleCardHref(article, ctx)) +
    '" class="blog-list-card__btn">' +
    btnLabel +
    "</a>" +
    "</div></article>"
  );
}

function renderBlogArticleCardCompact(article, ctx) {
  ctx = ctx || {};
  var badge = renderBlogArticleBadges(article, ctx);
  return (
    '<a href="' +
    escapeBlogHtml(blogArticleCardHref(article, ctx)) +
    '" class="blog-list-card blog-list-card--compact group' +
    (ctx.previewMode ? " blog-list-card--admin-preview" : "") +
    '">' +
    '<div class="blog-list-card--compact__main">' +
    '<div class="blog-list-card--compact__meta">' +
    '<span class="blog-list-card--compact__cat">' +
    escapeBlogHtml(blogArticleCardLabel(article)) +
    "</span>" +
    "<span aria-hidden=\"true\">·</span><span>" +
    escapeBlogHtml(article.date) +
    "</span>" +
    "<span aria-hidden=\"true\">·</span><span>" +
    escapeBlogHtml(formatReadDuration(article.readMins)) +
    "</span>" +
    badge +
    "</div>" +
    '<h4 class="blog-list-card--compact__title">' +
    escapeBlogHtml(article.title) +
    "</h4>" +
    "</div>" +
    '<span class="blog-list-card--compact__arrow" aria-hidden="true">→</span>' +
    "</a>"
  );
}

function renderBlogArticleList(mountId, options) {
  var mount = document.getElementById(mountId || "blog-article-list");
  if (!mount || typeof BLOG_ARTICLES === "undefined") return;

  options = normalizeBlogListOptions(options);
  var filterOpts = getBlogListFilterOptions(options);
  var articles = filterBlogArticles(filterOpts);
  var countOpts = Object.assign({}, filterOpts);
  delete countOpts.limit;
  var totalInFilter = filterBlogArticles(countOpts).length;

  if (!articles.length) {
    mount.innerHTML =
      '<p class="text-sm text-slate-500 py-4">此分類尚無文章，之後會持續更新。</p>';
    mount.classList.remove("blog-list-mount");
    return;
  }

  mount.classList.add("blog-list-mount");
  var sections = partitionBlogListByStyle(articles, options);
  var ctxBase = { showNewBadge: options.showNewBadge };
  var parts = [];

  if (sections.full.length) {
    parts.push('<div class="blog-list-block blog-list-block--featured">');
    sections.full.forEach(function (a) {
      parts.push(renderBlogArticleCardFull(a, ctxBase));
    });
    parts.push("</div>");
  }

  if (sections.compact.length) {
    parts.push('<div class="blog-list-block blog-list-block--compact">');
    sections.compact.forEach(function (a) {
      parts.push(renderBlogArticleCardCompact(a, ctxBase));
    });
    parts.push("</div>");
  }

  var viewAll = options.viewAllLink;
  if (viewAll && viewAll.href) {
    var showViewAll =
      options.variant === "compact" ||
      totalInFilter > articles.length ||
      sections.compact.length > 0;
    if (showViewAll) {
      parts.push(
        '<p class="blog-list-viewall"><a href="' +
        escapeBlogHtml(viewAll.href) +
        '" class="blog-list-viewall__link">' +
        escapeBlogHtml(viewAll.label || "查看全部文章 →") +
        "</a></p>"
      );
    }
  }

  mount.innerHTML = parts.join("");
}

/** 右欄僅區塊標題用小圖示，其餘靠字級與間距分層 */
var BLOG_RAIL_SVG = {
  info:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  related:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2"/></svg>',
  extend:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>'
};

function blogRailTitleHtml(iconName, label) {
  var svg = BLOG_RAIL_SVG[iconName] || BLOG_RAIL_SVG.info;
  return (
    '<p class="blog-rail-title">' +
    '<span class="blog-rail-title__icon" aria-hidden="true">' +
    svg +
    "</span>" +
    "<span>" +
    escapeBlogHtml(label) +
    "</span></p>"
  );
}

function blogRailLinkHtml(href, label) {
  return (
    '<a href="' +
    href +
    '" class="blog-rail-link">' +
    escapeBlogHtml(label) +
    "</a>"
  );
}

/** 同分類依發布日排序，推算上一篇／下一篇（可於文章資料覆寫 prevSlug / nextSlug） */
function getBlogArticleNeighbors(slug) {
  var current = getBlogArticleBySlug(slug);
  if (!current) return { prev: null, next: null };

  if (current.prevSlug || current.nextSlug) {
    return {
      prev: current.prevSlug ? getBlogArticleBySlug(current.prevSlug) : null,
      next: current.nextSlug ? getBlogArticleBySlug(current.nextSlug) : null
    };
  }

  var series = filterBlogArticles({ category: current.category })
    .slice()
    .sort(function (a, b) {
      return (a.date || "").localeCompare(b.date || "");
    });

  var idx = -1;
  for (var i = 0; i < series.length; i++) {
    if (series[i].slug === slug) {
      idx = i;
      break;
    }
  }
  if (idx < 0) return { prev: null, next: null };

  return {
    prev: idx > 0 ? series[idx - 1] : null,
    next: idx < series.length - 1 ? series[idx + 1] : null
  };
}

function blogArticleNavCardHtml(article, direction) {
  if (!article) {
    return '<div class="blog-article-nav__placeholder" aria-hidden="true"></div>';
  }
  var isPrev = direction === "prev";
  var label = isPrev ? "上一篇" : "下一篇";
  var arrow = isPrev ? "←" : "→";
  return (
    '<a href="' +
    blogArticleHref(article) +
    '" class="blog-article-nav__card blog-article-nav__card--' +
    direction +
    '">' +
    '<span class="blog-article-nav__dir">' +
    arrow +
    " " +
    label +
    "</span>" +
    '<span class="blog-article-nav__title">' +
    escapeBlogHtml(article.title) +
    "</span>" +
    '<span class="blog-article-nav__meta">' +
    escapeBlogHtml(formatReadDuration(article.readMins)) +
    "</span>" +
    "</a>"
  );
}

/** 手機／平板文末：上下篇 + 相關文章（桌機由右欄 blog-rail 負責） */
function renderBlogArticleNav(slug) {
  slug = slug || getCurrentBlogSlug();
  var main = document.querySelector(".blog-main.blog-prose");
  if (!main) return;

  var mount = document.getElementById("blog-article-nav-slot");
  if (!mount) {
    mount = document.createElement("div");
    mount.id = "blog-article-nav-slot";
    var authorSlot = document.getElementById("blog-article-author-slot");
    if (authorSlot) {
      main.insertBefore(mount, authorSlot);
    } else {
      main.appendChild(mount);
    }
  }

  var article = getBlogArticleBySlug(slug);
  if (!article) {
    mount.innerHTML = "";
    return;
  }

  var neighbors = getBlogArticleNeighbors(slug);
  var skipSlugs = [slug];
  if (neighbors.prev) skipSlugs.push(neighbors.prev.slug);
  if (neighbors.next) skipSlugs.push(neighbors.next.slug);

  var related = getRelatedArticles(slug, 4).filter(function (a) {
    return skipSlugs.indexOf(a.slug) < 0;
  }).slice(0, 3);

  var hasNeighbors = !!(neighbors.prev || neighbors.next);
  if (!hasNeighbors && !related.length) {
    mount.innerHTML = "";
    return;
  }

  var parts = [
    '<nav class="blog-article-nav blog-reveal is-visible" aria-label="文章導覽">'
  ];

  if (hasNeighbors) {
    var gridClass = "blog-article-nav__grid";
    if (neighbors.prev && neighbors.next) {
      gridClass += " blog-article-nav__grid--duo";
    }
    parts.push('<p class="blog-article-nav__label">繼續閱讀</p>');
    parts.push('<div class="' + gridClass + '">');
    parts.push(blogArticleNavCardHtml(neighbors.prev, "prev"));
    parts.push(blogArticleNavCardHtml(neighbors.next, "next"));
    parts.push("</div>");
  }

  if (related.length) {
    var relatedClass = "blog-article-nav__related";
    if (!hasNeighbors) relatedClass += " blog-article-nav__related--lead";
    parts.push('<div class="' + relatedClass + '">');
    parts.push('<p class="blog-article-nav__related-title">相關文章</p>');
    parts.push('<div class="blog-article-nav__related-links">');
    related.forEach(function (a) {
      parts.push(
        '<a href="' +
          blogArticleHref(a) +
          '" class="blog-article-nav__related-link">' +
          escapeBlogHtml(a.title) +
          "</a>"
      );
    });
    parts.push("</div></div>");
  }

  parts.push("</nav>");
  mount.innerHTML = parts.join("");
}

function renderBlogArticleRail(mountId, slug) {
  var mount = document.getElementById(mountId || "blog-article-rail");
  if (!mount) return;

  slug = slug || getCurrentBlogSlug();
  var article = getBlogArticleBySlug(slug);

  if (!article) {
    mount.innerHTML =
      '<div class="blog-rail-card">' +
      '<div class="blog-rail-block">' +
      blogRailTitleHtml("extend", "延伸") +
      '<div class="blog-rail-links">' +
      BLOG_SITE_LINKS.map(function (link) {
        return blogRailLinkHtml(blogPageHref(link.href), link.label);
      }).join("") +
      "</div></div></div>";
    return;
  }

  var categoryLink = BLOG_CATEGORY_LINKS[article.category];
  var related = getRelatedArticles(slug, 4);

  var relatedHtml = related.length
    ? '<div class="blog-rail-links">' +
      related
        .map(function (a) {
          return blogRailLinkHtml(blogArticleHref(a), a.title);
        })
        .join("") +
      "</div>"
    : '<p class="blog-rail-empty">同系列文章陸續更新中。</p>';

  var siteLinks = BLOG_SITE_LINKS.slice();
  if (categoryLink) {
    siteLinks.unshift(categoryLink);
  }
  var seenSiteHrefs = {};
  siteLinks = siteLinks.filter(function (link) {
    var href = blogPageHref(link.href);
    if (!href || seenSiteHrefs[href]) return false;
    seenSiteHrefs[href] = true;
    return true;
  });

  var tagsHtml =
    article.tags && article.tags.length
      ? '<div class="blog-rail-tags">' +
        article.tags
          .map(function (t) {
            return (
              '<span class="blog-rail-tag">' + escapeBlogHtml(t) + "</span>"
            );
          })
          .join("") +
        "</div>"
      : "";

  mount.innerHTML =
    '<div class="blog-rail-card">' +
    '<div class="blog-rail-block">' +
    blogRailTitleHtml("info", "文章資訊") +
    '<p class="blog-rail-category">' +
    escapeBlogHtml(article.category) +
    "</p>" +
    '<p class="blog-rail-meta">' +
    '<span class="blog-rail-meta__line">' +
    escapeBlogHtml(article.date) +
    "</span>" +
    '<span class="blog-rail-meta__line">' +
    escapeBlogHtml(formatReadDuration(article.readMins)) +
    "</span>" +
    "</p>" +
    tagsHtml +
    "</div>" +
    '<div class="blog-rail-block blog-rail-block--divider">' +
    blogRailTitleHtml("related", "相關文章") +
    relatedHtml +
    "</div>" +
    '<div class="blog-rail-block blog-rail-block--divider">' +
    blogRailTitleHtml("extend", "延伸") +
    '<div class="blog-rail-links">' +
    siteLinks
      .map(function (link) {
        return blogRailLinkHtml(blogPageHref(link.href), link.label);
      })
      .join("") +
    "</div></div>" +
    "</div>";
}

function formatBlogNavUnreadCount(count) {
  if (count > 99) return "99+";
  return String(count);
}

function clearBlogNavNewIndicator() {
  document.querySelectorAll("[data-nav-articles]").forEach(function (el) {
    el.classList.remove("nav-articles--has-new");
    el.removeAttribute("aria-label");
    var badge = el.querySelector(".nav-articles-new-badge");
    if (badge) badge.remove();
  });
}

/** 全站導覽「文章分享」未讀數字徽章（30 天內且個人未讀） */
function applyBlogNavNewIndicator() {
  if (isBlogSectionPath() || !hasUnreadNewBlogArticles()) return;

  var unreadCount = getUnreadNewBlogArticles().length;
  var label = "文章分享，" + unreadCount + " 篇未讀新文章";
  var badgeText = formatBlogNavUnreadCount(unreadCount);

  document.querySelectorAll("[data-nav-articles]").forEach(function (el) {
    if (el.querySelector(".nav-articles-new-badge")) return;
    el.classList.add("nav-articles--has-new");
    el.setAttribute("aria-label", label);
    var badge = document.createElement("span");
    badge.className = "nav-articles-new-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.textContent = badgeText;
    el.appendChild(badge);
  });
}

function syncBlogNavNewIndicator() {
  clearBlogNavNewIndicator();
  applyBlogNavNewIndicator();
}

window.markBlogArticleRead = markBlogArticleRead;
window.hasBlogArticleBeenRead = hasBlogArticleBeenRead;
window.syncBlogNavNewIndicator = syncBlogNavNewIndicator;
window.applyBlogNavNewIndicator = applyBlogNavNewIndicator;

(function syncBlogHeadEarly() {
  if (typeof document === "undefined") return;
  if (isBlogPostShellPath()) return;
  var slug = getCurrentBlogSlug();
  if (slug) {
    var article = getBlogArticleBySlug(slug);
    if (article) applyBlogArticleHead(article);
    return;
  }
  if (isBlogIndexPath()) applyBlogIndexHead();
})();

window.initDynamicBlogArticlePage = initDynamicBlogArticlePage;
window.initStaticPublishedBlogArticlePage = initStaticPublishedBlogArticlePage;
window.fixBlogNavPathsFromSubdir = fixBlogNavPathsFromSubdir;
window.blogArticlePublicHref = blogArticleHref;
window.blogArticleShareUrl = blogArticleShareUrl;
