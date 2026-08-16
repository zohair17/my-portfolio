"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Module state, which survives client-side navigation but not a real page load
// — exactly the distinction we need. `visited` tells a Back into the home page
// apart from a fresh load of it, and `lastY` is where the visitor was standing
// when they left. Only the home page mounts this, so nothing else disturbs them.
let visited = false;
let lastY = 0;

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

    // Returning to the home page from a project or /work should land where the
    // visitor left, not throw them back to the hero. A real load or refresh has
    // no module state, so it still starts at the top.
    const isReturn = visited;
    const resumeY = isReturn ? lastY : 0;
    visited = true;

    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", () => {
      lastY = window.scrollY;
    });
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
    // Anchors we restore to when arriving from another page via a "Back" button:
    // project galleries (/#project-<slug>), the Featured section (/#featured, from
    // the /work page) and the Production section (/#production). Everything else —
    // a refresh, a stray #work/#about — starts at the hero.
    const restoreTarget = /^#(project-|production|featured)/.test(hash)
      ? hash
      : null;

    // Strip the hash from the URL either way, so a later reload always starts at
    // the hero instead of jumping back to a section.
    if (hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    let tries = 0;
    const settle = () => {
      if (cancelled) return;
      if (restoreTarget) {
        const el = document.querySelector(restoreTarget);
        if (el) lenis.scrollTo(el, { offset: -96, immediate: true, force: true });
      } else if (resumeY > 0) {
        lenis.scrollTo(resumeY, { immediate: true, force: true });
      } else {
        lenis.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
      }
      if (++tries < 12) setTimeout(settle, 70);
      else ScrollTrigger.refresh();
    };
    requestAnimationFrame(settle);

    // Every ScrollTrigger start/end is measured once, on creation — which here
    // happens while the loader still has the body locked and before the restore
    // above has moved us. Left stale, a section we land past never fires and its
    // entrance tween sits frozen on its "from" values (skewed cards, hidden
    // text). Re-measuring after the overlay clears and after the scroll settles
    // fixes both cases.
    // The loader holds the body locked, so any scroll attempted while it runs
    // is swallowed. Re-apply the target once it clears.
    const remeasure = () => {
      ScrollTrigger.refresh();
      tries = 0;
      cancelled = false;
      settle();
    };
    window.addEventListener("loader:done", remeasure);

    return () => {
      cancelled = true;
      window.removeEventListener("loader:done", remeasure);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}
