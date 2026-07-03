/**
 * 動態文章 API（Cloudflare Worker，與喜歡數同一 Worker）
 * 本機 Live Server、公司預覽站、GitHub 正式站共用雲端 Worker（不需本機 wrangler dev）。
 */
(function () {
  window.BLOG_ARTICLES_API =
    "https://mrbill-stats.billhuang19get.workers.dev";
  /** 變更 js/blog-articles.js 時請同步 bump 各頁 ?v= 與 components-loader */
  window.BLOG_ARTICLES_JS_VERSION = "rail-root-links-2";
})();
