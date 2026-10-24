"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { projects } from "@/content/portfolio";

const selectedProjects = ["growthos", "novera-ai", "evidra"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

export function ProductThinking() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const project = selectedProjects[active];
  const decision = project.decisions[0];
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (direction) {
      event.preventDefault();
      const next = (index + direction + selectedProjects.length) % selectedProjects.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : selectedProjects.length - 1;
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return <div className="product-thinking" aria-label="精选产品决策">
    <div className="thinking-tabs" role="tablist" aria-label="选择产品决策">
      {selectedProjects.map((item, index) => <button key={item.slug} type="button" role="tab" id={`thinking-tab-${item.slug}`} aria-selected={active === index} aria-controls="thinking-panel" tabIndex={active === index ? 0 : -1} ref={(node) => { tabRefs.current[index] = node; }} onKeyDown={(event) => handleKeyDown(event, index)} onClick={() => setActive(index)}>
        <span>{item.title}</span><i>{item.category}</i>
      </button>)}
    </div>
    <article className={`thinking-decision thinking-${project.accent}`} id="thinking-panel" role="tabpanel" aria-labelledby={`thinking-tab-${project.slug}`} tabIndex={0} key={project.slug}>
      <header className="thinking-decision-heading"><span>{project.title}</span><small>{project.category}</small><h3>{decision.decision}</h3></header>
      <div className="thinking-decision-grid">
        <section><span>决策背景与用户任务</span><p>{project.problem}</p></section>
        <section><span>判断依据</span><p>{decision.why}</p></section>
        <section><span>方案取舍</span><p>{decision.tradeoff}</p></section>
        <section><span>如何进入产品</span><p>{project.workflow.join(" → ")}</p></section>
        <section><span>验证方式</span><p>{project.validationEvidence[0]}</p></section>
        <section><span>当前可说明的结果</span><p>{decision.result}</p></section>
      </div>
    </article>
  </div>;
}
