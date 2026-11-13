"use client";

import { useLayoutEffect } from "react";

export function ContentCloudReveal({ selector }: { selector: string }) {
  useLayoutEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const items = document.querySelectorAll<HTMLElement>(selector);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const item = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          item.dataset.cloudShown = "true";
        } else {
          delete item.dataset.cloudShown;
        }
      }
    });

    for (const item of items) {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.dataset.cloudShown = "true";
      }
      item.dataset.cloudReady = "true";
      observer.observe(item);
    }

    return () => observer.disconnect();
  }, [selector]);

  return null;
}
