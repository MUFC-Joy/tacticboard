

/* =========================================================
   对位引擎 v4.1
   L1 球员本体(players.js) · L2 体系(教练/阵型) · L3 比赛态
   ========================================================= */
'use strict';
var ALIAS={'维拉':'阿斯顿维拉','森林':'诺丁汉森林','纽卡':'纽卡斯尔','纽卡斯尔':'纽卡斯尔'};
function norm(c){return ALIAS[c]||c;}

var POOL={};
PLAYERS.forEach(function(p){ var c=norm(p.club); if(!c||c.indexOf('离开')>=0) return;
  (POOL[c]=POOL[c]||[]).push(p); });
var byName={}; PLAYERS.forEach(function(p){ byName[p.n]=p; });

/* 五大联赛 40 队名单（ESPN 基础数据）并入：粗位置展开，精选库已有的以精选库为准 */
var SQUADS_ALL=window.SQUADS_ALL||{};
Object.keys(SQUADS_ALL).forEach(function(t){
  var arr=POOL[t]=POOL[t]||[];
  var have={}; arr.forEach(function(p){ have[p.n]=1; });
  (SQUADS_ALL[t].players||[]).forEach(function(q){
    if(have[q.n]) return; have[q.n]=1;
    var p={n:q.n,en:(q.en||[]).slice(),pos:[],num:q.num,age:q.age,nat:q.nat,foot:q.foot||null,
           club:t,st:q.st||'',tags:q.tags||[],status:q.status,_espn:true};
    (q.pos||[]).forEach(function(x){
      (window.expandPos?window.expandPos(x):[x]).forEach(function(y){ if(p.pos.indexOf(y)<0) p.pos.push(y); });
    });
    arr.push(p); byName[p.n]=p;
  });
});

/* 姓级去重（问题十一）：同队内同姓条目只留一个，curated > espn-zh > espn */
(function(){
  function dAcc(x){ return String(x||'').toLowerCase(); }
  Object.keys(POOL).forEach(function(t){
    var rank=function(p){ return p._espn?2:1; };
    var seen={};
    var arr=POOL[t];
    var keep=[];
    arr.sort(function(a,b){ return rank(a)-rank(b); });
    arr.forEach(function(p){
      var en=(p.en&&p.en[0])||p.n;
      var last=dAcc(en).split(/\s+/).pop();
      /* 中文名：剥「·名字」后缀（劳塔罗·马丁内斯=劳塔罗） */
      var zhKey=dAcc(p.n).replace(/·[^]*$/,'').replace(/·.*$/,'');
      if(/[\u4e00-\u9fa5]/.test(p.n)) last=zhKey||last;
      if(!seen[last]){ seen[last]=1; keep.push(p); }
      else { if(byName[p.n]&&byName[p.n]===p) delete byName[p.n]; }
    });
    POOL[t]=keep;
  });
})();

var TEAMS=Object.keys(SQUADS_ALL).length?Object.keys(SQUADS_ALL):
  ['曼联','曼城','阿森纳','利物浦','热刺','切尔西','阿斯顿维拉','纽卡斯尔',
   '诺丁汉森林','埃弗顿','水晶宫','布莱顿','布伦特福德','伯恩茅斯','富勒姆',
   '利兹联','桑德兰','考文垂','伊普斯维奇','赫尔城'];
var PL_ORDER=['曼联','曼城','阿森纳','利物浦','热刺','切尔西','阿斯顿维拉','纽卡斯尔',
  '诺丁汉森林','埃弗顿','水晶宫','布莱顿','布伦特福德','伯恩茅斯','富勒姆',
  '利兹联','桑德兰','考文垂','伊普斯维奇','赫尔城'];
var GROUPS=(function(){
  var byL={}; Object.keys(SQUADS_ALL).forEach(function(t){
    var l=SQUADS_ALL[t].league||'其他'; (byL[l]=byL[l]||[]).push(t); });
  if(byL['英超']) byL['英超'].sort(function(a,b){
    return PL_ORDER.indexOf(a)-PL_ORDER.indexOf(b); });
  var order=['英超','西甲','意甲','德甲','法甲'];
  return order.filter(function(l){return byL[l]&&byL[l].length;})
    .map(function(l){return {t:(l==='英超'?'英超 20 队':l+' 球队'),list:byL[l]};});
})();
var CARD={}; PL20.forEach(function(t){CARD[t.name]=t;});

/* ---------------- L2 体系层：换帅只改这里 ---------------- */
var FORM_SEL={};
var FORM_OVERRIDE={'曼联':'4-2-3-1','曼城':'4-2-3-1','阿森纳':'4-2-3-1','利物浦':'4-2-3-1','热刺':'4-2-3-1','切尔西':'3-4-2-1'};
/* 20 队打法 DNA（六轴 0–4）——全部是「推断」，不是官方数据
   press 前场压迫 · control 控球倾向 · direct 纵向直塞 · low 低位防守 · wing 边路比重 · trans 转换速度 */
var DNA={
 '曼联':        {press:2,control:3,direct:2,low:1,wing:2,trans:2},
 '曼城':        {press:2,control:4,direct:1,low:0,wing:3,trans:1},
 '阿森纳':      {press:3,control:3,direct:1,low:1,wing:2,trans:1},
 '利物浦':      {press:4,control:2,direct:3,low:1,wing:3,trans:3},
 '热刺':        {press:2,control:4,direct:1,low:1,wing:2,trans:1},
 '切尔西':      {press:2,control:3,direct:2,low:1,wing:3,trans:2},
 '阿斯顿维拉':  {press:2,control:2,direct:3,low:2,wing:2,trans:3},
 '纽卡斯尔':    {press:3,control:2,direct:2,low:2,wing:2,trans:2},
 '诺丁汉森林':  {press:1,control:1,direct:3,low:4,wing:1,trans:3},
 '埃弗顿':      {press:1,control:1,direct:3,low:3,wing:1,trans:2},
 '水晶宫':      {press:2,control:1,direct:3,low:3,wing:3,trans:3},
 '布莱顿':      {press:2,control:3,direct:1,low:1,wing:2,trans:1},
 '布伦特福德':  {press:1,control:1,direct:4,low:3,wing:2,trans:3},
 '伯恩茅斯':    {press:3,control:2,direct:2,low:1,wing:3,trans:3},
 '富勒姆':      {press:1,control:2,direct:2,low:2,wing:1,trans:1},
 '利兹联':      {press:3,control:2,direct:2,low:1,wing:2,trans:2},
 '桑德兰':      {press:2,control:1,direct:3,low:3,wing:2,trans:2},
 '考文垂':      {press:2,control:2,direct:2,low:2,wing:1,trans:1},
 '伊普斯维奇':  {press:1,control:2,direct:3,low:2,wing:1,trans:2},
 '赫尔城':      {press:1,control:2,direct:3,low:3,wing:1,trans:1},
 /* 2026-11 新增 7 队 */
 '罗马':        {press:3,control:2,direct:2,low:1,wing:3,trans:2},
 '勒沃库森':    {press:2,control:3,direct:2,low:1,wing:2,trans:1},
 '弗赖堡':      {press:2,control:2,direct:2,low:2,wing:2,trans:2},
 '毕尔巴鄂竞技':{press:2,control:3,direct:2,low:1,wing:3,trans:2},
 '比利亚雷亚尔':{press:2,control:3,direct:1,low:1,wing:2,trans:1},
 '里昂':        {press:2,control:3,direct:2,low:1,wing:2,trans:2},
 '马赛':        {press:3,control:3,direct:2,low:1,wing:3,trans:2}
};
var DNA_DEFAULT={press:2,control:2,direct:2,low:2,wing:2,trans:2};
/* 用户手改教练时写这一层；没改过的队走 DNA */
var STYLE_FIX={};
var PREFERRED={
 '曼联':{form:'4-2-3-1',xi:['拉门斯','达洛特','马奎尔','L.马丁内斯','卢克·肖','巴莱巴','蒂勒曼斯','姆贝乌莫','B费','库尼亚','谢什科']},
 '曼城':{form:'4-2-3-1',xi:['多纳鲁马','努内斯','鲁本·迪亚斯','格伊','格瓦迪奥尔','埃利奥特·安德森','恩佐','塞门约','谢尔基','恩迪亚耶','哈兰德']},
 '阿森纳':{form:'4-2-3-1',xi:['拉亚','本·怀特','孔萨','加布里埃尔','卡拉菲奥里','赖斯','刘易斯·斯凯利','萨卡','厄德高','措利斯','哈弗茨']},
 '利物浦':{form:'4-2-3-1',xi:['阿利松','阿劳霍','杰雷米·雅凯','范戴克','科尔克兹','麦卡利斯特','索博斯洛伊','维克托·穆尼奥斯','维尔茨','巴尔克拉','伊萨克']},
 '热刺':{form:'4-2-3-1',xi:['金斯基','范赫克','托辛·阿达拉比奥尤','范德文','罗伯逊','托纳利','阿奇·格雷','库杜斯','马特乌斯·费尔南德斯','马尔穆什','索兰克']},
 '切尔西':{form:'3-4-2-1',xi:['埃米·马丁内斯','阿奇姆蓬','马克桑斯·拉克鲁瓦','科尔威尔','内托','凯塞多','乔丹·亨德森','佩普·查瓦里亚','帕尔默','摩根·罗杰斯','若昂·佩德罗']}
};

var BASE_FORMS=['4-2-3-1','4-3-3','3-4-2-1','4-4-2','4-1-4-1','3-5-2','4-2-2-2','3-1-6','5-4-1'];
var FORMS={
 '4-2-3-1':[['GK',50,90],['RB',84,72],['CB',62,77],['CB',38,77],['LB',16,72],
            ['DM',62,55],['DM',38,55],['RW',84,34],['AM',50,38],['LW',16,34],['ST',50,14]],
 '4-3-3':[['GK',50,90],['RB',84,72],['CB',62,77],['CB',38,77],['LB',16,72],
          ['CM',70,54],['DM',50,58],['CM',30,54],['RW',82,30],['ST',50,14],['LW',18,30]],
 '3-4-2-1':[['GK',50,90],['CB',70,77],['CB',50,80],['CB',30,77],
            ['RWB',88,54],['CM',62,54],['CM',38,54],['LWB',12,54],
            ['AM',64,32],['AM',36,32],['ST',50,12]],
 '4-4-2':[['GK',50,90],['RB',84,74],['CB',62,78],['CB',38,78],['LB',16,74],
          ['RM',84,50],['CM',62,52],['CM',38,52],['LM',16,50],['ST',62,18],['ST',38,18]],
 '4-1-4-1':[['GK',50,90],['RB',84,74],['CB',62,78],['CB',38,78],['LB',16,74],
            ['DM',50,60],['RM',84,42],['CM',62,44],['CM',38,44],['LM',16,42],['ST',50,16]],
 '3-1-6':[['GK',50,90],['CB',70,78],['CB',50,81],['CB',30,78],['DM',50,60],
          ['LW',10,30],['AM',68,32],['AM',32,32],['RW',90,30],['ST',44,14],['ST',58,14]],
 '5-4-1':[['GK',50,91],['CB',70,75],['CB',50,75],['CB',30,75],
          ['RWB',88,72],['LWB',12,72],
          ['RM',80,54],['CM',60,55],['CM',40,55],['LM',20,54],
          ['ST',50,24]],
 '3-5-2':[['GK',50,90],['CB',70,77],['CB',50,80],['CB',30,77],
          ['RWB',88,52],['DM',50,60],['CM',66,52],['CM',34,52],['LWB',12,52],
          ['ST',60,16],['ST',40,16]],
 '4-2-2-2':[['GK',50,90],['RB',84,72],['CB',62,77],['CB',38,77],['LB',16,72],
          ['DM',64,58],['DM',36,58],['AM',72,36],['AM',28,36],
          ['ST',62,14],['ST',38,14]]
};
var POSS_FORMS={
 '3-1-6':[['GK',50,92],['CB',72,80],['CB',50,82],['CB',28,80],['DM',50,56],
          ['LW',10,26],['AM',68,28],['AM',32,28],['RW',90,26],['ST',44,12],['ST',58,12]],
 '4-2-3-1':[['GK',50,92],['RB',88,44],['CB',70,80],['CB',50,82],['LB',12,44],
            ['DM',62,60],['DM',38,60],['RW',80,26],['AM',50,34],['LW',20,26],['ST',50,12]],
 '4-3-3':[['GK',50,92],['RB',88,42],['CB',62,80],['CB',38,80],['LB',12,42],
          ['CM',70,52],['DM',50,62],['CM',30,52],['RW',80,24],['ST',50,12],['LW',20,24]],
 '3-4-2-1':[['GK',50,92],['CB',72,80],['CB',50,82],['CB',28,80],
            ['RWB',88,46],['CM',62,58],['CM',38,58],['LWB',12,46],
            ['AM',64,30],['AM',36,30],['ST',50,12]],
 '4-4-2':[['GK',50,92],['RB',86,50],['CB',62,80],['CB',38,80],['LB',14,50],
          ['RM',84,44],['CM',60,54],['CM',40,54],['LM',16,44],['ST',60,20],['ST',40,20]],
 '4-1-4-1':[['GK',50,92],['RB',88,44],['CB',62,80],['CB',38,80],['LB',12,44],
            ['DM',50,62],['RM',84,40],['CM',62,48],['CM',38,48],['LM',16,40],['ST',50,16]],
 '5-4-1':[['GK',50,92],['CB',70,76],['CB',50,76],['CB',30,76],
          ['RWB',88,50],['LWB',12,50],
          ['RM',80,30],['CM',60,54],['CM',40,54],['LM',20,30],
          ['ST',50,16]]
};
/* ---------------- 主攻方向（左路 / 右路 / 中路 / 均衡） ----------------
   点「左路」= 左后卫压上去、右边卫收进来当第三中卫、10 号去左肋、右边留一人拉宽。
   坐标按 FORMS / POSS_FORMS 的索引顺序给（GK,RB,CB,CB,LB,DM,DM,RW,AM,LW,ST 等）。 */
var DIRS=['left','right','center','bal'];
var DIR_NAME={left:'左路',right:'右路',center:'中路',bal:'均衡'};
var DIR_SHAPE={
 '4-2-3-1':{
   left:[[50,92],[70,78],[58,80],[44,84],[8,22],[56,60],[40,64],[92,28],[34,34],[8,16],[54,12]],
   center:[[50,92],[70,58],[38,84],[62,84],[30,58],[50,72],[62,26],[90,26],[38,24],[10,26],[50,12]]
 },
 '4-3-3':{
   left:[[50,92],[70,78],[58,80],[44,84],[8,22],[56,56],[46,64],[34,40],[92,30],[54,14],[8,16]],
   center:[[50,92],[70,30],[38,84],[62,84],[30,30],[60,56],[50,66],[40,56],[88,24],[50,12],[12,24]]
 },
 '3-4-2-1':{
   left:[[50,92],[62,80],[48,84],[34,80],[72,60],[56,58],[40,64],[8,24],[34,32],[52,40],[56,12]],
   center:[[50,92],[72,82],[50,86],[28,82],[88,44],[60,60],[38,60],[12,44],[40,28],[60,28],[50,12]]
 }
};
function dirOf(t){ return S.dir[t]||'bal'; }
function setDir(team,v){
  S.dir[team]= DIRS.indexOf(v)>=0?v:'bal';
  renderAll(); save();
}
/* 把方向套到坐标上：左路用左倾表，右路左右镜像，中路用 2-3-5 表 */
function applyDir(slots,form,dir){
  if(!dir||dir==='bal') return slots;
  var tbl=DIR_SHAPE[form];
  if(!tbl) return slots;
  var base = dir==='center' ? tbl.center : tbl.left;
  if(!base) return slots;
  return slots.map(function(sl,i){
    var xy=base[i]; if(!xy) return sl;
    var x = dir==='right' ? 100-xy[0] : xy[0];
    return [sl[0], x, xy[1]];
  });
}
var ADJ={RB:['RWB','CB','RM','LB'],LB:['LWB','CB','LM','RB'],RWB:['RB','RM','RW'],LWB:['LB','LM','LW'],
  CB:['DM','RB','LB'],DM:['CM','CB'],CM:['DM','AM'],AM:['CM','RW','LW','ST'],
  RW:['LW','AM','RWB','RM'],LW:['RW','AM','LWB','LM'],ST:['AM','RW','LW'],RM:['RW','RB'],LM:['LW','LB','GK']};
var GRP={GK:'门',RB:'卫',CB:'卫',LB:'卫',RWB:'卫',LWB:'卫',DM:'中',CM:'中',AM:'中',RM:'中',LM:'中',RW:'锋',LW:'锋',ST:'锋'};

/* ---------------- L3 比赛态 ---------------- */
var S={home:'曼联',away:'曼城',minute:0,hs:0,as:0,
       lineup:{},status:{},events:[],lastDiff:null,snap:null,
       tactic:{},poss:{},subMark:{},dir:{},weather:'dry',
       play:{},possRate:{},confirmed:null,bench:{},snaps:[],
       boardPos:{},oral:''};   /* 问题六：自由站位分区；问题二：口述站位情报 */
function taxOf(t){ return S.tactic[t]||'bal'; }
function possOn(t){ return !!S.poss[t]; }
function setTax(team,v){ S.tactic[team]=v; renderAll(); }
function setWeather(w){ S.weather=(w==='rain'?'rain':'dry'); renderAll(); renderSetup(); }
/* 战术打法（问题一-4）与控球率（问题一-6） */
var PLAYS=['高位压迫','区域压迫','人盯人','低位防守','防守反击','控球推进','长传冲吊','快速通过中场'];
function playOf(t){ return S.play[t]||''; }
function setPlay(team,v){
  if(S.play[team]===v) delete S.play[team]; else S.play[team]=v;
  renderAll(); save();
}
function possRateOf(t){ return (S.possRate[t]==null?50:S.possRate[t]); }
function setPossRate(team,v){
  var x=Math.max(20,Math.min(80,Number(v)||50));
  /* 问题十：键=队名，两队相加恒为 100 */
  var other=(team===S.home)?S.away:S.home;
  S.possRate[team]=x;
  S.possRate[other]=100-x;
  renderAll(); save();
}
/* 赛前确认（问题一-7：确定首发 → 独立赛前分析） */
function confirmXI(){
  var h=(S.lineup[S.home]||[]).slice(), a=(S.lineup[S.away]||[]).slice();
  if(h.filter(Boolean).length<11||a.filter(Boolean).length<11){ S.preErr='双方首发都满 11 人才能生成赛前分析'; renderSetup(); return; }
  S.preErr='';
  S.confirmed={h:h,a:a,home:S.home,away:S.away,formH:formOf(S.home),formA:formOf(S.away),ts:Date.now()};
  save(); renderSetup(); renderAll(); switchTab('analysis');
  if(window.aiRunPrematch) aiRunPrematch(true);
}
var KEEP={};
var SHAPES={'3-1-6':'atk','5-4-1':'def'};
function toggleShape(team,shape){
  var cur=formOf(team);
  if(cur===shape){
    var k=KEEP[team]||{};
    FORM_SEL[team]=k.form||(PREFERRED[team]?PREFERRED[team].form:'4-2-3-1');
    changeForm(team,FORM_SEL[team]);
    if(k.lineup) S.lineup[team]=k.lineup.slice();
    if(k.tactic) S.tactic[team]=k.tactic;
    delete KEEP[team];
    renderAll();
    return;
  }
  var base=KEEP[team];
  if(cur==='3-1-6'||cur==='5-4-1'){
    if(!base) base={form:(PREFERRED[team]?PREFERRED[team].form:'4-2-3-1')};
    FORM_SEL[team]=base.form;
    if(base.lineup) S.lineup[team]=base.lineup.slice();
    if(base.tactic) S.tactic[team]=base.tactic;
  }else{
    KEEP[team]={form:cur,lineup:(S.lineup[team]||[]).slice(),tactic:taxOf(team)};
  }
  changeForm(team,shape,true);
  if(shape==='5-4-1') S.poss[team]=false;
  if(SHAPES[shape]) S.tactic[team]=SHAPES[shape];
  renderAll();
}
function toggleDesperate(team){ toggleShape(team,'3-1-6'); }
function toggleLead(team){ toggleShape(team,'5-4-1'); }
function togglePoss(team){ S.poss[team]=!S.poss[team]; renderAll(); }

function formOf(name){
  if(FORM_SEL[name]) return FORM_SEL[name];
  if(FORM_OVERRIDE[name]) return FORM_OVERRIDE[name];
  var t=CARD[name]; if(!t) return '4-2-3-1';
  var m=(t.sys||'').match(/(\d(?:-\d){1,3})/); return m?m[1]:'4-2-3-1';
}
function resetSquad(){
  /* 先清阵型选择再排人：否则 autoLineup 会按旧阵型（如 5-4-1）选人，再套进新阵型槽位 */
  FORM_SEL={};
  S.lineup[S.home]=autoLineup(S.home); S.lineup[S.away]=autoLineup(S.away);
  S.status={}; S.events=[]; S.subMark={}; S.confirmed=null; S.minute=0; S.hs=0; S.as=0;
  /* 问题九：战术设置一并恢复原样（姿态/主攻/打法/控球率/形态） */
  S.tactic={}; S.poss={}; S.dir={}; S.play={}; S.possRate={}; KEEP={}; S.snaps=[];
  S.lastDiff=null;
  S.snap={h:metrics(S.lineup[S.home]),a:metrics(S.lineup[S.away])};
  renderAll(); renderSetup(); save();
}
/* 主帅名册：data/coaches.js 为单一数据源；用户在「🛡 主帅核对」里手填的写本机 COACH_FIX 层 */
var COACH_FIX={};
try{ COACH_FIX=JSON.parse(localStorage.getItem('tb_coach_fix')||'{}'); }catch(e){ COACH_FIX={}; }
function coachSaveFix(t,n,since){
  if(!t) return;
  if(n&&String(n).trim()){ COACH_FIX[t]={n:String(n).trim(),since:String(since||''),ts:Date.now()}; }
  else delete COACH_FIX[t];
  try{ localStorage.setItem('tb_coach_fix',JSON.stringify(COACH_FIX)); }catch(e){}
}
/* 返回 {n,st,since,src}；st: ok=已核对 infer=待确认 none=未核实 */
function coachMeta(t){
  var f=COACH_FIX[t];
  if(f&&f.n) return {n:f.n,st:'ok',since:f.since||'',src:'你手动核对'};
  var c=window.TB_COACHES&&window.TB_COACHES[t];
  if(c) return {n:c.n||'',st:c.n?(c.st||'ok'):'none',since:c.since||'',src:c.src||''};
  var card=CARD[t];
  if(card&&card.mgr) return {n:card.mgr,st:'infer',since:'',src:'旧版引擎教练卡'};
  if(SQUADS_ALL[t]&&SQUADS_ALL[t].coach) return {n:SQUADS_ALL[t].coach,st:'infer',since:'',src:'名单数据'};
  return {n:'',st:'none',since:'',src:'未核实'};
}
function coachOf(t){
  if(PROFILE[t]&&PROFILE[t].coach) return PROFILE[t].coach;
  var m=coachMeta(t);
  return m.n||'未核实（可在教练卡里填）';
}
/* 小徽标：待确认 / 未核实 才显示，已核对不打扰 */
function coachTag(t){
  var m=coachMeta(t); if(m.st==='ok') return '';
  var txt=m.st==='none'?'待补':'待确认';
  return ' <span class="ctag" title="'+esc(m.src||'')+'">'+txt+'</span>';
}
function coachPendingCount(){
  return (typeof TEAMS!=='undefined'?TEAMS:[]).filter(function(t){ return coachMeta(t).st!=='ok'; }).length;
}
function styleOf(name){
  var base=DNA[name]||DNA_DEFAULT;
  var fix=STYLE_FIX[name];
  return fix?Object.assign({},base,fix):Object.assign({},base);
}
function styleLabel(v){
  return v>=3?'摆低位':v===2?'中位块':'主动出击';
}
/* ---------------- 阵容 ---------------- */
function hurt(p){ return !!(p.status&&/伤|报销|停赛/.test(p.status)); }
function sentOff(team,n){ return (S.events||[]).some(function(e){ return e.type==='red'&&e.team===team&&e.who===n; }); }
function yellowed(team,n){ return (S.events||[]).some(function(e){ return e.type==='yellow'&&e.team===team&&e.who===n; }); }
function scoreFor(p,slot){
  var sc=0;
  if(p.pos.indexOf(slot)>=0){ sc+=10; if(p.pos[0]===slot) sc+=3; }
  else if(p.pos.some(function(x){return (ADJ[slot]||[]).indexOf(x)>=0;})) sc+=4;
  else if(p.pos.some(function(x){return GRP[x]===GRP[slot];})) sc+=1;
  else sc-=8;
  if(p.a) sc+=(p.a.sta||70)/25;
  return sc;
}
function autoLineup(team){
  var form=formOf(team), slots=FORMS[form]||FORMS['4-2-3-1'];
  var pref=PREFERRED[team];
  if(pref&&pref.form===form&&pref.xi.length===slots.length&&
     pref.xi.every(function(n){return byName[n]&&norm(byName[n].club)===team;})) return pref.xi.slice();
  var list=(POOL[team]||[]).filter(function(p){return !hurt(p);}).slice()
    .sort(function(a,b){return (b.a?1:0)-(a.a?1:0);});
  if(list.length<11) list=(POOL[team]||[]).slice();
  var used={},out=[];
  slots.forEach(function(sl){
    var best=null,bs=-99;
    list.forEach(function(p){ if(used[p.n])return; var sc=scoreFor(p,sl[0]);
      if(sc>bs){bs=sc;best=p;} });
    if(best&&bs>0){used[best.n]=1;out.push(best.n);} else out.push(null);
  });
  return out;
}
function repairLineup(team){
  var form=formOf(team), slots=FORMS[form]; if(!slots) return;
  var raw=S.lineup[team]||[], pool=(POOL[team]||[]).filter(function(p){return !hurt(p);});
  var redSlots=[]; /* 问题五：红牌不再清空位置，球员留场显示标记 */
  var used={}, out=slots.map(function(sl,i){
    var n=raw[i], p=n?byName[n]:null;
    if(p&&norm(p.club)===team&&!hurt(p)&&!used[p.n]){ used[p.n]=1; return p.n; }
    return null;
  });
  var pref=PREFERRED[team];
  out=out.map(function(n,i){
    if(n) return n;
    var slot=slots[i][0], cand=null;
    if(pref&&pref.form===form){
      var pp=byName[pref.xi[i]];
      if(pp&&norm(pp.club)===team&&!hurt(pp)&&!used[pp.n]) cand=pp;
    }
    if(!cand){
      var best=null,bs=-99;
      pool.forEach(function(p){ if(used[p.n])return; var sc=scoreFor(p,slot); if(sc>bs){bs=sc;best=p;} });
      if(best&&bs>0) cand=best;
    }
    if(cand){ used[cand.n]=1; return cand.n; }
    return null;
  });
  S.lineup[team]=out;
}
function repairLineups(){ Object.keys(POOL).forEach(function(t){ repairLineup(t); }); }
function changeForm(team,form,keepAll){
  if(!FORMS[form]) return;
  FORM_SEL[team]=form;
  var slots=FORMS[form];
  var keep=(S.lineup[team]||[]).filter(Boolean).map(function(n){return byName[n];}).filter(Boolean);
  if(keepAll){
    /* 问题十七：赛中变阵保留首发 11 人原样（只是站位坐标变化，不换人） */
    var lu=S.lineup[team]||[];
    S.lineup[team]=slots.map(function(sl,i){ return lu[i]||null; });
    return;
  }
  var all=(POOL[team]||[]).filter(function(p){return !hurt(p);});
  var used={},out=[];
  slots.forEach(function(sl){
    var kb=-99,keepBest=null;
    keep.forEach(function(p){ if(used[p.n])return; var sc=scoreFor(p,sl[0]);
      if(sc>kb){kb=sc;keepBest=p;} });
    var pb=-99,poolBest=null;
    all.forEach(function(p){ if(used[p.n])return; var sc=scoreFor(p,sl[0]);
      if(sc>pb){pb=sc;poolBest=p;} });
    var best=keepBest,bs=kb;
    if(poolBest&&pb>kb+1){best=poolBest;bs=pb;}
    if(best&&bs>0){used[best.n]=1;out.push(best.n);} else out.push(null);
  });
  S.lineup[team]=out;
  log('form',team,form);
  S.lastDiff=null;
  renderAll(); save();
}

