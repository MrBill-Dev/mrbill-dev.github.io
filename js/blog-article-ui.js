/**
 * 專題文章：捲動顯示動畫、回到頂部、手機閱讀節奏
 */
var BLOG_AUTHOR = {
  name: "Mr.Bill",
  tagline: "前端維護者，也是這個站的建置與維護者",
  intro:
    "我目前以網頁前端維護為主；本站是我個人經營，用來整理 AI、前端與數位工作流的實作筆記。",
  current:
    "持續在前端維護工作中累積實務，並把 AI 導入與應用規劃作為深化方向，透過這個站分享可參考的作法與踩坑經驗。",
  moreLabel: "學歷與相關經歷",
  background:
    "國立海山高工機械製圖科、萬能科技大學紡織系纖維科技組；後續曾涉獵網頁／UI 設計、網站企劃與行銷、視覺與 3D、工業設計，以及機構、硬體與 PHP 等實作領域。",
  tags: ["網頁", "UI", "行銷", "視覺", "3D", "工業設計", "工程", "PHP", "AI 應用"]
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

function renderBlogAuthorCard(mountId) {
  var mount = document.getElementById(mountId || "blog-article-author-slot");
  if (!mount) return;

  var author = BLOG_AUTHOR || {};
  var html =
    '<section class="blog-author-card blog-reveal" id="blog-author" aria-labelledby="blog-author-name">' +
    '<div class="blog-author-card__avatar" aria-hidden="true">MB</div>' +
    '<div class="blog-author-card__body">' +
    '<p class="blog-author-card__label">關於作者</p>' +
    '<p class="blog-author-card__name" id="blog-author-name">' +
    blogAuthorEscape(author.name) +
    "</p>";

  if (author.tagline) {
    html +=
      '<p class="blog-author-card__tagline">' + blogAuthorEscape(author.tagline) + "</p>";
  }
  if (author.intro) {
    html += '<p class="blog-author-card__bio">' + blogAuthorEscape(author.intro) + "</p>";
  }
  if (author.current) {
    html +=
      '<div class="blog-author-card__section blog-author-card__section--current">' +
      '<p class="blog-author-card__section-label">目前</p>' +
      '<p class="blog-author-card__section-text">' +
      blogAuthorEscape(author.current) +
      "</p></div>";
  }
  if (author.background || (author.tags && author.tags.length)) {
    html +=
      '<details class="blog-author-card__more">' +
      '<summary class="blog-author-card__more-toggle">' +
      blogAuthorEscape(author.moreLabel || "更多背景") +
      "</summary>" +
      '<div class="blog-author-card__more-body">';
    if (author.background) {
      html +=
        '<p class="blog-author-card__section-text">' +
        blogAuthorEscape(author.background) +
        "</p>";
    }
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

  html += "</div></section>";
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
