/**
 * 專題文章：捲動顯示動畫、回到頂部、手機閱讀節奏
 */
var BLOG_AUTHOR = {
  name: "Mr.Bill",
  bio: "無論你是學生、上班族、創作者，或是想學習 AI 與數位技能的新手，都希望能在這裡找到對你有幫助的內容。"
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
  var existing = document.getElementById("blog-back-to-top");
  if (existing) return existing;

  var btn = document.createElement("button");
  btn.type = "button";
  btn.id = "blog-back-to-top";
  btn.className = "blog-top-btn";
  btn.setAttribute("aria-label", "回到頁首");
  btn.innerHTML =
    '<span class="blog-top-btn__icon" aria-hidden="true"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg></span><span class="blog-top-btn__text">TOP</span>';

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: blogArticlePrefersReducedMotion() ? "auto" : "smooth" });
  });

  document.body.appendChild(btn);

  var toggle = function () {
    if (window.scrollY > 360) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
  return btn;
}

function renderBlogAuthorCard(mountId) {
  var mount = document.getElementById(mountId || "blog-article-author-slot");
  if (!mount) return;

  mount.innerHTML =
    '<section class="blog-author-card blog-reveal" id="blog-author" aria-labelledby="blog-author-name">' +
    '<div class="blog-author-card__avatar" aria-hidden="true">MB</div>' +
    '<div class="blog-author-card__body">' +
    '<p class="blog-author-card__label">關於作者</p>' +
    '<p class="blog-author-card__name" id="blog-author-name">' +
    escapeBlogHtml(BLOG_AUTHOR.name) +
    "</p>" +
    '<p class="blog-author-card__bio">' +
    escapeBlogHtml(BLOG_AUTHOR.bio) +
    "</p>" +
    "</div></section>";
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
  initBlogScrollReveal();
  initBlogBackToTop();
  initBlogMobileTextRhythm();
}

window.initBlogArticleUI = initBlogArticleUI;
