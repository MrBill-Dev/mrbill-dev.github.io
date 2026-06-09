#!/usr/bin/env node
/**
 * 將獨立 HTML 轉成 CMS 種子（正文 + 外掛 CSS/JS）。
 * 用法：node scripts/prepare-ai-kids-exam-seed.mjs <raw.html>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const rawPath = process.argv[2];
if (!rawPath) {
  console.error("用法: node scripts/prepare-ai-kids-exam-seed.mjs <raw.html>");
  process.exit(1);
}

const raw = readFileSync(resolve(root, rawPath), "utf8");

const styleMatch = raw.match(/<style>([\s\S]*?)<\/style>/i);
const mainMatch = raw.match(/<main class="wrap">([\s\S]*?)<\/main>/i);
const scriptMatch = raw.match(/<script>\s*(\n?\s*const quizData[\s\S]*?)<\/script>\s*<\/body>/i);

if (!mainMatch) {
  console.error("找不到 <main class=\"wrap\">");
  process.exit(1);
}

function scopeCss(css) {
  const out = [];
  let i = 0;
  while (i < css.length) {
    const mediaIdx = css.indexOf("@media", i);
    if (mediaIdx === -1) {
      out.push(scopeRuleBlock(css.slice(i)));
      break;
    }
    if (mediaIdx > i) out.push(scopeRuleBlock(css.slice(i, mediaIdx)));
    const braceStart = css.indexOf("{", mediaIdx);
    let depth = 0;
    let j = braceStart;
    for (; j < css.length; j++) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}") {
        depth--;
        if (depth === 0) {
          j++;
          break;
        }
      }
    }
    const mediaHead = css.slice(mediaIdx, braceStart + 1);
    const inner = css.slice(braceStart + 1, j - 1);
    out.push(mediaHead + scopeRuleBlock(inner) + "}");
    i = j;
  }
  return out.join("");
}

function scopeRuleBlock(block) {
  return block.replace(/(^|})\s*([^@{}][^{]+)\{/g, function (_, before, selector) {
    const scoped = selector
      .split(",")
      .map(function (s) {
        s = s.trim();
        if (!s || s.startsWith(".ai-kids-exam-prose")) return s;
        if (s === ":root" || s === "html" || s === "body") return ".ai-kids-exam-prose";
        return ".ai-kids-exam-prose " + s;
      })
      .join(", ");
    return before + scoped + "{";
  });
}

let mainHtml = mainMatch[1].trim();
mainHtml = mainHtml.replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
mainHtml = mainHtml.replace(
  /<button class="tab-btn([^"]*)"([^>]*)>/g,
  '<button type="button" class="tab-btn$1" data-ai-exam-tab-btn$2>'
);
mainHtml = mainHtml.replace(
  /<button type="button" class="btn-next"/g,
  '<button type="button" class="btn-next" data-ai-exam-quiz-next'
);
mainHtml = mainHtml.replace(
  /<button type="button" class="btn-reset"/g,
  '<button type="button" class="btn-reset" data-ai-exam-quiz-reset'
);
mainHtml = mainHtml.replace(
  /<button type="button" class="btn-remedial"/g,
  '<button type="button" class="btn-remedial" data-ai-exam-quiz-remedial'
);
mainHtml = mainHtml.replace(
  /<button type="button" class="tab-btn/g,
  '<button type="button" class="tab-btn" data-ai-exam-tab-btn'
);
mainHtml = mainHtml.replace(/ data-ai-exam-tab-btn type="button"/g, "");

const contentHtml =
  '<div id="ai-kids-exam-quiz-root" class="ai-kids-exam-prose">\n' +
  mainHtml +
  "\n</div>\n";

const manifest = {
  slug: "2026-06-10-ai-kids-exam-quiz-practice",
  title: "AI 幫小孩出題怎麼用？國小考前複習、錯題分析與線上測驗完整指南",
  subtitle: "從 AI 出題、錯題分析、考古題整理、線上測驗，到孩子學習成長",
  excerpt:
    "完整整理家長如何用 AI 幫國小孩子考前複習，包含五科練習、錯題分析、弱點補強、考古題資源、考券製作與 Google Forms 線上測驗教學。",
  label: "AI 教育",
  audience: "家長、老師、國小學生家長",
  category: "AI學習地圖",
  author: "Mr.Bill",
  date: "2026-06-09",
  readMins: 18,
  tags: [
    "AI 出題",
    "國小考前複習",
    "錯題分析",
    "Google Forms",
    "親子陪讀",
    "AI 教育"
  ],
  cover:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
  relatedSlugs: [
    "2026-06-09-kids-ai-learning-plays",
    "2026-05-31-ai-prompt-six-levels",
    "2026-06-05-ai-workflow-lesson-01-02"
  ],
  titleFont: "serif",
  contentHtmlFile:
    "backend/mrbill-worker/seeds/2026-06-10-ai-kids-exam-quiz-practice-content.html"
};

const seedsDir = resolve(root, "backend/mrbill-worker/seeds");
writeFileSync(
  resolve(seedsDir, "2026-06-10-ai-kids-exam-quiz-practice-content.html"),
  contentHtml,
  "utf8"
);
writeFileSync(
  resolve(seedsDir, "2026-06-10-ai-kids-exam-quiz-practice.json"),
  JSON.stringify(manifest, null, 2) + "\n",
  "utf8"
);

if (styleMatch) {
  const scoped =
    "/* AI 國小考前複習專文 — 僅在 .ai-kids-exam-prose 內生效 */\n" +
    scopeCss(styleMatch[1].trim()) +
    "\n";
  writeFileSync(resolve(root, "css/blog-kids-exam-quiz.css"), scoped, "utf8");
}

