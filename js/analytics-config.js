/**
 * GA4 設定（目前未啟用 — 全站尚未完全公開）
 *
 * 公開後：
 * 1. 到 https://analytics.google.com 取得評估 ID（G-開頭），貼到 ga4
 * 2. 在 js/components-loader.js 末尾恢復 loadSiteAnalyticsScripts()（見 git 歷史或 README）
 *
 * 文章「瀏覽次數」：blog-stats.js（全站累計，每次重整 +1），與 GA 無關。
 */
window.SITE_ANALYTICS = {
  ga4: ""
};
