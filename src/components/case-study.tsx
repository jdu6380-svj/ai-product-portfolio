import Image from "next/image";
import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import type { Project } from "@/content/portfolio";
import { ProductPreview } from "@/components/product-preview";
import { GrowthOSExperienceLink } from "@/components/growthos-experience-link";
import { projectTransitionMedia } from "@/content/project-transition-media";
import { ContentCloudReveal } from "@/components/content-cloud-reveal";
import { CaseSectionNav } from "@/components/case-section-nav";

type JourneyStep = { number: string; title: string; input: string; system: string; output: string };
type WorkflowRow = { label: string; input: string; process: string; output: string };
type IterationStory = { label: string; title: string; evidence: string; change: string; result: string };
type ProductVisual = { src: string; alt: string; title: string; detail: string; width: number; height: number };
type TestCase = { label: string; question: string; evidence: string; acceptance: string };
type StoryData = { audience: string; lead: string; tutorial: string; humanBoundary: string; contributions: { title: string; detail: string }[]; journey: JourneyStep[]; workflowRows: WorkflowRow[]; visuals: ProductVisual[]; iterations: IterationStory[]; nextSteps: string[]; evidenceNote: string; testCases?: TestCase[] };

const storyNav = [["overview", "项目介绍与教程"], ["context", "用户与需求"], ["workflow", "产品流程"], ["validation", "迭代与验收"], ["contribution", "我的负责工作"]] as const;

