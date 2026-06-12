#!/usr/bin/env node
/**
 * 用 repo 內 article-page-html.js 重建單篇靜態上架頁（修正 Hero 亂碼等）。
 * 用法：node scripts/rebuild-static-article.mjs <slug>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildPublishedArticlePageHtml } from "../backend/mrbill-worker/src/article-page-html.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const slug = process.argv[2];

if (!slug) {
  console.error("用法: node scripts/rebuild-static-article.mjs <slug>");
  process.exit(1);
}

const indexPath = resolve(root, "blog", slug, "index.html");
let meta = null;
try {
  const html = readFileSync(indexPath, "utf8");
  const m = html.match(
    /<script type="application\/json" id="blog-static-article-data">([\s\S]*?)<\/script>/
  );
  if (m) meta = JSON.parse(m[1]);
} catch (e) {
  console.error("讀取現有 index.html 失敗:", indexPath, e.message);
  process.exit(1);
}

if (!meta || meta.slug !== slug) {
  console.error("找不到 blog-static-article-data 或 slug 不符:", indexPath);
  process.exit(1);
}

const contentPath = resolve(
  root,
  "backend/mrbill-worker/seeds",
  slug + "-content.html"
);
let contentHtml = "";
try {
  contentHtml = readFileSync(contentPath, "utf8");
} catch {
  const existing = readFileSync(indexPath, "utf8");
  const m = existing.match(
    /<div id="blog-static-content"[^>]*>([\s\S]*)<\/div>\s*<div id="blog-article-nav-slot">/
  );
  contentHtml = m ? m[1].trim() : "";
}

const article = Object.assign({}, meta, { contentHtml, status: "published" });
const out = buildPublishedArticlePageHtml(article);
writeFileSync(indexPath, out, "utf8");
console.log("已重建:", indexPath);
