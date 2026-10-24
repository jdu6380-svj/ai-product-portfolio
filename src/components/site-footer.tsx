import Link from "next/link";

const footerLinks = [
  ["/work/growthos", "GrowthOS"],
  ["/work/novera-ai", "Novera AI"],
  ["/work/evidra", "Evidra"],
] as const;

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-inner">
      <div className="footer-brand"><Link href="/" aria-label="回到杜佳琪作品集首页">杜佳琪</Link><span>人工智能产品构建者</span></div>
      <nav className="footer-projects" aria-label="项目案例">
        {footerLinks.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <div className="footer-meta"><span>问题 → 产品 → 证据</span><span>© 2026 杜佳琪</span></div>
    </div>
  </footer>;
}
