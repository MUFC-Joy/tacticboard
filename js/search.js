/* =========================================================
   搜索板块（问题三）—— 两个完全独立的搜索：
   ① 球员搜索：AI 联网（官网/Transfermarkt/FBref/新闻）生成结构化球员档案
      一期落地：短板&风险 + 同位置百分位雷达图 + 适配/不适配战术
      二/三期字段结构预留：专项高阶数据 / 避雷搭档 / 对比 / 合同身价 / 成长曲线
      可「保存到球员库」（localStorage tb_player_cache），引擎/阵型实验室直接用
   ② 知识搜索：AI 联网回答足球知识，带来源
   结果缓存 tb_search_cache；信源纪律：不确定的字段必须 null，不编造（重点五）
   ========================================================= */
"use strict";
window.PLSearch=(function(){
  var CACHE='tb_search_cache', PCACHE='tb_player_cache';
  var state={busy:false,cur:'',res:null,err:'',stage:'',
    knowBusy:false,knowCur:'',knowRes:null,knowErr:'',knowStage:'',saved:false};

  var TTL=24*3600*1000; /* 缓存 24 小时过期（问题十三：信息陈旧） */
  function cacheGet(){ try{ return JSON.parse(localStorage.getItem(CACHE)||'{}'); }catch(e){ return {}; } }
  function cacheSet(k,v){ var c=cacheGet(); c[k]=v; try{ localStorage.setItem(CACHE,JSON.stringify(c)); }catch(e){} }
  function cacheFresh(e){ return e&&e.res&&e.ts&&(Date.now()-e.ts)<TTL; }
  function normQ(q){ return String(q||'').trim().toLowerCase(); }

  /* ---------- 球员档案搜索 ---------- */
  async function runPlayer(q,force){
    if(state.busy) return;
    if(!window.TBSettings||!TBSettings.ready()){ state.err='还没配置 AI：点右上角「⚙ AI 设置」'; state.res=null; render(); return; }
    q=String(q||'').trim(); if(!q) return;
    var ck='p:'+normQ(q);
    var cached=cacheGet()[ck];
    if(!force&&cacheFresh(cached)){ state.cur=q; state.res=cached.res; state.err='';
      if(window.Notes) Notes.add('player','球员搜索','【球员·缓存】'+cached.res.name+'（'+(cached.res.club||'?')+'）\n风格：'+(cached.res.styleTag||''));
      render(); return; }
    state.busy=true; state.cur=q; state.res=null; state.err=''; state.saved=false; state.t0=Date.now(); render();
    try{
      var cfg=TBSettings.cfg();
      var pre='';
      if(cfg.search&&window.TBWebTools&&TBWebTools.available()){
        state.stage='并行联网搜索球员资料…'; render();
        pre=await TBWebTools.prefetch([q+' profile 2026-27 stats',q+' preferred foot position',q+' injury transfer news 2026']);
      }
      var sys='你是足球球探数据分析师，为中文足球学习 App 生成球员档案。'
        +'纪律：只用联网搜索确认的信息；查不到的字段填 null 或空数组，绝不编造（重点：惯用脚/位置/数据必须真实）。'
        +'今天是 '+new Date().toISOString().slice(0,10)+'，当前赛季是 2026-27：所有数据必须是 2026-27 赛季/最新转会的（旧赛季数据要标注赛季）。'
        +'直接输出 JSON，不要思考过程、不要把工具调用写成文字。'
       +'{"name":"中文常用名","en":"英文名","num":号码或null,"pos":["GK/CB/LB/RB/LWB/RWB/DM/CM/AM/LW/RW/ST"],"foot":"左/右/双/null",'
       +'"age":年龄或null,"club":"现俱乐部中文","nat":"国籍中文","season":"本赛季/上季数据文本（场次/进球/助攻）",'
       +'"styleTag":"一句话风格标签（15字内，如：出球型年轻中卫，转身快）",'
       +'"styleRead":"风格文字解读 80-150字：出场信任度/技术特点/主打位置",'
       +'"attrs":{"pace":0-100,"pass":0-100,"def":0-100,"air":0-100,"fin":0-100,"sta":0-100},'
       +'"pct":{"pace":同位置百分位0-100或null,"pass":null,"def":null,"air":null,"fin":null,"sta":null},'
       +'"weak":"短板&风险说明 60-120字（平衡评价，不只写优点；写清什么体系下会暴露）",'
       +'"risk":"伤病史&风险一句话或null",'
       +'"advanced":[{"k":"压迫下传球","v":"数据或描述"}]（位置专项高阶数据，1-4条，查得到才写）,'
       +'"versatility":[{"pos":"可客串位置","level":"熟练/可用/勉强"}]（无则空数组）,'
       +'"partners":{"best":["首选搭档1-2人（说明为什么）"],"alt":["备选"],"avoid":[{"n":"避雷搭档","why":"搭配隐患"}]},'
       +'"fit":{"good":["适配的战术体系1-3条"],"bad":["不适配的战术体系1-3条"]},'
       +'"tradeoff":"攻防代价分析 40-80字（出球能力附带的防守隐患/上抢回位问题等）",'
       +'"press":"高压逼抢场景下出球稳定性专项分析 40-80字",'
       +'"ceiling":"上限评估一句话（区分当前即战力与未来成长）",'
       +'"vsOpp":"不同类型对手下的对位表现 40-80字或null",'
       +'"contract":{"expire":合同到期年或null,"value":"身价文本或null"},'
       +'"sources":["来源域名1","来源域名2"]}';
      var res=await TBAgent.run({base:cfg.base,key:TBSettings.aiKey(),model:cfg.model,
        system:sys,messages:[{role:'user',content:(pre?('联网预搜结果（可直接引用，尽量不必再调工具）：\n'+pre+'\n\n'):'')+'球员：'+q}],
        tools:(cfg.search&&TBWebTools.available())?['web_search','web_fetch']:[],
        maxSteps:5,temp:cfg.temp,maxTokens:Math.max(cfg.tokens,4000),
        onEvent:function(e){ if(e.type==='tool_call') state.stage='联网查 '+e.name+'…';
          else if(e.type==='step_start') state.stage='第 '+e.step+' 步推理…';
          state.stage=state.stage.replace(/ \d+s$/,'')+' '+((Date.now()-state.t0)/1000|0)+'s'; render(); }});
      var o=TBAgent.extractJSON(res.content);
      if(!o||!o.name){
        var hint=res.finish==='length'?'（输出被截断——把模型换成非思考型或调大输出上限）':'';
        throw new Error('模型没有返回有效档案'+hint+'（换个更明确的球员名试试）');
      }
      o._q=q; o._ts=Date.now();
      state.res=o; cacheSet(ck,{res:o,ts:Date.now()});
      if(window.Notes) Notes.add('player','球员搜索','【球员】'+o.name+'（'+(o.club||'?')+'）\n风格：'+(o.styleTag||'')+'\n短板：'+(o.weak||'')+'\n适配：'+((o.fit&&o.fit.good)||[]).join('；')+'\n来源：'+(o.sources||[]).join(' '));
    }catch(e){ state.err=(e&&e.message)||String(e); }
    finally{ state.busy=false; state.stage=''; render(); }
  }

  /* 保存到球员库（引擎/阵型实验室用） */
  function saveToPool(){
    var o=state.res; if(!o) return;
    var c={}; try{ c=JSON.parse(localStorage.getItem(PCACHE)||'{}'); }catch(e){}
    c[normQ(o.en||o.name)]={n:o.name,en:[o.en].filter(Boolean),pos:o.pos||[],foot:o.foot||null,
      age:o.age||null,num:o.num||null,club:o.club||'',nat:o.nat||'',st:o.styleTag||'',
      d:o.styleRead||'',status:o.risk||null,tags:[o.styleTag].filter(Boolean),
      a:o.attrs||null,season:o.season||null,ts:Date.now()};
    try{ localStorage.setItem(PCACHE,JSON.stringify(c)); state.saved=true; }catch(e){}
    render();
  }

  /* ---------- 雷达图（同位置百分位） ---------- */
  function radar(pct){
    var keys=['pace','pass','def','air','fin','sta'];
    var labels=['速度','出球','防守','争顶','终结','体能'];
    var vals=keys.map(function(k){ return (pct&&typeof pct[k]==='number')?pct[k]:null; });
    var has=vals.some(function(v){return v!=null;});
    if(!has) return '<div class="hintline">百分位数据暂缺（AI 未查到足够样本）</div>';
    var cx=90,cy=82,R=62,N=6;
    function pt(i,r){ var ang=-Math.PI/2+i*2*Math.PI/N; return [cx+Math.cos(ang)*r, cy+Math.sin(ang)*r]; }
    var rings=[25,50,75,100].map(function(f){
      var ps=keys.map(function(_,i){ return pt(i,R*f/100).map(function(x){return x.toFixed(1);}).join(','); }).join(' ');
      return '<polygon points="'+ps+'" fill="none" stroke="#2a323d" stroke-width="1"/>';
    }).join('');
    var axes=keys.map(function(_,i){ var p=pt(i,R); return '<line x1="'+cx+'" y1="'+cy+'" x2="'+p[0].toFixed(1)+'" y2="'+p[1].toFixed(1)+'" stroke="#2a323d" stroke-width="1"/>'; }).join('');
    var poly=keys.map(function(_,i){ var v=vals[i]==null?0:vals[i]; var p=pt(i,R*v/100); return p[0].toFixed(1)+','+p[1].toFixed(1); }).join(' ');
    var dots=keys.map(function(_,i){ var v=vals[i]==null?0:vals[i]; var p=pt(i,R*v/100);
      return '<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="2.6" fill="#e2383f"/>'; }).join('');
    var lbls=labels.map(function(l,i){ var p=pt(i,R+15);
      return '<text x="'+p[0].toFixed(1)+'" y="'+(p[1]+3).toFixed(1)+'" text-anchor="middle" font-size="9.5" fill="#93a0af">'+l+'</text>'; }).join('');
    return '<div class="radarwrap"><svg width="180" height="164" viewBox="0 0 180 164">'+rings+axes
      +'<polygon points="'+poly+'" fill="rgba(226,56,63,.22)" stroke="#e2383f" stroke-width="1.6"/>'+dots+lbls+'</svg></div>'
      +'<div class="hintline" style="text-align:center">同位置百分位：'+labels.map(function(l,i){ return l+' '+(vals[i]==null?'—':vals[i]); }).join(' · ')+'</div>';
  }

  /* ---------- 知识搜索 ---------- */
  async function runKnow(q,force){
    if(state.knowBusy) return;
    if(!window.TBSettings||!TBSettings.ready()){ state.knowErr='还没配置 AI：点右上角「⚙ AI 设置」'; state.knowRes=null; render(); return; }
    q=String(q||'').trim(); if(!q) return;
    var ck='k:'+normQ(q);
    var cached=cacheGet()[ck];
    if(!force&&cacheFresh(cached)){ state.knowCur=q; state.knowRes=cached.res; state.knowErr='';
      if(window.Notes) Notes.add('know','知识搜索','【知识·缓存】'+q+'\n'+String(cached.res).slice(0,600));
      render(); return; }
    state.knowBusy=true; state.knowCur=q; state.knowRes=null; state.knowErr=''; state.knowT0=Date.now(); render();
    try{
      var cfg=TBSettings.cfg();
      var pre='';
      if(cfg.search&&window.TBWebTools&&TBWebTools.available()){
        state.knowStage='并行联网搜索…'; render();
        pre=await TBWebTools.prefetch([q]);
      }
      var sys='你是足球知识百科助手。今天是 '+new Date().toISOString().slice(0,10)+'。结合给出的预搜结果（不够再用 web_search 补 1 次，涉及赛季/转会/排名必须搜 2026 或 2026-27），用中文回答：'
        +'结构清晰（可用小标题/列表），关键数据给出来源域名。不确定的明确说「未能核实」。'
        +'注意：绝不要把 <tool_call> 之类的工具调用标签写进回答正文。'
        +'最后附一行「来源：xxx.com · yyy.com」。';
      var res=await TBAgent.run({base:cfg.base,key:TBSettings.aiKey(),model:cfg.model,
        system:sys,messages:[{role:'user',content:(pre?('联网预搜结果（可直接引用）：\n'+pre+'\n\n'):'')+q}],
        tools:(cfg.search&&TBWebTools.available())?['web_search','web_fetch']:[],
        maxSteps:4,temp:cfg.temp,maxTokens:Math.max(cfg.tokens,2600),
        onEvent:function(e){ if(e.type==='tool_call') state.knowStage='联网查 '+e.name+'…';
          state.knowStage=state.knowStage.replace(/ \d+s$/,'')+' '+((Date.now()-state.knowT0)/1000|0)+'s'; render(); }});
      state.knowRes=res.content; cacheSet(ck,{res:res.content,ts:Date.now()});
      if(window.Notes) Notes.add('know','知识搜索','【知识】'+state.knowCur+'\n'+String(res.content).slice(0,800));
    }catch(e){ state.knowErr=(e&&e.message)||String(e); }
    finally{ state.knowBusy=false; state.knowStage=''; render(); }
  }

  function mdBasic(s){
    return String(s||'').split('\n').map(function(ln){
      return esc(ln).replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/^### (.*)$/,'<b>$1</b>').replace(/^## (.*)$/,'<b>$1</b>');
    }).join('<br>');
  }


  /* ---------- 筛选搜索（联赛/球队/位置 → 球员列表 → 点击直接搜） ---------- */
  var FL={league:'',club:'',pos:''};
  function filterHtml(){
    var leagues=[];
    if(window.SQUADS_ALL){ var seen={};
      Object.keys(SQUADS_ALL).forEach(function(t){ var l=SQUADS_ALL[t].league; if(!seen[l]){ seen[l]=1; leagues.push(l); } }); }
    return '<div class="hintline" style="margin:2px 0 6px">不知道全名？用筛选：联赛 → 球队 → 位置，点球员直接搜。</div>'
      +'<div class="searchrow" style="flex-wrap:wrap">'
      +'<select class="tbai-select" id="fLeague" style="flex:1;min-width:100px"><option value="">全部联赛</option>'
      +leagues.map(function(l){ return '<option'+(FL.league===l?' selected':'')+'>'+l+'</option>'; }).join('')+'</select>'
      +'<select class="tbai-select" id="fClub" style="flex:1;min-width:110px"><option value="">全部球队</option></select>'
      +'<select class="tbai-select" id="fPos" style="flex:1;min-width:90px"><option value="">全部位置</option>'
      +['GK','CB','LB','RB','DM','CM','AM','LW','RW','ST'].map(function(p){ return '<option'+(FL.pos===p?' selected':'')+'>'+p+'</option>'; }).join('')+'</select>'
      +'</div><div id="fList" style="max-height:200px;overflow:auto;margin-bottom:8px"></div>';
  }
  function poolAll(){
    var out=[];
    if(window.SQUADS_ALL) Object.keys(SQUADS_ALL).forEach(function(t){
      (SQUADS_ALL[t].players||[]).forEach(function(p){ out.push({n:p.n,pos:(p.pos||[]).join('/'),club:t,league:SQUADS_ALL[t].league}); });
    });
    (window.PLAYERS||[]).forEach(function(p){ if(p.club&&!/离开/.test(p.club)) out.push({n:p.n,pos:(p.pos||[]).join('/'),club:p.club,league:''}); });
    var seen={}; return out.filter(function(x){ if(seen[x.n]) return false; seen[x.n]=1; return true; });
  }
  function renderFilterList(){
    var el=document.getElementById('fList'); if(!el) return;
    var list=poolAll().filter(function(x){
      if(FL.league&&x.league!==FL.league) return false;
      if(FL.club&&x.club!==FL.club) return false;
      if(FL.pos&&String(x.pos||'').indexOf(FL.pos)<0) return false;
      return true;
    }).slice(0,80);
    el.innerHTML=list.length?list.map(function(x){
      return '<div class="mini" data-fn="'+esc(x.n)+'" style="padding:7px 11px;margin-bottom:5px;cursor:pointer;display:flex;justify-content:space-between">'
        +'<b style="font-size:13px">'+esc(x.n)+'</b><span class="mut" style="font-size:11px">'+esc(x.club)+' · '+esc(x.pos||'')+'</span></div>';
    }).join(''):'<div class="hintline">（选联赛/球队/位置后在这里出名单）</div>';
    el.querySelectorAll('[data-fn]').forEach(function(m){
      m.onclick=function(){
        document.getElementById('plq').value=m.dataset.fn;
        runPlayer(m.dataset.fn);
      };
    });
  }
  function bindFilters(){
    var lg=document.getElementById('fLeague'); if(!lg) return;
    var cb=document.getElementById('fClub');
    function fillClubs(){
      var clubs=FL.league?Object.keys(window.SQUADS_ALL||{}).filter(function(t){ return SQUADS_ALL[t].league===FL.league; }):Object.keys(window.SQUADS_ALL||{});
      cb.innerHTML='<option value="">全部球队</option>'+clubs.map(function(c){ return '<option'+(FL.club===c?' selected':'')+'>'+c+'</option>'; }).join('');
    }
    fillClubs();
    lg.onchange=function(){ FL.league=lg.value; FL.club=''; fillClubs(); renderFilterList(); };
    cb.onchange=function(){ FL.club=cb.value; renderFilterList(); };
    document.getElementById('fPos').onchange=function(){ FL.pos=this.value; renderFilterList(); };
    renderFilterList();
  }

  /* ---------- 渲染 ---------- */
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function playerHtml(o){
    return '<div class="card deep"><h3>'+esc(o.name)+(o.num?' <small>#'+o.num+'</small>':'')
      +'<small>'+esc(o.en||'')+'</small></h3>'
      +'<div class="mrow"><b>位置：</b>'+(o.pos||[]).join(' / ')+' &nbsp;·&nbsp; <b>惯用脚：</b>'+(o.foot||'未查证')
      +(o.age?' &nbsp;·&nbsp; <b>年龄：</b>'+o.age:'')+'</div>'
      +'<div class="mrow"><b>俱乐部：</b>'+esc(o.club||'—')+' &nbsp;·&nbsp; <b>国家队：</b>'+esc(o.nat||'—')
      +(o.contract&&(o.contract.value||o.contract.expire)?' &nbsp;·&nbsp; <b>合同/身价：</b>'+esc([o.contract.expire?('到期 '+o.contract.expire):'',o.contract.value].filter(Boolean).join(' · ')):'')+'</div>'
      +(o.season?'<div class="mrow"><b>赛场数据：</b>'+esc(o.season)+'</div>':'')
      +(o.risk?'<div class="mrow" style="color:#ffb4b7"><b>伤病&风险：</b>'+esc(o.risk)+'</div>':'')
      +(o.styleTag?'<div class="tagline">「'+esc(o.styleTag)+'」</div>':'')
      +(o.styleRead?'<div class="sec">风 格 解 读</div><div class="p">'+esc(o.styleRead)+'</div>':'')
      +'<div class="sec">同 位 置 百 分 位 雷 达</div>'+radar(o.pct)
      +'<div class="sec">模 拟 器 属 性</div>'
      +(o.attrs?'<div class="hintline">速度 '+o.attrs.pace+' · 出球 '+o.attrs.pass+' · 防守 '+o.attrs.def
        +' · 争顶 '+o.attrs.air+' · 终结 '+o.attrs.fin+' · 体能 '+o.attrs.sta+'</div>':'<div class="hintline">暂缺</div>')
      +(o.weak?'<div class="sec">短 板 & 风 险（一期）</div><div class="p" style="color:#ffb4b7">'+esc(o.weak)+'</div>':'')
      +(o.tradeoff?'<div class="sec">攻 防 代 价</div><div class="p">'+esc(o.tradeoff)+'</div>':'')
      +(o.press?'<div class="sec">高 压 出 球 稳 定 性</div><div class="p">'+esc(o.press)+'</div>':'')
      +((o.advanced&&o.advanced.length)?'<div class="sec">位 置 专 项 高 阶 数 据（二期）</div>'
        +o.advanced.map(function(a){ return '<div class="mrow"><b>'+esc(a.k)+':</b>'+esc(a.v)+'</div>'; }).join(''):'')
      +((o.versatility&&o.versatility.length)?'<div class="sec">多 位 置 客 串（二期）</div>'
        +o.versatility.map(function(v){ return '<span class="chip b">'+esc(v.pos+' · '+v.level)+'</span>'; }).join(''):'')
      +(o.partners?'<div class="sec">搭 档 分 级</div>'
        +((o.partners.best||[]).length?'<div class="pairli"><b>首选：</b>'+esc(o.partners.best.join('；'))+'</div>':'')
        +((o.partners.alt||[]).length?'<div class="pairli" style="border-color:var(--blue)"><b>备选：</b>'+esc(o.partners.alt.join('；'))+'</div>':'')
        +((o.partners.avoid||[]).length?o.partners.avoid.map(function(a){ return '<div class="pairli" style="border-color:var(--red)"><b>避雷：</b>'+esc(a.n)+' — '+esc(a.why)+'</div>'; }).join(''):''):'')
      +(o.fit?'<div class="sec">战 术 适 配（一期）</div>'
        +(o.fit.good||[]).map(function(x){ return '<div class="pairli">✅ '+esc(x)+'</div>'; }).join('')
        +(o.fit.bad||[]).map(function(x){ return '<div class="pairli" style="border-color:var(--red)">⛔ '+esc(x)+'</div>'; }).join(''):'')
      +(o.ceiling?'<div class="sec">上 限 评 估</div><div class="p">'+esc(o.ceiling)+'</div>':'')
      +(o.vsOpp?'<div class="sec">不 同 对 手 对 位</div><div class="p">'+esc(o.vsOpp)+'</div>':'')
      +((o.sources&&o.sources.length)?'<div class="warn">来源：'+o.sources.map(esc).join(' · ')+'（AI 联网核实 · '+new Date(o._ts).toLocaleString()+'）</div>':'')
      +'<div style="margin-top:10px"><button class="optbtn" onclick="PLSearch.saveToPool()">💾 保存到球员库（模拟器/阵型实验室可用）</button></div></div>';
  }

  var built=false;
  function render(){
    var el=document.getElementById('tab-sr'); if(!el) return;
    if(!built){
      built=true;
      el.innerHTML=
        '<div class="card"><h3>球员搜索</h3><div class="p">随便搜五大联赛任何一个球员（不限模拟器里的 32 队——法甲/德甲/西甲任意球队、甚至次级联赛球员都能搜）：AI 联网核实后生成完整档案（基础信息 · 风格 · '
        +'百分位雷达 · 短板风险 · 搭档分级 · 战术适配 · 模拟器属性）。惯用脚/数据查不到就标「未查证」，不编造。</div>'
        +'<div class="searchrow"><input id="plq" placeholder="球员名：哈兰德 / Saka / 谢什科…"><button class="optbtn" style="width:auto;padding:10px 16px;margin:0" id="plGo">搜 索</button></div>'
        +filterHtml()
        +'<div id="plRes"></div></div>'
        +'<div class="card"><h3>足球知识搜索</h3><div class="p">规则、战术、历史、赛制……和球员搜索完全分开的两个框，互不干扰。</div>'
        +'<div class="searchrow"><input id="kq" placeholder="例如：什么是越位？欧冠和欧联的区别？"><button class="optbtn" style="width:auto;padding:10px 16px;margin:0" id="kGo">搜 索</button></div>'
        +'<div id="kRes"></div></div>';
      document.getElementById('plGo').onclick=function(){ runPlayer(document.getElementById('plq').value); };
      document.getElementById('kGo').onclick=function(){ runKnow(document.getElementById('kq').value); };
      document.getElementById('plq').addEventListener('keydown',function(e){ if(e.key==='Enter') runPlayer(this.value); });
      document.getElementById('kq').addEventListener('keydown',function(e){ if(e.key==='Enter') runKnow(this.value); });
      bindFilters();
    }
    var pr=document.getElementById('plRes');
    if(state.busy){ pr.innerHTML='<div class="hintline">'+esc(state.stage||'AI 联网搜索中…（约 10-30 秒）')+'</div>'; }
    else if(state.err){ pr.innerHTML='<div class="hintline" style="color:#ffb4b7">'+esc(state.err)+'</div>'; }
    else if(state.res){
      pr.innerHTML=playerHtml(state.res)
        +'<div class="hintline" style="margin:-6px 4px 10px">结果生成于 '+new Date(state.res._ts).toLocaleString()
        +' · 信息有变？<button class="chip" id="plRefresh">🔄 强制重新搜索（忽略缓存）</button></div>';
      var rb=document.getElementById('plRefresh');
      if(rb) rb.onclick=function(){ runPlayer(state.cur,true); };
    }
    else pr.innerHTML='';
    var kr=document.getElementById('kRes');
    if(state.knowBusy){ kr.innerHTML='<div class="hintline">'+esc(state.knowStage||'AI 联网搜索中…')+'</div>'; }
    else if(state.knowErr){ kr.innerHTML='<div class="hintline" style="color:#ffb4b7">'+esc(state.knowErr)+'</div>'; }
    else if(state.knowRes){ kr.innerHTML='<div class="card gcard"><div class="p">'+mdBasic(state.knowRes)+'</div></div>'; }
    else kr.innerHTML='';
  }

  return { runPlayer:runPlayer, runKnow:runKnow, saveToPool:saveToPool, render:render };
})();
window.renderSearchModule=function(){ PLSearch.render(); };
