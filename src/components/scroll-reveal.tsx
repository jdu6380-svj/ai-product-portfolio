"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const anchorId = window.location.hash.slice(1);
    const anchorTarget = anchorId ? document.getElementById(anchorId) : null;
    if (anchorTarget?.closest(".scroll-reveal") === node) {
      node.dataset.anchorTarget = "true";
      node.dataset.ready = "true";
      node.dataset.revealed = "true";
      window.requestAnimationFrame(() => {
        window.scrollTo({
          top: window.scrollY + anchorTarget.getBoundingClientRect().top,
          behavior: "instant",
        });
      });
      return;
    }

    node.dataset.ready = "true";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.revealed = "true";
          observer.unobserve(node);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
