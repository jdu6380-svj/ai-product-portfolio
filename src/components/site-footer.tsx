import Link from "next/link";

const footerLinks = [
  ["/work/growthos", "GrowthOS"],
  ["/work/novera-ai", "Novera AI"],
  ["/work/evidra", "Evidra"],
] as const;

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-inner">
      <div className="footer-brand"><Link href="/" aria-label="回到杜嘉奇首页">杜嘉奇</Link><span>个人产品实践</span></div>
      <nav className="footer-projects" aria-label="项目案例">
        {footerLinks.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <div className="footer-meta"><span>问题 · 判断 · 试做</span><span>© 2026 杜嘉奇</span></div>
    </div>
  </footer>;
}
