/* =========================================================
   squads-bridge.js —— 五大联赛 40 队名单桥接（引擎用）
   把 data/squads_pl.js + squads_eu.js 的 ESPN 名单并入引擎的球员池：
     · expandPos()：粗位置 GK/DF/MF/FW → 细位置（引擎选人/评分用）
     · POOL 增补 ESPN 球员（精选库已有的以精选库为准，eng-app.js 里合并）
   提供 squadsOf(team) / allEngineTeams() 给选队 UI 用
   ========================================================= */
'use strict';
window.SQUADS_ALL=(function(){
  var all={};
  function merge(src){
    if(!src) return;
    for(var k in src){ if(src[k]&&src[k].players) all[k]=src[k]; }
  }
  merge(window.SQUADS_PL); merge(window.SQUADS_EU);
  return all;
})();

/* 粗位置展开：DF/MF/FW → 引擎的细位置集合（保守展开，宁全勿缺） */
window.expandPos=function(pos){
  var map={GK:['GK'],
    DF:['CB','LB','RB','LWB','RWB'],
    MF:['DM','CM','AM'],
    FW:['ST','LW','RW']};
  return map[pos]||[pos];
};

/* 引擎统一取某队名单：SQUADS 优先（40 队全），回退 undefined 由 eng-app 用 PLAYERS 处理 */
window.squadsOf=function(team){
  return (window.SQUADS_ALL&&SQUADS_ALL[team])||null;
};
window.allEngineTeams=function(){
  var out=[];
  if(window.SQUADS_ALL){
    for(var k in SQUADS_ALL){ out.push({name:k,league:SQUADS_ALL[k].league,coach:SQUADS_ALL[k].coach}); }
  }
  return out;
};

/* ---------- 球员补全缓存回写（搜索板块「保存到球员库」/ AI 补全的深度数据） ---------- */
(function(){
  var c={}; try{ c=JSON.parse(localStorage.getItem('tb_player_cache')||'{}'); }catch(e){}
  var entries=Object.keys(c).map(function(k){ return c[k]; }).filter(Boolean);
  if(!entries.length||!window.SQUADS_ALL) return;
  function match(p){
    var mine=[p.n].concat(p.en||[]).map(function(s){ return String(s||'').toLowerCase(); });
    for(var i=0;i<entries.length;i++){
      var e=entries[i];
      var names=[e.n].concat(e.en||[]).map(function(s){ return String(s||'').toLowerCase(); });
      for(var j=0;j<names.length;j++){ if(names[j]&&mine.indexOf(names[j])>=0) return e; }
    }
    return null;
  }
  var n=0;
  Object.keys(SQUADS_ALL).forEach(function(t){
    (SQUADS_ALL[t].players||[]).forEach(function(p){
      var e=match(p); if(!e) return;
      if(e.foot&&!p.foot) p.foot=e.foot;
      if(e.st) p.st=e.st;
      if(e.d) p.d=e.d;
      if(e.tags&&e.tags.length) p.tags=e.tags;
      if(e.a) p.a=e.a;
      if(e.status) p.status=e.status;
      if(e.age&&!p.age) p.age=e.age;
      p._enriched=true; n++;
    });
  });
  try{ console.log('[squads] 球员库缓存回写 '+n+' 人'); }catch(e){}
})();
