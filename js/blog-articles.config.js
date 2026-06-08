/**
 * 動態文章 API（Cloudflare Worker，與喜歡數同一 Worker）
 * 本機 Live Server、公司預覽站、GitHub 正式站共用雲端 Worker（不需本機 wrangler dev）。
 */
(function () {
  window.BLOG_ARTICLES_API =
    "https://mrbill-stats.billhuang19get.workers.dev";
})();