/* ---------------- 指标 ---------------- */
var TG=function(p){return p.tags||[];};
function hasT(p,arr){ if(!p) return false; return arr.some(function(t){return TG(p).indexOf(t)>=0;}); }
function stOf(n){ return S.status[n]||'ok'; }
var STMOD={hot:{wing:1,mid:1,behind:1},ok:{},low:{wing:-1,mid:-1,behind:-1},
           inj:{air:-1,mid:-1},yellow:{def:-1,wing:-1},
           out:{def:-3,wing:-3,mid:-3,behind:-3,air:-3}};
function metrics(names){
  var m={wing:0,mid:0,behind:0,air:0,build:0,press:0,def:0};
  (names||[]).filter(Boolean).forEach(function(n){
    var p=byName[n]; if(!p) return;
    var mod=STMOD[stOf(n)]||{};
    if(hasT(p,['逆足内切','顺足下底'])) m.wing+=2+(mod.wing||0);
    if(hasT(p,['内锋','翼卫'])) m.wing+=1;
    if(hasT(p,['破坏型','B2B'])) m.mid+=2+(mod.mid||0);
    if(hasT(p,['组织8','拖后组织','节拍器','现代10','自由10','伪10'])) m.mid+=1+(mod.mid||0);
    if(hasT(p,['逼抢9','全能9','抢点型'])) m.behind+=1+(mod.behind||0);
    if(/爆点|速度|冲击|反击|突/.test(p.st||'')) m.behind+=1+(mod.behind||0);
    if(p.a&&p.a.air) m.air+=p.a.air/10+(mod.air||0);
    else if(hasT(p,['争顶型','支点'])) m.air+=7+(mod.air||0);
    if(hasT(p,['出球型','拖后组织','清球型','节拍器'])) m.build+=1;
    if(hasT(p,['破坏型','逼抢9','B2B'])) m.press+=1;
    var g0=(p.pos||[])[0];
    if(GRP[g0]==='卫'){ m.def+=1+(mod.def||0); if(hasT(p,['上抢型','对抗型','回追型','套边型'])) m.def+=1; }
  });
  return m;
}
function airOf(p){
  if(p.a&&p.a.air) return p.a.air/10;
  if(hasT(p,['争顶型'])) return 8.5;
  if(hasT(p,['支点'])) return 7.5;
  return 4;
}
function slotMap(lineup,form){
  var slots=FORMS[form]||FORMS['4-2-3-1'],o={};
  (lineup||[]).forEach(function(n,i){ if(n&&slots[i]) (o[slots[i][0]]=o[slots[i][0]]||[]).push(n); });
  return o;
}


/* ---------------- 术语词典（白话版） ---------------- */
var TERMS={
 '弧顶':{d:'禁区前面那条弧线的正中央。这里是远射最舒服的位置，也是后腰必须站住的地方——没人站，对面就能随便远射。',pos:'禁区正前方',ex:'曼联被远射打穿，基本都是弧顶没人。'},
 '肋部':{d:'中卫和边后卫之间那条竖着的缝。既不算边路也不算中路，是防守最难受的地方——两个人都会以为"这是他的"。',pos:'禁区两侧的斜向区域',ex:'边锋内切就是往肋部钻。'},
 '半空间':{d:'就是肋部，同一个东西的不同叫法。',pos:'同肋部',ex:'—'},
 '逆足':{d:'右脚球员踢左边、左脚球员踢右边。好处是内切射门顺脚，坏处是下底传中要用非惯用脚。',pos:'边路',ex:'姆贝乌莫左脚踢右路=逆足。'},
 '逆足内切':{d:'逆足球员拿球后往球场中间切，寻找射门角度。防守方最怕这个，因为你以为他会下底。',pos:'禁区角',ex:'萨拉赫、姆贝乌莫的招牌。'},
 '顺足下底':{d:'右脚球员在右路往底线走，然后用惯用脚传中。传统边锋打法。',pos:'底线附近',ex:'多库。'},
 '套边':{d:'边后卫从边锋的外侧绕过去插上，形成二打一。英文 overlap。',pos:'边线外侧',ex:'达洛特压上就是套边。'},
 '内收':{d:'边后卫不站边线，往中路站，变成中场人数优势。曼城、阿森纳最爱这么踢。',pos:'中场偏边',ex:'里科·刘易斯内收。'},
 '低位块':{d:'全队退到自家半场，排成两条横线，把中路堵死，让对手在外围倒脚。也叫"摆大巴"。',pos:'自家禁区前沿',ex:'诺丁汉森林的标准打法。'},
 '高位压迫':{d:'在对方半场就开始抢，不让对手舒服出球。费体力，但抢下来就是单刀。',pos:'对方禁区到中场',ex:'利物浦、布莱顿。'},
 '转换':{d:'抢断成功或丢球后那 3–5 秒。全队攻守角色瞬间对调，是一场比赛最容易进球也最容易丢球的时刻。',pos:'全场',ex:'"被打转换"= 你刚压上去，球丢了，身后一片空。'},
 '反抢':{d:'丢球后不退回防守，而是立刻在原地抢回来。克洛普、瓜迪奥拉都强调这个。',pos:'丢球点附近',ex:'—'},
 '第二落点':{d:'第一点头球或解围之后，球落到哪、谁抢到。这个比第一点更决定比赛。',pos:'禁区前沿、中场',ex:'"抢第二落点"= 混战里谁更凶。'},
 '支点':{d:'中锋背对球门拿球，用身体挡住后卫，把球做给队友。作用像墙。',pos:'中圈到禁区之间',ex:'谢什科就是支点型。'},
 '伪9':{d:'中锋不回禁区，反而回撤到中场拿球，把对方中卫引出来，给队友制造身后空间。',pos:'中场偏前',ex:'齐尔克泽、菲尔米诺。'},
 'B2B':{d:'box-to-box，两个禁区之间来回跑的中场。既能抢又能插上。',pos:'全场',ex:'巴莱巴、B费回撤时都算。'},
 '6号位':{d:'后腰。站在后卫线前面，负责拦截和出球。',pos:'中圈后方',ex:'巴莱巴。'},
 '8号位':{d:'中场，介于后腰和前腰之间，要能跑、能传、能插上。',pos:'中场',ex:'蒂勒曼斯、梅努。'},
 '10号位':{d:'前腰。负责最后一传和创造力。',pos:'对方禁区弧顶',ex:'B费。'},
 '3-2-5':{d:'有球进攻时的站位：3 个后卫 + 2 个后腰 + 5 个人压在前场。现代控球队的标准形状。',pos:'全场',ex:'曼联有球形态就是这个。'},
 '出球':{d:'从后场把球传出去，突破对方的第一道压迫。英文 build-up。',pos:'自家禁区到中场',ex:'出球被锁死，就只能开大脚。'},
 '制空':{d:'高空球的争顶能力。角球、任意球、长传都靠这个。',pos:'禁区',ex:'马奎尔制空 90。'},
 '定位球':{d:'角球、任意球、界外球这类"死球"机会。英超三成进球来自定位球。',pos:'全场',ex:'阿森纳是英超定位球第一。'},
 '弱侧':{d:'球不在的那一边。进攻时把球转到弱侧，往往能打对手一个措手不及。',pos:'球场的另一边',ex:'—'},
 '二点球':{d:'同"第二落点"。',pos:'—',ex:'—'},
 '双后腰':{d:'两个后腰并排站。防守更稳，但进攻人数会少一个。',pos:'中圈后方',ex:'4-2-3-1 的基础。'},
 '边翼卫':{d:'三中卫体系里负责整条边路的人，既要防守也要进攻，跑动量最大。',pos:'边线',ex:'多古、达洛特在三中卫里就是翼卫。'},
 '直塞':{d:'贴着地面、穿过防线缝隙的传球，直接给到身后的队友。',pos:'防线身后',ex:'B费的招牌。'},
 '对抗':{d:'身体接触时的强度。英超最看重这个。',pos:'全场',ex:'—'},
 '禁区六码区':{d:'门将前面那块小禁区，抢点最危险的位置。',pos:'球门前',ex:'—'}
};

/* ---------------- 分析 ---------------- */
var STMARK={hot:'🔥',low:'😑',inj:'🤕',yellow:'🟨',out:'⛔',red:'🟥'};
function mk(n){ return STMARK[stOf(n)]||''; }
function statusLine(n){
  var s=stOf(n); var p=byName[n];
  if(!p||s==='ok') return '';
  if(s==='yellow') return `（${p.n} 已吃黄牌，防守动作会收）`;
  if(s==='inj') return `（${p.n} 带伤，覆盖面积下降）`;
  if(s==='low') return `（${p.n} 状态低迷）`;
  if(s==='hot') return `（${p.n} 状态火爆）`;
  return '';
}


/* ---------------- 可信度标签 ---------------- */
var CONF={fact:['确定','#23c55e'],infer:['推断','#f0b429'],guess:['待确认','#e2383f']};
function confTag(c){ var d=CONF[c]||CONF.infer;
  return '<span class="cf" style="color:'+d[1]+';border-color:'+d[1]+'55;background:'+d[1]+'1a">'+d[0]+'</span>'; }
function infoTag(t){ return '<span class="cf" style="color:#93a0af;border-color:#93a0af55;background:#93a0af1a">'+t+'</span>'; }

/* ---------------- 术语 ---------------- */
var MIDSLOTS=['DM','CM','AM','RM','LM'];
function midCnt(t){ var m=slotMap(S.lineup[t]||[],formOf(t));
  return MIDSLOTS.reduce(function(n,k){return n+(m[k]||[]).length;},0); }
function midsOf(t){
  var f=formOf(t), m=slotMap(S.lineup[t]||[],f), out=[];
  MIDSLOTS.forEach(function(k){ if(m[k]) out=out.concat(m[k]); });
  return out.length?out.join('、'):'—';
}
function rbOf(t){ var m=slotMap(S.lineup[t]||[],formOf(t)); return (m.RB||m.RWB||[])[0]; }
function lwOf(t){ var m=slotMap(S.lineup[t]||[],formOf(t)); return (m.LW||m.LM||[])[0]; }
function openTerm(name){
  var t=TERMS[name]; if(!t) return;
  $('#sheet').innerHTML=`<div class="sheetIn"><div class="sh"><b>${esc(name)}</b>
    <button class="x" onclick="closeSheet()">✕</button></div>
    <div class="at" style="margin:6px 0 10px">${esc(t.d)}</div>
    <div class="ae" style="border-top:1px dashed #ffffff14;margin-top:0">
      一般在哪：${esc(t.pos)}<br>举个例子：${esc(t.ex)}</div></div>`;
  $('#sheet').classList.add('on');
}
function openTermsAll(){
  var keys=Object.keys(TERMS).sort();
  $('#sheet').innerHTML=`<div class="sheetIn"><div class="sh"><b>术语表 · ${keys.length} 条</b>
    <button class="x" onclick="closeSheet()">✕</button></div><div class="plist">
    ${keys.map(function(k){return `<button class="pr" data-term="${esc(k)}">
      <span><b>${esc(k)}</b> <i class="mut">${esc(TERMS[k].d.slice(0,24))}…</i></span></button>`;}).join('')}
    </div></div>`;
  $('#sheet').classList.add('on');
}

/* ---------------- 比赛形势（比分 × 时间） ---------------- */
function benchOf(team){
  var lu=S.lineup[team]||[];
  return (POOL[team]||[]).filter(function(p){ return lu.indexOf(p.n)<0 && !hurt(p); });
}
function scoreCard(){
  var m=S.minute, d=S.hs-S.as;
  if(m<1&&d===0) return '';
  var lvl=0,txt='',hint='',benchTip='';
  if(d===0){
    if(m<45) txt=`上半场 ${S.hs}:${S.as} 僵局。最忌讳先变阵——谁先动结构，谁先露出空当。`;
    else if(m<75) txt=`${m}' 仍是 ${S.hs}:${S.as}。换人要换「类型」而不是换「人」：先解决被打穿的那条边，别动中场配比。`;
    else txt=`${m}' 还在平局，时间不多了：想要 3 分就得冒险压上，想稳 1 分就守住弧顶。二选一，别夹在中间。`;
    hint='平局时的换人应该有明确目的：加强压迫 / 加强控球 / 保住平局，只选一个。';
  }else if(d>0){
    if(m<60) txt=`领先 ${d} 球但时间还早，别急着收——收太早等于把球权交出去。先换体能，别动结构。`;
    else if(m<80) txt=`领先 ${d} 球、${m}'：开始做减法。换下一个前锋或一个自由人，上一个破坏型 6，把防线压到中场线以下。`;
    else { txt=`领先 ${d} 球、${m}'，该收了：能换的全换防守型，前场只留一个能反击的点。`; lvl=1; }
    hint='领先时要保住的是「弧顶」和「第二落点」，不是控球率。';
  }else{
    if(m<55) txt=`落后 ${-d} 球，先别慌——确认是不是被同一条边打了三次以上，那才是根因。`;
    else if(m<80){ txt=`落后 ${-d} 球、${m}'，该动了：换一个能打身后的，或把双后腰之一换成组织点，把进攻方向变直。`; lvl=1; }
    else { txt=`落后 ${-d} 球、${m}'，必须压：${formOf(S.home)==='3-1-6'?'已经是搏命形态了，那就只剩一件事——把球往禁区里砸。':'可以直接切「搏命 3-1-6」：三中卫 + 单后腰 + 6 人压上。'}`; lvl=2; }
    hint='落后时最值钱的是「身后威胁」，不是再堆一个组织手。';
    var bench=benchOf(S.home).filter(function(p){
      return /爆点|速度|冲击|身后|突/.test(p.st||'')||hasT(p,['逆足内切']);});
    if(bench.length) benchTip='替补席上有 '+bench.slice(0,3).map(function(p){return p.n;}).join('、')+' —— 这类才是落后时该上的。';
  }
  return `<div class="ac l${lvl}"><div class="ah"><span class="tag">比赛形势</span>
    <span class="lv">${m}' · ${S.home} ${S.hs}:${S.as} ${S.away}${confTag('infer')}</span></div>
    <div class="at">${txt}${benchTip?'<br><span class="mut">'+benchTip+'</span>':''}</div>
    <div class="pl"><b>人话：</b>现在这个比分和时间段，该攻还是该守。</div>
    <div class="ae">${hint}</div></div>`;
}

/* ---------------- 赛中复盘 ---------------- */
function phaseCard(hm,am){
  if(!S.snap||S.minute<1) return '';
  var keys=[['wing','边路威胁'],['mid','中场控制'],['def','防线质量'],['behind','身后威胁'],['air','制空'],['build','出球质量']];
  var rows=keys.map(function(k){ return [k[1], hm[k[0]]-S.snap.h[k[0]], am[k[0]]-S.snap.a[k[0]] ]; })
    .filter(function(x){ return Math.abs(x[1])>=1||Math.abs(x[2])>=1; })
    .sort(function(a,b){ return Math.abs(b[1])+Math.abs(b[2])-(Math.abs(a[1])+Math.abs(a[2])); }).slice(0,3);
  var subs=S.events.filter(function(e){return e.type==='sub'&&e.min>0;}).length;
  var body=rows.length? rows.map(function(x){
        var hc=x[1]>0?'#23c55e':(x[1]<0?'#e2383f':'#93a0af');
      var ac=x[2]>0?'#23c55e':(x[2]<0?'#e2383f':'#93a0af');
      return `${x[0]} ${S.home} <b style="color:${hc}">${x[1]>0?'+':''}${x[1].toFixed(0)}</b> / ${S.away} <b style="color:${ac}">${x[2]>0?'+':''}${x[2].toFixed(0)}</b>`;
    }).join('　') : '结构没有明显变化';
  return `<div class="ac l1"><div class="ah"><span class="tag">${S.minute}' 复盘</span>
    <span class="lv">${subs} 次换人${confTag('fact')}</span></div>
    <div class="at">${body}</div>
    <div class="pl"><b>人话：</b>从开场到现在，球队这几项能力哪项变强了、哪项掉了。</div>
    <div class="ae">当前结构：边路 ${hm.wing} · 中场 ${hm.mid} · 防线 ${hm.def} · 制空 ${hm.air.toFixed(0)} · 出球 ${hm.build}<br>
      相对开球时的变化，正值=变强，负值=被削弱。</div></div>`;
}


/* ===== 时间切片快照卡（问题十八） ===== */
function snapsCard(){
  if(!S.snaps.length) return '';
  var keys=[['wing','边路'],['mid','中场'],['def','防线'],['behind','身后'],['air','制空'],['build','出球']];
  var items=S.snaps.slice().sort(function(a,b){return a.min-b.min;}).map(function(x,i,arr){
    var prev=i>0?arr[i-1]:null;
    var trend=keys.map(function(k){
      if(!prev) return null;
      var d=x.m[k[0]]-prev.m[k[0]];
      if(Math.abs(d)<0.5) return k[1]+'→';
      return k[1]+(d>0?'↑':'↓');
    }).filter(Boolean).join(' ');
    var score=x.hs+':'+x.as;
    return '<details style="margin:4px 0"><summary style="cursor:pointer;font-size:12.5px">'
      +'<b>'+x.min+'\'</b> '+score+'（'+esc(x.formH)+' vs '+esc(x.formA)+'）'
      +(prev?' <span class="mut">'+trend+'</span>':' <span class="mut">基线</span>')+'</summary>'
      +'<div style="padding:4px 2px">'
      +'<div class="hintline">'+keys.map(function(k){ return k[1]+' '+x.m[k[0]].toFixed(0); }).join(' · ')+'</div>'
      +'<input class="ctext" placeholder="这一段的战术备注（会作为 AI 分析上下文）" value="'+esc(x.note)+'" data-snapnote="'+x.min+'">'
      +'</div></details>';
  }).join('');
  return '<details class="tlcard"><summary>时间切片快照（'+S.snaps.length+' 个节点 · 指标趋势+备注进 AI）</summary>'
    +'<div style="padding:4px 12px 10px">'+items+'</div></details>';
}

function timelineCard(){
  var has=S.events.length;
  var items=has?S.events.slice().reverse().map(function(e){
    if(e.type==='sub') return `<div class="tl"><b>${e.min}'</b> ${esc(e.team)} <span class="mut">${esc(e.out)} → ${esc(e.in)}</span></div>`;
    return `<div class="tl"><b>${e.min}'</b> ${esc(e.team)} <span class="mut">${esc(e.who)} 标记 ${e.mark}</span></div>`;
  }).join(''):'还没有记录。去「排阵」页点场上球员换人或标状态，这里按分钟记录。';
  return `<details class="tlcard"${has?' open':''}><summary>比赛进程（含换人）${has?' · '+S.events.length+' 条':''}</summary>
    <div class="tlc" style="padding:4px 12px 10px">${items}</div></details>`;
}


