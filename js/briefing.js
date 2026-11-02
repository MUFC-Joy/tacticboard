/* =========================================================
   球队看板（问题六）—— AI 赛季看板
   五大联赛 5 区 + 欧冠 + 欧联 + 国家队，共 8 个区域
   每区展示该联赛（含当日排名前四球队）截至用户搜索那天的最新动态
   只有点「更新看板数据」才会 AI 联网搜索；数据持久化 localStorage tb_briefing
   ========================================================= */
"use strict";
window.Briefing=(function(){
  var KEY='tb_briefing';
  var REGIONS=[['epl','英超'],['laliga','西甲'],['seriea','意甲'],['bundes','德甲'],['ligue1','法甲'],
    ['ucl','欧冠'],['uel','欧联'],['nt','国家队']];
  var busy=false, stage='', err='', focusBusy=false, focusStage='';

  function get(){ try{ return JSON.parse(localStorage.getItem(KEY)||'null'); }catch(e){ return null; } }
  function set(d){ try{ localStorage.setItem(KEY,JSON.stringify(d)); }catch(e){} }

  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  async function update(){
    if(busy) return;
    if(!window.TBSettings||!TBSettings.ready()){ err='还没配置 AI：点右上角「⚙ AI 设置」'; render(); return; }
    if(!TBSettings.cfg().search||!TBWebTools.available()){ err='看板需要联网搜索：先在 ⚙ 设置里配好搜索 Key（Tavily/博查）'; render(); return; }
    busy=true; err=''; stage='准备搜索…'; render();
    try{
      var cfg=TBSettings.cfg();
      var today=new Date().toISOString().slice(0,10);
      var sys='你是足球新闻编辑。今天是 '+today+'。任务：为看板收集 8 个区域的最新动态，每个区域 2-4 条，'
        +'覆盖该区域当下最重要的事（五大联赛区域必须包含该联赛当日积分榜前四名球队的最新动态；国家队区写即将到来的比赛/大名单/帅位新闻）。'
        +'每条：{"t":"标题（15字内）","d":"日期（MM-DD 或赛事日）","s":"摘要（40-70字，具体到球队/人名/比分）","src":"来源域名"}。'
        +'信息必须来自联网搜索（尽量用当天或近 3 天的新闻），不要凭记忆编造；查不到的区域给 1 条概要并在 s 里注明。'
        +'只输出 JSON：{"epl":[...],"laliga":[...],"seriea":[...],"bundes":[...],"ligue1":[...],"ucl":[...],"uel":[...],"nt":[...]}。不要 markdown。';
      var res=await TBAgent.run({base:cfg.base,key:TBSettings.aiKey(),model:cfg.model,
        system:sys,messages:[{role:'user',content:'收集截至 '+today+' 的八大区域最新动态。注意用「2026-27赛季」等关键词搜索当季信息。'}],
        tools:['web_search','web_fetch'],maxSteps:12,temp:cfg.temp,maxTokens:Math.max(cfg.tokens,3000),
        onEvent:function(e){
          if(e.type==='tool_call') stage='联网搜索：'+(e.args&&e.args.query?String(e.args.query).slice(0,24):e.name)+'…';
          else if(e.type==='step_start') stage='第 '+e.step+' 步整理…';
          render();
        }});
      var o=TBAgent.extractJSON(res.content);
      if(!o||typeof o!=='object') throw new Error('模型没有返回有效 JSON');
      var data={ts:Date.now(),until:today,regions:{}};
      REGIONS.forEach(function(r){ data.regions[r[0]]=(o[r[0]]||[]).slice(0,4).map(function(x){
        return {t:String(x.t||'').slice(0,30),d:String(x.d||'').slice(0,10),
                s:String(x.s||'').slice(0,120),src:String(x.src||'').slice(0,40)}; }); });
      set(data);
    }catch(e){ err=(e&&e.message)||String(e); }
    finally{ busy=false; stage=''; render(); }
  }

  /* ---------- 定向查询：只查用户想看的一支球队/国家队（问题十六） ---------- */
  async function focus(){
    var team=(document.getElementById('bfTeam')||{}).value||'';
    var region=(document.getElementById('bfRegion')||{}).value||'';
    if(!team.trim()){ err='先填球队名（如：曼城 / 国家队名）'; render(); return; }
    if(focusBusy) return;
    if(!window.TBSettings||!TBSettings.ready()){ err='还没配置 AI：点右上角「⚙ AI 设置」'; render(); return; }
    focusBusy=true; focusStage='联网查询 '+team+' 最新动态…'; err=''; render();
    try{
      var cfg=TBSettings.cfg();
      var today=new Date().toISOString().slice(0,10);
      var sys='你是足球新闻助手。今天是 '+today+'。用 web_search 查询一支球队的最新动态（近 7 天：比赛结果/伤病/转会/换帅/更衣室，2-4 次搜索），'
        +'输出中文简报：3-5 条要点，每条一行（日期+事件+影响），涉及赛季信息必须是 2026-27。末尾一行"来源：域名列表"。不要 markdown 标题，不要工具调用标签出现在正文。';
      var res=await TBAgent.run({base:cfg.base,key:TBSettings.aiKey(),model:cfg.model,
        system:sys,messages:[{role:'user',content:'球队：'+team+(region?('（'+region+'）'):'')}],
        tools:['web_search','web_fetch'],maxSteps:6,temp:cfg.temp,maxTokens:1800,
        onEvent:function(e){ if(e.type==='tool_call') focusStage='联网搜索 '+(e.args&&e.args.query?String(e.args.query).slice(0,20):'')+'…'; render(); }});
      var txt=String(res.content||'').replace(/<tool_call>[\s\S]*?<\/tool_call>/g,'').trim();
      var d=get()||{ts:Date.now(),until:today,regions:{},focus:[]};
      d.focus=(d.focus||[]).filter(function(x){ return x.team!==team; });
      d.focus.unshift({team:team,ts:Date.now(),text:txt});
      d.focus=d.focus.slice(0,8);
      if(window.Notes) Notes.add('brief','看板动态','【'+team+'】最新动态\n'+txt.slice(0,600));
      set(d);
    }catch(e){ err='定向查询失败：'+(e&&e.message); }
    finally{ focusBusy=false; focusStage=''; render(); }
  }

  function render(){
    var el=document.getElementById('briefingBox'); if(!el) return;
    var d=get();
    /* 问题五：模拟器里存在的全部球队（俱乐部+国家队）做输入快选，保证看板能搜到每一支 */
    var teamNames=[];
    try{
      (window.TEAM_TACTICS&&TEAM_TACTICS.clubs||[]).forEach(function(c){ if(teamNames.indexOf(c.z)<0) teamNames.push(c.z); });
      (window.TEAM_TACTICS&&TEAM_TACTICS.nations||[]).forEach(function(c){ if(teamNames.indexOf(c.z)<0) teamNames.push(c.z); });
      if(window.SQUADS_ALL) Object.keys(SQUADS_ALL).forEach(function(t){ if(teamNames.indexOf(t)<0) teamNames.push(t); });
    }catch(e){}
    var h='<div class="card deep"><h3>🛰️ AI 赛季看板<small>截至搜索那天 · 手动更新</small></h3>'
      +'<datalist id="bfTeamList">'+teamNames.map(function(t){ return '<option value="'+esc(t)+'">'; }).join('')+'</datalist>'
      +'<div class="searchrow"><input id="bfTeam" list="bfTeamList" placeholder="只查一支球队：曼城 / 罗马 / 毕尔巴鄂竞技…（共 '+teamNames.length+' 支可快选）">'
      +'<button class="optbtn" style="width:auto;padding:10px 14px;margin:0" id="bfGo">🔍 查这支</button></div>'
      +(teamNames.length?'<div class="hintline">模拟器收录的球队都可以直接查：'+teamNames.slice(0,10).map(esc).join(' · ')+' …（输入框可联想）</div>':'');
    if(d&&d.focus&&d.focus.length){
      h+='<div class="hintline">已保存 '+d.focus.length+' 支球队的查询（默认收起，点开查看；🗑 可单条删除）</div>';
      d.focus.forEach(function(f,i){
        h+='<details style="margin:6px 0"><summary style="cursor:pointer;font-size:12.5px">📌 '+esc(f.team)
          +' · '+new Date(f.ts).toLocaleString()+' <button class="chip r" data-bfdel="'+i+'">🗑</button></summary>'
          +'<div class="p" style="font-size:12.5px">'+esc(f.text).replace(/\n/g,'<br>')+'</div></details>';
      });
    }
    if(!d&&!busy){
      h+='<div class="p">还没有数据。点下方按钮，AI 会联网搜索五大联赛+欧冠+欧联+国家队的最新动态并保存在本机（之后打开都是缓存的，不会自动消耗搜索额度）。</div>';
    }
    if(d){
      h+='<div class="hintline">数据截至 <b>'+esc(d.until)+'</b> · 更新于 '+new Date(d.ts).toLocaleString()
        +'（不会自动更新，点下方按钮手动刷新；这些区域数据是全局看板，单队查询在上方折叠区）</div>';
      var any=REGIONS.some(function(r){ return ((d.regions||{})[r[0]]||[]).length; });
      if(!any){
        h+='<div class="hintline">全局看板还没生成——点下方「生成看板数据」一次性拉取 8 大区域；只想看某支球队用上方「查这支」。</div>';
      }else{
        REGIONS.forEach(function(r){
          var list=(d.regions&&d.regions[r[0]])||[];
          if(!list.length) return;
          h+='<div class="sec" style="margin:10px 0 4px">'+r[1]+'</div>';
          list.forEach(function(x){
            h+='<div class="pairli"><b>'+esc(x.d)+'</b> '+esc(x.t)
              +'<br><span style="color:#cdd7e1">'+esc(x.s)+'</span>'
              +(x.src?' <span class="mut">· '+esc(x.src)+'</span>':'')+'</div>';
          });
        });
      }
    }
    if(focusBusy) h+='<div class="hintline" style="color:#a8d2ff">'+esc(focusStage)+'</div>';
    if(busy) h+='<div class="hintline" style="color:#a8d2ff">'+esc(stage||'AI 联网搜索中…（8 个区域约 30-60 秒）')+'</div>';
    if(err) h+='<div class="hintline" style="color:#ffb4b7">'+esc(err)+'</div>';
    h+='<div style="margin-top:10px"><button class="optbtn" onclick="Briefing.update()"'+(busy?' disabled':'')+'>'
      +(busy?'更新中…':(d?'🔄 更新看板数据（AI 联网搜索）':'🛰️ 生成看板数据（AI 联网搜索）'))+'</button></div></div>';
    el.innerHTML=h;
    var go=document.getElementById('bfGo');
    if(go) go.onclick=function(){ focus(); };
    $$('#briefingBox [data-bfdel]').forEach(function(b){
      b.onclick=function(e){
        e.preventDefault(); e.stopPropagation();
        var dd=get(); if(!dd||!dd.focus) return;
        dd.focus.splice(Number(b.dataset.bfdel),1);
        set(dd); render();
      };
    });
    var ti=document.getElementById('bfTeam');
    if(ti) ti.addEventListener('keydown',function(e){ if(e.key==='Enter') focus(); });
  }

  return { update:update, focus:focus, render:render };
})();
window.renderBriefing=function(){ Briefing.render(); };
