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
    className: "bottom-6 right-6 sm:bottom-8 sm:right-10",
  },
];

export default function HeroSection() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  // Playback is held back until the loader has cleared, otherwise the footage
  // runs through behind the black overlay and the reveal fires unseen. The
  // timer is a fallback for the case where the loader never reports in; if
  // playback itself is refused, reveal the copy rather than stranding it.
  useEffect(() => {
    const start = () => videoRef.current?.play().catch(() => setStarted(true));
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

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-transparent px-6">
      {/* Ambient glow — the same soft-light language the other sections use. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[40rem] w-[62rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[140px]" />

      {/* Phones get the footage edge-to-edge — a contained 16:9 clip on a
          portrait screen collapses to a small letterboxed strip. From sm up it
          is centred and uncropped, capped at the clip's native 1280x720 so a
          large display never upscales it into softness. */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <video
          ref={videoRef}
          src="/asset/heroVideo.webm"
          muted
          playsInline
          preload="auto"
          onEnded={() => setStarted(true)}
          onError={() => setStarted(true)}
          className="h-full w-full object-cover object-center sm:h-auto sm:w-auto sm:max-h-[min(80vh,720px)] sm:max-w-[min(90vw,1280px)] sm:object-contain"
        />
      </div>

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
          Zohair
        </motion.span>
        <motion.span
          {...reveal(0.35)}
          className="block text-[clamp(3.5rem,15vw,15rem)] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.9)]"
        >
          Ahmed
        </motion.span>
      </h1>
    </section>
  );
}
