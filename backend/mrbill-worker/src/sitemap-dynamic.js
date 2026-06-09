import { blogArticlePublicUrl } from "./article-page-html.js";
import { SITE_ORIGIN } from "./share-seo.js";

export const DYNAMIC_SITEMAP_PATH = "sitemap-dynamic.xml";

const LEGACY_STATIC_SLUGS = new Set([
  "taipei-newtaipei-rainy-day-family",
  "2026-06-06-ai-workflow-lesson-04-06",
  "2026-06-05-ai-workflow-lesson-01-02",
  "2026-05-31-ai-prompt-six-levels"
]);

function escapeXmlText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function articleSitemapLastmod(article) {
  const raw = article.updatedAt || article.date || article.publishedAt || "";
  const text = String(raw).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);
  return "";
}

/** @param {Array<{ slug?: string, updatedAt?: string, date?: string, publishedAt?: string }>} entries */
export function buildDynamicSitemapXmlFromEntries(entries, origin) {
  const base = String(origin || SITE_ORIGIN).replace(/\/$/, "");
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  (entries || []).forEach(function (article) {
    if (!article || !article.slug || LEGACY_STATIC_SLUGS.has(article.slug)) return;
    const loc = blogArticlePublicUrl(article.slug, base);
    const lastmod = articleSitemapLastmod(article);
    lines.push("  <url>");
    lines.push("    <loc>" + escapeXmlText(loc) + "</loc>");
    if (lastmod) {
      lines.push("    <lastmod>" + escapeXmlText(lastmod) + "</lastmod>");
    }
    lines.push("  </url>");
  });

  lines.push("</urlset>");
  return lines.join("\n") + "\n";
}
