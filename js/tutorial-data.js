const tutorialPreface = {
  title: "🎮 前端學習冒險地圖",
  contentHtml: `<p>歡迎！這裡用<strong>遊戲闖關</strong>的方式學網頁：先懂概念 → 看正規範例 → 動手改程式 → 小測驗拿 XP。</p>
    <p class="mt-2"><strong>重要：</strong>初學者請先學 HTML「結構」，再用 CSS「外觀」——不要在 HTML 標籤上寫一堆 <code>style=""</code>，那是進階應急用法，不是起點。</p>`,
  tools: [
    { icon: "🌐", name: "瀏覽器", desc: "Chrome／Edge 預覽網頁，F12 開發者工具可檢查元素" },
    { icon: "📝", name: "程式編輯器", desc: "VS Code 或 Cursor，負責寫 .html / .css / .js 檔案" },
    { icon: "▶️", name: "本頁沙盒", desc: "左側改碼、按運行，右側即時看結果（免安裝）" },
    { icon: "🎯", name: "練習方式", desc: "每課有「怎麼練」任務，完成可點「我完成了」累積 XP" }
  ],
  path: ["① 入門", "② HTML", "③ CSS", "④ JavaScript", "⑤ 進階實戰", "⑥ 大師之路"]
};

const tutorialRepository = {
  intro_welcome: {
    track: "intro",
    title: "🚀 開始冒險：網頁三劍客",
    desc: "網頁由 HTML（骨架）、CSS（衣服）、JavaScript（動作）組成。你現在看到的每個網站都是這三者合作的结果。",
    concept: "把網頁想成「紙娃娃」：HTML 畫出身體輪廓，CSS 幫它穿衣服上色，JS 讓它會動、會按按鈕。",
    practice: "① 讀完概念 ② 按下方「運行」看範例 ③ 把標題改成你的名字 ④ 通過小測驗",
    code: `<h1>你好，我是學員！</h1>\n<p>我正在 MrBill 前端學堂冒險。</p>\n<p><strong>下一步：</strong>去左邊選「HTML 結構」章節。</p>`,
    tip: "別急著一次學完！每天 1～2 課，改一點程式碼比看十遍更有用。",
    quiz: { q: "網頁的「骨架」主要靠哪種語言？", opts: ["HTML", "CSS", "Excel"], ans: 0 }
  },
  html_vs_css: {
    track: "intro",
    title: "⚖️ 為什麼不要一開始就用行內 style？",
    desc: "正規做法：HTML 只描述「這是標題、這是段落」；顏色、字體、間距交給 CSS。行內 style 難維護，也不利於 RWD。",
    concept: "❌ 初學常見誤區：<code>&lt;p style=\"color:red\"&gt;</code> 到處寫顏色。<br>✅ 正規：HTML 寫 <code>&lt;p class=\"tip\"&gt;</code>，CSS 檔案寫 <code>.tip { color: red; }</code>",
    practice: "① 比較下方兩段結構 ② 在 CSS 區塊把 .hero 改成藍色 ③ 想想：改 100 個段落顏色，改一個 class 快還是改 100 個 style 快？",
    code: `<style>\n  .hero {\n    color: #4f46e5;\n    font-size: 1.5rem;\n    font-weight: bold;\n  }\n  .note {\n    color: #64748b;\n    line-height: 1.7;\n  }\n</style>\n\n<h1 class="hero">正規寫法：結構與樣式分離</h1>\n<p class="note">HTML 管語意，CSS 管外觀。試著把 .hero 的 color 改成 #0891b2 再按運行！</p>`,
    tip: "專案變大後，你會把 CSS 放到獨立 .css 檔，用 <link rel=\"stylesheet\" href=\"style.css\"> 引入。",
    quiz: { q: "正規開發中，字體顏色應主要寫在？", opts: ["CSS", "HTML 行內 style", "Word"], ans: 0 }
  },
  html_skeleton: {
    track: "html",
    title: "🧱 完整 HTML 文件骨架",
    desc: "真實網頁需要 <!DOCTYPE html>、<html>、<head>、<body>。head 放設定，body 放看得見的內容。",
    concept: "head 像信封上的地址（給瀏覽器看）；body 像信裡的正文（給使用者看）。",
    practice: "① 運行範例 ② 在 body 加一個 <footer> 寫版權 ③ 把 <title> 改成你的作品名",
    code: `<!DOCTYPE html>\n<html lang="zh-Hant">\n<head>\n  <meta charset="UTF-8">\n  <title>我的第一個網頁</title>\n</head>\n<body>\n  <h1>Body 裡的內容會顯示在畫面上</h1>\n  <p>head 裡的 title 會顯示在瀏覽器分頁標題。</p>\n</body>\n</html>`,
    tip: "漏掉 charset=UTF-8 時，中文可能變成亂碼。",
    quiz: { q: "使用者看得見的按鈕、圖片應寫在？", opts: ["<body>", "<head>", "<meta>"], ans: 0 }
  },
  html_headings: {
    track: "html",
    title: "📝 標題 h1～h6 與段落 p",
    desc: "h1 通常全頁只有一個（主標題），h2、h3 是章節。 p 是段落。順序不要跳級（h1 下一個應是 h2 不是 h4）。",
    concept: "標題是「大綱」，搜尋引擎與螢幕閱讀器都靠它理解文章結構。",
    practice: "① 加一個 h2 小節 ② 在 p 裡用 <strong> 強調一個詞（仍不寫 style）",
    code: `<h1>攝影視覺學堂</h1>\n<h2>第一章：光與構圖</h2>\n<p>光是攝影的靈魂。<strong>順光</strong>拍風景，<strong>側光</strong>拍人像。</p>\n<h2>第二章：曝光</h2>\n<p>光圈、快門、ISO 三要素要平衡。</p>`,
    tip: "視覺大小交給 CSS 的 font-size，語意層級用 h1～h6。",
    quiz: { q: "一個頁面通常只有幾個 h1？", opts: ["1 個", "越多越好", "0 個"], ans: 0 }
  },
  html_inline: {
    track: "html",
    title: "🔗 超連結 a 標籤",
    desc: "href 指定網址；target=\"_blank\" 可開新分頁。連結文字要清楚（避免只寫「點這裡」）。",
    concept: "a 是 Anchor（錨點），把使用者带到另一個資源。",
    practice: "① 加一個連到 photography.html 的文字連結（本機路徑）② 用 CSS 區塊把連結改成品牌色",
    code: `<style>\n  a {\n    color: #4f46e5;\n    font-weight: bold;\n    text-decoration: none;\n  }\n  a:hover {\n    text-decoration: underline;\n  }\n</style>\n\n<p>學完 HTML 後，前往 <a href="photography.html">攝影視覺學堂</a> 練曝光！</p>`,
    tip: "hover 是滑鼠移上去時的狀態，屬於 CSS 偽類。",
    quiz: { q: "新分頁開啟連結的屬性是？", opts: ["target=\"_blank\"", "color=\"blue\"", "href=\"new\""], ans: 0 }
  },
  html_media: {
    track: "html",
    title: "🖼 圖片 img 標籤",
    desc: "img 是自闭合標籤：src 路徑、alt 替代文字（SEO 與無障礙必寫）。",
    concept: "alt 在圖片載入失敗或視障朗讀時描述圖片內容。",
    practice: "① 換一張圖的 src（可用 Unsplash 網址）② 寫清楚的 alt 中文描述",
    code: `<style>\n  .photo {\n    max-width: 100%;\n    border-radius: 12px;\n  }\n</style>\n\n<img class="photo"\n  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400"\n  alt="單眼相機特寫">\n<p>圓角由 CSS 的 border-radius 控制，不是寫在 img 上。</p>`,
    tip: "永遠寫 alt。破圖時使用者至少知道這裡原本要呈現什麼。",
    quiz: { q: "圖片載入失敗時，幫助說明靠的是？", opts: ["alt", "src", "href"], ans: 0 }
  },
  html_lists: {
    track: "html",
    title: "📋 ul / ol 清單",
    desc: "ul 無序（圓點）、ol 有序（數字），項目一律包在 li 裡。",
    concept: "清單語意讓搜尋引擎知道「這是一組相關項目」。",
    practice: "① 做一個三項的 ul 學習清單 ② 用 CSS 去掉預設圓點並改成 ✓",
    code: `<style>\n  .checklist {\n    list-style: none;\n    padding-left: 0;\n  }\n  .checklist li::before {\n    content: "✓ ";\n    color: #10b981;\n    font-weight: bold;\n  }\n</style>\n\n<ul class="checklist">\n  <li>學會 HTML 結構</li>\n  <li>學會 CSS 排版</li>\n  <li>用 JS 做互動</li>\n</ul>`,
    tip: "導覽列常用 ul + li + a 組成。",
    quiz: { q: "有編號 1.2.3. 的清單用？", opts: ["<ol>", "<ul>", "<table>"], ans: 0 }
  },
  html_tables: {
    track: "html",
    title: "📊 table 表格",
    desc: "table > tr > th/td。th 是表頭，td 是資料格。",
    concept: "表格只用在真正的表格式資料，不要用 table 做整頁排版（那是 20 年前的做法）。",
    practice: "① 做光圈 F 值與景深對照表 ② 用 CSS 讓表頭有底色",
    code: `<style>\n  table { width: 100%; border-collapse: collapse; }\n  th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0; }\n  th { background: #f1f5f9; color: #4f46e5; }\n</style>\n\n<table>\n  <tr><th>光圈</th><th>景深</th></tr>\n  <tr><td>F1.4</td><td>很淺、背景糊</td></tr>\n  <tr><td>F16</td><td>很深、前後都清楚</td></tr>\n</table>`,
    tip: "border-collapse: collapse 可去掉雙重邊框。",
    quiz: { q: "表頭儲存格標籤是？", opts: ["<th>", "<td>", "<thead>"], ans: 0 }
  },
  html_containers: {
    track: "html",
    title: "📂 語意化標籤 header / main / section",
    desc: "用有意義的標籤取代滿屏 div，利於 SEO 與維護。",
    concept: "section 是一個主題區塊；article 是一篇可獨立分享的文章。",
    practice: "① 用 header + main + footer 組一個迷你頁面 ② 在 main 裡加兩個 section",
    code: `<header>\n  <h1>MrBill 學堂</h1>\n</header>\n<main>\n  <section>\n    <h2>今日任務</h2>\n    <p>完成 HTML 清單練習。</p>\n  </section>\n</main>\n<footer>\n  <p>© 2026 練習作品</p>\n</footer>`,
    tip: "一個頁面通常只有一個 main。",
    quiz: { q: "主要內容區建議用？", opts: ["<main>", "<div id=\"main\">", "<b>"], ans: 0 }
  },
  html_inputs: {
    track: "html",
    title: "📝 表單 input",
    desc: "type 可為 text、email、password、number 等。label 要對應 input 提升可用性。",
    concept: "表單是使用者「把資料交給網站」的通道。",
    practice: "① 加 label ② 用 CSS 統一 input 圓角與 padding",
    code: `<style>\n  label { display: block; font-weight: bold; margin-bottom: 6px; }\n  input {\n    width: 100%;\n    max-width: 280px;\n    padding: 10px 14px;\n    border: 1px solid #cbd5e1;\n    border-radius: 10px;\n    font-size: 1rem;\n  }\n  input:focus {\n    outline: 2px solid #818cf8;\n    border-color: #6366f1;\n  }\n</style>\n\n<label for="name">學員姓名</label>\n<input id="name" type="text" placeholder="輸入你的名字">`,
    tip: "focus 狀態要讓使用者知道「現在正在輸入這一格」。",
    quiz: { q: "密碼欄位 type 應設？", opts: ["password", "secret", "hidden"], ans: 0 }
  },
  css_selectors: {
    track: "css",
    title: "🎯 CSS 選擇器與 class",
    desc: "用 .classname 選到 HTML 的 class=\"classname\"。標籤選擇器如 p {} 則選所有段落。",
    concept: "選擇器像「點名」：叫到名字的元素才套用樣式。",
    practice: "① 新增 .highlight class ② 讓第二個 p 套用 highlight",
    code: `<style>\n  p { color: #475569; line-height: 1.7; }\n  .highlight {\n    color: #4f46e5;\n    font-weight: bold;\n    background: #eef2ff;\n    padding: 8px 12px;\n    border-radius: 8px;\n  }\n</style>\n\n<p>一般段落。</p>\n<p class="highlight">被 .highlight 選中的段落！</p>`,
    tip: "優先用 class，少用 #id（權重太高難覆寫）。",
    quiz: { q: "class 選擇器開頭符號是？", opts: [".", "#", "*"], ans: 0 }
  },
  css_colors: {
    track: "css",
    title: "🎨 色彩與漸層",
    desc: "color 文字色、background 背景。linear-gradient 可做漸層。",
    concept: "品牌色建議固定 2～3 個主色，全站重複使用。",
    practice: "① 拖下方「色相」滑桿（若有）② 改漸層第二個色為你喜歡的色",
    code: `<style>\n  .card {\n    background: linear-gradient(135deg, #4f46e5, #06b6d4);\n    color: white;\n    padding: 24px;\n    border-radius: 16px;\n    text-align: center;\n    font-weight: bold;\n  }\n</style>\n\n<div class="card">漸層卡片：改 CSS 裡的色碼試試！</div>`,
    tip: "避免純 #ff0000 大紅大綠，多用帶灰的 slate、indigo 色系。",
    playground: "hue",
    quiz: { q: "背景漸層常用屬性是？", opts: ["linear-gradient", "font-gradient", "shadow-gradient"], ans: 0 }
  },
  css_typography: {
    track: "css",
    title: "🔠 字體與行高",
    desc: "font-size、font-weight、line-height。正文 line-height 建議 1.6～1.8。",
    concept: "行高太擠會難讀；標題與內文要有明顯大小對比。",
    practice: "① 把 line-height 改成 2 看差異 ② 標題 font-weight: 800",
    code: `<style>\n  body { font-family: -apple-system, "Noto Sans TC", sans-serif; }\n  h1 { font-size: 1.75rem; font-weight: 800; color: #0f172a; }\n  .article { font-size: 1rem; line-height: 1.8; color: #475569; max-width: 36em; }\n</style>\n\n<h1>舒適排版</h1>\n<p class="article">行高 1.8 讓長文像在書本上一樣好讀。試著改成 1.3 比較看看。</p>`,
    tip: "系統字體棧 -apple-system 在 Mac/iPhone 上很清晰。",
    quiz: { q: "拉開文字行距的屬性是？", opts: ["line-height", "letter-spacing", "font-gap"], ans: 0 }
  },
  css_spacing: {
    track: "css",
    title: "📦 盒子模型：padding 與 margin",
    desc: "content → padding（內距）→ border → margin（外距）。",
    concept: "padding 撐大點擊區；margin 推開隔壁盒子。",
    practice: "① 拖「內距」滑桿看變化 ② 註解：哪個盒子變大但文字區沒變？",
    code: `<style>\n  .outer { background: #f1f5f9; padding: 16px; border-radius: 12px; }\n  .inner {\n    background: white;\n    border: 2px solid #6366f1;\n    padding: 20px;\n    border-radius: 8px;\n    font-weight: bold;\n    color: #4338ca;\n  }\n</style>\n\n<div class="outer">\n  <div class="inner" id="spacing-demo">內距 padding 在這裡</div>\n</div>`,
    tip: "卡片設計常給 padding: 24px 以上，留白就是高級感。",
    playground: "padding",
    quiz: { q: "推開「隔壁」盒子的距離是？", opts: ["margin", "padding", "border"], ans: 0 }
  },
  css_flexbox: {
    track: "css",
    title: "📐 Flexbox 橫向排版",
    desc: "父層 display:flex；justify-content 管水平；align-items 管垂直對齊。",
    concept: "導覽列、按鈕列、卡片內「左文右鈕」都是 Flex 的經典場景。",
    practice: "① 點下方按鈕切換對齊 ② 觀察左側程式碼的 justify-content 會同步改變 ③ 再按運行",
    code: `<style>\n  .bar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 12px 16px;\n    background: white;\n    border: 1px solid #e2e8f0;\n    border-radius: 12px;\n    max-width: 100%;\n    box-sizing: border-box;\n  }\n  .btn { background: #4f46e5; color: white; border: none; padding: 8px 14px; border-radius: 8px; font-weight: bold; }\n</style>\n\n<div class="bar" id="flex-demo">\n  <span>左側標題</span>\n  <button class="btn" type="button">右側按鈕</button>\n</div>`,
    tip: "手機 RWD 常加 flex-wrap: wrap 讓項目自動換行。",
    playground: "flex",
    quiz: { q: "Flex 容器要設？", opts: ["display: flex", "position: flex", "flex: display"], ans: 0 }
  },
  css_grid: {
    track: "css",
    title: "📊 CSS Grid 網格",
    desc: "display:grid 把容器切成「欄 × 列」的格子。grid-template-columns 決定幾欄；gap 是格子間距。",
    concept: "口訣：<strong>先開 grid → 定幾欄 → 丟子元素進去</strong>。<br>固定欄數：<code>repeat(3, minmax(0, 1fr))</code>（3 欄，窄框不跑版）。<br>自動欄數：<code>repeat(auto-fit, minmax(120px, 1fr))</code>（寬度夠就排多欄，不夠就自動換行）。",
    practice: "① 拖欄數滑桿看程式碼變化 ② 加第 4 個 .cell ③ 把 minmax 第一個數改成 80px 看格子變窄",
    code: `<style>\n  .wrap {\n    width: 100%;\n    max-width: 100%;\n    min-width: 0;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));\n    gap: 8px;\n    width: 100%;\n    max-width: 100%;\n    min-width: 0;\n  }\n  .cell {\n    background: #ede9fe;\n    color: #4f46e5;\n    padding: 12px 4px;\n    text-align: center;\n    border-radius: 8px;\n    font-weight: bold;\n    font-size: 13px;\n    min-width: 0;\n    overflow: hidden;\n    word-break: break-word;\n  }\n</style>\n<div class="wrap">\n  <div class="grid" id="grid-demo">\n    <div class="cell">A</div>\n    <div class="cell">B</div>\n    <div class="cell">C</div>\n  </div>\n</div>`,
    tip: "用 minmax(0, 1fr) 可避免 Grid 在窄容器裡撐破版面（跑版）。",
    playground: "grid",
    quiz: { q: "Grid 欄數常用？", opts: ["grid-template-columns", "grid-rows-only", "flex-columns"], ans: 0 }
  },
  css_position: {
    track: "css",
    title: "📍 定位 position 五種模式",
    desc: "static（預設）→ relative（偏移但留位）→ absolute（脫離流動）→ fixed（黏視窗）→ sticky（滾動黏住）。",
    concept: "<ul style='margin:0;padding-left:1.2em;line-height:1.7'><li><b>static</b>：正常排版，不能設 top/left</li><li><b>relative</b>：相對自己原位置微移；是 absolute 的參考父層</li><li><b>absolute</b>：相對「最近的 relative 祖先」定位，常用角標</li><li><b>fixed</b>：相對螢幕視窗，如固定導覽列</li><li><b>sticky</b>：滾到某處後黏在頂部</li></ul>",
    practice: "① 點下方五種模式按鈕，左側程式碼會整段更新 ② 每種都按運行觀察 ③ 理解 absolute 一定要父層 relative",
    code: `<style>\n  .stage {\n    position: relative;\n    height: 120px;\n    background: #f1f5f9;\n    border-radius: 12px;\n    border: 2px dashed #cbd5e1;\n    overflow: hidden;\n  }\n  .pin {\n    position: absolute;\n    top: 12px;\n    right: 12px;\n    background: #ef4444;\n    color: #fff;\n    font-size: 12px;\n    font-weight: bold;\n    padding: 6px 10px;\n    border-radius: 6px;\n  }\n  .hint { padding: 12px; font-size: 13px; color: #64748b; }\n</style>\n<p class="hint">目前示範：<strong>absolute</strong>（父層 .stage 為 relative）</p>\n<div class="stage"><span class="pin">角標</span></div>`,
    tip: "沒寫父層 relative 時，absolute 會一路往上找，常常飛到整頁左上角。",
    playground: "position",
    quiz: { q: "角標貼在卡片角落的組合？", opts: ["父 relative + 子 absolute", "都 static", "子 fixed 無父層"], ans: 0 }
  },
  css_shadows: {
    track: "css",
    title: "🌫 陰影 box-shadow",
    desc: "box-shadow: x y blur spread color。淡而大的陰影比粗黑邊高級。",
    concept: "陰影模擬「卡片浮在紙上方」的距離感。",
    practice: "① 把 blur 從 20px 改成 40px ② 透明度改 0.15 看差異",
    code: `<style>\n  .float-card {\n    background: white;\n    padding: 24px;\n    border-radius: 16px;\n    text-align: center;\n    font-weight: bold;\n    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);\n  }\n</style>\n\n<div class="float-card">懸浮卡片</div>`,
    tip: "rgba 最後一位是透明度，0.05～0.1 很常用。",
    quiz: { q: "卡片立體感主要靠？", opts: ["box-shadow", "text-shadow only", "border: 5px"], ans: 0 }
  },
  css_transitions: {
    track: "css",
    title: "✨ 過渡 transition 與 hover",
    desc: "transition 描述「屬性改變時要多慢變完」。語法：transition: 屬性 時間 曲線;",
    concept: "<b>transition</b> = 從 A 狀態到 B 狀態的「過程」。（只改一次）<br><b>animation</b> = 可循環、多步驟的動畫。（下一課）<br>常寫：<code>transition: background 0.25s ease, transform 0.25s ease;</code><br>觸發方式：多半是 <code>:hover</code>、<code>:focus</code>、或 JS 加 class。<br>時間：0.2s～0.35s 最自然；超過 0.5s 會覺得遲鈍。",
    practice: "① 滑鼠移入按鈕 ② 拖「動畫秒數」滑桿改 transition ③ 把 ease 改成 ease-in-out 比較",
    code: `<style>\n  .btn {\n    padding: 12px 24px;\n    background: #0f172a;\n    color: white;\n    border: none;\n    border-radius: 10px;\n    font-weight: bold;\n    cursor: pointer;\n    transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;\n  }\n  .btn:hover {\n    background: #4f46e5;\n    transform: translateY(-3px);\n    box-shadow: 0 8px 20px rgba(79, 70, 229, 0.35);\n  }\n  .card {\n    margin-top: 16px;\n    padding: 16px;\n    background: #f8fafc;\n    border-radius: 10px;\n    transition: opacity 0.25s ease;\n  }\n  .card:hover { opacity: 0.7; }\n</style>\n<button class="btn" type="button">主要按鈕（hover 我）</button>\n<div class="card">區塊 hover 會變淡</div>`,
    tip: "大專案避免 transition: all，只列會變的屬性（效能較好）。",
    playground: "transition",
    quiz: { q: "滑鼠移入變色用偽類？", opts: [":hover", ":click", ":mouse"], ans: 0 }
  },
  intro_js_whatis: {
    track: "js",
    title: "🧠 JavaScript 在做什麼？（新手必讀）",
    desc: "HTML 蓋房子、CSS 裝潢、JS 裝電梯與開關——讓網頁「會回應你」。",
    concept: "瀏覽器讀完 HTML/CSS 後，再執行 JS。<br>業界常見三件事：1) 操作 DOM / 互動狀態（class、文字、表單）2) 呼叫 API（fetch/axios）3) 處理非同步與錯誤（async/await + try/catch）。<br>執行順序：先載入 HTML → 遇到 &lt;script&gt; 就執行 JS（通常放 body 最後）。",
    practice: "① 讀下方三步註解 ② 按按鈕看文字變化 ③ 打開 F12 Console 看有沒有錯誤紅字",
    code: `<p id="explain">JS 會在載入後立刻執行第一行</p>\n<button type="button" id="go">點我改變說明</button>\n<script>\n  // 第 1 步：找到元素（像 document 是整頁的入口）\n  var msg = document.getElementById("explain");\n  var btn = document.getElementById("go");\n  // 第 2 步：註冊「點擊時要做的事」\n  btn.addEventListener("click", function() {\n    msg.textContent = "你點了按鈕！JS 正在改 DOM 文字。";\n    msg.style.color = "#4f46e5";\n  });\n<\/script>`,
    tip: "看不懂時：先看 Console 錯誤第幾行，再對照程式碼。",
    quiz: { q: "改變按鈕文字用哪個？", opts: ["JavaScript", "只有 HTML", "只有 CSS"], ans: 0 }
  },
  js_variables: {
    track: "js",
    title: "🔢 變數 const 與 let",
    desc: "變數 = 有名字的盒子。const 盒子裡的引用不能換；let 可以重新賦值。",
    concept: "<code>const name = \"小明\";</code> 之後不能再 name = \"小華\"（會報錯）。<br><code>let score = 0;</code> 之後可以 score = 100。<br>新手口訣：<strong>預設用 const，只有會變的數字/計數器才用 let</strong>。<br>字串用引號、數字不用引號。",
    practice: "① 按 +100 看分數累加 ② 把 const teacher 改成你的名字 ③ 試著把 score 改成 const 看報錯（理解差異）",
    code: `<p id="score-text">載入中…</p>\n<button type="button" id="add-btn">+100 分</button>\n<script>\n  const teacher = "MrBill";  // 不會改的資料\n  let score = 0;             // 會累加的資料\n  const textEl = document.getElementById("score-text");\n  const btn = document.getElementById("add-btn");\n  function render() {\n    textEl.textContent = teacher + " 教學分數：" + score;\n  }\n  btn.addEventListener("click", function() {\n    score = score + 100;  // let 才能改\n    render();\n  });\n  render();\n<\/script>`,
    tip: "不要用 var（舊語法，作用域容易出錯）。",
    quiz: { q: "分數會累加應宣告？", opts: ["let", "const", "frozen"], ans: 0 }
  },
  js_conditionals: {
    track: "js",
    title: "🎯 if / else 條件判斷",
    desc: "程式會「看情況」走不同路：if (條件) { 做 A } else { 做 B }",
    concept: "條件結果是 true / false。<br>比較：<code>score >= 90</code>、<code>name === \"Bill\"</code>（字串用 ===）。<br>可串 <code>else if (score >= 60)</code> 做多段分級。<br>像路標：分數夠顯示「通過」，不夠顯示「再試一次」。",
    practice: "① 改 examScore 為 59 再按按鈕 ② 改成 95 ③ 加 else if (score >= 60) 顯示「及格」",
    code: `<p id="result">按按鈕測驗</p>\n<button type="button" id="check-btn">檢查分數 95</button>\n<script>\n  document.getElementById("check-btn").addEventListener("click", function() {\n    const examScore = 95;\n    const el = document.getElementById("result");\n    if (examScore >= 90) {\n      el.textContent = "🎉 解鎖高階班！";\n      el.style.color = "#059669";\n    } else {\n      el.textContent = "💪 再接再厲！";\n      el.style.color = "#dc2626";\n    }\n  });\n<\/script>`,
    tip: "條件裡用 === 比較，不要用 =（那是指派）。",
    quiz: { q: "分數大於等於 90 用？", opts: ["if (score >= 90)", "if score = 90", "when score"], ans: 0 }
  },
  js_arrays: {
    track: "js",
    title: "🗂 陣列與迴圈",
    desc: "陣列 [] 存清單；forEach 逐項處理。",
    concept: "攝影課程列表、相簿縮圖都可存在陣列，用迴圈一次畫出來。",
    practice: "① 在陣列加第四個課名 ② 看預覽列表是否多一行",
    code: `<ul id="lesson-list"></ul>\n<script>\n  const lessons = ["HTML", "CSS", "JavaScript"];\n  const ul = document.getElementById("lesson-list");\n  lessons.forEach(function(name) {\n    const li = document.createElement("li");\n    li.textContent = "📘 " + name;\n    ul.appendChild(li);\n  });\n<\/script>`,
    tip: "物件 {} 適合「一筆資料有多個欄位」，陣列適合「一串清單」。",
    quiz: { q: "有序清單資料結構？", opts: ["陣列 Array", "只有字串", "table"], ans: 0 }
  },
  js_functions: {
    track: "js",
    title: "📦 函式 function",
    desc: "函式 = 取名字的一段程式。可傳入參數 (w, h)，用 return 把結果交回去。",
    concept: "宣告：<code>function 名稱(參數) { return 結果; }</code><br>呼叫：<code>calculateArea(300, 200)</code> → 得到 60000。<br>好處：同樣邏輯寫一次，到處呼叫；改公式只改一處。<br>像計算機按鍵：按一次執行同一套公式。",
    practice: "① 改 calculateArea(300,200) 的數字 ② 新增 function calculatePerimeter(w,h){ return 2*(w+h); } 並顯示",
    code: `<p id="area-out"></p>\n<button type="button" id="calc-btn">重新計算</button>\n<script>\n  function calculateArea(w, h) {\n    return w * h;\n  }\n  function showArea() {\n    const w = 300, h = 200;\n    const px = calculateArea(w, h);\n    document.getElementById("area-out").textContent =\n      "寬 " + w + " × 高 " + h + " = " + px + " 平方像素";\n  }\n  document.getElementById("calc-btn").addEventListener("click", showArea);\n  showArea();\n<\/script>`,
    tip: "函式名用動詞開頭：getUser、renderList、runSandbox。",
    quiz: { q: "函式用來？", opts: ["重用一段邏輯", "只為了變長", "取代 HTML"], ans: 0 }
  },
  js_events: {
    track: "js",
    title: "🖱 事件監聽 addEventListener",
    desc: "把「使用者做了什麼」綁到「要執行的函式」。常見：click、input、submit、keydown。",
    concept: "三步驟：<br>1. 選元素 <code>const btn = document.querySelector('#id')</code><br>2. 監聽 <code>btn.addEventListener('click', 函式)</code><br>3. 在函式裡改畫面（textContent / classList）<br>業界常見加碼：<strong>debounce</strong> 用在搜尋/自動完成，避免每按一個鍵都重算或打 API。",
    practice: "① 點按鈕看互動 ② 在搜尋框輸入文字：停止輸入約 300ms 才更新提示清單 ③ 把 300ms 改成 100ms，比較體感。",
    code: `<button type="button" id="hello-btn">點我</button>\n<input id="query-in" placeholder="輸入關鍵字（搜尋提示範例）" style="display:block;margin:8px 0;padding:8px;width:100%;max-width:320px;border:1px solid #cbd5e1;border-radius:8px">\n<p id="msg">等待互動…</p>\n<ul id="results" style="margin:8px 0 0;padding-left:18px;color:#334155;font-weight:700"></ul>\n<script>\n  const btn = document.getElementById("hello-btn");\n  const input = document.getElementById("query-in");\n  const msg = document.getElementById("msg");\n  const results = document.getElementById("results");\n\n  const items = [\n    "fetch API",\n    "表單驗證",\n    "事件監聽",\n    "querySelector",\n    "transition 與 hover",\n    "DOM 操作",\n    "字體行高 line-height",\n    "CSS Grid 網格"\n  ];\n\n  let timer = null;\n\n  function render(list) {\n    results.innerHTML = \"\";\n    list.forEach(function(t) {\n      const li = document.createElement(\"li\");\n      li.textContent = t;\n      results.appendChild(li);\n    });\n  }\n\n  btn.addEventListener(\"click\", function() {\n    msg.textContent = \"按鈕被點了！\";\n    msg.style.color = \"#4f46e5\";\n  });\n\n  input.addEventListener(\"input\", function() {\n    msg.textContent = \"輸入中…\";\n    msg.style.color = \"#64748b\";\n\n    clearTimeout(timer);\n    timer = setTimeout(function() {\n      const q = input.value.trim().toLowerCase();\n\n      if (!q) {\n        msg.textContent = \"等待輸入…\";\n        msg.style.color = \"#64748b\";\n        results.innerHTML = \"\";\n        return;\n      }\n\n      const filtered = items\n        .filter(function(t) { return t.toLowerCase().includes(q); })\n        .slice(0, 5);\n\n      if (filtered.length === 0) {\n        msg.textContent = \"找不到符合的標籤\";\n        msg.style.color = \"#dc2626\";\n        results.innerHTML = \"\";\n        return;\n      }\n\n      msg.textContent = \"搜尋提示（debounce）\";\n      msg.style.color = \"#059669\";\n      render(filtered);\n    }, 300);\n  });\n<\/script>`,
    tip: "HTML 管結構，JS 管行為——盡量別在 HTML 寫 onclick。搜尋提示通常用 debounce 防止抖動與過度呼叫。",
    quiz: { q: "正規綁定點擊用？", opts: ["addEventListener", "only onclick=\"\"", "marquee"], ans: 0 }
  }
};

