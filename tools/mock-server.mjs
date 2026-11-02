#!/usr/bin/env node
/* =========================================================
   mock-server.mjs —— 本地 mock AI + mock 搜索（开发/验收用，无需真实 Key）
   用法：node tools/mock-server.mjs [端口，默认8901]
   然后在「⚙ AI 设置」里填：
     接口地址 http://127.0.0.1:8901/v1 · Key 任意 · 模型 mock-a（或拉取模型选择）
     搜索引擎 Tavily（本地服务器代理已含 mock：tools/server.py 会优先透传真实 API，
     mock 模式请直接在 8899 服务器上测——本脚本自带 /api/tavily mock + 静态托管二合一）
   ========================================================= */
import http from 'node:http';

const PORT = Number(process.argv[2] || 8901);

/* ---------- 按系统提示词分发 canned 响应 ---------- */
function canned(system, user){
  system=system||''; user=user||'';
  if(system.includes('战术教练组分析师')){ /* 问题四：角色适配 AI 分析 */
    return JSON.stringify({
      verdict:'很适配',score:88,
      summary:'mock 结论：他的技术特点与该角色高度吻合，在当前俱乐部体系下已承担近似职责，2026-27 赛季表现稳定。',
      reasons:['位置匹配：主位置与角色位置完全一致（依据：库内位置数据）',
        '技术标签吻合：出球/组织类标签命中角色要求（依据：球员档案）',
        '赛季表现：2026-27 场均传球/对抗数据处于同位置前列（依据：mock 搜索结果）'],
      risks:['被高强度逼抢时出球选择会打折（mock）','对手针对性贴身时需要搭档保护'],
      fitNote:'教练应让他站在角色默认热区，配一名破坏型搭档补防守，定位球由他主罚（mock 建议）。',
      sources:'mocksports.com',conf:'infer'});
  }
  if(system.includes('九大模块')){ /* 问题九：球队 AI 战术看板 */
    return JSON.stringify({
      recentBasis:'mock 依据：近 3 场 2 胜 1 平，主力后腰伤停 2 周，近两场改打双后腰。',
      m1:{base:'基准首发高位压迫实际执行为 4-4-2 中块（mock）',counters:['克制单后腰出球队'],weakTo:['被长传打身后'],conditions:['全员健康时成立'],oppCounter:['对手反制：边路长传转移（mock 场次）']},
      m2:{pool:['6号=第一替补A（登场后压迫强度下降）'],coreOut:{planA:'同位置顶替维持打法',planB:'整体改双后腰'},chain:['核心伤缺→肋部保护降档'],suspension:'停赛短期轮换，与伤病长缺分开处理'},
      m3:{home:'主场压迫强',away:'客场收缩打转换',halves:'60 分钟后固定换翼卫',states:'领先收缩/落后加前锋/平局稳控'},
      m4:{xg:'近5场 xG 1.7 / xGA 0.8（mock）',press:'PPDA 9.5',zones:'边路触球 36%',note:'样本：近5场联赛；来源 mockstats.io'},
      m5:{trend:'状态上行（mock）',matches:[{m:'mock 2-1 胜',form:'4-2-3-1',changes:'60 分钟改 4-4-2 后变好'}],problems:['连续 2 场弧顶漏远射'],positives:['左路套路连续奏效']},
      m6:{attack:'角球后点战术（mock）',defence:'区域联防，后点偶发漏人',coach:'关键时段加码定位球',types:'角球短开；禁区前沿任意球直接射门'},
      m7:{windows:'常规窗口 60-75 分钟',intents:['稳固防守','提速冲身后'],formChanges:['4-2-3-1→4-4-2（mock）'],successRate:'近 10 次 6 次改善'},
      m8:{priorities:'联赛优先，杯赛大幅轮换',fatigue:'70 分钟执行力下降（mock）',injuryRisk:'边翼卫易疲劳性伤病'},
      m9:[{player:'mock 核心',zone:'右肋',duty:'组织+最后一传',varies:'变阵后改边锋内切',ifStopped:'无替代组织者=致命短板（mock）'}],
      sources:'mocksports.com'});
  }
  if(system.includes('新闻编辑')){ /* 球队看板 */
    return JSON.stringify({
      epl:[{t:'榜首大战前瞻',d:'10-31',s:'积分榜前四近 5 轮合计仅负 1 场，本轮直接对话将决定榜首归属。',src:'mocksports.com'},
           {t:'射手榜易主',d:'10-30',s:'前四球队包揽射手榜前三，头名球员 10 轮 11 球。',src:'mockstats.io'}],
      laliga:[{t:'皇马国家德比名单',d:'10-31',s:'主帅公布大名单，主力中卫伤愈回归，贝林厄姆（示例）出任前场自由人。',src:'mock.es'}],
      seriea:[{t:'国米中前场轮换',d:'10-30',s:'周中欧战消耗大，本轮联赛预计轮换两名主力。',src:'mock.it'}],
      bundes:[{t:'拜仁高位防线受检',d:'10-29',s:'对手反击速度联盟第一，本场高位防线面临最大考验。',src:'mock.de'}],
      ligue1:[{t:'巴黎客场轮盘',d:'10-31',s:'客场对阵里尔，主帅确认年轻中场首发。',src:'mock.fr'}],
      ucl:[{t:'欧冠积分榜定局',d:'10-28',s:'联赛阶段前四名提前出线，欧联区争夺白热化。',src:'mock.uefa'}],
      uel:[{t:'欧联淘汰赛抽签',d:'10-27',s:'附加赛对阵出炉，英超球队签运平平。',src:'mock.uefa'}],
      nt:[{t:'国家队大名单公布',d:'10-31',s:'多支国家队公布集训名单，两名伤愈球员回归。',src:'mock.fa'}]
    });
  }
  if(system.includes('球探数据分析师')){ /* 球员搜索 */
    return JSON.stringify({
      name:'测试球员',en:'Mock Player',num:9,pos:['ST'],foot:'右',age:24,club:'测试联（mock）',nat:'英格兰',
      season:'上季 32 场 18 球 6 助攻（mock 数据）',
      styleTag:'冲击型中锋，反越位快',
      styleRead:'出场信任度主力级。技术特点：斜插身后是核心威胁，背身做球一般，第一脚触球在压迫下会打折。主打位置是中锋，偶尔客串右边锋。',
      attrs:{pace:88,pass:62,def:35,air:74,fin:85,sta:78},
      pct:{pace:92,pass:48,def:22,air:70,fin:88,sta:66},
      weak:'压迫下背身处理球是明确短板：面对贴身中卫时回做球质量下降，球队若以他为核心轴打阵地战会被针对。逆足传中精度低。',
      risk:'mock 无伤病记录',
      advanced:[{k:'压迫下传球成功率',v:'78%（mock 示例）'},{k:'对抗成功率',v:'43%（mock 示例）'}],
      versatility:[{pos:'RW',level:'可用'},{pos:'AM',level:'勉强'}],
      partners:{best:['出球型 10 号：给他喂身后球收益最大'],alt:['支点中锋（双塔时他改打二线）'],
        avoid:[{n:'同类型速度型中锋',why:'两人都不做球，阵地战互相堵路'}]},
      fit:{good:['高位防线+快速转换体系','需要纵向冲击的直塞打法'],bad:['需要中锋回撤组织的控球体系','纯传中轰炸队（争顶不是顶级）']},
      tradeoff:'冲刺型打法附带体能分配问题：70 分钟后冲刺次数下滑明显，身后保护弱的前腰组合会放大他的防守缺席。',
      press:'前场高压下第一脚触球成功率中等，回做选择偏保守；给他的传球最好落在身前空当。',
      ceiling:'当前即战力已是联赛前六水准；24 岁仍有传中和背身的长成空间。',
      vsOpp:'对高位防线（造越位团队）数据打折；对拖后中卫组合是猎物。',
      contract:{expire:2029,value:'约 6000 万欧（mock）'},
      sources:['mocksports.com','mockstats.io']});
  }
  if(system.includes('战术讲师')){ /* 术语 */
    return JSON.stringify([
      {term:'肋部',why:'双方都打边路内切，肋部是主战场',explain:'中卫和边后卫之间的纵向缝隙。边锋内切、10 号直塞都走这里；肋部被堵死，进攻就只能起高球。'},
      {term:'二点后插上',why:'本队有二点后插上标签',explain:'第一波射门或传中被解围后，后插上的中场在弧顶捡二点直接远射或再组织。'},
      {term:'压迫陷阱',why:'防守方设陷阱造围抢',explain:'故意放开一条传球线路引对手传进来，再用 2-3 人围死接球人。赌的是断球位置在前场。'}]);
  }
  if(system.includes('热区')||system.includes('场上热区')){ /* 长按热区 */
    return JSON.stringify({
      zones:[{x:70,y:30,r:16,label:'持球内切',kind:'attack'},
             {x:82,y:62,r:14,label:'无球拉边',kind:'hold'},
             {x:60,y:70,r:12,label:'回防落位',kind:'def'}],
      summary:'持球时从右肋部内切找远角，无球时站在右中场线拉宽，丢球后回收到右后卫身前。教练若要求边后卫套边，他会换到肋部当二点接应人。'});
  }
  if(system.includes('临场指挥专家')){
    return JSON.stringify({form:'5-4-1',why:'1 球领先且 63 分钟（mock）：建议收 5-4-1 保翼卫体能，锁死边路传中。',warn:'收缩后要忍住压出去的冲动'});
  }
  if(system.includes('足球资料编辑')){ /* AI 补全两队 */
    const names=[...user.matchAll(/^([^\n(]+) \(/gm)].map(m=>m[1].trim());
    return JSON.stringify(names.slice(0,30).map((en,i)=>({
      en, zh:'测试中文'+(i+1), st:'mock 特点：位置相关一句话', foot:(i%3===0?'左':i%3===1?'右':null)})));
  }
  if(system.includes('足球新闻助手')){ /* 看板定向查询 */
    return '📌 mock 简报：\n1. 本队上轮 2-1 取胜，主力中锋破门（10-30）\n2. 周中欧战轮换两人（10-29）\n3. 边卫伤停缺阵两周（10-28）\n来源：mocksports.com';
  }
  if(system.includes('足球教练教育者')){ /* 角色 AI 深挖 */
    return '①现代演化：mock 趋势描述。\n②最佳实践：mock 球员A / mock 球员B。\n③训练要点：mock 三条。\n来源：mock.com';
  }
  if(system.includes('战术推演师')){ /* 阵型实验室（模板对象） */
    return JSON.stringify({
      conflict:true,
      summary:'一句话摘要（mock）：纸面 4-2-3-1，核心思路中位压迫+两翼爆破；上限是反击打穿高位队，死穴是弧顶空当。',
      站位:'开球按 4-2-3-1 落位：双后腰居中，10 号自由（mock）。比赛中持球变 3-2-5，无球 4-4-2。',
      优势:[{x:'持球推进流畅',前提:'双后腰至少一人出球型（mock：用户选了出球型）'},
            {x:'肋部渗透强',前提:'10 号有摆脱能力'},
            {x:'边路有人',前提:'边后卫敢套边'}],
      劣势:{结构:['单前腰体系中路厚度依赖双后腰'],能力依赖:['边锋不回防→两边成走廊（用户选的边锋防守参与一般）']},
      变体:[{n:'3-2-5 持球形态',when:'持球高位、对手低位',how:'一名后腰回撤成三中卫，边后卫压上',why:'前场 5v4'},
            {n:'4-4-2 无球形态',when:'无球收缩',how:'10 号与中锋成第一道线，边锋回撤',why:'压缩中路'},
            {n:'4-3-3 过渡形态（转换阶段）',when:'断球瞬间',how:'双后腰之一前顶，10 号拉边成左前腰',why:'最快通过中场'}],
      三阶段:{持球:'3-2-5，边后卫给宽度',无球:'4-4-2 中位块',转换:'6 秒反抢，断球直找 10 号',高位逼抢:'短时手段：对手出球慢时围抢｜失败则身后大片空当（mock）'},
      定位球:{进攻:'恩佐主罚 45° 斜长传，哈兰德/萨利巴争顶（mock）',防守:'区域+盯人混合，风险是边路后点漏人（mock）'},
      伤病:[{缺谁:'安德森',连锁:'失去唯一扫荡点，肋部保护崩（mock）'},{缺谁:'帕尔默',连锁:'前场逼抢少一人（mock）'}],
      克制:{克制:['单后腰体系'],被克制:['三中场+双边翼卫绞杀'],拆解:['贴死 10 号接球点']},
      关键位置:[{pos:'DM',need:'出球+站位（用户选的巴莱巴适配）',avoid:'两个都爱前插'},
                {pos:'ST',need:'背身或冲击（用户选的谢什科适配）',avoid:'纯站桩'}],
      陷阱:'边后卫压上+边锋不回防，肋部身后容易被直塞打穿（mock）',
      传中应对:'对手下底传中时：近门柱由边后卫卡第一点，后腰回收小禁区弧，中卫清二点（mock）',
      体能:'边后卫 70 分钟体能告急，建议 65-75 分钟换人（mock）',
      中锋风险:'若换成纯终结型中锋，背身串联下降，10 号被迫回撤拿球，肋部渗透减弱（mock）',
      基准轴:{press:3,control:3,direct:2,low:1,width:2,tempo:2,pressdir:2,counter:2,cross:2},
      临场:{领先:'60 分钟换防守型中场收 4-5-1',落后:'边后卫全压上',僵持:'边锋与 10 号换位'}});
  }
  if(system.includes('战术分析师')){ /* 引擎比赛/赛前分析 */
    if(user.includes('赛前分析')||user.includes('比赛还没开始')){
      return JSON.stringify([
        {sec:'主队视角',area:'中场人数差',level:1,text:'主队双后腰对客队三中场是 2v3，出球阶段前腰必须回撤接应（mock）。',plain:'中场比人少一个，前腰要回来帮忙。',why:'首发结构',conf:'infer'},
        {sec:'客队视角',area:'打主队右路',level:1,text:'主队右后卫助攻习惯靠上，客队左边锋 1v1 成功率联盟前五，主攻方向明确。',plain:'对面右后卫爱上去，我们就打他身后。',why:'人员对位',conf:'infer'},
        {sec:'关键对位',area:'门将与制空',level:0,text:'门将出击范围中等，客队中锋争顶强，传中二点要小心。',plain:'别给对面太多传中。',why:'球员属性',conf:'infer'},
        {sec:'赛前结论',area:'胜负手',level:1,text:'本场胜负手在客队左路的 1v1 结果：主队若能双边包夹则局势逆转。',plain:'左边锋能不能防住，谁赢谁占先。',why:'综合',conf:'infer'},
        {sec:'换人预案',area:'双方替补牌',level:1,text:'主队关键替补：速度型边锋（60-70 分钟追分用）；客队：破坏型中场（领先时锁胜局）。换人后边路对位会重组，风险是新边后卫对位旧边锋的适应期（mock）。',plain:'两边手里都有一张变节奏的牌。',why:'替补名单',conf:'infer'},
        {sec:'红黄牌风险',area:'犯规热点',level:1,text:'主队后腰盯防客队 10 号的对位高频犯规；客队右后卫追防套边边锋易吃牌（mock）。',plain:'两个位置小心上半场吃牌。',why:'对位数据',conf:'infer'},
        {sec:'节奏开关',area:'节奏归属',level:0,text:'客队能主动掌控节奏（控球+压迫成熟）；主队若门将出球被逼抢打乱，比赛会落入客队舒服的慢节奏（mock）。',plain:'客队掌握节奏主动权。',why:'综合对比',conf:'infer'}]);
    }
    return JSON.stringify([
      {sec:'主队视角',area:'压迫对准出球中卫',level:1,text:'客队右中卫是出球发起点，主队应让中锋斜向压迫封其内侧线路（mock）。',plain:'逼对面右中卫，别让他舒服出球。',why:'对位数据',conf:'infer'},
      {sec:'主队视角',area:'我们要打对方身后',level:0,text:'客队防线平均站位很高，本队速度型前锋的斜插是第一得分手段。',plain:'对面线压得高，我们多打身后。',why:'阵型数据',conf:'infer'},
      {sec:'客队视角',area:'防守重点主队左路',level:1,text:'主队左路过载打法明确，客队右路需提前安排保护人。',plain:'他们左路最凶，我们右边要加人。',why:'战术数据',conf:'infer'},
      {sec:'全场对位',area:'门将',level:0,text:'双方门将出球能力相近，本场比的是出击判断（mock）。',plain:'门将这一环打平。',why:'属性对比',conf:'infer'},
      {sec:'全场对位',area:'后卫线',level:1,text:'主队右中卫转身慢，客队中锋会刻意拉到左肋接球制造错位。',plain:'我们右中卫转身慢，对面中锋会专门挑他。',why:'对位分析',conf:'infer'},
      {sec:'全场对位',area:'中场',level:1,text:'中场人数 2v3，主队 10 号回撤深度决定出球质量。',plain:'中场少一人，前腰回多深多关键。',why:'结构',conf:'infer'},
      {sec:'全场对位',area:'锋线',level:0,text:'两队锋线都以速度见长，谁的第一脚传球更快谁占先。',plain:'两边都快，看谁转移快。',why:'属性',conf:'infer'},
      {sec:'换人点评',area:'60分钟换人点评',level:1,text:'主队 60 分钟换下边锋上中场：意图是保中场人数，代价是反击宽度下降；若目标是守住平局合理，想赢则应换速度型前锋（mock）。',plain:'换人想加人手，但想赢的话该换个快的。',why:'事件流',conf:'infer'}]);
  }
  return '（mock 回复）收到。';
}

function json(res,code,obj){
  const b=JSON.stringify(obj);
  res.writeHead(code,{'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'*'});
  res.end(b);
}

const server=http.createServer(async (req,res)=>{
  const url=new URL(req.url,'http://x');
  if(req.method==='OPTIONS'){ res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'*'}); return res.end(); }

  /* mock Tavily */
  if(url.pathname.startsWith('/api/tavily/')){
    let body=''; for await (const c of req) body+=c;
    return json(res,200,{results:[
      {title:'Mock 搜索结果 1',url:'https://example.com/mock1',content:'（mock）这是模拟搜索结果，用于验收链路：包含关键伤停与状态信息。'},
      {title:'Mock 搜索结果 2',url:'https://example.com/mock2',content:'（mock）第二条模拟结果：转会与阵容新闻摘要。'}],
      answer:'（mock）概要：关键球员均可出场。'});
  }

  /* mock OpenAI 兼容 */
  if(url.pathname.endsWith('/models')){
    return json(res,200,{data:[{id:'mock-a'},{id:'mock-b'},{id:'mock-c'}]});
  }
  if(url.pathname.endsWith('/chat/completions')){
    let body=''; for await (const c of req) body+=c;
    let j={}; try{ j=JSON.parse(body); }catch(e){}
    const msgs=j.messages||[];
    const sys=(msgs.find(m=>m.role==='system')||{}).content||'';
    const user=(msgs.filter(m=>m.role==='user').pop()||{}).content||'';
    const text=canned(sys,user);

    res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache',
      'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*'});
    /* 模拟一次工具调用循环：当 prompt 需要搜索时先发 tool_calls（仅第一步、user 消息末次出现时） */
    const wantsTools=(j.tools||[]).length>0 && !msgs.some(m=>m.role==='tool');
    function chunk(obj){ res.write('data: '+JSON.stringify(obj)+'\n\n'); }
    if(wantsTools && (sys.includes('新闻编辑')||sys.includes('战术分析师'))){
      chunk({choices:[{delta:{role:'assistant',tool_calls:[{index:0,id:'call_1',type:'function',
        function:{name:'web_search',arguments:JSON.stringify({query:'mock 最新伤停新闻'})}}]}}]});
      return res.end();
    }
    /* 流式吐字 */
    const parts=text.match(/[\s\S]{1,60}/g)||[];
    for(const p of parts){
      chunk({choices:[{delta:{content:p}}]});
      await new Promise(r=>setTimeout(r,12));
    }
    chunk({choices:[{delta:{},finish_reason:'stop'}]});
    chunk({choices:[{delta:{}}]});
    return res.end('data: [DONE]\n\n');
  }
  res.writeHead(404); res.end('not found');
});
server.listen(PORT,()=>console.log('mock AI server on http://127.0.0.1:'+PORT+'  (base: /v1)'));