/* ---------------- 换人诊断 ---------------- */
function rolesOf(p){
  if(!p) return '—';
  var t=[];
  if(hasT(p,['逆足内切','顺足下底','内锋','翼卫'])) t.push('边路');
  if(hasT(p,['破坏型','B2B','组织8','拖后组织','节拍器','现代10','自由10','伪10'])) t.push('中场');
  if(hasT(p,['支点','抢点型','逼抢9','全能9','伪9'])) t.push('锋线');
  if(hasT(p,['套边型','上抢型','拖后型','回追型','左脚中卫','清球型'])) t.push('防线');
  if(hasT(p,['出球型','拖后组织'])) t.push('出球');
  return t.length?t.join('/'):'—';
}
function intentOf(p){
  if(!p) return [];
  var out=[], st=p.st||'';
  if(hasT(p,['支点'])) out.push('加高点：改打边路传中和定位球');
  if(hasT(p,['逆足内切','内锋'])||/内切/.test(st)) out.push('加内切一对一，吃对方边后卫的内线');
  if(/爆点|速度|冲击|身后|突|快马/.test(st)) out.push('加速度/身后：把进攻变直，不再磨阵地');
  if(hasT(p,['破坏型','B2B','逼抢9'])||/抢断|扫荡|绞杀|拦截/.test(st)) out.push('加强反抢：压缩对方出球时间，把比赛拉回中场');
  if(hasT(p,['组织8','拖后组织','节拍器','现代10'])||/组织|调度|节拍/.test(st)) out.push('加控球：降节奏，把球留在自己脚下');
  if(hasT(p,['套边型','翼卫'])) out.push('加边路宽度：拉开对方防线，给肋部腾空间');
  if(hasT(p,['抢点型'])) out.push('加禁区抢点：不再追求过程，直接冲六码区');
  if(hasT(p,['伪10','自由10'])||/盘带|魔术|创造力|最后一传|想象力/.test(st)) out.push('加一个能改变节奏的自由人：多一种"最后一传"的可能');
  if(hasT(p,['左脚中卫','拖后型','回追型','清球型','门线型'])) out.push('补防线：保平 / 守住领先');
  if(!out.length){
    var g=GRP[(p.pos||[])[0]];
    out.push(g==='锋'?'换一个进攻点：换的是「类型」，不是「体能」'
      :g==='中'?'调整中场配比：要么加控球，要么加拦截'
      :'补防线轮换，先把结构保住');
  }
  return out.slice(0,3);
}
function impactOf(inP,team){
  if(!inP) return '';
  var opp=team===S.home?S.away:S.home;
  var f=formOf(opp), m=slotMap(S.lineup[opp]||[],f);
  if(hasT(inP,['支点','抢点型'])) return `对面中卫（${(m.CB||[]).join('+')||'—'}）要开始把注意力放在第一落点，别被拉出来。`;
  if(hasT(inP,['逆足内切','内锋'])||/爆点|速度/.test(inP.st||'')) return `正对你的边后卫（${(m.LB||[]).concat(m.RB||[]).join('/')||'—'}）：他会吃一对一，需要有人协防内线。`;
  if(hasT(inP,['破坏型','B2B','逼抢9'])) return `你们的中场出球会被压：${(m.CM||[]).concat(m.DM||[]).join('/')||'—'} 接球前先看身后。`;
  if(hasT(inP,['组织8','拖后组织','节拍器'])) return '球权会更多地停在他脚下，逼抢要提上去，别让他抬头。';
  if(hasT(inP,['套边型','翼卫'])) return '边路会被拉开，肋部会空出来，注意后插上的人。';
  if(hasT(inP,['伪10','自由10'])||/盘带|魔术|最后一传/.test(inP.st||'')) return '他会在肋部接球，你们的中场和边后卫之间会出现空当，得有人盯着他的接球点。';
  var g=GRP[(inP.pos||[])[0]];
  return g==='锋'?'前场多了一个点，你们的后腰回撤要更深。'
    :g==='中'?'中场人数或类型变了，注意中路的第二落点。'
    :'他们开始收结构，进攻要更耐心，别急着传中。';
}
function subCard(){
  var d=S.lastDiff;
  if(!d||!d.out||!d.in) return '';
  var o=byName[d.out], i=byName[d.in];
  var intents=intentOf(i);
  var impact=impactOf(i,d.team);
  return `<div class="ac l1"><div class="ah"><span class="tag">换人诊断 · ${esc(d.team)}</span>
    <span class="lv">${S.minute}'${confTag('infer')}</span></div>
    <div class="at"><b style="color:#ffb4b7">↓ ${esc(d.out)}</b>（${rolesOf(o)}）
      → <b style="color:#8ef0b3">↑ ${esc(d.in)}</b>（${rolesOf(i)}）<br>
      <span class="mut">换下「${esc((o&&o.st)||'')}」，换上「${esc((i&&i.st)||'')}」</span></div>
    ${intents.length?`<div class="ae" style="border-top:0;color:#cdd7e1;padding-top:6px">
      <b>教练可能想：</b><br>${intents.map(function(x,k){return '&nbsp;'+(k+1)+'. '+x;}).join('<br>')}</div>`:''}
    ${impact?`<div class="ae"><b>对你的影响：</b>${esc(impact)}</div>`:''}
    <div class="pl"><b>人话：</b>教练换这个人，是想解决什么问题。</div>
  </div>`;
}

/* ---------------- 渲染 ---------------- */
function $(s){return document.querySelector(s);}
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(m){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m];}); }

function postureSlots(slots,tax){
  if(tax!=='atk'&&tax!=='def') return slots;
  return slots.map(function(sl){
    if(sl[0]==='GK') return sl;
    var g=(sl[0]==='RWB'||sl[0]==='LWB')?'中':GRP[sl[0]];
    var dy=0;
    if(g==='卫') dy=(tax==='atk'?-7:0);
    else if(g==='中') dy=(tax==='atk'?-6:6);
    else if(g==='锋') dy=(tax==='atk'?-3:4);
    return [sl[0],sl[1],Math.max(8,Math.min(86,sl[2]+dy))];
  });
}
function fixGKSlot(team){
  var lu=S.lineup[team]; if(!lu||!lu.length) return;
  var p0=lu[0]?byName[lu[0]]:null;
  if(p0 && (p0.pos||[]).indexOf('GK')>=0) return;
  for(var i=1;i<lu.length;i++){
    var p=lu[i]?byName[lu[i]]:null;
    if(p && (p.pos||[]).indexOf('GK')>=0){
      lu[0]=p.n; lu[i]=p0?p0.n:null; return;
    }
  }
}
var TAC_OPEN={};
function toggleTac(team,on){ TAC_OPEN[team]=on; }
/* ---------------- 对位图：两队摆在**同一块**球场上，面对面 ----------------
   主队进攻朝上（GK 在下方），客队旋转 180° 进攻朝下（GK 在上方）。
   坐标规则：FORMS 里的坐标是「进攻朝上」的基准，客队用 (100-x,100-y) 旋转 180°。 */
var BOARD_MATCH=true;
function toggleMatchLines(){ BOARD_MATCH=!BOARD_MATCH; renderAll(); }
/* 问题三：全屏状态记住，toggle 连线/拖拽后重渲染不再弹回小窗 */
var BOARD_FS=false;
function toggleBoardFull(){
  BOARD_FS=!BOARD_FS;
  var el=document.querySelector('.board');
  if(el){
    el.classList.toggle('fs',BOARD_FS);
    var b=el.querySelector('.boardhd .hbtn.fsbtn');
    if(b) b.textContent=BOARD_FS?'✕ 退出全屏':'⛶ 全屏';
  }
  document.documentElement.classList.toggle('boardfs',BOARD_FS);
}
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape') return;
  var el=document.querySelector('.board.fs');
  if(!el) return;
  toggleBoardFull();
});

/* ===== 问题六：自由站位（九宫格分区 + 拖拽 + AI 读取） =====
   球场按 左/中/右 × 后/中/前 划成九宫格（按各队进攻方向判定：门将侧=后场，对方球门侧=前场）。
   用户把球员拖到某个格子里 = 「他这场的主站位区域」，AI 分析时以此为准（固定阵型坐标只作背景）。 */
var BOARD_DRAG=false;
function toggleBoardDrag(){ BOARD_DRAG=!BOARD_DRAG; renderAll(); }
function boardPosOf(team,who){ return (S.boardPos[team]||{})[who]||null; }
function zoneName(team,x,y){
  var lane = x<33.4?'左路':(x>66.6?'右路':'中路');
  var depth = (team===S.home ? (100-y) : y);   /* 距自家球门的深度 */
  var d = depth<33.4?'后场':(depth<66.6?'中场':'前场');
  return d+lane;
}
function resetBoardPos(){ S.boardPos={}; save(); renderAll(); }
function zonesSummary(team){
  var bp=S.boardPos[team]||{};
  return Object.keys(bp).map(function(n){ return {player:n,zone:zoneName(team,bp[n].x,bp[n].y)}; });
}
/* 拖拽：pointerdown 在棋子上 → pointermove 改 left/top → pointerup 落格 */
var DRAG={active:false};
document.addEventListener('pointermove',function(e){
  if(!DRAG.active) return;
  var pitch=document.querySelector('.boardpitch'); if(!pitch) return;
  var dx=e.clientX-DRAG.startX, dy=e.clientY-DRAG.startY;
  if(!DRAG.moved&&Math.abs(dx)+Math.abs(dy)<4) return;
  DRAG.moved=true; DRAG.el.classList.add('dragging');
  var r=pitch.getBoundingClientRect();
  var x=Math.max(1,Math.min(99,(e.clientX-r.left)/r.width*100));
  var y=Math.max(1,Math.min(99,(e.clientY-r.top)/r.height*100));
  DRAG.el.style.left=x+'%'; DRAG.el.style.top=y+'%';
});
document.addEventListener('pointerup',function(e){
  if(!DRAG.active) return;
  var d=DRAG; DRAG={active:false};
  d.el.classList.remove('dragging');
  if(!d.moved) return;
  var pitch=document.querySelector('.boardpitch'); if(!pitch) return;
  var r=pitch.getBoundingClientRect();
  var x=Math.max(1,Math.min(99,(e.clientX-r.left)/r.width*100));
  var y=Math.max(1,Math.min(99,(e.clientY-r.top)/r.height*100));
  (S.boardPos[d.team]=S.boardPos[d.team]||{})[d.who]={x:Math.round(x*10)/10,y:Math.round(y*10)/10};
  window.__tbDragMoved=true;
  save(); renderAll();
});
function bindBoardDrag(root){
  (root||document).querySelectorAll('.boardpitch .tk.has').forEach(function(el){
    el.addEventListener('pointerdown',function(e){
      if(!BOARD_DRAG) return;
      if(!el.dataset.tname||!el.dataset.tteam) return;
      DRAG={active:true,moved:false,team:el.dataset.tteam,who:el.dataset.tname,el:el,
        startX:e.clientX,startY:e.clientY};
      e.preventDefault();
    });
  });
}
function setOral(v){ S.oral=v; save(); }

function sideSlots(which){
  var team=which==='h'?S.home:S.away;
  var form=formOf(team);
  var base=FORMS[form]||FORMS['4-2-3-1'];
  var slots=applyDir(postureSlots(possOn(team)?(POSS_FORMS[form]||base):base,taxOf(team)),form,dirOf(team));
  var lu=S.lineup[team]||autoLineup(team); S.lineup[team]=lu;
  fixGKSlot(team);
  return slots.map(function(sl,i){
    var n=lu[i], p=n?byName[n]:null;
    var x=sl[1], y=sl[2];
    /* 把「进攻朝上」的整条阵型压进自己这半场：门将 90 → 90，中锋 14 → 52（贴着中线）。
       客队再水平镜像 + 垂直翻转：于是 A 队右翼卫（右侧下半场）正好对着 B 队左后卫（右侧上半场），
       两队前锋面对面站在中圈两侧——一眼看出「谁对位谁」。 */
    var yy=56+(y-14)*0.47;             /* 压进自己半场，中锋停在 56（中线附近） */
    if(sl[0]==='GK') yy=94.5;          /* 门将贴住底线，别和中卫叠在一起 */
    if(sl[0]==='CB'&&Math.abs(x-50)<2) yy-=2;   /* 三中卫的居中中卫上提一点，避免压住门将 */
    if(which==='a'){ x=100-x; yy=100-yy; }
    y=yy;
    /* 问题六：用户拖拽设定过主站位区 → 覆盖坐标 */
    var bp=n?boardPosOf(team,n):null;
    if(bp){ x=bp.x; y=bp.y; }
    return {i:i,code:sl[0],x:Math.round(x*10)/10,y:Math.round(y*10)/10,
      name:p?p.n:'',has:!!p,team:team,status:n?stOf(n):'ok',sub:(n&&S.subMark[n])?S.subMark[n]:0};
  });
}
function tkHtml(t,which){
  var emo=t.has?(STMARK[t.status]||''):'';
  var sub=t.sub?('<u class="sbm">↑'+t.sub+"'</u>"):'';
  var zn=(t.has&&boardPosOf(t.team,t.name))?('<u class="znb">'+esc(zoneName(t.team,t.x,t.y))+'</u>'):'';
  return '<div class="tk '+(t.has?'has':'empty')+'" data-w="'+which+'" data-i="'+t.i+'" data-pos="'+t.code
    +'"'+(t.has?' data-tteam="'+esc(t.team)+'" data-tname="'+esc(t.name)+'"':'')
    +' style="left:'+t.x+'%;top:'+t.y+'%">'
    +'<b>'+(t.has?esc(t.name):t.code)+'</b><i>'+t.code+'</i>'+(emo?'<em>'+emo+'</em>':'')+sub+zn+'</div>';
}
/* 对位连线 v2（问题二重做）：
   ① 门将不连线——门将没有 1v1 对位对象（旧版会把门将连到中卫/边后卫上）；
   ② 按「位置语义」优先：中卫↔中锋、左后卫↔右边锋、后腰↔前腰、中场↔中场、边锋↔边后卫……
      每名对方球员最多被连一条线；语义配不上才退回「最近的外场球员」；
   ③ 这是「开局对位参考」：比赛中随换人/变阵随时失效，不作为 AI 赛中结论的依据。 */
var OPP_POS={
  CB:['ST'], LB:['RW','RM'], RB:['LW','LM'], LWB:['RW','LM'], RWB:['LW','RM'],
  DM:['AM'], CM:['CM','AM'], AM:['DM','CM'], RM:['LB','LWB'], LM:['RB','RWB'],
  LW:['RB','RWB'], RW:['LB','LWB'], ST:['CB']
};
function pairLines(hs,as){
  var usedA={}, out=[], doneH={};
  function pick(h,codes,noCBST,maxD){
    var best=null;
    as.forEach(function(a){
      if(usedA[a.i]||a.code==='GK') return;
      if(codes&&codes.length&&codes.indexOf(a.code)<0) return;
      if(noCBST&&(a.code==='CB'||a.code==='ST')) return;
      var dx=Math.abs(h.x-a.x), dy=Math.abs(h.y-a.y);
      var d=dx*2.2+dy*0.8;
      if(!best||d<best.d) best={h:h,a:a,d:d};
    });
    return (best&&best.d<=(maxD==null?1e9:maxD))?best:null;
  }
  var PRIO={GK:9,CB:7,ST:7,RB:0,LB:0,RWB:0,LWB:0,RW:1,LW:1,RM:1,LM:1,DM:2,CM:3,AM:3};
  var order=hs.slice().sort(function(p,q){ return (PRIO[p.code]||4)-(PRIO[q.code]||4); });
  /* 第一轮：只做位置语义配对（中卫↔中锋、边后卫↔边锋、后腰↔前腰……） */
  order.forEach(function(h){
    if(h.code==='GK'||!h.has) return;
    var b=pick(h,OPP_POS[h.code]||null);
    if(b){ usedA[b.a.i]=1; doneH[h.i]=1; out.push(b); }
  });
  /* 第二轮：没配上语义对手的（阵型错位/人数不等），连最近的外场球员；
     先避开 CB/ST（把中锋-中卫这条线留给真正该对的人），实在没有才放开 */
  order.forEach(function(h){
    if(h.code==='GK'||!h.has||doneH[h.i]) return;
    var b=pick(h,null,true,100)||pick(h,null,false,100);
    if(b){ usedA[b.a.i]=1; out.push(b); }
  });
  return out;
}
function zoneGridSvg(){
  var L=[33.4,66.6],cells='';
  L.forEach(function(v){
    cells+='<line x1="'+v+'" y1="0" x2="'+v+'" y2="100"/>'
      +'<line x1="0" y1="'+v+'" x2="100" y2="'+v+'"/>';
  });
  return '<svg class="zgrid" viewBox="0 0 100 100" preserveAspectRatio="none">'+cells+'</svg>';
}
function boardHtml(){
  var hs=sideSlots('h'), as=sideSlots('a');
  var tok=hs.map(function(t){ return tkHtml(t,'h'); }).join('')
        +as.map(function(t){ return tkHtml(t,'a'); }).join('');
  var lines='';
  if(BOARD_MATCH){
    var ps=pairLines(hs,as);
    lines='<svg class="mlines" viewBox="0 0 100 100" preserveAspectRatio="none">'
      +ps.map(function(p){
        return '<line x1="'+p.h.x+'" y1="'+p.h.y+'" x2="'+p.a.x+'" y2="'+p.a.y+'"/>';
      }).join('')+'</svg>';
  }
  var anyPos=Object.keys(S.boardPos||{}).some(function(t){ return Object.keys(S.boardPos[t]).length; });
  return '<div class="card board'+(BOARD_FS?' fs':'')+'">'
    +'<div class="boardhd"><b>🎯 对位图</b>'
    +'<span class="mut">两队同场：<b style="color:#ff8f95">主队进攻朝上</b> · <b style="color:#8ec1ff">客队进攻朝下</b>。虚线=开局位置对位参考（随比赛变化，不作赛中结论）。</span>'
    +'<button class="hbtn '+(BOARD_MATCH?'on':'')+'" onclick="toggleMatchLines()">'+(BOARD_MATCH?'✓ 对位连线':'对位连线')+'</button>'
    +'<button class="hbtn '+(BOARD_DRAG?'on':'')+'" onclick="toggleBoardDrag()">🖐 自由站位'+(BOARD_DRAG?'中':'')+'</button>'
    +(anyPos?'<button class="hbtn" onclick="resetBoardPos()">↺ 还原站位</button>':'')
    +'<button class="hbtn fsbtn" onclick="toggleBoardFull()">'+(BOARD_FS?'✕ 退出全屏':'⛶ 全屏')+'</button></div>'
    +'<div class="pitch boardpitch'+(BOARD_DRAG?' dragmode':'')+'">'+(BOARD_DRAG?zoneGridSvg():'')+lines
    +'<div class="btag btag-t">'+esc(S.away)+' · 进攻 ↓</div>'
    +'<div class="btag btag-b">'+esc(S.home)+' · 进攻 ↑</div>'
    +tok+'</div>'
    +(BOARD_DRAG?'<div class="zhint">🖐 拖动球员到他的主站位区（九宫格按各队进攻方向判定：靠自家球门=后场，靠对方球门=前场）。松手后格名挂在球员脚下，AI 分析以你拖的区为最高优先级——全屏下拖更准。</div>'
      :'<div class="hint">点球员 → 换人 / 标状态；「🖐 自由站位」可把球员拖进九宫格分区，AI 按你拖的区分析</div>')
    +(anyPos?'<div class="zlist">已设主站位区：'+Object.keys(S.boardPos).map(function(t){
        return zonesSummary(t).map(function(z){ return '<span class="zchip">'+esc(z.player)+'<i>'+esc(z.zone)+'</i></span>'; }).join('');
      }).join('')+'</div>':'')
    +'<div class="oralbox"><div class="lov">🎙 口述站位与场上情报（写在这里的内容=AI 分析的最高优先级现场信息，赛前/赛中分析都会读）</div>'
    +'<textarea class="ctext oralta" data-oral rows="3" placeholder="例：右后卫实际内收当第三后腰；左边锋上半场压得很高、60 分钟后回收；我们弧顶保护总是少一人…">'+esc(S.oral||'')+'</textarea></div>'
    +'</div>';
}

function teamPanel(which){
  var team=which==='h'?S.home:S.away;
  var form=formOf(team);
  var full=(POOL[team]||[]).length;
  var lu=S.lineup[team]||autoLineup(team);
  var starters=lu.filter(Boolean).length;
  var subs=Math.max(0,full-starters);
  var chips=BASE_FORMS.map(function(f){
    return `<button class="fchip ${f===form?'on':''}" data-team="${esc(team)}" data-form="${f}">${f}</button>`;}).join('');
  var tx=taxOf(team);
  var taxRow=`<div class="frow tax">
    <span class="mut" style="font-size:10px;align-self:center">姿态</span>
    <button class="fchip ${tx==='atk'?'on':''}" data-tax="${esc(team)}" data-v="atk">压出去</button>
    <button class="fchip ${tx==='bal'?'on':''}" data-tax="${esc(team)}" data-v="bal">平衡</button>
    <button class="fchip ${tx==='def'?'on':''}" data-tax="${esc(team)}" data-v="def">收回来</button>
    <span class="sep2"></span>
    <button class="fchip ${possOn(team)?'on':''}" data-poss="${esc(team)}">${possOn(team)?'有球形态':'无球形态'}</button>
    <span class="fbrk"></span>
    <button class="fchip lead ${form==='5-4-1'?'on':''}" data-lead="${esc(team)}">守领先 5-4-1</button>
    <button class="fchip desperate ${form==='3-1-6'?'on':''}" data-desp="${esc(team)}">搏命 3-1-6</button>
  </div>`;
  var dirCur=dirOf(team);
  var dirRow=`<div class="frow tax dirrow">
    <span class="mut" style="font-size:10px;align-self:center">主攻</span>
    ${DIRS.map(function(k){ return `<button class="fchip ${dirCur===k?'on':''}" data-dir="${esc(team)}" data-v="${k}">${DIR_NAME[k]}</button>`; }).join('')}
  </div>`;
  var pc=playOf(team);
  var playRow=`<div class="frow tax">
    <span class="mut" style="font-size:10px;align-self:center">打法</span>
    ${PLAYS.map(function(k){ return `<button class="fchip playchip ${pc===k?'on':''}" data-play="${esc(team)}" data-v="${k}">${k}</button>`; }).join('')}
  </div>`;
  var pr=possRateOf(team);
  var possRow=`<div class="possRow"><span class="mut" style="font-size:10px">控球率预期</span>
    <input type="range" min="20" max="80" step="5" value="${pr}" data-possr="${esc(team)}">
    <span class="pv">${pr}% 左右</span></div>`;
  return `<div class="pitchwrap">
    <div class="phead"><span class="dot" style="background:${which==='h'?'#e2383f':'#4ea1ff'}"></span>
      <b>${esc(team)}</b>
      <span class="mut">${esc(coachOf(team))}${coachTag(team)} · ${full} 人库 · 首发 ${starters} · 替补 ${subs}${full<11?' <b style="color:#f0b429">数据不足</b>':''}</span>
      <button class="hbtn" data-bench="${esc(team)}">替补席</button>
      <button class="hbtn" data-events="${esc(team)}">事件</button>
      <button class="hbtn" style="margin-left:auto" data-coach="${esc(team)}">改教练</button></div>
    <div class="frow">${chips}</div>
    <details class="tacbox" data-tacteam="${esc(team)}" ${TAC_OPEN[team]?'open':''}><summary>战术设置（姿态 / 主攻 / 打法 / 控球率）</summary>
      <div style="padding:2px 0 6px">
      ${taxRow}
      ${dirRow}
      ${playRow}
      ${possRow}
      ${which==='h'?'<div class="postureHint">姿态=整条线前压/回收；有球形态=出球结构</div>':''}
      </div></details></div>`;
}

