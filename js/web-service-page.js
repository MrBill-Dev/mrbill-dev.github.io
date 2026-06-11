(function () {
  var DETAILS = {
    "plan-brand": {
      title: "品牌單頁方案｜完整說明",
      html:
        "<p><b>適合誰？</b> 第一次做網站、想先有一個「官方入口」的人。例如攝影師、講師、接案者，目前主要靠 IG／FB，但客戶常問「你的服務在哪裡看？」</p>" +
        "<p><b>你會得到什麼？</b> 一頁式網站，從上到下把你是誰、做什麼、怎麼聯絡講清楚。不是華麗首頁，而是讓人 30 秒內看懂。</p>" +
        "<p><b>包含：</b>品牌介紹、服務重點、作品或案例區、聯絡 CTA、手機版閱讀優化、基礎上線設定。</p>" +
        "<p><b>不包含：</b>多頁導覽、複雜後台、大量客製動畫。若之後要擴充，可再升級到導流頁或小型官網。</p>" +
        "<p><b>時程：</b>資料齊全約 1～2 週；若需協助整理文案，約 2～3 週。</p>" +
        "<p><b>起價 NT$12,000</b>，實際依設計細節、是否需要協助寫文案、照片數量調整。</p>"
    },
    "plan-convert": {
      title: "服務轉換頁方案｜完整說明",
      html:
        "<p><b>適合誰？</b> 已有明確服務或課程，希望訪客看完就願意填表、加 LINE、預約的人。例如補習班、教練、顧問、活動報名。</p>" +
        "<p><b>跟品牌單頁差在哪？</b> 品牌單頁偏「介紹你是誰」；轉換頁偏「說服對方採取下一步」。會更著重痛點、方案比較、流程、FAQ、詢問表單動線。</p>" +
        "<p><b>包含：</b>痛點區、服務方案、製作／上課流程、案例或見證、FAQ、表單或 LINE CTA、基礎 SEO／GEO 結構。</p>" +
        "<p><b>時程：</b>約 2～3 週，視文案與案例是否齊全。</p>" +
        "<p><b>起價 NT$18,000</b>。若需要多個方案區塊、報名表串接，會另估。</p>"
    },
    "plan-site": {
      title: "小型官網方案｜完整說明",
      html:
        "<p><b>適合誰？</b> 工作室、小型商家，需要分頁介紹：首頁、服務、案例、關於、聯絡。內容比一頁多，但不需要電商或大型系統。</p>" +
        "<p><b>跟轉換頁差在哪？</b> 轉換頁通常是一頁到底；小型官網是多頁架構，適合服務項目多、需要分類說明的品牌。</p>" +
        "<p><b>包含：</b>約 4～6 頁內容規劃、導覽列、各頁 RWD、CTA 與聯絡設計、上線交付與基本操作說明。</p>" +
        "<p><b>時程：</b>約 3～6 週，依頁數與資料完整度。</p>" +
        "<p><b>起價 NT$35,000</b>。若需文章系統、會員、金流，需另開需求評估。</p>"
    },
    "plan-reorg": {
      title: "舊網站整理方案｜完整說明",
      html:
        "<p><b>適合誰？</b> 已有網站，但自己也不太想點進去：手機難讀、資訊過時、找不到聯絡方式、畫面像十年前做的。</p>" +
        "<p><b>會做什麼？</b> 先健檢現有網站，列出最影響詢問的問題，再優先調整：標題層級、段落順序、CTA、手機排版、載入速度基本檢查。</p>" +
        "<p><b>不包含：</b>整站重做（那會接近新案報價）。若評估後重做較划算，會先跟你說明再決定。</p>" +
        "<p><b>起價 NT$8,000</b>，依現況複雜度調整。</p>"
    },
    "plan-seo": {
      title: "SEO／GEO 內容整理方案｜完整說明",
      html:
        "<p><b>適合誰？</b> 網站已有基本架構，但搜尋找不到、或 AI 摘要講不清楚你是做什麼的。也適合想先規劃內容再開工的人。</p>" +
        "<p><b>會交付什麼？</b> 服務關鍵字與頁面主題建議、FAQ 題庫、標題與描述方向、內容缺口清單、後續可寫的文章方向。偏重「結構與策略」，不是保證排名。</p>" +
        "<p><b>起價 NT$6,000</b>。若需實際改寫全站文案，會併入網站製作或另估。</p>"
    },
    "plan-compare": {
      title: "五種方案怎麼選？（給第一次做網站的人）",
      html:
        "<ul class='ws-modal-list'>" +
        "<li><b>完全沒網站，只想先有一個入口</b> → 品牌單頁</li>" +
        "<li><b>有服務想提高詢問／報名</b> → 服務轉換頁</li>" +
        "<li><b>服務多、需要分頁說明</b> → 小型官網</li>" +
        "<li><b>有舊站但難用</b> → 舊網站整理（或評估後重做）</li>" +
        "<li><b>網站有了，但搜尋／AI 看不懂</b> → SEO／GEO 內容整理</li>" +
        "<li><b>設計完成，需代傳主機或多次部署</b> → 上線協助加值（NT$2,000 起；一般方案已含一次基本上線）</li>" +
        "</ul>" +
        "<p>我不包辦網域與主機年費，但可協助免費空間部署或代傳你現有的主機。不確定時填表描述現況即可。</p>"
    },
    "process-detail": {
      title: "製作流程｜各階段說明",
      html:
        "<ol class='ws-modal-list'>" +
        "<li><b>填寫需求</b>：了解服務、預算、目標、現有素材（沒有也沒關係）。</li>" +
        "<li><b>確認方案</b>：回覆建議做法與報價範圍，雙方確認後收訂金排程。</li>" +
        "<li><b>整理資料</b>：訪談或資料表，把散亂內容變成網站章節。</li>" +
        "<li><b>製作初版</b>：先給可點開、可討論的版本，不是直接定稿。</li>" +
        "<li><b>修改調整</b>：依合約範圍內修改文案、區塊、動線（通常 1～2 輪）。</li>" +
        "<li><b>上線交付</b>：部署、基本測試、操作說明。</li>" +
        "<li><b>後續維護</b>：可選月保或按次修改（見維護說明）。</li>" +
        "</ol>"
    },
    "maintenance": {
      title: "後續維護與修改費用",
      html:
        "<p><b>上線後不是就結束。</b> 價格調整、新增案例、換照片、活動頁更新，之後都可能需要。先把規則講清楚，比事後尷尬好。</p>" +
        "<p><b>按次修改</b>：文字小改、換圖、調整 CTA，單次 NT$800 起（依工作量）。</p>" +
        "<p><b>月保方案</b>：每月 NT$2,500 起，含固定次數小修改、基本檢查、緊急顯示問題協助（不含新頁面、不重做版型）。</p>" +
        "<p><b>另計項目</b>：新增頁面、整區重做、大量文案重寫、功能開發，會先報價再動工。</p>" +
        "<p><b>網域與主機</b>：我不包辦、不代收年費。網域請自行購買；主機可用免費空間。我可協助部署或代傳你現有主機（見上線說明）。</p>" +
        "<p>維護非強制。若你會自己改 HTML 或之後再找我，都可以。</p>"
    },
    "first-site": {
      title: "第一次做網站？可以先知道這些",
      html:
        "<p><b>網域</b>：就是你的網址（例如 yourname.com）。需自行向註冊商購買，我可以協助指向設定，但不代購。</p>" +
        "<p><b>主機／空間</b>：放網站檔案的地方。我不販售主機，但可協助上架到 GitHub Pages 等免費方案；或你提供現有主機帳密，代為上傳。</p>" +
        "<p><b>後台</b>：不是一定要有。內容不常改，靜態網站更單純；常發文章再考慮後台。</p>" +
        "<p><b>素材</b>：Logo、照片、案例愈齊，完成愈快；沒有也可以先做結構，之後再補。</p>" +
        "<p><b>預算</b>：先有一頁入口，1～2 萬是常見起點；要完整官網與搜尋架構，預算會再高一階。可先填表，我會依現況建議「最小可行」做法。</p>"
    },
    "hosting-scope": {
      title: "網域、主機與上線｜服務範圍說明",
      html:
        "<p><b>我做什麼</b></p>" +
        "<ul class='ws-modal-list'>" +
        "<li>網站設計、內容整理、手機版、詢問動線</li>" +
        "<li>協助部署到 GitHub Pages 等免費空間</li>" +
        "<li>若你已有主機／FTP／cPanel，提供帳密後代為上傳</li>" +
        "<li>基本上線測試與簡單操作說明（已含在方案交付內）</li>" +
        "</ul>" +
        "<p><b>我不做什麼</b></p>" +
        "<ul class='ws-modal-list'>" +
        "<li>不包辦網域註冊、不代收主機年費</li>" +
        "<li>不販售虛擬主機、不綁年約方案</li>" +
        "<li>不長期代管你的主機帳密（上線完成後建議你自行保管）</li>" +
        "</ul>" +
        "<p><b>上線協助加值（NT$2,000 起）</b>：若需多次部署、代傳非標準主機、或與主方案分開進行的上線支援，可另估。一般方案已含一次基本上線。</p>" +
        "<p>這樣分工的好處是：你不會被綁在我不熟悉的主機方案裡，費用也更透明。</p>"
    },
    "why-me": {
      title: "跟同業、大型公司比，差在哪？",
      html:
        "<p><b>跟大型網頁公司比</b></p>" +
        "<ul class='ws-modal-list'>" +
        "<li>他們：報價常從數萬起，含業務、專案、設計多層成本</li>" +
        "<li>我：小案可從單頁 1.2 萬起，直接跟做的人溝通</li>" +
        "<li>他們：常搭配主機年約、後續修改另開專案</li>" +
        "<li>我：不包主機，修改可按次或月保，規則先講</li>" +
        "</ul>" +
        "<p><b>跟低價套版／同業比</b></p>" +
        "<ul class='ws-modal-list'>" +
        "<li>套版：快但內容常塞不進去，每個客戶看起來差不多</li>" +
        "<li>我：依你的服務重新整理章節，不是只換 Logo</li>" +
        "<li>套版：很少想「客戶會不會詢問」</li>" +
        "<li>我：表單、LINE、FAQ、手機閱讀都一起規劃</li>" +
        "</ul>" +
        "<p><b>我的核心</b>：實用型網站——讓人看懂、找得到、願意聯絡。不是比誰的動畫多，而是比誰能幫你把生意講清楚。</p>"
    }
  };

  var modalEl, modalTitle, modalBody, modalBackdrop, lastFocus;
  var scrolling = false;

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function openDetail(id) {
    var data = DETAILS[id];
    if (!data || !modalEl) return;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.html;
    lastFocus = document.activeElement;
    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalTitle.focus();
  }

  function closeDetail() {
    if (!modalEl) return;
    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function initModal() {
    modalEl = document.getElementById("ws-detail-modal");
    modalTitle = document.getElementById("ws-detail-title");
    modalBody = document.getElementById("ws-detail-body");
    modalBackdrop = document.getElementById("ws-detail-backdrop");
    var closeBtn = document.getElementById("ws-detail-close");

    document.querySelectorAll("[data-ws-detail]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openDetail(btn.getAttribute("data-ws-detail"));
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeDetail);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeDetail);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalEl && modalEl.classList.contains("is-open")) closeDetail();
    });
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  function smoothScrollTo(target) {
    if (!target || scrolling) return;

    var headerH = 88;
    var start = getScrollTop();
    var end = target.getBoundingClientRect().top + start - headerH;
    end = Math.max(0, end);
    var distance = Math.abs(end - start);

    if (distance < 4) return;

    scrolling = true;
    var duration = Math.min(1400, Math.max(700, distance * 0.65));
    var started = null;

    function step(now) {
      if (!started) started = now;
      var progress = Math.min((now - started) / duration, 1);
      var y = start + (end - start) * easeOutCubic(progress);
      window.scrollTo(0, y);
      document.documentElement.scrollTop = y;
      document.body.scrollTop = y;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        scrolling = false;
        target.classList.add("ws-scroll-target");
        setTimeout(function () { target.classList.remove("ws-scroll-target"); }, 1200);
      }
    }

    requestAnimationFrame(step);
  }

  function initSmoothScroll() {
    document.addEventListener(
      "click",
      function (e) {
        var a = e.target.closest('a[href^="#"]');
        if (!a || a.getAttribute("href") === "#") return;
        var id = (a.getAttribute("href") || "").slice(1);
        if (!id) return;
        var el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        smoothScrollTo(el);
        if (history.replaceState) {
          history.replaceState(null, "", "#" + id);
        }
      },
      true
    );
  }

  function markVisible(el) {
    if (!el || el.classList.contains("is-visible")) return;
    requestAnimationFrame(function () {
      el.classList.add("is-visible");
      if (el.classList.contains("ws-stagger")) {
        window.setTimeout(function () {
          Array.prototype.forEach.call(el.children, function (child) {
            if (getComputedStyle(child).opacity === "0") {
              child.style.opacity = "1";
              child.style.transform = "none";
            }
          });
        }, 950);
      }
    });
  }

  function inViewport(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < vh * 0.88 && rect.bottom > vh * 0.08;
  }

  function revealInViewport() {
    document.querySelectorAll(".ws-reveal:not(.is-visible), .ws-stagger:not(.is-visible)").forEach(function (el) {
      if (inViewport(el)) markVisible(el);
    });
  }

  function initReveal() {
    var targets = document.querySelectorAll(".ws-reveal, .ws-stagger");

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            markVisible(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -6% 0px" }
    );

    targets.forEach(function (el) {
      io.observe(el);
    });

    document.querySelectorAll(".ws-hero .ws-reveal, .ws-hero .ws-stagger").forEach(markVisible);

    var scrollTimer;
    window.addEventListener(
      "scroll",
      function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(revealInViewport, 80);
      },
      { passive: true }
    );

    window.addEventListener("resize", revealInViewport, { passive: true });
    revealInViewport();
    setTimeout(revealInViewport, 400);
    setTimeout(revealInViewport, 1200);
  }

  function initHeroMotion() {
    var hero = document.querySelector(".ws-hero-stats");
    if (!hero) return;
    hero.classList.add("ws-hero-stats--live");
  }

  function initInteract() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        var body = item.querySelector(".faq-body");
        if (!body) return;
        body.style.animation = "none";
        void body.offsetHeight;
        body.style.animation = "wsFaqOpen 0.45s ease";
      });
    });

    document.querySelectorAll(".btn-primary, .btn-dark, .btn-ghost").forEach(function (btn) {
      function resetBtn() {
        btn.style.transform = "";
      }
      btn.addEventListener("mousedown", function () {
        btn.style.transform = "scale(0.97)";
      });
      btn.addEventListener("mouseup", resetBtn);
      btn.addEventListener("mouseleave", resetBtn);
    });
  }

  function init() {
    initModal();
    initSmoothScroll();
    initReveal();
    initHeroMotion();
    initInteract();
  }

  window.wsSmoothScrollTo = smoothScrollTo;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
