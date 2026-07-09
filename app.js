const DOMAINS = [
  {
    id: "love",
    label: "感情",
    scope: "關係互動",
    action: "把真心、界線與承諾說清楚",
    caution: "忌把不安包裝成試探",
    lineFocus: "回應是否穩定"
  },
  {
    id: "career",
    label: "事業",
    scope: "職責、合作與升遷",
    action: "先釐清角色、資源與交付節點",
    caution: "忌只看聲勢而忽略責任歸屬",
    lineFocus: "權責是否對等"
  },
  {
    id: "wealth",
    label: "財運",
    scope: "收入、投資與現金流",
    action: "以可承受風險和保留現金為先",
    caution: "忌急利、重押與未驗證消息",
    lineFocus: "風險是否可控"
  },
  {
    id: "health",
    label: "健康",
    scope: "身心狀態與作息",
    action: "回到規律、檢查與可持續的照護",
    caution: "忌硬撐或自行忽略明顯不適",
    lineFocus: "壓力源是否已被處理"
  },
  {
    id: "study",
    label: "學業",
    scope: "考試、技能與長期學習",
    action: "拆小目標，固定複習與驗收",
    caution: "忌追求花俏方法而少了基本功",
    lineFocus: "基礎是否紮實"
  },
  {
    id: "people",
    label: "人際",
    scope: "朋友、同事與社群",
    action: "用事實建立信任，讓往來有分寸",
    caution: "忌過度迎合或捲入他人是非",
    lineFocus: "距離是否合宜"
  },
  {
    id: "home",
    label: "家宅",
    scope: "家庭、居住與內部秩序",
    action: "先安定家中節奏，再談外部變動",
    caution: "忌用情緒處理長期結構問題",
    lineFocus: "家中規矩是否清楚"
  },
  {
    id: "decision",
    label: "決策",
    scope: "選擇、方向與時機",
    action: "列出代價、退路與最小可行一步",
    caution: "忌把衝動當成天命",
    lineFocus: "時機是否成熟"
  }
];

const DOMAIN_SHARE_CODES = {
  love: "l",
  career: "c",
  wealth: "w",
  health: "h",
  study: "s",
  people: "p",
  home: "m",
  decision: "d"
};

const DOMAIN_ID_BY_SHARE_CODE = Object.fromEntries(
  Object.entries(DOMAIN_SHARE_CODES).map(([id, code]) => [code, id])
);

const ICONS = {
  love: '<path d="M20.8 4.6a5.4 5.4 0 0 0-7.7 0L12 5.7l-1.1-1.1a5.4 5.4 0 1 0-7.7 7.7L12 21l8.8-8.7a5.4 5.4 0 0 0 0-7.7Z"/>',
  career: '<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"/><path d="M4 7h16v12H4z"/><path d="M4 12h16"/><path d="M9 12v2h6v-2"/>',
  wealth: '<circle cx="12" cy="12" r="8"/><path d="M12 7v10M9 10c.5-1 1.5-1.5 3-1.5 1.8 0 3 1 3 2.3 0 1.5-1.2 2.2-3 2.2s-3 .7-3 2.2c0 1.3 1.2 2.3 3 2.3 1.5 0 2.5-.5 3-1.5"/>',
  health: '<path d="M12 3v18M3 12h18"/><path d="M7 7h10v10H7z"/>',
  study: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M8 7h8M8 11h7"/>',
  people: '<path d="M16 11a4 4 0 1 0-8 0"/><path d="M4 21a8 8 0 0 1 16 0"/><path d="M19 8a3 3 0 0 1 1 5.8"/><path d="M21 21a6 6 0 0 0-3.3-5.4"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  decision: '<circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-4 1 2-5 4-1Z"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>'
};

const TRIGRAMS = {
  "111": { name: "乾", image: "天", symbol: "☰", trait: "剛健" },
  "110": { name: "兌", image: "澤", symbol: "☱", trait: "悅納" },
  "101": { name: "離", image: "火", symbol: "☲", trait: "明麗" },
  "100": { name: "震", image: "雷", symbol: "☳", trait: "動發" },
  "011": { name: "巽", image: "風", symbol: "☴", trait: "入順" },
  "010": { name: "坎", image: "水", symbol: "☵", trait: "險陷" },
  "001": { name: "艮", image: "山", symbol: "☶", trait: "止定" },
  "000": { name: "坤", image: "地", symbol: "☷", trait: "承載" }
};

const HEX_PAIR_TO_NUMBER = {
  "111|111": 1,
  "111|110": 43,
  "111|101": 14,
  "111|100": 34,
  "111|011": 9,
  "111|010": 5,
  "111|001": 26,
  "111|000": 11,
  "110|111": 10,
  "110|110": 58,
  "110|101": 38,
  "110|100": 54,
  "110|011": 61,
  "110|010": 60,
  "110|001": 41,
  "110|000": 19,
  "101|111": 13,
  "101|110": 49,
  "101|101": 30,
  "101|100": 55,
  "101|011": 37,
  "101|010": 63,
  "101|001": 22,
  "101|000": 36,
  "100|111": 25,
  "100|110": 17,
  "100|101": 21,
  "100|100": 51,
  "100|011": 42,
  "100|010": 3,
  "100|001": 27,
  "100|000": 24,
  "011|111": 44,
  "011|110": 28,
  "011|101": 50,
  "011|100": 32,
  "011|011": 57,
  "011|010": 48,
  "011|001": 18,
  "011|000": 46,
  "010|111": 6,
  "010|110": 47,
  "010|101": 64,
  "010|100": 40,
  "010|011": 59,
  "010|010": 29,
  "010|001": 4,
  "010|000": 7,
  "001|111": 33,
  "001|110": 31,
  "001|101": 56,
  "001|100": 62,
  "001|011": 53,
  "001|010": 39,
  "001|001": 52,
  "001|000": 15,
  "000|111": 12,
  "000|110": 45,
  "000|101": 35,
  "000|100": 16,
  "000|011": 20,
  "000|010": 8,
  "000|001": 23,
  "000|000": 2
};

