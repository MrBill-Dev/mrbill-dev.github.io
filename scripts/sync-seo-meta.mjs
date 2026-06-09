#!/usr/bin/env node
/**
 * 將 js/site-seo.config.json + js/blog-articles.js 的 SEO 資料
 * 同步為各頁 HTML 內的靜態 <meta>（爬蟲無需執行 JS 即可讀取）。
 *
 * 使用：node scripts/sync-seo-meta.mjs
 * 建議：修改 SEO 設定或新增文章後執行一次再部署。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = path.join(ROOT, "js", "site-seo.config.json");
const BLOG_JS_PATH = path.join(ROOT, "js", "blog-articles.js");
const SEO_START = "<!-- site-seo:start -->";
const SEO_END = "<!-- site-seo:end -->";
const SKIP_HTML = new Set([
  "google58917ae48d8e1078.html",
  "article.template.html",
  "post.html",
  "admin.html"
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadBlogData() {
  const src = fs.readFileSync(BLOG_JS_PATH, "utf8");
  const articlesMatch = src.match(/const BLOG_ARTICLES = (\[[\s\S]*?\n\]);/);
  const indexMatch = src.match(/const BLOG_INDEX = (\{[\s\S]*?\n\});/);
  if (!articlesMatch) throw new Error("找不到 BLOG_ARTICLES");
  const BLOG_ARTICLES = Function("return " + articlesMatch[1])();
  const BLOG_INDEX = indexMatch ? Function("return " + indexMatch[1])() : {};
  const bySlug = Object.fromEntries(BLOG_ARTICLES.map((a) => [a.slug, a]));
  return { BLOG_ARTICLES, BLOG_INDEX, bySlug };
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function absUrl(origin, value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return origin.replace(/\/$/, "") + "/" + String(value).replace(/^\//, "");
}

function titleEndsWithSiteBrand(title, site) {
  if (!title) return false;
  const suffix = String(site.titleSuffix || site.siteName || "").trim();
  const name = String(site.siteName || "").trim();
  const t = String(title).trim();
  function endsWithBrand(brand) {
    if (!brand) return false;
    return (
      t.endsWith(brand) ||
      t.endsWith("｜" + brand) ||
      t.endsWith(" — " + brand) ||
      t.endsWith(" - " + brand)
    );
  }
  return endsWithBrand(suffix) || (name !== suffix && endsWithBrand(name));
}

function formatDocumentTitle(site, page) {
  if (page.rawTitle) return page.title;
  if (!page.title) return site.siteName;
  if (titleEndsWithSiteBrand(page.title, site)) return page.title;
  const suffix = site.titleSuffix || site.siteName;
  if (page.title.includes("｜") || page.title.includes("|")) {
    return page.title + " — " + suffix;
  }
  return page.title + "｜" + suffix;
}

function blogArticleOgTitle(article) {
  const title = String(article.title || "").trim();
  const subtitle = String(article.subtitle || "").trim();
  if (!title) return "";
  if (title.includes("｜") || title.includes("|")) return title;
  if (subtitle) return title + "｜" + subtitle;
  return title;
}

function canonicalUrl(site, page, htmlRelPath) {
  if (page.canonical) return absUrl(site.origin, page.canonical);
  if (page.path) {
    if (page.path === "/") return site.origin + "/";
    return absUrl(site.origin, page.path);
  }
  const normalized = htmlRelPath.replace(/\\/g, "/");
  if (normalized === "index.html") return site.origin + "/";
  return absUrl(site.origin, normalized);
}

function mergePageSeo(site, pages, pageId, htmlRelPath, extra = {}) {
  const registry = (pageId && pages[pageId]) || {};
  const merged = {
    type: "website",
    title: "",
    description: site.defaultDescription,
    ogTitle: "",
    ogDescription: "",
    ogImage: site.defaultOgImage,
    ogImageWidth: site.defaultOgImageWidth,
    ogImageHeight: site.defaultOgImageHeight,
    ogImageAlt: site.defaultOgImageAlt,
    twitterDescription: "",
    rawTitle: false,
    jsonLd: false,
    skipOrganization: false,
    ...registry,
    ...extra
  };

  if (!merged.ogTitle) merged.ogTitle = merged.title;
  if (!merged.ogDescription) merged.ogDescription = merged.description;
  if (!merged.twitterDescription) {
    merged.twitterDescription = merged.ogDescription || merged.description;
  }
  merged.documentTitle = formatDocumentTitle(site, merged);
  merged.canonical = canonicalUrl(site, merged, htmlRelPath);
  merged.ogImageAbs = absUrl(site.origin, merged.ogImage);
  return merged;
}

function blogArticleSeo(site, article) {
  const ogTitle = blogArticleOgTitle(article);
  return {
    title: article.title,
    description: article.excerpt,
    ogTitle: ogTitle,
    ogDescription: article.excerpt,
    ogImage: article.cover,
    twitterDescription: article.excerpt,
    type: "article",
    path: "/blog/" + article.slug + ".html",
    skipOrganization: true,
    jsonLd: false
  };
}

function buildSeoBlock(site, page, assetPrefix) {
  const lines = [];
  lines.push(`  <meta name="description" content="${escapeAttr(page.description)}" />`);
  if (page.type === "article") {
    lines.push('  <meta name="robots" content="index,follow,max-image-preview:large" />');
  }
  lines.push(`  <link rel="canonical" href="${escapeAttr(page.canonical)}" />`);
  if (page.ogImage) {
    const preload = assetPrefix + page.ogImage.replace(/^\//, "");
    lines.push(`  <link rel="preload" as="image" href="${escapeAttr(preload)}" />`);
  }
  lines.push(`  <meta property="og:type" content="${escapeAttr(page.type)}" />`);
  lines.push(`  <meta property="og:site_name" content="${escapeAttr(site.siteName)}" />`);
  lines.push(`  <meta property="og:locale" content="${escapeAttr(site.locale)}" />`);
  lines.push(`  <meta property="og:title" content="${escapeAttr(page.ogTitle)}" />`);
  lines.push(`  <meta property="og:description" content="${escapeAttr(page.ogDescription)}" />`);
  lines.push(`  <meta property="og:url" content="${escapeAttr(page.canonical)}" />`);
  lines.push(`  <meta property="og:image" content="${escapeAttr(page.ogImageAbs)}" />`);
  lines.push(`  <meta property="og:image:width" content="${escapeAttr(page.ogImageWidth)}" />`);
  lines.push(`  <meta property="og:image:height" content="${escapeAttr(page.ogImageHeight)}" />`);
  lines.push(`  <meta property="og:image:alt" content="${escapeAttr(page.ogImageAlt)}" />`);
  lines.push(`  <meta name="twitter:card" content="${escapeAttr(site.twitterCard)}" />`);
  lines.push(`  <meta name="twitter:title" content="${escapeAttr(page.ogTitle)}" />`);
  lines.push(`  <meta name="twitter:description" content="${escapeAttr(page.twitterDescription)}" />`);
  lines.push(`  <meta name="twitter:image" content="${escapeAttr(page.ogImageAbs)}" />`);

  if (!page.skipOrganization && (page.jsonLd || page.type === "website")) {
    const org = {
      ...site.organization,
      url: site.origin + "/"
    };
    lines.push(
      "  <script type=\"application/ld+json\">\n" +
        JSON.stringify(org, null, 2)
          .split("\n")
          .map((line) => "  " + line)
          .join("\n") +
        "\n  </script>"
    );
  }

  return lines.join("\n");
}

function extractDataSeoPage(html) {
  const m = html.match(/<html[^>]*\sdata-seo-page=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : "";
}

function resolvePageId(htmlRelPath, html, pages, blogBySlug) {
  const fromAttr = extractDataSeoPage(html);
  if (fromAttr) return fromAttr;

  const normalized = htmlRelPath.replace(/\\/g, "/");
  if (normalized === "index.html") return "home";

  const blogMatch = normalized.match(/^blog\/([^/]+)\.html$/i);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (slug === "index") return "blog-index";
    if (blogBySlug[slug]) return { blogSlug: slug };
  }

  const base = path.basename(normalized, ".html");
  if (pages[base]) return base;

  const title = extractTitle(html).split("｜")[0].split("|")[0].trim();
  return { fallbackTitle: title };
}

function ensureSeoScripts(html, depth) {
  const prefix = depth > 0 ? "../".repeat(depth) : "";
  const configSrc = prefix + "js/site-seo.config.js";
  const seoSrc = prefix + "js/site-seo.js";
  const bundle =
    `  <script src="${configSrc}"></script>\n  <script src="${seoSrc}"></script>`;

  let next = html.replace(/\s*<script src="[^"]*site-seo\.config\.js"><\/script>\s*/g, "\n");
  next = next.replace(/\s*<script src="[^"]*site-seo\.js"><\/script>\s*/g, "\n");

  if (next.includes(SEO_END)) {
    return next.replace(SEO_END, SEO_END + "\n" + bundle);
  }
  return next.replace(/<\/head>/i, bundle + "\n</head>");
}

