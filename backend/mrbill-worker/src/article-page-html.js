import {
  blogArticleShareOgTitle,
  blogResolveCover,
  absUrl,
  formatDocumentTitle,
  escapeHtmlAttr,
  SITE_ORIGIN,
  SITE_NAME,
  SITE_LOCALE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT
} from "./share-seo.js";

/** 文章明體標題用（手機無系統宋體時必須載入 webfont） */
export const BLOG_SERIF_FONT_HEAD =
  '  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
  '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n' +
  '  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@600;700;900&amp;display=swap" rel="stylesheet" />\n';

/** 動態文正式網址：/blog/{slug}/（磁碟上為 blog/{slug}/index.html） */
export function blogArticlePublicPath(slug) {
  return "/blog/" + slug + "/";
}

export function blogArticlePublicUrl(slug, origin) {
  const base = (origin || SITE_ORIGIN).replace(/\/$/, "");
  return base + blogArticlePublicPath(slug);
}

function parseJsonArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

/** D1 row → 靜態頁建置用 article 物件 */
export function articleFromDbRow(row) {
  if (!row) return null;
  return {
    slug: row.slug,
    title: row.title || "",
    subtitle: row.subtitle || "",
    excerpt: row.excerpt || "",
    label: row.label || "",
    audience: row.audience || "",
    category: row.category || "",
    author: row.author || "Mr.Bill",
    date: row.date || "",
    readMins: Number(row.read_mins) || 0,
    tags: parseJsonArray(row.tags),
    cover: row.cover || "",
    relatedSlugs: parseJsonArray(row.related_slugs),
    status: row.status || "draft",
    publishedAt: row.published_at || null,
    titleFont: row.title_font === "serif" ? "serif" : "sans",
    contentHtml: row.content_html || ""
  };
}

/** 同步時確保帶入 content_html（cron／手動 sync 可能只傳 metadata） */
export async function resolveArticleForStaticPage(env, article) {
  if (!article) return null;
  if (typeof article.contentHtml === "string") return article;
  if (!env.DB || !article.slug) {
    return Object.assign({}, article, { contentHtml: "" });
  }
  const row = await env.DB.prepare("SELECT * FROM articles WHERE slug = ?")
    .bind(article.slug)
    .first();
  if (!row) return Object.assign({}, article, { contentHtml: "" });
  const full = articleFromDbRow(row);
  return Object.assign({}, full, article, { contentHtml: full.contentHtml });
}

