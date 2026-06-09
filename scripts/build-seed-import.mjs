#!/usr/bin/env node
/**
 * 從 backend/mrbill-worker/seeds/*.json 產生 js/admin/seed-imports/*.js
 * 用法：node scripts/build-seed-import.mjs [manifest.json ...]
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const outDir = resolve(root, "js/admin/seed-imports");

const manifests =
  process.argv.length > 2
    ? process.argv.slice(2)
    : ["backend/mrbill-worker/seeds/2026-06-09-kids-ai-learning-plays.json"];

mkdirSync(outDir, { recursive: true });

const drafts = manifests.map(function (rel) {
  const manifestPath = resolve(root, rel);
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const htmlPath = resolve(root, manifest.contentHtmlFile);
  const payload = Object.assign({ status: "draft" }, manifest, {
    contentHtml: readFileSync(htmlPath, "utf8")
  });
  delete payload.contentHtmlFile;
  return payload;
});

const outPath = resolve(outDir, "pending-drafts.js");
const banner =
  "/** 由 scripts/build-seed-import.mjs 產生，供 admin.html 一鍵匯入草稿。 */\n";
writeFileSync(
  outPath,
  banner + "window.MRBILL_SEED_DRAFTS = " + JSON.stringify(drafts, null, 2) + ";\n",
  "utf8"
);

console.log("已產生", outPath, "(" + drafts.length + " 篇)");
