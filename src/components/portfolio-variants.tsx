"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, ViewTransition, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { projects } from "@/content/portfolio";
import { BuildMethod } from "@/components/build-method";
import { ContactHeadline, HeroHeadline } from "@/components/hero-headline";
import { ProductJudgments } from "@/components/product-judgments";
import { ProductThinking } from "@/components/product-thinking";
import { ResearchProjectWall } from "@/components/research-project-wall";
import { ResearchWorkingIndex } from "@/components/research-working-index";
import { ProductPreview } from "@/components/product-preview";
import { GrowthOSExperienceLink } from "@/components/growthos-experience-link";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ContentCloudReveal } from "@/components/content-cloud-reveal";
import { useProjectSelection } from "@/components/portfolio-navigation";
import { projectTransitionMedia } from "@/content/project-transition-media";

const projectOrder = ["growthos", "novera-ai", "evidra"] as const;
const projectFlows: Record<string, string[]> = {
  growthos: ["品牌策略", "选题计划", "内容版本", "反馈复评"],
  "novera-ai": ["文档解析", "检索上下文", "来源引用", "任务交接"],
  evidra: ["文章输入", "主张证据", "修改建议", "再次检查"],
};
const projectHighlights: Record<string, { responsibility: string; validationType?: string; validation?: string; modelEvaluation?: string; engineeringTests?: string; boundary: string }> = {
  growthos: {
    responsibility: "产品定位与 MVP、六阶段内容流程、三类结构化反馈、Prompt 迭代与验收",
    modelEvaluation: "5 个固定合成案例，基线与候选各进行 5 次真实模型生成；表达边界人工复核为 2/5 → 5/5，行动具体性两组均为 5/5。",
    engineeringTests: "34 个测试文件、172 项通过、1 项跳过。",
    boundary: "AI 提供策略、草稿与改进建议；创作者确认选题和版本，输入输出均有风险门禁",
  },
  "novera-ai": {
    responsibility: "企业知识场景与 MVP、多格式 RAG、答案—主张—证据—来源契约",
    validationType: "本地合成集 · 离线复评",
    validation: "20 份合成文档、40 道问题、60 条有效证据；v3 离线复评",
    boundary: "系统检索和核验引用；缺失知识不补猜，低置信资料由知识管理员复核",
  },
  evidra: {
    responsibility: "四维质量评估、观点与原文证据关联、修改清单和再次复核流程",
    validationType: "流程验收 · 非敏感示例",
    validation: "再次检查、报告恢复与比较摘要有实现和回归覆盖；无可追溯的原始评分对照记录",
    boundary: "AI 提出诊断，作者决定采纳并亲自编辑；提交前拦截敏感及高风险内容",
  },
};

const stageAccent: Record<string, string> = { coral: "#d06f58", blue: "#5870c8", olive: "#6c8d76" };

function SceneHeader({ id, label, title, note }: { id?: string; label: string; title: ReactNode; note?: string }) {
  return <div className="five-section-head"><span className="five-kicker">{label}</span><h2 id={id}>{title}</h2>{note ? <p>{note}</p> : null}</div>;
}

function SectionArrow({ href, label, transition = false }: { href: string; label: string; transition?: boolean }) {
  return <a className="five-section-next" href={href} aria-label={label} data-scene-transition={transition ? "hero" : undefined}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2v15m-6-6 6 6 6-6" /></svg></a>;
}

function FiveHero() {
  return <section className="five-section five-hero" id="about" aria-labelledby="five-hero-title">
    <div className="five-hero-space" aria-hidden="true" />
    <div className="five-hero-content"><HeroHeadline id="five-hero-title" /></div>
    <SectionArrow href="#five-projects" label="继续查看项目" transition />
  </section>;
}

function FiveAbout() {
  return <section className="five-section five-about" id="five-projects" aria-labelledby="five-about-title">
    <div className="five-container">
      <SceneHeader id="five-about-title" label="01 / About" title="关于我" note="从业务实践，到 AI 产品设计。" />
      <p className="five-about-identity">杜嘉奇 <span>·</span> AI 产品经理方向</p>
      <div className="five-about-chapters">
        <article><span>01</span><div><h3>从真实业务出发</h3><p>曾独立运营 TikTok Shop 女装及配饰业务，接触选品、商品转化、广告投放与数据分析。在真实业务中，我逐渐开始关注用户需求、流程效率和增长问题。</p></div></article>
        <article><span>02</span><div><h3>转向 AI 产品实践</h3><p>从业务问题出发，开始探索 AI 如何解决实际问题，并独立规划和设计三个 AI 产品项目，覆盖知识问答、内容工作流与内容可信度审查。</p></div></article>
        <article><span>03</span><div><h3>建立产品判断</h3><p>不只关注模型能否生成结果，也关注结果是否可靠、流程是否可控、用户能否真正使用。通过规则设计、测试评估和问题归因持续完善产品方案。</p></div></article>
      </div>
      <a className="five-text-link" href="#project-introduction">认识三个项目 <span aria-hidden="true">↓</span></a>
    </div>
  </section>;
}

