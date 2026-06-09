/**
 * AI 國小考前複習專文：互動測驗（年級／學期／科目 + 100 題池隨機 20 題）
 */
(function () {
  var QUIZ_FILTER_BLOCK_HTML =
    '<div class="quiz-filters" data-ai-exam-quiz-filters>' +
    '<label class="quiz-filter"><span class="quiz-filter__label">年級</span>' +
    '<select data-ai-exam-grade aria-label="年級">' +
    '<option value="1">一年級</option><option value="2">二年級</option>' +
    '<option value="3" selected>三年級</option><option value="4">四年級</option>' +
    '<option value="5">五年級</option><option value="6">六年級</option>' +
    "</select></label>" +
    '<label class="quiz-filter"><span class="quiz-filter__label">學期</span>' +
    '<select data-ai-exam-semester aria-label="學期">' +
    '<option value="1" selected>上學期</option><option value="2">下學期</option>' +
    "</select></label>" +
    '<label class="quiz-filter"><span class="quiz-filter__label">科目</span>' +
    '<select data-ai-exam-subject aria-label="科目">' +
    '<option value="mixed" selected>五科混合（各 4 題）</option>' +
    '<option value="英文">英文 20 題</option><option value="數學">數學 20 題</option>' +
    '<option value="自然">自然 20 題</option><option value="社會">社會 20 題</option>' +
    '<option value="國語">國語 20 題</option>' +
    "</select></label>" +
    '<button type="button" class="btn-start-quiz" data-ai-exam-quiz-start>開始測驗</button>' +
    "</div>" +
    '<p class="quiz-meta-line" data-ai-exam-quiz-meta>請選擇範圍後按「開始測驗」</p>' +
    '<p class="quiz-progress-line">第 <span data-ai-exam-quiz-current>0</span> / <span data-ai-exam-quiz-total>20</span> 題</p>';

  function ensureQuizFilterUi(root) {
    var panel = root.querySelector(".quiz-panel");
    if (!panel) return;
    var title = panel.querySelector(".quiz-top h3");
    if (title) {
      title.textContent = "年級學期練題區";
    }
    var sub = panel.querySelector(".quiz-top p");
    if (sub) {
      sub.textContent = "國小五科｜依年級學期出題｜答完看錯因與補強方向";
    }
    if (!panel.querySelector("[data-ai-exam-quiz-filters]")) {
      var question = panel.querySelector("#question");
      var tmp = document.createElement("div");
      tmp.innerHTML = QUIZ_FILTER_BLOCK_HTML;
      while (tmp.firstChild) {
        if (question) panel.insertBefore(tmp.firstChild, question);
        else panel.appendChild(tmp.firstChild);
      }
    }
    var resetBtn = panel.querySelector("[data-ai-exam-quiz-reset]");
    if (resetBtn && resetBtn.textContent.indexOf("重新抽題") < 0) {
      resetBtn.textContent = "重新抽題";
    }
    var note = panel.nextElementSibling;
    if (note && note.classList && note.classList.contains("note")) {
      note.textContent =
        "使用建議：先選孩子目前的年級、學期與科目做一輪 20 題練習，再把錯題原因整理成「觀念不熟、題意看錯、粗心流程」三類。正式段考前，請搭配課本、習作、老師圈選單元與學校考卷，讓 AI 依實際範圍補出同類型題目。";
    }
  }

  function initAiKidsExamQuiz() {
    var root = document.getElementById("ai-kids-exam-quiz-root");
    if (!root) return;

    var bank = window.AI_KIDS_EXAM_QUIZ_BANK;
    if (!bank) {
      console.warn("AI_KIDS_EXAM_QUIZ_BANK 未載入，請確認 post.html 有載入 blog-kids-exam-quiz-bank.js");
      return;
    }

    if (root.dataset.aiExamInit === "1") return;
    root.dataset.aiExamInit = "1";

    ensureQuizFilterUi(root);

    function el(id) {
      return root.querySelector("#" + id);
    }

    var quizData = [];
    var currentIndex = 0;
    var score = 0;
    var answered = false;
    var totalAnswered = 0;
    var sessionSeed = Date.now();

    function getFilters() {
      var gradeEl = root.querySelector("[data-ai-exam-grade]");
      var semEl = root.querySelector("[data-ai-exam-semester]");
      var subEl = root.querySelector("[data-ai-exam-subject]");
      return {
        grade: gradeEl ? Number(gradeEl.value) : 3,
        semester: semEl ? Number(semEl.value) : 1,
        subject: subEl ? subEl.value : "mixed"
      };
    }

    function gradeLabel(g) {
      return ["一", "二", "三", "四", "五", "六"][g - 1] || String(g);
    }

    function updateMeta() {
      var meta = root.querySelector("[data-ai-exam-quiz-meta]");
      if (!meta) return;
      var f = getFilters();
      var semText = f.semester === 1 ? "上學期" : "下學期";
      var subText =
        f.subject === "mixed"
          ? "五科混合（各科抽 4 題）"
          : f.subject + "（單科 20 題）";
      meta.textContent =
        "國小" +
        gradeLabel(f.grade) +
        "年級" +
        semText +
        "｜" +
        subText +
        "｜每科題庫 " +
        bank.POOL_SIZE +
        " 題，本次隨機 " +
        (quizData.length || bank.SESSION_SIZE) +
        " 題";
    }

    function updateProgress() {
      var cur = root.querySelector("[data-ai-exam-quiz-current]");
      var total = root.querySelector("[data-ai-exam-quiz-total]");
      if (cur) cur.textContent = quizData.length ? String(currentIndex + 1) : "0";
      if (total) total.textContent = String(quizData.length || 0);
    }

    function renderQuestion() {
      if (!quizData.length) {
        var questionEl = el("question");
        if (questionEl) {
          questionEl.textContent = "請選擇年級、學期與科目，再按「開始測驗」。";
        }
        var emptyOptionsEl = el("options");
        var emptyFeedbackEl = el("feedback");
        var emptyDiagnosisBox = el("diagnosisBox");
        var emptyRemedialBox = el("remedialBox");
        if (emptyOptionsEl) emptyOptionsEl.innerHTML = "";
        if (emptyFeedbackEl) emptyFeedbackEl.textContent = "切換範圍後會重新抽題，不會沿用上一輪題目。";
        if (emptyDiagnosisBox) emptyDiagnosisBox.style.display = "none";
        if (emptyRemedialBox) {
          emptyRemedialBox.style.display = "none";
          emptyRemedialBox.textContent = "";
        }
        updateScore();
        updateProgress();
        return;
      }

      if (currentIndex >= quizData.length) {
        var doneEl = el("question");
        if (doneEl) {
          doneEl.innerHTML =
            '<span style="color:#86efac;">測驗完成！</span> 共答對 ' +
            score +
            " / " +
            quizData.length +
            " 題。可按「重新抽題」再練一輪。";
        }
        var optionsEl = el("options");
        if (optionsEl) optionsEl.innerHTML = "";
        return;
      }

      var q = quizData[currentIndex];
      var questionEl = el("question");
      var optionsEl = el("options");
      var feedbackEl = el("feedback");
      var diagnosisBox = el("diagnosisBox");
      var remedialBox = el("remedialBox");
      if (!questionEl || !optionsEl || !feedbackEl) return;

      answered = false;
      questionEl.innerHTML =
        '<span style="color:#93c5fd;">' +
        escapeHtml(q.subject) +
        "</span>" +
        '<span class="quiz-scope-badge">' +
        escapeHtml(q.scopeLabel || "") +
        "</span>｜" +
        escapeHtml(q.question) +
        (q.reading
          ? '<div class="quiz-reading">注音提示：' + escapeHtml(q.reading) + "</div>"
          : "");
      feedbackEl.textContent = "選一個答案，答完會顯示解析。";
      if (diagnosisBox) diagnosisBox.style.display = "none";
      if (remedialBox) {
        remedialBox.style.display = "none";
        remedialBox.textContent = "";
      }
      optionsEl.innerHTML = "";

      q.options.forEach(function (option) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option";
        btn.textContent = option;
        optionsEl.appendChild(btn);
      });

      updateScore();
      updateProgress();
    }

    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    function checkAnswer(index) {
      if (answered || currentIndex >= quizData.length) return;

      answered = true;
      totalAnswered++;

      var q = quizData[currentIndex];
      var optionButtons = root.querySelectorAll(".quiz-option");
      var diagnosisBox = el("diagnosisBox");
      var diagnosisChips = el("diagnosisChips");
      var feedback = el("feedback");

      optionButtons.forEach(function (button, i) {
        if (i === q.answer) button.classList.add("correct");
        if (i === index && i !== q.answer) button.classList.add("wrong");
      });

      if (index === q.answer) {
        score++;
        if (feedback) feedback.innerHTML = "✅ 答對了！" + q.explain;
      } else if (feedback) {
        feedback.innerHTML = "❌ 答錯了，但這就是複習的價值。" + q.explain;
      }

      if (diagnosisChips) {
        diagnosisChips.innerHTML = "";
        (q.diagnosis || []).forEach(function (item) {
          var chip = document.createElement("div");
          chip.className = "diagnosis-chip";
          chip.textContent = item;
          diagnosisChips.appendChild(chip);
        });
      }
      if (diagnosisBox) diagnosisBox.style.display = "block";
      updateScore();
    }

    function showRemedial() {
      if (currentIndex >= quizData.length) return;
      var q = quizData[currentIndex];
      var remedialBox = el("remedialBox");
      if (!remedialBox) return;
      remedialBox.style.display = "block";
      remedialBox.innerHTML =
        "<strong>AI 補強題示意：</strong><br>" +
        q.remedial +
        '<br><span style="color:rgba(255,255,255,.75);">可把錯題貼給 AI，要求同概念、不同情境再出 3～5 題。</span>';
    }

    function nextQuestion() {
      if (!quizData.length) return;
      if (currentIndex < quizData.length - 1) {
        currentIndex++;
        renderQuestion();
      } else {
        currentIndex = quizData.length;
        renderQuestion();
      }
    }

    function startSession() {
      var f = getFilters();
      sessionSeed = Date.now();
      quizData = bank.pickSession(f.grade, f.semester, f.subject, sessionSeed);
      currentIndex = 0;
      score = 0;
      totalAnswered = 0;
      answered = false;
      updateMeta();
      renderQuestion();
    }

    function clearSessionForScopeChange() {
      quizData = [];
      currentIndex = 0;
      score = 0;
      totalAnswered = 0;
      answered = false;
      updateMeta();
      renderQuestion();
    }

    function resetQuiz() {
      startSession();
    }

    function updateScore() {
      var scoreEl = el("score");
      var totalEl = el("total");
      if (scoreEl) scoreEl.textContent = String(score);
      if (totalEl) totalEl.textContent = String(totalAnswered);
    }

    function showTab(tabId, btn) {
      root.querySelectorAll(".tab-content").forEach(function (tab) {
        tab.classList.remove("active");
      });
      root.querySelectorAll(".tab-btn").forEach(function (button) {
        button.classList.remove("active");
      });
      var panel = root.querySelector("#" + tabId);
      if (panel) panel.classList.add("active");
      if (btn) btn.classList.add("active");
    }

    root.querySelectorAll("[data-ai-exam-grade], [data-ai-exam-semester], [data-ai-exam-subject]").forEach(
      function (node) {
        node.addEventListener("change", clearSessionForScopeChange);
      }
    );

    var startBtn = root.querySelector("[data-ai-exam-quiz-start]");
    if (startBtn) startBtn.addEventListener("click", startSession);

    root.querySelectorAll("[data-ai-exam-tab-btn]").forEach(function (btn, idx) {
      btn.addEventListener("click", function () {
        var tabs = ["tab-en", "tab-math", "tab-science", "tab-social", "tab-chinese"];
        showTab(tabs[idx], btn);
      });
    });

    var nextBtn = root.querySelector("[data-ai-exam-quiz-next]");
    if (nextBtn) nextBtn.addEventListener("click", nextQuestion);
    var resetBtn = root.querySelector("[data-ai-exam-quiz-reset]");
    if (resetBtn) resetBtn.addEventListener("click", resetQuiz);
    var remedialBtn = root.querySelector("[data-ai-exam-quiz-remedial]");
    if (remedialBtn) remedialBtn.addEventListener("click", showRemedial);

    root.addEventListener("click", function (ev) {
      var opt = ev.target.closest(".quiz-option");
      if (!opt) return;
      var buttons = root.querySelectorAll(".quiz-option");
      var idx = Array.prototype.indexOf.call(buttons, opt);
      if (idx >= 0) checkAnswer(idx);
    });

    updateMeta();
    startSession();
  }

  window.initAiKidsExamQuiz = initAiKidsExamQuiz;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAiKidsExamQuiz);
  } else {
    initAiKidsExamQuiz();
  }
})();
