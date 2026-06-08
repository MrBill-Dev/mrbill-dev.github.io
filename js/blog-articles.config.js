/**
 * 動態文章 API（Cloudflare Worker，與喜歡數同一 Worker）
 * 正式站與公司預覽站共用此設定。
 */
(function () {
  var hostname = (window.location.hostname || "").toLowerCase();
  var isLocalDev = hostname === "localhost" || hostname === "127.0.0.1";

  var endpoints = {
    local: "http://localhost:8787",
    production: "https://mrbill-stats.billhuang19get.workers.dev"
  };

  window.BLOG_ARTICLES_API = isLocalDev ? endpoints.local : endpoints.production;
})();
