/** 每課專用圖（雙圖對比），避免載入失敗時全部變成同一張 */
const IMG = {
  apertureWide: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800",
  apertureNarrow: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
  aperturePortrait: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
  shutterFreeze: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
  carTrails: "https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=800",
  fireflies: "https://images.pexels.com/photos/326447/pexels-photo-326447.jpeg?auto=compress&cs=tinysrgb&w=800",
  firefliesAlt: "https://images.pexels.com/photos/2878716/pexels-photo-2878716.jpeg?auto=compress&cs=tinysrgb&w=800",
  triangleBg: "https://images.pexels.com/photos/51388/pexels-photo-51388.jpeg?auto=compress&cs=tinysrgb&w=800",
  threePoint: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
  splitLight: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  splitLightAlt: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  tonalRange: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  warmIndoor: "https://images.pexels.com/photos/1264216/pexels-photo-1264216.jpeg?auto=compress&cs=tinysrgb&w=800",
  phoneHand: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800",
  dslrCamera: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800",
  videoRecord: "https://images.pexels.com/photos/3379942/pexels-photo-3379942.jpeg?auto=compress&cs=tinysrgb&w=800",
  capcutEdit: "https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg?auto=compress&cs=tinysrgb&w=800",
  weddingBokeh: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800",
  bridePortrait: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
  rimBacklitPortrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  rimBacklitAlt: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=800&q=80",
  sparklerWedding: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800",
  banquetHall: "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=800"
};

const PEX = IMG;

const photographyPreface = {
  title: "開始之前｜這頁要怎麼練",
  contentHtml: `<p>這頁不是背規格表，而是把<strong>光圈、快門、構圖、光線、後製</strong>做成能拖、能看、能對照的練習。手機或相機都適用，差在你能調多少、畫質上限在哪。</p>
    <p>建議節奏：先玩曝光 → 再看構圖與焦段 → 接著看光線 → 最後碰 RAW 與剪映。每個模組上方有「本模組怎麼練」；看不懂名詞再開術語翻譯。</p>`,
  steps: [
    { icon: "1️⃣", title: "先玩曝光", desc: "光圈、快門、ISO——看亮度、動態與質感怎麼連動" },
    { icon: "2️⃣", title: "再看構圖", desc: "地平線、九宮格、焦段——畫面穩不穩、空間怎麼壓縮" },
    { icon: "3️⃣", title: "最後後製", desc: "RAW/JPG、白平衡、直方圖、剪映——把素材變成可交付作品" }
  ]
};

const LIGHT_DIAG = {
  s1: "assets/light-s1.png",
  s2: "assets/light-s2.png",
  s3: "assets/light-s3.png",
  s4: "assets/light-s4.png",
  s5: "assets/light-s5.png",
  s6: "assets/light-s6.png"
};

const lightingPreface = {
  title: "💡 打燈布光：六階段由淺入深",
  contentHtml: `<p>本單元用<strong>上帝視角燈位圖</strong>，從認識器材開始，依序練到三燈佈光。每一課配一張示意圖，下方互動區可拖滑桿感受主光角度、補光強度與光質軟硬。</p>
    <ol>
      <li><strong>理解基本組件</strong>——被攝者、燈架、柔光傘、相機、牆壁。</li>
      <li><strong>單燈直射</strong>——最乾淨、但最缺乏立體感。</li>
      <li><strong>雙燈佈光</strong>——主燈＋補光，建立層次。</li>
      <li><strong>與背景分離</strong>——人向前移，消除雜亂牆影。</li>
      <li><strong>專業背景分離</strong>——乾淨、立體的棚拍感。</li>
      <li><strong>三燈佈光</strong>——加入髮燈／勾邊光，勾出輪廓。</li>
    </ol>
    <p>建議按順序閱讀；每課先看燈位圖，再用下方沙盒對照臉部明暗變化。</p>`
};

const FLASH_DIAG = {
  u1: "assets/flash-u1.png",
  u3: "assets/flash-u3.png",
  u4: "assets/flash-u4.png",
  u6: "assets/flash-u6.png",
  u8: "assets/flash-u8.png",
  u9: "assets/flash-u9.png",
  u10: "assets/flash-u10.png",
  u11: "assets/flash-u11.png"
};

const speedlightPreface = {
  title: "⚡ 機頂閃燈實戰：從反打修正到婚禮佈光",
  contentHtml: `<p>接續<strong>打燈布光六階段</strong>的離機邏輯，本單元聚焦<strong>機頂閃燈 (Speedlight)</strong>——更輕、更快，適合活動、戶外與婚禮快拍。</p>
    <p><strong>五階段路線圖</strong></p>
    <ol>
      <li><strong>機頂燈基礎</strong>——單燈反打牆壁，修正硬光交叉影子。</li>
      <li><strong>多機頂配置</strong>——雙燈對稱 → 三點佈光，逐步加層次。</li>
      <li><strong>柔光道具</strong>——透光傘、反光傘、柔光箱、蜂巢格柵的取捨。</li>
      <li><strong>實戰主題</strong>——戶外 HSS 補光、婚禮純白背景雙燈。</li>
      <li><strong>經典打燈法</strong>——環形光、林布蘭光、分割光、劇場夾光。</li>
    </ol>
    <p><strong>Universal 常數</strong>：不論幾盞燈、用什麼道具，人與背景牆請拉開 <strong>&gt;1.5M</strong>。</p>`
};

const capcutGuides = {
  import: {
    steps: [
      "開啟剪映 App → 點「開始創作」",
      "點「加入」→ 勾選要用的影片與圖片",
      "長按片段拖動順序，先排出頭、中、尾",
      "播放頭移到要剪掉處 → 點「分割」→ 刪除多餘片段",
      "每段前後先保留 0.5 秒，避免銜接太硬"
    ]
  },
  transition: {
    steps: [
      "點兩段影片「交界處」的白色小方塊",
      "選「轉場」→ 新手先用「疊化」",
      "長度先設 0.2～0.3 秒",
      "先固定一種轉場，全片看起來最穩",
      "想升級再對齊音樂鼓點切鏡"
    ]
  },
  color: {
    steps: [
      "點選時間軸上的片段 →「調節」",
      "先調色溫：偏暖較溫馨，偏冷較俐落",
      "飽和度先 +5～+15，避免顏色過頭",
      "濾鏡強度先控制在 30% 以內",
      "調好一段後，複製到同場景片段"
    ]
  },
  export: {
    steps: [
      "點右上角「匯出」",
      "解析度先用 1080P（新手最穩）",
      "幀率先用 30fps（通用）",
      "碼率選「推薦」或「較高」",
      "匯出後先用手機全螢幕檢查字幕有無被切到"
    ]
  }
};

const videoPreface = {
  title: "🎬 拍攝之後：剪映與交付",
  contentHtml: `<p>拍攝只是第一步。真正交付作品時，還要處理<strong>剪輯節奏、色彩一致性與輸出格式</strong>。這一區用時間軸概念，把拍攝後的整理、剪輯與交付流程串起來。</p>
    <p><strong>為什麼先用剪映</strong>：介面直覺、手機就能完成第一支片。建議路線：先拍穩 → 匯入剪映 → 分割刪多餘 → 加字幕與音樂 → 1080P 匯出。做完一支，再回來學轉場與調色。</p>`,
  whyCapcut: [
    "操作直覺，手機就能完成第一支片",
    "字幕、音樂、轉場都在同一套流程",
    "先完成再升級，比一次學完更有效"
  ]
};

const capcutDemoTutorial = {
  title: "✅ 剪映整合教學：手機版＋電腦版",
  intro: "先照手機版 7 步完成第一支影片，再用電腦版 2 步做效率升級。每一步先做一次就好，不用一次學太多。",
  mobile: [
    {
      step: "手機版 1",
      title: "首頁｜開始創作",
      image: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_3d7aafab930e45c5b178990341ca7a84_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-bb2fbd71-47e6-41be-ab18-3bb8f3486c2e.png",
      caption: "打開剪映 App，首頁點「開始創作」，先建立剪輯專案。"
    },
    {
      step: "手機版 2",
      title: "導入素材｜添加影片／圖片",
      image: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_53e166a63c85b271eaf8bfe56a0425e7_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-21fc47b3-6e37-4888-9cc3-db60c3ec3e23.png",
      caption: "選取本地影片或圖片後點「添加」，素材就會進入時間軸。"
    },
    {
      step: "手機版 3",
      title: "基礎剪輯｜分割片段",
      image: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_bf07a4be563c12786e60e5f6006cbba8_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-68fba52c-c5f3-48c3-bade-c438943eca1b.png",
      caption: "拖白色播放指針到剪點，選中片段後按「分割」，把多餘段落剪掉。"
    },
    {
      step: "手機版 4",
      title: "自動字幕｜文字轉字幕",
      image: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_d4185662a89c0c1ecf69f39814bd3b21_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-752f5331-b741-4a2f-bc2e-fbb707a61fdd.png",
      caption: "底部點「文本」→「自動字幕」，等待 AI 辨識人聲並生成字幕。"
    },
    {
      step: "手機版 5",
      title: "添加音樂｜音頻到音樂庫",
      image: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_acfc68a06b804cce23f13d5edcb5c9fc_tplv-a9rns2rl98-pc_smart_face_crop-v1_440_330-86e4ec6b-e4be-4e50-b3a2-b1102ff35bd2.png",
      caption: "點「音頻」→「音樂」，挑免費 BGM 後按「使用」加入音軌。"
    },
    {
      step: "手機版 6",
      title: "濾鏡調色｜快速統一畫面",
      image: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_ba70eedd8872f011bb52a567d4427ff7_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-324340a6-4df8-4899-8b0d-75548fd9ad04.png",
      caption: "選中片段後點「濾鏡」，選清新或冷調，再微調強度讓畫面更穩定。"
    },
    {
      step: "手機版 7",
      title: "導出設置｜1080P / 30fps",
      image: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_456c661d80d7ae4350024de7a54072a7_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-3994d332-e6b7-4847-b52a-10d2d085216a.png",
      caption: "右上角點「導出」，解析度選 1080P、幀率 30fps，確認後渲染保存。"
    }
  ],
  desktop: [
    {
      step: "電腦版 1",
      title: "主編輯介面",
      image: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_f3bc7eacd1c39f61b33a35ded116f7cb_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-34b373b8-9e58-4be5-8382-dfe405c0d6f5.png",
      caption: "認識預覽區、時間軸、工具欄、素材庫四個主要工作區。"
    },
    {
      step: "電腦版 2",
      title: "自動字幕編輯",
      image: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_3322ac0f1225f917e650cc37eb813783_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-936fbe18-0f11-4d25-946b-be4aa4ec1210.png",
      caption: "從文本進入智慧字幕，辨識語音後可批次生成並直接修改字幕。"
    }
  ]
};

