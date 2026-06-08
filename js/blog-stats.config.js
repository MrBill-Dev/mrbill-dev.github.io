/**
 * Blog 喜歡數 API（Cloudflare Worker）
 *
 * 本機 Live Server、公司預覽站、GitHub 正式站共用雲端 Worker。
 * 喜歡數以 GitHub canonical 累計，各環境看到同一數字。
 */
(function () {
  window.BLOG_STATS_API =
    "https://mrbill-stats.billhuang19get.workers.dev/api";
})();
