"use client";

import type { MouseEvent, ReactNode } from "react";

const growthOSWorkflowUrl = "https://growthos-phase3-mvp.vercel.app/workflow";

export function GrowthOSExperienceLink({ className, children = "登录后体验" }: { className?: string; children?: ReactNode }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const shouldContinue = window.confirm("GrowthOS 体验需要登录，请先登录后继续。\n\n点击“确定”继续体验。");
    if (shouldContinue) window.open(growthOSWorkflowUrl, "_blank", "noopener,noreferrer");
  };

  return <a className={className} href={growthOSWorkflowUrl} target="_blank" rel="noreferrer" onClick={handleClick}>{children} <span aria-hidden="true">↗</span></a>;
}
