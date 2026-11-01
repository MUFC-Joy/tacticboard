/* =========================================================
   TBSettings —— 全局 AI 设置（主站 / 引擎共享，问题五：全项目同一个 API）
   配置存 localStorage 'tb_ai_global'（同源共享，引擎 iframe 直接可读）
   Key 存 TBKeys（AES-GCM 加密 IndexedDB）
   模型拉取后以下拉选择（修复旧版 alert+强制第一个的 bug）
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
  var _cfg=null, _models=null, _keyAI='', _keyTavily='';

  function cfg(){
    if(_cfg) return _cfg;
    try{ _cfg=JSON.parse(localStorage.getItem(STORE)||'{}'); }catch(e){ _cfg={}; }
    _cfg.base=_cfg.base||''; _cfg.model=_cfg.model||'';
    _cfg.temp=(_cfg.temp==null?0.4:_cfg.temp); _cfg.tokens=_cfg.tokens||6000;
    _cfg.search=(_cfg.search!==false);
    _cfg.searchProvider=_cfg.searchProvider||'tavily';
    return _cfg;
  }
  function saveCfg(){
    try{ localStorage.setItem(STORE,JSON.stringify(cfg())); }catch(e){}
    document.dispatchEvent(new CustomEvent('tbai:changed'));
  }
  function ready(){ var c=cfg(); return !!(c.base&&c.model&&_keyAI); }
  function searchReady(){ return !!_keyTavily; }
  function aiKey(){ return _keyAI; }
  function tavilyKey(){ return _keyTavily; }
  async function loadKeys(){
    _keyAI=await TBKeys.load('ai'); _keyTavily=await TBKeys.load('tavily');
    return {ai:_keyAI,tavily:_keyTavily};
  }

  /* ---------- 自带样式（跨主站/引擎复用，不依赖页面 CSS） ---------- */
  var CSS='' +
  '.tbai-ov{position:fixed;inset:0;background:rgba(0,0,0,.62);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px}' +
  '.tbai-box{background:#151a21;border:1px solid #2a323d;border-radius:16px;color:#e8eef5;width:100%;max-width:460px;max-height:88vh;overflow:auto;font:14px/1.5 -apple-system,BlinkMacSystemFont,"PingFang SC",Roboto,"Microsoft YaHei",sans-serif;box-shadow:0 18px 60px rgba(0,0,0,.5)}' +
  '.tbai-h{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px;border-bottom:1px solid #2a323d;position:sticky;top:0;background:#151a21;z-index:2}' +
  '.tbai-h b{font-size:15px}.tbai-x{background:none;border:0;color:#93a0af;font-size:16px;cursor:pointer;padding:2px 6px}' +
  '.tbai-bd{padding:12px 16px 16px}' +
  '.tbai-f{margin-bottom:12px}' +
  '.tbai-f label{display:block;font-size:12px;color:#93a0af;margin-bottom:5px}' +
  '.tbai-f input[type=text],.tbai-f input[type=password]{width:100%;box-sizing:border-box;background:#1b222c;border:1px solid #2a323d;border-radius:9px;color:#e8eef5;padding:9px 11px;font-size:13px;font-family:inherit}' +
  '.tbai-f input:focus{outline:none;border-color:#4ea1ff}' +
  '.tbai-row{display:flex;gap:8px;align-items:center}' +
  '.tbai-row input{flex:1}' +
  '.tbai-chips{display:flex;flex-wrap:wrap;gap:6px}' +
  '.tbai-chip{background:#1b222c;border:1px solid #2a323d;color:#93a0af;border-radius:99px;padding:6px 11px;font-size:12px;cursor:pointer;font-family:inherit}' +
  '.tbai-chip:hover{border-color:#4ea1ff;color:#a8d2ff}' +
  '.tbai-btn{background:#23303f;border:1px solid #2a323d;color:#e8eef5;border-radius:9px;padding:8px 13px;font-size:13px;cursor:pointer;font-family:inherit;white-space:nowrap}' +
  '.tbai-btn.live{background:#e2383f;border-color:#e2383f;font-weight:700}' +
  '.tbai-btn:disabled{opacity:.5;cursor:default}' +
  '.tbai-ok{color:#23c55e;font-size:12px}.tbai-mut{color:#93a0af;font-size:12px}.tbai-err{color:#ff8087;font-size:12px;margin-top:6px}' +
  '.tbai-note{font-size:11.5px;color:#7b8896;line-height:1.55;margin:10px 0}' +
  '.tbai-foot{display:flex;gap:8px;padding-top:6px;flex-wrap:wrap}' +
  '.tbai-select{width:100%;background:#1b222c;border:1px solid #2a323d;border-radius:9px;color:#e8eef5;padding:9px 11px;font-size:13px;font-family:inherit}' +
  '.tbai-sw{display:flex;align-items:center;gap:8px;font-size:13px;color:#e8eef5;cursor:pointer}' +
  '.tbai-sw input{width:16px;height:16px;accent-color:#e2383f}' +
  '.tbai-a{color:#4ea1ff;text-decoration:none;font-size:12px}';

  function ensureCss(){
    if(document.getElementById('tbai-css')) return;
    var st=document.createElement('style'); st.id='tbai-css'; st.textContent=CSS;
    document.head.appendChild(st);
  }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  /* ---------- 面板 ---------- */
  function open(){
    ensureCss(); loadKeys().then(render);
  }
  function close(){
    var ov=document.getElementById('tbai-ov'); if(ov) ov.remove();
  }
  function render(){
    close();
    var c=cfg(), hasAI=!!_keyAI, hasTv=!!_keyTavily;
    var ov=document.createElement('div'); ov.id='tbai-ov'; ov.className='tbai-ov';
    ov.innerHTML=
    '<div class="tbai-box" role="dialog" aria-label="全局AI设置">'
    +'<div class="tbai-h"><b>⚙ 全局 AI 设置</b><button class="tbai-x" id="tbai-close">✕</button></div>'
    +'<div class="tbai-bd">'
    +'<div class="tbai-note">全项目（阵型分析 / 模拟器 / 球员搜索 / 球队看板）共用这一套 AI 接口与搜索引擎，一处配置处处生效。</div>'
    +'<div class="tbai-f"><label>提供商快速填入</label><div class="tbai-chips" id="tbai-presets">'
      +PRESETS.map(function(p){return '<button class="tbai-chip" data-p="'+esc(p.n)+'">'+esc(p.n)+'</button>';}).join('')
    +'</div></div>'
    +'<div class="tbai-f"><label>接口地址（OpenAI 兼容，末尾不带 /chat/completions）</label>'
      +'<input type="text" id="tbai-base" placeholder="https://api.example.com/v1" value="'+esc(c.base)+'"></div>'
    +'<div class="tbai-f"><label>API Key '+(hasAI?'<span class="tbai-ok">已保存（加密存在本机）</span>':'<span class="tbai-mut">未保存</span>')+'</label>'
      +'<input type="password" id="tbai-key" placeholder="'+(hasAI?'已保存，留空则不修改':'sk-...')+'"></div>'
    +'<div class="tbai-f"><label>模型</label><div class="tbai-row">'
      +'<input type="text" id="tbai-model" placeholder="deepseek-chat / glm-4.6 ..." value="'+esc(c.model)+'">'
      +'<button class="tbai-btn" id="tbai-pull">拉取模型</button></div>'
      +'<div id="tbai-modelbox"></div></div>'
    +'<div class="tbai-f"><label class="tbai-sw"><input type="checkbox" id="tbai-search" '+(c.search?'checked':'')+'> AI 分析时联网搜索最新信息（推荐开启，消耗搜索额度）</label></div>'
    +'<div class="tbai-f"><label>最大输出 tokens（思考型模型建议调大到 8000-16000，防止 JSON 被截断）</label>'
      +'<input type="text" id="tbai-tokens" inputmode="numeric" value="'+(c.tokens||6000)+'"></div>'
    +'<div class="tbai-f"><label>搜索引擎</label>'
      +'<select class="tbai-select" id="tbai-sp">'
      +'<option value="tavily"'+(c.searchProvider!=='bocha'?' selected':'')+'>Tavily（用「启动手机预览」脚本打开时可用，走本地代理）</option>'
      +'<option value="bocha"'+(c.searchProvider==='bocha'?' selected':'')+'>博查搜索（浏览器直连，国内中文源质量好）</option>'
      +'</select>'
      +'<div class="tbai-note">实测 Tavily 官方接口不允许浏览器直连（CORS）：用仓库里的「启动手机预览.command」打开本站会自动带本地代理，Tavily 可用；直接双击 HTML 或其他方式打开时请选博查。两家的 Key 都填在下面。</div></div>'
    +'<div class="tbai-f"><label>搜索 Key '+(hasTv?'<span class="tbai-ok">已保存</span>':'<span class="tbai-mut">未保存</span>')+'</label>'
      +'<input type="password" id="tbai-tvkey" placeholder="'+(hasTv?'已保存，留空则不修改':'tvly-... 或博查 sk-...')+'">'
      +'<div class="tbai-note">Tavily：<a class="tbai-a" href="https://app.tavily.com" target="_blank" rel="noopener">app.tavily.com 免费注册</a>（每月 1000 次）· 博查：<a class="tbai-a" href="https://open.bochaai.com" target="_blank" rel="noopener">open.bochaai.com</a>，选一家注册即可。</div></div>'
    +'<div class="tbai-note">Key 只保存在本机浏览器（AES-GCM 加密存 IndexedDB），不进仓库、不进备份、不上传；换浏览器/清缓存需要重填。'
      +(TBKeys.cryptoOK()?'':'（当前为 HTTP 局域网环境，WebCrypto 不可用，降级为本机混淆存储）')+'</div>'
    +'<div id="tbai-err" class="tbai-err"></div>'
    +'<div class="tbai-foot">'
      +'<button class="tbai-btn live" id="tbai-save">保存</button>'
      +(hasAI?'<button class="tbai-btn" id="tbai-clrai">清除 AI Key</button>':'')
      +(hasTv?'<button class="tbai-btn" id="tbai-clrtv">清除搜索 Key</button>':'')
    +'</div></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click',function(e){ if(e.target===ov) close(); });

    ov.querySelector('#tbai-close').onclick=close;
    ov.querySelector('#tbai-presets').addEventListener('click',function(e){
      var b=e.target.closest('[data-p]'); if(!b) return;
      var p=PRESETS.filter(function(x){return x.n===b.dataset.p;})[0]; if(!p) return;
      ov.querySelector('#tbai-base').value=p.base;
      ov.querySelector('#tbai-model').value=p.model;
    });
    ov.querySelector('#tbai-pull').onclick=function(){ pullModels(); };
    ov.querySelector('#tbai-save').onclick=function(){ doSave(); };
    var ca=ov.querySelector('#tbai-clrai'); if(ca) ca.onclick=async function(){ await TBKeys.clear('ai'); _keyAI=''; render(); };
    var ct=ov.querySelector('#tbai-clrtv'); if(ct) ct.onclick=async function(){ await TBKeys.clear('tavily'); _keyTavily=''; render(); };

    /* 拉取模型 → 渲染下拉选择（修复：旧版 alert 弹列表并强制填第一个） */
    function pullModels(){
      var box=ov.querySelector('#tbai-modelbox'), eb=ov.querySelector('#tbai-err');
      eb.textContent='';
      var base=ov.querySelector('#tbai-base').value.trim();
      var key=ov.querySelector('#tbai-key').value.trim()||_keyAI;
      if(!base||!key){ eb.textContent='先填接口地址和 API Key（或已保存过 Key）'; return; }
      var btn=ov.querySelector('#tbai-pull'); btn.disabled=true; btn.textContent='拉取中…';
      TBAgent.listModels(base,key).then(function(ids){
        btn.disabled=false; btn.textContent='拉取模型';
        if(!ids||!ids.length){ eb.textContent='没有拿到模型列表'; return; }
        _models=ids;
        var cur=ov.querySelector('#tbai-model').value.trim();
        box.innerHTML='<select class="tbai-select" id="tbai-msel" style="margin-top:8px">'
          +'<option value="">— 从 '+ids.length+' 个模型中选择 —</option>'
          +ids.map(function(id){ return '<option value="'+esc(id)+'"'+(id===cur?' selected':'')+'>'+esc(id)+'</option>'; }).join('')
          +'</select><div class="tbai-note">共 '+ids.length+' 个模型；也可以在上方输入框手动填写。</div>';
        var sel=box.querySelector('#tbai-msel');
        sel.onchange=function(){ if(sel.value){ ov.querySelector('#tbai-model').value=sel.value; } };
      }).catch(function(e){
        btn.disabled=false; btn.textContent='拉取模型';
        eb.textContent='拉取失败：'+(e.message||e);
      });
    }
    function doSave(){
      var eb=ov.querySelector('#tbai-err'); eb.textContent='';
      c.base=ov.querySelector('#tbai-base').value.trim();
      c.model=ov.querySelector('#tbai-model').value.trim();
      c.search=ov.querySelector('#tbai-search').checked;
      c.searchProvider=ov.querySelector('#tbai-sp').value;
      c.tokens=Math.max(1000,Number(ov.querySelector('#tbai-tokens').value)||6000);
      var k=ov.querySelector('#tbai-key').value.trim();
      var tv=ov.querySelector('#tbai-tvkey').value.trim();
      (async function(){
        try{
          if(k) await TBKeys.save('ai',k);
          if(tv) await TBKeys.save('tavily',tv);
          saveCfg(); await loadKeys(); close();
          document.dispatchEvent(new CustomEvent('tbai:changed'));
        }catch(e){ eb.textContent='保存失败：'+(e.message||e); }
      })();
    }
  }

  /* 启动即预载 Key */
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ loadKeys(); });
  else loadKeys();

  return { cfg:cfg, open:open, close:close, ready:ready, searchReady:searchReady,
           aiKey:aiKey, tavilyKey:tavilyKey, loadKeys:loadKeys, saveCfg:saveCfg };
})();
