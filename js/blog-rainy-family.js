/**
 * 台北新北雨天親子景點 — 景點卡片、天氣、篩選與圖片備援
 */
(function (global) {
  "use strict";

  var RAINY_IMG_BASE = "../assets/blog-rainy/";

  /** 依推薦清單順序（跳過親子館）；讀不到時 onerror 換備援 */
  var RAINY_SPOT_IMAGES = {
    ntsec: [RAINY_IMG_BASE + "01-ntsec.png"],
    tam: [RAINY_IMG_BASE + "02-tam.png"],
    kidsPark: [RAINY_IMG_BASE + "03-kids-park.png"],
    npmChildren: [RAINY_IMG_BASE + "04-npm-children.png"],
    parentCenter: [RAINY_IMG_BASE + "parent-center.png"],
    moca: [RAINY_IMG_BASE + "05-moca.png"],
    ntm: [RAINY_IMG_BASE + "06-ntm.png"],
    ceramics: [RAINY_IMG_BASE + "07-ceramics.png"],
    sshm: [RAINY_IMG_BASE + "08-sshm.png"],
    ntcart: [RAINY_IMG_BASE + "09-ntcart.png"],
    library: [RAINY_IMG_BASE + "10-library.png"],
    mall: [RAINY_IMG_BASE + "11-mall.png"],
    restaurant: [RAINY_IMG_BASE + "12-restaurant.png"]
  };

  function spotImageSrc(imageKey) {
    var list = RAINY_SPOT_IMAGES[imageKey];
    return list && list[0] ? list[0] : "";
  }

  function handleSpotImageError(img) {
    var key = img.getAttribute("data-image-key");
    var list = RAINY_SPOT_IMAGES[key] || [];
    var tried = parseInt(img.getAttribute("data-fallback-idx") || "0", 10);
    if (tried + 1 < list.length) {
      img.setAttribute("data-fallback-idx", String(tried + 1));
      img.src = list[tried + 1];
      return;
    }
    img.style.display = "none";
  }

  global.handleRainySpotImageError = handleSpotImageError;

  function renderRestaurantsHtml(spot) {
    if (!spot.restaurants || !spot.restaurants.length) return "";
    return (
      "<h4>附近餐廳推薦</h4><ul class=\"rainy-rest-list\">" +
      spot.restaurants
        .map(function (r) {
          return (
            '<li class="rainy-rest-item"><div class="rainy-rest-head">' +
            '<button type="button" class="rainy-term-link" data-rainy-map="' +
            (r.mapQuery || r.name) +
            '">' +
            r.name +
            "</button>" +
            (r.tag ? '<span class="rainy-rest-tag">' + r.tag + "</span>" : "") +
            "</div>" +
            (r.note ? '<p class="rainy-rest-note">' + r.note + "</p>" : "") +
            (r.hours || r.fee
              ? '<p class="rainy-rest-meta">' +
                [r.hours, r.fee].filter(Boolean).join("｜") +
                "</p>"
              : "") +
            "</li>"
          );
        })
        .join("") +
      '</ul><p class="rainy-modal-note rainy-rest-disclaimer">餐廳營業時間、菜單與空位以現場或店家公告為準，出發前建議先查評價或電話確認。</p>'
    );
  }

  function renderSpotRestaurantsPreview(spot) {
    if (!spot.restaurants || !spot.restaurants.length) return "";
    var names = spot.restaurants
      .slice(0, 2)
      .map(function (r) {
        return r.name;
      })
      .join("、");
    var more = spot.restaurants.length > 2 ? " 等" : "";
    return (
      '<p class="rainy-spot-rest"><span class="rainy-spot-rest-label">餐廳</span>' +
      names +
      more +
      "</p>"
    );
  }

  var spots = [
    {
      imageKey: "ntsec",
      title: "國立臺灣科學教育館",
      type: "科學放電型",
      emoji: "🔬",
      imageAlt: "親子在室內科學展覽中互動體驗的情境示意",
      photoCaption: "科教館｜互動展覽・半日放電",
      category: ["knowledge", "active"],
      area: "台北士林",
      age: "6–12 歲",
      stay: "2.5–4 小時",
      weather: "中雨、大雨都穩",
      hours: "參考：週二～日 09:00–17:00（週一休館；國定假日以官方為準）",
      fee: "參考：全票約 NT$100、優待票約 NT$50（3D 劇院、特展另計；以官方為準）",
      restaurants: [
        { name: "天母 SOGO 美食街", tag: "美食街", hours: "參考：11:00–21:30", fee: "參考：人均約 NT$200–400", note: "科教館開車約 10 分，雨天好找座位、選擇多。", mapQuery: "天母 SOGO 美食街" },
        { name: "杏子豬排（天母店）", tag: "日式定食", hours: "參考：11:30–21:00", fee: "參考：套餐約 NT$280–450", note: "適合國小以上，上菜快、孩子接受度高。", mapQuery: "杏子豬排 天母店" },
        { name: "欣葉台菜（天母店）", tag: "台菜合菜", hours: "參考：11:30–21:30", fee: "參考：人均約 NT$400–700", note: "家庭聚餐穩，建議尖峰時段先訂位。", mapQuery: "欣葉台菜 天母店" }
      ],
      summary: "如果孩子已經在家悶了一上午，這類互動型場館會比單純看展更適合。孩子有東西可以摸、可以看、可以問，大人也比較不會只是一路催促。",
      highlights: ["互動展覽多", "適合國小以上", "可搭配天文館", "室內空間大"],
      tips: "週末人潮會比較多，建議先查當期特展與票價。若孩子容易累，行程不要再硬接第二個大型展館。",
      official: "https://www.ntsec.gov.tw/",
      map: "https://www.google.com/maps/search/?api=1&query=國立臺灣科學教育館",
      detail: "科教館適合想讓孩子放電又有收穫的家庭。它不是單純知識展，而是有不少互動與體驗內容，國小孩子通常比較能投入。雨天時最大的優點是可以玩半天，不必頻繁轉場。"
    },
    {
      imageKey: "tam",
      title: "臺北市立天文科學教育館",
      type: "宇宙探索型",
      emoji: "🪐",
      imageAlt: "親子在天文展覽空間觀看星球投影的情境示意",
      photoCaption: "天文館｜太空展覽",
      category: ["knowledge", "active"],
      area: "台北士林",
      age: "5–12 歲",
      stay: "1.5–3 小時",
      weather: "小雨、中雨適合",
      hours: "參考：週二～日 09:00–17:00（週一休館；劇場場次見官方）",
      fee: "參考：展示區全票約 NT$40、優待約 NT$20（球幕劇場另計；以官方為準）",
      restaurants: [
        { name: "天母微風廣場美食街", tag: "美食街", hours: "參考：11:00–21:30", fee: "參考：人均約 NT$200–450", note: "天文館車程約 10 分，雨天可一次解決吃飯與避雨。", mapQuery: "天母微風廣場 美食街" },
        { name: "士東市場熟食區", tag: "在地小吃", hours: "參考：07:00–14:00 前後", fee: "參考：人均約 NT$80–200", note: "適合想快速解決午餐，但座位較少、尖峰較擠。", mapQuery: "士東市場 美食" },
        { name: "天母 SOGO 美食街", tag: "美食街", hours: "參考：11:00–21:30", fee: "參考：人均約 NT$200–400", note: "可與科教館、天文館排成士林半日線的午餐或晚餐點。", mapQuery: "天母 SOGO 美食街" }
      ],
      summary: "孩子對星球、太空、宇宙有興趣時，天文館很容易打開話題。它不一定是最放電的點，但很適合讓孩子帶著問題看世界。",
      highlights: ["太空主題明確", "可看劇場", "可接科教館", "適合親子討論"],
      tips: "劇場、設施與活動可能有場次限制，出發前先看官方資訊會比較保險。",
      official: "https://www.tam.gov.taipei/",
      map: "https://www.google.com/maps/search/?api=1&query=臺北市立天文科學教育館",
      detail: "天文館很適合做成太空主題日。孩子如果已經國小，可以延伸聊太陽系、月球、黑洞、太空人；如果孩子較小，就用劇場與視覺展示帶入，不要把行程變成上課。"
    },
    {
      imageKey: "kidsPark",
      title: "臺北市立兒童新樂園",
      type: "雨小放電型",
      emoji: "🎠",
      imageAlt: "孩子在明亮室內遊戲空間活動的情境示意",
      photoCaption: "兒童新樂園｜小雨備案",
      category: ["active", "young"],
      area: "台北士林",
      age: "4–12 歲",
      stay: "2–4 小時",
      weather: "小雨可考慮，大雨不建議硬排",
      hours: "參考：平日 10:00–17:00、假日 10:00–18:00（休園日以官方為準）",
      fee: "參考：入園約 NT$30，遊樂設施另購點數或票券（以官方為準）",
      restaurants: [
        { name: "兒童新樂園園區餐飲", tag: "園內餐飲", hours: "參考：配合園區開放", fee: "參考：套餐約 NT$120–250", note: "小雨天最省事，不必再冒雨找餐廳。", mapQuery: "臺北市立兒童新樂園 餐廳" },
        { name: "天母商圈餐廳", tag: "商圈", hours: "參考：11:00–21:00", fee: "參考：人均約 NT$250–500", note: "離園區車程短，適合玩完再慢慢吃。", mapQuery: "天母 親子餐廳" },
        { name: "士林區親子友善餐廳", tag: "親子餐廳", hours: "參考：11:00–21:00", fee: "參考：低消依店家", note: "若孩子年紀小、需要遊戲區，可改排親子餐廳。", mapQuery: "士林 親子餐廳" }
      ],
      summary: "兒童新樂園不是純室內景點，但如果只是小雨、雨勢不穩，又想讓孩子有遊樂園感，可以列為彈性備案。",
      highlights: ["孩子接受度高", "可搭配士林景點", "遊樂設施多", "小雨彈性點"],
      tips: "大雨、雷雨或排隊區會淋雨時，不建議硬去。這個點適合小雨或雨停空檔，不適合豪雨備案。",
      official: "https://www.travel.taipei/zh-tw/attraction/details/351",
      map: "https://www.google.com/maps/search/?api=1&query=臺北市立兒童新樂園",
      detail: "兒童新樂園的優點是孩子很容易期待，但它不是完全室內行程。雨天要把它當成小雨備案，不要當成大雨主行程。若天氣不穩，建議把科教館或天文館當主景點，兒童新樂園只當加碼。"
    },
    {
      imageKey: "npmChildren",
      title: "故宮兒童學藝中心",
      type: "文化入門型",
      emoji: "🏺",
      imageAlt: "親子在博物館兒童展區觀察展示的情境示意",
      photoCaption: "故宮兒童學藝中心",
      category: ["knowledge", "free"],
      area: "台北士林",
      age: "4–10 歲",
      stay: "1–2 小時",
      weather: "小雨、中雨適合",
      hours: "參考：週二～日 09:00–17:00（週一休館；活動場次見官方）",
      fee: "參考：兒童學藝中心多為免費或象徵性費用（手作課程另計；以官方為準）",
      restaurants: [
        { name: "故宮晶華", tag: "飯店自助餐", hours: "參考：11:30–21:00", fee: "參考：午餐約 NT$800 起（以店家為準）", note: "步行可達，雨天最方便，但價位偏高、建議先訂位。", mapQuery: "故宮晶華" },
        { name: "劍潭站周邊餐廳", tag: "捷運商圈", hours: "參考：11:00–21:00", fee: "參考：人均約 NT$200–450", note: "搭車或短程轉場，選擇多、適合家庭合菜或定食。", mapQuery: "劍潭站 餐廳" },
        { name: "芝山站美食商圈", tag: "商圈", hours: "參考：11:00–21:00", fee: "參考：人均約 NT$150–350", note: "若不想在故宮周邊人擠人，可改往芝山一帶。", mapQuery: "芝山站 美食" }
      ],
      summary: "想讓孩子接觸文化，又不想讓他覺得博物館只是安靜看文物，可以從兒童學藝中心這類比較友善的空間開始。",
      highlights: ["文化入門", "室內安靜", "適合半日", "可接故宮展館"],
      tips: "不建議把它排成整天主行程。比較適合搭配附近吃飯、故宮展館或士林其他室內點。",
      official: "https://theme.npm.edu.tw/children/",
      map: "https://www.google.com/maps/search/?api=1&query=故宮兒童學藝中心",
      detail: "故宮兒童學藝中心適合把博物館變得比較輕鬆。不要用大人看展的方式要求孩子吸收，可以改成找圖案、看顏色、問孩子最喜歡哪一件作品。"
    },
    {
      imageKey: "parentCenter",
      title: "臺北市各區親子館",
      type: "幼兒首選型",
      emoji: "🧸",
      imageAlt: "臺北市各區親子館室內共玩與親子活動空間示意",
      photoCaption: "臺北親子館｜幼兒友善",
      category: ["young", "free"],
      area: "台北多區",
      age: "0–6 歲",
      stay: "依場次規定",
      weather: "大雨也適合，但要預約",
      hours: "參考：各館場次不同，多為上午／下午各一場（須預約；以各館公告為準）",
      fee: "參考：多數免費入館（部分課程或材料費另計；以各館公告為準）",
      restaurants: [
        { name: "各館步行 10 分內商圈", tag: "在地商圈", hours: "參考：依各區而異", fee: "參考：人均約 NT$150–350", note: "親子館場次通常 2 小時內，建議先鎖定「離館最近」的餐廳。", mapQuery: "台北市 親子館 附近餐廳" },
        { name: "大安／信義親子館周邊", tag: "商圈", hours: "參考：11:00–21:00", fee: "參考：人均約 NT$250–500", note: "可接敦南、信義商圈美食街，雨天選擇多。", mapQuery: "大安親子館 附近餐廳" },
        { name: "士林／北投親子館周邊", tag: "商圈", hours: "參考：11:00–21:00", fee: "參考：人均約 NT$200–450", note: "可接天母、石牌商圈，適合幼兒家庭慢慢吃。", mapQuery: "士林親子館 附近餐廳" }
      ],
      summary: "孩子還小時，親子館通常比大型展館更實際。安全、分齡、可控，家長也比較不會累到崩潰。",
      highlights: ["幼兒友善", "分齡遊戲", "低成本", "安全空間"],
      tips: "多數親子館有預約或場次限制，臨時出門前一定要先查。",
      official: "https://welfare.gov.taipei/Kids/parentChild/Index",
      map: "https://www.google.com/maps/search/?api=1&query=台北市親子館",
      detail: "親子館適合學齡前孩子，不要硬把幼兒帶去大型展館。雨天時親子館的優勢是安全、範圍清楚、可控性高。"
    },
    {
      imageKey: "moca",
      title: "台北當代藝術館 U12 小玩藝空間",
      type: "藝術探索型",
      emoji: "🎨",
      imageAlt: "親子在明亮美術館展廳看展的情境示意",
      photoCaption: "當代藝術館｜藝術探索",
      category: ["knowledge", "free"],
      area: "台北大同",
      age: "4–12 歲",
      stay: "1–2 小時",
      weather: "小雨、中雨適合",
      hours: "參考：週二～日 10:00–18:00（週一休館；展期與活動見官方）",
      fee: "參考：常設展多為免費，特展或活動可能另收費（以官方為準）",
      restaurants: [
        { name: "中山站新光三越美食街", tag: "美食街", hours: "參考：11:00–21:30", fee: "參考：人均約 NT$200–450", note: "當代藝術館步行約 10 分，雨天好安排午餐。", mapQuery: "新光三越 台北南西店 美食街" },
        { name: "赤峰街周邊咖啡輕食", tag: "咖啡輕食", hours: "參考：10:00–18:00", fee: "參考：人均約 NT$150–300", note: "適合展後慢慢聊，但座位有限、尖峰需等候。", mapQuery: "赤峰街 咖啡 餐廳" },
        { name: "南京西路商圈餐廳", tag: "商圈", hours: "參考：11:00–21:00", fee: "參考：人均約 NT$250–500", note: "選擇多，可搭配中山、雙連一帶行程。", mapQuery: "南京西路 親子餐廳" }
      ],
      summary: "這類藝文空間不一定是最放電，但很適合讓孩子換一種節奏。雨天不用急著跑很多點，慢慢看、慢慢聊，反而比較有記憶點。",
      highlights: ["藝術啟發", "適合短行程", "親子觀展", "可接中山站周邊"],
      tips: "藝術館行程不要排太硬。重點不是看懂作品，而是讓孩子觀察、提問、表達感受。",
      official: "https://www.moca.taipei/",
      map: "https://www.google.com/maps/search/?api=1&query=台北當代藝術館",
      detail: "台北當代藝術館的 U12 小玩藝空間適合想讓孩子接觸藝術的家庭。它不是傳統安靜看畫的模式，而是更適合親子一起體驗與討論。"
    },
    {
      imageKey: "ntm",
      title: "國立臺灣博物館",
      type: "自然歷史型",
      emoji: "🦖",
      imageAlt: "親子在自然歷史博物館展廳觀看展品的情境示意",
      photoCaption: "臺博館｜自然歷史",
      category: ["knowledge"],
      area: "台北中正",
      age: "6–12 歲",
      stay: "1.5–2.5 小時",
      weather: "小雨、中雨適合",
      hours: "參考：週二～日 09:30–17:00（週一休館；各分館時間見官方）",
      fee: "參考：本館全票約 NT$30、優待約 NT$15（特展另計；以官方為準）",
      restaurants: [
        { name: "K Park 台北車站美食街", tag: "美食街", hours: "參考：10:00–22:00", fee: "參考：人均約 NT$150–350", note: "台博館步行可達，雨天轉場最短。", mapQuery: "K Park 台北車站 美食街" },
        { name: "微風台北車站", tag: "商場餐飲", hours: "參考：11:00–21:30", fee: "參考：人均約 NT$200–450", note: "選擇多，適合看完展覽直接吃午餐。", mapQuery: "微風台北車站 餐廳" },
        { name: "新光三越站前店美食街", tag: "美食街", hours: "參考：11:00–21:30", fee: "參考：人均約 NT$200–400", note: "親子選項多，可搭配二二八公園半日行程。", mapQuery: "新光三越 站前店 美食街" }
      ],
      summary: "如果不想跑太遠，市中心的博物館是很穩的選擇。孩子年紀夠的話，可以把展品變成尋寶任務，而不是一路聽大人講解。",
      highlights: ["交通方便", "自然歷史主題", "市中心", "短行程穩"],
      tips: "適合國小孩子；幼兒可能需要家長用說故事方式帶，不然容易覺得只是看展。",
      official: "https://www.ntm.gov.tw/",
      map: "https://www.google.com/maps/search/?api=1&query=國立臺灣博物館",
      detail: "國立臺灣博物館適合安排成市中心半日行程。它的優點是交通方便、主題清楚，缺點是孩子若年紀太小，家長要用故事或任務方式帶。"
    },
    {
      imageKey: "ceramics",
      title: "新北市立鶯歌陶瓷博物館",
      type: "手作體驗型",
      emoji: "🏺",
      imageAlt: "親子在陶藝手作空間體驗陶土與作品展示的情境示意",
      photoCaption: "鶯歌陶博｜手作體驗",
      category: ["knowledge", "drive", "active"],
      area: "新北鶯歌",
      age: "5–12 歲",
      stay: "2–3 小時",
      weather: "小雨、中雨適合",
      hours: "參考：週二～日 09:30–17:00（週一休館；DIY 課程時段見官方）",
      fee: "參考：全票約 NT$80、優待約 NT$40（手作體驗另計；以官方為準）",
      restaurants: [
        { name: "鶯歌老街美食（室內店）", tag: "老街小吃", hours: "參考：10:00–18:00", fee: "參考：人均約 NT$100–250", note: "雨大優先選有內用座位的店，不建議硬逛露天攤。", mapQuery: "鶯歌老街 美食" },
        { name: "陶博館周邊簡餐", tag: "簡餐", hours: "參考：11:00–17:00", fee: "參考：人均約 NT$120–220", note: "看展或手作後就近用餐，最省體力。", mapQuery: "鶯歌陶瓷博物館 餐廳" },
        { name: "鶯歌親子友善餐廳", tag: "親子餐廳", hours: "參考：11:00–21:00", fee: "參考：低消依店家", note: "幼兒家庭可優先找有兒童椅、遊戲區的店家。", mapQuery: "鶯歌 親子餐廳" }
      ],
      summary: "鶯歌陶博很適合做成半日行程。孩子如果喜歡畫畫、捏土、手作，比單純逛展更容易留下記憶。",
      highlights: ["手作感強", "半日遊", "可搭配老街", "開車友善"],
      tips: "雨勢大時就以陶博館為主，不建議硬逛老街。雨停再加短距離散步。",
      official: "https://www.ceramics.ntpc.gov.tw/",
      map: "https://www.google.com/maps/search/?api=1&query=新北市立鶯歌陶瓷博物館",
      detail: "鶯歌陶博適合喜歡手作的孩子。行程可以設計成看展、手作、吃飯，節奏比單純走馬看花更好。"
    },
    {
      imageKey: "sshm",
      title: "新北市立十三行博物館",
      type: "考古探險型",
      emoji: "🦴",
      imageAlt: "親子在考古博物館展櫃前觀看古物的情境示意",
      photoCaption: "十三行博物館",
      category: ["knowledge", "drive"],
      area: "新北八里",
      age: "6–12 歲",
      stay: "1.5–2.5 小時",
      weather: "小雨、中雨適合",
      hours: "參考：週二～日 09:30–17:00（週一休館；導覽場次見官方）",
      fee: "參考：全票約 NT$80、優待約 NT$40（以官方為準）",
      restaurants: [
        { name: "八里左岸餐廳", tag: "河岸餐廳", hours: "參考：11:00–20:30", fee: "參考：人均約 NT$300–600", note: "大雨時選室內座位，不建議硬排戶外河岸區。", mapQuery: "八里左岸 餐廳" },
        { name: "十三行博物館周邊簡餐", tag: "簡餐", hours: "參考：11:00–17:00", fee: "參考：人均約 NT$120–250", note: "開車族最方便，看完展覽就近用餐。", mapQuery: "十三行博物館 餐廳" },
        { name: "八里渡船頭美食", tag: "在地小吃", hours: "參考：10:00–18:00", fee: "參考：人均約 NT$80–200", note: "雨停再考慮，可搭配淡海輕量半日線。", mapQuery: "八里渡船頭 美食" }
      ],
      summary: "如果孩子喜歡恐龍、歷史或探險感，十三行會比一般展館更有故事性。雨停時還可以接八里周邊。",
      highlights: ["考古主題", "開車友善", "八里周邊", "雨停可散步"],
      tips: "大雨時不建議硬接河岸戶外行程。只排博物館與附近餐廳會比較穩。",
      official: "https://www.sshm.ntpc.gov.tw/",
      map: "https://www.google.com/maps/search/?api=1&query=新北市立十三行博物館",
      detail: "十三行很適合做成考古探險主題。孩子如果喜歡神祕感、歷史、古物，會比較容易進入狀況。"
    },
    {
      imageKey: "ntcart",
      title: "新北市美術館",
      type: "藝術空間型",
      emoji: "🖼️",
      imageAlt: "親子在美術館展廳中欣賞展覽的情境示意",
      photoCaption: "新北美術館",
      category: ["knowledge", "drive"],
      area: "新北鶯歌",
      age: "6–12 歲",
      stay: "1.5–3 小時",
      weather: "小雨、中雨適合",
      hours: "參考：週二～日 10:00–18:00（週一休館；展期見官方）",
      fee: "參考：常設展多免費，特展可能收費（以官方為準）",
      restaurants: [
        { name: "新北市美術館咖啡輕食", tag: "咖啡輕食", hours: "參考：10:00–18:00", fee: "參考：人均約 NT$150–280", note: "看展後就近休息，適合不趕行程的雨天午後。", mapQuery: "新北市美術館 咖啡" },
        { name: "鶯歌光點周邊餐廳", tag: "商圈", hours: "參考：11:00–21:00", fee: "參考：人均約 NT$200–400", note: "可與美術館、陶博排成鶯歌藝術半日線。", mapQuery: "鶯歌光點 餐廳" },
        { name: "鶯歌老街美食（室內店）", tag: "老街小吃", hours: "參考：10:00–18:00", fee: "參考：人均約 NT$100–250", note: "雨大時選有內用區的店家，縮短步行距離。", mapQuery: "鶯歌老街 美食" }
      ],
      summary: "如果想把鶯歌路線做得更有變化，新北市美術館可以和陶博館搭配。這類空間不用急著看完，慢慢走反而舒服。",
      highlights: ["藝術展覽", "可搭配鶯歌", "空間感強", "適合半日"],
      tips: "展覽內容會變動，出發前先查當期展覽。若孩子年紀小，建議用觀察顏色、形狀、空間的方式帶。",
      official: "https://ntcart.museum/",
      map: "https://www.google.com/maps/search/?api=1&query=新北市美術館",
      detail: "新北市美術館適合想要讓行程不只是放電，也有一點美感體驗的家庭。它很適合與鶯歌陶博一起排成藝術半日線。"
    },
    {
      imageKey: "library",
      title: "新北市立圖書館總館",
      type: "安靜補位型",
      emoji: "📚",
      imageAlt: "親子在兒童圖書館閱讀區共讀的情境示意",
      photoCaption: "圖書館｜閱讀休息",
      category: ["young", "free"],
      area: "新北板橋",
      age: "3–12 歲",
      stay: "1–2 小時",
      weather: "大雨備案",
      hours: "參考：週二～日 08:30–21:00（各分館、兒童區開放時段見官方）",
      fee: "參考：免費入館（借閱證、活動報名規則以各館為準）",
      restaurants: [
        { name: "大遠百板橋餐飲", tag: "百貨美食", hours: "參考：11:00–22:00", fee: "參考：人均約 NT$200–450", note: "圖書館總館車程短，雨天最穩的午餐備案。", mapQuery: "大遠百 板橋 餐廳" },
        { name: "誠品板橋車站店", tag: "商場餐飲", hours: "參考：11:00–21:30", fee: "參考：人均約 NT$200–400", note: "可接閱讀＋用餐，不必再冒雨找路。", mapQuery: "誠品 板橋車站 餐廳" },
        { name: "府中商圈美食", tag: "商圈", hours: "參考：11:00–21:00", fee: "參考：人均約 NT$150–300", note: "選擇多、價位親民，適合預算有限的家庭。", mapQuery: "府中 美食" }
      ],
      summary: "如果雨很大、孩子已經有點累，圖書館比硬跑景點更聰明。它適合放在行程後半段，讓節奏慢下來。",
      highlights: ["免費", "安靜", "交通方便", "可臨時加入"],
      tips: "圖書館不是放電點，比較像穩定情緒、休息、補位。適合搭配餐廳或商場。",
      official: "https://www.library.ntpc.gov.tw/",
      map: "https://www.google.com/maps/search/?api=1&query=新北市立圖書館總館",
      detail: "圖書館是很容易被低估的雨天備案。當孩子已經玩累，家長也需要休息時，圖書館比繼續硬排行程更實際。"
    },
    {
      imageKey: "mall",
      title: "百貨商場＋書店＋餐廳",
      type: "商場保命型",
      emoji: "🍽️",
      imageAlt: "城市大型商場內書店與親子休息區的情境示意",
      photoCaption: "百貨商場｜避雨最穩",
      category: ["young", "free", "drive"],
      area: "雙北多區",
      age: "全齡",
      stay: "1.5–3 小時",
      weather: "大雨、豪雨備案",
      hours: "參考：多數百貨 11:00–22:00 前後（各館、書店營業時間不同；以現場為準）",
      fee: "參考：入場免費，消費依各店與活動而定",
      restaurants: [
        { name: "京站 Q square 美食街", tag: "美食街", hours: "參考：11:00–22:00", fee: "參考：人均約 NT$200–400", note: "台北車站周邊，捷運直達、雨天最省事。", mapQuery: "京站 Q square 美食街" },
        { name: "板橋大遠百／遠東百貨", tag: "百貨美食", hours: "參考：11:00–22:00", fee: "參考：人均約 NT$200–450", note: "新北家庭常用備案，停車與親子設施相對完整。", mapQuery: "板橋大遠百 餐廳" },
        { name: "微風南山／微風廣場", tag: "商場餐飲", hours: "參考：11:00–21:30", fee: "參考：人均約 NT$300–600", note: "親子選項多，適合想順便看書店、玩具區的家庭。", mapQuery: "微風南山 餐廳" }
      ],
      summary: "老實說，雨很大時商場不一定最有旅行感，但它常常是最不會出錯的選擇。停車、吃飯、廁所、避雨都在同一棟，家長壓力會少很多。",
      highlights: ["停車方便", "吃飯方便", "廁所方便", "不怕大雨"],
      tips: "如果外面雨勢很強，商場行程比戶外轉場安全。可以把書店、玩具區、餐廳當成低風險備案。",
      official: "https://www.google.com/maps/search/台北+新北+百貨+親子+餐廳",
      map: "https://www.google.com/maps/search/?api=1&query=台北+新北+百貨+親子+餐廳",
      detail: "商場型行程很適合雨勢不穩時使用。重點不是景點本身，而是降低家長出門的風險：停車、吃飯、廁所、避雨一次解決。"
    },
    {
      imageKey: "restaurant",
      title: "親子餐廳／室內遊戲空間",
      type: "臨時救援型",
      emoji: "🛝",
      imageAlt: "親子餐廳與室內遊戲空間的情境示意",
      photoCaption: "親子餐廳｜吃飯放電",
      category: ["young", "active", "drive"],
      area: "雙北多區",
      age: "2–8 歲",
      stay: "1.5–3 小時",
      weather: "大雨備案",
      hours: "參考：多為 11:00–21:00 前後（各店營業、最後點餐時間不同；以店家為準）",
      fee: "參考：低消、入場費、遊戲區計時費依各店而異（出發前建議先電話確認）",
      restaurants: [
        { name: "童樂島親子餐廳", tag: "親子餐廳", hours: "參考：11:00–21:00", fee: "參考：低消約 NT$300–500／人", note: "有遊戲區，適合幼兒放電；尖峰建議訂位。", mapQuery: "童樂島 親子餐廳 台北" },
        { name: "樂樂園親子餐廳", tag: "親子餐廳", hours: "參考：11:00–21:00", fee: "參考：低消依店家", note: "雙北多分店，出發前先查最近據點與訂位規則。", mapQuery: "樂樂園 親子餐廳 新北" },
        { name: "室內親子樂園＋餐飲", tag: "遊戲空間", hours: "參考：10:00–21:00", fee: "參考：入場費約 NT$300–600", note: "大雨救援點，注意襪子、清潔與陪同規定。", mapQuery: "台北 新北 室內親子樂園 餐廳" }
      ],
      summary: "如果你今天只想讓孩子有地方玩、家長能坐下吃飯，親子餐廳或室內遊戲空間會比博物館更實際。",
      highlights: ["吃飯方便", "幼兒放電", "家長休息", "大雨救援"],
      tips: "熱門時段可能需要訂位，也要注意低消、清潔、入場規則與襪子要求。",
      official: "https://www.google.com/maps/search/台北+新北+親子餐廳+室內遊戲",
      map: "https://www.google.com/maps/search/?api=1&query=台北+新北+親子餐廳+室內遊戲",
      detail: "親子餐廳不是每次都最便宜，但它很適合雨很大、孩子年紀小、家長也累的時候。這類點的重點是降低壓力，而不是追求行程深度。"
    }
  ];

  var officialLinks = [
    ["國立臺灣科學教育館", "https://www.ntsec.gov.tw/"],
    ["臺北市立天文科學教育館", "https://www.tam.gov.taipei/"],
    ["臺北市立兒童新樂園", "https://www.travel.taipei/zh-tw/attraction/details/351"],
    ["故宮兒童學藝中心", "https://theme.npm.edu.tw/children/"],
    ["台北當代藝術館", "https://www.moca.taipei/"],
    ["國立臺灣博物館", "https://www.ntm.gov.tw/"],
    ["新北市立鶯歌陶瓷博物館", "https://www.ceramics.ntpc.gov.tw/"],
    ["新北市立十三行博物館", "https://www.sshm.ntpc.gov.tw/"],
    ["新北市美術館", "https://ntcart.museum/"],
    ["臺北市親子館", "https://welfare.gov.taipei/Kids/parentChild/Index"],
    ["新北育兒資訊網", "https://lovebaby.sw.ntpc.gov.tw/"]
  ];

  var coords = {
    shilin: {
      name: "台北士林",
      hint: "這區可安排科教館、天文館、兒童新樂園、故宮兒童學藝中心。",
      lat: 25.095,
      lon: 121.5246
    },
    taipei: {
      name: "台北市中心",
      hint: "這區可安排臺博、當代藝術館，或改走商場、書店備案。",
      lat: 25.0478,
      lon: 121.5319
    },
    banqiao: {
      name: "新北板橋",
      hint: "這區可安排圖書館總館、百貨、親子餐廳，交通與吃飯相對方便。",
      lat: 25.0138,
      lon: 121.4647
    },
    yingge: {
      name: "新北鶯歌",
      hint: "這區可安排陶博館、新北美術館，適合半日室內藝術路線。",
      lat: 24.9513,
      lon: 121.35
    },
    bali: {
      name: "新北八里",
      hint: "這區可安排十三行博物館；大雨時建議以博物館為主、少接戶外。",
      lat: 25.1467,
      lon: 121.3982
    },
    tucheng: {
      name: "新北土城",
      hint: "這區近板橋，適合當備案：商場、圖書館或親子友善餐廳。",
      lat: 24.9722,
      lon: 121.4433
    }
  };

  var rainyTermLinks = [
    { label: "國立臺灣科學教育館", spotIndex: 0 },
    { label: "臺北市立天文科學教育館", spotIndex: 1 },
    { label: "臺北市立兒童新樂園", spotIndex: 2 },
    { label: "故宮兒童學藝中心", spotIndex: 3 },
    { label: "臺北市各區親子館", spotIndex: 4 },
    { label: "台北當代藝術館", spotIndex: 5 },
    { label: "國立臺灣博物館", spotIndex: 6 },
    { label: "新北市立鶯歌陶瓷博物館", spotIndex: 7 },
    { label: "鶯歌陶瓷博物館", spotIndex: 7 },
    { label: "新北市立十三行博物館", spotIndex: 8 },
    { label: "十三行博物館", spotIndex: 8 },
    { label: "新北市美術館", spotIndex: 9 },
    { label: "新北市立圖書館總館", spotIndex: 10 },
    { label: "圖書館兒童閱讀區", spotIndex: 10 },
    { label: "百貨商場與書店", mapQuery: "台北+新北+百貨+親子+書店" },
    { label: "百貨商場", mapQuery: "台北+新北+百貨+親子" },
    { label: "親子餐廳", mapQuery: "台北+新北+親子餐廳+室內遊戲" },
    { label: "室內遊戲空間", mapQuery: "台北+新北+親子+室內遊戲" },
    { label: "陶博館", spotIndex: 7 },
    { label: "科教館", spotIndex: 0 },
    { label: "天文館", spotIndex: 1 },
    { label: "親子館", spotIndex: 4 },
    { label: "圖書館", spotIndex: 10 },
    { label: "商場", mapQuery: "台北+新北+百貨" },
    { label: "鶯歌", mapQuery: "新北市鶯歌區+親子" },
    { label: "八里", mapQuery: "新北市八里區+親子" },
    { label: "板橋", mapQuery: "新北市板橋區+親子+室內" }
  ].sort(function (a, b) {
    return b.label.length - a.label.length;
  });

  function rainyMapEmbedUrl(query) {
    return (
      "https://maps.google.com/maps?q=" +
      encodeURIComponent(query) +
      "&hl=zh-TW&z=14&output=embed"
    );
  }

  function rainyMapExternalUrl(query) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
  }

  var rainyScrollLockY = 0;
  var rainyScrollLocked = false;

  function syncRainyPageScrollLock() {
    var spotOpen = document.getElementById("rainySpotModal");
    var mapOpen = document.getElementById("rainyMapModal");
    var shouldLock =
      (spotOpen && spotOpen.classList.contains("is-open")) ||
      (mapOpen && mapOpen.classList.contains("is-open"));

    if (shouldLock) {
      if (rainyScrollLocked) return;
      rainyScrollLocked = true;
      rainyScrollLockY = window.scrollY || window.pageYOffset || 0;
      document.documentElement.classList.add("rainy-scroll-locked");
      document.body.style.position = "fixed";
      document.body.style.top = "-" + rainyScrollLockY + "px";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      return;
    }

    if (!rainyScrollLocked) return;
    rainyScrollLocked = false;
    document.documentElement.classList.remove("rainy-scroll-locked");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, rainyScrollLockY);
  }

  function openMapModal(query, title) {
    var modal = document.getElementById("rainyMapModal");
    var frame = document.getElementById("rainyMapFrame");
    var ext = document.getElementById("rainyMapOpenExternal");
    if (!modal || !frame) return;
    document.getElementById("rainyMapModalTitle").textContent = title || "地圖導航";
    frame.src = rainyMapEmbedUrl(query);
    if (ext) ext.href = rainyMapExternalUrl(query);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    syncRainyPageScrollLock();
  }

  function closeMapModal() {
    var modal = document.getElementById("rainyMapModal");
    var frame = document.getElementById("rainyMapFrame");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (frame) frame.src = "about:blank";
    syncRainyPageScrollLock();
  }

  function linkifyRainyText(html) {
    rainyTermLinks.forEach(function (rule) {
      var re = new RegExp(rule.label, "g");
      var rep;
      if (rule.spotIndex != null) {
        rep =
          '<button type="button" class="rainy-term-link" data-rainy-spot="' +
          rule.spotIndex +
          '">' +
          rule.label +
          "</button>";
      } else if (rule.mapQuery) {
        rep =
          '<button type="button" class="rainy-term-link" data-rainy-map="' +
          rule.mapQuery +
          '">' +
          rule.label +
          "</button>";
      } else {
        return;
      }
      html = html.replace(re, rep);
    });
    return html;
  }

  var rainyFaqIcons = [
    "🏙️", "🗺️", "✅", "👶", "🧒", "🎒", "👫", "🌦️", "🌧️", "⛈️",
    "🚫", "🚗", "🚇", "📍", "⏱️", "💸", "⏰", "🍜", "📅", "🔄",
    "⚠️", "🍼", "📌"
  ];

  function decorateRainyFaq() {
    document.querySelectorAll(".rainy-faq-item").forEach(function (item, index) {
      var summary = item.querySelector("summary");
      if (!summary || summary.dataset.decorated === "1") return;
      var icon = rainyFaqIcons[index] || "❓";
      var text = summary.textContent;
      summary.innerHTML =
        '<span class="rainy-faq-icon" aria-hidden="true">' +
        icon +
        '</span><span class="rainy-faq-q">' +
        text +
        "</span>";
      summary.dataset.decorated = "1";
    });
  }

  function linkifyRainyFaq() {
    document.querySelectorAll(".rainy-faq-item p").forEach(function (p) {
      if (p.dataset.linkified === "1") return;
      p.innerHTML = linkifyRainyText(p.textContent);
      p.dataset.linkified = "1";
    });
  }

  function weatherCodeText(code) {
    var map = {
      0: ["☀️", "晴朗"],
      1: ["🌤️", "大致晴朗"],
      2: ["⛅", "局部多雲"],
      3: ["☁️", "陰天"],
      45: ["🌫️", "霧"],
      48: ["🌫️", "霧"],
      51: ["🌦️", "小毛雨"],
      53: ["🌦️", "毛雨"],
      55: ["🌧️", "較強毛雨"],
      61: ["🌧️", "小雨"],
      63: ["🌧️", "中雨"],
      65: ["⛈️", "大雨"],
      80: ["🌦️", "短暫陣雨"],
      81: ["🌧️", "陣雨"],
      82: ["⛈️", "強陣雨"],
      95: ["⛈️", "雷雨"],
      96: ["⛈️", "雷雨伴隨冰雹"],
      99: ["⛈️", "強雷雨"]
    };
    return map[code] || ["🌦️", "天氣變化中"];
  }

  function rainAdvice(pop, code) {
    if (code >= 95 || pop >= 85) {
      return "目前不適合頻繁移動。建議選商場、百貨、圖書館、親子館，或直接改在家任務包。";
    }
    if (pop >= 65 || code >= 63) {
      return "今天建議採「單點深玩」：選一個室內主景點，不要排太多轉場。";
    }
    if (pop >= 40 || code >= 51) {
      return "可安排室內主景點，加一個附近吃飯點。雨停再決定要不要加第二站。";
    }
    return "雨勢風險較低，可以安排半日行程，但仍建議保留一個室內備案。";
  }

  function renderSpotPhoto(spot) {
    var imgSrc = spotImageSrc(spot.imageKey);
    return (
      '<div class="rainy-spot-photo">' +
      (imgSrc
        ? '<img src="' +
          imgSrc +
          '" alt="' +
          (spot.imageAlt || spot.title) +
          '" loading="lazy" data-image-key="' +
          spot.imageKey +
          '" data-fallback-idx="0" onerror="handleRainySpotImageError(this)">'
        : "") +
      '<span class="rainy-photo-caption">' +
      (spot.photoCaption || spot.area) +
      "</span></div>"
    );
  }

  function renderSpots(filter) {
    filter = filter || "all";
    var grid = document.getElementById("rainySpotGrid");
    if (!grid) return;
    grid.innerHTML = "";

    spots.forEach(function (spot, index) {
      if (filter !== "all" && spot.category.indexOf(filter) === -1) return;

      var card = document.createElement("article");
      card.className = "rainy-spot-card";

      card.innerHTML =
        renderSpotPhoto(spot) +
        '<div class="rainy-spot-top"><span class="rainy-spot-type">' +
        spot.type +
        '</span><h3 class="rainy-spot-title"><button type="button" class="rainy-spot-title-btn" data-spot-index="' +
        index +
        '">' +
        spot.title +
        '</button></h3><div class="rainy-spot-emoji">' +
        spot.emoji +
        "</div></div>" +
        '<div class="rainy-spot-body"><p>' +
        spot.summary +
        "</p>" +
        renderSpotRestaurantsPreview(spot) +
        '<div class="rainy-tags"><button type="button" class="rainy-tag rainy-tag--map" data-rainy-map="' +
        spot.title +
        '">📍 ' +
        spot.area +
        '</button><span class="rainy-tag">👶 ' +
        spot.age +
        '</span><span class="rainy-tag">⏱ ' +
        spot.stay +
        '</span></div><div class="rainy-spot-meta"><div><span class="rainy-meta-label">適合</span>' +
        spot.age +
        '</div><div><span class="rainy-meta-label">停留</span>' +
        spot.stay +
        '</div><div><span class="rainy-meta-label">雨勢</span>' +
        spot.weather +
        '</div></div><div class="rainy-spot-actions">' +
        '<button type="button" class="rainy-spot-action dark" data-spot-index="' +
        index +
        '">看詳細建議</button>' +
        '<a class="rainy-spot-action" href="' +
        spot.official +
        '" target="_blank" rel="noopener">官方</a>' +
        '<button type="button" class="rainy-spot-action" data-rainy-map="' +
        spot.title +
        '">地圖</button></div></div>';

      grid.appendChild(card);
    });

    grid.querySelectorAll("[data-spot-index]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openModal(parseInt(btn.getAttribute("data-spot-index"), 10));
      });
    });
  }

  function renderOfficialLinks() {
    var box = document.getElementById("rainyOfficialLinks");
    if (!box) return;
    box.innerHTML = officialLinks
      .map(function (pair) {
        return (
          '<a class="rainy-link-row" href="' +
          pair[1] +
          '" target="_blank" rel="noopener"><span>' +
          pair[0] +
          '</span><span>開啟</span></a>'
        );
      })
      .join("");
  }

  function openModal(index) {
    var spot = spots[index];
    if (!spot) return;
    document.getElementById("rainyModalTitle").textContent = spot.title;
    document.getElementById("rainyModalBody").innerHTML =
      "<p>" +
      spot.detail +
      "</p>" +
      "<h4>適合族群</h4><p>" +
      spot.age +
      "｜" +
      spot.type +
      '｜<button type="button" class="rainy-term-link" data-rainy-map="' +
      spot.title +
      '">' +
      spot.area +
      "</button></p>" +
      "<h4>建議停留時間</h4><p>" +
      spot.stay +
      "</p>" +
      "<h4>開放／營業時間</h4><p>" +
      (spot.hours || "出發前請查官方公告。") +
      "</p>" +
      "<h4>費用參考</h4><p>" +
      (spot.fee || "依官方或現場公告為準。") +
      "</p>" +
      "<h4>雨天判斷</h4><p>" +
      spot.weather +
      "</p>" +
      "<h4>亮點</h4><ul>" +
      spot.highlights.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("") +
      "</ul>" +
      renderRestaurantsHtml(spot) +
      "<h4>家長提醒</h4><p>" +
      spot.tips +
      '</p><p class="rainy-modal-note">以上開放時間、費用與餐廳資訊為整理參考，臨時休館、場次異動、票價與菜單請以官方或店家公告為準。</p><div class="rainy-modal-actions">' +
      '<a class="dark" href="' +
      spot.official +
      '" target="_blank" rel="noopener">官方網站</a>' +
      '<button type="button" class="rainy-modal-actions-btn" data-rainy-map="' +
      spot.title +
      '">站內看地圖</button></div>';

    var modal = document.getElementById("rainySpotModal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    syncRainyPageScrollLock();
  }

  function closeModal() {
    var modal = document.getElementById("rainySpotModal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    syncRainyPageScrollLock();
  }

  function showToast(text) {
    var toast = document.getElementById("rainyCopyToast");
    toast.textContent = text;
    toast.classList.add("is-show");
    setTimeout(function () {
      toast.classList.remove("is-show");
    }, 1800);
  }

  function copyShareText() {
    var el = document.getElementById("rainyShareText");
    var text = (el ? el.textContent.trim() : "") + "\n\n" + window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast("已複製分享文字");
      }).catch(function () {
        showToast("複製失敗，請手動選取文字");
      });
    } else {
      showToast("瀏覽器不支援自動複製");
    }
  }

  function findHourlyIndex(hourly, now) {
    if (!hourly || !hourly.time || !hourly.time.length) return -1;
    for (var i = 0; i < hourly.time.length; i++) {
      if (new Date(hourly.time[i]) >= now) return i;
    }
    return hourly.time.length - 1;
  }

  function fetchWithTimeout(url, ms) {
    ms = ms || 12000;
    if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") {
      return fetch(url, { signal: AbortSignal.timeout(ms) });
    }
    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () {
        reject(new Error("timeout"));
      }, ms);
      fetch(url)
        .then(function (res) {
          clearTimeout(timer);
          resolve(res);
        })
        .catch(function (err) {
          clearTimeout(timer);
          reject(err);
        });
    });
  }

  function rainyWeatherProxyUrl(lat, lon) {
    var base = String((global.BLOG_STATS_API || "")).replace(/\/api\/?$/, "");
    if (!base) return "";
    return (
      base +
      "/api/weather?latitude=" +
      encodeURIComponent(lat) +
      "&longitude=" +
      encodeURIComponent(lon)
    );
  }

  function buildRainyWeatherQuery(lat, lon) {
    return (
      "latitude=" +
      lat +
      "&longitude=" +
      lon +
      "&current=temperature_2m,apparent_temperature,weather_code&hourly=precipitation_probability,weather_code,temperature_2m&daily=weather_code,precipitation_probability_max,temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=Asia%2FTaipei"
    );
  }

  function fetchRainyWeather(lat, lon) {
    var query = buildRainyWeatherQuery(lat, lon);
    var directUrl = "https://api.open-meteo.com/v1/forecast?" + query;

    function readJson(res) {
      if (!res.ok) throw new Error("weather-http-" + res.status);
      return res.json();
    }

    return fetchWithTimeout(directUrl, 10000)
      .then(readJson)
      .catch(function () {
        var proxyUrl = rainyWeatherProxyUrl(lat, lon);
        if (!proxyUrl) throw new Error("weather-unavailable");
        return fetchWithTimeout(proxyUrl, 12000).then(readJson);
      });
  }

  function showWeatherError(status, adviceEl) {
    if (status) status.textContent = "讀取失敗";
    if (adviceEl) {
      adviceEl.textContent =
        "天氣資料暫時無法取得（第三方服務可能忙碌或網路受限）。請改點下方「中央氣象署」連結確認，或稍後再試。";
    }
    var desc = document.getElementById("rainyWeatherDesc");
    if (desc) desc.textContent = "天氣暫時無法讀取";
  }

  function applyRainyWeatherData(c, data, status) {
    var current = data.current || {};
    var hourly = data.hourly || {};
    var daily = data.daily || {};
    var now = new Date();
    var idx = findHourlyIndex(hourly, now);
    var pop = 0;
    if (idx >= 0 && hourly.precipitation_probability) {
      pop =
        hourly.precipitation_probability[idx] != null
          ? hourly.precipitation_probability[idx]
          : 0;
    }
    var code = current.weather_code != null ? current.weather_code : 0;
    var iconText = weatherCodeText(code);

    document.getElementById("rainyWeatherIcon").textContent = iconText[0];
    document.getElementById("rainyWeatherTemp").textContent =
      current.temperature_2m != null ? Math.round(current.temperature_2m) + "°" : "--°";
    document.getElementById("rainyWeatherDesc").textContent = c.name + "｜" + iconText[1];
    document.getElementById("rainyWeatherPop").textContent = pop + "%";
    document.getElementById("rainyWeatherFeel").textContent =
      current.apparent_temperature != null
        ? Math.round(current.apparent_temperature) + "°"
        : "--°";
    document.getElementById("rainyWeatherTime").textContent = current.time
      ? new Date(current.time).toLocaleTimeString("zh-TW", {
          hour: "2-digit",
          minute: "2-digit"
        })
      : "--";
    document.getElementById("rainyRainAdvice").textContent = rainAdvice(pop, code);
    if (status) status.textContent = "已更新";

    var hourlyBox = document.getElementById("rainyHourlyBox");
    if (hourlyBox && hourly.time && hourly.time.length) {
      hourlyBox.innerHTML = "";
      var start = idx >= 0 ? idx : 0;
      for (var i = 0; i < 4; i++) {
        var h = Math.min(start + i * 2, hourly.time.length - 1);
        var hour = new Date(hourly.time[h]).toLocaleTimeString("zh-TW", {
          hour: "2-digit",
          minute: "2-digit"
        });
        var hpop =
          hourly.precipitation_probability && hourly.precipitation_probability[h] != null
            ? hourly.precipitation_probability[h]
            : 0;
        var hcode =
          hourly.weather_code && hourly.weather_code[h] != null
            ? hourly.weather_code[h]
            : code;
        var hicon = weatherCodeText(hcode)[0];
        hourlyBox.innerHTML +=
          '<div class="rainy-hour">' + hour + " " + hicon + "<strong>降雨 " + hpop + "%</strong></div>";
      }
    }

    var weeklyBox = document.getElementById("rainyWeeklyBox");
    if (weeklyBox && daily.time) {
      weeklyBox.innerHTML = "";
      for (var d = 0; d < Math.min(7, daily.time.length); d++) {
        var day = new Date(daily.time[d]).toLocaleDateString("zh-TW", {
          weekday: "short",
          month: "numeric",
          day: "numeric"
        });
        var dpop =
          daily.precipitation_probability_max && daily.precipitation_probability_max[d] != null
            ? daily.precipitation_probability_max[d]
            : 0;
        var dcode =
          daily.weather_code && daily.weather_code[d] != null ? daily.weather_code[d] : code;
        var dicon = weatherCodeText(dcode)[0];
        var tmax =
          daily.temperature_2m_max && daily.temperature_2m_max[d] != null
            ? Math.round(daily.temperature_2m_max[d])
            : "--";
        var tmin =
          daily.temperature_2m_min && daily.temperature_2m_min[d] != null
            ? Math.round(daily.temperature_2m_min[d])
            : "--";
        weeklyBox.innerHTML +=
          '<div class="rainy-week"><span class="rainy-week-day">' +
          day +
          "</span><span>" +
          dicon +
          '</span><strong>降雨 ' +
          dpop +
          '%</strong><span class="rainy-week-temp">' +
          tmin +
          "–" +
          tmax +
          "°</span></div>";
      }
    }
  }

  function loadWeather() {
    var cityEl = document.getElementById("rainyWeatherCity");
    if (!cityEl) return;
    var key = cityEl.value;
    var c = coords[key];
    if (!c) return;

    var status = document.getElementById("rainyWeatherStatus");
    if (status) status.textContent = "更新中";

    var hint = document.getElementById("rainyWeatherHint");
    if (hint) hint.textContent = c.hint || "";

    fetchRainyWeather(c.lat, c.lon)
      .then(function (data) {
        if (!data || !data.current) throw new Error("weather-invalid");
        applyRainyWeatherData(c, data, status);
      })
      .catch(function () {
        showWeatherError(status, document.getElementById("rainyRainAdvice"));
      });
  }

  function bindRainyDelegatedActions(root) {
    (root || document).addEventListener("click", function (e) {
      var mapBtn = e.target.closest("[data-rainy-map]");
      if (mapBtn) {
        e.preventDefault();
        openMapModal(mapBtn.getAttribute("data-rainy-map"), mapBtn.getAttribute("data-rainy-map"));
        return;
      }
      var spotBtn = e.target.closest("[data-rainy-spot]");
      if (spotBtn) {
        e.preventDefault();
        openModal(parseInt(spotBtn.getAttribute("data-rainy-spot"), 10));
      }
    });
  }

  function initRainyFamilyArticle() {
    var modalClose = document.getElementById("rainyModalClose");
    var modal = document.getElementById("rainySpotModal");
    var mapClose = document.getElementById("rainyMapModalClose");
    var mapModal = document.getElementById("rainyMapModal");
    var cityEl = document.getElementById("rainyWeatherCity");
    var shareBtn = document.getElementById("rainyShareBtn");

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target.id === "rainySpotModal") closeModal();
      });
    }
    if (mapClose) mapClose.addEventListener("click", closeMapModal);
    if (mapModal) {
      mapModal.addEventListener("click", function (e) {
        if (e.target.id === "rainyMapModal") closeMapModal();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      closeMapModal();
      closeModal();
    });

    document.querySelectorAll(".rainy-filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".rainy-filter-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        renderSpots(btn.getAttribute("data-filter"));
      });
    });

    if (cityEl) cityEl.addEventListener("change", loadWeather);
    if (shareBtn) shareBtn.addEventListener("click", copyShareText);

    bindRainyDelegatedActions(document);
    syncRainyPageScrollLock();
    window.addEventListener("pageshow", syncRainyPageScrollLock);
    decorateRainyFaq();
    linkifyRainyFaq();
    renderSpots();
    renderOfficialLinks();
    loadWeather();
  }

  global.initRainyFamilyArticle = initRainyFamilyArticle;
})(typeof window !== "undefined" ? window : globalThis);
