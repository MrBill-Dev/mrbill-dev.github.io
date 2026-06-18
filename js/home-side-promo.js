/**
 * 首頁右側浮動小推廣（桌面）+ Hero 下細橫條（手機）
 * 內容：雙北雨天親子筆記，含 Open-Meteo 雨天偵測切換文案
 */
(function () {
  "use strict";

  var ARTICLE_URL = "blog/taipei-newtaipei-rainy-day-family.html";
  var DISMISS_KEY = "homeSidePromoDismissed";
  var TAIPEI_LAT = 25.0478;
  var TAIPEI_LON = 121.5319;

  var COPY = {
    rainy: {
      emoji: "🌧️",
      label: "雨天備案",
      title: "雙北室內親子懶人包",
      cta: "下雨可先查"
    },
    default: {
      emoji: "👨‍👩‍👧",
      label: "生活觀察",
      title: "雙北雨天親子景點",
      cta: "延伸閱讀"
    }
  };

  var rainMode = "default";
  var isDismissed = false;
  var homeTabActive = true;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

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

  function copyForMode(mode) {
    return COPY[mode] || COPY.default;
  }

  function getDesktopRoot() {
    return document.getElementById("homeSidePromoDesktop");
  }

  function getMobileRoot() {
    return document.getElementById("homeSidePromoMobile");
  }

  function renderDesktopHtml(data) {
    return (
      '<div class="home-side-promo-desktop__card' +
      (rainMode === "rainy" ? " is-rainy" : "") +
      '">' +
      '<button type="button" class="home-side-promo__close" aria-label="關閉推薦" title="關閉">' +
      '<span aria-hidden="true">×</span></button>' +
      '<a href="' +
      ARTICLE_URL +
      '" class="home-side-promo-desktop__link">' +
      '<span class="home-side-promo__emoji" aria-hidden="true">' +
      escapeHtml(data.emoji) +
      "</span>" +
      '<span class="home-side-promo__label">' +
      escapeHtml(data.label) +
      "</span>" +
      '<span class="home-side-promo__title">' +
      escapeHtml(data.title) +
      "</span>" +
      '<span class="home-side-promo__cta">' +
      escapeHtml(data.cta) +
      " →</span>" +
      "</a></div>"
    );
  }

  function renderMobileHtml(data) {
    return (
      '<div class="home-side-promo-mobile__inner' +
      (rainMode === "rainy" ? " is-rainy" : "") +
      '">' +
      '<button type="button" class="home-side-promo__close" aria-label="關閉推薦" title="關閉">' +
      '<span aria-hidden="true">×</span></button>' +
      '<a href="' +
      ARTICLE_URL +
      '" class="home-side-promo-mobile__link">' +
      '<span class="home-side-promo__emoji" aria-hidden="true">' +
      escapeHtml(data.emoji) +
      "</span>" +
      '<span class="home-side-promo-mobile__text">' +
      '<span class="home-side-promo__label">' +
      escapeHtml(data.label) +
      "</span>" +
      '<span class="home-side-promo__title">' +
      escapeHtml(data.title) +
      "</span>" +
      "</span>" +
      '<span class="home-side-promo__cta">' +
      escapeHtml(data.cta) +
      " →</span>" +
      "</a></div>"
    );
  }

  function patchPromoContent() {
    var data = copyForMode(rainMode);
    var desktop = getDesktopRoot();
    var mobile = getMobileRoot();
    if (desktop) desktop.innerHTML = renderDesktopHtml(data);
    if (mobile) mobile.innerHTML = renderMobileHtml(data);
    bindCloseButtons();
  }

  function applyVisibility() {
    var show = homeTabActive && !isDismissed;
    var desktop = getDesktopRoot();
    var mobile = getMobileRoot();
    if (desktop) desktop.classList.toggle("is-visible", show);
    if (mobile) mobile.classList.toggle("is-visible", show);
    document.body.classList.toggle("has-home-side-promo", show);
  }

  function dismissPromo() {
    isDismissed = true;
    sessionStorage.setItem(DISMISS_KEY, "1");
    applyVisibility();
  }

  function bindCloseButtons() {
    [getDesktopRoot(), getMobileRoot()].forEach(function (root) {
      if (!root) return;
      var btn = root.querySelector(".home-side-promo__close");
      if (!btn || btn.getAttribute("data-bound") === "1") return;
      btn.setAttribute("data-bound", "1");
      btn.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        dismissPromo();
      });
    });
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

        var nextMode =
          isRainyCondition(pop, hourCode) || isRainCode(code) ? "rainy" : "default";
        if (rainMode !== nextMode) {
          rainMode = nextMode;
          patchPromoContent();
        }
      })
      .catch(function () {
        /* keep default copy */
      });
  }

  function syncHomeSidePromoLayout() {
    syncHeaderHeightForPromo();
  }

  function syncHeaderHeightForPromo() {
    var header = document.getElementById("global-header");
    if (!header) return;
    var height = Math.max(0, Math.round(header.getBoundingClientRect().bottom));
    document.documentElement.style.setProperty("--site-header-height", height + "px");
  }

  function bindPromoLayoutSync() {
    var header = document.getElementById("global-header");
    window.syncHomeSidePromoLayout = syncHomeSidePromoLayout;
    window.addEventListener("resize", syncHomeSidePromoLayout, { passive: true });
    if (header && typeof ResizeObserver !== "undefined") {
      var observer = new ResizeObserver(syncHomeSidePromoLayout);
      observer.observe(header);
    }
    var strip = document.getElementById("homeRainRecommend");
    if (strip && typeof ResizeObserver !== "undefined") {
      var stripObserver = new ResizeObserver(syncHomeSidePromoLayout);
      stripObserver.observe(strip);
      var surface = strip.querySelector(".home-blog-strip__surface");
      if (surface) stripObserver.observe(surface);
    }
  }

  function syncHomeSidePromoTab(isHome) {
    homeTabActive = !!isHome;
    applyVisibility();
    syncHomeSidePromoLayout();
  }

  function initHomeSidePromo() {
    if (!getDesktopRoot() && !getMobileRoot()) return;

    isDismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    patchPromoContent();
    bindPromoLayoutSync();
    applyVisibility();
    syncHomeSidePromoLayout();
    loadRainStatus();

    window.syncHomeSidePromoTab = syncHomeSidePromoTab;
  }

  window.initHomeSidePromo = initHomeSidePromo;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeSidePromo);
  } else {
    initHomeSidePromo();
  }
})();
