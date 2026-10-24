"use client";

import { useEffect, useRef, useState } from "react";

export function ContactSurface() {
  const [copyState, setCopyState] = useState<"idle" | "email" | "wechat" | "failed-email" | "failed-wechat">("idle");
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = "3949536640@qq.com";
  const wechat = "Du-jQ7";

  useEffect(() => () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  }, []);

  const copyValue = async (value: string, field: "email" | "wechat") => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);

    try {
      await navigator.clipboard.writeText(value);
      setCopyState(field);
    } catch {
      setCopyState(field === "email" ? "failed-email" : "failed-wechat");
    }

    feedbackTimer.current = setTimeout(() => setCopyState("idle"), 2400);
  };

  const feedback = copyState === "email"
    ? "邮箱已复制到剪贴板"
    : copyState === "wechat"
      ? "微信号已复制到剪贴板"
      : copyState === "failed-email"
        ? `暂时无法复制，请手动复制 ${email}`
        : copyState === "failed-wechat"
          ? `暂时无法复制，请手动复制 ${wechat}`
          : "邮箱和微信都可以直接联系我";

  return <section className="contact-surface" id="contact" aria-labelledby="contact-title"><div className="container contact-surface-grid"><div><p className="archive-kicker">联系</p><h2 id="contact-title">想聊聊正在做的事？</h2></div><div className="contact-surface-copy"><p>欢迎给我写封邮件，也可以先从一个项目或一个具体问题聊起。</p><div className="contact-links"><div className="contact-link-row"><a href={`mailto:${email}`}>邮箱 <strong>{email}</strong> <span>↗</span></a><button type="button" onClick={() => copyValue(email, "email")} aria-label="复制邮箱">{copyState === "email" ? "已复制" : "复制"}</button></div><div className="contact-link-row"><span className="contact-static">微信 <strong>{wechat}</strong></span><button type="button" onClick={() => copyValue(wechat, "wechat")} aria-label="复制微信号">{copyState === "wechat" ? "已复制" : "复制"}</button></div></div><small className="contact-feedback" data-state={copyState} role="status" aria-live="polite">{feedback}</small></div></div></section>;
}
