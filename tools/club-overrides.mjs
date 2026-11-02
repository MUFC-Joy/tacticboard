/* 俱乐部归属修正清单（用户反馈 + 联网核实 2026-11-01）
   forceClub：确认转会的目标俱乐部（null=已离开本项目 32 队范围）
   status：伤病等状态标注
   键=ESPN fullName（匹配同时作用于精选库 n/en） */
export const OVERRIDES={
  forceClub:{
    'Tijjani Reijnders':null,           /* → Al Qadsiah（沙特，官宣 2026.10） */
    'João Palhinha':null,               /* → 本菲卡（2026.8.26） */
    'Antoine Griezmann':null,           /* → 奥兰多城 MLS（2026.5 告别） */
    'Santiago Giménez':null,            /* → 波尔图 */
    'Morgan Rogers':'切尔西',            /* 维拉 → 切尔西 £116m */
    'Bruno Guimarães':'阿森纳',          /* 纽卡 → 阿森纳 ~£75-80m */
    'Sandro Tonali':'热刺',              /* 纽卡 → 热刺 €108m（2026.7.6） */
    'Jordan Henderson':'切尔西',         /* 布伦特福德 → 切尔西（2026.8.3） */
    'Karim Adeyemi':'巴萨',              /* 多特 → 巴萨（2026.7 €22m+7m） */
    /* 2026-11-02 二批（用户指正+核实） */
    'Gabriel Martinelli':null,          /* 阿森纳 → 离队 £73m */
    'Leandro Trossard':null,            /* 阿森纳同窗离队 */
    'Robert Lewandowski':null,          /* 巴萨 → 离队（2026.5 告别） */
    'Rafael Leão':null,                 /* 米兰 → 离队 */
    'Denzel Dumfries':'皇马',            /* 国米 → 皇马 */
    'Marc Cucurella':'皇马',             /* 切尔西 → 皇马 */
    'Anthony Gordon':'巴萨',             /* 纽卡 → 巴萨 */
    'Nick Woltemade':'尤文',             /* 纽卡 → 尤文（租借 2026.9.1） */
    'Iliman Ndiaye':'曼城',              /* 埃弗顿 → 曼城（用户指正） */
    'Christos Tzolis':'阿森纳',          /* → 阿森纳（希腊边锋） */
    'Bradley Barcola':'利物浦',          /* 巴黎 → 利物浦 */
    'Ronald Araújo':'利物浦',            /* 巴萨 → 利物浦（租借） */
    'Mateus Fernandes':'热刺',           /* 西汉姆 → 热刺 £85m */
    'Elliot Anderson':'曼城',            /* 森林 → 曼城 */
    'Ayyoub Bouaddi':'曼城',             /* 里尔 → 曼城 */
    'Gonçalo Ramos':'米兰',              /* 巴黎 → 米兰 ~€70m */
    /* 2026-11-02 三批（用户指正+核实） */
    'Omar Marmoush':'热刺',              /* 曼城 → 热刺（先租后买 ~£60m） */
    'Jan Paul van Hecke':'热刺',         /* 布莱顿 → 热刺 */
    'Brennan Johnson':'埃弗顿',          /* 热刺 → 埃弗顿（2026.8.11） */
    'Dusan Vlahović':null,              /* 尤文 → 自由身离队（离开五大联赛） */
    'Sávio':'热刺'                       /* → 热刺 */
  },
  status:{
    'Jamal Musiala':'重伤初愈（2025.7 重伤，回归后替补轮换，实力恢复中）',
    'Jack Grealish':'训练态度问题被内部停训（非主力，出场顺位下降）'
  }
};
