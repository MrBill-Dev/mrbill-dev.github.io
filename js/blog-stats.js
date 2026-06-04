/**
 * 專題文章：全站累計瀏覽（每次進入或重整都 +1，含所有讀者）
 * 使用不蒜子 page_pv — 非本機、非 30 分鐘去重
 */
(function () {
  var el =
    document.getElementById("busuanzi_value_page_pv") ||
    document.getElementById("blog-view-count");
  if (!el) return;

  el.id = "busuanzi_value_page_pv";

  var wrap =
    document.getElementById("busuanzi_container_page_pv") ||
    el.closest(".blog-hero__views");
  if (wrap) wrap.id = "busuanzi_container_page_pv";

  if (document.querySelector("script[data-busuanzi]")) return;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  s.setAttribute("data-busuanzi", "1");
  s.onerror = function () {
    if (wrap) wrap.style.display = "none";
  };
  document.body.appendChild(s);
})();
