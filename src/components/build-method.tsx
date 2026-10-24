"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const stages = [
  {
    number: "01",
    title: "问题定义",
    short: "先说清要改变的用户任务。",
    purpose: "先明确用户正在完成什么、卡在哪里，再讨论界面或模型。将问题与方案分开，给后续选择留出空间。",
    practice: ["描述用户现在要完成的任务与卡点", "明确问题边界、已有条件和不在本轮处理的内容", "把目标写成可以观察的行为或结果"],
    output: "目标用户、任务、问题边界与可观察的预期结果。",
  },
  {
    number: "02",
    title: "用户场景",
    short: "梳理输入、判断点与后续行动。",
    purpose: "将问题放回具体工作现场，梳理使用者从什么输入开始、需要做哪些操作，以及什么结果能帮助其继续完成任务。",
    practice: ["明确目标使用者与触发场景", "串联输入、关键操作、判断点和后续行动", "检查流程是否覆盖正常状态与需要用户介入的状态"],
    output: "从输入、关键操作到结果与交接点的任务路径。",
  },
  {
    number: "03",
    title: "产品决策",
    short: "确定本轮范围与方案取舍。",
    purpose: "把问题分析转成产品范围和交互取舍。每项能力都要对应用户任务，同时考虑实现成本、理解成本与可验证性。",
    practice: ["明确产品定位、核心价值和本轮范围", "比较备选方案对流程、信息呈现和用户控制权的影响", "用具体理由记录选择及其取舍"],
    output: "有边界的 MVP 流程、关键页面与决策依据。",
  },
  {
    number: "04",
    title: "AI 工作流",
    short: "明确模型、程序与用户的分工。",
    purpose: "明确 AI 何时检索、分析或生成，用户何时确认、修改或回到来源；让模型输出能自然进入下一步，而不是停留在一段孤立回答。",
    practice: ["定义输入数据、上下文来源和结果结构", "区分模型处理、产品规则与用户判断的职责", "为结果提供来源、状态或可继续操作的入口"],
    output: "从输入、模型处理到用户检查与下一步行动的流程。",
  },
  {
    number: "05",
    title: "实现与测试",
    short: "实现核心路径并设定验收条件。",
    purpose: "将产品流程拆成可实现的任务，与 GPT、Codex 等工具协作完成分析、编码和排查，再由我检查范围、关键状态和实际行为。",
    practice: ["按用户可见的任务切分实现顺序与验收条件", "覆盖核心路径、边界输入和必要错误状态", "实际操作页面，并结合自动化检查验证预期行为"],
    output: "可操作的核心流程与对应检查结果。",
  },
  {
    number: "06",
    title: "迭代与验证",
    short: "对照预期，决定下一步。",
    purpose: "先定义成功条件，再用具体任务检查实际表现。将观察结果与预期逐项对照，区分已验证结论、待确认原因和后续计划。",
    practice: ["为每项验证写明输入、预期行为和通过标准", "分别记录已验证结果、实际依据与后续计划", "优先处理有证据支持且影响核心任务的改进"],
    output: "验证记录、决策理由与下一轮测试。",
  },
];

export function BuildMethod() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const stage = stages[active];
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (direction) {
      event.preventDefault();
      const next = (index + direction + stages.length) % stages.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : stages.length - 1;
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return <div className="build-method" aria-label="产品构建方法">
    <div className="build-method-rail" role="tablist" aria-label="产品构建阶段" aria-orientation="vertical">
      {stages.map((item, index) => <button key={item.number} type="button" role="tab" id={`build-method-tab-${item.number}`} aria-selected={active === index} aria-controls="build-method-detail" tabIndex={active === index ? 0 : -1} ref={(node) => { tabRefs.current[index] = node; }} onKeyDown={(event) => handleKeyDown(event, index)} onClick={() => setActive(index)}>
        <span>{item.number}</span><strong>{item.title}</strong><small>{item.short}</small><i aria-hidden="true" />
      </button>)}
    </div>
    <article className="build-method-detail" id="build-method-detail" role="tabpanel" aria-labelledby={`build-method-tab-${stage.number}`} tabIndex={0} key={stage.number}>
      <div className="build-method-detail-heading"><span>{stage.number} / 产品构建</span><h3>{stage.title}</h3><p>{stage.purpose}</p></div>
      <div className="build-method-detail-columns">
        <section><h4>推进方式</h4><ul>{stage.practice.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h4>阶段产出</h4><p>{stage.output}</p></section>
      </div>
    </article>
  </div>;
}
