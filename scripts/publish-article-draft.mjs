#!/usr/bin/env node
/**
 * POST 一篇草稿到 Worker CMS。
 * 用法：ADMIN_TOKEN=你的密碼 node scripts/publish-article-draft.mjs backend/mrbill-worker/seeds/2026-06-09-kids-ai-learning-plays.json
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error("用法: ADMIN_TOKEN=xxx node scripts/publish-article-draft.mjs <manifest.json>");
  process.exit(1);
}

const token = process.env.ADMIN_TOKEN || "";
if (!token || token.length < 8) {
  console.error("請設定環境變數 ADMIN_TOKEN（與 Cloudflare / admin.config.local.js 相同，至少 8 字）");
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(resolve(root, manifestPath), "utf8"));
const contentPath = resolve(root, manifest.contentHtmlFile);
manifest.contentHtml = readFileSync(contentPath, "utf8");
delete manifest.contentHtmlFile;

const apiBase = manifest.apiBase || "https://mrbill-stats.billhuang19get.workers.dev";
delete manifest.apiBase;

const body = Object.assign({ status: "draft" }, manifest);

const res = await fetch(apiBase + "/api/admin/articles", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
});

const text = await res.text();
let json;
try {
  json = JSON.parse(text);
} catch {
  json = { raw: text };
}

if (!res.ok) {
  console.error("上架失敗", res.status, json);
  process.exit(1);
}

console.log("草稿已建立:", json.data?.slug || body.slug);
console.log("預覽: blog/post.html?slug=" + encodeURIComponent(json.data?.slug || body.slug) + "&preview=1");
