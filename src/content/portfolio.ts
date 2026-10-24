export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  role: string;
  status: string;
  focus: string[];
  accent: "coral" | "blue" | "olive";
  problem: string;
  problemDetails: string[];
  insight: string;
  insightFlow: string[];
  decisions: Decision[];
  workflow: string[];
  experience: Experience[];
  iterations: Iteration[];
  validation: Validation;
  validationEvidence: string[];
  beforeAfter: { before: string; after: string; lesson: string };
  githubUrl: string;
  demoUrl: string;
  learnings: string[];
};

export type Decision = { number: string; decision: string; why: string; tradeoff: string; result: string };
export type Experience = { title: string; description: string; detail: string; tone: string };
export type Iteration = { version: string; title: string; detail: string };
export type Validation = { targetUsers: string; realAnalyses: string; sessions: string; majorIterations: string };

export const projects: Project[] = [
  {
    slug: "evidra", index: "03", title: "Evidra", category: "AI 内容可信度审查工作台",
    shortDescription: "把观点、原文证据、修改建议与 Recheck 放进作者可控的审查流程。",
    description: "面向中文长文创作者与内容顾问，在发布前检查读者问题、观点依据与可执行的编辑方向。",
    role: "产品定位 / 工作流设计 / 证据边界 / 测试验收，与 AI 编程工具协作实现", status: "MVP / Web Preview", focus: ["中文长文", "Claim / Evidence", "编辑工作流", "Recheck"], accent: "coral",
    problem: "作者需要同时判断文章是否回应读者问题、关键观点能否回到原文依据，以及优先修改哪些部分。",
    problemDetails: ["评分需要与可读的解释和下一步动作相连。", "Evidence 应定位到文章原文，而不是只重复模型生成的概括。", "内容建议需要经过作者审阅，再进入修改与复核。"],
    insight: "把分析结果转成作者能检查、能编辑、能再次比较的工作流。",
    insightFlow: ["评分", "为什么？", "证据", "行动"],
    decisions: [
      { number: "01", decision: "从以评分为先转向以证据为先。", why: "用户需要的是可以使用的解释，而不是另一个抽象数字。", tradeoff: "产品流程更丰富，也需要更多界面和推理过程。", result: "核心体验变成从论点到来源，再到建议修改的路径。" },
      { number: "02", decision: "让建议可以编辑，而不是直接定稿。", why: "可信度取决于语境，最终的编辑选择仍然属于作者。", tradeoff: "人工智能提供解释与可编辑建议，作者保有最终编辑权。", result: "用户可以在复查前接受、调整或忽略一条建议。" },
      { number: "03", decision: "用再次检查闭合整个循环。", why: "一次有价值的修改，应该能在同一工作流里看到变化。", tradeoff: "重新分析增加了一步，也需要清晰的进度反馈。", result: "产品把迭代视为价值的一部分，而不是事后补充。" },
    ],
    workflow: ["创建审查", "AI 初步分析", "逐项诊断", "Evidence 原文核验", "生成修改建议", "人工修改", "Recheck", "前后比较"],
    experience: [
      { title: "证据分析", description: "把每个论点与支撑它的证据连接起来。", detail: "界面保留推理过程，让用户能够评估建议，而不是盲目接受。", tone: "accent-coral" },
      { title: "建议修改", description: "把薄弱论点变成具体的编辑机会。", detail: "用户可以查看建议、保留自己的表达方式，并决定真正需要修改的内容。", tone: "accent-ink" },
      { title: "再次检查", description: "在修改之后展示发生了什么变化。", detail: "这让作者有理由继续迭代，也比单一分数更能感知进展。", tone: "accent-slate" },
    ],
    iterations: [
      { version: "MVP", title: "Evidence-first 审查工作流", detail: "在线 MVP 可运行文章分析、逐项诊断、Evidence 明细、建议清单、人工修改与 Recheck。" }, { version: "验收记录", title: "复查比较与状态恢复", detail: "已完成一次非敏感示例操作验收：总分 76 → 73，各维度方向不同；刷新后报告、比较结果与完成状态保持一致。" }, { version: "下一阶段", title: "目标用户与模型来源验证", detail: "围绕目标用户任务与模型来源记录，继续积累可复核的产品证据。" },
    ],
    validation: { targetUsers: "中文长文创作者、内容顾问与小型内容团队（产品定位）", realAnalyses: "历史 Preview 示例记录：同篇文章 75 → 86", sessions: "单篇文章审查与编辑工作流", majorIterations: "Recheck 状态语义与本地历史" },
    validationEvidence: ["历史 Preview 记录：内容评分 75 → 86，按相同工作流完成修改与 Recheck", "Recheck 状态与比较摘要有代码提交和历史回归记录", "Evidence 状态单独呈现，用于定位文章内部原文依据"],
    beforeAfter: { before: "内容作者需要自行判断哪些主张缺少支撑。", after: "产品方向：把主张、证据、修改建议和复核放进一条路径。", lesson: "这是产品问题与方案方向的对照，不代表未经确认的历史版本记录。" },
    githubUrl: "https://github.com/jdu6380-svj/geo-content-checker",
    demoUrl: "https://geo-content-checker-5cgngf0zy.vercel.app/",
    learnings: ["用户不总是需要更多人工智能，他们需要围绕人工智能输出做出更好的决策。", "能运行的原型，并不等于已经证明了产品价值。", "最有用的迭代，往往来自观察用户实际做了什么，而不只是听他们说了什么。"],
  },
  {
    slug: "growthos", index: "01", title: "GrowthOS", category: "AI 内容增长工作流",
    shortDescription: "从品牌画像到内容反馈与版本迭代的一条可追溯生产流程。",
    description: "面向个人品牌经营者、创作者与小型内容团队，把策略、选题、内容生成、评估和反馈衔接起来。",
    role: "产品方向 / MVP 范围 / 工作流与反馈设计 / 验收复盘，与 AI 编程工具协作实现", status: "MVP / 本地闭环与三轮迭代有记录", focus: ["品牌策略", "内容生产", "反馈改进", "版本追踪"], accent: "blue",
    problem: "持续内容生产需要在品牌方向、选题、写作、编辑和复盘之间反复作出判断。",
    problemDetails: ["每份草稿都需要带着对应的品牌与策略上下文。", "反馈需要关联到具体内容版本，才能成为下一步输入。", "AI 建议应当由用户确认后再形成新版本。"],
    insight: "将 AI 输出放进连续的内容决策工作流，并把最终取舍留给创作者。",
    insightFlow: ["定位", "规划", "创作", "评审"],
    decisions: [
      { number: "01", decision: "围绕决策组织产品，而不是围绕提示词。", why: "用户在让人工智能生成内容前，需要先知道自己要做什么决定。", tradeoff: "减少开放式灵活性，换取更清晰的路径。", result: "基于阶段的工作流让进度变得可见。" },
      { number: "02", decision: "让策略上下文附着在每一份草稿上。", why: "内容质量取决于背后的受众和定位。", tradeoff: "开始阶段需要更多准备。", result: "后续步骤拥有更好的上下文，也减少了重复说明。" },
    ],
    workflow: ["品牌背景", "内容策略", "选择选题", "撰写草稿", "内容评审", "下一步行动"],
    experience: [{ title: "工作流地图", description: "展示一条内容在整个流程中所处的位置。", detail: "用户可以在策略和执行之间移动，而不会丢失上下文。", tone: "accent-blue" }, { title: "阶段简报", description: "每次人工智能交互都从一份聚焦的简报开始。", detail: "这降低了面对空白页面时的压力，也让输出更容易被评估。", tone: "accent-ink" }],
    iterations: [{ version: "Phase 1", title: "提示词集合", detail: "将内容生产任务梳理为可复用的提示词与阶段输入。" }, { version: "Phase 2 / 3", title: "工作流与评估层", detail: "品牌定位、选题、内容、评审与不可变 Revision 逐步连接起来。" }, { version: "当前阶段", title: "真实证据优先", detail: "生产真实模型闭环已记录；工作流继续围绕内容团队的阶段任务演进。" }],
    validation: { targetUsers: "个人品牌经营者、创作者与小型内容团队（产品定位）", realAnalyses: "本地隔离工作流与真实模型生成记录", sessions: "策略、选题、生成、评估与反馈改进", majorIterations: "三轮产品与内容质量迭代" },
    validationEvidence: ["本地隔离 Chrome 流程覆盖策略、选题、内容、评估、反馈改进、复评与刷新恢复", "五个合成案例的基线/候选各完成五次真实模型生成", "第三轮表达边界人工复核：基线 2/5，候选 5/5；行动具体性两组均 5/5"],
    beforeAfter: { before: "提示词散落在多个工具中，阶段之间丢失上下文。", after: "用阶段、简报和下一项决策串起内容工作流。", lesson: "工作流本身就是产品界面。" },
    githubUrl: "https://github.com/jdu6380-svj/GrowthOS",
    demoUrl: "https://growthos-phase3-mvp.vercel.app/workflow",
    learnings: ["工作流本身就是产品界面，而不是隐藏在背后的实现细节。", "人工智能在不同阶段应承担不同角色：策略顾问、协作者、批评者或编辑。", "降低认知负担，往往比增加一种生成模式更有价值。"],
  },
  {
    slug: "novera-ai", index: "02", title: "Novera AI", category: "企业知识问答与 RAG",
    shortDescription: "把多格式文档转成可检索、可引用、可复核的知识答案。",
    description: "面向企业知识工作场景，连接文档解析、证据准入、检索、回答生成与来源定位。",
    role: "AI 产品经理 / 可靠性策略 / RAG 评测 / 迭代验收，与 AI 编程工具协作实现", status: "MVP / 固定语料本地 RAG 已评测", focus: ["多格式文档", "RAG", "Claim / Evidence", "知识缺口"], accent: "olive",
    problem: "知识问答需要同时回答问题、显示答案依据，并让用户能回到原始文档核对关键事实。",
    problemDetails: ["文档格式会影响可提取内容和来源定位。", "证据是否可采信，需要在检索与生成前明确。", "资料不足时，结果需要保留可解释的知识边界。"],
    insight: "把“有依据地回答”定义为一条从文档处理到来源复核的完整产品链路。",
    insightFlow: ["提问", "检索", "溯源", "回答"],
    decisions: [{ number: "01", decision: "把来源作为答案的一部分展示。", why: "企业用户在采取行动前，需要核验信息。", tradeoff: "答案会稍微更密集，但也更有责任感。", result: "产品把信任设计成一种产品能力。" }, { number: "02", decision: "围绕可重复的工作任务设计。", why: "价值在于完成任务，而不只是进行一次对话。", tradeoff: "减少新奇的交互形式。", result: "产品更容易融入团队已有的工作流。" }],
    workflow: ["提出问题", "检索知识", "关联来源", "生成回答", "交接任务"],
    experience: [{ title: "有来源的回答", description: "让答案与它所依据的知识保持可见关系。", detail: "当问题重要时，用户可以从摘要回到原始来源。", tone: "accent-olive" }, { title: "任务交接", description: "让最终答案指向行动，而不是停在一次空洞的聊天回复。", detail: "这让人工智能成为企业工作流的一部分，而不是独立的终点。", tone: "accent-ink" }],
    iterations: [{ version: "Phase 1 / 5", title: "知识工作台", detail: "从文档处理、检索和结构化回答，逐步建立可观察的知识状态。" }, { version: "Phase 6 / 8", title: "Claim / Evidence 验证", detail: "答案被拆成可核验 Claim，并连接到原文、来源文档和质量指标。" }, { version: "当前阶段", title: "以端到端任务推进验证", detail: "核心产品流程与证据界面已形成，下一阶段聚焦完整知识问答任务验证。" }],
    validation: { targetUsers: "企业知识工作者（产品场景）", realAnalyses: "20 份合成文档 / 40 个问题的真实本地 RAG 运行", sessions: "DashScope Embedding、进程内向量检索与 DeepSeek 生成", majorIterations: "基于同一真实运行记录完成 v3 离线复评" },
    validationEvidence: ["真实运行：20 份文档、40 个问题、40 次 DeepSeek 生成", "v3 离线复评：20/20 文档 profile、40/40 问题通过适用标准", "60 条有效 Evidence；0 条无效引用；0 条无依据声明"],
    beforeAfter: { before: "用户从搜索结果中自行拼接答案。", after: "答案、来源和任务交接被放在同一条可核验路径上。", lesson: "企业 AI 的信任来自上下文和边界。" },
    githubUrl: "https://github.com/jdu6380-svj/novera-ai",
    demoUrl: "https://novera-ai-gules.vercel.app/",
    learnings: ["企业人工智能的信任，需要通过上下文、来源和清晰边界来设计。", "信息架构的重要性不亚于模型交互本身。", "最好的答案，往往是能帮助用户完成下一项任务的答案。"],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