function legendCard(){
  return '<div class="ac l0 legend"><div class="ah"><span class="tag">怎么读这一页</span></div>'+
   '<div class="at">每张卡右上角有个标记：'+confTag('fact')+' 来自球员库或官网；'+
   confTag('infer')+' 引擎按规则算的结论；'+confTag('guess')+' 数据不全或凭外部信息，我在猜。</div>'+
   '<div class="ae">先看标记再看结论。确定 ≠ 结论一定对，只是依据硬；推断 ≠ 结论一定错，只是没实证。</div></div>';
}
var HUDKEY='tb_hud_pref';
var HUD={size:(window.matchMedia&&window.matchMedia('(max-width:480px)').matches?'compact':'standard'),mode:'always'};
var HUD_TIMER=null;
function loadHudPref(){
  try{
    var d=JSON.parse(localStorage.getItem(HUDKEY)||'{}');
    if(d.size==='compact'||d.size==='standard'||d.size==='large') HUD.size=d.size;
    if(d.mode==='always'||d.mode==='semi'||d.mode==='auto') HUD.mode=d.mode;
  }catch(e){}
}
function saveHudPref(){
  try{ localStorage.setItem(HUDKEY,JSON.stringify({size:HUD.size,mode:HUD.mode})); }catch(e){}
}
function syncHudSpace(){
  var h=document.getElementById('hud'); if(!h) return;
  document.documentElement.style.setProperty('--hud-h',h.offsetHeight+'px');
}
function scheduleHudHide(){
  clearTimeout(HUD_TIMER);
  if(HUD.mode!=='auto') return;
  if(TAB!=='lineup'&&TAB!=='analysis') return;
  var p=document.getElementById('hudCfg'); if(p&&p.classList.contains('on')) return;
  HUD_TIMER=setTimeout(hideHud,5000);
}
function hideHud(){
  if(HUD.mode!=='auto'||(TAB!=='lineup'&&TAB!=='analysis')) return;
  var p=document.getElementById('hudCfg'); if(p&&p.classList.contains('on')) return;
  var h=document.getElementById('hud'); if(!h) return;
  h.classList.add('hud-hidden');
  var s=document.getElementById('hudShow'); if(s) s.classList.add('on');
  clearTimeout(HUD_TIMER);
}
function showHud(){
  var h=document.getElementById('hud'); if(h) h.classList.remove('hud-hidden');
  var s=document.getElementById('hudShow'); if(s) s.classList.remove('on');
  if(HUD.mode==='auto') scheduleHudHide();
}
function syncHudForTab(t){
  var h=document.getElementById('hud'), s=document.getElementById('hudShow'), p=document.getElementById('hudCfg');
  if(!h) return;
  if(t!=='lineup'&&t!=='analysis'){
    clearTimeout(HUD_TIMER);
    if(s) s.classList.remove('on');
    if(p) p.classList.remove('on');
    return;
  }
  if(HUD.mode==='auto'&&h.classList.contains('hud-hidden')){
    if(s) s.classList.add('on');
  }else{
    if(s) s.classList.remove('on');
    scheduleHudHide();
  }
}
function renderHudCfg(){
  var el=document.getElementById('hudCfg'); if(!el) return;
  var sizes=[['compact','紧凑'],['standard','标准'],['large','大']];
  var modes=[['always','常驻'],['semi','半透明'],['auto','自动收起']];
  el.innerHTML='<div class="hudcfg-h"><b>比分牌</b><button class="x" onclick="toggleHudCfg()">✕</button></div>'+
    '<div class="hudcfg-row"><span class="mut">大小</span>'+sizes.map(function(s){
      return '<button class="fchip '+(HUD.size===s[0]?'on':'')+'" onclick="setHudSize(\''+s[0]+'\')">'+s[1]+'</button>';
    }).join('')+'</div>'+
    '<div class="hudcfg-row"><span class="mut">出现</span>'+modes.map(function(m){
      return '<button class="fchip '+(HUD.mode===m[0]?'on':'')+'" onclick="setHudMode(\''+m[0]+'\')">'+m[1]+'</button>';
    }).join('')+'</div>'+
    (HUD.mode==='auto'?'<button class="tb" style="width:100%;margin-top:8px;padding:9px" onclick="collapseHudNow()">立即收起</button>':'')+
    '<div class="hudcfg-tip">偏好只存在本机；自动收起后点底部「比分」展开。</div>';
}
function applyHudPref(){
  var h=document.getElementById('hud'); if(!h) return;
  h.classList.remove('hud-compact','hud-standard','hud-large','hud-semi','hud-auto','hud-hidden');
  h.classList.add('hud-'+HUD.size);
  if(HUD.mode==='semi') h.classList.add('hud-semi');
  if(HUD.mode==='auto') h.classList.add('hud-auto');
  if(HUD.mode!=='auto'){
    clearTimeout(HUD_TIMER);
    var s=document.getElementById('hudShow'); if(s) s.classList.remove('on');
  }
  syncHudSpace();
  var p=document.getElementById('hudCfg'); if(p&&p.classList.contains('on')) renderHudCfg();
  if(HUD.mode==='auto') scheduleHudHide();
}
function toggleHudCfg(){
  var p=document.getElementById('hudCfg'); if(!p) return;
  var open=!p.classList.contains('on');
  if(open){ renderHudCfg(); p.classList.add('on'); clearTimeout(HUD_TIMER); showHud(); }
  else { p.classList.remove('on'); if(HUD.mode==='auto') scheduleHudHide(); }
}
function setHudSize(s){
  if(s!=='compact'&&s!=='standard'&&s!=='large') return;
  HUD.size=s; saveHudPref(); applyHudPref();
}
function setHudMode(m){
  if(m!=='always'&&m!=='semi'&&m!=='auto') return;
  HUD.mode=m; saveHudPref(); applyHudPref();
}
function collapseHudNow(){
  var p=document.getElementById('hudCfg'); if(p) p.classList.remove('on');
  hideHud();
}
function renderHUD(){
  $('#hud').innerHTML=`
    <div class="hRow">
      <span class="hTeam">${esc(S.home)}</span>
      <button class="mini goal" onclick="addGoal('h',-1)">−</button>
      <b class="sc" onclick="addGoal('h',1)">${S.hs}</b>
      <button class="mini goal" onclick="addGoal('h',1)">+</button>
      <span class="mut sc2">:</span>
      <button class="mini goal" onclick="addGoal('a',-1)">−</button>
      <b class="sc" onclick="addGoal('a',1)">${S.as}</b>
      <button class="mini goal" onclick="addGoal('a',1)">+</button>
      <span class="hTeam">${esc(S.away)}</span>
    </div>
    <div class="hRow">
      <button class="mini" onclick="addMin(-5)">−5'</button>
      <b class="mn">${S.minute}'</b>
      <button class="mini" onclick="addMin(5)">+5'</button>
      <span class="sep"></span>
      <button class="mini" onclick="setMin(0)">0'</button>
      <button class="mini" onclick="setMin(45)">45'</button>
      <button class="mini" onclick="setMin(60)">60'</button>
      <button class="mini" onclick="setMin(75)">75'</button>
      <button class="mini" onclick="setMin(90)">90'</button>
      <button class="mini warnb" onclick="resetMatch()">重置</button>
    </div>
    <button class="hcfg" onclick="toggleHudCfg()" aria-label="比分牌设置">⚙</button>`;
  syncHudSpace();
}

function renderAll(){
  $('#pitches').innerHTML='<div class="teams">'+teamPanel('h')+teamPanel('a')+'</div>'+boardHtml();
  bindBoardDrag(document);
  var hm=metrics(S.lineup[S.home]||[]), am=metrics(S.lineup[S.away]||[]);
  var diff='';
  if(S.lastDiff){
    var after=metrics(S.lineup[S.lastDiff.team]||[]);
    var keys=[['wing','边路威胁'],['mid','中场控制'],['def','防线质量'],['behind','身后威胁'],['air','制空'],['build','出球质量']];
    var dl=keys.map(function(k){return [k[1], after[k[0]]-S.lastDiff.m[k[0]]];})
      .filter(function(x){return Math.abs(x[1])>=1;})
      .sort(function(a,b){return Math.abs(b[1])-Math.abs(a[1]);}).slice(0,3);
    if(dl.length) diff=`<div class="ac l1"><div class="ah"><span class="tag">刚换人</span><span class="lv">结构变化</span></div>
      <div class="at">${dl.map(function(x){return x[0]+' <b style="color:'+(x[1]>0?'#23c55e':'#e2383f')+'">'+(x[1]>0?'+':'')+x[1].toFixed(0)+'</b>';}).join(' · ')}</div>
      <div class="ae">结构差值，不是评分：问题搬家比分数涨落更重要。</div></div>`;
  }
  $('#analysis').innerHTML=aiBarHtml()
    + '<div class="anbody">'
    + prematchCard()
    + `<div class="perspH"><span>比赛分析 · ${esc(S.home)} vs ${esc(S.away)}</span><span class="line"></span></div>`
    + aiCardsHtml()
    + '<div class="anmeta">'
    + legendCard() + coachNoteCard() + scoreCard() + phaseCard(hm,am) + subCard() + snapsCard() + timelineCard() + aiTermsCard() + diff
    + '</div></div>';
  renderHUD();
  save();
}

function teamSelect(which,cur){
  return '<button class="teamSel" onclick="openTeamPick(\''+which+'\')">'+esc(cur)+' ▾</button>';
}
/* ===== 替补席（问题十五）：手动确定替补席人员 ===== */
function openBench(team){
  var lu=S.lineup[team]||[];
  var cands=(POOL[team]||[]).filter(function(p){ return lu.indexOf(p.n)<0 && !hurt(p) && !sentOff(team,p.n); });
  var cur=S.bench[team]||[];
  var h='<div class="sh"><b>替补席 · '+esc(team)+'（已选 '+cur.length+'/12）</b>'
    +'<button class="x" onclick="closeSheet()">✕</button></div>'
    +'<div class="lov">点选进入/移出替补席（换人优先从替补席取人，AI 分析会读取）</div>'
    +'<div class="grid2" id="bnList">'+cands.map(function(p){
      var on=cur.indexOf(p.n)>=0;
      return '<button class="tb '+(on?'on':'')+'" data-bn="'+esc(p.n)+'">'+esc(p.n)+' <span class="mut">'+(p.pos||[]).join('/')+'</span></button>';
    }).join('')+'</div>'
    +'<button class="hbtn2" onclick="closeSheet()">完成</button>';
  $('#sheet').innerHTML='<div class="sheetIn">'+h+'</div>'; $('#sheet').classList.add('on');
  $('#sheet').querySelectorAll('[data-bn]').forEach(function(b){
    b.onclick=function(){
      var n=b.dataset.bn, c=S.bench[team]=S.bench[team]||[];
      var i=c.indexOf(n);
      if(i>=0){ c.splice(i,1); b.classList.remove('on'); }
      else if(c.length<12){ c.push(n); b.classList.add('on'); }
      $('#sheet').querySelector('.sh b').textContent='替补席 · '+team+'（已选 '+c.length+'/12）';
      save();
    };
  });
}
/* ===== 主帅核对表：40 队主帅 + 审核状态，可现场补填/确认 ===== */
function openCoachAudit(){
  var pend=coachPendingCount(), total=(typeof TEAMS!=='undefined'?TEAMS.length:0);
  function row(t){
    var m=coachMeta(t);
    var cls=m.st==='ok'?'ok':(m.st==='none'?'none':'infer');
    var stTxt=m.st==='ok'?'✅ 已核对':(m.st==='none'?'⬜ 未核实':'⚠️ 待确认');
    return '<div class="cfrow '+cls+'" data-ct="'+esc(t)+'">'
      +'<span class="cft">'+esc(t)+'</span>'
      +'<input class="ctext cfi" data-cfi="'+esc(t)+'" value="'+esc(m.n)+'" placeholder="填主帅名…">'
      +'<span class="cfst">'+stTxt+'</span>'
      +'<span class="cfc" title="'+esc(m.src||'')+'">'+(m.since?esc(m.since):'—')+'</span>'
      +'</div>';
  }
  var h='<div class="sh"><b>🛡 主帅核对表</b><button class="x" onclick="closeSheet()">✕</button></div>'
    +'<div class="lov">全部 '+total+' 队 · <b style="color:#f0b429">'+pend+' 队</b> 还没核对（含空缺）。改完自动存本机，模拟器头部 / AI 分析立刻用新名字。</div>'
    +'<div class="cflegend"><span class="cfk ok">✅ 已核对</span><span class="cfk infer">⚠️ 待确认（媒体口径/旧资料）</span><span class="cfk none">⬜ 未核实（空缺）</span></div>'
    +'<div class="cfaudit">';
  GROUPS.forEach(function(g){
    var list=g.list.slice().sort(function(x,y){
      var a=coachMeta(x).st==='ok'?1:0, b=coachMeta(y).st==='ok'?1:0; return a-b;
    });
    h+='<div class="cfg"><div class="lgrp">'+g.t+' <em>'+list.length+'</em></div>'+list.map(row).join('')+'</div>';
  });
  h+='</div>';
  $('#sheet').innerHTML='<div class="sheetIn wide">'+h+'</div>'; $('#sheet').classList.add('on');
  $('#sheet').querySelectorAll('[data-cfi]').forEach(function(inp){
    inp.addEventListener('change',function(){
      var t=inp.getAttribute('data-cfi');
      coachSaveFix(t,inp.value,'');
      var rowEl=inp.closest('.cfrow');
      if(inp.value.trim()){ rowEl.className='cfrow ok'; rowEl.querySelector('.cfst').textContent='✅ 已核对'; }
      else { rowEl.className='cfrow none'; rowEl.querySelector('.cfst').textContent='⬜ 未核实'; }
      renderSetup(); renderAll();
    });
  });
}

/* ===== 事件池（问题十八）：黄牌/红牌/伤退/变阵/压迫切换/定位球 ===== */
var EV_TEAM=null;
function openEvents(team){
  EV_TEAM=team;
  var h='<div class="sh"><b>比赛事件 · '+esc(team)+'（'+S.minute+'\'）</b>'
    +'<button class="x" onclick="closeSheet()">✕</button></div>'
    +'<div class="lov">选择类型</div><div class="frow" style="flex-wrap:wrap">'
    +[['yellow','🟨 黄牌'],['red','🟥 红牌罚下'],['injury','🤕 伤退'],['formation','🔁 临场变阵'],['press','⚡ 压迫切换'],['setpiece','🎯 定位球攻防']]
      .map(function(x){ return '<button class="fchip" data-ev="'+x[0]+'">'+x[1]+'</button>'; }).join('')+'</div>'
    +'<div id="evWho" style="margin-top:8px"></div>';
  $('#sheet').innerHTML='<div class="sheetIn">'+h+'</div>'; $('#sheet').classList.add('on');
  $('#sheet').querySelectorAll('[data-ev]').forEach(function(b){
    b.onclick=function(){ pickEvPlayer(b.dataset.ev); };
  });
}
function pickEvPlayer(type){
  var team=EV_TEAM;
  var players=(S.lineup[team]||[]).filter(Boolean);
  var h='<div class="lov">'+({yellow:'黄牌给谁？',red:'红牌罚下谁？（将从阵容移除且无法再上）',injury:'谁伤退？（将被换下）',formation:'变阵为：',press:'压迫切换为：',setpiece:'定位球事件描述'})[type]+'</div>';
  if(type==='formation'){
    h+=BASE_FORMS.map(function(f){ return '<button class="tb" data-evf="'+f+'">'+f+'</button>'; }).join(' ');
  }else if(type==='press'){
    h+='<button class="tb" data-evp="up">压迫上提</button> <button class="tb" data-evp="down">压迫回收</button>';
  }else if(type==='setpiece'){
    h+='<input id="evNote" placeholder="描述（例：30 分角球被顶进）" style="width:100%;background:var(--card2);border:1px solid var(--line);border-radius:8px;color:var(--txt);padding:8px;font-size:12.5px;font-family:inherit">';
    h+='<button class="hbtn2" data-evgo="1">记录</button>';
  }else{
    h+='<div class="grid2">'+players.map(function(n){ return '<button class="tb" data-evn="'+esc(n)+'">'+esc(n)+'</button>'; }).join('')+'</div>';
  }
  document.getElementById('evWho').innerHTML=h;
  var go=function(who,extra){
    var e={type:type,min:S.minute,team:team,who:who||'',note:extra||''};
    if(type==='red'){ S.status[who]='red'; }     /* 问题五：红牌球员保留在场上显示🟥标记 */
    if(type==='yellow'){ S.status[who]='yellow'; }  /* 黄牌显示🟨 */
    if(type==='injury'){ S.status[who]='inj'; }
    S.events.push(e);
    repairLineup(team);
    save(); closeSheet(); renderAll(); renderSetup();
  };
  var box=document.getElementById('evWho');
  box.querySelectorAll('[data-evn]').forEach(function(b){ b.onclick=function(){ go(b.dataset.evn); }; });
  box.querySelectorAll('[data-evf]').forEach(function(b){ b.onclick=function(){ changeForm(team,b.dataset.evf,true); go('变阵 '+b.dataset.evf,b.dataset.evf); }; });
  box.querySelectorAll('[data-evp]').forEach(function(b){ b.onclick=function(){ go(b.dataset.evp==='up'?'压迫上提':'压迫回收',b.dataset.evp); }; });
  var gb=box.querySelector('[data-evgo]');
  if(gb) gb.onclick=function(){ go('定位球',box.querySelector('#evNote').value.trim()); };
}

/* 问题二：选队用底部弹窗（原生 select 在手机上没有取消键） */
function openTeamPick(which){
  var cur=which==='h'?S.home:S.away;
  var h='<div class="sh"><b>选择'+(which==='h'?'主队':'客队')+'（当前：'+esc(cur)+'）</b>'
    +'<button class="x" onclick="closeSheet()">✕</button></div>'
    +'<div class="lov"><input id="tpQ" placeholder="搜索球队名…" style="width:100%;background:var(--card2);border:1px solid var(--line);border-radius:8px;color:var(--txt);padding:8px;font-size:13px;font-family:inherit"></div>'
    +'<div id="tpList" style="max-height:52vh;overflow:auto">';
  GROUPS.forEach(function(g){
    h+='<div class="lov">'+g.t+'</div><div class="grid2">'+g.list.map(function(t){
      return '<button class="tb '+(t===cur?'on':'')+'" data-tp="'+t+'">'+t+'</button>';}).join('')+'</div>';
  });
  h+='</div>';
  $('#sheet').innerHTML='<div class="sheetIn">'+h+'</div>';
  $('#sheet').classList.add('on');
  $('#sheet').dataset.tp=which;
  $('#sheet').querySelectorAll('[data-tp]').forEach(function(b){
    b.onclick=function(){ closeSheet(); setTeam(which,b.dataset.tp); };
  });
  var q=document.getElementById('tpQ');
  q.addEventListener('input',function(){
    var v=this.value.trim().toLowerCase();
    $('#sheet').querySelectorAll('[data-tp]').forEach(function(b){
      b.style.display=(!v||b.dataset.tp.toLowerCase().indexOf(v)>=0)?'':'none';
    });
  });
  q.focus();
}
function renderSetup(){
  var h=S.home, a=S.away;
  var countOf=function(t){ return (POOL[t]||[]).length; };
  $('#setup').innerHTML=`<div class="row" style="gap:6px">
      <span class="mut" style="flex:none">主队</span>${teamSelect('h',h)}
      <button class="tb" style="flex:none;padding:6px 9px" onclick="swapSides()">⇄</button>
      <span class="mut" style="flex:none">客队</span>${teamSelect('a',a)}</div>
    <div class="row" style="flex-wrap:wrap"><span class="mut">${esc(coachOf(h))} ${formOf(h)} · ${countOf(h)}人 ｜ ${esc(coachOf(a))} ${formOf(a)} · ${countOf(a)}人</span>
      <span style="flex:1"></span>
      <button class="tb" style="padding:5px 9px;font-size:11.5px" onclick="openCoachAudit()">🛡 主帅核对${coachPendingCount()?'（'+coachPendingCount()+' 队待确认）':''}</button>
      <button class="tb" style="padding:5px 9px;font-size:11.5px" onclick="aiEnrichBoth()"${(!window.TBSettings||!TBSettings.ready())?' disabled':''}>AI 补全两队中文名/特点</button></div>
    <div class="row"><span class="mut">天气</span>
      <button class="fchip wxchip ${S.weather==='dry'?'on':''}" onclick="setWeather('dry')">晴</button>
      <button class="fchip wxchip ${S.weather==='rain'?'on':''}" onclick="setWeather('rain')">雨</button></div>
    <div class="confirmBar"><button class="tb cok" onclick="confirmXI()">✅ 确认双方首发 · 生成赛前分析</button>
      <button class="tb" onclick="resetSquad()">🔄 重置本场阵容</button>
      ${S.confirmed?`<span class="mut">已于 ${new Date(S.confirmed.ts).toLocaleTimeString()} 确认（改阵容后可重新确认）</span>`
        :'<span class="mut">确认后 AI 会先出一份「赛前差距与被针对点」分析，和比赛开始后的分析分开</span>'}</div>
    ${S.preErr?`<div class="ae" style="color:#ffb4b7">${esc(S.preErr)}</div>`:''}`;
}

