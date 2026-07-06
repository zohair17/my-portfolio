"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// One global Lenis instance for the whole page, wired into GSAP's ticker so
// every ScrollTrigger across all sections stays in sync with the smooth scroll.
export default function SmoothScroll({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Expose so sections (e.g. footer scroll-to-top) can drive it.
    window.__lenis = lenis;

    // Honour an initial #hash (e.g. returning from a project via "Back" to
    // /#project-<slug>). Lenis starts at the top and lazy-loaded images above
    // the target keep shifting layout, so a single scrollTo either fires too
    // early or gets overridden back to the hero. Re-apply it until it sticks,
    // and bail the moment the user takes over.
    let cancelled = false;
    if (window.location.hash) {
      const target = window.location.hash;
      const stop = () => {
        cancelled = true;
      };
      window.addEventListener("wheel", stop, { once: true, passive: true });
      window.addEventListener("touchstart", stop, { once: true, passive: true });
      window.addEventListener("keydown", stop, { once: true });

      let tries = 0;
      const restore = () => {
        if (cancelled) return;
        const el = document.querySelector(target);
        if (el) lenis.scrollTo(el, { offset: -96, immediate: true, force: true });
        if (++tries < 12) setTimeout(restore, 70);
      };
      requestAnimationFrame(restore);
    }

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}
