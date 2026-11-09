"use client";

import { useEffect } from "react";

type ProjectTransitionFallbackProps = { page: "home" | "detail" };

/** Adds a restrained route treatment when native shared view transitions are unavailable. */
export function ProjectTransitionFallback({ page }: ProjectTransitionFallbackProps) {
  useEffect(() => {
    const supportsViewTransitions = typeof document.startViewTransition === "function";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let shouldAnimate = false;
    try {
      const transitionKey = page === "detail" ? "project-route-transition" : "project-route-return";
      shouldAnimate = window.sessionStorage.getItem(transitionKey) === "started";
      window.sessionStorage.removeItem(transitionKey);
    } catch {
      // Storage can be unavailable in restricted browser contexts; use the route fallback.
    }
    if (prefersReducedMotion || (page === "home" && !shouldAnimate)) return;
    if (supportsViewTransitions && (shouldAnimate || page === "home")) return;

    document.documentElement.classList.add("project-transition-fallback");
    const markProjectReturn = () => {
      try {
        window.sessionStorage.setItem("project-route-return", "started");
      } catch {
        // The visible route still works when storage is unavailable.
      }
    };
    const onPopState = () => markProjectReturn();
    const onReturnLink = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest("a.back-link[href^='/#five-projects']")) markProjectReturn();
    };
    if (page === "detail") {
      window.addEventListener("popstate", onPopState);
      document.addEventListener("click", onReturnLink, true);
    }

    return () => {
      document.documentElement.classList.remove("project-transition-fallback");
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onReturnLink, true);
    };
  }, [page]);

  return null;
}
