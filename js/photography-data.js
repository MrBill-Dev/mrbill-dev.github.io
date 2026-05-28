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
  title: "📸 攝影學習前言：先懂工具，再談美感",
  contentHtml: `<p>攝影不是「按下快門」而已。無論手機或相機，都是在<strong>記錄光線</strong>。建議由淺入深：</p>
    <ul>
      <li><strong>① 光與構圖</strong>——先學「往哪拍、怎麼擺」，再碰參數。</li>
      <li><strong>② 曝光三要素</strong>——光圈、快門、ISO 的因果與取捨。</li>
      <li><strong>③ 工具分流</strong>——手機專區／相機專區，對照你的器材。</li>
      <li><strong>④ 打燈與後期</strong>——理解光的方向與色溫。</li>
      <li><strong>⑤ 美學與風格</strong>——參數熟練後，才談故事與個人色調。</li>
    </ul>
    <p>每一課開頭有「本章導讀」，互動區可邊玩邊對照。手機與相機<strong>原理相同</strong>，差在操作位置與畫質上限。</p>`,
  steps: [
    { icon: "1️⃣", title: "共通基礎", desc: "光、構圖、曝光——兩種工具都適用" },
    { icon: "2️⃣", title: "工具分流", desc: "手機：演算法、夜景模式｜相機：鏡頭、閃燈、RAW" },
    { icon: "3️⃣", title: "美學導向", desc: "技術穩了，再用構圖與色彩說故事" }
  ]
};

