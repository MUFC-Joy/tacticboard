/* =========================================================
   看球战术台 主站逻辑（tab 导航 / 球员弹窗 / 阵型 / 角色 / 球队）
   搜索板块 js/search.js · 球队看板 js/briefing.js · 阵型实验室 js/formation-lab.js
   ========================================================= */
"use strict";
/* ================= 工具 ================= */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function lsGet(k, d){ try{ const v = localStorage.getItem(k); return v===null? d : JSON.parse(v); }catch(e){ return d; } }
function lsSet(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }

const POSN = {GK:"门将",CB:"中卫",LB:"左后卫",RB:"右后卫",LWB:"左翼卫",RWB:"右翼卫",DM:"后腰(6)",CM:"中场(8)",AM:"前腰(10)",LW:"左边锋",RW:"右边锋",ST:"中锋(9)"};
const NEAR = {GK:[], CB:["LB","RB","LWB","RWB","DM"], LB:["LWB","CB","LW"], RB:["RWB","CB","RW"],
  LWB:["LB","LW","CB"], RWB:["RB","RW","CB"], DM:["CM","CB"], CM:["DM","AM"],
  AM:["CM","LW","RW","ST"], LW:["LWB","AM","ST","RW"], RW:["RWB","AM","ST","LW"], ST:["AM","LW","RW"]};
const ATTR_FLAVOR = {pace:"回追/转身速度不够，怕被直接打身后", sta:"90 分钟高频往返的体能存疑",
  air:"争顶和防空吃亏", def:"防守对抗与站位达不到该位置要求", pass:"出球/组织精度低于该位置需要", fin:"终结威胁不足"};

/* ================= 球员弹窗 ================= */
function findPlayer(name){
  return PLAYERS.find(p => p.n === name || (p.en||[]).some(e => e.toLowerCase() === String(name).toLowerCase()));
}
function openPlayer(name){
  const p = findPlayer(name);
  if(!p){ return; }
  const posTxt = p.pos.map(x=>POSN[x]||x).join(" / ");
  $("#mbox").innerHTML =
    '<button class="mclose" onclick="closeModal()">✕</button>' +
    '<h3 style="margin:0 0 2px;font-size:20px">'+esc(p.n)+(p.num?' <small style="color:var(--mut);font-size:14px">#'+p.num+'</small>':'')+
    '<small style="color:var(--mut);font-weight:400;font-size:13px"> '+(p.en||[]).filter(e=>!/[\u4e00-\u9fa5]/.test(e)).join(" / ")+'</small></h3>' +
    '<div class="mrow"><b>位置：</b>'+posTxt+' &nbsp;·&nbsp; <b>惯用脚：</b>'+(p.foot||"待确认")+(p.age?' &nbsp;·&nbsp; <b>年龄：</b>'+p.age:'')+'</div>' +
    '<div class="mrow"><b>俱乐部：</b>'+esc(p.club)+'（截至 2026.10） &nbsp;·&nbsp; <b>国家队：</b>'+esc(p.nat)+'</div>' +
    (p.season?'<div class="mrow"><b>上季数据：</b>'+esc(p.season)+'</div>':"") +
    (p.status?'<div class="mrow" style="color:#ffb4b7"><b>状态：</b>'+esc(p.status)+'</div>':"") +
    '<div class="tagline" style="margin-top:8px">「'+esc(p.st)+'」</div>' +
    (p.tags && p.tags.length ? '<div>'+(p.tags.map(t=>'<span class="chip y">'+esc(t)+'</span>').join(""))+'</div>' : "") +
    '<div class="sec">风 格 详 解</div><div class="p">'+esc(p.d)+'</div>' +
    (p.pair && p.pair.length ? '<div class="sec">谁 和 他 搭 配</div>'+p.pair.map(x=>'<div class="pairli">'+esc(x)+'</div>').join("") : "") +
    (p.a ? '<div class="sec">属 性 示 意（模拟器引擎用）</div><div class="hintline">速度 '+p.a.pace+' · 出球 '+p.a.pass+' · 防守 '+p.a.def+' · 争顶 '+p.a.air+' · 终结 '+p.a.fin+' · 体能 '+p.a.sta+'</div>' : "") +
    '<div class="warn">发现他转会/信息过期？在「搜索」页重新搜一次即可获取最新信息。</div>';
  $("#modal").classList.add("on");
}
function closeModal(){ $("#modal").classList.remove("on"); }
$("#modal").addEventListener("click", e => { if(e.target.id === "modal") closeModal(); });