function FiveProjectStage() {
  const [activeIndex, setActiveIndex] = useProjectSelection();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const project = projects.find((item) => item.slug === projectOrder[activeIndex])!;
  const image = projectTransitionMedia[project.slug];
  const flow = projectFlows[project.slug];
  const selectProject = (index: number) => setActiveIndex(index);
  const markProjectNavigation = () => {
    try {
      window.sessionStorage.setItem("project-route-transition", "started");
    } catch {
      // The route still works when browser storage is restricted.
    }
  };
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (direction) {
      event.preventDefault();
      const nextIndex = (index + direction + projectOrder.length) % projectOrder.length;
      selectProject(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const nextIndex = event.key === "Home" ? 0 : projectOrder.length - 1;
      selectProject(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };
  return <section className="five-section five-projects" id="project-introduction" aria-labelledby="five-project-title">
    <div className="five-container">
      <SceneHeader id="five-project-title" label="02 / Projects" title="项目介绍" note="选择一个项目，查看它的工作流、产品界面与验证记录。" />
      <div className="five-project-tabs" role="tablist" aria-label="选择精选项目">
        {projectOrder.map((slug, index) => {
          const item = projects.find((candidate) => candidate.slug === slug)!;
          return <button key={slug} type="button" role="tab" id={`five-project-tab-${slug}`} aria-selected={activeIndex === index} aria-controls="five-project-panel" tabIndex={activeIndex === index ? 0 : -1} ref={(node) => { tabRefs.current[index] = node; }} onKeyDown={(event) => handleTabKeyDown(event, index)} onClick={() => selectProject(index)}><span>{item.index}</span><strong>{item.title}</strong><small>{item.category}</small></button>;
        })}
      </div>
      <div className="five-project-stage">
        <article className="five-project-panel" id="five-project-panel" role="tabpanel" aria-labelledby={`five-project-tab-${project.slug}`} aria-live="polite" key={project.slug}>
          <div className="five-project-main">
            <div className="five-project-copy" style={{ "--project-accent": stageAccent[project.accent] } as CSSProperties}>
              <span className="five-project-meta">{project.index} / {project.status}</span>
              <ViewTransition name={`project-title-${project.slug}`} share="project-title-morph" default="none"><h3>{project.title}</h3></ViewTransition>
              <p className="five-project-lead">{project.shortDescription}</p>
              <p className="five-project-description">{project.description}</p>
              <div className="five-flow" aria-label={`${project.title}核心工作流`}>{flow.map((step, index) => <span key={step}><i>{String(index + 1).padStart(2, "0")}</i>{step}</span>)}</div>
            </div>
            <div className="five-project-visual">
              <Link href={`/work/${project.slug}`} onNavigate={markProjectNavigation} transitionTypes={["project-open"]} className="five-project-image-link" aria-label={`查看 ${project.title} 完整案例`}>
                <ViewTransition name={`project-image-${project.slug}`} share="project-image-morph" default="none"><figure>
                  {image.src ? <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 52vw" loading="eager" /> : <ProductPreview variant="evidra" compact />}
                  <figcaption>{image.caption}{image.src ? " · 真实产品界面" : null}<span aria-hidden="true">↗</span></figcaption>
                </figure></ViewTransition>
              </Link>
              <p className="five-visual-note"><span>产品现场</span><i />{project.category}</p>
            </div>
          </div>
          <dl className="five-project-highlights"><div><dt>我负责</dt><dd>{projectHighlights[project.slug].responsibility}</dd></div><div><dt>验证证据</dt><dd>{project.slug === "growthos" ? <><span className="five-evidence-type">模型对照评测</span>{projectHighlights.growthos.modelEvaluation}<span className="five-evidence-type">工程回归测试</span>{projectHighlights.growthos.engineeringTests}</> : <>{projectHighlights[project.slug].validationType ? <span className="five-evidence-type">{projectHighlights[project.slug].validationType}</span> : null}{projectHighlights[project.slug].validation}</>}</dd></div><div><dt>人机与风险</dt><dd>{projectHighlights[project.slug].boundary}</dd></div></dl>
          <div className="five-project-links"><Link href={`/work/${project.slug}`} onNavigate={markProjectNavigation} transitionTypes={["project-open"]} className="five-dark-link">完整项目介绍与案例 <span aria-hidden="true">↗</span></Link>{project.demoUrl ? project.slug === "growthos" ? <GrowthOSExperienceLink /> : <a href={project.demoUrl} target="_blank" rel="noreferrer">在线体验 <span aria-hidden="true">↗</span></a> : null}{project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noreferrer">源码 <span aria-hidden="true">↗</span></a> : null}</div>
          {project.slug === "growthos" ? <p className="five-preview-access-note">GrowthOS 在线体验需要登录；项目案例页提供完整操作截图与流程说明。</p> : null}
        </article>
      </div>
    </div>
  </section>;
}

function FiveMethod() {
  return <section className="five-section five-method" id="project-practice" aria-labelledby="five-method-title">
    <div className="five-container" id="method"><SceneHeader id="five-method-title" label="03 / Project Practice" title={<>从问题出发，<em>以验证驱动迭代。</em></>} note="从问题定义到方案验证，持续推进 AI 产品落地。" /><BuildMethod /></div>
  </section>;
}

function FiveContact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = "3949536640@qq.com";

  useEffect(() => () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  }, []);

  const copyEmail = async () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    feedbackTimer.current = setTimeout(() => setCopyState("idle"), 2200);
  };

  return <section className="five-section five-contact" id="contact" aria-labelledby="five-contact-title">
    <div className="five-contact-space" aria-hidden="true" />
    <div className="five-container five-contact-layout"><ContactHeadline id="five-contact-title" /><div className="five-contact-actions"><a className="five-email" href={`mailto:${email}`}>{email} <span aria-hidden="true">↗</span></a><a className="five-email" href="/du-jiaqi-resume.pdf" download>下载简历 PDF <span aria-hidden="true">↓</span></a><button className="five-copy-email" type="button" onClick={copyEmail}>{copyState === "copied" ? "已复制" : "复制邮箱"}</button><p className="five-copy-status" data-state={copyState} role="status" aria-live="polite">{copyState === "copied" ? "邮箱已复制到剪贴板" : copyState === "failed" ? "复制失败，请手动选择邮箱地址" : ""}</p></div></div>
  </section>;
}

function FiveView() {
  return (
    <div className="portfolio-variant five-view portfolio-scenes">
      <ContentCloudReveal selector=".five-view .five-about-chapters > article, .five-view .five-project-tabs, .five-view .five-project-stage, .five-view .five-method .build-method-rail, .five-view .thinking-perspectives > article, .five-view .thinking-contact-cue" />
      <div className="five-space-field" aria-hidden="true">
        <div className="five-space-lights">
          <span className="five-space-light five-space-light-a" />
          <span className="five-space-light five-space-light-b" />
          <span className="five-space-light five-space-light-c" />
        </div>
        <div className="five-space-particles">
          {Array.from({ length: 10 }, (_, index) => <i key={index} />)}
        </div>
      </div>
      <a className="skip-link" href="#five-projects">跳到关于我</a>
      <ScrollProgress />
      <ScrollReveal><FiveHero /></ScrollReveal>
      <ScrollReveal><FiveAbout /></ScrollReveal>
      <ScrollReveal><FiveProjectStage /></ScrollReveal>
      <ScrollReveal><FiveMethod /></ScrollReveal>
      <ScrollReveal>
        <section className="five-section five-thinking" id="thinking" aria-labelledby="five-thinking-title">
          <div className="five-container">
            <SceneHeader id="five-thinking-title" label="04 / Product Insights" title="产品思考" note="围绕 AI 行业发展、产品价值与未来产品经理的能力变化，分享我的观察、判断与思考。" />
            <ProductThinking />
          </div>
        </section>
      </ScrollReveal>
      <ScrollReveal className="contact-transition-reveal"><FiveContact /></ScrollReveal>
    </div>
  );
}

function ResearchEntry() {
  return <section className="research-entry" id="research-entry"><div className="research-entry-space" aria-hidden="true"><span /><i /><b /><em /></div><div className="research-container research-entry-content"><span className="research-kicker">AI product practice / 2026</span><HeroHeadline /><p>从用户任务出发，判断 AI 应该做什么、产品必须保留什么，再把想法变成可以被使用的系统。</p><a href="#project-wall" className="research-entry-link"><span>进入项目墙</span><i aria-hidden="true">↓</i></a></div></section>;
}

function ResearchJudgments() {
  return <section className="research-section research-judgments" id="research-judgments"><div className="research-container"><div className="research-section-head"><div><span className="research-kicker">05 / product judgments</span><h2>三个问题，<em>贯穿三个项目。</em></h2></div><p>观点不独立悬浮，每个判断都回到一个真实项目、一条工作流和一组验证记录。</p></div><ProductJudgments variant="editorial" /></div></section>;
}

function ResearchContact() {
  return <section className="research-contact" id="research-contact" aria-labelledby="research-contact-title"><div className="research-container"><span className="research-kicker">06 / contact</span><h2 id="research-contact-title">好的产品，<br /><em>从一次值得深入的交流开始。</em></h2><a href="mailto:3949536640@qq.com">3949536640@qq.com <span aria-hidden="true">↗</span></a></div></section>;
}

function ResearchView() {
  return <div className="portfolio-variant research-view portfolio-scenes"><ScrollProgress /><ScrollReveal><ResearchEntry /></ScrollReveal><ScrollReveal><ResearchProjectWall /></ScrollReveal><ScrollReveal><ResearchWorkingIndex /></ScrollReveal><ScrollReveal><ResearchJudgments /></ScrollReveal><ScrollReveal><ResearchContact /></ScrollReveal></div>;
}

export function FiveScreenPortfolio() { return <FiveView />; }

export function ResearchLedPortfolio() { return <ResearchView />; }
