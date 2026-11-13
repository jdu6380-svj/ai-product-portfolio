const productPerspectives = [
  {
    number: "01",
    topic: "AI 行业趋势",
    title: "AI Agent 会取代传统 SaaS 吗？",
    answer: "AI Agent 更可能改变 SaaS 的使用方式，而不是直接取代它。SaaS 提供稳定的业务能力，Agent 负责理解目标、调用工具和跨功能执行任务；产品经理要明确哪些环节交给 AI，哪些环节保留人工控制。",
    keywords: ["AI Agent", "SaaS 融合", "任务执行", "人工控制"],
  },
  {
    number: "02",
    topic: "产品价值判断",
    title: "AI 产品应该优先追求智能程度，还是解决实际业务问题？",
    answer: "应先解决实际业务问题。模型能力强不等于产品有价值，关键是 AI 是否从用户任务出发改善流程、降低成本或提高决策效率，再用测试和业务指标验证，而不是为了使用新技术增加功能。",
    keywords: ["用户任务", "流程改善", "增量价值", "业务指标"],
  },
  {
    number: "03",
    topic: "职业能力变化",
    title: "未来 AI 产品经理最重要的能力会发生什么变化？",
    answer: "AI 产品经理将从传统的需求管理和功能交付，逐渐转向问题定义、AI 能力边界判断、人机协作工作流设计和效果验证。随着 AI 编程工具的发展，产品经理也能借助 Vibe Coding 独立完成部分原型和 MVP，降低对设计与开发环节的依赖。未来，单纯的信息传递和文档编写价值会逐渐下降，而业务判断、技术理解、产品创造力以及对最终结果负责的能力将变得更加重要。",
    keywords: ["问题定义", "Vibe Coding", "人机协作", "结果负责"],
  },
  {
    number: "04",
    topic: "组织与协作",
    title: "AI 如何改变企业的组织架构与人机协作模式？",
    answer: "AI 正在改变传统岗位的工作边界，未来企业可能从单纯依赖人工执行，逐渐转向人与 AI 协同完成任务。一部分重复性、标准化工作将由 AI 承担，而人类更多负责目标制定、复杂决策和结果把控。企业需要重新设计岗位职责、业务流程和协作机制，明确 AI 的执行权限、人工审核与决策边界，在提高组织效率的同时控制风险。",
    keywords: ["岗位边界", "AI 执行权限", "人工审核", "风险控制"],
  },
  {
    number: "05",
    topic: "企业竞争力",
    title: "AI 时代，企业的核心竞争力会发生什么变化？",
    answer: "随着大模型和 AI 工具逐渐普及，单纯拥有技术能力可能不再构成长期竞争优势。企业真正的竞争力将更多体现在数据积累、行业理解、业务流程、组织效率以及 AI 落地能力上。未来，企业之间的差距不只是能否使用 AI，而是谁能更有效地将 AI 融入业务场景，形成持续的效率优势、成本优势和差异化竞争壁垒。",
    keywords: ["数据积累", "行业理解", "AI 落地", "差异化壁垒"],
  },
];

export function ProductThinking() {
  return <div className="product-thinking" aria-label="产品观点与思考">
    <div className="thinking-perspectives">
      {productPerspectives.map((item) => <article className="thinking-perspective" key={item.number} aria-labelledby={`thinking-perspective-${item.number}`}>
        <div className="thinking-perspective-meta">
          <span className="thinking-perspective-number">{item.number}</span>
          <span className="thinking-perspective-topic">{item.topic}</span>
        </div>
        <div className="thinking-perspective-content">
          <h3 id={`thinking-perspective-${item.number}`}>{item.title}</h3>
          <p>{item.answer}</p>
          <ul className="thinking-perspective-keywords" aria-label="关键词">
            {item.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
          </ul>
        </div>
      </article>)}
    </div>
    <a className="five-text-link thinking-contact-cue" href="#contact">联系我 <span aria-hidden="true">↓</span></a>
  </div>;
}
