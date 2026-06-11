(function () {
  var resourceDetails = {
    "resource-official": {
      title: "NotebookLM 官方入口",
      body:
        "適合第一次使用的人。可以從這裡建立 notebook、加入 PDF、網站、YouTube、Google 文件等來源，並實際操作 Sources、Chat、Studio 三大區。讀完本文後，建議用自己的資料建立一本小型 notebook 來練習。",
      url: "https://notebooklm.google/"
    },
    "resource-help": {
      title: "NotebookLM Help Center",
      body:
        "適合查最新功能、使用限制與疑難排解。由於 NotebookLM 的功能與額度會更新，涉及 sources 數量、notebooks 數量、Audio / Video / Reports 等限制時，建議回到官方說明確認。",
      url: "https://support.google.com/notebooklm/"
    },
    "resource-audio": {
      title: "Audio Overview 官方說明",
      body:
        "適合想把資料變成聽覺學習素材的人。官方說明列出 Deep Dive、Brief、Critique、Debate 等形式，也提醒音訊仍可能有 AI 生成錯誤。建議先完成資料健檢，再產生音訊。",
      url: "https://support.google.com/notebooklm/answer/16212820"
    },
    "resource-video": {
      title: "Video Overview 官方說明",
      body:
        "適合想把複雜資料變成視覺導讀的人。影片摘要可設定語言、視覺風格與聚焦方向，但生成時間可能較長。適合在資料結構清楚、主題已收斂後再使用。",
      url: "https://support.google.com/notebooklm/answer/16454555"
    },
    "resource-upgrade": {
      title: "Upgrade NotebookLM",
      body:
        "適合需要大量 notebooks、sources、queries 或多次產生 Audio / Video / Reports 的使用者。額度會依方案與帳號類型變動，發布文章或教學前應以官方頁面為準。",
      url: "https://support.google.com/notebooklm/answer/16206866"
    },
    "resource-external": {
      title: "外部完整功能導覽",
      body:
        "適合想快速掌握 NotebookLM 特色、來源格式、Studio 輸出與使用情境的讀者。外部文章可作為補充，但涉及價格、限制與官方名稱時，仍建議回到 Google 官方文件確認。",
      url: "https://www.digitalocean.com/resources/articles/what-is-notebooklm"
    }
  };

  function text(root, selector, fallback) {
    var el = root.querySelector(selector);
    var value = el && typeof el.value === "string" ? el.value.trim() : "";
    return value || fallback;
  }

  function buildPrompt(root) {
    var topic = text(root, "[data-nlm-topic]", "你目前 Notebook 裡的主題");
    var audience = text(root, "[data-nlm-audience]", "0 基礎新手");
    var goal = text(root, "[data-nlm-goal]", "檢查資料是否足夠，找出缺漏、矛盾與需要補充的來源");
    var format = text(root, "[data-nlm-format]", "條列清單");
    var sources = text(root, "[data-nlm-sources]", "我已加入 NotebookLM 的所有來源資料");
    var limits = text(
      root,
      "[data-nlm-limits]",
      "沒有來源支持的內容請標示「來源不足」，不要自行補數字或結論。"
    );

    return [
      "請根據目前 NotebookLM 來源資料，協助我處理以下任務。",
      "",
      "主題：" + topic,
      "讀者：" + audience,
      "任務：" + goal,
      "輸出格式：" + format,
      "目前來源簡述：" + sources,
      "",
      "請特別遵守：",
      "1. " + limits,
      "2. 若來源彼此矛盾，請列出矛盾點與需要查證的地方。",
      "3. 若資料不足，請先告訴我還需要補哪些來源，不要直接產生完整成品。",
      "4. 最後請附上「下一步建議」，告訴我應該先補資料、改問題，還是可以進入工作室輸出。"
    ].join("\n");
  }

  function updateChecklist(root) {
    var checks = Array.prototype.slice.call(root.querySelectorAll("[data-nlm-check]"));
    if (!checks.length) return;
    var done = checks.filter(function (box) {
      return box.checked;
    }).length;
    var score = root.querySelector("[data-nlm-check-score]");
    var tip = root.querySelector("[data-nlm-check-tip]");
    if (score) score.textContent = done + " / " + checks.length;
    if (!tip) return;
    if (done >= 7) {
      tip.textContent = "狀態很好：可以先要求 NotebookLM 產生大綱或表格，再視需要使用工作室功能。";
    } else if (done >= 5) {
      tip.textContent = "接近可用：建議先做一次資料健檢，確認缺漏後再輸出。";
    } else {
      tip.textContent = "建議先補資料：來源品質或任務條件還不夠清楚，太早輸出容易失焦。";
    }
  }

  function initZoneDemo(root) {
    var demo = root.querySelector("[data-nlm-ui-demo]");
    if (!demo || demo.getAttribute("data-nlm-zone-demo-ready") === "1") return;
    var panels = Array.prototype.slice.call(demo.querySelectorAll("[data-nlm-zone]"));
    if (panels.length < 2) return;
    demo.setAttribute("data-nlm-zone-demo-ready", "1");

    var index = 0;
    var timer = null;
    var paused = false;
    var reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function setActive(nextIndex) {
      panels.forEach(function (panel, i) {
        panel.classList.toggle("is-zone-active", i === nextIndex);
      });
      index = nextIndex;
    }

    function tick() {
      if (paused || reduceMotion) return;
      setActive((index + 1) % panels.length);
    }

    function start() {
      if (reduceMotion) {
        setActive(0);
        return;
      }
      setActive(0);
      if (timer) window.clearInterval(timer);
      timer = window.setInterval(tick, 3200);
    }

    demo.addEventListener("mouseenter", function () {
      paused = true;
    });
    demo.addEventListener("mouseleave", function () {
      paused = false;
    });
    demo.addEventListener("focusin", function () {
      paused = true;
    });
    demo.addEventListener("focusout", function () {
      paused = false;
    });

    start();
  }

  function initOne(root) {
    if (!root || root.getAttribute("data-nlm-tools-ready") === "1") return;
    root.setAttribute("data-nlm-tools-ready", "1");
    initZoneDemo(root);

    var output = root.querySelector("[data-nlm-prompt-output]");
    var buildBtn = root.querySelector("[data-nlm-build]");
    var copyBtn = root.querySelector("[data-nlm-copy]");
    var status = root.querySelector("[data-nlm-copy-status]");
    var checks = Array.prototype.slice.call(root.querySelectorAll("[data-nlm-check]"));
    var modal = root.querySelector("[data-nlm-modal]");
    var modalTitle = root.querySelector("[data-nlm-modal-title]");
    var modalBody = root.querySelector("[data-nlm-modal-body]");
    var modalLink = root.querySelector("[data-nlm-modal-link]");

    function renderPrompt() {
      if (output) output.value = buildPrompt(root);
    }

    function closeModal() {
      if (modal) modal.hidden = true;
      document.documentElement.classList.remove("notebooklm-modal-open");
    }

    function openModal(id) {
      var item = resourceDetails[id];
      if (!modal || !item) return;
      if (modalTitle) modalTitle.textContent = item.title;
      if (modalBody) modalBody.textContent = item.body;
      if (modalLink) modalLink.href = item.url;
      modal.hidden = false;
      document.documentElement.classList.add("notebooklm-modal-open");
    }

    if (buildBtn) buildBtn.addEventListener("click", renderPrompt);
    checks.forEach(function (box) {
      box.addEventListener("change", function () {
        updateChecklist(root);
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        renderPrompt();
        if (!output) return;
        output.select();
        var copied = false;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(output.value).then(function () {
            if (status) status.textContent = "已複製";
          });
          copied = true;
        }
        if (!copied) {
          try {
            document.execCommand("copy");
            if (status) status.textContent = "已複製";
          } catch (e) {
            if (status) status.textContent = "請手動複製";
          }
        }
      });
    }

    Array.prototype.slice.call(root.querySelectorAll("[data-nlm-modal-open]")).forEach(function (btn) {
      btn.addEventListener("click", function () {
        openModal(btn.getAttribute("data-nlm-modal-open"));
      });
    });
    Array.prototype.slice.call(root.querySelectorAll("[data-nlm-modal-close]")).forEach(function (btn) {
      btn.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal();
    });

    renderPrompt();
    updateChecklist(root);
  }

  function initAll() {
    Array.prototype.slice
      .call(document.querySelectorAll("#notebooklm-guide-root"))
      .forEach(initOne);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  var observer = new MutationObserver(initAll);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.initNotebookLmGuideTools = initAll;
})();
