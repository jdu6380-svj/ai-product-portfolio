"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function SceneEffects() {
  const pathname = usePathname();
  const isPortfolioRoute = pathname === "/" || pathname === "/five-screen";
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("portfolio-home-route", isPortfolioRoute);
    if (!isPortfolioRoute) {
      document.documentElement.classList.remove("scene-transition-active", "scene-curtain-active", "scene-page-hidden");
      document.body.classList.remove("scene-transitioning", "scene-curtain-covering", "scene-curtain-paused", "scene-curtain-revealing", "scene-luminous-covering", "scene-luminous-paused", "scene-luminous-revealing");
      const markContactNavigation = (event: MouseEvent) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = event.target as HTMLElement | null;
        const link = target?.closest<HTMLAnchorElement>("a[href]");
        if (!link) return;
        const url = new URL(link.href, window.location.href);
        if (url.origin === window.location.origin && url.pathname === "/" && url.hash === "#contact") {
          document.documentElement.dataset.portfolioContactReveal = "true";
        }
      };
      document.addEventListener("click", markContactNavigation, true);
      return () => document.removeEventListener("click", markContactNavigation, true);
    }
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".portfolio-scene, .five-section"));
    const fiveView = document.querySelector<HTMLElement>(".five-view");
    if (!fiveView && sections.length === 0) {
      document.documentElement.classList.remove("scene-transition-active", "scene-curtain-active", "scene-page-hidden");
      document.body.classList.remove("scene-transitioning", "scene-curtain-covering", "scene-curtain-paused", "scene-curtain-revealing", "scene-luminous-covering", "scene-luminous-paused", "scene-luminous-revealing");
      return;
    }
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (fiveView) {
      window.history.scrollRestoration = "manual";
    }
    if (fiveView && navigation?.type === "reload" && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        window.setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0);
      });
    }
    if (fiveView && navigation?.type === "reload" && window.location.hash === "#five-projects") {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    let frame = 0;
    let pointerFrame = 0;
    let pointer: PointerEvent | null = null;
    let activePointerSection: HTMLElement | null = null;
    let coverTimer = 0;
    let revealStartTimer = 0;
    let revealTimer = 0;
    let luminousCoverTimer = 0;
    let luminousRevealStartTimer = 0;
    let luminousRevealTimer = 0;
    let depthTimer = 0;
    let transitionLocked = false;
    let transitionDestination: HTMLElement | null = null;
    let contactTransitionPlayed = window.location.hash === "#contact";
    let touchStartY: number | null = null;
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const curtainCoverDuration = 350;
    const curtainPauseDuration = 100;
    const curtainRevealDuration = 350;
    const luminousCoverDuration = 370;
    const luminousPauseDuration = 100;
    const luminousRevealDuration = 370;

    const setSectionLocation = (destination: HTMLElement, href: string) => {
      if (window.location.hash !== href) window.history.pushState(window.history.state, "", href);
      const destinationTop = window.scrollY + destination.getBoundingClientRect().top;
      window.scrollTo({ top: Math.max(0, destinationTop), behavior: "instant" });
      const reveal = destination.closest<HTMLElement>(".scroll-reveal");
      if (reveal) reveal.dataset.revealed = "true";
    };

    const finishTransition = (kind: "scene-curtain" | "scene-luminous") => {
      const destination = transitionDestination;
      if (destination) {
        const destinationTop = window.scrollY + destination.getBoundingClientRect().top;
        window.scrollTo({ top: Math.max(0, destinationTop), behavior: "instant" });
        const reveal = destination.closest<HTMLElement>(".scroll-reveal");
        if (reveal) reveal.dataset.revealed = "true";
      }
      document.body.classList.remove(`${kind}-covering`, `${kind}-paused`, `${kind}-revealing`);
      document.documentElement.classList.remove("scene-transition-active", "scene-curtain-active");
      transitionLocked = false;
      transitionDestination = null;
    };

    const startCurtainTransition = (destination: HTMLElement, href: string) => {
      if (transitionLocked) return;
      if (reduceMotionQuery.matches) {
        setSectionLocation(destination, href);
        return;
      }

      transitionLocked = true;
      transitionDestination = destination;
      document.documentElement.classList.add("scene-transition-active", "scene-curtain-active");
      document.body.classList.remove("scene-luminous-covering", "scene-luminous-paused", "scene-luminous-revealing");
      document.body.classList.remove("scene-curtain-paused", "scene-curtain-revealing", "scene-curtain-covering");
      document.body.classList.add("scene-curtain-covering");
      if (window.location.hash !== href) window.history.pushState(window.history.state, "", href);

      coverTimer = window.setTimeout(() => {
        const destinationTop = window.scrollY + destination.getBoundingClientRect().top;
        window.scrollTo({ top: Math.max(0, destinationTop), behavior: "instant" });
        const reveal = destination.closest<HTMLElement>(".scroll-reveal");
        if (reveal) reveal.dataset.revealed = "true";
        document.body.classList.remove("scene-curtain-covering");
        document.body.classList.add("scene-curtain-paused");
        revealStartTimer = window.setTimeout(() => {
          document.body.classList.remove("scene-curtain-paused");
          document.body.classList.add("scene-curtain-revealing");
          revealTimer = window.setTimeout(() => finishTransition("scene-curtain"), curtainRevealDuration);
        }, curtainPauseDuration);
      }, curtainCoverDuration);
    };

    const startLuminousTransition = (destination: HTMLElement, href: string) => {
      if (transitionLocked) return;
      if (destination.id === "contact") contactTransitionPlayed = true;
      if (reduceMotionQuery.matches) {
        setSectionLocation(destination, href);
        return;
      }

      transitionLocked = true;
      transitionDestination = destination;
      document.documentElement.classList.add("scene-transition-active");
      document.body.classList.remove("scene-curtain-covering", "scene-curtain-paused", "scene-curtain-revealing");
      document.body.classList.remove("scene-luminous-paused", "scene-luminous-revealing", "scene-luminous-covering");
      document.body.classList.add("scene-luminous-covering");
      if (window.location.hash !== href) window.history.pushState(window.history.state, "", href);

      luminousCoverTimer = window.setTimeout(() => {
        const destinationTop = window.scrollY + destination.getBoundingClientRect().top;
        window.scrollTo({ top: Math.max(0, destinationTop), behavior: "instant" });
        const reveal = destination.closest<HTMLElement>(".scroll-reveal");
        if (reveal) reveal.dataset.revealed = "true";
        document.body.classList.remove("scene-luminous-covering");
        document.body.classList.add("scene-luminous-paused");
        luminousRevealStartTimer = window.setTimeout(() => {
          document.body.classList.remove("scene-luminous-paused");
          document.body.classList.add("scene-luminous-revealing");
          luminousRevealTimer = window.setTimeout(() => finishTransition("scene-luminous"), luminousRevealDuration);
        }, luminousPauseDuration);
      }, luminousCoverDuration);
    };

    const cancelTransition = () => {
      for (const timer of [coverTimer, revealStartTimer, revealTimer, luminousCoverTimer, luminousRevealStartTimer, luminousRevealTimer]) {
        if (timer) window.clearTimeout(timer);
      }
      finishTransition("scene-curtain");
      finishTransition("scene-luminous");
    };

    const onVisibilityChange = () => {
      document.documentElement.classList.toggle("scene-page-hidden", document.hidden);
    };
    const onResize = () => {
      // Complete an interrupted transition at its intended destination rather
      // than retaining a lock or an outdated viewport position.
      const destination = transitionDestination;
      if (destination) {
        cancelTransition();
        window.scrollTo({ top: window.scrollY + destination.getBoundingClientRect().top, behavior: "instant" });
        const reveal = destination.closest<HTMLElement>(".scroll-reveal");
        if (reveal) reveal.dataset.revealed = "true";
      }
      onScroll();
    };
    onVisibilityChange();

    const updateDepth = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      if (fiveView) {
        const spaceShift = Math.max(-44, Math.min(18, window.scrollY * -0.055));
        document.documentElement.style.setProperty("--space-shift", `${spaceShift.toFixed(2)}px`);
        document.documentElement.style.setProperty("--scene-shift", `${spaceShift.toFixed(2)}px`);

        const hero = fiveView.querySelector<HTMLElement>(".five-hero");
        if (contactTransitionPlayed && thinkingSection && window.scrollY < thinkingSection.offsetTop + Math.min(120, window.innerHeight * .15)) {
          contactTransitionPlayed = false;
        }
        if (hero) {
          const heroProgress = reduceMotionQuery.matches
            ? 0
            : Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / Math.max(hero.offsetHeight * 0.72, 1)));
          const heroScale = 1 - heroProgress * 0.08;
          document.documentElement.style.setProperty("--hero-scale", heroScale.toFixed(4));
        }
      }
      if (!fiveView) {
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          const distance = (rect.top + rect.height / 2 - viewportCenter) / Math.max(window.innerHeight, 1);
          const shift = Math.max(-28, Math.min(28, distance * -18));
          document.documentElement.style.setProperty("--scene-shift", `${shift.toFixed(2)}px`);
        }
      }

    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDepth);
    };

    if (sections.length || fiveView) {
      depthTimer = window.setTimeout(updateDepth, 0);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!fiveView || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
      pointer = event;
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!pointer) return;
        const target = pointer.target instanceof Element ? pointer.target.closest<HTMLElement>(".five-section") : null;
        if (!target) return;
        if (activePointerSection && activePointerSection !== target) {
          activePointerSection.style.setProperty("--pointer-x", "0px");
          activePointerSection.style.setProperty("--pointer-y", "0px");
        }
        activePointerSection = target;
        const bounds = target.getBoundingClientRect();
        const x = ((pointer.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2;
        const y = ((pointer.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2;
        target.style.setProperty("--pointer-x", `${(x * 8).toFixed(2)}px`);
        target.style.setProperty("--pointer-y", `${(y * 6).toFixed(2)}px`);
        const viewportX = (pointer.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
        const viewportY = (pointer.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
        fiveView.style.setProperty("--space-pointer-x", `${(viewportX * 18).toFixed(2)}px`);
        fiveView.style.setProperty("--space-pointer-y", `${(viewportY * 14).toFixed(2)}px`);
        pointer = null;
      });
    };
    const resetPointer = () => {
      pointer = null;
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      activePointerSection?.style.setProperty("--pointer-x", "0px");
      activePointerSection?.style.setProperty("--pointer-y", "0px");
      fiveView?.style.setProperty("--space-pointer-x", "0px");
      fiveView?.style.setProperty("--space-pointer-y", "0px");
      activePointerSection = null;
    };
    fiveView?.addEventListener("pointermove", onPointerMove, { passive: true });
    fiveView?.addEventListener("pointerleave", resetPointer);
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onAnchorClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;

      const hash = url.hash.slice(1);
      const destination = document.getElementById(hash);
      if (!destination) return;

      const reveal = destination.closest<HTMLElement>(".scroll-reveal");
      if (reveal) reveal.dataset.revealed = "true";

      const href = `${url.pathname}${url.search}${url.hash}`;
      if (transitionLocked) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (link.dataset.sceneTransition === "hero") {
        event.preventDefault();
        startCurtainTransition(destination, href);
      } else if (hash === "contact" && fiveView) {
        event.preventDefault();
        startLuminousTransition(destination, href);
      }
    };

    const hero = fiveView?.querySelector<HTMLElement>(".five-hero");
    const projectSection = document.getElementById("five-projects");
    const thinkingSection = document.getElementById("thinking");
    const finalThinkingPerspective = thinkingSection?.querySelector<HTMLElement>(".thinking-perspective:last-child");
    const contactSection = document.getElementById("contact");

    const startAtHeroBoundary = () => {
      if (!hero || !projectSection || hero.getBoundingClientRect().bottom < 24 || hero.getBoundingClientRect().top > 4) return false;
      startCurtainTransition(projectSection, "#five-projects");
      return true;
    };

    const startAtContactBoundary = () => {
      if (!thinkingSection || !finalThinkingPerspective || !contactSection || contactTransitionPlayed) return false;
      // Preserve natural scrolling until the final perspective has left the
      // viewport; only the next downward input may then enter the contact scene.
      const thinkingRect = thinkingSection.getBoundingClientRect();
      const inThinkingScene = thinkingRect.top <= window.innerHeight * 0.45 && thinkingRect.bottom > 0;
      if (!inThinkingScene || finalThinkingPerspective.getBoundingClientRect().bottom > 0) return false;
      startLuminousTransition(contactSection, "#contact");
      return true;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (transitionLocked) {
        event.preventDefault();
        return;
      }
      if (event.deltaY <= 0) return;
      if (startAtHeroBoundary()) {
        event.preventDefault();
        return;
      }
      if (startAtContactBoundary()) event.preventDefault();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      if (transitionLocked) {
        event.preventDefault();
        return;
      }
      const currentY = event.touches[0]?.clientY;
      if (touchStartY === null || currentY === undefined || touchStartY - currentY < 18) return;
      if (startAtHeroBoundary() || startAtContactBoundary()) event.preventDefault();
    };

    const onTouchEnd = () => { touchStartY = null; };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, select, [contenteditable='true']")) return;
      if (transitionLocked && ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        event.preventDefault();
        return;
      }
      const isPageStep = event.key === "PageDown" || (event.key === " " && !(target instanceof HTMLElement && target.closest("a, button")));
      if (!isPageStep && event.key !== "ArrowDown") return;
      if (transitionLocked) {
        event.preventDefault();
        return;
      }
      if (startAtHeroBoundary()) {
        event.preventDefault();
        return;
      }
      if (thinkingSection && contactSection) {
        const distance = contactSection.getBoundingClientRect().top;
        const threshold = isPageStep ? window.innerHeight * 1.25 : 150;
        if (distance <= threshold && distance > -window.innerHeight * 0.55 && startAtContactBoundary()) event.preventDefault();
      }
    };

    const onPopState = () => {
      if (!fiveView) return;
      if (transitionLocked) cancelTransition();
      const destination = window.location.hash
        ? document.getElementById(window.location.hash.slice(1))
        : hero;
      if (window.location.hash !== "#contact") contactTransitionPlayed = false;
      if (destination) {
        window.requestAnimationFrame(() => {
          const top = window.scrollY + destination.getBoundingClientRect().top;
          window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
        });
      }
    };

    if (fiveView) {
      document.addEventListener("click", onAnchorClick, true);
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      window.addEventListener("touchcancel", onTouchEnd, { passive: true });
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("popstate", onPopState);
    }
    if (fiveView && window.location.hash === "#contact" && document.documentElement.dataset.portfolioContactReveal === "true" && contactSection) {
      delete document.documentElement.dataset.portfolioContactReveal;
      window.requestAnimationFrame(() => startLuminousTransition(contactSection, "#contact"));
    }
    return () => {
      document.documentElement.classList.remove("portfolio-home-route");
      if (frame) window.cancelAnimationFrame(frame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      if (coverTimer) window.clearTimeout(coverTimer);
      if (revealStartTimer) window.clearTimeout(revealStartTimer);
      if (revealTimer) window.clearTimeout(revealTimer);
      if (luminousCoverTimer) window.clearTimeout(luminousCoverTimer);
      if (luminousRevealStartTimer) window.clearTimeout(luminousRevealStartTimer);
      if (luminousRevealTimer) window.clearTimeout(luminousRevealTimer);
      if (depthTimer) window.clearTimeout(depthTimer);
      document.documentElement.classList.remove("scene-curtain-active", "scene-transition-active");
      document.documentElement.classList.remove("scene-page-hidden");
      document.body.classList.remove("scene-transitioning", "scene-curtain-covering", "scene-curtain-paused", "scene-curtain-revealing", "scene-luminous-covering", "scene-luminous-paused", "scene-luminous-revealing");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      fiveView?.removeEventListener("pointermove", onPointerMove);
      fiveView?.removeEventListener("pointerleave", resetPointer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("click", onAnchorClick, true);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
    };
  }, [isPortfolioRoute]);

  return isPortfolioRoute ? <><div className="scene-curtain" aria-hidden="true" /><div className="scene-luminous" aria-hidden="true" /></> : null;
}
