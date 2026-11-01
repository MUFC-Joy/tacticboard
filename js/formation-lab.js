/* =========================================================
   阵型实验室（问题七）—— 交互球场 + 教练输入 + AI 推演 + 长按热区
   ─────────────────────────────────────────────────────────
   交互规则（防误触）：
     · 单击位置卡 = 填/改球员（弹窗，自动补全）
     · 长按 ≥500ms（带进度环反馈）= AI 热区：该教练体系下他覆盖哪里/往哪跑/职能
   AI 推演优先级（全局）：
     ① 用户手写教练描述（最高，可推翻一切）
     ② 该教练公开真实打法（仅名字时联网搜索获取；有描述时仅作补充）
     ③ 上场球员能力 · ④ 阵型底盘知识库（仅兜底）
   冲突时以用户为准并标注「你设定的要求和该教练常规打法不一致，本次按你的要求推演」
   ========================================================= */
"use strict";
window.FLab=(function(){
  var KEY='tb_flab', ZKEY='tb_flab_zones';
  /* 阵型底盘坐标（与引擎一致：y 越小越靠前） */
  var FORMS={
    '4-2-3-1':[['GK',50,90],['RB',84,72],['CB',62,77],['CB',38,77],['LB',16,72],
               ['DM',62,55],['DM',38,55],['RW',84,34],['AM',50,38],['LW',16,34],['ST',50,14]],
    '4-3-3':  [['GK',50,90],['RB',84,72],['CB',62,77],['CB',38,77],['LB',16,72],
               ['CM',70,54],['DM',50,58],['CM',30,54],['RW',82,30],['ST',50,14],['LW',18,30]],
    '3-4-2-1':[['GK',50,90],['CB',70,77],['CB',50,80],['CB',30,77],
               ['RWB',88,54],['CM',62,54],['CM',38,54],['LWB',12,54],
               ['AM',64,32],['AM',36,32],['ST',50,12]],
    '4-4-2':  [['GK',50,90],['RB',84,74],['CB',62,78],['CB',38,78],['LB',16,74],
               ['RM',84,50],['CM',62,52],['CM',38,52],['LM',16,50],['ST',62,18],['ST',38,18]],
    '4-1-4-1':[['GK',50,90],['RB',84,74],['CB',62,78],['CB',38,78],['LB',16,74],
               ['DM',50,60],['RM',84,42],['CM',62,44],['CM',38,44],['LM',16,42],['ST',50,16]],
    '5-4-1':  [['GK',50,91],['CB',70,75],['CB',50,75],['CB',30,75],
               ['RWB',88,72],['LWB',12,72],['RM',80,54],['CM',60,55],['CM',40,55],['LM',20,54],['ST',50,24]]
  };
  var ST={form:'4-2-3-1',coach:'',desc:'',xi:{},analysis:null,anTs:0,zones:{}};
  var busy=false,zoneBusy=null,stage='',err='';

  function load(){
    try{ var d=JSON.parse(localStorage.getItem(KEY)||'null');
      if(d){ ST.form=d.form||'4-2-3-1'; ST.coach=d.coach||''; ST.desc=d.desc||'';
             ST.xi=d.xi||{}; ST.analysis=d.analysis||null; ST.anTs=d.anTs||0; } }catch(e){}
    try{ ST.zones=JSON.parse(localStorage.getItem(ZKEY)||'{}'); }catch(e){ ST.zones={}; }
  }
  function save(){
    try{ localStorage.setItem(KEY,JSON.stringify({form:ST.form,coach:ST.coach,desc:ST.desc,
      xi:ST.xi,analysis:ST.analysis,anTs:ST.anTs})); }catch(e){}
    try{ localStorage.setItem(ZKEY,JSON.stringify(ST.zones)); }catch(e){}
  }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  /* ---------- 球员候选（精选库+32队名单+缓存） ---------- */
  var _namesCache=null;
  function allNames(){
    if(_namesCache) return _namesCache;
    var out=[],seen={};
    function add(n,en){ if(!n||seen[n]) return; seen[n]=1; out.push({n:n,en:en||''}); }
    (window.PLAYERS||[]).forEach(function(p){ add(p.n,(p.en||[]).filter(function(e){return !/[\u4e00-\u9fa5]/.test(e);})[0]); });
    if(window.SQUADS_ALL) Object.keys(SQUADS_ALL).forEach(function(t){
      (SQUADS_ALL[t].players||[]).forEach(function(p){ add(p.n,p.n); });
    });
    try{ var c=JSON.parse(localStorage.getItem('tb_player_cache')||'{}');
      Object.keys(c).forEach(function(k){ add(c[k].n,c[k].en&&c[k].en[0]); }); }catch(e){}
    _namesCache=out;
    return out;
  }
  function findP(name){
    var q=String(name||'').trim().toLowerCase(); if(!q) return null;
    var hit=null;
    (window.PLAYERS||[]).some(function(p){
      if(p.n===name||((p.en||[]).some(function(e){ return e.toLowerCase()===q; }))){ hit=p; return true; } return false; });
    if(hit) return hit;
    if(window.SQUADS_ALL) for(var t in SQUADS_ALL){
      var arr=SQUADS_ALL[t].players||[];
      for(var i=0;i<arr.length;i++){
        if(arr[i].n.toLowerCase()===q||String(arr[i].n).toLowerCase()===q){
          hit={n:arr[i].n,pos:window.expandPos?expandPos((arr[i].pos||[])[0]||'CM'):(arr[i].pos||[]),foot:arr[i].foot,club:t,nat:arr[i].nat,age:arr[i].age,st:'',tags:[]};
          return hit;
        }
      }
    }
    try{ var c=JSON.parse(localStorage.getItem('tb_player_cache')||'{}');
      for(var k in c){ var e=c[k];
        if(e.n===name||(e.en||[]).some(function(x){ return String(x).toLowerCase()===q; })) return e; } }catch(err2){}
    return null;
  }

  /* ---------- 渲染 ---------- */
  function slotsOf(){ return FORMS[ST.form]||FORMS['4-2-3-1']; }
  function pitchHtml(){
    var slots=slotsOf();
    /* 叠加显示所有已生成热区（当前阵型+教练下的全部已填球员） */
    var zones=[];
    Object.keys(ST.xi).forEach(function(i){
      if(!ST.xi[i]) return;
      var z=ST.zones[ST.form+'|'+(ST.coach||'').trim()+'|'+ST.xi[i]];
      if(z&&z.zones) zones=zones.concat(z.zones);
    });
    var tok='';
    slots.forEach(function(sl,i){
      var name=ST.xi[i]||'';
      tok+='<div class="dot dot2'+(name?'':' empty')+(zoneBusy===i?' pressing':'')+'" data-slot="'+i+'" style="left:'+sl[1]+'%;top:'+sl[2]+'%">'
        +(name?esc(name):'+')+'<small>'+(name?sl[0]:'点击填人')+'</small>'
        +'<span class="ring"></span></div>';
    });
    var zs=zones.map(function(z){
      var col=z.kind==='def'?'rgba(78,161,255,.28)':z.kind==='attack'?'rgba(226,56,63,.30)':'rgba(240,180,41,.28)';
      var border=z.kind==='def'?'#4ea1ff':z.kind==='attack'?'#e2383f':'#f0b429';
      return '<div class="fzone" style="left:'+z.x+'%;top:'+z.y+'%;width:'+(z.r*2)+'%;padding-bottom:'+(z.r*2)+'%;'
        +'background:'+col+';border:1.5px dashed '+border+'" title="'+esc(z.label||'')+'">'
        +'<span>'+esc(z.label||'')+'</span></div>';
    }).join('');
    return '<div class="pitch" style="aspect-ratio:.78">'+zs+tok+'</div>';
  }
  function render(){
    var el=document.getElementById('tab-fmt'); if(!el) return;
    var slots=slotsOf();
    var filled=slots.filter(function(_,i){ return ST.xi[i]; }).length;
    var chips=Object.keys(FORMS).map(function(f){
      return '<button class="fchip '+(ST.form===f?'on':'')+'" data-flform="'+f+'">'+f+'</button>'; }).join('');
    el.innerHTML=
      '<div class="card deep"><h3>🧪 阵型实验室<small>灵活排阵 + AI 推演 + 长按看热区</small></h3>'
      +'<div class="p">点球场上的位置卡填球员（支持搜 32 队全部名单+球员库）；长按 0.5 秒看他在这个教练体系下的<b>覆盖热区/跑动方向/职能</b>。单击=编辑，长按=热区，不会误触。</div>'
      +'<div class="sec">阵 型</div><div class="pillrow" id="flForms">'+chips+'</div>'
      +'<div class="sec">主教练（只填名字 = AI 自动参考他真实惯用打法）</div>'
      +'<div class="searchrow"><input id="flCoach" placeholder="教练名：卡里克 / Guardiola…" value="'+esc(ST.coach)+'"></div>'
      +'<div class="sec">你的战术想法（可选，优先级最高，可推翻该教练常规打法）</div>'
      +'<textarea id="flDesc" style="width:100%;background:var(--card2);border:1px solid var(--line);border-radius:10px;color:var(--txt);padding:11px;font-size:14px;font-family:inherit;min-height:64px" '
      +'placeholder="提示：只输入教练名字，将自动参考该教练真实惯用打法；\n如果同时写下你的战术想法，你的描述优先级最高，真实教练风格仅用来补充完善。\n可写：压迫习惯、攻防偏好、转换思路、对特定位置的要求、领先/落后临场调整、防守方式（人盯人/区域）、讨厌的打法。">'+esc(ST.desc)+'</textarea>'
      +'<div class="hintline" id="flCount">已填 '+filled+'/11 人'+(ST.coach?' · 教练 '+esc(ST.coach):' · 还没填教练')+'</div>'
      +'<button class="optbtn" id="flGo" style="text-align:center'+(filled<11||!ST.coach?';opacity:.5':'')+'">▶ 开始分析（'+esc(ST.form)+' + 教练 + 11 人）</button>'
      +(filled<11||!ST.coach?'<div class="hintline" style="color:#ffe1a1">还差：'+(filled<11?('还剩 '+(11-filled)+' 个位置没填'):'')+(filled<11&&ST.coach?' + ':'')+(!ST.coach?'教练名没填':'')+'——填完才能开始分析</div>':'')
      +(err?'<div class="hintline" style="color:#ffb4b7">'+esc(err)+'</div>':'')
      +'</div>'
      +'<div class="card"><h3>球场（单击填人 · 长按看热区 · 点3次消热区）</h3>'+pitchHtml()
      +(zoneBusy!=null?'<div class="hintline" style="color:#a8d2ff">'+esc(zoneStage())+'</div>':'')
      +'<div class="hintline">热区在球场上叠加显示；想关掉某个球员的热区：单击他 3 次；或 <button class="chip" id="flZoneClear">🧹 一键清除全部热区</button> ｜ <button class="chip" id="flClearAll">🧹 一键清除全部球员</button></div>'
      +zoneListHtml()
      +'</div>'
      +analysisHtml()
      +knowledgeHtml();
    bind();
  }
  var _zoneT0=0;
  /* 问题十：已生成热区清单（缓存即回看，不必二次分析；换阵型/教练后自动失效） */
  function zoneListHtml(){
    var keys=Object.keys(ST.zones).filter(function(k){ return k.indexOf(ST.form+'|'+(ST.coach||'').trim()+'|')===0; });
    if(!keys.length) return '';
    return '<div class="hintline" style="margin-top:6px">当前可回看热区（缓存，点击 ✕ 清除单个；换阵型/教练/球员后需重新分析）：'
      +keys.map(function(k){
        var who=k.split('|')[2];
        return '<span class="chip b" style="margin:2px">'+esc(who)+' <button data-zdel="'+esc(k)+'" style="background:none;border:0;color:#ffb4b7;cursor:pointer;font-weight:700">✕</button></span>';
      }).join('')+'</div>';
  }
  function zoneStage(){
    if(zoneBusy==null) return '';
    var el=Math.round((Date.now()-_zoneT0)/1000);
    if(zoneBusy===-1) return 'AI 热区生成中… '+el+'s';
    return 'AI 正在分析「'+(ST.xi[zoneBusy]||'')+'」的热区… '+el+'s（库内没有的球员会联网查特点）';
  }

  function bind(){
    var el=document.getElementById('tab-fmt');
    el.querySelectorAll('[data-flform]').forEach(function(b){
      b.onclick=function(){ ST.form=b.dataset.flform; save(); render(); };
    });
    var ci=document.getElementById('flCoach');
    ci.addEventListener('change',function(){ ST.coach=ci.value.trim(); save(); render(); });
    var cd=document.getElementById('flDesc');
    cd.addEventListener('change',function(){ ST.desc=cd.value; save(); });
    document.getElementById('flGo').onclick=function(){ if(filled11()) runAnalysis(); };
    el.querySelectorAll('[data-flvar]').forEach(function(b){
      b.onclick=function(){
        ST.variantSel=b.dataset.flvar||null;
        save();
        if(ST.variantSel&&filled11()) runAnalysis(); else render();
      };
    });
    /* 单击 vs 长按（防误触：按住 500ms 触发热区，提前松开=单击） */
    var timer=null,pressed=null;
    el.querySelectorAll('[data-slot]').forEach(function(d){
      var i=Number(d.dataset.slot);
      d.addEventListener('pointerdown',function(e){
        pressed=i;
        d.classList.add('pressing');
        timer=setTimeout(function(){
          timer=null; pressed=null;
          startZone(i);
        },650);
      });
      d.addEventListener('pointerup',function(){
        d.classList.remove('pressing');
        if(timer){ clearTimeout(timer); timer=null;
          if(pressed===i) tapSlot(i); }
        pressed=null;
      });
      d.addEventListener('pointerleave',function(){
        d.classList.remove('pressing');
        if(timer){ clearTimeout(timer); timer=null; }
        pressed=null;
      });
    });
    var zb=document.getElementById('flZoneClear');
    if(zb) zb.onclick=clearAllZones;
    el.querySelectorAll('[data-zdel]').forEach(function(b){
      b.onclick=function(){ delete ST.zones[b.dataset.zdel]; save(); render(); };
    });
    var cb2=document.getElementById('flClearAll');
    if(cb2) cb2.onclick=function(){ if(confirm('清空全部 11 个位置的球员？')){ ST.xi={}; ST.variantSel=null; save(); render(); } };
  }

  var _zoneTaps={};
  function tapSlot(i){
    var name=ST.xi[i];
    var ck=name?(ST.form+'|'+(ST.coach||'').trim()+'|'+name):null;
    if(ck&&ST.zones[ck]){
      _zoneTaps[i]=(_zoneTaps[i]||0)+1;
      if(_zoneTaps[i]>=3){ delete ST.zones[ck]; _zoneTaps={}; save(); render(); return; }
      editSlot(i); /* 继续开放编辑，同时计数 */
      return;
    }
    _zoneTaps={};
    editSlot(i);
  }
  function clearAllZones(){ ST.zones={}; _zoneTaps={}; save(); render(); }

  function filled11(){
    var n=0; for(var k in ST.xi){ if(ST.xi[k]) n++; }
    return n>=11&&ST.coach.trim();
  }


  function findDup(name,exceptIdx){
    var q=String(name||'').trim().toLowerCase();
    if(!q) return -1;
    for(var k in ST.xi){ if(Number(k)!==exceptIdx&&String(ST.xi[k]).trim().toLowerCase()===q) return Number(k); }
    return -1;
  }

  /* ---------- 填人弹窗 ---------- */
  function editSlot(i){
    var slots=slotsOf(), slot=slots[i][0];
    var cur=ST.xi[i]||'';
    var names=allNames();
    var mb=document.getElementById('mbox');
    mb.innerHTML='<button class="mclose" onclick="closeModal()">✕</button>'
      +'<h3 style="margin:0 0 4px">'+slot+' 位 · 填球员</h3>'
      +'<div class="searchrow"><input id="flSlotQ" placeholder="输入名字（可中文/英文），支持全部 32 队名单" value="'+esc(cur)+'"></div>'
      +'<div class="hintline">直接输入任意名字也能用（AI 分析时会联网查他的技术特点）。</div>'
      +'<div id="flDupErr" class="hintline" style="color:#ffb4b7"></div>'
      +'<div class="plist" id="flCands" style="max-height:36vh;overflow:auto"></div>'
      +'<button class="optbtn" id="flSlotOk" style="text-align:center;border-color:var(--green)">✅ 确定（'+slot+' 位）</button>'
      +'<button class="optbtn" id="flSlotClear">清空这个位置</button>';
    document.getElementById('modal').classList.add('on');
    var inp=document.getElementById('flSlotQ');
    /* 问题四：空输入不推荐球员——输入至少 1 个字才出匹配列表 */
    function renderCands(){
      var q2=inp.value.trim().toLowerCase();
      var wrap=document.getElementById('flCands');
      if(!q2){ wrap.innerHTML='<div class="hintline" style="padding:8px 4px">👆 输入名字后这里显示匹配名单（不自动推荐）</div>'; return; }
      var list=names.filter(function(x){
        return x.n.toLowerCase().indexOf(q2)>=0||(x.en||'').toLowerCase().indexOf(q2)>=0;
      }).slice(0,30);
      wrap.innerHTML=list.length?list.map(function(x){
        return '<div class="mini" data-n="'+esc(x.n)+'" style="padding:9px 12px;margin-bottom:6px;cursor:pointer"><h4 style="margin:0;font-size:14px">'+esc(x.n)+(x.en&&x.en!==x.n?' <small style="color:var(--mut)">'+esc(x.en)+'</small>':'')+'</h4></div>';
      }).join(''):'<div class="hintline" style="padding:8px 4px">没有匹配——可以直接点上面的「确定」用这个名字（AI 会联网查他）</div>';
      wrap.querySelectorAll('[data-n]').forEach(function(m){
        m.onclick=function(){ inp.value=m.dataset.n; confirmSlot(); };
      });
    }
    function confirmSlot(){
      var v=inp.value.trim();
      if(!v){ delete ST.xi[i]; save(); closeModal(); render(); return; }
      var dup=findDup(v,i);
      if(dup>=0){
        var slots2=slotsOf();
        document.getElementById('flDupErr').textContent='⚠ '+v+' 已经在「'+slots2[dup][0]+'」位上了——一个球员只能占一个位置，先把他从那边清掉或换个球员。';
        renderCands();
        return;
      }
      ST.xi[i]=v; save(); closeModal(); render();
    }
    document.getElementById('flSlotOk').onclick=confirmSlot;
    inp.addEventListener('keydown',function(e){ if(e.key==='Enter') confirmSlot(); });
    var timer=null;
    inp.addEventListener('input',function(){
      clearTimeout(timer); var self=this;
      timer=setTimeout(function(){ renderCands(); try{ self.focus(); }catch(e){} },160);
    });
    document.getElementById('flSlotClear').onclick=function(){ delete ST.xi[i]; save(); closeModal(); render(); };
    renderCands();
    inp.focus();
  }

  /* ---------- 长按热区：该教练体系下球员覆盖/跑动/职能 ---------- */
  async function startZone(i){
    if(!window.TBSettings||!TBSettings.ready()){ editSlot(i); return; }  /* 未配置 AI：长按退化为编辑，不至于「点不开」 */
    var name=ST.xi[i]; if(!name){ err='这个位置还没填球员'; render(); return; }
    var ck=ST.form+'|'+(ST.coach||'').trim()+'|'+name;
    if(ST.zones[ck]){ zoneBusy=null; render(); showZone(ck); return; }
    zoneBusy=i; _zoneT0=Date.now(); err=''; render();
    try{
      var cfg=TBSettings.cfg();
      var p=findP(name);
      var pDesc=p?('库内特点：位置('+(p.pos||[]).join('/')+') '+(p.foot?p.foot+'脚 ':'')+(p.st||'')+' '+(p.tags||[]).join('/')):'（库里没有该球员，AI 需联网查他的技术特点与主打位置）';
      var needSearch=!p;
      var sys='你是足球战术分析师。任务：给一名球员在某教练体系+某阵型的某个位置上的场上热区。'
        +'若球员特点库里没有，先用 web_search 查他的踢球风格（最多 1-2 次）。'
        +'只输出 JSON：{"zones":[{"x":0-100,"y":0-100,"r":8-30,"label":"职责（6字内）","kind":"attack|hold|def"}],'
        +'"summary":"2-3句：他会覆盖哪里、往哪个方向移动、职能是什么（持球时 vs 无球时）"}。'
        +'坐标系：x 左0右100，y 前场0后场100（我方球门在 y=100）。zones 给 2-4 个（持球区域/无球覆盖/插上方向）。不要 markdown。';
      var user=JSON.stringify({player:name,playerDesc:pDesc,formation:ST.form,slot:slotsOf()[i][0],
        coach:ST.coach,coachUserDesc:ST.desc||'（无，按教练真实打法）'});
      var res=await TBAgent.run({base:cfg.base,key:TBSettings.aiKey(),model:cfg.model,
        system:sys,messages:[{role:'user',content:user}],
        tools:(cfg.search&&TBWebTools.available())?['web_search','web_fetch']:[],
        maxSteps:5,temp:cfg.temp,maxTokens:1600,
        onEvent:function(e){ if(e.type==='tool_call') stage='联网查 '+name+' 的特点…'; render(); }});
      var o=TBAgent.extractJSON(res.content);
      if(!o||!o.zones||!o.zones.length) throw new Error('热区生成失败');
      ST.zones[ck]={zones:o.zones.slice(0,4),summary:String(o.summary||'')};
      save();
    }catch(e2){ err='热区失败：'+(e2&&e2.message); }
    finally{ zoneBusy=null; render(); }
  }
  function showZone(ck){
    var z=ST.zones[ck]; if(!z) return;
    var mb=document.getElementById('mbox');
    mb.innerHTML='<button class="mclose" onclick="closeModal()">✕</button>'
      +'<h3 style="margin:0 0 4px">热区解读</h3>'
      +'<div class="p">'+esc(z.summary||'')+'</div>'
      +'<div class="hintline">热区已叠在球场上（红=进攻 黄=持球 蓝=防守/覆盖）。换教练或改阵型后长按会重新生成。</div>';
    document.getElementById('modal').classList.add('on');
  }

  /* ---------- 开始分析（七、AI 执行逻辑 · 二、阵型模板输出） ---------- */
  async function runAnalysis(){
    if(busy) return;
    if(!window.TBSettings||!TBSettings.ready()){ err='还没配置 AI：点右上角「⚙ AI 设置」'; render(); return; }
    busy=true; err=''; stage='整理阵型与球员'; render();
    try{
      var cfg=TBSettings.cfg();
      var slots=slotsOf();
      var xi=slots.map(function(sl,i){ return {slot:sl[0],name:ST.xi[i]||null,
        lib:(function(){ var p=findP(ST.xi[i]); return p?{pos:p.pos,foot:p.foot,st:p.st,tags:p.tags,club:p.club}:null; })()};
      });
      var mode=ST.desc.trim()?'B（名字+用户描述）':'A（仅名字）';
    /* 并行预搜索：教练打法+库里没有的球员特点，一次性喂给模型 */
    var pre='';
    if(window.TBWebTools&&TBSettings.cfg().search&&TBWebTools.available()){
      stage='并行联网搜索教练打法与球员特点…'; render();
      var qs=[ST.coach+' coach tactics philosophy 2026-27'];
      var missing=xi.filter(function(x){ return x.name&&!x.lib; }).slice(0,2);
      missing.forEach(function(m){ qs.push(m.name+' player profile playing style'); });
      pre=await TBWebTools.prefetch(qs);
    }
      var sys='你是足球战术推演师。输入：教练（可能只有名字，也可能带用户自述）+ 阵型 + 11 人。'
        +'优先级：①用户口述（最高，可推翻一切）→ ②教练公开真实打法（联网核实；有用户描述时仅补全遗漏）→ ③上场球员能力（库内特点；缺的联网查，忽略伤病）→ ④阵型底盘常识（仅兜底）。'
        +'若用户描述与教练常规打法冲突：以用户为准，并输出 conflict:true。联网预算：最多 4 次。'
        +'球员名统一用用户填写的名字，不要用别称替换（如统一用「阿什拉夫」不用「哈基米」）。所有点评必须结合用户选的具体球员。中文。'
        +'只输出 JSON 对象（不要 markdown），结构固定：\n'
       +'{\n'
       +'"conflict":true,\n'
       +'"站位":"纸面站位说明 60-100字",\n'
       +'"summary":"一句话总摘要：纸面阵型X，核心思路：……；上限是……，死穴是……（80-130字）",\n'
       +'"优势":[{"x":"优势点","前提":"什么条件下才成立"}],\n'
       +'"劣势":{"结构":["阵型自带短板"],"能力依赖":["球员不匹配才暴露"]},\n'
       +'"变体":[{"n":"变体名","when":"触发时机","how":"哪些球员怎么移动","why":"战术目的","risk":"该变体风险（搏杀/高风险形态必填）"}]（3-4条，覆盖持球/无球/转换）,\n'
       +'"三阶段":{"持球":"…","无球":"…","转换":"…","高位逼抢":"短时手段：触发时机｜变化方式｜风险（40-80字）"},\n'
       +'"克制":{"克制":["…"],"被克制":["…"],"拆解":["…"]},\n'
       +'"定位球":{"进攻":"主罚手+争顶点+二点埋伏+短板（点名球员）","防守":"区域盯人混合+高点+后点+风险点"},\n'
       +'"伤病":[{"缺谁":"球员名","连锁":"缺他后哪些环节崩、谁补位（40-70字）"}]（3-4条，点名场上球员）,\n'
       +'"关键位置":[{"pos":"位置","need":"能力","avoid":"避雷"}]（按用户选的球员逐个点评）,\n'
       +'"陷阱":"本方固有陷阱（具体到人）",\n'
       +'"传中应对":"对手下底传中的应对（具体到人）",\n'
       +'"体能":"体能消耗与换人预案",\n'
       +'"中锋风险":"纯终结型中锋适配风险：①背身短板对长传体系的影响 ②被低位锁死的退化 ③压迫贡献低；解法：长传找谁、串联交给谁（80-120字；非纯终结型写null）",\n'
       +'"基准轴":{"press":0-3,"control":0-3,"direct":0-3,"low":0-3,"width":0-3,"tempo":0-3,"pressdir":0-3,"counter":0-3,"cross":0-3},\n'
       +'"临场":{"领先":"…","落后":"…","僵持":"…"}\n'
       +'}\n';
      var user=(pre?('联网预搜结果（可直接引用，尽量不必再调工具）：\n'+pre+'\n\n'):'')
        +JSON.stringify({formation:ST.form,coach:ST.coach,inputMode:mode,userDesc:ST.desc||'（无）',
        xi:xi,
        variant:ST.variantSel?('请按【'+ST.variantSel+'】形态重点推演（用户已选择这个变体）'):'（常规推演，变体仍要全给）'});
      var res=await TBAgent.run({base:cfg.base,key:TBSettings.aiKey(),model:cfg.model,
        system:sys,messages:[{role:'user',content:user}],
        tools:(cfg.search&&TBWebTools.available())?['web_search','web_fetch']:[],
        maxSteps:5,temp:cfg.temp,maxTokens:Math.max(cfg.tokens,3600),
        onEvent:function(e){
          if(e.type==='tool_call') stage='联网查 '+(e.args&&e.args.query?String(e.args.query).slice(0,22):e.name)+'…';
          else if(e.type==='step_start') stage='第 '+e.step+' 步推演…';
          render();
        }});
      var o=TBAgent.extractJSON(res.content);
      if(!o||typeof o!=='object'||Array.isArray(o)) throw new Error('模型没有返回有效 JSON');
      ST.analysis=o; ST.anTs=Date.now();
      save();
    }catch(e){ err='分析失败：'+(e&&e.message); }
    finally{ busy=false; stage=''; render(); }
  }
  function analysisHtml(){
    if(busy) return '<div class="card"><h3>AI 推演中</h3><div class="hintline" style="color:#a8d2ff">'+esc(stage)+'</div></div>';
    if(!ST.analysis) return '';
    var o=ST.analysis;
    var h='<div class="card deep"><h3>📋 你的阵容 · 模板推演<small>'+new Date(ST.anTs).toLocaleString()
      +(ST.variantSel?' · 变体：'+esc(ST.variantSel):'')+'</small></h3>';
    if(o.conflict===true||String(o.conflict||'').indexOf('true')>=0)
      h+='<div class="hintline" style="color:#ffe1a1">⚠ 你设定的要求和该教练常规打法不一致，本次按你的要求推演。</div>';
    if(o.站位) h+='<div class="sec">纸 面 站 位</div><div class="p">'+esc(o.站位)+'</div>';
    if(o.summary) h+='<div class="pairli" style="border-color:var(--amber)"><b>一句话摘要：</b>'+esc(o.summary)+'</div>';
    if(o.优势&&o.优势.length){
      h+='<div class="sec">✅ 优 势（带前提）</div><ul class="tight">'
        +o.优势.map(function(x){ return '<li>'+esc(x.x||x)+'（前提：'+esc(x.前提||'见上')+'）</li>'; }).join('')+'</ul>';
    }
    if(o.劣势){
      h+='<div class="sec">⚠️ 劣势 & 固有风险</div><ul class="tight">'
        +(o.劣势.结构||[]).map(function(x){ return '<li><b>结构性短板（阵型自带）：</b>'+esc(x)+'</li>'; }).join('')
        +(o.劣势.能力依赖||[]).map(function(x){ return '<li><b>能力依赖型短板：</b>'+esc(x)+'</li>'; }).join('')
        +'</ul>';
    }
    if(o.陷阱) h+='<div class="pairli" style="border-color:var(--red)"><b>本方固有陷阱：</b>'+esc(o.陷阱)+'</div>';
    if(o.定位球){
      h+='<div class="sec">🎯 定 位 球 专 项</div>'
        +(o.定位球.进攻?'<div class="pairli"><b>进攻：</b>'+esc(o.定位球.进攻)+'</div>':'')
        +(o.定位球.防守?'<div class="pairli" style="border-color:var(--blue)"><b>防守：</b>'+esc(o.定位球.防守)+'</div>':'');
    }
    if(o.伤病&&o.伤病.length){
      h+='<div class="sec">🏥 伤 病 / 缺 人 连 锁 风 险</div>'
        +o.伤病.map(function(x){ return '<div class="pairli" style="border-color:var(--red)"><b>'+esc(x.缺谁||x)+'伤停：</b>'+esc(x.连锁||'')+'</div>'; }).join('');
    }
    if(o.变体&&o.变体.length){
      h+='<div class="sec">🔄 场 上 动 态 变 体（点一个变体=按它重新推演）</div>'
        +'<div class="pillrow">'+o.变体.map(function(v){
          return '<button class="chip b" data-flvar="'+esc(v.n||v)+'">'+esc(v.n||v)+'</button>'; }).join('')
        +(ST.variantSel?'<button class="chip r" data-flvar="">✕ 退回常规推演</button>':'')+'</div>'
        +o.变体.map(function(v){
          v=v.n?v:{n:v};
          return '<div class="pairli"><b>'+esc(v.n)+'</b>｜触发时机：'+esc(v.when||'—')
            +'<br>变化方式：'+esc(v.how||'—')+'<br>战术目的：'+esc(v.why||'—')
            +(v.risk?'<br><span style="color:#ffb4b7">⚠ 风险：'+esc(v.risk)+'</span>':'')+'</div>';
        }).join('');
    }
    if(o.三阶段){
      h+='<div class="sec">📌 三 阶 段 分 工</div>'
        +['持球','无球','转换','高位逼抢'].map(function(k){ return o.三阶段[k]?'<div class="pairli"><b>'+k+'：</b>'+esc(o.三阶段[k])+'</div>':''; }).join('');
    }
    if(o.克制){
      h+='<div class="sec">⚔️ 对 位 克 制</div>'
        +(o.克制.克制||[]).map(function(x){ return '<div class="pairli">克制：'+esc(x)+'</div>'; }).join('')
        +(o.克制.被克制||[]).map(function(x){ return '<div class="pairli" style="border-color:var(--red)">被克制：'+esc(x)+'</div>'; }).join('')
        +(o.克制.拆解||[]).map(function(x){ return '<div class="hintline">对手拆解：'+esc(x)+'</div>'; }).join('');
    }
    if(o.关键位置&&o.关键位置.length){
      h+='<div class="sec">👤 关 键 位 置（结合你选的球员）</div>'
        +o.关键位置.map(function(k){ return '<div class="pairli"><b>'+esc(k.pos)+'</b>：'+esc(k.need||'')
          +(k.avoid?' <span style="color:#ffb4b7">｜避雷：'+esc(k.avoid)+'</span>':'')+'</div>'; }).join('');
    }
    if(o.中锋风险) h+='<div class="pairli" style="border-color:var(--amber)"><b>纯终结型中锋适配风险：</b>'+esc(o.中锋风险)+'</div>';
    if(o.传中应对) h+='<div class="pairli" style="border-color:var(--blue)"><b>对手频繁下底传中的应对：</b>'+esc(o.传中应对)+'</div>';
    if(o.体能) h+='<div class="pairli"><b>体能消耗问题：</b>'+esc(o.体能)+'</div>';
    if(o.基准轴){
      var a=o.基准轴;
      h+='<div class="sec">📐 基 准 轴（仅参考，低于你的口述）</div>'
        +'<div class="hintline">标签：压迫 '+(a.press??'—')+'・控球 '+(a.control??'—')
        +'・直接 '+(a.direct??'—')+'・低位 '+(a.low??'—')+'・宽度 '+(a.width??'—')+'・节奏 '+(a.tempo??'—')
        +'・逼抢方向 '+(a.pressdir??'—')+'・反击 '+(a.counter??'—')+'・传中 '+(a.cross??'—')+'</div>';
    }
    if(o.临场){
      h+='<div class="sec">🔧 临 场 调 整</div>'
        +['领先','落后','僵持'].map(function(k){ return o.临场[k]?'<div class="pairli"><b>'+k+'：</b>'+esc(o.临场[k])+'</div>':''; }).join('');
    }
    h+='</div>';
    return h;
  }

  /* ---------- 阵型知识卡（二、阵型模板 · 4231 样板先行） ---------- */
  var TEMPLATES={
    '4-2-3-1':{name:'4-2-3-1｜底盘说明（代表流派：控球推进 / 高位压迫通吃底盘）',
      pos:'初始静态位置：门将+四后卫（RB/CB/CB/LB）+ 双后腰 + 前腰居中 + 两边锋 + 中锋。'
        +'这只是开球落位——比赛里会动态变形：持球时常见变 3-2-5 或 2-3-5，无球时边锋回撤变 4-4-2 或 4-5-1。',
      good:['持球推进流畅（前提：双后腰里至少一人是出球型，且边锋愿意拉宽）',
        '前腰自由度高，肋部渗透强（前提：10 号有摆脱能力，且对方中场线间距大）',
        '边路天然有人（前提：边后卫敢套边，否则边锋会被孤立成 1v2）'],
      badStruct:['单前腰体系中路厚度依赖双后腰——面对三中场+前插 8 号位时弧顶容易空'],
      badCap:['边锋不回防 → 左右两边成走廊（球员能力不够才暴露）',
        '双后腰都不是出球型 → 后场出球瘫痪，被迫长传（球员不匹配才暴露）'],
      variants:[
        {n:'3-2-5 持球形态',when:'持球高位、对手低位防守',how:'一名后腰回撤到双中卫之间形成三中卫，边后卫压上成边前卫，两边锋内收或拉宽成双前锋身后的 5 人攻击线',why:'制造前场 5v4 人数优势，把对手防线压进禁区'},
        {n:'4-4-2 无球形态',when:'无球收缩、对手控球强',how:'10 号与中锋组成第一道线（双前锋），两边锋回撤成中场四人身位',why:'压缩中路空间，逼对手走边，方便就近围抢'},
        {n:'4-5-1 低位形态',when:'比分领先且对手搏命',how:'10 号回撤到中场线，双后腰之一落中卫旁，整体退到禁区前 30 米',why:'守住弧顶和二点，用中锋当反击支点'}],
      phases:'持球：3-2-5，边后卫给宽度、后腰倒球、10 号肋部渗透。\n无球：4-4-2 中位块，边锋半回收，第一道压迫由中锋+10 号发起。\n转换：断球后第一时间找 10 号或边锋纵深；丢球后 6 秒内就地反抢（教练口述可改写）。',
      counter:'克制：对手单后腰体系（本方 10 号可在两线之间自由接球）；对手边后卫助攻大胆（反击打他身后）。\n被克制：三中场+双边翼卫的中路绞杀（本方双后腰 2v3）；极限高位逼抢+造越位（10 号背身接球容易丢）。\n对手常规拆解：派人贴死 10 号接球点，逼本方从边路起球。',
      roles:'门将：出球冷静（可选要求）。RB/LB：有往返能力，能套边也能收进来。双后腰：至少一个「站得住」的 6 号；不能两个都爱前插。10 号：摆脱+最后一传，不能缺。边锋：一人拉宽一人内切最理想。中锋：能背身做球或冲击身后（避雷：只会等传中的纯站桩）。',
      axis:{press:2,control:3,direct:2,low:1,width:2,tempo:2,pressdir:2,counter:2,cross:2},
      axisNote:'这是经典流派的常识基线参考，优先级低于你口述的教练描述——口述可完全覆盖这套数值。',
      late:'领先：换下 10 号上破坏型中场，收 4-5-1。\n落后：边后卫改全压上，10 号自由化，可变 3-1-6。\n僵持/10 号被锁死：让边锋与 10 号换位，或后腰前插充当第二组织点。',
      users:'瓜系教练：偏 3-2-5 持球变体，门将深度参与。\n防反型教练：偏 4-4-2 中位块变体，双后腰偏破坏型。\n高压型教练：边锋变伪前锋轮流压迫，陷阱设在肋部。'},
  };
  function knowledgeHtml(){
    var t=TEMPLATES[ST.form];
    var other=(window.FORMATIONS||[]).filter(function(f){ return f.id!=='meta'; })
      .map(function(f){ return '<details><summary>'+esc(f.name)+'</summary><div style="padding:0 10px 10px">'
        +'<div class="hintline">旧版速览卡（待按 4231 样板框架填充：优势带前提/劣势两类/动态变体/三阶段/克制/关键位置/基准轴/临场调整/代表使用者）</div>'
        +'<ul class="tight">'+f.good.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>'
        +'<ul class="tight">'+f.bad.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>'
        +'<div class="p">'+f.who+'</div></div></details>'; }).join('');
    if(!t){
      return '<div class="card"><h3>📐 阵型知识库</h3>'
        +'<div class="hintline">「'+esc(ST.form)+'」的模板卡待按 4231 样板框架填充（4231 是第一个样板，确认后其余阵型批量套框架）。</div>'
        +(other?'<div class="sec">其 他 阵 型（旧版速览）</div>'+other:'')+'</div>';
    }
    return '<div class="card deep"><h3>📐 '+t.name+'</h3>'
      +'<div class="sec">纸 面 站 位</div><div class="p">'+t.pos+'</div>'
      +'<div class="sec">✅ 优 势（带前提）</div><ul class="tight">'+t.good.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>'
      +'<div class="sec">⚠️ 劣势 & 固有风险</div>'
      +'<ul class="tight">'+t.badStruct.map(function(x){return '<li><b>结构性短板（阵型自带）：</b>'+x+'</li>';}).join('')+'</ul>'
      +'<ul class="tight">'+t.badCap.map(function(x){return '<li><b>能力依赖型短板（球员不匹配才暴露）：</b>'+x+'</li>';}).join('')+'</ul>'
      +'<div class="sec">🔄 场 上 动 态 变 体（变体是动作库，是否打出由教练+球员决定）</div>'
      +t.variants.map(function(v,i){ return '<div class="pairli"><b>变体'+(i+1)+'：'+esc(v.n)+'</b>｜触发时机：'+esc(v.when)
        +'<br>变化方式：'+esc(v.how)+'<br>战术目的：'+esc(v.why)+'</div>'; }).join('')
      +'<div class="sec">📌 三 阶 段 分 工（基础规则库，教练口述可改写）</div>'
      +t.phases.split('\n').map(function(x){ return '<div class="pairli">'+esc(x)+'</div>'; }).join('')
      +'<div class="sec">⚔️ 对 位 克 制</div>'
      +t.counter.split('\n').map(function(x){ return '<div class="pairli">'+esc(x)+'</div>'; }).join('')
      +'<div class="sec">👤 关键位置硬性角色要求（联动球员卡）</div><div class="p">'+esc(t.roles)+'</div>'
      +'<div class="sec">🎛️ 阵型基准参考（仅常识基线，低于教练口述）</div>'
      +'<div class="hintline">压迫 '+t.axis.press+' · 控球 '+t.axis.control+' · 直接 '+t.axis.direct+' · 低位 '+t.axis.low
      +' · 宽度 '+t.axis.width+' · 节奏 '+t.axis.tempo+' · 逼抢方向 '+t.axis.pressdir+' · 反击 '+t.axis.counter+' · 传中 '+t.axis.cross+'</div>'
      +'<div class="hintline">'+esc(t.axisNote)+'</div>'
      +'<div class="sec">🔧 临场调整（备选方案库，口述优先）</div>'
      +t.late.split('\n').map(function(x){ return '<div class="pairli">'+esc(x)+'</div>'; }).join('')
      +'<div class="sec">📋 代表使用者 & 变体分支</div><div class="p">'+esc(t.users)+'</div>'
      +'</div>'
      +(other?'<div class="card"><h3>其 他 阵 型（旧版速览，待按样板填充）</h3>'+other+'</div>':'');
  }

  load();
  return { render:render, ST:ST, runAnalysis:runAnalysis };
})();
window.renderFormationLab=function(){ FLab.render(); };
