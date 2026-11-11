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
    answer: "AI 产品经理会从需求管理进一步转向问题定义、能力边界、工作流设计和效果验证。AI 可以辅助文档、原型和信息整理，但产品经理仍要判断用户需要什么、方案是否可行、结果是否达标，并能与研发和算法团队围绕具体问题协作。",
    keywords: ["问题定义", "AI 能力边界", "工作流设计", "效果验证"],
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
  </div>;
}
