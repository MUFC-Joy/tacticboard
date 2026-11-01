/* 自动生成：node tools/collect-squads.mjs（勿手改，重跑脚本即可更新）
   数据来源：ESPN core API 2026 赛季（名单/号码/位置粗粒度/年龄/国籍/身高体重）
   + 精选库合并（中文名/惯用脚/技术特点/属性），_rosterMiss=精选库有但ESPN名单未匹配
   foot 空值=未查证；运行时 AI 联网补全后缓存到 localStorage
   生成时间：2026-11-01T18:50:29.712Z
*/
"use strict";
window.SQUADS_EU={
 "皇马": {
  league: "西甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "库尔图瓦",
    en: [
     "Courtois"
    ],
    pos: [
     "GK"
    ],
    foot: "左",
    club: "皇马",
    nat: "比利时",
    st: "门线型天花板：扑救覆盖+长传发动",
    tags: [
     "门线型"
    ],
    pair: [],
    d: "身高臂展把近角和远角都锁死，长传精准可以直接找前锋发动转换。",
    num: 1,
    age: 34,
    h: "6' 7\"",
    w: "212 lbs",
    _src: "curated"
   },
   {
    n: "阿森西奥",
    en: [
     "R. Asencio",
     "阿森西奥"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "皇马",
    nat: "西班牙",
    num: 2,
    st: "青训上抢型中卫",
    tags: [
     "上抢型"
    ],
    pair: [
     "惠伊森：青年双塔轮换"
    ],
    d: "卡斯蒂亚出品的皇马一线队常客：前顶凶狠+回追快，官方2号。",
    _src: "curated"
   },
   {
    n: "米利唐",
    en: [
     "Militao"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "皇马",
    nat: "巴西",
    st: "速度型中卫",
    tags: [
     "回追型"
    ],
    pair: [],
    d: "中卫里少见的冲刺速度，专治速度型前锋；伤病史是变量。",
    num: 3,
    age: 28,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "贝林厄姆",
    en: [
     "Bellingham"
    ],
    pos: [
     "AM",
     "CM",
     "ST"
    ],
    foot: "右",
    club: "皇马",
    nat: "英格兰",
    st: "全能10/8：后插上冲击型",
    tags: [
     "B2B",
     "伪10"
    ],
    pair: [
     "姆巴佩：他吸引你插上"
    ],
    d: "多特时期的后插上9号半打法封神；在皇马承担更多组织回撤，英格兰的进攻枢纽。",
    num: 5,
    age: 23,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "curated"
   },
   {
    n: "卡马文加",
    en: [
     "Camavinga"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "右",
    club: "皇马",
    nat: "法国",
    st: "缠斗型多面手中场",
    tags: [
     "破坏型"
    ],
    pair: [
     "楚阿梅尼：法国双闸"
    ],
    d: "抢断时机和转身摆脱都顶级，哪儿缺补哪儿。",
    num: 6,
    age: 23,
    h: "6' 0\"",
    w: "150 lbs",
    _src: "curated"
   },
   {
    n: "维尼修斯",
    en: [
     "Vinicius Jr"
    ],
    pos: [
     "LW",
     "ST"
    ],
    foot: "右",
    club: "皇马",
    nat: "巴西",
    st: "右脚左路：爆点型内切",
    tags: [
     "逆足内切"
    ],
    pair: [
     "姆巴佩：双星兼容难题"
    ],
    d: "一对一天花板级，纵向爆趟+内切射门；穆里尼奥要解决的第一道兼容题。",
    num: 7,
    age: 26,
    h: "5' 9\"",
    w: "170 lbs",
    _src: "curated"
   },
   {
    n: "巴尔韦德",
    en: [
     "Valverde"
    ],
    pos: [
     "CM",
     "RM"
    ],
    foot: "右",
    club: "皇马",
    nat: "乌拉圭",
    st: "B2B天花板：全场冲刺的发动机",
    tags: [
     "B2B"
    ],
    pair: [
     "楚阿梅尼：攻守分工"
    ],
    d: "禁区到禁区全勤，远射重炮+回追速度双武器，皇马体能的代名词。",
    num: 8,
    age: 28,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "恩德里克",
    en: [
     "Endrick"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 20,
    foot: null,
    h: "5' 8\"",
    w: "148 lbs",
    _src: "espn-zh"
   },
   {
    n: "姆巴佩",
    en: [
     "Mbappe"
    ],
    pos: [
     "ST",
     "LW"
    ],
    foot: "右",
    club: "皇马",
    nat: "法国",
    st: "速度型全能9：左路出身中锋化",
    tags: [
     "全能9"
    ],
    pair: [
     "贝林厄姆：他组织你冲刺"
    ],
    d: "从左路内切王改打中路：冲刺打身历史上第一档；穆里尼奥时代的皇马进攻轴心。",
    num: 10,
    age: 27,
    h: "5' 10\"",
    w: "163 lbs",
    _src: "curated"
   },
   {
    n: "罗德里戈",
    en: [
     "Rodrygo"
    ],
    pos: [
     "RW",
     "LW"
    ],
    foot: "右",
    club: "皇马",
    nat: "巴西",
    st: "双足边锋：无球型爆点",
    tags: [
     "顺足下底",
     "逆足内切"
    ],
    pair: [
     "维尼修斯：左右互换"
    ],
    d: "两路都能踢的无球型边锋：跑位聪明、大赛进球多，星光下的实用主义大师。",
    num: 11,
    age: 25,
    h: "5' 9\"",
    w: "139 lbs",
    _src: "curated"
   },
   {
    n: "阿诺德",
    en: [
     "Alexander-Arnold"
    ],
    pos: [
     "RB",
     "DM"
    ],
    foot: "右",
    club: "皇马",
    nat: "英格兰",
    st: "内收组织型：边后卫当四分卫",
    tags: [
     "内收型",
     "出球型"
    ],
    pair: [
     "楚阿梅尼：内收时中场搭档"
    ],
    d: "对角长传和肋部直塞是历史级武器；防守一对一是相对短板，靠位置感和体系藏。2025自由转会皇马。",
    num: 12,
    age: 28,
    h: "5' 9\"",
    w: "148 lbs",
    _src: "curated"
   },
   {
    n: "卢宁",
    en: [
     "Andriy Lunin"
    ],
    num: 13,
    pos: [
     "GK"
    ],
    nat: "乌克兰",
    age: 27,
    foot: null,
    h: "6' 3\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "楚阿梅尼",
    en: [
     "Tchouameni"
    ],
    pos: [
     "DM",
     "CB"
    ],
    foot: "右",
    club: "皇马",
    nat: "法国",
    st: "破坏型6号/客串中卫",
    tags: [
     "破坏型"
    ],
    pair: [
     "卡马文加:双6轮换"
    ],
    d: "拦截覆盖面大，客串中卫也稳；皇马中场的保险丝。",
    num: 14,
    age: 26,
    h: "6' 2\"",
    w: "179 lbs",
    _src: "curated"
   },
   {
    n: "阿尔达·居莱尔",
    en: [
     "Arda Güler"
    ],
    num: 15,
    pos: [
     "MF"
    ],
    nat: "Türkiye",
    age: 21,
    foot: null,
    h: "5' 9\"",
    w: "148 lbs",
    _src: "espn-zh"
   },
   {
    n: "科纳特",
    en: [
     "Konate"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "皇马",
    nat: "法国",
    st: "速度+对抗型中卫",
    tags: [
     "上抢型"
    ],
    pair: [
     "吕迪格/惠伊森：皇马中卫轮转"
    ],
    d: "2026夏窗从利物浦加盟伯纳乌：回追速度顶级；伤病史是变量。穆里尼奥的对抗拼图。",
    num: 16,
    age: 27,
    h: "6' 4\"",
    w: "207 lbs",
    _src: "curated"
   },
   {
    n: "卡雷拉斯",
    en: [
     "A. Carreras",
     "卡雷拉斯"
    ],
    pos: [
     "LB",
     "LWB"
    ],
    foot: "左",
    club: "皇马",
    nat: "西班牙",
    num: 18,
    st: "攻击型左后卫：缠斗+套边",
    tags: [
     "套边型"
    ],
    pair: [
     "库库雷利亚：左路轮换"
    ],
    d: "从本菲卡加盟的西班牙左闸：左脚+对抗+往返，官方18号——穆里尼奥两翼拼图的最后一块。",
    _src: "curated"
   },
   {
    n: "Carlos Espí",
    en: [
     "Carlos Espí"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "西班牙",
    age: 21,
    foot: null,
    h: "6' 1\"",
    w: "196 lbs",
    _src: "espn"
   },
   {
    n: "B席",
    en: [
     "Bernardo Silva"
    ],
    num: 20,
    pos: [
     "MF"
    ],
    nat: "葡萄牙",
    age: 32,
    foot: null,
    h: "5' 8\"",
    w: "139 lbs",
    _src: "espn-zh"
   },
   {
    n: "布拉欣·迪亚斯",
    en: [
     "Brahim Díaz"
    ],
    num: 21,
    pos: [
     "MF"
    ],
    nat: "摩洛哥",
    age: 27,
    foot: null,
    h: "5' 7\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "吕迪格",
    en: [
     "Rudiger"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "皇马",
    nat: "德国",
    st: "心理战型上抢中卫",
    tags: [
     "上抢型"
    ],
    pair: [
     "科纳特：新老对抗组合"
    ],
    d: "对抗凶狠+垃圾话大师，把前锋惹毛也是战术；穆里尼奥会喜欢这种。",
    num: 22,
    age: 33,
    h: "6' 3\"",
    w: "185 lbs",
    _src: "curated"
   },
   {
    n: "Ferland Mendy",
    en: [
     "Ferland Mendy"
    ],
    num: 23,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 31,
    foot: null,
    h: "5' 11\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Yan Diomande",
    en: [
     "Yan Diomande"
    ],
    num: 25,
    pos: [
     "FW"
    ],
    nat: "科特迪瓦",
    age: 19,
    foot: null,
    h: "5' 11\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "Sergio Mestre",
    en: [
     "Sergio Mestre"
    ],
    num: 26,
    pos: [
     "GK"
    ],
    nat: "西班牙",
    age: 21,
    foot: null,
    h: "6' 4\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Thiago Pitarch",
    en: [
     "Thiago Pitarch"
    ],
    num: 27,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 19,
    foot: null,
    h: "5' 9\"",
    w: "146 lbs",
    _src: "espn"
   },
   {
    n: "Jesús Fortea",
    en: [
     "Jesús Fortea"
    ],
    num: 28,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 19,
    foot: null,
    h: "5' 9\"",
    w: "137 lbs",
    _src: "espn"
   },
   {
    n: "Jorge Cestero",
    en: [
     "Jorge Cestero"
    ],
    num: 29,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 20,
    foot: null,
    h: "5' 11\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "Joan Martínez",
    en: [
     "Joan Martínez"
    ],
    num: 30,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 19,
    foot: null,
    h: "6' 4\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Javier Navarro",
    en: [
     "Javier Navarro"
    ],
    num: 31,
    pos: [
     "GK"
    ],
    nat: "西班牙",
    age: 19,
    foot: null,
    h: "5' 11\"",
    w: "165 lbs",
    _src: "espn"
   },
   {
    n: "Mario Rivas",
    en: [
     "Mario Rivas"
    ],
    num: 33,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 19,
    foot: null,
    h: "6' 2\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Daniel Yañez",
    en: [
     "Daniel Yañez"
    ],
    num: 35,
    pos: [
     "FW"
    ],
    nat: "西班牙",
    age: 19,
    foot: null,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Alexis Ciria",
    en: [
     "Alexis Ciria"
    ],
    num: 36,
    pos: [
     "MF"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Illia Voloshyn",
    en: [
     "Illia Voloshyn"
    ],
    num: 39,
    pos: [
     "GK"
    ],
    nat: "乌克兰",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "惠伊森",
    en: [
     "Huijsen"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "皇马",
    nat: "西班牙",
    st: "出球型年轻中卫",
    tags: [
     "出球型"
    ],
    pair: [],
    d: "2025夏窗伯纳乌新援：19岁踢英超的水平，长传调度像中场。",
    _src: "curated"
   },
   {
    n: "库库雷利亚",
    en: [
     "Cucurella"
    ],
    pos: [
     "LB",
     "LWB"
    ],
    foot: "左",
    club: "皇马",
    nat: "西班牙",
    st: "缠斗型攻击左后卫",
    tags: [
     "攻击型"
    ],
    pair: [
     "邓弗里斯：银河战舰两翼"
    ],
    d: "2026夏窗从切尔西加盟皇马：上抢凶、脚下稳，欧洲杯冠军主力；穆里尼奥的左路答案。",
    _src: "curated"
   },
   {
    n: "卡瓦哈尔",
    en: [
     "Carvajal"
    ],
    pos: [
     "RB"
    ],
    foot: "右",
    club: "皇马",
    nat: "西班牙",
    st: "老牌攻守均衡右后卫",
    tags: [
     "套边型"
    ],
    pair: [],
    d: "大满贯右后卫：血性+战术理解是穆氏皇马需要的 Leader。伤病史是变量。",
    _src: "curated"
   },
   {
    n: "邓弗里斯",
    en: [
     "Dumfries"
    ],
    pos: [
     "RB",
     "RWB"
    ],
    foot: "右",
    club: "皇马",
    nat: "荷兰",
    st: "翼卫型攻击右后卫：插上重炮",
    tags: [
     "攻击型",
     "翼卫"
    ],
    pair: [
     "达米安?离队——以现役为准"
    ],
    d: "荷兰式边路冲击+后插上头球，欧冠大赛型选手。<b>皇马传闻未进官方名单</b>——2026夏窗的官宣口径里没有他，去留以国米官方为准。",
    _src: "curated"
   }
  ]
 },
 "巴萨": {
  league: "西甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "乔安·加西亚",
    en: [
     "Joan García"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "西班牙",
    age: 25,
    foot: null,
    h: "6' 4\"",
    w: "185 lbs",
    _src: "espn-zh"
   },
   {
    n: "坎塞洛",
    en: [
     "Cancelo"
    ],
    pos: [
     "RB",
     "LB",
     "DM"
    ],
    foot: "右",
    club: "巴萨",
    nat: "葡萄牙",
    st: "内收型边后卫鼻祖级",
    tags: [
     "内收型",
     "攻击型"
    ],
    pair: [
     "巴尔德：左路轮换"
    ],
    d: "自由身回归巴萨：inverted 边后卫玩法的全球推广者，攻强守随缘——第二次效力巴萨。",
    num: 2,
    age: 32,
    h: "6' 0\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "巴尔德",
    en: [
     "Balde"
    ],
    pos: [
     "LB",
     "LWB"
    ],
    foot: "左",
    club: "巴萨",
    nat: "西班牙",
    st: "速度型攻击左后卫",
    tags: [
     "套边型"
    ],
    pair: [
     "亚马尔：他内切我套边"
    ],
    d: "直线速度打身后，亚马尔内切时他承包整条左边。",
    num: 3,
    age: 23,
    h: "5' 10\"",
    w: "168 lbs",
    _src: "curated"
   },
   {
    n: "Brian Fariñas",
    en: [
     "Brian Fariñas"
    ],
    num: 4,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 20,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "库巴西",
    en: [
     "Cubarsi"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "巴萨",
    nat: "西班牙",
    st: "出球型少年老成",
    tags: [
     "出球型"
    ],
    pair: [
     "阿劳霍：他上抢你出球"
    ],
    d: "出球线路选择成熟，弗里克超高位线的清道夫。",
    num: 5,
    age: 19,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "加维",
    en: [
     "Gavi"
    ],
    pos: [
     "CM"
    ],
    foot: "右",
    club: "巴萨",
    nat: "西班牙",
    st: "斗犬型B2B",
    tags: [
     "B2B"
    ],
    pair: [],
    d: "伤愈回归：逼抢强度和好胜心是全队标杆。",
    num: 6,
    age: 22,
    h: "5' 9\"",
    w: "150 lbs",
    _src: "curated"
   },
   {
    n: "费尔明·洛佩斯",
    en: [
     "Fermín López"
    ],
    num: 7,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 23,
    foot: null,
    h: "5' 9\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "佩德里",
    en: [
     "Pedri"
    ],
    pos: [
     "CM",
     "AM"
    ],
    foot: "右",
    club: "巴萨",
    nat: "西班牙",
    st: "现代组织8的完美答案",
    tags: [
     "组织8",
     "节拍器"
    ],
    pair: [
     "亚马尔：右肋连线",
     "德容:双核轮转"
    ],
    d: "2026世界杯冠军中场核心：转身摆脱+一脚出球+肋部渗透全都会，防守也肯跑。巴萨和西班牙的节拍器。",
    num: 8,
    age: 23,
    h: "5' 9\"",
    w: "150 lbs",
    _src: "curated"
   },
   {
    n: "热苏斯",
    en: [
     "G. Jesus"
    ],
    pos: [
     "ST",
     "LW",
     "RW"
    ],
    foot: "右",
    club: "巴萨",
    nat: "巴西",
    st: "逼抢型全能前锋",
    tags: [
     "逼抢9",
     "伪9"
    ],
    pair: [
     "莱万：轮换搭档"
    ],
    d: "2026夏窗1000万欧低价加盟巴萨：压迫+串联+三前锋位都能踢，弗里克前场的万金油。",
    num: 9,
    age: 29,
    h: "5' 9\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "亚马尔",
    en: [
     "Yamal"
    ],
    pos: [
     "RW"
    ],
    foot: "左",
    club: "巴萨",
    nat: "西班牙",
    st: "左脚右路：内切+直塞双威胁",
    tags: [
     "逆足内切"
    ],
    pair: [
     "佩德里：右肋连线",
     "巴尔德:套边接应"
    ],
    d: "2026世界杯冠军核心：18岁就是世界第一右边锋候选——内切射门、外线爆趟、肋部直塞全都会。逆足内切流派的当代天花板。",
    num: 10,
    age: 19,
    h: "5' 10\"",
    w: "168 lbs",
    _src: "curated"
   },
   {
    n: "拉菲尼亚",
    en: [
     "Raphinha"
    ],
    pos: [
     "LW",
     "RW",
     "ST"
    ],
    foot: "左",
    club: "巴萨",
    nat: "巴西",
    st: "左脚双翼：内锋式冲击",
    tags: [
     "内锋",
     "逆足内切"
    ],
    pair: [
     "亚马尔：两翼互换"
    ],
    d: "名义边锋实际往禁区里砸：后点包抄+高位逼抢第一线，2025金球奖级表现；两翼都能打。",
    num: 11,
    age: 29,
    h: "5' 9\"",
    w: "139 lbs",
    _src: "curated"
   },
   {
    n: "Xavi Espart",
    en: [
     "Xavi Espart"
    ],
    num: 12,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 19,
    foot: null,
    h: "5' 9\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Wojciech Szczesny",
    en: [
     "Wojciech Szczesny"
    ],
    num: 13,
    pos: [
     "GK"
    ],
    nat: "波兰",
    age: 36,
    foot: null,
    h: "6' 5\"",
    w: "212 lbs",
    _src: "espn"
   },
   {
    n: "克里斯滕森",
    en: [
     "Andreas Christensen"
    ],
    num: 15,
    pos: [
     "DF"
    ],
    nat: "丹麦",
    age: 30,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "罗德里",
    en: [
     "Rodri"
    ],
    pos: [
     "DM"
    ],
    foot: "右",
    club: "巴萨",
    nat: "西班牙",
    st: "拖后组织核心的世界第一人（健康时）",
    tags: [
     "拖后组织",
     "节拍器"
    ],
    pair: [
     "佩德里：巴萨中场双核",
     "德容:轮转搭档"
    ],
    d: "2024金球奖：位置感、出球、远射、对抗全满贯。<b>2026夏窗7650万欧转投巴萨，被当作「新布斯克茨」打造</b>（合同至2030）——弗里克激进的高位体系缺的就是他这个位置的秩序。2024重伤时曼城的崩盘是他价值的最硬证据。",
    num: 16,
    age: 30,
    h: "6' 3\"",
    w: "196 lbs",
    _src: "curated"
   },
   {
    n: "杰拉德·马丁",
    en: [
     "Gerard Martín"
    ],
    num: 18,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 24,
    foot: null,
    h: "6' 1\"",
    w: "181 lbs",
    _src: "espn-zh"
   },
   {
    n: "鲁尼·巴尔吉",
    en: [
     "Roony Bardghji"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "瑞典",
    age: 20,
    foot: null,
    h: "5' 8\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "阿德耶米",
    en: [
     "Adeyemi"
    ],
    pos: [
     "LW",
     "RW"
    ],
    foot: "右",
    club: "巴萨",
    nat: "德国",
    num: 19,
    age: 24,
    season: "12场1球2助",
    st: "极速爆点：直线冲刺",
    tags: [
     "逆足内切"
    ],
    pair: [
     "亚马尔：两翼轮换"
    ],
    d: "2026夏窗从多特蒙德转投巴萨：德甲最快球员之一，打身后和转换的大杀器——弗里克两翼再添一枚核弹，也是德国队（克洛普）边路主力候选。",
    _src: "curated"
   },
   {
    n: "Marc Bernal",
    en: [
     "Marc Bernal"
    ],
    num: 22,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 19,
    foot: null,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "孔德",
    en: [
     "Kounde"
    ],
    pos: [
     "CB",
     "RB"
    ],
    foot: "右",
    club: "巴萨",
    nat: "法国",
    st: "多面手防线核心",
    tags: [
     "多面手"
    ],
    pair: [],
    d: "右后卫/中卫双料，出球稳，弗里克防线的右轴。",
    num: 23,
    age: 27,
    h: "5' 11\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "Dominik Livakovic",
    en: [
     "Dominik Livakovic"
    ],
    num: 25,
    pos: [
     "GK"
    ],
    nat: "克罗地亚",
    age: 31,
    foot: null,
    h: "6' 2\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Jesse Bisiwu",
    en: [
     "Jesse Bisiwu"
    ],
    num: 27,
    pos: [
     "FW"
    ],
    nat: "比利时",
    age: 18,
    foot: null,
    h: "5' 11\"",
    w: "146 lbs",
    _src: "espn"
   },
   {
    n: "Hamza Abdelkarim",
    en: [
     "Hamza Abdelkarim"
    ],
    num: 29,
    pos: [
     "FW"
    ],
    nat: "埃及",
    age: 18,
    foot: null,
    h: "6' 0\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "Ebrima Tunkara",
    en: [
     "Ebrima Tunkara"
    ],
    num: 30,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 16,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Eder Aller",
    en: [
     "Eder Aller"
    ],
    num: 31,
    pos: [
     "GK"
    ],
    nat: "西班牙",
    age: 19,
    foot: null,
    h: "6' 4\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Orian Goren",
    en: [
     "Orian Goren"
    ],
    num: 32,
    pos: [
     "MF"
    ],
    nat: "以色列",
    age: 17,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Jordi Pesquer",
    en: [
     "Jordi Pesquer"
    ],
    num: 33,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 17,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Iker Rodríguez",
    en: [
     "Iker Rodríguez"
    ],
    num: 35,
    pos: [
     "GK"
    ],
    nat: "西班牙",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Guillem Víctor",
    en: [
     "Guillem Víctor"
    ],
    num: 40,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Álex Campos",
    en: [
     "Álex Campos"
    ],
    num: 41,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "德容",
    en: [
     "F. de Jong"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "巴萨",
    nat: "荷兰",
    st: "带球推进型中场",
    tags: [
     "组织8",
     "B2B"
    ],
    pair: [
     "佩德里：双核"
    ],
    d: "从后场带球碾过中场的推进是标识，攻防两端的节拍器。",
    _src: "curated"
   },
   {
    n: "奥尔莫",
    en: [
     "Olmo"
    ],
    pos: [
     "AM",
     "CM",
     "LW"
    ],
    foot: "右",
    club: "巴萨",
    nat: "西班牙",
    st: "肋部自由人：无球插上型10",
    tags: [
     "自由10"
    ],
    pair: [
     "佩德里：双核轮转"
    ],
    d: "欧洲杯冠军：不占球权、后插上时机世界级，小空间摆脱极强。",
    _src: "curated"
   },
   {
    n: "戈登",
    en: [
     "Gordon"
    ],
    pos: [
     "LW",
     "ST"
    ],
    foot: "右",
    club: "巴萨",
    nat: "英格兰",
    st: "右脚左路：转换冲刺流",
    tags: [
     "逆足内切"
    ],
    pair: [
     "沃尔特马德：高球+速度搭配"
    ],
    d: "直线速度打高位线身后，纽卡转换进攻的箭头。",
    _src: "curated"
   }
  ]
 },
 "马竞": {
  league: "西甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "Juan Musso",
    en: [
     "Juan Musso"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "阿根廷",
    age: 32,
    foot: null,
    h: "6' 3\"",
    w: "203 lbs",
    _src: "espn"
   },
   {
    n: "Obed Vargas",
    en: [
     "Obed Vargas"
    ],
    num: 3,
    pos: [
     "MF"
    ],
    nat: "墨西哥",
    age: 21,
    foot: null,
    h: "5' 9\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Rodrigo Mendoza",
    en: [
     "Rodrigo Mendoza"
    ],
    num: 4,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 21,
    foot: null,
    h: "6' 0\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "约翰尼·卡多索",
    en: [
     "Johnny Cardoso"
    ],
    num: 5,
    pos: [
     "MF"
    ],
    nat: "美国",
    age: 25,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "科克",
    en: [
     "Koke"
    ],
    num: 6,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 34,
    foot: null,
    h: "5' 9\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "Lee Kang-In",
    en: [
     "Lee Kang-In"
    ],
    num: 7,
    pos: [
     "MF"
    ],
    nat: "韩国",
    age: 25,
    foot: null,
    h: "5' 8\"",
    w: "146 lbs",
    _src: "espn"
   },
   {
    n: "巴勃罗·巴里奥斯",
    en: [
     "Pablo Barrios"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 23,
    foot: null,
    h: "6' 0\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "瑟尔洛特",
    en: [
     "Alexander Sørloth"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "挪威",
    age: 30,
    foot: null,
    h: "6' 5\"",
    w: "205 lbs",
    _src: "espn-zh"
   },
   {
    n: "Álex Baena",
    en: [
     "Álex Baena"
    ],
    num: 10,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 25,
    foot: null,
    h: "5' 9\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Ademola Lookman",
    en: [
     "Ademola Lookman"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "尼日利亚",
    age: 29,
    foot: null,
    h: "5' 9\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "奥布拉克",
    en: [
     "Jan Oblak"
    ],
    num: 13,
    pos: [
     "GK"
    ],
    nat: "斯洛文尼亚",
    age: 33,
    foot: null,
    h: "6' 2\"",
    w: "192 lbs",
    _src: "espn-zh"
   },
   {
    n: "马科斯·略伦特",
    en: [
     "Marcos Llorente"
    ],
    num: 14,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 31,
    foot: null,
    h: "6' 0\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jonathan David",
    en: [
     "Jonathan David"
    ],
    num: 15,
    pos: [
     "FW"
    ],
    nat: "加拿大",
    age: 26,
    foot: null,
    h: "5' 10\"",
    w: "179 lbs",
    _src: "espn"
   },
   {
    n: "Arnau Ortiz",
    en: [
     "Arnau Ortiz"
    ],
    num: 16,
    pos: [
     "FW"
    ],
    nat: "西班牙",
    age: 25,
    foot: null,
    h: "5' 9\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "戴维·汉茨科",
    en: [
     "Dávid Hancko"
    ],
    num: 17,
    pos: [
     "DF"
    ],
    nat: "斯洛伐克",
    age: 28,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn-zh"
   },
   {
    n: "马克·普比尔",
    en: [
     "Marc Pubill"
    ],
    num: 18,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 23,
    foot: null,
    h: "6' 3\"",
    w: "190 lbs",
    _src: "espn-zh"
   },
   {
    n: "朱利亚诺·西蒙尼",
    en: [
     "Giuliano Simeone"
    ],
    num: 20,
    pos: [
     "FW"
    ],
    nat: "阿根廷",
    age: 23,
    foot: null,
    h: "5' 8\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "罗梅罗",
    en: [
     "C. Romero"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "马德里竞技",
    nat: "阿根廷",
    st: "世界冠军斗犬中卫",
    tags: [
     "上抢型"
    ],
    pair: [],
    d: "2026-08 转会马德里竞技；世界杯冠军主力中卫，缠斗+出球+情绪管理是双刃剑。",
    weak: "待确认",
    weakNote: "本轮只审热刺；马竞版本未审。2026-08 转会马德里竞技，不在热刺 2026-27 名单。",
    num: 21,
    age: 28,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "Alejandro Grimaldo",
    en: [
     "Alejandro Grimaldo"
    ],
    num: 22,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 31,
    foot: null,
    h: "5' 7\"",
    w: "139 lbs",
    _src: "espn"
   },
   {
    n: "Morten Hjulmand",
    en: [
     "Morten Hjulmand"
    ],
    num: 23,
    pos: [
     "MF"
    ],
    nat: "丹麦",
    age: 27,
    foot: null,
    h: "6' 1\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "勒诺尔芒",
    en: [
     "Lenormand"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "马德里竞技",
    nat: "西班牙",
    st: "出球型中卫",
    tags: [
     "出球型"
    ],
    pair: [],
    d: "皇家社会青训：出球冷静，西蒙尼防线的现代化改造。",
    num: 24,
    age: 29,
    h: "6' 2\"",
    w: "174 lbs",
    _src: "curated"
   },
   {
    n: "Salvi Esquivel",
    en: [
     "Salvi Esquivel"
    ],
    num: 25,
    pos: [
     "GK"
    ],
    nat: "西班牙",
    age: 21,
    foot: null,
    h: "6' 3\"",
    w: "185 lbs",
    _src: "espn"
   },
   {
    n: "Jorge Domínguez",
    en: [
     "Jorge Domínguez"
    ],
    num: 27,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 16,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Miguel Cubo",
    en: [
     "Miguel Cubo"
    ],
    num: 29,
    pos: [
     "FW"
    ],
    nat: "西班牙",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Daniel Martinez",
    en: [
     "Daniel Martinez"
    ],
    num: 30,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 22,
    foot: null,
    h: "6' 1\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Arnau Solà",
    en: [
     "Arnau Solà"
    ],
    num: 32,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 23,
    foot: null,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Javier Gil",
    en: [
     "Javier Gil"
    ],
    num: 45,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 20,
    foot: null,
    h: "6' 4\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Jorge Castillo",
    en: [
     "Jorge Castillo"
    ],
    num: 46,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 20,
    foot: null,
    h: "5' 11\"",
    w: "",
    _src: "espn"
   },
   {
    n: "阿尔瓦雷斯",
    en: [
     "J. Alvarez"
    ],
    pos: [
     "ST",
     "AM"
    ],
    foot: "左",
    club: "马德里竞技",
    nat: "阿根廷",
    st: "全能9/10：跑动+串联+终结",
    tags: [
     "全能9",
     "伪9"
    ],
    pair: [
     "格列兹曼：双核轮转"
    ],
    d: "世界杯冠军成员：梅西身后的九号半，跑动和串联是马竞进攻的新轴。",
    _src: "curated"
   }
  ]
 },
 "米兰": {
  league: "意甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "Pietro Terracciano",
    en: [
     "Pietro Terracciano"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "意大利",
    age: 36,
    foot: null,
    h: "6' 4\"",
    w: "185 lbs",
    _src: "espn"
   },
   {
    n: "埃斯图皮尼安",
    en: [
     "Estupinan"
    ],
    pos: [
     "LWB",
     "LB"
    ],
    foot: "左",
    club: "米兰",
    nat: "厄瓜多尔",
    st: "攻击型左翼卫",
    tags: [
     "翼卫",
     "攻击型"
    ],
    pair: [
     "莱奥：左路提速双人组"
    ],
    d: "布莱顿时期的进攻翼卫，2025夏窗加盟米兰——阿莫林三中卫体系的左翼卫答案。",
    num: 2,
    age: 28,
    h: "5' 9\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "科尼·德温特",
    en: [
     "Koni De Winter"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "比利时",
    age: 24,
    foot: null,
    h: "6' 3\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "洛夫图斯-奇克",
    en: [
     "Ruben Loftus-Cheek"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 30,
    foot: null,
    h: "6' 3\"",
    w: "192 lbs",
    _src: "espn-zh"
   },
   {
    n: "普利西奇",
    en: [
     "Pulisic"
    ],
    pos: [
     "RW",
     "LW",
     "AM"
    ],
    foot: "左",
    club: "米兰",
    nat: "美国",
    st: "左脚右路：无球型全能攻击手",
    tags: [
     "逆足内切"
    ],
    pair: [
     "拉莫斯：右路喂哺新9号"
    ],
    d: "跑动聪明+最后一传稳定，美国队长——莱奥走后他就是米兰进攻的第一轴。",
    num: 11,
    age: 28,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "拉比奥",
    en: [
     "Adrien Rabiot"
    ],
    num: 12,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 31,
    foot: null,
    h: "6' 3\"",
    w: "190 lbs",
    _src: "espn-zh"
   },
   {
    n: "Sankhoun Diawara",
    en: [
     "Sankhoun Diawara"
    ],
    num: 13,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 20,
    foot: null,
    h: "6' 2\"",
    w: "",
    _src: "espn"
   },
   {
    n: "莫德里奇",
    en: [
     "Luka Modric"
    ],
    num: 14,
    pos: [
     "MF"
    ],
    nat: "克罗地亚",
    age: 41,
    foot: null,
    h: "5' 8\"",
    w: "146 lbs",
    _src: "espn-zh"
   },
   {
    n: "迈尼昂",
    en: [
     "Mike Maignan"
    ],
    num: 16,
    pos: [
     "GK"
    ],
    nat: "法国",
    age: 31,
    foot: null,
    h: "6' 3\"",
    w: "194 lbs",
    _src: "espn-zh"
   },
   {
    n: "奥马里·哈钦森",
    en: [
     "Omari Hutchinson"
    ],
    num: 20,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 23,
    foot: null,
    h: "5' 9\"",
    w: "141 lbs",
    _src: "espn-zh"
   },
   {
    n: "Samuel Chukwueze",
    en: [
     "Samuel Chukwueze"
    ],
    num: 21,
    pos: [
     "FW"
    ],
    nat: "尼日利亚",
    age: 27,
    foot: null,
    h: "5' 8\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "迭戈·莫雷拉",
    en: [
     "Diego Moreira"
    ],
    pos: [
     "LW",
     "LWB"
    ],
    foot: "右",
    club: "米兰",
    nat: "葡萄牙",
    st: "速度型边锋/翼卫两栖",
    tags: [
     "顺足下底",
     "翼卫"
    ],
    pair: [],
    d: "切尔西青训出品：左路爆趟，阿莫林体系里翼卫/边锋两栖的年轻选项。",
    num: 22,
    age: 22,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "托莫里",
    en: [
     "Fikayo Tomori"
    ],
    num: 23,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 28,
    foot: null,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "Christian Comotto",
    en: [
     "Christian Comotto"
    ],
    num: 28,
    pos: [
     "MF"
    ],
    nat: "意大利",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Ardon Jashari",
    en: [
     "Ardon Jashari"
    ],
    num: 30,
    pos: [
     "MF"
    ],
    nat: "瑞士",
    age: 24,
    foot: null,
    h: "5' 11\"",
    w: "179 lbs",
    _src: "espn"
   },
   {
    n: "斯特拉希尼亚·帕夫洛维奇",
    en: [
     "Strahinja Pavlovic"
    ],
    num: 31,
    pos: [
     "DF"
    ],
    nat: "塞尔维亚",
    age: 25,
    foot: null,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "espn-zh"
   },
   {
    n: "Davide Bartesaghi",
    en: [
     "Davide Bartesaghi"
    ],
    num: 33,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 20,
    foot: null,
    h: "6' 4\"",
    w: "190 lbs",
    _src: "espn"
   },
   {
    n: "马里奥·吉拉",
    en: [
     "Mario Gila"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "米兰",
    nat: "西班牙",
    st: "出球型中卫",
    tags: [
     "出球型"
    ],
    pair: [],
    d: "拉齐奥出品的西班牙出球中卫，2026夏窗加盟——阿莫林三中卫体系的左/居中出球点。",
    num: 34,
    age: 26,
    h: "6' 1\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "Valeri Vladimirov",
    en: [
     "Valeri Vladimirov"
    ],
    num: 35,
    pos: [
     "DF"
    ],
    nat: "保加利亚",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Lorenzo Ossola",
    en: [
     "Lorenzo Ossola"
    ],
    num: 40,
    pos: [
     "MF"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Léo-Paul Bouyer",
    en: [
     "Léo-Paul Bouyer"
    ],
    num: 41,
    pos: [
     "GK"
    ],
    nat: "法国",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Matteo Gabbia",
    en: [
     "Matteo Gabbia"
    ],
    num: 46,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 27,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Nirash Raffaello Perera",
    en: [
     "Nirash Raffaello Perera"
    ],
    num: 47,
    pos: [
     "DF"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "El Hadji Malick Cissé",
    en: [
     "El Hadji Malick Cissé"
    ],
    num: 48,
    pos: [
     "DF"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Luca Menon",
    en: [
     "Luca Menon"
    ],
    num: 49,
    pos: [
     "FW"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Silvano Vos",
    en: [
     "Silvano Vos"
    ],
    num: 55,
    pos: [
     "MF"
    ],
    nat: "荷兰",
    age: 21,
    foot: null,
    h: "6' 2\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "萨勒马科尔斯",
    en: [
     "Alexis Saelemaekers"
    ],
    num: 56,
    pos: [
     "FW"
    ],
    nat: "比利时",
    age: 27,
    foot: null,
    h: "5' 11\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "Francesco Camarda",
    en: [
     "Francesco Camarda"
    ],
    num: 73,
    pos: [
     "FW"
    ],
    nat: "意大利",
    age: 18,
    foot: null,
    h: "6' 0\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "Yunus Musah",
    en: [
     "Yunus Musah"
    ],
    num: 80,
    pos: [
     "MF"
    ],
    nat: "美国",
    age: 23,
    foot: null,
    h: "5' 10\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "Lorenzo Torriani",
    en: [
     "Lorenzo Torriani"
    ],
    num: 96,
    pos: [
     "GK"
    ],
    nat: "意大利",
    age: 21,
    foot: null,
    h: "6' 6\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "布拉欣·迪亚斯",
    en: [
     "Brahim Diaz"
    ],
    pos: [
     "AM",
     "RW"
    ],
    foot: "左",
    club: "米兰",
    nat: "西班牙",
    st: "小快灵肋部攻击手",
    tags: [
     "自由10"
    ],
    pair: [
     "莱奥：右路喂哺"
    ],
    d: "皇马出品的肋部小精灵：盘带+直塞，米兰进攻的二线创造力。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "贡萨洛·拉莫斯",
    en: [
     "Goncalo Ramos"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "米兰",
    nat: "葡萄牙",
    st: "禁区抢点型9：支点+终结",
    tags: [
     "抢点型",
     "支点"
    ],
    pair: [
     "普利西奇：右路喂哺"
    ],
    d: "2026夏窗7000万欧+破米兰队史纪录加盟——阿莫林钦点的单箭头：背身+抢点+压迫全能，葡萄牙世界杯替补席上憋出来的主力级。",
    _src: "curated"
   }
  ]
 },
 "国米": {
  league: "意甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "比塞克",
    en: [
     "Bisseck",
     "比塞克"
    ],
    pos: [
     "CB",
     "RB"
    ],
    foot: "右",
    club: "国米",
    nat: "德国",
    num: 2,
    age: 25,
    season: "—",
    st: "速度型年轻中卫",
    tags: [
     "回追型"
    ],
    pair: [
     "帕瓦尔?已离队——以现役为准"
    ],
    d: "国际米兰的德国年轻中卫：1米96+冲刺速度，克洛普防线的新生代。",
    h: "6' 5\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "Aleksandar Stankovic",
    en: [
     "Aleksandar Stankovic"
    ],
    num: 5,
    pos: [
     "MF"
    ],
    nat: "塞尔维亚",
    age: 21,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "斯通斯",
    en: [
     "Stones"
    ],
    pos: [
     "CB",
     "DM"
    ],
    foot: "右",
    club: "国米",
    nat: "英格兰",
    st: "内收边后腰/中后场自由人的鼻祖",
    tags: [
     "出球型",
     "内收型"
    ],
    pair: [
     "罗德里：内收时中路双保险"
    ],
    d: "从中卫内收进中场的玩法由他发扬光大：防线+中场随时切换人数。",
    weak: "伤病史",
    weakNote: "【可用性风险】2026-02 官网仍称其因伤缺阵；2026夏转投国米。离队行，若改挂国米需在写入阶段复核出勤。",
    num: 6,
    age: 32,
    h: "6' 2\"",
    w: "174 lbs",
    _src: "curated"
   },
   {
    n: "泽林斯基",
    en: [
     "Piotr Zielinski"
    ],
    num: 7,
    pos: [
     "MF"
    ],
    nat: "波兰",
    age: 32,
    foot: null,
    h: "5' 11\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "彼得·苏契奇",
    en: [
     "Petar Sucic"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "克罗地亚",
    age: 23,
    foot: null,
    h: "6' 0\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "劳塔罗·马丁内斯",
    en: [
     "Lautaro Martínez"
    ],
    num: 10,
    pos: [
     "FW"
    ],
    nat: "阿根廷",
    age: 29,
    foot: null,
    h: "5' 9\"",
    w: "152 lbs",
    _src: "espn-zh"
   },
   {
    n: "路易斯·恩里克",
    en: [
     "Luis Henrique"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 24,
    foot: null,
    h: "5' 11\"",
    w: "185 lbs",
    _src: "espn-zh"
   },
   {
    n: "Raffaele Di Gennaro",
    en: [
     "Raffaele Di Gennaro"
    ],
    num: 12,
    pos: [
     "GK"
    ],
    nat: "意大利",
    age: 33,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "邦尼",
    en: [
     "Ange-Yoan Bonny"
    ],
    num: 14,
    pos: [
     "FW"
    ],
    nat: "科特迪瓦",
    age: 23,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "Andy Diouf",
    en: [
     "Andy Diouf"
    ],
    num: 17,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 23,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "恰尔汗奥卢",
    en: [
     "Calhanoglu"
    ],
    pos: [
     "DM",
     "AM"
    ],
    foot: "右",
    club: "国米",
    nat: "土耳其",
    st: "伪6号组织核心：任意球大师",
    tags: [
     "拖后组织"
    ],
    pair: [
     "巴雷拉：他扫荡你调度"
    ],
    d: "从前腰回撤成组织6号的成功改造：长传调度+世界级任意球。",
    num: 20,
    age: 32,
    h: "5' 10\"",
    w: "168 lbs",
    _src: "curated"
   },
   {
    n: "柯蒂斯·琼斯",
    en: [
     "Curtis Jones"
    ],
    num: 21,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 25,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "姆希塔良",
    en: [
     "Henrikh Mkhitaryan"
    ],
    num: 22,
    pos: [
     "MF"
    ],
    nat: "Armenia",
    age: 37,
    foot: null,
    h: "5' 10\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "巴雷拉",
    en: [
     "Barella"
    ],
    pos: [
     "CM"
    ],
    foot: "右",
    club: "国米",
    nat: "意大利",
    st: "肋部8号(mezzala)样板",
    tags: [
     "肋部8号",
     "B2B"
    ],
    pair: [
     "巴斯托尼：左路出球他插上"
    ],
    d: "从中场肋部斜插禁区的教科书：跑位时机、缠斗、远射全都有。",
    num: 23,
    age: 29,
    h: "5' 9\"",
    w: "150 lbs",
    _src: "curated"
   },
   {
    n: "阿坎吉",
    en: [
     "Akanji"
    ],
    pos: [
     "CB",
     "RB"
    ],
    foot: "右",
    club: "国米",
    nat: "瑞士",
    st: "多面手出球中卫",
    tags: [
     "出球型"
    ],
    pair: [],
    d: "能踢右中卫/右后卫/后腰的万能胶水，脚下在压迫下很冷静。",
    weak: "待确认",
    weakNote: "本轮只审曼城；国米版本弱点未审。若保留为球员库成员，需另查 2026-27 在国米的战术角色与出勤。",
    num: 25,
    age: 31,
    h: "6' 2\"",
    w: "201 lbs",
    _src: "curated"
   },
   {
    n: "Benjamin Pavard",
    en: [
     "Benjamin Pavard"
    ],
    num: 28,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 30,
    foot: null,
    h: "6' 1\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "Carlos Augusto",
    en: [
     "Carlos Augusto"
    ],
    num: 30,
    pos: [
     "DF"
    ],
    nat: "巴西",
    age: 27,
    foot: null,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "迪马尔科",
    en: [
     "Dimarco"
    ],
    pos: [
     "LWB",
     "LB"
    ],
    foot: "左",
    club: "国米",
    nat: "意大利",
    st: "翼卫进攻核心：左脚传中+内切",
    tags: [
     "攻击型",
     "翼卫"
    ],
    pair: [
     "巴斯托尼：左路出球双左脚"
    ],
    d: "国米3-5-2的左路大脑，传中和肋部斜塞都是助攻机器。",
    num: 32,
    age: 28,
    h: "5' 9\"",
    w: "163 lbs",
    _src: "curated"
   },
   {
    n: "Alain Taho",
    en: [
     "Alain Taho"
    ],
    num: 40,
    pos: [
     "GK"
    ],
    nat: "阿尔巴尼亚",
    age: 19,
    foot: null,
    h: "6' 4\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Francesco Stante",
    en: [
     "Francesco Stante"
    ],
    num: 45,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 21,
    foot: null,
    h: "6' 0\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Leonardo Bovio",
    en: [
     "Leonardo Bovio"
    ],
    num: 46,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Mattia Mosconi",
    en: [
     "Mattia Mosconi"
    ],
    num: 48,
    pos: [
     "FW"
    ],
    nat: "意大利",
    age: 19,
    foot: null,
    h: "5' 9\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Ivan Provedel",
    en: [
     "Ivan Provedel"
    ],
    num: 49,
    pos: [
     "GK"
    ],
    nat: "意大利",
    age: 32,
    foot: null,
    h: "6' 4\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Leon Jakirovic",
    en: [
     "Leon Jakirovic"
    ],
    num: 51,
    pos: [
     "DF"
    ],
    nat: "克罗地亚",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Jamal Iddrissou",
    en: [
     "Jamal Iddrissou"
    ],
    num: 52,
    pos: [
     "FW"
    ],
    nat: "意大利",
    age: 19,
    foot: null,
    h: "6' 2\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Matteo Lavelli",
    en: [
     "Matteo Lavelli"
    ],
    num: 53,
    pos: [
     "FW"
    ],
    nat: "意大利",
    age: 19,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Mattia Marello",
    en: [
     "Mattia Marello"
    ],
    num: 54,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Pio Esposito",
    en: [
     "Pio Esposito"
    ],
    num: 94,
    pos: [
     "FW"
    ],
    nat: "意大利",
    age: 21,
    foot: null,
    h: "6' 3\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "巴斯托尼",
    en: [
     "Bastoni"
    ],
    pos: [
     "CB"
    ],
    foot: "左",
    club: "国米",
    nat: "意大利",
    st: "左脚出球中卫的当代样板",
    tags: [
     "左脚中卫",
     "出球型"
    ],
    pair: [
     "阿切尔比：他扫荡你组织"
    ],
    d: "左脚对角长传和肋部直塞是武器，国米三中卫体系的组织核心。",
    num: 95,
    age: 27,
    h: "6' 3\"",
    w: "163 lbs",
    _src: "curated"
   },
   {
    n: "杰德·斯宾塞",
    en: [
     "Djed Spence"
    ],
    num: 99,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 26,
    foot: null,
    h: "6' 1\"",
    w: "157 lbs",
    _src: "espn-zh"
   },
   {
    n: "泽默",
    en: [
     "Sommer"
    ],
    pos: [
     "GK"
    ],
    foot: "右",
    club: "国米",
    nat: "瑞士",
    st: "反应型门将：出击时机大师",
    tags: [
     "门线型"
    ],
    pair: [],
    d: "37岁仍是国米一门：预判和出击时机是艺术。",
    _src: "curated"
   },
   {
    n: "阿切尔比",
    en: [
     "Acerbi"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "国米",
    nat: "意大利",
    st: "老派清道夫：预判和指挥",
    tags: [
     "拖后型"
    ],
    pair: [
     "巴斯托尼：他组织你兜底"
    ],
    d: "大龄中卫教科书：不用快，站得住、看得准、喊得动。",
    _src: "curated"
   },
   {
    n: "劳塔罗",
    en: [
     "Lautaro"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "国米",
    nat: "阿根廷",
    st: "缠斗型9：压迫+抢点",
    tags: [
     "逼抢9",
     "抢点型"
    ],
    pair: [
     "图拉姆：一高一快"
    ],
    d: "世界杯冠军9号：背身缠斗、反抢、抢点全干，国米队长。",
    _src: "curated"
   },
   {
    n: "图拉姆",
    en: [
     "M. Thuram"
    ],
    pos: [
     "ST",
     "LW"
    ],
    foot: "右",
    club: "国米",
    nat: "法国",
    st: "全能型9：身体+速度+拉边",
    tags: [
     "全能9"
    ],
    pair: [
     "劳塔罗：一高一快双前锋"
    ],
    d: "352双前锋的完美一半：能背身能冲刺能拉边。",
    _src: "curated"
   }
  ]
 },
 "那不勒斯": {
  league: "意甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "阿莱克斯·梅雷特",
    en: [
     "Alex Meret"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "意大利",
    age: 29,
    foot: null,
    h: "6' 3\"",
    w: "181 lbs",
    _src: "espn-zh"
   },
   {
    n: "Costantino Favasuli",
    en: [
     "Costantino Favasuli"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 22,
    foot: null,
    h: "5' 10\"",
    w: "",
    _src: "espn"
   },
   {
    n: "布翁焦尔诺",
    en: [
     "Alessandro Buongiorno"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 27,
    foot: null,
    h: "6' 3\"",
    w: "190 lbs",
    _src: "espn-zh"
   },
   {
    n: "Benoît Badiashile",
    en: [
     "Benoît Badiashile"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 25,
    foot: null,
    h: "6' 4\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "比利·吉尔莫",
    en: [
     "Billy Gilmour"
    ],
    num: 6,
    pos: [
     "MF"
    ],
    nat: "苏格兰",
    age: 25,
    foot: null,
    h: "5' 7\"",
    w: "130 lbs",
    _src: "espn-zh"
   },
   {
    n: "大卫·内雷斯",
    en: [
     "David Neres"
    ],
    num: 7,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 29,
    foot: null,
    h: "5' 9\"",
    w: "146 lbs",
    _src: "espn-zh"
   },
   {
    n: "麦克托米奈",
    en: [
     "McTominay"
    ],
    pos: [
     "CM",
     "ST"
    ],
    foot: "右",
    club: "那不勒斯",
    nat: "苏格兰",
    st: "后插上重炮：意甲MVP级",
    tags: [
     "B2B"
    ],
    pair: [],
    d: "那不勒斯夺冠的最大惊喜：后插上头球+远射，被用成了第二中锋。",
    num: 8,
    age: 29,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "curated"
   },
   {
    n: "德布劳内",
    en: [
     "de Bruyne",
     "KDB"
    ],
    pos: [
     "AM"
    ],
    foot: "右",
    club: "那不勒斯",
    nat: "比利时",
    st: "史上最佳直塞手之一",
    tags: [
     "现代10",
     "古典10余晖"
    ],
    pair: [
     "卢卡库：身后球连线"
    ],
    d: "对角线+身后直塞是历史级；2025夏窗自由转会那不勒斯，孔蒂体系当组织核心——古典10的现代活法。",
    num: 11,
    age: 35,
    h: "5' 11\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "Claudio Pugliese",
    en: [
     "Claudio Pugliese"
    ],
    num: 12,
    pos: [
     "GK"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "阿米尔·拉赫马尼",
    en: [
     "Amir Rrahmani"
    ],
    num: 13,
    pos: [
     "DF"
    ],
    nat: "科索沃",
    age: 32,
    foot: null,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "espn-zh"
   },
   {
    n: "Nikita Contini",
    en: [
     "Nikita Contini"
    ],
    num: 14,
    pos: [
     "GK"
    ],
    nat: "意大利",
    age: 30,
    foot: null,
    h: "6' 3\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Rafa Marín",
    en: [
     "Rafa Marín"
    ],
    num: 16,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 24,
    foot: null,
    h: "6' 3\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Mathías Olivera",
    en: [
     "Mathías Olivera"
    ],
    num: 17,
    pos: [
     "DF"
    ],
    nat: "乌拉圭",
    age: 29,
    foot: null,
    h: "5' 9\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "拉斯穆斯·霍伊伦",
    en: [
     "Rasmus Højlund"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "丹麦",
    age: 23,
    foot: null,
    h: "6' 3\"",
    w: "190 lbs",
    _src: "espn-zh"
   },
   {
    n: "洛伦佐·卢卡",
    en: [
     "Lorenzo Lucca"
    ],
    num: 20,
    pos: [
     "FW"
    ],
    nat: "意大利",
    age: 26,
    foot: null,
    h: "6' 7\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "马泰奥·波利塔诺",
    en: [
     "Matteo Politano"
    ],
    num: 21,
    pos: [
     "FW"
    ],
    nat: "意大利",
    age: 33,
    foot: null,
    h: "5' 7\"",
    w: "148 lbs",
    _src: "espn-zh"
   },
   {
    n: "乔瓦尼·迪洛伦佐",
    en: [
     "Giovanni Di Lorenzo"
    ],
    num: 22,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 33,
    foot: null,
    h: "6' 0\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "Giovane",
    en: [
     "Giovane"
    ],
    num: 23,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 22,
    foot: null,
    h: "6' 0\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Antonio Vergara",
    en: [
     "Antonio Vergara"
    ],
    num: 26,
    pos: [
     "MF"
    ],
    nat: "意大利",
    age: 23,
    foot: null,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Alisson Santos",
    en: [
     "Alisson Santos"
    ],
    num: 27,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 24,
    foot: null,
    h: "5' 10\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "萨姆·贝克马",
    en: [
     "Sam Beukema"
    ],
    num: 31,
    pos: [
     "DF"
    ],
    nat: "荷兰",
    age: 27,
    foot: null,
    h: "6' 2\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "万尼亚·米林科维奇-萨维奇",
    en: [
     "Vanja Milinkovic-Savic"
    ],
    num: 32,
    pos: [
     "GK"
    ],
    nat: "塞尔维亚",
    age: 29,
    foot: null,
    h: "6' 8\"",
    w: "212 lbs",
    _src: "espn-zh"
   },
   {
    n: "Luca Marianucci",
    en: [
     "Luca Marianucci"
    ],
    num: 35,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 22,
    foot: null,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Milton Agustín Pereyra",
    en: [
     "Milton Agustín Pereyra"
    ],
    num: 36,
    pos: [
     "FW"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "斯皮纳佐拉",
    en: [
     "Leonardo Spinazzola"
    ],
    num: 37,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 33,
    foot: null,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "洛博特卡",
    en: [
     "Lobotka"
    ],
    pos: [
     "DM"
    ],
    foot: "右",
    club: "那不勒斯",
    nat: "斯洛伐克",
    st: "慢节奏大师：转身摆脱出球",
    tags: [
     "拖后组织"
    ],
    pair: [
     "德布劳内：他调度你直塞"
    ],
    d: "那不勒斯夺冠的隐形引擎：接球转身从不丢，节奏全队最稳。",
    num: 68,
    age: 31,
    h: "5' 6\"",
    w: "150 lbs",
    _src: "curated"
   },
   {
    n: "诺阿·朗",
    en: [
     "Noa Lang"
    ],
    num: 70,
    pos: [
     "FW"
    ],
    nat: "荷兰",
    age: 27,
    foot: null,
    h: "5' 9\"",
    w: "152 lbs",
    _src: "espn-zh"
   },
   {
    n: "弗兰克·安古伊萨",
    en: [
     "Frank Anguissa"
    ],
    num: 99,
    pos: [
     "MF"
    ],
    nat: "喀麦隆",
    age: 30,
    foot: null,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "卢卡库",
    en: [
     "Lukaku"
    ],
    pos: [
     "ST"
    ],
    foot: "左",
    club: "那不勒斯",
    nat: "比利时",
    st: "重炮支点：背身碾压",
    tags: [
     "支点"
    ],
    pair: [
     "德布劳内：身后球连线"
    ],
    d: "德布劳内走到哪跟到哪的中锋：背身做墙+冲刺都是欧洲顶级，伤病史是变量。",
    _src: "curated"
   }
  ]
 },
 "尤文": {
  league: "意甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "Kamil Grabara",
    en: [
     "Kamil Grabara"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "波兰",
    age: 27,
    foot: null,
    h: "6' 5\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Zeki Çelik",
    en: [
     "Zeki Çelik"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "Türkiye",
    age: 29,
    foot: null,
    h: "5' 11\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "布雷默",
    en: [
     "Bremer"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "尤文",
    nat: "巴西",
    st: "对抗型核心中卫",
    tags: [
     "上抢型"
    ],
    pair: [],
    d: "意甲最强单防者之一：一对一贴身缠斗。",
    num: 3,
    age: 29,
    h: "6' 2\"",
    w: "192 lbs",
    _src: "curated"
   },
   {
    n: "加蒂",
    en: [
     "Federico Gatti"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 28,
    foot: null,
    h: "6' 3\"",
    w: "181 lbs",
    _src: "espn-zh"
   },
   {
    n: "洛卡特利",
    en: [
     "Manuel Locatelli"
    ],
    num: 5,
    pos: [
     "MF"
    ],
    nat: "意大利",
    age: 28,
    foot: null,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "Lloyd Kelly",
    en: [
     "Lloyd Kelly"
    ],
    num: 6,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 28,
    foot: null,
    h: "6' 2\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "小孔塞桑",
    en: [
     "Francisco Conceição"
    ],
    num: 7,
    pos: [
     "FW"
    ],
    nat: "葡萄牙",
    age: 23,
    foot: null,
    h: "5' 5\"",
    w: "148 lbs",
    _src: "espn-zh"
   },
   {
    n: "库普梅纳斯",
    en: [
     "Teun Koopmeiners"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "荷兰",
    age: 28,
    foot: null,
    h: "6' 1\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "科洛·穆阿尼",
    en: [
     "Randal Kolo Muani"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 27,
    foot: null,
    h: "6' 2\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "伊尔迪兹",
    en: [
     "Yildiz"
    ],
    pos: [
     "RW",
     "AM"
    ],
    foot: "右",
    club: "尤文",
    nat: "土耳其",
    st: "左脚?右脚肋部新星（右脚将）",
    tags: [
     "自由10"
    ],
    pair: [],
    d: "尤文10号：内切+直塞的土耳其金童。",
    num: 10,
    age: 21,
    h: "6' 2\"",
    w: "170 lbs",
    _src: "curated"
   },
   {
    n: "Edon Zhegrova",
    en: [
     "Edon Zhegrova"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "科索沃",
    age: 27,
    foot: null,
    h: "5' 11\"",
    w: "146 lbs",
    _src: "espn"
   },
   {
    n: "沃尔特马德",
    en: [
     "Woltemade"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "尤文",
    nat: "德国",
    num: 11,
    age: 24,
    season: "14场4球1助",
    st: "高中锋：脚下细腻的1米98",
    tags: [
     "支点"
    ],
    pair: [],
    d: "2026夏窗从纽卡斯尔转投尤文：身高是支点，脚下像10号——德国队克洛普体系里施塔赫们的直塞终点。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "道格拉斯·路易斯",
    en: [
     "Douglas Luiz"
    ],
    num: 12,
    pos: [
     "MF"
    ],
    nat: "巴西",
    age: 28,
    foot: null,
    h: "5' 9\"",
    w: "146 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jérémie Boga",
    en: [
     "Jérémie Boga"
    ],
    num: 13,
    pos: [
     "FW"
    ],
    nat: "科特迪瓦",
    age: 29,
    foot: null,
    h: "5' 8\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "米利克",
    en: [
     "Arkadiusz Milik"
    ],
    num: 14,
    pos: [
     "FW"
    ],
    nat: "波兰",
    age: 32,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "Pierre Kalulu",
    en: [
     "Pierre Kalulu"
    ],
    num: 15,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 26,
    foot: null,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Kerim Alajbegovic",
    en: [
     "Kerim Alajbegovic"
    ],
    num: 17,
    pos: [
     "FW"
    ],
    nat: "波黑",
    age: 19,
    foot: null,
    h: "6' 1\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "Jeff Ekhator",
    en: [
     "Jeff Ekhator"
    ],
    num: 18,
    pos: [
     "FW"
    ],
    nat: "意大利",
    age: 19,
    foot: null,
    h: "6' 3\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Khéphren Thuram",
    en: [
     "Khéphren Thuram"
    ],
    num: 19,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 25,
    foot: null,
    h: "6' 4\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "坎比亚索",
    en: [
     "Andrea Cambiaso"
    ],
    num: 20,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 26,
    foot: null,
    h: "6' 0\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "麦肯尼",
    en: [
     "Weston McKennie"
    ],
    num: 22,
    pos: [
     "MF"
    ],
    nat: "美国",
    age: 28,
    foot: null,
    h: "6' 1\"",
    w: "185 lbs",
    _src: "espn-zh"
   },
   {
    n: "Carlo Pinsoglio",
    en: [
     "Carlo Pinsoglio"
    ],
    num: 23,
    pos: [
     "GK"
    ],
    nat: "意大利",
    age: 36,
    foot: null,
    h: "6' 4\"",
    w: "185 lbs",
    _src: "espn"
   },
   {
    n: "Daniele Rugani",
    en: [
     "Daniele Rugani"
    ],
    num: 24,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 32,
    foot: null,
    h: "6' 3\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "维卡里奥",
    en: [
     "Guglielmo Vicario"
    ],
    num: 25,
    pos: [
     "GK"
    ],
    nat: "意大利",
    age: 30,
    foot: null,
    h: "6' 4\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jhon Lucumí",
    en: [
     "Jhon Lucumí"
    ],
    num: 26,
    pos: [
     "DF"
    ],
    nat: "哥伦比亚",
    age: 28,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "帕普·萨尔",
    en: [
     "Pape Matar Sarr"
    ],
    num: 29,
    pos: [
     "MF"
    ],
    nat: "塞内加尔",
    age: 24,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "尼科·冈萨雷斯",
    en: [
     "Nico González"
    ],
    num: 31,
    pos: [
     "FW"
    ],
    nat: "阿根廷",
    age: 28,
    foot: null,
    h: "5' 11\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "胡安·卡瓦尔",
    en: [
     "Juan Cabal"
    ],
    num: 32,
    pos: [
     "DF"
    ],
    nat: "哥伦比亚",
    age: 25,
    foot: null,
    h: "6' 1\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "Neto",
    en: [
     "Neto"
    ],
    num: 33,
    pos: [
     "GK"
    ],
    nat: "巴西",
    age: 37,
    foot: null,
    h: "6' 3\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Riccardo Radu",
    en: [
     "Riccardo Radu"
    ],
    num: 40,
    pos: [
     "GK"
    ],
    nat: "罗马尼亚",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Augusto Owusu",
    en: [
     "Augusto Owusu"
    ],
    num: 41,
    pos: [
     "MF"
    ],
    nat: "意大利",
    age: 21,
    foot: null,
    h: "6' 0\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Filippo Pagnucco",
    en: [
     "Filippo Pagnucco"
    ],
    num: 43,
    pos: [
     "MF"
    ],
    nat: "意大利",
    age: 20,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Niccolò Rizzo",
    en: [
     "Niccolò Rizzo"
    ],
    num: 44,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 19,
    foot: null,
    h: "6' 1\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Justin Oboavwoduo",
    en: [
     "Justin Oboavwoduo"
    ],
    num: 45,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 20,
    foot: null,
    h: "5' 10\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Arman Durmiši",
    en: [
     "Arman Durmiši"
    ],
    num: 47,
    pos: [
     "FW"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Destiny Elimoghale",
    en: [
     "Destiny Elimoghale"
    ],
    num: 48,
    pos: [
     "FW"
    ],
    nat: "意大利",
    age: 17,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Grady Makiobo Makiobo",
    en: [
     "Grady Makiobo Makiobo"
    ],
    num: 49,
    pos: [
     "MF"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Antonio Stefano Merola",
    en: [
     "Antonio Stefano Merola"
    ],
    num: 51,
    pos: [
     "FW"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Stefano Mangiapoco",
    en: [
     "Stefano Mangiapoco"
    ],
    num: 61,
    pos: [
     "GK"
    ],
    nat: "意大利",
    age: 22,
    foot: null,
    h: "6' 4\"",
    w: "",
    _src: "espn"
   },
   {
    n: "弗拉霍维奇",
    en: [
     "Vlahovic"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "尤文",
    nat: "塞尔维亚",
    st: "禁区型9：右脚重炮",
    tags: [
     "抢点型"
    ],
    pair: [],
    d: "禁区内左右脚+头球都有威胁，背身做球在进步。",
    _src: "curated",
    _rosterMiss: true
   }
  ]
 },
 "拜仁": {
  league: "德甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "诺伊尔",
    en: [
     "Neuer"
    ],
    pos: [
     "GK"
    ],
    foot: "右",
    club: "拜仁",
    nat: "德国",
    st: "清道夫门将的开山鼻祖",
    tags: [
     "清球型"
    ],
    pair: [],
    d: "40岁仍在踢：站位极高、脚法顶级，定义了现代门将这个位置。",
    num: 1,
    age: 40,
    h: "6' 4\"",
    w: "203 lbs",
    _src: "curated"
   },
   {
    n: "金玟哉",
    en: [
     "Min-jae Kim",
     "金玟哉"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "拜仁",
    nat: "韩国",
    num: 3,
    age: 29,
    season: "87场4球1助",
    st: "对抗型中卫：贴身缠斗+出球",
    tags: [
     "上抢型",
     "出球型"
    ],
    pair: [
     "塔霍：韩德中卫组合"
    ],
    d: "87场的出勤说明他有多稳：贴身对抗凶、出球冷静、卡位意识顶级；亚洲第一中卫，那不勒斯夺冠功臣。",
    h: "6' 3\"",
    w: "179 lbs",
    _src: "curated"
   },
   {
    n: "基米希",
    en: [
     "Kimmich"
    ],
    pos: [
     "DM",
     "RB"
    ],
    foot: "右",
    club: "拜仁",
    nat: "德国",
    st: "节拍器：6号位组织核心",
    tags: [
     "拖后组织",
     "节拍器"
    ],
    pair: [
     "帕夫洛维奇：新老双6"
    ],
    d: "拜仁大脑：短传调度+全场视野，右后卫/后腰双料。孔帕尼体系出球第一发起点。",
    num: 6,
    age: 31,
    h: "5' 10\"",
    w: "163 lbs",
    _src: "curated"
   },
   {
    n: "格纳布里",
    en: [
     "Gnabry"
    ],
    pos: [
     "RW",
     "LW"
    ],
    foot: "左",
    club: "拜仁",
    nat: "德国",
    st: "全能边锋：内切+无球",
    tags: [
     "逆足内切"
    ],
    pair: [],
    d: "经验丰富的轮换边锋：跑位和终结都聪明。",
    num: 7,
    age: 31,
    h: "5' 9\"",
    w: "170 lbs",
    _src: "curated"
   },
   {
    n: "比朔夫",
    en: [
     "Tom Bischof"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "拜仁",
    nat: "德国",
    num: 8,
    age: 21,
    season: "48场5球5助",
    st: "年轻组织中场：定位球专家",
    tags: [
     "组织8"
    ],
    pair: [
     "帕夫洛维奇：德国双后腰"
    ],
    d: "2025年从霍芬海姆自由加盟：任意球+调度+5球5助的产量，21岁的德国中场未来拼图。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "凯恩",
    en: [
     "Kane"
    ],
    pos: [
     "ST",
     "AM"
    ],
    foot: "右",
    club: "拜仁",
    nat: "英格兰",
    st: "全能9的世界模板：回撤组织+终结",
    tags: [
     "全能9",
     "伪9"
    ],
    pair: [
     "穆西亚拉：他钻肋你终结",
     "奥利塞:右肋喂哺"
    ],
    d: "回撤到中场当组织者再冲回禁区终结——「凯恩角色」已经是战术名词。无冠魔咒在拜仁打破进行时。",
    num: 9,
    age: 33,
    h: "6' 2\"",
    w: "190 lbs",
    _src: "curated"
   },
   {
    n: "穆西亚拉",
    en: [
     "Musiala"
    ],
    pos: [
     "AM",
     "LW",
     "CM"
    ],
    foot: "右",
    club: "拜仁",
    nat: "德国",
    st: "盘带幽灵：肋部小空间之王",
    tags: [
     "自由10",
     "肋部8号"
    ],
    pair: [
     "凯恩：他回撤你钻肋"
    ],
    d: "两个人都贴不住的变向+重心戏法，肋部一接球就是危险事件。",
    status: "重伤初愈（2025.7 重伤，回归后替补轮换，实力恢复中）",
    num: 10,
    age: 23,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "curated"
   },
   {
    n: "Nathaniel Brown",
    en: [
     "Nathaniel Brown"
    ],
    num: 11,
    pos: [
     "DF"
    ],
    nat: "德国",
    age: 23,
    foot: null,
    h: "5' 9\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "布朗",
    en: [
     "Braun"
    ],
    pos: [
     "CB"
    ],
    foot: null,
    club: "拜仁",
    nat: "德国",
    num: 11,
    age: 23,
    season: "8场1球1助",
    st: "德国新生代中卫",
    tags: [
     "出球型"
    ],
    pair: [
     "塔霍：新老中卫"
    ],
    d: "拜仁青训/新援的23岁德国中卫，身价5000万欧+双线出场——克洛普德国队也已在用（10场）。细节画像随赛季更新。",
    _src: "curated"
   },
   {
    n: "路易斯·迪亚斯",
    en: [
     "L. Diaz"
    ],
    pos: [
     "LW",
     "RW"
    ],
    foot: "右",
    club: "拜仁",
    nat: "哥伦比亚",
    st: "右脚左路：转换爆点",
    tags: [
     "逆足内切"
    ],
    pair: [
     "凯恩：他做墙你冲"
    ],
    d: "直上直下的冲刺+内切射门，2025夏窗从利物浦加盟拜仁。",
    num: 14,
    age: 29,
    h: "5' 11\"",
    w: "152 lbs",
    _src: "curated"
   },
   {
    n: "阿方索·戴维斯",
    en: [
     "Alphonso Davies",
     "戴维斯"
    ],
    pos: [
     "LB",
     "LWB",
     "LW"
    ],
    foot: "左",
    club: "拜仁",
    nat: "加拿大",
    st: "速度型翼卫：百米冲刺踢法",
    tags: [
     "套边型"
    ],
    pair: [
     "奥利塞：右路喂哺"
    ],
    d: "世界最快足球运动员之一，反击时左路一条龙；孔帕尼体系左路爆点。",
    num: 19,
    age: 25,
    h: "6' 1\"",
    w: "170 lbs",
    _src: "curated"
   },
   {
    n: "伊藤洋辉",
    en: [
     "Hiroki Ito"
    ],
    pos: [
     "CB",
     "LB",
     "DM"
    ],
    foot: "左",
    club: "拜仁",
    nat: "日本",
    num: 21,
    age: 27,
    season: "34场3球2助",
    st: "左脚多面手：中卫/左后卫/后腰",
    tags: [
     "左脚中卫",
     "多面手"
    ],
    pair: [
     "戴维斯：左路轮换"
    ],
    d: "斯图加特出品的日本多面手：左脚出球冷静，三个位置都能踢——孔帕尼体系的战术棋子。",
    h: "6' 2\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "博埃",
    en: [
     "Sacha Boey"
    ],
    pos: [
     "RB",
     "RWB"
    ],
    foot: "右",
    club: "拜仁",
    nat: "法国",
    num: 23,
    age: 26,
    season: "36场1球3助",
    st: "冲击型右后卫",
    tags: [
     "套边型"
    ],
    pair: [
     "莱默：右路轮换"
    ],
    d: "2024冬窗从凯尔特人加盟：直线冲刺+往返能力，伤愈后成为右路轮换力量。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "乌尔赖希",
    en: [
     "Ulreich"
    ],
    pos: [
     "GK"
    ],
    foot: "右",
    club: "拜仁",
    nat: "德国",
    num: 26,
    age: 38,
    season: "5场",
    st: "老将二号门将",
    tags: [
     "门线型"
    ],
    pair: [],
    d: "38岁更衣室老臣，杯赛轮换。",
    h: "6' 4\"",
    w: "192 lbs",
    _src: "curated"
   },
   {
    n: "Cassiano Kiala",
    en: [
     "Cassiano Kiala"
    ],
    num: 30,
    pos: [
     "DF"
    ],
    nat: "德国",
    age: 17,
    foot: null,
    h: "6' 1\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Ismael Saibari",
    en: [
     "Ismael Saibari"
    ],
    num: 34,
    pos: [
     "MF"
    ],
    nat: "摩洛哥",
    age: 25,
    foot: null,
    h: "6' 1\"",
    w: "179 lbs",
    _src: "espn"
   },
   {
    n: "赛巴里",
    en: [
     "Sebari"
    ],
    pos: [
     "ST",
     "RW"
    ],
    foot: null,
    club: "拜仁",
    nat: "—",
    num: 34,
    age: 25,
    season: "9场2球2助",
    st: "全能前锋轮换",
    tags: [],
    pair: [],
    d: "5500万欧身价的前锋轮换：9场2球2助的赛季开局。详细画像随赛季补充（资料有限，已按官方名单录入）。",
    _src: "curated"
   },
   {
    n: "Jannis Bärtl",
    en: [
     "Jannis Bärtl"
    ],
    num: 35,
    pos: [
     "GK"
    ],
    nat: "德国",
    age: 20,
    foot: null,
    h: "6' 0\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "David Podar-Stiube",
    en: [
     "David Podar-Stiube"
    ],
    num: 38,
    pos: [
     "GK"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "乌尔比希",
    en: [
     "Urbig"
    ],
    pos: [
     "GK"
    ],
    foot: "右",
    club: "拜仁",
    nat: "德国",
    num: 40,
    age: 23,
    season: "37场 / 88扑救 / 出击41",
    st: "年轻主力级门将：出击果断",
    tags: [
     "清球型"
    ],
    pair: [
     "诺伊尔：传承交替"
    ],
    d: "23岁就扛起37场出场量：出击成功率极高、脚下敢做动作——诺伊尔40岁的时代，他是不出意外的未来。",
    h: "6' 2\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "卡尔",
    en: [
     "Lennart Karl"
    ],
    pos: [
     "AM",
     "LW"
    ],
    foot: null,
    club: "拜仁",
    nat: "德国",
    num: 42,
    age: 18,
    season: "48场12球9助",
    st: "18岁天才：双足攻击手",
    tags: [
     "自由10"
    ],
    pair: [
     "穆西亚拉：肋部双灵"
    ],
    d: "拜仁青训现象级新秀：48场12球9助的产量对18岁而言离谱，身价6000万——双足、敢射门、肋部嗅觉像穆西亚拉，德国队也已经征召。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "Tim Binder",
    en: [
     "Tim Binder"
    ],
    num: 46,
    pos: [
     "FW"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "David Daiber",
    en: [
     "David Daiber"
    ],
    num: 47,
    pos: [
     "MF"
    ],
    nat: "葡萄牙",
    age: 19,
    foot: null,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Maycon Cardozo",
    en: [
     "Maycon Cardozo"
    ],
    num: 49,
    pos: [
     "MF"
    ],
    nat: "巴西",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "乌帕梅卡诺",
    en: [
     "Upamecano"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "拜仁",
    nat: "法国",
    st: "上抢型猛男：速度+对抗",
    tags: [
     "上抢型"
    ],
    pair: [
     "塔霍：双塔站位"
    ],
    d: "正面一对一天花板级，前顶扫荡凶；出球选择偶有惊悚瞬间——高风险高回报本体。",
    _src: "curated"
   },
   {
    n: "塔霍",
    en: [
     "J. Tah",
     "塔"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "拜仁",
    nat: "德国",
    st: "争顶+出球双料",
    tags: [
     "争顶型",
     "出球型"
    ],
    pair: [
     "乌帕梅卡诺：一稳一抢"
    ],
    d: "2025夏窗从勒沃库森加盟：制空和地面传球都稳，补上拜仁防空。",
    _src: "curated"
   },
   {
    n: "莱默",
    en: [
     "Laimer"
    ],
    pos: [
     "RB",
     "DM",
     "CM"
    ],
    foot: "右",
    club: "拜仁",
    nat: "奥地利",
    st: "逼抢机器：哪儿缺人补哪儿",
    tags: [
     "多面手"
    ],
    pair: [
     "基米希：中场轮换"
    ],
    d: "跑动和压迫强度极端，右后卫/后腰/中场三处轮换的教练最爱。",
    _src: "curated"
   },
   {
    n: "斯塔尼希奇",
    en: [
     "Stanisic"
    ],
    pos: [
     "RB",
     "LB"
    ],
    foot: "右",
    club: "拜仁",
    nat: "克罗地亚",
    st: "两闸多面手",
    tags: [
     "多面手"
    ],
    pair: [],
    d: "左右都能踢的轮换工具人，出球稳。",
    _src: "curated"
   },
   {
    n: "帕夫洛维奇",
    en: [
     "Pavlovic"
    ],
    pos: [
     "DM"
    ],
    foot: "右",
    club: "拜仁",
    nat: "德国",
    st: "年轻破坏型+出球6号",
    tags: [
     "破坏型"
    ],
    pair: [
     "基米希：他扫荡你调度"
    ],
    d: "身高对抗+左脚出球，德国中场未来核心之一。",
    _src: "curated"
   },
   {
    n: "奥利塞",
    en: [
     "Olise"
    ],
    pos: [
     "RW",
     "AM"
    ],
    foot: "左",
    club: "拜仁",
    nat: "法国",
    st: "左脚右路：节奏型创造者",
    tags: [
     "逆足内切"
    ],
    pair: [
     "凯恩：他做墙你内切",
     "穆西亚拉:肋部双核轮转"
    ],
    d: "持球节奏变化骗过所有人，内切直塞+远射双威胁，拜仁右路大脑。",
    _src: "curated"
   },
   {
    n: "科曼",
    en: [
     "K. Coman"
    ],
    pos: [
     "LW",
     "RW"
    ],
    foot: "右",
    club: "拜仁",
    nat: "法国",
    st: "速度型边锋：大赛冠军收集者",
    tags: [
     "顺足下底"
    ],
    pair: [],
    d: "职业生涯每个赛季都有冠军入账的体系型爆点。",
    _src: "curated"
   }
  ]
 },
 "多特蒙德": {
  league: "德甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "格雷戈尔·科贝尔",
    en: [
     "Gregor Kobel"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "瑞士",
    age: 28,
    foot: null,
    h: "6' 5\"",
    w: "192 lbs",
    _src: "espn-zh"
   },
   {
    n: "安东",
    en: [
     "W. Anton",
     "安东"
    ],
    pos: [
     "CB",
     "DM"
    ],
    foot: "右",
    club: "多特蒙德",
    nat: "德国",
    num: 3,
    age: 30,
    season: "—",
    st: "出球型多面手中卫",
    tags: [
     "出球型"
    ],
    pair: [
     "施洛特贝克：俱乐部搭档"
    ],
    d: "多特防线指挥官：出球+客串后腰，国家队的战术变体棋子。",
    _src: "curated"
   },
   {
    n: "Ramy Bensebaini",
    en: [
     "Ramy Bensebaini"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "阿尔及利亚",
    age: 31,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "乔布·贝林厄姆",
    en: [
     "Jobe Bellingham"
    ],
    num: 7,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 21,
    foot: null,
    h: "6' 2\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "恩梅查",
    en: [
     "F. Nmecha",
     "恩梅查"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "多特蒙德",
    nat: "德国",
    num: 8,
    age: 26,
    season: "13场3球1助",
    st: "全能B2B：身体+推进",
    tags: [
     "B2B"
    ],
    pair: [
     "布兰特：俱乐部搭档"
    ],
    d: "多特中场引擎：带球推进+远射+对抗，6500万身价；克洛普体系里他可以踢6/8两处。",
    _src: "curated"
   },
   {
    n: "马克西米利安·拜尔",
    en: [
     "Maximilian Beier"
    ],
    num: 14,
    pos: [
     "FW"
    ],
    nat: "德国",
    age: 24,
    foot: null,
    h: "6' 0\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "卡尼·楚克乌梅卡",
    en: [
     "Carney Chukwuemeka"
    ],
    num: 17,
    pos: [
     "MF"
    ],
    nat: "奥地利",
    age: 23,
    foot: null,
    h: "6' 2\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "恩瓦内里",
    en: [
     "Ethan Nwaneri"
    ],
    num: 18,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "5' 9\"",
    w: "152 lbs",
    _src: "espn-zh"
   },
   {
    n: "Konstantinos Karetsas",
    en: [
     "Konstantinos Karetsas"
    ],
    num: 19,
    pos: [
     "MF"
    ],
    nat: "希腊",
    age: 18,
    foot: null,
    h: "5' 8\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "马塞尔·萨比策",
    en: [
     "Marcel Sabitzer"
    ],
    num: 20,
    pos: [
     "MF"
    ],
    nat: "奥地利",
    age: 32,
    foot: null,
    h: "5' 10\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "Fábio Silva",
    en: [
     "Fábio Silva"
    ],
    num: 21,
    pos: [
     "FW"
    ],
    nat: "葡萄牙",
    age: 24,
    foot: null,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Kouakou Gadou",
    en: [
     "Kouakou Gadou"
    ],
    num: 22,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 19,
    foot: null,
    h: "6' 4\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "埃姆雷·詹",
    en: [
     "Emre Can"
    ],
    num: 23,
    pos: [
     "MF"
    ],
    nat: "德国",
    age: 32,
    foot: null,
    h: "6' 1\"",
    w: "190 lbs",
    _src: "espn-zh"
   },
   {
    n: "丹尼尔·斯文松",
    en: [
     "Daniel Svensson"
    ],
    num: 24,
    pos: [
     "DF"
    ],
    nat: "瑞典",
    age: 24,
    foot: null,
    h: "6' 0\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "Joey Veerman",
    en: [
     "Joey Veerman"
    ],
    num: 25,
    pos: [
     "MF"
    ],
    nat: "荷兰",
    age: 27,
    foot: null,
    h: "6' 1\"",
    w: "179 lbs",
    _src: "espn"
   },
   {
    n: "尤利安·吕尔森",
    en: [
     "Julian Ryerson"
    ],
    num: 26,
    pos: [
     "DF"
    ],
    nat: "挪威",
    age: 28,
    foot: null,
    h: "6' 0\"",
    w: "190 lbs",
    _src: "espn-zh"
   },
   {
    n: "Justin Lerma",
    en: [
     "Justin Lerma"
    ],
    num: 28,
    pos: [
     "MF"
    ],
    nat: "厄瓜多尔",
    age: 18,
    foot: null,
    h: "5' 9\"",
    w: "137 lbs",
    _src: "espn"
   },
   {
    n: "Patrick Drewes",
    en: [
     "Patrick Drewes"
    ],
    num: 30,
    pos: [
     "GK"
    ],
    nat: "德国",
    age: 33,
    foot: null,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "Silas Ostrzinski",
    en: [
     "Silas Ostrzinski"
    ],
    num: 31,
    pos: [
     "GK"
    ],
    nat: "德国",
    age: 22,
    foot: null,
    h: "6' 6\"",
    w: "190 lbs",
    _src: "espn"
   },
   {
    n: "Alexander Meyer",
    en: [
     "Alexander Meyer"
    ],
    num: 33,
    pos: [
     "GK"
    ],
    nat: "德国",
    age: 35,
    foot: null,
    h: "6' 5\"",
    w: "196 lbs",
    _src: "espn"
   },
   {
    n: "Kauã Prates",
    en: [
     "Kauã Prates"
    ],
    num: 36,
    pos: [
     "DF"
    ],
    nat: "巴西",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Filippo Mané",
    en: [
     "Filippo Mané"
    ],
    num: 39,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 21,
    foot: null,
    h: "6' 2\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Samuele Inácio",
    en: [
     "Samuele Inácio"
    ],
    num: 40,
    pos: [
     "FW"
    ],
    nat: "意大利",
    age: 18,
    foot: null,
    h: "5' 11\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Mathis Albert",
    en: [
     "Mathis Albert"
    ],
    num: 41,
    pos: [
     "FW"
    ],
    nat: "美国",
    age: 17,
    foot: null,
    h: "5' 10\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Jan-Luca Riedl",
    en: [
     "Jan-Luca Riedl"
    ],
    num: 42,
    pos: [
     "DF"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Enzo De Pina Duarte Dos Santos",
    en: [
     "Enzo De Pina Duarte Dos Santos"
    ],
    num: 44,
    pos: [
     "MF"
    ],
    nat: "Luxembourg",
    age: 17,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Giannis Konstantelias",
    en: [
     "Giannis Konstantelias"
    ],
    num: 45,
    pos: [
     "MF"
    ],
    nat: "希腊",
    age: 23,
    foot: null,
    h: "5' 9\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Miguel Adje",
    en: [
     "Miguel Adje"
    ],
    num: 47,
    pos: [
     "DF"
    ],
    nat: "瑞士",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Mussa Kaba",
    en: [
     "Mussa Kaba"
    ],
    num: 48,
    pos: [
     "MF"
    ],
    nat: "德国",
    age: 17,
    foot: null,
    h: "6' 5\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Luca Reggiani",
    en: [
     "Luca Reggiani"
    ],
    num: 49,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 18,
    foot: null,
    h: "6' 4\"",
    w: "",
    _src: "espn"
   },
   {
    n: "施洛特贝克",
    en: [
     "Schlotterbeck"
    ],
    pos: [
     "CB"
    ],
    foot: "左",
    club: "多特蒙德",
    nat: "德国",
    st: "左脚出球+带球推进",
    tags: [
     "左脚中卫",
     "出球型"
    ],
    pair: [],
    d: "敢从后场带球过中场的中卫，长传对角准。",
    _src: "curated"
   },
   {
    n: "布兰特",
    en: [
     "Brandt"
    ],
    pos: [
     "AM",
     "CM"
    ],
    foot: "左",
    club: "多特蒙德",
    nat: "德国",
    st: "组织10：直塞+远射",
    tags: [
     "现代10"
    ],
    pair: [],
    d: "多特中场的老好人：跑动+最后一传稳定。",
    _src: "curated"
   },
   {
    n: "吉拉西",
    en: [
     "Guirassy"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "多特蒙德",
    nat: "几内亚",
    st: "禁区抢点型9",
    tags: [
     "抢点型"
    ],
    pair: [],
    d: "禁区内效率机器：跑位+头球+一脚出球终结，欧冠淘汰赛也稳定输出。",
    _src: "curated"
   }
  ]
 },
 "RB莱比锡": {
  league: "德甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "Ørjan Nyland",
    en: [
     "Ørjan Nyland"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "挪威",
    age: 36,
    foot: null,
    h: "6' 4\"",
    w: "196 lbs",
    _src: "espn"
   },
   {
    n: "Abdoul Koné",
    en: [
     "Abdoul Koné"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 21,
    foot: null,
    h: "6' 4\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Maxime Estève",
    en: [
     "Maxime Estève"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 24,
    foot: null,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "威利·奥尔班",
    en: [
     "Willi Orbán"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "匈牙利",
    age: 33,
    foot: null,
    h: "6' 1\"",
    w: "192 lbs",
    _src: "espn-zh"
   },
   {
    n: "Ezechiel Banzuzi",
    en: [
     "Ezechiel Banzuzi"
    ],
    num: 6,
    pos: [
     "MF"
    ],
    nat: "荷兰",
    age: 21,
    foot: null,
    h: "6' 3\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "安东尼奥·努萨",
    en: [
     "Antonio Nusa"
    ],
    num: 7,
    pos: [
     "MF"
    ],
    nat: "挪威",
    age: 21,
    foot: null,
    h: "6' 0\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "阿桑·乌德拉奥戈",
    en: [
     "Assan Ouédraogo"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "德国",
    age: 20,
    foot: null,
    h: "6' 3\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "Marc Guiu",
    en: [
     "Marc Guiu"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "西班牙",
    age: 20,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Brajan Gruda",
    en: [
     "Brajan Gruda"
    ],
    num: 10,
    pos: [
     "FW"
    ],
    nat: "德国",
    age: 22,
    foot: null,
    h: "5' 10\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "约翰·巴卡约科",
    en: [
     "Johan Bakayoko"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "比利时",
    age: 23,
    foot: null,
    h: "5' 10\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "尼古拉斯·塞瓦尔德",
    en: [
     "Nicolas Seiwald"
    ],
    num: 13,
    pos: [
     "MF"
    ],
    nat: "奥地利",
    age: 25,
    foot: null,
    h: "5' 11\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "克里斯托夫·鲍姆加特纳",
    en: [
     "Christoph Baumgartner"
    ],
    num: 14,
    pos: [
     "MF"
    ],
    nat: "奥地利",
    age: 27,
    foot: null,
    h: "5' 11\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "Lukas Klostermann",
    en: [
     "Lukas Klostermann"
    ],
    num: 16,
    pos: [
     "DF"
    ],
    nat: "德国",
    age: 30,
    foot: null,
    h: "6' 2\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "巴库",
    en: [
     "R. Baku",
     "巴库"
    ],
    pos: [
     "RB",
     "LWB",
     "RW"
    ],
    foot: "右",
    club: "RB莱比锡",
    nat: "德国",
    num: 16,
    age: 28,
    season: "—",
    st: "双足多面手边路",
    tags: [
     "多面手"
    ],
    pair: [],
    d: "莱比锡边路万金油：两闸+边锋都能踢，跑动能力是通行证。",
    _src: "curated"
   },
   {
    n: "Rocco Reitz",
    en: [
     "Rocco Reitz"
    ],
    num: 20,
    pos: [
     "MF"
    ],
    nat: "德国",
    age: 24,
    foot: null,
    h: "5' 9\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Neil El Aynaoui",
    en: [
     "Neil El Aynaoui"
    ],
    num: 21,
    pos: [
     "MF"
    ],
    nat: "摩洛哥",
    age: 25,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "劳姆",
    en: [
     "Raum",
     "劳姆"
    ],
    pos: [
     "LB",
     "LWB"
    ],
    foot: "左",
    club: "RB莱比锡",
    nat: "德国",
    num: 22,
    age: 28,
    season: "—",
    st: "攻击型左后卫：传中机器",
    tags: [
     "套边型"
    ],
    pair: [
     "基米希(国家队):右路对角"
    ],
    d: "莱比锡左闸：左脚传中+定位球+往返，德国队左路首选。",
    _src: "curated"
   },
   {
    n: "卡斯特洛·卢凯巴",
    en: [
     "Castello Lukeba"
    ],
    num: 23,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 23,
    foot: null,
    h: "6' 0\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "Leopold Zingerle",
    en: [
     "Leopold Zingerle"
    ],
    num: 25,
    pos: [
     "GK"
    ],
    nat: "德国",
    age: 32,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "马滕·范德沃特",
    en: [
     "Maarten Vandevoordt"
    ],
    num: 26,
    pos: [
     "GK"
    ],
    nat: "比利时",
    age: 24,
    foot: null,
    h: "6' 4\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "Tidiam Gomis",
    en: [
     "Tidiam Gomis"
    ],
    num: 27,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 20,
    foot: null,
    h: "6' 0\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "Christopher Nkunku",
    en: [
     "Christopher Nkunku"
    ],
    num: 28,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 28,
    foot: null,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Andrija Maksimovic",
    en: [
     "Andrija Maksimovic"
    ],
    num: 30,
    pos: [
     "MF"
    ],
    nat: "塞尔维亚",
    age: 19,
    foot: null,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Max Finkgrafe",
    en: [
     "Max Finkgrafe"
    ],
    num: 35,
    pos: [
     "DF"
    ],
    nat: "德国",
    age: 22,
    foot: null,
    h: "6' 0\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "Benno Kaltefleiter",
    en: [
     "Benno Kaltefleiter"
    ],
    num: 37,
    pos: [
     "MF"
    ],
    nat: "德国",
    age: 18,
    foot: null,
    h: "6' 2\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Benjamin Henrichs",
    en: [
     "Benjamin Henrichs"
    ],
    num: 39,
    pos: [
     "DF"
    ],
    nat: "德国",
    age: 29,
    foot: null,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "罗穆洛",
    en: [
     "Rômulo"
    ],
    num: 40,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 24,
    foot: null,
    h: "6' 4\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "Samba Konate",
    en: [
     "Samba Konate"
    ],
    num: 45,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 17,
    foot: null,
    h: "6' 2\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Viggo Gebel",
    en: [
     "Viggo Gebel"
    ],
    num: 47,
    pos: [
     "MF"
    ],
    nat: "德国",
    age: 18,
    foot: null,
    h: "5' 9\"",
    w: "150 lbs",
    _src: "espn"
   }
  ]
 },
 "巴黎": {
  league: "法甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "阿什拉夫",
    en: [
     "Hakimi"
    ],
    pos: [
     "RB",
     "RWB",
     "RW"
    ],
    foot: "右",
    club: "巴黎",
    nat: "摩洛哥",
    st: "攻击型边后卫天花板：下底+内切双威胁",
    tags: [
     "套边型",
     "攻击型"
    ],
    pair: [
     "努诺·门德斯：一右一左双引擎（2025欧冠冠军结构）"
    ],
    d: "世界最快边后卫之一：右路超车下底、内切射门两开花，反击时他就是第二个边锋。和努诺·门德斯一右一左，把巴黎宽度拉到极限——现代攻击型边后卫的双子星模板。",
    num: 2,
    age: 27,
    h: "5' 11\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "Lucas Beraldo",
    en: [
     "Lucas Beraldo"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "巴西",
    age: 22,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "马尔基尼奥斯",
    en: [
     "Marquinhos"
    ],
    pos: [
     "CB",
     "RB"
    ],
    foot: "右",
    club: "巴黎",
    nat: "巴西",
    st: "指挥型多面手",
    tags: [
     "拖后型"
    ],
    pair: [
     "帕乔：他指挥你回追"
    ],
    d: "巴黎队长：中卫/后腰随时切换，大赛经验是防线软件。",
    num: 5,
    age: 32,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "Illia Zabarnyi",
    en: [
     "Illia Zabarnyi"
    ],
    num: 6,
    pos: [
     "DF"
    ],
    nat: "乌克兰",
    age: 24,
    foot: null,
    h: "6' 2\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "克瓦拉茨赫利亚",
    en: [
     "Kvaratskhelia",
     "K77"
    ],
    pos: [
     "LW",
     "RW"
    ],
    foot: "右",
    club: "巴黎",
    nat: "格鲁吉亚",
    st: "右脚左路：爆点+内切",
    tags: [
     "逆足内切"
    ],
    pair: [
     "登贝莱：攻击群轮转"
    ],
    d: "2025冬窗从那不勒斯加盟：一对一天花板级，2025欧冠冠军成员。",
    num: 7,
    age: 25,
    h: "6' 0\"",
    w: "168 lbs",
    _src: "curated"
   },
   {
    n: "法比安·鲁伊斯",
    en: [
     "F. Ruiz"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "巴黎",
    nat: "西班牙",
    st: "肋部8号：后插上+远射",
    tags: [
     "肋部8号"
    ],
    pair: [
     "维蒂尼亚：他持球你插上"
    ],
    d: "左肋后插上和禁区外爆射是招牌，欧洲杯+欧冠双料冠军。",
    num: 8,
    age: 30,
    h: "6' 2\"",
    w: "152 lbs",
    _src: "curated"
   },
   {
    n: "费兰·托雷斯",
    en: [
     "Ferran Torres"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "西班牙",
    age: 26,
    foot: null,
    h: "6' 0\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "马格内斯·阿克利乌什",
    en: [
     "Maghnes Akliouche"
    ],
    num: 11,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 24,
    foot: null,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "espn-zh"
   },
   {
    n: "迪涅",
    en: [
     "Lucas Digne"
    ],
    num: 12,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 33,
    foot: null,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "Alessandro Longoni",
    en: [
     "Alessandro Longoni"
    ],
    num: 16,
    pos: [
     "GK"
    ],
    nat: "意大利",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "维蒂尼亚",
    en: [
     "Vitinha"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "右",
    club: "巴黎",
    nat: "葡萄牙",
    st: "组织型6/8：巴黎中场大脑",
    tags: [
     "组织8",
     "节拍器"
    ],
    pair: [
     "法比安·鲁伊斯:肋部二点包抄",
     "扎伊尔-埃梅里:轮换"
    ],
    d: "巴黎2025欧冠冠军中场轴心：转身摆脱如穿花蝴蝶，节奏随他走。",
    num: 17,
    age: 26,
    h: "5' 8\"",
    w: "139 lbs",
    _src: "curated"
   },
   {
    n: "卢卡斯·埃尔南德斯",
    en: [
     "Lucas Hernández"
    ],
    num: 21,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 30,
    foot: null,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "Mika Godts",
    en: [
     "Mika Godts"
    ],
    num: 22,
    pos: [
     "FW"
    ],
    nat: "比利时",
    age: 21,
    foot: null,
    h: "5' 9\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "塞尼·马尤卢",
    en: [
     "Senny Mayulu"
    ],
    num: 24,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 20,
    foot: null,
    h: "6' 0\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "努诺·门德斯",
    en: [
     "Nuno Mendes"
    ],
    pos: [
     "LB",
     "LWB",
     "LW"
    ],
    foot: "左",
    club: "巴黎",
    nat: "葡萄牙",
    st: "攻击型左后卫：速度+对抗+内切",
    tags: [
     "套边型",
     "攻击型"
    ],
    pair: [
     "阿什拉夫：一左一右双引擎"
    ],
    d: "左路永动机：下底传中、肋部内切、一对一天花板级。2025欧冠冠军左路引擎。",
    num: 25,
    age: 24,
    h: "5' 11\"",
    w: "152 lbs",
    _src: "curated"
   },
   {
    n: "Dro Fernández",
    en: [
     "Dro Fernández"
    ],
    num: 27,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 18,
    foot: null,
    h: "6' 0\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "卢卡斯·舍瓦利耶",
    en: [
     "Lucas Chevalier"
    ],
    num: 30,
    pos: [
     "GK"
    ],
    nat: "法国",
    age: 24,
    foot: null,
    h: "6' 2\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "Matvei Safonov",
    en: [
     "Matvei Safonov"
    ],
    num: 39,
    pos: [
     "GK"
    ],
    nat: "俄罗斯",
    age: 27,
    foot: null,
    h: "6' 4\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "David Boly",
    en: [
     "David Boly"
    ],
    num: 42,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 17,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Quentin Ndjantou",
    en: [
     "Quentin Ndjantou"
    ],
    num: 47,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 19,
    foot: null,
    h: "6' 0\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Adam Mouak",
    en: [
     "Adam Mouak"
    ],
    num: 80,
    pos: [
     "GK"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "若昂·内维斯",
    en: [
     "João Neves"
    ],
    num: 87,
    pos: [
     "MF"
    ],
    nat: "葡萄牙",
    age: 22,
    foot: null,
    h: "5' 9\"",
    w: "146 lbs",
    _src: "espn-zh"
   },
   {
    n: "帕乔",
    en: [
     "Pacho"
    ],
    pos: [
     "CB"
    ],
    foot: "左",
    club: "巴黎",
    nat: "厄瓜多尔",
    st: "左脚出球+回追型",
    tags: [
     "左脚中卫",
     "出球型"
    ],
    pair: [
     "马尔基尼奥斯：经验搭配"
    ],
    d: "巴黎2025欧冠冠军主力，转身速度和出球冷静度都是顶级。",
    _src: "curated"
   },
   {
    n: "扎伊尔-埃梅里",
    en: [
     "Zaire-Emery"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "巴黎",
    nat: "法国",
    st: "全能青年中场",
    tags: [
     "B2B"
    ],
    pair: [],
    d: "17岁踢欧冠的巴黎青训：跑动、逼抢、出球全都在线。",
    _src: "curated"
   },
   {
    n: "登贝莱",
    en: [
     "O. Dembele"
    ],
    pos: [
     "ST",
     "RW",
     "LW"
    ],
    foot: "双",
    club: "巴黎",
    nat: "法国",
    st: "双足自由人：2025金球奖",
    tags: [
     "伪9",
     "全能9"
    ],
    pair: [
     "克瓦拉茨赫利亚：两翼喂哺"
    ],
    d: "2025金球奖：恩里克把他从边锋改造成全能前锋，双足+速度+串联，巴黎三冠王的进攻轴心。",
    _src: "curated"
   },
   {
    n: "杜埃",
    en: [
     "Doue"
    ],
    pos: [
     "RW",
     "AM"
    ],
    foot: "左",
    club: "巴黎",
    nat: "法国",
    st: "左脚右路：大场面天才",
    tags: [
     "逆足内切"
    ],
    pair: [],
    d: "2025欧冠决赛双响的19岁：变向+终结的冷血。",
    _src: "curated"
   }
  ]
 },
 "里尔": {
  league: "法甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "Berke Özer",
    en: [
     "Berke Özer"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "Türkiye",
    age: 26,
    foot: null,
    h: "6' 3\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Loun Srdanovic",
    en: [
     "Loun Srdanovic"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "瑞士",
    age: 20,
    foot: null,
    h: "5' 11\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "Nathan Ngoy",
    en: [
     "Nathan Ngoy"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "比利时",
    age: 23,
    foot: null,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Alexsandro",
    en: [
     "Alexsandro"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "巴西",
    age: 27,
    foot: null,
    h: "6' 3\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Nabil Bentaleb",
    en: [
     "Nabil Bentaleb"
    ],
    num: 6,
    pos: [
     "MF"
    ],
    nat: "阿尔及利亚",
    age: 31,
    foot: null,
    h: "6' 2\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "Dilane Bakwa",
    en: [
     "Dilane Bakwa"
    ],
    num: 7,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 24,
    foot: null,
    h: "5' 11\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "埃唐·姆巴佩",
    en: [
     "Ethan Mbappé"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 19,
    foot: null,
    h: "5' 11\"",
    w: "152 lbs",
    _src: "espn-zh"
   },
   {
    n: "Olivier Giroud",
    en: [
     "Olivier Giroud"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 40,
    foot: null,
    h: "6' 4\"",
    w: "201 lbs",
    _src: "espn"
   },
   {
    n: "哈康·哈拉尔德松",
    en: [
     "Hákon Haraldsson"
    ],
    num: 10,
    pos: [
     "MF"
    ],
    nat: "冰岛",
    age: 23,
    foot: null,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "Osame Sahraoui",
    en: [
     "Osame Sahraoui"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "摩洛哥",
    age: 25,
    foot: null,
    h: "5' 7\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "Orlando Gill",
    en: [
     "Orlando Gill"
    ],
    num: 12,
    pos: [
     "GK"
    ],
    nat: "巴拉圭",
    age: 26,
    foot: null,
    h: "6' 6\"",
    w: "179 lbs",
    _src: "espn"
   },
   {
    n: "Maurits Kjaergaard",
    en: [
     "Maurits Kjaergaard"
    ],
    num: 14,
    pos: [
     "MF"
    ],
    nat: "丹麦",
    age: 23,
    foot: null,
    h: "6' 4\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "罗曼·佩罗",
    en: [
     "Romain Perraud"
    ],
    num: 15,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 29,
    foot: null,
    h: "5' 8\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "Ngal'ayel Mukau",
    en: [
     "Ngal'ayel Mukau"
    ],
    num: 17,
    pos: [
     "MF"
    ],
    nat: "Congo DR",
    age: 21,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Ayase Ueda",
    en: [
     "Ayase Ueda"
    ],
    num: 18,
    pos: [
     "FW"
    ],
    nat: "日本",
    age: 28,
    foot: null,
    h: "6' 0\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "Basar Önal",
    en: [
     "Basar Önal"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "Türkiye",
    age: 22,
    foot: null,
    h: "5' 8\"",
    w: "",
    _src: "espn"
   },
   {
    n: "邦雅曼·安德烈",
    en: [
     "Benjamin André"
    ],
    num: 21,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 36,
    foot: null,
    h: "5' 11\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "蒂亚戈·桑托斯",
    en: [
     "Tiago Santos"
    ],
    num: 22,
    pos: [
     "DF"
    ],
    nat: "葡萄牙",
    age: 24,
    foot: null,
    h: "5' 9\"",
    w: "148 lbs",
    _src: "espn-zh"
   },
   {
    n: "Tanguy Nianzou",
    en: [
     "Tanguy Nianzou"
    ],
    num: 23,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 24,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Calvin Verdonk",
    en: [
     "Calvin Verdonk"
    ],
    num: 24,
    pos: [
     "DF"
    ],
    nat: "Indonesia",
    age: 29,
    foot: null,
    h: "5' 9\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Isaac Cossier",
    en: [
     "Isaac Cossier"
    ],
    num: 26,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 19,
    foot: null,
    h: "6' 4\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Gaetan Perrin",
    en: [
     "Gaetan Perrin"
    ],
    num: 28,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 30,
    foot: null,
    h: "5' 7\"",
    w: "139 lbs",
    _src: "espn"
   },
   {
    n: "Hamza Igmane",
    en: [
     "Hamza Igmane"
    ],
    num: 29,
    pos: [
     "FW"
    ],
    nat: "摩洛哥",
    age: 23,
    foot: null,
    h: "5' 10\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "Matah Yondjio",
    en: [
     "Matah Yondjio"
    ],
    num: 33,
    pos: [
     "FW"
    ],
    nat: "喀麦隆",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Soriba Diaoune",
    en: [
     "Soriba Diaoune"
    ],
    num: 35,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 19,
    foot: null,
    h: "5' 8\"",
    w: "121 lbs",
    _src: "espn"
   },
   {
    n: "Maxima Goffi",
    en: [
     "Maxima Goffi"
    ],
    num: 38,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 18,
    foot: null,
    h: "6' 0\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Zadig Lanssade",
    en: [
     "Zadig Lanssade"
    ],
    num: 40,
    pos: [
     "GK"
    ],
    nat: "法国",
    age: 18,
    foot: null,
    h: "6' 4\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Thomas Sajous",
    en: [
     "Thomas Sajous"
    ],
    num: 50,
    pos: [
     "GK"
    ],
    nat: "法国",
    age: 18,
    foot: null,
    h: "6' 2\"",
    w: "",
    _src: "espn"
   }
  ]
 },
 "摩纳哥": {
  league: "法甲",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "卢卡斯·赫拉德茨基",
    en: [
     "Lukas Hradecky"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "芬兰",
    age: 36,
    foot: null,
    h: "6' 4\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "万德松",
    en: [
     "Vanderson"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "巴西",
    age: 25,
    foot: null,
    h: "5' 8\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "埃里克·戴尔",
    en: [
     "Eric Dier"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 32,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "乔丹·特泽",
    en: [
     "Jordan Teze"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "荷兰",
    age: 27,
    foot: null,
    h: "6' 0\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "丹尼斯·扎卡里亚",
    en: [
     "Denis Zakaria"
    ],
    num: 6,
    pos: [
     "MF"
    ],
    nat: "瑞士",
    age: 29,
    foot: null,
    h: "6' 3\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "Mathys Detourbet",
    en: [
     "Mathys Detourbet"
    ],
    num: 7,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "弗拉林·巴洛贡",
    en: [
     "Folarin Balogun"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "美国",
    age: 25,
    foot: null,
    h: "5' 10\"",
    w: "146 lbs",
    _src: "espn-zh"
   },
   {
    n: "Aleksandr Golovin",
    en: [
     "Aleksandr Golovin"
    ],
    num: 10,
    pos: [
     "MF"
    ],
    nat: "俄罗斯",
    age: 30,
    foot: null,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Matthis Abline",
    en: [
     "Matthis Abline"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 23,
    foot: null,
    h: "5' 9\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "Christian Mawissa",
    en: [
     "Christian Mawissa"
    ],
    num: 13,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 21,
    foot: null,
    h: "6' 1\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "米卡·比耶雷特",
    en: [
     "Mika Biereth"
    ],
    num: 14,
    pos: [
     "FW"
    ],
    nat: "丹麦",
    age: 23,
    foot: null,
    h: "6' 2\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "拉明·卡马拉",
    en: [
     "Lamine Camara"
    ],
    num: 15,
    pos: [
     "MF"
    ],
    nat: "塞内加尔",
    age: 22,
    foot: null,
    h: "5' 8\"",
    w: "141 lbs",
    _src: "espn-zh"
   },
   {
    n: "Philipp Köhn",
    en: [
     "Philipp Köhn"
    ],
    num: 16,
    pos: [
     "GK"
    ],
    nat: "瑞士",
    age: 28,
    foot: null,
    h: "6' 3\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Stanis Idumbo",
    en: [
     "Stanis Idumbo"
    ],
    num: 17,
    pos: [
     "MF"
    ],
    nat: "比利时",
    age: 21,
    foot: null,
    h: "5' 7\"",
    w: "130 lbs",
    _src: "espn"
   },
   {
    n: "南野拓实",
    en: [
     "Takumi Minamino"
    ],
    num: 18,
    pos: [
     "MF"
    ],
    nat: "日本",
    age: 31,
    foot: null,
    h: "5' 8\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "Pape Cabral",
    en: [
     "Pape Cabral"
    ],
    num: 19,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Názinho",
    en: [
     "Názinho"
    ],
    num: 20,
    pos: [
     "DF"
    ],
    nat: "葡萄牙",
    age: 23,
    foot: null,
    h: "5' 10\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Mohammed Salisu",
    en: [
     "Mohammed Salisu"
    ],
    num: 22,
    pos: [
     "DF"
    ],
    nat: "加纳",
    age: 27,
    foot: null,
    h: "6' 3\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Mamadou Coulibaly",
    en: [
     "Mamadou Coulibaly"
    ],
    num: 28,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 22,
    foot: null,
    h: "5' 11\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Paris Brunner",
    en: [
     "Paris Brunner"
    ],
    num: 29,
    pos: [
     "FW"
    ],
    nat: "德国",
    age: 20,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Ansu Fati",
    en: [
     "Ansu Fati"
    ],
    num: 31,
    pos: [
     "FW"
    ],
    nat: "西班牙",
    age: 24,
    foot: null,
    h: "5' 10\"",
    w: "146 lbs",
    _src: "espn"
   },
   {
    n: "Edan Diop",
    en: [
     "Edan Diop"
    ],
    num: 37,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 22,
    foot: null,
    h: "5' 8\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "Jules Stawiecki",
    en: [
     "Jules Stawiecki"
    ],
    num: 40,
    pos: [
     "GK"
    ],
    nat: "法国",
    age: 19,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Aymen Assab",
    en: [
     "Aymen Assab"
    ],
    num: 41,
    pos: [
     "MF"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Oumar Konaté",
    en: [
     "Oumar Konaté"
    ],
    num: 42,
    pos: [
     "FW"
    ],
    nat: "马里",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Samuel Nibombé",
    en: [
     "Samuel Nibombé"
    ],
    num: 44,
    pos: [
     "MF"
    ],
    nat: "比利时",
    age: 19,
    foot: null,
    h: "6' 6\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Anis Soubeir",
    en: [
     "Anis Soubeir"
    ],
    num: 46,
    pos: [
     "MF"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Safouane Benzahra",
    en: [
     "Safouane Benzahra"
    ],
    num: 47,
    pos: [
     "MF"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Ilane Touré",
    en: [
     "Ilane Touré"
    ],
    num: 49,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 20,
    foot: null,
    h: "5' 11\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Sadibou Sané",
    en: [
     "Sadibou Sané"
    ],
    num: 72,
    pos: [
     "DF"
    ],
    nat: "塞内加尔",
    age: 22,
    foot: null,
    h: "6' 1\"",
    w: "168 lbs",
    _src: "espn"
   }
  ]
 }
};
