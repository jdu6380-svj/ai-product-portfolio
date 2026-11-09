"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { productJudgments } from "@/content/product-judgments";

type ProductJudgmentsProps = { variant: "five" | "editorial" };

const projectNames: Record<string, string> = {
  growthos: "GrowthOS",
  "novera-ai": "Novera AI",
  evidra: "Evidra",
};

export function ProductJudgments({ variant }: ProductJudgmentsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (direction) {
      event.preventDefault();
      const next = (index + direction + productJudgments.length) % productJudgments.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : productJudgments.length - 1;
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  if (variant === "editorial") {
    return (
      <div className="judgments-editorial">
        {productJudgments.map((item) => (
          <article className="judgment-editorial-row" key={item.number}>
            <div className="judgment-editorial-title">
              <span>{item.number}</span>
              <h3>{item.question}</h3>
              <Link href={`/work/${item.project}`}>
                {projectNames[item.project]} <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="judgment-editorial-copy">
              <section><h4>核心判断</h4><p>{item.core}</p></section>
              <section><h4>关键矛盾</h4><p>{item.tension}</p></section>
              <section><h4>产品结论</h4><p>{item.conclusion}</p></section>
            </div>
          </article>
        ))}
      </div>
    );
  }

  const item = productJudgments[active];
  return (
    <div className="judgments-tabs">
      <div className="judgments-tab-list" role="tablist" aria-label="选择产品判断">
        {productJudgments.map((judgment, index) => (
          <button
            key={judgment.number}
            type="button"
            role="tab"
            id={`judgment-tab-${judgment.number}`}
            aria-selected={active === index}
            aria-controls="judgment-panel"
            tabIndex={active === index ? 0 : -1}
            ref={(node) => { tabRefs.current[index] = node; }}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onClick={() => setActive(index)}
          >
            <span>{judgment.number}</span><strong>{judgment.question}</strong>
          </button>
        ))}
      </div>
      <article className="judgment-tab-panel" id="judgment-panel" role="tabpanel" aria-labelledby={`judgment-tab-${item.number}`} tabIndex={0} key={item.number}>
        <div className="judgment-tab-intro"><span>{item.number} / {projectNames[item.project]}</span><h3>{item.question}</h3></div>
        <div className="judgment-tab-columns">
          <section><h4>核心判断</h4><p>{item.core}</p></section>
          <section><h4>关键矛盾</h4><p>{item.tension}</p></section>
          <section><h4>产品结论</h4><p>{item.conclusion}</p></section>
        </div>
        <Link href={`/work/${item.project}`} className="judgment-case-link">查看 {projectNames[item.project]} 案例 <span aria-hidden="true">↗</span></Link>
      </article>
    </div>
  );
}
