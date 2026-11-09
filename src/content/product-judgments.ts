export type ProductJudgment = {
  number: string;
  question: string;
  core: string;
  tension: string;
  conclusion: string;
  project: "growthos" | "novera-ai" | "evidra";
};

export const productJudgments: ProductJudgment[] = [
  {
    number: "01",
    question: "AI 能做什么，不等于用户真正需要什么。",
    core: "AI 的技术能力不等于产品价值。真正的价值来自技术能力与用户真实需求的交集。",
    tension: "一个功能可以很先进，却未必能解决用户的高频痛点；一个模型可以生成惊艳的结果，却未必能融入真实工作流。",
    conclusion: "从具体的用户任务出发，判断 AI 是否带来可感知的效率、质量或体验提升，再决定是否值得产品化。",
    project: "growthos",
  },
  {
    number: "02",
    question: "当 AI 不再总是正确，产品如何依然值得信任？",
    core: "AI 产品的可信度，不应该只建立在模型给出的答案上，更应该建立在可验证的产品机制上。",
    tension: "AI 擅长生成流畅、完整的答案，但表达得越确定，不代表内容就越可靠。用户需要的不只是答案，还需要判断答案的依据与适用边界。",
    conclusion: "通过证据溯源、置信度表达、知识缺口识别和人工复核，让用户不仅能获得答案，也能判断何时应该相信、验证或介入。",
    project: "novera-ai",
  },
  {
    number: "03",
    question: "如何让一次 AI 生成，变成持续创造价值的闭环？",
    core: "一次生成只能体现 AI 的即时能力，持续改善的工作流才能体现产品的长期价值。",
    tension: "用户拿到结果，不代表任务已经完成。结果可能需要修改、重新生成、人工确认，甚至调整最初的目标。",
    conclusion: "将生成、评估、反馈、人工决策和再次迭代连接起来，让每次使用都能为下一次决策提供有效信息，逐步形成可衡量、可优化的产品闭环。",
    project: "growthos",
  },
];
