"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { projects } from "@/content/portfolio";
import { ProductPreview } from "@/components/product-preview";

const projectOrder = ["growthos", "novera-ai", "evidra"] as const;
const imageByProject: Record<string, { src: string; alt: string; caption: string }> = {
  growthos: { src: "/growthos/editor.png", alt: "GrowthOS 内容编辑器真实界面", caption: "内容版本编辑器" },
  "novera-ai": { src: "/novera/preview-evidence.png", alt: "Novera AI 证据浏览器真实界面", caption: "主张 / 证据" },
};

const wallNotes: Record<string, { eyebrow: string; statement: string; proof: string; flow: string[] }> = {
  growthos: {
    eyebrow: "内容生产 / 可追溯工作流",
    statement: "把品牌策略、选题、生成、评估和反馈接成一条可继续推进的路径。",
    proof: "三轮迭代有本地隔离流程与固定合成案例记录；第三轮表达边界复核为基线 2/5、候选 5/5。",
    flow: ["定位", "规划", "创作", "评审"],
  },
  "novera-ai": {
    eyebrow: "企业知识 / RAG 证据链",
    statement: "让回答回到文档、检索结果和可查看的来源，而不是停在一段流畅文字。",
    proof: "固定语料真实运行覆盖 20 份文档和 40 个问题；v3 复评记录 60 条有效证据、0 条无效引用。",
    flow: ["文档", "检索", "引用", "行动"],
  },
  evidra: {
    eyebrow: "内容审查 / 编辑闭环",
    statement: "把文章主张、原文证据、修改建议和再次检查放进作者可控的审查工作流。",
    proof: "源码与回归覆盖再次检查及状态恢复；证据用于定位原文依据，尚无可追溯的原始评分对照记录。",
    flow: ["主张", "证据", "修改", "复核"],
  },
};

export function ResearchProjectWall() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeSlug = projectOrder[activeIndex];
  const activeProject = projects.find((project) => project.slug === activeSlug)!;
  const note = wallNotes[activeSlug];

  const select = (index: number) => setActiveIndex((index + projectOrder.length) % projectOrder.length);
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (direction) {
      event.preventDefault();
      const next = (index + direction + projectOrder.length) % projectOrder.length;
      select(next);
      tabRefs.current[next]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : projectOrder.length - 1;
      select(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <>
    <section className="research-section research-project-wall" id="project-wall" aria-labelledby="project-wall-title">
      <div className="research-container">
        <div className="research-section-head">
          <div><span className="research-kicker">02 / project wall</span><h2 id="project-wall-title">三个项目，<em>同一张工作画布。</em></h2></div>
          <p>项目不是三张并列卡片。点击一个项目，画布重新排列，真实界面、问题和验证记录一起进入前景。</p>
        </div>

        <div className="project-wall-tabs" role="tablist" aria-label="选择项目">
          {projectOrder.map((slug, index) => {
            const project = projects.find((item) => item.slug === slug)!;
            return (
              <button
                type="button"
                role="tab"
                key={slug}
                id={`research-project-tab-${slug}`}
                aria-selected={activeIndex === index}
                aria-controls="research-case-spotlight"
                tabIndex={activeIndex === index ? 0 : -1}
                ref={(node) => { tabRefs.current[index] = node; }}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onClick={() => select(index)}
                className={activeIndex === index ? "is-active" : ""}
              >
                <span className="wall-card-index">{project.index}</span>
                <span className="wall-card-title">{project.title}</span>
                <span className="wall-card-category">{project.category}</span>
                <span className="wall-card-enter">{activeIndex === index ? "当前项目" : "选择项目"}</span>
              </button>
            );
          })}
        </div>

        <div className="project-wall-canvas" aria-label="项目视觉画布">
          {projectOrder.map((slug, index) => {
            const project = projects.find((item) => item.slug === slug)!;
            const image = imageByProject[slug];
            return (
              <Link href={`/work/${slug}`} className={`wall-card wall-card-${project.accent} ${activeIndex === index ? "is-active" : ""}`} key={slug} aria-label={`查看 ${project.title} 完整案例`}>
                <span className="wall-card-index">{project.index}</span>
                <span className="wall-card-title">{project.title}</span>
                <span className="wall-card-category">{project.category}</span>
                <span className="wall-card-visual">
                  {image ? <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 90vw, 34vw" /> : <span className="wall-card-evidra">Evidra <i>实机界面请进入在线 MVP</i></span>}
                </span>
                <span className="wall-card-enter">打开完整案例 <i aria-hidden="true">↗</i></span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>

    <section className="research-section research-selected-case" id="selected-case" aria-labelledby="selected-case-title">
      <div className="research-container">
        <div className="research-case-section-head"><div><span className="research-kicker">03 / selected case</span><h2 id="selected-case-title">{activeProject.title} / <em>{activeProject.category}</em></h2></div><p>先看问题和产品判断，再看真实界面、关键取舍与验证结果。</p></div>
        <article className="research-case-spotlight" id="research-case-spotlight" role="tabpanel" aria-labelledby={`research-project-tab-${activeSlug}`} aria-live="polite" key={activeSlug}>
          <div className="research-case-copy">
            <span className="research-kicker">{activeProject.index} / {note.eyebrow}</span>
            <h3>{activeProject.title}</h3>
            <p className="research-case-statement">{note.statement}</p>
            <div className="research-case-flow" aria-label={`${activeProject.title}核心路径`}>
              {note.flow.map((step, index) => <span key={step}><i>{String(index + 1).padStart(2, "0")}</i>{step}</span>)}
            </div>
            <p className="research-case-proof"><strong>证据</strong>{note.proof}</p>
            <div className="research-case-links"><Link href={`/work/${activeProject.slug}`}>进入完整案例 <span aria-hidden="true">↗</span></Link><a href={activeProject.demoUrl} target="_blank" rel="noreferrer">在线体验 <span aria-hidden="true">↗</span></a><a href={activeProject.githubUrl} target="_blank" rel="noreferrer">源码仓库 <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="research-case-image">
            {imageByProject[activeSlug] ? <figure><Image src={imageByProject[activeSlug].src} alt={imageByProject[activeSlug].alt} fill sizes="(max-width: 900px) 100vw, 54vw" /><figcaption>{imageByProject[activeSlug].caption} · 真实产品界面</figcaption></figure> : <><ProductPreview variant="evidra" /><p>产品界面结构示意；Evidra 的实机体验通过在线 MVP 入口打开。</p></>}
          </div>
        </article>
      </div>
    </section>
    </>
  );
}
