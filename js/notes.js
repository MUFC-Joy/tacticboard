/* =========================================================
   笔记板块 v2（问题一：重做 UI）
   ─────────────────────────────────────────────────────────
   · 左栏：笔记本清单（分类 / 搜索 / 新建）+ 归档历史（搜索、看板查询自动流入）
   · 右栏：编辑器（标题 + 分类 + 正文），自动保存，字数统计，复制/删除
   · 数据：localStorage tb_notes =
       {cats:[分类名], items:[{id,cat,text,ts,type}], notes:[{id,title,cat,text,ts}], free:{text,ts}}
     旧版只有 free（单条自由笔记）→ 首次打开自动迁移成一条笔记
   ========================================================= */
"use strict";
window.Notes=(function(){
  var KEY='tb_notes';
  var state={cats:[],items:[],notes:[],free:{text:'',ts:0}};
  var ui={cat:'全部', q:'', curId:null};
  var saveTimer=null;

  function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,6); }
  function now(){ return Date.now(); }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function fmt(ts){
    if(!ts) return '—';
    var d=new Date(ts), p=function(n){ return n<10?'0'+n:''+n; };
    var today=new Date();
    var sameDay=d.toDateString()===today.toDateString();
    return (sameDay?'今天 ':(d.getMonth()+1)+'/'+d.getDate()+' ')+p(d.getHours())+':'+p(d.getMinutes());
  }

  function load(){
    try{
      var d=JSON.parse(localStorage.getItem(KEY)||'null');
      if(d){
        state.cats=(d.cats&&d.cats.length?d.cats:['球员搜索','知识搜索','看板动态','我的分析']);
        state.items=d.items||[];
        state.notes=d.notes||[];
        state.free=d.free||{text:'',ts:0};
      }else{
        state.cats=['球员搜索','知识搜索','看板动态','我的分析'];
      }
    }catch(e){
      state.cats=['球员搜索','知识搜索','看板动态','我的分析'];
    }
    /* 旧数据迁移：单条 free 文本 → 笔记 */
    if(!state.notes.length){
      if(state.free && state.free.text){
        state.notes.push({id:uid(),title:'我的手写笔记',cat:'我的分析',text:state.free.text,ts:state.free.ts||now()});
      }else{
        state.notes.push({id:uid(),title:'未命名笔记',cat:'我的分析',text:'',ts:now()});
      }
    }
    if(!state.cats.length) state.cats=['我的分析'];
    ui.curId=state.notes[0]?state.notes[0].id:null;
  }
  function save(){
    try{
      localStorage.setItem(KEY,JSON.stringify({
        cats:state.cats,
        items:state.items.slice(-300),
        notes:state.notes.slice(-200),
        free:state.free
      }));
    }catch(e){}
  }

  /* 其他模块调用：写入归档历史 */
  function add(type,cat,text){
    if(!text) return;
    if(cat && state.cats.indexOf(cat)<0) state.cats.push(cat);
    state.items.push({id:uid(),cat:cat||'我的分析',text:String(text).slice(0,6000),ts:now(),type:type});
    if(state.items.length>300) state.items=state.items.slice(-300);
    save();
  }

  function curNote(){
    for(var i=0;i<state.notes.length;i++){ if(state.notes[i].id===ui.curId) return state.notes[i]; }
    return null;
  }
  function hit(text,q){ return !q || String(text||'').toLowerCase().indexOf(q)>=0; }

  /* ---------- 渲染 ---------- */
  function render(){
    var el=document.getElementById('tab-nt'); if(!el) return;
    var q=ui.q.trim().toLowerCase();
    var note=curNote();

    var catChip=function(name,count){
      return '<button data-ntcat="'+esc(name)+'"'+(ui.cat===name?' class="on"':'')+'>'+esc(name)
        +(count!=null?' <span class="n">'+count+'</span>':'')+'</button>';
    };
    var notes=state.notes.filter(function(n){
      return (ui.cat==='全部'||n.cat===ui.cat) && (hit(n.title,q)||hit(n.text,q));
    }).sort(function(a,b){ return b.ts-a.ts; });
    var items=state.items.filter(function(x){
      return (ui.cat==='全部'||x.cat===ui.cat) && (hit(x.text,q)||hit(x.cat,q));
    }).sort(function(a,b){ return b.ts-a.ts; }).slice(0,80);

    var totalChars=state.notes.reduce(function(a,n){ return a+String(n.text||'').length; },0);

    el.innerHTML=''
    +'<div class="ntwrap">'
    +  '<aside class="ntside">'
    +    '<div class="ntside-h"><b>📒 笔记本</b>'
    +      '<button class="btn primary" data-ntnew="1" style="padding:6px 11px;font-size:12.5px">＋ 新建</button></div>'
    +    '<input class="ntsearch" id="ntQ" placeholder="搜索笔记 / 归档里的内容…" value="'+esc(ui.q)+'">'
    +    '<div class="ntcats">'
    +      catChip('全部', notes.length+items.length)
    +      state.cats.map(function(c){
             var n=state.notes.filter(function(x){return x.cat===c;}).length
                 + state.items.filter(function(x){return x.cat===c;}).length;
             return catChip(c,n);
           }).join('')
    +      '<button class="add" data-ntcatadd="1">＋ 新分类</button>'
    +    '</div>'
    +    '<div class="ntlist" id="ntNotes">'
    +      (notes.length?notes.map(function(n){
             return '<div class="ntitem '+(n.id===ui.curId?'on':'')+'" data-ntopen="'+esc(n.id)+'">'
               +'<div class="top"><span class="t">'+esc(n.title||'未命名笔记')+'</span><span class="d">'+esc(n.cat)+' · '+fmt(n.ts)+'</span></div>'
               +'<div class="p">'+esc(String(n.text||'').replace(/\s+/g,' ').slice(0,60)||'（空白笔记）')+'</div></div>';
           }).join(''):'<div class="hintline" style="padding:10px 4px">这个分类还没有笔记——点「＋ 新建」开始写。</div>')
    +    '</div>'
    +    '<div class="sec" style="margin:16px 0 8px">归档历史 <span style="letter-spacing:0;font-weight:400;color:var(--mut)">（搜索 / 看板结果自动流入）</span></div>'
    +    '<div class="ntlist" id="ntHist">'
    +      (items.length?items.map(function(x){
             return '<div class="ntitem" data-nthist="'+esc(x.id)+'">'
               +'<div class="top"><span class="t">'+esc(x.cat)+'</span><span class="d">'+fmt(x.ts)+'</span></div>'
               +'<div class="p">'+esc(String(x.text||'').replace(/\s+/g,' ').slice(0,72))+'</div></div>';
           }).join(''):'<div class="hintline" style="padding:10px 4px">还没有归档——去「搜索」页查球员/知识，或在球队看板查一支队，结果会自动存到这里。</div>')
    +    '</div>'
    +  '</aside>'
    +  '<section class="ntmain">'
    +    '<div class="ntstat">'
    +      '<div><b>'+state.notes.length+'</b><span>篇笔记</span></div>'
    +      '<div><b>'+state.items.length+'</b><span>条归档</span></div>'
    +      '<div><b>'+totalChars+'</b><span>字</span></div>'
    +      '<div><b>'+state.cats.length+'</b><span>个分类</span></div>'
    +    '</div>'
    +    (note?(
    '<div class="nted">'
    +      '<div class="nted-top">'
    +        '<input class="nted-title" id="ntTitle" placeholder="给这篇笔记起个名字…" value="'+esc(note.title||'')+'">'
    +        '<select class="ntcat" id="ntCat">'+state.cats.map(function(c){
              return '<option'+(note.cat===c?' selected':'')+'>'+esc(c)+'</option>'; }).join('')+'</select>'
    +      '</div>'
    +      '<textarea id="ntText" placeholder="随便写：战术观察、比赛笔记、球探报告、看球时的疑问……\n\n· 自动保存，不用点保存\n· 全部存在这台设备的浏览器里（localStorage），不经过任何服务器\n· 想带走：点右下角「复制」或「导出全部」">'
    +        esc(note.text||'')+'</textarea>'
    +      '<div class="nted-foot">'
    +        '<span class="st" id="ntSaved">已保存</span>'
    +        '<span class="st" id="ntCount">'+String(note.text||'').length+' 字</span>'
    +        '<span class="sp"></span>'
    +        '<button class="btn" id="ntCopy">📋 复制这篇</button>'
    +        '<button class="btn" id="ntExport">⬇️ 导出全部</button>'
    +        '<button class="btn" id="ntDel" style="color:#ffb4b7">🗑 删除</button>'
    +      '</div>'
    +    '</div>'
    ):(
    '<div class="ntempty"><b>还没有打开的笔记</b>点左侧「＋ 新建」写一篇，或从清单里选一篇。</div>'
    ))
    +    '<div class="hintline" style="color:#8fb4d8">💾 存在哪：所有笔记和归档都保存在<b>这台电脑/手机的浏览器本机存储（localStorage）</b>里——不经过任何服务器、不上传。换浏览器、换设备或清除浏览器数据后不会带走，长期保存请用「复制 / 导出全部」。</div>'
    +  '</section>'
    +'</div>';
    bind();
  }

  function bind(){
    var el=document.getElementById('tab-nt'); if(!el) return;
    el.querySelectorAll('[data-ntcat]').forEach(function(b){
      b.onclick=function(){ ui.cat=b.dataset.ntcat; render(); };
    });
    var addc=el.querySelector('[data-ntcatadd]');
    if(addc) addc.onclick=function(){
      var name=prompt('新分类名称：');
      if(name&&name.trim()&&state.cats.indexOf(name.trim())<0){ state.cats.push(name.trim()); save(); render(); }
    };
    el.querySelectorAll('[data-ntopen]').forEach(function(b){
      b.onclick=function(){ ui.curId=b.dataset.ntopen; render(); };
    });
    el.querySelectorAll('[data-nthist]').forEach(function(b){
      b.onclick=function(){
        var x=state.items.filter(function(y){ return y.id===b.dataset.nthist; })[0];
        if(!x) return;
        var n={id:uid(),title:(x.cat||'归档')+' · '+fmt(x.ts),cat:(state.cats.indexOf(x.cat)>=0?x.cat:'我的分析'),text:x.text,ts:now()};
        state.notes.push(n); ui.curId=n.id; save(); render();
      };
    });
    var nb=el.querySelector('[data-ntnew]');
    if(nb) nb.onclick=function(){
      var defCat=state.cats.indexOf('我的分析')>=0?'我的分析':(state.cats[0]||'我的分析');
      var n={id:uid(),title:'未命名笔记',cat:(ui.cat==='全部'?defCat:ui.cat),text:'',ts:now()};
      state.notes.push(n); ui.curId=n.id; save(); render();
      var t=document.getElementById('ntTitle'); if(t){ t.focus(); t.select(); }
    };
    var q=document.getElementById('ntQ');
    if(q){
      var qt=null;
      q.addEventListener('input',function(){
        clearTimeout(qt); var v=q.value;
        qt=setTimeout(function(){ ui.q=v; var pos=q.selectionStart; render(); var nq=document.getElementById('ntQ'); if(nq){ nq.focus(); nq.setSelectionRange(pos,pos); } },220);
      });
    }
    /* 编辑器 */
    var ta=document.getElementById('ntText'), title=document.getElementById('ntTitle'), cat=document.getElementById('ntCat');
    var note=curNote(); if(!note||!ta) return;
    function touch(){ note.ts=now(); }
    function markSaved(){
      var s=document.getElementById('ntSaved');
      if(s){ s.textContent='已保存 · '+new Date().toLocaleTimeString().slice(0,5); s.className='st ok'; }
    }
    function schedule(){
      clearTimeout(saveTimer);
      var s=document.getElementById('ntSaved');
      if(s){ s.textContent='保存中…'; s.className='st'; }
      saveTimer=setTimeout(function(){ touch(); save(); markSaved(); },420);
    }
    ta.addEventListener('input',function(){
      note.text=ta.value; schedule();
      var c=document.getElementById('ntCount'); if(c) c.textContent=ta.value.length+' 字';
      var it=el.querySelector('[data-ntopen="'+ui.curId+'"] .p'); if(it) it.textContent=ta.value.replace(/\s+/g,' ').slice(0,60)||'（空白笔记）';
    });
    if(title) title.addEventListener('input',function(){
      note.title=title.value; schedule();
      var it=el.querySelector('[data-ntopen="'+ui.curId+'"] .t'); if(it) it.textContent=title.value||'未命名笔记';
    });
    if(cat) cat.addEventListener('change',function(){ note.cat=cat.value; touch(); save(); render(); });
    var cp=document.getElementById('ntCopy');
    if(cp) cp.onclick=function(){
      var txt=(note.title?note.title+'\n\n':'')+(note.text||'');
      if(navigator.clipboard) navigator.clipboard.writeText(txt).then(function(){ cp.textContent='已复制 ✓'; setTimeout(function(){ cp.textContent='📋 复制这篇'; },1300); });
      else { ta.select(); document.execCommand('copy'); }
    };
    var ex=document.getElementById('ntExport');
    if(ex) ex.onclick=function(){
      var md=state.notes.map(function(n){
        return '## '+(n.title||'未命名笔记')+'（'+n.cat+' · '+new Date(n.ts).toLocaleString()+'）\n\n'+(n.text||'');
      }).join('\n\n---\n\n');
      if(navigator.clipboard) navigator.clipboard.writeText(md).then(function(){ ex.textContent='已复制全部 ✓'; setTimeout(function(){ ex.textContent='⬇️ 导出全部'; },1500); });
    };
    var del=document.getElementById('ntDel');
    if(del) del.onclick=function(){
      if(!confirm('删除「'+(note.title||'未命名笔记')+'」？删除后不可恢复。')) return;
      state.notes=state.notes.filter(function(n){ return n.id!==note.id; });
      ui.curId=state.notes[0]?state.notes[0].id:null;
      save(); render();
    };
  }

  load();
  return { render:render, add:add };
})();
window.renderNotes=function(){ Notes.render(); };
