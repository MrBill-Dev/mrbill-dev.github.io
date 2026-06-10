window.MRBILL_SITE_CONFIG = {
  authorName: "Mr.Bill",
  get siteName() {
    return (window.MRBILL_SITE_SEO && window.MRBILL_SITE_SEO.siteName) || "Mr.Bill 數位實驗室";
  },
  authorHintTemplate:
    "約 20 年網站經驗；整理前端、SEO/GEO、AI 工作流與實作心得。"
};

function renderAuthorSignature(targetId, options) {
  var target = document.getElementById(targetId);
  if (!target || !window.MRBILL_SITE_CONFIG) return;

  var cfg = window.MRBILL_SITE_CONFIG;
  var text = (options && options.text) || cfg.authorHintTemplate || "";
  text = text.replace("{author}", cfg.authorName || "");

  target.className = "mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-600";
  target.innerHTML = '<p><span class="font-black text-slate-800">網站作者：</span>' + (cfg.authorName || "") + "</p>";
  if (text) {
    target.innerHTML += '<p class="mt-1">' + text + "</p>";
  }
}