const storyData: Record<Project["slug"], StoryData> = {
  growthos: {
    audience: "面向个人品牌经营者、创作者与小型内容团队，围绕内容策略、选题、编辑和复盘设计生产流程。",
    lead: "GrowthOS 把品牌画像、策略、选题、内容生成、评估与反馈改进连成一条内容生产流程。我负责收敛 MVP 范围、设计人工确认点，并让反馈关联到具体内容版本。",
    tutorial: "先建立并保存品牌画像，再确认策略草稿；从选题计划挑选主题，生成后在编辑器修订并保存 Revision。评估内容后提交结构化反馈，检查改进任务与 AI 建议，确认应用或放弃，再对新版本复评。",
    humanBoundary: "AI 负责提出策略、选题、草稿、评估解释和针对性改进建议；创作者负责确认品牌上下文、选题、内容表达、建议采纳与最终保存。风险门禁检查模型调用前输入和生成后输出，发布仍由人决定。",
    contributions: [
      { title: "场景与 MVP", detail: "面向个人品牌与小型内容团队，收敛品牌上下文、策略、选题、生成、评估与反馈迭代的主路径。" },
      { title: "产品流程与状态", detail: "设计六阶段工作台、内容 Revision 与反馈改进任务，明确创建/恢复、幂等和刷新恢复等边界。" },
      { title: "反馈与人机协同", detail: "定义可直接使用、需要修改、不适合使用三类反馈；Agent 给出定向建议，用户决定应用或放弃并保存新版本。" },
      { title: "Prompt 与风险控制", detail: "迭代具体行动与假设边界的提示词，增加高风险内容门禁、输入预检和输出复检。" },
      { title: "测试集与验收", detail: "组织 5 个固定合成案例的基线/候选真实模型生成和人工复核；项目记录为 34 个测试文件、172 项通过、1 项跳过，并通过类型检查、Lint 和生产构建。" },
    ],
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
      { src: "/growthos/brand-context.jpg", alt: "GrowthOS 可编辑品牌理解基线", title: "品牌画像与上下文", detail: "用户维护身份、受众、风格、内容比例与边界；只有保存确认的 Revision 才成为下游 Agent 的依据。", width: 3420, height: 1970 },
      { src: "/growthos/workflow.jpg", alt: "GrowthOS 六阶段 MVP 工作流", title: "从品牌画像到最终版本", detail: "工作流标出策略草稿、用户确认、选题、内容编辑、AI 审核与最终保存；Agent 输出需经过结构校验，关键决策由用户完成。", width: 3420, height: 1970 },
      { src: "/growthos/ideas.jpg", alt: "GrowthOS 30 天选题计划真实界面", title: "30 天选题计划", detail: "按照策略和发布节奏组织候选选题；优先级分仅作参考，用户自行选择是否进入创作。", width: 3418, height: 1949 },
      { src: "/growthos/content-generation.jpg", alt: "GrowthOS 内容生成与编辑工作台", title: "内容生成与编辑", detail: "内容生成工作台把标题、开场、结构和正文组织为可编辑草稿；作者检查 AI 输出后再修改并保存内容版本。", width: 3418, height: 1954 },
      { src: "/growthos/content-library.jpg", alt: "GrowthOS 内容资产库与版本管理界面", title: "内容资产与评估状态", detail: "集中查看草稿、Revision、最近更新和评估状态，编辑与复核入口关联到具体内容版本。", width: 3418, height: 1965 },
      { src: "/growthos/feedback-loop.jpg", alt: "GrowthOS 结构化反馈与 AI 改进建议界面", title: "反馈驱动改进", detail: "用户选择可直接使用、需要修改或不适合使用，反馈关联当前版本并生成定向建议；作者应用或放弃后再复评。", width: 3418, height: 1960 },
    ],
    iterations: [
      { label: "迭代一", title: "让生成结果拥有结构化反馈", evidence: "第一轮文档记录三种反馈、分类、说明、权限、幂等和刷新恢复；全量 144 项测试通过。", change: "将反馈事件绑定到当前内容版本，为下一步改进提供明确输入。", result: "反馈从孤立评价变成可追踪的工作流信号。" },
      { label: "迭代二", title: "把反馈接到 AI 改进与人工确认", evidence: "本地隔离浏览器流程记录了需要修改、不适合使用、真实模型建议、人工应用、新版本与复评。", change: "复用内容 agent、编辑器和评估模块，不建立额外后台；建议只有在用户确认后才保存。", result: "复验记录展示了闭环行为；版本分数作为观察指标单独呈现。" },
      { label: "迭代三", title: "让建议更具体，并标清假设边界", evidence: "五个合成案例基线/候选各五次真实模型生成；行动具体性两组均 5/5，假设与证据边界复核为 2/5 → 5/5。", change: "将“受众场景 → 具体行动 → 可观察标准”和假设标注写入 content-v1.1.0 提示词。", result: "在十份固定文本中，候选输出更容易进入人工复核。" },
    ],
    testCases: [
      { label: "反馈与版本状态", question: "三类反馈是否关联当前 Revision，并在重复提交或刷新后保持一致？", evidence: "第一轮文档记录反馈类型、分类、说明、权限、幂等和刷新恢复；全量 144 项自动化测试通过。", acceptance: "反馈归属正确版本；重复请求不创建重复任务；刷新后能恢复下一步动作。" },
      { label: "改进建议与人工确认", question: "反馈能否触发定向建议，同时保留创作者的最终决定？", evidence: "本地隔离浏览器流程记录真实模型建议、人工应用、新版本保存和复评；建议也可被放弃。", acceptance: "未确认建议不覆盖正文；应用后形成可追溯的新 Revision。" },
      { label: "内容边界对照", question: "新 Prompt 能否标明假设边界，并在高风险请求时受控降级？", evidence: "5 个合成案例各做 5 次基线与候选生成；边界人工复核 2/5 → 5/5；行动具体性均为 5/5。", acceptance: "固定语料中假设与证据边界可辨；输入预检和输出复检拦截明确的高风险内容。" },
    ],
    nextSteps: ["在获得同意并使用隔离数据后，观察目标用户的编辑负担、建议采纳和任务完成情况。", "为高关注度事实主张补充来源承接与人工核验路径。", "沿用人工确认、版本保留和事件追踪，评估自动发布与长期记忆的适用场景。"],
    evidenceNote: "工程证据来自本地隔离演示、真实模型生成记录、自动化回归和项目文档；案例中的完整工作流验证以本地运行记录为依据。",
  },
  "novera-ai": {
    audience: "面向需要从经营资料、会议纪要、业务规范和分析文件中查找事实的企业知识工作者，当前固定语料覆盖这些知识任务。",
    lead: "Novera AI 将文档转成可检索、可引用的知识回答。我关注的不只是能否作答，也包括文档解析、证据筛选、检索、生成、引用核验和原文定位如何连成一条可检查的流程。",
    tutorial: "先上传知识文件并检查解析状态，需复核的资料先审查再进入问答范围。提出事实、比较或分析问题后，先读回答和质量状态，再打开单条主张对应的来源片段核对；资料缺失时补充知识，不将推测当作答案。",
    humanBoundary: "系统负责格式解析、向量检索、回答草拟、主张拆分与引用一致性校验；知识管理员负责文档准入和解析告警，业务用户负责原文核验与结论适用性判断。检索命中和评分不能自动构成业务事实认定。",
    contributions: [
      { title: "场景定义与 MVP 规划", detail: "面向企业制度、业务流程与专业资料分散、人工检索耗时、AI 回答缺少可靠依据的问题，定义上传、解析、检索、回答、溯源与知识缺口提示的 MVP 主路径。" },
      { title: "多格式 RAG 与技术方案", detail: "设计 PDF、DOCX、XLSX、PPTX、Markdown、TXT 与图片/OCR 的格式解析、结构保留、分块、来源定位和问答准入；本地评测链路使用 DashScope text-embedding-v2、进程内向量检索与 DeepSeek 生成。" },
      { title: "答案证据契约", detail: "定义“答案—事实主张—证据—来源”的关联，检查引用存在性、来源一致性、原文位置与无依据声明，并在界面中呈现核验状态。" },
      { title: "风险与人机边界", detail: "对解析告警、低置信度图表与手写内容设置复核边界；资料不足时说明知识缺口，不补猜事实。系统负责检索、草拟与一致性检查，知识管理员决定文档准入，业务用户核对来源。" },
      { title: "固定测试集与验收", detail: "构建 20 份合成文档、40 道问题的固定集，覆盖 7 类文档和图片场景；本地真实 RAG 运行产生 60 条有效证据，v3 离线复评为 20/20 文档档案、40/40 问题通过适用标准，记录 0 条无效引用与 0 条无依据声明。线上完整链路需独立验收。" },
    ],
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
      { src: "/novera/knowledge-home.jpg", alt: "Novera AI 企业知识工作台首页", title: "知识工作台与知识状态", detail: "首页把提问入口、知识准备状态和文档处理概况放在一起；知识健康度是覆盖状态提示，不作为答案质量结论。", width: 2930, height: 1668 },
      { src: "/novera/answer-evidence.jpg", alt: "Novera AI 有来源支持的回答及可核验状态", title: "有依据回答与质量状态", detail: "截图中的 P0 安全事件问题给出明确答复，并显示支持证据、来源数量和通过状态；评分是核验辅助，不替代用户阅读原文。", width: 3418, height: 1960 },
      { src: "/novera/answer-boundary.jpg", alt: "Novera AI 对资料不足问题的边界回答", title: "知识缺口与拒答边界", detail: "截图中的跨文档处置流程问题未得到足够具体的依据，界面标记“需要复核证据”并列出知识缺口；系统不补猜响应时限、分级阈值等细节。", width: 3414, height: 1956 },
      { src: "/novera/evidence-browser.jpg", alt: "Novera AI 原文证据来源浏览器", title: "来源定位与原文复核", detail: "从单条结论回看原文引用、来源文档和章节位置，帮助用户判断证据是否真正支持回答。", width: 3418, height: 1946 },
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
    tutorial: "粘贴正文或上传 Markdown/纯文本后启动分析，先查看四维报告和问题诊断，再逐条打开观点证据与原文位置。将建议加入清单或忽略，作者自行编辑正文并提交确认版本，最后再次检查并对比分数、诊断与证据状态。",
    humanBoundary: "AI 负责识别候选观点、整理诊断与提出编辑建议；程序校验引用能否在指定段落找到连续原文片段；作者负责判断语境、编辑正文、选择修改项和提交复核。评分变化与证据支持状态分开展示，内部原文匹配不代表外部事实已核验。",
    contributions: [
      { title: "场景与质量维度", detail: "面向中文长文发布前审查，设计问题覆盖、事实完整、结构清晰、可验证性四维评估和问题优先级。" },
      { title: "证据与风险状态", detail: "规划观点、原文段落和支持状态的关联；区分依据充分、部分支持与依据不足，不将评分提升等同事实核验。" },
      { title: "人工编辑闭环", detail: "设计原文与建议对照、加入/忽略清单、作者修改和再次检查；建议不自动覆盖正文。" },
      { title: "安全与隐私边界", detail: "提交前进行安全预检；凭据、个人敏感信息和具体伤害操作不进入生成流程，审查历史限定在当前浏览器。" },
      { title: "测试与验收", detail: "按状态回归运行中、已完成、已缓存、错误及比较摘要；尚无可追溯的单次运行记录支持具体分数对照。" },
    ],
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
    visuals: [
      { src: "/evidra/article-workbench.jpg", alt: "Evidra 粘贴文章并启动分析的文章工作台", title: "文章工作台", detail: "标题、正文编辑区与四步审查指南并列；作者确认输入后再启动分析，系统不会自动改写正文。", width: 2940, height: 1670 },
      { src: "/evidra/upload-workbench.jpg", alt: "Evidra 文档上传和快速开始工作台", title: "文件接入与开始审查", detail: "支持 Markdown 与纯文本文件上传，也可直接粘贴内容；用户决定何时启动分析。", width: 2940, height: 1664 },
      { src: "/evidra/review-report.jpg", alt: "Evidra 四维可信度评分报告", title: "四维评分与风险摘要", detail: "问题覆盖度、事实完整度、结构清晰度和可验证性分别呈现；总分用于定位检查方向，不等同事实核验。", width: 2940, height: 1666 },
      { src: "/evidra/evidence-analysis.jpg", alt: "Evidra 关键观点与原文证据关联分析", title: "观点与原文证据", detail: "关键观点关联原文段落、置信等级与判断说明；用户可回到文章核对片段，内部证据支持不等于外部事实核验。", width: 2940, height: 1670 },
      { src: "/evidra/diagnostics.jpg", alt: "Evidra 内容问题诊断和风险分级", title: "问题诊断与风险优先级", detail: "问题列表展示影响、原因和建议，并区分通过、注意等状态，供作者确定处理顺序。", width: 2940, height: 1666 },
      { src: "/evidra/revision-suggestions.jpg", alt: "Evidra 原文与可加入修改清单的建议", title: "原文对照与建议确认", detail: "并排阅读原文和建议，作者可加入修改清单或忽略；具体正文修改由作者执行。", width: 2940, height: 1656 },
      { src: "/evidra/recheck.jpg", alt: "Evidra 提交人工确认版本后的再次验证页面", title: "修改后再次复核", detail: "提交人工确认版本后比较修改前后的可观察变化；提交前执行安全预检，敏感信息和具体伤害操作不进入生成流程。", width: 2940, height: 1672 },
    ],
    iterations: [
      { label: "迭代一", title: "让再次检查状态回到真实语义", evidence: "提交 `5e3fe8c` 与历史安全回归覆盖运行中、已完成、已缓存、错误和比较摘要。", change: "将缓存恢复与新复核分开，并把分数变化、诊断数量和证据状态独立呈现。", result: "用户能区分“恢复旧结果”和“完成新分析”；比较只描述实际可观察变化。" },
      { label: "迭代二", title: "加入浏览器本地审查历史", evidence: "提交 `5d3d853` 与已就绪 Preview 部署记录支持当前浏览器最近 10 条、30 天清理和恢复入口。", change: "围绕单用户场景增加本地历史列表与恢复操作，文章内容保存在当前浏览器。", result: "单用户可从当前浏览器继续审查，案例清楚说明本地历史的使用范围。" },
      { label: "迭代三", title: "围绕诊断和复核建立验收边界", evidence: "现有源码与流程截图可核对诊断、证据定位、人工编辑和再次检查路径；未找到可追溯到单次运行的原始分数记录。", change: "将证据状态、评分和复核状态分开展示，避免把界面分数当作事实核验或内容效果。", result: "现有材料支持工作流与状态边界；不据此声称内容质量提升、真实用户效果或业务结果。" },
    ],
    testCases: [
      { label: "观点与原文证据", question: "关键观点能否回到指定段落，且引用片段确实存在？", evidence: "界面显示观点、原文依据、段落位置与置信等级；应用层检查引用是指定段落的连续子串。", acceptance: "有效引用可定位；部分支持与依据不足单独标记；不把内部匹配描述成外部事实核验。" },
      { label: "建议到人工修改", question: "建议能否对应具体问题，同时避免未经确认直接改写原文？", evidence: "界面提供影响、原因、建议和风险状态；作者可加入或忽略建议，再自行编辑。", acceptance: "建议可回到问题与证据；清单状态可区分；正文只在作者确认后更新。" },
      { label: "复查与状态恢复", question: "再次检查能否区分评分变化、证据状态和历史缓存？", evidence: "现有源码与回归记录覆盖运行中、完成、缓存恢复、错误与比较摘要；没有可追溯的原始评分对照记录。", acceptance: "缓存恢复不冒充新分析；各维度与证据状态分别比较；不展示缺少原始记录的分数变化。" },
    ],
    nextSteps: ["为目标用户任务安排受控的非敏感样例测试，观察作者如何理解证据与建议。", "补齐当前版本 Preview 的完整浏览器链路，并在两个独立浏览器配置下验证本地历史。", "继续记录模型来源与运行条件，让评分、证据状态和外部事实核验保持独立。"],
    evidenceNote: "现有可核验材料支持产品流程、证据定位和复核状态实现；尚无可追溯原始运行记录支撑单篇评分对照。内部证据匹配不等于外部事实核验，真实用户任务与业务效果仍待验证。",
  },
};

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span></a>;
}

