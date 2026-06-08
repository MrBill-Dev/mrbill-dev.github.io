/**
 * Blog 喜歡數 API（Cloudflare Worker）
 *
 * 公司預覽：https://plan.get.com.tw/get/webmaster/billhuang/mrbill-dev/
 * 正式站：  https://mrbill-dev.github.io/
 *
 * deploy 後把 REPLACE_ME 改成你的 workers.dev 網址。
 * 喜歡數永遠以 GitHub canonical 累計，兩邊看到同一數字。
 */
(function () {
  var hostname = (window.location.hostname || "").toLowerCase();
  var isLocalDev = hostname === "localhost" || hostname === "127.0.0.1";

  var endpoints = {
    local: "http://localhost:8787/api",
    production: "https://mrbill-stats.billhuang19get.workers.dev/api"
  };

  window.BLOG_STATS_API = isLocalDev ? endpoints.local : endpoints.production;
})();