function playerChips(names){
  return (names||[]).map(n => findPlayer(n) ? '<button class="chip" data-p="'+esc(n)+'">'+esc(n)+'</button>' : '<span class="chip">'+esc(n)+'</span>').join("");
}
document.addEventListener("click", e => {
  const c = e.target.closest("button.chip[data-p]");
  if(c) openPlayer(c.dataset.p);
});

/* ================= 阵型页（阵型实验室，formation-lab.js 实现） ================= */
function pitch(dots, cls){
  return '<div class="pitch"><div class="circle"></div><div class="box top"></div><div class="box bot"></div>' +
    dots.map(d => '<div class="dot '+(cls||"")+(d[3]==="k"?" k":"")+'" style="left:'+d[1]+'%;top:'+d[2]+'%">'+d[0]+'</div>').join("") +
    '</div>';
}
function renderFormations(){
  if(window.renderFormationLab){ renderFormationLab(); return; }
  $("#tab-fmt").innerHTML =
    '<div class="card"><h3>怎么用这个 App</h3><div class="p">赛前打开<b>「模拟器」</b>（内嵌对位引擎）排阵容、看对位诊断与换人建议；想查球员或足球知识去<b>「搜索」</b>页（AI 联网）。<div class="p">⚠️ 先记一句话：<b>阵型是起步姿势，不是站着不动的位置</b>。</div></div>' +
    FORMATIONS.map(f =>
      '<div class="card'+(f.id==="meta"?" deep":"")+'"><h3>'+esc(f.name)+'<small>'+esc(f.tag)+'</small></h3>' +
      pitch(f.dots) +
      '<div class="sec">优 势</div><ul class="tight">'+f.good.map(x=>"<li>"+x+"</li>").join("")+'</ul>' +
      '<div class="sec">劣 势 / 风险</div><ul class="tight">'+f.bad.map(x=>"<li>"+x+"</li>").join("")+'</ul>' +
      '<div class="sec">谁在用</div><div class="p">'+f.who+'</div>' +
      '</div>').join("");
}


/* ================= 通用底部弹窗选人器（问题二：手机原生 select 没有取消键） ================= */
function openSheetPicker(title,groups,current,cb){
  const old=document.getElementById('pickOv'); if(old) old.remove();
  const ov=document.createElement('div'); ov.id='pickOv';
  ov.style.cssText='position:fixed;inset:0;z-index:200;background:rgba(5,8,12,.72);display:flex;align-items:flex-end;justify-content:center';
  if(window.innerWidth>720) ov.style.alignItems='center';
  const box=document.createElement('div');
  box.style.cssText='background:var(--card);border:1px solid var(--line);border-radius:18px 18px 0 0;width:100%;max-width:700px;max-height:76vh;overflow-y:auto;padding:14px 16px calc(16px + env(safe-area-inset-bottom))';
  box.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'
    +'<b style="font-size:15px">'+esc(title)+'</b>'
    +'<button id="pickX" style="background:var(--card2);border:1px solid var(--line);color:var(--txt);border-radius:99px;width:34px;height:34px;font-size:15px;cursor:pointer">✕</button></div>'
    +'<div class="searchrow"><input id="pickQ" placeholder="搜索过滤…（可不填）" style="margin-bottom:4px"></div>'
    +'<div id="pickList"></div>';
  ov.appendChild(box); document.body.appendChild(ov);
  function renderList(q){
    q=(q||'').trim().toLowerCase();
    let h='';
    groups.forEach(g=>{
      const items=g.items.filter(x=>!q||x.label.toLowerCase().includes(q)||String(x.v).toLowerCase().includes(q));
      if(!items.length) return;
      h+='<div class="sec" style="margin:8px 0 4px">'+esc(g.label)+'</div>'
        +'<div class="grid2">'+items.map(x=>
          '<button class="optbtn" data-v="'+esc(x.v)+'" style="margin:4px 0;text-align:center;'+(String(x.v)===String(current)?'border-color:var(--green);background:rgba(35,197,94,.12)':'')+'">'+esc(x.label)+'</button>').join('')+'</div>';
    });
    document.getElementById('pickList').innerHTML=h||'<div class="hintline">没有匹配项</div>';
    box.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{ ov.remove(); cb(b.dataset.v); });
  }
  box.insertAdjacentHTML('beforeend','<button class="optbtn" id="pickCancel" style="text-align:center;margin-top:10px">✕ 取消（不选择）</button>');
  document.getElementById('pickCancel').onclick=()=>ov.remove();
  document.getElementById('pickX').onclick=()=>ov.remove();
  ov.addEventListener('click',e=>{ if(e.target===ov) ov.remove(); });
  let timer=null;
  document.getElementById('pickQ').addEventListener('input',function(){
    clearTimeout(timer); const v=this.value; timer=setTimeout(()=>renderList(v),120);
  });
  renderList('');
}

