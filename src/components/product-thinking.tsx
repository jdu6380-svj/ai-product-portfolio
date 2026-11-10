const productPerspectives = [
  {
    number: "01",
    topic: "AI 行业趋势",
    title: "AI Agent 会取代传统 SaaS 吗？",
    answer: "AI Agent 不会简单取代传统 SaaS，更可能改变用户使用软件的方式。SaaS 提供稳定、标准化的业务能力；Agent 负责理解目标、调用工具和跨功能执行任务。两者融合后，产品经理要判断哪些任务适合交给 AI，哪些节点需要保留人工控制。",
    keywords: ["AI Agent", "SaaS 融合", "任务执行", "人工控制"],
  },
  {
    number: "02",
    topic: "产品价值判断",
    title: "AI 产品应该优先追求智能程度，还是解决实际业务问题？",
    answer: "应优先解决实际业务问题。模型能力强，不等于产品价值高；只有当 AI 能降低操作成本、减少重复劳动或提升决策效率，才真正改善了流程。从用户任务出发找到 AI 的增量作用，再用测试和业务指标验证，避免为使用新技术而增加功能。",
    keywords: ["用户任务", "流程改善", "增量价值", "业务指标"],
  },
  {
    number: "03",
    topic: "职业能力变化",
    title: "未来 AI 产品经理最重要的能力会发生什么变化？",
    answer: "未来，AI 产品经理的工作会进一步转向问题定义、能力边界判断、工作流设计与效果验证。AI 可以辅助文档、原型和信息整理；产品经理仍需判断需求、权衡方案并评估结果。理解基本技术原理，并能围绕具体问题与研发和算法团队协作，也会更重要。",
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
