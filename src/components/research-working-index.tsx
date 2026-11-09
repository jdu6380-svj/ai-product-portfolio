"use client";

import { useState } from "react";
import { buildStages } from "@/components/build-method";

export function ResearchWorkingIndex() {
  const [view, setView] = useState<"featured" | "full">("featured");
  const [active, setActive] = useState(0);
  const featured = [buildStages[0], buildStages[2], buildStages[5]];
  const visibleStages = view === "featured" ? featured : buildStages;
  const stage = visibleStages[active] ?? visibleStages[0];

  return (
    <section className="research-section research-working" id="working-index" aria-labelledby="working-index-title">
      <div className="research-container">
        <div className="research-section-head">
          <div><span className="research-kicker">04 / working index</span><h2 id="working-index-title">方法不是口号，<em>是可检查的顺序。</em></h2></div>
          <p>借鉴 Jesper 的精选 / 全部索引，把工作方式压缩成一个能被浏览、展开和追问的工作目录。</p>
        </div>
        <div className="working-toggle" role="group" aria-label="方法索引视图">
          <button type="button" aria-pressed={view === "featured"} onClick={() => { setView("featured"); setActive(0); }}>FEATURED <span>精选判断</span></button>
          <button type="button" aria-pressed={view === "full"} onClick={() => { setView("full"); setActive(0); }}>FULL <span>完整六阶段</span></button>
        </div>
        <div className="working-index-layout">
          <nav className="working-index-list" aria-label="选择工作阶段">
            {visibleStages.map((item, index) => <button type="button" key={item.number} aria-pressed={index === active} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}><span>{item.number}</span><strong>{item.title}</strong><small>{item.short}</small></button>)}
          </nav>
          <article className="working-index-detail" key={`${view}-${stage.number}`}>
            <span>{stage.number} / 产品构建</span>
            <h3>{stage.title}</h3>
            <p>{stage.purpose}</p>
            <div><strong>阶段产出</strong><p>{stage.output}</p></div>
            <ul>{stage.practice.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  );
}
