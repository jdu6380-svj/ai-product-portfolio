import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/content/portfolio";
import { ProductPreview } from "@/components/product-preview";

type JourneyStep = { number: string; title: string; input: string; system: string; output: string };
type WorkflowRow = { label: string; input: string; process: string; output: string };
type IterationStory = { label: string; title: string; evidence: string; change: string; result: string };
type ProductVisual = { src: string; alt: string; title: string; detail: string; width: number; height: number };
type TestCase = { label: string; question: string; evidence: string; acceptance: string };
type StoryData = { audience: string; lead: string; journey: JourneyStep[]; workflowRows: WorkflowRow[]; visuals: ProductVisual[]; iterations: IterationStory[]; nextSteps: string[]; evidenceNote: string; testCases?: TestCase[] };

const storyNav = [["story", "问题与场景"], ["journey", "用户任务"], ["decisions", "关键判断"], ["ai-workflow", "AI 如何工作"], ["iteration", "迭代证据"], ["outcome", "成果与贡献"]] as const;

const storyData: Record<Project["slug"], StoryData> = {
  growthos: {
    audience: "个人品牌经营者、创作者与小型内容团队。该目标用户来自产品定位与流程设计，不等同于已完成的真人用户研究。",
    lead: "GrowthOS 把品牌画像、策略、选题、内容生成、评估和反馈改进放进一条可追溯的内容生产工作流。我的重点是定义 MVP 范围、保留人工确认点，并让每次反馈都能回到具体版本。",
    journey: [
      { number: "01", title: "建立品牌上下文", input: "品牌定位、目标受众、语气和内容方向", system: "保存 Brand Profile Revision，作为后续 Agent 的输入", output: "可复用的品牌上下文" },
      { number: "02", title: "确认内容策略", input: "Brand Profile Revision", system: "Strategy Agent 生成结构化草稿，用户检查后确认", output: "Active Strategy" },
      { number: "03", title: "形成选题计划", input: "Active Strategy 与发布节奏", system: "Idea Agent 按 30 天发布 Slot 生成候选选题", output: "可选择的内容计划" },
      { number: "04", title: "生成并编辑草稿", input: "选题、品牌上下文和平台", system: "Content Agent 生成标题、Hook、结构、正文和 CTA", output: "可编辑 Content Revision" },
      { number: "05", title: "评估并提交反馈", input: "当前 Content Revision", system: "Evaluation Agent 给出四维解释，用户选择反馈方向", output: "评估报告与 feedback event" },
      { number: "06", title: "改进、确认与复评", input: "反馈、原稿和目标", system: "生成改进建议；用户应用、放弃或继续编辑，再保存新版本", output: "新 Revision、事件记录与复评入口" },
    ],
    workflowRows: [
      { label: "策略", input: "Brand Profile Revision", process: "Strategy Agent 生成结构化草稿", output: "用户确认的策略版本" },
      { label: "内容", input: "选题、品牌、平台", process: "Content Agent 生成结构化草稿，应用层校验 Schema", output: "可编辑 Content Revision" },
      { label: "评估", input: "当前 Revision 与品牌版本", process: "AI 提供子项解释，应用层计算确定性总分", output: "四维报告与建议" },
      { label: "反馈改进", input: "反馈类型、分类和说明", process: "创建或恢复任务，生成定向建议，等待人工确认", output: "应用或放弃，并保留版本关系" },
    ],
    visuals: [
      { src: "/growthos/ideas.png", alt: "GrowthOS 选题中心真实界面", title: "30 天选题计划", detail: "真实 GrowthOS 工作台截图：策略确认后生成发布 Slot 和可选择的内容选题。", width: 1440, height: 1120 },
      { src: "/growthos/editor.png", alt: "GrowthOS 内容编辑器真实界面", title: "Content Revision 编辑器", detail: "真实界面展示平台草稿、Revision 历史、人工编辑与保存新版本。", width: 1440, height: 1120 },
      { src: "/growthos/review-report.png", alt: "GrowthOS 内容评估报告真实界面", title: "四维内容评估", detail: "真实界面展示 Brand Match、Growth Potential、Content Quality 与 Credibility Readiness。", width: 1440, height: 1120 },
    ],
    iterations: [
      { label: "迭代一", title: "让生成结果拥有结构化反馈", evidence: "第一轮文档记录三种反馈、分类、说明、权限、幂等和刷新恢复；全量 144 项测试通过。", change: "将 feedback event 绑定到当前 Content Revision，为下一步改进提供明确输入。", result: "反馈从孤立评价变成可追踪的工作流信号。" },
      { label: "迭代二", title: "把反馈接到 AI 改进与人工确认", evidence: "本地隔离 Chrome 流程记录了需要修改、不适合使用、真实模型建议、人工应用、新 Revision 与复评。", change: "复用 Content Agent、编辑器和 Evaluation，不建立额外后台；建议只有在用户确认后才保存。", result: "闭环行为按设计运行；Revision 分数记录用于观察，不被包装成质量提升结论。" },
      { label: "迭代三", title: "让建议更具体，并标清假设边界", evidence: "五个合成案例基线/候选各五次真实模型生成；行动具体性两组均 5/5，假设与证据边界复核为 2/5 → 5/5。", change: "将“受众场景 → 具体行动 → 可观察标准”和假设标注写入 content-v1.1.0 提示词。", result: "候选输出更容易进入人工复核；该结果限定于十份固定文本。" },
    ],
    nextSteps: ["在获得同意和隔离数据后验证真实用户的编辑负担、采纳行为与任务完成情况。", "为高风险事实主张补充来源承接与人工核验路径。", "继续保持人工确认、版本保留和事件追踪，不把计划中的自动发布或长期 Memory 写成当前能力。"],
    evidenceNote: "工程证据来自本地隔离 Demo、真实模型生成记录、自动化回归和项目文档；线上入口可达登录页，完整线上工作流需要应用账号。",
  },
  "novera-ai": {
    audience: "需要从经营资料、会议纪要、业务规范和分析文件中查找事实的企业知识工作者。该场景来自产品设计与固定合成语料，不等同于真实企业用户研究。",
    lead: "Novera AI 将多格式资料转成可检索、可引用、可复核的知识答案。我的工作重点是把“能回答”定义为一条可检查的链路：格式解析、证据准入、Embedding、检索、生成、Claim / Evidence 校验和来源定位。",
    journey: [
      { number: "01", title: "进入 Workspace", input: "Live workspace 或明确标注的 Demo 场景", system: "加载知识状态、文档列表与任务入口", output: "可开始的知识工作空间" },
      { number: "02", title: "导入知识文档", input: "PDF、DOCX、Markdown、TXT、XLSX、PPTX 或 PNG", system: "校验文件并完成初始化、签名上传与处理排队", output: "带状态的文档记录" },
      { number: "03", title: "解析与准入", input: "原始文件内容", system: "按格式提取文本、表格、工作表行、幻灯片文本或 OCR，并记录 locator 与告警", output: "可用内容、需复核状态或受控限制" },
      { number: "04", title: "建立检索上下文", input: "通过准入的内容块", system: "规范化、分块、生成 1536 维 Embedding，写入进程内 LocalVectorIndex", output: "可被问题检索的上下文" },
      { number: "05", title: "提出问题并生成回答", input: "事实、比较、分析或知识缺口问题", system: "Query Embedding、余弦检索、DeepSeek 结构化回答", output: "回答与 Claims" },
      { number: "06", title: "查看 Evidence 与来源", input: "回答中的 Claims 与检索 chunks", system: "校验 quote、source document 与位置 locator", output: "可回到原文的 Evidence 链" },
      { number: "07", title: "继续行动或补充资料", input: "回答、来源和质量状态", system: "继续追问、复核来源，或为知识缺口补充材料", output: "可解释的下一步" },
    ],
    workflowRows: [
      { label: "文档处理", input: "多格式文件", process: "Parser → Normalize → Chunk，并保留页、行、工作表或幻灯片位置", output: "结构化内容与来源 locator" },
      { label: "检索", input: "通过证据准入的 chunks", process: "DashScope text-embedding-v2 + LocalVectorIndex 余弦检索", output: "问题相关的上下文" },
      { label: "生成", input: "问题与检索上下文", process: "DeepSeek deepseek-flash 生成结构化回答和 Claims", output: "非空回答与 Claim 集合" },
      { label: "证据", input: "Claims、quotes、sources", process: "程序校验引用、来源和位置；缺少依据时保留边界答复", output: "Evidence Explorer 与质量状态" },
    ],
    visuals: [
      { src: "/novera/preview-home.png", alt: "Novera AI Workspace 首页真实截图", title: "Workspace", detail: "真实 Preview 截图，展示知识工作空间与任务入口。", width: 1440, height: 1000 },
      { src: "/novera/preview-assistant.png", alt: "Novera AI AI 助手真实截图", title: "AI Assistant", detail: "真实 Preview 截图，展示问题输入、回答组织与来源链路。", width: 1440, height: 1000 },
      { src: "/novera/preview-evidence.png", alt: "Novera AI Evidence Explorer 真实截图", title: "Claim / Evidence", detail: "真实 Preview 截图，展示 Claim、Evidence、Source 与定位的关联。", width: 1440, height: 1000 },
    ],
    testCases: [
      { label: "有答案的问题", question: "What activation event does the Q2 retention review use, and how did the rate change?", evidence: "`01-q2-retention-review.md` 的对应行记录 48 小时发布窗口、April–June cohort 52% 与 January–March baseline 68%，并标注这是 leading indicator。", acceptance: "检索命中目标文档，回答保留指标边界，引用 quote 能回到原文。" },
      { label: "跨文档问题", question: "Analyze why early retention declined and separate strong evidence from directional signals.", evidence: "Retention review、release notes 与 onboarding experiment 分别提供观察信号、变更背景和实验窗口。", acceptance: "来源齐全，并区分相关性、合理机制和因果证明；不能仅因同时返回多个来源就视为推理完成。" },
      { label: "知识缺口问题", question: "What was Asteria Workcloud's ARR in July 2026?", evidence: "固定语料将其标记为 `financial-metric-not-in-corpus`，预期来源与证据为空。", acceptance: "返回“资料未提供”边界答复，提示补充财务来源，不生成预算或 ARR 数字。" },
    ],
    iterations: [
      { label: "迭代一", title: "把多格式解析推进为证据契约", evidence: "固定 20 份合成文档、40 个问题；v2/v3 独立标准覆盖 PDF、DOCX、Markdown、TXT、XLSX、PPTX、PNG 与 OCR 边界。", change: "补充结构保留、extraction warnings、review_required、来源定位和问答准入规则。", result: "20/20 文档 profile、40/40 问题按适用 v3 标准通过；结论限定于固定语料。" },
      { label: "迭代二", title: "从“模型给答案”走向 Evidence-first Workspace", evidence: "真实运行记录包含 40 个非空生成结果、实际检索 chunks、Claims、Evidence 和 source locator。", change: "将答案拆成 Claim，并把 quote、source document 和位置放入可查看的 Evidence 链。", result: "60 条有效 Evidence、0 条无效引用、0 条无依据声明；其中 4 道知识缺口题以有依据的边界答复通过。" },
    ],
    nextSteps: ["在隔离环境中重新验收线上完整上传、处理、检索与问答链路，单独记录 Production 结果。", "将固定语料的 LocalVectorIndex 路径迁移到隔离的远端测试存储，验证资源与性能。", "为图表源数据和手写内容建立置信度、人工确认与再入库的独立测试。"],
    evidenceNote: "Novera 的 20/20、40/40 与 60 Evidence 结果来自固定合成语料的真实本地运行与 v3 离线复评，不代表任意企业文档的泛化准确率或线上完整链路。",
  },
  evidra: {
    audience: "中文长文创作者、内容顾问与小型内容团队。该目标用户来自 Beta 文档与产品流程，真实用户规模仍需进一步验证。",
    lead: "Evidra 把“这句话凭什么成立”和“我应该先改哪里”转成一条可复查的编辑工作流。产品将评分、读者问题、原文 Evidence、风险诊断、可编辑建议、人工修改与 Recheck 放在同一条路径中。",
    journey: [
      { number: "01", title: "创建审查", input: "标题、正文、可选发布日期或非敏感内置示例", system: "校验文章边界并建立一次可追踪审查", output: "可编辑的文章工作区" },
      { number: "02", title: "运行初步分析", input: "文章段落", system: "生成四维评分、潜在读者问题与诊断任务", output: "报告概览与问题列表" },
      { number: "03", title: "查看 Evidence", input: "问题与诊断结果", system: "将候选引用绑定到 Para-n 原文段落，并校验连续 quote", output: "valid、missing 或 invalid 状态" },
      { number: "04", title: "阅读诊断", input: "回答性、风险级别和缺失信息", system: "把问题转成作者可以处理的解释与优先级", output: "明确的修改方向" },
      { number: "05", title: "生成建议", input: "诊断与段落", system: "生成作者补充建议或基于已有 Evidence 的内容草稿", output: "可审阅的 Patch actions" },
      { number: "06", title: "人工修改", input: "原文、建议与修改清单", system: "作者决定采纳、调整或忽略，并保存自己的正文版本", output: "新的可恢复草稿" },
      { number: "07", title: "Recheck", input: "基线报告与修改后正文", system: "重新运行分析并生成可比较快照", output: "评分、维度、诊断与 Evidence 对照" },
      { number: "08", title: "恢复与继续", input: "当前浏览器工作区", system: "恢复报告、草稿和最近历史，并标记缓存恢复状态", output: "可继续的单用户工作流" },
    ],
    workflowRows: [
      { label: "分析", input: "文章标题、正文与日期", process: "模型分析问题、评分和诊断；程序负责字段校验与状态机", output: "报告与诊断列表" },
      { label: "Evidence", input: "诊断候选引用", process: "按 paragraphId 查找原文，要求 quote 是连续子串", output: "可定位的证据状态" },
      { label: "建议", input: "诊断、段落与有效 Evidence", process: "模型生成 advice 或 content draft，程序检查关联与引用", output: "可加入修改清单的建议" },
      { label: "Recheck", input: "基线快照与新正文", process: "重新分析，比较可观察的分数、维度和诊断数量", output: "Before / After 与继续编辑入口" },
    ],
    visuals: [],
    iterations: [
      { label: "迭代一", title: "让 Recheck 状态回到真实语义", evidence: "提交 `5e3fe8c` 与历史安全回归覆盖 running、complete、cached、error 和比较摘要。", change: "将缓存恢复与新复核分开，并把分数变化、诊断数量和 Evidence 状态独立呈现。", result: "用户能区分“恢复旧结果”和“完成新分析”；比较只描述实际可观察变化。" },
      { label: "迭代二", title: "加入浏览器本地审查历史", evidence: "提交 `5d3d853` 与 READY Preview 部署记录支持当前浏览器最近 10 条、30 天清理和恢复入口。", change: "在不引入账号、团队权限和服务端正文历史的前提下，增加本地历史列表与恢复操作。", result: "单用户工作流可以从当前浏览器继续；公开表达明确其存储边界。" },
      { label: "迭代三", title: "用诊断驱动一次内容补强复验", evidence: "历史 Preview 运行记录：同一篇非敏感测试文章首次 75/100，完成有依据修改后 Recheck 为 86/100。", change: "补充抽样、角色分工、争议升级、记录字段和适用边界，没有修改评分算法。", result: "该次记录支持“同一工作流中评分发生变化”，不延伸为外部事实已核验或普遍质量提升。" },
    ],
    nextSteps: ["为目标用户任务安排受控的非敏感样例测试，观察作者如何理解 Evidence 与建议。", "补齐当前版本 Preview 的完整浏览器链路与本地历史双 profile 验证。", "继续记录模型来源与运行条件，让评分、Evidence 状态和外部事实核验保持独立。"],
    evidenceNote: "Evidra 的页面与状态依据源码、历史回归和 Preview 记录整理；75 → 86 是限定性的历史运行案例，不能替代真实用户研究或外部事实核验。",
  },
};

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span></a>;
}