/* ================= 角色页（v4：死知识 → 交互） =================
   ① 角色适配检测器：选角色+选球员 → 本地规则打分（位置/惯用脚/技术标签/属性）+ 理由
   ② 每个角色卡带「AI 深挖」：联网分析这个角色的现役最佳实践与训练要点（24h 缓存） */
const ROLE_GRP={门将:["GK"],中卫:["CB"],边后卫:["LB","RB","LWB","RWB"],后腰:["DM"],中中场:["CM"],前腰:["AM"],边锋:["LW","RW"],中锋:["ST"]};
const ROLE_TAGS=[
 [/出球|组织|发牌|节拍器|拖后/,["出球","组织","拖后组织","节拍器","B2B","内收型"]],
 [/破坏|扫荡|抢断|拦截/,["破坏型","B2B","抢点"]],
 [/内切|内锋/,["逆足内切","内锋"]],
 [/下底|套边|传中/,["顺足下底","套边型","翼卫","传中"]],
 [/支点|背身|站桩/,["支点"]],
 [/速度|冲击|爆点|身后/,["爆点","速度","冲击"]],
 [/压迫|逼抢|反抢/,["压迫","逼抢"]],
 [/制空|争顶|防空/,["制空"]],
 [/门线|扑救|清球/,["清球型"]]];
