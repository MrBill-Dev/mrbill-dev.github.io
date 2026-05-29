/* MrBill AI Lab — 概念練習、Prompt 矩陣、小遊戲 */

function practiceItem(q, title, content, tip, extra) {
  return Object.assign({
    q: q, title: title, content: content, tip: tip || '',
    lesson: '', steps: [], classroom: '', extend: '', nextStep: ''
  }, extra || {});
}

// ─── 概念互動練習 ───
const practiceCategories = [
  {
    id: 'foundation',
    label: '基礎觀念',
    color: 'indigo',
    items: [
      practiceItem('大語言模型（LLM）到底在做什麼？', 'LLM = 超高階的文字機率預測器',
        'ChatGPT、Claude、Gemini 本質上都在做同一件事：根據前面出現的文字，預測下一個最可能出現的 token。它讀過海量資料，學到「祝你生日」後面常接「快樂」。這不是真正「理解」世界，而是極強的統計模式匹配——所以會自信地說錯話（幻覺），也需要人類審稿。',
        '常見主流模型都屬於此類：擅長語言生成、摘要整理與多步任務協作。',
        { key: 'llm', lesson: '開場 3 分鐘：請學員在手機輸入「祝你生日」，觀察 AI 接龍。再問：「它真的懂生日嗎？」引導到「預測」而非「思考」。',
          steps: ['用白話定義 LLM（文字接龍機器人）', '示範一次正確接龍 vs 一次幻覺', '強調：AI 輸出 = 草稿，人要審'],
          classroom: '分組各寫 1 個「AI 可能說錯的領域」（法律、醫療、股價…），下課前貼到共筆牆。',
          extend: '延伸閱讀：Transformer 架構、訓練 vs 推論、開源模型生態。',
          nextStep: '下一步 → 練「Token 與額度」或到 Prompt 矩陣寫第一個 Role/Task。' }),
      { key: 'token', q: '什麼是 Token？為什麼會「用爆額度」？', title: 'Token 是計費與記憶的單位', content: '中文大約 1 個字 ≈ 1–2 個 token；英文約 4 字元 ≈ 1 token。你貼的長文、對話歷史、AI 回覆都會累加。上下文視窗（Context Window）例如 128K token，超過就無法一次處理，或要截斷舊對話。省 token 技巧：用 .md 結構化輸入、刪掉冗長寒暄、重要資料放附件或 RAG。', tip: '付費方案常按「輸入 + 輸出」token 計價，長對話成本會快速上升。' },
      { key: 'rag', q: 'RAG 是什麼？跟直接問 ChatGPT 差在哪？', title: 'RAG = 先查資料庫，再讓 AI 回答', content: 'Retrieval-Augmented Generation：把你的 PDF、官網、內部文件向量化存進資料庫，使用者提問時先搜尋相關段落，再連同問題一起送給模型。好處是減少幻覺、能回答「你公司專屬」的問題。企業客服、法規查詢、產品手冊問答都靠 RAG，而不是只靠模型訓練時的舊知識。', tip: 'NotebookLM、許多企業知識庫產品底層都是 RAG 思路。' },
      { key: 'agent', q: 'AI Agent 跟「只聊天」的 AI 有什麼不同？', title: 'Agent = 能規劃步驟並使用工具', content: '一般聊天：你問一句，它答一句。Agent：收到目標後會拆解子任務（搜尋、寫程式、發 API、讀檔案），逐步執行並自我修正。例如「幫我分析這季 GA4 報表並寫 Email」——Agent 可能先讀 CSV、畫圖、起草郵件。風險是步驟越多，錯誤與成本越高，需要設定權限邊界。', tip: 'Cursor、Devin、OpenAI Operator 等產品方向都是 Agent 化。' }
    ]
  },
  {
    id: 'prompt',
    label: 'Prompt 工程',
    color: 'purple',
    items: [
      { key: 'structure', q: '為什麼我的 Prompt  AI 總是答非所問？', title: '缺少 Role、Task、Context、Constraints', content: '常見錯誤：「幫我寫文案」——太模糊。有效寫法用 Markdown 分段：# Role（你是誰）、# Task（要做什麼）、# Context（背景資料）、# Constraints（字數、格式、禁止事項）、# Output Format（表格/JSON/條列）。模型對標題與條列的服從度遠高於一大段散文。', tip: '到本站「Prompt 矩陣」選分類，會產出 .md 範本。' },
      { key: 'cot', q: '什麼是 Chain-of-Thought（思維鏈）？', title: '要求 AI「先想步驟再答」可提升推理題正確率', content: '在 Prompt 加：「請先列出推理步驟，再給最終答案。」或英文句 "Let\'s think step by step"。對數學、邏輯、除錯、商業決策分析特別有效。進階版是 o1 / DeepSeek-R1 等「推理模型」，內建較長的思考過程。', tip: '簡單問答不必每次都用 CoT，複雜問題才值得。' },
      { key: 'fewshot', q: 'Few-shot 範例要怎麼給？', title: '給 2–3 個「輸入→輸出」樣本，勝過長篇形容', content: '與其說「用正式語氣」，不如直接貼兩則你滿意的範例郵件，再說「請用相同格式寫第三封」。模型會模仿結構、長度、用詞。注意範例之間要一致，否則模型會混淆。', tip: '分類、標籤、格式轉換任務最適合 Few-shot。' }
    ]
  },
  {
    id: 'work',
    label: '職場與開發',
    color: 'cyan',
    items: [
      { key: 'code', q: 'AI 時代還要學寫程式嗎？', title: '要學的是「審稿、架構、除錯」', content: 'AI 能產出 80% 的 CRUD、元件、測試草稿，但 RWD 跑版、XSS、效能、無障礙、業務邏輯錯誤仍要人判斷。會讀 Code、會拆需求、會寫測試的人，用 AI 產能可 3–5 倍；不會的人容易把 bug 直接上線。', tip: '本站前端手冊 + Cursor 類工具是典型協作流程。' },
      { key: 'copilot', q: 'Cursor / Copilot 跟 ChatGPT 網頁版差在哪？', title: 'IDE 整合 = 看得見整個專案脈絡', content: '網頁 ChatGPT 只有你貼的片段；Cursor 等能索引 repo、跨檔重構、在終端跑指令。適合日常開發。ChatGPT 適合討論架構、寫文件、腦力激盪。兩者常一起用。', tip: '目前趨勢：Agent 可直接改多檔、跑測試與修錯，但仍需 code review。' },
      { key: 'seo-ai', q: 'AI 寫的文章可以直接上架做 SEO 嗎？', title: '可以輔助，但要人工加「經驗與證據」', content: '純 AI 內容常缺乏 E-E-A-T（經驗、專業、權威、信任）。Google 懲罰低品質量產。建議：AI 出大綱與初稿，人補真實案例、數據、截圖、更新日期。搭配本站 SEO/GEO 教學結構化段落。', tip: 'GEO（生成式搜尋優化）讓內容易被 AI 摘要引用。' }
    ]
  },
  {
    id: 'ethics',
    label: '倫理與安全',
    color: 'rose',
    items: [
      { key: 'hallucination', q: '什麼是 AI 幻覺？怎麼防？', title: '幻覺 = 模型用自信語氣說錯誤事實', content: '法條編號、論文引用、API 參數、統計數字都可能捏造。防護：要求附來源、用 RAG 餵官方文件、關鍵事實人工查證、讓模型回答「不確定」而非瞎猜。', tip: '醫療、法律、財務決策不可全信 AI。' },
      { key: 'privacy', q: '可以把客戶資料貼給 ChatGPT 嗎？', title: '預設會進入訓練或日誌，需用企業方案', content: '免費/個人版：避免貼個資、合約、原始帳密。企業版（ChatGPT Team/Enterprise、Azure OpenAI）才有資料隔離與合約保障。內部文件應走私有部署或 RAG 沙盒。', tip: '去識別化後再貼，是最低限度做法。' },
      { key: 'copyright', q: 'AI 生成的圖文可以商用嗎？', title: '看平台條款與是否含受版權素材', content: '各平台對生成物著作權規定不同；訓練資料可能含受保護作品，風格模仿也可能侵權。商用前：讀 ToS、保留生成紀錄、重要案件諮詢律師。攝影與設計仍建議以實拍為主、AI 輔助。', tip: 'Adobe Firefly 等標榜授權資料訓練，風險較低但仍需審慎。' }
    ]
  },
  {
    id: 'multimodal',
    label: '多模態與創意',
    color: 'amber',
    items: [
      { key: 'image', q: 'Midjourney / DALL·E / Flux 怎麼選？', title: '依用途：風格化 vs 精準 vs 本地化', content: 'Midjourney 擅長藝術感與氛圍；DALL·E 與 ChatGPT 整合方便；Flux、SD 開源可本地跑。提示詞要寫：主體、光線、鏡頭、材質、比例（16:9）、排除項（no text）。懂攝影用語（光圈、色溫）品質更好。', tip: '生成圖當參考或素材，品牌主視覺仍建議實拍或設計師修。' },
      { key: 'video', q: 'Sora / Runway / Kling 現在能取代拍攝嗎？', title: '目前仍以短片段與 B-roll 最穩，難完全取代真實商業拍攝', content: 'AI 影片適合概念預覽、社群短影音、特效補充。人物手指、文字、物理一致性已有改善，但商業交付仍要人工審稿。婚禮、產品、教學仍以真實拍攝 + 後製為主；AI 可做字幕、配音、粗剪與分鏡草稿。', tip: '本站攝影學堂打底，AI 當加速器。' },
      { key: 'voice', q: 'AI 配音與克隆聲線要注意什麼？', title: '需同意權與標示，避免冒充', content: 'ElevenLabs、Azure TTS 等可做多語言配音。未經同意克隆他人聲音可能違法。教學影片、Podcast 可大幅節省錄音時間，但重要發布建議標示「AI 旁白」。', tip: '結合 Whisper 可做自動字幕與會議摘要。' },
      { key: 'img-prompt', q: '產圖 Prompt 要寫哪些要素才不會翻車？', title: '主體 + 光線 + 鏡頭 + 比例 + 排除項', content: '英文 Prompt 建議順序：Subject（主體）→ Environment（場景）→ Lighting（光線）→ Camera/lens（鏡頭）→ Style（風格）→ --ar 比例 → --no text, watermark。先出 4 張草稿選構圖，再放大精修；品牌主視覺仍要設計師或實拍把關。', tip: '到 Prompt 矩陣「影像創作」→ 產圖情境流程。' }
    ]
  },
  {
    id: 'tools',
    label: '工具選型',
    color: 'emerald',
    items: [
      { key: 'chat-vs-ide', q: 'ChatGPT 網頁版 vs Cursor，什麼時候用哪個？', title: '討論用聊天，改專案用 IDE', content: '寫文章、想點子、翻譯、快速問答 → ChatGPT/Claude 網頁。要改整個 repo、跑測試、跨檔重構 → Cursor/Copilot。新手常見錯誤：在聊天窗貼 500 行 Code 卻沒有檔案結構，AI 容易漏依賴。', tip: '流程：聊天定架構 → IDE 實作 → 聊天寫文件。' },
      { key: 'notebooklm', q: 'NotebookLM 適合什麼教學情境？', title: '把 PDF/PPT 變成可問答的課程助教', content: '上傳講義後可生成 FAQ、測驗、摘要音訊。適合讀書會、企業 SOP、法規包。不適合：即時股價、未上傳的機密（仍需企業方案）。', tip: '課堂活動：學員分組向 NotebookLM 提 3 個「考倒它的問題」。' },
      { key: 'mj-vs-dalle', q: '要海報主視覺，Midjourney 還是 DALL·E？', title: '藝術氛圍選 MJ，快速整合選 DALL·E', content: 'Midjourney 質感與光影強，需 Discord 或網頁訂閱。DALL·E 在 ChatGPT 內一鍵出圖，適合草稿。商業印刷前：檢查文字是否亂碼、人物手指、Logo 變形。', tip: '搭配攝影學堂理解光比，產圖才可控。' }
    ]
  },
  {
    id: 'classroom',
    label: '帶課實戰',
    color: 'violet',
    items: [
      { key: 'lesson-45', q: '45 分鐘 AI 素養課怎麼排？', title: '體驗 → 概念 → 實作 → 反思', content: '0–5 分：破冰（AI 接龍遊戲）。5–15 分：LLM 白話 + 幻覺案例。15–30 分：Prompt 矩陣寫一題並貼上成果。30–40 分：分組討論「什麼不該交給 AI」。40–45 分：作業：回家完成一個 .md Prompt。', tip: '投影本站「概念練習箱」→ 怎麼教分頁。' },
      { key: 'parent', q: '親子共學家長要先懂什麼？', title: '先建立「審稿」習慣，再談工具', content: '與其禁止 ChatGPT，不如教孩子：① 不貼個資 ② 重要作業要查證 ③ AI 是草稿不是交卷答案。可一起用 Prompt 寫讀書心得大綱，再自己重寫。', tip: '搭配「誰適合來這裡」親子卡片的文案。' },
      { key: 'assess', q: '怎麼評量學員是否真的會用 AI？', title: '看流程，不是看華麗輸出', content: '評量 Rubric：是否寫清 Role/Task？是否查證事實？是否說明取捨？是否標註 AI 協作？避免只評「文章漂不漂亮」。', tip: '作業範例：附 Prompt .md + 修改前後對照。' }
    ]
  }
];

const practiceTeach = {
  token: { lesson: '用「手機簡訊字數」比喻 token：訊息越長越貴。現場打開 ChatGPT 對話，指出右下角或說明頁的 context 限制。', steps: ['解釋輸入+輸出都計費', '示範刪減寒暄的 .md 寫法', '討論長文件：RAG vs 整份貼上'], classroom: '請學員把一段 200 字文章改寫成「標題+條列」版，比較哪個回答較精準。', extend: '進階：tiktoken 估算、摘要鏈（map-reduce）。', nextStep: '→ 練 RAG 或到 Prompt 矩陣選「資料分析」情境。' },
  rag: { lesson: '比喻：開卷考（RAG）vs 閉卷考（純模型）。準備 3 頁公司 FAQ PDF 上傳 NotebookLM 現場問答。', steps: ['定義檢索+生成', '示範無 RAG 時的胡說', '示範有文件時的引用'], classroom: '分組：一組只問模型，一組用文件，比答案可信度。', extend: '向量資料庫、chunk 大小、hybrid search。', nextStep: '→ 企業內訓可畫「哪些資料可上雲」流程圖。' },
  agent: { lesson: '用「外送平台調度」比喻 Agent：下單→拆單→騎手→回報。強調每多一步都要人設檢查點。', steps: ['對比聊天 vs Agent', '列 3 個適合 Agent 的任務', '列 3 個禁止全自動的任務'], classroom: '白板畫：人類必審關卡（金流、醫療、合約）。', extend: 'tool calling、MCP、權限沙盒。', nextStep: '→ 開發者用 Cursor Agent 示範「改一個 bug」。' },
  structure: { lesson: '現場把「幫我寫文案」改成 RTCS 五段式，投影前後差異。', steps: ['Role', 'Task', 'Context', 'Constraints', 'Output'], classroom: '每人寫一題作業 Prompt，鄰座互評是否缺段。', extend: 'JSON mode、function calling、system prompt 管理。', nextStep: '→ 打開本站 Prompt 矩陣實作。' },
  cot: { lesson: '數學應用題：先禁止直接答，要求「步驟 1、2、3」。', steps: ['寫明 think step by step', '要求最終答案獨立一段', '複雜題用推理模型'], classroom: '比賽：同一題，有無 CoT 的正確率（教師預先測過）。', extend: '主流推理模型、self-consistency。', nextStep: '→ Prompt 矩陣勾選「思維鏈」技巧。' },
  fewshot: { lesson: '給兩封真實 Email 當範例，第三封讓 AI 模仿。', steps: ['範例要一致', '標註輸入/輸出', '說明禁止事項'], classroom: '轉換練習：口語 → 正式公文（附 2 範例）。', extend: 'dynamic few-shot、範例庫維護。', nextStep: '→ 行銷分類練習 GEO 文案。' },
  code: { lesson: '現場 AI 生成按鈕，用手機檢查 tap 區域是否夠大。', steps: ['AI 出草稿', '人跑 Lighthouse', '人修 a11y'], classroom: 'Bug hunt：故意留 2 個 AI 常犯的錯讓學員找。', extend: 'TDD + AI、CI 內建 review bot。', nextStep: '→ tutorial.html 沙盒。' },
  'chat-vs-ide': { lesson: '畫決策樹：單檔 snippet → 聊天；多檔專案 → IDE。', steps: ['列工具', '列風險', '示範 Cursor @codebase'], classroom: '分組辯論：「還要不要背語法？」', extend: 'Vibe coding 界線、資安掃描。', nextStep: '→ 小遊戲「工具選擇」模式。' },
  'lesson-45': { lesson: '照 45 分鐘腳本走，每段設計時器。', steps: ['體驗', '概念', 'Prompt 實作', '倫理反思'], classroom: '發學習單 QR 連到本站練習箱。', extend: '系列課：M1–M8 對應首頁 AI 課程。', nextStep: '→ 指定回家完成「下一步指引」一條路徑。' },
  'img-prompt': { lesson: '拆解一張商業攝影成 Prompt 五要素，再讓 AI 生成對照。', steps: ['主體', '光線', '鏡頭', '比例', '排除'], classroom: '四組各產 1 張，投票最可用的一張並說理由。', extend: 'ControlNet、參考圖、inpaint 修字。', nextStep: '→ Prompt 矩陣產圖情境 + 攝影學堂曝光。' },
  copilot: { lesson: '螢幕錄影 3 分鐘：同一需求分別在 ChatGPT 與 Cursor 各做一次。', steps: ['定一個小 bug', '聊天解 vs IDE 解', '比較時間與品質'], classroom: '討論：哪些任務不該開 Agent 全自動。', extend: 'MCP、rules 檔、repo 索引。', nextStep: '→ pathway「提升工作效率」。' },
  'seo-ai': { lesson: '展示一篇純 AI 文 vs 人類補案例的文，用 GEO 檢查表打分。', steps: ['AI 大綱', '人補 E-E-A-T', '上架+GA4'], classroom: '每組找 1 個「可被 AI 引用」的段落改寫。', extend: 'marketing-seo-geo.html 全文。', nextStep: '→ Prompt 行銷 GEO 情境。' },
  hallucination: { lesson: '故意問一個冷門法條編號，展示幻覺。', steps: ['製造錯誤', '要求來源', '人工查證'], classroom: '建立班級「查證清單」海報。', extend: 'RAG、引用格式、confidence。', nextStep: '→ 倫理題 + 企業 RAG。' },
  privacy: { lesson: '案例討論：客服貼客戶電話到 ChatGPT 會怎樣。', steps: ['個資定義', '企業版差異', '去識別化'], classroom: '改寫一段對話：移除可識別資訊。', extend: 'GDPR、台灣個資法、DPA。', nextStep: '→ 決策樹「敏感資料」分支。' },
  copyright: { lesson: '比較兩平台 ToS 關於商用生成圖條款（教師預先準備）。', steps: ['讀 ToS 摘要', '風險分級', '保留生成紀錄'], classroom: '辯論：風格模仿是否侵權。', extend: 'Adobe Firefly、授權圖庫。', nextStep: '→ 產圖流程「商用」分支。' },
  image: { lesson: '三平台各出 1 張同主題，比風格差異。', steps: ['寫 Prompt', '比較', '選商用策略'], classroom: '投票選「最像實拍」的一張。', extend: 'Flux 本地、SD LoRA。', nextStep: '→ Prompt 影像情境。' },
  video: { lesson: '播 AI 短片+實拍對照，討論可用場景。', steps: ['列可用 B-roll', '列不可用', '剪映混剪'], classroom: '用 AI 生成 5 秒轉場是否可行。', extend: 'Runway、Kling、版權。', nextStep: '→ 攝影錄影單元。' },
  voice: { lesson: '示範 TTS 多語言同一段文案。', steps: ['選平台', '標示 AI 旁白', '同意權'], classroom: '討論：克隆聲音的界線。', extend: 'Whisper 字幕流程。', nextStep: '→ 教學影片製作 SOP。' },
  notebooklm: { lesson: '上傳 10 頁講義，現場問 3 題。', steps: ['上傳', '問答', '產 FAQ'], classroom: '各組設計 1 題考倒助教。', extend: '多來源整合、音訊摘要。', nextStep: '→ RAG 概念題。' },
  'mj-vs-dalle': { lesson: '同一 Prompt 兩平台出圖對照。', steps: ['草稿', '比較', '決定商用路線'], classroom: '列出「不能商用」的 3 個理由。', extend: '印刷解析度、色域。', nextStep: '→ 產圖 pathway。' },
  parent: { lesson: '家長工作坊：先體驗再談規範。', steps: ['親子共寫大綱', '孩子重寫', '討論誠實繳交'], classroom: '簽署家庭 AI 使用公約範本。', extend: '校園誠信、參考書目。', nextStep: '→ 帶課實戰親子題。' },
  assess: { lesson: '發 Rubric 表，互評同學 Prompt 作業。', steps: ['四項指標', '互評', '教師複評'], classroom: '選 1 份最佳作業分享。', extend: '作品集、歷程檔案。', nextStep: '→ 首頁 AI 課程 M8 治理。' }
};

