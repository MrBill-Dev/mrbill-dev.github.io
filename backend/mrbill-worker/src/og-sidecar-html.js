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

/** 動態文正式網址（讀者、canonical、sitemap） */
export function blogArticlePostPath(slug) {
  return "/blog/post.html?slug=" + encodeURIComponent(slug);
}

export function blogArticlePostUrl(slug, origin) {
  const base = (origin || SITE_ORIGIN).replace(/\/$/, "");
  return base + blogArticlePostPath(slug);
}

export function ogSidecarFilePath(slug) {
  return "blog/og/" + slug + ".html";
}

export function ogSidecarPublicPath(slug) {
  return "/blog/og/" + slug + ".html";
}

function buildOgMetaHead(article, canonicalUrl, pageUrl) {
  const ogTitle = blogArticleShareOgTitle(article);
  const description = String(article.excerpt || article.subtitle || "").trim();
  const ogImage = absUrl(SITE_ORIGIN, blogResolveCover(article));
  const ogImageAlt = String(article.title || "Mr.Bill 文章筆記").trim();
  const docTitle = formatDocumentTitle(article);

  return (
    "  <title>" +
    escapeHtmlAttr(docTitle) +
    "</title>\n" +
    '  <meta name="description" content="' +
    escapeHtmlAttr(description) +
    '" />\n' +
    '  <meta name="robots" content="noindex,follow" />\n' +
    '  <link rel="canonical" href="' +
    escapeHtmlAttr(canonicalUrl) +
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
    escapeHtmlAttr(canonicalUrl) +
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
    '  <link rel="alternate" href="' +
    escapeHtmlAttr(canonicalUrl) +
    '" />\n'
  );
}

/**
 * 僅含 meta 的 sidecar（noindex，canonical 指回 post.html?slug=）。
 * 供社群爬蟲與 Worker /share 使用；正式 SEO 仍在 post.html?slug= + JS。
 */
export function buildOgSidecarHtml(article) {
  const slug = article.slug;
  const canonicalUrl = blogArticlePostUrl(slug, SITE_ORIGIN);
  const readerUrl = "../post.html?slug=" + encodeURIComponent(slug);
  const seoHead = buildOgMetaHead(article, canonicalUrl, ogSidecarPublicPath(slug));

  return (
    "<!DOCTYPE html>\n" +
    "<html lang=\"zh-Hant\">\n<head>\n" +
    "  <!-- AUTO-GENERATED og sidecar — do not edit; canonical is post.html?slug= -->\n" +
    '  <meta charset="UTF-8" />\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
    seoHead +
    '  <meta http-equiv="refresh" content="0;url=' +
    escapeHtmlAttr(readerUrl) +
    '" />\n' +
    '  <script>location.replace("' +
    escapeHtmlAttr(readerUrl) +
    '");</script>\n' +
    "</head>\n<body>\n" +
    '  <p>正在前往文章… <a href="' +
    escapeHtmlAttr(readerUrl) +
    '">點此繼續</a></p>\n' +
    "</body>\n</html>\n"
  );
}
