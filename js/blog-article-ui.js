/**
 * 專題文章：捲動顯示動畫、回到頂部、手機閱讀節奏
 */
var BLOG_AUTHOR = {
  name: "Mr.Bill",
  avatar: "assets/mrbill-author-avatar.png",
  motto: "無論你是學生、上班族或創作者，\n願你在這裡找到能帶著走、對自己有幫助的內容。",
  tagline: "十多年網頁前端實務 · 本站 SEO/GEO 落地 · AI 應用深化",
  intro:
    "做網頁前端超過十年，從切版、RWD、互動元件到改版維護與上線後調校都實際做過。本站是我個人經營：除了維護心得，也把自己在本站跑通、可對照工具驗證的 SEO／GEO 做法，以及 prompt、工作流、AI 與網站整合等較深一層的試做，整理成「真的做過、踩過坑」的紀錄。",
  moreLabel: "更多背景與專長",
  details: [
    {
      label: "學歷",
      text: "國立海山高工機械製圖科；萬能科技大學紡織系纖維科技組。"
    },
    {
      label: "前端與網站",
      text:
        "網頁設計與維護、UI、RWD 切版、網站企劃與行銷。技術面橫跨 ASP、ASP.NET、PHP 後台整合，以及 JavaScript、jQuery、Vue 等前端實作——從早期全站維護到現行改版都實際做過。"
    },
    {
      label: "SEO / GEO 實務",
      text:
        "在本站完成並驗證一輪可複製流程：分頁 title 與 description、Article／FAQ 結構化資料、canonical、動態 sitemap、OG 分享預覽，以及面向 AI 摘要與生成式搜尋的內容結構（段落層次、FAQ、實作案例、內鏈叢集）。可在 Search Console 與 Meta 分享偵錯工具對照——不是只改 meta 而不追收錄與分享結果。"
    },
    {
      label: "AI 應用與技術",
      text:
        "不只停留在「會用 ChatGPT 問問題」，也在做 prompt 分級、多步工作流、與前端／CMS 的整合規劃——例如內容產出、批改輔助、互動元件試做。文章會盡量寫到步驟、限制與可改參數，方便你依自己的情境重跑，而不是只貼指令範本。"
    },
    {
      label: "設計與工程",
      text: "美術視覺、3D 角色、工業設計、機構與硬體工程。"
    },
    {
      label: "影像創作",
      text: "微電影製作與婚禮攝影；從取景構圖、敘事節奏到後期調色，與網頁視覺、UI 的工作有相通的審美與執行經驗。"
    },
    {
      label: "現階段",
      text: "前端維護仍是主要工作；其餘時間投入本站 SEO/GEO 優化、AI 工作流試做與文章整理，把做完、驗過、能帶著走的做法公開出來。"
    }
  ],
  tags: [
    "前端維護",
    "JavaScript",
    "Vue",
    "jQuery",
    "PHP",
    "ASP.NET",
    "RWD",
    "UI",
    "SEO",
    "GEO",
    "JSON-LD",
    "AI 工作流",
    "Prompt",
    "微電影",
    "婚禮攝影"
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

function ensureAuthorMottoFont() {
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
  if (author.motto) ensureAuthorMottoFont();
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
      '<p class="blog-author-card__tagline">' + blogAuthorEscape(author.tagline) + "</p>";
  }

  html += "</div><div class=\"blog-author-card__main\">";

  if (author.motto) {
    var mottoHtml = blogAuthorEscape(author.motto).replace(/\n/g, "<br />");
    html +=
      '<p class="blog-author-card__motto">' + mottoHtml + "</p>";
  }
  if (author.intro) {
    html += '<p class="blog-author-card__bio">' + blogAuthorEscape(author.intro) + "</p>";
  }
  var detailItems = author.details || [];
  if (!detailItems.length && author.background) {
    detailItems = [{ label: "", text: author.background }];
  }
  if (detailItems.length || (author.tags && author.tags.length)) {
    html +=
      '<details class="blog-author-card__more">' +
      '<summary class="blog-author-card__more-toggle">' +
      blogAuthorEscape(author.moreLabel || "更多背景") +
      "</summary>" +
      '<div class="blog-author-card__more-body">';
    detailItems.forEach(function (item) {
      html += '<div class="blog-author-card__detail">';
      if (item.label) {
        html +=
          '<p class="blog-author-card__section-label">' +
          blogAuthorEscape(item.label) +
          "</p>";
      }
      html +=
        '<p class="blog-author-card__section-text">' +
        blogAuthorEscape(item.text) +
        "</p></div>";
    });
    if (author.tags && author.tags.length) {
      html += '<div class="blog-author-card__tags" aria-label="相關領域">';
      author.tags.forEach(function (tag) {
        html +=
          '<span class="blog-author-card__tag">' + blogAuthorEscape(tag) + "</span>";
      });
      html += "</div>";
    }
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

function initBlogArticleUI(slug) {
  renderBlogAuthorCard("blog-article-author-slot");
  initBlogLikeButton(slug);
  initBlogFaqAccordion();
  initBlogScrollReveal();
  initBlogBackToTop();
  initBlogMobileTextRhythm();
}

window.initBlogArticleUI = initBlogArticleUI;
window.initBlogFaqAccordion = initBlogFaqAccordion;
