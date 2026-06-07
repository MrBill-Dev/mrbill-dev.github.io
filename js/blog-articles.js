/**
 * 文章分享索引（blog/ 目錄）— 全站文章資料的單一來源
 *
 * 列表呈現（renderBlogArticleList）：
 * - preset: "index"  → blog/index.html（≤3 篇全大卡，≥4 篇 1 精選 + 精簡列）
 * - preset: "embed"  → 站內內嵌區（精簡列 + limit，例：ai-learning-map）
 * - variant: "full" | "compact" | "featured-compact" | "auto" 可覆寫 preset
 *
 * 新增文章：BLOG_ARTICLES 加一筆 → 複製 article.template.html → 執行 npm run seo:sync
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
  heroCover: null
};

const BLOG_ARTICLES = [
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

/** 分類對應的站內學程／專區連結（右欄「延伸」區塊） */
const BLOG_CATEGORY_LINKS = {
  "AI學習地圖": { href: "../ai-learning-map.html", label: "AI 學習地圖" },
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
  BLOG_ARTICLES.forEach(function (a) {
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

function getCurrentBlogSlug() {
  var m = (location.pathname || "").replace(/\\/g, "/").match(/\/blog\/([^/]+)\.html$/i);
  if (!m) return null;
  var slug = decodeURIComponent(m[1]);
  if (slug.toLowerCase() === "index") return null;
  return slug;
}

function isBlogIndexPath() {
  var p = (location.pathname || "").replace(/\\/g, "/").toLowerCase();
  if (/\/blog\/index\.html$/.test(p)) return true;
  if (/\/blog\/?$/.test(p)) return true;
  return false;
}

function getBlogArticleBySlug(slug) {
  if (!slug) return null;
  return BLOG_ARTICLES.find(function (a) {
    return a.slug === slug;
  }) || null;
}

function getLatestBlogArticle() {
  return filterBlogArticles()[0] || null;
}

function blogCoverAbsoluteUrl(cover) {
  if (typeof window.mrbillSeoAbsUrl === "function") {
    return window.mrbillSeoAbsUrl(cover);
  }
  if (!cover) return "";
  if (/^https?:\/\//.test(cover)) return cover;
  return blogSeoOrigin() + "/" + cover.replace(/^\//, "");
}

function preloadBlogArticleCover(article) {
  if (!article || !article.cover) return;
  var href = blogAssetHref(article.cover);
  if (!href || document.querySelector("link[data-blog-cover-preload]")) return;
  var link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = href;
  link.setAttribute("data-blog-cover-preload", "1");
  document.head.appendChild(link);
}

function applyBlogArticleHead(article) {
  if (!article || typeof window.applySiteSeo !== "function") return;
  preloadBlogArticleCover(article);
  window.applySiteSeo({
    title: article.title,
    description: article.excerpt,
    ogTitle: article.title,
    ogDescription: article.excerpt,
    ogImage: article.cover,
    type: "article",
    path: "/blog/" + article.slug + ".html",
    skipOrganization: true
  });
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
  if (isBlogSectionPath()) {
    return article.slug + ".html";
  }
  return "blog/" + article.slug + ".html";
}

function blogAssetHref(path) {
  if (!path) return "";
  if (isBlogSectionPath() && !/^(https?:|\/|\.\.\/)/.test(path)) {
    return "../" + path;
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

function renderBlogArticleHero(slug) {
  var article = getBlogArticleBySlug(slug || getCurrentBlogSlug());
  if (!article) return;

  var cover = document.getElementById("blog-hero-cover");
  if (cover && article.cover) {
    cover.src = blogAssetHref(article.cover);
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

  applyBlogArticleHead(article);
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
  if (heroSlot) {
    pending++;
    includeComponentSlot(
      "blog-article-hero-slot",
      "../components/blog-article-hero.html",
      null,
      tick
    );
  }
  if (railSlot) {
    pending++;
    includeComponentSlot(
      "blog-article-rail-slot",
      "../components/blog-article-rail.html",
      null,
      tick
    );
  }
  if (pending === 0 && done) done();
}

function initBlogArticlePage(slug) {
  slug = slug || getCurrentBlogSlug();
  markBlogArticleRead(slug);
  loadBlogArticleShell(function () {
    renderBlogArticleHero(slug);
    renderBlogArticleRail("blog-article-rail", slug);
    renderBlogArticleNav(slug);
    if (typeof window.initBlogStats === "function") {
      window.initBlogStats(slug);
    }
    if (typeof window.initBlogArticleUI === "function") {
      window.initBlogArticleUI(slug);
    }
  });
}

function initBlogIndexPage(listOptions) {
  renderBlogIndexHero();
  var crumb = document.getElementById("blog-index-breadcrumb-title");
  if (crumb) crumb.textContent = BLOG_INDEX.title;
  renderBlogArticleList(
    "blog-article-list",
    Object.assign({ preset: "index" }, listOptions || {})
  );
}

/** 站內專區內嵌文章列表（學習地圖等） */
function initBlogEmbedList(mountId, options) {
  renderBlogArticleList(
    mountId || "blog-article-list",
    Object.assign({ preset: "embed" }, options || {})
  );
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
  var list = BLOG_ARTICLES.slice();

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

function renderBlogArticleCardFull(article, ctx) {
  ctx = ctx || {};
  var cover = article.cover
    ? '<div class="blog-list-card__cover shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">' +
      '<img src="' +
      blogAssetHref(article.cover) +
      '" alt="' +
      escapeBlogHtml(article.title) +
      '" class="w-full h-full object-cover" loading="lazy" width="1200" height="630" />' +
      "</div>"
    : "";
  var badge = renderBlogListBadge(article, ctx.showNewBadge);
  var audience = article.audience
    ? '<p class="blog-list-card__audience"><span class="blog-list-card__audience-label">適合</span>' +
      escapeBlogHtml(article.audience) +
      "</p>"
    : "";
  return (
    '<article class="blog-list-card blog-list-card--full">' +
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
    escapeBlogHtml(article.excerpt) +
    "</p>" +
    audience +
    '<a href="' +
    blogArticleHref(article) +
    '" class="blog-list-card__btn">閱讀文章</a>' +
    "</div></article>"
  );
}

function renderBlogArticleCardCompact(article, ctx) {
  ctx = ctx || {};
  var badge = renderBlogListBadge(article, ctx.showNewBadge);
  return (
    '<a href="' +
    blogArticleHref(article) +
    '" class="blog-list-card blog-list-card--compact group">' +
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
  var sections = resolveBlogListSections(articles, options);
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
    parts.push('<div class="blog-article-nav__related">');
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
  var slug = getCurrentBlogSlug();
  if (slug) {
    var article = getBlogArticleBySlug(slug);
    if (article) applyBlogArticleHead(article);
    return;
  }
  if (isBlogIndexPath()) applyBlogIndexHead();
})();
