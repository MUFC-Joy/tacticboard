/* =========================================================
   TBSettings v2 —— 全局 AI 设置（主站 / 引擎共享）
   ─────────────────────────────────────────────────────────
   · 3 组 AI 接口（地址 + Key + 模型），随时切换「使用中」
   · 3 组搜索 Key（Tavily / 博查 / Serper），随时切换「使用中」
   · 配置存 localStorage 'tb_ai_global'（同源共享，引擎 iframe 直接可读）
   · Key 存 TBKeys（AES-GCM 加密 IndexedDB，槽位名 ai:0/1/2、search:tavily/bocha/serper）
   · 兼容旧版：只存过 base/model/'ai'/'tavily' 的配置会自动迁移到 ① 号槽
   ========================================================= */
'use strict';
window.TBSettings=(function(){
  var STORE='tb_ai_global';
  var PRESETS=[
    {n:'DeepSeek',base:'https://api.deepseek.com/v1',model:'deepseek-chat'},
    {n:'智谱 GLM',base:'https://open.bigmodel.cn/api/paas/v4',model:'glm-4.6'},
    {n:'OpenAI',base:'https://api.openai.com/v1',model:'gpt-4o-mini'},
    {n:'Moonshot',base:'https://api.moonshot.cn/v1',model:'moonshot-v1-8k'},
    {n:'本地 Ollama',base:'http://127.0.0.1:11434/v1',model:'qwen2.5:7b'}
  ];
  var SEARCH_ENGINES=[
    {id:'tavily',name:'Tavily',ph:'tvly-...',url:'https://app.tavily.com',
     tip:'浏览器直连会被 CORS 拦：用仓库里的「启动手机预览.command」打开本站会自动带本地代理；每月 1000 次免费额度。'},
    {id:'bocha',name:'博查搜索',ph:'sk-...',url:'https://open.bochaai.com',
     tip:'浏览器可直连，国内中文源质量好；不支持网页正文抓取（web_fetch）。'},
    {id:'serper',name:'Serper（Google）',ph:'你的 serper key',url:'https://serper.dev',
     tip:'Google 结果，2500 次免费；部分网络环境下浏览器直连可能被拦，报错时换回 Tavily / 博查。'}
  ];
  var SLOTS=3;
  var _cfg=null, _keys={ai:['','',''],search:{tavily:'',bocha:'',serper:''}}, _models=null;

  function clampSlot(i){ i=Number(i)||0; return i<0?0:(i>=SLOTS?SLOTS-1:i); }

  function normalize(raw){
    raw=raw||{};
    var provs=(raw.providers&&raw.providers.length)?raw.providers.slice(0,SLOTS):[];
    if(!provs.length) provs.push({name:'接口 1',base:raw.base||'',model:raw.model||''});
    while(provs.length<SLOTS) provs.push({name:'接口 '+(provs.length+1),base:'',model:''});
    provs=provs.map(function(p,i){
      return {name:p.name||('接口 '+(i+1)),base:String(p.base||'').trim(),model:String(p.model||'').trim()};
    });
    var active=clampSlot(raw.active);
    var activeSearch=raw.activeSearch||raw.searchProvider||'tavily';
    if(!SEARCH_ENGINES.some(function(e){return e.id===activeSearch;})) activeSearch='tavily';
    return {
      providers:provs,
      active:active,
      activeSearch:activeSearch,
      searches:raw.searches||{},
      tokens:raw.tokens||6000,
      temp:raw.temp==null?0.4:raw.temp,
      search:raw.search!==false,
      /* 兼容字段：老代码读 cfg().base / cfg().model / cfg().searchProvider */
      base:provs[active].base,
      model:provs[active].model,
      searchProvider:activeSearch
    };
  }
  function cfg(){
    if(_cfg) return _cfg;
    var raw={}; try{ raw=JSON.parse(localStorage.getItem(STORE)||'{}'); }catch(e){ raw={}; }
    _cfg=normalize(raw);
    return _cfg;
  }
  function saveCfg(){
    var c=cfg();
    c.base=c.providers[c.active].base;
    c.model=c.providers[c.active].model;
    c.searchProvider=c.activeSearch;
    try{ localStorage.setItem(STORE,JSON.stringify(c)); }catch(e){}
    document.dispatchEvent(new CustomEvent('tbai:changed'));
  }
  function setActiveAI(i){
    var c=cfg(); c.active=clampSlot(i);
    c.base=c.providers[c.active].base; c.model=c.providers[c.active].model;
    saveCfg(); return c;
  }
  function setActiveSearch(id){
    var c=cfg(); c.activeSearch=id; c.searchProvider=id; saveCfg(); return c;
  }
  function ready(){ var c=cfg(); return !!(c.base&&c.model&&aiKey()); }
  function searchReady(){ return !!searchKey(); }
  function aiKey(){ return _keys.ai[cfg().active]||''; }
  function searchKey(){ return _keys.search[cfg().activeSearch]||''; }
  function tavilyKey(){ return searchKey(); }        /* 兼容旧调用 */
  function keysState(){ return _keys; }

  async function loadKeys(){
    var out=[];
    for(var i=0;i<SLOTS;i++){
      var k=await TBKeys.load('ai:'+i);
      if(!k&&i===0) k=await TBKeys.load('ai');      /* 旧版单 Key 兼容 */
      out.push(k||'');
    }
    _keys.ai=out;
    var s={};
    for(var j=0;j<SEARCH_ENGINES.length;j++){
      var id=SEARCH_ENGINES[j].id;
      var v=await TBKeys.load('search:'+id);
      if(!v&&id==='tavily') v=await TBKeys.load('tavily');  /* 旧版兼容 */
      s[id]=v||'';
    }
    _keys.search=s;
    return _keys;
  }

  /* ---------- 自带样式（跨主站/引擎复用，不依赖页面 CSS） ---------- */
  var CSS=''
  +'.tbs-ov{position:fixed;inset:0;background:rgba(3,6,10,.72);backdrop-filter:blur(5px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:18px}'
  +'.tbs-box{background:#141a22;border:1px solid #2a323d;border-radius:18px;color:#e8eef5;width:min(1060px,97vw);max-height:92vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 26px 80px rgba(0,0,0,.62);font:14px/1.5 -apple-system,BlinkMacSystemFont,"PingFang SC",Roboto,"Microsoft YaHei",sans-serif}'
  +'.tbs-h{display:flex;align-items:center;gap:12px;padding:15px 20px;border-bottom:1px solid #2a323d;flex:none}'
  +'.tbs-h b{font-size:16px}.tbs-h .sub{font-size:11.5px;color:#93a0af}'
  +'.tbs-x{margin-left:auto;background:#1b222c;border:1px solid #2a323d;color:#93a0af;border-radius:99px;width:34px;height:34px;font-size:15px;cursor:pointer}'
  +'.tbs-body{flex:1;overflow:auto;padding:16px 20px 6px}'
  +'.tbs-grid{display:grid;grid-template-columns:1fr;gap:16px}'
  +'@media (min-width:880px){.tbs-grid{grid-template-columns:1.08fr .92fr}}'
  +'.tbs-panel{background:#111820;border:1px solid #2a323d;border-radius:14px;padding:14px}'
  +'.tbs-ph{display:flex;align-items:center;gap:8px;margin-bottom:10px}'
  +'.tbs-ph b{font-size:14px}.tbs-ph span{font-size:11px;color:#7d8a99}'
  +'.tbs-tabs{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}'
  +'.tbs-tab{background:#1b222c;border:1px solid #2a323d;color:#93a0af;border-radius:10px;padding:7px 12px;font-size:12.5px;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:6px}'
  +'.tbs-tab.on{border-color:#4ea1ff;color:#fff;background:rgba(78,161,255,.14)}'
  +'.tbs-tab .dot{width:6px;height:6px;border-radius:50%;background:#2a323d;display:inline-block}'
  +'.tbs-tab.live .dot{background:#23c55e;box-shadow:0 0 0 3px rgba(35,197,94,.18)}'
  +'.tbs-tab .k{font-size:10px;opacity:.7}'
  +'.tbs-f{margin-bottom:12px}'
  +'.tbs-f label{display:block;font-size:11.5px;color:#93a0af;margin-bottom:5px}'
  +'.tbs-f input[type=text],.tbs-f input[type=password]{width:100%;box-sizing:border-box;background:#1b222c;border:1px solid #2a323d;border-radius:9px;color:#e8eef5;padding:10px 11px;font-size:13px;font-family:inherit}'
  +'.tbs-f input:focus{outline:none;border-color:#4ea1ff}'
  +'.tbs-row{display:flex;gap:8px;align-items:center}.tbs-row input{flex:1}'
  +'.tbs-btn{background:#23303f;border:1px solid #2a323d;color:#e8eef5;border-radius:9px;padding:9px 14px;font-size:13px;cursor:pointer;font-family:inherit;white-space:nowrap}'
  +'.tbs-btn:hover{border-color:#4ea1ff;color:#cfe6ff}'
  +'.tbs-btn.live{background:#e2383f;border-color:#e2383f;font-weight:700;color:#fff}'
  +'.tbs-btn.ok{background:rgba(35,197,94,.14);border-color:rgba(35,197,94,.5);color:#8ef0b3}'
  +'.tbs-btn:disabled{opacity:.5;cursor:default}'
  +'.tbs-ok{color:#23c55e;font-size:11.5px}.tbs-mut{color:#7d8a99;font-size:11.5px}.tbs-err{color:#ff8087;font-size:12px;margin-top:6px;min-height:16px}'
  +'.tbs-note{font-size:11px;color:#6f7d8b;line-height:1.6;margin:8px 0}'
  +'.tbs-a{color:#4ea1ff;text-decoration:none}'
  +'.tbs-chips{display:flex;flex-wrap:wrap;gap:6px}'
  +'.tbs-chip{background:#1b222c;border:1px solid #2a323d;color:#93a0af;border-radius:99px;padding:6px 11px;font-size:12px;cursor:pointer;font-family:inherit}'
  +'.tbs-chip:hover{border-color:#4ea1ff;color:#a8d2ff}'
  +'.tbs-common{margin-top:16px;border-top:1px solid #2a323d;padding-top:14px;display:grid;grid-template-columns:1fr;gap:12px}'
  +'@media (min-width:880px){.tbs-common{grid-template-columns:1fr 1fr 1fr}}'
  +'.tbs-sw{display:flex;align-items:center;gap:8px;font-size:13px;color:#e8eef5;cursor:pointer}'
  +'.tbs-sw input{width:16px;height:16px;accent-color:#e2383f}'
  +'.tbs-foot{display:flex;gap:8px;align-items:center;padding:12px 20px;border-top:1px solid #2a323d;background:#10151c;flex:none;flex-wrap:wrap}'
  +'.tbs-foot .sp{flex:1}'
  +'.tbs-select{width:100%;background:#1b222c;border:1px solid #2a323d;border-radius:9px;color:#e8eef5;padding:9px 11px;font-size:13px;font-family:inherit}'
  +'.tbs-badge{font-size:10px;border:1px solid rgba(35,197,94,.45);color:#8ef0b3;border-radius:99px;padding:1px 7px;margin-left:6px}';

  function ensureCss(){
    if(document.getElementById('tbs-css')) return;
    var st=document.createElement('style'); st.id='tbs-css'; st.textContent=CSS;
    document.head.appendChild(st);
  }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function open(){
    ensureCss();
    draft={ai:{},sr:{}};
    /* 打开面板时定位到「使用中」的那一组，避免看到别的槽位的 Key */
    editSlot=clampSlot(cfg().active);
    editSearch=cfg().activeSearch;
    loadKeys().then(render);
  }
  function close(){ var ov=document.getElementById('tbs-ov'); if(ov) ov.remove(); }

  var editSlot=0, editSearch='tavily';
  var draft={ai:{},sr:{}};   /* 未保存的 Key 草稿：切槽位/切引擎不会丢 */

  function render(){
    close();
    var c=cfg();
    editSlot=clampSlot(editSlot);
    if(!SEARCH_ENGINES.some(function(e){return e.id===editSearch;})) editSearch=c.activeSearch;
    var p=c.providers[editSlot]||{name:'',base:'',model:''};
    var hasKey=!!(_keys.ai[editSlot]||draft.ai[editSlot]);
    var hasSearch=!!(_keys.search[editSearch]||draft.sr[editSearch]);
    var eng=SEARCH_ENGINES.filter(function(e){return e.id===editSearch;})[0];

    var ov=document.createElement('div'); ov.id='tbs-ov'; ov.className='tbs-ov';
    ov.innerHTML=
    '<div class="tbs-box" role="dialog" aria-label="全局AI设置">'
    +'<div class="tbs-h"><div><b>⚙ 全局 AI 设置</b>'
      +'<div class="sub">全项目（阵型实验室 / 模拟器 / 球员搜索 / 球队看板）共用这套配置，一处保存处处生效</div></div>'
      +'<button class="tbs-x" id="tbs-close">✕</button></div>'
    +'<div class="tbs-body">'
    +'<div class="tbs-grid">'
      /* ---- 左：AI 接口 ---- */
      +'<div class="tbs-panel">'
        +'<div class="tbs-ph"><b>🧠 AI 接口</b><span>3 组，随时切换「使用中」</span></div>'
        +'<div class="tbs-tabs" id="tbs-ai-tabs">'
        +c.providers.map(function(pr,i){
          return '<button class="tbs-tab '+(i===editSlot?'on ':'')+(i===c.active?'live':'')+'" data-aislot="'+i+'">'
            +'<span class="dot"></span>'+(i+1)+'. '+esc(pr.name||('接口 '+(i+1)))
            +(_keys.ai[i]?' <span class="k">已存 Key</span>':'')+(i===c.active?' <span class="k" style="color:#8ef0b3">使用中</span>':'')+'</button>';
        }).join('')+'</div>'
        +'<div class="tbs-f"><label>接口名称（备注用）</label>'
          +'<input type="text" id="tbs-name" placeholder="例：DeepSeek 主号 / 智谱备用" value="'+esc(p.name)+'"></div>'
        +'<div class="tbs-f"><label>接口地址（OpenAI 兼容，末尾不带 /chat/completions）</label>'
          +'<input type="text" id="tbs-base" placeholder="https://api.example.com/v1" value="'+esc(p.base)+'"></div>'
        +'<div class="tbs-f"><label>API Key '+(hasKey?'<span class="tbs-ok">已保存（加密存在本机）</span>':'<span class="tbs-mut">未保存</span>')+'</label>'
          +'<input type="password" id="tbs-key" placeholder="'+(hasKey?'已保存，留空则不修改':'sk-...')+'"></div>'
        +'<div class="tbs-f"><label>模型</label><div class="tbs-row">'
          +'<input type="text" id="tbs-model" placeholder="deepseek-chat / glm-4.6 …" value="'+esc(p.model)+'">'
          +'<button class="tbs-btn" id="tbs-pull">拉取模型</button></div>'
          +'<div id="tbs-modelbox"></div></div>'
        +'<div class="tbs-f"><label>常用提供商（一键填入当前槽位）</label>'
          +'<div class="tbs-chips" id="tbs-presets">'
          +PRESETS.map(function(x){return '<button class="tbs-chip" data-preset="'+esc(x.n)+'">'+esc(x.n)+'</button>';}).join('')
          +'</div></div>'
        +'<div class="tbs-btn ok" id="tbs-useai" style="display:inline-block">'+(editSlot===c.active?'✅ 当前使用中':'设为使用中的接口')+'</div>'
      +'</div>'
      /* ---- 右：搜索 ---- */
      +'<div class="tbs-panel">'
        +'<div class="tbs-ph"><b>🌐 联网搜索</b><span>3 家 Key，随时切换</span></div>'
        +'<div class="tbs-tabs" id="tbs-sr-tabs">'
        +SEARCH_ENGINES.map(function(e){
          return '<button class="tbs-tab '+(e.id===editSearch?'on ':'')+(e.id===c.activeSearch?'live':'')+'" data-srslot="'+e.id+'">'
            +'<span class="dot"></span>'+esc(e.name)
            +(_keys.search[e.id]?' <span class="k">已存</span>':'')+(e.id===c.activeSearch?' <span class="k" style="color:#8ef0b3">使用中</span>':'')+'</button>';
        }).join('')+'</div>'
        +'<div class="tbs-f"><label>'+esc(eng.name)+' Key '+(hasSearch?'<span class="tbs-ok">已保存</span>':'<span class="tbs-mut">未保存</span>')+'</label>'
          +'<input type="password" id="tbs-skey" placeholder="'+(hasSearch?'已保存，留空则不修改':esc(eng.ph))+'"></div>'
        +'<div class="tbs-note">'+esc(eng.tip)+'</div>'
        +'<div class="tbs-f"><label>注册地址</label><a class="tbs-a" href="'+esc(eng.url)+'" target="_blank" rel="noopener">'+esc(eng.url)+'</a></div>'
        +'<div class="tbs-btn ok" id="tbs-usesr" style="display:inline-block">'+(editSearch===c.activeSearch?'✅ 当前使用中':'设为使用中的搜索引擎')+'</div>'
        +'<div class="tbs-f" style="margin-top:14px"><label class="tbs-sw"><input type="checkbox" id="tbs-search" '+(c.search?'checked':'')+'> AI 分析时联网搜索最新信息（推荐开启，消耗搜索额度）</label></div>'
        +'<div class="tbs-note">搜索是可选增强：关掉后所有 AI 功能只用本地球员库与固定数据，照样出结果，只是不查最新伤停与转会。</div>'
      +'</div>'
    +'</div>'
    +'<div class="tbs-common">'
      +'<div class="tbs-f"><label>最大输出 tokens（思考型模型建议 8000-16000，防止 JSON 被截断）</label>'
        +'<input type="text" id="tbs-tokens" inputmode="numeric" value="'+(c.tokens||6000)+'"></div>'
      +'<div class="tbs-f"><label>温度（0 = 稳定，1 = 发散；结构化分析建议 0.3-0.5）</label>'
        +'<input type="text" id="tbs-temp" inputmode="decimal" value="'+(c.temp==null?0.4:c.temp)+'"></div>'
      +'<div class="tbs-f"><label>Key 存储位置</label><div class="tbs-note" style="margin:0">本机浏览器 IndexedDB（AES-GCM 加密），不进仓库、不上传；换浏览器或清缓存需要重填。'
        +(TBKeys.cryptoOK()?'':'<br><span style="color:#ffd479">当前环境 WebCrypto 不可用，降级为本机混淆存储。</span>')+'</div></div>'
    +'</div>'
    +'<div class="tbs-err" id="tbs-err"></div>'
    +'</div>'
    +'<div class="tbs-foot">'
      +'<span class="tbs-mut" id="tbs-tip">提示：改完记得点「保存」；切换槽位不用先保存。</span>'
      +'<span class="sp"></span>'
      +'<button class="tbs-btn" id="tbs-clrai">清空当前 Key</button>'
      +'<button class="tbs-btn live" id="tbs-save">保存</button>'
    +'</div>'
    +'</div>';
    document.body.appendChild(ov);
    ov.addEventListener('click',function(e){ if(e.target===ov) close(); });

    /* ---- 切槽位：先把当前输入写回「当前」槽位，再切换（否则会把名字串到下一个槽） ---- */
    function stash(){
      var c2=cfg();
      var p2=c2.providers[editSlot];
      if(!p2) return;
      p2.name=ov.querySelector('#tbs-name').value.trim()||('接口 '+(editSlot+1));
      p2.base=ov.querySelector('#tbs-base').value.trim();
      p2.model=ov.querySelector('#tbs-model').value.trim();
      var kj=ov.querySelector('#tbs-key'); if(kj&&kj.value.trim()) draft.ai[editSlot]=kj.value.trim();
      var sj=ov.querySelector('#tbs-skey'); if(sj&&sj.value.trim()) draft.sr[editSearch]=sj.value.trim();
      c2.base=c2.providers[c2.active].base;
      c2.model=c2.providers[c2.active].model;
      saveCfg();
    }
    ov.querySelector('#tbs-close').onclick=close;
    ov.querySelectorAll('[data-aislot]').forEach(function(b){
      b.onclick=function(){
        var next=Number(b.dataset.aislot);
        if(next===editSlot) return;
        stash(); editSlot=next; render();
      };
    });
    ov.querySelectorAll('[data-srslot]').forEach(function(b){
      b.onclick=function(){
        var next=b.dataset.srslot;
        if(next===editSearch) return;
        stash(); editSearch=next; render();
      };
    });
    ov.querySelector('#tbs-useai').onclick=function(){
      stash(); setActiveAI(editSlot); render();
    };
    ov.querySelector('#tbs-usesr').onclick=function(){
      stash(); setActiveSearch(editSearch); render();
    };
    ov.querySelector('#tbs-presets').addEventListener('click',function(e){
      var b=e.target.closest('[data-preset]'); if(!b) return;
      var pr=PRESETS.filter(function(x){return x.n===b.dataset.preset;})[0]; if(!pr) return;
      ov.querySelector('#tbs-base').value=pr.base;
      ov.querySelector('#tbs-model').value=pr.model;
      if(!ov.querySelector('#tbs-name').value.trim()) ov.querySelector('#tbs-name').value=pr.n;
    });
    ov.querySelector('#tbs-pull').onclick=function(){ pullModels(); };
    ov.querySelector('#tbs-save').onclick=function(){ doSave(); };
    ov.querySelector('#tbs-clrai').onclick=async function(){
      var nm='ai:'+editSlot;
      await TBKeys.clear(nm);
      if(editSlot===0) await TBKeys.clear('ai');
      _keys.ai[editSlot]=''; delete draft.ai[editSlot]; render();
    };

    function pullModels(){
      var box=ov.querySelector('#tbs-modelbox'), eb=ov.querySelector('#tbs-err');
      eb.textContent='';
      var base=ov.querySelector('#tbs-base').value.trim();
      var key=ov.querySelector('#tbs-key').value.trim()||_keys.ai[editSlot];
      if(!base||!key){ eb.textContent='先填接口地址和 API Key（或已保存过 Key）'; return; }
      var btn=ov.querySelector('#tbs-pull'); btn.disabled=true; btn.textContent='拉取中…';
      TBAgent.listModels(base,key).then(function(ids){
        btn.disabled=false; btn.textContent='拉取模型';
        if(!ids||!ids.length){ eb.textContent='没有拿到模型列表'; return; }
        _models=ids;
        var cur=ov.querySelector('#tbs-model').value.trim();
        box.innerHTML='<select class="tbs-select" id="tbs-msel" style="margin-top:8px">'
          +'<option value="">— 共 '+ids.length+' 个模型，点开选择 —</option>'
          +ids.map(function(id){ return '<option value="'+esc(id)+'"'+(id===cur?' selected':'')+'>'+esc(id)+'</option>'; }).join('')
          +'</select><div class="tbs-note">选完会自动填进上面的模型输入框；也可以手动填写。</div>';
        var sel=box.querySelector('#tbs-msel');
        sel.onchange=function(){ if(sel.value){ ov.querySelector('#tbs-model').value=sel.value; } };
      }).catch(function(e){
        btn.disabled=false; btn.textContent='拉取模型';
        eb.textContent='拉取失败：'+(e.message||e);
      });
    }
    function doSave(){
      var eb=ov.querySelector('#tbs-err'); eb.textContent='';
      var c2=cfg();
      c2.providers[editSlot]={name:ov.querySelector('#tbs-name').value.trim()||('接口 '+(editSlot+1)),
        base:ov.querySelector('#tbs-base').value.trim(), model:ov.querySelector('#tbs-model').value.trim()};
      c2.search=ov.querySelector('#tbs-search').checked;
      c2.tokens=Math.max(1000,Number(ov.querySelector('#tbs-tokens').value)||6000);
      var tv=Number(ov.querySelector('#tbs-temp').value);
      c2.temp=isNaN(tv)?0.4:Math.max(0,Math.min(1.5,tv));
      var k=ov.querySelector('#tbs-key').value.trim()||draft.ai[editSlot]||'';
      var sk=ov.querySelector('#tbs-skey').value.trim()||draft.sr[editSearch]||'';
      (async function(){
        try{
          if(k){ await TBKeys.save('ai:'+editSlot,k); if(editSlot===0) await TBKeys.save('ai',k); }
          if(sk){ await TBKeys.save('search:'+editSearch,sk); if(editSearch==='tavily') await TBKeys.save('tavily',sk); }
          /* 其它槽位里已输入但没点保存的 Key 一并落盘（切槽位不再丢） */
          for(var di in draft.ai){ if(di!==String(editSlot)){ await TBKeys.save('ai:'+di,draft.ai[di]); if(di==='0') await TBKeys.save('ai',draft.ai[di]); } }
          for(var ds in draft.sr){ if(ds!==editSearch){ await TBKeys.save('search:'+ds,draft.sr[ds]); if(ds==='tavily') await TBKeys.save('tavily',draft.sr[ds]); } }
          draft={ai:{},sr:{}};
          saveCfg(); await loadKeys(); close();
          document.dispatchEvent(new CustomEvent('tbai:changed'));
        }catch(e){ eb.textContent='保存失败：'+(e.message||e); }
      })();
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ loadKeys(); });
  else loadKeys();

  return { cfg:cfg, open:open, close:close, ready:ready, searchReady:searchReady,
           aiKey:aiKey, searchKey:searchKey, tavilyKey:tavilyKey, loadKeys:loadKeys, saveCfg:saveCfg,
           setActiveAI:setActiveAI, setActiveSearch:setActiveSearch, keysState:keysState,
           searchEngines:SEARCH_ENGINES, presets:PRESETS };
})();
