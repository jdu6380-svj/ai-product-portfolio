"use client";

import { useEffect, useRef, useState } from "react";

export function ContactSurface() {
  const [copyState, setCopyState] = useState<"idle" | "email" | "failed-email">("idle");
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = "3949536640@qq.com";

  useEffect(() => () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  }, []);

  const copyValue = async (value: string) => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);

    try {
      await navigator.clipboard.writeText(value);
      setCopyState("email");
    } catch {
      setCopyState("failed-email");
    }

    feedbackTimer.current = setTimeout(() => setCopyState("idle"), 2400);
  };

  const feedback = copyState === "email"
    ? "邮箱已复制到剪贴板"
    : copyState === "failed-email"
      ? `暂时无法复制，请手动复制 ${email}`
      : "欢迎从一个具体问题开始交流";

  return <section className="portfolio-scene scene-contact contact-surface" id="contact" aria-labelledby="contact-title"><div className="container contact-surface-grid"><div><p className="archive-kicker">05 / 联系</p><h2 id="contact-title">好的产品，<br /><span>从一次值得深入的交流开始。</span></h2></div><div className="contact-surface-copy"><div className="contact-links"><div className="contact-link-row"><a href={`mailto:${email}`}>邮箱 <strong>{email}</strong> <span>↗</span></a><button type="button" onClick={() => copyValue(email)} aria-label="复制邮箱">{copyState === "email" ? "已复制" : "复制"}</button></div></div><small className="contact-feedback" data-state={copyState} role="status" aria-live="polite">{feedback}</small></div></div></section>;
}
