#!/usr/bin/env node
/** One-off: build content HTML from raw GPT export. */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mainPath = resolve(__dirname, "_raw-notebooklm-main.html");
const outPath = resolve(__dirname, "2026-06-11-notebooklm-complete-guide-content.html");

const styleInner = `html{scroll-behavior:smooth}.article p{line-height:1.9}.article li{line-height:1.85}.section-title{letter-spacing:-.02em}.kbd{border:1px solid #d8deea;background:#fff;border-radius:.55rem;padding:.08rem .45rem;font-size:.82rem;box-shadow:0 1px 0 rgba(23,32,51,.08)}
.ui-window{background:#eef2fb;border:1px solid #dfe6f3;border-radius:20px;padding:12px;box-shadow:0 16px 48px rgba(23,32,51,.10);font-size:.8125rem;line-height:1.45}.ui-grid{display:grid;grid-template-columns:1fr;gap:10px;min-height:0}.ui-panel{background:#fff;border:1px solid #dfe6f3;border-radius:16px;overflow:hidden;position:relative;min-height:0;transition:box-shadow .35s ease}.ui-panel.is-zone-active{box-shadow:0 0 0 2px #2563eb,0 10px 28px rgba(37,99,235,.14)}.ui-head{height:auto;min-height:36px;border-bottom:1px solid #e5eaf3;display:flex;align-items:center;justify-content:space-between;padding:.55rem 12px;font-weight:700;font-size:.95em;gap:.5rem;flex-wrap:wrap}.nlm-zone-step{color:#2563eb;font-weight:800;margin-right:.15rem}.nlm-zone-tag{font-size:.78rem;font-weight:600;color:#64748b}.nlm-zone-desc{margin:0;padding:.55rem 12px .75rem;font-size:.82rem;line-height:1.55;color:#64748b;border-bottom:1px solid #eef2f7;background:#f8fafc}.pill{display:inline-flex;align-items:center;gap:.35rem;border:1px solid #dbe3ef;border-radius:999px;padding:.35rem .65rem;background:#fff;font-size:.85em;white-space:normal;max-width:100%;overflow-wrap:anywhere;word-break:break-word}.studio-card{border-radius:12px;padding:10px;border:1px solid transparent;min-height:0;display:flex;align-items:center;justify-content:space-between;gap:8px;font-weight:700;font-size:.92em}.studio-card span{min-width:0;flex:1;line-height:1.35}.studio-card b{flex-shrink:0;opacity:.55}.studio-card small{display:block;font-weight:500;color:#6b7280;margin-top:2px;font-size:.85em;line-height:1.25}
.flow-line{position:relative}.flow-line:before{content:'';position:absolute;left:22px;top:48px;bottom:-20px;width:2px;background:#e2e8f0}.flow-step:last-child .flow-line:before{display:none}.badge{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;font-weight:800}.codebox{background:#0f172a;color:#e2e8f0;border-radius:18px;padding:18px;overflow:auto;font-size:.92rem;line-height:1.75;border:1px solid rgba(255,255,255,.08);white-space:pre-wrap}.prompt{background:#fff;border:1px solid #dfe6f3;border-radius:18px;padding:16px;box-shadow:0 8px 22px rgba(23,32,51,.06)}
.anim-stage{position:relative;height:260px;background:linear-gradient(135deg,#f8fafc,#eef4ff);border:1px solid #dce4f0;border-radius:24px;overflow:hidden}.doc{position:absolute;width:92px;height:118px;background:#fff;border:1px solid #d7deea;border-radius:12px;box-shadow:0 10px 28px rgba(23,32,51,.12);padding:14px}.doc:before{content:'';display:block;width:44px;height:8px;background:#cbd5e1;border-radius:8px;margin-bottom:10px}.doc:after{content:'';display:block;width:64px;height:8px;background:#e2e8f0;border-radius:8px;box-shadow:0 18px 0 #e2e8f0,0 36px 0 #e2e8f0}.doc1{left:24px;top:36px;animation:docMove1 7s infinite}.doc2{left:54px;top:112px;animation:docMove2 7s infinite}.doc3{left:116px;top:66px;animation:docMove3 7s infinite}.brain{position:absolute;left:42%;top:74px;width:118px;height:118px;border-radius:32px;background:linear-gradient(135deg,#2563eb,#8b5cf6);color:#fff;display:flex;align-items:center;justify-content:center;font-size:42px;box-shadow:0 16px 40px rgba(37,99,235,.26);animation:brainGlow 7s infinite}.out{position:absolute;right:26px;border-radius:14px;background:#fff;border:1px solid #d7deea;box-shadow:0 10px 28px rgba(23,32,51,.1);padding:12px 14px;font-weight:800}.out1{top:30px;animation:outPop1 7s infinite}.out2{top:104px;animation:outPop2 7s infinite}.out3{top:178px;animation:outPop3 7s infinite}@keyframes docMove1{0%,15%{transform:translate(0,0);opacity:1}35%,100%{transform:translate(285px,50px) scale(.78);opacity:.15}}@keyframes docMove2{0%,22%{transform:translate(0,0);opacity:1}42%,100%{transform:translate(252px,-16px) scale(.78);opacity:.15}}@keyframes docMove3{0%,30%{transform:translate(0,0);opacity:1}50%,100%{transform:translate(194px,20px) scale(.78);opacity:.15}}@keyframes brainGlow{0%,48%{filter:saturate(1);transform:scale(1)}58%{filter:saturate(1.4);transform:scale(1.06)}100%{filter:saturate(1);transform:scale(1)}}@keyframes outPop1{0%,58%{transform:translateX(40px);opacity:0}65%,100%{transform:none;opacity:1}}@keyframes outPop2{0%,66%{transform:translateX(40px);opacity:0}73%,100%{transform:none;opacity:1}}@keyframes outPop3{0%,74%{transform:translateX(40px);opacity:0}81%,100%{transform:none;opacity:1}}
.compare-ok{border-left:5px solid #10b981}.compare-no{border-left:5px solid #f43f5e}.table-wrap{display:block;width:100%;max-width:100%;overflow-x:visible;-webkit-overflow-scrolling:touch}.table-wrap table{min-width:0;width:100%;max-width:100%;table-layout:fixed}.table-wrap th{background:#f8fafc}.table-wrap th,.table-wrap td{padding:12px 14px;border-bottom:1px solid #e5e7eb;text-align:left;vertical-align:top;overflow-wrap:anywhere;word-break:normal;white-space:normal}.callout{border:1px solid #dbeafe;background:#eff6ff;border-radius:22px;padding:20px}.warn{border:1px solid #fed7aa;background:#fff7ed}.danger{border:1px solid #fecdd3;background:#fff1f2}.success{border:1px solid #bbf7d0;background:#f0fdf4}.c-purple{background:#f0edff;color:#6941c6}.c-green{background:#eafaf1;color:#067647}.c-pink{background:#fff0f6;color:#c11574}.c-amber{background:#fff7e6;color:#b54708}.c-blue{background:#eaf4ff;color:#175cd3}.c-cyan{background:#e9fbff;color:#026aa2}.c-red{background:#fff1f3;color:#c01048}.c-gray{background:#f4f6fb;color:#344054}`;

