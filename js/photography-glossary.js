/** 攝影術語翻譯區：供 photography.html 彈窗渲染 */
const photoGlossarySections = [
  {
    label: "曝光與相機參數",
    theme: "indigo",
    items: [
      {
        term: "光圈 Aperture",
        plain: "控制進光量，也會影響背景模糊程度。",
        when: "拍人像、食物、低光環境時很常調整。",
        myth: "不是光圈越大越好，多人合照時景深太淺反而容易有人失焦。"
      },
      {
        term: "快門 Shutter",
        plain: "決定感光時間長短，影響動作是凝固還是拖影。",
        when: "拍運動、車軌、舞池、手持夜景時都要先想快門。",
        myth: "快門不是越快越好，太慢會糊，太快又可能太暗。"
      },
      {
        term: "ISO 感光度",
        plain: "在光不夠時把畫面墊亮，但雜訊通常也會變多。",
        when: "室內、晚宴、舞台、夜景不得已要拉高時。",
        myth: "ISO 拉高能救亮度，但救不了對焦失誤或手震。"
      },
      {
        term: "曝光三角",
        plain: "光圈、快門、ISO 互相牽制，改一項另兩項要補償。",
        when: "現場光線突變，要決定先保快門、虛化還是畫質時。",
      },
      {
        term: "EV 曝光補償",
        plain: "+EV 變亮、-EV 變暗，微調整體曝光。",
        when: "逆光、白紗、黑西裝等高反差場景快速修正。",
      },
      {
        term: "直方圖 Histogram",
        plain: "看亮度分布的山丘圖，比螢幕肉眼客觀。",
        when: "現場判斷曝光是否安全，尤其白紗、逆光、夜景。",
        myth: "貼邊不一定全錯，重點是主體細節有沒有保住。"
      }
    ]
  },
  {
    label: "對焦與鏡頭",
    theme: "amber",
    items: [
      {
        term: "景深 DOF",
        plain: "畫面清楚範圍的深淺，決定背景糊不糊。",
        when: "人像要分離背景，或風景、合照要全景清晰。",
      },
      {
        term: "焦段 Focal Length",
        plain: "廣角拉開空間，長焦壓縮背景、主體更集中。",
        when: "Vlog 用廣角，人像常用 35～85mm，活動特寫用長焦。",
        myth: "焦段不是越長越好，室內長焦常常退無可退。"
      },
      {
        term: "對焦 Focus",
        plain: "決定畫面哪個距離最銳利，人像通常是眼睛。",
        when: "大光圈人像、微距、隔玻璃或暗光手動對焦。",
      },
      {
        term: "AE / AF Lock",
        plain: "先鎖曝光與對焦再移動構圖，避免主體一動就重測。",
        when: "逆光人像、窗邊拍攝、主體不在畫面中央時。",
      },
      {
        term: "空間壓縮感",
        plain: "長焦讓前後景看起來更靠近，背景像被拉近。",
        when: "舞台、人像背景、街拍想讓背景更集中時。",
      },
      {
        term: "最近對焦距離",
        plain: "鏡頭能對到多近，太近會對不到。",
        when: "拍戒指、菜單、小物 macro 前要先確認。",
      }
    ]
  },
  {
    label: "光線與閃燈",
    theme: "rose",
    items: [
      {
        term: "主光 Key Light",
        plain: "最主要的光，決定臉部明暗與陰影方向。",
        when: "人像、婚禮、商品拍攝布光的第一步。",
      },
      {
        term: "補光 Fill Light",
        plain: "填暗部陰影，讓細節回來，但補太多會變平。",
        when: "逆光人像、硬光下想保留立體感又不想死黑。",
        myth: "補光不是越亮越好，補過頭人像會像貼紙。"
      },
      {
        term: "順光 / 側光 / 逆光",
        plain: "順光色彩飽和；側光立體；逆光易剪影或勾輪廓。",
        when: "現場看太陽、窗光、舞台燈方向時判斷怎麼站。",
      },
      {
        term: "前簾 / 後簾同步",
        plain: "決定閃光在曝光開始或結束，拖影方向不同。",
        when: "慢快門加閃燈拍進場、舞池、夜景人像時。",
        myth: "後簾不是比較高級，只是拖影多在身後、動態感較自然。"
      },
      {
        term: "車軌 / 光軌",
        plain: "慢快門把移動光源拉成線。",
        when: "夜景、舞池、煙火、城市街道。",
      },
      {
        term: "輪廓光 Rim Light",
        plain: "從後方勾出主體邊緣亮線，把人從背景剝離。",
        when: "暗背景人像、髮絲光、剪影邊緣。",
      }
    ]
  },
  {
    label: "色彩與後製",
    theme: "cyan",
    items: [
      {
        term: "白平衡 WB",
        plain: "校正偏色，讓膚色與場景更自然，也可刻意留冷暖。",
        when: "混合光源、宴會燈、陰天戶外、室內窗光。",
      },
      {
        term: "色溫 Kelvin",
        plain: "數字低偏暖黃，高偏冷藍。",
        when: "調整膚色、室內鎢絲燈、陰天偏藍時。",
      },
      {
        term: "動態範圍 DR",
        plain: "同時保住暗部與高光細節的能力。",
        when: "逆光、窗邊人像、婚宴舞台高反差。",
      },
      {
        term: "RAW vs JPG",
        plain: "RAW 後製空間大、較能救曝光；JPG 直出方便。",
        when: "大反差現場寧可拍 RAW 再修，社群快發可用 JPG。",
      },
      {
        term: "死白 / 死黑",
        plain: "過曝到沒細節叫死白；欠曝到全黑叫死黑。",
        when: "白紗、西裝、舞台追光、夜景暗部判斷時。",
      },
      {
        term: "噪點 Noise",
        plain: "暗部出現的彩色或灰白顆粒。",
        when: "高 ISO、過度拉亮、小圖壓縮後檢查畫質。",
      }
    ]
  },
  {
    label: "構圖與畫面",
    theme: "emerald",
    items: [
      {
        term: "構圖 Composition",
        plain: "主體放哪裡、留白多少、視線怎麼引導。",
        when: "每張照片按下快門前最後一眼。",
      },
      {
        term: "三分法 / 九宮格",
        plain: "把主體放在井字交叉點，比死置中更有呼吸感。",
        when: "人像、風景、活動快拍來不及細想時的預設。",
      },
      {
        term: "層次感",
        plain: "前中後景或明暗分離，讓畫面有深度。",
        when: "風景、街拍、宴會全景想避免平面化。",
      },
      {
        term: "剪影 Silhouette",
        plain: "逆光下主體全黑、只留外形。",
        when: "姿態明確、想強調輪廓或氛圍時。",
      },
      {
        term: "黃金時段 / 藍調時刻",
        plain: "日出日落前後光線柔和；日暮後天空藍調適合城市夜景。",
        when: "外拍排程、婚禮外景、旅遊打卡。",
      },
      {
        term: "通透感",
        plain: "畫面乾淨、對比適中、細節清楚不霧。",
        when: "人像、風景後期或選鏡頭、濾鏡時常聽到。",
        myth: "通透感不只看後期，光線乾淨、曝光準更重要。"
      }
    ]
  },
  {
    label: "影片與剪輯",
    theme: "violet",
    items: [
      {
        term: "時間軸 Timeline",
        plain: "把素材按順序排在軌道上，決定故事節奏。",
        when: "活動紀錄、婚禮短片、社群短影音剪輯。",
      },
      {
        term: "粗剪 / 精剪",
        plain: "粗剪排順序與重點；精剪調節奏、轉場與細節。",
        when: "素材很多時先粗剪再精修，避免一開始就陷細節。",
      },
      {
        term: "色彩一致",
        plain: "不同場景亮度、白平衡、色調不要跳太大。",
        when: "多場景婚禮、一日遊 vlog、混合室內外素材。",
      },
      {
        term: "幀率 / 解析度",
        plain: "30fps 通用；60fps 動作更順；1080P 多數平台夠用。",
        when: "匯出前依平台選比例與規格。",
      },
      {
        term: "轉場 Transition",
        plain: "兩段畫面銜接的方式，疊化最常見也最安全。",
        when: "鏡頭切換時，不要每個都加花式特效。",
        myth: "轉場越多越炫是誤解，一致比花俏重要。"
      },
      {
        term: "關鍵幀 Keyframe",
        plain: "在時間軸上標記起點終點，讓畫面或參數漸變。",
        when: "做推進拉遠、字幕動畫、調色漸變時。",
      }
    ]
  }
];

