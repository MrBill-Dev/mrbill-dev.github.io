/**
 * 首頁橫幅：header 下固定 strip
 * 純後台文章（勾選 homeMarquee），依 sort_order 輪播；支援手機左右滑動
 */
(function () {
  "use strict";

  var LEGACY_ARTICLE_SLUG = "taipei-newtaipei-rainy-day-family";
  var ENGAGE_KEY = "homeBlogStripEngaged";
  var DISMISS_KEY = "homeBlogStripDismissed";
  var DEFAULT_INTERVAL_SEC = 10;
  var DEFAULT_TRANSITION_MS = 900;
  var SWIPE_THRESHOLD_PX = 48;
  var rotateIntervalMs = DEFAULT_INTERVAL_SEC * 1000;
  var transitionMs = DEFAULT_TRANSITION_MS;

  var slides = [];
  var activeIndex = 0;
  var hasCloneSlide = false;
  var rotateTimer = null;
  var arriveTimer = null;
  var isStripAnimating = false;
  var previewOpts = {};
  var highlightSlug = "";
  var showStripNav = false;
  var touchStartX = 0;
  var touchStartY = 0;
  var touchTracking = false;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function articleHrefFromSlug(slug, preview) {
    if (slug === LEGACY_ARTICLE_SLUG) {
      return "blog/taipei-newtaipei-rainy-day-family.html";
    }
    var path = "blog/post.html?slug=" + encodeURIComponent(slug);
    if (preview) path += "&preview=1";
    return path;
  }

  function stripShortText(text, max) {
    var limit = max || 32;
    var t = String(text || "").replace(/\s+/g, " ").trim();
    if (!t) return "";
    if (t.length <= limit) return t;
    return t.slice(0, limit).replace(/\s+\S*$/, "") + "…";
  }

  function slideFromArticle(article) {
    return {
      slug: article.slug,
      slotLabel: "文章推薦",
      kicker: article.label || "文章筆記",
      pill: article.category || article.label || "精選",
      hint: stripShortText(article.subtitle, 28) || "延伸閱讀",
      title: article.title || article.slug,
      meta: "",
      btn: "閱讀文章",
      href: articleHrefFromSlug(article.slug, !!previewOpts.preview)
    };
  }

  function buildSlides(apiMarqueeList) {
    var list = [];
    (apiMarqueeList || []).forEach(function (article) {
      if (!article || !article.slug) return;
      list.push(slideFromArticle(article));
    });
    return list;
  }

  function syncHeaderHeight() {
    var header = document.getElementById("global-header");
    if (!header) return 80;
    var rect = header.getBoundingClientRect();
    var height = Math.max(0, Math.round(rect.bottom));
    document.documentElement.style.setProperty("--site-header-height", height + "px");
    return height;
  }

  function getRoot() {
    return document.getElementById("homeRainRecommend");
  }

  function isHomeTabActive() {
    var sect = document.getElementById("sect-home");
    return !!(sect && !sect.classList.contains("hidden"));
  }

  function setStripVisible(visible) {
    var root = getRoot();
    var spacer = document.getElementById("homeRainRecommendSpacer");
    if (root) root.classList.toggle("hidden", !visible);
    if (spacer) {
      spacer.classList.toggle("hidden", !visible);
      if (!visible) spacer.style.height = "0";
    }
  }

  window.homeBlogStripHasSlides = function () {
    return slides.length > 0;
  };

  function updateStripOffsetVar() {
    var root = getRoot();
    var surface = root ? root.querySelector(".home-blog-strip__surface") : null;
    var offset = 0;
    if (
      root &&
      !root.classList.contains("hidden") &&
      !root.classList.contains("is-dismissed") &&
      slides.length &&
      surface
    ) {
      offset = surface.offsetHeight;
    }
    document.documentElement.style.setProperty(
      "--home-blog-strip-offset",
      offset + "px"
    );
    if (typeof window.syncHomeSidePromoLayout === "function") {
      window.syncHomeSidePromoLayout();
    }
  }

  function syncLayout() {
    var root = getRoot();
    var spacer = document.getElementById("homeRainRecommendSpacer");
    var surface = root ? root.querySelector(".home-blog-strip__surface") : null;
    if (!root || !spacer) {
      updateStripOffsetVar();
      return;
    }

    var headerOffset = syncHeaderHeight();
    root.style.paddingTop = headerOffset + "px";

    if (root.classList.contains("hidden") || !slides.length) {
      spacer.style.height = "0";
      updateStripOffsetVar();
      return;
    }

    spacer.style.height = (surface ? surface.offsetHeight : root.offsetHeight) + "px";

    if (!isStripAnimating) {
      refreshTrackOffset(true);
    }
    updateStripOffsetVar();
  }

  function refreshTrackOffset(instant) {
    var track = document.getElementById("homeBlogStripTrack");
    if (!track || !slides.length) return;
    if (instant) track.classList.add("is-instant");
    updateTrackPosition();
    if (instant) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          track.classList.remove("is-instant");
        });
      });
    }
  }

  function renderSlideHtml(slide, index) {
    var isHighlight = !!(highlightSlug && slide.slug === highlightSlug);
    return (
      '<div class="home-blog-strip__slide home-blog-strip__slide--featured' +
      (isHighlight ? " is-admin-preview-highlight" : "") +
      '" data-slide-index="' +
      index +
      '">' +
      '<span class="home-blog-strip__accent" aria-hidden="true"></span>' +
      '<span class="home-blog-strip__shine" aria-hidden="true"></span>' +
      '<div class="home-blog-strip__inner px-4 lg:px-6">' +
      '<span class="home-blog-strip__slot">' +
      escapeHtml(slide.slotLabel) +
      "</span>" +
      '<span class="home-blog-strip__kicker"><span class="home-blog-strip__dot" aria-hidden="true"></span>' +
      escapeHtml(slide.kicker) +
      "</span>" +
      '<span class="home-blog-strip__hint" aria-live="polite">' +
      escapeHtml(slide.hint) +
      "</span>" +
      '<span class="home-blog-strip__pill">' +
      escapeHtml(slide.pill) +
      "</span>" +
      '<p class="home-blog-strip__title">' +
      escapeHtml(slide.title) +
      "</p>" +
      (slide.meta
        ? '<span class="home-blog-strip__meta hidden md:inline">' +
          escapeHtml(slide.meta) +
          "</span>"
        : "") +
      '<a href="' +
      escapeHtml(slide.href) +
      '" class="home-blog-strip__cta" title="' +
      escapeHtml(slide.title) +
      '" aria-label="' +
      escapeHtml(slide.title) +
      '"><span>' +
      escapeHtml(slide.btn) +
      " →</span></a>" +
      '<a href="blog/" class="home-blog-strip__more">更多筆記</a>' +
      "</div></div>"
    );
  }

  function setTrackPositionInstant() {
    var track = document.getElementById("homeBlogStripTrack");
    if (!track) return;
    track.classList.add("is-instant");
    updateTrackPosition();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        track.classList.remove("is-instant");
      });
    });
  }

  function trackSlideCount() {
    return hasCloneSlide ? slides.length + 1 : slides.length;
  }

  function renderStrip() {
    var root = getRoot();
    var track = document.getElementById("homeBlogStripTrack");
    var nav = document.getElementById("homeBlogStripNav");
    var dots = document.getElementById("homeBlogStripDots");
    if (!root || !track || !slides.length) return;

    hasCloneSlide = slides.length > 1;
    var trackHtml = slides.map(renderSlideHtml).join("");
    if (hasCloneSlide) {
      trackHtml += renderSlideHtml(slides[0], slides.length).replace(
        'data-slide-index="' + slides.length + '"',
        'data-slide-index="' + slides.length + '" data-slide-clone="1"'
      );
    }
    track.innerHTML = trackHtml;

    setTrackPositionInstant();

    if (nav && dots) {
      if (slides.length > 1 && showStripNav) {
        nav.classList.remove("hidden");
        nav.setAttribute("aria-hidden", "false");
        dots.innerHTML = slides
          .map(function (slide, index) {
            return (
              '<button type="button" class="home-blog-strip__nav-dot' +
              (index === logicalSlideIndex() ? " is-active" : "") +
              '" data-strip-dot="' +
              index +
              '" aria-label="' +
              escapeHtml(slide.slotLabel) +
              "：" +
              escapeHtml(slide.title) +
              '"></button>'
            );
          })
          .join("");
        dots.querySelectorAll("[data-strip-dot]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            goToSlide(Number(btn.getAttribute("data-strip-dot")) || 0);
            restartRotation();
          });
        });
      } else {
        nav.classList.add("hidden");
        nav.setAttribute("aria-hidden", "true");
        dots.innerHTML = "";
      }
    }

    applySurfaceMode();
    requestAnimationFrame(syncLayout);
  }

  function applySurfaceMode() {
    var root = getRoot();
    if (!root || !slides.length) return;
    var slide = slides[logicalSlideIndex()];

    root.classList.remove("is-rainy");
    root.classList.add("is-featured-active");
    root.classList.toggle("is-rotating", slides.length > 1);
    root.setAttribute("data-rain-mode", "featured");
    root.classList.toggle(
      "is-admin-preview-highlight",
      !!(highlightSlug && slide.slug === highlightSlug)
    );
  }

  function clampSetting(val, min, max, fallback) {
    var n = Number(val);
    if (!isFinite(n)) return fallback;
    return Math.max(min, Math.min(max, Math.floor(n)));
  }

  function applyStripMotionSettings(intervalSec, ms) {
    var intervalMs =
      clampSetting(intervalSec, 2, 60, DEFAULT_INTERVAL_SEC) * 1000;
    transitionMs = clampSetting(ms, 400, 2000, DEFAULT_TRANSITION_MS);
    rotateIntervalMs = Math.max(intervalMs, transitionMs + 600);
    var root = getRoot();
    if (root) {
      root.style.setProperty("--home-strip-transition-ms", transitionMs + "ms");
      root.style.setProperty(
        "--home-strip-ease",
        "cubic-bezier(0.25, 0.8, 0.25, 1)"
      );
    }
    restartRotation();
  }

  function logicalSlideIndex() {
    if (!slides.length) return 0;
    if (hasCloneSlide && activeIndex === slides.length) return 0;
    return activeIndex;
  }

  function getTrackViewportWidth() {
    var track = document.getElementById("homeBlogStripTrack");
    if (!track || !track.parentElement) return 0;
    return track.parentElement.getBoundingClientRect().width || 0;
  }

  function updateTrackPosition() {
    var track = document.getElementById("homeBlogStripTrack");
    if (!track) return;
    var viewportWidth = getTrackViewportWidth();
    if (!viewportWidth) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }
    track.style.transform =
      "translate3d(-" + activeIndex * viewportWidth + "px, 0, 0)";
  }

  function updateStripNavDots() {
    var dots = document.getElementById("homeBlogStripDots");
    if (!dots) return;
    var logical = logicalSlideIndex();
    dots.querySelectorAll("[data-strip-dot]").forEach(function (btn) {
      btn.classList.toggle(
        "is-active",
        Number(btn.getAttribute("data-strip-dot")) === logical
      );
    });
  }

  function clearRotateTimer() {
    if (!rotateTimer) return;
    clearTimeout(rotateTimer);
    rotateTimer = null;
  }

  function clearArriveTimer() {
    if (!arriveTimer) return;
    clearTimeout(arriveTimer);
    arriveTimer = null;
  }

  function clearStripTimers() {
    clearRotateTimer();
    clearArriveTimer();
  }

  function transitionWaitMs() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return 80;
    }
    return transitionMs + 60;
  }

  function snapCloneToStart() {
    if (!hasCloneSlide || activeIndex !== slides.length) return false;
    var track = document.getElementById("homeBlogStripTrack");
    if (!track) return false;
    track.classList.add("is-instant");
    activeIndex = 0;
    updateTrackPosition();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        track.classList.remove("is-instant");
      });
    });
    updateStripNavDots();
    return true;
  }

  function scheduleRotate() {
    clearRotateTimer();
    if (slides.length <= 1) return;
    rotateTimer = setTimeout(function () {
      rotateTimer = null;
      advanceSlide();
    }, rotateIntervalMs);
  }

  function setStripSliding(active) {
    var track = document.getElementById("homeBlogStripTrack");
    var root = getRoot();
    if (track) track.classList.toggle("is-sliding", active);
    if (root) root.classList.toggle("is-strip-sliding", active);
  }

  function finishSlideTransition() {
    setStripSliding(false);
    snapCloneToStart();
    isStripAnimating = false;
    applySurfaceMode();
    requestAnimationFrame(syncLayout);
    scheduleRotate();
  }

  function scheduleSlideArrival() {
    clearArriveTimer();
    arriveTimer = setTimeout(function () {
      arriveTimer = null;
      finishSlideTransition();
    }, transitionWaitMs());
  }

  function goToSlide(index, instant) {
    if (!slides.length) return;
    clearArriveTimer();
    var maxIndex = trackSlideCount() - 1;
    var next = Math.max(0, Math.min(index, maxIndex));
    var track = document.getElementById("homeBlogStripTrack");
    if (!instant) {
      isStripAnimating = true;
      if (track) track.classList.remove("is-instant");
      setStripSliding(true);
    } else if (track) {
      track.classList.add("is-instant");
    }
    activeIndex = next;
    applySurfaceMode();
    updateStripNavDots();
    if (instant) {
      updateTrackPosition();
      if (track) {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            track.classList.remove("is-instant");
          });
        });
      }
      isStripAnimating = false;
      requestAnimationFrame(syncLayout);
      finishSlideTransition();
      return;
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        updateTrackPosition();
        scheduleSlideArrival();
      });
    });
  }

  function advanceSlide() {
    if (!slides.length || slides.length <= 1) return;
    if (hasCloneSlide) {
      if (activeIndex >= slides.length) snapCloneToStart();
      goToSlide(activeIndex + 1);
      return;
    }
    goToSlide((activeIndex + 1) % slides.length);
  }

  function retreatSlide() {
    if (!slides.length || slides.length <= 1) return;
    if (activeIndex <= 0) {
      goToSlide(slides.length - 1);
      return;
    }
    goToSlide(activeIndex - 1);
  }

  function restartRotation() {
    clearStripTimers();
    scheduleRotate();
  }

  function applyStripDismissed(dismissed) {
    var root = getRoot();
    var spacer = document.getElementById("homeRainRecommendSpacer");
    if (!root) return;
    root.classList.toggle("is-dismissed", dismissed);
    if (dismissed || !slides.length) {
      root.classList.add("hidden");
      if (spacer) {
        spacer.classList.add("hidden");
        spacer.style.height = "0";
      }
      clearStripTimers();
      return;
    }
    root.classList.remove("hidden");
    if (spacer) spacer.classList.remove("hidden");
    requestAnimationFrame(syncLayout);
  }

  function bindStripDismiss() {
    var root = getRoot();
    if (!root) return;

    if (sessionStorage.getItem(DISMISS_KEY) === "1") {
      applyStripDismissed(true);
    }

    var closeBtn = root.querySelector(".home-blog-strip__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        sessionStorage.setItem(DISMISS_KEY, "1");
        applyStripDismissed(true);
      });
    }
  }

  function bindScrollPastHero() {
    var root = getRoot();
    var hero = document.getElementById("home-hero-bleed");
    if (!root || !hero) return;

    var mq = window.matchMedia ? window.matchMedia("(max-width: 767px)") : null;

    function updateScrollState() {
      if (root.classList.contains("is-dismissed") || !slides.length) return;
      if (mq && !mq.matches) {
        root.classList.remove("is-scrolled-past-hero");
        return;
      }
      var heroBottom = hero.getBoundingClientRect().bottom;
      root.classList.toggle("is-scrolled-past-hero", heroBottom <= 8);
    }

    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });
    updateScrollState();
  }

  window.isHomeBlogStripDismissed = function () {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  };

  function bindStripEngagement() {
    var root = getRoot();
    if (!root) return;

    if (sessionStorage.getItem(ENGAGE_KEY) === "1") {
      root.classList.add("is-user-engaged");
    }

    function markEngaged() {
      root.classList.add("is-user-engaged");
      sessionStorage.setItem(ENGAGE_KEY, "1");
    }

    root.addEventListener("mouseenter", markEngaged);
    root.addEventListener("focusin", markEngaged);
    root.addEventListener("click", markEngaged);

    root.addEventListener("mouseenter", function () {
      clearStripTimers();
    });
    root.addEventListener("mouseleave", restartRotation);
  }

  function bindStripSwipe() {
    var viewport = getRoot()
      ? getRoot().querySelector(".home-blog-strip__viewport")
      : null;
    if (!viewport || slides.length <= 1) return;

    viewport.addEventListener(
      "touchstart",
      function (ev) {
        if (!ev.touches || ev.touches.length !== 1) return;
        touchTracking = true;
        touchStartX = ev.touches[0].clientX;
        touchStartY = ev.touches[0].clientY;
        clearStripTimers();
      },
      { passive: true }
    );

    viewport.addEventListener(
      "touchmove",
      function (ev) {
        if (!touchTracking || !ev.touches || ev.touches.length !== 1) return;
        var dx = ev.touches[0].clientX - touchStartX;
        var dy = ev.touches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
          ev.preventDefault();
        }
      },
      { passive: false }
    );

    viewport.addEventListener(
      "touchend",
      function (ev) {
        if (!touchTracking) return;
        touchTracking = false;
        var endX =
          (ev.changedTouches && ev.changedTouches[0]
            ? ev.changedTouches[0].clientX
            : touchStartX) - touchStartX;
        if (Math.abs(endX) >= SWIPE_THRESHOLD_PX) {
          if (endX < 0) advanceSlide();
          else retreatSlide();
        }
        restartRotation();
      },
      { passive: true }
    );
  }

  function bindLayoutSync() {
    var root = getRoot();
    var header = document.getElementById("global-header");
    if (!root || typeof ResizeObserver === "undefined") return;

    var observer = new ResizeObserver(function () {
      syncLayout();
    });
    observer.observe(root);
    var surface = root.querySelector(".home-blog-strip__surface");
    if (surface) observer.observe(surface);
    if (header) observer.observe(header);
  }

  function ensureStripStructure() {
    var root = getRoot();
    if (!root || document.getElementById("homeBlogStripTrack")) return;
    var surface = root.querySelector(".home-blog-strip__surface");
    if (!surface) return;
    surface.innerHTML =
      '<button type="button" class="home-blog-strip__close" aria-label="關閉推薦橫幅" title="關閉">' +
      '<span aria-hidden="true">×</span></button>' +
      '<div class="home-blog-strip__viewport">' +
      '<div id="homeBlogStripTrack" class="home-blog-strip__track"></div>' +
      "</div>" +
      '<div id="homeBlogStripNav" class="home-blog-strip__nav hidden" aria-hidden="true">' +
      '<div id="homeBlogStripDots" class="home-blog-strip__dots"></div>' +
      "</div>";
  }

  function initHomeRainRecommend(opts) {
    opts = opts || {};
    if (!getRoot()) return;

    ensureStripStructure();
    previewOpts = { preview: !!opts.preview };
    highlightSlug = opts.highlightSlug || "";
    showStripNav = !!opts.stripShowNav;
    applyStripMotionSettings(
      opts.stripIntervalSec != null ? opts.stripIntervalSec : DEFAULT_INTERVAL_SEC,
      opts.stripTransitionMs != null ? opts.stripTransitionMs : DEFAULT_TRANSITION_MS
    );

    slides = buildSlides(opts.apiMarqueeList || []);
    activeIndex = 0;

    window.syncHomeBlogStripLayout = syncLayout;
    bindStripDismiss();

    if (!slides.length) {
      setStripVisible(false);
      updateStripOffsetVar();
      return;
    }

    if (sessionStorage.getItem(DISMISS_KEY) === "1") {
      setStripVisible(false);
      updateStripOffsetVar();
      return;
    }

    if (isHomeTabActive()) {
      setStripVisible(true);
    } else {
      setStripVisible(false);
    }
    bindStripEngagement();
    bindScrollPastHero();
    bindLayoutSync();
    bindStripSwipe();

    renderStrip();
    restartRotation();
    syncLayout();

    window.addEventListener("resize", syncLayout);
    window.addEventListener("scroll", syncLayout, { passive: true });
  }

  window.initHomeRainRecommend = initHomeRainRecommend;
})();