function defaultTeachFallback(item) {
  return {
    lesson: '先用 2 分鐘讓學員用自己的話重述題目，再進入官方解析，避免只念答案。',
    steps: ['重述問題', '閱讀解析', '討論 tip', '指定一個實作作業'],
    classroom: '兩兩一組：A 解釋給 B 聽，B 提出一個反例或疑問。',
    extend: '可到 Prompt 矩陣找對應情境實作一題。',
    nextStep: '→ 打開「下一步指引」選你的學習目標。'
  };
}

function enrichPracticeItem(item) {
  var extra = practiceTeach[item.key] || defaultTeachFallback(item);
  return Object.assign({}, item, extra);
}

function initPracticeLab() {
  const root = document.getElementById('practice-root');
  if (!root) return;
  let html = '<div class="flex flex-wrap gap-2 mb-4" id="practice-tabs"></div>';
  html += '<p class="text-sm text-slate-500 mb-4">點選問題後，切換下方分頁：概念解析／實作帶練步驟／延伸與下一步。遇到不懂名詞，先看下方「新手名詞小字典」，再回來看這題會更好吸收。</p>';
  html += '<div id="practice-questions" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"></div>';
  html += `<div id="answerDisplay" class="mt-8 hidden rounded-2xl border border-indigo-100 overflow-hidden">
    <div class="flex flex-wrap gap-1 p-3 bg-indigo-50 border-b border-indigo-100" id="practice-answer-tabs">
      <button type="button" data-pane="content" class="practice-pane-btn px-4 py-2 rounded-lg text-sm font-bold bg-indigo-600 text-white">📖 概念解析</button>
      <button type="button" data-pane="lesson" class="practice-pane-btn px-4 py-2 rounded-lg text-sm font-bold bg-white text-slate-600">🛠 實作帶練步驟</button>
      <button type="button" data-pane="extend" class="practice-pane-btn px-4 py-2 rounded-lg text-sm font-bold bg-white text-slate-600">🧭 延伸與下一步</button>
    </div>
    <div class="p-6 md:p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <h4 id="answerTitle" class="font-black text-indigo-900 text-xl mb-3"></h4>
      <div id="answerPaneContent" class="practice-pane text-slate-700 text-base leading-relaxed whitespace-pre-line"></div>
      <div id="answerPaneLesson" class="practice-pane hidden text-slate-700 text-base leading-relaxed space-y-4"></div>
      <div id="answerPaneExtend" class="practice-pane hidden text-slate-700 text-base leading-relaxed space-y-4"></div>
      <p id="answerTip" class="mt-4 text-sm font-bold text-indigo-600 border-t border-indigo-100 pt-4"></p>
    </div>
  </div>`;
  html += `<div class="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50 p-5">
    <p class="text-xs font-black text-cyan-700 uppercase tracking-wider mb-3">新手名詞翻譯區</p>
    <div class="grid md:grid-cols-3 gap-3 text-sm mb-4">
      <div class="rounded-xl bg-white border border-cyan-100 p-3"><p class="font-black text-slate-900">Token</p><p class="text-slate-600 mt-1">可理解成 AI 計算字數與成本的單位。</p></div>
      <div class="rounded-xl bg-white border border-cyan-100 p-3"><p class="font-black text-slate-900">RAG</p><p class="text-slate-600 mt-1">先查你的資料，再回覆，不靠模型亂猜。</p></div>
      <div class="rounded-xl bg-white border border-cyan-100 p-3"><p class="font-black text-slate-900">Prompt</p><p class="text-slate-600 mt-1">你給 AI 的任務說明書，寫越清楚越準。</p></div>
      <div class="rounded-xl bg-white border border-cyan-100 p-3"><p class="font-black text-slate-900">Agent</p><p class="text-slate-600 mt-1">會自己拆任務並呼叫工具的 AI，不只是聊天。</p></div>
      <div class="rounded-xl bg-white border border-cyan-100 p-3"><p class="font-black text-slate-900">Few-shot</p><p class="text-slate-600 mt-1">先給 2-3 個範例，AI 會比較穩定模仿格式。</p></div>
      <div class="rounded-xl bg-white border border-cyan-100 p-3"><p class="font-black text-slate-900">推理模型</p><p class="text-slate-600 mt-1">適合多步驟難題，但速度可能較慢、成本較高。</p></div>
    </div>
  </div>`;
  html += `<div class="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
    <p class="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">學完之後怎麼做</p>
    <div class="grid md:grid-cols-3 gap-3">
      <button type="button" data-go="tool" class="text-left p-4 rounded-xl bg-white border border-slate-200 hover:border-purple-300 transition-colors">
        <p class="font-black text-slate-900">① 把這題變成 Prompt</p>
        <p class="text-sm text-slate-600 mt-1">跳到 Prompt 矩陣，直接套到真實情境。</p>
      </button>
      <button type="button" data-go="game" class="text-left p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 transition-colors">
        <p class="font-black text-slate-900">② 用遊戲驗證理解</p>
        <p class="text-sm text-slate-600 mt-1">到小遊戲做「下一步指引 / 情境決策」。</p>
      </button>
      <a href="marketing-seo-geo.html" class="block p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-colors no-underline">
        <p class="font-black text-slate-900">③ 看真實商業案例</p>
        <p class="text-sm text-slate-600 mt-1">前往 SEO / GEO 實戰，對照可落地流程。</p>
      </a>
    </div>
  </div>`;
  html += `<div class="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-5 space-y-4">
    <p class="text-xs font-black text-indigo-700 uppercase tracking-wider">延伸學習地圖（建議順序）</p>
    <div class="grid md:grid-cols-4 gap-3 text-sm">
      <div class="rounded-xl bg-white border border-indigo-100 p-3"><p class="font-black text-slate-900">Step 1 觀念校正</p><p class="text-slate-600 mt-1">先點 2 題「基礎觀念」與 1 題「倫理安全」。</p></div>
      <div class="rounded-xl bg-white border border-indigo-100 p-3"><p class="font-black text-slate-900">Step 2 套用 Prompt</p><p class="text-slate-600 mt-1">把當前題目改寫成 RTCS .md，並產生第一版輸出。</p></div>
      <div class="rounded-xl bg-white border border-indigo-100 p-3"><p class="font-black text-slate-900">Step 3 查證與修稿</p><p class="text-slate-600 mt-1">用來源與條件回查，保留「修前/修後」紀錄。</p></div>
      <div class="rounded-xl bg-white border border-indigo-100 p-3"><p class="font-black text-slate-900">Step 4 交付與反思</p><p class="text-slate-600 mt-1">完成可交付版本，回到小遊戲驗證下一步路徑。</p></div>
    </div>
    <div class="rounded-xl bg-white border border-indigo-100 p-4 text-sm">
      <p class="font-black text-slate-900 mb-2">實戰任務包（可當自學作業）</p>
      <ul class="list-disc pl-5 space-y-1 text-slate-700">
        <li>任務 A：把一篇 SEO 教學文改寫成「可被 AI 摘要引用」版本。</li>
        <li>任務 B：用兩個不同模型完成同題，做差異比較報告。</li>
        <li>任務 C：產圖需求寫出 Prompt + 版權風險清單 + 人工審稿流程。</li>
      </ul>
    </div>
  </div>`;
  root.innerHTML = html;

  const tabsEl = document.getElementById('practice-tabs');
  practiceCategories.forEach((cat, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.cat = cat.id;
    b.className = 'practice-tab px-4 py-2 rounded-xl text-sm font-bold border transition-all ' +
      (i === 0 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-200');
    b.textContent = cat.label;
    tabsEl.appendChild(b);
  });

  let currentItem = null;

  function showPane(pane) {
    document.querySelectorAll('.practice-pane').forEach(el => el.classList.add('hidden'));
    document.getElementById('answerPane' + pane.charAt(0).toUpperCase() + pane.slice(1)).classList.remove('hidden');
    document.querySelectorAll('.practice-pane-btn').forEach(btn => {
      btn.className = 'practice-pane-btn px-4 py-2 rounded-lg text-sm font-bold ' +
        (btn.dataset.pane === pane ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600');
    });
  }

  function renderAnswer(item) {
    currentItem = enrichPracticeItem(item);
    document.getElementById('answerTitle').textContent = currentItem.title;
    document.getElementById('answerPaneContent').textContent = currentItem.content;
    document.getElementById('answerTip').textContent = currentItem.tip ? '💡 ' + currentItem.tip : '';

    const steps = currentItem.steps && currentItem.steps.length ? currentItem.steps : ['（此題可參考概念解析，或至 Prompt 矩陣實作）'];
    document.getElementById('answerPaneLesson').innerHTML =
      (currentItem.lesson ? '<p><strong>開場／講解：</strong>' + currentItem.lesson + '</p>' : '') +
      '<p><strong>建議流程：</strong></p><ol class="list-decimal ml-5 space-y-1">' + steps.map(s => '<li>' + s + '</li>').join('') + '</ol>' +
      (currentItem.classroom ? '<p class="mt-3 p-4 rounded-xl bg-white border border-indigo-100"><strong>🎯 課堂活動：</strong>' + currentItem.classroom + '</p>' : '');

    document.getElementById('answerPaneExtend').innerHTML =
      (currentItem.extend ? '<p><strong>📚 延伸：</strong>' + currentItem.extend + '</p>' : '') +
      (currentItem.nextStep ? '<p class="p-4 rounded-xl bg-emerald-50 border border-emerald-100 font-bold text-emerald-800">' + currentItem.nextStep + '</p>' : '');

    showPane('content');
    document.getElementById('answerDisplay').classList.remove('hidden');
    document.getElementById('answerDisplay').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  document.querySelectorAll('.practice-pane-btn').forEach(btn => {
    btn.addEventListener('click', () => showPane(btn.dataset.pane));
  });
  root.querySelectorAll('[data-go]').forEach(btn => {
    btn.addEventListener('click', function() {
      if (typeof switchTab === 'function') switchTab(btn.dataset.go);
    });
  });
  function renderCat(catId) {
    const cat = practiceCategories.find(c => c.id === catId);
    const box = document.getElementById('practice-questions');
    if (!cat || !box) return;
    box.innerHTML = cat.items.map(it =>
      '<button type="button" data-key="' + it.key + '" class="practice-q text-left p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/40 font-bold text-slate-800 text-sm leading-snug transition-all">❓ ' + it.q + '</button>'
    ).join('');
    box.querySelectorAll('.practice-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = cat.items.find(x => x.key === btn.dataset.key);
        if (item) renderAnswer(item);
      });
    });
  }

  document.querySelectorAll('.practice-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.practice-tab').forEach(t => {
        t.className = 'practice-tab px-4 py-2 rounded-xl text-sm font-bold border bg-white text-slate-600 border-slate-200 hover:border-indigo-200';
      });
      tab.className = 'practice-tab px-4 py-2 rounded-xl text-sm font-bold border bg-indigo-600 text-white border-indigo-600';
      renderCat(tab.dataset.cat);
    });
  });
  renderCat(practiceCategories[0].id);
}

// ─── Prompt 矩陣（分類 + Markdown + 模擬回覆）───
const promptCategories = {
  teach: {
    label: '教學培訓',
    icon: '🏫',
    role: '資深 AI 素養講師，擅長將技術概念轉為國中以上學生能理解的比喻',
    tasks: ['用 3 個生活比喻解釋「什麼是大語言模型」', '設計 45 分鐘 AI 倫理工作坊大綱（含討論題）', '將以下技術文件改寫為 FAQ 共 8 題'],
    contexts: ['學員無程式背景，第一次接觸 ChatGPT', '企業內訓，學員為行銷與行政人員', '親子共學，家長與國小高年級孩子'],
    styles: ['繁體中文，每段不超過 4 行，必要時用 emoji 標記重點', '專業但友善，附「講師備註」小欄', '互動式：每段結尾加一個反思問題'],
    sampleResponse: '## 大語言模型是什麼？\n\n可以把它想成「讀過整個圖書館的超強接龍玩家」：\n\n1. **接龍**：你給開頭，它猜下一個最合理的字。\n2. **圖書館**：訓練時讀過網頁、書籍、程式碼，所以懂很多主題。\n3. **限制**：它不是在「思考」，而是「統計上最像正確答案的接法」——所以偶爾會自信地說錯。\n\n### 課堂小測\n若 AI 說「2020 年奧運在東京」但沒發生，這屬於什麼現象？→ **幻覺**'
  },
  dev: {
    label: '程式開發',
    icon: '💻',
    role: '資深全端工程師，熟悉 HTML/CSS/JS、RWD、無障礙與 GA4',
    tasks: ['審查以下程式碼的安全與 RWD 問題，條列修正建議', '將需求拆解為可實作的任務清單（含驗收標準）', '為以下函式撰寫單元測試案例（Jest 語法）'],
    contexts: ['專案使用 Tailwind + 原生 JS，無 React', '需支援 Chrome/Safari 手機版', '程式由初學者撰寫，請用淺顯語言解釋'],
    styles: ['輸出 Markdown，程式區塊標註語言', '先給結論與風險等級，再給修正程式', '每個建議附「為什麼」一句話'],
    sampleResponse: '## 審查結論（優先處理）\n\n| 等級 | 問題 | 建議 |\n|------|------|------|\n| 🔴 高 | 按鈕無 `aria-label` | 螢幕閱讀器無法辨識 |\n| 🟡 中 | 圖片未設 `width/height` | 易造成 CLS 版面跳動 |\n\n```html\n<button aria-label="提交表單" class="...">送出</button>\n```\n\n**驗收**：Lighthouse 無障礙分數 ≥ 90。'
  },
  marketing: {
    label: '文案行銷',
    icon: '📣',
    role: '品牌內容策略師，熟悉 SEO、GEO 與轉換文案',
    tasks: ['撰寫 Landing Page 首屏標題 + 副標 + 3 個賣點（各 40 字內）', '將長文拆成 5 則 Threads 貼文（含 CTA）', '針對搜尋意圖「XXX」寫 meta description（120 字內）'],
    contexts: ['品牌：手工皂工作室，目標：每月 30 筆 LINE 詢問', '語氣：專業但不推銷，強調成分與敏感肌', '需符合 GEO：段落可被子題摘要'],
    styles: ['繁體中文，動詞開頭 CTA', '附「SEO 檢查」：主關鍵字是否出現於標題與首段', '條列式，一段一結論'],
    sampleResponse: '## 首屏文案草案\n\n**H1**：台南手工皂推薦｜敏感肌也能安心的冷製皂\n\n**副標**：pH 8–9、無 SLS，每批附成分檢驗說明——先試用再決定。\n\n### 賣點\n1. 在地小量製作，非工廠量產香精\n2. 提供 24 小時貼片測試指南\n3. 滿額附贈「選皂流程圖」PDF\n\n**CTA**：加 LINE 領選購檢查表 →\n\n> GEO 提示：首段已含「台南」「手工皂」「敏感肌」三個可引用實體。'
  },
  image: {
    label: '影像創作',
    icon: '📸',
    role: '商業攝影指導與 AI 影像 Prompt 專家',
    tasks: ['將拍攝需求轉為 Midjourney 英文 Prompt（含光線與鏡頭）', '列出婚禮晚宴拍攝 Checklist 20 項', '分析這張照片的曝光問題並給修正步驟'],
    contexts: ['現場：婚宴廳燈光偏黃，無閃燈', '器材：全片幅 + 50mm f/1.8', '後製：Lightroom，需保留膚色自然'],
    styles: ['攝影參數用中英文對照', 'Prompt 用英文，說明用繁中', '附「品質檢查與優化建議」'],
    sampleResponse: '## Midjourney Prompt\n\n```\ncommercial wedding portrait, soft window light, 50mm f/1.8, shallow depth of field, warm skin tones, elegant dress detail, photorealistic, no text --ar 2:3 --style raw\n```\n\n### 現場建議\n- 白平衡：5500K 起，依現場試拍微調\n- 快門：≥ 1/125 避免晃動\n- **避免**：正面硬閃導致油亮膚感'
  },
  data: {
    label: '資料分析',
    icon: '📊',
    role: '數據分析顧問，熟悉 GA4、Search Console 與 Excel',
    tasks: ['解讀以下 GA4 數據異常的可能原因（至少 3 種）', '設計每週內容成效報表欄位與解讀方式', '將自然語言問題轉為 SQL 查詢邏輯（偽代碼）'],
    contexts: ['電商內容站，主要轉換：表單詢單', '本週：自然流量 +20% 但詢單 -10%', '團隊非技術背景，需白話報告'],
    styles: ['先結論再細節', '用表格呈現假設與驗證步驟', '標註「需回 GA4 確認」的項目'],
    sampleResponse: '## 診斷結論\n\n流量升、詢單降 → **意圖或轉換路徑問題**，較非 SEO 排名問題。\n\n| 假設 | 驗證方式 |\n|------|----------|\n| 新流量來自低意圖關鍵字 | Search Console 看查詢詞 CTR |\n| CTA 點擊率下降 | GA4 事件 `click_cta` 週比較 |\n| 表單技術故障 | 測試送出 + 即時報表 |\n\n**下週行動**：A/B 測試首屏 CTA 文案（動詞 + 具體利益）。'
  },
  product: {
    label: '產品與 PM',
    icon: '🧩',
    role: '產品經理，熟悉 PRD、User Story 與敏捷迭代',
    tasks: ['將模糊需求寫成 User Story + 驗收標準', '列出 MVP 功能優先級（MoSCoW）', '撰寫功能上線後的 GA4 追蹤規格'],
    contexts: ['新功能：線上課程預約系統', '用戶：25–40 歲自學者', '時程：2 週 MVP'],
    styles: ['Markdown 表格 + 條列', '每個 Story 含「作為…我想要…以便…」', '附風險與依賴項'],
    sampleResponse: '## User Story\n\n**US-01** 作為訪客，我想要在 3 步內完成預約，以便快速鎖定時段。\n\n**驗收標準**\n- [ ] 選日期 → 選時段 → 填姓名電話，共 ≤ 3 屏\n- [ ] 成功後 GA4 觸發 `generate_lead`\n- [ ] 手機版按鈕 ≥ 44px 高\n\n### MoSCoW\n| Must | Should | Could |\n|------|--------|-------|\n| 預約表單 | Email 確認信 | 行事曆同步 |'
  }
};

