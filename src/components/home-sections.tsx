import { HeroWorkbench } from "@/components/hero-workbench";
import Link from "next/link";
import { ProjectShowcase } from "@/components/project-showcase";
import { BuildMethod } from "@/components/build-method";
import { ProductThinking } from "@/components/product-thinking";
import { ContactSurface } from "@/components/contact-surface";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollReveal } from "@/components/scroll-reveal";

export function HomeSections() {
  return <>
    <ScrollProgress />
    <ScrollReveal><section className="hero-canvas" aria-labelledby="hero-title"><div className="hero-canvas-orbit" aria-hidden="true"><span>杜嘉奇</span><i /></div><div className="container hero-canvas-grid"><div className="hero-canvas-copy"><p className="hero-canvas-kicker"><span>一个想法，怎样才能真正被使用</span><i /></p><h1 id="hero-title">我喜欢研究问题，也喜欢<span>亲手把想法做出来</span></h1><p className="hero-canvas-lead">我是杜嘉奇，围绕企业知识问答、内容生产和长文审查做产品实践。我的工作从梳理任务开始，经过流程设计、原型实现和测试，再回到问题本身。</p><div className="hero-canvas-actions"><a className="button button-electric" href="#work">看看我做的项目 <span>↘</span></a><a className="hero-index-link" href="#about">先认识我</a></div><div className="hero-project-links" aria-label="三个项目入口"><Link href="/work/growthos">看看内容工作流 <span>↗</span></Link><Link href="/work/novera-ai">探索知识检索 <span>↗</span></Link><Link href="/work/evidra">看看长文审查 <span>↗</span></Link></div><div className="hero-canvas-foot"><span>问题梳理</span><span>工作流设计</span><span>测试验证</span></div></div><div className="hero-canvas-object"><HeroWorkbench /><span className="hero-object-caption">交互产品原型</span></div></div><a className="hero-canvas-scroll" href="#work"><span>查看三个独立项目</span><i /></a></section></ScrollReveal>
    <ScrollReveal><section className="archive-section" id="work" aria-labelledby="work-title"><div className="container"><div className="archive-header"><div><p className="archive-kicker">精选项目 / 03</p><h2 id="work-title">三个项目，对应三类 AI 工作任务</h2></div><p className="archive-intro">GrowthOS 关注内容生产，Novera AI 探索企业知识问答，Evidra 聚焦文章论点审查。这里看项目定位，完整过程见各自案例。</p></div><ProjectShowcase /></div></section></ScrollReveal>
    <ScrollReveal><section className="build-method-section" id="method" aria-labelledby="method-title"><div className="container"><div className="build-method-heading"><p className="archive-kicker">我的工作方式 / 六个阶段</p><h2 id="method-title">我如何推进 AI 产品</h2><p>从界定任务到检查改动，用六个阶段记录判断、实现和复验。</p></div><BuildMethod /></div></section></ScrollReveal>
    <ScrollReveal><section className="thinking-section-new" id="thinking" aria-labelledby="thinking-title"><div className="container"><div className="thinking-heading-new"><p className="archive-kicker">产品思考</p><h2 id="thinking-title">我为什么这样设计</h2><p>选一个项目，了解它面对的问题、我的判断，以及设计如何进入产品。</p></div><ProductThinking /></div></section></ScrollReveal>
    <ScrollReveal><section className="about-surface" id="about" aria-labelledby="about-title"><div className="container about-surface-grid"><p className="archive-kicker">关于我</p><div className="about-surface-content"><h2 id="about-title">比起马上得到答案，我更想先弄明白问题是什么</h2><p className="about-surface-lead">我是杜嘉奇。一个想法如果一直停留在脑子里，我总会想试着把它做出来，再看看它在真实任务里会不会有用。</p><div className="about-surface-writing"><p>我会观察一个东西为什么这样设计：哪里让人放心，哪里让人犹豫，哪一步其实可以更简单。这个习惯也带进了我的产品实践里。</p><p>做项目时，我喜欢把大问题拆成一个个能操作、能检查的小问题。模型能做什么、程序应该拦住什么、用户必须自己判断什么，我会尽量在流程里写清楚。</p><p>我还在积累从问题探索到产品交付的经验，也会保留对审美、表达和日常细节的好奇心。对我来说，产品不只是功能的集合，也是人和信息相处的方式。</p></div><div className="about-surface-tags">{["问题拆解", "流程观察", "动手验证", "持续学习"].map((item) => <span key={item}>{item}</span>)}</div></div></div></section></ScrollReveal>
    <ScrollReveal><ContactSurface /></ScrollReveal>
  </>;
}
