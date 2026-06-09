#!/usr/bin/env node
/**
 * 將 manifest + content 寫入遠端 D1（不需 ADMIN_TOKEN，需 wrangler 已登入）。
 * 用法：node scripts/seed-article-d1.mjs backend/mrbill-worker/seeds/2026-06-09-kids-ai-learning-plays.json
 */
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error("用法: node scripts/seed-article-d1.mjs <manifest.json>");
  process.exit(1);
}

function sqlQuote(value) {
  return "'" + String(value ?? "").replace(/'/g, "''") + "'";
}

const manifest = JSON.parse(readFileSync(resolve(root, manifestPath), "utf8"));
const contentHtml = readFileSync(resolve(root, manifest.contentHtmlFile), "utf8");

const sql =
  "INSERT INTO articles (\n" +
  "  slug, title, subtitle, excerpt, label, audience, category, author,\n" +
  "  date, read_mins, tags, cover, related_slugs, content_html, status,\n" +
  "  published_at, featured, home_marquee, home_carousel,\n" +
  "  list_style, title_font, pinned, badge_popular, badge_trending, sort_order, updated_at\n" +
  ") VALUES (\n" +
  `  ${sqlQuote(manifest.slug)},\n` +
  `  ${sqlQuote(manifest.title)},\n` +
  `  ${sqlQuote(manifest.subtitle)},\n` +
  `  ${sqlQuote(manifest.excerpt)},\n` +
  `  ${sqlQuote(manifest.label)},\n` +
  `  ${sqlQuote(manifest.audience)},\n` +
  `  ${sqlQuote(manifest.category)},\n` +
  `  ${sqlQuote(manifest.author || "Mr.Bill")},\n` +
  `  ${sqlQuote(manifest.date)},\n` +
  `  ${Number(manifest.readMins) || 5},\n` +
  `  ${sqlQuote(JSON.stringify(manifest.tags || []))},\n` +
  `  ${sqlQuote(manifest.cover)},\n` +
  `  ${sqlQuote(JSON.stringify(manifest.relatedSlugs || []))},\n` +
  `  ${sqlQuote(contentHtml)},\n` +
  "  'draft',\n" +
  "  NULL, 0, 0, 0, 'auto', " +
  sqlQuote(manifest.titleFont === "serif" ? "serif" : "sans") +
  ", 0, 0, 0, 0, datetime('now')\n" +
  ")\n" +
  "ON CONFLICT(slug) DO UPDATE SET\n" +
  "  title=excluded.title, subtitle=excluded.subtitle, excerpt=excluded.excerpt,\n" +
  "  label=excluded.label, audience=excluded.audience, category=excluded.category,\n" +
  "  author=excluded.author, date=excluded.date, read_mins=excluded.read_mins,\n" +
  "  tags=excluded.tags, cover=excluded.cover, related_slugs=excluded.related_slugs,\n" +
  "  content_html=excluded.content_html, status=excluded.status,\n" +
  "  updated_at=datetime('now');\n";

const tmpSql = resolve(root, "backend/mrbill-worker/seeds/.tmp-seed-article.sql");
writeFileSync(tmpSql, sql, "utf8");

const wrangler = resolve(root, "backend/mrbill-worker/node_modules/.bin/wrangler");
const wranglerCmd = process.platform === "win32" ? wrangler + ".cmd" : wrangler;

const result = spawnSync(
  wranglerCmd,
  ["d1", "execute", "mrbill-stats", "--remote", "--file", tmpSql],
  {
    cwd: resolve(root, "backend/mrbill-worker"),
    stdio: "inherit",
    shell: true
  }
);

try {
  unlinkSync(tmpSql);
} catch {
  /* ignore */
}

if (result.status !== 0) {
  console.error("D1 seed 失敗。可改用: ADMIN_TOKEN=xxx node scripts/publish-article-draft.mjs", manifestPath);
  process.exit(result.status || 1);
}

console.log("草稿已寫入 D1:", manifest.slug);
console.log("預覽: blog/post.html?slug=" + encodeURIComponent(manifest.slug) + "&preview=1");
