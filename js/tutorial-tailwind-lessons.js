/** Tailwind 路線：比官方更重「專案怎麼接起來」。由 tutorial-data.js 合併載入。 */
const TUTORIAL_TAILWIND_LESSONS = {
  tw_00_intro: {
    track: "tailwind",
    sandbox: false,
    title: "Tailwind 00｜是什麼、為何主流、學習地圖",
    desc: "先搞懂 CSS 框架與 Tailwind 的定位，再對照 Bootstrap 與本路線怎麼學。",
    concept: "<div class=\"tuto-callout-project\">🎯 <strong>本路線定位：</strong>比 <a class=\"tuto-ext-link\" href=\"https://tailwindcss.com/docs\">Tailwind 官方文件</a> 更偏重「<strong>專案怎麼接起來</strong>」— 安裝、建置、HTML 連動、除錯、class 過長怎麼辦。查語法用官方；查流程用本手冊。</div><p class=\"tuto-lead\">很多人口頭說「前端框架」，其實常混到兩種東西。這一課先把名詞講清楚，再說為什麼現在許多新專案選 Tailwind，以及它和早年 Bootstrap 的差別。</p><h3 class=\"tuto-h3\">先釐清：CSS 框架 ≠ JavaScript 框架</h3><ul class=\"tuto-list\"><li><strong>CSS 框架</strong>（本路線）：幫你<strong>長得快、長得一致</strong> — 例如 Tailwind、Bootstrap、Bulma。主要處理版面、顏色、間距、RWD。</li><li><strong>JavaScript 框架</strong>（手冊另開 Vue 等分頁）：幫你<strong>管理互動與資料</strong> — 例如 Vue、React。按鈕點了要換內容、表單送 API，多在這一層。</li></ul><p>靜態作品集可以只用 HTML + CSS 框架；要做 SPA、複雜狀態，才會再加上 Vue／React。兩者常一起用，但不是同一類東西。</p><h3 class=\"tuto-h3\">Tailwind 是什麼</h3><p>Tailwind 是 <strong>Utility-first 的 CSS 框架</strong>：把「padding 16px、圓角、藍色按鈕」拆成很多小 class，直接寫在 HTML 上，例如 <code>class=\"p-4 rounded-xl bg-indigo-600 text-white\"</code>，而不是先發明一個 <code>.btn-primary</code> 再在 CSS 檔裡寫十行規則。</p><h3 class=\"tuto-h3\">為什麼要用它</h3><ul class=\"tuto-list\"><li><strong>開發快</strong>：不用在 HTML 與 CSS 檔之間來回找 class 名稱</li><li><strong>設計一致</strong>：間距、色票、字級有固定刻度（design token 思維）</li><li><strong>RWD 直覺</strong>：<code>md:</code>、<code>lg:</code> 前綴就能做響應式</li><li><strong>建置後體積小</strong>：正式專案只打包「有用到的 class」（見後續 npm 課）</li></ul><h3 class=\"tuto-h3\">和早年 Bootstrap 比：為何現在很常選 Tailwind</h3><p>2010 年代 Bootstrap 是主流：內建 <code>.btn</code>、<code>.navbar</code>、<code>.row/.col</code>，長相偏「Bootstrap 味」，客製時常要覆寫很多預設樣式。</p><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>比較</th><th>Bootstrap（元件式）</th><th>Tailwind（工具類）</th></tr></thead><tbody><tr><td>寫法</td><td>用現成套件 class，長得像同一套 UI</td><td>用很多小 class 自己組出獨特版面</td></tr><tr><td>客製品牌感</td><td>要覆寫 SCSS 變數或蓋掉預設</td><td>從 class 組合開始就比較自由</td></tr><tr><td>檔案習慣</td><td>常下載整包 CSS／JS</td><td>鼓勵 build 只留用到的規則</td></tr><tr><td>學習曲線</td><td>記元件名稱即可上手</td><td>要熟悉 utility 命名，但查 <a href=\"https://tailwindcss.com/docs\">Docs</a> 即可</td></tr><tr><td>現況</td><td>仍大量用於後台、快速原型</td><td>新創、設計系統、與 Vue/React 專案很常見</td></tr></tbody></table></div><p>Bootstrap 沒有「過時到不能用」；差別在<strong>專案要不要高度客製、團隊是否習慣 utility</strong>。本手冊教 Tailwind，是因為它與現代 build 流程、設計刻度較貼近目前業界常見做法。</p><h3 class=\"tuto-h3\">和其他 CSS 方案一句話</h3><ul class=\"tuto-list\"><li><strong>自己寫 CSS</strong> — 最自由，專案一大難維護命名與重複</li><li><strong>Bootstrap / Bulma</strong> — 元件現成，適合要快、風格可接受套件的站</li><li><strong>Tailwind</strong> — 用 class 堆出設計，適合要品牌感、又想要開發速度</li></ul><h3 class=\"tuto-h3\">何時開始學、本路線怎麼走</h3><p>建議先會 HTML + 基礎 CSS（盒模型、Flex、RWD）。本路線順序：</p><ol class=\"tuto-list\"><li>CDN 體驗 class（01）</li><li>npm 安裝 → PostCSS → build／watch → 連 HTML（03～08）</li><li>常用類別與 class 過長整理（10）</li></ol><p><strong>三種接法</strong>：CDN（教學）／npm 建置（正式）／勿複製別人 node_modules。</p><p><strong>版本</strong>：以 Tailwind v3 + PostCSS 為主；v4 差異見第 09 課。</p>",
    practice: "① 用自己的話區分「CSS 框架」與「JS 框架」② 寫兩點 Tailwind 比 Bootstrap 適合你專案的理由 ③ 對照左側課表規劃本週要上到第幾課",
    code: "",
    tip: "Tailwind 加速排版，不取代 HTML／CSS 基礎與無障礙思維。",
    quiz: { q: "Tailwind 屬於哪一類？", opts: ["CSS 框架（排版與樣式）", "JavaScript 框架（資料與路由）", "資料庫"], ans: 0 }
  },
  tw_01_utility_cdn: {
    track: "tailwind",
    sandbox: true,
    title: "Tailwind 01｜CDN 體驗與常用類別",
    desc: "Play CDN 立刻試類別；沙盒可改 class 後按運行。",
    concept: "<p><b>CDN 寫法</b>（教學／原型，請整段貼在 <code>&lt;head&gt;</code> 或 body 最前）：</p><pre class=\"tuto-code-block\">&lt;script src=\"https://cdn.tailwindcss.com\"&gt;&lt;/script&gt;</pre><p>接著 HTML 直接寫類別，例如 <code>text-xl font-bold text-indigo-600 p-4 rounded-2xl bg-slate-50</code>。</p><p><b>常用類別速查</b>（詳細語法仍查 <a href=\"https://tailwindcss.com/docs\">官方 Docs</a>）：</p><ul class=\"tuto-list\"><li>間距：<code>p-4</code> <code>m-2</code> <code>mt-4</code> <code>gap-4</code></li><li>字級／字重：<code>text-sm</code> <code>text-2xl</code> <code>font-bold</code></li><li>顏色：<code>bg-slate-100</code> <code>text-indigo-600</code></li><li>版面：<code>flex</code> <code>items-center</code> <code>justify-between</code> <code>grid grid-cols-2</code></li><li>RWD：<code>md:text-2xl</code> <code>lg:grid-cols-3</code>（小螢幕無前綴，md 以上才套用）</li></ul><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">❓ 為什麼 CDN 不當正式站唯一方案</p><p>瀏覽器會載入接近「全量」的引擎，檔案大、載入慢，也較難做嚴格的主題與 purge。學習用 CDN 沒問題；要交作品、上線請走 npm 建置。</p></div><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">🚨 常見錯誤</p><ul class=\"tuto-list\"><li><b>畫面完全沒樣式</b> → script 沒載入、網址打錯、或 script 放在你的程式後面（應在寫 class 的 HTML 之前載入）</li><li><b>class 拼錯</b> → 官方 Docs 搜尋正確名稱（例如 <code>rounded-xl</code> 不是 <code>round-xl</code>）</li><li><b>RWD 沒反應</b> → 確認用的是 <code>md:</code> 前綴且已縮小／放大視窗測試</li></ul></div>",
    practice: "① 改按鈕的 bg- 與 rounded- ② 標題加 md:text-3xl ③ 到官方 Docs 查一個新類別並套用",
    code: `<script src="https://cdn.tailwindcss.com"><\/script>\n<div class="max-w-md mx-auto p-6">\n  <h1 class="text-2xl font-black text-indigo-600">Tailwind CDN 示範</h1>\n  <p class="mt-2 text-slate-600 leading-relaxed">改下方按鈕的 class，按運行看變化。</p>\n  <button type="button" class="mt-4 px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">\n    主要按鈕\n  </button>\n</div>`,
    tip: "官方站左側搜 padding、flex、grid 最快。",
    quiz: { q: "CDN 最適合？", opts: ["快速原型與學習", "百萬流量正式站唯一方案", "取代 HTML"], ans: 0 }
  },
  tw_02_cdn_vs_build: {
    track: "tailwind",
    sandbox: false,
    title: "Tailwind 02｜CDN vs npm 建置怎麼選",
    desc: "依專案階段選對接法，避免交作業卻只會 CDN。",
    concept: "<div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>方式</th><th>適合</th><th>注意</th></tr></thead><tbody><tr><td>CDN</td><td>教學、原型、單頁 demo</td><td>體積大、依賴外網 CDN</td></tr><tr><td>npm 建置</td><td>作品集、公司官網、要控管體積</td><td>需 Node、要記得 build</td></tr><tr><td>複製 node_modules</td><td>—</td><td>版本鎖死、OS 可能不相容</td></tr></tbody></table></div><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">❓ 為什麼正式站要 build</p><p>建置會依 <code>content</code> 掃描你 HTML 裡「真的用到的 class」，只輸出那些規則，grid.css 通常只有幾 KB～幾十 KB；CDN 則接近整包帶進瀏覽器。</p></div><p><b>決策一句話</b>：學習沙盒 → CDN；要交作業／上線 → <code>npm run build:css</code> + link 編譯後的 CSS。</p>",
    practice: "① 寫下你的專案屬於哪一欄 ② 列出兩個不複製 node_modules 的理由",
    code: "",
    tip: "node_modules 用 .gitignore 排除，團隊靠 package-lock.json 還原。",
    quiz: { q: "不建議複製 node_modules 主因？", opts: ["版本與環境難維護", "檔案太小", "Git 一定會更快"], ans: 0 }
  },
  tw_03_npm_setup: {
    track: "tailwind",
    sandbox: false,
    title: "Tailwind 03｜npm 安裝（精簡、可達成）",
    desc: "在專案根目錄用終端機建立可建置 Tailwind 的環境；步驟以「能 build 出 CSS」為準。",
    concept: "<p><b>前置</b>：安裝 <a href=\"https://nodejs.org\">Node.js LTS</a>，終端機可執行 <code>node -v</code>、<code>npm -v</code>。請在<strong>專案根目錄</strong>操作（有 index.html 或將放 HTML 的那一層）。</p><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">❓ 每一步在做什麼</p><ul class=\"tuto-list\"><li><code>npm init -y</code> — 產生 package.json，讓 npm 知道這是 Node 專案</li><li><code>npm install -D tailwindcss postcss postcss-cli autoprefixer</code> — 安裝 Tailwind 與 PostCSS 建置鏈（開發依賴，不必給訪客下載）</li><li><code>npx tailwindcss init</code> — 產生 tailwind.config.js，之後設 content 掃描路徑</li></ul><p>路徑 <code>file/css/</code> 可依你的站調整；重點是「入口 CSS → PostCSS → 輸出給 HTML link」。</p></div><p><b>建議指令（依序）</b>：</p><pre class=\"tuto-code-block\">cd 你的專案資料夾\nnode -v\nnpm -v\nnpm init -y\nnpm install -D tailwindcss postcss postcss-cli autoprefixer\nnpx tailwindcss init</pre><p><b>選配</b>：<code>postcss-import</code> 只有當你把 CSS 拆多檔 @import 才需要；<code>@fullhuman/postcss-purgecss</code> 在 v3 多數情況不必，<code>content</code> 已會裁掉未用到的 class。舊專案若已有 purge 插件可保留，新案不必硬加。</p><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">🚨 常見錯誤與解法</p><ul class=\"tuto-list\"><li><b>「npm 不是內部或外部命令」</b> → 重裝 Node LTS，關閉終端機再開</li><li><b>在錯誤資料夾 init</b> → <code>cd</code> 到專案根（應看得到或將建立 index.html）</li><li><b>權限 EACCES</b> → 不要對整台電腦 <code>npm install -g</code> 亂裝；在專案資料夾內安裝即可</li><li><b>網路 timeout</b> → 換網路或稍後重試 <code>npm install</code></li><li><b>從別台複製 node_modules</b> → 刪除後在專案內只跑 <code>npm install</code></li></ul></div>",
    practice: "① 建立空資料夾並 cd 進入 ② 跑完上方指令 ③ 確認有 package.json、node_modules、tailwind.config.js",
    code: "",
    tip: "只 commit package.json + package-lock.json，不 commit node_modules。第二次開新資料夾請看下一課 03b。",
    newbieTip: "每個新專案都要自己的 npm init，不要共用別專案的 node_modules。",
    quiz: { q: "還原依賴正確做法？", opts: ["npm install", "複製別人 node_modules", "只上傳 HTML"], ans: 0 }
  },
  tw_03b_next_project: {
    track: "tailwind",
    sandbox: false,
    title: "Tailwind 03b｜裝過一次後，換專案怎麼做",
    desc: "釐清「電腦裝一次」與「每個專案都要裝一次」；下次開新資料夾，指令可以少很多。",
    concept: "<p class=\"tuto-lead\">很多人第一次照 03 課跑完後，開<strong>另一個資料夾</strong>又不知道要不要重裝 Node、會不會跟上一個專案衝突。記住一句話：<strong>Node 裝在電腦一次；Tailwind 套件裝在每個專案資料夾一次。</strong></p><h3 class=\"tuto-h3\">什麼只需做一次（整台電腦）</h3><ul class=\"tuto-list\"><li>安裝 <a href=\"https://nodejs.org\">Node.js LTS</a></li><li>確認終端機能跑 <code>node -v</code>、<code>npm -v</code></li></ul><p>之後換多少個作品集、多少個資料夾，<strong>不必再下載安裝 Node</strong>（除非換電腦或重灌系統）。</p><h3 class=\"tuto-h3\">什麼是「每個專案各一份」</h3><ul class=\"tuto-list\"><li><code>package.json</code>、<code>package-lock.json</code></li><li><code>node_modules/</code>（由 npm 產生，不要手動複製、不要 commit）</li><li><code>tailwind.config.js</code>、<code>postcss.config.js</code></li><li><code>file/css/style.css</code>（入口）與建置後的 <code>grid.css</code></li></ul><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">❓ 為什麼不能共用上一個專案的 node_modules</p><p>每個專案的依賴版本、路徑、scripts 可能不同；A 專案的 node_modules 貼到 B 專案，常出現版本錯亂或路徑對不起來。正確做法是：在<strong>新專案資料夾內</strong>再跑 <code>npm install</code>。</p></div><h3 class=\"tuto-h3\">情境 A：新專案「已有」package.json（最常見）</h3><p>例如：從 Git clone、老師給的範本、或你自己複製了舊專案的設定檔（有 package.json，但沒有 node_modules）。</p><pre class=\"tuto-code-block\">cd 新專案資料夾\nnpm install\nnpm run build:css\n# 開發時改為：\nnpm run watch:css</pre><p>通常<strong>只要這三行就夠</strong>。不必再 <code>npm init</code>，也不必再 <code>npm install -D tailwindcss...</code>（除非 package.json 裡根本沒列這些套件）。</p><h3 class=\"tuto-h3\">情境 B：全新空資料夾（從零開始）</h3><p>跟 03 課類似，但<strong>可跳過「安裝 Node」</strong>，直接：</p><pre class=\"tuto-code-block\">cd 新專案資料夾\nnpm init -y\nnpm install -D tailwindcss postcss postcss-cli autoprefixer\nnpx tailwindcss init</pre><p>接著仍要建立 <code>style.css</code>、<code>postcss.config.js</code>、<code>package.json</code> 的 scripts（04～06 課）。</p><p><strong>省時間技巧</strong>：從已完成的舊專案複製這些「設定檔」到新資料夾，再改 <code>content</code> 路徑與 scripts 裡的檔名，然後只跑 <code>npm install</code> → 就變成情境 A。</p><h3 class=\"tuto-h3\">情境 C：同一台電腦，昨天專案還在、今天開新資料夾寫作業</h3><div class=\"tuto-table-wrap\"><table class=\"tuto-table\"><thead><tr><th>要做的事</th><th>要不要做</th></tr></thead><tbody><tr><td>再裝 Node.js</td><td>❌ 不用</td></tr><tr><td>在新資料夾 <code>npm install -D tailwindcss...</code></td><td>✅ 若還沒有 package.json</td></tr><tr><td>在新資料夾 <code>npm install</code></td><td>✅ 若已有 package.json</td></tr><tr><td>複製上一個專案的 node_modules</td><td>❌ 不要</td></tr><tr><td><code>npm run watch:css</code></td><td>✅ 每個專案開發時各開一個終端機</td></tr></tbody></table></div><h3 class=\"tuto-h3\">指令速查（下次開新專案先看這裡）</h3><ul class=\"tuto-list\"><li><strong>有 package.json</strong> → <code>cd 專案</code> → <code>npm install</code> → <code>npm run watch:css</code></li><li><strong>完全空白</strong> → <code>cd 專案</code> → 照 03 課完整做一次，或複製舊專案設定檔後 <code>npm install</code></li><li><strong>只改 HTML class、沒動設定</strong> → 通常只要 watch 有在跑；交作業前 <code>npm run build:css</code></li></ul><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">🚨 常見誤會</p><ul class=\"tuto-list\"><li><b>「我裝過 Tailwind 了」</b> → 裝的是「這個資料夾裡的」；換資料夾要再 install</li><li><b>在專案 A 跑 watch，卻去改專案 B 的 HTML</b> → B 不會變；要在 B 的資料夾另開終端機跑 watch</li><li><b>新專案沒跑 npm install 就 build</b> → 會報錯找不到 tailwindcss；先 install</li></ul></div>",
    practice: "① 想一個你「下一個」作品集資料夾屬於情境 A 還是 B ② 寫出該情境最少要打的指令 ③ 故意在空資料夾只跑 npm install（沒有 package.json）看錯誤訊息，再補 init",
    code: "",
    tip: "把「有 package.json → npm install → watch」貼在螢幕旁，第二次專案起會快很多。",
    newbieTip: "兩個專案同時開發 = 兩個終端機視窗，各 cd 各自己的資料夾。",
    commonMistakes: "以為裝過一次 Tailwind，新專案就不用 npm install；或複製 node_modules 導致版本錯亂。",
    submissionStandard: "1) 能說出「電腦一次」與「專案一次」差別\n2) 寫出情境 A 最少 3 個指令\n3) 知道不能複製 node_modules",
    quiz: { q: "新資料夾已有 package.json（從 Git 下來），最先該跑？", opts: ["npm install", "再安裝一次 Node.js", "複製舊專案 node_modules"], ans: 0 }
  },
  tw_04_source_entry: {
    track: "tailwind",
    sandbox: false,
    title: "Tailwind 04｜原始 CSS 入口（style.css）",
    desc: "建立 PostCSS 的輸入檔；瀏覽器不要直接 link 這個檔。",
    concept: "<p>建議路徑：<code>file/css/style.css</code>（可改，但輸入／輸出路徑要在 scripts 裡一致）。</p><pre class=\"tuto-code-block\">/* file/css/style.css — 給 PostCSS 吃，不要給瀏覽器直接 link */\n@tailwind base;\n@tailwind components;\n@tailwind utilities;</pre><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">❓ 為什麼分「源碼」與「輸出」</p><ul class=\"tuto-list\"><li><code>@tailwind</code> 不是標準 CSS，瀏覽器看不懂</li><li>PostCSS + Tailwind 會展開成真正的 CSS，才寫進 grid.css（或你自訂檔名）</li><li>你只維護 style.css；上線與 Git 一併提交<strong>建置後</strong>的 grid.css（或 CI 上 build）</li></ul></div><p>自訂元件可寫在 <code>@layer components</code>（下一課 class 過長也會用到）。</p><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">🚨 常見錯誤</p><ul class=\"tuto-list\"><li><b>HTML link 了 style.css</b> → 改 link 建置後的 grid.css</li><li><b>改了 style.css 畫面沒變</b> → 沒跑 build／watch</li><li><b>PostCSS 報錯 Unknown at rule @tailwind</b> → postcss.config.js 缺 tailwindcss 插件</li></ul></div>",
    practice: "① 建立 file/css/style.css ② 貼三行 @tailwind ③ 下一課設 PostCSS",
    code: "",
    tip: "檔名 grid.css 只是慣例，可改成 main.css，但要與 package.json scripts 一致。",
    quiz: { q: "瀏覽器應載入？", opts: ["建置後的 grid.css", "含 @tailwind 的 style.css", "tailwind.config.js"], ans: 0 }
  },
  tw_05_postcss_config: {
    track: "tailwind",
    sandbox: false,
    title: "Tailwind 05｜PostCSS 管線",
    desc: "告訴 PostCSS：先處理 Tailwind，再補瀏覽器前綴，最後輸出檔案。",
    concept: "<p>專案根目錄建立 <code>postcss.config.js</code>：</p><pre class=\"tuto-code-block\">// postcss.config.js\nmodule.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};</pre><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">❓ 為什麼需要 PostCSS</p><p>Tailwind 是 PostCSS 插件；<code>postcss-cli</code> 提供終端機指令，把 <code>style.css</code> 轉成瀏覽器可讀的 CSS。Autoprefixer 自動加 <code>-webkit-</code> 等前綴，少寫廠商相容 CSS。</p></div><p>若有拆檔 <code>@import</code>，再加 <code>'postcss-import': {}</code>，且通常放在陣列最前面。</p><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">🚨 常見錯誤</p><ul class=\"tuto-list\"><li><b>postcss: command not found</b> → 沒裝 postcss-cli，重跑 <code>npm install -D postcss-cli</code></li><li><b>Cannot find module 'tailwindcss'</b> → 在專案根跑 <code>npm install</code></li><li><b>輸出是空的</b> → 輸入路徑錯、或 style.css 沒有 @tailwind 三行</li></ul></div>",
    practice: "① 建立 postcss.config.js ② 手動試：npx postcss file/css/style.css -o file/css/grid.css",
    code: "",
    tip: "建置本質：postcss 輸入.css -o 輸出.css",
    quiz: { q: "PostCSS 在流程中負責？", opts: ["把 style.css 轉成最終 CSS", "取代 HTML", "只裝在瀏覽器"], ans: 0 }
  },
  tw_06_build_watch: {
    track: "tailwind",
    sandbox: false,
    title: "Tailwind 06｜build:css 與 watch:css",
    desc: "把建置寫進 package.json：交付前 build、開發時 watch。",
    concept: "<p>編輯 <code>package.json</code> 的 <code>scripts</code>（路徑請與你的 style.css 一致）：</p><pre class=\"tuto-code-block\">\"scripts\": {\n  \"build:css\": \"postcss file/css/style.css -o file/css/grid.css\",\n  \"watch:css\": \"postcss file/css/style.css -o file/css/grid.css --watch\"\n}</pre><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">❓ 兩個指令差別</p><ul class=\"tuto-list\"><li><code>build:css</code> — 建一次，上線前、commit 前必跑，確保 grid.css 最新</li><li><code>watch:css</code> — 開發時常駐，改 HTML／class 後自動重編，搭配 Live Server 重新整理</li></ul></div><p><b>日常</b>：終端機 A 跑 <code>npm run watch:css</code>；編輯器改 HTML；瀏覽器預覽。</p><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">🚨 常見錯誤</p><ul class=\"tuto-list\"><li><b>missing script: build:css</b> → package.json 沒寫 scripts 或 JSON 逗號錯</li><li><b>改了 class 沒變</b> → watch 沒開，或忘了 build</li><li><b>grid.css 沒產生</b> → 看終端機紅字；多半是路徑或 PostCSS 設定</li><li><b>上線後無樣式</b> → 沒上傳 grid.css，或 HTML link 路徑錯</li></ul></div>",
    practice: "① 寫入 scripts ② npm run build:css ③ 確認 grid.css 有內容與新時間 ④ 開發改跑 watch:css",
    code: "",
    tip: "提交前習慣：build:css → 看 git diff 裡 grid.css 有更新。",
    quiz: { q: "開發中自動重編用？", opts: ["npm run watch:css", "npm run build:css 一次就夠", "手動複製貼上"], ans: 0 }
  },
  tw_07_tailwind_config: {
    track: "tailwind",
    sandbox: false,
    title: "Tailwind 07｜tailwind.config 與 content",
    desc: "告訴 Tailwind 去哪裡掃 class；掃不到就會被裁掉。",
    concept: "<p><code>tailwind.config.js</code> 最關鍵是 <code>content</code>：</p><pre class=\"tuto-code-block\">module.exports = {\n  content: [\n    './*.html',\n    './file/**/*.html',\n    './js/**/*.js',\n  ],\n  theme: {\n    extend: {\n      colors: { brand: '#4f46e5' },\n    },\n  },\n};</pre><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">❓ 為什麼要 content</p><p>建置時只保留「在這些檔案字串裡出現過」的 class。沒掃到的 HTML，上的 class 不會進 grid.css，畫面就像沒套樣式。新增 tutorial.html、components 等路徑時要一併加入。</p></div><p><b>JIT</b>（v3 預設）：依 content 生成規則；<code>bg-brand</code> 來自 theme.extend.colors。</p><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">🚨 常見錯誤</p><ul class=\"tuto-list\"><li><b>某 class 上線後消失</b> → content 沒含該 html／js 路徑</li><li><b>動態 class 字串拼接</b> → Tailwind 掃不到完整字串；改寫完整 class 或 safelist</li><li><b>grid.css 還是很大</b> → 是否誤用 CDN；或 content 設太寬如 <code>./**/*</code> 掃到 node_modules</li></ul></div>",
    practice: "① content 改成你真實路徑 ② 加 brand 色 ③ build 後用 bg-brand 測試",
    code: "",
    tip: "動態 class 是進階坑；初學盡量在 HTML 寫完整類名。",
    quiz: { q: "grid.css 缺少某 class 常因？", opts: ["content 沒掃到該 HTML", "忘記寫 HTML", "tailwind 壞掉"], ans: 0 }
  },
  tw_08_link_site: {
    track: "tailwind",
    sandbox: false,
    title: "Tailwind 08｜與網站 HTML 連動",
    desc: "編譯後 CSS 怎麼 link、子目錄路徑、與舊 CSS 並存。",
    concept: "<p><b>根目錄 index.html</b>：</p><pre class=\"tuto-code-block\">&lt;link rel=\"stylesheet\" href=\"file/css/grid.css\"&gt;</pre><p>子目錄頁面用 <code>../file/css/grid.css</code>（複習 HTML 相對路徑課）。</p><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">❓ 為什麼 link 輸出檔而不是 style.css</p><p>訪客瀏覽器只需要最終 CSS。源碼留在 repo 給開發者 build；部署時 grid.css 必須存在且為最新 build。</p></div><p><b>開發流程</b>：watch:css → 改 HTML class → 重新整理 → 提交前 build:css → 上傳 HTML + grid.css。</p><p><b>與純 CSS 並存</b>：非 Tailwind 頁可繼續用舊 style.css；Tailwind 頁只 link grid.css，避免同一元素被兩套規則打架。</p><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">🚨 常見錯誤</p><ul class=\"tuto-list\"><li><b>全站無樣式</b> → link 路徑錯、grid.css 沒上傳、或沒 build</li><li><b>只有首頁有樣式</b> → 子頁 ../ 路徑錯</li><li><b>本機有、FTP 沒有</b> → 漏傳 file/css/ 資料夾</li></ul></div>",
    practice: "① 在 html head 加 link grid.css ② 跑 build ③ Live Server 開本機專案預覽（非 file:// 教學沙盒）",
    code: "",
    tip: "F12 → Network 篩 CSS，確認 grid.css 是 200 不是 404。",
    quiz: { q: "正式頁面應 link？", opts: ["建置後的 grid.css", "@tailwind 源碼", "package.json"], ans: 0 }
  },
  tw_09_official_workflow: {
    track: "tailwind",
    sandbox: false,
    title: "Tailwind 09｜工作流總整理與 v4 對照",
    desc: "Checklist、官方 vs 本手冊分工、v4 簡述、疑難排解總表。",
    concept: "<p><b>查語法</b> → <a href=\"https://tailwindcss.com/docs\">tailwindcss.com/docs</a><br><b>查接線</b> → 本手冊 03～10 課</p><p><b>每次改 UI 後</b>：</p><ul class=\"tuto-list\"><li>□ watch 在跑，或手動 <code>npm run build:css</code></li><li>□ grid.css 時間戳有更新</li><li>□ HTML link 路徑正確（子頁 ../）</li><li>□ 手機寬度測過 md: / lg:</li><li>□ 部署包含 grid.css</li></ul><p><b>Tailwind v4（了解即可）</b>：常見 <code>@import \"tailwindcss\"</code> + <a href=\"https://tailwindcss.com/docs/installation\">官方安裝指南</a> 的 CLI 路線；舊案 v3 PostCSS 仍大量存在，先掌握本路線再遷移。</p><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">🚨 疑難排解總表</p><ul class=\"tuto-list\"><li><b>完全無樣式</b> → link／build／是否 CDN 與 build 混用搞混</li><li><b>部分 class 無效</b> → content 路徑、動態 class</li><li><b>檔案很大</b> → 正式站別只靠 CDN；檢查 content 是否過寬</li><li><b>終端機紅字</b> → 先讀第一行：缺模組就 npm install；路徑錯就改 scripts</li></ul></div>",
    practice: "① 把 checklist 貼到專案 README ② 官方 docs 查 3 個 class 做一張卡片 ③ 走一遍 build → 部署預覽",
    code: "",
    tip: "團隊統一 package.json scripts，比各自記指令可靠。",
    quiz: { q: "類別語法查哪裡最準？", opts: ["Tailwind 官方 Docs", "只用猜測", "只看 package.json"], ans: 0 }
  },
  tw_10_utilities_hygiene: {
    track: "tailwind",
    sandbox: true,
    title: "Tailwind 10｜常用類別與 class 過長怎麼辦",
    desc: "比官方更實用的速查 + @apply／@layer 讓 HTML 可讀、專案可維護。",
    concept: "<p><b>常用類別（教學向速查，細節以 <a href=\"https://tailwindcss.com/docs\">Docs</a> 為準）</b></p><ul class=\"tuto-list\"><li><b>容器</b>：<code>max-w-3xl mx-auto px-4</code> <code>min-h-screen</code></li><li><b>彈性</b>：<code>flex flex-col md:flex-row gap-4 items-center justify-between</code></li><li><b>網格</b>：<code>grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6</code></li><li><b>卡片</b>：<code>rounded-2xl border border-slate-200 bg-white p-6 shadow-sm</code></li><li><b>按鈕</b>：<code>inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400</code></li><li><b>文字</b>：<code>text-slate-600 leading-relaxed</code> <code>truncate</code> <code>line-clamp-2</code></li><li><b>狀態</b>：<code>hover:</code> <code>focus:</code> <code>disabled:opacity-50</code> <code>dark:bg-slate-900</code>（若啟用 darkMode）</li></ul><div class=\"tuto-panel tuto-panel-why\"><p class=\"tuto-panel-title\">❓ class 太長怎麼辦（專案完整度）</p><ol class=\"tuto-list\"><li><b>@layer components + @apply</b> — 在 style.css 抽成 <code>.btn-primary</code>，HTML 只留語意 class（適合重複 3 次以上的組合）</li><li><b>拆元件</b> — 多頁重複的 header／card 用 include、框架元件或模板，不要整段複製貼上</li><li><b>Prettier 外掛</b> — 讓 class 自動換行排序（選修）</li><li><b>別過度 @apply</b> — 整頁都變回傳統 CSS 就失去 utility 可讀性；只抽「真的重複」的區塊</li></ol></div><pre class=\"tuto-code-block\">/* file/css/style.css */\n@layer components {\n  .card {\n    @apply rounded-2xl border border-slate-200 bg-white p-6 shadow-sm;\n  }\n  .btn-primary {\n    @apply inline-flex items-center px-4 py-2 rounded-xl\n           bg-indigo-600 text-white font-semibold hover:bg-indigo-700;\n  }\n}</pre><div class=\"tuto-panel tuto-panel-error\"><p class=\"tuto-panel-title\">🚨 常見錯誤</p><ul class=\"tuto-list\"><li><b>@apply 後 build 失敗</b> → class 拼錯或用了 @apply 不支援的寫法；改在 HTML 先試通再抽</li><li><b>.card 沒樣式</b> → 忘了 build；或 HTML 沒寫 class=\"card\"</li><li><b>抽太多元件 class</b> → 回到「猜測 .card 裡有什麼」；保持 HTML 仍能看出大致排版</li></ul></div>",
    practice: "① 沙盒把一顆按鈕改成使用 btn-primary（需 CDN 下 @apply 不生效，此課沙盒用 inline 模擬）② 在本機 style.css 抽一個 .card 並 build ③ 官方 Docs 查 line-clamp 用在一段文字上",
    code: `<script src="https://cdn.tailwindcss.com"><\/script>\n<div class="max-w-md mx-auto p-6 space-y-4">\n  <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">\n    <h2 class="text-lg font-bold text-slate-800">卡片標題</h2>\n    <p class="mt-2 text-sm text-slate-600 leading-relaxed">這裡模擬「card」組合；正式專案請在 style.css 用 @apply 抽成 .card 再 build。</p>\n    <button type="button" class="mt-4 inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">主要按鈕</button>\n  </div>\n</div>`,
    tip: "重複三次以上的相同 class 組合，才值得抽 @layer components。",
    quiz: { q: "class 太長時較好的做法？", opts: ["重複區塊用 @layer + @apply 或元件", "全部寫進一個 style 屬性", "放棄 Tailwind"], ans: 0 }
  }
};
