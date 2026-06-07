/**
 * 首頁橫幅：header 下、hero 上（預設位置），下滑固定貼齊 header
 */
(function () {
  "use strict";

  var ARTICLE_URL = "blog/taipei-newtaipei-rainy-day-family.html";
  var TAIPEI_LAT = 25.0478;
  var TAIPEI_LON = 121.5319;
  var ENGAGE_KEY = "homeBlogStripEngaged";

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

  function setKickerText(kicker, text) {
    if (!kicker) return;
    var dot = kicker.querySelector(".home-blog-strip__dot");
    kicker.textContent = "";
    if (dot) kicker.appendChild(dot);
    kicker.appendChild(document.createTextNode(text));
  }

  function syncHeaderHeight() {
    var header = document.getElementById("global-header");
    if (!header) return 80;
    var rect = header.getBoundingClientRect();
    var height = Math.max(0, Math.round(rect.bottom));
    document.documentElement.style.setProperty("--site-header-height", height + "px");
    return height;
  }

  function syncLayout() {
    var root = document.getElementById("homeRainRecommend");
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
  }

  function applyCopy(mode) {
    var data = COPY[mode] || COPY.default;
    var root = document.getElementById("homeRainRecommend");
    var kicker = document.getElementById("rainRecommendKicker");
    var pill = document.getElementById("rainRecommendBadge");
    var hint = document.getElementById("rainRecommendHint");
    var title = document.getElementById("rainRecommendTitle");
    var meta = document.getElementById("rainRecommendMeta");
    var cta = document.getElementById("rainRecommendCta");
    var link = document.getElementById("rainRecommendLink");

    if (root) {
      root.classList.toggle("is-rainy", mode === "rainy");
      root.setAttribute("data-rain-mode", mode);
    }
    setKickerText(kicker, data.kicker);
    if (pill) pill.textContent = data.pill;
    if (hint) hint.textContent = data.hint;
    if (title) title.textContent = data.title;
    if (meta) meta.textContent = data.meta;
    if (cta) cta.textContent = data.btn + " →";
    if (link) {
      link.setAttribute("href", ARTICLE_URL);
      link.setAttribute("title", data.title);
      link.setAttribute("aria-label", data.title);
    }

    requestAnimationFrame(syncLayout);
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

        applyCopy(isRainyCondition(pop, hourCode) || isRainCode(code) ? "rainy" : "default");
      })
      .catch(function () {
        applyCopy("default");
      });
  }

  function bindStripEngagement() {
    var root = document.getElementById("homeRainRecommend");
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
  }

  function bindLayoutSync() {
    var root = document.getElementById("homeRainRecommend");
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

  function initHomeRainRecommend() {
    if (!document.getElementById("homeRainRecommend")) return;

    window.syncHomeBlogStripLayout = syncLayout;

    applyCopy("default");
    bindStripEngagement();
    bindLayoutSync();
    syncLayout();

    window.addEventListener("resize", syncLayout);
    window.addEventListener("scroll", syncLayout, { passive: true });
    loadRainStatus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeRainRecommend);
  } else {
    initHomeRainRecommend();
  }
})();