let roleSelIdx=-1, roleSelLabel="", rolePlayerLabel="";
function roleMatch(p,grp){
  var want=ROLE_GRP[grp]||[]; var best=0;
  want.forEach(function(w){ if((p.pos||[]).indexOf(w)>=0) best=Math.max(best,(p.pos||[])[0]===w?10:8); });
  if(!best) best=(p.pos||[]).some(function(x){ return want.some(function(w){ return (NEAR[w]||[]).indexOf(x)>=0; }); })?5:0;
  return best;
}
function roleFit(role,p){
  var grp=""; Object.keys(ROLE_GRP).forEach(function(g){ if((role.g||"").indexOf(g)>=0) grp=g; });
  var sc=0, why=[];
  var want=ROLE_GRP[grp]||[];
  var m10=want.some(function(w){ return (p.pos||[])[0]===w; });
  var m8=want.some(function(w){ return (p.pos||[]).indexOf(w)>=0; });
  var m5=!m8&&(p.pos||[]).some(function(x){ return want.some(function(w){ return (NEAR[w]||[]).indexOf(x)>=0; }); });
  if(m10){ sc+=50; why.push("位置完全匹配（主位置 +50）"); }
  else if(m8){ sc+=40; why.push("位置匹配（+40）"); }
  else if(m5){ sc+=25; why.push("位置邻近，可客串（+25）"); }
  else { sc+=5; why.push("位置不匹配，跨线使用风险高（+5）"); }
  var text=(role.it.n||"")+(role.it.d||""), tagHit=0;
  ROLE_TAGS.forEach(function(t){
    if(t[0].test(text)){
      var hit=(p.tags||[]).filter(function(x){ return t[1].some(function(y){ return String(x).indexOf(y)>=0; }); });
      if(hit.length&&tagHit<20){ tagHit+=10; why.push("标签匹配："+hit.join("/")+"（+10）"); }
    }
  });
  sc+=tagHit;
  if(p.foot&&/内切/.test(text)){
    if(p.foot==="右"&&(p.pos||[]).indexOf("LW")>=0){ sc+=5; why.push("右脚踢左路=天然内切脚（+5）"); }
    if(p.foot==="左"&&(p.pos||[]).indexOf("RW")>=0){ sc+=5; why.push("左脚踢右路=天然内切脚（+5）"); }
  }
  if(p.a){
    var avg=Math.round(((p.a.pace||60)+(p.a.pass||60)+(p.a.def||60))/3);
    var add=Math.round(avg/4); sc+=add;
    why.push("库内属性均分 "+avg+"（+"+add+"）：速度"+p.a.pace+" 出球"+p.a.pass+" 防守"+p.a.def);
  }
  sc=Math.max(0,Math.min(99,sc));
  return {sc:sc,why:why};
}
var roleAiCache={};
function roleAiGet(){ try{ roleAiCache=JSON.parse(localStorage.getItem("tb_role_ai")||"{}"); }catch(e){ roleAiCache={}; } }
roleAiGet();
async function roleAi(name){
  if(!window.TBSettings||!TBSettings.ready()){ alert("还没配置 AI：点右上角 ⚙"); return; }
  var hit=roleAiCache[name];
  if(hit&&Date.now()-hit.ts<24*3600*1000){ renderRoleAi(name,hit.text); return; }
  renderRoleAi(name,"AI 联网检索中…");
  try{
    var cfg=TBSettings.cfg();
    var res=await TBAgent.run({base:cfg.base,key:TBSettings.aiKey(),model:cfg.model,
      system:'你是足球教练教育者。针对一个足球场上角色，联网查证后输出中文教学：①这个角色现代最新演化（近2年趋势）②现役最佳实践者2-3人及各自做法差异③业余踢球者练这个角色的3个训练要点。用短段落+列表，300字内，末尾一行"来源：域名"。不确定的写"未能核实"。',
      messages:[{role:"user",content:"角色："+name}],
      tools:(cfg.search&&TBWebTools.available())?["web_search","web_fetch"]:[],maxSteps:4,temp:cfg.temp,maxTokens:1500});
    var txt=String(res.content||"").replace(/<tool_call>[\s\S]*?<\/tool_call>/g,"").trim();
    roleAiCache[name]={text:txt,ts:Date.now()};
    try{ localStorage.setItem("tb_role_ai",JSON.stringify(roleAiCache)); }catch(e){}
    renderRoleAi(name,txt);
  }catch(e){ renderRoleAi(name,"AI 深挖失败："+(e&&e.message)); }
}
function renderRoleAi(name,text){
  var box=document.getElementById("roleAi-"+name);
  if(box) box.innerHTML='<div class="pairli">'+esc(text).replace(/\n/g,"<br>")+'</div>';
}
function renderRoles(){
  const allRoles=[];
  ROLES.forEach(g=>g.items.forEach(it=>allRoles.push({g:g.g,it:it})));
  const playerNames=(PLAYERS||[]).map(p=>p.n);
  $("#tab-role").innerHTML =
    '<div class="card"><h3>🧩 角色适配检测器<small>选角色 + 选球员，看适配分和理由</small></h3>'
    +'<div class="searchrow pickrow"><button class="optbtn" id="roleSel" style="text-align:center">'+(roleSelLabel||'① 选角色…')+'</button>'
    +'<button class="optbtn" id="rolePlayer" style="text-align:center">'+(rolePlayerLabel||'② 选球员…')+'</button></div>'
    +'<div id="roleFitBox"></div>'
    +'<button class="optbtn" id="roleGo" style="text-align:center">🔍 查询适配度（①②选好后点这里）</button></div>'
    +'<div class="card"><h3>位置编号速查</h3><div class="p">1=门将 · 2-5=后卫 · 6=后腰（保护弧顶的人）· 8=中中场（要防守的组织者）· 10=前腰（不落位的组织者）· 7/11=边锋 · 9=中锋。<b>号码是职责，不是站位。</b></div></div>'
    + ROLES.map(g =>
      '<div class="sec" style="margin:16px 0 6px">'+esc(g.g)+'</div>' +
      g.items.map(it =>
        '<div class="card"><h4 style="margin:0 0 4px;font-size:15.5px">'+esc(it.n)+'</h4>' +
        '<div class="p">'+it.d+'</div>' +
        (it.ex && it.ex.length ? '<div class="hintline">现役例子（点击查看）：'+playerChips(it.ex)+'</div>' : "") +
        '<button class="chip b" data-roleai="'+esc(it.n)+'">🔍 AI 深挖这个角色（联网）</button>'
        +'<div id="roleAi-'+esc(it.n)+'" style="margin-top:6px"></div>'
        +'</div>').join("")
    ).join("");
  document.getElementById("roleGo").onclick=function(){
    if(roleSelIdx<0||!rolePlayerLabel){ document.getElementById("roleFitBox").innerHTML='<div class="hintline" style="color:#ffb4b7">先把 ① 角色 和 ② 球员 都选上</div>'; return; }
    renderRoleFit();
  };
  document.getElementById("roleSel").onclick=function(){
    openSheetPicker("① 选择角色",allRoles.map(function(r,i){ return {label:r.it.n+"（"+r.g+"）",v:String(i)};}),roleSelIdx,function(v){
      roleSelIdx=Number(v); roleSelLabel=allRoles[roleSelIdx].it.n+"（"+allRoles[roleSelIdx].g+"）";
      document.getElementById("roleSel").textContent=roleSelLabel; renderRoleFit();
    });
  };
  document.getElementById("rolePlayer").onclick=function(){
    openSheetPicker("② 选择球员",[{label:"球员库",items:playerNames.map(function(n){ return {label:n,v:n}; })}],"",function(v){
      rolePlayerLabel=v; document.getElementById("rolePlayer").textContent=v; renderRoleFit();
    });
  };
  $$("#tab-role [data-roleai]").forEach(b=>b.onclick=()=>roleAi(b.dataset.roleai));
}
function renderRoleFit(){
  if(roleSelIdx<0||!rolePlayerLabel){ document.getElementById("roleFitBox").innerHTML=""; return; }
  const gi=roleSelIdx, pn=rolePlayerLabel;
  const box=document.getElementById("roleFitBox");
  if(!gi||!pn){ box.innerHTML=""; return; }
  const all=[]; ROLES.forEach(g=>g.items.forEach(it=>all.push({g:g.g,it:it})));
  const r=all[Number(gi)]; const p=findPlayer(pn)||{n:pn,pos:[],tags:[]};
  const f=roleFit(r,p);
  const lv=f.sc>=70?["很适配","#8ef0b3"]:f.sc>=45?["可一试","#ffe1a1"]:["不合适","#ffb4b7"];
  box.innerHTML='<div class="card deep"><h3 style="margin:0 0 4px">'+esc(p.n)+' × '+esc(r.it.n)
    +' <span class="chip" style="color:'+lv[1]+';border-color:'+lv[1]+'55">'+lv[0]+' · '+f.sc+'分</span></h3>'
    +'<ul class="tight">'+f.why.map(w=>'<li>'+esc(w)+'</li>').join("")+'</ul>'
    +'<div class="hintline">基于球员库的本地规则打分（位置/标签/属性）；要看深度分析用上方各角色的「AI 深挖」。</div></div>';
}

