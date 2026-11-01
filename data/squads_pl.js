/* 自动生成：node tools/collect-squads.mjs（勿手改，重跑脚本即可更新）
   数据来源：ESPN core API 2026 赛季（名单/号码/位置粗粒度/年龄/国籍/身高体重）
   + 精选库合并（中文名/惯用脚/技术特点/属性），_rosterMiss=精选库有但ESPN名单未匹配
   foot 空值=未查证；运行时 AI 联网补全后缓存到 localStorage
   生成时间：2026-11-01T18:50:29.707Z
*/
"use strict";
window.SQUADS_PL={
 "曼联": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "拉门斯",
    en: [
     "Lammens"
    ],
    pos: [
     "GK"
    ],
    foot: "右",
    club: "曼联",
    nat: "比利时",
    num: 1,
    age: 24,
    season: "41场 / 100扑救 / 出击17-17",
    st: "出球型主力门将",
    tags: [
     "清球型"
    ],
    weak: "防空弱",
    weakNote: "TFA 2025-26 门将球探：禁区制空/空中对抗是相对弱项（\"one of the least commanding in aerial duels\"）；出击成功率高不等于制空强。作者原 d 也写“制空和指挥防线还在涨球”，判断一致。",
    pair: [
     "德利赫特：后场出球组合"
    ],
    d: "2025夏窗加盟即坐稳主力：出球冷静、脚下敢做动作、单对单出击成功率极高（17次出击全部成功）。制空和指挥防线还在涨球，是卡里克控球体系的第一发起点。",
    a: {
     pace: 48,
     pass: 74,
     def: 58,
     air: 70,
     fin: 12,
     sta: 72
    },
    h: "6' 4\"",
    w: "192 lbs",
    _src: "curated"
   },
   {
    n: "达洛特",
    en: [
     "Dalot"
    ],
    pos: [
     "RB",
     "RWB",
     "LB"
    ],
    foot: "右",
    club: "曼联",
    nat: "葡萄牙",
    num: 2,
    age: 27,
    season: "99场4球8助",
    st: "攻击型边后卫/翼卫两栖，右路铁人",
    tags: [
     "套边型",
     "翼卫"
    ],
    weak: "怕一对一",
    weakNote: "TFA 2026 边后卫分析：防守 1v1 表现“extremely low”，压迫时机偏被动、错误的 engagement timing；进攻端传中 36%、xG+xA 0.17/90。不是速度问题，是防守对抗与站位。",
    pair: [
     "迪亚洛：右路互换",
     "B费：右肋直塞接应"
    ],
    d: "近两季出场99次的后防铁人：传中、内切、往返都在线。卡里克体系里是 build-up 3-2-5 中压上的右边后卫；三中卫体系里就是右翼卫。逆足踢左路可用但传中质量下降——模拟器试试就知道。",
    a: {
     pace: 76,
     pass: 74,
     def: 72,
     air: 60,
     fin: 50,
     sta: 84
    },
    h: "6' 0\"",
    w: "181 lbs",
    _src: "curated"
   },
   {
    n: "马兹拉维",
    en: [
     "Mazraoui"
    ],
    pos: [
     "RB",
     "RWB",
     "CM"
    ],
    foot: "右",
    club: "曼联",
    nat: "摩洛哥",
    num: 3,
    age: 28,
    season: "82场",
    st: "出球型边后卫，可内收中场",
    tags: [
     "内收型",
     "多面手"
    ],
    weak: "易失位",
    weakNote: "Busby Babe 2026：习惯收得很窄、不给边锋套边支援，右路宽度常空；TFA 招募分析指其传中/创造力“extremely low”。内收是战术设计，代价是边路 1v1 暴露。",
    pair: [
     "B费：内收后中场联动"
    ],
    d: "拜仁青训出品：压迫下出球冷静，右后卫/翼卫/中场三处轮换；速度和对抗中等，靠位置感吃饭。卡里克体系里内收当第二后腰的天然人选。",
    a: {
     pace: 74,
     pass: 78,
     def: 72,
     air: 58,
     fin: 45,
     sta: 82
    },
    h: "6' 0\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "德利赫特",
    en: [
     "de Ligt",
     "德里赫特"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "曼联",
    nat: "荷兰",
    num: 4,
    age: 27,
    season: "59场3球",
    st: "对抗型上抢中卫",
    tags: [
     "上抢型",
     "对抗型"
    ],
    weak: "回追慢",
    weakNote: "The Athletic 2025：不是慢后卫，但缺少约罗那种回追速度，不适合守大空间；原 d 也写“怕被速度型前锋拉进长距离回追”。另有背伤术后 2026-27 英超 0 出场=可用性风险，另记。",
    pair: [
     "L.马丁内斯：一抢一保组合",
     "马奎尔:轮换搭档"
    ],
    d: "贴身缠斗和正面拦截硬，争顶能力强；怕被速度型前锋拉进长距离回追，需要身边有快中卫兜底。右中卫/居中皆可，三中卫体系里当右中卫上抢。",
    a: {
     pace: 62,
     pass: 70,
     def: 84,
     air: 85,
     fin: 30,
     sta: 75
    },
    _src: "curated"
   },
   {
    n: "马奎尔",
    en: [
     "Maguire"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "曼联",
    nat: "英格兰",
    num: 5,
    age: 33,
    season: "74场6球3助",
    st: "争顶怪+拖后保镖（右脚将）",
    tags: [
     "拖后型",
     "争顶型"
    ],
    weak: "怕一对一",
    weakNote: "Sky 球探观点：直线速度不常被爆，问题在侧向移动/转身；Mastermind 指其“缺乏瞬间反应速度、上抢后守不住位置”。33 岁面对小快灵前锋的禁区 1v1 是更准的针对点，不写笼统“回追慢”。",
    pair: [
     "德利赫特：他上抢你兜底"
    ],
    d: "33岁仍是英超顶级争顶点，定位球攻防双武器；转身速度是永恒软肋，低位块里价值最大。右脚将，右中卫/居中皆宜，客串左中卫时出球线路偏右。合同年，更衣室模范。",
    a: {
     pace: 52,
     pass: 68,
     def: 80,
     air: 90,
     fin: 35,
     sta: 70
    },
    h: "6' 4\"",
    w: "196 lbs",
    _src: "curated"
   },
   {
    n: "L.马丁内斯",
    en: [
     "Lisandro Martinez",
     "利马",
     "利桑德罗"
    ],
    pos: [
     "CB",
     "LB"
    ],
    foot: "左",
    club: "曼联",
    nat: "阿根廷",
    num: 6,
    age: 28,
    season: "57场3球2助",
    st: "左脚绞杀型中卫，防线情绪领袖",
    tags: [
     "上抢型",
     "左脚中卫"
    ],
    weak: "伤病史",
    weakNote: "【可用性风险，非战术弱点】2025-26 小腿伤停 45 天、2025 年 2 月 ACL 撕裂、早期跖骨骨折（TM/Sky/官网）。防空“身高短板”是常见叙事，但他在空中对抗并不差，不硬编防空弱。",
    pair: [
     "德利赫特：他缠斗你补位",
     "马奎尔:出球轮换"
    ],
    d: "世界级缠斗+侵略性，左脚出球让左侧线路天然顺；身高不占优，防空更多靠预判和搭档保护。世界杯冠军中卫，更衣室的嗓门。",
    a: {
     pace: 66,
     pass: 76,
     def: 82,
     air: 62,
     fin: 28,
     sta: 76
    },
    h: "5' 9\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "芒特",
    en: [
     "Mount"
    ],
    pos: [
     "AM",
     "CM"
    ],
    foot: "右",
    club: "曼联",
    nat: "英格兰",
    num: 7,
    age: 27,
    season: "58场8球2助",
    st: "无球型10：压迫+后插上",
    tags: [
     "伪10"
    ],
    weak: "伤病史",
    weakNote: "【可用性风险，非战术弱点】TM 伤病史：2023-24 多次缺阵、2024-25 腿筋伤，出勤不稳定；战术上无可靠万金油弱点，不硬编。",
    pair: [
     "B费：双10轮转",
     "库尼亚:肋部互换"
    ],
    d: "不占球权、逼抢积极、肋部后插上是看家本领；58场8球是生涯健康季的产出。体系粘合剂。",
    a: {
     pace: 68,
     pass: 76,
     def: 64,
     air: 58,
     fin: 64,
     sta: 78
    },
    h: "5' 11\"",
    w: "168 lbs",
    _src: "curated"
   },
   {
    n: "拉什福德",
    en: [
     "Rashford"
    ],
    pos: [
     "LW",
     "ST"
    ],
    foot: "右",
    club: "曼联",
    nat: "英格兰",
    num: 9,
    age: 28,
    season: "31场7球3助",
    st: "右脚左路：本土爆点回归",
    tags: [
     "逆足内切"
    ],
    weak: "不参与防守",
    weakNote: "TFA 2025-26 巴萨球探：球队防守结构不紧凑时，Rashford 的防守弱点被暴露；他回追/落位的参与度低于同位置边锋。不是态度判断，是战术角色风险。",
    pair: [
     "B费：身后球老搭档",
     "多古/肖:左路套边"
    ],
    d: "2026年回归：直线速度打身后仍是英超顶级资产，31场7球是角色化后的产出。低位块比赛里他=唯一的「身后」威胁。",
    a: {
     pace: 86,
     pass: 70,
     def: 40,
     air: 60,
     fin: 76,
     sta: 72
    },
    h: "6' 2\"",
    w: "174 lbs",
    _src: "curated"
   },
   {
    n: "库尼亚",
    en: [
     "Cunha"
    ],
    pos: [
     "AM",
     "LW",
     "ST"
    ],
    foot: "右",
    club: "曼联",
    nat: "巴西",
    num: 10,
    age: 27,
    season: "46场12球4助",
    st: "自由人10：背身+盘带+远射",
    tags: [
     "自由10",
     "伪9"
    ],
    weak: "终结效率低",
    weakNote: "2026-27 射门转化率约 6.7–7.1%，英超 10+ 射门球员里倒数第二（AllFootball/StatMuse）；射门量大但选择/终结效率低，是可针对的进攻短板。防守投入、压迫、持球推进仍是强项（Mastermind/PL）。",
    pair: [
     "谢什科：双前锋错位",
     "B费:肋部二过一"
    ],
    d: "10号位的主人：能背身做墙、能拉边爆点、能禁区外远射；46场12球在自由人角色里是优秀产出。前场创造力第一持球点。",
    a: {
     pace: 78,
     pass: 80,
     def: 48,
     air: 58,
     fin: 76,
     sta: 78
    },
    h: "6' 0\"",
    w: "168 lbs",
    _src: "curated"
   },
   {
    n: "齐尔克泽",
    en: [
     "Zirkzee"
    ],
    pos: [
     "ST",
     "AM"
    ],
    foot: "右",
    club: "曼联",
    nat: "荷兰",
    num: 11,
    age: 25,
    season: "81场9球3助",
    st: "伪9/二前锋：回撤做球流",
    tags: [
     "伪9",
     "支点"
    ],
    weak: "压迫下失误",
    weakNote: "Yahoo 2026：11 次对抗仅赢 4 次，被后卫贴身时难以护球；Goal 指其背身做球/禁区威胁不足。取“压迫下失误”（受压处理球），不是速度问题。",
    pair: [
     "库尼亚：双伪9轮转",
     "迪亚洛:他回撤你插上"
    ],
    d: "外租回归：81场的出场量说明教练爱用——回撤到中场当组织点再冲禁区，脚下细腻；纯禁区内抢点不是他的活。战术变体的关键棋子。",
    a: {
     pace: 72,
     pass: 78,
     def: 40,
     air: 72,
     fin: 66,
     sta: 72
    },
    h: "6' 4\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "Karl Darlow",
    en: [
     "Karl Darlow"
    ],
    num: 12,
    pos: [
     "GK"
    ],
    nat: "威尔士",
    age: 36,
    foot: null,
    h: "6' 3\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "达洛",
    en: [
     "Dalu"
    ],
    pos: [
     "GK"
    ],
    foot: null,
    club: "曼联",
    nat: "—",
    num: 12,
    age: 36,
    season: "1场",
    st: "二号门将",
    tags: [
     "门线型"
    ],
    pair: [],
    d: "36岁老将替补门将，杯赛轮换人选。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "多古",
    en: [
     "Dorgu"
    ],
    pos: [
     "LWB",
     "LB",
     "LW"
    ],
    foot: "左",
    club: "曼联",
    nat: "丹麦",
    num: 13,
    age: 21,
    season: "57场5球7助",
    st: "左脚左翼卫：冲击型毛坯",
    tags: [
     "翼卫",
     "套边型"
    ],
    weak: "易失位",
    weakNote: "Athletic 2025：防守技术积极但不够干净，容易让球漏出；TFA 2026 指其被 Carrick 主要当左边锋用，四后卫左路站位/1v1 仍是短板。脚已核实为左脚，原“右脚逆足”标签不成立。",
    pair: [
     "迪亚洛：两翼互换"
    ],
    d: "2025冬窗从莱切加盟：左脚左翼卫/左边锋，直线冲击+往返是天赋，57场5球7助；四后卫的左路防守站位和1v1还在补课，Carrick 2026-27 也把他当左边锋用。",
    a: {
     pace: 87,
     pass: 64,
     def: 64,
     air: 55,
     fin: 55,
     sta: 86
    },
    h: "6' 1\"",
    w: "150 lbs",
    _src: "curated"
   },
   {
    n: "约罗",
    en: [
     "Yoro"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "曼联",
    nat: "法国",
    num: 15,
    age: 20,
    season: "75场1球1助",
    st: "出球型年轻中卫，转身快",
    tags: [
     "出球型"
    ],
    weak: "防空弱",
    weakNote: "2026-27 英超样本仅 171 分钟、空中对抗赢 1 次（PL stats）；The Athletic 指曼联仍在培养他读比赛/防守细节。样本小，标待确认，不当作成熟结论。",
    pair: [
     "海文：一右一左出球网"
    ],
    d: "两季75场的出场量说明教练有多信他：预判和脚下在同龄人里顶级，敢从后场带球破压迫。右中卫首选。",
    a: {
     pace: 74,
     pass: 74,
     def: 76,
     air: 70,
     fin: 25,
     sta: 75
    },
    h: "6' 3\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "迪亚洛",
    en: [
     "Amad Diallo",
     "阿马德"
    ],
    pos: [
     "RW",
     "RWB",
     "LW"
    ],
    foot: "左",
    club: "曼联",
    nat: "科特迪瓦",
    num: 16,
    age: 24,
    season: "80场14球11助",
    st: "左脚右路：小快灵+翼卫两栖",
    tags: [
     "逆足内切",
     "翼卫"
    ],
    weak: "伤病史",
    weakNote: "【可用性风险，非战术弱点】反复脚踝伤：2025-02 踝韧带伤赛季报销；2026-08 训练中再次脚踝韧带伤，缺阵约 6 周；2026-27 至今仅 2 场/149 分钟。战术弱点样本不足，不硬编。",
    pair: [
     "达洛特：右路互换",
     "多古:两翼互换"
    ],
    d: "全队出场最多（80场）的锋线：小空间变向+倒三角回做，阿莫林时代客串翼卫立过功；卡里克体系回归边锋位，14球11助是两季最佳产出。",
    a: {
     pace: 80,
     pass: 74,
     def: 52,
     air: 48,
     fin: 66,
     sta: 78
    },
    h: "5' 8\"",
    w: "159 lbs",
    _src: "curated"
   },
   {
    n: "A.桑托斯",
    en: [
     "Andrey Santos"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "右",
    club: "曼联",
    nat: "巴西",
    num: 17,
    age: 22,
    season: "新援（6场）",
    st: "带球型后腰：从深位把球运出去",
    tags: [
     "拖后组织",
     "组织8"
    ],
    weak: "回追慢",
    weakNote: "TFA 2026：深位组织者，短距离爆发好但长距离覆盖/回追不足，被隔离时防守吃亏；Medium 球探同指其长距离速度不足（\"not particularly fast over longer distances\"）。",
    pair: [
     "梅努：双年轻中场轮转"
    ],
    d: "2026夏窗从切尔西系加盟：后场带球推进+肋部后插上射门是标识，巴西国奥核心。和巴莱巴构成未来十年的中场底盘竞争。",
    a: {
     pace: 70,
     pass: 74,
     def: 76,
     air: 62,
     fin: 60,
     sta: 80
    },
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "蒂勒曼斯",
    en: [
     "Tielemans"
    ],
    pos: [
     "CM",
     "DM",
     "AM"
    ],
    foot: "右",
    club: "曼联",
    nat: "比利时",
    num: 18,
    age: 29,
    season: "新援（9场2助）",
    st: "组织型8：调度+远射+定位球",
    tags: [
     "组织8",
     "节拍器"
    ],
    weak: "回追慢",
    weakNote: "TFA 2026：前场压迫积极，但被高速反击时速度受限（\"limits pace against high-speed counters\"），防守横移是相对短板；原 d 已写“防守横移是相对短板”。",
    pair: [
     "巴莱巴：他扫荡你出球",
     "B费:双组织点轮转"
    ],
    d: "2026夏窗从维拉加盟：一脚对角转移和肋部直塞是欧洲顶级，远射和任意球都是武器；防守横移是相对短板——所以和巴莱巴是天作之合。",
    a: {
     pace: 60,
     pass: 86,
     def: 62,
     air: 62,
     fin: 66,
     sta: 76
    },
    h: "5' 9\"",
    w: "159 lbs",
    _src: "curated"
   },
   {
    n: "姆贝乌莫",
    en: [
     "Mbeumo",
     "姆贝莫"
    ],
    pos: [
     "RW",
     "AM",
     "LW"
    ],
    foot: "左",
    club: "曼联",
    nat: "喀麦隆",
    num: 19,
    age: 27,
    season: "44场15球4助",
    st: "左脚右路：内切爆射+定位球",
    tags: [
     "逆足内切"
    ],
    weak: "逆足限制",
    weakNote: "Medium 分析：左脚/右脚射门比约 3:1、进球比约 6:1；Brentford 官方指其 2024-25 首个右脚进球。防守者可逼他走外线，但内切效率仍高——相对短板，不是主要限制。",
    pair: [
     "谢什科：他做墙你插上",
     "B费:右肋连线"
    ],
    d: "队史级身价引援的第一年就交出44场15球：内切爆射+定位球+满场跑动，右肋和萨卡同流派。全队出勤最稳的攻击手。",
    a: {
     pace: 80,
     pass: 74,
     def: 48,
     air: 52,
     fin: 76,
     sta: 76
    },
    h: "5' 8\"",
    w: "139 lbs",
    _src: "curated"
   },
   {
    n: "巴莱巴",
    en: [
     "Baleba"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "右",
    club: "曼联",
    nat: "喀麦隆",
    num: 20,
    age: 22,
    season: "新援（2场）",
    st: "强力6/8：扫荡+带球推进双料",
    tags: [
     "破坏型",
     "B2B"
    ],
    weak: "易失位",
    weakNote: "TFA 2026 scout：防守可靠性不足（犯规多）、需要搭档保持位置纪律；犯规/吃牌归为可用性风险，战术层面取“易失位”——他被拉出 6 号位后身后需要人补。不是传球受压问题，他在压力下反而强。",
    pair: [
     "蒂勒曼斯：他扫荡你调度",
     "B费回撤:他当保镖"
    ],
    d: "2026夏窗标王级引援（6500万欧）：布莱顿出品的 physique 怪物——抢断范围大、带球破压迫是6号位稀缺技能、远射有货。单6位置的长期答案，也是全队由守转攻的第一台发动机。",
    a: {
     pace: 76,
     pass: 72,
     def: 78,
     air: 66,
     fin: 58,
     sta: 84
    },
    _src: "curated"
   },
   {
    n: "希顿",
    en: [
     "Heaton"
    ],
    pos: [
     "GK"
    ],
    foot: "右",
    club: "曼联",
    nat: "英格兰",
    num: 22,
    age: 40,
    season: "1场",
    st: "三号门将兼教练席大脑",
    tags: [
     "门线型"
    ],
    pair: [],
    d: "40岁更衣室财富：训练里给拉门斯当陪练和导师。",
    h: "6' 2\"",
    w: "185 lbs",
    _src: "curated"
   },
   {
    n: "卢克·肖",
    en: [
     "Luke Shaw",
     "肖"
    ],
    pos: [
     "LB",
     "CB"
    ],
    foot: "左",
    club: "曼联",
    nat: "英格兰",
    num: 23,
    age: 31,
    season: "58场1球2助",
    st: "左脚多面手：LB/CB双料",
    tags: [
     "左脚中卫",
     "套边型"
    ],
    weak: "回追慢",
    weakNote: "Sky 2026-27 防线分析：曼联后卫线整体缺少回追速度，Shaw 需要轮换；BBC 记录其多次腿筋/小腿伤。取“回追慢”作为战术针对点，伤病史另列为可用性风险，不混写。",
    pair: [
     "拉什福德：左路一内一外经典"
    ],
    d: "顺足左后卫里传中质量顶级，客串左中卫出球舒服；31岁+伤病史=角色球员，定位球防线和更衣室价值仍在。",
    a: {
     pace: 66,
     pass: 74,
     def: 74,
     air: 65,
     fin: 30,
     sta: 66
    },
    h: "5' 10\"",
    w: "174 lbs",
    _src: "curated"
   },
   {
    n: "乌加特",
    en: [
     "Ugarte"
    ],
    pos: [
     "DM"
    ],
    foot: "右",
    club: "曼联",
    nat: "乌拉圭",
    num: 25,
    age: 25,
    season: "72场2球6助",
    status: "伤停（膝韧带重伤，预计缺阵赛季大部分）",
    st: "纯破坏型绞杀者（伤停中）",
    tags: [
     "破坏型"
    ],
    weak: "压迫下失误",
    weakNote: "PL 官方 2024 分析：缺少 progressive passing，现代 6 号位需要的受压出球是短板；对手会故意放他拿球。抢断/覆盖仍是强项。status=膝韧带重伤（缺席赛季大部分），是可用性风险。",
    pair: [
     "巴莱巴：伤愈后轮换竞争"
    ],
    d: "72场的中场铁驴：抢断凶狠、覆盖大，出球简单。重伤缺阵后他的位置由巴莱巴/桑托斯接棒——复出后面临最激烈的竞争。",
    a: {
     pace: 66,
     pass: 66,
     def: 82,
     air: 58,
     fin: 40,
     sta: 86
    },
    h: "6' 0\"",
    w: "170 lbs",
    _src: "curated"
   },
   {
    n: "海文",
    en: [
     "Heaven"
    ],
    pos: [
     "CB",
     "LB"
    ],
    foot: "左",
    club: "曼联",
    nat: "英格兰",
    num: 26,
    age: 20,
    season: "31场",
    st: "左脚出球中卫，上抢+出球双能",
    tags: [
     "左脚中卫",
     "出球型"
    ],
    weak: "待确认",
    weakNote: "无可靠战术弱点（2026-27 英超仅 2 场）：样本不足；替代观察点：被背身支点拉出、定位球后点、左脚出球受压。不硬编。",
    pair: [
     "约罗：一左一右"
    ],
    d: "2025年1月从阿森纳挖来：左脚、敢上抢、出球冷静，两季31场的轮换量。左脚中卫稀缺属性+年龄=防线未来的重要拼图。",
    a: {
     pace: 72,
     pass: 72,
     def: 72,
     air: 66,
     fin: 25,
     sta: 74
    },
    h: "6' 2\"",
    w: "170 lbs",
    _src: "curated"
   },
   {
    n: "Tynan Thompson",
    en: [
     "Tynan Thompson"
    ],
    num: 27,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "谢什科",
    en: [
     "Sesko",
     "塞斯科"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "曼联",
    nat: "斯洛文尼亚",
    num: 30,
    age: 23,
    season: "38场14球1助",
    st: "支点型9：背身做墙+争顶",
    tags: [
     "支点",
     "全能9潜力"
    ],
    weak: "逆足限制",
    weakNote: "TFA 2026：左脚稳定性/终结需提升（\"weaker-foot consistency must improve\"），身体对抗仍在开发；他在有空间冲身后时最危险，贴身/背身受压时效率下降。",
    pair: [
     "B费：身后球+做墙回做",
     "姆贝乌莫:肋部二点"
    ],
    d: "23岁的现代支点：给二线当墙、禁区内争顶、拉边接应都会，38场14球持续上涨。体系里他往哪顶，双10就往哪钻。",
    a: {
     pace: 78,
     pass: 66,
     def: 42,
     air: 76,
     fin: 74,
     sta: 74
    },
    h: "6' 5\"",
    w: "185 lbs",
    _src: "curated"
   },
   {
    n: "莱西",
    en: [
     "Lacey"
    ],
    pos: [
     "RW",
     "AM"
    ],
    foot: "左",
    club: "曼联",
    nat: "英格兰",
    num: 31,
    age: 19,
    season: "4场1球",
    st: "青训攻击手：肋部小空间",
    tags: [],
    weak: "待确认",
    weakNote: "无可靠战术弱点（2026-27 英超出场 1）：样本不足；Athletic 2026 突破球员特写：左脚、盘带、创造力是卖点。替代观察点：成年队对抗、无球防守、决策速度。",
    pair: [],
    d: "青训左脚攻击手，杯赛轮换对象，一线队首球已到账。",
    a: {
     pace: 82,
     pass: 66,
     def: 38,
     air: 48,
     fin: 58,
     sta: 70
    },
    h: "5' 6\"",
    w: "",
    _src: "curated"
   },
   {
    n: "梅努",
    en: [
     "Mainoo"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "曼联",
    nat: "英格兰",
    num: 37,
    age: 21,
    season: "77场3球6助",
    st: "节奏型8：两闸之间的转身摆脱",
    tags: [
     "组织8"
    ],
    weak: "回追慢",
    weakNote: "TFA 2024 scout：不是“大空间覆盖者”，在更大开放区域会挣扎、防守覆盖容易被抓；Busby Babe 2026 也写他“not the fastest”。Athletic 2026 指其防守站位有改善但样本很小。",
    pair: [
     "蒂勒曼斯：老带新",
     "巴莱巴:攻守分工"
    ],
    d: "压迫下转身是天赋级；77场的出场量说明他是常备轮换。防守强度和比赛管理还在涨——和巴莱巴/桑托斯的竞争是中场未来的主线剧情。",
    a: {
     pace: 64,
     pass: 78,
     def: 70,
     air: 56,
     fin: 50,
     sta: 76
    },
    h: "6' 0\"",
    w: "159 lbs",
    _src: "curated"
   },
   {
    n: "杰克·弗莱彻",
    en: [
     "Jack Fletcher"
    ],
    num: 38,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "5' 11\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "阿玛斯",
    en: [
     "Amass"
    ],
    pos: [
     "LB",
     "LWB"
    ],
    foot: "左",
    club: "曼联",
    nat: "英格兰",
    num: 41,
    age: 19,
    season: "8场",
    st: "左脚青年左后卫",
    tags: [
     "套边型"
    ],
    pair: [],
    d: "青训左闸：传中和往返有模有样，防守对抗是下一课。",
    a: {
     pace: 78,
     pass: 66,
     def: 62,
     air: 52,
     fin: 42,
     sta: 74
    },
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "Dermot Mee",
    en: [
     "Dermot Mee"
    ],
    num: 45,
    pos: [
     "GK"
    ],
    nat: "北爱尔兰",
    age: 23,
    foot: null,
    h: "6' 0\"",
    w: "",
    _src: "espn"
   },
   {
    n: "米",
    en: [
     "Mi"
    ],
    pos: [
     "GK"
    ],
    foot: null,
    club: "曼联",
    nat: "—",
    num: 45,
    age: 23,
    season: "0场",
    st: "青年梯队门将",
    tags: [],
    pair: [],
    d: "第四门将，梯队观察名单。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "Jaydan Kamason",
    en: [
     "Jaydan Kamason"
    ],
    num: 56,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Daniel Armer",
    en: [
     "Daniel Armer"
    ],
    num: 57,
    pos: [
     "DF"
    ],
    nat: "苏格兰",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   }
  ]
 },
 "曼城": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "多纳鲁马",
    en: [
     "Donnarumma"
    ],
    pos: [
     "GK"
    ],
    foot: "右",
    club: "曼城",
    nat: "意大利",
    num: 1,
    st: "扑救机器+大场面体质（副队长）",
    tags: [
     "门线型"
    ],
    pair: [
     "格伊/迪亚斯：新防线核心组"
    ],
    d: "2025夏窗从巴黎加盟曼城当一门+副队长：一对一扑救和反应顶级；出球相比埃德森保守——马雷斯卡的倒脚体系靠后卫线补。",
    weak: "压迫下失误",
    weakNote: "出球/脚下是相对短板：CBS 评论指其传球准确性与受压镇定受质疑；Yahoo/The Athletic 2026-08 报道马雷斯卡在专门设计出球方案保护他（后卫多给接应）。门线扑救仍是顶级。",
    age: 27,
    h: "6' 5\"",
    w: "196 lbs",
    _src: "curated"
   },
   {
    n: "鲁本·迪亚斯",
    en: [
     "R. Dias"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "曼城",
    nat: "葡萄牙",
    st: "队长 · 指挥型拖后中卫",
    tags: [
     "拖后型"
    ],
    pair: [
     "格伊：他扫荡你指挥",
     "格瓦迪奥尔:左出球右指挥"
    ],
    d: "曼城队长：防线的嗓门和秩序，正面对抗稳；多纳鲁马+格伊到位后防线重建的定海针。",
    weak: "伤病史",
    weakNote: "【可用性风险，非战术弱点】2026-01 腿筋伤缺 4–6 周（Guardian/Athletic）；2026-04 踝伤缺席对阿森纳（Yahoo）。拖后指挥与出球仍是防线轴心；不硬编“回追慢”。",
    num: 3,
    age: 29,
    h: "6' 2\"",
    w: "190 lbs",
    _src: "curated"
   },
   {
    n: "格伊",
    en: [
     "Guehi",
     "格伊"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "曼城",
    nat: "英格兰",
    num: 6,
    st: "缠斗型英格兰中卫",
    tags: [
     "上抢型"
    ],
    pair: [
     "迪亚斯：一指挥一缠斗"
    ],
    d: "2026年1月从水晶宫加盟：欧洲杯主力级缠斗+出球，水晶宫多年的防线核心终于去了豪门。",
    weak: "防空弱",
    weakNote: "Andrew Beasley 2025-06 专文《The Aerial Question》：争顶是主要短板；Athletic 2024 数据其每 90 空中对抗获胜 1.29 次，居欧洲五大联赛中卫倒数 13%。地面缠斗、出球与指挥仍是强项。",
    age: 26,
    h: "6' 0\"",
    w: "174 lbs",
    _src: "curated"
   },
   {
    n: "科瓦契奇",
    en: [
     "Kovacic"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "曼城",
    nat: "克罗地亚",
    num: 8,
    st: "转身摆脱型中场",
    tags: [
     "组织8"
    ],
    pair: [
     "恩佐：中场轮换"
    ],
    d: "老将节拍器：压迫下转身是世界级，罗德里离队后中场轮转的保险。",
    weak: "伤病史",
    weakNote: "【可用性风险，非战术弱点】2025-06 与 2025-11 两次跟腱手术，2026 年才逐步复出（Sky/Yahoo）；32 岁，连续作战负荷是主要风险。不硬编战术弱项。",
    age: 32,
    h: "5' 10\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "哈兰德",
    en: [
     "Haaland"
    ],
    pos: [
     "ST"
    ],
    foot: "左",
    club: "曼城",
    nat: "挪威",
    st: "支点+冲击双料：进球机器",
    tags: [
     "全能9",
     "支点"
    ],
    pair: [
     "恩佐：直塞连线",
     "德布劳内离队后:创造力由恩佐/福登接管"
    ],
    d: "每90分钟进球历史级：背身做墙、冲击身后、禁区内抢点全都会——中锋位置的现代答案。",
    weak: "逆足限制",
    weakNote: "相对短板：右脚使用率明显低，2022 年统计其 133 个职业进球仅 15 个来自右脚（AllFootball/球员自述）；Mastermind 2021 球员分析也以“weaker right foot”描述其终结。防守者可诱导其用右脚处理球。左脚终结、冲击身后仍是顶级。",
    num: 9,
    age: 26,
    h: "6' 5\"",
    w: "205 lbs",
    _src: "curated"
   },
   {
    n: "谢尔基",
    en: [
     "Cherki"
    ],
    pos: [
     "AM",
     "RW"
    ],
    foot: "双",
    club: "曼城",
    nat: "法国",
    st: "盘带魔术师：最后一传的想象力",
    tags: [
     "自由10"
    ],
    pair: [],
    d: "里昂青训出品的创造力怪物，2025夏窗加盟：人缝中的直塞肉眼可见。",
    weak: "不参与防守",
    weakNote: "PL 2025-06 分析其球员雷达“并不显示防守跑动”；BTL 2025-04 指其防守工作率仍在补课，不会持续压迫/回追。进攻创造力是顶级。",
    num: 10,
    age: 23,
    h: "5' 11\"",
    w: "157 lbs",
    _src: "curated"
   },
   {
    n: "多库",
    en: [
     "Doku"
    ],
    pos: [
     "LW",
     "RW"
    ],
    foot: "右",
    club: "曼城",
    nat: "比利时",
    st: "顺足下底：一对一天花板",
    tags: [
     "顺足下底"
    ],
    pair: [
     "奥赖利:左路套边/内收互换"
    ],
    d: "变向+加速把防守人晃到怀疑人生，下底传中和内切射门五五开。",
    weak: "待确认",
    weakNote: "无可靠战术弱点：PL 2025-10 与 Athletic 均指其“终结/最后一传”在改善；FotMob 2026-05 记其近 5 场 4 球 2 助，2026-27 前 3 轮 1 球 1 助。样本小，不沿用旧标签“终结效率低”。替代观察点：受压下的最后一传、无球回防、右脚外线传中。",
    num: 11,
    age: 24,
    h: "5' 8\"",
    w: "181 lbs",
    _src: "curated"
   },
   {
    n: "Marcus Bettinelli",
    en: [
     "Marcus Bettinelli"
    ],
    num: 13,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 34,
    foot: null,
    h: "6' 4\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "恩佐",
    en: [
     "Enzo Fernandez"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "曼城",
    nat: "阿根廷",
    st: "组织8/6：右脚对角线大师",
    tags: [
     "组织8"
    ],
    pair: [
     "哈兰德：他直塞你终结",
     "科瓦契奇/安德森:轮转"
    ],
    d: "2026夏窗1.25亿镑破纪录转投曼城：世界杯冠军中场，长传转移和肋部直塞是武器。罗德里走后，他就是曼城的中场大脑。",
    weak: "回追慢",
    weakNote: "The Athletic 2026-08：他在双后腰时球队防守更脆弱；Breaking The Lines：不具爆发力、不适合大空间一防一，缺速度覆盖转换。组织、长传与后插上仍是强项。",
    num: 17,
    age: 25,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "艾特-努里",
    en: [
     "Ait-Nouri"
    ],
    pos: [
     "LB",
     "LWB"
    ],
    foot: "左",
    club: "曼城",
    nat: "阿尔及利亚",
    num: 21,
    st: "攻击型左后卫：带球突进",
    tags: [
     "攻击型",
     "套边型"
    ],
    pair: [
     "多库：左路一内一外"
    ],
    d: "2025夏窗从狼队加盟：阿尔及利亚飞翼，带球突进+下底传中；曼城重建左路的主力。",
    weak: "易失位",
    weakNote: "Sky 2025-06：其站位从来不是简单问题（狼队前助教原话）；PL 分析指其防守数据低于格瓦迪奥尔；BTL 指其注意力会走神、身后空间暴露。进攻推进与套边是强项。",
    age: 25,
    h: "5' 11\"",
    w: "174 lbs",
    _src: "curated"
   },
   {
    n: "维托尔·雷斯",
    en: [
     "Vitor Reis"
    ],
    num: 22,
    pos: [
     "DF"
    ],
    nat: "巴西",
    age: 20,
    foot: null,
    h: "6' 1\"",
    w: "148 lbs",
    _src: "espn-zh"
   },
   {
    n: "格瓦迪奥尔",
    en: [
     "Gvardiol"
    ],
    pos: [
     "CB",
     "LB"
    ],
    foot: "左",
    club: "曼城",
    nat: "克罗地亚",
    st: "左脚中卫/左后卫：带球突进",
    tags: [
     "左脚中卫",
     "出球型"
    ],
    pair: [
     "多库：左路一内一外"
    ],
    d: "从莱比锡到曼城：左脚中卫/左后卫，带球突进像边锋，世界杯一战成名；左脚让左侧出球天然顺，防守 1v1 也硬。",
    weak: "待确认",
    weakNote: "无可靠战术弱点：BBC 2026-09 称其伤愈后 1v1/抢断回到最佳；PL 2026-01 分析也认为其防守强于艾特-努里。替代观察点：高位线身后、伤后连续作战负荷、左脚出球受压。2026-01 骨折仅作可用性备注，不硬套伤病史。",
    num: 24,
    age: 24,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "curated"
   },
   {
    n: "努内斯",
    en: [
     "Matheus Nunes"
    ],
    num: 27,
    pos: [
     "MF"
    ],
    nat: "葡萄牙",
    age: 28,
    foot: null,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "Gerónimo Rulli",
    en: [
     "Gerónimo Rulli"
    ],
    num: 28,
    pos: [
     "GK"
    ],
    nat: "阿根廷",
    age: 34,
    foot: null,
    h: "6' 2\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "奥赖利",
    en: [
     "O'Reilly"
    ],
    pos: [
     "LB",
     "CM",
     "DM"
    ],
    foot: "左",
    club: "曼城",
    nat: "英格兰",
    st: "中场改造的逆足左后卫",
    tags: [
     "内收型",
     "多面手"
    ],
    pair: [
     "艾特-努里：左路轮换"
    ],
    d: "青训中场改造的左脚多面手：左后卫/中场都能踢；内收后多用左脚出球，身高带来空中优势。",
    weak: "待确认",
    weakNote: "无可靠战术弱点：TFA 2026-02 指其不是持续破线的推进器；Squawka 2026 指其每 90 仅 0.8 次成功过人、0.7 次机会创造。但防守与多位置价值受认可（Guardian 2026-04）。替代观察点：最后三分之一创造力、1v1 防守、空中对抗。",
    num: 33,
    age: 21,
    h: "6' 4\"",
    w: "170 lbs",
    _src: "curated"
   },
   {
    n: "Allan Elias",
    en: [
     "Allan Elias"
    ],
    num: 37,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 22,
    foot: null,
    h: "5' 9\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "恩迪亚耶",
    en: [
     "I. Ndiaye"
    ],
    pos: [
     "LW",
     "RW",
     "AM"
    ],
    foot: "右",
    club: "曼城",
    nat: "塞内加尔",
    st: "边路爆点：一对一过人王",
    tags: [
     "逆足内切"
    ],
    pair: [
     "多库：两翼轮换"
    ],
    d: "2026夏窗6500万镑压哨从埃弗顿加盟：一对一天花板级，马雷斯卡为他拆了埃弗顿的进攻发动机。",
    weak: "待确认",
    weakNote: "无可靠战术弱点：TM 列左边锋、右脚；2026-27 英超前段助攻产出正常（2 助），没有稳定的“终结效率低”证据。替代观察点：最后一传选择、右脚内切后的终结、无球回防落位。",
    num: 39,
    _src: "curated"
   },
   {
    n: "安托万·塞门约",
    en: [
     "Antoine Semenyo"
    ],
    num: 42,
    pos: [
     "FW"
    ],
    nat: "加纳",
    age: 26,
    foot: null,
    h: "6' 1\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "福登",
    en: [
     "Foden"
    ],
    pos: [
     "AM",
     "LW",
     "RW"
    ],
    foot: "左",
    club: "曼城",
    nat: "英格兰",
    st: "内收伪10：肋部小空间",
    tags: [
     "伪10",
     "自由10"
    ],
    pair: [
     "哈兰德：贴身做墙他插上"
    ],
    d: "肋部一过一极强，无球时内收当第三个中场——纯瓜系自由人。",
    weak: "逆足限制",
    weakNote: "PL 官网 Preferred Foot=Left；Coaches' Voice 指其几乎全用左脚带球，TFA 球探报告要求其改进右脚；防守者可逼其走右路/用右脚出球。不是状态问题。",
    num: 47,
    age: 26,
    h: "5' 7\"",
    w: "139 lbs",
    _src: "curated"
   },
   {
    n: "Ryan McAidoo",
    en: [
     "Ryan McAidoo"
    ],
    num: 56,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "5' 9\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "Kaden Braithwaite",
    en: [
     "Kaden Braithwaite"
    ],
    num: 61,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "6' 4\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Floyd Samba",
    en: [
     "Floyd Samba"
    ],
    num: 75,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 17,
    foot: null,
    h: "6' 0\"",
    w: "",
    _src: "espn"
   },
   {
    n: "里科·刘易斯",
    en: [
     "Rico Lewis"
    ],
    pos: [
     "RB",
     "LB",
     "DM"
    ],
    foot: "右",
    club: "曼城",
    nat: "英格兰",
    st: "瓜系内收边后卫",
    tags: [
     "内收型"
    ],
    pair: [
     "罗德里离队后:内收补中场人数"
    ],
    d: "逆足也能踢的边后卫，无球时收进中场当第二个6，纯瓜系产品。",
    num: 82,
    age: 21,
    h: "5' 7\"",
    w: "139 lbs",
    _src: "curated"
   },
   {
    n: "Max-Edgar Chabot",
    en: [
     "Max-Edgar Chabot"
    ],
    num: 94,
    pos: [
     "GK"
    ],
    nat: "法国",
    age: 18,
    foot: null,
    h: "6' 2\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Dexter Oliver",
    en: [
     "Dexter Oliver"
    ],
    num: null,
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
    n: "斯通斯",
    en: [
     "Stones"
    ],
    pos: [
     "CB",
     "DM"
    ],
    foot: "右",
    club: "曼城",
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
    _src: "curated",
    _rosterMiss: true
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
    club: "曼城",
    nat: "瑞士",
    st: "多面手出球中卫",
    tags: [
     "出球型"
    ],
    pair: [],
    d: "能踢右中卫/右后卫/后腰的万能胶水，脚下在压迫下很冷静。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "吉布斯-怀特",
    en: [
     "Gibbs-White"
    ],
    pos: [
     "AM",
     "CM"
    ],
    foot: "右",
    club: "曼城",
    nat: "英格兰",
    st: "全能攻击中场",
    tags: [
     "现代10"
    ],
    pair: [],
    d: "2026夏窗从森林加盟：持球推进+直塞+逼抢全能。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "埃利奥特·安德森",
    en: [
     "Elliot Anderson"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "右",
    club: "曼城",
    nat: "英格兰",
    st: "全能青年中场：破压迫推进",
    tags: [
     "B2B",
     "拖后组织"
    ],
    pair: [
     "恩佐：一抢一传"
    ],
    d: "2026夏窗亿元级从森林加盟：带球破压迫+抢断时机+左右脚出球，英格兰新晋国脚——罗德里继任者工程的一部分。",
    weak: "待确认",
    weakNote: "无可靠战术弱点：TFA 2026-03 将其评为攻守两端 two-way player；WhoScored 列传球/盘带/定位球为强项，未给明确弱项。替代观察点：禁区前沿犯规、空中对抗、被高强度逼抢时的转身出球。",
    _src: "curated"
   },
   {
    n: "布阿迪",
    en: [
     "Bouaddi",
     "布阿迪"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "右",
    club: "曼城",
    nat: "法国",
    st: "年轻拖后组织：DM/CM",
    tags: [
     "拖后组织"
    ],
    weak: "待确认",
    weakNote: "无可靠战术弱点（2026-27 英超 4 场/122 分钟，1 首发）：TFA 指 progressive passing 是相对弱项，但不在本项目 11 词表，不硬套；替代观察点：英超强度下的对抗、被逼抢时转身、防守定位。",
    pair: [
     "恩佐：中场轮换"
    ],
    d: "2026-27 英超 4 场/122 分钟、1 首发；上季里尔 30 场/2354 分钟；拖后组织，英超强度下的对抗与转身是观察点。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "库萨诺夫",
    en: [
     "Khusanov",
     "库萨诺夫"
    ],
    pos: [
     "CB",
     "RB"
    ],
    foot: "右",
    club: "曼城",
    nat: "乌兹别克斯坦",
    st: "上抢+回追中卫/右后卫",
    tags: [
     "上抢型",
     "回追型"
    ],
    weak: "待确认",
    weakNote: "无可靠战术弱点：Goal 2026-04 形容其 aggressive/tenacious，回追与对抗是卖点；替代观察点：后场出球受压、禁区后点争顶、上抢后的身后空间。",
    pair: [
     "迪亚斯：中卫轮换"
    ],
    d: "2026-27 4 场/283 分钟，上季 21 场/1429；回追和对抗是卖点，后场出球受压与上抢后的身后空间是观察点。",
    _src: "curated",
    _rosterMiss: true
   }
  ]
 },
 "阿森纳": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "拉亚",
    en: [
     "Raya"
    ],
    pos: [
     "GK"
    ],
    foot: "右",
    club: "阿森纳",
    nat: "西班牙",
    st: "清球型，脚下参与build-up",
    tags: [
     "清球型"
    ],
    pair: [
     "萨利巴：短传出球网"
    ],
    d: "阿尔特塔体系的第11人传球点，敢在压迫下短传两翼。",
    weak: "待确认",
    weakNote: "无可靠战术弱点：BBC 2025-12 称其高空球/角球出击是强项，EA FC 27 给 Cross Claimer+；替代观察点：禁区外远射、被高位逼抢时的第一脚出球、点球。",
    num: 1,
    age: 31,
    h: "6' 0\"",
    w: "174 lbs",
    _src: "curated"
   },
   {
    n: "萨利巴",
    en: [
     "Saliba"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "阿森纳",
    nat: "法国",
    st: "出球型+回追型中卫",
    tags: [
     "出球型",
     "回追型"
    ],
    pair: [
     "加布里埃尔：一左一右出球网"
    ],
    d: "带球推进破压迫是招牌，回追速度中卫里前几；阿森纳后场秩序的根基。",
    status: "伤停（背伤，约11月复出）",
    weak: "伤病史",
    weakNote: "2026-07-22 官方医疗更新：世界杯半决赛后背伤，需较长时间缺阵；2026-10-03 报道接近复出但未确认。可用性风险，不是战术短板。",
    num: 2,
    age: 25,
    h: "6' 4\"",
    w: "203 lbs",
    _src: "curated"
   },
   {
    n: "莫斯克拉",
    en: [
     "Cristhian Mosquera"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 22,
    foot: null,
    h: "6' 3\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "本·怀特",
    en: [
     "Ben White"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 29,
    foot: null,
    h: "6' 1\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "辛卡皮耶",
    en: [
     "Piero Hincapié"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "厄瓜多尔",
    age: 24,
    foot: null,
    h: "6' 0\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "加布里埃尔",
    en: [
     "Gabriel Magalhaes"
    ],
    pos: [
     "CB"
    ],
    foot: "左",
    club: "阿森纳",
    nat: "巴西",
    st: "左脚争顶+定位球杀手",
    tags: [
     "左脚中卫",
     "争顶型"
    ],
    pair: [
     "萨利巴：他上抢你补位"
    ],
    d: "攻防两端定位球都是武器，左脚中卫让阿森纳左侧出球天然顺。",
    weak: "待确认",
    weakNote: "无可靠战术弱点：TFA 只指其长传调度偏保守（不属于 11 词）；替代观察点：被快速二过一拉出左肋、转身回追、定位球防守犯规。",
    num: 6,
    age: 28,
    h: "6' 3\"",
    w: "203 lbs",
    _src: "curated"
   },
   {
    n: "萨卡",
    en: [
     "Saka"
    ],
    pos: [
     "RW",
     "RB"
    ],
    foot: "左",
    club: "阿森纳",
    nat: "英格兰",
    st: "左脚右路：内切+回做双核",
    tags: [
     "逆足内切"
    ],
    pair: [
     "厄德高：右肋双左脚",
     "卡拉菲奥里/斯凯利:套边"
    ],
    d: "阿森纳青训招牌：内切射门+倒三角回做+防守回追全都有，英超最全面右边锋。",
    weak: "伤病史",
    weakNote: "2024-12 腿筋伤、2025-08 腿筋伤、2026-01 髋伤；多次软组织伤，出勤有风险。",
    num: 7,
    age: 25,
    h: "5' 10\"",
    w: "141 lbs",
    _src: "curated"
   },
   {
    n: "厄德高",
    en: [
     "Odegaard"
    ],
    pos: [
     "AM",
     "CM"
    ],
    foot: "左",
    club: "阿森纳",
    nat: "挪威",
    st: "右肋组织核心：内切直塞",
    tags: [
     "现代10"
    ],
    pair: [
     "萨卡：右路双左脚连线"
    ],
    d: "右肋部持球吸引+斜塞身后，阿森纳进攻的发牌员；压迫逼抢也是队内标杆。",
    weak: "逆足限制",
    weakNote: "EA FC 27 右脚弱势脚仅 2 星；TFA 另指其持球推进成功率 53.1%、有时拖延出球；逼他右脚/右侧出球是可用针对点。",
    num: 8,
    age: 27,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "curated"
   },
   {
    n: "埃泽",
    en: [
     "Eze"
    ],
    pos: [
     "AM",
     "LW"
    ],
    foot: "右",
    club: "阿森纳",
    nat: "英格兰",
    st: "盘带型10：一对多破密集",
    tags: [
     "自由10"
    ],
    pair: [
     "厄德高：双组织点轮转"
    ],
    d: "2025夏窗加盟：人球结合晃开空间后直塞或远射，破密集防守的钥匙。",
    weak: "待确认",
    weakNote: "无可靠战术弱点；TFA 数据：29.7% 丢球在本方半场、70 次空中对抗仅赢 14.3%，但不足以定为“压迫下失误”；替代观察点：后场背身接球、左路回防、空中对抗。",
    num: 10,
    age: 28,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "廷贝尔",
    en: [
     "Timber"
    ],
    pos: [
     "RB",
     "CB",
     "LB"
    ],
    foot: "右",
    club: "阿森纳",
    nat: "荷兰",
    st: "全能防线多面手",
    tags: [
     "多面手"
    ],
    pair: [],
    d: "三处都能踢且都是顶级水准，阿森纳防线的万能胶。",
    weak: "伤病史",
    weakNote: "2023-24 ACL 赛季报销；2025-12 踝伤、2026-03 踝伤、2026-06 腹股沟伤；2026-27 季前持续缺阵。出勤不稳定。",
    num: 12,
    age: 25,
    h: "5' 10\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "凯帕",
    en: [
     "Kepa Arrizabalaga"
    ],
    num: 13,
    pos: [
     "GK"
    ],
    nat: "西班牙",
    age: 32,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "约克雷斯",
    en: [
     "Gyokeres",
     "约克雷斯"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "阿森纳",
    nat: "瑞典",
    st: "冲击型9：转身暴走+爆射",
    tags: [
     "全能9"
    ],
    pair: [
     "厄德高(国家队):连线重启"
    ],
    d: "葡超两季轰出夸张数据后2025夏窗登陆酋长球场：直塞身后接应+一条龙暴走是招牌。",
    weak: "防空弱",
    weakNote: "争顶/背身护球不是强项：Arseblog 2026-09 称其护球几乎不存在、不能当压力阀；多篇分析指其第一脚在对抗下不稳、做球受限。非官方统计。",
    num: 14,
    age: 28,
    h: "6' 2\"",
    w: "196 lbs",
    _src: "curated"
   },
   {
    n: "孔萨",
    en: [
     "Ezri Konsa"
    ],
    num: 15,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 29,
    foot: null,
    h: "6' 0\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "马杜埃凯",
    en: [
     "Madueke"
    ],
    pos: [
     "RW",
     "LW"
    ],
    foot: "左",
    club: "阿森纳",
    nat: "英格兰",
    st: "左脚右路：爆点+内切",
    tags: [
     "逆足内切"
    ],
    pair: [
     "萨卡：右路轮换双保险"
    ],
    d: "2025夏窗从切尔西加盟：一对一爆趟凶，内切爆射有力。",
    weak: "终结效率低",
    weakNote: "BBC 2026-10 仍指其 end product 受质疑；Sky 2025-07 称缺乏产出一贯是挫败点；Athletic 称无球端有进步，但产出仍是短板。",
    num: 20,
    age: 24,
    h: "6' 0\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "梅里诺",
    en: [
     "Merino"
    ],
    pos: [
     "CM",
     "ST"
    ],
    foot: "左",
    club: "阿森纳",
    nat: "西班牙",
    st: "B2B兼职9号",
    tags: [
     "B2B"
    ],
    pair: [],
    d: "世界杯冠军中场：头球和后插上让他客串中锋都高产。",
    num: 23,
    age: 30,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "哈弗茨",
    en: [
     "Havertz"
    ],
    pos: [
     "ST",
     "AM",
     "CM"
    ],
    foot: "左",
    club: "阿森纳",
    nat: "德国",
    st: "全能前场：9号/10号/8号都能踢",
    tags: [
     "伪9",
     "全能9"
    ],
    pair: [
     "约克雷斯：轮换/共存实验"
    ],
    d: "1米93的脚下流：背身、回撤、后插上都会；伤病是变量。",
    weak: "伤病史",
    weakNote: "2025-02 腿筋伤赛季报销；2025-08 膝伤、11月反复；2026-02 肌肉伤再缺阵。出勤不稳定。",
    num: 29,
    age: 27,
    h: "6' 4\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "Illan Meslier",
    en: [
     "Illan Meslier"
    ],
    num: 30,
    pos: [
     "GK"
    ],
    nat: "法国",
    age: 26,
    foot: null,
    h: "6' 6\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "卡拉菲奥里",
    en: [
     "Calafiori"
    ],
    pos: [
     "LB",
     "CB"
    ],
    foot: "左",
    club: "阿森纳",
    nat: "意大利",
    st: "带球推进的左脚多面手",
    tags: [
     "左脚中卫",
     "出球型"
    ],
    pair: [
     "萨利巴：推进分工"
    ],
    d: "中卫出身敢带球突进前场，阿尔特塔把他当左路组织点用。",
    weak: "伤病史",
    weakNote: "16岁左膝多条韧带撕裂；2025-12 对布莱顿热身肌肉伤缺约一个月，2026-02 对维冈热身再伤；出勤不稳定。",
    num: 33,
    age: 24,
    h: "6' 2\"",
    w: "190 lbs",
    _src: "curated"
   },
   {
    n: "苏比门迪",
    en: [
     "Zubimendi",
     "祖比门迪"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "右",
    club: "阿森纳",
    nat: "西班牙",
    st: "拖后组织6号：罗德里同门",
    tags: [
     "拖后组织"
    ],
    pair: [
     "赖斯：一组织一破坏双6"
    ],
    d: "皇家社会青训：接球转身一气呵成，压迫下从不慌。2025夏窗加盟阿森纳当节拍器。",
    weak: "防空弱",
    weakNote: "TFA 球探报告：缺乏传统 6 号的制空与身体对抗；对手可用长球打他所在区域。PL 官方同时称其出球抗压是强项，弱点只在防守空中/对抗。",
    num: 36,
    age: 27,
    h: "5' 11\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "赖斯",
    en: [
     "Rice"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "右",
    club: "阿森纳",
    nat: "英格兰",
    st: "破坏型+推进双料6/8",
    tags: [
     "破坏型",
     "B2B"
    ],
    pair: [
     "苏比门迪：一保一攻"
    ],
    d: "带球推进破压迫是隐藏技能，防守拦截覆盖面积大；角球进攻也是头牌。",
    weak: "待确认",
    weakNote: "无可靠战术弱点；左脚较弱（EA FC 27 3星），但 BTL 统计他仍场均左脚传球 7.89 次；替代观察点：逼他左脚出球、背身接球、禁区前沿转身。",
    num: 41,
    age: 27,
    h: "6' 2\"",
    w: "168 lbs",
    _src: "curated"
   },
   {
    n: "Ife Ibrahim",
    en: [
     "Ife Ibrahim"
    ],
    num: 44,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Theo Julienne",
    en: [
     "Theo Julienne"
    ],
    num: 45,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Ceadach O’Neill",
    en: [
     "Ceadach O’Neill"
    ],
    num: 53,
    pos: [
     "FW"
    ],
    nat: "北爱尔兰",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "道曼",
    en: [
     "Max Dowman"
    ],
    num: 56,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 16,
    foot: null,
    h: "6' 0\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "Marcell Washington",
    en: [
     "Marcell Washington"
    ],
    num: 60,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Andre Annous",
    en: [
     "Andre Annous"
    ],
    num: 71,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "5' 11\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Maalik Hashi",
    en: [
     "Maalik Hashi"
    ],
    num: 74,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Marli Salmon",
    en: [
     "Marli Salmon"
    ],
    num: 89,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 17,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "刘易斯·斯凯利",
    en: [
     "Lewis-Skelly"
    ],
    pos: [
     "CM",
     "DM",
     "LB"
    ],
    foot: "左",
    club: "阿森纳",
    nat: "英格兰",
    st: "左脚中场/左后卫",
    tags: [
     "B2B"
    ],
    pair: [],
    d: "2026-27 主要踢中场：左脚、能在狭小空间转身推进；也能回到左后卫。",
    weak: "待确认",
    weakNote: "无可靠战术弱点；2026-27 已主要踢中场（官网 2026-05、Yahoo 2026-10），EA 仍列 LB；替代观察点：高位丢球后的回追、强对抗、防守站位。",
    _src: "curated"
   },
   {
    n: "吉马良斯",
    en: [
     "B. Guimaraes"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "阿森纳",
    nat: "巴西",
    st: "B2B/组织8：对抗+推进，能踢6/8",
    tags: [
     "B2B",
     "组织8"
    ],
    pair: [
     "赖斯：双后腰轮换"
    ],
    d: "2026夏窗从纽卡加盟：对抗和跑动强，能在压力下转身推进；创造力低于厄德高，纪律是可用性风险。",
    weak: "待确认",
    weakNote: "无可靠战术弱点：Arsenal官网称其对抗/跑动强、能推进；2025-26有6黄1停赛，属可用性风险不是战术短板；替代观察点：被快速转换打身后、逼他背身接球、诱导前压后打身后。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "措利斯",
    en: [
     "Christos Tzolis",
     "Tzolis",
     "措利斯"
    ],
    pos: [
     "LW",
     "RW"
    ],
    foot: "右",
    club: "阿森纳",
    nat: "希腊",
    st: "右脚左边锋：内切+终结",
    tags: [
     "逆足内切"
    ],
    weak: "伤病史",
    weakNote: "2026-10 肌肉伤（Grade 2）缺阵数周，Arteta 10-13 称其“not available yet”；属可用性风险，不是战术短板。",
    status: "伤停（肌肉伤，数周）",
    pair: [
     "卡拉菲奥里：左路套边"
    ],
    d: "2026夏窗从布鲁日加盟：右脚左路，内切射门和最后一传是强项；无球防守仍需适应英超。",
    _src: "curated",
    _rosterMiss: true
   }
  ]
 },
 "利物浦": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "阿利松",
    en: [
     "Alisson"
    ],
    pos: [
     "GK"
    ],
    foot: "右",
    club: "利物浦",
    nat: "巴西",
    st: "出球+扑救双修的清球型",
    tags: [
     "清球型"
    ],
    pair: [
     "范戴克：门将-清道夫轴"
    ],
    d: "现代门将模板：脚敢出球、站位敢压上当清道夫，扑救关键时刻从不掉链。",
    weak: "伤病史",
    weakNote: "【可用性风险，非战术弱点】2025-26 多次肌肉/腿筋伤：2025-10 腿筋伤缺至 11 月，2026-03 肌肉伤缺至 5 月（TM/官网伤情）。2026-10-18 已可出场；不是站位/出球短板。替代观察点：高位防线后的出击范围、连续一周双赛的轮换。",
    num: 1,
    age: 34,
    h: "6' 4\"",
    w: "201 lbs",
    _src: "curated"
   },
   {
    n: "乔·戈麦斯",
    en: [
     "Joe Gomez"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 29,
    foot: null,
    h: "6' 2\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "远藤航",
    en: [
     "Wataru Endo"
    ],
    num: 3,
    pos: [
     "MF"
    ],
    nat: "日本",
    age: 33,
    foot: null,
    h: "5' 10\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "范戴克",
    en: [
     "van Dijk"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "利物浦",
    nat: "荷兰",
    st: "拖后清道夫的世界模板",
    tags: [
     "拖后型",
     "出球型"
    ],
    pair: [
     "阿利松：门将-清道夫轴",
     "佳夫?不——科纳特已离队,搭档以现役为准"
    ],
    d: "站位、指挥、长传、争顶全是顶级；他在的防线降一档难度。年龄后转身略慢，靠预判弥补。科纳特2026夏窗转投皇马后，他的新搭档是转会市场课题。",
    weak: "回追慢",
    weakNote: "2026-10 Anfield Agenda/ESPN 评述：35 岁后转身与长距离回追下降，靠预判和站位弥补；不是被速度型前锋一碰就穿，而是防线压高时身后空间需要保护。",
    num: 4,
    age: 35,
    h: "6' 5\"",
    w: "203 lbs",
    _src: "curated"
   },
   {
    n: "Jérémy Jacquet",
    en: [
     "Jérémy Jacquet"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 21,
    foot: null,
    h: "6' 2\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "科尔克兹",
    en: [
     "Kerkez"
    ],
    pos: [
     "LB",
     "LWB"
    ],
    foot: "左",
    club: "利物浦",
    nat: "匈牙利",
    st: "年轻攻击型左后卫",
    tags: [
     "套边型"
    ],
    pair: [
     "罗伯逊离队后:左路主力"
    ],
    d: "2025夏窗从伯恩茅斯加盟：对抗凶、上得去，罗伯逊走后他就是利物浦左路的主人。",
    weak: "待确认",
    weakNote: "无可靠公开战术弱点：PL 官方 2025 分析强调其前压是设计，不是防守缺陷；The Athletic 2025-12 的“inhibited/tactical tweak”更像角色适配（付费墙）。替代观察点：1v1 防守身体姿态、后点高球、前压后的回位。",
    num: 6,
    age: 22,
    h: "5' 11\"",
    w: "157 lbs",
    _src: "curated"
   },
   {
    n: "维尔茨",
    en: [
     "Wirtz"
    ],
    pos: [
     "AM",
     "CM"
    ],
    foot: "右",
    club: "利物浦",
    nat: "德国",
    st: "现代10/8 hybrid：肋部创造力",
    tags: [
     "自由10",
     "组织8"
    ],
    pair: [
     "萨拉赫：右肋双核",
     "伊萨克:身后球"
    ],
    d: "勒沃库森双冠王核心：最后一传的想象力+反抢意愿，2025夏窗天价加盟利物浦。",
    weak: "压迫下失误",
    weakNote: "The Athletic 2025-10 与 Guardian 2026-10：初到英超时对抗下容易被挤开、丢球；TAW 2026-02 指其回撤过深、破坏阵型。取“压迫下失误”（受压护球/出球），不是态度问题。",
    num: 7,
    age: 23,
    h: "5' 9\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "索博斯洛伊",
    en: [
     "Szoboszlai"
    ],
    pos: [
     "AM",
     "CM",
     "RM"
    ],
    foot: "右",
    club: "利物浦",
    nat: "匈牙利",
    st: "重炮手8/10：远射+任意球",
    tags: [
     "B2B"
    ],
    pair: [
     "麦卡利斯特：双8轮转"
    ],
    d: "禁区外爆射和定位球是武器，体能跑动覆盖两个禁区。",
    weak: "待确认",
    weakNote: "无可靠战术弱点：2025-26 英超 8 黄为队内最多（FotMob），但纪律属可用性风险、不足以定为战术短板；TFA 2026 反而称其为利物浦 MVP。当前腿筋伤需复核（10-17 首发，10-19 官方伤停页仍列）。替代观察点：双后腰站位、右肋接球第一脚、压迫后的回位。",
    num: 8,
    age: 26,
    h: "6' 1\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "伊萨克",
    en: [
     "Isak"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "利物浦",
    nat: "瑞典",
    st: "全能9：背身+冲刺+脚下",
    tags: [
     "全能9"
    ],
    pair: [
     "萨拉赫：右肋传跑",
     "维尔茨:直塞"
    ],
    d: "2025夏窗英国纪录价加盟：中锋里少见的细腻脚下+冲刺身后的双重威胁。",
    weak: "伤病史",
    weakNote: "【可用性风险，非战术弱点】TM/Flashscore：2026-27 大腿伤缺 21 天，2025-26 肌肉/内收肌问题反复；2026-09-27 再次大腿伤，10 月已复出。健康时是全能 9，不是战术短板。替代观察点：连续首发能力、伤后爆发力。",
    num: 9,
    age: 27,
    h: "6' 3\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "麦卡利斯特",
    en: [
     "Mac Allister"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "利物浦",
    nat: "阿根廷",
    st: "智能型8/6：节奏和直塞",
    tags: [
     "组织8"
    ],
    pair: [
     "恩佐(国家队):中场三人组"
    ],
    d: "阿根廷世界杯中场三人组之一：出球选择聪明，防守时机好。",
    weak: "回追慢",
    weakNote: "Distance Covered/The Athletic 分析：缺乏顶级速度，一旦被过很难再追回（“once beaten, essentially out of the game”）；防守靠预判和站位，不是覆盖型 8 号。",
    num: 10,
    age: 27,
    h: "5' 9\"",
    w: "163 lbs",
    _src: "curated"
   },
   {
    n: "布拉德利",
    en: [
     "Bradley"
    ],
    pos: [
     "RB",
     "RWB"
    ],
    foot: "右",
    club: "利物浦",
    nat: "北爱尔兰",
    st: "年轻套边右后卫",
    tags: [
     "套边型"
    ],
    pair: [
     "弗林蓬：轮换搭档"
    ],
    d: "对抗和往返不怵，向前果断。",
    weak: "伤病史",
    weakNote: "【可用性风险，非战术弱点】长期膝伤：2026-27 英超 0 分钟；2025-26 21 场。当前预计 12 月/1 月复出；不占 18 人，保留库内观察。替代观察点：复出后的连续首发能力、冲刺次数。",
    status: "伤停（膝伤，预计12月/1月）",
    num: 12,
    age: 23,
    h: "5' 11\"",
    w: "139 lbs",
    _src: "curated"
   },
   {
    n: "基耶萨",
    en: [
     "Federico Chiesa"
    ],
    num: 14,
    pos: [
     "FW"
    ],
    nat: "意大利",
    age: 29,
    foot: null,
    h: "5' 9\"",
    w: "152 lbs",
    _src: "espn-zh"
   },
   {
    n: "Giovanni Leoni",
    en: [
     "Giovanni Leoni"
    ],
    num: 15,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 19,
    foot: null,
    h: "6' 5\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "加克波",
    en: [
     "Gakpo"
    ],
    pos: [
     "LW",
     "ST"
    ],
    foot: "右",
    club: "利物浦",
    nat: "荷兰",
    st: "右脚左路：内切+抢点",
    tags: [
     "逆足内切"
    ],
    pair: [
     "巴尔克拉：两翼轮换"
    ],
    d: "左肋多面手：内切射门+禁区内包抄，大赛型球员。",
    weak: "待确认",
    weakNote: "无可靠战术弱点：BBC 2026-06 指其与科尔克兹的左路配合需要打磨，但这是配合问题，未到“易失位/不参与防守”的程度；The Athletic 也更多讨论角色与状态而非固定短板。替代观察点：左路二人配合、无球跑位、终结稳定性。",
    num: 18,
    age: 27,
    h: "6' 4\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "Kostas Tsimikas",
    en: [
     "Kostas Tsimikas"
    ],
    num: 21,
    pos: [
     "DF"
    ],
    nat: "希腊",
    age: 30,
    foot: null,
    h: "5' 10\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "埃基蒂克",
    en: [
     "Ekitike"
    ],
    pos: [
     "ST",
     "LW"
    ],
    foot: "右",
    club: "利物浦",
    nat: "法国",
    st: "脚下型9：回撤做球",
    tags: [
     "全能9"
    ],
    pair: [
     "伊萨克：双9轮换/共存实验"
    ],
    d: "2025夏窗加盟：能回撤中场当组织点再冲禁区，聪明跑位型。",
    weak: "伤病史",
    weakNote: "【可用性风险，非战术弱点】2026-04 跟腱断裂，预计 2027 复出；本赛季报销，移出 18 人池，保留库内。健康时是脚下型 9/回撤做球点；替代观察点：复出后的爆发力与连续出场。",
    status: "伤停（跟腱断裂，预计2027）",
    num: 22,
    age: 24,
    h: "6' 3\"",
    w: "168 lbs",
    _src: "curated"
   },
   {
    n: "Víctor Muñoz",
    en: [
     "Víctor Muñoz"
    ],
    num: 23,
    pos: [
     "FW"
    ],
    nat: "西班牙",
    age: 23,
    foot: null,
    h: "5' 8\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "马马达什维利",
    en: [
     "Giorgi Mamardashvili"
    ],
    num: 25,
    pos: [
     "GK"
    ],
    nat: "格鲁吉亚",
    age: 26,
    foot: null,
    h: "6' 6\"",
    w: "196 lbs",
    _src: "espn-zh"
   },
   {
    n: "Freddie Woodman",
    en: [
     "Freddie Woodman"
    ],
    num: 28,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 29,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "弗林蓬",
    en: [
     "Frimpong"
    ],
    pos: [
     "RWB",
     "RB",
     "RW"
    ],
    foot: "右",
    club: "利物浦",
    nat: "荷兰",
    st: "翼卫永动机：超车下底",
    tags: [
     "套边型",
     "翼卫"
    ],
    pair: [
     "萨拉赫：右路双边锋错位跑动"
    ],
    d: "直线冲刺+往返能力极端，勒沃库森三中卫右翼卫出身，2025夏窗加盟利物浦。",
    weak: "防空弱",
    weakNote: "TFA 球探报告：空中对抗成功率 30.8%；Coaches' Voice 记其 5ft8 身高、面对高大边锋常避战。四后卫右路后点高球是明确针对点。当前腿筋伤（官方 10-19 伤停页，预计 11 月国际比赛日后），属可用性风险，另记。",
    num: 30,
    age: 25,
    h: "5' 7\"",
    w: "139 lbs",
    _src: "curated"
   },
   {
    n: "格拉文贝赫",
    en: [
     "Gravenberch"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "右",
    club: "利物浦",
    nat: "荷兰",
    st: "转身摆脱型6号",
    tags: [
     "拖后组织"
    ],
    pair: [
     "索博斯洛伊：他持球你插上"
    ],
    d: "2024-25爆发：后腰位置上的带球推进+摆脱是英超独一档。",
    weak: "易失位",
    weakNote: "The Athletic 2025 与 Anfield Index/Stats Man 2026 分析：他是被改造的 6 号，单后腰位置感/站位纪律不是天然强项；被拉出位置后身后需要人补。带球推进和摆脱仍是强项。属分析观点，不是官方统计。",
    num: 38,
    age: 24,
    h: "6' 3\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "特雷·尼奥尼",
    en: [
     "Trey Nyoni"
    ],
    num: 42,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "5' 11\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "Luke Chambers",
    en: [
     "Luke Chambers"
    ],
    num: 44,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 22,
    foot: null,
    h: "5' 11\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "James McConnell",
    en: [
     "James McConnell"
    ],
    num: 53,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 22,
    foot: null,
    h: "5' 9\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "Vitezslav Jaros",
    en: [
     "Vitezslav Jaros"
    ],
    num: 56,
    pos: [
     "GK"
    ],
    nat: "捷克",
    age: 25,
    foot: null,
    h: "6' 3\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "Lewis Koumas",
    en: [
     "Lewis Koumas"
    ],
    num: 67,
    pos: [
     "FW"
    ],
    nat: "威尔士",
    age: 21,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "恩古莫哈",
    en: [
     "Rio Ngumoha"
    ],
    num: 73,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "5' 7\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jayden Danns",
    en: [
     "Jayden Danns"
    ],
    num: 76,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 20,
    foot: null,
    h: "6' 0\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "Joshua Lambie",
    en: [
     "Joshua Lambie"
    ],
    num: 82,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Wellity Lucky",
    en: [
     "Wellity Lucky"
    ],
    num: 92,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 20,
    foot: null,
    h: "5' 9\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "Michael Laffey",
    en: [
     "Michael Laffey"
    ],
    num: 94,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 21,
    foot: null,
    h: "5' 9\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "Harvey Davies",
    en: [
     "Harvey Davies"
    ],
    num: 95,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 23,
    foot: null,
    h: "6' 3\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "巴尔克拉",
    en: [
     "Barcola"
    ],
    pos: [
     "LW",
     "RW"
    ],
    foot: "右",
    club: "利物浦",
    nat: "法国",
    st: "右脚左路：直线爆点+内切",
    tags: [
     "逆足内切"
    ],
    pair: [
     "萨拉赫：右路轮换",
     "加克波:左路互换"
    ],
    d: "2026夏窗1亿镑级从巴黎加盟：启动冲刺+变向内切，巴黎两冠功臣。利物浦攻击群的法国拼图。",
    weak: "终结效率低",
    weakNote: "The Athletic/Anfield Insights 2026：速度、盘带、跑位是强项，但门前终结效率是相对短板；TFA 球探报告同样把 finishing 列为需要提升项，不是创造机会能力问题。",
    _src: "curated"
   },
   {
    n: "阿劳霍",
    en: [
     "Araujo"
    ],
    pos: [
     "CB",
     "RB"
    ],
    foot: "右",
    club: "利物浦",
    nat: "乌拉圭",
    st: "对抗型猛男中卫",
    tags: [
     "上抢型"
    ],
    pair: [
     "库巴西：他出球你缠斗"
    ],
    d: "正面对抗和回追都在线，乌拉圭血统的斗犬。",
    _src: "curated"
   }
  ]
 },
 "热刺": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "罗伯逊",
    en: [
     "Robertson"
    ],
    pos: [
     "LB",
     "LWB"
    ],
    foot: "左",
    club: "热刺",
    nat: "苏格兰",
    st: "传统套边左后卫：传中机器",
    tags: [
     "套边型"
    ],
    pair: [
     "索兰克：传中找点"
    ],
    d: "2026夏窗转投热刺：和萨拉赫的「内切+套边」是英超十年最佳边路组合之一；体能和传中稳定性是招牌——德泽尔比左路的即战力答案。",
    weak: "体能掉档",
    weakNote: "32 岁；Transferhub 数据文章指其“slowing down in the second half”，xA 从巅峰期约 0.20/90 降到近两季约 0.14/90；不是不会防守，是回追/助攻续航下滑，70 分钟后更明显。",
    num: 3,
    age: 32,
    h: "5' 10\"",
    w: "139 lbs",
    _src: "curated"
   },
   {
    n: "塞内西",
    en: [
     "Senesi"
    ],
    pos: [
     "CB"
    ],
    foot: "左",
    club: "热刺",
    nat: "阿根廷",
    st: "左脚出球中卫",
    tags: [
     "左脚中卫",
     "出球型"
    ],
    pair: [],
    d: "2026夏窗从伯恩茅斯加盟：左脚长传调度，热刺防线左出球答案。",
    weak: "防空弱",
    weakNote: "Transferhub 数据：空中对抗胜率约 46%，生涯从未超过 60%；左脚出球是强项，定位球防空是相对短板。",
    num: 5,
    age: 29,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "范赫克",
    en: [
     "van Hecke"
    ],
    pos: [
     "CB",
     "RB"
    ],
    foot: "右",
    club: "热刺",
    nat: "荷兰",
    st: "出球型年轻中卫",
    tags: [
     "出球型"
    ],
    pair: [
     "托辛：右中卫/中卫轮换"
    ],
    d: "2026夏窗从布莱顿加盟热刺：出球冷静+对抗进步快，德泽尔比在布莱顿就了解他的建队拼图。",
    weak: "易失位",
    weakNote: "Yahoo 2026-08 赛后分析：防守端“aggressively stepping out of position for no apparent reason”，高位线被身后球打穿；TFA 球探同时肯定其出球与拦截。属上抢时机/位置感风险，不是速度问题。",
    num: 6,
    age: 26,
    h: "6' 2\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "西蒙斯",
    en: [
     "X. Simons"
    ],
    pos: [
     "AM",
     "LW",
     "RW"
    ],
    foot: "右",
    club: "热刺",
    nat: "荷兰",
    st: "肋部游弋型攻击手",
    tags: [
     "自由10"
    ],
    pair: [
     "波尔诺：右肋二人转"
    ],
    d: "持球推进和最后一传都在线，2025夏窗加盟热刺；哈维接手荷兰后他也是国家队肋部答案。",
    status: "伤停（ACL，预计2027）",
    weak: "伤病史",
    weakNote: "【可用性风险】2026-04 ACL 断裂，预计 2027 复出；本季 0 分钟。此前战术标签为逆足限制，但当前主要风险是出勤；不占 18 人。",
    num: 7,
    age: 23,
    h: "5' 10\"",
    w: "128 lbs",
    _src: "curated"
   },
   {
    n: "加拉格尔",
    en: [
     "Gallagher"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "热刺",
    nat: "英格兰",
    st: "跑不死B2B：逼抢强度担当",
    tags: [
     "B2B"
    ],
    pair: [
     "麦迪逊：一抢一传"
    ],
    d: "2026-01-14 从马竞加盟热刺：全场冲刺的体能怪+逼抢第一线，德泽尔比控球体系里的搅局者。",
    weak: "压迫下失误",
    weakNote: "PL Opta 2026-01：压迫/无球跑动是强项，但“never been a prolific passer through the lines”，有球阶段缺少穿透性传球；对手可放他在中场持球、逼他横向出球。不是抢断/态度问题。",
    num: 8,
    age: 26,
    h: "6' 0\"",
    w: "170 lbs",
    _src: "curated"
   },
   {
    n: "马特乌斯·费尔南德斯",
    en: [
     "Mateus Fernandes",
     "Mateus Gonçalo Espanha Fernandes",
     "Fernandes",
     "马特乌斯·费尔南德斯"
    ],
    pos: [
     "CM",
     "DM",
     "AM"
    ],
    foot: "右",
    club: "热刺",
    nat: "葡萄牙",
    st: "组织8/B2B：推进+最后一传",
    tags: [
     "组织8",
     "B2B"
    ],
    weak: "易失位",
    weakNote: "The Transfer Flow 2025-26：防守时容易 flat-footed、被过后用失控的冲刺补位；Instinctive Writes 则认为防守效率是他的强项，评价有冲突。取“易失位”为候选，weakNote 标冲突；不是纪律问题。",
    pair: [
     "托纳利：双后腰"
    ],
    d: "2026-07 从西汉姆 £85m 加盟；2026-27 271 分钟/7 场，上季 3,018 分钟/36 场；能踢 CM/DM/AM，推进和最后一传是强项，防守站位是观察点。",
    _src: "curated",
    _rosterMiss: true,
    num: 8
   },
   {
    n: "理查利森",
    en: [
     "Richarlison"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 29,
    foot: null,
    h: "6' 0\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "麦迪逊",
    en: [
     "Maddison"
    ],
    pos: [
     "AM"
    ],
    foot: "右",
    club: "热刺",
    nat: "英格兰",
    st: "肋部创造10：直塞+远射",
    tags: [
     "现代10"
    ],
    pair: [
     "费尔南德斯：10号位轮换"
    ],
    d: "热刺老核心：最后一传的想象力仍是顶级；ACL 伤愈后仍是10号位主要创造点，与费尔南德斯轮换。",
    weak: "伤病史",
    weakNote: "【可用性风险，非战术弱点】TM：2025-26 ACL 撕裂缺阵 254 天；2024-25 膝伤 52 天、小腿 17 天；2023-24 踝伤 75 天。2026-27 已复出并进入近期首发，但复发/负荷管理是持续风险；战术上不硬编“不参与防守”。",
    num: 10,
    age: 29,
    h: "5' 9\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "马蒂斯·特尔",
    en: [
     "Mathys Tel"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 21,
    foot: null,
    h: "6' 0\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "乌多吉",
    en: [
     "Udogie"
    ],
    pos: [
     "LB",
     "LWB"
    ],
    foot: "左",
    club: "热刺",
    nat: "意大利",
    st: "左脚左翼卫：套边+冲击",
    tags: [
     "套边型",
     "翼卫"
    ],
    pair: [],
    d: "左脚左翼卫，套边和冲击是强项；2026-09 膝伤，预计中旬复出，暂不进 18。",
    status: "伤停（膝伤，预计中旬）",
    weak: "伤病史",
    weakNote: "2026-09 膝伤缺阵约一个月，预计中旬复出；2025-26 20 场/1339 分钟。战术上是左脚套边翼卫，不硬编其他弱点；暂不进 18。",
    num: 13,
    age: 23,
    h: "6' 1\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "阿奇·格雷",
    en: [
     "Archie Gray"
    ],
    num: 14,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 20,
    foot: null,
    h: "6' 2\"",
    w: "152 lbs",
    _src: "espn-zh"
   },
   {
    n: "贝里瓦尔",
    en: [
     "Lucas Bergvall"
    ],
    num: 15,
    pos: [
     "MF"
    ],
    nat: "瑞典",
    age: 20,
    foot: null,
    h: "6' 2\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "Sávio",
    en: [
     "Sávio"
    ],
    num: 17,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 22,
    foot: null,
    h: "5' 10\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "索兰克",
    en: [
     "Solanke"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "热刺",
    nat: "英格兰",
    st: "全能支点9",
    tags: [
     "支点",
     "逼抢9"
    ],
    pair: [],
    d: "背身+压迫+终结均衡，热刺锋线的基座。",
    weak: "伤病史",
    weakNote: "【可用性风险，非战术弱点】TM/Flashscore：2025-01 膝伤、2025-08 踝部手术、2026-01 踝伤、2026-04 腿筋伤；2025-26 英超仅 15 场。支点/压迫/终结均衡，战术上不硬编弱点。",
    num: 19,
    age: 29,
    h: "6' 2\"",
    w: "174 lbs",
    _src: "curated"
   },
   {
    n: "库杜斯",
    en: [
     "Mohammed Kudus",
     "Kudus",
     "穆罕默德·库杜斯"
    ],
    pos: [
     "RW"
    ],
    foot: "左",
    club: "热刺",
    nat: "加纳",
    st: "左脚右翼：盘带+内切",
    tags: [
     "逆足内切"
    ],
    weak: "终结效率低",
    weakNote: "WhoScored 球员特征：Finishing=Weak；2026-27 英超前 4 场 123 分钟 0 球 1 助（twentyclubs/oddsCalendar，10-05），射门转化率低。强项是盘带/推进/对抗；不是不参与防守（防守贡献也是 Weak，但优先取更可针对的终结）。另有 fitness issues 记录，作可用性观察。",
    pair: [
     "波尔诺：右路二人转"
    ],
    d: "2025 从西汉姆加盟；左脚右翼，盘带/推进/对抗是强项；终结效率是相对短板，另有 fitness 观察。",
    num: 20,
    age: 26,
    h: "5' 10\"",
    w: "152 lbs",
    _src: "curated"
   },
   {
    n: "Dejan Kulusevski",
    en: [
     "Dejan Kulusevski"
    ],
    num: 21,
    pos: [
     "MF"
    ],
    nat: "瑞典",
    age: 26,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "马尔穆什",
    en: [
     "Omar Marmoush"
    ],
    num: 22,
    pos: [
     "FW"
    ],
    nat: "埃及",
    age: 27,
    foot: null,
    h: "5' 11\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "Mykhailo Mudryk",
    en: [
     "Mykhailo Mudryk"
    ],
    num: 27,
    pos: [
     "MF"
    ],
    nat: "乌克兰",
    age: 25,
    foot: null,
    h: "5' 9\"",
    w: "132 lbs",
    _src: "espn"
   },
   {
    n: "奥多贝尔",
    en: [
     "Wilson Odobert"
    ],
    num: 28,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 21,
    foot: null,
    h: "6' 0\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "本坦库尔",
    en: [
     "Rodrigo Bentancur"
    ],
    num: 30,
    pos: [
     "MF"
    ],
    nat: "乌拉圭",
    age: 29,
    foot: null,
    h: "6' 2\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "金斯基",
    en: [
     "Antonín Kinsky"
    ],
    num: 31,
    pos: [
     "GK"
    ],
    nat: "捷克",
    age: 23,
    foot: null,
    h: "6' 3\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "Ben Davies",
    en: [
     "Ben Davies"
    ],
    num: 33,
    pos: [
     "DF"
    ],
    nat: "威尔士",
    age: 33,
    foot: null,
    h: "5' 11\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "范德文",
    en: [
     "Micky van de Ven"
    ],
    num: 37,
    pos: [
     "DF"
    ],
    nat: "荷兰",
    age: 25,
    foot: null,
    h: "6' 4\"",
    w: "179 lbs",
    _src: "espn-zh"
   },
   {
    n: "Martin Dúbravka",
    en: [
     "Martin Dúbravka"
    ],
    num: 39,
    pos: [
     "GK"
    ],
    nat: "斯洛伐克",
    age: 37,
    foot: null,
    h: "6' 3\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Brandon Austin",
    en: [
     "Brandon Austin"
    ],
    num: 40,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 27,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Callum Olusesi",
    en: [
     "Callum Olusesi"
    ],
    num: 52,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "5' 9\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "Luca Williams-Barnett",
    en: [
     "Luca Williams-Barnett"
    ],
    num: 68,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "5' 10\"",
    w: "",
    _src: "espn"
   },
   {
    n: "维卡里奥",
    en: [
     "Vicario"
    ],
    pos: [
     "GK"
    ],
    foot: "右",
    club: "热刺",
    nat: "意大利",
    st: "清球型：敢用脚的门将",
    tags: [
     "清球型"
    ],
    pair: [],
    d: "德泽尔比体系需要门将当传球点——他正好是。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "托辛·阿达拉比奥尤",
    en: [
     "Tosin Adarabioyo"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "热刺",
    nat: "英格兰",
    st: "出球型中卫",
    tags: [
     "出球型"
    ],
    pair: [
     "范德文：一稳一快"
    ],
    d: "2026夏窗从切尔西转投热刺：1米93出球中卫，德泽尔比后场倒脚体系的合格零件。",
    weak: "回追慢",
    weakNote: "CFCAnalytic 球探：缺乏速度与横移，“unable to maintain a high line”；德泽尔比高位线需要身边有回追型中卫兜底。1.93m 出球稳，弱点不是制空。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "波尔诺",
    en: [
     "Porro"
    ],
    pos: [
     "RB",
     "RWB"
    ],
    foot: "右",
    club: "热刺",
    nat: "西班牙",
    st: "攻击型右后卫：肋部内切传中",
    tags: [
     "攻击型"
    ],
    pair: [
     "库杜斯：右路二人转"
    ],
    d: "传中脚法在中场级，德泽尔比体系里他一个人承包右路走廊。",
    weak: "防空弱",
    weakNote: "身高 1.73m；datamb 2025-26 空中对抗胜率第 18 百分位（样本仅 211 分钟，偏小），定位球后点可被高个边锋/中卫针对。防守 1v1 评价有分歧（MOTD 指失位，The Athletic/Yahoo 认为被低估），因此不写“怕一对一”。",
    _src: "curated"
   },
   {
    n: "萨维尼奥",
    en: [
     "Savinho"
    ],
    pos: [
     "LW",
     "RW"
    ],
    foot: "左",
    club: "热刺",
    nat: "巴西",
    st: "右脚左路：直线爆点",
    tags: [
     "顺足下底"
    ],
    pair: [],
    d: "2026夏窗7500万镑从曼城转投热刺：速度+下底，转换进攻的第一选择。",
    weak: "终结效率低",
    weakNote: "TM 2026-08 转会分析：加盟前英超 53 场仅 2 球；Yahoo 同期指其“goals that Savinho may not bring”。左脚左边锋，热刺深度图列为 LW 第一顺位；射门转化率/终结是短板，不是推进或过人。",
    _src: "curated"
   },
   {
    n: "托纳利",
    en: [
     "Tonali"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "右",
    club: "热刺",
    nat: "意大利",
    st: "B2B+破坏型双料",
    tags: [
     "B2B",
     "破坏型"
    ],
    pair: [
     "吉马良斯：中场双核"
    ],
    d: "跑动覆盖+抢断时机顶级，禁赛复出后更成熟。",
    _src: "curated"
   }
  ]
 },
 "切尔西": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "埃米·马丁内斯",
    en: [
     "Emiliano Martínez"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "阿根廷",
    age: 34,
    foot: null,
    h: "6' 5\"",
    w: "214 lbs",
    _src: "espn-zh"
   },
   {
    n: "Marco Palestra",
    en: [
     "Marco Palestra"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 21,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "福法纳",
    en: [
     "Fofana"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "切尔西",
    nat: "法国",
    st: "速度型中卫（玻璃体质）",
    tags: [
     "回追型"
    ],
    weak: "伤病史",
    pair: [],
    d: "健康时是英超最快的中卫之一；出勤率是唯一敌人。",
    weakNote: "【可用性风险，非战术弱点】长期伤病史（俱乐部/TM 公开记录）；2026-27 英超 4 场 / 315 分钟。健康时是队内回追最快的中卫之一。",
    num: 3,
    age: 25,
    h: "6' 3\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "Valentín Barco",
    en: [
     "Valentín Barco"
    ],
    num: 4,
    pos: [
     "MF"
    ],
    nat: "阿根廷",
    age: 22,
    foot: null,
    h: "5' 7\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "拉克鲁瓦",
    en: [
     "Maxence Lacroix"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 26,
    foot: null,
    h: "6' 3\"",
    w: "192 lbs",
    _src: "espn-zh"
   },
   {
    n: "科尔威尔",
    en: [
     "Colwill"
    ],
    pos: [
     "CB"
    ],
    foot: "左",
    club: "切尔西",
    nat: "英格兰",
    st: "左脚出球型中卫",
    tags: [
     "左脚中卫",
     "出球型"
    ],
    weak: "待确认",
    pair: [],
    d: "左脚将：向左出球线路天然顺，阿隆索体系里的推进点。",
    weakNote: "原 weak=逆足限制不成立：左脚中卫在三中卫左路是体系资产（阿隆索 3-4-2-1 的左出球点），不是弱点。本轮未找到可靠战术短板，建议改 待确认。替代观察点：被背身支点拉出、禁区高空球、压迫下向前传球。",
    num: 6,
    age: 23,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "curated"
   },
   {
    n: "若昂·佩德罗",
    en: [
     "Joao Pedro"
    ],
    pos: [
     "ST",
     "AM"
    ],
    foot: "右",
    club: "切尔西",
    nat: "巴西",
    st: "伪9/二前锋：串联+终结",
    tags: [
     "伪9",
     "自由10"
    ],
    weak: "待确认",
    pair: [
     "帕尔默：双伪9轮转"
    ],
    d: "2025世俱杯冠军功臣：回撤串联+禁区内终结双修。",
    weakNote: "原 weak=纪律差 证据不足：仅有 2025 欧冠对本菲卡一次红牌，2026-27 英超仅 1 黄，不足以支撑纪律差，建议改 待确认。替代观察点：背身护球、回撤串联受压、禁区抢点。2026-27 英超 6 场 5 球 3 助。",
    num: 9,
    age: 25,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "curated"
   },
   {
    n: "帕尔默",
    en: [
     "Palmer"
    ],
    pos: [
     "AM",
     "RW"
    ],
    foot: "左",
    club: "切尔西",
    nat: "英格兰",
    st: "冷血大场面10：点球+肋部直塞",
    tags: [
     "现代10"
    ],
    weak: "伤病史",
    pair: [
     "内托:右肋互换",
     "若昂·佩德罗:双伪9轮转"
    ],
    d: "大心脏：关键战进球+助攻双开，收着踢时像节拍器，放开踢时像终结者。",
    weakNote: "【可用性风险，非战术弱点】2025-26 有腹股沟伤缺阵记录；2026-27 英超 7 场 2 球 3 助，仍是第一创造力。",
    num: 10,
    age: 24,
    h: "6' 2\"",
    w: "168 lbs",
    _src: "curated"
   },
   {
    n: "Jamie Gittens",
    en: [
     "Jamie Gittens"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 22,
    foot: null,
    h: "5' 9\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "哈托",
    en: [
     "Jorrel Hato"
    ],
    num: 21,
    pos: [
     "DF"
    ],
    nat: "荷兰",
    age: 20,
    foot: null,
    h: "6' 0\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "Emmanuel Emegha",
    en: [
     "Emmanuel Emegha"
    ],
    num: 22,
    pos: [
     "FW"
    ],
    nat: "荷兰",
    age: 23,
    foot: null,
    h: "6' 5\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Geovany Quenda",
    en: [
     "Geovany Quenda"
    ],
    num: 23,
    pos: [
     "MF"
    ],
    nat: "葡萄牙",
    age: 19,
    foot: null,
    h: "5' 8\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "里斯·詹姆斯",
    en: [
     "Reece James"
    ],
    pos: [
     "RB",
     "RWB",
     "DM"
    ],
    foot: "右",
    club: "切尔西",
    nat: "英格兰",
    st: "传中天花板+可客串后腰",
    tags: [
     "套边型",
     "出球型"
    ],
    weak: "伤病史",
    pair: [
     "帕尔默：右肋连线"
    ],
    d: "右脚传中教科书；反复伤病史让他更多被当内收后腰用。",
    weakNote: "【可用性风险，非战术弱点】反复腿筋/肌肉伤；2026-27 英超 4 场 / 292 分钟。健康时右路传中与推进仍是队内顶级，问题在出勤。",
    num: 24,
    age: 26,
    h: "5' 11\"",
    w: "203 lbs",
    _src: "curated"
   },
   {
    n: "凯塞多",
    en: [
     "Caicedo"
    ],
    pos: [
     "DM"
    ],
    foot: "右",
    club: "切尔西",
    nat: "厄瓜多尔",
    st: "破坏型6号天花板候选",
    tags: [
     "破坏型"
    ],
    weak: "纪律差",
    pair: [
     "恩佐离队后:他一个人的盾"
    ],
    d: "英超抢断王级别的扫荡范围，转身出球也在涨。1.15亿身价正在兑现。",
    weakNote: "【可用性风险，非战术短板】2025-26 俱乐部+国家队 12 黄 2 红，因停赛缺席 5 场（The Athletic 2026-02 专题）；2026-27 英超 3 场。强项仍是扫荡与覆盖。",
    num: 25,
    age: 24,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "古斯托",
    en: [
     "Gusto"
    ],
    pos: [
     "RB",
     "RWB"
    ],
    foot: "右",
    club: "切尔西",
    nat: "法国",
    st: "年轻攻击型右后卫",
    tags: [
     "套边型"
    ],
    weak: "防空弱",
    pair: [
     "詹姆斯：轮换搭档"
    ],
    d: "往返和传中选择都在涨，詹姆斯的健康保险。",
    weakNote: "WhoScored 统计特征：Aerial Duels = Weak（近两季）；2026-27 英超 4-5 场 / 274 分钟（源口径不一）。",
    num: 27,
    age: 23,
    h: "5' 10\"",
    w: "148 lbs",
    _src: "curated"
   },
   {
    n: "Teddy Sharman-Lowe",
    en: [
     "Teddy Sharman-Lowe"
    ],
    num: 28,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 23,
    foot: null,
    h: "6' 2\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Pep Chavarría",
    en: [
     "Pep Chavarría"
    ],
    num: 29,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 28,
    foot: null,
    h: "5' 9\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Aaron Anselmino",
    en: [
     "Aaron Anselmino"
    ],
    num: 30,
    pos: [
     "DF"
    ],
    nat: "阿根廷",
    age: 21,
    foot: null,
    h: "6' 1\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Reggie Watson",
    en: [
     "Reggie Watson"
    ],
    num: 31,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 16,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Mahdi Nicoll-Jazuli",
    en: [
     "Mahdi Nicoll-Jazuli"
    ],
    num: 32,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 16,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Josh Acheampong",
    en: [
     "Josh Acheampong"
    ],
    num: 34,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 20,
    foot: null,
    h: "6' 0\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Olutayo Subuloye",
    en: [
     "Olutayo Subuloye"
    ],
    num: 37,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "6' 1\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Mike Penders",
    en: [
     "Mike Penders"
    ],
    num: 39,
    pos: [
     "GK"
    ],
    nat: "比利时",
    age: 21,
    foot: null,
    h: "6' 7\"",
    w: "227 lbs",
    _src: "espn"
   },
   {
    n: "埃斯特旺",
    en: [
     "Estêvão"
    ],
    num: 41,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 19,
    foot: null,
    h: "5' 9\"",
    w: "137 lbs",
    _src: "espn-zh"
   },
   {
    n: "Gaga Slonina",
    en: [
     "Gaga Slonina"
    ],
    num: 44,
    pos: [
     "GK"
    ],
    nat: "美国",
    age: 22,
    foot: null,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "Romeo Lavia",
    en: [
     "Romeo Lavia"
    ],
    num: 45,
    pos: [
     "MF"
    ],
    nat: "比利时",
    age: 22,
    foot: null,
    h: "5' 11\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "内托",
    en: [
     "Pedro Neto"
    ],
    pos: [
     "RW",
     "LW",
     "RWB"
    ],
    foot: "左",
    club: "切尔西",
    nat: "葡萄牙",
    st: "左脚边锋：内切+下底",
    tags: [
     "逆足内切"
    ],
    weak: "伤病史",
    pair: [
     "帕尔默：右肋连线"
    ],
    d: "两翼都踢，传中和回做都稳。",
    weakNote: "【可用性风险，非战术弱点】狼队时期多次肌肉/膝伤记录；2026-27 英超 7 场 3 球 1 助，实际位置是右翼卫（对伯恩茅斯/埃弗顿均如此）。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "韦尔贝克",
    en: [
     "Welbeck"
    ],
    pos: [
     "ST",
     "LW"
    ],
    foot: "右",
    club: "切尔西",
    nat: "英格兰",
    st: "全能老将前锋",
    tags: [
     "抢点型"
    ],
    pair: [
     "若昂·佩德罗：锋线轮换"
    ],
    d: "35 岁；2026-08-01 从布莱顿加盟切尔西；2026-27 联赛 3 场/92 分钟、杯赛 5 场 3 球，作为替补终结者使用。",
    weak: "体能掉档",
    weakNote: "35 岁；2026-27 联赛 3 场 / 92 分钟（官网记 94 分钟）、杯赛 5 场 3 球，作为替补终结者使用。属体能/负荷风险；替代观察点：背身对抗、连续冲刺后的回防。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "摩根·罗杰斯",
    en: [
     "Morgan Rogers"
    ],
    pos: [
     "AM",
     "LW"
    ],
    foot: "右",
    club: "切尔西",
    nat: "英格兰",
    tags: [
     "现代10"
    ],
    weak: "不参与防守",
    pair: [
     "帕尔默：双10轮转"
    ],
    d: "2026 夏窗从维拉加盟：持球推进、肋部串联和最后一传是强项；防守参与度低，丢球后需要队友保护，适合放在帕尔默身边的自由位。",
    weakNote: "TFA 2026 球探报告：无球跑动与防守参与度是相对短板（报道口径，非官方统计）；2026-27 英超 7 场 4 球 1 助。",
    st: "现代10：持球推进+肋部串联",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "乔丹·亨德森",
    en: [
     "Jordan Henderson",
     "Henderson",
     "亨德森"
    ],
    pos: [
     "CM",
     "DM"
    ],
    foot: "右",
    club: "切尔西",
    nat: "英格兰",
    st: "老将组织8：节奏+后插上",
    tags: [
     "组织8",
     "B2B"
    ],
    weak: "体能掉档",
    weakNote: "36 岁（2026-27 英超 3 场 2 球 1 助）；Alonso 对其负荷明显管理（对伯恩茅斯全场最佳）。属体能/轮换风险，不是战术短板；替代观察点：一周双赛的第二场、被高强度逼抢时的转身。",
    pair: [
     "凯塞多：双后腰"
    ],
    d: "36 岁，2026夏窗加盟；近两轮联赛首发 CM，对伯恩茅斯全场最佳；体能/一周双赛负荷是风险，组织和后插上是强项。",
    _src: "curated",
    _rosterMiss: true
   }
  ]
 },
 "阿斯顿维拉": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "Zion Suzuki",
    en: [
     "Zion Suzuki"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "日本",
    age: 24,
    foot: null,
    h: "6' 3\"",
    w: "218 lbs",
    _src: "espn"
   },
   {
    n: "卡什",
    en: [
     "Cash"
    ],
    pos: [
     "RB",
     "RWB"
    ],
    foot: "右",
    club: "阿斯顿维拉",
    nat: "波兰",
    st: "传统套边右后卫",
    tags: [
     "套边型"
    ],
    pair: [],
    d: "维拉老臣：传中稳定，攻守均衡。",
    num: 2,
    age: 29,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "curated"
   },
   {
    n: "林德勒夫",
    en: [
     "Victor Lindelöf"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "瑞典",
    age: 32,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn-zh"
   },
   {
    n: "Taylor Harwood-Bellis",
    en: [
     "Taylor Harwood-Bellis"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 24,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Tyrone Mings",
    en: [
     "Tyrone Mings"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 33,
    foot: null,
    h: "6' 5\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "Ross Barkley",
    en: [
     "Ross Barkley"
    ],
    num: 6,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 32,
    foot: null,
    h: "6' 2\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "麦金",
    en: [
     "John McGinn"
    ],
    num: 7,
    pos: [
     "MF"
    ],
    nat: "苏格兰",
    age: 32,
    foot: null,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "卡马拉",
    en: [
     "B. Kamara"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "左",
    club: "阿斯顿维拉",
    nat: "法国",
    st: "破坏型6号",
    tags: [
     "破坏型"
    ],
    pair: [],
    d: "维拉中场屏障：抢断+护球都稳。",
    num: 8,
    age: 26,
    h: "6' 0\"",
    w: "150 lbs",
    _src: "curated"
   },
   {
    n: "布恩迪亚",
    en: [
     "Emiliano Buendía"
    ],
    num: 10,
    pos: [
     "MF"
    ],
    nat: "阿根廷",
    age: 29,
    foot: null,
    h: "5' 8\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "尼古拉斯·杰克逊",
    en: [
     "Nicolas Jackson"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "塞内加尔",
    age: 25,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn-zh"
   },
   {
    n: "马泰奥·鲁杰里",
    en: [
     "Matteo Ruggeri"
    ],
    num: 13,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 24,
    foot: null,
    h: "6' 2\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "保·托雷斯",
    en: [
     "Pau Torres"
    ],
    pos: [
     "CB"
    ],
    foot: "左",
    club: "阿斯顿维拉",
    nat: "西班牙",
    st: "左脚出球中卫",
    tags: [
     "左脚中卫",
     "出球型"
    ],
    pair: [],
    d: "比利亚雷亚尔/维拉体系的出球轴，左脚长传调度。",
    num: 14,
    age: 29,
    h: "6' 3\"",
    w: "174 lbs",
    _src: "curated"
   },
   {
    n: "加纳乔",
    en: [
     "Garnacho"
    ],
    pos: [
     "LW",
     "RW"
    ],
    foot: "右",
    club: "阿斯顿维拉",
    nat: "阿根廷",
    st: "右脚左路：爆点型边锋",
    tags: [
     "逆足内切"
    ],
    pair: [
     "罗杰斯：左肋连线"
    ],
    d: "曼联青训出品，2026夏窗转投维拉：直线冲刺+内切爆射，转换进攻的大杀器——埃梅里最擅长开发的类型。",
    num: 17,
    age: 22,
    h: "5' 11\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "Tammy Abraham",
    en: [
     "Tammy Abraham"
    ],
    num: 18,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 29,
    foot: null,
    h: "6' 3\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Ibrahim Mbaye",
    en: [
     "Ibrahim Mbaye"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "塞内加尔",
    age: 18,
    foot: null,
    h: "6' 1\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "马特森",
    en: [
     "Ian Maatsen"
    ],
    num: 22,
    pos: [
     "DF"
    ],
    nat: "荷兰",
    age: 24,
    foot: null,
    h: "5' 10\"",
    w: "126 lbs",
    _src: "espn-zh"
   },
   {
    n: "奥纳纳",
    en: [
     "Amadou Onana"
    ],
    num: 24,
    pos: [
     "MF"
    ],
    nat: "比利时",
    age: 25,
    foot: null,
    h: "6' 5\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "Lamare Bogarde",
    en: [
     "Lamare Bogarde"
    ],
    num: 26,
    pos: [
     "MF"
    ],
    nat: "荷兰",
    age: 22,
    foot: null,
    h: "6' 0\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "Leon Goretzka",
    en: [
     "Leon Goretzka"
    ],
    num: 27,
    pos: [
     "MF"
    ],
    nat: "德国",
    age: 31,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Aaron Wan-Bissaka",
    en: [
     "Aaron Wan-Bissaka"
    ],
    num: 29,
    pos: [
     "DF"
    ],
    nat: "Congo DR",
    age: 28,
    foot: null,
    h: "6' 0\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "João Gomes",
    en: [
     "João Gomes"
    ],
    num: 35,
    pos: [
     "MF"
    ],
    nat: "巴西",
    age: 25,
    foot: null,
    h: "5' 9\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Brian Madjo",
    en: [
     "Brian Madjo"
    ],
    num: 39,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 17,
    foot: null,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Marco Bizot",
    en: [
     "Marco Bizot"
    ],
    num: 40,
    pos: [
     "GK"
    ],
    nat: "荷兰",
    age: 35,
    foot: null,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "James Wright",
    en: [
     "James Wright"
    ],
    num: 42,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 21,
    foot: null,
    h: "6' 2\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Johan Manzambi",
    en: [
     "Johan Manzambi"
    ],
    num: 44,
    pos: [
     "MF"
    ],
    nat: "瑞士",
    age: 21,
    foot: null,
    h: "6' 0\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Alysson",
    en: [
     "Alysson"
    ],
    num: 47,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 20,
    foot: null,
    h: "6' 0\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "Modou Cissé",
    en: [
     "Modou Cissé"
    ],
    num: 48,
    pos: [
     "DF"
    ],
    nat: "塞内加尔",
    age: 21,
    foot: null,
    h: "6' 3\"",
    w: "",
    _src: "espn"
   },
   {
    n: "George Hemmings",
    en: [
     "George Hemmings"
    ],
    num: 53,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Owen Asemota",
    en: [
     "Owen Asemota"
    ],
    num: 60,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "沃特金斯",
    en: [
     "Watkins"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "阿斯顿维拉",
    nat: "英格兰",
    st: "直塞身后型9",
    tags: [
     "抢点型"
    ],
    pair: [
     "罗杰斯:身后球喂哺"
    ],
    d: "英超最会跑身后的中锋之一：反越位+单刀冷静。",
    _src: "curated"
   }
  ]
 },
 "纽卡斯尔": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "尼克·波普",
    en: [
     "Nick Pope"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 34,
    foot: null,
    h: "6' 3\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "利夫拉门托",
    en: [
     "Livramento"
    ],
    pos: [
     "RB",
     "LB",
     "RWB"
    ],
    foot: "右",
    club: "纽卡斯尔",
    nat: "英格兰",
    st: "速度型两闸多面手",
    tags: [
     "多面手"
    ],
    pair: [],
    d: "一对一日天+回追速度，纽卡防线最现代化的零件。",
    num: 2,
    age: 23,
    h: "6' 0\"",
    w: "157 lbs",
    _src: "curated"
   },
   {
    n: "佳夫",
    en: [
     "Thiaw",
     "佳夫"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "纽卡斯尔",
    nat: "德国",
    num: 2,
    age: 25,
    season: "—",
    st: "对抗型中卫：1米97",
    tags: [
     "上抢型"
    ],
    pair: [
     "利夫拉门托：俱乐部搭档"
    ],
    d: "2025从米兰加盟纽卡：身高+贴身+回追速度，德国队防线主力的热门人选。",
    _src: "curated"
   },
   {
    n: "刘易斯·霍尔",
    en: [
     "Lewis Hall"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 22,
    foot: null,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "博特曼",
    en: [
     "Sven Botman"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "荷兰",
    age: 26,
    foot: null,
    h: "6' 4\"",
    w: "179 lbs",
    _src: "espn-zh"
   },
   {
    n: "舍尔",
    en: [
     "Fabian Schär"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "瑞士",
    age: 34,
    foot: null,
    h: "6' 1\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "尼科·冈萨雷斯",
    en: [
     "Nico González"
    ],
    num: 6,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 24,
    foot: null,
    h: "6' 2\"",
    w: "192 lbs",
    _src: "espn-zh"
   },
   {
    n: "若埃林顿",
    en: [
     "Joelinton"
    ],
    num: 7,
    pos: [
     "MF"
    ],
    nat: "巴西",
    age: 30,
    foot: null,
    h: "6' 1\"",
    w: "179 lbs",
    _src: "espn-zh"
   },
   {
    n: "Aladji Bamba",
    en: [
     "Aladji Bamba"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 20,
    foot: null,
    h: "5' 11\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "Yoane Wissa",
    en: [
     "Yoane Wissa"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "Congo DR",
    age: 30,
    foot: null,
    h: "5' 9\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "奥苏拉",
    en: [
     "William Osula"
    ],
    num: 10,
    pos: [
     "FW"
    ],
    nat: "丹麦",
    age: 23,
    foot: null,
    h: "5' 11\"",
    w: "179 lbs",
    _src: "espn-zh"
   },
   {
    n: "Sean Steur",
    en: [
     "Sean Steur"
    ],
    num: 14,
    pos: [
     "MF"
    ],
    nat: "荷兰",
    age: 18,
    foot: null,
    h: "6' 0\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Bazoumana Touré",
    en: [
     "Bazoumana Touré"
    ],
    num: 17,
    pos: [
     "FW"
    ],
    nat: "科特迪瓦",
    age: 20,
    foot: null,
    h: "5' 10\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Anthony Elanga",
    en: [
     "Anthony Elanga"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "瑞典",
    age: 24,
    foot: null,
    h: "5' 10\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "马蒂亚斯·费尔南德斯-帕尔多",
    en: [
     "Matias Fernandez-Pardo"
    ],
    num: 20,
    pos: [
     "FW"
    ],
    nat: "比利时",
    age: 21,
    foot: null,
    h: "6' 0\"",
    w: "190 lbs",
    _src: "espn-zh"
   },
   {
    n: "Lukás Hornícek",
    en: [
     "Lukás Hornícek"
    ],
    num: 21,
    pos: [
     "GK"
    ],
    nat: "捷克",
    age: 24,
    foot: null,
    h: "6' 6\"",
    w: "203 lbs",
    _src: "espn"
   },
   {
    n: "雅各布·墨菲",
    en: [
     "Jacob Murphy"
    ],
    num: 23,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 31,
    foot: null,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "Ewen Jaouen",
    en: [
     "Ewen Jaouen"
    ],
    num: 24,
    pos: [
     "GK"
    ],
    nat: "法国",
    age: 20,
    foot: null,
    h: "6' 7\"",
    w: "432 lbs",
    _src: "espn"
   },
   {
    n: "Joe Willock",
    en: [
     "Joe Willock"
    ],
    num: 28,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 27,
    foot: null,
    h: "5' 10\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "Mark Gillespie",
    en: [
     "Mark Gillespie"
    ],
    num: 29,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 34,
    foot: null,
    h: "6' 4\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "丹·伯恩",
    en: [
     "Dan Burn"
    ],
    num: 33,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 34,
    foot: null,
    h: "6' 7\"",
    w: "192 lbs",
    _src: "espn-zh"
   },
   {
    n: "Amar Dedic",
    en: [
     "Amar Dedic"
    ],
    num: 37,
    pos: [
     "DF"
    ],
    nat: "波黑",
    age: 24,
    foot: null,
    h: "5' 11\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Jacob Ramsey",
    en: [
     "Jacob Ramsey"
    ],
    num: 41,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 25,
    foot: null,
    h: "5' 11\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Kyran Thompson",
    en: [
     "Kyran Thompson"
    ],
    num: 44,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 17,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Miodrag Pivas",
    en: [
     "Miodrag Pivas"
    ],
    num: 48,
    pos: [
     "DF"
    ],
    nat: "塞尔维亚",
    age: 21,
    foot: null,
    h: "6' 2\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Vakho Salia",
    en: [
     "Vakho Salia"
    ],
    num: 49,
    pos: [
     "FW"
    ],
    nat: "格鲁吉亚",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "刘易斯·米利",
    en: [
     "Lewis Miley"
    ],
    num: 67,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 20,
    foot: null,
    h: "6' 1\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "Michael Mills",
    en: [
     "Michael Mills"
    ],
    num: 77,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 17,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "巴恩斯",
    en: [
     "H. Barnes"
    ],
    pos: [
     "LW"
    ],
    foot: "右",
    club: "纽卡斯尔",
    nat: "英格兰",
    st: "右脚左路：力量型内切",
    tags: [
     "逆足内切"
    ],
    pair: [],
    d: "对抗+直线速度，英超传统型边锋。",
    _src: "curated"
   }
  ]
 },
 "诺丁汉森林": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "Ousmane Diomande",
    en: [
     "Ousmane Diomande"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "科特迪瓦",
    age: 22,
    foot: null,
    h: "6' 3\"",
    w: "205 lbs",
    _src: "espn"
   },
   {
    n: "内科·威廉姆斯",
    en: [
     "Neco Williams"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "威尔士",
    age: 25,
    foot: null,
    h: "6' 0\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "穆里略",
    en: [
     "Murillo"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "巴西",
    age: 24,
    foot: null,
    h: "5' 11\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "Ibrahim Sangaré",
    en: [
     "Ibrahim Sangaré"
    ],
    num: 6,
    pos: [
     "MF"
    ],
    nat: "科特迪瓦",
    age: 28,
    foot: null,
    h: "6' 3\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "哈德森-奥多伊",
    en: [
     "Hudson-Odoi"
    ],
    pos: [
     "LW",
     "RW"
    ],
    foot: "右",
    club: "诺丁汉森林",
    nat: "英格兰",
    st: "内切型边锋",
    tags: [
     "逆足内切"
    ],
    pair: [],
    d: "森林转换进攻的边路输出。",
    num: 7,
    age: 25,
    h: "6' 0\"",
    w: "168 lbs",
    _src: "curated"
   },
   {
    n: "Nicolás Domínguez",
    en: [
     "Nicolás Domínguez"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "阿根廷",
    age: 28,
    foot: null,
    h: "5' 10\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "吉布斯-怀特",
    en: [
     "Gibbs-White"
    ],
    pos: [
     "AM",
     "CM"
    ],
    foot: "右",
    club: "诺丁汉森林",
    nat: "英格兰",
    st: "全能攻击中场",
    tags: [
     "现代10"
    ],
    pair: [],
    d: "2026夏窗从森林加盟：持球推进+直塞+逼抢全能。",
    weak: "待确认",
    weakNote: "本轮只审曼城；其森林版本弱点未审。2026-27 仍有英超出场，不能按“离队/无样本”处理。",
    num: 10,
    age: 26,
    h: "5' 7\"",
    w: "146 lbs",
    _src: "curated"
   },
   {
    n: "伊戈尔·热苏斯",
    en: [
     "Igor Jesus"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 25,
    foot: null,
    h: "5' 11\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "John Victor",
    en: [
     "John Victor"
    ],
    num: 12,
    pos: [
     "GK"
    ],
    nat: "巴西",
    age: 30,
    foot: null,
    h: "6' 5\"",
    w: "201 lbs",
    _src: "espn"
   },
   {
    n: "恩多耶",
    en: [
     "Dan Ndoye"
    ],
    num: 14,
    pos: [
     "FW"
    ],
    nat: "瑞士",
    age: 26,
    foot: null,
    h: "6' 0\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "Arnaud Kalimuendo",
    en: [
     "Arnaud Kalimuendo"
    ],
    num: 15,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 24,
    foot: null,
    h: "5' 10\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "德拉普",
    en: [
     "L. Delap"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "诺丁汉森林",
    nat: "英格兰",
    st: "冲击型9：身体流",
    tags: [
     "支点",
     "逼抢9"
    ],
    pair: [
     "伍德：双塔轮换"
    ],
    d: "2026夏窗转投森林：背身对抗+压迫跑动，格拉斯纳长传体系的完美终点。",
    num: 19,
    age: 23,
    h: "6' 1\"",
    w: "159 lbs",
    _src: "curated"
   },
   {
    n: "克萨韦尔·施拉格",
    en: [
     "Xaver Schlager"
    ],
    num: 21,
    pos: [
     "MF"
    ],
    nat: "奥地利",
    age: 29,
    foot: null,
    h: "5' 9\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "瑞安·耶茨",
    en: [
     "Ryan Yates"
    ],
    num: 22,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 28,
    foot: null,
    h: "6' 3\"",
    w: "192 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jair Paula",
    en: [
     "Jair Paula"
    ],
    num: 23,
    pos: [
     "DF"
    ],
    nat: "巴西",
    age: 21,
    foot: null,
    h: "6' 6\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "James McAtee",
    en: [
     "James McAtee"
    ],
    num: 24,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 24,
    foot: null,
    h: "5' 11\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Luca Netz",
    en: [
     "Luca Netz"
    ],
    num: 25,
    pos: [
     "DF"
    ],
    nat: "德国",
    age: 23,
    foot: null,
    h: "5' 11\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "马茨·塞尔斯",
    en: [
     "Matz Sels"
    ],
    num: 26,
    pos: [
     "GK"
    ],
    nat: "比利时",
    age: 34,
    foot: null,
    h: "6' 2\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "达尼埃尔·穆尼奥斯",
    en: [
     "Daniel Muñoz"
    ],
    num: 27,
    pos: [
     "DF"
    ],
    nat: "哥伦比亚",
    age: 30,
    foot: null,
    h: "5' 11\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "米伦科维奇",
    en: [
     "Milenkovic"
    ],
    pos: [
     "CB"
    ],
    foot: "右",
    club: "诺丁汉森林",
    nat: "塞尔维亚",
    st: "对抗型争顶中卫",
    tags: [
     "争顶型"
    ],
    pair: [],
    d: "森林低块体系的空霸。",
    num: 31,
    age: 29,
    h: "6' 5\"",
    w: "196 lbs",
    _src: "curated"
   },
   {
    n: "Steven Benda",
    en: [
     "Steven Benda"
    ],
    num: 33,
    pos: [
     "GK"
    ],
    nat: "德国",
    age: 28,
    foot: null,
    h: "6' 4\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Ola Aina",
    en: [
     "Ola Aina"
    ],
    num: 34,
    pos: [
     "DF"
    ],
    nat: "尼日利亚",
    age: 30,
    foot: null,
    h: "6' 0\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Nicolò Savona",
    en: [
     "Nicolò Savona"
    ],
    num: 37,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 23,
    foot: null,
    h: "6' 4\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "伍德",
    en: [
     "C. Wood"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "诺丁汉森林",
    nat: "新西兰",
    st: "传统英式9：争顶+做墙",
    tags: [
     "支点",
     "争顶型"
    ],
    pair: [],
    d: "老派中锋活化石：长传冲吊体系里的完美终点站。",
    _src: "curated"
   }
  ]
 },
 "埃弗顿": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "皮克福德",
    en: [
     "Pickford"
    ],
    pos: [
     "GK"
    ],
    foot: "右",
    club: "埃弗顿",
    nat: "英格兰",
    st: "长传发动+大赛型扑救",
    tags: [
     "门线型"
    ],
    pair: [],
    d: "英格兰一号，长传找身前是埃弗顿反击第一发起点。",
    num: 1,
    age: 32,
    h: "6' 1\"",
    w: "170 lbs",
    _src: "curated"
   },
   {
    n: "Ainsley Maitland-Niles",
    en: [
     "Ainsley Maitland-Niles"
    ],
    num: 2,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 29,
    foot: null,
    h: "5' 10\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "Michael Keane",
    en: [
     "Michael Keane"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 33,
    foot: null,
    h: "6' 3\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "塔科夫斯基",
    en: [
     "James Tarkowski"
    ],
    num: 6,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 33,
    foot: null,
    h: "6' 1\"",
    w: "179 lbs",
    _src: "espn-zh"
   },
   {
    n: "杜斯伯里-霍尔",
    en: [
     "Kiernan Dewsbury-Hall"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 28,
    foot: null,
    h: "5' 10\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "格拉利什",
    en: [
     "Grealish"
    ],
    pos: [
     "LW",
     "AM"
    ],
    foot: "右",
    club: "埃弗顿",
    nat: "英格兰",
    st: "持球造犯规大师",
    tags: [
     "逆足内切"
    ],
    pair: [],
    d: "曼城外租埃弗顿：控球牵制+制造定位球，节奏型边锋的另一种活法。",
    num: 10,
    age: 31,
    h: "5' 11\"",
    w: "170 lbs",
    _src: "curated"
   },
   {
    n: "Mark Travers",
    en: [
     "Mark Travers"
    ],
    num: 12,
    pos: [
     "GK"
    ],
    nat: "Republic of Ireland",
    age: 27,
    foot: null,
    h: "6' 3\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "杰克·奥布莱恩",
    en: [
     "Jake O'Brien"
    ],
    num: 15,
    pos: [
     "DF"
    ],
    nat: "Republic of Ireland",
    age: 25,
    foot: null,
    h: "6' 6\"",
    w: "203 lbs",
    _src: "espn-zh"
   },
   {
    n: "Vitaliy Mykolenko",
    en: [
     "Vitaliy Mykolenko"
    ],
    num: 16,
    pos: [
     "DF"
    ],
    nat: "乌克兰",
    age: 27,
    foot: null,
    h: "5' 11\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "Tyrique George",
    en: [
     "Tyrique George"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 20,
    foot: null,
    h: "5' 11\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Tyler Dibling",
    en: [
     "Tyler Dibling"
    ],
    num: 20,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 20,
    foot: null,
    h: "5' 10\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "布伦南·约翰逊",
    en: [
     "Brennan Johnson"
    ],
    num: 22,
    pos: [
     "FW"
    ],
    nat: "威尔士",
    age: 25,
    foot: null,
    h: "6' 1\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "Christian Nørgaard",
    en: [
     "Christian Nørgaard"
    ],
    num: 23,
    pos: [
     "MF"
    ],
    nat: "丹麦",
    age: 32,
    foot: null,
    h: "6' 2\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Charly Alcaraz",
    en: [
     "Charly Alcaraz"
    ],
    num: 24,
    pos: [
     "MF"
    ],
    nat: "阿根廷",
    age: 23,
    foot: null,
    h: "5' 9\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Hayden Hackney",
    en: [
     "Hayden Hackney"
    ],
    num: 30,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 24,
    foot: null,
    h: "5' 10\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Tom King",
    en: [
     "Tom King"
    ],
    num: 31,
    pos: [
     "GK"
    ],
    nat: "威尔士",
    age: 31,
    foot: null,
    h: "6' 4\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "梅林·罗尔",
    en: [
     "Merlin Röhl"
    ],
    num: 34,
    pos: [
     "MF"
    ],
    nat: "德国",
    age: 24,
    foot: null,
    h: "6' 4\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "James Garner",
    en: [
     "James Garner"
    ],
    num: 37,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 25,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Harrison Armstrong",
    en: [
     "Harrison Armstrong"
    ],
    num: 45,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "6' 1\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Braiden Graham",
    en: [
     "Braiden Graham"
    ],
    num: 58,
    pos: [
     "FW"
    ],
    nat: "北爱尔兰",
    age: 18,
    foot: null,
    h: "5' 9\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "Malik Olayiwola",
    en: [
     "Malik Olayiwola"
    ],
    num: 76,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 17,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Harvey Foster",
    en: [
     "Harvey Foster"
    ],
    num: 81,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "布兰斯维特",
    en: [
     "Branthwaite"
    ],
    pos: [
     "CB"
    ],
    foot: "左",
    club: "埃弗顿",
    nat: "英格兰",
    st: "左脚年轻中卫",
    tags: [
     "左脚中卫"
    ],
    pair: [],
    d: "埃弗顿防线的未来：左脚+速度+对抗，英格兰队考察对象。",
    _src: "curated"
   },
   {
    n: "巴里",
    en: [
     "T. Barry"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "埃弗顿",
    nat: "法国",
    st: "年轻冲击型9",
    tags: [
     "支点"
    ],
    pair: [],
    d: "2025夏窗加盟的新一代中锋：身高+移动。",
    _src: "curated"
   }
  ]
 },
 "水晶宫": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "蒂里克·米切尔",
    en: [
     "Tyrick Mitchell"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 27,
    foot: null,
    h: "5' 9\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "Chadi Riad",
    en: [
     "Chadi Riad"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "摩洛哥",
    age: 23,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Axel Disasi",
    en: [
     "Axel Disasi"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 28,
    foot: null,
    h: "6' 3\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Jaydee Canvot",
    en: [
     "Jaydee Canvot"
    ],
    num: 6,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 20,
    foot: null,
    h: "6' 2\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "伊斯梅拉·萨尔",
    en: [
     "Ismaïla Sarr"
    ],
    num: 7,
    pos: [
     "FW"
    ],
    nat: "塞内加尔",
    age: 28,
    foot: null,
    h: "6' 1\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jefferson Lerma",
    en: [
     "Jefferson Lerma"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "哥伦比亚",
    age: 32,
    foot: null,
    h: "5' 10\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Eddie Nketiah",
    en: [
     "Eddie Nketiah"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 27,
    foot: null,
    h: "5' 9\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "耶雷米·皮诺",
    en: [
     "Yéremy Pino"
    ],
    num: 10,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 24,
    foot: null,
    h: "5' 8\"",
    w: "141 lbs",
    _src: "espn-zh"
   },
   {
    n: "Dwight McNeil",
    en: [
     "Dwight McNeil"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 26,
    foot: null,
    h: "6' 0\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Zavier Gozo",
    en: [
     "Zavier Gozo"
    ],
    num: 12,
    pos: [
     "FW"
    ],
    nat: "美国",
    age: 19,
    foot: null,
    h: "5' 11\"",
    w: "139 lbs",
    _src: "espn"
   },
   {
    n: "马特塔",
    en: [
     "Mateta"
    ],
    pos: [
     "ST"
    ],
    foot: "左",
    club: "水晶宫",
    nat: "法国",
    st: "高支点9",
    tags: [
     "支点"
    ],
    pair: [],
    d: "水晶宫的空霸：长传冲吊体系的完美终点。",
    num: 14,
    age: 29,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "curated"
   },
   {
    n: "Takehiro Tomiyasu",
    en: [
     "Takehiro Tomiyasu"
    ],
    num: 17,
    pos: [
     "DF"
    ],
    nat: "日本",
    age: 27,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "镰田大地",
    en: [
     "Daichi Kamada"
    ],
    num: 18,
    pos: [
     "MF"
    ],
    nat: "日本",
    age: 30,
    foot: null,
    h: "5' 11\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "Will Hughes",
    en: [
     "Will Hughes"
    ],
    num: 19,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 31,
    foot: null,
    h: "6' 1\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Honest Ahanor",
    en: [
     "Honest Ahanor"
    ],
    num: 21,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 18,
    foot: null,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Jørgen Strand Larsen",
    en: [
     "Jørgen Strand Larsen"
    ],
    num: 22,
    pos: [
     "FW"
    ],
    nat: "挪威",
    age: 26,
    foot: null,
    h: "6' 4\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Quinten Timber",
    en: [
     "Quinten Timber"
    ],
    num: 23,
    pos: [
     "MF"
    ],
    nat: "荷兰",
    age: 25,
    foot: null,
    h: "5' 9\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "Darío Osorio",
    en: [
     "Darío Osorio"
    ],
    num: 24,
    pos: [
     "MF"
    ],
    nat: "智利",
    age: 22,
    foot: null,
    h: "6' 0\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Anan Khalaili",
    en: [
     "Anan Khalaili"
    ],
    num: 25,
    pos: [
     "DF"
    ],
    nat: "以色列",
    age: 22,
    foot: null,
    h: "6' 0\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Chris Richards",
    en: [
     "Chris Richards"
    ],
    num: 26,
    pos: [
     "DF"
    ],
    nat: "美国",
    age: 26,
    foot: null,
    h: "6' 2\"",
    w: "203 lbs",
    _src: "espn"
   },
   {
    n: "Cheick Doucouré",
    en: [
     "Cheick Doucouré"
    ],
    num: 28,
    pos: [
     "MF"
    ],
    nat: "马里",
    age: 26,
    foot: null,
    h: "5' 11\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Evann Guessand",
    en: [
     "Evann Guessand"
    ],
    num: 29,
    pos: [
     "FW"
    ],
    nat: "科特迪瓦",
    age: 25,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Óscar Mingueza",
    en: [
     "Óscar Mingueza"
    ],
    num: 30,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 27,
    foot: null,
    h: "6' 0\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Remi Matthews",
    en: [
     "Remi Matthews"
    ],
    num: 31,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 32,
    foot: null,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Ben Chilwell",
    en: [
     "Ben Chilwell"
    ],
    num: 33,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 29,
    foot: null,
    h: "5' 10\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "Sebastian Williams",
    en: [
     "Sebastian Williams"
    ],
    num: 43,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "6' 1\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Walter Benítez",
    en: [
     "Walter Benítez"
    ],
    num: 44,
    pos: [
     "GK"
    ],
    nat: "阿根廷",
    age: 33,
    foot: null,
    h: "6' 3\"",
    w: "205 lbs",
    _src: "espn"
   },
   {
    n: "Dean Benamar",
    en: [
     "Dean Benamar"
    ],
    num: 54,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "George King",
    en: [
     "George King"
    ],
    num: 60,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Lucca Benetton",
    en: [
     "Lucca Benetton"
    ],
    num: 81,
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
    n: "Caleb Kporha",
    en: [
     "Caleb Kporha"
    ],
    num: null,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 20,
    foot: null,
    h: "5' 7\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "惠顿",
    en: [
     "Wharton"
    ],
    pos: [
     "DM"
    ],
    foot: "右",
    club: "水晶宫",
    nat: "英格兰",
    st: "拖后组织新星：卡里克原型",
    tags: [
     "拖后组织"
    ],
    pair: [],
    d: "20岁出头就有一脚对角长传和压迫下转身，英格兰未来6号位答案候选。",
    _src: "curated"
   }
  ]
 },
 "布莱顿": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "维尔布鲁根",
    en: [
     "Bart Verbruggen"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "荷兰",
    age: 24,
    foot: null,
    h: "6' 4\"",
    w: "194 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jaouen Hadjam",
    en: [
     "Jaouen Hadjam"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "阿尔及利亚",
    age: 23,
    foot: null,
    h: "6' 1\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "帕斯卡尔·斯特鲁伊克",
    en: [
     "Pascal Struijk"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "荷兰",
    age: 27,
    foot: null,
    h: "6' 3\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "Lewis Dunk",
    en: [
     "Lewis Dunk"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 34,
    foot: null,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "三笘薰",
    en: [
     "Mitoma"
    ],
    pos: [
     "LW"
    ],
    foot: "右",
    club: "布莱顿",
    nat: "日本",
    st: "右脚左路：变向过人教科书",
    tags: [
     "逆足内切"
    ],
    pair: [],
    d: "大学论文研究过人技术的学者型边锋：贴地变向独步英超。",
    num: 7,
    age: 29,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "curated"
   },
   {
    n: "Jack Hinshelwood",
    en: [
     "Jack Hinshelwood"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 21,
    foot: null,
    h: "5' 11\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "Stefanos Tzimas",
    en: [
     "Stefanos Tzimas"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "希腊",
    age: 20,
    foot: null,
    h: "6' 1\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "乔治尼奥·吕特",
    en: [
     "Georginio Rutter"
    ],
    num: 10,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 24,
    foot: null,
    h: "6' 0\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "扬库巴·明特",
    en: [
     "Yankuba Minteh"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "Gambia",
    age: 22,
    foot: null,
    h: "5' 11\"",
    w: "141 lbs",
    _src: "espn-zh"
   },
   {
    n: "Promise David",
    en: [
     "Promise David"
    ],
    num: 12,
    pos: [
     "FW"
    ],
    nat: "加拿大",
    age: 25,
    foot: null,
    h: "6' 5\"",
    w: "201 lbs",
    _src: "espn"
   },
   {
    n: "Pascal Gross",
    en: [
     "Pascal Gross"
    ],
    num: 13,
    pos: [
     "MF"
    ],
    nat: "德国",
    age: 35,
    foot: null,
    h: "5' 11\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Chema Andrés",
    en: [
     "Chema Andrés"
    ],
    num: 14,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 21,
    foot: null,
    h: "6' 3\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Ibrahim Osman",
    en: [
     "Ibrahim Osman"
    ],
    num: 15,
    pos: [
     "FW"
    ],
    nat: "加纳",
    age: 21,
    foot: null,
    h: "5' 10\"",
    w: "139 lbs",
    _src: "espn"
   },
   {
    n: "Charalambos Kostoulas",
    en: [
     "Charalambos Kostoulas"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "希腊",
    age: 19,
    foot: null,
    h: "6' 1\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Costinha",
    en: [
     "Costinha"
    ],
    num: 20,
    pos: [
     "DF"
    ],
    nat: "葡萄牙",
    age: 26,
    foot: null,
    h: "5' 11\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "奥利维耶·博斯卡利",
    en: [
     "Olivier Boscagli"
    ],
    num: 21,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 28,
    foot: null,
    h: "5' 11\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jason Steele",
    en: [
     "Jason Steele"
    ],
    num: 23,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 36,
    foot: null,
    h: "6' 2\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Ferdi Kadioglu",
    en: [
     "Ferdi Kadioglu"
    ],
    num: 24,
    pos: [
     "DF"
    ],
    nat: "Türkiye",
    age: 27,
    foot: null,
    h: "5' 9\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "迭戈·戈麦斯",
    en: [
     "Diego Gómez"
    ],
    num: 25,
    pos: [
     "MF"
    ],
    nat: "巴拉圭",
    age: 23,
    foot: null,
    h: "6' 1\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "Yasin Ayari",
    en: [
     "Yasin Ayari"
    ],
    num: 26,
    pos: [
     "MF"
    ],
    nat: "瑞典",
    age: 23,
    foot: null,
    h: "5' 8\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Mats Wieffer",
    en: [
     "Mats Wieffer"
    ],
    num: 27,
    pos: [
     "MF"
    ],
    nat: "荷兰",
    age: 26,
    foot: null,
    h: "6' 2\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Evan Ferguson",
    en: [
     "Evan Ferguson"
    ],
    num: 28,
    pos: [
     "MF"
    ],
    nat: "苏格兰",
    age: 22,
    foot: null,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Maxim De Cuyper",
    en: [
     "Maxim De Cuyper"
    ],
    num: 29,
    pos: [
     "DF"
    ],
    nat: "比利时",
    age: 25,
    foot: null,
    h: "6' 0\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "Michael Svoboda",
    en: [
     "Michael Svoboda"
    ],
    num: 30,
    pos: [
     "DF"
    ],
    nat: "奥地利",
    age: 28,
    foot: null,
    h: "6' 5\"",
    w: "190 lbs",
    _src: "espn"
   },
   {
    n: "马特·奥赖利",
    en: [
     "Matt O'Riley"
    ],
    num: 33,
    pos: [
     "MF"
    ],
    nat: "丹麦",
    age: 25,
    foot: null,
    h: "6' 2\"",
    w: "170 lbs",
    _src: "espn-zh"
   },
   {
    n: "Malick Yalcouyé",
    en: [
     "Malick Yalcouyé"
    ],
    num: 35,
    pos: [
     "MF"
    ],
    nat: "马里",
    age: 20,
    foot: null,
    h: "5' 7\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Zadok Yohanna",
    en: [
     "Zadok Yohanna"
    ],
    num: 36,
    pos: [
     "FW"
    ],
    nat: "尼日利亚",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Tom McGill",
    en: [
     "Tom McGill"
    ],
    num: 38,
    pos: [
     "GK"
    ],
    nat: "加拿大",
    age: 26,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Femi Azeez",
    en: [
     "Femi Azeez"
    ],
    num: 39,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 25,
    foot: null,
    h: "5' 11\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Luka Vuskovic",
    en: [
     "Luka Vuskovic"
    ],
    num: 44,
    pos: [
     "DF"
    ],
    nat: "克罗地亚",
    age: 19,
    foot: null,
    h: "6' 4\"",
    w: "190 lbs",
    _src: "espn"
   },
   {
    n: "Nehemiah Oriola",
    en: [
     "Nehemiah Oriola"
    ],
    num: 49,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Shane Nti",
    en: [
     "Shane Nti"
    ],
    num: 51,
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
    n: "Younes Ibrahim",
    en: [
     "Younes Ibrahim"
    ],
    num: 59,
    pos: [
     "MF"
    ],
    nat: "澳大利亚",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Steven Hall",
    en: [
     "Steven Hall"
    ],
    num: 61,
    pos: [
     "GK"
    ],
    nat: "澳大利亚",
    age: 21,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "韦尔贝克",
    en: [
     "Welbeck"
    ],
    pos: [
     "ST",
     "LW"
    ],
    foot: "右",
    club: "布莱顿",
    nat: "英格兰",
    st: "全能老将前锋",
    tags: [
     "抢点型"
    ],
    pair: [],
    d: "34岁还在进步：支点+回防+终结的全能老将。",
    _src: "curated",
    _rosterMiss: true
   }
  ]
 },
 "布伦特福德": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "凯莱赫",
    en: [
     "Caoimhín Kelleher"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "Republic of Ireland",
    age: 27,
    foot: null,
    h: "6' 2\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "Aaron Hickey",
    en: [
     "Aaron Hickey"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "苏格兰",
    age: 24,
    foot: null,
    h: "6' 1\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Rico Henry",
    en: [
     "Rico Henry"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "牙买加",
    age: 29,
    foot: null,
    h: "5' 7\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "Sepp van den Berg",
    en: [
     "Sepp van den Berg"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "荷兰",
    age: 24,
    foot: null,
    h: "6' 2\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Yehor Yarmoliuk",
    en: [
     "Yehor Yarmoliuk"
    ],
    num: 6,
    pos: [
     "MF"
    ],
    nat: "乌克兰",
    age: 22,
    foot: null,
    h: "5' 11\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Mathias Jensen",
    en: [
     "Mathias Jensen"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "丹麦",
    age: 30,
    foot: null,
    h: "5' 11\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "伊戈尔·蒂亚戈",
    en: [
     "Igor Thiago"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 25,
    foot: null,
    h: "6' 3\"",
    w: "207 lbs",
    _src: "espn-zh"
   },
   {
    n: "沙德",
    en: [
     "Schade"
    ],
    pos: [
     "LW",
     "ST"
    ],
    foot: null,
    club: "布伦特福德",
    nat: "德国",
    num: 9,
    age: 24,
    season: "—",
    st: "速度型边锋：转换爆点",
    tags: [
     "顺足下底"
    ],
    pair: [],
    d: "布伦特福德的德国快马：直线冲刺+反越位，克洛普德国队转换体系的标准零件。",
    _src: "curated"
   },
   {
    n: "Josh Dasilva",
    en: [
     "Josh Dasilva"
    ],
    num: 10,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 28,
    foot: null,
    h: "6' 0\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "丹戈·瓦塔拉",
    en: [
     "Dango Ouattara"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "Burkina Faso",
    age: 24,
    foot: null,
    h: "5' 10\"",
    w: "157 lbs",
    _src: "espn-zh"
   },
   {
    n: "Hákon Valdimarsson",
    en: [
     "Hákon Valdimarsson"
    ],
    num: 12,
    pos: [
     "GK"
    ],
    nat: "冰岛",
    age: 25,
    foot: null,
    h: "6' 2\"",
    w: "194 lbs",
    _src: "espn"
   },
   {
    n: "Callum Wilson",
    en: [
     "Callum Wilson"
    ],
    num: 13,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 34,
    foot: null,
    h: "5' 11\"",
    w: "146 lbs",
    _src: "espn"
   },
   {
    n: "法比奥·卡瓦略",
    en: [
     "Fábio Carvalho"
    ],
    num: 14,
    pos: [
     "MF"
    ],
    nat: "葡萄牙",
    age: 24,
    foot: null,
    h: "5' 7\"",
    w: "137 lbs",
    _src: "espn-zh"
   },
   {
    n: "Antoni Milambo",
    en: [
     "Antoni Milambo"
    ],
    num: 17,
    pos: [
     "MF"
    ],
    nat: "荷兰",
    age: 21,
    foot: null,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Mamadou Sangare",
    en: [
     "Mamadou Sangare"
    ],
    num: 18,
    pos: [
     "MF"
    ],
    nat: "马里",
    age: 24,
    foot: null,
    h: "5' 11\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Jaidon Anthony",
    en: [
     "Jaidon Anthony"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 26,
    foot: null,
    h: "6' 0\"",
    w: "",
    _src: "espn"
   },
   {
    n: "阿耶尔",
    en: [
     "Kristoffer Ajer"
    ],
    num: 20,
    pos: [
     "DF"
    ],
    nat: "挪威",
    age: 28,
    foot: null,
    h: "6' 6\"",
    w: "203 lbs",
    _src: "espn-zh"
   },
   {
    n: "内森·科林斯",
    en: [
     "Nathan Collins"
    ],
    num: 22,
    pos: [
     "DF"
    ],
    nat: "Republic of Ireland",
    age: 25,
    foot: null,
    h: "6' 4\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "基恩·刘易斯-波特",
    en: [
     "Keane Lewis-Potter"
    ],
    num: 23,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 25,
    foot: null,
    h: "5' 7\"",
    w: "148 lbs",
    _src: "espn-zh"
   },
   {
    n: "贾内特",
    en: [
     "Janelt",
     "贾内特"
    ],
    pos: [
     "DM",
     "CB"
    ],
    foot: "左",
    club: "布伦特福德",
    nat: "德国",
    num: 23,
    age: 28,
    season: "—",
    st: "多面手防守中场",
    tags: [
     "破坏型"
    ],
    pair: [],
    d: "布伦特福德老臣：6号位/中卫都能补，国家队的保险型选择。",
    _src: "curated"
   },
   {
    n: "达姆斯高",
    en: [
     "Mikkel Damsgaard"
    ],
    num: 24,
    pos: [
     "MF"
    ],
    nat: "丹麦",
    age: 26,
    foot: null,
    h: "5' 11\"",
    w: "146 lbs",
    _src: "espn-zh"
   },
   {
    n: "El Hadji Malick Diouf",
    en: [
     "El Hadji Malick Diouf"
    ],
    num: 25,
    pos: [
     "DF"
    ],
    nat: "塞内加尔",
    age: 21,
    foot: null,
    h: "6' 0\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Ellery Balcombe",
    en: [
     "Ellery Balcombe"
    ],
    num: 31,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 27,
    foot: null,
    h: "6' 3\"",
    w: "203 lbs",
    _src: "espn"
   },
   {
    n: "迈克尔·卡约德",
    en: [
     "Michael Kayode"
    ],
    num: 33,
    pos: [
     "DF"
    ],
    nat: "意大利",
    age: 22,
    foot: null,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "Kim Ji-Soo",
    en: [
     "Kim Ji-Soo"
    ],
    num: 36,
    pos: [
     "DF"
    ],
    nat: "韩国",
    age: 21,
    foot: null,
    h: "6' 4\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Gustavo Nunes",
    en: [
     "Gustavo Nunes"
    ],
    num: 39,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 20,
    foot: null,
    h: "5' 8\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Jannik Schuster",
    en: [
     "Jannik Schuster"
    ],
    num: 44,
    pos: [
     "DF"
    ],
    nat: "奥地利",
    age: 20,
    foot: null,
    h: "6' 3\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Kaye Furo",
    en: [
     "Kaye Furo"
    ],
    num: 47,
    pos: [
     "FW"
    ],
    nat: "比利时",
    age: 19,
    foot: null,
    h: "6' 3\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Benjamin Fredrick",
    en: [
     "Benjamin Fredrick"
    ],
    num: 48,
    pos: [
     "DF"
    ],
    nat: "尼日利亚",
    age: 21,
    foot: null,
    h: "6' 2\"",
    w: "",
    _src: "espn"
   }
  ]
 },
 "伯恩茅斯": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "彼得罗维奇",
    en: [
     "Djordje Petrovic"
    ],
    num: 1,
    pos: [
     "DF"
    ],
    nat: "塞尔维亚",
    age: 20,
    foot: null,
    h: "6' 4\"",
    w: "194 lbs",
    _src: "espn-zh"
   },
   {
    n: "阿德里安·特吕费尔",
    en: [
     "Adrien Truffert"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 24,
    foot: null,
    h: "5' 9\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "Lewis Cook",
    en: [
     "Lewis Cook"
    ],
    num: 4,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 29,
    foot: null,
    h: "5' 9\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "James Hill",
    en: [
     "James Hill"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 24,
    foot: null,
    h: "6' 0\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Julio Soler",
    en: [
     "Julio Soler"
    ],
    num: 6,
    pos: [
     "DF"
    ],
    nat: "阿根廷",
    age: 21,
    foot: null,
    h: "5' 9\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "David Brooks",
    en: [
     "David Brooks"
    ],
    num: 7,
    pos: [
     "MF"
    ],
    nat: "威尔士",
    age: 29,
    foot: null,
    h: "5' 8\"",
    w: "137 lbs",
    _src: "espn"
   },
   {
    n: "亚历克斯·斯科特",
    en: [
     "Alex Scott"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 23,
    foot: null,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "Evanilson",
    en: [
     "Evanilson"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 27,
    foot: null,
    h: "6' 0\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "瑞安·克里斯蒂",
    en: [
     "Ryan Christie"
    ],
    num: 10,
    pos: [
     "MF"
    ],
    nat: "苏格兰",
    age: 31,
    foot: null,
    h: "5' 10\"",
    w: "157 lbs",
    _src: "espn-zh"
   },
   {
    n: "本·多克",
    en: [
     "Ben Gannon-Doak"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "苏格兰",
    age: 20,
    foot: null,
    h: "5' 8\"",
    w: "141 lbs",
    _src: "espn-zh"
   },
   {
    n: "泰勒·亚当斯",
    en: [
     "Tyler Adams"
    ],
    num: 12,
    pos: [
     "MF"
    ],
    nat: "美国",
    age: 27,
    foot: null,
    h: "5' 9\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "António Silva",
    en: [
     "António Silva"
    ],
    num: 14,
    pos: [
     "DF"
    ],
    nat: "葡萄牙",
    age: 23,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn"
   },
   {
    n: "Adam Smith",
    en: [
     "Adam Smith"
    ],
    num: 15,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 35,
    foot: null,
    h: "5' 11\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "塔弗尼埃",
    en: [
     "Marcus Tavernier"
    ],
    num: 16,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 27,
    foot: null,
    h: "5' 10\"",
    w: "152 lbs",
    _src: "espn-zh"
   },
   {
    n: "Fraser Forster",
    en: [
     "Fraser Forster"
    ],
    num: 17,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 38,
    foot: null,
    h: "6' 7\"",
    w: "203 lbs",
    _src: "espn"
   },
   {
    n: "巴福代·迪亚基特",
    en: [
     "Bafodé Diakité"
    ],
    num: 18,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 25,
    foot: null,
    h: "6' 1\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "贾斯汀·克鲁伊维特",
    en: [
     "Justin Kluivert"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "荷兰",
    age: 27,
    foot: null,
    h: "5' 8\"",
    w: "146 lbs",
    _src: "espn-zh"
   },
   {
    n: "迪格雷戈里奥",
    en: [
     "Michele Di Gregorio"
    ],
    num: 20,
    pos: [
     "GK"
    ],
    nat: "意大利",
    age: 29,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn-zh"
   },
   {
    n: "Amine Adli",
    en: [
     "Amine Adli"
    ],
    num: 21,
    pos: [
     "FW"
    ],
    nat: "摩洛哥",
    age: 26,
    foot: null,
    h: "5' 9\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Junior Kroupi",
    en: [
     "Junior Kroupi"
    ],
    num: 22,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 20,
    foot: null,
    h: "5' 10\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Juanlu Sanchez",
    en: [
     "Juanlu Sanchez"
    ],
    num: 24,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 23,
    foot: null,
    h: "6' 0\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Alex Tóth",
    en: [
     "Alex Tóth"
    ],
    num: 27,
    pos: [
     "MF"
    ],
    nat: "匈牙利",
    age: 21,
    foot: null,
    h: "5' 11\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Max Aarons",
    en: [
     "Max Aarons"
    ],
    num: 28,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 26,
    foot: null,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Daniel Jebbison",
    en: [
     "Daniel Jebbison"
    ],
    num: 29,
    pos: [
     "FW"
    ],
    nat: "加拿大",
    age: 23,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Álvaro Rodríguez",
    en: [
     "Álvaro Rodríguez"
    ],
    num: 30,
    pos: [
     "FW"
    ],
    nat: "乌拉圭",
    age: 22,
    foot: null,
    h: "6' 4\"",
    w: "179 lbs",
    _src: "espn"
   },
   {
    n: "Rayan",
    en: [
     "Rayan"
    ],
    num: 37,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 20,
    foot: null,
    h: "6' 2\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "Veljko Milosavljevic",
    en: [
     "Veljko Milosavljevic"
    ],
    num: 44,
    pos: [
     "DF"
    ],
    nat: "塞尔维亚",
    age: 19,
    foot: null,
    h: "6' 4\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Mack Allan",
    en: [
     "Mack Allan"
    ],
    num: 55,
    pos: [
     "GK"
    ],
    nat: "",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   }
  ]
 },
 "富勒姆": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "贝恩德·莱诺",
    en: [
     "Bernd Leno"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "德国",
    age: 34,
    foot: null,
    h: "6' 2\"",
    w: "181 lbs",
    _src: "espn-zh"
   },
   {
    n: "肯尼·特特",
    en: [
     "Kenny Tete"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "荷兰",
    age: 31,
    foot: null,
    h: "5' 11\"",
    w: "157 lbs",
    _src: "espn-zh"
   },
   {
    n: "卡尔文·巴西",
    en: [
     "Calvin Bassey"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "尼日利亚",
    age: 26,
    foot: null,
    h: "6' 1\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jorge Cuenca",
    en: [
     "Jorge Cuenca"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "西班牙",
    age: 26,
    foot: null,
    h: "6' 3\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "约阿希姆·安德森",
    en: [
     "Joachim Andersen"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "丹麦",
    age: 30,
    foot: null,
    h: "6' 4\"",
    w: "190 lbs",
    _src: "espn-zh"
   },
   {
    n: "Harrison Reed",
    en: [
     "Harrison Reed"
    ],
    num: 6,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 31,
    foot: null,
    h: "5' 11\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "贡萨洛·加西亚",
    en: [
     "Gonzalo García"
    ],
    num: 7,
    pos: [
     "FW"
    ],
    nat: "西班牙",
    age: 22,
    foot: null,
    h: "6' 0\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "César Palacios",
    en: [
     "César Palacios"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 21,
    foot: null,
    h: "6' 0\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Rodrigo Muniz",
    en: [
     "Rodrigo Muniz"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 25,
    foot: null,
    h: "5' 10\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "Tom Cairney",
    en: [
     "Tom Cairney"
    ],
    num: 10,
    pos: [
     "MF"
    ],
    nat: "苏格兰",
    age: 35,
    foot: null,
    h: "6' 1\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Kevin",
    en: [
     "Kevin"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 23,
    foot: null,
    h: "5' 9\"",
    w: "157 lbs",
    _src: "espn"
   },
   {
    n: "奥斯卡·博布",
    en: [
     "Oscar Bobb"
    ],
    num: 14,
    pos: [
     "MF"
    ],
    nat: "挪威",
    age: 23,
    foot: null,
    h: "5' 9\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "Hugo Larsson",
    en: [
     "Hugo Larsson"
    ],
    num: 15,
    pos: [
     "MF"
    ],
    nat: "瑞典",
    age: 22,
    foot: null,
    h: "6' 2\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Sander Berge",
    en: [
     "Sander Berge"
    ],
    num: 16,
    pos: [
     "MF"
    ],
    nat: "挪威",
    age: 28,
    foot: null,
    h: "6' 5\"",
    w: "212 lbs",
    _src: "espn"
   },
   {
    n: "亚历克斯·伊沃比",
    en: [
     "Alex Iwobi"
    ],
    num: 17,
    pos: [
     "FW"
    ],
    nat: "尼日利亚",
    age: 30,
    foot: null,
    h: "5' 11\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jonah Kusi-Asare",
    en: [
     "Jonah Kusi-Asare"
    ],
    num: 18,
    pos: [
     "FW"
    ],
    nat: "瑞典",
    age: 19,
    foot: null,
    h: "6' 5\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Shea Charles",
    en: [
     "Shea Charles"
    ],
    num: 19,
    pos: [
     "MF"
    ],
    nat: "北爱尔兰",
    age: 22,
    foot: null,
    h: "6' 2\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "Manuel Ángel",
    en: [
     "Manuel Ángel"
    ],
    num: 20,
    pos: [
     "MF"
    ],
    nat: "西班牙",
    age: 22,
    foot: null,
    h: "5' 7\"",
    w: "130 lbs",
    _src: "espn"
   },
   {
    n: "Timothy Castagne",
    en: [
     "Timothy Castagne"
    ],
    num: 21,
    pos: [
     "DF"
    ],
    nat: "比利时",
    age: 30,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "David Affengruber",
    en: [
     "David Affengruber"
    ],
    num: 22,
    pos: [
     "DF"
    ],
    nat: "奥地利",
    age: 25,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Benjamin Lecomte",
    en: [
     "Benjamin Lecomte"
    ],
    num: 23,
    pos: [
     "GK"
    ],
    nat: "法国",
    age: 35,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Josh King",
    en: [
     "Josh King"
    ],
    num: 24,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "6' 2\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "瑞恩·塞塞尼翁",
    en: [
     "Ryan Sessegnon"
    ],
    num: 30,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 26,
    foot: null,
    h: "5' 10\"",
    w: "152 lbs",
    _src: "espn-zh"
   },
   {
    n: "史密斯-罗",
    en: [
     "Emile Smith Rowe"
    ],
    num: 32,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 26,
    foot: null,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "安托内·罗宾逊",
    en: [
     "Antonee Robinson"
    ],
    num: 33,
    pos: [
     "DF"
    ],
    nat: "美国",
    age: 29,
    foot: null,
    h: "6' 0\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "Chibuzo Nwoko",
    en: [
     "Chibuzo Nwoko"
    ],
    num: 34,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 20,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Macauley Zepa",
    en: [
     "Macauley Zepa"
    ],
    num: 35,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Alex Borto",
    en: [
     "Alex Borto"
    ],
    num: 36,
    pos: [
     "GK"
    ],
    nat: "美国",
    age: 22,
    foot: null,
    h: "6' 2\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Bradley Slade",
    en: [
     "Bradley Slade"
    ],
    num: 40,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: null,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   }
  ]
 },
 "利兹联": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "特拉福德",
    en: [
     "James Trafford"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 24,
    foot: null,
    h: "6' 6\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "杰登·博格尔",
    en: [
     "Jayden Bogle"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 26,
    foot: null,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "espn-zh"
   },
   {
    n: "古德蒙德松",
    en: [
     "Gabriel Gudmundsson"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "瑞典",
    age: 27,
    foot: null,
    h: "5' 11\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "伊桑·阿姆帕杜",
    en: [
     "Ethan Ampadu"
    ],
    num: 4,
    pos: [
     "MF"
    ],
    nat: "威尔士",
    age: 26,
    foot: null,
    h: "6' 0\"",
    w: "172 lbs",
    _src: "espn-zh"
   },
   {
    n: "Tarik Muharemovic",
    en: [
     "Tarik Muharemovic"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "波黑",
    age: 23,
    foot: null,
    h: "6' 4\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "乔·罗登",
    en: [
     "Joe Rodon"
    ],
    num: 6,
    pos: [
     "DF"
    ],
    nat: "威尔士",
    age: 29,
    foot: null,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "espn-zh"
   },
   {
    n: "丹尼尔·詹姆斯",
    en: [
     "Daniel James"
    ],
    num: 7,
    pos: [
     "FW"
    ],
    nat: "威尔士",
    age: 28,
    foot: null,
    h: "5' 7\"",
    w: "139 lbs",
    _src: "espn-zh"
   },
   {
    n: "肖恩·朗斯塔夫",
    en: [
     "Sean Longstaff"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 29,
    foot: null,
    h: "5' 11\"",
    w: "141 lbs",
    _src: "espn-zh"
   },
   {
    n: "卡尔弗特-勒温",
    en: [
     "Dominic Calvert-Lewin"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 29,
    foot: null,
    h: "6' 2\"",
    w: "157 lbs",
    _src: "espn-zh"
   },
   {
    n: "哈里·威尔逊",
    en: [
     "Harry Wilson"
    ],
    num: 10,
    pos: [
     "FW"
    ],
    nat: "威尔士",
    age: 29,
    foot: null,
    h: "5' 8\"",
    w: "139 lbs",
    _src: "espn-zh"
   },
   {
    n: "卢卡斯·恩梅查",
    en: [
     "Lukas Nmecha"
    ],
    num: 14,
    pos: [
     "FW"
    ],
    nat: "德国",
    age: 27,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jaka Bijol",
    en: [
     "Jaka Bijol"
    ],
    num: 15,
    pos: [
     "DF"
    ],
    nat: "斯洛文尼亚",
    age: 27,
    foot: null,
    h: "6' 3\"",
    w: "185 lbs",
    _src: "espn"
   },
   {
    n: "Michael Zetterer",
    en: [
     "Michael Zetterer"
    ],
    num: 16,
    pos: [
     "GK"
    ],
    nat: "德国",
    age: 31,
    foot: null,
    h: "6' 2\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "施塔赫",
    en: [
     "Anton Stach",
     "施塔赫"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "右",
    club: "利兹联",
    nat: "德国",
    num: 16,
    age: 27,
    season: "—",
    st: "破坏型6：长传+远射",
    tags: [
     "破坏型"
    ],
    pair: [
     "安德森(英格兰):英超级6号"
    ],
    d: "2025加盟利兹联的德国铁腰：抢断+对角长传+重炮，克洛普6号位的现成人选。",
    _src: "curated",
    _rosterMiss: true
   },
   {
    n: "诺亚·奥卡福",
    en: [
     "Noah Okafor"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "瑞士",
    age: 26,
    foot: null,
    h: "6' 1\"",
    w: "185 lbs",
    _src: "espn-zh"
   },
   {
    n: "Alex Cairns",
    en: [
     "Alex Cairns"
    ],
    num: 21,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 33,
    foot: null,
    h: "6' 0\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "田中碧",
    en: [
     "Ao Tanaka"
    ],
    num: 22,
    pos: [
     "MF"
    ],
    nat: "日本",
    age: 28,
    foot: null,
    h: "5' 11\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jean-Mattéo Bahoya",
    en: [
     "Jean-Mattéo Bahoya"
    ],
    num: 23,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 21,
    foot: null,
    h: "5' 11\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "James Justin",
    en: [
     "James Justin"
    ],
    num: 24,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 28,
    foot: null,
    h: "6' 0\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Melvin Bard",
    en: [
     "Melvin Bard"
    ],
    num: 26,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 25,
    foot: null,
    h: "5' 8\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "Nico Elvedi",
    en: [
     "Nico Elvedi"
    ],
    num: 30,
    pos: [
     "DF"
    ],
    nat: "瑞士",
    age: 30,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Ilia Gruev",
    en: [
     "Ilia Gruev"
    ],
    num: 44,
    pos: [
     "MF"
    ],
    nat: "保加利亚",
    age: 26,
    foot: null,
    h: "6' 1\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Rhys Chadwick",
    en: [
     "Rhys Chadwick"
    ],
    num: 47,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Rory Mahady",
    en: [
     "Rory Mahady"
    ],
    num: 48,
    pos: [
     "GK"
    ],
    nat: "苏格兰",
    age: 20,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Darryl Ombang",
    en: [
     "Darryl Ombang"
    ],
    num: 49,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 21,
    foot: null,
    h: "6' 3\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Alfie Cresswell",
    en: [
     "Alfie Cresswell"
    ],
    num: 50,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Jayden Lienou",
    en: [
     "Jayden Lienou"
    ],
    num: 65,
    pos: [
     "DF"
    ],
    nat: "威尔士",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Callum Mills",
    en: [
     "Callum Mills"
    ],
    num: 72,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "阿伦森",
    en: [
     "Aaronson"
    ],
    pos: [
     "AM",
     "RW"
    ],
    foot: "右",
    club: "利兹联",
    nat: "美国",
    st: "高压逼抢型攻击中场",
    tags: [
     "自由10"
    ],
    pair: [],
    d: "跑不死的美国十号：压迫强度是他的通行证。",
    _src: "curated"
   }
  ]
 },
 "桑德兰": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "丹索",
    en: [
     "Kevin Danso"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "奥地利",
    age: 28,
    foot: null,
    h: "6' 3\"",
    w: "185 lbs",
    _src: "espn-zh"
   },
   {
    n: "Danny Ballard",
    en: [
     "Danny Ballard"
    ],
    num: 5,
    pos: [
     "DF"
    ],
    nat: "北爱尔兰",
    age: 27,
    foot: null,
    h: "6' 2\"",
    w: "185 lbs",
    _src: "espn"
   },
   {
    n: "Dayann Methalie",
    en: [
     "Dayann Methalie"
    ],
    num: 6,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 20,
    foot: null,
    h: "6' 1\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "沙姆西丁·塔尔比",
    en: [
     "Chemsdine Talbi"
    ],
    num: 7,
    pos: [
     "FW"
    ],
    nat: "摩洛哥",
    age: 21,
    foot: null,
    h: "5' 9\"",
    w: "152 lbs",
    _src: "espn-zh"
   },
   {
    n: "Alan Browne",
    en: [
     "Alan Browne"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "Republic of Ireland",
    age: 31,
    foot: null,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "布赖恩·布罗贝",
    en: [
     "Brian Brobbey"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "荷兰",
    age: 24,
    foot: null,
    h: "5' 11\"",
    w: "174 lbs",
    _src: "espn-zh"
   },
   {
    n: "Chris Rigg",
    en: [
     "Chris Rigg"
    ],
    num: 11,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "5' 10\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "Thomas Meunier",
    en: [
     "Thomas Meunier"
    ],
    num: 12,
    pos: [
     "DF"
    ],
    nat: "比利时",
    age: 35,
    foot: null,
    h: "6' 3\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "Luke O'Nien",
    en: [
     "Luke O'Nien"
    ],
    num: 13,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 31,
    foot: null,
    h: "5' 9\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Romaine Mundle",
    en: [
     "Romaine Mundle"
    ],
    num: 14,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 23,
    foot: null,
    h: "5' 11\"",
    w: "132 lbs",
    _src: "espn"
   },
   {
    n: "Omar Alderete",
    en: [
     "Omar Alderete"
    ],
    num: 15,
    pos: [
     "DF"
    ],
    nat: "巴拉圭",
    age: 29,
    foot: null,
    h: "6' 2\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "Reinildo Mandava",
    en: [
     "Reinildo Mandava"
    ],
    num: 17,
    pos: [
     "DF"
    ],
    nat: "Mozambique",
    age: 32,
    foot: null,
    h: "6' 0\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "哈比布·迪亚拉",
    en: [
     "Habib Diarra"
    ],
    num: 19,
    pos: [
     "MF"
    ],
    nat: "塞内加尔",
    age: 22,
    foot: null,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "诺迪·穆基莱",
    en: [
     "Nordi Mukiele"
    ],
    num: 20,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 29,
    foot: null,
    h: "6' 2\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "Simon Moore",
    en: [
     "Simon Moore"
    ],
    num: 21,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 36,
    foot: null,
    h: "6' 3\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "罗宾·勒夫斯",
    en: [
     "Robin Roefs"
    ],
    num: 22,
    pos: [
     "GK"
    ],
    nat: "荷兰",
    age: 23,
    foot: null,
    h: "6' 4\"",
    w: "159 lbs",
    _src: "espn-zh"
   },
   {
    n: "诺亚·萨迪基",
    en: [
     "Noah Sadiki"
    ],
    num: 27,
    pos: [
     "MF"
    ],
    nat: "Congo DR",
    age: 21,
    foot: null,
    h: "5' 8\"",
    w: "161 lbs",
    _src: "espn-zh"
   },
   {
    n: "恩佐·勒费",
    en: [
     "Enzo Le Fée"
    ],
    num: 28,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 26,
    foot: null,
    h: "5' 7\"",
    w: "139 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jules Ahoka",
    en: [
     "Jules Ahoka"
    ],
    num: 29,
    pos: [
     "MF"
    ],
    nat: "",
    age: 20,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Melker Ellborg",
    en: [
     "Melker Ellborg"
    ],
    num: 31,
    pos: [
     "GK"
    ],
    nat: "瑞典",
    age: 23,
    foot: null,
    h: "6' 3\"",
    w: "",
    _src: "espn"
   },
   {
    n: "特雷·休姆",
    en: [
     "Trai Hume"
    ],
    num: 32,
    pos: [
     "DF"
    ],
    nat: "北爱尔兰",
    age: 24,
    foot: null,
    h: "5' 11\"",
    w: "163 lbs",
    _src: "espn-zh"
   },
   {
    n: "扎卡",
    en: [
     "Xhaka"
    ],
    pos: [
     "DM",
     "CM"
    ],
    foot: "左",
    club: "桑德兰",
    nat: "瑞士",
    st: "组织型6：调度+领导力",
    tags: [
     "拖后组织"
    ],
    pair: [],
    d: "2025夏窗神奇转会：把桑德兰的中场秩序直接拉到英超水准。",
    num: 34,
    age: 34,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "curated"
   },
   {
    n: "Jocelin Ta Bi",
    en: [
     "Jocelin Ta Bi"
    ],
    num: 37,
    pos: [
     "FW"
    ],
    nat: "科特迪瓦",
    age: 21,
    foot: null,
    h: "5' 10\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Malick Fofana",
    en: [
     "Malick Fofana"
    ],
    num: 39,
    pos: [
     "FW"
    ],
    nat: "比利时",
    age: 21,
    foot: null,
    h: "5' 7\"",
    w: "132 lbs",
    _src: "espn"
   },
   {
    n: "Jack Whittaker",
    en: [
     "Jack Whittaker"
    ],
    num: 40,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 20,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Trey Ogunsuyi",
    en: [
     "Trey Ogunsuyi"
    ],
    num: 47,
    pos: [
     "FW"
    ],
    nat: "比利时",
    age: 19,
    foot: null,
    h: "6' 3\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Jenson Arron Jones",
    en: [
     "Jenson Arron Jones"
    ],
    num: 48,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 20,
    foot: null,
    h: "6' 0\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Felix Scott",
    en: [
     "Felix Scott"
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
    n: "Juan Angulo",
    en: [
     "Juan Angulo"
    ],
    num: 50,
    pos: [
     "FW"
    ],
    nat: "厄瓜多尔",
    age: 18,
    foot: null,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Tymur Tutierov",
    en: [
     "Tymur Tutierov"
    ],
    num: 57,
    pos: [
     "FW"
    ],
    nat: "乌克兰",
    age: 21,
    foot: null,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Tom Proctor",
    en: [
     "Tom Proctor"
    ],
    num: 77,
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
    n: "伊斯多尔",
    en: [
     "Isidor"
    ],
    pos: [
     "ST"
    ],
    foot: "右",
    club: "桑德兰",
    nat: "法国",
    st: "速度型9",
    tags: [
     "抢点型"
    ],
    pair: [
     "扎卡：直塞连线"
    ],
    d: "桑德兰升超锋线：身后球+压迫。",
    _src: "curated"
   }
  ]
 },
 "考文垂": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "Ethan Pinnock",
    en: [
     "Ethan Pinnock"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "牙买加",
    age: 33,
    foot: null,
    h: "6' 4\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Jay Da Silva",
    en: [
     "Jay Da Silva"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "威尔士",
    age: 28,
    foot: null,
    h: "5' 7\"",
    w: "139 lbs",
    _src: "espn"
   },
   {
    n: "Bobby Thomas",
    en: [
     "Bobby Thomas"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 25,
    foot: null,
    h: "6' 4\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "Jack Rudoni",
    en: [
     "Jack Rudoni"
    ],
    num: 5,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 25,
    foot: null,
    h: "6' 1\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "Matt Grimes",
    en: [
     "Matt Grimes"
    ],
    num: 6,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 31,
    foot: null,
    h: "5' 11\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Tatsuhiro Sakamoto",
    en: [
     "Tatsuhiro Sakamoto"
    ],
    num: 7,
    pos: [
     "MF"
    ],
    nat: "日本",
    age: 30,
    foot: null,
    h: "5' 7\"",
    w: "139 lbs",
    _src: "espn"
   },
   {
    n: "Caleb Yirenkyi",
    en: [
     "Caleb Yirenkyi"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "加纳",
    age: 20,
    foot: null,
    h: "6' 0\"",
    w: "170 lbs",
    _src: "espn"
   },
   {
    n: "Ellis Simms",
    en: [
     "Ellis Simms"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 25,
    foot: null,
    h: "6' 3\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Ephron Mason-Clark",
    en: [
     "Ephron Mason-Clark"
    ],
    num: 10,
    pos: [
     "MF"
    ],
    nat: "牙买加",
    age: 27,
    foot: null,
    h: "5' 10\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "Haji Wright",
    en: [
     "Haji Wright"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "美国",
    age: 28,
    foot: null,
    h: "6' 3\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Stephen Mfuni",
    en: [
     "Stephen Mfuni"
    ],
    num: 12,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "5' 11\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Ben Wilson",
    en: [
     "Ben Wilson"
    ],
    num: 13,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 34,
    foot: null,
    h: "6' 1\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "阿沃尼伊",
    en: [
     "Taiwo Awoniyi"
    ],
    num: 14,
    pos: [
     "FW"
    ],
    nat: "尼日利亚",
    age: 29,
    foot: null,
    h: "6' 0\"",
    w: "183 lbs",
    _src: "espn-zh"
   },
   {
    n: "Frank Onyeka",
    en: [
     "Frank Onyeka"
    ],
    num: 16,
    pos: [
     "MF"
    ],
    nat: "尼日利亚",
    age: 28,
    foot: null,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Loum Tchaouna",
    en: [
     "Loum Tchaouna"
    ],
    num: 17,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 23,
    foot: null,
    h: "5' 11\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Carl Rushworth",
    en: [
     "Carl Rushworth"
    ],
    num: 19,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 25,
    foot: null,
    h: "6' 2\"",
    w: "190 lbs",
    _src: "espn"
   },
   {
    n: "Kaine Kesler Hayden",
    en: [
     "Kaine Kesler Hayden"
    ],
    num: 20,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 24,
    foot: null,
    h: "5' 9\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Jake Bidwell",
    en: [
     "Jake Bidwell"
    ],
    num: 21,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 33,
    foot: null,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Joel Latibeaudiere",
    en: [
     "Joel Latibeaudiere"
    ],
    num: 22,
    pos: [
     "DF"
    ],
    nat: "牙买加",
    age: 26,
    foot: null,
    h: "5' 11\"",
    w: "179 lbs",
    _src: "espn"
   },
   {
    n: "Brandon Thomas-Asante",
    en: [
     "Brandon Thomas-Asante"
    ],
    num: 23,
    pos: [
     "FW"
    ],
    nat: "加纳",
    age: 27,
    foot: null,
    h: "6' 0\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Aurèle Amenda",
    en: [
     "Aurèle Amenda"
    ],
    num: 24,
    pos: [
     "DF"
    ],
    nat: "瑞士",
    age: 23,
    foot: null,
    h: "6' 4\"",
    w: "196 lbs",
    _src: "espn"
   },
   {
    n: "Daniel Bentley",
    en: [
     "Daniel Bentley"
    ],
    num: 25,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 33,
    foot: null,
    h: "6' 2\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Luke Woolfenden",
    en: [
     "Luke Woolfenden"
    ],
    num: 26,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 28,
    foot: null,
    h: "6' 4\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Milan van Ewijk",
    en: [
     "Milan van Ewijk"
    ],
    num: 27,
    pos: [
     "DF"
    ],
    nat: "荷兰",
    age: 26,
    foot: null,
    h: "5' 9\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Josh Eccles",
    en: [
     "Josh Eccles"
    ],
    num: 28,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 26,
    foot: null,
    h: "5' 11\"",
    w: "146 lbs",
    _src: "espn"
   },
   {
    n: "Victor Torp",
    en: [
     "Victor Torp"
    ],
    num: 29,
    pos: [
     "MF"
    ],
    nat: "丹麦",
    age: 27,
    foot: null,
    h: "5' 10\"",
    w: "130 lbs",
    _src: "espn"
   },
   {
    n: "Yann Gboho",
    en: [
     "Yann Gboho"
    ],
    num: 34,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 25,
    foot: null,
    h: "5' 10\"",
    w: "139 lbs",
    _src: "espn"
   },
   {
    n: "Gustavo Hamer",
    en: [
     "Gustavo Hamer"
    ],
    num: 38,
    pos: [
     "MF"
    ],
    nat: "荷兰",
    age: 29,
    foot: null,
    h: "5' 7\"",
    w: "132 lbs",
    _src: "espn"
   },
   {
    n: "Sidiki Cherif",
    en: [
     "Sidiki Cherif"
    ],
    num: 49,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 19,
    foot: null,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "espn"
   }
  ]
 },
 "伊普斯维奇": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "Alex Palmer",
    en: [
     "Alex Palmer"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 30,
    foot: null,
    h: "6' 3\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Darnell Furlong",
    en: [
     "Darnell Furlong"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 31,
    foot: null,
    h: "6' 0\"",
    w: "168 lbs",
    _src: "espn"
   },
   {
    n: "Leif Davis",
    en: [
     "Leif Davis"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 26,
    foot: null,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Cedric Kipre",
    en: [
     "Cedric Kipre"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 29,
    foot: null,
    h: "6' 4\"",
    w: "196 lbs",
    _src: "espn"
   },
   {
    n: "Azor Matusiwa",
    en: [
     "Azor Matusiwa"
    ],
    num: 5,
    pos: [
     "MF"
    ],
    nat: "荷兰",
    age: 28,
    foot: null,
    h: "5' 8\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Issa Diop",
    en: [
     "Issa Diop"
    ],
    num: 6,
    pos: [
     "DF"
    ],
    nat: "摩洛哥",
    age: 29,
    foot: null,
    h: "6' 4\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "Fatawu Issahaku",
    en: [
     "Fatawu Issahaku"
    ],
    num: 7,
    pos: [
     "FW"
    ],
    nat: "加纳",
    age: 22,
    foot: null,
    h: "5' 10\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Sindre Walle Egeli",
    en: [
     "Sindre Walle Egeli"
    ],
    num: 8,
    pos: [
     "FW"
    ],
    nat: "挪威",
    age: 20,
    foot: null,
    h: "5' 11\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Zian Flemming",
    en: [
     "Zian Flemming"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "荷兰",
    age: 28,
    foot: null,
    h: "6' 1\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Julio Enciso",
    en: [
     "Julio Enciso"
    ],
    num: 10,
    pos: [
     "MF"
    ],
    nat: "巴拉圭",
    age: 22,
    foot: null,
    h: "5' 8\"",
    w: "139 lbs",
    _src: "espn"
   },
   {
    n: "Jaden Philogene",
    en: [
     "Jaden Philogene"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 24,
    foot: null,
    h: "5' 11\"",
    w: "146 lbs",
    _src: "espn"
   },
   {
    n: "Florentino",
    en: [
     "Florentino"
    ],
    num: 12,
    pos: [
     "MF"
    ],
    nat: "葡萄牙",
    age: 27,
    foot: null,
    h: "6' 0\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Jack Taylor",
    en: [
     "Jack Taylor"
    ],
    num: 14,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 28,
    foot: null,
    h: "6' 1\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Emersonn",
    en: [
     "Emersonn"
    ],
    num: 19,
    pos: [
     "FW"
    ],
    nat: "巴西",
    age: 22,
    foot: null,
    h: "6' 1\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Kasey McAteer",
    en: [
     "Kasey McAteer"
    ],
    num: 20,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 24,
    foot: null,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "萨沙·卢基奇",
    en: [
     "Sasa Lukic"
    ],
    num: 23,
    pos: [
     "MF"
    ],
    nat: "塞尔维亚",
    age: 30,
    foot: null,
    h: "6' 0\"",
    w: "168 lbs",
    _src: "espn-zh"
   },
   {
    n: "Jacob Greaves",
    en: [
     "Jacob Greaves"
    ],
    num: 24,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 26,
    foot: null,
    h: "6' 1\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Exequiel Palacios",
    en: [
     "Exequiel Palacios"
    ],
    num: 25,
    pos: [
     "MF"
    ],
    nat: "阿根廷",
    age: 28,
    foot: null,
    h: "5' 9\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Dara O'Shea",
    en: [
     "Dara O'Shea"
    ],
    num: 26,
    pos: [
     "DF"
    ],
    nat: "Republic of Ireland",
    age: 27,
    foot: null,
    h: "6' 2\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "David Button",
    en: [
     "David Button"
    ],
    num: 27,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 37,
    foot: null,
    h: "6' 3\"",
    w: "192 lbs",
    _src: "espn"
   },
   {
    n: "Christian Walton",
    en: [
     "Christian Walton"
    ],
    num: 28,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 30,
    foot: null,
    h: "6' 5\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Chuba Akpom",
    en: [
     "Chuba Akpom"
    ],
    num: 29,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 31,
    foot: null,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Marcelino Núñez",
    en: [
     "Marcelino Núñez"
    ],
    num: 32,
    pos: [
     "MF"
    ],
    nat: "智利",
    age: 26,
    foot: null,
    h: "5' 8\"",
    w: "161 lbs",
    _src: "espn"
   },
   {
    n: "Anis Mehmeti",
    en: [
     "Anis Mehmeti"
    ],
    num: 33,
    pos: [
     "MF"
    ],
    nat: "阿尔巴尼亚",
    age: 25,
    foot: null,
    h: "5' 11\"",
    w: "139 lbs",
    _src: "espn"
   },
   {
    n: "Kjell Scherpen",
    en: [
     "Kjell Scherpen"
    ],
    num: 37,
    pos: [
     "GK"
    ],
    nat: "荷兰",
    age: 26,
    foot: null,
    h: "6' 9\"",
    w: "214 lbs",
    _src: "espn"
   },
   {
    n: "Daizen Maeda",
    en: [
     "Daizen Maeda"
    ],
    num: 38,
    pos: [
     "FW"
    ],
    nat: "日本",
    age: 29,
    foot: null,
    h: "5' 8\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "Matthew Charles Compton",
    en: [
     "Matthew Charles Compton"
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
    n: "Abdoul Ouattara",
    en: [
     "Abdoul Ouattara"
    ],
    num: 42,
    pos: [
     "DF"
    ],
    nat: "法国",
    age: 21,
    foot: null,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Jack Clarke",
    en: [
     "Jack Clarke"
    ],
    num: 47,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 27,
    foot: null,
    h: "5' 11\"",
    w: "161 lbs",
    _src: "espn"
   }
  ]
 },
 "赫尔城": {
  league: "英超",
  coach: "",
  updated: "2026-11-01",
  players: [
   {
    n: "Jack Butland",
    en: [
     "Jack Butland"
    ],
    num: 1,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 33,
    foot: null,
    h: "6' 5\"",
    w: "207 lbs",
    _src: "espn"
   },
   {
    n: "Lewie Coyle",
    en: [
     "Lewie Coyle"
    ],
    num: 2,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 31,
    foot: null,
    h: "5' 8\"",
    w: "148 lbs",
    _src: "espn"
   },
   {
    n: "Ryan Giles",
    en: [
     "Ryan Giles"
    ],
    num: 3,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 26,
    foot: null,
    h: "5' 10\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Charlie Hughes",
    en: [
     "Charlie Hughes"
    ],
    num: 4,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 18,
    foot: null,
    h: "6' 1\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Hidemasa Morita",
    en: [
     "Hidemasa Morita"
    ],
    num: 5,
    pos: [
     "MF"
    ],
    nat: "日本",
    age: 31,
    foot: null,
    h: "5' 10\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Semi Ajayi",
    en: [
     "Semi Ajayi"
    ],
    num: 6,
    pos: [
     "DF"
    ],
    nat: "尼日利亚",
    age: 32,
    foot: null,
    h: "6' 4\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Sorba Thomas",
    en: [
     "Sorba Thomas"
    ],
    num: 7,
    pos: [
     "FW"
    ],
    nat: "威尔士",
    age: 27,
    foot: null,
    h: "6' 1\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Eliot Matazo",
    en: [
     "Eliot Matazo"
    ],
    num: 8,
    pos: [
     "MF"
    ],
    nat: "比利时",
    age: 24,
    foot: null,
    h: "5' 7\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Oliver McBurnie",
    en: [
     "Oliver McBurnie"
    ],
    num: 9,
    pos: [
     "FW"
    ],
    nat: "苏格兰",
    age: 30,
    foot: null,
    h: "6' 2\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Mohamed Belloumi",
    en: [
     "Mohamed Belloumi"
    ],
    num: 10,
    pos: [
     "FW"
    ],
    nat: "阿尔及利亚",
    age: 24,
    foot: null,
    h: "5' 9\"",
    w: "146 lbs",
    _src: "espn"
   },
   {
    n: "Joe Gelhardt",
    en: [
     "Joe Gelhardt"
    ],
    num: 11,
    pos: [
     "FW"
    ],
    nat: "英格兰",
    age: 24,
    foot: null,
    h: "5' 9\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "Dillon Phillips",
    en: [
     "Dillon Phillips"
    ],
    num: 12,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 31,
    foot: null,
    h: "6' 2\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Jens Hjerto Dahl",
    en: [
     "Jens Hjerto Dahl"
    ],
    num: 14,
    pos: [
     "MF"
    ],
    nat: "挪威",
    age: 21,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "John Egan",
    en: [
     "John Egan"
    ],
    num: 15,
    pos: [
     "DF"
    ],
    nat: "Republic of Ireland",
    age: 34,
    foot: null,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Paddy McNair",
    en: [
     "Paddy McNair"
    ],
    num: 17,
    pos: [
     "DF"
    ],
    nat: "北爱尔兰",
    age: 31,
    foot: null,
    h: "6' 0\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Brooke Norton-Cuffy",
    en: [
     "Brooke Norton-Cuffy"
    ],
    num: 18,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 22,
    foot: null,
    h: "5' 11\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Konstantinos Tzolakis",
    en: [
     "Konstantinos Tzolakis"
    ],
    num: 19,
    pos: [
     "GK"
    ],
    nat: "希腊",
    age: 23,
    foot: null,
    h: "6' 4\"",
    w: "",
    _src: "espn"
   },
   {
    n: "Óscar Zambrano",
    en: [
     "Óscar Zambrano"
    ],
    num: 20,
    pos: [
     "MF"
    ],
    nat: "厄瓜多尔",
    age: 22,
    foot: null,
    h: "5' 8\"",
    w: "150 lbs",
    _src: "espn"
   },
   {
    n: "Elliot Stroud",
    en: [
     "Elliot Stroud"
    ],
    num: 21,
    pos: [
     "MF"
    ],
    nat: "瑞典",
    age: 24,
    foot: null,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Lucas Herrington",
    en: [
     "Lucas Herrington"
    ],
    num: 22,
    pos: [
     "DF"
    ],
    nat: "澳大利亚",
    age: 19,
    foot: null,
    h: "6' 4\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Matt Targett",
    en: [
     "Matt Targett"
    ],
    num: 23,
    pos: [
     "DF"
    ],
    nat: "英格兰",
    age: 31,
    foot: null,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Darko Gyabi",
    en: [
     "Darko Gyabi"
    ],
    num: 24,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 22,
    foot: null,
    h: "6' 5\"",
    w: "174 lbs",
    _src: "espn"
   },
   {
    n: "Matt Crooks",
    en: [
     "Matt Crooks"
    ],
    num: 25,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 32,
    foot: null,
    h: "6' 3\"",
    w: "159 lbs",
    _src: "espn"
   },
   {
    n: "Kieran Dowell",
    en: [
     "Kieran Dowell"
    ],
    num: 26,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 29,
    foot: null,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Regan Slater",
    en: [
     "Regan Slater"
    ],
    num: 27,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 27,
    foot: null,
    h: "5' 8\"",
    w: "141 lbs",
    _src: "espn"
   },
   {
    n: "Ilyas Ansah",
    en: [
     "Ilyas Ansah"
    ],
    num: 28,
    pos: [
     "FW"
    ],
    nat: "德国",
    age: 21,
    foot: null,
    h: "6' 4\"",
    w: "183 lbs",
    _src: "espn"
   },
   {
    n: "Lucas Gourna-Douath",
    en: [
     "Lucas Gourna-Douath"
    ],
    num: 29,
    pos: [
     "MF"
    ],
    nat: "法国",
    age: 23,
    foot: null,
    h: "6' 1\"",
    w: "179 lbs",
    _src: "espn"
   },
   {
    n: "Nobel Mendy",
    en: [
     "Nobel Mendy"
    ],
    num: 32,
    pos: [
     "DF"
    ],
    nat: "塞内加尔",
    age: 22,
    foot: null,
    h: "6' 2\"",
    w: "172 lbs",
    _src: "espn"
   },
   {
    n: "Abdülkadir Ömür",
    en: [
     "Abdülkadir Ömür"
    ],
    num: 33,
    pos: [
     "MF"
    ],
    nat: "Türkiye",
    age: 27,
    foot: null,
    h: "5' 6\"",
    w: "137 lbs",
    _src: "espn"
   },
   {
    n: "Christos Mouzakitis",
    en: [
     "Christos Mouzakitis"
    ],
    num: 36,
    pos: [
     "MF"
    ],
    nat: "希腊",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   },
   {
    n: "Tim Iroegbunam",
    en: [
     "Tim Iroegbunam"
    ],
    num: 42,
    pos: [
     "MF"
    ],
    nat: "英格兰",
    age: 23,
    foot: null,
    h: "6' 0\"",
    w: "152 lbs",
    _src: "espn"
   },
   {
    n: "Robinio Vaz",
    en: [
     "Robinio Vaz"
    ],
    num: 47,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 19,
    foot: null,
    h: "6' 1\"",
    w: "163 lbs",
    _src: "espn"
   },
   {
    n: "Mohamed-Ali Cho",
    en: [
     "Mohamed-Ali Cho"
    ],
    num: 50,
    pos: [
     "FW"
    ],
    nat: "法国",
    age: 22,
    foot: null,
    h: "5' 11\"",
    w: "146 lbs",
    _src: "espn"
   },
   {
    n: "Archie Howard",
    en: [
     "Archie Howard"
    ],
    num: 55,
    pos: [
     "GK"
    ],
    nat: "英格兰",
    age: 19,
    foot: null,
    h: "",
    w: "",
    _src: "espn"
   }
  ]
 }
};
