"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PanelAurora from "./PanelAurora";

// `screen` in the data is a CSS url("…"); pull the bare path out.
const cleanUrl = (s) =>
  s.replace(/^url\((['"]?)/, "").replace(/(['"]?)\)$/, "");

// Panels must stay opaque so the pin-and-stack scroll never ghosts the panel
// behind — so the section keeps a solid dark base, and <PanelAurora /> paints
// the real site aurora on top of it. The net panel is fully opaque but looks
// identical to the fixed wave background. Shared with the closing panel so the
// whole showcase reads as one continuous themed surface.
export const PANEL_BG = { backgroundColor: "#0a0a0a" };

// One "case" panel — CASE label, full screenshot on the left, serif title +
// hashtags + outlined Deep Dive on the right. Shared by the home Featured
// section and the /work showcase so both read identically. `sticky` turns on
// the pin-and-stack scroll (each panel pins, and the next slides up over it).
//
// Panels are opaque (bg-[#0a0a0a]) and each gets an increasing z-index so the
// next one cleanly covers the previous while stacking — no ghosting of the
// panel behind. The caller layers a higher-z closing panel on top so the last
// case is covered just as cleanly.
export default function CasePanel({ project: p, index, sticky = true }) {
  const router = useRouter();
  const tags = p.stack
    .slice(0, 3)
    .map((s) => "#" + s.replace(/[^a-z0-9]/gi, "").toUpperCase());

  return (
    <section
      id={`project-${p.slug}`}
      style={{ zIndex: index + 1, ...PANEL_BG }}
      className={`relative flex min-h-screen w-full items-center overflow-hidden px-4 py-20 sm:px-8 ${
        sticky ? "lg:sticky lg:top-0 lg:h-screen lg:py-0" : ""
      }`}
    >
      {/* real site aurora — opaque panel base keeps stacking clean */}
      <PanelAurora />

      <div className="relative z-10 mx-auto w-full max-w-[92rem]">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.4em] text-zinc-400">
          Case {String(index + 1).padStart(2, "0")}
        </p>

        {/* frosted card */}
        <div className="grid items-center gap-4 overflow-hidden rounded-3xl border border-white/12 bg-white/[0.05] shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:grid-cols-[1.2fr_0.8fr]">
          {/* left — full screenshot, nothing cropped */}
          <div className="flex items-center justify-center p-5 sm:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cleanUrl(p.screen)}
              alt={`${p.title} — hero`}
              loading="lazy"
              className="block h-auto w-full rounded-xl border border-white/12 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* right — serif title · hashtags · outlined Deep Dive */}
          <div className="px-8 pb-12 pt-2 lg:py-12 lg:pl-4 lg:pr-14">
            <h2 className="font-serif text-5xl font-medium leading-[1.03] tracking-tight text-white sm:text-6xl md:text-7xl">
              {p.title}
            </h2>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
              {tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-300">
              {p.desc}
            </p>
            <button
              onClick={() => router.push(`/projects/${p.slug}`)}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
            >
              Deep Dive
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