if (scriptMatch) {
  const js =
    "/**\n * AI 國小考前複習專文：互動測驗與分頁籤\n */\n" +
    "(function () {\n" +
    "  function initAiKidsExamQuiz() {\n" +
    "    var root = document.getElementById('ai-kids-exam-quiz-root');\n" +
    "    if (!root || root.dataset.aiExamInit === '1') return;\n" +
    "    root.dataset.aiExamInit = '1';\n" +
    scriptMatch[1].trim() +
    "\n    if (typeof renderQuestion === 'function') renderQuestion();\n" +
    "    root.querySelectorAll('[data-ai-exam-tab-btn]').forEach(function (btn, idx) {\n" +
    "      btn.addEventListener('click', function () {\n" +
    "        var tabs = ['tab-en','tab-math','tab-science','tab-social','tab-chinese'];\n" +
    "        if (typeof showTab === 'function') showTab(tabs[idx], btn);\n" +
    "      });\n" +
    "    });\n" +
    "    var nextBtn = root.querySelector('[data-ai-exam-quiz-next]');\n" +
    "    if (nextBtn) nextBtn.addEventListener('click', function () { if (typeof nextQuestion === 'function') nextQuestion(); });\n" +
    "    var resetBtn = root.querySelector('[data-ai-exam-quiz-reset]');\n" +
    "    if (resetBtn) resetBtn.addEventListener('click', function () { if (typeof resetQuiz === 'function') resetQuiz(); });\n" +
    "    var remedialBtn = root.querySelector('[data-ai-exam-quiz-remedial]');\n" +
    "    if (remedialBtn) remedialBtn.addEventListener('click', function () { if (typeof showRemedial === 'function') showRemedial(); });\n" +
    "    root.addEventListener('click', function (ev) {\n" +
    "      var opt = ev.target.closest('.quiz-option');\n" +
    "      if (!opt || typeof checkAnswer !== 'function') return;\n" +
    "      var buttons = root.querySelectorAll('.quiz-option');\n" +
    "      var idx = Array.prototype.indexOf.call(buttons, opt);\n" +
    "      if (idx >= 0) checkAnswer(idx, opt);\n" +
    "    });\n" +
    "  }\n" +
    "  window.initAiKidsExamQuiz = initAiKidsExamQuiz;\n" +
    "  if (document.readyState === 'loading') {\n" +
    "    document.addEventListener('DOMContentLoaded', initAiKidsExamQuiz);\n" +
    "  } else {\n" +
    "    initAiKidsExamQuiz();\n" +
    "  }\n" +
    "})();\n";
  writeFileSync(resolve(root, "js/blog-kids-exam-quiz.js"), js, "utf8");
}

console.log("已產生種子：", manifest.slug);