const HEXAGRAMS = [
  { no: 1, name: "乾為天", theme: "剛健創始", summary: "主動之氣充足，適合立志、開局、承擔領導。成敗看是否正大而持久。", action: "先立原則，再把力量分階段推出", caution: "忌逞強、獨斷與把速度誤認成格局", keywords: ["創始", "領導", "自強"] },
  { no: 2, name: "坤為地", theme: "承載順成", summary: "局勢重在接納、配合與厚實基礎。柔順不是退讓，而是讓萬事有可落之地。", action: "跟住可靠方向，穩住資源和人心", caution: "忌沒有主見，也忌急著證明自己", keywords: ["包容", "穩定", "跟進"] },
  { no: 3, name: "水雷屯", theme: "草創艱難", summary: "新局剛起，阻力與混亂同時出現。此時不是失敗，而是秩序尚未形成。", action: "先解最卡的一點，求助可信同伴", caution: "忌躁進、硬闖與一次想完成全局", keywords: ["開端", "困難", "結盟"] },
  { no: 4, name: "山水蒙", theme: "啟蒙求教", summary: "資訊未明，經驗不足，宜先學再判。能虛心受教，迷霧就會變成教材。", action: "找準老師、規則或參考標準", caution: "忌自作聰明、反覆試探同一問題", keywords: ["學習", "規範", "請益"] },
  { no: 5, name: "水天需", theme: "等待養勢", summary: "事情需要時間成熟。等待不是空耗，而是保留體力、備妥條件。", action: "守住節奏，備好方案與資源", caution: "忌焦慮催促，尤其忌在風險未明時出手", keywords: ["等待", "準備", "耐心"] },
  { no: 6, name: "天水訟", theme: "爭端辨明", summary: "分歧已成形，宜先釐清是非邊界。可談則談，必要時尋公正第三方。", action: "留下證據，把訴求說得簡短明確", caution: "忌意氣用事與把小爭執拖成大消耗", keywords: ["爭議", "界線", "公正"] },
  { no: 7, name: "地水師", theme: "組織紀律", summary: "眾力可用，但需有名分、規矩與統率。此卦利於整隊，不利於散漫。", action: "確認指揮、分工和底線", caution: "忌人多口雜、賞罰不明", keywords: ["團隊", "紀律", "統率"] },
  { no: 8, name: "水地比", theme: "親附結盟", summary: "事情靠連結而成，適合選邊、合作與建立互信。親近之前要看核心價值。", action: "靠近可信的人，明確彼此承諾", caution: "忌晚到、搖擺與只為利益結伴", keywords: ["結盟", "親近", "互信"] },
  { no: 9, name: "風天小畜", theme: "小蓄待發", summary: "力量已有，但外在條件還只容許小步累積。先把細節收好，勿求爆發。", action: "累積小成果，補齊流程與作品", caution: "忌貪大、逞快與忽略微小裂縫", keywords: ["蓄積", "細節", "小成"] },
  { no: 10, name: "天澤履", theme: "謹慎履行", summary: "身處有位階或風險的情境，禮節與分寸是護身符。行得正，就能過關。", action: "照規矩走，對上對下都保留敬意", caution: "忌踩線、挑釁權威與輕忽程序", keywords: ["分寸", "禮法", "踏實"] },
  { no: 11, name: "地天泰", theme: "通泰交融", summary: "上下相通，陰陽相交，局勢順暢。適合推動合作、擴張與修復。", action: "趁勢連結資源，把好局做成制度", caution: "忌得意忘形，順境更要防鬆散", keywords: ["通達", "和合", "開展"] },
  { no: 12, name: "天地否", theme: "閉塞不交", summary: "上下不通，理念與現實互不相應。此時宜守正蓄力，不宜強求理解。", action: "保留核心，減少無效溝通", caution: "忌硬推、抱怨與在錯誤場域求認同", keywords: ["閉塞", "守正", "隔絕"] },
  { no: 13, name: "天火同人", theme: "同道同行", summary: "以共同理念聚眾，可得人和。越是公開坦蕩，越能擴大支持。", action: "說清共同目標，讓合作透明", caution: "忌小圈子私心與口號大於實作", keywords: ["同盟", "公開", "理想"] },
  { no: 14, name: "火天大有", theme: "盛有光明", summary: "資源、能見度與成果在手。能謙恭用富，才是真正的大有。", action: "善用已有優勢，分配成果與責任", caution: "忌炫耀、浪費與忽略後續管理", keywords: ["豐盛", "資源", "責任"] },
  { no: 15, name: "地山謙", theme: "謙退受益", summary: "低身處世反而得助。此卦重在不爭虛名，讓實力自然被看見。", action: "把姿態放低，把品質做高", caution: "忌自卑，也忌假謙讓真計較", keywords: ["謙遜", "平衡", "受益"] },
  { no: 16, name: "雷地豫", theme: "預備喜悅", summary: "氣勢被喚起，適合動員、排程與鼓舞。喜悅要落在準備上才不散。", action: "先排節奏，再讓眾人跟上", caution: "忌沉迷期待、只喊熱情不做準備", keywords: ["動員", "預備", "喜悅"] },
  { no: 17, name: "澤雷隨", theme: "隨勢而行", summary: "順著可靠的人事流向前進。隨不是盲從，而是辨明何者值得跟。", action: "觀察主流節奏，選擇可信方向", caution: "忌失去原則、被情緒或潮流帶走", keywords: ["跟隨", "彈性", "選擇"] },
  { no: 18, name: "山風蠱", theme: "整弊修腐", summary: "舊問題已積成病根，不能再粉飾。修復需要面對原因，而非只換表面。", action: "盤點舊帳，重建規則與責任", caution: "忌拖延、推諉與只治標不治本", keywords: ["修整", "除弊", "更新"] },
  { no: 19, name: "地澤臨", theme: "親臨照看", summary: "好的機會正在靠近，也需要你親自靠近。用溫和而有力的方式掌握局面。", action: "主動關心關鍵人事，及早布局", caution: "忌居高臨下或熱度過後失守", keywords: ["靠近", "照看", "擴展"] },
  { no: 20, name: "風地觀", theme: "觀照取象", summary: "先看全局，再判吉凶。你被別人觀察，也正在觀察局勢。", action: "放慢判斷，收集可驗證訊號", caution: "忌只看表演、不看實質", keywords: ["觀察", "示範", "洞察"] },
  { no: 21, name: "火雷噬嗑", theme: "咬合決斷", summary: "中間有阻隔，需要明確處置。規則、裁決與執行力會打開僵局。", action: "切開問題，按規矩處理違失", caution: "忌含糊寬縱，也忌處罰過當", keywords: ["決斷", "規則", "清障"] },
  { no: 22, name: "山火賁", theme: "文飾成美", summary: "形象、禮貌與包裝能增光，但本質仍要站得住。美在適度，不在掩飾。", action: "修飾呈現方式，保留真材實料", caution: "忌過度包裝、只顧面子", keywords: ["修飾", "形象", "節度"] },
  { no: 23, name: "山地剝", theme: "剝落去舊", summary: "支撐正在脫落，不宜硬撐高處。先保根本，等待下個循環。", action: "縮小戰線，守住最核心的資源", caution: "忌戀棧、加碼與粉飾危機", keywords: ["剝落", "收縮", "保根"] },
  { no: 24, name: "地雷復", theme: "回返新生", summary: "陽氣初回，轉機很小但真實。適合重啟、復原與回到正路。", action: "從最小可持續的一步重新開始", caution: "忌急著擴大，初復之氣需要養", keywords: ["回復", "重啟", "正軌"] },
  { no: 25, name: "天雷無妄", theme: "真誠無妄", summary: "以真實動機行事則吉。越想操弄結果，越容易招來意外。", action: "照事實走，讓行動回到初心", caution: "忌妄念、僥倖與過度算計", keywords: ["真誠", "自然", "不妄"] },
  { no: 26, name: "山天大畜", theme: "大蓄養德", summary: "大能量被蓄住，適合修練、儲備與等待大用。先收束，後發力。", action: "沉澱實力，建立長期資產", caution: "忌急於證明，蓄而不養會成壓抑", keywords: ["積蓄", "修練", "大用"] },
  { no: 27, name: "山雷頤", theme: "養正慎言", summary: "此卦看入口之物與出口之言。養得正，身心與局勢都會穩。", action: "整理飲食、資訊與說話方式", caution: "忌亂吃、亂聽、亂承諾", keywords: ["養護", "言語", "節制"] },
  { no: 28, name: "澤風大過", theme: "重壓過梁", summary: "責任或情勢已超過常態承載。要補強結構，不可只靠意志。", action: "找支點、分擔重量、先救關鍵處", caution: "忌硬扛到斷裂，也忌假裝無事", keywords: ["超載", "支撐", "非常"] },
  { no: 29, name: "坎為水", theme: "重險習坎", summary: "險中有險，需靠熟練與誠信穿越。不要怕水深，要怕亂游。", action: "依流程前進，重複確認每一步", caution: "忌冒險、隱瞞與情緒化判斷", keywords: ["險阻", "練習", "誠信"] },
  { no: 30, name: "離為火", theme: "明照依附", summary: "光明需要所依，才不成飄火。適合展現、學習與看清真相。", action: "讓資訊透明，找到可依附的制度", caution: "忌情緒燃燒、只追求曝光", keywords: ["光明", "依附", "洞見"] },
  { no: 31, name: "澤山咸", theme: "感應相通", summary: "彼此有感，互相牽動。成事靠真切回應，不靠強迫。", action: "細聽對方訊號，用柔和方式靠近", caution: "忌操控、急於定義關係", keywords: ["感應", "吸引", "互動"] },
  { no: 32, name: "雷風恆", theme: "長久有常", summary: "貴在持續與守常。若方向正確，穩定比新鮮更有力。", action: "固定節奏，把承諾變成日常", caution: "忌三分鐘熱度，也忌僵化不調整", keywords: ["持久", "規律", "承諾"] },
  { no: 33, name: "天山遯", theme: "退避保全", summary: "退不是敗，而是保留主體性。遠離不利位置，才能再取先機。", action: "撤出消耗場，保留籌碼與尊嚴", caution: "忌戀戰、逞口舌與退得太晚", keywords: ["退避", "保全", "遠害"] },
  { no: 34, name: "雷天大壯", theme: "強盛守正", summary: "力量正盛，動作很容易放大結果。越有力量，越要守正。", action: "把氣勢用在正當目標與硬實力", caution: "忌仗勢、衝撞與勝利後失控", keywords: ["強盛", "正當", "節制"] },
  { no: 35, name: "火地晉", theme: "光明進升", summary: "能見度上升，適合呈現成果與爭取位置。進步來自穩定發光。", action: "公開成果，接住更多責任", caution: "忌急功近利與忽略背後支持者", keywords: ["進升", "榮耀", "呈現"] },
  { no: 36, name: "地火明夷", theme: "韜光護明", summary: "光被遮蔽，環境不利直接發亮。保護核心，低調穿過暗處。", action: "收斂鋒芒，保存證據與實力", caution: "忌硬碰、炫耀與把真心交給錯人", keywords: ["藏明", "保護", "暗處"] },
  { no: 37, name: "風火家人", theme: "內正外安", summary: "內部秩序決定外部成敗。角色清楚、言行有度，家與團隊就安。", action: "重整分工、規矩與照顧責任", caution: "忌情緒勒索、責任混亂", keywords: ["家道", "分工", "內修"] },
  { no: 38, name: "火澤睽", theme: "分歧求同", summary: "立場不同，但未必不能共事。小同可求，大同不可強。", action: "先找共同利益，保留差異空間", caution: "忌逼對方完全一致或擴大誤解", keywords: ["分歧", "差異", "小同"] },
  { no: 39, name: "水山蹇", theme: "阻難繞行", summary: "前方有阻，直走不利。求助、改道、等待，都是智慧。", action: "轉向可行路線，請教有經驗的人", caution: "忌逞強硬闖與把阻力看成羞辱", keywords: ["艱阻", "改道", "求援"] },
  { no: 40, name: "雷水解", theme: "解結釋壓", summary: "緊繃開始鬆動，適合解除誤會、清理壓力與重啟流動。", action: "先處理最急的結，再讓事情散開", caution: "忌解開後又重回舊模式", keywords: ["解除", "釋放", "緩和"] },
  { no: 41, name: "山澤損", theme: "減損成益", summary: "少一分浮華，多一分真用。願意取捨，反而讓核心變強。", action: "刪掉低效消耗，把資源給要處", caution: "忌小氣計較，也忌削弱根本", keywords: ["取捨", "減法", "聚焦"] },
  { no: 42, name: "風雷益", theme: "增益扶助", summary: "有外力或新資源進來，適合擴充、幫助與快速修正。", action: "把助力導入正途，立即回饋成果", caution: "忌貪多、分散與把好處視為理所當然", keywords: ["增益", "助力", "擴充"] },
  { no: 43, name: "澤天夬", theme: "決去陰滯", summary: "該決斷的事已到臨界。要公開、正直、果斷，但不宜粗暴。", action: "宣布界線，處理拖延已久的問題", caution: "忌私下報復、過度強硬", keywords: ["決斷", "宣告", "清除"] },
  { no: 44, name: "天風姤", theme: "偶遇慎始", summary: "突然而來的人事有吸引力，也有不穩定。初遇之時最要守界線。", action: "先觀察動機，不急著深度綁定", caution: "忌被新鮮感牽走或輕許承諾", keywords: ["相遇", "誘惑", "界線"] },
  { no: 45, name: "澤地萃", theme: "聚眾成勢", summary: "人與資源正在聚合。要讓聚合有中心，否則熱鬧會散。", action: "建立共同儀式、規則與分配方式", caution: "忌只求人氣，不管品質與秩序", keywords: ["聚集", "中心", "資源"] },
  { no: 46, name: "地風升", theme: "循序上升", summary: "上升之路可行，但要一步一步。柔順進取，能得長輩或制度扶持。", action: "按階段累積資歷，向上請益", caution: "忌跳級貪快與基礎未穩就求高位", keywords: ["升進", "累積", "扶持"] },
  { no: 47, name: "澤水困", theme: "困中守志", summary: "外在受限，言語未必被聽見。守住內在價值，等待出口。", action: "節省力氣，處理可控制的核心", caution: "忌自暴自棄與用抱怨耗盡信任", keywords: ["困境", "守志", "節力"] },
  { no: 48, name: "水風井", theme: "井養不竭", summary: "真正的資源在深處，宜修井、養人、建立長久可用的系統。", action: "修復基礎設施，讓資源穩定供給", caution: "忌只換外觀，不清井泥", keywords: ["滋養", "系統", "根源"] },
  { no: 49, name: "澤火革", theme: "革故鼎新", summary: "舊制度已不合時宜，改革有其必要。成功靠時機、信任與明確宣告。", action: "先取得共識，再分階段改制", caution: "忌為反而反，或在時機未熟時硬改", keywords: ["改革", "更替", "時機"] },
  { no: 50, name: "火風鼎", theme: "鼎新成器", summary: "資源可被烹煉成新格局。此卦利於成就作品、制度與名器。", action: "整合人才與資源，做出可傳承成果", caution: "忌材料雜亂、權責不明", keywords: ["成器", "整合", "傳承"] },
  { no: 51, name: "震為雷", theme: "震動警醒", summary: "突發之事令人驚醒。先穩住心神，再把震動轉成行動訊號。", action: "快速確認安全與優先順序", caution: "忌驚慌失措或為求刺激反覆冒進", keywords: ["震動", "警醒", "啟動"] },
  { no: 52, name: "艮為山", theme: "止定守界", summary: "該停就停，止於其所。定下來，才看得見下一步在哪裡。", action: "暫停擴張，整理界線與身心", caution: "忌固執不動，也忌明知該停仍硬走", keywords: ["止步", "安定", "界線"] },
  { no: 53, name: "風山漸", theme: "漸進成禮", summary: "進展慢而有序，適合長期培養。越守禮節，越能走遠。", action: "按階段承諾，讓成果自然成熟", caution: "忌跳步、催熟與越界", keywords: ["漸進", "禮序", "成熟"] },
  { no: 54, name: "雷澤歸妹", theme: "位不正而合", summary: "關係或安排有吸引力，但名分與位置不穩。先看是否正當。", action: "確認身份、承諾與後果", caution: "忌被一時熱情拉進不對等關係", keywords: ["名分", "不正", "慎合"] },
  { no: 55, name: "雷火豐", theme: "豐盛當午", summary: "光與勢都在高點，適合把握當下。盛極易轉，故需明快收整。", action: "趁勢完成關鍵任務，留下紀錄", caution: "忌沉迷熱鬧、忽視高峰後的安排", keywords: ["高峰", "豐盛", "明快"] },
  { no: 56, name: "火山旅", theme: "旅居守分", summary: "身在外地或不熟悉的場域，宜守分、簡明、少糾纏。", action: "輕裝前進，尊重當地規則", caution: "忌久戀客位、過度介入他人地盤", keywords: ["旅途", "暫居", "守分"] },
  { no: 57, name: "巽為風", theme: "柔入滲透", summary: "柔和、持續、深入的力量勝過強攻。適合溝通、布局與細水長流。", action: "用小而穩的方式反覆滲透", caution: "忌優柔寡斷、沒有底線", keywords: ["入順", "溝通", "持續"] },
  { no: 58, name: "兌為澤", theme: "悅納交流", summary: "喜悅、交流與互惠帶來開口。說得好聽，也要說得真誠。", action: "用愉悅氣氛促成合作與和解", caution: "忌甜言、放縱與只求表面開心", keywords: ["喜悅", "交流", "互惠"] },
  { no: 59, name: "風水渙", theme: "渙散化結", summary: "僵硬開始散開，適合化解隔閡、疏通卡住的情緒與制度。", action: "打開溝通渠道，重新聚焦共同核心", caution: "忌散而無收，問題化開後要重立中心", keywords: ["疏散", "化解", "重聚"] },
  { no: 60, name: "水澤節", theme: "節制立度", summary: "界線、制度與限額能保護長久。節不是限制生命，而是讓生命不耗竭。", action: "設定規則、預算、時間與可接受範圍", caution: "忌過度苛刻，也忌毫無節制", keywords: ["節制", "界線", "制度"] },
  { no: 61, name: "風澤中孚", theme: "誠信感通", summary: "真誠能穿透隔閡。此卦重在心口一致，信任因此形成。", action: "用透明承諾換取長期信任", caution: "忌口惠而實不至、表忠心無行動", keywords: ["誠信", "感通", "信任"] },
  { no: 62, name: "雷山小過", theme: "小過慎微", summary: "小事可過，大事不可逞。低飛、謹慎、照看細節，反而能避禍。", action: "把標準放在細節，不求大幅躍進", caution: "忌高調冒進與把小勝擴成大賭", keywords: ["小事", "謹慎", "低飛"] },
  { no: 63, name: "水火既濟", theme: "既成防亂", summary: "事情已成或將成，最要防完成後失序。收尾比開局更重要。", action: "整理交接、驗收與後續維護", caution: "忌以為完成就不用管理", keywords: ["完成", "收尾", "防亂"] },
  { no: 64, name: "火水未濟", theme: "未成待渡", summary: "尚未完成，火水未交。關鍵在最後一段路，需謹慎校準。", action: "補齊缺口，確認順序後再跨越", caution: "忌臨門一腳鬆懈或急著宣告成功", keywords: ["未成", "校準", "待渡"] }
];

const LINE_STAGES = [
  { name: "初爻", place: "根基初動", advice: "先校準動機與第一步" },
  { name: "二爻", place: "內位成形", advice: "把可行之事穩定做出來" },
  { name: "三爻", place: "進退交界", advice: "看清風險，不在壓力中逞強" },
  { name: "四爻", place: "近外應變", advice: "處理協調、授權與外部關係" },
  { name: "五爻", place: "主位當中", advice: "用正當方式承擔決策" },
  { name: "上爻", place: "事極將變", advice: "收束過度，準備轉換階段" }
];

const LINE_VALUE = {
  6: { label: "老陰", nature: "陰極轉陽", moving: true },
  7: { label: "少陽", nature: "陽定不變", moving: false },
  8: { label: "少陰", nature: "陰定不變", moving: false },
  9: { label: "老陽", nature: "陽極轉陰", moving: true }
};

