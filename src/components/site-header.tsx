import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><div className="container header-inner"><Link className="wordmark" href="/" aria-label="杜佳琪首页"><span className="wordmark-mark">杜</span><span>人工智能产品构建者</span></Link><nav className="main-nav" aria-label="主导航"><Link href="/#work">项目</Link><Link href="/#method">方法</Link><Link href="/#thinking">思考</Link><Link href="/#about">关于</Link></nav><div className="header-actions"><Link href="/#contact">联系</Link><span className="availability"><span className="availability-dot" />正在寻找新机会</span></div></div></header>;
}
