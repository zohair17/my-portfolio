"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// The hero "video" is played back from a pre-extracted PNG sequence drawn to a
// <canvas>. Scrubbing a real <video>'s currentTime on scroll stutters badly
// across browsers, so we scroll through frames instead (the Apple-style trick).
const FRAME_COUNT = 200;
const framePath = (i) =>
  `/asset/frames/frame_${String(i + 1).padStart(6, "0")}.png`;

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textWrapRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutPointsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Preload the frame sequence ---
    const images = new Array(FRAME_COUNT);
    const state = { frame: 0 };
    let firstReady = false;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Trapezoid: fade 0->1 over [a,b], hold at 1 over [b,c], fade 1->0 over [c,d].
    const band = (f, a, b, c, d) => {
      if (f <= a || f >= d) return 0;
      if (f < b) return (f - a) / (b - a);
      if (f <= c) return 1;
      return (d - f) / (d - c);
    };

    // Drive the About copy off the current frame number (1-indexed). The
    // "About Me" heading fades in around frame 90 and then STAYS (the points
    // reveal below it, they don't replace it). Both hold through the last
    // frame so the footage never scrubs out to a bare black screen.
    const applyOverlays = () => {
      const f = state.frame + 1;
      const titleO = band(f, 86, 100, FRAME_COUNT, FRAME_COUNT + 1);
      const pointsO = band(f, 150, 172, FRAME_COUNT, FRAME_COUNT + 1);
      if (aboutTitleRef.current) {
        aboutTitleRef.current.style.opacity = titleO;
        aboutTitleRef.current.style.transform = `translateY(${(1 - titleO) * 30}px)`;
      }
      if (aboutPointsRef.current) {
        aboutPointsRef.current.style.opacity = pointsO;
        aboutPointsRef.current.style.transform = `translateY(${(1 - pointsO) * 24}px)`;
      }
    };

    const render = () => {
      applyOverlays();
      const img = images[state.frame];
      // If this frame hasn't loaded yet (fast scroll before preload finishes),
      // keep the last painted frame rather than flashing to black.
      if (!img || !img.complete || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, cw, ch);

      // Cover-fit the frame within the canvas.
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw, dh;
      if (cr > ir) {
        dw = cw;
        dh = cw / ir;
      } else {
        dh = ch;
        dw = ch * ir;
      }
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      render();
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        // Draw the very first frame as soon as it lands, and repaint the
        // current frame if the one we're waiting on just finished loading.
        if (!firstReady) {
          firstReady = true;
          render();
        } else if (i === state.frame) {
          render();
        }
      };
      images[i] = img;
    }

    // --- Scrub through the frames as the tall section scrolls past ---
    const scrub = gsap.to(state, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      onUpdate: render,
    });

    // --- Fade the hero copy out over the first stretch of scroll ---
    const fade = gsap.to(textWrapRef.current, {
      opacity: 0,
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "22% top",
        scrub: true,
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      scrub.scrollTrigger?.kill();
      scrub.kill();
      fade.scrollTrigger?.kill();
      fade.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Subtle overall dim so the (bright) footage reads darker/cinematic. */}
        <div className="pointer-events-none absolute inset-0 bg-black/35" />

        {/* Solid matte-black panel on the LEFT only (behind the copy), fading
            to transparent by ~70% so the right side of the footage stays clean. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0a0a0a 0%, #0a0a0a 32%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0) 70%)",
          }}
        />

        {/* Black shade on the RIGHT edge — deeper than before but it fades out
            by ~35% so the actual frame (subject) is never hidden. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, #0a0a0a 0%, rgba(10,10,10,0.6) 12%, rgba(10,10,10,0) 35%)",
          }}
        />

        {/* Ambient colour shades — soft glow language used across the other
            sections. Strong on the left, a subtle hint on the right. */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-indigo-600/20 blur-[130px]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-fuchsia-600/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-sky-600/15 blur-[140px]" />

        {/* Small, subtle colour glow on the right to balance the left. */}
        <div className="pointer-events-none absolute -right-24 top-1/3 h-[22rem] w-[22rem] rounded-full bg-violet-600/10 blur-[130px]" />

        <div
          ref={textWrapRef}
          className="absolute inset-0 flex flex-col items-start justify-center px-8 text-left sm:px-16 lg:px-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
              ZOHAIR AHMED
            </h1>

            <p className="mt-4 text-lg font-medium tracking-wide text-zinc-300 sm:text-xl md:text-2xl">
              Creative Frontend Developer
            </p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Crafting immersive digital experiences
              <br className="hidden sm:block" /> through motion, code, and
              storytelling.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <a
                href="#work"
                className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-white/5"
              >
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        </div>

        {/* About copy — opacity is driven frame-by-frame in applyOverlays().
            The heading stays put and the points reveal directly beneath it. */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-center px-8 text-left sm:px-16 lg:px-24">
          <h2
            ref={aboutTitleRef}
            style={{ opacity: 0 }}
            className="text-5xl font-semibold tracking-tight text-white sm:text-7xl md:text-8xl"
          >
            About Me
          </h2>

          <div
            ref={aboutPointsRef}
            style={{ opacity: 0 }}
            className="mt-6 max-w-2xl space-y-2 text-xl font-medium leading-snug text-zinc-200 sm:mt-8 sm:text-2xl md:text-3xl"
          >
            <p>I don&apos;t build websites. I craft experiences.</p>
            <p>Every interaction should tell a story.</p>
            <p className="text-zinc-400">Motion. Emotion. Performance.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
