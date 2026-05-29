const tutorialPreface = {
  title: "學習冒險地圖",
  titleIcon: "🎮",
  contentHtml: `<ul class="tuto-preface-flow-row" aria-label="每課闖關流程">
      <li class="tuto-preface-flow-item"><span class="tuto-preface-flow-ico">💡</span>懂概念</li>
      <li class="tuto-preface-flow-item"><span class="tuto-preface-flow-ico">👀</span>看範例</li>
      <li class="tuto-preface-flow-item"><span class="tuto-preface-flow-ico">⌨️</span>改程式</li>
      <li class="tuto-preface-flow-item"><span class="tuto-preface-flow-ico">⭐</span>拿 XP</li>
    </ul>
    <section class="tuto-preface-route" aria-label="建議學習路線">
      <div class="tuto-preface-route-head">
        <h4 class="tuto-preface-route-title">建議學習路線</h4>
        <p class="tuto-preface-route-hint">由左至右依序 · 不可跳過基礎</p>
      </div>
      <ol class="tuto-preface-timeline">
        <li class="tuto-preface-track-html"><span class="tuto-preface-node-dot">1</span><span class="tuto-preface-node-label">HTML</span></li>
        <li class="tuto-preface-track-css"><span class="tuto-preface-node-dot">2</span><span class="tuto-preface-node-label">CSS</span></li>
        <li class="tuto-preface-track-tailwind"><span class="tuto-preface-node-dot">3</span><span class="tuto-preface-node-label">Tailwind</span></li>
        <li class="tuto-preface-track-js"><span class="tuto-preface-node-dot">4</span><span class="tuto-preface-node-label">JS 根基</span></li>
        <li class="tuto-preface-track-jquery"><span class="tuto-preface-node-dot">5</span><span class="tuto-preface-node-label">jQuery</span></li>
        <li class="tuto-preface-track-vue"><span class="tuto-preface-node-dot">6</span><span class="tuto-preface-node-label">Vue</span></li>
        <li class="tuto-preface-track-git"><span class="tuto-preface-node-dot">7</span><span class="tuto-preface-node-label">Git</span></li>
        <li class="tuto-preface-track-deploy"><span class="tuto-preface-node-dot">8</span><span class="tuto-preface-node-label">上線</span></li>
      </ol>
      <div class="tuto-preface-phase-bar">
        <span class="tuto-preface-phase tuto-preface-phase-1">①～③ 基礎版面</span>
        <span class="tuto-preface-phase tuto-preface-phase-2">④ JS 根基 → ⑤⑥ 框架</span>
        <span class="tuto-preface-phase tuto-preface-phase-3">⑦～⑧ 版本與部署</span>
      </div>
    </section>`
};