/** 進階與大師課程（合併進主線） */
Object.assign(tutorialRepository, {
  intro_devtools: {
    track: "intro",
    title: "🔧 開發者工具 F12 入門",
    desc: "右鍵「檢查」→ Elements 看 HTML/CSS、Console 看錯誤、Network 看載入。",
    concept: "F12 是前端玩家的透視眼：即時改 CSS 做實驗，確認後再寫回檔案。",
    practice: "① 在本頁預覽區右鍵檢查 ② 改一個 h1 的 color ③ 重新整理看改動消失（因未存檔）",
    code: `<h1>用 F12 檢查我</h1>\n<p>在 Elements 面板可暫時改樣式做實驗。</p>`,
    tip: "Console 紅字是 JavaScript 錯誤，從最下面一行開始讀。",
    quiz: { q: "即時查看元素 HTML/CSS 用？", opts: ["Elements 面板", "Excel", "記事本"], ans: 0 }
  },
  intro_files: {
    track: "intro",
    title: "📁 專案檔案結構",
    desc: "典型小站：index.html、style.css、main.js、images/ 資料夾。",
    concept: "分檔 = 分工：結構、樣式、邏輯各管各，團隊才協作得了。",
    practice: "① 畫出你的作品集資料夾樹 ② 用 link 引入外部 CSS（見下一課概念）",
    code: `<!DOCTYPE html>\n<html lang="zh-Hant">\n<head>\n  <meta charset="UTF-8">\n  <title>檔案結構示範</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>HTML 在 index.html</h1>\n  <p>樣式在 style.css，行為在 main.js</p>\n</body>\n</html>`,
    tip: "檔名用小寫、英文、連字號：my-project.css",
    quiz: { q: "全站樣式通常放？", opts: ["style.css", "index.html 裡全部寫", "Word"], ans: 0 }
  },
  html_button: {
    track: "html",
    title: "🔘 button 按鈕語意",
    desc: "表單送出、主要行動用 button；導覽連結仍用 a。",
    concept: "button type=\"button\" 不會送出表單；type=\"submit\" 會。",
    practice: "① 做兩個 button ② 用 CSS .primary / .ghost 區分樣式",
    code: `<style>\n  .primary { background:#4f46e5; color:#fff; border:none; padding:10px 18px; border-radius:10px; font-weight:bold; cursor:pointer; }\n  .ghost { background:transparent; color:#4f46e5; border:2px solid #4f46e5; padding:8px 16px; border-radius:10px; cursor:pointer; margin-left:8px; }\n</style>\n<button type="button" class="primary">主要動作</button>\n<button type="button" class="ghost">次要</button>`,
    tip: "可點的元素要有 cursor: pointer。",
    quiz: { q: "不送出表單的按鈕 type？", opts: ["button", "submit", "reset"], ans: 0 }
  },
  html_form: {
    track: "html",
    title: "📋 完整表單 form",
    desc: "form 包 input、label、textarea、select、button。",
    concept: "label 的 for 對應 input 的 id，點文字也能聚焦輸入框。",
    practice: "① 加 textarea 留言 ② 加 select 下拉選課程",
    code: `<style>\n  form { max-width:320px; }\n  label { display:block; font-weight:bold; margin:12px 0 6px; }\n  input, select, textarea { width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:8px; box-sizing:border-box; }\n</style>\n<form>\n  <label for="email">Email</label>\n  <input id="email" type="email" placeholder="you@example.com">\n  <label for="course">課程</label>\n  <select id="course"><option>HTML</option><option>CSS</option></select>\n  <button type="submit" style="margin-top:12px;width:100%;padding:12px;background:#4f46e5;color:#fff;border:none;border-radius:10px;font-weight:bold;">送出</button>\n</form>`,
    tip: "前端驗證用 required、pattern；後端仍要再驗證。",
    quiz: { q: "label for 對應？", opts: ["input 的 id", "body", "CSS class"], ans: 0 }
  },
  html_nav: {
    track: "html",
    title: "🧭 導覽列 nav",
    desc: "nav 內放 ul > li > a，是網站選單的語意標準寫法。",
    concept: "搜尋引擎與螢幕閱讀器會辨識「這是導覽區」。",
    practice: "① 做三個連結 ② 用 Flex 橫向排（複習 flex 課）",
    code: `<style>\n  nav ul { list-style:none; margin:0; padding:0; display:flex; gap:12px; }\n  nav a { text-decoration:none; color:#475569; font-weight:bold; padding:8px 12px; border-radius:8px; }\n  nav a:hover { background:#f1f5f9; color:#4f46e5; }\n</style>\n<nav>\n  <ul>\n    <li><a href="index.html">首頁</a></li>\n    <li><a href="tutorial.html">手冊</a></li>\n    <li><a href="photography.html">攝影</a></li>\n  </ul>\n</nav>`,
    tip: "當前頁面連結可加 aria-current=\"page\"（進階 a11y）。",
    quiz: { q: "導覽語意標籤？", opts: ["<nav>", "<div class=\"nav\">", "<table>"], ans: 0 }
  },
  css_box_model: {
    track: "css",
    title: "📦 盒子模型全貌",
    desc: "content + padding + border + margin。box-sizing: border-box 讓 width 含 padding。",
    concept: "border-box 是現代 UI 預設思維：設 width:200px 就真的 200px 寬。",
    practice: "① 比較 content-box vs border-box ② 改 width 看差異",
    code: `<style>\n  .box { width:160px; padding:20px; border:4px solid #6366f1; background:#eef2ff; margin:8px; display:inline-block; vertical-align:top; }\n  .content-box { box-sizing:content-box; }\n  .border-box { box-sizing:border-box; }\n</style>\n<div class="box content-box">content-box</div>\n<div class="box border-box">border-box</div>`,
    tip: "全站常寫 * { box-sizing: border-box; }",
    quiz: { q: "width 含 padding 用？", opts: ["border-box", "content-box", "margin-box"], ans: 0 }
  },
  css_display: {
    track: "css",
    title: "👁 display 顯示模式",
    desc: "block 獨占一行；inline 不換行；inline-block 可設寬高又不換行。",
    concept: "display:none 完全隱藏；visibility:hidden 仍佔空間。",
    practice: "① 把 .tag 改成 display:block ② 試 inline-block 做標籤列",
    code: `<style>\n  .block { display:block; background:#e0e7ff; padding:8px; margin:4px 0; }\n  .inline { display:inline; background:#fef3c7; padding:4px; }\n  .ib { display:inline-block; background:#d1fae5; padding:8px 12px; margin:4px; border-radius:8px; }\n</style>\n<span class="block">block 一行</span>\n<span class="inline">inline A</span>\n<span class="inline">inline B</span>\n<span class="ib">inline-block</span>`,
    tip: "Flex/Grid 會改變子元素 display 行為，需專章理解。",
    quiz: { q: "獨占一整行？", opts: ["block", "inline", "hidden"], ans: 0 }
  },
  css_variables: {
    track: "css",
    title: "🎨 CSS 變數（設計代幣）",
    desc: "在 :root 宣告 --名稱: 值; 各處用 var(--名稱) 引用。改一處，全站同步。",
    concept: "<b>宣告</b>：<code>:root { --brand: #4f46e5; --radius: 12px; --space: 16px; }</code><br><b>使用</b>：<code>color: var(--brand);</code>、<code>border-radius: var(--radius);</code><br><b>備援</b>：<code>var(--brand, #333)</code> 變數不存在時用 #333。<br>實務：把主色、圓角、間距、字級都做成變數 = 小型設計系統。<br>深色模式可在 <code>@media (prefers-color-scheme: dark)</code> 裡覆寫 --brand。",
    practice: "① 點下方主色按鈕看全站變色 ② 手動改 --radius 為 4px 看卡片變方 ③ 加 --space 給 .btn 的 padding",
    code: `<style>\n  :root {\n    --brand: #4f46e5;\n    --brand-soft: #ede9fe;\n    --radius: 12px;\n    --space: 16px;\n  }\n  .card {\n    border: 2px solid var(--brand);\n    background: var(--brand-soft);\n    color: var(--brand);\n    padding: var(--space);\n    border-radius: var(--radius);\n    font-weight: bold;\n    margin-bottom: 12px;\n  }\n  .btn {\n    background: var(--brand);\n    color: #fff;\n    border: none;\n    padding: 10px 18px;\n    border-radius: var(--radius);\n    font-weight: bold;\n    cursor: pointer;\n  }\n</style>\n<div class="card">卡片用 var(--brand)</div>\n<button class="btn" type="button">按鈕也同步</button>`,
    tip: "變數名稱習慣加 -- 前綴，避免和一般屬性搞混。",
    playground: "variables",
    quiz: { q: "使用變數語法？", opts: ["var(--name)", "$name", "color(name)"], ans: 0 }
  },
  css_pseudo: {
    track: "css",
    title: "✨ 偽類 :hover :focus",
    desc: "偽類描述元素狀態；偽元素 ::before ::after 可插入裝飾。",
    concept: ":hover 滑鼠移入；:focus-visible 鍵盤 Tab 聚焦（無障礙）。",
    practice: "① 連結加 :hover ② 用 ::before 在 li 前加 ✓",
    code: `<style>\n  a { color:#4f46e5; font-weight:bold; text-decoration:none; }\n  a:hover { text-decoration:underline; }\n  .list li::before { content:"✓ "; color:#10b981; font-weight:bold; }\n</style>\n<p><a href="#">懸停我</a></p>\n<ul class="list"><li>項目一</li><li>項目二</li></ul>`,
    tip: "::before 的 content 必填，否則不顯示。",
    quiz: { q: "滑鼠移入狀態？", opts: [":hover", "::hover", ":mouse"], ans: 0 }
  },
  css_media_rwd: {
    track: "advanced",
    title: "📱 響應式 @media 怎麼用",
    desc: "@media 讓 CSS「在特定條件下才生效」。最常用：依視窗寬度切版。",
    concept: "<b>語法</b>：<code>@media (條件) { /* 裡面的規則 */ }</code><br><b>min-width</b>：視窗「至少」這麼寬才套用 → <strong>Mobile First</strong>（先寫手機 1 欄，再加寬變 3 欄）。<br><b>max-width</b>：視窗「最多」這麼寬才套用 → Desktop First（先寫桌面，再縮小覆寫）。<br><b>步驟</b>：① 寫預設（手機）② 加 @media (min-width: 600px) { ... } ③ 拖曳預覽框寬度或滑桿看切換點。<br>Tailwind 的 <code>md:</code>、<code>lg:</code> 本質也是幫你產生 @media。",
    practice: "① 拖「斷點 px」滑桿改 min-width ② 預覽區拉窄看何時變 3 欄 ③ 把 min-width 改成 max-width 理解差異",
    code: `<style>\n  .note { font-size: 13px; color: #64748b; margin-bottom: 10px; }\n  .cols {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 10px;\n    width: 100%;\n    max-width: 100%;\n  }\n  .cols div {\n    background: #ede9fe;\n    color: #4f46e5;\n    padding: 14px 8px;\n    border-radius: 10px;\n    text-align: center;\n    font-weight: bold;\n    font-size: 14px;\n    min-width: 0;\n  }\n  /* 視窗寬度 ≥ 600px 時變 3 欄 */\n  @media (min-width: 600px) {\n    .cols { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n  }\n</style>\n<p class="note">預設 1 欄（手機）· 寬度 ≥ 600px 變 3 欄</p>\n<div class="cols"><div>欄 1</div><div>欄 2</div><div>欄 3</div></div>`,
    tip: "斷點沒有標準答案，常見 640 / 768 / 1024px，依設計稿決定。",
    playground: "media",
    quiz: { q: "螢幕至少 600px 寬才套用？", opts: ["min-width: 600px", "max-width: 600px", "width: 600px"], ans: 0 }
  },
  css_flex_advanced: {
    track: "advanced",
    title: "📐 Flex 進階：gap 與 wrap",
    desc: "gap 取代 margin 排間距；flex-wrap 讓項目換行；flex-direction: column 直向。",
    concept: "卡片牆 = flex + wrap + gap，RWD 必備組合。",
    practice: "① 加第四個 .chip 看換行 ② 改 flex-direction: column",
    code: `<style>\n  .chips {\n    display:flex;\n    flex-wrap:wrap;\n    gap:10px;\n    max-width:100%;\n  }\n  .chip { background:#e0e7ff; color:#4338ca; padding:8px 14px; border-radius:999px; font-size:14px; font-weight:bold; }\n</style>\n<div class="chips">\n  <span class="chip">HTML</span><span class="chip">CSS</span><span class="chip">JS</span><span class="chip">RWD</span>\n</div>`,
    tip: "justify-content: center 可做置中標籤列。",
    quiz: { q: "自動換行？", opts: ["flex-wrap: wrap", "wrap: flex", "break: all"], ans: 0 }
  },
  css_animation: {
    track: "advanced",
    title: "🎬 @keyframes 動畫（多範例）",
    desc: "兩步：① @keyframes 取名定義關鍵影格 ② animation: 名稱 時間 曲線 次數;",
    concept: "<code>@keyframes 名稱 { 0% { } 50% { } 100% { } }</code><br><code>animation: 名稱 1s ease infinite;</code>（infinite = 循環）<br>常見：bounce 彈跳、spin 旋轉載入、fadeIn 淡入。<br>與 transition 差異：keyframes 可多步、可自動重播。<br>請加 <code>@media (prefers-reduced-motion: reduce)</code> 關閉動畫（無障礙）。",
    practice: "① 點下方切換 bounce / spin / fadeIn ② 改 animation-duration 為 2s ③ 觀察 @keyframes 裡 % 的意義",
    code: `<style>\n  @keyframes bounce {\n    0%, 100% { transform: translateY(0); }\n    50% { transform: translateY(-10px); }\n  }\n  @keyframes spin {\n    to { transform: rotate(360deg); }\n  }\n  @keyframes fadeIn {\n    from { opacity: 0; transform: scale(0.95); }\n    to { opacity: 1; transform: scale(1); }\n  }\n  .demo {\n    display: inline-block;\n    background: #4f46e5;\n    color: #fff;\n    padding: 12px 18px;\n    border-radius: 12px;\n    font-weight: bold;\n    animation: bounce 1s ease-in-out infinite;\n  }\n  .loader {\n    width: 36px; height: 36px;\n    border: 4px solid #e2e8f0;\n    border-top-color: #4f46e5;\n    border-radius: 50%;\n    margin-top: 16px;\n    animation: spin 0.8s linear infinite;\n  }\n</style>\n<span class="demo" id="anim-demo">XP +50（bounce）</span>\n<div class="loader"></div>`,
    tip: "效能：優先動 transform / opacity，少動 width/height。",
    playground: "animation",
    quiz: { q: "定義動畫步驟用？", opts: ["@keyframes", "@animate", "@transition"], ans: 0 }
  },
  css_zindex: {
    track: "advanced",
    title: "📚 層疊 z-index",
    desc: "position 非 static 才能用 z-index；數字大的在上層。",
    concept: "Modal、下拉選單、固定導覽列都靠層疊控制。",
    practice: "① 改 .popup 的 z-index ② 理解 stacking context",
    code: `<style>\n  .base { position:relative; height:100px; background:#f1f5f9; border-radius:12px; }\n  .popup {\n    position:absolute; top:20px; left:20px;\n    background:#4f46e5; color:#fff; padding:12px 16px;\n    border-radius:10px; font-weight:bold; z-index:2;\n    box-shadow:0 10px 30px rgba(0,0,0,.15);\n  }\n</style>\n<div class="base"><div class="popup">我在上層 z-index:2</div></div>`,
    tip: "z-index 只在同一層疊上下文比較。",
    quiz: { q: "浮在上方通常？", opts: ["較大的 z-index", "較小的 z-index", "color:red"], ans: 0 }
  },
  js_dom: {
    track: "js",
    title: "🌳 DOM 是什麼？",
    desc: "DOM = 瀏覽器把 HTML 變成的「物件樹」。JS 透過 document 找到節點再修改。",
    concept: "<b>找元素</b>：<code>document.getElementById('title')</code><br><b>改文字</b>：<code>el.textContent = '新文字'</code><br><b>改樣式</b>：<code>el.style.color = '#4f46e5'</code><br><b>改 class</b>：<code>el.classList.add('active')</code><br>流程：HTML 載入 → 建立 DOM → JS 在 DOM 上動手腳 → 畫面更新。",
    practice: "① 按按鈕改標題 ② 再加 classList.add('done') 並在 style 裡寫 .done { font-size: 1.2rem; }",
    code: `<style>.done { font-size: 1.25rem; }</style>\n<h1 id="title">原始標題</h1>\n<button type="button" id="btn">改標題 + 樣式</button>\n<script>\n  const btn = document.getElementById("btn");\n  const title = document.getElementById("title");\n  btn.addEventListener("click", function() {\n    title.textContent = "DOM 已更新！";\n    title.style.color = "#4f46e5";\n    title.classList.add("done");\n  });\n<\/script>`,
    tip: "改結構用 createElement + appendChild。",
    quiz: { q: "依 id 選元素？", opts: ["getElementById", "getElement", "findId"], ans: 0 }
  },
  js_queryselector: {
    track: "js",
    title: "🎯 querySelector 選擇器",
    desc: "用 CSS 選擇器語法選元素，比 id 更彈性。",
    concept: "querySelector('.card') 選第一個；querySelectorAll 選全部。",
    practice: "① 選 .item 改背景 ② 迴圈改全部 .item",
    code: `<div class="item">卡片 A</div>\n<div class="item">卡片 B</div>\n<button type="button" id="go">全部變色</button>\n<script>\n  document.getElementById("go").addEventListener("click", function() {\n    document.querySelectorAll(".item").forEach(function(el) {\n      el.style.background = "#ede9fe";\n      el.style.padding = "12px";\n      el.style.borderRadius = "8px";\n      el.style.marginBottom = "8px";\n    });\n  });\n<\/script>`,
    tip: "選擇器寫錯會回傳 null，記得防呆。",
    quiz: { q: "選第一個 .btn？", opts: ["querySelector('.btn')", "querySelectorAll('.btn')", "get.btn"], ans: 0 }
  },
  js_objects: {
    track: "js",
    title: "🗃 物件 Object",
    desc: "鍵值對 { name: 'Bill', score: 100 }，描述一筆資料。",
    concept: "課程、使用者、相機設定都可建模成物件。",
    practice: "① 加 age 欄位 ② 用 template 字串顯示",
    code: `<p id="out"></p>\n<script>\n  const user = { name: "學員", level: "進階", xp: 120 };\n  document.getElementById("out").textContent =\n    user.name + " Lv." + user.level + " · XP " + user.xp;\n<\/script>`,
    tip: "陣列放很多物件 = 資料表。",
    quiz: { q: "物件存資料格式？", opts: ["{ key: value }", "[1,2,3]", "<obj>"], ans: 0 }
  },
  js_arrow: {
    track: "js",
    title: "➡️ 箭頭函式 =>",
    desc: "現代簡寫：(a, b) => a + b；forEach 常用。",
    concept: "箭頭函式沒有自己的 this（進階時再深究）。",
    practice: "① 把 function 改成箭頭 ② 用 map 把數字 x2",
    code: `<p id="sum"></p>\n<script>\n  const add = (a, b) => a + b;\n  const nums = [1, 2, 3];\n  const doubled = nums.map(n => n * 2);\n  document.getElementById("sum").textContent =\n    "3+5=" + add(3,5) + " · 加倍:" + doubled.join(",");\n<\/script>`,
    tip: "回傳物件要加括號：() => ({ id: 1 })",
    quiz: { q: "箭頭函式符號？", opts: ["=>", "->", "==>"], ans: 0 }
  },
  js_ecosystem: {
    track: "js",
    title: "🌍 JS 生態：jQuery、Vue 與業界慣例",
    desc: "原生 JS 是基礎；框架加速開發；了解「什麼時候用什麼」比背語法更重要。",
    concept: "<b>Vanilla JS</b>：無框架，適合小頁、學習、嵌入現有網站。<br><b>jQuery</b>（$）：2000 年代主流，簡化 DOM；<strong>舊專案維護仍會遇到</strong>，新專案較少從零選它。<br><b>Vue / React</b>：元件化、狀態管理、大型 SPA；Vue 在台灣教材與中小團隊常見，React 國際大廠與新創多。<br><b>業界常見組合</b>：React 或 Vue + TypeScript + Vite 建置 + Tailwind CSS；後端 API 用 fetch/axios。<br><b>常見工程習慣</b>：ES Modules（import/export）+ ESLint / Prettier + 單元測試（Vitest/Jest）。<br><b>建議路徑</b>：先把本手冊 HTML/CSS/JS 練熟 → 再選 Vue 或 React 官方教學 → 需要型別再加 TypeScript。",
    practice: "① 讀下方對照表 ② 思考你的作品集適合純 HTML 還是要上框架 ③ 用 AI 時仍要能讀懂它產生的 JS",
    code: `<style>\n  table { width:100%; border-collapse:collapse; font-size:13px; }\n  th, td { border:1px solid #e2e8f0; padding:8px; text-align:left; }\n  th { background:#f1f5f9; }\n  .tag { display:inline-block; background:#ede9fe; color:#4f46e5; padding:2px 8px; border-radius:6px; font-size:12px; font-weight:bold; margin:2px; }\n</style>\n<h3 style="margin:0 0 8px;font-size:16px">技術選型速查</h3>\n<table>\n  <tr><th>技術</th><th>適合</th><th>備註</th></tr>\n  <tr><td>Vanilla JS</td><td>學習、靜態頁、小互動</td><td>本手冊主軸</td></tr>\n  <tr><td>jQuery</td><td>舊站維護</td><td>新專案少用</td></tr>\n  <tr><td>Vue 3</td><td>中大型前台、漸進採用</td><td>單檔元件友善</td></tr>\n  <tr><td>React</td><td>大型 SPA、求職常見</td><td>生態最大</td></tr>\n</table>\n<p style="margin-top:12px"><span class="tag">TypeScript</span><span class="tag">Vite</span><span class="tag">Tailwind</span><span class="tag">Next.js</span> 為常見加值技能</p>`,
    tip: "面試常問：你會原生 DOM 嗎？框架只是工具，底層仍靠瀏覽器 API。",
    quiz: { q: "新專案學大型介面常選？", opts: ["Vue 或 React", "只有 jQuery", "只有 marquee"], ans: 0 }
  },
  adv_ui_patterns: {
    track: "advanced",
    title: "🧩 進階實戰：分頁、選單、模態框",
    desc: "業界天天做的三種 UI：Tab 切換、手機漢堡選單、Modal 彈窗。",
    concept: "共通模式：<strong>HTML 結構 + CSS 顯示/隱藏 + JS 切換 class</strong>。<br>Modal：預設 <code>display:none</code>，開啟時加 .open。<br>Tab：按鈕 data-tab 對應內容區 id。<br>選單：小螢幕用 class 控制 nav 展開。",
    practice: "① 點分頁按鈕 ② 點「開啟說明」看模態框 ③ 讀 script 裡 classList.toggle",
    code: `<style>\n  .tabs { display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap; }\n  .tabs button { padding:8px 14px; border:1px solid #cbd5e1; background:#fff; border-radius:8px; cursor:pointer; font-weight:bold; font-size:13px; }\n  .tabs button.active { background:#4f46e5; color:#fff; border-color:#4f46e5; }\n  .panel { display:none; padding:12px; background:#f8fafc; border-radius:10px; font-size:14px; }\n  .panel.show { display:block; }\n  .modal-backdrop { display:none; position:fixed; inset:0; background:rgba(15,23,42,.5); align-items:center; justify-content:center; z-index:10; }\n  .modal-backdrop.open { display:flex; }\n  .modal { background:#fff; padding:20px; border-radius:12px; max-width:90%; font-size:14px; }\n</style>\n<div class="tabs">\n  <button type="button" class="tab-btn active" data-tab="a">分頁 A</button>\n  <button type="button" class="tab-btn" data-tab="b">分頁 B</button>\n</div>\n<div id="panel-a" class="panel show">內容 A：這裡放課程介紹</div>\n<div id="panel-b" class="panel">內容 B：這裡放作品列表</div>\n<button type="button" id="open-modal" style="margin-top:12px;padding:8px 14px;border-radius:8px;border:none;background:#0f172a;color:#fff;font-weight:bold;cursor:pointer">開啟說明（Modal）</button>\n<div class="modal-backdrop" id="backdrop">\n  <div class="modal"><p>這是模態框，點背景或關閉可收起。</p><button type="button" id="close-modal">關閉</button></div>\n</div>\n<script>\n  document.querySelectorAll(".tab-btn").forEach(function(btn) {\n    btn.addEventListener("click", function() {\n      document.querySelectorAll(".tab-btn").forEach(function(b) { b.classList.remove("active"); });\n      document.querySelectorAll(".panel").forEach(function(p) { p.classList.remove("show"); });\n      btn.classList.add("active");\n      document.getElementById("panel-" + btn.dataset.tab).classList.add("show");\n    });\n  });\n  document.getElementById("open-modal").addEventListener("click", function() {\n    document.getElementById("backdrop").classList.add("open");\n  });\n  document.getElementById("close-modal").addEventListener("click", function() {\n    document.getElementById("backdrop").classList.remove("open");\n  });\n  document.getElementById("backdrop").addEventListener("click", function(e) {\n    if (e.target.id === "backdrop") e.target.classList.remove("open");\n  });\n<\/script>`,
    tip: "真專案可考慮 UI 函式庫，但面試仍愛考「不用框架怎麼做 Tab」。",
    quiz: { q: "顯示 Modal 常用？", opts: ["加 class 改 display", "刪除整個 HTML", "只用 CSS 無 JS"], ans: 0 }
  },
  js_fetch: {
    track: "advanced",
    title: "🌐 fetch 載入資料",
    desc: "示範：呼叫 API 取得 JSON，並處理 loading / 錯誤 / 空狀態。",
    concept: "前端常見完整流程：1) 顯示 loading 2) fetch（必要時帶 AbortController）3) 檢查 res.ok 4) await res.json() 5) 更新 DOM 6) catch 顯示錯誤訊息。",
    practice: "① 按「載入 API」看清單 ② 快速連點觀察：上一個請求會被取消（Abort）③ 故意改 URL 看錯誤處理。",
    code: `<p id="status" style="font-weight:800;color:#475569;margin:0 0 8px">按下按鈕載入 API（示範）</p>\n<button type="button" id="load-btn" style="padding:8px 14px;background:#0f172a;color:#fff;border:none;border-radius:10px;font-weight:900;cursor:pointer">載入 API</button>\n<ul id="list" style="margin:10px 0 0;padding-left:18px;color:#334155;font-weight:800"></ul>\n<script>\n  const btn = document.getElementById(\"load-btn\");\n  const status = document.getElementById(\"status\");\n  const ul = document.getElementById(\"list\");\n\n  let abort = null;\n\n  btn.addEventListener(\"click\", async function() {\n    ul.innerHTML = \"\";\n\n    if (abort) abort.abort();\n    abort = new AbortController();\n\n    status.textContent = \"載入中…\";\n    status.style.color = \"#475569\";\n\n    try {\n      const res = await fetch(\"https://jsonplaceholder.typicode.com/users?_limit=3\", { signal: abort.signal });\n      if (!res.ok) throw new Error(\"HTTP \" + res.status);\n      const data = await res.json();\n\n      if (!data || data.length === 0) {\n        status.textContent = \"查不到資料（empty state）\";\n        status.style.color = \"#b45309\";\n        return;\n      }\n\n      status.textContent = \"已載入 \" + data.length + \" 筆\";\n      status.style.color = \"#059669\";\n\n      data.forEach(function(u) {\n        const li = document.createElement(\"li\");\n        li.textContent = u.name + \" · \" + u.email;\n        ul.appendChild(li);\n      });\n    } catch (e) {\n      // 取消請求時常見 AbortError，這種狀況通常不需要顯示紅字。\n      if (e && e.name === \"AbortError\") return;\n      status.textContent = \"載入失敗：看 Network / Console\";\n      status.style.color = \"#dc2626\";\n    }\n  });\n<\/script>`,
    tip: "真專案一定要做：loading、錯誤訊息、空狀態；同時處理競態（AbortController / requestId）。",
    quiz: { q: "檢查 res.ok 是在做什麼？", opts: ["確認 HTTP 是否成功", "把 JSON 轉成物件", "改變畫面字體顏色"], ans: 0 }
  },
  work_overflow: {
    track: "advanced",
    title: "✂️ 文字溢出與省略號 …",
    desc: "後台列表、商品名、通知訊息太長時，用 ellipsis 避免撐破版面。",
    concept: "單行省略三件套：<code>overflow:hidden</code> + <code>text-overflow:ellipsis</code> + <code>white-space:nowrap</code><br>在 Flex 裡還要父/子加 <code>min-width:0</code>，否則不會截斷。<br>多行：<code>display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;</code>",
    practice: "① 把標題文字改超長 ② 刪除 .row 的 min-width:0 觀察差異 ③ 改 -webkit-line-clamp 為 3",
    code: `<style>\n  .row {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    max-width: 280px;\n    min-width: 0;\n    padding: 12px;\n    background: #f8fafc;\n    border-radius: 10px;\n    border: 1px solid #e2e8f0;\n  }\n  .avatar { width: 40px; height: 40px; border-radius: 8px; background: #c7d2fe; flex-shrink: 0; }\n  .title {\n    flex: 1;\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-weight: bold;\n    font-size: 14px;\n  }\n  .desc {\n    font-size: 13px;\n    color: #64748b;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n  }\n</style>\n<div class="row">\n  <div class="avatar"></div>\n  <div style="min-width:0;flex:1">\n    <div class="title">這是一段非常非常長的專案名稱會被截斷顯示省略號</div>\n    <div class="desc">第二行說明也支援最多兩行，超過會被裁切。適合卡片摘要、留言預覽。</div>\n  </div>\n</div>`,
    tip: "表格欄寬固定時，td 也要設 max-width + ellipsis。",
    quiz: { q: "單行省略必要屬性組合？", opts: ["overflow+ellipsis+nowrap", "only color:red", "font-size:0"], ans: 0 }
  },
  work_units_rem: {
    track: "css",
    title: "📏 rem / em / % 單位實務",
    desc: "px 絕對值；rem 相對根字級；em 相對父元素；% 相對父層寬高。",
    concept: "<b>rem</b>：改 <code>html { font-size: 16px }</code> 全站等比縮放，無障礙友善。<br><b>em</b>：按鈕 padding 常用 em，會跟著字級變。<br><b>%</b>：寬度的 % 相對父層；<code>height:100%</code> 父層要有高度。<br>工作上：版面間距用 rem，微調用 px 也可。",
    practice: "① 改 html font-size 為 18px 看 .box 變大 ② 把 .box padding 改成 1.5rem",
    code: `<style>\n  html { font-size: 16px; }\n  .box {\n    font-size: 1.125rem;\n    padding: 1rem 1.25rem;\n    background: #ede9fe;\n    color: #4f46e5;\n    border-radius: 12px;\n    font-weight: bold;\n    max-width: 320px;\n  }\n  .note { font-size: 0.875rem; color: #64748b; margin-top: 8px; }\n</style>\n<div class="box">字級 1.125rem ≈ 18px（根為 16px 時）</div>\n<p class="note">試著改 html { font-size: 18px; } 整塊會一起放大</p>`,
    tip: "Tailwind 的 text-lg、p-4 底層也是 rem 思維。",
    quiz: { q: "相對「根字級」的單位？", opts: ["rem", "em", "px"], ans: 0 }
  },
  work_flex_center: {
    track: "css",
    title: "🎯 置中排版實戰（工作天天用）",
    desc: "水平垂直置中、未知高度的彈性盒、絕對定位置中，三種情境各記一組。",
    concept: "<b>Flex 置中</b>：<code>display:flex; justify-content:center; align-items:center;</code><br><b>絕對置中</b>：<code>position:absolute; inset:0; margin:auto; width:…; height:…;</code><br><b>文字置中</b>：<code>text-align:center;</code> 只適用 inline 內容。",
    practice: "① 改 .card 高度為 120px ② 把 justify-content 改成 flex-end",
    code: `<style>\n  .card {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100px;\n    background: #f1f5f9;\n    border-radius: 12px;\n    border: 2px dashed #cbd5e1;\n  }\n  .pill {\n    background: #4f46e5;\n    color: #fff;\n    padding: 8px 16px;\n    border-radius: 999px;\n    font-weight: bold;\n    font-size: 14px;\n  }\n</style>\n<div class="card"><span class="pill">水平＋垂直置中</span></div>`,
    tip: "全頁置中常見：min-height:100vh 的 flex 容器包 hero。",
    quiz: { q: "Flex 子元素垂直置中用？", opts: ["align-items: center", "vertical-align: middle", "float:center"], ans: 0 }
  },
  js_form_submit: {
    track: "js",
    title: "📋 表單送出、驗證與 preventDefault",
    desc: "表單預設會重整頁面；用 JS 攔截後可做驗證、顯示錯誤、再 fetch 送出。",
    concept: "<code>form.addEventListener('submit', fn)</code><br><code>event.preventDefault()</code> 阻止重整。<br><code>input.checkValidity()</code> 或手動 if 檢查。<br>流程：攔截 → 驗證 → 顯示錯誤 / 成功 → （選）fetch API。",
    practice: "① 空白送出看錯誤 ② 填 email 再送 ③ 讀 script 的 preventDefault",
    code: `<form id="contact" style="max-width:280px">\n  <label style="display:block;font-size:13px;font-weight:bold;margin-bottom:4px">Email</label>\n  <input id="email" type="email" required placeholder="you@mail.com" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:8px;margin-bottom:8px">\n  <button type="submit" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer">送出</button>\n  <p id="msg" style="font-size:13px;margin-top:8px;color:#64748b"></p>\n</form>\n<script>\n  document.getElementById("contact").addEventListener("submit", function(e) {\n    e.preventDefault();\n    const input = document.getElementById("email");\n    const msg = document.getElementById("msg");\n    if (!input.value.trim()) {\n      msg.textContent = "請填寫 Email";\n      msg.style.color = "#dc2626";\n      return;\n    }\n    msg.textContent = "已驗證（示範），實務接著 fetch 送 API";\n    msg.style.color = "#059669";\n  });\n<\/script>`,
    tip: "後端仍要再驗證一次，前端驗證不能當唯一防線。",
    quiz: { q: "阻止表單重整頁面？", opts: ["e.preventDefault()", "e.stopPage()", "return html"], ans: 0 }
  },
  work_responsive_img: {
    track: "advanced",
    title: "🖼 響應式圖片 srcset / sizes",
    desc: "同一張圖提供多種寬度，手機載小檔、桌面載大檔，省流量又清晰。",
    concept: "<code>srcset=\"url 400w, url2 800w\"</code> 列出候選<br><code>sizes=\"(max-width:600px) 100vw, 400px\"</code> 告訴瀏覽器顯示多寬<br>最簡單版：Unsplash <code>?w=400</code> / <code>?w=800</code> 手動切換。<br>進階：<code>&lt;picture&gt;</code> 依媒體換不同裁切圖。",
    practice: "① 縮窄預覽看 img 仍 max-width:100% ② 改 w= 參數比較檔案大小（Network）",
    code: `<style>img{display:block;max-width:100%;height:auto;border-radius:12px}</style>\n<img\n  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"\n  srcset="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80 400w,\n          https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80 800w"\n  sizes="(max-width: 600px) 100vw, 400px"\n  alt="相機">\n<p style="font-size:13px;color:#64748b">瀏覽器依螢幕寬度自動挑合適解析度</p>`,
    tip: "攝影作品集必學；搭配 loading=\"lazy\"。",
    quiz: { q: "列出多種寬度候選用？", opts: ["srcset", "hrefset", "imglist"], ans: 0 }
  },
  work_git: {
    track: "master",
    title: "🔀 Git 工作流程（團隊必備）",
    desc: "版本控制：記錄每次修改、可回溯、多人協作、與 GitHub 搭配 PR。",
    concept: "<b>日常循環</b>：改檔 → <code>git status</code> → <code>git add .</code> → <code>git commit -m \"說明\"</code> → <code>git push</code><br><b>分支</b>：新功能開 branch，完成後 Pull Request 請同事 review。<br><b>.gitignore</b>：排除 node_modules、.env 密碼檔。<br>衝突：同一行被兩人改，手動合併後再 commit。",
    practice: "① 背熟 status → add → commit → push ② 在 GitHub 開一個 repo 上傳本作品集 ③ 永遠不要 commit .env",
    code: `<style>\n  pre{background:#0f172a;color:#a5f3fc;padding:16px;border-radius:12px;font-size:13px;line-height:1.7;overflow:auto}\n  .cmd{color:#86efac}.cm{color:#94a3b8}\n</style>\n<pre><span class="cm"># 第一次</span>\n<span class="cmd">git init</span>\n<span class="cmd">git add .</span>\n<span class="cmd">git commit -m "作品集初版"</span>\n<span class="cmd">git remote add origin https://github.com/你/專案.git</span>\n<span class="cmd">git push -u origin main</span>\n\n<span class="cm"># 之後每次改完</span>\n<span class="cmd">git add .</span>\n<span class="cmd">git commit -m "修正 RWD"</span>\n<span class="cmd">git push</span></pre>`,
    tip: "commit 訊息寫「為什麼改」比「改了什麼檔」更有用。",
    quiz: { q: "把修改存成一個版本？", opts: ["git commit", "git save", "git upload"], ans: 0 }
  },
  work_devtools_network: {
    track: "advanced",
    title: "🌐 DevTools：Network 除錯",
    desc: "頁面慢、圖片破圖、API 失敗時，Network 分頁是第一站。",
    concept: "F12 → Network → 重新整理 → 看 Status（200 成功、404 找不到、500 伺服器錯）<br>看 Size / Time 找最大、最慢的檔。<br>fetch 失敗：檢查 URL、CORS、是否 HTTPS。<br>Preserve log 可保留跳轉前的請求記錄。",
    practice: "① 開本頁 Network 重新整理 ② 找最大的圖片或 js ③ 故意改壞 fetch URL 看紅字失敗",
    code: `<p id="net-status" style="font-size:14px">按按鈕測試 fetch（請開 F12 → Network）</p>\n<button type="button" id="net-btn" style="padding:8px 14px;background:#0f172a;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer">載入測試 API</button>\n<script>\n  document.getElementById("net-btn").addEventListener("click", function() {\n    const el = document.getElementById("net-status");\n    el.textContent = "請求中…";\n    fetch("https://jsonplaceholder.typicode.com/posts/1")\n      .then(function(r) { return r.json(); })\n      .then(function(d) { el.textContent = "成功：「" + d.title + "」"; })\n      .catch(function() { el.textContent = "失敗：看 Network 紅字與 Console"; });\n  });\n<\/script>`,
    tip: "Disable cache 勾選後，可確認使用者是否載到最新 CSS。",
    quiz: { q: "API 404 表示？", opts: ["找不到資源", "一定中毒", "瀏覽器壞了"], ans: 0 }
  },
  master_semantic: {
    track: "master",
    title: "🏆 語意化 HTML 大師檢核",
    desc: "一篇好文章：article、header、footer、aside、figure、figcaption。",
    concept: "語意正確 = SEO + 無障礙 + 團隊讀得懂程式。",
    practice: "① 把部落格文章用 article 包 ② figure 放圖+說明",
    code: `<article style="max-width:480px;font-family:sans-serif">\n  <header><h1>攝影筆記</h1><p><time>2026-05-27</time></p></header>\n  <p>今日練習曝光三角。</p>\n  <figure>\n    <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" alt="相機" style="max-width:100%;border-radius:12px">\n    <figcaption>圖：單眼相機</figcaption>\n  </figure>\n  <footer><small>© MrBill 學堂</small></footer>\n</article>`,
    tip: "一頁一個 h1；圖片必有 alt。",
    quiz: { q: "圖片說明用？", opts: ["<figcaption>", "<caption>", "<alt>"], ans: 0 }
  },
  master_a11y: {
    track: "master",
    title: "♿ 無障礙 a11y 基礎",
    desc: "對比度、鍵盤可操作、aria-label、focus 樣式。",
    concept: "無障礙讓所有人能用你的網站，也是專業門檻。",
    practice: "① Tab 鍵走一遍頁面 ② 確認按鈕有 :focus-visible",
    code: `<style>\n  .btn { padding:12px 20px; background:#4f46e5; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer; }\n  .btn:focus-visible { outline:3px solid #fbbf24; outline-offset:2px; }\n</style>\n<button type="button" class="btn" aria-label="開始學習">開始</button>\n<p>用 Tab 鍵聚焦按鈕，應看見黃色外框。</p>`,
    tip: "文字與背景對比至少 4.5:1（WCAG AA）。",
    quiz: { q: "螢幕閱讀器讀按鈕說明？", opts: ["aria-label", "color:red", "font:bold"], ans: 0 }
  },
  master_performance: {
    track: "master",
    title: "⚡ 效能與圖片優化",
    desc: "壓縮圖片、lazy loading、少載入巨大 JS。",
    concept: "首屏快 = 體驗好；攝影站圖多更要優化。",
    practice: "① 給 img 加 loading=\"lazy\" ② 用適當寬度 w= 參數",
    code: `<img\n  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80"\n  alt="相機"\n  loading="lazy"\n  style="max-width:100%;border-radius:12px">\n<p>loading="lazy" 延遲載入視窗外圖片。</p>`,
    tip: "DevTools Network 看哪個檔最慢。",
    quiz: { q: "延遲載入圖片屬性？", opts: ["loading=\"lazy\"", "slow=\"true\"", "defer"], ans: 0 }
  },
  master_deploy: {
    track: "master",
    title: "🚀 上線：讓全世界看到",
    desc: "靜態網站可放 GitHub Pages、Netlify、Vercel 或自家主機。",
    concept: "index.html 為入口；路徑大小寫要一致；HTTPS 建議開啟。",
    practice: "① 整理資料夾 ② 上傳後用手機開網址測試 ③ 檢查圖片路徑",
    code: `<!DOCTYPE html>\n<html lang="zh-Hant">\n<head><meta charset="UTF-8"><title>我的作品集</title></head>\n<body>\n  <h1>上線成功！</h1>\n  <p>HTML + CSS + JS 可直接放靜態主機。</p>\n  <p>記得：photography.html、tutorial.html 一起上傳。</p>\n</body>\n</html>`,
    tip: "先在本機雙擊 html 測試，再上傳。",
    quiz: { q: "靜態網站入口檔？", opts: ["index.html", "main.exe", "style.css"], ans: 0 }
  },
  master_capstone: {
    track: "master",
    title: "🎓 畢業專題：個人品牌頁",
    desc: "整合語意 HTML、Flex 導覽、Grid 技能區、CSS 變數、@media RWD。",
    concept: "檢查清單：header+nav、hero、技能 grid、按鈕可聚焦、圖片 max-width:100%、手機 1 欄 / 桌面 3 欄。<br><strong>實務提醒</strong>：在共用網站（如本手冊）預覽時，樣式請寫在 <code>.page</code> 底下，別直接寫 <code>body</code> / <code>:root</code>，才不會改到整站字體。",
    practice: "① 改名字與連結 ② 縮窄預覽看技能區變 1 欄 ③ 加第四張技能卡",
    code: `<style>\n  /* 變數與排版都限定在 .page 內，不影響外層網站 */\n  .page {\n    --brand: #4f46e5;\n    --text: #334155;\n    font-family: system-ui, sans-serif;\n    line-height: 1.6;\n    color: var(--text);\n    max-width: 100%;\n    overflow-x: hidden;\n    border: 1px solid #e2e8f0;\n    border-radius: 12px;\n    background: #fff;\n  }\n  .page * { box-sizing: border-box; }\n  .page-header {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 12px;\n    justify-content: space-between;\n    align-items: center;\n    padding: 12px 16px;\n    border-bottom: 1px solid #e2e8f0;\n  }\n  .page-nav { display: flex; flex-wrap: wrap; gap: 10px; }\n  .page-nav a { color: #475569; text-decoration: none; font-weight: 600; font-size: 14px; }\n  .hero {\n    text-align: center;\n    padding: 36px 16px;\n    background: linear-gradient(135deg, #eef2ff, #ecfeff);\n  }\n  .hero h1 { font-size: 1.5rem; color: #0f172a; margin: 0 0 8px; }\n  .btn {\n    background: var(--brand);\n    color: #fff;\n    border: none;\n    padding: 10px 20px;\n    border-radius: 10px;\n    font-weight: bold;\n    cursor: pointer;\n    font-size: 14px;\n  }\n  .skills-title { margin: 0; padding: 16px 16px 0; font-size: 1rem; color: #0f172a; }\n  .skills {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 12px;\n    padding: 16px;\n    width: 100%;\n    max-width: 100%;\n  }\n  .skill-card {\n    background: #fff;\n    border: 1px solid #e2e8f0;\n    border-radius: 12px;\n    padding: 14px;\n    font-size: 14px;\n    min-width: 0;\n  }\n  .skill-card h3 { margin: 0 0 6px; font-size: 15px; color: var(--brand); }\n  @media (min-width: 560px) {\n    .skills { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n  }\n</style>\n<div class="page">\n  <header class="page-header">\n    <strong>我的名字</strong>\n    <nav class="page-nav">\n      <a href="#">手冊</a>\n      <a href="#">攝影</a>\n    </nav>\n  </header>\n  <section class="hero">\n    <h1>前端 × 攝影 × AI</h1>\n    <p>MrBill 學堂畢業作品</p>\n    <button class="btn" type="button">聯絡我</button>\n  </section>\n  <h2 class="skills-title">技能專長</h2>\n  <div class="skills">\n    <div class="skill-card"><h3>HTML</h3><p>語意結構</p></div>\n    <div class="skill-card"><h3>CSS</h3><p>Flex / Grid / RWD</p></div>\n    <div class="skill-card"><h3>JS</h3><p>DOM 與事件</p></div>\n  </div>\n</div>`,
    tip: "恭喜走完主線！接下來用 AI 當協作加速器，但審稿仍靠你。",
    quiz: { q: "個人品牌頁至少要有？", opts: ["清楚導覽與代表作", "只有背景色", "100 個動畫"], ans: 0 }
  }
});

const TUTORIAL_ORDER = [
  "intro_welcome", "html_vs_css", "intro_devtools", "intro_files",
  "html_skeleton", "html_headings", "html_inline", "html_media", "html_lists", "html_tables",
  "html_containers", "html_inputs", "html_button", "html_form", "html_nav",
  "css_selectors", "css_colors", "css_typography", "css_spacing", "css_box_model", "css_display",
  "css_flexbox", "css_grid", "css_position", "css_shadows", "css_transitions",
  "css_variables", "css_pseudo", "css_flex_advanced", "css_media_rwd", "css_animation", "css_zindex",
  "intro_js_whatis", "js_variables", "js_conditionals", "js_arrays", "js_objects", "js_functions", "js_events",
  "js_dom", "js_queryselector", "js_arrow", "js_ecosystem", "js_fetch",
  "adv_ui_patterns",
  "work_overflow", "work_units_rem", "work_flex_center", "work_responsive_img",
  "js_form_submit", "work_devtools_network", "work_git",
  "master_semantic", "master_a11y", "master_performance", "master_deploy", "master_capstone"
];