const capcutAdvancedTutorial = {
  title: "🚀 剪映進階篇：5 大核心",
  intro: "本篇聚焦剪映最常用的進階能力：關鍵幀、蒙版、曲線變速、轉場與動畫、智能摳像。先照手機版上手，再用電腦版做精細化。",
  modules: [
    {
      name: "一、關鍵幀",
      subtitle: "◇ 菱形圖標｜讓畫面動起來",
      purpose: "用途：推鏡、平移、縮放、文字跟隨、運鏡動畫",
      mobileImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_8868efc8cda04524a7a98e68a1d21395_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-c0366cd3-87da-4c14-81cd-d07ab7fdfc42.png",
      desktopImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_77672c33b37e87a764fa0cca66fcc754_tplv-a9rns2rl98-pc_smart_face_crop-v1_447_335-873d21f2-748d-410d-a2c7-f4368a4fb9ab.png",
      mobileSteps: [
        "打開剪映 → 開始創作 → 導入素材",
        "選中素材（影片／文字／貼紙）→ 點菱形圖示",
        "播放頭停起點 → 打第一個關鍵幀",
        "播放頭移到結尾 → 移動／縮放／旋轉，系統自動生成尾關鍵幀"
      ],
      desktopSteps: [
        "素材拖入時間軸後選中",
        "右側屬性面板參數旁點菱形",
        "起點先打關鍵幀（位置／縮放／透明度）",
        "結尾改參數後自動生成動畫；可再用曲線調緩入緩出"
      ],
      tip: "手機版直覺快速；電腦版可對每個參數獨立打幀，精細度更高。"
    },
    {
      name: "二、蒙版",
      subtitle: "遮罩｜分屏、漸顯、聚焦",
      purpose: "用途：分屏、擦除轉場、圓形聚焦、局部遮罩",
      mobileImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_6aaa1895b8054225948bcaf8ebabf6f5_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-2016aa01-15a0-4016-9ce2-8bbff73b0db3.png",
      desktopImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_c2b48fdcfc989ce78ecff0da91dedc8d_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-5aad30f9-1b1e-4fda-9ef9-b590a66005bb.png",
      mobileSteps: [
        "選素材 → 點「蒙版」",
        "選線性／圓形／矩形",
        "羽化先設 10~30，邊緣會更自然",
        "搭配關鍵幀移動蒙版，可做動態擦除效果"
      ],
      desktopSteps: [
        "選素材 → 右側「畫面」→ 開啟蒙版",
        "可用線性／圓形／矩形／鋼筆自由繪製",
        "調羽化、角度、大小，並可配合關鍵幀動態控制",
        "上層畫中畫 + 蒙版 + 關鍵幀可做高級分屏轉場"
      ],
      tip: "電腦版鋼筆蒙版與多軌道疊加，適合精修。"
    },
    {
      name: "三、曲線變速",
      subtitle: "快慢節奏、卡點",
      purpose: "用途：慢動作、子彈時間、卡點、電影節奏",
      mobileImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_5a1bd54f3e127c0ed43511d43249a241_tplv-a9rns2rl98-pc_smart_face_crop-v1_391_293-df0a3752-1239-4b4e-87bf-799a5b31472c.png",
      desktopImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_f93b6e80fa44f93110abbc93ddf73fcf_tplv-a9rns2rl98-pc_smart_face_crop-v1_458_344-b7362e28-3e69-4138-a074-6da57bb7beec.png",
      mobileSteps: [
        "選片段 → 變速 → 曲線變速",
        "先用預設：英雄時刻／子彈時間／閃進",
        "手動拉曲線點：拉高變快、拉低變慢",
        "可搭配音頻自動踩點對齊節奏"
      ],
      desktopSteps: [
        "選片段 → 右鍵進入曲線變速",
        "開曲線面板，用更多控制點做分段調速",
        "結合波形卡點更準確",
        "慢動作可搭配補幀讓畫面更順"
      ],
      tip: "電腦版控制點更多，節奏精修更穩。"
    },
    {
      name: "四、轉場／動畫",
      subtitle: "片段順滑、高級感",
      purpose: "用途：片段不生硬、淡入淡出、入場出場動畫",
      mobileImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_fde7d0c7d47fbaeb41d85b376c1d791c_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-255b4ab4-aef6-429e-a1fb-4dce5d19833d.png",
      desktopImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_45d165ee75e98983d5024a7d40cf72c5_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-8fbe1d4d-e501-423f-a4c4-689f80769ee1.png",
      extraMobileImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_9cb7d1029f284affa7269957a434dd46_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-2d54452d-429a-4e70-817b-33b2ffa84225.png",
      extraDesktopImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_b470720fc19f9d8e879b95093f90a205_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-11935f01-38a8-4b23-bb03-e4382babd978.png",
      mobileSteps: [
        "轉場：點兩片段中間白色方塊",
        "常用疊化／淡入淡出／模糊，時長先抓 0.2~0.5 秒",
        "動畫：選素材 → 動畫 → 入場／出場",
        "常用漸顯、輕微縮放、滑入（0.3~0.8 秒）"
      ],
      desktopSteps: [
        "轉場：片段間點轉場面板，拖特效到間隙",
        "可批量套用與統一時長",
        "動畫：右側動畫選入場／出場／循環",
        "可細調時長與緩動曲線"
      ],
      tip: "特效越少越高級，淡入淡出最耐看。"
    },
    {
      name: "五、智能摳像／畫中畫",
      subtitle: "去背景、換背景、畫面疊加",
      purpose: "用途：綠幕摳像、人物去背景、雙畫面合成",
      mobileImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_c1df2a8375c4709a289633a3b1c61a83_tplv-a9rns2rl98-pc_smart_face_crop-v1_408_306-04261070-fea0-4f95-8b0e-a94c1d6258fd.png",
      desktopImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_25b91ce171631a75029674332f76d54b_tplv-a9rns2rl98-pc_smart_face_crop-v1_408_306-cac67733-4ad0-4f4f-915e-e54ed6e37fac.png",
      extraMobileImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_496be3e73a4494c50381f6379b549dbf_tplv-a9rns2rl98-pc_smart_face_crop-v1_280_210-a8971c32-ac40-4fc5-9b2c-ef4d6770f4a3.png",
      extraDesktopImage: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_4cd1d8af91d94f708764df47f4fed9dc_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-ab839439-42e8-4eed-8715-c17d6f5c7275.png",
      mobileSteps: [
        "新增畫中畫 → 導入素材",
        "選畫中畫素材 → 點摳像",
        "人像可用智能摳像；綠幕可用色度摳圖",
        "色度摳像強度先設 80~100，再微調位置與融合"
      ],
      desktopSteps: [
        "新增畫中畫，素材放上層軌道",
        "右側摳像可選智能／色度／自定義",
        "可調邊緣羽化、陰影、去殘留",
        "多軌道管理更適合複雜合成"
      ],
      tip: "電腦版摳像邊緣處理更乾淨，長片管理效率更高。"
    }
  ],
  quickCompare: [
    "手機：便攜、觸控、一鍵 AI、快速出片，適合短影片",
    "電腦：多軌道、精細關鍵幀與蒙版，適合長片與精修"
  ]
};