const lightingPreface = {
  title: "💡 打燈前言：先看懂光，再買燈",
  contentHtml: `<h4>推薦入門燈具（由簡到繁）</h4>
    <ul>
      <li><strong>反光板</strong>（銀／白／金）——最便宜，戶外人像必備。</li>
      <li><strong>LED 平板燈／棒燈</strong>——可調亮度色溫，適合 vlog、訪談。</li>
      <li><strong>機頂閃＋柔光罩</strong>——婚禮、活動快拍。</li>
      <li><strong>離機閃＋引閃</strong>——進階，可打側光、輪廓光。</li>
    </ul>
    <h4>怎麼「看」燈？</h4>
    <p>先找<strong>主光源方向</strong>：順光（平）、側光（立體）、逆光（剪影／輪廓）。再看<strong>硬或柔</strong>：影子邊緣銳＝硬光；柔和＝柔光。</p>
    <h4>室內 vs 室外</h4>
    <ul>
      <li><strong>室外</strong>：太陽是主光；陰天＝天然柔光箱；黃金時刻（日出日落）最討喜。</li>
      <li><strong>室內</strong>：窗邊光最好拍；頂燈、霓虹常偏色，要調白平衡。</li>
    </ul>`
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
  title: "🎬 錄影與剪輯前言",
  contentHtml: `<p><strong>為什麼先用剪映學剪輯</strong>：介面直覺、手機與電腦都能用、從匯入到字幕與匯出都在同一套流程。新手可以先把第一支片做出來，再進階學更複雜的剪輯軟體。</p>
    <p><strong>新手先走這條路</strong>：① 先拍穩 → ② 匯入剪映 → ③ 分割刪多餘 → ④ 加字幕與音樂 → ⑤ 1080P 匯出。</p>
    <p>先把第一支影片完成，再回來學轉場、調色與進階設定。</p>`,
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
    title: "📐 2. 畫面的切披薩魔法（九宮格與黃金分割）",
    mode: "composition",
    previewUrl: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=800",
    easy: "當你拿到一塊配料很好吃的圓披薩，你一定不會粗暴地從正中間最精華的地方一刀切碎。拍照也是一模一樣的道理，不要每次看到小動物或爸爸媽媽，都把他們死死塞在畫面的正中央。試著把畫面當成井字遊戲的九宮格，把最重要的主角放在線條交錯的四個角落點上！",
    medium: "這就是攝影美學中經典的『三分法則（Rule of Thirds）』。在智慧型手機或專業單眼相機中開啟網格輔助線，將人像的雙眼、地平線、或樹木垂直主幹，精準地靠在四個黃金交叉點上。這能給予整體排版極佳的呼吸留白，視覺感受更為典雅。",
    hard: "九宮格線的交錯點，本質上是數學上『黃金分割比例（Golden Ratio, 約 1:1.618）』的視覺簡化延伸。人類眼球大腦在瀏覽平面影像時，視覺神經的下意識落點預設會停留在畫面邊緣的三分之二處。順應這個視覺生理特徵進行畫面編排，是消除業餘感的第一步。",
    tip: "課堂引導：點擊上方相機畫面中的圓圈，即可模擬將婚禮新娘的臉龐精準鎖定在黃金分割交界點上的視覺張力。"
  },
  photo_level: {
    title: "⚖️ 3. 絕對水平線與橫縱幾何線條對齊",
    mode: "composition",
    previewUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    easy: "你一定玩過公園的盪秋千，如果秋千左右兩邊的繩子不一樣長，你坐上去就會往一邊歪倒，覺得快要摔下來。我們拍照看手機時也是一樣，如果拍大海時海平面是斜的，或者拍大樓時大樓看起來快要倒了，看網站的人就會覺得頭暈、心裡不舒服。",
    medium: "在相機物理學中，幾何線條的端正是不可妥協的標準。不論是拍攝風景還是更新前端大 Banner，按下快門前，務必啟動機身內建的 Gyroscope（電子水平儀），確認綠色或黃色的對齊水平線完全重合、沒有傾斜。",
    hard: "當我們使用超廣角鏡頭（如 Sony 16-35mm GM）在都市街頭拍攝時，外圍線條會產生強烈的『透視畸變』（Perspective Distortion）。大師級的做法是保持相機感光元件與牆面絕對平行，或在後期使用變形工具（Transform）將線條校正回 90 度垂直。",
    tip: "遊戲任務：上方的觀景窗畫面目前處於嚴重傾斜狀態！請拉動下方的水平校正桿，將畫面精準調校回 0° 絕對水平。"
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
    chapterRead: "先看曝光三角概念圖理解三者關係，再拖動下方參數，觀察示範圖的明暗與質感變化。",
    previewUrl: "assets/c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_3981e04de2f4b56cc504b752a44be493_images_image-fde61029-e5b0-4f38-a6be-9e2b899edab0.png",
    demoPreviewUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    easy: "【第一步】想像接水：水龍頭大小 = 光圈；開多久 = 快門；水壓放大器 = ISO。\n【第二步】要同樣一杯水（正確曝光）：龍頭縮小（光圈變小）就要開更久（快門變慢）。\n【第三步】玩沙盒：三個滑桿都試，看三角形哪個角亮起，直到回饋顯示「平衡」。",
    medium: "【實戰】婚禮常固定快門 1/125、ISO 400，只動光圈換曝光與虛化。\n【取捨】大光圈+快快門+低 ISO = 理想人像，但暗場可能做不到，必須放棄其中一項。\n【順序】先決定你要「虛化」還是「凝固」還是「乾淨」，再調另外兩個補亮度。",
    hard: "曝光值 EV 可量化三者的換算。測光表讀的是總亮度，無法替你決定景深或動態取捨——那是創作選擇。",
    tip: "沙盒：故意只動光圈讓畫面變亮，再動快門或 ISO 拉回平衡——體會「蹺蹺板」關聯。"
  },
  photo_focus: {
    title: "🔍 9. 放大鏡抓精準焦點（對焦與追焦學問）",
    mode: "focus",
    previewUrl: "https://images.unsplash.com/photo-1520854221256-17451c6d7c8d?auto=format&fit=crop&w=800&q=80",
    previewBgUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    easy: "你有用過放大鏡玩燒紙張的遊戲嗎？你必須前後前後移動放大鏡，直到太陽光聚集成一個最亮、最小的小圓點。拍照也是一樣，你的相機必須精準對準主角的眼睛，如果對錯地方對到背景，主角的臉就會變得模模糊糊的、像近視眼一樣！",
    medium: "對焦（Focus）決定了畫面中哪一個距離的物體最為清晰。現代相機具備強大的『人眼追蹤自動對焦（AF-C）』，能自動咬住移動中的主角。但在微距拍攝、隔著玻璃、或是暗部環境下自動對焦會失效，這時就必須切換到手動對焦（MF），轉動對焦環來精準鎖定主體。",
    hard: "對焦的本質是調整鏡頭內部光學鏡片組的相對距離，讓被攝物折射的光線精準會聚在感光元件的焦平面上。在微電影拍攝中，導演常會利用『虛實焦段切換（Rack Focus）』：前一秒前景的酒杯清晰、後一秒背景的新娘清晰，這是極高階的視覺敘事調度手法。",
    tip: "對焦實驗：拖動下方對焦環滑桿，當數值落在綠色區間時，新娘眼部應最銳利；偏離則整張臉會模糊。"
  },
  photo_raw_vs_jpg: {
    title: "🎞 10. 實體粘土與彩色相片（RAW 與 JPG 寬容度）",
    mode: "darkroom",
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    easy: "JPG 就像是工廠已經幫你做好的彩色塑膠玩具，外表很漂亮，但你沒辦法改變它的形狀，只要一用力折就會斷掉；而 RAW 檔就像是還沒有捏好的無損粘土！雖然看起來灰灰醜醜的，打你可以自由把它拉長、捏扁、重新決定它的顏色和光影，完全不會損壞！",
    medium: "JPG 格式是相機大腦幫你強行去背、調色、壓縮後只剩 8-bit 色彩資訊的成品，後期調色稍微拉大曝光就會直接出現破碎噪點。而 RAW 檔是感光元件紀錄的『未加工原始數位光訊號』，擁有 14-bit 以上海量的色彩階層資訊，高光與暗部細節被完美封存。",
    hard: "8-bit 的 JPG 只能記錄 256 個色彩階度，而 14-bit 的 RAW 檔則封存了 16,384 個色階資訊！大逆光攝影時，JPG 只要一拉高陰影，黑影處就會冒出大量破碎的解像噪點；若拍攝 RAW 檔，你可以直接在後期軟體內強行拉回 4 到 5 檔的暗部階層，細節死裡復活且畫面依舊細緻純淨。",
    tip: "實驗任務：請向右拖動下方的拉箱強度，觀察左側 8-bit JPG 是如何因為色彩資訊不足而破裂冒出綠色色噪，而右側 RAW 檔依舊平滑純淨。"
  },
  photo_histogram: {
    title: "📊 11. 數字光影晴雨表（直方圖客觀科學）",
    mode: "histogram",
    previewUrl: "",
    noPreviewImage: true,
    easy: "拍照時只用眼睛看手機螢幕是不準的，因為大太陽下螢幕看起來很暗、大黑夜看螢幕又太亮。這時相機裡有一張像山丘一樣的線條圖表叫直方圖。如果小山丘全部擠在最左邊，代表你的照片太黑了；如果小山丘全部擠在最右邊，代表照片太白、什麼都看不清！",
    medium: "直方圖（Histogram）是影像曝光的絕對客觀科學標準。橫軸代表亮度，從最左邊的純黑、到中間的灰調、再到最右邊的純白。縱軸代表該亮度像素的數量。優秀的曝光，山丘通常會柔和分佈在中間，兩端沒有貼牆（撞牆）。",
    hard: "當直方圖的最右側線條直接貼緊邊緣並切斷時，代表影像出現了『高光溢出（Clipping）』，那些像素已經變成純白（#FFFFFF），在數位資訊上屬於『資訊徹底遺失』，後期無論怎麼拉低曝光都救不回任何細節。看懂直方圖，能讓你在大太陽、逆光等極端環境下，精準守住影像的黃金動態範圍。",
    tip: "沙盒：拖下方滑桿，觀察上方放大直方圖山丘撞左（太暗）或撞右（太亮）。"
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
    tip: "焦段實驗：將滑桿從 16mm 廣角推到 135mm 長焦，觀察街道透視如何從誇張變成壓縮，背景是否貼近主體。"
  },
  photo_wb: {
    title: "👓 13. 魔法變色眼鏡 (White Balance)",
    mode: "wb",
    previewUrl: PEX.warmIndoor,
    easy: "你戴上一副眼鏡，如果它讓世界變藍，你就覺得冷；如果它讓世界變橘，你就覺得溫暖。相機的白平衡就是這副眼鏡。",
    medium: "色溫（K值）決定影像冷暖。低色溫（2000K-3000K）呈現暖橘光，高色溫（7000K+）呈現冷藍光。",
    hard: "拍攝 RAW 檔的意義在於，色溫資訊是 metadata，後製調整時完全無損。這對攝影師而言，現場只需確保曝光準確，後期調整白平衡能達成完全不同的電影氛圍（如：將婚禮現場調整為冷冽的藍調敘事）。",
    tip: "大師技巧：婚禮若想要溫馨感，設定白平衡比現場稍高一點（增加 K 值）；若想要電影冷峻感，則降低 K 值。"
  },
  photo_curtain_sync: {
    title: "💍 14. 婚禮動態流光魔術（前簾與後簾同步快門）",
    mode: "curtain",
    previewUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    previewBgUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    easy: "想像你在新人的婚禮舞池裡，有人一邊瘋狂跳舞、手上還一邊揮舞著亮晶晶的仙女棒。如果你用普通的相機拍（前簾同步），閃光燈一開始就閃了，拍出來的仙女棒火花流光，會非常奇怪地黏在人的『正前方（臉上）』，看起來像火燒人一樣把畫面拍壞；但如果開啟『後簾同步魔法』，閃光燈會在快門快要關閉的最後一聲才閃，這時仙女棒的流光線條，就會像天使的翅膀一樣，極度夢幻地拉在人的『身體後面』！",
    medium: "這是婚禮攝影師與汽車廣告導演必備的頂階閃光燈技術。傳統『前簾同步』是在快門剛開啟時閃光，隨後記錄殘影，導致移動軌跡在主體前方；而『後簾同步（Rear Curtain Sync）』是利用慢速快門先記錄夜景與車燈的流動線條（長軌跡），在快門即將關閉的最後千分之一秒才引閃閃光燈，完美將清晰的新人定格在流光溢彩的最末端。",
    hard: "在電影夜景運鏡或暗部派對分鏡中，後簾同步本質上解決了時間與位移的物理向量對齊。慢速快門（如 1/4 秒）負責將環境微弱的弱光與動態環境充分曝光，而電子閃光燈的微秒脈衝則負責凍結核心主體的邊緣銳利度。掌握後簾同步，能讓長型網頁作品集展現出令人屏息的動態張力與多媒體高級感。",
    tip: "實驗任務：請在下方切換『前簾同步』與『大師級後簾同步』，並拉動快門滑桿，親眼比對新郎新娘在舞池進場時，拉出的流光殘影究竟是在身前還是身後！"
  },

  // ── 模組五：打燈布光教學（遠端免費範本） ──
  photo_light_3point: {
    title: "💡 15. 三點布光：主光、補光、輪廓光",
    mode: "lighting",
    lightingPreset: "three_point",
    previewUrl: PEX.threePoint,
    easy: "拍人像就像舞台劇：最亮的那盞燈叫『主光』，負責讓臉有立體感；另一盞比較暗的『補光』把陰影填亮一點，不要黑到看不見；最後在後方打一束『輪廓光』，讓頭髮邊緣發亮，人物才能從背景跳出來！",
    medium: "三點布光是棚拍與婚禮人像的標準配置。主光（Key）通常放在 45° 側前方；補光（Fill）在對側、亮度約主光的 1/2～1/4；輪廓光（Rim/Back）從後方 45° 打向髮際與肩線，製造分離感。",
    hard: "在商業人像與微電影中，三點布光可精準控制光比（Lighting Ratio）。主光決定敘事情緒，補光控制暗部細節保留，輪廓光則在複雜背景中建立 Z 軸深度。進階時可將補光換成反光板以保留更自然的陰影過渡。",
    tip: "沙盒任務：拖動『主光角度』與『補光強度』，觀察鼻影與髮絲輪廓如何變化，直到三光平衡。"
  },
  photo_light_rembrandt: {
    title: "🎭 16. 林布蘭光：45° 經典三角光影",
    mode: "lighting",
    lightingPreset: "rembrandt",
    previewUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    easy: "把燈放在臉的斜前方（約 45 度），如果鼻影旁邊的臉頰上出現一個小小的倒三角形亮光，恭喜你，你拍出了跟大畫家林布蘭一樣的經典光影！",
    medium: "林布蘭光（Rembrandt Lighting）將主光置於被攝者前方 45°、略高於視線。暗側臉頰會出現標誌性的倒三角光斑，兼具立體感與戲劇張力，是黑白肖像與電影海報的常用布光。",
    hard: "此布光依賴明確的單主光與較低的補光比（約 4:1 或 8:1）。補光過強會抹平倒三角，失去林布蘭特徵；主光過平則退化成順光。婚禮肖像可用離機閃燈＋柔光罩在宴會角落快速複製此效果。",
    tip: "實驗：將主光角度停在 45° 附近，並降低補光，觀察頰部是否出現倒三角亮區。"
  },
  photo_light_butterfly: {
    title: "🦋 17. 蝴蝶光：高位正面美肌布光",
    mode: "lighting",
    lightingPreset: "butterfly",
    previewUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    easy: "把燈舉高，從正前方往下照，鼻子下面會出現像蝴蝶翅膀一樣的小影子，這種光可以讓臉看起來更立體、皮膚更光滑，很多雜誌封面都愛用！",
    medium: "蝴蝶光（Paramount / Butterfly Lighting）主光置於正前方、高於視線 30～60cm，在鼻下形成對稱蝶形陰影。適合女性肖像與婚紗特寫，能強調顴骨與唇形，並適度修飾皮膚紋理。",
    hard: "此布光對五官對稱性要求高，且需控制主光高度——過高會加深眼窩陰影，過低則蝶影消失。商業美妝常搭配下方反光板（Clamshell）作為補光，保留眼神光並柔化下巴陰影。",
    tip: "沙盒：拉高『主光高度』，觀察鼻下蝶形陰影；搭配少量補光填平眼窩。"
  },
  photo_light_rim: {
    title: "✨ 18. 輪廓光與逆光：髮絲光與剪影",
    mode: "lighting",
    lightingPreset: "rim",
    previewUrl: IMG.rimBacklitPortrait,
    previewFallback: IMG.rimBacklitAlt,
    easy: "背對太陽站著，你的頭髮邊緣會有一圈金色的光，像天使的光環一樣！這就是輪廓光。如果把人拍得黑黑的只有亮邊，那就是剪影，也很有故事感。",
    medium: "輪廓光（Rim / Edge Light）從主體後方或側後方打入，勾勒髮絲、肩線與輪廓。逆光剪影則讓環境曝光正常、主體欠曝，適合婚禮進場、夕陽與煙火等戲劇性時刻。",
    hard: "拍攝輪廓光時需使用點測光或手動曝光，避免臉部過曝成一片白。婚禮紀錄常結合 RAW 與高光抑制，保留逆光氛圍同時拉回暗部層次。多燈佈置時，輪廓光強度應高於主光 1～2 級才能從雜亂背景分離主體。",
    tip: "實驗：提高『輪廓光強度』，觀察髮絲光環；再切換逆光預設，感受剪影與輪廓的差異。"
  },
  photo_light_soft_hard: {
    title: "☁️ 19. 柔光 vs 硬光：光質與陰影邊緣",
    mode: "lighting",
    lightingPreset: "soft_hard",
    previewUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=800&q=80",
    easy: "太陽正中午時影子邊緣很硬、很黑，叫『硬光』；陰天或透過白布、雨傘擋住的光，影子邊緣柔柔的，叫『柔光』。拍人像時，柔光通常比較討喜！",
    medium: "光質由光源相對大小決定：光源越大、越近，陰影過渡越柔。柔光箱、反光傘、雲層漫射都屬柔光；直射閃光、聚光筒、正午陽光則為硬光。硬光適合戲劇、時尚；柔光適合婚禮、美妝。",
    hard: "在光學上，柔硬取決於光源相對於被攝物的角徑（Angular Size）。同樣功率的閃燈，加上大尺寸柔光罩後有效發光面積變大，半影區（Penumbra）加寬，皮膚瑕疵的對比被平均化。進階可用硬光做主、柔光填補，創造層次。",
    tip: "沙盒：拖動『光質軟硬』滑桿，觀察臉部陰影邊緣從刀刻般銳利變成羽毛般柔和。"
  },
  photo_light_split: {
    title: "🌓 20. 分割光：半臉明暗的戲劇張力",
    mode: "lighting",
    lightingPreset: "split",
    previewUrl: IMG.splitLight,
    previewFallback: IMG.splitLightAlt,
    easy: "把燈放在人的正側邊，臉會一半很亮、一半很黑，像月亮的陰晴圓缺，看起來很有電影壞人的感覺！",
    medium: "分割光（Split Lighting）主光位於 90° 正側，臉部明暗各占約一半。光比高、情緒強烈，常用於男性肖像、音樂人形象與黑色電影風格（Film Noir）。",
    hard: "分割光幾乎不使用補光，以維持 8:1 以上的高對比。需注意暗側眼神是否完全消失——可微調主光高度或使用極弱補光保留眼神光。婚禮創作中可用於新郎單人特寫，營造沉穩權威感。",
    tip: "實驗：將主光角度推到 90°，關閉補光，觀察半臉明暗切割線。"
  },

  // ── 模組六：📱 手機拍照專區 ──
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
    tip: "焦段滑桿：從廣角街景切到長焦人像壓縮。"
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
    chapterRead: "【剪映入門篇】先認識基本功能：開始創作、匯入素材、分割刪除、字幕、音樂、濾鏡與匯出。完成後照下方圖文一步步操作。",
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
