# 看球战术台 TacticBoard

一个为足球战术小白设计的**互动战术学习台**，纯前端单页应用，无构建依赖。v4 起**全部 AI 功能共用一套全局配置并联网搜索**（参考 DeepSeek 官方 deepseek-harness 的 agent 架构，在浏览器里重写的 mini-agent 框架）。

> 数据截至 2026 年 10 月（2026-27 赛季）· 32 队一线队名单 1025 人（ESPN 结构化数据 + 精选库合并）

## 功能模块

| 模块 | 内容 |
|---|---|
| 📐 阵型 | **阵型实验室**：交互球场点选位置填球员（32 队全名单自动补全）；只填教练名=AI 联网参考其真实打法，写了自己的想法=你的描述优先级最高；「开始分析」按 优先级链路（用户口述 > 教练真实打法 > 球员能力 > 阵型底盘）推演实际变体/风险/对位/临场；**长按 0.5 秒**（防误触）看该球员在这个教练体系下的覆盖热区/跑动方向/职能；4231 按新模板做了知识卡样板（优势带前提/劣势两类/动态变体/三阶段/克制/基准轴/临场调整/代表使用者） |
| 🎭 角色 | 6/8/10 号位、伪9、翼卫、边后腰、肋部8号等角色详解，每条配可点击的现役球员例子 |
| 🏟️ 球队 | **AI 赛季看板**（五大联赛+欧冠+欧联+国家队 8 区，截至搜索当天的动态，手动「更新数据」才联网，结果持久化）+ 原有豪门 DNA / 英超 20 队侦察报告 / 国家队 |
| 🔍 搜索 | 两个完全独立的搜索框：**球员搜索**（AI 联网核实生成档案：基础信息/风格/同位置百分位雷达图/短板风险/搭档分级/战术适配/模拟器属性，可一键存入球员库）和**足球知识搜索**（带来源）。查不到就标「未查证」，不编造 |
| 🎮 模拟器 | 内嵌「对位引擎 v5」：**双方均可从 32 队任选**（默认曼联开局）、战术打法（高位压迫/人盯人等 8 种）、控球率预期、**教练卡 9 轴+16 结构标签+三阶段独立参数+位置权限+临场策略+匹配球员+AI 体系速览**、AI 比赛分析（**主队/客队双视角+全场对位+换人点评**）、确认首发后独立**赛前分析**、AI 本场术语推荐、复盘 |

> 原「球员」「词典」板块已按需求删除（死数据），由 AI 搜索板块替代；词典数据保留在 `terms.js` 作为术语解释兜底。

## 使用方法

### 最省事：双击 `启动手机预览.command`

会在局域网起服务（**自带 Tavily 搜索代理**），自动打印电脑地址和手机地址（同一 Wi-Fi 下手机直接打开），并打开电脑浏览器。

> ⚠️ Tavily 官方接口不允许浏览器直连（CORS，2026-10 实测）。**用本脚本打开时 Tavily 可用**（走本地代理）；用其他方式打开请到 ⚙ 设置把搜索引擎切成「博查」（浏览器直连可达）。

### 首次配置（一次性）

点右上角 **⚙ AI 设置**（主站和模拟器共用这一套，一处配置处处生效）：

1. 接口地址 + API Key + 模型（可「拉取模型」后从**下拉框选择**；内置 DeepSeek/智谱/OpenAI/Moonshot/Ollama 预设）
2. 勾选「AI 分析时联网搜索」+ 填搜索 Key（Tavily 或博查，免费档即可）
3. 保存。Key 用 AES-GCM 加密存本机 IndexedDB，不进仓库不上传

## 开发 / 数据维护

```bash
# 32 队名单重新抓取（ESPN core API，会合并 players.js 精选库）
node tools/collect-squads.mjs      # → data/squads_pl.js + data/squads_eu.js

# 本地带代理服务
python3 tools/server.py 8899       # 等价于启动手机预览脚本

# 验收/开发用 mock（无真实 Key 跑通全部 AI 链路）
node tools/mock-server.mjs 8901    # ⚙ 设置里 base 填 http://127.0.0.1:8901/v1，模型 mock-a，搜索 Key 任意（tvly-mock 开头走本地假数据）
```

### 文件结构

```
tacticboard/
├── index.html / css/ / js/     # 主站（main.js / search.js / briefing.js / formation-lab.js）
├── ai/                          # 共享 AI 层：agent-core.js（mini-agent）· tools-web.js（Tavily/博查）
│                                # · settings.js（全局设置+模型下拉）· keystore.js（Key 加密）
├── data.js / players.js         # 精选内容数据（阵型/角色/球队 + 253 人精选球员）
├── data/squads_pl.js            # 英超 20 队名单（脚本生成）
├── data/squads_eu.js            # 欧洲其他 12 队名单（脚本生成）
├── tacticboard-engine/          # 对位引擎 v5（拆分为 index.html + engine.css + js/eng-*.js）
│   └── js/squads-bridge.js      # 32 队名单桥接 + 球员库缓存回写
├── tools/                       # server.py（静态+Tavily代理+mock）· collect-squads.mjs · mock-server.mjs
└── legacy/engine-build.py       # 旧构建脚本（引擎已改为多文件直编，不再需要）
```

### 架构说明

- **mini-agent（ai/agent-core.js）**：架构参考本仓库 `deepseek-harness/`（DeepSeek 官方开源）的 agent-loop / ToolDefinition / StreamChunk 设计，重写为浏览器可用（约 300 行）：OpenAI 兼容流式 + 工具调用循环 + 错误分类。harness 本体依赖 Node 无法进浏览器，故只移植设计。
- **联网搜索**：所有 AI 功能（模拟器分析/球员搜索/看板/阵型实验室）统一走 `TBAgent.run()` + `web_search`/`web_fetch` 工具；信源纪律按《数据更新手册》。
- **引擎**：已退出 build.py 构建模式，直接编辑 `tacticboard-engine/` 下多文件；滚动只发生在引擎内层 `#scroll` 容器，比分牌 `position:fixed` 在 iOS iframe 里也稳定。
- **深度数据闭环**：搜索板块「保存到球员库」→ localStorage `tb_player_cache` → 引擎/阵型实验室下次启动自动回写（惯用脚/特点/属性）。

## 已知边界

- 惯用脚/技术特点等深度数据：精选库已核实的为准；ESPN 基础名单的惯用脚为空（未查证不落库），用「搜索」板块补全后即缓存
- 位置字段 ESPN 源为粗粒度（GK/DF/MF/FW），引擎会保守展开为细位置；库里精选球员为细位置
- 引擎与主站需同域名部署（iframe + 共享 localStorage），整包一起拷贝
- AI 功能需在 ⚙ 设置配置后才可用；未配置时界面给出引导提示，不会白屏
