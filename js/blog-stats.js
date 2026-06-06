/**
 * 專題文章：喜歡人數（不蒜子 page_pv，本頁累計總人次）
 * 呈現為「♥ 已有 X 位讀者喜歡」。數字僅來自不蒜子伺服器，各裝置顯示相同累計。
 * 開頁 +1；按「我也喜歡」再透過隱藏 iframe 回報 +1（同一裝置每篇僅一次）。
 */
var BLOG_BUSUANZI_SRC = [
  "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js",
  "https://busuanzi.icodeq.com/busuanzi.pure.mini.js"
];

function getBlogLikeCountEl() {
  return (
    document.getElementById("busuanzi_value_page_pv") ||
    document.getElementById("blog-view-count")
  );
}

function isBlogStatsPlaceholder(text) {
  var val = String(text || "").trim();
  return !val || val === "…" || val === "..." || val === "—";
}

function setBlogLikeCountDisplay(value) {
  var el = getBlogLikeCountEl();
  if (!el || isBlogStatsPlaceholder(value)) return false;
  el.textContent = String(value).trim();
  return true;
}

function initBlogStats() {
  var el = getBlogLikeCountEl();
  if (!el) return false;

  el.id = "busuanzi_value_page_pv";

  var wrap =
    document.getElementById("busuanzi_container_page_pv") ||
    el.closest(".blog-hero__likes") ||
    el.closest(".blog-hero__views");
  if (wrap) wrap.id = "busuanzi_container_page_pv";

  if (document.querySelector("script[data-busuanzi]")) {
    watchBlogStatsLoaded();
    return true;
  }

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
    s.onload = function () {
      watchBlogStatsLoaded();
    };
    document.body.appendChild(s);
  }

  loadScript(0);
  return true;
}

/** 不蒜子較慢或手機阻擋時，重試載入並等待伺服器回傳數字 */
function watchBlogStatsLoaded() {
  var el = getBlogLikeCountEl();
  if (!el || el.getAttribute("data-busuanzi-watch") === "1") return;
  el.setAttribute("data-busuanzi-watch", "1");

  var tries = 0;
  var timer = window.setInterval(function () {
    tries += 1;
    if (!isBlogStatsPlaceholder(el.textContent)) {
      window.clearInterval(timer);
      el.removeAttribute("data-busuanzi-watch");
      return;
    }
    if (tries === 8) {
      var script = document.querySelector("script[data-busuanzi]");
      if (script) {
        script.remove();
        el.removeAttribute("data-busuanzi-watch");
        initBlogStats();
      }
    }
    if (tries >= 16) {
      window.clearInterval(timer);
      el.removeAttribute("data-busuanzi-watch");
    }
  }, 500);
}

/** 從同源 iframe 複製不蒜子回傳的累計（不在本機手動 +1） */
function syncBlogCountFromIframe(iframe, attempt, onDone) {
  attempt = attempt || 0;
  if (!iframe) {
    if (onDone) onDone(false);
    return;
  }
  if (attempt > 14) {
    if (onDone) onDone(false);
    return;
  }

  try {
    var doc = iframe.contentDocument || iframe.contentWindow.document;
    var src = doc && doc.getElementById("busuanzi_value_page_pv");
    if (src && setBlogLikeCountDisplay(src.textContent)) {
      if (onDone) onDone(true);
      return;
    }
  } catch (e) {}

  window.setTimeout(function () {
    syncBlogCountFromIframe(iframe, attempt + 1, onDone);
  }, 500);
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

/**
 * 按「我也喜歡」：隱藏 iframe 載入同頁讓不蒜子 +1，再從 iframe 讀回伺服器累計寫入 Hero。
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
      }, 4000);
      resolve(!!ok);
    }

    iframe.onload = function () {
      setBlogLiked(slug);
      syncBlogCountFromIframe(iframe, 0, function () {
        finish(true);
      });
    };

    iframe.onerror = function () {
      finish(false);
    };

    window.setTimeout(function () {
      finish(false);
    }, 18000);

    document.body.appendChild(iframe);
  });
}

window.initBlogStats = initBlogStats;
window.hasBlogLiked = hasBlogLiked;
window.registerBlogLike = registerBlogLike;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("blog-article-hero-slot")) return;
    initBlogStats();
  });
} else if (!document.getElementById("blog-article-hero-slot")) {
  initBlogStats();
}
