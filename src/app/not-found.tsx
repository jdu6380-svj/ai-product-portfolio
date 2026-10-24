import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return <><SiteHeader /><main className="not-found"><div className="container"><p className="section-kicker">返回项目与案例</p><div className="not-found-layout"><div><h1>浏览三个 AI 产品项目</h1><p>从首页查看项目概览，或直接进入一个完整案例。</p><Link className="button button-dark" href="/#work">浏览三个项目 <span>↗</span></Link></div><nav aria-label="项目案例"><Link href="/work/growthos">GrowthOS <span>01</span></Link><Link href="/work/novera-ai">Novera AI <span>02</span></Link><Link href="/work/evidra">Evidra <span>03</span></Link></nav></div></div></main></>;
}
