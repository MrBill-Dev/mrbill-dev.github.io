/**
 * 首頁橫幅：header 下固定 strip
 * - 常駐：雙北雨天親子（永遠在輪播內，偵測下雨切換文案／動畫）
 * - 精選：後台勾選 homeMarquee 的動態文章（與常駐輪播，樣式區分）
 */
(function () {
  "use strict";

  var LEGACY_ARTICLE_SLUG = "taipei-newtaipei-rainy-day-family";
  var ARTICLE_URL = "blog/taipei-newtaipei-rainy-day-family.html";
  var TAIPEI_LAT = 25.0478;
  var TAIPEI_LON = 121.5319;
  var ENGAGE_KEY = "homeBlogStripEngaged";
  var DEFAULT_INTERVAL_SEC = 10;
  var DEFAULT_TRANSITION_MS = 900;
  var rotateIntervalMs = DEFAULT_INTERVAL_SEC * 1000;
  var transitionMs = DEFAULT_TRANSITION_MS;

  var COPY = {
    rainy: {
      kicker: "雨天備案",
      pill: "今日可能下雨",
      hint: "🌧️ 今天可能用得上",
      title: "生活觀察｜雙北室內親子備案，下雨時可先查這篇",
      meta: "含雨勢與路線參考",
      btn: "看雨天備案"
    },
    default: {
      kicker: "文章筆記",
      pill: "生活觀察",
      hint: "👨‍👩‍👧 延伸閱讀｜爸媽可先收藏",
      title: "雙北雨天親子景點懶人包｜文章筆記，適合家長先收藏",
      meta: "非課程主線，屬延伸閱讀",
      btn: "閱讀筆記"
    }
  };

  var slides = [];
  var activeIndex = 0;
  var hasCloneSlide = false;
  var residentRainMode = "default";
  var rotateTimer = null;
  var arriveTimer = null;
  var isStripAnimating = false;
  var previewOpts = {};
  var highlightSlug = "";
  var showStripNav = false;

  function isRainCode(code) {
    if (typeof code !== "number") return false;
    return (
      (code >= 51 && code <= 67) ||
      (code >= 80 && code <= 82) ||
      (code >= 95 && code <= 99)
    );
  }

  function isRainyCondition(pop, code) {
    var rainCode = typeof code === "number" ? code : 0;
    var rainPop = typeof pop === "number" ? pop : 0;
    return rainPop >= 40 || isRainCode(rainCode);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function articleHrefFromSlug(slug, preview) {
    if (slug === LEGACY_ARTICLE_SLUG) return ARTICLE_URL;
    var path = "blog/post.html?slug=" + encodeURIComponent(slug);
    if (preview) path += "&preview=1";
    return path;
  }

  function residentSlideFromMode(mode) {
    var data = COPY[mode] || COPY.default;
    return {
      type: "resident",
      slug: LEGACY_ARTICLE_SLUG,
      slotLabel: "生活常駐",
      kicker: data.kicker,
      pill: data.pill,
      hint: data.hint,
      title: data.title,
      meta: data.meta,
      btn: data.btn,
      href: ARTICLE_URL
    };
  }

  function featuredSlideFromArticle(article) {
    return {
      type: "featured",
      slug: article.slug,
      slotLabel: "精選推薦",
      kicker: article.label || "文章筆記",
      pill: article.category || article.label || "精選",
      hint: article.subtitle || "延伸閱讀｜精選文章",
      title: article.title || article.slug,
      meta: article.excerpt || "非課程主線，屬延伸閱讀",
      btn: "閱讀文章",
      href: articleHrefFromSlug(article.slug, !!previewOpts.preview)
    };
  }

  function buildSlides(apiMarqueeList) {
    var list = [residentSlideFromMode(residentRainMode)];
    (apiMarqueeList || []).forEach(function (article) {
      if (!article || !article.slug || article.slug === LEGACY_ARTICLE_SLUG) return;
      list.push(featuredSlideFromArticle(article));
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

  function syncLayout() {
    var root = getRoot();
    var spacer = document.getElementById("homeRainRecommendSpacer");
    var surface = root ? root.querySelector(".home-blog-strip__surface") : null;
    if (!root || !spacer) return;

    var headerOffset = syncHeaderHeight();
    root.style.paddingTop = headerOffset + "px";

    if (root.classList.contains("hidden")) {
      spacer.style.height = "0";
      return;
    }

    spacer.style.height = (surface ? surface.offsetHeight : root.offsetHeight) + "px";

    if (!isStripAnimating) {
      refreshTrackOffset(true);
    }
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
    var typeClass =
      slide.type === "resident"
        ? " home-blog-strip__slide--resident"
        : " home-blog-strip__slide--featured";
    return (
      '<div class="home-blog-strip__slide' +
      typeClass +
      (isHighlight ? " is-admin-preview-highlight" : "") +
      '" data-slide-index="' +
      index +
      '" data-slide-type="' +
      slide.type +
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
      '<span class="home-blog-strip__meta hidden md:inline">' +
      escapeHtml(slide.meta) +
      "</span>" +
      '<a href="' +
      escapeHtml(slide.href) +
      '" class="home-blog-strip__cta" title="' +
      escapeHtml(slide.title) +
      '" aria-label="' +
      escapeHtml(slide.title) +
      '"><span>' +
      escapeHtml(slide.btn) +
      " →</span></a>" +
      '<a href="blog/index.html" class="home-blog-strip__more">更多筆記</a>' +
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

  function patchResidentSlide() {
    if (!slides.length || slides[0].type !== "resident") return;
    var track = document.getElementById("homeBlogStripTrack");
    if (!track) return;
    var residentEls = track.querySelectorAll(".home-blog-strip__slide--resident");
    if (!residentEls.length) {
      renderStrip();
      return;
    }
    residentEls.forEach(function (existing) {
      var index = Number(existing.getAttribute("data-slide-index")) || 0;
      var wrap = document.createElement("div");
      wrap.innerHTML = renderSlideHtml(slides[0], index);
      var next = wrap.firstElementChild;
      if (existing.getAttribute("data-slide-clone") === "1") {
        next.setAttribute("data-slide-clone", "1");
      }
      track.replaceChild(next, existing);
    });
    setTrackPositionInstant();
    if (activeIndex === 0 || (hasCloneSlide && activeIndex === slides.length)) {
      applySurfaceMode();
    }
    requestAnimationFrame(syncLayout);
  }

  function trackSlideCount() {
    return hasCloneSlide ? slides.length + 1 : slides.length;
  }

  function renderStrip() {
    var root = getRoot();
    var track = document.getElementById("homeBlogStripTrack");
    var nav = document.getElementById("homeBlogStripNav");
    var dots = document.getElementById("homeBlogStripDots");
    if (!root || !track) return;

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
    var isResident = slide.type === "resident";
    var isRainy = isResident && residentRainMode === "rainy";

    root.classList.toggle("is-rainy", isRainy);
    root.classList.toggle("is-featured-active", slide.type === "featured");
    root.classList.toggle("is-rotating", slides.length > 1);
    root.setAttribute(
      "data-rain-mode",
      isResident ? residentRainMode : slide.type === "featured" ? "featured" : "default"
    );
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

  function destinationLogicalIndex(trackIndex) {
    if (hasCloneSlide && trackIndex === slides.length) return 0;
    return trackIndex;
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

  function restartRotation() {
    clearStripTimers();
    scheduleRotate();
  }

  function updateResidentMode(mode) {
    if (residentRainMode === mode) return;
    residentRainMode = mode;
    if (!slides.length || slides[0].type !== "resident") return;
    slides[0] = residentSlideFromMode(mode);
    patchResidentSlide();
  }

  function loadRainStatus() {
    var url =
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      TAIPEI_LAT +
      "&longitude=" +
      TAIPEI_LON +
      "&current=weather_code&hourly=precipitation_probability,weather_code&forecast_days=1&timezone=Asia%2FTaipei";

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("weather");
        return res.json();
      })
      .then(function (data) {
        var current = data.current || {};
        var hourly = data.hourly || {};
        var code = current.weather_code != null ? current.weather_code : 0;
        var pop = 0;
        var hourCode = code;

        if (hourly.time && hourly.precipitation_probability) {
          var now = new Date();
          for (var i = 0; i < hourly.time.length; i++) {
            var t = new Date(hourly.time[i]);
            if (t >= now) {
              pop = hourly.precipitation_probability[i] || 0;
              if (hourly.weather_code && hourly.weather_code[i] != null) {
                hourCode = hourly.weather_code[i];
              }
              break;
            }
          }
          if (!pop && hourly.precipitation_probability.length) {
            pop = hourly.precipitation_probability[0] || 0;
            if (hourly.weather_code && hourly.weather_code[0] != null) {
              hourCode = hourly.weather_code[0];
            }
          }
        }

        updateResidentMode(
          isRainyCondition(pop, hourCode) || isRainCode(code) ? "rainy" : "default"
        );
      })
      .catch(function () {
        updateResidentMode("default");
      });
  }

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
    bindStripEngagement();
    bindLayoutSync();

    renderStrip();
    restartRotation();
    syncLayout();

    window.addEventListener("resize", syncLayout);
    window.addEventListener("scroll", syncLayout, { passive: true });

    loadRainStatus();
  }

  window.initHomeRainRecommend = initHomeRainRecommend;
})();