const DOMAIN_READING_RULES = {
  love: {
    lens: "看彼此回應、信任、界線與承諾是否對得上",
    core: "不要只問有沒有緣分，要看相處中誰在靠近、誰在退後，以及關係能不能被清楚安放",
    action: "先用一句真話確認對方態度，再看行動是否跟得上",
    caution: "不要把焦慮當直覺，也不要用試探換安全感",
    lineLens: "關係位置",
    noMoving: "感情無動爻時，局勢多半不是立刻翻盤，而是要看現有互動能不能持續穩住"
  },
  career: {
    lens: "看職責、資源、上司同事、交付成果與升遷時機",
    core: "不要只看機會大不大，要看權責是否對等，資源是否到位，做了之後誰承擔結果",
    action: "把目標、期限、責任與可交付成果先寫清楚",
    caution: "不要被聲勢或人情推著走，職場最怕權責模糊",
    lineLens: "職場位置",
    noMoving: "事業無動爻時，先守住目前節奏，把基本盤做穩，再等更明確的外部訊號"
  },
  wealth: {
    lens: "看現金流、成本、風險、回收速度與可承受損失",
    core: "財運不是只看會不會賺，而是看這筆財是否穩、能不能收回、風險是不是被看見",
    action: "先算最壞情況與回收時間，再決定投入多少",
    caution: "不要急利、重押、借錢追高，也不要相信沒有驗證的消息",
    lineLens: "財務節點",
    noMoving: "財運無動爻時，先守財與整理帳務，短期不宜為了刺激而加大風險"
  },
  health: {
    lens: "看壓力來源、作息節奏、身體警訊與可持續照護",
    core: "健康卦不替代診斷，而是提醒你哪裡過度消耗，該先恢復秩序",
    action: "把睡眠、飲食、檢查與減壓排成可執行的小步驟",
    caution: "不要硬撐，也不要把卦象當成醫療判斷",
    lineLens: "身心層次",
    noMoving: "健康無動爻時，重點在穩定日常，不宜忽略已經反覆出現的小警訊"
  },
  study: {
    lens: "看基礎、方法、考期、專注力與是否有正確老師",
    core: "學業成敗不只看聰明，而是看有沒有把基本功拆小、反覆驗收",
    action: "把目標拆成今日可完成的題量、章節或練習",
    caution: "不要一直換方法，卻沒有累積足夠練習",
    lineLens: "學習階段",
    noMoving: "學業無動爻時，代表路線暫時不必大改，重點是把原本該做的練熟"
  },
  people: {
    lens: "看信任、距離、利益牽連、話語分寸與是否值得往來",
    core: "人際不是看誰對誰錯而已，要看這段往來會讓你更穩，還是更消耗",
    action: "先用事實和界線說話，不急著討好或翻臉",
    caution: "不要被情緒、八卦或義氣拉進別人的局",
    lineLens: "人際距離",
    noMoving: "人際無動爻時，先維持禮貌距離，不必急著把關係推近或切斷"
  },
  home: {
    lens: "看家庭角色、居住秩序、長輩晚輩、內部規矩與安全感",
    core: "家宅之問重在內部是否安定，誰的責任不清、誰的情緒被壓住，都會影響外部運勢",
    action: "先整理家中規矩、金錢分工與照顧責任",
    caution: "不要用情緒處理長期結構問題，也不要讓沉默變成默許",
    lineLens: "家中位置",
    noMoving: "家宅無動爻時，先安內，不急著大搬動或大改變"
  },
  decision: {
    lens: "看時機、代價、退路、風險承擔與第一步是否可逆",
    core: "決策不是問哪個選項一定贏，而是看哪個方向代價可承受、退路清楚、能逐步驗證",
    action: "先做最小可行一步，保留退路，再用結果修正方向",
    caution: "不要把衝動當天命，也不要因為害怕而永遠不選",
    lineLens: "決策關卡",
    noMoving: "決策無動爻時，表示暫時先按現有資訊穩定推進，不宜突然翻桌重來"
  }
};

const FREE_DAILY_AI_LIMIT = 3;
const MEMBER_STORAGE_KEY = "iching-member";
const DAILY_ZODIAC_SIGNS = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];
const DAILY_DIRECTIONS = [
  "正北", "北偏東", "東北", "東北偏東", "正東", "東偏南",
  "東南", "東南偏南", "正南", "南偏西", "西南", "西南偏西",
  "正西", "西偏北", "西北", "西北偏北", "北方明位", "東方生位",
  "南方旺位", "西方收位", "東北財門", "東南文昌", "西南貴位", "西北資源位"
];
const DAILY_COLORS = [
  "金色", "翡翠綠", "米白", "湖水藍", "朱紅", "墨黑",
  "暖橘", "銀灰", "茶褐", "青碧", "紫檀", "珍珠白",
  "琥珀黃", "孔雀藍", "松石綠", "玫瑰金", "霧灰", "靛藍",
  "月白", "胭脂紅", "檀木棕", "薄荷綠", "香檳金", "玄青"
];
const DAILY_HOURS = [
  "子時 23:00-01:00",
  "丑時 01:00-03:00",
  "寅時 03:00-05:00",
  "卯時 05:00-07:00",
  "辰時 07:00-09:00",
  "巳時 09:00-11:00",
  "午時 11:00-13:00",
  "未時 13:00-15:00",
  "申時 15:00-17:00",
  "酉時 17:00-19:00",
  "戌時 19:00-21:00",
  "亥時 21:00-23:00"
];
const DAILY_WEALTH_FLOWS = [
  "正財穩中有進，適合整理帳務與確認應收款",
  "偏財訊號較明顯，但宜小額試水，不宜貪快",
  "人脈帶財，適合請教前輩或主動交換資源",
  "合作運轉強，談條件時先抓清楚分工與比例",
  "財氣藏在細節，適合檢查合約、報價與成本",
  "流動財較旺，適合處理銷售、曝光與客戶回訪",
  "守財比衝財更有利，先把不必要支出收斂",
  "學習帶財，今天適合研究工具、課程與新方法",
  "舊案回溫有機會，適合追蹤曾經談過的合作",
  "現金流需要看緊，先確認進出款時間再承諾",
  "口碑能帶來財氣，把服務細節做好比硬推更有效",
  "靈感容易變收入，適合記下點子並快速做小測試",
  "貴人財偏旺，適合提出具體需求而不是只閒聊",
  "整理庫存與閒置資源，容易找到可變現的空間",
  "談判運可用，適合重談費用、期限或合作條件",
  "穩定客源是重點，今天宜把熟客關係顧好",
  "遠方資訊帶財，留意外縣市、海外或網路機會",
  "技術財走強，越專業越容易取得信任",
  "家庭與店面開銷需盤點，節流會比開源更快見效",
  "內容曝光有利，適合發布作品、案例或今日提醒",
  "時間管理就是財運，排程越清楚越不容易漏財",
  "適合修正定價，別把專業賣得太便宜",
  "小額回饋能換大信任，適合做熟客互動",
  "資料與名單是財庫，今天適合整理客戶資訊"
];
const DAILY_ACTIONS = [
  "先收尾再開新局",
  "把錢花在能累積的地方",
  "主動聯絡沉睡客戶",
  "用數字檢查直覺",
  "先談價值再談價格",
  "保留一點現金彈性",
  "把小機會做成穩定流程",
  "適合低調布局",
  "把待確認事項寫成清單",
  "先做一個可驗證的小版本",
  "把報價與交付範圍說清楚",
  "回覆重要訊息不要拖過今天",
  "把曝光內容排程出去",
  "整理帳本與固定支出",
  "向可信任的人請益",
  "把手上資源重新分類",
  "先問需求再提出方案",
  "用一件小成果建立信任",
  "把合作流程留成文字",
  "今天適合做溫和加價",
  "先穩住主業現金流",
  "把時間留給高價值任務",
  "主動確認款項與發票",
  "把舊素材改成新貼文"
];
const DAILY_CAUTIONS = [
  "避免情緒性消費",
  "不要聽到明牌就重押",
  "口頭承諾要留下紀錄",
  "不要為了面子多花錢",
  "合夥帳目要算清楚",
  "避免臨時改價",
  "別急著答應不熟的邀約",
  "不要把時間成本看太低",
  "別把短期熱度當成長期收入",
  "不要替別人的風險背書",
  "避免一次承接太多零碎任務",
  "不要把私人情緒帶進談判",
  "先確認付款條件再開工",
  "別因小便宜忽略品質",
  "不要過度承諾交期",
  "避免把現金卡在庫存裡",
  "不要只看營收，成本也要算",
  "別在資訊不足時做大決定",
  "不要讓人情模糊界線",
  "避免衝動升級昂貴工具",
  "不要拖延該收的款項",
  "別把重要資料只放在腦中",
  "避免為了趕快成交而降太多",
  "不要忽略睡眠造成的判斷偏差"
];
const DAILY_OPENINGS = [
  "先穩後進，財氣在耐心裡成形",
  "小財先動，大財後至",
  "貴人與資訊同時重要",
  "適合整理資源，讓錢流回正軌",
  "宜守中帶攻，忌貪快冒進",
  "曝光有利，行動要精準",
  "財從秩序中來，越清楚越有利",
  "今日適合修正策略，不宜硬衝",
  "先聚焦一件事，財氣自然不散",
  "信任是今日財門，承諾要說到做到",
  "舊資源有新用法，別急著另起爐灶",
  "細水長流勝過一時暴衝",
  "貴人藏在日常對話裡，主動但不強求",
  "先盤點，再出手，今日宜用腦勝過用力",
  "把混亂收束，錢就比較留得住",
  "適合做長線安排，短利不必追太急"
];
const DAILY_THEMES = [
  { title: "招財日", focus: "適合主動開口、開發客源與提出合作", advice: "先把價值說清楚，再談金額會更順" },
  { title: "守財日", focus: "適合整理帳務、控管支出與檢查現金流", advice: "今天少一筆浪費，就是多一分底氣" },
  { title: "貴人日", focus: "適合請益、轉介紹、經營熟人與合作關係", advice: "需求越具體，別人越容易幫得上忙" },
  { title: "開源日", focus: "適合上架服務、發布內容與測試新收入", advice: "先小規模試行，不急著一次做滿" },
  { title: "避險日", focus: "適合檢查條款、風險、承諾與付款細節", advice: "把醜話說在前面，後面反而更好走" },
  { title: "整備日", focus: "適合歸檔、排程、整理素材與優化流程", advice: "看起來慢，其實是在替下一波加速" },
  { title: "曝光日", focus: "適合發文、直播、作品展示與社群互動", advice: "不要只求熱鬧，要讓人知道你能解決什麼" },
  { title: "談判日", focus: "適合談價格、談分工、談權責與談期限", advice: "柔和但堅定，界線清楚才有好合作" },
  { title: "回收日", focus: "適合收款、追蹤舊案、喚醒名單與回訪", advice: "財氣未必在新地方，也可能在舊關係裡" },
  { title: "學習日", focus: "適合研究工具、補足技能與吸收新方法", advice: "今天學到的省力方式，之後會變成收入差距" },
  { title: "定價日", focus: "適合檢查報價、商品組合與成本結構", advice: "不要只算價格，也要算時間與精神成本" },
  { title: "蓄勢日", focus: "適合低調布局、建立清單與等待成熟時機", advice: "不必急著被看見，先把準備做到位" }
];
const DAILY_HASHTAGS = ["#玄卦堂", "#今日生肖運勢", "#財運方位", "#易經占卜", "#奇幻文創"];

const state = {
  selectedDomain: "career",
  libraryDomain: "career",
  installPrompt: null,
  lastReading: null,
  isCasting: false,
  aiMessages: [],
  isAiBusy: false,
  member: null
};

const $ = (selector) => document.querySelector(selector);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HEXAGRAM_BY_NO = Object.fromEntries(HEXAGRAMS.map((hex) => [hex.no, hex]));
const HEX_DETAIL_BY_NO = {};

for (const [pair, no] of Object.entries(HEX_PAIR_TO_NUMBER)) {
  const [lower, upper] = pair.split("|");
  HEX_DETAIL_BY_NO[no] = {
    upper,
    lower,
    lines: [...lower, ...upper].map(Number)
  };
}

