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

const storyNav = [["story", "问题与场景"], ["journey", "任务路径"], ["decisions", "产品判断"], ["ai-workflow", "AI 工作流"], ["iteration", "迭代记录"], ["outcome", "验证与贡献"]] as const;

const storyData: Record<Project["slug"], StoryData> = {
  growthos: {
    audience: "面向个人品牌经营者、创作者与小型内容团队，围绕内容策略、选题、编辑和复盘设计生产流程。",
    lead: "GrowthOS 把品牌画像、策略、选题、内容生成、评估与反馈改进连成一条内容生产流程。我负责收敛 MVP 范围、设计人工确认点，并让反馈关联到具体内容版本。",
    journey: [
      { number: "01", title: "建立品牌上下文", input: "品牌定位、目标受众、语气和内容方向", system: "保存品牌档案版本，作为后续 agent 的输入", output: "可复用的品牌上下文" },
      { number: "02", title: "确认内容策略", input: "品牌档案版本", system: "策略 agent 生成结构化草稿，用户检查后确认", output: "已确认策略" },
      { number: "03", title: "形成选题计划", input: "已确认策略与发布节奏", system: "选题 agent 按 30 天发布时段生成候选选题", output: "可选择的内容计划" },
      { number: "04", title: "生成并编辑草稿", input: "选题、品牌上下文和平台", system: "内容 agent 生成标题、开场、结构、正文和行动号召", output: "可编辑内容版本" },
      { number: "05", title: "评估并提交反馈", input: "当前内容版本", system: "评估 agent 给出四维解释，用户选择反馈方向", output: "评估报告与反馈事件" },
      { number: "06", title: "改进、确认与复评", input: "反馈、原稿和目标", system: "生成改进建议；用户应用、放弃或继续编辑，再保存新版本", output: "新版本、事件记录与复评入口" },
    ],
    workflowRows: [
      { label: "策略", input: "品牌档案版本", process: "策略 agent 生成结构化草稿", output: "用户确认的策略版本" },
      { label: "内容", input: "选题、品牌、平台", process: "内容 agent 生成结构化草稿，应用层校验数据结构", output: "可编辑内容版本" },
      { label: "评估", input: "当前版本与品牌版本", process: "AI 提供子项解释，应用层计算确定性总分", output: "四维报告与建议" },
      { label: "反馈改进", input: "反馈类型、分类和说明", process: "创建或恢复任务，生成定向建议，等待人工确认", output: "应用或放弃，并保留版本关系" },
    ],
    visuals: [
      { src: "/growthos/ideas.png", alt: "GrowthOS 选题中心真实界面", title: "30 天选题计划", detail: "真实 GrowthOS 工作台截图：策略确认后生成发布时段和可选择的内容选题。", width: 1440, height: 1120 },
      { src: "/growthos/editor.png", alt: "GrowthOS 内容编辑器真实界面", title: "内容版本编辑器", detail: "真实界面展示平台草稿、版本历史、人工编辑与保存新版本。", width: 1440, height: 1120 },
      { src: "/growthos/review-report.png", alt: "GrowthOS 内容评估报告真实界面", title: "四维内容评估", detail: "真实界面展示品牌匹配度、增长潜力、内容质量与可信度准备度。", width: 1440, height: 1120 },
    ],
    iterations: [
      { label: "迭代一", title: "让生成结果拥有结构化反馈", evidence: "第一轮文档记录三种反馈、分类、说明、权限、幂等和刷新恢复；全量 144 项测试通过。", change: "将反馈事件绑定到当前内容版本，为下一步改进提供明确输入。", result: "反馈从孤立评价变成可追踪的工作流信号。" },
      { label: "迭代二", title: "把反馈接到 AI 改进与人工确认", evidence: "本地隔离浏览器流程记录了需要修改、不适合使用、真实模型建议、人工应用、新版本与复评。", change: "复用内容 agent、编辑器和评估模块，不建立额外后台；建议只有在用户确认后才保存。", result: "复验记录展示了闭环行为；版本分数作为观察指标单独呈现。" },
      { label: "迭代三", title: "让建议更具体，并标清假设边界", evidence: "五个合成案例基线/候选各五次真实模型生成；行动具体性两组均 5/5，假设与证据边界复核为 2/5 → 5/5。", change: "将“受众场景 → 具体行动 → 可观察标准”和假设标注写入 content-v1.1.0 提示词。", result: "在十份固定文本中，候选输出更容易进入人工复核。" },
    ],
    nextSteps: ["在获得同意并使用隔离数据后，观察目标用户的编辑负担、建议采纳和任务完成情况。", "为高关注度事实主张补充来源承接与人工核验路径。", "沿用人工确认、版本保留和事件追踪，评估自动发布与长期记忆的适用场景。"],
    evidenceNote: "工程证据来自本地隔离演示、真实模型生成记录、自动化回归和项目文档；案例中的完整工作流验证以本地运行记录为依据。",
  },
  "novera-ai": {
    audience: "面向需要从经营资料、会议纪要、业务规范和分析文件中查找事实的企业知识工作者，当前固定语料覆盖这些知识任务。",
    lead: "Novera AI 将文档转成可检索、可引用的知识回答。我关注的不只是能否作答，也包括文档解析、证据筛选、检索、生成、引用核验和原文定位如何连成一条可检查的流程。",
    journey: [
      { number: "01", title: "进入工作空间", input: "在线工作空间或明确标注的演示场景", system: "加载知识状态、文档列表与任务入口", output: "可开始的知识工作空间" },
      { number: "02", title: "导入知识文档", input: "PDF、DOCX、Markdown、TXT、XLSX、PPTX 或 PNG", system: "校验文件并完成初始化、签名上传与处理排队", output: "带状态的文档记录" },
      { number: "03", title: "解析与准入", input: "原始文件内容", system: "按格式提取文本、表格、工作表行、幻灯片文本或 OCR，并记录定位信息与告警", output: "可用内容、需复核状态或受控限制" },
      { number: "04", title: "建立检索上下文", input: "通过准入的内容块", system: "规范化、分块、生成 1536 维 Embedding，写入进程内向量索引", output: "可被问题检索的上下文" },
      { number: "05", title: "提出问题并生成回答", input: "事实、比较、分析或知识缺口问题", system: "Query Embedding、余弦检索、DeepSeek 结构化回答", output: "回答与主张" },
      { number: "06", title: "查看证据与来源", input: "回答中的主张与检索内容块", system: "校验引用片段、来源文档与位置定位", output: "可回到原文的证据链" },
      { number: "07", title: "继续行动或补充资料", input: "回答、来源和质量状态", system: "继续追问、复核来源，或为知识缺口补充材料", output: "可解释的下一步" },
    ],
    workflowRows: [
      { label: "文档处理", input: "多格式文件", process: "解析 → 规范化 → 分块，并保留页、行、工作表或幻灯片位置", output: "结构化内容与来源定位" },
      { label: "检索", input: "通过证据准入的内容块", process: "DashScope text-embedding-v2 + 进程内向量索引余弦检索", output: "问题相关的上下文" },
      { label: "生成", input: "问题与检索上下文", process: "DeepSeek 闪速模型生成结构化回答和主张", output: "非空回答与主张集合" },
      { label: "证据", input: "主张、引用片段、来源", process: "程序校验引用、来源和位置；依据不足时提供边界答复", output: "证据浏览器与质量状态" },
    ],
    visuals: [
      { src: "/novera/preview-home.png", alt: "Novera AI 工作空间首页真实截图", title: "知识工作空间", detail: "真实 Preview 截图，展示知识工作空间与任务入口。", width: 1440, height: 1000 },
      { src: "/novera/preview-assistant.png", alt: "Novera AI 助手真实截图", title: "AI 助手", detail: "真实 Preview 截图，展示问题输入、回答组织与来源链路。", width: 1440, height: 1000 },
      { src: "/novera/preview-evidence.png", alt: "Novera AI 证据浏览器真实截图", title: "主张 / 证据", detail: "真实 Preview 截图，展示主张、证据、来源与定位的关联。", width: 1440, height: 1000 },
    ],
    testCases: [
      { label: "有答案的问题", question: "第二季度留存复盘使用了哪个激活事件，留存率如何变化？", evidence: "`01-q2-retention-review.md` 的对应行记录 48 小时发布窗口、4 月至 6 月批次 52% 与 1 月至 3 月基线 68%，并标注这是领先指标。", acceptance: "检索命中目标文档，回答保留指标边界，引用片段能回到原文。" },
      { label: "跨文档问题", question: "分析早期留存下降的原因，并区分强证据与方向性信号。", evidence: "留存复盘、发布说明与新手引导实验分别提供观察信号、变更背景和实验窗口。", acceptance: "逐项核对来源覆盖和结论关联，并区分相关性、合理机制与因果证据。" },
      { label: "知识缺口问题", question: "阿斯特里亚工作云在 2026 年 7 月的年度经常性收入是多少？", evidence: "固定语料将其标记为 `财务指标不在语料中`，预期来源与证据为空。", acceptance: "返回“资料未提供”边界答复，提示补充财务来源，不生成预算或年度经常性收入数字。" },
    ],
    iterations: [
      { label: "迭代一", title: "把多格式解析推进为证据契约", evidence: "固定 20 份合成文档、40 个问题；v2/v3 独立标准覆盖 PDF、DOCX、Markdown、TXT、XLSX、PPTX、PNG 与 OCR 边界。", change: "补充结构保留、提取告警、需复核状态、来源定位和问答准入规则。", result: "20/20 文档资料档案、40/40 问题按适用 v3 标准通过；结论限定于固定语料。" },
      { label: "迭代二", title: "从“模型给答案”走向以证据为先的知识工作空间", evidence: "真实运行记录包含 40 个非空生成结果、实际检索内容块、主张、证据和来源定位。", change: "将答案拆成主张，并把引用片段、来源文档和位置放入可查看的证据链。", result: "60 条有效证据、0 条无效引用、0 条无依据声明；其中 4 道知识缺口题以有依据的边界答复通过。" },
    ],
    nextSteps: ["在隔离环境中重新验收线上完整上传、处理、检索与问答链路，单独记录正式环境结果。", "将固定语料的进程内向量索引路径迁移到隔离的远端测试存储，验证资源与性能。", "为图表源数据和手写内容建立置信度、人工确认与再入库的独立测试。"],
    evidenceNote: "Novera 的 20/20、40/40 与 60 条有效证据来自固定合成语料的真实本地运行与 v3 离线复评；本轮验证覆盖本地语料、RAG 检索、回答生成和主张 / 证据核验。线上完整链路作为独立验证方向持续推进。",
  },
  evidra: {
    audience: "面向中文长文创作者、内容顾问与小型内容团队，围绕观点依据、编辑建议和复核设计审查流程。",
    lead: "Evidra 面向中文长文作者，设计了检查观点原文依据、定位优先修改项的编辑流程。流程包括读者问题、观点与证据、可编辑建议、人工修改和再次检查。",
    journey: [
      { number: "01", title: "创建审查", input: "标题、正文、可选发布日期或非敏感内置示例", system: "校验文章边界并建立一次可追踪审查", output: "可编辑的文章工作区" },
      { number: "02", title: "运行初步分析", input: "文章段落", system: "生成四维评分、潜在读者问题与诊断任务", output: "报告概览与问题列表" },
      { number: "03", title: "查看证据", input: "问题与诊断结果", system: "将候选引用绑定到第 n 段原文，并校验连续引用片段", output: "有效、缺失或无效状态" },
      { number: "04", title: "阅读诊断", input: "回答性、风险级别和缺失信息", system: "把问题转成作者可以处理的解释与优先级", output: "明确的修改方向" },
      { number: "05", title: "生成建议", input: "诊断与段落", system: "生成作者补充建议或基于已有证据的内容草稿", output: "可审阅的修改动作" },
      { number: "06", title: "人工修改", input: "原文、建议与修改清单", system: "作者决定采纳、调整或忽略，并保存自己的正文版本", output: "新的可恢复草稿" },
      { number: "07", title: "再次检查", input: "基线报告与修改后正文", system: "重新运行分析并生成可比较快照", output: "评分、维度、诊断与证据对照" },
      { number: "08", title: "恢复与继续", input: "当前浏览器工作区", system: "恢复报告、草稿和最近历史，并标记缓存恢复状态", output: "可继续的单用户工作流" },
    ],
    workflowRows: [
      { label: "分析", input: "文章标题、正文与日期", process: "模型分析问题、评分和诊断；程序负责字段校验与状态机", output: "报告与诊断列表" },
      { label: "证据", input: "诊断候选引用", process: "按段落编号查找原文，要求引用片段是连续子串", output: "可定位的证据状态" },
      { label: "建议", input: "诊断、段落与有效证据", process: "模型生成修改建议或内容草稿，程序检查关联与引用", output: "可加入修改清单的建议" },
      { label: "再次检查", input: "基线快照与新正文", process: "重新分析，比较可观察的分数、维度和诊断数量", output: "修改前 / 修改后与继续编辑入口" },
    ],
    visuals: [],
    iterations: [
      { label: "迭代一", title: "让再次检查状态回到真实语义", evidence: "提交 `5e3fe8c` 与历史安全回归覆盖运行中、已完成、已缓存、错误和比较摘要。", change: "将缓存恢复与新复核分开，并把分数变化、诊断数量和证据状态独立呈现。", result: "用户能区分“恢复旧结果”和“完成新分析”；比较只描述实际可观察变化。" },
      { label: "迭代二", title: "加入浏览器本地审查历史", evidence: "提交 `5d3d853` 与已就绪 Preview 部署记录支持当前浏览器最近 10 条、30 天清理和恢复入口。", change: "围绕单用户场景增加本地历史列表与恢复操作，文章内容保存在当前浏览器。", result: "单用户可从当前浏览器继续审查，案例清楚说明本地历史的使用范围。" },
      { label: "迭代三", title: "用诊断驱动一次内容补强复验", evidence: "历史 Preview 运行记录：同一篇非敏感测试文章首次 75/100，完成有依据修改后再次检查为 86/100。", change: "补充抽样、角色分工、争议升级、记录字段和适用边界，保持评分算法不变。", result: "该记录呈现同一工作流中评分的变化；后续可结合外部来源核验与多样本任务继续验证。" },
    ],
    nextSteps: ["为目标用户任务安排受控的非敏感样例测试，观察作者如何理解证据与建议。", "补齐当前版本 Preview 的完整浏览器链路，并在两个独立浏览器配置下验证本地历史。", "继续记录模型来源与运行条件，让评分、证据状态和外部事实核验保持独立。"],
    evidenceNote: "Evidra 的页面与状态依据源码、历史回归和 Preview 记录整理；75 → 86 是同一篇文章在一次修改与再次检查中的历史结果。证据用于定位文章内部依据，外部来源核验与目标用户任务观察作为后续验证方向。",
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
    <section className={`case-hero case-hero-${project.accent}`}><div className="container"><Link href="/#work" className="back-link">← 返回精选项目</Link><div className="case-hero-grid"><div><p className="eyebrow">项目 {project.index} <span className="eyebrow-line" /></p><h1>{project.title}</h1><p className="case-category">{project.category}</p><p className="case-description">{project.description}</p><div className="case-hero-links"><ExternalLink href={project.demoUrl}>在线体验</ExternalLink><ExternalLink href={project.githubUrl}>源码仓库</ExternalLink></div></div><div><ProductPreview variant={previewVariant} /><p className="case-preview-caption">{isEvidra ? "产品界面结构示意 / 非实机截图" : "产品界面方向示意；真实界面见下方证据"}</p></div></div><div className="case-facts"><div><span>职责</span><strong>{project.role}</strong></div><div><span>状态</span><strong>{project.status}</strong></div><div><span>重点</span><strong>{project.focus.join(" · ")}</strong></div></div></div></section>
    <div className={`case-layout case-story-layout container case-layout-${project.slug}`}><aside className="case-nav" aria-label="项目案例章节"><p>本页内容</p>{storyNav.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside><article className="case-content case-story-content">
      <section className="case-section story-section" id="story"><p className="section-kicker">01 / 问题与目标场景</p><div className="story-heading-grid"><h2>{project.problem}</h2><div className="story-side-note"><span>目标场景</span><p>{story.audience}</p><span>我负责的工作</span><p>{project.role}</p></div></div><p className="case-body">{story.lead}</p><div className="story-problem-list">{project.problemDetails.map((detail, index) => <div key={detail}><span>0{index + 1}</span><p>{detail}</p></div>)}</div></section>
      <section className="case-section journey-section" id="journey"><p className="section-kicker">02 / 核心任务路径</p><h2>从用户输入到可继续处理的结果</h2><p className="case-body">以下按任务中的输入、系统处理和用户可用的结果拆解。</p><div className="journey-list">{story.journey.map((step) => <article key={step.number} className="journey-step"><div className="journey-step-index">{step.number}</div><div className="journey-step-main"><h3>{step.title}</h3><div className="journey-step-grid"><p><span>输入</span>{step.input}</p><p><span>系统处理</span>{step.system}</p><p><span>输出</span>{step.output}</p></div></div></article>)}</div>{story.visuals.length > 0 ? <div className="story-visuals"><div className="story-visual-heading"><span>真实产品界面</span><p>界面截图与产品示意分别标注；截图来自项目记录。</p></div><div className="story-visual-grid">{story.visuals.map((visual) => <figure key={visual.src}><a href={visual.src} target="_blank" rel="noreferrer"><Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} sizes="(max-width: 900px) 100vw, 720px" /></a><figcaption><strong>{visual.title}</strong><span>{visual.detail}</span></figcaption></figure>)}</div></div> : <div className="story-schematic"><ProductPreview variant={previewVariant} /><div><span>产品界面示意</span><p>Evidra 使用结构示意展示信息组织；产品操作请打开在线 MVP。</p></div></div>}{story.testCases && <div className="story-test-cases"><div className="story-visual-heading"><span>代表性验证任务</span><p>问题、材料和验收标准来自固定测试语料。</p></div>{story.testCases.map((test) => <article key={test.label}><header><span>{test.label}</span><b>测试案例</b></header><h3>{test.question}</h3><div><p><strong>证据材料</strong>{test.evidence}</p><p><strong>验收标准</strong>{test.acceptance}</p></div></article>)}</div>}</section>
      <section className="case-section decision-section" id="decisions"><p className="section-kicker">03 / 产品判断</p><h2>围绕项目核心任务做取舍</h2><div className="decision-list">{project.decisions.map((decision) => <article className="decision-card" key={decision.number}><span className="decision-number">{decision.number}</span><div><p className="decision-label">产品判断</p><h3>{decision.decision}</h3><div className="decision-details"><div><span>任务与依据</span><p>{decision.why}</p></div><div><span>方案取舍</span><p>{decision.tradeoff}</p></div><div><span>进入产品</span><p>{decision.result}</p></div></div></div></article>)}</div></section>
      <section className="case-section ai-workflow-section" id="ai-workflow"><p className="section-kicker">04 / AI 工作流与技术实现</p><h2>模型、程序规则和用户判断如何衔接</h2><div className="ai-workflow-table"><div className="ai-workflow-head"><span>环节</span><span>输入</span><span>处理</span><span>输出</span></div>{story.workflowRows.map((row) => <div className="ai-workflow-row" key={row.label}><strong>{row.label}</strong><span>{row.input}</span><span>{row.process}</span><span>{row.output}</span></div>)}</div><details className="deep-reading"><summary>查看实现细节</summary><div><p>{project.slug === "novera-ai" ? "Novera 的本地验收链路使用格式感知解析器、规范化与分块、DashScope text-embedding-v2、进程内向量索引、DeepSeek deepseek-flash，以及主张 / 证据校验。线上 MVP 入口已确认可达，下一轮将单独记录完整上传、处理、检索与问答链路。" : project.slug === "growthos" ? "GrowthOS 复用了现有认证、数据库行级权限与存储模块、演示存储、AI agent 和版本模型。评估分数用于启发式参考；生成建议经用户确认后进入新版本。" : "Evidra 的证据校验器根据段落编号找到原文段落，并要求引用片段是连续子串；再次检查比较呈现分数、维度和诊断数量的变化，浏览器历史保存在当前浏览器。"}</p><p>以下实现细节说明产品结构与工程行为；各项验证结果按对应运行条件记录。</p></div></details></section>
      <section className="case-section iteration-section" id="iteration"><p className="section-kicker">05 / 产品迭代记录</p><h2>每轮迭代都连接观察、改动与复验</h2><p className="case-body">按实际记录展开每轮的观察依据、产品改动和复验结果。</p><div className="iteration-story-list">{story.iterations.map((item) => <article key={item.title}><span className="iteration-story-label">{item.label}</span><div className="iteration-story-content"><h3>{item.title}</h3><dl className="iteration-story-grid"><div><dt>观察依据</dt><dd>{item.evidence}</dd></div><div><dt>实际改动</dt><dd>{item.change}</dd></div><div><dt>复验结果</dt><dd>{item.result}</dd></div></dl></div></article>)}</div></section>
      <section className="case-section outcome-section" id="outcome"><p className="section-kicker">06 / 验证与个人贡献</p><h2>我负责的产品判断、实现协作与验收</h2><div className="outcome-facts">{Object.entries({ "目标用户": project.validation.targetUsers, "验证范围": project.validation.realAnalyses, "工作流": project.validation.sessions, "迭代记录": project.validation.majorIterations }).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="contribution-grid"><div><span>产品判断</span><p>明确目标任务与 MVP 范围，设计关键流程、用户确认点和验收标准。</p></div><div><span>AI 协作</span><p>GPT 协助比较方案、拆解任务和整理验收；Codex 协助定位实现、完成范围内改动并运行检查。</p></div><div><span>验收方式</span><p>将流程拆为输入、预期、实际输出与来源，按项目记录本地运行、固定语料、历史记录和线上入口状态。</p></div><div><span>本案例证据</span><p>{story.evidenceNote}</p></div></div><div className="validation-evidence"><span className="proof-label">证据记录 / 可追溯材料</span>{project.validationEvidence.map((item) => <p key={item}><i />{item}</p>)}</div><div className="next-step-panel"><div><span className="proof-label">下一轮迭代</span><h3>下一轮验证</h3></div><ul>{story.nextSteps.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="case-next"><div className="case-next-links"><ExternalLink href={project.demoUrl}>在线体验</ExternalLink><ExternalLink href={project.githubUrl}>源码仓库</ExternalLink></div><Link className="button button-dark" href="/#work">查看其他项目 <span>↗</span></Link></div></section>
    </article></div>
  </>;
}
