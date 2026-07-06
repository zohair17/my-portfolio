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

    // Take over scroll restoration so a plain refresh always starts at the
    // hero instead of the browser dumping you back mid-page.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

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

    // On load, only ONE hash should scroll us away from the hero: the
    // /#project-<slug> anchor used when returning from a gallery via "Back".
    // Every other case — a fresh load, a refresh, or a stray in-page hash left
    // in the URL by clicking "View Work" (#work), "#about", etc. — must start
    // at the hero. Lenis + lazy images can override a single scroll, so we
    // re-apply the target until it sticks and bail once the user takes over.
    let cancelled = false;
    const stop = () => {
      cancelled = true;
    };
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
    window.addEventListener("keydown", stop, { once: true });

    const hash = window.location.hash;
    const isProjectReturn = hash.startsWith("#project-");

    // Strip a stray in-page hash so the browser can't jump to it on reload.
    if (hash && !isProjectReturn) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    let tries = 0;
    const settle = () => {
      if (cancelled) return;
      if (isProjectReturn) {
        const el = document.querySelector(hash);
        if (el) lenis.scrollTo(el, { offset: -96, immediate: true, force: true });
      } else {
        lenis.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
      }
      if (++tries < 12) setTimeout(settle, 70);
    };
    requestAnimationFrame(settle);

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}