const promptScenarios = {
  teach: [
    { id: 't-workshop', title: '45 分鐘 AI 素養工作坊', desc: '適合學校／企業內訓，從體驗到反思完整帶完一節課。',
      workflow: [{ n: 1, t: '破冰', a: 'AI 接龍遊戲 5 分鐘', tool: 'ChatGPT' }, { n: 2, t: '概念', a: 'LLM 白話 + 幻覺案例', tool: '本站練習箱' }, { n: 3, t: '實作', a: '用 Prompt 矩陣寫一題並分享', tool: 'ChatGPT' }, { n: 4, t: '反思', a: '分組：什麼不該交給 AI', tool: '白板' }],
      pitfalls: ['只秀華麗輸出、不教審稿', '讓學員貼個資到免費版', '沒有課後作業延伸'],
      extraMd: '\n# Teaching Flow\n請依 45 分鐘節奏產出：破冰活動、講義大綱、實作任務、反思問題各一段。',
      sampleResponse: '## 45 分鐘工作坊流程\n\n| 時間 | 活動 | 講師動作 |\n|------|------|----------|\n| 0–5 | 接龍遊戲 | 投影 AI 回答 |\n| 5–15 | LLM 白話 | 用「圖書館接龍」比喻 |\n| 15–30 | Prompt 實作 | 發 .md 模板 |\n| 30–40 | 倫理討論 | 金流/醫療不可全自動 |\n| 40–45 | 作業說明 | 回家完成 1 個 Prompt' }
  ],
  dev: [
    { id: 'd-review', title: 'Code Review 實戰（含 RWD/a11y）', desc: '把 AI 當初級審查員，人類做最終合併。',
      workflow: [{ n: 1, t: '貼 Code', a: '附檔案結構與框架說明', tool: 'Cursor / ChatGPT' }, { n: 2, t: '要清單', a: '要求依等級條列問題', tool: 'Prompt .md' }, { n: 3, t: '人工驗證', a: '跑 Lighthouse + 手機實機', tool: 'Chrome DevTools' }, { n: 4, t: '合併', a: '只合併通過測試的修改', tool: 'Git' }],
      pitfalls: ['未貼完整元件就要求重構', '直接合併未測試的 AI Code', '忽略 XSS 與表單驗證'],
      extraMd: '\n# Code Review Rules\n先列 🔴高 🟡中 🟢低 風險，再給修正片段。每項附「為什麼」。',
      sampleResponse: '## 審查結論\n\n🔴 表單無 server-side 驗證\n🟡 按鈕 tap 區域 < 44px\n\n```html\n<button class="min-h-[44px] min-w-[44px]" aria-label="送出">...</button>\n```' }
  ],
  marketing: [
    { id: 'm-geo', title: 'SEO + GEO 文章產出流程', desc: 'AI 出初稿，人補 E-E-A-T 與真實案例。',
      workflow: [{ n: 1, t: '關鍵字', a: 'Search Console 匯出 10 個查詢', tool: 'GSC' }, { n: 2, t: '大綱', a: 'AI 產 H2/H3 + FAQ', tool: 'ChatGPT' }, { n: 3, t: '人工', a: '補案例、數據、作者經歷', tool: '人' }, { n: 4, t: '上架', a: '檢查 GA4 事件與內部連結', tool: 'GA4' }],
      pitfalls: ['純 AI 量產無實體經驗', '關鍵字堆砌', '無更新日期與作者'],
      extraMd: '\n# GEO Requirements\n每段開頭一句可被 AI 摘要的結論；附 FAQ schema 建議。',
      sampleResponse: '## H2 草稿\n\n**結論句**：台南手工皂選購要看 pH 與成分表，而非只看包裝。\n\n### FAQ\nQ: 敏感肌可以用嗎？\nA: 建議先貼片測試 24 小時…' }
  ],
  image: [
    { id: 'i-product', title: '電商產品白底圖（MJ / DALL·E）', desc: '從拍攝需求到英文 Prompt，含排除項。',
      workflow: [{ n: 1, t: '定規格', a: '比例、背景、陰影方向', tool: '簡報' }, { n: 2, t: '寫 Prompt', a: '主體+光線+鏡頭+--ar', tool: 'Midjourney' }, { n: 3, t: '選圖', a: '4 張中選 1，檢查邊緣', tool: '人眼' }, { n: 4, t: '後製', a: '去背、色準、加 Logo', tool: 'Photoshop' }],
      pitfalls: ['文字 Logo 亂碼', '材質塑膠感', '未檢查商用授權'],
      imagePreset: 'product photography, white seamless background, soft diffused studio light, 85mm lens, sharp focus, commercial catalog style, no text, no watermark --ar 1:1 --style raw',
      extraMd: '\n# Image Output\n請輸出：① 英文 MJ Prompt ② 中文拍攝對照建議 ③ 品質檢查與優化建議 3 點。',
      sampleResponse: '## Midjourney\n```\norganic handmade soap bar on white seamless background, soft diffused studio light, 85mm, catalog style, no text --ar 1:1\n```\n\n### 品質檢查與優化建議\n- 標籤文字易亂碼 → 加 `--no text`\n- 邊緣鋸齒 → 後製 pen tool\n- 商用前再檢查授權與色準一致性' },
    { id: 'i-wedding', title: '婚禮人像氛圍圖（參考實拍光位）', desc: '先懂攝影再打光詞，再生成。',
      workflow: [{ n: 1, t: '分析光位', a: '窗光/逆光/閃燈?', tool: '攝影學堂' }, { n: 2, t: 'Prompt', a: '50mm f/1.8 + skin tone', tool: 'MJ' }, { n: 3, t: '對照', a: '與實拍範例比膚色', tool: 'Lightroom' }],
      pitfalls: ['手指數量錯誤', '臉部塑膠感', '禮服細節穿幫'],
      imagePreset: 'elegant wedding portrait, soft window light, 50mm f/1.8, shallow depth of field, natural skin tones, photorealistic, no text --ar 2:3',
      extraMd: '\n# Image Output\n附「若現場無閃燈」的拍攝 Plan B。',
      sampleResponse: '## Prompt\n`wedding portrait, soft side window light, 50mm f/1.8, warm skin, no text --ar 2:3`\n\n**Plan B**：提高 ISO、找窗邊、避免正面硬閃。' }
  ],
  data: [
    { id: 'da-weekly', title: 'GA4 週報解讀與行動建議', desc: '流量升、轉換降的典型診斷流程。',
      workflow: [{ n: 1, t: '匯出', a: '流量來源 + 著陸頁 + 事件', tool: 'GA4' }, { n: 2, t: 'Prompt', a: '貼數據要求 3 假設', tool: 'ChatGPT' }, { n: 3, t: '驗證', a: '逐項回 GA4 查', tool: '人' }],
      pitfalls: ['只信 AI 不查原始報表', '混淆相關與因果'],
      extraMd: '\n# Output\n表格：假設 | 驗證方式 | 下週行動',
      sampleResponse: '## GA4 週報診斷（範例）\n\n| 假設 | 驗證方式 |\n|------|----------|\n| 低意圖關鍵字 | GSC 查詢詞與 CTR |\n| CTA 弱化 | GA4 事件週比較 |\n| 表單故障 | 實測送出 + 即時報表 |\n\n**下週行動**：A/B 測試首屏 CTA（動詞 + 具體利益）。' }
  ],
  product: [
    { id: 'p-mvp', title: '2 週 MVP 從需求到追蹤', desc: 'PM 用 AI 寫 PRD，但驗收與 GA4 人類定稿。',
      workflow: [{ n: 1, t: '訪談', a: '整理 pain points', tool: '筆記' }, { n: 2, t: 'PRD', a: 'User Story + MoSCoW', tool: 'ChatGPT' }, { n: 3, t: '追蹤', a: 'GA4 事件規格', tool: 'GTM' }],
      pitfalls: ['Story 無驗收標準', '漏掉手機版觸控尺寸'],
      extraMd: '\n# Output\nMust/Should/Could 表 + 每 Story 驗收 checkbox',
      sampleResponse: '## MVP 需求摘要\n\n**US-01** 作為訪客，我想在 3 步內完成預約，以便快速鎖定時段。\n\n### 驗收標準\n- [ ] 手機按鈕高度 ≥ 44px\n- [ ] 成功預約觸發 `generate_lead` 事件\n\n| Must | Should |\n|------|--------|\n| 預約表單 | Email 確認信 |' }
  ]
};

const promptTechniques = [
  { id: 'cot', label: 'CoT 思維鏈', md: '\n# Technique\n請先列出推理步驟，再給最終答案。' },
  { id: 'few', label: '📎 Few-shot', md: '\n# Technique\n以下為 2 個範例，請模仿格式處理第三個輸入。' },
  { id: 'json', label: '{ } JSON 輸出', md: '\n# Output Format\n僅輸出合法 JSON，不要 markdown 外文字。' },
  { id: 'cite', label: '📌 要求引用', md: '\n# Constraints\n每個事實附來源；不確定請寫「需人工查證」。' }
];

let promptState = { category: 'teach', scenarioId: '', role: '', task: '', context: '', style: '', techniques: [] };
let promptFlowState = { scenarioId: '', activeStep: 0, done: [] };

function getActiveScenario() {
  const list = promptScenarios[promptState.category] || [];
  return list.find(s => s.id === promptState.scenarioId) || list[0] || null;
}

function buildMarkdownPrompt() {
  const s = promptState;
  const cat = promptCategories[s.category];
  const sc = getActiveScenario();
  let md = '# Role\n' + (s.role || cat.role) + '\n\n# Task\n' + (s.task || cat.tasks[0]) +
    '\n\n# Context\n' + (s.context || cat.contexts[0]) + '\n\n# Style & Constraints\n' + (s.style || cat.styles[0]);
  if (sc && sc.extraMd) md += sc.extraMd;
  (s.techniques || []).forEach(tid => {
    const t = promptTechniques.find(x => x.id === tid);
    if (t) md += t.md;
  });
  if (promptState.category === 'image' && promptState.imagePrompt) {
    md += '\n\n# Image Generation Brief\n' + promptState.imagePrompt;
  }
  md += '\n\n# Output Format\n- 使用繁體中文（影像 Prompt 英文除外）\n- 標題用 Markdown\n- 若不確定事實，標註「需人工查證」\n';
  return md;
}

function initPromptLab() {
  const catBar = document.getElementById('prompt-cat-bar');
  if (!catBar) return;

  catBar.innerHTML = Object.entries(promptCategories).map(function(entry) {
    var id = entry[0], c = entry[1];
    return '<button type="button" data-pcat="' + id + '" class="prompt-cat-btn px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ' +
      (id === 'teach' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-slate-200') + '">' + c.icon + ' ' + c.label + '</button>';
  }).join('');

  var techBar = document.getElementById('prompt-tech-bar');
  if (techBar) {
    techBar.innerHTML = '<span class="text-xs font-bold text-slate-400 w-full mb-1">進階技巧（可複選）</span>' +
      promptTechniques.map(function(t) {
        return '<button type="button" data-tech="' + t.id + '" class="prompt-tech-btn px-3 py-1.5 rounded-lg text-xs font-bold border bg-white border-slate-200 text-slate-600">' + t.label + '</button>';
      }).join('');
    function setTechBtnState(btn, active) {
      btn.className = active
        ? 'prompt-tech-btn px-3 py-1.5 rounded-lg text-xs font-bold border bg-purple-600 border-purple-600 text-white'
        : 'prompt-tech-btn px-3 py-1.5 rounded-lg text-xs font-bold border bg-white border-slate-200 text-slate-700';
    }
    techBar.querySelectorAll('.prompt-tech-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.dataset.tech;
        var idx = promptState.techniques.indexOf(id);
        if (idx >= 0) {
          promptState.techniques.splice(idx, 1);
          setTechBtnState(btn, false);
        } else {
          promptState.techniques.push(id);
          setTechBtnState(btn, true);
        }
        updatePromptOutputs();
      });
    });
  }

  function renderScenarioPanel(id) {
    var panel = document.getElementById('prompt-scenario-panel');
    if (!panel) return;
    var list = promptScenarios[id] || [];
    if (!list.length) { panel.innerHTML = '<p class="text-sm text-slate-500">此分類暫無情境流程。</p>'; return; }
    panel.innerHTML = '<label class="block text-xs font-bold text-purple-700 mb-2">Step 1 · 實戰情境（含上課／產圖流程）</label>' +
      '<div class="flex flex-wrap gap-2 mb-3" id="prompt-scenario-btns"></div><p id="prompt-scenario-desc" class="text-sm text-slate-600"></p>';
    var btns = document.getElementById('prompt-scenario-btns');
    list.forEach(function(sc, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'px-3 py-2 rounded-xl text-sm font-bold border ' + (i === 0 ? 'bg-purple-600 text-white border-purple-600' : 'bg-white border-slate-200');
      b.textContent = sc.title;
      b.onclick = function() {
        promptState.scenarioId = sc.id;
        btns.querySelectorAll('button').forEach(function(x) { x.className = 'px-3 py-2 rounded-xl text-sm font-bold border bg-white border-slate-200'; });
        b.className = 'px-3 py-2 rounded-xl text-sm font-bold border bg-purple-600 text-white border-purple-600';
        loadScenario(sc);
      };
      btns.appendChild(b);
    });
    promptState.scenarioId = list[0].id;
    loadScenario(list[0]);
  }

  function loadScenario(sc) {
    var desc = document.getElementById('prompt-scenario-desc');
    if (desc) desc.textContent = sc.desc;
    promptFlowState.scenarioId = sc.id;
    promptFlowState.activeStep = 0;
    promptFlowState.done = [];
    renderWorkflow(sc);
    renderPitfalls(sc);
    if (sc.imagePreset) {
      promptState.imagePrompt = sc.imagePreset;
      renderImageBuilder(sc.imagePreset);
    } else {
      promptState.imagePrompt = '';
      var ib = document.getElementById('prompt-image-builder');
      if (ib) { ib.classList.add('hidden'); ib.innerHTML = ''; }
    }
    updatePromptOutputs();
  }

  function renderWorkflow(sc) {
    var wp = document.getElementById('prompt-workflow-panel');
    if (!wp || !sc.workflow) return;
    var total = sc.workflow.length || 0;
    wp.innerHTML = '<p class="text-xs font-black text-slate-500 uppercase mb-2">📋 實際帶課／執行流程</p>' +
      '<div class="mb-3 p-3 rounded-xl border border-slate-200 bg-white">' +
      '<div class="flex items-center justify-between text-xs text-slate-500 mb-1"><span>流程進度</span><span id="flow-progress-label">0 / ' + total + '</span></div>' +
      '<div class="h-2 rounded-full bg-slate-100 overflow-hidden"><div id="flow-progress-bar" class="h-full bg-purple-500" style="width:0%"></div></div>' +
      '</div>' +
      sc.workflow.map(function(w) {
        return '<button type="button" data-flow-step="' + w.n + '" class="w-full text-left flex gap-3 p-3 rounded-xl bg-white border border-slate-100 hover:border-purple-300 transition-colors"><span class="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-sm shrink-0">' + w.n + '</span>' +
          '<div><p class="font-bold text-slate-900">' + w.t + '</p><p class="text-sm text-slate-600">' + w.a + '</p><p class="text-xs text-purple-600 font-bold mt-1">工具：' + w.tool + '（點擊套用）</p></div></button>';
      }).join('') +
      '<div id="prompt-flow-trigger" class="hidden mt-3 p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-bold"></div>';
    function updateFlowProgress() {
      var label = document.getElementById('flow-progress-label');
      var bar = document.getElementById('flow-progress-bar');
      var doneCount = promptFlowState.done.length;
      if (label) label.textContent = doneCount + ' / ' + total;
      if (bar) bar.style.width = (total ? Math.round((doneCount / total) * 100) : 0) + '%';
    }
    wp.querySelectorAll('[data-flow-step]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var stepNo = Number(btn.getAttribute('data-flow-step'));
        var step = sc.workflow.find(function(x) { return x.n === stepNo; });
        if (!step) return;
        wp.querySelectorAll('[data-flow-step]').forEach(function(b) {
          b.classList.remove('ring-2', 'ring-purple-300');
        });
        btn.classList.add('ring-2', 'ring-purple-300');
        promptFlowState.activeStep = stepNo;
        if (promptFlowState.done.indexOf(stepNo) < 0) promptFlowState.done.push(stepNo);
        updateFlowProgress();
        promptState.context = '流程 Step ' + step.n + '：' + step.t + '。執行動作：' + step.a + '。工具：' + step.tool + '。';
        promptState.task = '請先完成流程 Step ' + step.n + '（' + step.t + '），再輸出本階段可交付內容。';
        promptState.style = '先列本步驟目標，再給可執行清單；最後補下一步銜接。';
        renderFactorButtons('task', promptState.task, [promptState.task].concat(promptCategories[promptState.category].tasks || []));
        renderFactorButtons('context', promptState.context, [promptState.context].concat(promptCategories[promptState.category].contexts || []));
        renderFactorButtons('style', promptState.style, [promptState.style].concat(promptCategories[promptState.category].styles || []));
        var trigger = document.getElementById('prompt-flow-trigger');
        if (trigger) {
          trigger.classList.remove('hidden');
          trigger.textContent = '已觸發：Step ' + step.n + ' 已套用到 Task / Context / Style，右側 Prompt 與預覽已更新。';
        }
        updatePromptOutputs();
      });
    });
    updateFlowProgress();
  }

  function renderPitfalls(sc) {
    var el = document.getElementById('prompt-pitfalls');
    if (!el) return;
    if (!sc.pitfalls || !sc.pitfalls.length) { el.classList.add('hidden'); return; }
    el.classList.remove('hidden');
    el.innerHTML = '<strong>⚠️ 常見踩雷：</strong><ul class="list-disc ml-5 mt-2">' +
      sc.pitfalls.map(function(p) { return '<li>' + p + '</li>'; }).join('') + '</ul>';
  }

  function renderImageBuilder(preset) {
    var ib = document.getElementById('prompt-image-builder');
    if (!ib) return;
    ib.classList.remove('hidden');
    var subjects = ['產品白底', '婚禮人像', '美食側光', '風景大片', '科技主視覺'];
    var lights = ['soft window light', 'golden hour', 'studio softbox', 'neon rim light'];
    var lenses = ['50mm f/1.8', '85mm f/1.4', '24mm wide', 'macro close-up'];
    var imagePool = {
      '產品白底': [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'
      ],
      '婚禮人像': [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21c?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80'
      ],
      '美食側光': [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80'
      ],
      '風景大片': [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80'
      ],
      '科技主視覺': [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80'
      ]
    };
    var lightPool = {
      'soft window light': [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80'
      ],
      'golden hour': [
        'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=80'
      ],
      'studio softbox': [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80'
      ],
      'neon rim light': [
        'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1542204625-de293a4f9c67?auto=format&fit=crop&w=900&q=80'
      ]
    };
    var lensPool = {
      '50mm f/1.8': [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
      ],
      '85mm f/1.4': [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80'
      ],
      '24mm wide': [
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80'
      ],
      'macro close-up': [
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1459666644539-a9755287d6b0?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80'
      ]
    };
    var chosen = { subject: subjects[0], light: lights[0], lens: lenses[0] };
    ib.innerHTML = '<p class="text-xs font-black text-amber-800 mb-2">🖼 產圖 Prompt 組裝器</p>' +
      '<div class="flex flex-wrap gap-2 mb-2" id="img-subject-btns"></div>' +
      '<div class="flex flex-wrap gap-2 mb-2" id="img-light-btns"></div>' +
      '<div class="flex flex-wrap gap-2 mb-3" id="img-lens-btns"></div>' +
      '<textarea id="img-prompt-out" class="w-full p-3 rounded-xl border border-amber-200 text-xs font-mono h-24">' + preset + '</textarea>' +
      '<div class="mt-3 rounded-xl border border-amber-200 bg-white p-3">' +
      '<div class="flex items-center justify-between gap-2 mb-2">' +
      '<p class="text-xs font-black text-slate-700">🎯 模擬產圖結果（免費參考圖）</p>' +
      '<button type="button" id="img-refresh-ref" class="px-2 py-1 rounded-lg text-xs font-bold border border-amber-200 bg-amber-50 text-amber-800">換一組參考</button>' +
      '</div>' +
      '<div id="img-ref-grid" class="grid grid-cols-1 md:grid-cols-3 gap-2"></div>' +
      '<p id="img-ref-caption" class="text-xs text-slate-600 mt-2"></p>' +
      '</div>' +
      '<p class="text-xs text-amber-700 mt-2">提示：商用前檢查文字/手指/授權；品牌主視覺建議實拍+AI輔助。</p>';
    function buildPrompt() {
      return chosen.subject + ', ' + chosen.light + ', ' + chosen.lens + ', photorealistic, no text, no watermark --ar 1:1';
    }
    function updatePromptText() {
      var ta = document.getElementById('img-prompt-out');
      promptState.imagePrompt = buildPrompt();
      if (ta) ta.value = promptState.imagePrompt;
      updatePromptOutputs();
    }
    function renderRefs() {
      var grid = document.getElementById('img-ref-grid');
      var caption = document.getElementById('img-ref-caption');
      if (!grid || !caption) return;
      var pool = imagePool[chosen.subject] || imagePool[subjects[0]];
      var lp = lightPool[chosen.light] || lightPool[lights[0]];
      var kp = lensPool[chosen.lens] || lensPool[lenses[0]];
      var sIdx = (lights.indexOf(chosen.light) + lenses.indexOf(chosen.lens) + pool.length) % pool.length;
      var lIdx = (subjects.indexOf(chosen.subject) + lenses.indexOf(chosen.lens) + lp.length) % lp.length;
      var kIdx = (subjects.indexOf(chosen.subject) + lights.indexOf(chosen.light) + kp.length) % kp.length;
      var cards = [
        { img: pool[sIdx], note: '主題參考：' + chosen.subject },
        { img: lp[lIdx], note: '光線參考：' + chosen.light },
        { img: kp[kIdx], note: '鏡頭參考：' + chosen.lens }
      ];
      var seen = {};
      var list = cards.map(function(card, idx) {
        var img = card.img;
        if (seen[img]) {
          img = pool[(sIdx + idx + 1) % pool.length];
          card.note += '（備援）';
        }
        seen[img] = true;
        return { img: img, note: card.note };
      });
      grid.innerHTML = list.map(function(x) {
        return '<figure class="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">' +
          '<img src="' + x.img + '" alt="' + chosen.subject + ' 參考圖" class="w-full h-24 object-cover" loading="lazy" onerror="this.onerror=null;this.src=\'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80\';" />' +
          '<figcaption class="p-2 text-[11px] text-slate-600 leading-relaxed">' + x.note + '</figcaption>' +
          '</figure>';
      }).join('');
      caption.textContent = '目前組合：' + chosen.subject + ' / ' + chosen.light + ' / ' + chosen.lens + '。三張分別對應主題、光線、鏡頭，切換任一項都會換新圖。';
    }
    function bindImg(containerId, opts, prefix) {
      var c = document.getElementById(containerId);
      opts.forEach(function(opt) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'px-2 py-1 rounded-lg text-xs font-bold bg-white border border-amber-200';
        b.textContent = opt;
        b.onclick = function() {
          if (containerId === 'img-subject-btns') chosen.subject = opt;
          if (containerId === 'img-light-btns') chosen.light = opt;
          if (containerId === 'img-lens-btns') chosen.lens = opt;
          updatePromptText();
          renderRefs();
        };
        c.appendChild(b);
      });
    }
    bindImg('img-subject-btns', subjects, '');
    bindImg('img-light-btns', lights, '');
    bindImg('img-lens-btns', lenses, '');
    updatePromptText();
    renderRefs();
    var refreshBtn = document.getElementById('img-refresh-ref');
    if (refreshBtn) refreshBtn.onclick = renderRefs;
  }

  function loadCategory(id) {
    promptState.category = id;
    promptState.techniques = [];
    var cat = promptCategories[id];
    promptState.role = cat.role;
    promptState.task = cat.tasks[0];
    promptState.context = cat.contexts[0];
    promptState.style = cat.styles[0];
    renderScenarioPanel(id);
    renderFactorButtons('role', cat.role, [cat.role]);
    renderFactorButtons('task', cat.tasks[0], cat.tasks);
    renderFactorButtons('context', cat.contexts[0], cat.contexts);
    renderFactorButtons('style', cat.styles[0], cat.styles);
    if (techBar) techBar.querySelectorAll('.prompt-tech-btn').forEach(function(b) {
      b.className = 'prompt-tech-btn px-3 py-1.5 rounded-lg text-xs font-bold border bg-white border-slate-200 text-slate-700';
    });
    updatePromptOutputs();
  }

  function renderFactorButtons(field, selected, options) {
    var el = document.getElementById('matrix-' + field);
    if (!el) return;
    el.innerHTML = options.map(function(opt) {
      var active = opt === selected;
      return '<button type="button" class="prompt-opt px-3 py-2 text-sm font-bold rounded-xl border ' +
        (active ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 border-slate-200 text-slate-700') +
        '" data-field="' + field + '" data-val="' + encodeURIComponent(opt) + '">' +
        (opt.length > 42 ? opt.slice(0, 40) + '…' : opt) + '</button>';
    }).join('');
    el.querySelectorAll('.prompt-opt').forEach(function(btn) {
      btn.addEventListener('click', function() {
        promptState[field] = decodeURIComponent(btn.dataset.val);
        el.querySelectorAll('.prompt-opt').forEach(function(b) {
          b.className = 'prompt-opt px-3 py-2 text-sm font-bold rounded-xl border bg-slate-50 border-slate-200 text-slate-700';
        });
        btn.className = 'prompt-opt px-3 py-2 text-sm font-bold rounded-xl border bg-purple-600 text-white border-purple-600';
        updatePromptOutputs();
      });
    });
  }

  catBar.querySelectorAll('.prompt-cat-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      catBar.querySelectorAll('.prompt-cat-btn').forEach(function(b) {
        b.className = 'prompt-cat-btn px-4 py-2.5 rounded-xl text-sm font-bold border bg-white text-slate-600 border-slate-200';
      });
      btn.className = 'prompt-cat-btn px-4 py-2.5 rounded-xl text-sm font-bold border bg-purple-600 text-white border-purple-600';
      loadCategory(btn.dataset.pcat);
    });
  });

  loadCategory('teach');
}

