import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "杜佳琪 / 人工智能产品构建者",
  description: "一名探索产品策略、人工智能工作流、用户体验与真实用户验证的人工智能产品构建者。",
  openGraph: { title: "杜佳琪 / 人工智能产品构建者", description: "围绕真实问题，持续构建、测试并迭代人工智能产品。", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
