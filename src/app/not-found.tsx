import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return <><SiteHeader /><main className="not-found"><div className="container"><p className="section-kicker">404 / 返回作品集</p><div className="not-found-layout"><div><h1>继续探索产品如何成形</h1><p>从首页浏览三个独立项目，或直接打开一份完整案例。</p><Link className="button button-dark" href="/#work">浏览精选项目 <span>↗</span></Link></div><nav aria-label="项目案例"><Link href="/work/growthos">GrowthOS <span>01</span></Link><Link href="/work/novera-ai">Novera AI <span>02</span></Link><Link href="/work/evidra">Evidra <span>03</span></Link></nav></div></div></main><SiteFooter /></>;
}
