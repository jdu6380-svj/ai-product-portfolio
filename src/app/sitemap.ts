import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-12");
  return ["", "/work/evidra", "/work/growthos", "/work/novera-ai"].map((path) => ({ url: `https://example.com${path}`, lastModified }));
}
