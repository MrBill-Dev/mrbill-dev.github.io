/**
 * 文章分享索引（blog/ 目錄）— 全站文章資料的單一來源
 *
 * 新增文章：在此陣列加一筆 + 建立 blog/{slug}.html
 * 共用渲染：
 *   - blog/index.html          → 全部列表
 *   - ai-learning-map.html     → 依 category 篩選
 *   - 各文章頁右欄             → 文章資訊 + 相關文章（同分類／標籤）
 *
 * 相關文章邏輯：relatedSlugs 手動指定 > 同 category > 共用 tags 加分 > 日期新到舊
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
    readMins: 4, // 預估閱讀時間（分鐘），依內文字數估算
    tags: ["Prompt", "AI 思維", "工作流"],
    cover: "assets/blog-2026-05-31-ai-prompt-og.jpg",
    pagePath: "/blog/2026-05-31-ai-prompt-six-levels.html",
    relatedSlugs: []
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
  return m ? decodeURIComponent(m[1]) : null;
}

function getBlogArticleBySlug(slug) {
  if (!slug) return null;
  return BLOG_ARTICLES.find(function (a) {
    return a.slug === slug;
  }) || null;
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

function renderBlogArticleRail(mountId, slug) {
  var mount = document.getElementById(mountId || "blog-article-rail");
  if (!mount) return;

  slug = slug || getCurrentBlogSlug();
  var article = getBlogArticleBySlug(slug);

  if (!article) {
    mount.innerHTML =
      '<div class="blog-rail-card space-y-4">' +
      '<div><p class="blog-rail-title">延伸</p>' +
      BLOG_SITE_LINKS.map(function (link) {
        return (
          '<a href="' +
          blogPageHref(link.href) +
          '" class="block text-sm font-bold text-indigo-600 no-underline hover:text-indigo-800 py-1">' +
          link.label +
          "</a>"
        );
      }).join("") +
      "</div></div>";
    return;
  }

  var categoryLink = BLOG_CATEGORY_LINKS[article.category];
  var related = getRelatedArticles(slug, 4);

  var relatedHtml = related.length
    ? related
        .map(function (a) {
          return (
            '<a href="' +
            blogArticleHref(a) +
            '" class="block text-sm font-bold text-indigo-600 no-underline hover:text-indigo-800 py-1 leading-snug">' +
            a.title +
            "</a>"
          );
        })
        .join("")
    : '<p class="text-xs text-slate-500">同系列文章陸續更新中。</p>';

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
    '<p class="text-xs text-slate-500 mt-1">' +
    article.date +
    " · " +
    formatReadDuration(article.readMins) +
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
    siteLinks
      .map(function (link) {
        return (
          '<a href="' +
          blogPageHref(link.href) +
          '" class="block text-sm font-bold text-indigo-600 no-underline hover:text-indigo-800 py-1">' +
          link.label +
          "</a>"
        );
      })
      .join("") +
    "</div>" +
    "</div>";
}
