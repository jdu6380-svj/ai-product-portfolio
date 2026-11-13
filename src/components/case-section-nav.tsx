"use client";

import { useEffect, useRef, useState } from "react";

export function CaseSectionNav({ items }: { items: readonly (readonly [string, string])[] }) {
  const [active, setActive] = useState<string>(items[0][0]);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const threshold = Math.min(180, window.innerHeight * 0.3);
        let current = items[0][0];
        for (const [id] of items) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= threshold) current = id;
        }
        setActive(current);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, [items]);

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!nav || !link) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
      nav.scrollBy({ left: linkRect.left - navRect.left - 16, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  }, [active]);

  return <aside ref={navRef} className="case-nav" aria-label="项目案例章节">
    <p>本页内容</p>
    {items.map(([id, label]) => <a href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined} onClick={() => setActive(id)}>{label}</a>)}
  </aside>;
}
