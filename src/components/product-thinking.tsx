"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { thoughtArticles } from "@/content/thinking";

const relatedProjects = ["novera-ai", "growthos", "growthos", "novera-ai"];

export function ProductThinking() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const article = thoughtArticles[active];

  const selectArticle = (index: number) => setActive((index + thoughtArticles.length) % thoughtArticles.length);
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (direction) {
      event.preventDefault();
      const next = (index + direction + thoughtArticles.length) % thoughtArticles.length;
      selectArticle(next);
      tabRefs.current[next]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : thoughtArticles.length - 1;
      selectArticle(next);
      tabRefs.current[next]?.focus();
    }
  };

  return <div className="product-thinking" aria-label="产品思考专栏">
    <div className="thinking-archive" role="tablist" aria-label="选择文章">
      {thoughtArticles.map((item, index) => <button
        key={item.slug}
        type="button"
        role="tab"
        id={`thinking-tab-${item.slug}`}
        aria-selected={active === index}
        aria-controls="thinking-article"
        tabIndex={active === index ? 0 : -1}
        ref={(node) => { tabRefs.current[index] = node; }}
        onKeyDown={(event) => handleKeyDown(event, index)}
        onClick={() => selectArticle(index)}
        className={index === 0 ? "thinking-archive-feature" : "thinking-archive-item"}
      >
        <span className="thinking-archive-number">{item.number}</span>
        <span className="thinking-archive-title">{item.title}</span>
        <span className="thinking-archive-summary">{item.summary}</span>
        <span className="thinking-archive-meta">阅读文章 <i aria-hidden="true">↗</i></span>
      </button>)}
    </div>

    <article className="thinking-article" id="thinking-article" role="tabpanel" aria-labelledby={`thinking-tab-${article.slug}`} tabIndex={0} key={article.slug}>
      <header className="thinking-article-header">
        <div><span className="thinking-article-number">{article.number} / 产品思考</span></div>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
      </header>
      <blockquote>{article.quote}</blockquote>
      <div className="thinking-article-body">
        {article.sections.map((section) => <section key={section.heading}><h4>{section.heading}</h4>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
      </div>
      <footer className="thinking-article-footer">
        <p>{article.closing}</p>
        <Link href={`/work/${relatedProjects[active]}`}>阅读相关项目案例 <span aria-hidden="true">↗</span></Link>
      </footer>
    </article>
  </div>;
}
