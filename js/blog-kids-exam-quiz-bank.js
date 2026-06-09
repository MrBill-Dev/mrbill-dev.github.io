/**
 * 國小五科題庫 v3
 * 數學：每年級 4-5 種題型 × 多情境文字，真正不重樣
 * 英文/自然/社會/國語：20+ 題模板，題型結構各異
 * 無 PRACTICE_CONTEXTS 前綴，每題獨立成題
 */
(function (global) {
  var POOL_SIZE = 100;
  var SESSION_SIZE = 20;
  var SUBJECTS = ["英文", "數學", "自然", "社會", "國語"];

  /* ── RNG ── */
  function hashSeed() {
    var n = 0;
    for (var i = 0; i < arguments.length; i++) {
      var s = String(arguments[i]);
      for (var j = 0; j < s.length; j++) n = (n * 31 + s.charCodeAt(j)) >>> 0;
    }
    return n || 1;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, seed) {
    var a = arr.slice(), r = mulberry32(seed);
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pick4(options, correctIndex, r) {
    var correct = options[correctIndex];
    var opts = [];
    options.forEach(function (o) { if (opts.indexOf(o) < 0) opts.push(o); });
    if (opts.indexOf(correct) < 0) opts.unshift(correct);
    var numeric = Number(correct);
    var fillers = isNaN(numeric)
      ? ["都不對", "無法判斷", "以上皆非", "題目有誤"]
      : [String(numeric + 1), String(Math.max(0, numeric - 1)), String(numeric + 2), String(numeric + 10)];
    fillers.forEach(function (o) { if (opts.length < 4 && opts.indexOf(o) < 0) opts.push(o); });
    opts = opts.slice(0, 4);
    for (var t = 0; t < 6; t++) opts = shuffle(opts, hashSeed(correct, t, r()));
    var idx = opts.indexOf(correct);
    return { options: opts, answer: idx < 0 ? 0 : idx };
  }
  function qBase(sub, gr, sem, idx, q, opts, ans, explain, diag, remedial) {
    return {
      subject: sub, grade: gr, semester: sem,
      scopeLabel: "國小" + ["一","二","三","四","五","六"][gr - 1] + "年級" + (sem === 1 ? "上" : "下") + "學期",
      poolIndex: idx, question: q, options: opts, answer: ans, explain: explain,
      diagnosis: diag || ["觀念不熟", "題意看錯", "粗心"],
      remedial: remedial || "請用 AI 針對同單元再出 3 題類似練習。"
    };
  }
  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

  /* ── 情境陣列：數學用 ── */
  var ADD_CTX = [
    function (a, b) { return "小明有 " + a + " 顆糖，媽媽又給了 " + b + " 顆，他共有幾顆糖？"; },
    function (a, b) { return "書架上有 " + a + " 本書，老師再放上 " + b + " 本，共有幾本書？"; },
    function (a, b) { return "籃子裡有 " + a + " 顆蘋果，又放入 " + b + " 顆，共有幾顆？"; },
    function (a, b) { return "停車場有 " + a + " 輛車，又開來 " + b + " 輛，共有幾輛？"; },
    function (a, b) { return "花園有 " + a + " 朵花，又開了 " + b + " 朵，共有幾朵花？"; },
    function (a, b) { return "班上有 " + a + " 個學生，新來了 " + b + " 個，共有幾個？"; },
  ];
  var SUB_CTX = [
    function (big, small) { return "桌上有 " + big + " 個橘子，吃掉 " + small + " 個，還剩幾個？"; },
    function (big, small) { return "小英有 " + big + " 元，買玩具花了 " + small + " 元，還剩幾元？"; },
    function (big, small) { return "班上有 " + big + " 人，今天有 " + small + " 人請假，到校幾人？"; },
    function (big, small) { return "氣球有 " + big + " 顆，飛走了 " + small + " 顆，還剩幾顆？"; },
    function (big, small) { return "圖書館有 " + big + " 本書，借出 " + small + " 本，還剩幾本？"; },
    function (big, small) { return "停車場有 " + big + " 輛車，開走 " + small + " 輛，還剩幾輛？"; },
  ];
  var MUL_CTX = [
    function (m, n) { return "一排有 " + m + " 個座位，共 " + n + " 排，座位共幾個？"; },
    function (m, n) { return "每盒有 " + m + " 顆糖，共 " + n + " 盒，糖共幾顆？"; },
    function (m, n) { return "計算 " + m + " × " + n + " = ?"; },
    function (m, n) { return "小明每天存 " + m + " 元，存了 " + n + " 天，共存幾元？"; },
    function (m, n) { return m + " 個人，每人分到 " + n + " 本書，共幾本書？"; },
    function (m, n) { return "一棵樹結 " + m + " 個果子，" + n + " 棵樹共結幾個？"; },
  ];
  var DIV_CTX = [
    function (total, d) { return total + " 顆糖平均分給 " + d + " 個小朋友，每人幾顆？"; },
    function (total, d) { return total + " ÷ " + d + " = ?"; },
    function (total, d) { return "工廠生產 " + total + " 個零件，每箱裝 " + d + " 個，共需幾箱？"; },
    function (total, d) { return total + " 元平均分給 " + d + " 人，每人幾元？"; },
    function (total, d) { return total + " 本書放入 " + d + " 個書架，每架放幾本？"; },
  ];

  /* ════════════════════════════════════════
     數學生成器
  ════════════════════════════════════════ */
  function genMath(grade, semester, index) {
    var r = mulberry32(hashSeed("math", grade, semester, index));
    var type = index % 5;
    var scene = Math.floor(index / 5);

    /* ── G1 ── */
    if (grade === 1) {
      var max = semester === 1 ? 10 : 20;
      if (type <= 1) { /* 加法 */
        var a = 1 + Math.floor(r() * Math.floor(max * 0.6));
        var b = 1 + Math.floor(r() * (max - a));
        var sum = a + b;
        var picked = pick4([String(sum), String(sum + 1), String(Math.max(1, sum - 1)), String(sum + 2)], 0, r);
        return qBase("數學", grade, semester, index,
          ADD_CTX[scene % ADD_CTX.length](a, b), picked.options, picked.answer,
          a + " + " + b + " = " + sum + "。", ["加法", "合併", "粗心"]);
      }
      if (type <= 3) { /* 減法 */
        var big = 2 + Math.floor(r() * (max - 2));
        var small = 1 + Math.floor(r() * (big - 1));
        var diff = big - small;
        var picked = pick4([String(diff), String(diff + 1), String(Math.max(0, diff - 1)), String(big)], 0, r);
        return qBase("數學", grade, semester, index,
          SUB_CTX[scene % SUB_CTX.length](big, small), picked.options, picked.answer,
          big + " - " + small + " = " + diff + "。", ["減法", "取走", "粗心"]);
      }
      /* 大小比較 */
      var numA = 1 + Math.floor(r() * max);
      var numB = 1 + Math.floor(r() * max);
      while (numB === numA) numB = 1 + Math.floor(r() * max);
      var bigger = Math.max(numA, numB);
      var smaller = Math.min(numA, numB);
      var qs = [
        numA + " 和 " + numB + "，哪個比較大？",
        numA + " 比 " + numB + (numA > numB ? " 大幾？" : " 小幾？"),
        "把 " + numA + " 和 " + numB + " 由小排到大，哪個排第一？",
      ];
      var qi = scene % qs.length;
      var ans2 = qi === 0 ? String(bigger) : (qi === 1 ? String(bigger - smaller) : String(smaller));
      var picked = pick4([ans2, String(bigger + 1), String(smaller), String(bigger - smaller + 1)], 0, r);
      return qBase("數學", grade, semester, index, qs[qi], picked.options, picked.answer,
        "正確答案是 " + ans2 + "。", ["比較大小", "數序", "判斷"]);
    }

    /* ── G2 ── */
    if (grade === 2) {
      if (semester === 1) {
        if (type <= 1) { /* 100以內加法 */
          var a2 = 10 + Math.floor(r() * 50);
          var b2 = 5 + Math.floor(r() * (95 - a2));
          var sum2 = a2 + b2;
          var picked = pick4([String(sum2), String(sum2 + 5), String(sum2 - 3), String(sum2 + 10)], 0, r);
          return qBase("數學", grade, semester, index,
            ADD_CTX[scene % ADD_CTX.length](a2, b2), picked.options, picked.answer,
            a2 + " + " + b2 + " = " + sum2 + "。", ["兩位數加法", "進位", "粗心"]);
        }
        if (type <= 3) { /* 100以內減法 */
          var big2 = 30 + Math.floor(r() * 65);
          var small2 = 5 + Math.floor(r() * (big2 - 10));
          var diff2 = big2 - small2;
          var picked = pick4([String(diff2), String(diff2 + 5), String(Math.max(1, diff2 - 3)), String(big2)], 0, r);
          return qBase("數學", grade, semester, index,
            SUB_CTX[scene % SUB_CTX.length](big2, small2), picked.options, picked.answer,
            big2 + " - " + small2 + " = " + diff2 + "。", ["兩位數減法", "退位", "粗心"]);
        }
        /* 奇偶數 / 位值 */
        if (scene % 2 === 0) {
          var numOE = 2 + Math.floor(r() * 49) * 2;
          if (Math.floor(r() * 2)) numOE--;
          var isEven = numOE % 2 === 0;
          var picked = pick4(isEven ? ["偶數","奇數","都是","不確定"] : ["奇數","偶數","都是","不確定"], 0, r);
          return qBase("數學", grade, semester, index,
            numOE + " 是奇數還是偶數？", picked.options, picked.answer,
            numOE + (isEven ? " 可被 2 整除，是偶數。" : " 不能被 2 整除，是奇數。"), ["奇偶數", "數感"]);
        }
        var tens = 1 + Math.floor(r() * 8), ones2 = Math.floor(r() * 10);
        var val2 = tens * 10 + ones2;
        var placeQs = [
          { q: val2 + " 的十位數字是多少？", a: String(tens), w: [String(ones2), String(tens + 1), String(tens - 1 < 0 ? tens + 2 : tens - 1)] },
          { q: val2 + " 的個位數字是多少？", a: String(ones2), w: [String(tens), String(ones2 + 1 > 9 ? ones2 - 1 : ones2 + 1), "0"] },
          { q: tens + " 個十和 " + ones2 + " 個一是多少？", a: String(val2), w: [String(val2 + 1), String(tens + ones2), String(val2 - 10)] },
        ];
        var pq = placeQs[scene % placeQs.length];
        var picked = pick4([pq.a].concat(pq.w), 0, r);
        return qBase("數學", grade, semester, index, pq.q, picked.options, picked.answer,
          "正確答案是 " + pq.a + "。", ["位值", "個位十位"]);
      } else { /* S2: 九九乘法 */
        var m = 2 + Math.floor(r() * 8), n = 2 + Math.floor(r() * 8), prod = m * n;
        if (type <= 1) { /* 直式 */
          var picked = pick4([String(prod), String(prod + m), String(Math.abs(prod - n)), String(m + n)], 0, r);
          return qBase("數學", grade, semester, index, m + " × " + n + " = ?", picked.options, picked.answer,
            m + " × " + n + " = " + prod + "。", ["九九乘法", "乘法表", "粗心"]);
        }
        if (type <= 3) { /* 應用 */
          var picked = pick4([String(prod), String(prod + m), String(Math.abs(prod - n)), String(m + n)], 0, r);
          return qBase("數學", grade, semester, index,
            MUL_CTX[scene % MUL_CTX.length](m, n), picked.options, picked.answer,
            m + " × " + n + " = " + prod + "。", ["乘法應用", "情境題"]);
        }
        /* 反推（除法初步）*/
        var picked = pick4([String(n), String(n + 1), String(Math.max(1, n - 1)), String(m)], 0, r);
        return qBase("數學", grade, semester, index, prod + " ÷ " + m + " = ?", picked.options, picked.answer,
          m + " × " + n + " = " + prod + "，所以 " + prod + " ÷ " + m + " = " + n + "。", ["除法初步", "乘法逆運算"]);
      }
    }

    /* ── G3 ── */
    if (grade === 3) {
      if (semester === 1) { /* 乘除 */
        var m3 = 11 + Math.floor(r() * 39), n3 = 2 + Math.floor(r() * 7), prod3 = m3 * n3;
        if (type <= 1) { /* 兩位數乘一位數 */
          var picked = pick4([String(prod3), String(prod3 + n3), String(prod3 - m3 > 0 ? prod3 - m3 : prod3 + m3), String(m3 + n3)], 0, r);
          return qBase("數學", grade, semester, index, m3 + " × " + n3 + " = ?", picked.options, picked.answer,
            m3 + " × " + n3 + " = " + prod3 + "。", ["兩位數乘法", "直式計算"]);
        }
        if (type <= 3) { /* 除法（整除） */
          var d3 = 2 + Math.floor(r() * 7), q3 = 2 + Math.floor(r() * 10), p3 = d3 * q3;
          var picked = pick4([String(q3), String(q3 + 1), String(Math.max(1, q3 - 1)), String(d3)], 0, r);
          return qBase("數學", grade, semester, index,
            DIV_CTX[scene % DIV_CTX.length](p3, d3), picked.options, picked.answer,
            p3 + " ÷ " + d3 + " = " + q3 + "。", ["除法", "平均分配"]);
        }
        /* 有餘數除法 */
        var d3b = 3 + Math.floor(r() * 6), q3b = 2 + Math.floor(r() * 8);
        var rem = 1 + Math.floor(r() * (d3b - 1)), p3b = d3b * q3b + rem;
        var ans3b = q3b + "…" + rem;
        var picked = pick4([ans3b, (q3b + 1) + "…" + rem, q3b + "…" + (rem + 1 > d3b - 1 ? rem - 1 : rem + 1), (q3b - 1 < 0 ? q3b : q3b - 1) + "…" + rem], 0, r);
        return qBase("數學", grade, semester, index, p3b + " ÷ " + d3b + " = ?（商...餘數）",
          picked.options, picked.answer, p3b + " ÷ " + d3b + " = " + q3b + " 餘 " + rem + "。", ["有餘數除法", "商和餘數"]);
      } else { /* S2: 分數初步 */
        var denom3 = 3 + Math.floor(r() * 7);
        if (type <= 1) { /* 同分母加法 */
          var n1 = 1 + Math.floor(r() * Math.floor(denom3 / 2));
          var n2 = 1 + Math.floor(r() * Math.floor(denom3 / 2));
          var numSum = n1 + n2;
          var ans3c = numSum + "/" + denom3;
          var addFracCtx = [
            "計算 " + n1 + "/" + denom3 + " + " + n2 + "/" + denom3 + " = ?",
            "小明吃了蛋糕的 " + n1 + "/" + denom3 + "，小英吃了 " + n2 + "/" + denom3 + "，兩人共吃了幾分之幾？",
            "用掉 " + n1 + "/" + denom3 + " 和 " + n2 + "/" + denom3 + " 的緞帶，共用掉幾分之幾？",
          ];
          var picked = pick4([ans3c, numSum + "/" + (denom3 + 1), n1 + "/" + denom3, (numSum + 1) + "/" + denom3], 0, r);
          return qBase("數學", grade, semester, index, addFracCtx[scene % addFracCtx.length],
            picked.options, picked.answer, "分子相加：" + n1 + "+" + n2 + "=" + numSum + "，答案是 " + ans3c + "。", ["同分母分數加法", "分子加法"]);
        }
        if (type <= 3) { /* 同分母減法 */
          var n3a = 2 + Math.floor(r() * (denom3 - 2));
          var n3b = 1 + Math.floor(r() * (n3a - 1));
          var numDiff = n3a - n3b;
          var ans3d = numDiff + "/" + denom3;
          var subFracCtx = [
            "計算 " + n3a + "/" + denom3 + " − " + n3b + "/" + denom3 + " = ?",
            "披薩切 " + denom3 + " 片，先吃 " + n3b + " 片，再吃 " + (n3a - n3b) + " 片，總共吃了幾分之幾？等等，吃了 " + n3a + "/" + denom3 + " 後用掉 " + n3b + "/" + denom3 + " 分給同學，剩幾分之幾？",
            n3a + "/" + denom3 + " 比 " + n3b + "/" + denom3 + " 多幾分之幾？",
          ];
          var picked = pick4([ans3d, n3a + "/" + denom3, numDiff + "/" + (denom3 + 1), (n3a + n3b) + "/" + denom3], 0, r);
          return qBase("數學", grade, semester, index, subFracCtx[scene % 3],
            picked.options, picked.answer, n3a + "/" + denom3 + " − " + n3b + "/" + denom3 + " = " + ans3d + "。", ["同分母分數減法"]);
        }
        /* 分數的意義 */
        var part3 = 1 + Math.floor(r() * (denom3 - 1));
        var meanCtx = [
          "把一條繩子分成 " + denom3 + " 等份，取 " + part3 + " 份，用分數表示是？",
          "蛋糕切 " + denom3 + " 等份，小明吃了 " + part3 + " 份，他吃了幾分之幾？",
          "下列哪個分數等於「" + denom3 + " 份取 " + part3 + " 份」？",
        ];
        var ans3e = part3 + "/" + denom3;
        var picked = pick4([ans3e, denom3 + "/" + part3, part3 + "/" + (denom3 + 1), (part3 + 1) + "/" + denom3], 0, r);
        return qBase("數學", grade, semester, index, meanCtx[scene % meanCtx.length],
          picked.options, picked.answer, "分成 " + denom3 + " 份取 " + part3 + " 份，就是 " + ans3e + "。", ["分數意義"]);
      }
    }

    /* ── G4 ── */
    if (grade === 4) {
      if (semester === 1) { /* 分數進階 */
        var d4a = 2 + Math.floor(r() * 5), d4b = d4a + 1 + Math.floor(r() * 4);
        var t4a = 1 + Math.floor(r() * (d4a - 1)), t4b = 1 + Math.floor(r() * (d4b - 1));
        var v4a = t4a / d4a, v4b = t4b / d4b;
        var f4a = t4a + "/" + d4a, f4b = t4b + "/" + d4b;
        if (type <= 1) { /* 分數大小比較 */
          var bigger4 = v4a >= v4b ? f4a : f4b;
          var smaller4 = v4a < v4b ? f4a : f4b;
          var picked = pick4([bigger4, smaller4, (t4a + t4b) + "/" + (d4a + d4b), v4a === v4b ? f4a : "一樣大"], 0, r);
          return qBase("數學", grade, semester, index, "比較 " + f4a + " 和 " + f4b + "，哪個比較大？",
            picked.options, picked.answer, "通分後比較，較大的是 " + bigger4 + "。", ["分數比較", "通分"]);
        }
        if (type === 2) { /* 帶分數↔假分數 */
          var denom4c = 3 + Math.floor(r() * 4), whole4 = 1 + Math.floor(r() * 3);
          var part4 = 1 + Math.floor(r() * (denom4c - 1));
          var improper4 = whole4 * denom4c + part4;
          var toImproper = scene % 2 === 0;
          var q4c = toImproper
            ? whole4 + " 又 " + part4 + "/" + denom4c + " 化成假分數是？"
            : "假分數 " + improper4 + "/" + denom4c + " 化成帶分數是？";
          var ans4c = toImproper ? improper4 + "/" + denom4c : whole4 + " 又 " + part4 + "/" + denom4c;
          var w4a = toImproper ? (improper4 + 1) + "/" + denom4c : (whole4 + 1) + " 又 " + part4 + "/" + denom4c;
          var w4b = toImproper ? improper4 + "/" + (denom4c + 1) : whole4 + " 又 " + (part4 + 1) + "/" + denom4c;
          var w4c = toImproper ? whole4 + "/" + denom4c : improper4 + "/" + denom4c;
          var picked = pick4([ans4c, w4a, w4b, w4c], 0, r);
          return qBase("數學", grade, semester, index, q4c, picked.options, picked.answer,
            (toImproper ? "整數×分母+分子=" + improper4 : improper4 + "÷" + denom4c + "=" + whole4 + "餘" + part4) + "。", ["帶分數假分數互換"]);
        }
        if (type === 3) { /* 小數加減 */
          var o1 = 1 + Math.floor(r() * 8), tn1 = Math.floor(r() * 10);
          var o2 = 1 + Math.floor(r() * 8), tn2 = Math.floor(r() * 10);
          var decA = o1 + tn1 / 10, decB = o2 + tn2 / 10;
          var useAdd4 = scene % 2 === 0;
          var ans4d = String(Math.round((useAdd4 ? decA + decB : Math.abs(decA - decB)) * 10) / 10);
          var picked = pick4([ans4d, String(Number(ans4d) + 0.1), String(Math.max(0, Number(ans4d) - 0.1)), String(o1 + o2)], 0, r);
          return qBase("數學", grade, semester, index,
            useAdd4 ? decA + " + " + decB + " = ?" : Math.max(decA, decB) + " − " + Math.min(decA, decB) + " = ?",
            picked.options, picked.answer, "小數點對齊計算，答案 " + ans4d + "。", ["小數加減", "小數點對齊"]);
        }
        /* type === 4: 乘法估算 */
        var a4e = 20 + Math.floor(r() * 70), b4e = 2 + Math.floor(r() * 8), prod4e = a4e * b4e;
        var picked = pick4([String(prod4e), String(prod4e + a4e), String(prod4e - b4e > 0 ? prod4e - b4e : prod4e + b4e), String(a4e + b4e)], 0, r);
        return qBase("數學", grade, semester, index, a4e + " × " + b4e + " = ?",
          picked.options, picked.answer, a4e + " × " + b4e + " = " + prod4e + "。", ["兩位數乘法", "直式計算"]);
      } else { /* S2: 面積周長 */
        var l4 = 3 + Math.floor(r() * 18), w4 = 2 + Math.floor(r() * 12);
        var area4 = l4 * w4, peri4 = 2 * (l4 + w4);
        var areaCtx = [
          "長方形長 " + l4 + " 公分、寬 " + w4 + " 公分，面積幾平方公分？",
          "一塊地長 " + l4 + " 公尺、寬 " + w4 + " 公尺，面積幾平方公尺？",
          "黑板長 " + l4 + " 公分、高 " + w4 + " 公分，面積幾平方公分？",
        ];
        var periCtx = [
          "長方形長 " + l4 + " 公分、寬 " + w4 + " 公分，周長幾公分？",
          "農田長 " + l4 + " 公尺、寬 " + w4 + " 公尺，圍一圈需幾公尺？",
          "操場長 " + l4 + " 公尺、寬 " + w4 + " 公尺，跑一圈幾公尺？",
        ];
        if (type <= 1) { /* 面積 */
          var picked = pick4([String(area4), String(l4 + w4), String(peri4), String(area4 + l4)], 0, r);
          return qBase("數學", grade, semester, index, areaCtx[scene % areaCtx.length],
            picked.options, picked.answer, "面積 = 長×寬 = " + l4 + "×" + w4 + " = " + area4 + " 平方公分。", ["長方形面積", "公式"]);
        }
        if (type === 2) { /* 周長 */
          var picked = pick4([String(peri4), String(area4), String(l4 + w4), String(peri4 + 2)], 0, r);
          return qBase("數學", grade, semester, index, periCtx[scene % periCtx.length],
            picked.options, picked.answer, "周長 = (長+寬)×2 = (" + l4 + "+" + w4 + ")×2 = " + peri4 + "。", ["長方形周長", "公式"]);
        }
        if (type === 3) { /* 正方形 */
          var side4 = 3 + Math.floor(r() * 15);
          var sqA = side4 * side4, sqP = 4 * side4;
          var useArea4 = scene % 2 === 0;
          var picked = pick4(useArea4 ? [String(sqA), String(sqP), String(side4 * 2), String(sqA + side4)] : [String(sqP), String(sqA), String(side4 * 2), String(sqP + 4)], 0, r);
          return qBase("數學", grade, semester, index,
            "正方形邊長 " + side4 + " 公分，" + (useArea4 ? "面積" : "周長") + "是多少？",
            picked.options, picked.answer,
            useArea4 ? "面積 = " + side4 + "² = " + sqA : "周長 = " + side4 + "×4 = " + sqP, ["正方形", "面積周長"]);
        }
        /* type === 4: 面積單位換算 */
        var unitQs = [
          { q: "1 平方公尺 = 幾平方公分？", a: "10000", w: ["100", "1000", "100000"] },
          { q: "1 公頃 = 幾平方公尺？", a: "10000", w: ["1000", "100", "100000"] },
          { q: "1 平方公里 = 幾平方公尺？", a: "1000000", w: ["10000", "100000", "1000"] },
        ];
        var uq = unitQs[scene % unitQs.length];
        var picked = pick4([uq.a].concat(uq.w), 0, r);
        return qBase("數學", grade, semester, index, uq.q, picked.options, picked.answer,
          "面積換算：" + uq.q + " 答案是 " + uq.a + "。", ["面積單位", "進率換算"]);
      }
    }

    /* ── G5 ── */
    if (grade === 5) {
      if (semester === 1) { /* 小數、因倍數 */
        if (type <= 1) { /* 小數乘除 */
          var a5 = 1 + Math.floor(r() * 9) + Math.floor(r() * 10) / 10;
          var b5 = 2 + Math.floor(r() * 8);
          var useDiv5 = type === 1;
          var ans5a = String(Math.round((useDiv5 ? a5 : a5 * b5) * 10) / 10);
          var picked = pick4([ans5a, String(Number(ans5a) + 0.1), String(Math.max(0.1, Number(ans5a) - 0.1)), String(Math.round(a5) + b5)], 0, r);
          return qBase("數學", grade, semester, index,
            useDiv5 ? (a5 * b5).toFixed(1) + " ÷ " + b5 + " = ?" : a5 + " × " + b5 + " = ?",
            picked.options, picked.answer, "答案是 " + ans5a + "。", ["小數" + (useDiv5 ? "除法" : "乘法"), "小數點位置"]);
        }
        if (type === 2) { /* 最大公因數 */
          var a5b = 6 + Math.floor(r() * 12), b5b = 4 + Math.floor(r() * 12);
          var gcdAB = gcd(a5b, b5b);
          var picked = pick4([String(gcdAB), String(gcdAB + 1), String(gcdAB * 2), String(a5b * b5b / gcdAB)], 0, r);
          return qBase("數學", grade, semester, index, a5b + " 和 " + b5b + " 的最大公因數（GCF）是多少？",
            picked.options, picked.answer, "GCF(" + a5b + "," + b5b + ") = " + gcdAB + "。", ["最大公因數", "因數"]);
        }
        if (type === 3) { /* 最小公倍數 */
          var a5c = 2 + Math.floor(r() * 6), b5c = 2 + Math.floor(r() * 6);
          var gcdAB2 = gcd(a5c, b5c), lcmAB = a5c * b5c / gcdAB2;
          var picked = pick4([String(lcmAB), String(lcmAB + a5c), String(gcdAB2), String(a5c * b5c)], 0, r);
          return qBase("數學", grade, semester, index, a5c + " 和 " + b5c + " 的最小公倍數（LCM）是多少？",
            picked.options, picked.answer, "LCM(" + a5c + "," + b5c + ") = " + lcmAB + "。", ["最小公倍數", "倍數"]);
        }
        /* type === 4: 分數乘整數 */
        var denom5d = 3 + Math.floor(r() * 5), num5d = 1 + Math.floor(r() * (denom5d - 1)), mult5d = 2 + Math.floor(r() * 5);
        var resN = num5d * mult5d, g5d = gcd(resN, denom5d);
        var ans5d = (denom5d / g5d === 1) ? String(resN / g5d) : (resN / g5d) + "/" + (denom5d / g5d);
        var picked = pick4([ans5d, num5d + "/" + denom5d, num5d + "/" + (denom5d * mult5d), (num5d + mult5d) + "/" + denom5d], 0, r);
        return qBase("數學", grade, semester, index, num5d + "/" + denom5d + " × " + mult5d + " = ?",
          picked.options, picked.answer, "分子×整數=" + resN + "，化簡後 " + ans5d + "。", ["分數乘整數", "化簡"]);
      } else { /* S2: 百分比 */
        var base5 = (2 + Math.floor(r() * 8)) * 10;
        var pcts = [10, 20, 25, 50, 40, 75];
        var pct5 = pcts[Math.floor(r() * pcts.length)];
        var res5 = base5 * pct5 / 100;
        if (type <= 1) { /* 百分比計算 */
          var pctCtx = [
            base5 + " 的 " + pct5 + "% 是多少？",
            "一件 " + base5 + " 元的衣服打 " + (pct5 / 10) + " 折，要付幾元？",
            "全校 " + base5 + " 人，" + pct5 + "% 是女生，女生有幾人？",
          ];
          var picked = pick4([String(res5), String(res5 + 10), String(base5 - pct5), String(pct5)], 0, r);
          return qBase("數學", grade, semester, index, pctCtx[scene % pctCtx.length],
            picked.options, picked.answer, base5 + " × " + pct5 + "% = " + res5 + "。", ["百分比計算", "折扣"]);
        }
        if (type === 2) { /* 反推原價 */
          var revCtx = [
            "打 " + (pct5 / 10) + " 折後賣 " + res5 + " 元，原價幾元？",
            pct5 + "% 的學生共 " + res5 + " 人，全班共幾人？",
          ];
          var picked = pick4([String(base5), String(base5 + 10), String(res5), String(base5 - 10 > 0 ? base5 - 10 : base5 + 10)], 0, r);
          return qBase("數學", grade, semester, index, revCtx[scene % revCtx.length],
            picked.options, picked.answer, res5 + " ÷ " + pct5 + "% = " + base5 + "。", ["百分比逆推", "原價計算"]);
        }
        if (type === 3) { /* 三者互換 */
          var pctConvList = [
            { q: "25% 等於哪個分數（最簡）？", a: "1/4", w: ["25/100", "1/2", "2/5"] },
            { q: "0.5 等於多少百分比？", a: "50%", w: ["5%", "500%", "0.5%"] },
            { q: "3/5 等於多少百分比？", a: "60%", w: ["35%", "53%", "6%"] },
            { q: "75% 等於哪個小數？", a: "0.75", w: ["7.5", "0.075", "75"] },
          ];
          var pc = pctConvList[scene % pctConvList.length];
          var picked = pick4([pc.a].concat(pc.w), 0, r);
          return qBase("數學", grade, semester, index, pc.q, picked.options, picked.answer,
            pc.q + " 答案是 " + pc.a + "。", ["分數小數百分比互換"]);
        }
        /* type === 4: 比例 */
        var r5a = 2 + Math.floor(r() * 4), r5b = 2 + Math.floor(r() * 4), g5e = gcd(r5a, r5b);
        var s5a = r5a / g5e, s5b = r5b / g5e;
        var mult5e = 2 + Math.floor(r() * 5);
        var ratioCtx = [
          "男 " + (r5a * mult5e) + " 人，女 " + (r5b * mult5e) + " 人，男女比化簡是？",
          r5a * mult5e + " : " + r5b * mult5e + " 化簡後是？",
        ];
        var ans5e = s5a + ":" + s5b;
        var picked = pick4([ans5e, r5a + ":" + r5b, s5b + ":" + s5a, (s5a + 1) + ":" + s5b], 0, r);
        return qBase("數學", grade, semester, index, ratioCtx[scene % ratioCtx.length],
          picked.options, picked.answer, "最大公因數 " + g5e + "，化簡後 " + ans5e + "。", ["比與比例", "化簡"]);
      }
    }

    /* ── G6 ── */
    if (semester === 1) { /* 比例式、速率、體積 */
      if (type <= 1) { /* 速率三公式 */
        var spd6 = 30 + Math.floor(r() * 7) * 10, hr6 = 1 + Math.floor(r() * 4), dist6 = spd6 * hr6;
        var spdQ = [
          { q: "時速 " + spd6 + " 公里行駛 " + hr6 + " 小時，走了幾公里？", a: String(dist6), w: [String(dist6 + spd6), String(hr6), String(spd6 + hr6)] },
          { q: "走了 " + dist6 + " 公里花 " + hr6 + " 小時，平均速率是幾公里/時？", a: String(spd6), w: [String(spd6 + 10), String(dist6), String(hr6)] },
          { q: "時速 " + spd6 + " 公里，走 " + dist6 + " 公里需幾小時？", a: String(hr6), w: [String(hr6 + 1), String(dist6), String(spd6)] },
        ];
        var sq6 = spdQ[scene % spdQ.length];
        var picked = pick4([sq6.a].concat(sq6.w), 0, r);
        return qBase("數學", grade, semester, index, sq6.q, picked.options, picked.answer,
          "速率×時間=距離。" + sq6.q + " 答案 " + sq6.a + "。", ["速率", "行程問題"]);
      }
      if (type === 2) { /* 體積 */
        var lv6 = 2 + Math.floor(r() * 8), wv6 = 2 + Math.floor(r() * 8), hv6 = 2 + Math.floor(r() * 8);
        var vol6 = lv6 * wv6 * hv6;
        var volCtx = [
          "長方體長 " + lv6 + "、寬 " + wv6 + "、高 " + hv6 + " 公分，體積是？",
          "魚缸長 " + lv6 + "、寬 " + wv6 + "、高 " + hv6 + " 公分，容積是多少立方公分？",
        ];
        var picked = pick4([String(vol6), String(2 * (lv6 * wv6 + wv6 * hv6 + lv6 * hv6)), String(lv6 * wv6 + hv6), String(vol6 + lv6)], 0, r);
        return qBase("數學", grade, semester, index, volCtx[scene % volCtx.length],
          picked.options, picked.answer, "體積=長×寬×高=" + lv6 + "×" + wv6 + "×" + hv6 + "=" + vol6 + "。", ["長方體體積"]);
      }
      if (type === 3) { /* 比例分配 */
        var ra6 = 2 + Math.floor(r() * 4), rb6 = 2 + Math.floor(r() * 4);
        var unit6 = 2 + Math.floor(r() * 5), total6 = (ra6 + rb6) * unit6;
        var partA6 = ra6 * unit6;
        var ratioCtx6 = [
          "按 " + ra6 + ":" + rb6 + " 分配 " + total6 + " 元，第一份是多少元？",
          "兩種飼料按 " + ra6 + ":" + rb6 + " 混合，共 " + total6 + " 克，第一種需要幾克？",
        ];
        var picked = pick4([String(partA6), String(total6 - partA6), String(ra6), String(total6)], 0, r);
        return qBase("數學", grade, semester, index, ratioCtx6[scene % ratioCtx6.length],
          picked.options, picked.answer, ra6 + "÷(" + ra6 + "+" + rb6 + ")×" + total6 + "=" + partA6 + "。", ["比例分配"]);
      }
      /* type === 4: 比例式 */
      var a6b = 2 + Math.floor(r() * 6), b6b = 3 + Math.floor(r() * 6);
      var mult6b = 2 + Math.floor(r() * 4), c6b = a6b * mult6b, d6b = b6b * mult6b;
      var propCtx = [
        a6b + ":" + b6b + " = " + c6b + ":x，x = ?",
        a6b + " 公升汽油跑 " + b6b + " 公里，" + c6b + " 公升跑幾公里？",
      ];
      var picked = pick4([String(d6b), String(d6b + b6b), String(d6b - a6b > 0 ? d6b - a6b : d6b + a6b), String(c6b + b6b)], 0, r);
      return qBase("數學", grade, semester, index, propCtx[scene % propCtx.length],
        picked.options, picked.answer, "比例式：" + a6b + "/" + b6b + "=" + c6b + "/" + d6b + "，x=" + d6b + "。", ["比例式", "正比"]);
    }
    /* G6 S2: 圓、平均數、複合圖形 */
    if (type <= 1) { /* 圓 */
      var rad6 = 2 + Math.floor(r() * 8);
      var circC = Math.round(2 * 3.14 * rad6 * 100) / 100;
      var circA = Math.round(3.14 * rad6 * rad6 * 100) / 100;
      var useCircA = type === 1;
      var picked = pick4(useCircA ? [String(circA), String(circC), String(rad6 * rad6), String(circA + rad6)] : [String(circC), String(circA), String(rad6 * 2), String(circC + rad6)], 0, r);
      return qBase("數學", grade, semester, index,
        "圓半徑 " + rad6 + " 公分，" + (useCircA ? "面積" : "周長") + "約是多少？（π≈3.14）",
        picked.options, picked.answer,
        useCircA ? "面積=πr²=3.14×" + rad6 + "²=" + circA : "周長=2πr=2×3.14×" + rad6 + "=" + circC, ["圓形公式"]);
    }
    if (type === 2) { /* 平均數 */
      var cnt6 = 3 + Math.floor(r() * 3), tot6 = 0, vals6 = [];
      for (var vi = 0; vi < cnt6; vi++) { var v6 = 10 + Math.floor(r() * 40); vals6.push(v6); tot6 += v6; }
      var avg6 = Math.round(tot6 / cnt6 * 10) / 10;
      var picked = pick4([String(avg6), String(avg6 + 1), String(avg6 - 1 < 0 ? avg6 + 2 : avg6 - 1), String(tot6)], 0, r);
      return qBase("數學", grade, semester, index, cnt6 + " 次分數：" + vals6.join("、") + "，平均分是多少？",
        picked.options, picked.answer, "總和" + tot6 + "÷" + cnt6 + "=" + avg6 + "。", ["平均數", "統計"]);
    }
    /* type >= 3: 複合圖形 */
    var l6c = 4 + Math.floor(r() * 8), w6c = 3 + Math.floor(r() * 6);
    var cl6 = 1 + Math.floor(r() * (l6c - 2)), cw6 = 1 + Math.floor(r() * (w6c - 2));
    var shape6 = l6c * w6c - cl6 * cw6;
    var picked = pick4([String(shape6), String(l6c * w6c), String(cl6 * cw6), String(shape6 + cl6)], 0, r);
    return qBase("數學", grade, semester, index,
      "長 " + l6c + "、寬 " + w6c + " 的長方形，右上角挖掉長 " + cl6 + "、寬 " + cw6 + " 的缺口，剩餘面積是多少？",
      picked.options, picked.answer, "全部" + (l6c * w6c) + "－挖掉" + (cl6 * cw6) + "=" + shape6 + "平方公分。", ["複合圖形", "面積分割"]);
  }

  /* ════════════════════════════════════════
     英文（40+ 題模板，各年級各學期皆有足夠題數）
  ════════════════════════════════════════ */
  var EN_BANK = [
    /* ── G1-2 S1：顏色、動物、形狀、數字 ── */
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"What color is the sky?", opts:["blue","red","green","black"], a:0, e:"天空是藍色的。sky=天空，blue=藍色。", d:["顏色"],
      alts:[
        { q:"What color is grass?", opts:["green","blue","red","purple"], a:0, e:"草是綠色的。grass=草。" },
        { q:"What color is a tomato?", opts:["red","yellow","blue","white"], a:0, e:"番茄是紅色的。tomato=番茄。" },
        { q:"What color is milk?", opts:["white","brown","pink","grey"], a:0, e:"牛奶是白色的。milk=牛奶。" },
        { q:"What color is chocolate?", opts:["brown","white","red","green"], a:0, e:"巧克力是棕色的。chocolate=巧克力。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"How many legs does a dog have?", opts:["four","two","six","eight"], a:0, e:"狗有四條腿。four=四。", d:["數字","動物"],
      alts:[
        { q:"How many eyes does a person have?", opts:["two","one","four","three"], a:0, e:"人有兩隻眼睛。two=二。" },
        { q:"How many wheels does a bicycle have?", opts:["two","three","four","one"], a:0, e:"腳踏車有兩個輪子。bicycle=腳踏車。" },
        { q:"How many legs does a spider have?", opts:["eight","six","four","ten"], a:0, e:"蜘蛛有八隻腳。spider=蜘蛛。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"A ___ says 'woof woof'.", opts:["dog","cat","cow","bird"], a:0, e:"狗（dog）的叫聲是 woof。", d:["動物","擬聲"],
      alts:[
        { q:"A ___ says 'meow'.", opts:["cat","dog","pig","cow"], a:0, e:"貓（cat）的叫聲是 meow。" },
        { q:"A ___ says 'moo'.", opts:["cow","horse","sheep","duck"], a:0, e:"牛（cow）的叫聲是 moo。" },
        { q:"A ___ says 'oink'.", opts:["pig","dog","bird","fish"], a:0, e:"豬（pig）的叫聲是 oink。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"Which animal has a very long neck?", opts:["giraffe","lion","bear","pig"], a:0, e:"長頸鹿（giraffe）脖子最長。", d:["動物特徵"],
      alts:[
        { q:"Which animal is the biggest?", opts:["elephant","cat","rabbit","bird"], a:0, e:"大象（elephant）是最大的陸地動物。" },
        { q:"Which animal can swim in the sea?", opts:["fish","dog","cat","rabbit"], a:0, e:"魚（fish）在海裡游泳。" },
        { q:"Which animal has black and white stripes?", opts:["zebra","lion","elephant","giraffe"], a:0, e:"斑馬（zebra）有黑白條紋。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"What color is a banana?", opts:["yellow","green","red","blue"], a:0, e:"香蕉是黃色的。banana=香蕉。", d:["顏色","食物"],
      alts:[
        { q:"What is a circle? （圓形）", opts:["a round shape","a square","a triangle","a line"], a:0, e:"圓形（circle）是一個圓圓的形狀。round=圓的。" },
        { q:"What shape does a square have? （正方形有幾個角）", opts:["four corners","three corners","zero corners","five corners"], a:0, e:"正方形（square）有四個角。corners=角。" },
        { q:"What number comes after seven?", opts:["eight","six","nine","five"], a:0, e:"7 之後是 8。eight=八。" },
      ]},
    /* ── G1-2 S2：be 動詞、冠詞、問候、家庭 ── */
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"I ___ seven years old.", opts:["am","is","are","be"], a:0, e:"I 配 am。", d:["be動詞"],
      alts:[
        { q:"You ___ my best friend.", opts:["are","am","is","be"], a:0, e:"You 配 are。" },
        { q:"Tom and Amy ___ classmates.", opts:["are","am","is","be"], a:0, e:"複數主詞配 are。" },
        { q:"The dog ___ very cute.", opts:["is","am","are","be"], a:0, e:"單數第三人稱配 is。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"This is ___ elephant.", opts:["an","a","the","one"], a:0, e:"elephant 母音開頭，用 an。", d:["冠詞 a/an"],
      alts:[
        { q:"I have ___ apple in my bag.", opts:["an","a","the","some"], a:0, e:"apple 母音開頭，用 an。" },
        { q:"She has ___ cat.", opts:["a","an","the","one"], a:0, e:"cat 子音開頭，用 a。" },
        { q:"My father is ___ teacher.", opts:["a","an","the","one"], a:0, e:"teacher 子音開頭，用 a。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"Good ___! （早上打招呼）", opts:["morning","night","lunch","bye"], a:0, e:"早上說 Good morning！", d:["日常用語"],
      alts:[
        { q:"Good ___! （下午打招呼）", opts:["afternoon","morning","night","luck"], a:0, e:"下午說 Good afternoon。" },
        { q:"What do you say when you meet someone new?", opts:["Nice to meet you!","Goodbye!","Good night!","Sorry!"], a:0, e:"初次見面說 Nice to meet you！" },
        { q:"What do you say when you leave school?", opts:["Goodbye!","Good morning!","Hello!","Thank you!"], a:0, e:"離開時說 Goodbye（再見）。" },
        { q:"\"Thank you!\" — what is the correct reply?", opts:["You're welcome!","Goodbye!","Good morning!","Sorry!"], a:0, e:"回應謝謝用 You're welcome！（不客氣）。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"She ___ my mother.", opts:["is","am","are","be"], a:0, e:"She/He/It 配 is。", d:["be動詞","家庭"],
      alts:[
        { q:"He is my ___. （爸爸）", opts:["father","mother","sister","brother"], a:0, e:"父親是 father（dad）。" },
        { q:"She is my ___. （姊妹）", opts:["sister","brother","father","uncle"], a:0, e:"姊妹是 sister。" },
        { q:"They are my ___. （祖父母）", opts:["grandparents","parents","brothers","sisters"], a:0, e:"祖父母（兩人）是 grandparents。" },
      ]},
    /* ── G3 S1-2：疑問詞、動詞 be、進行式、形容詞 ── */
    { minGrade:3, maxGrade:3, semesters:[1,2], q:"___ is your name?", opts:["What","Where","Who","How"], a:0, e:"問名字用 What。", d:["疑問詞"],
      alts:[
        { q:"___ do you live? （你住在哪裡）", opts:["Where","What","Who","When"], a:0, e:"問地點用 Where。" },
        { q:"___ is your birthday? （你的生日是什麼時候）", opts:["When","Where","Who","Why"], a:0, e:"問時間用 When。" },
        { q:"___ is your favorite food? （最喜歡的食物）", opts:["What","When","Where","Who"], a:0, e:"問「什麼」用 What。" },
      ]},
    { minGrade:3, maxGrade:3, semesters:[1,2], q:"He ___ a teacher.", opts:["is","am","are","be"], a:0, e:"He/She/It 配 is。", d:["be動詞"],
      alts:[
        { q:"The flowers ___ beautiful.", opts:["are","is","am","be"], a:0, e:"複數名詞配 are。" },
        { q:"It ___ cold today.", opts:["is","am","are","be"], a:0, e:"It 配 is。天氣句型用 It。" },
        { q:"We ___ happy to help.", opts:["are","am","is","be"], a:0, e:"We 配 are。" },
      ]},
    { minGrade:3, maxGrade:3, semesters:[1,2], q:"What is the opposite of 'cold'?", opts:["hot","cool","warm","wet"], a:0, e:"cold（冷）的反義是 hot（熱）。", d:["反義詞"],
      alts:[
        { q:"What is the opposite of 'big'?", opts:["small","tall","wide","long"], a:0, e:"big（大）的反義是 small（小）。" },
        { q:"What is the opposite of 'happy'?", opts:["sad","angry","tired","busy"], a:0, e:"happy（快樂）的反義是 sad（悲傷）。" },
        { q:"What is the opposite of 'fast'?", opts:["slow","quick","short","soft"], a:0, e:"fast（快）的反義是 slow（慢）。" },
      ]},
    { minGrade:3, maxGrade:3, semesters:[2], q:"Look! She ___ riding her bicycle.", opts:["is","am","are","be"], a:0, e:"現在進行式：be + V-ing。She→is。", d:["現在進行式"],
      alts:[
        { q:"They ___ playing basketball right now.", opts:["are","is","am","be"], a:0, e:"現在進行式：They→are + V-ing。" },
        { q:"I ___ eating lunch now.", opts:["am","is","are","be"], a:0, e:"現在進行式：I→am + V-ing。" },
        { q:"He ___ reading a book at this moment.", opts:["is","am","are","be"], a:0, e:"現在進行式：He→is + V-ing。" },
      ]},
    { minGrade:3, maxGrade:4, semesters:[1,2], q:"They ___ good friends.", opts:["are","is","am","was"], a:0, e:"They 配 are。", d:["be動詞"],
      alts:[
        { q:"My parents ___ at work now.", opts:["are","is","am","be"], a:0, e:"parents（複數）配 are。" },
        { q:"The children ___ excited about the trip.", opts:["are","is","am","be"], a:0, e:"children（複數）配 are。" },
      ]},
    { minGrade:3, maxGrade:4, semesters:[2], q:"___ do you feel today?", opts:["How","What","Where","Who"], a:0, e:"問感受用 How。", d:["疑問詞"],
      alts:[
        { q:"___ did you go on the holiday?", opts:["Where","What","How","Who"], a:0, e:"問去了哪裡用 Where。" },
        { q:"___ old are you?", opts:["How","What","Where","Who"], a:0, e:"問年齡用 How old。" },
      ]},
    /* ── G4 S1-2：現在簡單式、第三人稱 ── */
    { minGrade:4, maxGrade:4, semesters:[1,2], q:"I ___ breakfast every morning.", opts:["eat","eats","eating","ate"], a:0, e:"I 用原形 eat（簡單現在式）。", d:["簡單現在式"],
      alts:[
        { q:"We ___ to school by bus every day.", opts:["go","goes","going","went"], a:0, e:"We 用原形 go（簡單現在式）。" },
        { q:"My parents ___ in a hospital.", opts:["work","works","working","worked"], a:0, e:"複數主詞用原形 work。" },
        { q:"I ___ math and science.", opts:["like","likes","liking","liked"], a:0, e:"I 用原形 like。" },
      ]},
    { minGrade:4, maxGrade:4, semesters:[1,2], q:"She ___ to the library every week.", opts:["goes","go","going","went"], a:0, e:"第三人稱單數動詞加 -es。go→goes。", d:["第三人稱s"],
      alts:[
        { q:"He ___ his teeth twice a day.", opts:["brushes","brush","brushing","brushed"], a:0, e:"He 第三人稱，brush→brushes。" },
        { q:"My dog ___ a lot.", opts:["eats","eat","eating","ate"], a:0, e:"My dog（第三人稱）用 eats。" },
        { q:"Tom ___ soccer every Saturday.", opts:["plays","play","playing","played"], a:0, e:"Tom（第三人稱）play→plays。" },
      ]},
    { minGrade:4, maxGrade:4, semesters:[2], q:"___ Tom like soccer?", opts:["Does","Do","Is","Are"], a:0, e:"第三人稱單數問句用 Does。", d:["Does/Do"],
      alts:[
        { q:"___ you like pizza?", opts:["Do","Does","Is","Are"], a:0, e:"You 的問句用 Do。" },
        { q:"___ they play tennis?", opts:["Do","Does","Is","Are"], a:0, e:"複數主詞用 Do。" },
        { q:"He doesn't ___ to school on Sundays.", opts:["go","goes","going","went"], a:0, e:"doesn't 後面用原形動詞 go。" },
        { q:"She ___ not like spicy food.", opts:["does","do","is","are"], a:0, e:"She（第三人稱）否定：does not。" },
      ]},
    { minGrade:5, maxGrade:6, semesters:[1,2], q:"Yesterday I ___ my homework before dinner.", opts:["finished","finish","finishing","finishes"], a:0, e:"Yesterday 表示過去，動詞用過去式 finished。", d:["過去式","時間副詞"],
      alts:[
        { q:"Last week she ___ to the zoo with her family.", opts:["went","go","goes","going"], a:0, e:"Last week 表過去，go 的過去式是 went（不規則）。" },
        { q:"They ___ soccer yesterday afternoon.", opts:["played","play","plays","playing"], a:0, e:"yesterday 用過去式，play 的規則過去式是 played。" },
      ]},
    { minGrade:5, maxGrade:6, semesters:[1,2], q:"I ___ visit grandma next Sunday.", opts:["will","am","was","do"], a:0, e:"next Sunday 表未來，用 will。", d:["未來式will"],
      alts:[
        { q:"She ___ be a doctor in the future.", opts:["will","is","was","are"], a:0, e:"未來式用 will + 原形動詞。" },
        { q:"They ___ travel to Japan next month.", opts:["will","are","were","do"], a:0, e:"next month 表未來，用 will。" },
      ]},
    { minGrade:5, maxGrade:6, semesters:[1,2], q:"The cat is sleeping ___ the sofa. （在沙發上）", opts:["on","in","under","behind"], a:0, e:"在表面上用 on。", d:["介系詞","位置"],
      alts:[
        { q:"She put the book ___ the bag. （袋子裡面）", opts:["in","on","under","behind"], a:0, e:"在內部用 in。" },
        { q:"The ball is ___ the table. （桌子下面）", opts:["under","on","in","beside"], a:0, e:"在下方用 under。" },
        { q:"He is standing ___ the tree. （樹旁邊）", opts:["beside","in","under","on"], a:0, e:"在旁邊用 beside（next to）。" },
      ]},
    { minGrade:5, maxGrade:6, semesters:[2], q:"My sister is ___ than me.（高）", opts:["taller","tall","tallest","more tall"], a:0, e:"比較級：tall → taller（比…更高）。", d:["比較級","形容詞"],
      alts:[
        { q:"This box is ___ than that one.（重）", opts:["heavier","heavy","heaviest","more heavy"], a:0, e:"比較級：heavy → heavier（y 改 ier）。" },
        { q:"Tom runs ___ than Mike.（快）", opts:["faster","fast","fastest","more fast"], a:0, e:"比較級：fast → faster（單音節直接 +er）。" },
      ]},
    { minGrade:5, maxGrade:6, semesters:[2], q:"If it rains, we ___ stay at home.", opts:["will","are","were","do"], a:0, e:"If 條件子句，主句用 will 表示將來。", d:["條件句","if-will"],
      alts:[
        { q:"If she studies hard, she ___ pass the exam.", opts:["will","is","was","does"], a:0, e:"If 假設條件，主句用 will。" },
        { q:"下列哪個句子用法正確？", opts:["If he is tired, he will rest.","If he will be tired, he rests.","If he is tired, he rests tomorrow.","If he tired, he will resting."], a:0, e:"If 條件句：主句用 will，子句用現在式。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[1,2], q:"He ___ lived in Taipei for ten years.", opts:["has","have","had","is"], a:0, e:"現在完成式：He has + 過去分詞 lived。", d:["現在完成式","have/has"],
      alts:[
        { q:"I ___ never eaten sushi before.", opts:["have","has","had","am"], a:0, e:"現在完成式：I have + 過去分詞。" },
        { q:"She ___ already finished her report.", opts:["has","have","had","is"], a:0, e:"She（第三人稱）用 has + 過去分詞。" },
        { q:"「我們已經認識彼此五年了。」英文是？", opts:["We have known each other for five years.","We know each other for five years.","We knew each other for five years.","We are knowing each other for five years."], a:0, e:"現在完成式 + for 表持續至今。" },
      ]},
    /* ── 補充 G3-4 英文 ── */
    { minGrade:3, maxGrade:4, semesters:[1,2], q:"___ she have a pet?", opts:["Does","Do","Is","Has"], a:0, e:"第三人稱 She 用 Does 疑問。", d:["Does/Do"],
      alts:[
        { q:"I don't ___ a bicycle.", opts:["have","has","having","had"], a:0, e:"否定句 don't 後用原形 have。" },
        { q:"What day is today?（今天是星期幾？）This is a question about ___ .", opts:["the day/date","the weather","the time","the place"], a:0, e:"'What day' 詢問的是星期幾（day）。" },
        { q:"Which sentence uses the correct word order?", opts:["She eats lunch at noon.","She at noon eats lunch.","Eats she lunch at noon.","At noon she eats lunch.（though also okay, less natural）"], a:0, e:"英文基本語序：主詞+動詞+受詞+時間副詞。" },
        { q:"The opposite of 'old' is ___.", opts:["new / young","tall","heavy","fast"], a:0, e:"old（舊/老）的反義是 new（新）或 young（年輕）。" },
      ]},
    /* ── 補充 G4-5 英文 ── */
    { minGrade:4, maxGrade:5, semesters:[1,2], q:"She is ___ than her classmates. （聰明）", opts:["smarter","smart","smartest","more smarter"], a:0, e:"比較級 smart→smarter（字尾子音+er）。", d:["比較級"],
      alts:[
        { q:"This is the ___ movie I have ever seen.（最好看）", opts:["best","good","better","more good"], a:0, e:"最高級：good→best（不規則）。" },
        { q:"He is not as ___ as his brother.（高）", opts:["tall","taller","tallest","more tall"], a:0, e:"as + 原形 + as 比較「一樣…」；not as tall as 表示「沒有…那麼高」。" },
        { q:"Which sentence is correct?", opts:["She runs faster than him.","She runs more fast than him.","She runs fastest than him.","She run faster than him."], a:0, e:"fast 的比較級是 faster（副詞比較級）。" },
        { q:"The Amazon River is ___ river in the world.（最長）", opts:["the longest","the long","longer","most long"], a:0, e:"最高級：long→longest，前面加 the。" },
      ]},
    /* ── 補充 G5-6 英文（過去式進階、複雜句） ── */
    { minGrade:5, maxGrade:6, semesters:[1,2], q:"She ___ dinner when I called her.", opts:["was cooking","cooked","cooks","is cooking"], a:0, e:"過去進行式：was/were + V-ing，表示過去某時正在進行的動作。", d:["過去進行式"],
      alts:[
        { q:"They ___ playing games when the lights went out.", opts:["were","was","are","is"], a:0, e:"They 搭配 were（過去進行式）。" },
        { q:"I ___ my homework, but then my friend came over.", opts:["was doing","do","did","does"], a:0, e:"過去進行式表示過去某時正進行中的動作。" },
        { q:"\"She has been studying for three hours.\" This sentence is in what tense?", opts:["Present perfect continuous","Simple past","Simple present","Past perfect"], a:0, e:"has/have been + V-ing 是現在完成進行式，表示持續到現在的動作。" },
        { q:"Which sentence correctly uses 'since'?", opts:["I have lived here since 2020.","I live here since 2020.","I lived here since 2020.","I was living here since 2020."], a:0, e:"since 和現在完成式搭配：have/has + pp + since + 時間點。" },
      ]},
    /* ── 補充 G6 英文 ── */
    { minGrade:6, maxGrade:6, semesters:[1,2], q:"If I ___ a bird, I would fly to the moon.", opts:["were","am","was","be"], a:0, e:"假設語氣（虛擬）：If + were（非事實條件），主句用 would + 原形。", d:["假設語氣"],
      alts:[
        { q:"She wished she ___ taller.", opts:["were","was","is","be"], a:0, e:"wish 後面的假設語氣：wish + 主詞 + were（非事實）。" },
        { q:"\"Without your help, I couldn't have finished.\" This means:", opts:["Your help was essential; I finished because of you.","I finished without help.","I couldn't finish no matter what.","Your help didn't matter."], a:0, e:"without = 如果沒有你的幫助，我就完不成；表感謝。" },
        { q:"Passive voice: \"The book ___ written by a famous author.\"", opts:["was","is written","wrote","has written"], a:0, e:"被動式：be + 過去分詞。The book was written（書被寫）。" },
        { q:"Which is a correct passive sentence?", opts:["The cake was eaten by Tom.","Tom was eating the cake.","The cake eaten by Tom.","Was the cake eat by Tom?"], a:0, e:"被動式：主詞 + was/were + 過去分詞 + by + 施動者。" },
      ]},
  ];
  function genEnglish(g, s, i) { return genFromBank("英文", g, s, i, EN_BANK); }

  /* ════════════════════════════════════════
     自然（G1-G6，每年級學期 20+ 題）
  ════════════════════════════════════════ */
  var SCI_BANK = [
    /* ── G1-2 S1：感官、材料、動物 ── */
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"用哪個器官「看」東西？", opts:["眼睛","耳朵","鼻子","舌頭"], a:0, e:"視覺靠眼睛。", d:["感官"],
      alts:[
        { q:"用哪個器官「聽」聲音？", opts:["耳朵","眼睛","鼻子","皮膚"], a:0, e:"聽覺靠耳朵。" },
        { q:"用哪個器官「嚐」食物的味道？", opts:["舌頭","鼻子","眼睛","耳朵"], a:0, e:"味覺靠舌頭。" },
        { q:"用哪個器官「聞」氣味？", opts:["鼻子","眼睛","耳朵","皮膚"], a:0, e:"嗅覺靠鼻子。" },
        { q:"我們感覺冷熱主要靠什麼？", opts:["皮膚","眼睛","耳朵","鼻子"], a:0, e:"觸覺（感覺溫度）靠皮膚。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"玻璃杯是透明的，代表光線會怎樣？", opts:["可以穿過","完全被阻擋","變成聲音","消失"], a:0, e:"透明物體讓光穿過。", d:["透明不透明"],
      alts:[
        { q:"木頭積木是「透明」還是「不透明」的？", opts:["不透明","透明","半透明","發光"], a:0, e:"木頭不讓光穿過，是不透明物體。" },
        { q:"下列哪種物品是「半透明」的？", opts:["磨砂玻璃","鐵板","清玻璃","木板"], a:0, e:"磨砂玻璃讓部分光通過，是半透明的。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"魚在水中靠什麼呼吸？", opts:["鰓","肺","皮膚","嘴巴"], a:0, e:"魚用鰓在水中呼吸。", d:["動物呼吸"],
      alts:[
        { q:"人類靠什麼器官呼吸？", opts:["肺","鰓","皮膚","鰭"], a:0, e:"人類用肺呼吸空氣中的氧氣。" },
        { q:"青蛙在水中和陸地上都能生活，是因為它具備什麼？", opts:["可用肺或皮膚呼吸","只有鰓","沒有呼吸器官","只有肺"], a:0, e:"青蛙是兩棲動物，幼體用鰓，成體用肺＋皮膚呼吸。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"下列哪一種材料最硬？", opts:["鐵","棉花","紙","布"], a:0, e:"鐵是金屬，質地最硬。", d:["材料性質"],
      alts:[
        { q:"下列哪種材料最軟？", opts:["棉花","木頭","石頭","鐵"], a:0, e:"棉花柔軟，是最軟的材料。" },
        { q:"蠟燭的蠟加熱會怎樣？", opts:["融化（變成液體）","變成氣體","變硬","消失"], a:0, e:"固體的蠟受熱融化成液態。" },
      ]},
    /* ── G1-2 S2：卵生/胎生、植物、天氣 ── */
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"哪一種動物是「胎生」（直接生下幼仔）？", opts:["狗","雞","烏龜","青蛙"], a:0, e:"狗是哺乳動物，是胎生。", d:["卵生胎生"],
      alts:[
        { q:"下列哪種動物是「卵生」（用卵孵化）？", opts:["雞","狗","貓","牛"], a:0, e:"雞用卵孵出小雞，是卵生動物。" },
        { q:"「胎生」和「卵生」最大的差別是什麼？", opts:["胎生直接生幼體，卵生需孵卵","胎生用卵，卵生直接生","完全一樣","胎生比卵生大"], a:0, e:"胎生在媽媽體內發育後直接出生，卵生從卵孵化。" },
        { q:"下列哪種動物屬於「哺乳類」（胎生）？", opts:["鯨魚","鯊魚","蛇","蜥蜴"], a:0, e:"鯨魚雖然在水中生活，但是哺乳類，是胎生動物。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"植物要健康生長，不可缺少的是？", opts:["陽光、水、空氣","只有肥料","只有泥土","只有水"], a:0, e:"植物需陽光、水與空氣（CO₂）。", d:["植物生長"],
      alts:[
        { q:"植物的哪個部位負責吸收水分和養分？", opts:["根","葉","莖","花"], a:0, e:"根負責從土壤吸收水分和礦物質。" },
        { q:"葉子通常是綠色的，原因是含有什麼？", opts:["葉綠素","水分","鐵質","泥土"], a:0, e:"葉綠素讓葉子呈綠色，也是光合作用的場所。" },
        { q:"植物「種子」的主要功能是？", opts:["繁殖下一代","儲存水分","吸收陽光","呼吸空氣"], a:0, e:"種子在合適環境發芽，繁殖新植物。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"太陽從哪個方向升起？", opts:["東方","西方","北方","南方"], a:0, e:"日出東方，日落西方。", d:["晝夜"],
      alts:[
        { q:"夏天白天比冬天長還是短？", opts:["比較長","比較短","一樣長","不一定"], a:0, e:"夏天太陽高度角大，白天較長；冬天白天較短。" },
        { q:"天氣預報說「氣溫 30 度」，適合穿哪種衣服？", opts:["短袖","厚外套","羽絨衣","圍巾"], a:0, e:"30°C 是很熱的溫度，應穿輕薄短袖。" },
      ]},
    /* ── G3 S1-2：光影、磁力、狀態變化 ── */
    { minGrade:3, maxGrade:3, semesters:[1,2], q:"影子是怎麼形成的？", opts:["光被不透明物體擋住","光穿過水面","聲波遇到牆壁","熱氣上升"], a:0, e:"不透明物體阻擋光線→在另一側形成影子。", d:["光直進"],
      alts:[
        { q:"同一根棍子，什麼時候影子最長？", opts:["傍晚（太陽低角度）","正午（太陽最高）","早上八點","下午兩點"], a:0, e:"傍晚太陽高度角最低，影子最長；正午高度角最大，影子最短。" },
        { q:"光是「直線前進」的，下列哪個現象可以說明？", opts:["影子的邊緣清晰","光在水中彎曲","光在鏡子上散射","光全部被吸收"], a:0, e:"光直進，所以影子邊緣清楚（光不會繞過物體）。" },
      ]},
    { minGrade:3, maxGrade:3, semesters:[1,2], q:"下列哪種物品，磁鐵一定能吸引？", opts:["鋼鐵製品","塑膠玩具","木頭積木","紙張"], a:0, e:"磁鐵只吸引含鐵（Fe）的物品。", d:["磁力"],
      alts:[
        { q:"磁鐵的哪兩極會互相吸引？", opts:["N 極和 S 極（異名極）","N 極和 N 極","S 極和 S 極","任何兩極都吸引"], a:0, e:"異名極（N-S）相吸，同名極（N-N 或 S-S）相斥。" },
        { q:"磁鐵的哪兩極會互相排斥？", opts:["同名極（N-N 或 S-S）","N 極和 S 極","任意兩極","磁鐵沒有排斥"], a:0, e:"同名極互斥，異名極相吸。" },
        { q:"把一個磁鐵分成兩半，結果是？", opts:["每一半都有 N 極和 S 極","一半只有 N 極，另一半只有 S 極","變成沒有磁性","磁力加倍"], a:0, e:"每段磁鐵仍然有 N 和 S 兩極，磁極不能分開。" },
      ]},
    { minGrade:3, maxGrade:3, semesters:[1,2], q:"水在幾度以下會結成冰？", opts:["0°C 以下","100°C 以上","50°C 以下","任何溫度"], a:0, e:"水在 0°C 時凝固成冰。", d:["狀態變化"],
      alts:[
        { q:"水加熱到 100°C（沸騰），會變成什麼？", opts:["水蒸氣（氣態）","冰（固態）","泥土","砂糖"], a:0, e:"液態水加熱超過沸點→汽化成水蒸氣。" },
        { q:"水蒸氣冷卻後會變成什麼？", opts:["液態水","冰","固態蠟","泥土"], a:0, e:"氣態水蒸氣冷卻→液化成水（液態）。" },
        { q:"下列哪種現象是「蒸發」？", opts:["曬在外面的濕衣服變乾","冰淇淋融化","水結成冰","霧氣出現"], a:0, e:"衣服上的水分蒸發成水蒸氣，讓衣服變乾。" },
      ]},
    { minGrade:3, maxGrade:4, semesters:[1,2], q:"做實驗時，要確認結論，最重要的是什麼？", opts:["每次只改變一個變因","換不同的場地","多找幾個同學幫忙","盡量快速完成"], a:0, e:"科學實驗控制變因：每次只改一個條件，才能找出真因。", d:["科學方法"],
      alts:[
        { q:"「對照組」在實驗中的作用是？", opts:["提供比較基準","增加趣味","加快實驗速度","沒有特別目的"], a:0, e:"對照組不做改變，作為比較基準，確認實驗效果。" },
        { q:"實驗前應該先做什麼？", opts:["提出假設（猜測結果）","直接開始操作","等老師公布結論","隨便試試"], a:0, e:"科學方法：觀察→問問題→提出假設→實驗驗證→得出結論。" },
      ]},
    /* ── G4 S1-2：電路、生態、動物分類 ── */
    { minGrade:4, maxGrade:4, semesters:[1,2], q:"燈泡要亮起，最重要的條件是什麼？", opts:["形成完整的電流迴路","只需要電池","只需要燈泡","只需要導線"], a:0, e:"完整迴路：電池→導線→燈泡→回到電池，缺一不可。", d:["電路"],
      alts:[
        { q:"哪種材料是「導電體」？", opts:["銅線","橡皮擦","木棒","塑膠"], a:0, e:"銅是金屬，是良導體；橡皮、木頭是絕緣體。" },
        { q:"電線外面包的橡膠，主要作用是？", opts:["絕緣，防止電流漏出傷人","增加美觀","增加導電性","降低電壓"], a:0, e:"外皮是絕緣體，防止漏電，保護安全。" },
        { q:"串聯電路中，一個燈泡壞掉，其他燈泡會怎樣？", opts:["全部熄滅（迴路斷了）","其他燈泡更亮","不受影響","只有旁邊的熄滅"], a:0, e:"串聯只有一條電流路徑，一處斷路全部不亮。" },
      ]},
    { minGrade:4, maxGrade:4, semesters:[1,2], q:"食物鏈中，植物扮演什麼角色？", opts:["生產者","消費者","分解者","捕食者"], a:0, e:"植物自製養分，是食物鏈的起點——生產者。", d:["食物鏈","生態"],
      alts:[
        { q:"食物鏈「草→蟲→青蛙→蛇」中，蛇屬於？", opts:["消費者（最終捕食者）","生產者","分解者","沒有角色"], a:0, e:"蛇是最高層消費者（吃青蛙）。" },
        { q:"蚯蚓、細菌在食物鏈中扮演什麼角色？", opts:["分解者","生產者","消費者","捕食者"], a:0, e:"蚯蚓和細菌分解有機物（死去的生物），是分解者。" },
        { q:"生態系中，若生產者（植物）全部消失，最終結果是？", opts:["所有生物都無法生存","只有草食動物消失","只有肉食動物消失","不影響任何生物"], a:0, e:"植物是食物鏈基礎，若消失，整個食物鏈崩潰。" },
      ]},
    { minGrade:4, maxGrade:4, semesters:[2], q:"昆蟲的特徵，下列哪項正確？", opts:["頭、胸、腹三部分，六隻腳","四部分，八隻腳","兩部分，四隻腳","一部分，十隻腳"], a:0, e:"昆蟲 = 頭+胸+腹，三對腳（共六隻）。", d:["昆蟲","動物分類"],
      alts:[
        { q:"蜘蛛有幾隻腳？（蜘蛛不是昆蟲）", opts:["八隻","六隻","四隻","十隻"], a:0, e:"蜘蛛是節肢動物（蛛形類），有八隻腳，不是昆蟲。" },
        { q:"下列哪種動物「不是」昆蟲？", opts:["蜘蛛","蝴蝶","蜜蜂","螞蟻"], a:0, e:"蜘蛛有八隻腳、不分頭胸腹，不是昆蟲。" },
        { q:"蝴蝶的生命週期（完全變態）順序是？", opts:["卵→幼蟲→蛹→成蟲","卵→成蟲→幼蟲","幼蟲→卵→蛹","直接從卵孵出成蟲"], a:0, e:"完全變態：卵→幼蟲（毛毛蟲）→蛹→成蟲（蝴蝶）。" },
      ]},
    { minGrade:5, maxGrade:5, semesters:[1,2], q:"光合作用的「原料」是哪兩種物質？", opts:["二氧化碳和水","氧氣和糖","氮氣和礦物質","只有水"], a:0, e:"光合作用：CO₂ + H₂O + 光能 → 葡萄糖 + O₂。", d:["光合作用","植物"],
      alts:[
        { q:"光合作用發生在植物的哪個部位？", opts:["葉片（含葉綠素）","根部","莖部","花朵"], a:0, e:"葉片中的葉綠素能吸收光能進行光合作用。" },
        { q:"光合作用必須有哪種能量才能進行？", opts:["光能（陽光）","熱能","電能","化學能"], a:0, e:"光合作用需要光能（陽光）驅動。" },
      ]},
    { minGrade:5, maxGrade:5, semesters:[1,2], q:"光合作用釋放到空氣中的氣體是？", opts:["氧氣（O₂）","二氧化碳（CO₂）","氮氣（N₂）","氫氣（H₂）"], a:0, e:"光合作用吸收 CO₂，同時釋放 O₂。", d:["光合作用","氣體"],
      alts:[
        { q:"植物白天進行光合作用，會從空氣中吸收哪種氣體？", opts:["二氧化碳（CO₂）","氧氣（O₂）","氮氣（N₂）","水蒸氣"], a:0, e:"光合作用吸收CO₂作為原料。" },
        { q:"植物既進行光合作用，也進行呼吸作用。兩者共同的產物是？", opts:["都有水", "光合=O₂；呼吸=CO₂，不同", "都是CO₂","都是葡萄糖"], a:1, e:"光合釋放O₂，呼吸釋放CO₂，兩者不同。" },
      ]},
    { minGrade:5, maxGrade:6, semesters:[1,2], q:"下列哪種是「可再生能源」？", opts:["太陽能","煤炭","石油","天然氣"], a:0, e:"太陽能取之不盡，不會耗盡，屬可再生能源。", d:["能源分類","環保"],
      alts:[
        { q:"下列哪種能源燃燒後會增加大氣中的 CO₂，屬於「不可再生能源」？", opts:["煤炭","太陽能","風力","水力"], a:0, e:"煤炭是化石燃料，燃燒產生CO₂，且儲量有限。" },
        { q:"風力發電和水力發電的共同特點是？", opts:["利用自然力量，不排放CO₂","需要燃燒燃料","消耗化石能源","會產生核廢料"], a:0, e:"風力與水力都是再生能源，不燃燒燃料。" },
      ]},
    { minGrade:5, maxGrade:6, semesters:[2], q:"若草食動物突然大量消失，植物族群會如何變化？", opts:["增加（因為吃草的少了）","減少","完全不變","也一起消失"], a:0, e:"草食動物吃植物；它們減少了，植物被吃的少，植物數量相對增加。", d:["食物鏈平衡","生態"],
      alts:[
        { q:"若肉食動物（例如獅子）大量減少，草食動物族群會？", opts:["增加（天敵少了）","減少","不受影響","立刻消失"], a:0, e:"天敵減少，草食動物存活率提高，族群增加。" },
        { q:"食物鏈「草→蟲→青蛙→蛇→老鷹」中，蟲減少，最先受影響的是？", opts:["青蛙（食物減少）","草（增多）","蛇（無影響）","老鷹（增多）"], a:0, e:"蟲是青蛙的食物，蟲減少→青蛙食物不足→青蛙減少。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[1,2], q:"地球自轉一圈需要多久？", opts:["約24小時","約365天","約30天","約12小時"], a:0, e:"地球自轉約24小時，產生白天與黑夜交替。", d:["地球自轉","晝夜"],
      alts:[
        { q:"「晝夜交替」（白天和黑夜輪流出現）的原因是？", opts:["地球自轉","地球公轉","月球自轉","太陽自轉"], a:0, e:"地球自轉讓面向太陽的一側有白天，背向太陽的一側有黑夜。" },
        { q:"太陽「東升西落」的現象，是因為地球怎麼轉動？", opts:["由西向東自轉","由東向西自轉","由南向北公轉","由北向南公轉"], a:0, e:"地球由西向東自轉，所以太陽看起來從東方升起。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[1,2], q:"地球繞太陽公轉一圈（一年）需要多久？", opts:["約365天","約24小時","約30天","約7天"], a:0, e:"公轉一圈約365天，形成四季變化。", d:["地球公轉","四季"],
      alts:[
        { q:"地球上的「四季變化」是由什麼原因造成的？", opts:["地球公轉＋地軸傾斜","地球自轉","月球公轉","太陽黑子活動"], a:0, e:"地球公轉時地軸傾斜，使各地得到的陽光多寡不同，形成四季。" },
        { q:"北半球夏天時，太陽直射在哪個位置附近？", opts:["北回歸線附近","赤道","南回歸線","北極"], a:0, e:"夏至時太陽直射北回歸線（約北緯23.5°），北半球獲得最多陽光。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[2], q:"「溫室效應」加劇，主要是哪種氣體增加造成的？", opts:["二氧化碳（CO₂）","氧氣（O₂）","氮氣（N₂）","氫氣（H₂）"], a:0, e:"工業排放大量CO₂等溫室氣體，使地球溫度升高。", d:["溫室效應","環境"],
      alts:[
        { q:"適當的溫室效應對地球的作用是？", opts:["讓地球維持適合生物生存的溫度","讓地球不斷升溫","破壞臭氧層","造成酸雨"], a:0, e:"適度的溫室效應使地球不至於太冷，但過度則造成暖化。" },
        { q:"下列哪個行為最能減少溫室氣體排放？", opts:["騎腳踏車代替開車","使用更多塑膠","增加工廠生產","多開冷氣"], a:0, e:"減少化石燃料燃燒，是降低CO₂排放的有效方式。" },
      ]},
    /* 補充 G4 自然題 */
    { minGrade:4, maxGrade:5, semesters:[1,2], q:"下列哪個是導電體？", opts:["銅線","橡皮擦","木棒","塑膠尺"], a:0, e:"銅是金屬，是良導體；橡皮、木頭、塑膠是絕緣體。", d:["導體絕緣體","電"],
      alts:[
        { q:"哪種材料是「絕緣體」（不導電）？", opts:["橡皮","銅","鐵","鋁"], a:0, e:"橡皮是絕緣體，常用於電線外皮。" },
      ]},
    { minGrade:4, maxGrade:4, semesters:[2], q:"青蛙屬於哪一類動物？", opts:["兩棲類","爬蟲類","魚類","哺乳類"], a:0, e:"青蛙幼體（蝌蚪）在水中生活，成體在陸地，是兩棲類。", d:["動物分類"],
      alts:[
        { q:"「蝌蚪」長大後變成哪種動物？", opts:["青蛙","蜥蜴","魚","烏龜"], a:0, e:"蝌蚪是青蛙的幼體，經過變態發育變成青蛙。" },
      ]},
    { minGrade:3, maxGrade:4, semesters:[1,2], q:"做實驗時，要確認結論，最重要的是什麼？", opts:["每次只改變一個變因","換不同的場地","多找幾個同學幫忙","盡量快速完成"], a:0, e:"科學實驗的「控制變因」原則：每次只改一個條件，才能找出真正的原因。", d:["科學方法","實驗設計"],
      alts:[
        { q:"實驗中「對照組」的目的是？", opts:["提供比較基準，確認實驗結果","增加趣味","讓實驗更快完成","沒有特別目的"], a:0, e:"對照組不做改變，作為比較基準，確認實驗效果。" },
        { q:"「科學方法」的正確步驟順序是？", opts:["觀察→問題→假設→實驗→結論","假設→實驗→觀察→結論","結論→觀察→假設→實驗","實驗→假設→觀察→結論"], a:0, e:"科學方法：觀察現象→提出問題→形成假設→設計實驗→得出結論。" },
        { q:"記錄實驗數據時，哪種方式最科學？", opts:["用數字和圖表記錄真實數據","只記得住的部分","只寫結論不記過程","只觀察不記錄"], a:0, e:"科學記錄需完整、客觀、使用數字和圖表。" },
      ]},
    /* ── 補充 G3-4 自然（物質、力學） ── */
    { minGrade:3, maxGrade:4, semesters:[1,2], q:"用力推一個靜止的物體，物體會怎樣？", opts:["往施力方向移動","往反方向移動","原地不動","消失"], a:0, e:"力可以讓物體移動，方向與施力方向相同。", d:["力與運動"],
      alts:[
        { q:"滾動的球放著不管，最終會停下來，原因是？", opts:["摩擦力使球減速","球自己想停","重力增加","空氣消失"], a:0, e:"摩擦力會讓移動中的物體持續減速，最終停止。" },
        { q:"「彈力」是什麼？", opts:["物體被拉伸或壓縮後恢復原狀的力","使物體向下的力","使物體漂浮的力","聲音傳遞的力"], a:0, e:"彈力是彈性物體（如彈簧、橡皮筋）被形變後的回彈力。" },
        { q:"水中的物體受到什麼力使它能漂浮？", opts:["浮力","重力","摩擦力","彈力"], a:0, e:"液體對其中物體施加向上的力叫做浮力。" },
      ]},
    /* ── 補充 G5 自然（力、物質特性） ── */
    { minGrade:5, maxGrade:5, semesters:[1,2], q:"「密度」的定義是什麼？", opts:["單位體積的質量（質量÷體積）","體積÷質量","質量×體積","重量÷面積"], a:0, e:"密度 = 質量 ÷ 體積（g/cm³）。密度越大，相同體積越重。", d:["密度","物質"],
      alts:[
        { q:"鐵塊沉在水中，水的浮力使它「稍微輕一點」，是什麼原因？", opts:["鐵塊排開水的重量就是浮力","鐵比水重所以沉","浮力讓鐵變輕","水沒有力量"], a:0, e:"阿基米德原理：浮力 = 排開液體的重量。" },
        { q:"「熱脹冷縮」現象說明了什麼？", opts:["物質受熱體積增大，冷卻體積縮小","物質加熱後質量增加","冷卻會使物質消失","熱量讓物質變輕"], a:0, e:"大多數物質受熱分子運動加快，間距增大，體積膨脹。" },
        { q:"鋼鐵橋樑為什麼要留「伸縮縫」？", opts:["夏天熱脹會延長，預留空間","防止鏽蝕","增加美觀","讓車輛減速"], a:0, e:"鋼鐵熱脹冷縮，若不留縫，夏天熱脹會使橋變形。" },
      ]},
    { minGrade:5, maxGrade:6, semesters:[1,2], q:"「電磁鐵」和一般磁鐵最大的差異是？", opts:["通電才有磁性，可以開關控制","永遠有磁性","只吸引金屬","無法改變磁力大小"], a:0, e:"電磁鐵通電時產生磁性，斷電後磁性消失，可以靈活控制。", d:["電磁鐵"],
      alts:[
        { q:"增加電磁鐵磁力的方法是？", opts:["增加線圈圈數或增大電流","減少電流","使用更粗的鐵芯","降低電壓"], a:0, e:"電磁鐵磁力與線圈圈數和電流大小成正比。" },
        { q:"電磁鐵的應用包括哪些？", opts:["電動馬達、磁浮列車、電鈴","只有電鈴","只有馬達","只有揚聲器"], a:0, e:"電磁鐵廣泛用於馬達、揚聲器、磁浮、起重機等。" },
        { q:"「簡單機械」中，「槓桿」的三要素是？", opts:["支點、施力點、抗力點","起點、中點、終點","力、速度、加速度","長度、寬度、高度"], a:0, e:"槓桿三要素：支點（旋轉中心）、施力點（出力位置）、抗力點（負重位置）。" },
        { q:"使用「斜面」（坡道）的好處是？", opts:["可以用較小的力搬運物體，但距離較長","需要更大的力","速度更快","完全省力"], a:0, e:"斜面是簡單機械，可減小所需施力，但力的方向沿斜面，距離較長。" },
      ]},
    /* ── 補充 G6 自然 ── */
    { minGrade:6, maxGrade:6, semesters:[1,2], q:"「月相」（月亮圓缺變化）的週期約是多少天？", opts:["約29.5天","約7天","約365天","約24小時"], a:0, e:"月球公轉地球週期約29.5天，形成月相週期。", d:["月相","天文"],
      alts:[
        { q:"「日食」發生時，月球在什麼位置？", opts:["月球在地球和太陽中間（新月）","月球在地球背面（滿月）","月球在太陽和地球外側","月球在地球旁邊"], a:0, e:"日食：太陽→月球→地球（月球擋住太陽）。" },
        { q:"「月食」發生時，是什麼遮住了月亮？", opts:["地球的影子（地球在太陽和月球中間）","月球自己的影子","雲朵","太陽的光消失"], a:0, e:"月食：太陽→地球→月球（地球影子遮住月球）。" },
        { q:"台灣每年約5-6月的梅雨，原因是？", opts:["冷暖氣團交會，鋒面滯留","火山爆發","太陽直射台灣","颱風增多"], a:0, e:"梅雨是冷暖氣團在台灣附近碰撞，鋒面停滯造成的長期降雨。" },
        { q:"台灣颱風最常發生在幾月？", opts:["7-9月（夏秋）","1-3月","12-2月","4-6月"], a:0, e:"台灣颱風季主要在7至9月，是夏秋季的天氣現象。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[1,2], q:"「宇宙」由哪些主要成分組成？", opts:["星系、恆星、行星、氣體和塵埃","只有地球和太陽","只有空氣和水","只有陸地和海洋"], a:0, e:"宇宙包含無數星系（如銀河系），每個星系含有數十億顆恆星和行星。", d:["宇宙","天文"],
      alts:[
        { q:"太陽系中，距離太陽最近的行星是？", opts:["水星","金星","地球","火星"], a:0, e:"水星是太陽系最靠近太陽的行星，公轉週期最短（88天）。" },
        { q:"「黑洞」是什麼？", opts:["重力極強，連光都無法逃脫的天體","很黑的石頭","宇宙中的空洞","沒有光的地方"], a:0, e:"黑洞是極大質量天體，重力強到連光都無法逃離。" },
        { q:"「銀河系」是什麼？", opts:["包含太陽系在內的星系（約2000億顆恆星）","一條河流","一個星球","宇宙全部"], a:0, e:"銀河系是螺旋星系，太陽系是其中一個小系統。" },
      ]},
  ];
  function genScience(g, s, i) { return genFromBank("自然", g, s, i, SCI_BANK); }

  /* ════════════════════════════════════════
     社會（G1-G6，每年級學期 20+ 題）
  ════════════════════════════════════════ */
  var SOC_BANK = [
    /* ── G1-2 S1：校園、家庭、交通 ── */
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"在學校走廊，應該怎麼走路？", opts:["靠右慢行","快跑搶先","任意奔跑","走中間不讓人"], a:0, e:"走廊靠右慢走，是安全禮儀。", d:["校園安全"],
      alts:[
        { q:"在學校借到圖書館的書，應該怎麼辦？", opts:["依時間歸還","不用還","帶回家送人","藏起來自己用"], a:0, e:"借書要按時歸還，是負責任的行為。" },
        { q:"在教室搶答時，應該怎麼做？", opts:["舉手等老師叫名字","直接大聲說出來","傳紙條給同學","不回答"], a:0, e:"舉手發言是課堂禮儀。" },
        { q:"發現同學的東西掉了，應該怎麼做？", opts:["歸還給失主或交給老師","撿起來自己用","放著不管","丟到垃圾桶"], a:0, e:"拾物歸還是誠實的好品德。" },
        { q:"上課的時候，你應該怎麼做？", opts:["專心聽講，有問題舉手","玩手機","和旁邊的人聊天","睡覺"], a:0, e:"上課專心聽講，有問題先舉手是好的學習態度。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"下列哪一個人是你的「家庭成員」？", opts:["爸爸","鄰居小孩","商店老闆","老師"], a:0, e:"爸爸是家人，屬家庭成員。", d:["家庭"],
      alts:[
        { q:"阿嬤（奶奶）在家庭關係中是你的？", opts:["祖母","父母","兄弟姊妹","老師"], a:0, e:"阿嬤是祖母，屬直系親屬。" },
        { q:"下列哪一種是「家庭的功能」？", opts:["提供生活照顧與情感支持","管理交通","制定法律","收稅"], a:0, e:"家庭提供成員食衣住行與情感支持。" },
        { q:"每個家庭都要共同遵守的規則叫做？", opts:["家規","法律","班規","校規"], a:0, e:"家庭自己訂的規矩叫家規。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"行人過馬路遇到紅燈，應該怎麼做？", opts:["停下來等綠燈","加速通過","閉眼衝過去","繞路"], a:0, e:"紅燈停，綠燈行。", d:["交通安全"],
      alts:[
        { q:"騎腳踏車時，應該怎麼做才安全？", opts:["戴安全帽，靠右行駛","不戴帽子，走中間","邊騎邊玩手機","逆向行駛"], a:0, e:"戴安全帽、靠右騎是基本腳踏車安全規則。" },
        { q:"乘坐公車時，哪個行為是正確的？", opts:["排隊上車，讓老弱婦孺先坐","推擠搶座位","在車上大吵大鬧","不買票直接上車"], a:0, e:"排隊和禮讓是乘坐大眾交通工具的禮儀。" },
        { q:"如果在路上迷路，最安全的做法是？", opts:["向警察或商店人員求助","跟陌生人走","一直往前走","原地等待"], a:0, e:"向警察或熟悉的大人（如店員）求助是安全的。" },
      ]},
    /* ── G1-2 S2：職業、消費、節慶 ── */
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"消防員的主要工作是什麼？", opts:["滅火與緊急救援","教書與輔導","種菜販賣","修理電器"], a:0, e:"消防員負責撲滅火災和緊急救難。", d:["社區職業"],
      alts:[
        { q:"醫生的主要工作是什麼？", opts:["治療病人","送包裹","教書","開飛機"], a:0, e:"醫生診斷和治療病人，保護健康。" },
        { q:"警察的主要職責是什麼？", opts:["維護治安，保護人民安全","種植農作物","建造房子","教育學生"], a:0, e:"警察維護社會秩序與人民安全。" },
        { q:"「農夫」的工作主要是？", opts:["種植農作物，生產食物","修理汽車","建造道路","教育學生"], a:0, e:"農夫耕種，提供糧食，屬農業。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"在超市買完東西，應該怎麼做？", opts:["到收銀台結帳付款","直接帶走","把東西還回去","隨意放著"], a:0, e:"購物必須付款，這是消費的基本規範。", d:["消費行為"],
      alts:[
        { q:"買東西時收到找錯的錢（多找了），應該？", opts:["誠實告知並退還多餘的錢","偷偷帶走","假裝沒發現","下次再說"], a:0, e:"誠實退還是道德行為。" },
        { q:"農曆新年是哪個季節的節慶？", opts:["冬末春初","夏天","秋天","深冬"], a:0, e:"農曆新年（春節）通常在國曆一月或二月，是冬末春初。" },
        { q:"「中秋節」最主要的習俗是？", opts:["賞月、吃月餅","放鞭炮、拿紅包","提燈籠、猜燈謎","祭祖、掃墓"], a:0, e:"中秋節的傳統是全家賞月和吃月餅。" },
      ]},
    /* ── G3 S1-2：地圖、社區、產業 ── */
    { minGrade:3, maxGrade:3, semesters:[1,2], q:"地圖上的「圖例（凡例）」是用來做什麼的？", opts:["說明地圖上各種符號的意義","表示地圖的方向","記錄地圖的出版日期","說明比例尺大小"], a:0, e:"圖例解釋地圖上的符號。", d:["地圖閱讀"],
      alts:[
        { q:"地圖上通常用什麼顏色代表「河流和海洋」？", opts:["藍色","綠色","紅色","棕色"], a:0, e:"水域（河流、海洋）通常以藍色表示。" },
        { q:"地圖上「方位標」（指南針符號）用來指示什麼？", opts:["地圖上的方向（東西南北）","地圖的比例","地圖的出版時間","地圖的高度"], a:0, e:"方位標告訴你地圖上哪方是北方，幫助辨認方向。" },
        { q:"地圖上用綠色表示哪種地形？", opts:["平原或低地","山地","水域","沙漠"], a:0, e:"地形圖通常用綠色表示低海拔的平原，棕色表示山地。" },
        { q:"地圖上用棕色或深咖啡色通常表示什麼地形？", opts:["高山（高海拔）","海洋","沙漠","平原"], a:0, e:"地形圖中，顏色愈深代表海拔愈高，棕色表示高山。" },
      ]},
    { minGrade:3, maxGrade:4, semesters:[1,2], q:"「種植稻米」屬於哪一種產業？", opts:["農業（第一級）","工業（第二級）","服務業（第三級）","漁業（第四級）"], a:0, e:"種植農作物屬第一級產業（農業）。", d:["產業分類"],
      alts:[
        { q:"「製造汽車」屬於哪一種產業？", opts:["工業（第二級）","農業（第一級）","服務業（第三級）","林業"], a:0, e:"製造業屬第二級產業（工業）。" },
        { q:"「理髮師幫客人剪頭髮」屬於哪一種產業？", opts:["服務業（第三級）","農業（第一級）","工業（第二級）","漁業"], a:0, e:"提供服務給他人的行業屬第三級產業（服務業）。" },
        { q:"「捕魚」屬於哪一種產業？", opts:["漁業（第一級）","工業（第二級）","服務業（第三級）","製造業"], a:0, e:"漁業（捕撈水產）屬第一級產業。" },
        { q:"「都市」和「鄉村」比較，下列哪項說法正確？", opts:["都市人口密度較高","鄉村人口較都市多","都市農地較廣","兩者沒有差別"], a:0, e:"都市人口集中，密度高；鄉村人口較分散。" },
      ]},
    /* ── G4 S1-2：比例尺、台灣地理 ── */
    { minGrade:4, maxGrade:4, semesters:[1,2], q:"地圖的「比例尺」有什麼用途？", opts:["換算地圖距離與實際距離","說明地圖顏色","標出方向","記錄出版年份"], a:0, e:"比例尺 = 圖上距離 ÷ 實際距離，換算實際距離。", d:["比例尺","地圖"],
      alts:[
        { q:"地圖比例尺「1：100000」表示圖上 1 公分等於實際多少公尺？", opts:["1000 公尺","100 公尺","10 公尺","10000 公尺"], a:0, e:"1公分 × 100000 = 100000公分 = 1000公尺（1公里）。" },
        { q:"比例尺「較大」（如1:1000）和「較小」（如1:100000）相比，哪個顯示範圍較廣？", opts:["比例尺較小（1:100000）","比例尺較大（1:1000）","一樣大","無法比較"], a:0, e:"比例尺分母越大（數值越小），顯示範圍越廣，細節越少。" },
      ]},
    { minGrade:4, maxGrade:4, semesters:[1,2], q:"台灣的地形主要是？", opts:["東部多山、西部有平原","全部是平原","全是沙漠","全是高原"], a:0, e:"台灣東部山脈多，西部為平原。", d:["台灣地形"],
      alts:[
        { q:"台灣「中央山脈」的走向大致是？", opts:["南北走向","東西走向","斜角","環形"], a:0, e:"中央山脈大致沿南北方向貫穿台灣。" },
        { q:"台灣西部有廣大平原，農業發達，原因是？", opts:["地勢平坦，利於耕種","氣候寒冷","土壤貧瘠","缺乏水源"], a:0, e:"西部平原地勢平坦，土壤肥沃，適合農業。" },
        { q:"台灣位於哪兩個板塊的交界？", opts:["歐亞板塊與菲律賓海板塊","太平洋板塊與北美板塊","非洲板塊與印度板塊","南美板塊與南極板塊"], a:0, e:"台灣位於歐亞板塊與菲律賓海板塊的碰撞帶，地震多。" },
      ]},
    { minGrade:4, maxGrade:4, semesters:[2], q:"台灣最長的河流是哪條？", opts:["濁水溪","高屏溪","淡水河","秀姑巒溪"], a:0, e:"濁水溪全長約186公里，是台灣最長的河流。", d:["台灣地理"],
      alts:[
        { q:"台灣面積最大的湖泊是？", opts:["日月潭","澄清湖","鯉魚潭","嘉南大圳"], a:0, e:"日月潭是台灣最大的天然湖泊。" },
        { q:"台灣有哪個地名靠近北回歸線？", opts:["嘉義","台北","高雄","花蓮"], a:0, e:"北回歸線通過台灣嘉義附近（北緯23.5°）。" },
        { q:"台灣最高峰「玉山」位於哪個縣？", opts:["南投縣（與嘉義縣交界）","台北市","高雄市","宜蘭縣"], a:0, e:"玉山主峰在南投縣，海拔3952公尺。" },
      ]},
    { minGrade:5, maxGrade:5, semesters:[1,2], q:"台灣政府「行政院」的主要功能是？", opts:["推動政策與行政事務","制定法律","審判訴訟","發行貨幣"], a:0, e:"行政院是最高行政機關，負責施政與推動政策。", d:["政府組織","三權分立"],
      alts:[
        { q:"台灣「司法院」主要負責什麼？", opts:["審判訴訟、解釋憲法","制定法律","推動行政","發行貨幣"], a:0, e:"司法院是最高司法機關，負責審判與憲法解釋。" },
        { q:"台灣三權分立中，哪個機關負責「行政」？", opts:["行政院","立法院","司法院","考試院"], a:0, e:"行政院掌行政權，立法院掌立法權，司法院掌司法權。" },
      ]},
    { minGrade:5, maxGrade:5, semesters:[1,2], q:"「立法院」的主要功能是？", opts:["制定與修改法律","推動行政","審理訴訟","管理稅務"], a:0, e:"立法院負責立法（制定、修改法律）。", d:["政府組織","民主"],
      alts:[
        { q:"台灣的「立法委員」主要工作是？", opts:["審查法案、代表民意","推動行政政策","審判案件","管理軍隊"], a:0, e:"立法委員在立法院審查並通過法律。" },
        { q:"如果你覺得某個法律不合理，應該透過什麼管道修改？", opts:["請立法院委員提案修法","請法院判無效","自己不遵守就好","向行政院抗議罷課"], a:0, e:"修改法律要透過立法院的正式程序。" },
      ]},
    { minGrade:5, maxGrade:6, semesters:[1,2], q:"民主選舉的基本原則「一人一票」代表什麼？", opts:["每個合格選民的票都一樣重要","有錢人可以投多票","學歷高可以多投","官員票值比較高"], a:0, e:"民主選舉一人一票，票票等值，體現平等原則。", d:["民主","選舉制度"],
      alts:[
        { q:"「公民投票」的意義是？", opts:["由全體公民直接表決重要議題","只有官員才能投票","由政府決定結果","投票結果不算數"], a:0, e:"公投讓人民直接參與決策，是直接民主的形式。" },
        { q:"選舉時，投票權的基本資格（台灣）是？", opts:["年滿18歲的中華民國國民","年滿20歲","繳稅紀錄良好","有大學學歷"], a:0, e:"台灣修憲後，年滿18歲即有選舉權。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[1,2], q:"「全球暖化」主要是大氣中哪種氣體增加所造成？", opts:["二氧化碳（CO₂）","氧氣（O₂）","氮氣（N₂）","水蒸氣"], a:0, e:"CO₂等溫室氣體增加，造成地球平均氣溫上升。", d:["全球暖化","環境"],
      alts:[
        { q:"全球暖化可能造成哪種後果？", opts:["海平面上升，海岸淹水","沙漠縮小","冰川增多","降雨減少至消失"], a:0, e:"暖化→極地冰川融化→海平面上升→沿海地區淹水。" },
        { q:"減緩全球暖化，個人可以做什麼？", opts:["搭大眾運輸，減少開車","多用一次性餐具","增加肉類消費","多開暖氣"], a:0, e:"少開車可減少化石燃料燃燒，降低CO₂排放。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[1,2], q:"「永續發展」的核心精神是什麼？", opts:["滿足現代需求，同時不破壞後代的生存資源","盡量開採自然資源","只考慮當代人的利益","完全不使用任何自然資源"], a:0, e:"永續發展兼顧當代與後代的需求，平衡經濟、社會與環境。", d:["永續發展","公民"],
      alts:[
        { q:"「回收再利用」資源，主要對應永續發展的哪個面向？", opts:["環境保護，減少資源浪費","加速工業成長","增加人口","降低生活品質"], a:0, e:"回收可延長資源壽命，減少廢棄物，是環境永續的具體行動。" },
        { q:"國際上哪個文件最早提出「永續發展」的定義？", opts:["布倫特蘭報告（1987）","聯合國憲章","世界人權宣言","巴黎氣候協定"], a:0, e:"1987年布倫特蘭委員會報告定義了永續發展的概念。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[2], q:"台灣最北端的縣市是哪個？", opts:["基隆市","高雄市","花蓮縣","台東縣"], a:0, e:"基隆市位於台灣北部，常被視為最北端城市之一。", d:["台灣地理","縣市"],
      alts:[
        { q:"台灣最南端的縣市是哪個？", opts:["屏東縣（恆春）","高雄市","台南市","嘉義縣"], a:0, e:"屏東縣恆春半島是台灣本島最南端。" },
        { q:"台灣最大的縣（面積）是哪個？", opts:["花蓮縣","台北市","高雄市","台中市"], a:0, e:"花蓮縣面積約4628平方公里，是台灣最大的縣。" },
      ]},
    /* 補充 G3-4 社會 */
    { minGrade:3, maxGrade:4, semesters:[2], q:"台灣的「原住民族」約有幾個族群？", opts:["16族","3族","50族","8族"], a:0, e:"台灣政府官方認定的原住民族共16族。", d:["台灣文化","原住民"],
      alts:[
        { q:"台灣原住民的文化特色，下列何者正確？", opts:["各族有自己的語言、祭典和傳統文化","全部使用同一種語言","沒有特別的傳統祭典","只分布在都市地區"], a:0, e:"台灣16族原住民各有獨特的語言、祭典和傳統。" },
      ]},
    { minGrade:4, maxGrade:5, semesters:[1,2], q:"台灣「玉山」是哪種地形？", opts:["山地（高山）","平原","丘陵","盆地"], a:0, e:"玉山海拔3952公尺，是台灣最高峰，屬山地地形。", d:["台灣地形","山脈"],
      alts:[
        { q:"台灣西部為什麼多平原？", opts:["河流帶來沉積物堆積形成","地殼抬升","火山爆發","人工填海造陸"], a:0, e:"河流從山地帶來泥沙，在西部沉積，形成廣大平原。" },
        { q:"「台灣海峽」位於台灣的哪個方位？", opts:["西邊（台灣和中國大陸之間）","東邊","北邊","南邊"], a:0, e:"台灣海峽在台灣西側，介於台灣與中國大陸之間。" },
        { q:"台灣屬於哪種氣候類型？", opts:["亞熱帶和熱帶季風氣候","沙漠氣候","極地氣候","溫帶海洋性氣候"], a:0, e:"台灣大部分屬亞熱帶氣候，南部為熱帶氣候，雨量豐沛。" },
      ]},
    /* ── 補充 G3 社會（社區、資源、交通） ── */
    { minGrade:3, maxGrade:3, semesters:[1,2], q:"「城市」和「鄉村」比較，主要差異是什麼？", opts:["城市人口多、建設密集；鄉村人口少、自然環境多","城市比鄉村便宜","鄉村的工作機會比城市多","兩者完全相同"], a:0, e:"城市人口密集、商業發達；鄉村人口少、農業為主。", d:["城鄉差異","社區"],
      alts:[
        { q:"「社區」的意思是？", opts:["一群人共同居住和生活的地方","只有一棟大樓","政府辦公室","商業市場"], a:0, e:"社區是一群人共同生活的地域，有共同的設施和文化。" },
        { q:"以下哪種是「社區服務」？", opts:["派出所保護居民安全","工廠製造產品","農田種植","山裡採礦"], a:0, e:"派出所提供安全維護，是社區公共服務的一部分。" },
        { q:"買東西要去哪裡？", opts:["市場或商店","醫院","學校","派出所"], a:0, e:"市場和商店提供商品購買，是消費場所。" },
        { q:"台灣哪種交通工具連接島嶼之間？", opts:["船（渡輪）或飛機","火車","公車","腳踏車"], a:0, e:"離島（澎湖、金門等）靠船或飛機與台灣本島連接。" },
      ]},
    /* ── 補充 G3 社會（時間、節慶、消費） ── */
    { minGrade:3, maxGrade:3, semesters:[1,2], q:"農曆「春節」（過年）通常在幾月前後？", opts:["1月或2月","3月或4月","6月","11月"], a:0, e:"農曆年初一約在每年1-2月間（陽曆）。", d:["節慶","時間"],
      alts:[
        { q:"「端午節」主要習俗是？", opts:["吃粽子、划龍舟","吃月餅、賞月","放鞭炮、提燈籠","掃墓、祭祖"], a:0, e:"端午節（農曆五月初五）吃粽子、划龍舟，紀念屈原。" },
        { q:"「清明節」的主要習俗是？", opts:["掃墓祭祖","吃月餅","划龍舟","提燈籠猜謎"], a:0, e:"清明節（4月初）掃墓祭祖，緬懷先人。" },
        { q:"台灣的郵局主要提供哪種服務？", opts:["寄信、寄包裹、金融服務","看病","教書","出售食品"], a:0, e:"郵局負責郵件傳遞和部分金融（儲匯）業務。" },
        { q:"使用「信用卡」消費，最終還是需要付哪種錢？", opts:["新台幣（實際貨幣）","外幣","禮券","等值商品"], a:0, e:"信用卡是先消費後付款的工具，最終仍須支付新台幣。" },
      ]},
    /* ── 補充 G4-5 社會（歷史、行政、環境） ── */
    { minGrade:4, maxGrade:5, semesters:[1,2], q:"台灣行政區共有幾個「直轄市」？", opts:["6個","4個","8個","2個"], a:0, e:"台灣現有台北、新北、桃園、台中、台南、高雄共6個直轄市。", d:["台灣行政","地理"],
      alts:[
        { q:"台灣最多人口的城市是哪個？", opts:["新北市","台北市","台中市","高雄市"], a:0, e:"新北市人口約400萬，是台灣人口最多的城市。" },
        { q:"台灣的國際機場主要有哪兩個？", opts:["桃園國際機場、松山機場","台北車站、高雄車站","基隆港、高雄港","台中機場、嘉義機場"], a:0, e:"桃園國際機場是最主要的國際航空樞紐，松山機場以國內線為主。" },
        { q:"台灣鐵路「台灣高鐵」連接哪兩端？", opts:["台北和高雄","台北和花蓮","基隆和台東","台中和台南"], a:0, e:"台灣高鐵從台北（南港）通到高雄（左營），沿西部走廊行駛。" },
        { q:"「資源回收」主要是為了達到什麼目的？", opts:["減少廢棄物，保護環境","讓垃圾更多","美化社區","增加工作機會"], a:0, e:"資源回收讓可再用材料重複利用，減少環境污染。" },
      ]},
    /* ── 補充 G5-6 社會（公民、歷史、全球） ── */
    { minGrade:5, maxGrade:6, semesters:[1,2], q:"「荷蘭人」何時開始統治台灣？", opts:["1624年","1895年","1945年","1949年"], a:0, e:"1624年荷蘭東印度公司在台南建熱蘭遮城，開始統治台灣。", d:["台灣歷史"],
      alts:[
        { q:"「鄭成功」為什麼要攻打台灣（1661年）？", opts:["驅逐荷蘭人，以台灣為反清復明基地","建立新國家","逃避荷蘭人","尋找金礦"], a:0, e:"鄭成功1661年攻台，1662年荷蘭人撤退，以台灣延續明朝統治。" },
        { q:"台灣在哪一年成為日本殖民地？", opts:["1895年（馬關條約）","1624年","1945年","1949年"], a:0, e:"1895年清朝在甲午戰爭後簽馬關條約，將台灣割讓給日本。" },
        { q:"台灣在哪一年由日本統治結束（光復）？", opts:["1945年（二次大戰結束）","1895年","1624年","1949年"], a:0, e:"1945年日本二戰戰敗，台灣回歸中華民國。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[1,2], q:"「聯合國」（UN）的主要目的是什麼？", opts:["維護國際和平與安全，促進各國合作","管理世界各國的稅務","決定各國的領導人","統一全球的語言"], a:0, e:"聯合國1945年成立，以維護世界和平、促進人權與合作為目標。", d:["國際組織","全球"],
      alts:[
        { q:"「世界貿易組織」（WTO）的主要功能是？", opts:["規範國際貿易規則，促進自由貿易","管理世界軍事","統一各國貨幣","決定各國的法律"], a:0, e:"WTO促進國際貿易自由化，解決貿易紛爭。" },
        { q:"「全球化」帶來的挑戰包括哪些？", opts:["貧富差距擴大、文化多樣性消失","各國更平等","環境問題消失","所有人生活品質提升"], a:0, e:"全球化讓資本和商品快速流動，但也加劇不平等和文化同質化。" },
        { q:"「聯合國永續發展目標」（SDGs）共有幾項？", opts:["17項","5項","10項","30項"], a:0, e:"SDGs 17項目標（2015年通過），包括消除貧窮、氣候行動等。" },
        { q:"台灣是否為聯合國正式會員？", opts:["不是（因政治因素未獲接納）","是正式會員","是觀察員","剛剛加入"], a:0, e:"台灣因政治原因未能加入聯合國，但積極參與國際社會。" },
        { q:"「人口老化」是哪些國家面臨的共同問題？", opts:["許多已開發和開發中國家（包括台灣）","只有窮國","只有非洲國家","不是真正的問題"], a:0, e:"台灣出生率下降、老齡人口增加，面臨人口老化的挑戰。" },
        { q:"台灣為了推動「觀光」，主要有哪些吸引外國遊客的特色？", opts:["夜市美食、自然景觀、溫泉、文化","只有101大樓","只有海灘","只有高山"], a:0, e:"台灣以夜市文化、原住民文化、自然景觀（玉山、太魯閣）等吸引旅客。" },
      ]},
  ];
  function genSocial(g, s, i) { return genFromBank("社會", g, s, i, SOC_BANK); }

  /* ════════════════════════════════════════
     國語（G1-G6，每年級學期 20+ 題）
  ════════════════════════════════════════ */
  var ZH_BANK = [
    /* ── G1-2 S1：反義、標點、字形 ── */
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"「大」的反義詞是？", opts:["小","多","高","快"], a:0, e:"大↔小，語意相反。", d:["反義詞"],
      alts:[
        { q:"「熱」的反義詞是？", opts:["冷","涼","暖","燙"], a:0, e:"熱↔冷。" },
        { q:"「快」的反義詞是？", opts:["慢","小","少","低"], a:0, e:"快↔慢。" },
        { q:"「高」的反義詞是？", opts:["低","矮","短","窄"], a:0, e:"高↔低（高低指高度、位置）。" },
        { q:"「多」的反義詞是？", opts:["少","小","短","輕"], a:0, e:"多↔少。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"句子最後要表示疑問，應該用哪個標點符號？", opts:["？","。","，","！"], a:0, e:"疑問句用問號（？）結尾。", d:["標點符號"],
      alts:[
        { q:"「我很開心！」句子最後用哪個標點符號？", opts:["！","。","？","，"], a:0, e:"表示強烈情感（驚嘆）用驚嘆號（！）。" },
        { q:"「今天的功課是寫日記。」句子最後用哪個標點符號？", opts:["。","？","！","，"], a:0, e:"一般陳述句結尾用句號（。）。" },
        { q:"「小明說：「我要去打球。」」引號（「」）的作用是？", opts:["標示引用的話或說話內容","表示疑問","強調重點","分隔列舉"], a:0, e:"引號用來標示直接引用的說話內容。" },
        { q:"「我喜歡蘋果、橘子、香蕉。」列舉物品之間用哪個標點？", opts:["、（頓號）","，（逗號）","。（句號）","；（分號）"], a:0, e:"頓號（、）用來分隔並列的詞語。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"「明」字是由哪兩個部分組成的？", opts:["日＋月","木＋月","日＋木","人＋月"], a:0, e:"明 = 日 + 月，是會意字。", d:["字形","會意字"],
      alts:[
        { q:"「休」字是由哪兩個部分組成的？", opts:["人＋木","木＋土","人＋日","大＋木"], a:0, e:"休 = 人 + 木（人靠著樹休息），是會意字。" },
        { q:"「鳥」字屬於哪種造字方式？", opts:["象形（像鳥的樣子）","會意","形聲","指事"], a:0, e:"鳥字是象形字，形狀像鳥。" },
        { q:"「上」字是哪種造字方式？", opts:["指事（用符號表示位置）","象形","會意","形聲"], a:0, e:"上是指事字，用橫線和點表示「上面」的概念。" },
      ]},
    /* ── G1-2 S2：筆畫、部首、識字 ── */
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"「木」字共有幾畫？", opts:["4 畫","3 畫","5 畫","6 畫"], a:0, e:"木 = 橫、豎、撇、捺，共四畫。", d:["筆畫","識字"],
      alts:[
        { q:"「人」字共有幾畫？", opts:["2 畫","3 畫","1 畫","4 畫"], a:0, e:"人 = 撇、捺，共兩畫。" },
        { q:"「山」字共有幾畫？", opts:["3 畫","2 畫","4 畫","5 畫"], a:0, e:"山 = 豎、折、豎、折、豎，共三畫。" },
        { q:"「月」字共有幾畫？", opts:["4 畫","3 畫","5 畫","6 畫"], a:0, e:"月 = 橫折、橫折鉤、橫、橫，共四畫。" },
        { q:"「水」字共有幾畫？", opts:["4 畫","3 畫","5 畫","6 畫"], a:0, e:"水 = 豎鉤、點、點、撇，共四畫。" },
      ]},
    { minGrade:1, maxGrade:2, semesters:[1,2], q:"「媽」字的偏旁（部首）是什麼？", opts:["女字旁","木字旁","口字旁","心字旁"], a:0, e:"媽 = 女 + 馬，是女字旁。", d:["部首偏旁"],
      alts:[
        { q:"「河」字的部首是什麼？", opts:["三點水（氵）","木字旁","山字旁","日字旁"], a:0, e:"河 = 氵+ 可，三點水旁與水有關。" },
        { q:"「草」字的部首是什麼？", opts:["草字頭（艹）","木字旁","山字旁","土字底"], a:0, e:"草的部首是草字頭（艹），與植物有關。" },
        { q:"「銀」字的部首是什麼？", opts:["金字旁（釒）","木字旁","日字旁","口字旁"], a:0, e:"銀 = 釒+ 艮，金字旁與金屬有關。" },
        { q:"「跑」字的部首是什麼？", opts:["足字旁（𧾷）","手字旁","口字旁","心字旁"], a:0, e:"跑的部首是足字旁，與腳部動作有關。" },
      ]},
    /* ── G3 S1-2：近義反義、成語、連接詞 ── */
    { minGrade:3, maxGrade:3, semesters:[1,2], q:"「快樂」的近義詞最適合是哪個？", opts:["開心","悲傷","難過","憤怒"], a:0, e:"快樂與開心意思相近。", d:["近義詞"],
      alts:[
        { q:"「美麗」的近義詞是？", opts:["漂亮","醜陋","平凡","普通"], a:0, e:"美麗與漂亮意思相近。" },
        { q:"「討論」的近義詞是？", opts:["商量","爭吵","忽視","沉默"], a:0, e:"討論與商量意思相近，都是共同談話的意思。" },
        { q:"「勇敢」的反義詞是？", opts:["膽怯","謙虛","溫柔","努力"], a:0, e:"勇敢↔膽怯（懦弱）。" },
      ]},
    { minGrade:3, maxGrade:3, semesters:[1,2], q:"「明亮」的反義詞最適合是哪個？", opts:["黑暗","模糊","遙遠","乾淨"], a:0, e:"明亮↔黑暗，是光線強弱的反義。", d:["反義詞"],
      alts:[
        { q:"「寬廣」的反義詞是？", opts:["狹窄","廣大","寬闊","遼闊"], a:0, e:"寬廣↔狹窄（空間相反）。" },
        { q:"「堅硬」的反義詞是？", opts:["柔軟","輕盈","清透","光滑"], a:0, e:"堅硬↔柔軟（硬度相反）。" },
        { q:"「簡單」的反義詞是？", opts:["複雜","困難","麻煩","稀少"], a:0, e:"簡單↔複雜（難易程度相反）。" },
      ]},
    { minGrade:3, maxGrade:4, semesters:[1,2], q:"「守株待兔」這個成語，最主要諷刺什麼行為？", opts:["妄想不勞而獲","努力不懈","保護動物","種田勤奮"], a:0, e:"諷刺靠僥倖等待，不肯努力。", d:["成語","寓意"],
      alts:[
        { q:"「狐假虎威」的意思是？", opts:["借助別人的威勢嚇唬人","狐狸和老虎是朋友","假裝很厲害","老虎幫助狐狸"], a:0, e:"狐狸借老虎的威勢嚇跑百獸，比喻仗勢欺人。" },
        { q:"「三人成虎」這個成語告訴我們什麼道理？", opts:["謠言若多人傳說，就容易被誤信","老虎是危險動物","三個人比一個人強","相信朋友的話"], a:0, e:"比喻謠言傳得多了，人們就容易相信，提醒要謹慎求證。" },
        { q:"「葉公好龍」的意思是？", opts:["表面喜歡，其實並不真正喜歡","葉公是龍的朋友","葉公很勇敢","龍幫助了葉公"], a:0, e:"葉公口說愛龍，但真龍出現就嚇跑，比喻假喜好。" },
      ]},
    { minGrade:3, maxGrade:4, semesters:[1,2], q:"「雖然下雨，___他還是出門了。」空格填什麼最恰當？", opts:["但是","而且","所以","因為"], a:0, e:"「雖然…但是…」是轉折句型。", d:["連接詞","轉折"],
      alts:[
        { q:"「他不只聰明，___非常努力。」空格填什麼？", opts:["而且","但是","所以","雖然"], a:0, e:"「不只…而且…」是遞進關係。" },
        { q:"「如果明天沒下雨，我們___去爬山。」空格填什麼？", opts:["就","但是","雖然","因為"], a:0, e:"「如果…就…」是假設句型。" },
        { q:"「只要認真複習，___一定能考好。」空格填什麼？", opts:["就","但是","雖然","如果"], a:0, e:"「只要…就…」是條件句型，表示充分條件。" },
      ]},
    { minGrade:3, maxGrade:4, semesters:[2], q:"「畫蛇添足」的意思是？", opts:["做了多餘的事，反而壞了好事","蛇很有力量","畫畫技術很好","添加很多食物"], a:0, e:"多此一舉，做了不必要的事，反而壞了好事。", d:["成語","寓意"],
      alts:[
        { q:"「亡羊補牢」比喻什麼？", opts:["出了問題後補救，為時未晚","羊跑掉之後什麼都做不了","要預防問題發生","已經太遲，無法補救"], a:0, e:"比喻事情出了差錯後補救，還不算太遲。" },
        { q:"「掩耳盜鈴」用來形容？", opts:["自欺欺人，以為別人不知道","偷鈴鐺的人","說謊的後果","捂住耳朵的動作"], a:0, e:"掩耳盜鈴：自己騙自己，以為捂住耳朵鈴聲就消失了。" },
      ]},
    { minGrade:3, maxGrade:4, semesters:[2], q:"「因為天氣晴朗，___我們去爬山。」空格填什麼？", opts:["所以","但是","雖然","如果"], a:0, e:"「因為…所以…」是因果句型。", d:["連接詞","因果"],
      alts:[
        { q:"「他努力讀書，___考上了好學校。」空格填什麼？", opts:["因此","但是","雖然","如果"], a:0, e:"「因此」表示結果，是因果連接詞。" },
        { q:"「他___沒有考好，___沒有灰心。」適合填什麼？", opts:["雖然…但是","因為…所以","如果…就","只要…就"], a:0, e:"「雖然…但是…」表示轉折（考不好，但不灰心）。" },
      ]},
    { minGrade:4, maxGrade:4, semesters:[1,2], q:"「她的笑容像太陽一樣溫暖」使用了哪種修辭？", opts:["明喻（譬喻）","暗喻","擬人","排比"], a:0, e:"「像…一樣」是明喻，直接用比喻詞連接本體與喻體。", d:["修辭","明喻"] },
    { minGrade:4, maxGrade:5, semesters:[1,2], q:"「花朵向我微笑，樹葉對我招手」使用了哪種修辭？", opts:["擬人","明喻","排比","誇飾"], a:0, e:"把植物當成人來描述（微笑、招手），是擬人法。", d:["修辭","擬人"] },
    { minGrade:5, maxGrade:5, semesters:[1,2], q:"「他的聲音大得能震破天花板！」使用了哪種修辭？", opts:["誇飾","明喻","排比","擬人"], a:0, e:"誇大聲音的程度（不可能真的震破），是誇飾法。", d:["修辭","誇飾"],
      alts:[
        { q:"「她哭了一萬年，眼淚都流乾了！」使用了哪種修辭？", opts:["誇飾","明喻","擬人","借代"], a:0, e:"「哭了一萬年」誇大程度，是誇飾法。" },
        { q:"「老師有三頭六臂，什麼事都難不倒他。」使用了哪種修辭？", opts:["誇飾","暗喻","排比","設問"], a:0, e:"「三頭六臂」誇大老師能力，是誇飾。" },
      ]},
    { minGrade:5, maxGrade:5, semesters:[1,2], q:"「與其後悔，不如現在努力。」是哪種複句？", opts:["選擇複句","因果複句","假設複句","轉折複句"], a:0, e:"「與其…不如…」是選擇複句，在兩者中做選擇。", d:["句型","複句"],
      alts:[
        { q:"「如果明天下雨，我們就改在室內上體育課。」是哪種複句？", opts:["假設複句","因果複句","轉折複句","遞進複句"], a:0, e:"「如果…就…」表示假設條件，是假設複句。" },
        { q:"「他雖然很累，但是仍然堅持完成任務。」是哪種複句？", opts:["轉折複句","因果複句","假設複句","選擇複句"], a:0, e:"「雖然…但是…」語意有轉折，是轉折複句。" },
      ]},
    { minGrade:5, maxGrade:6, semesters:[1,2], q:"「讀了又讀，想了又想，放不下手中的書。」用了哪種修辭？", opts:["反覆（排比）","明喻","誇飾","設問"], a:0, e:"重複相同句型以強調情感，是反覆（也有排比的效果）。", d:["修辭","反覆排比"],
      alts:[
        { q:"「山外有山，天外有天，人外有人。」使用了哪種修辭？", opts:["排比","明喻","擬人","誇飾"], a:0, e:"三個句子結構相同、語意遞進，是排比。" },
        { q:"「月亮月亮，你為什麼那麼圓？」使用了哪種修辭？", opts:["設問（反問）兼擬人","明喻","排比","誇飾"], a:0, e:"問月亮是擬人，自問問題是設問，兼含兩種修辭。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[1,2], q:"「春風又綠江南岸」中，「綠」字屬於哪種特殊用法？", opts:["動詞活用（使江南岸變綠）","名詞","普通形容詞","副詞"], a:0, e:"「綠」本是形容詞，此處用如動詞，有「吹綠了、使…變綠」之意，是詞性活用。", d:["詞性活用","古詩"],
      alts:[
        { q:"「春眠不覺曉，處處聞啼鳥」中「啼鳥」的意思是？", opts:["啼叫的鳥","啼哭的人","受傷的鳥","籠中的鳥"], a:0, e:"啼鳥即鳴叫的鳥，春天清晨鳥鳴四起。" },
        { q:"下列哪句詩描述了「離別之情」？", opts:["勸君更盡一杯酒，西出陽關無故人","床前明月光，疑是地上霜","鋤禾日當午，汗滴禾下土","春眠不覺曉，處處聞啼鳥"], a:0, e:"「西出陽關無故人」表達送別友人之不捨。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[2], q:"「疑是銀河落九天」使用了哪兩種修辭？", opts:["誇飾＋明喻","擬人＋排比","設問＋借代","反覆＋對偶"], a:0, e:"誇大瀑布從天而降的氣勢（誇飾），同時把瀑布比喻為銀河（明喻）。", d:["修辭","古詩欣賞"],
      alts:[
        { q:"「月落烏啼霜滿天」的意境，主要表達什麼情感？", opts:["孤寂與愁苦","喜悅與興奮","憤怒與不滿","平靜與滿足"], a:0, e:"秋夜霜寒、鳥啼聲中，傳達旅途孤寂的愁緒。" },
        { q:"「舉頭望明月，低頭思故鄉」使用了哪種修辭？", opts:["對偶","誇飾","排比","明喻"], a:0, e:"「舉頭」對「低頭」，「望明月」對「思故鄉」，上下句相對，是對偶。" },
      ]},
    /* 補充 G4-G5 國語 */
    { minGrade:4, maxGrade:4, semesters:[1,2], q:"「他的眼睛是一對會發光的星星」使用了哪種修辭？", opts:["暗喻（隱喻）","明喻","擬人","排比"], a:0, e:"沒有用「像」，直接說眼睛「是」星星，是暗喻（隱喻）。", d:["修辭","暗喻"],
      alts:[
        { q:"「明喻」和「暗喻」最主要的差別是什麼？", opts:["明喻用「像/如/似」，暗喻用「是」","明喻比暗喻更厲害","暗喻比明喻更常用","兩者完全相同"], a:0, e:"明喻有比喻詞（像、如），暗喻直接說「本體是喻體」。" },
      ]},
    { minGrade:5, maxGrade:6, semesters:[1,2], q:"「難道他不知道這樣做是錯的嗎？」這句話屬於？", opts:["反問（設問）","一般問句","感嘆句","祈使句"], a:0, e:"「難道…嗎？」明知故問，是反問，強調「他一定知道」。", d:["修辭","反問設問"],
      alts:[
        { q:"「雨是否下夠了？花是否開夠了？」使用了哪種修辭？", opts:["設問（連續問）","排比","誇飾","擬人"], a:0, e:"連續問句自問自答（或引發思考），是設問；形式上也有排比。" },
      ]},
    { minGrade:4, maxGrade:5, semesters:[1,2], q:"「他不但努力用功，而且樂於助人。」是哪種複句？", opts:["遞進複句","轉折複句","假設複句","選擇複句"], a:0, e:"「不但…而且…」層層遞進，是遞進複句。", d:["複句","句型"],
      alts:[
        { q:"「他要嘛去台北，要嘛留在台南，兩者選一。」是哪種複句？", opts:["選擇複句","假設複句","因果複句","遞進複句"], a:0, e:"「要嘛…要嘛…」在兩個選項中選一，是選擇複句。" },
        { q:"「只要努力，就一定能成功。」是哪種複句？", opts:["條件複句","假設複句","轉折複句","因果複句"], a:0, e:"「只要…就…」表示充分條件，是條件複句。" },
        { q:"「即使失敗，他依然不放棄。」是哪種複句？", opts:["讓步複句（雖然…即使…）","因果複句","假設複句","選擇複句"], a:0, e:"「即使…依然…」是讓步複句（退一步說，結果還是一樣）。" },
      ]},
    /* ── 補充 G3-4 國語（詞性、形聲字） ── */
    { minGrade:3, maxGrade:4, semesters:[1,2], q:"「媽、妹、姐、她」這些字共同的特徵是？", opts:["都有女字旁，與女性有關","都有三點水","都是四個字","都有口字旁"], a:0, e:"女字旁的字通常與女性、女性相關事物有關（形聲或表意）。", d:["部首","字形"],
      alts:[
        { q:"「河、海、洗、泳」這些字共同的特徵是？", opts:["都有三點水（氵），與水有關","都有木字旁","都是動詞","都有四個筆畫"], a:0, e:"三點水（氵）的字通常與水有關，如河、洗、游等。" },
        { q:"「形聲字」的特點是？", opts:["一部分表示意思（形），一部分表示聲音（聲）","全部表示意思","全部表示聲音","由兩個意思合成"], a:0, e:"形聲字：形旁表意，聲旁表音，如「媽」=女+馬（聲）。" },
        { q:"「青蛙的青（qīng）」、「清水的清（qīng）」聲音相同，原因是？", opts:["兩字都有相同的聲旁「青」","兩字意思相同","兩字筆畫相同","兩字都很常用"], a:0, e:"形聲字中，有相同聲旁的字讀音往往相近（如青、清、晴、情）。" },
      ]},
    /* ── 補充 G4-5 國語（詞性、修辭深化） ── */
    { minGrade:4, maxGrade:5, semesters:[1,2], q:"「天空很藍，雲很白，風很涼」這句話使用了哪種修辭？", opts:["排比","明喻","誇飾","擬人"], a:0, e:"三個結構相同的句子並列，是排比。", d:["修辭","排比"],
      alts:[
        { q:"「他心裡有一團火，燃燒著希望。」使用了哪種修辭？", opts:["暗喻（把心情比作火）","明喻","排比","設問"], a:0, e:"沒有用「像」，直接說「有一團火」，是暗喻。" },
        { q:"「妹妹甜甜地笑，讓我心情好起來。」「甜甜地」是什麼詞性？", opts:["副詞（修飾動詞「笑」）","形容詞","名詞","動詞"], a:0, e:"副詞修飾動詞，「甜甜地」描述「笑」的方式。" },
        { q:"「她的笑容是春天的陽光」，是哪種修辭？", opts:["暗喻","明喻","誇飾","擬人"], a:0, e:"直接說「笑容是陽光」（沒有用「像」），是暗喻。" },
        { q:"「天哪，我真的太喜歡這首歌了！」句子的語氣是？", opts:["感嘆句","陳述句","疑問句","祈使句"], a:0, e:"用驚嘆號，表示強烈情感，是感嘆句。" },
      ]},
    /* ── 補充 G5-6 國語 ── */
    { minGrade:5, maxGrade:6, semesters:[1,2], q:"「文章的主旨」是指什麼？", opts:["文章最核心的意思或想傳達的重點","文章最長的那一段","文章的第一段","文章的字數"], a:0, e:"主旨就是作者最想表達的中心思想，通常在文章中反覆強調。", d:["閱讀理解","文章結構"],
      alts:[
        { q:"「段落主題句」通常出現在段落的哪個位置？", opts:["段落開頭（有時在結尾）","段落中間","隨意位置","每隔三句"],a:0, e:"主題句點出段落重點，最常見於段落開頭（起始句）。" },
        { q:"閱讀時「推論」指的是？", opts:["根據文中線索，理解沒有直接說出的意思","只讀字面意思","猜測作者的年齡","計算字數"], a:0, e:"推論是讀者根據文章提供的資訊，做出合理判斷。" },
        { q:"「修辭」的主要目的是？", opts:["使語言更生動、有力，增強表達效果","讓文章更長","讓讀者看不懂","減少字數"], a:0, e:"修辭手法讓語言更形象、生動，加強表達力。" },
        { q:"「借代」修辭是什麼意思？", opts:["用相關事物代替本名（如：用「布衣」代替平民）","用比喻","用誇大的方式","模仿聲音"], a:0, e:"借代：不直說本名，改用相關的代稱，如「白髮」指老人。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[1,2], q:"「對偶」修辭的特點是什麼？", opts:["上下兩句字數相等、結構對稱","兩句意思完全相同","一句長一句短","句子要押韻"], a:0, e:"對偶（對仗）：上下兩句在形式上對稱，意義上互補，常見於詩詞。", d:["修辭","對偶"],
      alts:[
        { q:"「落霞與孤鶩齊飛，秋水共長天一色」使用了哪種修辭？", opts:["對偶","誇飾","設問","借代"], a:0, e:"上下兩句結構對稱（落霞-孤鶩/秋水-長天），是對偶。" },
        { q:"「借景抒情」的意思是？", opts:["描寫景物，藉此表達自己的情感","只描述風景","只表達情感不寫景","借錢給別人"], a:0, e:"借景抒情：透過描寫自然景色，抒發作者的情感。" },
        { q:"古詩中「托物言志」的寫作手法，指的是？", opts:["藉由描寫物品，表達作者的志向或情懷","只描述物品","描述志向不提任何物品","提到物品就是托物言志"], a:0, e:"托物言志：用象徵性的物品（梅花、竹子等）來表達志向。" },
        { q:"下列哪句詩運用了「動靜對比」手法？", opts:["蟬噪林逾靜，鳥鳴山更幽","舉頭望明月，低頭思故鄉","疑是銀河落九天","春眠不覺曉，處處聞啼鳥"], a:0, e:"「蟬噪林逾靜」以聲音（動）反襯環境的靜，是動靜對比。" },
        { q:"「意象」在詩歌中的意思是？", opts:["融合情感的具體物象（如梅、菊、月）","圖片的意思","字義的解釋","詩的長度"], a:0, e:"意象是作者賦予情感或象徵意義的具體形象，如以「梅」象徵堅貞。" },
        { q:"詩歌中常以「月亮」代表什麼情感？", opts:["思鄉、思人（月圓人未圓）","快樂興奮","勇氣與力量","憤怒與反抗"], a:0, e:"月圓象徵團圓，月缺象徵分離，詩中常用月亮表達思鄉之情。" },
      ]},
    { minGrade:6, maxGrade:6, semesters:[2], q:"「起承轉合」是文章的結構模式，「轉」的作用是？", opts:["改變話題或視角，帶來新意","重複前面的話","總結全文","說明原因"], a:0, e:"「起承轉合」：起→鋪陳、承→延展、轉→轉折新意、合→總結。「轉」帶來意外或深化。", d:["文章結構","寫作技巧"],
      alts:[
        { q:"「夾敘夾議」的寫作方式是指？", opts:["敘述事件的同時穿插評論或感想","只有敘述沒有評論","只有議論沒有敘述","先議論後敘述"], a:0, e:"夾敘夾議：在講述事情的過程中，加入作者的評論或感想。" },
        { q:"「以小見大」的寫作手法是指？", opts:["透過細節小事，反映大主題或深刻道理","文章要寫很小的事","只寫小動物","縮短文章篇幅"], a:0, e:"以小見大：從日常小事或細節中，引出大道理或深刻主題。" },
        { q:"「欲揚先抑」的手法是指？", opts:["先貶低後讚揚，形成對比，加強效果","只批評不稱讚","只稱讚不批評","先讚揚後批評"], a:0, e:"欲揚先抑：先說缺點或貶低，再突然轉為稱讚，加強感染力。" },
      ]},
  ];
  function genChinese(g, s, i) { return genFromBank("國語", g, s, i, ZH_BANK); }

  /* ── 模板工廠 ── */
  function filterByScope(bank, grade, semester) {
    var res = bank.filter(function (t) {
      return grade >= (t.minGrade || 1) && grade <= (t.maxGrade || 6) && (t.semesters || [1, 2]).indexOf(semester) >= 0;
    });
    if (!res.length) res = bank.filter(function (t) { return grade >= (t.minGrade || 1) && grade <= (t.maxGrade || 6); });
    return res.length ? res : bank.slice(0, 1);
  }

  /* 展開模板及其備用問法（alts），每個 alt 是同知識點的不同問角度 */
  function makeVariants(template) {
    var base = [{ q: template.q, opts: template.opts, a: template.a, e: template.e }];
    if (template.alts) {
      template.alts.forEach(function (alt) {
        base.push({ q: alt.q, opts: alt.opts, a: alt.a, e: alt.e || template.e });
      });
    }
    return base;
  }

  function genFromBank(subject, grade, semester, index, bank) {
    var r = mulberry32(hashSeed(subject, grade, semester, index));
    var eligible = filterByScope(bank, grade, semester);
    /* 將所有模板展開成變體列表 */
    var variants = [];
    eligible.forEach(function (t) {
      makeVariants(t).forEach(function (v) { variants.push({ v: v, d: t.d, remedial: t.remedial }); });
    });
    if (!variants.length) variants = [{ v: { q: eligible[0].q, opts: eligible[0].opts, a: eligible[0].a, e: eligible[0].e }, d: eligible[0].d }];
    var entry = variants[index % variants.length];
    var picked = pick4(entry.v.opts, entry.v.a, r);
    return qBase(subject, grade, semester, index, entry.v.q, picked.options, picked.answer, entry.v.e, entry.d, entry.remedial);
  }

  /* ── Pool / Session ── */
  var generators = { 數學: genMath, 英文: genEnglish, 自然: genScience, 社會: genSocial, 國語: genChinese };

  function buildPool(subject, grade, semester) {
    var gen = generators[subject];
    if (!gen) return [];
    grade = Math.min(6, Math.max(1, Number(grade) || 1));
    semester = Math.min(2, Math.max(1, Number(semester) || 1));
    var pool = [];
    for (var i = 0; i < POOL_SIZE; i++) pool.push(gen(grade, semester, i));
    return pool;
  }

  function pickFromPool(pool, count, seed) {
    var shuffled = shuffle(pool, seed), selected = [], seen = {};
    shuffled.forEach(function (q) {
      var key = q.subject + "|" + q.scopeLabel + "|" + q.question;
      if (selected.length < count && !seen[key]) { selected.push(q); seen[key] = true; }
    });
    return selected;
  }

  function pickSession(grade, semester, subjectMode, sessionSeed) {
    grade = Math.min(6, Math.max(1, Number(grade) || 3));
    semester = Math.min(2, Math.max(1, Number(semester) || 1));
    sessionSeed = sessionSeed == null ? Date.now() : sessionSeed;
    if (subjectMode === "mixed" || !subjectMode) {
      var session = [];
      SUBJECTS.forEach(function (sub, idx) {
        var pool = buildPool(sub, grade, semester);
        var part = pickFromPool(pool, 4, hashSeed(sessionSeed, sub, idx));
        session = session.concat(part);
      });
      return shuffle(session, hashSeed(sessionSeed, "mixed"));
    }
    return pickFromPool(buildPool(subjectMode, grade, semester), SESSION_SIZE, hashSeed(sessionSeed, subjectMode));
  }

  global.AI_KIDS_EXAM_QUIZ_BANK = { POOL_SIZE: POOL_SIZE, SESSION_SIZE: SESSION_SIZE, SUBJECTS: SUBJECTS, buildPool: buildPool, pickSession: pickSession };
})(typeof window !== "undefined" ? window : globalThis);