let main = readFileSync(mainPath, "utf8");

main = main.replace(/class="ui-grid"/g, 'class="ui-grid ui-grid--desktop"');

// GPT 原始碼常把換行寫成字面 \n；codebox / prompt 再轉成 <br> 避免 D1 或 HTML 壓縮後露出字面量
main = main.replace(/\\n/g, "\n");
main = main.replace(
  /(<div class="(?:codebox|prompt)[^"]*">)([\s\S]*?)(<\/div>)/g,
  (_, open, body, close) => open + body.replace(/\n/g, "<br>\n") + close
);

// Title lives in CMS hero — avoid duplicate h1 in body
main = main.replace(
  /<h1 class="section-title text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">([\s\S]*?)<\/h1>/i,
  '<p class="section-title text-2xl sm:text-3xl font-black leading-tight text-slate-800">$1</p>'
);

const utilityOverrides = "";

const toc = `<nav class="toc mb-8 rounded-2xl border border-line bg-white p-4" aria-label="文章目錄">
  <p class="text-sm font-bold text-slate-500 mb-2">快速導覽</p>
  <div class="flex flex-wrap gap-1 text-sm">
    <a href="#meaning" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">用途</a>
    <a href="#starter" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">起步</a>
    <a href="#official-demo" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">實測</a>
    <a href="#steps" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">Prompt</a>
    <a href="#rules" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">規則</a>
    <a href="#studio" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">工作室</a>
    <a href="#deep-dive" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">深化</a>
    <a href="#workflows" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">工作流</a>
    <a href="#tools" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">工具</a>
    <a href="#pricing" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">費用</a>
    <a href="#resources" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">資源</a>
    <a href="#faq" class="rounded-full border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">FAQ</a>
    <a href="https://notebooklm.google/" target="_blank" rel="noopener" class="rounded-full bg-ink px-3 py-1.5 font-bold text-white ml-auto">前往官方</a>
  </div>
</nav>`;

const disclaimer = `<p class="text-sm text-slate-500 border-t border-line pt-6 mt-8 leading-7">本文為 NotebookLM 教學示意，介面功能與額度可能依帳號、地區、語言與官方更新而不同。建議上線前再次核對官方說明。</p>`;

const html =
  `<div id="notebooklm-guide-root" class="notebooklm-prose article">\n` +
  `<style>\n${styleInner}\n</style>\n` +
  toc +
  `\n` +
  main.trim() +
  `\n` +
  disclaimer +
  `\n</div>\n`;

writeFileSync(outPath, html, "utf8");
console.log("Wrote", outPath, "(" + Buffer.byteLength(html, "utf8") + " bytes)");
