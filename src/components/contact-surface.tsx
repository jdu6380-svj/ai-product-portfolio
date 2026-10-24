"use client";

import { useEffect, useRef, useState } from "react";

export function ContactSurface() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  }, []);

  const copyWechat = async () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);

    try {
      await navigator.clipboard.writeText("Du-jQ7");
      setCopyState("copied");
    } catch {
      setCopyState("manual");
    }

    feedbackTimer.current = setTimeout(() => setCopyState("idle"), 2400);
  };

  const copied = copyState === "copied";
  const feedback = copyState === "copied"
    ? "微信号已复制到剪贴板"
    : copyState === "manual"
      ? "暂时无法复制，请手动复制 Du-jQ7"
      : "Email / Phone / WeChat";

  return <section className="contact-surface" id="contact" aria-labelledby="contact-title"><div className="container contact-surface-grid"><div><p className="archive-kicker">CONTACT / 06</p><h2 id="contact-title">欢迎交流 AI 产品与工作机会</h2></div><div className="contact-surface-copy"><p>如果你正在寻找能把问题、AI 工作流和真实产品实现连起来的人，欢迎联系我。</p><div className="contact-links"><a href="mailto:3949536640@qq.com">3949536640@qq.com <span>↗</span></a><a href="tel:13809637859">138 0963 7859 <span>↗</span></a><button type="button" onClick={copyWechat} aria-label="复制微信号">微信 Du-jQ7 <span>{copied ? "已复制" : copyState === "manual" ? "手动复制" : "复制"}</span></button></div><small className="contact-feedback" data-state={copyState} role="status" aria-live="polite">{feedback}</small></div></div></section>;
}