const photoGlossaryThemes = {
  indigo: { border: "border-indigo-100", bg: "bg-indigo-50", title: "text-indigo-700" },
  amber: { border: "border-amber-100", bg: "bg-amber-50", title: "text-amber-700" },
  cyan: { border: "border-cyan-100", bg: "bg-cyan-50", title: "text-cyan-700" },
  emerald: { border: "border-emerald-100", bg: "bg-emerald-50", title: "text-emerald-700" },
  rose: { border: "border-rose-100", bg: "bg-rose-50", title: "text-rose-700" },
  violet: { border: "border-violet-100", bg: "bg-violet-50", title: "text-violet-700" },
  slate: { border: "border-slate-200", bg: "bg-slate-50", title: "text-slate-800" }
};

function renderPhotoGlossary() {
  var grid = document.getElementById("photo-glossary-grid");
  if (!grid || typeof photoGlossarySections === "undefined") return;
  grid.innerHTML = photoGlossarySections.map(function (section, idx) {
    var theme = photoGlossaryThemes[section.theme] || photoGlossaryThemes.slate;
    var cards = (section.items || []).map(function (item) {
      var plain = item.plain || item.desc || "";
      var whenLine = item.when
        ? '<p class="photo-glossary-card__line"><strong>什麼時候用：</strong>' + item.when + "</p>"
        : "";
      var mythLine = item.myth
        ? '<p class="photo-glossary-card__line text-slate-500"><strong>常見誤解：</strong>' + item.myth + "</p>"
        : "";
      return (
        '<div class="photo-glossary-card border ' + theme.border + " " + theme.bg + '">' +
        '<p class="photo-glossary-card__term ' + theme.title + '">' + item.term + "</p>" +
        '<p class="photo-glossary-card__line"><strong>白話：</strong>' + plain + "</p>" +
        whenLine +
        mythLine +
        "</div>"
      );
    }).join("");
    var openAttr = idx === 0 ? " open" : "";
    return (
      '<details class="photo-glossary-section"' + openAttr + ">" +
      "<summary>" + section.label + " · " + section.items.length + " 條</summary>" +
      '<div class="photo-glossary-section__body p-2 md:p-0">' +
      '<p class="hidden md:block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">' + section.label + "</p>" +
      '<div class="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">' + cards + "</div>" +
      "</div></details>"
    );
  }).join("");
}
