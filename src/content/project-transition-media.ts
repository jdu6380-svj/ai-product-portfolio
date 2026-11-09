import type { Project } from "@/content/portfolio";

export const projectTransitionMedia: Record<Project["slug"], { src?: string; alt: string; caption: string }> = {
  growthos: {
    src: "/growthos/workflow.jpg",
    alt: "GrowthOS 六阶段内容生产工作台截图",
    caption: "内容生产工作台",
  },
  "novera-ai": {
    src: "/novera/knowledge-home.jpg",
    alt: "Novera AI 企业知识工作台首页截图",
    caption: "企业知识工作台",
  },
  evidra: {
    src: "/evidra/article-workbench.jpg",
    alt: "Evidra 文章内容输入与可信度审查工作台截图",
    caption: "文章工作台",
  },
};
