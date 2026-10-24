import { HeroWorkbench } from "@/components/hero-workbench";
import { ProjectShowcase } from "@/components/project-showcase";
import { BuildMethod } from "@/components/build-method";
import { ProductThinking } from "@/components/product-thinking";
import { ContactSurface } from "@/components/contact-surface";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollReveal } from "@/components/scroll-reveal";

export function HomeSections() {
  return <>
    <ScrollProgress />
    <ScrollReveal><section className="hero-canvas" aria-labelledby="hero-title"><div className="hero-canvas-orbit" aria-hidden="true"><span>DU JIAQI</span><i /></div><div className="container hero-canvas-grid"><div className="hero-canvas-copy"><p className="hero-canvas-kicker"><span>AI PRODUCT BUILDER</span><i /><span>2026—NOW</span></p><h1 id="hero-title">从问题定义，到 <span>AI 产品落地</span></h1><p className="hero-canvas-lead">围绕真实使用场景，设计 AI 工作流，通过实现、验证与迭代，把想法转化为可以体验的产品。</p><div className="hero-canvas-actions"><a className="button button-electric" href="#work">查看核心项目 <span>↘</span></a><a className="hero-index-link" href="#method">我的构建方法 / 03</a></div><div className="hero-canvas-foot"><span>问题定义</span><span>AI 工作流</span><span>真实验证</span></div></div><div className="hero-canvas-object"><HeroWorkbench /><span className="hero-object-caption">A / INTERACTIVE PRODUCT PROTOTYPES</span></div></div><a className="hero-canvas-scroll" href="#work"><span>向下滚动，查看工作如何展开</span><i /></a></section></ScrollReveal>
    <ScrollReveal><section className="archive-section" id="work" aria-labelledby="work-title"><div className="container"><div className="archive-header"><div><p className="archive-kicker">SELECTED WORK / 03 PRODUCTS</p><h2 id="work-title">从真实问题出发，<em>把产品做出来</em></h2></div><p className="archive-intro">三款 AI 产品，三种不同的问题。沿着每个项目，看我怎样发现、判断、构建并验证。</p></div><ProjectShowcase /></div></section></ScrollReveal>
    <ScrollReveal><section className="build-method-section" id="method" aria-labelledby="method-title"><div className="container"><div className="build-method-heading"><p className="archive-kicker">HOW I BUILD PRODUCTS / 06 MOVES</p><h2 id="method-title">从问题定义到产品验证</h2><p>一条从任务理解、方案取舍到实现复验的工作路径。</p></div><BuildMethod /></div></section></ScrollReveal>
    <ScrollReveal><section className="thinking-section-new" id="thinking" aria-labelledby="thinking-title"><div className="container"><div className="thinking-heading-new"><p className="archive-kicker">PRODUCT THINKING / 03 DECISIONS</p><h2 id="thinking-title">把产品选择说清楚</h2><p>查看三个项目中的具体决策：它影响什么任务，如何进入产品，又有什么依据。</p></div><ProductThinking /></div></section></ScrollReveal>
    <ScrollReveal><section className="about-surface" id="about" aria-labelledby="about-title"><div className="container about-surface-grid"><p className="archive-kicker">ABOUT / 05</p><div className="about-surface-content"><h2 id="about-title">关注 AI 产品从判断到实现</h2><p className="about-surface-lead">我是杜佳琪，关注人工智能产品、用户体验与实际工作流之间的连接。</p><div className="about-surface-writing"><p>我倾向于先把目标用户、要完成的任务和现有阻碍说清楚，再决定产品应该提供什么帮助。对我来说，好的 AI 产品不仅要有模型能力，也要让用户看得懂输入如何变成结果、如何检查结果，以及接下来能做什么。</p><p>在项目中，我会把想法收敛为可操作的 MVP，梳理页面与关键状态，并借助 GPT、Codex 等工具辅助方案探索和实现。产品是否达到目标，仍要回到真实流程、测试条件和验收标准中检查。</p><p>目前我持续探索企业知识问答、内容可信度审查与 AI 内容生产工作流，也希望在更真实的团队协作和用户场景中继续打磨这些产品方法。</p></div><div className="about-surface-tags">{["AI 产品", "产品策略", "工作流设计", "用户体验", "快速原型", "产品迭代"].map((item) => <span key={item}>{item}</span>)}</div></div></div></section></ScrollReveal>
    <ScrollReveal><ContactSurface /></ScrollReveal>
  </>;
}