/* ================= 球队页（v5：详细模板固定内容 + AI 赛季看板 + 定向查询） ================= */
let clubLeague = "";
function ttCard(t){
  const ai=window.TTAI&&TTAI.get(t.z);
  const axis=t.axis?['press','control','direct','low','width','tempo','pressdir','counter','cross']
    .map(k=>t.axis[k]!==undefined?t.axis[k]:'—').join(' · '):null;
  
  let h='<div class="card deep"><h3>'+(t.f||'')+esc(t.z)
    +(ai?' <span class="chip g" style="font-size:11px">🤖 已 AI 更新 '+new Date(ai.ts).toLocaleString()+'</span>':'')
    +'<small>'+esc(t.coach)+'｜'+esc(t.since||'—')+'｜'+esc(t.style||'')+'</small></h3>'
    +(t.base?'<div class="mrow"><b>纸面主阵型：</b>'+esc(t.base)+'</div>':'')
    +(t.now?'<div class="tagline">'+esc(t.now)+'</div>':'')
    +(t.role?'<div class="sec">主 帅 打 法 & 主 力 战 术 角 色（含转会信息）</div><div class="p">'+esc(t.role)+'</div>':'')
    +(t.good&&t.good.length?'<div class="sec">✅ 优 势（带前提）</div><ul class="tight">'
      +t.good.map(g=>'<li>'+esc(Array.isArray(g)?g[0]:g)+(Array.isArray(g)&&g[1]?'（前提：'+esc(g[1])+'）':'')+'</li>').join('')+'</ul>':'')
    +((t.badS&&t.badS.length)||(t.badC&&t.badC.length)?'<div class="sec">⚠️ 劣势 & 固有风险</div><ul class="tight">'
      +(t.badS||[]).map(x=>'<li><b>结构：</b>'+esc(x)+'</li>').join('')
      +(t.badC||[]).map(x=>'<li><b>能力依赖：</b>'+esc(x)+'</li>').join('')
      +'</ul>':'')
    +(t.var_?'<div class="sec">🔄 场 上 动 态 变 体</div>'+(Array.isArray(t.var_)?t.var_:[t.var_]).map(v=>'<div class="pairli">'+esc(v)+'</div>').join(''):'')
    +(t.counter?'<div class="sec">⚔️ 对 位 克 制</div>'+(Array.isArray(t.counter)?t.counter:[t.counter]).map(c=>{
        const red=/^被克制|^风险/.test(c);
        return '<div class="pairli" style="border-color:'+(red?'var(--red)':'var(--green)')+'">'+esc(c)+'</div>';}).join(''):'')
    +(t.key?'<div class="sec">👤 关 键 位 置 分 工</div>'+(Array.isArray(t.key)?t.key.map(k=>'<div class="pairli">'+esc(k)+'</div>').join(''):'<div class="p">'+esc(t.key)+'</div>'):'')
    +(t.fb?'<div class="pairli" style="border-color:var(--blue)"><b>边后卫分工：</b>'+esc(t.fb)+'</div>':'')
    +(t.phases?'<div class="sec">📌 三 阶 段 分 工</div><div class="pairli">'+esc(t.phases)+'</div>':'')
    +(t.transition?'<div class="pairli" style="border-color:var(--amber)"><b>转换阶段逻辑：</b>'+esc(t.transition)+'</div>':'')
    +(t.adjust?'<div class="sec">🔧 临 场 调 整</div><div class="pairli">'+esc(t.adjust)+'</div>':'')
    +(t.injury?'<div class="pairli" style="border-color:var(--red)"><b>伤病连锁影响：</b>'+esc(t.injury)+'</div>':'')
    +((t.risk||t.load)?'<div class="pairli" style="border-color:var(--red)"><b>赛季隐患与负荷：</b>'+esc([t.risk,t.load].filter(Boolean).join(' ／ '))+'</div>':'')
    +(t.setPiece?'<div class="hintline">🎯 定位球倾向：'+esc(t.setPiece)+'</div>':'')
    +(t.rep?'<div class="hintline">📌 代表变体分支：'+esc(t.rep)+'</div>':'')
    +(axis?'<div class="hintline">🎛️ 基准参数（压迫·控球·直接·低位·宽度·节奏·逼抢方向·反击·传中）：'+axis+'</div>':'')
    +'<div style="margin-top:8px"><button class="chip b" data-ttai="'+esc(t.z)+'">'+(ai?'🤖 再次 AI 更新':'🤖 AI 更新这支球队（联网搜官网最新）')+'</button></div>';
  if(ai&&ai.card){
    const a=ai.card;
    h+='<details style="margin-top:8px"><summary style="cursor:pointer;font-size:13px;color:#a8d2ff">🤖 AI 更新版内容（点击展开）</summary><div style="padding:6px 2px">'
      +(a.role?'<div class="sec">AI · 打法与主力</div><div class="p">'+esc(a.role)+'</div>':'')
      +((a.good||[]).length?'<ul class="tight">'+a.good.map(g=>'<li>'+esc(g)+'</li>').join('')+'</ul>':'')
      +((a.bad||[]).length?'<ul class="tight">'+a.bad.map(g=>'<li style="color:#ffb4b7">'+esc(g)+'</li>').join('')+'</ul>':'')
      +(a.risk?'<div class="pairli" style="border-color:var(--red)"><b>隐患：</b>'+esc(a.risk)+'</div>':'')
      +(a.sources?'<div class="hintline">来源：'+esc(a.sources)+'</div>':'')
      +'</div></details>';
  }
  return h+'</div>';
}
/* AI 更新单队（问题一：用户点哪队更哪队） */
async function ttAI(team){
  if(!window.TBSettings||!TBSettings.ready()){ alert('还没配置 AI：点右上角 ⚙'); return; }
  if(window._ttaiBusy) return;
  window._ttaiBusy=team;
  renderClubs();
  try{
    const cfg=TBSettings.cfg();
    const today=new Date().toISOString().slice(0,10);
    const sys='你是足球数据编辑。任务：为球队「'+team+'」做 2026-27 赛季最新战术卡片。'
      +'纪律：用 web_search 搜该队官网/权威媒体（2-4 次），只要 2026-27 赛季最新信息（现任主帅、夏窗转入转出、当前打法）；旧赛季信息一律不要。'
      +'只输出 JSON：{"role":"主帅打法+主力战术角色（120-180字，点名球员与转会）","good":["优势1（带前提）","优势2"],"bad":["短板/风险1-2条"],"risk":"赛季隐患与体能负荷一句","sources":"来源域名列表"}。不要 markdown、不要把工具调用写成文字。';
    const res=await TBAgent.run({base:cfg.base,key:TBSettings.aiKey(),model:cfg.model,
      system:sys,messages:[{role:'user',content:'球队：'+team+'，今天是 '+today}],
      tools:(cfg.search&&TBWebTools.available())?['web_search','web_fetch']:[],
      maxSteps:5,temp:cfg.temp,maxTokens:Math.max(cfg.tokens,2400)});
    const o=TBAgent.extractJSON(res.content);
    if(!o||!o.role) throw new Error('模型没有返回有效内容');
    window.TTAI.set(team,{ts:Date.now(),card:{role:o.role,good:o.good||[],bad:o.bad||[],risk:o.risk||'',sources:o.sources||''}});
  }catch(e){ alert('AI 更新失败：'+(e&&e.message)); }
  finally{ window._ttaiBusy=null; renderClubs(); }
}
window.TTAI=(function(){
  const KEY='tb_team_ai';
  function all(){ try{ return JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ return {}; } }
  function get(t){ return all()[t]||null; }
  function set(t,v){ const a=all(); a[t]=v; try{ localStorage.setItem(KEY,JSON.stringify(a)); }catch(e){} }
  return { get:get, set:set };
})();