function svgIcon(id) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[id]}</svg>`;
}

function randomInt(min, max) {
  const range = max - min + 1;
  if (window.crypto?.getRandomValues) {
    const values = new Uint32Array(1);
    const limit = Math.floor(0xffffffff / range) * range;
    let value;
    do {
      window.crypto.getRandomValues(values);
      value = values[0];
    } while (value >= limit);
    return min + (value % range);
  }
  return Math.floor(Math.random() * range) + min;
}

function countByFour(stalks) {
  if (stalks === 0) return 0;
  return stalks % 4 || 4;
}

function yarrowChange(total) {
  const right = randomInt(1, total - 1);
  const left = total - right;
  const rightAfterHold = right - 1;
  const leftRemainder = countByFour(left);
  const rightRemainder = countByFour(rightAfterHold);
  const removed = 1 + leftRemainder + rightRemainder;
  return {
    start: total,
    left,
    right,
    held: 1,
    leftRemainder,
    rightRemainder,
    removed,
    remain: total - removed
  };
}

function castYarrowLine(position) {
  let total = 49;
  const changes = [];
  for (let i = 0; i < 3; i += 1) {
    const change = yarrowChange(total);
    changes.push(change);
    total = change.remain;
  }
  return {
    position,
    value: total / 4,
    changes
  };
}

function castReading(question, domainId) {
  const castLines = Array.from({ length: 6 }, (_, index) => castYarrowLine(index + 1));
  const primaryLines = castLines.map((line) => (line.value === 7 || line.value === 9 ? 1 : 0));
  const changedLines = castLines.map((line, index) => {
    if (line.value === 6) return 1;
    if (line.value === 9) return 0;
    return primaryLines[index];
  });
  const primaryNo = numberFromLines(primaryLines);
  const changedNo = numberFromLines(changedLines);
  const moving = castLines.filter((line) => LINE_VALUE[line.value].moving).map((line) => line.position);
  return {
    id: window.crypto?.randomUUID?.() || String(Date.now()),
    createdAt: new Date().toISOString(),
    question,
    domainId,
    castLines,
    primaryLines,
    changedLines,
    primaryNo,
    changedNo,
    moving
  };
}

async function castReadingAnimated(question, domainId) {
  const castLines = [];
  const startedAt = Date.now();
  showCastingPanel(question, domainId);
  await sleep(520);

  for (let lineIndex = 0; lineIndex < 6; lineIndex += 1) {
    let total = 49;
    const changes = [];
    const position = lineIndex + 1;
    updateCastingLineProgress(castLines, position);
    setCastingCopy(
      `第 ${position} 爻 · ${LINE_STAGES[lineIndex].name}`,
      "取四十九策，分二象天地，掛一象人。"
    );

    for (let changeIndex = 0; changeIndex < 3; changeIndex += 1) {
      const change = yarrowChange(total);
      changes.push(change);
      updateCastingChange(position, changeIndex + 1, change, total);
      total = change.remain;
      await sleep(680);
    }

    const line = {
      position,
      value: total / 4,
      changes
    };
    castLines.push(line);
    updateCastingLineProgress(castLines, position + 1);
    appendCastingLog(
      LINE_STAGES[lineIndex].name,
      `${line.value} ${LINE_VALUE[line.value].label}`,
      LINE_VALUE[line.value].nature
    );
    await sleep(360);
  }

  const primaryLines = castLines.map((line) => (line.value === 7 || line.value === 9 ? 1 : 0));
  const changedLines = castLines.map((line, index) => {
    if (line.value === 6) return 1;
    if (line.value === 9) return 0;
    return primaryLines[index];
  });
  const primaryNo = numberFromLines(primaryLines);
  const changedNo = numberFromLines(changedLines);
  const moving = castLines.filter((line) => LINE_VALUE[line.value].moving).map((line) => line.position);
  const elapsed = Date.now() - startedAt;
  if (elapsed < 12000) await sleep(12000 - elapsed);

  setCastingCopy("六爻已成", "本卦、動爻與變卦已定，正在開卦解象。");
  await sleep(650);

  return {
    id: window.crypto?.randomUUID?.() || String(Date.now()),
    createdAt: new Date().toISOString(),
    question,
    domainId,
    castLines,
    primaryLines,
    changedLines,
    primaryNo,
    changedNo,
    moving
  };
}

function showCastingPanel(question, domainId) {
  const panel = $("#castingOverlay");
  panel.hidden = false;
  $("#result").hidden = true;
  $("#castingPhase").textContent = `${domainById(domainId).label} · 籌策起卦`;
  $("#castingTitle").textContent = "五十策用四十九";
  $("#castingText").textContent = question
    ? `所問：「${question}」。請稍候，正在依籌策法逐爻推演。`
    : "未填問題也可起卦。請稍候，正在依籌策法逐爻推演。";
  $("#castingLog").innerHTML = "";
  setCastingCounts("--", "--", "--", "--");
  renderStalkField();
  updateCastingLineProgress([], 1);
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideCastingPanel() {
  $("#castingOverlay").hidden = true;
}

function setCastingCopy(title, text) {
  $("#castingTitle").textContent = title;
  $("#castingText").textContent = text;
}

function setCastingCounts(left, right, held, removed) {
  $("#leftCount").textContent = left;
  $("#rightCount").textContent = right;
  $("#heldCount").textContent = held;
  $("#removedCount").textContent = removed;
}

function updateCastingChange(position, changeNo, change, startTotal) {
  const leftActive = change.left - change.leftRemainder;
  const rightActive = change.right - change.held - change.rightRemainder;
  setCastingCopy(
    `第 ${position} 爻 · 第 ${changeNo} 變`,
    `由 ${startTotal} 策分二，左 ${change.left}、右 ${change.right}；掛一後揲四，歸奇 ${change.removed}，餘 ${change.remain}。`
  );
  setCastingCounts(change.left, change.right, change.held, change.removed);
  renderStalkField({
    left: Math.max(0, leftActive),
    right: Math.max(0, rightActive),
    held: change.held,
    removed: change.leftRemainder + change.rightRemainder
  });
  appendCastingLog(
    `第 ${position} 爻`,
    `第 ${changeNo} 變`,
    `${startTotal} 去 ${change.removed} 留 ${change.remain}`
  );
}

function renderStalkField(groups = { left: 24, right: 24, held: 1, removed: 0 }) {
  const field = $("#stalkField");
  const statuses = [
    ...Array.from({ length: groups.left }, () => "left"),
    ...Array.from({ length: groups.held }, () => "held"),
    ...Array.from({ length: groups.right }, () => "right"),
    ...Array.from({ length: groups.removed }, () => "removed")
  ].slice(0, 49);

  while (statuses.length < 49) statuses.push("removed");

  field.innerHTML = statuses
    .map((status, index) => {
      const tilt = ((index % 9) - 4) * 2.4;
      return `<span class="stalk ${status}" style="--tilt:${tilt}deg"></span>`;
    })
    .join("");
}

function updateCastingLineProgress(castLines, activePosition) {
  const lineMap = new Map(castLines.map((line) => [line.position, line]));
  $("#lineProgress").innerHTML = LINE_STAGES.map((stage, index) => {
    const position = index + 1;
    const line = lineMap.get(position);
    const classes = ["line-slot"];
    if (line) classes.push("complete");
    if (!line && position === activePosition) classes.push("active");
    const miniLine = line
      ? `<span class="mini-line ${line.value === 7 || line.value === 9 ? "yang" : "yin"}"></span>`
      : '<span class="mini-line yang" style="opacity:.18"></span>';
    return `
      <div class="${classes.join(" ")}">
        <strong>${stage.name}</strong>
        <small>${line ? `${line.value} ${LINE_VALUE[line.value].label}` : stage.place}</small>
        ${miniLine}
      </div>
    `;
  }).join("");
}

function appendCastingLog(title, value, detail) {
  const log = $("#castingLog");
  const entry = document.createElement("div");
  entry.className = "casting-entry";
  entry.innerHTML = `<strong>${title}</strong><span>${value}</span><small>${detail}</small>`;
  log.append(entry);
  while (log.children.length > 10) log.firstElementChild.remove();
  log.scrollTop = log.scrollHeight;
}

function numberFromLines(lines) {
  const lower = lines.slice(0, 3).join("");
  const upper = lines.slice(3, 6).join("");
  return HEX_PAIR_TO_NUMBER[`${lower}|${upper}`];
}

function legacyNumberFromLines(lines) {
  const lower = lines.slice(0, 3).join("");
  const upper = lines.slice(3, 6).join("");
  return HEX_PAIR_TO_NUMBER[`${upper}|${lower}`];
}

function trigramText(lines) {
  const lower = lines.slice(0, 3).join("");
  const upper = lines.slice(3, 6).join("");
  const lowerTri = TRIGRAMS[lower];
  const upperTri = TRIGRAMS[upper];
  return {
    upper,
    lower,
    label: `上卦 ${upperTri.name}${upperTri.image} · 下卦 ${lowerTri.name}${lowerTri.image}`,
    pair: `${upperTri.image}${lowerTri.image}`
  };
}

function domainById(id) {
  return DOMAINS.find((domain) => domain.id === id) || DOMAINS[0];
}

function domainRule(domainId) {
  return DOMAIN_READING_RULES[domainId] || DOMAIN_READING_RULES.career;
}

function getDomainReading(hex, domainId) {
  const domain = domainById(domainId);
  const rule = domainRule(domainId);
  return `以「${domain.scope}」看 ${hex.name}，不是只看卦名吉凶，而是${rule.lens}。本卦主題是「${hex.theme}」，落到${domain.label}時，重點變成：${rule.core}。可用「${hex.keywords.join("、")}」判斷這件事目前的深淺。`;
}

function getActionReading(hex, domainId) {
  const domain = domainById(domainId);
  const rule = domainRule(domainId);
  const healthNote = domainId === "health" ? "若有明顯不適，仍以專業檢查為準；" : "";
  return `${healthNote}${rule.action}。套入本卦，重點是${hex.action}；再接上「${domain.action}」。先做一個小而明確的行動，再觀察對方、環境或身體的回應。`;
}

function getCautionReading(hex, domainId) {
  const domain = domainById(domainId);
  const rule = domainRule(domainId);
  return `${rule.caution}；本卦特別忌「${hex.caution}」。同時也要記住：${domain.caution}。若局勢不回應，先縮小問題，不要把全部籌碼押上。`;
}

function getDomainSnippet(hex, domainId) {
  const domain = domainById(domainId);
  const rule = domainRule(domainId);
  return `${domain.label}看「${hex.theme}」：${rule.lens}，宜${hex.action}。`;
}

function movingLineInsight(line, hex, domain) {
  const rule = domainRule(domain.id);
  const stage = LINE_STAGES[line.position - 1];
  const value = LINE_VALUE[line.value];
  const turn = line.value === 9
    ? "老陽表示這股力量已到高點，接下來要收斂、轉向或避免過度"
    : "老陰表示原本隱伏的問題開始浮出，可以用柔中帶剛的方式處理";
  const focus = `${rule.lineLens}：${stage.place}`;
  const text = `${value.nature}，${turn}。在${domain.label}之問，這一爻先看「${focus}」，也就是${domain.lineFocus}是否已經出現變化。宜${stage.advice}，並把「${hex.action}」落到可執行的一步。`;
  return {
    title: `${stage.name} · ${value.label} · ${focus}`,
    text
  };
}

function makeHexagramMark(lines, moving = []) {
  const movingSet = new Set(moving);
  return lines
    .map((isYang, index) => ({ isYang, position: index + 1 }))
    .reverse()
    .map(({ isYang, position }) => {
      const classes = ["hex-line", isYang ? "yang" : "yin"];
      if (movingSet.has(position)) classes.push("moving");
      return `<span class="${classes.join(" ")}" title="第 ${position} 爻"></span>`;
    })
    .join("");
}

function renderDomains() {
  const grid = $("#domainGrid");
  grid.innerHTML = DOMAINS.map((domain) => {
    const checked = domain.id === state.selectedDomain ? "true" : "false";
    return `<button class="domain-choice" type="button" role="radio" aria-checked="${checked}" data-domain="${domain.id}">${svgIcon(domain.id)}<span>${domain.label}</span></button>`;
  }).join("");

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-domain]");
    if (!button) return;
    state.selectedDomain = button.dataset.domain;
    grid.querySelectorAll("[data-domain]").forEach((item) => {
      item.setAttribute("aria-checked", String(item === button));
    });
  });

  const miniTabs = $("#libraryDomains");
  miniTabs.innerHTML = DOMAINS.map((domain) => {
    const pressed = domain.id === state.libraryDomain ? "true" : "false";
    return `<button class="mini-tab" type="button" aria-pressed="${pressed}" data-library-domain="${domain.id}">${domain.label}</button>`;
  }).join("");

  miniTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-library-domain]");
    if (!button) return;
    state.libraryDomain = button.dataset.libraryDomain;
    miniTabs.querySelectorAll("[data-library-domain]").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    renderLibrary();
  });
}

function renderReading(reading) {
  const domain = domainById(reading.domainId);
  const hex = HEXAGRAM_BY_NO[reading.primaryNo];
  const changed = HEXAGRAM_BY_NO[reading.changedNo];
  const tri = trigramText(reading.primaryLines);
  const result = $("#result");

  $("#primaryMark").innerHTML = makeHexagramMark(reading.primaryLines, reading.moving);
  $("#primaryNumber").textContent = `第 ${hex.no} 卦`;
  $("#primaryName").textContent = hex.name;
  $("#trigramPair").textContent = tri.label;
  $("#readingMeta").textContent = `${domain.label} · ${formatDate(reading.createdAt)}`;
  $("#readingTitle").textContent = `${hex.name}：${hex.theme}`;
  $("#readingCore").textContent = hex.summary;
  $("#readingQuestion").hidden = !reading.question;
  $("#readingQuestion").textContent = reading.question ? `所問：${reading.question}` : "";
  $("#readingTags").innerHTML = hex.keywords.map((word) => `<span class="tag">${word}</span>`).join("");
  $("#domainReading").textContent = getDomainReading(hex, reading.domainId);
  $("#actionReading").textContent = getActionReading(hex, reading.domainId);
  $("#cautionReading").textContent = getCautionReading(hex, reading.domainId);
  setInitialAiReadingResult("");
  $("#movingLines").innerHTML = renderMovingLines(reading, hex, domain);
  $("#changedWrap").innerHTML = renderChangedHexagram(reading, changed);
  $("#processLog").innerHTML = renderProcess(reading);
  $("#shareStatus").textContent = "";
  state.lastReading = reading;
  result.dataset.readingId = reading.id;
  resetAiForReading(reading);
  updateAiMode();

  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderMovingLines(reading, hex, domain) {
  if (reading.moving.length === 0) {
    const rule = domainRule(domain.id);
    return `<p>無動爻。此卦以本卦為主，先照「${hex.theme}」穩定處理，不急著轉向。放在${domain.label}之問，${rule.noMoving}。</p>`;
  }

  const items = reading.castLines
    .filter((line) => LINE_VALUE[line.value].moving)
    .map((line) => {
      const insight = movingLineInsight(line, hex, domain);
      return `<div class="moving-item"><strong>${insight.title}</strong><p>${insight.text}</p></div>`;
    })
    .join("");

  return `<div class="moving-list">${items}</div>`;
}

function renderChangedHexagram(reading, changed) {
  const label = reading.moving.length === 0 ? "本卦不變" : `變為第 ${changed.no} 卦`;
  return `
    <div class="hexagram-mark">${makeHexagramMark(reading.changedLines)}</div>
    <div>
      <p class="eyebrow">${label}</p>
      <h3>${changed.name}</h3>
      <p>${changed.summary}</p>
    </div>
  `;
}

function renderProcess(reading) {
  return reading.castLines
    .map((line) => {
      const value = LINE_VALUE[line.value];
      const changes = line.changes
        .map((change, index) => `第${index + 1}變：${change.start} 去 ${change.removed} 留 ${change.remain}`)
        .join("；");
      return `<div class="process-entry"><strong>第 ${line.position} 爻：${line.value} ${value.label}</strong><br>${changes}</div>`;
    })
    .join("");
}

function lineValuesFromReading(reading) {
  if (Array.isArray(reading.castLines) && reading.castLines.length === 6) {
    return reading.castLines.map((line) => Number(line.value)).join("");
  }

  if (Array.isArray(reading.primaryLines) && reading.primaryLines.length === 6) {
    const movingSet = new Set(reading.moving || []);
    return reading.primaryLines
      .map((isYang, index) => {
        if (movingSet.has(index + 1)) return isYang ? 9 : 6;
        return isYang ? 7 : 8;
      })
      .join("");
  }

  const detail = HEX_DETAIL_BY_NO[reading.primaryNo];
  if (!detail) return "";
  const movingSet = new Set(reading.moving || []);
  return detail.lines
    .map((isYang, index) => {
      if (movingSet.has(index + 1)) return isYang ? 9 : 6;
      return isYang ? 7 : 8;
    })
    .join("");
}

function castLinesFromValues(values) {
  const lineValues = String(values || "").split("").map(Number);
  if (lineValues.length !== 6 || lineValues.some((value) => ![6, 7, 8, 9].includes(value))) {
    throw new Error("Invalid shared line values");
  }
  return lineValues.map((value, index) => ({
    position: index + 1,
    value,
    changes: []
  }));
}

function normalizeHexNo(value) {
  const no = Number(value);
  return HEXAGRAM_BY_NO[no] ? no : null;
}

function encodeShareTime(iso) {
  const time = Date.parse(iso);
  return Number.isFinite(time) ? Math.floor(time / 60000).toString(36) : undefined;
}

function decodeShareTime(value) {
  if (!value) return new Date().toISOString();
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return value;
  const minutes = parseInt(String(value), 36);
  return Number.isFinite(minutes) ? new Date(minutes * 60000).toISOString() : new Date().toISOString();
}

function makeSharePayload(reading) {
  return {
    v: 2,
    q: reading.question || "",
    d: DOMAIN_SHARE_CODES[reading.domainId] || reading.domainId,
    t: encodeShareTime(reading.createdAt),
    p: reading.primaryNo,
    c: reading.changedNo,
    y: lineValuesFromReading(reading)
  };
}

function readingFromSharePayload(payload) {
  if (!payload || ![1, 2].includes(payload.v)) {
    return null;
  }

  if (payload.v === 2) {
    const castLines = castLinesFromValues(payload.y);
    const primaryLines = castLines.map((line) => (line.value === 7 || line.value === 9 ? 1 : 0));
    const changedLines = castLines.map((line, index) => {
      if (line.value === 6) return 1;
      if (line.value === 9) return 0;
      return primaryLines[index];
    });
    const moving = castLines.filter((line) => LINE_VALUE[line.value].moving).map((line) => line.position);
    const domainId = DOMAIN_ID_BY_SHARE_CODE[payload.d] || (DOMAINS.some((domain) => domain.id === payload.d) ? payload.d : "decision");

    return {
      id: `shared-${Date.now()}`,
      createdAt: decodeShareTime(payload.t),
      question: typeof payload.q === "string" ? payload.q.slice(0, 180) : "",
      domainId,
      castLines,
      primaryLines,
      changedLines,
      primaryNo: normalizeHexNo(payload.p) || numberFromLines(primaryLines),
      changedNo: normalizeHexNo(payload.c) || numberFromLines(changedLines),
      moving
    };
  }

  if (!Array.isArray(payload.l) || payload.l.length !== 6) return null;

  const castLines = payload.l.map((line, index) => {
    const value = Number(line.v);
    if (![6, 7, 8, 9].includes(value)) throw new Error("Invalid shared line value");
    return {
      position: index + 1,
      value,
      changes: (line.c || []).map((change) => ({
        start: Number(change[0]),
        left: Number(change[1]),
        right: Number(change[2]),
        held: 1,
        leftRemainder: Number(change[3]),
        rightRemainder: Number(change[4]),
        removed: Number(change[5]),
        remain: Number(change[6])
      }))
    };
  });

  const primaryLines = castLines.map((line) => (line.value === 7 || line.value === 9 ? 1 : 0));
  const changedLines = castLines.map((line, index) => {
    if (line.value === 6) return 1;
    if (line.value === 9) return 0;
    return primaryLines[index];
  });
  const primaryNo = legacyNumberFromLines(primaryLines);
  const changedNo = legacyNumberFromLines(changedLines);
  const moving = castLines.filter((line) => LINE_VALUE[line.value].moving).map((line) => line.position);
  const domainId = DOMAINS.some((domain) => domain.id === payload.d) ? payload.d : "decision";

  return {
    id: `shared-${Date.now()}`,
    createdAt: payload.t || new Date().toISOString(),
    question: typeof payload.q === "string" ? payload.q.slice(0, 180) : "",
    domainId,
    castLines,
    primaryLines,
    changedLines,
    primaryNo,
    changedNo,
    moving
  };
}

function encodeSharePayload(payload) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeSharePayload(encoded) {
  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function getReadingShareUrl(reading) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = `reading=${encodeSharePayload(makeSharePayload(reading))}`;
  return url.toString();
}

function loadCanvasImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function encodeCanvasBlob(canvas, type, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

function scaleCanvasForShare(sourceCanvas, scale) {
  if (scale >= 0.999) return sourceCanvas;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(sourceCanvas.width * scale));
  canvas.height = Math.max(1, Math.round(sourceCanvas.height * scale));
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(sourceCanvas, 0, 0, canvas.width, canvas.height);
  return canvas;
}

async function canvasToBlob(canvas, type = "image/jpeg", quality = 0.72, maxBytes = 68000) {
  const qualities = [quality, 0.64, 0.56, 0.48, 0.4, 0.34, 0.28];
  const scales = [1, 0.92, 0.84, 0.76];
  let smallest = null;

  for (const scale of scales) {
    const workingCanvas = scaleCanvasForShare(canvas, scale);
    for (const currentQuality of qualities) {
      const blob = await encodeCanvasBlob(workingCanvas, type, currentQuality);
      if (!blob) continue;
      if (!smallest || blob.size < smallest.size) smallest = blob;
      if (blob.size <= maxBytes) return blob;
    }
  }

  return smallest;
}

function wrapCanvasText(ctx, text, maxWidth, maxLines = 4) {
  const source = String(text || "");
  const paragraphs = source.split("\n");
  const lines = [];
  let truncated = false;

  for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex += 1) {
    const paragraph = paragraphs[paragraphIndex];
    let current = "";
    for (const char of paragraph) {
      const next = current + char;
      if (ctx.measureText(next).width > maxWidth && current) {
        lines.push(current);
        current = char;
        if (lines.length === maxLines) {
          truncated = true;
          break;
        }
      } else {
        current = next;
      }
    }
    if (lines.length === maxLines) break;
    if (current) lines.push(current);
    if (lines.length === maxLines && paragraphIndex < paragraphs.length - 1) {
      truncated = true;
      break;
    }
  }

  if (lines.length > maxLines) lines.length = maxLines;
  if (truncated && lines.length) {
    let last = lines[lines.length - 1].replace(/…$/, "");
    while (last.length > 1 && ctx.measureText(`${last}…`).width > maxWidth) {
      last = last.slice(0, -1);
    }
    lines[lines.length - 1] = `${last}…`;
  }
  return lines;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const lines = wrapCanvasText(ctx, text, maxWidth, maxLines);
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
  return y + lines.length * lineHeight;
}

function roundRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawHexagramCanvas(ctx, lines, moving, x, y, width, lineHeight, gap) {
  const movingSet = new Set(moving);
  const barGradient = ctx.createLinearGradient(x, y, x + width, y);
  barGradient.addColorStop(0, "#d69d43");
  barGradient.addColorStop(0.52, "#fff0b4");
  barGradient.addColorStop(1, "#a76b2f");

  [...lines].reverse().forEach((isYang, reverseIndex) => {
    const position = 6 - reverseIndex;
    const yy = y + reverseIndex * (lineHeight + gap);
    ctx.fillStyle = barGradient;
    if (isYang) {
      roundRectPath(ctx, x, yy, width, lineHeight, 3);
      ctx.fill();
    } else {
      const segmentWidth = (width - 28) / 2;
      roundRectPath(ctx, x, yy, segmentWidth, lineHeight, 3);
      ctx.fill();
      roundRectPath(ctx, x + segmentWidth + 28, yy, segmentWidth, lineHeight, 3);
      ctx.fill();
    }
    if (movingSet.has(position)) {
      ctx.strokeStyle = "rgba(31, 176, 136, 0.95)";
      ctx.lineWidth = 5;
      roundRectPath(ctx, x - 8, yy - 8, width + 16, lineHeight + 16, 6);
      ctx.stroke();
    }
  });
}

async function createReadingImageBlob(reading) {
  const width = 1080;
  const height = 1350;
  const outputScale = 5 / 9;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * outputScale);
  canvas.height = Math.round(height * outputScale);
  const ctx = canvas.getContext("2d");
  ctx.scale(outputScale, outputScale);
  const hex = HEXAGRAM_BY_NO[reading.primaryNo];
  const changed = HEXAGRAM_BY_NO[reading.changedNo];
  const domain = domainById(reading.domainId);
  const moving = reading.moving.length ? `動爻：${reading.moving.join("、")}` : "無動爻";

  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "#071f1b");
  bg.addColorStop(0.5, "#04110f");
  bg.addColorStop(1, "#020807");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = "#e8bd62";
  ctx.lineWidth = 3;
  for (let r = 220; r <= 620; r += 76) {
    ctx.beginPath();
    ctx.arc(width / 2, 392, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  const glow = ctx.createRadialGradient(width / 2, 330, 20, width / 2, 330, 440);
  glow.addColorStop(0, "rgba(232, 189, 98, 0.3)");
  glow.addColorStop(1, "rgba(232, 189, 98, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, 760);

  ctx.strokeStyle = "rgba(232, 189, 98, 0.86)";
  ctx.lineWidth = 6;
  roundRectPath(ctx, 44, 44, width - 88, height - 88, 36);
  ctx.stroke();
  ctx.strokeStyle = "rgba(31, 176, 136, 0.55)";
  ctx.lineWidth = 2;
  roundRectPath(ctx, 68, 68, width - 136, height - 136, 28);
  ctx.stroke();

  const icon = await loadCanvasImage("./assets/icon-192.png");
  if (icon) {
    const iconSize = 168;
    const iconX = (width - iconSize) / 2;
    const iconY = 76;
    ctx.save();
    roundRectPath(ctx, iconX, iconY, iconSize, iconSize, 34);
    ctx.clip();
    ctx.drawImage(icon, iconX, iconY, iconSize, iconSize);
    ctx.restore();
    ctx.strokeStyle = "rgba(247, 218, 136, 0.92)";
    ctx.lineWidth = 4;
    roundRectPath(ctx, iconX, iconY, iconSize, iconSize, 34);
    ctx.stroke();
  }

  roundRectPath(ctx, 178, 278, width - 356, 150, 30);
  ctx.fillStyle = "rgba(0, 8, 7, 0.7)";
  ctx.fill();
  ctx.strokeStyle = "rgba(232, 189, 98, 0.5)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 5;
  ctx.fillStyle = "#fff7da";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.92)";
  ctx.lineWidth = 8;
  ctx.font = '900 68px "Noto Serif TC", "Microsoft JhengHei", serif';
  ctx.strokeText(hex.name, width / 2, 346);
  ctx.fillText(hex.name, width / 2, 346);
  ctx.fillStyle = "#ffd978";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.75)";
  ctx.lineWidth = 5;
  ctx.font = '700 38px "Noto Serif TC", "Microsoft JhengHei", serif';
  ctx.strokeText(hex.theme, width / 2, 400);
  ctx.fillText(hex.theme, width / 2, 400);
  ctx.restore();

  drawHexagramCanvas(ctx, reading.primaryLines, reading.moving, 398, 462, 284, 22, 14);

  roundRectPath(ctx, 150, 704, width - 300, 104, 24);
  ctx.fillStyle = "rgba(0, 8, 7, 0.82)";
  ctx.fill();
  ctx.strokeStyle = "rgba(232, 189, 98, 0.34)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#f6e6b7";
  ctx.font = '750 29px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  ctx.fillText(`第 ${hex.no} 卦 · ${domain.label} · ${moving}`, width / 2, 746);
  ctx.fillStyle = "#d9f4df";
  ctx.font = '750 28px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  ctx.fillText(`變卦：第 ${changed.no} 卦 ${changed.name}`, width / 2, 782);

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 12;
  roundRectPath(ctx, 82, 832, width - 164, 378, 30);
  ctx.fillStyle = "rgba(1, 9, 8, 0.94)";
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = "rgba(247, 218, 136, 0.76)";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = "#ffd978";
  ctx.font = '800 32px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  ctx.fillText("所問", 128, 888);
  ctx.fillStyle = "#ffffff";
  ctx.font = '700 34px "Noto Serif TC", "Microsoft JhengHei", serif';
  const question = reading.question || "未填問題";
  let nextY = drawWrappedText(ctx, question, 128, 930, 824, 42, 2);

  ctx.fillStyle = "#ffd978";
  ctx.font = '800 32px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  ctx.fillText("解讀", 128, nextY + 30);
  ctx.fillStyle = "#fff2ce";
  ctx.font = '650 30px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  nextY = drawWrappedText(ctx, hex.summary, 128, nextY + 76, 824, 39, 2);

  ctx.fillStyle = "#84f0bd";
  ctx.font = '800 28px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  drawWrappedText(ctx, `宜行：${hex.action}`, 128, nextY + 32, 824, 36, 1);

  ctx.textAlign = "center";
  ctx.fillStyle = "#e8bd62";
  ctx.font = '800 34px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  ctx.fillText("易策玄占 · 線上易經卜卦", width / 2, 1250);
  ctx.fillStyle = "#cbbf9b";
  ctx.font = '500 24px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  ctx.fillText("iching-oracle-pwa.vercel.app", width / 2, 1288);

  return canvasToBlob(canvas);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getCurrentReading() {
  if (state.lastReading) return state.lastReading;

  const result = $("#result");
  if (result.hidden) return null;

  const history = getHistory();
  const reading = history.find((item) => item.id === result.dataset.readingId) || history[0] || null;
  if (reading) state.lastReading = inflateReading(reading);
  return state.lastReading;
}

function inflateReading(reading) {
  if (Array.isArray(reading.primaryLines) && Array.isArray(reading.changedLines) && Array.isArray(reading.castLines)) {
    return reading;
  }

  const primaryDetail = HEX_DETAIL_BY_NO[reading.primaryNo];
  const changedDetail = HEX_DETAIL_BY_NO[reading.changedNo] || primaryDetail;
  if (!primaryDetail) return reading;

  const movingSet = new Set(reading.moving || []);
  const primaryLines = [...primaryDetail.lines];
  const changedLines = changedDetail ? [...changedDetail.lines] : primaryLines.map((line, index) => {
    if (!movingSet.has(index + 1)) return line;
    return line ? 0 : 1;
  });
  const castLines = primaryLines.map((isYang, index) => ({
    position: index + 1,
    value: movingSet.has(index + 1) ? (isYang ? 9 : 6) : (isYang ? 7 : 8),
    changes: []
  }));

  return {
    ...reading,
    castLines,
    primaryLines,
    changedLines
  };
}

function getShareData(reading) {
  const domain = domainById(reading.domainId);
  const hex = HEXAGRAM_BY_NO[reading.primaryNo];
  const changed = HEXAGRAM_BY_NO[reading.changedNo];
  const moving = reading.moving.length ? `動爻 ${reading.moving.join("、")}` : "無動爻";
  const text = `我用易策玄占問「${domain.label}」，卜到「${hex.name}：${hex.theme}」，${moving}，變卦「${changed.name}」。`;
  return {
    title: `易策玄占｜${hex.name}`,
    text,
    url: getReadingShareUrl(reading)
  };
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall back to the selection-based copy path below.
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Unable to copy text");
  return true;
}

async function copyImageBlob(blob) {
  if (!navigator.clipboard?.write || typeof window.ClipboardItem === "undefined") return false;
  try {
    await navigator.clipboard.write([
      new window.ClipboardItem({
        [blob.type || "image/jpeg"]: blob
      })
    ]);
    return true;
  } catch {
    return false;
  }
}

function getShareImageFilename(reading) {
  const hex = HEXAGRAM_BY_NO[reading.primaryNo];
  const no = String(hex?.no || reading.primaryNo || "0").padStart(2, "0");
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `iching-reading-${no}-${date}.jpg`;
}

async function shareCurrentReading() {
  const reading = getCurrentReading();
  if (!reading) return;
  const status = $("#shareStatus");
  const shareButton = $("#shareResultButton");
  status.textContent = "正在生成卦象圖片...";
  shareButton.disabled = true;

  try {
    const blob = await createReadingImageBlob(reading);
    if (!blob) {
      throw new Error("Unable to generate image");
    }
    const filename = getShareImageFilename(reading);
    const file = new File([blob], filename, { type: blob.type || "image/jpeg" });
    const fileShareData = {
      files: [file]
    };

    if (navigator.canShare?.(fileShareData) && navigator.share) {
      await navigator.share(fileShareData);
      status.textContent = "已開啟圖片分享面板。";
    } else if (await copyImageBlob(blob)) {
      status.textContent = "圖片已複製，可直接貼到 LINE 對話框。";
    } else {
      downloadBlob(blob, filename);
      status.textContent = "此瀏覽器不能直接複製圖片，已下載 JPG，可拖到 LINE 傳送。";
    }
  } catch (error) {
    if (error?.name === "AbortError") {
      status.textContent = "已取消分享。";
      return;
    }
    console.warn("Unable to share image.", error);
    status.textContent = "圖片生成失敗，請再試一次。";
  } finally {
    shareButton.disabled = false;
  }
}

async function copyCurrentReadingLink() {
  const reading = getCurrentReading();
  if (!reading) return;
  await copyText(getReadingShareUrl(reading));
  $("#shareStatus").textContent = "連結已複製，朋友打開會看到同一卦。";
}

function publicSiteUrl() {
  const fallback = "https://iching-oracle-pwa.vercel.app/";
  try {
    const { origin, pathname, hostname } = window.location;
    if (!origin || hostname === "localhost" || hostname === "127.0.0.1") return fallback;
    return new URL(pathname || "/", origin).href.replace(/[?#].*$/, "");
  } catch {
    return fallback;
  }
}

function aiConversationMessages() {
  let hasUserQuestion = false;
  return state.aiMessages.filter((message) => {
    if (message.role === "user") {
      hasUserQuestion = true;
      return true;
    }
    return hasUserQuestion && message.role === "assistant";
  });
}

function buildAiConversationText() {
  const conversation = aiConversationMessages();
  if (conversation.length === 0) return "";

  const reading = getCurrentReading();
  const lines = ["易策玄占｜AI 解卦對話"];

  if (reading) {
    const fullReading = inflateReading(reading);
    const domain = domainById(fullReading.domainId);
    const hex = HEXAGRAM_BY_NO[fullReading.primaryNo];
    const changed = HEXAGRAM_BY_NO[fullReading.changedNo];
    const tri = trigramText(fullReading.primaryLines);
    const moving = fullReading.moving.length ? `動爻：${fullReading.moving.join("、")}` : "動爻：無";

    lines.push(
      `時間：${formatDate(fullReading.createdAt)}`,
      `問事方向：${domain.label}`,
      `所問：${fullReading.question || "未填問題"}`,
      `本卦：第 ${hex.no} 卦 ${hex.name}（${hex.theme}）`,
      `卦象：${tri.label}`,
      `${moving}`,
      `變卦：第 ${changed.no} 卦 ${changed.name}（${changed.theme}）`
    );
  } else {
    lines.push("狀態：尚未完成起卦，以下為起卦前補充對話。");
  }

  lines.push("", "AI 追問紀錄");
  conversation.forEach((message, index) => {
    const label = message.role === "user" ? "客戶" : "AI 解卦";
    lines.push(`${index + 1}. ${label}：${String(message.content || "").trim()}`);
  });
  lines.push("", `由 易策玄占產生：${publicSiteUrl()}`);

  return lines.join("\n");
}

function updateAiConversationButton() {
  const button = $("#copyAiConversationButton");
  if (!button) return;
  button.disabled = aiConversationMessages().length === 0;
}

async function copyAiConversation() {
  const text = buildAiConversationText();
  const status = $("#aiStatus");
  if (!text) {
    status.textContent = "還沒有可複製的 AI 對話。";
    return;
  }
  try {
    await copyText(text);
    status.textContent = "AI 對話已複製，可直接貼到 LINE、FB 或傳給朋友。";
  } catch (error) {
    console.warn("Unable to copy AI conversation.", error);
    status.textContent = "複製失敗，請再試一次。";
  }
}

function getAiEndpoint() {
  let storedEndpoint = "";
  try {
    storedEndpoint = localStorage.getItem("iching-ai-endpoint") || "";
  } catch {
    storedEndpoint = "";
  }
  const configured = String(window.ICHING_AI_ENDPOINT || storedEndpoint).trim();
  if (configured) return configured;

  const host = window.location.hostname;
  if (host.endsWith("netlify.app")) return "/.netlify/functions/iching-ai";
  if (host.endsWith("vercel.app")) return "/api/iching-ai";
  return "";
}

function initAiAssistant() {
  state.aiMessages = [
    {
      role: "assistant",
      content: "先定其問，待六爻成形，再看本卦與變卦。"
    }
  ];
  renderAiMessages();
  updateAiMode();
}

function updateAiMode() {
  const phase = $("#aiPhase");
  const badge = $("#aiModeBadge");
  if (!phase || !badge) return;

  if (state.isCasting) {
    phase.textContent = "AI 聽問";
    badge.textContent = "籌策中";
    return;
  }

  if (state.lastReading) {
    const hex = HEXAGRAM_BY_NO[state.lastReading.primaryNo];
    phase.textContent = "AI 解卦";
    badge.textContent = hex ? `${hex.name}` : "同卦追問";
    return;
  }

  phase.textContent = "AI 解卦";
  badge.textContent = "待起卦";
}

function resetAiForReading(reading) {
  const hex = HEXAGRAM_BY_NO[reading.primaryNo];
  state.aiMessages = [
    {
      role: "assistant",
      content: hex
        ? `此卦已成：${hex.name}。後續只依同一卦追問，不另起新卦。`
        : "此卦已成。後續只依同一卦追問，不另起新卦。"
    }
  ];
  renderAiMessages();
}

function setInitialAiReadingResult(text) {
  const panel = $("#initialAiReadingPanel");
  const output = $("#initialAiReadingText");
  if (!panel || !output) return;
  const content = String(text || "").trim();
  panel.hidden = !content;
  output.textContent = content;
}

function taipeiDateKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function taipeiDateLabel(dateKey = "") {
  const date = dateKey ? new Date(`${dateKey}T04:00:00.000Z`) : new Date();
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long"
  }).format(date);
}

function dayOfYearFromDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const current = Date.UTC(year, month - 1, day);
  const start = Date.UTC(year, 0, 1);
  return Math.floor((current - start) / 86400000) + 1;
}

function dailyHash(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function nextDailySeed(seed) {
  let value = seed >>> 0;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;
  return value >>> 0;
}

function pickDaily(list, seed, offset = 0) {
  const mixed = (seed + Math.imul(offset + 1, 2654435761)) >>> 0;
  return list[mixed % list.length];
}

function seededShuffle(list, seed) {
  const items = [...list];
  let value = seed || 0x9e3779b9;
  for (let index = items.length - 1; index > 0; index -= 1) {
    value = nextDailySeed(value + index);
    const swapIndex = value % (index + 1);
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }
  return items;
}

function makeDailyPools(seed) {
  return {
    directions: seededShuffle(DAILY_DIRECTIONS, seed + 11),
    supportDirections: seededShuffle(DAILY_DIRECTIONS, seed + 23),
    colors: seededShuffle(DAILY_COLORS, seed + 37),
    hours: seededShuffle(DAILY_HOURS, seed + 41),
    flows: seededShuffle(DAILY_WEALTH_FLOWS, seed + 53),
    actions: seededShuffle(DAILY_ACTIONS, seed + 67),
    cautions: seededShuffle(DAILY_CAUTIONS, seed + 79)
  };
}

function pickUniqueFromPool(pool, used, forbidden = "") {
  const selected = pool.find((item) => !used.has(item) && item !== forbidden) || pool.find((item) => item !== forbidden) || pool[0];
  used.add(selected);
  return selected;
}

function makeDailyAssignments(pools) {
  const usedSupportDirections = new Set();
  return DAILY_ZODIAC_SIGNS.map((sign, index) => {
    const direction = pools.directions[index % pools.directions.length];
    return {
      sign,
      direction,
      supportDirection: pickUniqueFromPool(pools.supportDirections, usedSupportDirections, direction),
      color: pools.colors[index % pools.colors.length],
      hour: pools.hours[index % pools.hours.length],
      flow: pools.flows[index % pools.flows.length],
      action: pools.actions[index % pools.actions.length],
      caution: pools.cautions[index % pools.cautions.length]
    };
  });
}

function dailyStars(score) {
  return `${"★".repeat(score)}${"☆".repeat(5 - score)}`;
}

function publicSiteUrl() {
  const host = window.location.hostname;
  if (!host || host === "127.0.0.1" || host === "localhost") return "https://iching-oracle-pwa.vercel.app/";
  return `${window.location.origin}${window.location.pathname}`;
}

function dailyZodiacLine(sign, index, dateKey, assignment, theme) {
  const seed = dailyHash(`${dateKey}:${sign}:${index}`);
  const score = 2 + (seed % 4);
  const zodiacCode = `${dateKey.split("-").join("")}-${String(index + 1).padStart(2, "0")}`;

  return [
    `【${sign}】財運 ${dailyStars(score)}｜財位：${assignment.direction}｜貴人方：${assignment.supportDirection}｜日碼 ${zodiacCode}`,
    `開運色：${assignment.color}｜吉時：${assignment.hour}`,
    `${assignment.flow}。${theme.title}提醒：${assignment.action}；${assignment.caution}。`
  ].join("\n");
}

function generateDailyFortunePost(dateKey = taipeiDateKey()) {
  const dateLabel = taipeiDateLabel(dateKey);
  const seed = dailyHash(`daily-post:${dateKey}`);
  const dayOfYear = dayOfYearFromDateKey(dateKey);
  const year = dateKey.slice(0, 4);
  const dailyCode = `${year}-${String(dayOfYear).padStart(3, "0")}`;
  const theme = pickDaily(DAILY_THEMES, seed, 0);
  const pools = makeDailyPools(seed);
  const dailyHex = HEXAGRAMS[(seed + dayOfYear) % HEXAGRAMS.length];
  const overallDirection = pools.directions[12 % pools.directions.length];
  const overallColor = pools.colors[12 % pools.colors.length];
  const opening = pickDaily(DAILY_OPENINGS, seed, 3);
  const todayAction = pools.actions[12 % pools.actions.length];
  const todayCaution = pools.cautions[12 % pools.cautions.length];
  const assignments = makeDailyAssignments(pools);
  const zodiacLines = DAILY_ZODIAC_SIGNS.map((sign, index) => dailyZodiacLine(sign, index, dateKey, assignments[index], theme));
  const header = [
    `玄卦堂｜${dateLabel} 今日 12 生肖方位財運`,
    `年度日碼：${dailyCode}｜今日主題：${theme.title}`,
    `今日卦氣：第 ${dailyHex.no} 卦 ${dailyHex.name}｜${dailyHex.theme}`,
    `今日總財位：${overallDirection}｜開運色：${overallColor}`,
    `整體財氣：${opening}。${theme.focus}。${theme.advice}。`
  ].join("\n");
  const footer = [
    `今日宜：${todayAction}。`,
    `今日忌：${todayCaution}。`,
    "",
    "以上為生活參考，投資與重大決策請自行評估。",
    `線上起卦：${publicSiteUrl()}`,
    "",
    DAILY_HASHTAGS.join(" ")
  ].join("\n");

  return [header, zodiacLines.join("\n\n"), footer].join("\n\n");
}

function renderDailyFortunePost(showStatus = false) {
  const output = $("#dailyPostOutput");
  if (!output) return;

  output.value = generateDailyFortunePost();
  const date = $("#dailyPostDate");
  if (date) date.textContent = taipeiDateLabel(taipeiDateKey());

  const status = $("#dailyPostStatus");
  if (status && showStatus) status.textContent = "今日 FB 文案已產生。";
}

async function copyDailyFortunePost() {
  const output = $("#dailyPostOutput");
  const status = $("#dailyPostStatus");
  if (!output) return;
  if (!output.value.trim()) renderDailyFortunePost();

  try {
    await copyText(output.value);
    if (status) status.textContent = "已複製，可直接貼到 FB。";
  } catch (error) {
    output.focus();
    output.select();
    try {
      const copied = document.execCommand("copy");
      if (status) status.textContent = copied ? "已複製，可直接貼到 FB。" : "已選取文案，可手動複製。";
    } catch {
      if (status) status.textContent = "已選取文案，可手動複製。";
    }
  }
}

function makeMemberId() {
  return window.crypto?.randomUUID?.() || `member-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readStoredMember() {
  try {
    return JSON.parse(localStorage.getItem(MEMBER_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveMember() {
  try {
    localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(state.member));
  } catch {
    // Membership stays in memory when private browsers block storage.
  }
}

function initMembership() {
  const today = taipeiDateKey();
  const stored = readStoredMember();
  state.member = {
    id: stored.id || makeMemberId(),
    plan: stored.plan || "free",
    vipUntil: stored.vipUntil || "",
    pointsBalance: Math.max(Number(stored.pointsBalance || 0), 0),
    quotaDate: stored.quotaDate === today ? stored.quotaDate : today,
    usedToday: stored.quotaDate === today ? Number(stored.usedToday || 0) : 0
  };
  saveMember();
  updateMemberUi();
}

function getDailyLimit() {
  return FREE_DAILY_AI_LIMIT;
}

function remainingAiUses() {
  if (!state.member) return FREE_DAILY_AI_LIMIT;
  const today = taipeiDateKey();
  if (state.member.quotaDate !== today) {
    state.member.quotaDate = today;
    state.member.usedToday = 0;
    saveMember();
  }
  return Math.max(getDailyLimit() - Number(state.member.usedToday || 0), 0);
}

function currentPointBalance() {
  return Math.max(Number(state.member?.pointsBalance || 0), 0);
}

function updateMemberUi() {
  const planLabel = $("#memberPlanLabel");
  const quotaText = $("#aiQuotaText");
  if (!planLabel || !quotaText) return;

  const planName = currentPointBalance() > 0 ? "已購買手鏈" : "免費 AI 諮詢";
  const remaining = remainingAiUses();
  const points = currentPointBalance();
  planLabel.textContent = planName;
  quotaText.textContent = points > 0
    ? `今日剩餘 ${remaining} 次 · 商品贈送 ${points} 次`
    : `今日剩餘 ${remaining} 次`;
}

function canUseAiQuota() {
  if (getAiEndpoint()) return true;
  return remainingAiUses() > 0 || currentPointBalance() > 0;
}

function consumeAiQuota() {
  if (!state.member) initMembership();
  if (remainingAiUses() > 0) {
    state.member.usedToday = Number(state.member.usedToday || 0) + 1;
  } else if (currentPointBalance() > 0) {
    state.member.pointsBalance = currentPointBalance() - 1;
  }
  saveMember();
  updateMemberUi();
}

function openMemberDialog() {
  prepareMemberCheckoutForm();
  $("#memberDialog").showModal();
}

function applyRemoteQuota(quota) {
  if (!state.member || !quota) return;
  if (Number.isFinite(Number(quota.used))) {
    state.member.usedToday = Math.min(Number(quota.used), FREE_DAILY_AI_LIMIT);
  }
  if (Number.isFinite(Number(quota.pointsBalance))) {
    state.member.pointsBalance = Math.max(Number(quota.pointsBalance), 0);
  }
  saveMember();
  updateMemberUi();
}

function buildMemberApplicationText() {
  if (!state.member) initMembership();
  const planName = currentPointBalance() > 0 ? "已購買手鏈" : "免費 AI 諮詢";
  const time = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });

  return [
    "易策玄占手鏈訂購協助",
    `客戶編號：${state.member.id}`,
    `目前狀態：${planName}`,
    "需求：協助訂購不規則切面轉運串珠手鏈",
    `申請時間：${time}`,
    "商品：NT$499 / 條，附贈 50 則 AI 易經諮詢",
    "付款與配送：請依客服提供的方式處理，並回傳收件資料"
  ].join("\n");
}

async function copyMemberApplication(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  return false;
}

function prepareMemberCheckoutForm() {
  if (!state.member) initMembership();
  const form = $("#memberCheckoutForm");
  if (!form) return;

  const checkoutUrl = String(window.ICHING_MEMBER_CHECKOUT_URL || "").trim();
  form.action = checkoutUrl;
  $("#checkoutMemberId").value = state.member.id;
  $("#checkoutSourceUrl").value = window.location.href;
}

async function handleMemberCheckoutSubmit(event) {
  prepareMemberCheckoutForm();
  const form = event.currentTarget;
  const status = $("#memberApplyStatus");
  const product = "bracelet";
  if (!form.action) {
    event.preventDefault();
    status.textContent = "線上付款尚未設定，請先用 LINE 聯絡站主。";
    await handleMemberLineContact();
    return;
  }
  status.textContent = product === "bracelet"
    ? "正在建立手鏈訂單，準備前往付款頁..."
    : "此方案暫停線上銷售。";
}

async function handleMemberLineContact() {
  const status = $("#memberApplyStatus");
  const text = buildMemberApplicationText();
  const contactUrl = String(window.ICHING_MEMBER_CONTACT_URL || "").trim();

  try {
    const copied = await copyMemberApplication(text);
    if (contactUrl) {
      window.open(contactUrl, "_blank", "noopener");
      status.textContent = copied ? "已複製訂購資料，並開啟聯絡頁。" : "已開啟聯絡頁，請把客戶編號傳給站主。";
      return;
    }
    status.textContent = copied
      ? "已複製訂購協助資料，請貼給站主確認。"
      : `客戶編號：${state.member.id}。請截圖或複製這組編號給站主。`;
  } catch {
    status.textContent = `客戶編號：${state.member.id}。請截圖或複製這組編號給站主。`;
  }
}

async function refreshOnlineMemberStatus() {
  if (!state.member) return;
  const endpoint = String(window.ICHING_MEMBER_STATUS_URL || "").trim();
  if (!endpoint) return;

  try {
    const url = `${endpoint}?memberId=${encodeURIComponent(state.member.id)}`;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) return;
    const data = await response.json();
    state.member.plan = "free";
    state.member.vipUntil = "";
    if (Number.isFinite(Number(data.pointsBalance))) {
      state.member.pointsBalance = Math.max(Number(data.pointsBalance), 0);
    }
    saveMember();
    updateMemberUi();
  } catch (error) {
    console.info("Online member status check skipped.", error);
  }
}

