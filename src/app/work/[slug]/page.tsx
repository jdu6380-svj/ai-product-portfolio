import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case-study";
import { SiteHeader } from "@/components/site-header";
import { getProject, projects } from "@/content/portfolio";
export const instant = false;
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = getProject(slug); return project ? { title: `${project.title} / 杜嘉奇`, description: project.description } : { title: "未找到项目 / 杜嘉奇" }; }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = getProject(slug); if (!project) notFound(); return <><SiteHeader /><main><CaseStudy project={project} /></main></>; }
