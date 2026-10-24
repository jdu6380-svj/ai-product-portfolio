"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { projects } from "@/content/portfolio";
import { ProductPreview } from "@/components/product-preview";

const showcaseProjects = ["growthos", "novera-ai", "evidra"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

const screenshots: Record<string, { src: string; alt: string; caption: string }> = {
  growthos: {
    src: "/growthos/review-report.png",
    alt: "GrowthOS 内容评估报告真实界面，展示四个评估维度和报告内容",
    caption: "GrowthOS / 真实内容评估界面",
  },
  "novera-ai": {
    src: "/novera/preview-assistant.png",
    alt: "Novera AI 助手界面预览，展示知识问答与来源引用布局",
    caption: "Novera AI Preview / 助手界面",
  },
};

const showcaseDetails: Record<string, {
  scene: string;
  workflow: string[];
  capabilities: string[];
  proof: string;
}> = {
  growthos: {
    scene: "个人品牌经营者和小型内容团队需要把定位、选题、草稿和复盘衔接起来。",
    workflow: ["品牌画像", "确认策略", "选择选题", "编辑内容版本", "反馈与复评"],
    capabilities: ["30 天选题计划", "人工确认门槛", "反馈驱动版本迭代"],
    proof: "三轮迭代有本地隔离流程和固定合成案例记录；第三轮表达边界复核为基线 2/5、候选 5/5。",
  },
  "novera-ai": {
    scene: "企业团队需要从分散的内部文档中找到答案，并在采取行动前回到原文核验。",
    workflow: ["建立工作空间", "导入知识文档", "提出问题", "关联来源", "查看回答"],
    capabilities: ["跨文档检索", "来源引用", "主张 / 证据"],
    proof: "固定合成语料的真实本地运行覆盖 20 份文档和 40 个问题；v3 对同一运行记录完成离线复评。",
  },
  evidra: {
    scene: "中文长文章作者、内容顾问和内容团队需要知道：一条观点为什么成立，以及下一步怎样修改。",
    workflow: ["提交文章", "识别读者问题", "分析主张", "定位证据", "证据状态判断", "生成修改建议", "人工修改与修改清单", "再次检查", "前后对比", "本地审查历史"],
    capabilities: ["主张 / 证据", "可编辑建议", "再次检查对比"],
    proof: "公开 Preview 与源码可访问；历史运行记录呈现文章分析、修改与再次检查流程，当前案例按这组记录展示产品迭代。",
  },
};

export function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const project = showcaseProjects[activeIndex];
  const details = showcaseDetails[project.slug];
  const previewVariant = project.slug === "novera-ai" ? "novera" : project.slug as "growthos" | "evidra";
  const screenshot = screenshots[project.slug];
  const changeProject = (direction: number) => {
    setActiveIndex((current) => (current + direction + showcaseProjects.length) % showcaseProjects.length);
  };
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (direction) {
      event.preventDefault();
      const nextIndex = (index + direction + showcaseProjects.length) % showcaseProjects.length;
      setActiveIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const nextIndex = event.key === "Home" ? 0 : showcaseProjects.length - 1;
      setActiveIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };
  const startSwipe = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch" || (event.target as HTMLElement).closest("a, button")) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };
  const endSwipe = (event: PointerEvent<HTMLElement>) => {
    if (!pointerStart.current) return;
    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;
    if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      changeProject(deltaX < 0 ? 1 : -1);
    }
    pointerStart.current = null;
  };

  return <div
    className="showcase"
    role="region"
    aria-label="精选项目展示台"
  >
    <div className="showcase-nav" role="tablist" aria-label="选择项目">
      {showcaseProjects.map((item, index) => <button
        key={item.slug}
        type="button"
        role="tab"
        id={`showcase-tab-${item.slug}`}
        aria-selected={activeIndex === index}
        aria-controls="showcase-panel"
        tabIndex={activeIndex === index ? 0 : -1}
        ref={(node) => { tabRefs.current[index] = node; }}
        onKeyDown={(event) => handleTabKeyDown(event, index)}
        onClick={() => setActiveIndex(index)}
      ><span>{item.title}</span><i>{String(index + 1).padStart(2, "0")}</i></button>)}
    </div>

    <article className={`showcase-panel showcase-${project.accent}`} id="showcase-panel" role="tabpanel" aria-labelledby={`showcase-tab-${project.slug}`} key={project.slug} onPointerDown={startSwipe} onPointerUp={endSwipe} onPointerCancel={() => { pointerStart.current = null; }}>
      <div className="showcase-copy">
        <div className="showcase-meta"><span>{String(activeIndex + 1).padStart(2, "0")} / 03</span><span>{project.category}</span></div>
        <h3>{project.title}</h3>
        <p className="showcase-positioning">{project.shortDescription}</p>
        <p className="showcase-description">{project.description}</p>
        <div className="showcase-scene"><span>使用场景</span><p>{details.scene}</p></div>
        <div className="showcase-workflow"><span>核心工作流</span><div>{details.workflow.map((step, index) => <span key={step}><i>{String(index + 1).padStart(2, "0")}</i>{step}</span>)}</div></div>
        <div className="showcase-capabilities"><span>核心能力</span><div>{details.capabilities.map((item) => <b key={item}>{item}</b>)}</div></div>
        <div className="showcase-role"><span>我的工作</span><p>{project.role}</p></div>
        <div className="showcase-focus">{project.focus.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
        <div className="showcase-actions">
          <Link href={`/work/${project.slug}`} className="button button-dark">完整项目介绍与案例 <span>↗</span></Link>
          <div className="showcase-secondary-links">
            {project.demoUrl ? <a href={project.demoUrl} target="_blank" rel="noreferrer">在线体验 <span>↗</span></a> : <span className="showcase-unavailable">在线体验待补充</span>}
            {project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noreferrer">源码仓库 <span>↗</span></a> : <span className="showcase-unavailable">源码仓库待补充</span>}
          </div>
        </div>
      </div>

      <div className="showcase-visual" aria-label={`${project.title}产品视觉`}>
        {screenshot ? <figure className="showcase-screenshot"><Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 900px) 100vw, 55vw" priority /><figcaption>{screenshot.caption}</figcaption></figure> : <><ProductPreview variant={previewVariant} /><p className="showcase-visual-caption">产品界面示意 / 非实机截图</p></>}
        <div className="showcase-visual-index" aria-hidden="true"><span>产品 / {String(activeIndex + 1).padStart(2, "0")}</span><i /></div>
        <p className="showcase-proof"><span>实现与验证</span>{details.proof}</p>
      </div>
    </article>

    <div className="showcase-controls">
      <p><strong>{project.title}</strong><span>{project.status}</span></p>
      <div><button type="button" aria-label="上一个项目" onClick={() => changeProject(-1)}>←</button><span>{String(activeIndex + 1).padStart(2, "0")} <i>/</i> 03</span><button type="button" aria-label="下一个项目" onClick={() => changeProject(1)}>→</button></div>
    </div>
  </div>;
}
