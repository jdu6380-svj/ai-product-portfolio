import Link from "next/link";

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main-content">跳到正文</a>
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" href="/" aria-label="杜嘉奇首页">
          <span className="wordmark-mark">杜</span>
          <span>杜嘉奇</span>
        </Link>
        <nav className="main-nav" aria-label="主导航">
          <Link href="/#five-projects">项目展示</Link>
          <Link href="/#method">产品构建</Link>
          <Link href="/#thinking">产品思考</Link>
          <Link className="mobile-contact-link" href="/#contact">联系</Link>
        </nav>
        <div className="header-actions">
          <Link href="/#contact">联系 <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </header>
  </>;
}
