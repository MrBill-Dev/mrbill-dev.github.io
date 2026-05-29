/** 攝影術語翻譯區：供 photography.html 彈窗渲染 */
const photoGlossarySections = [
  {
    label: "曝光與感光",
    theme: "indigo",
    items: [
      { term: "光圈 Aperture", desc: "像鏡頭門大小。F1.4 更亮、背景更糊；F16 更暗、前後景更清楚。" },
      { term: "快門 Shutter", desc: "像眼睛睜開多久。快可凝固動作，慢可做車軌與光繪。" },
      { term: "ISO 感光度", desc: "亮度增益。越高越亮，但雜訊（顆粒）通常也更明顯。" },
      { term: "曝光三角", desc: "光圈、快門、ISO 互相牽制。改一項，另兩項要補償才維持亮度。" },
      { term: "EV 曝光補償", desc: "+EV 變亮、-EV 變暗。高反差或逆光時快速微調，不必全改 M 模式。" },
      { term: "直方圖 Histogram", desc: "看亮度分布。山丘撞左＝偏暗，撞右＝偏亮（易死白）。" }
    ]
  },
  {
    label: "鏡頭、對焦與景深",
    theme: "amber",
    items: [
      { term: "景深 DOF", desc: "清楚範圍的深淺。淺景深凸顯主體；深景深適合風景與合照。" },
      { term: "焦段 Focal Length", desc: "24mm 廣角透視誇張；50mm 接近人眼；85mm+ 人像與壓縮感常用。" },
      { term: "對焦 Focus / 焦平面", desc: "真正清楚的那一層。焦點跑掉，再亮也會糊。" },
      { term: "AE / AF Lock", desc: "先鎖曝光與對焦再移動構圖，避免主體一動就重新測光。" },
      { term: "空間壓縮感", desc: "長焦讓前後景看起來更靠近，舞台、人像背景常用。" },
      { term: "最近對焦距離", desc: "鏡頭能對多近。拍 macro、戒指、菜單文字時要先確認。" }
    ]
  },
  {
    label: "色彩、檔案與動態範圍",
    theme: "cyan",
    items: [
      { term: "白平衡 WB", desc: "校正偏色，讓膚色與場景更自然。偏黃常降色溫，偏藍則升高。" },
      { term: "色溫 Kelvin", desc: "數字低偏暖（黃），高偏冷（藍）。室內鎢絲燈約 3200K，陰天約 6500K。" },
      { term: "色調 Tint", desc: "綠↔洋紅軸微調。膚色發綠時常要動這一項，不只色溫。" },
      { term: "動態範圍 DR", desc: "同時保住暗部與高光細節的能力。逆光、窗邊人像特別吃 DR。" },
      { term: "RAW vs JPG", desc: "RAW 後製空間大、可救曝光；JPG 直出方便但較難拉回死白死黑。" },
      { term: "死白 / 死黑", desc: "過曝到沒細節叫死白；欠曝到全黑叫死黑。婚禮白紗、西裝最忌死白。" }
    ]
  },
  {
    label: "構圖與光的方向",
    theme: "emerald",
    items: [
      { term: "構圖 Composition", desc: "主體放哪裡。三分法、留白、引導線、對稱都屬構圖策略。" },
      { term: "三分法 / 九宮格", desc: "把主體放在井字交叉點，比死置中更有呼吸感。" },
      { term: "順光 / 側光 / 逆光", desc: "順光色彩飽和；側光立體；逆光易剪影，也可勾輪廓光。" },
      { term: "輪廓光 Rim Light", desc: "從後方勾出主體邊緣一圈亮線，把人從背景剝離出來。" },
      { term: "剪影 Silhouette", desc: "逆光下主體全黑、只留外形。適合姿態明確的剪影與氛圍。" },
      { term: "黃金時段 / 藍調時刻", desc: "日出日落前後光線柔和偏暖；日暮後天空藍調，適合城市夜景。" }
    ]
  },
  {
    label: "打燈與閃光",
    theme: "rose",
    items: [
      { term: "主光 Key Light", desc: "最主要的光，決定臉部明暗與陰影方向。" },
      { term: "補光 Fill Light", desc: "填暗部陰影。補太强會變平；太弱陰影很戲劇。" },
      { term: "Fill Ratio 補光比", desc: "主光與補光強弱差。差越大立體感越強。" },
      { term: "蝴蝶光 / 倫勃朗光", desc: "蝴蝶光：鼻下蝶形陰影，妝感亮；倫勃朗：臉側三角光，經典肖像。" },
      { term: "前簾 / 後簾同步", desc: "閃燈與快門配合。後簾常讓光軌拖在主體後方，較自然。" },
      { term: "車軌 / 光軌", desc: "慢快門把移動光源拉成線。夜景、舞池、煙火常用。" }
    ]
  },
  {
    label: "美學氛圍（常聽常說）",
    theme: "violet",
    items: [
      { term: "通透感（透透感）", desc: "畫面乾淨、對比適中、細節清楚不霧。大光圈＋好光＋少灰霾後期較易有。" },
      { term: "空靈感", desc: "大量留白、柔和光、低飽和或薄霧，情緒輕、不擁擠。" },
      { term: "氛圍感", desc: "技術正確之外，還要有情緒與故事——光、色、天氣、道具一起營造。" },
      { term: "層次感", desc: "前中後景或明暗分離，讓眼睛有「走進去」的深度。" },
      { term: "奶油虚化 / 奶化", desc: "背景像奶油化開的柔焦。大光圈＋適當距離＋乾淨背景較易出現。" },
      { term: "高級感", desc: "克制用色、乾淨背景、精準曝光與構圖，少即是多的整體質感。" },
      { term: "膠片感 / 顆粒感", desc: "略帶顆粒、柔和對比、特定色偏。可用膠片模擬或後期，但別蓋過主體。" }
    ]
  },
  {
    label: "夜景、環境與常見問題",
    theme: "slate",
    items: [
      { term: "光害 Light Pollution", desc: "城市夜空偏橘黃、星星難見。拍星空要離開市區，或後期局部降飽和。" },
      { term: "噪點 Noise", desc: "暗部彩色或灰白顆粒。高 ISO、過度拉亮、小圖壓縮都會加重。" },
      { term: "眩光 / 光暈 Flare", desc: "強光源進鏡頭的彩虹斑或霧化。可避開、用遮光罩，或當風格使用。" },
      { term: "紫邊色散", desc: "高反差邊緣出現紫綠邊。大光圈全開、廉價鏡較常見，可縮光圈或後期修。" },
      { term: "果凍效應 Jello", desc: "拍影片時畫面左右晃動扭曲。電子快門、手持搖鏡時較明顯。" },
      { term: "色偏 / 斷階", desc: "整張偏一種色；漸層天空出現色帶。常來自錯誤 WB 或過度壓縮後期。" }
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
  grid.innerHTML = photoGlossarySections.map(function (section) {
    var theme = photoGlossaryThemes[section.theme] || photoGlossaryThemes.slate;
    var cards = (section.items || []).map(function (item) {
      return `<div class="rounded-xl border ${theme.border} ${theme.bg} p-4">
        <p class="font-black ${theme.title}">${item.term}</p>
        <p class="mt-1 text-slate-700">${item.desc}</p>
      </div>`;
    }).join("");
    return `<div class="col-span-full pt-1 first:pt-0">
      <p class="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">${section.label}</p>
    </div>${cards}`;
  }).join("");
}
