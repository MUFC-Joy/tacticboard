#!/usr/bin/env node
/* =========================================================
   collect-squads.mjs —— 32 队一线队名单抓取流水线（P1 · ESPN core API 版）
   信源：ESPN core API（本网络下唯一可达且结构化的全名单源；维基/transfermarkt/fbref
        在 2026-10 的本网络下分别被 DNS 污染 / WAF / Cloudflare 拦截）
   合并：根目录 players.js + 引擎 eng-data.js 的精选条目（中文名/惯用脚/技术特点等）
   输出：data/squads_pl.js（英超20）· data/squads_eu.js（欧洲其他12队）
   运行：node tools/collect-squads.mjs
   纪律（《数据更新手册》）：foot 空值=未查证不落库；位置 GK/DF/MF/FW 粗粒度，
   引擎 expandPos() 展开；深度字段运行时由 AI 联网补全并缓存。
   ========================================================= */
import fs from 'node:fs';
import path from 'node:path';
import { ZH_MAP } from './zh-map.mjs';
import { OVERRIDES } from './club-overrides.mjs';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const OUT_DIR = path.join(ROOT, 'data');
const API = 'https://sports.core.api.espn.com/v2/sports/soccer/leagues';
const SEASON = 2026;

/* 32 队：中文名 → ESPN 队名匹配（小写化后比对）+ 所属联赛 */
const CLUBS = [
  ['曼联','manchester united','eng.1','英超'], ['曼城','manchester city','eng.1','英超'],
  ['阿森纳','arsenal','eng.1','英超'], ['利物浦','liverpool','eng.1','英超'],
  ['热刺','tottenham','eng.1','英超'], ['切尔西','chelsea','eng.1','英超'],
  ['阿斯顿维拉','aston villa','eng.1','英超'], ['纽卡斯尔','newcastle','eng.1','英超'],
  ['诺丁汉森林','nottingham forest','eng.1','英超'], ['埃弗顿','everton','eng.1','英超'],
  ['水晶宫','crystal palace','eng.1','英超'], ['布莱顿','brighton','eng.1','英超'],
  ['布伦特福德','brentford','eng.1','英超'], ['伯恩茅斯','bournemouth','eng.1','英超'],
  ['富勒姆','fulham','eng.1','英超'], ['利兹联','leeds','eng.1','英超'],
  ['桑德兰','sunderland','eng.1','英超'], ['考文垂','coventry','eng.1','英超'],
  ['伊普斯维奇','ipswich','eng.1','英超'], ['赫尔城','hull city','eng.1','英超'],
  ['皇马','real madrid','esp.1','西甲'], ['巴萨','barcelona','esp.1','西甲'], ['马竞','atlético madrid','esp.1','西甲'],
  ['毕尔巴鄂竞技','athletic bilbao','esp.1','西甲'], ['比利亚雷亚尔','villarreal','esp.1','西甲'],
  ['米兰','ac milan','ita.1','意甲'], ['国米','inter milan','ita.1','意甲'], ['那不勒斯','napoli','ita.1','意甲'], ['尤文','juventus','ita.1','意甲'], ['罗马','roma','ita.1','意甲'],
  ['拜仁','bayern munich','ger.1','德甲'], ['多特蒙德','borussia dortmund','ger.1','德甲'], ['RB莱比锡','rb leipzig','ger.1','德甲'],
  ['勒沃库森','bayer leverkusen','ger.1','德甲'], ['弗赖堡','freiburg','ger.1','德甲'],
  ['巴黎','paris saint-germain','fra.1','法甲'], ['里尔','lille','fra.1','法甲'], ['摩纳哥','monaco','fra.1','法甲'],
  ['里昂','lyon','fra.1','法甲'], ['马赛','marseille','fra.1','法甲'],
];
const POS_MAP={Goalkeeper:'GK',Defender:'DF',Midfielder:'MF',Forward:'FW'};
const NAT_MAP={England:'英格兰',Scotland:'苏格兰',Wales:'威尔士',Ireland:'爱尔兰','Northern Ireland':'北爱尔兰',
  Brazil:'巴西',Argentina:'阿根廷',France:'法国',Germany:'德国',Spain:'西班牙',Italy:'意大利',Portugal:'葡萄牙',
  Netherlands:'荷兰',Belgium:'比利时',Croatia:'克罗地亚',Serbia:'塞尔维亚',Denmark:'丹麦',Sweden:'瑞典',Norway:'挪威',
  Poland:'波兰',Czechia:'捷克','Czech Republic':'捷克',Switzerland:'瑞士',Austria:'奥地利',Hungary:'匈牙利',
  Ukraine:'乌克兰',Russia:'俄罗斯',Turkey:'土耳其',Greece:'希腊',Romania:'罗马尼亚',Slovakia:'斯洛伐克',Slovenia:'斯洛文尼亚',
  Morocco:'摩洛哥',Senegal:'塞内加尔',Nigeria:'尼日利亚',Ghana:'加纳',Egypt:'埃及',Algeria:'阿尔及利亚',
  Cameroon:'喀麦隆','Ivory Coast':'科特迪瓦',"Côte d'Ivoire":'科特迪瓦',Mali:'马里','DR Congo':'刚果金',
  Japan:'日本','South Korea':'韩国',Korea:'韩国',Australia:'澳大利亚',Iran:'伊朗','Saudi Arabia':'沙特',
  USA:'美国','United States':'美国',Canada:'加拿大',Mexico:'墨西哥',Uruguay:'乌拉圭',Colombia:'哥伦比亚',
  Chile:'智利',Peru:'秘鲁',Ecuador:'厄瓜多尔',Paraguay:'巴拉圭',Venezuela:'委内瑞拉',
  Israel:'以色列',Georgia:'格鲁吉亚',Kosovo:'科索沃','North Macedonia':'北马其顿',Bosnia:'波黑',
  'Bosnia and Herzegovina':'波黑',Albania:'阿尔巴尼亚',Bulgaria:'保加利亚',Finland:'芬兰',Iceland:'冰岛',
  Jamaica:'牙买加','New Zealand':'新西兰','South Africa':'南非',Tunisia:'突尼斯',Guinea:'几内亚',Gabon:'加蓬'};

