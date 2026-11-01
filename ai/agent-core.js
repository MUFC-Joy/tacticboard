/* =========================================================
   TBAgent —— 浏览器版 mini-agent 框架（主站 / 引擎共享）
   架构参考 DeepSeek 官方开源 deepseek-harness（本仓库 deepseek-harness/）：
     · turn/step 两级 agent 循环  —— packages/core/agent-loop/src/agent.ts
     · ToolDefinition 工具契约    —— packages/core/tools/src/contracts.ts
     · StreamChunk 流式协议       —— packages/llm/llm/src/types.ts
     · fetch+SSE 直连 adapter     —— packages/llm/llm-deepseek/src/adapter.ts
   harness 本体依赖 Node（fs/PTY/Landlock），无法进浏览器；本文件按其设计重写。
   OpenAI 兼容 /chat/completions · 流式 · 工具调用循环 · 错误分类
   ========================================================= */
'use strict';
window.TBAgent=(function(){

  /* ---------- 错误分类（参考 harness llm-deepseek/transport.ts 的错误面） ---------- */
  function classifyError(e, status, bodyText){
    if(e && e.name==='AbortError') return {code:'ABORT',msg:'已取消'};
    var net = e instanceof TypeError; /* fetch 网络/CORS 失败通常是 TypeError */
    if(net) return {code:'NETWORK',msg:'网络请求失败（跨域限制或断网）。检查接口地址是否支持浏览器直连（CORS）。'};
    status=status||0;
    if(status===401||status===403) return {code:'AUTH',msg:'API Key 无效或无权限（'+status+'）'};
    if(status===402) return {code:'QUOTA',msg:'账户余额不足（402）'};
    if(status===404) return {code:'NOTFOUND',msg:'接口地址或模型不存在（404），检查 baseURL 是否以 /v1 结尾'};
    if(status===429) return {code:'RATE',msg:'请求过于频繁或额度受限（429），稍后再试'};
    if(status>=500) return {code:'SERVER',msg:'AI 服务端错误（'+status+'）'+(bodyText?('：'+bodyText.slice(0,120)):'')};
    if(status) return {code:'HTTP',msg:'请求失败（'+status+'）'+(bodyText?('：'+bodyText.slice(0,120)):'')};
    return {code:'UNKNOWN',msg:(e&&e.message)||'未知错误'};
  }
  function err(code,msg){ var er=new Error(msg); er.code=code; return er; }

  /* ---------- 文本型工具调用解析 ----------
     部分提供商/模型不支持原生 function calling，会把工具调用当纯文本输出：
       ①<tool_call>{"name":"web_search","arguments":{"query":"..."}}</tool_call>
       ②<tool_call>web_search
          <arg_key>query</arg_key>
          <arg_value>xxx</arg_value>
         </tool_call>
     在流式聚合后统一扫描，转成标准 toolCalls，从正文里剔除。 */
  function parseTextToolCalls(content){
    var calls=[], rest=String(content||'');
    var re=/<tool_call>([\s\S]*?)<\/tool_call>/g, m;
    while((m=re.exec(content))){
      var body=m[1].trim(), name=null, args={};
      var jm=body.match(/\{[\s\S]*\}/);
      if(jm){ try{ var j=JSON.parse(jm[0]); name=j.name||j.function&&j.function.name; args=j.arguments||j.parameters||{}; }catch(e){} }
      if(!name){
        var nm=body.match(/^([a-zA-Z_][\w.]*)\s*(?:\n|$)/);
        if(nm){ name=nm[1];
          var kre=/<arg_key>\s*([^<]+?)\s*<\/arg_key>\s*<arg_value>\s*([\s\S]*?)\s*<\/arg_value>/g;
          var am; while((am=kre.exec(body))){ args[am[1].trim()]=am[2].trim(); }
        }
      }
      if(name){
        calls.push({id:'txt_'+calls.length+'_'+Date.now(),type:'function',function:{name:name,arguments:JSON.stringify(args)}});
        rest=rest.replace(m[0],'');
      }
    }
    return {calls:calls, content:rest};
  }

  /* ---------- 流式对话：一次模型请求，流式回调 + 工具调用聚合 ---------- */
  /* opts: {base,key,model,messages,tools?,temp?,maxTokens?,signal?,onDelta?(text),onReason?(text)} */
  async function chat(opts){
    if(!opts.base) throw err('CONFIG','未配置接口地址（全局设置）');
    if(!opts.model) throw err('CONFIG','未配置模型');
    var url=opts.base.replace(/\/+$/,'')+'/chat/completions';
    var body={model:opts.model,messages:opts.messages,stream:true};
    if(opts.tools&&opts.tools.length){ body.tools=opts.tools; body.tool_choice='auto'; }
    if(opts.temp!=null) body.temperature=opts.temp;
    if(opts.maxTokens) body.max_tokens=opts.maxTokens;

    var res;
    try{
      res=await fetch(url,{method:'POST',signal:opts.signal,
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+opts.key},
        body:JSON.stringify(body)});
    }catch(e){ throw err(classifyError(e).code, classifyError(e).msg); }
    if(!res.ok){
      var t=''; try{ t=await res.text(); }catch(_){}
      var c=classifyError(null,res.status,t);
      throw err(c.code,c.msg);
    }
    if(!res.body) throw err('SERVER','服务端不支持流式响应');

    var reader=res.body.getReader(), dec=new TextDecoder(), buf='';
    var content='', reasoning='', finish='', usage=null;
    var toolCalls=[]; /* {index,id,type:'function',function:{name,arguments}} */
    var sawChunk=false;
    while(true){
      var r=await reader.read();
      if(r.done) break;
      buf+=dec.decode(r.value,{stream:true});
      var lines=buf.split('\n'); buf=lines.pop();
      for(var i=0;i<lines.length;i++){
        var ln=lines[i].trim();
        if(!ln||ln.indexOf('data:')!==0) continue;
        var data=ln.slice(5).trim();
        if(data==='[DONE]') continue;
        var j; try{ j=JSON.parse(data); }catch(e){ continue; }
        sawChunk=true;
        if(j.usage) usage=j.usage;
        var ch=j.choices&&j.choices[0]; if(!ch) continue;
        if(ch.finish_reason) finish=ch.finish_reason;
        var d=ch.delta||{};
        if(d.reasoning_content){ reasoning+=d.reasoning_content; if(opts.onReason) opts.onReason(d.reasoning_content); }
        if(d.content){ content+=d.content; if(opts.onDelta) opts.onDelta(d.content); }
        if(d.tool_calls){
          for(var t=0;t<d.tool_calls.length;t++){
            var tc=d.tool_calls[t], idx=(tc.index!=null?tc.index:toolCalls.length);
            if(!toolCalls[idx]) toolCalls[idx]={id:'',type:'function',function:{name:'',arguments:''},_idx:idx};
            if(tc.id) toolCalls[idx].id=tc.id;
            if(tc.function){
              if(tc.function.name) toolCalls[idx].function.name+=tc.function.name;
              if(tc.function.arguments) toolCalls[idx].function.arguments+=tc.function.arguments;
            }
          }
        }
      }
    }
    if(!sawChunk && !content){ throw err('SERVER','服务端未返回任何内容（检查模型名是否正确）'); }
    toolCalls=toolCalls.filter(Boolean).map(function(tc){ tc._idx=undefined; return tc; });
    /* 文本型工具调用兜底：提供商不支持原生 function calling 时，模型把它们当正文输出 */
    var parsed=parseTextToolCalls(content);
    if(parsed.calls.length){
      toolCalls=toolCalls.concat(parsed.calls);
      content=parsed.content.trim();
    }
    return {content:content,reasoning:reasoning,toolCalls:toolCalls,finish:finish,usage:usage};
  }

  /* ---------- 拉取模型列表（设置页用） ---------- */
  async function listModels(base,key,signal){
    var res;
    try{
      res=await fetch(base.replace(/\/+$/,'')+'/models',{headers:{'Authorization':'Bearer '+key},signal:signal});
    }catch(e){ throw err(classifyError(e).code,classifyError(e).msg); }
    if(!res.ok){
      var t=''; try{ t=await res.text(); }catch(_){}
      var c=classifyError(null,res.status,t); throw err(c.code,c.msg);
    }
    var j=await res.json();
    return (j.data||[]).map(function(m){return m.id;}).filter(Boolean);
  }

  /* ---------- 工具定义（ToolDefinition：harness contracts.ts 的精简版） ---------- */
  /* def: {name, description, parameters(JSON Schema), execute(args)->string|object} */
  var _tools={};
  function defineTool(def){ _tools[def.name]=def; return def; }
  function getTool(name){ return _tools[name]; }
  function toolSchemas(names){
    return (names||Object.keys(_tools)).map(function(n){
      var t=_tools[n];
      return {type:'function',function:{name:t.name,description:t.description,parameters:t.parameters||{type:'object',properties:{}}}};
    }).filter(function(s){return s.function.name;});
  }

  /* ---------- Agent 循环：step = 一次模型请求(+其工具调用)，直到无工具调用 ---------- */
  /* opts: {base,key,model,system,messages?,tools?(名字数组),maxSteps?,temp?,maxTokens?,signal?,
             onEvent?(evt)}  evt: step_start/tool_call/tool_result/step_end/delta/usage */
  async function run(opts){
    var messages=[{role:'system',content:opts.system||''}].concat(opts.messages||[]);
    var names=opts.tools||[], maxSteps=opts.maxSteps||8;
    var schemas=toolSchemas(names);
    var useTools=schemas.length>0, retriedNoTools=false;
    var steps=[];
    for(var step=1;step<=maxSteps;step++){
      if(opts.onEvent) opts.onEvent({type:'step_start',step});
      var resp;
      try{
        resp=await chat({base:opts.base,key:opts.key,model:opts.model,messages:messages,
          tools:useTools?schemas:null,temp:opts.temp,maxTokens:opts.maxTokens,
          signal:opts.signal,
          onDelta:opts.onEvent?function(t){opts.onEvent({type:'delta',text:t});}:null});
      }catch(e){
        if(e.code==='ABORT') throw e;
        /* 提供商不支持 tools 参数（400/404/422 等）：自动降级为纯文本重试一次 */
        if(useTools&&!retriedNoTools&&(e.code==='HTTP'||e.code==='NOTFOUND'||e.code==='SERVER')){
          retriedNoTools=true; useTools=false; step--; 
          if(opts.onEvent) opts.onEvent({type:'tool_result',name:'（该接口不支持工具调用，已降级为直接回答）',ms:0});
          continue;
        }
        throw e;
      }
      if(resp.usage&&opts.onEvent) opts.onEvent({type:'usage',usage:resp.usage});
      if(!resp.toolCalls.length){
        steps.push({step:step,content:resp.content});
        if(opts.onEvent) opts.onEvent({type:'step_end',step,content:resp.content});
        if(resp.finish==='length'){
          var er2=err('TRUNCATED','输出被截断（模型把额度用在思考上了）——到 ⚙ 设置把模型换成非思考型，或调大输出上限');
          er2.raw=resp.content; throw er2;
        }
        return {content:resp.content,steps:steps,usage:resp.usage,finish:resp.finish};
      }
      /* 有工具调用：执行 → 回填 → 下一 step */
      messages.push({role:'assistant',content:resp.content||'',tool_calls:resp.toolCalls});
      for(var i=0;i<resp.toolCalls.length;i++){
        var tc=resp.toolCalls[i], fname=tc.function.name, args={};
        try{ args=JSON.parse(tc.function.arguments||'{}'); }catch(e){}
        var tool=getTool(fname), out, t0=Date.now();
        if(opts.onEvent) opts.onEvent({type:'tool_call',name:fname,args:args});
        try{
          if(!tool) out='错误：未知工具 '+fname;
          else out=await tool.execute(args,{signal:opts.signal});
          out=(typeof out==='string')?out:JSON.stringify(out);
        }catch(e){
          out='工具执行失败：'+((e&&e.message)||e);
        }
        if(opts.onEvent) opts.onEvent({type:'tool_result',name:fname,ms:Date.now()-t0});
        messages.push({role:'tool',tool_call_id:tc.id||('call_'+i),content:String(out).slice(0,24000)});
      }
      steps.push({step:step,tools:resp.toolCalls.map(function(t){return t.function.name;})});
      if(opts.onEvent) opts.onEvent({type:'step_end',step,tools:resp.toolCalls.map(function(t){return t.function.name;})});
    }
    /* 达到 maxSteps 仍想调工具：强制给一次无工具请求收口 */
    var fin=await chat({base:opts.base,key:opts.key,model:opts.model,
      messages:messages.concat([{role:'user',content:'（工具次数已达上限，请直接根据以上信息输出最终回答，不要再调用工具）'}]),
      temp:opts.temp,maxTokens:opts.maxTokens,signal:opts.signal});
    return {content:fin.content,steps:steps,usage:fin.usage,truncated:true};
  }

  /* ---------- 从模型输出中提取 JSON v2 ----------
     容忍：```json 围栏 / <think>思考块 / 前后废话 / 尾逗号 / 全角引号
     策略：剥掉思考块后，从每个 [ 或 { 候选起点做括号配平尝试解析，先成功先得 ---------- */
  function extractJSON(text,wantArray){
    if(!text) return null;
    var s=String(text)
      .replace(/<think>[\s\S]*?<\/think>/gi,'')          /* 思考块 */
      .replace(/<\|?[\w-]*reasoning[\w-]*\|?>/gi,'')      /* 思考标记 */
      .replace(/```(?:json)?/gi,'```');
    function tryParse(str){
      try{ return JSON.parse(str); }catch(e){}
      try{ return JSON.parse(str.replace(/,\s*([\]}])/g,'$1')); }catch(e){}  /* 尾逗号 */
      try{ return JSON.parse(str.replace(/,\s*([\]}])/g,'$1').replace(/\bNaN\b/g,'null')); }catch(e){}
      return undefined;
    }
    var v=tryParse(s.trim()); if(v!==undefined) return v;
    /* 收集候选起点：期望数组时优先 '['，否则两种都试 */
    var starts=[];
    for(var i=0;i<s.length;i++){ var c=s[i]; if(c==='['||c==='{'){ starts.push({i:i,ch:c}); } }
    if(wantArray){ starts.sort(function(a,b){ return (a.ch==='['?0:1)-(b.ch==='['?0:1) || a.i-b.i; }); }
    for(var k=0;k<starts.length&&k<12;k++){
      var st=starts[k], open=st.ch, close=(open==='['?']':'}'), depth=0, inStr=false, esc=false;
      for(var j=st.i;j<s.length;j++){
        var ch=s[j];
        if(inStr){ if(esc){esc=false;} else if(ch==='\\'){esc=true;} else if(ch==='"'){inStr=false;} continue; }
        if(ch==='"') inStr=true;
        else if(ch===open) depth++;
        else if(ch===close){ depth--; if(!depth){ v=tryParse(s.slice(st.i,j+1)); if(v!==undefined) return v; break; } }
      }
    }
    return null;
  }

  return { chat:chat, run:run, listModels:listModels, defineTool:defineTool,
           getTool:getTool, toolSchemas:toolSchemas, extractJSON:extractJSON,
           classifyError:classifyError };
})();
