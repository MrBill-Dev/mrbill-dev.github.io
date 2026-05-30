/**
 * JS / jQuery 速查、彈窗詳解、補充課程（現代實務向）
 * 對照 W3School 完整度，標註 ES6+ 與 2020+ 語法；淘汰語法僅作「讀舊碼」說明。
 */
(function () {
  if (typeof tutorialRepository === "undefined") return;

  /* ── 新課程 ── */
  var newJsLessons = {
    js_operators_types: {
      track: "js",
      title: "🔣 型別、運算子與比較（===）",
      desc: "typeof、===、邏輯運算、?? 與 ?. — 讀 API 資料、寫條件、除錯 Console 必備。",
      concept: "<p>JS 是<strong>動態型別</strong>：同一變數可放不同型別的值（但實務上仍用 const/let 維持語意）。</p><h3 class=\"tuto-h3\">typeof 常見結果</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>值</th><th>typeof</th><th>備註</th></tr></thead><tbody><tr><td><code>42</code>、<code>3.14</code></td><td><code>\"number\"</code></td><td>NaN 也是 number</td></tr><tr><td><code>\"hi\"</code></td><td><code>\"string\"</code></td><td></td></tr><tr><td><code>true/false</code></td><td><code>\"boolean\"</code></td><td></td></tr><tr><td><code>undefined</code></td><td><code>\"undefined\"</code></td><td>未賦值</td></tr><tr><td><code>null</code></td><td><code>\"object\"</code></td><td>歷史 bug，用 <code>=== null</code> 判斷</td></tr><tr><td><code>{}</code>、<code>[]</code></td><td><code>\"object\"</code></td><td>陣列是特殊物件</td></tr><tr><td><code>function(){}</code></td><td><code>\"function\"</code></td><td></td></tr></tbody></table></div><h3 class=\"tuto-h3\">比較：請用 === 不用 ==</h3><p><code>==</code> 會強制轉型（<code>0 == false</code> 為 true）→ 除錯地獄。<strong>實務一律 === / !==</strong>。</p><h3 class=\"tuto-h3\">邏輯與現代預設值</h3><ul class=\"tuto-list\"><li><code>&&</code>、<code>||</code>、<code>!</code> — 條件組合</li><li><code>??</code>（2020）— 只有 null/undefined 才用右邊：<code>score ?? 0</code></li><li><code>?.</code>（2020）— 安全存取：<code>user?.profile?.name</code></li></ul><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">⚠️ 已淘汰（讀舊碼用）</p><p><code>var</code> 函式作用域易出錯；新程式用 <code>let/const</code>。</p></div>",
      practice: "① 改 score 為 null 看 ?? ② 改 user 為 null 看 ?. ③ 用 === 比較字串 \"5\" 與數字 5",
      code: `<p id="out">—</p>\n<button type="button" id="run">執行示範</button>\n<script>\n  document.getElementById("run").addEventListener("click", function() {\n    const score = null;\n    const user = { profile: { name: "Bill" } };\n    const lines = [\n      "typeof score: " + typeof score,\n      "score ?? 0 → " + (score ?? 0),\n      "user?.profile?.name → " + (user?.profile?.name ?? "（無）"),\n      '"5" === 5 → ' + ("5" === 5),\n      '"5" == 5 → ' + ("5" == 5) + "（避免使用 ==）"\n    ];\n    document.getElementById("out").innerHTML = lines.join("<br>");\n  });\n<\/script>`,
      focusCode: `typeof x;           // "string" | "number" | ...\nscore ?? 0;         // null/undefined 才用 0\nuser?.name;         // user 為 null 不報錯\na === b;            // 嚴格相等（推薦）`,
      tip: "API 欄位可能缺漏，fetch 後先 ?. 再渲染，避免 Cannot read properties。",
      quiz: { q: "嚴格相等（不轉型）？", opts: ["===", "==", "="], ans: 0 }
    },
    js_switch_while: {
      track: "js",
      title: "🔀 switch · while · break / continue",
      desc: "多分支用 switch；不確定次數用 while；需要跳過或中斷用 break/continue。",
      concept: "<h3 class=\"tuto-h3\">switch</h3><p>適合「一個變數對多個固定值」（等級、狀態碼）。每個 <code>case</code> 結尾要 <code>break</code>，否則會 fall-through 繼續執行下一 case。</p><pre class=\"tuto-code-block\">switch (level) {\n  case \"A\": msg = \"高階\"; break;\n  case \"B\": msg = \"中階\"; break;\n  default: msg = \"入門\";\n}</pre><h3 class=\"tuto-h3\">while / do...while</h3><ul class=\"tuto-list\"><li><code>while (條件)</code> — 先判斷再執行</li><li><code>do { } while (條件)</code> — 至少執行一次</li><li><code>for</code> — 已知次數或要索引（上一課）</li></ul><p><code>break</code> 跳出迴圈；<code>continue</code> 跳過本次、進下一圈。</p>",
      practice: "① 改 level 為 B ② 在 while 加 break 當 n>5 停止 ③ 用 continue 跳過偶數",
      code: `<p id="msg">—</p>\n<p id="loop">—</p>\n<button type="button" id="go">執行</button>\n<script>\n  document.getElementById("go").addEventListener("click", function() {\n    const level = "B";\n    let text;\n    switch (level) {\n      case "A": text = "高階班"; break;\n      case "B": text = "中階班"; break;\n      default: text = "入門班";\n    }\n    document.getElementById("msg").textContent = "switch → " + text;\n    let n = 0, parts = [];\n    while (n < 8) {\n      n++;\n      if (n % 2 === 0) continue;\n      if (n > 5) break;\n      parts.push(n);\n    }\n    document.getElementById("loop").textContent = "while 奇數直到>5: " + parts.join(", ");\n  });\n<\/script>`,
      tip: "case 太多時改 if/else 或查表物件 { A: '…', B: '…' } 可讀性更好。",
      quiz: { q: "switch 漏寫 break 會？", opts: ["繼續執行下一 case", "自動 return", "語法錯誤"], ans: 0 }
    },
    js_strings: {
      track: "js",
      title: "📝 字串方法實務速查",
      desc: "trim、split、includes、slice、replace — 表單、URL、標籤處理天天用。",
      concept: "<div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>方法</th><th>用途</th><th>範例</th></tr></thead><tbody><tr><td><code>.length</code></td><td>字元數</td><td><code>\"hi\".length // 2</code></td></tr><tr><td><code>.trim()</code></td><td>去前後空白</td><td>表單送出前必做</td></tr><tr><td><code>.toLowerCase()</code></td><td>小寫</td><td>不區分大小寫比對</td></tr><tr><td><code>.includes(sub)</code></td><td>是否包含</td><td>搜尋過濾</td></tr><tr><td><code>.startsWith / .endsWith</code></td><td>前綴/後綴</td><td>檢查副檔名、路徑</td></tr><tr><td><code>.slice(start, end)</code></td><td>擷取子字串</td><td>不修改原字串</td></tr><tr><td><code>.split(sep)</code></td><td>拆成陣列</td><td><code>\"a,b\".split(\",\")</code></td></tr><tr><td><code>.replace(a, b)</code></td><td>取代</td><td>全域用 <code>/g</code> 正則</td></tr><tr><td><code>.padStart(n, \"0\")</code></td><td>左側補字</td><td>時間 09:05</td></tr></tbody></table></div><p>字串不可變（immutable）：方法回傳<strong>新字串</strong>，原字串不變。</p>",
      practice: "① 輸入含空白的 email ② 用 split 拆標籤 ③ slice 取網域",
      code: `<input id="raw" placeholder="  Hello,World  " style="width:100%;max-width:280px;padding:8px;border:1px solid #cbd5e1;border-radius:8px">\n<p id="out" style="font-size:13px;margin-top:8px;line-height:1.6"></p>\n<script>\n  const input = document.getElementById("raw");\n  const out = document.getElementById("out");\n  function demo() {\n    const s = input.value;\n    const t = s.trim();\n    const tags = t.includes(",") ? t.split(",").map(x => x.trim()) : [t];\n    out.innerHTML =\n      "trim: [" + t + "]<br>" +\n      "includes 'World': " + t.includes("World") + "<br>" +\n      "slice(0,5): " + t.slice(0, 5) + "<br>" +\n      "split 標籤: " + tags.join(" | ");\n  }\n  input.addEventListener("input", demo);\n  demo();\n<\/script>`,
      tip: "模板字串 `` 是現代拼接首選；舊站可能見到 + 串接。",
      quiz: { q: "去除前後空白？", opts: [".trim()", ".strip()", ".clean()"], ans: 0 }
    },
    js_dom_create: {
      track: "js",
      title: "🧱 DOM 新增／刪除節點",
      desc: "createElement、append、remove、DocumentFragment — 動態清單、訊息流的原生寫法。",
      concept: "<h3 class=\"tuto-h3\">建立與插入</h3><ol class=\"tuto-list\"><li><code>document.createElement('li')</code> 建立節點</li><li><code>el.textContent = '…'</code> 填文字（防 XSS 優於 innerHTML 純文字）</li><li><code>parent.appendChild(el)</code> 或現代 <code>parent.append(el)</code></li></ol><h3 class=\"tuto-h3\">刪除與替換</h3><ul class=\"tuto-list\"><li><code>el.remove()</code> — 從 DOM 移除</li><li><code>parent.replaceChild(newEl, oldEl)</code> — 替換（較少手寫）</li></ul><h3 class=\"tuto-h3\">DocumentFragment</h3><p>迴圈裡先 append 到 fragment，再一次 append 到 DOM → 減少重排，清單很長時較順。</p><p>對照 jQuery：<code>append</code>、<code>remove</code>、<code>html</code> 底層就是這些 API。</p>",
      practice: "① 新增三筆待辦 ② 點刪除移除 li ③ 改為先組 fragment 再插入",
      code: `<ul id="list"></ul>\n<button type="button" id="add">新增項目</button>\n<script>\n  let n = 0;\n  const list = document.getElementById("list");\n  document.getElementById("add").addEventListener("click", function() {\n    n++;\n    const li = document.createElement("li");\n    li.textContent = "任務 " + n + " ";\n    const del = document.createElement("button");\n    del.type = "button";\n    del.textContent = "刪";\n    del.addEventListener("click", function() { li.remove(); });\n    li.appendChild(del);\n    list.appendChild(li);\n  });\n<\/script>`,
      focusCode: `const li = document.createElement("li");\nli.textContent = "純文字";\nparent.append(li);\nli.remove();`,
      tip: "使用者輸入要顯示在頁面：優先 textContent，HTML 需消毒。",
      quiz: { q: "建立新元素？", opts: ["createElement", "createNode", "new HTML()"], ans: 0 }
    },
    js_classes: {
      track: "js",
      title: "🏛 ES6 class（現代 OOP 入門）",
      desc: "class、constructor、extends — Vue/React 元件背後仍是物件與 class 思維。",
      concept: "<p><strong>class</strong> 是語法糖，底層仍是 prototype，但可讀性高、團隊協作常見。</p><pre class=\"tuto-code-block\">class User {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return `Hi, ${this.name}`;\n  }\n}\nclass Admin extends User {\n  constructor(name, role) {\n    super(name);\n    this.role = role;\n  }\n}</pre><h3 class=\"tuto-h3\">與函式建構子</h3><p>舊式 <code>function User(name) { this.name = name; }</code> 仍會在 legacy  code 出現；語意上 class 較清楚。</p><h3 class=\"tuto-h3\">私有欄位（2022+）</h3><p><code>#secret</code> 真正私有；初學先會 public 方法即可。</p><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">📌 實務</p><p>Vue 3 Composition API 常不用 class，但讀 npm 套件、Angular、舊 React class component 仍要懂。</p></div>",
      practice: "① 建立 User 實例 ② 建立 Admin 並呼叫 greet ③ 加一個 getLabel() 方法",
      code: `<p id="out"></p>\n<script>\n  class User {\n    constructor(name) { this.name = name; }\n    greet() { return "Hi, " + this.name; }\n  }\n  class Admin extends User {\n    constructor(name) {\n      super(name);\n      this.role = "admin";\n    }\n    badge() { return this.greet() + " [" + this.role + "]"; }\n  }\n  const u = new Admin("Bill");\n  document.getElementById("out").textContent = u.badge();\n<\/script>`,
      tip: "箭頭函式不適合當 class 方法寫在物件字面（this 不同）；方法用一般 function 或 class 語法。",
      quiz: { q: "子 class 呼叫父建構子？", opts: ["super()", "parent()", "this()"], ans: 0 }
    },
    js_modern_syntax: {
      track: "js",
      title: "🆕 現代語法總覽（ES2020+ 實務）",
      desc: "Optional chaining、Nullish coalescing、Map/Set、頂層 await 概念 — 讀現代 code 與 MDN 必對照。",
      concept: "<h3 class=\"tuto-h3\">已在其他課學過（本課整合）</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>語法</th><th>用途</th><th>取代的舊寫法</th></tr></thead><tbody><tr><td><code>let/const</code></td><td>區塊作用域</td><td><code>var</code></td></tr><tr><td><code>=&gt;</code></td><td>箭頭函式</td><td><code>function(){}</code> 短寫</td></tr><tr><td><code>...</code> spread/rest</td><td>合併陣列/物件、不定參數</td><td><code>apply</code></td></tr><tr><td><code>?. ??</code></td><td>安全存取、預設值</td><td>一長串 && 判斷</td></tr><tr><td><code>import/export</code></td><td>ES 模組</td><td>全域 script、CommonJS（Node）</td></tr><tr><td><code>async/await</code></td><td>非同步</td><td>callback 地獄</td></tr></tbody></table></div><h3 class=\"tuto-h3\">Map / Set（何時用）</h3><ul class=\"tuto-list\"><li><code>Map</code> — 鍵可以是任意型別；常當快取表</li><li><code>Set</code> — 唯一值集合；去重用 <code>[...new Set(arr)]</code></li></ul><p>一般資料仍用 <code>{}</code> 與 <code>[]</code> 即可，不必為用而用。</p><h3 class=\"tuto-h3\">年份對照（心裡有數）</h3><p>ES2015(ES6) class/模組 · ES2017 async/await · ES2020 ?./?? · ES2022 class 私有欄位。瀏覽器支援查 <a href=\"https://caniuse.com\" target=\"_blank\" rel=\"noopener\">caniuse.com</a>；打包工具（Vite）會幫你轉譯舊瀏覽器。</p>",
      practice: "① 用 Map 存兩個 key ② Set 去重陣列 ③ 說出 ?. 與 || 預設值的差異",
      code: `<p id="out"></p>\n<script>\n  const cache = new Map();\n  cache.set("user:1", { name: "Amy" });\n  const ids = [1, 2, 2, 3, 1];\n  const unique = [...new Set(ids)];\n  const empty = null;\n  const a = empty ?? "預設";\n  const b = empty || "預設";\n  document.getElementById("out").innerHTML =\n    "Map get: " + cache.get("user:1").name + "<br>" +\n    "Set 去重: " + unique.join(", ") + "<br>" +\n    "?? vs || 對 null: " + a + " / " + b;\n<\/script>`,
      tip: "|| 會把 0、'' 也當假值；若要保留 0 用 ??。",
      quiz: { q: "只有 null/undefined 才用右邊？", opts: ["??", "||", "&&"], ans: 0 }
    },
    js_reference_map: {
      track: "js",
      sandbox: false,
      title: "📚 JS 完整度地圖（對照 W3School · 現代版）",
      desc: "本手冊 JS 軌道涵蓋哪些主題、哪些在下方速查表、哪些已過時僅供讀舊碼。",
      concept: "<p>這課是<strong>索引頁</strong>。左側目錄依「由淺入深」排列；本頁下方<strong>JS 語法速查表</strong>可點「查看」開詳解（W3School 式完整度，內容更新至 ES2020+）。</p><h3 class=\"tuto-h3\">本手冊已含（建議順序學）</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>區塊</th><th>主題</th><th>實務</th></tr></thead><tbody><tr><td>語法</td><td>變數、型別、運算子、if/switch、迴圈、函式、箭頭、class</td><td>每天寫邏輯</td></tr><tr><td>資料</td><td>字串、陣列、物件、解構、JSON、Map/Set 入門</td><td>API 資料處理</td></tr><tr><td>DOM</td><td>選取、事件、classList、建立節點</td><td>互動頁必備</td></tr><tr><td>非同步</td><td>Promise、async/await、fetch、try/catch</td><td>前後端串接</td></tr><tr><td>工程</td><td>模組、除錯、debounce、localStorage、正則</td><td>可交付作品</td></tr></tbody></table></div><h3 class=\"tuto-h3\">仍會在業界遇到、但本手冊不深入</h3><ul class=\"tuto-list\"><li><strong>TypeScript</strong> — JS + 型別；Vue/React 新專案常見</li><li><strong>Node.js</strong> — 伺服器端 JS，語法同源</li><li><strong>Webpack/Vite</strong> — 打包；Tailwind/Vue 課會碰到</li><li><strong>測試</strong> — Vitest/Jest；進階工程必備</li></ul><h3 class=\"tuto-h3\">建議淘汰（新程式勿用）</h3><p><code>var</code>、<code>==</code>、<code>document.write</code>、inline <code>onclick</code>、<code>eval</code> 解析 JSON。</p>",
      practice: "① 掃描下方速查表，標記還不熟的列 ② 從「型別與運算子」開始逐個點查看 ③ 規劃本週要補完的 3 堂課",
      code: `<div style="font-family:system-ui;line-height:1.65;color:#334155;font-size:14px">\n  <p><strong>學習節奏建議</strong></p>\n  <ol>\n    <li>語法 8 課 + 速查表「型別／字串／陣列」</li>\n    <li>DOM 5 課 + 實作 Tab</li>\n    <li>fetch + JSON + async 三件套</li>\n    <li>模組 + 除錯 → 進 jQuery 或 Vue</li>\n  </ol>\n</div>`,
      tip: "卡住時先查下方速查表，再回左側對應課程沙盒練習。",
      quiz: { q: "現代 JS 預設宣告變數？", opts: ["const / let", "var only", "global only"], ans: 0 }
    }
  };

  var newJqLesson = {
    jq_reference_api: {
      track: "jquery",
      sandbox: false,
      title: "📚 jQuery API 完整度地圖（3.7 · 維護向）",
      desc: "jQuery 3.7 仍可用於舊站；新專案優先原生/Vue。本頁 + 下方速查 = 接手 legacy 的索引。",
      concept: "<p><strong>jQuery 3.x</strong>（2023 仍維護）專注 DOM、事件、AJAX 簡化。新專案很少從零引入，但 WordPress、後台模板、2010s 官網大量存在。</p><h3 class=\"tuto-h3\">核心心智模型</h3><p><code>$</code> = 選元素 → 回傳 jQuery 物件 → 鏈式呼叫方法。幾乎每個方法都回傳 jQuery 物件（除 .text() 讀取等）。</p><h3 class=\"tuto-h3\">與原生對照（必背）</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>jQuery</th><th>原生（現代）</th></tr></thead><tbody><tr><td><code>$('#id')</code></td><td><code>document.querySelector('#id')</code></td></tr><tr><td><code>$('.a').hide()</code></td><td><code>el.classList.add('hidden')</code> + CSS</td></tr><tr><td><code>.on('click', fn)</code></td><td><code>addEventListener('click', fn)</code></td></tr><tr><td><code>.ajax / $.get</code></td><td><code>fetch</code></td></tr><tr><td><code>$(fn)</code> DOM ready</td><td><code>DOMContentLoaded</code> 或 script defer</td></tr></tbody></table></div><h3 class=\"tuto-h3\">本手冊 jQuery 軌道</h3><p>入門 0–8 → 中階 9–15 → 高階 16–17 + 漸進升級。下方<strong>jQuery 速查表</strong>補 W3School 式 API 一覽。</p><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">⚠️ 不建議新站</p><p>2020 後新前台請 Vue/React + 元件化；jQuery 價值在<strong>維護與讀舊碼</strong>。</p></div>",
      practice: "① 點下方 jQuery 速查每一列「查看」 ② 在 Console 輸入 jQuery.fn.jquery 看版本 ③ 寫一個原生版取代 $('#x').text()",
      code: `<pre style="background:#0f172a;color:#a5f3fc;padding:14px;border-radius:10px;font-size:13px;line-height:1.7">// 載入後在 Console\ntypeof jQuery        // "function"\njQuery.fn.jquery     // "3.7.1"\n\n// 最小遷移對照\n$('#title').text('新標題');\n// → document.querySelector('#title').textContent = '新標題';</pre>`,
      tip: "維護案先 grep `$` 和 `jQuery`，列出 API 再逐段改或包 Vue 元件。",
      quiz: { q: "jQuery 3.x 主要價值？", opts: ["維護舊站 DOM/AJAX", "取代後端", "編譯 TS"], ans: 0 }
    }
  };

  Object.assign(tutorialRepository, newJsLessons);

  if (typeof tutorialTrackRepository !== "undefined") {
    Object.assign(tutorialTrackRepository, newJqLesson);
  }

  /* ── 加厚既有 jQuery 課 concept（維護向完整度） ── */
  var jqEnrich = {
    jq_02_selectors: {
      concept: "<p>jQuery 選擇器<strong>與 CSS 相同</strong>（本手冊 CSS 速查表可直接套用），再加 jQuery 專用方法。</p><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>寫法</th><th>說明</th></tr></thead><tbody><tr><td><code>$('#id')</code></td><td>id（全頁唯一）</td></tr><tr><td><code>$('.card')</code></td><td>class</td></tr><tr><td><code>$('div p')</code></td><td>後代</td></tr><tr><td><code>$('ul > li')</code></td><td>子層</td></tr><tr><td><code>$('input[type=email]')</code></td><td>屬性</td></tr><tr><td><code>$('.item:first')</code></td><td>偽類過濾（非 CSS 標準，jQuery 擴充）</td></tr><tr><td><code>$('.item').eq(2)</code></td><td>第 3 個（索引 0 起）</td></tr></tbody></table></div><h3 class=\"tuto-h3\">鏈式呼叫</h3><p>每個方法大多回傳 jQuery 物件，可連寫：<code>$('.btn').addClass('on').attr('aria-pressed','true');</code></p><p>對照原生：每一步都要重新變數或嵌套呼叫。</p>"
    },
    jq_04_dom: {
      concept: "<div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>方法</th><th>作用</th><th>注意</th></tr></thead><tbody><tr><td><code>.append()</code></td><td>尾端插入子元素</td><td>可傳 HTML 字串</td></tr><tr><td><code>.prepend()</code></td><td>開頭插入</td><td></td></tr><tr><td><code>.before() / .after()</code></td><td>兄弟位置插入</td><td></td></tr><tr><td><code>.remove()</code></td><td>刪除自己</td><td></td></tr><tr><td><code>.empty()</code></td><td>清空子元素</td><td></td></tr><tr><td><code>.html()</code></td><td>讀寫 innerHTML</td><td>使用者輸入 → XSS 風險</td></tr><tr><td><code>.text()</code></td><td>讀寫純文字</td><td>安全</td></tr></tbody></table></div><p>CRUD 思維：Create 用 append、Read 用 text/html、Update 用 html/text/css、Delete 用 remove。</p>"
    },
    jq_06_ajax: {
      concept: "<h3 class=\"tuto-h3\">三種常見寫法</h3><ul class=\"tuto-list\"><li><code>$.get(url, data, success)</code> — GET 簡寫</li><li><code>$.post(url, data, success)</code> — POST 簡寫</li><li><code>$.ajax({ url, method, dataType, success, error })</code> — 完整設定</li></ul><p>回傳<strong>jqXHR</strong>（類 Promise），可 <code>.done().fail().always()</code> 鏈式。</p><h3 class=\"tuto-h3\">現代對照</h3><pre class=\"tuto-code-block\">// jQuery\n$.get('/api').done(render).fail(showError);\n\n// 原生（新程式推薦）\ntry {\n  const res = await fetch('/api');\n  const data = await res.json();\n  render(data);\n} catch (e) { showError(e); }</pre><p>維護 jQuery 案：讀懂 dataType: 'json'、contentType、headers 設定即可。</p>"
    },
    jq_08_components: {
      concept: "<p>Tab / Modal / Accordion 在 jQuery 時代的典型模式：<strong>HTML 結構固定 + class 或 display 切換狀態</strong>。</p><h3 class=\"tuto-h3\">Tab 最小實作</h3><ol class=\"tuto-list\"><li>按鈕帶 <code>data-tab=\"id\"</code></li><li>內容區 <code>data-panel=\"id\"</code></li><li>click → 全部 hide → 顯示對應 panel → 按鈕加 active class</li></ol><h3 class=\"tuto-h3\">Modal 要點</h3><ul class=\"tuto-list\"><li>遮罩 + 面板；<code>.fadeIn()</code> / <code>.addClass('is-open')</code></li><li>ESC 關閉、focus trap（無障礙進階）</li><li>body 加 <code>overflow:hidden</code> 防背景捲動</li></ul><p>Vue 時代改為元件 + v-if / Teleport，但狀態邏輯相同。</p>"
    }
  };

  if (typeof tutorialTrackRepository !== "undefined") {
    Object.keys(jqEnrich).forEach(function (key) {
      if (tutorialTrackRepository[key]) {
        Object.assign(tutorialTrackRepository[key], jqEnrich[key]);
      }
    });
  }

  /* ── 更新軌道順序 ── */
  if (typeof TUTORIAL_ORDER_BY_TRACK !== "undefined") {
    TUTORIAL_ORDER_BY_TRACK.js = [
      "intro_js_whatis", "intro_js_roadmap", "js_reference_map",
      "js_variables", "js_operators_types", "js_conditionals", "js_switch_while",
      "js_template_strings", "js_strings", "js_loops_for", "js_arrays", "js_array_methods",
      "js_destructuring", "js_objects", "js_functions", "js_arrow", "js_classes",
      "js_scope_closure", "js_events", "js_dom", "js_dom_create", "js_classlist", "js_queryselector",
      "js_async_await", "js_promises", "js_try_catch", "js_json", "js_fetch",
      "js_localstorage", "js_timers", "js_debounce_throttle", "js_regex",
      "js_form_submit", "adv_ui_patterns", "js_modern_syntax", "js_ecosystem",
      "work_devtools_network", "js_modules_esm", "js_debugging"
    ];
    TUTORIAL_ORDER_BY_TRACK.jquery = [
      "jq_00_cdn_setup", "jq_reference_api", "jq_01_intro",
      "jq_02_selectors", "jq_03_events", "jq_04_dom", "jq_05_effects", "jq_06_ajax",
      "jq_07_form", "jq_08_components", "jq_09_plugin", "jq_10_performance", "jq_11_architecture",
      "jq_13_traversing", "jq_14_class_data", "jq_15_ajax_post",
      "jq_16_namespaced", "jq_17_no_conflict", "jq_12_master_workflow"
    ];
  }

  /* ── 速查彈窗內容 ── */
  window.jsHelpMap = {
    js_types: {
      title: "型別與 typeof",
      summary: "JS 有 number、string、boolean、undefined、object、function 等；typeof 快速判斷，但 null 與 array 要特別記。",
      body: "<section><h6 class=\"font-black text-slate-900 mb-1\">實務判斷</h6><ul class=\"list-disc pl-5 space-y-1\"><li>API 欄位可能缺 → 用 <code>=== undefined</code> 或 <code>??</code></li><li>是否陣列 → <code>Array.isArray(x)</code>（不用 typeof）</li><li>是否 null → <code>x === null</code></li></ul></section>",
      code: "typeof 42;           // \"number\"\ntypeof \"hi\";         // \"string\"\ntypeof null;         // \"object\"（陷阱）\nArray.isArray([]);   // true",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>typeof 回傳都是字串</li><li>NaN 用 Number.isNaN(x) 判斷</li></ul>"
    },
    js_operators: {
      title: "運算子與 ===",
      summary: "算術 + - * / %；比較用 ===；邏輯 && || !；現代預設值用 ??，不是 ||。",
      body: "<section><h6 class=\"font-black text-slate-900 mb-1\">|| vs ??</h6><p><code>0 || 10</code> → 10（0 被當假值）<br><code>0 ?? 10</code> → 0（只有 null/undefined 才替換）</p></section>",
      compare: "<table class=\"w-full text-xs text-left\"><thead class=\"bg-slate-50\"><tr><th class=\"px-2 py-1.5 border-b\">運算子</th><th class=\"px-2 py-1.5 border-b\">用途</th></tr></thead><tbody><tr><td class=\"px-2 py-1.5 border-b font-mono\">=== !==</td><td class=\"px-2 py-1.5 border-b\">嚴格相等</td></tr><tr><td class=\"px-2 py-1.5 border-b font-mono\">&& || !</td><td class=\"px-2 py-1.5 border-b\">邏輯</td></tr><tr><td class=\"px-2 py-1.5 border-b font-mono\">?? ?.</td><td class=\"px-2 py-1.5 border-b\">ES2020 預設與安全存取</td></tr></tbody></table>",
      code: "const n = 0;\nn || 10;   // 10\nn ?? 10;   // 0\n\nconst u = null;\nu?.profile?.name ?? \"訪客\";",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>新程式禁用 ==</li><li>三元運算子 cond ? a : b 可寫簡短分支</li></ul>"
    },
    js_strings_ref: {
      title: "字串方法",
      summary: "字串不可變；方法回傳新字串。表單驗證前必 trim。",
      body: "<section><p>常用：<code>trim includes startsWith slice split replace padStart</code>。模板字串 <code>`${name}`</code> 取代 + 拼接。</p></section>",
      code: "const s = \"  hello@mail.com  \";\ns.trim().toLowerCase();\n\"a,b,c\".split(\",\");        // [\"a\",\"b\",\"c\"]\n\"file.jpg\".endsWith(\".jpg\"); // true",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>replace 只換第一個；全域用 /g</li><li>slice 索引可負數（從尾算）</li></ul>"
    },
    js_arrays_ref: {
      title: "陣列方法大全",
      summary: "改原陣列：push pop shift unshift splice sort reverse。回傳新陣列：map filter slice concat。",
      body: "<section><h6 class=\"font-black text-slate-900 mb-1\">迭代</h6><p><code>forEach</code> 無回傳 · <code>map</code> 轉換 · <code>filter</code> 篩選 · <code>find</code> 找第一個 · <code>some/every</code> 布林 · <code>reduce</code> 累加</p></section><section><h6 class=\"font-black text-slate-900 mb-1 mt-3\">排序</h6><p><code>arr.sort((a,b) => a - b)</code> 數字排序必寫 compare function。</p></section>",
      compare: "<table class=\"w-full text-xs text-left\"><thead class=\"bg-slate-50\"><tr><th class=\"px-2 py-1.5 border-b\">方法</th><th class=\"px-2 py-1.5 border-b\">回傳</th><th class=\"px-2 py-1.5 border-b\">改原陣列？</th></tr></thead><tbody><tr><td class=\"px-2 py-1.5 border-b font-mono\">map filter</td><td class=\"px-2 py-1.5 border-b\">新陣列</td><td class=\"px-2 py-1.5 border-b\">否</td></tr><tr><td class=\"px-2 py-1.5 border-b font-mono\">push splice</td><td class=\"px-2 py-1.5 border-b\">長度/刪除項</td><td class=\"px-2 py-1.5 border-b text-rose-700\">是</td></tr></tbody></table>",
      code: "const nums = [3, 1, 4];\nnums.map(n => n * 2);           // [6,2,8]\nnums.filter(n => n > 2);        // [3,4]\nnums.find(n => n > 3);          // 4\nnums.reduce((sum, n) => sum + n, 0); // 8",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>鏈式：filter().map() 很常見</li><li>forEach 不能 break；要中斷用 for...of</li></ul>"
    },
    js_objects_ref: {
      title: "物件與解構",
      summary: "物件存鍵值對；解構快速取值；spread 合併設定。",
      body: "<section><p><code>const { name, age = 18 } = user;</code><br><code>const cfg = { ...defaults, theme: 'dark' };</code><br>Object.keys(obj) / values / entries 遍歷。</p></section>",
      code: "const user = { name: \"Bill\", skills: [\"JS\"] };\nconst { name, skills: [first] } = user;\nconst next = { ...user, xp: 100 };",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>API JSON 解析後通常是物件或物件陣列</li><li>深拷貝簡單物件可用 structuredClone(obj)</li></ul>"
    },
    js_dom_ref: {
      title: "DOM API 速查",
      summary: "選取 → 讀寫 → 建立/刪除 → 樣式/class。這是 jQuery 與 Vue 底層。",
      body: "<section><ul class=\"list-disc pl-5 space-y-1\"><li>選：<code>querySelector(All)</code>、<code>getElementById</code></li><li>讀寫：<code>textContent innerHTML value</code></li><li>class：<code>classList.add/remove/toggle</code></li><li>建立：<code>createElement append remove</code></li><li>樣式：<code>el.style.prop</code>（少數動態；多用 class）</li></ul></section>",
      compare: "<table class=\"w-full text-xs text-left\"><thead class=\"bg-slate-50\"><tr><th class=\"px-2 py-1.5 border-b\">需求</th><th class=\"px-2 py-1.5 border-b\">API</th></tr></thead><tbody><tr><td class=\"px-2 py-1.5 border-b\">純文字</td><td class=\"px-2 py-1.5 border-b font-mono\">textContent</td></tr><tr><td class=\"px-2 py-1.5 border-b\">HTML（小心 XSS）</td><td class=\"px-2 py-1.5 border-b font-mono\">innerHTML</td></tr><tr><td class=\"px-2 py-1.5 border-b\">表單值</td><td class=\"px-2 py-1.5 border-b font-mono\">input.value</td></tr></tbody></table>",
      code: "const el = document.querySelector('.card');\nel.textContent = '安全文字';\nel.classList.toggle('active');\nconst li = document.createElement('li');\nel.append(li);",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>選不到是 null，先 if (el) 再操作</li><li>大量插入用 DocumentFragment</li></ul>"
    },
    js_events_ref: {
      title: "事件種類",
      summary: "addEventListener(type, handler, options)。常用 type 與實務用途。",
      body: "<section><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>事件</th><th>用途</th></tr></thead><tbody><tr><td>click</td><td>按鈕、連結（注意 a 預設跳轉）</td></tr><tr><td>input / change</td><td>表單即時 vs 失焦確認</td></tr><tr><td>submit</td><td>表單送出 → preventDefault</td></tr><tr><td>keydown / keyup</td><td>快捷鍵、Enter 送出</td></tr><tr><td>scroll / resize</td><td>需 throttle</td></tr><tr><td>DOMContentLoaded</td><td>DOM 就緒（等同 jQuery ready）</td></tr></tbody></table></div></section>",
      code: "btn.addEventListener('click', fn);\nform.addEventListener('submit', e => {\n  e.preventDefault();\n});\n// 委派\ndocument.body.addEventListener('click', e => {\n  if (e.target.matches('.del')) { /* ... */ }\n});",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>避免 HTML onclick=</li><li>動態元素用事件委派</li><li>{ passive: true } 優化 scroll</li></ul>"
    },
    js_async_ref: {
      title: "非同步：Promise · async/await · fetch",
      summary: "fetch 回 Promise；async 函式內 await；錯誤 try/catch 或 .catch()。",
      body: "<section><h6 class=\"font-black text-slate-900 mb-1\">fetch 標準流程</h6><ol class=\"list-decimal pl-5 space-y-1\"><li>await fetch(url)</li><li>if (!res.ok) throw</li><li>await res.json()</li><li>更新 UI</li><li>catch 顯示錯誤 · finally 關 loading</li></ol></section>",
      code: "async function load() {\n  try {\n    const res = await fetch('/api/posts');\n    if (!res.ok) throw new Error(res.status);\n    const data = await res.json();\n    render(data);\n  } catch (e) {\n    showError(e.message);\n  }\n}",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>CORS 錯誤是後端/代理設定問題</li><li>POST 要設 method、headers、body</li><li>AbortController 可取消請求</li></ul>"
    },
    js_modern_ref: {
      title: "ES6+ 與模組",
      summary: "let/const、箭頭、class、import/export、?. ?? — 2020 後新專案預設。",
      body: "<section><p><code>import { fn } from './utils.js'</code> 需 script type=module 或打包工具。</p><p>CommonJS <code>require</code> 常見於舊 Node；前端 ESM 為主。</p></section>",
      code: "// utils.js\nexport function formatPrice(n) {\n  return '$' + n.toFixed(2);\n}\n\n// main.js\nimport { formatPrice } from './utils.js';",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>Vite 專案預設 ESM</li><li>瀏覽器直接 import 要注意路徑副檔名 .js</li></ul>"
    },
    js_storage_ref: {
      title: "localStorage · sessionStorage · Cookie",
      summary: "localStorage 持久；sessionStorage 分頁關閉即清；Cookie 會隨請求送出（登入 session 常用，需 httpOnly 防 XSS 偷 token）。",
      body: "<section><p>localStorage 只存字串 → 物件用 JSON.stringify/parse。</p><p>容量約 5MB；勿存密碼、JWT（可被 XSS 讀取）。</p></section>",
      code: "localStorage.setItem('theme', 'dark');\nlocalStorage.getItem('theme');\n\nconst state = { xp: 100 };\nlocalStorage.setItem('state', JSON.stringify(state));\nJSON.parse(localStorage.getItem('state') || '{}');",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>無痕模式可能清掉 storage</li><li>跨分頁同步可監聽 storage 事件</li></ul>"
    },
    js_legacy_ref: {
      title: "讀舊碼：var · == · callback",
      summary: "維護 2015 前 code 會看到；新程式勿用，但要能辨識。",
      body: "<section><ul class=\"list-disc pl-5 space-y-1\"><li><code>var</code> — 函式作用域、hoisting</li><li><code>==</code> — 自動轉型比較</li><li>callback 嵌套 — 改寫為 async/await</li><li><code>$.ajax</code> — 對照 fetch</li></ul></section>",
      code: "// 舊\nvar x = 1;\nif (x == \"1\") { /* true */ }\n\n// 新\nconst x = 1;\nif (x === 1) { /* ... */ }",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>重構時小步 commit</li><li>先加 === 測試再刪舊邏輯</li></ul>"
    }
  };

  window.jqHelpMap = {
    jq_load: {
      title: "載入 · 版本 · DOM Ready",
      summary: "script 在自訂 script 之前；$(fn) 等同 DOMContentLoaded。",
      body: "<section><pre class=\"tuto-code-block\">&lt;script src=\"https://code.jquery.com/jquery-3.7.1.min.js\"&gt;&lt;/script&gt;\n&lt;script&gt;\n$(function() {\n  // DOM 已就緒\n});\n&lt;/script&gt;</pre><p>npm：<code>import $ from 'jquery'</code>（需 bundler）。</p></section>",
      code: "// CDN 後\ntypeof jQuery; // \"function\"\njQuery.fn.jquery; // \"3.7.1\"\n\n$(function() { initApp(); });",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>$ is not defined → 未載入或順序錯</li><li>不要同頁載入兩個 jQuery 版本</li></ul>"
    },
    jq_selectors_ref: {
      title: "jQuery 選擇器",
      summary: "與 CSS 相同 + :first :even :eq(n) 等 jQuery 擴充。",
      body: "<section><p><code>$('selector')</code> 永遠回傳 jQuery 物件（可能 empty）。<code>.length</code> 看有幾個。</p></section>",
      compare: "<table class=\"w-full text-xs text-left\"><thead class=\"bg-slate-50\"><tr><th class=\"px-2 py-1.5 border-b\">jQuery</th><th class=\"px-2 py-1.5 border-b\">原生</th></tr></thead><tbody><tr><td class=\"px-2 py-1.5 border-b font-mono\">$('#id')</td><td class=\"px-2 py-1.5 border-b font-mono\">querySelector('#id')</td></tr><tr><td class=\"px-2 py-1.5 border-b font-mono\">$('.a')</td><td class=\"px-2 py-1.5 border-b font-mono\">querySelectorAll('.a')</td></tr></tbody></table>",
      code: "$('.item').first();\n$('.item').eq(2);     // 第 3 個\n$('.item').filter('.active');",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>快取 $(sel) 到變數避免重複查 DOM</li></ul>"
    },
    jq_dom_ref: {
      title: "DOM 操作",
      summary: "append prepend remove html text css attr val 等 — 維護舊站最高頻。",
      body: "<section><p>讀寫：<code>.text() .html() .val() .attr() .css() .prop()</code><br>結構：<code>.append .prepend .before .after .remove .empty</code></p></section>",
      code: "$('#box').append('<p>新段落</p>');\n$('#email').val();           // 讀表單\n$('#email').val('a@b.com');  // 寫表單\n$('.card').remove();",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>使用者輸入用 .text() 不用 .html()</li><li>.css({}) 可一次設多屬性</li></ul>"
    },
    jq_events_ref: {
      title: "事件 · 委派 · 命名空間",
      summary: ".on() 取代舊 .bind()/.live()；委派解決動態元素。",
      body: "<section><p><code>$('#p').on('click', '.child', fn)</code> — 委派</p><p><code>.off('click.ns')</code> — 命名空間解綁</p><p>常用：<code>click submit change input keydown</code></p></section>",
      code: "$('#list').on('click', '.del', function() {\n  $(this).closest('li').remove();\n});\n\n$(window).on('resize.app', onResize);\n$(window).off('resize.app');",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>重複 .on 會綁多次 → 先 .off 或命名空間</li></ul>"
    },
    jq_effects_ref: {
      title: "效果與動畫",
      summary: "show hide toggle fade slide animate；現代 UI 更常 CSS transition。",
      body: "<section><p>簡短回饋：<code>fadeIn fadeOut slideToggle</code> 150–300ms。</p><p>自訂：<code>.animate({ opacity: 0.5 }, 200)</code></p><p>新專案優先 CSS + classList；jQuery 效果多在 legacy。</p></section>",
      code: "$('#panel').slideToggle(200);\n$('#msg').fadeOut(150);\n$('.box').animate({ marginLeft: '20px' }, 300);",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>尊重 prefers-reduced-motion</li><li>display:none 元素無法 fade，需 .show() 先</li></ul>"
    },
    jq_ajax_ref: {
      title: "AJAX 全家桶",
      summary: "$.get $.post $.ajax load getJSON；現代新功能請 fetch。",
      body: "<section><pre class=\"tuto-code-block\">$.ajax({\n  url: '/api',\n  method: 'POST',\n  contentType: 'application/json',\n  data: JSON.stringify({ id: 1 }),\n  dataType: 'json',\n  success: fn,\n  error: fn\n});</pre><p>jqXHR 支援 Promise 風格 .done().fail()</p></section>",
      code: "$.get('/api/posts/1')\n  .done(data => console.log(data))\n  .fail(() => alert('失敗'));\n\n// 載入 HTML 片段\n$('#box').load('/partial.html #content');",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>跨域需 CORS 或後端代理</li><li>error 一定要處理</li></ul>"
    },
    jq_traverse_ref: {
      title: "遍歷 DOM",
      summary: "parent children find siblings next prev closest — 維護清單必學。",
      body: "<section><p><code>$(this).closest('.row')</code> 從事件目標往上找容器，比數 parent 層數可靠。</p></section>",
      code: "const $row = $(this).closest('tr');\n$row.find('.price').text('99');\n$row.siblings().addClass('dim');",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>closest 對應原生 el.closest()</li></ul>"
    },
    jq_util_ref: {
      title: "Utility · 表單 · 外掛",
      summary: "$.each $.map $.extend $.param serialize noConflict $.fn.plugin",
      body: "<section><ul class=\"list-disc pl-5 space-y-1\"><li><code>$.each(arr, fn)</code> 迭代</li><li><code>$.extend({}, a, b)</code> 合併物件（淺拷貝）</li><li><code>$('#f').serialize()</code> 表單 query string</li><li><code>jQuery.noConflict()</code> 釋放 $</li><li>外掛掛在 <code>$.fn.xxx</code></li></ul></section>",
      code: "$.each([1,2,3], (i, v) => console.log(v));\nconst q = $('#form').serialize();\n\n// 簡易 plugin\n$.fn.emphasis = function() {\n  return this.css('font-weight', 'bold');\n};",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>外掛載入順序：jQuery → plugin → init</li></ul>"
    },
    jq_migrate_ref: {
      title: "遷移：jQuery → 原生 / Vue",
      summary: "漸進式：新區塊 Vue 元件，舊區塊保留；或逐函式改寫 querySelector。",
      body: "<section><ol class=\"list-decimal pl-5 space-y-1\"><li>盤點 $ 用法（grep）</li><li>新功能不新增 jQuery 依賴</li><li>Tab/Modal 等抽成元件</li><li>AJAX 新寫 fetch</li><li>移除未使用 plugin 與重複 CDN</li></ol></section>",
      code: "// 對照表\n$('#x').addClass('on');\n→ document.querySelector('#x').classList.add('on');\n\n$('#x').on('click', fn);\n→ el.addEventListener('click', fn);",
      tips: "<ul class=\"list-disc pl-5 space-y-1\"><li>不要一次全站重寫</li><li>每步可部署、可回滾</li></ul>"
    }
  };
})();