function renderAiMessages() {
  const panel = $("#aiMessages");
  if (!panel) return;
  panel.innerHTML = state.aiMessages
    .map((message) => {
      const content = escapeHtml(message.content).replace(/\n/g, "<br>");
      return `<div class="ai-message ${message.role}"><p>${content}</p></div>`;
    })
    .join("");
  panel.scrollTop = panel.scrollHeight;
  updateAiConversationButton();
}

function addAiMessage(role, content) {
  state.aiMessages.push({ role, content });
  if (state.aiMessages.length > 16) state.aiMessages = state.aiMessages.slice(-16);
  renderAiMessages();
}

function setAiBusy(isBusy) {
  state.isAiBusy = isBusy;
  const button = $("#aiSendButton");
  const input = $("#aiQuestion");
  if (button) button.disabled = isBusy;
  if (input) input.disabled = isBusy;
}

function readingForAi(reading) {
  if (!reading) return null;
  const fullReading = inflateReading(reading);
  const domain = domainById(fullReading.domainId);
  const primary = HEXAGRAM_BY_NO[fullReading.primaryNo];
  const changed = HEXAGRAM_BY_NO[fullReading.changedNo];
  const movingLines = fullReading.castLines
    .filter((line) => LINE_VALUE[line.value]?.moving)
    .map((line) => `${LINE_STAGES[line.position - 1].name} ${LINE_VALUE[line.value].label}`);
  const movingInsights = fullReading.castLines
    .filter((line) => LINE_VALUE[line.value]?.moving)
    .map((line) => movingLineInsight(line, primary, domain).text);

  return {
    question: fullReading.question,
    domain: {
      label: domain.label,
      scope: domain.scope,
      lineFocus: domain.lineFocus
    },
    primary: {
      no: primary.no,
      name: primary.name,
      theme: primary.theme,
      summary: primary.summary,
      action: primary.action,
      caution: primary.caution,
      keywords: primary.keywords
    },
    changed: {
      no: changed.no,
      name: changed.name,
      theme: changed.theme,
      summary: changed.summary
    },
    moving: movingLines,
    domainInterpretation: {
      situation: getDomainReading(primary, fullReading.domainId),
      action: getActionReading(primary, fullReading.domainId),
      caution: getCautionReading(primary, fullReading.domainId),
      moving: movingInsights
    },
    lineValues: fullReading.castLines.map((line) => `${line.position}:${line.value}`),
    trigram: trigramText(fullReading.primaryLines).label
  };
}

