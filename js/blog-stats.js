/**
 * 專題文章：全站累計瀏覽（不蒜子 page_pv）
 * Hero 若由 component 非同步載入，須在載入後呼叫 initBlogStats()（見 initBlogArticlePage）
 */
var BLOG_BUSUANZI_SRC = [
  "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js",
  "https://busuanzi.icodeq.com/busuanzi.pure.mini.js"
];

function initBlogStats() {
  var el =
    document.getElementById("busuanzi_value_page_pv") ||
    document.getElementById("blog-view-count");
  if (!el) return false;

  el.id = "busuanzi_value_page_pv";

  var wrap =
    document.getElementById("busuanzi_container_page_pv") ||
    el.closest(".blog-hero__views");
  if (wrap) wrap.id = "busuanzi_container_page_pv";

  if (document.querySelector("script[data-busuanzi]")) return true;

  function loadScript(index) {
    if (index >= BLOG_BUSUANZI_SRC.length) {
      if (wrap) wrap.style.display = "none";
      return;
    }
    var s = document.createElement("script");
    s.async = true;
    s.src = BLOG_BUSUANZI_SRC[index];
    s.setAttribute("data-busuanzi", "1");
    s.onerror = function () {
      s.remove();
      loadScript(index + 1);
    };
    document.body.appendChild(s);
  }

  loadScript(0);
  return true;
}

window.initBlogStats = initBlogStats;

/* Hero 已寫在 HTML 時（無 async slot）仍可自動啟動 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("blog-article-hero-slot")) return;
    initBlogStats();
  });
} else if (!document.getElementById("blog-article-hero-slot")) {
  initBlogStats();
}
