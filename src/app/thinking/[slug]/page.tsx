import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { thoughtArticles } from "@/content/thinking";

// The article content is selected from the route params on the server. Opt this
// dynamic segment out of instant shell validation so prefetching a thinking
// article does not surface a URL-data warning in development.
export const instant = false;

export function generateStaticParams() {
  return thoughtArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = thoughtArticles.find((item) => item.slug === slug);
  return article ? { title: `${article.title} / 杜嘉奇`, description: article.summary } : { title: "未找到文章 / 杜嘉奇" };
}

export default async function ThinkingArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = thoughtArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  return <main className="thinking-page" id="main-content">
    <div className="thinking-page-shell">
      <Link className="thinking-page-back" href="/#thinking">← 返回产品思考</Link>
      <header className="thinking-page-header">
        <span>{article.number} / {article.topics}</span>
        <h1>{article.title}</h1>
        <p>{article.summary}</p>
        <blockquote>{article.quote}</blockquote>
      </header>
      <div className="thinking-page-body">
        {article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
        <p className="thinking-page-closing">{article.closing}</p>
      </div>
    </div>
  </main>;
}
