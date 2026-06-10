(function () {
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

  function initOne(root) {
    if (!root || root.getAttribute("data-nlm-tools-ready") === "1") return;
    root.setAttribute("data-nlm-tools-ready", "1");

    var output = root.querySelector("[data-nlm-prompt-output]");
    var buildBtn = root.querySelector("[data-nlm-build]");
    var copyBtn = root.querySelector("[data-nlm-copy]");
    var status = root.querySelector("[data-nlm-copy-status]");
    var checks = Array.prototype.slice.call(root.querySelectorAll("[data-nlm-check]"));

    function renderPrompt() {
      if (output) output.value = buildPrompt(root);
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
