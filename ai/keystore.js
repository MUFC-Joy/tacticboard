/* =========================================================
   TBKeys —— API Key 本机加密存取（主站 / 引擎共享模块）
   存 IndexedDB 'tb_ai_db'（与旧引擎同一个库，旧 'apikey' 记录自动兼容为 AI key）
   WebCrypto 可用：AES-GCM-256；不可用（HTTP 局域网）：随机盐 XOR 弱混淆，明确降级
   Key 不进仓库、不进备份、不上传
   ========================================================= */
'use strict';
window.TBKeys=(function(){
  var _db=null, _cache={};

  function db(){ return new Promise(function(res,rej){
    if(_db) return res(_db);
    if(!window.indexedDB) return rej(new Error('本浏览器不支持 IndexedDB'));
    var r=indexedDB.open('tb_ai_db',1);
    r.onupgradeneeded=function(){ var d=r.result; if(!d.objectStoreNames.contains('kv')) d.createObjectStore('kv'); };
    r.onsuccess=function(){ _db=r.result; res(_db); };
    r.onerror=function(){ rej(r.error||new Error('IndexedDB 打开失败')); };
  });}
  function get(k){ return db().then(function(d){ return new Promise(function(res,rej){
    var q=d.transaction('kv','readonly').objectStore('kv').get(k);
    q.onsuccess=function(){ res(q.result); }; q.onerror=function(){ rej(q.error); };});});}
  function put(k,v){ return db().then(function(d){ return new Promise(function(res,rej){
    var tx=d.transaction('kv','readwrite'); tx.objectStore('kv').put(v,k);
    tx.oncomplete=function(){ res(true); }; tx.onerror=function(){ rej(tx.error); };});});}

  function cryptoOK(){ return !!(window.crypto && crypto.subtle && crypto.subtle.importKey); }
  function b64(buf){ var b=''; var u=new Uint8Array(buf); for(var i=0;i<u.length;i++) b+=String.fromCharCode(u[i]); return btoa(b); }
  function unb64(s){ var b=atob(s), u=new Uint8Array(b.length); for(var i=0;i<b.length;i++) u[i]=b.charCodeAt(i); return u; }

  async function aesKeyObj(){
    var k=await get('aes');
    if(k) return k;
    k=await crypto.subtle.generateKey({name:'AES-GCM',length:256}, false, ['encrypt','decrypt']);
    await put('aes', k);
    return k;
  }

  /* name: 'ai' | 'tavily' */
  async function save(name, plain){
    plain=String(plain||'').trim();
    if(cryptoOK()){
      var k=await aesKeyObj();
      var iv=crypto.getRandomValues(new Uint8Array(12));
      var ct=await crypto.subtle.encrypt({name:'AES-GCM',iv:iv}, k, new TextEncoder().encode(plain));
      await put('key:'+name,{mode:'aes',iv:b64(iv),ct:b64(ct)});
    }else{
      var salt=await get('salt');
      if(!salt){ salt=b64(crypto.getRandomValues(new Uint8Array(16))); await put('salt',salt); }
      var s=unb64(salt), u=new TextEncoder().encode(plain), out=new Uint8Array(u.length);
      for(var i=0;i<u.length;i++) out[i]=u[i]^s[i%s.length];
      await put('key:'+name,{mode:'weak',ct:b64(out)});
    }
    _cache[name]=plain;
    return true;
  }
  async function load(name){
    if(_cache[name]) return _cache[name];
    try{
      var rec=await get('key:'+name);
      /* 兼容旧引擎单 key 记录 */
      if(!rec && name==='ai') rec=await get('apikey');
      if(!rec) return '';
      if(rec.mode==='aes' && cryptoOK()){
        var k=await aesKeyObj();
        var pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:unb64(rec.iv)}, k, unb64(rec.ct));
        _cache[name]=new TextDecoder().decode(pt);
        return _cache[name];
      }
      if(rec.mode==='weak'){
        var salt=await get('salt'); if(!salt) return '';
        var s=unb64(salt), d=unb64(rec.ct), o=new Uint8Array(d.length);
        for(var i=0;i<d.length;i++) o[i]=d[i]^s[i%s.length];
        _cache[name]=new TextDecoder().decode(o);
        return _cache[name];
      }
    }catch(e){}
    return '';
  }
  async function clear(name){
    try{ await put('key:'+name,null); }catch(e){}
    if(name==='ai'){ try{ await put('apikey',null); }catch(e){} } /* 顺带清旧记录 */
    delete _cache[name];
  }
  function cached(name){ return _cache[name]||''; }

  return { save:save, load:load, clear:clear, cached:cached, cryptoOK:cryptoOK };
})();