function localAiReply(message, reading) {
  if (state.isCasting || !reading) {
    return "我先把這個補充收進來。六爻還在成形，等本卦、變卦與動爻出來後，再一起看這句話落在哪一爻。";
  }

  const fullReading = inflateReading(reading);
  const hex = HEXAGRAM_BY_NO[fullReading.primaryNo];
  const changed = HEXAGRAM_BY_NO[fullReading.changedNo];
  const domain = domainById(fullReading.domainId);
  const moving = fullReading.moving.length ? `動爻在第 ${fullReading.moving.join("、")} 爻` : "此卦無動爻";

  return [
    `這一問仍以「${hex.name}」為主，重點是「${hex.theme}」。`,
    `你追問的「${message}」，先看${domain.lineFocus}；${moving}，所以不要急著換問題，要先把同一件事看深。`,
    `變卦為「${changed.name}」，表示後續會往「${changed.theme}」的方向轉。`,
    `可先做一件小事：${hex.action}。`
  ].join("\n");
}

async function requestAiReply(payload) {
  const endpoint = getAiEndpoint();
  if (!endpoint) {
    $("#aiStatus").textContent = "AI 追問尚未開通，先用卦典摘要回覆。";
    return {
      reply: localAiReply(payload.message, getCurrentReading()),
      usedRemoteAi: false
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 22000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const statusText = {
        AI_BACKEND_NOT_CONFIGURED: "AI 追問尚未開通，先用卦典摘要回覆。",
        AI_BILLING_NOT_READY: "OpenAI 帳務或額度尚未開通，先用卦典摘要回覆。",
        AI_MODEL_ERROR: "AI 暫時沒有接通，先用卦典摘要回覆。",
        DAILY_LIMIT_REACHED: "今日免費 AI 次數已用完。"
      };
      $("#aiStatus").textContent = statusText[data.error] || "AI 暫時沒有接通，先用卦典摘要回覆。";
      return {
        reply: data.error === "DAILY_LIMIT_REACHED"
          ? data.reply || localAiReply(payload.message, getCurrentReading())
          : localAiReply(payload.message, getCurrentReading()),
        usedRemoteAi: false,
        limitReached: data.error === "DAILY_LIMIT_REACHED",
        quota: data.quota
      };
    }
    $("#aiStatus").textContent = "";
    return {
      reply: data.reply || localAiReply(payload.message, getCurrentReading()),
      usedRemoteAi: true,
      quota: data.quota
    };
  } finally {
    clearTimeout(timeout);
  }
}

