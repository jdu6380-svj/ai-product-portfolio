"use client";

import { useRef, useState, type KeyboardEvent } from "react";

export const buildStages = [
  {
    number: "01",
    english: "Discover",
    title: "需求分析",
    short: "用户真正需要解决什么？",
    purpose: "从真实任务和当前做法开始，明确目标用户、触发场景、主要卡点与问题边界。先分开观察到的事实和仍待验证的判断，再决定是否值得进入产品定义。",
    practice: ["记录用户、场景、任务与当前替代方案", "识别时间、错误、协作或返工成本", "区分已知证据与待验证假设"],
    output: "一条有场景、有边界、可以继续验证的问题定义。",
    example: "GrowthOS、Novera AI 与 Evidra 都先从创作者、知识工作者或作者的具体任务和卡点切入。",
  },
  {
    number: "02",
    english: "Define",
    title: "产品定义与方案设计",
    short: "应该解决什么，为什么这样设计？",
    purpose: "把问题转成可被检验的产品目标，比较不同方案对流程、用户控制权和实现成本的影响，并明确 AI 参与的边界。",
    practice: ["写清目标、核心流程与本轮范围", "比较规则、模板、AI 等方案的价值与成本", "预先定义关键状态、人工确认点与验证信号"],
    output: "有边界的 MVP 流程、关键产品决策与验收条件。",
    example: "Novera AI 将答案拆成主张、证据与来源；GrowthOS 保留创作者对选题和版本的确认。",
  },
  {
    number: "03",
    english: "Build",
    title: "开发与交付",
    short: "如何把产品方案转化为可用功能？",
    purpose: "把产品判断拆成可实现的任务，协调模型、程序规则和界面状态，优先打通核心路径，并在交付前建立可重复的测试与验收条件。",
    practice: ["拆解页面、接口、模型与数据状态", "明确模型、程序和用户各自负责什么", "用真实截图、固定任务和边界状态完成验收"],
    output: "可操作的核心流程、实现边界与可追溯的验收记录。",
    example: "GrowthOS 落地六阶段内容流程；Novera AI 把检索结果接入可核验的证据契约。",
  },
  {
    number: "04",
    english: "Validate & Iterate",
    title: "验证与迭代",
    short: "如何判断产品有效，以及下一步改什么？",
    purpose: "用预先约定的标准检查功能、AI 输出和用户任务是否改善，再把观察到的结果转成下一轮问题和改动。结论始终标明证据来源与适用范围。",
    practice: ["使用固定任务、样本和明确的通过标准", "结合自动检查、结构化评价与人工复核", "记录版本差异，形成可比较的下一轮基线"],
    output: "能够追溯输入、标准、结果和限制的验证记录，以及下一轮优化假设。",
    example: "GrowthOS 使用固定合成案例，Novera AI 做 v3 离线复评；Evidra 以流程与状态回归为现有证据，不展示缺少原始记录的分数对照。",
  },
];

export function BuildMethod() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const stage = buildStages[active];
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (direction) {
      event.preventDefault();
      const next = (index + direction + buildStages.length) % buildStages.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : buildStages.length - 1;
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return <div className="build-method" aria-label="产品构建方法">
    <div className="method-core" aria-hidden="true"><span>工作路径</span><strong>问题<br />→ 产品<br />→ 验证</strong><i /></div>
    <div className="build-method-rail" role="tablist" aria-label="产品构建阶段" aria-orientation="horizontal">
      {buildStages.map((item, index) => <button key={item.number} type="button" role="tab" id={`build-method-tab-${item.number}`} aria-selected={active === index} aria-controls="build-method-detail" tabIndex={active === index ? 0 : -1} ref={(node) => { tabRefs.current[index] = node; }} onKeyDown={(event) => handleKeyDown(event, index)} onClick={() => setActive(index)}>
        <span>{item.number}</span><strong>{item.english}</strong><b>{item.title}</b><small>{item.short}</small><i aria-hidden="true" />
      </button>)}
    </div>
    <article className="build-method-detail" id="build-method-detail" role="tabpanel" aria-labelledby={`build-method-tab-${stage.number}`} tabIndex={0} key={stage.number}>
      <div className="build-method-detail-heading"><span>{stage.number} / {stage.english}</span><h3>{stage.title}</h3><p>{stage.purpose}</p></div>
      <div className="build-method-detail-columns">
        <section><h4>推进方式</h4><ul>{stage.practice.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h4>阶段产出</h4><p>{stage.output}</p></section>
      </div>
      <aside className="build-method-example"><h4>项目实例</h4><p>{stage.example}</p></aside>
    </article>
  </div>;
}
