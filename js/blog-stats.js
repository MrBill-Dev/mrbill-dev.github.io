/**
 * 專題文章：喜歡人數（集中式 API，全裝置同一累計）
 * 呈現為「♥ 已有 X 位讀者喜歡」
 * - 開頁：POST +1，顯示伺服器回傳的 page_pv
 * - 按「我也喜歡」：POST +1（同裝置每篇一次）
 * - 切回分頁：GET 僅讀取最新數字（不再 +1）
 */
var BLOG_STATS_API = "https://bsz.saop.cc/api";

function getBlogLikeCountEl() {
  return (
    document.getElementById("busuanzi_value_page_pv") ||
    document.getElementById("blog-view-count")
  );
}

function getBlogStatsWrapEl() {
  var el = getBlogLikeCountEl();
  return (
    document.getElementById("busuanzi_container_page_pv") ||
    (el && el.closest(".blog-hero__likes")) ||
    (el && el.closest(".blog-hero__views"))
  );
}

function isBlogStatsPlaceholder(text) {
  var val = String(text || "").trim();
  return !val || val === "…" || val === "..." || val === "—";
}

function setBlogLikeCountDisplay(value) {
  var el = getBlogLikeCountEl();
  if (!el || value === undefined || value === null) return false;
  var n = Number(value);
  if (!isFinite(n) || n < 0) return false;
  el.textContent = String(Math.floor(n));
  return true;
}

/** 固定 canonical 網址，避免手機/電腦因網址不同被算成兩筆 */
function getBlogStatsPageUrl(slug) {
  slug =
    slug ||
    (typeof getCurrentBlogSlug === "function" ? getCurrentBlogSlug() : null);
  if (!slug) {
    return (location.origin + location.pathname).replace(/\/+$/, "");
  }
  var origin =
    typeof BLOG_SITE_ORIGIN !== "undefined"
      ? BLOG_SITE_ORIGIN
      : location.origin;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)/i.test(location.origin)) {
    origin = location.origin;
  }
  return origin + "/blog/" + slug + ".html";
}

function blogStatsHeaders(pageUrl) {
  return {
    "x-bsz-referer": pageUrl,
    Accept: "application/json"
  };
}

function blogStatsRequest(method, pageUrl) {
  return fetch(BLOG_STATS_API, {
    method: method,
    credentials: "include",
    headers: blogStatsHeaders(pageUrl)
  }).then(function (res) {
    if (!res.ok) throw new Error("blog-stats http " + res.status);
    return res.json();
  });
}

function applyBlogStatsResponse(json) {
  if (!json || !json.success || !json.data) return false;
  return setBlogLikeCountDisplay(json.data.page_pv);
}

function hideBlogStatsOnFailure() {
  var wrap = getBlogStatsWrapEl();
  if (wrap) wrap.style.display = "none";
}

function refreshBlogStatsReadOnly(slug) {
  var pageUrl = getBlogStatsPageUrl(slug);
  return blogStatsRequest("GET", pageUrl)
    .then(function (json) {
      return applyBlogStatsResponse(json);
    })
    .catch(function () {
      return false;
    });
}

function initBlogStatsVisibilitySync(slug) {
  if (window.__blogStatsVisHook) return;
  window.__blogStatsVisHook = true;
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") return;
    var activeSlug =
      window.__blogStatsSlug ||
      (typeof getCurrentBlogSlug === "function" ? getCurrentBlogSlug() : null);
    if (!activeSlug) return;
    refreshBlogStatsReadOnly(activeSlug);
  });
}

function initBlogStats(slug) {
  var el = getBlogLikeCountEl();
  if (!el) return false;

  el.id = "busuanzi_value_page_pv";
  var wrap = getBlogStatsWrapEl();
  if (wrap) wrap.id = "busuanzi_container_page_pv";

  slug =
    slug ||
    (typeof getCurrentBlogSlug === "function" ? getCurrentBlogSlug() : null);
  window.__blogStatsSlug = slug;

  var pageUrl = getBlogStatsPageUrl(slug);

  blogStatsRequest("POST", pageUrl)
    .then(function (json) {
      if (!applyBlogStatsResponse(json)) {
        return refreshBlogStatsReadOnly(slug);
      }
      return true;
    })
    .catch(function () {
      return refreshBlogStatsReadOnly(slug).then(function (ok) {
        if (!ok) hideBlogStatsOnFailure();
        return ok;
      });
    });

  initBlogStatsVisibilitySync(slug);
  return true;
}

function getBlogLikeStorageKey(slug) {
  return "blog-liked-" + slug;
}

function hasBlogLiked(slug) {
  if (!slug) return false;
  try {
    return localStorage.getItem(getBlogLikeStorageKey(slug)) === "1";
  } catch (e) {
    return false;
  }
}

function setBlogLiked(slug) {
  if (!slug) return;
  try {
    localStorage.setItem(getBlogLikeStorageKey(slug), "1");
  } catch (e) {}
}

/** 按「我也喜歡」：向伺服器 +1，所有人之後都會看到同一累計 */
function registerBlogLike(slug) {
  slug =
    slug ||
    (typeof getCurrentBlogSlug === "function" ? getCurrentBlogSlug() : null);
  if (!slug || hasBlogLiked(slug)) {
    return Promise.resolve(false);
  }

  var pageUrl = getBlogStatsPageUrl(slug);

  return blogStatsRequest("POST", pageUrl)
    .then(function (json) {
      setBlogLiked(slug);
      applyBlogStatsResponse(json);
      return true;
    })
    .catch(function () {
      return false;
    });
}

window.initBlogStats = initBlogStats;
window.hasBlogLiked = hasBlogLiked;
window.registerBlogLike = registerBlogLike;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("blog-article-hero-slot")) return;
    var slug =
      typeof getCurrentBlogSlug === "function" ? getCurrentBlogSlug() : null;
    if (slug) initBlogStats(slug);
  });
} else if (
  !document.getElementById("blog-article-hero-slot") &&
  typeof getCurrentBlogSlug === "function"
) {
  var bootSlug = getCurrentBlogSlug();
  if (bootSlug) initBlogStats(bootSlug);
}
