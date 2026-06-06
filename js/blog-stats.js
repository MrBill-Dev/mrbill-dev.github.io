/**
 * 專題文章：喜歡人數（不蒜子 page_pv，本頁累計總人次）
 * 呈現為「♥ 已有 X 位讀者喜歡」；含作者與所有讀者，每次成功載入頁面 +1。
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
    el.closest(".blog-hero__likes") ||
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

function getBlogLikeCountEl() {
  return (
    document.getElementById("busuanzi_value_page_pv") ||
    document.getElementById("blog-view-count")
  );
}

function bumpBlogLikeDisplay(delta) {
  var el = getBlogLikeCountEl();
  if (!el) return;
  var n = parseInt(String(el.textContent).replace(/\D/g, ""), 10);
  if (isNaN(n)) return;
  el.textContent = String(n + delta);
}

/**
 * 按「喜歡」時向不蒜子回報一次（隱藏 iframe 載入同頁），並更新 Hero 數字。
 * 同一裝置同一篇文章僅計入一次。
 */
function registerBlogLike(slug) {
  slug =
    slug ||
    (typeof getCurrentBlogSlug === "function" ? getCurrentBlogSlug() : null);
  if (!slug || hasBlogLiked(slug)) {
    return Promise.resolve(false);
  }

  return new Promise(function (resolve) {
    var iframe = document.createElement("iframe");
    iframe.className = "blog-like-beacon";
    iframe.setAttribute("aria-hidden", "true");
    iframe.setAttribute("tabindex", "-1");
    iframe.title = "";
    iframe.src = location.pathname + location.search;

    var settled = false;
    function finish(ok) {
      if (settled) return;
      settled = true;
      window.setTimeout(function () {
        iframe.remove();
      }, 3000);
      resolve(!!ok);
    }

    iframe.onload = function () {
      setBlogLiked(slug);
      bumpBlogLikeDisplay(1);
      finish(true);
    };

    iframe.onerror = function () {
      finish(false);
    };

    window.setTimeout(function () {
      finish(false);
    }, 15000);

    document.body.appendChild(iframe);
  });
}

window.initBlogStats = initBlogStats;
window.hasBlogLiked = hasBlogLiked;
window.registerBlogLike = registerBlogLike;
window.bumpBlogLikeDisplay = bumpBlogLikeDisplay;

/* Hero 已寫在 HTML 時（無 async slot）仍可自動啟動 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("blog-article-hero-slot")) return;
    initBlogStats();
  });
} else if (!document.getElementById("blog-article-hero-slot")) {
  initBlogStats();
}
