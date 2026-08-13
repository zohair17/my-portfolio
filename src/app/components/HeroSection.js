"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Marginalia framing the hero — each entry is pinned to an edge so the empty
// space around the name carries information instead of sitting blank.
const HUD = [
  { text: "ZA · 26", className: "left-6 top-6 sm:left-10 sm:top-8" },
  {
    text: "Frontend & Mobile Developer",
    // Hidden on small screens, where it would collide with the corner labels.
    className: "left-1/2 top-6 hidden -translate-x-1/2 sm:top-8 sm:block",
  },
  { text: "©2026 — Portfolio", className: "left-6 top-14 sm:left-10 sm:top-16" },
  {
    text: "React · Flutter · SPFx",
    // Would run into the ©-line on a phone, so it only appears from sm up.
    className: "right-6 top-14 hidden sm:right-10 sm:top-16 sm:block",
  },
  {
    text: "4+ Years — Fintech & Enterprise",
    className: "bottom-14 left-6 hidden sm:bottom-16 sm:left-10 sm:block",
  },
  { text: "Karachi — Pakistan", className: "bottom-6 left-6 sm:bottom-8 sm:left-10" },
  {
    text: "Available for Freelance",
    // On phones the two bottom labels sit on the same line and collide, so this
    // one stacks onto the (mobile-empty) line above, left-aligned; from sm up it
    // returns to the bottom-right corner.
    className: "bottom-14 left-6 sm:bottom-8 sm:left-auto sm:right-10",
  },
];

export default function HeroSection() {
  const [started, setStarted] = useState(false);

  // Hold the reveal until the loader has cleared, so the name lands on screen
  // rather than animating away behind the black overlay. The timer is a
  // fallback for the case where the loader never reports in.
  useEffect(() => {
    const start = () => setStarted(true);
    window.addEventListener("loader:done", start);
    const fallback = setTimeout(start, 3500);
    return () => {
      window.removeEventListener("loader:done", start);
      clearTimeout(fallback);
    };
  }, []);

  const reveal = (delay) => ({
    initial: { opacity: 0, y: 28, filter: "blur(14px)" },
    animate: started
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 28, filter: "blur(14px)" },
    transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
  });

  // Liquid-metal shine revealed inside the letters — follows the pointer, and
  // auto-drifts when idle so it stays alive on touch screens. Positions are
  // written to CSS vars on the <h1> (inherited into the clipped spans) so there
  // is no React re-render per frame.
  // noth.in-style reveal: a liquid-chrome copy of the name that only shows in a
  // soft circle around the cursor (auto-drifts when idle so touch screens get it
  // too). Cursor position lives in CSS vars on the section — no re-render/frame.
  const rootRef = useRef(null);
  const lastMove = useRef(0);
  const setVars = (x, y) => {
    const el = rootRef.current;
    if (el) {
      el.style.setProperty("--x", `${x}%`);
      el.style.setProperty("--y", `${y}%`);
    }
  };
  const onMove = (e) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    lastMove.current = Date.now();
    setVars(((p.clientX - r.left) / r.width) * 100, ((p.clientY - r.top) / r.height) * 100);
  };
  useEffect(() => {
    let raf;
    let t = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (Date.now() - lastMove.current > 1000) {
        t += 0.015;
        setVars(50 + Math.cos(t) * 30, 45 + Math.sin(t * 1.3) * 22);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Liquid metal sits over the name; the cursor clears a soft hole in it (so it
  // "moves away" on hover), and the SVG turbulence gives the edges a liquid wobble.
  const hole =
    "radial-gradient(circle 150px at var(--x,50%) var(--y,45%), transparent 0%, transparent 24%, #000 62%)";
  const chromeText = {
    backgroundImage:
      "linear-gradient(110deg,#8b93a1 0%,#f4f6f9 12%,#c7ccd6 26%,#565f6d 40%,#eef1f5 54%,#9aa2b1 68%,#454d59 82%,#f4f6f9 100%)",
    backgroundSize: "220% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitMaskImage: hole,
    maskImage: hole,
    filter: "url(#liquid)",
  };

  return (
    <section
      ref={rootRef}
      onPointerMove={onMove}
      onTouchMove={onMove}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-transparent px-6"
    >
      {/* Ambient glow — the same soft-light language the other sections use. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[40rem] w-[62rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[140px]" />

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-30 select-none font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-xs"
      >
        {HUD.map(({ text, className }) => (
          <span key={text} className={`absolute ${className}`}>
            {text}
          </span>
        ))}
      </motion.div>

      {/* Contact is a real link, so it lives outside the aria-hidden HUD. */}
      <motion.a
        href="#contact"
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        className="absolute right-6 top-6 z-30 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 transition-colors hover:text-white sm:right-10 sm:top-8 sm:text-xs"
      >
        Contact
      </motion.a>

      <h1 className="relative z-20 select-none text-center font-semibold uppercase leading-[0.82] tracking-tight">
        <motion.span
          {...reveal(0.15)}
          className="block text-[clamp(3.5rem,15vw,15rem)] text-white"
        >
          {/* Per-letter hover: the hovered glyph drops its white fill and
              keeps only the outline, then fades back to white on leave. */}
          {"Zohair".split("").map((ch, i) => (
            <span
              key={i}
              className="inline-block cursor-default transition-colors duration-200 hover:text-transparent hover:[-webkit-text-stroke:2px_rgba(255,255,255,0.9)]"
            >
              {ch}
            </span>
          ))}
        </motion.span>
        <motion.span
          {...reveal(0.35)}
          className="block text-[clamp(3.5rem,15vw,15rem)] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.9)]"
        >
          Ahmed
        </motion.span>
      </h1>

      {/* Liquid-chrome copy of the name; the cursor clears a hole through it. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-20 flex select-none items-center justify-center px-6 text-center font-semibold uppercase leading-[0.82] tracking-tight transition-opacity duration-[1200ms] ${
          started ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1>
          <span
            style={chromeText}
            className="block text-[clamp(3.5rem,15vw,15rem)] animate-[chromeFlow_7s_linear_infinite]"
          >
            Zohair
          </span>
          <span
            style={chromeText}
            className="block text-[clamp(3.5rem,15vw,15rem)] animate-[chromeFlow_7s_linear_infinite]"
          >
            Ahmed
          </span>
        </h1>
      </div>

      {/* Turbulence filter → liquid wobble on the chrome name's edges. */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id="liquid">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.02"
            numOctaves="2"
            seed="7"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </section>
  );
}