export function CaseStudy({ project }: { project: Project }) {
  const story = storyData[project.slug];
  const previewVariant = project.slug === "novera-ai" ? "novera" : project.slug as "evidra" | "growthos";
  const isEvidra = project.slug === "evidra";
  return <>
    <section className={`case-hero case-hero-${project.accent}`}><div className="container"><Link href="/#work" className="back-link">← 返回精选项目</Link><div className="case-hero-grid"><div><p className="eyebrow">项目 {project.index} <span className="eyebrow-line" /></p><h1>{project.title}</h1><p className="case-category">{project.category}</p><p className="case-description">{project.description}</p><div className="case-hero-links"><ExternalLink href={project.demoUrl}>在线体验</ExternalLink><ExternalLink href={project.githubUrl}>GitHub 源码</ExternalLink></div></div><div><ProductPreview variant={previewVariant} /><p className="case-preview-caption">{isEvidra ? "产品界面结构示意 / 非实机截图" : "产品界面方向示意；真实界面见下方证据"}</p></div></div><div className="case-facts"><div><span>职责</span><strong>{project.role}</strong></div><div><span>状态</span><strong>{project.status}</strong></div><div><span>重点</span><strong>{project.focus.join(" · ")}</strong></div></div></div></section>
    <div className={`case-layout case-story-layout container case-layout-${project.slug}`}><aside className="case-nav" aria-label="项目案例章节"><p>本页内容</p>{storyNav.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside><article className="case-content case-story-content">
      <section className="case-section story-section" id="story"><p className="section-kicker">01 / 一个值得解决的问题</p><div className="story-heading-grid"><h2>{project.problem}</h2><div className="story-side-note"><span>目标场景</span><p>{story.audience}</p><span>我的角色</span><p>{project.role}</p></div></div><p className="case-body">{story.lead}</p><div className="story-problem-list">{project.problemDetails.map((detail, index) => <div key={detail}><span>0{index + 1}</span><p>{detail}</p></div>)}</div></section>
      <section className="case-section journey-section" id="journey"><p className="section-kicker">02 / 用户如何完成任务</p><h2>从输入开始，到一个可以继续行动的结果。</h2><p className="case-body">核心路径按真实产品流程拆开，分别标出用户输入、系统处理和用户能继续使用的结果。</p><div className="journey-list">{story.journey.map((step) => <article key={step.number} className="journey-step"><div className="journey-step-index">{step.number}</div><div className="journey-step-main"><h3>{step.title}</h3><div className="journey-step-grid"><p><span>输入</span>{step.input}</p><p><span>系统处理</span>{step.system}</p><p><span>输出</span>{step.output}</p></div></div></article>)}</div>{story.visuals.length > 0 ? <div className="story-visuals"><div className="story-visual-heading"><span>真实产品界面</span><p>截图与产品示意分开呈现；图片来自项目本地运行记录。</p></div><div className="story-visual-grid">{story.visuals.map((visual) => <figure key={visual.src}><a href={visual.src} target="_blank" rel="noreferrer"><Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} sizes="(max-width: 900px) 100vw, 720px" /></a><figcaption><strong>{visual.title}</strong><span>{visual.detail}</span></figcaption></figure>)}</div></div> : <div className="story-schematic"><ProductPreview variant={previewVariant} /><div><span>产品界面示意</span><p>Evidra 当前页面使用信息结构示意，实际产品入口请打开在线 MVP。真实截图待用非敏感样例补拍。</p></div></div>}{story.testCases && <div className="story-test-cases"><div className="story-visual-heading"><span>代表性验证任务</span><p>问题、材料和验收标准来自固定测试语料。</p></div>{story.testCases.map((test) => <article key={test.label}><header><span>{test.label}</span><b>可复核案例</b></header><h3>{test.question}</h3><div><p><strong>证据材料</strong>{test.evidence}</p><p><strong>验收标准</strong>{test.acceptance}</p></div></article>)}</div>}</section>
      <section className="case-section decision-section" id="decisions"><p className="section-kicker">03 / 关键产品判断</p><h2>每个选择都同时考虑任务、控制权与验证成本。</h2><div className="decision-list">{project.decisions.map((decision) => <article className="decision-card" key={decision.number}><span className="decision-number">{decision.number}</span><div><p className="decision-label">产品判断</p><h3>{decision.decision}</h3><div className="decision-details"><div><span>任务与依据</span><p>{decision.why}</p></div><div><span>方案取舍</span><p>{decision.tradeoff}</p></div><div><span>进入产品</span><p>{decision.result}</p></div></div></div></article>)}</div><div className="decision-principles"><p className="proof-label">DECISION RULES</p><div><span>01</span><p>先做能影响核心用户任务、且可以被复测的最小变化。</p></div><div><span>02</span><p>模型输出保留为候选，用户确认和程序校验负责最终交接。</p></div><div><span>03</span><p>把实现证据、运行证据和用户价值证据分开记录。</p></div></div></section>
      <section className="case-section ai-workflow-section" id="ai-workflow"><p className="section-kicker">04 / AI 如何工作</p><h2>模型、程序规则和人的判断各自承担清晰的职责。</h2><div className="ai-workflow-table"><div className="ai-workflow-head"><span>环节</span><span>输入</span><span>处理</span><span>输出</span></div>{story.workflowRows.map((row) => <div className="ai-workflow-row" key={row.label}><strong>{row.label}</strong><span>{row.input}</span><span>{row.process}</span><span>{row.output}</span></div>)}</div><details className="deep-reading"><summary>展开技术实现与证据边界</summary><div><p>{project.slug === "novera-ai" ? "Novera 的本地验收链路使用格式感知 parser、规范化与分块、DashScope text-embedding-v2、进程内 LocalVectorIndex、DeepSeek deepseek-flash，以及 Claim / Evidence 校验。线上 MVP 入口已确认可达，完整上传到问答链路需要单独验收。" : project.slug === "growthos" ? "GrowthOS 复用了现有认证、Supabase RLS/RPC、Demo Store、AI Agent 和 Revision 模型。Evaluation 的分数是启发式参考，不是事实核验；生成建议只有经用户确认才进入新 Revision。" : "Evidra 的 Evidence verifier 根据 paragraphId 找到原文段落，并要求 quote 是连续子串；Recheck 比较只描述分数、维度和诊断数量的可观察变化，浏览器历史是当前浏览器的便利存储。"}</p><p>这些实现说明支持产品结构与工程行为，不把本地运行、固定样本或部署 READY 状态扩展成真实用户效果。</p></div></details></section>
      <section className="case-section iteration-section" id="iteration"><p className="section-kicker">05 / 真实迭代故事</p><h2>从测试观察出发，做范围受控的改进，再看证据如何变化。</h2><p className="case-body">每个案例按“观察 → 判断 → 改动 → 复验”组织。结果只说明对应条件下的产品行为，不把一次运行扩展成普遍价值结论。</p><div className="iteration-story-list">{story.iterations.map((item) => <article key={item.title}><span className="iteration-story-label">{item.label}</span><h3>{item.title}</h3><div className="iteration-story-grid"><p><strong>证据</strong>{item.evidence}</p><p><strong>实际改动</strong>{item.change}</p><p><strong>复验结论</strong>{item.result}</p></div></article>)}</div></section>
      <section className="case-section outcome-section" id="outcome"><p className="section-kicker">06 / 成果与个人贡献</p><h2>把产品判断、AI 协作和验证结果收束成可复核的交付。</h2><div className="outcome-facts">{Object.entries({ "目标用户": project.validation.targetUsers, "验证范围": project.validation.realAnalyses, "工作流": project.validation.sessions, "迭代证据": project.validation.majorIterations }).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="contribution-grid"><div><span>我负责的产品判断</span><p>定义问题、MVP 范围、关键流程、用户控制点与验收标准，保持三个项目各自独立。</p></div><div><span>我如何协作实现</span><p>使用 GPT 辅助比较方案、拆解任务与整理验收；使用 Codex 辅助定位模块、实现改动和运行检查。</p></div><div><span>我如何验收</span><p>把核心路径拆成输入、预期、实际输出和证据，区分本地运行、固定语料、历史记录和线上入口状态。</p></div><div><span>当前可以说明的结果</span><p>{story.evidenceNote}</p></div></div><div className="validation-evidence"><span className="proof-label">EVIDENCE LOG / 可追溯材料</span>{project.validationEvidence.map((item) => <p key={item}><i />{item}</p>)}</div><div className="next-step-panel"><div><span className="proof-label">NEXT ITERATION</span><h3>下一轮最值得验证的事项</h3></div><ul>{story.nextSteps.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="case-next"><div className="case-next-links"><ExternalLink href={project.demoUrl}>在线体验</ExternalLink><ExternalLink href={project.githubUrl}>GitHub 源码</ExternalLink></div><Link className="button button-dark" href="/#work">查看其他项目 <span>↗</span></Link></div></section>
    </article></div>
  </>;
}
