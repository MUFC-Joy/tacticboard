/* =========================================================
   TBWebTools —— Agent 联网工具（重点二/三：为 agent 准备搜索引擎）
   提供商二选一（全局设置）：
     · tavily —— 用户指定。浏览器直连会被 CORS 拦截（2026-10 实测），
                 自动探测本地代理：先试同源 /api/tavily/*（tools/server.py 提供），
                 无代理再试直连（托管在支持 CORS 的环境时可用）
     · bocha  —— 博查搜索，浏览器直连可达（2026-10 实测 401=可达），国内中文源质量好
   注册进 TBAgent，供所有 AI 功能（模拟器分析/球员搜索/球队看板/阵型实验室）共用
   ========================================================= */
'use strict';
window.TBWebTools=(function(){
  var TAVILY='https://api.tavily.com', BOCHA='https://api.bochaai.com';
  var _proxyOK=null; /* null=未探测 */

  function provider(){ return (window.TBSettings&&TBSettings.cfg().searchProvider)||'tavily'; }
  function key(){
    var s=window.TBSettings; if(!s) return '';
    return s.cfg().searchProvider==='bocha' ? s.tavilyKey() : s.tavilyKey();
  }
  function available(){ return !!key(); }
  function clip(s,n){ s=String(s==null?'':s); return s.length>n? s.slice(0,n)+'…' : s; }

  /* ---------- Tavily：代理优先，直连兜底 ---------- */
  async function tavilyPost(path,body,signal){
    var k=key(); if(!k) throw new Error('未配置搜索 Key（全局设置 → 搜索引擎）');
    var headers={'Content-Type':'application/json','Authorization':'Bearer '+k};
    /* 1) 同源代理（tools/server.py 的 /api/tavily/*） */
    if(_proxyOK!==false){
      try{
        var pr=await fetch('/api/tavily'+path,{method:'POST',headers:headers,body:JSON.stringify(body),signal:signal});
        if(_proxyOK===null) _proxyOK=pr.ok||pr.status===401||pr.status===432||pr.status===433;
        if(_proxyOK) return handleTavilyRes(pr);
      }catch(e){ if(_proxyOK===null) _proxyOK=false; if(e.name==='AbortError') throw e; }
    }
    /* 2) 直连（CORS 允许的环境） */
    var res=await fetch(TAVILY+path,{method:'POST',headers:headers,body:JSON.stringify(body),signal:signal});
    return handleTavilyRes(res);
  }
  async function handleTavilyRes(res){
    if(!res.ok){
      var t=''; try{ t=await res.text(); }catch(_){}
      if(res.status===401) throw new Error('搜索 Key 无效（401）');
      if(res.status===432||res.status===433) throw new Error('搜索额度用尽或被限制，稍后再试');
      throw new Error('搜索请求失败('+res.status+')'+(t?'：'+t.slice(0,100):''));
    }
    return res.json();
  }

  /* ---------- 博查：直连 ---------- */
  async function bochaPost(body,signal){
    var k=key(); if(!k) throw new Error('未配置搜索 Key（全局设置 → 搜索引擎）');
    var res=await fetch(BOCHA+'/v1/web-search',{method:'POST',signal:signal,
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+k},
      body:JSON.stringify(body)});
    if(!res.ok){
      var t=''; try{ t=await res.text(); }catch(_){}
      if(res.status===401) throw new Error('博查 Key 无效（401）');
      throw new Error('博查请求失败('+res.status+')'+(t?'：'+t.slice(0,100):''));
    }
    return res.json();
  }

  /* ---------- 统一搜索入口（供工具与看板等直接调用） ---------- */
  async function search(query,opt){
    opt=opt||{}; var signal=opt.signal;
    if(provider()==='bocha'){
      var j=await bochaPost({query:query,count:opt.max||6,summary:true,freshness:opt.freshness||'noLimit'},signal);
      var vals=(j.data&&j.data.webPages&&j.data.webPages.value)||[];
      var out=[];
      vals.forEach(function(r,i){ out.push({title:r.name,url:r.url,snippet:r.summary||r.snippet||''}); });
      return out;
    }
    var tj=await tavilyPost('/search',{
      query:query, search_depth:(opt.depth==='advanced'?'advanced':'basic'),
      max_results:opt.max||6, include_answer:false
    },signal);
    return (tj.results||[]).map(function(r){ return {title:r.title,url:r.url,snippet:r.content||''}; });
  }

  /* ---------- 工具1：联网搜索 ---------- */
  var web_search={
    name:'web_search',
    description:'联网搜索最新信息（足球新闻、官方名单、转会、伤病、数据统计等）。返回带标题和链接的搜索结果摘要。需要准确的实时信息时必须先用这个工具。',
    parameters:{type:'object',properties:{
      query:{type:'string',description:'搜索关键词，可用英文提高命中率'},
      depth:{type:'string',enum:['basic','advanced'],description:'advanced 更全但更慢'},
      max:{type:'number',description:'结果条数，默认6'}
    },required:['query']},
    execute:async function(args,ctx){
      var rs=await search(String(args.query||''),{depth:args.depth,max:args.max||6,signal:ctx&&ctx.signal});
      if(!rs.length) return '没有搜索到相关内容，换个关键词再试。';
      return rs.map(function(r,i){
        return '['+(i+1)+'] '+r.title+'\n链接: '+r.url+'\n'+clip(r.snippet,1100);
      }).join('\n\n');
    }
  };

  /* ---------- 工具2：抓取网页正文 ---------- */
  var web_fetch={
    name:'web_fetch',
    description:'抓取一个网页的正文内容（官方名单页、新闻全文、数据页）。搜索摘要不够时要看全文就用这个。',
    parameters:{type:'object',properties:{
      url:{type:'string',description:'完整网页链接，以 http(s):// 开头'}
    },required:['url']},
    execute:async function(args,ctx){
      var url=String(args.url||'');
      if(!/^https?:\/\//.test(url)) return '错误：url 必须以 http(s):// 开头';
      if(provider()==='bocha'){
        /* 博查无 extract 接口：多次搜索补足，提示模型换信源 */
        return '博查提供商不支持网页正文抓取。请改用 web_search 搜索该页面的具体内容，或引用其他来源。';
      }
      var j=await tavilyPost('/extract',{urls:[url]},ctx&&ctx.signal);
      var r=(j.results||[])[0];
      if(!r||!r.raw_content) return '抓取失败：该页面没有可提取的正文（可能是反爬或需要登录），换别的信源。';
      return '【页面】'+url+'\n\n'+clip(r.raw_content,14000);
    }
  };

  /* ---------- 并行预搜索（提速核心）：多条 query 同时发，结果拼成文本直接喂给模型，
     省掉模型逐条发工具调用的串行等待 ---------- */
  async function prefetch(queries,opt){
    opt=opt||{};
    var list=(queries||[]).filter(Boolean);
    if(!list.length||!available()) return '';
    try{
      var rs=await Promise.all(list.map(function(q,i){
        return search(q,{max:opt.max||4,depth:'basic',signal:opt.signal})
          .then(function(r){ return {q:q,r:r}; })
          .catch(function(){ return {q:q,r:[]}; });
      }));
      var out=[];
      rs.forEach(function(x,i){
        out.push('【预搜'+(i+1)+'】'+x.q);
        if(!x.r.length){ out.push('（无结果）'); return; }
        x.r.slice(0,4).forEach(function(r,j){
          out.push('- '+r.title+'（'+r.url+'）：'+clip(r.snippet,700));
        });
      });
      return out.join('\n');
    }catch(e){ return ''; }
  }

  function register(){
    if(window.TBAgent){ TBAgent.defineTool(web_search); TBAgent.defineTool(web_fetch); }
  }
  register();

  return { available:available, search:search, prefetch:prefetch, web_search:web_search, web_fetch:web_fetch, register:register, provider:provider };
})();
