/**
 * 文章分享索引（blog/ 目錄）— 全站文章資料的單一來源
 * 維護說明：blog/README.md
 */
const BLOG_SITE_ORIGIN = "https://mrbill-dev.github.io";
const BLOG_SITE_NAME = "MrBill AI Studio";

/** 文章列表頁（blog/index.html）專區文案；hero 圖預設取最新文章 cover */
const BLOG_INDEX = {
  title: "文章分享",
  subtitle: "一個來自多年累積的內容空間，分享實務經驗與長期整理的思考。",
  tag: "文章分享",
  description: "一個來自多年累積的內容空間，分享實務經驗與長期整理的思考。",
  heroCover: null
};

const BLOG_ARTICLES = [
  {
    slug: "2026-06-05-ai-workflow-lesson-01-02",
    title: "AI 工作流實戰課｜跨領域通用版",
    subtitle: "AI 不是拿來聊天，是拿來重整工作方式。",
    excerpt:
      "用跨領域方式學會 Context、Rules、Workflow，建立可以實際工作的 AI 系統。",
    category: "AI學習地圖",
    author: "Mr.Bill",
    date: "2026-06-05",
    readMins: 38,
    tags: ["AI 工作流", "Context", "Rules", "Workflow"],
    cover: "assets/blog-2026-06-05-ai-workflow-og.jpg",
    relatedSlugs: ["2026-05-31-ai-prompt-six-levels"]
  },
  {
    slug: "2026-05-31-ai-prompt-six-levels",
    title: "99% 的人都在錯用 AI Prompt",
    subtitle: "從一句話輸入，到企業級 AI 系統設計，建立你的真正 AI 思維架構",
    excerpt: "從一句話輸入到企業級 AI 系統設計，用 6 個層級建立輸出行為控制思維。",
    category: "AI學習地圖",
    author: "Mr.Bill",
    date: "2026-05-31",
    readMins: 4,
    tags: ["Prompt", "AI 思維", "工作流"],
    cover: "assets/blog-2026-05-31-ai-prompt-og.jpg",
    relatedSlugs: ["2026-06-05-ai-workflow-lesson-01-02"]
  }
];

/** 分類對應的站內學程／專區連結（右欄「延伸」區塊） */
const BLOG_CATEGORY_LINKS = {
  "AI學習地圖": { href: "../ai-learning-map.html", label: "AI 學習地圖" },
  "互動練習": { href: "../ai-practice.html", label: "互動練習" },
  "設計工具": { href: "../design-toolkit.html", label: "設計工具箱" }
};

const BLOG_SITE_LINKS = [
  { href: "index.html", label: "文章列表" },
  { href: "../ai-practice.html", label: "互動練習" }
];

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
  if (!cover) return "";
  if (/^https?:\/\//.test(cover)) return cover;
  return BLOG_SITE_ORIGIN + "/" + cover.replace(/^\//, "");
}

function setDocumentMeta(name, content, attr) {
  if (!content) return;
  attr = attr || "name";
  var el =
    document.querySelector('meta[' + attr + '="' + name + '"]') ||
    document.createElement("meta");
  el.setAttribute(attr, name);
  el.setAttribute("content", content);
  if (!el.parentNode) document.head.appendChild(el);
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
  if (!article) return;
  preloadBlogArticleCover(article);
  document.title = article.title + "｜" + BLOG_SITE_NAME;
  setDocumentMeta("description", article.excerpt);
  setDocumentMeta("og:type", "article", "property");
  setDocumentMeta("og:site_name", BLOG_SITE_NAME, "property");
  setDocumentMeta("og:locale", "zh_TW", "property");
  setDocumentMeta("og:title", article.title, "property");
  setDocumentMeta("og:description", article.excerpt, "property");
  setDocumentMeta(
    "og:url",
    BLOG_SITE_ORIGIN + "/blog/" + article.slug + ".html",
    "property"
  );
  setDocumentMeta("og:image", blogCoverAbsoluteUrl(article.cover), "property");
  setDocumentMeta("og:image:width", "1200", "property");
  setDocumentMeta("og:image:height", "630", "property");
  setDocumentMeta("twitter:card", "summary_large_image");
  setDocumentMeta("twitter:title", article.title);
  setDocumentMeta("twitter:description", article.excerpt);
  setDocumentMeta("twitter:image", blogCoverAbsoluteUrl(article.cover));
  var canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute(
      "href",
      BLOG_SITE_ORIGIN + "/blog/" + article.slug + ".html"
    );
  }
}

