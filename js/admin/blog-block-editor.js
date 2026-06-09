/**
 * 區塊式正文編輯 → 編譯為與 blog-content-snippets / 靜態文相同的 HTML
 */
(function () {
  var SECTION_SHELL =
    "scroll-mt-28 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4";
  var PILLAR_COLORS = ["indigo", "violet", "cyan", "amber"];

  var BLOCK_TYPE_LABELS = {
    intro: "開場章節",
    section: "白底章節卡",
    faq: "常見問題 FAQ",
    bridge: "章節轉場",
    callout: "重點提示框",
    compare: "前後對照",
    code: "程式碼／Prompt",
    image: "內文圖片",
    lesson: "課程重點帶",
    pillars: "四欄重點卡"
  };

  function uid() {
    return "b" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function textOf(el) {
    return el ? (el.textContent || "").trim() : "";
  }

  function defaultBlocks() {
    return [
      {
        type: "intro",
        id: uid(),
        kicker: "👨‍🏫 段落標籤（選填）",
        title: "開場標題",
        audience: "讀者對象說明。",
        paragraphs: ["第一段正文。", "第二段正文。"]
      },
      {
        type: "section",
        id: uid(),
        title: "第二章節",
        paragraphs: ["章節正文…"]
      }
    ];
  }

  function createBlock(type) {
    if (type === "intro") {
      return {
        type: "intro",
        id: uid(),
        kicker: "👨‍🏫 段落標籤",
        title: "章節標題",
        audience: "",
        paragraphs: [""]
      };
    }
    if (type === "section") {
      return { type: "section", id: uid(), title: "章節標題", paragraphs: [""] };
    }
    if (type === "faq") {
      return {
        type: "faq",
        id: uid(),
        title: "常見問題",
        items: [
          { q: "第一個問題？", a: "第一個答案。" },
          { q: "第二個問題？", a: "第二個答案。" }
        ]
      };
    }
    if (type === "bridge") {
      return {
        type: "bridge",
        id: uid(),
        title: "章節轉場標題",
        desc: "轉場說明一句話"
      };
    }
    if (type === "callout") {
      return {
        type: "callout",
        id: uid(),
        title: "重點提示",
        body: "補充說明…"
      };
    }
    if (type === "compare") {
      return {
        type: "compare",
        id: uid(),
        weakLabel: "❌ 不好的做法",
        weakText: "範例文字",
        divider: "↓ 改進後",
        strongLabel: "✅ 較好的做法",
        strongText: "改進後範例"
      };
    }
    if (type === "code") {
      return { type: "code", id: uid(), content: "程式碼或 Prompt 範例" };
    }
    if (type === "image") {
      return {
        type: "image",
        id: uid(),
        src: "assets/你的圖片.jpg",
        alt: "圖片說明"
      };
    }
    if (type === "lesson") {
      return {
        type: "lesson",
        id: uid(),
        variant: "slate",
        label: "Lesson 01",
        title: "這一課的核心問題",
        lead: "用一句話帶出重點。"
      };
    }
    if (type === "pillars") {
      return {
        type: "pillars",
        id: uid(),
        items: [
          { title: "背景", desc: "AI 要先知道這件事的情境。" },
          { title: "規則", desc: "AI 要知道什麼可以做，什麼不能做。" },
          { title: "流程", desc: "AI 要知道先做什麼、後做什麼。" },
          { title: "檢查", desc: "最後要知道怎樣才算完成。" }
        ]
      };
    }
    return null;
  }

  function compileParagraphs(paragraphs) {
    var lines = (paragraphs || []).filter(function (p) {
      return String(p).trim();
    });
    if (!lines.length) lines = [""];
    if (lines.length === 1) {
      return (
        '  <p class="text-slate-700 leading-relaxed">' +
        escapeHtml(lines[0]) +
        "</p>\n"
      );
    }
    var inner = lines
      .map(function (p) {
        return (
          '    <p class="text-slate-700 leading-relaxed">' + escapeHtml(p) + "</p>"
        );
      })
      .join("\n");
    return '  <div class="blog-text-chunks">\n' + inner + "\n  </div>\n";
  }

  function compileIntro(block) {
    var idAttr = block.isFirstIntro !== false ? ' id="blog-intro"' : "";
    var kicker = block.kicker
      ? '  <p class="text-sm font-bold text-indigo-600">' +
        escapeHtml(block.kicker) +
        "</p>\n"
      : "";
    var audience = block.audience
      ? '  <p class="text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 leading-relaxed"><strong class="text-slate-800">適合誰：</strong>' +
        escapeHtml(block.audience) +
        "</p>\n"
      : "";
    return (
      "<section" +
      idAttr +
      ' class="' +
      SECTION_SHELL +
      '">\n' +
      kicker +
      '  <h2 class="text-2xl font-black text-slate-900">' +
      escapeHtml(block.title || "章節標題") +
      "</h2>\n" +
      audience +
      compileParagraphs(block.paragraphs) +
      "</section>"
    );
  }

  function compileSection(block) {
    return (
      '<section class="' +
      SECTION_SHELL +
      '">\n' +
      '  <h2 class="text-2xl font-black text-slate-900">' +
      escapeHtml(block.title || "章節標題") +
      "</h2>\n" +
      compileParagraphs(block.paragraphs) +
      "</section>"
    );
  }

  function compileFaq(block) {
    var items = (block.items || []).length
      ? block.items
      : [{ q: "問題？", a: "答案。" }];
    var details = items
      .map(function (item) {
        return (
          '  <details class="blog-faq__item">\n' +
          "    <summary>" +
          escapeHtml(item.q || "問題？") +
          "</summary>\n" +
          '    <p class="blog-faq__a text-slate-700 leading-relaxed">' +
          escapeHtml(item.a || "") +
          "</p>\n" +
          "  </details>"
        );
      })
      .join("\n");
    return (
      '<section id="blog-faq" class="blog-faq scroll-mt-28 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4">\n' +
      '  <h2 class="text-2xl font-black text-slate-900">' +
      escapeHtml(block.title || "常見問題") +
      "</h2>\n" +
      details +
      "\n</section>"
    );
  }

  function compileBridge(block) {
    return (
      '<section class="blog-bridge scroll-mt-28">\n' +
      '  <p class="blog-bridge__title">' +
      escapeHtml(block.title || "") +
      "</p>\n" +
      '  <p class="blog-bridge__desc">' +
      escapeHtml(block.desc || "") +
      "</p>\n</section>"
    );
  }

  function compileCallout(block) {
    return (
      '<div class="rounded-2xl bg-indigo-50 border border-indigo-100 p-5">\n' +
      '  <p class="font-bold text-indigo-900">' +
      escapeHtml(block.title || "重點提示") +
      "</p>\n" +
      '  <p class="text-sm text-slate-600 mt-2">' +
      escapeHtml(block.body || "") +
      "</p>\n</div>"
    );
  }

  function compileCompare(block) {
    return (
      '<div class="blog-compare-stack">\n' +
      "  <div>\n" +
      '    <p class="blog-compare-stack__label blog-compare-stack__label--weak">' +
      escapeHtml(block.weakLabel || "❌ 不好的做法") +
      "</p>\n" +
      '    <div class="blog-code-block">' +
      escapeHtml(block.weakText || "") +
      "</div>\n" +
      "  </div>\n" +
      '  <p class="blog-compare-divider" aria-hidden="true">' +
      escapeHtml(block.divider || "↓ 改進後") +
      "</p>\n" +
      "  <div>\n" +
      '    <p class="blog-compare-stack__label blog-compare-stack__label--strong">' +
      escapeHtml(block.strongLabel || "✅ 較好的做法") +
      "</p>\n" +
      '    <div class="blog-code-block blog-pre">' +
      escapeHtml(block.strongText || "") +
      "</div>\n" +
      "  </div>\n</div>"
    );
  }

  function compileCode(block) {
    return (
      '<pre class="blog-pre rounded-xl bg-slate-100 border border-slate-200 p-4 text-sm text-slate-800">' +
      escapeHtml(block.content || "") +
      "</pre>"
    );
  }

  function compileImage(block) {
    var src = String(block.src || "").trim() || "assets/你的圖片.jpg";
    return (
      '<img src="' +
      escapeHtml(src) +
      '" alt="' +
      escapeHtml(block.alt || "") +
      '" class="w-full rounded-2xl object-cover border border-slate-200" loading="lazy" />'
    );
  }

  function compileLesson(block) {
    var variant = block.variant === "sky" ? "sky" : "slate";
    return (
      '<section class="' +
      SECTION_SHELL +
      '">\n' +
      '  <div class="blog-lesson-band blog-lesson-band--' +
      variant +
      '">\n' +
      '    <p class="blog-lesson-band__label">' +
      escapeHtml(block.label || "") +
      "</p>\n" +
      "    <h2>" +
      escapeHtml(block.title || "") +
      "</h2>\n" +
      '    <p class="blog-lesson-band__lead">' +
      escapeHtml(block.lead || "") +
      "</p>\n" +
      "  </div>\n</section>"
    );
  }

  function compilePillars(block) {
    var items = (block.items || []).length
      ? block.items
      : [{ title: "重點一", desc: "說明…" }];
    var cards = items
      .map(function (item, i) {
        var color = PILLAR_COLORS[i % PILLAR_COLORS.length];
        return (
          '  <article class="blog-pillar-card">\n' +
          '    <span class="blog-icon blog-icon--' +
          color +
          ' blog-icon--num" aria-hidden="true">' +
          (i + 1) +
          "</span>\n" +
          '    <div class="blog-pillar-card__body">\n' +
          '      <h3 class="blog-pillar-card__title">' +
          escapeHtml(item.title || "") +
          "</h3>\n" +
          '      <p class="blog-pillar-card__desc">' +
          escapeHtml(item.desc || "") +
          "</p>\n" +
          "    </div>\n" +
          "  </article>"
        );
      })
      .join("\n");
    return (
      '<section class="' +
      SECTION_SHELL +
      '">\n' +
      '  <div class="blog-pillar-grid pt-2">\n' +
      cards +
      "\n  </div>\n</section>"
    );
  }

  function compileBlocks(blocks) {
    var compilers = {
      intro: compileIntro,
      section: compileSection,
      faq: compileFaq,
      bridge: compileBridge,
      callout: compileCallout,
      compare: compileCompare,
      code: compileCode,
      image: compileImage,
      lesson: compileLesson,
      pillars: compilePillars
    };
    return (blocks || [])
      .map(function (block, i) {
        if (block.type === "intro") {
          block.isFirstIntro =
            i === 0 ||
            blocks.slice(0, i).every(function (b) {
              return b.type !== "intro";
            });
        }
        var fn = compilers[block.type];
        return fn ? fn(block) : "";
      })
      .filter(Boolean)
      .join("\n");
  }

  function isFaqSection(el) {
    return (
      el.id === "blog-faq" ||
      (el.classList && el.classList.contains("blog-faq"))
    );
  }

  function isIntroSection(el) {
    return el.id === "blog-intro";
  }

  function parseIntroBlock(el) {
    var kickerEl = el.querySelector("p.text-indigo-600");
    var h2 = el.querySelector("h2");
    var audEl = el.querySelector("p.bg-slate-50");
    var audience = "";
    if (audEl) {
      audience = textOf(audEl).replace(/^適合誰[：:]\s*/, "");
    }
    var paragraphs = [];
    var chunks = el.querySelector(".blog-text-chunks");
    if (chunks) {
      chunks.querySelectorAll("p").forEach(function (p) {
        paragraphs.push(textOf(p));
      });
    } else {
      el.querySelectorAll("p").forEach(function (p) {
        if (p === kickerEl || p === audEl) return;
        if (p.closest("details")) return;
        var cls = p.className || "";
        if (cls.indexOf("text-slate-700") >= 0 || cls.indexOf("leading-relaxed") >= 0) {
          paragraphs.push(textOf(p));
        }
      });
    }
    return {
      type: "intro",
      id: uid(),
      kicker: textOf(kickerEl),
      title: textOf(h2) || "章節標題",
      audience: audience,
      paragraphs: paragraphs.length ? paragraphs : [""]
    };
  }

  function parseBridgeBlock(el) {
    return {
      type: "bridge",
      id: uid(),
      title: textOf(el.querySelector(".blog-bridge__title")) || "章節轉場標題",
      desc: textOf(el.querySelector(".blog-bridge__desc")) || ""
    };
  }

  function parseCalloutBlock(el) {
    var titleEl = el.querySelector(".font-bold, h4, p.font-bold");
    var bodyEl = el.querySelector(".text-slate-600, p.text-sm");
    return {
      type: "callout",
      id: uid(),
      title: textOf(titleEl) || "重點提示",
      body: textOf(bodyEl) || ""
    };
  }

  function parseCompareBlock(el) {
    var weak = el.querySelector(".blog-compare-stack__label--weak");
    var strong = el.querySelector(".blog-compare-stack__label--strong");
    var weakBox = weak ? weak.parentElement : null;
    var strongBox = strong ? strong.parentElement : null;
    return {
      type: "compare",
      id: uid(),
      weakLabel: textOf(weak) || "❌ 不好的做法",
      weakText: textOf(
        weakBox ? weakBox.querySelector(".blog-code-block") : null
      ),
      divider: textOf(el.querySelector(".blog-compare-divider")) || "↓ 改進後",
      strongLabel: textOf(strong) || "✅ 較好的做法",
      strongText: textOf(
        strongBox ? strongBox.querySelector(".blog-code-block") : null
      )
    };
  }

  function parseCodeBlock(el) {
    return {
      type: "code",
      id: uid(),
      content: textOf(el) || ""
    };
  }

  function parseImageBlock(el) {
    return {
      type: "image",
      id: uid(),
      src: el.getAttribute("src") || "",
      alt: el.getAttribute("alt") || ""
    };
  }

  function parseLessonBlock(el) {
    var band = el.querySelector(".blog-lesson-band");
    if (!band) return null;
    var variant = (band.className || "").indexOf("--sky") >= 0 ? "sky" : "slate";
    return {
      type: "lesson",
      id: uid(),
      variant: variant,
      label: textOf(band.querySelector(".blog-lesson-band__label")),
      title: textOf(band.querySelector("h2")),
      lead: textOf(band.querySelector(".blog-lesson-band__lead"))
    };
  }

  function parsePillarsBlock(el) {
    var items = [];
    el.querySelectorAll(".blog-pillar-card").forEach(function (card) {
      items.push({
        title: textOf(card.querySelector(".blog-pillar-card__title")),
        desc: textOf(card.querySelector(".blog-pillar-card__desc"))
      });
    });
    return {
      type: "pillars",
      id: uid(),
      items: items.length ? items : [{ title: "重點", desc: "" }]
    };
  }

  function isLessonOnlySection(el) {
    var band = el.querySelector(":scope > .blog-lesson-band");
    if (!band) return false;
    return el.children.length === 1;
  }

  function isPillarSection(el) {
    return !!el.querySelector(".blog-pillar-grid") && !el.querySelector(":scope > h2");
  }

  function parseSectionBlock(el) {
    if (el.querySelector(".blog-lesson-band") || el.querySelector(".blog-pillar-grid")) {
      return null;
    }
    var h2 = el.querySelector(":scope > h2, h2");
    var paragraphs = [];
    var chunks = el.querySelector(".blog-text-chunks");
    if (chunks) {
      chunks.querySelectorAll("p").forEach(function (p) {
        paragraphs.push(textOf(p));
      });
    } else {
      el.querySelectorAll("p").forEach(function (p) {
        if (p.closest("details")) return;
        var cls = p.className || "";
        if (cls.indexOf("text-slate-700") >= 0 || cls.indexOf("leading-relaxed") >= 0) {
          paragraphs.push(textOf(p));
        }
      });
    }
    return {
      type: "section",
      id: uid(),
      title: textOf(h2) || "章節標題",
      paragraphs: paragraphs.length ? paragraphs : [""]
    };
  }

  function parseFaqBlock(el) {
    var h2 = el.querySelector("h2");
    var items = [];
    el.querySelectorAll("details.blog-faq__item").forEach(function (d) {
      items.push({
        q: textOf(d.querySelector("summary")) || "問題？",
        a: textOf(d.querySelector(".blog-faq__a") || d.querySelector("p")) || ""
      });
    });
    return {
      type: "faq",
      id: uid(),
      title: textOf(h2) || "常見問題",
      items: items.length ? items : [{ q: "問題？", a: "答案。" }]
    };
  }

  function parseElementToBlock(el) {
    if (!el || el.nodeType !== 1) return null;
    var tag = el.tagName.toLowerCase();

    if (tag === "section") {
      if (isFaqSection(el)) return parseFaqBlock(el);
      if (isIntroSection(el)) return parseIntroBlock(el);
      if (el.classList.contains("blog-bridge")) return parseBridgeBlock(el);
      if (isLessonOnlySection(el)) return parseLessonBlock(el);
      if (isPillarSection(el)) return parsePillarsBlock(el);
      var sectionBlock = parseSectionBlock(el);
      if (sectionBlock) return sectionBlock;
      return null;
    }

    if (tag === "div") {
      if (el.classList.contains("blog-compare-stack")) return parseCompareBlock(el);
      if (
        el.classList.contains("blog-callout") ||
        (el.className || "").indexOf("bg-indigo-50") >= 0
      ) {
        return parseCalloutBlock(el);
      }
    }

    if (tag === "pre") return parseCodeBlock(el);
    if (tag === "img") return parseImageBlock(el);

    return null;
  }

  function parseHtmlToBlocks(html) {
    html = String(html || "").trim();
    if (!html) return { ok: true, blocks: defaultBlocks() };

    var doc = new DOMParser().parseFromString(
      '<div id="mrbill-block-root">' + html + "</div>",
      "text/html"
    );
    var root = doc.getElementById("mrbill-block-root");
    if (!root) {
      return { ok: false, blocks: [], message: "HTML 解析失敗" };
    }

    var blocks = [];
    for (var i = 0; i < root.children.length; i++) {
      var block = parseElementToBlock(root.children[i]);
      if (!block) {
        return {
          ok: false,
          blocks: [],
          message:
            "正文含有尚未支援的區塊（例如深色面板、領域卡、引言帶等複合版型）。請改用「HTML 進階」編輯。"
        };
      }
      blocks.push(block);
    }

    if (!blocks.length) return { ok: true, blocks: defaultBlocks() };
    return { ok: true, blocks: blocks };
  }

  function buildPreviewSrcdoc(bodyHtml, titleFont) {
    var bodyClass =
      titleFont === "serif" ? "blog-title-font-serif" : "blog-title-font-sans";
    return (
      "<!DOCTYPE html><html lang=\"zh-Hant\"><head><meta charset=\"UTF-8\">" +
      "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">" +
      "<script src=\"https://cdn.tailwindcss.com\"><\/script>" +
      "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">" +
      "<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>" +
      (titleFont === "serif"
        ? "<link href=\"https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@600;700;900&display=swap\" rel=\"stylesheet\">"
        : "") +
      "<link rel=\"stylesheet\" href=\"css/blog-layout.css?v=title-font-scope-2\">" +
      "<style>body{margin:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,\"Noto Sans TC\",sans-serif}" +
      ".blog-main.blog-prose{max-width:42rem;margin:0 auto;padding:1rem 1rem 2rem}</style>" +
      "</head><body class=\"" +
      bodyClass +
      "\"><article class=\"blog-main blog-prose space-y-6\">" +
      bodyHtml +
      "</article></body></html>"
    );
  }

  function init(options) {
    options = options || {};
    var state = {
      mode: "blocks",
      blocks: defaultBlocks(),
      parseWarning: ""
    };

    var textarea = options.textarea;
    var blockListEl = options.blockListEl;
    var previewIframe = options.previewIframe;
    var blockPanel = options.blockPanel;
    var htmlPanel = options.htmlPanel;
    var modeBlocksBtn = options.modeBlocksBtn;
    var modeHtmlBtn = options.modeHtmlBtn;
    var addBlockSelect = options.addBlockSelect;
    var previewTimer = null;

    function getTitleFont() {
      return options.getTitleFont ? options.getTitleFont() : "sans";
    }

    function syncToTextarea() {
      if (!textarea) return;
      if (state.mode === "blocks") {
        textarea.value = compileBlocks(state.blocks);
      }
    }

    function updatePreview() {
      if (!previewIframe) return;
      var html =
        state.mode === "blocks"
          ? compileBlocks(state.blocks)
          : textarea
            ? textarea.value
            : "";
      previewIframe.srcdoc = buildPreviewSrcdoc(html, getTitleFont());
    }

    function schedulePreview() {
      if (previewTimer) clearTimeout(previewTimer);
      previewTimer = setTimeout(updatePreview, 200);
    }

    function syncAndPreview() {
      syncToTextarea();
      schedulePreview();
      if (options.onChange) options.onChange();
    }

    function setMode(mode) {
      if (mode === "blocks" && state.mode === "html" && textarea) {
        var parsed = parseHtmlToBlocks(textarea.value);
        if (!parsed.ok) {
          window.alert(parsed.message || "無法轉為區塊模式");
          return;
        }
        state.blocks = parsed.blocks;
        state.parseWarning = "";
      }
      if (mode === "html" && state.mode === "blocks") {
        syncToTextarea();
      }
      state.mode = mode;
      if (blockPanel) blockPanel.classList.toggle("hidden", mode !== "blocks");
      if (htmlPanel) htmlPanel.classList.toggle("hidden", mode !== "html");
      if (modeBlocksBtn) modeBlocksBtn.classList.toggle("is-active", mode === "blocks");
      if (modeHtmlBtn) modeHtmlBtn.classList.toggle("is-active", mode === "html");
      if (mode === "blocks") renderBlocks();
      schedulePreview();
    }

    function moveBlock(id, dir) {
      var idx = -1;
      for (var i = 0; i < state.blocks.length; i++) {
        if (state.blocks[i].id === id) {
          idx = i;
          break;
        }
      }
      if (idx < 0) return;
      var next = idx + dir;
      if (next < 0 || next >= state.blocks.length) return;
      var tmp = state.blocks[idx];
      state.blocks[idx] = state.blocks[next];
      state.blocks[next] = tmp;
      renderBlocks();
      syncAndPreview();
    }

    function removeBlock(id) {
      if (state.blocks.length <= 1) {
        window.alert("至少保留一個區塊");
        return;
      }
      if (!window.confirm("刪除此區塊？")) return;
      state.blocks = state.blocks.filter(function (b) {
        return b.id !== id;
      });
      renderBlocks();
      syncAndPreview();
    }

    function blockSummary(block) {
      if (block.type === "bridge") return block.title;
      if (block.type === "callout") return block.title;
      if (block.type === "compare") return block.weakLabel;
      if (block.type === "code") {
        return String(block.content || "").slice(0, 24) || "程式碼";
      }
      if (block.type === "image") return block.alt || block.src;
      if (block.type === "lesson") return block.title;
      if (block.type === "pillars" && block.items && block.items[0]) {
        return block.items[0].title + "…";
      }
      return block.title || "（未命名）";
    }

    function renderBlockFields(block) {
      var typeLabel = BLOCK_TYPE_LABELS[block.type] || block.type;
      var fields = "";
      if (block.type === "intro" || block.type === "section") {
        if (block.type === "intro") {
          fields +=
            '<label class="admin-block-field"><span>段落標籤</span><input type="text" data-block-id="' +
            escapeHtml(block.id) +
            '" data-field="kicker" value="' +
            escapeHtml(block.kicker) +
            '"></label>';
        }
        fields +=
          '<label class="admin-block-field"><span>章節標題</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="title" value="' +
          escapeHtml(block.title) +
          '"></label>';
        if (block.type === "intro") {
          fields +=
            '<label class="admin-block-field"><span>適合誰</span><input type="text" data-block-id="' +
            escapeHtml(block.id) +
            '" data-field="audience" value="' +
            escapeHtml(block.audience) +
            '"></label>';
        }
        fields += '<div class="admin-block-paragraphs" data-block-id="' + escapeHtml(block.id) + '">';
        (block.paragraphs || []).forEach(function (p, pi) {
          fields +=
            '<label class="admin-block-field"><span>段落 ' +
            (pi + 1) +
            '</span><textarea rows="3" data-block-id="' +
            escapeHtml(block.id) +
            '" data-field="paragraph" data-index="' +
            pi +
            '">' +
            escapeHtml(p) +
            "</textarea></label>";
        });
        fields +=
          '<button type="button" class="admin-block-mini-btn" data-action="add-para" data-block-id="' +
          escapeHtml(block.id) +
          '">＋ 加一段</button></div>';
      }

      if (block.type === "faq") {
        fields +=
          '<label class="admin-block-field"><span>區塊標題</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="title" value="' +
          escapeHtml(block.title) +
          '"></label>';
        fields += '<div class="admin-block-faq-items" data-block-id="' + escapeHtml(block.id) + '">';
        (block.items || []).forEach(function (item, ii) {
          fields +=
            '<div class="admin-block-faq-item"><p class="admin-block-faq-item__label">Q' +
            (ii + 1) +
            "</p>" +
            '<input type="text" placeholder="問題" data-block-id="' +
            escapeHtml(block.id) +
            '" data-field="faq-q" data-index="' +
            ii +
            '" value="' +
            escapeHtml(item.q) +
            '">' +
            '<textarea rows="2" placeholder="答案" data-block-id="' +
            escapeHtml(block.id) +
            '" data-field="faq-a" data-index="' +
            ii +
            '">' +
            escapeHtml(item.a) +
            "</textarea></div>";
        });
        fields +=
          '<button type="button" class="admin-block-mini-btn" data-action="add-faq" data-block-id="' +
          escapeHtml(block.id) +
          '">＋ 加一題</button></div>';
      }

      if (block.type === "bridge") {
        fields +=
          '<label class="admin-block-field"><span>轉場標題</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="title" value="' +
          escapeHtml(block.title) +
          '"></label>' +
          '<label class="admin-block-field"><span>轉場說明</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="desc" value="' +
          escapeHtml(block.desc) +
          '"></label>';
      }

      if (block.type === "callout") {
        fields +=
          '<label class="admin-block-field"><span>提示標題</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="title" value="' +
          escapeHtml(block.title) +
          '"></label>' +
          '<label class="admin-block-field"><span>說明文字</span><textarea rows="3" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="body">' +
          escapeHtml(block.body) +
          "</textarea></label>";
      }

      if (block.type === "compare") {
        fields +=
          '<label class="admin-block-field"><span>上方標籤</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="weakLabel" value="' +
          escapeHtml(block.weakLabel) +
          '"></label>' +
          '<label class="admin-block-field"><span>上方內容</span><textarea rows="3" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="weakText">' +
          escapeHtml(block.weakText) +
          "</textarea></label>" +
          '<label class="admin-block-field"><span>中間箭頭文字</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="divider" value="' +
          escapeHtml(block.divider) +
          '"></label>' +
          '<label class="admin-block-field"><span>下方標籤</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="strongLabel" value="' +
          escapeHtml(block.strongLabel) +
          '"></label>' +
          '<label class="admin-block-field"><span>下方內容</span><textarea rows="4" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="strongText">' +
          escapeHtml(block.strongText) +
          "</textarea></label>";
      }

      if (block.type === "code") {
        fields +=
          '<label class="admin-block-field"><span>程式碼／Prompt</span><textarea rows="8" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="content" class="font-mono text-sm">' +
          escapeHtml(block.content) +
          "</textarea></label>";
      }

      if (block.type === "image") {
        fields +=
          '<label class="admin-block-field"><span>圖片路徑</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="src" value="' +
          escapeHtml(block.src) +
          '" placeholder="assets/…"></label>' +
          '<label class="admin-block-field"><span>替代文字 alt</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="alt" value="' +
          escapeHtml(block.alt) +
          '"></label>';
      }

      if (block.type === "lesson") {
        fields +=
          '<label class="admin-block-field"><span>色系</span><select data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="variant">' +
          '<option value="slate"' +
          (block.variant === "slate" ? " selected" : "") +
          ">灰藍（Lesson 01 風格）</option>" +
          '<option value="sky"' +
          (block.variant === "sky" ? " selected" : "") +
          ">天藍（Lesson 02 風格）</option></select></label>" +
          '<label class="admin-block-field"><span>小標籤</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="label" value="' +
          escapeHtml(block.label) +
          '"></label>' +
          '<label class="admin-block-field"><span>標題</span><input type="text" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="title" value="' +
          escapeHtml(block.title) +
          '"></label>' +
          '<label class="admin-block-field"><span>導言</span><textarea rows="3" data-block-id="' +
          escapeHtml(block.id) +
          '" data-field="lead">' +
          escapeHtml(block.lead) +
          "</textarea></label>";
      }

      if (block.type === "pillars") {
        fields += '<div class="admin-block-pillar-items" data-block-id="' + escapeHtml(block.id) + '">';
        (block.items || []).forEach(function (item, ii) {
          fields +=
            '<div class="admin-block-faq-item"><p class="admin-block-faq-item__label">卡 ' +
            (ii + 1) +
            "</p>" +
            '<input type="text" placeholder="標題" data-block-id="' +
            escapeHtml(block.id) +
            '" data-field="pillar-title" data-index="' +
            ii +
            '" value="' +
            escapeHtml(item.title) +
            '">' +
            '<textarea rows="2" placeholder="說明" data-block-id="' +
            escapeHtml(block.id) +
            '" data-field="pillar-desc" data-index="' +
            ii +
            '">' +
            escapeHtml(item.desc) +
            "</textarea></div>";
        });
        fields +=
          '<button type="button" class="admin-block-mini-btn" data-action="add-pillar" data-block-id="' +
          escapeHtml(block.id) +
          '">＋ 加一卡</button></div>';
      }

      return (
        '<details class="admin-block-card" open data-block-id="' +
        escapeHtml(block.id) +
        '">' +
        '<summary class="admin-block-card__head">' +
        "<span>" +
        escapeHtml(typeLabel) +
        " · " +
        escapeHtml(blockSummary(block)) +
        "</span>" +
        '<span class="admin-block-card__actions">' +
        '<button type="button" class="admin-block-icon-btn" data-action="up" data-block-id="' +
        escapeHtml(block.id) +
        '" title="上移">↑</button>' +
        '<button type="button" class="admin-block-icon-btn" data-action="down" data-block-id="' +
        escapeHtml(block.id) +
        '" title="下移">↓</button>' +
        '<button type="button" class="admin-block-icon-btn admin-block-icon-btn--danger" data-action="remove" data-block-id="' +
        escapeHtml(block.id) +
        '" title="刪除">×</button>' +
        "</span></summary>" +
        '<div class="admin-block-card__body">' +
        fields +
        "</div></details>"
      );
    }

    function renderBlocks() {
      if (!blockListEl) return;
      if (!state.blocks.length) state.blocks = defaultBlocks();
      blockListEl.innerHTML = state.blocks.map(renderBlockFields).join("");
    }

    function findBlock(id) {
      for (var i = 0; i < state.blocks.length; i++) {
        if (state.blocks[i].id === id) return state.blocks[i];
      }
      return null;
    }

    function onBlockListInput(ev) {
      var t = ev.target;
      var id = t.getAttribute("data-block-id");
      var field = t.getAttribute("data-field");
      var block = findBlock(id);
      if (!block) return;
      var idx = t.getAttribute("data-index");

      if (field === "kicker") block.kicker = t.value;
      else if (field === "title") block.title = t.value;
      else if (field === "audience") block.audience = t.value;
      else if (field === "desc") block.desc = t.value;
      else if (field === "body") block.body = t.value;
      else if (field === "weakLabel") block.weakLabel = t.value;
      else if (field === "weakText") block.weakText = t.value;
      else if (field === "divider") block.divider = t.value;
      else if (field === "strongLabel") block.strongLabel = t.value;
      else if (field === "strongText") block.strongText = t.value;
      else if (field === "content") block.content = t.value;
      else if (field === "src") block.src = t.value;
      else if (field === "alt") block.alt = t.value;
      else if (field === "label") block.label = t.value;
      else if (field === "lead") block.lead = t.value;
      else if (field === "variant") block.variant = t.value;
      else if (field === "paragraph") block.paragraphs[Number(idx)] = t.value;
      else if (field === "faq-q") block.items[Number(idx)].q = t.value;
      else if (field === "faq-a") block.items[Number(idx)].a = t.value;
      else if (field === "pillar-title") block.items[Number(idx)].title = t.value;
      else if (field === "pillar-desc") block.items[Number(idx)].desc = t.value;

      syncAndPreview();
    }

    function onBlockListClick(ev) {
      var btn = ev.target.closest("[data-action]");
      if (!btn) return;
      ev.preventDefault();
      var action = btn.getAttribute("data-action");
      var id = btn.getAttribute("data-block-id");
      var block = findBlock(id);
      if (!block) return;

      if (action === "up") moveBlock(id, -1);
      else if (action === "down") moveBlock(id, 1);
      else if (action === "remove") removeBlock(id);
      else if (action === "add-para") {
        block.paragraphs = block.paragraphs || [];
        block.paragraphs.push("");
        renderBlocks();
        syncAndPreview();
      } else if (action === "add-faq") {
        block.items = block.items || [];
        block.items.push({ q: "新問題？", a: "" });
        renderBlocks();
        syncAndPreview();
      } else if (action === "add-pillar") {
        block.items = block.items || [];
        block.items.push({ title: "新重點", desc: "" });
        renderBlocks();
        syncAndPreview();
      }
    }

    if (blockListEl) {
      blockListEl.addEventListener("input", onBlockListInput);
      blockListEl.addEventListener("change", onBlockListInput);
      blockListEl.addEventListener("click", onBlockListClick);
    }

    if (textarea) {
      textarea.addEventListener("input", function () {
        if (state.mode === "html") schedulePreview();
      });
    }

    if (modeBlocksBtn) modeBlocksBtn.addEventListener("click", function () { setMode("blocks"); });
    if (modeHtmlBtn) modeHtmlBtn.addEventListener("click", function () { setMode("html"); });

    if (addBlockSelect) {
      addBlockSelect.addEventListener("change", function () {
        var type = addBlockSelect.value;
        if (!type) return;
        var block = createBlock(type);
        if (block) {
          state.blocks.push(block);
          renderBlocks();
          syncAndPreview();
        }
        addBlockSelect.value = "";
      });
    }

    function resetToDefault() {
      state.blocks = defaultBlocks();
      state.mode = "blocks";
      setMode("blocks");
      syncAndPreview();
    }

    renderBlocks();
    syncAndPreview();
    setMode("blocks");

    var api = {
      getMode: function () { return state.mode; },
      syncToTextarea: syncToTextarea,
      resetToDefault: resetToDefault,
      loadFromHtml: function (html) {
        html = String(html || "").trim();
        if (!html) {
          resetToDefault();
          return;
        }
        var parsed = parseHtmlToBlocks(html);
        if (parsed.ok) {
          state.blocks = parsed.blocks;
          if (textarea) textarea.value = compileBlocks(state.blocks);
          state.mode = "blocks";
          if (blockPanel) blockPanel.classList.remove("hidden");
          if (htmlPanel) htmlPanel.classList.add("hidden");
          if (modeBlocksBtn) modeBlocksBtn.classList.add("is-active");
          if (modeHtmlBtn) modeHtmlBtn.classList.remove("is-active");
          renderBlocks();
        } else {
          state.mode = "html";
          if (textarea) textarea.value = html;
          if (blockPanel) blockPanel.classList.add("hidden");
          if (htmlPanel) htmlPanel.classList.remove("hidden");
          if (modeBlocksBtn) modeBlocksBtn.classList.remove("is-active");
          if (modeHtmlBtn) modeHtmlBtn.classList.add("is-active");
        }
        schedulePreview();
      },
      appendFromHtml: function (html) {
        var parsed = parseHtmlToBlocks(html);
        if (!parsed.ok) return { ok: false, message: parsed.message };
        state.blocks = state.blocks.concat(parsed.blocks);
        if (state.mode !== "blocks") setMode("blocks");
        else {
          renderBlocks();
          syncAndPreview();
        }
        return { ok: true };
      },
      refreshPreview: schedulePreview
    };

    return api;
  }

  window.MRBILL_BLOG_BLOCK_EDITOR = {
    defaultBlocks: defaultBlocks,
    compileBlocks: compileBlocks,
    parseHtmlToBlocks: parseHtmlToBlocks,
    init: init
  };
})();
