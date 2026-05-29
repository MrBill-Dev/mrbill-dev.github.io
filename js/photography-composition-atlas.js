/** 構圖圖解（無照片）：色塊 + 九宮格，在 photo_composition 課程內渲染 */
const compositionAtlas = {
  title: "構圖圖解",
  subtitle: "色塊＝主體位置示意，搭配上方九宮格互動練習。",
  groups: [
    {
      id: "common",
      label: "共通構圖",
      desc: "風景、人像、紀錄都適用",
      items: [
        { name: "三分法", goal: "主體放在井字交叉點，避免死板置中", variant: "thirds-tr", tip: "手機／相機開九宮格輔助線" },
        { name: "置中構圖", goal: "對稱、莊重、主體明確時使用", variant: "center", tip: "適合建築正面、倒影" },
        { name: "對稱", goal: "左右或上下鏡像，畫面安定", variant: "symmetry", tip: "水面倒影、走廊、門框" },
        { name: "引導線", goal: "線條把視線帶向主體", variant: "leading", tip: "道路、欄杆、光影邊界" },
        { name: "框中框", goal: "用門窗洞口框住主體", variant: "frame", tip: "增加層次與聚焦" },
        { name: "留白", goal: "大量空景襯托小主體", variant: "negative", tip: "情緒、孤獨、意境" }
      ]
    },
    {
      id: "landscape",
      label: "風景攝影",
      desc: "地平線、層次、空間深度",
      items: [
        { name: "地平線在上 1/3", goal: "強調前景（沙灘、田野）", variant: "horizon-low", tip: "海灘、草原、雪地" },
        { name: "地平線在下 1/3", goal: "強調天空（雲、霞光）", variant: "horizon-high", tip: "日出日落、暴風雲" },
        { name: "前中後景", goal: "近景＋中景＋遠景拉開深度", variant: "layers", tip: "石頭／樹枝前景＋山脈遠景" },
        { name: "S 形曲線", goal: "河流道路引導視線進入畫面", variant: "s-curve", tip: "步道、溪流、梯田" },
        { name: "三角構圖", goal: "山稜、建築形成穩定三角", variant: "triangle", tip: "山峰、樹群、帆船" }
      ]
    },
    {
      id: "portrait",
      label: "人像攝影",
      desc: "臉部位置、留白、視線方向",
      items: [
        { name: "眼睛在上 1/3", goal: "雙眼落在上方橫線附近", variant: "eyes-third", tip: "半身、特寫最常用" },
        { name: "頭頂留白", goal: "頭頂勿貼邊，留髮絲與呼吸感", variant: "headroom", tip: "全身上下勿頂到畫面邊" },
        { name: "視線留白", goal: "臉朝哪，哪側多留空", variant: "gaze-right", tip: "看左留右、看右留左" },
        { name: "全身比例", goal: "腳底可切，勿在關節硬切", variant: "fullbody", tip: "膝蓋、腳踝切線要避免" }
      ]
    },
    {
      id: "documentary",
      label: "紀錄攝影",
      desc: "決定性瞬間、故事與層次",
      items: [
        { name: "決定性瞬間", goal: "動作最高潮、表情最清楚那一格", variant: "moment", tip: "跳躍、擁抱、表情轉折" },
        { name: "前景人物", goal: "近處人物＋遠處事件形成故事", variant: "doc-fg", tip: "街景、活動現場" },
        { name: "比例對比", goal: "大人小、動靜、明暗對照", variant: "scale", tip: "凸顯主體或環境壓力" },
        { name: "邊緣乾淨", goal: "少讓雜物從邊角搶戲", variant: "edges", tip: "拍前掃一圈畫面四角" }
      ]
    }
  ]
};