const tutorialRepository = {
  intro_welcome: {
    track: "intro",
    title: "🚀 開始冒險：網頁三劍客",
    desc: "網頁由 HTML（骨架）、CSS（衣服）、JavaScript（動作）組成。你現在看到的每個網站都是這三者合作的結果。",
    concept: "把網頁想成「紙娃娃」：HTML 畫出身體輪廓，CSS 幫它穿衣服上色，JS 讓它會動、會按按鈕。",
    practice: "① 讀完概念 ② 按下方「運行」看範例 ③ 把標題改成你的名字 ④ 通過小測驗 ⑤ 下一課看「初學者到大師路線」",
    code: `<h1>你好，我是學員！</h1>\n<p>我正在 MrBill 前端學堂冒險。</p>\n<p><strong>下一步：</strong>左側選「初學者到大師路線」。</p>`,
    tip: "別急著一次學完！每天 1～2 課，改一點程式碼比看十遍更有用。",
    quiz: { q: "網頁的「骨架」主要靠哪種語言？", opts: ["HTML", "CSS", "Excel"], ans: 0 }
  },
  html_learning_path: {
    track: "intro",
    title: "🗺 初學者到大師：推薦撰寫路線",
    desc: "先知道「正確順序」再動手，能少走很多彎路。本手冊主線已幫你排好，這課說明每一階段要練到什麼程度。",
    concept: "<b>階段 1｜入門（能做出靜態頁）</b><br>HTML 語意標籤、表單、清單 → CSS 選擇器、盒模型、Flex/Grid、RWD → JS 變數、DOM、事件。<br><b>交付標準：</b>能獨立完成一頁作品集（無框架）。<br><br><b>階段 2｜實戰（能維護與除錯）</b><br>DevTools、fetch API、表單驗證、圖片優化 → 舊站 jQuery 維護或 Vue 元件化擇一深入。<br><b>交付標準：</b>能讀懂他人程式、改 bug、加小功能。<br><br><b>階段 3｜工程化（能協作與上線）</b><br>Git 分支與 PR → 靜態站部署 → 上線前檢查清單（路徑、RWD、效能、a11y）。<br><b>交付標準：</b>作品有公開網址、版本可回溯、手機可正常瀏覽。<br><br><b>撰寫習慣（全階段通用）</b><br>① 結構與樣式分離（HTML 不塞滿 style）② 檔名小寫英文 ③ 每次只改一點並按運行驗證 ④ 能用自己的話解釋「為什麼這樣寫」。",
    practice: "① 對照你目前程度，標記自己在哪一階段 ② 寫下本週目標：例如「完成 HTML 檔案路徑課 + 一個含 nav 的頁面」③ 不要跳過 Git／上線專題，那是作品集能否被看見的關鍵",
    code: `<style>\n  .path { font-family: system-ui, sans-serif; line-height: 1.75; max-width: 36em; }\n  .stage { border-left: 4px solid #6366f1; padding-left: 12px; margin: 16px 0; }\n  .stage h3 { margin: 0 0 6px; color: #4338ca; font-size: 1rem; }\n  .stage p { margin: 0; color: #475569; font-size: 14px; }\n</style>\n<div class="path">\n  <div class="stage"><h3>入門</h3><p>HTML 結構 → CSS 排版 → JS 互動</p></div>\n  <div class="stage"><h3>實戰</h3><p>除錯、API、框架補強（jQuery 或 Vue）</p></div>\n  <div class="stage"><h3>工程化</h3><p>Git → 部署 → 畢業專題驗收</p></div>\n</div>`,
    tip: "大師不是一次學完所有語法，而是每個階段都有「可交付成果」。",
    newbieTip: "若完全零基礎：先跟完 HTML 分頁前 5 課，再開 CSS 分頁，不要同時開三個分頁亂跳。",
    commonMistakes: "常見錯誤：跳過 HTML 直接學 Vue；或只抄範例不練檔案路徑，上線後圖片/CSS 全破圖。",
    submissionStandard: "1) 能說出三階段各一個交付標準\n2) 已選定本週要完成的 2 課\n3) 知道下一課是「檔案與路徑」",
    quiz: { q: "正規學習順序應先穩固哪一項？", opts: ["HTML 結構", "框架進階語法", "部署設定"], ans: 0 }
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
    desc: "真實網頁需要 DOCTYPE、html、head、body。head 放設定（含 SEO meta），body 放看得見的內容。",
    concept: "<p><code>&lt;head&gt;</code> 像信封上的資訊（給瀏覽器、搜尋引擎看）；<code>&lt;body&gt;</code> 是使用者真正看到的正文。</p><h3 class=\"tuto-h3\">最小可用骨架（必備）</h3><ul class=\"tuto-list\"><li><code>&lt;!DOCTYPE html&gt;</code>：告訴瀏覽器這是 HTML5</li><li><code>&lt;html lang=\"zh-Hant\"&gt;</code>：語言（SEO／無障礙／螢幕閱讀器發音）</li><li><code>&lt;meta charset=\"UTF-8\"&gt;</code>：中文不亂碼</li><li><code>&lt;meta name=\"viewport\" …&gt;</code>：手機 RWD 必備</li><li><code>&lt;title&gt;</code>：分頁標題 + 搜尋結果標題</li></ul><p>更完整的 description、Open Graph 等 SEO meta，見本路線「<strong>head 與 SEO meta</strong>」課。</p>",
    practice: "① 運行範例 ② 在 body 加 footer ③ 把 title 改成你的作品名 ④ 確認 head 裡有 charset 與 viewport",
    code: `<!DOCTYPE html>\n<html lang="zh-Hant">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>我的第一個網頁｜MrBill 學堂</title>\n</head>\n<body>\n  <h1>Body 裡的內容會顯示在畫面上</h1>\n  <p>head 裡的 title 會顯示在瀏覽器分頁；charset 避免中文亂碼。</p>\n  <footer><small>© 2026 練習作品</small></footer>\n</body>\n</html>`,
    tip: "漏 charset 中文會亂碼；漏 viewport 手機常需手動縮放。",
    newbieTip: "每支 .html 都建議從這份骨架複製再改內容。",
    commonMistakes: "把可見內容寫進 head；或忘記 lang=\"zh-Hant\"。",
    submissionStandard: "1) 有 DOCTYPE + charset + viewport + title\n2) 能說明 head 與 body 各放什麼",
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
  html_list_details: {
    track: "html",
    title: "🧾 ul / ol 進階細節（巢狀、start、reversed）",
    desc: "清單不只三行文字：你可以做巢狀清單、指定起始編號，或反向編號。",
    concept: "常見場景：教學步驟（ol）、功能條列（ul）、章節子項（巢狀 ol/ul）。<br>進階屬性：<code>start</code> 可從指定數字開始，<code>reversed</code> 可倒數編號。",
    practice: "① 將 ol 改成 start=\"3\" 看編號從 3 開始 ② 在第二步加一個巢狀 ul ③ 將 reversed 打開觀察倒序",
    code: `<h3>上架教學流程</h3>\n<ol start="1">\n  <li>整理商品照片</li>\n  <li>撰寫商品文案\n    <ul>\n      <li>主標題 18 字內</li>\n      <li>第一段先寫痛點</li>\n      <li>文末加 CTA</li>\n    </ul>\n  </li>\n  <li>上傳並測試 CTA</li>\n</ol>\n\n<h3>倒數清單（reversed）</h3>\n<ol reversed>\n  <li>發布文章</li>\n  <li>校對文案</li>\n  <li>整理資料</li>\n</ol>`,
    tip: "巢狀清單是常見的課程/文件結構，別全部寫成同一層。",
    quiz: { q: "讓 ol 從 5 開始編號用哪個？", opts: ["start=\"5\"", "begin=\"5\"", "index=\"5\""], ans: 0 }
  },
  html_description_list: {
    track: "html",
    title: "📚 dl / dt / dd 名詞解釋清單",
    desc: "當你在寫術語、FAQ 定義、參數說明時，dl 比 ul 更有語意。",
    concept: "<code>dl</code> 是描述清單，<code>dt</code> 是名詞，<code>dd</code> 是定義。<br>適合用在：課程術語、產品規格、專有名詞字典。",
    practice: "① 新增一組術語（例如 CTA）② 幫 dt 加粗、dd 加左邊框 ③ 比較和 ul 呈現差異",
    code: `<style>\n  dl {\n    border: 1px solid #e2e8f0;\n    border-radius: 12px;\n    padding: 12px;\n    background: #f8fafc;\n  }\n  dt {\n    font-weight: 800;\n    color: #0f172a;\n    margin-top: 8px;\n  }\n  dd {\n    margin-left: 0;\n    padding-left: 10px;\n    border-left: 3px solid #cbd5e1;\n    color: #475569;\n    margin-top: 4px;\n  }\n</style>\n<dl>\n  <dt>SEO</dt>\n  <dd>讓搜尋引擎更容易找到你的內容。</dd>\n  <dt>GEO</dt>\n  <dd>讓生成式搜尋更容易引用你的內容段落。</dd>\n</dl>`,
    tip: "術語頁、課程詞彙表優先用 dl，語意比 ul 更清楚。",
    quiz: { q: "描述名詞與定義最適合用？", opts: ["dl / dt / dd", "ul / li", "table 一定最好"], ans: 0 }
  },
  html_div_span: {
    track: "html",
    title: "🧩 div 與 span：萬用容器怎麼用",
    desc: "div 是區塊容器，span 是行內容器。它們沒有語意，但很常用來配合 class 做排版。",
    concept: "口訣：<strong>大區塊用 div、行內小片段用 span</strong>。<br>若有明確語意，優先用 <code>header/main/section/article/nav</code>；語意不明再用 div。",
    practice: "① 把標題中的一個詞包成 span 上色 ② 再用 div 包住整張卡片 ③ 想想能否改成語意標籤",
    code: `<style>\n  .card {\n    border: 1px solid #e2e8f0;\n    border-radius: 12px;\n    padding: 16px;\n    background: #fff;\n  }\n  .accent { color: #4f46e5; font-weight: 800; }\n</style>\n<div class="card">\n  <h2>這是一張 <span class="accent">重點卡片</span></h2>\n  <p>div 負責包區塊，span 負責行內局部強調。</p>\n</div>`,
    tip: "新手常把所有東西都寫成 div；記得先想有沒有語意標籤可用。",
    quiz: { q: "行內強調一小段文字通常用？", opts: ["span", "div", "section"], ans: 0 }
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
    sandbox: false,
    title: "📂 語意化布局：main / section / article",
    desc: "別整頁 div。用有語意的標籤分區，Google 與團隊都讀得懂頁面結構。",
    concept: "<p><strong>語意化</strong> = 標籤名字就說明「這塊是什麼」。利於 SEO、無障礙、CSS 分工與維護。</p><h3 class=\"tuto-h3\">常用標籤對照</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>標籤</th><th>用途</th><th>記憶</th></tr></thead><tbody><tr><td><code>header</code></td><td>頁首或文章開頭（logo、nav、標題區）</td><td>一頁可有多個（如每篇 article 內）</td></tr><tr><td><code>nav</code></td><td>主要導航連結群</td><td>通常放在 header 內</td></tr><tr><td><code>main</code></td><td>此頁<strong>唯一</strong>主要內容</td><td>全頁只應有一個</td></tr><tr><td><code>section</code></td><td>同一主題的一區塊（需有標題 h2～h6）</td><td>像章節</td></tr><tr><td><code>article</code></td><td>可獨立分享的一篇（文章、卡片、貼文）</td><td>RSS 可單獨抽出的單元</td></tr><tr><td><code>aside</code></td><td>側欄、補充說明、相關連結</td><td>非主文但相關</td></tr><tr><td><code>footer</code></td><td>頁尾或文章結尾（版權、聯絡）</td><td></td></tr><tr><td><code>figure</code> + <code>figcaption</code></td><td>圖+說明綁在一起</td><td>比單獨 img 更有語意</td></tr></tbody></table></div><h3 class=\"tuto-h3\">section 還是 article？</h3><ul class=\"tuto-list\"><li><strong>section</strong>：「關於攝影課程」整塊區域，裡面可能有多篇文章</li><li><strong>article</strong>：其中一篇「曝光三角入門」，可以單獨分享 URL</li><li>若只是排版、沒有明確語意 → 才用 <code>div</code></li></ul><h3 class=\"tuto-h3\">標準頁面結構（推薦）</h3><pre class=\"tuto-code-block tuto-code-plain\">body\n├─ header（logo + nav）\n├─ main（全頁唯一）\n│   ├─ section（例如：Hero 主視覺）\n│   │   └─ h1\n│   ├─ section（例如：課程列表）\n│   │   ├─ h2\n│   │   ├─ article（課程卡 1）\n│   │   └─ article（課程卡 2）\n│   └─ aside（可選：側欄、廣告）\n└─ footer（版權、社群連結）</pre><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">✅ 結構檢查清單</p><ul class=\"tuto-list\"><li>全頁只有一個 <code>h1</code>（通常在 main 裡）</li><li>每個 <code>section</code> 內有 <code>h2</code>（或 h3）當小標題</li><li>標題層級不跳級（h1→h2→h3）</li><li><code>main</code> 不要包在 <code>article</code> 裡反過來</li></ul></div>",
    practice: "① 對照下方完整範例 ② 在 main 裡再加一個 section + article ③ 想想你的作品集能否改成這套結構",
    code: `<style>\n  body { font-family: system-ui, sans-serif; line-height: 1.65; color: #334155; max-width: 40em; margin: 0 auto; padding: 12px; }\n  header, footer { padding: 12px 0; border-bottom: 1px solid #e2e8f0; }\n  footer { border-bottom: none; border-top: 1px solid #e2e8f0; margin-top: 16px; font-size: 13px; color: #64748b; }\n  nav ul { list-style: none; margin: 0; padding: 0; display: flex; gap: 10px; flex-wrap: wrap; }\n  nav a { color: #4f46e5; font-weight: 700; text-decoration: none; }\n  section { margin: 20px 0; }\n  article { border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; margin: 10px 0; background: #f8fafc; }\n  aside { background: #eef2ff; padding: 10px; border-radius: 8px; font-size: 14px; margin-top: 12px; }\n  h1 { font-size: 1.35rem; margin: 0 0 8px; color: #0f172a; }\n  h2 { font-size: 1.1rem; margin: 0 0 8px; color: #4338ca; }\n</style>\n<header>\n  <p><strong>MrBill 學程</strong></p>\n  <nav aria-label="主要導航">\n    <ul>\n      <li><a href="#">首頁</a></li>\n      <li><a href="#">手冊</a></li>\n      <li><a href="#">攝影</a></li>\n    </ul>\n  </nav>\n</header>\n<main>\n  <section aria-labelledby="hero-h">\n    <h1 id="hero-h">前端學習入口</h1>\n    <p>HTML 結構 → CSS 排版 → JS 互動。</p>\n  </section>\n  <section aria-labelledby="courses-h">\n    <h2 id="courses-h">推薦課程</h2>\n    <article>\n      <h3>HTML 語意化</h3>\n      <p>main、section、article 標準寫法。</p>\n    </article>\n    <article>\n      <h3>CSS RWD</h3>\n      <p>手機、平板、桌機三斷點。</p>\n    </article>\n  </section>\n  <aside>\n    <strong>補充</strong>：側欄放相關連結或廣告，勿與 main 主文混淆。\n  </aside>\n</main>\n<footer>\n  <p>© 2026 練習作品 · 聯絡：hello@example.com</p>\n</footer>`,
    tip: "header／footer 可出現在 page 層，也可出現在 article 內（文章頭尾）。",
    newbieTip: "先畫樹狀結構再寫 HTML，比一路 div 到底快很多。",
    commonMistakes: "全頁多個 main；section 沒有標題；用 section 當純 CSS 盒子。",
    submissionStandard: "1) 能畫出 header/main/footer 結構\n2) 說清 section 與 article 差別\n3) 範例含 nav + 至少 1 個 article",
    quiz: { q: "可獨立分享的一篇貼文最適合用？", opts: ["<article>", "<div>", "<span>"], ans: 0 }
  },
  html_head_seo: {
    track: "html",
    sandbox: false,
    title: "🔍 head 與 SEO meta（完整度）",
    desc: "title、description、Open Graph… 以及 keywords 現在還有沒有用？一次講清。",
    concept: "<p><code>&lt;head&gt;</code> 裡的 meta 不影響版面，但影響<strong>搜尋結果怎麼顯示</strong>、社群分享預覽、手機縮放。</p><h3 class=\"tuto-h3\">建議必備（每頁都要有）</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>標籤</th><th>作用</th></tr></thead><tbody><tr><td><code>charset=UTF-8</code></td><td>中文編碼</td></tr><tr><td><code>viewport</code></td><td>手機 RWD 視口</td></tr><tr><td><code>&lt;title&gt;</code></td><td>分頁標題；Google 搜尋結果<strong>藍色標題</strong>（重要排名因素之一）</td></tr><tr><td><code>meta name=\"description\"</code></td><td>搜尋結果<strong>摘要文字</strong>（約 150～160 字內，要人話、含關鍵詞但別堆砌）</td></tr><tr><td><code>html lang</code></td><td>頁面語言</td></tr></tbody></table></div><h3 class=\"tuto-h3\">keywords 還要寫嗎？</h3><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">Google 自 2009 年起已<strong>不使用</strong> <code>meta keywords</code> 排名</p><p>填了通常<strong>不會加分</strong>；競爭對手還可能看到你的關鍵詞策略。可當作內部備忘寫，但<strong>別指望 SEO 效果</strong>。Bing 權重也極低。</p><p>真正有效的是：好 title、好 description、清楚的 h1～h3、語意 HTML、有價值內文、alt、速度、手機可讀。</p></div><h3 class=\"tuto-h3\">進階／分享常用</h3><ul class=\"tuto-list\"><li><code>link rel=\"icon\"</code>：分頁小圖示 favicon</li><li><code>link rel=\"canonical\"</code>：指定正式網址（避免重複內容）</li><li><code>meta name=\"robots\" content=\"noindex\"</code>：不讓搜尋引擎索引（草稿頁）</li><li><strong>Open Graph</strong>（<code>og:title</code>、<code>og:description</code>、<code>og:image</code>）：LINE／Facebook 分享時的預覽卡</li></ul><h3 class=\"tuto-h3\">與 body 語意配合</h3><p>meta 寫「這頁講什麼」，body 用 <code>main</code> + <code>h1</code> + <code>section</code> 真的做出結構——<strong>兩者要一致</strong>，不要 title 寫 A、內文卻是 B。</p>",
    practice: "① 複製下方 head 範本改 title/description ② 寫一段 120 字內的 description ③ 說明為何 keywords 不能取代好內文",
    code: `<!DOCTYPE html>\n<html lang="zh-Hant">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n  <!-- 核心 SEO -->\n  <title>攝影視覺學堂｜曝光構圖入門｜MrBill Studio</title>\n  <meta name="description" content="從零學習光圈、快門、構圖與 RWD 網頁。含互動沙盒與實作作業，適合設計系與自學者。">\n\n  <!-- 歷史標籤：Google 不用，可不寫或僅內部參考 -->\n  <!-- <meta name="keywords" content="攝影, 曝光, 網頁設計"> -->\n\n  <!-- 社群分享預覽（Open Graph） -->\n  <meta property="og:title" content="攝影視覺學堂">\n  <meta property="og:description" content="曝光、構圖、後期與作品集實戰。">\n  <meta property="og:image" content="https://example.com/images/og-cover.jpg">\n  <meta property="og:type" content="website">\n\n  <link rel="icon" href="images/favicon.ico">\n  <link rel="stylesheet" href="css/style.css">\n</head>\n<body>\n  <main>\n    <h1>攝影視覺學堂</h1>\n    <p>內文要與 title、description 主題一致。</p>\n  </main>\n</body>\n</html>`,
    tip: "description 要寫給「會不會點進來的人類」看，不是寫給 meta 標籤填充字數。",
    newbieTip: "每完成一頁就在 head 補 title + description，別等全站做完才補。",
    commonMistakes: "每頁 title 都叫「首頁」；description 空白；堆 keywords 以為會排名；og:image 用破圖連結。",
    submissionStandard: "1) 有 title + description + viewport\n2) 能說明 keywords 為何無效\n3) 至少寫一組 og:title / og:description",
    quiz: { q: "Google 目前主要參考的 meta 是？", opts: ["description（與 title、內文）", "keywords", "author"], ans: 0 }
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
  html_float_align_bg: {
    track: "html",
    title: "🧷 圖文排版：float、文字對齊、背景",
    desc: "實務上常用 float 讓圖片靠左/右，搭配 text-align 與 background 做可讀區塊。",
    concept: "雖然新專案多用 Flex/Grid，但 float 仍常見於舊站維護與文章圖文混排。",
    practice: "① 把 .photo 改成 float:right ② 改標題 text-align ③ 換背景色觀察可讀性",
    code: `<style>\n  .wrap {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    border-radius: 12px;\n    padding: 14px;\n  }\n  .photo {\n    width: 120px;\n    height: 80px;\n    float: left;\n    margin: 0 12px 8px 0;\n    border-radius: 10px;\n    background: linear-gradient(135deg, #4f46e5, #06b6d4);\n  }\n  h3 {\n    margin: 0 0 8px;\n    text-align: left;\n    color: #0f172a;\n  }\n  p { line-height: 1.7; color: #475569; }\n</style>\n<div class="wrap">\n  <div class="photo"></div>\n  <h3>圖文混排示範</h3>\n  <p>這段文字會繞過左側圖片。你可以改 float、text-align、background，觀察排版可讀性的變化。</p>\n  <div style="clear: both;"></div>\n</div>`,
    tip: "使用 float 後，父層常需要 clear: both; 避免高度塌陷。",
    quiz: { q: "讓文字繞圖常用哪個屬性？", opts: ["float", "display: inline", "z-index"], ans: 0 }
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
  css_external_import: {
    track: "css",
    title: "📎 外部樣式：link 與 @import",
    desc: "全站 CSS 不應全塞在 HTML。學會用獨立 .css 檔，以及 @import 載入字型/其他樣式表。",
    concept: "<b>方式一（推薦）：&lt;link&gt;</b><br><code>&lt;link rel=\"stylesheet\" href=\"css/style.css\"&gt;</code><br>放在 &lt;head&gt;，瀏覽器並行載入，效能較好。<br><br><b>方式二：@import</b><br>寫在 CSS 檔最上方：<br><code>@import url('css/base.css');</code><br><code>@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap');</code><br>用途：在一份主樣式裡再拆模組、或載入 Google Fonts。<br><br><b>注意</b>：@import 必須在其他規則之前；過多 @import 會拖慢首屏。路徑規則同 HTML（./ ../）。<br><b>不建議</b>：在 HTML 用 &lt;style&gt;@import ...&lt;/style&gt; 當主要載入方式。",
    practice: "① 讀範例註解理解 link 與 @import 差異 ② 把 Google Font 的 font-family 套到 h1 ③ 想像你的 style.css 最上方加一行 @import url('tokens.css')",
    code: `<style>\n  /* 本沙盒模擬：若獨立 style.css 頂部會寫 @import url('...'); */\n  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&display=swap');\n  h1 {\n    font-family: 'Noto Sans TC', sans-serif;\n    color: #4338ca;\n  }\n  .note {\n    font-size: 14px;\n    color: #64748b;\n    line-height: 1.7;\n    max-width: 36em;\n  }\n  code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 13px; }\n</style>\n<h1>外部樣式與字型</h1>\n<p class="note">實務 HTML 請用 <code>&lt;link rel=\"stylesheet\" href=\"css/style.css\"&gt;</code> 引入主樣式；字型可用 @import 或 &lt;link&gt; 載入 Google Fonts。</p>`,
    tip: "一個專案通常 1 個主 link + 必要時在 CSS 內 @import 子模組。",
    newbieTip: "先確認 css/style.css 路徑正確（回顧 HTML 的 ../ 課），再談 @import。",
    commonMistakes: "link 的 href 寫錯導致全站無樣式；@import 寫在 CSS 中段導致後面規則失效。",
    submissionStandard: "1) 能說出 link 與 @import 各適合什麼\n2) 主樣式用 link 引入\n3) 知道 @import 要放在檔案最上方",
    quiz: { q: "全站主樣式表最推薦引入方式？", opts: ["<link rel=\"stylesheet\">", "只在 HTML 寫行內 style", "@import 十幾個檔不 link"], ans: 0 }
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
  css_background_image: {
    track: "css",
    title: "🖼 背景圖片 background-image",
    desc: "Hero 區、卡片底圖、按鈕紋理常用背景圖。與 &lt;img&gt; 不同：背景圖不佔語意，適合裝飾。",
    concept: "<b>基本</b><br><code>background-image: url('images/hero.jpg');</code><br><code>background-size: cover;</code> 填滿容器（可能裁切）<br><code>background-size: contain;</code> 完整顯示（可能留白）<br><code>background-position: center;</code> / <code>top right</code><br><code>background-repeat: no-repeat;</code><br><br><b>多層背景</b>：可疊加漸層 + 圖<br><code>background: linear-gradient(...), url('...') center/cover no-repeat;</code><br><br><b>與 img 差異</b>：SEO/無障礙內容用 &lt;img alt&gt;；純裝飾用 background。固定比例區塊常設 min-height + cover。",
    practice: "① 改 background-position 為 top ② 把 cover 改成 contain 比較 ③ 換一張 Unsplash 網址",
    code: `<style>\n  .hero {\n    min-height: 160px;\n    border-radius: 16px;\n    padding: 24px;\n    color: #fff;\n    font-weight: 800;\n    display: flex;\n    align-items: flex-end;\n    background-image:\n      linear-gradient(to top, rgba(15,23,42,.75), rgba(15,23,42,.2)),\n      url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80');\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n  }\n</style>\n<div class="hero">背景圖 + 漸層遮罩（可讀文字）</div>`,
    tip: "行動版 Hero 注意檔案大小；可用較小 w= 參數的圖。",
    quiz: { q: "背景圖鋪滿容器常設？", opts: ["background-size: cover", "background-repeat: repeat", "float: left"], ans: 0 }
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
    title: "🧠 JavaScript 在做什麼？（一切互動的根基）",
    desc: "HTML 是骨架、CSS 是外觀——只有 JS 能讓網頁「會回應你」。這條路線學穩了，後面的 jQuery、Vue 才不會霧裡看花。",
    concept: "<p>到目前為止，你做的網頁大多是「靜態的」：長得漂亮，但按按鈕不會變、表單不會檢查、資料不會從遠端載入。<strong>JavaScript（JS）</strong> 就是負責這些「行為」的語言。</p><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">🏠 用蓋房子比喻（新手版）</p><ul class=\"tuto-list\"><li><strong>HTML</strong>：鋼筋水泥、房間隔間（結構）</li><li><strong>CSS</strong>：油漆、傢俱、配色（外觀）</li><li><strong>JS</strong>：電燈開關、門鈴、電梯（互動與邏輯）</li></ul><p>沒有 JS，網站像展示用模型屋；有了 JS，才像能住、能用的真房子。</p></div><h3 class=\"tuto-h3\">JS 在瀏覽器裡怎麼跑？</h3><ol class=\"tuto-list\"><li>瀏覽器先讀 HTML、載入 CSS，畫出靜態畫面</li><li>遇到 <code>&lt;script&gt;</code> 就執行 JS（通常放在 body 最後）</li><li>JS 透過 <strong>DOM</strong>（把 HTML 變成可操作的物件樹）改文字、加 class、送 API</li></ol><h3 class=\"tuto-h3\">為什麼說 JS 是「根基」？</h3><p>後面要學的 <strong>jQuery</strong>、<strong>Vue</strong> 都不是另一種魔法，而是「幫你更快寫 JS」的工具：</p><ul class=\"tuto-list\"><li>jQuery 的 <code>$(\"#btn\").on(\"click\", …)</code> → 本質就是原生 <code>querySelector</code> + <code>addEventListener</code></li><li>Vue 的 <code>{{ message }}</code> → 本質就是「資料變了，幫你更新 DOM 文字」</li></ul><p>若 JS 的變數、函式、事件沒學穩，框架只會變成背語法；<strong>下一課「JS 路線地圖」請必讀</strong>，會畫出整條學習順序與對照表。</p><h3 class=\"tuto-h3\">本課先記三件事</h3><p>① 找元素 → ② 綁事件 → ③ 改畫面。下方沙盒的程式碼就是這個流程的縮影。</p>",
    practice: "① 按「點我改變說明」看文字變化 ② 打開 F12 → Console，確認沒有紅色錯誤 ③ 下一課讀「JS 路線地圖」再開始變數課",
    code: `<p id="explain">JS 會在載入後立刻執行第一行</p>\n<button type="button" id="go">點我改變說明</button>\n<script>\n  // ★ 第 1 步：找到元素\n  var msg = document.getElementById("explain");\n  var btn = document.getElementById("go");\n  // ★ 第 2 步：綁定點擊事件\n  btn.addEventListener("click", function() {\n    // ★ 第 3 步：改畫面\n    msg.textContent = "你點了按鈕！JS 正在改 DOM 文字。";\n    msg.style.color = "#4f46e5";\n  });\n<\/script>`,
    focusCode: `const el = document.getElementById("explain");\nconst btn = document.getElementById("go");\nbtn.addEventListener("click", function() {\n  el.textContent = "新文字";\n});`,
    tip: "看不懂程式時：先看 Console 紅字第幾行，再對照這三步骤找元素→綁事件→改畫面。",
    newbieTip: "不要跳過 JS 直接學 Vue。框架是加速器，不是替代品。",
    commonMistakes: "把 JS 當成第二個 CSS；或只 copy 範例卻說不出「哪一行在改 DOM」。",
    submissionStandard: "1) 能說出 HTML/CSS/JS 各管什麼\n2) 能解釋按鈕為何能改文字\n3) 已預約下一課「路線地圖」",
    quiz: { q: "讓按鈕點了會變字，主要靠？", opts: ["JavaScript", "只有 HTML", "只有 CSS"], ans: 0 }
  },
  intro_js_roadmap: {
    track: "js",
    sandbox: false,
    title: "📍 JS 路線地圖（jQuery / Vue 的前置必讀）",
    desc: "整條 JS 分四段：語法 → DOM → 資料與 API → 實戰。先看清地圖再往下走，後面學框架才不會卡關。",
    concept: "<p>這頁沒有複雜程式，是給新手的<strong>學習地圖</strong>。建議收藏心裡的順序：<strong>不要跳課</strong>，尤其 DOM 與事件沒穩就學 Vue，十之八九會卡住。</p><h3 class=\"tuto-h3\">本手冊 JS 路線四段</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>段次</th><th>學什麼</th><th>學完能幹嘛</th></tr></thead><tbody><tr><td><strong>① 語言基礎</strong></td><td>變數、if、迴圈、函式、陣列</td><td>讀得懂程式、會改數字與條件</td></tr><tr><td><strong>② 操作畫面</strong></td><td>DOM、事件、classList、querySelector</td><td>按鈕、Tab、表單互動（最常用）</td></tr><tr><td><strong>③ 資料與非同步</strong></td><td>物件、JSON、fetch、async/await、try/catch</td><td>載入 API、存 localStorage</td></tr><tr><td><strong>④ 實戰整合</strong></td><td>Tab/Modal、表單驗證、Network 除錯、生態概覽</td><td>能交作品、知道何時用框架</td></tr></tbody></table></div><h3 class=\"tuto-h3\">同一件事，三種寫法對照</h3><p>學框架時請回頭對照——語法不同，<strong>概念相同</strong>：</p><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>要做的事</th><th>原生 JS（根基）</th><th>jQuery（舊站維護）</th><th>Vue 3（元件化）</th></tr></thead><tbody><tr><td>選按鈕</td><td><code>document.querySelector('#btn')</code></td><td><code>$('#btn')</code></td><td>模板裡 <code>@click</code></td></tr><tr><td>點擊改字</td><td><code>addEventListener('click', fn)</code></td><td><code>.on('click', fn)</code></td><td><code>@click=\"msg='新文字'\"</code></td></tr><tr><td>改畫面文字</td><td><code>el.textContent = '…'</code></td><td><code>.text('…')</code></td><td><code>{{ msg }}</code> 資料驅動</td></tr><tr><td>切換樣式</td><td><code>classList.toggle('active')</code></td><td><code>.addClass()</code></td><td><code>:class=\"{ on: isActive }\"</code></td></tr><tr><td>載入 API</td><td><code>fetch → json()</code></td><td><code>$.get / $.ajax</code></td><td><code>mounted 裡 fetch</code></td></tr></tbody></table></div><h3 class=\"tuto-h3\">什麼時候可以進 jQuery / Vue？</h3><ul class=\"tuto-list\"><li><strong>進 jQuery</strong>：至少完成 ①② 段，能自己寫 addEventListener + querySelector</li><li><strong>進 Vue</strong>：至少完成 ①②③ 段，懂物件、陣列、fetch 與 async 基本概念</li><li><strong>仍要持續練原生 JS</strong>：面試、除錯、讀別人 code、AI 產出的 script 都是原生為主</li></ul><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">⚠️ 跳過 JS 常見後果</p><ul class=\"tuto-list\"><li>Vue 教學出現 <code>undefined</code>、<code>Cannot read property</code> 不知道從哪查</li><li>只會複製 <code>v-model</code>，表單驗證邏輯寫不出來</li><li>維護舊 jQuery 站時，看到 <code>$</code> 完全不敢改</li></ul></div><h3 class=\"tuto-h3\">建議每週節奏（零基礎）</h3><p>每週 3～4 課 JS + 每課都改一點沙盒程式。④ 段完成後，再切左側分頁到 jQuery 或 Vue，<strong>不要兩個框架同時開</strong>。</p>",
    practice: "① 對照四段表，標記你目前在第幾段 ② 從對照表挑一列，用自己的話解釋「原生 vs jQuery vs Vue」差在哪 ③ 寫下：我預計哪一週開始 jQuery／Vue",
    code: `<style>\n  .map{font-family:system-ui;line-height:1.65;color:#334155;max-width:36em;font-size:14px}\n  .seg{border-left:4px solid #6366f1;padding:8px 12px;margin:10px 0;background:#eef2ff;border-radius:0 10px 10px 0}\n  .seg b{color:#4338ca}\n  .arrow{text-align:center;color:#94a3b8;font-size:12px;margin:4px 0}\n</style>\n<div class="map">\n  <div class="seg"><b>① 語法</b> 變數 → 條件 → 迴圈 → 函式</div>\n  <div class="arrow">↓</div>\n  <div class="seg"><b>② DOM</b> 選元素 → 事件 → classList</div>\n  <div class="arrow">↓</div>\n  <div class="seg"><b>③ 資料</b> 物件 → JSON → fetch → async</div>\n  <div class="arrow">↓</div>\n  <div class="seg"><b>④ 實戰</b> Tab/Modal → 表單 → 生態 → 再學框架</div>\n  <p style="margin-top:12px;color:#64748b">jQuery / Vue 建在這四段之上，不是繞過它們的捷徑。</p>\n</div>`,
    tip: "卡住時問自己：這是「語法」問題、「DOM」問題，還是「資料/API」問題？對回四段就能找到該複習哪課。",
    newbieTip: "左側目錄由上往下學，比跳著找「看起來厲害」的 fetch 或 Vue 有效得多。",
    commonMistakes: "HTML/CSS 剛會就跳 Vue；或 JS 只看不練，後面 jQuery 選擇器完全對不上。",
    submissionStandard: "1) 說出 JS 四段各學什麼\n2) 對照表能舉一個原生→jQuery 或原生→Vue 的例子\n3) 訂出開始框架的最低門檻（完成哪幾課）",
    quiz: { q: "學 Vue 前，至少應穩固？", opts: ["DOM + 事件 + 基本資料/API", "只會 HTML", "只背 Vue 指令"], ans: 0 }
  },
  js_variables: {
    track: "js",
    title: "🔢 變數 const 與 let",
    desc: "變數 = 有名字的盒子。const 盒子裡的引用不能換；let 可以重新賦值。",
    concept: "<code>const name = \"小明\";</code> 之後不能再 name = \"小華\"（會報錯）。<br><code>let score = 0;</code> 之後可以 score = 100。<br>新手口訣：<strong>預設用 const，只有會變的數字/計數器才用 let</strong>。<br>字串用引號、數字不用引號。",
    practice: "① 按 +100 看分數累加 ② 把 const teacher 改成你的名字 ③ 試著把 score 改成 const 看報錯（理解差異）",
    code: `<p id="score-text">載入中…</p>\n<button type="button" id="add-btn">+100 分</button>\n<script>\n  const teacher = "MrBill";  // ★ const：不會重新指派\n  let score = 0;             // ★ let：會累加的分數\n  const textEl = document.getElementById("score-text");\n  const btn = document.getElementById("add-btn");\n  function render() {\n    textEl.textContent = teacher + " 教學分數：" + score;\n  }\n  btn.addEventListener("click", function() {\n    score = score + 100;\n    render();\n  });\n  render();\n<\/script>`,
    focusCode: `const teacher = "MrBill";  // 不會改 → const\nlet score = 0;             // 會累加 → let\nscore = score + 100;       // let 才能重新賦值`,
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
  js_template_strings: {
    track: "js",
    title: "📝 模板字串與字串拼接",
    desc: "用反引號 ` 與 ${} 組出可讀的多行文字，取代醜陋的 + 拼接。",
    concept: "<code>const name = 'Bill';</code><br><code>const msg = `你好，${name}！今日 XP：${score}`;</code><br>可換行、可嵌入運算式：<code>${price * 0.9}</code><br>舊寫法 <code>'你好' + name</code> 仍有效，但模板字串更清楚。",
    practice: "① 改 user 與 xp ② 加一行多行字串顯示課程清單 ③ 在 ${} 內做簡單運算",
    code: `<p id="card"></p>\n<script>\n  const user = "學員";\n  const xp = 350;\n  const tags = ["HTML", "CSS", "JS"];\n  const html = \`\n    <strong>\${user}</strong> 你好！\n    <br>目前 XP：\${xp + 50}（含加成）\n    <br>進行中：\${tags.join(" · ")}\n  \`;\n  document.getElementById("card").innerHTML = html;\n<\/script>`,
    tip: "使用者輸入插入 HTML 前要消毒，防 XSS（進階用 textContent 或 DOMPurify）。",
    quiz: { q: "模板字串插入變數用？", opts: ["${變數}", "#{變數}", "{{變數}}"], ans: 0 }
  },
  js_loops_for: {
    track: "js",
    title: "🔁 for 迴圈與陣列遍歷",
    desc: "for、for...of 與 forEach 都能重複處理清單；依情境選擇。",
    concept: "<code>for (let i = 0; i < arr.length; i++)</code> 需要索引時<br><code>for (const item of arr)</code> 只讀每個值（簡潔）<br><code>arr.forEach(fn)</code> 最常見於渲染列表<br>需要「中斷」迴圈用 for + break；forEach 無法 break。",
    practice: "① 用 for 印 1～5 ② 用 for...of 印課程名 ③ 比較 forEach 寫法",
    code: `<ul id="list"></ul>\n<p id="sum"></p>\n<script>\n  const lessons = ["HTML", "CSS", "JS"];\n  const ul = document.getElementById("list");\n  for (const name of lessons) {\n    const li = document.createElement("li");\n    li.textContent = name;\n    ul.appendChild(li);\n  }\n  let total = 0;\n  const scores = [80, 90, 100];\n  for (let i = 0; i < scores.length; i++) {\n    total += scores[i];\n  }\n  document.getElementById("sum").textContent = "總分：" + total;\n<\/script>`,
    tip: "渲染 DOM 時 DocumentFragment 可減少重排（進階優化）。",
    quiz: { q: "需要索引 i 時常用？", opts: ["for (let i=0; ...)", "forEach 可 break", "while false"], ans: 0 }
  },
  js_arrays: {
    track: "js",
    title: "🗂 陣列 Array 基礎",
    desc: "陣列 [] 存有序清單：索引從 0 開始，可 push 新增、用 length 看長度。",
    concept: "<p><strong>陣列</strong>適合「一串同類資料」：課程清單、相簿縮圖、購物車品項。</p><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>操作</th><th>語法</th><th>說明</th></tr></thead><tbody><tr><td>讀第 1 項</td><td><code>arr[0]</code></td><td>索引從 0 開始，不是 1</td></tr><tr><td>長度</td><td><code>arr.length</code></td><td>有幾個元素</td></tr><tr><td>尾端新增</td><td><code>arr.push('新項目')</code></td><td>改原陣列</td></tr><tr><td>尾端移除</td><td><code>arr.pop()</code></td><td>回傳被刪的那項</td></tr></tbody></table></div><p>下一課「for 迴圈」會教怎麼<strong>一次畫出整份清單</strong>；本課先搞懂陣列本身怎麼存、怎麼取。</p>",
    practice: "① 按「新增課程」看 push 效果 ② 按「移除最後一項」看 pop ③ 改 lessons[0] 觀察第一行文字",
    code: `<p id="info">—</p>\n<ul id="list"></ul>\n<button type="button" id="add">新增課程</button>\n<button type="button" id="pop">移除最後一項</button>\n<script>\n  // ★ 重點：陣列用 []，索引從 0 開始\n  const lessons = ["HTML", "CSS", "JavaScript"];\n  const info = document.getElementById("info");\n  const ul = document.getElementById("list");\n\n  function render() {\n    info.textContent = "共 " + lessons.length + " 堂 · 第一堂：" + (lessons[0] || "（空）");\n    ul.innerHTML = "";\n    lessons.forEach(function(name, i) {\n      const li = document.createElement("li");\n      li.textContent = (i + 1) + ". " + name;\n      ul.appendChild(li);\n    });\n  }\n\n  document.getElementById("add").addEventListener("click", function() {\n    lessons.push("新課程 " + (lessons.length + 1));  // ★ push 尾端新增\n    render();\n  });\n  document.getElementById("pop").addEventListener("click", function() {\n    lessons.pop();  // ★ pop 尾端移除\n    render();\n  });\n  render();\n<\/script>`,
    focusCode: `const lessons = ["HTML", "CSS", "JavaScript"];\nlessons[0];           // "HTML" — 第一項\nlessons.length;       // 3\nlessons.push("Vue");  // 尾端新增\nlessons.pop();        // 尾端移除`,
    tip: "物件 {} 適合「一筆資料有多個欄位」，陣列適合「一串清單」。",
    quiz: { q: "陣列第一個元素索引？", opts: ["0", "1", "-1"], ans: 0 }
  },
  js_array_methods: {
    track: "js",
    title: "🧰 陣列方法：map / filter / find",
    desc: "現代 JS 用陣列方法轉換資料，再渲染畫面，比手寫 for 更清晰。",
    concept: "<code>filter</code>：篩選符合條件的項目 → 新陣列<br><code>map</code>：每項轉換 → 新陣列<br><code>find</code>：找第一個符合的 → 單一項目或 undefined<br><code>includes</code>：是否包含某值 → true/false<br>流程：原始資料 → filter/map → 渲染 DOM",
    practice: "① 篩選分數 >= 90 ② map 成「姓名：分數」字串 ③ 用 find 找第一個及格者",
    code: `<ul id="out"></ul>\n<script>\n  const students = [\n    { name: "Amy", score: 95 },\n    { name: "Ben", score: 72 },\n    { name: "Cy", score: 88 }\n  ];\n  const passed = students\n    .filter(function(s) { return s.score >= 80; })\n    .map(function(s) { return s.name + "：" + s.score + " 分"; });\n  const ul = document.getElementById("out");\n  passed.forEach(function(text) {\n    const li = document.createElement("li");\n    li.textContent = text;\n    ul.appendChild(li);\n  });\n<\/script>`,
    tip: "鏈式：arr.filter(...).map(...) 很常見；注意每一步都回傳新陣列。",
    quiz: { q: "篩選陣列用？", opts: ["filter", "map", "find"], ans: 0 }
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
    title: "📁 專案檔案結構與路徑（./ ../）",
    desc: "初學者最常敗在「檔案放哪、路徑怎麼寫」。這課一次講清資料夾慣例、如何引入 .css / .js，以及相對路徑規則。",
    concept: "<b>推薦資料夾（小站）</b><br><code>my-site/</code><br>　├─ index.html　（首頁入口）<br>　├─ about.html<br>　├─ css/style.css<br>　├─ js/main.js<br>　└─ images/logo.png<br><br><b>在 HTML 引入外部檔（寫在 &lt;head&gt; 或 body 底）</b><br><code>&lt;link rel=\"stylesheet\" href=\"css/style.css\"&gt;</code><br><code>&lt;script src=\"js/main.js\" defer&gt;&lt;/script&gt;</code><br><code>&lt;img src=\"images/photo.jpg\" alt=\"說明\"&gt;</code><br><br><b>路徑怎麼讀（以「目前這支 HTML 檔」為基準）</b><br>• <code>style.css</code> 或 <code>./style.css</code> → 同層資料夾<br>• <code>css/style.css</code> → 進入子資料夾 css<br>• <code>../style.css</code> → 回到上一層（父資料夾）<br>• <code>../images/a.png</code> → 先上一層，再進 images<br><br><b>實例：</b>若 about.html 在根目錄，要載 css/style.css → <code>href=\"css/style.css\"</code>。若 about.html 在 pages/about.html，要載根目錄的 css → <code>href=\"../css/style.css\"</code>。<br><br><b>常見地雷：</b>Windows 反斜線 <code>\\</code> 在網頁路徑無效，請用 <code>/</code>；檔名大小寫在 Linux 主機會區分；用絕對網址 <code>https://...</code> 則不受 ./ ../ 影響。",
    practice: "① 對照上方樹狀圖，在紙上畫出你的作品集結構 ② 把範例裡 href 故意改錯成 csss/style.css，按運行看樣式消失，再改回 ③ 想像 about.html 在子資料夾時，寫出正確的 ../ 路徑",
    code: `<!DOCTYPE html>\n<html lang="zh-Hant">\n<head>\n  <meta charset="UTF-8">\n  <title>檔案與路徑示範</title>\n  <!-- 假設此 html 與 css/ 資料夾同層：my-site/index.html -->\n  <link rel="stylesheet" href="css/style.css">\n</head>\n<body>\n  <h1>結構在 .html</h1>\n  <p>樣式在 css/style.css，腳本在 js/main.js</p>\n  <img src="images/demo.png" alt="示範圖（若無檔案會破圖，屬正常練習）" style="max-width:120px">\n  <p><small>路徑練習：同層用 <code>css/檔名</code>；上一層用 <code>../</code></small></p>\n  <script src="js/main.js" defer></script>\n</body>\n</html>\n\n<!-- 若此檔在 pages/about.html，則應改為：\n<link rel="stylesheet" href="../css/style.css">\n<img src="../images/demo.png" alt="..."> -->`,
    tip: "上線前用瀏覽器 F12 → Network 檢查：紅色 404 就是路徑寫錯或檔案沒上傳。",
    newbieTip: "先在本機用 VS Code / Cursor 開資料夾，用 Live Server 或「Open with Live Server」預覽，比雙擊 html 更接近真實環境。",
    commonMistakes: "把 css 路徑寫成 style.css 但檔案其實在 css/ 子資料夾；子頁面忘記加 ../ 導致全站樣式失效。",
    submissionStandard: "1) 畫出你的專案樹狀圖\n2) index.html 能正確 link 外部 css\n3) 能口述 ./ 與 ../ 差異並各舉一例",
    quiz: { q: "about.html 在 pages/ 子資料夾，要引用根目錄的 css/style.css？", opts: ["../css/style.css", "css/style.css", "./pages/css/style.css"], ans: 0 }
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
    desc: "nav 內放 ul > li > a；通常嵌在 header 裡，是語意化布局的一環。",
    concept: "<p><code>&lt;nav&gt;</code> 標記「這是導航連結區」，搜尋引擎與螢幕閱讀器會優先識別。</p><p>標準位置：<code>header &gt; nav &gt; ul &gt; li &gt; a</code>。若頁面有多個 nav（例如頁首主選單 + 頁尾次要連結），用 <code>aria-label</code> 區分，例如 <code>aria-label=\"主要導航\"</code>。</p><p>與「語意化布局」課配合：nav 在 header 內，主文在 <code>main</code> 內，不要混在同一層 div。</p>",
    practice: "① 做三個連結 ② 用 Flex 橫向排（複習 flex 課）",
    code: `<style>\n  nav ul { list-style:none; margin:0; padding:0; display:flex; gap:12px; }\n  nav a { text-decoration:none; color:#475569; font-weight:bold; padding:8px 12px; border-radius:8px; }\n  nav a:hover { background:#f1f5f9; color:#4f46e5; }\n</style>\n<nav>\n  <ul>\n    <li><a href="index.html">首頁</a></li>\n    <li><a href="tutorial.html">手冊</a></li>\n    <li><a href="photography.html">攝影</a></li>\n  </ul>\n</nav>`,
    tip: "當前頁面連結可加 aria-current=\"page\"（進階 a11y）。",
    quiz: { q: "導覽語意標籤？", opts: ["<nav>", "<div class=\"nav\">", "<table>"], ans: 0 }
  },
  css_borders_outline: {
    track: "css",
    title: "🔲 邊框、圓角與 outline",
    desc: "border 畫框線；border-radius 圓角；outline 做聚焦外框（不影響排版）。",
    concept: "<code>border: 1px solid #e2e8f0;</code><br>分開寫：<code>border-width</code> <code>border-style</code> <code>border-color</code><br><code>border-radius: 12px;</code> 或 <code>999px</code> 膠囊按鈕<br><code>outline: 2px solid #4f46e5;</code> + <code>outline-offset: 2px</code> 鍵盤 focus 友善<br><b>border vs outline</b>：border 佔盒子模型空間；outline 不推擠鄰居。",
    practice: "① 把卡片 border-radius 改成 4px ② 按 Tab 聚焦按鈕看 outline ③ 試 border: 2px dashed #6366f1",
    code: `<style>\n  .card {\n    border: 1px solid #e2e8f0;\n    border-radius: 16px;\n    padding: 16px;\n    background: #fff;\n    max-width: 280px;\n  }\n  .btn {\n    margin-top: 12px;\n    padding: 10px 18px;\n    background: #4f46e5;\n    color: #fff;\n    border: none;\n    border-radius: 10px;\n    font-weight: bold;\n    cursor: pointer;\n  }\n  .btn:focus-visible {\n    outline: 3px solid #fbbf24;\n    outline-offset: 2px;\n  }\n</style>\n<div class="card">\n  <strong>邊框與圓角</strong>\n  <p style="margin:8px 0 0;font-size:14px;color:#64748b">Tab 聚焦下方按鈕</p>\n  <button type="button" class="btn">主要按鈕</button>\n</div>`,
    tip: "設計系統常把 --radius-sm / --radius-lg 做成 CSS 變數。",
    quiz: { q: "鍵盤聚焦外框不推擠版面用？", opts: ["outline", "margin", "float"], ans: 0 }
  },
  css_width_max_overflow: {
    track: "css",
    title: "📐 寬高、max-width 與 overflow",
    desc: "RWD 必學：限制最大寬、圖片不撐破、內容過長時捲動或截斷。",
    concept: "<code>width: 100%</code> 填滿父層<br><code>max-width: 640px</code> 再寬也不超過（文章區常用）<br><code>min-height: 100vh</code> 至少一個視窗高（Hero）<br><code>overflow: hidden</code> 裁切溢出<br><code>overflow-x: auto</code> 表格橫向捲動<br>圖片防破版：<code>img { max-width: 100%; height: auto; }</code>",
    practice: "① 改 max-width 為 320px ② 把 .scroll 內文字加長看橫向捲軸 ③ 給 img 加 max-width:100%",
    code: `<style>\n  .wrap { max-width: 480px; margin: 0 auto; padding: 12px; }\n  .box {\n    width: 100%;\n    max-width: 360px;\n    background: #f1f5f9;\n    padding: 12px;\n    border-radius: 10px;\n    margin-bottom: 12px;\n  }\n  .scroll {\n    overflow-x: auto;\n    white-space: nowrap;\n    border: 1px dashed #cbd5e1;\n    padding: 8px;\n    font-size: 13px;\n  }\n  img { max-width: 100%; height: auto; border-radius: 8px; display: block; }\n</style>\n<div class="wrap">\n  <div class="box">max-width 限制寬度</div>\n  <div class="scroll">很長很長很長很長很長很長的表格列內容會橫向捲動</div>\n  <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600" alt="示範">\n</div>`,
    tip: "Flex/Grid 子項加 min-width:0 可避免內容把版面撐破。",
    quiz: { q: "文章區常限制最大寬用？", opts: ["max-width", "min-width: 9999px", "font-size"], ans: 0 }
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
  css_object_fit: {
    track: "css",
    title: "🖼 圖片 object-fit 與比例",
    desc: "固定寬高的頭像、卡片封面、影片縮圖，用 object-fit 控制裁切方式。",
    concept: "容器設固定 <code>width/height</code>，圖片設 <code>width:100%; height:100%; object-fit: cover;</code><br><b>cover</b>：填滿、可能裁切（最常見）<br><b>contain</b>：完整顯示、可能留白<br><b>fill</b>：拉伸變形（少用）<br><code>object-position: center top;</code> 控制裁切焦點",
    practice: "① 改 object-fit 為 contain ② 改 object-position 為 top ③ 比較 cover 與 contain",
    code: `<style>\n  .thumb {\n    width: 200px;\n    height: 120px;\n    border-radius: 12px;\n    overflow: hidden;\n    border: 2px solid #e2e8f0;\n  }\n  .thumb img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    object-position: center;\n    display: block;\n  }\n  p { font-size: 13px; color: #64748b; }\n</style>\n<div class="thumb">\n  <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" alt="相機">\n</div>\n<p>固定 200×120 的封面區 · 試改 object-fit</p>`,
    tip: "影片 &lt;video&gt; 也可用 object-fit。",
    quiz: { q: "固定高度封面不變形填滿？", opts: ["object-fit: cover", "height: auto only", "float: left"], ans: 0 }
  },
  css_specificity: {
    track: "css",
    title: "⚖️ 權重與覆寫（Specificity）",
    desc: "多條 CSS 衝突時，瀏覽器用權重決定誰贏。搞懂才不會「改了沒反應」。",
    concept: "<b>粗略優先順序</b>（後寫的也會影響）：<br>1. 行內 style（最高，少用）<br>2. #id<br>3. .class、屬性、[type]<br>4. 標籤 p、div<br><br>同權重時：<b>後面寫的覆蓋前面</b>。<br><code>!important</code> 幾乎必勝但難維護，除錯地獄，盡量避免。<br>實務：用 class 設計系統，避免到處 #header #nav a。",
    practice: "① 看 .text 與 p 誰生效 ② 把 p 規則移到 .text 後面觀察 ③ 說明為何不建議 !important",
    code: `<style>\n  p { color: #64748b; }\n  .text { color: #4f46e5; font-weight: bold; }\n  #special { color: #dc2626; }\n</style>\n<p>標籤選擇器灰色</p>\n<p class="text">class 覆蓋成品牌色</p>\n<p class="text" id="special">id 權重更高 → 紅色</p>`,
    tip: "DevTools Elements 面板可看被划掉的規則（被覆蓋）。",
    quiz: { q: "一般情況優先避免？", opts: ["到處用 !important", "用 class", "用語意標籤"], ans: 0 }
  },
  css_media_rwd: {
    track: "css",
    sandbox: false,
    title: "📱 響應式 RWD：手機／平板／電腦斷點",
    desc: "@media 依螢幕寬度切版；學會主流裝置寬度與推薦斷點，作品集才不容易爆版。",
    concept: "<p><b>語法</b>：<code>@media (條件) { /* 規則 */ }</code></p><p><b>min-width</b>（推薦）：視窗<strong>至少</strong>這麼寬才套用 → <strong>Mobile First</strong>，先寫手機版，再逐步加寬。<br><b>max-width</b>：視窗<strong>最多</strong>這麼寬才套用 → Desktop First，維護舊站時較常見。</p><h3 class=\"tuto-h3\">三種裝置，實務上怎麼想</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>裝置</th><th>常見寬度（參考）</th><th>版面習慣</th></tr></thead><tbody><tr><td><strong>手機</strong></td><td>約 320～430px（直向）<br>驗收常抓 <strong>375px</strong>（iPhone 級）</td><td>單欄、字級夠大、按鈕好點、少橫向捲軸</td></tr><tr><td><strong>平板</strong></td><td>約 601～1023px<br>驗收常抓 <strong>768px</strong>（iPad 直向）</td><td>可 2 欄、導覽可改橫排、圖片別過寬</td></tr><tr><td><strong>電腦</strong></td><td>約 1024px 以上<br>驗收常抓 <strong>1280px</strong>（筆電／桌機）</td><td>多欄、最大寬度 <code>max-width</code> 置中、留白</td></tr></tbody></table></div><h3 class=\"tuto-h3\">本手冊推薦斷點（純 CSS）</h3><p>沒有全球唯一標準，但下列組合<strong>最好記、也最常用</strong>，夠完成多數作品集：</p><pre class=\"tuto-code-block\">/* ① 預設 = 手機（不用寫 media） */\n.container { padding: 16px; }\n.grid { display: grid; grid-template-columns: 1fr; gap: 16px; }\n\n/* ② 平板起：≥ 768px */\n@media (min-width: 768px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* ③ 電腦起：≥ 1024px */\n@media (min-width: 1024px) {\n  .container { max-width: 1100px; margin: 0 auto; }\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}</pre><p><b>想再多一階（選用）</b>：大手機／小平板可用 <code>640px</code>（與 Tailwind 的 <code>sm:</code> 接近）。</p><h3 class=\"tuto-h3\">與 Tailwind 對照（之後學 Tailwind 會用到）</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>Tailwind 前綴</th><th>min-width</th><th>大致對應</th></tr></thead><tbody><tr><td>（無前綴）</td><td>0 起</td><td>手機預設</td></tr><tr><td><code>sm:</code></td><td>640px</td><td>大手機</td></tr><tr><td><code>md:</code></td><td>768px</td><td>平板</td></tr><tr><td><code>lg:</code></td><td>1024px</td><td>筆電／小桌機</td></tr><tr><td><code>xl:</code></td><td>1280px</td><td>大桌機</td></tr></tbody></table></div><h3 class=\"tuto-h3\">Bootstrap 常見斷點（讀舊專案時對照）</h3><p><code>sm 576</code> · <code>md 768</code> · <code>lg 992</code> · <code>xl 1200</code> · <code>xxl 1400</code> — 數字不同，觀念一樣：愈寬愈多欄。</p><h3 class=\"tuto-h3\">驗收時請實測這三種寬度</h3><ul class=\"tuto-list\"><li><strong>375px</strong> — 手機直向有沒有橫向爆版</li><li><strong>768px</strong> — 平板直向導覽／欄數是否合理</li><li><strong>1280px</strong> — 桌機是否置中、不會過寬難讀</li></ul><p>Chrome F12 → 切換裝置工具列 → 選上述寬度或自訂。</p><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">❓ 為什麼推薦 Mobile First</p><p>先保證小螢幕能讀，再「加料」給大螢幕；比先做華麗桌機版再硬縮到手機省事，也比較符合多數訪客用手機逛作品的現實。</p></div>",
    practice: "① 用 F12 分別設 375 / 768 / 1280 看沙盒下方範例（若無沙盒請在本機檔案試）② 寫出你專案要用的兩個 min-width ③ 說明 min-width 與 max-width 差異",
    code: `<style>\n  .note { font-size: 13px; color: #64748b; margin-bottom: 10px; line-height: 1.6; }\n  .cols {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 10px;\n    width: 100%;\n    max-width: 100%;\n  }\n  .cols div {\n    background: #ede9fe;\n    color: #4f46e5;\n    padding: 14px 8px;\n    border-radius: 10px;\n    text-align: center;\n    font-weight: bold;\n    font-size: 14px;\n    min-width: 0;\n  }\n  @media (min-width: 768px) {\n    .cols { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n  }\n  @media (min-width: 1024px) {\n    .cols { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n  }\n</style>\n<p class="note">預設 1 欄（手機）· ≥768px 兩欄（平板）· ≥1024px 三欄（電腦）</p>\n<div class="cols"><div>欄 1</div><div>欄 2</div><div>欄 3</div></div>`,
    tip: "斷點要配合設計稿；若老師指定 600px 就以作業為準，但上線前仍建議用 375／768／1280 複查。",
    playground: "media",
    newbieTip: "先寫「沒有 @media 的手機版」，通過 375px 再加平板與桌機 media。",
    commonMistakes: "只做桌機版；或斷點設太多（5～6 個）難維護。一般 2～3 個 min-width 就夠。",
    submissionStandard: "1) 能說出手機／平板／電腦各用哪個 px 驗收\n2) 專案至少 2 個 min-width 斷點\n3) 375px 無橫向捲軸爆版",
    quiz: { q: "作品集最建議優先通過哪個寬度？", opts: ["375px 手機", "只測 1920 桌機", "不用測"], ans: 0 }
  },
  css_flex_advanced: {
    track: "css",
    title: "📐 Flex 進階：gap 與 wrap",
    desc: "gap 取代 margin 排間距；flex-wrap 讓項目換行；flex-direction: column 直向。",
    concept: "卡片牆 = flex + wrap + gap，RWD 必備組合。",
    practice: "① 加第四個 .chip 看換行 ② 改 flex-direction: column",
    code: `<style>\n  .chips {\n    display:flex;\n    flex-wrap:wrap;\n    gap:10px;\n    max-width:100%;\n  }\n  .chip { background:#e0e7ff; color:#4338ca; padding:8px 14px; border-radius:999px; font-size:14px; font-weight:bold; }\n</style>\n<div class="chips">\n  <span class="chip">HTML</span><span class="chip">CSS</span><span class="chip">JS</span><span class="chip">RWD</span>\n</div>`,
    tip: "justify-content: center 可做置中標籤列。",
    quiz: { q: "自動換行？", opts: ["flex-wrap: wrap", "wrap: flex", "break: all"], ans: 0 }
  },
  css_animation: {
    track: "css",
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
    track: "css",
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
  js_classlist: {
    track: "js",
    title: "🏷 classList 切換狀態",
    desc: "用 class 代表 UI 狀態（開啟/選中/錯誤），JS 只負責加減 class，樣式交給 CSS。",
    concept: "<code>el.classList.add('active')</code><br><code>el.classList.remove('open')</code><br><code>el.classList.toggle('is-on')</code> 有則刪、無則加<br><code>el.classList.contains('active')</code> 判斷<br>優於 <code>el.style.display</code> 到處寫，維護性高。",
    practice: "① 點按鈕切換 .active ② 在 CSS 寫 .tab.active { background: indigo } ③ 用 toggle 做開關",
    code: `<style>\n  .tab { padding: 10px 16px; border: 1px solid #cbd5e1; border-radius: 8px; cursor: pointer; font-weight: bold; background: #fff; }\n  .tab.active { background: #4f46e5; color: #fff; border-color: #4f46e5; }\n</style>\n<button type="button" class="tab" id="tab-a">分頁 A</button>\n<button type="button" class="tab" id="tab-b">分頁 B</button>\n<script>\n  const tabs = document.querySelectorAll(".tab");\n  tabs.forEach(function(btn) {\n    btn.addEventListener("click", function() {\n      tabs.forEach(function(b) { b.classList.remove("active"); });\n      btn.classList.add("active");\n    });\n  });\n  document.getElementById("tab-a").classList.add("active");\n<\/script>`,
    tip: "Modal、Tab、手機選單都是 classList 的經典場景。",
    quiz: { q: "切換開/關狀態常用？", opts: ["classList.toggle", "classList.deleteAll", "style.toggle"], ans: 0 }
  },
  js_queryselector: {
    track: "js",
    title: "🎯 querySelector 選擇器",
    desc: "用 CSS 選擇器語法選元素——比只會 getElementById 更彈性。",
    concept: "<div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>方法</th><th>回傳</th><th>用途</th></tr></thead><tbody><tr><td><code>querySelector('.card')</code></td><td>第一個符合的元素</td><td>改單一節點</td></tr><tr><td><code>querySelectorAll('.item')</code></td><td>NodeList（全部）</td><td>迴圈批次修改</td></tr><tr><td><code>querySelector('#hero')</code></td><td>id 唯一那個</td><td>同 getElementById</td></tr></tbody></table></div><p>選不到會回傳 <code>null</code>（querySelectorAll 則是空 NodeList），使用前記得防呆。</p>",
    practice: "① 按「改第一張」只變 A ② 按「全部變色」批次改 ③ 試著選 .missing 看 null",
    code: `<style>\n  .item { padding: 12px; margin-bottom: 8px; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; }\n  .item.hot { background: #ede9fe; border-color: #818cf8; }\n</style>\n<div class="item">卡片 A</div>\n<div class="item">卡片 B</div>\n<div class="item">卡片 C</div>\n<button type="button" id="one">改第一張</button>\n<button type="button" id="all">全部變色</button>\n<script>\n  // ★ 重點：CSS 選擇器語法\n  document.getElementById("one").addEventListener("click", function() {\n    const first = document.querySelector(".item");  // 只選第一個\n    if (first) first.classList.add("hot");\n  });\n  document.getElementById("all").addEventListener("click", function() {\n    document.querySelectorAll(".item").forEach(function(el) {  // 選全部\n      el.classList.add("hot");\n    });\n  });\n<\/script>`,
    focusCode: `document.querySelector(".item");      // 第一個 .item\ndocument.querySelectorAll(".item"); // 全部 .item（可 forEach）\ndocument.querySelector("#hero");    // id=hero`,
    tip: "選擇器寫錯會回傳 null，記得 if (el) 再操作。",
    quiz: { q: "選第一個 .btn？", opts: ["querySelector('.btn')", "querySelectorAll('.btn')", "get.btn"], ans: 0 }
  },
  js_objects: {
    track: "js",
    title: "🗃 物件 Object",
    desc: "鍵值對 { name: 'Bill', score: 100 }，描述一筆「有欄位」的資料。",
    concept: "<p>物件用<strong>鍵名: 值</strong>描述一筆資料，像資料表的一列：</p><pre class=\"tuto-code-block\">const user = {\n  name: \"Bill\",\n  level: 3,\n  skills: [\"HTML\", \"CSS\"]\n};</pre><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>讀取方式</th><th>範例</th></tr></thead><tbody><tr><td>點記法（鍵名固定）</td><td><code>user.name</code></td></tr><tr><td>括號記法（鍵名是變數）</td><td><code>user['level']</code> 或 <code>user[key]</code></td></tr><tr><td>新增／修改欄位</td><td><code>user.xp = 120</code></td></tr></tbody></table></div><p>陣列放很多物件 = 資料表（例如 students 陣列，每個元素是一個 user 物件）。</p>",
    practice: "① 按 +50 XP 看物件欄位更新 ② 改 user.name ③ 用 user['level'] 讀等級",
    code: `<p id="card"></p>\n<button type="button" id="xp-btn">+50 XP</button>\n<script>\n  // ★ 重點：物件 = 鍵值對\n  const user = { name: "學員", level: "進階", xp: 120 };\n  const card = document.getElementById("card");\n\n  function render() {\n    card.innerHTML =\n      "<strong>" + user.name + "</strong> · Lv." + user["level"] +\n      "<br>XP：" + user.xp;\n  }\n\n  document.getElementById("xp-btn").addEventListener("click", function() {\n    user.xp = user.xp + 50;  // ★ 修改物件欄位\n    render();\n  });\n  render();\n<\/script>`,
    focusCode: `const user = { name: "Bill", xp: 100 };\nuser.name;       // 點記法\nuser["xp"];      // 括號記法\nuser.level = 3;  // 新增欄位`,
    tip: "API 回傳的 JSON 解析後就是物件或物件陣列。",
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
  js_async_await: {
    track: "js",
    title: "⏳ async / await 非同步",
    desc: "等 API、等圖片、等計時器完成時，用 async/await 讓程式讀起來像同步，但其實不阻塞整頁。",
    concept: "<code>async function load() { ... }</code> 函式內才能 <code>await</code><br><code>const res = await fetch(url);</code> 等待回應<br><code>const data = await res.json();</code> 等待解析 JSON<br>一定要搭配 <code>try { } catch (e) { }</code> 處理失敗。<br>await 只是「在這個 async 函式內等待」，其他 UI 仍可互動（除非你做阻塞式死迴圈）。",
    practice: "① 按按鈕看 1 秒後文字改變（模擬延遲）② 對照下方 fetch 課 ③ 讀 try/catch 下一課",
    code: `<p id="status">尚未載入</p>\n<button type="button" id="go">模擬載入（1 秒）</button>\n<script>\n  function wait(ms) {\n    return new Promise(function(resolve) { setTimeout(resolve, ms); });\n  }\n  document.getElementById("go").addEventListener("click", async function() {\n    const el = document.getElementById("status");\n    el.textContent = "載入中…";\n    el.style.color = "#64748b";\n    try {\n      await wait(1000);\n      el.textContent = "完成！（await 1 秒後）";\n      el.style.color = "#059669";\n    } catch (e) {\n      el.textContent = "失敗";\n      el.style.color = "#dc2626";\n    }\n  });\n<\/script>`,
    tip: "fetch 回傳 Promise；async/await 是寫法糖，底層仍是 Promise。",
    quiz: { q: "在 async 函式內等待 Promise？", opts: ["await", "pause", "sleep()"], ans: 0 }
  },
  js_try_catch: {
    track: "js",
    title: "🛡 try / catch 錯誤處理",
    desc: "網路失敗、JSON 解析錯、使用者輸入不合法——程式要能優雅失敗，不要整頁卡死。",
    concept: "<code>try { 可能出錯的程式 } catch (e) { 顯示錯誤 }</code><br><code>finally { 無論如何都執行 }</code> 常用來關 loading<br>可讀 <code>e.message</code> 記錄或顯示人話提示<br>不要空 catch 吞掉錯誤；至少 console.error 或更新 UI。",
    practice: "① 按成功載入 ② 按「故意失敗」看 catch ③ 在 finally 關閉 loading 狀態",
    code: `<p id="msg">—</p>\n<button type="button" id="ok">成功 fetch</button>\n<button type="button" id="bad">故意失敗</button>\n<script>\n  async function load(url) {\n    const msg = document.getElementById("msg");\n    msg.textContent = "載入中…";\n    try {\n      const res = await fetch(url);\n      if (!res.ok) throw new Error("HTTP " + res.status);\n      const data = await res.json();\n      msg.textContent = "成功：" + (data.title || data.name || "OK");\n      msg.style.color = "#059669";\n    } catch (e) {\n      msg.textContent = "錯誤：" + e.message;\n      msg.style.color = "#dc2626";\n    }\n  }\n  document.getElementById("ok").addEventListener("click", function() {\n    load("https://jsonplaceholder.typicode.com/posts/1");\n  });\n  document.getElementById("bad").addEventListener("click", function() {\n    load("https://jsonplaceholder.typicode.com/404-not-found");\n  });\n<\/script>`,
    tip: "與 fetch 課合併練習：loading + try/catch + finally 是可交付標準。",
    quiz: { q: "捕捉執行期錯誤用？", opts: ["try/catch", "if/else only", "console.log only"], ans: 0 }
  },
  js_localstorage: {
    track: "js",
    title: "💾 localStorage 記住狀態",
    desc: "重新整理後仍保留：主題色、XP、草稿、上次選的 tab——瀏覽器本地儲存。",
    concept: "<p><strong>localStorage</strong> 只能存<strong>字串</strong>。存物件前必須先 <code>JSON.stringify</code>（請先完成 JSON 課）。</p><code>localStorage.setItem('key', '字串值')</code><br><code>localStorage.getItem('key')</code> 沒有則 null<br>存物件：<code>JSON.stringify(obj)</code> / 讀回 <code>JSON.parse(str)</code><br>清除：<code>removeItem</code> / <code>clear</code><br>容量約 5MB；敏感密碼不要放這裡。",
    practice: "① 按 +10 XP ② 重新整理沙盒預覽（或再按運行）③ 按清除重設",
    code: `<p id="xp">XP：0</p>\n<button type="button" id="add">+10 XP</button>\n<button type="button" id="reset">清除紀錄</button>\n<script>\n  const KEY = "demo_xp";\n  const el = document.getElementById("xp");\n  let xp = parseInt(localStorage.getItem(KEY) || "0", 10);\n  function render() {\n    el.textContent = "XP：" + xp + "（已存 localStorage）";\n    localStorage.setItem(KEY, String(xp));\n  }\n  document.getElementById("add").addEventListener("click", function() {\n    xp += 10;\n    render();\n  });\n  document.getElementById("reset").addEventListener("click", function() {\n    xp = 0;\n    localStorage.removeItem(KEY);\n    render();\n  });\n  render();\n<\/script>`,
    tip: "本手冊頁面的 XP 也用 localStorage；可對照原始碼。",
    quiz: { q: "存物件到 localStorage 前需？", opts: ["JSON.stringify", "array.push", "document.write"], ans: 0 }
  },
  js_json: {
    track: "js",
    title: "📦 JSON 資料格式",
    desc: "API、設定檔、localStorage 都常用 JSON。學會「JS 物件 ↔ JSON 字串」的規則與轉換。",
    concept: "<p><strong>JSON</strong>（JavaScript Object Notation）是<strong>純文字</strong>格式，用來在不同程式／伺服器之間傳資料。它不是 JS 物件本身，而是「序列化後的字串」。</p><h3 class=\"tuto-h3\">JSON 允許的型別</h3><ul class=\"tuto-list\"><li><strong>物件</strong> <code>{ \"key\": value }</code></li><li><strong>陣列</strong> <code>[1, 2, \"a\"]</code></li><li><strong>字串</strong> 必須雙引號 <code>\"Bill\"</code></li><li><strong>數字、布林</strong> <code>100</code>、<code>true</code></li><li><strong>null</strong>（表示空值）</li></ul><h3 class=\"tuto-h3\">JSON vs JS 物件字面（常搞混）</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>規則</th><th>JSON 字串</th><th>JS 物件（程式裡）</th></tr></thead><tbody><tr><td>鍵名引號</td><td>必須 <code>\"name\"</code></td><td>可省略 <code>name:</code></td></tr><tr><td>尾隨逗號</td><td>不允許 <code>{\"a\":1,}</code></td><td>現代 JS 常允許</td></tr><tr><td>註解</td><td>不允許</td><td><code>//</code> 可以</td></tr><tr><td>函式 / undefined</td><td>不允許</td><td>可以</td></tr><tr><td>單引號字串</td><td>不允許</td><td><code>'Bill'</code> 可以</td></tr></tbody></table></div><h3 class=\"tuto-h3\">兩個必背 API</h3><p><code>JSON.stringify(obj)</code> → 物件變 JSON 字串（存檔、送 API）<br><code>JSON.parse(str)</code> → 字串變回物件（讀 API、讀 localStorage）<br><code>fetch</code> 的 <code>res.json()</code> 內部就是 <code>JSON.parse</code>。</p><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">⚠️ 常見錯誤</p><ul class=\"tuto-list\"><li>鍵名沒加雙引號：<code>{name:\"Bill\"}</code> 不是合法 JSON</li><li>用 <code>eval()</code> 解析——有資安風險，請用 <code>JSON.parse</code></li></ul></div>",
    practice: "① 看「JS 物件 vs JSON 字串」並排對照 ② 按 stringify / parse ③ 按「故意錯誤 JSON」看 try/catch",
    code: `<style>\n  .json-demo { font-family: ui-monospace, monospace; font-size: 12px; line-height: 1.55; }\n  .json-demo pre { background: #0f172a; color: #e2e8f0; padding: 10px 12px; border-radius: 8px; overflow: auto; margin: 6px 0 12px; white-space: pre-wrap; }\n  .json-demo h4 { margin: 0 0 4px; font-size: 13px; color: #4338ca; }\n  .json-demo button { margin: 4px 6px 4px 0; padding: 8px 12px; border: none; border-radius: 8px; background: #4f46e5; color: #fff; font-weight: bold; cursor: pointer; font-size: 12px; }\n  .json-demo .bad { background: #dc2626; }\n  .json-demo p.msg { font-weight: bold; margin: 8px 0; }\n</style>\n<div class="json-demo">\n  <h4>① JS 物件（程式裡，鍵名可不加引號）</h4>\n  <pre id="js-view"></pre>\n  <h4>② 合法 JSON 字串（鍵名必須雙引號）</h4>\n  <pre id="json-view"></pre>\n  <p class="msg" id="msg">—</p>\n  <button type="button" id="toStr">JSON.stringify（物件→字串）</button>\n  <button type="button" id="toObj">JSON.parse（字串→物件）</button>\n  <button type="button" id="bad" class="bad">故意 parse 錯誤 JSON</button>\n</div>\n<script>\n  const user = { name: "Bill", level: 3, skills: ["HTML", "CSS"], active: true };\n  const jsView = document.getElementById("js-view");\n  const jsonView = document.getElementById("json-view");\n  const msg = document.getElementById("msg");\n\n  function showSideBySide() {\n    jsView.textContent = "const user = " + JSON.stringify(user, null, 2)\n      .replace(/\"([^\"]+)\":/g, "$1:");\n    jsonView.textContent = JSON.stringify(user, null, 2);\n  }\n\n  document.getElementById("toStr").addEventListener("click", function() {\n    const str = JSON.stringify(user, null, 2);\n    msg.textContent = "字串長度 " + str.length + " 字元（可存 localStorage / 送 API）";\n    msg.style.color = "#059669";\n    jsonView.textContent = str;\n  });\n\n  document.getElementById("toObj").addEventListener("click", function() {\n    const str = '{"name":"學員","level":3,"tags":["JS","JSON"]}';\n    try {\n      const obj = JSON.parse(str);\n      msg.textContent = "解析成功：" + obj.name + " Lv." + obj.level + " · tags=" + obj.tags.join(",");\n      msg.style.color = "#059669";\n    } catch (e) {\n      msg.textContent = "失敗：" + e.message;\n      msg.style.color = "#dc2626";\n    }\n  });\n\n  document.getElementById("bad").addEventListener("click", function() {\n    try { JSON.parse('{name:"Bill"}'); }\n    catch (e) {\n      msg.textContent = "預期錯誤：" + e.message + "（鍵名 name 缺雙引號）";\n      msg.style.color = "#dc2626";\n    }\n  });\n\n  showSideBySide();\n<\/script>`,
    focusCode: `const obj = { name: "Bill", level: 3 };\n\nJSON.stringify(obj);  // 物件 → 字串\nJSON.parse('{"name":"Bill","level":3}');  // 字串 → 物件\n\n// 合法 JSON 鍵名必須雙引號\n// ✗ {name:"Bill"}  ✓ {"name":"Bill"}`,
    tip: "localStorage 只能存字串；存物件前 stringify，讀出後 parse。",
    newbieTip: "看到 API 回傳 {\"...\"} 就是 JSON；用 parse 或 res.json() 轉成物件才能 user.name 這樣讀。",
    commonMistakes: "把 JS 物件字面直接當 JSON 貼給驗證器；鍵名沒雙引號；parse 不包 try/catch。",
    submissionStandard: "1) 說出 JSON 與 JS 物件的三個差異\n2) 能手寫一段合法 JSON（含陣列）\n3) 成功 stringify 再 parse 回來",
    quiz: { q: "合法 JSON 的鍵名必須？", opts: ["雙引號包住", "單引號即可", "不用引號"], ans: 0 }
  },
  js_timers: {
    track: "js",
    title: "⏱ setTimeout 與 setInterval",
    desc: "延遲執行、輪播、倒數、節流防抖的基礎都靠計時器 API。",
    concept: "<code>setTimeout(fn, 300)</code> 300ms 後執行一次<br><code>setInterval(fn, 1000)</code> 每 1 秒重複<br><code>clearTimeout(id)</code> / <code>clearInterval(id)</code> 取消<br>debounce：連續觸發時只執行最後一次（搜尋框課已示範 setTimeout 版）",
    practice: "① 按「3 秒後提示」② 按「開始倒數」再按停止 ③ 對照事件課的 debounce",
    code: `<p id="msg">—</p>\n<button type="button" id="delay">3 秒後變字</button>\n<button type="button" id="start">倒數</button>\n<button type="button" id="stop">停止</button>\n<script>\n  const msg = document.getElementById("msg");\n  let n = 5, timer = null;\n  document.getElementById("delay").addEventListener("click", function() {\n    msg.textContent = "等待 3 秒…";\n    setTimeout(function() { msg.textContent = "時間到！"; }, 3000);\n  });\n  document.getElementById("start").addEventListener("click", function() {\n    if (timer) return;\n    n = 5;\n    timer = setInterval(function() {\n      msg.textContent = "倒數 " + n;\n      n--;\n      if (n < 0) { clearInterval(timer); timer = null; msg.textContent = "結束"; }\n    }, 1000);\n  });\n  document.getElementById("stop").addEventListener("click", function() {\n    if (timer) { clearInterval(timer); timer = null; msg.textContent = "已停止"; }\n  });\n<\/script>`,
    tip: "離開頁面或元件卸載時記得 clearInterval，避免記憶體洩漏。",
    quiz: { q: "只執行一次延遲用？", opts: ["setTimeout", "setInterval", "setLoop"], ans: 0 }
  },
  js_ecosystem: {
    track: "js",
    sandbox: false,
    title: "🌍 JS 生態：從根基到 jQuery、Vue",
    desc: "原生 JS 是共通語言；jQuery、Vue 是不同時代的「寫法加速器」。這課幫你選下一步，而不是盲目追新。",
    concept: "<p>恭喜走到 JS 路線後段！在進 jQuery 或 Vue 分頁前，先釐清：<strong>框架沒有取代 JS，只是幫你少寫一些 DOM 程式碼</strong>。</p><h3 class=\"tuto-h3\">三種角色，一句話</h3><ul class=\"tuto-list\"><li><strong>Vanilla JS（原生）</strong>：瀏覽器內建能力，所有框架最後都跑在這上面</li><li><strong>jQuery</strong>：2000 年代讓 DOM 變短；<strong>舊站、WordPress 外掛、後台模板</strong>仍大量存在</li><li><strong>Vue / React</strong>：元件 + 資料驅動畫面，適合<strong>多頁互動、後台、中大型前台</strong></li></ul><h3 class=\"tuto-h3\">你學過的 JS → 框架怎麼接</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>JS 路線已學</th><th>jQuery 對應</th><th>Vue 對應</th></tr></thead><tbody><tr><td>querySelector</td><td><code>$('.card')</code></td><td>ref / 模板綁定</td></tr><tr><td>addEventListener</td><td><code>.on('click')</code></td><td><code>@click</code></td></tr><tr><td>classList.toggle</td><td><code>.toggleClass()</code></td><td><code>:class</code></td></tr><tr><td>fetch + async</td><td><code>$.ajax</code></td><td><code>mounted</code> 裡請求</td></tr><tr><td>陣列 map/filter</td><td><code>$.map</code>（較少）</td><td><code>v-for</code></td></tr><tr><td>函式 / 模組</td><td>物件包 App.init</td><td>元件、composable</td></tr></tbody></table></div><h3 class=\"tuto-h3\">怎麼選下一步？</h3><ul class=\"tuto-list\"><li><strong>先 jQuery</strong>：要接舊案、公司現有 jQuery 模板、快速改 DOM</li><li><strong>先 Vue</strong>：新作品集要多頁狀態、表單、列表 CRUD</li><li><strong>兩者都略讀</strong>：可以，但<strong>同一週只主攻一條</strong>，避免語法混亂</li></ul><p>業界常見加值：TypeScript、Vite、Tailwind——都在 JS 根基穩了之後再加。</p>",
    practice: "① 讀下方選型表 ② 依你的目標（接案／作品集／舊站）選 jQuery 或 Vue ③ 用一句話向朋友解釋「為什麼 JS 不能跳過」",
    code: `<style>\n  table { width:100%; border-collapse:collapse; font-size:13px; }\n  th, td { border:1px solid #e2e8f0; padding:8px; text-align:left; }\n  th { background:#f1f5f9; }\n  .tag { display:inline-block; background:#ede9fe; color:#4f46e5; padding:2px 8px; border-radius:6px; font-size:12px; font-weight:bold; margin:2px; }\n</style>\n<h3 style="margin:0 0 8px;font-size:16px">技術選型速查</h3>\n<table>\n  <tr><th>技術</th><th>適合</th><th>與 JS 根基關係</th></tr>\n  <tr><td>Vanilla JS</td><td>學習、靜態頁、嵌入小互動</td><td>必學底層</td></tr>\n  <tr><td>jQuery</td><td>舊站維護</td><td>DOM 語法糖，需懂原生</td></tr>\n  <tr><td>Vue 3</td><td>元件化前台</td><td>資料驅動 DOM，需懂物件/事件</td></tr>\n  <tr><td>React</td><td>大型 SPA、求職</td><td>概念同 Vue，語法不同</td></tr>\n</table>\n<p style="margin-top:12px"><span class="tag">建議</span> 完成 JS 四段 → 選 jQuery 或 Vue 一條深入 → 再 Git／上線</p>`,
    tip: "面試常問「不用框架怎麼做 Tab？」——答得出來，代表 JS 根基真的穩。",
    newbieTip: "Vue 教學裡的錯誤訊息，90% 要回 JS 路線找答案（變數、物件、非同步）。",
    commonMistakes: "只學框架語法，Console 報錯不會看；或以為 jQuery 與 Vue 可完全取代原生。",
    submissionStandard: "1) 能說出 jQuery 與 Vue 各適合什麼場景\n2) 對照表舉一個已學 JS 概念在框架的對應\n3) 已選定下一分頁（jQuery 或 Vue）",
    quiz: { q: "框架與原生 JS 的關係？", opts: ["框架建構在 JS 之上", "框架取代 JS 不用學", "jQuery 等於 Vue"], ans: 0 }
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
    track: "css",
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
    code: `<form id="contact" novalidate style="max-width:280px">\n  <label style="display:block;font-size:13px;font-weight:bold;margin-bottom:4px">Email</label>\n  <input id="email" type="email" placeholder="you@mail.com" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:8px;margin-bottom:8px;box-sizing:border-box">\n  <button type="submit" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer">送出</button>\n  <p id="msg" style="font-size:13px;margin-top:8px;color:#64748b;min-height:1.2em"></p>\n</form>\n<script>\n  document.getElementById("contact").addEventListener("submit", function(e) {\n    e.preventDefault();\n    const input = document.getElementById("email");\n    const msg = document.getElementById("msg");\n    const val = input.value.trim();\n    if (!val) {\n      msg.textContent = "請填寫 Email";\n      msg.style.color = "#dc2626";\n      return;\n    }\n    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val)) {\n      msg.textContent = "Email 格式不正確";\n      msg.style.color = "#dc2626";\n      return;\n    }\n    msg.textContent = "✓ 驗證通過（示範），實務接著 fetch 送 API";\n    msg.style.color = "#059669";\n  });\n<\/script>`,
    focusCode: `form.addEventListener("submit", function(e) {\n  e.preventDefault();  // 阻止整頁重整\n  // 驗證通過後再 fetch 送 API\n});`,
    tip: "後端仍要再驗證一次，前端驗證不能當唯一防線。",
    quiz: { q: "阻止表單重整頁面？", opts: ["e.preventDefault()", "e.stopPage()", "return html"], ans: 0 }
  },
  work_responsive_img: {
    track: "css",
    title: "🖼 響應式圖片 srcset / sizes",
    desc: "同一張圖提供多種寬度，手機載小檔、桌面載大檔，省流量又清晰。",
    concept: "<code>srcset=\"url 400w, url2 800w\"</code> 列出候選<br><code>sizes=\"(max-width:600px) 100vw, 400px\"</code> 告訴瀏覽器顯示多寬<br>最簡單版：Unsplash <code>?w=400</code> / <code>?w=800</code> 手動切換。<br>進階：<code>&lt;picture&gt;</code> 依媒體換不同裁切圖。",
    practice: "① 縮窄預覽看 img 仍 max-width:100% ② 改 w= 參數比較檔案大小（Network）",
    code: `<style>img{display:block;max-width:100%;height:auto;border-radius:12px}</style>\n<img\n  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"\n  srcset="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80 400w,\n          https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80 800w"\n  sizes="(max-width: 600px) 100vw, 400px"\n  alt="相機">\n<p style="font-size:13px;color:#64748b">瀏覽器依螢幕寬度自動挑合適解析度</p>`,
    tip: "攝影作品集必學；搭配 loading=\"lazy\"。",
    quiz: { q: "列出多種寬度候選用？", opts: ["srcset", "hrefset", "imglist"], ans: 0 }
  },
  work_git: {
    track: "git",
    title: "🔀 Git 工作流程（團隊必備）",
    desc: "版本控制：記錄每次修改、可回溯、多人協作、與 GitHub 搭配 PR。",
    concept: "<b>日常循環</b>：改檔 → <code>git status</code> → <code>git add .</code> → <code>git commit -m \"說明\"</code> → <code>git push</code><br><b>分支</b>：新功能開 branch，完成後 Pull Request 請同事 review。<br><b>.gitignore</b>：排除 node_modules、.env 密碼檔。<br><b>衝突</b>：同一行被兩人改，手動合併後再 commit。<br><b>混合團隊</b>：設計師沒 Git 時見「Git 09」——<b>情境 A</b> 只改 css／圖；<b>情境 B</b> 套版會動 HTML，交接規則與 tag 命名不同。",
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
    title: "🚀 上線總覽：部署方式怎麼選",
    desc: "靜態網站（純 HTML/CSS/JS）有多種上線管道。這課幫你對照「免費、速度、自訂網域、適合誰」。",
    concept: "<b>什麼算靜態站？</b> 瀏覽器直接讀檔案即可，不需自己架 Node/PHP 伺服器（本手冊作品集即屬此類）。<br><br><b>常見方案對照</b><br>• <b>GitHub Pages</b>：免費、與 Git 整合佳，適合作品集、文件站。網址通常 username.github.io/repo<br>• <b>Netlify</b>：拖曳資料夾或連 Git 自動部署，表單/重導向等附加功能多，適合快速上線<br>• <b>Vercel</b>：對前端專案體驗好，亦支援靜態；若日後有框架專案可沿用<br>• <b>傳統虛擬主機（cPanel/FTP）</b>：上傳整包檔案到 public_html，適合公司已買主機、要放多個子網域<br>• <b>雲端儲存 + CDN</b>：進階，暫不建議初學第一站<br><br><b>上線前必做</b>：入口 index.html、相對路徑在子目錄是否正確、圖片/CSS 是否都有上傳、手機寬度測試、移除 .env 等敏感檔。",
    practice: "① 選一種平台（建議先 GitHub Pages 或 Netlify）② 對照「上線專題」分頁逐步操作 ③ 部署後用無痕視窗 + 手機各開一次",
    code: `<style>body{font-family:system-ui;line-height:1.7;color:#334155;max-width:36em} table{width:100%;border-collapse:collapse;font-size:14px} th,td{border:1px solid #e2e8f0;padding:8px;text-align:left} th{background:#f8fafc}</style>\n<h2>靜態部署快速對照</h2>\n<table>\n  <tr><th>平台</th><th>優點</th><th>注意</th></tr>\n  <tr><td>GitHub Pages</td><td>免費、版控一体</td><td>公開 repo 才免費方案最單純</td></tr>\n  <tr><td>Netlify</td><td>部署快、預覽網址</td><td>記得設 publish 目錄</td></tr>\n  <tr><td>FTP 主機</td><td>公司既有空間</td><td>路徑常是 public_html</td></tr>\n</table>\n<p>入口檔一律：<strong>index.html</strong></p>`,
    tip: "部署失敗 80% 是路徑或漏檔；請對照 HTML 分頁的「檔案與路徑」課。",
    newbieTip: "第一次上線建議「整包資料夾上傳」，不要只傳 index.html 而漏 css/js/images。",
    commonMistakes: "本機用 file:// 能開，上線後 CSS 全掛（路徑少寫 ../）；只部署 main 分支但 GitHub Pages 設錯 branch。",
    submissionStandard: "1) 已選定部署平台並說出理由\n2) 列出上線前 5 項檢查\n3) 完成至少一個平台的成功部署（見 deploy 分頁各課）",
    quiz: { q: "純 HTML 作品集最適合先嘗試？", opts: ["GitHub Pages 或 Netlify", "自行架資料庫", "只傳 Word 檔"], ans: 0 }
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
  "intro_welcome", "html_learning_path", "html_vs_css", "intro_devtools", "intro_files",
  "html_skeleton", "html_headings", "html_inline", "html_media", "html_lists", "html_list_details",
  "html_description_list", "html_div_span", "html_tables", "html_containers", "html_head_seo", "html_inputs", "html_float_align_bg", "html_button", "html_form", "html_nav",
  "css_selectors", "css_external_import", "css_colors", "css_background_image", "css_typography", "css_spacing",
  "work_units_rem", "css_box_model", "css_borders_outline", "css_width_max_overflow", "css_display",
  "css_flexbox", "css_grid", "css_position", "css_shadows", "css_transitions",
  "css_variables", "css_pseudo", "css_object_fit", "css_flex_advanced", "css_media_rwd", "css_animation", "css_zindex",
  "css_specificity", "work_flex_center", "work_overflow", "work_responsive_img",
  "intro_js_whatis", "intro_js_roadmap", "js_variables", "js_conditionals", "js_template_strings", "js_loops_for", "js_arrays", "js_array_methods",
  "js_objects", "js_functions", "js_events", "js_dom", "js_classlist", "js_queryselector", "js_arrow",
  "js_async_await", "js_try_catch", "js_json", "js_fetch", "js_localstorage", "js_timers", "js_ecosystem",
  "adv_ui_patterns",
  "work_overflow", "work_units_rem", "work_flex_center", "work_responsive_img",
  "js_form_submit", "work_devtools_network", "work_git",
  "master_semantic", "master_a11y", "master_performance", "master_deploy", "master_capstone"
];

const tutorialTrackRepository = {
  jq_01_intro: { track: "jquery", title: "jQuery 01｜為什麼還要學 jQuery", desc: "jQuery 是「縮短 DOM 寫法」的工具。進這條路線前，請先穩固 JS 的 querySelector 與 addEventListener。", concept: "<p>你會在大量<strong>既有網站</strong>看到 jQuery（<code>$</code> 符號）。會讀、會改、能補功能，就能接舊案維護。</p><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">🔗 與 JS 根基的對應</p><ul class=\"tuto-list\"><li><code>$('#title')</code> ≈ <code>document.querySelector('#title')</code></li><li><code>.on('click', fn)</code> ≈ <code>addEventListener('click', fn)</code></li><li><code>.text('…')</code> ≈ <code>el.textContent = '…'</code></li></ul><p>若這三個原生寫法還不熟，請先回 JS 分頁補「DOM／事件」課。</p></div><p>新專案較少從零選 jQuery，但<strong>維護價值</strong>仍然很高。</p>", practice: "打開範例後，改標題文字並按運行；對照上方三組原生/jQuery 對應。", code: `<h2 id="title">Hello jQuery</h2>\n<button id="btn">改標題</button>\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>\n<script>\n  // ★ jQuery 核心：$ 選元素 → .on 綁事件 → .text 改文字\n  $("#btn").on("click", function () {\n    $("#title").text("已成功操作 DOM");\n  });\n<\/script>`, focusCode: `$("#btn").on("click", function() {\n  $("#title").text("新標題");\n});\n// 等同原生：querySelector + addEventListener + textContent`, tip: "先熟悉 `$()`、`.on()`、`.text()` 三個核心。", quiz: { q: "jQuery 最常用來做什麼？", opts: ["DOM 操作與事件", "資料庫建表", "編譯 TypeScript"], ans: 0 } },
  jq_02_selectors: { track: "jquery", title: "jQuery 02｜選取器與鏈式寫法", desc: "掌握 class/id/層級選取器與鏈式呼叫。", concept: "一次選到元素後可連續呼叫方法，程式更短更直覺。", practice: "把卡片背景改色，再加上圓角。", code: `<style>.rounded{border-radius:12px}</style>\n<div class="card">卡片 A</div>\n<div class="card">卡片 B</div>\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>\n<script>\n  // ★ 鏈式：選 .card → 改樣式 → 加 class\n  $(".card").css({ padding: "12px", margin: "8px 0" });\n  $(".card").eq(0).css("background", "#e0f2fe").addClass("rounded");\n<\/script>`, focusCode: `$(".card").css({ padding: "12px" });\n$(".card").eq(0).addClass("rounded");  // 鏈式寫法`, tip: "優先 class，避免過度依賴 id。", quiz: { q: "鏈式寫法是指？", opts: ["連續呼叫多個方法", "一次寫很多 if", "把 JS 寫成一行"], ans: 0 } },
  jq_03_events: { track: "jquery", title: "jQuery 03｜事件監聽與事件委派", desc: "解決動態新增元素綁不到事件的問題。", concept: "事件委派把監聽綁在父層，子元素動態新增也可觸發。", practice: "新增項目後也能點擊刪除。", code: `<ul id="list"><li>任務 1 <button class="del">刪除</button></li></ul>\n<button id="add">新增</button>\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>\n<script>\n  $("#add").on("click", function(){\n    $("#list").append('<li>新任務 <button class="del">刪除</button></li>');\n  });\n  // ★ 事件委派：綁在父層 #list，動態新增的 .del 也能點\n  $("#list").on("click", ".del", function(){\n    $(this).closest("li").remove();\n  });\n<\/script>`, focusCode: `$("#list").on("click", ".del", function() {\n  $(this).closest("li").remove();\n});\n// 父層監聽 + 子選擇器 = 事件委派`, tip: "動態列表必學 `on(parent, childSelector)`。", quiz: { q: "動態元素建議用？", opts: ["事件委派", "每次重綁所有事件", "只用 onclick"], ans: 0 } },
  jq_04_dom: { track: "jquery", title: "jQuery 04｜DOM 新增/刪除/替換", desc: "熟悉 append/prepend/remove/html/text。", concept: "CRUD 思維可直接套到畫面節點維護。", practice: "加入一張卡片、再移除第一張。", code: `<div id="cards"></div>\n<button id="add">新增卡片</button>\n<button id="remove">刪第一張</button>\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>\n<script>\nlet i=1;\n$("#add").on("click",()=>$("#cards").append('<p class="item">卡片 '+(i++)+'</p>'));\n$("#remove").on("click",()=>$("#cards .item").first().remove());\n<\/script>`, tip: "輸入來自使用者時，盡量用 `.text()` 降低 XSS 風險。", quiz: { q: "安全插入純文字優先用？", opts: [".text()", ".html()", "innerHTML+"], ans: 0 } },
  jq_05_effects: { track: "jquery", title: "jQuery 05｜動畫效果與 UI 回饋", desc: "使用 fade/slide/animate 建立操作回饋。", concept: "動畫是輔助訊號，不是主角；要短、要穩、要可理解。", practice: "按下按鈕讓面板滑入滑出。", code: `<button id="toggle">切換面板</button>\n<div id="panel" style="display:none;padding:12px;border:1px solid #cbd5e1;margin-top:8px;">內容區</div>\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>\n<script>$("#toggle").on("click",()=>$("#panel").slideToggle(180));<\/script>`, tip: "微動畫建議 150~250ms。", quiz: { q: "面板展開收合可用？", opts: ["slideToggle", "alert", "console.log"], ans: 0 } },
  jq_06_ajax: { track: "jquery", title: "jQuery 06｜AJAX 與 API 串接", desc: "用 `$.get` / `$.ajax` 載入遠端資料。", concept: "讀 API 的核心是：請求、成功渲染、失敗提示。", practice: "按下按鈕抓取文章標題。", code: `<button type="button" id="load">載入資料</button><p id="out"></p>\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>\n<script>\n$("#load").on("click", function(){\n  $.get("https://jsonplaceholder.typicode.com/posts/1")\n    .done(function(d){ $("#out").text(d.title); })\n    .fail(function(){ $("#out").text("載入失敗"); });\n});\n<\/script>`, focusCode: `$("#load").on("click", function() {\n  $.get("https://jsonplaceholder.typicode.com/posts/1")\n    .done(function(d) { $("#out").text(d.title); })\n    .fail(function() { $("#out").text("載入失敗"); });\n});`, tip: "一定要寫 fail 分支。", quiz: { q: "AJAX 失敗時應該？", opts: ["顯示可理解錯誤訊息", "什麼都不做", "直接重整頁面"], ans: 0 } },
  jq_07_form: { track: "jquery", title: "jQuery 07｜表單驗證實務", desc: "前端先做基本驗證，提高資料品質。", concept: "先擋明顯錯誤，再交由後端做最終驗證。表單加 <code>novalidate</code> 可關閉瀏覽器預設提示，改由 JS 顯示人話訊息。", practice: "① 空白送出看錯誤 ② 輸入 test@mail.com 看成功 ③ 讀 preventDefault 與 regex", code: `<form id="f" novalidate style="max-width:280px">\n  <label style="display:block;font-size:13px;font-weight:bold;margin-bottom:4px">Email</label>\n  <input id="email" type="email" placeholder="you@example.com" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:8px;margin-bottom:8px;box-sizing:border-box">\n  <button type="submit" style="padding:8px 16px;background:#4f46e5;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer">送出驗證</button>\n</form>\n<p id="msg" style="font-size:13px;margin-top:8px;min-height:1.2em;color:#64748b"></p>\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"><\/script>\n<script>\n$("#f").on("submit", function(e){\n  e.preventDefault();\n  const v = $("#email").val().trim();\n  const ok = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v);\n  if (!v) { $("#msg").css("color","#dc2626").text("請填寫 Email"); return; }\n  $("#msg").css("color", ok ? "#059669" : "#dc2626").text(ok ? "✓ 格式正確" : "Email 格式不正確");\n});\n<\/script>`, focusCode: `$("#f").on("submit", function(e) {\n  e.preventDefault();\n  const ok = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test($("#email").val());\n  $("#msg").text(ok ? "格式正確" : "格式錯誤");\n});`, tip: "規則寫清楚、錯誤訊息寫人話。", quiz: { q: "前端驗證可取代後端驗證嗎？", opts: ["不行", "可以完全取代", "只看專案大小"], ans: 0 } },
  jq_08_components: { track: "jquery", title: "jQuery 08｜常見元件：Tab/Modal", desc: "建立可重複使用的互動元件。", concept: "元件思維：HTML 結構固定、資料與狀態可切換。", practice: "點 Tab 切換內容。", code: `<div><button class="tab" data-t="a">A</button><button class="tab" data-t="b">B</button></div>\n<div class="pane" data-p="a">內容 A</div><div class="pane" data-p="b" style="display:none">內容 B</div>\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>\n<script>\n$(".tab").on("click", function(){\n  const t = $(this).data("t");\n  $(".pane").hide();\n  $('.pane[data-p="'+t+'"]').show();\n});\n<\/script>`, tip: "元件 class 命名一致，後續維護快很多。", quiz: { q: "Tab 切換核心做法是？", opts: ["控制顯示/隱藏狀態", "每次重載整頁", "只改 console"], ans: 0 } },
  jq_09_plugin: { track: "jquery", title: "jQuery 09｜外掛整合與初始化", desc: "學會看文件初始化第三方 plugin。", concept: "90% 外掛問題來自：資源載入順序、selector 錯誤、初始化時機。", practice: "模擬 plugin 初始化流程。", code: `<input id="dateInput" placeholder="YYYY-MM-DD">\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>\n<script>\n$(function(){\n  // 假設這裡是 plugin init\n  $("#dateInput").on("focus", function(){ $(this).css("border","2px solid #4f46e5"); });\n});\n<\/script>`, tip: "`$(function(){ ... })` 確保 DOM 準備後再初始化。", quiz: { q: "初始化時機通常放在？", opts: ["DOM ready 後", "HTML 最前面", "隨便都可"], ans: 0 } },
  jq_10_performance: { track: "jquery", title: "jQuery 10｜效能與可維護性", desc: "減少重複查找 DOM、節流高頻事件。", concept: "效能核心：少查 DOM、少重排、少無效重繪。", practice: "把重複 selector 存變數。", code: `<div id="box">滾動觀察</div>\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>\n<script>\nconst $box = $("#box");\nlet timer;\n$(window).on("resize", function(){\n  clearTimeout(timer);\n  timer = setTimeout(function(){ $box.text("resize: " + window.innerWidth); }, 120);\n});\n<\/script>`, tip: "高頻事件（scroll/resize）必做節流或防抖。", quiz: { q: "優化高頻事件常用？", opts: ["debounce/throttle", "更多 console", "每次都查 DOM"], ans: 0 } },
  jq_11_architecture: { track: "jquery", title: "jQuery 11｜模組化與命名規範", desc: "把功能分模組，避免單檔爆炸。", concept: "把事件綁定、資料處理、畫面渲染分開，維護成本大幅下降。", practice: "建立簡單 App 物件封裝 init。", code: `<button id="run">初始化</button><p id="state"></p>\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>\n<script>\nconst App = {\n  init(){ this.bind(); $("#state").text("App ready"); },\n  bind(){ $("#run").on("click", ()=>$("#state").text("clicked")); }\n};\nApp.init();\n<\/script>`, tip: "命名要可讀，函式一眼看出用途。", quiz: { q: "模組化主要目的？", opts: ["降低維護成本", "讓檔案更長", "增加耦合"], ans: 0 } },
  jq_12_master_workflow: { track: "jquery", sandbox: false, staticPreview: false, title: "jQuery 12｜大師關：維護舊站 + 漸進升級", desc: "在不中斷服務下改舊站，並規劃升級路線。", concept: "<p>這課是<strong>流程規劃</strong>，不是寫程式。舊站維護的核心：先穩定、再模組化、最後分頁級升級。</p><h3 class=\"tuto-h3\">建議三步驟</h3><ol class=\"tuto-list\"><li><strong>先穩定</strong>：修 bug、補最小測試，不要一開始就重寫</li><li><strong>再模組化</strong>：把重複的 <code>$('.tab')</code> 邏輯抽成 <code>App.tabs.init()</code></li><li><strong>漸進升級</strong>：新頁面用 Vue，舊頁保留 jQuery，不要一次全砍</li></ol><p>下方清單可直接當你專案的升級 checklist。</p>", practice: "寫下你專案的三步升級清單（穩定→模組化→新頁 Vue 化）。", code: `<ol>\n  <li>先穩定舊功能（bug 修復）</li>\n  <li>抽離重複 jQuery 模組</li>\n  <li>新頁面改用 Vue 實作</li>\n</ol>\n<p>完成後，你已能接手多數 jQuery 維護案。</p>`, tip: "不是推翻重寫，而是可交付的漸進改造。", quiz: { q: "舊站升級最佳策略？", opts: ["漸進改造", "一次全砍重寫", "不動它"], ans: 0 } },

  vue_01_intro: { track: "vue", title: "Vue 01｜Vue 核心心法", desc: "Vue 讓你「改資料，畫面自己更新」。進這條路線前，請先會 JS 的變數、物件、DOM 與事件。", concept: "<p>Vue 的核心：<strong>你改資料，框架幫你更新畫面</strong>，不必像原生 JS 那樣手動 <code>textContent = …</code> 逐個改。</p><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">🔗 與 JS 根基的對應</p><ul class=\"tuto-list\"><li><code>data(){ return { message: '…' } }</code> → 就是 JS 物件存狀態</li><li><code>{{ message }}</code> → 把物件欄位顯示到 DOM（原生要自己改 textContent）</li><li><code>@click</code> → 就是事件監聽，只是寫在模板裡</li><li><code>v-for</code> → 就是陣列 map 渲染列表</li></ul><p>若 <code>undefined</code>、<code>Cannot read properties</code> 常出現，請回 JS 路線補「物件／陣列／async」。</p></div>", practice: "修改 message 文字並看畫面同步更新；對照上方 JS 對應表。", code: `<div id="app">{{ message }}</div>\n<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>\n<script>\n  // ★ data 回傳物件 = 畫面狀態；{{ message }} 自動同步\n  Vue.createApp({\n    data() { return { message: "Hello Vue 3" }; }\n  }).mount("#app");\n<\/script>`, focusCode: `Vue.createApp({\n  data() { return { message: "Hello Vue 3" }; }\n}).mount("#app");\n\n// 模板：{{ message }}  ← 資料變，畫面自動更新`, tip: "Vue 先學資料流，再學語法糖。", quiz: { q: "Vue 最大特性是？", opts: ["資料驅動畫面", "手動逐一改 DOM", "只做後端"], ans: 0 } },
  vue_02_template: { track: "vue", title: "Vue 02｜模板語法與插值", desc: "掌握 `{{ }}`、屬性綁定、條件渲染。", concept: "模板像 HTML++，可直接綁資料與狀態。", practice: "切換 isActive 觀察 class 變化。", code: `<div id="app">\n  <h3 :class=\"{ on: isActive }\">{{ title }}</h3>\n  <button @click=\"isActive=!isActive\">切換狀態</button>\n</div>\n<style>.on{color:#4f46e5;font-weight:bold}</style>\n<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>\n<script>\n  Vue.createApp({\n    data() { return { title: "模板練習", isActive: false }; }\n  }).mount("#app");\n<\/script>`, focusCode: `{{ title }}           // 插值顯示\n:class="{ on: isActive }"  // 屬性綁定（v-bind 縮寫 :）\n@click="isActive=!isActive"  // 事件（v-on 縮寫 @）`, tip: "`v-bind` 可縮寫成 `:`。", quiz: { q: "屬性綁定縮寫是？", opts: [":", "@", "#"], ans: 0 } },
  vue_03_directives: { track: "vue", title: "Vue 03｜常用指令 v-if / v-for", desc: "掌握列表渲染與條件顯示。", concept: "清單用 `v-for`，顯示控制用 `v-if` 或 `v-show`。", practice: "新增一個清單項目。", code: `<div id=\"app\">\n  <button @click=\"show=!show\">切換</button>\n  <p v-if=\"show\">現在顯示中</p>\n  <ul><li v-for=\"item in items\" :key=\"item\">{{ item }}</li></ul>\n</div>\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.prod.js\"></script>\n<script>\nVue.createApp({ data(){ return { show:true, items:['HTML','CSS','Vue'] }; } }).mount('#app');\n<\/script>`, tip: "`v-for` 一定加 `:key`。", quiz: { q: "渲染列表用？", opts: ["v-for", "v-loop", "forEach in html"], ans: 0 } },
  vue_04_events: { track: "vue", title: "Vue 04｜事件處理與表單綁定", desc: "學會 `@click` 與 `v-model`。", concept: "`v-model` 讓表單值與資料雙向同步，效率高。", practice: "輸入名字後即時顯示歡迎詞。", code: `<div id=\"app\">\n  <input v-model=\"name\" placeholder=\"輸入名字\">\n  <p>你好，{{ name || '學員' }}</p>\n</div>\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.prod.js\"></script>\n<script>Vue.createApp({data(){return{name:''}}}).mount('#app')<\/script>`, tip: "表單頁面幾乎都會用到 `v-model`。", quiz: { q: "雙向綁定指令是？", opts: ["v-model", "v-bind", "v-set"], ans: 0 } },
  vue_05_computed_watch: { track: "vue", title: "Vue 05｜computed 與 watch", desc: "分清「衍生值」與「副作用監聽」。", concept: "computed 給畫面用、watch 處理副作用（例如呼叫 API）。", practice: "新增 fullName computed。", code: `<div id=\"app\">{{ fullName }}</div>\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.prod.js\"></script>\n<script>\nVue.createApp({\n  data(){ return { first:'Bill', last:'Huang' }; },\n  computed:{ fullName(){ return this.first + ' ' + this.last; } }\n}).mount('#app');\n<\/script>`, tip: "可計算且可快取的值優先 computed。", quiz: { q: "衍生資料優先用？", opts: ["computed", "watch", "methods 亂算"], ans: 0 } },
  vue_06_components: { track: "vue", title: "Vue 06｜元件化基礎", desc: "把重複 UI 抽成元件，提升重用。", concept: "元件是可組裝積木：可配置、可重複、可測試。", practice: "建立一個 `info-card` 元件。", code: `<div id=\"app\"><info-card title=\"課程提醒\"></info-card></div>\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.prod.js\"></script>\n<script>\nconst app = Vue.createApp({});\napp.component('info-card', { props:['title'], template:'<div style=\"padding:12px;border:1px solid #cbd5e1;border-radius:10px\">{{ title }}</div>' });\napp.mount('#app');\n<\/script>`, tip: "重複兩次以上的 UI 可考慮抽元件。", quiz: { q: "元件化主要好處？", opts: ["重用與維護性", "檔案變更多", "只能做樣式"], ans: 0 } },
  vue_07_props_emit: { track: "vue", title: "Vue 07｜props 與 emit 溝通", desc: "建立父子元件資料流。", concept: "父傳 props，子發 emit。資料流清楚，除錯更快。", practice: "子元件按按鈕通知父層 +1。", code: `<div id=\"app\"><child-counter @add=\"count++\"></child-counter><p>總數：{{count}}</p></div>\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.prod.js\"></script>\n<script>\nconst app = Vue.createApp({ data(){ return { count:0 }; } });\napp.component('child-counter',{ emits:['add'], template:'<button @click=\"$emit(\\'add\\')\">+1</button>' });\napp.mount('#app');\n<\/script>`, tip: "避免子元件直接改父層資料。", quiz: { q: "子通知父最常用？", opts: ["emit", "直接改父變數", "window 全域"], ans: 0 } },
  vue_08_lifecycle: { track: "vue", title: "Vue 08｜生命週期與初始化", desc: "在正確時機做初始化、清理與監聽。", concept: "mounted 取 DOM 或打 API；unmounted 做清理。", practice: "在 mounted 顯示初始化訊息。", code: `<div id=\"app\">{{ msg }}</div>\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.prod.js\"></script>\n<script>\nVue.createApp({\n  data(){return{msg:'載入中...'}},\n  mounted(){ this.msg = 'mounted 完成'; }\n}).mount('#app');\n<\/script>`, tip: "避免在錯誤生命週期操作 DOM。", quiz: { q: "元件掛載完成常用鉤子？", opts: ["mounted", "createdOnly", "onrender"], ans: 0 } },
  vue_09_router: { track: "vue", title: "Vue 09｜路由觀念與頁面切換", desc: "理解 SPA 路由與多頁邏輯差異。", concept: "Router 負責 URL 對應頁面元件，讓前端具備應用級導航。", practice: "先用條件渲染模擬兩頁切換。", code: `<div id=\"app\">\n  <button @click=\"page='home'\">Home</button>\n  <button @click=\"page='about'\">About</button>\n  <p v-if=\"page==='home'\">首頁內容</p>\n  <p v-else>關於頁內容</p>\n</div>\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.prod.js\"></script>\n<script>Vue.createApp({data(){return{page:'home'}}}).mount('#app')<\/script>`, tip: "先懂路由思維，再上 vue-router API。", quiz: { q: "SPA 導航核心是？", opts: ["路由映射元件", "每次整頁刷新", "只改 CSS"], ans: 0 } },
  vue_10_state: { track: "vue", title: "Vue 10｜狀態管理入門", desc: "掌握小型全域狀態思維。", concept: "共用資料集中管理，可避免跨層傳值地獄。", practice: "建立簡單 reactive store。", code: `<div id=\"app\"><p>購物車：{{store.count}}</p><button @click=\"store.count++\">加一</button></div>\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.prod.js\"></script>\n<script>\nconst store = Vue.reactive({ count: 0 });\nVue.createApp({ data(){ return { store }; } }).mount('#app');\n<\/script>`, tip: "先會小型 store，再學 Pinia。", quiz: { q: "共用狀態集中管理的好處？", opts: ["避免資料散落", "讓耦合更高", "不能除錯"], ans: 0 } },
  vue_11_async: { track: "vue", title: "Vue 11｜非同步資料與錯誤處理", desc: "把 API 載入流程寫完整：loading/success/error。", concept: "可交付頁面一定要有 loading 與錯誤狀態，不只成功狀態。", practice: "串接 API 並顯示三態。", code: `<div id=\"app\">\n  <button @click=\"load\">載入</button>\n  <p v-if=\"loading\">Loading...</p>\n  <p v-else-if=\"error\">{{ error }}</p>\n  <p v-else>{{ title }}</p>\n</div>\n<script src=\"https://unpkg.com/vue@3/dist/vue.global.prod.js\"></script>\n<script>\nVue.createApp({\n  data(){ return { loading:false, error:'', title:'' }; },\n  methods:{ async load(){ try{ this.loading=true; this.error=''; const r=await fetch('https://jsonplaceholder.typicode.com/posts/1'); const d=await r.json(); this.title=d.title; }catch(e){ this.error='載入失敗'; }finally{ this.loading=false; } } }\n}).mount('#app');\n<\/script>`, tip: "API 流程請固定寫 try/catch/finally。", quiz: { q: "可交付非同步流程至少要有？", opts: ["loading + error + success", "只有 success", "只有 console"], ans: 0 } },
  vue_00_preface: { track: "vue", sandbox: false, staticPreview: false, title: "Vue 00｜前言：版本差異先釐清", desc: "開始 Vue 前，先懂 Vue2 / Vue3 差異與學習路線。", concept: "Vue2 常見於維護案；Vue3 是新案主流。<br>差異重點：<br>1) Vue3 效能更好<br>2) Composition API 可重用邏輯<br>3) 生態常見 Vite + Pinia", practice: "先判斷你的目標：舊案維護 or 新案開發，寫下你要走哪條主線。", code: `<div style=\"line-height:1.8\">\n  <h3>Vue 版本快速判讀</h3>\n  <ul>\n    <li><strong>舊專案維護：</strong>Vue 2 + Options API 常見</li>\n    <li><strong>新專案開發：</strong>Vue 3 + Composition API 建議</li>\n  </ul>\n  <p>先把 Vue 3 主線學穩，再補 Vue 2 維護差異。</p>\n</div>`, tip: "先固定版本再學，速度會快很多。", newbieTip: "不要同時混學兩個版本，先攻 Vue3 主線。", commonMistakes: "把 Vue2 與 Vue3 語法混寫，導致範例跑不起來。", submissionStandard: "1) 能說出 Vue2/3 三個差異\n2) 能判斷你的專案版本路線\n3) 已完成學習路線選擇", quiz: { q: "新專案主流建議版本？", opts: ["Vue 3", "Vue 1", "隨機都可"], ans: 0 } },
  vue_12_master_composable: { track: "vue", title: "Vue 12｜大師關：Composable 與實戰架構", desc: "把邏輯抽成可重用函式，建立中大型專案基礎。", concept: "Composable 讓邏輯重用不依賴單一元件，測試與擴充更簡單。", practice: "列出你專案可抽離的 3 個 composable。", code: `<pre style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:10px">function useCounter(){\n  const count = Vue.ref(0)\n  const inc = () => count.value++\n  return { count, inc }\n}</pre>\n<p>下一步：把 API、表單驗證、權限檢查都抽成 composable。</p>`, tip: "會拆 composable，就進入 Vue 真正工程實戰。", quiz: { q: "Composable 的核心價值？", opts: ["邏輯可重用", "只為了縮短檔名", "取代所有元件"], ans: 0 } },
  git_00_environment: { track: "git", title: "Git 00｜在哪裡執行？環境與工具", desc: "學指令前，先裝好 Git、知道去哪裡打字下指令，以及 GUI 怎麼輔助。", concept: "<b>Git 是什麼？</b> 裝在你電腦上的版本控制程式；<b>GitHub/GitLab</b> 是放遠端備份與協作的網站，兩者不同但常一起用。<br><br><b>指令要在哪裡打？（擇一即可）</b><br>1. <b>VS Code / Cursor 內建終端機</b>：選單 Terminal → New Terminal，下方出現命令列，在專案資料夾執行 git<br>2. <b>Windows Terminal / PowerShell / 命令提示字元</b>：先 <code>cd 你的專案路徑</code> 再下 git<br>3. <b>Git Bash</b>（安裝 Git for Windows 時可選）：類 Unix 指令環境，路徑寫法與教學一致<br><br><b>安裝</b>：到 git-scm.com 下載 Git for Windows，安裝後在終端機輸入 <code>git --version</code> 應顯示版本號。<br><br><b>不想全打指令？可用 GUI 輔助</b><br>• VS Code 左側「原始檔控制」圖示：看變更、暫存、commit<br>• GitHub Desktop：圖形化 clone / commit / push，適合初學建立習慣<br>• SourceTree、Fork 等：進階視覺化分支管理<br><br>建議：<b>指令要會基礎</b>（status / add / commit / push），GUI 用來加速日常；面試與除錯仍常見終端機。",
    practice: "① 安裝 Git 並在終端機執行 git --version ② 用 cd 進入你的作品集資料夾 ③ 開 VS Code 原始檔控制面板，對照本課概念認識按鈕 ④ 下一課開始在「專案根目錄」執行 git init",
    code: `<style>pre{background:#0f172a;color:#a5f3fc;padding:14px;border-radius:10px;font-size:13px;line-height:1.7;overflow:auto}.cm{color:#94a3b8}.ok{color:#86efac}</style>\n<p style="font-family:system-ui;color:#475569;line-height:1.7">在終端機依序試（路徑改成你的）：</p>\n<pre><span class="cm"># 確認已安裝</span>\n<span class="ok">git --version</span>\n\n<span class="cm"># 進入專案（Windows 範例）</span>\n<span class="ok">cd C:\\Users\\你\\Documents\\my-portfolio</span>\n\n<span class="cm"># 之後課程會在這裡執行</span>\n<span class="ok">git status</span></pre>\n<p style="font-size:13px;color:#64748b">若顯示「不是內部或外部命令」，代表 Git 尚未安裝或未加入 PATH。</p>`,
    tip: "所有 git 指令都應在「含有 .html 專案檔」的那個資料夾執行，不要在錯的目錄 init。",
    newbieTip: "第一次請用 Terminal 在專案根目錄操作；不要在一個個子資料夾裡 git init。",
    commonMistakes: "沒裝 Git 就照抄指令；在桌面隨便開終端機卻沒 cd 到專案；以為 GitHub 網頁上傳檔案就等於學會 Git。",
    submissionStandard: "1) git --version 有版本號\n2) 能說出兩種執行環境（終端機 + 任一 GUI）\n3) 已 cd 到作品集資料夾並截圖或口述路徑",
    quiz: { q: "git commit 前，終端機應在？", opts: ["專案根目錄（含你的原始碼）", "任何資料夾都可", "只能 C:\\ 根目錄"], ans: 0 } },
  git_01_intro: { track: "git", title: "Git 01｜版本控制核心觀念", desc: "先搞懂 Git 在團隊協作中的角色，再在專案根目錄建立第一個 repo。", concept: "Git 不是備份工具而已，而是可追蹤、可回溯、可審查的開發記錄系統。每個 commit 像遊戲存檔，可隨時回到某個時間點。<br><br><b>本地 vs 遠端</b>：你電腦上的 .git 資料夾是本地倉庫；push 到 GitHub 後，團隊才能看到並開 PR。", practice: "在上一課確認的專案資料夾執行：git init → git add . → git commit。若已有 .git 可改做 git status 觀察。", code: `<pre style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:10px;line-height:1.7">git init\ngit status\ngit add .\ngit commit -m "chore: initial commit"</pre>`, tip: "每次 commit 都要可讀、可回滾；訊息用英文或中文皆可，但要說清楚「這次完成什麼」。", newbieTip: "把 commit 想成「可交付的最小里程碑」，不要一次塞太多改動。", commonMistakes: "常見錯誤是超大 commit，或在錯誤資料夾 init 導致追蹤到不相關檔案。", submissionStandard: "1) 本地 repo 初始化成功\n2) 完成第一個可讀 commit\n3) 能解釋 commit 為何切這個粒度", quiz: { q: "Git 最核心價值是？", opts: ["可追蹤與回溯", "取代編輯器", "自動寫程式"], ans: 0 } },
  git_02_status_add_commit: { track: "git", title: "Git 02｜status/add/commit 日常循環", desc: "掌握每天最常用的三個指令。", concept: "先看狀態，再選擇性加入，再提交，形成穩定節奏。", practice: "修改一個檔案後走完整流程。", code: `<pre style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:10px">git status\ngit add src/app.js\ngit commit -m "feat: update lesson switch flow"</pre>`, tip: "commit message 要寫 why，不只寫 what。", quiz: { q: "提交前先看什麼？", opts: ["git status", "git push", "git reset"], ans: 0 } },
  git_03_branching: { track: "git", title: "Git 03｜分支策略與命名規範", desc: "學會 feature branch 工作流。", concept: "main 保持穩定，功能在獨立分支開發，完成再合併。", practice: "建立 feature 分支並切換。", code: `<pre style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:10px">git switch -c feature/tutorial-git-tab\ngit branch</pre>`, tip: "分支名建議：feat/*、fix/*、chore/*。", quiz: { q: "新功能建議直接改 main 嗎？", opts: ["不建議", "建議", "看運氣"], ans: 0 } },
  git_04_merge_rebase: { track: "git", title: "Git 04｜merge 與 rebase 何時用", desc: "理解兩種整合歷史策略。", concept: "merge 保留分支脈絡，rebase 讓歷史更線性。", practice: "用 merge 完成一次分支整合。", code: `<pre style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:10px">git switch main\ngit merge feature/tutorial-git-tab</pre>`, tip: "團隊沒統一前，先用 merge 最安全。", quiz: { q: "保留分支脈絡常用？", opts: ["merge", "rebase -i", "cherry-pick"], ans: 0 } },
  git_05_conflict: { track: "git", title: "Git 05｜衝突處理與安全回滾", desc: "學會解衝突與回到安全版本。", concept: "衝突本質是同一區塊被不同提交改動，需人工決策。", practice: "模擬衝突後完成解決與 commit。", code: `<pre style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:10px">git status\n# 編輯衝突標記 <<<<<<< ======= >>>>>>>\ngit add .\ngit commit -m "fix: resolve merge conflict"</pre>`, tip: "先理解兩邊改動再解，不要無腦全選。", quiz: { q: "衝突解完下一步？", opts: ["git add + git commit", "直接關閉 IDE", "git init"], ans: 0 } },
  git_06_remote_pr: { track: "git", title: "Git 06｜Remote 與 Pull Request", desc: "把本地分支推上遠端並建立 PR。", concept: "PR 是協作審查核心，讓改動有討論與品質把關。", practice: "push 分支後建立 PR（可用 gh）。", code: `<pre style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:10px">git push -u origin feature/tutorial-git-tab\n# gh pr create --title \"...\" --body \"...\"</pre>`, tip: "PR 描述要寫摘要與測試方式。", quiz: { q: "PR 主要目的是？", opts: ["審查與協作", "清除歷史", "部署資料庫"], ans: 0 } },
  git_07_revert_cherry_pick: { track: "git", title: "Git 07｜revert 與 cherry-pick", desc: "精準回退或搬運單一提交。", concept: "revert 建立反向 commit；cherry-pick 把特定 commit 套到另一分支。", practice: "列出 commit 後挑一個做 cherry-pick（練習用）。", code: `<pre style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:10px">git log --oneline\ngit cherry-pick <commit>\n# 或 git revert <commit></pre>`, tip: "操作前先確認當前分支與目標分支。", quiz: { q: "想撤銷已推送 commit 較安全用？", opts: ["git revert", "git reset --hard + force", "刪 repo"], ans: 0 } },
  git_08_master_release: { track: "git", title: "Git 08｜大師關：發布節奏與標籤", desc: "建立可交付的 release 流程。", concept: "用 tag 標記版本，搭配 changelog 形成可追蹤交付。", practice: "建立 v1.0.0 tag 並推送。", code: `<pre style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:10px">git tag v1.0.0\ngit push origin v1.0.0</pre>`, tip: "重要發布一定要有版本標籤。", newbieTip: "把 release 當「可被他人驗收」的節點，而不只是你本機完成。", commonMistakes: "沒有 tag、沒有 changelog，導致無法追查哪版修了什麼。", submissionStandard: "1) 建立並推送 tag\n2) 撰寫版本說明\n3) 能說明回滾方案", quiz: { q: "標記正式版本常用？", opts: ["git tag", "git note", "git stash"], ans: 0 } },
  git_09_mixed_team_handoff: {
    track: "git",
    title: "Git 09｜團隊有人沒裝 Git？兩種設計交接",
    desc: "設計師可能只改視覺，也可能要套版動 HTML。先分清情境，再決定可改範圍與備份節奏。",
    concept: "<b>現實狀況</b>：你負責前端與 Git；設計師／切版師常沒裝 Git，用 zip 或雲端交件。<b>先問清楚屬於哪一種</b>，交接規則差很多——不要一律只准改 CSS。<br><br><h3 class=\"tuto-h3\">情境 A｜視覺補強（做圖、調色、換素材）</h3><p><b>典型工作</b>：Figma／PS 定稿後，只調 <code>css/</code>、<code>images/</code>，<b>盡量不動 HTML 結構</b>（class 名稱也先別改）。</p><ul class=\"tuto-list\"><li><b>可改</b>：色票、字級、背景圖、icon、間距（CSS）</li><li><b>勿改</b>：nav 結構、表單欄位、script 引用順序</li><li><b>第一次備份</b>：<code>git commit -m \"feat: layout v1 — visual handoff\"</code> + tag <code>handoff-visual-v1</code></li><li><b>第二次備份</b>：收回後 <code>git commit -m \"design: visual pass from 設計師名\"</code></li></ul><h3 class=\"tuto-h3\">情境 B｜套版／切版（會動 HTML）</h3><p><b>典型工作</b>：把設計稿「套進」版型——新增區塊、改 markup、切多頁 <code>*.html</code>，常見於活動頁、Landing、電商列表頁。</p><ul class=\"tuto-list\"><li><b>可改</b>：HTML 結構、新增頁面、切圖檔名（需對照清單）</li><li><b>需約定</b>：語意標籤（h1 唯一）、class 命名規則、相對路徑、共用 header/footer 怎麼 include（或你提供 partial 範本）</li><li><b>第一次備份</b>：你先把「骨架版」commit + tag <code>handoff-slice-v1</code>，附 <b>套版說明</b>（哪些頁必做、RWD 斷點、不可刪的 JS hook）</li><li><b>第二次備份</b>：收回整包後 <b>必開分支</b> <code>intake/slice-v2</code>，逐頁 diff HTML，驗收通過再 merge</li></ul><p><b>套版收回多檢查</b>：連結是否 404、圖片路徑、重複 id、inline style 氾濫、手機是否爆版。</p><h3 class=\"tuto-h3\">共通五步（兩種都要）</h3>① 交出前 commit + tag + zip ② 書面寫清「情境 A 或 B」與可改範圍 ③ 對方回傳 zip + 改動清單 ④ 你比對 diff，勿直接蓋 main ⑤ 驗收後第二次 commit<br><br><h3 class=\"tuto-h3\">沒 Git 的成員怎麼配合？</h3>• Zip 命名：<code>project-visual-v2.zip</code> 或 <code>project-slice-v2.zip</code>（類型寫進檔名）<br>• 雲端可傳檔，但<b>以你的 Git commit 為準</b><br>• 套版案可請對方用 Dreamweaver／VS Code 改檔，但仍由你收進 repo<br><br><h3 class=\"tuto-h3\">溝通話術（可複製）</h3><p><b>📤 情境 A 交出</b>：「layout v1 在 tag handoff-visual-v1。請只改 css／images，HTML 結構勿動，回傳 v2 並列改動檔。」</p><p><b>📤 情境 B 交出</b>：「骨架與共用 nav 在 tag handoff-slice-v1，附套版清單（3 頁 + RWD）。可改 HTML，但 class 請用 .c- 前綴、路徑用相對路徑，回傳 v2 整包 + 改動頁面列表。」</p><p><b>📥 收回（共通）</b>：「收到 v2，我會比對後 commit；若結構或 RWD 有問題，會 revert 到 v1 請修 v3。」</p>",
    practice: "① 假想一個「只改 CSS」與一個「要套 3 頁 HTML」的案子，各寫 3 行交接訊息 ② 對專案做 v1 commit + tag ③ 用 git diff 比對「設計師回傳」④ 說明 A、B 兩案第二次 commit 訊息該怎麼寫",
    code: `<style>\n  .flow{font-family:system-ui;line-height:1.65;color:#334155;max-width:42em}\n  .cols{display:grid;gap:12px;margin:12px 0}\n  @media(min-width:640px){.cols{grid-template-columns:1fr 1fr}}\n  .card{border:1px solid #e2e8f0;border-radius:12px;padding:12px;background:#fff}\n  .card-a{border-top:4px solid #a855f7}\n  .card-b{border-top:4px solid #0ea5e9}\n  .card h4{margin:0 0 8px;font-size:14px}\n  .card ul{margin:0;padding-left:1.1em;font-size:13px;line-height:1.55}\n  .step{border-left:4px solid #7c3aed;padding:8px 10px;margin:10px 0;background:#faf5ff;border-radius:0 8px 8px 0;font-size:13px}\n  pre{background:#0f172a;color:#a5f3fc;padding:12px;border-radius:10px;font-size:12px;line-height:1.7;overflow:auto;margin:10px 0 0}\n</style>\n<div class="flow">\n  <div class="cols">\n    <div class="card card-a"><h4>🎨 情境 A｜視覺補強</h4><ul><li>改 css / 圖</li><li>HTML 尽量不動</li><li>tag: handoff-visual-v1</li></ul></div>\n    <div class="card card-b"><h4>📄 情境 B｜套版切版</h4><ul><li>可改 html 結構</li><li>附套版頁面清單</li><li>tag: handoff-slice-v1</li></ul></div>\n  </div>\n  <div class="step"><b>你</b> v1 commit + tag → zip → 註明 A 或 B</div>\n  <div class="step"><b>設計師</b> 回傳 v2 zip + 改動清單（套版案加「改了哪些 html」）</div>\n  <div class="step"><b>你</b> intake 分支 diff → 驗收 RWD／連結 → 第二次 commit → merge</div>\n  <pre># 視覺案\ngit tag handoff-visual-v1\ngit commit -m "design: visual pass from 設計師名"\n\n# 套版案\ngit tag handoff-slice-v1\ngit switch -c intake/slice-v2\n# 逐頁 diff *.html\ngit commit -m "slice: markup from 切版師名 — home, about, contact"</pre>\n</div>`,
    tip: "開案先問：「這次只調視覺，還是要套版動 HTML？」寫進 tag 與 zip 檔名，日後才不會搞混。",
    newbieTip: "套版案（B）收回時一定要逐頁開瀏覽器預覽；只看 zip 檔名很容易漏掉壞掉的連結。",
    commonMistakes: "套版案卻只准改 CSS 導致來回重工；或視覺案讓設計師改 HTML 結構把 JS 弄壞；兩種都沒 v1 備份就交出去。",
    submissionStandard: "1) 能區分 A/B 並寫出對應交接訊息\n2) 有 v1 tag + intake 分支 + 第二次 commit\n3) 套版案能說出 HTML 收回要檢查哪 3 項",
    quiz: { q: "設計師要把 Figma 套成 5 頁 HTML，屬於？", opts: ["情境 B 套版（可動 HTML）", "情境 A 只改 CSS", "不用備份"], ans: 0 }
  },

  jq_00_cdn_setup: { track: "jquery", title: "jQuery 00｜如何載入與在哪執行", desc: "jQuery 在瀏覽器執行，需先載入 JS 檔再寫你的程式。", concept: "<b>CDN（最常見）</b>：<code>&lt;script src=\"https://code.jquery.com/jquery-3.7.1.min.js\"&gt;&lt;/script&gt;</code> 放在你的 script 之前。<br><b>本機檔</b>：<code>js/jquery.min.js</code> 路徑注意相對位置。<br><b>npm</b>：現代打包專案用 <code>npm install jquery</code> + import，舊站維護多見 CDN。<br>執行環境：瀏覽器 + F12 Console；$ 就是 jQuery 入口。", practice: "① 確認 script 順序 ② 在 Console 輸入 typeof $ 應為 function", code: `<p id="ok">尚未測試</p>\n<script src="https://code.jquery.com/jquery-3.7.1.min.js"><\/script>\n<script>\n  if (typeof window.jQuery === "function") {\n    document.getElementById("ok").textContent = "jQuery " + jQuery.fn.jquery + " 已載入";\n  }\n<\/script>`, tip: "script 順序錯誤會出現 $ is not defined。", quiz: { q: "jQuery 在哪執行？", opts: ["瀏覽器", "MySQL", "Git"], ans: 0 } },
  vue_13_vite_tooling: { track: "vue", title: "Vue 13｜Vite 工具鏈與單檔元件", desc: "新專案幾乎都用 Vite 建立，理解 .vue 檔與 npm run dev。", concept: "<b>建立專案</b>：<code>npm create vue@latest</code>（官方推薦）→ 選 TypeScript/ Router 等 → <code>cd 專案 && npm install && npm run dev</code><br><b>.vue 檔</b>：template + script + style 同一檔，元件化開發。<br><b>與 CDN 版差異</b>：本課前面用 CDN 是教學；正式開發用 Vite 熱更新、打包。<br>文件：<a href=\"https://vuejs.org\" target=\"_blank\" rel=\"noopener\">vuejs.org</a>", practice: "① 瀏覽器開 vuejs.org 文件 ② 規劃你是否要開 Vite 專案練習", code: `<div style="font-family:system-ui;line-height:1.7;color:#334155;max-width:34em">\n  <p><strong>教學用：</strong> CDN + createApp（本手冊前幾課）</p>\n  <p><strong>工程用：</strong> Vite + .vue + npm run dev / build</p>\n</div>`, tip: "作品集若只有靜態頁可先不強求 Vite；要徵才 Vue 職再深入。", quiz: { q: "Vue 新專案常見開發伺服器？", opts: ["npm run dev (Vite)", "雙擊 index.html 就夠", "只用 jQuery"], ans: 0 } },

  deploy_01_preflight: { track: "deploy", title: "上線 01｜上線前檢查清單", desc: "部署不是按一個鈕就好——先在本機與檢查清單把品質顧好，上線才省時間。", concept: "<b>內容與結構</b>：每頁有唯一 h1、圖片有 alt、連結可點、表單有 label。<br><b>檔案與路徑</b>：css/js/images 皆已上傳；子頁面 ../ 正確；無本機絕對路徑 C:\\Users\\...<br><b>RWD</b>：375 / 768 / 1280 三種寬度無橫向捲軸爆版。<br><b>效能</b>：圖片壓縮或適當 w= 參數、loading=\"lazy\" 視情況加入。<br><b>安全</b>：.env、密碼、API key 不可進 repo（寫入 .gitignore）。<br><b>SEO 基礎</b>：&lt;title&gt;、meta description、語意標籤。",
    practice: "① 印出或複製下方清單，逐項勾選你的作品集 ② 用 Chrome 裝置模擬器測手機 ③ 修正後再做 git commit「chore: pre-deploy checklist」",
    code: `<style>body{font-family:system-ui;line-height:1.65;color:#334155;max-width:32em} ul{padding-left:1.2em} li{margin:6px 0}</style>\n<h3>上線前 10 項（建議全勾）</h3>\n<ul>\n  <li>index.html 為入口，首頁可開</li>\n  <li>所有 CSS/JS 在 Network 無 404</li>\n  <li>手機寬度無橫向爆版</li>\n  <li>圖片有 alt、連結有清楚文字</li>\n  <li>無 file:// 或本機絕對路徑</li>\n  <li>已移除測試用 alert / console 雜訊</li>\n  <li>.gitignore 排除 .env</li>\n  <li>分頁 title 有意義</li>\n  <li>主要 CTA 可點、可聚焦（Tab）</li>\n  <li>與導師/朋友用無痕視窗試開</li>\n</ul>`,
    tip: "檢查清單請在「第一次部署前」就做，不要等上線後才發現全站沒樣式。",
    newbieTip: "最不穩的是「路徑」與「漏檔」——請回顧 HTML 分頁的檔案路徑課。",
    commonMistakes: "只在本機預覽成功就上線；手機沒測；忘記上傳 images 資料夾。",
    submissionStandard: "1) 10 項中至少完成 8 項勾選\n2) 列出你修正的 2 個問題\n3) 已 commit 一版「上線前整理」",
    quiz: { q: "上線前最先該確認？", opts: ["資源路徑無 404", "動畫越多越好", "只用桌機測一次"], ans: 0 } },
  deploy_02_github_pages: { track: "deploy", title: "上線 02｜GitHub Pages 逐步部署", desc: "把靜態作品集放到 GitHub Pages，取得可分享的 https 網址。", concept: "<b>流程概覽</b><br>1. 在 GitHub 建立 repository（建議公開）<br>2. 本地 git init → add → commit → 綁定 remote → push<br>3. Repo Settings → Pages → Source 選 main 分支 / root（或 /docs）<br>4. 等 1～3 分鐘，開啟 https://&lt;user&gt;.github.io/&lt;repo&gt;/<br><br><b>子路徑注意</b>：若網址是 username.github.io/my-repo/，專案內連結可能要加前綴或改用相對路徑，避免點連結跳到錯誤根目錄。<br><br><b>自訂網域</b>（選修）：Settings → Pages → Custom domain，並在 DNS 加 CNAME。",
    practice: "① 建立 GitHub repo ② 本地 push ③ 開啟 Pages ④ 用手機開正式網址 ⑤ 點 3 個內部連結確認沒 404",
    code: `<pre style="background:#0f172a;color:#a5f3fc;padding:14px;border-radius:10px;font-size:13px;line-height:1.75">git remote add origin https://github.com/你的帳號/你的repo.git\ngit branch -M main\ngit push -u origin main\n\n<span style="color:#94a3b8"># 然後到 GitHub → Settings → Pages → Deploy from branch: main / root</span></pre>\n<p style="font-family:system-ui;color:#475569;font-size:14px">成功後網址會顯示在 Pages 設定頁綠色區塊。</p>`,
    tip: "第一次 push 若要求登入，可用 GitHub Desktop 或 Personal Access Token。",
    quiz: { q: "GitHub Pages 靜態站入口檔？", opts: ["index.html", "README.md 單獨即可", "package.json"], ans: 0 } },
  deploy_03_netlify_vercel: { track: "deploy", title: "上線 03｜Netlify / Vercel 快速部署", desc: "不綁定 GitHub 也能拖曳上傳；連動 Git 則每次 push 自動更新。", concept: "<b>Netlify</b>：註冊 → Add new site → Deploy manually（拖資料夾）或 Import from Git。Publish directory 通常填根目錄 <code>/</code> 或 <code>dist</code>（若你有建置步驟）。<br><b>Vercel</b>：Import Git Repository → Framework Preset 選 Other / 靜態 → Build 可留空，Output 為根目錄。<br><br><b>何時選？</b> 要預覽 PR、表單、重導向規則時 Netlify 很方便；已用 GitHub 且要極簡，Pages 就夠。兩家都提供免費 HTTPS。<br><br><b>環境變數</b>：若日後有 API key，在平台後台設 Environment Variables，不要寫進前端原始碼。",
    practice: "① 選 Netlify 或 Vercel 註冊 ② 部署同一包作品集 ③ 比較與 GitHub Pages 網址差異 ④ 記下「重新部署」要按哪裡",
    code: `<style>body{font-family:system-ui;line-height:1.7;color:#334155;max-width:36em} .box{border:1px solid #e2e8f0;border-radius:12px;padding:12px;margin:12px 0;background:#f8fafc;font-size:14px}</style>\n<div class="box"><strong>Netlify 手動部署</strong><br>Build command：（留空）<br>Publish directory：./</div>\n<div class="box"><strong>Vercel 靜態匯入</strong><br>Framework：Other<br>Root Directory：./</div>\n<p>部署完成後用「Preview URL」分享給老師驗收。</p>`,
    tip: "改檔後要「重新 deploy」或 push 才會更新；瀏覽器可強制重新整理 Ctrl+F5。",
    quiz: { q: "Netlify 手動部署時 Publish directory 常設？", opts: ["專案根目錄（含 index.html）", "只選一張圖", "node_modules"], ans: 0 } },
  deploy_04_ftp_troubleshoot: { track: "deploy", title: "上線 04｜FTP 主機與常見故障排除", desc: "公司或學校主機常見 FTP/cPanel；學會上傳結構與排除 404、亂碼、快取。", concept: "<b>FTP 上傳</b>：用 FileZilla 等連線主機 → 本機整包拖到 public_html（或 wwwroot）→ 保持資料夾結構不變。<br><b>路徑</b>：網域根目錄對應 index.html；子目錄 about/ 要放 about/index.html 或 about.html 並注意連結。<br><br><b>故障對照</b><br>• 全站無樣式 → css 路徑錯或 css 沒上傳<br>• 中文亂碼 → 缺 &lt;meta charset=\"UTF-8\"&gt;<br>• 圖片破圖 → 大小寫不一致（Photo.jpg vs photo.jpg）<br>• 改了沒變 → CDN/瀏覽器快取，強制重新整理或清快取<br>• 404 → 檔名打錯、漏傳、或伺服器未設預設頁",
    practice: "① 對照故障表，故意改錯一個 css 路徑再修正 ② 用 F12 Network 找第一個紅色請求 ③ 寫下你的作品集若上 FTP 要傳哪些資料夾",
    code: `<style>body{font-family:system-ui;font-size:14px;line-height:1.65;color:#334155} table{border-collapse:collapse;width:100%} th,td{border:1px solid #e2e8f0;padding:8px} th{background:#f1f5f9;text-align:left}</style>\n<table>\n  <tr><th>現象</th><th>優先檢查</th></tr>\n  <tr><td>白屏無樣式</td><td>css href、是否上傳 css/</td></tr>\n  <tr><td>破圖</td><td>src 路徑、檔名大小寫</td></tr>\n  <tr><td>亂碼</td><td>UTF-8 meta</td></tr>\n  <tr><td>舊版內容</td><td>快取、是否傳到正確目錄</td></tr>\n</table>`,
    tip: "上傳後第一件事：開無痕視窗 + Network 看有無 404。",
    quiz: { q: "Linux 主機上 Photo.jpg 與 photo.jpg？", opts: ["視為不同檔案", "視為相同", "自動合併"], ans: 0 } },
  deploy_05_post_launch: { track: "deploy", title: "上線 05｜上線後驗收與維護", desc: "上線是開始不是結束：驗收、監測、小改版與回滾策略。", concept: "<b>驗收（24 小時內）</b>：桌機/手機各測、請他人代點、檢查表單與外連。<br><b>維護節奏</b>：小改 → git commit → push → 等平台自動部署或手動 redeploy。<br><b>回滾</b>：Git 用 revert 或回到上一個 tag；Netlify/Vercel 後台可選先前 deploy 一鍵還原。<br><b>紀錄</b>：README 寫專案說明、截圖、技術棧；履歷附上正式網址。<br><b>進階（選修）</b>：Google Search Console 提交 sitemap、簡單 Analytics。",
    practice: "① 填寫「上線驗收表」：網址、測試日期、測過裝置、已知問題 ② 規劃下週一個小改版並走 git 流程 ③ 進入畢業專題課整合品牌頁",
    code: `<style>body{font-family:system-ui;line-height:1.8;color:#334155;max-width:34em;font-size:14px} h3{color:#4338ca;margin:0 0 8px}</style>\n<h3>上線驗收表（範本）</h3>\n<p>正式網址：________________<br>部署平台：________________<br>手機測試：□ iOS □ Android<br>桌機測試：□ Chrome □ Edge<br>已知待修：________________</p>\n<p>下個版本 v1.0.1 預計：________________</p>`,
    tip: "把「可公開的網址」寫進履歷與作品集封面，比只交 zip 更有說服力。",
    newbieTip: "上線後若朋友說「看不到」，先問他用的是不是你的正式網址，而不是本機路徑。",
    commonMistakes: "上線後從不更新；或沒用 Git 記錄，改壞了無法還原。",
    submissionStandard: "1) 填完驗收表\n2) 網址可公開開啟\n3) 規劃下一版 commit 訊息",
    quiz: { q: "上線後小改動最安全習慣？", opts: ["Git commit 後再部署", "直接改伺服器不備份", "刪掉舊檔重傳覆蓋"], ans: 0 } }
};

const TUTORIAL_ORDER_BY_TRACK = {
  html: ["intro_welcome","html_learning_path","html_vs_css","intro_devtools","intro_files","html_skeleton","html_headings","html_inline","html_media","html_lists","html_list_details","html_description_list","html_div_span","html_tables","html_containers","html_head_seo","html_inputs","html_float_align_bg","html_button","html_form","html_nav"],
  css: ["css_selectors","css_external_import","css_colors","css_background_image","css_typography","css_spacing","work_units_rem","css_box_model","css_borders_outline","css_width_max_overflow","css_display","css_flexbox","css_grid","css_position","css_shadows","css_transitions","css_variables","css_pseudo","css_object_fit","css_flex_advanced","css_media_rwd","css_animation","css_zindex","css_specificity","work_flex_center","work_overflow","work_responsive_img"],
  tailwind: ["tw_00_intro","tw_01_utility_cdn","tw_02_cdn_vs_build","tw_03_npm_setup","tw_03b_next_project","tw_04_source_entry","tw_05_postcss_config","tw_06_build_watch","tw_07_tailwind_config","tw_08_link_site","tw_09_official_workflow","tw_10_utilities_hygiene"],
  js: ["intro_js_whatis","intro_js_roadmap","js_variables","js_conditionals","js_template_strings","js_loops_for","js_arrays","js_array_methods","js_objects","js_functions","js_events","js_dom","js_classlist","js_queryselector","js_arrow","js_async_await","js_try_catch","js_json","js_fetch","js_localstorage","js_timers","js_ecosystem","adv_ui_patterns","js_form_submit","work_devtools_network"],
  jquery: ["jq_00_cdn_setup","jq_01_intro","jq_02_selectors","jq_03_events","jq_04_dom","jq_05_effects","jq_06_ajax","jq_07_form","jq_08_components","jq_09_plugin","jq_10_performance","jq_11_architecture","jq_12_master_workflow"],
  vue: ["vue_00_preface","vue_01_intro","vue_02_template","vue_03_directives","vue_04_events","vue_05_computed_watch","vue_06_components","vue_07_props_emit","vue_08_lifecycle","vue_09_router","vue_10_state","vue_11_async","vue_12_master_composable","vue_13_vite_tooling"],
  git: ["git_00_environment","git_01_intro","git_02_status_add_commit","git_03_branching","git_04_merge_rebase","git_05_conflict","git_06_remote_pr","git_07_revert_cherry_pick","git_08_master_release","git_09_mixed_team_handoff","work_git"],
  deploy: ["deploy_01_preflight","deploy_02_github_pages","deploy_03_netlify_vercel","deploy_04_ftp_troubleshoot","deploy_05_post_launch","master_deploy","master_capstone"]
};

if (typeof TUTORIAL_TAILWIND_LESSONS !== "undefined") {
  Object.assign(tutorialTrackRepository, TUTORIAL_TAILWIND_LESSONS);
}