function initialAiMessage(reading) {
  const fullReading = inflateReading(reading);
  const domain = domainById(fullReading.domainId);
  const hex = HEXAGRAM_BY_NO[fullReading.primaryNo];
  const changed = HEXAGRAM_BY_NO[fullReading.changedNo];
  const moving = fullReading.moving.length ? `動爻在第 ${fullReading.moving.join("、")} 爻` : "無動爻";
  return [
    `請針對我一開始的問題「${fullReading.question}」做第一次完整解卦。`,
    `請用${domain.label}角度回答，不要泛泛講卦。`,
    `本卦是${hex.name}，${moving}，變卦是${changed.name}。`,
    "請說明現在局勢、關鍵爻位、可行做法、需要避開的事，語氣自然口語。"
  ].join(" ");
}

async function requestInitialAiReading(reading) {
  const question = String(reading?.question || "").trim();
  if (!question || state.isAiBusy) return;

  if (!canUseAiQuota()) {
    $("#aiStatus").textContent = "今日免費 AI 次數已用完。";
    openMemberDialog();
    return;
  }

  const conversation = state.aiMessages.slice(-8);
  addAiMessage("user", `所問之事：${question}`);
  setAiBusy(true);
  $("#aiStatus").textContent = "正在用 AI 進行第一次解卦，本次會計入今日 AI 次數...";
  setInitialAiReadingResult("AI 正在依照你的問題、本卦、動爻與變卦做第一次解讀...");

  try {
    const result = await requestAiReply({
      phase: "reading",
      message: initialAiMessage(reading),
      reading: readingForAi(reading),
      conversation,
      member: {
        id: state.member?.id,
        plan: state.member?.plan || "free",
        quotaDate: state.member?.quotaDate
      }
    });
    if (result.quota) {
      applyRemoteQuota(result.quota);
    } else if (result.usedRemoteAi) {
      consumeAiQuota();
    }
    if (result.limitReached) openMemberDialog();
    addAiMessage("assistant", result.reply);
    setInitialAiReadingResult(result.reply);
  } catch (error) {
    console.warn("Unable to request initial AI reading.", error);
    $("#aiStatus").textContent = "AI 暫時沒有接通，先用卦典摘要回覆。";
    const fallbackReply = localAiReply(question, reading);
    addAiMessage("assistant", fallbackReply);
    setInitialAiReadingResult(fallbackReply);
  } finally {
    setAiBusy(false);
    updateAiMode();
  }
}

