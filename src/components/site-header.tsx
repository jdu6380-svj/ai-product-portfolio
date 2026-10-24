import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><div className="container header-inner"><Link className="wordmark" href="/" aria-label="杜嘉奇首页"><span className="wordmark-mark">杜</span><span>杜嘉奇</span></Link><nav className="main-nav" aria-label="主导航"><Link href="/#work">项目</Link><Link href="/#method">工作方式</Link><Link href="/#thinking">产品思考</Link><Link href="/#about">关于</Link></nav><div className="header-actions"><Link href="/#contact">联系</Link></div></div></header>;
}
