/**
 * 專題文章：捲動顯示動畫、回到頂部、手機閱讀節奏
 */
var BLOG_AUTHOR = {
  name: "Mr.Bill",
  avatar: "assets/mrbill-author-avatar.png",
  tagline:
    "約 20 年網站相關經驗 · 十多年網頁前端實務 · 本站 SEO/GEO 落地 · AI 應用深化",
  lead: "把網站、設計、AI 與影像創作，整理成看得懂、做得到、能帶著走的實用內容。",
  motto:
    "無論你是學生、上班族、家長或創作者，\n願你在這裡找到對自己有幫助，也能實際應用的方法。",
  intro: [
    "從學生時代開始接觸網站企劃與製作，至今累積約 20 年網站相關經驗；正式投入前端、網站維護、RWD、互動元件、內容上線與改版協作等實務工作，也已超過十多年。",
    "本站是我個人經營的數位實驗室，主要整理自己做過、測過、踩過坑的前端、SEO/GEO、AI 工作流、設計與影像創作經驗。希望這裡不是只放觀念，也不是只貼工具指令，而是把「為什麼這樣做」、「實際怎麼做」、「哪裡容易失敗」一起整理出來。"
  ],
  moreLabel: "更多背景與專長",
  details: [
    {
      label: "學歷背景",
      items: [
        "國立海山高工機械製圖科",
        "萬能科技大學紡織系纖維科技組"
      ],
      text:
        "機械製圖與纖維科技的背景，讓我習慣從結構、比例、材料與流程角度拆解問題，這也影響後來在網頁、設計與影像工作上的判斷方式。"
    },
    {
      label: "前端與網站",
      items: [
        "約 20 年網站企劃、製作與維護相關經驗",
        "十多年正式網頁前端、網站維護與企劃實務",
        "熟悉 RWD 切版、UI 介面、互動元件與活動頁製作",
        "接觸 ASP、ASP.NET、PHP 等網站環境整合",
        "前端實作包含 JavaScript、jQuery、Vue 等技術"
      ],
      text:
        "我更在意的是：網站不只是做得漂亮，而是要能被看懂、能被操作、能被搜尋，也能協助內容或服務真正被使用者找到。"
    },
    {
      label: "SEO / GEO 實務",
      items: [
        "本站作為 SEO/GEO 實驗與驗證場域",
        "實作 title、description、canonical、sitemap、OG 分享預覽",
        "建置 Article／FAQ 結構化資料",
        "規劃內鏈架構與 AI 摘要友善內容結構",
        "透過 Search Console 與分享偵錯工具持續對照結果"
      ],
      text:
        "我不把 SEO 當成只改 meta，而是把內容結構、搜尋意圖、頁面體驗、收錄狀態與分享結果一起看。對我來說，SEO/GEO 不是單一設定，而是一整套從內容、結構、技術到驗證的持續調整流程。"
    },
    {
      label: "AI 應用、自動化與 Agent",
      items: [
        "研究 prompt 分級、多步驟工作流與 AI 協作方法",
        "應用於內容整理、文章規劃、前端輔助與互動元件設計",
        "嘗試 AI 與網站／CMS 流程整合，包含內容產出、資料整理與上線前檢查",
        "探索自動化流程與 Agent 應用，讓重複性工作能被拆解、串接與半自動執行",
        "文章盡量保留步驟、限制、判斷點與可調整參數"
      ],
      text:
        "我希望讀者不是只複製一段指令，而是能理解背後邏輯，再依自己的情境重新應用。AI 對我來說不是取代專業，而是把原本的企劃、設計、前端、內容與維護流程重新拆解，進一步加速、驗證與自動化。"
    },
    {
      label: "設計與工程",
      items: [
        "接觸平面設計、網頁美術與視覺排版",
        "曾接觸 3D 角色、工業設計、機構與硬體工程",
        "重視結構邏輯、視覺比例、使用者感受與實際落地"
      ],
      text:
        "這些跨域背景讓我在處理網站、設計與 AI 工具時，比較習慣用「拆解、整合、驗證」的方式完成作品。"
    },
    {
      label: "影像創作",
      items: [
        "微電影製作與婚禮攝影經驗",
        "熟悉取景構圖、光線判斷、敘事節奏與後期調色",
        "將攝影與視覺經驗延伸到網站 UI、內容編排與品牌形象"
      ],
      text:
        "對我來說，影像、設計與前端不是分開的技能，而是可以互相串聯的表達方法。好的網站不只需要技術，也需要畫面感、節奏感與讓人願意繼續閱讀的內容安排。"
    },
    {
      label: "現階段",
      items: [
        "前端維護與網站相關工作仍是主要實務核心",
        "持續投入本站 SEO/GEO 優化",
        "試做 AI 工作流、互動元件與教學內容",
        "將做完、驗過、能帶著走的經驗整理公開"
      ],
      text:
        "希望這個網站能慢慢累積成一個給學生、家長、創作者與數位工作者參考的實用筆記庫。"
    }
  ]
};

function blogArticlePrefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function initBlogScrollReveal() {
  var root = document.querySelector(".blog-main.blog-prose");
  if (!root) return;

  var targets = root.querySelectorAll(
    ":scope > section, :scope > .blog-bridge, :scope > #blog-article-author-slot > section, .blog-lesson-band, .blog-dark-panel"
  );

  targets.forEach(function (el, index) {
    el.classList.add("blog-reveal");
    el.style.setProperty("--blog-reveal-delay", index % 6 * 70 + "ms");
  });

  if (blogArticlePrefersReducedMotion()) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
}

function initBlogBackToTop() {
  if (typeof window.initSiteBackToTop === "function") {
    return window.initSiteBackToTop();
  }
  return null;
}

function blogAuthorEscape(str) {
  if (typeof escapeBlogHtml === "function") return escapeBlogHtml(str);
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ensureAuthorSerifFont() {
  if (document.querySelector('link[href*="Noto+Serif+TC"]')) return;
  var href = "https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@600;700;900&display=swap";
  var pre1 = document.createElement("link");
  pre1.rel = "preconnect";
  pre1.href = "https://fonts.googleapis.com";
  document.head.appendChild(pre1);
  var pre2 = document.createElement("link");
  pre2.rel = "preconnect";
  pre2.href = "https://fonts.gstatic.com";
  pre2.crossOrigin = "anonymous";
  document.head.appendChild(pre2);
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function authorUsesSerifCopy(author) {
  return !!(author.tagline || author.lead || author.motto);
}

function blogAuthorDetailHtml(item) {
  var html = '<div class="blog-author-card__detail">';
  if (item.label) {
    html +=
      '<p class="blog-author-card__section-label">' +
      blogAuthorEscape(item.label) +
      "</p>";
  }
  var list = item.items || [];
  if (list.length) {
    html += '<ul class="blog-author-card__list">';
    list.forEach(function (line) {
      html += "<li>" + blogAuthorFormatProseText(line) + "</li>";
    });
    html += "</ul>";
  }
  if (item.text) {
    html +=
      '<p class="blog-author-card__section-text">' +
      blogAuthorFormatProseText(item.text) +
      "</p>";
  } else if (!list.length && item.background) {
    html +=
      '<p class="blog-author-card__section-text">' +
      blogAuthorFormatProseText(item.background) +
      "</p>";
  }
  return html + "</div>";
}

function blogAuthorIntroParagraphs(intro) {
  if (!intro) return [];
  return Array.isArray(intro) ? intro : [intro];
}

function blogAuthorFormatProseText(text) {
  var raw = String(text || "");
  raw = raw.replace(/約\s+(\d+)\s+年/g, "約\u00A0$1\u00A0年");
  raw = raw.replace(/(\d+)\s+年/g, "$1\u00A0年");

  var acronyms = [
    "SEO/GEO",
    "JSON-LD",
    "ASP.NET",
    "RWD",
    "CMS",
    "PHP",
    "Vue",
    "AI"
  ];
  acronyms.sort(function (a, b) {
    return b.length - a.length;
  });
  acronyms.forEach(function (term) {
    var re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    raw = raw.replace(re, function (match) {
      return "\uE000" + match + "\uE001";
    });
  });

  var escaped = blogAuthorEscape(raw);
  return escaped.replace(
    /\uE000([^\uE001]+)\uE001/g,
    '<span class="blog-author-card__nowrap">$1</span>'
  );
}

function blogAuthorAvatarHtml(author) {
  var path = (author && author.avatar) || "";
  if (path) {
    var src =
      typeof blogAssetHref === "function" ? blogAssetHref(path) : path;
    var alt = (author.name || "Mr.Bill") + " 作者頭像";
    return (
      '<div class="blog-author-card__avatar">' +
      '<img class="blog-author-card__avatar-img" src="' +
      blogAuthorEscape(src) +
      '" alt="' +
      blogAuthorEscape(alt) +
      '" width="52" height="52" loading="lazy" decoding="async" />' +
      "</div>"
    );
  }
  return (
    '<div class="blog-author-card__avatar blog-author-card__avatar--fallback" aria-hidden="true">MB</div>'
  );
}

function renderBlogAuthorCard(mountId) {
  var mount = document.getElementById(mountId || "blog-article-author-slot");
  if (!mount) return;

  var author = BLOG_AUTHOR || {};
  if (authorUsesSerifCopy(author)) ensureAuthorSerifFont();
  var html =
    '<section class="blog-author-card blog-reveal" id="blog-author" aria-labelledby="blog-author-name">' +
    blogAuthorAvatarHtml(author) +
    '<div class="blog-author-card__content">' +
    '<div class="blog-author-card__identity">' +
    '<p class="blog-author-card__label">關於作者</p>' +
    '<p class="blog-author-card__name" id="blog-author-name">' +
    blogAuthorEscape(author.name) +
    "</p>";

  if (author.tagline) {
    html +=
      '<p class="blog-author-card__tagline blog-author-card__serif">' +
      blogAuthorFormatProseText(author.tagline) +
      "</p>";
  }

  html += '</div><div class="blog-author-card__main">';

  if (author.lead) {
    html +=
      '<p class="blog-author-card__lead blog-author-card__serif">' +
      blogAuthorFormatProseText(author.lead) +
      "</p>";
  }
  if (author.motto) {
    var mottoHtml = blogAuthorFormatProseText(author.motto).replace(/\n/g, "<br />");
    html +=
      '<p class="blog-author-card__motto blog-author-card__serif">' +
      mottoHtml +
      "</p>";
  }
  blogAuthorIntroParagraphs(author.intro).forEach(function (paragraph) {
    if (!paragraph) return;
    html +=
      '<p class="blog-author-card__bio">' +
      blogAuthorFormatProseText(paragraph) +
      "</p>";
  });

  var detailItems = author.details || [];
  if (!detailItems.length && author.background) {
    detailItems = [{ label: "", text: author.background }];
  }
  if (detailItems.length) {
    html +=
      '<details class="blog-author-card__more">' +
      '<summary class="blog-author-card__more-toggle">' +
      blogAuthorEscape(author.moreLabel || "更多背景") +
      "</summary>" +
      '<div class="blog-author-card__more-body">';
    detailItems.forEach(function (item) {
      html += blogAuthorDetailHtml(item);
    });
    html += "</div></details>";
  }

  html += "</div></div></section>";
  mount.innerHTML = html;
}

var BLOG_LIKE_HEART_OUTLINE =
  '<svg class="blog-like-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>';

var BLOG_LIKE_HEART_FILLED =
  '<svg class="blog-like-btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

function initBlogLikeButton(slug) {
  slug =
    slug ||
    (typeof getCurrentBlogSlug === "function" ? getCurrentBlogSlug() : null);
  var main = document.querySelector(".blog-main.blog-prose");
  if (!main || !slug || document.getElementById("blog-like-btn")) return;

  var liked =
    typeof window.hasBlogLiked === "function" && window.hasBlogLiked(slug);

  var panel = document.createElement("div");
  panel.className = "blog-like-panel";
  panel.id = "blog-like-panel";

  var btn = document.createElement("button");
  btn.type = "button";
  btn.id = "blog-like-btn";
  btn.className = "blog-like-btn" + (liked ? " is-liked" : "");
  btn.setAttribute("aria-pressed", liked ? "true" : "false");
  btn.setAttribute(
    "aria-label",
    liked ? "已喜歡這篇" : "我也喜歡，計入讀者喜歡人數"
  );
  btn.innerHTML =
    (liked ? BLOG_LIKE_HEART_FILLED : BLOG_LIKE_HEART_OUTLINE) +
    '<span class="blog-like-btn__label">' +
    (liked ? "已喜歡" : "我也喜歡") +
    "</span>";

  if (liked) {
    btn.disabled = true;
  } else {
    btn.addEventListener("click", function () {
      if (btn.disabled || btn.classList.contains("is-liked")) return;
      btn.disabled = true;
      btn.classList.add("is-busy");
      btn.querySelector(".blog-like-btn__label").textContent = "送出中…";

      var done = function (ok) {
        btn.classList.remove("is-busy");
        if (!ok) {
          btn.disabled = false;
          btn.querySelector(".blog-like-btn__label").textContent = "我也喜歡";
          return;
        }
        btn.classList.add("is-liked");
        btn.setAttribute("aria-pressed", "true");
        btn.setAttribute("aria-label", "已喜歡這篇");
        btn.innerHTML =
          BLOG_LIKE_HEART_FILLED +
          '<span class="blog-like-btn__label">已喜歡</span>';
      };

      if (typeof window.registerBlogLike === "function") {
        window.registerBlogLike(slug).then(done);
      } else {
        done(false);
      }
    });
  }

  panel.appendChild(btn);
  main.insertBefore(panel, main.firstChild);
}

function faqSummaryLabel(raw) {
  return String(raw || "")
    .replace(/^Q\d+\s*[：:]\s*/i, "")
    .trim();
}

function buildFaqDetailsFromLegacyItem(item) {
  if (!item || item.tagName === "DETAILS") return item;
  var q =
    item.querySelector(".faq-q") ||
    item.querySelector(".blog-faq__q") ||
    item.querySelector("summary");
  var answer = item.querySelector(".blog-faq__a") || item.querySelector("p");
  if (!q || !answer) return null;

  var details = document.createElement("details");
  details.className = "blog-faq__item";
  var summary = document.createElement("summary");
  summary.textContent = faqSummaryLabel(q.textContent);
  var p = document.createElement("p");
  p.className = "blog-faq__a";
  p.innerHTML = answer.innerHTML;
  details.appendChild(summary);
  details.appendChild(p);
  return details;
}

function upgradeFaqItemToDetails(item) {
  var details = buildFaqDetailsFromLegacyItem(item);
  if (!details || item.tagName === "DETAILS") return item;
  item.replaceWith(details);
  return details;
}

/** 將舊版 FAQ 區塊轉成 details 收合，並預設全部收合 */
function initBlogFaqAccordion() {
  document
    .querySelectorAll(".ai-kids-exam-prose #faq .card, .blog-faq")
    .forEach(function (wrap) {
      var legacyItems = wrap.querySelectorAll(".faq-item");
      if (!legacyItems.length) return;

      var blogFaq = wrap.classList.contains("blog-faq")
        ? wrap
        : document.createElement("div");
      if (!wrap.classList.contains("blog-faq")) {
        blogFaq.className = "blog-faq";
        Array.prototype.slice.call(legacyItems).forEach(function (item) {
          var details = buildFaqDetailsFromLegacyItem(item);
          if (details) blogFaq.appendChild(details);
        });
        wrap.replaceWith(blogFaq);
        return;
      }

      Array.prototype.slice.call(legacyItems).forEach(function (item) {
        upgradeFaqItemToDetails(item);
      });
    });

  document
    .querySelectorAll(".blog-faq .blog-faq__item:not(details), .ai-kids-exam-prose .blog-faq__item:not(details)")
    .forEach(function (item) {
      upgradeFaqItemToDetails(item);
    });

  document.querySelectorAll("details.blog-faq__item[open]").forEach(function (item) {
    item.removeAttribute("open");
  });
}

function initBlogMobileTextRhythm() {
  var root = document.querySelector(".blog-main.blog-prose");
  if (!root || window.innerWidth >= 768) return;

  root.querySelectorAll("section").forEach(function (section) {
    var paragraphs = section.querySelectorAll(":scope > p.text-slate-700.leading-relaxed");
    if (paragraphs.length < 3) return;

    var wrap = document.createElement("div");
    wrap.className = "blog-text-chunks";

    paragraphs[0].parentNode.insertBefore(wrap, paragraphs[0]);
    paragraphs.forEach(function (p) {
      wrap.appendChild(p);
    });
  });
}

function initBlogDataTableLabels() {
  var root = document.querySelector(".blog-main.blog-prose") || document;
  root.querySelectorAll("table.blog-data-table").forEach(function (table) {
    if (table.getAttribute("data-labels-ready") === "1") return;
    var headerRow = table.querySelector("thead tr");
    if (!headerRow) return;

    var labels = [];
    headerRow.querySelectorAll("th").forEach(function (th) {
      labels.push(String(th.textContent || "").replace(/\s+/g, " ").trim());
    });
    if (!labels.length) return;

    table.querySelectorAll("tbody tr").forEach(function (row) {
      row.querySelectorAll("td").forEach(function (td, index) {
        if (index >= labels.length || !labels[index]) return;
        if (!td.getAttribute("data-label")) {
          td.setAttribute("data-label", labels[index]);
        }
      });
    });

    table.setAttribute("data-labels-ready", "1");
  });
}

function initBlogArticleUI(slug) {
  renderBlogAuthorCard("blog-article-author-slot");
  initBlogLikeButton(slug);
  initBlogFaqAccordion();
  initBlogDataTableLabels();
  initBlogScrollReveal();
  initBlogBackToTop();
  initBlogMobileTextRhythm();
}

window.initBlogArticleUI = initBlogArticleUI;
window.initBlogFaqAccordion = initBlogFaqAccordion;
window.initBlogDataTableLabels = initBlogDataTableLabels;