var promptStreamCancel = null;

function cancelPromptStream() {
  if (promptStreamCancel) {
    promptStreamCancel();
    promptStreamCancel = null;
  }
}

function composeSimPreviewMarkdown() {
  var sc = getActiveScenario();
  var cat = promptCategories[promptState.category];
  if (!cat) return buildFallbackSimPreview();
  if (promptState.techniques.indexOf('json') >= 0) {
    return '## 結構化輸出（JSON 模式範例）\n\n```json\n{\n  "summary": "依你的 Task 產出重點摘要",\n  "steps": ["步驟一", "步驟二", "步驟三"],\n  "risks": ["需人工查證的項目"],\n  "next_action": "建議的下一步"\n}\n```\n\n> 已勾選「JSON 輸出」技巧：實際使用時請要求模型**只**回傳合法 JSON。';
  }
  var base = (sc && sc.sampleResponse) ? sc.sampleResponse : cat.sampleResponse;
  if (!base || !String(base).trim()) return buildFallbackSimPreview();
  var flowHint = '';
  if (sc && promptFlowState.scenarioId === sc.id && promptFlowState.activeStep) {
    var active = (sc.workflow || []).find(function(x) { return x.n === promptFlowState.activeStep; });
    if (active) {
      flowHint = '### 目前流程焦點\n- Step ' + active.n + '：' + active.t + '\n- 動作：' + active.a + '\n- 工具：' + active.tool + '\n\n';
    }
  }
  var roleShort = (promptState.role || cat.role).slice(0, 36);
  var taskShort = (promptState.task || cat.tasks[0]).slice(0, 48);
  return '## 依目前 Prompt 設定的回覆預覽\n\n> 角色：' + roleShort + (roleShort.length >= 36 ? '…' : '') +
    '｜任務：' + taskShort + (taskShort.length >= 48 ? '…' : '') + '\n\n' + flowHint + base;
}

function buildFallbackSimPreview() {
  var cat = promptCategories[promptState.category];
  var task = promptState.task || (cat && cat.tasks[0]) || '完成指定任務';
  return '## 回覆預覽\n\n依你目前的 **Role / Task / Context** 組合，AI 通常會：\n\n1. 先重述需求與限制\n2. 用條列或表格整理重點\n3. 附上可執行的下一步\n\n**本次任務**：' + task + '\n\n> 請將左側 .md Prompt 貼到 ChatGPT / Claude 取得正式結果；此處為教學用模擬預覽。';
}

