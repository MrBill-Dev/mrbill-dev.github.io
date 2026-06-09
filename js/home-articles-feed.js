/**
 * 首頁文章曝光：跑馬燈橫幅（header 下 strip）+ 首頁輪播
 * 資料來源：GET /api/articles/home（後台勾選 homeMarquee / homeCarousel）
 */
(function () {
  "use strict";

  var STATIC_BLOG_SLUGS = {
    "taipei-newtaipei-rainy-day-family": true,
    "2026-06-06-ai-workflow-lesson-04-06": true,
    "2026-06-05-ai-workflow-lesson-01-02": true,
    "2026-05-31-ai-prompt-six-levels": true
  };

  var FALLBACK_COVERS = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&auto=format&fit=crop"
  ];

  var carouselTimer = null;
  var carouselIndex = 0;

  function apiBase() {
    return String(window.BLOG_ARTICLES_API || "").replace(/\/+$/, "");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function coverForArticle(article) {
    var cover = String((article && article.cover) || "").trim();
    if (cover) {
      if (/^https?:\/\//.test(cover)) return cover;
      return cover.replace(/^\//, "");
    }
    var key = (article && (article.slug || article.title)) || "blog";
    var hash = 0;
    for (var i = 0; i < key.length; i++) hash = (hash + key.charCodeAt(i) * (i + 1)) % 9973;
    return FALLBACK_COVERS[hash % FALLBACK_COVERS.length];
  }

  function isHomePreviewMode() {
    try {
      return new URLSearchParams(window.location.search || "").get("homePreview") === "1";
    } catch (e) {
      return false;
    }
  }

  function highlightPreviewSlug() {
    try {
      return new URLSearchParams(window.location.search || "").get("slug") || "";
    } catch (e) {
      return "";
    }
  }

  function getAdminToken() {
    var sess = window.MRBILL_ADMIN_SESSION;
    return sess ? sess.getToken() : "";
  }

  function articleHref(slug, preview) {
    if (STATIC_BLOG_SLUGS[slug]) return "blog/" + slug + ".html";
    var path = "blog/" + slug + ".html";
    if (preview) path += "&preview=1";
    return path;
  }

  function showHomePreviewBanner() {
    var banner = document.getElementById("home-preview-banner");
    if (!banner) return;
    var slug = highlightPreviewSlug();
    banner.textContent =
      "管理員首頁預覽：含草稿／排程的跑馬燈與輪播" +
      (slug ? "（目前文章：" + slug + "）" : "") +
      " — 讀者看不到此畫面";
    banner.classList.remove("hidden");
    document.body.classList.add("has-home-preview-banner");
  }

  function readStripLocalSettings() {
    try {
      var raw = localStorage.getItem("mrbill-home-strip-settings");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function stripConfigDefaults() {
    var cfg = window.HOME_STRIP_CONFIG || {};
    var local = readStripLocalSettings();
    var hasAdmin =
      (isHomePreviewMode() || !!getAdminToken()) && local && typeof local === "object";
    return {
      stripShowNav: hasAdmin && typeof local.stripShowNav === "boolean"
        ? local.stripShowNav
        : !!cfg.showNav,
      stripIntervalSec: hasAdmin && local.stripIntervalSec != null
        ? Number(local.stripIntervalSec)
        : Number(cfg.intervalSec) || 10,
      stripTransitionMs: hasAdmin && local.stripTransitionMs != null
        ? Number(local.stripTransitionMs)
        : Number(cfg.transitionMs) || 900
    };
  }

  function mergeStripSettings(data) {
    var defaults = stripConfigDefaults();
    var merged = {
      stripShowNav:
        typeof data.stripShowNav === "boolean"
          ? data.stripShowNav
          : defaults.stripShowNav,
      stripIntervalSec:
        typeof data.stripIntervalSec === "number"
          ? data.stripIntervalSec
          : defaults.stripIntervalSec,
      stripTransitionMs:
        typeof data.stripTransitionMs === "number"
          ? data.stripTransitionMs
          : defaults.stripTransitionMs
    };
    var local = readStripLocalSettings();
    if ((isHomePreviewMode() || getAdminToken()) && local) {
      if (local.stripIntervalSec != null) {
        merged.stripIntervalSec = Number(local.stripIntervalSec);
      }
      if (local.stripTransitionMs != null) {
        merged.stripTransitionMs = Number(local.stripTransitionMs);
      }
      if (typeof local.stripShowNav === "boolean") {
        merged.stripShowNav = local.stripShowNav;
      }
    }
    return merged;
  }

  function fetchHomePlacements() {
    var base = apiBase();
    if (!base) {
      return Promise.resolve(
        Object.assign({ marquee: [], carousel: [], preview: false }, stripConfigDefaults())
      );
    }

    var preview = isHomePreviewMode();
    var token = preview ? getAdminToken() : "";
    var url = preview && token ? base + "/api/admin/articles/home" : base + "/api/articles/home";
    var headers = { Accept: "application/json" };
    if (preview && token) headers.Authorization = "Bearer " + token;

    return fetch(url, { headers: headers })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        if (!json || !json.success || !json.data) {
          return Object.assign(
            { marquee: [], carousel: [], preview: false },
            stripConfigDefaults()
          );
        }
        var motion = mergeStripSettings(json.data);
        return {
          marquee: json.data.marquee || [],
          carousel: json.data.carousel || [],
          preview: !!json.data.preview || preview,
          stripShowNav: motion.stripShowNav,
          stripIntervalSec: motion.stripIntervalSec,
          stripTransitionMs: motion.stripTransitionMs
        };
      })
      .catch(function () {
        return Object.assign(
          { marquee: [], carousel: [], preview: false },
          stripConfigDefaults()
        );
      });
  }

  function renderCarousel(articles, opts) {
    opts = opts || {};
    var root = document.getElementById("homeArticleCarousel");
    var track = document.getElementById("homeArticleCarouselTrack");
    var dots = document.getElementById("homeArticleCarouselDots");
    if (!root || !track || !dots) return;
    var preview = !!opts.preview;
    var highlightSlug = opts.highlightSlug || "";

    if (!articles || !articles.length) {
      root.classList.add("hidden");
      track.innerHTML = "";
      dots.innerHTML = "";
      if (carouselTimer) clearInterval(carouselTimer);
      return;
    }

    track.innerHTML = articles
      .map(function (article, index) {
        var cover = coverForArticle(article);
        var href = articleHref(article.slug, preview && !STATIC_BLOG_SLUGS[article.slug]);
        var excerpt = article.excerpt || article.subtitle || "";
        var highlight =
          highlightSlug && article.slug === highlightSlug
            ? ' home-article-carousel__slide--highlight"'
            : '"';
        return (
          '<article class="home-article-carousel__slide' +
          highlight +
          ' data-slide-index="' +
          index +
          '">' +
          '<div class="home-article-carousel__card">' +
          '<div class="home-article-carousel__media">' +
          '<img src="' +
          escapeHtml(cover) +
          '" alt="" loading="lazy" decoding="async" />' +
          "</div>" +
          '<div class="home-article-carousel__body">' +
          '<span class="home-article-carousel__pill">' +
          escapeHtml(article.label || article.category || "文章筆記") +
          "</span>" +
          '<h3 class="home-article-carousel__slide-title">' +
          escapeHtml(article.title || article.slug) +
          "</h3>" +
          (excerpt
            ? '<p class="home-article-carousel__excerpt">' + escapeHtml(excerpt) + "</p>"
            : "") +
          '<a class="home-article-carousel__cta" href="' +
          escapeHtml(href) +
          '">閱讀文章 →</a>' +
          "</div></div></article>"
        );
      })
      .join("");

    dots.innerHTML = articles
      .map(function (_article, index) {
        return (
          '<button type="button" class="home-article-carousel__dot' +
          (index === 0 ? " is-active" : "") +
          '" data-carousel-dot="' +
          index +
          '" aria-label="第 ' +
          (index + 1) +
          ' 則精選文章"></button>'
        );
      })
      .join("");

    root.classList.remove("hidden");
    carouselIndex = 0;
    updateCarouselSlide();

    dots.querySelectorAll("[data-carousel-dot]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        carouselIndex = Number(btn.getAttribute("data-carousel-dot")) || 0;
        updateCarouselSlide();
        restartCarouselTimer(articles.length);
      });
    });

    var prevBtn = document.getElementById("homeArticleCarouselPrev");
    var nextBtn = document.getElementById("homeArticleCarouselNext");
    if (prevBtn) {
      prevBtn.onclick = function () {
        carouselIndex = (carouselIndex - 1 + articles.length) % articles.length;
        updateCarouselSlide();
        restartCarouselTimer(articles.length);
      };
    }
    if (nextBtn) {
      nextBtn.onclick = function () {
        carouselIndex = (carouselIndex + 1) % articles.length;
        updateCarouselSlide();
        restartCarouselTimer(articles.length);
      };
    }

    restartCarouselTimer(articles.length);
  }

  function updateCarouselSlide() {
    var track = document.getElementById("homeArticleCarouselTrack");
    var dots = document.getElementById("homeArticleCarouselDots");
    if (!track) return;
    track.style.transform = "translateX(-" + carouselIndex * 100 + "%)";
    if (dots) {
      dots.querySelectorAll("[data-carousel-dot]").forEach(function (btn) {
        var idx = Number(btn.getAttribute("data-carousel-dot"));
        btn.classList.toggle("is-active", idx === carouselIndex);
      });
    }
  }

  function restartCarouselTimer(count) {
    if (carouselTimer) clearInterval(carouselTimer);
    if (count <= 1) return;
    carouselTimer = setInterval(function () {
      carouselIndex = (carouselIndex + 1) % count;
      updateCarouselSlide();
    }, 7000);
  }

  function boot() {
    var previewMode = isHomePreviewMode();
    if (previewMode && getAdminToken()) {
      showHomePreviewBanner();
    }

    fetchHomePlacements().then(function (data) {
      if (typeof window.initHomeRainRecommend === "function") {
        window.initHomeRainRecommend({
          apiMarqueeList: data.marquee || [],
          preview: !!data.preview,
          highlightSlug: highlightPreviewSlug(),
          stripShowNav: !!data.stripShowNav,
          stripIntervalSec: data.stripIntervalSec,
          stripTransitionMs: data.stripTransitionMs
        });
      }
      renderCarousel(data.carousel || [], {
        preview: !!data.preview,
        highlightSlug: highlightPreviewSlug()
      });

      if (previewMode && !getAdminToken()) {
        showHomePreviewBanner();
        var banner = document.getElementById("home-preview-banner");
        if (banner) {
          banner.textContent = "首頁預覽須先在 admin 登入（本機 token 共用）";
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
