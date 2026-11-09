const productPerspectives = [
  {
    number: "01",
    topic: "AI 行业趋势",
    title: "AI Agent 会取代传统 SaaS 吗？",
    answer: "我认为 AI Agent 不会简单取代传统 SaaS，而是会改变用户使用软件的方式。传统 SaaS 提供稳定、标准化的业务功能，Agent 则更强调理解目标、调用工具和完成任务。未来更可能出现两者融合的形态：SaaS 提供可靠的业务能力，Agent 负责跨功能协调与任务执行。产品经理需要判断哪些任务适合交给 AI，哪些环节仍然需要人工控制。",
    keywords: ["AI Agent", "SaaS 融合", "任务执行", "人工控制"],
  },
  {
    number: "02",
    topic: "产品价值判断",
    title: "AI 产品应该优先追求智能程度，还是解决实际业务问题？",
    answer: "我认为应该优先解决实际业务问题。模型能力强不代表产品价值高，关键是 AI 是否真正改善了原有流程，例如降低操作成本、减少重复劳动或提高决策效率。产品应该从用户任务出发，判断 AI 能在哪个环节产生增量价值，再通过测试和业务指标验证，而不是为了使用新技术而增加 AI 功能。",
    keywords: ["用户任务", "流程改善", "增量价值", "业务指标"],
  },
  {
    number: "03",
    topic: "职业能力变化",
    title: "未来 AI 产品经理最重要的能力会发生什么变化？",
    answer: "我认为 AI 产品经理会从传统的需求管理，进一步转向问题定义、AI 能力边界判断、工作流设计和效果验证。AI 可以辅助完成文档、原型和信息整理，但产品经理仍然需要判断用户真正需要什么、方案是否可行，以及结果是否达到业务目标。同时，还需要理解基本技术原理，能够与研发和算法团队围绕具体问题有效协作。",
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