const photographyRepository = {
  photo_light: {
    title: "☀️ 1. 光與影的魔法視角（尋找光的方向）",
    mode: "composition",
    previewUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    easy: "想像你在黑暗中玩手電筒躲貓貓。如果光從你正前方直直照過來（順光），你的臉會很亮，但看起來扁扁的、像一張平平的紙；如果手電筒從旁邊照過來（側光），你的鼻子和臉頰就會拉出一條長長的黑色影子，五官瞬間變得非常立體、就像電影裡的超級英雄！",
    medium: "光線的方向決定了被攝物的表面質感與輪廓。標準『順光』適合拍攝色彩飽和鮮明、細節交代清楚的常規風景；而『側光』或『斜側光（45度林布蘭光）』則是拍攝人像肖像的黃金布光，能在亮部與暗部之間勾勒出極具美感的幾何漸層。",
    hard: "當光線從主體正後方逆向射入鏡頭時（逆光），會使前方主體因極大的光比反差而失去表面細節，退化為剪影。在高端多媒體影音創作中，我們會利用逆光在主體邊緣產生的邊緣輪廓光（Rim Light），將主體與背景進行強烈的物理剝離，拉開二維畫面的空間立體深度。",
    tip: "美學口訣：順光拍風景色彩鮮豔，側光拍人像立體高階。拍照前先觀察影子的長度與位置，有影子的地方才有故事。"
  },
  photo_composition: {
    title: "📐 2. 構圖圖解：九宮格與主體位置",
    mode: "composition",
    hideTierCards: true,
    chapterRead: "先看下方色塊圖（主體該放哪），再到上方互動區開九宮格、點圓圈對準黃金交叉點練一次。",
    previewUrl: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=800",
    easy: "把畫面想成井字遊戲，主角不要死塞正中間，放在四個交叉點會比較好看。",
    medium: "開啟九宮格輔助線，讓眼睛、地平線或主幹落在交叉點（三分法）。",
    hard: "交叉點是黃金比例的簡化版，順著視線自然落點排版，能減少業餘感。",
    tip: "互動：點畫面圓圈對準交叉點，再按「驗證幾何構圖結構」。"
  },
  photo_level: {
    title: "⚖️ 3. 絕對水平線與橫縱幾何線條對齊",
    mode: "composition",
    previewUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    easy: "你一定玩過公園的盪秋千，如果秋千左右兩邊的繩子不一樣長，你坐上去就會往一邊歪倒，覺得快要摔下來。我們拍照看手機時也是一樣，如果拍大海時海平面是斜的，或者拍大樓時大樓看起來快要倒了，看網站的人就會覺得頭暈、心裡不舒服。",
    medium: "在相機物理學中，幾何線條的端正是不可妥協的標準。不論是拍攝風景還是更新前端大 Banner，按下快門前，務必啟動機身內建的 Gyroscope（電子水平儀），確認綠色或黃色的對齊水平線完全重合、沒有傾斜。",
    hard: "當我們使用超廣角鏡頭（如 Sony 16-35mm GM）在都市街頭拍攝時，外圍線條會產生強烈的『透視畸變』（Perspective Distortion）。大師級的做法是保持相機感光元件與牆面絕對平行，或在後期使用變形工具（Transform）將線條校正回 90 度垂直。",
    chapterRead: "畫面歪了，觀者會本能地不舒服。拖地平線滑桿把海平面或建築拉正，這是最快提升質感的一步。",
    tip: "實戰：宴會、海景、建築快拍時，按下快門前先看電子水平儀。"
  },
  photo_angle: {
    title: "🐜 4. 螞蟻與巨人的視角（高低俯仰拍美學）",
    mode: "composition",
    previewUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    easy: "想像我們今天整個人趴在草地上，模仿小螞蟻的眼睛往上看，你會發現地上的小草和小花看起來變得跟大樹一樣雄偉！如果我們爬到高椅子上往下看，地上的玩具和人就全部縮小，變成神奇的小人國了！這就是改變視角的魔法。",
    medium: "改變拍攝的高度叫作視角變更。從高處往下拍稱為『俯拍（High-Angle Shot）』，能將環境地圖、空間分佈清晰交代；從低處往上拍稱為『仰拍（Low-Angle Shot）』，能極大地拉長物體的垂直縱向線條，賦予被攝物高大、雄偉的氣勢。",
    hard: "在電影分鏡或商用網頁設計中，視角本質上承載了心理學上的『敘事權力』。仰角拍攝能為主角注入強烈的權威感、英雄色彩與壓迫感；而俯角拍攝則會營造被攝者的渺小、無助、或提供客觀全知的第三者上帝視角。",
    tip: "大師心法：手持拍攝婚禮紀錄或微電影時，多蹲下來與兒童或寵物的眼睛保持同一水平線（Eye-Level），能瞬間拍出極具靈魂的特寫。"
  },
  photo_aperture: {
    title: "⭕ 5. 貓咪眼睛的瞳孔魔法（光圈與景深虛化）",
    mode: "aperture",
    chapterRead: "同一張人像上，只拖「光圈」滑桿：你會看到進光變亮／變暗，以及背景虛化變強／變弱——不必切換不同照片。",
    previewUrl: IMG.aperturePortrait,
    easy: "【第一步】記住：F 後面的數字越小，門越大。F1.4 = 大門，光大量湧進來，背景像奶油一樣化開；F16 = 小門，光少但前後景都清楚。\n【第二步】比喻：貓咪在大太陽下瞳孔變細（小光圈），在暗室瞳孔放大（大光圈）。\n【第三步】玩沙盒：滑桿往左是大光圈虛化，往右是小光圈全景清晰。",
    medium: "【實戰】婚禮人像常用 F1.4～F2.8 把新人從雜亂背景分離；拍桌花、合照則用 F5.6～F8 讓前後排都清楚。\n【進光量】大光圈進光亮、快門可更快；小光圈進光暗、需放慢快門或提高 ISO 補償。\n【手機】人像模式的「虛化」是演算法模擬大光圈，理解原理後才知何時會破功。",
    hard: "光圈葉片開合改變入射光錐角，進而影響景深與 Bokeh 形狀。相同快門與 ISO 下，光圈每差一檔（1 Stop）進光量約差一倍。",
    tip: "沙盒：只看畫面變化——左標籤「F1.4 大光圈」時背景應模糊；右標籤「F16 小光圈」時應全清晰。亮度也會隨之改變，這是進光量多寡。"
  },
  photo_shutter: {
    title: "⏱ 6. 瞬間時間定身術（快門速度與時空凝結）",
    mode: "shutter",
    chapterRead: "右端快門＝凝固體育瞬間；左端慢快門＝動態模糊＋疊加夜景車軌示意。同一主題感受「時間長短」的差別。",
    previewUrl: IMG.shutterFreeze,
    previewUrlAlt: IMG.carTrails,
    easy: "【第一步】快門像魔法「定！」。1/1000 秒：跑步、跳躍可定格在空中。\n【第二步】1 秒或更慢：移動的人會拖出尾巴，車燈變光線（要腳架）。\n【第三步】玩沙盒：快門滑桿拉到最右看凝固，拉到最左看殘影。",
    medium: "【實戰】拍運動至少 1/500s 以上；婚禮走動 1/125～1/250s；夜景光軌才用慢快門。\n【常見錯】慢快門手持會整張糊掉——不是對焦壞，是曝光時間太長。\n【錄影】24fps 常配 1/50s 快門，動態才自然（180° 法則）。",
    hard: "快門本身不改變景深，只決定動態在曝光時間內的累積方式。閃光燈可於極短時間凍結主體，環境仍靠快門速度記錄。",
    tip: "沙盒：右端應顯示「凝固」標籤與清晰跑者；左端顯示「殘影」標籤與動態模糊。兩者差在時間長短，不是鏡頭壞掉。"
  },
  photo_iso: {
    title: "🔢 7. 黑暗中的螢火蟲（感光度與高感噪點）",
    mode: "iso",
    chapterRead: "上方應顯示螢火蟲夜景。只拉 ISO：畫面從「暗而乾淨」變「亮而多噪點」。下方另附專業／手機／相機拍法與注意事項。",
    previewUrl: IMG.fireflies,
    previewFallback: IMG.firefliesAlt,
    easy: "【第一步】ISO 是暗光下的「音量鍵」：低＝安靜乾淨；高＝聽得到細節但充滿雜訊。\n【第二步】螢火蟲：低 ISO 螢光點清楚、夜空黑；高 ISO 變亮但出現彩噪。",
    medium: "【專業拍螢火蟲】腳架、手動 M 模式、ISO 400～1600、快門 15～30 秒、大光圈 F2.8、關閃光燈、關手電、對遠處對焦無限遠。\n【手機】夜景模式或多張堆疊；專業模式固定 ISO 100 + 慢快門（需腳架）。\n【相機】全片幅高感較佳；APS-C 建議 ISO 不超過 3200。\n【注意】勿觸碰三腳架、勿用白光嚇螢火蟲、梅雨／無月夜晚較易成功、可連拍多張降噪。",
    hard: "類比增益會放大 Read Noise。優先大光圈與長曝光，不得已才拉高 ISO。",
    tip: "沙盒：ISO 100 暗而乾淨；ISO 3200 亮但顆粒多。手機請對照「夜景與螢火蟲模式」專區。"
  },
  photo_triangle: {
    title: "⚡ 8. 曝光三角的蹺蹺板平衡（Exposure Triangle）",
    mode: "triangle",
    chapterRead: "光圈、快門、ISO 一起決定亮度，也各自影響景深、動態與雜訊。先拖一根看畫面變化，再用另外兩根補回來。",
    previewUrl: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_image-fde61029-e5b0-4f38-a6be-9e2b899edab0.png",
    demoPreviewUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    easy: "想像三個人在拉同一條繩子：光圈管進光與虛化、快門管動態、ISO 管亮度與雜訊。只動一個，另外兩個就要幫忙補。",
    medium: "暗場婚禮常先定快門（例如 1/125 不糊），再定 ISO 上限，最後才用光圈換曝光與虛化。",
    hard: "測光表只告訴你亮不亮，不會告訴你該用大光圈還是慢快門——那是你的拍攝選擇。",
    tip: "故意只動光圈讓畫面變亮，再用快門或 ISO 拉回平衡——這就是現場最常做的取捨。"
  },
  photo_focus: {
    title: "🔍 9. 放大鏡抓精準焦點（對焦與追焦學問）",
    mode: "focus",
    previewUrl: "https://images.unsplash.com/photo-1520854221256-17451c6d7c8d?auto=format&fit=crop&w=800&q=80",
    previewBgUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    easy: "你有用過放大鏡玩燒紙張的遊戲嗎？你必須前後前後移動放大鏡，直到太陽光聚集成一個最亮、最小的小圓點。拍照也是一樣，你的相機必須精準對準主角的眼睛，如果對錯地方對到背景，主角的臉就會變得模模糊糊的、像近視眼一樣！",
    medium: "對焦（Focus）決定了畫面中哪一個距離的物體最為清晰。現代相機具備強大的『人眼追蹤自動對焦（AF-C）』，能自動咬住移動中的主角。但在微距拍攝、隔著玻璃、或是暗部環境下自動對焦會失效，這時就必須切換到手動對焦（MF），轉動對焦環來精準鎖定主體。",
    hard: "對焦的本質是調整鏡頭內部光學鏡片組的相對距離，讓被攝物折射的光線精準會聚在感光元件的焦平面上。在微電影拍攝中，導演常會利用『虛實焦段切換（Rack Focus）』：前一秒前景的酒杯清晰、後一秒背景的新娘清晰，這是極高階的視覺敘事調度手法。",
    chapterRead: "拖對焦環找最清楚的位置，綠色區間代表合焦。大光圈人像最常敗在對到背景。",
    tip: "實戰：F1.4 人像先對眼睛，再構圖微調；暗場可改用手動對焦。"
  },
  photo_raw_vs_jpg: {
    title: "🎞 10. 實體粘土與彩色相片（RAW 與 JPG 寬容度）",
    mode: "darkroom",
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    easy: "JPG 就像是工廠已經幫你做好的彩色塑膠玩具，外表很漂亮，但你沒辦法改變它的形狀，只要一用力折就會斷掉；而 RAW 檔就像是還沒有捏好的無損粘土！雖然看起來灰灰醜醜的，打你可以自由把它拉長、捏扁、重新決定它的顏色和光影，完全不會損壞！",
    medium: "JPG 格式是相機大腦幫你強行去背、調色、壓縮後只剩 8-bit 色彩資訊的成品，後期調色稍微拉大曝光就會直接出現破碎噪點。而 RAW 檔是感光元件紀錄的『未加工原始數位光訊號』，擁有 14-bit 以上海量的色彩階層資訊，高光與暗部細節被完美封存。",
    hard: "8-bit 的 JPG 只能記錄 256 個色彩階度，而 14-bit 的 RAW 檔則封存了 16,384 個色階資訊！大逆光攝影時，JPG 只要一拉高陰影，黑影處就會冒出大量破碎的解像噪點；若拍攝 RAW 檔，你可以直接在後期軟體內強行拉回 4 到 5 檔的暗部階層，細節死裡復活且畫面依舊細緻純淨。",
    chapterRead: "左右對照 JPG 與 RAW，再拖暗部拉升。你會看到 JPG 容易破圖，RAW 還能救。",
    tip: "實戰：逆光、穿白紗、大反差現場——寧可拍 RAW，後製才有空間。"
  },
  photo_histogram: {
    title: "📊 11. 數字光影晴雨表（直方圖客觀科學）",
    mode: "histogram",
    previewUrl: "",
    noPreviewImage: true,
    easy: "拍照時只用眼睛看手機螢幕是不準的，因為大太陽下螢幕看起來很暗、大黑夜看螢幕又太亮。這時相機裡有一張像山丘一樣的線條圖表叫直方圖。如果小山丘全部擠在最左邊，代表你的照片太黑了；如果小山丘全部擠在最右邊，代表照片太白、什麼都看不清！",
    medium: "直方圖（Histogram）是影像曝光的絕對客觀科學標準。橫軸代表亮度，從最左邊的純黑、到中間的灰調、再到最右邊的純白。縱軸代表該亮度像素的數量。優秀的曝光，山丘通常會柔和分佈在中間，兩端沒有貼牆（撞牆）。",
    hard: "當直方圖的最右側線條直接貼緊邊緣並切斷時，代表影像出現了『高光溢出（Clipping）』，那些像素已經變成純白（#FFFFFF），在數位資訊上屬於『資訊徹底遺失』，後期無論怎麼拉低曝光都救不回任何細節。看懂直方圖，能讓你在大太陽、逆光等極端環境下，精準守住影像的黃金動態範圍。",
    chapterRead: "直方圖是現場判斷曝光的工具。拖滑桿看偏左、中間或偏右，練會先看主體細節有沒有保住。",
    tip: "實戰：白紗、黑西裝、逆光、舞台燈——螢幕不可靠，直方圖比較客觀。"
  },
  photo_lens: {
    title: "🔭 12. 定焦 vs 變焦：光學透視壓縮感",
    mode: "lens",
    previewUrlWide: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80",
    previewUrlTele: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
    previewUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    easy: "變焦鏡頭像『伸縮吸管』，站在原地就能拉近拉遠；定焦鏡頭像『定住的望遠鏡』，想看清楚遠處，你得親自走過去！定焦因為內部構造單純，拍出來的銳利度像刀割一樣。",
    medium: "定焦鏡頭具備超大光圈與極致解析度，適合婚禮人像；變焦鏡頭提供多變焦段，適合婚禮現場的快節奏紀錄。",
    hard: "關鍵在於『空間壓縮感』。長焦鏡頭（如 135mm）拍攝時，會將遠處背景與主體壓縮在同一個視覺平面，消除空間距離感；廣角鏡頭（如 16mm）則會誇大透視，讓前景更巨大。",
    chapterRead: "焦段不只是拉近拉遠。從廣角推到長焦，看街道透視怎麼從誇張變成壓縮。",
    tip: "實戰：街拍 24–35mm、人像 85mm、運動場邊 135mm——先選焦段再站位。"
  },
  photo_wb: {
    title: "👓 13. 魔法變色眼鏡 (White Balance)",
    mode: "wb",
    previewUrl: PEX.warmIndoor,
    easy: "你戴上一副眼鏡，如果它讓世界變藍，你就覺得冷；如果它讓世界變橘，你就覺得溫暖。相機的白平衡就是這副眼鏡。",
    medium: "色溫（K值）決定影像冷暖。低色溫（2000K-3000K）呈現暖橘光，高色溫（7000K+）呈現冷藍光。",
    hard: "拍攝 RAW 檔的意義在於，色溫資訊是 metadata，後製調整時完全無損。這對攝影師而言，現場只需確保曝光準確，後期調整白平衡能達成完全不同的電影氛圍（如：將婚禮現場調整為冷冽的藍調敘事）。",
    chapterRead: "白平衡可以「修正」也可以「創作」。拖 K 值看膚色與氛圍怎麼變，不必每次都追求絕對正確。",
    tip: "同一場婚宴，重點是整組照片色溫一致、膚色舒服，而不是把每張都調成純白。"
  },
  photo_curtain_sync: {
    title: "💍 14. 婚禮動態流光魔術（前簾與後簾同步快門）",
    mode: "curtain",
    previewUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    previewBgUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    easy: "想像你在新人的婚禮舞池裡，有人一邊瘋狂跳舞、手上還一邊揮舞著亮晶晶的仙女棒。如果你用普通的相機拍（前簾同步），閃光燈一開始就閃了，拍出來的仙女棒火花流光，會非常奇怪地黏在人的『正前方（臉上）』，看起來像火燒人一樣把畫面拍壞；但如果開啟『後簾同步魔法』，閃光燈會在快門快要關閉的最後一聲才閃，這時仙女棒的流光線條，就會像天使的翅膀一樣，極度夢幻地拉在人的『身體後面』！",
    medium: "這是婚禮攝影師與汽車廣告導演必備的頂階閃光燈技術。傳統『前簾同步』是在快門剛開啟時閃光，隨後記錄殘影，導致移動軌跡在主體前方；而『後簾同步（Rear Curtain Sync）』是利用慢速快門先記錄夜景與車燈的流動線條（長軌跡），在快門即將關閉的最後千分之一秒才引閃閃光燈，完美將清晰的新人定格在流光溢彩的最末端。",
    hard: "在電影夜景運鏡或暗部派對分鏡中，後簾同步本質上解決了時間與位移的物理向量對齊。慢速快門（如 1/4 秒）負責將環境微弱的弱光與動態環境充分曝光，而電子閃光燈的微秒脈衝則負責凍結核心主體的邊緣銳利度。掌握後簾同步，能讓長型網頁作品集展現出令人屏息的動態張力與多媒體高級感。",
    chapterRead: "前簾與後簾差在拖影方向。慢快門留氛圍，閃燈定住主體——切換後拖慢快門看差別。",
    tip: "實戰：進場、舞池、夜景人像。要乾淨補亮用前簾也行；要動態軌跡再考慮後簾。"
  },

  // ── 模組五：打燈布光教學（六階段燈位圖） ──
  photo_light_s1: {
    title: "🗺️ 15. 理解基本組件 (The Map)",
    mode: "lighting",
    lightingPreset: "s1_map",
    diagramUrl: LIGHT_DIAG.s1,
    previewUrl: IMG.bridePortrait,
    chapterRead: "在開始打燈之前，我們先釐清場景中的基本元素。這是一張簡化的上帝視角示意圖——還沒有複雜的光線路徑，只有組件的位置關係。",
    easy: "拍照棚裡有幾樣東西要先認識：中間坐著的是被攝者；兩邊高高的燈架頂著柔光傘；前面地上是相機；後面那面是牆壁。就像玩積木前先認識每一塊積木叫什麼名字！",
    medium: "圖中標註了五個基本組件：被攝者 (Girl)、燈架 (Light Stand)、柔光傘 (Softbox Umbrella) ×2、相機 (Camera)、牆壁 (White Wall)。這張「地圖」移除了複雜的品牌標誌，只用高角度立體視角展示各器材的相對位置。",
    hard: "重點：此階段尚未引入光線路徑，請先建立空間感——誰在中心、燈在兩側、相機在前方、背景在後方。後續每一課都會從這張地圖出發，逐步加入光源與距離觀念。",
    tip: "先看上方燈位圖認組件，再拖下方滑桿預覽「光從不同方向來」時臉部明暗如何改變。"
  },
  photo_light_s2: {
    title: "💡 16. 單燈直射 (Single Direct Light)",
    mode: "lighting",
    lightingPreset: "s2_single",
    diagramUrl: LIGHT_DIAG.s2,
    previewUrl: IMG.bridePortrait,
    chapterRead: "光不是只有亮不亮，還有方向、反差與軟硬。先拖主光角度，再試補光與光質。",
    easy: "想像一盞手電筒從斜前方照過來——臉一邊亮、一邊有陰影，人就不會看起來平平的。",
    medium: "主光決定陰影方向，補光決定陰影還留多少，光質決定邊緣是硬還是柔。",
    hard: "柔光罩、反光板、牆壁反打，本質上都是在把光源變大、讓過渡更自然。",
    tip: "人像補光不是把陰影全消掉；留一點明暗，臉才有立體感。"
  },
  photo_light_s3: {
    title: "✨ 17. 雙燈佈光：建立立體感 (Dimensional Layering)",
    mode: "lighting",
    lightingPreset: "s3_two",
    diagramUrl: LIGHT_DIAG.s3,
    previewUrl: PEX.threePoint,
    chapterRead: "從單燈出發，引入第二盞燈創造層次。圖中清晰標註主燈與補光的角色、角度（45°）與出力比（1/4 與 1/16）。",
    easy: "一盞亮燈從斜邊照（主燈），另一盞暗一點的燈從另一邊補（補光）。亮的那邊臉有高光，暗的那邊陰影被柔化，人像就變立體了！",
    medium: "主燈 (Key Light，強)：放在主體側 45°、位置較高，定義光線主要方向與立體感（圖中標 1/4 出力）。補光 (Fill Light，弱)：放在相反對側、同樣偏高，但出力較弱（如 1/16），柔化陰影而不完全填平。",
    hard: "結果 (Result)：主燈側有明顯高光，補光側陰影被柔化，形成具有深度與立體感的肖像。圖中展示兩條不同的光線路徑——這是婚禮與棚拍最常用的進階基礎。",
    tip: "沙盒：主光角度停在 36°～45°，補光約 50%，觀察臉部明暗過渡是否自然。"
  },
  photo_light_s4: {
    title: "📏 18. 與背景分離：消除雜亂影子 (Eliminating Messy Shadows)",
    mode: "lighting",
    lightingPreset: "s4_sep",
    diagramUrl: LIGHT_DIAG.s4,
    previewUrl: PEX.threePoint,
    chapterRead: "關鍵教學點：主體與背景牆過於接近，會在牆上留下雜亂影子。解法是把人向前移（>1.5M），並讓問題物品退到遠處角落。",
    easy: "如果你站得離牆太近，燈一打，牆上會出現你的大影子，還有後面椅子的影子。往前站遠一點，影子就弱到幾乎看不見了！",
    medium: "保留雙燈佈光設定，但標註「人向前移 (>1.5M)」——被攝者遠離牆壁。雜亂物品（如椅子）重新出現，但標註「問題物品遠離」，放在極遠的背景角落。主燈散光因距離過遠而擴散變弱。",
    hard: "結果 (Result)：主燈與補光仍照亮主體，但光線擴散後無法在 distant 牆上投射清晰雜影，背景變乾淨。這是佈光中最重要的觀念之一——分離 (Separation) 往往靠距離，不只是靠燈。",
    tip: "沙盒：維持 45° 雙燈設定，想像主體已離牆 1.5M 以上——觀察臉部立體感是否保留、背景是否不再搶戲。"
  },
  photo_light_s5: {
    title: "🏛️ 19. 專業背景分離：乾淨且立體 (Studio Separation)",
    mode: "lighting",
    lightingPreset: "s5_studio",
    diagramUrl: LIGHT_DIAG.s5,
    previewUrl: PEX.threePoint,
    chapterRead: "從「分離背景」再進一步：展示專業棚拍風格的乾淨背景。人仍向前移，牆壁渲染為均勻、較暗的中性色，雜物全部移除。",
    easy: "專業攝影棚的照片，背景常常又乾淨又暗暗的，人卻亮亮的、很有立體感。秘密就是：人離背景很遠，燈只照在人身上，不會「砸」到牆上！",
    medium: "同樣標註「人向前移」，Key 與 Fill 仍聚焦主體。遠處牆壁均勻乾淨、色調中性偏暗；所有雜亂物品已移除。光線路徑標註「散光遠離」，強調光線不砸在牆上。",
    hard: "結果 (Result)：雖是雙燈，但因背景乾淨且遠離，肖像呈現專業、立體、乾淨的分離感。這是邁向進階打燈的重要基礎——先搞定背景，再加第三盞燈。",
    tip: "沙盒：提高光質柔度，搭配中等補光，感受「乾淨背景＋立體人像」的棚拍質感。"
  },
  photo_light_s6: {
    title: "🎬 20. 三燈佈光：增加層次與勾邊 (Three-Point Lighting)",
    mode: "lighting",
    lightingPreset: "s6_three",
    diagramUrl: LIGHT_DIAG.s6,
    previewUrl: PEX.threePoint,
    chapterRead: "最進階的打燈：從專業分離設定出發，引入第三盞裸燈作為髮燈／勾邊光 (Hair/Rim Light)，指向頭髮與肩膀後方。",
    easy: "除了前面兩盞燈，後面再加一小盞燈照頭髮和肩膀邊緣，像給人描了一圈亮邊，人就從暗暗的背景「跳」出來了！",
    medium: "三條光線路徑：主燈 (Key) 45° 側前方（1/4）；補光 (Fill) 對側（1/16）；髮燈／勾邊光 (Rim) 在後方角落、裸燈不加傘（1/16），指向髮際與肩線。背景保持均勻且暗。",
    hard: "結果 (Result)：髮燈在頭髮與肩膀炸出清晰明亮的邊緣勾邊，將主體從較暗背景中完美「勾」出來。這是具有豐富層次與高級感的肖像打燈——婚禮、商業人像的標準終點。",
    tip: "沙盒：主光 45°、補光約 50%、光質偏柔；對照燈位圖想像後方 Rim 光，觀察臉部層次與輪廓分離。"
  },

  // ── 模組六：機頂閃燈實戰（Speedlight） ──
  photo_flash_u1: {
    title: "⚡ 單元 1 · 修正硬光陰影——單燈反打牆壁",
    mode: "flash",
    flashStage: "第 1 階段 · 機頂燈基礎與物理原理",
    diagramUrl: FLASH_DIAG.u1,
    diagramSize: "wide",
    diagramCaption: "閃光燈佈光修正指南：單燈反打（含燈位、物理、前後對比、參數）",
    chapterRead: "為消除原始圖中的高低交叉硬影，本課只用一盞機頂閃燈：人離牆 >1.5M，閃燈抬頭並向後旋轉 180° 反打牆壁，讓小光源變大、硬光變柔。",
    easy: "機頂閃燈不要直打臉！把燈頭轉向後方牆壁，光彈回來照臉——就像對牆壁打手電筒，光變柔、影子只剩一個方向。記得讓模特兒離牆遠一點（>1.5 公尺）。",
    medium: "【上帝視角】相機在前，女孩坐藍凳；單機頂裸燈抬頭＋反打角度，指向後方白牆。\n【物理】裸燈光束打牆再彈回 → 牆面成為大面積反射源，硬光變柔光。\n【對比】左：交叉重影、影子砸糊；右：Bounce 後陰影單向且柔化，背景乾淨。",
    hard: "反打需較高出力補償光損；先前課的雙燈主／補光設定在此改為「單燈」，其餘燈具移除。重點不是功率數字，而是：距離 + 反打 + 單一光向。",
    dataCardHtml: `<ul class="list-disc pl-5 space-y-1">
      <li><strong>牆距</strong>：人與背景 &gt;1.5M（Universal 常數）</li>
      <li><strong>燈具</strong>：單機頂裸燈，抬頭 + 向後旋轉 180° 反打牆面</li>
      <li><strong>出力</strong>：1/4（反打光損大，需較高功率）</li>
      <li><strong>曝光</strong>：f/5.6 · 1/160s · ISO 200</li>
      <li><strong>角度</strong>：高角度反打（High-angle bounce）</li>
    </ul>`,
    tip: "實戰口訣：先拉牆距，再轉燈頭反打——兩步做對，比加第二盞燈更有效。"
  },
  photo_flash_u2: {
    title: "⚡ 單元 2 · 雙機頂燈對稱佈光（標準人像）",
    mode: "flash",
    flashStage: "第 2 階段 · 多機頂燈配置",
    chapterRead: "在單燈反打基礎上，改用兩盞機頂閃燈（裸燈）對稱置於主體兩側 45° 前方，高角度向下；下方可加反光板填充。人與牆距維持 1.5M 以上。",
    easy: "兩盞小閃燈像兩隻手電筒，從左前、右前一起照過來，臉上光很均勻；腳下再放一塊反光板，下巴陰影也會亮一點。",
    medium: "【上帝視角】兩裸燈對稱 45°、高角度下傾；標註「下方反光板填充」。\n【距離】拉遠人與牆至 1.5M，避免雙燈散光在牆上疊出重影。\n【結果】膚色均勻、陰影極少，背景因距離拉開而呈現乾淨白。",
    hard: "對稱佈光適合證件照、電商標準人像，但立體感不如 45° 主補光比。進階時可故意降低一側出力，製造微側光層次。",
    tip: "燈位圖待補；可先對照上一單元「雙燈佈光」概念，把離機燈換成機頂裸燈想像。"
  },
  photo_flash_u3: {
    title: "⚡ 單元 3 · 進階三點佈光（立體肖像）",
    mode: "flash",
    flashStage: "第 2 階段 · 多機頂燈配置",
    diagramUrl: FLASH_DIAG.u3,
    diagramCaption: "三機頂閃燈佈光：主光、補光、後方髮燈／勾邊光",
    chapterRead: "引入第三盞裸燈放在後方角落，指向頭髮與肩膀（髮燈／勾邊光）。人與牆距 >1.5M，背景保持均勻偏暗。",
    easy: "前面兩盞燈照臉，後面第三盞只照頭髮和肩膀邊緣，像給人勾了一圈亮線，人就從暗暗的背景跳出來！",
    medium: "【上帝視角】左前主光、右前補光、後方髮燈（裸燈、無傘）；三條光路各負其責。\n【結果 crop】立體分層明顯，髮絲與肩線有亮邊，與較暗乾淨背景完全分離。",
    hard: "出力比示例：主燈 1/8、補光 1/32、髮燈 1/16（裸燈）。髮燈過強會出現 halo，過弱則分離感不足——以肩線「看得見但不搶戲」為準。",
    dataCardHtml: `<ul class="list-disc pl-5 space-y-1">
      <li><strong>牆距</strong>：&gt;1.5M（Universal 常數）</li>
      <li><strong>主燈</strong>：1/8 · 45° 側前方</li>
      <li><strong>補光</strong>：1/32 · 對側</li>
      <li><strong>髮燈／勾邊</strong>：1/16 · 後方裸燈，指向髮際與肩線</li>
      <li><strong>曝光</strong>：依環境微調，優先保留髮絲勾邊</li>
    </ul>`,
    tip: "對照燈位圖：三盞都是機頂閃形態，但角色與出力完全不同——先定主光，再疊補光，最後才加 Rim。"
  },
  photo_flash_u4: {
    title: "⚡ 單元 4 · 柔光傘：透光 vs 反光",
    mode: "flash",
    flashStage: "第 3 階段 · 柔光道具的運用 (The Modifiers)",
    diagramUrl: FLASH_DIAG.u4,
    diagramSize: "wide",
    diagramCaption: "第 3 階段總覽：單元 4 柔光傘（透光 vs 反光）— 請對照圖上半部",
    chapterRead: "本階段接續機頂閃燈基礎，用不同道具柔化並管理光線。單元 4 聚焦柔光傘：透光（Shoot-through）與反光（Reflective）的物理差異與成品效果。",
    easy: "透光傘像一層白布，燈從後面打進去，光穿過傘包住整張臉，超級柔和；反光傘像一面內側亮亮的傘，燈打進傘裡再彈回來，光比較有方向，臉會更有立體感。",
    medium: "【透光傘 Shoot-through】裸燈射入傘內，光路穿過傘面包圍主體；人與牆 &gt;1.5M。成品：極致柔和 (Surrounding Soft)。\n【反光傘 Reflective】裸燈射向傘內，光彈回主體；指向性較強。成品：柔和且立體 (Dimensional Soft)。\n【物理對比】包圍散射 (Surrounding) vs 指向性 (Directional)。",
    hard: "透光傘出力 1/8 往往夠用；反光傘因反射光損需 1/4 補償。共通曝光：ISO 200 · f/5.6 · 1/160s。選傘的口訣：要「美肌包光」用透光；要「保留鼻影與輪廓」用反光。",
    dataCardHtml: `<div class="grid sm:grid-cols-2 gap-4">
      <div><strong>🔴 透光傘</strong><ul class="list-disc pl-5 mt-1 space-y-0.5">
        <li>出力 1/8 · ISO 200 · f/5.6 · 1/160s</li>
        <li>牆距 &gt;1.5M · 光路：穿過傘、包圍散射</li>
      </ul></div>
      <div><strong>🟢 反光傘</strong><ul class="list-disc pl-5 mt-1 space-y-0.5">
        <li>出力 1/4（加大補償）· ISO 200 · f/5.6 · 1/160s</li>
        <li>指向性強 · 光路：彈回主體</li>
      </ul></div>
    </div>`,
    tip: "同一張傘也可以換用法，但透光與反光是兩種物理——先決定要「包光」還是「立體」，再選傘型。"
  },
  photo_flash_u5: {
    title: "⚡ 單元 5 · 柔光箱：指向性與軟硬度",
    mode: "flash",
    flashStage: "第 3 階段 · 柔光道具的運用 (The Modifiers)",
    diagramUrl: FLASH_DIAG.u4,
    diagramSize: "wide",
    diagramCaption: "第 3 階段總覽：單元 5 柔光箱與蜂巢格柵 — 請對照圖下半部",
    chapterRead: "柔光箱比傘更可控：標準箱均勻散光、加蜂巢格柵則收窄光束。對照上方傘式柔光，理解「散射 → 均勻 → 指向」的光質光譜。",
    easy: "柔光箱像一個有深度的軟盒子，光從裡面均勻灑出來，臉很滑很立體；如果加蜂巢格柵（一格一格的片），光會變成一束，只照半邊臉，像電影海報！",
    medium: "【標準柔光箱】例：60cm 八角；高度對齊眼平 (Eye Level)；均勻散光 Path。成品：均勻立體感 (Even Dimensional)。出力 1/4。\n【蜂巢格柵箱】加 Grid，光路收窄、指向性強。成品：收窄指向、立體戲劇化 (Narrow Dimensional)。出力 1/2（格柵吸光）。",
    hard: "關鍵比較：傘＝散射最廣；柔光箱＝均勻且可控；蜂巢格柵＝指向最強。尺寸越大（30 / 60 / 120cm）背景光斑越大、過渡越柔——圖中難度比較可見 120cm 幾乎填滿背景。",
    dataCardHtml: `<div class="grid sm:grid-cols-2 gap-4">
      <div><strong>柔光箱 (Softbox)</strong><ul class="list-disc pl-5 mt-1 space-y-0.5">
        <li>60cm 八角 · 對齊眼平</li>
        <li>出力 1/4 · ISO 200 · f/5.6 · 1/160s</li>
      </ul></div>
      <div><strong>蜂巢格柵箱 (Grid)</strong><ul class="list-disc pl-5 mt-1 space-y-0.5">
        <li>加 Grid · 收窄光束</li>
        <li>出力 1/2（格柵吸光）· ISO 200 · f/5.6 · 1/160s</li>
      </ul></div>
    </div>
    <p class="mt-2 text-xs text-slate-500">共通：牆距 &gt;1.5M · 裸燈離機閃＋修飾器</p>`,
    tip: "婚禮棚拍常用柔光箱；要戲劇側光或背景不溢光時，才加蜂巢格柵。"
  },
  photo_flash_u6: {
    title: "⚡ 單元 6 · 戶外：強光補光與太陽光比",
    mode: "flash",
    flashStage: "第 4 階段 · 實戰主題運用 (Practical Subjects)",
    diagramUrl: FLASH_DIAG.u6,
    diagramSize: "wide",
    diagramCaption: "第 4 階段總覽：單元 6 戶外 HSS 補光 — 請對照圖左半部",
    chapterRead: "晴天太陽是強硬主光 (Ambient, Harsh)。用離機閃燈作 Fill、並開啟 HSS，才能在 1/1600s 下平衡光比，消除深影、保留立體層次。",
    easy: "大太陽下拍照，臉上影子很深？加一盞小閃燈從側邊補光，並把相機調快（HSS 高速同步），影子就會變淺，臉看起來自然又立體。",
    medium: "【無閃燈】光失衡、影子深、對比高。\n【加閃燈 + HSS】補光燈 (Fill) 側高位，光路均衡主體；標註 HSS 物理邏輯——快門可超過同步速度，仍能用閃燈填光。\n【成品】光比均衡、立體肖像 (Balanced Ratio, Dimensional Portrait)。",
    hard: "戶外 Fill 要管理「空間」：人離背景 &gt;1.5M，避免閃燈在牆上製造第二道影子。光比建議 1:2～1:4（太陽 : 閃燈）。參考統一數據卡：f/11 · 1/160s · ISO 160 為棚拍基準；戶外 HSS 則用 f/8 · 1/1600s · ISO 100。",
    dataCardHtml: `<ul class="list-disc pl-5 space-y-1">
      <li><strong>HSS 參數</strong>：f/8 · 1/1600s · ISO 100</li>
      <li><strong>閃燈出力</strong>：1/2（戶外補光需較高）</li>
      <li><strong>角色</strong>：太陽＝主光 · 閃燈＝Fill（側高位）</li>
      <li><strong>牆距</strong>：&gt;1.5M · 光比 1:2～1:4</li>
    </ul>`,
    tip: "戶外先測環境光，再決定閃燈出力；HSS 開啟後閃燈有效距離變短，燈架要靠近一些。"
  },
  photo_flash_u7: {
    title: "⚡ 單元 7 · 婚禮：純白背景＋新人曝光",
    mode: "flash",
    flashStage: "第 4 階段 · 實戰主題運用 (Practical Subjects)",
    diagramUrl: FLASH_DIAG.u6,
    diagramSize: "wide",
    diagramCaption: "第 4 階段總覽：單元 7 婚禮純白背景雙燈 — 請對照圖右半部",
    chapterRead: "棚拍婚禮肖像：主燈柔光箱照亮穿婚紗的新人，背景燈裸閃指向純白牆，讓背景比主體亮約 +2 stops 以「拉爆」成無縫白。人與牆 &gt;1.5M，移除雜亂傢俱。",
    easy: "拍婚紗照想要背景全白、人又亮又立體？前面一大盞柔光箱照新人，後面另一盞小閃燈只照白牆，把牆打比人更亮，照片就像攝影棚海報一樣乾淨！",
    medium: "【技術圖】兒童蕾絲婚紗、純白背景牆；主燈 Key＝大柔光箱高位偏側；背景燈＝裸燈指向牆（拉純白）。兩燈獨立管理曝光。\n【對比】左：原始——人物曝光不足、背景灰 (Subject Under, Background Grey)。右：成品——人物準確、完美純白背景 (Perfect White Background)。",
    hard: "背景燈通常比主燈亮 1～2 stops 才會 truly blown out；主燈過弱則臉暗，背景燈過強則主體邊緣溢光。Key 用柔光箱保留婚紗細節與立體，Background 用裸燈效率最高。",
    dataCardHtml: `<ul class="list-disc pl-5 space-y-1">
      <li><strong>主燈 Key</strong>：柔光箱 1/8 出力 · 高位偏側</li>
      <li><strong>背景燈</strong>：裸燈 1/4 出力（拉純白 · 約 +2 stops）</li>
      <li><strong>曝光</strong>：ISO 160 · f/11 · 1/120s</li>
      <li><strong>牆距</strong>：&gt;1.5M · 純白背景牆 · 無雜物</li>
    </ul>`,
    tip: "婚禮白背景口訣：先定 Key 曝光準確，再獨立加 Background 直到直方圖右側「剛好貼牆」但不過曝主體邊緣。"
  },

  photo_flash_u8: {
    title: "⚡ 單元 8 · 環形光 (Loop Lighting)",
    mode: "flash",
    flashStage: "第 5 階段 · 知名經典打燈法專題",
    diagramUrl: FLASH_DIAG.u8,
    diagramSize: "portrait",
    diagramCaption: "成品示範：環形光 — 鼻子陰影形成向下小環，不與嘴唇相連",
    chapterRead: "環形光是最受歡迎的大眾肖像打燈法，比林布蘭光更柔和，適合絕大多數臉型。主燈置於前方偏側 30°～45°、略高於眼神平視。",
    easy: "把燈放在臉的斜前方、稍微舉高一點，鼻子旁邊會有一小圈影子往下彎，像英文字母 C，但不會連到嘴唇——這就是環形光，幾乎誰拍都好看！",
    medium: "【主燈 Key】前方偏側 30°～45°，高度略高於眼神平視，燈頭下打。\n【物理特徵】鼻子陰影落在另一側臉頰，形成向下的小環形 (Loop) 陰影；陰影絕不與嘴唇連接。\n【安全距離】主體與背景牆 &gt;1.5M。",
    hard: "環形光是林布蘭光與順光之間的「安全選擇」：比順光有立體感，比林布蘭光更討喜、陰影更短。判斷標準：鼻影若碰到唇線，主光角度過側或過低，需微調。",
    dataCardHtml: `<ul class="list-disc pl-5 space-y-1">
      <li><strong>主燈 Key</strong>：30°～45° 偏側 · 高於眼神平視</li>
      <li><strong>牆距</strong>：&gt;1.5M</li>
      <li><strong>特色</strong>：Loop 鼻影 · 不連接嘴唇</li>
    </ul>`,
    tip: "不確定用哪種經典光？先試環形光——失敗率最低的大眾肖像起手式。"
  },
  photo_flash_u9: {
    title: "⚡ 單元 9 · 進階林布蘭光（反光板補光版）",
    mode: "flash",
    flashStage: "第 5 階段 · 知名經典打燈法專題",
    diagramUrl: FLASH_DIAG.u9,
    diagramSize: "portrait",
    diagramCaption: "成品示範：林布蘭光 — 暗側臉頰倒三角亮區 + 反光板柔化陰影",
    chapterRead: "古典、戲劇感強烈的林布蘭光，本課加入白色反光板作 Fill，在保留倒三角標誌的同時，暗部不再死黑，更具商業肖像質感。",
    easy: "主燈從臉的斜邊、高高的照下來，暗的那邊臉頰會出現一個倒三角形亮光；對面放一塊白色反光板，把餘光彈回來，陰影就不會黑到看不見！",
    medium: "【主燈 Key】極端側 45°、高角度下打。\n【補光 Fill】主燈正對側 45° 放置白色反光板，彈回餘光、隱約照亮暗部。\n【物理特徵】陰影側臉頰有完美倒三角亮區；反光板有效淡化原本死黑陰影。",
    hard: "純林布蘭（無反光板）光比可達 8:1，適合黑白戲劇；加反光板後光比約 4:1，保留倒三角又兼顧暗部細節——婚禮新郎、商業男性肖像常用此版。",
    dataCardHtml: `<ul class="list-disc pl-5 space-y-1">
      <li><strong>主燈 Key</strong>：45° 極端側 · 高角度下打</li>
      <li><strong>補光 Fill</strong>：白色反光板 · 對側 45°</li>
      <li><strong>牆距</strong>：&gt;1.5M</li>
      <li><strong>判斷</strong>：暗側頰部倒三角亮區清晰</li>
    </ul>`,
    tip: "反光板比第二盞閃燈更自然——想保留林布蘭味道，Fill 用板不用燈。"
  },
  photo_flash_u10: {
    title: "⚡ 單元 10 · 分割光 (Split Lighting)",
    mode: "flash",
    flashStage: "第 5 階段 · 知名經典打燈法專題",
    diagramUrl: FLASH_DIAG.u10,
    diagramSize: "portrait",
    diagramCaption: "成品示範：分割光 — 臉部垂直一分為二，一半光一半影",
    chapterRead: "分割光從臉部側面 90° 射入，將臉垂直分成光影分明的兩半。一半展現皮膚紋理與細節，另一半深嵌陰影，戲劇性與對比感極強。",
    easy: "把燈放在人的正側邊（90 度），臉會像月亮一樣一半亮、一半黑，超有電影感，適合拍帥氣的男生或很有個性的角色！",
    medium: "【燈位】單盞離機閃燈（可加柔光道具）置於極端側前方 90°，高角度下打。\n【物理特徵】鼻子陰影與臉頰陰影連接，臉部垂直分割成光影兩部分。\n【用途】展現強烈性格或戲劇性角色。",
    hard: "分割光幾乎不用 Fill，維持高對比。注意暗側眼神是否完全消失——可極微調主光高度，或保留一點環境反射。男性肖像、音樂人、Film Noir 風格最常用。",
    dataCardHtml: `<ul class="list-disc pl-5 space-y-1">
      <li><strong>出力</strong>：1/8</li>
      <li><strong>曝光</strong>：ISO 200 · f/5.6 · 1/160s</li>
      <li><strong>角度</strong>：90° 側光 · 高角度下打</li>
      <li><strong>牆距</strong>：&gt;1.5M</li>
    </ul>`,
    tip: "分割光的切割線應落在鼻樑正中——燈位偏前會退化成環形光，偏後會變背光。"
  },
  photo_flash_u11: {
    title: "⚡ 單元 11 · 劇場夾光 (Rim Light)",
    mode: "flash",
    flashStage: "第 5 階段 · 知名經典打燈法專題",
    diagramUrl: FLASH_DIAG.u11,
    diagramSize: "portrait",
    diagramCaption: "成品示範：劇場夾光 — 髮絲與肩線勾邊，主體從暗背景分離",
    chapterRead: "兩盞裸燈從後方兩側角落打入，在頭髮與肩膀勾勒立體光圈（勾邊光）；正面以低出力主燈（可加蜂巢聚光）柔和補光，保留面部細節。",
    easy: "後面左右各一盞小燈照頭髮和肩膀，會有一圈亮亮的邊；前面再用很弱的一盞燈照臉，人就從暗暗的背景跳出來，像舞台明星！",
    medium: "【勾邊燈 Rim】兩盞離機裸燈，主體後方兩側後角落，指向髮際與肩線。\n【主燈 Key】正面側高位，低出力（可加蜂巢聚光），柔和保留面部細節。\n【控光邏輯】勾邊燈比主燈亮，創造分離光、勾勒立體輪廓。",
    hard: "Rim 過強會在髮絲外圍產生 halo 溢光；主燈過強則勾邊被吃掉。背景宜偏暗中性，才能看見亮邊。與三點佈光的 Rim 概念相同，但劇場版強調雙側勾邊、對比更戲劇。",
    dataCardHtml: `<ul class="list-disc pl-5 space-y-1">
      <li><strong>勾邊燈 Rim</strong>：1/4 出力 · 後方兩側裸燈</li>
      <li><strong>主燈 Key</strong>：1/8～1/16 · 正面側高位（可加蜂巢）</li>
      <li><strong>曝光</strong>：ISO 160 · f/11 · 1/120s</li>
      <li><strong>牆距</strong>：&gt;1.5M</li>
    </ul>`,
    tip: "先開勾邊燈定輪廓，再加主燈——順序反了容易整張臉過曝、邊緣光消失。"
  },

  // ── 模組七：📱 手機拍照專區 ──
  phone_photo_pro: {
    title: "📱 21. 手機專業模式：手動曝光三要素",
    mode: "device",
    device: "phone",
    previewUrl: PEX.phoneHand,
    easy: "打開 iPhone「相機 → 更多」或 Android「專業模式 Pro」，你就能自己調 ISO、快門、白平衡，不再讓手機自動亂猜！",
    medium: "【iOS 建議】iPhone 原生介面可先鎖 AE/AF，再用曝光補償；要全手動可用 Halide、ProCamera。\n【Android 建議】多數機型在 Pro 模式可直接調 ISO/快門/WB，Samsung Expert RAW、Google Pixel 手動控制都可用。\n【實戰】婚禮進場：快門 1/125 以上防手震、ISO 上限 800、優先臉部測光。",
    hard: "手機感光元件小，高 ISO 噪點比全片幅更早出現。善用 HDR、夜景模式多張堆疊等於軟體長曝光；但動態主體仍須靠夠快快門。\n【推薦 App】拍攝：Halide / ProCamera（iOS）、Open Camera / ProShot（Android）；後製：Lightroom Mobile、Snapseed。",
    tip: "方向建議：先練「白天人像」再練「室內低光」，最後才挑戰夜景；每個場景固定只改一個參數。"
  },
  phone_photo_portrait: {
    title: "📱 22. 手機人像模式：虛化與光斑",
    mode: "aperture",
    device: "phone",
    chapterRead: "手機人像模式的「虛化」≈ 大光圈效果。下方沙盒用同一張人像，只拖光圈滑桿感受背景糊化與亮度變化（與光圈課相同原理）。",
    previewUrl: IMG.aperturePortrait,
    easy: "人像模式會用兩顆鏡頭（或 AI）分出主角，把背景變模糊——效果接近大光圈單眼。\n【玩沙盒】滑桿往左 F1.4：背景更糊、更亮；往右 F16：全景清晰、較暗。",
    medium: "【iOS】可在照片回放後再調 f 值虛化強度；【Android】人像模式名稱可能是『人像 / 景深 / 散景』，原理相同。\n最佳距離 1～2 公尺，主體與背景至少拉開 2 公尺。頭髮邊緣、玻璃、夜景光點是最常破功區。",
    hard: "手機虛化是分割蒙版 + 模糊，不是真實光學景深。商業拍攝（婚禮證婚、產品近拍）若邊緣要求高，仍建議相機大光圈。\n【App 補強】Snapseed『鏡頭模糊』可微調遮罩；Lightroom 可先調亮部壓制再做局部銳化。",
    tip: "實務流程：先拍 3 張（原生 / 人像 / 微調曝光），回家對比再決定哪張做正式交付。"
  },
  phone_photo_night: {
    title: "📱 23. 手機夜景與螢火蟲：腳架與夜景模式",
    mode: "iso",
    device: "phone",
    chapterRead: "手機拍螢火蟲：腳架＋夜景模式（多張合成）或專業模式慢快門。拉高 ISO 滑桿看噪點變化。",
    previewUrl: IMG.fireflies,
    previewFallback: IMG.firefliesAlt,
    easy: "【步驟】① 腳架固定 ② 關閃光燈 ③ 開夜景模式或 Pro ④ 點螢火蟲處對焦 ⑤ 倒數拍攝勿碰手機。",
    medium: "【iOS】夜景秒數可上滑調整，先從 2～3 秒試拍；【Android】多數夜景模式會自動堆疊，Pro 模式可手動拉 2～10 秒。\n【參數建議】ISO 100～400、白平衡 3800～4500K、關閉人像虛化。\n【推薦 App】Slow Shutter Cam（iOS）、DeepSkyCamera / Open Camera（Android）可做長曝光控制。",
    hard: "小感光元件高 ISO 噪點比單眼早出現；夜景模式是演算法補救。若主體會動，先選短秒數多拍幾張，再挑最穩定的一張後製。",
    tip: "實務建議：每個地點連拍 5 張，記錄參數，回家比對噪點與清晰度，再建立你的夜景預設。"
  },
  camera_photo_fireflies: {
    title: "📷 23b. 相機拍螢火蟲：長曝光實戰",
    mode: "iso",
    device: "camera",
    chapterRead: "相機拍螢火蟲：腳架、M 模式、長快門、中等 ISO。拉高 ISO 滑桿對照噪點。",
    previewUrl: IMG.fireflies,
    previewFallback: IMG.firefliesAlt,
    easy: "【步驟】① 腳架 ② M 模式 ③ ISO 800～1600 ④ 快門 20 秒 ⑤ F2.8 ⑥ 手動對焦無限遠 ⑦ 線控快門。",
    medium: "【設定範例】ISO 1600、20s、F2.8。全片幅畫質較佳；可拍 RAW 後期降噪。\n【注意】關防手震（腳架時）、關長曝降噪若需連拍、防蚊、勿白光。",
    hard: "螢火蟲光量會變，需試拍調整；多張平均可降噪。",
    tip: "與手機夜景課對照：相機靠長曝光，手機靠多張合成。"
  },
  phone_video_basic: {
    title: "📱 24. 手機錄影：4K、60fps 與穩定",
    mode: "video",
    device: "phone",
    videoSubtype: "shoot",
    previewUrl: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_db0c0fe1-1039-43f3-af2f-17441f44eb60-32366fc0-72c3-4ec1-b0b9-7ed4ea250056.png",
    easy: "先求穩定：雙手握穩、開防手震。第一支片建議用 1080P / 30fps 或 4K / 30fps。",
    medium: "慢動作再開 60fps。YouTube 用橫式 16:9，Reels/TikTok 用直式 9:16。",
    hard: "想再升級可鎖 AE/AF，避免亮度忽明忽暗；再加外接麥克風提升聲音品質。",
    tip: "練習順序：15 秒穩定鏡頭 → 30 秒有開頭與結尾 → 60 秒完整短片。"
  },

  // ── 模組七：📷 相機拍照專區 ──
  camera_photo_modes: {
    title: "📷 25. 相機模式轉盤：P / A / S / M",
    mode: "device",
    device: "camera",
    previewUrl: PEX.dslrCamera,
    easy: "相機頂部的轉盤就像遊戲難度：P 全自動、A 你管光圈、S 你管快門、M 全部自己管！婚禮紀錄常用 A 模式。",
    medium: "A（Av）光圈優先：調 F 值，相機自動配快門。S（Tv）快門優先：調速度凝固動態。M 手動：棚拍、閃燈、一致性曝光時使用。",
    hard: "M 模式 + 閃燈時，快門通常限於 1/200s 同步速度以下（視機身而定）。ISO 盡量固定 100～800，靠光圈換曝光。",
    tip: "對照手機專業模式，理解兩者其實在控制同一組曝光三角。"
  },
  camera_photo_lens: {
    title: "📷 26. 相機鏡頭：定焦、變焦與焦段選擇",
    mode: "lens",
    device: "camera",
    previewUrlWide: "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=800",
    previewUrlTele: "https://images.pexels.com/photos/169677/pexels-photo-169677.jpeg?auto=compress&cs=tinysrgb&w=800",
    previewUrl: PEX.dslrCamera,
    easy: "變焦鏡像伸縮吸管，定焦像固定望遠鏡——要更近就走路。24-70mm 是婚禮萬用焦段，85mm 專拍人像特寫。",
    medium: "全片幅 35mm 環境人像、50mm 標準、85mm 特寫、135mm 壓縮背景。APS-C 機身焦段要乘 1.5 或 1.6 換算。",
    hard: "相同 F1.4，全片幅景深比 M43 更淺。選鏡頭時同時考慮重量、最近對焦距離、防手震與是否支援眼控追蹤。",
    chapterRead: "焦段不是變焦倍率而已，它會改變空間感、臉型與背景壓縮。拖滑桿比較廣角與長焦的差別。",
    tip: "人像特寫優先用 35～85mm；環境交代再用 16～24mm，近拍要小心臉型變形。"
  },
  camera_photo_flash: {
    title: "📷 27. 相機閃燈：TTL、離機閃與後簾同步",
    mode: "curtain",
    device: "camera",
    previewUrl: PEX.sparklerWedding,
    previewBgUrl: PEX.banquetHall,
    easy: "機頂閃燈像小閃電，適合補光；把閃燈拿離相機（離機）就能打出立體側光。後簾同步讓光軌拖在人身後！",
    medium: "TTL 自動測光適合婚宴快拍；手動 M 閃光可精準控制光比。柔光罩、反光板、引閃線／無線觸發是標配。",
    hard: "高速同步（HSS）讓你在正午也能用大光圈；但會縮短閃燈有效功率。多燈佈置時注意頻道與分組避免互擾。",
    tip: "切換前／後簾同步，觀察仙女棒光軌方向。"
  },
  camera_video_manual: {
    title: "📷 28. 相機錄影：LOG、ND 濾鏡與 180° 快門",
    mode: "video",
    device: "camera",
    videoSubtype: "shoot",
    previewUrl: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_db0c0fe1-1039-43f3-af2f-17441f44eb60-32366fc0-72c3-4ec1-b0b9-7ed4ea250056.png",
    easy: "新手先記一條：24fps 配 1/50 快門，畫面最自然。太亮就加 ND 濾鏡。",
    medium: "需要慢動作再拍 60fps；一般敘事先用 24fps 或 30fps。",
    hard: "想保留調色空間再用 Log。先拍準曝光，再進剪映做後製。",
    tip: "在剪映把 24fps 主畫面和 60fps 慢動作穿插，就能做出節奏。"
  },

  // ── 模組八：🎬 錄影與剪映剪輯 ──
  video_shoot_framing: {
    title: "🎬 29. 錄影構圖：16:9 與 9:16 分鏡",
    mode: "video",
    videoSubtype: "shoot",
    chapterRead: "錄影前先決定「發在哪裡」：YouTube 橫式 16:9；抖音／Reels 直式 9:16。拍錯比例後期裁切會切掉頭頂或字幕。",
    previewUrl: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_db0c0fe1-1039-43f3-af2f-17441f44eb60-32366fc0-72c3-4ec1-b0b9-7ed4ea250056.png",
    easy: "先決定平台：YouTube 用橫式 16:9，Reels/TikTok 用直式 9:16。",
    medium: "拍攝時幫字幕留空間，避免後續被切到頭頂或重要文字。",
    hard: "想做雙版本可同場拍橫＋直，剪輯時分開輸出，不要硬拉變形。",
    tip: "先完成一個比例版本，再做第二個版本，流程最不亂。"
  },
  video_capcut_advanced: {
    title: "🧠 29b. 剪映進階篇：5 大核心",
    mode: "video",
    capcutStep: "advanced",
    chapterRead: "本篇把剪映最常用的 5 大核心做成一步步圖文：關鍵幀、蒙版、曲線變速、轉場與動畫、智能摳像。",
    previewUrl: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_db0c0fe1-1039-43f3-af2f-17441f44eb60-32366fc0-72c3-4ec1-b0b9-7ed4ea250056.png",
    easy: "先從關鍵幀與轉場開始，最容易看到畫面提升。",
    medium: "再加蒙版、曲線變速，影片節奏和質感會明顯升級。",
    hard: "最後做智能摳像與畫中畫，完成進階合成效果。",
    tip: "建議每次只練一個核心，做完一支 15~30 秒短片再學下一個。",
    hideTheoryCards: true,
    capcutGuideKey: "advanced"
  },
  video_capcut_import: {
    title: "✂️ 30. 剪映入門篇：基本功能介紹",
    mode: "video",
    capcutStep: "import",
    chapterRead: "拍攝只是第一步。先看五步交付流程，再照剪映步驟清單動手：整理→粗剪→色彩→聲音→輸出。",
    previewUrl: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_db0c0fe1-1039-43f3-af2f-17441f44eb60-32366fc0-72c3-4ec1-b0b9-7ed4ea250056.png",
    easy: "先做基本流程：匯入素材 → 排順序 → 分割刪掉多餘片段。",
    medium: "保留每段前後 0.5 秒，畫面銜接比較順。",
    hard: "素材太多時先分類資料夾，再剪會快很多。",
    tip: "對照下方步驟清單，在剪映完成匯入與分割。",
    hideTheoryCards: true,
    capcutGuideKey: "import"
  },
  video_capcut_transition: {
    title: "✂️ 31. 剪映轉場：疊化、推拉與節奏",
    mode: "video",
    capcutStep: "transition",
    chapterRead: "【剪映第二步】在兩段影片交界點選「轉場」→ 優先用「疊化」0.3 秒。不要每個鏡頭都加特效，會眼花。",
    previewUrl: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_db0c0fe1-1039-43f3-af2f-17441f44eb60-32366fc0-72c3-4ec1-b0b9-7ed4ea250056.png",
    easy: "新手先用「疊化」，比花式特效更自然。",
    medium: "轉場長度先抓 0.2～0.5 秒，太長會拖節奏。",
    hard: "整支片控制 1～2 種轉場風格，畫面會更一致。",
    tip: "時間軸步驟 2：在兩段素材間加入轉場標記。",
    capcutGuideKey: "transition"
  },
  video_capcut_color: {
    title: "✂️ 32. 剪映調色：濾鏡、曲線與白平衡",
    mode: "video",
    capcutStep: "color",
    chapterRead: "【剪映第三步】點片段 → 調節 → 色溫／飽和度。可先回本站「白平衡」課理解色溫，再在剪映拉同一根滑桿。",
    previewUrl: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_db0c0fe1-1039-43f3-af2f-17441f44eb60-32366fc0-72c3-4ec1-b0b9-7ed4ea250056.png",
    easy: "先調色溫與亮度，再看要不要加濾鏡。",
    medium: "濾鏡強度建議先低於 30%，膚色比較自然。",
    hard: "多鏡頭素材先各自校正，再複製同一組風格參數。",
    tip: "搭配白平衡沙盒理解色溫，再回剪映調「色溫／色調」滑桿。",
    capcutGuideKey: "color"
  },
  video_capcut_export: {
    title: "✂️ 33. 剪映輸出：解析度、幀率與上傳",
    mode: "video",
    capcutStep: "export",
    chapterRead: "【剪映第四步】匯出 → 1080P、30fps、高碼率。上傳前用手機預覽一次字幕是否被裁切。",
    previewUrl: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_456c661d80d7ae4350024de7a54072a7_tplv-a9rns2rl98-pc_smart_face_crop-v1_512_384-3994d332-e6b7-4847-b52a-10d2d085216a.png",
    easy: "新手先固定：1080P、30fps、推薦碼率。",
    medium: "平台不同就換比例：YouTube 16:9，Reels 9:16。",
    hard: "發布前先在手機全螢幕看一次，確認字幕和邊界都正常。",
    tip: "完成下方匯出步驟後，用手機全螢幕預覽一次再發布。",
    capcutGuideKey: "export"
  }
};