/* ---------- 并发池 ---------- */
async function pool(items, n, fn){
  const ret=new Array(items.length); let i=0;
  await Promise.all(Array.from({length:Math.min(n,items.length)},async()=>{
    while(i<items.length){ const k=i++; try{ ret[k]=await fn(items[k],k); }catch(e){ ret[k]=null; console.error('  !',e.message); } }
  }));
  return ret;
}
async function jget(url,tries=3){
  for(let a=1;a<=tries;a++){
    try{
      const r=await fetch(url,{headers:{'User-Agent':'TacticBoardSquadCollector/1.0'}});
      if(r.ok) return await r.json();
      if(r.status===404) throw new Error('404 '+url.slice(-60));
      console.error(`  [retry ${a}] HTTP ${r.status} ${url.slice(-50)}`);
    }catch(e){ if(a===tries) throw e; console.error(`  [retry ${a}] ${e.message.slice(0,60)}`); }
    await new Promise(s=>setTimeout(s,600*a));
  }
}
function deaccent(s){ return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.'’]/g,'').toLowerCase().trim(); }
const EXPAND={GK:['GK'],DF:['CB','LB','RB','LWB','RWB'],MF:['DM','CM','AM'],FW:['ST','LW','RW']};
const expandPos=x=>EXPAND[x]||[x];
function nameMatch(wikiName, aliases){
  const w=deaccent(wikiName), wt=w.split(/\s+/);
  for(const a of aliases){
    const al=deaccent(a); if(!al) continue;
    if(al===w) return true;
    const alt=al.split(/\s+/);
    if(alt.length===1 && wt.length>=2 && wt[wt.length-1]===alt[0]) return true;
    if(alt.length>=2 && wt.length>=2 && wt[0]===alt[0] && wt[wt.length-1]===alt[alt.length-1]) return true;
    /* 倒序（ESPN 是正常名序，精选库个别是姓+名） */
    if(alt.length>=2 && wt.length>=2 && wt[wt.length-1]===alt[0] && wt[0]===alt[alt.length-1]) return true;
  }
  return false;
}

/* 中文名查找：只做全名精确匹配（问题十一：劳塔罗·马丁内斯误标——同名不同人的姓匹配会张冠李戴） */
function zhLookup(name){
  const w=deaccent(name);
  for(const [k,v] of Object.entries(ZH_MAP)){
    if(!v||!v[0]) continue;
    if(deaccent(k)===w) return v;
  }
  return null;
}

/* ---------- 载入精选库 ---------- */
function loadPlayersFrom(file){
  const code=fs.readFileSync(file,'utf8');
  /* 先剥块注释（注释里的引号会破坏括号配平），字符串内含 /* 的概率可忽略 */
  const clean0=code.replace(/\/\*[\s\S]*?\*\//g,'');
  const start=clean0.indexOf('const PLAYERS');
  const arrStart=clean0.indexOf('[',start);
  let depth=0,i=arrStart,inStr=false,esc=false,q='',end=-1;
  for(;i<clean0.length;i++){
    const ch=clean0[i];
    if(inStr){ if(esc){esc=false;} else if(ch==='\\'){esc=true;} else if(ch===q){inStr=false;} continue; }
    if(ch==='"'||ch==="'"){inStr=true;q=ch;}
    else if(ch==='['){depth++;}
    else if(ch===']'){depth--; if(!depth){end=i;break;}}
  }
  const lit=clean0.slice(arrStart,end+1);
  return eval('('+lit+')');
}
const CLUB_ALIAS={森林:'诺丁汉森林',维拉:'阿斯顿维拉',纽卡:'纽卡斯尔',纽卡斯尔联:'纽卡斯尔',
  马德里竞技:'马竞',皇家马德里:'皇马',巴塞罗那:'巴萨',拜仁慕尼黑:'拜仁','AC米兰':'米兰','国际米兰':'国米',
  '巴黎圣日耳曼':'巴黎',托特纳姆热刺:'热刺',曼彻斯特城:'曼城',曼彻斯特联:'曼联',布莱顿霍夫:'布莱顿'};
const normClub=c=>CLUB_ALIAS[c]||c;
const byClub={};
const curatedGlobal=new Map(); /* 全局索引：名字别名 → 精选库俱乐部（ESPN 与精选库冲突时精选库赢） */
let curCount=0;
for(const f of ['players.js','tacticboard-engine/js/eng-data.js']){
  try{
    for(const p of loadPlayersFrom(path.join(ROOT,f))){
      if(!p||!p.club) continue;
      const c=normClub(p.club);
      [p.n].concat(p.en||[]).forEach(a=>{
        if(a&&String(a).length>1) curatedGlobal.set(deaccent(String(a)),c);
      });
      if(CLUBS.some(x=>x[0]===c)){ (byClub[c]=byClub[c]||[]).push(p); curCount++; }
    }
  }catch(e){ console.error('载入失败',f,e.message); }
}
/* 应用修正清单（forceClub / status）到精选库
   匹配：全名 deaccent 相等，或拉丁姓氏 token 相等（精选库别名多为姓氏） */
function overrideKeys(n){
  const d=deaccent(String(n||'')); const out=[d];
  const t=d.split(/\s+/); if(t.length>1 && /^[a-z]+$/.test(t[t.length-1])) out.push(t[t.length-1]);
  return out;
}
const FORCE={}; for(const [k,v] of Object.entries(OVERRIDES.forceClub)) overrideKeys(k).forEach(x=>FORCE[x]=v);
const STATUS={}; for(const [k,v] of Object.entries(OVERRIDES.status)) overrideKeys(k).forEach(x=>STATUS[x]=v);
function findForce(p){ const keys=[p.n].concat(p.en||[]); for(const a of keys){ for(const k of overrideKeys(a)){ if(FORCE[k]!==undefined) return FORCE[k]; } } return undefined; }
function findStatus(p){ const keys=[p.n].concat(p.en||[]); for(const a of keys){ for(const k of overrideKeys(a)){ if(STATUS[k]!==undefined) return STATUS[k]; } } return undefined; }
for(const c of Object.keys(byClub)){
  byClub[c]=byClub[c].filter(p=>{
    const fk=findForce(p);
    const sk=findStatus(p);
    if(sk) p.status=sk;
    if(fk!==undefined){
      if(fk===null){ p.club='已离开（2026 修正清单）'; return false; }
      if(fk!==c){
        p.club=fk;
        if(CLUBS.some(x=>x[0]===fk)){ (byClub[fk]=byClub[fk]||[]).push(p); return false; }
        return false;
      }
    }
    return true;
  });
}
console.error('修正清单已应用');
console.error('精选库可用条目：',curCount);

/* ---------- 主流程 ---------- */
const squads={};
const report=[];
const moved=[];

/* 先按联赛抓一次全部队对象，避免每队重复抓 */
const teamCache={}; /* leagueSlug -> {espnNameLower: teamRef} */
async function discoverTeams(){
  const slugs=[...new Set(CLUBS.map(c=>c[2]))];
  await pool(slugs,5,async slug=>{
    const tl=await jget(`${API}/${slug}/teams?limit=60`);
    const teams=await pool(tl.items||[],8, it=>jget(it.$ref.replace(/^http:/,'https:')));
    teamCache[slug]={};
    for(const t of teams.filter(Boolean)){
      teamCache[slug][deaccent(t.displayName||'')]=t;
    }
  });
  for(const s of Object.keys(teamCache)) console.error(`联赛 ${s}: ${Object.keys(teamCache[s]).length} 队`);
}

await discoverTeams();

const TEAM_ALIAS={ /* ESPN 实际队名与简称对不上时的别名表：zh -> espn名 */
  '热刺':'tottenham hotspur','纽卡斯尔':'newcastle united','布莱顿':'brighton & hove albion',
  '伯恩茅斯':'bournemouth','利兹联':'leeds united','考文垂':'coventry city','伊普斯维奇':'ipswich town',
  '国米':'internazionale','摩纳哥':'as monaco','马竞':'atletico madrid','巴黎':'paris saint-germain',
  '拜仁':'bayern munich','RB莱比锡':'rb leipzig','多特蒙德':'borussia dortmund','皇马':'real madrid',
  '巴萨':'barcelona','米兰':'ac milan','那不勒斯':'napoli','罗马':'as roma',
  '毕尔巴鄂竞技':'athletic club','比利亚雷亚尔':'villarreal cf','勒沃库森':'bayer 04 leverkusen',
  '弗赖堡':'sc freiburg','里昂':'olympique lyonnais','马赛':'olympique de marseille'
};

for(const [zh,espnName,leagueSlug,leagueZh] of CLUBS){
  const t0=Date.now();
  const cache=teamCache[leagueSlug]||{};
  /* 匹配：deaccent 相等 → 互相包含 → 别名表 */
  let key=Object.keys(cache).find(k=>k===deaccent(espnName));
  if(!key&&deaccent(espnName).length>=5) key=Object.keys(cache).find(k=>k.includes(deaccent(espnName))||deaccent(espnName).includes(k));
  if(!key&&TEAM_ALIAS[zh]){
    const al=deaccent(TEAM_ALIAS[zh]);
    key=Object.keys(cache).find(k=>k===al||k.includes(al)||al.includes(k));
  }
  const team=key?cache[key]:null;
  if(!team){ report.push(`${zh} 未匹配到 ESPN 队（${espnName}）`); console.log(`${zh} ✗ 未匹配`); continue; }

  /* 2) 球员列表 */
  const al=await jget(`${team.$ref.replace(/^http:/,'https:').split('?')[0]}/athletes?limit=100`);
  const refs=(al.items||[]).map(x=>x.$ref);
  const details=await pool(refs,8, u=>jget(u.replace(/^http:/,'https:')));

  /* 3) 组装：ESPN 基础数据 + 中文名映射（tools/zh-map.mjs，人工核实） */
  const roster=[]; let movedN=0;
  for(const p of details.filter(Boolean)){
    const pos=(p.position&&(POS_MAP[p.position.displayName]||p.position.displayName))||'';
    const nat=(p.citizenship&&(NAT_MAP[p.citizenship]||p.citizenship))||'';
    const fullName=p.fullName||'';
    const zh=zhLookup(fullName);
    /* 冲突策略（2026-11-01）：ESPN 现役名单定「俱乐部归属」，精选库只出「深度数据」。
       若此人在精选库但 club 不同：位置兼容 → 把精选条目搬到本队（转会已发生）；
       位置不兼容 → 同名不同人，保留 ESPN 条目不合并。 */
    const fEspn=(function(){ const fake={n:fullName,en:[]}; return findForce(fake); })();
    if(fEspn!==undefined && fEspn!==zh){ continue; }  /* 已确认转会到别队/离队：本队 ESPN 条目丢弃 */
    const gcName=curatedGlobal.get(deaccent(fullName));
    const movedCurated=(gcName&&gcName!==zh)?byClub[gcName]?.find(c=>{
      const aliases=[c.n].concat(c.en||[]).map(a=>deaccent(String(a)));
      if(!aliases.includes(deaccent(fullName))) return false;
      const cpos=[];
      (c.pos||[]).forEach(x=>expandPos(x).forEach(y=>cpos.push(y)));
      const epos=POS_MAP[p.position&&p.position.displayName]||'';
      const eposArr=epos?expandPos(epos):[];
      return cpos.some(x=>eposArr.includes(x));
    }):null;
    if(movedCurated){
      const idx=byClub[gcName].indexOf(movedCurated);
      byClub[gcName].splice(idx,1);
      movedCurated.club=zh;
      moved.push(movedCurated.n+' '+gcName+'→'+zh); movedN++;
    }
    roster.push({n:zh?zh[0]:fullName, en:[fullName], num:p.jersey?Number(p.jersey):null,
                 pos:pos?[pos]:[], nat, age:p.age||null,
                 foot:(zh&&['左','右','双'].includes(zh[1]))?zh[1]:null,
                 h:p.displayHeight||'', w:p.displayWeight||'', _src:zh?'espn-zh':'espn'});
  }
  /* 4) 精选条目合并（中文名/foot/tags/属性等），匹配上则替换 ESPN 条目 */
  const cur=byClub[zh]||[];
  const used=new Set();
  for(const p of cur){
    const hit=roster.find(r=>!used.has(r)&&nameMatch(r.n,(p.en||[]).concat([p.n])));
    const e={...p};
    if(hit){
      used.add(hit);
      e.num=e.num!=null?e.num:hit.num;
      e.age=e.age||hit.age;
      e.nat=e.nat||hit.nat;
      e.h=e.h||hit.h; e.w=e.w||hit.w;
      if((e.pos||[]).length<=1 && hit.pos.length>1) e.pos=hit.pos;
      e._src='curated';
      roster.splice(roster.indexOf(hit),1);
    }else{ e._src='curated'; e._rosterMiss=true; }
    roster.push(e);
  }
  /* 姓级去重：同队内 deaccent 姓相同的条目只留一个（curated > espn-zh > espn） */
  const seenLast=new Map();
  const deduped=[];
  for(const pl of roster){
    const en=(pl.en&&pl.en[0])||pl.n;
    const last=deaccent(en).split(/\s+/).pop();
    const prev=seenLast.get(last);
    const rank=x=>x._src==='curated'?0:(x._src==='espn-zh'?1:2);
    if(prev&&rank(pl)>=rank(prev)){
      /* 重复：吸收号码后丢弃 */
      if(pl.num!=null&&prev.num==null) prev.num=pl.num;
      continue;
    }
    if(prev){ /* 新的优先级更高：替换 */
      const di=deduped.indexOf(prev); if(di>=0) deduped.splice(di,1);
    }
    seenLast.set(last,pl); deduped.push(pl);
  }
  deduped.sort((a,b)=>(a.num||99)-(b.num||99));
  squads[zh]={league:leagueZh,coach:'',updated:new Date().toISOString().slice(0,10),players:deduped};
  report.push(`${zh}\tESPN${details.filter(Boolean).length}人\t搬运${movedN}\t精选${cur.length}人\t去重后${deduped.length}人\t${((Date.now()-t0)/1000).toFixed(1)}s`);
  console.log(`${zh} ✓ ESPN${details.filter(Boolean).length} 搬运${movedN} 精选${cur.length} → 去重后${deduped.length}人`);
}

/* ---------- 输出 ---------- */
function emit(file,key,filter){
  const obj={};
  for(const [zh,,lg] of CLUBS.filter(filter)) if(squads[zh]) obj[zh]=squads[zh];
  const body=JSON.stringify(obj,null,1).replace(/"([a-zA-Z_]+)":/g,'$1:');
  fs.writeFileSync(file,
`/* 自动生成：node tools/collect-squads.mjs（勿手改，重跑脚本即可更新）
   数据来源：ESPN core API ${SEASON} 赛季（名单/号码/位置粗粒度/年龄/国籍/身高体重）
   + 精选库合并（中文名/惯用脚/技术特点/属性），_rosterMiss=精选库有但ESPN名单未匹配
   foot 空值=未查证；运行时 AI 联网补全后缓存到 localStorage
   生成时间：${new Date().toISOString()}
*/
"use strict";
window.${key}=${body};
`,'utf8');
  console.log('写出',file,Object.keys(obj).length,'队');
}
emit(path.join(OUT_DIR,'squads_pl.js'),'SQUADS_PL',c=>c[3]==='英超');
emit(path.join(OUT_DIR,'squads_eu.js'),'SQUADS_EU',c=>c[3]!=='英超');
fs.writeFileSync(path.join(OUT_DIR,'squads_report.txt'),report.join('\n'),'utf8');
console.log('\n完成。');