function upsertSeoRegion(html, block) {
  const region = "  " + SEO_START + "\n" + block + "\n  " + SEO_END;
  if (html.includes(SEO_START)) {
    return html.replace(
      new RegExp(`  ${SEO_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?  ${SEO_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
      region
    );
  }
  return html.replace(/<title>[^<]*<\/title>/i, (titleTag) => titleTag + "\n" + region);
}

function syncHtmlFile(filePath, config, blogBySlug) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
  if (SKIP_HTML.has(path.basename(rel))) return null;

  let html = fs.readFileSync(filePath, "utf8");
  const site = config.site;
  const pages = config.pages;
  const depth = rel.includes("/") ? rel.split("/").length - 1 : 0;
  const assetPrefix = depth > 0 ? "../".repeat(depth) : "";

  const pageRef = resolvePageId(rel, html, pages, blogBySlug);
  let pageExtra = {};

  if (pageRef && typeof pageRef === "object") {
    if (pageRef.blogSlug) {
      pageExtra = blogArticleSeo(site, blogBySlug[pageRef.blogSlug]);
    } else if (pageRef.fallbackTitle) {
      pageExtra = { title: pageRef.fallbackTitle };
    }
  }

  const pageId = typeof pageRef === "string" ? pageRef : null;
  const merged = mergePageSeo(site, pages, pageId, rel, pageExtra);
  const block = buildSeoBlock(site, merged, assetPrefix);

  html = upsertSeoRegion(html, block);
  html = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeAttr(merged.documentTitle)}</title>`
  );
  html = ensureSeoScripts(html, depth);
  html = html.replace(/\sdata-seo-auto(=["'][^"']*["'])?/gi, "");

  fs.writeFileSync(filePath, html, "utf8");
  return { rel, title: merged.documentTitle };
}

function writeGeneratedConfig(config) {
  const out = path.join(ROOT, "js", "site-seo.config.js");
  const body =
    "// AUTO-GENERATED by scripts/sync-seo-meta.mjs — do not edit by hand\n" +
    "window.__MRBILL_SEO_CONFIG__ = " +
    JSON.stringify(config, null, 2) +
    ";\n";
  fs.writeFileSync(out, body, "utf8");
}

function collectHtmlFiles(dir, list = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "components" || entry.name === "node_modules") continue;
      collectHtmlFiles(full, list);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      list.push(full);
    }
  }
  return list;
}

function main() {
  const config = readJson(CONFIG_PATH);
  const { bySlug } = loadBlogData();
  writeGeneratedConfig(config);

  const files = collectHtmlFiles(ROOT);
  const updated = [];

  for (const file of files) {
    const result = syncHtmlFile(file, config, bySlug);
    if (result) updated.push(result);
  }

  console.log(`SEO sync complete: ${updated.length} HTML files updated.`);
  console.log(`Generated js/site-seo.config.js from js/site-seo.config.json`);
  updated.forEach((item) => console.log(`  - ${item.rel}`));
}

main();