function applyBlogIndexHead() {
  document.title = BLOG_INDEX.title + "｜" + BLOG_SITE_NAME;
  setDocumentMeta("description", BLOG_INDEX.description);
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
      '<span class="blog-hero__tag">' + escapeBlogHtml(article.category) + "</span>";
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

  var subtitle = document.getElementById("blog-index-hero-subtitle");
  if (subtitle) subtitle.textContent = BLOG_INDEX.subtitle;

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
  loadBlogArticleShell(function () {
    renderBlogArticleHero(slug);
    renderBlogArticleRail("blog-article-rail", slug);
    if (typeof window.initBlogStats === "function") {
      window.initBlogStats();
    }
    if (typeof window.initBlogArticleUI === "function") {
      window.initBlogArticleUI();
    }
  });
}

function initBlogIndexPage(listOptions) {
  renderBlogIndexHero();
  var crumb = document.getElementById("blog-index-breadcrumb-title");
  if (crumb) crumb.textContent = BLOG_INDEX.title;
  renderBlogArticleList("blog-article-list", listOptions);
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

function renderBlogArticleList(mountId, options) {
  var mount = document.getElementById(mountId || "blog-article-list");
  if (!mount || typeof BLOG_ARTICLES === "undefined") return;

  var articles = filterBlogArticles(options);

  if (!articles.length) {
    mount.innerHTML =
      '<p class="text-sm text-slate-500 py-4">此分類尚無文章，之後會持續更新。</p>';
    return;
  }

  mount.innerHTML = articles
    .map(function (a) {
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
          '" alt="' +
          escapeBlogHtml(a.title) +
          '" class="w-full h-28 sm:h-full sm:min-h-[7.5rem] object-cover" loading="lazy" width="1200" height="630" />' +
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
        "<span>·</span><span>" +
        formatReadDuration(a.readMins) +
        "</span>" +
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
    })
    .join("");
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

function renderBlogArticleRail(mountId, slug) {
  var mount = document.getElementById(mountId || "blog-article-rail");
  if (!mount) return;

  slug = slug || getCurrentBlogSlug();
  var article = getBlogArticleBySlug(slug);

  if (!article) {
    mount.innerHTML =
      '<div class="blog-rail-card space-y-4">' +
      '<div><p class="blog-rail-title">延伸</p>' +
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

  mount.innerHTML =
    '<div class="blog-rail-card space-y-4">' +
    '<div>' +
    '<p class="blog-rail-title">文章資訊</p>' +
    '<p class="text-sm font-bold text-slate-800">' +
    article.category +
    "</p>" +
    '<p class="blog-rail-meta mt-1">' +
    '<span class="blog-rail-meta__line">' +
    article.date +
    "</span>" +
    '<span class="blog-rail-meta__line">' +
    formatReadDuration(article.readMins) +
    "</span>" +
    "</p>" +
    (article.tags && article.tags.length
      ? '<div class="mt-2 flex flex-wrap gap-1">' +
        article.tags
          .map(function (t) {
            return (
              '<span class="inline-block px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[0.6875rem] font-bold">' +
              t +
              "</span>"
            );
          })
          .join("") +
        "</div>"
      : "") +
    "</div>" +
    '<div>' +
    '<p class="blog-rail-title">相關文章</p>' +
    relatedHtml +
    "</div>" +
    '<div>' +
    '<p class="blog-rail-title">延伸</p>' +
    '<div class="blog-rail-links">' +
    siteLinks
      .map(function (link) {
        return blogRailLinkHtml(blogPageHref(link.href), link.label);
      })
      .join("") +
    "</div></div>" +
    "</div>";
}

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