function stripDangerousHtml(html) {
  if (!html) return "";
  return String(html)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

function escapeHtmlText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** blog/{slug}/index.html 深度：修正正文內相對資產路徑 */
function rewriteNestedBlogAssetPaths(html) {
  if (!html) return "";
  let out = html;
  out = out.replace(/(\s(?:src|href)=["'])assets\//gi, "$1../../assets/");
  out = out.replace(/(\s(?:src|href)=["'])\.\.\/assets\//gi, "$1../../assets/");
  out = out.replace(
    /(\s(?:src|href)=["'])\/assets\//gi,
    "$1" + SITE_ORIGIN + "/assets/"
  );
  return out;
}

function formatReadDuration(mins) {
  const n = Number(mins) || 0;
  if (!n) return "";
  return "預估閱讀 " + n + " 分鐘";
}

function buildArticleJsonLd(article, pageUrl) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title || article.slug,
    description: String(article.excerpt || article.subtitle || "").trim(),
    image: absUrl(SITE_ORIGIN, blogResolveCover(article)),
    author: {
      "@type": "Person",
      name: article.author || "Mr.Bill"
    },
    datePublished: article.date || article.publishedAt || undefined,
    inLanguage: "zh-Hant",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME
    }
  };
  return JSON.stringify(payload);
}

function buildArticleMetaJson(article) {
  const meta = {
    slug: article.slug,
    title: article.title || "",
    subtitle: article.subtitle || "",
    excerpt: article.excerpt || "",
    label: article.label || "",
    audience: article.audience || "",
    category: article.category || "",
    author: article.author || "Mr.Bill",
    date: article.date || "",
    readMins: Number(article.readMins) || 0,
    tags: article.tags || [],
    cover: article.cover || "",
    relatedSlugs: article.relatedSlugs || [],
    status: "published",
    titleFont: article.titleFont === "serif" ? "serif" : "sans"
  };
  return JSON.stringify(meta);
}

function buildStaticHeroSection(article) {
  const cover = absUrl(SITE_ORIGIN, blogResolveCover(article));
  const tag = escapeHtmlText(article.label || article.category || "文章筆記");
  const title = escapeHtmlText(article.title || article.slug);
  const subtitle = escapeHtmlText(article.subtitle || article.excerpt || "");
  const authorDate =
    escapeHtmlText(article.author || "Mr.Bill") +
    (article.date ? " · " + escapeHtmlText(article.date) : "");
  const readTime = escapeHtmlText(formatReadDuration(article.readMins));

  return (
    '<section class="blog-hero w-full text-white">\n' +
    '  <div class="blog-hero__media" aria-hidden="true">\n' +
    '    <img id="blog-hero-cover" src="' +
    escapeHtmlAttr(cover) +
    '" alt="' +
    escapeHtmlAttr(article.title || "") +
    '" class="blog-hero__img" width="1200" height="630" loading="eager" fetchpriority="high" />\n' +
    "  </div>\n" +
    '  <div class="blog-hero__panel">\n' +
    '    <div class="blog-shell blog-hero__inner">\n' +
    '      <a href="../../blog/index.html" class="blog-hero__back md:hidden">← 文章筆記</a>\n' +
    '      <nav class="blog-hero__breadcrumb hidden md:block" aria-label="麵包屑">\n' +
    "        <ol>\n" +
    '          <li><a href="../../index.html">首頁</a></li>\n' +
    '          <li aria-hidden="true">/</li>\n' +
    '          <li><a href="../../blog/index.html">文章筆記</a></li>\n' +
    '          <li aria-hidden="true">/</li>\n' +
    '          <li><span class="text-white font-medium" id="blog-hero-breadcrumb-title">' +
    title +
    "</span></li>\n" +
    "        </ol>\n" +
    "      </nav>\n" +
    '      <div class="blog-hero__tags" id="blog-hero-tags"><span class="blog-hero__tag">' +
    tag +
    "</span></div>\n" +
    '      <h1 class="blog-hero__title" id="blog-hero-title">' +
    title +
    "</h1>\n" +
    (subtitle
      ? '      <p class="blog-hero__subtitle" id="blog-hero-subtitle">' +
        subtitle +
        "</p>\n"
      : '      <p class="blog-hero__subtitle" id="blog-hero-subtitle"></p>\n') +
    '      <p class="blog-hero__meta">\n' +
  '        <span class="blog-hero__meta-item" id="blog-hero-author-date">' +
    authorDate +
    "</span>\n" +
    (readTime
      ? '        <span class="blog-hero__meta-item" id="blog-hero-read-time">' +
        readTime +
        "</span>\n"
      : '        <span class="blog-hero__meta-item" id="blog-hero-read-time"></span>\n') +
    '        <span class="blog-hero__likes blog-hero__meta-item" id="busuanzi_container_page_pv" aria-label="已有讀者喜歡這篇的累計人數">\n' +
    '          <span class="blog-hero__likes-icon" aria-hidden="true">\n' +
    '            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>\n' +
    "          </span>\n" +
    '          <span class="blog-hero__likes-text">\n' +
    '            <span class="blog-hero__likes-part blog-hero__likes-part--lead">已有 <span id="busuanzi_value_page_pv">…</span> 位讀者</span>\n' +
    '            <span class="blog-hero__likes-part blog-hero__likes-part--tail">喜歡</span>\n' +
    "          </span>\n" +
    "        </span>\n" +
    "      </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</section>\n"
  );
}

function buildStaticSeoHead(article, pageUrl) {
  const ogTitle = blogArticleShareOgTitle(article);
  const description = String(article.excerpt || article.subtitle || "").trim();
  const ogImage = absUrl(SITE_ORIGIN, blogResolveCover(article));
  const ogImageAlt = String(article.title || "Mr.Bill 文章筆記").trim();
  const docTitle = formatDocumentTitle(article);
  const tags = Array.isArray(article.tags) ? article.tags : [];
  const keywordsLine =
    tags.length > 0
      ? '  <meta name="keywords" content="' +
        escapeHtmlAttr(tags.join(", ")) +
        '" />\n'
      : "";

  return (
    "  <title>" +
    escapeHtmlAttr(docTitle) +
    "</title>\n" +
    '  <meta name="description" content="' +
    escapeHtmlAttr(description) +
    '" />\n' +
    keywordsLine +
    '  <meta name="robots" content="index,follow,max-image-preview:large" />\n' +
    '  <link rel="canonical" href="' +
    escapeHtmlAttr(pageUrl) +
    '" />\n' +
    '  <meta property="og:type" content="article" />\n' +
    '  <meta property="og:site_name" content="' +
    escapeHtmlAttr(SITE_NAME) +
    '" />\n' +
    '  <meta property="og:locale" content="' +
    escapeHtmlAttr(SITE_LOCALE) +
    '" />\n' +
    '  <meta property="og:title" content="' +
    escapeHtmlAttr(ogTitle) +
    '" />\n' +
    '  <meta property="og:description" content="' +
    escapeHtmlAttr(description) +
    '" />\n' +
    '  <meta property="og:url" content="' +
    escapeHtmlAttr(pageUrl) +
    '" />\n' +
    '  <meta property="og:image" content="' +
    escapeHtmlAttr(ogImage) +
    '" />\n' +
    '  <meta property="og:image:width" content="' +
    OG_IMAGE_WIDTH +
    '" />\n' +
    '  <meta property="og:image:height" content="' +
    OG_IMAGE_HEIGHT +
    '" />\n' +
    '  <meta property="og:image:alt" content="' +
    escapeHtmlAttr(ogImageAlt) +
    '" />\n' +
    '  <meta name="twitter:card" content="summary_large_image" />\n' +
    '  <meta name="twitter:title" content="' +
    escapeHtmlAttr(ogTitle) +
    '" />\n' +
    '  <meta name="twitter:description" content="' +
    escapeHtmlAttr(description) +
    '" />\n' +
    '  <meta name="twitter:image" content="' +
    escapeHtmlAttr(ogImage) +
    '" />\n' +
    '  <script type="application/ld+json" id="site-seo-article-jsonld">' +
    buildArticleJsonLd(article, pageUrl) +
    "</script>\n"
  );
}

function buildStaticArticleBody(article) {
  const raw = String(article.contentHtml || "").trim();
  const safe = rewriteNestedBlogAssetPaths(stripDangerousHtml(raw));
  if (!safe) {
    return (
      '          <div id="blog-static-content" data-blog-static-content="1">\n' +
      '            <p class="text-slate-500">（尚無正文）</p>\n' +
      "          </div>\n"
    );
  }
  return (
    '          <div id="blog-static-content" data-blog-static-content="1">\n' +
    safe +
    "\n          </div>\n"
  );
}

/** 已上架動態文的 GitHub 靜態頁（含 OG + 可爬蟲正文） */
export function buildPublishedArticlePageHtml(article) {
  const slug = article.slug;
  const pageUrl = blogArticlePublicUrl(slug, SITE_ORIGIN);
  const seoHead = buildStaticSeoHead(article, pageUrl);
  const titleFontClass =
    article.titleFont === "serif" ? "blog-title-font-serif" : "blog-title-font-sans";
  const hero = buildStaticHeroSection(article);
  const bodyContent = buildStaticArticleBody(article);
  const metaJson = buildArticleMetaJson(article);

  return (
    "<!DOCTYPE html>\n" +
    "<html lang=\"zh-Hant\">\n<head>\n" +
    "  <!-- AUTO-GENERATED by mrbill-worker on publish — do not edit by hand -->\n" +
    '  <meta charset="UTF-8" />\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n' +
    seoHead +
    '  <script src="../../js/site-seo.config.js"></script>\n' +
    '  <script src="../../js/site-seo.js"></script>\n' +
    '  <script src="https://cdn.tailwindcss.com"></script>\n' +
    "  <script>\n" +
    "    tailwind.config = {\n" +
    "      theme: {\n" +
    "        extend: {\n" +
    "          fontFamily: {\n" +
    "            sans: [\n" +
    '              "-apple-system",\n' +
    '              "BlinkMacSystemFont",\n' +
    '              "\\"SF Pro Text\\"",\n' +
    '              "\\"Noto Sans TC\\"",\n' +
    '              "sans-serif"\n' +
    "            ]\n" +
    "          }\n" +
    "        }\n" +
    "      }\n" +
    "    };\n" +
    "  </script>\n" +
    '  <script src="../../js/components-loader.js"></script>\n' +
    '  <script src="../../js/mrbill-admin-session.js"></script>\n' +
    '  <script src="../../js/blog-articles.config.js"></script>\n' +
    '  <script src="../../js/blog-articles.js?v=title-font-mobile-1"></script>\n' +
    '  <script src="../../js/blog-stats.config.js?v=20260608"></script>\n' +
    '  <script src="../../js/blog-stats.js?v=clean-slug-url-1"></script>\n' +
    '  <script src="../../js/blog-article-ui.js"></script>\n' +
    (article.titleFont === "serif" ? BLOG_SERIF_FONT_HEAD : "") +
    '  <link rel="stylesheet" href="../../css/blog-layout.css?v=title-font-mobile-1" />\n' +
    "  <style>\n" +
    "    html { scroll-behavior: smooth; scroll-padding-top: 96px; }\n" +
    '    body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Noto Sans TC", sans-serif; }\n' +
    "    .blog-pre { white-space: pre-wrap; word-break: break-word; }\n" +
    "    .blog-preview-banner {\n" +
    "      background: #fef3c7; border-bottom: 1px solid #fcd34d;\n" +
    "      color: #92400e; font-size: 13px; font-weight: 700;\n" +
    "      text-align: center; padding: 10px 16px;\n" +
    "    }\n" +
    "  </style>\n" +
    "</head>\n" +
    '<body class="bg-[#f8fafc] text-slate-800 antialiased min-h-screen flex flex-col text-base overflow-x-hidden ' +
    titleFontClass +
    '" data-static-article="published">\n' +
    '  <div id="blog-preview-banner" class="blog-preview-banner hidden" role="status"></div>\n' +
    '  <script type="application/json" id="blog-static-article-data">' +
    metaJson +
    "</script>\n" +
    '\n  <header id="global-header" class="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100"></header>\n' +
    "\n  <main class=\"flex-grow w-full min-w-0\">\n" +
    '    <div id="blog-article-hero-slot">\n' +
    hero +
    "    </div>\n" +
    "\n    <div class=\"blog-shell px-4 lg:px-8 py-8 md:py-10 lg:py-12\">\n" +
    '      <div class="blog-layout">\n' +
    '        <article class="blog-main blog-prose space-y-6 lg:space-y-7">\n' +
    bodyContent +
    '          <div id="blog-article-nav-slot"></div>\n' +
    '          <div id="blog-article-author-slot"></div>\n' +
    "        </article>\n" +
    "\n        <div id=\"blog-article-rail-slot\"></div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </main>\n" +
    "\n  <footer id=\"global-footer\" class=\"bg-white border-t border-slate-100 py-8 px-4 sm:px-6 mt-auto overflow-x-hidden\"></footer>\n" +
    "\n  <script>\n" +
    "    function fixNavPathsFromSubdir() {\n" +
    "      if (typeof fixBlogNavPathsFromSubdir === 'function') fixBlogNavPathsFromSubdir();\n" +
    "    }\n" +
    '    window.addEventListener("DOMContentLoaded", function () {\n' +
    '      includeComponentSlot("global-header", "../../components/header.html", null, fixNavPathsFromSubdir);\n' +
    '      includeComponentSlot("global-footer", "../../components/footer.html", null, fixNavPathsFromSubdir);\n' +
    "      if (typeof initStaticPublishedBlogArticlePage === 'function') {\n" +
    "        initStaticPublishedBlogArticlePage();\n" +
    "      } else {\n" +
    "        initDynamicBlogArticlePage();\n" +
    "      }\n" +
    "    });\n" +
    "  </script>\n" +
    "</body>\n</html>\n"
  );
}

export function publishedArticleFilePath(slug) {
  return "blog/" + slug + "/index.html";
}

/** 舊版扁平路徑（同步時一併清除） */
export function legacyFlatPublishedArticleFilePath(slug) {
  return "blog/" + slug + ".html";
}

