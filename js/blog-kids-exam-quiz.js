/**
 * AI 國小考前複習專文：互動測驗與分頁籤
 */
(function () {
  function initAiKidsExamQuiz() {
    var root = document.getElementById("ai-kids-exam-quiz-root");
    if (!root || root.dataset.aiExamInit === "1") return;
    root.dataset.aiExamInit = "1";

    function el(id) {
      return root.querySelector("#" + id);
    }

    var quizData = [
      {
        subject: "英文",
        question: "Which sentence is correct?",
        options: [
          "He are playing basketball.",
          "He is playing basketball.",
          "He am playing basketball.",
          "He be playing basketball."
        ],
        answer: 1,
        explain:
          "正確答案是 B。主詞 He 要搭配 is，所以是 He is playing basketball.",
        diagnosis: ["句型不熟", "be 動詞混淆", "主詞搭配錯誤"],
        remedial: "補強題：She ___ reading a book. A. am B. are C. is D. be"
      },
      {
        subject: "數學",
        question: "小明有 3/4 個披薩，吃掉 1/4 個，還剩多少？",
        options: ["1/4", "2/4", "3/8", "4/4"],
        answer: 1,
        explain: "正確答案是 B。3/4 - 1/4 = 2/4，也可以化簡成 1/2。",
        diagnosis: ["分數觀念", "同分母減法", "化簡不熟"],
        remedial: "補強題：小華有 5/6 杯果汁，喝掉 2/6 杯，還剩多少杯？"
      },
      {
        subject: "自然",
        question: "下列哪一種情況最容易形成影子？",
        options: [
          "光被透明玻璃完全通過",
          "光遇到不透明物體被擋住",
          "聲音遇到牆壁反彈",
          "水加熱後變成水蒸氣"
        ],
        answer: 1,
        explain:
          "正確答案是 B。影子是光被不透明物體阻擋後，在物體後方形成較暗的區域。",
        diagnosis: ["光的直進", "透明與不透明", "自然觀念混淆"],
        remedial:
          "補強題：為什麼手電筒照到鉛筆時，牆上會出現鉛筆的影子？"
      },
      {
        subject: "社會",
        question: "地圖上的比例尺主要是用來表示什麼？",
        options: [
          "地圖的顏色",
          "實際距離和地圖距離的關係",
          "天氣變化",
          "人口數量"
        ],
        answer: 1,
        explain:
          "正確答案是 B。比例尺可以幫助我們知道地圖上的距離換算成實際距離是多少。",
        diagnosis: ["地圖概念", "比例尺不熟", "題意判斷"],
        remedial:
          "補強題：如果地圖上 1 公分代表實際 1 公里，地圖上 3 公分代表實際幾公里？"
      },
      {
        subject: "國語",
        question: "「他跑得像風一樣快」使用了哪一種修辭？",
        options: ["排比", "譬喻", "設問", "頂真"],
        answer: 1,
        explain: "正確答案是 B。把跑步速度比喻成風一樣快，是譬喻修辭。",
        diagnosis: ["修辭判斷", "譬喻概念", "語句理解"],
        remedial:
          "補強題：請判斷「妹妹的笑容像太陽一樣溫暖」使用了哪一種修辭？"
      }
    ];

    var currentIndex = 0;
    var score = 0;
    var answered = false;
    var totalAnswered = 0;

    function renderQuestion() {
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
        q.subject +
        "</span>｜" +
        q.question;
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
    }

    function checkAnswer(index) {
      if (answered) return;

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
        if (feedback)
          feedback.innerHTML = "✅ 答對了！" + q.explain;
      } else if (feedback) {
        feedback.innerHTML =
          "❌ 答錯了，但這就是複習的價值。" + q.explain;
      }

      if (diagnosisChips) {
        diagnosisChips.innerHTML = "";
        q.diagnosis.forEach(function (item) {
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
      var q = quizData[currentIndex];
      var remedialBox = el("remedialBox");
      if (!remedialBox) return;
      remedialBox.style.display = "block";
      remedialBox.innerHTML =
        "<strong>AI 補強題示意：</strong><br>" +
        q.remedial +
        '<br><span style="color:rgba(255,255,255,.75);">正式使用時，可以把孩子錯題貼給 AI，要求它產生 3～5 題同概念、不同情境的練習題。</span>';
    }

    function nextQuestion() {
      currentIndex = (currentIndex + 1) % quizData.length;
      renderQuestion();
    }

    function resetQuiz() {
      currentIndex = 0;
      score = 0;
      totalAnswered = 0;
      renderQuestion();
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

    renderQuestion();

    root.querySelectorAll("[data-ai-exam-tab-btn]").forEach(function (btn, idx) {
      btn.addEventListener("click", function () {
        var tabs = [
          "tab-en",
          "tab-math",
          "tab-science",
          "tab-social",
          "tab-chinese"
        ];
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
  }

  window.initAiKidsExamQuiz = initAiKidsExamQuiz;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAiKidsExamQuiz);
  } else {
    initAiKidsExamQuiz();
  }
})();