export function CaseStudy({ project }: { project: Project }) {
  const story = storyData[project.slug];
  const transitionMedia = projectTransitionMedia[project.slug];
  const previewVariant = project.slug === "novera-ai" ? "novera" : project.slug as "evidra" | "growthos";
  return <>
    <ContentCloudReveal selector=".case-story-content .case-section > .section-kicker, .case-story-content .case-section > h2, .case-story-content .story-heading-grid, .case-story-content .overview-facts, .case-story-content .case-context-grid > div, .case-story-content .case-product-decisions article, .case-story-content .case-flow-node, .case-story-content .story-visual-grid figure, .case-story-content .case-ai-note, .case-story-content .story-test-cases article, .case-story-content .iteration-story-list article, .case-story-content .validation-evidence, .case-story-content .contribution-grid > div" />
    <section className={`case-hero case-hero-${project.accent}`}><div className="container"><Link href="/#project-introduction" className="back-link" transitionTypes={["project-back"]}>← 返回项目介绍</Link><div className="case-hero-grid"><div><p className="eyebrow">项目 {project.index} <span className="eyebrow-line" /></p><ViewTransition name={`project-title-${project.slug}`} share="project-title-morph" default="none"><h1>{project.title}</h1></ViewTransition><p className="case-category">{project.category}</p><p className="case-description">{project.description}</p><div className="case-hero-links">{project.slug === "growthos" ? <GrowthOSExperienceLink /> : <ExternalLink href={project.demoUrl}>在线体验</ExternalLink>}<ExternalLink href={project.githubUrl}>源码仓库</ExternalLink></div>{project.slug === "growthos" ? <p className="case-preview-access-note">GrowthOS 在线体验需要登录；下方提供免登录查看的完整流程截图。<a href="#workflow">查看核心流程截图</a></p> : null}</div><div><ViewTransition name={`project-image-${project.slug}`} share="project-image-morph" default="none">{transitionMedia.src ? <figure className="case-hero-shot"><Image src={transitionMedia.src} alt={transitionMedia.alt} width={story.visuals.find((visual) => visual.src === transitionMedia.src)?.width ?? 1440} height={story.visuals.find((visual) => visual.src === transitionMedia.src)?.height ?? 1120} sizes="(max-width: 900px) 100vw, 46vw" priority /><figcaption>{transitionMedia.caption} · 真实项目截图</figcaption></figure> : <div className="case-hero-transition-preview"><ProductPreview variant={previewVariant} compact /></div>}</ViewTransition><p className="case-preview-caption">真实产品界面；完整证据见下方任务路径</p></div></div></div></section>
    <div className={`case-layout case-story-layout container case-layout-${project.slug}`}><CaseSectionNav items={storyNav} /><article className="case-content case-story-content">
      <section className="case-section overview-section" id="overview"><p className="section-kicker">01 / 项目介绍与教程</p><div className="story-heading-grid"><div><h2>{project.shortDescription}</h2><p className="case-body">{story.lead}</p><div className="case-tutorial"><span>使用教程</span><p>{story.tutorial}</p></div></div><div className="story-side-note"><span>产品形态</span><p>{project.category}</p><span>目标用户</span><p>{story.audience}</p></div></div><div className="overview-facts"><div><span>我的角色</span><strong>{project.role}</strong></div><div><span>当前状态</span><strong>{project.status}</strong></div><div><span>项目入口</span><p>{project.slug === "growthos" ? <GrowthOSExperienceLink /> : <ExternalLink href={project.demoUrl}>在线体验</ExternalLink>}<ExternalLink href={project.githubUrl}>GitHub 源码</ExternalLink>{project.slug === "growthos" ? <><a href="#workflow">查看真实流程截图</a><span className="case-preview-access-note">GrowthOS 在线体验需要登录；完整流程截图可直接查看。</span></> : null}</p></div></div></section>
      <section className="case-section story-section" id="context"><p className="section-kicker">02 / 用户、场景、痛点、需求与目标</p><div className="story-heading-grid"><h2>{project.problem}</h2><div className="story-side-note"><span>场景边界</span><p>内容依据项目定位、产品实现与验证材料整理；用户群体是项目目标用户，不表述为已完成的用户调研。</p></div></div><div className="case-context-grid"><div><span>用户</span><p>{story.audience}</p></div><div><span>场景</span><p>{project.description}</p></div><div><span>痛点</span><p>{project.problemDetails.join(" ")}</p></div><div><span>需求</span><p>{project.insight}</p></div><div><span>目标</span><p>{project.shortDescription}</p></div></div><div className="case-product-decisions"><span>产品判断与取舍</span><div>{project.decisions.map((decision) => <article key={decision.number}><b>{decision.number}</b><div><h3>{decision.decision}</h3><p>{decision.why}</p><p><strong>取舍与落地：</strong>{decision.tradeoff} {decision.result}</p></div></article>)}</div></div></section>
      <section className="case-section workflow-section" id="workflow"><p className="section-kicker">03 / 产品流程图</p><h2>从用户输入到可继续处理的结果</h2><p className="case-body">顺着编号阅读，查看用户动作、系统处理、AI 机制与每一步产出。AI 组件和人工确认点来自项目实际方案。</p><div className="case-flow-diagram">{story.journey.map((step) => <article className="case-flow-node" key={step.number}><span>{step.number}</span><div className="case-flow-node-panel"><strong>{step.title}</strong><div className="case-flow-columns"><p><b>输入</b>{step.input}</p><p><b>处理</b>{step.system}</p><p><b>输出</b>{step.output}</p></div></div></article>)}</div><div className="story-visuals"><div className="story-visual-heading"><span>项目界面与流程对应</span><p>{story.visuals.length} 张项目截图；图注对应实际页面与可观察交互。</p></div><div className="story-visual-grid">{story.visuals.map((visual) => <figure key={visual.src}><a href={visual.src} target="_blank" rel="noreferrer"><Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} sizes="(max-width: 900px) 100vw, 720px" /><span className="story-visual-open-hint">点击查看原图</span></a><figcaption><strong>{visual.title}</strong><span>{visual.detail}</span></figcaption></figure>)}</div></div><div className="case-ai-note"><span>AI、规则与人工如何协作</span><div className="ai-workflow-table"><div className="ai-workflow-head"><span>环节</span><span>输入</span><span>处理</span><span>输出</span></div>{story.workflowRows.map((row) => <div className="ai-workflow-row" key={row.label}><strong>{row.label}</strong><span>{row.input}</span><span>{row.process}</span><span>{row.output}</span></div>)}</div><p className="case-human-boundary"><strong>人机边界与风险控制</strong>{story.humanBoundary}</p></div></section>
      <section className="case-section iteration-section" id="validation"><p className="section-kicker">04 / 几轮迭代与验收</p><h2>观察、判断、改动，再回到证据</h2><p className="case-body">每轮都按验证方法、评价标准、实际观察、方案调整和复验结果组织；测试范围以对应记录为准。</p>{story.testCases && <div className="story-test-cases"><div className="story-visual-heading"><span>代表性验收任务</span><p>问题、材料和验收标准来自固定测试语料。</p></div>{story.testCases.map((test) => <article key={test.label}><header><span>{test.label}</span><b>测试案例</b></header><h3>{test.question}</h3><div><p><strong>实际观察 / 证据材料</strong>{test.evidence}</p><p><strong>验收标准</strong>{test.acceptance}</p></div></article>)}</div>}<div className="iteration-story-list">{story.iterations.map((item) => <article key={item.title}><span className="iteration-story-label">{item.label}</span><div className="iteration-story-content"><h3>{item.title}</h3><dl className="iteration-story-grid"><div><dt>验证方法与观察</dt><dd>{item.evidence}</dd></div><div><dt>方案调整</dt><dd>{item.change}</dd></div><div><dt>验收与复验结果</dt><dd>{item.result}</dd></div></dl></div></article>)}</div><div className="validation-evidence"><span className="proof-label">验收证据 / 可追溯材料</span>{project.validationEvidence.map((item) => <p key={item}><i />{item}</p>)}</div></section>
      <section className="case-section contribution-section" id="contribution"><p className="section-kicker">05 / 我的负责工作</p><h2>场景定义、产品流程设计、验收标准</h2><p className="case-body">按产品定义、AI 协同、人机边界和验证交付呈现可核对的工作记录。</p><div className="contribution-grid">{story.contributions.map((item) => <div key={item.title}><span>{item.title}</span><p>{item.detail}</p></div>)}</div><div className="case-next"><div className="case-next-links">{project.slug === "growthos" ? <GrowthOSExperienceLink /> : <ExternalLink href={project.demoUrl}>在线体验</ExternalLink>}<ExternalLink href={project.githubUrl}>源码仓库</ExternalLink></div><Link className="button button-dark" href="/#project-introduction" transitionTypes={["project-back"]}>查看其他项目 <span>↗</span></Link></div></section>
    </article></div>
  </>;
}
