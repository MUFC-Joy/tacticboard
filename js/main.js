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
  let p = PLAYERS.find(p => p.n === name || (p.en||[]).some(e => e.toLowerCase() === String(name).toLowerCase()));
  if(p) return p;
  /* 精选库没有 → 40 队名单兜底（角色检测器/搜索都能选到这些球员） */
  if(window.SQUADS_ALL){
    for(const t of Object.keys(SQUADS_ALL)){
      const hit=(SQUADS_ALL[t].players||[]).find(q => q.n===name ||
        (q.en||[]).some(e => String(e).toLowerCase()===String(name).toLowerCase()));
      if(hit) return Object.assign({club:t,tags:[],st:hit.st||''},hit);
    }
  }
  try{
    const c=JSON.parse(localStorage.getItem('tb_player_cache')||'{}');
    for(const k of Object.keys(c)){
      const e=c[k];
      if(e.n===name||(e.en||[]).some(x=>String(x).toLowerCase()===String(name).toLowerCase()))
        return Object.assign({tags:[],st:''},e);
    }
  }catch(err){}
  return null;
}
/* 球员详情卡内容（openPlayer 与 角色面板内浮层 共用） */
function playerCardHtml(p){
  const posTxt = p.pos.map(x=>POSN[x]||x).join(" / ");
  return '<h3 style="margin:0 0 2px;font-size:20px">'+esc(p.n)+(p.num?' <small style="color:var(--mut);font-size:14px">#'+p.num+'</small>':'')+
    '<small style="color:var(--mut);font-weight:400;font-size:13px"> '+(p.en||[]).filter(e=>!/[\u4e00-\u9fa5]/.test(e)).join(" / ")+'</small></h3>' +
    '<div class="mrow"><b>位置：</b>'+posTxt+' &nbsp;·&nbsp; <b>惯用脚：</b>'+(p.foot||"待确认")+(p.age?' &nbsp;·&nbsp; <b>年龄：</b>'+p.age:'')+'</div>' +
    '<div class="mrow"><b>俱乐部：</b>'+esc(p.club||'待确认')+'（截至 2026.10） &nbsp;·&nbsp; <b>国家队：</b>'+esc(p.nat||'—')+'</div>' +
    (p.season?'<div class="mrow"><b>上季数据：</b>'+esc(p.season)+'</div>':"") +
    (p.status?'<div class="mrow" style="color:#ffb4b7"><b>状态：</b>'+esc(p.status)+'</div>':"") +
    '<div class="tagline" style="margin-top:8px">「'+esc(p.st||'暂无档案——去「搜索」页补一份')+'」</div>' +
    (p.tags && p.tags.length ? '<div>'+(p.tags.map(t=>'<span class="chip y">'+esc(t)+'</span>').join(""))+'</div>' : "") +
    (p.d?'<div class="sec">风 格 详 解</div><div class="p">'+esc(p.d)+'</div>':'') +
    (p.pair && p.pair.length ? '<div class="sec">谁 和 他 搭 配</div>'+p.pair.map(x=>'<div class="pairli">'+esc(x)+'</div>').join("") : "") +
    (p.a ? '<div class="sec">属 性 示 意（模拟器引擎用）</div><div class="hintline">速度 '+p.a.pace+' · 出球 '+p.a.pass+' · 防守 '+p.a.def+' · 争顶 '+p.a.air+' · 终结 '+p.a.fin+' · 体能 '+p.a.sta+'</div>' : "") +
    '<div class="warn">发现他转会/信息过期？在「搜索」页重新搜一次即可获取最新信息。</div>';
}
function openPlayer(name){
  const p = findPlayer(name);
  if(!p){ return; }
  $("#mbox").innerHTML =
    '<button class="mclose" onclick="closeModal()">✕</button>' + playerCardHtml(p);
  $("#modal").classList.add("on");
}
/* 问题八：在角色选择面板内直接弹出球员信息（不用关掉面板去主界面看） */
function openPlayerInPicker(name){
  const ov=document.getElementById('rpOv');
  const p=findPlayer(name);
  if(!ov||!p){ openPlayer(name); return; }
  let card=ov.querySelector('.rpPlayerOv');
  if(!card){
    card=document.createElement('div'); card.className='rpPlayerOv';
    card.innerHTML='<div class="rpCard"></div>';
    ov.querySelector('.rpBox').appendChild(card);
    card.addEventListener('click',e=>{ if(e.target===card) card.classList.remove('on'); });
  }
  const box=card.querySelector('.rpCard');
  box.innerHTML='<button class="mclose" style="position:absolute;top:10px;right:12px" onclick="this.closest(\'.rpPlayerOv\').classList.remove(\'on\')">✕</button>'+playerCardHtml(p);
  card.classList.add('on');
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


/* ================= 角色页（v5：位置提示 + 可搜索选择器 + 确定按钮） =================
   ① 角色适配检测器：选角色（带位置提示）+ 选球员 → 本地规则打分（位置/标签/属性/惯用脚）+ 理由
   ② 每个角色卡带「AI 深挖」：联网分析这个角色的现役最佳实践与训练要点（24h 缓存）
   ─────────────────────────────────────────────────────────
   修复记录（最大问题：一直「没有提示、不能选择、只有取消」）：
     · 旧代码把角色数组直接当成分组传进 openSheetPicker（应为 [{label,items}]），
       renderList 里读 g.items.filter 抛 TypeError，列表根本没渲染出来 —— 所以只剩取消按钮。
     · roleSelIdx=0 时 `if(!gi)` 把「第一个角色」当成没选，结果永远不出分。
     · 新版：重写选择器（分组 + 位置提示 + 详情预览 + 底部确定/取消），并修掉 0 值判断。
   ========================================================= */
const ROLE_GRP={门将:["GK"],中卫:["CB"],边后卫:["LB","RB","LWB","RWB"],翼卫:["LWB","RWB"],
  后腰:["DM"],中场:["CM"],前腰:["AM"],边锋:["LW","RW"],中锋:["ST"]};
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

function roleFlat(){
  const all=[];
  ROLES.forEach(g=>g.items.forEach(it=>all.push({g:g.g,it:it})));
  return all;
}
function roleGrpOf(r){
  const label=(r.pos||"")+" "+r.g;
  let grp="";
  if(/门将/.test(label)) grp="门将";
  else if(/中卫/.test(label)) grp="中卫";
  else if(/翼卫/.test(label)&&/边后卫/.test(label)) grp="边后卫";
  else if(/翼卫/.test(label)) grp="翼卫";
  else if(/后腰/.test(label)) grp="后腰";
  else if(/中场/.test(label)) grp="中场";
  else if(/前腰/.test(label)) grp="前腰";
  else if(/边锋/.test(label)) grp="边锋";
  else if(/中锋/.test(label)) grp="中锋";
  else grp="其他";
  return grp;
}
function roleMatchPos(p,grpKeys){
  return (p.pos||[]).some(function(x){ return grpKeys.indexOf(x)>=0; });
}
function roleFit(role,p){
  const keys = roleMatchKeys(role);
  let sc=0; const why=[]; const bars=[];
  const primary=(p.pos||[])[0];
  const exact=keys.indexOf(primary)>=0;
  const has=roleMatchPos(p,keys);
  const near=!has && (p.pos||[]).some(function(x){
    return keys.some(function(w){ return (NEAR[w]||[]).indexOf(x)>=0; });
  });
  let posScore=0;
  if(exact){ posScore=50; why.push("位置完全匹配（主位置 "+POSN[primary]+"，+50）"); }
  else if(has){ posScore=42; why.push("位置匹配（可打 "+keys.map(k=>POSN[k]||k).join("/")+"，+42）"); }
  else if(near){ posScore=24; why.push("位置邻近，可客串（+24）"); }
  else { posScore=4; why.push("位置不匹配，跨线使用风险高（+4）"); }
  sc+=posScore; bars.push({k:"位置",v:posScore,max:50});

  const text=(role.n||"")+(role.d||"");
  let tagHit=0;
  ROLE_TAGS.forEach(function(t){
    if(t[0].test(text)){
      const hit=(p.tags||[]).filter(function(x){ return t[1].some(function(y){ return String(x).indexOf(y)>=0; }); });
      if(hit.length&&tagHit<20){ tagHit+=10; why.push("标签匹配："+hit.join("/")+"（+10）"); }
    }
  });
  sc+=tagHit; bars.push({k:"技术标签",v:tagHit,max:20});

  let attrAdd=0;
  if(p.a){
    const avg=Math.round(((p.a.pace||60)+(p.a.pass||60)+(p.a.def||60)+(p.a.air||60)+(p.a.fin||60)+(p.a.sta||60))/6);
    attrAdd=Math.round(avg/4);
    sc+=attrAdd;
    why.push("库内属性均分 "+avg+"（+"+attrAdd+"）：速度"+p.a.pace+" 出球"+p.a.pass+" 防守"+p.a.def+" 争顶"+p.a.air+" 终结"+p.a.fin+" 体能"+p.a.sta);
  } else {
    why.push("球员库里没有他的属性数据——只按位置与标签判断，建议去「搜索」页补一份档案");
  }
  bars.push({k:"能力属性",v:attrAdd,max:25});

  let footAdd=0;
  if(p.foot&&/内切/.test(text)){
    if(p.foot==="右"&&(p.pos||[]).indexOf("LW")>=0){ footAdd=5; why.push("右脚踢左路=天然内切脚（+5）"); }
    if(p.foot==="左"&&(p.pos||[]).indexOf("RW")>=0){ footAdd=5; why.push("左脚踢右路=天然内切脚（+5）"); }
  }
  sc+=footAdd; bars.push({k:"惯用脚",v:footAdd,max:5});

  sc=Math.max(0,Math.min(99,sc));
  return {sc:sc,why:why,bars:bars};
}
function roleMatchKeys(role){
  const grp=roleGrpOf(role);
  if(grp==="边后卫") return ["LB","RB","LWB","RWB"];
  if(grp==="翼卫") return ["LWB","RWB"];
  return ROLE_GRP[grp]||[];
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

/* ---------- 通用选择器（角色 / 球员共用） ---------- */
function openPicker(opt){
  const old=document.getElementById('rpOv'); if(old) old.remove();
  const items=opt.items||[];
  const filters=opt.filters||[];
  let cur=opt.current==null?'':String(opt.current);
  let active=(opt.activeFilter||filters[0]||'');
  let curItem=items.filter(x=>String(x.v)===cur)[0]||null;

  const ov=document.createElement('div');
  ov.id='rpOv'; ov.className='rpOv';
  ov.innerHTML=''
    +'<div class="rpBox" role="dialog" aria-modal="true">'
    +  '<div class="rpHead"><div><div class="t">'+esc(opt.title)+'</div>'
    +    '<div class="s">'+esc(opt.sub||'')+'</div></div>'
    +    '<button class="x" data-rpclose="1" title="关闭">✕</button></div>'
    +  '<div class="rpBar"><input id="rpQ" placeholder="搜索'+esc(opt.searchHint||'名称或位置')+'…（留空显示全部）" autocomplete="off"></div>'
    +  '<div class="rpFilters" id="rpFilters">'
    +     filters.map(f=>'<button data-rpf="'+esc(f)+'"'+(f===active?' class="on"':'')+'>'+esc(f)+'</button>').join('')
    +  '</div>'
    +  '<div class="rpBody">'
    +    '<div class="rpList" id="rpList"></div>'
    +    '<div class="rpDet" id="rpDet"></div>'
    +  '</div>'
    +  '<div class="rpFoot">'
    +    '<div class="sel" id="rpSel">还没选</div>'
    +    '<span class="sp"></span>'
    +    '<button class="btn" data-rpcancel="1">取消</button>'
    +    '<button class="btn primary" id="rpOk" disabled>✅ 确定选择</button>'
    +  '</div>'
    +'</div>';
  document.body.appendChild(ov);

  function detailHtml(it){
    if(!it) return '<div class="empty">左侧选一个'+esc(opt.kind||'选项')+'，这里会显示它的位置提示、说明和现役例子。<br><br>提示：'+esc(opt.tip||'')+'</div>';
    return '<div class="ph">'+esc(opt.kindLabel||'详情')+'</div>'
      +'<div class="dn">'+esc(it.label)+'</div>'
      +(it.pos?'<div class="dp">位置：'+esc(it.pos)+'</div>':'')
      +(it.desc?'<div class="dd">'+esc(it.desc)+'</div>':'')
      +(it.ex&&it.ex.length?'<div class="dex">'+it.ex.map(n=>'<button data-rpex="'+esc(n)+'">'+esc(n)+'</button>').join('')+'</div>':'')
      +(it.tip?'<div class="dtip">'+esc(it.tip)+'</div>':'');
  }
  function render(){
    const q=(document.getElementById('rpQ').value||'').trim().toLowerCase();
    const list=document.getElementById('rpList');
    let h='',last='';
    items.forEach(it=>{
      if(active!=='全部'&&it.filter!==active) return;
      if(q&&!((it.label||'').toLowerCase().includes(q)||(it.pos||'').toLowerCase().includes(q)||(it.desc||'').toLowerCase().includes(q))) return;
      if(it.group&&it.group!==last){ h+='<div class="rpGroup">'+esc(it.group)+'</div>'; last=it.group; }
      h+='<button class="rpRow'+(String(it.v)===cur?' on':'')+'" data-rpv="'+esc(String(it.v))+'">'
        +'<span class="nm">'+esc(it.label)+'</span>'
        +(it.pos?'<span class="pos">'+esc(it.pos)+'</span>':'<span></span>')
        +(it.desc?'<span class="ds">'+esc(it.desc)+'</span>':'')
        +'</button>';
    });
    list.innerHTML=h||'<div class="hintline" style="padding:18px 6px">没有匹配项——换个关键词，或把上方筛选切回「全部」。</div>';
    list.querySelectorAll('[data-rpv]').forEach(b=>{
      b.onclick=function(){
        cur=b.dataset.rpv;
        curItem=items.filter(x=>String(x.v)===cur)[0]||null;
        render();
      };
    });
    document.getElementById('rpDet').innerHTML=detailHtml(curItem);
    /* 问题八：面板内的现役例子 → 在面板上层直接弹球员卡，不再跳到主界面弹窗 */
    document.querySelectorAll('#rpDet [data-rpex]').forEach(b=>{
      b.onclick=function(e){ e.stopPropagation(); openPlayerInPicker(b.dataset.rpex); };
    });
    const sel=document.getElementById('rpSel');
    sel.innerHTML=curItem?'已选：<b>'+esc(curItem.label)+'</b>'+(curItem.pos?'（'+esc(curItem.pos)+'）':''):'还没选';
    document.getElementById('rpOk').disabled=!curItem;
  }
  function close(){ ov.remove(); document.removeEventListener('keydown',onKey); }
  function onKey(e){
    if(e.key==='Escape'){ close(); }
    if(e.key==='Enter'&&curItem){ e.preventDefault(); confirm(); }
  }
  function confirm(){
    if(!curItem) return;
    const it=curItem; close(); opt.onOk(it);
  }
  ov.querySelector('[data-rpclose]').onclick=close;
  ov.querySelector('[data-rpcancel]').onclick=close;
  ov.querySelector('#rpOk').onclick=confirm;
  ov.addEventListener('click',e=>{ if(e.target===ov) close(); });
  document.addEventListener('keydown',onKey);
  document.getElementById('rpQ').addEventListener('input',render);
  document.getElementById('rpQ').focus();
  document.querySelectorAll('#rpFilters [data-rpf]').forEach(b=>{
    b.onclick=function(){
      active=b.dataset.rpf;
      document.querySelectorAll('#rpFilters [data-rpf]').forEach(x=>x.classList.toggle('on',x===b));
      render();
    };
  });
  render();
}

function openRolePicker(){
  const all=roleFlat();
  const GRPS=["全部","门将","中卫","边后卫","翼卫","后腰","中场","前腰","边锋","中锋","其他"];
  openPicker({
    title:'① 选择角色',
    sub:'共 '+all.length+' 个角色 · 每个角色都标了位置提示，选完点右下角「✅ 确定选择」',
    kind:'角色', kindLabel:'角色说明', searchHint:'角色名（如：出球中卫 / 翼卫 / 伪 9）',
    tip:'先按位置筛，再看位置提示。角色 ≠ 位置：位置决定你站哪，角色决定你在那儿干什么。',
    filters:GRPS,
    items:all.map(function(r,i){
      return {v:String(i),label:r.it.n,pos:r.it.pos||r.g,desc:r.it.d||'',ex:r.it.ex||[],
        filter:roleGrpOf(r.it),group:r.g};
    }),
    current:roleSelIdx>=0?String(roleSelIdx):'',
    onOk:function(it){
      roleSelIdx=Number(it.v);
      const r=all[roleSelIdx];
      roleSelLabel=r.it.n+'（'+r.it.pos+'）';
      const b=document.getElementById('roleSel');
      if(b){ b.querySelector('.v').textContent=r.it.n; b.querySelector('.h').textContent=r.it.pos; b.classList.add('set'); }
      roleMaybeRun();
    }
  });
}

function openPlayerPicker(){
  const names=[];
  const seen={};
  function push(p,src){
    if(!p||!p.n||seen[p.n]) return;
    seen[p.n]=1;
    names.push({v:p.n,label:p.n,pos:(p.pos||[]).map(x=>POSN[x]||x).join(' / '),
      desc:(src||p.club||'')+(p.st?' · '+p.st:''),club:src||p.club||'其它',
      filter:p.pos&&p.pos[0]?(POSN[p.pos[0]]||'其他'):'其他'});
  }
  (PLAYERS||[]).forEach(function(p){ push(p,p.club); });
  if(window.SQUADS_ALL){
    Object.keys(SQUADS_ALL).forEach(function(t){
      (SQUADS_ALL[t].players||[]).forEach(function(p){
        if(seen[p.n]) return;
        /* 同名近似去重：精选库已有「达洛特」时，名单里的「达洛」不再重复出现 */
        const near=Object.keys(seen).some(function(k){
          return k!==p.n && (k.indexOf(p.n)>=0||p.n.indexOf(k)>=0);
        });
        if(near) return;
        push({n:p.n,pos:p.pos,st:p.st,club:t},t);
      });
    });
  }
  names.sort(function(a,b){
    if(a.club!==b.club) return a.club.localeCompare(b.club,'zh');
    return a.label.localeCompare(b.label,'zh');
  });
  names.forEach(function(x){ x.group=x.club; });
  openPicker({
    title:'② 选择球员',
    sub:'球员库 + '+(window.SQUADS_ALL?Object.keys(SQUADS_ALL).length:32)+' 队全部名单（共 '+names.length+' 人）· 支持中英文搜索',
    kind:'球员', kindLabel:'球员档案', searchHint:'球员名（中/英文都行）',
    tip:'库里没有的人也先去「搜索」页搜一次，搜完会自动进球员库，这里就能选到。',
    filters:["全部","门将","中卫","左后卫","右后卫","左翼卫","右翼卫","后腰(6)","中场(8)","前腰(10)","左边锋","右边锋","中锋(9)","其他"],
    items:names,
    current:rolePlayerLabel||'',
    onOk:function(it){
      rolePlayerLabel=it.label;
      const b=document.getElementById('rolePlayer');
      if(b){ b.querySelector('.v').textContent=it.label; b.querySelector('.h').textContent=it.pos||''; b.classList.add('set'); }
      roleMaybeRun();
    }
  });
}

function roleMaybeRun(){
  if(roleSelIdx>=0&&rolePlayerLabel){
    renderRoleFit();
    runRoleFitAI(false);   /* 问题四：两个都选好 → 自动跑 AI 适配分析 */
  }
}

/* ================= 问题四：适配度查询 · AI 版（主）+ 本地规则初筛（辅） =================
   用户反馈：本地打分的「为什么」太敷衍、没有依据。改为：
   · 点「查询适配度」/ 两个都选好 → AI 联网分析（球员真实技术特点 + 俱乐部体系 + 2026-27 赛季表现）
   · 每条理由必须带依据；给出风险与「教练该怎么用他」
   · 本地规则分保留为折叠的初筛参考；AI 结果缓存 24h */
var roleFitCache={};
function roleFitCacheGet(){ try{ roleFitCache=JSON.parse(localStorage.getItem("tb_role_fit_ai")||"{}"); }catch(e){ roleFitCache={}; } }
roleFitCacheGet();
const ROLE_FIT_AI={busy:false,key:"",err:"",res:null};
function roleFitKey(){
  if(roleSelIdx<0||!rolePlayerLabel) return "";
  const r=roleFlat()[roleSelIdx];
  return r.it.n+"|"+rolePlayerLabel;
}
async function runRoleFitAI(force){
  const r=roleFlat()[roleSelIdx];
  if(!r||!rolePlayerLabel) return;
  const key=roleFitKey();
  const hit=roleFitCache[key];
  if(hit&&Date.now()-hit.ts<24*3600*1000&&!force){
    ROLE_FIT_AI.res=hit.res; ROLE_FIT_AI.err=""; ROLE_FIT_AI.key=key; renderRoleFit(); return;
  }
  if(!window.TBSettings||!TBSettings.ready()){ ROLE_FIT_AI.res=null; ROLE_FIT_AI.key=key; renderRoleFit(); return; }
  ROLE_FIT_AI.busy=true; ROLE_FIT_AI.key=key; ROLE_FIT_AI.err=""; ROLE_FIT_AI.res=null; renderRoleFit();
  try{
    const p=findPlayer(rolePlayerLabel)||{n:rolePlayerLabel,club:"",pos:[],tags:[]};
    const cfg=TBSettings.cfg();
    const sys='你是职业足球俱乐部的战术教练组分析师。任务：判断一名球员是否适配一个场上角色，输出有依据的深度结论。'
      +'纪律：①结合球员真实技术特点、当前俱乐部与教练体系、2026-27 赛季实际表现（联网核实 2-4 次）；'
      +'②每条理由都要带依据（球员特点/教练实际用法/赛季数据/对标案例），禁止「技术不错」「经验丰富」这类空话；'
      +'③结论必须给出可操作的用法建议。'
      +'只输出 JSON：{"verdict":"很适配|可一试|不合适","score":0-100,'
      +'"summary":"50-100字结论：让他打这个角色场上会发生什么",'
      +'"reasons":["支撑结论的理由1（依据：具体证据）","理由2（依据）","理由3（依据）"],'
      +'"risks":["不匹配/风险点1（什么情况下暴露）","风险点2"],'
      +'"fitNote":"教练该怎么用他才能扬长避短（50-90字，具体到站位/职责/搭档选择）",'
      +'"sources":"来源域名","conf":"fact|infer|guess"}。不要 markdown。';
    const user=JSON.stringify({role:{name:r.it.n,pos:r.it.pos||r.g,desc:r.it.d},
      player:{name:p.n,club:p.club||"",pos:p.pos||[],foot:p.foot||"",traits:p.st||"",tags:p.tags||[]},
      today:new Date().toISOString().slice(0,10)});
    const res=await TBAgent.run({base:cfg.base,key:TBSettings.aiKey(),model:cfg.model,
      system:sys,messages:[{role:"user",content:user}],
      tools:(cfg.search&&TBWebTools.available())?["web_search","web_fetch"]:[],maxSteps:5,temp:cfg.temp,
      maxTokens:Math.max(cfg.tokens,2400),
      onEvent:function(e){
        if(e.type==="tool_call"){ ROLE_FIT_AI.stage="联网核实 "+rolePlayerLabel+" 的赛季表现…"; renderRoleFit(); }
        else if(e.type==="step_start"){ ROLE_FIT_AI.stage="第 "+e.step+" 步分析…"; renderRoleFit(); }
      }});
    const o=TBAgent.extractJSON(res.content);
    if(!o||!o.verdict) throw new Error("模型没有返回有效结果");
    o.verdict=/很适配|适配/.test(o.verdict)?"很适配":(/可一试|轮换/.test(o.verdict)?"可一试":"不合适");
    ROLE_FIT_AI.res=o; ROLE_FIT_AI.stage="";
    roleFitCache[key]={res:o,ts:Date.now()};
    try{ localStorage.setItem("tb_role_fit_ai",JSON.stringify(roleFitCache)); }catch(e){}
  }catch(e){ ROLE_FIT_AI.err=(e&&e.message)||String(e); ROLE_FIT_AI.stage=""; }
  finally{ ROLE_FIT_AI.busy=false; renderRoleFit(); }
}

function renderRoleFit(){
  const box=document.getElementById('roleFitBox'); if(!box) return;
  if(roleSelIdx<0||!rolePlayerLabel){
    box.innerHTML='<div class="hintline">先把 ① 角色 和 ② 球员 都选上，AI 适配分析会自动开始。</div>';
    return;
  }
  const r=roleFlat()[roleSelIdx];
  if(!r){ box.innerHTML=''; return; }
  const p=findPlayer(rolePlayerLabel)||{n:rolePlayerLabel,pos:[],tags:[]};
  const f=roleFit(r.it,p);
  const ai=ROLE_FIT_AI.key===roleFitKey()?ROLE_FIT_AI.res:null;
  const aiBusy=ROLE_FIT_AI.key===roleFitKey()&&(ROLE_FIT_AI.busy||ROLE_FIT_AI.stage);
  const aiErr=ROLE_FIT_AI.key===roleFitKey()?ROLE_FIT_AI.err:"";
  const aiReady=!!(window.TBSettings&&TBSettings.ready());
  const VERDICT_COLOR={"很适配":"#8ef0b3","可一试":"#ffe1a1","不合适":"#ffb4b7"};
  /* 主卡：AI 分析（未配置 AI 或失败时回退本地分） */
  let main="";
  if(aiBusy){
    main='<div class="card deep"><div class="aiFitHead"><span class="aibadge2">AI</span><b>AI 适配分析中</b></div>'
      +'<div class="hintline" style="color:#a8d2ff">'+esc(ROLE_FIT_AI.stage||'联网核实球员赛季表现与俱乐部体系…')+'</div></div>';
  }else if(ai){
    const vc=VERDICT_COLOR[ai.verdict]||"#ffe1a1";
    const sc=Math.max(0,Math.min(100,Number(ai.score)||0));
    const R=54,C=2*Math.PI*R,off=C*(1-sc/100);
    main='<div class="card deep"><div class="aiFitHead"><span class="aibadge2">AI</span><b>AI 深度适配分析</b>'
      +'<span class="hintline" style="margin:0 0 0 auto">'+(ai.conf==="fact"?"已联网核实":ai.conf==="guess"?"未能核实，谨慎参考":"含联网核实")+(ai.sources?' · '+esc(ai.sources):'')+'</span></div>'
      +'<div class="rfit">'
      +  '<div class="rscore">'
      +    '<div class="rring"><svg width="132" height="132" viewBox="0 0 132 132">'
      +      '<circle cx="66" cy="66" r="'+R+'" fill="none" stroke="#ffffff12" stroke-width="10"/>'
      +      '<circle cx="66" cy="66" r="'+R+'" fill="none" stroke="'+vc+'" stroke-width="10" stroke-linecap="round"'
      +        ' stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'"/>'
      +    '</svg><div class="num"><b>'+sc+'</b><span>AI 适配分 / 100</span></div></div>'
      +    '<div class="rlv" style="color:'+vc+'">'+esc(ai.verdict)+'</div>'
      +    '<div class="hintline">'+esc(p.n)+' × '+esc(r.it.n)+'</div>'
      +  '</div>'
      +  '<div class="rwhy">'
      +    '<div class="p" style="margin-top:0">'+esc(ai.summary||'')+'</div>'
      +    ((ai.reasons&&ai.reasons.length)?'<div class="sec" style="margin:10px 0 2px">依 据（逐条可追溯）</div><ul class="tight">'
      +      ai.reasons.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'')
      +    ((ai.risks&&ai.risks.length)?'<div class="sec" style="margin:10px 0 2px;color:#ffb4b7">风 险 与 不 匹 配 点</div><ul class="tight">'
      +      ai.risks.map(x=>'<li style="color:#ffb4b7">'+esc(x)+'</li>').join('')+'</ul>':'')
      +    (ai.fitNote?'<div class="pairli" style="margin-top:10px;border-left-color:var(--blue)"><b>教练该怎么用他：</b>'+esc(ai.fitNote)+'</div>':'')
      +    (ai.sources?'<div class="rnote">来源：'+esc(ai.sources)+'</div>':'')
      +  '</div>'
      +'</div>'
      +'<details style="margin-top:8px"><summary style="cursor:pointer;font-size:12px;color:var(--mut)">本地规则初筛（位置/标签/属性打分，仅供参考）</summary>'
      +  localFitHtml(f,p,r)+'</details>'
      +'<div style="margin-top:8px"><button class="btn ghost" id="roleAiRefit">↻ 重新 AI 分析（最新数据）</button></div>'
      +'</div>';
  }else{
    /* 未配置 AI 或失败：本地分为主，明确提示 AI 才有深度结论 */
    const lv=f.sc>=70?["很适配","#8ef0b3"]:f.sc>=45?["可一试","#ffe1a1"]:["不合适","#ffb4b7"];
    const R=54,C=2*Math.PI*R,off=C*(1-f.sc/100);
    main='<div class="card deep"><div class="aiFitHead"><b>本地规则初筛</b>'
      +(aiReady?'<span class="hintline" style="margin:0 0 0 auto;color:#ffb4b7">'+esc(aiErr||'AI 分析失败')+'</span>'
               :'<span class="hintline" style="margin:0 0 0 auto">未配置 AI——点右上角 ⚙ 配置后这里会换成带联网核实的深度分析</span>')+'</div>'
      +'<div class="rfit">'
      +  '<div class="rscore">'
      +    '<div class="rring"><svg width="132" height="132" viewBox="0 0 132 132">'
      +      '<circle cx="66" cy="66" r="'+R+'" fill="none" stroke="#ffffff12" stroke-width="10"/>'
      +      '<circle cx="66" cy="66" r="'+R+'" fill="none" stroke="'+lv[1]+'" stroke-width="10" stroke-linecap="round"'
      +        ' stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'"/>'
      +    '</svg><div class="num"><b>'+f.sc+'</b><span>初筛分 / 100</span></div></div>'
      +    '<div class="rlv" style="color:'+lv[1]+'">'+lv[0]+'</div>'
      +    '<div class="hintline">'+esc(p.n)+' × '+esc(r.it.n)+'</div>'
      +  '</div>'
      +  '<div class="rwhy">'+localFitHtml(f,p,r)+'</div>'
      +'</div></div>';
  }
  box.innerHTML=main;
  const rb=document.getElementById('roleAiRefit');
  if(rb) rb.onclick=function(){ runRoleFitAI(true); };
}
function localFitHtml(f,p,r){
  return '<div class="sec" style="margin:0 0 2px">打 分 拆 解</div>'
    +'<div class="rbars">'+f.bars.map(function(b){
        const pct=Math.round(b.v/b.max*100);
        return '<div class="rbar"><span>'+b.k+'</span><span class="tr"><i style="width:'+pct+'%"></i></span><span>'+b.v+'/'+b.max+'</span></div>';
      }).join('')+'</div>'
    +'<div class="sec" style="margin:12px 0 2px">为什么是这个分</div>'
    +'<ul>'+f.why.map(w=>'<li>'+esc(w)+'</li>').join('')+'</ul>'
    +'<div class="rnote">本地规则只看「位置对不对、标签像不像」：位置 50 分 + 技术标签 20 分 + 库内属性 25 分 + 惯用脚 5 分。深度判断以 AI 版为准。</div>';
}

function renderRoles(){
  const all=roleFlat();
  const teamN=window.SQUADS_ALL?Object.keys(SQUADS_ALL).length:32;
  $("#tab-role").innerHTML =
    '<div class="card deep"><h3>🧩 角色适配检测器<small>选角色 + 选球员，AI 联网给深度适配分析</small></h3>'
    +'<div class="p" style="margin:2px 0 10px">位置决定你站哪，<b>角色决定你在那儿干什么</b>。左边选一个角色（都带位置提示），右边选一个球员——两个都选好后 <b>AI 自动联网分析</b>（球员技术特点+俱乐部体系+本赛季表现），本地规则分只作初筛参考。</div>'
    +'<div class="roledrop">'
    +  '<button class="slotbtn'+(roleSelIdx>=0?' set':'')+'" id="roleSel">'
    +    '<span class="k">① 选角色</span>'
    +    '<span class="v">'+(roleSelIdx>=0?esc(roleFlat()[roleSelIdx].it.n):'还没选')+'</span>'
    +    '<span class="h">'+(roleSelIdx>=0?esc(roleFlat()[roleSelIdx].it.pos):'门线型 / 出球中卫 / 边后腰 … 共 '+all.length+' 个')+'</span></button>'
    +  '<button class="slotbtn'+(rolePlayerLabel?' set':'')+'" id="rolePlayer">'
    +    '<span class="k">② 选球员</span>'
    +    '<span class="v">'+(rolePlayerLabel?esc(rolePlayerLabel):'还没选')+'</span>'
    +    '<span class="h">球员库 + '+teamN+' 队名单，支持中英文搜索</span></button>'
    +'</div>'
    +'<div class="rolego"><button class="btn primary" id="roleGo">🤖 AI 适配分析</button>'
    +  '<button class="btn ghost" id="roleReset">↺ 清空重选</button>'
    +  '<span class="hintline" style="margin:0">两个都选好后会自动出结果，也可以手动点查询</span></div>'
    +'<div id="roleFitBox" style="margin-top:10px"></div></div>'
    +'<div class="card"><h3>位置编号速查</h3><div class="p">1=门将 · 2-5=后卫 · 6=后腰（保护弧顶的人）· 8=中中场（要防守的组织者）· 10=前腰（不落位的组织者）· 7/11=边锋 · 9=中锋。<b>号码是职责，不是站位。</b></div></div>'
    + ROLES.map(g =>
        '<div class="sec" style="margin:18px 0 8px">'+esc(g.g)+'</div><div class="rolegrid">' +
        g.items.map(it =>
          '<div class="rolecard"><h4>'+esc(it.n)+(it.pos?'<span class="pp">'+esc(it.pos)+'</span>':'')+'</h4>'
          +'<div class="dd">'+it.d+'</div>'
          +(it.ex&&it.ex.length?'<div class="ex">现役例子（点击查看）：'+playerChips(it.ex)+'</div>':'')
          +'<div class="foot"><button class="btn" data-roleuse="'+esc(it.n)+'">用这个角色测适</button>'
          +'<button class="btn ghost" data-roleai="'+esc(it.n)+'">🔍 AI 深挖（联网）</button></div>'
          +'<div id="roleAi-'+esc(it.n)+'" style="margin-top:2px"></div></div>').join('')
        +'</div>').join('');

  document.getElementById("roleGo").onclick=function(){
    if(roleSelIdx<0||!rolePlayerLabel){
      document.getElementById("roleFitBox").innerHTML='<div class="hintline" style="color:#ffb4b7">先把 ① 角色 和 ② 球员 都选上</div>';
      return;
    }
    renderRoleFit();
    runRoleFitAI(true);   /* 问题四：查询按钮 = 强制跑一次 AI 适配分析 */
  };
  document.getElementById("roleReset").onclick=function(){
    roleSelIdx=-1; roleSelLabel=""; rolePlayerLabel=""; renderRoles();
  };
  document.getElementById("roleSel").onclick=openRolePicker;
  document.getElementById("rolePlayer").onclick=openPlayerPicker;
  $$("#tab-role [data-roleai]").forEach(b=>b.onclick=()=>roleAi(b.dataset.roleai));
  $$("#tab-role [data-roleuse]").forEach(b=>b.onclick=function(){
    const name=b.dataset.roleuse;
    const idx=all.findIndex(r=>r.it.n===name);
    if(idx<0) return;
    roleSelIdx=idx; roleSelLabel=all[idx].it.n+'（'+all[idx].it.pos+'）';
    document.getElementById('roleSel').querySelector('.v').textContent=all[idx].it.n;
    document.getElementById('roleSel').querySelector('.h').textContent=all[idx].it.pos;
    document.getElementById('roleSel').classList.add('set');
    roleMaybeRun();
    document.getElementById('roleFitBox').scrollIntoView({block:'center',behavior:'smooth'});
  });
  renderRoleFit();
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
  if(ai&&ai.modules){
    h+='<div class="sec" style="margin-top:12px">🤖 AI 战术看板 · 九大模块（实时战况层）</div>'+ttModulesHtml(ai);
  }else if(ai&&ai.card){
    /* 旧版缓存兼容 */
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
/* AI 更新单队（问题九：九大模块框架 · 以最近伤病+最近几场打法为基准，不是笼统赛季总结）
   1 对阵克制体系 2 位置轮换与伤病代偿链条 3 主客场+时段差异化 4 量化数据锚点
   5 近3-5场实战趋势复盘 6 定位球攻防专项 7 教练临场换人&变阵习惯库
   8 赛程双线压力与体能风险 9 核心球员区域职责与战术绑定 */
async function ttAI(team){
  if(!window.TBSettings||!TBSettings.ready()){ alert('还没配置 AI：点右上角 ⚙'); return; }
  if(window._ttaiBusy) return;
  window._ttaiBusy=team;
  renderClubs();
  try{
    const cfg=TBSettings.cfg();
    const today=new Date().toISOString().slice(0,10);
    const sys='你是足球数据编辑+职业队战术分析师。任务：为球队「'+team+'」生成 2026-27 赛季 AI 战术看板（九大模块）。'
      +'今天是 '+today+'。纪律：\n'
      +'①必须联网搜索（4-6 次）：该队最近 3-5 场比赛结果与打法、最新伤病/停赛名单、本场赛前新闻、数据网站口径（FBref/Sofascore 类）；\n'
      +'②分析必须以「最近的伤病 + 最近几场的实际打法」为基准——不能只做整个赛季的笼统总结，赛季整体只作背景；战术变化要说明是哪场比赛之后开始变的；\n'
      +'③查不到的字段填 null 或空数组，绝不编造；量化数据必须标注样本范围（近5场联赛/欧战）与来源；\n'
      +'④九大模块全部是「实时战况层」，不要复述球队固定卡片里的通用优劣势。\n'
      +'只输出 JSON（不要 markdown）：\n'
      +'{\n'
      +'"recentBasis":"本卡依据：最近查到的比赛/伤病概况（60-100字）",\n'
      +'"m1":{"base":"基准首发战术在场上实际执行的克制逻辑（80-120字，具体到阵型与打法）","counters":["天然克制哪些阵型/打法+逻辑，2-3条"],"weakTo":["被哪些打法克制+薄弱环节，2-3条"],"conditions":["克制生效的前提（全员健康/体能/主场/对手单后腰等），1-3条"],"oppCounter":["对手实战常用反制手段+成功案例场次，1-3条"]},\n'
      +'"m2":{"pool":["位置轮换池：位置=第一替补/第二替补，替补登场后战术哪里削弱哪里补强，3-5条"],"coreOut":{"planA":"核心伤缺A方案：同位置顶替维持原有打法","planB":"B方案：整体变阵换打法（教练历史选择）"},"chain":["关键球员伤缺的连锁影响：相邻位置职责/进攻或防守链条断点/风险点，2-3条"],"suspension":"红黄牌停赛 vs 长期伤病的轮换差异"},\n'
      +'"m3":{"home":"主场版本：压迫强度/推进倾向/防线高低/得分时段分布","away":"客场版本：压迫收缩幅度/反击启动/防线落位/易丢分时段","halves":"上下半场差异+60/75分钟后的固定调整偏好","states":"领先/落后/平局三种比分状态下的战术切换逻辑"},\n'
      +'"m4":{"xg":"场均xG/xGA与每90预期得失球（区分首发基准阵型与赛中变阵，标样本）","press":"高位夺回区域/PPDA/压迫成功转化/被转换打穿次数","zones":"边路/肋部/中路触球占比、传中频次、二点球成功率","note":"样本范围+数据来源+局限性（伤病/轮换导致失真）"},\n'
      +'"m5":{"trend":"近3-5场趋势判定：上行/平稳/下滑+依据（战术执行/体能伤病/对手强度/裁判）","matches":[{"m":"对手+比分","form":"首发阵型","changes":"赛中变阵与调整后效果（变好/变差）"}],"problems":["连续多场反复暴露的防守漏洞/进攻卡壳环节"],"positives":["连续多场稳定奏效的套路/结构优势"]},\n'
      +'"m6":{"attack":"定位球进攻：主罚手/跑位套路/接应点/得分区域/换人后定位球阵容变化","defence":"定位球防守模式（人盯人/区域）/防空薄弱点/易漏人区域","coach":"定位球教练偏好（关键时段是否加码）","types":"角球/前场任意球/禁区前沿任意球/点球各自的战术安排"},\n'
      +'"m7":{"windows":"换人时间规律（55-60/70-75min常规窗口，被动伤病vs主动战术区分）","intents":["换人意图标签（加强推进/增加对抗/补防空/稳固防守/提速冲身后/控节奏），3-5条"],"formChanges":["换人前阵型→换人后阵型+职责改动，2-4条"],"successRate":"同类调整过往提升/恶化局势的比例"},\n'
      +'"m8":{"priorities":"联赛+欧战/杯赛双线取舍：优先保哪条线、哪条线大幅轮换","fatigue":"密集赛程下的体能拐点：比赛多少分钟后执行力下降","injuryRisk":"高压打法+密集赛程下最易疲劳性伤病的球员+教练减负手段"},\n'
      +'"m9":[{"player":"战术核心1","zone":"固定活动热区","duty":"主要职责与出球线路","varies":"变阵后职责是否改变","ifStopped":"被锁死后球队的替代进攻路线（没有替代路线就标注致命短板）"}],\n'
      +'"sources":"来源域名列表"}';
    const res=await TBAgent.run({base:cfg.base,key:TBSettings.aiKey(),model:cfg.model,
      system:sys,messages:[{role:'user',content:'球队：'+team+'，今天是 '+today}],
      tools:(cfg.search&&TBWebTools.available())?['web_search','web_fetch']:[],
      maxSteps:8,temp:cfg.temp,maxTokens:Math.max(cfg.tokens,8000)});
    const o=TBAgent.extractJSON(res.content);
    if(!o||!o.m1) throw new Error('模型没有返回有效内容');
    window.TTAI.set(team,{ts:Date.now(),until:today,recentBasis:o.recentBasis||'',modules:{
      m1:o.m1,m2:o.m2,m3:o.m3,m4:o.m4,m5:o.m5,m6:o.m6,m7:o.m7,m8:o.m8,m9:o.m9||[]},sources:o.sources||''});
  }catch(e){ alert('AI 更新失败：'+(e&&e.message)); }
  finally{ window._ttaiBusy=null; renderClubs(); }
}
/* 九大模块渲染（问题九） */
function ttModulesHtml(ai){
  const m=ai&&ai.modules; if(!m) return '';
  const arr=v=>Array.isArray(v)?v:[];
  const lst=a=>a&&a.length?'<ul class="tight">'+a.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'';
  function mod(no,title,body,open){
    return '<details class="ttmod'+(open?' open':'')+'"'+(open?' open':'')+'><summary><i class="tno">'+no+'</i>'+esc(title)+'</summary><div class="ttmodb">'+body+'</div></details>';
  }
  let h='';
  if(ai.recentBasis) h+='<div class="pairli" style="border-color:var(--amber)"><b>本卡依据（截至 '+esc(ai.until||'')+')：</b>'+esc(ai.recentBasis)+'</div>';
  const M=m.m1&&mod('1','对阵克制体系（绑定实战战术）',
      (m.m1.base?'<div class="p">'+esc(m.m1.base)+'</div>':'')
      +'<div class="sec" style="margin:8px 0 2px">① 基准首发变体 · 克制 / 被克制</div>'+lst(m.m1.counters)+lst(m.m1.weakTo)
      +'<div class="sec" style="margin:8px 0 2px">③ 克制的前提条件</div>'+lst(m.m1.conditions)
      +'<div class="sec" style="margin:8px 0 2px">④ 对手常规反制手段</div>'+lst(m.m1.oppCounter)
      +(m.m1.weakTo||m.m1.conditions?'':'<div class="hintline">（本轮 AI 没有产出该模块内容）</div>'));
  if(M) h+=M;
  if(m.m2) h+=mod('2','位置轮换与伤病代偿链条',
      '<div class="sec" style="margin:0 0 2px">① 常规轮换池</div>'+lst(m.m2.pool)
      +(m.m2.coreOut?'<div class="sec" style="margin:8px 0 2px">② 核心伤缺代偿</div>'
        +'<div class="pairli"><b>A方案（同位置顶替）：</b>'+esc(m.m2.coreOut.planA||'—')+'</div>'
        +'<div class="pairli" style="border-color:var(--blue)"><b>B方案（整体变阵）：</b>'+esc(m.m2.coreOut.planB||'—')+'</div>':'')
      +'<div class="sec" style="margin:8px 0 2px">③ 连锁影响标注</div>'+lst(m.m2.chain)
      +(m.m2.suspension?'<div class="sec" style="margin:8px 0 2px">④ 停赛适配</div><div class="p">'+esc(m.m2.suspension)+'</div>':''));
  if(m.m3) h+=mod('3','主客场 + 时段差异化战术',
      '<div class="pairli"><b>① 主场版本：</b>'+esc(m.m3.home||'—')+'</div>'
      +'<div class="pairli" style="border-color:var(--blue)"><b>② 客场版本：</b>'+esc(m.m3.away||'—')+'</div>'
      +'<div class="pairli" style="border-color:var(--amber)"><b>③ 上下半场差异：</b>'+esc(m.m3.halves||'—')+'</div>'
      +'<div class="pairli"><b>④ 领先/落后/平局切换：</b>'+esc(m.m3.states||'—')+'</div>');
  if(m.m4) h+=mod('4','权威量化数据锚点（与战术描述对应）',
      '<div class="pairli"><b>① 基础预期数据：</b>'+esc(m.m4.xg||'—')+'</div>'
      +'<div class="pairli"><b>② 压迫相关数据：</b>'+esc(m.m4.press||'—')+'</div>'
      +'<div class="pairli"><b>③ 攻防分区数据：</b>'+esc(m.m4.zones||'—')+'</div>'
      +(m.m4.note?'<div class="hintline">④ 数据备注：'+esc(m.m4.note)+'</div>':''));
  if(m.m5) h+=mod('5','近 3-5 场实战趋势复盘',
      '<div class="pairli" style="border-color:'+(/下行|下滑/.test(m.m5.trend||'')?'var(--red)':'var(--green)')+'"><b>① 趋势判定：</b>'+esc(m.m5.trend||'—')+'</div>'
      +'<div class="sec" style="margin:8px 0 2px">② 每场变体记录</div>'
      +arr(m.m5.matches).map(x=>'<div class="pairli"><b>'+esc(x.m||'')+'</b>｜首发 '+esc(x.form||'—')+'<br><span style="color:#cdd7e1">'+esc(x.changes||'')+'</span></div>').join('')
      +'<div class="sec" style="margin:8px 0 2px">③ 重复暴露共性问题</div>'+lst(m.m5.problems)
      +'<div class="sec" style="margin:8px 0 2px">④ 正向稳定亮点</div>'+lst(m.m5.positives));
  if(m.m6) h+=mod('6','定位球攻防专项',
      '<div class="pairli"><b>① 进攻：</b>'+esc(m.m6.attack||'—')+'</div>'
      +'<div class="pairli" style="border-color:var(--blue)"><b>② 防守：</b>'+esc(m.m6.defence||'—')+'</div>'
      +'<div class="pairli" style="border-color:var(--amber)"><b>③ 教练偏好：</b>'+esc(m.m6.coach||'—')+'</div>'
      +'<div class="pairli"><b>④ 分项安排：</b>'+esc(m.m6.types||'—')+'</div>');
  if(m.m7) h+=mod('7','教练临场换人 & 变阵习惯库',
      '<div class="pairli"><b>① 换人时间规律：</b>'+esc(m.m7.windows||'—')+'</div>'
      +'<div class="sec" style="margin:8px 0 2px">② 换人意图标签</div>'+lst(m.m7.intents)
      +'<div class="sec" style="margin:8px 0 2px">③ 换人前后阵型变化</div>'+lst(m.m7.formChanges)
      +(m.m7.successRate?'<div class="pairli"><b>④ 历史成功率：</b>'+esc(m.m7.successRate)+'</div>':''));
  if(m.m8) h+=mod('8','赛程双线压力与体能风险',
      '<div class="pairli"><b>① 双线取舍：</b>'+esc(m.m8.priorities||'—')+'</div>'
      +'<div class="pairli" style="border-color:var(--amber)"><b>② 体能拐点：</b>'+esc(m.m8.fatigue||'—')+'</div>'
      +'<div class="pairli" style="border-color:var(--red)"><b>③ 伤病放大风险：</b>'+esc(m.m8.injuryRisk||'—')+'</div>');
  if(m.m9&&m.m9.length) h+=mod('9','核心球员区域职责与战术绑定',
      m.m9.map(c=>'<div class="pairli"><b>'+esc(c.player)+'</b><br>'
        +'热区：'+esc(c.zone||'—')+'<br>职责：'+esc(c.duty||'—')
        +'<br>变阵后：'+esc(c.varies||'—')
        +(c.ifStopped?'<br><span style="color:#ffb4b7">被锁死后：'+esc(c.ifStopped)+'</span>':'')+'</div>').join(''));
  if(ai.sources) h+='<div class="hintline">来源：'+esc(ai.sources)+' · 生成于 '+new Date(ai.ts).toLocaleString()+'</div>';
  return h;
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
  let body='<div class="ttgrid">'+TT.clubs.filter(c=>!clubLeague||clubLeague===c.lg).map(ttCard).join('')
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

/* ================= 问题十二：主题换色（只换全局强调色，内容零改动） =================
   点侧栏底部的圆点切换，存本机；默认「经典红」 */
window.TBTheme=(function(){
  const KEY='tb_accent';
  const THEMES=[["","经典红","#e2383f"],["green","草皮绿","#2fbf71"],["blue","夜场蓝","#4ea1ff"],
    ["gold","琥珀金","#f0b429"],["violet","罗兰紫","#a78bfa"]];
  function get(){ try{ return localStorage.getItem(KEY)||""; }catch(e){ return ""; } }
  function apply(){ const v=get();
    if(v) document.documentElement.setAttribute('data-accent',v);
    else document.documentElement.removeAttribute('data-accent'); }
  function set(v){ try{ localStorage.setItem(KEY,v); }catch(e){} apply(); }
  function render(){
    const host=document.getElementById('themeSel'); if(!host) return;
    host.innerHTML='<span class="tlabel">主题</span>'+THEMES.map(function(t){
      return '<button data-tacc="'+t[0]+'" title="'+t[1]+'" style="--c:'+t[2]+'" class="'+(get()===t[0]?'on':'')+'"></button>'; }).join('');
    host.querySelectorAll('[data-tacc]').forEach(function(b){
      b.onclick=function(){ set(b.dataset.tacc); render(); };
    });
  }
  apply(); render();
  return {set:set,get:get,render:render};
})();

/* ================= 导航 & 启动 ================= */
/* 问题六：记住每个板块的滚动位置，切回时恢复（不回顶） */
const _tabScroll={};
$$(".navbtns button").forEach(b => {
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
