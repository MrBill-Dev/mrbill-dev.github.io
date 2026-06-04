/**
 * 教學文章：頁面累計瀏覽（不蒜子 Busuanzi，靜態站免後端）
 * 頁面需有 #busuanzi_value_page_pv；同一訪客重複整理會累計（第三方服務規則）。
 */
(function () {
  var pv = document.getElementById("busuanzi_value_page_pv");
  if (!pv || document.querySelector("script[data-busuanzi]")) return;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  s.setAttribute("data-busuanzi", "1");
  s.onerror = function () {
    var wrap = document.getElementById("busuanzi_container_page_pv");
    if (wrap) wrap.style.display = "none";
  };
  document.body.appendChild(s);
})();