function renderClubs(){
  const TT=window.TEAM_TACTICS||{clubs:[],nations:[]};
  const segs='<div class="card" style="padding:10px 14px"><div class="p" style="margin:0 0 4px">赛季战术分析（2026-27 固定内容 · 每个赛季手动更新 · 上次核对 '+esc(TT.Updated||'—')+'）· 最新动态用上方 AI 看板或「查这支」</div>'
    +'<div class="pillrow" id="clubFilter">'+["","英超","西甲","意甲","德甲","法甲","国家队"].map(l=>
      '<button data-l="'+l+'"'+(clubLeague===l?' class="on"':'')+'>'+(l||"全部")+'</button>').join("")+'</div></div>';
  let body='<div>'+TT.clubs.filter(c=>!clubLeague||clubLeague===c.lg).map(ttCard).join('')
    +TT.nations.filter(()=>!clubLeague||clubLeague==="国家队").map(ttCard).join('')+'</div>';
  $("#tab-club").innerHTML='<div id="briefingBox"></div>'+segs+body;
  $$("#clubFilter button").forEach(b=>b.onclick=()=>{ clubLeague=b.dataset.l; renderClubs(); window.scrollTo(0,0); });
  $$("#tab-club [data-ttai]").forEach(b=>b.onclick=()=>ttAI(b.dataset.ttai));
  if(window.renderBriefing) renderBriefing();
}

/* ================= 搜索页（search.js 实现 renderSearchModule） ================= */
function renderSearch(){
  if(window.renderSearchModule){ renderSearchModule(); return; }
  $("#tab-sr").innerHTML = '<div class="card"><h3>AI 搜索</h3><div class="p">加载中…（如一直显示请刷新）</div></div>';
}

/* ================= 导航 & 启动 ================= */
/* 问题六：记住每个板块的滚动位置，切回时恢复（不回顶） */
const _tabScroll={};
$$(".nav button").forEach(b => {
  b.onclick = () => {
    const cur=document.querySelector(".tab.on");
    if(cur) _tabScroll[cur.id]=window.scrollY;
    $$(".nav button").forEach(x=>x.classList.remove("on"));
    $$(".tab").forEach(x=>x.classList.remove("on"));
    b.classList.add("on");
    $("#"+b.dataset.t).classList.add("on");
    document.body.classList.toggle("sim-mode", b.dataset.t === "tab-sim");
    const y=_tabScroll[b.dataset.t]||0;
    requestAnimationFrame(()=>window.scrollTo(0,y));
  };
});

renderFormations();
renderRoles();
renderClubs();
renderSearch();
if(window.renderNotes) renderNotes();
