# TacticBoard 大改造实施计划

## 零、关键前提决策（需你知晓）

1. **deepseek-harness 无法整体移植**——它是 Node 专属框架（45.8万行，依赖 node:fs/PTY/Landlock，浏览器跑不了推理）。做法：移植其**架构设计**（turn/step agent 循环、ToolDefinition 工具契约、StreamChunk 流式协议、错误分类），重写约千行的浏览器版 mini-agent（纯 JS、无构建依赖），代码内注明参考来源。
2. **引擎退出 build.py 构建模式**：把 `tacticboard-engine/index.html`（3731行单文件）拆成 shell + css + 多个 js 文件，build.py 移入 `legacy/`。之后所有修改直接编辑文件，避免每次同步 169KB Python 模板。《数据更新手册》补一节说明。
3. **全局 AI（问题五）**：新建共享 `ai/` 目录（keystore/settings/agent-core/tools-web），主站与引擎用 `<script>` 引同一套；配置存 localStorage（同源共享）+ API Key 沿用引擎现有的 AES-GCM 加密 IndexedDB 方案。
4. **搜索引擎（重点二）**：默认 Tavily（web_search + web_extract 两个工具，浏览器直连）；工具层做 provider 抽象，若实测 Tavily CORS 被阻断则降级到智谱 GLM 原生 web_search 工具（会先与你确认）。所有 AI 功能都经 agent 框架联网搜索（重点三），信源纪律按《数据更新手册》。

**未收到提问答复，已采用的默认**：混合名单方案（脚本抓基础名单入库 + 运行时 AI 补全深度数据）；AI 预设保留现有4家+智谱 GLM，默认 DeepSeek；Tavily 为默认搜索源，设置页留申请指引；一次做完，仅 4231 样板处暂停等你确认。

## 一、目标文件结构

```
ai/keystore.js        # API Key 加密存取（AI key + Tavily key）
ai/settings.js        # 全局设置面板（预设/baseURL/模型下拉/搜索key）
ai/agent-core.js      # mini-agent：流式LLM客户端+工具注册+agent循环
ai/tools-web.js       # web_search / web_fetch（Tavily，可换源）
index.html            # 主站：阵型/角色/球队/搜索/模拟器 5 tab + ⚙全局设置
data.js / players.js  # 保留（精选库，引擎与阵型实验室继续用）
terms.js              # 保留作术语解释兜底（词典tab删除，数据不死）
data/squads_pl.js     # 英超20队名单（生成）
data/squads_eu.js     # 欧洲其他12队名单（生成）
tacticboard-engine/   # 拆分后：index.html + engine.css + js/*.js
tools/collect-squads.mjs   # 名单抓取流水线（Node，开发期运行）
tools/mock-server.mjs      # 伪AI/Tavily服务，测试AI链路用
```

## 二、分阶段任务

### P0 基础设施
- 拆引擎单文件 → shell + `engine.css` + `js/eng-data.js`（PLAYERS/TEAMS/FORMS/DNA等）+ `js/eng-app.js`（逻辑）；加载 `../ai/*.js`
- `ai/keystore.js`：从引擎 3414-3454 行提取加密存取，扩展双 key
- `ai/settings.js`：全局设置（提供商预设/OpenAI兼容 baseURL/Key/模型）；**修复模型选择 bug**：`aiFetchModels()` 拉取后渲染下拉 `<select>` 供用户选择（原来是 alert+强制填第一个，引擎 3673-3685 行）
- `ai/agent-core.js`：OpenAI 兼容流式 SSE 客户端、工具 JSON Schema 注册、模型↔工具循环（最多N轮）、AbortController、错误分类（AUTH/QUOTA/RATE_LIMIT/NETWORK）
- `ai/tools-web.js`：Tavily `/search` + `/extract`；**CORS spike 先行验证**
- 主站 tab 重构：删「球员」「词典」；新增「搜索」tab 骨架；header 加 ⚙ 全局设置

### P1 名单数据（问题四）
- `tools/collect-squads.mjs` 按手册信源（俱乐部官网名单/号码公告 > 维基 2026-27 赛季条目 > Transfermarkt 交叉）抓 32 队：英超20 + 西甲(皇马/巴萨/马竞) + 意甲(米兰/国米/那不勒斯) + 德甲(拜仁/多特/莱比锡) + 法甲(巴黎/里尔/摩纳哥)，字段：`n/en别名/num/pos[]/age/nat/foot(查证才写,不确定留空)`
- 我运行脚本→查重/数量/位置覆盖校验→生成两个数据文件入库
- **运行时 AI 补全**：引擎/搜索遇缺 foot/技术特点/伤病史的球员 → agent 联网查证 → 写 `localStorage tb_player_cache` → 后续免搜；各处提供「数据更新」按钮强制刷新

