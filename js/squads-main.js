/* 主站名单桥：32 队 ESPN 名单 + 中文名映射（供搜索筛选/角色检测用） */
"use strict";
window.SQUADS_ALL=(function(){
  var all={};
  function m(src){ if(src) for(var k in src){ if(src[k]&&src[k].players) all[k]=src[k]; } }
  m(window.SQUADS_PL); m(window.SQUADS_EU);
  return all;
})();
window.expandPos=window.expandPos||function(pos){
  var map={GK:['GK'],DF:['CB','LB','RB','LWB','RWB'],MF:['DM','CM','AM'],FW:['ST','LW','RW']};
  return map[pos]||[pos];
};
