import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-product-portfolio-khaki.vercel.app"),
  title: "杜嘉奇 / 产品实践",
  description: "围绕企业知识问答、内容生产与长文审查开展产品实践，记录问题、判断、试做和验证。",
  openGraph: { title: "杜嘉奇 / 产品实践", description: "GrowthOS、Novera AI 与 Evidra 的产品实践、设计判断和验证记录。", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
