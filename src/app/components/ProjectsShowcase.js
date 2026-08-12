"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowDown } from "lucide-react";
import { FEATURED_PROJECTS } from "../work/data";
import CasePanel, { PANEL_BG } from "./CasePanel";
import PanelAurora from "./PanelAurora";

// Animated waves backdrop (WebGL) — client-only.
const WaveBackground = dynamic(() => import("./WaveBackground"), { ssr: false });

// Rotating hero headline — web-development focused, cycled in the centre title.
const DISCIPLINES = [
  "Web Development",
  "Frontend Engineering",
  "UI / UX Design",
  "React & Next.js",
  "Mobile Development",
  "Motion & Interaction",
];

const ease = [0.22, 1, 0.36, 1];

// `screen` in the data is a CSS url("…"); pull the bare path out.
const cleanUrl = (s) =>
  s.replace(/^url\((['"]?)/, "").replace(/(['"]?)\)$/, "");

export default function ProjectsShowcase() {
  const projects = FEATURED_PROJECTS;
  const images = useMemo(() => projects.map((p) => cleanUrl(p.screen)), [projects]);
  // Duplicated so the drifting track can loop seamlessly.
  const track = useMemo(() => [...images, ...images], [images]);

  const [discipline, setDiscipline] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setDiscipline((d) => (d + 1) % DISCIPLINES.length),
      2600
    );
    return () => clearInterval(id);
  }, []);

  return (
    // bg-transparent → the site-wide aurora theme shows through, unchanged.
    <main className="relative z-10 w-full bg-transparent text-white">
      {/* Fixed animated waves behind the whole page (replaces the flat colour). */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <WaveBackground className="absolute inset-0 h-full w-full opacity-55 [filter:blur(2px)]" />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <Link
        href="/#work"
        className="fixed left-5 top-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Back
      </Link>

      {/* ── Hero: drifting perspective gallery of project heroes ── */}
      <section className="relative z-10 flex h-screen w-full items-center justify-center overflow-hidden px-6">
        {/* moving slides */}
        <div className="pointer-events-none absolute inset-0 flex items-center [perspective:1400px]">
          <div className="gallery-track flex shrink-0 gap-6 [transform:rotateX(6deg)] sm:gap-8">
            {track.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[16/10] w-[240px] shrink-0 overflow-hidden rounded-2xl border border-white/10 opacity-30 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:w-[320px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>

        {/* readability wash — light, so the theme still reads through */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

        {/* headline + labels + explore */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.5em] text-zinc-300"
          >
            Selected Work
          </motion.p>

          <div className="flex min-h-[1.15em] items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={discipline}
                initial={{ opacity: 0, y: "60%", filter: "blur(12px)" }}
                animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                exit={{ opacity: 0, y: "-60%", filter: "blur(12px)" }}
                transition={{ duration: 0.7, ease }}
                className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-center text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-transparent drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-7xl md:text-8xl"
              >
                {DISCIPLINES[discipline]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="mt-8 flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-300"
          >
            <span>Frontend &amp; Mobile</span>
            <span className="h-px w-8 bg-white/25" />
            <span>End-to-End / Full Stack</span>
          </motion.div>
        </div>

        {/* Explore cue */}
        <motion.a
          href="#projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1, duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full bg-black/60 px-6 py-4 text-white backdrop-blur-md"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.4em]">Explore</span>
          <ArrowDown className="h-4 w-4" strokeWidth={1.75} />
        </motion.a>
      </section>

      {/* ── Stacked "case" panels — each pins, the next slides up over it.
             All panels are sticky; the closing panel below sits at a higher
             z-index so it covers the last pinned case cleanly (no ghosting). ── */}
      <div id="projects" className="relative z-10">
        {projects.map((p, i) => (
          <CasePanel key={p.slug} project={p} index={i} />
        ))}

        {/* closing panel — opaque + top of the stack, so it slides up over the
            last case and covers it just like every other panel transition */}
        <section
          style={{ zIndex: projects.length + 1, ...PANEL_BG }}
          className="relative flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center"
        >
          {/* same real aurora as the case panels */}
          <PanelAurora />

          <h2 className="relative z-10 font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Let&apos;s build the next one.
          </h2>
          <Link
            href="/#contact"
            className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </section>
      </div>

      <style jsx>{`
        .gallery-track {
          animation: galleryDrift 40s linear infinite;
          width: max-content;
        }
        @keyframes galleryDrift {
          from {
            transform: rotateX(6deg) translateX(0);
          }
          to {
            transform: rotateX(6deg) translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .gallery-track {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
