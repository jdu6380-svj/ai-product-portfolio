import type { Metadata } from "next";
import { SceneEffects } from "@/components/scene-effects";
import { PortfolioNavigation } from "@/components/portfolio-navigation";
import "./globals.css";
import "./home-scenes.css";
import "./portfolio-variants.css";
import "./redesigned-portfolio.css";
import "./final-portfolio.css";
import "./content-sections.css";
import "./case-study-redesign.css";
import "./readability-pass.css";
import "./visual-hierarchy.css";
import "./portfolio-second-pass.css";
import "./project-transitions.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-product-portfolio-khaki.vercel.app"),
  title: "杜嘉奇 / 产品实践",
  description: "围绕企业知识问答、内容生产与长文审查开展产品实践，记录问题、判断、试做和验证。",
  openGraph: { title: "杜嘉奇 / 产品实践", description: "GrowthOS、Novera AI 与 Evidra 的产品实践、设计判断和验证记录。", url: "https://ai-product-portfolio-khaki.vercel.app/", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN" data-scroll-behavior="smooth"><body><PortfolioNavigation><SceneEffects />{children}</PortfolioNavigation></body></html>;
}
