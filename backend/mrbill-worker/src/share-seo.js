/** 動態文章社群分享 HTML（Worker 從 D1 即時產生 OG meta） */

export const SITE_ORIGIN = "https://mrbill-dev.github.io";
export const SITE_NAME = "Mr.Bill 數位實驗室";
export const SITE_LOCALE = "zh_TW";
export const DEFAULT_OG_IMAGE = SITE_ORIGIN + "/images/og-home.jpg";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE_ALT =
  "Mr.Bill 數位實驗室 AI 前端 攝影 SEO 學習平台";

const BLOG_FALLBACK_COVERS = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
];

function blogCoverSeedHash(str) {
  let h = 0;
  const s = String(str || "blog");
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function blogArticleOgTitle(article) {
  if (!article) return "";
  const title = String(article.title || "").trim();
  const subtitle = String(article.subtitle || "").trim();
  if (!title) return "";
  if (title.includes("｜") || title.includes("|")) return title;
  if (subtitle) return title + "｜" + subtitle;
  return title;
}

export function blogResolveCover(article) {
  if (!article) return BLOG_FALLBACK_COVERS[0];
  const cover = String(article.cover || "").trim();
  if (cover) return cover;
  const key = article.slug || article.title || "blog";
  return BLOG_FALLBACK_COVERS[blogCoverSeedHash(key) % BLOG_FALLBACK_COVERS.length];
}

export function absUrl(origin, value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return origin.replace(/\/$/, "") + "/" + String(value).replace(/^\//, "");
}

export function blogArticleCanonicalUrl(slug, origin) {
  const base = (origin || SITE_ORIGIN).replace(/\/$/, "");
  return base + "/blog/" + slug + "/";
}

export function blogArticleSharePageUrl(slug, origin) {
  return blogArticleCanonicalUrl(slug, origin);
}

export function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

export function formatDocumentTitle(article) {
  const ogTitle = blogArticleOgTitle(article);
  if (!ogTitle) return SITE_NAME;
  if (ogTitle.includes("｜") || ogTitle.includes("|")) {
    return ogTitle + " — " + SITE_NAME;
  }
  return ogTitle + "｜" + SITE_NAME;
}

/**
 * @param {object} article
 * @param {{ pageUrl?: string, canonicalUrl?: string, redirectUrl?: string }} opts
 */
export function buildShareHtml(article, opts) {
  opts = opts || {};
  const slug = article.slug;
  const canonical =
    opts.canonicalUrl || blogArticleCanonicalUrl(slug, SITE_ORIGIN);
  const pageUrl = opts.pageUrl || blogArticleSharePageUrl(slug, SITE_ORIGIN);
  const redirectUrl = opts.redirectUrl || pageUrl;
  const ogTitle = blogArticleOgTitle(article);
  const description = String(article.excerpt || article.subtitle || "").trim();
  const ogImage = absUrl(SITE_ORIGIN, blogResolveCover(article));
  const ogImageAlt = String(article.title || "Mr.Bill 文章筆記").trim();
  const docTitle = formatDocumentTitle(article);

  return (
    "<!DOCTYPE html>\n" +
    '<html lang="zh-Hant">\n<head>\n' +
    '  <meta charset="UTF-8" />\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
    "  <title>" +
    escapeHtmlAttr(docTitle) +
    "</title>\n" +
    '  <meta name="description" content="' +
    escapeHtmlAttr(description) +
    '" />\n' +
    '  <link rel="canonical" href="' +
    escapeHtmlAttr(canonical) +
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
    '  <meta http-equiv="refresh" content="0;url=' +
    escapeHtmlAttr(redirectUrl) +
    '" />\n' +
    '  <script>location.replace("' +
    escapeHtmlAttr(redirectUrl) +
    '");</script>\n' +
    "</head>\n<body>\n" +
    "  <p>正在前往文章… <a href=\"" +
    escapeHtmlAttr(redirectUrl) +
    '">點此繼續</a></p>\n' +
    "</body>\n</html>\n"
  );
}