/* ---------------- 交互 ---------------- */
function POSZH(s){
  return ({GK:'门将',CB:'中卫',LB:'左后卫',RB:'右后卫',LWB:'左翼卫',RWB:'右翼卫',
    DM:'后腰 6 号',CM:'中场 8 号',AM:'前腰 10 号',RM:'右前卫',LM:'左前卫',
    LW:'左边锋',RW:'右边锋',ST:'中锋 9 号',ST2:'第二前锋'})[s]||s;
}
var POSHINT={
  GK:'门将：先看门线技术（扑救/站位），再看出球与出击范围——现代体系里门将是第一名组织者。',
  CB:'中卫：看对抗与争顶、转身速度（防身后）、出球线路（左脚/右脚）；三中卫还要看横向覆盖。',
  LB:'边后卫：看往返体能与传中质量；内收型要看中场接球与出球能力。',
  RB:'边后卫：看往返体能与传中质量；内收型要看中场接球与出球能力。',
  LWB:'翼卫：攻要像边锋、守要像边后卫，一场 12 公里起——体能是第一筛选条件。',
  RWB:'翼卫：攻要像边锋、守要像边后卫，一场 12 公里起——体能是第一筛选条件。',
  DM:'后腰 6 号：优先看拦截/补位/弧顶保护，其次看出球与转身；单 6 还要看覆盖面积。',
  CM:'中场 8 号：要能落位防守 + 前插支援；B2B 看体能，组织 8 看传球。',
  AM:'前腰 10 号：看两线之间接球、最后一传与远射；不落位防守是这个位置的天生短板。',
  RM:'右前卫：4-4-2 / 4-1-4-1 的边路中场，攻防两端都要跑。',
  LM:'左前卫：4-4-2 / 4-1-4-1 的边路中场，攻防两端都要跑。',
  LW:'左边锋：看一对一、内切或下底的惯用脚方向、回防意愿。',
  RW:'右边锋：看一对一、内切或下底的惯用脚方向、回防意愿。',
  ST:'中锋 9 号：支点看背身做球、抢点看跑位、逼抢型看防守贡献——先确定你要哪种 9 号。'
};
function posTagHtml(p,slot){
  var arr=(p&&p.pos)||[];
  if(!arr.length) return '<span class="mut">位置未知</span>';
  return arr.map(function(x){ return '<i class="pt '+(String(x)===String(slot)?'hit':'')+'">'+esc(x)+'</i>'; }).join('');
}
function openSheet(wi,idx,posFromDom){
  var team=wi==='h'?S.home:S.away, form=formOf(team), slots=FORMS[form]||FORMS['4-2-3-1'];
  if(S.minute>0&&!SUB_TAG[team]) SUB_TAG[team]='对位替换';
  /* 位置码优先用球场上那颗棋子的 data-pos：即使坐标表未来改了顺序，弹窗分组也不会错位 */
  var slot=posFromDom||((slots[idx]||['CM'])[0]);
  var lu=S.lineup[team]||autoLineup(team); S.lineup[team]=lu;
  var cur=lu[idx];
  var curP=cur?byName[cur]:null;
  var allCands=(POOL[team]||[]).filter(function(p){ return !sentOff(team,p.n); });
  var cands=allCands.slice().sort(function(a,b){return scoreFor(b,slot)-scoreFor(a,slot);});
  var sts=[['hot','🔥'],['ok','🙂'],['low','😑'],['inj','🤕'],['yellow','🟨'],['red','🟥'],['out','⛔']];
  var target=GRP[slot]||'';
  var gDefs=[['门','门将'],['卫','后卫'],['中','中场'],['锋','前锋']];
  var buckets={};
  cands.forEach(function(p){
    var primary=GRP[(p.pos||[])[0]]||'其他';
    (buckets[primary]=buckets[primary]||[]).push(p);
  });
  /* 同位置优先 → 邻近位置兜底 → 其他位置 */
  var ordered=gDefs.filter(function(g){return g[0]===target;})
    .concat(gDefs.filter(function(g){return g[0]!==target;}));

  var h='<div class="sheetIn wide"><div class="sheethd">'
    +'<div class="sheethd-l"><div class="sheethd-t">'+esc(team)+' · <b>'+esc(slot)+'</b> <span class="shpos">'+esc(POSZH(slot))+'</span></div>'
    +'<div class="sheethd-s">'+(cur?('当前：<b>'+esc(cur)+'</b>'+(curP&&curP.foot?' · '+esc(curP.foot)+'脚':'')):'这个位置还空着')+'</div></div>'
    +'<button class="x" onclick="closeSheet()">✕</button></div>'
    +'<div class="shhint">'+esc(POSHINT[slot]||'按位置适配度排序，同位置优先。')+'</div>';
  if(cur) h+='<div class="strow"><span class="mut">状态</span>'+sts.map(function(s){
      return '<button class="st '+(stOf(cur)===s[0]?'on':'')+'" data-st="'+s[0]+'" data-n="'+esc(cur)+'">'+s[1]+'</button>';}).join('')+'</div>';
  if(S.minute>0){
    var tags=['进攻换防守','防守换进攻','对位替换','伤病被迫换人','战术新指令'];
    h+='<div class="lov">换人意图标签（AI 分析会按标签加权）</div><div class="frow" style="max-width:none;margin:0;flex-wrap:wrap">'
      +tags.map(function(tg){ return '<button class="fchip '+((SUB_TAG[team]||'对位替换')===tg?'on':'')+'" data-subtag="'+tg+'">'+tg+'</button>'; }).join('')
      +'</div>';
  }
  h+='<div class="shlist" id="shList">';
  h+='<button class="pr nullrow '+(cur?'':'on')+'" data-slotnull="1"><span>— 留空（先不填这个人）—</span></button>';
  ordered.forEach(function(g){
    var arr=buckets[g[0]]||[];
    if(!arr.length) return;
    var isTarget=g[0]===target;
    arr.sort(function(a,b){
      var ae=(a.pos||[]).indexOf(slot)>=0?1:0, be=(b.pos||[]).indexOf(slot)>=0?1:0;
      if(ae!==be) return be-ae;
      return scoreFor(b,slot)-scoreFor(a,slot);
    });
    h+='<div class="lgrp'+(isTarget?' hit':'')+'">'+(isTarget?'★ 推荐 · ':'')+g[1]
      +' <em>'+arr.length+' 人</em>'+(isTarget?'<span class="lgrp-tip">同位置优先</span>':'')+'</div>';
    arr.forEach(function(p){
      var used=lu.filter(function(n,i){return n===p.n&&i!==idx;}).length>0;
      var fit=scoreFor(p,slot);
      h+='<button class="pr '+(cur===p.n?'on':'')+' '+(used?'used':'')+'" data-pick="'+esc(p.n)+'">'
        +'<span class="prn"><b>'+esc(p.n)+'</b> <span class="prp">'+posTagHtml(p,slot)+'</span>'
        +(p.foot?'<i class="mut" style="font-size:10.5px">'+esc(p.foot)+'脚</i>':'')+'</span>'
        +'<em>'+(used?'已在场（互换）':(fit>=10?'✔ 本位置':'可客串'))+(hurt(p)?' ⛔':'')+'</em></button>';
    });
  });
  h+='</div></div>';
  $('#sheet').innerHTML=h; $('#sheet').classList.add('on');
  $('#sheet').dataset.wi=wi; $('#sheet').dataset.idx=idx;
  var list=$('#shList'); if(list) list.scrollTop=0;
}
function closeSheet(){ $('#sheet').classList.remove('on'); $('#sheet').innerHTML=''; }
var SUB_TAG={};
function setSlot(wi,idx,name){
  var team=wi==='h'?S.home:S.away;
  var lu=S.lineup[team]||autoLineup(team);
  var before=metrics(lu);
  var prev=lu[idx];
  var j=(name?lu.indexOf(name):-1);
  var isSwap=j>=0&&j!==idx;
  if(name){
    if(isSwap) lu[j]=prev;
    lu[idx]=name;
  } else lu[idx]=null;
  S.lineup[team]=lu;
  if(isSwap){
    S.lastDiff=null;
  }else if(S.minute===0){
    // 赛前调整：只改首发，不写换人事件、不生成换人诊断、不打 ↑0' 徽标
    S.lastDiff=null;
    log('edit',team,name||'空');
  }else if(name&&prev&&prev!==name){
    S.lastDiff={team:team,m:before,out:prev,in:name};
    log('sub',team,name,prev);
    S.subMark[name]=S.minute;
    if(prev&&S.subMark) delete S.subMark[prev];
  }else{
    S.lastDiff={team:team,m:before,out:(prev&&prev!==name?prev:null),in:(name&&prev!==name?name:null)};
    log('edit',team,name||'空');
  }
  closeSheet(); renderAll();
}
function setSt(name,k){
  S.status[name]=k;
  log('status',S.home==='曼联'?S.home:S.away,name,STMARK[k]||k);
  closeSheet(); renderAll();
}
function setTeam(which,t){
  if(which!=='h'&&which!=='a') which=(S.home==='曼联'?'a':'h'); /* 兼容旧调用 */
  if(t===S.home||t===S.away) return; /* 同队不打同队 */
  if(which==='h') S.home=t; else S.away=t;
  if(!S.lineup[t]) S.lineup[t]=autoLineup(t);
  S.lastDiff=null; S.events=[]; S.confirmed=null;
  S.play={}; S.possRate={};
  renderAll(); renderSetup(); save();
}
function swapSides(){
  var t=S.home; S.home=S.away; S.away=t;
  if(!S.lineup[S.home]) S.lineup[S.home]=autoLineup(S.home);
  if(!S.lineup[S.away]) S.lineup[S.away]=autoLineup(S.away);
  S.snap={h:metrics(S.lineup[S.home]),a:metrics(S.lineup[S.away])};
  S.lastDiff=null; S.events=[];
  renderAll(); renderSetup();
}
function addGoal(side,d){
  if(side==='h') S.hs=Math.max(0,S.hs+d); else S.as=Math.max(0,S.as+d);
  renderAll();
  var arr=document.querySelectorAll('#hud .sc');
  var el=arr[side==='h'?0:1];
  if(el){ el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
}
function addMin(d){ setMin(S.minute+d); }
function setMin(m){
  S.minute=Math.max(0,Math.min(95,m)); renderAll();
  var el=document.querySelector('#hud .mn'); if(el){ el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
  checkSnaps();
}
function checkSnaps(){
  var nodes=[0,45,60,75,90];
  if(nodes.indexOf(S.minute)<0) return;
  if(S.snaps.some(function(x){ return x.min===S.minute; })) return;
  S.snaps.push({min:S.minute,m:metrics(S.lineup[S.home]||[]),am:metrics(S.lineup[S.away]||[]),
    hs:S.hs,as:S.as,note:'',formH:formOf(S.home),formA:formOf(S.away),ts:Date.now()});
  save();
}
function resetMatch(){
  S.hs=0;S.as=0;S.minute=0;S.status={};S.events=[];S.lastDiff=null;S.weather='dry';
  S.lineup[S.home]=autoLineup(S.home); S.lineup[S.away]=autoLineup(S.away);
  S.snap={h:metrics(S.lineup[S.home]),a:metrics(S.lineup[S.away])};
  renderAll(); renderSetup();
}
function log(type,team,a,b){
  if(type!=='sub'&&type!=='status') return;
  S.events.push({type:type,min:S.minute,team:team,a:a,b:b,
    out:(type==='sub'?b:a), in:(type==='sub'?a:null), who:(type==='status'?a:null),
    tag:(type==='sub'?(SUB_TAG[team]||'对位替换'):undefined),
    mark:(type==='status'?b:'')});
  if(type==='sub') SUB_TAG[team]='对位替换';
  if(S.events.length>60) S.events.shift();
}
function cleanPreSubs(events){
  return (events||[]).filter(function(e){ return !(e.type==='sub' && (!e.min || e.min<=0)); });
}
function cleanSubMark(mark){
  var out={};
  Object.keys(mark||{}).forEach(function(n){ if(mark[n]>0) out[n]=mark[n]; });
  return out;
}

/* ---------------- 存储 ---------------- */
var KEY='tb_v41_state';
function save(){
  try{ localStorage.setItem(KEY,JSON.stringify({
    home:S.home,away:S.away,form:FORM_SEL,lineup:S.lineup,status:S.status,minute:S.minute,hs:S.hs,as:S.as,
    tactic:S.tactic,poss:S.poss,dir:S.dir,keep:KEEP,events:S.events,subMark:S.subMark,weather:S.weather,
    play:S.play,possRate:S.possRate,confirmed:S.confirmed,bench:S.bench,snaps:S.snaps,
    boardPos:S.boardPos,oral:S.oral,
    coachFix:{style:STYLE_FIX,profile:PROFILE,form:FORM_OVERRIDE}
  })); }catch(e){}
}
function load(){
  try{
    var raw=localStorage.getItem(KEY); if(!raw) return false;
    var d=JSON.parse(raw);
    if(!d||!d.home||!d.away) return false;
    S.home=d.home;S.away=d.away;S.minute=d.minute||0;S.hs=d.hs||0;S.as=d.as||0;
    FORM_SEL=d.form||{}; S.status=d.status||{};
    S.tactic=d.tactic||{}; S.poss=d.poss||{}; S.dir=d.dir||{};
    S.weather=d.weather==='rain'?'rain':'dry';
    S.play=d.play||{}; S.possRate=d.possRate||{}; S.confirmed=d.confirmed||null;
    S.bench=d.bench||{}; S.snaps=d.snaps||[];
    S.boardPos=d.boardPos||{}; S.oral=d.oral||'';
    if(d.coachFix){
      STYLE_FIX=d.coachFix.style||{}; PROFILE=d.coachFix.profile||{}; FORM_OVERRIDE=d.coachFix.form||FORM_OVERRIDE;
    }
    S.events=cleanPreSubs(d.events||[]); S.subMark=cleanSubMark(d.subMark||{});
    if(d.keep){ for(var k in d.keep){ KEEP[k]=d.keep[k]; } }
    S.lineup=d.lineup||{};
    repairLineups();
    /* 旧数据迁移：'h'/'a' 键 → 队名键 */
    if(S.possRate['h']!==undefined){ S.possRate[S.home]=S.possRate['h']; delete S.possRate['h']; }
    if(S.possRate['a']!==undefined){ S.possRate[S.away]=S.possRate['a']; delete S.possRate['a']; }
    return true;
  }catch(e){ return false; }
}


/* ---------------- 页签 ---------------- */
var TAB='lineup';
function switchTab(t){
  TAB=t;
  ['lineup','analysis','log'].forEach(function(k){
    var p=document.getElementById('pane-'+k); if(p) p.classList.toggle('on',k===t);
  });
  [].forEach.call(document.querySelectorAll('#tabs button'),function(b){
    b.classList.toggle('on',b.getAttribute('data-tab')===t);
  });
  document.getElementById('hud').style.display=(t==='lineup'||t==='analysis')?'':'none';
  syncHudForTab(t);
  if(t==='log') renderLog();
  var sc=document.getElementById('scroll'); if(sc) sc.scrollTo(0,0);
}

/* ---------------- 复盘日志 ---------------- */
var LOGKEY='tb_v4_logs';
var LOG_EDIT=-1;
function logs(){ try{ return JSON.parse(localStorage.getItem(LOGKEY)||'[]'); }catch(e){ return []; } }
function logTime(ts){
  var d=new Date(ts);
  return (d.getMonth()+1)+'/'+d.getDate()+' '+('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);
}
function wxLabel(w){ return w==='rain'?'雨':w==='dry'?'晴':''; }
function saveLog(){
  var t=document.getElementById('logtxt');
  var v=(t&&t.value||'').trim(); if(!v) return;
  var arr=logs();
  if(LOG_EDIT>=0){
    if(!arr[LOG_EDIT]){ LOG_EDIT=-1; renderLog(); return; }
    arr[LOG_EDIT].txt=v;
    arr[LOG_EDIT].edited=Date.now();
    try{ localStorage.setItem(LOGKEY,JSON.stringify(arr)); }catch(e){}
    LOG_EDIT=-1;
    renderLog();
    return;
  }
  arr.unshift({ts:Date.now(),txt:v,home:S.home,away:S.away,hs:S.hs,as:S.as,min:S.minute,
    form:formOf(S.home),tax:taxOf(S.home),wx:S.weather});
  try{ localStorage.setItem(LOGKEY,JSON.stringify(arr.slice(0,60))); }catch(e){}
  renderLog();
}
function editLog(i){
  var arr=logs(); if(!arr[i]) return;
  LOG_EDIT=i;
  var t=document.getElementById('logtxt');
  if(t) t.value=arr[i].txt;
  renderLog();
  var t2=document.getElementById('logtxt');
  if(t2){ t2.value=arr[i].txt; t2.focus(); try{ t2.setSelectionRange(t2.value.length,t2.value.length); }catch(e){} }
}
function cancelEdit(){ LOG_EDIT=-1; renderLog(); }
function delLog(i){
  var arr=logs(); if(!arr[i]) return;
  if(LOG_EDIT>=0){
    if(i===LOG_EDIT) LOG_EDIT=-1;
    else if(i<LOG_EDIT) LOG_EDIT--;
  }
  arr.splice(i,1);
  try{ localStorage.setItem(LOGKEY,JSON.stringify(arr)); }catch(e){}
  renderLog();
}
function backupText(){
  return JSON.stringify({at:Date.now(),origin:location.origin,
    state:localStorage.getItem('tb_v41_state')||'',
    logs:localStorage.getItem('tb_v4_logs')||''},null,2);
}
function copyBackup(){
  var txt=backupText();
  if(navigator.clipboard&&window.isSecureContext){
    navigator.clipboard.writeText(txt).then(function(){ alert('已复制。粘到微信「文件传输助手」发给自己就行。'); },
      function(){ showBackup(txt); });
  }else{ showBackup(txt); }
}
function copyLog(i){
  var x=logs()[i]; if(!x) return;
  var txt=logTime(x.ts)+' · '+x.home+' '+x.hs+':'+x.as+' '+x.away+' · '+x.min+"' · "+x.form+(x.wx?' · '+wxLabel(x.wx):'')+'\n'+x.txt;
  if(navigator.clipboard&&window.isSecureContext){
    navigator.clipboard.writeText(txt).then(function(){ alert('已复制这条记录'); },function(){ showLogCopy(txt); });
  }else{ showLogCopy(txt); }
}
function showLogCopy(txt){
  $('#sheet').innerHTML='<div class="sheetIn"><div class="sh"><b>复制这条记录</b><button class="x" onclick="closeSheet()">✕</button></div>'+
    '<textarea readonly style="min-height:140px;font-size:12px">'+esc(txt)+'</textarea>'+
    '<div class="ae">长按全选 → 复制；或直接 Ctrl/⌘+C。</div></div>';
  $('#sheet').classList.add('on');
  setTimeout(function(){var t=document.querySelector('#sheet textarea');if(t){t.focus();t.select();}},0);
}
function showBackup(txt){
  var ta=document.getElementById('bktext');
  if(!ta) return;
  ta.style.display='block'; ta.value=txt; ta.focus(); ta.select();
  try{ document.execCommand('copy'); }catch(e){}
  alert('已选中全部文本。长按选择「拷贝」，或直接按 Ctrl/⌘+C。');
}
function isObj(x){ return !!x && typeof x==='object' && Object.prototype.toString.call(x)==='[object Object]'; }
function isNum(x){ return typeof x==='number' && isFinite(x); }
function isInt(x){ return isNum(x) && Math.floor(x)===x; }
function isName(x){ return typeof x==='string' && x.length>0; }
function badBackup(msg){ throw new Error(msg); }
var STATUS_OK={hot:1,ok:1,low:1,inj:1,yellow:1,out:1};
var TAX_OK={atk:1,bal:1,def:1};
function validateBackupState(st){
  if(!isObj(st)) badBackup('state 不是对象');
  if(!isName(st.home)||!isName(st.away)) badBackup('state 缺少有效的 home/away');
  if(TEAMS.indexOf(st.home)<0||TEAMS.indexOf(st.away)<0) badBackup('state.home/away 不是已支持的球队');
  if(st.home===st.away) badBackup('state.home/away 不能是同一支球队');
  if(!isInt(st.minute)||st.minute<0||st.minute>95) badBackup('state.minute 必须是 0–95 的整数');
  if(!isInt(st.hs)||st.hs<0||!isInt(st.as)||st.as<0) badBackup('state.hs/as 必须是非负整数');
  if(st.weather!=null&&st.weather!=='dry'&&st.weather!=='rain') badBackup('state.weather 必须是 dry/rain');
  if(!isObj(st.form)) badBackup('state.form 必须是对象');
  Object.keys(st.form).forEach(function(t){
    if(typeof st.form[t]!=='string'||!FORMS[st.form[t]]) badBackup('state.form 里有未知阵型：'+st.form[t]);
  });
  if(!isObj(st.lineup)) badBackup('state.lineup 必须是对象');
  Object.keys(st.lineup).forEach(function(t){
    var lu=st.lineup[t];
    if(!Array.isArray(lu)||lu.length!==11) badBackup('state.lineup.'+t+' 必须是 11 人数组');
    lu.forEach(function(n){ if(n!==null&&!isName(n)) badBackup('state.lineup.'+t+' 有非法球员值'); });
  });
  if(!st.lineup[st.home]||!st.lineup[st.away]) badBackup('state.lineup 缺少主队或客队阵容');
  if(!isObj(st.status)) badBackup('state.status 必须是对象');
  Object.keys(st.status).forEach(function(n){
    if(!STATUS_OK[st.status[n]]) badBackup('state.status 有未知状态：'+st.status[n]);
  });
  if(!isObj(st.tactic)) badBackup('state.tactic 必须是对象');
  Object.keys(st.tactic).forEach(function(t){
    if(!TAX_OK[st.tactic[t]]) badBackup('state.tactic 有未知姿态：'+st.tactic[t]);
  });
  if(!isObj(st.poss)) badBackup('state.poss 必须是对象');
  Object.keys(st.poss).forEach(function(t){
    if(typeof st.poss[t]!=='boolean') badBackup('state.poss 必须是布尔值');
  });
  if(!Array.isArray(st.events)) badBackup('state.events 必须是数组');
  st.events.forEach(function(e){
    if(!isObj(e)) badBackup('state.events 里有非法记录');
    if(!isInt(e.min)||e.min<0||e.min>95) badBackup('state.events 的分钟不合法');
    if(e.type==='sub'){
      if(!isName(e.team)||!isName(e.out)||!isName(e.in)) badBackup('state.events 的换人记录不完整');
    }else if(e.type==='status'){
      if(!isName(e.team)||!isName(e.who)||typeof e.mark!=='string') badBackup('state.events 的状态记录不完整');
    }else badBackup('state.events 有未知类型：'+e.type);
  });
  if(!isObj(st.subMark)) badBackup('state.subMark 必须是对象');
  Object.keys(st.subMark).forEach(function(n){
    if(!isInt(st.subMark[n])||st.subMark[n]<0||st.subMark[n]>95) badBackup('state.subMark 的分钟不合法');
  });
  if(st.keep!=null){
    if(!isObj(st.keep)) badBackup('state.keep 必须是对象');
    Object.keys(st.keep).forEach(function(t){
      var k=st.keep[t];
      if(!isObj(k)) badBackup('state.keep.'+t+' 必须是对象');
      if(k.form!=null&&(typeof k.form!=='string'||!FORMS[k.form])) badBackup('state.keep.'+t+'.form 有未知阵型');
      if(k.lineup!=null){
        if(!Array.isArray(k.lineup)||k.lineup.length!==11) badBackup('state.keep.'+t+'.lineup 必须是 11 人数组');
        k.lineup.forEach(function(n){ if(n!==null&&!isName(n)) badBackup('state.keep.'+t+'.lineup 有非法球员值'); });
      }
      if(k.tactic!=null&&!TAX_OK[k.tactic]) badBackup('state.keep.'+t+'.tactic 有未知姿态');
    });
  }
}
function validateBackupLogs(arr){
  if(!Array.isArray(arr)) badBackup('logs 必须是数组');
  arr.forEach(function(x){
    if(!isObj(x)) badBackup('logs 里有非法记录');
    if(typeof x.txt!=='string') badBackup('logs 记录缺少文本');
    if(!isNum(x.ts)) badBackup('logs 记录缺少时间戳');
    if(x.wx!=null&&x.wx!=='dry'&&x.wx!=='rain') badBackup('logs.wx 类型不对');
    if(x.edited!=null&&!isNum(x.edited)) badBackup('logs.edited 类型不对');
    ['home','away','form'].forEach(function(k){
      if(x[k]!=null&&typeof x[k]!=='string') badBackup('logs.'+k+' 类型不对');
    });
    ['hs','as','min'].forEach(function(k){
      if(x[k]!=null&&!isNum(x[k])) badBackup('logs.'+k+' 类型不对');
    });
  });
}
function parseBackup(d){
  if(!isObj(d)) badBackup('备份最外层必须是 JSON 对象');
  var hasState=Object.prototype.hasOwnProperty.call(d,'state')&&d.state!=null&&d.state!=='';
  var hasLogs=Object.prototype.hasOwnProperty.call(d,'logs')&&d.logs!=null&&d.logs!=='';
  if(!hasState&&!hasLogs) badBackup('备份里没有可导入的 state 或 logs');
  var plan={state:null,stateText:null,logsText:null};
  if(hasState){
    if(typeof d.state!=='string') badBackup('state 必须是 JSON 字符串（现有备份格式）');
    var st;
    try{ st=JSON.parse(d.state); }catch(e){ badBackup('state 不是有效 JSON'); }
    validateBackupState(st);
    plan.state=st; plan.stateText=d.state;
  }
  if(hasLogs){
    if(typeof d.logs!=='string') badBackup('logs 必须是 JSON 字符串（现有备份格式）');
    var lg;
    try{ lg=JSON.parse(d.logs); }catch(e){ badBackup('logs 不是有效 JSON'); }
    validateBackupLogs(lg);
    plan.logsText=d.logs;
  }
  return plan;
}
function applyBackupState(st){
  S.home=st.home; S.away=st.away; S.minute=st.minute; S.hs=st.hs; S.as=st.as;
  FORM_SEL=st.form; S.status=st.status; S.tactic=st.tactic; S.poss=st.poss;
  S.weather=st.weather==='rain'?'rain':'dry';
  S.events=cleanPreSubs(st.events); S.subMark=cleanSubMark(st.subMark); S.lineup=st.lineup;
  repairLineups();
  Object.keys(KEEP).forEach(function(k){ delete KEEP[k]; });
  if(st.keep) Object.keys(st.keep).forEach(function(k){ KEEP[k]=st.keep[k]; });
  S.lastDiff=null;
  S.snap={h:metrics(S.lineup[S.home]||[]),a:metrics(S.lineup[S.away]||[])};
}
function applyBackup(d){
  var plan=parseBackup(d);
  var oldState=localStorage.getItem(KEY);
  var oldLogs=localStorage.getItem(LOGKEY);
  try{
    if(plan.stateText!=null) localStorage.setItem(KEY,plan.stateText);
    if(plan.logsText!=null) localStorage.setItem(LOGKEY,plan.logsText);
  }catch(e){
    try{ if(oldState===null) localStorage.removeItem(KEY); else localStorage.setItem(KEY,oldState); }catch(e2){}
    try{ if(oldLogs===null) localStorage.removeItem(LOGKEY); else localStorage.setItem(LOGKEY,oldLogs); }catch(e3){}
    badBackup('浏览器存储写入失败，已保持原数据');
  }
  if(plan.state) applyBackupState(plan.state);
}
function importFromText(){
  var ta=document.getElementById('bktext');
  var v=(ta&&ta.value||'').trim();
  if(!v){ alert('先把备份内容粘进下面那个框'); return; }
  var d;
  try{ d=JSON.parse(v); }catch(e){ alert('导入失败：这段内容不是有效的 JSON'); return; }
  try{ applyBackup(d); }catch(e){ alert('导入失败：'+e.message); return; }
  alert('导入成功，刷新后生效'); location.reload();
}
function exportData(){
  var data={at:Date.now(),origin:location.origin,
    state:localStorage.getItem('tb_v41_state')||'',
    logs:localStorage.getItem('tb_v4_logs')||''};
  var blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='战术板备份-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}
function importData(f){
  if(!f) return;
  var r=new FileReader();
  r.onload=function(){
    var d;
    try{ d=JSON.parse(r.result); }catch(e){ alert('导入失败：文件不是有效的 JSON'); return; }
    try{ applyBackup(d); }catch(e){ alert('导入失败：'+e.message); return; }
    alert('导入成功，刷新后生效'); location.reload();
  };
  r.onerror=function(){ alert('文件读不出来，可能不是备份文件'); };
  r.readAsText(f);
}
function renderLog(){
  var arr=logs();
  var editing=(LOG_EDIT>=0&&arr[LOG_EDIT])?arr[LOG_EDIT]:null;
  if(!editing&&LOG_EDIT>=0) LOG_EDIT=-1;
  var old=document.getElementById('logtxt');
  var draft=old?old.value:null;
  var selStart=old?old.selectionStart:null;
  var selEnd=old?old.selectionEnd:null;
  var editVal=editing?(draft!=null?draft:editing.txt):'';
  var list=arr.length?arr.map(function(x,i){
    var tm=logTime(x.ts);
    var wx=wxLabel(x.wx);
    var ed=x.edited?'<span class="edtag">已编辑</span>':'';
    return '<div class="lg"><div class="lgx">'+
      '<button class="x copy" data-copylog="'+i+'" aria-label="复制">⧉</button>'+
      '<button class="x edit" data-edit="'+i+'" aria-label="编辑">✎</button>'+
      '<button class="x del" data-del="'+i+'" aria-label="删除">✕</button></div>'+
      '<div class="m">'+tm+' · '+esc(x.home)+' '+esc(x.hs)+':'+esc(x.as)+' '+esc(x.away)+' · '+esc(x.min)+"' · "+esc(x.form)+(wx?' · '+wx:'')+(ed?' '+ed:'')+'</div>'+
      '<div class="c">'+esc(x.txt)+'</div></div>';
  }).join(''):'<div class="lesson"><p>还没有记录。看完一场球写一句判断，赛后回来对照——这是涨球商最快的办法。</p></div>';
  var editBar=editing?'<div class="editbar">正在编辑 '+logTime(editing.ts)+' 的记录；保存会覆盖文字，比分/时间/阵型不变</div>':'';
  var cancelBtn=editing?'<button class="tb" style="width:100%;margin-top:8px;padding:10px" onclick="cancelEdit()">取消编辑</button>':'';
  document.getElementById('log').innerHTML=
    '<div class="sec">复盘日志</div>'+
    '<div class="lesson"><h3>数据存在哪 · 会不会丢</h3>'+
    '<p><b>存在你这台设备的浏览器里</b>，不是存在我这边，也不是云端。对应的地址是 <b>'+location.origin+'</b>。</p>'+
    '<p>所以：<b>关掉网页、电脑重启，都还在</b>；但换一个地址打开（127.0.0.1 ↔ 局域网 IP ↔ 直接双击文件）就是另一份存储，互相看不见。</p>'+
    '<p>会丢的情况只有三种：清浏览器数据、无痕模式、换设备。</p>'+
    '<button class="hbtn2" onclick="copyBackup()">复制备份到剪贴板（手机推荐）</button>'+
    '<button class="tb" style="width:100%;margin-top:8px;padding:10px" onclick="exportData()">下载成 JSON 文件</button>'+
    '<div class="lov" style="margin-top:12px">恢复：把备份内容粘进下面的框，再点导入</div>'+
    '<textarea id="bktext" placeholder="在这里粘贴备份 JSON（整段）" autocomplete="off" autocapitalize="off" spellcheck="false" style="min-height:110px;font-size:11px"></textarea>'+
    '<button class="tb" style="width:100%;margin-top:8px;padding:10px" onclick="importFromText()">从这段内容导入</button>'+
    '<input type="file" id="impfile" accept=".json" style="display:none" onchange="importData(this.files[0])">'+
    '<button class="tb" style="width:100%;margin-top:8px;padding:10px" onclick="document.getElementById(\'impfile\').click()">从 JSON 文件恢复</button>'+
    '<div class="ae">手机上下载的 JSON 会落在「文件管理 → 下载」里；小米的路径是「文件管理 → 手机 → Download」。找不到就用上面的剪贴板方式。</div>'+
    '</div>'+
    '<div class="lesson"><h3>记一条判断</h3>'+
    '<p>不用写得好，写下来就行。会自动记录当前的对阵、比分、时间、阵型。</p>'+
    editBar+
    '<textarea id="logtxt" placeholder="例：我觉得曼联这场右路会被打穿，因为达洛特压上后身后没人补。">'+esc(editVal)+'</textarea>'+
    '<button class="hbtn2" onclick="saveLog()">'+(editing?'保存修改':'保存这条判断')+'</button>'+
    cancelBtn+
    '<div class="eg">'+S.home+' vs '+S.away+' · '+S.hs+':'+S.as+' · '+S.minute+"' · "+formOf(S.home)+'</div></div>'+
    '<div class="sec">历史（'+arr.length+'）</div>'+list;
  if(editing){
    var t2=document.getElementById('logtxt');
    if(t2){
      t2.focus();
      if(selStart!=null&&selEnd!=null){
        try{ t2.setSelectionRange(Math.min(selStart,t2.value.length),Math.min(selEnd,t2.value.length)); }catch(e){}
      }
    }
  }
}

/* ---------------- 教练卡 v5（换帅 · 问题一-7 排阵） ----------------
   ① 9 轴参数（原4轴+进攻宽度/传球节奏/逼抢方向/反击倾向/传中倾向，0-3）
   ② 结构特征 16 标签 · ③ 阵型 · ④ 三阶段独立参数（持球/无球/转换）
   ⑤ 关键位置角色&权限 · ⑥ 临场情景策略 · ⑦ 学习辅助（AI 速览）· ⑧ 匹配球员
   PROFILE/STYLE_FIX 全部进 save() 持久化 */
var CE=null;
var PROFILE={};
var AXES=[
 ['press','压迫强度','逼抢有多凶'],['control','控球意愿','想把球留在脚下'],
 ['direct','直接程度','一脚打身后的比例'],['low','低位倾向','愿不愿意退着踢'],
 ['width','进攻宽度','0 紧凑收缩 · 3 充分拉开'],['tempo','传球节奏','0 慢速耐心倒脚 · 3 快速一脚出球'],
 ['pressdir','逼抢方向','0 封锁传球线路 · 3 主动上抢持球人'],['counter','反击倾向','0 优先控球落位 · 3 丢球快速反击'],
 ['cross','传中倾向','0 优先地面渗透 · 3 频繁起球传中']];
var CFLAGS=[['fbin','边后卫内收','压上时变中场人数'],['single6','单后腰','只留一个 6 号'],
 ['highline','高位防线','防线压到中场'],['target9','支点中锋','中锋背身做墙'],
 ['gkbuild','门将出球','门将参与后场倒脚'],
 ['wcut','边锋内切','逆足边锋走肋部'],['wdown','边锋下底','顺足边锋走底线'],
 ['double6','双后腰','双 6 号保护中路'],['dpl','拖后组织核心','后撤发牌人'],
 ['trap','压迫陷阱','故意放一边再围抢'],['manmark','人盯人防守','贴身跟人'],
 ['zone','区域联防','守区域不追人'],['overlap','边路套边轮换','边卫套边、边锋内收换位'],
 ['laterun','二点后插上','中场 late run 进禁区'],['rotate','球员换位轮换','前场自由换位'],
 ['sidelean','主攻侧倾','明显偏重一条边']];
var PERMS=[['back','后卫带球向前','0 只解围 · 3 敢带出防线'],['midshot','中场远射','0 禁止 · 3 鼓励起脚'],
 ['fwdrop','前锋回撤接球','0 顶住防线 · 3 频繁回撤做球']];
var PHASES=[['hold','持球阶段','我们控球时'],['none','无球阶段','对手控球时'],['trans','攻防转换','丢球/断球瞬间']];
var CE_TAB='base';

function defaultAxes(src){
  src=src||{};
  return {press:src.press!=null?src.press:2, control:src.control!=null?src.control:2,
    direct:src.direct!=null?src.direct:2, low:src.low!=null?src.low:1,
    width:src.width!=null?src.width:2, tempo:src.tempo!=null?src.tempo:2,
    pressdir:src.pressdir!=null?src.pressdir:2, counter:src.counter!=null?src.counter:2,
    cross:src.cross!=null?src.cross:2};
}
function openCoach(team){
  var pf=PROFILE[team]||{};
  var st=styleOf(team);
  CE={team:team,
      axes:defaultAxes(pf.axes||st),
      flags:Object.assign({},pf.flags||{}),
      form:formOf(team),
      coach:pf.coach||((CARD[team]&&CARD[team].mgr)||''),
      roles:pf.roles||'', perm:Object.assign({back:1,midshot:1,fwdrop:1},pf.perm||{}),
      scenario:Object.assign({lead:'',trail:'',sub:'',fit:''},pf.scenario||{}),
      text:pf.text||'', src:pf.src||'',
      usePhase:!!pf.usePhase,
      phase:{hold:defaultAxes(pf.phase&&pf.phase.hold),none:defaultAxes(pf.phase&&pf.phase.none),trans:defaultAxes(pf.phase&&pf.phase.trans)},
      phaseTab:'hold'};
  CE_TAB='base';
  drawCoach();
}
function ceAxisRows(axes,attr,prefix){
  return AXES.map(function(r){
    var btns=[0,1,2,3].map(function(v){
      return '<button class="fchip '+(axes[r[0]]===v?'on':'')+'" data-'+attr+'="'+r[0]+'" data-v="'+v+'">'+v+'</button>';
    }).join('');
    return '<div class="caxrow"><div class="cl">'+r[1]+' <span class="mut">'+r[2]+'</span></div>'
      +'<div class="cbtns">'+btns+'</div></div>';
  }).join('');
}
function drawCoach(){
  if(!CE) return;
  var team=CE.team, pf=PROFILE[team]||{};
  var tabs=[['base','① 基础'],['phase','② 三阶段'],['role','③ 角色与临场'],['learn','④ AI 辅助']]
    .map(function(t){ return '<button class="'+(CE_TAB===t[0]?'on':'')+'" data-ctab="'+t[0]+'">'+t[1]+'</button>'; }).join('');
  var body='';
  if(CE_TAB==='base'){
    var forms=BASE_FORMS.map(function(f){
      return '<button class="fchip '+(CE.form===f?'on':'')+'" data-cf="'+f+'">'+f+'</button>';}).join('');
    var flags=CFLAGS.map(function(f){
      return '<button class="fchip '+(CE.flags[f[0]]?'on':'')+'" data-cflag="'+f[0]+'" title="'+esc(f[2])+'">'+f[1]+'</button>';}).join('');
    body='<div class="lov">主教练（只填名字=AI 会参考他真实惯用打法；写下你的想法=你的描述优先级最高）</div>'
      +'<input class="ctext" id="ceCoach" placeholder="例：卡里克 / 只写名字即可" value="'+esc(CE.coach)+'">'
      +'<div class="lov">① 九轴参数（0=不要 3=极致；给引擎与 AI 共用）</div>'+ceAxisRows(CE.axes,'ceax')
      +'<div class="lov">② 结构特征（16 选）</div><div class="frow" style="margin:0;flex-wrap:wrap">'+flags+'</div>'
      +'<div class="lov">③ 阵型</div><div class="frow" style="margin:0">'+forms+'</div>'
      +'<div class="lov">④ 你的战术要求（最高优先级，可推翻一切）</div>'
      +'<textarea class="ctext" id="ceText" style="min-height:56px" placeholder="例：要求边后卫内收进中场，丢球后 5 秒内反抢；讨厌长传冲吊。">'+esc(CE.text)+'</textarea>'
      +'<div class="lov">⑤ 出处（你从哪知道的，别凭印象）</div>'
      +'<input class="ctext" id="ceSrc" placeholder="例：官网公告 / The Athletic 长文 / 公开采访" value="'+esc(CE.src)+'">'
      +'<button class="hbtn2" onclick="applyCoach()">应用并重排阵容</button>';
  }else if(CE_TAB==='phase'){
    var sub=PHASES.map(function(p){
      return '<button class="fchip '+(CE.phaseTab===p[0]?'on':'')+'" data-cphase="'+p[0]+'">'+p[1]+'</button>';}).join('');
    var ph=PHASES.filter(function(p){return p[0]===CE.phaseTab;})[0];
    body='<div class="lov">三阶段独立参数（每组一套 9 轴；教练口述可改写一切）</div>'
      +'<label class="tbai-sw" style="margin:4px 0"><input type="checkbox" '+(CE.usePhase?'checked':'')+' onchange="toggleCEPhase(this.checked)"> 启用三阶段独立参数（不启用则全程用①的 9 轴）</label>'
      +'<div class="ctabs">'+sub+'</div>'
      +'<div class="mut" style="margin:2px 0 6px">'+ph[1]+' · '+ph[2]+'</div>'
      +ceAxisRows(CE.phase[CE.phaseTab],'cephax');
    if(CE.usePhase){
      body+='<div class="ae">对齐说明：阵型库的三阶段分工=基础规则库，这里的口述可以改写跑位要求；AI 推演时会读这一组。</div>';
    }
  }else if(CE_TAB==='role'){
    body='<div class="lov">关键位置角色设定（AI 会按这个检查球员适配）</div>'
      +'<textarea class="ctext" id="ceRoles" style="min-height:64px" placeholder="例：6号=纯破坏型不出球；右后卫=套边传中手；10号=自由人，允许左右横移。">'+esc(CE.roles)+'</textarea>'
      +'<div class="lov">权限指令（0=禁止 · 3=放开）</div>'
      +PERMS.map(function(r){
        var btns=[0,1,2,3].map(function(v){
          return '<button class="fchip '+(CE.perm[r[0]]===v?'on':'')+'" data-cperm="'+r[0]+'" data-v="'+v+'">'+v+'</button>';}).join('');
        return '<div class="caxrow"><div class="cl">'+r[1]+' <span class="mut">'+r[2]+'</span></div><div class="cbtns">'+btns+'</div></div>';
      }).join('')
      +'<div class="lov">临场情景策略</div>'
      +'<div class="mut">领先时</div><textarea class="ctext" id="ceLead" placeholder="例：60 分钟换下边锋上防守型中场，收成 4-5-1">'+esc(CE.scenario.lead)+'</textarea>'
      +'<div class="mut">落后时</div><textarea class="ctext" id="ceTrail" placeholder="例：65 分钟前就变搏命，边后卫全压上">'+esc(CE.scenario.trail)+'</textarea>'
      +'<div class="mut">换人偏好</div><textarea class="ctext" id="ceSub" placeholder="例：先换体能最低的边路；不轻易动中卫">'+esc(CE.scenario.sub)+'</textarea>'
      +'<div class="mut">体能阈值联动</div><textarea class="ctext" id="ceFit" placeholder="例：跑动型边卫 70 分钟必换；老将 60 分钟开始轮换">'+esc(CE.scenario.fit)+'</textarea>'
      +'<button class="hbtn2" onclick="applyCoach()">应用并重排阵容</button>';
  }else{ /* learn */
    var info=(window.AI&&AI.coachInfo&&AI.coachInfo[team])||null;
    body='<div class="lov">学习辅助 · AI 体系速览</div>'
      +'<div class="mut" style="margin-bottom:6px">主教练：'+esc(CE.coach||'未填（AI 会按「'+esc(team)+' 主教练」搜索）')+' · 你的口述优先级最高。生成：风格归类 / 克制被克制 / 样板比赛。</div>'
      +'<button class="hbtn2" data-ai="coachinfo" data-team="'+esc(team)+'">'+(info?'重新生成体系速览':'AI 生成体系速览')+'</button>'
      +'<div id="cInfo" class="aisec">'+ceInfoHtml(info,AI&&AI.coachInfoBusy===team)+'</div>'
      +'<div class="lov" style="margin-top:12px">匹配球员 · 按这套战术在球员库里选人</div>'
      +'<button class="hbtn2" data-ai="match" data-team="'+esc(team)+'">'+(AI&&AI.matchTeam===team&&AI.matchBusy?'匹配中…':'▶ 开始匹配球员')+'</button>'
      +'<div id="cMatch" class="aisec">'+(AI&&AI.matchTeam===team?'':(pf.lastMatch?ceMatchHtml(pf.lastMatch):''))+'</div>';
  }
  $('#sheet').innerHTML='<div class="sheetIn"><div class="sh"><b>教练卡 · '+esc(team)+'</b>'
    +'<button class="x" onclick="closeSheet()">✕</button></div>'
    +'<div class="ctabs">'+tabs+'</div>'+body+'</div>';
  $('#sheet').classList.add('on');
  if(CE_TAB==='learn'&&AI&&AI.matchTeam===team) drawCoachMatchView();
}
function ceInfoHtml(info,busy){
  if(busy) return '<div class="lov">'+esc((AI&&AI.coachInfoStage)||'生成中…')+'</div>';
  if(!info) return '';
  return '<div class="ac l0"><div class="ah"><span class="tag">'+esc(info.style||'风格归类')+'</span>'
    +'<span class="lv"><span class="aibadge">AI</span>'+confTag(info.conf||'infer')+'</span></div>'
    +(info.summary?'<div class="at md">'+mdToHtml(info.summary)+'</div>':'')
    +((info.counters||[]).length?'<div class="ae"><b>克制：</b>'+esc(info.counters.join('；'))+'</div>':'')
    +((info.weakTo||[]).length?'<div class="ae"><b>被克制：</b>'+esc(info.weakTo.join('；'))+'</div>':'')
    +((info.samples||[]).length?'<div class="ae"><b>样板比赛：</b>'+esc(info.samples.join('；'))+'</div>':'')
    +(info.src?'<div class="ae"><b>依据：</b>'+esc(info.src)+'</div>':'')
    +'</div>';
}
function ceMatchHtml(list){
  return '<div class="lov">适配结果（分高在前）</div>'+list.map(function(m){
    return '<div class="matchli"><span><b>'+esc(m.n)+'</b> <span class="mut">'+esc(m.pos)+'</span><br>'
      +'<span class="mut">'+esc(m.why)+'</span>'+(m.risk?'<br><span class="rk">⚠ '+esc(m.risk)+'</span>':'')+'</span>'
      +'<span class="sc">'+m.score+'</span></div>';
  }).join('');
}
function setCE(k,v){ if(CE){ CE.axes[k]=v; } }
function setCEPhase(k,v){ if(CE){ CE.phase[CE.phaseTab][k]=v; } }
function setCEPerm(k,v){ if(CE){ CE.perm[k]=v; } }
function setCF(f){ if(CE){ CE.form=f; drawCoach(); } }
function setCETab(t){ CE_TAB=t; drawCoach(); }
function setCEPhaseTab(t){ if(CE){ CE.phaseTab=t; drawCoach(); } }
function toggleCEPhase(on){ if(CE){ CE.usePhase=on; } }
async function applyCoach(){
  if(!CE) return;
  var t=CE.team;
  var cc=document.getElementById('ceCoach'), tx=document.getElementById('ceText'),
      sr=document.getElementById('ceSrc'), rl=document.getElementById('ceRoles'),
      ld=document.getElementById('ceLead'), tr=document.getElementById('ceTrail'),
      sb=document.getElementById('ceSub'), ft=document.getElementById('ceFit');
  var axes=Object.assign({},CE.axes);
  STYLE_FIX[t]=axes;
  FORM_OVERRIDE[t]=CE.form;
  FORM_SEL[t]=CE.form;
  PROFILE[t]={coach:(cc?cc.value.trim():'')||CE.coach, axes:axes, flags:CE.flags,
    perm:CE.perm, roles:(rl?rl.value.trim():''),
    scenario:{lead:ld?ld.value.trim():CE.scenario.lead, trail:tr?tr.value.trim():CE.scenario.trail,
      sub:sb?sb.value.trim():CE.scenario.sub, fit:ft?ft.value.trim():CE.scenario.fit},
    text:(tx?tx.value.trim():''), src:(sr?sr.value.trim():''),
    usePhase:CE.usePhase, phase:CE.phase,
    lastMatch:PROFILE[t]&&PROFILE[t].lastMatch?PROFILE[t].lastMatch:null};
  var before=(S.lineup[t]||[]).slice();
  var after=autoLineup(t);
  S.lineup[t]=after;
  var bset={},aset={};
  before.forEach(function(n){ if(n) bset[n]=1; });
  after.forEach(function(n){ if(n) aset[n]=1; });
  var inN=after.filter(function(n){ return n&&!bset[n]; });
  var outN=before.filter(function(n){ return n&&!aset[n]; });
  S.coachNote={team:t,form:CE.form,in:inN,out:outN,
    style:{press:axes.press,control:axes.control,direct:axes.direct,low:axes.low},
    text:PROFILE[t].text,src:PROFILE[t].src,flags:CE.flags,
    coach:PROFILE[t].coach};
  var wasCE=CE; CE=null; closeSheet(); renderAll(); save();
  switchTab('analysis');
}
function coachNoteCard(){
  var c=S.coachNote; if(!c) return '';
  var st=c.style, tips=[];
  if(st.press>=3) tips.push('高位压迫：边锋和边后卫的跑动量要求暴涨，慢中卫会被暴露');
  if(st.control>=3) tips.push('控球为主：组织型中场升值，纯破坏型中场贬值');
  if(st.low>=2) tips.push('愿意退守：防守型中场和中卫升值，前锋变成反击支点');
  if(st.direct>=3) tips.push('直接打法：速度型前锋升值，控球型中场贬值');
  if(!tips.length) tips.push('这套体系比较均衡，阵容变化不会太大');
  return '<div class="ac l1"><div class="ah"><span class="tag">换帅影响 · '+esc(c.team)+'</span>'
    +'<span class="lv">'+esc(c.form||'')+(c.coach?' · '+esc(c.coach):'')+confTag(c.src?'fact':'guess')+'</span></div>'
    +'<div class="at">'
      +(c.in.length?'新体系下首发变化：<b style="color:#8ef0b3">↑ '+esc(c.in.join('、'))+'</b><br>':'')
      +(c.out.length?'<b style="color:#ffb4b7">↓ '+esc(c.out.join('、'))+'</b>':'')
      +(c.in.length||c.out.length?'':'首发没有变化，说明这套人员对新体系是适配的。')
    +'</div>'
    +'<div class="pl"><b>人话：</b>换了教练，先动的是他的要求，不是球员的能力。</div>'
    +(c.flags&&Object.keys(c.flags).filter(function(k){return c.flags[k];}).length?
      '<div class="ae"><b>结构：</b>'+Object.keys(c.flags).filter(function(k){return c.flags[k];})
        .map(function(k){ var f=CFLAGS.filter(function(x){return x[0]===k;})[0]; return f?f[1]:k; }).join(' · ')+'</div>':'')
    +(c.text?'<div class="ae"><b>他的要求：</b>'+esc(c.text)+'</div>':'')
    +'<div class="ae"><b>出处：</b>'+(c.src?esc(c.src):'<span style="color:#f0b429">未核实——这张卡目前只是推测，别当权威用</span>')+'</div>'
    +'<div class="ae">'+tips.map(function(x){return '· '+esc(x);}).join('<br>')+'</div></div>';
}

/* ---------------- AI 补全本队资料（中文名/一句话特点/惯用脚，问题八/十） ----------------
   只处理 ESPN 来源且未补全的球员；结果写入 tb_player_cache（搜索板块同款缓存），下次启动自动回写 */
async function aiEnrichTeam(team){
  if(!aiReady()){ AI.err='还没配置 AI：点右上角「⚙ AI 设置」'; renderSetup(); return; }
  var targets=(POOL[team]||[]).filter(function(p){ return p._espn&&!p._enriched&&/^[A-Za-z]/.test(p.n); });
  if(!targets.length){ AI.enrMsg=team+' 没有需要补全的球员'; renderSetup(); return; }
  AI.enrBusy=team; AI.enrMsg='AI 补全 '+team+' '+targets.length+' 人中…'; renderSetup();
  try{
    var cfg=TBSettings.cfg();
    var sys='你是足球资料编辑。给一份球队名单，输出每个球员的中文译名/一句话技术特点/惯用脚。'
      +'纪律：译名用中文媒体通用译名；技术特点基于你对该球员的真实了解（15字内，如「套边传中型左后卫」）；'
      +'惯用脚只在有把握时写（左/右/双），没把握写 null——错值比空值危害大。'
      +'只输出 JSON 数组：[{"en":"原英文名","zh":"中文名","st":"特点或null","foot":"左/右/双/null"}]，不要 markdown。'
      +'可联网核对 1-2 次（该队最新阵容新闻），够了就停。';
    var user=team+' 名单：\n'+targets.map(function(p){ return p.n+' ('+(p.pos||[]).join('/')+(p.num?', #'+p.num:'')+')'; }).join('\n');
    var res=await aiAgentRun(sys,user,function(){});
    var arr=TBAgent.extractJSON(res.content);
    if(!Array.isArray(arr)) throw new Error('模型没有返回有效 JSON');
    var cache={}; try{ cache=JSON.parse(localStorage.getItem('tb_player_cache')||'{}'); }catch(e){}
    var done=0;
    arr.forEach(function(m){
      if(!m||!m.en||!m.zh) return;
      var p=targets.find(function(t){ return t.n.toLowerCase()===String(m.en).toLowerCase(); });
      if(!p) return;
      p.n=m.zh; if(m.st) p.st=m.st;
      if(m.foot==='左'||m.foot==='右'||m.foot==='双') p.foot=m.foot;
      p._enriched=true; byName[p.n]=p; done++;
      cache[String(m.en).toLowerCase()]={n:m.zh,en:[m.en],pos:p.pos,foot:p.foot,st:p.st||'',
        club:team,nat:p.nat||'',age:p.age||null,num:p.num||null,tags:[],ts:Date.now()};
    });
    try{ localStorage.setItem('tb_player_cache',JSON.stringify(cache)); }catch(e){}
    AI.enrMsg=team+' 补全完成 '+done+'/'+targets.length+' 人';
  }catch(e){ AI.enrMsg='补全失败：'+(e&&e.message); }
  finally{ AI.enrBusy=null; renderAll(); renderSetup(); save(); }
}
function aiEnrichBoth(){
  aiEnrichTeam(S.home).then(function(){ return aiEnrichTeam(S.away); });
}

/* ---------------- 事件委托 ---------------- */
document.addEventListener('click',function(e){
  /* 拖拽落位后的那次 click 不当作点击棋子 */
  if(window.__tbDragMoved){ window.__tbDragMoved=false; e.preventDefault(); return; }
  var t=e.target;
  var tb=t.closest?t.closest('#tabs button'):null;
  if(tb){ switchTab(tb.getAttribute('data-tab')); return; }
  var ed=t.closest?t.closest('[data-edit]'):null;
  if(ed){ editLog(Number(ed.getAttribute('data-edit'))); return; }
  var cp=t.closest?t.closest('[data-copylog]'):null;
  if(cp){ copyLog(Number(cp.getAttribute('data-copylog'))); return; }
  var dl=t.closest?t.closest('[data-del]'):null;
  if(dl){ delLog(Number(dl.getAttribute('data-del'))); return; }
  var tx=t.closest?t.closest('[data-tax]'):null;
  if(tx){ setTax(tx.getAttribute('data-tax'),tx.getAttribute('data-v')); return; }
  var dr=t.closest?t.closest('[data-dir]'):null;
  if(dr){ setDir(dr.getAttribute('data-dir'),dr.getAttribute('data-v')); return; }
  var plb=t.closest?t.closest('[data-play]'):null;
  if(plb){ setPlay(plb.getAttribute('data-play'),plb.getAttribute('data-v')); return; }
  var aiAct=t.closest?t.closest('[data-ai]'):null;
  if(aiAct){
    var a=aiAct.getAttribute('data-ai');
    if(a==='cfg'){ TBSettings.open(); return; }
    if(a==='run'){ aiRun(); return; }
    if(a==='pre'){ aiRunPrematch(true); return; }
    if(a==='terms'){ aiRunTerms(); return; }
    if(a==='recform'){ openRecForm(); return; }
    if(a==='match'){ aiMatchPlayers(aiAct.getAttribute('data-team')||CE&&CE.team); return; }
    if(a==='coachinfo'){ aiCoachInfo(aiAct.getAttribute('data-team')||CE&&CE.team); return; }
    return;
  }
  var stg=t.closest?t.closest('[data-subtag]'):null;
  if(stg){
    var shIn=stg.closest('.sheetIn');
    if(shIn&&shIn.dataset.team){ SUB_TAG[shIn.dataset.team]=stg.dataset.subtag; }
    $$('.sheetIn [data-subtag]').forEach(function(x){ x.classList.toggle('on',x===stg); });
    return;
  }
  var bn=t.closest?t.closest('[data-bench]'):null;
  if(bn){ openBench(bn.getAttribute('data-bench')); return; }
  var evb=t.closest?t.closest('[data-events]'):null;
  if(evb){ openEvents(evb.getAttribute('data-events')); return; }
  var cb=t.closest?t.closest('[data-coach]'):null;
  if(cb){ openCoach(cb.getAttribute('data-coach')); return; }
  var cfl=t.closest?t.closest('[data-cflag]'):null;
  if(cfl){ var k=cfl.getAttribute('data-cflag'); CE.flags[k]=!CE.flags[k]; drawCoach(); return; }
  var ce=t.closest?t.closest('[data-ceax]'):null;
  if(ce){ setCE(ce.getAttribute('data-ceax'),Number(ce.getAttribute('data-v'))); return; }
  var ceph=t.closest?t.closest('[data-cephax]'):null;
  if(ceph){ setCEPhase(ceph.getAttribute('data-cephax'),Number(ceph.getAttribute('data-v'))); return; }
  var cpm=t.closest?t.closest('[data-cperm]'):null;
  if(cpm){ setCEPerm(cpm.getAttribute('data-cperm'),Number(cpm.getAttribute('data-v'))); return; }
  var ctb=t.closest?t.closest('[data-ctab]'):null;
  if(ctb){ setCETab(ctb.getAttribute('data-ctab')); return; }
  var cph=t.closest?t.closest('[data-cphase]'):null;
  if(cph){ setCEPhaseTab(cph.getAttribute('data-cphase')); return; }
  var cf=t.closest?t.closest('[data-cf]'):null;
  if(cf){ setCF(cf.getAttribute('data-cf')); return; }
  var tm=t.closest?t.closest('[data-term]'):null;
  if(tm){ openTerm(tm.getAttribute('data-term')); return; }
  var ld=t.closest?t.closest('[data-lead]'):null;
  if(ld){ toggleLead(ld.getAttribute('data-lead')); return; }
  var dp=t.closest?t.closest('[data-desp]'):null;
  if(dp){ toggleDesperate(dp.getAttribute('data-desp')); return; }
  var ps=t.closest?t.closest('[data-poss]'):null;
  if(ps){ togglePoss(ps.getAttribute('data-poss')); return; }
  var fc=t.closest?t.closest('.fchip[data-form]'):null;
  if(fc){ changeForm(fc.getAttribute('data-team'),fc.getAttribute('data-form')); return; }
  var tk=t.closest?t.closest('.tk'):null;
  if(tk){ openSheet(tk.getAttribute('data-w'),Number(tk.getAttribute('data-i')),tk.getAttribute('data-pos')); return; }
  var stb=t.closest?t.closest('.st'):null;
  if(stb){ setSt(stb.getAttribute('data-n'),stb.getAttribute('data-st')); return; }
  var pick=t.closest?t.closest('[data-pick]'):null;
  if(pick){ var sh=document.getElementById('sheet');
    setSlot(sh.dataset.wi,Number(sh.dataset.idx),pick.getAttribute('data-pick')); return; }
  var nul=t.closest?t.closest('[data-slotnull]'):null;
  if(nul){ var sh2=document.getElementById('sheet');
    setSlot(sh2.dataset.wi,Number(sh2.dataset.idx),null); return; }
  if(e.target.id==='sheet') closeSheet();
});


/* ================= AI 分析层 v5（TBAgent · 联网搜索 · 双视角） =================
   问题五：全项目共用全局设置（TBSettings，右上角 ⚙）。
   重点三：分析可联网搜索最新信息（伤停/状态/新闻），信源纪律按《数据更新手册》。
   三类独立缓存：比赛分析 / 赛前分析 / 本场术语 —— 各自指纹，改了什么就标什么过期。 */
var AI={busy:false,preBusy:false,termsBusy:false,matchBusy:false,
  cards:null,fp:'',preCards:null,preFp:'',terms:null,termsFp:'',
  partial:'',stage:'',err:'',startedAt:0};
var AI_CACHE='tb_ai_cache_v5';

function aiReady(){ return !!(window.TBSettings&&TBSettings.ready()); }
function aiSearchOn(){ return !!(TBSettings.cfg().search&&window.TBWebTools&&TBWebTools.available()); }
function aiCacheLoad(){ try{ var d=JSON.parse(localStorage.getItem(AI_CACHE)||'null');
  if(d){ AI.cards=d.cards||null; AI.fp=d.fp||''; AI.preCards=d.preCards||null; AI.preFp=d.preFp||'';
         AI.terms=d.terms||null; AI.termsFp=d.termsFp||''; } }catch(e){} }
function aiCacheSave(){ try{ localStorage.setItem(AI_CACHE,JSON.stringify({
  cards:AI.cards,fp:AI.fp,preCards:AI.preCards,preFp:AI.preFp,terms:AI.terms,termsFp:AI.termsFp})); }catch(e){} }

/* ---------- Markdown（够用即可：标题/加粗/列表/代码/引用） ---------- */
function mdSafe(s){ return String(s==null?'':s); }
function mdToHtml(md){
  var src=mdSafe(md).replace(/\r/g,'');
  var codeBlocks=[];
  src=src.replace(/```([a-zA-Z]*)\n([\s\S]*?)```/g,function(_,lang,code){
    codeBlocks.push(code); return '\u0000CB'+(codeBlocks.length-1)+'\u0000';
  });
  var lines=src.split('\n'), out=[], list=null;
  function inline(t){
    return t
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>')
      .replace(/`([^`]+)`/g,'<code>$1</code>')
      .replace(/\*([^*]+)\*/g,'<i>$1</i>');
  }
  function closeList(){ if(list){ out.push('</'+list+'>'); list=null; } }
  lines.forEach(function(ln){
    var m;
    if(/^\s*$/.test(ln)){ closeList(); return; }
    if((m=/^(#{1,4})\s+(.*)$/.exec(ln))){ closeList(); out.push('<div class="mdh mdh'+m[1].length+'">'+inline(m[2])+'</div>'); return; }
    if((m=/^\s*[-*]\s+(.*)$/.exec(ln))){ if(list!=='ul'){ closeList(); out.push('<ul>'); list='ul'; } out.push('<li>'+inline(m[1])+'</li>'); return; }
    if((m=/^\s*\d+[.)]\s+(.*)$/.exec(ln))){ if(list!=='ol'){ closeList(); out.push('<ol>'); list='ol'; } out.push('<li>'+inline(m[1])+'</li>'); return; }
    if((m=/^>\s?(.*)$/.exec(ln))){ closeList(); out.push('<blockquote>'+inline(m[1])+'</blockquote>'); return; }
    if(/^\s*(---|\*\*\*)\s*$/.test(ln)){ closeList(); out.push('<hr>'); return; }
    if((m=/^\u0000CB(\d+)\u0000$/.exec(ln.trim()))){ closeList(); out.push('<pre class="mdpre">'+codeBlocks[+m[1]].replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</pre>'); return; }
    closeList(); out.push('<p>'+inline(ln)+'</p>');
  });
  closeList();
  return out.join('');
}

/* ---------- 指纹：阵容/状态/比分/时间/天气/姿态/主攻/打法/控球率/教练档案/换人/站位区/口述 ---------- */
function aiFingerprint(){
  var parts=[S.home,S.away,formOf(S.home),formOf(S.away),
    (S.lineup[S.home]||[]).join(','),(S.lineup[S.away]||[]).join(','),
    JSON.stringify(S.status||{}),S.minute,S.hs,S.as,S.weather,
    JSON.stringify(S.tactic||{}),JSON.stringify(S.poss||{}),JSON.stringify(S.dir||{}),
    playOf(S.home),playOf(S.away),possRateOf(S.home),possRateOf(S.away),
    JSON.stringify(PROFILE[S.home]||{}),JSON.stringify(PROFILE[S.away]||{}),
    JSON.stringify((S.events||[]).filter(function(e){return e.type==='sub';}).map(function(e){return e.min+':'+e.out+'>'+e.in;})),
    JSON.stringify(S.boardPos||{}),S.oral||''];
  var str=parts.join('|'), h=5381;
  for(var i=0;i<str.length;i++){ h=((h<<5)+h+str.charCodeAt(i))|0; }
  return (h>>>0).toString(36)+'-'+str.length.toString(36);
}
function aiPreFingerprint(){
  if(!S.confirmed) return '';
  var parts=['pre',S.confirmed.home,S.confirmed.away,S.confirmed.formH,S.confirmed.formA,
    S.confirmed.h.join(','),S.confirmed.a.join(','),S.weather,
    playOf(S.confirmed.home),playOf(S.confirmed.away),
    possRateOf(S.confirmed.home),possRateOf(S.confirmed.away),
    JSON.stringify(PROFILE[S.confirmed.home]||{}),JSON.stringify(PROFILE[S.confirmed.away]||{}),
    S.oral||''];
  var str=parts.join('|'), h=5381;
  for(var i=0;i<str.length;i++){ h=((h<<5)+h+str.charCodeAt(i))|0; }
  return (h>>>0).toString(36)+'-'+str.length.toString(36);
}

/* ---------- 上下文：当前局面压成 JSON 给模型 ---------- */
function aiCtxTeam(name){
  var form=formOf(name), lu=S.lineup[name]||autoLineup(name);
  var slots=FORMS[form]||FORMS['4-2-3-1'];
  var xi=lu.map(function(n,i){
    var p=n?byName[n]:null, lab=slots[i]?slots[i][0]:'?';
    if(!p) return null;
    return lab+':'+p.n+'('+(p.pos||[]).join('/')+', '+(p.foot||'?')+'脚'+(p.age?', '+p.age+'岁':'')+
      (p.tags&&p.tags.length?', '+p.tags.join('/'):'')+
      (p.a?', 速度'+p.a.pace+' 出球'+p.a.pass+' 防守'+p.a.def+' 争顶'+p.a.air+' 终结'+p.a.fin:'')+')';
  }).filter(Boolean);
  var bench=(POOL[name]||[]).filter(function(p){ return lu.indexOf(p.n)<0 && !hurt(p); })
    .slice(0,12).map(function(p){ return p.n+'('+(p.pos||[]).join('/')+(p.age?','+p.age+'岁':'')+(p.st?','+p.st:'')+')'; });
  var pf=PROFILE[name]||{};
  return {
    team:name, form:form, coach:coachOf(name), dna:styleOf(name),
    tax:taxOf(name), possForm:possOn(name), dir:DIR_NAME[dirOf(name)]||'均衡',
    play:playOf(name)||'未选择', possRate:possRateOf(name)+'%',
    profile:pf&&pf.axes?{axes:pf.axes,flags:pf.flags,perm:pf.perm,roles:pf.roles,
      scenario:pf.scenario,text:pf.text,src:pf.src,usePhase:!!pf.usePhase,phase:pf.usePhase?pf.phase:undefined}:{},
    xi:xi, bench:bench, style:styleOf(name)
  };
}
function aiContext(){
  var H=aiCtxTeam(S.home), A=aiCtxTeam(S.away);
  var evs=(S.events||[]).map(function(e){
    var t=e.type==='sub'?('换人['+(e.tag||'对位替换')+'] '+e.out+'→'+e.in)
      :e.type==='yellow'?'黄牌 '+e.who
      :e.type==='red'?'红牌罚下 '+e.who
      :e.type==='injury'?'伤退 '+e.who
      :e.type==='formation'?'临场变阵 '+e.note
      :e.type==='press'?'压迫切换：'+e.who
      :e.type==='setpiece'?'定位球事件：'+e.note
      :('标记 '+e.who+' '+e.mark);
    return e.min+"' "+e.team+' '+t;
  });
  var d=S.hs-S.as, tendency='平局均势';
  if(d>0) tendency=(S.minute>=75?'领先且时间不多：大概率收缩防守/换防守型球员':(S.minute>=60?'领先：开始做减法':'领先：暂不收缩'));
  else if(d<0) tendency=(S.minute>=75?'落后且时间不多：全力强攻/搏命':'落后：需要提速与冒险');
  var snaps=S.snaps.map(function(x,i,arr){
    var prev=i>0?arr[i-1]:null;
    var d1=prev?{wing:+(x.m.wing-prev.m.wing).toFixed(1),mid:+(x.m.mid-prev.m.mid).toFixed(1),def:+(x.m.def-prev.m.def).toFixed(1),behind:+(x.m.behind-prev.m.behind).toFixed(1),air:+(x.m.air-prev.m.air).toFixed(1),build:+(x.m.build-prev.m.build).toFixed(1)}:null;
    return {min:x.min,score:x.hs+':'+x.as,formH:x.formH,formA:x.formA,
      metrics:{wing:x.m.wing,mid:x.m.mid,def:x.m.def,behind:x.m.behind,air:+x.m.air.toFixed(0),build:x.m.build},
      vsPrev:d1,note:x.note||''};
  });
  var benchOf=function(t){ return (S.bench[t]&&S.bench[t].length)?S.bench[t]:null; };
  return {home:H,away:A,minute:S.minute,score:S.hs+':'+S.as,scoreTendency:tendency,
    weather:S.weather==='rain'?'雨':'晴',events:evs,confirmedXI:!!S.confirmed,
    redsHome:(S.events||[]).filter(function(e){return e.type==='red'&&e.team===S.home;}).map(function(e){return e.who;}),
    redsAway:(S.events||[]).filter(function(e){return e.type==='red'&&e.team===S.away;}).map(function(e){return e.who;}),
    benchHome:benchOf(S.home),benchAway:benchOf(S.away),snapshots:snaps,
    zonesHome:zonesSummary(S.home),zonesAway:zonesSummary(S.away),oral:S.oral||''};
}

/* ---------- Agent 调用封装 ---------- */
function aiAgentRun(sys,user,onStage){
  var cfg=TBSettings.cfg();
  return TBAgent.run({
    base:cfg.base, key:TBSettings.aiKey(), model:cfg.model,
    system:sys, messages:[{role:'user',content:user}],
    tools:aiSearchOn()?['web_search','web_fetch']:[],
    maxSteps:6, temp:cfg.temp, maxTokens:cfg.tokens,
    onEvent:function(evt){
      if(!onStage) return;
      if(evt.type==='step_start') onStage('第 '+evt.step+' 步：模型推理');
      else if(evt.type==='tool_call') onStage('第 '+evt.step+' 步：联网查「'+evt.name+'」');
      else if(evt.type==='tool_result') onStage('第 '+evt.step+' 步：搜索完成（'+(evt.ms/1000).toFixed(1)+'s）');
    }
  });
}
/* 卡片公共校验 */
function aiNormCard(c,i){
  return {sec:String(c.sec||'').slice(0,10),area:String(c.area||'分析').slice(0,12),
    lvl:Math.max(0,Math.min(2,Number(c.level)||0)),
    txt:String(c.text||''), p:String(c.plain||''), ev:String(c.why||''),
    x:String(c.falsify||''), c:['fact','infer','guess'].indexOf(c.conf)>=0?c.conf:'infer', w:100-i};
}

/* ---------- ① 比赛分析（双视角 + 全对位 + 换人点评） ---------- */
function aiSysPrompt(){
  return '你是一名英超级战术分析师，为足球学习 App「对位引擎」生成比赛分析。'
  +'规则：\n'
  +'1. 只输出 JSON 数组，不要解释、不要 markdown 代码块。每个元素：\n'
  +'   {"sec":"分区","area":"4-8字小标题","level":0,"text":"60-160字，具体到人名","plain":"15-30字大白话","why":"依据（引用输入数据或搜索结果）","falsify":"这条何时成立不了，20-40字","conf":"fact|infer|guess"}\n'
  +'2. sec（分区）固定用：主队视角 / 客队视角 / 全场对位 / 换人点评。level：0参考 1注意 2红灯。\n'
  +'3. 「主队视角」全部以主队教练的立场写：我们的意图、想攻击对方哪一点、哪里可能被对方打；「客队视角」同理以客队立场写。两面都要具体到人。\n'
  +'4. 「全场对位」必须覆盖门将、后卫线、中场、锋线全部区域：给出人与人的直接对位或区域对位（谁防谁、谁压谁、哪条走廊最危险），前中后场都要有。\n'
  +'5. 「换人点评」：对已有的每次换人，评教练意图、估计效果；如果换得不好，直接说该换谁更有效（从替补名单里挑）；如果教练某次战术选择失误导致丢球/丢分，明确指出并说明代价。没有换人就不写这个分区。\n'
  +'6. 联网工具：开场先搜两队最新伤停/状态/近况（每次分析最多 2-3 次搜索，够了就停）。搜不到就用输入数据推断并把 conf 标 infer 或 guess。\n'
  +'7. 输出 10-16 条，按重要性排。禁止空话（如「注意中场争夺」），每条都要能追溯到数据。中文输出。\n'
  +'8. 若输入含 oral（用户口述站位/场上情报）或 zonesHome/zonesAway（用户拖拽设定的球员主站位区）：这是用户现场观察，优先级最高——站位与对位分析必须以其为基准，固定阵型坐标只作背景；与阵型默认站位冲突时明确说明「用户口述 vs 纸面阵型」的差异及其战术含义。\n'
  +'9. 对位关系是「开局参考」：比赛中会随换人/变阵变化，不要把开局连线当成整场不变的结论，可结合 oral 说明对位实际如何演变。';
}
async function aiRun(){
  if(AI.busy) return;
  if(!aiReady()){ AI.err='还没配置 AI：点右上角「⚙ AI 设置」'; renderAll(); return; }
  AI.busy=true; AI.err=''; AI.partial=''; AI.stage='整理阵容与对位数据'; AI.startedAt=Date.now();
  renderAll();
  try{
    var ctx=aiContext();
    /* 并行预搜索：一次性查两队最新伤停/状态，注入 prompt，省掉串行工具轮次 */
    var pre='';
    if(aiSearchOn()){
      AI.stage='并行联网搜索两队最新动态…'; renderAll();
      pre=await TBWebTools.prefetch([S.home+' 最新伤停 阵容新闻 2026-27',S.away+' 最新伤停 阵容新闻 2026-27']);
    }
    var user=(pre?('联网预搜结果（可直接引用，不必再搜）：\n'+pre+'\n\n'):'')
      +'当前局面（JSON，含时间切片快照/换人意图标签/红黄牌/比分倾向）：\n'+JSON.stringify(ctx)
      +'\n\n补充：\n'
      +'1. home.play/away.play 是用户选的本场战术打法（高位压迫/人盯人等），分析必须围绕它展开。\n'
      +'2. possRate 是用户设定的控球率预期，两边加起来不必是 100%，按各自预期写打法。\n'
      +'3. profile 是教练卡（9 轴参数+结构标签+权限+临场策略+用户手写要求），用户手写要求优先级最高。\n'
      +'4. minute=0 且无换人时，「换人点评」分区跳过；比分落后且 minute>=60 时重点写教练该怎么办。\n'
      +'5. 比分联动：先读 scoreTendency（领先收缩/落后强攻/平局均势），分析必须与倾向一致；读 snapshots 的指标趋势（↑↓）验证你的判断。\n'
      +'6. 换人意图标签（进攻换防守/防守换进攻/对位替换/伤病被迫换人/战术新指令）决定分析权重：伤病被迫换人重点写连锁影响，战术新指令重点写结构变化。\n'
      +'7. 红牌：有红牌方按少一人分析阵型收缩与被针对点。\n'
      +'8. 每条都要回答「什么时候不成立」。\n'
      +'9. 若 ctx 有 oral（用户口述站位与场上情报）或 zonesHome/zonesAway（用户拖拽设定的主站位区）：这是最高优先级现场信息，站位/对位分析必须以其为基准。\n'
      +'10. 赛中分析不要把开局对位连线当成整场不变的结论——结合 oral 与 events 说明对位实际如何变化。';
    var res=await aiAgentRun(aiSysPrompt(),user,function(st){ AI.stage=st+'（'+((Date.now()-AI.startedAt)/1000|0)+'s）'; renderAll(); });
    AI.stage='整理成卡片';
    renderAll();
    var arr=TBAgent.extractJSON(res.content,true);
    if(!Array.isArray(arr)||!arr.length) throw new Error('模型没有返回有效 JSON 数组（原始输出开头：'+String(res.content||'').slice(0,60).replace(/\n/g,' ')+'…）');
    AI.cards=arr.slice(0,20).map(aiNormCard);
    AI.fp=aiFingerprint();
    aiCacheSave();
    AI.stage='';
  }catch(err){
    AI.err=(err&&err.message)||String(err); AI.stage='';
  }finally{ AI.busy=false; renderAll(); }
}

/* ---------- ② 赛前分析（确认首发后，独立于比赛分析） ---------- */
async function aiRunPrematch(force){
  if(AI.preBusy) return;
  if(!S.confirmed){ AI.err='先在「排阵」页点「✅ 确认双方首发」'; renderAll(); return; }
  if(S.minute>0||S.hs>0||S.as>0){ AI.err='比分不是 0:0 —— 先点比分牌上的「重置」恢复赛前状态，再生成赛前分析'; renderAll(); return; }
  if(!force&&AI.preCards&&AI.preFp===aiPreFingerprint()) return;
  if(!aiReady()){ AI.err='还没配置 AI：点右上角「⚙ AI 设置」'; renderAll(); return; }
  AI.preBusy=true; AI.err=''; AI.stage='赛前分析：整理确认首发'; AI.startedAt=Date.now(); renderAll();
  try{
    var c=S.confirmed;
    var pre='';
    if(aiSearchOn()){
      AI.stage='并行联网搜索两队最新动态…'; renderAll();
      pre=await TBWebTools.prefetch([S.confirmed.home+' 伤停 阵容新闻 2026-27',S.confirmed.away+' 伤停 阵容新闻 2026-27']);
    }
    function xiOf(team,arr,form){
      var slots=FORMS[form]||FORMS['4-2-3-1'];
      return arr.map(function(n,i){
        var p=n?byName[n]:null; if(!p) return null;
        return (slots[i]?slots[i][0]:i)+':'+p.n+'('+(p.pos||[]).join('/')+', '+(p.foot||'?')+'脚'+
          (p.tags&&p.tags.length?', '+p.tags.join('/'):'')+
          (p.a?', 速度'+p.a.pace+' 出球'+p.a.pass+' 防守'+p.a.def:'')+')';
      }).filter(Boolean);
    }
    var user=(pre?('联网预搜结果（可直接引用）：\n'+pre+'\n\n'):'')
      +'比赛：'+c.home+'（主）vs '+c.away+'（客）。用户已确认双方首发。\n'
      +JSON.stringify({home:{team:c.home,form:c.formH,coach:coachOf(c.home),play:playOf(c.home),possRate:possRateOf(c.home)+'%',
          profile:PROFILE[c.home]||{},xi:xiOf(c.home,c.h,c.formH)},
        away:{team:c.away,form:c.formA,coach:coachOf(c.away),play:playOf(c.away),possRate:possRateOf(c.away)+'%',
          profile:PROFILE[c.away]||{},xi:xiOf(c.away,c.a,c.formA)},
        weather:S.weather==='rain'?'雨':'晴',
        zonesHome:zonesSummary(c.home),zonesAway:zonesSummary(c.away),oral:S.oral||''})
      +'\n\n任务（赛前分析，比赛还没开始）：\n'
      +'1. 通过人员和战术阵型，分析双方这套首发存在的结构性差距（中场人数、宽度、身后、制空等）。\n'
      +'2. 分别指出双方「哪里最可能被对手针对」（具体到人和走廊）。\n'
      +'3. 若输入含 oral（用户口述站位与场上情报）或 zones（用户拖拽设定的主站位区）：这是最高优先级现场信息，站位分析以其为基准。\n'
      +'3. 「换人预案」独立分区（sec=换人预案）：双方关键替补是谁、大概什么时间换、换人之后会改变哪一组对位、连锁风险点。\n'
      +'4. 「红黄牌风险」分区（sec=红黄牌风险）：识别哪些对位容易吃牌（如后腰盯对方核心 10 号、边后卫追防套边边锋），点名吃牌属性高的球员。\n'
      +'5. 「节奏开关」分区（sec=节奏开关）：哪一方能主动掌控节奏、什么条件下比赛会落入对方舒服的节奏（门将出球质量只是其中一环，还要覆盖压迫强度对比与转换速度对比）。\n'
      +'6. sec 分区用：主队视角 / 客队视角 / 关键对位 / 换人预案 / 红黄牌风险 / 节奏开关 / 赛前结论。赛前结论 1-2 条给出本场胜负手。\n'
      +'7. 输出 10-16 条。先联网搜两队最新伤停与阵容新闻（最多 2 次），搜不到就按输入推断。';
    var res=await aiAgentRun(aiSysPrompt(),user,function(st){ AI.stage='赛前：'+st+'（'+((Date.now()-AI.startedAt)/1000|0)+'s）'; renderAll(); });
    AI.stage='赛前：整理成卡片'; renderAll();
    var arr=TBAgent.extractJSON(res.content,true);
    if(!Array.isArray(arr)||!arr.length) throw new Error('模型没有返回有效 JSON 数组（原始输出开头：'+String(res.content||'').slice(0,60).replace(/\n/g,' ')+'…）');
    AI.preCards=arr.slice(0,16).map(aiNormCard);
    AI.preFp=aiPreFingerprint();
    aiCacheSave(); AI.stage='';
  }catch(err){ AI.err=(err&&err.message)||String(err); AI.stage='';
  }finally{ AI.preBusy=false; renderAll(); }
}

/* ---------- AI 推荐变阵（问题十七：根据场上形势推荐阵型，用户选择后应用） ---------- */
var REC={busy:false,err:'',res:null};
function openRecForm(){
  REC.err=''; REC.res=null;
  $('#sheet').innerHTML='<div class="sheetIn"><div class="sh"><b>💡 AI 推荐变阵 · '+esc(S.home)+'</b>'
    +'<button class="x" onclick="closeSheet()">✕</button></div>'
    +'<div class="lov">当前：'+S.minute+"' "+S.hs+':'+S.as+' · 阵型 '+esc(formOf(S.home))+'</div>'
    +'<div class="lov">场上形势描述（可选，AI 会结合比分/时间/事件自动判断；你写的话以你的描述为主）</div>'
    +'<textarea class="ctext" id="recDesc" style="min-height:56px" placeholder="例：对方 60 分钟换上高中锋开始冲吊，我们体力下降中，需要保住 1 球优势"></textarea>'
    +'<button class="hbtn2" onclick="aiRecommendForm()">💡 让 AI 推荐阵型</button>'
    +'<div id="recBox"></div></div>';
  $('#sheet').classList.add('on');
}
async function aiRecommendForm(){
  if(REC.busy) return;
  if(!aiReady()){ REC.err='还没配置 AI：点右上角「⚙ AI 设置」'; drawRec(); return; }
  REC.busy=true; REC.err=''; drawRec();
  try{
    var cfg=TBSettings.cfg();
    var desc=(document.getElementById('recDesc')||{value:''}).value.trim();
    var sys='你是足球临场指挥专家。根据场上形势推荐一个阵型。可选阵型：'+BASE_FORMS.join('、')+'。'
      +'优先级：用户手写的形势描述 > 比分/时间/事件数据。'
      +'只输出 JSON：{"form":"阵型","why":"推荐理由（60-100字，具体到人和比分）","warn":"这个阵型的风险（30字内）"}。不要 markdown。';
    var ctx={minute:S.minute,score:S.hs+':'+S.as,form:formOf(S.home),
      events:(S.events||[]).slice(-8).map(function(e){ return e.min+"' "+e.type+' '+(e.who||e.note||''); }),
      userDesc:desc||'（无，按数据判断）'};
    var res=await TBAgent.run({base:cfg.base,key:TBSettings.aiKey(),model:cfg.model,
      system:sys,messages:[{role:'user',content:JSON.stringify(ctx)}],
      tools:[],maxSteps:2,temp:cfg.temp,maxTokens:Math.max(TBSettings.cfg().tokens,1200)});
    var o=TBAgent.extractJSON(res.content);
    if(!o||!o.form||!BASE_FORMS.includes(o.form)) throw new Error('模型没有返回有效推荐');
    REC.res=o;
  }catch(e){ REC.err=(e&&e.message)||String(e); }
  finally{ REC.busy=false; drawRec(); }
}
function drawRec(){
  var box=document.getElementById('recBox'); if(!box) return;
  var h='';
  if(REC.busy) h='<div class="lov">AI 分析中…</div>';
  else if(REC.err) h='<div class="ae" style="color:#ffb4b7">'+esc(REC.err)+'</div>';
  else if(REC.res){
    h='<div class="ac l1"><div class="ah"><span class="tag">推荐阵型</span><span class="lv">'+esc(REC.res.form)+'</span></div>'
      +'<div class="at">'+esc(REC.res.why)+'</div>'
      +(REC.res.warn?'<div class="ix">风险：'+esc(REC.res.warn)+'</div>':'')
      +'</div>'
      +'<button class="hbtn2" onclick="applyRec(\''+REC.res.form+'\')">✅ 采用 '+esc(REC.res.form)+'（保留首发 11 人）</button>';
  }
  box.innerHTML=h;
}
function applyRec(form){
  changeForm(S.home,form,true);  /* 保留首发 */
  save(); closeSheet(); renderAll(); switchTab('lineup');
}

/* ---------- ③ 本场术语（AI 按打法与球员推荐，点开解释） ---------- */
async function aiRunTerms(){
  if(AI.termsBusy) return;
  if(!aiReady()){ AI.err='还没配置 AI：点右上角「⚙ AI 设置」'; renderAll(); return; }
  AI.termsBusy=true; AI.err=''; AI.stage='AI 正在为这场推荐术语'; renderAll();
  try{
    var ctx=aiContext();
    var sys='你是足球战术讲师。只输出 JSON 数组：[{"term":"术语","why":"这场为什么会用到（30字内）","explain":"60-90字白话解释，具体到场上行为"}]，输出 5-8 条。不要 markdown、不要解释。';
    var user='本场：'+JSON.stringify({home:{team:S.home,form:formOf(S.home),play:playOf(S.home),xi:aiContext().home.xi},
      away:{team:S.away,form:formOf(S.away),play:playOf(S.away),xi:aiContext().away.xi}})
      +'\n\n推荐这场观赛最需要懂的 5-8 个战术术语（按本场打法和上场球员来，不要泛泛的常见词）。';
    AI.startedAt=Date.now();
    var res=await TBAgent.run({base:TBSettings.cfg().base,key:TBSettings.aiKey(),model:TBSettings.cfg().model,
      system:sys,messages:[{role:'user',content:user}],tools:[],maxSteps:2,temp:TBSettings.cfg().temp,
      maxTokens:TBSettings.cfg().tokens,
      onEvent:function(st){}});
    var arr=TBAgent.extractJSON(res.content);
    if(!Array.isArray(arr)||!arr.length) throw new Error('模型没有返回有效 JSON');
    AI.terms=arr.slice(0,8).map(function(t){ return {term:String(t.term||'').slice(0,12),
      why:String(t.why||''), explain:String(t.explain||'')}; });
    AI.termsFp=aiFingerprint();
    aiCacheSave(); AI.stage='';
  }catch(err){ AI.err=(err&&err.message)||String(err); AI.stage='';
  }finally{ AI.termsBusy=false; renderAll(); }
}
function aiTermsCard(){
  var stale=AI.terms&&AI.termsFp!==aiFingerprint();
  var head='<div class="ac l0"><div class="ah"><span class="tag">本场术语</span>'
    +'<span class="lv">'+infoTag('AI 推荐')+(stale?' · 已过期':'')+'</span></div>';
  if(AI.termsBusy){
    return head+'<div class="at">'+esc(AI.stage||'推荐中…')+'</div></div>';
  }
  if(!AI.terms){
    return head+'<div class="at">还没推荐。点上方「术语推荐」，AI 会根据双方打法和上场球员挑 5-8 个最该懂的词。</div></div>';
  }
  return head+'<div class="at">'+AI.terms.map(function(t,i){
    return '<details style="margin:4px 0"><summary style="cursor:pointer;font-size:13px">'
      +'<b>'+esc(t.term)+'</b> <span class="mut">'+esc(t.why)+'</span></summary>'
      +'<div class="termDef">'+esc(t.explain)+'</div></details>';
  }).join('')+'</div>'
  +(stale?'<div class="ae">阵容/局面已变，可点「术语推荐」重新生成。</div>':'')
  +'</div>';
}

/* ---------- ③b 学习辅助：AI 体系速览（风格归类/克制/样板） ---------- */
async function aiCoachInfo(team){
  if(!aiReady()){ closeSheet(); AI.err='还没配置 AI：点右上角「⚙ AI 设置」'; renderAll(); return; }
  if(!CE||CE.team!==team) openCoach(team), CE_TAB='learn';
  CE_TAB='learn'; AI.coachInfoBusy=team; AI.coachInfoStage='联网检索教练打法…'; drawCoach();
  try{
    var pf=PROFILE[team]||{};
    var sys='你是足球战术研究员。只输出 JSON 对象：{"style":"风格归类（如：控球型高位压迫）","summary":"80-150字，这位教练的惯用打法要点（阵型偏好、压迫方式、转换习惯、边后卫用法、临场习惯）","counters":["克制什么对手（1-3条）"],"weakTo":["怕什么对手/针对方式（1-3条）"],"samples":["样板比赛或执教案例（1-3条，含年份）"],"conf":"fact|infer|guess","src":"信息来源说明"}。不要 markdown。';
    var user='教练：'+(pf.coach||('（用户没填名字，请按'+team+'现任主教练）'))+'（执教 '+team+'，阵型 '+formOf(team)+'）\n'
      +'用户口述要求（优先级最高，若与真实打法冲突，以用户为准并在 summary 末尾标注「按用户要求调整」）：'+(pf.text||'（无）')+'\n'
      +'九轴：'+JSON.stringify(pf.axes||{})+' 结构标签：'+JSON.stringify(pf.flags||{})+'\n'
      +'请联网核实该教练近期打法和临场习惯（最多 2-3 次搜索），输出 JSON。';
    var pre='';
    if(aiSearchOn()){
      AI.coachInfoStage='并行联网检索教练打法…'; drawCoach();
      pre=await TBWebTools.prefetch([(pf.coach||team)+' coach tactics style 2026-27']);
    }
    if(pre) user='联网预搜结果（可直接引用）：\n'+pre+'\n\n'+user;
    var res=await aiAgentRun(sys,user,function(st){ AI.coachInfoStage=st; drawCoach(); });
    var o=TBAgent.extractJSON(res.content);
    if(!o||typeof o!=='object') throw new Error('模型没有返回有效 JSON');
    AI.coachInfo=AI.coachInfo||{}; AI.coachInfo[team]=o;
  }catch(err){ AI.coachInfo=AI.coachInfo||{}; AI.coachInfo[team]={style:'生成失败',summary:String(err.message||err),conf:'guess'}; }
  finally{ AI.coachInfoBusy=null; if(CE&&CE.team===team) drawCoach(); }
}

/* ---------- ④ 匹配球员（教练卡联动：按战术匹配球员库） ---------- */
async function aiMatchPlayers(team){
  if(AI.matchBusy) return;
  if(!aiReady()){ closeSheet(); AI.err='还没配置 AI：点右上角「⚙ AI 设置」'; renderAll(); return; }
  AI.matchBusy=true; AI.matchTeam=team; AI.matchRes=null; AI.matchErr='';
  drawCoachMatchView();
  try{
    var pf=PROFILE[team]||{};
    var squad=(POOL[team]||[]).filter(function(p){return !hurt(p);})
      .map(function(p){ return p.n+'('+(p.pos||[]).join('/')+', '+(p.foot||'?')+'脚'+(p.age?','+p.age+'岁':'')+(p.st?','+p.st:'')+')'; });
    var sys='你是足球数据分析师。只输出 JSON 数组：[{"n":"球员名","pos":"推荐位置","score":0-100,"why":"适配理由（30字内）","risk":"风险（20字内，无则空串）"}]，按 score 从高到低输出 14 条。不要 markdown。';
    var user='战术档案（'+team+'，教练 '+(pf.coach||coachOf(team))+'）：\n'
      +JSON.stringify({axes:pf.axes||{},flags:pf.flags||{},perm:pf.perm||{},roles:pf.roles||'',
        scenario:pf.scenario||{},text:pf.text||'',form:formOf(team)})
      +'\n\n可选球员库：\n'+squad.join('\n')
      +'\n\n按这套战术匹配最合适的 14 人（能组成首发+替补核心），score=战术适配分。';
    var res=await TBAgent.run({base:TBSettings.cfg().base,key:TBSettings.aiKey(),model:TBSettings.cfg().model,
      system:sys,messages:[{role:'user',content:user}],tools:[],maxSteps:2,temp:TBSettings.cfg().temp,
      maxTokens:Math.max(TBSettings.cfg().tokens,2400),
      onEvent:function(){}});
    var arr=TBAgent.extractJSON(res.content);
    if(!Array.isArray(arr)||!arr.length) throw new Error('模型没有返回有效 JSON');
    AI.matchRes=arr.slice(0,14).map(function(m){ return {n:String(m.n||''),pos:String(m.pos||''),
      score:Math.max(0,Math.min(100,Number(m.score)||0)),why:String(m.why||''),risk:String(m.risk||'')}; });
  }catch(err){ AI.matchErr=(err&&err.message)||String(err);
  }finally{ AI.matchBusy=false; drawCoachMatchView(); }
}
function drawCoachMatchView(){
  if(!CE||!AI.matchTeam||AI.matchTeam!==CE.team) return;
  var box=document.getElementById('cMatch'); if(!box) return;
  var h='';
  if(AI.matchBusy) h='<div class="lov">'+esc(AI.matchStage||'匹配中…')+'</div>';
  else if(AI.matchErr) h='<div class="ae" style="color:#ffb4b7">匹配失败：'+esc(AI.matchErr)+'</div>';
  else if(AI.matchRes){
    h='<div class="lov">适配结果（分高在前）</div>'+AI.matchRes.map(function(m){
      return '<div class="matchli"><span><b>'+esc(m.n)+'</b> <span class="mut">'+esc(m.pos)+'</span><br>'
        +'<span class="mut">'+esc(m.why)+'</span>'+(m.risk?'<br><span class="rk">⚠ '+esc(m.risk)+'</span>':'')+'</span>'
        +'<span class="sc">'+m.score+'</span></div>';
    }).join('');
  }
  box.innerHTML=h;
}

/* ---------- 渲染：顶部操作条 ---------- */
function aiBarHtml(){
  var stale=AI.cards&&AI.fp!==aiFingerprint();
  var preStale=AI.preCards&&S.confirmed&&AI.preFp!==aiPreFingerprint();
  var hint='';
  if(!aiReady()) hint='<span class="aihint">还没配置 AI · 点「⚙ 设置」（全局设置，主站与模拟器共用）</span>';
  else if(AI.err) hint='<span class="aihint bad">'+esc(AI.err)+'</span>';
  else if(stale&&!AI.busy) hint='<span class="aihint warn">阵容/比分/换人有变，下面的比赛分析已过期 —— 点「重新分析」</span>';
  else if(!AI.cards&&!AI.busy) hint='<span class="aihint">还没跑过 · 点「AI 比赛分析」</span>';
  var prog='';
  if(AI.busy){
    prog='<div class="aiprog"><div class="aiprogb" style="width:60%"></div></div>'
      +'<div class="aistage">'+esc(AI.stage||'分析中…')+'</div>';
  }
  var c=window.TBSettings?TBSettings.cfg():{};
  return '<div class="aibar">'
    +'<div class="aibar-head"><b>🤖 AI 分析台</b>'
      +'<span class="aibar-sub">'+esc(S.home)+' vs '+esc(S.away)+' · 主站与模拟器共用同一套接口与搜索 Key</span>'
      +'<span class="aibar-live">'+(AI.busy||AI.preBusy||AI.termsBusy?'分析中':'待命')+'</span></div>'
    +'<div class="aibtns">'
    +'<button class="aibtn" data-ai="cfg">⚙ 设置</button>'
    +'<button class="aibtn live" data-ai="pre"'+(AI.preBusy?' disabled':'')+'>'+(AI.preBusy?'赛前分析中…':(AI.preCards?'赛前分析 ↻':'赛前分析'))+'</button>'
    +'<button class="aibtn live" data-ai="run"'+(AI.busy?' disabled':'')+'>'+(AI.busy?'比赛分析中…':'AI 比赛分析')+'</button>'
    +'<button class="aibtn" data-ai="terms"'+(AI.termsBusy?' disabled':'')+'>'+(AI.termsBusy?'推荐中…':'术语推荐')+'</button>'
    +'<button class="aibtn" data-ai="recform">💡 推荐变阵</button>'
    +'</div>'
    +(aiSearchOn()?'':'<div class="aibar-note">💡 未配置搜索 Key：分析只用本地库数据；配置后（⚙ 设置）AI 会联网查最新伤停与状态</div>')
    +(hint?'<div class="aibar-status">'+hint+'</div>':'')
    +(prog?'<div class="aibar-status">'+prog+'</div>':'')
    +'</div>';
}
/* 赛前分析卡 */
function prematchCard(){
  if(AI.preBusy) return '<div class="ac l1"><div class="ah"><span class="tag">赛前分析</span><span class="lv">AI 运行中</span></div>'
    +'<div class="at">'+esc(AI.stage||'准备中…')+'</div></div>';
  if(!S.confirmed){
    return '<div class="ac l0"><div class="ah"><span class="tag">赛前分析</span></div><div class="at">'
      +'先去「排阵」页排好双方首发，点「✅ 确认双方首发 · 生成赛前分析」。'
      +'赛前分析（阵容差距 + 双方被针对点）和比赛开始后的分析是分开的两份。</div></div>';
  }
  var stale=AI.preFp!==aiPreFingerprint();
  var body;
  if(!AI.preCards){
    body='<div class="at">已确认首发，但还没生成。点上方「赛前分析」。</div>';
  }else{
    body='<div class="at">'+aiSecsHtml(AI.preCards,stale)+'</div>';
  }
  return '<div class="ac '+(stale?'l0':'l1')+'"><div class="ah"><span class="tag">赛前分析 · 已确认首发</span>'
    +'<span class="lv">'+new Date(S.confirmed.ts).toLocaleTimeString()+(stale?' · 已过期':'' )+'</span></div>'
    +body+'</div>';
}
/* 按 sec 分组渲染卡片 */
function aiSecsHtml(cards,stale){
  var secs=[],seen={};
  cards.forEach(function(m){ if(!seen[m.sec||'']){ seen[m.sec||'']=1; secs.push(m.sec||''); } });
  return secs.map(function(sec){
    var list=cards.filter(function(m){return (m.sec||'')===sec;});
    var h=sec?'<div class="ansech"><span class="ansecb"></span><span class="ansect">'+esc(sec)+'</span><span class="anscen">'+list.length+' 张</span></div>':'';
    return '<section class="ansec">'+h+'<div class="acgrid">'+list.map(function(m){
      return '<div class="ac l'+m.lvl+' aicard'+(stale?' expired':'')+'"><div class="ah"><span class="tag">'+esc(m.area)+'</span>'
        +'<span class="lv"><span class="aibadge">AI</span>'+confTag(m.c)+'</span></div>'
        +'<div class="at md">'+mdToHtml(m.txt)+'</div>'
        +(m.p?'<div class="pl"><b>人话：</b>'+esc(m.p)+'</div>':'')
        +(m.x?'<div class="ix">什么时候不成立：'+esc(m.x)+'</div>':'')
        +(m.ev?'<div class="ae">依据：'+esc(m.ev).replace(/\n/g,'<br>')+'</div>':'')
        +'</div>';
    }).join('')+'</div></section>';
  }).join('');
}
function aiCardsHtml(){
  var stale=AI.fp!==aiFingerprint();
  if(!AI.cards){
    return '<div class="ac l0"><div class="ah"><span class="tag">AI 比赛分析</span></div><div class="at">'
      +'点上方「AI 比赛分析」开始。AI 会结合双方教练卡、战术打法、控球率预期、首发与替补'+(aiSearchOn()?'，并联网查最新伤停与状态':'')+'，'
      +'从主队和客队两个视角给出分析，并逐区对位。</div></div>';
  }
  return (stale?'<div class="aistale">⚠️ 局面已变，下面是上一次分析（已过期）——点「AI 比赛分析」刷新</div>':'')
    +aiSecsHtml(AI.cards,stale);
}

/* 全局委托：战术设置开合保持 + 控球率联动滑条（问题九/十） */
document.addEventListener('toggle',function(e){
  var d=e.target;
  if(d.classList&&d.classList.contains('tacbox')&&d.dataset.tacteam){ TAC_OPEN[d.dataset.tacteam]=d.open; }
},true);
document.addEventListener('input',function(e){
  var t=e.target;
  if(t.matches&&t.matches('[data-snapnote]')){
    var sn=S.snaps.find(function(x){ return x.min===Number(t.dataset.snapnote); });
    if(sn){ sn.note=t.value; save(); }
    return;
  }
  if(t.matches&&t.matches('[data-possr]')){
    var pv=t.parentElement.querySelector('.pv');
    if(pv) pv.textContent=t.value+'% 左右';
  }
});
document.addEventListener('input',function(e){
  var t=e.target;
  if(t.matches&&t.matches('[data-oral]')){ setOral(t.value); return; }
  if(t.matches&&t.matches('[data-snapnote]')){
    var sn=S.snaps.find(function(x){ return x.min===Number(t.dataset.snapnote); });
    if(sn){ sn.note=t.value; save(); }
    return;
  }
  if(t.matches&&t.matches('[data-possr]')){ setPossRate(t.dataset.possr,t.value); }
});

/* ---------------- 启动 ---------------- */
aiCacheLoad();
document.addEventListener('tbai:changed',function(){ AI.err=''; renderAll(); });
/* 问题七：头部队数文案动态化（新增球队后不再写死） */
(function(){ var el=document.getElementById('teamCountSpan');
  if(el&&typeof TEAMS!=='undefined') el.textContent=TEAMS.length+' 队对位 · AI 联网分析'; })();

loadHudPref();
if(!load()){
  S.lineup[S.home]=autoLineup(S.home);
  S.lineup[S.away]=autoLineup(S.away);
}
if(!S.lineup[S.home]) S.lineup[S.home]=autoLineup(S.home);
if(!S.lineup[S.away]) S.lineup[S.away]=autoLineup(S.away);
S.snap={h:metrics(S.lineup[S.home]),a:metrics(S.lineup[S.away])};
renderSetup(); renderAll(); switchTab('lineup');
applyHudPref();
var _hudEl=document.getElementById('hud');
if(_hudEl){ _hudEl.addEventListener('pointerdown',function(){ if(HUD.mode==='auto') showHud(); }); }
window.addEventListener('resize',syncHudSpace);
window.setTeam=setTeam; window.swapSides=swapSides; window.setSlot=setSlot;
window.setSt=setSt; window.closeSheet=closeSheet; window.openSheet=openSheet;
window.changeForm=changeForm; window.addGoal=addGoal; window.addMin=addMin;
window.setMin=setMin; window.resetMatch=resetMatch;
window.setTax=setTax; window.togglePoss=togglePoss; window.toggleDesperate=toggleDesperate;
window.toggleLead=toggleLead; window.confirmXI=confirmXI;
window.setPlay=setPlay; window.setPossRate=setPossRate;
window.openTerm=openTerm; window.openTermsAll=openTermsAll;
window.switchTab=switchTab; window.openCoach=openCoach; window.applyCoach=applyCoach;
window.setCE=setCE; window.setCF=setCF; window.saveLog=saveLog; window.delLog=delLog;
window.setWeather=setWeather; window.editLog=editLog; window.cancelEdit=cancelEdit;
window.toggleHudCfg=toggleHudCfg; window.setHudSize=setHudSize; window.setHudMode=setHudMode;
window.showHud=showHud; window.hideHud=hideHud; window.collapseHudNow=collapseHudNow;
window.setCEPhase=setCEPhase; window.setCEPerm=setCEPerm; window.setCETab=setCETab; window.setCEPhaseTab=setCEPhaseTab; window.toggleCEPhase=toggleCEPhase; window.aiRun=aiRun; window.aiRunPrematch=aiRunPrematch; window.aiRunTerms=aiRunTerms; window.applyRec=applyRec; window.resetSquad=resetSquad;