function splitMarkdownBlocks(md) {
  var lines = md.split('\n');
  var blocks = [];
  var buf = [];
  var inTable = false;
  var inCode = false;
  function flush() {
    if (buf.length) {
      var chunk = buf.join('\n').trim();
      if (chunk) blocks.push(chunk);
      buf = [];
    }
  }
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (/^```/.test(line.trim())) {
      inCode = !inCode;
      buf.push(line);
      continue;
    }
    if (inCode) {
      buf.push(line);
      continue;
    }
    if (/^\s*\|/.test(line)) {
      if (!inTable && buf.length) flush();
      inTable = true;
      buf.push(line);
      continue;
    }
    if (inTable) {
      inTable = false;
      flush();
    }
    if (line.trim() === '') {
      flush();
      continue;
    }
    buf.push(line);
  }
  flush();
  return blocks.length ? blocks : [md.trim()];
}

function parseMarkdownTableLines(tableLines) {
  var rows = tableLines.map(function(line) {
    return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(function(c) { return c.trim(); });
  }).filter(function(cols) { return cols.some(Boolean); });
  if (!rows.length) return '';
  var header = rows[0];
  var bodyStart = 1;
  if (rows.length > 1 && /^[-:\s|]+$/.test(rows[1].join(''))) bodyStart = 2;
  var body = rows.slice(bodyStart);
  if (!body.length && bodyStart === 1) return '';
  var thead = '<thead><tr>' + header.map(function(h) {
    return '<th class="border border-slate-200 bg-slate-50 px-2 py-1.5 text-left font-bold">' + mdEscape(h) + '</th>';
  }).join('') + '</tr></thead>';
  var tbody = '<tbody>' + body.map(function(cols) {
    return '<tr>' + cols.map(function(c) {
      return '<td class="border border-slate-200 px-2 py-1.5 align-top">' + mdEscape(c) + '</td>';
    }).join('') + '</tr>';
  }).join('') + '</tbody>';
  return '<div class="overflow-x-auto my-3"><table class="min-w-full text-xs border-collapse">' + thead + tbody + '</table></div>';
}

function replaceMarkdownTables(text) {
  var lines = text.split('\n');
  var out = [];
  var i = 0;
  while (i < lines.length) {
    if (/^\s*\|/.test(lines[i])) {
      var tableLines = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        tableLines.push(lines[i]);
        i++;
      }
      out.push(parseMarkdownTableLines(tableLines));
    } else {
      out.push(lines[i]);
      i++;
    }
  }
  return out.join('\n');
}

function mdEscape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function markdownToSimpleHtml(md) {
  if (!md || !String(md).trim()) {
    return '<p class="text-slate-500">請先選擇應用分類與實戰情境，此處會顯示對應的 AI 回覆範例。</p>';
  }
  var html = md;
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function(_, lang, code) {
    return '<pre class="bg-slate-900 text-emerald-300 p-3 rounded-lg text-xs whitespace-pre-wrap break-words overflow-x-auto my-2">' + mdEscape(code.trim()) + '</pre>';
  });
  html = replaceMarkdownTables(html);
  html = html
    .replace(/^### (.+)$/gm, function(_, t) { return '<h4 class="font-black text-slate-900 mt-4 mb-2">' + mdEscape(t) + '</h4>'; })
    .replace(/^## (.+)$/gm, function(_, t) { return '<h3 class="font-black text-lg text-purple-900 mt-4 mb-2">' + mdEscape(t) + '</h3>'; })
    .replace(/^# (.+)$/gm, function(_, t) { return '<h2 class="font-black text-xl text-purple-900 mb-3">' + mdEscape(t) + '</h2>'; })
    .replace(/\*\*(.+?)\*\*/g, function(_, t) { return '<strong>' + mdEscape(t) + '</strong>'; })
    .replace(/^> (.+)$/gm, function(_, t) { return '<blockquote class="border-l-4 border-purple-300 pl-3 text-slate-600 my-2">' + mdEscape(t) + '</blockquote>'; })
    .replace(/^\d+\. (.+)$/gm, function(_, t) { return '<li class="ml-4 list-decimal">' + mdEscape(t) + '</li>'; })
    .replace(/^- (.+)$/gm, function(_, t) { return '<li class="ml-4 list-disc">' + mdEscape(t) + '</li>'; });
  html = html.replace(/((?:<li class="ml-4 list-(?:disc|decimal)">[\s\S]*?<\/li>\s*)+)/g, function(m) {
    var kind = m.indexOf('list-decimal') >= 0 ? 'ol' : 'ul';
    var cls = kind === 'ol' ? 'list-decimal' : 'list-disc';
    return '<' + kind + ' class="' + cls + ' pl-5 my-2 space-y-1">' + m + '</' + kind + '>';
  });
  html = html.replace(/\n\n+/g, '<br/><br/>').replace(/\n/g, '<br/>');
  return html;
}

function renderPromptSimShell() {
  return '<p class="text-xs font-black text-slate-400 uppercase mb-3">AI 回覆草稿預覽（模擬）</p>' +
    '<div class="rounded-xl border border-purple-100 bg-white p-3 text-xs text-slate-600 mb-3">' +
    '<p><strong>閱讀順序：</strong>1) 標題結論 2) 條列或表格 3) 細節與程式碼。術語不懂可回「概念互動練習箱」。</p>' +
    '</div>' +
    '<div id="prompt-sim-thinking" class="flex items-center text-purple-700 text-sm font-bold mb-3" role="status" aria-live="polite">' +
    '<span class="prompt-thinking-dots" aria-hidden="true"><span></span><span></span><span></span></span>思考中…</div>' +
    '<div id="prompt-sim-body" class="prose prose-sm max-w-none text-slate-700 min-h-[4rem]"></div>';
}

function streamSimResponse(previewMd) {
  cancelPromptStream();
  var sim = document.getElementById('prompt-sim-response');
  if (!sim) return;
  sim.innerHTML = renderPromptSimShell();
  var thinkingEl = document.getElementById('prompt-sim-thinking');
  var bodyEl = document.getElementById('prompt-sim-body');
  if (!thinkingEl || !bodyEl) return;

  var blocks = splitMarkdownBlocks(previewMd);
  var plainLen = previewMd.replace(/\s/g, '').length;
  var thinkMs = Math.min(2400, Math.max(900, 700 + plainLen * 3));
  var cancelled = false;

  promptStreamCancel = function() { cancelled = true; };

  setTimeout(function() {
    if (cancelled) return;
    thinkingEl.classList.add('hidden');
    var blockIdx = 0;
    var charIdx = 0;
    var currentBlock = '';

    function typeNext() {
      if (cancelled) return;
      if (blockIdx >= blocks.length) {
        bodyEl.classList.remove('prompt-sim-cursor');
        bodyEl.innerHTML = markdownToSimpleHtml(previewMd);
        promptStreamCancel = null;
        return;
      }
      currentBlock = blocks[blockIdx];
      if (charIdx <= currentBlock.length) {
        var partial = blocks.slice(0, blockIdx).join('\n\n');
        if (charIdx > 0) partial += (partial ? '\n\n' : '') + currentBlock.slice(0, charIdx);
        bodyEl.innerHTML = markdownToSimpleHtml(partial);
        bodyEl.classList.add('prompt-sim-cursor');
        var step = currentBlock.length > 180 ? 4 : (currentBlock.length > 80 ? 3 : 2);
        charIdx += step;
        setTimeout(typeNext, 42);
        return;
      }
      blockIdx++;
      charIdx = 0;
      setTimeout(typeNext, 180);
    }
    typeNext();
  }, thinkMs);
}

function updatePromptOutputs() {
  var md = buildMarkdownPrompt();
  var out = document.getElementById('formedPromptOutputContainer');
  if (out) out.textContent = md;
  streamSimResponse(composeSimPreviewMarkdown());
}

function copyPromptOutput() {
  const text = document.getElementById('formedPromptOutputContainer').textContent;
  navigator.clipboard.writeText(text).then(() => alert('✓ 已複製 Markdown Prompt！可貼到 ChatGPT / Claude。')).catch(() => alert('請手動全選複製。'));
}

// ─── 小遊戲 ───
const quizBank = [
  { q: 'Prompt 工程中建議最先定義的是？', opts: ['電腦型號', 'Role 角色與任務邊界', '字體大小'], ans: 1, fb: '角色決定語氣、知識範圍與輸出格式。' },
  { q: '下列哪項「不是」目前常見 AI 應用？', opts: ['程式碼審查', '自動開車接小孩上學（無人監管）', '會議逐字稿摘要'], ans: 1, fb: '全自動無人載客仍受法規與技術限制。' },
  { q: 'RAG 的主要目的是？', opts: ['讓模型跑得更快', '先檢索私有資料再生成答案', '取代所有訓練'], ans: 1, fb: '減少幻覺、回答企業內部知識。' },
  { q: 'AI 幻覺（Hallucination）是指？', opts: ['畫面有幻覺效果', '模型自信地輸出錯誤事實', '使用者太累'], ans: 1, fb: '關鍵資訊務必查證。' },
  { q: 'Context Window 指的是？', opts: ['瀏覽器視窗大小', '模型一次能處理的 token 上限', '螢幕解析度'], ans: 1, fb: '超過就要截斷或摘要舊對話。' },
  { q: 'Chain-of-Thought 適合用在？', opts: ['查天氣', '多步推理與除錯', '轉檔名'], ans: 1, fb: '要求「先列步驟再答」可提升複雜題正確率。' },
  { q: '將客戶身分證貼到免費 ChatGPT 的風險是？', opts: ['沒有風險', '可能違反隱私與公司政策', '會讓 AI 變聰明'], ans: 1, fb: '敏感資料應使用企業方案或去識別化。' },
  { q: 'GEO（生成式搜尋優化）重點是？', opts: ['多放關鍵字', '寫可被 AI 摘要引用的結構化段落', '只寫英文'], ans: 1, fb: '結論在前、一段一重點、附條件與數據。' },
  { q: 'AI Agent 與一般聊天的差異？', opts: ['比較貴', '能規劃步驟並呼叫工具', '只能說英文'], ans: 1, fb: '例如搜尋、寫檔、跑 API。' },
  { q: '審查 AI 生成程式碼時最該注意？', opts: ['變數名好不好聽', '安全漏洞、邏輯與 RWD', '註解多不多'], ans: 1, fb: '人類 code review 不可省略。' },
  { q: 'Few-shot Prompt 是指？', opts: ['開幾槍', '提供少數輸入輸出範例', '只問一次'], ans: 1, fb: '2–3 個好範例勝過長篇形容。' },
  { q: '曝光三要素不包含？', opts: ['光圈', '白平衡 K 值', '快門'], ans: 1, fb: '白平衡是色溫，非曝光三要素。' }
];

const trueFalseBank = [
  { s: 'AI 已能 100% 取代所有程式設計師。', a: false, fb: '需人審架構、安全與業務邏輯。' },
  { s: 'Markdown 標題與條列能提升模型服從度。', a: true, fb: '結構化 Prompt 是業界標準。' },
  { s: '免費版 ChatGPT 適合貼未去識別的客戶合約。', a: false, fb: '應使用企業方案或避免上傳敏感資料。' },
  { s: 'RAG 可讓 AI 回答你公司內部文件內容。', a: true, fb: '先檢索再生成。' },
  { s: 'AI 生成的圖片一定沒有版權爭議。', a: false, fb: '需看平台條款與訓練資料來源。' },
  { s: '推理模型適合複雜多步問題。', a: true, fb: '通常具備較長推理鏈。' },
  { s: 'GEO 就是把文章寫得像機器人。', a: false, fb: '是讓人與 AI 都易讀的清楚結構。' },
  { s: 'Token 越多通常代表成本越高。', a: true, fb: '輸入輸出都計費。' }
];

const matchBank = [
  { scenario: '要 AI 幫你寫週報，附上下週 GA4 截圖數據', best: '# Role\n數據分析顧問\n# Task\n解讀數據並寫週報\n# Context\n（貼數據）\n# Output\nMarkdown 表格' },
  { scenario: '要 AI 設計國小 AI 啟蒙課 30 分鐘', best: '# Role\n教學設計師\n# Task\n課程大綱+活動\n# Constraints\n無程式、用比喻' },
  { scenario: '要 Midjourney 生成婚禮人像', best: '英文 Prompt：光線+鏡頭+比例+排除文字' },
  { scenario: '要 AI 直接幫你匯款', best: '❌ 不應交給 AI——涉及金流與資安' },
  { scenario: '要 AI 生成電商主圖素材', best: 'MJ：白底+柔光+--no text；人工去背與色準' },
  { scenario: '公司 FAQ 想給客服用', best: 'RAG 知識庫 + 引用回答，勿整份合約貼免費版' }
];

const pathwayGoals = [
  { id: 'web', label: '🌐 我想做第一個網頁', steps: [
    { t: '先學 HTML 骨架', a: 'tutorial.html 沙盒寫一個 h1+段落', tool: '前端手冊' },
    { t: '加樣式', a: '用 Tailwind 做 RWD 按鈕', tool: '前端手冊' },
    { t: '用 AI 加速', a: 'Prompt 矩陣選「程式開發」審 Code', tool: 'ChatGPT/Cursor' },
    { t: '下一步', a: '部署到 GitHub Pages 或交作業', tool: '人' }
  ]},
  { id: 'photo', label: '📸 我想拍好作品', steps: [
    { t: '懂曝光三角', a: '攝影學堂拖滑桿看景深', tool: '攝影學堂' },
    { t: '實拍 20 張', a: '同一主題不同光位', tool: '相機/手機' },
    { t: 'AI 輔助', a: '修圖+選 MJ 參考光位', tool: 'LR + MJ' },
    { t: '下一步', a: '放進作品集或網站', tool: '前端手冊' }
  ]},
  { id: 'ai-job', label: '💼 我想用 AI 提升工作效率', steps: [
    { t: '定一個重複任務', a: '週報/客服信/教案', tool: '筆記' },
    { t: '寫 .md Prompt', a: 'Prompt 矩陣+情境流程', tool: '本站' },
    { t: '建立審稿清單', a: '事實/語氣/個資/格式', tool: '人' },
    { t: '下一步', a: '團隊共用模板庫', tool: 'Notion' }
  ]},
  { id: 'image-gen', label: '🖼 我需要 AI 產圖', steps: [
    { t: '定用途', a: '草稿/社群/印刷？', tool: '簡報' },
    { t: '寫英文 Prompt', a: '主體+光+鏡頭+--no text', tool: 'MJ/DALL·E' },
    { t: '人工篩選', a: '檢查手指、文字、授權', tool: '人眼' },
    { t: '下一步', a: '重要品牌仍實拍或設計師修', tool: 'Photoshop' }
  ]},
  { id: 'teach', label: '👩‍🏫 我要帶 AI 課', steps: [
    { t: '練習箱備課', a: '選 3 題+「實作帶練步驟」', tool: '概念練習箱' },
    { t: 'Prompt 實作', a: '學員各寫 1 份 .md', tool: 'Prompt 矩陣' },
    { t: '倫理討論', a: '什麼不該全自動', tool: '白板' },
    { t: '下一步', a: '作業：回家完成一條 pathway', tool: '本站小遊戲' }
  ]}
];

const decisionTree = {
  start: { q: '你現在最想用 AI 解決什麼？', choices: [
    { label: '寫文字（文案/報告/程式）', next: 'text' },
    { label: '做圖（海報/產品/社群）', next: 'image' },
    { label: '分析數據或文件', next: 'data' },
    { label: '帶課或培訓別人', next: 'teach' }
  ]},
  text: { q: '你的內容會公開或涉及客戶資料嗎？', choices: [
    { label: '是，有敏感資料', next: 'text-safe', fb: '→ 用企業版或去識別化；勿貼合約到免費版。' },
    { label: '否，一般草稿', next: 'text-ok', fb: '→ 用 Prompt 矩陣寫 RTCS .md，產出後人工審稿。' }
  ]},
  'text-safe': { q: '建議下一步', choices: [{ label: '查看隱私練習題', next: 'end', fb: '概念練習箱 → 倫理與安全 → 客戶資料。工具：ChatGPT Team / Azure OpenAI。' }] },
  'text-ok': { q: '建議下一步', choices: [{ label: '開啟 Prompt 矩陣', next: 'end', fb: '選「文案行銷」或「程式開發」→ 選情境流程 → 複製 .md。' }] },
  image: { q: '圖片用途是？', choices: [
    { label: '內部草稿/發想', next: 'img-draft', fb: '→ MJ/DALL·E 快速出 4 張選構圖。' },
    { label: '對外商用主視覺', next: 'img-commercial', fb: '→ AI 當參考；印刷前實拍或設計師修；查 ToS。' }
  ]},
  'img-draft': { q: '建議下一步', choices: [{ label: '產圖流程', next: 'end', fb: 'Prompt 矩陣 → 影像創作 → 電商白底或婚禮情境。' }] },
  'img-commercial': { q: '建議下一步', choices: [{ label: '了解風險', next: 'end', fb: '練習箱：版權題 + 攝影學堂打底。檢查：文字亂碼、手指、Logo。' }] },
  data: { q: '資料在哪？', choices: [
    { label: '公司 PDF/內部文件', next: 'data-rag', fb: '→ RAG / NotebookLM，不要整份貼公開聊天。' },
    { label: 'GA4/試算表數字', next: 'data-ga', fb: '→ Prompt 矩陣「資料分析」→ GA4 週報情境。' }
  ]},
  'data-rag': { q: '建議下一步', choices: [{ label: '學 RAG', next: 'end', fb: '概念練習箱 → RAG 題。工具：NotebookLM。' }] },
  'data-ga': { q: '建議下一步', choices: [{ label: '行銷分析流程', next: 'end', fb: 'marketing-seo-geo.html GA4 章節 + Prompt 資料分析情境。' }] },
  teach: { q: '學員背景？', choices: [
    { label: '無程式基礎', next: 'teach-k12', fb: '→ 45 分鐘工作坊情境；避免術語轟炸。' },
    { label: '有技術基礎', next: 'teach-dev', fb: '→ Code Review + Agent 邊界；示範 Cursor。' }
  ]},
  'teach-k12': { q: '建議下一步', choices: [{ label: '帶課腳本', next: 'end', fb: '練習箱「帶課實戰」+ Prompt 教學培訓情境。' }] },
  'teach-dev': { q: '建議下一步', choices: [{ label: '開發者路徑', next: 'end', fb: 'pathway「提升工作效率」+ 程式開發情境。' }] },
  end: { q: '完成', choices: [] }
};

const toolPickRounds = [
  { task: '改整個 GitHub 專案的登入流程', options: ['ChatGPT 網頁貼 Code', 'Cursor IDE', 'Midjourney'], ans: 1, why: '需要跨檔與專案脈絡，用 IDE 整合工具。' },
  { task: '把 50 頁 PDF 變成可問答的客服知識', options: ['NotebookLM / RAG', '一般聊天逐頁貼', 'Sora 影片'], ans: 0, why: '文件問答用 RAG 或 NotebookLM。' },
  { task: '電商白底商品圖（要上架）', options: ['實拍+去背為主', 'MJ 直接商用不審', 'Whisper'], ans: 0, why: '商用主圖建議實拍為主；AI 可作草稿參考。' },
  { task: '寫一則 Threads 短文', options: ['ChatGPT + Prompt 矩陣', 'GA4', 'Copilot 改 repo'], ans: 0, why: '短文用結構化 Prompt 即可。' },
  { task: '分析 GA4 流量下降原因', options: ['Prompt 資料分析情境', 'DALL·E', 'ElevenLabs'], ans: 0, why: '數據解讀用分析型 Prompt + 回 GA4 查證。' },
  { task: '克隆同事聲音做惡搞', options: ['可以做', '不應做，需同意權', '用 SEO 工具'], ans: 1, why: '聲音克隆涉及法律與倫理。' }
];

let gameMode = 'pathway';
let quizIdx = 0, quizScore = 0;
let tfIdx = 0, tfScore = 0;
let decisionNode = 'start';
let toolPickIdx = 0, toolPickScore = 0;
let pathwayPick = null;
let matchIdx = 0, matchScore = 0;
let flipDeck = [];
let flipOpenIds = [];
let flipLock = false;
let flipMatched = 0;
let dragScore = 0;
let dragPlaced = 0;
let dragIdx = 0;
let gameCombo = 0;
let gameBestCombo = 0;
let gameTimerId = null;
let gameTimeLeft = 0;
let gameTimeUp = false;
let mazeHasKey = false;
let mazeSteps = 0;
let mazePos = { r: 0, c: 0 };
let mazeLevelIdx = 0;
let mazeTips = {};
let mazeTipText = '先找到鑰匙，再去終點。';
let unblockBlocks = [];
let unblockMoves = 0;
let unblockDrag = null;
let unblockLevel = 0;
let shooterHits = 0;
let shooterMiss = 0;
let shooterRoundIdx = 0;
let shooterRoundNeed = 0;
let shooterRoundDone = 0;
let mazeKeyListenerBound = false;
let dragTapPickSlot = null;

let mazeMap = [];
let mazeStartCell = { r: 0, c: 0 };
let mazeKeyCell = { r: 0, c: 0 };
let mazeGoalCell = { r: 0, c: 0 };
let mazeStage = 0;
const puzzleGoal = ['Role', 'Task', 'Context', 'Constraints', 'Output', 'Review'];
const mazeLevels = [
  {
    map: [
      [0, 0, 1, 0, 0, 1, 0, 0, 0],
      [1, 0, 1, 0, 1, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0],
      [1, 1, 0, 1, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    start: { r: 0, c: 0 },
    key: { r: 2, c: 4 },
    goal: { r: 8, c: 8 },
    tips: { '0,1': 'Prompt 先講清楚目標再做。', '2,4': '拿到 Key：先查資料再回答。', '6,3': '遇到不確定，先查證再輸出。' }
  },
  {
    map: [
      [0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 0, 1, 1, 0, 1, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 1],
      [0, 1, 1, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0],
      [1, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0]
    ],
    start: { r: 0, c: 0 },
    key: { r: 4, c: 3 },
    goal: { r: 8, c: 8 },
    tips: { '2,0': 'Token 是成本與記憶單位。', '4,3': '拿到 Key：RAG 可降低幻覺。', '7,2': 'Agent 做多步，需設定邊界。' }
  }
];
const unblockLevels = [
  [
    { id: 'goal', r: 2, c: 0, len: 2, dir: 'h', label: 'AI包', goal: true, theme: 'goal' },
    { id: 'a', r: 0, c: 0, len: 3, dir: 'v', label: 'Prompt', theme: 'prompt' },
    { id: 'b', r: 0, c: 2, len: 2, dir: 'h', label: 'RAG', theme: 'rag' },
    { id: 'c', r: 0, c: 4, len: 3, dir: 'v', label: 'Token', theme: 'tool' },
    { id: 'd', r: 3, c: 1, len: 3, dir: 'h', label: 'Agent', theme: 'agent' },
    { id: 'e', r: 4, c: 3, len: 2, dir: 'v', label: 'Review', theme: 'review' }
  ],
  [
    { id: 'goal', r: 2, c: 1, len: 2, dir: 'h', label: 'AI包', goal: true, theme: 'goal' },
    { id: 'a', r: 0, c: 0, len: 2, dir: 'v', label: 'Prompt', theme: 'prompt' },
    { id: 'b', r: 0, c: 2, len: 3, dir: 'v', label: 'RAG', theme: 'rag' },
    { id: 'c', r: 1, c: 3, len: 2, dir: 'h', label: 'Tool', theme: 'tool' },
    { id: 'd', r: 3, c: 0, len: 3, dir: 'h', label: 'Agent', theme: 'agent' },
    { id: 'e', r: 4, c: 4, len: 2, dir: 'v', label: 'Guard', theme: 'guard' }
  ],
  [
    { id: 'goal', r: 2, c: 0, len: 2, dir: 'h', label: 'AI包', goal: true, theme: 'goal' },
    { id: 'a', r: 0, c: 1, len: 2, dir: 'v', label: 'Prompt', theme: 'prompt' },
    { id: 'b', r: 0, c: 3, len: 2, dir: 'v', label: 'RAG', theme: 'rag' },
    { id: 'c', r: 0, c: 5, len: 2, dir: 'v', label: 'Guard', theme: 'guard' },
    { id: 'd', r: 3, c: 0, len: 2, dir: 'v', label: 'Tool', theme: 'tool' },
    { id: 'e', r: 3, c: 2, len: 3, dir: 'h', label: 'Agent', theme: 'agent' },
    { id: 'f', r: 4, c: 4, len: 2, dir: 'v', label: 'Review', theme: 'review' },
    { id: 'g', r: 1, c: 0, len: 2, dir: 'h', label: 'Token', theme: 'tool' }
  ],
  [
    { id: 'goal', r: 2, c: 1, len: 2, dir: 'h', label: 'AI包', goal: true, theme: 'goal' },
    { id: 'a', r: 0, c: 0, len: 3, dir: 'v', label: 'Prompt', theme: 'prompt' },
    { id: 'b', r: 0, c: 3, len: 3, dir: 'v', label: 'RAG', theme: 'rag' },
    { id: 'c', r: 1, c: 1, len: 2, dir: 'h', label: 'Tool', theme: 'tool' },
    { id: 'd', r: 3, c: 0, len: 2, dir: 'v', label: 'Guard', theme: 'guard' },
    { id: 'e', r: 4, c: 2, len: 3, dir: 'h', label: 'Agent', theme: 'agent' },
    { id: 'f', r: 5, c: 4, len: 2, dir: 'v', label: 'Review', theme: 'review' },
    { id: 'g', r: 0, c: 5, len: 2, dir: 'v', label: 'Token', theme: 'tool' }
  ],
  [
    { id: 'goal', r: 2, c: 0, len: 2, dir: 'h', label: 'AI包', goal: true, theme: 'goal' },
    { id: 'a', r: 0, c: 0, len: 2, dir: 'v', label: 'Prompt', theme: 'prompt' },
    { id: 'b', r: 0, c: 2, len: 2, dir: 'v', label: 'RAG', theme: 'rag' },
    { id: 'c', r: 0, c: 4, len: 2, dir: 'v', label: 'Token', theme: 'tool' },
    { id: 'd', r: 3, c: 1, len: 3, dir: 'h', label: 'Agent', theme: 'agent' },
    { id: 'e', r: 4, c: 4, len: 2, dir: 'v', label: 'Review', theme: 'review' },
    { id: 'f', r: 3, c: 0, len: 2, dir: 'v', label: 'Guard', theme: 'guard' },
    { id: 'g', r: 5, c: 2, len: 2, dir: 'h', label: 'Tool', theme: 'tool' }
  ],
  [
    { id: 'goal', r: 2, c: 2, len: 2, dir: 'h', label: 'AI包', goal: true, theme: 'goal' },
    { id: 'a', r: 0, c: 0, len: 2, dir: 'v', label: 'Prompt', theme: 'prompt' },
    { id: 'b', r: 0, c: 2, len: 2, dir: 'v', label: 'RAG', theme: 'rag' },
    { id: 'c', r: 0, c: 4, len: 2, dir: 'v', label: 'Guard', theme: 'guard' },
    { id: 'd', r: 3, c: 0, len: 3, dir: 'h', label: 'Agent', theme: 'agent' },
    { id: 'e', r: 4, c: 3, len: 2, dir: 'v', label: 'Review', theme: 'review' },
    { id: 'f', r: 5, c: 1, len: 2, dir: 'h', label: 'Token', theme: 'tool' },
    { id: 'g', r: 4, c: 0, len: 2, dir: 'h', label: 'Tool', theme: 'tool' },
    { id: 'h', r: 3, c: 4, len: 2, dir: 'v', label: 'CoT', theme: 'prompt' }
  ],
  [
    { id: 'goal', r: 2, c: 1, len: 2, dir: 'h', label: 'AI包', goal: true, theme: 'goal' },
    { id: 'a', r: 0, c: 0, len: 2, dir: 'v', label: 'Prompt', theme: 'prompt' },
    { id: 'b', r: 0, c: 2, len: 2, dir: 'v', label: 'RAG', theme: 'rag' },
    { id: 'c', r: 0, c: 4, len: 3, dir: 'v', label: 'Guard', theme: 'guard' },
    { id: 'd', r: 3, c: 0, len: 2, dir: 'v', label: 'Token', theme: 'tool' },
    { id: 'e', r: 3, c: 3, len: 3, dir: 'h', label: 'Agent', theme: 'agent' },
    { id: 'f', r: 4, c: 2, len: 2, dir: 'v', label: 'Review', theme: 'review' },
    { id: 'g', r: 5, c: 0, len: 2, dir: 'h', label: 'CoT', theme: 'prompt' },
    { id: 'h', r: 4, c: 4, len: 2, dir: 'h', label: 'Tool', theme: 'tool' },
    { id: 'i', r: 5, c: 3, len: 2, dir: 'h', label: 'API', theme: 'rag' }
  ]
];
const shooterRounds = [
  {
    question: '射掉「安全做法」目標（共 3 個）',
    hint: '只射綠色正確目標，紅色是陷阱。',
    targets: [
      { label: '查證來源', good: true }, { label: '不貼個資', good: true }, { label: '人工審稿', good: true },
      { label: '全信AI', good: false }, { label: '跳過測試', good: false }, { label: '直接上線', good: false }
    ]
  },
  {
    question: '射掉「Prompt 結構」目標（共 3 個）',
    hint: 'Role / Task / Context 是基本三要素。',
    targets: [
      { label: 'Role', good: true }, { label: 'Task', good: true }, { label: 'Context', good: true },
      { label: '亂寫一段', good: false }, { label: '無限制', good: false }, { label: '不審稿', good: false }
    ]
  },
  {
    question: '射掉「RAG 流程」目標（共 3 個）',
    hint: '先查資料、再整理、最後回答。',
    targets: [
      { label: '先查資料', good: true }, { label: '整理重點', good: true }, { label: '標註來源', good: true },
      { label: '憑空捏造', good: false }, { label: '跳過檢索', good: false }, { label: '不標來源', good: false }
    ]
  },
  {
    question: '射掉「Agent 工具鏈」目標（共 4 個）',
    hint: '拆步驟、選工具、驗證結果。',
    targets: [
      { label: '拆步驟', good: true }, { label: '選對工具', good: true }, { label: '驗證輸出', good: true }, { label: '設定邊界', good: true },
      { label: '一次全做', good: false }, { label: '無人審核', good: false }, { label: '亂改檔案', good: false }
    ]
  },
  {
    question: 'Boss 關：快速射掉 5 個「品質把關」目標',
    hint: '金色目標移動較快，集中火力！',
    boss: true,
    targets: [
      { label: '人工審稿', good: true, boss: true }, { label: '測試案例', good: true, boss: true }, { label: '風險清單', good: true, boss: true },
      { label: '版本控管', good: true, boss: true }, { label: '回滾計畫', good: true, boss: true },
      { label: '幻覺放行', good: false }, { label: '跳過測試', good: false }, { label: '直接上線', good: false }, { label: '無人把關', good: false }
    ]
  }
];

const modeTimeLimit = {
  pathway: 0,
  decision: 0,
  toolpick: 75,
  quiz: 90,
  tf: 60,
  match: 90,
  flip: 75,
  drag: 75,
  maze: 0,
  puzzle: 0,
  shooter: 60
};

const flipPairs = [
  { term: 'Prompt', meaning: '給 AI 的任務說明書' },
  { term: 'Token', meaning: '文字與成本的計算單位' },
  { term: 'RAG', meaning: '先查資料再回答' },
  { term: 'Agent', meaning: '可拆步驟執行任務的 AI' }
];

const dragRounds = [
  { item: '寫社群貼文草稿', slot: '聊天模型（Prompt）' },
  { item: '跨檔改程式並跑測試', slot: 'IDE Agent（Cursor/Copilot）' },
  { item: '公司 PDF 內部問答', slot: 'RAG / NotebookLM' },
  { item: '活動主視覺草稿', slot: '產圖工具（MJ / DALL·E）' }
];

const gameModes = [
  { id: 'pathway', label: '🧭 下一步指引', default: true },
  { id: 'decision', label: '🔀 情境決策' },
  { id: 'toolpick', label: '🛠 工具選擇' },
  { id: 'quiz', label: '📝 知識測驗' },
  { id: 'tf', label: '⚡ 是非快問' },
  { id: 'match', label: '🎯 情境配對' },
  { id: 'flip', label: '🃏 翻牌記憶戰' },
  { id: 'drag', label: '🧲 拖曳配對戰' },
  { id: 'maze', label: '🧩 AI 迷宮' },
  { id: 'puzzle', label: '🧱 AI Unblock' },
  { id: 'shooter', label: '🎯 AI 射擊場' }
];

function initGameLab() {
  var modeBar = document.getElementById('game-mode-bar');
  if (!modeBar) return;
  modeBar.innerHTML = gameModes.map(function(m) {
    return '<button type="button" data-game="' + m.id + '" class="game-mode px-3 py-2 rounded-xl text-sm font-bold border ' +
      (m.default ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200') + '">' + m.label + '</button>';
  }).join('');
  modeBar.querySelectorAll('[data-game]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      gameMode = btn.dataset.game;
      modeBar.querySelectorAll('[data-game]').forEach(function(b) {
        b.className = 'game-mode px-3 py-2 rounded-xl text-sm font-bold border bg-white text-slate-600 border-slate-200';
      });
      btn.className = 'game-mode px-3 py-2 rounded-xl text-sm font-bold border bg-emerald-600 text-white border-emerald-600';
      resetCurrentGameProgress();
      renderGame();
    });
  });
  if (!mazeKeyListenerBound) {
    window.addEventListener('keydown', function(e) {
      if (gameMode !== 'maze') return;
      if (e.key === 'ArrowUp') { e.preventDefault(); tryMoveMaze(-1, 0); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); tryMoveMaze(1, 0); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); tryMoveMaze(0, -1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); tryMoveMaze(0, 1); }
    });
    mazeKeyListenerBound = true;
  }
  resetCurrentGameProgress();
  renderGame();
}

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function setGameMeter(percent) {
  var fill = document.getElementById('game-meter-fill');
  if (!fill) return;
  fill.style.width = Math.max(0, Math.min(100, percent)) + '%';
}

function updateArcadeHud() {
  var comboEl = document.getElementById('game-combo-label');
  var timerEl = document.getElementById('game-timer-label');
  var comboBadge = document.getElementById('hud-combo-badge');
  var timerBadge = document.getElementById('hud-timer-badge');
  if (comboEl) comboEl.textContent = String(gameCombo);
  if (timerEl) timerEl.textContent = gameTimeLeft > 0 ? (gameTimeLeft + 's') : '∞';
  if (comboBadge) {
    comboBadge.classList.remove('pop');
    if (gameCombo > 0) {
      comboBadge.classList.add('pop');
      setTimeout(function() { comboBadge.classList.remove('pop'); }, 180);
    }
  }
  if (timerBadge) {
    timerBadge.classList.toggle('warn', gameTimeLeft > 0 && gameTimeLeft <= 10);
  }
}

function showGameFx(text, type) {
  var fx = document.getElementById('game-fx-text');
  if (!fx) return;
  fx.className = 'game-fx-text ' + (type || 'good');
  fx.textContent = text;
  // force reflow for replay animation
  void fx.offsetWidth;
  fx.classList.add('show');
}

function stopGameTimer() {
  if (gameTimerId) {
    clearInterval(gameTimerId);
    gameTimerId = null;
  }
}

function startGameTimer(limitSec) {
  stopGameTimer();
  gameTimeUp = false;
  gameTimeLeft = limitSec > 0 ? limitSec : 0;
  updateArcadeHud();
  if (!limitSec || limitSec <= 0) return;
  gameTimerId = setInterval(function() {
    gameTimeLeft -= 1;
    if (gameTimeLeft <= 0) {
      gameTimeLeft = 0;
      gameTimeUp = true;
      stopGameTimer();
      renderGame();
      return;
    }
    updateArcadeHud();
  }, 1000);
}

function registerGameResult(ok) {
  if (ok) {
    gameCombo += 1;
    if (gameCombo > gameBestCombo) gameBestCombo = gameCombo;
    if (gameCombo >= 3) showGameFx('🔥 COMBO x' + gameCombo, 'combo');
    else showGameFx('✅ 正確！', 'good');
  } else {
    gameCombo = 0;
    showGameFx('❌ 失誤，連擊重置', 'bad');
  }
  updateArcadeHud();
}

function buildStarsByRatio(ratio) {
  if (ratio >= 0.85) return '★★★';
  if (ratio >= 0.6) return '★★☆';
  return '★☆☆';
}

function initPuzzleTiles() {
  var arr = puzzleGoal.slice();
  arr = [arr[1], arr[0], arr[3], arr[2], arr[5], arr[4]];
}

function generateRandomMazeLevel() {
  var size = 9;
  var map = Array.from({ length: size }, function() {
    return Array.from({ length: size }, function() { return Math.random() < 0.35 ? 1 : 0; });
  });
  var start = { r: 0, c: 0 };
  var key = { r: 2 + Math.floor(Math.random() * 3), c: 2 + Math.floor(Math.random() * 3) };
  var goal = { r: size - 1, c: size - 1 };
  // carve guaranteed path start -> key -> goal
  var carvePath = function(from, to) {
    var r = from.r, c = from.c;
    map[r][c] = 0;
    while (c !== to.c) { c += (to.c > c ? 1 : -1); map[r][c] = 0; }
    while (r !== to.r) { r += (to.r > r ? 1 : -1); map[r][c] = 0; }
  };
  carvePath(start, key);
  carvePath(key, goal);
  map[start.r][start.c] = 0;
  map[key.r][key.c] = 0;
  map[goal.r][goal.c] = 0;
  return {
    map: map,
    start: start,
    key: key,
    goal: goal,
    tips: {
      [start.r + ',' + (start.c + 1)]: '先定義目標，再開始做。',
      [key.r + ',' + key.c]: '拿到 Key：先查證資料再輸出。',
      [(goal.r - 1) + ',' + goal.c]: '快到終點：記得人工審稿。'
    }
  };
}

function initMazeLevel() {
  mazeStage += 1;
  var lv = generateRandomMazeLevel();
  mazeMap = lv.map.map(function(row) { return row.slice(); });
  mazeStartCell = { r: lv.start.r, c: lv.start.c };
  mazePos = { r: lv.start.r, c: lv.start.c };
  mazeKeyCell = { r: lv.key.r, c: lv.key.c };
  mazeGoalCell = { r: lv.goal.r, c: lv.goal.c };
  mazeTips = Object.assign({}, lv.tips || {});
  mazeHasKey = false;
  mazeSteps = 0;
  mazeTipText = '新關卡開始：先拿鑰匙，再去出口。';
}

function initUnblockLevel() {
  var lv = null;
  for (var t = 0; t < 40; t++) {
    var candidate = unblockLevels[Math.floor(Math.random() * unblockLevels.length)];
    if (isUnblockLevelValid(candidate)) {
      lv = candidate;
      break;
    }
  }
  if (!lv) lv = unblockLevels[0];
  unblockBlocks = lv.map(function(b) { return Object.assign({}, b); });
  unblockMoves = 0;
  unblockDrag = null;
  unblockLevel += 1;
}

function unblockOccupiedCells(block) {
  var cells = [];
  var i;
  if (block.dir === 'h') {
    for (i = 0; i < block.len; i++) cells.push({ r: block.r, c: block.c + i });
  } else {
    for (i = 0; i < block.len; i++) cells.push({ r: block.r + i, c: block.c });
  }
  return cells;
}

function isUnblockLevelValid(blocks) {
  var occupied = {};
  var i, j, cells, key, c;
  for (i = 0; i < blocks.length; i++) {
    cells = unblockOccupiedCells(blocks[i]);
    for (j = 0; j < cells.length; j++) {
      c = cells[j];
      if (c.r < 0 || c.c < 0 || c.r > 5 || c.c > 5) return false;
      key = c.r + ',' + c.c;
      if (occupied[key]) return false;
      occupied[key] = true;
    }
  }
  return true;
}

function getUnblockChipTheme(block) {
  if (block.theme) return block.theme;
  if (block.goal) return 'goal';
  var label = (block.label || '').toLowerCase();
  if (/prompt|cot|token/i.test(block.label)) return 'prompt';
  if (/rag|api/i.test(block.label)) return 'rag';
  if (/agent/i.test(block.label)) return 'agent';
  if (/guard/i.test(block.label)) return 'guard';
  if (/tool/i.test(block.label)) return 'tool';
  return 'review';
}

function shatterTarget(btn, arena, color, onDone) {
  if (!btn || !arena) { if (onDone) onDone(); return; }
  btn.classList.add('is-shattering', 'is-hit');
  var rect = btn.getBoundingClientRect();
  var arenaRect = arena.getBoundingClientRect();
  var cx = rect.left - arenaRect.left + rect.width / 2;
  var cy = rect.top - arenaRect.top + rect.height / 2;
  var colors = color === 'bad'
    ? ['#fecdd3', '#fb7185', '#f43f5e', '#fff1f2']
    : ['#a5f3fc', '#67e8f9', '#22d3ee', '#ecfeff'];
  for (var i = 0; i < 14; i++) {
    var shard = document.createElement('span');
    shard.className = 'target-shard';
    shard.style.left = cx + 'px';
    shard.style.top = cy + 'px';
    shard.style.background = colors[i % colors.length];
    var angle = (Math.PI * 2 * i) / 14 + (Math.random() * 0.4 - 0.2);
    var dist = 28 + Math.random() * 42;
    shard.style.setProperty('--sx', (Math.cos(angle) * dist) + 'px');
    shard.style.setProperty('--sy', (Math.sin(angle) * dist) + 'px');
    shard.style.setProperty('--sr', (Math.random() * 360 - 180) + 'deg');
    arena.appendChild(shard);
    setTimeout(function(s) { if (s.parentNode) s.parentNode.removeChild(s); }, 560, shard);
  }
  var flash = document.createElement('span');
  flash.className = 'shooter-muzzle-flash';
  flash.style.left = (cx - 9) + 'px';
  flash.style.top = (cy - 9) + 'px';
  arena.appendChild(flash);
  setTimeout(function() { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 260);
  setTimeout(function() {
    if (btn.parentNode) btn.parentNode.removeChild(btn);
    if (onDone) onDone();
  }, 380);
}

function showShooterFloatScore(arena, btn, text) {
  if (!arena || !btn) return;
  var rect = btn.getBoundingClientRect();
  var arenaRect = arena.getBoundingClientRect();
  var el = document.createElement('span');
  el.className = 'shooter-float-score';
  el.textContent = text;
  el.style.left = (rect.left - arenaRect.left + rect.width / 2 - 16) + 'px';
  el.style.top = (rect.top - arenaRect.top - 8) + 'px';
  arena.appendChild(el);
  setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 720);
}

function showShooterShotFx(arena, clientX, clientY) {
  if (!arena) return;
  var rect = arena.getBoundingClientRect();
  var x = clientX - rect.left;
  var y = clientY - rect.top;
  var flash = document.createElement('span');
  flash.className = 'shooter-muzzle-flash';
  flash.style.left = (x - 9) + 'px';
  flash.style.top = (y - 9) + 'px';
  arena.appendChild(flash);
  var ripple = document.createElement('span');
  ripple.className = 'shooter-shot-ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  arena.appendChild(ripple);
  setTimeout(function() {
    if (flash.parentNode) flash.parentNode.removeChild(flash);
    if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
  }, 480);
}

function bindShooterArena(arena, onMiss) {
  var cursor = document.createElement('div');
  cursor.className = 'shooter-aim-cursor';
  cursor.innerHTML = '<span class="shooter-aim-ring"></span><span class="shooter-aim-dot"></span>';
  arena.appendChild(cursor);
  arena.classList.add('is-active');

  function moveAim(clientX, clientY) {
    var rect = arena.getBoundingClientRect();
    cursor.style.left = (clientX - rect.left) + 'px';
    cursor.style.top = (clientY - rect.top) + 'px';
    cursor.style.opacity = '1';
  }

  arena.addEventListener('mousemove', function(e) { moveAim(e.clientX, e.clientY); });
  arena.addEventListener('mouseleave', function() { cursor.style.opacity = '0'; });
  arena.addEventListener('touchstart', function(e) {
    if (e.touches[0]) moveAim(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  arena.addEventListener('touchmove', function(e) {
    if (e.touches[0]) moveAim(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  arena.addEventListener('click', function(e) {
    if (e.target.closest('.target-dot') || e.target.closest('.target-float')) return;
    showShooterShotFx(arena, e.clientX, e.clientY);
    if (onMiss) onMiss();
  });
}

function getShooterLayout(arena) {
  var vp = document.getElementById('game-board-viewport');
  var w = arena.offsetWidth || arena.getBoundingClientRect().width || (vp ? vp.clientWidth : 0) || Math.min(window.innerWidth - 40, 360);
  var h = arena.offsetHeight || arena.getBoundingClientRect().height || 320;
  var mobile = w < 640;
  var targetW = mobile ? 76 : 104;
  var targetH = mobile ? 42 : 54;
  return {
    mobile: mobile,
    w: w,
    h: h,
    targetW: targetW,
    targetH: targetH,
    padX: mobile ? 4 : 10,
    padTop: mobile ? 40 : 44,
    padBottom: mobile ? 6 : 10,
    driftMax: mobile ? 4 : 11
  };
}

function clampShooterDrift(tx, ty, dx, dy, layout) {
  var minX = layout.padX;
  var maxX = Math.max(minX, layout.w - layout.targetW - layout.padX);
  var minY = layout.padTop;
  var maxY = Math.max(minY, layout.h - layout.targetH - layout.padBottom);
  tx = Math.max(minX, Math.min(maxX, tx));
  ty = Math.max(minY, Math.min(maxY, ty));
  var dxLo = minX - tx;
  var dxHi = maxX - tx;
  var dyLo = minY - ty;
  var dyHi = maxY - ty;
  dx = Math.max(dxLo, Math.min(dxHi, dx));
  dy = Math.max(dyLo, Math.min(dyHi, dy));
  return { tx: tx, ty: ty, dx: dx, dy: dy };
}

function placeShooterTarget(round, idx, layout) {
  var speedClass = round.boss ? 'target-float--fast' : (idx % 3 === 0 ? 'target-float--slow' : (idx % 3 === 1 ? '' : 'target-float--fast'));
  var driftMax = layout.driftMax * (round.boss ? 1.15 : 1);
  var minX = layout.padX;
  var maxX = Math.max(minX, layout.w - layout.targetW - layout.padX);
  var minY = layout.padTop;
  var maxY = Math.max(minY, layout.h - layout.targetH - layout.padBottom);
  var tx = minX + Math.random() * Math.max(1, maxX - minX);
  var ty = minY + Math.random() * Math.max(1, maxY - minY);
  var dx = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * driftMax);
  var dy = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * driftMax);
  var clamped = clampShooterDrift(tx, ty, dx, dy, layout);
  var dur = round.boss ? (2 + Math.random() * 0.6) : (2.6 + Math.random() * 1.4);
  if (layout.mobile) dur += 0.4;
  return {
    tx: clamped.tx,
    ty: clamped.ty,
    dx: clamped.dx,
    dy: clamped.dy,
    dur: dur,
    speedClass: speedClass
  };
}

function tryMoveMaze(dr, dc) {
  var nr = mazePos.r + dr;
  var nc = mazePos.c + dc;
  if (nr < 0 || nc < 0 || nr >= mazeMap.length || nc >= mazeMap[0].length) return;
  if (mazeMap[nr][nc] === 1) {
    registerGameResult(false);
    return;
  }
  mazePos = { r: nr, c: nc };
  mazeSteps += 1;
  if (!mazeHasKey && nr === mazeKeyCell.r && nc === mazeKeyCell.c) {
    mazeHasKey = true;
    registerGameResult(true);
    showGameFx('🔑 拿到 AI Key！', 'good');
  }
  var tip = mazeTips[nr + ',' + nc];
  if (tip) mazeTipText = tip;
  renderGame();
}

function resetCurrentGameProgress() {
  quizIdx = 0; quizScore = 0; tfIdx = 0; tfScore = 0;
  decisionNode = 'start'; toolPickIdx = 0; toolPickScore = 0; pathwayPick = null; matchIdx = 0; matchScore = 0;
  flipDeck = []; flipOpenIds = []; flipLock = false; flipMatched = 0;
  dragScore = 0; dragPlaced = 0; dragIdx = 0;
  mazeStage = 0;
  initMazeLevel();
  unblockLevel = 0;
  initUnblockLevel();
  shooterHits = 0; shooterMiss = 0; shooterRoundIdx = 0; shooterRoundNeed = 0; shooterRoundDone = 0;
  gameCombo = 0;
  gameBestCombo = 0;
  startGameTimer(modeTimeLimit[gameMode] || 0);
}

function renderGame() {
  var vp = document.getElementById('game-board-viewport');
  var prog = document.getElementById('game-progress-label');
  var score = document.getElementById('game-score-label');
  if (!vp) return;
  updateArcadeHud();

  if (gameTimeUp && (modeTimeLimit[gameMode] || 0) > 0) {
    setGameMeter(100);
    if (prog) prog.textContent = '時間到';
    vp.innerHTML = '<div class="burst p-5 rounded-2xl bg-amber-50 border border-amber-200 text-center">' +
      '<p class="text-2xl font-black text-amber-700">⏰ 時間到！</p>' +
      '<p class="text-sm text-slate-700 mt-2">目前模式：' + (gameModes.find(function(m){ return m.id === gameMode; }) || { label: gameMode }).label + '</p>' +
      '<p class="text-sm text-slate-700 mt-1">最高連擊：' + gameBestCombo + '</p>' +
      '<button type="button" class="mt-4 w-full p-3 rounded-xl bg-amber-600 text-white font-bold" onclick="resetCurrentGameProgress();renderGame()">再挑戰一次</button>' +
      '</div>';
    return;
  }

  if (gameMode === 'pathway') {
    setGameMeter(pathwayPick ? 100 : 15);
    if (prog) prog.textContent = pathwayPick ? '路徑詳情' : '選擇目標';
    if (score) score.textContent = '—';
    if (!pathwayPick) {
      vp.innerHTML = '<h3 class="text-lg font-black text-slate-900">選一個與你最接近的目標</h3><p class="text-sm text-slate-500 mt-1">系統會列出可執行的下一步（含工具與本站入口）。</p><div id="pathway-btns" class="grid gap-2 mt-4"></div>';
      var pb = document.getElementById('pathway-btns');
      pathwayGoals.forEach(function(g) {
        var b = document.createElement('button');
        b.className = 'w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-200 font-bold hover:border-emerald-400';
        b.textContent = g.label;
        b.onclick = function() { pathwayPick = g; renderGame(); };
        pb.appendChild(b);
      });
      return;
    }
    vp.innerHTML = '<h3 class="text-xl font-black text-emerald-800">' + pathwayPick.label + '</h3><ol class="mt-4 space-y-3" id="pathway-steps"></ol>' +
      '<button type="button" id="pathway-back" class="mt-6 w-full p-3 rounded-xl bg-slate-100 font-bold">← 重選目標</button>';
    var ol = document.getElementById('pathway-steps');
    pathwayPick.steps.forEach(function(s, i) {
      ol.innerHTML += '<li class="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50"><span class="text-xs font-black text-emerald-600">STEP ' + (i+1) + '</span>' +
        '<p class="font-bold text-slate-900 mt-1">' + s.t + '</p><p class="text-sm text-slate-600">' + s.a + '</p><p class="text-xs text-purple-600 font-bold mt-2">🛠 ' + s.tool + '</p></li>';
    });
    document.getElementById('pathway-back').onclick = function() { pathwayPick = null; renderGame(); };
    return;
  }

  if (gameMode === 'decision') {
    setGameMeter(decisionNode === 'end' ? 100 : 45);
    var node = decisionTree[decisionNode] || decisionTree.end;
    if (prog) prog.textContent = '情境導覽';
    if (score) score.textContent = '—';
    if (decisionNode === 'end' || !node.choices.length) {
      vp.innerHTML = '<p class="text-lg font-black text-emerald-700">✅ 建議已顯示在上一則回饋中</p>' +
        '<button type="button" class="mt-4 w-full p-4 rounded-xl bg-emerald-600 text-white font-bold" onclick="decisionNode=\'start\';renderGame()">從頭再玩</button>';
      return;
    }
    vp.innerHTML = '<h3 class="text-xl font-black text-slate-900">' + node.q + '</h3><div id="decision-opts" class="grid gap-2 mt-4"></div><div id="decision-fb" class="mt-4 hidden p-4 rounded-xl bg-indigo-50 text-indigo-900 font-bold text-sm"></div><button type="button" id="decision-next" class="mt-4 w-full p-3 rounded-xl bg-indigo-600 text-white font-bold hidden">看完了，下一步 →</button>';
    var opts = document.getElementById('decision-opts');
    var nextBtn = document.getElementById('decision-next');
    node.choices.forEach(function(ch) {
      var b = document.createElement('button');
      b.className = 'w-full text-left p-4 rounded-xl bg-slate-50 border font-bold hover:border-indigo-300';
      b.textContent = ch.label;
      b.onclick = function() {
        if (ch.fb) {
          var fb = document.getElementById('decision-fb');
          fb.classList.remove('hidden');
          fb.textContent = ch.fb;
          nextBtn.classList.remove('hidden');
          nextBtn.onclick = function() {
            decisionNode = ch.next;
            renderGame();
          };
        } else {
          decisionNode = ch.next;
          renderGame();
        }
      };
      opts.appendChild(b);
    });
    return;
  }

  if (gameMode === 'toolpick') {
    setGameMeter((toolPickIdx / toolPickRounds.length) * 100);
    if (toolPickIdx >= toolPickRounds.length) {
      var toolRatio = toolPickRounds.length ? (toolPickScore / toolPickRounds.length) : 0;
      vp.innerHTML = '<p class="text-2xl font-black text-cyan-700">🛠 完成！' + toolPickScore + ' / ' + toolPickRounds.length + ' 題選對</p>' +
        '<p class="star-row mt-2">星等：' + buildStarsByRatio(toolRatio) + '</p>' +
        '<button type="button" class="mt-4 w-full p-4 rounded-xl bg-cyan-600 text-white font-bold" onclick="toolPickIdx=0;toolPickScore=0;renderGame()">再玩一次</button>';
      if (prog) prog.textContent = '完成';
      return;
    }
    var tr = toolPickRounds[toolPickIdx];
    if (prog) prog.textContent = (toolPickIdx + 1) + ' / ' + toolPickRounds.length;
    if (score) score.textContent = toolPickScore;
    vp.innerHTML = '<h3 class="text-lg font-black">' + tr.task + '</h3><p class="text-sm text-slate-500 mt-1">哪個做法最合適？</p><div id="tool-opts" class="grid gap-2 mt-4"></div><div id="tool-fb" class="mt-4 hidden p-4 rounded-xl font-bold"></div>';
    var to = document.getElementById('tool-opts');
    tr.options.forEach(function(opt, i) {
      var b = document.createElement('button');
      b.className = 'w-full text-left p-3 rounded-xl bg-slate-50 border font-bold';
      b.textContent = opt;
      b.onclick = function() {
        var ok = i === tr.ans;
        if (ok) toolPickScore++;
        registerGameResult(ok);
        var fb = document.getElementById('tool-fb');
        fb.classList.remove('hidden');
        fb.className = 'mt-4 p-4 rounded-xl font-bold block ' + (ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700');
        fb.textContent = (ok ? '✓ ' : '✗ ') + tr.why;
        if (score) score.textContent = toolPickScore;
        setTimeout(function() { toolPickIdx++; renderGame(); }, 2000);
      };
      to.appendChild(b);
    });
    return;
  }

  if (gameMode === 'quiz') {
    setGameMeter((quizIdx / quizBank.length) * 100);
    if (quizIdx >= quizBank.length) {
      const quizRatio = (quizBank.length * 100) ? (quizScore / (quizBank.length * 100)) : 0;
      vp.innerHTML = `<p class="text-2xl font-black text-emerald-700">🎉 測驗完成！得分 ${quizScore} / ${quizBank.length * 100}</p>
        <p class="star-row mt-2">星等：${buildStarsByRatio(quizRatio)}</p>
        <button type="button" onclick="quizIdx=0;quizScore=0;renderGame()" class="mt-4 w-full p-4 rounded-xl bg-emerald-600 text-white font-bold">再玩一次</button>`;
      if (prog) prog.textContent = '完成';
      if (score) score.textContent = quizScore;
      return;
    }
    const d = quizBank[quizIdx];
    if (prog) prog.textContent = (quizIdx + 1) + ' / ' + quizBank.length;
    if (score) score.textContent = quizScore;
    vp.innerHTML = `<h3 class="text-xl font-black text-slate-900">${d.q}</h3>
      <div id="game-options-container" class="grid gap-3 mt-4"></div>
      <div id="game-feedback-banner" class="mt-4 hidden p-4 rounded-xl font-bold text-center"></div>`;
    const box = document.getElementById('game-options-container');
    d.opts.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-200 font-bold hover:border-emerald-300';
      b.textContent = o;
      b.onclick = () => {
        const banner = document.getElementById('game-feedback-banner');
        banner.classList.remove('hidden');
        if (i === d.ans) {
          quizScore += 100;
          registerGameResult(true);
          banner.className = 'mt-4 p-4 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-center block';
          banner.textContent = '✓ ' + d.fb;
        } else {
          registerGameResult(false);
          banner.className = 'mt-4 p-4 rounded-xl bg-red-50 text-red-700 font-bold text-center block';
          banner.textContent = '✗ ' + d.fb;
        }
        if (score) score.textContent = quizScore;
        setTimeout(() => { quizIdx++; renderGame(); }, 1800);
      };
      box.appendChild(b);
    });
  } else if (gameMode === 'tf') {
    setGameMeter((tfIdx / trueFalseBank.length) * 100);
    if (tfIdx >= trueFalseBank.length) {
      const tfRatio = trueFalseBank.length ? (tfScore / trueFalseBank.length) : 0;
      vp.innerHTML = `<p class="text-2xl font-black text-cyan-700">⚡ 快問快答結束！${tfScore} / ${trueFalseBank.length} 題正確</p>
        <p class="star-row mt-2">星等：${buildStarsByRatio(tfRatio)}</p>
        <button type="button" onclick="tfIdx=0;tfScore=0;renderGame()" class="mt-4 w-full p-4 rounded-xl bg-cyan-600 text-white font-bold">再玩一次</button>`;
      return;
    }
    const d = trueFalseBank[tfIdx];
    if (prog) prog.textContent = (tfIdx + 1) + ' / ' + trueFalseBank.length;
    vp.innerHTML = `<h3 class="text-xl font-black text-slate-900">${d.s}</h3>
      <div class="grid grid-cols-2 gap-4 mt-6">
        <button type="button" id="tf-true" class="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 font-black text-emerald-800 text-lg">○ 正確</button>
        <button type="button" id="tf-false" class="p-6 rounded-2xl bg-red-50 border-2 border-red-200 font-black text-red-800 text-lg">✗ 錯誤</button>
      </div>
      <div id="game-feedback-banner" class="mt-4 hidden p-4 rounded-xl font-bold text-center"></div>`;
    function pick(userAns) {
      const banner = document.getElementById('game-feedback-banner');
      banner.classList.remove('hidden');
      const ok = userAns === d.a;
      if (ok) tfScore++;
      registerGameResult(ok);
      banner.className = 'mt-4 p-4 rounded-xl font-bold text-center block ' + (ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700');
      banner.textContent = (ok ? '✓ ' : '✗ ') + d.fb;
      if (score) score.textContent = tfScore * 100;
      setTimeout(() => { tfIdx++; renderGame(); }, 1500);
    }
    document.getElementById('tf-true').onclick = () => pick(true);
    document.getElementById('tf-false').onclick = () => pick(false);
  } else if (gameMode === 'match') {
    setGameMeter((matchIdx / matchBank.length) * 100);
    if (prog) prog.textContent = (matchIdx >= matchBank.length) ? '完成' : ((matchIdx + 1) + ' / ' + matchBank.length);
    if (score) score.textContent = matchScore;
    function buildMatchOptions(currentIdx) {
      const current = matchBank[currentIdx];
      const opts = [current.best];
      const pool = matchBank.filter((_, i) => i !== currentIdx).map(x => x.best);
      while (opts.length < 3 && pool.length) {
        const pickIdx = Math.floor(Math.random() * pool.length);
        opts.push(pool.splice(pickIdx, 1)[0]);
      }
      return opts.sort(() => Math.random() - 0.5);
    }
    if (matchIdx >= matchBank.length) {
      var matchRatio = matchBank.length ? (matchScore / matchBank.length) : 0;
      vp.innerHTML = '<p class="text-xl font-black text-purple-700">🎯 配對練習完成！你答對 ' + matchScore + ' / ' + matchBank.length + ' 題。</p>' +
        '<p class="star-row mt-2">星等：' + buildStarsByRatio(matchRatio) + '</p>' +
        '<button type="button" class="mt-4 w-full p-3 rounded-xl bg-purple-600 text-white font-bold" onclick="matchIdx=0;matchScore=0;renderGame()">再玩一次</button>';
      return;
    }
    const m = matchBank[matchIdx];
    const options = buildMatchOptions(matchIdx);
    vp.innerHTML = `<p class="text-sm font-bold text-slate-500">情境 ${matchIdx + 1}/${matchBank.length}</p>
      <h3 class="text-lg font-black text-slate-900 mt-2">${m.scenario}</h3>
      <p class="mt-4 text-sm text-slate-500">請選出最適合的 Prompt 策略：</p>
      <div id="match-options" class="grid gap-2 mt-3"></div>
      <div id="match-feedback" class="mt-4 hidden p-4 rounded-xl font-bold text-sm"></div>
      <button type="button" id="match-next" class="mt-4 w-full p-3 rounded-xl bg-purple-600 text-white font-bold hidden">下一題 →</button>`;
    const box = document.getElementById('match-options');
    const nextBtn = document.getElementById('match-next');
    options.forEach(function(opt) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'w-full text-left p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold hover:border-purple-300';
      b.textContent = opt;
      b.onclick = function() {
        const ok = opt === m.best;
        if (ok) matchScore += 1;
        registerGameResult(ok);
        if (score) score.textContent = matchScore;
        box.querySelectorAll('button').forEach(function(btn) { btn.disabled = true; });
        const fb = document.getElementById('match-feedback');
        fb.classList.remove('hidden');
        fb.className = 'mt-4 p-4 rounded-xl font-bold text-sm ' + (ok ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700');
        fb.textContent = (ok ? '✅ 配對正確。' : '❌ 這題配錯了。') + ' 建議答案：' + m.best;
        nextBtn.classList.remove('hidden');
      };
      box.appendChild(b);
    });
    nextBtn.onclick = function() {
      matchIdx += 1;
      renderGame();
    };
  } else if (gameMode === 'flip') {
    if (!flipDeck.length) {
      var raw = [];
      flipPairs.forEach(function(p, idx) {
        raw.push({ id: 't' + idx, pair: idx, text: p.term, kind: 'term' });
        raw.push({ id: 'm' + idx, pair: idx, text: p.meaning, kind: 'meaning' });
      });
      flipDeck = shuffle(raw);
    }
    setGameMeter((flipMatched / flipPairs.length) * 100);
    if (prog) prog.textContent = flipMatched + ' / ' + flipPairs.length + ' 組';
    if (score) score.textContent = flipMatched * 100;
    if (flipMatched >= flipPairs.length) {
      vp.innerHTML = '<div class="burst p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center"><p class="text-2xl font-black text-emerald-700">🎉 全部配對成功！</p><p class="star-row mt-2">星等：' + buildStarsByRatio(1) + '</p><p class="text-sm text-slate-700 mt-1">你已完成名詞與解釋的記憶闖關。</p><button type="button" class="mt-4 w-full p-3 rounded-xl bg-emerald-600 text-white font-bold" onclick="flipDeck=[];flipOpenIds=[];flipMatched=0;flipLock=false;renderGame()">再玩一次</button></div>';
      return;
    }
    vp.innerHTML = '<h3 class="text-lg font-black text-slate-900">翻牌找出「名詞 ↔ 解釋」配對</h3><p class="text-sm text-slate-500 mt-1">連續答對會更快解鎖，答錯卡片會翻回去。</p><div id="flip-grid" class="flip-grid mt-4"></div>';
    var fg = document.getElementById('flip-grid');
    flipDeck.forEach(function(card, idx) {
      var isOpen = flipOpenIds.indexOf(idx) >= 0;
      var isMatched = card.matched;
      var cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'flip-card' + (isOpen ? ' is-open' : '') + (isMatched ? ' is-matched' : '');
      cell.innerHTML = '<div class="flip-inner"><div class="flip-face flip-front">?</div><div class="flip-face flip-back">' + card.text + '</div></div>';
      cell.disabled = !!isMatched;
      cell.onclick = function() {
        if (flipLock || card.matched || flipOpenIds.indexOf(idx) >= 0) return;
        flipOpenIds.push(idx);
        renderGame();
        if (flipOpenIds.length === 2) {
          flipLock = true;
          var a = flipDeck[flipOpenIds[0]];
          var b = flipDeck[flipOpenIds[1]];
          var ok = a.pair === b.pair && a.kind !== b.kind;
          setTimeout(function() {
            if (ok) {
              a.matched = true;
              b.matched = true;
              flipMatched += 1;
              registerGameResult(true);
            } else {
              registerGameResult(false);
            }
            flipOpenIds = [];
            flipLock = false;
            renderGame();
          }, ok ? 420 : 800);
        }
      };
      fg.appendChild(cell);
    });
  } else if (gameMode === 'drag') {
    setGameMeter((dragIdx / dragRounds.length) * 100);
    if (prog) prog.textContent = dragIdx + ' / ' + dragRounds.length + ' 已配對';
    if (score) score.textContent = dragScore * 100;
    if (dragIdx >= dragRounds.length) {
      vp.innerHTML = '<div class="burst p-5 rounded-2xl bg-cyan-50 border border-cyan-200 text-center"><p class="text-2xl font-black text-cyan-700">🧲 拖曳任務完成！</p><p class="star-row mt-2">星等：' + buildStarsByRatio(1) + '</p><p class="text-sm text-slate-700 mt-1">你已熟悉常見任務該配哪種工具。</p><button type="button" class="mt-4 w-full p-3 rounded-xl bg-cyan-600 text-white font-bold" onclick="dragScore=0;dragPlaced=0;dragIdx=0;renderGame()">再玩一次</button></div>';
      return;
    }
    vp.innerHTML = '<h3 class="text-lg font-black text-slate-900">拖曳任務到對的工具區</h3><p class="text-sm text-slate-500 mt-1">把左邊任務拖到右邊最適合的工具框。</p><div class="drag-stage mt-4"><div><p class="text-xs font-black text-slate-500 mb-2">任務卡</p><div id="drag-items" class="grid gap-2"></div></div><div><p class="text-xs font-black text-slate-500 mb-2">工具區</p><div id="drag-slots" class="grid gap-2"></div></div></div><div id="drag-feedback" class="mt-4 hidden p-3 rounded-xl font-bold text-sm"></div>';
    var itemsWrap = document.getElementById('drag-items');
    var slotsWrap = document.getElementById('drag-slots');
    var feedback = document.getElementById('drag-feedback');
    var slots = ['聊天模型（Prompt）', 'IDE Agent（Cursor/Copilot）', 'RAG / NotebookLM', '產圖工具（MJ / DALL·E）'];
    dragTapPickSlot = null;
    var row = dragRounds[dragIdx];
    var chip = document.createElement('div');
    chip.className = 'drag-chip';
    chip.textContent = row.item;
    chip.draggable = true;
    chip.dataset.slot = row.slot;
    chip.addEventListener('dragstart', function() { chip.classList.add('dragging'); });
    chip.addEventListener('dragend', function() { chip.classList.remove('dragging'); });
    chip.addEventListener('click', function() {
      dragTapPickSlot = row.slot;
      feedback.classList.remove('hidden');
      feedback.className = 'mt-4 p-3 rounded-xl font-bold text-sm bg-cyan-50 text-cyan-800 block';
      feedback.textContent = '已選任務：「' + row.item + '」，現在點右側你認為正確的工具區。';
    });
    itemsWrap.appendChild(chip);
    slots.forEach(function(name) {
      var slot = document.createElement('div');
      slot.className = 'drop-slot';
      slot.dataset.slot = name;
      slot.innerHTML = '<p class="text-sm font-black text-slate-800">' + name + '</p>';
      slot.addEventListener('dragover', function(e) { e.preventDefault(); slot.classList.add('is-over'); });
      slot.addEventListener('dragleave', function() { slot.classList.remove('is-over'); });
      slot.addEventListener('drop', function(e) {
        e.preventDefault();
        slot.classList.remove('is-over');
        var dragging = document.querySelector('.drag-chip.dragging');
        if (!dragging) return;
        var wanted = dragging.dataset.slot;
        var ok = wanted === name;
        feedback.classList.remove('hidden');
        if (ok) {
          slot.classList.add('is-hit', 'burst');
          dragging.remove();
          dragScore += 1;
          dragPlaced += 1;
          dragIdx += 1;
          registerGameResult(true);
          feedback.className = 'mt-4 p-3 rounded-xl font-bold text-sm bg-emerald-50 text-emerald-800 block';
          feedback.textContent = '✅ 配對正確！' + dragging.textContent + ' → ' + name;
          setTimeout(function() { renderGame(); }, 500);
        } else {
          registerGameResult(false);
          feedback.className = 'mt-4 p-3 rounded-xl font-bold text-sm bg-rose-50 text-rose-700 block';
          feedback.textContent = '❌ 這個任務更適合：' + wanted;
        }
      });
      slot.addEventListener('click', function() {
        if (!dragTapPickSlot) return;
        var ok = dragTapPickSlot === name;
        feedback.classList.remove('hidden');
        if (ok) {
          slot.classList.add('is-hit', 'burst');
          chip.remove();
          dragScore += 1;
          dragPlaced += 1;
          dragIdx += 1;
          registerGameResult(true);
          feedback.className = 'mt-4 p-3 rounded-xl font-bold text-sm bg-emerald-50 text-emerald-800 block';
          feedback.textContent = '✅ 配對正確！' + row.item + ' → ' + name;
          dragTapPickSlot = null;
          setTimeout(function() { renderGame(); }, 500);
        } else {
          registerGameResult(false);
          feedback.className = 'mt-4 p-3 rounded-xl font-bold text-sm bg-rose-50 text-rose-700 block';
          feedback.textContent = '❌ 這個任務更適合：' + dragTapPickSlot;
        }
      });
      slotsWrap.appendChild(slot);
    });
  } else if (gameMode === 'maze') {
    setGameMeter(mazeHasKey ? 70 : 35);
    if (prog) prog.textContent = mazeHasKey ? '拿鑰匙後前往出口' : '先拿鑰匙';
    if (score) score.textContent = String(Math.max(0, 500 - mazeSteps * 7));
    var atGoal = mazePos.r === mazeGoalCell.r && mazePos.c === mazeGoalCell.c;
    if (atGoal && mazeHasKey) {
      registerGameResult(true);
      vp.innerHTML = '<div class="burst p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center"><p class="text-2xl font-black text-emerald-700">🏁 迷宮破關！</p><p class="text-sm font-bold text-emerald-700 mt-1">第 ' + mazeStage + ' 關完成</p><p class="star-row mt-2">星等：' + buildStarsByRatio(mazeSteps <= 20 ? 1 : mazeSteps <= 32 ? 0.72 : 0.55) + '</p><p class="text-sm text-slate-700 mt-1">步數：' + mazeSteps + '（越少越高分）</p><p class="text-sm text-slate-700 mt-3 font-bold">要進行下一關嗎？</p><div class="mt-3 grid sm:grid-cols-2 gap-2"><button type="button" class="p-3 rounded-xl bg-emerald-600 text-white font-bold" onclick="initMazeLevel();renderGame()">✅ 好，下一關</button><button type="button" class="p-3 rounded-xl bg-slate-100 text-slate-800 font-bold" onclick="mazeHasKey=false;mazeSteps=0;mazePos={r:mazeStartCell.r,c:mazeStartCell.c};mazeTipText=\'重玩本關：先拿鑰匙，再到終點。\';renderGame()">🔁 先重玩本關</button></div></div>';
      return;
    }
    vp.innerHTML = '<h3 class="text-lg font-black text-slate-900">AI 迷宮：先拿 🔑 再走到 🏁</h3><p class="text-sm text-slate-500">可用鍵盤方向鍵，或右側控制器。每走到提示點會解鎖一條 AI 重點。</p><div class="mt-4 grid lg:grid-cols-[1fr_220px] gap-3 items-start"><div><div id="maze-grid" class="maze-grid"></div><div class="mt-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-sm text-indigo-900"><strong>學習提示：</strong> ' + mazeTipText + '</div></div><div class="rounded-xl border border-slate-200 bg-slate-50 p-3"><p class="text-xs font-black text-slate-500 mb-2">移動控制</p><div class="grid grid-cols-3 gap-2"><button type="button" id="maze-up" class="p-2 rounded-lg bg-white border font-bold">⬆️</button><div></div><div></div><button type="button" id="maze-left" class="p-2 rounded-lg bg-white border font-bold">⬅️</button><button type="button" id="maze-down" class="p-2 rounded-lg bg-white border font-bold">⬇️</button><button type="button" id="maze-right" class="p-2 rounded-lg bg-white border font-bold">➡️</button></div></div></div>';
    var mg = document.getElementById('maze-grid');
    for (var r = 0; r < mazeMap.length; r++) {
      for (var c = 0; c < mazeMap[r].length; c++) {
        var cell = document.createElement('div');
        var cls = 'maze-cell ';
        if (mazeMap[r][c] === 1) cls += 'maze-wall';
        else cls += 'maze-road';
        if (r === mazeGoalCell.r && c === mazeGoalCell.c) { cls = 'maze-cell maze-goal'; cell.textContent = '🏁'; }
        if (!mazeHasKey && r === mazeKeyCell.r && c === mazeKeyCell.c) { cls = 'maze-cell maze-key'; cell.textContent = '🔑'; }
        if (r === mazePos.r && c === mazePos.c) { cls = 'maze-cell maze-player'; cell.textContent = '🤖'; }
        cell.className = cls;
        mg.appendChild(cell);
      }
    }
    document.getElementById('maze-up').onclick = function() { tryMoveMaze(-1, 0); };
    document.getElementById('maze-down').onclick = function() { tryMoveMaze(1, 0); };
    document.getElementById('maze-left').onclick = function() { tryMoveMaze(0, -1); };
    document.getElementById('maze-right').onclick = function() { tryMoveMaze(0, 1); };
  } else if (gameMode === 'puzzle') {
    if (prog) prog.textContent = 'Unblock：拖曳方塊幫 AI包 出口';
    if (score) score.textContent = String(Math.max(0, 700 - unblockMoves * 25));
    var goalBlock = unblockBlocks.find(function(b) { return b.goal; });
    var unblockSolved = goalBlock && goalBlock.c + goalBlock.len >= 6;
    setGameMeter(Math.min(100, ((goalBlock ? goalBlock.c : 0) / 4) * 100));
    if (unblockSolved) {
      registerGameResult(true);
      vp.innerHTML = '<div class="burst p-5 rounded-2xl bg-violet-50 border border-violet-200 text-center"><p class="text-2xl font-black text-violet-700">🧱 解路成功！</p><p class="text-sm font-bold text-violet-700 mt-1">第 ' + unblockLevel + ' 關完成</p><p class="star-row mt-2">星等：' + buildStarsByRatio(unblockMoves <= 10 ? 1 : unblockMoves <= 16 ? 0.72 : 0.55) + '</p><p class="text-sm text-slate-700 mt-1">拖曳步數：' + unblockMoves + '</p><p class="text-sm text-violet-700 mt-1">學到：先排障礙，再讓主任務通關（像做專案一樣）。</p><p class="text-sm text-slate-700 mt-3 font-bold">要進行下一關嗎？</p><div class="mt-3 grid sm:grid-cols-2 gap-2"><button type="button" class="p-3 rounded-xl bg-violet-600 text-white font-bold" onclick="initUnblockLevel();renderGame()">✅ 下一關</button><button type="button" class="p-3 rounded-xl bg-slate-100 text-slate-800 font-bold" onclick="initUnblockLevel();renderGame()">🎲 換一關</button></div></div>';
      return;
    }
    vp.innerHTML = '<h3 class="text-lg font-black text-slate-900">AI Unblock：拖曳方塊幫「AI包」找出口</h3><p class="text-sm text-slate-500">滑鼠或手指拖曳方塊，只能沿著方塊方向移動。目標：讓 AI包 往右邊發光出口離開。</p><p class="unblock-level-badge mt-3">第 ' + unblockLevel + ' 關</p><div id="unblock-board" class="unblock-board mt-2"></div><p class="text-sm mt-3 text-slate-600">方塊數 <strong>' + unblockBlocks.length + '</strong>｜提示：先移 Review / Guard 等擋路方塊。</p>';
    var board = document.getElementById('unblock-board');
    var boardRect = board.getBoundingClientRect();
    var cell = boardRect.width / 6;
    var sortedBlocks = unblockBlocks.slice().sort(function(a, b) {
      if (a.r !== b.r) return a.r - b.r;
      return a.c - b.c;
    });
    sortedBlocks.forEach(function(b) {
      var el = document.createElement('div');
      var theme = getUnblockChipTheme(b);
      el.className = 'unblock-chip unblock-chip--' + theme + ' absolute rounded-xl border font-black text-xs flex items-center justify-center select-none cursor-grab active:cursor-grabbing';
      el.style.left = (b.c * cell + 6) + 'px';
      el.style.top = (b.r * cell + 6) + 'px';
      el.style.width = ((b.dir === 'h' ? b.len : 1) * cell - 12) + 'px';
      el.style.height = ((b.dir === 'v' ? b.len : 1) * cell - 12) + 'px';
      el.textContent = b.label;
      el.onpointerdown = function(e) {
        e.preventDefault();
        unblockDrag = { id: b.id, sx: e.clientX, sy: e.clientY, sc: b.c, sr: b.r };
        el.classList.add('is-dragging');
        el.setPointerCapture(e.pointerId);
      };
      el.onpointermove = function(e) {
        if (!unblockDrag || unblockDrag.id !== b.id) return;
        var dx = e.clientX - unblockDrag.sx;
        var dy = e.clientY - unblockDrag.sy;
        el.style.transform = b.dir === 'h' ? ('translateX(' + dx + 'px)') : ('translateY(' + dy + 'px)');
      };
      el.onpointerup = function(e) {
        if (!unblockDrag || unblockDrag.id !== b.id) return;
        el.classList.remove('is-dragging');
        var dx = e.clientX - unblockDrag.sx;
        var dy = e.clientY - unblockDrag.sy;
        var step = Math.round((b.dir === 'h' ? dx : dy) / cell);
        var nextC = unblockDrag.sc;
        var nextR = unblockDrag.sr;
        var sign = step >= 0 ? 1 : -1;
        var canMove = function(testR, testC) {
          for (var i = 0; i < unblockBlocks.length; i++) {
            var other = unblockBlocks[i];
            if (other.id === b.id) continue;
            var aR0 = testR, aC0 = testC, aR1 = testR + (b.dir === 'v' ? b.len - 1 : 0), aC1 = testC + (b.dir === 'h' ? b.len - 1 : 0);
            var oR0 = other.r, oC0 = other.c, oR1 = other.r + (other.dir === 'v' ? other.len - 1 : 0), oC1 = other.c + (other.dir === 'h' ? other.len - 1 : 0);
            if (!(aR1 < oR0 || aR0 > oR1 || aC1 < oC0 || aC0 > oC1)) return false;
          }
          return true;
        };
        for (var m = 0; m < Math.abs(step); m++) {
          var tc = nextC + (b.dir === 'h' ? sign : 0);
          var tr = nextR + (b.dir === 'v' ? sign : 0);
          if (tr < 0 || tc < 0 || tr + (b.dir === 'v' ? b.len : 1) > 6 || tc + (b.dir === 'h' ? b.len : 1) > 6) break;
          if (!canMove(tr, tc)) break;
          nextC = tc; nextR = tr;
        }
        var moved = nextC !== unblockDrag.sc || nextR !== unblockDrag.sr;
        b.c = nextC; b.r = nextR;
        el.style.transform = '';
        unblockDrag = null;
        if (moved) {
          unblockMoves += 1;
          registerGameResult(true);
        }
        renderGame();
      };
      board.appendChild(el);
    });
    var exit = document.createElement('div');
    exit.className = 'unblock-exit';
    exit.style.top = (2 * cell + 6) + 'px';
    exit.style.height = (cell - 12) + 'px';
    exit.textContent = 'EXIT';
    board.appendChild(exit);
  } else if (gameMode === 'shooter') {
    setGameMeter(modeTimeLimit.shooter ? ((modeTimeLimit.shooter - Math.max(0, gameTimeLeft)) / modeTimeLimit.shooter) * 100 : 0);
    if (score) score.textContent = String(shooterHits * 100);
    if (shooterRoundIdx >= shooterRounds.length) {
      var ratio = (shooterHits + shooterMiss) ? (shooterHits / (shooterHits + shooterMiss)) : 0;
      vp.innerHTML = '<div class="burst p-5 rounded-2xl bg-cyan-50 border border-cyan-200 text-center"><p class="text-2xl font-black text-cyan-700">🎯 射擊任務完成！</p><p class="text-sm font-bold text-cyan-800 mt-1">5 關全破（含 Boss 關）</p><p class="star-row mt-2">星等：' + buildStarsByRatio(ratio) + '</p><p class="text-sm text-slate-700 mt-1">命中：' + shooterHits + '｜失誤：' + shooterMiss + '</p><button type="button" class="mt-4 w-full p-3 rounded-xl bg-cyan-600 text-white font-bold" onclick="shooterRoundIdx=0;shooterHits=0;shooterMiss=0;shooterRoundDone=0;shooterRoundNeed=0;renderGame()">再玩一次</button></div>';
      return;
    }
    var round = shooterRounds[shooterRoundIdx];
    if (!shooterRoundNeed) shooterRoundNeed = round.targets.filter(function(t) { return t.good; }).length;
    if (prog) prog.textContent = '第 ' + (shooterRoundIdx + 1) + ' 關：' + round.question;
    var roundTag = round.boss ? '<span class="inline-block ml-2 px-2 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">BOSS</span>' : '';
    vp.innerHTML = '<h3 class="text-lg font-black text-slate-900">AI 射擊場：' + round.question + roundTag + '</h3><p class="text-sm text-slate-600">' + (round.hint || '移動準星瞄準，點擊射擊正確目標。') + ' 空放會扣連擊。</p><div class="shooter-wrap mt-4"><div id="shooter-arena" class="shooter-arena" aria-label="射擊場，滑鼠移入顯示準星"><div class="shooter-hud-bar">🎯 進場內移動滑鼠瞄準｜進度 ' + shooterRoundDone + '/' + shooterRoundNeed + '</div></div></div><p class="text-sm mt-3 text-slate-600">命中：<strong>' + shooterHits + '</strong> ｜ 失誤：<strong>' + shooterMiss + '</strong></p>';
    var arena = document.getElementById('shooter-arena');
    var shooterBusy = false;
    var shooterLayout = getShooterLayout(arena);
    var hudText = shooterLayout.mobile
      ? '🎯 手指移動瞄準｜' + shooterRoundDone + '/' + shooterRoundNeed
      : '🎯 進場內移動滑鼠瞄準｜進度 ' + shooterRoundDone + '/' + shooterRoundNeed;
    arena.querySelector('.shooter-hud-bar').textContent = hudText;
    var placed = [];
    round.targets.forEach(function(t, idx) {
      var pos = placeShooterTarget(round, idx, shooterLayout);
      var tries = 0;
      while (tries < 50) {
        var overlap = false;
        for (var p = 0; p < placed.length; p++) {
          if (Math.abs(placed[p].x - pos.tx) < shooterLayout.targetW * 0.88 &&
              Math.abs(placed[p].y - pos.ty) < shooterLayout.targetH * 0.92) {
            overlap = true;
            break;
          }
        }
        if (!overlap) break;
        pos = placeShooterTarget(round, idx, shooterLayout);
        tries++;
      }
      placed.push({ x: pos.tx, y: pos.ty });

      var wrap = document.createElement('div');
      wrap.className = 'target-float ' + pos.speedClass;
      wrap.style.left = pos.tx + 'px';
      wrap.style.top = pos.ty + 'px';
      wrap.style.setProperty('--dx', pos.dx + 'px');
      wrap.style.setProperty('--dy', pos.dy + 'px');
      wrap.style.setProperty('--drift-dur', pos.dur + 's');

      var btn = document.createElement('button');
      btn.type = 'button';
      var cls = 'target-dot ' + (t.boss ? 'target-dot--boss' : (t.good ? 'target-dot--good' : 'target-dot--bad'));
      btn.className = cls;
      btn.textContent = t.label;
      btn.setAttribute('aria-label', (t.good ? '可射目標：' : '陷阱目標：') + t.label);
      btn.onpointerdown = function(e) { e.stopPropagation(); };
      btn.onclick = function(e) {
        e.stopPropagation();
        if (btn.disabled || shooterBusy) return;
        shooterBusy = true;
        btn.disabled = true;
        showShooterShotFx(arena, e.clientX, e.clientY);
        if (t.good) {
          showShooterFloatScore(arena, btn, '+100');
          shatterTarget(btn, arena, 'good', function() {
            if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
            shooterHits += 1;
            shooterRoundDone += 1;
            registerGameResult(true);
            showGameFx('🎯 命中！', 'good');
            if (score) score.textContent = String(shooterHits * 100);
            if (shooterRoundDone >= shooterRoundNeed) {
              shooterRoundIdx += 1;
              shooterRoundDone = 0;
              shooterRoundNeed = 0;
            }
            shooterBusy = false;
            renderGame();
          });
        } else {
          shatterTarget(btn, arena, 'bad', function() {
            if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
            shooterMiss += 1;
            registerGameResult(false);
            showGameFx('💥 射錯目標', 'bad');
            shooterBusy = false;
            renderGame();
          });
        }
      };
      wrap.appendChild(btn);
      arena.appendChild(wrap);
    });
    bindShooterArena(arena, function() {
      if (shooterBusy) return;
      shooterMiss += 1;
      registerGameResult(false);
      showGameFx('空槍！瞄準再射', 'bad');
      renderGame();
    });
  }
}

function initAiLab() {
  initPracticeLab();
  initPromptLab();
  initGameLab();
}

// 相容舊版 index 內嵌函式名
function assemblePromptString() { updatePromptOutputs(); }
function renderQuizStep() { gameMode = 'quiz'; renderGame(); }
function selectPromptFactor() { /* 已由 initPromptLab 取代 */ }

window.initAiLab = initAiLab;
window.copyPromptOutput = copyPromptOutput;
window.renderGame = renderGame;
window.resetCurrentGameProgress = resetCurrentGameProgress;