async function handleAiSubmit(event) {
  event.preventDefault();
  if (state.isAiBusy) return;

  const input = $("#aiQuestion");
  const message = input.value.trim();
  if (!message) return;

  if (!canUseAiQuota()) {
    $("#aiStatus").textContent = "今日免費 AI 次數已用完。";
    addAiMessage("assistant", "今日免費 AI 追問已用完。可以先看本卦、動爻與變卦，或等明天再繼續追問。");
    openMemberDialog();
    return;
  }

  const reading = getCurrentReading();
  const conversation = state.aiMessages.slice(-8);
  addAiMessage("user", message);
  input.value = "";
  setAiBusy(true);
  $("#aiStatus").textContent = state.isCasting ? "籌策中，正在接收補充..." : "正在請 AI 參照此卦...";

  try {
    const result = await requestAiReply({
      phase: state.isCasting || !reading ? "casting" : "reading",
      message,
      reading: readingForAi(reading),
      conversation,
      member: {
        id: state.member?.id,
        plan: state.member?.plan || "free",
        quotaDate: state.member?.quotaDate
      }
    });
    if (result.quota) {
      applyRemoteQuota(result.quota);
    } else if (result.usedRemoteAi) {
      consumeAiQuota();
    }
    if (result.limitReached) openMemberDialog();
    addAiMessage("assistant", result.reply);
  } catch (error) {
    console.warn("Unable to request AI reading.", error);
    $("#aiStatus").textContent = "AI 暫時沒有接通，先用卦典摘要回覆。";
    addAiMessage("assistant", localAiReply(message, reading));
  } finally {
    setAiBusy(false);
    updateAiMode();
    input.focus();
  }
}

function loadSharedReadingFromUrl() {
  const match = window.location.hash.match(/(?:^#|&)reading=([^&]+)/);
  if (!match) return;

  try {
    const reading = readingFromSharePayload(decodeSharePayload(match[1]));
    if (!reading) return;
    state.selectedDomain = reading.domainId;
    state.libraryDomain = reading.domainId;
    document.querySelectorAll("[data-domain]").forEach((item) => {
      item.setAttribute("aria-checked", String(item.dataset.domain === reading.domainId));
    });
    document.querySelectorAll("[data-library-domain]").forEach((item) => {
      item.setAttribute("aria-pressed", String(item.dataset.libraryDomain === reading.domainId));
    });
    renderLibrary();
    renderReading(reading);
    $("#shareStatus").textContent = "這是朋友分享給你的卦象結果。";
  } catch (error) {
    console.warn("Unable to load shared reading.", error);
  }
}

function saveReading(reading) {
  const history = getHistory();
  const compact = {
    id: reading.id,
    createdAt: reading.createdAt,
    question: reading.question,
    domainId: reading.domainId,
    primaryNo: reading.primaryNo,
    changedNo: reading.changedNo,
    moving: reading.moving
  };
  localStorage.setItem("iching-history", JSON.stringify([compact, ...history].slice(0, 8)));
  renderHistory();
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem("iching-history") || "[]");
  } catch {
    return [];
  }
}

function renderHistory() {
  const list = $("#historyList");
  const history = getHistory();
  if (history.length === 0) {
    list.innerHTML = '<div class="history-empty">尚無紀錄。</div>';
    return;
  }
  list.innerHTML = history
    .map((item) => {
      const hex = HEXAGRAM_BY_NO[item.primaryNo];
      const changed = HEXAGRAM_BY_NO[item.changedNo];
      const domain = domainById(item.domainId);
      const moving = item.moving.length ? `動爻 ${item.moving.join("、")}` : "無動爻";
      const question = item.question ? escapeHtml(item.question) : "未填問題";
      return `
        <button class="history-item" type="button" data-open-hex="${hex.no}">
          <span>
            <strong>${domain.label} · ${hex.name}</strong>
            <small>${question}</small>
            <small>${formatDate(item.createdAt)} · ${moving} · ${changed.name}</small>
          </span>
          <span class="tag">第 ${hex.no} 卦</span>
        </button>
      `;
    })
    .join("");
}

function renderLibrary() {
  const grid = $("#hexLibrary");
  const query = ($("#hexSearch").value || "").trim().toLowerCase();
  const domainId = state.libraryDomain;
  const filtered = HEXAGRAMS.filter((hex) => {
    const haystack = `${hex.no} ${hex.name} ${hex.theme} ${hex.summary} ${hex.keywords.join(" ")}`.toLowerCase();
    return !query || haystack.includes(query);
  });

  grid.innerHTML = filtered
    .map((hex) => {
      const detail = HEX_DETAIL_BY_NO[hex.no];
      const tri = trigramText(detail.lines);
      return `
        <button class="hex-card" type="button" data-open-hex="${hex.no}">
          <span class="hex-card-head"><span>第 ${hex.no} 卦</span><span>${TRIGRAMS[detail.upper].symbol}${TRIGRAMS[detail.lower].symbol}</span></span>
          <h3>${hex.name}</h3>
          <p>${hex.theme}</p>
          <p>${getDomainSnippet(hex, domainId)}</p>
          <span class="tag">${tri.label}</span>
        </button>
      `;
    })
    .join("");
}

function openHexDialog(no) {
  const hex = HEXAGRAM_BY_NO[Number(no)];
  if (!hex) return;
  const detail = HEX_DETAIL_BY_NO[hex.no];
  const tri = trigramText(detail.lines);
  const domainCells = DOMAINS.map((domain) => {
    return `<div class="dialog-cell"><strong>${domain.label}</strong><p>${getDomainSnippet(hex, domain.id)}</p></div>`;
  }).join("");

  $("#dialogBody").innerHTML = `
    <div class="dialog-content">
      <div class="hexagram-stage">
        <div class="hexagram-mark">${makeHexagramMark(detail.lines)}</div>
        <div class="hexagram-caption">
          <span>第 ${hex.no} 卦</span>
          <strong>${hex.name}</strong>
          <small>${tri.label}</small>
        </div>
      </div>
      <div>
        <p class="eyebrow">${hex.keywords.join(" · ")}</p>
        <h2>${hex.theme}</h2>
        <p>${hex.summary}</p>
      </div>
      <div class="dialog-matrix">${domainCells}</div>
      <div class="dialog-cell">
        <strong>宜避</strong>
        <p>${hex.caution}</p>
      </div>
    </div>
  `;
  $("#hexDialog").showModal();
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(iso));
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}

function setupInstall() {
  const button = $("#installButton");
  button.hidden = true;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.installPrompt = event;
    button.hidden = false;
  });

  button.addEventListener("click", async () => {
    if (!state.installPrompt) return;
    state.installPrompt.prompt();
    await state.installPrompt.userChoice;
    state.installPrompt = null;
    button.hidden = true;
  });
}

function setupEvents() {
  $("#oracleForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (state.isCasting) return;
    state.isCasting = true;
    const question = $("#question").value.trim();
    let completedReading = null;
    const castButton = $("#castButton");
    const clearButton = $("#clearButton");
    castButton.disabled = true;
    clearButton.disabled = true;
    castButton.querySelector("span").textContent = "籌策運行中";
    updateAiMode();

    try {
      const reading = await castReadingAnimated(question, state.selectedDomain);
      state.lastReading = reading;
      hideCastingPanel();
      renderReading(reading);
      saveReading(reading);
      completedReading = reading;
    } finally {
      state.isCasting = false;
      castButton.disabled = false;
      clearButton.disabled = false;
      castButton.querySelector("span").textContent = "籌策起卦";
      updateAiMode();
    }
    if (completedReading?.question) {
      requestInitialAiReading(completedReading);
    }
  });

  $("#clearButton").addEventListener("click", () => {
    $("#question").value = "";
    $("#question").focus();
  });

  $("#hexSearch").addEventListener("input", renderLibrary);
  $("#aiForm").addEventListener("submit", handleAiSubmit);
  $("#memberButton").addEventListener("click", openMemberDialog);
  $("#productOrderButton")?.addEventListener("click", openMemberDialog);
  $("#memberCheckoutForm").addEventListener("submit", handleMemberCheckoutSubmit);
  $("#memberLineButton").addEventListener("click", handleMemberLineContact);
  $("#copyAiConversationButton").addEventListener("click", copyAiConversation);
  $("#dailyPostGenerateButton").addEventListener("click", () => renderDailyFortunePost(true));
  $("#dailyPostCopyButton").addEventListener("click", copyDailyFortunePost);
  $("#shareResultButton").addEventListener("click", shareCurrentReading);
  $("#copyResultButton").addEventListener("click", copyCurrentReadingLink);
  window.addEventListener("hashchange", loadSharedReadingFromUrl);

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-hex]");
    if (button) openHexDialog(button.dataset.openHex);
  });

  $("#dialogClose").addEventListener("click", () => $("#hexDialog").close());
  $("#memberDialogClose").addEventListener("click", () => $("#memberDialog").close());
  $("#memberDialogBackButton")?.addEventListener("click", () => $("#memberDialog").close());
  $("#hexDialog").addEventListener("click", (event) => {
    if (event.target.id === "hexDialog") $("#hexDialog").close();
  });
  $("#memberDialog").addEventListener("click", (event) => {
    if (event.target.id === "memberDialog") $("#memberDialog").close();
  });
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register("./sw.js");
  } catch (error) {
    console.info("Service worker registration skipped.", error);
  }
}

function init() {
  renderDomains();
  setupEvents();
  setupInstall();
  initMembership();
  refreshOnlineMemberStatus();
  initAiAssistant();
  renderDailyFortunePost();
  renderLibrary();
  renderHistory();
  registerServiceWorker();
  loadSharedReadingFromUrl();
}

init();