### P2 模拟器改造（问题一、二）
- **删**：训练 tab（DRILL 全部代码）；本地规则分析 `analyze()` + 本地/AI 切换 → 仅 AI
- **HUD 修复（问题二）**：引擎 body 禁止文档级滚动（`height:100dvh;overflow:hidden`，main 为内部滚动容器），HUD `position:fixed` 相对 iframe 视口稳定；主站 `sim-mode` 外层核查 `overflow:hidden`；桌面+移动视口实机滚动验证
- **排阵新增**：战术打法 select（高位压迫/区域压迫/人盯人/低位防守/防守反击/控球推进/长传冲吊/快速通过中场）+ 控球率滑条（每队）→ 入 state/save/AI指纹
- **换人去重（问题一7）**：删排阵页 substrip，分析页「比赛进程」改可展开/收起卡片（含换人）
- **教练模块升级（问题一7-排阵）**：9轴参数（原4轴+进攻宽度/传球节奏/逼抢方向/反击倾向/传中倾向，0-3级）；结构标签扩至16个（+边锋内切/边锋下底/双后腰/拖后组织核心/压迫陷阱/人盯人防守/区域联防/边路套边轮换/二点后插上/球员换位轮换/主攻侧倾）；三阶段独立参数（持球/无球/攻防转换子页签各9轴）；关键位置角色&权限（位置角色设定/后卫带球向前/中场远射/前锋回撤接球）；临场情景策略（领先/落后/换人偏好/体能阈值）；学习辅助栏（风格归类/克制被克制/样板案例，AI生成）；**PROFILE/STYLE_FIX 纳入 save() 持久化**；**【匹配球员】按钮**：agent 读教练战术→球员库匹配→适配分+风险提示
- **分析增强（问题一7-分析）**：①「确认首发」按钮→独立赛前分析（人员×阵型差距、双方可能被针对处，独立指纹缓存）②比赛分析**双视角**（主队视角+客队视角：换人时间/教练意图/攻击对方哪点/对方换人加强了哪里）+ 换人后 AI 建议换谁效果更好 + 教练战术失误丢分评判 ③前中后场+门将全对位/区域对位详析 ④**术语卡**：AI 按本场打法+球员推荐5-8条，点击展开解释（缓存+GLOSSARY兜底）
- **队伍选择（问题四2）**：双方均可在32队任选（默认仍曼联开局），新增五大联赛豪门分组，选队后按 squads 自动排首发

### P3 搜索板块（问题三）
- **球员搜索卡**（独立框）：agent 联网搜（官网/Transfermarkt/FBref/新闻）→ 基础信息/赛季数据/风格标签/风格解读/搭档推荐/模拟器6维属性 + **一期落地**：短板&风险说明、同位置百分位雷达图（SVG）、适配&不适配战术体系；二期三期（专项高阶数据/避雷搭档/对比工具/合同身价）结构预留，AI返回即展示
- 结果缓存 `tb_search_cache`；「保存到球员库」供引擎/阵型实验室用
- **知识搜索卡**（独立框）：带来源的足球知识问答。两框完全分开

### P4 球队看板（问题六）
- 球队 tab 顶部新增「AI赛季看板」：五大联赛5区+欧冠+欧联+国家队8个区域；每区展示该联赛及当日排名前四球队的最新赛季动态
- 仅「更新数据」按钮触发 agent 联网→渲染+持久化 `tb_briefing`（含时间戳），打开读缓存

### P5 阵型实验室（问题七）
- 交互球场：单击位置→填球员名（自动补全：players.js+名单+缓存，可自由输入）；**长按≥500ms（带视觉进度反馈防误触）**→AI热区：该教练体系下覆盖区域/跑动方向/职能→半透明覆盖层（按 球员+教练+阵型 缓存）
- 教练输入框（含你定的 UI 提示文案）；11人+教练填完→「开始分析」→agent 按**六、AI执行逻辑**（输入模式A仅名字/模式B名字+描述；优先级：用户描述>教练真实联网打法>球员能力>阵型底盘兜底；冲突标注「本次按你的要求推演」）→输出实际变体/打法/风险/对位/临场调整
- 阵型知识卡按**二、阵型模板**改造（优势带前提/劣势两类/动态变体/三阶段/克制/关键位置/基准轴/临场调整/代表使用者），遵守**四、写作红线**
- ⏸ **4231 样板先出，等你确认后**批量套框架填其余阵型

### P6 实机验证
- 本地起服务+浏览器自动化：桌面(1280×800)+移动(390×844)逐板块过：tab切换/双搜索框/排阵新控件/教练面板/比分牌固定性滚动验证/长按热区/弹窗/中文输入不被打断
- `tools/mock-server.mjs`（伪 /chat/completions、/models、Tavily）跑通全部 AI 链路 UI；真实端到端需你在设置里填 key 后自测
- 所有页面 console 无报错；更新 README 与《数据更新手册》

## 三、风险与对策
- **Tavily CORS**：P0 先 spike 实测；被阻则切 GLM 原生 web_search 工具并告知你
- **token 消耗**：agent 多轮+联网会慢/费钱——每个 AI 功能带缓存指纹，同条件不重复搜；深度数据落库后免搜
- **惯用脚/属性真实性（重点五）**：一律按手册规则「查证才写，不确定留空」，AI 补全须给出处

## 四、执行顺序
P0 → P1 → P2 → P3 → P4 → P5（4231确认点）→ 批量阵型 → P6。每阶段完成后跑一次浏览器冒烟，报错即修。