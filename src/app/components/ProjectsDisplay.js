"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Power } from "lucide-react";
import { FEATURED_PROJECTS } from "../work/data";

// `screen` in the data is a CSS url("…"); pull the bare path out.
const cleanUrl = (s) =>
  s.replace(/^url\((['"]?)/, "").replace(/(['"]?)\)$/, "");

// The /work browser: one big device whose screen holds the whole project
// gallery. Desktop gets an LCD monitor (always powered, heading top-centre and
// small project cards below); mobile gets a phone that starts switched OFF —
// the themed power button boots it, and only then do the cards appear. Tapping
// any card plays that project's video full-bleed inside the same screen.
export default function ProjectsDisplay() {
  const projects = FEATURED_PROJECTS;

  const [powered, setPowered] = useState(true);
  const [active, setActive] = useState(null); // slug of the playing project

  // Phone below md, monitor above. Resolved after mount so SSR stays stable.
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      // The phone boots off; the monitor is always live.
      setIsPhone(mq.matches);
      setPowered(!mq.matches);
      setActive(null);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const videoRef = useRef(null);
  const prefetched = useRef(new Set());
  const project = projects.find((p) => p.slug === active) || null;

  // Restart whenever a different project is picked; stop when we go back/off.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (project && powered) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [project, powered]);

  // ── screen contents ───────────────────────────────────────────────────────
  const screen = (
    <div className="relative h-full w-full overflow-hidden bg-[#050507]">
      {/* off state */}
      <AnimatePresence>
        {!powered && (
          <motion.div
            key="off"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#050507]"
          >
            <button
              onClick={() => setPowered(true)}
              aria-label="Power on"
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-zinc-500 transition-all duration-300 hover:border-emerald-400/60 hover:bg-emerald-400/10 hover:text-emerald-300 hover:shadow-[0_0_26px_rgba(52,211,153,0.45)]"
            >
              <Power className="h-6 w-6" strokeWidth={2} />
            </button>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
              Tap to power on
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* playing a project */}
      <AnimatePresence mode="wait">
        {powered && project && (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-10"
          >
            <video
              ref={videoRef}
              src={project.video}
              poster={cleanUrl(project.screen)}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 bg-gradient-to-b from-black/80 to-transparent p-3 sm:p-4">
              <button
                onClick={() => setActive(null)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/50 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black sm:text-xs"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} /> Back
              </button>
              <span className="truncate font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-200 sm:text-xs">
                {project.title}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* gallery — heading top-centre, small cards below */}
      {powered && !project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 overflow-y-auto px-4 py-5 sm:px-8 sm:py-8"
        >
          <div className="text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-500 sm:text-[11px]">
              Archive
            </p>
            <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-white sm:text-4xl">
              All Projects
            </h2>
            <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-zinc-500 sm:text-xs">
              Select a project to play
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {projects.map((p, i) => (
              <motion.button
                key={p.slug}
                type="button"
                onClick={() => setActive(p.slug)}
                onPointerEnter={() => prefetch(p.video)}
                onTouchStart={() => prefetch(p.video)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                className="group overflow-hidden rounded-lg border border-white/12 bg-white/[0.03] text-left transition-colors hover:border-white/35 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cleanUrl(p.screen)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="px-2.5 py-2 sm:px-3 sm:py-2.5">
                  <p className="truncate text-[11px] font-medium text-white sm:text-sm">
                    {p.title}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-500 sm:text-[9px]">
                    {p.stack[0]}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* glass sheen + scanlines */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <div
        className={`pointer-events-none absolute inset-0 z-30 transition-opacity duration-700 ${
          powered ? "opacity-25" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom,rgba(0,0,0,0.35) 0px,rgba(0,0,0,0.35) 1px,transparent 1px,transparent 3px)",
        }}
      />
    </div>
  );

  return (
    <section id="projects" className="relative z-10 w-full px-4 py-20 sm:px-6 sm:py-28">
      {isPhone ? (
        /* ── phone ── */
        <div className="mx-auto w-full max-w-[22rem]">
          <div
            className={`relative rounded-[3rem] border-[3px] p-2 transition-all duration-700 ${
              powered
                ? "border-white/25 shadow-[0_0_60px_rgba(124,91,255,0.25),0_30px_80px_rgba(0,0,0,0.65)]"
                : "border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            }`}
            style={{
              background: "linear-gradient(160deg,#2a2a33 0%,#141419 45%,#0d0d11 100%)",
            }}
          >
            {/* side power key */}
            {/* iPhone side keys */}
            <span className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-[#33333d]" />
            <span className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-l bg-[#33333d]" />
            <span className="absolute -right-[3px] top-32 h-16 w-[3px] rounded-r bg-[#33333d]" />
            <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.6rem] bg-black">
              {/* notch */}
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-2.5 z-40 h-6 w-24 -translate-x-1/2 rounded-full bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" />
              {screen}
            </div>

            {/* power off lives on-screen once the phone is running */}
            {powered && (
              <div className="absolute bottom-5 left-1/2 z-40 -translate-x-1/2">
                <button
                  onClick={() => {
                    setPowered(false);
                    setActive(null);
                  }}
                  aria-label="Power off"
                  className="h-1.5 w-28 rounded-full bg-white/70"
                />
              </div>
            )}
          </div>
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            {powered ? "Tap a project to play" : "Tap the power button"}
          </p>
        </div>
      ) : (
        /* ── monitor ── */
        <div className="mx-auto w-full max-w-6xl">
          <div
            className="relative rounded-[26px] border border-white/25 p-4 shadow-[0_0_80px_rgba(124,91,255,0.22),0_40px_110px_rgba(0,0,0,0.65)]"
            style={{
              background: "linear-gradient(160deg,#2a2a33 0%,#141419 45%,#0d0d11 100%)",
            }}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black">
              {screen}
            </div>
            <div className="flex items-center justify-between px-3 pt-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                Zohair Ahmed — Work
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.75)]" />
            </div>
          </div>
          {/* stand */}
          <div className="mx-auto h-9 w-28 bg-gradient-to-b from-[#23232b] to-[#101014]" />
          <div className="mx-auto h-2.5 w-64 rounded-full bg-gradient-to-b from-[#2a2a33] to-[#0d0d11] shadow-[0_14px_30px_rgba(0,0,0,0.6)]" />
        </div>
      )}
    </section>
  );
}
