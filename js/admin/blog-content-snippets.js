/**
 * 動態文章正文版型（與靜態 4 篇 <article class="blog-main blog-prose"> 內相同 class）
 * 封面、標題、喜歡數在後台表單欄位，不在此 HTML。
 */
window.MRBILL_BLOG_SNIPPETS = {
  starter:
    '<section id="blog-intro" class="scroll-mt-28 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4">\n' +
    '  <p class="text-sm font-bold text-indigo-600">👨‍🏫 段落標籤（選填）</p>\n' +
    '  <h2 class="text-2xl font-black text-slate-900">開場標題</h2>\n' +
    '  <p class="text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 leading-relaxed"><strong class="text-slate-800">適合誰：</strong>讀者對象說明。</p>\n' +
    '  <div class="blog-text-chunks">\n' +
    '    <p class="text-slate-700 leading-relaxed">第一段正文。</p>\n' +
    '    <p class="text-slate-700 leading-relaxed">第二段正文。</p>\n' +
    "  </div>\n" +
    "</section>\n" +
    '<section class="scroll-mt-28 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4">\n' +
    '  <h2 class="text-2xl font-black text-slate-900">第二章節</h2>\n' +
    '  <p class="text-slate-700 leading-relaxed">章節正文…</p>\n' +
    "</section>",

  intro:
    '<section id="blog-intro" class="scroll-mt-28 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4">\n' +
    '  <p class="text-sm font-bold text-indigo-600">👨‍🏫 段落標籤</p>\n' +
    '  <h2 class="text-2xl font-black text-slate-900">章節標題</h2>\n' +
    '  <p class="text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 leading-relaxed"><strong class="text-slate-800">適合誰：</strong>…</p>\n' +
    '  <p class="text-slate-700 leading-relaxed">正文…</p>\n' +
    "</section>",

  section:
    '<section class="scroll-mt-28 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4">\n' +
    '  <h2 class="text-2xl font-black text-slate-900">章節標題</h2>\n' +
    '  <p class="text-slate-700 leading-relaxed">正文…</p>\n' +
    "</section>",

  bridge:
    '<section class="blog-bridge scroll-mt-28">\n' +
    '  <p class="blog-bridge__title">章節轉場標題</p>\n' +
    '  <p class="blog-bridge__desc">轉場說明一句話</p>\n' +
    "</section>",

  callout:
    '<div class="rounded-2xl bg-indigo-50 border border-indigo-100 p-5">\n' +
    '  <p class="font-bold text-indigo-900">重點提示</p>\n' +
    '  <p class="text-sm text-slate-600 mt-2">補充說明…</p>\n' +
    "</div>",

  code:
    '<pre class="blog-pre rounded-xl bg-slate-100 border border-slate-200 p-4 text-sm text-slate-800">程式碼或 Prompt 範例</pre>',

  image:
    '<img src="../assets/你的圖片.png" alt="圖片說明" class="w-full rounded-2xl object-cover border border-slate-200" loading="lazy" />',

  compare:
    '<div class="blog-compare-stack">\n' +
    '  <div>\n' +
    '    <p class="blog-compare-stack__label blog-compare-stack__label--weak">❌ 不好的做法</p>\n' +
    '    <div class="blog-code-block">範例文字</div>\n' +
    "  </div>\n" +
    '  <p class="blog-compare-divider" aria-hidden="true">↓ 改進後</p>\n' +
    '  <div>\n' +
    '    <p class="blog-compare-stack__label blog-compare-stack__label--strong">✅ 較好的做法</p>\n' +
    '    <div class="blog-code-block blog-pre">改進後範例</div>\n' +
    "  </div>\n" +
    "</div>"
};

window.MRBILL_BLOG_SNIPPET_LABELS = {
  starter: "完整開場（新文預設）",
  intro: "開場章節",
  section: "白底章節卡",
  bridge: "章節轉場",
  callout: "重點提示框",
  code: "程式碼／Prompt",
  image: "內文圖片",
  compare: "前後對照"
};
