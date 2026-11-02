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
               ['RWB',88,72],['LWB',12,72],['RM',80,54],['CM',60,55],['CM',40,55],['LM',20,54],['ST',50,24]],
    '3-5-2':  [['GK',50,90],['CB',70,77],['CB',50,80],['CB',30,77],
               ['RWB',88,52],['DM',50,60],['CM',66,52],['CM',34,52],['LWB',12,52],
               ['ST',60,16],['ST',40,16]],
    '4-2-2-2':[['GK',50,90],['RB',84,72],['CB',62,77],['CB',38,77],['LB',16,72],
               ['DM',64,58],['DM',36,58],['AM',72,36],['AM',28,36],
               ['ST',62,14],['ST',38,14]]
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
      +'<div class="p">点球场上的位置卡填球员（支持搜 '+(window.SQUADS_ALL?Object.keys(SQUADS_ALL).length:32)+' 队全部名单+球员库）；长按 0.5 秒看他在这个教练体系下的<b>覆盖热区/跑动方向/职能</b>。单击=编辑，长按=热区，不会误触。</div>'
      +'<div class="sec">阵 型</div><div class="pillrow" id="flForms">'+chips+'</div>'
      +'<div class="sec">主教练（只填名字 = AI 自动参考他真实惯用打法）</div>'
      +'<div class="searchrow"><input id="flCoach" placeholder="教练名：卡里克 / Guardiola…" value="'+esc(ST.coach)+'"></div>'
      +'<div class="sec">你的战术想法（可选，优先级最高，可推翻该教练常规打法）</div>'
      +'<textarea id="flDesc" style="width:100%;background:var(--card2);border:1px solid var(--line);border-radius:10px;color:var(--txt);padding:11px;font-size:14px;font-family:inherit;min-height:96px;resize:vertical" '
      +'placeholder="提示：只输入教练名字，将自动参考该教练真实惯用打法；\n如果同时写下你的战术想法，你的描述优先级最高，真实教练风格仅用来补充完善。\n可写：压迫习惯、攻防偏好、转换思路、对特定位置的要求、领先/落后临场调整、防守方式（人盯人/区域）、讨厌的打法。">'+esc(ST.desc)+'</textarea>'
      +'<div class="hintline" id="flCount">已填 '+filled+'/11 人'+(ST.coach?' · 教练 '+esc(ST.coach):' · 还没填教练')+'</div>'
      +'<button class="optbtn" id="flGo" style="text-align:center'+(filled<11||!ST.coach?';opacity:.5':'')+'">▶ 开始分析（'+esc(ST.form)+' + 教练 + 11 人）</button>'
      +(filled<11||!ST.coach?'<div class="hintline" style="color:#ffe1a1">还差：'+(filled<11?('还剩 '+(11-filled)+' 个位置没填'):'')+(filled<11&&ST.coach?' + ':'')+(!ST.coach?'教练名没填':'')+'——填完才能开始分析</div>':'')
      +(err?'<div class="hintline" style="color:#ffb4b7">'+esc(err)+'</div>':'')
      +'</div>'
      +'<div class="flmain">'
      +'<div class="card flpitch"><h3>球场<small>单击填人 · 长按看热区 · 点 3 次消热区</small></h3>'+pitchHtml()
      +(zoneBusy!=null?'<div class="hintline" style="color:#a8d2ff">'+esc(zoneStage())+'</div>':'')
      +'<div class="btnrow" style="justify-content:center">'
        +'<button class="btn" id="flZoneClear">🧹 清除热区</button>'
        +'<button class="btn" id="flClearAll">🧹 清空球员</button></div>'
      +zoneListHtml()
      +'</div>'
      +'<div class="flside">'
      +(analysisHtml()||'<div class="card flwait"><h3>📋 推演结果<small>还没开始</small></h3>'
        +'<div class="p">填满 11 人 + 写上教练名，点「开始分析」，这里会出现：纸面站位、优势（带前提）、劣势、动态变体、三阶段分工、对位克制、定位球、伤病连锁、临场调整。</div>'
        +'<div class="hintline">下面是这个阵型的知识库，可以先读再分析。</div></div>')
      +knowledgeHtml()
      +'</div>'
      +'</div>';
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
    el.querySelectorAll('[data-flkb]').forEach(function(b){
      b.onclick=function(){ ST.form=b.dataset.flkb; save(); render(); };
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
      +'<div class="searchrow"><input id="flSlotQ" placeholder="输入名字（可中文/英文），支持全部 '+(window.SQUADS_ALL?Object.keys(SQUADS_ALL).length:32)+' 队名单" value="'+esc(cur)+'"></div>'
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
      var slot=slotsOf()[i][0];
      var list=names.filter(function(x){
        return x.n.toLowerCase().indexOf(q2)>=0||(x.en||'').toLowerCase().indexOf(q2)>=0;
      });
      /* 问题四：该位置适配的球员排前面，并标注位置 */
      var lib=function(n){ var p=findP(n); return p||{pos:[]}; };
      list.sort(function(a,b){
        var pa=(lib(a.n).pos||[]), pb=(lib(b.n).pos||[]);
        var am=pa.indexOf(slot)>=0?1:0, bm=pb.indexOf(slot)>=0?1:0;
        if(am!==bm) return bm-am;
        return a.n.localeCompare(b.n,'zh');
      });
      list=list.slice(0,30);
      wrap.innerHTML=list.length?list.map(function(x){
        var pp=(lib(x.n).pos||[]).join('/');
        return '<div class="mini" data-n="'+esc(x.n)+'" style="padding:9px 12px;margin-bottom:6px;cursor:pointer;display:flex;justify-content:space-between"><h4 style="margin:0;font-size:14px">'+esc(x.n)+(x.en&&x.en!==x.n?' <small style="color:var(--mut)">'+esc(x.en)+'</small>':'')+'</h4><span class="mut" style="font-size:11px">'+esc(pp)+'</span></div>';
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

    '4-3-3':{name:'4-3-3｜底盘说明（代表流派：高位压迫 / 控球围攻的默认答案）',
      pos:'门将+四后卫 + 单 6 拖后 + 两个 8 号（左右各一）+ 左/右边锋 + 中锋。'
        +'持球时最常见变 2-3-5：边后卫一高一低，6 号落到双中卫之间，8 号前插两肋；无球时两边锋回撤，落成 4-1-4-1 或 4-5-1。',
      good:['三叉戟天然拉开宽度，中锋两侧永远有人接应（前提：边锋敢站死边线，不把宽度让给边后卫）',
        '前场 5-6 人围抢，丢球后第一波反抢人数足（前提：中锋愿意当第一触发器、8 号敢跟压）',
        '三线距离均匀，攻转守回收形状好（前提：单 6 的位置感过硬，不能被一脚直塞打穿）'],
      badStruct:['单后腰体系弧顶只有一个人护，对手双 8 号后插上时中路容易 3v2',
        '边锋内切后边路全靠边后卫，边后卫被锁死则宽度瞬间消失'],
      badCap:['单 6 能力不够 → 整条转换防线崩（罗德里缺阵时曼城的教材）',
        '中锋不会背身 → 后场长传进黑洞，只能反复倒脚（球员不匹配才暴露）'],
      variants:[
        {n:'2-3-5 持球形态',when:'对手低位、需要把禁区填满',how:'两边后卫一内收一压上，6 号落双中卫之间，两名 8 号站肋部，边锋拉死边线，中锋顶住双中卫',why:'前场五点压满，制造肋部 3v2 与边路 1v1 的选择题'},
        {n:'4-1-4-1 中位无球',when:'对手能控球、需要先保住中路',how:'两边锋回撤到中场线，8 号收窄成两排四人，6 号单独守弧顶',why:'用两排横向四人逼对手走边，减少中路被直塞的次数'},
        {n:'3-1-6 搏命',when:'落后 70 分钟后',how:'双边后卫全压成边前卫，只留一名中卫 + 单 6 保护身后',why:'把人数全部堆到禁区，靠传中与二点搏一个进球',risk:'身后彻底敞开，被打一次反击就等于丢第二个'}],
      phases:'持球：2-3-5，边后卫给宽度、6 号落到中卫之间组织、8 号钻肋部。\n无球：4-1-4-1 中位块，中锋与边锋负责第一道压迫，6 号守弧顶。\n转换：断球后优先找边锋一对一，或直接打中锋身后；丢球后 5 秒反抢，抢不到立刻退成 4-1-4-1。',
      counter:'克制：对手双后腰横向覆盖慢（本方 8 号可在肋部接球）；对手边后卫单防弱（边锋 1v1 直接打）。\n被克制：对手双中锋+长传冲吊（单 6 被顶住后，中卫被迫出禁区）；对手 5-4-1 低位+快速反击（压得太高）。\n对手常规拆解：用一名后腰专门跟住本方 6 号，逼边后卫出球。',
      roles:'门将：能参与出球（可选）。RB/LB：一攻一守最理想，至少一人能内收。单 6：位置感 + 拦截 + 转身出球，缺一不可。双 8：一人偏组织、一人偏前插（B2B）。边锋：一对一能力是硬指标。中锋：能背身也能冲身后（避雷：不回防、不背身的纯抢点）。',
      axis:{press:3,control:3,direct:2,low:1,width:3,tempo:2,pressdir:2,counter:2,cross:2},
      axisNote:'经典流派基线，仅作参考——你的教练口述优先级高于这套数值。',
      late:'领先：边锋换下、上防守型中场，收成 4-1-4-1。\n落后：边后卫全压，单 6 前提到中场，变 3-1-6 或 2-3-5 极限形态。\n僵持：把一名 8 号换成边锋，改打双边锋堆边路一对一。',
      users:'巴萨/阿森纳式控球：6 号落三中卫、8 号进肋部。\n利物浦式压迫：三前锋轮流当第一触发器，压迫方向导向边线。\n国家队常见版本：双 8 号一攻一守，边锋回防深度更大。'},

    '3-4-2-1':{name:'3-4-2-1｜底盘说明（代表流派：三中卫 + 翼卫 + 双前腰，阿莫林体系）',
      pos:'门将+三中卫（左中卫/居中/右中卫）+ 双翼卫 + 双中场 + 双前腰 + 中锋。'
        +'持球时居中中卫前顶成「3+1 出球」，翼卫压到边锋高度，双前腰钻肋部，实际形状接近 3-2-5；无球时翼卫回收成 5-2-3 或 5-4-1。',
      good:['三中卫天然覆盖宽度，防线横移有人数兜底（前提：三人都能一对一防守，不被单点爆破）',
        '翼卫提供全部进攻宽度，双前腰钻两肋（前提：翼卫体能撑得住 90 分钟往返）',
        '后场 3+2 出球结构稳定，破压迫有天然人数网（前提：居中中卫敢带球出线）'],
      badStruct:['双前腰身后 + 弧顶是结构性空当，攻转守一瞬间最危险',
        '宽度全押两名翼卫，翼卫被压住则进攻变窄，只能靠前腰个人能力'],
      badCap:['翼卫攻防一体要求苛刻：跑不动就两头都漏（球员不匹配时最先崩）',
        '三中卫里有人转身慢 → 对手一个直塞就打穿整条防线'],
      variants:[
        {n:'3-2-5 持球形态',when:'对手中位防守、需要控球推进',how:'居中中卫带球前顶，双中场一前一后错位，双翼卫压到边锋高度，双前腰进肋部',why:'五个进攻点同时压住对手后防线，制造肋部接球'},
        {n:'5-2-3 无球形态',when:'对手控球强、需要先站稳',how:'双翼卫回收到边后卫位置，双前腰回撤一格成中场四人，中锋单独顶前',why:'用五后卫封死传中与肋部直塞'},
        {n:'3-1-6 搏命',when:'落后且对手退守',how:'翼卫全压成边锋，双中场只留一人，三中卫全体前压到中圈',why:'把人数堆进禁区，用传中与二点抢一个进球',risk:'身后只剩一名中卫，被打反击基本无解'}],
      phases:'持球：3-2-5，中卫带球、翼卫拉宽、前腰钻肋、中锋顶住。\n无球：5-2-3，翼卫回收、双前腰回撤一格，整体压在中位块。\n转换：断球后第一时间找翼卫前插的身后球；丢球后优先保护弧顶，别急着反抢。',
      counter:'克制：对手双前锋阵型（三中卫后防人数永远占优）；对手边锋不回防（翼卫可以白嫖边路空间）。\n被克制：对手 3-5-2 的中场三人绞杀（本方双中场 2v3）；对手高强度边路围抢，翼卫接球就被夹。\n对手常规拆解：放弃边路、把防线收窄，逼翼卫在中场线接球再围抢。',
      roles:'三中卫：左右能上抢、居中能指挥与补位（避雷：三人全是上抢型）。翼卫：攻防一体的体能怪，至少一人能传中。双中场：要能一个人守弧顶、一个人前顶（不能两个都前插）。双前腰：一个组织、一个无球钻肋最理想。中锋：能背身做墙，给两个前腰做嫁衣。',
      axis:{press:3,control:3,direct:1,low:1,width:3,tempo:2,pressdir:2,counter:1,cross:2},
      axisNote:'三中卫体系的基线偏向控球+宽度，具体仍以教练口述为准。',
      late:'领先：翼卫回收、双前腰换一名防守中场，收 5-4-1。\n落后：翼卫全压、居中中卫前顶成中场，变 3-1-6。\n僵持：把一名前腰换成第二中锋，改打翼卫传中+双前锋抢点。',
      users:'阿莫林系（葡萄牙体育/曼联/米兰）：翼卫极高、双前腰钻肋。\n孔蒂系：翼卫更保守，双前锋而非双前腰。\n德国三中卫版本：双中场一攻一守，前腰回撤参与出球。'},

    '4-4-2':{name:'4-4-2｜底盘说明（代表流派：两排四人 + 双前锋，最老的经典）',
      pos:'门将+四后卫 + 左/右前卫 + 双中场 + 双前锋。'
        +'持球时两翼前卫可压成 4-2-4，或一名前锋回撤变 4-4-1-1；无球时天然就是两排四人，是最省心的防守形状。',
      good:['结构简单纪律性强，防守像教科书两排四人（前提：两条线间距不超过 15 米）',
        '双前锋天然牵制对方双中卫，中卫不敢随便上抢（前提：两名前锋有分工，不能都站桩）',
        '适合中低位块 + 快速通过中场（前提：两名中场有一个能一脚出球）'],
      badStruct:['对上三中场时中路永远 2v3，控球阶段会被压着打',
        '边前卫要兼顾攻防两端，体能一旦崩，边上就是走廊'],
      badCap:['双中场都不会转身出球 → 只能长传找前锋（球员不匹配才暴露）',
        '两名前锋都不回防 → 防守时实际是 4-4-0，中场被无限拉扯'],
      variants:[
        {n:'4-4-1-1 持球',when:'需要在前锋与中场之间加一个接应点',how:'一名前锋回撤到前腰位，另一名顶住双中卫，两翼前卫内收',why:'在中场线与对方后卫线之间制造接球点，破中位块'},
        {n:'4-2-4 压上',when:'落后或对手低位退守',how:'两翼前卫压到边锋高度，双前锋留在禁区，双中场只做保护',why:'四个进攻点压住对手后防，边路可以连续传中',risk:'中场只剩两人，被打反击时中卫直接面对三打二'},
        {n:'4-4-2 低位块',when:'领先、对手控球',how:'两条线全部退到禁区前 30 米，前锋线不追出，只封传球线路',why:'把中路塞满，逼对手传中再由中卫解围'}],
      phases:'持球：4-4-1-1 或 4-2-4，两翼前卫给宽度，双中场一前一后。\n无球：标准两排四人，前锋线封中路，边前卫回收保护边后卫。\n转换：断球后三脚内找前锋，或直接打对方边后卫身后；丢球立刻退回两排。',
      counter:'克制：对手单后腰 + 双 8 号（中路人数不吃亏，反击时双前锋二打二）；对手三中卫翼卫压太高（身后有大片空间）。\n被克制：对手三中场控球（中路 2v3 被压死）；对手边后卫套边+边锋内切（边前卫一人防两个）。\n对手常规拆解：用三中场把本方双中场拉开，再打边前卫身后。',
      roles:'双中场：一人偏拦截、一人偏出球（避雷：两个都是纯拦截型）。边前卫：能跑满 90 分钟的攻防一体边路。双前锋：一个支点一个冲击身后最理想。边后卫：防守优先，别轻易前压。中场：不需要组织核心，但需要一脚向前的能力。',
      axis:{press:2,control:1,direct:3,low:2,width:2,tempo:3,pressdir:2,counter:3,cross:3},
      axisNote:'4-4-2 的基线偏直接与反击，控球型教练会把它改成 4-4-1-1 控球版。',
      late:'领先：撤下一名前锋上防守中场，变 4-5-1。\n落后：边前卫压成边锋，变 4-2-4 强攻。\n僵持：把一名中场换成第二前锋，直接打双高点。',
      users:'西蒙尼式马竞：中低位块 + 双前锋 + 边路强硬。\n英超中下游：防守优先，长传找支点。\n传统英式 4-4-2：两翼传中 + 双中锋抢点。'},

    '4-1-4-1':{name:'4-1-4-1｜底盘说明（代表流派：低位块的标准答案，单 6 守弧顶）',
      pos:'门将+四后卫 + 单后腰（蹲弧顶）+ 四人中场线（左/右前卫 + 双中场）+ 单中锋。'
        +'无球时是中位/低位块最标准的形状——两排四人、单 6 补在前排身后；持球时两翼前卫压上，可变 4-3-3 或 3-2-5。',
      good:['两线间距小、中路密度极高（前提：中场四人横向不脱节）',
        '单 6 正好蹲在弧顶，远射先问他（前提：6 号位置感好，不追球跑偏）',
        '摆低位也不至于毫无反击能力（前提：中锋能背身、边前卫有速度）'],
      badStruct:['反击支点只有一个，解围等于把球权还给对手',
        '中场四人横向拉开后，肋部两个接缝容易被连续小配合打穿'],
      badCap:['单 6 覆盖面积不够 → 弧顶与两肋都漏（球员不匹配时最先暴露）',
        '中锋背身能力差 → 长传解围全部丢失，防守压力翻倍'],
      variants:[
        {n:'4-3-3 持球',when:'需要主动控球、对手压迫不强',how:'一名中场前提成 8 号，两翼前卫压成边锋，单 6 留在身后',why:'把中场线拆成 1+2+3，增加前场接球点'},
        {n:'4-5-1 低位',when:'领先且对手强攻',how:'中锋回撤一格参与中场线，整体退到禁区前 25 米',why:'用五中场封死肋部，只留中锋做反击出口'},
        {n:'4-4-2 中位压迫',when:'对手后场出球不稳',how:'中锋与一名中场组成第一道线，两翼前卫上提封边后卫',why:'用两排四人向前压一格，逼对手长传',risk:'压出去后身后空间变大，单 6 必须站住'}],
      phases:'持球：4-3-3 推进，两翼前卫压上、单 6 保护。\n无球：4-1-4-1 中低位块，两排四人 + 单 6 补弧顶。\n转换：断球后第一时间找中锋背身或边前卫前插；丢球立刻退回原位，不做高位反抢。',
      counter:'克制：对手控球但缺乏远射（弧顶被封后只能横传）；对手边路传中型（禁区人数够）。\n被克制：对手双前腰钻肋部（中场线两个接缝被连续打穿）；对手边后卫+边锋二打一（边前卫一人防两个）。\n对手常规拆解：用边路二打一把边前卫拉出去，再从肋部直塞。',
      roles:'单 6：纯破坏型也可以，位置感 > 出球。中场四人：两侧要能跑，中间两人一个拦截一个出球。中锋：必须能背身做球（避雷：纯抢点型）。边后卫：防守优先，别轻易前压。',
      axis:{press:1,control:1,direct:3,low:3,width:2,tempo:2,pressdir:0,counter:3,cross:2},
      axisNote:'这是低位块的常识基线：压迫低、直接高、反击强。',
      late:'领先：中锋换下上第五名中场，变 4-5-1 死守。\n落后：单 6 前提，两翼前卫压成边锋，变 4-3-3 强攻。\n僵持：把一名中场换成第二前锋，直接打双高点。',
      users:'英超中下游对豪门的标准答案。\n马竞变体：更低的块 + 更直接的反击。\n国家队大赛版本：两翼前卫回防深度极大。'},

    '5-4-1':{name:'5-4-1｜底盘说明（代表流派：大巴形态，五后卫 + 四人中场 + 单前锋）',
      pos:'门将+五后卫（左右翼卫 + 三中卫）+ 四人中场 + 单前锋。'
        +'无球时是标准的 5-4-1 低块，禁区与弧顶人数拉满；持球时翼卫压上变 3-4-3 或 3-5-2，但大多数球队只求把球踢出去。',
      good:['禁区 + 弧顶人数拉满，传中流派的天敌（前提：三中卫争顶能力够）',
        '定位球攻防反而是强项（前提：身高不吃亏，二点有人抢）',
        '心理上极其难打：对手越急，反击空间越大'],
      badStruct:['完全让出球权，体能崩盘有明确时间点：60-75 分钟',
        '一丢球心理容易崩，翻盘极难——这套形状不是为了追分设计的'],
      badCap:['翼卫体能不够 → 五后卫变三后卫，边路直接失守',
        '单前锋背身差 → 解围等于连续防守，防线被反复冲击'],
      variants:[
        {n:'3-4-3 持球',when:'需要把球推进到中场',how:'双翼卫压到边前卫高度，一名中卫带球出线，中场四人一前一后',why:'在不丢防守人数的前提下增加出球点'},
        {n:'5-4-1 低位死守',when:'领先 1 球、比赛进入最后 20 分钟',how:'两条线退到禁区前 20 米，五后卫横向不追人，只封传中线路',why:'把禁区塞满，逼对手远射'},
        {n:'5-3-2 双前锋反击',when:'落后但需要保住防线',how:'撤一名中场上一名前锋，双前锋一高一快',why:'用两个出口提高反击成功率',risk:'中场只剩三人，弧顶保护变薄'}],
      phases:'持球：3-4-3 或直接长传找前锋，不追求控球。\n无球：5-4-1 低块，五后卫横向移动、中场四人封肋部。\n转换：断球后大脚找前锋或边路，能过中场就算成功；丢球立刻回到五后卫。',
      counter:'克制：对手依赖传中（禁区人数永远占优）；对手缺乏远射（弧顶被封后只能横传）。\n被克制：对手有顶级远射手（弧顶外一脚定胜负）；对手双前腰钻肋部（五后卫横向接缝被打穿）。\n对手常规拆解：用边路传中骗角球，靠定位球破局。',
      roles:'三中卫：争顶 + 指挥 + 补位，居中那个必须能喊。翼卫：体能怪，攻防两端都要跑。中场四人：横向覆盖优先于创造力。单前锋：背身做球 + 争顶，是全队唯一的出口（避雷：纯速度型抢点）。',
      axis:{press:0,control:1,direct:3,low:3,width:1,tempo:1,pressdir:0,counter:3,cross:1},
      axisNote:'极端防守的常识基线：不压迫、不控球、直接、反击。',
      late:'领先：再换一名中卫上，变 6-4-0 死守。\n落后：撤一名中卫上第二前锋，变 5-3-2 或 4-4-2。\n僵持：保持形状，赌定位球或对手失误。',
      users:'弱队打豪门的保留节目。\n孔蒂式三中卫落位防守接近 5-3-2。\n杯赛淘汰赛第二回合领先时的常见选择。'},

    '3-5-2':{name:'3-5-2｜底盘说明（代表流派：三中卫 + 五中场，中场人数最多的一型）',
      pos:'门将+三中卫 + 双翼卫 + 三中场（一后腰两侧各一 8 号）+ 双前锋。'
        +'持球时翼卫压到边前卫高度，中场三人形成 3v2 的控球优势；无球时翼卫回收成 5-3-2 两排，是「中场人数最多」的三中卫变体。',
      good:['中场中路人数最多，控球流的三中卫变体（前提：三名中场都能接球转身）',
        '双前锋压对方双中卫，天然形成二打二（前提：两人有分工，一个支点一个跑身后）',
        '5-3-2 与 3-5-2 一键切换，攻防形态稳定（前提：翼卫体能撑得住往返）'],
      badStruct:['宽度全押在两名翼卫身上，翼卫被压住则进攻只剩中路',
        '肋部 10 号位空缺，阵地战渗不进去，容易变成无脑传中'],
      badCap:['三中场里没有能转身出球的 → 控球优势变控球陷阱（球员不匹配才暴露）',
        '双前锋都不回防 → 中场三人要覆盖五个纵向通道，60 分钟后必崩'],
      variants:[
        {n:'3-2-5 持球',when:'对手中位防守、需要控球',how:'居中中卫带球前顶，双翼卫压到边锋高度，一名中场回撤成第二后腰，双前锋一前一后错位',why:'用五个进攻点压住对手后防，制造中场 3v2'},
        {n:'5-3-2 无球',when:'对手控球强、需要先站稳',how:'双翼卫回收到边后卫位置，三中场收窄成一条线',why:'用五后卫封死传中与肋部，双前锋留在前场做出口'},
        {n:'3-4-3 变体',when:'落后需要加强边路',how:'撤一名中场上一名边锋，翼卫与边锋形成边路二打一',why:'把中路人数的优势换成边路突破',risk:'中场从三人变两人，弧顶保护变薄'}],
      phases:'持球：3-2-5，中卫带球、翼卫拉宽、三中场倒球找肋部、双前锋交错站位。\n无球：5-3-2，翼卫回收、三中场封中路、双前锋不追出。\n转换：断球后第一脚找双前锋之一，第二脚找翼卫前插；丢球后先回五后卫，不做高位反抢。',
      counter:'克制：对手 4-4-2（中场 3v2 直接压死）；对手单前锋体系（三中卫后防人数占优）。\n被克制：对手 4-3-3 前场三点压迫（翼卫接球就被夹）；对手双前腰钻肋部（三中场横向覆盖不够）。\n对手常规拆解：放弃中场、直接用边路快马打翼卫身后。',
      roles:'三中卫：左右能上抢、居中能补位指挥。翼卫：全队最累的两个位置，体能第一。三中场：一名纯 6 号 + 两名能前插的 8 号（避雷：三个都偏防守）。双前锋：一个支点一个跑身后最理想。',
      axis:{press:2,control:3,direct:2,low:1,width:3,tempo:2,pressdir:2,counter:2,cross:2},
      axisNote:'三中卫控球流的基线：控球与宽度偏高，具体以教练口述为准。',
      late:'领先：翼卫回收，撤一名前锋上防守中场，收 5-4-1。\n落后：翼卫全压，撤一名中场上第二前锋，变 3-4-3 强攻。\n僵持：把一名中场换成前腰，改打 3-4-1-2 钻肋部。',
      users:'国米式 3-5-2：翼卫极高、双前锋一高一快。\n德国队三中卫版本：中场三人一攻两守。\n意甲中游球队：低位 5-3-2 + 双前锋反击。'},

    '4-2-2-2':{name:'4-2-2-2｜底盘说明（代表流派：盒子中场，安切洛蒂的专利）',
      pos:'门将+四后卫 + 双后腰 + 双前腰（站两条肋部）+ 双前锋。'
        +'中场是一个「2+2 盒子」：双后腰保底、双前腰钻肋部、双前锋一前一后；边路宽度完全交给边后卫。持球时接近 2-2-2-2 的方块，无球时双前腰回撤成 4-4-2。',
      good:['中路 2+2 盒子人数爆炸，肋部连续小配合（前提：双前腰都能在狭小空间接球）',
        '双前锋天然二打二，中卫不敢上抢（前提：两名前锋有分工）',
        '双后腰 + 双前腰形成两层保护，中路很难被打穿'],
      badStruct:['边后卫被锁死则宽度彻底消失，全队挤在中路',
        '边路防守薄，被打反击时边后卫身后是大走廊'],
      badCap:['需要顶级个人能力：双前腰要能一对一摆脱，普通人学不来',
        '双后腰里没人能横向覆盖 → 双前腰身后的两侧全是空当'],
      variants:[
        {n:'2-2-2-2 方块持球',when:'对手中位防守、需要中路渗透',how:'双后腰一前一后错位，双前腰站两条肋部，双前锋一高一快拉开纵深',why:'在中路制造四个接球点，用连续短传撕开防线'},
        {n:'4-4-2 无球',when:'对手控球、需要先站稳',how:'双前腰回撤成中场四人，双前锋组成第一道线',why:'把盒子压成两排四人，减少肋部空当'},
        {n:'4-2-2-2 边路压上',when:'落后需要强攻',how:'双边后卫全压成边前卫，双后腰只留一人保护',why:'用边后卫补宽度，把中路的盒子保持住',risk:'边后卫身后只剩一名后腰，反击基本无解'}],
      phases:'持球：2-2-2-2 方块，双后腰倒球、双前腰肋部接球、边后卫提供宽度。\n无球：4-4-2 中位块，双前腰回撤，双前锋封中路。\n转换：断球后直接找双前锋之一，第二脚找前腰；丢球后优先保护肋部，不急反抢。',
      counter:'克制：对手单后腰（中路 4v3 ）；对手边锋不回防（边后卫可以白嫖边路）。\n被克制：对手 4-3-3 边路快马（边后卫一人防两个）；对手高位压迫边后卫出球（宽度消失后只能硬塞中路）。\n对手常规拆解：用边路二打一把边后卫压回去，再从中路围抢双后腰。',
      roles:'双后腰：一人拦截一人出球，都要能横向覆盖（避雷：两个都慢）。双前腰：小空间接球 + 摆脱，是这套体系的灵魂。双前锋：一个支点一个跑身后。边后卫：全队宽度来源，攻防一体。',
      axis:{press:3,control:2,direct:2,low:1,width:2,tempo:3,pressdir:2,counter:2,cross:2},
      axisNote:'盒子中场偏中路与快节奏，宽度低是这套形状的天生特征。',
      late:'领先：撤一名前锋上中场，变 4-2-3-1 控球。\n落后：边后卫全压、双后腰留一人，变 2-2-2-2 极限进攻。\n僵持：把一名前腰换成边锋，改打 4-2-3-1 用边路提速。',
      users:'安切洛蒂的皇马（22-24）：双前腰站肋部、双前锋一高一快。\n巴西队（安帅 2025 至今）：把盒子中场搬到国家队。\n少数控球型球队的搏命变体。'}
  };

  function kbBlock(t){
    return '<div class="kbbody">'
      +'<div class="sec">纸 面 站 位</div><div class="p">'+t.pos+'</div>'
      +'<div class="sec">✅ 优 势（带前提）</div><ul class="tight">'+t.good.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>'
      +'<div class="sec">⚠️ 劣 势 & 固 有 风 险</div>'
      +'<ul class="tight">'+t.badStruct.map(function(x){return '<li><b>结构性短板（阵型自带）：</b>'+x+'</li>';}).join('')+'</ul>'
      +'<ul class="tight">'+t.badCap.map(function(x){return '<li><b>能力依赖型短板（球员不匹配才暴露）：</b>'+x+'</li>';}).join('')+'</ul>'
      +'<div class="sec">🔄 场 上 动 态 变 体（变体是动作库，是否打出由教练+球员决定）</div>'
      +t.variants.map(function(v,i){
          return '<div class="pairli"><b>变体'+(i+1)+'：'+esc(v.n)+'</b>｜触发时机：'+esc(v.when)
            +'<br>变化方式：'+esc(v.how)+'<br>战术目的：'+esc(v.why)
            +(v.risk?'<br><span style="color:#ffb4b7">⚠ 风险：'+esc(v.risk)+'</span>':'')+'</div>';
        }).join('')
      +'<div class="sec">📌 三 阶 段 分 工（基础规则库，教练口述可改写）</div>'
      +t.phases.split('\n').map(function(x){ return '<div class="pairli">'+esc(x)+'</div>'; }).join('')
      +'<div class="sec">⚔️ 对 位 克 制</div>'
      +t.counter.split('\n').map(function(x){ return '<div class="pairli">'+esc(x)+'</div>'; }).join('')
      +'<div class="sec">👤 关 键 位 置 硬 性 角 色 要 求（联动球员卡）</div><div class="p">'+esc(t.roles)+'</div>'
      +'<div class="sec">🎛️ 阵 型 基 准 参 考（仅常识基线，低于教练口述）</div>'
      +'<div class="hintline">压迫 '+t.axis.press+' · 控球 '+t.axis.control+' · 直接 '+t.axis.direct+' · 低位 '+t.axis.low
      +' · 宽度 '+t.axis.width+' · 节奏 '+t.axis.tempo+' · 逼抢方向 '+t.axis.pressdir+' · 反击 '+t.axis.counter+' · 传中 '+t.axis.cross+'</div>'
      +'<div class="hintline">'+esc(t.axisNote)+'</div>'
      +'<div class="sec">🔧 临 场 调 整（备选方案库，口述优先）</div>'
      +t.late.split('\n').map(function(x){ return '<div class="pairli">'+esc(x)+'</div>'; }).join('')
      +'<div class="sec">📋 代 表 使 用 者 & 变 体 分 支</div><div class="p">'+esc(t.users)+'</div>'
      +'</div>';
  }
  function knowledgeHtml(){
    var cur=ST.form;
    var keys=Object.keys(TEMPLATES);
    var t=TEMPLATES[cur];
    var h='<div class="card deep flkb"><h3>📐 阵型知识库<small>'+keys.length+' 种阵型 · 同一套分析框架（纸面站位 / 优势带前提 / 两类劣势 / 动态变体 / 三阶段 / 克制 / 关键位置 / 基准轴 / 临场）</small></h3>'
      +'<div class="flkb-nav">'+keys.map(function(f){
          return '<button class="fchip '+(f===cur?'on':'')+'" data-flkb="'+f+'">'+f+'</button>';}).join('')+'</div>';
    if(t){
      h+='<div class="flkb-h">'+esc(t.name)+'</div>'+kbBlock(t);
    }else{
      h+='<div class="hintline">「'+esc(cur)+'」的模板还在补——切到上面任意阵型就能看完整知识卡。</div>';
    }
    var others=keys.filter(function(f){ return f!==cur; });
    if(others.length){
      h+='<div class="flkb-others"><div class="sec">其 他 阵 型（点开对照阅读 · 框架完全一致）</div>'
        +others.map(function(f){
          var o=TEMPLATES[f];
          return '<details class="flkb-o"><summary><b>'+esc(f)+'</b> <span>'+esc((o.name||'').split('｜')[1]||'')+'</span></summary>'+kbBlock(o)+'</details>';
        }).join('')+'</div>';
    }
    return h+'</div>';
  }

  load();
  return { render:render, ST:ST, runAnalysis:runAnalysis };
})();
window.renderFormationLab=function(){ FLab.render(); };
