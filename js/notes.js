/* =========================================================
   笔记板块（问题十三）—— 搜索历史（分类归档）+ 无限笔记区
   数据：localStorage tb_notes = {cats:[分类名], items:[{id,cat,text,ts,type}], free:{text,ts}}
   AI 搜索/看板查询完成时自动流入历史；用户可自由改名分类、新建分类、删除
   笔记区：纯文本无限写，自动保存，可多条
   ========================================================= */
"use strict";
window.Notes=(function(){
  var KEY='tb_notes';
  var state={cats:['球员搜索','知识搜索','看板动态','我的分析'],items:[],free:{text:'',ts:0}};
  var curCat='全部', curNote=null;

  function load(){
    try{
      var d=JSON.parse(localStorage.getItem(KEY)||'null');
      if(d){ state.cats=d.cats||state.cats; state.items=d.items||[]; state.free=d.free||state.free; }
    }catch(e){}
  }
  function save(){
    try{ localStorage.setItem(KEY,JSON.stringify({cats:state.cats,items:state.items.slice(-300),free:state.free})); }catch(e){}
  }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  /* 供其他模块调用：添加历史条目 */
  function add(type,cat,text){
    if(!text) return;
    state.items.push({id:Date.now()+Math.random().toString(36).slice(2,6),cat:cat,text:String(text).slice(0,4000),ts:Date.now(),type:type});
    if(state.items.length>300) state.items=state.items.slice(-300);
    save();
  }

  /* ---------- 渲染 ---------- */
  function render(){
    var el=document.getElementById('tab-nt'); if(!el) return;
    var cats=['全部'].concat(state.cats);
    var items=state.items.filter(function(x){ return curCat==='全部'||x.cat===curCat; })
      .slice().sort(function(a,b){ return b.ts-a.ts; });
    el.innerHTML=
      '<div class="card"><h3>📒 笔记本<small>搜索历史 + 自由笔记（都在本机保存）</small></h3>'
      +'<div class="pillrow">'+cats.map(function(c){
          return '<button data-nc="'+esc(c)+'"'+(curCat===c?' class="on"':'')+'>'+esc(c)+'</button>';
        }).join('')
        +'<button data-ncnew="+ 新分类">+ 新分类</button></div>'
      +'<div id="ntList">'
      +(items.length?items.map(function(x){
          return '<div class="mini" style="margin-bottom:6px"><h4 style="font-size:13px;display:flex;justify-content:space-between;gap:8px">'
            +'<span>'+esc(x.cat)+' · '+new Date(x.ts).toLocaleString()+'</span>'
            +'<span><button class="chip" data-ntcopy="'+x.id+'">复制</button> <button class="chip r" data-ntdel="'+x.id+'">删除</button></span></h4>'
            +'<div class="p" style="white-space:pre-wrap;font-size:12.5px;max-height:120px;overflow:auto">'+esc(x.text)+'</div></div>';
        }).join(''):'<div class="hintline">这个分类还没有记录——在「搜索」页搜球员/知识、或在球队看板查询后会自动归档到这里。</div>')
      +'</div></div>'
      +'<div class="card"><h3>✍️ 自由笔记<small>无限写 · 自动保存</small></h3>'
      +'<div class="hintline" style="color:#a8d2ff">💾 存在哪：所有笔记和历史都保存在<b>这台电脑/手机的浏览器本机存储（localStorage）</b>里——不经过任何服务器、不上传。换浏览器、换设备或清除浏览器数据后不会带走，需要长期保存请用条目上的「复制」按钮导出。</div>'
      +'<div class="row"><select class="tbai-select" id="ntFreeCat" style="max-width:200px">'
      +state.cats.map(function(c){ return '<option'+(curNote===c?' selected':'')+'>'+esc(c)+'</option>'; }).join('')
      +'</select><span class="mut">当前笔记归类（可自建分类）</span></div>'
      +'<textarea id="ntFree" style="width:100%;min-height:260px;background:var(--card2);border:1px solid var(--line);border-radius:10px;color:var(--txt);padding:12px;font-size:14px;font-family:inherit;line-height:1.6" placeholder="随便写：战术观察、比赛笔记、球探报告……自动保存">'+esc(state.free.text||'')+'</textarea>'
      +'<div class="hintline" id="ntSaved">'+(state.free.ts?('上次保存 '+new Date(state.free.ts).toLocaleTimeString()):'尚未保存')+'</div>'
      +'<button class="optbtn" id="ntClear" style="text-align:center">清空笔记</button></div>';
    bind();
  }
  function bind(){
    var el=document.getElementById('tab-nt');
    el.querySelectorAll('[data-nc]').forEach(function(b){
      b.onclick=function(){ curCat=b.dataset.nc; render(); };
    });
    var nc=document.querySelector('[data-ncnew]');
    if(nc) nc.onclick=function(){
      var name=prompt('新分类名称：');
      if(name&&name.trim()&&state.cats.indexOf(name.trim())<0){ state.cats.push(name.trim()); save(); render(); }
    };
    el.querySelectorAll('[data-ntdel]').forEach(function(b){
      b.onclick=function(){
        state.items=state.items.filter(function(x){ return x.id!==b.dataset.ntdel; });
        save(); render();
      };
    });
    el.querySelectorAll('[data-ntcopy]').forEach(function(b){
      b.onclick=function(){
        var x=state.items.find(function(y){ return y.id===b.dataset.ntcopy; });
        if(x&&navigator.clipboard) navigator.clipboard.writeText(x.text).then(function(){ b.textContent='已复制'; setTimeout(function(){ b.textContent='复制'; },1200); });
      };
    });
    var ta=document.getElementById('ntFree');
    var timer=null;
    ta.addEventListener('input',function(){
      clearTimeout(timer);
      timer=setTimeout(function(){
        state.free={text:ta.value,ts:Date.now()}; save();
        document.getElementById('ntSaved').textContent='已保存 '+new Date().toLocaleTimeString();
      },400);
    });
    var sel=document.getElementById('ntFreeCat');
    sel.onchange=function(){ curNote=sel.value; };
    document.getElementById('ntClear').onclick=function(){
      if(confirm('清空自由笔记？')){ state.free={text:'',ts:Date.now()}; save(); render(); }
    };
  }

  load();
  return { render:render, add:add };
})();
window.renderNotes=function(){ Notes.render(); };
