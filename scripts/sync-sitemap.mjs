#!/usr/bin/env node
/**
 * 將靜態頁 + 靜態部落格文章寫入 sitemap.xml。
 *
 * 動態文（後台 CMS）由 Worker 即時產生：
 *   https://mrbill-stats.billhuang19get.workers.dev/sitemap-dynamic.xml
 * robots.txt 已指向該網址，上架後無需再跑本 script。
 *
 * 使用：node scripts/sync-sitemap.mjs
 * 時機：新增靜態 .html 文章、或調整全站靜態頁面時。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_JS_PATH = path.join(ROOT, "js", "blog-articles.js");
const CONFIG_PATH = path.join(ROOT, "js", "site-seo.config.json");
const SITEMAP_PATH = path.join(ROOT, "sitemap.xml");

const STATIC_PAGES = [
  { path: "/", file: "index.html" },
  { path: "/blog/index.html", file: "blog/index.html" },
  { path: "/ai-learning-map.html", file: "ai-learning-map.html" },
  { path: "/ai-practice.html", file: "ai-practice.html" },
  { path: "/tutorial.html", file: "tutorial.html" },
  { path: "/photography.html", file: "photography.html" },
  { path: "/design-toolkit.html", file: "design-toolkit.html" },
  { path: "/marketing-seo-geo.html", file: "marketing-seo-geo.html" },
  { path: "/geo-content-lab.html", file: "geo-content-lab.html" }
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadBlogArticles() {
  const src = fs.readFileSync(BLOG_JS_PATH, "utf8");
  const articlesMatch = src.match(/const BLOG_ARTICLES = (\[[\s\S]*?\n\]);/);
  if (!articlesMatch) throw new Error("找不到 BLOG_ARTICLES");
  return Function("return " + articlesMatch[1])();
}

function fileMtimeIso(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.statSync(full).mtime.toISOString().slice(0, 10);
}

function normalizeDate(value) {
  if (!value) return null;
  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);
  const parsed = new Date(text.replace(" ", "T"));
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  return null;
}

function buildUrlEntry(origin, locPath, lastmod) {
  const loc = origin.replace(/\/$/, "") + locPath;
  const mod = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : "";
  return `  <url>\n    <loc>${loc}</loc>\n${mod}  </url>`;
}

function main() {
  const config = readJson(CONFIG_PATH);
  const origin = config.site.origin;
  const staticArticles = loadBlogArticles();

  const entries = [];
  const seen = new Set();

  function pushEntry(locPath, lastmod) {
    if (!locPath || seen.has(locPath)) return;
    seen.add(locPath);
    entries.push({ locPath, lastmod: lastmod || null });
  }

  for (const page of STATIC_PAGES) {
    pushEntry(page.path === "/" ? "/" : page.path, fileMtimeIso(page.file));
  }

  for (const article of staticArticles) {
    pushEntry(
      "/blog/" + article.slug + ".html",
      normalizeDate(article.date) || fileMtimeIso("blog/" + article.slug + ".html")
    );
  }

  entries.sort((a, b) => a.locPath.localeCompare(b.locPath, "zh-Hant"));

  const body = entries
    .map((entry) => buildUrlEntry(origin, entry.locPath, entry.lastmod))
    .join("\n");

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    body +
    "\n</urlset>\n";

  fs.writeFileSync(SITEMAP_PATH, xml, "utf8");
  console.log(`Sitemap sync complete: ${entries.length} static URLs written.`);
  console.log("Dynamic articles: auto via Worker /sitemap-dynamic.xml (see robots.txt)");
}

main();
